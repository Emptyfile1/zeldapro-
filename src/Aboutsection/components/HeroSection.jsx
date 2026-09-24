import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection = ({ onSeeWork, onConnect }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current?.querySelectorAll('.hero-line') || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[920px] bg-[#E2E8F0] overflow-hidden flex flex-col justify-start pt-16 sm:pt-20 md:pt-24 pb-20 px-6 sm:px-12 lg:px-24"
    >
      {/* Subtle architectural grid lines accentuating technical lab identity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-[1520px] w-full mx-auto flex flex-col justify-between">
        <div className="max-w-[1000px]">
          {/* Main Headline matching Figma text and font Sora 96px */}
          <h1
            ref={headlineRef}
            className="font-['Sora'] font-semibold text-[46px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.02] sm:leading-[1.0] lg:leading-[95px] tracking-[-0.02em] text-black"
          >
            <div className="overflow-hidden">
              <span className="hero-line block">We don't just</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block">build technology.</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block">We build</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block">possibilities.</span>
            </div>
          </h1>

          {/* Subtitle matching Figma: Manrope 24px */}
          <p
            ref={subtitleRef}
            className="mt-14 sm:mt-16 md:mt-20 max-w-[668px] font-['Manrope'] font-semibold text-[18px] sm:text-[22px] md:text-[24px] leading-[30px] tracking-[-0.02em] text-black"
          >
            Zeldapro is built around a simple belief.
            <br />
            Technology becomes powerful, when it solves a real problem.
          </p>

          {/* Action buttons matching Figma frames 34 & 33 */}
          <div
            ref={buttonsRef}
            className="mt-8 sm:mt-11 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* "See our work" button - #1D4ED8 */}
            <button
              onClick={onSeeWork}
              className="w-[150px] h-[50px] bg-[#1D4ED8] hover:bg-blue-800 active:scale-95 text-white font-['Manrope'] font-normal text-[20px] leading-[40px] flex items-center justify-center rounded-[10px] transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 cursor-pointer"
            >
              See our work
            </button>

            {/* "Lets Connect" button - #0B1B3D */}
            <button
              onClick={onConnect}
              className="w-[150px] h-[50px] bg-[#0B1B3D] hover:bg-neutral-900 active:scale-95 text-white font-['Manrope'] font-normal text-[20px] leading-[40px] flex items-center justify-center rounded-[10px] transition-all duration-200 shadow-md shadow-neutral-900/30 hover:shadow-lg hover:shadow-neutral-900/40 cursor-pointer"
            >
              Lets Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
