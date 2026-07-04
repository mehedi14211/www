import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Clock, Sparkles, Play, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioItem } from "../types";

export default function PortfolioSection() {
  const [filter, setFilter] = useState<"9:16" | "16:9">("9:16");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [desktopPlayingId, setDesktopPlayingId] = useState<string | null>(null);
  const [mobilePlayingId, setMobilePlayingId] = useState<string | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const portfolioItems: PortfolioItem[] = [
    {
      id: "work-1",
      title: "SaaS Explainer: Scaling Devops with AI",
      category: "SaaS / Tech",
      thumbnail: "https://picsum.photos/seed/saasedit/450/800",
      duration: "0:58",
      views: "182K",
      aspectRatio: "9:16",
      captionStyle: "YELLOW GLOW",
    },
    {
      id: "work-2",
      title: "The Silent Truth About 10-Year Treasury Bonds",
      category: "Personal Finance",
      thumbnail: "https://picsum.photos/seed/bondedit/800/450",
      duration: "12:15",
      views: "440K",
      aspectRatio: "16:9",
      captionStyle: "MINIMAL OUTLINE",
    },
    {
      id: "work-3",
      title: "3 Nutrition Myths That Stop Muscle Growth",
      category: "Fitness & Nutrition",
      thumbnail: "https://picsum.photos/seed/fitedit/450/800",
      duration: "0:45",
      views: "1.2M",
      aspectRatio: "9:16",
      captionStyle: "SIGNAL RED BOLD",
    },
    {
      id: "work-4",
      title: "A Day Filming in Kyoto's Bamboo Forest",
      category: "Lifestyle / Travel",
      thumbnail: "https://picsum.photos/seed/kyotoedit/800/450",
      duration: "0:30",
      views: "98K",
      aspectRatio: "16:9",
      captionStyle: "CINEMATIC GLOW",
    },
    {
      id: "work-5",
      title: "How I Built an E-Commerce Empire in 30 Days",
      category: "E-Commerce",
      thumbnail: "https://picsum.photos/seed/ecomedit/450/800",
      duration: "0:52",
      views: "640K",
      aspectRatio: "9:16",
      captionStyle: "YELLOW GLOW",
    },
    {
      id: "work-6",
      title: "AI Automation Coding Masterclass Blueprint",
      category: "Education & AI",
      thumbnail: "https://picsum.photos/seed/aiedit/800/450",
      duration: "18:40",
      views: "320K",
      aspectRatio: "16:9",
      captionStyle: "MINIMAL OUTLINE",
    },
    {
      id: "work-7",
      title: "Ultimate Desk Setup for Software Engineers",
      category: "Tech & Lifestyle",
      thumbnail: "https://picsum.photos/seed/deskedit/450/800",
      duration: "0:59",
      views: "890K",
      aspectRatio: "9:16",
      captionStyle: "YELLOW GLOW",
    },
    {
      id: "work-8",
      title: "The Golden Rule of UI Design",
      category: "Design / Creative",
      thumbnail: "https://picsum.photos/seed/designedit/450/800",
      duration: "0:40",
      views: "410K",
      aspectRatio: "9:16",
      captionStyle: "YELLOW GLOW",
    },
    {
      id: "work-9",
      title: "Why Python is still King of AI",
      category: "Education / Code",
      thumbnail: "https://picsum.photos/seed/pythonedit/450/800",
      duration: "0:55",
      views: "1.5M",
      aspectRatio: "9:16",
      captionStyle: "YELLOW GLOW",
    },
    {
      id: "work-10",
      title: "Building a Modern Minimalist Home Office",
      category: "Design & Workspace",
      thumbnail: "https://picsum.photos/seed/officeedit/800/450",
      duration: "14:20",
      views: "215K",
      aspectRatio: "16:9",
      captionStyle: "MINIMAL OUTLINE",
    },
    {
      id: "work-11",
      title: "Is the M4 MacBook Pro Worth the Upgrade?",
      category: "Tech Review",
      thumbnail: "https://picsum.photos/seed/m4edit/800/450",
      duration: "10:35",
      views: "750K",
      aspectRatio: "16:9",
      captionStyle: "MINIMAL OUTLINE",
    },
    {
      id: "work-12",
      title: "The Art of Slow Living: Coffee in Copenhagen",
      category: "Lifestyle & Travel",
      thumbnail: "https://picsum.photos/seed/copenedit/800/450",
      duration: "08:15",
      views: "135K",
      aspectRatio: "16:9",
      captionStyle: "MINIMAL OUTLINE",
    },
  ];

  const filteredItems = portfolioItems.filter((item) => {
    return item.aspectRatio === filter;
  });

  const getCaptionText = (id: string) => {
    switch (id) {
      case "work-1": return "This AI tool is literally taking over DevOps...";
      case "work-2": return "The bond yield curve is predicting something massive...";
      case "work-3": return "Stop eating oatmeal before your morning workout!";
      case "work-4": return "A serene escape into Kyoto's traditional frames...";
      case "work-5": return "From zero to $40,000 in exactly thirty days...";
      case "work-6": return "Let's build a serverless LLM router using Node...";
      case "work-7": return "My ultimate minimalist workspace for coding...";
      case "work-8": return "The single most important rule of design...";
      case "work-9": return "Python is still dominating the AI landscape...";
      case "work-10": return "Transforming my studio desk into a dream workstation...";
      case "work-11": return "The truth about Apple's newest M4 powerhouses...";
      case "work-12": return "Discovering the best aesthetic cafes in Denmark...";
      default: return "Hook your viewer instantly with bold pacing.";
    }
  };

  const getYouTubeId = (id: string) => {
    switch (id) {
      // Portrait
      case "work-1": return "NrGXBr02zZ8";
      case "work-3": return "mH0ZA40n4d8";
      case "work-5": return "3bt-xkyKtNw";
      case "work-7": return "3rH4a6wpF1Q";
      case "work-8": return "NrGXBr02zZ8";
      case "work-9": return "-94O8zNu7Fs";
      // Landscape
      case "work-2": return "PAGkXf5Tais";
      case "work-4": return "lWhsFLBXhe4";
      case "work-6": return "Fm7z17IFyV4";
      case "work-10": return "SvpuAWX4AY0";
      case "work-11": return "Z0lGaHN3bWU";
      case "work-12": return "EdJ9DrSANzw";
      default: return "";
    }
  };

  const handleFilterChange = (ratio: "9:16" | "16:9") => {
    setFilter(ratio);
    setMobileIndex(0);
    setActiveItem(null);
    setDesktopPlayingId(null);
    setMobilePlayingId(null);
  };

  return (
    <section className="py-24 px-6 border-b border-zinc-200 bg-white" id="portfolio-section">
      <div className="max-w-6xl mx-auto space-y-16" id="portfolio-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6" 
          id="portfolio-header"
        >
          <div className="space-y-4 text-left max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-mhf-red bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full font-bold inline-block">
              THE WORK REEL
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              Selected Projects
            </h2>
            <p className="text-zinc-500 text-base font-light">
              We engineer high-retention post-production assets. Click the play button to watch directly, or expand a card to view our layers blueprint.
            </p>
          </div>

          {/* Ratio Filter Controls */}
          <div className="flex bg-zinc-100 border border-zinc-200 rounded-2xl p-1 text-[11px] font-mono self-start shadow-sm" id="portfolio-filter-controls">
            {(["9:16", "16:9"] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => handleFilterChange(ratio)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === ratio
                    ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/40"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {ratio === "9:16" ? "9:16 PORTRAIT" : "16:9 LANDSCAPE"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid - Desktop Only */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start" id="portfolio-grid">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative rounded-2xl border overflow-hidden transition-all bg-white ${
                  activeItem === item.id 
                    ? "border-indigo-600 ring-4 ring-indigo-500/10 shadow-xl scale-[1.01]" 
                    : "border-zinc-200 hover:border-zinc-300 hover:shadow-md"
                } ${item.aspectRatio === "9:16" ? "max-w-[340px] mx-auto md:max-w-none" : ""}`}
                id={`portfolio-card-${item.id}`}
              >
                {/* Thumbnail Frame */}
                <div 
                  className={`relative overflow-hidden w-full bg-zinc-950 ${item.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (desktopPlayingId !== item.id) {
                      setDesktopPlayingId(item.id);
                      setMobilePlayingId(null);
                    }
                  }}
                >
                  {desktopPlayingId === item.id ? (
                    <div className="w-full h-full relative">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(item.id)}?autoplay=1&modestbranding=1&rel=0`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full absolute inset-0"
                      />
                      {/* Floating Stop/Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDesktopPlayingId(null);
                        }}
                        className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-100 flex items-center justify-center transition-colors cursor-pointer shadow-md"
                        title="Close Player"
                      >
                        <span className="text-sm font-bold font-sans">×</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle vignette/shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />

                      {/* Top: Ratio and views */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                        <span className="px-2 py-1 rounded bg-zinc-900/85 border border-zinc-700/50 text-[9px] font-mono text-zinc-100 font-semibold shadow-sm">
                          {item.aspectRatio}
                        </span>
                        <span className="px-2 py-1 rounded bg-zinc-900/85 border border-zinc-700/50 text-[9px] font-mono text-zinc-100 flex items-center gap-1 font-semibold shadow-sm">
                          <Eye className="h-3 w-3 text-indigo-400" /> {item.views} views
                        </span>
                      </div>

                      {/* Mid: Play Trigger Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
                        <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-600/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Caption Overlay Simulator */}
                      <div className="absolute bottom-6 left-4 right-4 text-center z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded font-display font-extrabold text-[11px] sm:text-xs tracking-tight border inline-block shadow-lg leading-tight uppercase bg-yellow-400 text-black border-yellow-500">
                          {getCaptionText(item.id)}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Description */}
                <div 
                  className="p-4 space-y-2 text-left cursor-pointer" 
                  id={`portfolio-card-desc-${item.id}`}
                  onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>{item.category}</span>
                    <span className="flex items-center gap-1 font-semibold"><Clock className="h-3 w-3 text-indigo-600" /> {item.duration}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  
                  {/* Expandable editor overlay (click to expand) */}
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
                    <span className="flex items-center gap-1 text-indigo-600 font-bold"><Flame className="h-3 w-3 text-indigo-600 animate-pulse" /> retention engineered</span>
                    <span className="text-[10px] font-bold text-zinc-500">{activeItem === item.id ? "CLOSE BLUEPRINT" : "VIEW REVISIONS"}</span>
                  </div>

                  {/* Detailed Editor Blueprint */}
                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                        id={`blueprint-expanded-${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 mt-3 space-y-2 text-[10px] text-zinc-600">
                          <p className="border-b border-zinc-200 pb-1 font-bold text-indigo-600">POST-PRODUCTION BLUEPRINT</p>
                          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                            <div>
                              <p className="text-zinc-400">SOUND EFFECTS:</p>
                              <p className="text-zinc-900 font-bold">Whip-Whoosh, Pop-Hit</p>
                            </div>
                            <div>
                              <p className="text-zinc-400">ZOOMS/PANNING:</p>
                              <p className="text-zinc-900 font-bold">0.5s Scale-In beats</p>
                            </div>
                            <div>
                              <p className="text-zinc-400">B-ROLL COVERAGE:</p>
                              <p className="text-zinc-900 font-bold">65% Custom Overlays</p>
                            </div>
                            <div>
                              <p className="text-zinc-400">GRADING PRESET:</p>
                              <p className="text-zinc-900 font-bold">Premium High-Contrast</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Portfolio Carousel - Mobile Only */}
        <div className="block md:hidden space-y-6" id="portfolio-mobile-carousel">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => {
              if (index !== mobileIndex) return null;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-2xl border overflow-hidden bg-white ${
                    activeItem === item.id 
                      ? "border-indigo-600 ring-4 ring-indigo-500/10 shadow-xl" 
                      : "border-zinc-200 hover:border-zinc-300 shadow-sm"
                  } max-w-[340px] mx-auto`}
                  id={`portfolio-mobile-card-${item.id}`}
                >
                  {/* Thumbnail Frame */}
                  <div 
                    className={`relative overflow-hidden w-full bg-zinc-950 ${item.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (mobilePlayingId !== item.id) {
                        setMobilePlayingId(item.id);
                        setDesktopPlayingId(null);
                      }
                    }}
                  >
                    {mobilePlayingId === item.id ? (
                      <div className="w-full h-full relative">
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(item.id)}?autoplay=1&modestbranding=1&rel=0`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full absolute inset-0"
                        />
                        {/* Floating Stop/Close Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMobilePlayingId(null);
                          }}
                          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-100 flex items-center justify-center transition-colors cursor-pointer shadow-md"
                          title="Close Video"
                        >
                          <span className="text-sm font-bold font-sans">×</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle vignette/shadow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />

                        {/* Top: Ratio and views */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                          <span className="px-2 py-1 rounded bg-zinc-900/85 border border-zinc-700/50 text-[9px] font-mono text-zinc-100 font-semibold shadow-sm">
                            {item.aspectRatio}
                          </span>
                          <span className="px-2 py-1 rounded bg-zinc-900/85 border border-zinc-700/50 text-[9px] font-mono text-zinc-100 flex items-center gap-1 font-semibold shadow-sm">
                            <Eye className="h-3 w-3 text-indigo-400" /> {item.views} views
                          </span>
                        </div>

                        {/* Mid: Play Trigger Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-600/30">
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Caption Overlay Simulator */}
                        <div className="absolute bottom-6 left-4 right-4 text-center z-10 pointer-events-none">
                          <span className="px-2.5 py-1 rounded font-display font-extrabold text-[11px] sm:text-xs tracking-tight border inline-block shadow-lg leading-tight uppercase bg-yellow-400 text-black border-yellow-500">
                            {getCaptionText(item.id)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Description */}
                  <div 
                    className="p-4 space-y-2 text-left cursor-pointer" 
                    id={`portfolio-mobile-card-desc-${item.id}`}
                    onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1 font-semibold"><Clock className="h-3 w-3 text-indigo-600" /> {item.duration}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-900 line-clamp-1">
                      {item.title}
                    </h4>
                    
                    {/* Expandable editor overlay (click to expand) */}
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
                      <span className="flex items-center gap-1 text-indigo-600 font-bold"><Flame className="h-3 w-3 text-indigo-600 animate-pulse" /> retention engineered</span>
                      <span className="text-[10px] font-bold text-zinc-500">{activeItem === item.id ? "CLOSE BLUEPRINT" : "VIEW REVISIONS"}</span>
                    </div>

                    {/* Detailed Editor Blueprint */}
                    <AnimatePresence>
                      {activeItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                          id={`mobile-blueprint-expanded-${item.id}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 mt-3 space-y-2 text-[10px] text-zinc-600">
                            <p className="border-b border-zinc-200 pb-1 font-bold text-indigo-600">POST-PRODUCTION BLUEPRINT</p>
                            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                              <div>
                                <p className="text-zinc-400">SOUND EFFECTS:</p>
                                <p className="text-zinc-900 font-bold">Whip-Whoosh, Pop-Hit</p>
                              </div>
                              <div>
                                <p className="text-zinc-400">ZOOMS/PANNING:</p>
                                <p className="text-zinc-900 font-bold">0.5s Scale-In beats</p>
                              </div>
                              <div>
                                <p className="text-zinc-400">B-ROLL COVERAGE:</p>
                                <p className="text-zinc-900 font-bold">65% Custom Overlays</p>
                              </div>
                              <div>
                                <p className="text-zinc-400">GRADING PRESET:</p>
                                <p className="text-zinc-900 font-bold">Premium High-Contrast</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Pagination and Left/Right Buttons */}
          <div className="flex items-center justify-between px-2 max-w-[340px] mx-auto border-t border-zinc-100 pt-4" id="portfolio-mobile-nav">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
                setMobilePlayingId(null);
              }}
              className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-mono text-xs text-zinc-500 font-bold">
              {mobileIndex + 1} / {filteredItems.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
                setMobilePlayingId(null);
              }}
              className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
