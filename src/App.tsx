import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PersonalityLibrary } from './components/library/PersonalityLibrary';
import { PersonalityDetailModal } from './components/library/PersonalityDetailModal';
import { ChatView } from './components/chat/ChatView';
import { AgoraView } from './components/agora/AgoraView';
import { AboutView } from './components/about/AboutView';
import { AuthModal } from './components/auth/AuthModal';
import { ErrorToast } from './components/ui/ErrorToast';

export const App: React.FC = () => {
  const { currentTab } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'library':
        return <PersonalityLibrary />;
      case 'chat':
        return <ChatView />;
      case 'agora':
        return <AgoraView />;
      case 'about':
      case 'settings':
      default:
        return <AboutView />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-mindverse-deep text-mindverse-softwhite flex flex-col font-sans selection:bg-mindverse-gold-subtle/30 selection:text-mindverse-gold-light">
        {/* Top Navigation */}
        <Navbar 
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Main Content Area with Sidebar */}
        <div className="flex-1 flex">
          <Sidebar 
            isMobileOpen={isMobileMenuOpen} 
            onCloseMobile={() => setIsMobileMenuOpen(false)} 
          />

          <main className="flex-1 overflow-x-hidden min-w-0">
            {renderActiveView()}
          </main>
        </div>

        {/* Modals and Floating Alerts */}
        <PersonalityDetailModal />
        <AuthModal />
        <ErrorToast />
      </div>
    </ErrorBoundary>
  );
};

export default App;
