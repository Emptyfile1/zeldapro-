import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import visionImage from '../assets/Archetecturingdata.png';
gsap.registerPlugin(ScrollTrigger);

export const VisionSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Section title badge
      gsap.from('.vision-badge', {
        scrollTrigger: {
          trigger: '.vision-badge',
          start: 'top 85%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
      });

      // Split Block 1
      const tlBlock1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.vision-block-1',
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tlBlock1
        .from('.vision-text-1', {
          x: -50,
          opacity: 0,
        })
        .from(
          '.vision-card-1',
          {
            x: 50,
            opacity: 0,
          },
          '-=0.7'
        );

      // Split Block 2
      const tlBlock2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.vision-block-2',
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tlBlock2
        .from('.vision-card-2', {
          x: -50,
          opacity: 0,
        })
        .from(
          '.vision-text-2',
          {
            x: 50,
            opacity: 0,
          },
          '-=0.7'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="bg-[#E7EEF9] text-[#0B1220] transition-colors overflow-hidden">
      {/* Vision Header Badge */}
      <div className="pt-16 sm:pt-20 pb-4 text-center">
        <span className="vision-badge inline-block font-heading font-bold text-3xl sm:text-4xl tracking-tight grad-text g-bkbl">
          [VISION]
        </span>
      </div>

      {/* Split Block 1: Digital Transformation */}
      <div className="vision-block-1 max-w-[1240px] mx-auto px-6 sm:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="vision-text-1">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#0B1220] flex flex-col items-start">
              <span>Your Partners in</span>
              <span className="grad-text g-redpurple mt-1">Digital Transformation.</span>
            </h2>
            <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#1E293B] max-w-lg">
              Our focus is on understanding the challenge, identifying the opportunity and designing the right technology solution around it.
            </p>
            <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-[#1E293B] max-w-lg">
              From digital platforms and intelligent applications to connected devices and AI-powered solutions, we help turn &lsquo;ideas&rsquo; into technology that can make a difference.
            </p>
          </div>

          {/* Render Card 1 */}
          <div className="vision-card-1 w-full aspect-[16/11] min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#EEF1F5] to-[#C9D2DE] relative border border-white/80 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop"
              alt="Server room data center cabling, representing digital infrastructure"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Split Block 2: Digital Advantage */}
      <div className="vision-block-2 max-w-[1240px] mx-auto px-6 sm:px-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Render Card 2 (Order swapped on large screens) */}
          <div className="vision-card-2 w-full aspect-[16/11] min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E7EAEF] to-[#B9C3D1] relative border border-white/70 shadow-md order-2 lg:order-1">
            <img
              src={visionImage}
              alt="Abstract flowing blue and purple gradient, representing design-led digital architecture"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="vision-text-2 order-1 lg:order-2">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#0B1220] flex flex-col items-start">
              <span>Architecting Your</span>
              <span className="grad-text g-redpurple mt-1">Digital Advantage.</span>
            </h2>
            <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#1E293B] max-w-lg">
              We transform fragmented systems into seamless digital ecosystems. By combining data-driven intelligence with cutting-edge UI/UX design, we engineer web, app, and gaming platforms that are as scalable as they are visually striking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};