import React, { useState } from 'react';

export const ManifestoSection = () => {
  const [activeCategory, setActiveCategory] = useState('digital');

  const categories = [
    {
      id: 'digital',
      title: 'Digital',
      description:
        'Cloud & enterprise digital architecture, robust systems turning business operations into responsive digital infrastructure. High-availability backends engineered for transaction velocity.',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 8 L12 4 L20 8 L12 12 Z"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M4 8 V16 L12 20 L20 16 V8"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 12 V20" stroke="#1D4ED8" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'iot',
      title: 'IOT',
      description:
        'Connected sensor networks and edge hardware integrations bridging industrial environments with intelligent telemetric backbones. Real-time protocols for resilient device orchestration.',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.6" fill="#1D4ED8" />
          <g stroke="#1D4ED8" strokeWidth="1.4">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="9" transform="rotate(60 12 12)" />
          </g>
        </svg>
      ),
    },
    {
      id: 'ai',
      title: 'AI',
      description:
        'Custom machine learning models, autonomous agent frameworks, and contextual cognitive layers embedded directly into mission-critical software workflows.',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 3c-2.2 0-4 1.8-4 4 0 .7.2 1.4.5 2C3.6 9.6 3 10.7 3 12c0 1.5.9 2.8 2.2 3.4C5.1 15.9 5 16.4 5 17c0 2.2 1.8 4 4 4h1V3H8Z"
            stroke="#1D4ED8"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M16 3c2.2 0 4 1.8 4 4 0 .7-.2 1.4-.5 2 .9.6 1.5 1.7 1.5 3 0 1.5-.9 2.8-2.2 3.4.1.5.2 1 .2 1.6 0 2.2-1.8 4-4 4h-1V3h2Z"
            stroke="#1D4ED8"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white text-[#0B1220] overflow-hidden">
      <div className="max-w-310 mx-auto px-6 sm:px-10">
        {/* Sub-label */}
        <div className="text-center mb-8">
          <span className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl grad-text g-bkbl2">
            [Who we are]
          </span>
        </div>

        {/* Manifesto Statement */}
        <p className="font-heading font-bold text-xl sm:text-2xl lg:text-[32px] leading-snug sm:leading-[1.35] tracking-tight max-w-4xl mx-auto text-left text-[#0B1220]">
          We don't just build technology. We build possibilities. Zeldapro is built around a simple
          belief:{' '}
          <span className="grad-text g-manifesto">
            Technology becomes powerful, when it solves a real problem.
          </span>
        </p>

        {/* Interactive Architecture Diagram */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-20 text-center">
          {/* Root Node */}
          <div className="w-28 h-28 rounded-full border-[1.5px] border-dashed border-[#CBD5E1] bg-white flex flex-col items-center justify-center mx-auto shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] mb-1.5 animate-pulse" />
            <span className="font-heading font-semibold text-[11px] text-[#0B1220] text-center px-2">
              Intelligent Solution
            </span>
          </div>

          {/* Branch Lines SVG */}
          <div className="w-full h-14 relative my-1">
            <svg viewBox="0 0 900 60" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M450 0 L150 60"
                stroke={activeCategory === 'digital' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'digital' ? '2.5' : '1.2'}
                strokeDasharray={activeCategory === 'digital' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
              <path
                d="M450 0 L450 60"
                stroke={activeCategory === 'iot' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'iot' ? '2.5' : '1.2'}
                strokeDasharray={activeCategory === 'iot' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
              <path
                d="M450 0 L750 60"
                stroke={activeCategory === 'ai' ? '#1D4ED8' : '#CBD5E1'}
                strokeWidth={activeCategory === 'ai' ? '2.5' : '1.2'}
                strokeDasharray={activeCategory === 'ai' ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* 3 Dial Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-200 shadow-md translate-y-[-2px]'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#1D4ED8] flex items-center justify-between">
                    <span>{cat.title}</span>
                    {isSelected && (
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        ACTIVE
                      </span>
                    )}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#475569]">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
