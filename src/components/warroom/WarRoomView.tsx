import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { globalRAGOrchestrator } from '../../server/orchestrator';
import { councilAudio } from '../../services/councilAudio';
import { 
  ShieldAlert, 
  Send, 
  Volume2, 
  CheckCircle2, 
  FileText,
  AlertTriangle,
  Flame
} from 'lucide-react';

interface CrisisAnalysis {
  strategicAdvisor: string;
  strategicTitle: string;
  strategicAnswer: string;
  
  ethicalAdvisor: string;
  ethicalTitle: string;
  ethicalAnswer: string;
  
  innovationAdvisor: string;
  innovationTitle: string;
  innovationAnswer: string;
  
  executiveResolution: string;
  actionPlan: string[];
}

const PRESET_CRISES = [
  {
    title: 'Dilema de Sobrevivência Empresarial',
    scenario: 'A empresa tem apenas 5 meses de liquidez. Para sobreviver, o conselho exige despedir 35% dos colaboradores mais antigos, ou arriscar a falência total de todos.',
    tag: 'Finanças & Pessoas'
  },
  {
    title: 'Falha Ética Crítica no Produto',
    scenario: 'Descobrimos uma vulnerabilidade grave no nosso produto que já está no mercado. A correção custará milhões e abalará o valor da marca, mas mantê-lo em silêncio coloca clientes em risco.',
    tag: 'Segurança & Confiança'
  },
  {
    title: 'Salto Disruptivo vs. Estabilidade Atual',
    scenario: 'Um concorrente gigante entrou no nosso setor. Devemos abandonar a nossa linha de produtos lucrativa atual e apostar tudo numa tecnologia radicalmente nova, arriscando tudo?',
    tag: 'Inovação & Estratégia'
  }
];

export const WarRoomView: React.FC = () => {
  const { addTokensUsed } = useAppStore();
  const [crisisText, setCrisisText] = useState(PRESET_CRISES[0].scenario);
  const [isDeliberating, setIsDeliberating] = useState(false);
  const [analysis, setAnalysis] = useState<CrisisAnalysis | null>(null);

  // Mentes conselheiras do Gabinete de Crise
  const strategicMind = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'nicolau-maquiavel') || COHORT_GENESIS_PERSONALITIES[0];
  const ethicalMind = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'aristoteles') || COHORT_GENESIS_PERSONALITIES[3];
  const innovationMind = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'nikola-tesla') || COHORT_GENESIS_PERSONALITIES[2];

  const handleDeliberate = async () => {
    if (!crisisText.trim() || isDeliberating) return;
    setIsDeliberating(true);
    setAnalysis(null);

    try {
      // 1. Conselho Estratégico (Maquiavel)
      const resStrat = await globalRAGOrchestrator.processInquiry({
        personalityId: strategicMind.id,
        userQuery: `No Gabinete de Crise Executivo, o líder apresenta o seguinte dilema de vida ou morte:\n"${crisisText}"\nComo ${strategicMind.name}, dá o teu conselho cru, realista e pragmático para garantir a vitória e sobrevivência, sem ilusões piedosas.`
      });
      addTokensUsed(resStrat.tokensUsed);

      // 2. Conselho Ético (Aristóteles)
      const resEthic = await globalRAGOrchestrator.processInquiry({
        personalityId: ethicalMind.id,
        userQuery: `No Gabinete de Crise Executivo perante a crise:\n"${crisisText}"\nComo ${ethicalMind.name}, estabelece as balizas da justa medida e da virtude inegociável, para que a liderança não perca a sua alma na tempestade.`
      });
      addTokensUsed(resEthic.tokensUsed);

      // 3. Conselho de Ousadia Disruptiva (Tesla)
      const resInno = await globalRAGOrchestrator.processInquiry({
        personalityId: innovationMind.id,
        userQuery: `No Gabinete de Crise perante a crise:\n"${crisisText}"\nComo ${innovationMind.name}, aponta uma terceira via disruptiva que quebre a armadilha do dilema através de engenho, inovação e visão de futuro.`
      });
      addTokensUsed(resInno.tokensUsed);

      // Síntese e Plano de Ação
      setAnalysis({
        strategicAdvisor: strategicMind.name,
        strategicTitle: 'Realismo & Sobrevivência do Poder',
        strategicAnswer: resStrat.answer,
        
        ethicalAdvisor: ethicalMind.name,
        ethicalTitle: 'Ética, Dignidade & Justa Medida',
        ethicalAnswer: resEthic.answer,
        
        innovationAdvisor: innovationMind.name,
        innovationTitle: 'Inovação Disruptiva & Ousadia',
        innovationAnswer: resInno.answer,
        
        executiveResolution: `A resolução equilibrada para esta crise consiste em não escolher um extremo cego: assume com realismo cirúrgico os cortes indispensáveis à sobrevivência, mas estabelece salvaguardas éticas e transparência total com os envolvidos, enquanto canalizas a energia libertada para a rota inovadora que mudará o tabuleiro a teu favor.`,
        actionPlan: [
          'Passo 1: Definir imediatamente as balizas inegociáveis do que não pode ser comprometido (Dignidade e Verdade).',
          'Passo 2: Executar as decisões duras com determinação rápida, comunicando com transparência sem rodeios.',
          'Passo 3: Proteger o núcleo de talento essencial e garantir apoio de honra aos impactados.',
          'Passo 4: Lançar de imediato a inovação disruptiva que transforma a defesa numa nova ofensiva de crescimento.'
        ]
      });

    } catch (err) {
      console.error('Erro na deliberação do Gabinete de Crise:', err);
    } finally {
      setIsDeliberating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/40 via-mindverse-midnight to-mindverse-deep border border-rose-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-rose-400 uppercase font-bold">
                Gabinete de Crise & Matriz Tripla de Decisão
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-mindverse-softwhite tracking-tight">
              Gabinete de Crise do Líder
            </h1>
            <p className="text-xs text-mindverse-muted max-w-2xl leading-relaxed">
              Submete um dilema real, urgente ou complexo da tua vida pessoal, executiva ou profissional. Recebe três pareceres contrastantes de génios do realismo, da ética e da inovação disruptiva, culminando num plano de ação executivo.
            </p>
          </div>

          <button
            onClick={handleDeliberate}
            disabled={isDeliberating || !crisisText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-sm shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isDeliberating ? (
              <>
                <Flame className="w-4 h-4 text-white animate-spin" />
                <span>Conselho em Deliberação...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Convocar Gabinete de Crise</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Crises */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-mindverse-muted font-semibold tracking-wider">
          Ou escolhe um Cenário de Crise Típico:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_CRISES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCrisisText(p.scenario);
                setAnalysis(null);
              }}
              className="text-left p-3.5 rounded-xl bg-mindverse-midnight/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-rose-500/40 transition-all space-y-1 group"
            >
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/40 text-rose-300 border border-rose-500/20">
                {p.tag}
              </span>
              <h4 className="text-xs font-serif font-bold text-mindverse-softwhite group-hover:text-rose-300 transition-colors">
                {p.title}
              </h4>
              <p className="text-[11px] text-mindverse-muted line-clamp-2">
                {p.scenario}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite space-y-2">
        <label className="text-xs font-mono text-rose-300 font-semibold flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>Descreve a Situação de Crise ou Decisão Difícil:</span>
        </label>
        <textarea
          value={crisisText}
          onChange={(e) => setCrisisText(e.target.value)}
          rows={3}
          placeholder="Descreve detalhadamente o dilema que estás a enfrentar e as opções em cima da mesa..."
          className="w-full bg-mindverse-deep/90 border border-mindverse-graphite rounded-xl p-3 text-sm text-mindverse-softwhite focus:border-rose-400 outline-none resize-none font-sans"
        />
      </div>

      {/* Tri-Column Matrix Analysis */}
      {analysis && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Strategy (Maquiavel) */}
            <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-rose-500/30 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={strategicMind.avatarUrl} 
                      alt={strategicMind.name}
                      className="w-9 h-9 rounded-full object-cover border border-rose-500"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider block">
                        Coluna Estratégica
                      </span>
                      <h4 className="text-xs font-serif font-bold text-mindverse-softwhite">
                        {analysis.strategicAdvisor}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => councilAudio.speak(strategicMind.id, analysis.strategicAnswer)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-all"
                    title="Ouvir Parecer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line border-l-2 border-rose-500/40 pl-2.5 pt-1">
                  {analysis.strategicAnswer}
                </div>
              </div>
              <span className="text-[10px] font-mono text-rose-400/80 uppercase pt-2 border-t border-mindverse-graphite/40">
                Foco: Vitória & Preservação Prática
              </span>
            </div>

            {/* Column 2: Ethics (Aristóteles) */}
            <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-gold/30 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={ethicalMind.avatarUrl} 
                      alt={ethicalMind.name}
                      className="w-9 h-9 rounded-full object-cover border border-mindverse-gold"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-mindverse-gold uppercase font-bold tracking-wider block">
                        Coluna Ética
                      </span>
                      <h4 className="text-xs font-serif font-bold text-mindverse-softwhite">
                        {analysis.ethicalAdvisor}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => councilAudio.speak(ethicalMind.id, analysis.ethicalAnswer)}
                    className="p-1.5 rounded-lg bg-mindverse-gold/10 hover:bg-mindverse-gold/25 text-mindverse-gold-light border border-mindverse-gold/30 transition-all"
                    title="Ouvir Parecer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line border-l-2 border-mindverse-gold/40 pl-2.5 pt-1">
                  {analysis.ethicalAnswer}
                </div>
              </div>
              <span className="text-[10px] font-mono text-mindverse-gold-subtle uppercase pt-2 border-t border-mindverse-graphite/40">
                Foco: Dignidade & Justa Medida
              </span>
            </div>

            {/* Column 3: Innovation (Tesla) */}
            <div className="p-5 rounded-2xl bg-mindverse-midnight/90 border border-sky-500/30 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={innovationMind.avatarUrl} 
                      alt={innovationMind.name}
                      className="w-9 h-9 rounded-full object-cover border border-sky-400"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider block">
                        Coluna Disruptiva
                      </span>
                      <h4 className="text-xs font-serif font-bold text-mindverse-softwhite">
                        {analysis.innovationAdvisor}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => councilAudio.speak(innovationMind.id, analysis.innovationAnswer)}
                    className="p-1.5 rounded-lg bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-500/30 transition-all"
                    title="Ouvir Parecer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-mindverse-softwhite/90 leading-relaxed whitespace-pre-line border-l-2 border-sky-500/40 pl-2.5 pt-1">
                  {analysis.innovationAnswer}
                </div>
              </div>
              <span className="text-[10px] font-mono text-sky-400/80 uppercase pt-2 border-t border-mindverse-graphite/40">
                Foco: Ousadia & Terceira Via Não Óbvia
              </span>
            </div>
          </div>

          {/* Executive Resolution & Action Plan */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-mindverse-midnight via-mindverse-deep to-mindverse-midnight border border-mindverse-gold/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-mindverse-gold">
              <FileText className="w-5 h-5" />
              <h3 className="text-sm font-serif font-bold uppercase tracking-wider">
                Decreto de Resolução do Gabinete de Crise
              </h3>
            </div>
            
            <p className="text-xs md:text-sm text-mindverse-softwhite leading-relaxed italic border-l-2 border-mindverse-gold pl-3">
              "{analysis.executiveResolution}"
            </p>

            <div className="pt-3 border-t border-mindverse-graphite/60 space-y-2">
              <span className="text-[11px] font-mono uppercase text-mindverse-gold-subtle font-semibold">
                Plano de Ação Sequencial de 4 Passos:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {analysis.actionPlan.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-mindverse-deep/80 border border-mindverse-graphite/80 flex items-start gap-2.5 text-xs text-mindverse-softwhite">
                    <CheckCircle2 className="w-4 h-4 text-mindverse-gold shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
