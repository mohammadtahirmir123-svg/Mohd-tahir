import React, { useState } from 'react';
import { Target, Award, Shield, Cpu, BookOpen, Send, UserCheck, Terminal, FileCode, Braces, Settings, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'agent' | 'stack' | 'status'>('agent');

  const configTabs = {
    agent: {
      filename: 'Agent.ts',
      icon: <FileCode className="w-3.5 h-3.5 text-purple-400 font-bold" />,
      code: [
        { label: 'class', text: ' AIAgent {', color: 'text-purple-400' },
        { label: '  name:', text: ' "Mohd Tahir"', color: 'text-emerald-400 font-semibold' },
        { label: '  role:', text: ' "AI Architect"', color: 'text-indigo-400 font-semibold' },
        { label: '  xp:', text: ' "+3 Years"', color: 'text-amber-400 font-semibold' },
        { label: '  focus:', text: ' ["Automation", "Web"]', color: 'text-blue-400' },
        { label: '  status:', text: ' "Active_Online"', color: 'text-pink-400 font-semibold' },
        { label: '}', text: '', color: 'text-purple-400' },
      ]
    },
    stack: {
      filename: 'Stack.json',
      icon: <Braces className="w-3.5 h-3.5 text-indigo-400 font-bold" />,
      code: [
        { label: '  frontend:', text: ' ["React", "TS", "Twin"]', color: 'text-purple-400' },
        { label: '  backend:', text: ' ["Node", "Express"]', color: 'text-indigo-400' },
        { label: '  ai_models:', text: ' ["Gemini", "OpenAI"]', color: 'text-emerald-400' },
        { label: '  nocode:', text: ' ["Make", "n8n"]', color: 'text-blue-400' },
        { label: '  design:', text: ' ["Figma", "PS"]', color: 'text-pink-400' },
      ]
    },
    status: {
      filename: 'Status.sh',
      icon: <Terminal className="w-3.5 h-3.5 text-emerald-400 font-bold" />,
      code: [
        { label: '  $ ', text: 'systemctl status agent', color: 'text-gray-400 font-mono' },
        { label: '  ▶ ', text: 'Active: active (online)', color: 'text-emerald-400 font-bold' },
        { label: '  ▶ ', text: 'Uptime: 99.98% / SLA', color: 'text-blue-400' },
        { label: '  ▶ ', text: 'Deployment: SLA_VERIFIED', color: 'text-purple-400 font-bold' },
        { label: '  ▶ ', text: 'LCP_Metric: 95% Optimized', color: 'text-amber-400' },
      ]
    }
  };

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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          id="about-header" 
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            IDENTITY CONTEXT
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Who I Am
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: System Config Terminal (col-span-4) - Completely Faceless Tech Display */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-between glass-panel p-5 rounded-3xl relative overflow-hidden group select-none"
          >
            {/* Ambient code background layout glow */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="w-full flex-1 flex flex-col">
              {/* Terminal Title Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-500/10">
                <span className="font-mono text-[9px] text-purple-400 font-bold uppercase tracking-widest flex items-center space-x-1.5">
                  <Terminal className="w-3 h-3 animate-pulse text-purple-400" />
                  <span>Interactive Workspace</span>
                </span>
                <span className="font-mono text-[8px] text-gray-500">v3.4.15</span>
              </div>

              {/* IDE Tabs */}
              <div className="flex items-center space-x-1.5 mb-3 bg-black/45 p-1.5 rounded-lg border border-purple-500/5">
                {(Object.keys(configTabs) as Array<keyof typeof configTabs>).map((tabKey) => {
                  const t = configTabs[tabKey];
                  const active = activeTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-md font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                        active
                          ? 'bg-purple-500/15 border border-purple-500/30 text-white font-bold shadow-md'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-purple-500/5 border border-transparent'
                      }`}
                    >
                      {t.icon}
                      <span>{t.filename}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code window */}
              <div className="relative flex-1 min-h-[300px] bg-black/60 border border-purple-500/15 rounded-xl p-4 font-mono text-[10.5px] leading-relaxed text-left overflow-auto group-hover:border-purple-500/35 transition-colors duration-500">
                {/* Visual scanlines context */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.03)_2%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-10" />
                
                <div className="space-y-2 relative z-10">
                  {configTabs[activeTab].code.map((line, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-purple-500/30 text-right w-6 pr-2 select-none text-[9px] border-r border-purple-500/5 mr-3">
                        {idx + 1}
                      </span>
                      <div className="flex-1 whitespace-pre-wrap">
                        <span className="text-purple-400 font-semibold">{line.label}</span>
                        <span className={line.color}>{line.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="mt-4 pt-4 border-t border-purple-500/10 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest font-bold">NODE_HEALTH // STABLE</span>
              </div>
              <span className="font-mono text-[8px] text-purple-400 font-bold uppercase tracking-widest flex items-center space-x-1">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                <span>MT_SYSTEM_LIVE</span>
              </span>
            </div>
          </motion.div>
          
          {/* Column 2: Paragraph Story (col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group"
          >
            {/* Tech details absolute card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex py-1 px-3 rounded-full bg-purple-900/25 border border-purple-500/20 text-xs font-mono text-purple-300 mb-6">
                MOHD TAHIR — GLOBAL MISSION
              </div>
              
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-6">
                Transforming Ambitions Into Dynamic Realities
              </h3>
              
              <div className="space-y-5 text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
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
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-purple-500/10">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">AESTHETIC LEVEL</span>
                <p className="font-display font-bold text-[11px] text-gray-200 mt-1">Agency-First</p>
              </div>
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">SPEEDMETRICS</span>
                <p className="font-display font-bold text-[11px] text-gray-200 mt-1">95%+ LCP</p>
              </div>
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">INTEGRATION</span>
                <p className="font-display font-bold text-[11px] text-gray-200 mt-1">AI Autonomous</p>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Key Pillars list (col-span-3) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3 flex flex-col justify-between space-y-4"
          >
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-center"
              >
                {/* Visual corner node index */}
                <span className="absolute top-2.5 right-3.5 font-mono text-[8px] text-purple-500/40 font-bold">
                  PILLAR 0{idx + 1}
                </span>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all duration-300 shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[11px] uppercase text-white tracking-wider">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-450 text-[11px] mt-1.5 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
