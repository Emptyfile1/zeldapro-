import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmartHomeVisual } from './SmartHomeVisual';
import { DigitalPlatformVisual } from './DigitalPlatformVisual';

gsap.registerPlugin(ScrollTrigger);

export const WhoWeAreSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const row1TextRef = useRef(null);
  const row1VisualRef = useRef(null);
  const row2TextRef = useRef(null);
  const row2VisualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Row 1 entrance
      gsap.from(row1TextRef.current, {
        scrollTrigger: {
          trigger: row1TextRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from(row1VisualRef.current, {
        scrollTrigger: {
          trigger: row1VisualRef.current,
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.1,
        ease: 'power3.out',
      });

      // Row 2 entrance
      gsap.from(row2TextRef.current, {
        scrollTrigger: {
          trigger: row2TextRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from(row2VisualRef.current, {
        scrollTrigger: {
          trigger: row2VisualRef.current,
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-[1725px] mx-auto">
        {/* Section Heading: "Who we are" */}
        <div className="text-center mb-20 sm:mb-28">
          <h2
            ref={titleRef}
            className="font-['Sora'] font-semibold text-[42px] sm:text-[54px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-black"
          >
            Who we are
          </h2>
        </div>

        {/* Row 1: Focus on understanding the challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32 sm:mb-44">
          <div ref={row1TextRef} className="lg:col-span-6 xl:col-span-6">
            <p className="font-['Sora'] font-semibold text-[32px] sm:text-[46px] md:text-[54px] lg:text-[64px] leading-[1.12] lg:leading-[70px] tracking-[-0.02em] text-black">
              Our focus is on understanding the challenge, identifying the opportunity and designing the right technology solution around it.
            </p>
          </div>

          <div ref={row1VisualRef} className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <SmartHomeVisual />
          </div>
        </div>

        {/* Row 2: From digital platforms and intelligent applications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={row2TextRef} className="lg:col-span-6 xl:col-span-6 order-1 lg:order-1">
            <p className="font-['Sora'] font-semibold text-[32px] sm:text-[46px] md:text-[54px] lg:text-[64px] leading-[1.12] lg:leading-[70px] tracking-[-0.02em] text-black">
              From digital platforms and intelligent applications to connected devices and AI-powered solutions, we help turn 'ideas' into technology that can make a difference.
            </p>
          </div>

          <div ref={row2VisualRef} className="lg:col-span-6 xl:col-span-6 order-2 lg:order-2 flex justify-center lg:justify-end">
            <DigitalPlatformVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
