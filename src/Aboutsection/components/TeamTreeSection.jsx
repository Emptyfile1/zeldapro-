import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, X, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
gsap.registerPlugin(ScrollTrigger);

// Complete 10-node hierarchy: Tier 1 (Root), Tier 2 (3 Directors), Tier 3 (6 Specialists below)
const teamMembers = [
  // --- Tier 1: CEO ---
  {
    id: 'lead-ceo',
    name: 'Name',
    realName: 'Koji Takahashi',
    role: 'CEO',
    tier: 1,
    department: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85',
    bio: 'Pioneering intelligent software infrastructure and next-generation IoT platforms through domain-native deep tech engineering.',
    discipline: 'Executive Leadership & Product Vision',
    quote: 'Technology becomes powerful when it solves a real problem.',
    skills: ['Strategic Architecture', 'Deep Tech Investment', 'Global Operations'],
  },

  // --- Tier 2: 3 Functional Leads ---
  {
    id: 'eng-lead',
    name: 'Name',
    realName: 'Ren Tanaka',
    role: 'CEO',
    realRole: 'VP Digital Infrastructure',
    tier: 2,
    department: 'Digital Infrastructure',
    parent: 'lead-ceo',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
    bio: 'Architecting ultra-low latency distributed cloud systems, cyber-physical device firmware, and secure mesh protocols.',
    discipline: 'Distributed Infrastructure & Mesh Networks',
    quote: 'Precision engineering is the cornerstone of reliability.',
    skills: ['Distributed Go', 'eBPF Kernel Tracing', 'Multi-Region Mesh'],
  },
  {
    id: 'ai-lead',
    name: 'Name',
    realName: 'Elena Vance',
    role: 'CEO',
    realRole: 'VP Artificial Intelligence',
    tier: 2,
    department: 'Artificial Intelligence',
    parent: 'lead-ceo',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
    bio: 'Specializing in edge inference models, autonomous decision workflows, and multi-modal sensory feedback loops.',
    discipline: 'Applied AI & Cognitive Computing',
    quote: 'Turning complex neural patterns into effortless utility.',
    skills: ['PyTorch / TensorRT', 'Autonomous Reasoning', 'Edge Quantization'],
  },
  {
    id: 'iot-lead',
    name: 'Name',
    realName: 'Kenzo Ito',
    role: 'CEO',
    realRole: 'VP Connected Systems',
    tier: 2,
    department: 'Connected IoT Systems',
    parent: 'lead-ceo',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=85',
    bio: 'Bridging physical consumer hardware with cloud-native intelligence and real-time operational telemetry.',
    discipline: 'Connected Hardware & Ambient Computing',
    quote: 'Connected devices should feel like natural extensions of our lives.',
    skills: ['RTOS Firmware', 'Zigbee & Thread', 'Zero-Latency Telemetry'],
  },

  // --- Tier 3: 6 Sub-Cards (The Cards Below the 3 leads) ---
  // Sub-team under Digital Infrastructure (Left):
  {
    id: 'infra-arch',
    name: 'Name',
    realName: 'Marcus Chen',
    role: 'CEO',
    realRole: 'Lead Systems Architect',
    tier: 3,
    parentBranch: 'eng-lead',
    department: 'Digital Infrastructure',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=85',
    bio: 'Designing high-throughput event buses and low-latency microkernel operating layers.',
    discipline: 'High-Throughput Distributed Architecture',
    quote: 'Resilience is designed from the packet level upward.',
    skills: ['Rust', 'Kafka Streaming', 'gRPC Microservices'],
  },
  {
    id: 'infra-sec',
    name: 'Name',
    realName: 'Aria Montgomery',
    role: 'CEO',
    realRole: 'Cloud Security & DevOps Lead',
    tier: 3,
    parentBranch: 'eng-lead',
    department: 'Digital Infrastructure',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85',
    bio: 'Pioneering zero-trust cryptographic boundaries and automated multi-region deployment fabrics.',
    discipline: 'Cloud Security & Zero-Trust Architecture',
    quote: 'Security is not a checkpoint; it is the fabric itself.',
    skills: ['Zero-Trust Enclaves', 'Terraform CI/CD', 'Kubernetes'],
  },

  // Sub-team under AI (Middle):
  {
    id: 'ai-ml',
    name: 'Name',
    realName: 'David Park',
    role: 'CEO',
    realRole: 'Senior ML Engineer',
    tier: 3,
    parentBranch: 'ai-lead',
    department: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
    bio: 'Optimizing deep learning models for millisecond edge inference across heterogeneous neural compute engines.',
    discipline: 'Model Compression & Edge Acceleration',
    quote: 'Intelligent systems thrive when efficiency meets precision.',
    skills: ['ONNX Runtime', 'CUDA Optimization', 'Quantized Weights'],
  },
  {
    id: 'ai-vision',
    name: 'Name',
    realName: 'Sophia Lin',
    role: 'CEO',
    realRole: 'Computer Vision Lead',
    tier: 3,
    parentBranch: 'ai-lead',
    department: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    bio: 'Building real-time computer vision algorithms for defect detection, spatial navigation, and ambient intelligence.',
    discipline: 'Sensory Vision & Spatial Telemetry',
    quote: 'Seeing the unseen transforms reactive machines into proactive systems.',
    skills: ['OpenCV', 'Sensory Fusion', 'Spatial Neural Networks'],
  },

  // Sub-team under Connected Systems (Right):
  {
    id: 'iot-firmware',
    name: 'Name',
    realName: 'Leo Nakamura',
    role: 'CEO',
    realRole: 'Embedded Firmware Lead',
    tier: 3,
    parentBranch: 'iot-lead',
    department: 'Connected IoT Systems',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=85',
    bio: 'Developing deterministic real-time microcontrollers with ultra-low battery consumption profiles.',
    discipline: 'Embedded RTOS & Hardware Firmware',
    quote: 'Microseconds and microwatts matter at scale.',
    skills: ['FreeRTOS', 'Embedded C/C++', 'BLE 5.4 / Thread'],
  },
  {
    id: 'iot-hardware',
    name: 'Name',
    realName: 'Zara Al-Mansoor',
    role: 'CEO',
    realRole: 'Hardware Mesh Specialist',
    tier: 3,
    parentBranch: 'iot-lead',
    department: 'Connected IoT Systems',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=85',
    bio: 'Engineering multi-node RF antennae, high-speed PCB layouts, and robust industrial appliance connectivity.',
    discipline: 'RF Engineering & Cyber-Physical Prototyping',
    quote: 'The real world is noisy; our signals cut through.',
    skills: ['PCB CAD Layout', 'RF Antenna Tuning', 'Zigbee Protocol'],
  },
];

// Reusable card photo component matching the Figma rounded 24px photo style
const MemberPhoto = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative w-[200px] h-[200px] rounded-[24px] overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.25)] bg-[#1e232d] ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top grayscale-[12%] contrast-105 brightness-95 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 ring-1 ring-white/20 rounded-[24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export const TeamTreeSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const treeContainerRef = useRef(null);

  const [selectedMember, setSelectedMember] = useState(null);
  const [showRealNames, setShowRealNames] = useState(false);
  const [showTier3, setShowTier3] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Entrance
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // SVG lines drawing effect
      const paths = sectionRef.current?.querySelectorAll('.tree-svg-path') || [];
      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 600;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          scrollTrigger: {
            trigger: treeContainerRef.current,
            start: 'top 75%',
          },
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
      });

      // Staggered card entrance with safety fallback
      const cards = sectionRef.current?.querySelectorAll('.tree-node-card') || [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0.3 },
          {
            scrollTrigger: {
              trigger: treeContainerRef.current,
              start: 'top 75%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [showTier3]);

  const getDisplayName = (member) => {
    return showRealNames ? member.realName : member.name;
  };

  const getDisplayRole = (member) => {
    return showRealNames ? (member.realRole || member.role) : member.role;
  };

  // Filter members by tier
  const tier1Member = teamMembers[0]; // CEO
  const tier2Members = teamMembers.slice(1, 4); // 3 Directors
  const tier3Left = teamMembers.slice(4, 6); // 2 under Digital Infrastructure
  const tier3Mid = teamMembers.slice(6, 8); // 2 under AI
  const tier3Right = teamMembers.slice(8, 10); // 2 under Connected Systems

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-24 pb-36 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1725px] mx-auto flex flex-col items-center">
        {/* Section Heading matching Figma: Sora 64px, weight 600 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="font-['Sora'] font-semibold text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.15] lg:leading-[70px] tracking-[-0.02em] text-black"
          >
            The People Behind The Screen
          </h2>

          {/* Interactive view controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-widest text-slate-600">
              Interactive Hierarchy
            </span>
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <button
              onClick={() => setShowRealNames(!showRealNames)}
              className="text-[11px] font-['JetBrains_Mono'] px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300 cursor-pointer"
            >
              Mode: {showRealNames ? 'Team Profiles' : 'Figma Layout (Name/CEO)'}
            </button>
            <button
              onClick={() => setShowTier3(!showTier3)}
              className="text-[11px] font-['JetBrains_Mono'] px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-200 cursor-pointer flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showTier3 ? 'Show Less' : 'Show All Cards Below'}</span>
              {showTier3 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Tree Container */}
        <div
          ref={treeContainerRef}
          className="relative w-full max-w-[1480px] flex flex-col items-center min-h-[1050px]"
        >

          {/* ========================================================= */}
          {/* TIER 1: Top Leader Card (CEO)                            */}
          {/* ========================================================= */}
          <div className="relative z-30 mb-8 sm:mb-12">
            <div
              onClick={() => setSelectedMember(tier1Member)}
              className="tree-node-card w-[300px] h-[357px] team-card-glass rounded-[24px] p-[30px_56px_37px] flex flex-col items-center gap-[24px] cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(29,78,216,0.3)] hover:border-blue-300"
            >
              <div className="transition-transform duration-300 group-hover:scale-[1.03]">
                <MemberPhoto src={tier1Member.image} alt={tier1Member.name} />
              </div>

              <div className="flex flex-col items-center gap-0 -mt-2 text-center">
                <span className="font-['Sora'] font-normal text-[24px] leading-[28px] text-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                  {getDisplayName(tier1Member)}
                </span>
                <span className="font-['Sora'] font-normal text-[22px] sm:text-[24px] leading-[36px] tracking-[-0.02em] text-[#808080] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                  {getDisplayRole(tier1Member)}
                </span>
              </div>

              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* SVG CONNECTOR LINES: TIER 1 -> TIER 2 & TIER 2 -> TIER 3  */}
          {/* ========================================================= */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 w-full h-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 1480 1450"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="treeLineShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* --- BRANCHES FROM TIER 1 TO TIER 2 --- */}
              {/* Branch 1: Top to Left Director (740, 360) -> (245, 520) */}
              <path
                className="tree-svg-path"
                d="M 740 360 C 740 440, 560 440, 420 465 C 310 485, 245 490, 245 520"
                stroke="#0F2C59"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#treeLineShadow)"
              />

              {/* Branch 2: Top to Middle Director (740, 360) -> (740, 600) */}
              <path
                className="tree-svg-path"
                d="M 740 360 C 740 470, 780 490, 770 540 C 760 575, 740 580, 740 600"
                stroke="#0F2C59"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#treeLineShadow)"
              />

              {/* Branch 3: Top to Right Director (740, 360) -> (1235, 530) */}
              <path
                className="tree-svg-path"
                d="M 740 360 C 740 440, 920 440, 1060 465 C 1170 485, 1235 495, 1235 530"
                stroke="#0F2C59"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#treeLineShadow)"
              />

              {/* --- BRANCHES FROM TIER 2 TO TIER 3 (CARDS BELOW) --- */}
              {showTier3 && (
                <>
                  {/* From Left Lead (245, 880) to Sub-Cards 1 & 2 */}
                  <path
                    className="tree-svg-path"
                    d="M 245 880 C 245 940, 130 940, 130 990"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                  <path
                    className="tree-svg-path"
                    d="M 245 880 C 245 940, 360 940, 360 990"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />

                  {/* From Middle Lead (740, 960) to Sub-Cards 3 & 4 */}
                  <path
                    className="tree-svg-path"
                    d="M 740 960 C 740 1010, 625 1010, 625 1060"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                  <path
                    className="tree-svg-path"
                    d="M 740 960 C 740 1010, 855 1010, 855 1060"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />

                  {/* From Right Lead (1235, 890) to Sub-Cards 5 & 6 */}
                  <path
                    className="tree-svg-path"
                    d="M 1235 890 C 1235 940, 1120 940, 1120 990"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                  <path
                    className="tree-svg-path"
                    d="M 1235 890 C 1235 940, 1350 940, 1350 990"
                    stroke="#1D4ED8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                </>
              )}

              {/* Glowing signal particles traveling along branches */}
              <circle r="4" fill="#60A5FA">
                <animateMotion
                  path="M 740 360 C 740 440, 560 440, 420 465 C 310 485, 245 490, 245 520"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#60A5FA">
                <animateMotion
                  path="M 740 360 C 740 470, 780 490, 770 540 C 760 575, 740 580, 740 600"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#60A5FA">
                <animateMotion
                  path="M 740 360 C 740 440, 920 440, 1060 465 C 1170 485, 1235 495, 1235 530"
                  dur="4.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* ========================================================= */}
          {/* TIER 2: 3 Direct Functional Leads (Left, Middle, Right)   */}
          {/* ========================================================= */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 mt-6 lg:mt-32 relative z-20">
            {tier2Members.map((member, index) => {
              // Asymmetric heights matching Figma positioning
              const offsetClass = [
                'lg:-translate-y-4', // Left
                'lg:translate-y-20', // Middle (placed lower)
                'lg:-translate-y-2', // Right
              ][index];

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`tree-node-card w-[300px] h-[357px] team-card-glass rounded-[24px] p-[30px_56px_37px] flex flex-col items-center gap-[24px] cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(29,78,216,0.3)] hover:border-blue-300 ${offsetClass}`}
                >
                  <div className="transition-transform duration-300 group-hover:scale-[1.03]">
                    <MemberPhoto src={member.image} alt={member.name} />
                  </div>

                  <div className="flex flex-col items-center gap-0 -mt-2 text-center">
                    <span className="font-['Sora'] font-normal text-[24px] leading-[28px] text-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                      {getDisplayName(member)}
                    </span>
                    <span className="font-['Sora'] font-normal text-[20px] sm:text-[22px] leading-[36px] tracking-[-0.02em] text-[#808080] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                      {getDisplayRole(member)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* TIER 3: The Cards Below (Sub-teams under each lead)       */}
          {/* ========================================================= */}
          {showTier3 && (
            <div className="w-full mt-20 sm:mt-32 lg:mt-48 relative z-20 animate-in fade-in slide-in-from-bottom-6 duration-500">
              {/* Group label */}
              <div className="text-center mb-10">
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/60 font-semibold">
                  // SPECIALIZED ENGINEERING SQUADS
                </span>
              </div>

              {/* 3 Columns matching the 3 leads above, each containing 2 child cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">

                {/* Squad 1: Under Digital Infrastructure (Left) */}
                <div className="flex flex-col sm:flex-row lg:flex-row justify-center gap-6">
                  {tier3Left.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedMember(sub)}
                      className="tree-node-card w-[260px] sm:w-[220px] xl:w-[230px] h-[310px] team-card-glass rounded-[20px] p-5 flex flex-col items-center gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(29,78,216,0.25)] hover:border-blue-400 bg-white/60"
                    >
                      <div className="relative w-[130px] h-[130px] rounded-[18px] overflow-hidden shadow-md">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="font-['Sora'] font-semibold text-[18px] text-slate-900 leading-snug">
                          {getDisplayName(sub)}
                        </span>
                        <span className="font-['Sora'] text-xs text-blue-700 font-medium mt-0.5">
                          {getDisplayRole(sub)}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-slate-500 mt-1 uppercase">
                          {sub.department.replace('Digital ', '')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Squad 2: Under AI Research (Middle, slightly offset) */}
                <div className="flex flex-col sm:flex-row lg:flex-row justify-center gap-6 lg:translate-y-12">
                  {tier3Mid.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedMember(sub)}
                      className="tree-node-card w-[260px] sm:w-[220px] xl:w-[230px] h-[310px] team-card-glass rounded-[20px] p-5 flex flex-col items-center gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(29,78,216,0.25)] hover:border-blue-400 bg-white/60"
                    >
                      <div className="relative w-[130px] h-[130px] rounded-[18px] overflow-hidden shadow-md">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="font-['Sora'] font-semibold text-[18px] text-slate-900 leading-snug">
                          {getDisplayName(sub)}
                        </span>
                        <span className="font-['Sora'] text-xs text-blue-700 font-medium mt-0.5">
                          {getDisplayRole(sub)}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-slate-500 mt-1 uppercase">
                          {sub.department.replace('Artificial ', '')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Squad 3: Under Connected Systems (Right) */}
                <div className="flex flex-col sm:flex-row lg:flex-row justify-center gap-6">
                  {tier3Right.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedMember(sub)}
                      className="tree-node-card w-[260px] sm:w-[220px] xl:w-[230px] h-[310px] team-card-glass rounded-[20px] p-5 flex flex-col items-center gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(29,78,216,0.25)] hover:border-blue-400 bg-white/60"
                    >
                      <div className="relative w-[130px] h-[130px] rounded-[18px] overflow-hidden shadow-md">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="font-['Sora'] font-semibold text-[18px] text-slate-900 leading-snug">
                          {getDisplayName(sub)}
                        </span>
                        <span className="font-['Sora'] text-xs text-blue-700 font-medium mt-0.5">
                          {getDisplayRole(sub)}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-slate-500 mt-1 uppercase">
                          {sub.department.replace('Connected ', '')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* MEMBER DETAIL MODAL                                       */}
      {/* ========================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex-shrink-0">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-['Sora'] font-bold text-xl sm:text-2xl text-slate-950">
                    {getDisplayName(selectedMember)}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-['JetBrains_Mono'] bg-blue-100 text-blue-800 font-semibold">
                    {getDisplayRole(selectedMember)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-['Manrope'] text-blue-700 font-semibold mt-1">
                  {selectedMember.discipline}
                </p>
                <span className="text-[11px] font-['JetBrains_Mono'] text-slate-600 block mt-0.5">
                  Dept: {selectedMember.department}
                </span>
              </div>
            </div>

            <p className="text-slate-700 font-['Manrope'] text-sm leading-relaxed mb-5">
              {selectedMember.bio}
            </p>

            {/* Core Competencies */}
            {selectedMember.skills && (
              <div className="mb-5">
                <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-slate-600 block mb-2 font-semibold">
                  Core Specializations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-['JetBrains_Mono'] px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quote */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
              <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-slate-600 block mb-1">
                Engineering Principle
              </span>
              <p className="font-['Sora'] text-sm italic text-slate-800">
                "{selectedMember.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <a href="#connect" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a href="#connect" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="mailto:connect@zeldapro.ai" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-['Manrope'] text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
