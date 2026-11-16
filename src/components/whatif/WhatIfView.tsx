import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Personality } from '../../types';
import { globalRAGOrchestrator } from '../../server/orchestrator';
import { councilAudio } from '../../services/councilAudio';
import { 
  History, 
  Play, 
  Volume2, 
  GitFork, 
  Globe, 
  Flame
} from 'lucide-react';

interface TimelineStage {
  period: string;
  speaker: Personality;
  analysis: string;
}

const PRESET_SCENARIOS = [
  {
    title: 'A Biblioteca de Alexandria Intacta',
    scenario: 'E se a Biblioteca de Alexandria nunca tivesse sido incendiada e os 500.000 rolos de ciência, matemática e filosofia helénica tivessem sobrevivido intactos até ao Renascimento?',
    historianSlugs: ['herodoto', 'edward-gibbon'],
    tag: 'Ciência & Antiguidade'
  },
  {
    title: 'O Fracasso do Dia D em 1944',
    scenario: 'E se o desembarque dos Aliados na Normandia a 6 de Junho de 1944 tivesse sido repelido pelas forças de Rommel?',
    historianSlugs: ['winston-churchill', 'tucidides'],
    tag: 'Segunda Guerra Mundial'
  },
  {
    title: 'A Aviação Declarada Sagrada e Sem Armas',
    scenario: 'E se a comunidade internacional de 1906 tivesse acolhido o apelo de Santos Dumont e proibido sob pena capital o uso militar de qualquer engenho aéreo?',
    historianSlugs: ['alberto-santos-dumont', 'abraham-lincoln'],
    tag: 'Paz & Tecnologia'
  },
  {
    title: 'Imprensa Móvel no Império Romano',
    scenario: 'E se Johannes Gutenberg tivesse nascido em Roma sob Trajano e os tipos móveis de metal tivessem impresso os Anais de Tácito e os clássicos no ano 100 d.C.?',
    historianSlugs: ['tacito', 'johannes-gutenberg'],
    tag: 'Informação & Roma'
  }
];

export const WhatIfView: React.FC = () => {
  const { addTokensUsed } = useAppStore();
  const [scenarioText, setScenarioText] = useState(PRESET_SCENARIOS[0].scenario);
  const [isSimulating, setIsSimulating] = useState(false);
  const [timelineStages, setTimelineStages] = useState<TimelineStage[]>([]);

  // Historiadores selecionados para a simulação
  const [selectedHistorian1, setSelectedHistorian1] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'herodoto') || COHORT_GENESIS_PERSONALITIES[10]
  );
  const [selectedHistorian2, setSelectedHistorian2] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'edward-gibbon') || COHORT_GENESIS_PERSONALITIES[5]
  );

  const applyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setScenarioText(preset.scenario);
    const h1 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.historianSlugs[0]);
    const h2 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.historianSlugs[1]);
    if (h1) setSelectedHistorian1(h1);
    if (h2) setSelectedHistorian2(h2);
    setTimelineStages([]);
  };

  const handleSimulate = async () => {
    if (!scenarioText.trim() || isSimulating) return;
    setIsSimulating(true);
    setTimelineStages([]);

    try {
      // Fase 1: Ponto de Divergência Imediato (0 a 10 anos)
      const res1 = await globalRAGOrchestrator.processInquiry({
        personalityId: selectedHistorian1.id,
        userQuery: `No Simulador Contrafactual "E Se...?", analisa a seguinte encruzilhada histórica:\n"${scenarioText}"\nComo ${selectedHistorian1.name}, descreve o IMPACTO IMEDIATO nos primeiros 10 anos após este ponto de divergência. O que muda no poder, nos costumes e na sociedade?`
      });
      addTokensUsed(res1.tokensUsed);
      const stage1: TimelineStage = {
        period: 'Fase I: O Ponto de Divergência Imediato (0 a 10 anos)',
        speaker: selectedHistorian1,
        analysis: res1.answer
      };

      // Fase 2: As Ramificações Estruturais (10 a 50 anos)
      const res2 = await globalRAGOrchestrator.processInquiry({
        personalityId: selectedHistorian2.id,
        userQuery: `Perante a divergência contrafactual:\n"${scenarioText}"\ne o diagnóstico inicial de ${selectedHistorian1.name}, descreve como ${selectedHistorian2.name} a evolução 50 anos depois: que novos equilíbrios de poder, guerras ou descobertas científicas teriam surgido?`
      });
      addTokensUsed(res2.tokensUsed);
      const stage2: TimelineStage = {
        period: 'Fase II: A Grande Ramificação Histórica (10 a 50 anos)',
        speaker: selectedHistorian2,
        analysis: res2.answer
      };

      // Fase 3: O Reflexo no Século XXI
      const res3 = await globalRAGOrchestrator.processInquiry({
        personalityId: selectedHistorian1.id,
        userQuery: `Conclui a análise contrafactual de:\n"${scenarioText}"\nComo seria a condição humana e o mundo do século XXI se esta linha temporal alternativa tivesse prevalecido?`
      });
      addTokensUsed(res3.tokensUsed);
      const stage3: TimelineStage = {
        period: 'Fase III: O Espelho do Século XXI (O Presente Alternativo)',
        speaker: selectedHistorian1,
        analysis: res3.answer
      };

      setTimelineStages([stage1, stage2, stage3]);

    } catch (err) {
      console.error('Erro na simulação contrafactual:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-950/40 via-mindverse-midnight to-mindverse-deep border border-sky-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-sky-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-sky-400 uppercase font-bold">
                Simulador de História Contrafactual
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-mindverse-softwhite tracking-tight">
              «E Se...?» — Linhas Temporais Alternativas
            </h1>
            <p className="text-xs text-mindverse-muted max-w-2xl leading-relaxed">
              Explora o que teria acontecido se os grandes acontecimentos da humanidade tivessem tomado outro rumo. Dois mestres da história e do método analítico examinam as ramificações em cadeia e desenham um presente alternativo.
            </p>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating || !scenarioText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-sm shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSimulating ? (
              <>
                <Flame className="w-4 h-4 text-white animate-spin" />
                <span>A Desvendar Linha Temporal...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Simular História Alternativa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-mindverse-muted font-semibold tracking-wider">
          Encruzilhadas Históricas Marcantes:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCENARIOS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="text-left p-3.5 rounded-xl bg-mindverse-midnight/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-sky-500/40 transition-all space-y-1.5 group"
            >
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950/40 text-sky-300 border border-sky-500/20">
                {p.tag}
              </span>
              <h4 className="text-xs font-serif font-bold text-mindverse-softwhite group-hover:text-sky-300 transition-colors">
                {p.title}
              </h4>
              <p className="text-[11px] text-mindverse-muted line-clamp-2">
                {p.scenario}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Historians Selection & Scenario Input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 p-4 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite space-y-2">
          <label className="text-xs font-mono text-sky-300 font-semibold flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5 text-sky-400" />
            <span>Hipótese Contrafactual em Exame:</span>
          </label>
          <textarea
            value={scenarioText}
            onChange={(e) => setScenarioText(e.target.value)}
            rows={3}
            placeholder="Escreve o acontecimento histórico que queres mudar e ver as consequências..."
            className="w-full bg-mindverse-deep/90 border border-mindverse-graphite rounded-xl p-3 text-sm text-mindverse-softwhite focus:border-sky-400 outline-none resize-none font-sans"
          />
        </div>

        <div className="md:col-span-4 p-4 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite space-y-3">
          <span className="text-xs font-mono text-mindverse-gold font-semibold block">
            Mestres Analistas da Linha Temporal:
          </span>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-mono text-mindverse-muted block mb-0.5">
                Historiador Principal:
              </label>
              <select
                value={selectedHistorian1.id}
                onChange={(e) => {
                  const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                  if (found) setSelectedHistorian1(found);
                }}
                className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-sky-400 outline-none"
              >
                {COHORT_GENESIS_PERSONALITIES.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-mindverse-muted block mb-0.5">
                Historiador Crítico:
              </label>
              <select
                value={selectedHistorian2.id}
                onChange={(e) => {
                  const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                  if (found) setSelectedHistorian2(found);
                }}
                className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-sky-400 outline-none"
              >
                {COHORT_GENESIS_PERSONALITIES.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Alternate Timeline Stages */}
      <div className="space-y-4">
        {timelineStages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-mindverse-midnight/40 border border-dashed border-mindverse-graphite/60 space-y-3">
            <Globe className="w-10 h-10 text-sky-400/40 mx-auto" />
            <h4 className="text-sm font-serif font-bold text-mindverse-muted">
              A Linha do Tempo aguarda o Ponto de Divergência
            </h4>
            <p className="text-xs text-mindverse-muted/70 max-w-md mx-auto">
              Clica em "Simular História Alternativa" para ver a reconstituição causal passo a passo realizada por {selectedHistorian1.name} e {selectedHistorian2.name}.
            </p>
          </div>
        ) : (
          timelineStages.map((stage, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-sky-500/30 shadow-lg space-y-3 animate-fade-in"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center font-mono text-xs text-sky-300 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider font-semibold block">
                      {stage.period}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-mindverse-softwhite">
                      Análise por {stage.speaker.name}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => councilAudio.speak(stage.speaker.id, stage.analysis)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/40 hover:bg-sky-900/60 text-xs font-mono text-sky-300 border border-sky-500/30 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Ouvir Crónica</span>
                </button>
              </div>

              <div className="text-xs md:text-sm text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line pl-3 border-l-2 border-sky-500/40">
                {stage.analysis}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
