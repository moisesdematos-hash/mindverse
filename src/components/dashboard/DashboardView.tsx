import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { 
  Sparkles, 
  ArrowRight, 
  Users2, 
  Flame, 
  CheckCircle2,
  Swords,
  ShieldAlert,
  History,
  Zap
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    setCurrentTab, 
    setSelectedPersonality, 
    setModalPersonality,
    setAgoraMotion 
  } = useAppStore();

  const handleLaunchChat = (personality: typeof COHORT_GENESIS_PERSONALITIES[0]) => {
    setSelectedPersonality(personality);
    setCurrentTab('chat');
  };

  const handleLaunchAgoraWithTopic = (motion: string) => {
    setAgoraMotion(motion);
    setCurrentTab('agora');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-mindverse-gold-subtle/20 bg-gradient-to-b from-mindverse-midnight/90 via-mindverse-darkblue/80 to-mindverse-deep p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mindverse-gold-subtle/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-mindverse-cyan-glow/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-light">
            <Sparkles className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
            <span>{t('dashboard.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-mindverse-softwhite tracking-tight leading-tight">
            {t('dashboard.hero_title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mindverse-gold-light via-mindverse-gold-subtle to-mindverse-gold-accent">
              {t('dashboard.hero_highlight')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-mindverse-muted font-sans leading-relaxed">
            {t('dashboard.hero_sub')}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentTab('library')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-mindverse-void font-semibold text-sm transition-all duration-300 shadow-gold-glow flex items-center gap-2 group"
            >
              <span>{t('dashboard.explore_library')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('agora')}
              className="px-6 py-3.5 rounded-xl bg-mindverse-midnight/80 hover:bg-mindverse-graphite border border-mindverse-graphite hover:border-mindverse-gold-subtle/50 text-mindverse-softwhite font-medium text-sm transition-all duration-300 flex items-center gap-2"
            >
              <Users2 className="w-4 h-4 text-mindverse-gold-subtle" />
              <span>{t('dashboard.launch_agora')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cohort Genesis Section (11 Personalities) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold">
                Cohort Genesis Canónico
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-mindverse-gold-subtle/10 text-mindverse-gold-light border border-mindverse-gold-subtle/30">
                47 Mentes Históricas
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-mindverse-softwhite pt-1">
              {t('dashboard.cohort_title')}
            </h2>
            <p className="text-sm text-mindverse-muted">
              {t('dashboard.cohort_desc')}
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('library')}
            className="text-xs font-mono text-mindverse-gold-subtle hover:text-mindverse-gold-light transition-colors flex items-center gap-1.5"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid of the 11 Personalities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COHORT_GENESIS_PERSONALITIES.map((personality) => (
            <div
              key={personality.id}
              className="group relative rounded-2xl bg-mindverse-midnight/70 hover:bg-mindverse-midnight border border-mindverse-graphite/60 hover:border-mindverse-gold-subtle/50 p-5 transition-all duration-300 flex flex-col justify-between shadow-subtle-dark hover:shadow-gold-glow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-12 h-12 rounded-xl bg-mindverse-graphite/60 border border-mindverse-graphite flex items-center justify-center font-serif font-bold text-lg text-mindverse-gold-subtle">
                    {personality.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-mindverse-deep text-mindverse-muted border border-mindverse-graphite/60">
                    {personality.historicalEra.split('(')[0].trim()}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-mindverse-gold-light transition-colors">
                    {personality.name}
                  </h3>
                  <p className="text-xs text-mindverse-gold-accent font-medium line-clamp-1">
                    {personality.titleEpithet}
                  </p>
                </div>

                <p className="text-xs text-mindverse-muted leading-relaxed line-clamp-2 italic">
                  "{personality.quoteFeatured}"
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-mindverse-graphite/40 flex items-center justify-between">
                <button
                  onClick={() => setModalPersonality(personality)}
                  className="text-xs text-mindverse-muted hover:text-mindverse-softwhite transition-colors"
                >
                  Metadados
                </button>

                <button
                  onClick={() => handleLaunchChat(personality)}
                  className="px-3 py-1.5 rounded-lg bg-mindverse-deep hover:bg-mindverse-gold-subtle/20 border border-mindverse-graphite hover:border-mindverse-gold-subtle text-xs text-mindverse-gold-subtle font-medium transition-all"
                >
                  Conversar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inovações Dialéticas Hub */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-mindverse-gold animate-pulse" />
          <h2 className="text-xl font-serif font-bold text-mindverse-softwhite">
            Inovações Dialéticas Exclusivas
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mindverse-gold/10 text-mindverse-gold-light border border-mindverse-gold/30">
            Novos Modos de Interação
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Coliseu Dialético */}
          <div 
            onClick={() => setCurrentTab('colosseum')}
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-mindverse-midnight border border-amber-500/30 hover:border-amber-400/70 shadow-lg hover:shadow-gold-glow transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Swords className="w-6 h-6 text-mindverse-gold group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mindverse-gold/20 text-mindverse-gold-light font-bold">
                  1 vs 1
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-mindverse-gold transition-colors">
                Coliseu Dialético
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Duelos frente a frente entre 2 titãs com troca de golpes diretos e intervenção do utilizador como árbitro.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-mindverse-gold font-mono pt-2 border-t border-mindverse-graphite/40">
              <span>Abrir Arena</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Gabinete de Crise */}
          <div 
            onClick={() => setCurrentTab('war_room')}
            className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 to-mindverse-midnight border border-rose-500/30 hover:border-rose-400/70 shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <ShieldAlert className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 font-bold">
                  Decisão
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-rose-300 transition-colors">
                Gabinete de Crise
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Matriz tripla de decisão para dilemas reais: Realismo de Poder, Ética da Virtude e Inovação Ousada.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-rose-300 font-mono pt-2 border-t border-mindverse-graphite/40">
              <span>Convocar Gabinete</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: História Contrafactual */}
          <div 
            onClick={() => setCurrentTab('whatif')}
            className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/30 to-mindverse-midnight border border-sky-500/30 hover:border-sky-400/70 shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <History className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950/60 text-sky-300 font-bold">
                  E Se...?
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-sky-300 transition-colors">
                História Contrafactual
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Simula ramificações causais de encruzilhadas históricas alternativas com os grandes mestres da história.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-sky-300 font-mono pt-2 border-t border-mindverse-graphite/40">
              <span>Explorar Linha</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Síntese Trans-Séculos */}
          <div 
            onClick={() => setCurrentTab('fusion')}
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 via-mindverse-midnight to-mindverse-deep border border-amber-400/30 hover:border-amber-300/70 shadow-lg transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Sparkles className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 font-bold">
                  Co-Criação
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite group-hover:text-amber-300 transition-colors">
                Síntese Trans-Séculos
              </h3>
              <p className="text-xs text-mindverse-muted leading-relaxed">
                Funde duas mentes de séculos distantes para co-criarem uma invenção ou constituição contemporânea.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono pt-2 border-t border-mindverse-graphite/40">
              <span>Iniciar Co-Criação</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Deliberation Motions (The Agora Starters) */}
      <section className="rounded-2xl border border-mindverse-graphite bg-mindverse-midnight/40 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-mindverse-gold-subtle" />
          <h3 className="font-serif font-bold text-lg text-mindverse-softwhite">
            {t('dashboard.recent_discussions')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div 
            onClick={() => handleLaunchAgoraWithTopic('A inteligência artificial autónoma ameaça ou expande a soberania moral do ser humano?')}
            className="p-4 rounded-xl bg-mindverse-deep/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-mindverse-gold-subtle/40 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs text-mindverse-gold-accent font-mono">
              <span>Ética, Tecnologia & Teleologia</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm font-medium text-mindverse-softwhite">
              "A inteligência artificial autónoma ameaça ou expande a soberania moral do ser humano?"
            </p>
            <span className="text-xs text-mindverse-muted block">
              Participantes ideais: Aristóteles, Ada Lovelace / Leonardo da Vinci, Albert Einstein
            </span>
          </div>

          <div 
            onClick={() => handleLaunchAgoraWithTopic('A queda dos impérios decorre de fraqueza militar externa ou de desintegração moral e sectarismo interno?')}
            className="p-4 rounded-xl bg-mindverse-deep/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-mindverse-gold-subtle/40 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs text-mindverse-gold-accent font-mono">
              <span>História Antiga & Dinâmica dos Impérios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm font-medium text-mindverse-softwhite">
              "A queda dos impérios decorre de fraqueza militar externa ou de desintegração moral e sectarismo interno?"
            </p>
            <span className="text-xs text-mindverse-muted block">
              Participantes ideais: Flávio Josefo, Marco Aurélio, Sun Tzu
            </span>
          </div>
        </div>
      </section>

      {/* Architectural Guarantees Pill Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl bg-mindverse-midnight/60 border border-mindverse-graphite flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-mindverse-gold-subtle mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-mindverse-softwhite block">Fontes Históricas Primárias</span>
            <span className="text-mindverse-muted">Indexação canónica em domínio público com proveniência comprovada.</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-mindverse-midnight/60 border border-mindverse-graphite flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-mindverse-cyan-glow mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-mindverse-softwhite block">Isolamento Rigoroso de Chaves</span>
            <span className="text-mindverse-muted">Zero credenciais no frontend; todas as chamadas orquestradas no servidor.</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-mindverse-midnight/60 border border-mindverse-graphite flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-mindverse-gold-subtle mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-mindverse-softwhite block">Extensão Vectorial pgvector</span>
            <span className="text-mindverse-muted">Embeddings OpenAI (1536d) versionados e protegidos contra mismatch.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
