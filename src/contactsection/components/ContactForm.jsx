import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Loader2, Sparkles, RefreshCw } from 'lucide-react';

export const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('[02] Artificial Intelligence');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});
  const [copiedToken, setCopiedToken] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please provide your full name or research affiliation';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!message.trim()) {
      newErrors.message = 'Please specify your research inquiry or project brief';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate cryptographic transmission handshake
    setTimeout(() => {
      setIsSubmitting(false);

      const transmissionId =
        'TX-' +
        Math.random().toString(36).substring(2, 9).toUpperCase() +
        '-' +
        Date.now().toString(36).toUpperCase();

      const newSubmission = {
        fullName: fullName.trim(),
        email: email.trim(),
        discipline,
        message: message.trim(),
        transmissionId,
        timestamp: new Date().toUTCString(),
      };

      setSubmissionSuccess(newSubmission);

      // Trigger celebratory particle confetti
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#34D399', '#818CF8', '#F472B6'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setFullName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  const handleCopyId = () => {
    if (!submissionSuccess) return;
    navigator.clipboard.writeText(submissionSuccess.transmissionId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center lg:items-start select-none">
      {/* Figma: "Get in Touch" Gradient Title */}
      <h1 className="font-sora font-semibold text-5xl sm:text-7xl lg:text-8xl xl:text-[92px] 2xl:text-[96px] tracking-tight leading-[1.08] mb-6 sm:mb-8 text-center lg:text-left">
        <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#34D399] bg-clip-text text-transparent filter drop-shadow-[0_4px_24px_rgba(29,78,216,0.45)] inline-block">
          Get in Touch
        </span>
      </h1>

      {/* Figma: Group 35 & Rectangle 94 Container */}
      <div className="w-full max-w-[760px] 2xl:max-w-[815px] p-6 sm:p-10 lg:p-12 rounded-[24px] bg-[#E2E8F0]/[0.12] backdrop-blur-[24px] border border-white/[0.16] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-300">
        {/* Subtle ambient gradient mesh in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {submissionSuccess ? (
          /* Confirmation Receipt State */
          <div className="py-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="font-sora text-2xl sm:text-3xl font-semibold text-white mb-2">
              Transmission Dispatched
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-md mb-8">
              Your message has been securely relayed to the ZeldaPro Engineering Bureau. A research officer will review your dossier promptly.
            </p>

            {/* Cryptographic Transmission Dossier Card */}
            <div className="w-full p-5 rounded-xl bg-black/40 border border-white/15 text-left font-mono-code text-xs mb-8 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-slate-400">TRANSMISSION ID</span>
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  title="Copy Transmission ID"
                >
                  <span>{submissionSuccess.transmissionId}</span>
                  <Copy size={13} />
                </button>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">RECIPIENT:</span>
                <span>connect@zeldapro.ai</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">RESEARCH DISCIPLINE:</span>
                <span className="text-emerald-400">{submissionSuccess.discipline}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">TIMESTAMP:</span>
                <span className="text-slate-300">{submissionSuccess.timestamp}</span>
              </div>

              <div className="pt-2 border-t border-white/10 text-slate-400">
                <span className="text-slate-500 block mb-1">ENCRYPTED DIGEST:</span>
                <span className="text-slate-300 line-clamp-2 italic font-sans text-sm">
                  "{submissionSuccess.message}"
                </span>
              </div>
            </div>

            {copiedToken && (
              <div className="mb-4 text-xs font-mono-code text-emerald-400">
                ✓ Transmission Token copied to clipboard
              </div>
            )}

            <button
              onClick={handleReset}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-manrope font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw size={16} />
              <span>Submit Another Transmission</span>
            </button>
          </div>
        ) : (
          /* Active Form State */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7 relative z-10" noValidate>
            {/* Discipline Tag Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-mono-code text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles size={13} className="text-cyan-400" />
                Select Domain Focus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  '[01] Digital Infrastructure',
                  '[02] Artificial Intelligence',
                  '[03] Connected IoT Systems',
                ].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDiscipline(d)}
                    className={`px-3 py-2 text-xs font-mono-code rounded-lg transition-all text-left truncate cursor-pointer ${
                      discipline === d
                        ? 'bg-gradient-to-r from-blue-600/40 to-cyan-600/40 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-medium'
                        : 'bg-black/25 text-slate-300 hover:text-white border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Figma: Rectangle 95 - Full Name */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="Full Name"
                  className={`w-full h-[70px] sm:h-[82px] px-6 rounded-[12px] bg-[#D9D9D9]/[0.15] hover:bg-[#D9D9D9]/[0.22] focus:bg-[#D9D9D9]/[0.25] text-white font-manrope text-lg sm:text-[20px] placeholder:text-white/70 placeholder:font-normal border transition-all duration-200 ${
                    errors.fullName
                      ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  } outline-none`}
                />
              </div>
              {errors.fullName && (
                <span className="text-rose-400 text-xs font-manrope pl-2">{errors.fullName}</span>
              )}
            </div>

            {/* Figma: Rectangle 96 - Email */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="Email"
                  className={`w-full h-[70px] sm:h-[82px] px-6 rounded-[12px] bg-[#D9D9D9]/[0.15] hover:bg-[#D9D9D9]/[0.22] focus:bg-[#D9D9D9]/[0.25] text-white font-manrope text-lg sm:text-[20px] placeholder:text-white/70 placeholder:font-normal border transition-all duration-200 ${
                    errors.email
                      ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  } outline-none`}
                />
              </div>
              {errors.email && (
                <span className="text-rose-400 text-xs font-manrope pl-2">{errors.email}</span>
              )}
            </div>

            {/* Figma: Rectangle 97 - Message */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Message"
                  rows={6}
                  className={`w-full min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] p-6 rounded-[12px] bg-[#D9D9D9]/[0.15] hover:bg-[#D9D9D9]/[0.22] focus:bg-[#D9D9D9]/[0.25] text-white font-manrope text-lg sm:text-[20px] placeholder:text-white/70 placeholder:font-normal border transition-all duration-200 resize-none ${
                    errors.message
                      ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  } outline-none`}
                />
              </div>
              {errors.message && (
                <span className="text-rose-400 text-xs font-manrope pl-2">{errors.message}</span>
              )}
            </div>

            {/* Figma: Rectangle 98 - Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[65px] rounded-[12px] bg-gradient-to-r from-[#1D4ED8] via-[#0284C7] to-[#1DDCF2] hover:brightness-110 active:scale-[0.99] transition-all duration-200 shadow-[0px_4px_25px_rgba(2,132,199,0.35)] flex items-center justify-center gap-3.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              {/* Subtle light sweep reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin text-white" size={24} />
                  <span className="font-manrope font-semibold text-2xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    Transmitting...
                  </span>
                </>
              ) : (
                <>
                  <span className="font-manrope font-semibold text-2xl sm:text-[24px] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    Submit
                  </span>

                  {/* Figma: clarity:connect-solid Icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#E2E8F0] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110"
                  >
                    {/* Left Plug */}
                    <path
                      d="M6 14H12V22H6C4.9 22 4 21.1 4 20V16C4 14.9 4.9 14 6 14Z"
                      fill="#E2E8F0"
                    />
                    <rect x="12" y="16.5" width="4" height="3" rx="0.5" fill="#FFFFFF" />

                    {/* Right Plug */}
                    <path
                      d="M30 14H24V22H30C31.1 22 32 21.1 32 20V16C32 14.9 31.1 14 30 14Z"
                      fill="#E2E8F0"
                    />
                    <rect x="20" y="16.5" width="4" height="3" rx="0.5" fill="#FFFFFF" />

                    {/* Center Core Connection Beam */}
                    <circle cx="18" cy="18" r="3.5" fill="#38BDF8" />
                    <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
