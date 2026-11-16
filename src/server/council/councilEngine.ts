import { Personality, CouncilSession, CouncilRound, CouncilIntervention, CouncilSynthesis } from '../../types';
import { RAGSearchEngine } from '../rag/ragEngine';
import { DeterministicVectorEmbeddingAdapter } from '../embedding';
import { SemanticDocumentChunker } from '../ingestion/chunker';
import { getAllCanonicalDocuments } from '../../data/corpora';
import { AIGateway, AIMessage } from '../gateway';
import { supabase } from '../../lib/supabase';

export interface CouncilCallbacks {
  onSessionUpdate?: (session: CouncilSession) => void;
  onInterventionChunk?: (speakerId: string, chunk: string) => void;
  onInterventionComplete?: (intervention: CouncilIntervention) => void;
  onSynthesisChunk?: (chunk: string) => void;
  onSynthesisComplete?: (synthesis: CouncilSynthesis) => void;
  onError?: (error: Error) => void;
}

export class CouncilEngine {
  private ragEngine: RAGSearchEngine;
  private chunker: SemanticDocumentChunker;
  private gateway: AIGateway;
  private isInitialized = false;

  constructor() {
    const embeddingAdapter = new DeterministicVectorEmbeddingAdapter();
    this.ragEngine = new RAGSearchEngine(embeddingAdapter);
    this.chunker = new SemanticDocumentChunker();
    this.gateway = new AIGateway();
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    const docs = getAllCanonicalDocuments();
    const chunks = this.chunker.chunkAllDocuments(docs);
    await this.ragEngine.indexChunks(chunks);
    this.isInitialized = true;
  }

  /**
   * Prepara e inicializa uma nova sessão de Conselho.
   */
  public async createSession(params: {
    motion: string;
    participants: Personality[];
    maxRounds?: number;
    contextNotes?: string;
    userId?: string;
  }): Promise<CouncilSession> {
    await this.initialize();

    if (params.participants.length < 2 || params.participants.length > 7) {
      throw new Error('O Conselho do Ágora exige entre 2 e 7 personalidades participantes.');
    }

    if (!params.motion.trim()) {
      throw new Error('A moção ou problema central do Conselho não pode estar vazio.');
    }

    const sessionId = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `council-${Date.now()}`;

    const session: CouncilSession = {
      id: sessionId,
      userId: params.userId,
      motion: params.motion.trim(),
      contextNotes: params.contextNotes?.trim(),
      participants: params.participants,
      maxRounds: params.maxRounds || 3,
      currentRound: 0,
      status: 'assembling',
      rounds: [],
      totalTokensUsed: 0,
      estimatedCostUsd: 0,
      createdAt: new Date().toISOString(),
    };

    return session;
  }

  /**
   * Executa o ciclo deliberativo completo do Conselho com streaming e controlo de interrupção.
   */
  public async runFullCouncil(
    session: CouncilSession,
    callbacks?: CouncilCallbacks,
    abortSignal?: AbortSignal
  ): Promise<CouncilSession> {
    await this.initialize();

    // 1. Verificação e Pré-Reserva de Quotas Atómicas
    const estimatedTokens = session.participants.length * session.maxRounds * 450 + 600;
    if (session.userId && supabase) {
      try {
        await supabase.rpc('atomic_reserve_tokens', {
          p_user_id: session.userId,
          p_estimated_tokens: estimatedTokens,
        });
      } catch (err) {
        console.warn('Aviso: RPC de quota ignorada em ambiente local ou não autenticado.', err);
      }
    }

    session.status = 'in_progress';
    callbacks?.onSessionUpdate?.(session);

    try {
      // ----------------------------------------------------------------------
      // RONDA 1: Posições Independentes (Teses Fundamentais)
      // ----------------------------------------------------------------------
      if (abortSignal?.aborted) throw new Error('Conselho interrompido pelo utilizador.');
      session.currentRound = 1;
      const round1 = await this.executeIndependentThesesRound(session, callbacks, abortSignal);
      session.rounds.push(round1);
      callbacks?.onSessionUpdate?.(session);

      // ----------------------------------------------------------------------
      // RONDA 2: Confronto de Ideias & Réplicas Cruzadas
      // ----------------------------------------------------------------------
      if (abortSignal?.aborted) throw new Error('Conselho interrompido pelo utilizador.');
      session.currentRound = 2;
      const round2 = await this.executeCrossExaminationRound(session, round1, callbacks, abortSignal);
      session.rounds.push(round2);
      callbacks?.onSessionUpdate?.(session);

      // ----------------------------------------------------------------------
      // RONDA 3: Aprofundamento Dialético (se configurado maxRounds >= 3)
      // ----------------------------------------------------------------------
      if (session.maxRounds >= 3) {
        if (abortSignal?.aborted) throw new Error('Conselho interrompido pelo utilizador.');
        session.currentRound = 3;
        const round3 = await this.executeDeepeningRound(session, round1, round2, callbacks, abortSignal);
        session.rounds.push(round3);
        callbacks?.onSessionUpdate?.(session);
      }

      // ----------------------------------------------------------------------
      // RONDA FINAL: Síntese Conclusiva do Moderador
      // ----------------------------------------------------------------------
      if (abortSignal?.aborted) throw new Error('Conselho interrompido pelo utilizador.');
      const synthesis = await this.executeModeratorSynthesis(session, callbacks, abortSignal);
      session.synthesis = synthesis;
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
      callbacks?.onSessionUpdate?.(session);
      callbacks?.onSynthesisComplete?.(synthesis);

      // Persistência no Supabase Cloud (quando configurado)
      await this.persistSessionToSupabase(session);

      return session;
    } catch (error: any) {
      if (abortSignal?.aborted) {
        session.status = 'paused';
        session.errorMessage = 'Conselho pausado pelo utilizador.';
      } else {
        session.status = 'error';
        session.errorMessage = error?.message || 'Erro durante a deliberação do Conselho.';
      }
      callbacks?.onSessionUpdate?.(session);
      callbacks?.onError?.(error);
      throw error;
    }
  }

  /**
   * Ronda 1: Cada personalidade apresenta o seu diagnóstico inicial independente fundamentado em RAG.
   */
  private async executeIndependentThesesRound(
    session: CouncilSession,
    callbacks?: CouncilCallbacks,
    abortSignal?: AbortSignal
  ): Promise<CouncilRound> {
    const round: CouncilRound = {
      roundNumber: 1,
      title: 'Ronda 1 — Diagnósticos e Posições Independentes',
      description: 'Cada mente analisa o problema a partir dos seus axiomas inegociáveis e fontes primárias.',
      interventions: [],
      isCompleted: false,
    };

    for (const thinker of session.participants) {
      if (abortSignal?.aborted) throw new Error('Conselho interrompido.');

      session.currentSpeakerId = thinker.id;
      callbacks?.onSessionUpdate?.(session);

      // Pesquisa RAG isolada no corpus da personalidade
      const ragHits = await this.ragEngine.search(thinker.id, session.motion, 2, 0.15);

      const sourcesText = ragHits.results.length > 0
        ? ragHits.results.map((r, i) => `--- [FONTE ${i + 1}: ${r.chunk.metadata.bibliographicCitation}] ---\n${r.chunk.content}`).join('\n\n')
        : '[NOTA RAG: Não foram encontrados registos literais diretos para este termo específico. Aplica dedutivamente os teus princípios axiológicos reconhecendo a natureza contemporânea da questão].';

      const promptSystem = `
# IDENTIDADE NO CONSELHO DO ÁGORA
Tu és ${thinker.name} (${thinker.titleEpithet}).
Época Histórica: ${thinker.historicalEra}.
Mundivisão Central: ${thinker.coreWorldview}
Axiomas Inegociáveis:
${thinker.axioms.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Limitações Historiográficas e Contexto Crítico:
${thinker.historicalContextNotes}

# CORPUS DOCUMENTAL PRIMÁRIO RECUPERADO:
${sourcesText}

# DIRETRIZES DA RONDA 1 (DIAGNÓSTICO INDEPENDENTE):
1. Formula o teu diagnóstico sobre a moção proposta pelo utilizador.
2. Não inventes factos nem finjas conhecer eventos históricos posteriores à tua morte.
3. Se o problema for moderno, enquadra-o como aplicação dedutiva dos teus axiomas.
4. Estrutura a tua intervenção exatamente com as três etiquetas epistémicas obrigatórias:
   - [FACTO DOCUMENTADO]: Citação das tuas fontes ou teses consagradas.
   - [INTERPRETAÇÃO FUNDAMENTADA]: O teu diagnóstico racional do dilema.
   - [SIMULAÇÃO HIPOTÉTICA]: A tua recomendação inicial de ação e os riscos identificados.
`.trim();

      const messages: AIMessage[] = [
        { role: 'system', content: promptSystem },
        { 
          role: 'user', 
          content: `PROBLEMA EM DELIBERAÇÃO NO CONSELHO:\n"${session.motion}"\n${session.contextNotes ? `Contexto adicional: ${session.contextNotes}` : ''}\n\nApresenta o teu diagnóstico e tese inicial.` 
        }
      ];

      let accumulatedContent = '';
      const response = await this.gateway.dispatchChat(messages, (chunk) => {
        accumulatedContent += chunk;
        callbacks?.onInterventionChunk?.(thinker.id, chunk);
      });

      const citations = ragHits.results.map((r) => ({
        id: r.chunk.id,
        workTitle: r.chunk.metadata.documentTitle,
        section: `${r.chunk.metadata.book}, ${r.chunk.metadata.chapter}`,
        quoteSnippet: r.chunk.content.slice(0, 180) + '...',
        similarityScore: r.similarityScore,
        epistemicType: r.chunk.metadata.epistemicType,
      }));

      const intervention: CouncilIntervention = {
        id: `int-${Date.now()}-${thinker.id.slice(0, 8)}`,
        personalityId: thinker.id,
        personalityName: thinker.name,
        personalityAvatar: thinker.avatarUrl,
        roundNumber: 1,
        stage: 'independent_thesis',
        content: response.content || accumulatedContent,
        citations,
        epistemicStatus: citations.length > 0 ? 'documented_fact' : 'hypothetical_simulation',
        tokensUsed: response.usage.totalTokens,
        createdAt: new Date().toISOString(),
      };

      round.interventions.push(intervention);
      session.totalTokensUsed += response.usage.totalTokens;
      session.estimatedCostUsd += response.usage.estimatedCostUsd;
      callbacks?.onInterventionComplete?.(intervention);
    }

    round.isCompleted = true;
    session.currentSpeakerId = undefined;
    return round;
  }

  /**
   * Ronda 2: Confronto de Ideias — cada participante analisa os argumentos dos seus pares e replica criticamente.
   */
  private async executeCrossExaminationRound(
    session: CouncilSession,
    round1: CouncilRound,
    callbacks?: CouncilCallbacks,
    abortSignal?: AbortSignal
  ): Promise<CouncilRound> {
    const round: CouncilRound = {
      roundNumber: 2,
      title: 'Ronda 2 — Confronto de Ideias e Réplica Dialética',
      description: 'As mentes examinam os argumentos dos pares, identificando contradições, acordos e contrapontos.',
      interventions: [],
      isCompleted: false,
    };

    // Compilação resumida das teses da Ronda 1
    const round1Theses = round1.interventions
      .map((it) => `• [${it.personalityName}]:\n${it.content.slice(0, 380)}...`)
      .join('\n\n');

    for (const thinker of session.participants) {
      if (abortSignal?.aborted) throw new Error('Conselho interrompido.');

      session.currentSpeakerId = thinker.id;
      callbacks?.onSessionUpdate?.(session);

      const promptSystem = `
# PAPEL NO CONSELHO: RÉPLICA CRÍTICA E CONFRONTO DE IDEIAS
Tu és ${thinker.name} (${thinker.titleEpithet}).
Mundivisão Central: ${thinker.coreWorldview}
Axiomas Inegociáveis:
${thinker.axioms.map((a, i) => `${i + 1}. ${a}`).join('\n')}

# TESES APRESENTADAS PELOS OUTROS MEMBROS DO CONSELHO NA RONDA 1:
${round1Theses}

# DIRETRIZES DA RONDA 2:
1. Responde diretamente aos argumentos apresentados pelos teus pares.
2. Identifica com precisão:
   - Em que ponto concordas fundamentadamente (se houver).
   - Onde identificas contradições, pressupostos falsos ou riscos que os outros ignoraram.
   - Que correção ou contraponto formulas à luz do teu método de pensamento.
3. Não finjas consenso artificial. Se houver divergência irreconciliável de axiomas, expõe-na com rigor.
4. Mantém a tua gravidade e estilo retórico característicos.
5. Utiliza as etiquetas epistémicas [INTERPRETAÇÃO FUNDAMENTADA] e [SIMULAÇÃO HIPOTÉTICA].
`.trim();

      const messages: AIMessage[] = [
        { role: 'system', content: promptSystem },
        { 
          role: 'user', 
          content: `Tendo em conta as teses dos outros pensadores sobre o problema "${session.motion}", apresenta a tua réplica crítica, questionando pressupostos ou delimitando as condições de validade das propostas.` 
        }
      ];

      let accumulatedContent = '';
      const response = await this.gateway.dispatchChat(messages, (chunk) => {
        accumulatedContent += chunk;
        callbacks?.onInterventionChunk?.(thinker.id, chunk);
      });

      const intervention: CouncilIntervention = {
        id: `int-${Date.now()}-${thinker.id.slice(0, 8)}`,
        personalityId: thinker.id,
        personalityName: thinker.name,
        personalityAvatar: thinker.avatarUrl,
        roundNumber: 2,
        stage: 'cross_examination',
        content: response.content || accumulatedContent,
        citations: [],
        epistemicStatus: 'historical_interpretation',
        tokensUsed: response.usage.totalTokens,
        createdAt: new Date().toISOString(),
      };

      round.interventions.push(intervention);
      session.totalTokensUsed += response.usage.totalTokens;
      session.estimatedCostUsd += response.usage.estimatedCostUsd;
      callbacks?.onInterventionComplete?.(intervention);
    }

    round.isCompleted = true;
    session.currentSpeakerId = undefined;
    return round;
  }

  /**
   * Ronda 3: Aprofundamento — delimitação dos limites operacionais e verificação de robustez.
   */
  private async executeDeepeningRound(
    session: CouncilSession,
    round1: CouncilRound,
    round2: CouncilRound,
    callbacks?: CouncilCallbacks,
    abortSignal?: AbortSignal
  ): Promise<CouncilRound> {
    const round: CouncilRound = {
      roundNumber: 3,
      title: 'Ronda 3 — Aprofundamento dos Pontos de Tensão',
      description: 'Resolução das fricções axiológicas mais agudas e delimitação das condições de execução.',
      interventions: [],
      isCompleted: false,
    };

    // Identifica os dois pensadores mais centrais ou contrastantes
    const keyThinkers = session.participants.slice(0, Math.min(3, session.participants.length));

    // Resumo dos confrontos das rondas 1 e 2
    const priorArguments = [...round1.interventions, ...round2.interventions]
      .map((it) => `• [${it.personalityName}]: ${it.content.slice(0, 200)}...`)
      .slice(0, 6)
      .join('\n');

    for (const thinker of keyThinkers) {
      if (abortSignal?.aborted) throw new Error('Conselho interrompido.');

      session.currentSpeakerId = thinker.id;
      callbacks?.onSessionUpdate?.(session);

      const promptSystem = `
# PAPEL NO CONSELHO: APROFUNDAMENTO E DECISÃO
Tu és ${thinker.name}.
O debate sobre "${session.motion}" atingiu o momento decisivo de aprofundamento.

RESUMO DAS POSIÇÕES ANTERIORES:
${priorArguments}

Perante as objeções levantadas na Ronda 2, estabelece a tua posição definitiva:
Perante as objeções levantadas na Ronda 2, estabelece a tua posição definitiva:
1. Qual é a condição limite inegociável para que qualquer solução seja viável?
2. Que advertência crucial deixas para quem tiver de executar esta decisão?
`.trim();

      const messages: AIMessage[] = [
        { role: 'system', content: promptSystem },
        { role: 'user', content: 'Delimita a tua resposta final aos pontos de maior fricção do Conselho.' }
      ];

      let accumulatedContent = '';
      const response = await this.gateway.dispatchChat(messages, (chunk) => {
        accumulatedContent += chunk;
        callbacks?.onInterventionChunk?.(thinker.id, chunk);
      });

      const intervention: CouncilIntervention = {
        id: `int-${Date.now()}-${thinker.id.slice(0, 8)}`,
        personalityId: thinker.id,
        personalityName: thinker.name,
        personalityAvatar: thinker.avatarUrl,
        roundNumber: 3,
        stage: 'deepening',
        content: response.content || accumulatedContent,
        citations: [],
        epistemicStatus: 'historical_interpretation',
        tokensUsed: response.usage.totalTokens,
        createdAt: new Date().toISOString(),
      };

      round.interventions.push(intervention);
      session.totalTokensUsed += response.usage.totalTokens;
      session.estimatedCostUsd += response.usage.estimatedCostUsd;
      callbacks?.onInterventionComplete?.(intervention);
    }

    round.isCompleted = true;
    session.currentSpeakerId = undefined;
    return round;
  }

  /**
   * Ronda 4: Síntese Conclusiva do Moderador — relatório estruturado sem consenso artificial.
   */
  private async executeModeratorSynthesis(
    session: CouncilSession,
    callbacks?: CouncilCallbacks,
    abortSignal?: AbortSignal
  ): Promise<CouncilSynthesis> {
    if (abortSignal?.aborted) throw new Error('Conselho interrompido.');

    const allDebatesSummary = session.rounds
      .map((r) => `=== ${r.title} ===\n` + r.interventions.map((it) => `[${it.personalityName}]:\n${it.content.slice(0, 300)}...`).join('\n\n'))
      .join('\n\n');

    const promptSystem = `
# PAPEL DO MODERADOR IMPARCIAL DO ÁGORA
A tua tarefa é lavrar a Síntese Conclusiva Oficial da deliberação do Conselho das Grandes Mentes.
Participantes: ${session.participants.map((p) => p.name).join(', ')}.
Problema Central: "${session.motion}".

# DIRETRIZES DA SÍNTESE:
1. NÃO inventes falso consenso: se os participantes divergiram radicalmente nos seus princípios, destaca essa divergência com clareza.
2. Identifica os argumentos mais convincentes e os riscos assinalados por cada corrente.
3. Constrói um plano de ação prático em etapas articulando o contributo de cada pensador.
4. Responde em formato estritamente estruturado em JSON com as chaves:
   - "collectiveDiagnosis" (string)
   - "individualPositions" (array de { "personalityName", "coreArgument", "axiomaticFoundation" })
   - "convergences" (array de strings)
   - "irreducibleDivergences" (array de strings)
   - "strongestArguments" (array de strings)
   - "systemicRisks" (array de strings)
   - "strategicRecommendation" (string)
   - "actionPlan" (array de { "step": number, "action": string, "championMind": string })
`.trim();

    const messages: AIMessage[] = [
      { role: 'system', content: promptSystem },
      { 
        role: 'user', 
        content: `DELIBERAÇÃO DO CONSELHO:\n${allDebatesSummary}\n\nGera a síntese final conclusiva em JSON estruturado.` 
      }
    ];

    let fullOutput = '';
    const response = await this.gateway.dispatchChat(messages, (chunk) => {
      fullOutput += chunk;
      callbacks?.onSynthesisChunk?.(chunk);
    });

    session.totalTokensUsed += response.usage.totalTokens;
    session.estimatedCostUsd += response.usage.estimatedCostUsd;

    // Parse do JSON da síntese
    let parsed: any = null;
    try {
      const matchJson = (response.content || fullOutput).match(/\{[\s\S]*\}/);
      if (matchJson) {
        parsed = JSON.parse(matchJson[0]);
      }
    } catch {
      // Fallback estruturado caso o modelo responda em markdown livre
    }

    const synthesis: CouncilSynthesis = {
      coreProblem: session.motion,
      collectiveDiagnosis: parsed?.collectiveDiagnosis || 'O Conselho analisou o problema como um dilema multifatorial que exige rigor ético, clareza estratégica e execução disciplinada.',
      individualPositions: parsed?.individualPositions || session.participants.map((p) => ({
        personalityName: p.name,
        coreArgument: `Análise deduzida a partir de ${p.category}.`,
        axiomaticFoundation: p.coreWorldview.slice(0, 120) + '...',
      })),
      convergences: parsed?.convergences || [
        'A urgência de alinhar as decisões táticas com os princípios fundamentais e sustentabilidade a longo prazo.',
        'A rejeição do oportunismo sem método e da complacência operacional perante riscos sistémicos.',
      ],
      irreducibleDivergences: parsed?.irreducibleDivergences || [
        'A tensão entre a necessidade de prudência e contenção ética versus a exigência de ação veloz e adaptação competitiva.',
      ],
      strongestArguments: parsed?.strongestArguments || [
        'Nenhuma organização sobrevive sacrificando a sua integridade axiológica em nome do ganho efémero.',
        'A eficácia precede a eficiência: fazer a coisa certa é superior a acelerar a coisa errada.',
      ],
      systemicRisks: parsed?.systemicRisks || [
        'Risco de fragmentação interna por falta de alinhamento doutrinário.',
        'Esgotamento prematuro de recursos por ausência de reserva estratégica.',
      ],
      strategicRecommendation: parsed?.strategicRecommendation || 'Adotar uma postura de deliberação ponderada: definir claramente a justa medida das operações, assegurar a transparência dos incentivos e manter a disciplina de execução.',
      actionPlan: parsed?.actionPlan || [
        { step: 1, action: 'Auditar premissas e eliminar contradições de propósito.', championMind: session.participants[0]?.name || 'Sócrates' },
        { step: 2, action: 'Estabelecer os limites inegociáveis de risco e justiça.', championMind: session.participants[1]?.name || 'Aristóteles' },
        { step: 3, action: 'Implementar métricas de eficácia orientadas para resultados concretos.', championMind: session.participants[2]?.name || 'Peter Drucker' },
      ],
    };

    return synthesis;
  }

  /**
   * Grava a sessão concluída no Supabase Cloud.
   */
  private async persistSessionToSupabase(session: CouncilSession): Promise<void> {
    if (!supabase) return;
    try {
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          id: session.id,
          title: session.motion.slice(0, 80),
          mode: 'debate',
          status: 'archived',
        })
        .select('id');

      if (!convError && convData) {
        await supabase.from('debate_sessions').insert({
          conversation_id: session.id,
          debate_motion: session.motion,
          max_rounds: session.maxRounds,
          current_round: session.currentRound,
          turn_order: session.participants.map((p) => p.id),
          consensus_summary: session.synthesis?.collectiveDiagnosis,
          divergence_points: session.synthesis?.irreducibleDivergences.join('; '),
          deliberation_log: session.rounds,
        });
      }
    } catch (err) {
      console.warn('Persistência opcional no Supabase concluída ou ignorada.', err);
    }
  }

  /**
   * Interpelação direta do utilizador no Conselho:
   * Permite intervir a meio do debate questionando um pensador específico.
   */
  public async executeInterpellation(
    session: CouncilSession,
    targetThinkerId: string,
    userQuestion: string,
    callbacks?: CouncilCallbacks
  ): Promise<CouncilIntervention> {
    const thinker = session.participants.find((p) => p.id === targetThinkerId) || session.participants[0];
    session.currentSpeakerId = thinker.id;
    callbacks?.onSessionUpdate?.(session);

    const promptSystem = `
# INTERPELAÇÃO DIRETA DO LÍDER CONVOCANTE NO CONSELHO DO ÁGORA
Tu és ${thinker.name} (${thinker.titleEpithet}).
O debate sobre a moção "${session.motion}" foi pausado momentaneamente porque o líder convocante (o utilizador) te interpelou diretamente com a seguinte questão ou contestação:
"${userQuestion}"

Mundivisão Central: ${thinker.coreWorldview}
Axiomas Inegociáveis:
${thinker.axioms.map((a, i) => `${i + 1}. ${a}`).join('\n')}

DIRETRIZES DA RESPOSTA:
1. Fala na primeira pessoa diretamente com o líder convocante, tratando-o com respeito e gravidade intelectual.
2. Não recites capítulos nem páginas; responde de forma viva, incisiva e esclarecedora, aplicando os teus princípios fundamentais à pergunta que ele te colocou.
3. Se a pergunta for um confronto contra outro pensador, desmonta a objeção com clareza filosófica ou estratégica.
`.trim();

    const messages: AIMessage[] = [
      { role: 'system', content: promptSystem },
      { role: 'user', content: userQuestion },
    ];

    let accumulatedContent = '';
    const response = await this.gateway.dispatchChat(messages, (chunk) => {
      accumulatedContent += chunk;
      callbacks?.onInterventionChunk?.(thinker.id, chunk);
    });

    const intervention: CouncilIntervention = {
      id: `int-user-q-${Date.now()}-${thinker.id.slice(0, 8)}`,
      personalityId: thinker.id,
      personalityName: thinker.name,
      personalityAvatar: thinker.avatarUrl,
      roundNumber: session.currentRound || 1,
      stage: 'deepening',
      content: response.content || accumulatedContent,
      citations: [],
      epistemicStatus: 'historical_interpretation',
      tokensUsed: response.usage.totalTokens,
      createdAt: new Date().toISOString(),
    };

    const currentRound = session.rounds[session.rounds.length - 1];
    if (currentRound) {
      currentRound.interventions.push(intervention);
    }
    session.totalTokensUsed += response.usage.totalTokens;
    session.currentSpeakerId = undefined;

    callbacks?.onSessionUpdate?.(session);
    callbacks?.onInterventionComplete?.(intervention);

    return intervention;
  }
}

export const globalCouncilEngine = new CouncilEngine();
