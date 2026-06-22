import React, { useState } from 'react';
import { SERVICES } from '../data';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Dynamic Icon Renderer
  const renderIcon = (name: string, className: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Decorative backdrop lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_48px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            CAPABILITY BLUEPRINTS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Specialized Services
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Unifying high-fidelity visual design, robust full-stack development, and autonomous AI automation systems.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* Bento Board Service Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-[1000px]">
          {SERVICES.map((srv, index) => {
            const isHovered = hoveredCard === srv.id;
            const isExpanded = expandedCard === srv.id;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5, zIndex: 10 }}
                key={srv.id}
                onMouseEnter={() => setHoveredCard(srv.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`glass-panel p-8 rounded-3xl relative overflow-hidden transition-colors duration-300 flex flex-col justify-between group cursor-pointer ${
                  isExpanded 
                    ? 'border-purple-500 bg-purple-950/20 shadow-[0_0_30px_rgba(168,85,247,0.2)] lg:col-span-1' 
                    : 'hover:border-purple-500/40 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]'
                }`}
                onClick={() => setExpandedCard(isExpanded ? null : srv.id)}
              >
                {/* Visual interactive indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">
                    {isExpanded ? 'SIMPLIFY' : 'DECODE DETAILS'}
                  </span>
                  <Icons.ChevronRight 
                    className={`w-3.5 h-3.5 text-purple-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'
                    }`} 
                  />
                </div>

                {/* Left gradient glow */}
                <div 
                  className={`absolute -left-20 -top-20 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-20 ${
                    isHovered ? 'opacity-40 scale-125' : ''
                  }`} 
                  style={{
                    backgroundColor: srv.id.charCodeAt(1) % 2 === 0 ? '#a855f7' : '#6366f1'
                  }}
                />

                <div className="relative z-10">
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center mb-6 group-hover:border-purple-500/50 group-hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
                    {renderIcon(srv.iconName, "w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300")}
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-white tracking-wide uppercase">
                    {srv.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm mt-3 font-light leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Progressive detailed list disclosure */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden mt-6 space-y-2.5 ${
                      isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="h-[1px] w-full bg-purple-500/15 mb-4" />
                    {srv.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_4px_#a855f7]" />
                        <span className="font-sans leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-purple-500/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-purple-500/60 group-hover:text-purple-400 font-bold">
                    [ // 0{srv.id.replace('s', '')} ]
                  </span>
                  <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider">
                    PRO LEVEL SOLUTION
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
