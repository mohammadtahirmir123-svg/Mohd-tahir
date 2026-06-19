import React from 'react';
import { Target, Award, Shield, Cpu, BookOpen, Send } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: 'Technology Integrated',
      desc: 'Building responsive full-stack websites paired with complex autonomous AI helper workflows to scale startups.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      title: 'Industry Education',
      desc: 'Teaching practical digital workshops that help freelancers configure profiles, win bids, and build skills.',
    },
    {
      icon: <Target className="w-6 h-6 text-pink-400" />,
      title: 'Opportunity Bridge',
      desc: 'Empowering ambitious operators to transform raw designs into cashflow streams and high-earning jobs.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Decorative vectors in the background */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-[300px] h-[300px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Futuristic alignment accent line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-16 w-[1px] bg-gradient-to-b from-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div id="about-header" className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            IDENTITY CONTEXT
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Who I Am
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Large Left Column: Paragraph Story */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden group">
            {/* Tech details absolute card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex py-1 px-3 rounded-full bg-purple-900/25 border border-purple-500/20 text-xs font-mono text-purple-300 mb-6">
                MOHD TAHIR — GLOBAL MISSION
              </div>
              
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-6">
                Transforming Ambitions Into Dynamic Software Realities
              </h3>
              
              <div className="space-y-6 text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  My name is <strong className="text-white font-medium">Mohd Tahir</strong>, a passionate technology professional with over 3 years of experience in web design, web development, UI/UX design, AI automation, graphic design, and digital skills training.
                </p>
                <p>
                  I help individuals, startups, and businesses transform ideas into modern digital products. Through practical training and real-world implementation, I teach valuable digital skills that help people earn online and grow professionally.
                </p>
                <p>
                  My mission is to <strong className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent font-medium">bridge the gap between technology and opportunity</strong> by providing industry-focused education and professional full-stack services.
                </p>
              </div>
            </div>

            {/* Micro credentials block */}
            <div className="grid grid-cols-3 gap-4 mt-8 sm:mt-12 pt-8 border-t border-purple-500/10">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">AESTHETIC LEVEL</span>
                <p className="font-display font-semibold text-sm text-gray-200 mt-1">Agency-First</p>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">SPEEDMETRICS</span>
                <p className="font-display font-semibold text-sm text-gray-200 mt-1">95%+ LCP</p>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">INTEGRATION</span>
                <p className="font-display font-semibold text-sm text-gray-200 mt-1">AI Autonomous</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Visual corner node index */}
                <span className="absolute top-3 right-4 font-mono text-[9px] text-purple-500/40 font-bold">
                  PILLAR // 0{idx + 1}
                </span>

                <div className="flex items-start space-x-4">
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
