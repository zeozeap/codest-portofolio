import Link from "next/link";

export const metadata = {
  title: "Page Not Found - Codest",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Page Not Found
        </p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon text-primary-foreground font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 neon-glow shine-button"
        >
          Return to Homepage
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}