import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = () => {
  const faqs = [
    {
      id: 'faq-1',
      question:
        'How does Zeldapro guarantee enterprise data privacy and sovereign AI deployment?',
      answer:
        'At Zeldapro Consultancy, we bridge the gap between visionary concepts and intelligent digital realities. By merging robust web and mobile engineering with next-generation AI solutions, we empower modern enterprises to scale seamlessly, automate complex workflows, and lead in a rapidly evolving technological landscape.',
    },
    {
      id: 'faq-2',
      question: 'What does a typical engagement with Zeldapro look like?',
      answer:
        'We start with a discovery sprint to map the problem and constraints, then move into a phased build with weekly demos. Most engagements run 8–16 weeks from kickoff to production, with a dedicated pod staying on for post-launch support.',
    },
    {
      id: 'faq-3',
      question: 'Can Zeldapro work alongside our in-house engineering team?',
      answer:
        'Yes — most of our engagements are embedded, working inside your existing repos, ticketing, and review process rather than as a separate silo. We adapt to your tooling, not the other way around.',
    },
    {
      id: 'faq-4',
      question: 'What technologies and frameworks does your engineering pod specialize in?',
      answer:
        'Our core stacks span React, JavaScript/TypeScript, Next.js, Node.js, Python, Kotlin, and Swift on the frontend and application layer, backed by distributed cloud infrastructure across Google Cloud and AWS, alongside custom ML/LLM pipelines.',
    },
  ];

  // First item open by default
  const [openItems, setOpenItems] = useState({
    'faq-1': true,
  });

  const toggleFaq = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white text-[#0B1220] transition-colors">
      <div className="max-w-310 mx-auto px-6 sm:px-10 text-center">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#0B1B3D]">
          FAQ
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-[#475569] max-w-md mx-auto">
          Everything You Need to Know.
        </p>

        <div className="max-w-3xl mx-auto mt-12 flex flex-col gap-4 text-left">
          {faqs.map((faq) => {
            const isOpen = Boolean(openItems[faq.id]);
            return (
              <div
                key={faq.id}
                className="bg-[#1D4ED8] rounded-xl overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center gap-5 p-5 sm:p-6 text-white font-medium text-base sm:text-lg text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-white/90 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-white/90 text-sm sm:text-[15px] leading-relaxed border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
