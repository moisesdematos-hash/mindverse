import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { globalCouncilEngine } from '../../server/council/councilEngine';
import { CouncilIntervention } from '../../types';
import { CouncilChamber } from './CouncilChamber';
import { councilAudio } from '../../services/councilAudio';
import { 
  Users2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Scale, 
  CheckCircle2, 
  Flame, 
  BookOpen,
  StopCircle,
  Download,
  Copy,
  Check,
  Search,
  AlertCircle,
  Clock,
  Compass,
  ArrowRight,
  Volume2
} from 'lucide-react';

const SUGGESTED_MOTIONS = [
  'Como deve uma liderança moderna equilibrar a inovação e o crescimento rápido com a prudência ética e o bem comum?',
  'Perante o colapso iminente de uma instituição, deve priorizar-se a preservação da ordem pública ou a integridade moral dos cidadãos?',
  'Qual é o papel da verdade e da justiça quando confrontadas com o interesse pragmático do poder político?',
  'Como distribuir os benefícios e mitigar os riscos existenciais do avanço tecnológico sem travar o génio inventivo?',
];

export const AgoraView: React.FC = () => {
  const { 
    agoraParticipants, 
    toggleAgoraParticipant, 
    agoraMotion, 
    setAgoraMotion, 
    agoraRounds, 
    setAgoraRounds,
    councilSession,
    setCouncilSession,
    isCouncilRunning,
    setIsCouncilRunning,
    currentLiveSpeakerId,
    currentLiveChunk,
    setCurrentLiveSpeaker,
    appendLiveChunk,
    addTokensUsed,
    setErrorNotification
  } = useAppStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter] = useState<string>('all');
  const [, setSelectedIntervention] = useState<CouncilIntervention | null>(null);
  const [copiedState, setCopiedState] = useState(false);
  const [activeTab, setActiveTab] = useState<'deliberation' | 'synthesis'>('deliberation');

  const abortControllerRef = useRef<AbortController | null>(null);
  const liveInterventionEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll durante streaming de novas intervenções
  useEffect(() => {
    if (isCouncilRunning) {
      liveInterventionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLiveChunk, councilSession?.rounds, isCouncilRunning]);

  const handleStartCouncil = async () => {
    if (agoraParticipants.length < 2 || !agoraMotion.trim()) return;

    abortControllerRef.current = new AbortController();
    setIsCouncilRunning(true);
    setCurrentLiveSpeaker(null);
    setActiveTab('deliberation');

    try {
      const session = await globalCouncilEngine.createSession({
        motion: agoraMotion,
        participants: agoraParticipants,
        maxRounds: agoraRounds,
      });

      setCouncilSession(session);

      await globalCouncilEngine.runFullCouncil(
        session,
        {
          onSessionUpdate: (updatedSession) => {
            setCouncilSession({ ...updatedSession });
          },
          onInterventionChunk: (speakerId, chunk) => {
            if (currentLiveSpeakerId !== speakerId) {
              setCurrentLiveSpeaker(speakerId, chunk);
            } else {
              appendLiveChunk(chunk);
            }
          },
          onInterventionComplete: (intervention) => {
            setCurrentLiveSpeaker(null);
            addTokensUsed(intervention.tokensUsed);
            // Inicia síntese de voz audível calibrada para esta personalidade
            councilAudio.speak(intervention.personalityId, intervention.content);
          },
          onSynthesisComplete: () => {
            councilAudio.stop();
            setCurrentLiveSpeaker(null);
            setActiveTab('synthesis');
          },
          onError: (err) => {
            councilAudio.stop();
            setErrorNotification(err.message);
          }
        },
        abortControllerRef.current.signal
      );
    } catch (err: any) {
      councilAudio.stop();
      if (err.message?.includes('interrompido')) {
        setErrorNotification('Sessão do Conselho interrompida pelo utilizador.');
      } else {
        setErrorNotification(`Erro na deliberação: ${err.message}`);
      }
    } finally {
      setIsCouncilRunning(false);
      setCurrentLiveSpeaker(null);
      abortControllerRef.current = null;
    }
  };

  const handleStopCouncil = () => {
    councilAudio.stop();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsCouncilRunning(false);
      setCurrentLiveSpeaker(null);
    }
  };

  const handleResetCouncil = () => {
    councilAudio.stop();
    handleStopCouncil();
    setCouncilSession(null);
    setCurrentLiveSpeaker(null);
    setSelectedIntervention(null);
    setActiveTab('deliberation');
  };

  const handleExportMarkdown = () => {
    if (!councilSession) return;

    let md = `# O ÁGORA — CONSELHO DAS GRANDES MENTES\n\n`;
    md += `**Problema Central:** ${councilSession.motion}\n`;
    md += `**Data:** ${new Date(councilSession.createdAt).toLocaleString()}\n`;
    md += `**Participantes:** ${councilSession.participants.map(p => p.name).join(', ')}\n\n`;
    md += `---\n\n`;

    councilSession.rounds.forEach((round) => {
      md += `## ${round.title}\n*${round.description}*\n\n`;
      round.interventions.forEach((int) => {
        md += `### ${int.personalityName} (${int.stage})\n`;
        md += `${int.content}\n\n`;
        if (int.citations.length > 0) {
          md += `**Fontes Primárias Citadas:**\n`;
          int.citations.forEach((c) => {
            md += `- *${c.workTitle}* (${c.section}): "${c.quoteSnippet}"\n`;
          });
          md += `\n`;
        }
      });
    });

    if (councilSession.synthesis) {
      const s = councilSession.synthesis;
      md += `## SÍNTESE CONCLUSIVA DO MODERADOR\n\n`;
      md += `### Diagnóstico Coletivo\n${s.collectiveDiagnosis}\n\n`;
      md += `### Pontos de Concordância Real\n`;
      s.convergences.forEach((c) => md += `- ${c}\n`);
      md += `\n### Divergências Axiológicas Irredutíveis\n`;
      s.irreducibleDivergences.forEach((d) => md += `- ${d}\n`);
      md += `\n### Recomendação Estratégica Fundamentada\n${s.strategicRecommendation}\n\n`;
      md += `### Plano de Ação Recomendado\n`;
      s.actionPlan.forEach((a) => md += `${a.step}. **${a.action}** (Mente: ${a.championMind})\n`);
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agora-conselho-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    if (!councilSession) return;
    const text = councilSession.synthesis 
      ? `DIAGNÓSTICO DO CONSELHO:\n${councilSession.synthesis.collectiveDiagnosis}\n\nRECOMENDAÇÃO:\n${councilSession.synthesis.strategicRecommendation}`
      : councilSession.motion;
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Filtragem da biblioteca de mentes
  const filteredPersonalities = COHORT_GENESIS_PERSONALITIES.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.titleEpithet.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mindverse-graphite/40 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
            <Users2 className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
            <span>O Ágora • Conselho das Grandes Mentes</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-mindverse-softwhite tracking-tight">
            Deliberação Multiagente
          </h1>
          <p className="text-sm text-mindverse-muted max-w-2xl">
            Convoca entre 2 e 7 pensadores históricos com as suas bases RAG canónicas para debater, confrontar argumentos e chegar a decisões fundamentadas.
          </p>
        </div>

        {councilSession && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleCopyClipboard}
              className="p-2.5 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite text-xs text-mindverse-muted hover:text-mindverse-softwhite transition-all flex items-center gap-1.5"
              title="Copiar Resumo"
            >
              {copiedState ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleExportMarkdown}
              className="px-3.5 py-2 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite text-xs text-mindverse-softwhite transition-all flex items-center gap-1.5 font-mono"
            >
              <Download className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Exportar .MD</span>
            </button>
          </div>
        )}
      </div>

      {/* Assembly Setup (Visible when not actively in a session or to review setup) */}
      <div className="p-6 rounded-3xl bg-mindverse-midnight/90 border border-mindverse-graphite space-y-6 shadow-xl">
        {/* Central Problem / Motion */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-2">
            <Scale className="w-4 h-4 text-mindverse-gold-subtle" />
            <span>Problema Central ou Dilema a Submeter ao Conselho</span>
          </label>
          <textarea
            value={agoraMotion}
            onChange={(e) => setAgoraMotion(e.target.value)}
            disabled={isCouncilRunning}
            rows={2}
            placeholder="Ex: Como deve uma organização equilibrar inovação acelerada com rigor ético e sustentabilidade financeira?"
            className="w-full p-4 rounded-2xl bg-mindverse-deep border border-mindverse-graphite focus:border-mindverse-gold-subtle focus:ring-1 focus:ring-mindverse-gold-subtle text-sm text-mindverse-softwhite outline-none resize-none shadow-inner disabled:opacity-50"
          />

          {/* Quick Suggestions */}
          {!isCouncilRunning && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-mindverse-muted flex items-center gap-1">
                <Compass className="w-3 h-3 text-mindverse-gold-subtle" />
                <span>Sugestões de dilemas complexos:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_MOTIONS.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAgoraMotion(m)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-mindverse-deep/70 hover:bg-mindverse-graphite/60 border border-mindverse-graphite/60 text-mindverse-muted hover:text-mindverse-softwhite transition-all text-left line-clamp-1 max-w-md"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Mind Selector (2 to 7) */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold">
                Membros do Conselho ({agoraParticipants.length}/7)
              </span>
              <span className="text-[11px] font-mono text-mindverse-muted">
                (Mínimo 2 • Máximo 7 Mentes)
              </span>
            </div>

            {/* Quick Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-mindverse-muted absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filtrar pensadores..."
                  className="pl-8 pr-3 py-1 rounded-lg bg-mindverse-deep border border-mindverse-graphite text-xs text-mindverse-softwhite placeholder-mindverse-muted outline-none focus:border-mindverse-gold-subtle w-44"
                />
              </div>
            </div>
          </div>

          {/* Grid of the 11 Mentes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {filteredPersonalities.map((p) => {
              const isSelected = agoraParticipants.some((item) => item.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => !isCouncilRunning && toggleAgoraParticipant(p)}
                  disabled={isCouncilRunning}
                  className={`
                    p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-28 relative group
                    ${isSelected
                      ? 'bg-mindverse-midnight border-mindverse-gold-subtle shadow-gold-glow ring-1 ring-mindverse-gold-subtle'
                      : 'bg-mindverse-deep/50 border-mindverse-graphite/60 text-mindverse-muted hover:border-mindverse-graphite hover:text-mindverse-softwhite'
                    }
                    ${isCouncilRunning ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-serif font-bold text-xs text-mindverse-softwhite line-clamp-1">
                      {p.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-mindverse-gold-subtle shrink-0" />
                    )}
                  </div>
                  
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-mindverse-gold-accent block line-clamp-1">
                      {p.historicalEra.split('(')[0]}
                    </span>
                    <span className="text-[9px] text-mindverse-muted line-clamp-1">
                      {p.titleEpithet}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rounds and Execution Controls */}
        <div className="pt-4 border-t border-mindverse-graphite flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-mindverse-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Rondas de Deliberação:</span>
            </span>
            <div className="flex items-center gap-1">
              {[2, 3, 4].map((r) => (
                <button
                  key={r}
                  onClick={() => !isCouncilRunning && setAgoraRounds(r)}
                  disabled={isCouncilRunning}
                  className={`
                    px-2.5 py-1 rounded-lg text-xs font-mono transition-all border
                    ${agoraRounds === r
                      ? 'bg-mindverse-gold-subtle text-mindverse-void border-mindverse-gold-subtle font-bold'
                      : 'bg-mindverse-deep text-mindverse-muted border-mindverse-graphite hover:text-mindverse-softwhite'
                    }
                  `}
                >
                  {r} Rondas
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {councilSession && (
              <button
                onClick={handleResetCouncil}
                disabled={isCouncilRunning}
                className="px-4 py-2.5 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite text-xs text-mindverse-muted hover:text-mindverse-softwhite transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Novo Debate</span>
              </button>
            )}

            {isCouncilRunning ? (
              <button
                onClick={handleStopCouncil}
                className="px-6 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-semibold text-red-300 transition-all flex items-center gap-2 shadow-lg"
              >
                <StopCircle className="w-4 h-4 text-red-400" />
                <span>Interromper</span>
              </button>
            ) : (
              <button
                onClick={handleStartCouncil}
                disabled={agoraParticipants.length < 2 || !agoraMotion.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-mindverse-void transition-all shadow-gold-glow flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Convocar e Iniciar Conselho</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Council Deliberation Chamber */}
      {councilSession && (
        <div className="space-y-6 animate-fade-in">
          {/* Câmara Cénica Audiovisual do Conselho */}
          <CouncilChamber
            participants={councilSession.participants}
            activeSpeakerId={currentLiveSpeakerId}
            liveChunk={currentLiveChunk}
            session={councilSession}
            motion={agoraMotion}
          />

          {/* Navigation Tabs between Deliberation Timeline and Final Synthesis */}
          <div className="flex items-center gap-3 border-b border-mindverse-graphite/60 pb-1">
            <button
              onClick={() => setActiveTab('deliberation')}
              className={`
                px-4 py-2 text-xs font-mono font-semibold transition-all border-b-2 flex items-center gap-2
                ${activeTab === 'deliberation'
                  ? 'border-mindverse-gold-subtle text-mindverse-gold-subtle'
                  : 'border-transparent text-mindverse-muted hover:text-mindverse-softwhite'
                }
              `}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Transcrição das Rondas ({councilSession.rounds.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('synthesis')}
              disabled={!councilSession.synthesis}
              className={`
                px-4 py-2 text-xs font-mono font-semibold transition-all border-b-2 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed
                ${activeTab === 'synthesis'
                  ? 'border-mindverse-gold-subtle text-mindverse-gold-subtle'
                  : 'border-transparent text-mindverse-muted hover:text-mindverse-softwhite'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Síntese Conclusiva do Moderador</span>
            </button>
          </div>

          {/* Tab 1: Deliberation Timeline */}
          {activeTab === 'deliberation' && (
            <div className="space-y-6">
              {councilSession.rounds.map((round) => (
                <div key={round.roundNumber} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 font-mono text-xs font-bold text-mindverse-gold-subtle">
                      {round.title}
                    </span>
                    <span className="text-xs text-mindverse-muted font-mono">
                      {round.description}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {round.interventions.map((int) => (
                      <div
                        key={int.id}
                        className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-graphite/70 space-y-3 shadow-md hover:border-mindverse-graphite transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center font-serif font-bold text-xs text-mindverse-gold-subtle">
                              {int.personalityName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-sm text-mindverse-softwhite">
                                {int.personalityName}
                              </h4>
                              <span className="text-[10px] font-mono text-mindverse-muted">
                                Ronda 0{int.roundNumber} • {int.stage}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`
                              text-[10px] font-mono px-2 py-0.5 rounded-full border
                              ${int.epistemicStatus === 'documented_fact'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : int.epistemicStatus === 'historical_interpretation'
                                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              }
                            `}>
                              {int.epistemicStatus === 'documented_fact' ? 'Facto Documentado' : int.epistemicStatus === 'historical_interpretation' ? 'Interpretação Fundamentada' : 'Simulação Hipotética'}
                            </span>
                            <span className="text-[10px] font-mono text-mindverse-muted">
                              {int.tokensUsed} tokens
                            </span>

                            <button
                              onClick={() => councilAudio.speak(int.personalityId, int.content)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-mindverse-gold/10 hover:bg-mindverse-gold/25 text-[10px] font-mono text-mindverse-gold-light border border-mindverse-gold/30 transition-all hover:scale-105"
                              title={`Ouvir discurso de ${int.personalityName}`}
                            >
                              <Volume2 className="w-3 h-3 text-mindverse-gold" />
                              <span>Ouvir</span>
                            </button>
                          </div>
                        </div>

                        {/* Speech Content */}
                        <div className="text-xs text-mindverse-softwhite leading-relaxed whitespace-pre-line pl-10 border-l border-mindverse-graphite/60">
                          {int.content}
                        </div>

                        {/* Citations Snippets */}
                        {int.citations.length > 0 && (
                          <div className="pl-10 space-y-1.5 pt-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                              <BookOpen className="w-3 h-3 text-mindverse-gold-subtle" />
                              <span>Fontes Primárias Verificadas (RAG 1536d):</span>
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {int.citations.map((c) => (
                                <button
                                  key={c.id}
                                  onClick={() => setSelectedIntervention(int)}
                                  className="text-[10px] px-2.5 py-1 rounded bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite/80 text-mindverse-gold-accent font-mono transition-all text-left"
                                >
                                  {c.workTitle} ({c.section}) • Cosseno: {c.similarityScore.toFixed(3)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Streaming Intervention in Progress */}
              {isCouncilRunning && currentLiveSpeakerId && (
                <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-gold-subtle shadow-gold-glow space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-mono text-mindverse-gold-accent">
                    <span className="w-2 h-2 rounded-full bg-mindverse-gold-subtle animate-ping"></span>
                    <span>Discurso em tempo real no pódio...</span>
                  </div>
                  <div className="text-xs text-mindverse-softwhite leading-relaxed whitespace-pre-line pl-4 border-l-2 border-mindverse-gold-subtle">
                    {currentLiveChunk || 'A elaborar análise a partir dos axiomas e fontes RAG...'}
                  </div>
                  <div ref={liveInterventionEndRef} />
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Moderator Synthesis Report */}
          {activeTab === 'synthesis' && councilSession.synthesis && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-mindverse-midnight via-mindverse-deep to-mindverse-void border border-mindverse-gold-subtle/40 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-mindverse-graphite/60 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-mindverse-gold-subtle" />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
                        Síntese Conclusiva do Conselho do Ágora
                      </h3>
                      <p className="text-xs font-mono text-mindverse-muted">
                        Deliberação lavrada pelo Moderador sem concessões a falso consenso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1. Diagnóstico Coletivo */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-mindverse-gold-subtle" />
                    <span>Diagnóstico Coletivo do Problema</span>
                  </span>
                  <p className="text-xs text-mindverse-softwhite leading-relaxed bg-mindverse-deep/70 p-4 rounded-xl border border-mindverse-graphite/60">
                    {councilSession.synthesis.collectiveDiagnosis}
                  </p>
                </div>

                {/* 2. Convergências e Divergências */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-emerald-500/30 space-y-2.5">
                    <span className="font-mono uppercase text-emerald-400 font-semibold block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pontos de Concordância Real</span>
                    </span>
                    <ul className="space-y-1.5 text-mindverse-softwhite list-disc list-inside">
                      {councilSession.synthesis.convergences.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-amber-500/30 space-y-2.5">
                    <span className="font-mono uppercase text-amber-400 font-semibold block flex items-center gap-1.5">
                      <Flame className="w-4 h-4" />
                      <span>Divergências Axiológicas Irredutíveis</span>
                    </span>
                    <ul className="space-y-1.5 text-mindverse-softwhite list-disc list-inside">
                      {councilSession.synthesis.irreducibleDivergences.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. Argumentos Mais Fortes e Riscos Sistémicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                    <span className="font-mono uppercase text-mindverse-gold-accent font-semibold block">
                      Argumentos Mais Fortes Identificados
                    </span>
                    <ul className="space-y-1.5 text-mindverse-muted list-disc list-inside">
                      {councilSession.synthesis.strongestArguments.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-red-500/20 space-y-2">
                    <span className="font-mono uppercase text-red-400 font-semibold block">
                      Riscos Sistémicos Assinalados
                    </span>
                    <ul className="space-y-1.5 text-mindverse-muted list-disc list-inside">
                      {councilSession.synthesis.systemicRisks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Recomendação Estratégica Fundamentada */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-mindverse-gold-subtle" />
                    <span>Recomendação Estratégica Fundamentada</span>
                  </span>
                  <div className="text-xs text-mindverse-softwhite leading-relaxed bg-mindverse-midnight p-4 rounded-xl border border-mindverse-gold-subtle/30 font-serif">
                    {councilSession.synthesis.strategicRecommendation}
                  </div>
                </div>

                {/* 5. Plano de Ação Recomendado em Etapas */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                    <ArrowRight className="w-4 h-4 text-mindverse-gold-subtle" />
                    <span>Plano de Ação Articulado</span>
                  </span>
                  <div className="space-y-2">
                    {councilSession.synthesis.actionPlan.map((step) => (
                      <div
                        key={step.step}
                        className="p-3 rounded-xl bg-mindverse-deep/80 border border-mindverse-graphite/70 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/40 flex items-center justify-center font-mono font-bold text-mindverse-gold-subtle text-xs">
                            {step.step}
                          </span>
                          <span className="text-mindverse-softwhite font-medium">{step.action}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mindverse-midnight text-mindverse-gold-accent border border-mindverse-graphite">
                          Mente: {step.championMind}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
