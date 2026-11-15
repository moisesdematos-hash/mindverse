import { CorpusDocument, DocumentSection } from '../../data/corpora';

export interface ChunkMetadata {
  documentId: string;
  documentTitle: string;
  author: string;
  personalityId: string;
  book: string;
  chapter: string;
  section: string;
  heading: string;
  bibliographicCitation: string;
  provenance: string;
  sourceUrl: string;
  licenseStatus: string;
  epistemicType: 'primary_source' | 'historical_account' | 'scholarly_commentary';
}

export interface IngestedChunk {
  id: string;
  personalityId: string;
  documentId: string;
  content: string;
  tokenCount: number;
  metadata: ChunkMetadata;
  embeddingModel: string;
  embeddingVersion: string;
  embeddingDimension: number;
}

export class SemanticDocumentChunker {
  private readonly targetChunkSize: number;
  private readonly overlapSize: number;

  constructor(targetChunkSize = 450, overlapSize = 60) {
    this.targetChunkSize = targetChunkSize;
    this.overlapSize = overlapSize;
  }

  /**
   * Normaliza o texto removendo caracteres espúrios e uniformizando espaços.
   */
  public normalizeText(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim();
  }

  /**
   * Estima o número de tokens com base na densidade de caracteres (aproximação canónica de 4 chars/token).
   */
  public estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Divide uma secção de documento em fragmentos com preservação do contexto semântico.
   */
  public chunkSection(
    section: DocumentSection,
    doc: CorpusDocument
  ): IngestedChunk[] {
    const rawContent = `${section.heading}\n\n${section.textOriginalOrTranslation}`;
    const normalized = this.normalizeText(rawContent);
    const estimatedTokens = this.estimateTokens(normalized);

    const baseMetadata: ChunkMetadata = {
      documentId: doc.id,
      documentTitle: doc.title,
      author: doc.author,
      personalityId: doc.personalityId,
      book: section.book,
      chapter: section.chapter,
      section: section.section,
      heading: section.heading,
      bibliographicCitation: section.bibliographicCitation,
      provenance: doc.provenance,
      sourceUrl: doc.sourceUrl,
      licenseStatus: doc.licenseStatus,
      epistemicType: section.epistemicType,
    };

    // Se o texto for conciso e couber dentro do tamanho alvo de chunk, mantemos como unidade atómica
    if (estimatedTokens <= this.targetChunkSize) {
      return [
        {
          id: `chunk-${section.id}-0`,
          personalityId: doc.personalityId,
          documentId: doc.id,
          content: normalized,
          tokenCount: estimatedTokens,
          metadata: baseMetadata,
          embeddingModel: 'text-embedding-3-small',
          embeddingVersion: 'v1',
          embeddingDimension: 1536,
        },
      ];
    }

    // Caso exceda o tamanho alvo, segmentamos por frases com janela deslizante
    const sentences = normalized.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [normalized];
    const chunks: IngestedChunk[] = [];
    let currentChunkSentences: string[] = [];
    let currentLength = 0;
    let chunkIndex = 0;

    for (const sentence of sentences) {
      const sentenceTokens = this.estimateTokens(sentence);

      if (currentLength + sentenceTokens > this.targetChunkSize && currentChunkSentences.length > 0) {
        const chunkText = currentChunkSentences.join(' ').trim();
        chunks.push({
          id: `chunk-${section.id}-${chunkIndex++}`,
          personalityId: doc.personalityId,
          documentId: doc.id,
          content: chunkText,
          tokenCount: this.estimateTokens(chunkText),
          metadata: {
            ...baseMetadata,
            heading: `${section.heading} (Parte ${chunkIndex})`,
          },
          embeddingModel: 'text-embedding-3-small',
          embeddingVersion: 'v1',
          embeddingDimension: 1536,
        });

        // Mantém as últimas frases para criar sobreposição (overlap) semântica
        const overlapSentences: string[] = [];
        let overlapTokens = 0;
        for (let i = currentChunkSentences.length - 1; i >= 0; i--) {
          const s = currentChunkSentences[i];
          const st = this.estimateTokens(s);
          if (overlapTokens + st <= this.overlapSize) {
            overlapSentences.unshift(s);
            overlapTokens += st;
          } else {
            break;
          }
        }
        currentChunkSentences = overlapSentences;
        currentLength = overlapTokens;
      }

      currentChunkSentences.push(sentence.trim());
      currentLength += sentenceTokens;
    }

    if (currentChunkSentences.length > 0) {
      const chunkText = currentChunkSentences.join(' ').trim();
      chunks.push({
        id: `chunk-${section.id}-${chunkIndex}`,
        personalityId: doc.personalityId,
        documentId: doc.id,
        content: chunkText,
        tokenCount: this.estimateTokens(chunkText),
        metadata: {
          ...baseMetadata,
          heading: chunkIndex > 0 ? `${section.heading} (Parte ${chunkIndex + 1})` : section.heading,
        },
        embeddingModel: 'text-embedding-3-small',
        embeddingVersion: 'v1',
        embeddingDimension: 1536,
      });
    }

    return chunks;
  }

  /**
   * Ingesta e fragmenta uma lista completa de documentos canónicos.
   */
  public chunkAllDocuments(documents: CorpusDocument[]): IngestedChunk[] {
    const allChunks: IngestedChunk[] = [];
    for (const doc of documents) {
      for (const section of doc.sections) {
        allChunks.push(...this.chunkSection(section, doc));
      }
    }
    return allChunks;
  }
}
