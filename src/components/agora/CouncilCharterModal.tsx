import React, { useState } from 'react';
import { CouncilSession } from '../../types';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  Award,
  Layers
} from 'lucide-react';

interface CouncilCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CouncilSession | null;
}

export const CouncilCharterModal: React.FC<CouncilCharterModalProps> = ({
  isOpen,
  onClose,
  session
}) => {
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen || !session || !session.synthesis) return null;

  const { synthesis, motion, participants } = session;
  const sessionDate = new Date(session.completedAt || session.createdAt).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const charterId = `ED-AGORA-${session.id.slice(0, 8).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textToCopy = `
================================================================================
ÉDITO DO CONSELHO DAS GRANDES MENTES — MINDVERSE
Protocolo: ${charterId} | Data: ${sessionDate}
================================================================================

MOÇÃO OFICIAL DELIBERADA:
"${motion}"

MEMBROS CONVOCADOS DO CONSELHO:
${participants.map(p => `• ${p.name} (${p.titleEpithet}) — ${p.historicalEra}`).join('\n')}

--------------------------------------------------------------------------------
I. DIAGNÓSTICO ESTRATÉGICO COLETIVO
--------------------------------------------------------------------------------
${synthesis.collectiveDiagnosis}

--------------------------------------------------------------------------------
II. CONVERGÊNCIAS FUNDAMENTAIS (ACORDO REAL)
--------------------------------------------------------------------------------
${synthesis.convergences.map((c, i) => `${i + 1}. ${c}`).join('\n')}

--------------------------------------------------------------------------------
III. TENSÕES IRREDUTÍVEIS (PONTOS DE NÃO-CONCESSÃO)
--------------------------------------------------------------------------------
${synthesis.irreducibleDivergences.map((d, i) => `${i + 1}. ${d}`).join('\n')}

--------------------------------------------------------------------------------
IV. RISCOS SISTÉMICOS IDENTIFICADOS
--------------------------------------------------------------------------------
${synthesis.systemicRisks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

--------------------------------------------------------------------------------
V. RECOMENDAÇÃO ESTRATÉGICA SUPREMA
--------------------------------------------------------------------------------
${synthesis.strategicRecommendation}

--------------------------------------------------------------------------------
VI. PLANO DE AÇÃO ARTICULADO EM ETAPAS
--------------------------------------------------------------------------------
${synthesis.actionPlan.map(a => `ETAPA 0${a.step}: ${a.action} (Liderado por: ${a.championMind})`).join('\n')}

================================================================================
Autenticado e Selado pelo Motor RAG Canónico do MINDVERSE (pgvector 1536d)
================================================================================
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn print:p-0 print:bg-white print:static">
      
      {/* Container Principal do Édito */}
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-gradient-to-b from-[#131b2e] via-[#0f1728] to-[#0a0f1d] border border-mindverse-gold/50 shadow-[0_0_60px_rgba(217,169,79,0.25)] overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black print:max-w-none">
        
        {/* Barra Superior de Ações (Oculta na Impressão) */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-white/[0.02] print:hidden">
          <div className="flex items-center gap-2 text-mindverse-gold-light text-xs font-mono">
            <Award className="w-4 h-4 text-mindverse-gold" />
            <span>Documento Deliberativo Timbrado • Ágora</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-mindverse-softwhite transition-colors"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-mindverse-gold" />}
              <span>{hasCopied ? 'Copiado' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-mindverse-gold hover:bg-amber-400 text-mindverse-deep font-serif font-bold text-xs shadow-md transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Gerar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-mindverse-muted hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Documento Timbrado */}
        <div className="p-8 sm:p-12 space-y-8 max-h-[80vh] overflow-y-auto scrollbar-thin print:max-h-none print:p-8 print:overflow-visible">
          
          {/* Cabeçalho Heráldico Timbrado */}
          <div className="text-center space-y-3 border-b-2 border-mindverse-gold/40 pb-6 print:border-black">
            <div className="flex justify-center items-center gap-2">
              <Crown className="w-7 h-7 text-mindverse-gold print:text-black" />
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-mindverse-gold-light uppercase print:text-black">
              Édito do Conselho das Grandes Mentes
            </h1>
            
            <p className="font-serif italic text-xs sm:text-sm text-mindverse-muted print:text-neutral-600">
              MINDVERSE • Registado no Livro Oficial de Atas Deliberativas da Humanidade
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 text-[11px] font-mono text-mindverse-gold-light/80 pt-2 print:text-black">
              <span className="px-2.5 py-0.5 rounded bg-mindverse-gold/10 border border-mindverse-gold/30 print:border-black">
                PROTOCOLO: {charterId}
              </span>
              <span>•</span>
              <span>DATA: {sessionDate}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold print:text-black">SESSÃO CERTIFICADA RAG</span>
            </div>
          </div>

          {/* Moção Submetida */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-mindverse-gold/30 print:bg-neutral-50 print:border-black">
            <span className="text-[10px] font-mono uppercase text-mindverse-gold tracking-widest font-bold block mb-1 print:text-black">
              Moção Oficial Submetida ao Conselho:
            </span>
            <p className="font-serif text-base sm:text-lg text-mindverse-softwhite font-medium italic print:text-black">
              "{motion}"
            </p>
          </div>

          {/* Composição das Mentes Convocadas */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs uppercase font-bold tracking-widest text-mindverse-gold print:text-black flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-mindverse-gold print:text-black" />
              <span>Membros Convocados do Conselho ({participants.length} Pensadores)</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {participants.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-neutral-300 print:bg-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-mindverse-midnight border border-mindverse-gold/40 shrink-0 print:border-black">
                    <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif font-bold text-xs text-mindverse-softwhite truncate print:text-black">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-mindverse-muted truncate print:text-neutral-500">
                      {p.titleEpithet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* I. Diagnóstico Estratégico Coletivo */}
          <div className="space-y-2 border-t border-white/10 pt-5 print:border-neutral-300">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-mindverse-gold print:text-black">
              I. Diagnóstico Estratégico Coletivo
            </h3>
            <p className="text-xs sm:text-sm text-mindverse-softwhite/90 leading-relaxed font-sans print:text-black">
              {synthesis.collectiveDiagnosis}
            </p>
          </div>

          {/* II. Convergências e III. Divergências em 2 Colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-5 print:border-neutral-300">
            {/* Convergências */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-black flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>II. Convergências Reais (Acordo)</span>
              </h4>
              <ul className="space-y-2 text-xs text-mindverse-softwhite/85 print:text-black">
                {synthesis.convergences.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divergências Irredutíveis */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>III. Tensões Axiológicas (Atrito)</span>
              </h4>
              <ul className="space-y-2 text-xs text-mindverse-softwhite/85 print:text-black">
                {synthesis.irreducibleDivergences.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* IV. Riscos Sistémicos */}
          <div className="space-y-2 border-t border-white/10 pt-5 print:border-neutral-300">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-rose-400 print:text-black">
              IV. Matriz de Riscos Sistémicos Identificados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {synthesis.systemicRisks.map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-mindverse-softwhite/90 print:bg-white print:border-neutral-300 print:text-black">
                  <span className="font-bold text-rose-400 print:text-black block mb-0.5">Risco 0{i + 1}:</span>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* V. Recomendação Estratégica Suprema */}
          <div className="p-5 rounded-2xl bg-mindverse-gold/10 border border-mindverse-gold/40 space-y-2 print:bg-neutral-100 print:border-black">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-mindverse-gold-light print:text-black flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-mindverse-gold print:text-black" />
              <span>V. Recomendação Estratégica Suprema</span>
            </h3>
            <p className="font-serif text-sm text-mindverse-softwhite leading-relaxed italic print:text-black">
              "{synthesis.strategicRecommendation}"
            </p>
          </div>

          {/* VI. Plano de Ação Articulado por Etapas */}
          <div className="space-y-3 border-t border-white/10 pt-5 print:border-neutral-300">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-mindverse-gold print:text-black">
              VI. Plano de Ação Articulado em Etapas
            </h3>
            
            <div className="space-y-2.5">
              {synthesis.actionPlan.map(a => (
                <div key={a.step} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 print:border-neutral-300 print:bg-white">
                  <span className="w-7 h-7 rounded-lg bg-mindverse-gold text-mindverse-deep font-mono font-bold text-xs flex items-center justify-center shrink-0 print:border print:border-black">
                    0{a.step}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-mindverse-softwhite font-medium print:text-black">
                      {a.action}
                    </p>
                    <span className="text-[10px] font-mono text-mindverse-gold/80 block mt-1 print:text-neutral-600">
                      Diretiva fundamentada nos princípios de: <strong>{a.championMind}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selo Heráldico de Fecho */}
          <div className="text-center border-t-2 border-mindverse-gold/40 pt-6 space-y-2 print:border-black">
            <p className="font-serif text-xs text-mindverse-muted print:text-neutral-600">
              "Veritas per Dialecticam • O Conhecimento da Humanidade Imortalizado em Diálogo Vivo"
            </p>
            <p className="font-mono text-[10px] text-mindverse-gold/60 print:text-black">
              Chancela de Autenticidade Digital: {session.id} • pgvector HNSW 1536d
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
