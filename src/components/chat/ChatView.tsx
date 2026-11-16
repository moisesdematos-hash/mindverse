import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Message, MessageCitation, EpistemicStatus } from '../../types';
import { globalRAGOrchestrator, ChatResponse } from '../../server/orchestrator';
import { councilAudio } from '../../services/councilAudio';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Info, 
  Quote, 
  CheckCircle2, 
  Clock, 
  Layers,
  Search,
  Volume2
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    selectedPersonality, 
    setSelectedPersonality, 
    userProfile,
    addTokensUsed 
  } = useAppStore();

  const getPersonalityGreeting = (p: typeof selectedPersonality): string => {
    switch (p.slug) {
      case 'aristoteles':
        return `Saudações. Sou Aristóteles. Toda a investigação e escolha humana visa alcançar algum bem supremo — aquilo a que chamei 'eudaimonia'. A virtude reside no equilíbrio ativo da justa medida entre os extremos. Que dúvida, decisão ou causa procuras examinar hoje comigo?`;
      case 'socrates':
        return `Alegra-me encontrar-te. Sou Sócrates. Dizem que a sabedoria começa no instante em que reconhecemos aquilo que ignoramos. Não venho trazer-te dogmas prontos, mas sim fazer as perguntas certas. Diz-me: que certeza ou inquietação trazes contigo para investigarmos juntos?`;
      case 'marco-aurelio':
        return `Saúdo-te. Sou Marco Aurélio. No meio das exigências e do ruído do mundo, o nosso dever é preservar a cidadela interior lúcida e agir com serenidade e justiça em prol do bem comum. Que peso, desafio ou decisão estás a enfrentar neste momento?`;
      case 'sun-tzu':
        return `Saudações. Sou Sun Tzu. A vitória e a ordem nunca pertencem ao acaso, mas a quem compreende o terreno, o tempo e a si mesmo antes do primeiro passo. A maior mestria é desarmar o conflito antes do choque. Que estratégia ou desafio tens perante ti?`;
      case 'peter-drucker':
        return `Bom dia. Sou Peter Drucker. No trabalho e na liderança, a eficácia consiste em fazer as coisas certas, não apenas fazer as coisas com pressa. Toda a organização e todo o profissional devem saber exatamente qual é o seu propósito exterior. Onde precisamos de colocar o foco hoje?`;
      case 'marie-curie':
        return `Saudações. Sou Marie Curie. Na vida e na ciência, nada deve ser temido, mas apenas compreendido com rigor, perseverança e coragem moral. Que problema ou hipótese queres investigar comigo com método e lucidez?`;
      case 'albert-einstein':
        return `Olá! Sou Albert Einstein. A imaginação é mais importante que o conhecimento puro, porque o conhecimento é limitado ao que já sabemos, enquanto a imaginação abraça todo o cosmos. Que mistério, princípio ou problema queres explorar comigo?`;
      case 'leonardo-da-vinci':
        return `Bem-vindo à minha oficina de pensamento. Sou Leonardo da Vinci. Para compreender o mundo, devemos observar a natureza com curiosidade incansável e unir a arte ao rigor da ciência. Que ideia, invenção ou desafio tens em mãos?`;
      case 'nikola-tesla':
        return `Saudações. Sou Nikola Tesla. O presente pertence aos pragmáticos, mas o futuro pertence àqueles que compreendem a energia, a frequência e a harmonia das forças da natureza. Que visão ou desafio tecnológico queres decifrar comigo?`;
      case 'adam-smith':
        return `Saudações. Sou Adam Smith. O progresso humano ergue-se sobre duas colunas inseparáveis: os sentimentos morais de empatia e a eficiência da divisão cooperativa do trabalho. Que dilema económico, social ou institucional queres examinar?`;
      case 'flavio-josefo':
        return `Saúdo-te. Sou Flávio Josefo. Testemunhei a glória e a queda trágica de civilizações e aprendi que a prudência política e o registo fidedigno dos factos são as únicas defesas contra a sedição e o esquecimento. Que encruzilhada histórica ou humana pretendes analisar?`;
      case 'platao':
        return `Saudações. Sou Platão de Atenas. Toda a vida autêntica aspira a ultrapassar as sombras da caverna e a contemplar a luz eterna das Ideias e da Justiça. Que verdade, dilema da alma ou visão de sociedade pretendes examinar comigo?`;
      case 'nicolau-maquiavel':
        return `Saudações. Sou Nicolau Maquiavel. Não procuro iludir-te com repúblicas imaginárias, mas analisar a realidade factual do poder com a sagacidade da raposa e a firmeza do leão. Que crise política, estratégia ou decisão de liderança tens em mãos?`;
      case 'isaac-newton':
        return `Saudações. Sou Sir Isaac Newton. O universo move-se segundo leis matemáticas universais de uma beleza e rigor inabaláveis. Se desejas compreender as forças motrizes da realidade ou decifrar um problema com método exato, diz-me por onde devemos começar.`;
      case 'alan-turing':
        return `Olá. Sou Alan Turing. Acredito que qualquer processo mental e dedutivo pode ser expresso através da lógica e executado por uma máquina universal. Que código, enigma da inteligência ou problema de cálculo queres decifrar comigo?`;
      case 'ada-lovelace':
        return `Bem-vindo. Sou Ada Lovelace. Para mim, a computação é uma ciência poética que une o rigor algébrico à imaginação infinita. As máquinas podem tecer padrões tão belos como as tapeçarias do pensamento. Que criação ou desafio algorítmico tens para explorar?`;
      case 'friedrich-nietzsche':
        return `Saúdo-te! Sou Friedrich Nietzsche. Não procuro adormecer a tua mente com consolações fáceis, mas despertar a tua Vontade de Poder e a coragem de amar o teu destino. Diz-me: que valores herdados estás pronto a questionar hoje?`;
      case 'alexandre-o-grande':
        return `Saudações. Sou Alexandre da Macedónia. Aprendi que para quem ousa tentar com audácia e lidera pelo exemplo à frente dos homens, nada é impossível. Que nó górdio ou desafio intransponível pretendes quebrar hoje comigo?`;
      case 'seneca':
        return `Saudações. Sou Séneca. O bem mais precioso que a natureza nos concedeu é o tempo, e a maior vitória é a conquista da tranquilidade interior no meio do tumulto do mundo. Que angústia, fardo ou escolha ética estás a enfrentar agora?`;
      case 'rene-descartes':
        return `Saudações. Sou René Descartes. A fundação de todo o conhecimento seguro começa pela coragem de duvidar metadicamente das aparências até alcançar ideias claras e distintas. Onde devemos aplicar o método da razão hoje?`;
      case 'max-planck':
        return `Saudações. Sou Max Planck. A ciência não pode resolver o mistério supremo da natureza porque nós próprios somos parte do mistério que tentamos desvendar. Descobri que a energia se propaga em pacotes discretos — os quanta. Que enigma físico ou filosófico queres examinar comigo?`;
      case 'niels-bohr':
        return `Bem-vindo. Sou Niels Bohr. Se a física quântica não te deixou profundamente desconcertado, é porque ainda não a compreendeste. No mundo atómico, os aparentes opostos complementam-se. Que questão sobre a realidade e a natureza das coisas te intriga hoje?`;
      case 'werner-heisenberg':
        return `Saudações. Sou Werner Heisenberg. Aquilo que observamos não é a natureza em si, mas a natureza exposta ao nosso método de questionamento. O princípio da incerteza ensina-nos rigor e humildade perante o cosmos. O que procuras compreender no horizonte do conhecimento?`;
      case 'erwin-schrodinger':
        return `Olá. Sou Erwin Schrödinger. A consciência é um singular do qual o plural não existe; a multiplicidade é apenas uma série de facetas de uma mesma realidade descrita por leis de onda. Que problema de física, biologia ou da própria vida queres explorar comigo?`;
      case 'enrico-fermi':
        return `Saudações. Sou Enrico Fermi. Diante de qualquer problema aparentemente complexo, divide-o em ordens de magnitude claras e confia na simplicidade elegante das leis físicas. Que cálculo, processo ou desafio tens em mãos?`;
      case 'richard-feynman':
        return `Olá! Sou Richard Feynman. O primeiro princípio é que não te deves enganar a ti mesmo — e tu és a pessoa mais fácil de enganar. Se não consegues explicar uma ideia em termos simples, ainda não a dominaste. Que dúvida curiosa ou enigma tens para desvendar hoje?`;
      case 'ernest-rutherford':
        return `Saudações. Sou Ernest Rutherford. Toda a ciência ou é física ou é filatelia! Com imaginação prática e experimentação incansável, abrimos o coração do átomo e revelámos o seu núcleo denso. Que fenómeno ou desafio queres dissecar comigo?`;
      case 'linus-pauling':
        return `Saudações. Sou Linus Pauling. A melhor forma de ter uma boa ideia é ter muitas ideias e saber descartar as erradas. Dediquei a vida a compreender a arquitetura molecular da matéria viva e a defender a paz entre os povos. Que questão queres debater?`;
      case 'alexander-fleming':
        return `Olá. Sou Alexander Fleming. Por vezes encontramos aquilo que não estávamos à procura, se tivermos a paciência de observar o inesperado. A natureza opera com uma subtileza extraordinária. Que observação ou hipótese tens para partilhar comigo?`;
      default:
        return `Saudações. Sou ${p.name}. Estou aqui para dialogar contigo e partilhar a sabedoria e os princípios que guiaram a minha vida. Que questão trazes ao meu encontro hoje?`;
    }
  };

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCitation, setSelectedCitation] = useState<MessageCitation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ragStatus, setRagStatus] = useState<'idle' | 'searching' | 'streaming' | 'completed'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mensagens do histórico — O pensador dá as boas-vindas imediatamente em primeira pessoa
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `welcome-${selectedPersonality.id}`,
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'assistant',
      content: getPersonalityGreeting(selectedPersonality),
      epistemicStatus: 'historical_interpretation',
      tokensUsed: 0,
      createdAt: new Date().toISOString()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, ragStatus]);

  useEffect(() => {
    setMessages([
      {
        id: `welcome-${selectedPersonality.id}`,
        conversationId: 'conv-init',
        senderPersonalityId: selectedPersonality.id,
        role: 'assistant',
        content: getPersonalityGreeting(selectedPersonality),
        epistemicStatus: 'historical_interpretation',
        tokensUsed: 0,
        createdAt: new Date().toISOString()
      }
    ]);
  }, [selectedPersonality.id]);

  const detectEpistemicStatus = (text: string): EpistemicStatus => {
    if (text.includes('[SIMULAÇÃO HIPOTÉTICA]')) return 'hypothetical_simulation';
    if (text.includes('[INTERPRETAÇÃO FUNDAMENTADA]')) return 'historical_interpretation';
    return 'documented_fact';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isProcessing) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');
    setIsProcessing(true);
    setRagStatus('searching');

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

    setMessages((prev) => [...prev, userMessage]);

    // Cria mensagem placeholder para streaming
    const assistantMsgId = `ast-${Date.now()}`;
    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      conversationId: 'conv-init',
      senderPersonalityId: selectedPersonality.id,
      role: 'assistant',
      content: '',
      epistemicStatus: 'documented_fact',
      tokensUsed: 0,
      createdAt: new Date().toISOString(),
      citations: []
    };

    setMessages((prev) => [...prev, initialAssistantMessage]);

    try {
      setRagStatus('streaming');

      // Executa consulta RAG real com callback de streaming de tokens
      const result: ChatResponse = await globalRAGOrchestrator.processInquiry(
        {
          personalityId: selectedPersonality.id,
          userQuery: userText,
          stream: true
        },
        (chunk: string) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      );

      // Converte as fontes recuperadas para MessageCitation
      const citations: MessageCitation[] = result.citations.map((c, i) => ({
        id: `cit-${Date.now()}-${i}`,
        workTitle: c.workTitle,
        section: c.section,
        quoteSnippet: c.citation,
        similarityScore: c.similarityScore,
        epistemicType: c.epistemicType as any
      }));

      const finalStatus = detectEpistemicStatus(result.answer);

      // Atualiza a mensagem final com metadados e fontes reais
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: result.answer,
                epistemicStatus: finalStatus,
                tokensUsed: result.tokensUsed,
                modelUsed: result.modelUsed,
                citations
              }
            : msg
        )
      );

      addTokensUsed(result.tokensUsed);
      setRagStatus('completed');
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `Erro no processamento do motor RAG: ${err.message}`,
                epistemicStatus: 'historical_interpretation'
              }
            : msg
        )
      );
      setRagStatus('completed');
    } finally {
      setIsProcessing(false);
    }
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
                    content: getPersonalityGreeting(found),
                    epistemicStatus: 'historical_interpretation',
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

      {/* RAG Engine State and Epistemic Notice */}
      <div className="mt-2 shrink-0 p-3 rounded-xl bg-mindverse-midnight/40 border border-mindverse-graphite/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-mindverse-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-mindverse-gold-subtle shrink-0" />
          <span>{t('chat.epistemic_notice')}</span>
        </div>

        {/* RAG Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {ragStatus === 'searching' && (
            <span className="flex items-center gap-1.5 text-mindverse-cyan-glow animate-pulse">
              <Search className="w-3.5 h-3.5" />
              <span>Pesquisando pgvector (1536d)...</span>
            </span>
          )}
          {ragStatus === 'streaming' && (
            <span className="flex items-center gap-1.5 text-mindverse-gold-subtle animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Fundamentar Resposta em Streaming...</span>
            </span>
          )}
          {(ragStatus === 'idle' || ragStatus === 'completed') && (
            <span className="flex items-center gap-1 text-mindverse-muted">
              <Layers className="w-3 h-3 text-mindverse-gold-subtle" />
              <span>Motor RAG Ativo (pgvector / text-embedding-3-small)</span>
            </span>
          )}
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

                    {!isUser && !isSystem && msg.content && (
                      <button
                        onClick={() => councilAudio.speak(selectedPersonality.id, msg.content)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-mindverse-gold/10 hover:bg-mindverse-gold/25 text-[10px] font-mono text-mindverse-gold-light border border-mindverse-gold/30 transition-all hover:scale-105"
                        title={`Ouvir ${selectedPersonality.name}`}
                      >
                        <Volume2 className="w-3 h-3 text-mindverse-gold" />
                        <span>Ouvir Voz</span>
                      </button>
                    )}

                    <span className="text-[10px] font-mono text-mindverse-muted">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-sm font-sans leading-relaxed whitespace-pre-wrap">
                  {msg.content || (
                    <span className="inline-flex items-center gap-1.5 text-mindverse-muted italic">
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-mindverse-gold-subtle" />
                      Consultando fontes primárias e formulando reflexão...
                    </span>
                  )}
                </p>

                {/* Citations Preview with Real Calculated Similarities */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-mindverse-graphite/50 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-mindverse-gold-accent font-semibold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-mindverse-gold-subtle" />
                      Fontes Primárias Recuperadas ({msg.citations.length})
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
                            ({Math.round(cit.similarityScore * 100)}% sim.)
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
        <div ref={messagesEndRef} />
      </div>

      {/* Citation Detail Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-mindverse-deep border border-mindverse-gold-subtle/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-mindverse-graphite pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-mindverse-gold-subtle" />
                <h4 className="font-serif font-bold text-sm text-mindverse-softwhite">
                  Fonte Primária Rastreável (RAG pgvector)
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
                Obra Canónica: {selectedCitation.workTitle}
              </span>
              <span className="text-mindverse-muted block">
                Localização: {selectedCitation.section}
              </span>
              <div className="p-3.5 rounded-xl bg-mindverse-midnight border border-mindverse-graphite italic text-mindverse-softwhite leading-relaxed">
                "{selectedCitation.quoteSnippet}"
              </div>
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-mindverse-muted">
                <span>Similaridade Cosseno: {(selectedCitation.similarityScore * 100).toFixed(1)}%</span>
                <span className="text-mindverse-cyan-glow">OpenAI 1536d</span>
              </div>
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
            disabled={isProcessing}
            placeholder={`Indague a ${selectedPersonality.name} sobre o seu corpus...`}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-mindverse-softwhite placeholder-mindverse-muted outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isProcessing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle disabled:opacity-40 disabled:cursor-not-allowed text-mindverse-void font-semibold text-xs transition-all shadow-gold-glow flex items-center gap-1.5"
          >
            <span>{t('chat.send')}</span>
            <Send className="w-3 h-3" />
          </button>
        </div>

        <div className="pt-2 px-1 flex items-center justify-between text-[10px] font-mono text-mindverse-muted">
          <span>Enter para enviar • Shift + Enter para nova linha</span>
          <span className="text-mindverse-gold-accent flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Fase 2: Motor RAG Histórico Ativo</span>
          </span>
        </div>
      </form>
    </div>
  );
};
