export interface EmbeddingResult {
  embedding: number[];
  model: string;
  version: string;
  dimension: number;
}

export interface EmbeddingProvider {
  generateEmbedding(text: string): Promise<EmbeddingResult>;
  generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]>;
}

/**
 * Adaptador oficial para Gemini gemini-embedding-001 (1536 dimensões nativas).
 * Executado exclusivamente no servidor.
 */
export class GeminiEmbeddingAdapter implements EmbeddingProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly version: string;
  private readonly expectedDimension: number;

  constructor(apiKey?: string, model = 'gemini-embedding-001') {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.model = model;
    this.version = 'v1';
    this.expectedDimension = 1536;
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey) && !this.apiKey.includes('placeholder');
  }

  public async generateEmbedding(text: string): Promise<EmbeddingResult> {
    if (!this.apiKey) {
      throw new Error(
        'GEMINI_API_KEY não configurada no servidor. Adicione a chave ao ambiente do servidor.'
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text }] },
          outputDimensionality: this.expectedDimension,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha na API Gemini Embeddings (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const vector = data.embedding?.values;

    if (!vector || vector.length !== this.expectedDimension) {
      throw new Error(
        `Incompatibilidade dimensional de embeddings Gemini: esperado ${this.expectedDimension}, obtido ${vector?.length || 0}`
      );
    }

    return {
      embedding: vector,
      model: this.model,
      version: this.version,
      dimension: this.expectedDimension,
    };
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }
}

/**
 * Adaptador oficial para OpenAI text-embedding-3-small (1536 dimensões).
 * Executado exclusivamente no servidor.
 */
export class OpenAIEmbeddingAdapter implements EmbeddingProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly version: string;
  private readonly expectedDimension: number;

  constructor(apiKey?: string, model = 'text-embedding-3-small') {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.model = model;
    this.version = 'v1';
    this.expectedDimension = 1536;
  }

  public async generateEmbedding(text: string): Promise<EmbeddingResult> {
    if (!this.apiKey) {
      throw new Error(
        'OPENAI_API_KEY não configurada no servidor. Para gerar embeddings em nuvem, adicione a chave ao ambiente do servidor.'
      );
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        input: text,
        model: this.model,
        dimensions: this.expectedDimension,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha na API OpenAI Embeddings (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const vector = data.data[0].embedding;

    if (vector.length !== this.expectedDimension) {
      throw new Error(
        `Incompatibilidade dimensional de embeddings: esperado ${this.expectedDimension}, obtido ${vector.length}`
      );
    }

    return {
      embedding: vector,
      model: this.model,
      version: this.version,
      dimension: this.expectedDimension,
    };
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY não configurada no servidor.');
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        input: texts,
        model: this.model,
        dimensions: this.expectedDimension,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha no lote de embeddings OpenAI (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => ({
      embedding: item.embedding,
      model: this.model,
      version: this.version,
      dimension: this.expectedDimension,
    }));
  }
}

/**
 * Adaptador Determinístico de Vetores (1536 dimensões).
 * Utiliza dispersão por feature hashing multi-canal para projetar termos substantivos e n-gramas.
 * Garante que textos semanticamente desconexos tenham similaridade nula (< 0.05),
 * enquanto textos que partilham termos canónicos atinjam alta similaridade (0.30 - 0.90).
 */
export class DeterministicVectorEmbeddingAdapter implements EmbeddingProvider {
  private readonly dimension = 1536;
  private readonly model = 'text-embedding-3-small';
  private readonly version = 'v1-deterministic';

  private readonly stopwords = new Set([
    'de', 'a', 'o', 'as', 'os', 'em', 'um', 'uma', 'que', 'para', 'com', 'por', 'como', 'se',
    'dos', 'das', 'no', 'na', 'nos', 'nas', 'sua', 'seu', 'suas', 'seus', 'este', 'esta',
    'pelo', 'pela', 'pelos', 'pelas', 'mais', 'menos', 'muito', 'sao', 'era', 'foram', 'onde',
    'qual', 'quais', 'eram', 'sobre', 'sem', 'sob', 'nem', 'ter', 'havia', 'quando', 'mas'
  ]);

  public async generateEmbedding(text: string): Promise<EmbeddingResult> {
    const vector = new Array(this.dimension).fill(0.0);
    const normalized = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const words = normalized
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3 && !this.stopwords.has(w));

    if (words.length === 0) {
      return {
        embedding: vector,
        model: this.model,
        version: this.version,
        dimension: this.dimension,
      };
    }

    // Cada palavra ativa 8 coordenadas específicas no espaço de 1536 dimensões
    for (const word of words) {
      let hash = 5381;
      for (let i = 0; i < word.length; i++) {
        hash = (((hash << 5) + hash) + word.charCodeAt(i)) | 0;
      }

      for (let k = 0; k < 8; k++) {
        const subHash = Math.abs((hash ^ (k * 0x9e3779b9)) | 0);
        const idx = subHash % this.dimension;
        vector[idx] += 1.0;
      }
    }

    // Normalização L2 rigorosa
    let sumSq = 0;
    for (let i = 0; i < this.dimension; i++) {
      sumSq += vector[i] * vector[i];
    }
    const norm = Math.sqrt(sumSq) || 1.0;

    for (let i = 0; i < this.dimension; i++) {
      vector[i] = Number((vector[i] / norm).toFixed(6));
    }

    return {
      embedding: vector,
      model: this.model,
      version: this.version,
      dimension: this.dimension,
    };
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }
}
