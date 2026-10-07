import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Zeldalogo.png';

// The site has 4 pages. Change a route here and every link updates.
const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
};

const disciplines = [
  { label: 'Digital Infrastructure', to: ROUTES.services },
  { label: 'Artificial Intelligence', to: ROUTES.services },
  { label: 'Connected IoT Systems', to: ROUTES.services },
];

const scrollTop = () => window.scrollTo(0, 0);

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
            <Link to={ROUTES.home} onClick={scrollTop} className="flex items-center gap-2 mb-5">
              <img src={logo} alt="Zeldapro" className="h-8 w-auto" />
            </Link>

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
              {disciplines.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={scrollTop}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Monographs */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="font-mono text-xs tracking-wider text-white/50 mb-4 uppercase">
              // MONOGRAPHS
            </h4>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <Link
                  to={ROUTES.about}
                  onClick={scrollTop}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.services}
                  onClick={scrollTop}
                  className="hover:text-white transition-colors"
                >
                  Research Archive
                </Link>
              </li>

              <li>
                <Link
                  to={ROUTES.contact}
                  onClick={scrollTop}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50">
          <div>&copy; 2026 Zeldapro Consultancy Pvt Ltd. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span className="hover:text-white cursor-pointer transition-colors">
              PRIVACY PROTOCOL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};