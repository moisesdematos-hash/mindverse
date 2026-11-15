import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { AlertCircle, X } from 'lucide-react';

export const ErrorToast: React.FC = () => {
  const { errorNotification, setErrorNotification } = useAppStore();

  if (!errorNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-mindverse-deep/95 border border-red-500/40 text-red-200 text-xs shadow-2xl flex items-start gap-3 animate-fade-in backdrop-blur-md">
      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
      <div className="flex-1 space-y-1">
        <span className="font-semibold block text-red-300">Aviso do Sistema</span>
        <p className="leading-relaxed">{errorNotification}</p>
      </div>
      <button
        onClick={() => setErrorNotification(null)}
        className="p-1 rounded-md text-red-400 hover:text-red-200 hover:bg-red-950/40 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
