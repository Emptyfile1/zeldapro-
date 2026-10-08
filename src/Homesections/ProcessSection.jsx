import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG illustrations served from /public/assets
// Finds every .svg under src and logs what it found
const svgs = import.meta.glob('/src/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});
console.log('SVGs found:', Object.keys(svgs));

// Picks the file whose name contains the keyword (e.g. "discover")
const find = (word) =>
  Object.entries(svgs).find(([path]) => path.toLowerCase().includes(word))?.[1] || '';

const IMG = {
  discover: find('discover'),
  connect: find('connect'),
  build: find('build'),
  intelligence: find('intelligence'),
  deploy: find('deploy'),
};

// side = which side the IMAGE sits on. Text takes the other side.
const steps = [
  {
    id: 'discover',
    title: 'Discover',
    tag: '',
    side: 'left',
    image: IMG.discover,
    text: 'Every intelligent solution starts with a real-world problem. We begin by deeply understanding your business challenges and identifying the precise opportunities where digital innovation can make a difference.',
    gradient: 'linear-gradient(90deg, #1D4ED8 0%, #0B1B3D 100%)',
  },
  {
    id: 'connect',
    title: 'Connect',
    tag: '',
    side: 'right',
    image: IMG.connect,
    text: 'Data is the foundation. We bridge the gap between your physical operations and the digital landscape, utilizing IoT to ensure your devices, systems, and environments are seamlessly communicating.',
    gradient: 'linear-gradient(90deg, #1D82D8 0%, #0B1B3D 100%)',
  },
  {
    id: 'build',
    title: 'Build',
    tag: '',
    side: 'left',
    image: IMG.build,
    text: 'With the blueprint set, we design and develop the core technology. From scalable web platforms to complex software architectures, we build the digital infrastructure that brings your ideas to life.',
    gradient: 'linear-gradient(90deg, #1D4ED8 0%, #0B1B3D 100%)',
  },
  {
    id: 'intelligence',
    title: 'Intelligence',
    tag: '',
    side: 'right',
    image: IMG.intelligence,
    text: 'Software connects, but AI empowers. We integrate artificial intelligence into your ecosystem, transforming the way decisions are made and turning continuous data into predictive, actionable intelligence.',
    gradient: 'linear-gradient(90deg, #1D4ED8 0%, #0B1B3D 100%)',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    tag: '',
    side: 'left',
    image: IMG.deploy,
    text: 'We turn concepts into reality. Your integrated solution is securely launched, seamlessly integrated into your daily operations, and built to scale as your business evolves.',
    gradient: 'linear-gradient(90deg, #1D4ED8 0%, #0B1B3D 100%)',
  },
];

// Where each connector leaves the previous image and lands on the next one.
// Values are fractions of the image box (x, y) taken from the Figma frame.
const connectors = [
  { from: { edge: 'right', y: 0.87 }, to: { edge: 'top', x: 0.44 } }, // Discover -> Connect
  { from: { edge: 'left', y: 0.7 }, to: { edge: 'top', x: 0.56 } }, // Connect  -> Build
  { from: { edge: 'right', y: 0.79 }, to: { edge: 'top', x: 0.46 } }, // Build    -> Intelligence
  { from: { edge: 'left', y: 0.82 }, to: { edge: 'top', x: 0.76 } }, // Intelligence -> Deploy
];

const anchor = (rect, box, spec) => {
  if (spec.edge === 'right') return { x: rect.right - box.left, y: rect.top - box.top + rect.height * spec.y };
  if (spec.edge === 'left') return { x: rect.left - box.left, y: rect.top - box.top + rect.height * spec.y };
  return { x: rect.left - box.left + rect.width * spec.x, y: rect.top - box.top }; // top
};

// S-curve: leaves horizontally, lands with a mostly vertical approach
const curve = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const c1 = { x: a.x + dx * 0.55, y: a.y };
  const c2 = { x: b.x, y: b.y - dy * 0.45 };
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

export const ProcessSection = () => {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const titleRef = useRef(null);
  const imgRefs = useRef([]);
  const pathRefs = useRef([]);

  const [paths, setPaths] = useState([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure the real image boxes so the lines always meet the cards exactly.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.innerWidth < 1024) {
      setPaths([]);
      return;
    }
    const box = wrap.getBoundingClientRect();
    const rects = imgRefs.current.map((el) => el && el.getBoundingClientRect());
    if (rects.some((r) => !r)) return;

    setSize({ w: box.width, h: box.height });
    setPaths(
      connectors.map((c, i) => curve(anchor(rects[i], box, c.from), anchor(rects[i + 1], box, c.to)))
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);

    // Measure images immediately if cached, or on load
    const imgs = imgRefs.current.filter(Boolean).map((el) => el.querySelector('img'));
    imgs.forEach((img) => {
      if (!img) return;
      if (img.complete) {
        measure();
      }
      img.addEventListener('load', measure);
    });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      imgs.forEach((img) => img && img.removeEventListener('load', measure));
    };
  }, [measure]);

  // Heading + step reveals (one-time)
  useEffect(() => {
    // Refresh calculations and safety timer for visibility
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => {
      gsap.set('[data-media], [data-title], [data-body]', { clearProps: 'opacity,transform' });
    }, 1200);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // Only clear what GSAP animates. 'all' would wipe the inline font size and gradient.
      gsap.set('[data-media], [data-title], [data-body]', { clearProps: 'opacity,transform' });
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: titleRef.current, start: 'top 90%', once: true },
      });

      gsap.utils.toArray('[data-step]').forEach((step) => {
        const media = step.querySelector('[data-media]');
        const title = step.querySelector('[data-title]');
        const body = step.querySelector('[data-body]');
        const fromLeft = step.dataset.side === 'left';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 88%',
            once: true,
          },
          onComplete: () => {
            gsap.set([media, title, body], { clearProps: 'opacity,transform' });
          },
        });

        tl.from(media, {
          opacity: 0,
          x: fromLeft ? -40 : 40,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        })
          .from(title, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' }, '-=0.5')
          .from(body, { opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' }, '-=0.4');
      });
    }, sectionRef);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ctx.revert();
    };
  }, []);

  // Draw each connector as the user scrolls between its two cards (rebuilt when paths change)
  useEffect(() => {
    if (!paths.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
        if (reduce) return;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: imgRefs.current[i],
            endTrigger: imgRefs.current[i + 1],
            start: 'center 70%',
            end: 'top 55%',
            scrub: 0.6,
          },
        });
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [paths]);

  return (
    <section id="process" ref={sectionRef} className="relative w-full overflow-hidden bg-[#E2E8F0] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1725px]">
        <div className="text-center mb-4">
        </div>

        {/* Size lives in classes (not inline style) so GSAP can never wipe it */}
        <h2
          ref={titleRef}
          className="mb-16 text-center font-heading font-semibold tracking-[-0.02em] lg:mb-[8vw] text-[clamp(44px,7.5vw,128px)] leading-[1.1]"
        >
          <span className="grad-text g-bkbl inline-block pb-2">From Idea to Impact</span>
        </h2>

        <div ref={wrapRef} className="relative flex flex-col gap-16 lg:gap-[7vw]">
          {/* Connector lines (desktop only) */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="processLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#0B1B3D" />
              </linearGradient>
            </defs>
            {paths.map((d, i) => (
              <path
                key={i}
                ref={(el) => (pathRefs.current[i] = el)}
                d={d}
                stroke="url(#processLine)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {steps.map((step, i) => {
            const imageLeft = step.side === 'left';
            return (
              <article
                key={step.id}
                data-step
                data-side={step.side}
                className={`relative z-10 flex flex-col items-start gap-8 lg:items-center lg:justify-between lg:gap-[4vw] ${
                  imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Media */}
                <div
                  data-media
                  ref={(el) => (imgRefs.current[i] = el)}
                  className="group relative w-full overflow-hidden lg:w-[44%] rounded-2xl shadow-xl hover:shadow-2xl border border-white/80 bg-white/60 backdrop-blur-md p-2.5 transition-all duration-500 hover:border-blue-400/50 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-900">
                    <span className="absolute top-3.5 left-3.5 z-20 font-mono text-[11px] font-bold text-white bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 tracking-wider shadow-lg">
                      {step.tag}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                      src={step.image}
                      alt={`${step.title} stage illustration`}
                      className="block h-full w-full object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Copy */}
                <div className="w-full lg:w-[45%]">
                  <h3
                    data-title
                    className="font-heading font-semibold tracking-[-0.02em]"
                    style={{
                      fontSize: 'clamp(44px, 5.6vw, 96px)',
                      lineHeight: 1.05,
                      background: step.gradient,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    data-body
                    className="mt-6 max-w-[540px] font-sans text-slate-800 lg:mt-[2vw] text-base sm:text-lg lg:text-xl leading-relaxed"
                  >
                    {step.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;