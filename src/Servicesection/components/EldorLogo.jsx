import React from 'react';

export const EldorLogo = ({ className = '', size = 80 }) => {
  return (
    <div 
      className={`relative select-none flex flex-col items-center justify-center bg-black rounded-lg overflow-hidden shadow-md group cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title="Eldor - Enterprise Digital Engineering"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-transparent to-blue-600/30 opacity-70 group-hover:opacity-100 transition-opacity" />
      
      {/* Stylized sharp 'Z' / 'E' geometric emblem */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-[68%] h-[68%] relative z-10 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="eldorRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E27" />
            <stop offset="50%" stopColor="#FF4D00" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="eldorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="60%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B1B3D" />
          </linearGradient>
          <linearGradient id="eldorCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Top diagonal blade */}
        <polygon 
          points="15,22 85,22 45,46 22,46" 
          fill="url(#eldorRed)" 
        />
        {/* Dynamic angled facet */}
        <polygon 
          points="85,22 68,48 50,48 70,22" 
          fill="#FFAA00" 
          opacity="0.9" 
        />
        {/* Central diagonal lightning cut */}
        <polygon 
          points="25,52 50,48 78,54 28,78" 
          fill="url(#eldorCyan)" 
        />
        {/* Bottom anchor blade */}
        <polygon 
          points="15,78 40,78 85,78 52,54" 
          fill="url(#eldorBlue)" 
        />
        {/* Inner sharp tech accent */}
        <path 
          d="M32 30 L65 30 L40 68 L75 68" 
          stroke="#FFFFFF" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="miter" 
          className="opacity-80"
        />
      </svg>

      {/* Brand typography ELDOR at base */}
      <span className="relative z-10 text-[9px] tracking-[0.25em] font-extrabold text-white uppercase font-sans mt-0.5 leading-none">
        ELDOR
      </span>
    </div>
  );
};
