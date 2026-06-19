import React from 'react';
import { HOW_I_WORK_PROCESS } from '../data';
import { Network, Search, PenTool, Terminal, Play, CheckCircle, LifeBuoy, ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  // Map index to a matching decorative icon
  const getIcon = (step: string) => {
    switch (step) {
      case '01': return <PhoneIcon />;
      case '02': return <Search className="w-5 h-5 text-indigo-400" />;
      case '03': return <Network className="w-5 h-5 text-purple-400" />;
      case '04': return <PenTool className="w-5 h-5 text-pink-400" />;
      case '05': return <Terminal className="w-5 h-5 text-purple-400" />;
      case '06': return <Play className="w-5 h-5 text-emerald-400" />;
      case '07': return <CheckCircle className="w-5 h-5 text-purple-400" />;
      case '08': return <LifeBuoy className="w-5 h-5 text-blue-400" />;
      default: return <PenTool className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="process-timeline" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            DELIVERY LIFECYCLE SCHEMATIC
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            How I Work
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            A precise, thoroughly documented 8-step operating system guiding initial exploration to sustainable long-term scaled support.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* 8-Stage Bento Grid Map */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HOW_I_WORK_PROCESS.map((proc, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-purple-500/30 group hover:-translate-y-1"
            >
              {/* Core Index Corner */}
              <span className="absolute top-3 right-4 font-mono font-black text-xl text-purple-500/10 group-hover:text-purple-400/25 transition-colors">
                {proc.step}
              </span>

              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-400/30 transition-all shadow-[0_0_8px_rgba(168,85,247,0.05)]">
                  {getIcon(proc.step)}
                </div>
                
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  {proc.title}
                </h3>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">
                {proc.desc}
              </p>

              {/* Connecting line helper arrow on desktop lg: screens */}
              {idx < HOW_I_WORK_PROCESS.length - 1 && (
                <div className="hidden lg:block absolute top-[44px] -right-4 translate-x-1/2 z-20 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Custom simple PhoneIcon module
function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
