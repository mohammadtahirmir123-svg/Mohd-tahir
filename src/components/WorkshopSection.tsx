import React, { useState } from 'react';
import { WORKSHOP_TOPICS, WORKSHOP_BENEFITS } from '../data';
import { 
  BookOpen, Award, CheckCircle, Flame, Star, Sparkles, Terminal, 
  User, Mail, ArrowUpRight, Cpu, Layers, HardDrive, ShieldCheck, 
  Activity, Check, RotateCcw, ArrowRight, ArrowDown, HelpCircle, FileText
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WorkshopSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 'beginner',
    track: 'AI Automation & Architecture',
    motivation: ''
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsRegistering(true);

    try {
      // Send notification request
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'academy',
          ...formData
        })
      });
    } catch (err) {
      console.error("Failed to transmit registration", err);
    }

    // Simulate network delay for UX
    setTimeout(() => {
      setIsRegistering(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        experience: 'beginner',
        track: 'AI Automation & Architecture',
        motivation: ''
      });
    }, 1500);
  };

  return (
    <section id="workshop" className="py-24 sm:py-32 relative text-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[#03000b]" />
      
      {/* Decorative ambient lights */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-indigo-950/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            LEARN DIGITAL ART & AUTOMATION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight flex items-center justify-center flex-wrap gap-3">
            Skill Training & Admission
            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
          </h2>
          <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto font-light leading-relaxed">
            I teach practical digital programs to help freelancers, creators, and business minds scale their tech stack and build active streams of revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
          
          {/* Information Side */}
          <div className="space-y-10">
            {/* Benefits */}
            <div className="bg-[#0a0518]/60 border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-[100px] pointer-events-none" />
              <h3 className="font-display font-bold text-xl text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                Why Join The Academy?
              </h3>
              <ul className="space-y-4">
                {WORKSHOP_BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white block">{benefit.title}</strong>
                      {benefit.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics */}
            <div className="bg-[#0a0518]/60 border border-purple-500/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Syllabus Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {WORKSHOP_TOPICS.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 text-gray-300 font-mono text-[10px] uppercase tracking-wider"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-[#0a0518]/80 border border-purple-500/20 p-8 rounded-3xl relative backdrop-blur-md shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-3xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-purple-400" />
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                Secure Registration
              </h3>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-2 uppercase">Request Received</h4>
                <p className="text-gray-400 text-sm mb-8">
                  Your admission profile has been successfully evaluated. I will review your choices and reach out to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-xl border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-widest hover:bg-purple-500/10 transition-colors cursor-pointer"
                >
                  Register Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                      Current level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value as any })}
                      className="w-full bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans appearance-none"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="pro">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                      Focus Track
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans appearance-none"
                    >
                      <option value="AI Automation & Architecture">AI Automation</option>
                      <option value="Full-Stack Web Design">Full-Stack Design</option>
                      <option value="Freelancing & Clients">Freelancing</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                    What is your core motivation?
                  </label>
                  <textarea
                    placeholder="Tell me what you're trying to build or achieve..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full h-24 bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isRegistering}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all overflow-hidden relative flex flex-col items-center justify-center cursor-pointer ${
                    isRegistering 
                      ? 'bg-purple-900/40 text-purple-400 border border-purple-500/30 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  <div className={`transition-transform duration-300 ${isRegistering ? '-translate-y-8 absolute opacity-0' : 'translate-y-0 opacity-100 flex items-center space-x-2'}`}>
                    <span>Submit Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className={`transition-transform duration-300 flex items-center space-x-2 ${isRegistering ? 'translate-y-0 opacity-100' : 'translate-y-8 absolute opacity-0'}`}>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
