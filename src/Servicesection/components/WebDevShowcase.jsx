import React, { useRef, useState } from 'react';
import { ExternalLink, Code2, Globe, Cpu, CheckCircle2 } from 'lucide-react';

export const WebDevShowcase = ({ onExploreTech }) => {
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeTab, setActiveTab] = useState('preview');

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.025);
    setRotateY(x * 0.025);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[640px] aspect-[628/544] select-none group perspective-1000"
    >
      {/* Subtle ambient light gradient background */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/50 via-slate-100/30 to-blue-50/40 rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main composition container */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#E9ECEF] to-[#DDE1E6] p-4 lg:p-6 shadow-[0_20px_50px_rgba(11,27,61,0.12)] border border-slate-200/80 flex flex-col justify-between overflow-hidden"
      >
        {/* Top ambient decor: Oak desk / workspace aesthetic */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FAF8F5] to-transparent pointer-events-none opacity-60" />

        {/* Floating Ceramic Coffee Mug */}
        <div className="absolute right-4 bottom-14 hidden sm:flex flex-col items-center z-20 pointer-events-none drop-shadow-lg">
          <div className="relative w-12 h-14 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-300 rounded-b-xl rounded-t-sm border border-stone-300 shadow-inner flex items-center justify-center">
            {/* Mug handle */}
            <div className="absolute -right-3 top-2 w-4 h-8 border-2 border-stone-300 rounded-r-lg" />
            {/* Minimalist emblem on mug */}
            <div className="w-4 h-4 rounded-full bg-blue-600/70 flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">E</span>
            </div>
            {/* Steam animation */}
            <div className="absolute -top-3 left-3 w-1 h-3 bg-white/60 rounded-full blur-[1px] animate-pulse" />
          </div>
          {/* Desk shadow */}
          <div className="w-10 h-2 bg-stone-900/20 rounded-full blur-xs mt-1" />
        </div>

        {/* Floating Tech Badges */}
        <div className="absolute top-4 left-6 z-20 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200/80 shadow-sm text-xs font-sora text-slate-700">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold">Edge Cloud</span>
          <span className="text-slate-400">·</span>
          <span className="text-emerald-600 font-medium">99.99% Uptime</span>
        </div>

        <div className="absolute top-4 right-6 z-20 hidden md:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-md text-white shadow-sm text-xs font-sora">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-[11px]">Next.js 15 + React 19</span>
        </div>

        {/* Modern Laptop Container */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pt-8 sm:pt-6">
          {/* Laptop Screen Bezel */}
          <div className="relative w-[92%] aspect-[16/10] bg-[#1A1D20] rounded-t-xl p-2 sm:p-3 shadow-2xl border border-slate-700/80 flex flex-col">
            {/* Webcam dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-400/80" />
            </div>

            {/* Inner Display Screen */}
            <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col border border-slate-200">
              {/* Browser chrome */}
              <div className="h-6 sm:h-7 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-2 sm:px-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                {/* Address bar */}
                <div className="bg-white px-2.5 py-0.5 rounded text-[10px] text-slate-500 font-mono flex items-center gap-1 border border-slate-200/80 max-w-[200px] truncate">
                  <span className="text-emerald-500 font-bold">https://</span>
                  <span>enterprise.eldor.dev</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab(activeTab === 'preview' ? 'code' : 'preview')}
                    className="p-0.5 text-slate-500 hover:text-slate-800 rounded transition-colors cursor-pointer"
                    title="Toggle Code/Preview"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Browser Content */}
              <div className="flex-1 bg-[#F9FAFB] p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
                {activeTab === 'preview' ? (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold">
                          E
                        </div>
                        <span className="font-sora font-semibold text-xs text-slate-800">
                          Modern Web Solutions
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-500">
                        <span className="text-blue-600 font-medium">Home</span>
                        <span>Solutions</span>
                        <span>Enterprise</span>
                      </div>
                    </div>

                    <div className="my-auto py-2 text-center flex flex-col items-center">
                      <h4 className="font-sora font-semibold text-sm sm:text-base text-slate-900 tracking-tight">
                        Scalable Cloud Architecture
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 max-w-[280px] mt-1 leading-snug">
                        Full-stack infrastructure built with Next.js, distributed microservices, and edge computing.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 w-full mt-3">
                        <div className="bg-white p-1.5 rounded border border-slate-200/80 text-left shadow-2xs">
                          <span className="block text-[9px] text-slate-400">Core Web Vitals</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-600">100/100</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-slate-200/80 text-left shadow-2xs">
                          <span className="block text-[9px] text-slate-400">Server Latency</span>
                          <span className="font-mono text-[11px] font-bold text-blue-600">42ms</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-slate-200/80 text-left shadow-2xs">
                          <span className="block text-[9px] text-slate-400">Traffic Scale</span>
                          <span className="font-mono text-[11px] font-bold text-slate-800">10M+ req</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[9px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Production Pipeline Verified</span>
                      </span>
                      <span className="font-mono">React 19 Server Components</span>
                    </div>
                  </>
                ) : (
                  <div className="font-mono text-[10px] leading-relaxed text-slate-800 bg-white p-2.5 rounded border border-slate-200 overflow-x-auto">
                    <p className="text-purple-600">export default async function Page() &#123;</p>
                    <p className="pl-3 text-blue-600">const data = await getEdgeData();</p>
                    <p className="pl-3 text-slate-700">return (</p>
                    <p className="pl-6 text-emerald-700">&lt;EnterpriseCluster</p>
                    <p className="pl-9 text-slate-600">latency=&#123;42&#125;</p>
                    <p className="pl-9 text-slate-600">security="enterprise-grade"</p>
                    <p className="pl-6 text-emerald-700">/&gt;</p>
                    <p className="pl-3 text-slate-700">);</p>
                    <p className="text-purple-600">&#125;</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Laptop Base */}
          <div className="w-[102%] h-3.5 sm:h-4.5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-b-xl shadow-lg relative flex justify-center items-start">
            <div className="w-16 h-1 bg-slate-500 rounded-b-md" />
          </div>
          <div className="w-[96%] h-3 bg-stone-800/25 rounded-full blur-sm -mt-0.5" />
        </div>

        {/* Desk Bottom Edge Accent */}
        <div className="w-full pt-2 flex items-center justify-between text-xs text-slate-500 font-sora">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            High-Performance Web Architecture
          </span>
          <button 
            onClick={onExploreTech}
            className="hover:text-blue-600 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Specs & Stack</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
