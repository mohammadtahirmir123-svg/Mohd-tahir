import React, { useEffect, useState, useRef } from 'react';
import { Cpu, Terminal, Shield, Zap, Activity } from 'lucide-react';

export default function CoreSystemEngine() {
  const [cpu, setCpu] = useState(1);
  const [ram, setRam] = useState(12);
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM ONLINE...',
    'CORE ENGINE: ACTIVE',
    'AI NEURAL NET STABLE'
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update stats
  useEffect(() => {
    const int = setInterval(() => {
      setCpu(Math.floor(Math.random() * 20) + 10);
      setRam(Math.floor(Math.random() * 5) + 64);
      
      const newLogs = [
        `> NEURAL LINK SYNCED: ${Math.floor(Math.random()*1000)}ms`,
        `> VECTOR DB CACHED. [OK]`,
        `> PIPELINE ROUTED VIA CORE.`,
        `> AGENT AWAITING INPUT.`,
        `> KNOWLEDGE SYNC: BATCH ${Math.floor(Math.random()*100)}`
      ];

      setLogs(prev => {
        const next = [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 1500);
    return () => clearInterval(int);
  }, []);

  // Animate mini matrix canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = 120;
    let height = canvas.height = 300;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const drops: number[] = [];
    const columns = width / 10;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    let frameId: number;

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#a855f7'; // purple 500
        ctx.font = '10px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 10, drops[i] * 10);
            
            if (drops[i] * 10 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-8 lg:w-36 h-full flex flex-col justify-end pointer-events-none z-[100] border-r border-[#a855f7]/10 bg-gradient-to-r from-[#03000b] to-transparent mix-blend-screen hidden sm:flex">
      
      {/* Top Telemetry */}
      <div className="absolute top-8 left-2 right-2 flex flex-col space-y-4 opacity-50">
        <div className="flex flex-col">
          <span className="font-mono text-[8px] text-purple-400 font-bold mb-1">CORE 01</span>
          <div className="h-1 bg-gray-900 rounded w-full overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${cpu}%` }} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[8px] text-indigo-400 font-bold mb-1">MEM CACHE</span>
          <div className="h-1 bg-gray-900 rounded w-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${ram}%` }} />
          </div>
        </div>
      </div>

      {/* Middle Rotator Icons */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center justify-center space-y-6 opacity-30">
        <Cpu className="w-4 h-4 text-purple-500 animate-pulse" />
        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
        <Zap className="w-4 h-4 text-indigo-500 animate-[spin_4s_linear_infinite]" />
      </div>

      {/* Mini Matrix Effect */}
      <div className="mx-auto mt-auto mb-8 w-24 h-48 opacity-30 mask-linear-fade">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* Console logs */}
      <div className="px-2 pb-6 space-y-1 w-full overflow-hidden">
        {logs.map((log, i) => (
          <div key={i} className="font-mono text-[7.5px] text-purple-300/60 leading-none whitespace-nowrap opacity-75">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
