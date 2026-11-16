import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles
} from 'lucide-react';

export const DocumentationSection: React.FC = () => {
  const [activeDocTab, setActiveDocTab] = useState<'quickstart' | 'epistemic' | 'api' | 'rag'>('quickstart');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const curlExample = `curl -X POST https://api.mindverse.ai/v1/dialectic/chat \\
  -H "Authorization: Bearer mv_live_sec_9948a7b6e821" \\
  -H "Content-Type: application/json" \\
  -d '{
    "persona": "aristoteles",
    "prompt": "Como encontrar a justa medida na governança de inteligência artificial?",
    "temperature": 0.35,
    "epistemicStrictness": "rigorous",
    "includeCitations": true
  }'`;

  const tsExample = `import { MindverseClient } from '@mindverse/sdk';

const client = new MindverseClient({
  apiKey: process.env.MINDVERSE_API_KEY,
});

// Iniciar deliberação com Aristóteles
const response = await client.personas.query({
  slug: 'aristoteles',
  query: 'Qual é o fim supremo da liderança corporativa moderna?',
  epistemicTier: 'historical_interpretation',
});

console.log(response.epistemicStatus); // 'historical_interpretation'
console.log(response.answer);          // Resposta rigorosamente fundamentada
console.log(response.citations);       // Trechos de Ética a Nicómaco (Bekker 1094a)`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
          <BookOpen className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <span>Manual de Engenharia Cognitiva & SDK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mindverse-softwhite">
          Documentação de Sistema & Protocolo
        </h2>
        <p className="text-sm sm:text-base text-mindverse-muted max-w-2xl mx-auto leading-relaxed">
          Especificações formais da arquitetura RAG vetorial, protocolo epistémico anti-alucinação e referência de integração do MINDVERSE.
        </p>
      </div>

      {/* Doc Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-mindverse-midnight/80 border border-mindverse-graphite/60 max-w-xl mx-auto">
        <button
          onClick={() => setActiveDocTab('quickstart')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDocTab === 'quickstart'
              ? 'bg-mindverse-gold-subtle text-mindverse-void font-semibold shadow-gold-glow'
              : 'text-mindverse-muted hover:text-mindverse-softwhite'
          }`}
        >
          Guia Rápido
        </button>
        <button
          onClick={() => setActiveDocTab('epistemic')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDocTab === 'epistemic'
              ? 'bg-mindverse-gold-subtle text-mindverse-void font-semibold shadow-gold-glow'
              : 'text-mindverse-muted hover:text-mindverse-softwhite'
          }`}
        >
          Protocolo Epistémico
        </button>
        <button
          onClick={() => setActiveDocTab('api')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDocTab === 'api'
              ? 'bg-mindverse-gold-subtle text-mindverse-void font-semibold shadow-gold-glow'
              : 'text-mindverse-muted hover:text-mindverse-softwhite'
          }`}
        >
          API & SDK
        </button>
        <button
          onClick={() => setActiveDocTab('rag')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDocTab === 'rag'
              ? 'bg-mindverse-gold-subtle text-mindverse-void font-semibold shadow-gold-glow'
              : 'text-mindverse-muted hover:text-mindverse-softwhite'
          }`}
        >
          Arquitetura RAG
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="p-6 sm:p-8 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-6">
        {activeDocTab === 'quickstart' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif font-bold text-xl text-mindverse-softwhite flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-mindverse-gold-subtle" />
              Iniciação Rápida no Ecossistema MINDVERSE
            </h3>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              O ecossistema MINDVERSE organiza-se em 3 modos operacionais principais desenhados para reflexão individual, confronto dialético e tomada de decisão de alto nível:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <span className="text-xs font-mono text-mindverse-gold-accent font-semibold">1. Diálogo Socrático (1:1)</span>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Converse em profundidade com qualquer uma das 47 mentes. A conversa é instantânea e ancorada em citações reais de textos de domínio público.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <span className="text-xs font-mono text-mindverse-cyan-glow font-semibold">2. Conselho das Mentes (Ágora)</span>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Reúna até 5 pensadores de eras distintas para deliberar sobre uma moção complexa em 3 rondas (Teses, Réplicas e Síntese Executiva).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <span className="text-xs font-mono text-amber-300 font-semibold">3. Inovações Dialéticas</span>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Utilize o Coliseu 1 vs 1, o Gabinete de Crise do Líder, a História Contrafactual («E Se...?») e a Síntese Trans-Séculos para co-criação conceitual.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeDocTab === 'epistemic' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif font-bold text-xl text-mindverse-softwhite flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              O Padrão Epistémico Triplo (Tri-Tier Epistemic Architecture)
            </h3>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              Para erradicar a alucinação e garantir a honestidade intelectual, cada inferência gerada é taxada e isolada num dos três níveis estritos de fundamentação:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-mindverse-deep/80 border border-emerald-500/30 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 font-mono">
                    [FACTO DOCUMENTADO / PRIMARY SOURCE]
                  </h4>
                  <p className="text-xs text-mindverse-muted mt-1 leading-relaxed">
                    Extraído diretamente de obras canónicas indexadas (ex.: fragmentos de Heródoto, equações de Newton nos <em>Principia</em>, cartas de Séneca a Lucílio). Sempre acompanhado de citação bibliográfica auditável.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/80 border border-mindverse-gold-subtle/30 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-mindverse-gold-subtle/10 text-mindverse-gold-subtle flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-mindverse-gold-accent font-mono">
                    [INTERPRETAÇÃO HISTÓRICA FUNDAMENTADA]
                  </h4>
                  <p className="text-xs text-mindverse-muted mt-1 leading-relaxed">
                    Dedução necessária e coerente com a mundivisão, axiomas e método filosófico comprovado da persona, preenchendo lacunas sem corromper a sua identidade ontológica.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/80 border border-mindverse-cyan-glow/30 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-mindverse-cyan-glow/10 text-mindverse-cyan-glow flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-mindverse-cyan-glow font-mono">
                    [SIMULAÇÃO HIPOTÉTICA / CONTEMPORÂNEA]
                  </h4>
                  <p className="text-xs text-mindverse-muted mt-1 leading-relaxed">
                    Aplicação da matriz de raciocínio da personagem a fenómenos pós-mortem (ex.: Einstein analisando Inteligência Artificial Generativa ou Sun Tzu analisando guerra cibernética). O modelo reconhece explicitamente a sua limitação histórica antes de projetar o raciocínio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDocTab === 'api' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif font-bold text-xl text-mindverse-softwhite flex items-center gap-2">
              <Code2 className="w-5 h-5 text-mindverse-cyan-glow" />
              Integração via API REST & TypeScript SDK
            </h3>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              Incorpore o poder de deliberação das 47 mentes históricas diretamente nas suas aplicações, agentes autónomos ou esteiras de análise de risco e governança ética:
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-mindverse-muted">
                  <span className="flex items-center gap-1.5 text-mindverse-gold-accent">
                    <Terminal className="w-3.5 h-3.5" /> cURL Endpoint
                  </span>
                  <button 
                    onClick={() => handleCopy(curlExample, 'curl')}
                    className="flex items-center gap-1 hover:text-mindverse-softwhite transition-colors"
                  >
                    {copiedSnippet === 'curl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'curl' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-mindverse-void border border-mindverse-graphite text-xs font-mono text-mindverse-gold-light/90 overflow-x-auto scrollbar-thin">
                  {curlExample}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-mindverse-muted">
                  <span className="flex items-center gap-1.5 text-mindverse-cyan-glow">
                    <Code2 className="w-3.5 h-3.5" /> TypeScript / Node.js SDK
                  </span>
                  <button 
                    onClick={() => handleCopy(tsExample, 'ts')}
                    className="flex items-center gap-1 hover:text-mindverse-softwhite transition-colors"
                  >
                    {copiedSnippet === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'ts' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-mindverse-void border border-mindverse-graphite text-xs font-mono text-mindverse-cyan-glow/90 overflow-x-auto scrollbar-thin">
                  {tsExample}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeDocTab === 'rag' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif font-bold text-xl text-mindverse-softwhite flex items-center gap-2">
              <Layers className="w-5 h-5 text-mindverse-gold-subtle" />
              Arquitetura de Recuperação Vetorial com pgvector
            </h3>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              O pipeline do MINDVERSE utiliza uma estratégia híbrida de RAG semântico com vetorização densa de 1536 dimensões e reclassificação lexical:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <h4 className="text-xs font-mono font-bold text-mindverse-gold-accent uppercase">
                  Chunking Canónico Respeitando Parágrafos
                </h4>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Os textos originais não são cortados aleatoriamente; respeitam as divisões canónicas da tradição (numeração Bekker para Aristóteles, versículos para textos antigos e capítulos temáticos para tratados modernos).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <h4 className="text-xs font-mono font-bold text-mindverse-gold-accent uppercase">
                  Índice HNSW com Distância Cúbica/Cosine
                </h4>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Pesquisa por vizinhos mais próximos em tempo inferior a 15ms sobre o cluster pgvector do Supabase, com suporte a filtros rígidos por autor (`persona_id`) e era cronológica.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <h4 className="text-xs font-mono font-bold text-mindverse-gold-accent uppercase">
                  Blindagem de Identidade Inviolável
                </h4>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Filtros determinísticos em nível de prompt e validação de tokens de saída asseguram que a mente interrogada nunca assuma a primeira pessoa de outro pensador.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite space-y-2">
                <h4 className="text-xs font-mono font-bold text-mindverse-gold-accent uppercase">
                  Orquestração com Fallback de Alta Disponibilidade
                </h4>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Caso os fornecedores de nuvem sofram latência ou indisponibilidade, o motor ativa instantaneamente os corpora canónicos offline com zero tempo de paragem.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
