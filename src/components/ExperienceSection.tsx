import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { TIMELINE, EXPERTISE_CATEGORIES } from '../data';
import { Award, Briefcase, Zap, Cpu, ArrowRight, Star, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'Freelance' | 'Direct Clients' | 'Education'>('all');

  const filteredTimeline = activeTab === 'all' 
    ? TIMELINE 
    : TIMELINE.filter(item => item.type === activeTab);

  const freelancePlatforms = [
    { name: 'Upwork', rating: '5.0 Star Feedback', jobSuccess: '100% Client Trust', desc: 'Consulting enterprise startups, delivering bespoke React portals, design wireframes, and integration structures.' },
    { name: 'Fiverr', rating: 'Top Rated Standard', jobSuccess: '98%+ Delighted Returns', desc: 'Crafting responsive high-conversion landing pages, customized CMS frameworks, and workflow automation guides.' },
    { name: 'Direct Client Cooperations', rating: 'Retainer Engagements', jobSuccess: 'End-to-End Delivery', desc: 'Building secure SaaS prototypes, full-stack portals, and comprehensive corporate business databases.' }
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            PROFESSIONAL CREDENTIALS 
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Professional Journey
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* Master Double-Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline & Platform Focus */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-12"
          >
            
            {/* Horizontal timeline tab controls */}
            <div className="flex flex-wrap gap-2 border-b border-purple-500/10 pb-4">
              {(['all', 'Freelance', 'Direct Clients', 'Education'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-purple-500/20 text-white border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]' 
                      : 'text-gray-400 border border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Timelines Cards */}
            <div className="space-y-6">
              {filteredTimeline.map((evt) => (
                <div
                  key={evt.id}
                  className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-purple-500/35 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 py-1.5 px-4 bg-purple-500/10 border-bl border-purple-500/20 text-[10px] font-mono text-purple-300 uppercase tracking-widest rounded-bl-xl">
                    {evt.type}
                  </div>
                  
                  <span className="font-mono text-xs text-purple-400 font-semibold">{evt.year}</span>
                  <h3 className="font-display font-bold text-lg text-white mt-1 group-hover:text-purple-300 transition-colors duration-200">
                    {evt.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-400 mt-1 uppercase tracking-wide">
                    {evt.organization}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3 font-light leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Platforms Trust Badges */}
            <div className="space-y-4 pt-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white mb-4">
                PLATFORM ECOSYSTEM
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {freelancePlatforms.map((plat, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-xl border border-purple-500/10">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm text-purple-300 uppercase">
                        {plat.name}
                      </span>
                      <Star className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    </div>
                    <div className="flex items-center space-x-1.5 mt-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[9px] text-gray-300 uppercase tracking-widest">
                        {plat.rating}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-gray-400 mt-2 leading-relaxed">
                      {plat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Key Expertise lists */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 space-y-8 lg:sticky lg:top-28"
          >
            
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center space-x-2.5 mb-6">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-widest">
                  Expertise Spectrum
                </h3>
              </div>
              
              <div className="space-y-8">
                {EXPERTISE_CATEGORIES.map((cat, i) => (
                  <div key={i} className="space-y-3.5">
                    <h4 className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-widest border-b border-purple-500/10 pb-1.5">
                      {cat.title}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/25 text-xs text-gray-200 hover:text-white transition-all duration-200 cursor-default flex items-center space-x-1.5 group/expertise"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action consult banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-purple-300 block">DO YOU HAVE A READY PROJECT?</span>
                <p className="font-display font-medium text-xs text-white mt-1">Let's coordinate an executive review of your website.</p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-transform duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                Inquire
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
