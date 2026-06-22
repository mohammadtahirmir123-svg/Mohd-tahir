import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MessageSquare, Send, Volume2, VolumeX, Mic, MicOff, X, 
  Sparkles, RefreshCw, Bot, User, Wifi, Terminal, ArrowRight, 
  PhoneOff, HelpCircle, Activity, Play, Check, AlertTriangle, ShieldAlert,
  Hexagon, Aperture, Brain, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Custom lightweight high-fidelity markdown element renderer mimicking ChatGPT/Claude
function formatInlineElements(text: string) {
  const parts = [];
  let currentIdx = 0;
  
  // Regex mapping **bold**, `code`, and https links
  const itemRegex = /(\*\*.*?\*\*|`.*?`|https?:\/\/[\w\.\/\?\&\=#\-+]+)/g;
  let match;
  
  while ((match = itemRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchText = match[0];
    
    if (matchStart > currentIdx) {
      parts.push(text.substring(currentIdx, matchStart));
    }
    
    if (matchText.startsWith('**') && matchText.endsWith('**')) {
      parts.push(
        <strong className="font-bold text-white text-[11px] tracking-normal" key={matchStart}>
          {matchText.slice(2, -2)}
        </strong>
      );
    } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
      parts.push(
        <code className="bg-black/60 border border-purple-500/25 px-1 py-0.5 rounded text-[10px] font-mono text-purple-300" key={matchStart}>
          {matchText.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(
        <a href={matchText} target="_blank" rel="referrer" className="text-cyan-400 hover:underline inline-flex items-center space-x-0.5 font-medium" key={matchStart}>
          {matchText}
        </a>
      );
    }
    
    currentIdx = itemRegex.lastIndex;
  }
  
  if (currentIdx < text.length) {
    parts.push(text.substring(currentIdx));
  }
  
  return parts.length > 0 ? parts : text;
}

function renderFormattedMessage(content: string) {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5 font-sans">
      {lines.map((line, idx) => {
        const cleanLine = line.trim();
        
        // H3 Header format
        if (cleanLine.startsWith('###')) {
          return (
            <h4 key={idx} className="text-white font-semibold text-[11.5px] uppercase tracking-wide border-l-2 border-purple-500 pl-1.5 mt-2 mb-1">
              {cleanLine.replace('###', '').trim()}
            </h4>
          );
        }
        
        // H2 Header format
        if (cleanLine.startsWith('##')) {
          return (
            <h4 key={idx} className="text-white font-bold text-xs uppercase tracking-wider mt-2.5 mb-1.5 text-purple-300">
              {cleanLine.replace('##', '').trim()}
            </h4>
          );
        }
        
        // Unordered bullet point card
        if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          const innerText = cleanLine.substring(2);
          return (
            <div key={idx} className="flex items-start space-x-1.5 pl-1.5 text-gray-300 text-[11px] leading-relaxed">
              <span className="text-purple-400 mt-1 shrink-0 text-[10px]">✦</span>
              <span className="flex-1">{formatInlineElements(innerText)}</span>
            </div>
          );
        }

        // Ordered list format
        const numMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-1.5 pl-1.5 text-gray-300 text-[11px] leading-relaxed">
              <span className="font-mono text-purple-300 font-bold text-[9px] bg-purple-500/10 px-1 rounded transform translate-y-0.5">{numMatch[1]}</span>
              <span className="flex-1">{formatInlineElements(numMatch[2])}</span>
            </div>
          );
        }

        if (cleanLine === '') {
          return <div key={idx} className="h-1" />;
        }

        // Paragraph line
        return (
          <p key={idx} className="text-gray-200 text-[11px] leading-relaxed">
            {formatInlineElements(line)}
          </p>
        );
      })}
    </div>
  );
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
      content: "Hey, I am Tahir AI, an active conversational agent designed with world-class intelligence. Welcome to my workspace. Ask me anything about my masters skills, custom automations, or start a virtual voice call with me!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom Premium AI States
  const [voiceProfile, setVoiceProfile] = useState<'juniper' | 'cooper' | 'samantha' | 'ember'>('juniper');
  const [suggestions, setSuggestions] = useState<string[]>([
    "What are his tuition fees?",
    "Tell me about his AI services.",
    "What is his Upwork pricing?",
    "Open Admission Registration form"
  ]);
  
  // High fidelity Streaming typewriter simulator states
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState('');
  const activeStreamIntervalRef = useRef<number | null>(null);

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
          "Allow me to walk you through his five hundred completed projects, five custom applications, " +
          "and twenty beautiful custom web designs on his portfolio."
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
  const playSpeechMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      // Beautiful harmonic high-vibrancy crystal melody sequence (E-major pentatonic arpeggio)
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Use a blend of triangle and sine wave for warm melodic response
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, now + index * 0.08 + 0.02); // very soft elegant volume
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.4); // beautiful slow smooth decay
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn("Melodic synthesis preview audio failed:", e);
    }
  };

  // Keyboard typewriter click feedback for streaming effect
  const playKeyClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(3600 + Math.random() * 400, now); // soft high digital tick
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.0012, now + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.015);
    } catch (e) {}
  };

  // Voice synthesis speaker helper
  const speakText = (text: string) => {
    if (!isTTSActive || !synthesisRef.current) return;
    try {
      // Play a beautiful modern futuristic Siri-like melodic alert chime first
      playSpeechMelody();

      // Cancel active voice speech first
      synthesisRef.current.cancel();

      // Sanitise markdown syntax from speech thoroughly
      const cleanText = text
        .replace(/[*_`#\-]/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/\/\/.*$/gm, '')
        .substring(0, 240); // Speak first 240 characters to keep it fast, clear & elegant

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = synthesisRef.current.getVoices();
      
      // Select appropriate parameters based on premium voiceProfile
      let pitch = 1.08;
      let rate = 1.03;
      let preferredKeywords: string[] = [];

      if (voiceProfile === 'cooper') {
        pitch = 0.82; // Deeper commanding male tone
        rate = 0.98;
        preferredKeywords = ["google uk english male", "male", "david", "microsoft david", "george"];
      } else if (voiceProfile === 'samantha') {
        pitch = 1.18; // Crisp, high female register like Siri classic
        rate = 1.05;
        preferredKeywords = ["samantha", "siri", "karen", "victoria"];
      } else if (voiceProfile === 'ember') {
        pitch = 1.25; // Energetic, warm and friendly female
        rate = 1.10;
        preferredKeywords = ["hazel", "zira", "natural", "google us english", "microsoft zira"];
      } else {
        // Juniper default elegant assistant
        pitch = 1.08;
        rate = 1.02;
        preferredKeywords = ["google us english", "natural", "zira", "siri", "samantha"];
      }

      // Look for custom matched voice profile
      let targetVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        return preferredKeywords.some(kw => name.includes(kw)) && v.lang.startsWith("en");
      });

      // Quick fallback
      if (!targetVoice) {
        targetVoice = voices.find(v => v.lang.startsWith("en-US")) || voices.find(v => v.lang.startsWith("en"));
      }

      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      utterance.rate = rate;   
      utterance.pitch = pitch;  
      utterance.volume = 1.0;  

      utterance.onstart = () => {
        setVoiceLog(`Hey Tahir AI is speaking over a customized (${voiceProfile}) host register...`);
      };
      utterance.onend = () => {
        setVoiceLog(isCallActive ? "Session calibrated. Speak into your microphone..." : "Speech output completed successfully.");
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

  // Dynamically update follow-up inquiry chips based on chat response context
  const updateFollowupSuggestions = (replyText: string) => {
    const lowerReply = replyText.toLowerCase();
    let computedList = [
      "Show Digital Skill Academy tracks?",
      "What are his tuition fees?",
      "Can I enroll if I'm a beginner?",
      "Ask about custom CRM automation"
    ];
    if (lowerReply.includes("admission") || lowerReply.includes("enroll") || lowerReply.includes("academy") || lowerReply.includes("tuition")) {
      computedList = [
        "Join AI Automation Mastery Track",
        "Begin Fullstack Web Dev training",
        "How can I apply for a scholarship?",
        "Show WhatsApp contact verification"
      ];
    } else if (lowerReply.includes("automation") || lowerReply.includes("pipeline") || lowerReply.includes("proposal") || lowerReply.includes("solutions")) {
      computedList = [
        "Zapier vs custom Node orchestrator",
        "What is the average ROI of AI setup?",
        "Can we integrate with Slack alerts?",
        "Configure custom integration flow"
      ];
    } else if (lowerReply.includes("website") || lowerReply.includes("design") || lowerReply.includes("app") || lowerReply.includes("react")) {
      computedList = [
        "What performance tools does he use?",
        "What is modern bento aesthetic?",
        "How long does a custom app take?",
        "Show graphic brand strategy"
      ];
    } else if (lowerReply.includes("pricing") || lowerReply.includes("hire") || lowerReply.includes("rate") || lowerReply.includes("fiverr") || lowerReply.includes("upwork")) {
      computedList = [
        "Consultation rate on Upwork?",
        "Book a call with Tahir",
        "Hire for automation consulting",
        "Is there a project contract template?"
      ];
    }
    setSuggestions(computedList);
  };

  // High fidelity word-by-word streaming typewriter simulator (Claude / ChatGPT style)
  const streamMessageText = (messageText: string, messageId: string, onProgressComplete: () => void) => {
    // Clear any previous streaming timers first
    if (activeStreamIntervalRef.current) {
      clearInterval(activeStreamIntervalRef.current);
    }

    setStreamingMessageId(messageId);
    setStreamingText('');
    
    // Auto speak right away as soon as streaming triggers!
    stopVoice();
    speakText(messageText);

    let index = 0;
    const words = messageText.split(' ');
    
    const interval = window.setInterval(() => {
      if (index < words.length) {
        const nextPartial = words.slice(0, index + 1).join(' ');
        setStreamingText(nextPartial);
        playKeyClick(); // very quiet real-time mechanical keyboard click tick
        index++;
      } else {
        clearInterval(interval);
        activeStreamIntervalRef.current = null;
        setStreamingText('');
        onProgressComplete();
      }
    }, 45); // highly aligned pro-level typing cadence

    activeStreamIntervalRef.current = interval;
  };

  // Hook into continuous component unmount cleanup
  useEffect(() => {
    return () => {
      if (activeStreamIntervalRef.current) {
        clearInterval(activeStreamIntervalRef.current);
      }
    };
  }, []);

  // Submit messaging logic connected to Express backend
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim() || isLoading) return;

    // Interrupt any active speaking and active streams instantly (ChatGPT interruption pattern)
    stopVoice();
    if (activeStreamIntervalRef.current) {
      clearInterval(activeStreamIntervalRef.current);
      activeStreamIntervalRef.current = null;
    }

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

      setVoiceLog("Cognitive stream established. Formulating verbal signal...");

      const mId = `a-${Date.now()}`;
      const agentMessagePlaceholder: ChatMessage = {
        id: mId,
        role: 'assistant',
        content: '', // Starts empty, populated dynamically through streamingText in rendering
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMessagePlaceholder]);

      // Stream text in real time
      streamMessageText(data.reply || "I am processing. Please retry.", mId, () => {
        // Safe finalizer
        setMessages(prev => prev.map(m => m.id === mId ? { ...m, content: data.reply } : m));
        updateFollowupSuggestions(data.reply);
        setVoiceLog("Conversational output completed successfully.");
      });

    } catch (err: any) {
      console.error("AI Agent dispatch failed:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Connection status: STALE_TELEMETRY. Could not establish prompt pipeline. Error: ${err.message || 'Check GEMINI_API_KEY in Secrets context.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
      setVoiceLog("Failed to sync context block.");
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic soundwave / glowing fluid intelligence orb canvas animation loop
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

      const centerX = width / 2;
      const centerY = height / 2;
      
      const isAIActiveSpeaking = synthesisRef.current?.speaking;

      // 1. Ambient Background Aura Glow representing computational intensity
      const aura = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 100);
      if (isAIActiveSpeaking) {
        aura.addColorStop(0, 'rgba(16, 185, 129, 0.22)'); // Emerald speak halo
        aura.addColorStop(1, 'rgba(16, 185, 129, 0)');
      } else if (isListening) {
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.25)'); // Warm amber listen halo
        aura.addColorStop(1, 'rgba(245, 158, 11, 0)');
      } else if (isLoading) {
        aura.addColorStop(0, 'rgba(99, 102, 241, 0.28)'); // Deep indigo thinking halo
        aura.addColorStop(1, 'rgba(124, 58, 237, 0)');
      } else {
        aura.addColorStop(0, 'rgba(168, 85, 247, 0.16)'); // Signature violet idle halo
        aura.addColorStop(1, 'rgba(168, 85, 247, 0)');
      }
      
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 110, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multi-layered interconnected floating vector rings (Apple Intelligence & Gemini style)
      const layerCount = 4;
      for (let l = 0; l < layerCount; l++) {
        ctx.beginPath();
        
        let baseRadius = 45;
        if (isAIActiveSpeaking) {
          baseRadius += Math.sin(tick * 0.12 + l * 1.2) * 8 + 6;
        } else if (isListening) {
          baseRadius += Math.abs(Math.cos(tick * 0.18 + l * 1.5)) * 12 + 2;
        } else if (isLoading) {
          baseRadius += Math.sin(tick * 0.08 + l) * 2.5;
        } else {
          baseRadius += Math.sin(tick * 0.04 + l * 1.8) * 2.8;
        }

        const pointCount = 60;
        for (let p = 0; p <= pointCount; p++) {
          const angle = (p / pointCount) * Math.PI * 2;
          
          let noise = 0;
          if (isAIActiveSpeaking) {
            noise = Math.sin(angle * 4 + tick * 0.15 + l) * 9 * Math.sin(tick * 0.05);
          } else if (isListening) {
            noise = Math.cos(angle * 3 + tick * 0.22 + l) * 11;
          } else if (isLoading) {
            noise = Math.sin(angle * 6 + tick * 0.1) * 3.5;
          } else {
            noise = Math.sin(angle * 2 + tick * 0.05) * 1.8;
          }

          const r = baseRadius + noise;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        // Custom elegant gradients for each intelligence layers
        const gradient = ctx.createLinearGradient(centerX - 50, centerY - 50, centerX + 50, centerY + 50);
        if (isAIActiveSpeaking) {
          if (l === 0) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)'); // Emerald
            gradient.addColorStop(1, 'rgba(52, 211, 153, 0.1)');
          } else if (l === 1) {
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.7)'); // Indigo
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
          } else {
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0.6)'); // Cyan
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
          }
        } else if (isListening) {
          if (l === 0) {
            gradient.addColorStop(0, 'rgba(245, 158, 11, 0.8)'); // Amber
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0.15)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.7)'); // Orange-Red
            gradient.addColorStop(1, 'rgba(245, 158, 11, 0.05)');
          }
        } else if (isLoading) {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.6)'); // Indigo thinking
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
        } else {
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.45)'); // Signature idle violet
          gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.01)');
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = l === 0 ? 3 : l === 1 ? 2 : 1.2;
        ctx.stroke();

        // Fill background of closest layered core
        if (l === 0) {
          ctx.fillStyle = isAIActiveSpeaking 
            ? 'rgba(16, 185, 129, 0.03)' 
            : isListening 
              ? 'rgba(245, 158, 11, 0.03)'
              : 'rgba(168, 85, 247, 0.01)';
          ctx.fill();
        }
      }

      // 3. High frequency interactive core sphere
      ctx.beginPath();
      const coreR = 6 + (isAIActiveSpeaking ? Math.sin(tick * 0.3) * 2 : 0);
      ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
      ctx.fillStyle = isAIActiveSpeaking 
        ? 'rgba(255, 255, 255, 0.85)' 
        : isListening 
          ? 'rgba(245, 158, 11, 0.85)' 
          : 'rgba(168, 85, 247, 0.75)';
      ctx.shadowColor = isAIActiveSpeaking ? '#34d399' : '#a855f7';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset canvas shadow

      // 4. Floating orbiting micro-energy spark trails
      if (isLoading || isAIActiveSpeaking) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const orbitAngle = tick * 0.06 + (i * Math.PI * 2 / particleCount);
          const orbitRadius = 64 + Math.sin(tick * 0.1 + i) * 6;
          const px = centerX + Math.cos(orbitAngle) * orbitRadius;
          const py = centerY + Math.sin(orbitAngle) * orbitRadius;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isAIActiveSpeaking ? '#10b981' : '#a855f7';
          ctx.fill();
        }
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
              <div className="relative flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-100 absolute group-hover:scale-110 transition-transform duration-300 animate-pulse z-10" />
                <Aperture className="w-9 h-9 text-purple-400/40 absolute animate-[spin_4s_linear_infinite] group-hover:text-purple-300" />
                <Hexagon className="w-7 h-7 text-cyan-400/40 absolute animate-[spin_6s_linear_infinite_reverse]" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-3 -right-3 animate-pulse" />
                <span className="absolute -top-1 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
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
                  <div className="p-1.5 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/25 relative flex items-center justify-center overflow-hidden w-8 h-8">
                    <Brain className="w-4.5 h-4.5 text-purple-300 relative z-10" />
                    <Aperture className="w-8 h-8 text-purple-400/30 absolute animate-[spin_5s_linear_infinite]" />
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
                        const isStreaming = streamingMessageId === msg.id;
                        const displayText = isStreaming ? streamingText : msg.content;
                        
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
                                  ? 'bg-purple-950/15 border border-purple-500/15 text-gray-200 rounded-tl-sm shadow-[inset_0_1px_12px_rgba(168,85,247,0.05)]'
                                  : 'bg-indigo-600 border border-indigo-505 text-white rounded-tr-sm'
                              }`}>
                                {isAssistant ? renderFormattedMessage(displayText) : <p className="whitespace-pre-line">{displayText}</p>}
                                
                                {isStreaming && (
                                  <span className="inline-block w-1 h-3.5 bg-purple-400 ml-0.5 animate-pulse transform translate-y-0.5" />
                                )}
                              </div>
                              <div className="flex items-center justify-between px-1">
                                <span className="text-[7.5px] font-mono text-gray-500 block text-left">
                                  {msg.timestamp}
                                </span>
                                {isAssistant && !isStreaming && msg.content && (
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
                        <div className="flex items-start gap-2.5 flex-row">
                          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/15 text-purple-300 shrink-0">
                            <Bot className="w-3.5 h-3.5 animate-spin" />
                          </div>
                          <div className="p-2.5 bg-purple-950/10 border border-purple-500/10 rounded-2xl rounded-tl-sm text-[10px] text-purple-300 font-mono text-left max-w-sm flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                            <span>FORMULATING...</span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Premium Active Voice Profile Switcher */}
                    <div className="px-3 py-2 border-t border-purple-500/10 bg-black/20 text-left flex items-center justify-between">
                      <span className="font-mono text-[7px] text-purple-300 uppercase tracking-widest font-black">Vocal profile:</span>
                      <div className="flex gap-1">
                        {(['juniper', 'cooper', 'samantha', 'ember'] as const).map((prof) => (
                          <button
                            key={prof}
                            onClick={() => {
                              setVoiceProfile(prof);
                              playSynthChime();
                              speakText(`A I voice profile calibrated to ${prof}. ready.`);
                            }}
                            className={`px-1.5 py-0.5 font-mono text-[7px] rounded border transition-all uppercase font-bold cursor-pointer ${
                              voiceProfile === prof
                                ? 'bg-purple-500/20 text-purple-300 border-purple-400/40 shadow-[0_1px_8px_rgba(168,85,247,0.2)]'
                                : 'bg-transparent text-gray-500 border-purple-500/5 hover:text-gray-300 hover:border-purple-500/10'
                            }`}
                          >
                            {prof}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Presets and contextual choices */}
                    <div className="p-3 border-t border-purple-500/10 bg-black/30 text-left">
                      <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block mb-2 font-bold">Contextual Follow-ups</span>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(suggestion)}
                            disabled={isLoading}
                            className="bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/10 hover:border-purple-500/25 active:scale-[0.97] transition-all py-1 px-2 rounded-lg text-[9px] text-gray-300 font-mono cursor-pointer"
                          >
                            ✦ {suggestion}
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
