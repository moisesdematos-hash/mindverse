import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { NavigationTab } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Swords, 
  Activity
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useAppStore();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Início', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'library', label: 'Mentes', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'chat', label: 'Diálogo', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'colosseum', label: 'Coliseu', icon: <Swords className="w-5 h-5" /> },
    { id: 'admin', label: 'Admin', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-mindverse-void/95 backdrop-blur-xl border-t border-mindverse-graphite/80 pb-[env(safe-area-inset-bottom)] px-2">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive 
                  ? 'text-mindverse-gold-subtle scale-105' 
                  : 'text-mindverse-muted hover:text-mindverse-softwhite'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-mindverse-midnight border border-mindverse-gold-subtle/30 shadow-gold-glow' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-mono mt-0.5 tracking-tight ${isActive ? 'font-bold text-mindverse-gold-light' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
