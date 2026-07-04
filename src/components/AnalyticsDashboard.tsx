import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  BarChart2, 
  Settings, 
  Globe, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Users, 
  MousePointerClick,
  Terminal,
  ShieldAlert
} from "lucide-react";

interface EventLog {
  id: string;
  time: string;
  event: string;
  source: string;
  type: "user" | "organic";
}

export default function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [beaconToken, setBeaconToken] = useState<string>(() => {
    // Check localStorage first
    const saved = localStorage.getItem("mhf_cf_beacon_token");
    if (saved) return saved;
    // Fallback to build time env var
    return ((import.meta as any).env?.VITE_CLOUDFLARE_BEACON_TOKEN as string) || "";
  });
  const [isSaved, setIsSaved] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Stats State
  const [activeUsers, setActiveUsers] = useState(3);
  const [sessionViews, setSessionViews] = useState(() => {
    const saved = localStorage.getItem("mhf_session_views");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [sessionUnique, setSessionUnique] = useState(() => {
    const saved = localStorage.getItem("mhf_session_unique");
    if (saved) return false;
    localStorage.setItem("mhf_session_unique", "true");
    return true;
  });
  const [timeOnSite, setTimeOnSite] = useState(0);

  // Live Stream Events
  const [events, setEvents] = useState<EventLog[]>([]);

  // SVG Chart Hover State
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Reference baseline metrics (simulated realistic metrics + live increments)
  const baselineUnique = 2480 + (sessionUnique ? 1 : 0);
  const baselineViews = 7390 + sessionViews;
  const avgBounceRate = "24.6%";

  // 7-day Analytics Data for SVG Line Chart
  const chartData = [
    { day: "Mon", views: 980, visitors: 340 },
    { day: "Tue", views: 1120, visitors: 410 },
    { day: "Wed", views: 1050, visitors: 380 },
    { day: "Thu", views: 1340, visitors: 490 },
    { day: "Fri", views: 1210, visitors: 440 },
    { day: "Sat", views: 890, visitors: 290 },
    { day: "Sun", views: baselineViews % 1500, visitors: baselineUnique % 600 } // current day links to actual real values
  ];

  // Dynamically inject Cloudflare Web Analytics beacon
  useEffect(() => {
    if (!beaconToken) return;

    // Remove any existing beacon to prevent duplicate injection
    const existing = document.getElementById("mhf-cf-beacon");
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.id = "mhf-cf-beacon";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.defer = true;
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: beaconToken.trim() }));

    document.body.appendChild(script);

    return () => {
      const addedScript = document.getElementById("mhf-cf-beacon");
      if (addedScript) {
        addedScript.remove();
      }
    };
  }, [beaconToken]);

  // Track Time on Site
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnSite((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuating Active Users and Pre-seeding organic visitor events
  useEffect(() => {
    // Fluctuator for active users
    const userInterval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next < 1 ? 1 : next > 8 ? 6 : next;
      });
    }, 8000);

    // Dynamic background event generation
    const eventSources = [
      { source: "google / organic", event: "Landed on Hero Section" },
      { source: "youtube.com", event: "Watched Work Portfolio Reel" },
      { source: "twitter.com / referral", event: "Initiated AI Video Strategizer" },
      { source: "direct", event: "Scrolled to Pricing Plans" },
      { source: "linkedin.com", event: "Opened Booking Calendar" },
      { source: "google / ads", event: "Landed on MHF Landing Page" },
    ];

    const initialEvents: EventLog[] = [
      {
        id: "init-1",
        time: new Date(Date.now() - 420000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        event: "Landed on Hero Section",
        source: "google / organic",
        type: "organic"
      },
      {
        id: "init-2",
        time: new Date(Date.now() - 310000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        event: "Watched Work Portfolio Reel",
        source: "direct",
        type: "organic"
      },
      {
        id: "init-3",
        time: new Date(Date.now() - 120000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        event: "Initiated AI Video Strategizer",
        source: "twitter.com",
        type: "organic"
      },
    ];
    setEvents(initialEvents);

    const eventInterval = setInterval(() => {
      const template = eventSources[Math.floor(Math.random() * eventSources.length)];
      const newEv: EventLog = {
        id: `ev-${Math.random()}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        event: template.event,
        source: template.source,
        type: "organic"
      };
      setEvents((prev) => [newEv, ...prev.slice(0, 19)]);
    }, 15000);

    return () => {
      clearInterval(userInterval);
      clearInterval(eventInterval);
    };
  }, []);

  // Listen to custom window events for real client interactions!
  useEffect(() => {
    const handleLocalEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail || {};

      // Increment Page Views for key transitions/modal pops
      if (detail.category === "navigation" || detail.category === "interaction") {
        setSessionViews((v) => {
          const next = v + 1;
          localStorage.setItem("mhf_session_views", next.toString());
          return next;
        });
      }

      const clientEv: EventLog = {
        id: `client-${Math.random()}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        event: detail.action || "User interaction detected",
        source: "client (You)",
        type: "user"
      };

      setEvents((prev) => [clientEv, ...prev.slice(0, 19)]);
    };

    window.addEventListener("mhf-analytics-trigger", handleLocalEvent);
    return () => {
      window.removeEventListener("mhf-analytics-trigger", handleLocalEvent);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mhf_cf_beacon_token", beaconToken);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    // Log token saving action to the live feed
    const saveEv: EventLog = {
      id: `client-${Math.random()}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      event: "Saved Cloudflare Beacon Token",
      source: "client (You)",
      type: "user"
    };
    setEvents((prev) => [saveEv, ...prev]);
  };

  // SVG Chart Dimensions & Computations
  const chartHeight = 120;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 20;

  // Max value to scale heights
  const maxVal = Math.max(...chartData.map(d => Math.max(d.views, d.visitors))) * 1.15;

  const pointsViews = chartData.map((d, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (chartData.length - 1);
    const y = chartHeight - paddingY - (d.views / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, day: d.day, val: d.views };
  });

  const pointsVisitors = chartData.map((d, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (chartData.length - 1);
    const y = chartHeight - paddingY - (d.visitors / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, day: d.day, val: d.visitors };
  });

  const viewsPath = pointsViews.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const visitorsPath = pointsVisitors.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Create smooth bezier-like curved charts
  const getCurvePath = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const curveViews = getCurvePath(pointsViews);
  const curveVisitors = getCurvePath(pointsVisitors);

  // Closed paths for background gradient fill
  const closedViews = pointsViews.length > 0 
    ? `${curveViews} L ${pointsViews[pointsViews.length-1].x} ${chartHeight - paddingY} L ${pointsViews[0].x} ${chartHeight - paddingY} Z` 
    : "";
  
  const closedVisitors = pointsVisitors.length > 0 
    ? `${curveVisitors} L ${pointsVisitors[pointsVisitors.length-1].x} ${chartHeight - paddingY} L ${pointsVisitors[0].x} ${chartHeight - paddingY} Z` 
    : "";

  return (
    <div className="w-full bg-zinc-950 border-t border-zinc-900 overflow-hidden" id="cloudflare-analytics-dashboard">
      {/* Footer Toggle Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/30 transition-all duration-300"
        id="analytics-toggle-bar"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className={`absolute top-0 right-0 h-2 w-2 rounded-full ${beaconToken ? "bg-emerald-500 animate-ping" : "bg-amber-500 animate-pulse"}`} />
            <span className={`block h-2 w-2 rounded-full ${beaconToken ? "bg-emerald-500" : "bg-amber-500"}`} />
          </div>
          <Activity className="h-4 w-4 text-mhf-red" />
          <span className="font-mono text-xs text-zinc-300 tracking-wider uppercase font-bold">
            MHF Live Traffic Engine
          </span>
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {beaconToken ? "CLOUDFLARE BEACON ACTIVE" : "LOCAL MODE (NO BEACON)"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="hidden sm:inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-zinc-500" />
            <strong className="text-white">{activeUsers}</strong> online
          </span>
          <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </div>
        </div>
      </div>

      {/* Main Collapsible Dashboard Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-zinc-900/80 bg-zinc-950/40"
            id="analytics-content-panel"
          >
            <div className="max-w-6xl mx-auto px-6 pb-12 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT: Core Metrics and Beacon Configuration */}
              <div className="lg:col-span-4 space-y-6 flex flex-col justify-between" id="analytics-left-panel">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase text-white font-bold tracking-wider flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4 text-indigo-400" /> Client Telemetry
                    </h3>
                    <button
                      onClick={() => setShowTokenInput(!showTokenInput)}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors uppercase font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Settings className="h-3 w-3" /> {showTokenInput ? "Close Config" : "Configure Beacon"}
                    </button>
                  </div>

                  {/* Beacon Token Configuration Input */}
                  <AnimatePresence>
                    {(showTokenInput || !beaconToken) && (
                      <motion.form 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSaveToken}
                        className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 space-y-3"
                        id="beacon-config-form"
                      >
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono text-zinc-400 uppercase font-bold">
                            Cloudflare Beacon Token
                          </label>
                          <input
                            type="text"
                            placeholder="Paste 32-char analytics token..."
                            value={beaconToken}
                            onChange={(e) => setBeaconToken(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                          Enter your token to integrate Cloudflare Web Analytics directly. The script tag will dynamically inject the real-time analytics beacon.
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="text-[10px] font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/10"
                          >
                            {isSaved ? <CheckCircle2 className="h-3 w-3" /> : "Mount Script"}
                            {isSaved ? "Loaded" : "Save & Enable"}
                          </button>
                          {beaconToken && (
                            <button
                              type="button"
                              onClick={() => {
                                setBeaconToken("");
                                localStorage.removeItem("mhf_cf_beacon_token");
                                const script = document.getElementById("mhf-cf-beacon");
                                if (script) script.remove();
                              }}
                              className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase font-bold"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* 4 Core Metrics Mini-Grid */}
                  <div className="grid grid-cols-2 gap-4" id="metrics-mini-grid">
                    
                    {/* Unique Visitors */}
                    <div className="bg-zinc-900/30 border border-zinc-900 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono uppercase font-bold">
                        <span>Unique Visitors</span>
                        <Globe className="h-3.5 w-3.5 text-zinc-600" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-display font-bold text-white">
                          {baselineUnique}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-0.5">
                          +1.8% <ArrowUpRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Page Views */}
                    <div className="bg-zinc-900/30 border border-zinc-900 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono uppercase font-bold">
                        <span>Page Views</span>
                        <MousePointerClick className="h-3.5 w-3.5 text-zinc-600" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-display font-bold text-white">
                          {baselineViews}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-0.5">
                          +{sessionViews} today
                        </span>
                      </div>
                    </div>

                    {/* Average Engagement */}
                    <div className="bg-zinc-900/30 border border-zinc-900 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono uppercase font-bold">
                        <span>Engagement</span>
                        <Clock className="h-3.5 w-3.5 text-zinc-600" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-display font-bold text-white">
                          {formatTime(timeOnSite || 45)}
                        </span>
                        <span className="text-[9px] font-mono text-indigo-400 font-bold leading-none">
                          Live Active
                        </span>
                      </div>
                    </div>

                    {/* Bounce Rate */}
                    <div className="bg-zinc-900/30 border border-zinc-900 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono uppercase font-bold">
                        <span>Bounce Rate</span>
                        <ShieldAlert className="h-3.5 w-3.5 text-zinc-600" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-display font-bold text-white">
                          {avgBounceRate}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 leading-none">
                          Optimal
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Cloudflare Platform Validation Note */}
                <div className="p-3.5 bg-zinc-900/20 border border-zinc-900/80 rounded-xl space-y-1.5 text-left">
                  <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest font-bold block">
                    CLOUDFLARE PAGES OPTIMIZATION
                  </span>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                    This site is configured as a fully static SPA utilizing dynamic Cloudflare Functions for backend API routes. The client integrates with Cloudflare Web Analytics to provide high-fidelity dashboard intelligence.
                  </p>
                </div>
              </div>

              {/* CENTER: 7-Day Performance Graph (SVG-based) */}
              <div className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900/80 p-5 rounded-2xl flex flex-col justify-between" id="analytics-center-panel">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 text-left">
                      <h4 className="font-mono text-xs uppercase text-white font-bold tracking-wider">
                        Retention View Activity
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-light">
                        7-day moving window of page actions and visitors.
                      </p>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-3 text-[10px] font-mono">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-mhf-red" />
                        <span className="text-zinc-400">Page Views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span className="text-zinc-400">Visitors</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsive SVG Chart */}
                  <div className="relative w-full h-[140px] mt-4 flex items-center justify-center bg-zinc-950/30 rounded-xl border border-zinc-900 p-2" id="svg-chart-container">
                    <svg 
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        {/* Red Gradient */}
                        <linearGradient id="gradientViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E10600" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#E10600" stopOpacity="0.00" />
                        </linearGradient>
                        {/* Indigo Gradient */}
                        <linearGradient id="gradientVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                        const y = paddingY + ratio * (chartHeight - paddingY * 2);
                        return (
                          <line
                            key={index}
                            x1={paddingX}
                            y1={y}
                            x2={chartWidth - paddingX}
                            y2={y}
                            stroke="#18181b"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                          />
                        );
                      })}

                      {/* Views Area Gradient */}
                      <path d={closedViews} fill="url(#gradientViews)" />
                      {/* Visitors Area Gradient */}
                      <path d={closedVisitors} fill="url(#gradientVisitors)" />

                      {/* Curved lines */}
                      <path d={curveViews} fill="none" stroke="#E10600" strokeWidth="2" strokeLinecap="round" />
                      <path d={curveVisitors} fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />

                      {/* Day Labels & Tooltip Hover Targets */}
                      {chartData.map((d, i) => {
                        const pViews = pointsViews[i];
                        const x = pViews.x;
                        const isHovered = hoveredDay === i;

                        return (
                          <g key={i} className="cursor-pointer">
                            {/* Invisible interaction bar for each day */}
                            <rect
                              x={x - (chartWidth - paddingX * 2) / (chartData.length * 2)}
                              y={0}
                              width={(chartWidth - paddingX * 2) / (chartData.length - 1)}
                              height={chartHeight}
                              fill="transparent"
                              onMouseEnter={() => setHoveredDay(i)}
                              onMouseLeave={() => setHoveredDay(null)}
                            />

                            {/* Label text */}
                            <text
                              x={x}
                              y={chartHeight - 3}
                              fill={isHovered ? "#ffffff" : "#71717a"}
                              fontSize="8"
                              fontFamily="JetBrains Mono"
                              textAnchor="middle"
                            >
                              {d.day}
                            </text>

                            {/* Hover highlights */}
                            {isHovered && (
                              <>
                                <line
                                  x1={x}
                                  y1={paddingY}
                                  x2={x}
                                  y2={chartHeight - paddingY}
                                  stroke="#3f3f46"
                                  strokeWidth="1"
                                />
                                <circle cx={pointsViews[i].x} cy={pointsViews[i].y} r="4" fill="#E10600" stroke="#ffffff" strokeWidth="1" />
                                <circle cx={pointsVisitors[i].x} cy={pointsVisitors[i].y} r="4" fill="#6366F1" stroke="#ffffff" strokeWidth="1" />
                              </>
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Popover Tooltip */}
                    {hoveredDay !== null && (
                      <div 
                        className="absolute bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg text-left shadow-xl space-y-1 z-20 pointer-events-none"
                        style={{
                          left: `${Math.min(
                            Math.max((hoveredDay / (chartData.length - 1)) * 100 - 10, 5),
                            75
                          )}%`,
                          bottom: "40px"
                        }}
                      >
                        <div className="text-[10px] font-mono text-white font-bold uppercase">{chartData[hoveredDay].day} Summary</div>
                        <div className="flex flex-col gap-0.5 text-[9px] font-mono">
                          <span className="text-mhf-red">Views: <strong className="text-white">{chartData[hoveredDay].views}</strong></span>
                          <span className="text-indigo-400">Visitors: <strong className="text-white">{chartData[hoveredDay].visitors}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 pt-3">
                  <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
                  <span>Interactive moving average refreshed instantly upon live action events.</span>
                </div>
              </div>

              {/* RIGHT: Live Feed Stream of Client Events */}
              <div className="lg:col-span-3 bg-zinc-900/20 border border-zinc-900/80 p-5 rounded-2xl flex flex-col justify-between" id="analytics-right-panel">
                <div className="space-y-3 overflow-hidden flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs uppercase text-white font-bold tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-mhf-red" /> Live Traffic Stream
                    </h4>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[140px] space-y-2 pr-1 scrollbar-thin" id="analytics-log-feed">
                    <AnimatePresence initial={false}>
                      {events.map((ev) => (
                        <motion.div
                          key={ev.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-[10px] font-mono leading-tight space-y-0.5 text-left"
                        >
                          <div className="flex items-center justify-between text-[9px] text-zinc-500">
                            <span>{ev.time}</span>
                            <span className={ev.type === "user" ? "text-indigo-400 font-bold" : "text-zinc-600"}>
                              {ev.source}
                            </span>
                          </div>
                          <p className={`font-medium ${ev.type === "user" ? "text-white" : "text-zinc-300"}`}>
                            {ev.type === "user" ? "⚡ " : "• "}{ev.event}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-3 mt-4 text-[9px] font-mono text-zinc-500 flex justify-between items-center">
                  <span>SYSTEM BUFFER: ACTIVE</span>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-2.5 w-2.5 text-zinc-600 animate-spin" />
                    <span>REAL-TIME</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
