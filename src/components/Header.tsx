import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Cpu, Share2, Sparkles, Award, Film, Globe } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const tickers = [
    "🔥 ACADEMY ADMISSIONS OPEN • COHORT JUNE 2026 • RUNNING OUT OF SEATS FAST",
    "🤖 NEW RELEASES: DEPLOY WORKSPACE AGENTS & AUTOMATION TRACKS LIVE",
    "💼 LEVEL UP: MASTER HIGHFLOW UPWORK FREELANCER RANKING SYSTEMS DIRECTLY IN ACADEMY",
    "🎓 AUTOMATED SELECTION SYSTEM ACTIVE • CLICK CONSOLE TO SECURE REGISTRATION"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          // Simple active link detection
          const sections = ['home', 'about', 'experience', 'services', 'workshop', 'portfolio', 'automation', 'process', 'contact'];
          let currentSection = 'home';
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
                break;
              }
            }
          }
          setActiveSection(prev => prev !== currentSection ? currentSection : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Skill Training + Registrations', id: 'workshop' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'AI Solutions', id: 'automation' },
    { label: 'Process', id: 'process' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#03000b]/80 border-b border-purple-500/15 backdrop-blur-md'
            : 'py-5 bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Platform Badge */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleScrollTo('home')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 overflow-hidden transition-all duration-300 group-hover:border-purple-500/60 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Cpu className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(168,85,247,0.2)_50%,transparent_100%)] w-full h-[200%] animate-[scan_2s_ease-in-out_infinite]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                MOHD TAHIR
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] text-gray-300 uppercase tracking-[0.2em] relative overflow-hidden group-hover:text-purple-300 transition-colors duration-300 w-32 flex">
                  <span className="inline-block animate-[slide_5s_linear_infinite] whitespace-nowrap">
                    AUTOMATION & AI SPECIALIST
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-3 py-2 text-xs font-medium tracking-wide rounded-lg transition-all duration-200 uppercase relative group ${
                    active ? 'text-purple-300' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7] transition-all duration-300 ${
                      active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Toggle Dropdown */}
            <div className="relative group/lang">
              <button className="flex items-center space-x-1 px-2.5 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-200 uppercase rounded-lg hover:bg-white/5 border border-transparent hover:border-purple-500/20 cursor-pointer">
                <Globe className="w-4 h-4 text-purple-400/70" />
                <span>{currentLanguage}</span>
              </button>
              
              <div className="absolute top-full right-0 mt-1 w-36 py-1.5 rounded-xl bg-[#03000b]/95 border border-purple-500/20 backdrop-blur-xl shadow-[0_4px_24px_rgba(168,85,247,0.2)] opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-200 flex flex-col z-50">
                {['EN - English', 'ES - Español', 'FR - Français', 'ZH - 中文', 'AR - العربية'].map((lang) => {
                  const langCode = lang.split(' ')[0];
                  return (
                    <button
                      key={langCode}
                      onClick={() => setCurrentLanguage(langCode)}
                      className={`px-4 py-2.5 text-left text-[11px] font-medium w-full transition-colors cursor-pointer ${
                        currentLanguage === langCode 
                          ? 'bg-purple-500/15 text-purple-300 font-bold border-l-2 border-purple-500' 
                          : 'text-gray-400 border-l-2 border-transparent hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('replay-legendary-intro'))}
              className="px-3.5 py-2 text-xs font-semibold text-pink-300 hover:text-white tracking-widest uppercase rounded-lg bg-pink-500/10 hover:bg-pink-500/20 transition-all duration-200 hover:scale-[1.03] border border-pink-500/30 hover:border-pink-400/50 flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Film className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>3D Intro</span>
            </button>

            {/* Dynamic Automated Highlight Admissions Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-admission-modal'))}
              className="relative px-3.5 py-2 text-xs font-black text-white tracking-widest uppercase rounded-lg bg-gradient-to-r from-purple-900 via-[#8b5cf6] to-indigo-950 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:shadow-[0_0_22px_rgba(168,85,247,0.7)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] flex items-center space-x-1.5 cursor-pointer overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000" />
              <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
              <span>Academy Admission</span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-share-hub'))}
              className="px-3.5 py-2 text-xs font-semibold text-purple-300 hover:text-white tracking-widest uppercase rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200 hover:scale-[1.03] border border-purple-500/30 hover:border-purple-400/50 flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Share App</span>
            </button>

            <button
              id="header-cta"
              onClick={() => handleScrollTo('contact')}
              className="px-4 py-2 text-xs font-semibold text-white tracking-widest uppercase rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-purple-400/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
            >
              Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 border border-transparent hover:border-purple-500/10 transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-[#03000b]/95 z-30 border-t border-purple-500/10 backdrop-blur-xl animate-fade-in lg:hidden">
          <nav className="flex flex-col space-y-4 p-6">
            {/* Highly dynamic Mobile admission row at top */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-admission-modal'));
              }}
              className="w-full py-3 text-center text-xs font-black text-white tracking-widest uppercase rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 border border-purple-400/40 shadow-[0_4px_18px_rgba(168,85,247,0.35)] flex items-center justify-center space-x-2 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-purple-200 animate-spin-slow" />
              <span>🔥 ADMISSIONS OPEN - ENROLL NOW</span>
            </button>

            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`py-3 px-4 text-left text-sm font-semibold tracking-wider rounded-xl transition-all duration-200 uppercase flex items-center justify-between border ${
                    active
                      ? 'text-white border-purple-500/20 bg-purple-500/10'
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />}
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-share-hub'));
              }}
              className="mt-4 w-full py-3 text-center text-xs font-bold text-purple-300 tracking-widest uppercase rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Share & Showcase Link</span>
            </button>
            <div className="mt-4 flex items-center justify-between px-2 pt-2 border-t border-purple-500/20">
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Language Setup:</span>
              <div className="flex space-x-1.5">
                {['EN', 'ES', 'FR', 'ZH'].map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => setCurrentLanguage(langCode)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                      currentLanguage === langCode
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-400 border border-purple-500/20'
                    }`}
                  >
                    {langCode}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleScrollTo('contact')}
              className="mt-2 w-full py-3 text-center text-xs font-bold text-white tracking-widest uppercase rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/20 shadow-[0_4px_15px_rgba(168,85,247,0.15)]"
            >
              Book Free Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
