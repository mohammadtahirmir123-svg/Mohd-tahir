import React, { useState } from 'react';
import { TESTIMONIALS, CLIENT_RESULTS, BRAND_LOGOS } from '../data';
import { Star, MessageSquare, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ClientSuccess() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="client-success" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            STRATEGIC IMPACT MATRIX 
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Helping Businesses Grow
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* 1. Infinite Horizontal Logos Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full overflow-hidden py-10 border-y border-purple-500/10 mb-20 bg-[#03000b]/50"
        >
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#04010f] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#04010f] to-transparent z-10 pointer-events-none" />

          {/* Marquee Row */}
          <div className="flex w-[200%] animate-marquee animate-marquee-hover items-center">
            {/* Duplicated list of brand tags for perfect seamless infinite scroll */}
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-center space-y-1 select-none cursor-default py-1 px-8 group"
              >
                <span className="font-display font-extrabold text-[#f3f4f6] text-xl tracking-tighter uppercase group-hover:text-purple-400 transition-colors">
                  {logo.name}
                </span>
                <span className="font-mono text-[8px] text-gray-500 group-hover:text-purple-400/60 uppercase tracking-widest transition-colors">
                  {logo.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Double Column Bento Grid: Left results list, Right sliding testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Business Growth Results (6 wide) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center space-x-2.5 mb-8">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                    Validated Growth Statistics
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {CLIENT_RESULTS.map((res, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 transition-colors duration-300">
                      <p className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                        {res.metric}
                      </p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed font-sans font-light">
                        {res.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-10 pt-6 border-t border-purple-500/10 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#f3f4f6]">
                  Standard verified audited achievements
                </span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Sliding Testimonial block (6 wide) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                    Client Testimonials
                  </h3>
                </div>

                {/* Rating Stars */}
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  ))}
                </div>
              </div>

              {/* Slider Body */}
              <div className="relative z-10 flex-1 flex flex-col justify-center my-6">
                <p className="font-display text-lg sm:text-xl text-[#f3f4f6] italic leading-relaxed font-light quote-text">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">
                      {TESTIMONIALS[activeTestimonial].role} // {TESTIMONIALS[activeTestimonial].company}
                    </span>
                  </div>

                  {/* Navigator Buttons */}
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-lg bg-white/5 border border-purple-500/10 text-gray-400 hover:text-white hover:border-purple-500/25 transition-all cursor-pointer"
                      aria-label="Previous Testimonial"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-lg bg-white/5 border border-purple-500/10 text-gray-400 hover:text-white hover:border-purple-500/25 transition-all cursor-pointer"
                      aria-label="Next Testimonial"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bullet tracker indicators */}
              <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-center space-x-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeTestimonial === idx
                        ? 'bg-purple-500 w-6 shadow-[0_0_8px_#a855f7]'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label={`Testimonial slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
