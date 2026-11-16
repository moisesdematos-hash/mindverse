import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Personality } from '../../types';
import { MindverseSpecialLogo } from '../brand/MindverseSpecialLogo';
import { DocumentationSection } from '../documentation/DocumentationSection';
import { LegalModal } from '../legal/LegalModals';
import { councilAudio } from '../../services/councilAudio';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Swords, 
  ShieldAlert, 
  History, 
  Zap, 
  Cpu, 
  Volume2, 
  Users2, 
  Scale, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ExternalLink,
  Globe
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const { setCurrentTab, setSelectedPersonality } = useAppStore();

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchThinker, setSearchThinker] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'ethics' | null>(null);
  const [previewSpeakingId, setPreviewSpeakingId] = useState<string | null>(null);

  // Categories
  const categories = [
    { id: 'all', label: 'Todas as 47 Mentes' },
    { id: 'philosophy', label: 'Filosofia & Moral' },
    { id: 'science', label: 'Prémios Nobel & Física' },
    { id: 'leadership', label: 'Estadistas & Presidentes' },
    { id: 'inventors', label: 'Inventores & Computação' },
    { id: 'history', label: 'Historiadores Clássicos' },
  ];

  // Filter personalities
  const filteredPersonalities = COHORT_GENESIS_PERSONALITIES.filter((p) => {
    const matchesCategory = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'philosophy' ? ['classical_philosophy', 'stoic_philosophy', 'military_strategy', 'political_philosophy', 'existential_philosophy'].includes(p.category) :
      selectedCategory === 'science' ? ['physics_and_science', 'radioactivity_and_chemistry', 'medicine_and_life_sciences'].includes(p.category) :
      selectedCategory === 'leadership' ? ['presidential_leadership', 'statecraft_and_parliament', 'political_economy', 'management_science'].includes(p.category) :
      selectedCategory === 'inventors' ? ['invention_and_universal_genius', 'electrical_engineering', 'classical_computing', 'industrial_invention'].includes(p.category) :
      selectedCategory === 'history' ? ['classical_historiography', 'ancient_history_and_judaica'].includes(p.category) : true;

    const matchesSearch = 
      p.name.toLowerCase().includes(searchThinker.toLowerCase()) ||
      p.titleEpithet.toLowerCase().includes(searchThinker.toLowerCase()) ||
      p.coreWorldview.toLowerCase().includes(searchThinker.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleStartDialogue = (p: Personality) => {
    setSelectedPersonality(p);
    setCurrentTab('chat');
  };

  const handlePlayVoicePreview = (p: Personality) => {
    if (previewSpeakingId === p.id) {
      councilAudio.stop();
      setPreviewSpeakingId(null);
    } else {
      setPreviewSpeakingId(p.id);
      councilAudio.speak(p.id, p.quoteFeatured);
      setTimeout(() => setPreviewSpeakingId(null), 6000);
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const faqs = [
    {
      q: 'O que distingue o MINDVERSE de um assistente de IA convencional como o ChatGPT ou Claude?',
      a: 'Os assistentes genéricos respondem com uma voz sintética indistinta e frequentemente inventam citações para agradar ao utilizador. O MINDVERSE opera sob uma arquitetura de RAG histórico estrito com pgvector ancorada exclusivamente em textos canónicos de domínio público (como o Corpus Aristotelicum, os Principia de Newton ou as Cartas de Séneca), catalogando toda a inferência através de um padrão epistémico triplo que proíbe terminantemente a alucinação factual.'
    },
    {
      q: 'Como é garantido que uma personagem nunca responde por outra?',
      a: 'Implementámos blindagem determinística de identidade ao nível do assembler de prompts e do motor de inferência. Mesmo que desafie uma mente com teses rivais — por exemplo, perguntando a Aristóteles o que pensa sobre Albert Einstein —, o sistema valida que a resposta seja emitida unicamente sob a voz e ontologia de Aristóteles, mantendo a coerência canónica inviolável.'
    },
    {
      q: 'Como pode uma mente antiga como Aristóteles responder sobre Inteligência Artificial ou Crises Modernas?',
      a: 'Através do nível epistémico [SIMULAÇÃO HIPOTÉTICA]. A persona reconhece a sua limitação histórica cronológica e, em seguida, projeta a sua matriz axiológica e o seu método dialético comprovado sobre os axiomas contemporâneos fornecidos pelo utilizador, oferecendo uma perspetiva teleológica e ética intemporal.'
    },
    {
      q: 'O que é o Conselho das Mentes (Ágora)?',
      a: 'É um ambiente multiagente onde o utilizador convoca até cinco pensadores de séculos diferentes em torno de uma mesa redonda. O motor executa três rondas dialéticas (Teses Iniciais, Réplicas Cruzadas com refutações mútuas e Síntese Executiva Coletiva com Decreto de Ação), permitindo que o utilizador intervenha ao vivo a qualquer instante.'
    },
    {
      q: 'Quais são as 4 Inovações Dialéticas Exclusivas da plataforma?',
      a: '1) Coliseu Dialético (Duelo 1 vs 1 com intervenção do utilizador como árbitro); 2) Gabinete de Crise do Líder (Análise tripla de poder, virtude e inovação com plano de ação executivo); 3) Simulador de História Contrafactual («E Se...?») em 3 horizontes temporais; e 4) Síntese Trans-Séculos (Co-criação conceitual entre génios de épocas distintas).'
    },
    {
      q: 'Os meus dados e deliberações estratégicas são mantidos em confidencialidade?',
      a: 'Sim, sob garantia inegociável. O MINDVERSE cumpre integralmente o RGPD (União Europeia) e a LGPD (Brasil). Todas as deliberações são cifradas com AES-256 e TLS 1.3 com Row-Level Security no Supabase. Os seus dados jamais são vendidos, partilhados ou utilizados para treinar modelos fundacionais de IA.'
    },
    {
      q: 'Como funciona a síntese vocal e áudio de cada pensador?',
      a: 'Desenvolvemos um motor sonoro calibrado via Web Audio API e síntese de formantes que ajusta o tom, a velocidade, a cadência retórica e a reverberação de cada pensador — desde a solenidade imperial de Marco Aurélio e a energia vibrante de Feynman até ao timbre analítico de Ada Lovelace.'
    },
    {
      q: 'Quantas personalidades históricas estão ativas atualmente?',
      a: 'O ecossistema conta atualmente com 47 Grandes Mentes Canónicas, cobrindo Filósofos Clássicos, Prémios Nobel da Ciência (Física e Química), Presidentes Históricos, Primeiros-Ministros, Inventores Pioneiros e Historiadores da Humanidade.'
    }
  ];

  return (
    <div className="min-h-screen bg-mindverse-void text-mindverse-softwhite font-sans selection:bg-mindverse-gold-subtle/30 selection:text-mindverse-gold-light antialiased">
      {/* 1. LUXURY STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-mindverse-void/85 backdrop-blur-xl border-b border-mindverse-graphite/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group"
          >
            <MindverseSpecialLogo size="md" showWordmark={true} />
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-mindverse-muted">
            <a href="#panteao" className="hover:text-mindverse-gold-light transition-colors">47 Mentes</a>
            <a href="#inovacoes" className="hover:text-mindverse-gold-light transition-colors">Inovações Dialéticas</a>
            <a href="#arquitetura" className="hover:text-mindverse-gold-light transition-colors">Arquitetura RAG</a>
            <a href="#documentacao" className="hover:text-mindverse-gold-light transition-colors">Documentação</a>
            <a href="#faq" className="hover:text-mindverse-gold-light transition-colors">FAQ</a>
            <a href="#privacidade" className="hover:text-mindverse-gold-light transition-colors">Segurança</a>
          </nav>

          {/* Actions & Language Selector */}
          <div className="flex items-center gap-3">
            {/* Lang dropdown */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-xl bg-mindverse-midnight border border-mindverse-graphite text-xs font-mono text-mindverse-muted">
              <Globe className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {['pt', 'en', 'es', 'fr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-1.5 py-0.5 rounded uppercase font-semibold transition-colors ${
                    i18n.language.startsWith(lang) 
                      ? 'text-mindverse-gold-light bg-mindverse-deep' 
                      : 'hover:text-mindverse-softwhite'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Launch App CTA Button */}
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle via-mindverse-gold-light to-mindverse-gold-accent hover:shadow-gold-glow text-mindverse-void font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 group shadow-lg"
            >
              <span>Entrar na Plataforma</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Halo & Radial Rays */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-mindverse-gold-subtle/15 via-mindverse-cyan-glow/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-mindverse-gold-subtle/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-mindverse-midnight/90 border border-mindverse-gold-subtle/30 shadow-gold-glow animate-fade-in">
            <Sparkles className="w-4 h-4 text-mindverse-gold-subtle animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-light font-semibold">
              O Panteão Vivo da Consciência Humana • 47 Mentes Canónicas
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-mindverse-softwhite leading-[1.1]">
            Não converse com uma IA genérica.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mindverse-gold-light via-mindverse-gold-subtle to-mindverse-gold-accent">
              Delibere com quem forjou a história.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-mindverse-muted max-w-3xl mx-auto font-sans leading-relaxed">
            A primeira plataforma de inteligência dialética do mundo que ressuscita o rigor epistemológico de <strong>47 grandes génios</strong> — de Albert Einstein e Newton a Marie Curie e Mandela — alimentada por <strong>RAG vetorial em fontes primárias</strong> e zero tolerância à alucinação.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const einstein = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'albert-einstein') || COHORT_GENESIS_PERSONALITIES[0];
                setSelectedPersonality(einstein);
                setCurrentTab('chat');
              }}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-mindverse-void font-bold text-sm sm:text-base transition-all duration-300 shadow-gold-glow flex items-center gap-2.5 group"
            >
              <span>Iniciar Diálogo com Albert Einstein</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('colosseum')}
              className="px-7 py-4 rounded-2xl bg-mindverse-midnight/90 hover:bg-mindverse-graphite border border-mindverse-gold-subtle/40 hover:border-mindverse-gold-subtle text-mindverse-softwhite font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5"
            >
              <Swords className="w-5 h-5 text-mindverse-gold-subtle" />
              <span>Entrar no Coliseu Dialético</span>
            </button>
          </div>

          {/* Trust Metrics Ribbon */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite/70 text-center space-y-1">
              <span className="font-serif font-black text-2xl sm:text-3xl text-mindverse-gold-light">47</span>
              <p className="text-[11px] font-mono uppercase text-mindverse-muted">Mentes Canónicas</p>
            </div>
            <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite/70 text-center space-y-1">
              <span className="font-serif font-black text-2xl sm:text-3xl text-emerald-400">100%</span>
              <p className="text-[11px] font-mono uppercase text-mindverse-muted">Fontes Primárias</p>
            </div>
            <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite/70 text-center space-y-1">
              <span className="font-serif font-black text-2xl sm:text-3xl text-mindverse-cyan-glow">1536d</span>
              <p className="text-[11px] font-mono uppercase text-mindverse-muted">Vetores pgvector</p>
            </div>
            <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite/70 text-center space-y-1">
              <span className="font-serif font-black text-2xl sm:text-3xl text-amber-300">0</span>
              <p className="text-[11px] font-mono uppercase text-mindverse-muted">Alucinações Factuais</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE INTERATIVO DAS 4 GRANDES INOVAÇÕES DIALÉTICAS */}
      <section id="inovacoes" className="py-20 px-4 sm:px-6 bg-mindverse-deep/60 border-t border-b border-mindverse-graphite/50 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
              <Zap className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Além dos Assistentes Convencionais</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mindverse-softwhite">
              Quatro Inovações Dialéticas Sem Precedentes
            </h2>
            <p className="text-sm sm:text-base text-mindverse-muted max-w-2xl mx-auto">
              Projetadas para transformar dilemas estratégicos complexos em decisões de alta clareza executiva e filosófica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Inovação 1 */}
            <div 
              onClick={() => setCurrentTab('colosseum')}
              className="p-6 rounded-3xl bg-mindverse-midnight/80 border border-mindverse-graphite hover:border-mindverse-gold-subtle/50 transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between cursor-pointer group space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mindverse-deep border border-mindverse-gold-subtle/40 flex items-center justify-center text-mindverse-gold-subtle group-hover:scale-110 transition-transform">
                  <Swords className="w-6 h-6 text-mindverse-gold" />
                </div>
                <h3 className="font-serif font-bold text-lg text-mindverse-softwhite group-hover:text-mindverse-gold-light transition-colors">
                  1. Coliseu Dialético (1 vs 1)
                </h3>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Coloque dois titãs históricos frente a frente em rounds sucessivos (ex.: Tesla vs. Edison ou Platão vs. Maquiavel). Intervenha ao vivo como Árbitro da Razão.
                </p>
              </div>
              <div className="pt-3 border-t border-mindverse-graphite/60 flex items-center justify-between text-xs font-mono text-mindverse-gold-accent">
                <span>Entrar na Arena</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Inovação 2 */}
            <div 
              onClick={() => setCurrentTab('war_room')}
              className="p-6 rounded-3xl bg-mindverse-midnight/80 border border-mindverse-graphite hover:border-rose-400/50 transition-all duration-300 hover:shadow-subtle-dark flex flex-col justify-between cursor-pointer group space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mindverse-deep border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-mindverse-softwhite group-hover:text-rose-300 transition-colors">
                  2. Gabinete de Crise do Líder
                </h3>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Submeta uma decisão crítica a uma mesa tripla: Realismo de Poder (Bismarck), Deontologia Moral (Séneca) e Audácia Estratégica (Churchill), gerando um Decreto Executivo de 4 passos.
                </p>
              </div>
              <div className="pt-3 border-t border-mindverse-graphite/60 flex items-center justify-between text-xs font-mono text-rose-300">
                <span>Convocar Gabinete</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Inovação 3 */}
            <div 
              onClick={() => setCurrentTab('whatif')}
              className="p-6 rounded-3xl bg-mindverse-midnight/80 border border-mindverse-graphite hover:border-sky-400/50 transition-all duration-300 hover:shadow-subtle-dark flex flex-col justify-between cursor-pointer group space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mindverse-deep border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-mindverse-softwhite group-hover:text-sky-300 transition-colors">
                  3. História Contrafactual («E Se...?»)
                </h3>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Simule as ramificações causais caso a Biblioteca de Alexandria não tivesse ardido ou Alexandre vivesse mais 30 anos, narrado com a metodologia crítica de Heródoto e Tucídides.
                </p>
              </div>
              <div className="pt-3 border-t border-mindverse-graphite/60 flex items-center justify-between text-xs font-mono text-sky-300">
                <span>Explorar Linhas Temporais</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Inovação 4 */}
            <div 
              onClick={() => setCurrentTab('fusion')}
              className="p-6 rounded-3xl bg-mindverse-midnight/80 border border-mindverse-graphite hover:border-amber-400/50 transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between cursor-pointer group space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mindverse-deep border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-mindverse-softwhite group-hover:text-amber-200 transition-colors">
                  4. Síntese Trans-Séculos
                </h3>
                <p className="text-xs text-mindverse-muted leading-relaxed">
                  Co-criação intelectual entre mentes improváveis (Ada Lovelace + Aristóteles formulando computação teleológica ou Santos-Dumont + Tesla criando energia limpa aérea).
                </p>
              </div>
              <div className="pt-3 border-t border-mindverse-graphite/60 flex items-center justify-between text-xs font-mono text-amber-300">
                <span>Iniciar Co-Criação</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. O PANTEÃO DAS 47 MENTES (CATÁLOGO DINÂMICO) */}
      <section id="panteao" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mindverse-graphite/60 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
              <Users2 className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>O Panteão Completo</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mindverse-softwhite">
              47 Mentes Que Transformaram a Civilização
            </h2>
            <p className="text-sm text-mindverse-muted max-w-2xl">
              Cada mente é rigorosamente modelada com base em fontes primárias verificáveis, axiomas e voz própria calibrada.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mindverse-muted" />
            <input
              type="text"
              value={searchThinker}
              onChange={(e) => setSearchThinker(e.target.value)}
              placeholder="Pesquisar por nome ou conceito..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite focus:border-mindverse-gold-subtle text-xs text-mindverse-softwhite placeholder-mindverse-muted outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-mindverse-gold-subtle text-mindverse-void font-bold shadow-gold-glow'
                  : 'bg-mindverse-midnight/70 text-mindverse-muted hover:text-mindverse-softwhite border border-mindverse-graphite/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Personality Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPersonalities.slice(0, 12).map((p) => {
            const isSpeaking = previewSpeakingId === p.id;
            return (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-mindverse-midnight/70 border border-mindverse-graphite/70 hover:border-mindverse-gold-subtle/50 transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Avatar & Audio Preview Button */}
                  <div className="flex items-center justify-between">
                    <img 
                      src={p.avatarUrl} 
                      alt={p.name} 
                      className="w-14 h-14 rounded-2xl object-cover border border-mindverse-gold-subtle/30 group-hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => handlePlayVoicePreview(p)}
                      title="Ouvir voz canónica"
                      className={`p-2 rounded-xl border transition-all ${
                        isSpeaking 
                          ? 'bg-mindverse-gold-subtle text-mindverse-void border-mindverse-gold-light animate-pulse' 
                          : 'bg-mindverse-deep/70 border-mindverse-graphite text-mindverse-gold-subtle hover:bg-mindverse-graphite'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-mindverse-gold-light transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-[11px] font-mono text-mindverse-gold-accent">
                      {p.titleEpithet}
                    </span>
                  </div>

                  <p className="text-xs text-mindverse-muted line-clamp-3 leading-relaxed italic">
                    "{p.quoteFeatured}"
                  </p>
                </div>

                <div className="pt-3 border-t border-mindverse-graphite/50 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-mindverse-muted">
                    {p.bornYear < 0 ? `${Math.abs(p.bornYear)} a.C.` : p.bornYear} – {p.deathYear < 0 ? `${Math.abs(p.deathYear)} a.C.` : p.deathYear}
                  </span>
                  <button
                    onClick={() => handleStartDialogue(p)}
                    className="px-3 py-1.5 rounded-lg bg-mindverse-deep hover:bg-mindverse-gold-subtle hover:text-mindverse-void border border-mindverse-graphite text-xs font-semibold text-mindverse-softwhite transition-all flex items-center gap-1"
                  >
                    <span>Dialogar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPersonalities.length > 12 && (
          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentTab('library')}
              className="px-6 py-3 rounded-2xl bg-mindverse-midnight border border-mindverse-gold-subtle/40 hover:border-mindverse-gold-subtle text-mindverse-gold-light text-xs font-mono font-semibold transition-all shadow-gold-glow"
            >
              Ver Todas as 47 Mentes na Biblioteca Interativa →
            </button>
          </div>
        )}
      </section>

      {/* 5. ARQUITETURA TÉCNICA E PROTOCOLO EPISTÉMICO */}
      <section id="arquitetura" className="py-20 px-4 sm:px-6 bg-mindverse-deep/70 border-t border-b border-mindverse-graphite/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
              <Cpu className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Engenharia de Alta Fidelidade</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mindverse-softwhite">
              Arquitetura Imune à Alucinação
            </h2>
            <p className="text-sm sm:text-base text-mindverse-muted max-w-2xl mx-auto">
              Construído sobre quatro pilares intransponíveis de segurança epistemológica, rigor historiográfico e desempenho computacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-gold-subtle/30 flex items-center justify-center text-mindverse-gold-subtle font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                RAG com pgvector (1536d)
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Vetorização densa com chunking semântico respeitando parágrafos canónicos originais e pesquisa rápida HNSW em menos de 15ms.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                Blindagem de Identidade
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Regras invioláveis de orquestração que garantem que nenhuma persona fale na primeira pessoa em nome de terceiros ou se desvie da sua mundivisão.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-mindverse-cyan-glow/30 flex items-center justify-center text-mindverse-cyan-glow font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                Triplo Status Epistémico
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Marcação explícita no protocolo entre [Facto Documentado], [Interpretação Fundamentada] e [Simulação Hipotética].
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mindverse-deep border border-amber-300/30 flex items-center justify-center text-amber-300 font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                Acústica Canónica Viva
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Modelação de formantes e cadência oratória individualizada para cada pensador através da Web Audio API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOCUMENTAÇÃO TÉCNICA INTERATIVA & SDK */}
      <section id="documentacao" className="py-20 px-4 sm:px-6">
        <DocumentationSection />
      </section>

      {/* 7. FAQ — PERGUNTAS FREQUENTES */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-mindverse-deep/60 border-t border-b border-mindverse-graphite/50">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
              <BookOpen className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Respostas Transparentes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mindverse-softwhite">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-sm text-mindverse-muted">
              Tudo o que precisa de saber sobre metodologia, tecnologia e segurança no MINDVERSE.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-mindverse-midnight/80 border border-mindverse-graphite/70 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-mindverse-midnight transition-colors"
                  >
                    <span className="font-serif font-semibold text-sm sm:text-base text-mindverse-softwhite">
                      {faq.q}
                    </span>
                    <span className="p-1.5 rounded-lg bg-mindverse-deep text-mindverse-gold-subtle shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-mindverse-muted leading-relaxed border-t border-mindverse-graphite/40 bg-mindverse-deep/40 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SOBERANIA DE DADOS, SEGURANÇA & POLÍTICAS */}
      <section id="privacidade" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-mindverse-midnight via-mindverse-deep to-mindverse-midnight border border-mindverse-gold-subtle/30 shadow-gold-glow space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
              <Lock className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              <span>Soberania Cognitiva Inegociável</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mindverse-softwhite">
              A sua Privacidade e Decisões Permanecem Exclusivamente Suas
            </h2>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              O MINDVERSE foi edificado sobre a convicção de que deliberações intelectuais profundas exigem um santuário impenetrável. Os seus dados jamais são monetizados nem usados para treino de modelos de terceiros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setLegalModalType('privacy')}
              className="p-5 rounded-2xl bg-mindverse-deep/80 hover:bg-mindverse-deep border border-mindverse-graphite hover:border-mindverse-gold-subtle/50 text-left space-y-2 transition-all group"
            >
              <div className="flex items-center justify-between text-mindverse-gold-subtle">
                <ShieldCheck className="w-5 h-5" />
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-sm font-bold text-mindverse-softwhite font-serif">
                Política de Privacidade
              </h4>
              <p className="text-xs text-mindverse-muted">
                Conformidade com o RGPD (UE), LGPD e encriptação AES-256 de ponta a ponta.
              </p>
            </button>

            <button
              onClick={() => setLegalModalType('terms')}
              className="p-5 rounded-2xl bg-mindverse-deep/80 hover:bg-mindverse-deep border border-mindverse-graphite hover:border-mindverse-gold-subtle/50 text-left space-y-2 transition-all group"
            >
              <div className="flex items-center justify-between text-mindverse-gold-subtle">
                <Lock className="w-5 h-5" />
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-sm font-bold text-mindverse-softwhite font-serif">
                Termos de Serviço
              </h4>
              <p className="text-xs text-mindverse-muted">
                Governança da plataforma, quotas de uso e propriedade intelectual do utilizador.
              </p>
            </button>

            <button
              onClick={() => setLegalModalType('ethics')}
              className="p-5 rounded-2xl bg-mindverse-deep/80 hover:bg-mindverse-deep border border-mindverse-graphite hover:border-mindverse-gold-subtle/50 text-left space-y-2 transition-all group"
            >
              <div className="flex items-center justify-between text-mindverse-gold-subtle">
                <Scale className="w-5 h-5" />
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-sm font-bold text-mindverse-softwhite font-serif">
                Carta Ética de Preservação
              </h4>
              <p className="text-xs text-mindverse-muted">
                Compromisso estrito contra revisionismo anacrónico e difamação histórica.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* 9. MASTER FOOTER */}
      <footer className="py-16 px-4 sm:px-6 bg-mindverse-void border-t border-mindverse-graphite/70 text-xs text-mindverse-muted">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Col 1: Brand & Crest */}
            <div className="md:col-span-2 space-y-4">
              <MindverseSpecialLogo size="md" showWordmark={true} />
              <p className="text-xs text-mindverse-muted leading-relaxed max-w-sm">
                A sabedoria imortal da humanidade orquestrada com inteligência artificial para elevar o raciocínio, a estratégia e a liderança contemporânea.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Todos os Sistemas Operacionais • Uptime 99.99%</span>
              </div>
            </div>

            {/* Col 2: Plataforma */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-mindverse-softwhite uppercase tracking-wider">
                Plataforma
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentTab('dashboard')} className="hover:text-mindverse-gold-light transition-colors">Visão Geral</button></li>
                <li><button onClick={() => setCurrentTab('library')} className="hover:text-mindverse-gold-light transition-colors">47 Mentes Canónicas</button></li>
                <li><button onClick={() => setCurrentTab('chat')} className="hover:text-mindverse-gold-light transition-colors">Diálogo Socrático</button></li>
                <li><button onClick={() => setCurrentTab('agora')} className="hover:text-mindverse-gold-light transition-colors">Conselho das Mentes</button></li>
              </ul>
            </div>

            {/* Col 3: Inovações */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-mindverse-softwhite uppercase tracking-wider">
                Inovações
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentTab('colosseum')} className="hover:text-mindverse-gold-light transition-colors">Coliseu Dialético</button></li>
                <li><button onClick={() => setCurrentTab('war_room')} className="hover:text-mindverse-gold-light transition-colors">Gabinete de Crise</button></li>
                <li><button onClick={() => setCurrentTab('whatif')} className="hover:text-mindverse-gold-light transition-colors">História Contrafactual</button></li>
                <li><button onClick={() => setCurrentTab('fusion')} className="hover:text-mindverse-gold-light transition-colors">Síntese Trans-Séculos</button></li>
              </ul>
            </div>

            {/* Col 4: Governança & Legal */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-mindverse-softwhite uppercase tracking-wider">
                Legal & Ética
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => setLegalModalType('privacy')} className="hover:text-mindverse-gold-light transition-colors">Privacidade (RGPD/LGPD)</button></li>
                <li><button onClick={() => setLegalModalType('terms')} className="hover:text-mindverse-gold-light transition-colors">Termos de Serviço</button></li>
                <li><button onClick={() => setLegalModalType('ethics')} className="hover:text-mindverse-gold-light transition-colors">Carta Ética Canónica</button></li>
                <li><button onClick={() => setCurrentTab('about')} className="hover:text-mindverse-gold-light transition-colors">Arquitetura de Missão</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-mindverse-graphite/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-mindverse-muted">
            <p>© 2026 MINDVERSE Technologies Inc. Todos os direitos reservados.</p>
            <p>Construído com Supabase pgvector • OpenAI Embeddings • Vite & React</p>
          </div>
        </div>
      </footer>

      {/* LEGAL MODALS POPUP */}
      {legalModalType && (
        <LegalModal
          isOpen={true}
          onClose={() => setLegalModalType(null)}
          type={legalModalType}
        />
      )}
    </div>
  );
};
