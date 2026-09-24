import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: 'src/Pages/About.jsx' },
    { name: 'Services', href: '/zeldapro/src/Pages/Service.jsx' },
    { name: 'Contact', href: 'src/Pages/Contact.jsx' },
  ];

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 transition-colors duration-200 bg-black/95 backdrop-blur-md border-b ${
        scrolled ? 'border-white/10 shadow-lg shadow-black/20' : 'border-white/6'
      }`}
    >
      <nav className="max-w-[1240px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
<a href="#home" className="flex items-center group cursor-pointer" id="brand-logo">
  <img
    src="./assets/Zeldalogo.JPG.png"
    alt="Zeldapro"
    className="h-10 w-auto select-none transition-transform duration-300 group-hover:scale-105"
  />
</a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-white/90 hover:text-white text-[15px] font-medium transition-opacity duration-200 hover:opacity-100 opacity-80"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            id="nav-connect-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-700 hover:bg-blue-600 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D14] border-b border-white/10 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/90 hover:text-white text-base font-medium py-1.5 border-b border-white/5"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
