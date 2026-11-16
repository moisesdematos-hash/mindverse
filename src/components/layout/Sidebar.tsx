import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { NavigationTab } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Users2, 
  ShieldAlert,
  Sparkles,
  Info,
  Swords,
  History,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { t } = useTranslation();
  const { currentTab, setCurrentTab, userProfile } = useAppStore();

  const mainNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'library',
      label: t('nav.library'),
      icon: <BookOpen className="w-4 h-4" />,
      badge: '47'
    },
    {
      id: 'chat',
      label: t('nav.chat'),
      icon: <MessageSquare className="w-4 h-4" />,
      badge: '1:1'
    },
    {
      id: 'agora',
      label: t('nav.agora'),
      icon: <Users2 className="w-4 h-4" />,
      badge: 'Conselho'
    }
  ];

  const innovationItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'colosseum',
      label: 'Coliseu Dialético',
      icon: <Swords className="w-4 h-4 text-mindverse-gold" />,
      badge: '1 vs 1'
    },
    {
      id: 'war_room',
      label: 'Gabinete de Crise',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      badge: 'Decisão'
    },
    {
      id: 'whatif',
      label: 'História Contrafactual',
      icon: <History className="w-4 h-4 text-sky-400" />,
      badge: 'E Se...?'
    },
    {
      id: 'fusion',
      label: 'Síntese Trans-Séculos',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      badge: 'Fusão'
    }
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-16 z-40 lg:z-20
        h-screen lg:h-[calc(100vh-4rem)]
        w-64 bg-mindverse-deep/95 lg:bg-mindverse-deep/60 backdrop-blur-lg
        border-r border-mindverse-graphite/60
        flex flex-col justify-between p-4
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Rail */}
        <div className="space-y-5 overflow-y-auto pr-1 scrollbar-thin">
          <div className="px-3 pt-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-mindverse-muted font-semibold">
              Navegação Central
            </span>
          </div>

          <nav className="space-y-1" aria-label="Navegação Principal">
            {mainNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all
                    ${isActive 
                      ? 'bg-mindverse-midnight text-mindverse-gold-subtle border border-mindverse-gold-subtle/30 shadow-gold-glow' 
                      : 'text-mindverse-muted hover:text-mindverse-softwhite hover:bg-mindverse-midnight/60 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-mindverse-gold-subtle' : 'text-mindverse-muted'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`
                      text-[9px] font-mono px-1.5 py-0.5 rounded-full border
                      ${isActive 
                        ? 'bg-mindverse-gold-subtle/20 text-mindverse-gold-light border-mindverse-gold-subtle/40' 
                        : 'bg-mindverse-graphite/40 text-mindverse-muted border-mindverse-graphite'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 px-3 border-t border-mindverse-graphite/40">
            <span className="text-[10px] font-mono tracking-wider uppercase text-mindverse-gold-subtle font-semibold flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-mindverse-gold" />
              <span>Inovações Dialéticas</span>
            </span>
          </div>

          <nav className="space-y-1" aria-label="Inovações Dialéticas">
            {innovationItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all
                    ${isActive 
                      ? 'bg-mindverse-midnight text-mindverse-gold-subtle border border-mindverse-gold-subtle/30 shadow-gold-glow' 
                      : 'text-mindverse-muted hover:text-mindverse-softwhite hover:bg-mindverse-midnight/60 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-mindverse-gold-subtle' : 'text-mindverse-muted'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`
                      text-[9px] font-mono px-1.5 py-0.5 rounded-full border
                      ${isActive 
                        ? 'bg-mindverse-gold-subtle/20 text-mindverse-gold-light border-mindverse-gold-subtle/40' 
                        : 'bg-mindverse-graphite/40 text-mindverse-muted border-mindverse-graphite'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 px-3 border-t border-mindverse-graphite/40">
            <button
              onClick={() => handleSelectTab('about')}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all
                ${currentTab === 'about'
                  ? 'bg-mindverse-midnight text-mindverse-gold-subtle border border-mindverse-gold-subtle/30'
                  : 'text-mindverse-muted hover:text-mindverse-softwhite hover:bg-mindverse-midnight/60'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-mindverse-muted" />
                <span>{t('nav.about')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="pt-4 border-t border-mindverse-graphite/60 space-y-3">
          <div className="p-3 rounded-xl bg-mindverse-midnight/80 border border-mindverse-graphite/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-mindverse-gold-subtle" />
                Fase 1: Fundação
              </span>
              <span className="text-[10px] font-mono text-mindverse-muted">v0.1.0</span>
            </div>
            <p className="text-xs text-mindverse-muted leading-relaxed">
              Panteão Histórico com 47 pensadores e corpora canónicos indexados.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] text-mindverse-muted border-t border-mindverse-graphite/40 font-mono">
              <span>{userProfile.subscriptionTier.toUpperCase()}</span>
              <span>{userProfile.tokensUsedToday} / {userProfile.dailyTokenQuota} tkn</span>
            </div>
          </div>

          <div className="px-2 flex items-center gap-2 text-[10px] text-mindverse-muted">
            <ShieldAlert className="w-3.5 h-3.5 text-mindverse-cyan-glow/80" />
            <span>RLS Ativo • Zero Keys no Frontend</span>
          </div>
        </div>
      </aside>
    </>
  );
};
