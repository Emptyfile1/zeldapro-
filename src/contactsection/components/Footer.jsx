import React, { useEffect, useState } from 'react';
import { Logo } from './Logo.jsx';
import { Copy, Check } from 'lucide-react';

export const Footer = ({ onOpenModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showExactCoords, setShowExactCoords] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Live ticking UTC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${year}.${month}.${day} ${hours}:${mins}:${secs} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('connect@zeldapro.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer className="w-full bg-[#000000] border-t border-[#E5E0D8] text-white select-none relative z-20">
      <div className="max-w-[1725px] mx-auto px-6 sm:px-12 py-12 sm:py-16 flex flex-col gap-12 sm:gap-16">
        {/* Figma: IMG_0401.JPG 2 Logo (80x80px) */}
        <div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="Back to top"
          >
            <Logo size={80} showText={true} />
          </button>
        </div>

        {/* 4 Column Container matching Figma exact coordinates & flex layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8 pb-4">
          {/* Column 1: Address & Email (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col justify-between">
            <div className="max-w-[384px]">
              <p className="font-manrope font-normal text-[16px] leading-[23px] text-white">
                1st Floor, 1B-102 or 1B, Parinee Crescenzo, G Block, BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra, India
              </p>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2 group">
                <span className="font-mono-code font-normal text-[16px] leading-[14px] tracking-[0.88px] text-white">
                  Email:{' '}
                </span>
                <a
                  href="mailto:connect@zeldapro.ai"
                  onClick={handleCopyEmail}
                  className="font-mono-code font-normal text-[16px] leading-[14px] tracking-[0.88px] text-white underline underline-offset-4 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Click to copy email address"
                >
                  <span>connect@zeldapro.ai</span>
                  {copiedEmail ? (
                    <span className="inline-flex items-center text-xs text-emerald-400 no-underline gap-1 ml-1">
                      <Check size={14} /> Copied
                    </span>
                  ) : (
                    <Copy size={13} className="text-slate-400 opacity-60 group-hover:opacity-100" />
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: // DISCIPLINES (xl:col-span-3, VerticalBorder left) */}
          <div className="xl:col-span-3 xl:border-l xl:border-[#E5E0D8] xl:pl-4 flex flex-col gap-3">
            <div className="font-mono-code font-normal text-[11px] leading-[14px] tracking-[1.1px] uppercase text-white/80">
              // DISCIPLINES
            </div>

            <ul className="flex flex-col gap-1.5 font-manrope font-medium text-[16px] leading-[20px] tracking-[0.56px] text-white">
              <li>
                <button
                  onClick={() => onOpenModal('disciplines', 'Digital Infrastructure')}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer flex items-center gap-1 group py-0.5"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">[01] Digital Infrastructure</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('disciplines', 'Artificial Intelligence')}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer flex items-center gap-1 group py-0.5"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">[02] Artificial Intelligence</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('disciplines', 'Connected IoT Systems')}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer flex items-center gap-1 group py-0.5"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">[03] Connected IoT Systems</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: // MONOGRAPHS (xl:col-span-2, VerticalBorder left) */}
          <div className="xl:col-span-2 xl:border-l xl:border-[#E5E0D8] xl:pl-4 flex flex-col gap-3">
            <div className="font-mono-code font-normal text-[11px] leading-[14px] tracking-[1.1px] uppercase text-white/80">
              // MONOGRAPHS
            </div>

            <ul className="flex flex-col gap-1.5 text-[16px] leading-[20px] tracking-[0.56px] text-white">
              <li>
                <button
                  onClick={() => onOpenModal('about')}
                  className="font-manrope font-medium hover:text-cyan-300 transition-colors cursor-pointer py-0.5"
                >
                  About Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('archive')}
                  className="font-manrope font-medium hover:text-cyan-300 transition-colors cursor-pointer py-0.5"
                >
                  Research Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('transmissions')}
                  className="font-mono-code font-medium hover:text-cyan-300 transition-colors cursor-pointer py-0.5"
                >
                  Transmissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                  className="font-manrope font-medium hover:text-cyan-300 transition-colors cursor-pointer py-0.5"
                >
                  Contact Bureau
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: // TELEMETRY (xl:col-span-2, VerticalBorder left) */}
          <div className="xl:col-span-2 xl:border-l xl:border-[#E5E0D8] xl:pl-4 flex flex-col gap-3">
            <div className="font-mono-code font-normal text-[11px] leading-[14px] tracking-[1.1px] uppercase text-white/80">
              // TELEMETRY
            </div>

            <div className="flex flex-col gap-2 font-normal text-[15px] sm:text-[16px] leading-[14px] tracking-[0.88px] text-white">
              <div className="font-manrope flex items-center justify-between" title="Live Coordinated Universal Time">
                <span className="text-white/70 text-xs">SYS.TIME:</span>
                <span className="font-mono-code text-xs text-white tabular-nums">{utcTime || '2025.UTC'}</span>
              </div>

              <div className="font-manrope flex items-center justify-between">
                <span className="text-white/70 text-xs">CORE:</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-code">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  NOMINAL
                </span>
              </div>

              <div className="font-mono-code flex items-center justify-between">
                <span className="text-white/70 text-xs">GRID:</span>
                <span className="text-xs text-cyan-300 font-mono-code">12-ASYM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Figma: HorizontalBorder & Bottom Status Bar */}
        <div className="pt-5 border-t border-[#E5E0D8] flex flex-col md:flex-row items-center justify-between gap-4 font-mono-code text-[11px] leading-[14px] tracking-[0.88px] text-white/90">
          <div>
            <span>© 2025 ZELDAPRO RESEARCH LAB. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-white/80">
            <button
              onClick={() => setShowExactCoords(!showExactCoords)}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
              title="Click to toggle between Abstract & Mumbai BKC GPS coordinates"
            >
              {showExactCoords ? 'LAT 19.0657° N / LON 72.8687° E' : 'LAT 0.00° / LON 0.00°'}
            </button>

            <span>ENCRYPTION: AES-256</span>

            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-cyan-300 transition-colors underline cursor-pointer"
            >
              PRIVACY PROTOCOL
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
