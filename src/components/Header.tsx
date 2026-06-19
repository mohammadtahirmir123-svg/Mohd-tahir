import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Cpu } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link detection
      const sections = ['home', 'about', 'experience', 'services', 'workshop', 'portfolio', 'automation', 'process', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Workshop', id: 'workshop' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'AI Solutions', id: 'automation' },
    { label: 'Process', id: 'process' },
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
              <Cpu className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                MOHD TAHIR
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                  AI & DEV SPECIALIST
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
          <div className="hidden lg:block">
            <button
              id="header-cta"
              onClick={() => handleScrollTo('contact')}
              className="px-4 py-2 text-xs font-semibold text-white tracking-widest uppercase rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-purple-400/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
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
              onClick={() => handleScrollTo('contact')}
              className="mt-4 w-full py-3 text-center text-xs font-bold text-white tracking-widest uppercase rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/20 shadow-[0_4px_15px_rgba(168,85,247,0.15)]"
            >
              Book Free Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
