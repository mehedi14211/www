import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How does the video submission process work?",
      answer: "You simply upload your raw footage to our secure portal or share a cloud storage link. We pull the files, process them through our retention-engineering pipeline, and deliver the final polished files directly to your dashboard.",
    },
    {
      question: "What is the typical turnaround time for a video?",
      answer: "Our standard turnaround time is 48 to 72 hours for high-retention short-form videos (9:16) and 4 to 6 days for detailed long-form cinematic guides (16:9). Expedited options are available inside our premium partner tiers.",
    },
    {
      question: "What video formats and platforms do you optimize for?",
      answer: "We optimize for all major modern platforms: YouTube (Long-form and Shorts), Instagram Reels, TikTok, LinkedIn, and Twitter/X. All deliverables are formatted in industry-standard high-quality ProRes or H.264 formats.",
    },
    {
      question: "How do revisions work if I need changes?",
      answer: "We provide structured 2-day revision loops. Every client gets a dedicated Slack or Discord channel. You can comment directly on video frames using Frame.io, and our engineers implement changes within 12-24 hours.",
    },
    {
      question: "Can I change or cancel my plan at any time?",
      answer: "Yes, absolutely. We operate on a rolling 30-day subscription model. You can upgrade, downgrade, or pause your active production pipeline at any point before your next billing cycle with no cancellation fees.",
    },
    {
      question: "Do you provide custom sound design and motion graphics?",
      answer: "Yes, custom SFX curation (whips, pops, risers, ambient layers), subtitle/caption rendering (with customized glowing and outline presets), and dynamic zooms are standard in every project we touch.",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-zinc-200 bg-white" id="faq-section">
      <div className="max-w-4xl mx-auto space-y-16" id="faq-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto" 
          id="faq-header"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold inline-block">
            COMMON INQUIRIES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            Everything you need to know about partnering with MHF Studio to engineer retention and scale your channels.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className={`border rounded-2xl transition-all ${
                  isOpen 
                    ? "border-indigo-600 bg-zinc-50 shadow-sm" 
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                }`}
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-zinc-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg border transition-all ${
                    isOpen 
                      ? "bg-indigo-600 border-indigo-600 text-white rotate-180" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-900"
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-content-${index}`}
                    >
                      <div className="p-5 md:p-6 pt-0 border-t border-zinc-200/50 text-sm text-zinc-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact/CTA footer block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          id="faq-cta-block"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm sm:text-base text-zinc-900">Have a custom requirement?</p>
              <p className="text-xs text-zinc-500 font-light">Let's hop on a call and build a specialized blueprint for you.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById("pricing-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span>View Packages</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
