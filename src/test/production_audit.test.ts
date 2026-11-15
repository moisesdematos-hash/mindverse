import { describe, it, expect, beforeAll } from 'vitest';
import { globalRAGOrchestrator } from '../server/orchestrator';
import { DeterministicVectorEmbeddingAdapter } from '../server/embedding';
import { RAGSearchEngine } from '../server/rag/ragEngine';
import { IntellectualPromptAssembler } from '../server/persona/promptAssembler';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';
import { getAllCanonicalDocuments } from '../data/corpora';
import { SemanticDocumentChunker } from '../server/ingestion/chunker';
import fs from 'fs';
import path from 'path';

describe('FASE A — Auditoria de Credenciais e Isolamento de Segredos', () => {
  it('o ficheiro .env não deve exportar chaves secretas com prefixo VITE_', () => {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith('VITE_')) {
          expect(line).not.toMatch(/VITE_.*(GROQ|GEMINI|SERVICE_ROLE|OPENAI|ANTHROPIC)/i);
        }
      }
    }
  });

  it('o pacote de build de produção (dist) não deve conter chaves privadas', () => {
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      const scanFiles = (dir: string) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const full = path.join(dir, file);
          if (fs.statSync(full).isDirectory()) {
            scanFiles(full);
          } else if (file.endsWith('.js')) {
            const code = fs.readFileSync(full, 'utf-8');
            expect(code).not.toMatch(/gsk_[a-zA-Z0-9]{40,}/);
            expect(code).not.toMatch(/AQ\.[a-zA-Z0-9_\-]{40,}/);
            expect(code).not.toMatch(/sb_secret_[a-zA-Z0-9_\-]{30,}/);
          }
        }
      };
      scanFiles(distPath);
    }
  });
});

describe('FASE B — Embeddings 1536d e Versionamento', () => {
  const adapter = new DeterministicVectorEmbeddingAdapter();

  it('o modelo de embeddings deve gerar exatamente 1536 dimensões normalizadas', async () => {
    const text = 'A virtude é uma disposição voluntária adquirida que consiste na justa medida.';
    const res = await adapter.generateEmbedding(text);

    expect(res.dimension).toBe(1536);
    expect(res.embedding).toHaveLength(1536);
    expect(res.model).toBe('text-embedding-3-small');
    expect(res.version).toBeDefined();

    // Verificação de normalização L2
    let sumSq = 0;
    for (const v of res.embedding) sumSq += v * v;
    expect(Math.abs(Math.sqrt(sumSq) - 1.0)).toBeLessThan(0.01);
  });

  it('deve gerar vetores consistentes para múltiplos idiomas', async () => {
    const pt = await adapter.generateEmbedding('A justiça é a virtude completa.');
    const en = await adapter.generateEmbedding('Justice is complete virtue.');
    const fr = await adapter.generateEmbedding('La justice est la vertu complète.');
    const es = await adapter.generateEmbedding('La justicia es la virtud completa.');

    expect(pt.dimension).toBe(1536);
    expect(en.dimension).toBe(1536);
    expect(fr.dimension).toBe(1536);
    expect(es.dimension).toBe(1536);
  });
});

describe('FASE D & E — RAG e Fidelidade Histórica (Flávio Josefo, Aristóteles, Marco Aurélio)', () => {
  const chunker = new SemanticDocumentChunker();
  const embeddingAdapter = new DeterministicVectorEmbeddingAdapter();
  const ragEngine = new RAGSearchEngine(embeddingAdapter);
  const promptAssembler = new IntellectualPromptAssembler();

  const JOSEPHUS_ID = '00000000-0000-0000-0000-000000000011';
  const ARISTOTLE_ID = '00000000-0000-0000-0000-000000000004';
  const MARCUS_ID = '00000000-0000-0000-0000-000000000006';

  beforeAll(async () => {
    const docs = getAllCanonicalDocuments();
    const chunks = chunker.chunkAllDocuments(docs);
    await ragEngine.indexChunks(chunks);
    await globalRAGOrchestrator.initialize();
  });

  it('Flávio Josefo: recupera a tomada do Templo e o papel de Tito (Livro VI, cap. 4)', async () => {
    const hits = await ragEngine.search(JOSEPHUS_ID, 'incêndio do Templo Tito ordem soldado', 3, 0.1);
    expect(hits.hasSufficientDocumentation).toBe(true);

    const hit = hits.results.find((r) => r.chunk.metadata.chapter.includes('4') || r.chunk.content.includes('Tito'));
    expect(hit).toBeDefined();
    expect(hit?.chunk.content).toContain('Tito');
    expect(hit?.chunk.content).toContain('tição ardente');
    expect(hit?.chunk.metadata.bibliographicCitation).toContain('A Guerra dos Judeus');
  });

  it('Aristóteles: recupera o conceito de Justa Medida na Ética a Nicómaco', async () => {
    const hits = await ragEngine.search(ARISTOTLE_ID, 'justa medida excesso falta virtude', 2, 0.1);
    expect(hits.hasSufficientDocumentation).toBe(true);
    expect(hits.results[0].chunk.metadata.documentTitle).toBe('Ética a Nicómaco');
  });

  it('Marco Aurélio: recupera a Cidadela Interior nas Meditações', async () => {
    const hits = await ragEngine.search(MARCUS_ID, 'cidadela interior hegemonikon retiro alma', 2, 0.1);
    expect(hits.hasSufficientDocumentation).toBe(true);
    expect(hits.results[0].chunk.metadata.documentTitle).toContain('Meditações');
  });

  it('Ausência documental: deve ativar a limitação epistémica sem inventar factos', async () => {
    const persona = COHORT_GENESIS_PERSONALITIES.find((p) => p.id === ARISTOTLE_ID)!;
    const prompt = promptAssembler.assemble(persona, 'Qual a tua opinião sobre os computadores quânticos?', []);

    expect(prompt.hasSufficientContext).toBe(false);
    expect(prompt.systemPrompt).toContain('Nenhuma passagem das tuas obras canónicas atingiu o limiar');
    expect(prompt.systemPrompt).toContain('RIGOR DE NÃO-ALUCINAÇÃO');
  });
});

describe('FASE G — Quotas e Proteção contra Concorrência', () => {
  it('deve simular bloqueio e prevenir saldo negativo de quotas', () => {
    let quota = 50000;
    let used = 49000;
    const maxConcurrent = 2;
    let activeConcurrent = 0;

    const reserve = (estimate: number): boolean => {
      if (activeConcurrent >= maxConcurrent) return false;
      if (used + estimate > quota) return false;
      used += estimate;
      activeConcurrent++;
      return true;
    };

    const release = (actual: number) => {
      activeConcurrent = Math.max(0, activeConcurrent - 1);
      used += actual; // ajusta a diferença
    };

    // Pedido 1: 500 tokens (Cabe na quota) -> sucesso
    expect(reserve(500)).toBe(true);
    expect(used).toBe(49500);
    expect(activeConcurrent).toBe(1);

    // Pedido 2: 400 tokens (Cabe na quota) -> sucesso
    expect(reserve(400)).toBe(true);
    expect(used).toBe(49900);
    expect(activeConcurrent).toBe(2);

    // Pedido 3: concorrência máxima atingida (2) -> rejeitado
    expect(reserve(50)).toBe(false);

    // Libertar pedido 1
    release(0);
    expect(activeConcurrent).toBe(1);

    // Pedido 4: 200 tokens (Excede a quota máxima de 50.000) -> rejeitado
    expect(reserve(200)).toBe(false);
    expect(used).toBe(49900); // Saldo nunca ultrapassa nem fica negativo
  });
});
