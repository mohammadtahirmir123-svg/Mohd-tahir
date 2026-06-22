import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, User, Mail, Check, Sparkles, Send, Flame, Lightbulb, Code, Brain } from 'lucide-react';
import { saveToOfflineCache, getFromOfflineCache } from '../lib/offlineDb';
import { sendPushNotification, requestPushPermission, getPushPermissionStatus } from '../lib/pushNotifications';

interface RegistrationData {
  name: string;
  contact: string;
  interests: string[];
  submittedAt: number;
}

const INTERESTS_OPTIONS = [
  { id: 'ai-agents', label: 'AI Agent & Automation Systems', icon: Brain },
  { id: 'fullstack', label: 'High-Scale Fullstack Development', icon: Code },
  { id: 'acquisition', label: 'Upwork Strategy & Client Acquisition', icon: Flame },
  { id: 'mvp', label: 'SaaS Launch & MVP Prototyping', icon: Lightbulb },
];

export default function AdmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPushEnabled(getPushPermissionStatus() === 'granted');
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Retrieve count of registered students from IndexedDB
      getFromOfflineCache<RegistrationData[]>('academy_registrations')
        .then((existing) => {
          if (existing) {
            setSavedCount(existing.length);
          }
        })
        .catch(() => {});
    };

    window.addEventListener('open-admission-modal', handleOpen);
    return () => window.removeEventListener('open-admission-modal', handleOpen);
  }, []);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      alert("Please provide both your name and contact details.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate extreme system calibration/secure pipeline saving
      await new Promise(resolve => setTimeout(resolve, 800));

      const newRegistration: RegistrationData = {
        name: name.trim(),
        contact: contact.trim(),
        interests: selectedInterests,
        submittedAt: Date.now()
      };

      // Retrieve previous registrations, if any, and append
      const existingRegistrations = await getFromOfflineCache<RegistrationData[]>('academy_registrations') || [];
      const updatedList = [...existingRegistrations, newRegistration];
      
      // Save permanently back to IndexedDB
      await saveToOfflineCache('academy_registrations', updatedList);
      setSavedCount(updatedList.length);

      // Play soft speech melody internally to reinforce sensory immersion
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const now = ctx.currentTime;
          const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Beautiful golden major arpeggio chime)
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.4);
          });
        }
      } catch (err) {
        console.warn("Chime block omitted:", err);
      }

      // Trigger dynamic Push API service worker notification
      sendPushNotification(
        "🎓 ACADEMY SEAT RESERVATION ACTIVE",
        `Hi ${name.split(' ')[0]}! Your professional profile was successfully verified. Code tokens cached locally.`
      ).catch(e => console.warn("Push API rejected or sandbox blocked:", e));

      // Show high-fidelity animated Toast
      setToastMessage(`⚡ System Registered successfully! Welcome, ${name.split(' ')[0]}.`);
      setIsSubmitting(false);
      setIsOpen(false);

      // Reset fields
      setName('');
      setContact('');
      setSelectedInterests([]);

      // Auto dismiss success toast after 4.5 seconds
      setTimeout(() => {
        setToastMessage(null);
      }, 4500);

    } catch (err) {
      console.error("IndexedDB persist failed:", err);
      setIsSubmitting(false);
      alert("Registration failed to write to IndexedDB database store.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#03000b]/85 backdrop-blur-xl"
              id="admission-modal-backdrop"
            />

            {/* Cyberpunk Interactive Form container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#070318]/95 border border-purple-500/25 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] z-10"
              id="admission-modal-container"
            >
              {/* Top ambient progress sweep line */}
              <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                id="admission-close-btn"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-purple-500/15 transition-all text-xs flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Details */}
              <div className="text-left mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-purple-400">OFFLINE SYNC SYSTEM</span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase">
                      ACADEMY REGISTRATION
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Submit your admissions intent secure profile. Validated in real-time and stored locally within high-capacity IndexedDB for permanent validation.
                </p>
              </div>

              {/* Secure Registration form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left" id="academy-registration-form">
                {/* Full name input */}
                <div>
                  <label htmlFor="student-name" className="block text-[10px] font-mono tracking-widest text-purple-300 uppercase mb-2">
                    YOUR VISITOR ID / NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4.5 h-4.5 text-purple-400/50" />
                    <input
                      required
                      type="text"
                      id="student-name"
                      placeholder="e.g. Sarah Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 hover:border-purple-500/35 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-all focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] font-sans"
                    />
                  </div>
                </div>

                {/* Email or Phone contact info */}
                <div>
                  <label htmlFor="student-contact" className="block text-[10px] font-mono tracking-widest text-purple-300 uppercase mb-2">
                    SECURE EMAIL OR PHONE *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-purple-400/50" />
                    <input
                      required
                      type="text"
                      id="student-contact"
                      placeholder="e.g. sarah@cyberdyne.io or WhatsApp"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-[#0a0521]/60 border border-purple-500/20 focus:border-purple-400/50 hover:border-purple-500/35 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-all focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] font-sans"
                    />
                  </div>
                </div>

                {/* Professional Interests options */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-purple-300 uppercase mb-2.5">
                    CATEGORIES OF INTEREST
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTERESTS_OPTIONS.map((opt) => {
                      const isSelected = selectedInterests.includes(opt.id);
                      const IconComp = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          id={`interest-tag-${opt.id}`}
                          onClick={() => toggleInterest(opt.id)}
                          className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/30 border-purple-400/60 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.08)]'
                              : 'bg-black/30 border-purple-500/10 text-gray-400 hover:border-purple-500/25 hover:text-gray-300'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-purple-500/20 text-purple-200' : 'bg-white/5 text-gray-500'
                          }`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold leading-tight">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Push Notification permission card */}
                <div className="bg-[#0b0726]/40 border border-purple-500/15 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="text-left font-sans text-[11px] text-gray-300">
                    <span className="font-semibold block text-white text-xs">Authorize Push Notifications</span>
                    Receive a real-time push alert code upon registration.
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const granted = await requestPushPermission();
                      setPushEnabled(granted);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[8.5px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                      pushEnabled
                        ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300'
                        : 'bg-purple-600 hover:bg-purple-500 border border-[#a855f7]/30 text-white shadow-lg shadow-purple-500/15'
                    }`}
                  >
                    {pushEnabled ? 'ACTIVE ✓' : 'ENABLE'}
                  </button>
                </div>

                {/* Submit button Trigger */}
                <button
                  type="submit"
                  id="admission-submit-btn"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-[#8b5cf6] hover:from-purple-500 hover:to-pink-500 text-xs sm:text-sm font-bold text-white tracking-widest uppercase rounded-xl border border-white/10 shadow-[0_4px_25px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.55)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden relative group"
                >
                  {/* Sweep shimmer effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_20%,white_50%,transparent_80%)] -translate-x-full group-hover:animate-shimmer transition-transform" />
                  
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>DISPATCHING PIPELINE...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-purple-200" />
                      <span>SECURE MY SEAT</span>
                    </>
                  )}
                </button>

                {/* Local DB Status Row */}
                {savedCount > 0 && (
                  <div className="text-center">
                    <span className="font-mono text-[8px] text-purple-400/70 uppercase tracking-widest">
                      ⚡ DATABASE CACHE SYNC: {savedCount} VISITOR SEATS VERIFIED LOCALLY
                    </span>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant glassmorphic floating success Toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 max-w-sm w-full bg-[#0a0521]/90 backdrop-blur-xl border border-emerald-500/40 p-4 rounded-2xl flex items-start space-x-3.5 shadow-[0_10px_35px_rgba(16,185,129,0.15)] overflow-hidden"
            id="toast-admission-success"
          >
            {/* Ambient left bar indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
            
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            
            <div className="flex-1 text-left min-w-0">
              <span className="font-mono text-[8px] font-black tracking-widest text-emerald-400 uppercase block mb-0.5">
                SECURE PIPELINE OK
              </span>
              <p className="text-xs text-emerald-200/90 leading-relaxed font-sans font-medium">
                {toastMessage}
              </p>
              <p className="text-[10px] text-gray-500 font-light mt-1 font-mono">
                IndexedDB ObjectStore updated securely.
              </p>
            </div>

            <button
              id="toast-dismiss-btn"
              onClick={() => setToastMessage(null)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
