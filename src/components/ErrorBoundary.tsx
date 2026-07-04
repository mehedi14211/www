import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error boundary exception:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 border border-zinc-900 rounded-2xl my-4">
          <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-full text-red-500 mb-4 animate-pulse">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white mb-2">Something went wrong</h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            An unexpected error occurred in this section of the application. The system has isolated the issue to prevent the rest of the site from crashing.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-xs uppercase tracking-wider rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
