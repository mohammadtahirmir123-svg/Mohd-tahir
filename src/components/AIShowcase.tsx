import React, { useState } from 'react';
import { AI_PROJECTS } from '../data';
import { Cpu, ArrowRight, CheckCircle2, Zap, Terminal, Sparkles } from 'lucide-react';

export default function AIShowcase() {
  const [activeProject, setActiveProject] = useState(AI_PROJECTS[0].id);

  const selectedProj = AI_PROJECTS.find(p => p.id === activeProject) || AI_PROJECTS[0];

  return (
    <section id="automation" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      {/* Absolute futuristic decoration */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid line background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            AUTONOMOUS COGNITIVE SOLUTIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            AI-Powered Solutions
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Unleashing continuous background process pipelines to cut administrative friction and convert organic signals 24 hours a day.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Master Bento Multi-Panel Grid for AI showpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Left Column: Solution selector cards (5 wide) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-6">
              SELECT AUTOMATION SYSTEM
            </h4>

            <div className="space-y-3.5">
              {AI_PROJECTS.map((proj) => {
                const isActive = activeProject === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProject(proj.id)}
                    className={`p-6 rounded-2xl border transition-all duration-350 cursor-pointer text-left relative overflow-hidden group ${
                      isActive
                        ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'bg-purple-500/5 border-purple-500/10 hover:border-purple-500/25'
                    }`}
                  >
                    {/* Tiny active orb icon */}
                    {isActive && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)] animate-ping" />
                    )}

                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg border text-purple-300 transition-colors ${
                        isActive ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-500/5 border-purple-500/10'
                      }`}>
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                        {proj.title}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs mt-3 leading-relaxed font-light line-clamp-2">
                      {proj.description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-purple-400 uppercase tracking-wide">
                        [ {proj.status} ]
                      </span>
                      <span className="text-gray-500 group-hover:text-white transition-colors flex items-center space-x-1">
                        <span>inspect workflow</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Workflow visualization terminal (7 wide) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
              
              {/* Terminal Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-purple-500/15 pb-6 mb-8">
                <div className="flex items-center space-x-2.5">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest pl-2 border-l border-white/10">
                    Workflow Pipeline Visualizer
                  </span>
                </div>
                
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold tracking-widest uppercase">
                  ACTIVE PIPELINE
                </span>
              </div>

              {/* Terminal Contents */}
              <div className="relative z-10 space-y-6 flex-1">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>{selectedProj.title}</span>
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed font-light">
                    {selectedProj.description}
                  </p>
                </div>

                {/* Automation Steps timeline */}
                <div className="space-y-4 pt-3">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    SYSTEM PIPELINE CHANNELS
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProj.steps.map((st, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#03000b]/65 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-2 text-purple-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                          <span>0{i + 1} //</span>
                          <span>{st.label}</span>
                        </div>
                        <p className="text-gray-300 text-[11px] mt-1.5 leading-relaxed font-light font-sans">
                          {st.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Impact Metrics */}
                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-900/15 to-indigo-900/15 border border-purple-500/25">
                  <div className="flex items-center space-x-2 text-indigo-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                    <Zap className="w-4 h-4" />
                    <span>SaaS Metrics & Outcomes</span>
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium mt-1.5 leading-relaxed font-sans">
                    {selectedProj.metrics}
                  </p>
                </div>
              </div>

              {/* Status footer with action */}
              <div className="relative z-10 mt-8 pt-6 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[9px] text-gray-500 uppercase">
                  INTEGRATIONS: CHATGPT // ZAPIER // MAKE // NODE // REST
                </span>

                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#f3f4f6] hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Configure My Automation
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
