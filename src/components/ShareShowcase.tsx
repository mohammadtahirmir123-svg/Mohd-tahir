import React, { useState, useEffect } from 'react';
import { Share2, Copy, Check, QrCode, ExternalLink, Mail, MessageSquare, Shield, X, Globe, Send, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ShareShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'email'>('link');

  const portfolioUrl = 'https://ais-pre-iczgn5f5w4mwevnzvimstj-937327379127.asia-east1.run.app';
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out Mohammad Tahir Mir's elite Full-Stack & AI portfolio: ${portfolioUrl}`
  )}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    'Portfolio: Mohammad Tahir'
  )}&body=${encodeURIComponent(
    `Hey,\n\nCheck out the portfolio of Mohammad Tahir, an elite AI Architect & Full-Stack Developer: ${portfolioUrl}\n\nBest,`
  )}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  // Close with Escape key & listen to global open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleOpenEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-share-hub', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-share-hub', handleOpenEvent);
    };
  }, []);

  return (
    <>
      {/* Floating Action Button Trigger - Adjusted to left side to avoid overlap with Hey Tahir AI agent */}
      <div className="fixed bottom-6 left-6 sm:left-8 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-10 h-10 bg-[#0a0518]/90 border border-purple-500/40 hover:border-purple-400 text-white rounded-full shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]"
          title="Share Hub"
        >
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <Share2 className="w-4.5 h-4.5 text-purple-400" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#0a0518]/95 border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] p-6 sm:p-8 text-left font-sans"
            >
              {/* Scanlines matrix layer */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.03)_2%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />

              {/* Header Title Grid */}
              <div className="flex items-start justify-between border-b border-purple-500/15 pb-4 mb-6 relative z-10">
                <div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple-400 font-bold">
                      EXECUTIVE SHARE CONSOLE
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1 uppercase tracking-wider">
                    Showcase & Pitch Links
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-purple-500/5 hover:bg-purple-500/15 text-gray-400 hover:text-white transition-colors border border-purple-500/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Subtabs for Share channels */}
              <div className="flex items-center space-x-2 bg-black/45 p-1 rounded-xl border border-purple-500/10 mb-6 relative z-10 font-mono text-[10px]">
                <button
                  onClick={() => setActiveTab('link')}
                  className={`flex-1 py-2 text-center rounded-lg uppercase tracking-wider transition-all ${
                    activeTab === 'link'
                      ? 'bg-purple-500/15 border border-purple-500/25 text-white font-bold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Direct Link
                </button>
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 py-2 text-center rounded-lg uppercase tracking-wider transition-all ${
                    activeTab === 'qr'
                      ? 'bg-purple-500/15 border border-purple-500/25 text-white font-bold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  QR Code
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex-1 py-2 text-center rounded-lg uppercase tracking-wider transition-all ${
                    activeTab === 'email'
                      ? 'bg-purple-500/15 border border-purple-500/25 text-white font-bold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Quick Share
                </button>
              </div>

              {/* Tab Contents: Link copy */}
              {activeTab === 'link' && (
                <div className="space-y-4 relative z-10">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Share this verified link directly with corporate scouts, clients, and partners to showcase live AI systems, services, and credentials.
                  </p>

                  <div className="bg-black/60 border border-purple-500/20 p-3 sm:p-4 rounded-xl flex items-center justify-between select-all font-mono text-[11px] sm:text-xs">
                    <span className="text-purple-300 truncate mr-3">{portfolioUrl}</span>
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold shrink-0 transition-all ${
                        copied
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-white'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab Contents: QR Code */}
              {activeTab === 'qr' && (
                <div className="flex flex-col items-center space-y-4 relative z-10 text-center">
                  <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                    Open your smart device camera to scan and visit the portfolio immediately. Ideal for presenting during physical conferences, meetings, or tablets.
                  </p>

                  {/* QR Core frame */}
                  <div className="relative p-3 bg-[#0a0518] rounded-2xl border border-purple-500/30 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)] flex items-center justify-center">
                    {/* Targeting lasers layout deco */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-purple-400/80" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-purple-400/80" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-purple-400/80" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-purple-400/80" />
                    
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(portfolioUrl)}&color=a855f7&bgcolor=03000b`}
                      alt="Portfolio Scan QR Code"
                      className="w-40 h-40 select-none pointer-events-none"
                    />
                  </div>
                  <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-bold">
                    SCAN_TARGET // AUTH_ACTIVE
                  </span>
                </div>
              )}

              {/* Tab Contents: Email & Messengers */}
              {activeTab === 'email' && (
                <div className="space-y-4 relative z-10">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Instantly dispatch or post the portfolio presentation via standard business networks or email layouts:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href={emailShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/15 hover:border-purple-500/30 p-4 rounded-xl text-center group transition-all"
                    >
                      <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 mb-2 transition-transform" />
                      <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">Email Invite</span>
                    </a>

                    <a
                      href={waShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/15 hover:border-purple-500/30 p-4 rounded-xl text-center group transition-all"
                    >
                      <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 mb-2 transition-transform" />
                      <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">WhatsApp Direct</span>
                    </a>

                    <a
                      href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/15 hover:border-purple-500/30 p-4 rounded-xl text-center group transition-all"
                    >
                      <Globe className="w-5 h-5 text-indigo-400 group-hover:scale-110 mb-2 transition-transform" />
                      <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">LinkedIn Share</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Additional Value metrics footer inside card */}
              <div className="mt-8 pt-4 border-t border-purple-500/15 flex items-center justify-between font-mono text-[8px] text-gray-500">
                <div className="flex items-center space-x-1">
                  <Terminal className="w-3 h-3 text-purple-500/60" />
                  <span>PRE_SLA_SECURED</span>
                </div>
                <span>HOSTED ON INFRASTRUCTURE CLOUD</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
