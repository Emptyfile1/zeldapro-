import React, { useState } from 'react';
import { Logo } from './Logo.jsx';
import { Menu, X } from 'lucide-react';

export const Header = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Contact', 'Services'];

  return (
    <header className="relative z-50 w-full max-w-[1725px] mx-auto px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
      {/* Brand Logo Zone - Zone 1 */}
      <button
        onClick={() => onSelectTab('Home')}
        className="flex items-center gap-3 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        aria-label="ZeldaPro ELDAPR Home"
      >
        <Logo size={70} showText={true} />
      </button>

      {/* Center Nav Links - Zone 2 (Centered desktop navigation matching Group 36) */}
      <nav className="hidden md:flex items-center gap-10 lg:gap-14 font-inter text-lg lg:text-[20px] font-normal text-white/90">
        {navItems.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => onSelectTab(item)}
              className={`relative py-1.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                isActive
                  ? 'text-white font-medium'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Direct Lab Access CTA / Status */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono-code text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS.SECURE // LIVE</span>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-3 p-6 rounded-2xl glass-panel shadow-2xl border border-white/20 md:hidden z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-inter text-lg">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onSelectTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === item
                    ? 'bg-blue-600/30 text-white font-medium border border-blue-500/40'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-400">
            <span>ZELDAPRO LABS</span>
            <span className="text-emerald-400">CORE: ONLINE</span>
          </div>
        </div>
      )}
    </header>
  );
};
