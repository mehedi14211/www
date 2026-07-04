import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, FileText, Video, Scissors, Rocket, ChevronRight, Check } from "lucide-react";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: <Compass className="h-5 w-5 text-indigo-600" />,
      title: "Strategizing",
      subtitle: "The Retention Blueprint",
      description: "We map out your content funnel, analyze your audience retention triggers, and identify key visual assets. We design a deliberate strategy to hook viewers instantly.",
      editingDirectives: "Analyzing niche competition, establishing tone, mapping hook structures.",
      deliverable: "Strategic Niche Alignment Document",
    },
    {
      number: "02",
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      title: "Scripting",
      subtitle: "The Narrative Structure",
      description: "We write highly engaging, word-for-word scripts matching your tone. The script incorporates exact post-production cues, b-roll descriptions, sound cues, and visual call-outs.",
      editingDirectives: "Writing verbal hooks, planning visual zoom points, designing caption placements.",
      deliverable: "Script Drafts with Teleprompter links",
    },
    {
      number: "03",
      icon: <Video className="h-5 w-5 text-indigo-600" />,
      title: "Client Films",
      subtitle: "Your 30-Minute Recording",
      description: "You receive the strategized, scripted document directly on your phone/tablet teleprompter. Take 30 minutes to record the footage. You film, and we do everything else.",
      editingDirectives: "Standard lighting layout tips, recording checks, raw file uploads.",
      deliverable: "Raw Video & Audio Camera Rolls",
    },
    {
      number: "04",
      icon: <Scissors className="h-5 w-5 text-indigo-600" />,
      title: "We Edit It",
      subtitle: "The Post-Production Magic",
      description: "Our world-class editors take your raw footage. We apply high-impact typography captions, map sound effect accents, drop in matched high-quality b-rolls, and color-grade to perfection.",
      editingDirectives: "Dynamic jump-cuts, custom sound design track, color grading, caption overlays.",
      deliverable: "Polished High-Retention Draft (V1)",
    },
    {
      number: "05",
      icon: <Rocket className="h-5 w-5 text-indigo-600" />,
      title: "We Launch It",
      subtitle: "Publishing & Distribution",
      description: "We apply up to five rounds of precise visual revisions to make sure it matches your brand perfectly. Once approved, you are ready to publish high-performing assets to your channels.",
      editingDirectives: "Final rendering checks, metadata exporting, sound track clears.",
      deliverable: "Production-ready 4K MP4 Assets & Titles",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-zinc-200 bg-[#F9FAFB] relative" id="process-section">
      <div className="max-w-6xl mx-auto space-y-16" id="process-section-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto" 
          id="process-header"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold">
            THE 5-STEP PIPELINE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            How MHF Studio Works
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            An optimized post-production machine. No friction, no tedious communications, just world-class assets delivered to your dashboard.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="process-layout-grid">
          
          {/* Left: Steps navigation menu */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-3" 
            id="process-nav"
          >
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-indigo-50/40 border-indigo-600 shadow-md shadow-indigo-100/10"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
                  id={`process-nav-btn-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold transition-colors ${isActive ? "text-indigo-600" : "text-zinc-400"}`}>
                      {step.number}
                    </span>
                    <div>
                      <h4 className={`font-display font-bold text-sm sm:text-base transition-colors ${isActive ? "text-indigo-950" : "text-zinc-800"}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{step.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? "text-indigo-600 translate-x-1" : "text-zinc-400 opacity-0 group-hover:opacity-100"}`} />
                </button>
              );
            })}
          </motion.div>

          {/* Right: Active step details display */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[440px] shadow-sm" 
            id="process-display"
          >
            {/* Background glowing line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-600 via-indigo-500 to-mhf-red" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
                id="active-process-details"
              >
                {/* Step Header */}
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold block">
                      PHASE {steps[activeStep].number}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-zinc-950 tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle & Description */}
                <div className="space-y-3">
                  <h4 className="text-zinc-700 font-sans text-xs font-semibold uppercase tracking-wider">
                    {steps[activeStep].subtitle}
                  </h4>
                  <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Directives Section */}
                <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4 text-xs space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold block mb-1">
                      STUDIO DIRECTIVE
                    </span>
                    <p className="text-zinc-700 font-light leading-relaxed">
                      {steps[activeStep].editingDirectives}
                    </p>
                  </div>
                  
                  <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      KEY DELIVERABLE
                    </span>
                    <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 font-mono text-[10px] text-indigo-600 flex items-center gap-1 font-semibold">
                      <Check className="h-3 w-3 text-indigo-600" /> {steps[activeStep].deliverable}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Summary Note */}
            <div className="text-[10px] font-mono text-zinc-400 border-t border-zinc-100 pt-4 mt-6">
              *All pipeline stages are synchronized directly inside your private Slack or Discord workflow.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
