import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AdmissionModal from './components/AdmissionModal';
import TelemetryShareCenter from './components/TelemetryShareCenter';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import WorkshopSection from './components/WorkshopSection';
import PortfolioSection from './components/PortfolioSection';
import AIShowcase from './components/AIShowcase';
import ClientSuccess from './components/ClientSuccess';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import HeyTahirAgent from './components/HeyTahirAgent';
import CoreSystemEngine from './components/CoreSystemEngine';
import GlobalCommandTerminal from './components/GlobalCommandTerminal';
import LegendaryIntro from './components/LegendaryIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Play the legendary intro on initial clean session load
    if (typeof window !== 'undefined') {
      const finished = sessionStorage.getItem('tahir_intro_completed');
      return finished !== 'true';
    }
    return true;
  });

  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleReplay = () => {
      sessionStorage.removeItem('tahir_intro_completed');
      setShowIntro(true);
    };
    
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('replay-legendary-intro', handleReplay);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('replay-legendary-intro', handleReplay);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('tahir_intro_completed', 'true');
    setShowIntro(false);
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#03000b] text-[#f3f4f6] relative antialiased select-none selection:bg-purple-500/30 selection:text-white">
      {showIntro && <LegendaryIntro onComplete={handleIntroComplete} />}

      {/* Custom Ultra-realistic lagless mouse aura trail */}
      <CustomCursor />

      {/* Global Background Grid structure overlay - FIXED to avoid extreme repaint cost on scroll */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Primary Navigation System */}
      <Header />

      {/* Advanced Futuristic Core AI System HUD */}
      <CoreSystemEngine />

      {/* Global Registration Form Modal */}
      <AdmissionModal />

      {/* Unified Interactive Telemetry and Secure Share Console (Levels 1-3) */}
      <TelemetryShareCenter />

      {/* Dynamic modules flow */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* HERO SECTION WITH DUAL PORTRAIT MATRIX */}
        <HeroSection />
        
        {/* ABOUT SECTION */}
        <AboutSection />

        {/* EXPERIENCE SECTION */}
        <ExperienceSection />

        {/* SERVICES SECTION */}
        <ServicesSection />

        {/* SKILLS WORKSHOP SECTION */}
        <WorkshopSection />

        {/* PORTFOLIO SECTION */}
        <PortfolioSection />

        {/* AI AUTOMATION SHOWCASE */}
        <AIShowcase />
        
        {/* TESTIMONIALS SECTION */}
        <ClientSuccess />

        {/* PROCESS SECTION */}
        <ProcessSection />

        {/* FAQ SECTION */}
        <FAQSection />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* Bottom Global Command Terminal layer */}
      <GlobalCommandTerminal />

      {/* Global Autonomic AI Agent */}
      <HeyTahirAgent />

      {/* Footer copyright */}
      <footer className="relative py-12 bg-[#030010] border-t border-purple-500/5 z-20">
        <div className="max-w-7xl mx-auto px-4 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MOHD TAHIR. ALL SYSTEM BLUEPRINTS RESERVED.</p>
          <p className="text-purple-500/40 mt-2">CRAFTED FOR EXECUTIVE SCALE & BRAND PERFORMANCE.</p>
        </div>
      </footer>

      {/* Extreme Low-latency Offline Status HUD Panel */}
      {isOffline && (
        <div 
          id="offline-system-badge"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-purple-950/40 backdrop-blur-xl border border-purple-500/30 text-purple-200 font-mono text-[10px] sm:text-xs px-4 py-3 rounded-xl z-50 flex items-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-pulse hover:border-purple-500/50 transition-colors"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </div>
          <div>
            <span className="text-white font-semibold">🌌 OFFLINE CORE ACTIVE</span>
            <span className="mx-2 text-purple-500/60 font-sans">|</span>
            <span className="text-purple-300">Porting 3D & Text assets from local IndexedDB</span>
          </div>
        </div>
      )}
    </div>
  );
}

