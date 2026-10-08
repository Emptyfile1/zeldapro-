import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import webIcon from '../assets/gcp_ai-hub.svg';
import appIcon from '../assets/gcp_ai-platform.svg';
import aiIcon from '../assets/gcp_cloud-optimization-ai.svg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web',
    title: 'Web development',
    description:
      'Fast, responsive websites and web apps built to scale — from landing pages to full-stack platforms.',
    icon: webIcon,
  },
  {
    id: 'app',
    title: 'App development',
    description:
      'Native and cross-platform mobile solutions engineered for fluid touch gestures, biometric auth, and offline resilience.',
    icon: appIcon,
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description:
      'Tailored cognitive layers, LLM orchestration, and smart automation pipelines to modernize legacy enterprise workflows.',
    icon: aiIcon,
  },
];

export const ServicesSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Header animation
      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Staggered Cards ScrollTrigger animations
      const cards = gsap.utils.toArray('.service-card-item');
      cards.forEach((card, i) => {
        const isEven = i % 2 === 1;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
          },
          x: isEven ? 60 : -60,
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative bg-black text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Background patterned mesh & glow */}
      <div className="absolute inset-0 services-mesh opacity-90 pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10 z-10">
        {/* Section Heading */}
        <div className="services-header mb-14 text-left max-w-xl">
          <div className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-2">
            
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Engineering for the next frontier.
          </h2>
        </div>

        {/* Staggered Cards List */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {services.map((service, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={service.id}
                className={`service-card-item relative overflow-hidden max-w-[620px] ${
                  isEven ? 'ml-auto' : ''
                } p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-white/[0.08] via-[#0F172A]/50 to-[#060A14]/65 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.22),inset_0_1px_2px_0_rgba(255,255,255,0.45)] hover:border-blue-300/50 hover:-translate-y-1 transition-all duration-300 group before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent`}
              >
                <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md flex items-center justify-center mb-5 group-hover:bg-blue-600/25 group-hover:border-blue-400/40 transition-all duration-300">
                  <img src={service.icon} alt="" className="w-9 h-9" />
                </div>
                <h3 className="font-heading font-medium text-2xl sm:text-3xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-md">
                  {service.description}
                </p>

                {/* Navigates to the Services page */}
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="w-full flex justify-end items-center gap-2 mt-6 font-semibold text-sm sm:text-[15px] text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <span>View Services</span>
                  <span className="w-6 h-6 rounded-full border border-white/80 flex items-center justify-center group-hover:border-blue-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};