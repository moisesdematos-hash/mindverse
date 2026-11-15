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
  CheckCircle2
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    selectedPersonality, 
    setSelectedPersonality, 
    addTokensUsed, 
    userProfile 
  } = useAppStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCitation, setSelectedCitation] = useState<MessageCitation | null>(null);

  // Initial messages tailored to the personality
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-01',
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'assistant',
      content: `Saudações. Eu sou ${selectedPersonality.name}, ${selectedPersonality.titleEpithet}. O meu pensamento assenta no princípio de que: "${selectedPersonality.quoteFeatured}". Que questão ou dilema pretendes examinar à luz da razão e do conhecimento comprovado?`,
      epistemicStatus: 'documented_fact',
      tokensUsed: 142,
      modelUsed: 'claude-3-5-sonnet',
      createdAt: new Date().toISOString(),
      citations: selectedPersonality.works[0] ? [
        {
          id: 'cit-01',
          workTitle: selectedPersonality.works[0].title,
          section: 'Introdução Canónica',
          quoteSnippet: selectedPersonality.quoteFeatured,
          similarityScore: 0.94,
          epistemicType: 'primary_source'
        }
      ] : []
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      conversationId: 'conv-init',
      senderPersonalityId: null,
      role: 'user',
      content: userText,
      epistemicStatus: 'documented_fact',
      tokensUsed: Math.round(userText.length / 4),
      createdAt: new Date().toISOString()
    };

    // Simulated responsive turn from the persona based on their core worldview
    const assistantMessage: Message = {
      id: `ast-${Date.now()}`,
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'assistant',
      content: `Analisemos a tua questão: "${userText}".\n\nÀ luz dos princípios que formulei em ${selectedPersonality.works[0]?.title || 'meus escritos'}, o primeiro dever do discernimento é distinguir o que é essencial do que é aparente. ${selectedPersonality.coreWorldview}\n\n[Nota de Transparência da Fase 1: Conexão de streaming RAG ativa na Fase 2 com Supabase Edge Functions e OpenAI text-embedding-3-small].`,
      epistemicStatus: 'historical_interpretation',
      tokensUsed: 215,
      modelUsed: 'claude-3-5-sonnet',
      createdAt: new Date().toISOString(),
      citations: selectedPersonality.works[0] ? [
        {
          id: `cit-${Date.now()}`,
          workTitle: selectedPersonality.works[0].title,
          section: 'Capítulo I',
          quoteSnippet: selectedPersonality.axioms[0] || selectedPersonality.quoteFeatured,
          similarityScore: 0.88,
          epistemicType: 'primary_source'
        }
      ] : []
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    addTokensUsed(Math.round(userText.length / 4) + 215);
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
                    id: `welcome-${found.id}`,
                    conversationId: 'conv-init',
                    senderPersonalityId: found.id,
                    role: 'assistant',
                    content: `Saudações. Eu sou ${found.name}, ${found.titleEpithet}. O meu pensamento assenta no princípio de que: "${found.quoteFeatured}". Que questão pretendes examinar?`,
                    epistemicStatus: 'documented_fact',
                    tokensUsed: 120,
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
      <div className="mt-2 shrink-0 p-2.5 rounded-xl bg-mindverse-midnight/40 border border-mindverse-graphite/60 flex items-center justify-between text-[11px] text-mindverse-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-mindverse-gold-subtle shrink-0" />
          <span>{t('chat.epistemic_notice')}</span>
        </div>
        <span className="font-mono text-[10px] text-mindverse-gold-accent hidden md:inline">
          RAG Corpus: {selectedPersonality.works.length} Obras
        </span>
      </div>

      {/* Message History Container */}
      <div className="flex-1 overflow-y-auto my-3 space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
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
                    : 'bg-mindverse-darkblue/70 text-mindverse-softwhite border border-mindverse-gold-subtle/20 shadow-md'
                  }
                `}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-serif font-bold text-xs text-mindverse-gold-subtle">
                    {isUser ? userProfile.fullName : selectedPersonality.name}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isUser && getStatusBadge(msg.epistemicStatus)}
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
                            ({Math.round(cit.similarityScore * 100)}%)
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

      {/* Citation Detail Modal (When a citation is clicked) */}
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
                Secção / Capítulo: {selectedCitation.section}
              </span>
              <div className="p-3 rounded-xl bg-mindverse-midnight border border-mindverse-graphite italic text-mindverse-softwhite leading-relaxed">
                "{selectedCitation.quoteSnippet}"
              </div>
              <span className="text-[10px] font-mono text-mindverse-muted block pt-1">
                Grau de Similaridade Vetorial: {Math.round(selectedCitation.similarityScore * 100)}% (HNSW Cosine)
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
          <span>Fase 1: Fundação & Interface Dialógica</span>
        </div>
      </form>
    </div>
  );
};
