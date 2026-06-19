import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Briefcase, ChevronDown, Cpu, Award, Terminal, Shield } from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';
import { HERO_ROLES, STATS } from '../data';

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [animateState, setAnimateState] = useState('fade-in');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Initializing Mohd Tahir AI hub...',
    'Loading neural architecture...',
    'Establishing secure RPC tunnel: OK',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateState('fade-out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
        setAnimateState('fade-in');
      }, 500); // fade out length
    }, 4000); // item frequency

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logPool = [
      'AGENT [Gemini] -> Cognitive flow generated',
      'PIPELINE -> DB synchronization success',
      'MONITOR -> Server performance optimal',
      'DEPLOYED -> Client React platform online',
      'PROCESS -> AI agency routing updated',
      'VECTOR DB -> Index refresh: 0.2ms speed',
      'ROUTING -> Secure edge handshake success',
      'OPTIMIZE -> Responsive layouts calibrated',
    ];

    const interval = setInterval(() => {
      setConsoleLogs((prev) => {
        const next = [...prev, logPool[Math.floor(Math.random() * logPool.length)]];
        if (next.length > 6) {
          next.shift();
        }
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth responsive factor
    const tiltX = (mouseY / height) * -15; // pitch
    const tiltY = (mouseX / width) * 15;   // yaw
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleScrollTo = (id: string) => {
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#03000b]"
    >
      {/* Immersive interactive canvas particles */}
      <InteractiveCanvas mode="hero" />

      {/* Grid Lining Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 z-10 w-full select-none">
        
        {/* Double Panel Layout for ultimate professional desktop presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission text & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left items-start">
            
            {/* Elite Badge */}
            <div
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-md animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono text-[9px] uppercase text-purple-300 font-bold tracking-[0.25em]">
                Elite Full-Stack Design & AI Automation
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.9]">
              <span className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                MOHD TAHIR
              </span>
            </h1>

            {/* Rotator */}
            <div className="h-10 sm:h-14 mt-4 overflow-hidden relative w-full flex justify-start items-center">
              <div
                className={`font-display text-xl sm:text-3xl lg:text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-indigo-200 to-pink-300 bg-clip-text text-transparent transform transition-all duration-300 ${
                  animateState === 'fade-in'
                    ? 'opacity-100 translate-y-0 scale-100 blur-0'
                    : 'opacity-0 translate-y-3 scale-95 blur-sm'
                }`}
              >
                {HERO_ROLES[roleIndex]}
              </div>
            </div>

            <p className="max-w-xl mt-5 text-gray-300 text-xs sm:text-sm font-light leading-relaxed font-sans">
              I partner with ambitious startups and businesses to architect beautiful bespoke websites, orchestrate autonomous AI agent workflows, and build high-productivity digital ecosystems.
            </p>

            {/* Buttons strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg mt-8">
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-6 py-3.5 font-semibold text-white text-xs tracking-[0.12em] uppercase rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/20 flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.25)]"
              >
                <span>Hire Mohd Tahir</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleScrollTo('portfolio')}
                className="px-6 py-3.5 font-semibold text-gray-300 hover:text-white text-xs tracking-[0.12em] uppercase rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Core Portfolio</span>
              </button>

              <button
                onClick={() => handleScrollTo('workshop')}
                className="px-6 py-3.5 font-semibold text-gray-300 hover:text-white text-xs tracking-[0.12em] uppercase rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Skills Training</span>
              </button>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-12 pt-8 border-t border-purple-500/10">
              {STATS.map((st, i) => (
                <div key={i} className="flex flex-col relative group">
                  <span className="font-mono text-[8px] text-purple-400 tracking-widest uppercase font-bold">
                    {st.marker}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-white mt-0.5 tracking-tight group-hover:text-purple-300 transition-colors">
                    {st.value}
                  </span>
                  <span className="font-sans text-[10px] text-gray-400 font-light mt-0.5">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Extreme Studio-Edited Professional Bento Interactive Card (5 wide) */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-full min-h-[400px] sm:min-h-[500px]">
            
            {/* Behind halo glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-indigo-500/5 to-transparent rounded-[40px] blur-3xl pointer-events-none scale-90 z-0" />

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
              className="relative w-full max-w-[340px] aspect-[3/4] bg-[#03000f]/80 rounded-[32px] border-2 border-purple-500/25 p-4 overflow-hidden shadow-[0_15px_40px_rgba(168,85,247,0.15)] group select-none z-10"
            >
              {/* Overlay scanlines context */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.05)_2%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-20" />

              {/* Live Interactive Developer Console Terminal */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0a0518]/90 border border-purple-500/30 p-5 flex flex-col justify-between font-mono">
                {/* Visual grid lining subtle */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Inner Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top header navigation indicators */}
                <div className="flex items-center justify-between border-b border-purple-500/25 pb-3.5 z-10">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.15em] text-purple-300 font-bold flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-purple-400" />
                    <span>SYS_WORKSPACE</span>
                  </span>
                </div>

                {/* Automation dashboard details */}
                <div className="my-3 flex-1 flex flex-col justify-start z-10 text-left">
                  <div className="mb-3.5 bg-purple-500/5 border border-purple-500/10 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] text-gray-400 font-bold tracking-wider uppercase">CORE_STATUS</span>
                      <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" />
                        ACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-purple-200 leading-snug">
                      <span>⚡ Mohd Tahir // AI Architect</span>
                    </div>
                  </div>

                  {/* Log stream with fading lines */}
                  <span className="text-[8px] text-purple-400 uppercase tracking-widest font-bold mb-1.5 block">
                    LIVE AUTOMATION STREAM:
                  </span>
                  <div className="flex-1 bg-black/45 border border-purple-500/15 p-2.5 rounded-lg space-y-1.5 min-h-[142px] flex flex-col justify-end overflow-hidden">
                    {consoleLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`text-[9.5px] leading-tight font-mono whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                          i === consoleLogs.length - 1
                            ? 'text-emerald-400 font-semibold pl-1.5 border-l border-emerald-400/50'
                            : 'text-gray-400'
                        }`}
                      >
                        <span className="text-purple-400/80 select-none mr-1.5">&gt;</span>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-2 gap-2 border-t border-purple-500/20 pt-3 z-10">
                  <div className="bg-purple-950/20 border border-purple-500/10 p-2 rounded-lg text-left">
                    <span className="text-[7px] text-gray-400 uppercase tracking-widest block font-bold">LATENCY</span>
                    <span className="text-[10px] text-white font-bold mt-0.5 block">14ms average</span>
                  </div>
                  <div className="bg-purple-950/20 border border-purple-500/10 p-2 rounded-lg text-left">
                    <span className="text-[7px] text-gray-400 uppercase tracking-widest block font-bold">ENGINE</span>
                    <span className="text-[10px] text-purple-300 font-bold mt-0.5 block">Gemini API</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => handleScrollTo('about')}
          className="flex flex-col items-center mt-12 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 pointer-events-auto sm:hidden"
        >
          <span className="font-mono text-[8px] tracking-widest uppercase text-gray-500 mb-1">
            DISCOVER THE JOURNEY
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
