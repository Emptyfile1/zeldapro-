import React, { useState } from 'react';
import { Star, RefreshCw } from 'lucide-react';

export const TestimonialsSection = () => {
  const [swapped, setSwapped] = useState(false);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Product Engineering',
      company: 'Northline Tech',
      quote:
        'Zeldapro transformed our ideas into a smart, scalable solution. Professional, creative, and remarkably reliable under tight launch constraints.',
      stars: 5,
      avatarBg: '#334155',
      silhouetteBg: '#64748B',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Nimbus Systems',
      quote:
        'The depth of architectural rigor and AI expertise Zeldapro brought to our infrastructure completely changed our delivery trajectory.',
      stars: 5,
      avatarBg: '#1E293B',
      silhouetteBg: '#475569',
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

  return (
    <section id="work" className="bg-[#E7EEF9] text-[#0B1220] py-24 sm:py-28 text-center transition-colors">
      <div className="max-w-310 mx-auto px-6 sm:px-10">
        {/* Section Heading */}
        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[52px] leading-tight mb-14 sm:mb-16">
          Hear it <span className="text-[#1D4ED8]">from</span>
          <br />
          <span className="text-[#1D4ED8]">our</span> clients
        </h2>

        {/* Testimonial Interactive Stack */}
        <div className="relative max-w-110 mx-auto h-110">
          {/* Back Card */}
          <div
            onClick={() => setSwapped(!swapped)}
            className="absolute right-0 top-14 w-75 sm:w-[320px] p-4 rounded-2xl bg-white/60 border border-white/80 shadow-lg cursor-pointer transform rotate-3 opacity-80 z-10 transition-all duration-300 hover:rotate-6 hover:opacity-95"
            title="Click to bring forward"
          >
            <div className="w-full aspect-square min-h-35 rounded-xl mb-3.5 bg-linear-to-br from-slate-700 to-slate-900 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <circle cx="50" cy="38" r="20" fill={backTestimonial.silhouetteBg} />
                <path d="M15 95 Q50 60 85 95 Z" fill={backTestimonial.silhouetteBg} />
              </svg>
            </div>
            <div className="font-heading font-semibold text-[15px] text-center mb-2.5 text-[#0B1220]">
              {backTestimonial.name}
            </div>
            <div className="bg-[#7896E6]/35 rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed text-left text-[#0B1220]">
              &ldquo;{backTestimonial.quote}&rdquo;
            </div>
          </div>

          {/* Front Card */}
          <div
            onClick={() => setSwapped(!swapped)}
            className="absolute left-0 top-0 w-75 sm:w-[320px] p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/90 shadow-2xl z-20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-full aspect-square min-h-35 rounded-xl mb-3.5 bg-linear-to-br from-[#334155] to-[#0F172A] relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <circle cx="50" cy="38" r="20" fill="#334155" />
                <path d="M15 95 Q50 60 85 95 Z" fill="#334155" />
              </svg>
            </div>

            <div className="text-center mb-2.5">
              <div className="font-heading font-semibold text-[15px] text-[#0B1220]">
                {frontTestimonial.name}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {frontTestimonial.role} &bull; {frontTestimonial.company}
              </div>
            </div>

            <div className="bg-[#7896E6]/40 rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed text-left text-[#0B1220] shadow-inner">
              &ldquo;{frontTestimonial.quote}&rdquo;
            </div>

            {/* 5-Star Rating */}
            <div className="mt-3 flex items-center justify-center gap-1 text-[#0B1220]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#0B1220]" />
              ))}
            </div>
          </div>

          {/* Switch prompt button */}
          <button
            type="button"
            onClick={() => setSwapped(!swapped)}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-300 text-xs font-mono text-slate-700 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Click to cycle reviews</span>
          </button>
        </div>

        {/* Trusted By Client Wordmark Grid */}
        <div className="mt-20 pt-12 border-t border-slate-300/60">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1220] mb-10">
            Trusted by
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-7 gap-x-10 max-w-3xl mx-auto items-center">
            {clientLogos.map((client) =>
              client.isPill ? (
                <div key={client.name} className="flex justify-center">
                  <span className="font-heading font-bold text-base sm:text-lg bg-[#0B1220] text-white px-5 py-2 rounded-md shadow-sm">
                    {client.name}
                  </span>
                </div>
              ) : (
                <span
                  key={client.name}
                  className="font-heading font-bold text-xl sm:text-2xl text-[#0B1220] tracking-wide"
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
