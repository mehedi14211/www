import React from "react";
import { motion } from "motion/react";
import { Play, Sparkles, Video, ArrowUpRight, Scissors, Layers, Volume2 } from "lucide-react";

interface HeroProps {
  onBookCall: () => void;
  onExploreEngine: () => void;
  theme?: "light" | "midnight";
}

export default function Hero({ onBookCall, onExploreEngine, theme }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-28 pb-16 text-center border-b border-zinc-200 bg-[#F9FAFB] overflow-hidden" id="hero-section">
      {/* Dynamic Background Noise/Gradient Grid */}
      {theme !== "midnight" && (
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none z-0" />
      )}
      
      {/* Pinterest-inspired Mesh Glow & Ambient Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="hero-ambient-glow-container">
        {/* Animated main glowing radial sphere (Signal Red / Indigo blend) */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(225,6,0,0.05)_40%,transparent_70%)] rounded-full blur-3xl animate-pulse pointer-events-none" 
          style={{ animationDuration: "10s" }} 
        />
        
        {/* Secondary shifting gradient blob for high-end aesthetic depth */}
        <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.04)_0%,rgba(99,102,241,0.06)_50%,transparent_100%)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,rgba(225,6,0,0.03)_60%,transparent_100%)] rounded-full blur-3xl pointer-events-none" />

        {/* Elegant Glowing laser lines slicing behind typography for horizontal flow */}
        <div className="absolute top-[18%] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-[0.5px]" />
        <div className="absolute top-[18%] left-1/3 right-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#E10600]/30 to-transparent blur-[1.5px]" />
      </div>

      {/* Floating Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-white border border-zinc-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] px-4.5 py-2 rounded-full mb-8 text-[11px] font-mono font-bold tracking-wider text-zinc-600 relative z-10"
        id="hero-badge"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
        <span>Premium editing agency for creators and businesses</span>
      </motion.div>

      {/* Hero Header Typography */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10" id="hero-typography-container">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.95] text-zinc-950" id="hero-title">
          YOU FILM. <br />
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-mhf-red bg-clip-text text-transparent select-none">
            WE DO THE REST.
          </span>
        </h1>

        <p className="text-zinc-500 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto font-sans font-light leading-relaxed" id="hero-subtitle">
          The one-stop professional post-production studio. Strategy to launch, handled in one smooth, highly customized motion.
        </p>
      </div>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-md mx-auto relative z-10"
        id="hero-actions"
      >
        <button
          onClick={onBookCall}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-full shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2"
          id="hero-cta-book"
        >
          Book Strategy <ArrowUpRight className="h-4 w-4" />
        </button>
        <button
          onClick={onExploreEngine}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm text-zinc-800 hover:text-zinc-950 font-bold px-5 py-2.5 rounded-full hover:bg-zinc-50 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:ring-offset-2"
          id="hero-cta-explore"
        >
          Try Script Generation <Sparkles className="h-4 w-4 text-indigo-600" />
        </button>
      </motion.div>

      {/* Interactive Editor Timeline Mockup (Apple & Behance inspired) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-5xl mt-16 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl relative overflow-hidden group border-glow"
        id="hero-timeline-mockup"
      >
        {/* Decorative interface dots */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 bg-zinc-50/50 -mx-4 -mt-4 p-4 rounded-t-3xl" id="timeline-bar-header">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
          <div className="text-[10px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> TIMELINE.MHF - ACTIVE SEQUENCE (23.976 fps)
          </div>
          <div className="w-12" />
        </div>

        {/* Video Preview Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" id="timeline-inner-grid">
          <div className="md:col-span-8 bg-zinc-50 border border-zinc-200/80 rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center group/preview">
            <img
              src="https://picsum.photos/seed/production/960/540"
              alt="Cinematic production layout"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover/preview:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Color Overlay Filter Simulator */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay group-hover/preview:bg-transparent transition-all duration-300" />
            
            {/* Safe zone lines */}
            <div className="absolute inset-4 border border-white/5 pointer-events-none" />
            <div className="absolute inset-8 border border-white/5 pointer-events-none" />

            {/* Captions / Subtitles Simulation overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full max-w-md px-4">
              <span className="bg-zinc-950/95 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl border border-zinc-800 inline-block shadow-lg text-glow">
                <span className="text-indigo-400">🚀 PRO TIP:</span> The first 3 seconds of your video is the absolute battlefield.
              </span>
            </div>

            {/* Editing Tools Badges */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[9px] font-mono text-zinc-300 flex items-center gap-1">
                <Scissors className="h-3 w-3 text-indigo-400" /> 47 CUTS
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[9px] font-mono text-zinc-300 flex items-center gap-1">
                <Layers className="h-3 w-3 text-indigo-400" /> 5 FX LAYERS
              </span>
            </div>
          </div>

          {/* Side: Video track attributes & sound effects list */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 text-left" id="timeline-sidebar">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 flex-1 space-y-3">
              <h5 className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider border-b border-zinc-200 pb-1.5 flex items-center justify-between font-bold">
                <span>Active Assets</span>
                <span className="text-indigo-600 font-bold">V2.4</span>
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white border border-zinc-200 p-2 rounded-lg hover:border-indigo-500/40 transition-colors">
                  <span className="font-mono text-zinc-700">A-ROLL_AESTHETIC.mov</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">LINKED</span>
                </div>
                <div className="flex items-center justify-between bg-white border border-zinc-200 p-2 rounded-lg hover:border-indigo-500/40 transition-colors">
                  <span className="font-mono text-zinc-700">B-ROLL_METRIC_ZOOMS.mp4</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">LINKED</span>
                </div>
                <div className="flex items-center justify-between bg-white border border-zinc-200 p-2 rounded-lg hover:border-indigo-500/40 transition-colors">
                  <span className="font-mono text-zinc-700">SUBTITLE_POP_PRESET.json</span>
                  <span className="text-[10px] text-indigo-600 font-mono font-bold">MHF PRESET</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 space-y-3">
              <h5 className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider border-b border-zinc-200 pb-1.5 flex items-center justify-between font-bold">
                <span>Audio Waveform Mapping</span>
                <Volume2 className="h-3.5 w-3.5 text-indigo-600" />
              </h5>
              <div className="flex gap-1 items-end h-10 w-full bg-white p-2 rounded-lg border border-zinc-200">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-600 rounded-full hover:bg-mhf-red transition-colors"
                    style={{
                      height: `${Math.random() * 100}%`,
                      opacity: i % 3 === 0 ? 0.4 : 0.8,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
