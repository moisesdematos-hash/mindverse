import { RAGSearchResult } from '../rag/ragEngine';
import { Personality } from '../../types';

export interface PromptPayload {
  systemPrompt: string;
  userPrompt: string;
  retrievedCitations: Array<{
    citation: string;
    workTitle: string;
    section: string;
    similarityScore: number;
    epistemicType: string;
  }>;
  hasSufficientContext: boolean;
}

export class IntellectualPromptAssembler {
  /**
   * Monta o prompt do sistema fundado nos axiomas, mundivisão e contexto RAG recuperado.
   */
  public assemble(
    personality: Personality,
    userQuery: string,
    ragResults: RAGSearchResult[]
  ): PromptPayload {
    const hasSufficientContext = ragResults.length > 0;

    let sourcesBlock = '';
    const citations: PromptPayload['retrievedCitations'] = [];

    if (hasSufficientContext) {
      sourcesBlock = ragResults
        .map((r, i) => {
          citations.push({
            citation: r.chunk.metadata.bibliographicCitation,
            workTitle: r.chunk.metadata.documentTitle,
            section: `${r.chunk.metadata.book}, ${r.chunk.metadata.chapter} (${r.chunk.metadata.section})`,
            similarityScore: r.similarityScore,
            epistemicType: r.chunk.metadata.epistemicType,
          });

          return `--- [FONTE ${i + 1}: ${r.chunk.metadata.bibliographicCitation}] ---\n${r.chunk.content}`;
        })
        .join('\n\n');
    } else {
      sourcesBlock =
        '[AVISO DO MOTOR RAG: Nenhuma passagem das tuas obras canónicas atingiu o limiar de relevância para esta consulta. Deves reconhecer explicitamente a carência documental em vez de inventar dados ou citações].';
    }

    const systemPrompt = `
# IDENTIDADE INTELECTUAL HISTÓRICA E PAPEL
És ${personality.name}, conhecido como ${personality.titleEpithet}.
Época Histórica: ${personality.historicalEra} (Vivido entre ${personality.bornYear < 0 ? Math.abs(personality.bornYear) + ' a.C.' : personality.bornYear + ' d.C.'} e ${personality.deathYear < 0 ? Math.abs(personality.deathYear) + ' a.C.' : personality.deathYear + ' d.C.'}).

MUNDIVISÃO FUNDAMENTAL:
${personality.coreWorldview}

AXIOMAS DE RACIOCÍNIO INEGOCIÁVEIS:
${personality.axioms.map((a, idx) => `${idx + 1}. ${a}`).join('\n')}

CONTEXTO HISTORIOGRÁFICO, VIESES E LIMITAÇÕES DA TUA FONTE:
${personality.historicalContextNotes}

# CORPUS DOCUMENTAL PRIMÁRIO RECUPERADO (RAG PGVECTOR 1536D):
${sourcesBlock}

# DIRETIVAS OBRIGATÓRIAS DE RESPOSTA E TRANSPARÊNCIA EPISTÉMICA:
1. Responde na primeira pessoa, adotando o teu estilo retórico característico e gravidade intelectual.
2. Fundamenta todas as afirmações nas passagens do teu corpus fornecido acima, indicando a citação bibliográfica exata entre parênteses retos [ex: ${personality.works[0]?.title || 'Obra Canónica'}, Livro...].
3. CLASSIFICAÇÃO EPISTÉMICA OBRIGATÓRIA:
   - Usa a etiqueta "[FACTO DOCUMENTADO]" quando relatares eventos, teses ou leis atestadas diretamente nas tuas obras.
   - Usa a etiqueta "[INTERPRETAÇÃO FUNDAMENTADA]" quando desenvolveres uma inferência ou comentário deduzido dos teus princípios.
   - Usa a etiqueta "[SIMULAÇÃO HIPOTÉTICA]" se o interlocutor perguntar sobre o mundo moderno ou conceitos posteriores à tua época histórica, analisando-os dedutivamente sem fingir que viveste no século XXI.
4. RIGOR DE NÃO-ALUCINAÇÃO:
   - Se o corpus documental for insuficiente ou não contiver dados sobre o que foi perguntado, deves declarar explicitamente: "Nos meus escritos preservados não possuo registo suficiente para fundamentar uma resposta definitiva sobre esta matéria."
   - Nunca inventes acontecimentos, batalhas, datas, tratados ou citações.
`.trim();

    return {
      systemPrompt,
      userPrompt: userQuery,
      retrievedCitations: citations,
      hasSufficientContext,
    };
  }
}
