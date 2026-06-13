// Brand tokens — lifted verbatim from dolv-site (consts.ts SITE + DESIGN.md triad).
// Single source of truth; every scene reads colors from here, never inline hexes.
export const C = {
  bg: "#0b0f0e", // SITE.themeDark
  bgGrad2: "#0e1614",
  card: "#10211c",
  cardBorder: "rgba(16,185,129,0.20)",
  primary: "#10b981", // SITE.themeLight — emerald
  primaryDim: "#0c8f63",
  primarySoft: "rgba(16,185,129,0.14)",
  accent: "#f97316", // DESIGN.md tertiary — one hero accent
  text: "#eaf4f0",
  muted: "#86a499",
  white: "#ffffff",
} as const;

// Funnel stages — the exact figures from the Hero mock, with the TOFU/MOFU/BOFU
// names the site's LoopStory uses. `stage` shown in Measure, `label` in Execute.
export const FUNNEL = [
  { stage: "TOFU", label: "Awareness", pct: 94 },
  { stage: "MOFU", label: "Consideration", pct: 66 },
  { stage: "BOFU", label: "Decision", pct: 40 },
] as const;

// The human-in-the-loop micro-flow (LoopStory "Prepare / Approve / Execute").
export const FLOW = [
  { step: "Prepare", note: "grounded draft" },
  { step: "Approve", note: "human in the loop" },
  { step: "Execute", note: "across your tools" },
] as const;

// Capabilities montage — verbatim from Capabilities.astro ("does the work").
export const CAPABILITIES = [
  { icon: "icons/megaphone.svg", label: "Multi-agent campaigns" },
  { icon: "icons/funnel.svg", label: "Funnel intelligence" },
  { icon: "icons/trending-up.svg", label: "Full CRM + lead scoring" },
  { icon: "icons/target.svg", label: "NSM, OKRs + ICE experiments" },
  { icon: "icons/shield.svg", label: "Human-in-the-loop approvals" },
] as const;

// Integration logos copied from dolv-site/public/logos. color = each brand's hue
// (used as the CSS-mask tint, matching the site's HeroX integration dots).
export const INTEGRATIONS = [
  { src: "logos/gmail.svg", color: "#EA4335", label: "Gmail" },
  { src: "logos/linkedin.svg", color: "#0A66C2", label: "LinkedIn" },
  { src: "logos/ga4.svg", color: "#E37400", label: "Analytics 4" },
  { src: "logos/wordpress.svg", color: "#3858E9", label: "WordPress" },
  { src: "logos/searchconsole.svg", color: "#458CF5", label: "Search Console" },
] as const;
