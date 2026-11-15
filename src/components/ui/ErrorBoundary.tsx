import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in MINDVERSE UI:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mindverse-deep flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-mindverse-midnight border border-mindverse-gold-subtle/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-mindverse-softwhite">
              Ocorreu uma Interrupção Inesperada
            </h2>
            <p className="text-xs text-mindverse-muted leading-relaxed">
              O sistema preservou o estado anterior da sessão para evitar perda de dados.
            </p>
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-mindverse-deep hover:bg-mindverse-graphite border border-mindverse-gold-subtle/40 text-xs font-medium text-mindverse-gold-subtle transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recarregar Aplicação</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
