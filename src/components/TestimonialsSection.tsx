import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Quote, Star, ArrowUpRight, ShieldCheck, Flame } from "lucide-react";
import { Testimonial } from "../types";

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: "test-1",
      name: "Darian Bradley",
      role: "SaaS Founder & Creator",
      handle: "@dariantech",
      avatar: "https://picsum.photos/seed/darian/100/100",
      quote: "Before MHF, I spent all my weekends in Premiere cutting clips. Now, I spend exactly 30 minutes on Sunday filming on their scripted documents, upload the raw file, and get 10 perfect videos back. My MRR grew by 40% purely from the organic traffic.",
      stats: "+240K Subscribers",
    },
    {
      id: "test-2",
      name: "Marcus Vance",
      role: "Finance Creator",
      handle: "@marcusfinance",
      avatar: "https://picsum.photos/seed/marcus/100/100",
      quote: "The hook design is a complete cheat code. They deliver 3 variations for every script with specific zoom guidelines. My average retention went from 22% to 58% in our very first week. Absolutely unmatched editing quality.",
      stats: "4.2M Monthly Views",
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      role: "Lifestyle & Travel Brand",
      handle: "@elena.kyoto",
      avatar: "https://picsum.photos/seed/elena/100/100",
      quote: "The teleprompter synchronization made recording so effortless. I don't have to think about what to say, and the color grading they applied on our Kyoto vlog reels looks completely cinema-grade. MHF is a core team asset now.",
      stats: "+1.8M Reels Views",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-zinc-200 bg-[#F9FAFB]" id="testimonials-section">
      <div className="max-w-6xl mx-auto space-y-16" id="testimonials-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto" 
          id="testimonials-header"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold inline-block">
            CREATOR SUCCESS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Loved by leading creators
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            We don't just edit; we engineer retention, pacing, and brand authority. See what founders and digital creators say about the MHF Studio experience.
          </p>
        </motion.div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="bg-white border border-zinc-200 hover:border-indigo-600 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 hover:translate-y-[-4px] shadow-sm hover:shadow-md"
              id={`testimonial-card-${test.id}`}
            >
              {/* Top Quote Decoration */}
              <div className="absolute top-6 right-6 text-zinc-100">
                <Quote className="h-10 w-10 fill-current" />
              </div>

              {/* Quote Content */}
              <div className="space-y-4 text-left">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm md:text-base font-light leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              {/* User Bio and Stats Card */}
              <div className="flex items-center justify-between gap-3 pt-6 border-t border-zinc-100 mt-6" id={`testimonial-bio-${test.id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="h-10 w-10 rounded-full object-cover border border-zinc-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <h4 className="font-display font-bold text-sm text-zinc-950">{test.name}</h4>
                    <p className="text-[11px] text-zinc-400 font-mono">{test.handle}</p>
                  </div>
                </div>

                {/* Viral Stat Banner */}
                <div className="bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg font-mono text-[10px] text-indigo-600 flex items-center gap-1 font-bold">
                  <Flame className="h-3 w-3 text-indigo-600" /> {test.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security / Quality Check Banner */}
        <div className="border border-zinc-200 bg-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-left max-w-4xl mx-auto shadow-sm" id="quality-assurance-banner">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" /> MHF Studio Quality Shield
            </div>
            <h4 className="font-display text-lg sm:text-xl font-extrabold text-zinc-950 tracking-tight">
              A premium, NDA-secured post-production workflow
            </h4>
            <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">
              Every scrap of footage, strategic hook blueprint, and script draft is fully private and managed on local encrypted storage. Your content belongs solely to you.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 bg-zinc-50 px-3.5 py-1.5 rounded-lg border border-zinc-200 whitespace-nowrap self-start sm:self-auto font-medium">
            100% Confidential
          </div>
        </div>

      </div>
    </section>
  );
}
