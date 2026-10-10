import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { Polyhedron } from './Polyhedron.jsx';

export const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  // Navigates to a separate route/page instead of opening a popup/modal.
  // Update these paths to match your actual routes, e.g. "/services", "/contact"
  const goToPage = (path) => {
    navigate(path);
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered text content reveal
      tl.from('.hero-badge', {
        y: -15,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      })
        .from(
          '.hero-title-line',
          {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'back.out(1.2)',
          },
          '-=0.3'
        )
        .from(
          '.hero-desc',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-cta-btn',
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            clearProps: 'opacity,transform',
          },
          '-=0.3'
        )
        .from(
          '.hero-metric-item',
          {
            y: 25,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          diagramRef.current,
          {
            scale: 0.88,
            opacity: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=0.9'
        );

      // Ambient background glow pulses
      gsap.to('.hero-bg-glow', {
        scale: 1.15,
        opacity: 0.25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Interactive mouse parallax on the polyhedron container
      const diagramEl = diagramRef.current;
      if (!diagramEl) return;

      const handleMouseMove = (e) => {
        const rect = diagramEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        gsap.to(diagramEl, {
          rotationY: deltaX * 12,
          rotationX: -deltaY * 12,
          transformPerspective: 800,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(diagramEl, {
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power2.out',
        });
      };

      const containerEl = containerRef.current;
      containerEl.addEventListener('mousemove', handleMouseMove);
      containerEl.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        containerEl.removeEventListener('mousemove', handleMouseMove);
        containerEl.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative bg-black text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-white/5"
    >
      {/* Background ambient glow */}
      <div className="hero-bg-glow absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="hero-bg-glow absolute bottom-10 right-10 w-96 h-96 bg-purple-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 relative z-10">
        {/* Left Column: Heading & CTAs */}
        <div className="max-w-xl">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-300 tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>ENTERPRISE PLATFORMS &bull; IOT &bull; AI</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] tracking-tight flex flex-col items-start">
            <span className="hero-title-line">Building Intelligence</span>
            <span className="hero-title-line">into the</span>
            <span className="hero-title-line grad-text g-redblue mt-1 uppercase tracking-wide">
              DIGITAL WORLD
            </span>
          </h1>

          <p className="hero-desc mt-5 text-base sm:text-lg leading-relaxed text-white/75 max-w-md">
            A premium system that designs, launches, and scales digital experiences with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            {/* "See our work" button - #1D4ED8 -> navigates to /services page */}
            <button
              onClick={() => goToPage('/services')}
              className="hero-cta-btn w-[150px] h-[50px] bg-[#1D4ED8] hover:bg-blue-800 active:scale-95 text-white font-['Manrope'] font-normal text-[20px] leading-[40px] flex items-center justify-center rounded-[10px] transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 cursor-pointer"
            >
              See our work
            </button>

            {/* "Lets Connect" button - #0B1B3D -> navigates to /contact page */}
            <button
              onClick={() => goToPage('/contact')}
              className="hero-cta-btn w-[150px] h-[50px] bg-[#0B1B3D] hover:bg-neutral-900 active:scale-95 text-white font-['Manrope'] font-normal text-[20px] leading-[40px] flex items-center justify-center rounded-[10px] transition-all duration-200 shadow-md shadow-neutral-900/30 hover:shadow-lg hover:shadow-neutral-900/40 cursor-pointer"
            >
              Lets Connect
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
            <div className="hero-metric-item">
              <div className="font-heading font-bold text-2xl text-white">99.9%</div>
              <div className="font-mono text-xs text-slate-400 mt-0.5">Uptime Target</div>
            </div>
            <div className="hero-metric-item">
              <div className="font-heading font-bold text-2xl text-white">10x</div>
              <div className="font-mono text-xs text-slate-400 mt-0.5">Speed to Scale</div>
            </div>
            <div className="hero-metric-item">
              <div className="font-heading font-bold text-2xl text-white">&lt;50ms</div>
              <div className="font-mono text-xs text-slate-400 mt-0.5">Latency Target</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D polyhedron with parallax tilt */}
        <div
          ref={diagramRef}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-[560px] mx-auto h-[420px] sm:h-[480px] lg:h-[520px] will-change-transform lg:self-start lg:-mt-16"
        >
          <Polyhedron className="w-full h-full" />

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