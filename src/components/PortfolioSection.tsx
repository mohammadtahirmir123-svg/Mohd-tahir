import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Target, Cpu, Layout, Award, Check, Plus, FolderPlus, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendPushNotification } from '../lib/pushNotifications';

export default function PortfolioSection() {
  const [allProjects, setAllProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages'>('All');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  // Custom Project creation form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages'>('Websites');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [results, setResults] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  const handleAutofillTemplate = () => {
    const templates = [
      {
        title: 'Neural Core Automation Pipeline',
        category: 'AI Automation' as const,
        description: 'Synchronized telemetry routing microservices connected to local neural agent meshes.',
        tech: 'Vite, React, TypeScript, Python, Tailwind',
        results: 'Autonomous decision pipelines latency cut down to 12ms flat with stable offline fallback.',
        liveUrl: '#',
      },
      {
        title: 'Quantum SaaS Finance Dashboard',
        category: 'Websites' as const,
        description: 'Immersive ledger visualizer reporting multi-chain transactions with secure vector processing.',
        tech: 'NextJS, D3.js, Tailwind, Web3, Rust',
        results: 'Simultaneous transaction capacity scaled up by 25k commands/sec.',
        liveUrl: '#',
      },
      {
        title: 'Cortex Immersive User Experience',
        category: 'UI/UX' as const,
        description: 'Bento grid responsive layout design representing deep-space network maps.',
        tech: 'Figma, Spline 3D, Framer Motion, HTML5',
        results: 'Aura focus retention metric scored a whopping +74% during testing loops.',
        liveUrl: '#',
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    setTitle(pick.title);
    setCategory(pick.category);
    setDescription(pick.description);
    setTechInput(pick.tech);
    setResults(pick.results);
    setLiveUrl(pick.liveUrl);
  };

  const categories: ('All' | 'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages')[] = [
    'All', 'Websites', 'UI/UX', 'AI Automation', 'Graphic Design', 'Branding', 'Landing Pages'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Dynamic blurred core halos */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-purple-900/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[130px] pointer-events-none" />

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
            VERIFIED OUTCOMES & ARTIFACTS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Creative Portfolio
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Delivering intuitive layouts, highly interactive visual experiences, and high-productivity automate modules.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* Filter Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto border-b border-purple-500/10 pb-6"
        >
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
        </motion.div>

        {/* Dynamic Project Adding Activator Control Card */}
        <div className="flex flex-col items-center justify-center mb-12">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-5 py-3 rounded-xl bg-[#090422] border border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.06)] hover:shadow-[0_0_25px_rgba(168,85,247,0.22)] transition-all flex items-center space-x-2 cursor-pointer group uppercase tracking-widest text-[10px] font-black text-purple-300"
          >
            <FolderPlus className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>{isFormOpen ? "DISMISS REGISTRY FORM" : "DEPLOY CUSTOM PORTFOLIO PROJECT"}</span>
          </button>
        </div>

        {/* Collapsible Form Card */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, type: 'spring', damping: 18 }}
              className="mb-16 max-w-2xl mx-auto bg-[#070318]/90 border border-purple-500/25 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)] text-left"
            >
              <div className="flex items-center justify-between mb-5 border-b border-purple-500/10 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <FolderPlus className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <span className="font-mono text-[7px] font-bold tracking-widest text-[#a855f7] uppercase block">
                      SYSTEM INTEGRATION
                    </span>
                    <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                      Project Registry Form
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAutofillTemplate}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[8.5px] font-mono text-purple-300 font-bold tracking-wider hover:bg-purple-500/20 transition-all cursor-pointer flex items-center space-x-1 uppercase"
                >
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Autofill Sample Template</span>
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!title.trim() || !description.trim()) {
                    alert('Please fill out the Title and Description fields.');
                    return;
                  }

                  const techArray = techInput
                    ? techInput.split(',').map(t => t.trim())
                    : ['Vite', 'React', 'TypeScript', 'Tailwind'];

                  const newProject: Project = {
                    id: `project-${Date.now()}`,
                    title: title.trim(),
                    category: category,
                    description: description.trim(),
                    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop',
                    tech: techArray,
                    results: results.trim() || 'Process automation latency slashed by 45%. System operational efficiency scaled by 3.4x.',
                    liveUrl: liveUrl.trim() || '#',
                  };

                  setAllProjects(prev => [newProject, ...prev]);
                  setIsFormOpen(false);

                  // Reset
                  setTitle('');
                  setDescription('');
                  setTechInput('');
                  setResults('');
                  setLiveUrl('');

                  // Fire Push Notification via service worker
                  sendPushNotification(
                    "📅 NEW PORTFOLIO MODULE ADDED",
                    `Project "${newProject.title}" has been added to ${newProject.category} successfully. Recalibrated.`
                  ).catch(err => console.warn("Service worker push notification offline:", err));
                }} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title field */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-1.5">
                      PROJECT TITLE *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Cognitive Router Engine"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none outline-transparent outline-0 transition-all font-sans"
                    />
                  </div>

                  {/* Category dropdown Selection */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-1.5">
                      TARGET CATEGORY
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-[#0a0521] border border-purple-500/20 focus:border-purple-400/50 rounded-xl px-3 py-2.5 text-xs text-white outline-none transition-all cursor-pointer"
                    >
                      <option value="Websites">Websites</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Branding">Branding</option>
                      <option value="Landing Pages">Landing Pages</option>
                    </select>
                  </div>
                </div>

                {/* Description field */}
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-1.5">
                    DEVELOPMENT DESCRIPTION *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide a concise engineering description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all font-sans resize-none"
                  />
                </div>

                {/* Tech stack items input */}
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-1.5">
                    TECH STACK SPECIFICATION (COMMA-SEPARATED)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, Tailwind CSS, Lucide Icons, Rust"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all font-sans"
                  />
                </div>

                {/* Outcomes / Results */}
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-1.5">
                    ACHIEVED PERFORMANCE OUTCOMES
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +240% throughput, bandwidth constraints optimized."
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-gradient-to-r from-purple-600 via-[#8b5cf6] to-indigo-600 hover:from-purple-500 text-xs font-bold text-white tracking-widest uppercase rounded-xl border border-white/10 shadow-[0_4px_18px_rgba(168,85,247,0.25)] flex items-center justify-center space-x-2 cursor-pointer transition-transform duration-300 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-purple-200" />
                  <span>SUBMIT MODULE TO REGISTRY</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {filteredProjects.map((p, index) => {
            const isActive = activeCardId === p.id;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 15, translateZ: -100 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5, zIndex: 20, y: -10 }}
                key={p.id}
                onMouseEnter={() => setActiveCardId(p.id)}
                onMouseLeave={() => setActiveCardId(null)}
                className="glass-panel p-5 rounded-3xl flex flex-col justify-between group relative overflow-visible transition-colors duration-500 hover:border-purple-400/60 hover:shadow-[0_30px_60px_rgba(168,85,247,0.3)] hover:bg-[#08041a]/80 cursor-pointer transform-gpu"
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

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
