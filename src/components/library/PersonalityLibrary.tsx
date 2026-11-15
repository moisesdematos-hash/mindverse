import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Personality } from '../../types';
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Scroll, 
  Info,
  Calendar,
  Languages
} from 'lucide-react';

export const PersonalityLibrary: React.FC = () => {
  const { t } = useTranslation();
  const { 
    setSelectedPersonality, 
    setModalPersonality, 
    setCurrentTab 
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t('library.all_categories') },
    { id: 'physics_and_science', label: t('library.category_physics') },
    { id: 'invention_and_universal_genius', label: t('library.category_genius') },
    { id: 'electrical_engineering', label: t('library.category_engineering') },
    { id: 'classical_philosophy', label: t('library.category_philosophy') },
    { id: 'stoic_philosophy', label: t('library.category_stoic') },
    { id: 'military_strategy', label: t('library.category_strategy') },
    { id: 'political_economy', label: t('library.category_economy') },
    { id: 'management_science', label: t('library.category_management') },
    { id: 'radioactivity_and_chemistry', label: t('library.category_chemistry') },
    { id: 'ancient_history_and_judaica', label: t('library.category_history') }
  ];

  const filteredPersonalities = useMemo(() => {
    return COHORT_GENESIS_PERSONALITIES.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titleEpithet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.coreWorldview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.historicalEra.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'all' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleStartChat = (personality: Personality) => {
    setSelectedPersonality(personality);
    setCurrentTab('chat');
  };

  const formatYears = (born: number, death: number) => {
    const formatYear = (y: number) => y < 0 ? `${Math.abs(y)} a.C.` : `${y} d.C.`;
    return `${formatYear(born)} – ${formatYear(death)}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mindverse-gold-subtle/10 border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-accent">
          <BookOpen className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <span>Cohort Genesis • 11 Mentes Canónicas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-mindverse-softwhite">
          {t('library.title')}
        </h1>
        <p className="text-sm sm:text-base text-mindverse-muted max-w-3xl">
          {t('library.subtitle')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mindverse-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('library.search_placeholder')}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite focus:border-mindverse-gold-subtle focus:ring-1 focus:ring-mindverse-gold-subtle text-sm text-mindverse-softwhite placeholder-mindverse-muted outline-none transition-all shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border
                  ${isSelected
                    ? 'bg-mindverse-gold-subtle text-mindverse-void border-mindverse-gold-subtle font-semibold shadow-gold-glow'
                    : 'bg-mindverse-midnight text-mindverse-muted border-mindverse-graphite hover:text-mindverse-softwhite hover:border-mindverse-graphite/80'
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Personalities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonalities.map((personality) => (
          <div
            key={personality.id}
            className="rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite/70 hover:border-mindverse-gold-subtle/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-subtle-dark hover:shadow-gold-glow group"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-mindverse-graphite border border-mindverse-gold-subtle/20 flex items-center justify-center font-serif font-bold text-lg text-mindverse-gold-subtle shadow-inner">
                    {personality.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-mindverse-softwhite group-hover:text-mindverse-gold-light transition-colors">
                      {personality.name}
                    </h3>
                    <p className="text-xs text-mindverse-gold-accent font-medium">
                      {personality.titleEpithet}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chronology & Metadata tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-mindverse-muted">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite">
                  <Calendar className="w-3 h-3 text-mindverse-gold-dim" />
                  {formatYears(personality.bornYear, personality.deathYear)}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite">
                  <Languages className="w-3 h-3 text-mindverse-gold-dim" />
                  {personality.nativeLanguage.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-mindverse-deep border border-mindverse-graphite">
                  <Scroll className="w-3 h-3 text-mindverse-cyan-glow" />
                  {personality.works.length} {t('library.verified_works')}
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-mindverse-muted leading-relaxed line-clamp-3">
                {personality.shortBio}
              </p>

              {/* Featured Quote */}
              <div className="p-3 rounded-xl bg-mindverse-deep/80 border border-mindverse-graphite/50 italic text-xs text-mindverse-softwhite/90">
                "{personality.quoteFeatured}"
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 mt-4 border-t border-mindverse-graphite/50 flex items-center gap-2">
              <button
                onClick={() => setModalPersonality(personality)}
                className="flex-1 py-2 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-graphite hover:border-mindverse-gold-subtle/30 text-xs font-medium text-mindverse-softwhite transition-all flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
                <span>{t('library.view_profile')}</span>
              </button>

              <button
                onClick={() => handleStartChat(personality)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-xs font-semibold text-mindverse-void transition-all shadow-gold-glow flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('library.start_dialogue')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
