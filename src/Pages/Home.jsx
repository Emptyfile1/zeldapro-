import { useState, useEffect } from 'react';
import { Hero } from '../Homesections/Hero';
import { VisionSection } from '../Homesections/VisionSection';
import { ManifestoSection } from '../Homesections/ManifestoSection';
import { ServicesSection } from '../Homesections/ServicesSection';
import { TestimonialsSection } from '../Homesections/TestimonialsSection';
import { FaqSection } from '../Homesections/FaqSection';
import { FinalCtaSection } from '../Homesections/FinalCtaSection';
import { Footer } from '../Components/Footer';
import { ContactModal } from '../Homesections/ContactModal';

function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B1220] selection:bg-blue-600 selection:text-white">
      <main className="flex-1">
        <Hero onOpenContact={() => setContactOpen(true)} />
        <VisionSection />
        <ManifestoSection />
        <ServicesSection onOpenContact={() => setContactOpen(true)} />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection onOpenContact={() => setContactOpen(true)} />
      </main>

      <Footer />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default Home;