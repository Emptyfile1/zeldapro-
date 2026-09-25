import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FinalCtaSection = () => {
  return (
    <section id="contact" className="relative bg-[#E7EEF9] text-[#0B1220] py-24 lg:py-28 overflow-hidden">
      {/* Constellation SVG in background */}
      <svg
        className="absolute -left-10 -bottom-10 w-105 h-85 opacity-40 pointer-events-none select-none"
        viewBox="0 0 400 320"
        fill="none"
      >
        <g stroke="#94A3B8" strokeWidth="0.8" opacity="0.6">
          <line x1="20" y1="280" x2="120" y2="200" />
          <line x1="120" y1="200" x2="90" y2="100" />
          <line x1="120" y1="200" x2="220" y2="230" />
          <line x1="220" y1="230" x2="260" y2="150" />
          <line x1="90" y1="100" x2="180" y2="60" />
          <line x1="220" y1="230" x2="180" y2="60" />
          <line x1="20" y1="280" x2="60" y2="180" />
        </g>
        <g fill="#64748B">
          <circle cx="20" cy="280" r="2.5" />
          <circle cx="120" cy="200" r="2.5" />
          <circle cx="90" cy="100" r="2.5" />
          <circle cx="220" cy="230" r="2.5" />
          <circle cx="260" cy="150" r="2.5" />
          <circle cx="180" cy="60" r="2.5" />
          <circle cx="60" cy="180" r="2.5" />
        </g>
      </svg>

      <div className="relative max-w-310 mx-auto px-6 sm:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 z-10">
        {/* Left Heading */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[62px] leading-[1.1] tracking-tight">
          <span className="grad-text g-finalcta">
            Your vision.
            <br />
            Our engineering.
          </span>
        </h2>

        {/* Right CTA */}
        <div className="text-left md:text-right max-w-sm">
          <p className="text-base sm:text-lg text-[#0B1220] mb-6 leading-relaxed">
            Let&apos;s turn your challenges into intelligent solutions.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-[#1D4ED8] hover:bg-[#1a44c2] transition-all duration-200 shadow-md shadow-blue-800/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:connect@zeldapro.ai"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-[#1D4ED8] bg-white border border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            >
              connect@zeldapro.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};