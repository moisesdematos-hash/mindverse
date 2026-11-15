import { getAllCanonicalDocuments } from '../data/corpora';
import { SemanticDocumentChunker, IngestedChunk } from './ingestion/chunker';
import { RAGSearchEngine, RAGSearchResponse } from './rag/ragEngine';
import { IntellectualPromptAssembler, PromptPayload } from './persona/promptAssembler';
import { AIGateway, AIGatewayResponse } from './gateway';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';

export interface ChatRequest {
  personalityId: string;
  userQuery: string;
  userId?: string;
  stream?: boolean;
}

export interface ChatResponse {
  answer: string;
  citations: Array<{
    citation: string;
    workTitle: string;
    section: string;
    similarityScore: number;
    epistemicType: string;
  }>;
  hasSufficientDocumentation: boolean;
  modelUsed: string;
  provider: string;
  tokensUsed: number;
  estimatedCostUsd: number;
}

export class MindverseRAGOrchestrator {
  private chunker: SemanticDocumentChunker;
  private ragEngine: RAGSearchEngine;
  private promptAssembler: IntellectualPromptAssembler;
  private aiGateway: AIGateway;
  private isInitialized = false;
  private chunks: IngestedChunk[] = [];

  constructor() {
    this.chunker = new SemanticDocumentChunker();
    this.ragEngine = new RAGSearchEngine();
    this.promptAssembler = new IntellectualPromptAssembler();
    this.aiGateway = new AIGateway();
  }

  /**
   * Inicializa e indexa todo o corpus canónico primário na memória vetorial do servidor.
   */
  public async initialize(): Promise<number> {
    if (this.isInitialized) return this.chunks.length;

    const documents = getAllCanonicalDocuments();
    this.chunks = this.chunker.chunkAllDocuments(documents);
    await this.ragEngine.indexChunks(this.chunks);
    this.isInitialized = true;

    return this.chunks.length;
  }

  /**
   * Processa uma consulta dialógica completa com fundamentação RAG.
   */
  public async processInquiry(
    request: ChatRequest,
    onChunk?: (token: string) => void
  ): Promise<ChatResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const personality = COHORT_GENESIS_PERSONALITIES.find((p) => p.id === request.personalityId);
    if (!personality) {
      throw new Error(`Personalidade não encontrada com o ID: ${request.personalityId}`);
    }

    // 1. Pesquisa RAG vetorial restrita à personalidade
    const ragResponse: RAGSearchResponse = await this.ragEngine.search(
      request.personalityId,
      request.userQuery,
      4,
      0.15 // Limiar adaptativo de relevância documental
    );

    // 2. Montagem rigorosa do prompt intelectual
    const promptPayload: PromptPayload = this.promptAssembler.assemble(
      personality,
      request.userQuery,
      ragResponse.results
    );

    // 3. Despacho para o Gateway de IA (com streaming ou síncrono)
    const messages = [
      { role: 'system' as const, content: promptPayload.systemPrompt },
      { role: 'user' as const, content: promptPayload.userPrompt },
    ];

    const aiResponse: AIGatewayResponse = await this.aiGateway.dispatchChat(messages, onChunk);

    return {
      answer: aiResponse.content,
      citations: promptPayload.retrievedCitations,
      hasSufficientDocumentation: promptPayload.hasSufficientContext,
      modelUsed: aiResponse.model,
      provider: aiResponse.provider,
      tokensUsed: aiResponse.usage.totalTokens,
      estimatedCostUsd: aiResponse.usage.estimatedCostUsd,
    };
  }

  public getIngestedChunksCount(): number {
    return this.chunks.length;
  }
}

// Instância singleton do orquestrador para o runtime
export const globalRAGOrchestrator = new MindverseRAGOrchestrator();
