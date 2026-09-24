import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onOpenConnect, onOpenServices }) => {
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('About');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          y: -15,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);

    if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'About') {
      const el = document.getElementById('who-we-are');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'Contact') {
      onOpenConnect();
    } else if (tab === 'Services') {
      if (onOpenServices) {
        onOpenServices();
      } else {
        const el = document.getElementById('vision-engineering');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className="w-full z-40 bg-transparent pt-3 md:pt-4 px-4 sm:px-8 max-w-[1725px] mx-auto flex items-center justify-between"
    >
      {/* Brand Logo - Top Left */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-3 transition-transform hover:scale-[1.02] focus:outline-none"
      >
        <Logo size="md" showText={false} />
      </a>

      {/* Center Nav Links matching Figma Group 36 */}
      <nav
        ref={linksRef}
        className="hidden md:flex items-center gap-10 lg:gap-14 absolute left-1/2 -translate-x-1/2 top-10"
      >
        {['Home', 'About', 'Contact', 'Services'].map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`font-['Inter'] text-[20px] leading-6 tracking-normal transition-colors relative py-1 focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-black font-semibold'
                  : 'text-neutral-800 hover:text-blue-700 font-normal'
              }`}
            >
              {item}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Action / Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenConnect}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-['JetBrains_Mono'] font-medium text-neutral-800 hover:text-blue-700 border border-neutral-300 rounded-lg hover:border-blue-600 transition-all cursor-pointer"
        >
          <span>Terminal</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-900 hover:bg-neutral-100 rounded-lg focus:outline-none cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {['Home', 'About', 'Contact', 'Services'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left font-['Inter'] text-xl py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                  activeTab === item
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {item}
              </button>
            ))}
            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect();
                }}
                className="w-full py-3 bg-[#1D4ED8] text-white font-['Manrope'] font-semibold rounded-xl text-center shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
