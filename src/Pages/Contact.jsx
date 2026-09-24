import React, { useState } from 'react';
import {Navbar } from '../Components/Nav.jsx';
import { HypercubeVisual } from '../contactsection/components/HypercubeVisual.jsx';
import { ContactForm } from '../contactsection/components/ContactForm.jsx';
import { Footer } from '../Components/Footer.jsx';
import { NavModals } from '../contactsection/components/NavModals.jsx';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('Contact');
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    payload: undefined,
  });

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'Contact') {
      const formEl = document.getElementById('contact-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'About') {
      setModalState({ isOpen: true, type: 'about' });
    } else if (tab === 'Services') {
      setModalState({ isOpen: true, type: 'services' });
    } else if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenFooterModal = (modalType, payload) => {
    setModalState({ isOpen: true, type: modalType, payload });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, payload: undefined });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background subtle starry grid effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] z-0" />

      {/* Top Header Navigation */}
      

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-[1725px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-8 pb-16 lg:pb-24">
        <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column: 3D Luminous Hypercube Lattice with Connected IoT and Autonomous Vehicle */}
          <div className="lg:col-span-6 xl:col-span-6 w-full h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[780px] flex items-center justify-center relative">
            <HypercubeVisual />
          </div>

          {/* Right Column: "Get in Touch" + Glassmorphic Contact Card */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* Footer Section matching Figma specs */}
      <Footer onOpenModal={handleOpenFooterModal} />

      {/* Interactive Modal Dialogs for All Links */}
      <NavModals
        type={modalState.isOpen ? modalState.type : null}
        payload={modalState.payload}
        onClose={handleCloseModal}
        onNavigateToContact={scrollToContact}
      />
    </div>
  );
}
