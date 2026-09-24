import React, { useState, useRef } from 'react';
import { Brain, Cpu, Database, Network, Sparkles, Workflow, Zap, CheckCircle2 } from 'lucide-react';

export const AiShowcase = ({ onExploreTech }) => {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.02);
    setRotateY(x * 0.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setActiveNode(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[680px] aspect-[679/541] select-none group perspective-1000"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/40 via-indigo-100/30 to-purple-100/30 rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main architectural diagram canvas container */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#F9FAF9] via-[#F4F5F7] to-[#EDEDF2] p-4 sm:p-6 shadow-[0_25px_60px_rgba(11,27,61,0.14)] border border-slate-200/90 overflow-hidden flex flex-col justify-between"
      >
        {/* Fine background schematic grid */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Top bar indicators */}
        <div className="relative z-20 flex items-center justify-between text-xs font-sora">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs text-slate-800">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">Neural Architecture Hub</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-blue-50/90 border border-blue-200/80 px-2.5 py-1 rounded text-blue-700 text-[11px] font-mono">
            <span>Model Convergence: 99.8%</span>
          </div>
        </div>

        {/* Central Radial AI Hub with SVG circuit interconnects */}
        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* SVG Interconnecting Circuit Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0B1B3D" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Orbit rings */}
            <circle cx="50%" cy="50%" r="70" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50%" cy="50%" r="125" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
            <circle cx="50%" cy="50%" r="175" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />

            {/* Spokes to corners */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>

          {/* Central AI Intelligence Core */}
          <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white shadow-[0_10px_35px_rgba(29,78,216,0.2)] border-2 border-blue-500/80 flex flex-col items-center justify-center p-3 group-hover:scale-105 transition-transform duration-500">
            {/* Pulsing inner aura */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent animate-spin-slow pointer-events-none" />
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#0B1B3D] flex items-center justify-center text-white shadow-md mb-1">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 tracking-tight text-center leading-none">
              AI
            </span>
            <span className="font-sora text-[9px] sm:text-[10px] text-blue-600 font-medium tracking-wide text-center">
              intelligence
            </span>

            {/* Micro active status */}
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-mono text-slate-400">Autonomous</span>
            </div>
          </div>

          {/* Radial Module 1: Decision-Making */}
          <div
            onMouseEnter={() => setActiveNode('decision')}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute top-2 left-2 sm:left-6 w-32 sm:w-44 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/90 z-10 transition-all duration-200 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-[10px] font-sora font-semibold text-slate-800">Decision-Making</span>
              <Cpu className="w-3 h-3 text-blue-600" />
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="text-[8px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/50 flex items-center justify-between">
                <span>Option 1</span>
                <span className="text-blue-600 font-mono">Rank #1</span>
              </div>
              <div className="text-[8px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/50">
                Option 2 (Fallback)
              </div>
            </div>
          </div>

          {/* Radial Module 2: Data Analysis */}
          <div
            onMouseEnter={() => setActiveNode('data')}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute top-2 right-2 sm:right-6 w-32 sm:w-44 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/90 z-10 transition-all duration-200 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-[10px] font-sora font-semibold text-slate-800">Data Analysis</span>
              <Database className="w-3 h-3 text-blue-600" />
            </div>
            <div className="mt-1.5 flex items-end gap-1 h-6">
              <div className="flex-1 bg-blue-200 h-3 rounded-xs" />
              <div className="flex-1 bg-blue-400 h-5 rounded-xs" />
              <div className="flex-1 bg-blue-600 h-6 rounded-xs" />
              <div className="flex-1 bg-indigo-600 h-4 rounded-xs" />
            </div>
            <span className="block text-[8px] text-slate-400 mt-1 font-mono">1.2B Tokens Streamed</span>
          </div>

          {/* Radial Module 3: Recommendations */}
          <div
            onMouseEnter={() => setActiveNode('recommendations')}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute bottom-12 left-2 sm:left-6 w-32 sm:w-44 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/90 z-10 transition-all duration-200 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[10px] font-sora font-semibold text-slate-800">Recommendations</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="mt-1 text-[8px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                <span>Vector Semantic Search</span>
              </div>
              <div className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                <span>Hybrid Re-ranking</span>
              </div>
            </div>
          </div>

          {/* Radial Module 4: Automation & ML */}
          <div
            onMouseEnter={() => setActiveNode('automation')}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute bottom-12 right-2 sm:right-6 w-32 sm:w-44 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/90 z-10 transition-all duration-200 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[10px] font-sora font-semibold text-slate-800">Machine Learning</span>
              <Workflow className="w-3 h-3 text-blue-600" />
            </div>
            <div className="mt-1 space-y-1">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-slate-500">Fine-Tuning:</span>
                <span className="text-emerald-600 font-mono font-medium">Completed</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-slate-500">Model Refinement</span>
                <span className="text-blue-600 font-mono">v4.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge info */}
        <div className="relative z-20 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-sora">
          <span className="text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Full-Cycle LLM & Agentic Pipeline
          </span>
          <button 
            onClick={onExploreTech}
            className="hover:text-blue-600 font-medium cursor-pointer"
          >
            AI Architecture Specs &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
