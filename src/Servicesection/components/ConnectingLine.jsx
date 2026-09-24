import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ConnectingLine = () => {
  const svgRef = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curve 1: Between Section 1 (Web Dev) and Section 2 (App Dev)
      if (path1Ref.current) {
        const length1 = path1Ref.current.getTotalLength();
        gsap.set(path1Ref.current, {
          strokeDasharray: length1,
          strokeDashoffset: length1,
        });

        gsap.to(path1Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#section-web',
            start: 'center center',
            endTrigger: '#section-app',
            end: 'top center',
            scrub: 0.8,
          },
        });
      }

      // Curve 2: Between Section 2 (App Dev) and Section 3 (AI)
      if (path2Ref.current) {
        const length2 = path2Ref.current.getTotalLength();
        gsap.set(path2Ref.current, {
          strokeDasharray: length2,
          strokeDashoffset: length2,
        });

        gsap.to(path2Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#section-app',
            start: 'center center',
            endTrigger: '#section-ai',
            end: 'top center',
            scrub: 0.8,
          },
        });
      }
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      <svg
        ref={svgRef}
        viewBox="0 0 1725 3200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGradient1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0B1B3D" />
          </linearGradient>

          <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B3D" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Figma exact drop-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) */}
          <filter id="curveShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Faint guide tracks for organic look */}
        <path
          d="M 1200 680 C 1220 850, 780 880, 700 990 C 600 1120, 520 1200, 480 1340"
          stroke="#E2E8F0"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-40"
        />

        <path
          d="M 480 1800 C 460 1960, 680 2050, 850 2150 C 980 2230, 1150 2290, 1220 2380"
          stroke="#E2E8F0"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* 
          Main Dynamic Bezier Curve 1 (Line 16 in Figma):
          Connecting bottom of Web Dev Laptop (x~1200, y~680) 
          curving through center down into App Dev showcase (x~480, y~1340)
        */}
        <path
          ref={path1Ref}
          d="M 1200 680 C 1220 850, 780 880, 700 990 C 600 1120, 520 1200, 480 1340"
          stroke="url(#curveGradient1)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#curveShadow)"
        />

        {/* 
          Main Dynamic Bezier Curve 2 (Line 17 in Figma):
          Connecting bottom of App Dev Showcase (x~480, y~1800)
          curving downwards across center into AI diagram (x~1220, y~2380)
        */}
        <path
          ref={path2Ref}
          d="M 480 1800 C 460 1960, 680 2050, 850 2150 C 980 2230, 1150 2290, 1220 2380"
          stroke="url(#curveGradient2)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#curveShadow)"
        />
      </svg>
    </div>
  );
};
