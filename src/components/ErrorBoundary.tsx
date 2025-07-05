import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here if needed
    // console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-8 bg-cosmic-black/80 rounded-2xl border border-cosmic-accent shadow-glow">
          <div className="text-5xl mb-4">🪐</div>
          <h2 className="text-2xl font-bold text-white mb-2">Cosmic Glitch Detected</h2>
          <p className="text-cosmic-blue-light mb-4">Something went wrong in the cosmic web.<br />Try refreshing the page or exploring another planet.</p>
          <div className="text-xs text-gray-400">{this.state.error?.message}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 