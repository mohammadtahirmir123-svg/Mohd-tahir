import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Briefcase, ChevronDown, Cpu, Award, Terminal, Shield, GraduationCap } from 'lucide-react';
import { motion, animate, useInView } from 'motion/react';
import InteractiveCanvas from './InteractiveCanvas';
import { HERO_ROLES, STATS } from '../data';

function AnimatedCounter({ value, subtitle, delay = 0 }: { value: string, subtitle: string, delay?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      // Find numbers in the string
      const numMatch = value.match(/\d+/);
      if (numMatch) {
        const num = parseInt(numMatch[0], 10);
        const prefix = value.substring(0, numMatch.index);
        const suffix = value.substring(numMatch.index! + numMatch[0].length);
        
        animate(0, num, {
          duration: 2,
          delay: delay,
          ease: "easeOut",
          onUpdate: (latest) => {
            if (nodeRef.current) {
              nodeRef.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
            }
          }
        });
      } else {
        nodeRef.current.textContent = value;
      }
    }
  }, [inView, value, delay]);

  return (
    <span ref={nodeRef} className="font-display font-extrabold text-2xl text-white mt-0.5 tracking-tight group-hover:text-purple-300 transition-colors">
      0
    </span>
  );
}

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
    let timeoutId: number;
    const interval = setInterval(() => {
      setAnimateState('fade-out');
      timeoutId = window.setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
        setAnimateState('fade-in');
      }, 500); // fade out length
    }, 4000); // item frequency

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
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
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 flex flex-col text-left items-start"
          >
            
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
            </div>

            {/* Dynamic Ultimate Academy Admission Registration Trigger Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => window.dispatchEvent(new CustomEvent('open-admission-modal'))}
              className="mt-6 p-4 py-3.5 rounded-2xl bg-[#0a0521]/90 hover:bg-[#110935]/95 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300 max-w-lg w-full cursor-pointer flex items-center justify-between group shadow-[0_0_15px_rgba(168,85,247,0.06)] hover:shadow-[0_0_30px_rgba(168,85,247,0.22)] relative overflow-hidden select-none"
            >
              {/* Internal absolute bottom high-fidelity neon accent line */}
              <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-60" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center space-x-4 relative z-10 text-left">
                {/* Advanced Ultimate 3D-feeling Graduation Icon Core with ring animations */}
                <div className="relative w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/10 opacity-100" />
                  <GraduationCap className="w-5 h-5 text-purple-200 relative z-10 group-hover:text-white transition-colors" />
                </div>
                
                <div>
                  <h4 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-wider uppercase transition-colors group-hover:text-purple-300">
                    ACADEMY ADMISSION
                  </h4>
                </div>
              </div>

              {/* Action pill trigger */}
              <div className="flex items-center space-x-1 relative z-10 shrink-0">
                <span className="font-mono text-[8.5px] font-black tracking-widest uppercase text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 px-3 py-1 rounded-md shadow-md border border-white/10 group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                  APPLY NOW
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-x-4 gap-y-6 w-full mt-12 pt-8 border-t border-purple-500/10">
              {STATS.map((st, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (i * 0.1) }}
                  key={i} 
                  className="flex flex-col relative group"
                >
                  <span className="font-mono text-[8px] text-purple-400 tracking-widest uppercase font-bold">
                    {st.marker}
                  </span>
                  <AnimatedCounter value={st.value} subtitle={st.label} delay={1.0 + (i * 0.1)} />
                  <span className="font-sans text-[10px] text-gray-400 font-light mt-0.5">
                    {st.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Extreme Studio-Edited Professional Bento Interactive Card (5 wide) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="lg:col-span-5 flex items-center justify-center relative w-full h-full min-h-[400px] sm:min-h-[500px]"
          >
            
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

              {/* Crop portrait photo */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0a0518] border border-purple-500/10">
                <img
                  src="https://i.ibb.co/gZZ9wwKN/65ea38ef-8e26-49d9-a5ed-b61b6e1ac222.jpg"
                  alt="Mohd Tahir Professional Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Cyber glass tint panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03000b] via-transparent to-purple-500/5 pointer-events-none z-10" />

                {/* Floating Telemetry Overlays */}
                <span className="absolute top-3 left-3 bg-[#03000b]/85 border border-purple-500/30 px-2.5 py-1 rounded-md font-mono text-[8px] text-purple-300 uppercase tracking-widest z-15 select-none shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WORKSPACE_ONLINE</span>
                </span>

                <span className="absolute top-3 right-3 bg-[#03000b]/85 border border-purple-500/30 px-2.5 py-1 rounded-md font-mono text-[8px] text-[#f3f4f6] uppercase tracking-widest z-15 select-none shadow-sm flex items-center space-x-1">
                  <Terminal className="w-2.5 h-2.5 text-purple-400" />
                  <span>SYS_LIVE</span>
                </span>

                {/* Identity Strip at bottom inside portrait frame */}
                <div className="absolute bottom-4 left-4 right-4 z-15 bg-[#03000b]/85 backdrop-blur-md border border-purple-500/20 p-3.5 rounded-xl flex items-center justify-between shadow-lg">
                  <div className="text-left">
                    <span className="font-mono text-[7px] text-purple-400 tracking-widest uppercase font-bold">REPRESENTATIVE</span>
                    <h3 className="font-display font-extrabold text-[13px] text-white uppercase tracking-wider">MOHD TAHIR</h3>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-mono text-[7px] text-gray-400 tracking-widest uppercase">DISCIPLINE</span>
                    <span className="font-mono text-[8px] text-emerald-400 uppercase font-black tracking-wider flex items-center space-x-1">
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span>AI ARCHITECT</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => handleScrollTo('portfolio')}
          className="flex flex-col items-center mt-12 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 pointer-events-auto sm:hidden"
        >
          <span className="font-mono text-[8px] tracking-widest uppercase text-gray-500 mb-1">
            VIEW PORTFOLIO
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
