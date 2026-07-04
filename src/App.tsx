import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
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
      return (stored === "midnight" ? "midnight" : "light") as "light" | "midnight";
    }
    return "light";
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        <ProcessSection />

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

      {/* Analytics Live Tracking Dashboard */}
      <AnalyticsDashboard />

      {/* Interactive scheduling lead capture wizard */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
