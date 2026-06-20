import React, { useState, useEffect, useRef } from 'react';
import { AI_PROJECTS } from '../data';
import { Cpu, ArrowRight, Zap, Terminal, Sparkles, Play, RefreshCw, Layers, ShieldCheck, Database, Check, AlertCircle } from 'lucide-react';

interface SimulationStep {
  label: string;
  log: string;
}

interface SimulationDataset {
  trigger: string;
  steps: SimulationStep[];
  finalResult: string;
}

const SIMULATOR_DATA: Record<string, SimulationDataset> = {
  ai1: {
    trigger: 'Client WhatsApp inquiry: "Can you build an automated email campaign synced to our calendar?"',
    steps: [
      { label: 'Receive Message', log: '📥 Webhook received from WhatsApp API. Parsing client intent... "automated email campaign"' },
      { label: 'Knowledge Fetch', log: '🔍 Querying pinecone vector DB. Retrieved 4 matched case studies & calendar API SLA documents.' },
      { label: 'Draft AI Answer', log: '🧠 Prompting Gemini 2.5-Flash with context. Generated responsive SLA pitch and free times.' },
      { label: 'Action CRM Sync', log: '📂 Appending lead attributes in HubSpot CRM. Set priority to HIGH, stage to QUALIFIED.' }
    ],
    finalResult: '🚀 Answer successfully sent on WhatsApp. Lead saved & auto-scheduling workflow active!'
  },
  ai2: {
    trigger: 'New corporate subscription event logged: "ops-manager@synergygroup.com"',
    steps: [
      { label: 'Form Submit', log: '📥 Webhook triggered on user registration. Staged email: "ops-manager@synergygroup.com"' },
      { label: 'Data Scraper', log: '🌐 OSINT search triggered. Synergy Group registered: Headcount 240, Funding: $12M Series A.' },
      { label: 'AI Qualifier', log: '✨ scoring lead... Score: 94/100 (HIGH TICKET). Synthesized high-impact outbound intro email.' },
      { label: 'Slack PING', log: '📢 Dispatched Slack card to #enterprise-leads. Appended research profiles and automated pitch draft.' }
    ],
    finalResult: '🎯 Enterprise account scored as prime. Slack alert dispatched & executive pitch queued!'
  },
  ai3: {
    trigger: 'Strategic trend published on RSS: "Tailwind CSS Next-Gen performance tokens"',
    steps: [
      { label: 'RSS Trend Scrape', log: '📥 Monitored feed triggered. Extracted article title: "Tailwind v4.0 is now open for production"' },
      { label: 'AI Summarise', log: '🤖 Read article contents. Crafted bullet highlights: "native rust compiler speed, standard ESM rules".' },
      { label: 'Asset Draft', log: '🎨 Outbound graphic template prompt configured. Generated cohesive X & LinkedIn summaries.' },
      { label: 'Buffer Queue', log: '📅 Buffer calendar synced. Scheduled automated publication for optimal timezone window.' }
    ],
    finalResult: '📝 Strategic trend content formulated, social adapters created & queued automatically!'
  },
  ai4: {
    trigger: 'Stripe webhook event captured: "invoice.payment_succeeded" [Amt: $2,500.00]',
    steps: [
      { label: 'Stripe Payment', log: '💳 Confirmed incoming Stripe capture ref "ch_92aX91" for professional retainer package.' },
      { label: 'Invoice Gen', log: '📄 Populated Excel document template "Retainer_SLA_M_Tahir.xlsx" and saved local PDF.' },
      { label: 'Google Drive', log: '📁 Connected to Google Drive REST API. Uploaded invoice. PDF saved under Client Archives.' },
      { label: 'Invite Sent', log: '✉️ Dispatching SMTP automated welcome pack, custom CRM access links & free consultation scheduler.' }
    ],
    finalResult: '💼 Retainer registered. Professional invoice stored & onboard welcome kit auto-transmitted!'
  }
};

export default function AIShowcase() {
  const [activeProject, setActiveProject] = useState(AI_PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<'schematic' | 'simulator'>('schematic');
  
  // Simulator state machine
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const timeoutRefs = useRef<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedProj = AI_PROJECTS.find(p => p.id === activeProject) || AI_PROJECTS[0];
  const simData = SIMULATOR_DATA[activeProject] || SIMULATOR_DATA.ai1;

  // Clear timeouts helper
  const clearSimulation = () => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
    setIsSimulating(false);
    setCurrentStepIndex(-1);
    setSimLogs([]);
  };

  useEffect(() => {
    clearSimulation();
  }, [activeProject]);

  // Execute simulation trigger
  const triggerSimulationRun = () => {
    if (isSimulating) return;

    clearSimulation();
    setIsSimulating(true);
    setCurrentStepIndex(0);
    setSimLogs([`[TRIGGER_EVENT] ▶ ${simData.trigger}`]);

    // Schedule subsequent steps with interval timing
    const delay = 1600;
    
    simData.steps.forEach((step, idx) => {
      const t = window.setTimeout(() => {
        setCurrentStepIndex(idx);
        setSimLogs(prev => [
          ...prev,
          `[STEP_0${idx + 1}] Running: ${step.label}...`,
          ` ▶ ${step.log}`
        ]);
      }, delay * (idx + 1));
      timeoutRefs.current.push(t);
    });

    // Schedule complete step
    const successTimeout = window.setTimeout(() => {
      setCurrentStepIndex(4);
      setSimLogs(prev => [
        ...prev,
        `[SUCCESS_COMPLETED] Verification success.`,
        `🏆 ${simData.finalResult}`
      ]);
      setIsSimulating(false);
    }, delay * (simData.steps.length + 1));
    timeoutRefs.current.push(successTimeout);
  };

  // 3D Isometric flow path canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // Draw parameters
    let animationFrameId: number;
    let particleOffset = 0;

    // Define 4 nodes in isometric sequence
    const render = () => {
      if (!ctx || !canvas) return;
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // 1. Draw tilted grid background (digital floor mesh)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.lineWidth = 1;

      // Draw rows representing prospective planes
      const floorY = height * 0.55;
      for (let i = 0; i < 8; i++) {
        const yCoord = floorY + (i - 4) * 15;
        ctx.beginPath();
        ctx.moveTo(width * 0.05, yCoord - (i - 4) * 5);
        ctx.lineTo(width * 0.95, yCoord + (i - 4) * 5);
        ctx.stroke();
      }

      // 2. Define our 4 automation pipeline stages
      const numNodes = 4;
      const nodeXSpacing = width / (numNodes + 1);
      const points = Array.from({ length: numNodes }, (_, idx) => {
        // Tilted wave wave layout
        const x = nodeXSpacing * (idx + 1);
        const hoverOffsetY = Math.sin(Date.now() * 0.002 + idx * 1.5) * 8;
        const y = height * 0.5 + hoverOffsetY;
        return { x, y, idx };
      });

      // 3. Draw connected laser pipelines (edges)
      for (let i = 0; i < points.length - 1; i++) {
        const ptA = points[i];
        const ptB = points[i + 1];

        // Background pipeline duct
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ptA.x, ptA.y);
        ctx.lineTo(ptB.x, ptB.y);
        ctx.stroke();

        // Inner core laser line
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ptA.x, ptA.y);
        ctx.lineTo(ptB.x, ptB.y);
        ctx.stroke();

        // Animated traveling telemetry pulses
        ctx.fillStyle = 'rgba(168, 85, 247, 0.85)';
        const dx = ptB.x - ptA.x;
        const dy = ptB.y - ptA.y;
        
        // Render 2 pulses along the path
        for (let p = 0; p < 2; p++) {
          const t = ((particleOffset + p * 0.5) % 1.0);
          const px = ptA.x + dx * t;
          const py = ptA.y + dy * t;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      particleOffset += 0.005;

      // 4. Draw node circular plates
      points.forEach((pt) => {
        const isCurrent = currentStepIndex === pt.idx;
        const isPast = currentStepIndex > pt.idx;

        // Custom pulsing ring if active
        if (isCurrent) {
          const rGlow = 22 + Math.abs(Math.sin(Date.now() * 0.008)) * 14;
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)'; // Mint green when active
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rGlow, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner halo plate
        const radGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 18);
        if (isCurrent) {
          radGrad.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
          radGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');
        } else if (isPast) {
          radGrad.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
          radGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
        } else {
          radGrad.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
          radGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');
        }
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 18, 0, Math.PI * 2);
        ctx.fill();

        // Edge frame circles
        ctx.strokeStyle = isCurrent 
          ? 'rgba(52, 211, 153, 0.8)' 
          : isPast 
            ? 'rgba(168, 85, 247, 0.6)' 
            : 'rgba(124, 58, 237, 0.25)';
        ctx.lineWidth = isCurrent ? 2 : 1;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glowing core
        ctx.fillStyle = isCurrent 
          ? '#10b981' 
          : isPast 
            ? '#a855f7' 
            : 'rgba(124, 58, 237, 0.3)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Step Label Number Tags
        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = isCurrent ? '#10b981' : '#a855f7';
        ctx.textAlign = 'center';
        ctx.fillText(`SYSTEM_0${pt.idx + 1}`, pt.x, pt.y - 20);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStepIndex, selectedProj]);

  return (
    <section id="automation" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      {/* Absolute futuristic decoration */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid line background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_4px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            AUTONOMOUS COGNITIVE SOLUTIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            AI-Powered Solutions
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Unleashing continuous background process pipelines to cut administrative friction and convert organic signals 24 hours a day.
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Master Bento Multi-Panel Grid for AI showpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Left Column: Solution selector cards (5 wide) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-6">
              SELECT AUTOMATION SYSTEM
            </h4>

            <div className="space-y-3.5">
              {AI_PROJECTS.map((proj) => {
                const isActive = activeProject === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProject(proj.id);
                    }}
                    className={`w-full p-6 rounded-2xl border transition-all duration-350 cursor-pointer text-left relative overflow-hidden group block ${
                      isActive
                        ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'bg-purple-500/5 border-purple-500/10 hover:border-purple-500/25'
                    }`}
                  >
                    {/* Tiny active orb icon */}
                    {isActive && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)] animate-ping" />
                    )}

                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg border text-purple-300 transition-colors ${
                        isActive ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-500/5 border-purple-500/10'
                      }`}>
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                        {proj.title}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs mt-3 leading-relaxed font-light line-clamp-2">
                      {proj.description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-purple-400 uppercase tracking-wide">
                        [ {proj.status} ]
                      </span>
                      <span className="text-gray-550 group-hover:text-white transition-colors flex items-center space-x-1">
                        <span>inspect workflow</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Workflow visualization terminal (7 wide) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
              
              {/* Terminal Title & View Toggle Tabs */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-purple-500/15 pb-4 mb-6 gap-4">
                <div className="flex items-center space-x-2.5">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest pl-2 border-l border-white/10">
                    Tactical Workspace Controller
                  </span>
                </div>
                
                {/* View switcher tabs */}
                <div className="flex bg-black/60 border border-purple-500/20 p-1 rounded-xl w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setViewMode('schematic');
                      clearSimulation();
                    }}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === 'schematic'
                        ? 'bg-purple-500/15 border border-purple-500/30 text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Schematic Flow
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('simulator');
                      clearSimulation();
                    }}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === 'simulator'
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-[#10b981] font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Live Simulator
                  </button>
                </div>
              </div>

              {/* View Content Panel */}
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                
                {viewMode === 'schematic' ? (
                  /* SCHEMATIC MODE */
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-white uppercase flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>{selectedProj.title}</span>
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-xs mt-1.5 leading-relaxed font-light text-left">
                        {selectedProj.description}
                      </p>
                    </div>

                    {/* Animated pipeline circuit canvas */}
                    <div className="relative w-full h-[150px] bg-black/55 border border-purple-500/15 rounded-2xl overflow-hidden my-4">
                      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                      <div className="absolute top-2.5 left-3 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                        <span className="font-mono text-[7.5px] text-purple-400 uppercase tracking-widest font-bold">
                          3D_PIPELINE_FLOW_SCHEMATIC
                        </span>
                      </div>
                    </div>

                    {/* Technical details matrix list */}
                    <div className="space-y-3 text-left">
                      <span className="font-mono text-[8px] text-gray-500 tracking-wider block uppercase">
                        PIPELINE JUNCTIONS
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedProj.steps.map((st, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-[#03000b]/60 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300"
                          >
                            <div className="flex items-center space-x-1.5 text-purple-400 font-mono text-[8px] uppercase tracking-widest font-black">
                              <span className="text-purple-600">0{i + 1} //</span>
                              <span>{st.label}</span>
                            </div>
                            <p className="text-gray-300 text-[10px] mt-1 leading-normal font-sans font-light">
                              {st.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SIMULATOR MODE */
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left bg-purple-950/15 border border-purple-500/10 p-3 rounded-2xl">
                      <div>
                        <span className="font-mono text-[7px] text-purple-400 uppercase tracking-widest block font-bold">Inbound Launch Event</span>
                        <p className="text-gray-200 text-xs font-sans mt-0.5 max-w-md line-clamp-1">
                          ↳ "{simData.trigger}"
                        </p>
                      </div>

                      <button
                        onClick={triggerSimulationRun}
                        disabled={isSimulating}
                        className={`w-full sm:w-auto px-4 py-2 text-[9px] font-mono font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shrink-0 ${
                          isSimulating
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 cursor-not-allowed'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10 hover:scale-[1.03] active:scale-[0.97]'
                        }`}
                      >
                        {isSimulating ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                            <span>Simulating...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                            <span>TRIGGER AUTOMATION</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Terminal simulator live display */}
                    <div className="relative flex-1 min-h-[220px] bg-black/60 border border-purple-500/20 rounded-2xl p-4 sm:p-5 font-mono text-[10.5px] text-left flex flex-col justify-between overflow-hidden">
                      {/* Terminal scanline */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.03)_2%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-10" />
                      
                      {/* Ticking live indicators */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-500/10 relative z-10 text-[8px] text-gray-500">
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                          <span>STATE: {isSimulating ? 'RUNNING_INTELLIGENT_THREADS' : 'SYS_ONLINE'}</span>
                        </div>
                        <span>STEPS COMPLETED: {currentStepIndex === 4 ? '4 / 4' : isSimulating ? `${currentStepIndex + 1} / 4` : '0 / 4'}</span>
                      </div>

                      {/* Log lists with dynamic auto scrolling layout */}
                      <div className="flex-1 space-y-2 relative z-10 overflow-auto max-h-[160px] pr-2">
                        {simLogs.length === 0 ? (
                          <div className="text-gray-500 flex flex-col items-center justify-center py-10 text-center text-xs">
                            <AlertCircle className="w-5 h-5 text-gray-600 mb-1.5" />
                            <span>Interactive Agent simulator is fully prepared.</span>
                            <span className="text-[9px] text-gray-700 mt-1 uppercase tracking-wider">Press the green button above to trigger launch event</span>
                          </div>
                        ) : (
                          simLogs.map((log, idx) => {
                            let logColor = 'text-gray-300';
                            let prefix = '> ';

                            if (log.includes('[TRIGGER_EVENT]')) {
                              logColor = 'text-purple-300 font-bold';
                              prefix = '';
                            } else if (log.includes('[SUCCESS_COMPLETED]')) {
                              logColor = 'text-emerald-400 font-bold';
                              prefix = '✔ ';
                            } else if (log.includes('[STEP_')) {
                              logColor = 'text-amber-400 font-medium';
                              prefix = '⚙ ';
                            } else if (log.startsWith('🏆')) {
                              logColor = 'text-emerald-300 font-black';
                              prefix = '';
                            }

                            return (
                              <div key={idx} className={`${logColor} mt-1 leading-normal transition-opacity duration-350`}>
                                {prefix}{log}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Progress strip */}
                      <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-[8px] text-gray-500 relative z-10">
                        <span>SYS_LOGS_STREAM</span>
                        <span className="font-bold text-purple-400">NODE ID: {activeProject.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Impact Metrics Overlay */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-900/15 to-indigo-900/15 border border-purple-500/25 text-left">
                  <div className="flex items-center space-x-2 text-indigo-400 font-mono text-[9px] uppercase tracking-wider font-extrabold mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Verified SaaS Metric & Outbox</span>
                  </div>
                  <p className="text-white text-xs font-semibold leading-relaxed font-sans">
                    {selectedProj.metrics}
                  </p>
                </div>
              </div>

              {/* Status footer with action */}
              <div className="relative z-10 mt-6 pt-5 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest text-left">
                  Integrations: ChatGPT // Zapier // Make.com // CRM REST API
                </span>

                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[#f3f4f6] hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Request Consultation Now
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
