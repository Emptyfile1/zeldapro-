import React, { useState } from 'react';
import { X, CheckCircle2, Send, ArrowRight } from 'lucide-react';

export const WorkModal = ({ isOpen, onClose, onSelectProjectForInquiry }) => {
  if (!isOpen) return null;

  const projects = [
    {
      id: '01',
      title: 'HyperScale Mesh',
      category: 'Connected IoT Systems',
      description: 'Distributed real-time orchestration architecture handling 50,000+ simultaneous smart appliances with sub-2ms telemetry syncing.',
      metrics: ['50k+ Live Nodes', '1.2ms Avg Latency', '99.999% Uptime'],
      tags: ['Rust', 'Zigbee/Thread', 'WebSockets', 'Embedded Linux'],
    },
    {
      id: '02',
      title: 'NeuroFlow Engine',
      category: 'Artificial Intelligence',
      description: 'Autonomous edge-inference system cutting manual inspection time by 80% with real-time computer vision and sensory anomaly detection.',
      metrics: ['80% Time Saved', '99.4% Accuracy', '4.2x Faster ROI'],
      tags: ['PyTorch', 'TensorRT', 'Edge AI', 'Kafka'],
    },
    {
      id: '03',
      title: 'Vanguard Cloud OS',
      category: 'Digital Infrastructure',
      description: 'High-throughput enterprise operating middleware bridging legacy SCADA automation with modern AI analytics pipelines.',
      metrics: ['30% Cost Reduction', '2.4M Ops/sec', 'Zero-Trust Protocol'],
      tags: ['Distributed Go', 'eBPF', 'PostgreSQL', 'gRPC'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-blue-100 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-blue-700 font-semibold">
            // SELECTED CASE STUDIES
          </span>
          <h2 className="font-['Sora'] font-semibold text-3xl sm:text-4xl text-slate-950 mt-1">
            Engineered For Impact
          </h2>
          <p className="font-['Manrope'] text-slate-600 mt-2 text-base">
            Explore how Zeldapro transforms conceptual hurdles into production-ready technological advantages.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group border border-slate-200 hover:border-blue-500/60 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-blue-500/5 bg-slate-50/50 hover:bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-blue-600">
                    [{proj.id}]
                  </span>
                  <h3 className="font-['Sora'] font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                    {proj.title}
                  </h3>
                </div>
                <span className="text-xs font-['JetBrains_Mono'] px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-medium w-fit">
                  {proj.category}
                </span>
              </div>

              <p className="font-['Manrope'] text-slate-600 text-sm leading-relaxed mb-4">
                {proj.description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-slate-200/60">
                {proj.metrics.map((m, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="font-['Sora'] font-bold text-xs sm:text-sm text-slate-900 block">
                      {m}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-['JetBrains_Mono'] px-2 py-0.5 rounded bg-slate-200/60 text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {onSelectProjectForInquiry && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProjectForInquiry(proj.title);
                    }}
                    className="text-xs font-['Manrope'] font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group-hover:underline cursor-pointer"
                  >
                    <span>Inquire similar stack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-['Manrope'] font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
          >
            Close Showcase
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConnectModal = ({ isOpen, onClose, defaultSubject = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    discipline: 'All / Multi-Discipline',
    message: defaultSubject ? `Regarding: ${defaultSubject}\n\n` : '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-2">
              Transmission Received
            </h3>
            <p className="font-['Manrope'] text-slate-600 text-sm max-w-xs">
              Our engineering lead will review your specifications and reply via encrypted channel within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-blue-700 font-semibold">
                // SECURE TRANSMISSION
              </span>
              <h2 className="font-['Sora'] font-semibold text-2xl sm:text-3xl text-slate-950 mt-1">
                Let's Build Possibilities
              </h2>
              <p className="font-['Manrope'] text-slate-600 mt-1 text-sm">
                Discuss an architecture, request a consultation, or partner on deep tech.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Manrope'] text-xs font-semibold text-slate-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-['Manrope'] text-xs font-semibold text-slate-700 block mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-['Manrope'] text-xs font-semibold text-slate-700 block mb-1">
                  Discipline Focus
                </label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all bg-white"
                >
                  <option>[01] Digital Infrastructure & Cloud</option>
                  <option>[02] Artificial Intelligence & Autonomous Agents</option>
                  <option>[03] Connected IoT Systems & Embedded Hardware</option>
                  <option>Full-Stack Turnkey Solution</option>
                </select>
              </div>

              <div>
                <label className="font-['Manrope'] text-xs font-semibold text-slate-700 block mb-1">
                  Project Brief or Inquiry
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline your challenge, targets, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-[11px] text-slate-600">
                  AES-256 Encrypted
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-blue-800 active:scale-95 text-white font-['Manrope'] font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Transmit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
