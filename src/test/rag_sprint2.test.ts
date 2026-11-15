import { describe, it, expect, beforeAll } from 'vitest';
import { getAllCanonicalDocuments, getDocumentsForPersonality } from '../data/corpora';
import { SemanticDocumentChunker } from '../server/ingestion/chunker';
import { DeterministicVectorEmbeddingAdapter } from '../server/embedding';
import { RAGSearchEngine } from '../server/rag/ragEngine';
import { IntellectualPromptAssembler } from '../server/persona/promptAssembler';
import { globalRAGOrchestrator } from '../server/orchestrator';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';

describe('SPRINT 02 — Motor RAG de Inteligência Histórica', () => {
  const chunker = new SemanticDocumentChunker();
  const embeddingAdapter = new DeterministicVectorEmbeddingAdapter();
  const ragEngine = new RAGSearchEngine(embeddingAdapter);
  const promptAssembler = new IntellectualPromptAssembler();

  const JOSEPHUS_ID = '00000000-0000-0000-0000-000000000011';
  const ARISTOTLE_ID = '00000000-0000-0000-0000-000000000004';
  const MARCUS_ID = '00000000-0000-0000-0000-000000000006';

  beforeAll(async () => {
    // Inicializa e indexa fragmentos canónicos
    const docs = getAllCanonicalDocuments();
    const chunks = chunker.chunkAllDocuments(docs);
    await ragEngine.indexChunks(chunks);
    await globalRAGOrchestrator.initialize();
  });

  describe('1. Ingestão Documental e Preservação da Estrutura Canónica', () => {
    it('deve carregar os documentos primários de Flávio Josefo, Aristóteles e Marco Aurélio', () => {
      const josephusDocs = getDocumentsForPersonality(JOSEPHUS_ID);
      const aristotleDocs = getDocumentsForPersonality(ARISTOTLE_ID);
      const marcusDocs = getDocumentsForPersonality(MARCUS_ID);

      expect(josephusDocs.length).toBeGreaterThanOrEqual(4);
      expect(aristotleDocs.length).toBeGreaterThanOrEqual(4);
      expect(marcusDocs.length).toBeGreaterThanOrEqual(1);

      // Flávio Josefo: 4 obras verificadas
      const titles = josephusDocs.map((d) => d.title);
      expect(titles).toContain('A Guerra dos Judeus');
      expect(titles).toContain('Antiguidades Judaicas');
      expect(titles).toContain('Contra Apião');
      expect(titles).toContain('Vida de Josefo (Autobiografia)');
    });

    it('cada fragmento gerado pelo chunker deve preservar livro, capítulo, secção e citação', () => {
      const docs = getDocumentsForPersonality(JOSEPHUS_ID);
      const chunks = chunker.chunkAllDocuments(docs);

      expect(chunks.length).toBeGreaterThan(0);
      chunks.forEach((chunk) => {
        expect(chunk.metadata.book).toBeTruthy();
        expect(chunk.metadata.chapter).toBeTruthy();
        expect(chunk.metadata.bibliographicCitation).toBeTruthy();
        expect(chunk.metadata.epistemicType).toBeDefined();
        expect(chunk.embeddingDimension).toBe(1536);
        expect(chunk.embeddingModel).toBe('text-embedding-3-small');
      });
    });
  });

  describe('2. Geração e Versionamento de Embeddings (1536d)', () => {
    it('deve gerar vetores com dimensão exatamente igual a 1536 e norma unitária', async () => {
      const sampleText = 'A virtude moral é a justa medida entre dois extremos.';
      const res = await embeddingAdapter.generateEmbedding(sampleText);

      expect(res.dimension).toBe(1536);
      expect(res.embedding).toHaveLength(1536);
      expect(res.model).toBe('text-embedding-3-small');

      // Verifica normalização L2 (soma dos quadrados próxima de 1)
      let sumSq = 0;
      for (const val of res.embedding) {
        sumSq += val * val;
      }
      expect(Math.abs(Math.sqrt(sumSq) - 1)).toBeLessThan(0.01);
    });
  });

  describe('3. Pesquisa Vetorial RAG e Isolamento por Personalidade', () => {
    it('deve recuperar trechos sobre o Cerco de Jerusalém exclusivamente para Flávio Josefo', async () => {
      const query = 'cerco de jerusalém e as facções sediciosas do templo';
      const searchRes = await ragEngine.search(JOSEPHUS_ID, query, 3, 0.2);

      expect(searchRes.hasSufficientDocumentation).toBe(true);
      expect(searchRes.results.length).toBeGreaterThan(0);

      searchRes.results.forEach((r) => {
        expect(r.chunk.personalityId).toBe(JOSEPHUS_ID);
        expect(r.similarityScore).toBeGreaterThan(0);
        expect(r.chunk.metadata.author).toContain('Flavius Josephus');
      });
    });

    it('NÃO deve permitir vazamento inter-personalidades (consulta a Josefo nunca retorna Aristóteles)', async () => {
      const query = 'eudaimonia e a justa medida da virtude';
      const searchRes = await ragEngine.search(JOSEPHUS_ID, query, 4, 0.4);

      searchRes.results.forEach((r) => {
        expect(r.chunk.personalityId).toBe(JOSEPHUS_ID);
        expect(r.chunk.personalityId).not.toBe(ARISTOTLE_ID);
      });
    });

    it('deve recuperar a Ética a Nicómaco e a Justa Medida para Aristóteles', async () => {
      const query = 'o que é a justa medida e a virtude ética';
      const searchRes = await ragEngine.search(ARISTOTLE_ID, query, 2, 0.2);

      expect(searchRes.hasSufficientDocumentation).toBe(true);
      const firstHit = searchRes.results[0];
      expect(firstHit.chunk.metadata.documentTitle).toBe('Ética a Nicómaco');
      expect(firstHit.chunk.metadata.heading).toContain('Justa Medida');
    });

    it('deve recuperar o Hegemonikon e o refúgio da alma para Marco Aurélio', async () => {
      const query = 'o retiro interior da alma e a mente racional';
      const searchRes = await ragEngine.search(MARCUS_ID, query, 2, 0.2);

      expect(searchRes.hasSufficientDocumentation).toBe(true);
      const firstHit = searchRes.results[0];
      expect(firstHit.chunk.metadata.documentTitle).toContain('Meditações');
      expect(firstHit.chunk.metadata.heading).toContain('Cidadela Interior');
    });
  });

  describe('4. Montagem do Prompt Intelectual e Rigor Epistémico', () => {
    it('deve incluir fontes primárias e diretivas epistémicas quando há contexto recuperado', async () => {
      const personality = COHORT_GENESIS_PERSONALITIES.find((p) => p.id === JOSEPHUS_ID)!;
      const searchRes = await ragEngine.search(JOSEPHUS_ID, 'Tito e o incêndio do Templo', 2, 0.2);

      const prompt = promptAssembler.assemble(personality, 'Como ardeu o Templo de Jerusalém?', searchRes.results);

      expect(prompt.hasSufficientContext).toBe(true);
      expect(prompt.systemPrompt).toContain('A Guerra dos Judeus');
      expect(prompt.systemPrompt).toContain('[FACTO DOCUMENTADO]');
      expect(prompt.systemPrompt).toContain('[INTERPRETAÇÃO FUNDAMENTADA]');
      expect(prompt.retrievedCitations.length).toBeGreaterThan(0);
    });

    it('deve assinalar ausência de fontes e exigir reconhecimento de limitação quando a consulta não tem amparo', () => {
      const personality = COHORT_GENESIS_PERSONALITIES.find((p) => p.id === MARCUS_ID)!;
      // Passando resultados vazios
      const prompt = promptAssembler.assemble(personality, 'Qual a tua opinião sobre a relatividade de Einstein?', []);

      expect(prompt.hasSufficientContext).toBe(false);
      expect(prompt.systemPrompt).toContain('Nenhuma passagem das tuas obras canónicas atingiu o limiar');
      expect(prompt.retrievedCitations).toHaveLength(0);
    });
  });

  describe('5. Execução do Orquestrador RAG de Ponta a Ponta', () => {
    it('deve responder fundamentadamente com citações reais para Flávio Josefo', async () => {
      const response = await globalRAGOrchestrator.processInquiry({
        personalityId: JOSEPHUS_ID,
        userQuery: 'Quais eram as facções que dividiam Jerusalém durante o cerco romano?'
      });

      expect(response.citations.length).toBeGreaterThan(0);
      expect(response.answer).toContain('[FACTO DOCUMENTADO]');
      expect(response.hasSufficientDocumentation).toBe(true);
      expect(response.tokensUsed).toBeGreaterThan(0);
      expect(response.citations[0].workTitle).toContain('Guerra dos Judeus');
    });

    it('deve responder com prudência sobre tópicos sem documentação, sem alucinar', async () => {
      const response = await globalRAGOrchestrator.processInquiry({
        personalityId: ARISTOTLE_ID,
        userQuery: 'Como construir uma máquina de transmissão sem fios de eletricidade?'
      });

      // Sem documentação sobre eletricidade sem fios em Aristóteles
      expect(response.answer).toContain('LIMITAÇÃO HISTÓRICA RECONHECIDA');
    });
  });
});
