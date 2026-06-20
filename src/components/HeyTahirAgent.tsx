import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MessageSquare, Send, Volume2, VolumeX, Mic, MicOff, X, 
  Sparkles, RefreshCw, Bot, User, Wifi, Terminal, ArrowRight, 
  PhoneOff, HelpCircle, Activity, Play, Check, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_TOPICS = [
  { label: "Hire Tahir", query: "How do I hire Tahir & what are his pricing models?" },
  { label: "AI Workflows", query: "Tell me about his AI automation services." },
  { label: "Syllabus & Academy", query: "What will I learn in his Digital Skill Academy?" },
  { label: "Upwork Strategy", query: "Can Tahir teach me Upwork & client acquisition?" },
];

export default function HeyTahirAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'automation'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: "Hey, I am Tahir A I, an A I agent. Welcome to my workspace. Ask me anything about my masters skills, custom automations, or start a virtual voice call with me!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Call States
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isTTSActive, setIsTTSActive] = useState(true);
  const [voiceLog, setVoiceLog] = useState<string>("System standby. Ready to initiate telemetry uplink...");
  const [isListening, setIsListening] = useState(false);

  // Automated Enterprise solutions custom simulator states
  const [companyName, setCompanyName] = useState('Elite Software Corp');
  const [companyCategory, setCompanyCategory] = useState('SaaS Enterprise Systems');
  const [selectedPipeline, setSelectedPipeline] = useState('AI-Assisted Code Quality & PR Reviewer');
  const [automationLogs, setAutomationLogs] = useState<string[]>([]);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [isAutomationRunning, setIsAutomationRunning] = useState(false);
  const [proposalBlueprint, setProposalBlueprint] = useState('');
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [proposalCopied, setProposalCopied] = useState(false);

  // Canvas wave animations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

  const [welcomeVoicePlayed, setWelcomeVoicePlayed] = useState(false);

  // Monitor voices loaded state dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const handleVoicesChanged = () => {
        synthesisRef.current = window.speechSynthesis;
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis?.removeEventListener('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  // Soft sci-fi synthesizer chime introducing verbal actions
  const playSynthChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      osc1.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1150, audioCtx.currentTime + 0.3);
      
      osc2.frequency.setValueAtTime(290, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(780, audioCtx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.5);
      osc2.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn("Speech tone synthetics bypass:", e);
    }
  };

  // Guide visitor with verbal introduction when first opening the workspace agent
  useEffect(() => {
    if (isOpen && !welcomeVoicePlayed) {
      setWelcomeVoicePlayed(true);
      playSynthChime();
      setTimeout(() => {
        speakText(
          "Greetings, traveler. I am 'Hey Tahir', Mohammad Tahir's active AI companion. " +
          "I have been loaded with high-capacity digital intelligence. " +
          "Allow me to walk you through his five hundred completed projects, twenty custom applications, " +
          "and fifty beautiful custom web designs on his portfolio."
        );
      }, 600);
    }
  }, [isOpen, welcomeVoicePlayed]);

  // Setup speech recognition if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';
        
        rec.onstart = () => {
          setIsListening(true);
          setVoiceLog("Listening to your voice... Speak into your mic.");
        };

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          if (text) {
            setVoiceLog(`Captured: "${text}"`);
            handleSendMessage(text);
          }
        };

        rec.onerror = (err: any) => {
          console.warn("Speech recognition error:", err);
          setIsListening(false);
          setVoiceLog("Microphone blocked or inactive. Please type or click a preset below.");
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // Sync scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle active call duration timer
  useEffect(() => {
    if (isCallActive) {
      setCallDuration(0);
      timerRef.current = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      stopVoice();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  // Voice synthesis speaker helper
  const speakText = (text: string) => {
    if (!isTTSActive || !synthesisRef.current) return;
    try {
      // Cancel active voice speech first
      synthesisRef.current.cancel();

      // Sanitise markdown syntax from speech thoroughly
      const cleanText = text
        .replace(/[*_`#\-]/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/\/\/.*$/gm, '')
        .substring(0, 280); // Speak first 280 characters to keep it fast, clear & elegant

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Select the absolute best premium female voice (smooth normal girl voice/attractive assistant register)
      const voices = synthesisRef.current.getVoices();
      
      // Look for a high-quality female assistant voice explicitly
      const softVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        return (name.includes("siri") || name.includes("apple") || name.includes("samantha") || name.includes("hazel") || name.includes("zira") || name.includes("victoria")) && (name.includes("female") || name.includes("soft") || name.includes("natural"));
      }) || voices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes("siri") || name.includes("apple") || name.includes("samantha") || name.includes("zira") || name.includes("hazel") || name.includes("karen") || name.includes("victoria");
      }) || voices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes("female") && v.lang.startsWith("en");
      }) || voices.find(v => {
        return v.lang.startsWith("en-US");
      }) || voices.find(v => {
        return v.lang.startsWith("en");
      });

      if (softVoice) {
        utterance.voice = softVoice;
      }
      
      // Soft, highly attractive, confident female/girl voice configuration
      utterance.rate = 1.05;   // Normal natural tempo, not slow or dragging
      utterance.pitch = 1.05;  // Beautiful friendly soft light female pitch for a genuine human sound
      utterance.volume = 1.0;  // Maximum digital power amplitude

      utterance.onstart = () => {
        setVoiceLog("Hey Tahir is speaking with a smooth attractive vocal tone...");
      };
      utterance.onend = () => {
        setVoiceLog(isCallActive ? "Session calibrated. Talk into your microphone..." : "Speech output completed successfully.");
      };

      activeUtteranceRef.current = utterance;
      synthesisRef.current.speak(utterance);
    } catch (err) {
      console.warn("Smooth speech synthesis failed, continuing gracefully:", err);
    }
  };

  const stopVoice = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
  };

  // Automated proposal solver function connecting to real Gemini backend
  const triggerAutomationPulse = async () => {
    if (isAutomationRunning || isGeneratingProposal) return;
    setIsAutomationRunning(true);
    setAutomationProgress(0);
    setAutomationLogs([]);
    setProposalBlueprint('');
    setProposalCopied(false);
    
    // Begin fetching original custom AI proposal in parallel
    const fetchPromise = fetch('/api/automation-proposal', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        companyCategory,
        pipelineType: selectedPipeline
      })
    })
    .then(res => res.json())
    .catch(err => ({ error: err.message }));

    const addLog = (logText: string) => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setAutomationLogs(prev => [...prev, `[${timeStr}] ${logText}`]);
    };

    addLog(`🔄 SPAWNING pipeline execution context for: ${companyName}`);
    addLog(`⚡ HOST: 0.0.0.0:3000 • Tunnel secured.`);
    
    let currentProgress = 0;
    const interval = setInterval(async () => {
      currentProgress += 10;
      if (currentProgress < 100) {
        setAutomationProgress(currentProgress);
        if (currentProgress === 20) {
          addLog(`📊 ANALYZING Sector bottlenecks for Category: "${companyCategory}"...`);
        } else if (currentProgress === 40) {
          addLog(`🧠 COGNITIVE: Packaging Prompt variables for Gemini 3.5 Flash Model...`);
        } else if (currentProgress === 70) {
          addLog(`⚙️ PIPELINE: Mapping API Nodes and Webhook routes for: "${selectedPipeline}"...`);
        } else if (currentProgress === 85) {
          addLog(`📱 STAKEHOLDER: Simulated live telemetry webhook pushed safely to Slack.`);
        }
      } else {
        clearInterval(interval);
        // Wait for fetch completion
        const data = await fetchPromise;
        setIsGeneratingProposal(false);
        setAutomationProgress(100);
        if (data.proposal) {
          setProposalBlueprint(data.proposal);
          addLog(`✅ COMPLETE: Bespoke Enterprise AI Proposal successfully generated!`);
          speakText(`Hey! The automated proposal for ${companyName} is compiled.`);
        } else {
          setProposalBlueprint(`⚠️ CONNECTION TIMEOUT. Verify environment credentials. Error: ${data.error || 'Uplink block failed.'}`);
          addLog(`❌ ERROR: Could not complete cognitive signal generation pipeline.`);
        }
        setIsAutomationRunning(false);
      }
    }, 400);
  };

  // Toggle speech listener
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setVoiceLog("Speech recognition is not supported in this browser tab context.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopVoice();
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Speech recognition failed starting:", e);
      }
    }
  };

  // Submit messaging logic connected to Express backend
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: rawText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setVoiceLog("Tahir Agent is consulting cerebral intelligence models...");

    try {
      // Build proper history for the Gemini API call
      const historyPayload = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/tahir-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
          history: historyPayload
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const agentMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I am processing. Please retry.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMessage]);
      setVoiceLog("Agent response generated.");
      
      // Auto speak the response
      speakText(agentMessage.content);

    } catch (err: any) {
      console.error("AI Agent dispatch failed:", err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Connection status: STALE_TELEMETRY. Could not establish prompt pipeline. Error: ${err.message || 'Check GEMINI_API_KEY in Secrets context.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setVoiceLog("Failed to sync context block.");
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic soundwave canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isCallActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let tick = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const barCount = 42;
      const spacing = 4;
      const barWidth = (width - (barCount - 1) * spacing) / barCount;
      const centerY = height / 2;

      ctx.fillStyle = 'rgba(168, 85, 247, 0.45)';

      for (let i = 0; i < barCount; i++) {
        // Build double sine wave calculations based on load state, audio speech and time
        const multiplier = isLoading 
          ? 35 + Math.sin(tick * 0.2 + i * 0.4) * 15
          : synthesisRef.current?.speaking 
            ? 30 + Math.abs(Math.sin(tick * 0.15 + i * 0.5)) * 25
            : isListening
              ? 10 + Math.abs(Math.sin(tick * 0.4 + i * 0.6)) * 26
              : 6 + Math.sin(tick * 0.05 + i * 0.2) * 5;

        const distanceToCenter = Math.abs(i - barCount / 2);
        const gaussianFactor = Math.pow(Math.E, -Math.pow(distanceToCenter / (barCount * 0.35), 2));
        
        const barHeight = multiplier * gaussianFactor;

        // Draw isometric glowing bar plates
        const x = i * (barWidth + spacing);
        const y = centerY - barHeight / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        if (synthesisRef.current?.speaking) {
          gradient.addColorStop(0, '#10b981'); // Emerald green when speaking 
          gradient.addColorStop(0.5, '#34d399');
          gradient.addColorStop(1, '#a855f7');
        } else if (isListening) {
          gradient.addColorStop(0, '#f59e0b'); // Amber warning when listening
          gradient.addColorStop(1, '#ef4444');
        } else {
          gradient.addColorStop(0, '#a855f7'); // Violet signature when idle/timer
          gradient.addColorStop(0.5, '#6366f1');
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0.15)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      tick += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isCallActive, isLoading, isListening]);

  // Format active seconds into clock time UI
  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <>
      {/* Absolute omnipresent interactive launcher bubble at bottom right with high-tech levitation */}
      <motion.div 
        className="fixed bottom-20 right-6 sm:bottom-24 z-[999] flex flex-col items-end space-y-2 font-sans select-none pointer-events-none"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 1.0, -1.0, 0]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        
        {/* Pulsing prompt invite and advanced branding showing name */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto bg-[#0a051d]/95 hover:bg-[#120933]/95 border border-purple-500/30 text-white p-2 px-3 rounded-xl shadow-[0_5px_20px_rgba(168,85,247,0.15)] hover:shadow-[0_5px_25px_rgba(168,85,247,0.3)] backdrop-blur-xl cursor-pointer text-[10px] flex flex-col space-y-1 max-w-[190px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative group hidden xs:flex overflow-hidden"
          >
            {/* Corner ambient scanner lasers */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-purple-400/40" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    synthesisRef.current?.speaking ? 'bg-emerald-400' : isListening ? 'bg-amber-400' : 'bg-purple-400'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    synthesisRef.current?.speaking ? 'bg-emerald-500' : isListening ? 'bg-amber-500' : 'bg-purple-500'
                  }`}></span>
                </span>
                <span className="font-mono text-[7.5px] font-bold text-purple-300 uppercase tracking-widest">
                  AI AGENT
                </span>
              </div>
              <span className="font-mono text-[6px] text-gray-400 uppercase tracking-wider bg-black/50 px-1 py-0.2 rounded border border-purple-500/10">
                {synthesisRef.current?.speaking ? 'TALKING' : isListening ? 'LISTENING' : 'ONLINE'}
              </span>
            </div>

            <p className="text-[8.5px] leading-normal text-left text-gray-400 font-light">
              Click to consult Tahir's helper.
            </p>
          </motion.div>
        )}

        {/* Core Autonomous Sphere representation with real-time reactive telemetry aura ring */}
        <div className="pointer-events-auto flex items-center space-x-2.5">
          {/* Advanced side tag that show agent name during active session */}
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/90 border border-purple-500/30 backdrop-blur-md px-2 py-1 rounded-full shadow-md flex items-center space-x-1.5 font-mono text-[8px] font-medium text-white uppercase tracking-wider cursor-pointer hover:border-purple-300 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Sparkles className="w-2.5 h-2.5 text-purple-400 animate-pulse" />
              <span>Hey Tahir AI</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            </motion.div>
          )}

          <motion.button
            onClick={() => {
              setIsOpen(!isOpen);
              stopVoice();
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-350 relative group shrink-0 border-2 ${
              isOpen 
                ? 'bg-rose-600 hover:bg-rose-500 border-rose-400/40 rotate-90 shadow-rose-500/20' 
                : 'bg-gradient-to-tr from-purple-950 via-purple-600 to-pink-500 hover:scale-105 border-purple-400/50 shadow-purple-500/30 shadow-xl'
            }`}
            whileTap={{ scale: 0.93 }}
          >
            {/* Visual Halo / Wave telemetry loops based on agent's state */}
            {!isOpen && (
              <>
                <div className={`absolute -inset-1 rounded-full border border-purple-500/20 animate-spin [animation-duration:8s]`} />
                <div className={`absolute -inset-2.5 rounded-full border border-dashed border-purple-500/10 animate-spin [animation-duration:15s]`} />
                
                {/* Micro-fluctuating state ripples */}
                {synthesisRef.current?.speaking ? (
                  <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping [animation-duration:1.5s]" />
                ) : isListening ? (
                  <div className="absolute inset-0 rounded-full bg-amber-500/15 animate-pulse" />
                ) : (
                  <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-pulse" />
                )}
              </>
            )}

            {isOpen ? (
              <X className="w-4.5 h-4.5 text-white" />
            ) : (
              <div className="relative">
                <Bot className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Holographic sliding HUD Console Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 155 }}
            className="fixed bottom-36 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[410px] h-[550px] bg-[#050111]/98 border border-purple-500/30 rounded-3xl shadow-[0_15px_45px_rgba(168,85,247,0.25)] z-[998] flex flex-col justify-between overflow-hidden backdrop-blur-xl font-sans"
          >
            {/* Ambient visual decorations inside console */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.015)_2%)] bg-[size:100%_4px] opacity-30 pointer-events-none" />

            {/* HEADER INTERACTIVE CONSOLE */}
            <div className="relative z-10 p-4 border-b border-purple-500/15 bg-purple-950/10 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-left">
                <div className="relative">
                  <div className="p-1.5 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    <Bot className="w-4.5 h-4.5 text-purple-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#050111]" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Hey Tahir</span>
                    <span className="text-[7.5px] font-mono bg-purple-500/10 border border-purple-500/25 text-purple-300 px-1 py-0.2 rounded font-black uppercase tracking-normal">Companion v1.2</span>
                  </h3>
                  <p className="text-[9px] text-[#a855f7] font-mono font-bold flex items-center space-x-1 uppercase">
                    <Wifi className="w-2.5 h-2.5 animate-pulse text-purple-400" />
                    <span>Cognitive Signal Online</span>
                  </p>
                </div>
              </div>

              {/* View options selectors tabs */}
              <div className="flex bg-black/60 border border-purple-500/20 p-0.5 rounded-lg text-mono text-[8px] sm:text-[8.5px]">
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    setIsCallActive(false);
                    stopVoice();
                  }}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md uppercase font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-1 ${
                    activeTab === 'chat' && !isCallActive
                      ? 'bg-purple-500/15 text-white border border-purple-500/25'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('call');
                    if (!isCallActive) {
                      setIsCallActive(true);
                      speakText("Voice uplink established. Ready for telemetry stream.");
                    }
                  }}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md uppercase font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-1 ${
                    isCallActive || activeTab === 'call'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('automation');
                    setIsCallActive(false);
                    stopVoice();
                  }}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md uppercase font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-1 ${
                    activeTab === 'automation' && !isCallActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 animate-pulse" />
                  <span>Automation</span>
                </button>
              </div>
            </div>

            {/* CORE LOGIC SCREEN VIEWPORT */}
            <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden">
              
              <AnimatePresence mode="wait">
                {activeTab === 'chat' && !isCallActive ? (
                  
                  /* CHAT CONSOLE MODE */
                  <motion.div
                    key="chat_layout"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Chat messages layout */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] scrollbar-thin">
                      {messages.map((msg) => {
                        const isAssistant = msg.role === 'assistant';
                        return (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 border ${
                              isAssistant 
                                ? 'bg-purple-500/10 border-purple-500/15 text-purple-300' 
                                : 'bg-indigo-500/10 border-indigo-500/15 text-indigo-300'
                            }`}>
                              {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                            </div>

                            <div className="space-y-1 max-w-[280px]">
                              <div className={`p-3 rounded-2xl text-[11px] leading-relaxed text-left font-sans ${
                                isAssistant 
                                  ? 'bg-purple-950/10 border border-purple-500/10 text-gray-200 rounded-tl-sm'
                                  : 'bg-indigo-600 border border-indigo-500 text-white rounded-tr-sm'
                              }`}>
                                <p className="whitespace-pre-line">{msg.content}</p>
                              </div>
                              <div className="flex items-center justify-between px-1">
                                <span className="text-[7.5px] font-mono text-gray-500 block text-left">
                                  {msg.timestamp}
                                </span>
                                {isAssistant && (
                                  <button
                                    onClick={() => {
                                      playSynthChime();
                                      speakText(msg.content);
                                    }}
                                    className="px-1 text-[8px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-0.5 border border-purple-500/10 hover:border-purple-500/30 rounded bg-purple-500/5 transition-all cursor-pointer"
                                    title="Speak response with soft AI registers"
                                  >
                                    <Volume2 className="w-2.5 h-2.5" />
                                    <span>Vocalize</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Loading formulation animation */}
                      {isLoading && (
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/15 text-purple-300 shrink-0">
                            <Bot className="w-3.5 h-3.5 animate-spin" />
                          </div>
                          <div className="p-3 bg-purple-950/10 border border-purple-500/10 rounded-2xl rounded-tl-sm text-[11px] text-purple-300 font-mono text-left max-w-sm flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                            <span>Thinking...</span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Presets options */}
                    <div className="p-3 border-t border-purple-500/10 bg-black/30 text-left">
                      <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block mb-2 font-bold">Quick Inquiries topics</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_TOPICS.map((topic, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(topic.query)}
                            disabled={isLoading}
                            className="bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/10 hover:border-purple-500/25 active:scale-[0.97] transition-all py-1 px-2 rounded-lg text-[9px] text-gray-300 font-mono cursor-pointer"
                          >
                            + {topic.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Connect & Presence Indicator */}
                    <div className="px-3 py-2.5 border-t border-purple-500/10 bg-black/40 text-left flex items-center justify-between">
                      <span className="font-mono text-[7px] min-[380px]:text-[8px] text-gray-500 uppercase tracking-widest font-bold flex flex-col gap-0.5 whitespace-nowrap">
                        <span className="text-purple-400">Direct Contacts</span>
                      </span>
                      
                      <div className="flex space-x-1 sm:space-x-1.5 ml-2">
                        <a href="https://wa.me/916005820321" target="_blank" rel="noopener noreferrer" className="p-1 px-1.5 sm:px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/20 hover:border-emerald-500/40 transition-colors flex items-center gap-1 cursor-pointer">
                          <MessageSquare className="w-2.5 h-2.5" />
                          <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden min-[360px]:inline-block">WhatsApp</span>
                        </a>
                        <a href="mailto:mohammadtahirmir123@gmail.com" target="_blank" rel="noopener noreferrer" className="p-1 px-1.5 sm:px-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-md border border-indigo-500/20 hover:border-indigo-500/40 transition-colors flex items-center gap-1 cursor-pointer">
                          <Send className="w-2.5 h-2.5" />
                          <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden min-[360px]:inline-block">Email</span>
                        </a>
                        <a href="https://instagram.com/1amtahir" target="_blank" rel="noopener noreferrer" className="p-1 px-1.5 sm:px-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-md border border-pink-500/20 hover:border-pink-500/40 transition-colors flex items-center gap-1 cursor-pointer">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden min-[360px]:inline-block">Instagram</span>
                        </a>
                      </div>
                    </div>

                  </motion.div>
                ) : activeTab === 'automation' ? (
                  
                  /* AUTOMATION CONSOLE PLAYGROUND MODE */
                  <motion.div
                    key="automation_layout"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col justify-between overflow-y-auto p-4 scrollbar-thin space-y-3"
                  >
                    {/* Header explanatory node */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 p-2.5 rounded-xl text-left">
                      <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-[10px] uppercase tracking-wide">
                        <Terminal className="w-3.5 h-3.5 animate-pulse" />
                        <span>Corporate Automation Lab</span>
                      </div>
                      <p className="text-[9px] text-gray-300 mt-1 leading-relaxed">
                        Input enterprise parameters below. Tahir's AI pipeline will formulate a custom integration map & ROI estimation instantly.
                      </p>
                    </div>

                    {/* Inputs panel */}
                    {!isAutomationRunning && !proposalBlueprint && (
                      <div className="space-y-3.5 text-left flex-1 flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <div>
                            <label className="block text-[8px] font-mono text-purple-400 uppercase tracking-widest mb-1">Company/Partner Name</label>
                            <input
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Stripe, TechCorp, Vercel"
                              className="w-full bg-black/60 border border-purple-500/20 focus:border-purple-400 rounded-lg p-2 text-xs text-white placeholder-gray-700 outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[8px] font-mono text-purple-400 uppercase tracking-widest mb-1">Enterprise Sector</label>
                            <select
                              value={companyCategory}
                              onChange={(e) => setCompanyCategory(e.target.value)}
                              className="w-full bg-black/60 border border-purple-500/20 focus:border-purple-400 rounded-lg p-2 text-xs text-slate-300 outline-none transition-colors"
                            >
                              <option value="SaaS Enterprise Software">SaaS Enterprise Software (Scalable DevOps & Cloud)</option>
                              <option value="SaaS Startup & AI Integrations">SaaS Startup (Next.js, High Growth, fast delivery)</option>
                              <option value="High-volume E-Commerce">High-volume E-Commerce Logistics (Stripe, Automated Invoices)</option>
                              <option value="Digital Agencies & Consultancy">Design Agencies (Figma templates automator, Slack notify)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[8px] font-mono text-purple-400 uppercase tracking-widest mb-1">Selected Workflow Pipeline</label>
                            <select
                              value={selectedPipeline}
                              onChange={(e) => setSelectedPipeline(e.target.value)}
                              className="w-full bg-black/60 border border-purple-500/20 focus:border-purple-400 rounded-lg p-2 text-xs text-slate-300 outline-none transition-colors"
                            >
                              <option value="AI-Assisted Code Quality & PR Reviewer">💻 AI-Assisted Code Quality & PR Reviewer</option>
                              <option value="Automated Customer Lifecycle Email Campaign">✉️ Automated Client Outreach & HubSpot Sync</option>
                              <option value="Lead Auto-Qualification & Slack Webhook Web-alert">⚡ Lead Qualification & Instant Slack Alert Channel</option>
                              <option value="Automated Database Verification & Diagnostic Alerts">🗄️ Database Auto-Verification & Telemetry Checks</option>
                            </select>
                          </div>
                        </div>

                        {/* Trigger Process Button */}
                        <button
                          onClick={triggerAutomationPulse}
                          className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-505 hover:to-amber-400 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-[0_4px_18px_rgba(219,39,119,0.3)] hover:scale-[1.01] flex items-center justify-center space-x-1.5 cursor-pointer relative overflow-hidden"
                        >
                          <Play className="w-3.5 h-3.5 text-white animate-pulse" />
                          <span>Generate Tailored Solution</span>
                        </button>
                      </div>
                    )}

                    {/* Progress terminal simulator outputs */}
                    {isAutomationRunning && (
                      <div className="flex-1 flex flex-col justify-center space-y-4">
                        {/* Terminal Box */}
                        <div className="bg-[#03000b] border border-amber-500/35 rounded-xl p-3.5 font-mono text-[9px] text-amber-300 text-left min-h-[160px] max-h-[190px] overflow-y-auto space-y-1.5 shadow-inner">
                          {automationLogs.map((log, index) => (
                            <div key={index} className="leading-snug">
                              {log}
                            </div>
                          ))}
                          <div className="animate-pulse inline-block w-1.5 h-3 bg-amber-400 ml-1" />
                        </div>

                        {/* Progress slider bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[8.5px] font-mono text-purple-400 uppercase tracking-widest">
                            <span>Executing telemetry parameters...</span>
                            <span>{automationProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-purple-950/40 rounded-full overflow-hidden border border-purple-500/10">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400"
                              initial={{ width: '0%' }}
                              animate={{ width: `${automationProgress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formatted resulting proposal blueprint */}
                    {proposalBlueprint && !isAutomationRunning && (
                      <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-3.5">
                        {/* Interactive proposal block */}
                        <div className="bg-black/60 border border-purple-500/25 rounded-xl p-3 text-left overflow-y-auto h-[260px] sm:h-[280px] scrollbar-thin relative group">
                          <span className="absolute top-2.5 right-3 font-mono text-[6.5px] bg-purple-500/10 text-purple-300 border border-purple-500/25 px-1 py-0.2 rounded">
                            MARKDOWN BLUEPRINT
                          </span>
                          <p className="text-[10px] text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                            {proposalBlueprint}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(proposalBlueprint);
                              setProposalCopied(true);
                              setTimeout(() => setProposalCopied(false), 2000);
                            }}
                            className="flex-1 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:text-white rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            {proposalCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Blueprint Copied!</span>
                              </>
                            ) : (
                              <>
                                <Terminal className="w-3.5 h-3.5 animate-pulse" />
                                <span>Copy Clean Blueprint</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setProposalBlueprint('');
                              stopVoice();
                            }}
                            className="px-3.5 py-2 bg-black hover:bg-black/80 border border-gray-700 text-gray-400 hover:text-white rounded-lg text-[9.5px] tracking-widest font-black uppercase transition-colors cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>

                        {/* Direct CTA action to hire on Upwork or consulting */}
                        <div className="bg-purple-950/15 border border-purple-500/20 p-2.5 rounded-xl flex items-center justify-between text-left">
                          <div className="space-y-0.5">
                            <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block font-bold">READY TO DEPLOY?</span>
                            <span className="text-[9px] text-gray-200 text-purple-300">Consult Tahir directly for setup.</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              const contactEl = document.getElementById('contact');
                              if (contactEl) {
                                contactEl.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-650 hover:scale-[1.04] transition-all rounded-md text-[8.5px] font-black text-white tracking-widest uppercase cursor-pointer flex items-center space-x-1 shrink-0"
                          >
                            <span>DEPLOY NOW</span>
                            <ArrowRight className="w-2.5 h-2.5 text-pink-200" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  
                  /* TELEPHONE VOICE CALL INTERACTIVE LAYOUT MODE */
                  <motion.div
                    key="call_layout"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col justify-between overflow-hidden p-6 text-center"
                  >
                    {/* Floating call identifier */}
                    <div>
                      <div className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-black mb-1.5">UPLINK CALL_TUNNEL</div>
                      <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Mohammad Tahir AI Portal</h4>
                      <p className="text-[10px] text-emerald-300 font-mono font-medium mt-1 uppercase flex items-center justify-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" />
                        <span>Voice Stream Active</span>
                      </p>
                    </div>

                    {/* Animated spectrogram dynamic canvas visualizer */}
                    <div className="relative w-full h-[140px] bg-black/40 border border-purple-500/10 rounded-2xl overflow-hidden my-4 py-3 flex flex-col justify-end">
                      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                      <div className="absolute top-2.5 left-3 flex items-center space-x-1.5">
                        <Activity className="w-3 h-3 text-purple-400 animate-pulse" />
                        <span className="font-mono text-[6.5px] text-purple-400 uppercase tracking-widest">
                          SPECTRAL_FREQUENCY (24KHZ_OUT)
                        </span>
                      </div>
                      
                      {/* Floating call duration tag */}
                      <div className="relative z-10 mx-auto bg-black/60 border border-white/5 py-1 px-3 rounded-full font-mono text-[10px] text-white">
                        {formatDuration(callDuration)}
                      </div>
                    </div>

                    {/* Subtitles board of spoken words */}
                    <div className="bg-purple-950/10 border border-purple-500/10 p-3.5 rounded-2xl text-left max-h-[110px] overflow-y-auto">
                      <span className="font-mono text-[7px] text-purple-400 uppercase tracking-widest block mb-1.5 font-bold">LIVE STREAM TRANSCRIPT</span>
                      <p className="text-[10.5px] text-gray-300 leading-relaxed font-sans font-light italic">
                        "{messages[messages.length - 1]?.content || 'Signal established...'}"
                      </p>
                    </div>

                    {/* Controls dial interface bar */}
                    <div className="space-y-4 pt-4 border-t border-purple-500/10">
                      
                      {/* Telemetry live statuses */}
                      <p className="text-[8.5px] font-mono text-gray-400 truncate text-left">
                        📲 <b className="text-[#a855f7]">LOG:</b> {voiceLog}
                      </p>

                      <div className="flex items-center justify-center space-x-5">
                        
                        {/* Audio Mute Speak Toggle trigger */}
                        <button
                          onClick={() => setIsTTSActive(!isTTSActive)}
                          title="Toggle Speech Output"
                          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isTTSActive 
                              ? 'bg-purple-500/10 border-purple-400/30 text-purple-300 hover:bg-purple-500/20' 
                              : 'bg-rose-500/10 border-rose-400/30 text-rose-300 hover:bg-rose-500/20'
                          }`}
                        >
                          {isTTSActive ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
                        </button>

                        {/* Speech Micro listener mic activation */}
                        <button
                          onClick={toggleListening}
                          className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                            isListening 
                              ? 'bg-[#f59e0b] border-amber-400 text-black shadow-lg shadow-amber-500/20 animate-pulse scale-105' 
                              : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 hover:scale-105'
                          }`}
                          title="Talk with microphone"
                        >
                          {isListening ? (
                            <Mic className="w-6 h-6 text-black animate-bounce" />
                          ) : (
                            <Mic className="w-5.5 h-5.5 text-indigo-100" />
                          )}
                        </button>

                        {/* Red Hang Up Trigger */}
                        <button
                          onClick={() => {
                            setIsCallActive(false);
                            setActiveTab('chat');
                            stopVoice();
                            setVoiceLog("Call terminated safely by client.");
                          }}
                          className="w-11 h-11 rounded-full bg-rose-600 hover:bg-rose-500 border border-rose-400/30 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                          title="Hang Up call"
                        >
                          <PhoneOff className="w-4.5 h-4.5" />
                        </button>

                      </div>

                      {/* Mock voice response indicators */}
                      <div className="flex justify-center space-x-2 pt-1 font-mono text-[8px] text-gray-500">
                        <span>Click orange mic to deliver voice</span>
                        <span>•</span>
                        <span>Uses Web Speech API</span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* FOOTER SEND ACTIONS INPUT BAR inside console panel chat mode */}
              {activeTab === 'chat' && !isCallActive && (
                <div className="relative z-10 p-3 bg-black/60 border-t border-purple-500/15 flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Ask me something about Mohammad Tahir..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                      disabled={isLoading}
                      className="w-full bg-[#03000b] border border-purple-500/20 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors pr-10"
                    />
                    
                    {/* Mic Quick Call helper trigger inside input */}
                    <button
                      onClick={() => {
                        setActiveTab('call');
                        setIsCallActive(true);
                        speakText("Calling Tahir. Telemetry online. Talk into your mic or view spoken replies here.");
                      }}
                      className="absolute right-2 top-2 p-1 rounded hover:bg-purple-500/10 text-purple-400 hover:text-white transition-all cursor-pointer"
                      title="Initiate full voice call mode"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputText.trim()}
                    className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isLoading || !inputText.trim()
                        ? 'bg-purple-500/5 border-purple-500/10 text-purple-500/40 cursor-not-allowed'
                        : 'bg-purple-600 border-purple-400/20 text-white hover:bg-purple-500 shadow-md shadow-purple-500/15'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
