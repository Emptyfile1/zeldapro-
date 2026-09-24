import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlexusCanvas } from './PlexusCanvas';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CtaBanner = ({ onStartProject }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const rightSideRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      gsap.from(rightSideRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        x: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vision-engineering"
      ref={containerRef}
      className="relative w-full min-h-[442px] bg-[#E2E8F0] overflow-hidden flex items-center py-16 px-6 sm:px-12 lg:px-20"
    >
      {/* Constellation / Plexus Canvas graphic on the left matching Figma download (2) 1 */}
      <div className="absolute left-0 top-0 w-full sm:w-[500px] h-full pointer-events-none opacity-80 z-0">
        <PlexusCanvas
          nodeCount={48}
          dotColor="rgba(15, 23, 42, 0.65)"
          lineColor="rgba(29, 78, 216, 0.28)"
          accentColor="#1D4ED8"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1725px] w-full mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

        {/* Left Headline matching Figma: Sora 96px, line-height 90px */}
        <div ref={headlineRef} className="max-w-[832px]">
          <h2 className="font-['Sora'] font-semibold text-[44px] sm:text-[68px] md:text-[84px] lg:text-[96px] leading-[1.0] lg:leading-[90px] tracking-[-0.01em] vision-gradient-text">
            Your vision.
            <br />
            Our engineering.
          </h2>
        </div>

        {/* Right CTA Text & Button matching Figma Frame 34 */}
        <div
          ref={rightSideRef}
          className="flex flex-col items-start lg:items-end gap-6 max-w-[420px]"
        >
          {/* Subtitle matching Figma: Sora 24px */}
          <p className="font-['Sora'] font-normal text-[20px] sm:text-[24px] leading-[30px] tracking-[-0.01em] text-black lg:text-left">
            Let's turn your challenges
            <br className="hidden sm:block" />
            into intelligent solutions.
          </p>

          {/* Start Project Button */}
          <button
            onClick={onStartProject}
            className="w-full sm:w-[341px] h-[65px] bg-[#1D4ED8] hover:bg-blue-800 text-white font-['Sora'] font-normal text-[20px] leading-[24px] tracking-[-0.01em] rounded-[12px] flex items-center justify-center gap-3 transition-all duration-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25),0px_8px_20px_rgba(29,78,216,0.4)] hover:shadow-[0px_6px_8px_rgba(0,0,0,0.3),0px_12px_28px_rgba(29,78,216,0.55)] active:scale-[0.98] cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
