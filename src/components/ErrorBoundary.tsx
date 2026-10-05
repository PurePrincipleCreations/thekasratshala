import { Component, type ReactNode } from "react";

export function ErrorFallback({ onReset }: { onReset?: () => void }) {
  return (
    <div className="min-h-[70svh] flex items-center justify-center px-6 bg-[var(--night)]">
      <div className="max-w-md text-center space-y-6">
        <p className="label-caps text-[var(--gold)]">A small stumble</p>
        <h1 className="editorial-heading text-4xl text-[var(--cream)]">This page didn&apos;t load.</h1>
        <p className="text-[var(--muted)] italic">Something went wrong while drawing this page. A reload usually fixes it.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => (onReset ? onReset() : window.location.reload())}
            className="rounded-full bg-[var(--gold)] px-6 py-3 label-caps text-[var(--night)]"
          >
            Reload Page
          </button>
          <a href="/" className="rounded-full border border-[var(--bone)] px-6 py-3 label-caps text-[var(--cream)]">Home</a>
        </div>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? <ErrorFallback /> : this.props.children;
  }
}
