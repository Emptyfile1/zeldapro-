import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, X, Layers, ChevronDown, ChevronUp, Sparkles, UserCheck, Link2, AtSign } from 'lucide-react';
// then use <Link2 /> and <AtSign /> in the modal instead of Linkedin / Twitter

gsap.registerPlugin(ScrollTrigger);

// Complete 10-node hierarchy: Tier 1 (Root), Tier 2 (3 Functional Directors), Tier 3 (6 Specialists Below)
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

  // --- Tier 3: 6 Sub-Cards (Cards Below the 3 Leads) ---
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
    realRole: 'Cloud Security Lead',
    tier: 3,
    parentBranch: 'eng-lead',
    department: 'Digital Infrastructure',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85',
    bio: 'Pioneering zero-trust cryptographic boundaries and automated multi-region deployment fabrics.',
    discipline: 'Cloud Security & Zero-Trust Architecture',
    quote: 'Security is not a checkpoint; it is the fabric itself.',
    skills: ['Zero-Trust Enclaves', 'Terraform CI/CD', 'Kubernetes'],
  },

  // Sub-team under AI Research (Middle):
  {
    id: 'ai-ml',
    name: 'Name',
    realName: 'David Park',
    role: 'CEO',
    realRole: 'Senior ML Engineer',
    tier: 3,
    parentBranch: 'ai-lead',
    department: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=85',
    bio: 'Fine-tuning transformer weights for real-time edge devices with sub-10 millisecond response latencies.',
    discipline: 'Neural Quantization & LLM Distillation',
    quote: 'Speed and precision are not mutually exclusive.',
    skills: ['ONNX Runtime', 'CUDA Optimization', 'Vector Databases'],
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

// Helper: generate smooth S-curve cubic Bezier path between two coordinate points
function createSmoothCurve(p1, p2) {
  if (!p1 || !p2) return '';
  const dy = p2.y - p1.y;
  // Dynamic handle offset proportional to vertical separation
  const handleOffset = Math.max(30, Math.min(dy * 0.5, 90));
  const cp1y = p1.y + handleOffset;
  const cp2y = p2.y - handleOffset;
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} C ${p1.x.toFixed(1)} ${cp1y.toFixed(1)}, ${p2.x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

export const TeamTreeSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const treeContainerRef = useRef(null);

  // DOM node references for pixel-perfect dynamic SVG line anchor points
  const tier1CardRef = useRef(null);
  const tier2CardRefs = [useRef(null), useRef(null), useRef(null)];
  const tier3CardRefs = [
    useRef(null), useRef(null), // Left squad (Marcus, Aria)
    useRef(null), useRef(null), // Mid squad (David, Sophia)
    useRef(null), useRef(null), // Right squad (Leo, Zara)
  ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [showRealNames, setShowRealNames] = useState(false);
  const [showTier3, setShowTier3] = useState(true);

  // Computed SVG lines state
  const [svgLines, setSvgLines] = useState([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 1200, height: 900 });

  // Recalculate dynamic connector lines based on actual rendered card coordinates
  const updateConnectorLines = useCallback(() => {
    if (!treeContainerRef.current || !tier1CardRef.current) return;

    const containerRect = treeContainerRef.current.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    setSvgDimensions({
      width: Math.round(containerRect.width),
      height: Math.round(containerRect.height),
    });

    const getAnchors = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        topCenter: {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top - containerRect.top,
        },
        bottomCenter: {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.bottom - containerRect.top,
        },
      };
    };

    const t1Anchors = getAnchors(tier1CardRef.current);
    const t2Anchors = tier2CardRefs.map((r) => getAnchors(r.current));
    const t3Anchors = tier3CardRefs.map((r) => getAnchors(r.current));

    if (!t1Anchors) return;

    const lines = [];

    // --- TIER 1 TO TIER 2 LINES ---
    t2Anchors.forEach((childAnchor, idx) => {
      if (childAnchor) {
        const pathData = createSmoothCurve(t1Anchors.bottomCenter, childAnchor.topCenter);
        lines.push({
          id: `t1-to-t2-${idx}`,
          tier: '1-to-2',
          from: t1Anchors.bottomCenter,
          to: childAnchor.topCenter,
          d: pathData,
          dur: `${3.6 + idx * 0.3}s`,
        });
      }
    });

    // --- TIER 2 TO TIER 3 LINES (CARDS BELOW) ---
    if (showTier3) {
      // Squad 1: Under Left Lead (t2[0] -> t3[0], t3[1])
      if (t2Anchors[0]) {
        if (t3Anchors[0]) {
          lines.push({
            id: 't2-0-to-t3-0',
            tier: '2-to-3',
            from: t2Anchors[0].bottomCenter,
            to: t3Anchors[0].topCenter,
            d: createSmoothCurve(t2Anchors[0].bottomCenter, t3Anchors[0].topCenter),
            dur: '4.0s',
          });
        }
        if (t3Anchors[1]) {
          lines.push({
            id: 't2-0-to-t3-1',
            tier: '2-to-3',
            from: t2Anchors[0].bottomCenter,
            to: t3Anchors[1].topCenter,
            d: createSmoothCurve(t2Anchors[0].bottomCenter, t3Anchors[1].topCenter),
            dur: '4.2s',
          });
        }
      }

      // Squad 2: Under Middle Lead (t2[1] -> t3[2], t3[3])
      if (t2Anchors[1]) {
        if (t3Anchors[2]) {
          lines.push({
            id: 't2-1-to-t3-2',
            tier: '2-to-3',
            from: t2Anchors[1].bottomCenter,
            to: t3Anchors[2].topCenter,
            d: createSmoothCurve(t2Anchors[1].bottomCenter, t3Anchors[2].topCenter),
            dur: '3.8s',
          });
        }
        if (t3Anchors[3]) {
          lines.push({
            id: 't2-1-to-t3-3',
            tier: '2-to-3',
            from: t2Anchors[1].bottomCenter,
            to: t3Anchors[3].topCenter,
            d: createSmoothCurve(t2Anchors[1].bottomCenter, t3Anchors[3].topCenter),
            dur: '4.1s',
          });
        }
      }

      // Squad 3: Under Right Lead (t2[2] -> t3[4], t3[5])
      if (t2Anchors[2]) {
        if (t3Anchors[4]) {
          lines.push({
            id: 't2-2-to-t3-4',
            tier: '2-to-3',
            from: t2Anchors[2].bottomCenter,
            to: t3Anchors[4].topCenter,
            d: createSmoothCurve(t2Anchors[2].bottomCenter, t3Anchors[4].topCenter),
            dur: '3.9s',
          });
        }
        if (t3Anchors[5]) {
          lines.push({
            id: 't2-2-to-t3-5',
            tier: '2-to-3',
            from: t2Anchors[2].bottomCenter,
            to: t3Anchors[5].topCenter,
            d: createSmoothCurve(t2Anchors[2].bottomCenter, t3Anchors[5].topCenter),
            dur: '4.3s',
          });
        }
      }
    }

    setSvgLines(lines);
  }, [showTier3]);

  // Handle ResizeObserver, window resize, and layout changes
  useEffect(() => {
    // Initial calculation
    const timer = setTimeout(() => {
      updateConnectorLines();
    }, 50);

    const handleResize = () => {
      updateConnectorLines();
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && treeContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateConnectorLines();
      });
      resizeObserver.observe(treeContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateConnectorLines, showTier3, showRealNames]);

  // Smooth line tracking during expand/collapse transition
  useEffect(() => {
    let frameId;
    let startTime = performance.now();
    const duration = 500; // ms

    const step = (now) => {
      updateConnectorLines();
      if (now - startTime < duration) {
        frameId = requestAnimationFrame(step);
      }
    };
    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [showTier3, updateConnectorLines]);

  // Entrance animations using GSAP (Title only - Cards remain permanently visible)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Entrance
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getDisplayName = (member) => {
    return showRealNames ? member.realName : member.name;
  };

  const getDisplayRole = (member) => {
    return showRealNames ? (member.realRole || member.role) : member.role;
  };

  // Split members
  const tier1Member = teamMembers[0]; // CEO
  const tier2Members = teamMembers.slice(1, 4); // 3 Leads
  const tier3Left = teamMembers.slice(4, 6); // 2 under Digital Infrastructure
  const tier3Mid = teamMembers.slice(6, 8); // 2 under AI
  const tier3Right = teamMembers.slice(8, 10); // 2 under Connected Systems

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-20 sm:pt-24 pb-32 sm:pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Section Heading matching Figma: Sora, semibold */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            ref={titleRef}
            className="font-['Sora'] font-semibold text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.15] tracking-[-0.02em] text-slate-950"
          >
            The People Behind The Screen
          </h2>

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-slate-500 font-medium">
              Org Architecture
            </span>
            <div className="h-3.5 w-px bg-slate-300 hidden sm:block" />
            <button
              onClick={() => setShowRealNames(!showRealNames)}
              className="text-[11px] font-['JetBrains_Mono'] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200/90 cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Mode: {showRealNames ? 'Team Profiles' : 'Figma Spec (Name/CEO)'}</span>
            </button>
            <button
              onClick={() => setShowTier3(!showTier3)}
              className={`text-[11px] font-['JetBrains_Mono'] px-3.5 py-1.5 rounded-lg transition-all border cursor-pointer flex items-center gap-1.5 shadow-xs ${
                showTier3
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{showTier3 ? 'Show Less (4 Nodes)' : 'Expand Tree (10 Nodes)'}</span>
              {showTier3 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Tree Interactive Hierarchy Container */}
        <div
          ref={treeContainerRef}
          className="relative w-full max-w-[1240px] flex flex-col items-center"
        >
          {/* ========================================================= */}
          {/* DYNAMIC SVG CONNECTOR LINES                               */}
          {/* Unified styling for Tier 1->2 AND Tier 2->3 with 100%     */}
          {/* mathematically aligned anchors at card centers!           */}
          {/* ========================================================= */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 w-full h-full">
            <svg
              className="w-full h-full overflow-visible"
              width={svgDimensions.width}
              height={svgDimensions.height}
              viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
              fill="none"
            >
              <defs>
                {/* Unified subtle drop shadow for depth */}
                <filter id="unifiedLineShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0F2C59" floodOpacity="0.14" />
                </filter>

                {/* Sleek uniform branch gradient */}
                <linearGradient id="treeBranchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0F2C59" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>

                {/* Node glow filter */}
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render dynamic curves with IDENTICAL visual styling */}
              {svgLines.map((line) => (
                <g key={line.id} className="transition-opacity duration-300">
                  {/* Subtle ambient blur background trace */}
                  <path
                    d={line.d}
                    stroke="#93C5FD"
                    strokeWidth="5"
                    strokeOpacity="0.25"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Primary sharp connector line (Identical 2.5px width and gradient) */}
                  <path
                    d={line.d}
                    stroke="url(#treeBranchGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#unifiedLineShadow)"
                  />

                  {/* Terminal anchor pin at connection start */}
                  <circle
                    cx={line.from.x}
                    cy={line.from.y}
                    r="3.5"
                    fill="#0F2C59"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* Terminal anchor pin at connection end */}
                  <circle
                    cx={line.to.x}
                    cy={line.to.y}
                    r="3.5"
                    fill="#1D4ED8"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* Animated signal light pulse traveling down the branch */}
                  <circle r="3" fill="#60A5FA" filter="url(#nodeGlow)">
                    <animateMotion
                      path={line.d}
                      dur={line.dur}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* ========================================================= */}
          {/* TIER 1: Root Leader (CEO)                                 */}
          {/* Refined scale: 220px x 265px with 136px photo             */}
          {/* ========================================================= */}
          <div className="relative z-20 mb-10 sm:mb-12">
            <div
              ref={tier1CardRef}
              className="tree-node-card w-[215px] sm:w-[225px] h-[265px] rounded-[22px] p-4 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(29,78,216,0.22)] hover:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/80 border-2 border-[#C8DBF4] shadow-[0_12px_28px_-6px_rgba(15,44,89,0.14),0_4px_12px_-2px_rgba(15,44,89,0.06)]"
            >
              {/* Photo */}
              <div className="relative w-[136px] h-[136px] rounded-[18px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.14)] bg-[#1e232d] flex-shrink-0">
                <img
                  src={tier1Member.image}
                  alt={tier1Member.name}
                  className="w-full h-full object-cover object-top grayscale-[12%] contrast-105 brightness-95 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-black/10 rounded-[18px] pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-center text-center mt-1 w-full">
                <span className="font-['Sora'] font-bold text-[18px] text-slate-950 leading-tight">
                  {getDisplayName(tier1Member)}
                </span>
                <span className="font-['Sora'] font-semibold text-[13.5px] text-blue-700 mt-0.5">
                  {getDisplayRole(tier1Member)}
                </span>
                {showRealNames && (
                  <span className="text-[10px] font-['JetBrains_Mono'] text-slate-500 tracking-wider uppercase mt-1">
                    {tier1Member.department}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TIER 2: 3 Functional Leads (Infrastructure, AI, IoT)      */}
          {/* Refined scale: 205px x 255px with 126px photo             */}
          {/* ========================================================= */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center relative z-20">
            {tier2Members.map((member, index) => {
              // Subtle stagger matching Figma's dynamic composition
              const staggerClass = [
                'lg:-translate-y-2',
                'lg:translate-y-8',
                'lg:-translate-y-1',
              ][index];

              return (
                <div
                  key={member.id}
                  ref={tier2CardRefs[index]}
                  
                  className={`tree-node-card w-[205px] sm:w-[215px] h-[255px] rounded-[22px] p-4 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(29,78,216,0.22)] hover:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/80 border-2 border-[#C8DBF4] shadow-[0_12px_28px_-6px_rgba(15,44,89,0.14),0_4px_12px_-2px_rgba(15,44,89,0.06)] ${staggerClass}`}
                >
                  {/* Photo */}
                  <div className="relative w-[126px] h-[126px] rounded-[16px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.14)] bg-[#1e232d] flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top grayscale-[12%] contrast-105 brightness-95 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-black/10 rounded-[16px] pointer-events-none" />
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white shadow-xs" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col items-center text-center mt-1 w-full">
                    <span className="font-['Sora'] font-bold text-[17px] text-slate-950 leading-tight">
                      {getDisplayName(member)}
                    </span>
                    <span className="font-['Sora'] font-semibold text-[13px] text-blue-700 mt-0.5">
                      {getDisplayRole(member)}
                    </span>
                    {showRealNames && (
                      <span className="text-[10px] font-['JetBrains_Mono'] text-slate-500 tracking-wider uppercase mt-1 line-clamp-1">
                        {member.department.replace('Connected ', '').replace('Digital ', '')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* TIER 3: The Cards Below (2 Specialists under each Lead)   */}
          {/* Refined scale: 172px x 218px with 100px photo             */}
          {/* Perfectly aligned in 3 squads under their parent leads!   */}
          {/* ========================================================= */}
          <div
            className={`w-full transition-all duration-500 ease-in-out relative z-20 ${
              showTier3
                ? 'opacity-100 max-h-[1400px] mt-16 sm:mt-24 pointer-events-auto'
                : 'opacity-0 max-h-0 overflow-hidden mt-0 pointer-events-none'
            }`}
          >
            {/* Squads label badge */}
            <div className="flex items-center justify-center mb-8">
              <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-blue-700 bg-blue-50/90 px-3.5 py-1 rounded-full border border-blue-200/70 font-semibold flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Specialized Engineering Squads
              </span>
            </div>

            {/* 3 Columns matching the 3 leads above */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start justify-items-center">
              {/* Squad 1: Under Digital Infrastructure (Left) */}
              <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                {tier3Left.map((sub, i) => (
                  <div
                    key={sub.id}
                    ref={tier3CardRefs[i]}
                    
                    className="tree-node-card w-[164px] sm:w-[172px] h-[218px] rounded-[18px] p-3 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(29,78,216,0.2)] hover:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/80 border-2 border-[#C8DBF4] shadow-[0_10px_24px_-6px_rgba(15,44,89,0.12),0_4px_10px_-2px_rgba(15,44,89,0.05)]"
                  >
                    <div className="relative w-[100px] h-[100px] rounded-[14px] overflow-hidden shadow-sm bg-[#1e232d] flex-shrink-0">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover object-top grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 ring-1 ring-black/10 rounded-[14px] pointer-events-none" />
                    </div>

                    <div className="flex flex-col items-center text-center mt-1 w-full">
                      <span className="font-['Sora'] font-bold text-[14.5px] text-slate-950 leading-tight">
                        {getDisplayName(sub)}
                      </span>
                      <span className="font-['Sora'] text-[11.5px] text-blue-700 font-semibold mt-0.5 line-clamp-1">
                        {getDisplayRole(sub)}
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[9.5px] text-slate-500 uppercase tracking-wider mt-0.5">
                        Infra
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Squad 2: Under AI Research (Middle, slightly offset to match middle lead) */}
              <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:translate-y-8">
                {tier3Mid.map((sub, i) => (
                  <div
                    key={sub.id}
                    ref={tier3CardRefs[2 + i]}
                    
                    className="tree-node-card w-[164px] sm:w-[172px] h-[218px] rounded-[18px] p-3 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(29,78,216,0.2)] hover:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/80 border-2 border-[#C8DBF4] shadow-[0_10px_24px_-6px_rgba(15,44,89,0.12),0_4px_10px_-2px_rgba(15,44,89,0.05)]"
                  >
                    <div className="relative w-[100px] h-[100px] rounded-[14px] overflow-hidden shadow-sm bg-[#1e232d] flex-shrink-0">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover object-top grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 ring-1 ring-black/10 rounded-[14px] pointer-events-none" />
                    </div>

                    <div className="flex flex-col items-center text-center mt-1 w-full">
                      <span className="font-['Sora'] font-bold text-[14.5px] text-slate-950 leading-tight">
                        {getDisplayName(sub)}
                      </span>
                      <span className="font-['Sora'] text-[11.5px] text-blue-700 font-semibold mt-0.5 line-clamp-1">
                        {getDisplayRole(sub)}
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[9.5px] text-slate-500 uppercase tracking-wider mt-0.5">
                        AI Lab
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Squad 3: Under Connected Systems (Right) */}
              <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                {tier3Right.map((sub, i) => (
                  <div
                    key={sub.id}
                    ref={tier3CardRefs[4 + i]}
                    
                    className="tree-node-card w-[164px] sm:w-[172px] h-[218px] rounded-[18px] p-3 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(29,78,216,0.2)] hover:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/80 border-2 border-[#C8DBF4] shadow-[0_10px_24px_-6px_rgba(15,44,89,0.12),0_4px_10px_-2px_rgba(15,44,89,0.05)]"
                  >
                    <div className="relative w-[100px] h-[100px] rounded-[14px] overflow-hidden shadow-sm bg-[#1e232d] flex-shrink-0">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover object-top grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 ring-1 ring-black/10 rounded-[14px] pointer-events-none" />
                    </div>

                    <div className="flex flex-col items-center text-center mt-1 w-full">
                      <span className="font-['Sora'] font-bold text-[14.5px] text-slate-950 leading-tight">
                        {getDisplayName(sub)}
                      </span>
                      <span className="font-['Sora'] text-[11.5px] text-blue-700 font-semibold mt-0.5 line-clamp-1">
                        {getDisplayRole(sub)}
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[9.5px] text-slate-500 uppercase tracking-wider mt-0.5">
                        IoT Device
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MEMBER DETAIL MODAL                                       */}
      {/* ========================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 sm:gap-5 mb-6">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-md border border-slate-200 flex-shrink-0">
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
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-['JetBrains_Mono'] bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold">
                    {getDisplayRole(selectedMember)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-['Manrope'] text-blue-700 font-semibold mt-1">
                  {selectedMember.discipline}
                </p>
                <span className="text-[11px] font-['JetBrains_Mono'] text-slate-500 block mt-0.5">
                  Department: {selectedMember.department}
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
              <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-slate-500 block mb-1">
                Engineering Principle
              </span>
              <p className="font-['Sora'] text-sm italic text-slate-800">
                "{selectedMember.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <a href="#connect" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#connect" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="mailto:team@engineering.io" className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <button
              
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-['Manrope'] text-sm font-semibold rounded-xl transition-colors cursor-pointer"
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
