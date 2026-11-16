import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'ethics';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mindverse-void/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-mindverse-deep border border-mindverse-gold-subtle/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-mindverse-softwhite scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-mindverse-graphite/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-mindverse-midnight border border-mindverse-gold-subtle/30 text-mindverse-gold-subtle">
              {type === 'privacy' && <Lock className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'ethics' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-mindverse-softwhite">
                {type === 'privacy' && 'Política de Privacidade & Soberania de Dados'}
                {type === 'terms' && 'Termos de Serviço & Governança da Plataforma'}
                {type === 'ethics' && 'Carta Ética de Preservação Histórica e IA'}
              </h2>
              <span className="text-xs font-mono text-mindverse-muted">
                Versão 2.4 Canónica • Atualizada em Novembro de 2026 • Em vigor
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-mindverse-muted hover:text-mindverse-softwhite hover:bg-mindverse-midnight transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-mindverse-muted leading-relaxed font-sans">
          {type === 'privacy' && (
            <>
              <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-gold-subtle/20 flex items-start gap-3 text-mindverse-gold-light">
                <ShieldCheck className="w-5 h-5 shrink-0 text-mindverse-gold-subtle mt-0.5" />
                <p className="text-xs sm:text-sm">
                  <strong>Princípio da Soberania Cognitiva:</strong> O MINDVERSE opera sob a garantia de que as suas deliberações, dilemas e mensagens pessoais ou estratégicas jamais serão comercializados, partilhados ou utilizados para treino contínuo de modelos de inteligência artificial de terceiros.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  1. Recolha e Encriptação de Dados
                </h3>
                <p>
                  Recolhemos unicamente os dados estritamente necessários para viabilizar a sua autenticação, contabilidade de tokens da quota diária e persistência de sessões históricas. Todos os dados em trânsito são protegidos com TLS 1.3 de ponta a ponta e todas as tabelas em repouso utilizam encriptação AES-256 no Supabase com isolamento rigoroso via Row-Level Security (RLS).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  2. Conformidade com o RGPD (UE) e LGPD (Brasil)
                </h3>
                <p>
                  Em total conformidade com o Regulamento Geral sobre a Proteção de Dados (Regulamento UE 2016/679) e a Lei Geral de Proteção de Dados (Lei 13.709/2018), asseguramos todos os direitos fundamentais do titular: acesso, retificação, portabilidade e direito ao esquecimento total. O utilizador pode eliminar todas as suas conversas a qualquer momento com efeito imediato nas bases de dados.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  3. Inexistência de Rastreadores Comerciais
                </h3>
                <p>
                  O MINDVERSE não integra pixels de remarketing de publicidade invasiva, cookies de terceiros ou corretores de dados. Toda a telemetria é unicamente operacional para monitorizar o tempo de resposta e estabilidade dos embeddings do pgvector.
                </p>
              </section>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite flex items-start gap-3 text-mindverse-softwhite">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-mindverse-gold-subtle mt-0.5" />
                <p className="text-xs sm:text-sm text-mindverse-muted">
                  Ao aceder ao MINDVERSE, celebra um acordo de uso com a plataforma, concordando em utilizá-la para fins de reflexão, investigação académica, liderança estratégica, educação e deliberação ética.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  1. Natureza do Serviço e Rigor Epistémico
                </h3>
                <p>
                  As respostas fornecidas pelas mentes históricas são o produto de uma orquestração de Inteligência Artificial aumentada por RAG ancorado em textos de domínio público. As respostas não constituem aconselhamento médico, financeiro ou jurídico formal, devendo ser interpretadas sob a perspetiva de enriquecimento dialético e filosófico.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  2. Propriedade Intelectual do Utilizador
                </h3>
                <p>
                  Todos os decretos executivos gerados, planos de ação concebidos no Gabinete de Crise, sínteses trans-séculos e transcrições de debates no Ágora pertencem integralmente ao utilizador que os formulou.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  3. Quotas de Uso e Integridade Operacional
                </h3>
                <p>
                  Para preservar a disponibilidade de cálculo e evitar abusos automatizados, os planos impõem limites de tokens transparentemente auditados no painel superior. Tentativas de ataques DDoS ou engenharia reversa do sistema resultarão no cancelamento imediato de acesso.
                </p>
              </section>
            </>
          )}

          {type === 'ethics' && (
            <>
              <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-gold-subtle/20 flex items-start gap-3 text-mindverse-gold-light">
                <Scale className="w-5 h-5 shrink-0 text-mindverse-gold-subtle mt-0.5" />
                <p className="text-xs sm:text-sm">
                  <strong>Compromisso de Fidelidade Histórica:</strong> Repudiamos a caricaturização superficial ou o anacronismo demagógico. Cada mente no MINDVERSE é modelada a partir de textos canónicos originais com rigor científico.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  1. O Triplo Estatuto Epistémico
                </h3>
                <p>
                  Toda a inferência gerada é categorizada de forma aberta e auditável:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-mindverse-muted">
                  <li><strong className="text-emerald-400">[FACTO DOCUMENTADO]:</strong> Conhecimento extraído diretamente de fontes primárias históricas autenticadas.</li>
                  <li><strong className="text-mindverse-gold-accent">[INTERPRETAÇÃO HISTÓRICA]:</strong> Dedutibilidade lógica fundamentada na mundivisão e axiomas conhecidos do pensador.</li>
                  <li><strong className="text-mindverse-cyan-glow">[SIMULAÇÃO HIPOTÉTICA]:</strong> Aplicação da grelha de pensamento da personagem a desafios contemporâneos e cenários contrafactuais.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  2. Tratamento das Contradições e Limitações Históricas
                </h3>
                <p>
                  Nenhuma mente histórica é censurada nem branqueada anacronicamente. As suas contradições, limitações de época e tensões morais são expressas com objetividade histórica, permitindo um debate filosófico maduro e desprovido de paternalismo cognitivo.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-mindverse-graphite/60 flex items-center justify-between">
          <span className="text-xs font-mono text-mindverse-muted">
            MINDVERSE Cognition Engine • Legal & Trust
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-mindverse-midnight border border-mindverse-gold-subtle/40 text-mindverse-gold-light font-medium text-xs hover:bg-mindverse-graphite transition-all shadow-gold-glow"
          >
            Compreendido & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
