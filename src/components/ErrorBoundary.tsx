import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#171717] text-white flex items-center justify-center p-4">
          <div className="bg-[#212121] border-2 border-[#FFEB3B] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <span className="text-5xl mb-3 inline-block">🌮</span>
            <h1 className="font-anton text-2xl sm:text-3xl text-[#FFEB3B] uppercase mb-2">
              Tacos Guerrero
            </h1>
            <p className="text-neutral-300 text-sm mb-6">
              Welcome to Tacos Guerrero in East Austin! Tap below to load the full menu and direct order experience.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3 px-6 bg-[#C62828] hover:bg-[#b71c1c] text-[#FFEB3B] font-anton text-lg rounded-xl border-2 border-[#FFEB3B] shadow-lg transition-transform active:scale-95 uppercase tracking-wide cursor-pointer"
            >
              Refresh Menu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
