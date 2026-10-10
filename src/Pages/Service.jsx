import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../Components/Nav.jsx';
import { WebDevShowcase } from '../Servicesection/components/WebDevShowcase.jsx';
import { AppDevShowcase } from '../Servicesection/components/AppDevShowcase.jsx';
import { AiShowcase } from '../Servicesection/components/AiShowcase.jsx';
import { ConnectingLine } from '../Servicesection/components/ConnectingLine.jsx';
import { ServiceDetailModal } from '../Servicesection/components/ServiceDetailModal.jsx';
import { ContactModal } from '../Servicesection/components/ContactModal.jsx';
import { Footer } from '../Components/Footer.jsx';
import { servicesData } from '../Servicesection/data/servicesData.js';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { CtaBanner } from '../Servicesection/components/CtaBanner.jsx';

gsap.registerPlugin(ScrollTrigger);
const headingSize =
  'text-[length:clamp(2rem,11vw,6rem)] lg:text-[length:clamp(3rem,6.4vw,6rem)] break-words';
export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Web development');
  // Section Refs for GSAP
  const mainContainerRef = useRef(null);
  const webSectionRef = useRef(null);
  const appSectionRef = useRef(null);
  const aiSectionRef = useRef(null);

  // Titles and elements
  const webTitleRef = useRef(null);
  const webSubRef = useRef(null);
  const webListRef = useRef(null);
  const webCardRef = useRef(null);

  const appTitleRef = useRef(null);
  const appListRef = useRef(null);
  const appCardRef = useRef(null);

  const aiTitleRef = useRef(null);
  const aiSubRef = useRef(null);
  const aiListRef = useRef(null);
  const aiCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Web Development Animation Timeline
      if (webSectionRef.current) {
        const tlWeb = gsap.timeline({
          scrollTrigger: {
            trigger: webSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tlWeb
          .from(webTitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
          .from(
            webSubRef.current,
            {
              y: 25,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .from(
            webListRef.current?.children ? Array.from(webListRef.current.children) : [],
            {
              x: -40,
              opacity: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .from(
            webCardRef.current,
            {
              y: 60,
              opacity: 0,
              scale: 0.94,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.7'
          );
      }

      // 2. App Development Animation Timeline
      if (appSectionRef.current) {
        const tlApp = gsap.timeline({
          scrollTrigger: {
            trigger: appSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });

        tlApp
          .from(appCardRef.current, {
            x: -60,
            opacity: 0,
            scale: 0.94,
            duration: 1,
            ease: 'power3.out',
          })
          .from(
            appTitleRef.current,
            {
              y: 50,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.7'
          )
          .from(
            appListRef.current?.children ? Array.from(appListRef.current.children) : [],
            {
              x: 40,
              opacity: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.6'
          );
      }

      // 3. Artificial Intelligence Animation Timeline
      if (aiSectionRef.current) {
        const tlAi = gsap.timeline({
          scrollTrigger: {
            trigger: aiSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });

        tlAi
          .from(aiTitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
          .from(
            aiSubRef.current,
            {
              y: 25,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .from(
            aiListRef.current?.children ? Array.from(aiListRef.current.children) : [],
            {
              x: -40,
              opacity: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .from(
            aiCardRef.current,
            {
              x: 60,
              opacity: 0,
              scale: 0.94,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.7'
          );
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  const openServiceModal = (key) => {
    const service = servicesData[key];
    if (service) {
      setSelectedService(service);
    }
  };

  const openContactWithService = (serviceName) => {
    setPreselectedService(serviceName);
    setContactOpen(true);
  };

  return (
    <div ref={mainContainerRef} className="relative min-h-screen bg-white text-black font-sora selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}


      {/* Main Canvas Container (Matching Figma width baseline: 1725px) */}
      <main className="relative max-w-[1725px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-24 overflow-hidden">
        {/* Dynamic Curved Connection Line linking the sections */}
        <ConnectingLine />

        {/* =========================================================
            SECTION 1: WEB DEVELOPMENT
        ========================================================= */}
        <section
          id="section-web"
          ref={webSectionRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[750px] mb-24 lg:mb-40"
        >
          {/* Left Column: Typography & Services */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2
              ref={webTitleRef}
              className={`${headingSize} font-sora font-semibold tracking-tight text-gradient-blue leading-[1.08] mb-4 text-balance`}
            >
              Web development
            </h2>

            <p
              ref={webSubRef}
              className="font-sora font-normal text-lg sm:text-2xl text-black leading-relaxed tracking-normal mb-8 lg:mb-12"
            >
              Enterprise Web Development | Scalable Web Architecture
            </p>

            <ul ref={webListRef} className="space-y-4 sm:space-y-6">
              {[
                'Custom Full-Stack Development',
                'High-Performance Landing Pages & Corporate Sites',
                'E-Commerce & CMS Platform Integration',
                'Secure Backend API Architecture',
              ].map((item, index) => (
                <li
                  key={index}
                  
                  className="group flex items-center gap-4 cursor-pointer text-base sm:text-xl lg:text-[24px] font-sora font-normal text-black hover:text-blue-700 transition-colors py-1.5"
                >
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black group-hover:bg-blue-600 transition-colors shrink-0 rounded-xs" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity ml-1" />
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4">
              <button
                
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-700 hover:text-blue-900 group cursor-pointer"
              >
                <span>Explore Full-Stack Architecture & Benchmarks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Rectangle 91 Showcase */}
          <div ref={webCardRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <WebDevShowcase  />
          </div>
        </section>

        {/* =========================================================
            SECTION 2: APP DEVELOPMENT
        ========================================================= */}
        <section
          id="section-app"
          ref={appSectionRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[750px] mb-24 lg:mb-40"
        >
          {/* Left Column: Rectangle 92 Showcase */}
          <div ref={appCardRef} className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
            <AppDevShowcase />
          </div>

          {/* Right Column: Typography & Services */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center lg:pl-8">
            <h2
              ref={appTitleRef}
              className={`${headingSize} font-sora font-semibold tracking-tight text-gradient-blue leading-[1.08] mb-6 sm:mb-8 text-balance`}
            >
              App development
            </h2>

            <ul ref={appListRef} className="space-y-4 sm:space-y-6">
              {[
                'iOS & Android Native Application Builds',
                'Cross-Platform Solutions (React Native/Flutter)',
                'Interactive UI/UX App Prototyping',
                'Post-Launch Maintenance & Scaling',
              ].map((item, index) => (
                <li
                  key={index}
                  
                  className="group flex items-center gap-4 cursor-pointer text-base sm:text-xl lg:text-[24px] font-sora font-normal text-black hover:text-blue-700 transition-colors py-1.5"
                >
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black group-hover:bg-blue-600 transition-colors shrink-0 rounded-xs" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity ml-1" />
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4">
              <button
                
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-700 hover:text-blue-900 group cursor-pointer"
              >
                <span>View Mobile Tech Specifications & Case Studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: ARTIFICIAL INTELLIGENCE
        ========================================================= */}
        <section
          id="section-ai"
          ref={aiSectionRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[750px] mb-20 lg:mb-32"
        >
          {/* Left Column: Typography & Services */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2
              ref={aiTitleRef}
              className={`${headingSize} font-sora font-semibold tracking-tight text-gradient-blue leading-[1.08] mb-4 text-balance`}
            >
              Artificial Intelligence
            </h2>

            <p
              ref={aiSubRef}
              className="font-sora font-normal text-lg sm:text-2xl text-black leading-relaxed tracking-normal mb-8 lg:mb-12"
            >
              AI & Machine Learning Solutions | Intelligent Automation
            </p>

            <ul ref={aiListRef} className="space-y-4 sm:space-y-6">
              {[
                'Custom AI Workflow Automation',
                'Predictive Analytics & Data Modeling',
                'Smart Chatbots & Natural Language Processing (NLP)',
                'Machine Learning Model Integration',
              ].map((item, index) => (
                <li
                  key={index}
                  
                  className="group flex items-center gap-4 cursor-pointer text-base sm:text-xl lg:text-[24px] font-sora font-normal text-black hover:text-blue-700 transition-colors py-1.5"
                >
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black group-hover:bg-blue-600 transition-colors shrink-0 rounded-xs" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity ml-1" />
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4">
              <button
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-700 hover:text-blue-900 group cursor-pointer"
              >
                <span>Explore AI Autonomous Pipeline Architecture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Rectangle 93 Showcase */}
          <div ref={aiCardRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <AiShowcase  />
          </div>
        </section>

        {/* High-Intent Strategic Engagement Block */}
        
      </main>
<CtaBanner
                  onStartProject={() => handleOpenConnect('New Project Scoping')}
        />
      {/* Global Footer */}
      <Footer onContactClick={() => setContactOpen(true)} />

      {/* Technical Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={(serviceTitle) => {
          setSelectedService(null);
          openContactWithService(serviceTitle);
        }}
      />

      {/* Consultation Inquiry Modal */}
            <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
