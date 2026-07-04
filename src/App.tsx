import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Logo from "./components/Logo";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import StrategizerWidget from "./components/StrategizerWidget";
import TestimonialsSection from "./components/TestimonialsSection";
import PricingSection from "./components/PricingSection";
import FaqSection from "./components/FaqSection";
import BookingModal from "./components/BookingModal";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { triggerAnalyticsEvent } from "./types";
import { ArrowUpRight, Sparkles, MessageSquare, Menu, X, Play, Shield, Globe, Sun, Moon } from "lucide-react";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "midnight">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mhf-theme");
      if (stored === "midnight" || stored === "light") {
        return stored as "light" | "midnight";
      }
      // Check system color scheme preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "midnight" : "light";
    }
    return "light";
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [dockOffset, setDockOffset] = useState({ x: 0, y: 0 });

  const [pricingRipples, setPricingRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bookingRipples, setBookingRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const createRipple = (
    e: React.MouseEvent<HTMLButtonElement>,
    setRipples: React.Dispatch<React.SetStateAction<{ id: number; x: number; y: number }[]>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  const handleDockMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Subtle magnetic scaling offset of 18% of relative cursor distance
    setDockOffset({ x: x * 0.18, y: y * 0.18 });
  };

  const handleDockMouseLeave = () => {
    setDockOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't manually set a preference yet
      const hasStoredPreference = localStorage.getItem("mhf-theme") !== null;
      if (!hasStoredPreference) {
        setTheme(e.matches ? "midnight" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingActions(true);
      } else {
        setShowFloatingActions(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "midnight") {
      root.classList.add("theme-midnight");
    } else {
      root.classList.remove("theme-midnight");
    }
    localStorage.setItem("mhf-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Report initial site entry event to analytics
    triggerAnalyticsEvent("Landed on MHF Studio Platform", "navigation");
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const label = navLinks.find(link => link.id === id)?.label || id;
      triggerAnalyticsEvent(`Scrolled to: ${label}`, "navigation");
    }
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "midnight" : "light";
    setTheme(nextTheme);
    triggerAnalyticsEvent(`Changed layout theme to ${nextTheme.toUpperCase()}`, "interaction");
  };

  const openBooking = () => {
    setIsBookingOpen(true);
    triggerAnalyticsEvent("Opened Strategy Booking Modal", "interaction");
  };

  const navLinks = [
    { label: "The Process", id: "process-section" },
    { label: "Selected Work", id: "portfolio-section" },
    { label: "AI Strategizer", id: "strategizer-section" },
    { label: "Investment", id: "pricing-section" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] relative overflow-x-hidden selection:bg-indigo-600 selection:text-white" id="app-root">
      {/* Loading Screen */}
      <LoadingScreen theme={theme} />

      {/* Thin, fixed scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-mhf-red z-50"
        style={{ scaleX, transformOrigin: "0%" }}
        id="scroll-progress-bar"
      />

      {/* Custom premium lagging magnetic cursor tracker */}
      <CustomCursor theme={theme} />

      {/* GLOBAL HEADER / NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-6 py-4" id="app-header">
        <div className="max-w-6xl mx-auto flex items-center justify-between" id="header-container">
          {/* Stylized slanted branding logo */}
          <Logo size="sm" className="hover:opacity-90 transition-opacity" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-500 uppercase" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="hover:text-indigo-600 transition-colors cursor-pointer font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Button: Book Strategy Session */}
          <div className="hidden md:flex items-center gap-4" id="desktop-actions">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-zinc-200/80 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Switch to Midnight" : "Switch to Light"}
              id="theme-toggle-desktop"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#E10600]" />}
            </button>
            <button
              onClick={openBooking}
              className={
                theme === "midnight"
                  ? "relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden group flex items-center gap-2 text-white bg-gradient-to-r from-[#7A0000] via-[#FF6666] to-[#7A0000] bg-[length:200%_auto] hover:bg-right shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 hover:scale-[1.04]"
                  : "animate-color-flow relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden group flex items-center gap-2 text-white shadow-md shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.04]"
              }
              id="header-book-btn"
            >
              <span className="relative z-10 flex items-center gap-1.5 text-white">
                Book Strategy <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2" id="mobile-actions-container">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 flex items-center justify-center cursor-pointer"
              title={theme === "light" ? "Switch to Midnight" : "Switch to Light"}
              id="theme-toggle-mobile"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#E10600]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-600 hover:text-zinc-950 p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-[69px] left-0 right-0 bg-white border-b border-zinc-200 p-6 flex flex-col gap-6 md:hidden z-50 shadow-lg animate-fade-in" id="mobile-nav-panel">
            <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-wider text-left">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="hover:text-indigo-600 transition-colors py-2.5 border-b border-zinc-100 text-left text-zinc-600 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                openBooking();
                setMobileMenuOpen(false);
              }}
              className="animate-color-flow w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 px-4 rounded-full text-center text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-red-500/10 hover:scale-[1.02] transition-all duration-300"
              id="mobile-book-btn"
            >
              Book Strategy Session <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      {/* CORE SECTIONS LAYOUT */}
      <main id="app-main">
        {/* Hero Section */}
        <Hero
          theme={theme}
          onBookCall={openBooking}
          onExploreEngine={() => handleScrollTo("strategizer-section")}
        />

        {/* Problem Section (What problem we solve) */}
        <ProblemSection />

        {/* Process Section (The 5-step pipeline) */}
        <ProcessSection theme={theme} />

        {/* Work Section (Selected video editing showcase) */}
        <PortfolioSection />

        {/* Lead Magnet Interactive Strategizer Widget Section */}
        <section className="py-24 px-6 border-b border-zinc-200 bg-[#F9FAFB]" id="strategizer-section">
          <div className="max-w-6xl mx-auto" id="strategizer-container">
            <StrategizerWidget />
          </div>
        </section>

        {/* Creator Testimonial Section */}
        <TestimonialsSection />

        {/* Signature Investment / Package Section */}
        <PricingSection onBookCall={openBooking} />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* FOOTER BRANDS & SOCIAL CREDITS */}
      <footer className="bg-zinc-950 border-t border-zinc-900 px-6 py-16 text-left" id="app-footer">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="footer-container">
          
          {/* Logo and Tagline (Left) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <Logo size="md" />
            <p className="text-zinc-400 text-sm font-light max-w-xs leading-relaxed">
              MHF Studio is a premium, one-stop post-production studio. You press record, we engineer the retention.
            </p>
          </div>

          {/* Quick Links Menu */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">STUDIO ARCHITECTURE</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-500 uppercase">
              <button onClick={() => handleScrollTo("app-root")} className="hover:text-white transition-colors text-left cursor-pointer">Back To Top</button>
              <button onClick={() => handleScrollTo("process-section")} className="hover:text-white transition-colors text-left cursor-pointer">5-Step Flow</button>
              <button onClick={() => handleScrollTo("portfolio-section")} className="hover:text-white transition-colors text-left cursor-pointer">Work Reel</button>
              <button onClick={() => handleScrollTo("strategizer-section")} className="hover:text-white transition-colors text-left cursor-pointer">AI Blueprint</button>
              <button onClick={() => handleScrollTo("pricing-section")} className="hover:text-white transition-colors text-left cursor-pointer">Pricing Tier</button>
              <button onClick={() => handleScrollTo("faq-section")} className="hover:text-white transition-colors text-left cursor-pointer">FAQs</button>
              <button onClick={openBooking} className="hover:text-white transition-colors text-left cursor-pointer">Secure Slot</button>
            </div>
          </div>

          {/* Studio Credits & Assurances (Right) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">COMPLIANCE & ASSURANCE</h4>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Designed entirely around the MHF Studio brand book guidelines. Re-engineered utilizing fluid spacing, 80% neutrals, 15% gray values, and exactly 5% strategic Signal Red.
            </p>
            <div className="flex items-center gap-4 pt-2" id="footer-badges">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 font-bold">
                <Shield className="h-3.5 w-3.5 text-indigo-400" /> SECURED WORKSPACE
              </span>
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 font-bold">
                <Globe className="h-3.5 w-3.5 text-indigo-400" /> CLOUD DELIVERED
              </span>
            </div>
          </div>

        </div>

        {/* Footer legal credits */}
        <div className="max-w-6xl mx-auto border-t border-zinc-900 mt-12 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-zinc-500" id="footer-bottom">
          <p>© {new Date().getFullYear()} MHF STUDIO. ALL RIGHTS RESERVED. CLIENT RETENTION ENGINE v1.4.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">YOUTUBE</span>
            <span className="hover:text-white transition-colors cursor-pointer">BEHANCE</span>
            <span className="hover:text-white transition-colors cursor-pointer">PINTEREST</span>
            <span className="hover:text-white transition-colors cursor-pointer">SLACK</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom-Right Floating Quick Actions Bar */}
      <AnimatePresence>
        {showFloatingActions && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ 
              opacity: 1, 
              y: dockOffset.y, 
              x: dockOffset.x,
              scale: 1 
            }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
              x: { type: "spring", stiffness: 80, damping: 12 },
              y: { type: "spring", stiffness: 80, damping: 12 }
            }}
            onMouseMove={handleDockMouseMove}
            onMouseLeave={handleDockMouseLeave}
            whileHover={{ scale: 1.05 }}
            className={`fixed bottom-4 right-4 z-40 md:hidden p-[1px] rounded-full transition-[box-shadow,background-color] duration-300 active:scale-[0.98] ${
              theme === "midnight"
                ? "bg-gradient-to-r from-[#E10600] via-[#3B82F6] to-[#F59E0B] shadow-[0_2px_6px_rgba(0,0,0,0.8),_0_8px_20px_rgba(0,0,0,0.7),_0_16px_32px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.9),_0_16px_40px_rgba(0,0,0,0.8),_0_32px_64px_-8px_rgba(0,0,0,0.7),_0_0_25px_rgba(225,6,0,0.15)]"
                : "bg-gradient-to-r from-[#E10600]/40 via-[#3B82F6]/30 to-[#F59E0B]/40 shadow-[0_2px_6px_rgba(0,0,0,0.06),_0_8px_20px_rgba(0,0,0,0.05),_0_16px_32px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08),_0_16px_40px_rgba(0,0,0,0.07),_0_32px_64px_-8px_rgba(0,0,0,0.06)]"
            }`}
            id="mobile-floating-dock"
          >
            <div 
              className={`flex items-center justify-between gap-2 p-1 pl-3 pr-1 rounded-full backdrop-blur-xl h-[34px] ${
                theme === "midnight"
                  ? "bg-zinc-950/95 text-white"
                  : "bg-white/95 text-zinc-900"
              }`}
              id="mobile-floating-dock-inner"
            >
              {/* Company Logo / Image Logo Container */}
              <div className="flex items-center justify-center select-none" id="floating-dock-logo-container">
                <img 
                  src="/logo.png" 
                  alt="mhf logo" 
                  className="h-[14px] w-auto object-contain pointer-events-none block transition-all duration-300"
                  style={{ 
                    filter: theme === "midnight" 
                      ? "brightness(0) invert(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))" 
                      : "none" 
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Minimal Divider to Segment UI */}
              <div 
                className={`w-[1px] h-3.5 rounded-full shrink-0 transition-colors ${
                  theme === "midnight" ? "bg-zinc-800" : "bg-zinc-200"
                }`} 
                id="floating-dock-divider"
              />

              <div className="flex items-center gap-1.5" id="floating-dock-actions-container">
                {/* View Pricing Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={(e) => {
                    createRipple(e, setPricingRipples);
                    handleScrollTo("pricing-section");
                  }}
                  className={`relative overflow-hidden h-[26px] px-2.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center border ${
                    theme === "midnight"
                      ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-850"
                      : "bg-zinc-100/90 border-zinc-200 text-zinc-700 hover:bg-zinc-150"
                  }`}
                  id="floating-dock-pricing-btn"
                >
                  <span className="relative z-10 pointer-events-none">Pricing</span>
                  <AnimatePresence>
                    {pricingRipples.map(ripple => (
                      <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 20,
                          height: 20,
                          x: "-50%",
                          y: "-50%",
                          backgroundColor: theme === "midnight" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.12)",
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.button>

                {/* Book Now Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={(e) => {
                    createRipple(e, setBookingRipples);
                    openBooking();
                  }}
                  className="relative overflow-hidden animate-color-flow h-[26px] px-3 text-white text-[9px] font-sans font-bold uppercase tracking-wider rounded-full active:scale-95 transition-all cursor-pointer shadow-md shadow-red-500/10 whitespace-nowrap flex items-center justify-center"
                  id="floating-dock-book-btn"
                >
                  <span className="relative z-10 pointer-events-none">Book Now</span>
                  <AnimatePresence>
                    {bookingRipples.map(ripple => (
                      <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 20,
                          height: 20,
                          x: "-50%",
                          y: "-50%",
                          backgroundColor: "rgba(255, 255, 255, 0.35)",
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Live Tracking Dashboard */}
      <AnalyticsDashboard />

      {/* Interactive scheduling lead capture wizard */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
