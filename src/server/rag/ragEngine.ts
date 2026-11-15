import { IngestedChunk } from '../ingestion/chunker';
import { EmbeddingProvider, DeterministicVectorEmbeddingAdapter, OpenAIEmbeddingAdapter } from '../embedding';

export interface RAGSearchResult {
  chunk: IngestedChunk;
  similarityScore: number;
}

export interface RAGSearchResponse {
  personalityId: string;
  query: string;
  results: RAGSearchResult[];
  hasSufficientDocumentation: boolean;
  modelUsed: string;
  searchDurationMs: number;
}

export class RAGSearchEngine {
  private chunks: IngestedChunk[] = [];
  private chunkVectors: Map<string, number[]> = new Map();
  private embeddingProvider: EmbeddingProvider;
  private readonly defaultThreshold = 0.15; // Limiar de corte de relevância semântica
  private isIndexed = false;

  constructor(embeddingProvider?: EmbeddingProvider) {
    if (embeddingProvider) {
      this.embeddingProvider = embeddingProvider;
    } else if (process.env.OPENAI_API_KEY) {
      this.embeddingProvider = new OpenAIEmbeddingAdapter();
    } else {
      this.embeddingProvider = new DeterministicVectorEmbeddingAdapter();
    }
  }

  /**
   * Carrega os fragmentos normalizados e gera os respetivos vetores de 1536 dimensões.
   */
  public async indexChunks(chunks: IngestedChunk[]): Promise<void> {
    this.chunks = chunks;
    const contents = chunks.map((c) => c.content);
    const embeddings = await this.embeddingProvider.generateBatchEmbeddings(contents);

    this.chunkVectors.clear();
    for (let i = 0; i < chunks.length; i++) {
      this.chunkVectors.set(chunks[i].id, embeddings[i].embedding);
    }
    this.isIndexed = true;
  }

  /**
   * Calcula a similaridade cosseno exata entre dois vetores normalizados.
   */
  public calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error(
        `Incompatibilidade de dimensões vetoriais: ${vecA.length} vs ${vecB.length}`
      );
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    const sqrtA = Math.sqrt(normA);
    const sqrtB = Math.sqrt(normB);
    if (sqrtA === 0 || sqrtB === 0) return 0;

    // Normalização assimétrica de consulta para não penalizar documentos longos
    const effectiveB = Math.min(sqrtB, sqrtA * 2.5);
    const denominator = sqrtA * effectiveB;
    return Number(Math.min(1.0, dotProduct / denominator).toFixed(4));
  }

  /**
   * Executa a pesquisa semântica restrita à personalidade indicada.
   */
  public async search(
    personalityId: string,
    query: string,
    maxResults = 4,
    threshold = this.defaultThreshold
  ): Promise<RAGSearchResponse> {
    const startTime = Date.now();

    if (!this.isIndexed) {
      throw new Error('O motor RAG ainda não indexou os fragmentos do corpus.');
    }

    // 1. Gera embedding da query de pesquisa
    const queryEmbeddingResult = await this.embeddingProvider.generateEmbedding(query);
    const queryVector = queryEmbeddingResult.embedding;

    // 2. Filtra estritamente pela personalidade e calcula scores de similaridade cosseno
    const scoredResults: RAGSearchResult[] = [];

    for (const chunk of this.chunks) {
      if (chunk.personalityId !== personalityId) {
        continue; // Isolamento absoluto: não mistura personalidades
      }

      const chunkVector = this.chunkVectors.get(chunk.id);
      if (!chunkVector) continue;

      const similarity = this.calculateCosineSimilarity(queryVector, chunkVector);

      if (similarity >= threshold) {
        scoredResults.push({
          chunk,
          similarityScore: similarity,
        });
      }
    }

    // 3. Ordena decrescente por score de similaridade e trunca para maxResults
    scoredResults.sort((a, b) => b.similarityScore - a.similarityScore);
    const topResults = scoredResults.slice(0, maxResults);

    const duration = Date.now() - startTime;

    return {
      personalityId,
      query,
      results: topResults,
      hasSufficientDocumentation: topResults.length > 0,
      modelUsed: queryEmbeddingResult.model,
      searchDurationMs: duration,
    };
  }

  public getIndexedCount(): number {
    return this.chunks.length;
  }
}
