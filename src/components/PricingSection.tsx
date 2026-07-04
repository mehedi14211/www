import React from "react";
import { motion } from "motion/react";
import { Check, Flame, MessageSquare, Shield, HelpCircle, ArrowRight, Layers, FileText, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onBookCall: () => void;
}

export default function PricingSection({ onBookCall }: PricingSectionProps) {
  const inclusions = [
    { title: "10 Custom Videos", desc: "Fully retentive, tailored for TikTok, Reels, or YouTube Long-form." },
    { title: "5 Rounds of Revisions", desc: "Fine-tune and perfect your cuts with our dedicated post-production board." },
    { title: "Step-by-Step Scripting", desc: "Word-for-word custom scripts delivered directly to your device teleprompter." },
    { title: "Retention Strategizing", desc: "Custom attention-grabbing hook concepts mapped before recording." },
    { title: "Signature Sound Design", desc: "Audio cue syncing, custom ambient background tracks, and clean levels." },
    { title: "Aesthetic Color Grading", desc: "Tailored cinematic color grading based on your chosen channel style." },
    { title: "Custom Caption Suite", desc: "High-retention captions with interactive styles, glowing titles, and custom fonts." },
    { title: "Slack / Discord Ingress", desc: "A private, dedicated channel directly connected to your project managers." },
  ];

  return (
    <section className="py-24 px-6 relative border-b border-zinc-200 bg-white" id="pricing-section">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16" id="pricing-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto" 
          id="pricing-header"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold inline-block">
            INVESTMENT & SCALE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            One simple, transparent rate
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light">
            No complex contracts, no hidden visual asset fees. Just a premium, dedicated studio pipeline delivering ready-to-launch assets to your channels.
          </p>
        </motion.div>

        {/* Pricing Layout: Main Signature Tier Bento Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 border border-zinc-200 rounded-3xl bg-[#F9FAFB] overflow-hidden relative shadow-sm" 
          id="pricing-bento-card"
        >
          
          {/* Badge: Best seller / Premium only */}
          <div className="absolute top-4 right-4 bg-indigo-600 border border-indigo-500 text-white font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md shadow-indigo-600/20">
            <Flame className="h-3 w-3" /> Signature Package
          </div>

          {/* Left: Plan Pricing details (40% width) */}
          <div className="md:col-span-5 p-8 md:p-10 bg-white border-r border-zinc-200 flex flex-col justify-between text-left" id="pricing-cost-panel">
            <div className="space-y-4">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold block">THE BLUEPRINT SERIES</span>
              <h3 className="font-display text-2xl font-extrabold text-zinc-950 tracking-tight">The MHF Studio Package</h3>
              <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">
                Ideal for scaling founders, brands, and content creators looking to consistently deploy high-retention cinematic assets.
              </p>
            </div>

            {/* Price details */}
            <div className="my-8 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl sm:text-6xl font-black text-zinc-950">$2,000</span>
                <span className="text-zinc-400 font-mono text-xs uppercase font-semibold">/ Flat Fee</span>
              </div>
              <p className="text-indigo-600 font-mono text-xs uppercase tracking-wider font-bold">
                10 videos • 5 rounds of revisions
              </p>
            </div>

            {/* Book strategy call trigger */}
            <button
              onClick={onBookCall}
              className="w-full bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] text-white font-bold py-2.5 px-5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 shadow-md shadow-indigo-600/10"
              id="pricing-book-btn"
            >
              Secure This Slot <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right: Plan Inclusions (60% width) */}
          <div className="md:col-span-7 p-8 md:p-10 space-y-6 text-left" id="pricing-inclusions-panel">
            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-200 pb-3 flex items-center justify-between">
              <span>WHAT IS INCLUDED:</span>
              <span className="text-zinc-500 text-[10px]">FULLY MANAGED</span>
            </h4>

            {/* Grid of inclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="pricing-inclusions-grid">
              {inclusions.map((inc, i) => (
                <div key={i} className="space-y-1 text-xs" id={`inclusion-item-${i}`}>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 self-center">
                      <Check className="h-2.5 w-2.5 text-indigo-600" />
                    </div>
                    <h5 className="font-extrabold text-zinc-950 leading-none">{inc.title}</h5>
                  </div>
                  <p className="text-zinc-500 font-light leading-relaxed pl-6">{inc.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick trust assurances */}
            <div className="border-t border-zinc-200 pt-4 text-[10px] font-mono text-zinc-400 flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-indigo-600" /> No long-term commitments • NDA-secured uploads • 10-day standard delivery turnaround.
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
