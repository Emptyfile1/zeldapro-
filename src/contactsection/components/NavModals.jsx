import React from 'react';
import { X, ShieldCheck, Cpu, Network, Radio, ArrowRight } from 'lucide-react';

export const NavModals = ({ type, payload, onClose, onNavigateToContact }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900/95 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-sora font-semibold text-xl sm:text-2xl text-white">
              {type === 'disciplines' && (payload || 'Research Disciplines')}
              {type === 'about' && 'About ZeldaPro Research Lab'}
              {type === 'services' && 'Laboratory Capabilities & Services'}
              {type === 'archive' && 'Research Archive & Whitepapers'}
              {type === 'transmissions' && 'Transmissions & Public Dispatches'}
              {type === 'privacy' && 'Cryptographic Privacy Protocol'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-2 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-manrope">
          {type === 'disciplines' && (
            <>
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 flex items-start gap-3">
                <Cpu className="shrink-0 mt-0.5 text-cyan-400" size={20} />
                <div>
                  <div className="font-semibold font-sora text-white text-base mb-1">
                    {payload || 'Core Research Vectors'}
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-100/90">
                    ZeldaPro Lab develops foundational computing topologies across Mumbai, Singapore, and Zurich facilities.
                  </p>
                </div>
              </div>

              {(!payload || payload === 'Digital Infrastructure') && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-white font-sora flex items-center gap-2">
                    <Network size={16} className="text-blue-400" /> [01] Digital Infrastructure
                  </h4>
                  <p>
                    Ultra-low latency fabric orchestration, 100GbE+ mesh topologies, fault-tolerant consensus layers, and high-throughput asymmetric grid designs engineered for distributed computing clusters.
                  </p>
                </div>
              )}

              {(!payload || payload === 'Artificial Intelligence') && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-white font-sora flex items-center gap-2">
                    <Cpu size={16} className="text-emerald-400" /> [02] Artificial Intelligence
                  </h4>
                  <p>
                    Autonomous cognitive reasoning architectures, parameter-efficient foundation models, sparse neural tesseract representations, and real-time inference engines operating with minimal computational overhead.
                  </p>
                </div>
              )}

              {(!payload || payload === 'Connected IoT Systems') && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-white font-sora flex items-center gap-2">
                    <Radio size={16} className="text-purple-400" /> [03] Connected IoT Systems
                  </h4>
                  <p>
                    Edge telemetry telemetry arrays, telemetry ingestion protocols, automotive vehicular mesh sensor communications, and cryptographic hardware security modules for smart transit corridors.
                  </p>
                </div>
              )}
            </>
          )}

          {type === 'about' && (
            <>
              <p>
                <strong>ZeldaPro Research Lab (ELDAPR)</strong> is an advanced applied computational research facility headquartered at Parinee Crescenzo in Bandra Kurla Complex (BKC), Mumbai.
              </p>
              <p>
                Founded by systems architects and machine learning engineers, the lab focuses on the convergence of <strong>distributed edge computing, high-density neural models, and secure IoT networks</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10 font-mono-code text-xs">
                <div>
                  <span className="text-slate-500 block">HEADQUARTERS</span>
                  <span className="text-white font-medium">BKC, Mumbai, India</span>
                </div>
                <div>
                  <span className="text-slate-500 block">FOUNDED</span>
                  <span className="text-white font-medium">2021 // Applied R&D</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PRIMARY FOCUS</span>
                  <span className="text-white font-medium">AI & Mesh Topologies</span>
                </div>
                <div>
                  <span className="text-slate-500 block">CONTACT</span>
                  <span className="text-cyan-400 font-medium">connect@zeldapro.ai</span>
                </div>
              </div>
            </>
          )}

          {type === 'services' && (
            <>
              <p>
                Our engineering teams collaborate with enterprise partners, automotive manufacturers, and academic consortia through targeted R&D engagements:
              </p>
              <ul className="space-y-3 font-manrope">
                <li className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <strong className="text-white block font-sora mb-1">Custom Inference Cluster Design</strong>
                  Hardware-aware model compilation, custom tensor kernels, and edge acceleration pipelines.
                </li>
                <li className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <strong className="text-white block font-sora mb-1">Connected Mobility & Mesh Telemetry</strong>
                  V2X protocols, cryptographic over-the-air validation, and autonomous vehicle sensor synthesis.
                </li>
                <li className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <strong className="text-white block font-sora mb-1">Cryptographic Data Infrastructure</strong>
                  Zero-knowledge proofs, hardware enclaves, and verifiable data pipelines.
                </li>
              </ul>
            </>
          )}

          {type === 'archive' && (
            <>
              <p>
                Curated technical whitepapers and system specifications published by ZeldaPro Research Lab fellows:
              </p>
              <div className="space-y-2.5 font-mono-code text-xs">
                <div className="p-3 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 block font-semibold">ZP-2025-04 // ASYMMETRIC-GRID</span>
                    <span className="text-slate-300 font-sans text-xs">Dynamic 12-Asym Routing in High-Density Datacenters</span>
                  </div>
                  <span className="text-slate-400 shrink-0">PDF [1.8 MB]</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 block font-semibold">ZP-2024-11 // TESSERACT-INFER</span>
                    <span className="text-slate-300 font-sans text-xs">Sparse 4D Tensor Folding on Consumer Silicon</span>
                  </div>
                  <span className="text-slate-400 shrink-0">PDF [2.4 MB]</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 block font-semibold">ZP-2024-06 // V2X-TELEMETRY</span>
                    <span className="text-slate-300 font-sans text-xs">Deterministic Wireless Handshakes for Urban Fleet Robotics</span>
                  </div>
                  <span className="text-slate-400 shrink-0">PDF [3.1 MB]</span>
                </div>
              </div>
            </>
          )}

          {type === 'transmissions' && (
            <>
              <p>
                Laboratory dispatches and operational field updates:
              </p>
              <div className="space-y-3 font-mono-code text-xs">
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-emerald-400 font-semibold">TRANSMISSION #882</span>
                    <span>2025.Q3</span>
                  </div>
                  <p className="text-slate-200 font-sans text-sm">
                    Deployment of the BKC Quantum-Resistant telemetry node in Mumbai. All outbound telemetry verified at sub-3ms latency.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-cyan-400 font-semibold">TRANSMISSION #879</span>
                    <span>2025.Q1</span>
                  </div>
                  <p className="text-slate-200 font-sans text-sm">
                    Initiation of joint R&D benchmark on real-time neural edge synthesis for autonomous vehicles.
                  </p>
                </div>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm">
                <ShieldCheck size={24} className="shrink-0 text-emerald-400" />
                <span>
                  <strong>AES-256 Protocol Enforced:</strong> Inbound transmissions to ZeldaPro Research Lab are protected by end-to-end forward secrecy.
                </span>
              </div>
              <p>
                We do not monetize, harvest, or disseminate contact information. Inquiries sent via the Contact Bureau are used exclusively to evaluate bilateral engineering collaborations and technical research inquiries.
              </p>
              <p className="text-xs text-slate-400">
                Data controllers: ZeldaPro Research Lab, Parinee Crescenzo 1B-102, Bandra Kurla Complex, Bandra East, Mumbai, MH, India.
              </p>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-medium text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateToContact();
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-sm font-semibold text-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
          >
            <span>Open Contact Bureau</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
