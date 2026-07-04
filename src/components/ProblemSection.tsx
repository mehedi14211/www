import React from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Zap, Clock, ShieldAlert, Sparkles, Smile, MessageSquare } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: <ShieldAlert className="h-5 w-5 text-mhf-red" />,
      title: "The First 3 Seconds",
      description: "90% of creators lose viewers instantly due to generic hooks and slow pacing. Every single frame counts.",
    },
    {
      icon: <Clock className="h-5 w-5 text-mhf-red" />,
      title: "The Editing Time-Sink",
      description: "Founders spend 15+ hours per video scripting, cutting, sound designing, and grading. Time stolen from building.",
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-mhf-red" />,
      title: "Post-Production Fatigue",
      description: "Struggling with mismatched b-rolls, choosing high-converting captions, and syncing audio effects accurately.",
    },
  ];

  const solutions = [
    {
      icon: <Zap className="h-5 w-5 text-emerald-600" />,
      title: "Our Strategized Hooks",
      description: "We analyze high-retention patterns, drafting 3 unique hooks with custom visuals and sound cue notes before you press record.",
    },
    {
      icon: <Smile className="h-5 w-5 text-emerald-600" />,
      title: "Record in 30 Minutes",
      description: "We deliver full custom teleprompter scripts and storyboard concepts. You record, upload raw files, and you're done.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
      title: "The MHF One-Stop Studio",
      description: "We handle sound design, visual overlays, sound effect cues, graphics, and full color grading to render polished files ready for launch.",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-zinc-200 relative bg-[#F9FAFB]" id="problem-section">
      <div className="max-w-6xl mx-auto space-y-16" id="problem-section-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto" 
          id="problem-header"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold">
            THE PRODUCTION BOTTLENECK
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Traditional video editing is a full-time bottleneck. We solved it.
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            Editing isn't just cutting clips; it's retention engineering. See how MHF Studio shifts your focus from tedious timelines back to core high-level scaling.
          </p>
        </motion.div>

        {/* Comparison Grid (Apple Style Split Board) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch" id="problem-split-grid">
          
          {/* Column A: Bottlenecks (Red Accent) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow" 
            id="bottleneck-panel"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-mhf-red uppercase tracking-widest font-bold block">THE OBSTACLES</span>
              <h3 className="font-display text-2xl font-bold text-zinc-950 tracking-tight">The Traditional Creation Struggle</h3>
              <p className="text-zinc-500 text-xs sm:text-sm font-light">What most creators face trying to handle pre-production and editing simultaneously.</p>
            </div>

            <div className="space-y-6 my-6">
              {problems.map((problem, i) => (
                <div key={i} className="flex gap-4 items-start" id={`problem-item-${i}`}>
                  <div className="bg-red-50 border border-red-100/80 p-2.5 rounded-xl self-start">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="text-zinc-900 font-bold text-sm sm:text-base mb-1">{problem.title}</h4>
                    <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs font-mono text-zinc-500 border-t border-zinc-100 pt-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-mhf-red" /> Unpredictable results, high burnout, slow organic growth.
            </div>
          </motion.div>

          {/* Column B: MHF Studio Solution (Emerald/Indigo Accent) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border border-indigo-200 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-md shadow-indigo-100/10 hover:shadow-lg hover:shadow-indigo-100/15 transition-shadow" 
            id="solution-panel"
          >
            {/* Subtle glow behind the solution block */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-indigo-600 uppercase tracking-widest font-bold block">THE SYSTEM</span>
              <h3 className="font-display text-2xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
                The MHF Blueprint <Sparkles className="h-5 w-5 text-indigo-500" />
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm font-light">A managed 5-step video asset machine. Your only metric is uploading the camera rolls.</p>
            </div>

            <div className="space-y-6 my-6">
              {solutions.map((sol, i) => (
                <div key={i} className="flex gap-4 items-start" id={`solution-item-${i}`}>
                  <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl self-start">
                    {sol.icon}
                  </div>
                  <div>
                    <h4 className="text-zinc-900 font-bold text-sm sm:text-base mb-1">{sol.title}</h4>
                    <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">{sol.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs font-mono text-emerald-600 border-t border-zinc-100 pt-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Professional-grade production, rapid delivery, zero time-sink.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
