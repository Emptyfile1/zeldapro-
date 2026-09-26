import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Copy, Check } from 'lucide-react';

export const Footer = ({ onOpenConnect, onOpenArchive }) => {
  const [copied, setCopied] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${year}.${hours}:${mins}:${secs}.UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('connect@zeldapro.ai');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-black text-white border-t border-[#E5E0D8]/40 pt-16 sm:pt-20 pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1725px] mx-auto flex flex-col justify-between min-h-[480px]">

        {/* Top 4-Column Grid with Technical Separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 pb-16">

          {/* Col 1: Brand & Headquarters (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:pr-10 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <Logo size="lg" showText={true} className="[&_span]:text-white [&_span.text-neutral-500]:text-neutral-400" />
              </div>

              <p className="font-['JetBrains_Mono'] text-[13px] sm:text-[14px] leading-[22px] text-neutral-400 max-w-[340px]">
                1st Floor, 1B-102 or 1B, Parinee Crescenzo, G Block, BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra, India
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-2 font-['JetBrains_Mono'] text-sm sm:text-base text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                <span className="text-neutral-500">Email:</span>
                <span className="text-blue-400 group-hover:underline">connect@zeldapro.ai</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Col 2: // DISCIPLINES (lg:col-span-3, separated by vertical line) */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#E5E0D8]/30 lg:pl-10 lg:pr-6 flex flex-col">
            <span className="font-['JetBrains_Mono'] font-medium text-[16px] sm:text-[20px] leading-[26px] text-white uppercase tracking-wider mb-6">
              // DISCIPLINES
            </span>
            <div className="flex flex-col gap-4 font-['JetBrains_Mono'] text-[13px] sm:text-[15px] leading-[24px] text-neutral-400">
              <span className="hover:text-blue-400 transition-colors cursor-default flex items-center gap-2">
                <span className="text-neutral-600">[01]</span>
                <span>Digital Infrastructure</span>
              </span>
              <span className="hover:text-blue-400 transition-colors cursor-default flex items-center gap-2">
                <span className="text-neutral-600">[02]</span>
                <span>Artificial Intelligence</span>
              </span>
              <span className="hover:text-blue-400 transition-colors cursor-default flex items-center gap-2">
                <span className="text-neutral-600">[03]</span>
                <span>Connected IoT Systems</span>
              </span>
            </div>
          </div>

          {/* Col 3: // MONOGRAPHS (lg:col-span-3, separated by vertical line) */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#E5E0D8]/30 lg:pl-10 lg:pr-6 flex flex-col">
            <span className="font-['JetBrains_Mono'] font-medium text-[16px] sm:text-[20px] leading-[26px] text-white uppercase tracking-wider mb-6">
              // MONOGRAPHS
            </span>
            <div className="flex flex-col gap-4 font-['JetBrains_Mono'] text-[13px] sm:text-[15px] leading-[24px] text-neutral-400">
              <a
                href="#who-we-are"
                className="hover:text-blue-400 transition-colors"
              >
                About Lab
              </a>
              <button
                onClick={() => (onOpenArchive ? onOpenArchive() : onOpenConnect())}
                className="text-left hover:text-blue-400 transition-colors cursor-pointer"
              >
                Research Archive
              </button>
              <button
                onClick={onOpenConnect}
                className="text-left hover:text-blue-400 transition-colors cursor-pointer"
              >
                Transmissions
              </button>
              <button
                onClick={onOpenConnect}
                className="text-left hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact Bureau
              </button>
            </div>
          </div>

          {/* Col 4: // TELEMETRY (lg:col-span-2, separated by vertical line) */}
          <div className="lg:col-span-2 lg:border-l lg:border-[#E5E0D8]/30 lg:pl-10 flex flex-col">
            <span className="font-['JetBrains_Mono'] font-medium text-[16px] sm:text-[20px] leading-[26px] text-white uppercase tracking-wider mb-6">
              // TELEMETRY
            </span>
            <div className="flex flex-col gap-4 font-['JetBrains_Mono'] text-[12px] sm:text-[14px] leading-[24px] text-neutral-400">
              <div>
                <span className="text-neutral-600 block text-[11px]">SYS.TIME</span>
                <span className="text-blue-300 font-medium">{utcTime || '2025.UTC'}</span>
              </div>
              <div>
                <span className="text-neutral-600 block text-[11px]">CORE</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  NOMINAL
                </span>
              </div>
              <div>
                <span className="text-neutral-600 block text-[11px]">GRID</span>
                <span className="text-neutral-300">12-ASYM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Separator */}
        <div className="border-t border-[#E5E0D8]/30 pt-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-400 font-['JetBrains_Mono'] text-[11px] sm:text-[12px] tracking-wider">
          <div className="uppercase">
            © 2025 Zeldapro Consultancy Pvt Ltd. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 uppercase">
            <span>LAT 19.06° / LON 72.86°</span>
            <span className="hidden sm:inline">·</span>
            <span>ENCRYPTION: AES-256</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">
              PRIVACY PROTOCOL
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
