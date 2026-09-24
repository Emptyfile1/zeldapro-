import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 6 Global Tech Partner Brands with real vector logos
const partnerData = [
  {
    id: 1,
    company: 'NVIDIA',
    subtext: 'AI Accelerators & TensorRT',
    category: 'Autonomous Edge & Compute',
    metric: 'DGX H100 Mesh',
    logo: (
      <div className="flex items-center gap-3.5">
        <svg className="w-12 h-10 flex-shrink-0" viewBox="0 0 100 76" fill="none">
          <path
            d="M48.2 1.3C27.4 3.7 9.8 19.3 4.2 39.5c-3.1 11.2-1.7 23.3 3.8 33.7 1.1 2 2.7 2.4 4.5 1.1 1.7-1.3 1.9-3 1.1-5-4.4-11.4-3.5-23.7 2.4-34.6 6.8-12.7 18.2-20.9 32.4-23.3 18.5-3.1 35.8 4.2 46.8 19.3 2.1 2.9 2.5 5.7 1.1 9-1.3 3.1-3.6 4.7-6.9 4.7-5.5.1-11 .1-16.5 0-3.3 0-5.7-1.7-7-4.7-2.6-6-7.8-9.6-14.3-10.1-8.5-.7-15.6 3.6-18.9 11.3-3.1 7.2-2.1 14.7 2.4 21.2 4.4 6.3 10.6 9.5 18.3 9.4 6.4-.1 11.8-3.4 14.8-9.2 1.3-2.5 3.3-3.8 6.1-3.8 7 0 14 0 21 0 1.9 0 3.3.7 4.2 2.3 2.3 4.2 1.9 8.5-.7 12.6-8.9 14.3-22 21.9-38.8 22.2-15 .3-27.9-5-38.1-16.1C8.2 68.6 3.9 57.1 2.8 44.5 1.5 28.3 8.3 14.8 21.2 5.5 29.5-.4 38.8-1.5 48.2 1.3z"
            fill="#76B900"
          />
          <path
            d="M49 20c-11.8 1.1-21.5 8.9-24.8 20.3-2.6 9 0 17.6 6.7 24.1 6.8 6.7 15.3 9.2 24.5 7.1 10.3-2.4 17.5-9.3 20.2-19.4.9-3.4-.2-5.7-3.4-5.7-5 0-10 0-15 0-1.8 0-3 .9-3.7 2.5-1.9 4.3-5.2 6.5-9.8 6.2-5.1-.3-9-3.6-10.4-8.5-1.5-5.2.2-10 4.4-13.4 4.3-3.5 9.4-4.2 14.6-2.5 2.5.8 4.3 0 5.4-2.3 1.8-3.8 3.8-7.5 5.8-11.2.6-1.1.3-2-.7-2.6-4.1-2.4-8.8-3.9-13.6-4.3z"
            fill="#0B1B3D"
          />
        </svg>
        <div className="flex flex-col">
          <span className="font-['Sora'] font-black text-[28px] sm:text-[32px] tracking-[-0.04em] text-[#0B1B3D] leading-none">
            NVIDIA
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#76B900] font-bold tracking-widest uppercase mt-0.5">
            Inception Partner
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    company: 'Microsoft Azure',
    subtext: 'Enterprise Cloud & OpenAI Fabric',
    category: 'Cloud Infrastructure',
    metric: 'Global Mesh SLA 99.99%',
    logo: (
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 grid grid-cols-2 gap-1 flex-shrink-0">
          <div className="bg-[#F25022] rounded-[3px]" />
          <div className="bg-[#7FBA00] rounded-[3px]" />
          <div className="bg-[#00A4EF] rounded-[3px]" />
          <div className="bg-[#FFB900] rounded-[3px]" />
        </div>
        <div className="flex flex-col">
          <span className="font-['Sora'] font-bold text-[24px] sm:text-[28px] tracking-[-0.03em] text-[#0B1B3D] leading-none">
            Microsoft
          </span>
          <span className="font-['Sora'] text-xs font-semibold text-[#00A4EF] tracking-tight mt-0.5">
            Azure Cloud
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    company: 'Google Cloud',
    subtext: 'Distributed TPU & BigQuery Analytics',
    category: 'Hyper-Scale Compute',
    metric: '1.4ms Edge Roundtrip',
    logo: (
      <div className="flex items-center gap-3.5">
        <svg className="w-11 h-10 flex-shrink-0" viewBox="0 0 48 40" fill="none">
          <path
            d="M38.5 17.5c-.5-5.2-4.9-9.3-10.2-9.3-3.6 0-6.8 1.9-8.5 4.8-1.2-.6-2.5-.9-3.8-.9-4.8 0-8.8 3.7-9.2 8.5C3 21.5 0 25.4 0 30c0 5.5 4.5 10 10 10h28c5.5 0 10-4.5 10-10 0-5.1-3.8-9.3-8.8-9.9-.2-.9-.4-1.8-.7-2.6z"
            fill="#EA4335"
            opacity="0.9"
          />
          <path
            d="M38 30c0 5.5-4.5 10-10 10H10C4.5 40 0 35.5 0 30c0-4.6 3.1-8.5 7.4-9.6.2-3.8 2.5-7.1 5.9-8.6l3.5 7.3c-.5.3-.9.7-1.3 1.2-2.1 2.3-2 5.8.3 7.9 2.3 2.1 5.8 2 7.9-.3.8-.9 1.3-2 1.3-3.2v-1.1l7.7-3.6c2.7 1.8 4.6 4.8 5.1 8.3.1.5.2 1.1.2 1.6z"
            fill="#4285F4"
          />
          <circle cx="24" cy="20" r="4.5" fill="#34A853" />
          <path
            d="M38 30c0 5.5-4.5 10-10 10h10c5.5 0 10-4.5 10-10 0-5.1-3.8-9.3-8.8-9.9-.2-.5-.4-1-.7-1.5l-6.8 3.2c3.5.7 6.3 3.8 6.3 8.2z"
            fill="#FBBC05"
          />
        </svg>
        <div className="flex flex-col">
          <span className="font-['Sora'] font-bold text-[24px] sm:text-[27px] tracking-[-0.03em] text-[#0B1B3D] leading-none">
            Google Cloud
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4285F4] font-semibold uppercase tracking-wider mt-0.5">
            Partner Advantage
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    company: 'Siemens',
    subtext: 'Industrial SCADA & IoT Telemetry',
    category: 'Smart Automation',
    metric: '42,000 Linked Nodes',
    logo: (
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#00646E] flex items-center justify-center text-white font-['Sora'] font-extrabold text-xl shadow-md flex-shrink-0">
          S
        </div>
        <div className="flex flex-col">
          <span className="font-['Sora'] font-black text-[26px] sm:text-[30px] tracking-[0.06em] text-[#00646E] leading-none">
            SIEMENS
          </span>
          <span className="font-['Manrope'] text-xs font-semibold text-slate-700 mt-0.5">
            Industrial Edge Lab
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    company: 'Intel',
    subtext: 'Xeon Scalable & Neural Compute Stick',
    category: 'Silicon Architecture',
    metric: 'Hardware Enclave',
    logo: (
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#0071C5] flex items-center justify-center text-white flex-shrink-0 shadow-md">
          <span className="font-['Sora'] font-bold text-2xl lowercase tracking-tighter">
            in
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="font-['Sora'] font-black text-[30px] sm:text-[34px] tracking-[-0.04em] text-[#0071C5] leading-none">
              intel
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00C7FD]" />
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] text-slate-600 font-medium uppercase tracking-wider">
            Ecosystem Partner
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    company: 'Amazon AWS',
    subtext: 'EventBridge & SageMaker Pipelines',
    category: 'Serverless Infrastructure',
    metric: 'Zero-Trust Encryption',
    logo: (
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#232F3E] flex items-center justify-center text-[#FF9900] font-['Sora'] font-black text-lg shadow-md flex-shrink-0">
          aws
        </div>
        <div className="flex flex-col">
          <span className="font-['Sora'] font-extrabold text-[26px] sm:text-[30px] tracking-[-0.03em] text-[#232F3E] leading-none">
            AWS
          </span>
          <span className="font-['Manrope'] text-xs font-semibold text-[#D97706] mt-0.5">
            Cloud Solution Provider
          </span>
        </div>
      </div>
    ),
  },
];

export const WhyTrustUsSection = () => {
  const pinWrapperRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0); // 0 = Trust, 1 = Partners

  // Animated Numbers for Slide 1
  const [stat1, setStat1] = useState(0); // 50,000
  const [stat2, setStat2] = useState(0); // 30%
  const [stat3, setStat3] = useState(0); // 80%

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animated number tickers on initial entrance
      const countTimeline = { val1: 0, val2: 0, val3: 0 };
      gsap.to(countTimeline, {
        val1: 50000,
        val2: 30,
        val3: 80,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top 75%',
          once: true,
        },
        onUpdate: () => {
          setStat1(Math.floor(countTimeline.val1));
          setStat2(Math.floor(countTimeline.val2));
          setStat3(Math.floor(countTimeline.val3));
        },
      });

      // 2. Set initial positions
      gsap.set(slide1Ref.current, { xPercent: 0, opacity: 1, scale: 1 });
      gsap.set(slide2Ref.current, { xPercent: 100, opacity: 0, scale: 0.96 });

      // 3. Pinned Scroll-Driven Slide Transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.45) {
              setActiveSlide(1);
            } else {
              setActiveSlide(0);
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger;

      // Slide 1 moves out to left, Slide 2 slides in from right
      tl.to(
        slide1Ref.current,
        {
          xPercent: -105,
          opacity: 0,
          scale: 0.94,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      ).to(
        slide2Ref.current,
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // Stagger in partner cards on Slide 2 as it enters
      const partnerCards = slide2Ref.current?.querySelectorAll('.partner-card-node') || [];
      if (partnerCards.length > 0) {
        tl.fromTo(
          partnerCards,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out', duration: 0.45 },
          0.45
        );
      }

      ScrollTrigger.refresh();
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  // Programmatic slide transition (for click navigation)
  const goToSlide = (slideIndex) => {
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const targetProgress = slideIndex === 0 ? 0.05 : 0.95;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="trust-and-partners-section"
      ref={pinWrapperRef}
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-[#E2E8F0] overflow-hidden flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 lg:px-20 select-none"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />

      {/* Top Floating Control Bar */}
      <div className="relative z-30 max-w-[1725px] w-full mx-auto flex items-center justify-between pb-2">
        {/* Slide navigation pills */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/60 shadow-sm">
          <button
            onClick={() => goToSlide(0)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Manrope'] font-semibold transition-all cursor-pointer ${
              activeSlide === 0
                ? 'bg-[#1D4ED8] text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            Why Trust us?
          </button>
          <button
            onClick={() => goToSlide(1)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Manrope'] font-semibold transition-all cursor-pointer ${
              activeSlide === 1
                ? 'bg-[#1D4ED8] text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            Partners
          </button>
        </div>

        {/* Dynamic slide indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-sm text-xs font-['JetBrains_Mono'] text-slate-700">
            <span className="text-blue-700 font-bold">0{activeSlide + 1}</span>
            <span className="text-slate-400">/</span>
            <span>02</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToSlide(0)}
              disabled={activeSlide === 0}
              className={`p-1.5 rounded-full bg-white/80 border border-white/60 shadow-sm transition-all ${
                activeSlide === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'hover:bg-white text-slate-800 hover:scale-105 cursor-pointer'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToSlide(1)}
              disabled={activeSlide === 1}
              className={`p-1.5 rounded-full bg-white/80 border border-white/60 shadow-sm transition-all ${
                activeSlide === 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'hover:bg-white text-slate-800 hover:scale-105 cursor-pointer'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="relative z-20 flex-1 max-w-[1725px] w-full mx-auto flex items-center overflow-hidden">

        {/* ========================================================= */}
        {/* SLIDE 1: "Why Trust us?" (3 Staggered Stat Cards)         */}
        {/* ========================================================= */}
        <div
          ref={slide1Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-between py-2 sm:py-4"
        >
          {/* Title: Why Trust us? (with "Trust" in blue #1D4ED8) */}
          <div className="pt-2 sm:pt-4">
            <h2 className="font-['Sora'] font-semibold text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] leading-[1.0] tracking-[-0.02em] text-black">
              Why <span className="text-[#1D4ED8]">Trust</span> us?
            </h2>
          </div>

          {/* 3 Asymmetric Stat Cards Matching Image 1 */}
          <div className="relative w-full flex-1 flex flex-col lg:block mt-6 sm:mt-10 max-h-[560px]">

            {/* Top Center Card: 30% / Reduction in Operational Costs via AI */}
            <div
              className="stat-card-gradient rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-0 w-full lg:w-[420px] xl:w-[440px] h-[220px] sm:h-[240px] lg:h-[260px] shadow-xl"
            >
              <div className="font-['Sora'] font-bold text-[56px] sm:text-[72px] lg:text-[84px] leading-none tracking-[-0.02em] text-[#0B1B3D]">
                {stat2}%
              </div>
              <p className="font-['Manrope'] font-normal text-[18px] sm:text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] text-black">
                Reduction in Operational Costs via AI
              </p>
            </div>

            {/* Bottom Left Card: 50,000+ / Hours of Manual Work Automated */}
            <div
              className="stat-card-gradient rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 lg:absolute lg:left-4 xl:left-8 lg:bottom-4 w-full lg:w-[440px] xl:w-[460px] h-[220px] sm:h-[240px] lg:h-[260px] shadow-xl mt-6 lg:mt-0"
            >
              <div className="font-['Sora'] font-bold text-[54px] sm:text-[68px] lg:text-[80px] leading-none tracking-[-0.02em] text-[#0B1B3D]">
                {stat1 >= 50000 ? '50,000+' : `${stat1.toLocaleString()}+`}
              </div>
              <p className="font-['Manrope'] font-normal text-[18px] sm:text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] text-black">
                Hours of Manual Work Automated
              </p>
            </div>

            {/* Bottom Right Card: 80% / Faster Decision-Making Workflows */}
            <div
              className="stat-card-gradient rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 lg:absolute lg:right-4 xl:right-8 lg:bottom-4 w-full lg:w-[420px] xl:w-[440px] h-[220px] sm:h-[240px] lg:h-[260px] shadow-xl mt-6 lg:mt-0"
            >
              <div className="font-['Sora'] font-bold text-[56px] sm:text-[72px] lg:text-[84px] leading-none tracking-[-0.02em] text-[#0B1B3D]">
                {stat3}%
              </div>
              <p className="font-['Manrope'] font-normal text-[18px] sm:text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] text-black">
                Faster Decision-Making Workflows
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* SLIDE 2: "Partners" (6 Cards with REAL COMPANY LOGOS)     */}
        {/* ========================================================= */}
        <div
          ref={slide2Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-between py-2 sm:py-4"
        >
          {/* Title: Partners (with "artne" in blue #1D4ED8 matching Image 2) */}
          <div className="pt-2 sm:pt-4 flex items-baseline justify-between">
            <h2 className="font-['Sora'] font-semibold text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] leading-[1.0] tracking-[-0.02em] text-black">
              P<span className="text-[#1D4ED8]">artne</span>rs
            </h2>
            <span className="hidden sm:inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-slate-500 font-semibold bg-white/70 px-3 py-1 rounded-full border border-slate-300">
              GLOBAL ENTERPRISE ECOSYSTEM
            </span>
          </div>

          {/* 6 Company Cards in 3x2 Grid with Real Logos */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 items-center mt-5 sm:mt-7 max-h-[580px] overflow-y-auto lg:overflow-visible pr-1 sm:pr-0">
            {partnerData.map((partner) => (
              <div
                key={partner.id}
                className="partner-card-node stat-card-gradient rounded-[28px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between h-[180px] sm:h-[210px] lg:h-[235px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(29,78,216,0.35)] group cursor-pointer relative overflow-hidden"
              >
                {/* Brand Logo & Identification Header */}
                <div>
                  <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                    {partner.logo}
                  </div>
                  <p className="font-['Manrope'] text-xs sm:text-[13px] text-slate-700 font-medium mt-3 line-clamp-1">
                    {partner.subtext}
                  </p>
                </div>

                {/* Subtle meta badge & status indicator */}
                <div className="flex items-center justify-between pt-3 border-t border-white/60 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-cyan-500 group-hover:animate-ping transition-colors" />
                    <span className="text-[10px] sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-slate-700 font-semibold">
                      {partner.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-blue-800 font-medium bg-white/50 px-2 py-0.5 rounded-md">
                    {partner.metric}
                  </span>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Scroll Hint Pill */}
      <div className="relative z-30 max-w-[1725px] w-full mx-auto flex items-center justify-between pt-2 text-xs font-['JetBrains_Mono'] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>
            {activeSlide === 0
              ? 'Scroll down to slide into Partners →'
              : '← Scroll up to return to Why Trust us?'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[11px] text-slate-400">GSAP PINNED STAGE</span>
          <div className="w-16 h-1 bg-slate-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: activeSlide === 0 ? '50%' : '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
