import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import webIcon from "../assets/gcp_ai-hub.svg";
import appIcon from "../assets/gcp_ai-platform.svg";
import aiIcon from "../assets/gcp_cloud-optimization-ai.svg";
export const ServicesSection = ({ onOpenContact }) => {
  const services = [
    {
      id: 'web',
      title: 'Web development',
      description:
        'Fast, responsive websites and web apps built to scale — from landing pages to full-stack platforms.',
      accent: 'blue',
      position: 'top-6 left-4 sm:left-10',
      icon: webIcon,
    },
    {
      id: 'app',
      title: 'App development',
      description:
        'Fast, responsive websites and web apps built to scale — from landing pages to full-stack platforms.',
      accent: 'cyan',
      position: 'top-[46%] right-4 sm:right-10',
      icon:appIcon,
    },
    {
      id: 'ai',
      title: 'AI Solutions',
      description:
        'Fast, responsive websites and web apps built to scale — from landing pages to full-stack platforms.',
      accent: 'purple',
      position: 'bottom-6 left-4 sm:left-10',
      icon: aiIcon,
    },
  ];

  const accentClasses = {
    blue: {
      border: 'hover:border-blue-300/25',
      iconHover: 'group-hover:border-blue-300/25',
      linkHover: 'group-hover:text-blue-300',
      btnHover: 'group-hover:border-blue-300/70 group-hover:bg-blue-500/10',
    },
    cyan: {
      border: 'hover:border-cyan-300/25',
      iconHover: 'group-hover:border-cyan-300/25',
      linkHover: 'group-hover:text-cyan-300',
      btnHover: 'group-hover:border-cyan-300/70 group-hover:bg-cyan-500/10',
    },
    purple: {
      border: 'hover:border-purple-300/25',
      iconHover: 'group-hover:border-purple-300/25',
      linkHover: 'group-hover:text-purple-300',
      btnHover: 'group-hover:border-purple-300/70 group-hover:bg-purple-500/10',
    },
  };

  return (
    <section
      id="services"
      className="relative bg-black text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* ================= SECTION HEADING ================= */}
      <div className="relative max-w-310 mx-auto px-6 sm:px-10 z-10 mb-14">
        <div className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-2">
          // SPECIALIZED CAPABILITIES
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white max-w-xl">
          Engineering for the next frontier.
        </h2>
      </div>

      {/* =====================================================
          BACKGROUND VISUAL + STAGGERED CARDS
          Swap the placeholder gradient below for a real device/product photo:
          add style={{ backgroundImage: "url('/your-image.jpg')" }} to the layer.
      ====================================================== */}
      <div className="relative max-w-310 mx-auto px-6 sm:px-10">
        <div
          className="
            relative
            min-h-[760px] sm:min-h-[820px]
            rounded-3xl
            overflow-hidden
            border border-white/[0.08]
            bg-[#050608]
          "
        >
          {/* Placeholder background — replace with a real image layer */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 30%, rgba(80,110,255,0.18), transparent 55%), radial-gradient(circle at 30% 80%, rgba(140,80,255,0.12), transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.6))]" />

          {services.map((service) => {
            const accent = accentClasses[service.accent];
            return (
              <div
                key={service.id}
                className={`
                  group absolute ${service.position}
                  w-[280px] sm:w-[320px]
                  rounded-2xl p-4 sm:p-5
                  bg-[#0A0F1C]/85 backdrop-blur-xl
                  border border-white/[0.12]
                  shadow-[0_15px_45px_rgba(0,0,0,0.5)]
                  transition-all duration-500 ease-out
                  hover:-translate-y-1 hover:bg-[#0A0F1C]/95
                  ${accent.border}
                `}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon */}
                  <div
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl
                      bg-white/[0.08]
                      border border-white/[0.14]
                      flex items-center justify-center
                      transition-all duration-500
                      ${accent.iconHover}
                    `}
                  >
                  <img src={service.icon} alt="" className="w-8 h-8" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-white mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] leading-snug text-white/65">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* View Services */}
                <button
                  type="button"
                  onClick={onOpenContact}
                  className={`
                    w-full flex justify-end items-center gap-1.5 mt-3
                    font-medium text-xs sm:text-[13px]
                    text-white/90 ${accent.linkHover}
                    transition-colors duration-300
                    cursor-pointer
                  `}
                >
                  <span>View Services</span>
                  <span
                    className={`
                      w-5 h-5 rounded-full
                      border border-white/40
                      bg-white/[0.04]
                      flex items-center justify-center
                      transition-all duration-300
                      ${accent.btnHover}
                    `}
                  >
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};