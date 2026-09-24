import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = ({ onOpenContact }) => {
  return (
    <section id="home" className="relative bg-black text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-310 mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 relative z-10">
        {/* Left Column: Heading & CTAs */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-300 tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>ENTERPRISE PLATFORMS &bull; IOT &bull; AI</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] tracking-tight flex flex-col items-start">
            <span>Building Intelligence</span>
            <span>into the</span>
            <span className="grad-text g-redblue mt-1 uppercase tracking-wide">
              DIGITAL WORLD
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/75 max-w-md">
            A premium system that designs, launches, and scales digital experiences with confidence.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#work"
              id="hero-work-btn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-[#1D4ED8] hover:bg-[#1a44c2] transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>See our work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              id="hero-connect-btn"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-[#0B1B3D] hover:bg-[#0e2350] border border-blue-900/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Lets Connect
            </button>
          </div>

          {/* Quick Metrics Bar */}
         
        </div>

        {/* Right Column: Interactive Diagram Illustration */}
        <div className="relative w-full max-w-140 mx-auto h-105 sm:h-120 lg:h-130 flex items-center justify-center">
          <svg viewBox="0 0 560 520" fill="none" className="w-full h-full select-none">
            <defs>
              <radialGradient id="heroNodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#BFD4FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="heroEdgeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Scattered particle dots */}
            <g fill="#334155" opacity="0.6">
              <circle cx="90" cy="90" r="1.6" />
              <circle cx="130" cy="60" r="1.2" />
              <circle cx="440" cy="80" r="1.6" />
              <circle cx="480" cy="140" r="1.2" />
              <circle cx="70" cy="220" r="1.4" />
              <circle cx="500" cy="260" r="1.4" />
              <circle cx="150" cy="400" r="1.2" />
              <circle cx="420" cy="410" r="1.6" />
            </g>

            {/* Octahedron structure primary network lines */}
            <g stroke="#8FA6D6" strokeWidth="1.4" opacity="0.85">
              <line x1="280" y1="90" x2="150" y2="200" />
              <line x1="280" y1="90" x2="410" y2="200" />
              <line x1="280" y1="90" x2="280" y2="260" />
              <line x1="150" y1="200" x2="280" y2="260" />
              <line x1="410" y1="200" x2="280" y2="260" />
              <line x1="150" y1="200" x2="130" y2="330" />
              <line x1="410" y1="200" x2="430" y2="330" />
              <line x1="280" y1="260" x2="280" y2="400" />
              <line x1="130" y1="330" x2="280" y2="400" />
              <line x1="430" y1="330" x2="280" y2="400" />
              <line x1="150" y1="200" x2="410" y2="200" />
            </g>

            {/* Gradient accent lines */}
            <g stroke="url(#heroEdgeGrad)" strokeWidth="1.6" opacity="0.95">
              <line x1="280" y1="90" x2="280" y2="260" />
              <line x1="130" y1="330" x2="410" y2="200" />
              <line x1="150" y1="200" x2="430" y2="330" />
            </g>

            {/* Glow nodes behind core coordinates */}
            <g>
              <circle cx="280" cy="90" r="22" fill="url(#heroNodeGlow)" />
              <circle cx="150" cy="200" r="22" fill="url(#heroNodeGlow)" />
              <circle cx="410" cy="200" r="22" fill="url(#heroNodeGlow)" />
              <circle cx="280" cy="260" r="18" fill="url(#heroNodeGlow)" />
              <circle cx="130" cy="330" r="20" fill="url(#heroNodeGlow)" />
              <circle cx="430" cy="330" r="20" fill="url(#heroNodeGlow)" />
              <circle cx="280" cy="400" r="22" fill="url(#heroNodeGlow)" />
            </g>

            {/* Core glowing dots */}
            <g fill="#EAF0FF" filter="url(#glowFilter)">
              <circle cx="280" cy="90" r="4.5" />
              <circle cx="150" cy="200" r="4.5" />
              <circle cx="410" cy="200" r="4.5" />
              <circle cx="280" cy="260" r="4" />
              <circle cx="130" cy="330" r="4.5" />
              <circle cx="430" cy="330" r="4.5" />
              <circle cx="280" cy="400" r="4.5" />
            </g>

            {/* Connector curves to periphery telemetry */}
            <g stroke="#5B7FD8" strokeWidth="1.2" fill="none" opacity="0.8">
              <path d="M150 200 C 90 175 70 150 55 120" />
              <path d="M410 200 C 470 175 500 150 520 120" />
              <path d="M130 330 C 90 340 65 355 45 390" />
              <path d="M430 330 C 470 340 495 355 515 390" />
            </g>

            {/* Sensor unit icon (top left) */}
            <g transform="translate(30,80)" stroke="#B9C9F2" strokeWidth="1.4" fill="none">
              <rect x="0" y="10" width="14" height="26" rx="4" />
              <path d="M-6 8 Q7 -6 20 8" />
              <path d="M-1 12 Q7 3 15 12" />
            </g>

            {/* Connected mobility / vehicle icon (bottom left) */}
            <g transform="translate(20,388)" stroke="#B9C9F2" strokeWidth="1.4" fill="none">
              <path d="M0 14 Q4 2 16 2 Q28 2 32 14 L34 14 L34 22 L0 22 Z" />
              <circle cx="8" cy="22" r="3.4" fill="#60A5FA" />
              <circle cx="26" cy="22" r="3.4" fill="#60A5FA" />
            </g>

            {/* Industrial Robotics icon (top right) */}
            <g transform="translate(500,60)" stroke="#B9C9F2" strokeWidth="1.4" fill="none">
              <circle cx="4" cy="4" r="4" fill="#60A5FA" />
              <path d="M4 8 L20 20 L14 34" />
              <circle cx="14" cy="34" r="3" fill="#60A5FA" />
            </g>

            {/* Automated telemetry node (bottom right) */}
            <g transform="translate(500,378)" stroke="#B9C9F2" strokeWidth="1.4" fill="none">
              <circle cx="4" cy="30" r="4" fill="#60A5FA" />
              <path d="M4 26 L20 14 L14 0" />
              <circle cx="14" cy="0" r="3" fill="#60A5FA" />
            </g>
          </svg>

          {/* Sparkle Star */}
          <div className="absolute right-[6%] bottom-[6%] w-8 h-8 text-white/90 animate-pulse pointer-events-none">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
