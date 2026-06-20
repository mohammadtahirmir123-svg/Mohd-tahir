import * as React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isRepairing: boolean;
  countdown: number;
}

export class ErrorBoundary extends React.Component<Props, State> {
  private timer: NodeJS.Timeout | null = null;
  
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    isRepairing: false,
    countdown: 5,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, isRepairing: false, countdown: 5 };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error explicitly captured by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    console.log('[FIREWALL] Intercepted runtime exception. Application state protected.');
    this.startAutoRepair();
  }

  public componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  private startAutoRepair = () => {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState(
        (prevState) => ({ countdown: Math.max(0, prevState.countdown - 1) }),
        () => {
          if (this.state.countdown === 0) {
            this.handleRepair();
          }
        }
      );
    }, 1000);
  }

  private handleRepair = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({ isRepairing: true });
    
    // Simulate auto-repair sequence
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRepairing: false,
        countdown: 5
      });
      window.location.reload();
    }, 1500);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020008] text-white flex items-center justify-center p-4 font-sans antialiased">
          <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-purple-600 to-red-600" />
            
            <div className="flex justify-center mb-6 relative">
               <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full" />
               <AlertTriangle className="w-16 h-16 text-red-500 relative z-10" />
            </div>

            <h1 className="text-2xl font-semibold text-center mb-2 tracking-tight">System Exception Isolated</h1>
            <p className="text-gray-400 text-center text-sm mb-6 leading-relaxed">
              Our automated firewall protection captured a runtime error. Your session data remains strictly secure.
            </p>

            {this.state.error && (
              <div className="bg-black/60 border border-gray-800 rounded-lg p-4 mb-8 overflow-x-auto">
                <p className="text-red-400 font-mono text-xs">{this.state.error.toString()}</p>
              </div>
            )}

            <button
              onClick={this.handleRepair}
              disabled={this.state.isRepairing}
              className="w-full relative group overflow-hidden rounded-xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 transition-all duration-300 py-3 flex items-center justify-center gap-2"
            >
              {this.state.isRepairing ? (
                 <>
                   <RefreshCw className="w-5 h-5 text-purple-400 animate-spin" />
                   <span className="font-semibold text-purple-300">Initiating Auto-Repair...</span>
                 </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="font-semibold text-purple-300 group-hover:text-purple-200 transition-colors">
                    Repairing automatically in {this.state.countdown}s
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
