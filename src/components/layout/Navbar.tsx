import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { Locale } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';
import { 
  Globe, 
  Coins, 
  UserCircle2, 
  Database,
  Menu,
  X,
  Sparkles,
  Activity
} from 'lucide-react';
import { MindverseSpecialLogo } from '../brand/MindverseSpecialLogo';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { t } = useTranslation();
  const { 
    userProfile, 
    currentLocale, 
    setLocale, 
    setIsAuthModalOpen,
    setCurrentTab 
  } = useAppStore();

  const isConnected = isSupabaseConfigured();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  const quotaPercentage = Math.min(
    100, 
    Math.round((userProfile.tokensUsedToday / userProfile.dailyTokenQuota) * 100)
  );

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-mindverse-graphite/60 bg-mindverse-deep/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-mindverse-muted hover:text-mindverse-softwhite hover:bg-mindverse-midnight transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          onClick={() => setCurrentTab('landing')} 
          className="cursor-pointer group flex items-center"
          title="Ver Landing Page Institucional"
        >
          <MindverseSpecialLogo size="sm" showWordmark={true} />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Landing Page Button */}
        <button
          onClick={() => setCurrentTab('landing')}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mindverse-midnight hover:bg-mindverse-graphite border border-mindverse-gold-subtle/30 text-xs font-mono text-mindverse-gold-light transition-all hover:border-mindverse-gold-subtle shadow-gold-glow"
        >
          <Sparkles className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <span>Landing Page</span>
        </button>

        {/* Admin Telemetry Button */}
        <button
          onClick={() => setCurrentTab('admin')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mindverse-midnight hover:bg-mindverse-graphite border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-mono text-emerald-400 transition-all"
          title="Painel de Administração & Métricas"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
        {/* Supabase Connection Status Badge */}
        <div 
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono border transition-all"
          style={{
            borderColor: isConnected ? 'rgba(56, 189, 248, 0.3)' : 'rgba(148, 163, 184, 0.2)',
            backgroundColor: isConnected ? 'rgba(56, 189, 248, 0.08)' : 'rgba(30, 41, 59, 0.4)',
            color: isConnected ? '#38BDF8' : '#94A3B8'
          }}
          title={isConnected ? "Supabase Cloud conectado com sucesso." : "Ambiente de fundação ativo. Configure o ficheiro .env para vincular o Supabase Cloud."}
        >
          <Database className="w-3.5 h-3.5" />
          <span>{isConnected ? t('common.connected') : t('common.local_preview')}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-mindverse-cyan-glow animate-pulse' : 'bg-mindverse-muted'}`} />
        </div>

        {/* Quota Progress Pill */}
        <div 
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mindverse-midnight border border-mindverse-graphite text-xs font-mono"
          title={`Quota: ${userProfile.tokensUsedToday.toLocaleString()} / ${userProfile.dailyTokenQuota.toLocaleString()} tokens`}
        >
          <Coins className="w-3.5 h-3.5 text-mindverse-gold-subtle" />
          <div className="flex flex-col">
            <span className="text-[10px] text-mindverse-muted">Quota Diária</span>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-mindverse-graphite rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-mindverse-gold-dim to-mindverse-gold-subtle transition-all duration-500"
                  style={{ width: `${quotaPercentage}%` }}
                />
              </div>
              <span className="text-[11px] text-mindverse-softwhite font-medium">{quotaPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-mindverse-midnight border border-mindverse-graphite text-xs">
          <Globe className="w-3.5 h-3.5 text-mindverse-muted" />
          <select
            value={currentLocale}
            onChange={handleLocaleChange}
            aria-label={t('common.language')}
            className="bg-transparent text-mindverse-softwhite font-medium focus:outline-none cursor-pointer uppercase text-xs"
          >
            <option value="pt" className="bg-mindverse-midnight text-mindverse-softwhite">PT</option>
            <option value="en" className="bg-mindverse-midnight text-mindverse-softwhite">EN</option>
            <option value="fr" className="bg-mindverse-midnight text-mindverse-softwhite">FR</option>
            <option value="es" className="bg-mindverse-midnight text-mindverse-softwhite">ES</option>
          </select>
        </div>

        {/* User Auth Profile Trigger */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mindverse-midnight hover:bg-mindverse-graphite border border-mindverse-graphite hover:border-mindverse-gold-subtle/40 transition-all text-xs text-mindverse-softwhite group"
        >
          <UserCircle2 className="w-4 h-4 text-mindverse-gold-subtle group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-medium">{userProfile.fullName.split(' ')[0]}</span>
        </button>
      </div>
    </header>
  );
};
