import React, { useState, useEffect } from 'react';
import logo from '../assets/Zeldalogo.png';
export const Footer = () => {
  const [currentUtcTime, setCurrentUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().replace('GMT', 'UTC');
      setCurrentUtcTime(utcString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-310 mx-auto px-6 sm:px-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <img src={logo} alt="Zeldapro" className="h-8 w-auto" />
            </div>

            <address className="not-italic text-sm leading-relaxed text-white/65 max-w-sm mb-4">
              1st Floor, 1B-102 or 1B, Parinee Crescenzo, G Block, BKC, Bandra Kurla Complex,
              Bandra East, Mumbai, Maharashtra, India
            </address>

            <div className="text-sm text-white/80">
              <span className="text-white/50">Email: </span>
              <a
                href="mailto:connect@zeldapro.ai"
                className="font-mono text-[13.5px] text-white hover:text-blue-400 underline transition-colors"
              >
                connect@zeldapro.ai
              </a>
            </div>
          </div>

          {/* Col 1: Disciplines */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="font-mono text-xs tracking-wider text-white/50 mb-4 uppercase">
              // DISCIPLINES
            </h4>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li className="hover:text-white transition-colors cursor-pointer">
                [01] Digital Infrastructure
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                [02] Artificial Intelligence
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                [03] Connected IoT Systems
              </li>
            </ul>
          </div>

          {/* Col 2: Monographs */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="font-mono text-xs tracking-wider text-white/50 mb-4 uppercase">
              // MONOGRAPHS
            </h4>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Lab
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Research Archive
                </a>
              </li>
              <li>
                <a href="#work" className="font-semibold text-white hover:text-blue-300 transition-colors">
                  Transmissions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Bureau
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Telemetry */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="font-mono text-xs tracking-wider text-white/50 mb-4 uppercase">
              // TELEMETRY
            </h4>
            <ul className="font-mono text-[13px] space-y-2 text-white/70">
              <li className="flex items-center justify-between">
                <span>SYS.TIME:</span>
                <span className="text-white/90 truncate ml-2" title={currentUtcTime}>
                  {currentUtcTime ? currentUtcTime.split(' ').slice(4).join(' ') : 'SYNCING...'}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>CORE:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  NOMINAL
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>GRID:</span>
                <span className="text-blue-400">12-ASYM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50">
          <div>&copy; 2026 Zeldapro Consultancy Pvt Ltd. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>LAT 19.06° / LON 72.86°</span>
            <span>ENCRYPTION: AES-256</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              PRIVACY PROTOCOL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};