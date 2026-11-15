import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { 
  X, 
  MessageSquare, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  ShieldAlert, 
  Calendar, 
  Languages, 
  CheckCircle2
} from 'lucide-react';

export const PersonalityDetailModal: React.FC = () => {
  const { t } = useTranslation();
  const { 
    modalPersonality, 
    setModalPersonality, 
    setSelectedPersonality, 
    setCurrentTab 
  } = useAppStore();

  if (!modalPersonality) return null;

  const handleStartChat = () => {
    setSelectedPersonality(modalPersonality);
    setModalPersonality(null);
    setCurrentTab('chat');
  };

  const formatYears = (born: number, death: number) => {
    const formatYear = (y: number) => y < 0 ? `${Math.abs(y)} a.C.` : `${y} d.C.`;
    return `${formatYear(born)} – ${formatYear(death)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-mindverse-deep border border-mindverse-gold-subtle/30 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-mindverse-midnight via-mindverse-darkblue to-mindverse-deep border-b border-mindverse-graphite shrink-0">
          <button
            onClick={() => setModalPersonality(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-mindverse-deep/70 hover:bg-mindverse-graphite text-mindverse-muted hover:text-mindverse-softwhite border border-mindverse-graphite transition-all"
            aria-label={t('modal.close')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-mindverse-graphite border border-mindverse-gold-subtle/40 flex items-center justify-center font-serif font-bold text-2xl text-mindverse-gold-subtle shadow-gold-glow shrink-0">
              {modalPersonality.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent font-semibold">
                  DNA Intelectual
                </span>
                <span className="text-xs font-mono text-mindverse-muted px-2 py-0.5 rounded bg-mindverse-midnight border border-mindverse-graphite">
                  {modalPersonality.historicalEra}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-mindverse-softwhite">
                {modalPersonality.name}
              </h2>
              <p className="text-sm text-mindverse-gold-light font-medium">
                {modalPersonality.titleEpithet}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-mono text-mindverse-muted">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-mindverse-deep border border-mindverse-graphite">
              <Calendar className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {formatYears(modalPersonality.bornYear, modalPersonality.deathYear)}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-mindverse-deep border border-mindverse-graphite">
              <Languages className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              Idioma Original: {modalPersonality.nativeLanguage.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-mindverse-deep border border-mindverse-graphite">
              <BookOpen className="w-3.5 h-3.5 text-mindverse-cyan-glow" />
              {modalPersonality.works.length} Obras Canónicas
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 scrollbar-thin">
          {/* Biography */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent flex items-center gap-2 font-semibold">
              <Compass className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {t('modal.biography')}
            </h3>
            <p className="text-sm text-mindverse-muted leading-relaxed">
              {modalPersonality.shortBio}
            </p>
          </section>

          {/* Core Worldview */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent flex items-center gap-2 font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {t('modal.worldview')}
            </h3>
            <div className="p-4 rounded-2xl bg-mindverse-midnight/60 border border-mindverse-graphite text-sm text-mindverse-softwhite leading-relaxed">
              {modalPersonality.coreWorldview}
            </div>
          </section>

          {/* Reasoning Axioms */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {t('modal.axioms')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {modalPersonality.axioms.map((axiom, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-xl bg-mindverse-midnight/40 border border-mindverse-graphite/60 flex items-start gap-2.5 text-xs text-mindverse-softwhite/90"
                >
                  <span className="font-mono text-mindverse-gold-subtle font-bold text-xs mt-0.5">
                    0{index + 1}.
                  </span>
                  <span className="leading-relaxed">{axiom}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Canonical Works */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-accent flex items-center gap-2 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
              {t('modal.canonical_works')}
            </h3>
            <div className="space-y-3">
              {modalPersonality.works.map((work) => (
                <div
                  key={work.id}
                  className="p-4 rounded-xl bg-mindverse-midnight/40 border border-mindverse-graphite space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-medium text-sm text-mindverse-softwhite">
                      {work.title}
                    </h4>
                    <span className="text-[11px] font-mono text-mindverse-muted">
                      {work.year < 0 ? `${Math.abs(work.year)} a.C.` : `${work.year} d.C.`}
                    </span>
                  </div>
                  <p className="text-xs text-mindverse-muted">
                    {work.description}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-mindverse-muted border-t border-mindverse-graphite/40">
                    <span className="px-2 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite">
                      Proveniência: {work.provenance}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite text-mindverse-cyan-glow">
                      Domínio Público
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Historiographical Limitations & Biases */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 flex items-center gap-2 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              {t('modal.historiography')}
            </h3>
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed space-y-2">
              <p>{modalPersonality.historicalContextNotes}</p>
            </div>
          </section>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-mindverse-midnight/90 border-t border-mindverse-graphite shrink-0 flex items-center justify-between gap-4">
          <button
            onClick={() => setModalPersonality(null)}
            className="px-5 py-2.5 rounded-xl border border-mindverse-graphite hover:bg-mindverse-graphite text-xs font-medium text-mindverse-muted hover:text-mindverse-softwhite transition-all"
          >
            {t('modal.close')}
          </button>

          <button
            onClick={handleStartChat}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-xs font-semibold text-mindverse-void transition-all shadow-gold-glow flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('modal.start_chat_with')} {modalPersonality.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
