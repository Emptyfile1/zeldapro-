import React, { useRef, useState } from 'react';
import { Home, Zap, Activity, Wifi } from 'lucide-react';

export const SmartHomeVisual = () => {
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
      className="relative w-full aspect-[4/3] max-w-[795px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#EBF2FA] via-[#D8E6F8] to-[#C9DEF5] shadow-2xl border border-white/60 p-6 flex items-center justify-center transition-transform duration-300"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
      }}
    >
      {/* Background Soft Studio Ambient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563EB15_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Modern Studio Background Elements */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent z-10" />

      {/* Engineer Silhouette / Backview Studio Technician */}
      <div
        className="absolute bottom-6 left-12 z-20 transition-transform duration-500"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)`,
        }}
      >
        <div className="relative">
          {/* Technologist Body Silhouette */}
          <div className="w-28 sm:w-36 h-48 sm:h-64 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 rounded-t-full shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Collar & shirt detail */}
            <div className="w-8 h-7 bg-slate-300 rounded-full mt-3 opacity-90" />
            <div className="w-14 h-12 bg-slate-400 rounded-t-md mt-1 opacity-40" />
            {/* Soft rim light */}
            <div className="absolute inset-y-0 right-0 w-3 bg-blue-400/40 blur-sm" />
          </div>

          {/* Laptop & Desk at bottom */}
          <div className="absolute -bottom-2 -left-6 w-36 h-12 bg-neutral-900 rounded-t-lg shadow-xl border-t border-neutral-700 flex items-center justify-center">
            <div className="w-20 h-1 bg-blue-500/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Central Holographic Dome and Connected Smart Systems */}
      <div
        className="relative z-20 flex items-center justify-center w-full max-w-[560px] h-[360px] transition-transform duration-700"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 12}px)`,
        }}
      >
        {/* Holographic Glowing Outer Rings */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-blue-400/30 animate-[spin_25s_linear_infinite]" />
        <div className="absolute w-60 sm:w-80 h-60 sm:h-80 rounded-full border border-dashed border-cyan-400/40 animate-[spin_18s_linear_infinite_reverse]" />
        <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-radial from-blue-500/15 via-cyan-400/10 to-transparent blur-md" />

        {/* Floating Futuristic House Hologram Wireframe (Center) */}
        <div className="relative z-30 flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_12px_36px_rgba(37,99,235,0.22)] border border-blue-200/80 animate-[bounce_4s_ease-in-out_infinite]">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
            <Home className="w-10 h-10 stroke-[1.75]" />
          </div>
          <span className="font-['Sora'] font-semibold text-xs tracking-wider uppercase text-blue-900 mt-2">
            Smart Ecosystem
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-['JetBrains_Mono'] text-blue-700 font-medium">ONLINE · 48 NODES</span>
          </div>
        </div>

        {/* Floating Connected Appliance: Smart Washer / Laundry (Right) */}
        <div className="absolute right-2 sm:right-6 top-8 z-20 flex flex-col items-center bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-blue-100 animate-[bounce_5s_ease-in-out_infinite_1s]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center shadow-inner relative">
            <div className="w-7 h-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <span className="text-[10px] font-['Manrope'] font-bold text-slate-800 mt-1.5">Smart Washer</span>
          <span className="text-[9px] font-['JetBrains_Mono'] text-blue-600">Cycle: 98% AI Opt</span>
        </div>

        {/* Floating Connected Appliance: Smart Precision Espresso Machine (Top Left) */}
        <div className="absolute left-6 sm:left-14 top-4 z-20 flex flex-col items-center bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-blue-100 animate-[bounce_4.5s_ease-in-out_infinite_0.5s]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-['Manrope'] font-bold text-slate-800 mt-1.5">IoT Kitchen</span>
          <span className="text-[9px] font-['JetBrains_Mono'] text-cyan-700">Telemetry: Stable</span>
        </div>

        {/* Floating Sensor Telemetry HUD (Bottom Right) */}
        <div className="absolute right-4 bottom-4 z-20 bg-slate-900/90 text-white backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] font-['JetBrains_Mono'] uppercase tracking-widest text-slate-400">Mesh Telemetry</span>
            <span className="text-xs font-['JetBrains_Mono'] font-semibold text-emerald-300">Latency: 1.2ms</span>
          </div>
        </div>

        {/* Floating Connected Device Badge (Bottom Left) */}
        <div className="absolute left-10 sm:left-24 bottom-6 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-blue-200 flex items-center gap-2">
          <Wifi className="w-4 h-4 text-blue-600" />
          <span className="text-[11px] font-['Manrope'] font-semibold text-slate-800">WiFi 7 / Zigbee 3.0</span>
        </div>

        {/* Holographic Connecting Rays SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
          <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
};
