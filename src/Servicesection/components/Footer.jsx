import React from 'react';
import { EldorLogo } from './EldorLogo.jsx';
import { ArrowUp } from 'lucide-react';

export const Footer = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 font-sora relative z-10">
      <div className="max-w-[1725px] mx-auto px-6 lg:px-12">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand Wordmark & Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <EldorLogo size={48} />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  ELDOR
                </span>
                <span className="text-xs text-slate-400 tracking-wider uppercase font-mono">
                  Enterprise Digital Engineering
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We design and engineer resilient cloud web platforms, native cross-platform mobile ecosystems, and autonomous artificial intelligence systems for high-growth enterprises.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>ISO/IEC 27001 Certified</span>
              <span>·</span>
              <span>SOC2 Type II Compliant</span>
            </div>
          </div>

          {/* Col 2: Services Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-mono">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#section-web" className="hover:text-blue-400 transition-colors">
                  Enterprise Web Development
                </a>
              </li>
              <li>
                <a href="#section-app" className="hover:text-blue-400 transition-colors">
                  Native iOS & Android Builds
                </a>
              </li>
              <li>
                <a href="#section-ai" className="hover:text-blue-400 transition-colors">
                  AI Workflow Automation
                </a>
              </li>
              <li>
                <a href="#section-ai" className="hover:text-blue-400 transition-colors">
                  Predictive Data Modeling
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-mono">
              Engagement
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="text-xs text-slate-400">
                Partner with our core engineering directors for your next architecture cycle.
              </p>
              <button
                onClick={onContactClick}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs text-center transition-colors cursor-pointer"
              >
                Schedule Architecture Review
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Eldor Engineering Group Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
