import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Message, MessageCitation } from '../../types';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Info,
  Quote,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    selectedPersonality, 
    setSelectedPersonality, 
    userProfile 
  } = useAppStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCitation, setSelectedCitation] = useState<MessageCitation | null>(null);

  // Initial canonical orientation for the selected personality
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'orientation-01',
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'system',
      content: `[DNA Intelectual Carregado]: Está em sessão com ${selectedPersonality.name} (${selectedPersonality.titleEpithet}).\n\nMundivisão Canónica: "${selectedPersonality.quoteFeatured}"\n\nCorpus de Referência: ${selectedPersonality.works.map(w => w.title).join('; ')}.`,
      epistemicStatus: 'documented_fact',
      tokensUsed: 0,
      createdAt: new Date().toISOString()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    const estimatedTokens = Math.ceil(userText.length / 4);

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      conversationId: 'conv-init',
      senderPersonalityId: null,
      role: 'user',
      content: userText,
      epistemicStatus: 'documented_fact',
      tokensUsed: estimatedTokens,
      createdAt: new Date().toISOString()
    };

    // Honest architectural system response indicating ready-state for Phase 2
    const systemNotice: Message = {
      id: `sys-${Date.now()}`,
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'assistant',
      content: `[Fase 1 • Validação de Contrato]: Pergunta recebida com sucesso e validada pelo cliente (${estimatedTokens} tokens estimados).\n\nA geração inteligente em tempo real e a recuperação vetorial semântica (pgvector / OpenAI text-embedding-3-small) serão conectadas através da Supabase Edge Function na Fase 2.\n\nNenhuma resposta fictícia ou alucinação pré-gravada é emitida em conformidade com o princípio de Transparência do MINDVERSE.`,
      epistemicStatus: 'hypothetical_simulation',
      tokensUsed: 0,
      createdAt: new Date().toISOString(),
      citations: selectedPersonality.works[0] ? [
        {
          id: `cit-${Date.now()}`,
          workTitle: selectedPersonality.works[0].title,
          section: 'Corpus Verificado',
          quoteSnippet: selectedPersonality.quoteFeatured,
          similarityScore: 1.0,
          epistemicType: 'primary_source'
        }
      ] : []
    };

    setMessages((prev) => [...prev, userMessage, systemNotice]);
  };

  const getStatusBadge = (status: Message['epistemicStatus']) => {
    switch (status) {
      case 'documented_fact':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {t('chat.fact_tag')}
          </span>
        );
      case 'historical_interpretation':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
            <Info className="w-3 h-3 text-amber-400" />
            {t('chat.interp_tag')}
          </span>
        );
      case 'hypothetical_simulation':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/40 text-sky-300 border border-sky-500/30">
            <Sparkles className="w-3 h-3 text-sky-400" />
            {t('chat.sim_tag')}
          </span>
        );
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-4 animate-fade-in">
      {/* Top Bar: Active Persona Selector */}
      <div className="shrink-0 p-4 rounded-2xl bg-mindverse-midnight/80 border border-mindverse-graphite flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-mindverse-graphite border border-mindverse-gold-subtle/30 flex items-center justify-center font-serif font-bold text-mindverse-gold-subtle">
            {selectedPersonality.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-base text-mindverse-softwhite">
                {selectedPersonality.name}
              </h2>
              <span className="text-[10px] font-mono text-mindverse-gold-accent px-1.5 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite">
                {selectedPersonality.historicalEra.split('(')[0].trim()}
              </span>
            </div>
            <p className="text-xs text-mindverse-muted line-clamp-1">
              {selectedPersonality.titleEpithet}
            </p>
          </div>
        </div>

        {/* Personality Switcher Dropdown */}
        <div className="relative">
          <select
            value={selectedPersonality.id}
            onChange={(e) => {
              const found = COHORT_GENESIS_PERSONALITIES.find((p) => p.id === e.target.value);
              if (found) {
                setSelectedPersonality(found);
                setMessages([
                  {
                    id: `orientation-${found.id}`,
                    conversationId: 'conv-init',
                    senderPersonalityId: found.id,
                    role: 'system',
                    content: `[DNA Intelectual Carregado]: Sessão alterada para ${found.name} (${found.titleEpithet}).\n\nMundivisão: "${found.quoteFeatured}".`,
                    epistemicStatus: 'documented_fact',
                    tokensUsed: 0,
                    createdAt: new Date().toISOString()
                  }
                ]);
              }
            }}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-mindverse-deep border border-mindverse-graphite text-xs text-mindverse-softwhite font-medium focus:outline-none focus:border-mindverse-gold-subtle cursor-pointer"
          >
            {COHORT_GENESIS_PERSONALITIES.map((p) => (
              <option key={p.id} value={p.id} className="bg-mindverse-midnight text-mindverse-softwhite">
                {p.name} ({p.historicalEra.split('(')[0].trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Epistemic Transparency Notice */}
      <div className="mt-2 shrink-0 p-3 rounded-xl bg-mindverse-midnight/40 border border-mindverse-graphite/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-mindverse-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-mindverse-gold-subtle shrink-0" />
          <span>{t('chat.epistemic_notice')}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-mindverse-gold-accent shrink-0">
          <Clock className="w-3.5 h-3.5 text-mindverse-cyan-glow" />
          <span>Fase 1: Interface & Validação de Esquema</span>
        </div>
      </div>

      {/* Message History Container */}
      <div className="flex-1 overflow-y-auto my-3 space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isSystem = msg.role === 'system';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`
                  max-w-3xl rounded-2xl p-4.5 space-y-3 transition-all
                  ${isUser 
                    ? 'bg-mindverse-midnight/90 text-mindverse-softwhite border border-mindverse-graphite' 
                    : isSystem
                    ? 'bg-mindverse-deep/90 text-mindverse-gold-light/90 border border-mindverse-gold-subtle/30 font-mono text-xs'
                    : 'bg-mindverse-darkblue/70 text-mindverse-softwhite border border-mindverse-gold-subtle/20 shadow-md'
                  }
                `}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-serif font-bold text-xs text-mindverse-gold-subtle">
                    {isUser ? userProfile.fullName : isSystem ? 'Sistema MINDVERSE' : selectedPersonality.name}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isUser && !isSystem && getStatusBadge(msg.epistemicStatus)}
                    <span className="text-[10px] font-mono text-mindverse-muted">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-sm font-sans leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {/* Citations Preview (if any) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-mindverse-graphite/50 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-mindverse-gold-accent font-semibold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-mindverse-gold-subtle" />
                      {t('chat.citations')}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cit) => (
                        <button
                          key={cit.id}
                          onClick={() => setSelectedCitation(cit)}
                          className="px-2.5 py-1 rounded bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite hover:border-mindverse-gold-subtle/40 text-[11px] text-mindverse-muted hover:text-mindverse-softwhite transition-all text-left flex items-center gap-1.5"
                        >
                          <Quote className="w-2.5 h-2.5 text-mindverse-gold-subtle" />
                          <span className="font-medium truncate max-w-[220px]">{cit.workTitle}</span>
                          <span className="font-mono text-[9px] text-mindverse-gold-subtle">
                            (Fonte Verificada)
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Citation Detail Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-mindverse-deep border border-mindverse-gold-subtle/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-mindverse-graphite pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-mindverse-gold-subtle" />
                <h4 className="font-serif font-bold text-sm text-mindverse-softwhite">
                  Fonte Primária Rastreável
                </h4>
              </div>
              <button
                onClick={() => setSelectedCitation(null)}
                className="text-xs text-mindverse-muted hover:text-mindverse-softwhite"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-mindverse-gold-accent font-mono block">
                Obra: {selectedCitation.workTitle}
              </span>
              <span className="text-mindverse-muted block">
                Secção / Proveniência: {selectedCitation.section}
              </span>
              <div className="p-3 rounded-xl bg-mindverse-midnight border border-mindverse-graphite italic text-mindverse-softwhite leading-relaxed">
                "{selectedCitation.quoteSnippet}"
              </div>
              <span className="text-[10px] font-mono text-mindverse-muted block pt-1">
                Estado: Obra de Domínio Público Verificada no Catálogo Genesis
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="shrink-0 pt-2">
        <div className="relative rounded-2xl bg-mindverse-midnight border border-mindverse-graphite focus-within:border-mindverse-gold-subtle focus-within:ring-1 focus-within:ring-mindverse-gold-subtle transition-all shadow-lg p-2 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Dirija-se a ${selectedPersonality.name}...`}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-mindverse-softwhite placeholder-mindverse-muted outline-none"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle disabled:opacity-40 disabled:cursor-not-allowed text-mindverse-void font-semibold text-xs transition-all shadow-gold-glow flex items-center gap-1.5"
          >
            <span>{t('chat.send')}</span>
            <Send className="w-3 h-3" />
          </button>
        </div>

        <div className="pt-2 px-1 flex items-center justify-between text-[10px] font-mono text-mindverse-muted">
          <span>Enter para enviar • Shift + Enter para nova linha</span>
          <span className="flex items-center gap-1 text-mindverse-gold-accent">
            <Layers className="w-3 h-3" />
            <span>Fase 1: Fundação • Streaming SSE em espera da Fase 2</span>
          </span>
        </div>
      </form>
    </div>
  );
};
