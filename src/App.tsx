import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import WorkshopSection from './components/WorkshopSection';
import PortfolioSection from './components/PortfolioSection';
import AIShowcase from './components/AIShowcase';
import ClientSuccess from './components/ClientSuccess';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#03000b] text-[#f3f4f6] relative antialiased select-none selection:bg-purple-500/30 selection:text-white">
      {/* Custom Ultra-realistic lagless mouse aura trail */}
      <CustomCursor />

      {/* Global Background Grid structure overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Primary Navigation System */}
      <Header />

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

        {/* CLIENT SUCCESS & TESTIMONIALS SECTION */}
        <ClientSuccess />

        {/* PROCESS SECTION */}
        <ProcessSection />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* Footer copyright */}
      <footer className="relative py-12 bg-[#030010] border-t border-purple-500/5 z-20">
        <div className="max-w-7xl mx-auto px-4 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MOHD TAHIR. ALL SYSTEM BLUEPRINTS RESERVED.</p>
          <p className="text-purple-500/40 mt-2">CRAFTED FOR EXECUTIVE SCALE & BRAND PERFORMANCE.</p>
        </div>
      </footer>
    </div>
  );
}
