export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  visualHighlight: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatar: string;
  quote: string;
  stats: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  views: string;
  aspectRatio: "9:16" | "16:9";
  captionStyle: string;
}

export interface HookOption {
  visual: string;
  verbal: string;
  pacing: string;
}

export interface ScriptSection {
  sectionName: string;
  visualDescription: string;
  spokenLines: string;
}

export interface EditingStyleGuide {
  colorGrading: string;
  soundDesign: string;
  textOverlays: string;
}

export interface StrategyResponse {
  hookOptions: HookOption[];
  scriptFlow: ScriptSection[];
  editingStyleGuide: EditingStyleGuide;
  ctaRecommendation: string;
}

export function triggerAnalyticsEvent(action: string, category: "navigation" | "interaction" | "system" = "interaction") {
  const event = new CustomEvent("mhf-analytics-trigger", {
    detail: { action, category, timestamp: Date.now() }
  });
  window.dispatchEvent(event);
}
