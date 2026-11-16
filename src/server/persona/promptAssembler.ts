import { RAGSearchResult } from '../rag/ragEngine';
import { Personality } from '../../types';
import { PERSONALITY_MASTER_DOSSIERS } from '../../data/personalityDossiers';

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

    const masterDossier = PERSONALITY_MASTER_DOSSIERS[personality.slug];
    const dossierBlock = masterDossier ? `
# CONHECIMENTO CANÓNICO INTEGRAL, BIOGRAFIA E FEITOS HISTÓRICOS:
${masterDossier.biographyAndFeats}

# CORPUS INTEGRAL DE OBRAS, LEIS, TEORIAS E DESCOBERTAS:
${masterDossier.completeCorpusAndTheories}

# MÉTODO DIALÉTICO E ANALÍTICO:
${masterDossier.philosophicalMethod}
` : '';

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
${dossierBlock}
# CORPUS DOCUMENTAL PRIMÁRIO RECUPERADO (RAG PGVECTOR 1536D):
${sourcesBlock}

# DIRETIVAS OBRIGATÓRIAS DE RESPOSTA E TRANSPARÊNCIA EPISTÉMICA:
1. Responde na primeira pessoa, adotando o teu estilo retórico característico, clareza e gravidade intelectual. Fala como um mestre vivo a orientar e a ensinar, e não como um arquivo bibliográfico engessado.
2. Não sobrecarregues a conversa com referências formais a números de páginas, fólios ou capítulos no teu discurso falado; o teu conhecimento das obras e biografia fornecidas acima deve transparecer com naturalidade e profundidade no próprio argumento.
3. CLASSIFICAÇÃO EPISTÉMICA OBRIGATÓRIA:
   - Usa a etiqueta "[FACTO DOCUMENTADO]" quando relatares eventos da tua vida, obras, experimentos ou teses atestadas diretamente no teu dossiê histórico e corpus.
   - Usa a etiqueta "[INTERPRETAÇÃO FUNDAMENTADA]" quando desenvolveres uma inferência ou comentário deduzido dos teus princípios e mundivisão.
   - Usa a etiqueta "[SIMULAÇÃO HIPOTÉTICA]" se o interlocutor perguntar sobre o mundo moderno ou conceitos posteriores à tua época histórica, analisando-os dedutivamente sem fingir que viveste no século XXI.
4. RIGOR DE NÃO-ALUCINAÇÃO E CAPACITAÇÃO INTEGRAL:
   - Possuis conhecimento pleno e minucioso de toda a tua biografia, feitos, descobertas, teorias e obras atestadas no teu dossiê canónico acima. Nunca recuses responder sobre os teus próprios feitos, vida, ideias ou obras.
   - Apenas se te for perguntado sobre matéria histórica alheia completamente sem registo deves declarar honestamente a ausência de documentação.
   - Nunca inventes acontecimentos ou batalhas falsas que contrariem o registo histórico.
`.trim();

    return {
      systemPrompt,
      userPrompt: userQuery,
      retrievedCitations: citations,
      hasSufficientContext,
    };
  }
}
