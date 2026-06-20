import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Workflow, Lock, Zap } from 'lucide-react';

export default function GlobalCommandTerminal() {
  const [inputStr, setInputStr] = useState('');
  const [logs, setLogs] = useState<{ id: number, text: string, type: 'info' | 'success' | 'warn' | 'error' }[]>([
    { id: 1, text: 'SYS_INIT: Mohd Tahir Advanced AI Framework v3.4 [SECURE]', type: 'info' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Connect via SSH tunneling...');

  // Auto-logs to simulate "live engine"
  useEffect(() => {
    const aiEvents = [
      '[PROCESS] Analyzing traffic patterns...',
      '[ROUTER] Packet loss at 0.00%.',
      '[AI_AGENT] Generating new cognitive path...',
      '[WORKFLOW] Synced with external calendar API.',
      '[DATABASE] Vector Index optimized: 34ms',
      '[SECURITY] Firewall nominal. Zero threats detected.',
      '[KERNEL] Core engine stable at 24°C',
    ];

    const intId = setInterval(() => {
      const event = aiEvents[Math.floor(Math.random() * aiEvents.length)];
      let type: 'info' | 'success' | 'warn' | 'error' = 'info';
      if (event.includes('[SECURITY]')) type = 'success';
      if (event.includes('[WORKFLOW]')) type = 'success';
      
      setLogs(prev => {
        const newItem: { id: number, text: string, type: 'info' | 'success' | 'warn' | 'error' } = { id: Date.now(), text: event, type };
        const next = [...prev, newItem];
        if (next.length > 3) next.shift();
        return next;
      });
    }, 4500);

    return () => clearInterval(intId);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputStr.trim()) return;

    setLogs(prev => {
      const newItem: { id: number, text: string, type: 'info' | 'success' | 'warn' | 'error' } = { id: Date.now(), text: `> ${inputStr}`, type: 'info' };
      const next = [...prev, newItem];
      if (next.length > 3) next.shift();
      return next;
    });

    const cmd = inputStr.toLowerCase().trim();
    setInputStr('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      let type: 'info' | 'success' | 'warn' | 'error' = 'success';

      if (cmd === 'help') {
        response = 'AVAILABLE COMMANDS: clear, status, deploy, hire, ping';
      } else if (cmd === 'clear') {
        setLogs([{ id: Date.now(), text: 'Console cleared.', type: 'info' }]);
        setIsTyping(false);
        return;
      } else if (cmd === 'status') {
        response = 'SYSTEM STATUS: All core nodes nominal. API latency: 12ms.';
      } else if (cmd === 'deploy') {
        response = 'DEPLOYMENT: Autonomous agent staging initiated...';
      } else if (cmd === 'hire') {
        response = 'ROUTING: Opening secure channel to Mohd Tahir...';
        window.location.hash = '#contact';
      } else if (cmd === 'ping') {
        response = 'PONG: Transmission received.';
      } else {
        response = `COMMAND NOT RECOGNIZED: '${cmd}'. Type 'help' for options.`;
        type = 'error';
      }

      setLogs(prev => {
        const newItem: { id: number, text: string, type: 'info' | 'success' | 'warn' | 'error' } = { id: Date.now(), text: response, type };
        const next = [...prev, newItem];
        if (next.length > 3) next.shift();
        return next;
      });
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-4 pb-4 hidden md:flex justify-center">
      <div className="max-w-2xl w-full bg-[#050012]/85 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col pointer-events-auto transition-all hover:border-purple-500/40">
        
        {/* Terminal Header */}
        <div className="bg-[#08021a] px-3 py-1.5 flex items-center justify-between border-b border-purple-500/20">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono text-[9px] text-purple-300 font-bold uppercase tracking-widest">
              Live Neural Core OS
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[8px] text-emerald-400 uppercase font-black tracking-wider">
              ONLINE
            </span>
          </div>
        </div>

        {/* Console Logs Area */}
        <div className="px-4 py-3 h-[72px] overflow-hidden flex flex-col justify-end space-y-1">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className={`font-mono text-[10px] tracking-wide animate-fade-in
                ${log.type === 'info' ? 'text-purple-200/80' : ''}
                ${log.type === 'success' ? 'text-emerald-400' : ''}
                ${log.type === 'error' ? 'text-red-400' : ''}
                ${log.type === 'warn' ? 'text-amber-400' : ''}
              `}
            >
              {log.text}
            </div>
          ))}
          {isTyping && (
             <div className="font-mono text-[10px] text-purple-400/50 animate-pulse tracking-wide">
               Generating response...
             </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="px-4 py-2 border-t border-purple-500/10 bg-[#020008] flex items-center">
          <span className="font-mono text-purple-400 text-sm mr-2">{'>'}</span>
          <form className="flex-1" onSubmit={handleCommandSubmit}>
            <input
              type="text"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              placeholder="Enter command (e.g. 'help', 'hire')..."
              className="w-full bg-transparent border-none outline-none font-mono text-[11px] text-white placeholder-purple-900/50"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div className="flex space-x-1 ml-2">
             <Shield className="w-3 h-3 text-purple-500/50" />
             <Workflow className="w-3 h-3 text-purple-500/50" />
          </div>
        </div>

      </div>
    </div>
  );
}
