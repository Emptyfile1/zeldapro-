import React, { useState, useRef } from 'react';
import { Smartphone, Layers, Wifi, Battery, ChevronRight, Sliders, Bell } from 'lucide-react';

export const AppDevShowcase = ({ onExploreTech }) => {
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-15);
  const [activeScreen, setActiveScreen] = useState('analytics');
  const [toggleState, setToggleState] = useState(true);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(12 - y * 0.03);
    setRotateY(-15 + x * 0.03);
  };

  const handleMouseLeave = () => {
    setRotateX(12);
    setRotateY(-15);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] aspect-[610/514] select-none group perspective-1000"
    >
      {/* Ambient background blur */}
      <div className="absolute -inset-4 bg-gradient-to-br from-slate-200/50 via-blue-100/30 to-indigo-100/40 rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main 3D isometric plane container */}
      <div
        style={{
          transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(3deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-[#EBECEE] via-[#F2F3F5] to-[#E5E7EB] p-5 lg:p-7 shadow-[0_25px_60px_rgba(11,27,61,0.15)] border border-slate-200/90 overflow-hidden flex items-center justify-center"
      >
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top left badge */}
        <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200/80 shadow-xs text-xs font-sora text-slate-700">
          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold">Native iOS & Android</span>
        </div>

        {/* Top right cross-platform badge */}
        <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5 bg-blue-600/95 text-white px-3 py-1.5 rounded-md shadow-xs text-xs font-sora">
          <Layers className="w-3.5 h-3.5" />
          <span>React Native & Flutter</span>
        </div>

        {/* Floating Wireframe Component Card 1 */}
        <div className="absolute -top-2 -left-2 sm:left-4 sm:top-14 w-36 sm:w-44 bg-white/95 rounded-xl p-3 shadow-lg border border-slate-200/90 z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[10px] font-sora font-semibold text-slate-700">Controls</span>
            <Sliders className="w-3 h-3 text-slate-400" />
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500">Auto Sync</span>
              <button 
                onClick={() => setToggleState(!toggleState)}
                className={`w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${toggleState ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`w-3 h-3 rounded-full bg-white transition-transform ${toggleState ? 'translate-x-3' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-3/4 rounded-full" />
            </div>
          </div>
        </div>

        {/* Floating Wireframe Component Card 2 */}
        <div className="absolute right-2 sm:right-6 top-16 w-36 sm:w-44 bg-white/95 rounded-xl p-3 shadow-lg border border-slate-200/90 z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="text-[10px] font-sora font-semibold text-slate-700">App Retention</div>
          <div className="text-[12px] font-mono font-bold text-slate-900 mt-0.5">88.4%</div>
          <div className="flex items-end gap-1 h-8 mt-1 pt-1 border-t border-slate-100">
            {[40, 60, 55, 75, 90, 85, 95].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-xs"
              />
            ))}
          </div>
        </div>

        {/* Floating Wireframe Component Card 3 */}
        <div className="absolute left-2 sm:left-6 bottom-8 w-36 sm:w-40 bg-white/95 rounded-xl p-2.5 shadow-lg border border-slate-200/90 z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold">
              JD
            </div>
            <div>
              <div className="text-[10px] font-sora font-medium text-slate-800 leading-tight">Native Touch</div>
              <div className="text-[8px] text-emerald-600 font-mono">120 FPS Fluid</div>
            </div>
          </div>
        </div>

        {/* Floating Wireframe Component Card 4 */}
        <div className="absolute right-4 bottom-10 w-32 sm:w-36 bg-white/95 rounded-xl p-2.5 shadow-lg border border-slate-200/90 z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="w-full h-2 bg-slate-200 rounded mb-1.5" />
          <div className="w-3/4 h-2 bg-slate-100 rounded mb-2" />
          <div className="w-full py-1 bg-blue-600 text-white rounded text-[8px] text-center font-medium">
            Confirm Action
          </div>
        </div>

        {/* Central Smartphone Device */}
        <div className="relative z-20 w-52 sm:w-60 aspect-[9/18] bg-[#0E131F] rounded-[36px] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-4 border-slate-300/80 flex flex-col">
          {/* Top Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          </div>

          {/* Phone Screen Glass */}
          <div className="w-full h-full bg-[#FAFAFC] rounded-[28px] overflow-hidden flex flex-col pt-6 pb-2 px-3 border border-slate-200">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 px-1 pt-1 mb-2">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* In-app header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-sora">Workspace</span>
                <span className="font-sora font-semibold text-xs text-slate-800">Eldor Mobile</span>
              </div>
              <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                <Bell className="w-3 h-3" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-hidden py-2 flex flex-col justify-between">
              {/* Metric Card */}
              <div className="bg-gradient-to-br from-blue-600 to-slate-900 rounded-xl p-2.5 text-white shadow-sm">
                <span className="text-[8px] text-blue-200">Active Mobile Nodes</span>
                <div className="font-mono text-base font-bold tracking-tight mt-0.5">248,910</div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 text-[8px]">
                  <span className="text-blue-200">Cross-Platform Sync</span>
                  <span className="text-emerald-300 font-mono">0.02s</span>
                </div>
              </div>

              {/* Segmented Screen Selector */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[9px] font-sora font-medium mt-2">
                <button
                  onClick={() => setActiveScreen('analytics')}
                  className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                    activeScreen === 'analytics' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Metrics
                </button>
                <button
                  onClick={() => setActiveScreen('wallet')}
                  className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                    activeScreen === 'wallet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Features
                </button>
              </div>

              {/* Mini List */}
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold">
                      UI
                    </div>
                    <div>
                      <div className="text-[9px] font-medium text-slate-800">SwiftUI / Jetpack</div>
                      <div className="text-[7px] text-slate-400">Native Performance</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-bold">
                      API
                    </div>
                    <div>
                      <div className="text-[9px] font-medium text-slate-800">Offline-First Cache</div>
                      <div className="text-[7px] text-emerald-600">Encrypted Realm DB</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-16 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>

        {/* Bottom edge info */}
        <div className="absolute bottom-3 left-6 right-6 z-20 flex items-center justify-between text-xs text-slate-500 font-sora">
          <span className="text-[11px]">Sub-millisecond Touch Interaction</span>
          <button 
            onClick={onExploreTech}
            className="hover:text-blue-600 font-medium cursor-pointer"
          >
            App Architecture &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
