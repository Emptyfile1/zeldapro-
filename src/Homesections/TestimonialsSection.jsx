import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Skeuomorphic Industrial Phillips Screw Rivet Component
const ScrewRivet = ({ className = '' }) => (
  <div
    className={`absolute w-[14px] h-[14px] rounded-full pointer-events-none flex items-center justify-center z-10 ${className}`}
    style={{
      background: '#D9DFEB',
      border: '1px solid #C8CFDF',
      boxShadow:
        '1px 1px 2px rgba(0, 0, 0, 0.05), inset 1px 1px 2px 1px #BCC3D4, inset -1px -1px 2px 1px #FFFFFF',
      boxSizing: 'border-box',
    }}
  >
    <div
      className="absolute w-[8px] h-[1.5px] rounded-[0.5px] rotate-45 pointer-events-none"
      style={{ backgroundColor: '#94A3B8' }}
    />
    <div
      className="absolute w-[8px] h-[1.5px] rounded-[0.5px] -rotate-45 pointer-events-none"
      style={{ backgroundColor: '#94A3B8' }}
    />
  </div>
);

// 5 Stars SVG Group (ant-design:star-filled matching Figma spec)
const StarRating = ({ count = 5 }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(count)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path d="M8 1.5L9.955 5.564L14.44 6.216L11.19 9.384L11.957 13.851L8 11.77L4.043 13.851L4.81 9.384L1.56 6.216L6.045 5.564L8 1.5Z" />
      </svg>
    ))}
  </div>
);

// Shared Card Body with exact Figma styling
const CardContent = ({ testimonial }) => (
  <>
    {/* 4 Corner Screws */}
    <ScrewRivet className="top-[17px] left-[17px]" />
    <ScrewRivet className="top-[17px] right-[17px]" />
    <ScrewRivet className="bottom-[17px] left-[17px]" />
    <ScrewRivet className="bottom-[17px] right-[17px]" />

    {/* Rectangle 71 (Image: 244px x 229px with 4px 4px 10px shadow and 24px radius) */}
    <div
      className="w-[244px] h-[229px] rounded-[24px] overflow-hidden flex-none shrink-0 bg-slate-200"
      style={{
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-full h-full object-cover pointer-events-none"
        draggable="false"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>

    {/* Name (font-family: 'Sora', 24px/28px, color: #000000, text-shadow: 0px 4px 4px rgba(0,0,0,0.25)) */}
    <div
      className="font-['Sora'] font-normal text-[24px] leading-[28px] text-black text-center flex items-center justify-center flex-none"
      style={{
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      {testimonial.name}
    </div>

    {/* Group 31 & Rectangle 77: Quote Container (329px, rgba(29, 78, 216, 0.2) with border and drop-shadow) */}
    <div
      className="relative w-full max-w-[329px] p-6 rounded-[12px] flex flex-col justify-between gap-6 flex-none text-left"
      style={{
        boxSizing: 'border-box',
        background: 'rgba(29, 78, 216, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '12px',
        filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25))',
      }}
    >
      <p className="font-['Manrope'] font-normal text-[17px] sm:text-[19px] leading-[24px] sm:leading-[25px] tracking-[-0.5px] text-black">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Group 32: 5 Stars */}
      <div className="flex items-center justify-between pt-1">
        <StarRating count={testimonial.stars} />
        <span className="font-mono text-[10px] text-blue-950 uppercase tracking-widest font-semibold opacity-75">
          {testimonial.company}
        </span>
      </div>
    </div>
  </>
);

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);

  // Professional portrait stock images from Unsplash
  const testimonials = [
    {
      id: 'sarah',
      name: 'Sarah Chen',
      role: 'VP of Product Engineering',
      company: 'Northline Tech',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80',
      quote:
        'Zeldapro transformed our ideas into a smart, scalable solution. Professional, creative, and remarkably reliable under tight launch constraints.',
      stars: 5,
    },
    {
      id: 'marcus',
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Nimbus Systems',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
      quote:
        'The depth of architectural rigor and AI expertise Zeldapro brought to our infrastructure completely changed our delivery trajectory.',
      stars: 5,
    },
    {
      id: 'elena',
      name: 'Elena Rostova',
      role: 'Head of AI Operations',
      company: 'Orbital Labs',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=600&q=80',
      quote:
        'The autonomous cognitive pipelines and IoT telemetry they architected reduced our anomaly resolution times by 74%. An indispensable partner.',
      stars: 5,
    },
  ];

  const total = testimonials.length;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.testimonials-heading', {
        scrollTrigger: {
          trigger: '.testimonials-heading',
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.testimonial-stack-container', {
        scrollTrigger: {
          trigger: '.testimonial-stack-container',
          start: 'top 80%',
          once: true,
        },
        scale: 0.94,
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'back.out(1.2)',
      });

      gsap.from('.trusted-logo-item', {
        scrollTrigger: {
          trigger: '.trusted-by-section',
          start: 'top 88%',
          once: true,
        },
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const clientLogos = [
    { name: 'Northline', badge: 'TECH' },
    { name: 'Verto', badge: 'CLOUD' },
    { name: 'Nimbus', badge: 'SYSTEMS' },
    { name: 'Fieldworks', badge: 'DATA' },
    { name: 'Harbor', badge: 'SECURITY' },
    { name: 'Orbital', badge: 'LABS' },
  ];

  const current = testimonials[activeIndex];
  const nextItem = testimonials[(activeIndex + 1) % total];
  const thirdItem = testimonials[(activeIndex + 2) % total];

  const cardBaseStyle = {
    boxSizing: 'border-box',
    background: 'rgba(180, 202, 235, 0.22)',
    border: '1px solid #E7EEF9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '24px',
    isolation: 'isolate',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-gradient-to-b from-[#E7EEF9] via-[#DFEAF8] to-[#E7EEF9] text-[#0B1220] py-24 sm:py-32 text-center transition-colors overflow-hidden select-none"
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 z-10">
        {/* Section Heading */}
        <h2 className="testimonials-heading font-heading font-bold text-4xl sm:text-5xl lg:text-[54px] leading-tight mb-14 sm:mb-16 tracking-tight text-[#0B1220]">
          Hear it <span className="text-[#1D4ED8]">from</span>
          <br />
          <span className="text-[#1D4ED8]">our</span> clients
        </h2>

        {/* Stacked Cards Interactive Container — Balanced & Clearly Visible */}
        <div className="testimonial-stack-container relative max-w-[440px] sm:max-w-[480px] mx-auto min-h-[660px] flex items-center justify-center sm:-translate-x-8">
          {/* Deck Layer 3: Back Card (Clearly Visible Stacked Layer) */}
          <motion.div
            key={`deck-card-3-${thirdItem.id}`}
            animate={{
              x: 72,
              y: 28,
              rotate: 5.5,
              scale: 0.94,
              opacity: 0.85,
            }}
            whileHover={{ scale: 0.96, rotate: 7, x: 78 }}
            transition={{ type: 'spring', stiffness: 290, damping: 25 }}
            onClick={() => {
              setDirection(1);
              setActiveIndex((prev) => (prev + 2) % total);
            }}
            className="absolute w-[330px] sm:w-[410px] min-h-[640px] p-[30px_20px_40px] sm:p-[30px_48px_48px] flex flex-col items-center gap-[16px] cursor-pointer z-10 transition-all overflow-hidden"
            style={cardBaseStyle}
            title="Click to bring this card to front"
          >
            <CardContent testimonial={thirdItem} />
          </motion.div>

          {/* Deck Layer 2: Middle Card (Clearly Visible Stacked Layer) */}
          <motion.div
            key={`deck-card-2-${nextItem.id}`}
            animate={{
              x: 36,
              y: 14,
              rotate: 3,
              scale: 0.97,
              opacity: 0.92,
            }}
            whileHover={{ scale: 0.99, rotate: 4.5, x: 42 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => {
              setDirection(1);
              setActiveIndex((prev) => (prev + 1) % total);
            }}
            className="absolute w-[330px] sm:w-[410px] min-h-[640px] p-[30px_20px_40px] sm:p-[30px_48px_48px] flex flex-col items-center gap-[16px] cursor-pointer z-20 transition-all overflow-hidden"
            style={cardBaseStyle}
            title="Click to bring this card to front"
          >
            <CardContent testimonial={nextItem} />
          </motion.div>

          {/* Active Front Card — Draggable & Clickable to Flip */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`front-card-${current.id}`}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.94,
                x: direction > 0 ? 80 : -80,
                rotate: direction > 0 ? 5 : -5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                x: direction > 0 ? -100 : 100,
                rotate: direction > 0 ? -6 : 6,
              }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 26,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.45}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 40;
                if (offset.x < -swipeThreshold || velocity.x < -200) {
                  handleNext();
                } else if (offset.x > swipeThreshold || velocity.x > 200) {
                  handlePrev();
                }
              }}
              onTap={handleNext}
              className="relative w-[330px] sm:w-[410px] min-h-[640px] p-[30px_20px_40px] sm:p-[30px_48px_48px] flex flex-col items-center gap-[16px] z-30 cursor-grab active:cursor-grabbing"
              style={{
                ...cardBaseStyle,
                boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <CardContent testimonial={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Direct-Manipulation Indicator (No Chevrons) */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            Click or drag card to flip
          </p>
        </div>

        {/* Trusted By Client Logos Section */}
        <div className="trusted-by-section mt-24 pt-14 border-t border-slate-300/60">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1220] mb-10 tracking-tight">
            Trusted by modern leaders
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto items-center">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="trusted-logo-item group relative p-4 rounded-2xl bg-white/50 hover:bg-white/90 border border-white/70 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="font-heading font-bold text-lg sm:text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                  {client.name}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-blue-500 mt-0.5">
                  {client.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
