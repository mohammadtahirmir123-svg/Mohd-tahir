import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Smartphone, 
  Bell, 
  Check, 
  Copy, 
  Mail, 
  MessageSquare, 
  Globe, 
  X, 
  Shield, 
  Volume2, 
  SmartphoneCharging, 
  Terminal, 
  Activity, 
  Radio, 
  Cpu, 
  Layers,
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  Server,
  CloudLightning,
  Compass
} from 'lucide-react';

interface CustomAlert {
  id: string;
  sender: string;
  category: string;
  message: string;
  timestamp: string;
}

const PRESET_ALERTS: CustomAlert[] = [
  {
    id: 'contract',
    sender: '💼 UPWORK SYSTEM MGR',
    category: 'CLIENT CONTRACT LOCKED',
    message: 'Offer approved: $12,500 retainer signed lock-step by Executive Enterprise Corp.',
    timestamp: 'Just now'
  },
  {
    id: 'academy',
    sender: '🎓 TAHIR AI ACADEMY',
    category: 'ADMISSION COMPLETED',
    message: 'Profile analysis passed. Secure registration token issued for Cohort June 2026.',
    timestamp: 'Just now'
  },
  {
    id: 'system',
    sender: '⚡ SYSTEM CORE COGNITIVE',
    category: 'PIPELINE ACTIVE',
    message: 'Mobile synchronization established. Fast-charging local database index.',
    timestamp: 'Just now'
  }
];

const SANDBOX_CODES = {
  leadGen: {
    title: 'Cognitive Lead Scraper & CRM Sync',
    code: `// Agent class to scan prospect profiles & auto notify Tahir
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI();

async function runLeadScraper() {
  const profile = await scrapeUpworkLead();
  if (profile.budget > 10000) {
    const aiPitch = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      prompt: "Synthesize contract pitch for " + profile.title
    });
    await sendLocalNotification({
      type: "chat_lead",
      details: { pitch: aiPitch.text }
    });
  }
}`,
    steps: [
      '⚡ Initializing Node Thread processes...',
      '📥 Retrieving newest Upwork and freelance contract feeds...',
      '🔍 Found elite bid: "SaaS Enterprise AI Automations" ($14,000 budget)',
      '🧠 Prompting cloud Gemini 3.5-Flash to synthesize premium proposal...',
      '📨 Synced in CRM database indices & emitted SMS alert to Mohd Tahir (+91 60058 20321) successfully.'
    ],
    result: `{
  "status": "synchronized_live",
  "clientCategory": "Enterprise DevOps SaaS",
  "assignedAgent": "HeyTahirAgent v3.9",
  "notified": true,
  "roiProjection": "+75% efficiency gains"
}`
  },
  proposal: {
    title: 'Autonomous Enterprise Proposal Compiler',
    code: `// Generate a customized SLA PDF on Google Drive
async function compileSLAProposal(client) {
  const proposalContent = getCustomProposal({
    companyName: client.name,
    pipeline: client.automationTarget
  });
  
  const driveRef = await uploadToGoogleDrive({
    dest: "/Client Archives/SLA_Proposal_" + client.id,
    data: proposalContent
  });
  
  await sendTahirSmsAlert("Proposal published to Drive: " + driveRef.url);
}`,
    steps: [
      '⚡ Loading Drive oauth connection context token...',
      '📄 Compiling customized enterprise-grade SLA PDF structure...',
      '💾 Outputting directly to secure drive folder: /Client Archives/Strategic_Proposal_GlobalTech.pdf',
      '💬 Instantly transmitting auto-alert notification link to client WhatsApp...'
    ],
    result: `{
  "action": "PROPOSAL_COMPREHENSIVE_COMPILE",
  "file_url": "https://drive.google.com/drive/folders/tahir-portfolio-vault",
  "sla_status": "QUEUED_OUTBOUND",
  "success": true
}`
  },
  auth: {
    title: 'Cognitive Security Shield & DNS Lock',
    code: `// Firewall rule to safeguard microservices
import { blockAnomalousIPs } from "./security-auth";

async function defendDDoSAirspace() {
  const logs = await scanTrafficPatterns();
  if (logs.anomalousPackets > 10000) {
    await blockAnomalousIPs(logs.offendingBlock);
    await triggerAudioSynthesis(440); // Warn system
    await rebootDockerContainers();
  }
}`,
    steps: [
      '⚠️ Scanned 45,000 requests in 250ms interval...',
      '🛡️ Rate-limiting and Geo-Blocking IP blocks 182.16.x.x...',
      '🔧 Analyzing AST logs. Deploying structural syntax patch for memory race condition...',
      '✅ 100% health restored. Router airspace isolated and certified absolute secure.'
    ],
    result: `{
  "firewall_node": "NOMINAL",
  "defense_status": "THREAT_BLOCKED_AND_MITIGATED",
  "active_rules": 45,
  "secure_sla": "99.99% Guaranteed uptime"
}`
  }
};

const GLOBAL_NODES = {
  srinagar: {
    name: 'Srinagar Core Hub (Host Connection)',
    coords: '34.0837° N, 74.7973° E',
    ip: '103.88.243.18',
    latency: '8ms',
    traffic: 'HIGH',
    pingHistory: [12, 10, 8, 9, 8, 11]
  },
  sfo: {
    name: 'Silicon Valley Host Outpost',
    coords: '37.7749° N, 122.4194° W',
    ip: '104.244.42.1',
    latency: '65ms',
    traffic: 'MODERATE',
    pingHistory: [68, 65, 64, 70, 66, 65]
  },
  london: {
    name: 'London Transatlantic Gateway',
    coords: '51.5074° N, 0.1278° W',
    ip: '82.165.1.134',
    latency: '48ms',
    traffic: 'NOMINAL',
    pingHistory: [52, 48, 50, 49, 47, 48]
  },
  tokyo: {
    name: 'Tokyo East Asia Pipeline Endpoint',
    coords: '35.6762° N, 139.6503° E',
    ip: '210.140.10.35',
    latency: '82ms',
    traffic: 'HIGH',
    pingHistory: [85, 82, 84, 88, 83, 82]
  }
};

export default function TelemetryShareCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Advanced Telemetry Levels State
  // Level 1: GATEWAY SYNC (Pairing/Web API)
  // Level 2: TELEMETRY SIMULATION (Push alert injection)
  // Level 3: CORPORATE PITCH HUB (Quick and direct outer share links)
  // Level 4: GLOBAL EDGE ROUTING (Live Kashmir/Srinagar router node matrix)
  // Level 5: AI COGNITIVE SANDBOX (Real-time typescript code execution compiler simulator)
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedPreset, setSelectedPreset] = useState<string>('contract');
  const [isLinked, setIsLinked] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>('default');

  // Level 4 States: Global Routing Map Nodes
  const [selectedNode, setSelectedNode] = useState<'srinagar' | 'sfo' | 'london' | 'tokyo'>('srinagar');
  const [nodePingStatus, setNodePingStatus] = useState<'synced' | 'transmitting' | 'offline'>('synced');
  const [nodeTrafficPackets, setNodeTrafficPackets] = useState(144);

  // Level 5 States: AI Cognitive Sandbox Compiler
  const [activeSandboxScript, setActiveSandboxScript] = useState<'leadGen' | 'proposal' | 'auth'>('leadGen');
  const [isExecutingSandbox, setIsExecutingSandbox] = useState(false);
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([]);
  const [sandboxResult, setSandboxResult] = useState<string>('');
  
  // Custom live system metrics simulating high intensity connection
  const [latency, setLatency] = useState(12);
  const [packetsSent, setPacketsSent] = useState(380);
  const [simulatedNotification, setSimulatedNotification] = useState<CustomAlert | null>(null);

  const portfolioUrl = 'https://ais-pre-iczgn5f5w4mwevnzvimstj-937327379127.asia-east1.run.app';
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out Mohammad Tahir's elite Full-Stack & AI portfolio: ${portfolioUrl}`
  )}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    'Portfolio: Mohammad Tahir'
  )}&body=${encodeURIComponent(
    `Hey,\n\nCheck out the portfolio of Mohammad Tahir, an elite AI Architect & Full-Stack Developer: ${portfolioUrl}\n\nBest,`
  )}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`;

  // Periodic visual simulation to advance realism
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(10 + Math.floor(Math.random() * 8));
      setPacketsSent(prev => prev + Math.floor(Math.random() * 3));
      setNodeTrafficPackets(prev => prev + Math.floor(Math.random() * 4) - 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!('Notification' in window)) {
        setPermissionStatus('unsupported');
      } else {
        setPermissionStatus(Notification.permission);
        if (Notification.permission === 'granted') {
          setIsLinked(true);
        }
      }

      // Handle real cross-component emitted notification requests
      const handlePushEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail) {
          const { title, body } = customEvent.detail;
          
          triggerAudioSynthesis();

          setSimulatedNotification({
            id: String(Date.now()),
            sender: '🧠 TAHIR AI AUTOAGENT',
            category: title,
            message: body,
            timestamp: 'Just now'
          });

          setTimeout(() => {
            setSimulatedNotification(null);
          }, 6000);
        }
      };

      window.addEventListener('phone-push-notification', handlePushEvent);
      return () => {
        window.removeEventListener('phone-push-notification', handlePushEvent);
      };
    }
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      triggerAudioSynthesis(1200); // neat mechanical confirmation tick
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const requestNativePermission = async () => {
    if (!('Notification' in window)) {
      setPermissionStatus('unsupported');
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        setIsLinked(true);
        triggerNativeNotification("⚡ System Synchronized", "Telemetry and mobile sync established with Mohammad Tahir's host environment.");
      }
    } catch (err) {
      console.warn("Iframe playground notification limit met:", err);
    }
  };

  const triggerNativeNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn("Direct Notification constructor fallback:", e);
      }
    }
  };

  const triggerAudioSynthesis = (pitch = 880) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.frequency.setValueAtTime(pitch, now);
        if (pitch === 880) {
          osc.frequency.setValueAtTime(1046.5, now + 0.08); // dynamic double ping code
        }
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {}
  };

  const fireSelectedNotification = () => {
    const alertData = PRESET_ALERTS.find(a => a.id === selectedPreset) || PRESET_ALERTS[0];

    // Play sleek chime
    triggerAudioSynthesis(880);

    // Trigger physical haptic feedback vibrate if device allows
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // Fire native web push if permitted
    if (isLinked) {
      triggerNativeNotification(alertData.sender, `${alertData.category}: ${alertData.message}`);
    }

    // Always render high-fidelity simulator banner on view
    setSimulatedNotification(alertData);

    // Close alert dropdown automatically
    setTimeout(() => {
      setSimulatedNotification(null);
    }, 6000);
  };

  return (
    <>
      {/* 
        Single Unified Level Trigger Button:
        Combines Share & Mobile Indicators while keeping negative space pristine!
      */}
      <div id="unified-telemetry-trigger" className="fixed bottom-6 left-6 sm:left-8 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            triggerAudioSynthesis(1320); // futuristic high key sound
          }}
          className="relative flex items-center space-x-2.5 px-3 py-2 bg-black/90 border border-purple-500/40 hover:border-purple-400 text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] cursor-pointer group"
          title="Telemetry & Share Control Console"
        >
          {/* Pulsing visual halo */}
          <span className="absolute -inset-0.5 rounded-full border border-purple-500/20 animate-ping opacity-60 pointer-events-none" />

          {/* Morphing Combined Icon Tray */}
          <div className="flex items-center space-x-1.5 shrink-0 bg-purple-950/40 border border-purple-500/15 p-1 rounded-full">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="h-2 w-[1px] bg-purple-500/30" />
            <Share2 className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="h-2 w-[1px] bg-purple-500/30" />
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-300 pr-1.5 font-bold hidden xs:inline-block">
            {isLinked ? "Telemetry paired" : "Command sync"}
          </span>

          {/* Core Level badge indicator representing level locks */}
          <div className="bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[8.5px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider hidden sm:block">
            LVL 0{activeLevel}
          </div>
        </button>
      </div>

      {/* Futuristic Command Hub Modal Drawer with Advanced Levels */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md z-10"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#070316]/95 border border-purple-500/30 rounded-[2rem] p-6 sm:p-8 overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] z-20 text-left"
              id="telemetry-hub-panel"
            >
              {/* Sleek top neon spectrum edge strip */}
              <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
              
              {/* Retro scanline screen overlays */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.03)_2%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-purple-500/15 transition-all cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Console Branding Header */}
              <div className="flex items-start space-x-3.5 border-b border-purple-500/15 pb-5 mb-6">
                <div className="relative w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.22em] text-purple-400">
                      Tahir AI Command Hub [Active]
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-wider mt-0.5">
                    Unified Telemetry & Pitch
                  </h3>
                </div>
              </div>

              {/* Live Signal Telemetry strip (Real-time active stats) */}
              <div className="grid grid-cols-3 gap-2 bg-black/45 rounded-xl border border-purple-500/10 p-3 mb-6 text-left relative z-10">
                <div>
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase tracking-widest block font-bold">Warp Latency:</span>
                  <span className="font-mono text-xs text-purple-300 font-bold block mt-0.5">{latency}ms</span>
                </div>
                <div>
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase tracking-widest block font-bold">Link Packets:</span>
                  <span className="font-mono text-xs text-cyan-300 font-bold block mt-0.5">{packetsSent} tx</span>
                </div>
                <div>
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase tracking-widest block font-bold">Secure SLA:</span>
                  <span className="font-mono text-[9px] text-emerald-400 font-bold block mt-1 uppercase tracking-wide">✓ AUTHORIZED</span>
                </div>
              </div>

              {/* Progressive Tabs representing levels requested! ("advanced the levels") */}
              <div className="grid grid-cols-5 gap-1 bg-black/45 p-1 rounded-2xl border border-purple-500/10 mb-6">
                {[
                  { level: 1, flag: "Sync" },
                  { level: 2, flag: "Push" },
                  { level: 3, flag: "Pitch" },
                  { level: 4, flag: "Nodes" },
                  { level: 5, flag: "AI Sandbox" }
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => {
                      setActiveLevel(item.level as 1 | 2 | 3 | 4 | 5);
                      triggerAudioSynthesis(1000 + item.level * 120);
                    }}
                    className={`py-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeLevel === item.level
                        ? 'bg-purple-500/15 border border-purple-500/25 text-white font-bold shadow-[0_4px_12px_rgba(168,85,247,0.1)]'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono text-[8px] uppercase tracking-wider block font-bold">LVL 0{item.level}</span>
                    <span className="font-mono text-[6.5px] text-purple-400/80 uppercase font-extrabold tracking-widest block mt-0.5">
                      {item.flag}
                    </span>
                  </button>
                ))}
              </div>

              {/* LEVEL 1 VIEW: Pairing Connection & Sync Permission */}
              {activeLevel === 1 && (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-purple-950/5 border border-purple-500/10 hover:border-purple-500/20 transition-all">
                    <span className="font-mono text-[8px] font-black tracking-widest text-[#a855f7] uppercase block mb-1">
                      LEVEL 1 TELEMETRY CALIBRATION
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                      Authorize high-priority device synchronization alerts. This initializes real-time background protocols, enabling instant notification triggers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/40 border border-purple-500/10 p-3.5 rounded-xl">
                      <div className="text-left">
                        <span className="font-sans font-bold text-xs text-white block">Web Push Protocol Trigger</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">Integrates web sandbox controls with lockscreen alerts.</p>
                      </div>

                      <button
                        onClick={requestNativePermission}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl font-mono text-[9px] font-black tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                          isLinked
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                            : 'bg-purple-600 hover:bg-purple-500 border border-white/5 text-white'
                        }`}
                      >
                        {isLinked ? 'LINK SECURED ✓' : 'AUTHORIZE PROTOCOL'}
                      </button>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-purple-500/5 flex items-center justify-between text-[8px] font-mono text-gray-500">
                      <span>BROWSER NOTIFICATION API:</span>
                      <span className="text-purple-400 font-black uppercase">{permissionStatus}</span>
                    </div>
                  </div>

                  {/* Level Progression helper card */}
                  <div 
                    onClick={() => setActiveLevel(2)}
                    className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between group cursor-pointer hover:bg-purple-500/10 transition-all font-mono text-[9px]"
                  >
                    <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-200">
                      <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>Level 1 paired. Proceed to Level 2 (Signals Test)?</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              )}

              {/* LEVEL 2 VIEW: Preset Signals & Notification Injectors */}
              {activeLevel === 2 && (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-purple-950/5 border border-purple-500/10">
                    <span className="font-mono text-[8px] font-black tracking-widest text-cyan-400 uppercase block mb-1">
                      LEVEL 2 ACTIVE INJECTION PAYLOADS
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
                      Select and emit live business notifications to simulate real-time client contracts and Academy acceptance routines. This tests physical cross-device push architecture.
                    </p>

                    <div className="grid grid-cols-1 gap-2 mb-4">
                      {PRESET_ALERTS.map((alert) => (
                        <button
                          key={alert.id}
                          type="button"
                          onClick={() => {
                            setSelectedPreset(alert.id);
                            triggerAudioSynthesis(1050);
                          }}
                          className={`flex items-start text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedPreset === alert.id
                              ? 'bg-purple-950/25 border-purple-500/40 text-white'
                              : 'bg-black/20 border-transparent text-gray-400 hover:text-gray-300 hover:border-purple-500/10'
                          }`}
                        >
                          <div className="mr-3 shrink-0 mt-1">
                            <div className={`w-2.5 h-2.5 rounded-full ${selectedPreset === alert.id ? 'bg-purple-400 shadow-[0_0_8px_#a855f7]' : 'bg-gray-600'}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[9px] font-bold text-purple-300 uppercase tracking-wider">{alert.sender}</span>
                              <span className="font-mono text-[7px] text-gray-500 uppercase font-black">{alert.category}</span>
                            </div>
                            <p className="text-[10px] text-gray-300 mt-0.5 leading-normal">{alert.message}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={fireSelectedNotification}
                      type="button"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-[10px] font-bold text-white tracking-widest uppercase rounded-xl border border-white/5 shadow-[0_4px_25px_rgba(168,85,247,0.2)] transition-all flex items-center justify-center space-x-2 cursor-pointer group active:scale-[0.98]"
                    >
                      <Volume2 className="w-4 h-4 text-purple-200 animate-pulse" />
                      <span>EMIT ACTIVE TELEMETRY SIGNAL [SYS_FIRE]</span>
                    </button>
                  </div>

                  <div 
                    onClick={() => setActiveLevel(3)}
                    className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between group cursor-pointer hover:bg-purple-500/10 transition-all font-mono text-[9px]"
                  >
                    <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-200">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Proceed to Level 3 (Premium Executive Outbound Links)?</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              )}

              {/* LEVEL 3 VIEW: Global Pitch & Transmissions */}
              {activeLevel === 3 && (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-purple-950/5 border border-purple-500/10">
                    <span className="font-mono text-[8px] font-black tracking-widest text-emerald-400 uppercase block mb-1">
                      LEVEL 3 OUTBOUND PRESENTATION SHIELDS
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-4.5">
                      Distribute Mohammad Tahir's verified live link to partners, recruiters, and clients to negotiate technical integrations, custom automations, or project contracts immediately.
                    </p>

                    {/* Integrated Quick Link Copy */}
                    <div className="bg-black/40 border border-purple-500/15 p-3 rounded-xl flex items-center justify-between font-mono text-[10.5px] mb-4.5 select-all">
                      <span className="text-purple-300 truncate mr-3">{portfolioUrl}</span>
                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-[8.5px] uppercase font-black shrink-0 transition-all ${
                          copied
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-white'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-purple-400" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick Outreach Grid channels */}
                    <div className="grid grid-cols-3 gap-2 text-center text-sans">
                      <a
                        href={emailShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerAudioSynthesis(1400)}
                        className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 py-3.5 rounded-xl group transition-all"
                      >
                        <Mail className="w-4.5 h-4.5 text-purple-400 group-hover:scale-110 mb-1.5 transition-transform" />
                        <span className="font-mono text-[8px] text-white uppercase tracking-wider font-bold">Email Invite</span>
                      </a>

                      <a
                        href={waShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerAudioSynthesis(1400)}
                        className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 py-3.5 rounded-xl group transition-all"
                      >
                        <MessageSquare className="w-4.5 h-4.5 text-emerald-400 group-hover:scale-110 mb-1.5 transition-transform" />
                        <span className="font-mono text-[8px] text-white uppercase tracking-wider font-bold">WhatsApp Direct</span>
                      </a>

                      <a
                        href={linkedinShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerAudioSynthesis(1400)}
                        className="flex flex-col items-center justify-center bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 py-3.5 rounded-xl group transition-all"
                      >
                        <Globe className="w-4.5 h-4.5 text-indigo-400 group-hover:scale-110 mb-1.5 transition-transform" />
                        <span className="font-mono text-[8px] text-white uppercase tracking-wider font-bold">LinkedIn Post</span>
                      </a>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveLevel(4)}
                    className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between group cursor-pointer hover:bg-purple-500/10 transition-all font-mono text-[9px]"
                  >
                    <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-200">
                      <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                      <span>Proceed to Level 4 (Global Host Routers Network Map)?</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              )}

              {/* LEVEL 4 VIEW: GLOBAL EDGE ROUTING */}
              {activeLevel === 4 && (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-purple-950/5 border border-purple-500/10">
                    <span className="font-mono text-[8px] font-black tracking-widest text-[#a855f7] uppercase block mb-1">
                      LEVEL 4 GLOBAL ROUTER PIPELINE MATRIX
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
                      Mohammad Tahir maintains edge node router tunnels. Select a target global outpost below to establish live synchronization and test signal flow:
                    </p>

                    {/* Nodes Interactive List layout */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.keys(GLOBAL_NODES).map((key) => {
                        const node = GLOBAL_NODES[key as keyof typeof GLOBAL_NODES];
                        const isSel = selectedNode === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedNode(key as any);
                              setNodePingStatus('transmitting');
                              triggerAudioSynthesis(900);
                              setTimeout(() => {
                                setNodePingStatus('synced');
                                triggerAudioSynthesis(1200);
                              }, 800);
                            }}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              isSel 
                                ? 'bg-purple-950/20 border-purple-500/40 text-white' 
                                : 'bg-black/20 border-transparent text-gray-400 hover:border-purple-500/10'
                            }`}
                          >
                            <span className="font-mono text-[7px] text-purple-400 block tracking-widest font-bold uppercase">
                              {key === 'srinagar' ? '📍 NODE_01 (ROOT)' : `🌐 OUTPOST_0${key === 'sfo' ? '2' : key === 'london' ? '3' : '4'}`}
                            </span>
                            <span className="font-sans font-bold text-[10px] block mt-0.5 truncate">{key.toUpperCase()} Edge</span>
                            <span className="font-mono text-[7px] text-gray-500 block">{node.ip}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Glowing schematic graph representation */}
                    <div className="bg-black/60 border border-purple-500/15 rounded-xl p-3 mb-4 text-left relative overflow-hidden">
                      <div className="absolute top-2 right-2 flex items-center space-x-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[6.5px] text-emerald-400 font-bold uppercase">SECURE VPN</span>
                      </div>

                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-purple-500/5">
                        <div>
                          <span className="font-mono text-[7px] text-gray-400 block">CONNECTED TARGET:</span>
                          <span className="text-[10px] text-white font-bold">{GLOBAL_NODES[selectedNode].name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[7px] text-gray-400 block">LATENCY:</span>
                          <span className="text-[10px] text-pink-400 font-mono font-bold animate-pulse">
                            {nodePingStatus === 'transmitting' ? 'PINGING...' : GLOBAL_NODES[selectedNode].latency}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-purple-950/20 border border-purple-500/10 p-2 rounded-lg font-mono text-[7.5px]">
                        <div>
                          <span className="text-gray-500">COORDINATES:</span>{' '}
                          <span className="text-purple-300 font-bold">{GLOBAL_NODES[selectedNode].coords}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">TRAFFIC:</span>{' '}
                          <span className={GLOBAL_NODES[selectedNode].traffic === 'HIGH' ? 'text-pink-400 font-black' : 'text-emerald-400'}>
                            {GLOBAL_NODES[selectedNode].traffic}
                          </span>
                        </div>
                      </div>

                      {/* Live Network Cable Pulse animation */}
                      <div className="mt-3 relative h-10 w-full bg-black/40 border border-purple-500/5 rounded-lg flex items-center justify-center overflow-hidden">
                        {/* Host Server Left */}
                        <div className="absolute left-2 flex items-center space-x-1 z-10 bg-black/60 px-1 py-0.5 rounded border border-purple-500/20">
                          <Server className="w-2.5 h-2.5 text-purple-400" />
                          <span className="font-mono text-[6px]">SRINAGAR_ROOT</span>
                        </div>

                        {/* Animated Laser beam connecting */}
                        <div className="absolute inset-x-12 h-px bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 opacity-60" />
                        <div className="absolute inset-x-12 h-[2px] bg-cyan-400/30 blur-[1px]" />
                        
                        {/* Laser particle pulse matching latency speed */}
                        <span 
                          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] animate-ping"
                          style={{
                            left: '30%',
                            animationDuration: selectedNode === 'srinagar' ? '0.5s' : '1.8s'
                          }}
                        />

                        {/* Target Outpost Right */}
                        <div className="absolute right-2 flex items-center space-x-1 z-10 bg-black/60 px-1 py-0.5 rounded border border-purple-500/20">
                          <span className="font-mono text-[6px]">{selectedNode.toUpperCase()}_OUTPOST</span>
                          <CloudLightning className="w-2.5 h-2.5 text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveLevel(5)}
                    className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between group cursor-pointer hover:bg-purple-500/10 transition-all font-mono text-[9px]"
                  >
                    <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-200">
                      <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>Proceed to Level 5 (Active Cognitive AI Agent Script Compiler)?</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              )}

              {/* LEVEL 5 VIEW: AI COGNITIVE SANDBOX */}
              {activeLevel === 5 && (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-purple-950/5 border border-purple-500/10">
                    <span className="font-mono text-[8px] font-black tracking-widest text-[#a855f7] uppercase block mb-1">
                      LEVEL 5 AI AGENT SCRIPTER & COMPILER
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
                      Run functional agent logic within Mohd Tahir's local cognitive sandboxed layer. Select a script to transpile and run the thread:
                    </p>

                    {/* Scripts Interactive Toggles */}
                    <div className="flex bg-black/45 p-1 rounded-xl border border-purple-500/10 mb-3.5">
                      {(['leadGen', 'proposal', 'auth'] as const).map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setActiveSandboxScript(key);
                            setSandboxLogs([]);
                            setSandboxResult('');
                            setIsExecutingSandbox(false);
                            triggerAudioSynthesis(1000);
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[8.5px] uppercase font-black transition-all cursor-pointer ${
                            activeSandboxScript === key 
                              ? 'bg-purple-500/20 text-white border border-purple-500/20' 
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          {key === 'leadGen' ? 'LeadScraper' : key === 'proposal' ? 'Proposal' : 'Security'}
                        </button>
                      ))}
                    </div>

                    {/* Monospaced source editor box */}
                    <div className="bg-black/90 rounded-xl border border-purple-500/20 p-3 h-32 overflow-y-auto relative mb-3 font-mono text-[8.5px] text-purple-300 leading-normal select-all">
                      <span className="absolute top-2 right-2 text-[6px] text-gray-600 tracking-wider">TS Source</span>
                      <pre className="whitespace-pre-wrap">{SANDBOX_CODES[activeSandboxScript].code}</pre>
                    </div>

                    {/* Log Terminal Screen showing steps dynamically on execute */}
                    {sandboxLogs.length > 0 && (
                      <div className="bg-black border border-purple-500/10 rounded-xl p-3 mb-3 h-28 overflow-y-auto font-mono text-[8px] text-gray-400 space-y-1">
                        {sandboxLogs.map((log, index) => (
                          <div key={index} className="flex items-start space-x-1.5 animate-fadeIn">
                            <span className="text-purple-500 select-none">&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                        {isExecutingSandbox && (
                          <div className="flex items-center space-x-1.5 text-purple-400 animate-pulse">
                            <span>⏾ Compiling and deploying AI VM container...</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Compiled JSON output panel */}
                    {sandboxResult && (
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 mb-3 font-mono text-[8px] text-emerald-300">
                        <div className="flex items-center justify-between mb-1 pb-1 border-b border-emerald-500/10">
                          <span className="font-extrabold uppercase tracking-widest text-emerald-400">VM COMPILE SUCCESSFUL: 200 OK</span>
                          <span className="text-[7.5px] text-gray-500">Node SLA established</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">{sandboxResult}</pre>
                      </div>
                    )}

                    {/* Execution Trigger */}
                    <button
                      onClick={() => {
                        if (isExecutingSandbox) return;
                        setIsExecutingSandbox(true);
                        setSandboxLogs([]);
                        setSandboxResult('');
                        triggerAudioSynthesis(600);
                        
                        const steps = SANDBOX_CODES[activeSandboxScript].steps;
                        let index = 0;

                        const timer = setInterval(() => {
                          if (index < steps.length) {
                            setSandboxLogs(prev => [...prev, steps[index]]);
                            triggerAudioSynthesis(1200 + index * 100);
                            index++;
                          } else {
                            clearInterval(timer);
                            setSandboxResult(SANDBOX_CODES[activeSandboxScript].result);
                            setIsExecutingSandbox(false);
                            triggerAudioSynthesis(1950); // high key double pitch sound
                            
                            // Trigger cross-component real push simulator event
                            const customPushEvent = new CustomEvent('phone-push-notification', {
                              detail: {
                                title: '🤖 INTEL SYNAPSE RUNNER',
                                body: `Cognitive script [${SANDBOX_CODES[activeSandboxScript].title}] compiled and executed perfectly.`
                              }
                            });
                            window.dispatchEvent(customPushEvent);
                          }
                        }, 900);
                      }}
                      disabled={isExecutingSandbox}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed font-mono text-[9px] font-black tracking-widest text-white uppercase rounded-xl border border-white/5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 animate-pulse" />
                      <span>{isExecutingSandbox ? 'COMPILING DEPLOYMENT...' : 'COMPILE AND DEPLOY ON AGENT'}</span>
                    </button>
                  </div>

                  {/* Level status */}
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/15 rounded-xl flex items-center space-x-2.5 font-mono text-[8px] text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>LEVEL 5 SECURED. COGNITIVE LEVEL CAP PASSED. ABSOLUTE SYSTEM LOCK NOMINAL.</span>
                  </div>
                </div>
              )}

              {/* Advanced System Telemetry Footer inside modal */}
              <div className="mt-8 pt-4.5 border-t border-purple-500/15 flex items-center justify-between font-mono text-[7.5px] text-gray-500">
                <div className="flex items-center space-x-1">
                  <Terminal className="w-3 h-3 text-purple-500/50" />
                  <span>SECURE TRACE ROUTING: VERIFIED</span>
                </div>
                <span>CORE VERSION: V3.9-BETA</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dropdown lockscreen slide simulated banner */}
      <AnimatePresence>
        {simulatedNotification && (
          <div className="fixed top-8 left-1/2 -track-translate-x-1/2 z-[999] w-[calc(100%-2rem)] max-w-sm px-1">
            <motion.div
              initial={{ y: -80, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 14, stiffness: 125 }}
              onClick={() => setIsOpen(true)}
              className="w-full bg-black/95 hover:bg-black border border-purple-500/40 backdrop-blur-2xl rounded-2xl p-4 flex items-start space-x-3.5 shadow-[0_24px_55px_rgba(0,0,0,0.92)] cursor-pointer"
              id="dynamic-ios-sync-alert"
            >
              {/* iPhone style dynamic alert hub app icon */}
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Bell className="w-4.5 h-4.5 text-purple-300 animate-[bounce_1.3s_infinite]" />
              </div>

              {/* Banner Details */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8.5px] font-black tracking-widest text-purple-400 uppercase">
                    {simulatedNotification.sender}
                  </span>
                  <span className="font-mono text-[7px] text-gray-500">
                    {simulatedNotification.timestamp}
                  </span>
                </div>
                
                <span className="font-mono text-[8px] font-bold text-pink-300 block mt-0.5 uppercase tracking-wide">
                  {simulatedNotification.category}
                </span>

                <p className="text-xs text-slate-100 leading-normal font-sans mt-0.5">
                  {simulatedNotification.message}
                </p>

                {/* Simulated dynamic slider drawer pull handle bar */}
                <div className="mt-2 h-1 w-8 bg-gray-700/70 rounded-full mx-auto" />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSimulatedNotification(null);
                }}
                className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
