import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, FileText, Video, Scissors, Rocket, Check, ArrowRight } from "lucide-react";

interface ProcessSectionProps {
  theme?: "light" | "midnight";
}

export default function ProcessSection({ theme = "light" }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(3); // Default to Phase 4 (We Edit, index 3) as shown in user's original inspiration image
  const isMidnight = theme === "midnight";

  const steps = [
    {
      number: "01",
      title: "Strategize",
      titleDisplay: "Strategize",
      subtitle: "The Retention Blueprint",
      description: "We map out your content funnel, analyze your audience retention triggers, and identify key visual assets. We design a deliberate strategy to hook viewers instantly.",
      editingDirectives: "Analyzing niche competition, establishing tone, mapping hook structures.",
      deliverable: "Strategic Niche Alignment Document",
      color: "#E10600", // Red
      glowClass: "shadow-[0_0_25px_rgba(225,6,0,0.25)]",
      glowHoverClass: "group-hover:shadow-[0_0_30px_rgba(225,6,0,0.35)]",
      iconColorLight: "text-[#E10600]",
      iconColorDark: "text-red-500",
    },
    {
      number: "02",
      title: "Scripting",
      titleDisplay: "Scripting",
      subtitle: "The Narrative Structure",
      description: "We write highly engaging, word-for-word scripts matching your tone. The script incorporates exact post-production cues, b-roll descriptions, sound cues, and visual call-outs.",
      editingDirectives: "Writing verbal hooks, planning visual zoom points, designing caption placements.",
      deliverable: "Script Drafts with Teleprompter links",
      color: "#E10600", // Red
      glowClass: "shadow-[0_0_25px_rgba(225,6,0,0.25)]",
      glowHoverClass: "group-hover:shadow-[0_0_30px_rgba(225,6,0,0.35)]",
      iconColorLight: "text-[#E10600]",
      iconColorDark: "text-red-500",
    },
    {
      number: "03",
      title: "You Film",
      titleDisplay: "You Film",
      subtitle: "Your 30-Minute Recording",
      description: "You receive the strategized, scripted document directly on your phone/tablet teleprompter. Take 30 minutes to record the footage. You film, and we do everything else.",
      editingDirectives: "Standard lighting layout tips, recording checks, raw file uploads.",
      deliverable: "Raw Video & Audio Camera Rolls",
      color: "#3B82F6", // Blue
      glowClass: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
      glowHoverClass: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
      iconColorLight: "text-blue-600",
      iconColorDark: "text-blue-400",
    },
    {
      number: "04",
      title: "We Edit",
      titleDisplay: "We Edit",
      subtitle: "The Post-Production Magic",
      description: "Our world-class editors take your raw footage. We apply high-impact typography captions, map sound effect accents, drop in matched high-quality b-rolls, and color-grade to perfection.",
      editingDirectives: "Dynamic jump-cuts, custom sound design track, color grading, caption overlays.",
      deliverable: "Polished High-Retention Draft (V1)",
      color: "#F97316", // Orange
      glowClass: "shadow-[0_0_25px_rgba(249,115,22,0.3)]",
      glowHoverClass: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
      iconColorLight: "text-orange-500",
      iconColorDark: "text-orange-400",
    },
    {
      number: "05",
      title: "Launch",
      titleDisplay: "Launch",
      subtitle: "Publishing & Distribution",
      description: "We apply up to five rounds of precise visual revisions to make sure it matches your brand perfectly. Once approved, you are ready to publish high-performing assets to your channels.",
      editingDirectives: "Final rendering checks, metadata exporting, sound track clears.",
      deliverable: "Production-ready 4K MP4 Assets & Titles",
      color: "#10B981", // Aesthetic Green
      glowClass: "shadow-[0_0_25px_rgba(16,185,129,0.25)]",
      glowHoverClass: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
      iconColorLight: "text-emerald-600",
      iconColorDark: "text-emerald-400",
    }
  ];

  const getIcon = (index: number, isActive: boolean) => {
    const sizeClass = "h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] md:h-[24px] md:w-[24px] transition-transform duration-300";
    const baseColor = isMidnight 
      ? steps[index].iconColorDark 
      : steps[index].iconColorLight;
    
    const colorClass = isActive 
      ? `${baseColor} scale-105` 
      : `text-zinc-450 dark:text-zinc-500 opacity-60 group-hover:opacity-100 transition-opacity`;

    switch (index) {
      case 0:
        return <Compass className={`${sizeClass} ${colorClass}`} />;
      case 1:
        return <FileText className={`${sizeClass} ${colorClass}`} />;
      case 2:
        return <Video className={`${sizeClass} ${colorClass}`} />;
      case 3:
        return <Scissors className={`${sizeClass} ${colorClass}`} />;
      case 4:
        return <Rocket className={`${sizeClass} ${colorClass}`} />;
      default:
        return <Compass className={`${sizeClass} ${colorClass}`} />;
    }
  };

  return (
    <section 
      className={`py-20 px-4 sm:px-6 border-b transition-colors duration-500 relative overflow-hidden ${
        isMidnight ? "bg-[#030303] border-[#1F1F24]" : "bg-[#FAFBFD] border-zinc-100"
      }`} 
      id="process-section"
    >
      {/* Subtle SaaS Grid & Radial Background Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      {isMidnight ? (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-red-500/[0.03] blur-[120px] pointer-events-none" />
      ) : (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.01] blur-[120px] pointer-events-none" />
      )}

      <div className="max-w-5xl mx-auto space-y-16 relative z-10" id="process-section-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-2xl mx-auto" 
          id="process-header"
        >
          <span className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold border ${
            isMidnight 
              ? "text-red-400 bg-red-950/20 border-red-900/40" 
              : "text-red-600 bg-red-50 border-red-200/60"
          }`}>
            THE MHFS WORKFLOW
          </span>
          <h2 className={`font-display text-3xl sm:text-[42px] font-extrabold tracking-tight leading-tight ${
            isMidnight ? "text-white" : "text-zinc-900"
          }`}>
            Our 5-Step Pipeline
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto ${
            isMidnight ? "text-zinc-400" : "text-zinc-500"
          }`}>
            An incredibly refined post-production system. Hover over any stage below to explore our signature workflow.
          </p>
        </motion.div>

        {/* 3D Glassmorphic Circle row */}
        <div className="relative py-4 select-none" id="circular-process-tracker">
          
          {/* Faint premium connector line running through circles */}
          <div className={`absolute top-[40%] sm:top-[43%] md:top-[44%] left-[10%] right-[10%] h-[1px] z-0 opacity-40 ${
            isMidnight ? "bg-gradient-to-r from-transparent via-zinc-800 to-transparent" : "bg-gradient-to-r from-transparent via-zinc-200 to-transparent"
          }`} />

          {/* Steps Circle Grid Container */}
          <div className="flex justify-between items-start relative z-10 max-w-4xl mx-auto" id="steps-circles-container">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const dotBg = step.color;

              return (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center text-center cursor-pointer group focus:outline-none w-[18%]"
                  id={`circle-step-${index}`}
                >
                  {/* Step Number */}
                  <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-2 transition-all duration-350 ${
                    isActive 
                      ? "text-zinc-950 dark:text-zinc-50 font-extrabold scale-105" 
                      : isMidnight 
                        ? "text-zinc-500 group-hover:text-zinc-300" 
                        : "text-zinc-600 group-hover:text-zinc-950"
                  }`}>
                    {step.number}
                  </span>

                  {/* Tactile Button container with assigned color glow on hover & active */}
                  <div className="relative" id={`circle-wrapper-${index}`}>
                    
                    {/* Tiny premium dot positioned perfectly on top of the circle */}
                    <div 
                      className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full z-20 shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-125"
                      style={{ 
                        backgroundColor: dotBg,
                        boxShadow: isActive ? `0 0 10px ${step.color}` : "none"
                      }}
                    />

                    {/* Gaussian Blur Glow assigned to its exact color */}
                    <div 
                      className={`absolute inset-0 rounded-full blur-[16px] pointer-events-none -z-10 transition-all duration-300 ${
                        isActive ? "opacity-100 scale-125" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-110"
                      }`}
                      style={{
                        background: `radial-gradient(circle, ${step.color}45 0%, transparent 70%)`
                      }}
                    />

                    {/* Perfectly-sized, premium Gaussian-blur tactile circle */}
                    <div
                      className={`w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center border backdrop-blur-[12px] transition-all duration-300 ease-out ${
                        isActive
                          ? isMidnight
                            ? "bg-zinc-900/95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]"
                            : "bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)]"
                          : isMidnight
                            ? "bg-[#0C0C0F]/55 border-[#1F1F24] hover:bg-[#121217] hover:border-zinc-800"
                            : "bg-white/70 border-zinc-100 hover:bg-white hover:border-zinc-200"
                      }`}
                      style={{
                        borderColor: isActive ? step.color : undefined,
                        boxShadow: isActive ? `0 0 20px ${step.color}25` : undefined
                      }}
                    >
                      {getIcon(index, isActive)}
                    </div>
                  </div>

                  {/* Step Title below circle */}
                  <div className="mt-3 sm:mt-4 min-h-[36px] flex flex-col justify-start">
                    <span className={`text-[10px] sm:text-[11px] md:text-[13px] font-sans font-bold leading-tight transition-colors duration-300 whitespace-pre-line tracking-tight ${
                      isActive
                        ? isMidnight ? "text-white font-extrabold" : "text-zinc-900 font-extrabold"
                        : isMidnight ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-700"
                    }`}>
                      {step.titleDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Details Glassmorphic Panel */}
        <div className="max-w-3xl mx-auto" id="process-expansion-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`border rounded-[24px] p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isMidnight 
                  ? "bg-[#0C0C0F]/80 border-[#1F1F24] text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                  : "bg-white/95 border-zinc-200/60 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
              }`}
              id="active-process-expansion-card"
            >
              {/* Premium color strip matching active color */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2.5px] transition-colors duration-500" 
                style={{ backgroundColor: steps[activeStep].color }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start" id="expansion-card-content">
                
                {/* Left Column: Descriptive Summary */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <span 
                      className="font-mono text-[9px] border px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
                      style={{ 
                        color: steps[activeStep].color,
                        borderColor: `${steps[activeStep].color}35`,
                        backgroundColor: `${steps[activeStep].color}0e`
                      }}
                    >
                      Phase {steps[activeStep].number}
                    </span>
                    <h3 className="font-display text-lg sm:text-[22px] font-extrabold tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                  </div>

                  <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest font-semibold transition-colors duration-300"
                     style={{ color: steps[activeStep].color }}>
                    {steps[activeStep].subtitle}
                  </p>

                  <p className={`text-xs sm:text-[14px] font-light leading-relaxed ${
                    isMidnight ? "text-zinc-300" : "text-zinc-500"
                  }`}>
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Right Column: Studio Directives & Deliverables */}
                <div className="md:col-span-5 space-y-4 text-left h-full flex flex-col justify-between">
                  <div className={`rounded-2xl p-4 border transition-colors duration-300 ${
                    isMidnight ? "bg-[#030303]/40 border-[#1F1F24]/60" : "bg-zinc-50/70 border-zinc-200/50"
                  }`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block mb-1 ${
                      isMidnight ? "text-zinc-500" : "text-zinc-400"
                    }`}>
                      Studio Directive
                    </span>
                    <p className={`text-xs font-light leading-relaxed ${
                      isMidnight ? "text-zinc-300" : "text-zinc-700"
                    }`}>
                      {steps[activeStep].editingDirectives}
                    </p>
                  </div>

                  <div className={`rounded-2xl p-4 border transition-colors duration-300 ${
                    isMidnight ? "bg-indigo-950/10 border-indigo-900/30" : "bg-indigo-50/20 border-indigo-100/60"
                  }`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block mb-1 ${
                      isMidnight ? "text-indigo-400" : "text-indigo-600"
                    }`}>
                      Key Deliverable
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-emerald-500" />
                      </div>
                      <span className={`text-xs font-bold font-sans ${
                        isMidnight ? "text-zinc-200" : "text-zinc-850"
                      }`}>
                        {steps[activeStep].deliverable}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footnote */}
              <div className={`mt-6 pt-4 border-t text-[10px] font-mono flex items-center justify-between ${
                isMidnight ? "border-[#1F1F24]/80 text-zinc-500" : "border-zinc-100 text-zinc-400"
              }`}>
                <span>* Synchronized directly inside your private workflow dashboard.</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-red-500 font-semibold hover:underline cursor-pointer">
                  See pricing <ArrowRight className="h-3 w-3" />
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
