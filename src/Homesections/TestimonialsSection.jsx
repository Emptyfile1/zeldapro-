import React, { useState, useRef } from 'react';
import { Star, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Small corner "screw" decoration used on the testimonial cards,
// matching the Figma spec (14x14 circle, inset bevel, X-shaped divider lines)
const CornerScrew = ({ className = '' }) => (
  <div
    className={`absolute w-3.5 h-3.5 rounded-full bg-[#D9DFEB] border border-[#C8CFDF] shadow-[1px_1px_2px_rgba(0,0,0,0.05),inset_1px_1px_2px_1px_#BCC3D4,inset_-1px_-1px_2px_1px_#FFFFFF] ${className}`}
  >
    <span className="absolute top-1/2 left-1/2 w-2 h-px bg-[#94A3B8] -translate-x-1/2 -translate-y-1/2 rotate-45" />
    <span className="absolute top-1/2 left-1/2 w-2 h-px bg-[#94A3B8] -translate-x-1/2 -translate-y-1/2 -rotate-45" />
  </div>
);

// Shared card markup so front/back cards stay visually identical
const TestimonialCard = ({ testimonial }) => (
  <>
    <CornerScrew className="top-[17px] left-[17px]" />
    <CornerScrew className="top-[17px] right-[17px]" />
    <CornerScrew className="bottom-[17px] left-[17px]" />
    <CornerScrew className="bottom-[17px] right-[17px]" />

    <div className="w-full aspect-square rounded-3xl mb-4 overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      <img
        src={testimonial.photo}
        alt={testimonial.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div className="font-heading font-normal text-2xl leading-7 text-center mb-3 text-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
      {testimonial.name}
    </div>

    <div className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      <div className="bg-[#1D4ED8]/20 border border-white/50 rounded-xl p-4 text-left">
        <p className="font-sans font-normal text-base sm:text-xl leading-[25px] tracking-[-0.5px] text-black">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-1">
          {[...Array(testimonial.stars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-black text-black" />
          ))}
        </div>
      </div>
    </div>
  </>
);

export const TestimonialsSection = () => {
  const [swapped, setSwapped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const backCardRef = useRef(null);
  const frontCardRef = useRef(null);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Product Engineering',
      company: 'Northline Tech',
      quote:
        'Zeldapro transformed our ideas into a smart, scalable solution. Professional, creative, and reliable.',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80&auto=format&fit=crop',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Nimbus Systems',
      quote:
        'The depth of architectural rigor and AI expertise Zeldapro brought to our infrastructure completely changed our delivery trajectory.',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1626123362581-66028462ea9c?w=400&h=400&q=80&auto=format&fit=crop',
    },
  ];

  const frontTestimonial = swapped ? testimonials[1] : testimonials[0];
  const backTestimonial = swapped ? testimonials[0] : testimonials[1];

  const clientLogos = [
    { name: 'Northline', isPill: false },
    { name: 'Verto', isPill: false },
    { name: 'Nimbus', isPill: true },
    { name: 'Fieldworks', isPill: false },
    { name: 'Harbor', isPill: false },
    { name: 'Orbital', isPill: true },
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Heading
      gsap.from('.testimonials-heading', {
        scrollTrigger: {
          trigger: '.testimonials-heading',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Card stack entrance — both cards settle into their fanned resting position
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: '.testimonial-stack',
          start: 'top 75%',
        },
      });

      tlCards
        .from(backCardRef.current, {
          scale: 0.8,
          rotate: -18,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
        .from(
          frontCardRef.current,
          {
            scale: 0.85,
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .from(
          '.testimonial-switch-btn',
          {
            y: 10,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.25'
        );

      // Trusted-by logos
      gsap.from('.trusted-heading', {
        scrollTrigger: {
          trigger: '.trusted-heading',
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.trusted-logo', {
        scrollTrigger: {
          trigger: '.trusted-grid',
          start: 'top 85%',
        },
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  // Card-deck swap: the front card flicks away like a dealt card, the stack
  // updates underneath, then the new front card settles back into place.
  const handleSwap = () => {
    if (isAnimating) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSwapped((prev) => !prev);
      return;
    }

    setIsAnimating(true);
    const direction = swapped ? -1 : 1;
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(frontCardRef.current, {
      x: direction * 90,
      rotate: direction * 14,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    })
      .set(backCardRef.current, { scale: 1, rotate: 0, x: 0, y: 0, opacity: 1, zIndex: 20 })
      .call(() => setSwapped((prev) => !prev))
      .set(frontCardRef.current, { x: -direction * 90, rotate: -direction * 14, opacity: 0, zIndex: 30 })
      .set(backCardRef.current, { zIndex: 10 })
      .to(
        frontCardRef.current,
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.05'
      )
      .fromTo(
        backCardRef.current,
        { scale: 1, rotate: 0 },
        { scale: 0.94, rotate: -4, duration: 0.4, ease: 'power2.out' },
        '<'
      );
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="bg-[#E7EEF9] text-[#0B1220] py-24 sm:py-28 text-center transition-colors overflow-hidden"
    >
      <div className="max-w-310 mx-auto px-6 sm:px-10">
        {/* Section Heading */}
        <h2 className="testimonials-heading font-heading font-bold text-4xl sm:text-5xl lg:text-[52px] leading-tight mb-14 sm:mb-16">
          Hear it <span className="text-[#1D4ED8]">from</span>
          <br />
          <span className="text-[#1D4ED8]">our</span> clients
        </h2>

        {/* Testimonial Card Stack — cards share the same footprint, fanned slightly */}
        <div className="testimonial-stack relative w-75 sm:w-[320px] mx-auto">
          {/* Back Card */}
          <div
            ref={backCardRef}
            onClick={handleSwap}
            className="absolute inset-0 p-6 rounded-3xl bg-[#B4CAEB]/20 border border-[#E7EEF9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer origin-bottom scale-[0.94] -rotate-4 z-10"
            title="Click to cycle reviews"
          >
            <TestimonialCard testimonial={backTestimonial} />
          </div>

          {/* Front Card — defines the stack's footprint */}
          <div
            ref={frontCardRef}
            onClick={handleSwap}
            className="relative p-6 rounded-3xl bg-[#B4CAEB]/25 backdrop-blur-sm border border-[#E7EEF9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-20 cursor-pointer"
          >
            <TestimonialCard testimonial={frontTestimonial} />
          </div>
        </div>

        {/* Switch prompt button */}
        <button
          type="button"
          onClick={handleSwap}
          className="testimonial-switch-btn mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-300 text-xs font-mono text-slate-700 hover:bg-white transition-all shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Click to cycle reviews</span>
        </button>

        {/* Trusted By Client Wordmark Grid */}
        <div className="mt-32 sm:mt-40 pt-12 border-t border-slate-300/60">
          <h3 className="trusted-heading font-heading font-bold text-2xl sm:text-3xl text-[#0B1220] mb-10">
            Trusted by
          </h3>
          <div className="trusted-grid grid grid-cols-2 sm:grid-cols-3 gap-y-7 gap-x-10 max-w-3xl mx-auto items-center">
            {clientLogos.map((client) =>
              client.isPill ? (
                <div key={client.name} className="trusted-logo flex justify-center">
                  <span className="font-heading font-bold text-base sm:text-lg bg-[#0B1220] text-white px-5 py-2 rounded-md shadow-sm">
                    {client.name}
                  </span>
                </div>
              ) : (
                <span
                  key={client.name}
                  className="trusted-logo font-heading font-bold text-xl sm:text-2xl text-[#0B1220] tracking-wide"
                >
                  {client.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};