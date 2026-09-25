import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// --- Your imported logo/icon assets ---
// Update these paths to match wherever your logo files actually live.
// Works with .svg, .png, .webp, etc. via any standard bundler (Vite/CRA/Next).
import DigitalIcon from '../assets/gcp_ai-hub.svg';
import IotIcon from '../assets/gcp_ai-platform.svg';
import AiIcon from '../assets/gcp_cloud-optimization-ai.svg';

gsap.registerPlugin(ScrollTrigger);

export const ManifestoSection = () => {
  const [activeCategory, setActiveCategory] = useState('digital');
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger calculations after mount and DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Animate section badge
      gsap.from('.manifesto-badge', {
        scrollTrigger: {
          trigger: '.manifesto-badge',
          start: 'top 88%',
          once: true,
        },
        y: -15,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all',
      });

      // Animate manifesto statement
      gsap.from('.manifesto-statement', {
        scrollTrigger: {
          trigger: '.manifesto-statement',
          start: 'top 85%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        clearProps: 'all',
      });

      // Animate diagram area directly on its own trigger
      const diagramTl = gsap.timeline({
        scrollTrigger: {
          trigger: diagramRef.current || '.manifesto-diagram-area',
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set('.manifesto-root-node, .manifesto-branch-line, .manifesto-category-card', {
            clearProps: 'opacity,transform',
          });
        },
      });

      diagramTl
        .from('.manifesto-root-node', {
          scale: 0.75,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
        })
        .from(
          '.manifesto-branch-line',
          {
            opacity: 0,
            duration: 0.4,
          },
          '-=0.2'
        )
        .from(
          '.manifesto-category-card',
          {
            y: 35,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Pop each card's logo in right after its card lands
        .from(
          '.manifesto-category-icon',
          {
            scale: 0.6,
            opacity: 0,
            stagger: 0.12,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          '-=0.35'
        );

      // Subtle ambient breathing on the circle node
      gsap.to('.manifesto-root-node', {
        y: -3,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  // Whenever the active category changes, give its logo a little pop
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        `.category-icon-${activeCategory}`,
        { scale: 0.7, rotate: -8 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.2)' }
      );
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  const categories = [
    {
      id: 'digital',
      title: 'Digital',
      description:
        'Cloud & enterprise digital architecture, robust systems turning business operations into responsive digital infrastructure. High-availability backends engineered for transaction velocity.',
      icon: DigitalIcon,
    },
    {
      id: 'iot',
      title: 'IOT',
      description:
        'Connected sensor networks and edge hardware integrations bridging industrial environments with intelligent telemetric backbones. Real-time protocols for resilient device orchestration.',
      icon: IotIcon,
    },
    {
      id: 'ai',
      title: 'AI',
      description:
        'Custom machine learning models, autonomous agent frameworks, and contextual cognitive layers embedded directly into mission-critical software workflows.',
      icon: AiIcon,
    },
  ];

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-white text-[#0B1220] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* Sub-label */}
        <div className="text-center mb-8">
          <span className="manifesto-badge inline-block font-heading font-bold text-2xl sm:text-3xl lg:text-4xl grad-text g-bkbl2">
            [Who we are]
          </span>
        </div>

        {/* Manifesto Statement */}
        <p className="manifesto-statement font-heading font-bold text-xl sm:text-2xl lg:text-[32px] leading-snug sm:leading-[1.35] tracking-tight max-w-4xl mx-auto text-left text-[#0B1220]">
          We don't just build technology. We build possibilities. Zeldapro is built around a simple
          belief:{' '}
          <span className="grad-text g-manifesto">
            Technology becomes powerful, when it solves a real problem.
          </span>
        </p>

        {/* Interactive Architecture Diagram Area */}
        <div ref={diagramRef} className="manifesto-diagram-area max-w-4xl mx-auto mt-16 sm:mt-20 text-center">
          {/* Root Central Circle Node */}
          <div className="manifesto-root-node relative w-32 h-32 rounded-full border-2 border-blue-500/40 bg-gradient-to-b from-white via-blue-50/40 to-blue-100/30 flex flex-col items-center justify-center mx-auto shadow-lg shadow-blue-500/10 transition-all duration-300 hover:border-blue-600 hover:shadow-xl group">
            {/* Outer subtle glow ring */}
            <div className="absolute inset-[-4px] rounded-full border border-blue-400/20 pointer-events-none animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-[#1D4ED8] mb-2 shadow-sm shadow-blue-500/50" />
            <span className="font-heading font-bold text-xs text-[#0B1220] text-center px-2 leading-tight">
              Intelligent Solution
            </span>
          </div>

          {/* Branch Lines SVG (Desktop) */}
          <div className="manifesto-branch-line hidden md:block w-full h-14 relative my-2">
            <svg viewBox="0 0 900 60" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M450 0 L150 60"
                stroke={activeCategory === 'digital' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'digital' ? '2.5' : '1.4'}
                strokeDasharray={activeCategory === 'digital' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
              <path
                d="M450 0 L450 60"
                stroke={activeCategory === 'iot' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'iot' ? '2.5' : '1.4'}
                strokeDasharray={activeCategory === 'iot' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
              <path
                d="M450 0 L750 60"
                stroke={activeCategory === 'ai' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'ai' ? '2.5' : '1.4'}
                strokeDasharray={activeCategory === 'ai' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Mobile vertical spacer line */}
          <div className="md:hidden w-0.5 h-8 bg-blue-300/60 mx-auto my-3" />

          {/* 3 Dial Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left mt-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  className={`manifesto-category-card p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-400/60 shadow-lg shadow-blue-500/10 translate-y-[-3px]'
                      : 'bg-white/80 border-slate-200/80 hover:border-blue-300 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div
                    className={`manifesto-category-icon category-icon-${cat.id} mb-4 w-12 h-12 transform transition-transform duration-300 group-hover:scale-110`}
                  >
                    <img
                      src={cat.icon}
                      alt={`${cat.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#1D4ED8] flex items-center justify-between">
                    <span>{cat.title}</span>
                    {isSelected && (
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        ACTIVE
                      </span>
                    )}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#475569]">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};