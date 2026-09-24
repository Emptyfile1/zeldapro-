import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ServiceDetailModal = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="text-xs font-sora font-semibold tracking-wider text-blue-600 uppercase">
              {service.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-sora font-bold text-slate-900 mt-0.5">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-sora">
          {/* Subtitle & Description */}
          <div>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Key SLA / Architecture Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {service.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                  {m.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Production Capabilities */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Engineering Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.capabilities.map((cap, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{cap.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-snug">{cap.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Production Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-mono border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quantified Case Study Proof */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Client Outcome · {service.caseStudy.client}</span>
            </div>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {service.caseStudy.outcome}
            </div>
            <p className="text-xs sm:text-sm italic text-slate-600 mt-2">
              "{service.caseStudy.quote}"
            </p>
            <div className="text-xs text-slate-500 mt-2">
              <span className="font-semibold text-slate-800">{service.caseStudy.author}</span>
              <span> — {service.caseStudy.role}</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-sora">
            Fixed scope sprints & continuous engineering SLA available
          </span>
          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-sora font-medium text-sm transition-colors cursor-pointer"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
