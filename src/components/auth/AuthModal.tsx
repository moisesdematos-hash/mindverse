import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { 
  X, 
  Lock, 
  Mail, 
  Database,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthModalOpen, setIsAuthModalOpen, setErrorNotification } = useAppStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const isConnected = isSupabaseConfigured();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (!isConnected) {
      setStatusMessage('Modo Fundação Local ativo: o Supabase ainda não está vinculado no ficheiro .env. O perfil convidado permanecerá em utilização.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setStatusMessage('Conta registada com sucesso! Verifique a sua caixa de correio.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatusMessage('Autenticação bem-sucedida!');
        setTimeout(() => setIsAuthModalOpen(false), 1200);
      }
    } catch (err: any) {
      setErrorNotification(err.message || 'Erro ao processar autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-mindverse-deep border border-mindverse-gold-subtle/30 shadow-2xl p-6 sm:p-8 space-y-6"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-mindverse-midnight text-mindverse-muted hover:text-mindverse-softwhite border border-mindverse-graphite transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-mindverse-midnight to-mindverse-graphite border border-mindverse-gold-subtle/40 flex items-center justify-center font-serif font-bold text-xl text-mindverse-gold-subtle shadow-gold-glow">
            M
          </div>
          <h2 className="text-2xl font-serif font-bold text-mindverse-softwhite">
            {t('auth.title')}
          </h2>
          <p className="text-xs text-mindverse-muted">
            {t('auth.subtitle')}
          </p>
        </div>

        {/* Integration notice */}
        <div 
          className="p-3 rounded-xl border text-xs font-mono flex items-start gap-2.5"
          style={{
            borderColor: isConnected ? 'rgba(56, 189, 248, 0.3)' : 'rgba(212, 175, 55, 0.3)',
            backgroundColor: isConnected ? 'rgba(56, 189, 248, 0.08)' : 'rgba(212, 175, 55, 0.06)',
            color: isConnected ? '#38BDF8' : '#D4AF37'
          }}
        >
          <Database className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {isConnected 
              ? 'Conectado ao Supabase Auth com Row-Level Security (RLS) habilitado.' 
              : 'Ambiente de Fundação Local ativo. Para ativar o login na cloud, preencha o ficheiro .env com as credenciais do seu projeto Supabase.'
            }
          </span>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-mindverse-midnight border border-mindverse-graphite text-xs text-mindverse-softwhite">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-mindverse-muted">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mindverse-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="investigador@exemplo.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-mindverse-midnight border border-mindverse-graphite focus:border-mindverse-gold-subtle text-xs text-mindverse-softwhite outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-mindverse-muted">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mindverse-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-mindverse-midnight border border-mindverse-graphite focus:border-mindverse-gold-subtle text-xs text-mindverse-softwhite outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-xs font-semibold text-mindverse-void transition-all shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? t('auth.signup') : t('auth.login')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-mindverse-muted hover:text-mindverse-softwhite transition-colors"
          >
            {isSignUp ? 'Já possui conta? Iniciar Sessão' : 'Não tem conta? Criar Registo'}
          </button>
        </div>
      </div>
    </div>
  );
};
