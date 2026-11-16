import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Personality } from '../../types';
import { globalRAGOrchestrator } from '../../server/orchestrator';
import { councilAudio } from '../../services/councilAudio';
import { 
  Sparkles, 
  Lightbulb, 
  Volume2, 
  FileCheck2, 
  Flame
} from 'lucide-react';

interface CoCreationBlueprint {
  thinker1: Personality;
  thinker2: Personality;
  contribution1: string;
  contribution2: string;
  blueprintTitle: string;
  coreConcept: string;
  theoreticalArchitecture: string[];
  humanitarianImpact: string;
}

const PRESET_FUSIONS = [
  {
    title: 'Constituição Ética para Inteligência Artificial',
    goal: 'Criar um modelo regulatório e lógico para IA onde a ética da virtude e a teleologia humana governem os algoritmos sem comprometer a sua capacidade universal de cálculo.',
    mind1Slug: 'ada-lovelace',
    mind2Slug: 'aristoteles',
    tag: 'Computação & Ética'
  },
  {
    title: 'Aviação Elétrica por Ressonância Planetária',
    goal: 'Conceber uma aeronave ultraleve e sustentável inspirada na Demoiselle, alimentada sem baterias pesadas através da rede de transmissão de energia sem fios na ressonância da Terra.',
    mind1Slug: 'alberto-santos-dumont',
    mind2Slug: 'nikola-tesla',
    tag: 'Energia & Voo'
  },
  {
    title: 'Tratamento Bioquímico contra Superbactérias',
    goal: 'Desenvolver uma estratégia antimicrobiana inovadora unindo os extratos e enzimas ativas de bolores à radioquímica de baixíssima dosagem para destruir bactérias resistentes.',
    mind1Slug: 'alexander-fleming',
    mind2Slug: 'marie-curie',
    tag: 'Medicina & Física'
  },
  {
    title: 'Declaração dos Direitos Digitais e Autonomia Cívica',
    goal: 'Formular uma constituição para o ciberespaço onde a criptografia matemática de Turing proteja a privacidade inalienável do cidadão proclamada por Jefferson.',
    mind1Slug: 'alan-turing',
    mind2Slug: 'thomas-jefferson',
    tag: 'Direitos & Criptografia'
  }
];

export const FusionView: React.FC = () => {
  const { addTokensUsed } = useAppStore();

  const [mind1, setMind1] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'ada-lovelace') || COHORT_GENESIS_PERSONALITIES[15]
  );
  const [mind2, setMind2] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'aristoteles') || COHORT_GENESIS_PERSONALITIES[3]
  );
  const [goalText, setGoalText] = useState(PRESET_FUSIONS[0].goal);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [blueprint, setBlueprint] = useState<CoCreationBlueprint | null>(null);

  const applyPreset = (preset: typeof PRESET_FUSIONS[0]) => {
    const m1 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.mind1Slug);
    const m2 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.mind2Slug);
    if (m1) setMind1(m1);
    if (m2) setMind2(m2);
    setGoalText(preset.goal);
    setBlueprint(null);
  };

  const handleSynthesize = async () => {
    if (!goalText.trim() || isSynthesizing) return;
    setIsSynthesizing(true);
    setBlueprint(null);

    try {
      // 1. Contribuição de Mind 1
      const res1 = await globalRAGOrchestrator.processInquiry({
        personalityId: mind1.id,
        userQuery: `No Laboratório de Síntese Trans-Séculos, estás a colaborar diretamente com ${mind2.name} para o seguinte objetivo inovador:\n"${goalText}"\nComo ${mind1.name}, apresenta a tua contribuição conceitual primária a partir do teu método e descobertas.`
      });
      addTokensUsed(res1.tokensUsed);

      // 2. Contribuição e Expansão por Mind 2
      const res2 = await globalRAGOrchestrator.processInquiry({
        personalityId: mind2.id,
        userQuery: `No Laboratório de Síntese, ${mind1.name} propôs o seguinte alicerce:\n"${res1.answer.slice(0, 250)}..."\nComo ${mind2.name}, responde ao teu colega, unindo os teus próprios princípios teóricos para complementar a ideia e criar a solução definitiva.`
      });
      addTokensUsed(res2.tokensUsed);

      setBlueprint({
        thinker1: mind1,
        thinker2: mind2,
        contribution1: res1.answer,
        contribution2: res2.answer,
        blueprintTitle: `Projeto Conjunto: Síntese de ${mind1.name} & ${mind2.name}`,
        coreConcept: `Uma aliança trans-temporal entre o rigor estrutural de ${mind1.name} e a visão sistémica de ${mind2.name}, unindo séculos de reflexão para criar uma resposta original e equilibrada ao desafio proposto.`,
        theoreticalArchitecture: [
          `Pilar I: Aplicação dos axiomas canónicos de ${mind1.name} para assegurar a consistência dos meios.`,
          `Pilar II: Enquadramento axiológico e teleológico fornecido por ${mind2.name} para definir o propósito final.`,
          `Pilar III: Mecanismo de salvaguarda e retroalimentação contra desvios extremos ou monopolistas.`,
          `Pilar IV: Implementação prática escalável aberta ao benefício público da humanidade.`
        ],
        humanitarianImpact: `Este projeto demonstra que o conhecimento do passado não é obsoleto: quando libertado do seu século original, funciona como um acelerador incomparável de soluções civilizacionais duradouras.`
      });

    } catch (err) {
      console.error('Erro na síntese trans-séculos:', err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-mindverse-midnight to-mindverse-deep border border-amber-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-bold">
                Laboratório de Co-Criação & Fusão de Pensamento
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-mindverse-softwhite tracking-tight">
              Síntese Trans-Séculos
            </h1>
            <p className="text-xs text-mindverse-muted max-w-2xl leading-relaxed">
              Junta duas mentes separadas por séculos de distância para cooperarem no desenho de uma solução, tratado ou invenção moderna. Descobre o que acontece quando a imaginação de épocas distintas se funde num projeto comum.
            </p>
          </div>

          <button
            onClick={handleSynthesize}
            disabled={isSynthesizing || !goalText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-mindverse-deep font-mono font-bold text-sm shadow-gold-glow transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSynthesizing ? (
              <>
                <Flame className="w-4 h-4 text-mindverse-deep animate-spin" />
                <span>A Fundir Horizontes...</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4" />
                <span>Ativar Co-Criação</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Fusions */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-mindverse-muted font-semibold tracking-wider">
          Alianças Trans-Temporais Notáveis:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_FUSIONS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="text-left p-3.5 rounded-xl bg-mindverse-midnight/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-amber-400/40 transition-all space-y-1.5 group"
            >
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/20">
                {p.tag}
              </span>
              <h4 className="text-xs font-serif font-bold text-mindverse-softwhite group-hover:text-amber-300 transition-colors">
                {p.title}
              </h4>
              <p className="text-[11px] text-mindverse-muted line-clamp-2">
                {p.goal}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* The Thinkers Duo Selector */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Mind 1 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-mindverse-midnight/90 border border-amber-500/30 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <img 
              src={mind1.avatarUrl} 
              alt={mind1.name}
              className="w-13 h-13 rounded-full object-cover border-2 border-amber-400"
            />
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                Mente Co-Criadora 1
              </span>
              <h3 className="text-base font-serif font-bold text-mindverse-softwhite">
                {mind1.name}
              </h3>
              <p className="text-[11px] text-mindverse-muted">
                {mind1.titleEpithet} ({mind1.historicalEra})
              </p>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-mindverse-muted block mb-1">
              Selecionar Primeira Mente:
            </label>
            <select
              value={mind1.id}
              onChange={(e) => {
                const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                if (found) setMind1(found);
              }}
              className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-amber-400 outline-none"
            >
              {COHORT_GENESIS_PERSONALITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fusion Icon */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-mindverse-deep border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-gold-glow">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
        </div>

        {/* Mind 2 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-mindverse-midnight/90 border border-amber-500/30 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <img 
              src={mind2.avatarUrl} 
              alt={mind2.name}
              className="w-13 h-13 rounded-full object-cover border-2 border-mindverse-gold"
            />
            <div>
              <span className="text-[10px] font-mono text-mindverse-gold uppercase font-bold tracking-wider">
                Mente Co-Criadora 2
              </span>
              <h3 className="text-base font-serif font-bold text-mindverse-softwhite">
                {mind2.name}
              </h3>
              <p className="text-[11px] text-mindverse-muted">
                {mind2.titleEpithet} ({mind2.historicalEra})
              </p>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-mindverse-muted block mb-1">
              Selecionar Segunda Mente:
            </label>
            <select
              value={mind2.id}
              onChange={(e) => {
                const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                if (found) setMind2(found);
              }}
              className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-amber-400 outline-none"
            >
              {COHORT_GENESIS_PERSONALITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Goal Input */}
      <div className="p-4 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite space-y-2">
        <label className="text-xs font-mono text-amber-300 font-semibold flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Objetivo da Co-Criação / Invenção Almejada:</span>
        </label>
        <textarea
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          rows={2}
          placeholder="Descreve o problema científico, filosófico ou tecnológico que desejas ver resolvido conjuntamente..."
          className="w-full bg-mindverse-deep/90 border border-mindverse-graphite rounded-xl p-3 text-sm text-mindverse-softwhite focus:border-amber-400 outline-none resize-none font-sans"
        />
      </div>

      {/* Blueprint Co-Creation Results */}
      {blueprint && (
        <div className="space-y-5 animate-fade-in">
          {/* Dialogue exchange between the 2 minds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mind 1 Speech */}
            <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={blueprint.thinker1.avatarUrl} alt={blueprint.thinker1.name} className="w-9 h-9 rounded-full object-cover border border-amber-400" />
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                      Fundamento Proposto
                    </span>
                    <h4 className="text-xs font-serif font-bold text-mindverse-softwhite">{blueprint.thinker1.name}</h4>
                  </div>
                </div>
                <button
                  onClick={() => councilAudio.speak(blueprint.thinker1.id, blueprint.contribution1)}
                  className="p-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 transition-all"
                  title="Ouvir"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line border-l-2 border-amber-400/50 pl-2.5">
                {blueprint.contribution1}
              </p>
            </div>

            {/* Mind 2 Speech */}
            <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-gold/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={blueprint.thinker2.avatarUrl} alt={blueprint.thinker2.name} className="w-9 h-9 rounded-full object-cover border border-mindverse-gold" />
                  <div>
                    <span className="text-[10px] font-mono text-mindverse-gold uppercase font-bold tracking-wider block">
                      Expansão & Integração
                    </span>
                    <h4 className="text-xs font-serif font-bold text-mindverse-softwhite">{blueprint.thinker2.name}</h4>
                  </div>
                </div>
                <button
                  onClick={() => councilAudio.speak(blueprint.thinker2.id, blueprint.contribution2)}
                  className="p-1.5 rounded-lg bg-mindverse-gold/10 hover:bg-mindverse-gold/25 text-mindverse-gold-light border border-mindverse-gold/30 transition-all"
                  title="Ouvir"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line border-l-2 border-mindverse-gold/50 pl-2.5">
                {blueprint.contribution2}
              </p>
            </div>
          </div>

          {/* Unified Conceptual Blueprint Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-mindverse-midnight via-mindverse-deep to-mindverse-midnight border border-amber-400/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-300">
              <FileCheck2 className="w-5 h-5" />
              <h3 className="text-sm font-serif font-bold uppercase tracking-wider">
                {blueprint.blueprintTitle}
              </h3>
            </div>

            <p className="text-xs text-mindverse-softwhite leading-relaxed italic border-l-2 border-amber-400 pl-3">
              "{blueprint.coreConcept}"
            </p>

            <div className="pt-2 border-t border-mindverse-graphite/60 space-y-2">
              <span className="text-[11px] font-mono uppercase text-amber-300 font-semibold">
                Pilares da Arquitetura Conceitual Unificada:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {blueprint.theoreticalArchitecture.map((pillar, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-mindverse-deep/80 border border-mindverse-graphite/80 flex items-start gap-2 text-xs text-mindverse-softwhite">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-mindverse-graphite/60 flex items-center justify-between text-xs text-mindverse-muted">
              <span>{blueprint.humanitarianImpact}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
