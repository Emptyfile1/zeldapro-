import React from 'react';

export const Logo = ({ size = 80, className = '', showText = true }) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`} style={{ width: size }}>
      {/* 3D Geometric Z Ribbon Symbol matching IMG_0401.JPG */}
      <svg
        width={size}
        height={size * 0.72}
        viewBox="0 0 100 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_4px_12px_rgba(239,68,68,0.35)] transition-transform hover:scale-105 duration-300"
      >
        <defs>
          {/* Top Red Gradient Ribbon */}
          <linearGradient id="zRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E27" />
            <stop offset="45%" stopColor="#D90429" />
            <stop offset="100%" stopColor="#8D0801" />
          </linearGradient>

          {/* Cyan / Blue Lower Ribbon */}
          <linearGradient id="zBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Facet Sheen */}
          <linearGradient id="zSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Upper Bar of Z */}
        <polygon
          points="8,10 92,10 76,26 8,26"
          fill="url(#zRedGradient)"
        />
        <polygon
          points="8,10 92,10 76,26 8,26"
          fill="url(#zSheen)"
          opacity="0.3"
        />
        {/* Top Edge Highlight */}
        <line x1="8" y1="10" x2="92" y2="10" stroke="#FF8A80" strokeWidth="1.5" />

        {/* Diagonal Cross-Strut */}
        <polygon
          points="76,26 92,10 24,62 8,46"
          fill="url(#zRedGradient)"
          opacity="0.9"
        />
        {/* Diagonal Dark Core Facet */}
        <polygon
          points="62,32 78,20 34,54 18,42"
          fill="#111827"
          opacity="0.6"
        />

        {/* Diagonal Cyan Accent Slash */}
        <polygon
          points="58,34 68,26 44,52 34,60"
          fill="url(#zBlueGradient)"
        />

        {/* Bottom Horizontal Bar of Z */}
        <polygon
          points="24,46 92,46 92,62 8,62"
          fill="url(#zBlueGradient)"
        />
        <polygon
          points="24,46 92,46 92,62 8,62"
          fill="url(#zSheen)"
          opacity="0.25"
        />
        {/* Bottom Edge Neon Cyan Accent */}
        <line x1="8" y1="62" x2="92" y2="62" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Dynamic Speed Chevrons / Cuts */}
        <polygon points="12,18 20,18 16,22 8,22" fill="#FFFFFF" opacity="0.8" />
        <polygon points="80,50 88,50 84,54 76,54" fill="#38BDF8" opacity="0.9" />
      </svg>

      {/* Brand Text ELDAPR below icon */}
      {showText && (
        <span className="font-sora font-bold tracking-[0.22em] text-[11px] uppercase mt-1 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-sky-400">
          ELDAPR
        </span>
      )}
    </div>
  );
};
