import React from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  Lock, 
  FileCheck,
  Sparkles
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
          <Layers className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <span>Arquitetura de Missão • MINDVERSE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-mindverse-softwhite">
          A Fundação Técnica e Cognitiva
        </h1>
        <p className="text-sm sm:text-base text-mindverse-muted leading-relaxed">
          O MINDVERSE foi desenhado para transcender os limites dos assistentes convencionais através de rigor histórico, isolamento de segurança estrito e modelagem epistemológica autêntica.
        </p>
      </div>

      {/* 4 Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center text-mindverse-gold-subtle">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
            1. RAG Histórico com pgvector (1536d)
          </h3>
          <p className="text-xs text-mindverse-muted leading-relaxed">
            Indexação de textos originais de domínio público utilizando OpenAI <code className="text-mindverse-gold-accent">text-embedding-3-small</code> com índice HNSW. Proteção ativa contra mismatches de dimensão e versionamento semântico de embeddings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center text-mindverse-cyan-glow">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
            2. Segurança Absoluta de Credenciais
          </h3>
          <p className="text-xs text-mindverse-muted leading-relaxed">
            Zero chaves de fornecedores de IA no cliente. Nenhuma variável <code className="text-mindverse-cyan-glow">VITE_</code> armazena segredos. Todas as chamadas são orquestradas exclusivamente no backend e Edge Functions com Row-Level Security (RLS).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center text-mindverse-gold-subtle">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
            3. Gateway de IA Agnóstico (Adapter Pattern)
          </h3>
          <p className="text-xs text-mindverse-muted leading-relaxed">
            Interface unificada desacoplada de provedores específicos. Permite combinar modelos conforme a exigência: Claude 3.5 para raciocínio profundo, Groq para debates de alta velocidade e Gemini para grandes janelas de contexto.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center text-mindverse-gold-accent">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
            4. Transparência Epistémica
          </h3>
          <p className="text-xs text-mindverse-muted leading-relaxed">
            Distinção explícita no protocolo entre factos comprovados em fontes primárias, interpretações históricas e simulações hipotéticas sobre o mundo moderno.
          </p>
        </div>
      </div>

      {/* Cohort Genesis Specifications */}
      <div className="p-6 rounded-3xl bg-mindverse-midnight/40 border border-mindverse-graphite space-y-4">
        <h3 className="font-serif font-bold text-xl text-mindverse-softwhite">
          Panteão Histórico Canónico (47 Grandes Mentes)
        </h3>
        <p className="text-xs text-mindverse-muted">
          Expandido para 47 personalidades de referência mundial: Filósofos, Estrategas, Fundadores, Prémios Nobel da Ciência (Física e Química), Presidentes, Primeiros-Ministros, Inventores e Historiadores da Humanidade com corpora canónicos indexados.
        </p>
        <div className="pt-2 text-xs font-mono text-mindverse-gold-accent flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-mindverse-gold-subtle" />
          <span>Fase 1 Concluída • Prontidão para integração da Fase 2 (Motor RAG & Streaming)</span>
        </div>
      </div>
    </div>
  );
};
