import React, { useRef, useState } from 'react';
import { Layers, Terminal, Sparkles, TrendingUp, Database, ShieldCheck } from 'lucide-react';

export const DigitalPlatformVisual = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative w-full aspect-[4/3] max-w-[794px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#E2ECF8] via-[#D3E3F5] to-[#B9D5F4] shadow-2xl border border-white/70 p-6 flex items-center justify-center transition-transform duration-300"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
      }}
    >
      {/* Background Soft Grid & Light Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(#1D4ED820_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-bl from-blue-400/30 via-indigo-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl" />

      {/* Main 3D Composition Container */}
      <div className="relative z-20 w-full max-w-[620px] h-[380px] flex items-center justify-center">

        {/* 1. The Luminous Code Prism / Portal Cube (Left-Center) */}
        <div
          className="absolute left-2 sm:left-8 top-10 sm:top-14 z-25 transition-transform duration-500"
          style={{
            transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -10}px)`,
          }}
        >
          <div className="relative group">
            {/* Swirling Spiral Light Vortex Behind Cube */}
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-2xl opacity-40 animate-[pulse_4s_ease-in-out_infinite]" />

            {/* Glowing Crystal Monolith */}
            <div className="w-36 sm:w-48 h-52 sm:h-64 rounded-3xl bg-gradient-to-b from-blue-900/90 via-slate-900/95 to-blue-950 border border-blue-400/50 shadow-[0_16px_40px_rgba(29,78,216,0.35)] backdrop-blur-xl p-5 flex flex-col justify-between overflow-hidden">
              {/* Swirling inner glow ring */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border-2 border-dashed border-cyan-400/40 animate-[spin_12s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" />

              {/* Code Brackets `{ }` Prominent in Center */}
              <div className="flex items-center justify-between text-blue-400/80">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="font-['JetBrains_Mono'] text-[10px] text-blue-300">v4.8·STABLE</span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto">
                <span className="font-['JetBrains_Mono'] font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 drop-shadow-[0_4px_12px_rgba(6,182,212,0.6)]">
                  {'{ }'}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-cyan-200 mt-2">
                  AI Core Engine
                </span>
              </div>

              {/* Mini activity bar */}
              <div className="w-full bg-blue-950/80 rounded-lg p-2 border border-blue-800/40 flex items-center justify-between">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="text-[9px] font-['JetBrains_Mono'] text-blue-300">99.98% OPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Floating Futuristic UI Glass Dashboard (Right-Center) */}
        <div
          className="absolute right-2 sm:right-6 top-8 sm:top-12 z-30 transition-transform duration-700"
          style={{
            transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 14}px)`,
          }}
        >
          <div className="w-56 sm:w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.15)] border border-white p-4 sm:p-5 flex flex-col gap-3">
            {/* Header with dots and title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="font-['Sora'] font-semibold text-xs text-slate-900">
                  Intelligent App
                </span>
              </div>
              <span className="text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                Live
              </span>
            </div>

            {/* Sparkline chart & metrics */}
            <div className="flex items-end justify-between gap-2 pt-1">
              <div>
                <span className="text-[10px] font-['Manrope'] text-slate-500 uppercase tracking-wider block">
                  Autonomous Throughput
                </span>
                <span className="text-xl font-['Sora'] font-bold text-slate-950">
                  4.8M req/s
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+34.2%</span>
              </div>
            </div>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-12 bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              {[40, 65, 55, 80, 70, 95, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-300 hover:brightness-110"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Floating Mobile Device Preview (Far Right Bottom) */}
        <div
          className="absolute right-8 sm:right-16 bottom-2 z-35 transition-transform duration-500"
          style={{
            transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 18}px)`,
          }}
        >
          <div className="w-24 sm:w-28 h-40 sm:h-48 bg-slate-950 rounded-2xl shadow-2xl border-2 border-slate-700 p-2 flex flex-col justify-between">
            {/* Notch */}
            <div className="w-8 h-1.5 bg-slate-800 rounded-full mx-auto" />

            {/* App UI */}
            <div className="flex flex-col gap-1.5 my-auto">
              <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="w-12 h-2 bg-slate-700 rounded mx-auto" />
              <div className="w-16 h-1.5 bg-slate-800 rounded mx-auto" />
            </div>

            {/* Home bar */}
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto" />
          </div>
        </div>

        {/* 4. Floating 3D Data Cubes around portal */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-blue-100 shadow-md">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[10px] font-['JetBrains_Mono'] text-slate-800 font-semibold">
            Neural Cache Active
          </span>
        </div>

        <div className="absolute left-40 sm:left-48 bottom-4 z-20 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-['JetBrains_Mono'] font-medium">
            Zero-Trust Protocol
          </span>
        </div>
      </div>
    </div>
  );
};
