import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer personalized 1-on-1 coaching?",
    answer: "Yes, I offer dedicated 1-on-1 mentorship programs tailored to your specific career goals, whether you are looking to master full-stack development, understand AI automation, or scale your freelance business."
  },
  {
    question: "How long are the training programs?",
    answer: "Our standard cohort runs for 8 weeks, featuring live weekend sessions, practical assignments, and ongoing Discord support. Custom enterprise training durations vary based on team requirements."
  },
  {
    question: "What prerequisites are needed for your courses?",
    answer: "For beginner courses, no prior coding experience is required. For advanced architectural and AI integration bootcamps, a fundamental understanding of JavaScript/TypeScript and React is highly recommended."
  },
  {
    question: "Do you provide certificates upon completion?",
    answer: "Absolutely. Every participant who completes the final capstone project receives a verified digital certificate of completion, which can be directly added to your LinkedIn profile."
  },
  {
    question: "Is there support available after the training ends?",
    answer: "Yes, alumni get lifetime access to our private community network, where you can ask questions, collaborate on projects, and receive continuous updates on new technologies."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#020008] border-t border-b border-purple-500/10 z-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 z-10 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 rounded-full backdrop-blur-sm">
            <MessageCircleQuestion className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-purple-300 uppercase">Queries & Support</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Asked</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Clear answers about my training, development timelines, and mentorship availability.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-purple-500/10 rounded-2xl bg-white/[0.01] backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'ring-1 ring-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'hover:border-purple-500/20'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold text-gray-200 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                  openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="h-px w-full bg-gradient-to-r from-purple-500/20 to-transparent mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
