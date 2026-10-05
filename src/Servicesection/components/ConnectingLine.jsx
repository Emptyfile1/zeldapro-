import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fallback coordinates so the SVG renders on frame 0 (used only if card IDs are missing)
const computeFallbackCoords = (width = 1200, height = 3200) => {
  const isMobile = width < 768;
  const p1Start = isMobile ? { x: width * 0.5, y: 720 } : { x: width * 0.74, y: 780 };
  const p1End = isMobile ? { x: width * 0.5, y: 1380 } : { x: width * 0.26, y: 1460 };
  const p2Start = isMobile ? { x: width * 0.5, y: 2060 } : { x: width * 0.26, y: 2180 };
  const p2End = isMobile ? { x: width * 0.5, y: 2720 } : { x: width * 0.74, y: 2880 };

  const dy1 = Math.max(p1End.y - p1Start.y, 100);
  const dy2 = Math.max(p2End.y - p2Start.y, 100);

  return {
    p1Start,
    p1End,
    path1: `M ${p1Start.x} ${p1Start.y} C ${p1Start.x} ${p1Start.y + dy1 * 0.5}, ${p1End.x} ${p1End.y - dy1 * 0.5}, ${p1End.x} ${p1End.y}`,
    p2Start,
    p2End,
    path2: `M ${p2Start.x} ${p2Start.y} C ${p2Start.x} ${p2Start.y + dy2 * 0.5}, ${p2End.x} ${p2End.y - dy2 * 0.5}, ${p2End.x} ${p2End.y}`,
  };
};

// Layout position relative to `root`, ignoring CSS transforms (so GSAP entrance offsets don't skew it)
const layoutRect = (el, root) => {
  let left = 0;
  let top = 0;
  let node = el;
  while (node && node !== root) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent;
  }
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { left, top, width, height, bottom: top + height };
};

export const ConnectingLine = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Traveling comet & head refs for smooth GSAP scrub
  const comet1Ref = useRef(null);
  const comet2Ref = useRef(null);
  const head1Ref = useRef(null);
  const head2Ref = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const stream1Ref = useRef(null);
  const stream2Ref = useRef(null);

  const [containerDims, setContainerDims] = useState(() => {
    if (typeof window !== 'undefined') {
      return { width: Math.max(window.innerWidth, 360), height: 3200 };
    }
    return { width: 1200, height: 3200 };
  });

  // Always populated - never null
  const [coords, setCoords] = useState(() => {
    const w = typeof window !== 'undefined' ? Math.max(window.innerWidth, 360) : 1200;
    return computeFallbackCoords(w, 3200);
  });

  // Calculate anchor points from the real card elements
  const updateCoordinates = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const root = container.offsetParent; // the <main> element

    const cWidth = Math.max(container.offsetWidth, 320);
    const cHeight = Math.max(container.offsetHeight, 600);
    setContainerDims({ width: cWidth, height: cHeight });

    const cardWeb = document.getElementById('card-web');
    const cardApp = document.getElementById('card-app');
    const cardAi = document.getElementById('card-ai');

    if (cardWeb && cardApp && cardAi && root) {
      const w = layoutRect(cardWeb, root);
      const a = layoutRect(cardApp, root);
      const i = layoutRect(cardAi, root);

      const p1Start = { x: w.left + w.width / 2, y: w.bottom };
      const p1End = { x: a.left + a.width / 2, y: a.top };
      const p2Start = { x: a.left + a.width / 2, y: a.bottom };
      const p2End = { x: i.left + i.width / 2, y: i.top };

      const dy1 = Math.max(p1End.y - p1Start.y, 80);
      const dy2 = Math.max(p2End.y - p2Start.y, 80);

      setCoords({
        p1Start,
        p1End,
        path1: `M ${p1Start.x} ${p1Start.y} C ${p1Start.x} ${p1Start.y + dy1 * 0.5}, ${p1End.x} ${p1End.y - dy1 * 0.5}, ${p1End.x} ${p1End.y}`,
        p2Start,
        p2End,
        path2: `M ${p2Start.x} ${p2Start.y} C ${p2Start.x} ${p2Start.y + dy2 * 0.5}, ${p2End.x} ${p2End.y - dy2 * 0.5}, ${p2End.x} ${p2End.y}`,
      });
    } else {
      setCoords(computeFallbackCoords(cWidth, cHeight));
    }
  }, []);

  // Update on mount, layout changes, font load, GSAP refresh and window resizes
  useEffect(() => {
    updateCoordinates();

    ScrollTrigger.addEventListener('refresh', updateCoordinates);
    document.fonts?.ready.then(updateCoordinates);

    const t1 = setTimeout(updateCoordinates, 80);
    const t2 = setTimeout(updateCoordinates, 300);
    const t3 = setTimeout(updateCoordinates, 1000);

    const handleResize = () => {
      requestAnimationFrame(updateCoordinates);
    };

    window.addEventListener('resize', handleResize);

    let observer;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => {
        requestAnimationFrame(updateCoordinates);
      });
      if (containerRef.current.parentElement) {
        observer.observe(containerRef.current.parentElement);
      } else {
        observer.observe(containerRef.current);
      }
    }

    return () => {
      ScrollTrigger.removeEventListener('refresh', updateCoordinates);
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (observer) observer.disconnect();
    };
  }, [updateCoordinates]);

  // GSAP ScrollTrigger & Ambient Stream Flow
  useEffect(() => {
    if (!path1Ref.current || !path2Ref.current) return;

    const ctx = gsap.context(() => {
      const len1 = path1Ref.current.getTotalLength() || 1200;
      const len2 = path2Ref.current.getTotalLength() || 1200;

      // Scroll-scrubbed energy comet on Path 1
      if (comet1Ref.current) {
        gsap.set(comet1Ref.current, {
          strokeDasharray: `160 ${len1}`,
          strokeDashoffset: len1 + 160,
        });

        gsap.to(comet1Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#section-web',
            start: 'top 45%',
            endTrigger: '#section-app',
            end: 'top 65%',
            scrub: 1.2,
            onUpdate: (self) => {
              if (head1Ref.current && path1Ref.current) {
                const currentLen = Math.min(len1, Math.max(2, self.progress * len1));
                const pt = path1Ref.current.getPointAtLength(currentLen);
                head1Ref.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
                head1Ref.current.setAttribute('opacity', self.progress > 0.02 && self.progress < 0.98 ? '1' : '0.4');
              }
            },
          },
        });
      }

      // Scroll-scrubbed energy comet on Path 2
      if (comet2Ref.current) {
        gsap.set(comet2Ref.current, {
          strokeDasharray: `160 ${len2}`,
          strokeDashoffset: len2 + 160,
        });

        gsap.to(comet2Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#section-app',
            start: 'top 45%',
            endTrigger: '#section-ai',
            end: 'top 65%',
            scrub: 1.2,
            onUpdate: (self) => {
              if (head2Ref.current && path2Ref.current) {
                const currentLen = Math.min(len2, Math.max(2, self.progress * len2));
                const pt = path2Ref.current.getPointAtLength(currentLen);
                head2Ref.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
                head2Ref.current.setAttribute('opacity', self.progress > 0.02 && self.progress < 0.98 ? '1' : '0.4');
              }
            },
          },
        });
      }

      // Continuous data pulse streams along both paths
      if (stream1Ref.current) {
        gsap.to(stream1Ref.current, {
          strokeDashoffset: -300,
          repeat: -1,
          duration: 3.5,
          ease: 'none',
        });
      }

      if (stream2Ref.current) {
        gsap.to(stream2Ref.current, {
          strokeDashoffset: -300,
          repeat: -1,
          duration: 3.5,
          ease: 'none',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [coords]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[5] overflow-visible w-full h-full"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${containerDims.width} ${containerDims.height}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="75%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#0B1B3D" />
          </linearGradient>

          <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B3D" />
            <stop offset="35%" stopColor="#1D4ED8" />
            <stop offset="70%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <radialGradient id="beaconCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#93C5FD" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#2563EB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
          </radialGradient>

          <filter id="lineGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cleanShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0B1B3D" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* ===== CURVE 1: WEB DEV -> APP DEV ===== */}

        <path
          d={coords.path1}
          stroke="#94A3B8"
          strokeWidth="3.5"
          strokeDasharray="10 10"
          strokeLinecap="round"
          className="opacity-40"
        />

        <path
          d={coords.path1}
          stroke="url(#curveGrad1)"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#lineGlowFilter)"
          className="opacity-25"
        />

        <path
          ref={path1Ref}
          d={coords.path1}
          stroke="url(#curveGrad1)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#cleanShadow)"
          className="opacity-85"
        />

        <path
          ref={comet1Ref}
          d={coords.path1}
          stroke="#60A5FA"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#lineGlowFilter)"
        />

        <path
          ref={stream1Ref}
          d={coords.path1}
          stroke="#93C5FD"
          strokeWidth="3"
          strokeDasharray="24 160"
          strokeLinecap="round"
          className="opacity-95"
        />

        <g ref={head1Ref} opacity="0.6">
          <circle r="20" fill="url(#beaconCore)" />
          <circle r="6" fill="#FFFFFF" />
          <circle r="3" fill="#1D4ED8" />
        </g>

        {/* ===== CURVE 2: APP DEV -> ARTIFICIAL INTELLIGENCE ===== */}

        <path
          d={coords.path2}
          stroke="#94A3B8"
          strokeWidth="3.5"
          strokeDasharray="10 10"
          strokeLinecap="round"
          className="opacity-40"
        />

        <path
          d={coords.path2}
          stroke="url(#curveGrad2)"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#lineGlowFilter)"
          className="opacity-25"
        />

        <path
          ref={path2Ref}
          d={coords.path2}
          stroke="url(#curveGrad2)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#cleanShadow)"
          className="opacity-85"
        />

        <path
          ref={comet2Ref}
          d={coords.path2}
          stroke="#38BDF8"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#lineGlowFilter)"
        />

        <path
          ref={stream2Ref}
          d={coords.path2}
          stroke="#BAE6FD"
          strokeWidth="3"
          strokeDasharray="24 160"
          strokeLinecap="round"
          className="opacity-95"
        />

        <g ref={head2Ref} opacity="0.6">
          <circle r="20" fill="url(#beaconCore)" />
          <circle r="6" fill="#FFFFFF" />
          <circle r="3" fill="#1D4ED8" />
        </g>

        {/* ===== ANCHOR TERMINAL SOCKETS ===== */}

        {/* Node 1: Web Dev exit */}
        <g transform={`translate(${coords.p1Start.x}, ${coords.p1Start.y})`}>
          <circle r="14" fill="#2563EB" fillOpacity="0.2" className="animate-ping" />
          <circle r="8.5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" filter="url(#cleanShadow)" />
          <circle r="4" fill="#1D4ED8" />
        </g>

        {/* Node 2: App Dev entrance */}
        <g transform={`translate(${coords.p1End.x}, ${coords.p1End.y})`}>
          <circle r="12" fill="#2563EB" fillOpacity="0.18" />
          <circle r="8.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" filter="url(#cleanShadow)" />
          <circle r="4" fill="#2563EB" />
        </g>

        {/* Node 3: App Dev exit */}
        <g transform={`translate(${coords.p2Start.x}, ${coords.p2Start.y})`}>
          <circle r="14" fill="#2563EB" fillOpacity="0.2" className="animate-ping" />
          <circle r="8.5" fill="#FFFFFF" stroke="#0B1B3D" strokeWidth="3" filter="url(#cleanShadow)" />
          <circle r="4" fill="#0B1B3D" />
        </g>

        {/* Node 4: AI Showcase entrance */}
        <g transform={`translate(${coords.p2End.x}, ${coords.p2End.y})`}>
          <circle r="14" fill="#38BDF8" fillOpacity="0.25" className="animate-ping" />
          <circle r="8.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" filter="url(#cleanShadow)" />
          <circle r="4" fill="#38BDF8" />
        </g>
      </svg>
    </div>
  );
};