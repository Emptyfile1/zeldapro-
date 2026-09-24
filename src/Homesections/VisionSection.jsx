import React from 'react';

export const VisionSection = () => {
  return (
    <section id="about" className="bg-[#E7EEF9] text-[#0B1220] transition-colors">
      {/* Vision Header Badge */}
      <div className="pt-16 sm:pt-20 pb-4 text-center">
        <span className="font-heading font-bold text-3xl sm:text-4xl tracking-tight grad-text g-bkbl">
          [VISION]
        </span>
      </div>

      {/* Split Block 1: Digital Transformation */}
      <div className="max-w-310 mx-auto px-6 sm:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
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
          <div className="w-full aspect-16/11 min-h-65 rounded-2xl overflow-hidden bg-linear-to-br from-[#EEF1F5] to-[#C9D2DE] relative border border-white/80 shadow-md flex items-center justify-center p-4">
            <svg viewBox="0 0 400 280" fill="none" className="w-full h-full">
              <rect width="400" height="280" fill="#EDEFF3" rx="14" />
              <g stroke="#B9C2D0" strokeWidth="1.2">
                <line x1="60" y1="200" x2="180" y2="150" />
                <line x1="180" y1="150" x2="310" y2="190" />
                <line x1="180" y1="150" x2="200" y2="100" />
                <line x1="200" y1="100" x2="290" y2="130" />
              </g>

              {/* Module Node A */}
              <rect x="55" y="185" width="20" height="34" rx="3" fill="#D7DCE4" stroke="#9AA5B5" strokeWidth="1.2" />
              <circle cx="65" cy="178" r="8" fill="#FFFFFF" stroke="#9AA5B5" strokeWidth="1.2" />

              {/* Module Node B */}
              <rect x="290" y="175" width="20" height="34" rx="3" fill="#D7DCE4" stroke="#9AA5B5" strokeWidth="1.2" />
              <circle cx="300" cy="168" r="8" fill="#FFFFFF" stroke="#9AA5B5" strokeWidth="1.2" />

              {/* Central Hexagon Processor */}
              <defs>
                <linearGradient id="visGrad1" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#AFC3F0" />
                  <stop offset="1" stopColor="#7C93D6" />
                </linearGradient>
              </defs>
              <polygon
                points="200,72 224,86 224,114 200,128 176,114 176,86"
                fill="url(#visGrad1)"
                stroke="#8694A8"
                strokeWidth="1.4"
              />

              {/* Target / Focus Reticle */}
              <circle cx="330" cy="140" r="18" fill="none" stroke="#9AA5B5" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M320 138 h20 M330 128 v20" stroke="#9AA5B5" strokeWidth="1.2" />

              {/* Satellite nodes */}
              <circle cx="150" cy="145" r="7" fill="#FFFFFF" stroke="#9AA5B5" strokeWidth="1.2" />
              <circle cx="230" cy="148" r="7" fill="#FFFFFF" stroke="#9AA5B5" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Split Block 2: Digital Advantage */}
      <div className="max-w-310 mx-auto px-6 sm:px-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Render Card 2 (Order swapped on large screens) */}
          <div className="w-full aspect-16/11 min-h-65 rounded-2xl overflow-hidden bg-linear-to-br from-[#E7EAEF] to-[#B9C3D1] relative border border-white/70 shadow-md flex items-center justify-center p-4 order-2 lg:order-1">
            <svg viewBox="0 0 400 280" fill="none" className="w-full h-full">
              <rect width="400" height="280" fill="#E7EAEF" rx="14" />
              <g stroke="#9FAAB9" strokeWidth="1" opacity="0.8">
                <line x1="20" y1="60" x2="140" y2="40" />
                <line x1="140" y1="40" x2="260" y2="70" />
                <line x1="140" y1="40" x2="150" y2="140" />
                <line x1="150" y1="140" x2="260" y2="170" />
                <line x1="150" y1="140" x2="60" y2="180" />
                <line x1="60" y1="180" x2="90" y2="240" />
                <line x1="150" y1="140" x2="220" y2="220" />
              </g>

              {/* Data Blocks */}
              <rect x="20" y="45" width="30" height="30" rx="4" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />
              <rect x="125" y="20" width="34" height="34" rx="4" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />

              {/* Circular Logic Core */}
              <defs>
                <linearGradient id="visGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#B9C6E8" />
                  <stop offset="1" stopColor="#8FA3D9" />
                </linearGradient>
              </defs>
              <circle cx="150" cy="140" r="26" fill="url(#visGrad2)" stroke="#8E99AA" strokeWidth="1.4" />
              <path d="M138 132 a12 12 0 1 1 0 16" stroke="#5A6C9C" strokeWidth="1.8" fill="none" />

              {/* Sub-processors */}
              <ellipse cx="90" cy="220" rx="22" ry="16" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />
              <ellipse cx="220" cy="210" rx="20" ry="14" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />
              <rect x="245" y="150" width="26" height="26" rx="3" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />
              <rect x="240" y="50" width="20" height="34" rx="3" fill="#D2D8E1" stroke="#8E99AA" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="order-1 lg:order-2">
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