import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PlexusCanvas } from './PlexusCanvas'; // adjust the path to where PlexusCanvas.jsx lives

export const FinalCtaSection = () => {
  return (
    <section
      id="contact"
      className="relative bg-[#E7EEF9] text-[#0B1220] py-24 lg:py-28 overflow-hidden"
    >
      {/* Constellation / Plexus Canvas graphic on the left */}
      <div className="absolute left-0 top-0 w-full sm:w-[500px] h-full pointer-events-none opacity-80 z-0">
        <PlexusCanvas
          nodeCount={48}
          dotColor="rgba(15, 23, 42, 0.65)"
          lineColor="rgba(29, 78, 216, 0.28)"
          accentColor="#1D4ED8"
        />
      </div>

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