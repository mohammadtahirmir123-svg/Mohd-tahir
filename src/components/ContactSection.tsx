import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink, Globe, Calendar, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const servicesList = [
    'Web Design',
    'Web Development',
    'UI/UX Design',
    'AI Automation',
    'Graphic Design',
    'Digital Skills Training',
    'Other Inquiry'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          details: {
            service: formData.service,
            message: formData.message,
          }
        })
      });
    } catch (err) {
      console.error("Failed to post notification lead:", err);
    }

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', service: 'Web Development', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#04010f] overflow-hidden">
      {/* Visual lighting background overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/10 right-1/10 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Alignment lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_40px] pointer-events-none" />

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
            SYNTAX PIPELINE ROUTING
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Book Free Consultation
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            "Ready to elevate your digital presence? Submit your request details below and let's craft an executive roadmap."
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </motion.div>

        {/* Master Double-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Direct Coordinates (5 wide) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-8">
                  <Calendar className="w-5 h-5 text-purple-400 animate-pulse" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                    Direct Coordinates
                  </h3>
                </div>

                {/* Information cards */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4 group/contact-info">
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/15 group-hover/contact-info:border-purple-400/40 text-purple-300 transition-colors">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">EMAIL INBOX</span>
                      <a href="mailto:mohammadtahirmir123@gmail.com" className="text-white hover:text-purple-300 font-medium text-xs sm:text-sm mt-0.5 transition-colors block">
                        mohammadtahirmir123@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp/Phone */}
                  <div className="flex items-start space-x-4 group/contact-info">
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/15 group-hover/contact-info:border-purple-400/40 text-purple-300 transition-colors">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">TELECOMMUNICATIONS</span>
                      <a href="https://wa.me/916005820321" className="text-white hover:text-purple-300 font-medium text-xs sm:text-sm mt-0.5 transition-colors block">
                        +91 60058 20321
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4 group/contact-info">
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/15 group-hover/contact-info:border-purple-400/40 text-purple-300 transition-colors">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">LOCATION BASE</span>
                      <p className="text-white font-medium text-xs sm:text-sm mt-0.5">
                        Jammu & Kashmir, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links grid strip */}
              <div className="mt-12 pt-8 border-t border-purple-500/10">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-4">
                  REPRESENTATIVE PORTALS
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://upwork.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white transition-all group"
                  >
                    <span>Upwork</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="https://fiverr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white transition-all group"
                  >
                    <span>Fiverr</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="https://instagram.com/1amtahir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white transition-all group"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white transition-all group"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white transition-all group"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Custom Interactive Booking Form (7 wide) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {submitStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <CheckCircle className="w-8 h-8 text-purple-400 animate-bounce" />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wider">
                    Pipeline Synced!
                  </h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm mt-3 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you! Your request was sent instantly to Mohammad Tahir's contact via SMS and Email. He receives these alerts within 1 second and will respond to you right away!
                  </p>

                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 px-6 py-2.5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 text-xs font-mono font-bold uppercase tracking-widest text-[#f3f4f6] hover:text-white bg-purple-500/5 hover:bg-purple-500/15 transition-all flex items-center space-x-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                    <span>Submit New Brief</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-5">
                    {/* Two Column Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-500/5 border border-purple-500/15 focus:border-purple-500 text-white text-xs placeholder-gray-500 focus:outline-none transition-colors"
                          placeholder="David Vance"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">
                          Primary Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-500/5 border border-purple-500/15 focus:border-purple-500 text-white text-xs placeholder-gray-500 focus:outline-none transition-colors"
                          placeholder="client@growthtech.com"
                        />
                      </div>
                    </div>

                    {/* Service Category selector */}
                    <div>
                      <label htmlFor="service" className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">
                        Core System Requirement
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#03000b] border border-purple-500/15 focus:border-purple-500 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                      >
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv} className="bg-[#030014] text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Requirements detailing */}
                    <div>
                      <label htmlFor="message" className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">
                        Describe Project Scope & Objectives *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl bg-purple-500/5 border border-purple-500/15 focus:border-purple-500 text-white text-xs placeholder-gray-500 focus:outline-none transition-colors resize-none"
                        placeholder="Outline parameters, targets, timeline limits, technology preferences, or details..."
                      />
                    </div>
                  </div>

                  {/* Submission dispatch */}
                  <div className="pt-6 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-[9px] text-gray-500 uppercase">
                      SECURED END-TO-END // SSL CERTIFIED
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3.5 font-semibold text-white text-xs tracking-widest uppercase rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/20 flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SYNCHRONIZING...</span>
                        </>
                      ) : (
                        <>
                          <span>Dispatch Consultation Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
