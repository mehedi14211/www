import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Play, Clipboard, Check, RefreshCw, Cpu, Film, HelpCircle, FileText, Settings, Send } from "lucide-react";
import { StrategyResponse, triggerAnalyticsEvent } from "../types";

export default function StrategizerWidget() {
  const [niche, setNiche] = useState("SaaS & Tech");
  const [tone, setTone] = useState("Cinematic & Aesthetic");
  const [format, setFormat] = useState("9:16 Short (TikTok/Reels)");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<StrategyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const niches = [
    "SaaS & Tech",
    "Finance & Entrepreneurship",
    "Fitness & Nutrition",
    "Lifestyle & Travel",
    "E-commerce Brands",
    "Education & AI",
  ];

  const tones = [
    "Cinematic & Aesthetic",
    "Energetic & Rapid Cuts",
    "Casual & Story-driven",
    "Educational & Analytical",
  ];

  const formats = [
    "9:16 Short (TikTok/Reels)",
    "16:9 Long-form (YouTube)",
  ];

  const loadingMessages = [
    "Mapping viral hooks from historical performance curves...",
    "Drafting attention-grabbing verbal hooks...",
    "Designing sound effect cue points and transition pacing...",
    "Compiling color grade and font-overlay style blueprints...",
    "Perfecting retention flow structures...",
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    triggerAnalyticsEvent(`Initiating strategy generation (${niche})`, "interaction");

    // Cycle through mock processing steps
    const timer = setInterval(() => {
      setLoadingStep((s) => (s + 1) % loadingMessages.length);
    }, 1500);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const response = await fetch("/api/strategize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, tone, videoFormat: format, topic }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to strategize script.");
      }

      const data = await response.json();
      setResult(data);
      triggerAnalyticsEvent(`Generated ${format} blueprint for ${niche}`, "interaction");
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error(err);
      if (err.name === "AbortError") {
        setError("The AI generator timed out. Please try again in a moment.");
      } else {
        setError(err.message || "An error occurred while calling the strategizer. Please check your setup.");
      }
      triggerAnalyticsEvent(`Generation failed for ${niche}`, "system");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 relative overflow-hidden shadow-sm" id="strategizer-widget-root">
      {/* Background blur decorative accent */}
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100 mb-6" id="strategizer-header">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">Phase 1 & 2 Blueprint</span>
          </div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950 flex items-center gap-2">
            MHF Script & Strategy Engine
          </h3>
          <p className="text-zinc-500 text-xs md:text-sm mt-1">
            Experience our pre-production pipeline in real-time. Input your parameters and generate a customized high-retention strategy.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-50 px-3.5 py-1.5 rounded-lg border border-zinc-200 w-fit">
          <Cpu className="h-3.5 w-3.5 text-indigo-600" /> Powered by MHF AI
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="strategizer-body-grid">
        {/* Left: Input parameters */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-4" id="strategizer-form">
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1.5">Your Niche / Space</label>
            <div className="grid grid-cols-2 gap-2">
              {niches.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNiche(n)}
                  className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    niche === n
                      ? "border-indigo-600 bg-indigo-50/40 text-indigo-950"
                      : "border-zinc-200 bg-zinc-50/30 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1.5">Aesthetic Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    tone === t
                      ? "border-indigo-600 bg-indigo-50/40 text-indigo-950"
                      : "border-zinc-200 bg-zinc-50/30 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1.5">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-xs cursor-pointer font-medium"
              >
                {formats.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1.5">Core Topic (Optional)</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 3 tools to edit faster"
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] text-white font-bold py-3 px-6 rounded-full shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 flex items-center justify-center gap-2 mt-6 cursor-pointer text-xs uppercase tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Preparing Studio Strategy...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate Video Strategy Blueprint
              </>
            )}
          </button>
        </form>

        {/* Right: Output result or loading */}
        <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 relative min-h-[350px] flex flex-col justify-between overflow-hidden" id="strategizer-display">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/95 backdrop-blur-sm z-10 text-center"
                id="strategizer-loading-overlay"
              >
                {/* Simulated Editor Timeline Scrubbing */}
                <div className="relative w-48 h-12 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between px-3 overflow-hidden mb-6">
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-600 animate-pulse" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-zinc-300"
                      style={{
                        height: `${Math.sin(i * 1.5) * 16 + 24}px`,
                        animation: "pulse 1.2s infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <h4 className="font-display font-extrabold text-zinc-950 text-lg mb-2">Analyzing Retention Structure</h4>
                <p className="text-indigo-600 font-mono text-xs max-w-sm h-12">
                  {loadingMessages[loadingStep]}
                </p>
              </motion.div>
            )}

            {!loading && !result && !error && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
                id="strategizer-placeholder"
              >
                <div className="h-14 w-14 bg-zinc-100 border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 mb-4">
                  <Film className="h-6 w-6" />
                </div>
                <h4 className="font-display font-semibold text-zinc-800 text-base mb-1">Blueprint Awaiting Parameters</h4>
                <p className="text-zinc-500 text-xs max-w-sm px-4 leading-relaxed">
                  Select your channel specs, style, and tone on the left, then click Generate to model your viral pre-production outline.
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-8"
                id="strategizer-error"
              >
                <div className="h-12 w-12 bg-red-50 border border-red-200 rounded-full flex items-center justify-center text-mhf-red mb-4">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h4 className="font-display font-semibold text-zinc-900 text-base mb-1">Strategy Initialization Failed</h4>
                <p className="text-zinc-500 text-xs max-w-sm px-4">
                  {error}
                </p>
                <button
                  onClick={handleGenerate}
                  className="mt-4 px-4 py-2 border border-zinc-200 rounded-xl text-xs hover:border-zinc-300 text-zinc-700 transition-colors flex items-center gap-2 cursor-pointer bg-white shadow-sm"
                >
                  <RefreshCw className="h-3 w-3" /> Retry Call
                </button>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 overflow-y-auto max-h-[480px] pr-2 text-left"
                id="strategizer-results"
              >
                {/* SECTION 1: VIRAL HOOKS */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-200 pb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold flex items-center gap-1.5">
                      <Play className="h-3 w-3" /> Step 1: Hook Selections
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(result.hookOptions, null, 2), "hooks")}
                      className="text-xs font-mono text-zinc-400 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSection === "hooks" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Clipboard className="h-3.5 w-3.5" />}
                      {copiedSection === "hooks" ? "Copied" : "Copy Hook Set"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {result.hookOptions.map((hook, index) => (
                      <div key={index} className="bg-white border border-zinc-200 rounded-xl p-3.5 text-xs space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span>OPTION 0{index + 1}</span>
                          <span className="text-indigo-600 uppercase font-bold">{hook.pacing}</span>
                        </div>
                        <p className="text-zinc-950 font-semibold italic">"{hook.verbal}"</p>
                        <p className="text-zinc-500 text-[11px] bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                          <strong className="text-[10px] font-mono uppercase tracking-wider block text-zinc-800 mb-0.5">Visual Scene:</strong>
                          {hook.visual}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 2: PRODUCTION FLOW TIMELINE */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-200 pb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold flex items-center gap-1.5">
                      <FileText className="h-3 w-3" /> Step 2: Content Structure Flow
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(result.scriptFlow, null, 2), "flow")}
                      className="text-xs font-mono text-zinc-400 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSection === "flow" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Clipboard className="h-3.5 w-3.5" />}
                      {copiedSection === "flow" ? "Copied" : "Copy Script Outline"}
                    </button>
                  </div>
                  <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-[1px] before:bg-zinc-200">
                    {result.scriptFlow.map((flow, index) => (
                      <div key={index} className="flex gap-4 text-xs relative pl-6">
                        <div className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-600 border-2 border-white shadow-sm" />
                        <div className="bg-white border border-zinc-200 rounded-xl p-3.5 flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 shadow-sm">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1 font-semibold">
                              Section 0{index + 1}: {flow.sectionName}
                            </span>
                            <p className="text-zinc-950 font-bold">{flow.spokenLines}</p>
                          </div>
                          <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-[11px] text-zinc-500 self-start">
                            <strong className="text-[10px] font-mono uppercase text-zinc-700 block mb-1">Post-Production Design Cues:</strong>
                            {flow.visualDescription}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 3: POST PRODUCTION DIRECTIVES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-zinc-200 rounded-xl p-4 text-xs space-y-2 shadow-sm">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold flex items-center gap-1.5 border-b border-zinc-100 pb-1.5">
                      <Settings className="h-3 w-3 text-indigo-600" /> Step 4: Editing Style Guide
                    </span>
                    <div className="space-y-2 text-[11px]">
                      <p className="text-zinc-500 leading-relaxed">
                        <strong className="text-zinc-800 font-bold">Color Grading:</strong> {result.editingStyleGuide.colorGrading}
                      </p>
                      <p className="text-zinc-500 leading-relaxed">
                        <strong className="text-zinc-800 font-bold">Sound Design:</strong> {result.editingStyleGuide.soundDesign}
                      </p>
                      <p className="text-zinc-500 leading-relaxed">
                        <strong className="text-zinc-800 font-bold">Captions & Overlays:</strong> {result.editingStyleGuide.textOverlays}
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 text-xs flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-mhf-red font-bold flex items-center gap-1.5 border-b border-red-100 pb-1.5">
                        <Send className="h-3 w-3 text-mhf-red" /> Step 5: Studio Recommendation
                      </span>
                      <p className="text-zinc-800 text-[11px] mt-2 italic leading-relaxed font-semibold">
                        "{result.ctaRecommendation}"
                      </p>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-3 pt-2.5 border-t border-red-100/50 font-mono">
                      MHF Studio can write, script, film, and fully assemble this matching blueprint dynamically.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
