"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamSection } from "@/components/sections/team-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";

const IntroScene = dynamic(
  () => import("@/components/three/intro-scene").then((mod) => mod.IntroScene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon/30 border-t-neon rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("codest-intro-seen");
    if (seen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem("codest-intro-seen", "true");
  };

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (showIntro && !hasSeenIntro) {
      const timer = setTimeout(() => {
        handleIntroComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showIntro, hasSeenIntro]);

  return (
    <>
      {showIntro && !hasSeenIntro && (
        <IntroScene onComplete={handleIntroComplete} />
      )}

      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
        <Footer />
      </main>
    </>
  );
}