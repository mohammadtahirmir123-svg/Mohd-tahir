import React, { useState } from 'react';
import { WORKSHOP_TOPICS, WORKSHOP_BENEFITS } from '../data';
import { BookOpen, Award, CheckCircle, Flame, Star, Sparkles, Terminal } from 'lucide-react';

export default function WorkshopSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="workshop" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      {/* Visual neon halos */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-indigo-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-purple-950/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            ACADEMIC ACCELERATOR
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Digital Skills Workshop
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed font-sans">
            "I teach practical, monetizable skills that help students, freelancers, and professionals build highly successful careers in the digital world."
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Double-Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Workshop Topics Grid (7 columns) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between">
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2.5 mb-6">
                  <Flame className="w-5 h-5 text-purple-400 animate-pulse" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                    Topics Masterclass Roadmap
                  </h3>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm mb-8 font-light leading-relaxed">
                  Carefully synthesized training programs designed to transition you from total novice to high-ticket independent contractor:
                </p>

                {/* Topics Layout inside a mini bento of modern tag pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {WORKSHOP_TOPICS.map((topic, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center space-x-3 cursor-default select-none ${
                        hoveredIndex === i
                          ? 'bg-purple-500/15 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'bg-purple-500/5 border-purple-500/10 text-gray-300 hover:border-purple-500/25 hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_4px_#a855f7]" />
                      <span className="font-display font-medium text-xs tracking-wide">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Badge Footer */}
              <div className="relative z-10 mt-10 pt-6 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    Next Batch: Enrolling Now
                  </span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition-all text-center cursor-pointer"
                >
                  Request Sylabbus & Fee
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Workshop Benefits Checklist (5 columns) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center space-x-2.5 mb-8">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                    Program Benefits
                  </h3>
                </div>

                <div className="space-y-6">
                  {WORKSHOP_BENEFITS.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-4 group/benefit">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover/benefit:border-purple-400 text-purple-300 mt-0.5 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white group-hover/benefit:text-purple-300 transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1 font-light leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Counter status label */}
              <div className="mt-8 pt-6 border-t border-purple-500/10 flex items-center justify-between text-[10px] font-mono uppercase text-gray-500">
                <span>VERIFIED ALUMNI MATRIX</span>
                <span className="text-purple-400 font-bold">50+ ACCREDITED CAREERS</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
