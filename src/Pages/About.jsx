import React, { useState } from 'react';
import { Navbar } from '../Components/Nav.jsx';
import { HeroSection } from '../Aboutsection/components/HeroSection.jsx';
import { WhoWeAreSection } from '../Aboutsection/components/WhoWeAreSection.jsx';
import { TeamTreeSection } from '../Aboutsection/components/TeamTreeSection.jsx';
import { WhyTrustUsSection } from '../Aboutsection/components/WhyTrustUsSection.jsx';
import { CtaBanner } from '../Aboutsection/components/CtaBanner.jsx';
import { Footer } from '../Components/Footer';
import { WorkModal, ConnectModal } from '../Aboutsection/components/Modals.jsx';

export default function App() {
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectSubject, setConnectSubject] = useState('');

  const handleOpenConnect = (subject = '') => {
    setConnectSubject(subject);
    setIsConnectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black font-['Manrope'] selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Navigation Bar */}
      

      {/* Main Page Sections matching the Figma layout & visual spec */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section (Rectangle 87: #E2E8F0, Sora 96px headline, CTA buttons) */}
        <HeroSection
          onSeeWork={() => setIsWorkModalOpen(true)}
          onConnect={() => handleOpenConnect('Engineering Partnership')}
        />

        {/* 2. "Who we are" Section (Two rows of Sora 64px text + Holographic & AI Platform Visuals) */}
        <WhoWeAreSection />

        {/* 3. "The People Behind The Screen" Section (Hierarchical Team Tree with animated curved SVG lines) */}
        <TeamTreeSection />

        {/* 4. "Why Trust us?" Section (Rectangle 90: #E2E8F0, Gradient title, 3 Staggered Stat Cards with GSAP counters) */}
        <WhyTrustUsSection />

        {/* 5. "Your vision. Our engineering." Banner (Group 34: #E2E8F0, Plexus mesh canvas, Start Project CTA) */}
        <CtaBanner
          onStartProject={() => handleOpenConnect('New Project Scoping')}
        />
      </main>

      {/* 6. Technical Minimalist Dark Footer (JetBrains Mono, Disciplines, Live Telemetry, Mumbai HQ) */}
      <Footer
        onOpenConnect={() => handleOpenConnect('Monograph Archive')}
        onOpenArchive={() => setIsWorkModalOpen(true)}
      />

      {/* Interactive Modals */}
      <WorkModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        onSelectProjectForInquiry={(project) => handleOpenConnect(`Inquiry regarding ${project}`)}
      />

      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        defaultSubject={connectSubject}
      />
    </div>
  );
}
