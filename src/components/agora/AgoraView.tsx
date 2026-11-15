import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { 
  Users2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Scale, 
  CheckCircle2, 
  Flame, 
  BookOpen,
  Layers
} from 'lucide-react';

export const AgoraView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    agoraParticipants, 
    toggleAgoraParticipant, 
    agoraMotion, 
    setAgoraMotion, 
    agoraRounds, 
    setAgoraRounds 
  } = useAppStore();

  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(0);
  const [isCouncilReady, setIsCouncilReady] = useState(false);

  const handleAssembleCouncil = () => {
    if (agoraParticipants.length < 2) return;
    setIsCouncilReady(true);
    setActiveSpeakerIndex(0);
  };

  const handleResetCouncil = () => {
    setIsCouncilReady(false);
    setActiveSpeakerIndex(0);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
          <Users2 className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <span>O Ágora • Senado Multiagente</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-mindverse-softwhite">
          {t('agora.title')}
        </h1>
        <p className="text-sm text-mindverse-muted max-w-3xl">
          {t('agora.subtitle')}
        </p>
      </div>

      {/* Council Setup Panel */}
      <div className="p-6 rounded-3xl bg-mindverse-midnight/80 border border-mindverse-graphite space-y-6 shadow-xl">
        {/* Motion Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold flex items-center gap-2">
            <Scale className="w-4 h-4 text-mindverse-gold-subtle" />
            {t('agora.motion_label')}
          </label>
          <textarea
            value={agoraMotion}
            onChange={(e) => setAgoraMotion(e.target.value)}
            rows={2}
            placeholder={t('agora.motion_placeholder')}
            className="w-full p-3.5 rounded-xl bg-mindverse-deep border border-mindverse-graphite focus:border-mindverse-gold-subtle focus:ring-1 focus:ring-mindverse-gold-subtle text-sm text-mindverse-softwhite outline-none resize-none shadow-inner"
          />
        </div>

        {/* Personality Picker for the Council (2 to 4) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold">
              {t('agora.select_speakers')} ({agoraParticipants.length}/4)
            </span>
            <span className="text-[11px] font-mono text-mindverse-muted">
              Mínimo 2 • Máximo 4 Mentes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {COHORT_GENESIS_PERSONALITIES.map((p) => {
              const isSelected = agoraParticipants.some((item) => item.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleAgoraParticipant(p)}
                  className={`
                    p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24
                    ${isSelected
                      ? 'bg-mindverse-deep border-mindverse-gold-subtle shadow-gold-glow ring-1 ring-mindverse-gold-subtle'
                      : 'bg-mindverse-deep/50 border-mindverse-graphite/60 text-mindverse-muted hover:border-mindverse-graphite hover:text-mindverse-softwhite'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-mindverse-softwhite truncate">
                      {p.name.split(' ')[0]}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-mindverse-gold-accent line-clamp-1">
                    {p.category.split('_')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rounds and Launch Controls */}
        <div className="pt-4 border-t border-mindverse-graphite flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-mindverse-muted">{t('agora.rounds_label')}</span>
            <div className="flex items-center gap-1">
              {[2, 3, 4].map((r) => (
                <button
                  key={r}
                  onClick={() => setAgoraRounds(r)}
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

          <div className="flex items-center gap-3">
            {isCouncilReady && (
              <button
                onClick={handleResetCouncil}
                className="px-4 py-2.5 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite text-xs text-mindverse-muted hover:text-mindverse-softwhite transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}

            <button
              onClick={handleAssembleCouncil}
              disabled={agoraParticipants.length < 2 || !agoraMotion.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-mindverse-void transition-all shadow-gold-glow flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Constituir Conselho</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deliberation Chamber Floor (Active Turn Visualization) */}
      {isCouncilReady && (
        <div className="space-y-6 animate-fade-in">
          {/* Status Banner */}
          <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-gold-subtle/30 flex items-start gap-3">
            <Layers className="w-5 h-5 text-mindverse-gold-subtle shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-mindverse-softwhite block font-serif">
                Conselho Constituído com Sucesso ({agoraParticipants.length} Pensadores • {agoraRounds} Rondas Programadas)
              </span>
              <p className="text-mindverse-muted leading-relaxed">
                A ordem de turnos, os papéis dialéticos e o modelo de deliberação foram instanciados no cliente. A orquestração autónoma inter-agentes e a síntese conclusiva em tempo real serão executadas pelo despachante de backend na Fase 3.
              </p>
            </div>
          </div>

          {/* Podiums */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {agoraParticipants.map((p, idx) => {
              const isSelectedSpeaker = activeSpeakerIndex === idx;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveSpeakerIndex(idx)}
                  className={`
                    p-4 rounded-2xl border transition-all duration-300 text-center space-y-2 cursor-pointer
                    ${isSelectedSpeaker
                      ? 'bg-mindverse-midnight border-mindverse-gold-subtle shadow-gold-glow scale-102 ring-1 ring-mindverse-gold-subtle'
                      : 'bg-mindverse-deep/80 border-mindverse-graphite opacity-80 hover:opacity-100 hover:border-mindverse-gold-subtle/40'
                    }
                  `}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-mindverse-graphite border border-mindverse-gold-subtle/30 flex items-center justify-center font-serif font-bold text-lg text-mindverse-gold-subtle shadow-inner">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-mindverse-softwhite">
                      {p.name}
                    </h4>
                    <p className="text-[10px] text-mindverse-gold-accent font-mono truncate">
                      {p.historicalEra.split('(')[0]}
                    </p>
                  </div>
                  <span className="inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-mindverse-deep text-mindverse-muted border border-mindverse-graphite">
                    Orador 0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Order of Turns & Protocol Architecture */}
          <div className="p-6 rounded-3xl bg-mindverse-midnight/90 border border-mindverse-graphite space-y-4 shadow-md">
            <h3 className="font-serif font-bold text-base text-mindverse-softwhite flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-mindverse-gold-subtle" />
              <span>Protocolo do Senado (Ordem de Deliberação)</span>
            </h3>

            <div className="space-y-3">
              {agoraParticipants.map((p, index) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-mindverse-deep/70 border border-mindverse-graphite/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-mindverse-midnight border border-mindverse-gold-subtle/30 flex items-center justify-center font-mono font-bold text-[11px] text-mindverse-gold-subtle">
                      {index + 1}
                    </span>
                    <span className="font-medium text-mindverse-softwhite">{p.name}</span>
                    <span className="text-[10px] font-mono text-mindverse-muted">({p.titleEpithet})</span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mindverse-midnight text-mindverse-gold-accent border border-mindverse-graphite/80">
                    {index === 0 ? 'Tese Propositiva' : index === 1 ? 'Antítese Crítica' : 'Exame Histórico Cruzado'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dialectic Synthesis Framework */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-mindverse-midnight via-mindverse-deep to-mindverse-void border border-mindverse-gold-subtle/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-mindverse-graphite/60 pb-3">
              <Sparkles className="w-4 h-4 text-mindverse-gold-subtle" />
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                {t('agora.synthesis_report')} (Estrutura Metodológica da Fase 1)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-emerald-500/30 space-y-2">
                <span className="font-mono uppercase text-emerald-400 font-semibold block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('agora.convergences')}
                </span>
                <p className="text-mindverse-muted">
                  A síntese dialética identificará em tempo real (Fase 3) as premissas onde os pensadores concordam, mapeando pontos de contato axiológicos entre diferentes épocas da história.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-mindverse-deep/70 border border-amber-500/30 space-y-2">
                <span className="font-mono uppercase text-amber-400 font-semibold block flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  {t('agora.divergences')}
                </span>
                <p className="text-mindverse-muted">
                  O moderador destacará os axiomas irreconciliáveis entre as correntes filosóficas e científicas em deliberação, isolando as raízes do desacordo moral ou estratégico.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
