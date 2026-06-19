import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Target, Cpu, Layout, Award, Check } from 'lucide-react';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages'>('All');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const categories: ('All' | 'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages')[] = [
    'All', 'Websites', 'UI/UX', 'AI Automation', 'Graphic Design', 'Branding', 'Landing Pages'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => {
        if (selectedCategory === 'UI/UX' && p.category === 'UI/UX') return true;
        return p.category === selectedCategory;
      });

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Dynamic blurred core halos */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-purple-900/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            VERIFIED OUTCOMES & ARTIFACTS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Creative Portfolio
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Delivering intuitive layouts, highly interactive visual experiences, and high-productivity automate modules.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto border-b border-purple-500/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none ${
                selectedCategory === cat
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'bg-purple-500/5 border-purple-500/10 text-gray-400 hover:text-white hover:border-purple-500/25 hover:bg-purple-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => {
            const isActive = activeCardId === p.id;
            
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveCardId(p.id)}
                onMouseLeave={() => setActiveCardId(null)}
                className="glass-panel p-5 rounded-3xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(168,85,247,0.12)] cursor-pointer"
              >
                {/* Visual Image wrapper with zoom */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-purple-500/10">
                  <img
                    src={p.image}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 py-1 px-3 rounded-lg bg-[#03000b]/80 border border-purple-500/25 font-mono text-[9px] uppercase tracking-widest text-purple-300">
                    {p.category}
                  </span>
                </div>

                {/* Content block */}
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase group-hover:text-purple-300 transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed font-light font-sans">
                    {p.description}
                  </p>

                  {/* Highlights / Results Section */}
                  <div className="mt-5 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <div className="flex items-center space-x-2 text-purple-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                      <Target className="w-3.5 h-3.5" />
                      <span>Results Achieved</span>
                    </div>
                    <p className="text-gray-200 text-xs mt-1.5 font-sans leading-relaxed">
                      {p.results}
                    </p>
                  </div>
                </div>

                {/* Tech tags list & Action Button */}
                <div className="mt-6 pt-4 border-t border-purple-500/10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-550/10 font-mono text-[9px] text-purple-300 uppercase tracking-widest"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[10px] text-purple-400/60 font-semibold">
                      [ // PROJECT ]
                    </span>
                    
                    <a
                      href={p.liveUrl || '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest inline-flex items-center space-x-2 border border-purple-400/20 shadow-sm hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
