import React from 'react';

export const Logo = ({ className = '', size = 'md', showText = true }) => {
  const dimensions = {
    sm: { box: 'w-10 h-10', text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 'w-14 h-14', text: 'text-2xl', sub: 'text-[11px]' },
    lg: { box: 'w-20 h-20', text: 'text-3xl', sub: 'text-xs' },
  }[size] || { box: 'w-14 h-14', text: 'text-2xl', sub: 'text-[11px]' };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Stylized Z Monogram in rounded dark square */}
      <div className={`${dimensions.box} relative bg-black rounded-xl p-1.5 shadow-xl border border-neutral-800 flex flex-col items-center justify-center overflow-hidden group`}>
        {/* Subtle glowing backlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-transparent to-blue-500/40 opacity-70 group-hover:opacity-100 transition-opacity" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]">
          <defs>
            <linearGradient id="zGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="60%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="zGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Top horizontal red geometric wing */}
          <path
            d="M 16 22 L 84 22 L 72 38 L 32 38 Z"
            fill="url(#zGradRed)"
            filter="url(#glow)"
          />
          {/* Diagonal dynamic sharp connector with 3D gradient */}
          <path
            d="M 82 22 L 28 78 L 18 78 L 70 24 Z"
            fill="url(#zGradBlue)"
          />
          {/* Central energetic slash */}
          <path
            d="M 68 34 L 32 70 L 40 76 L 76 40 Z"
            fill="#F87171"
            opacity="0.9"
          />
          {/* Bottom horizontal blue base wing */}
          <path
            d="M 28 62 L 68 62 L 84 78 L 16 78 Z"
            fill="url(#zGradBlue)"
          />
        </svg>

        {/* ZELDAPRO bottom label inside icon */}
        <span className="text-[7px] font-['Sora'] tracking-[0.18em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-400 mt-0.5 leading-none">
          ZELDAPRO
        </span>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-['Sora'] font-extrabold tracking-tight text-neutral-950 ${dimensions.text} leading-none`}>
            ZELDAPRO
          </span>
          <span className={`font-['JetBrains_Mono'] tracking-[0.25em] text-neutral-500 uppercase ${dimensions.sub} font-medium mt-0.5`}>
            Research Lab
          </span>
        </div>
      )}
    </div>
  );
};
