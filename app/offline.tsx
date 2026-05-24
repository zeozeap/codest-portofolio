export const metadata = {
  title: "Offline - Codest",
  description: "You are currently offline. Please check your internet connection.",
};

export default function OfflinePage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          📴
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          You Are Offline
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon text-primary-foreground font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 neon-glow shine-button"
        >
          Try Again
          <span aria-hidden="true">🔄</span>
        </button>
      </div>
    </main>
  );
}