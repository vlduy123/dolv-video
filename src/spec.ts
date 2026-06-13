import { createContext, useContext } from "react";
import { C, FUNNEL, FLOW, CAPABILITIES, INTEGRATIONS } from "./theme";

// ── The video SPEC: all brand content as data, so the same composition renders
// any brand. DEFAULT_SPEC reproduces the dolv promo verbatim. The dolv app
// exports a spec of this shape; the CI/local render passes it via --props.
export type Colors = typeof C;
export interface Integration { src?: string; color: string; label: string }
export interface Flow { step: string; note: string }
export interface Capability { icon?: string; label: string }
export interface FunnelRow { stage: string; label: string; pct: number }

export interface Spec {
  colors: Colors;
  voUrl?: string;     // remote VO mp3 URL — overrides the bundled file
  bundledVo?: string; // staticFile name in public/ for the default VO
  open: { name: string; sub: string };
  hook: { pre: string; big: string };
  operator: { accent: string; strike: string; sub: string };
  connect: { kicker: string; title: string; caption: string; integrations: Integration[] };
  execute: { kicker: string; flow: Flow[]; cardTitle: string; footer: string; chip: string };
  capabilities: { kicker: string; title: string; items: Capability[] };
  measure: { kicker: string; tail: string };
  funnel: FunnelRow[]; // shared by the Execute card rows + the Measure numbers
  cta: { big: string; button: string; url: string };
}

export const DEFAULT_SPEC: Spec = {
  colors: C,
  bundledVo: "vo.mp3",
  open: { name: "dolv.ai", sub: "the AI-native command center" },
  hook: { pre: "don’t just plan it.", big: "dolv it." },
  operator: { accent: "operator", strike: "chatbot", sub: "It acts on your stack — not just reports on it." },
  connect: {
    kicker: "01 · Connect",
    title: "Connect your stack",
    caption: "Twenty read & write integrations — so dolv can act, not just report.",
    integrations: INTEGRATIONS.map((i) => ({ src: i.src, color: i.color, label: i.label })),
  },
  execute: {
    kicker: "02 · Execute real work",
    flow: FLOW.map((f) => ({ step: f.step, note: f.note })),
    cardTitle: "dolv · command center",
    footer: "Outreach sent — measuring",
    chip: "Execute → Measure",
  },
  capabilities: {
    kicker: "Capabilities",
    title: "It does the work",
    items: CAPABILITIES.map((c) => ({ icon: c.icon, label: c.label })),
  },
  measure: { kicker: "03 · Measure every outcome", tail: "qualified pipeline" },
  funnel: FUNNEL.map((f) => ({ stage: f.stage, label: f.label, pct: f.pct })),
  cta: { big: "dolv it.", button: "Open dolv →", url: "app.dolv.work" },
};

// Merge an incoming (possibly partial) spec over DEFAULT_SPEC so callers can
// override just colors, just copy, etc. Nested objects merge one level deep;
// arrays (integrations/items/funnel) are replaced wholesale when provided.
export function mergeSpec(base: Spec, over?: Partial<Spec>): Spec {
  if (!over) return base;
  const o = over as any;
  return {
    ...base,
    ...o,
    colors: { ...base.colors, ...(o.colors || {}) },
    open: { ...base.open, ...(o.open || {}) },
    hook: { ...base.hook, ...(o.hook || {}) },
    operator: { ...base.operator, ...(o.operator || {}) },
    connect: { ...base.connect, ...(o.connect || {}) },
    execute: { ...base.execute, ...(o.execute || {}) },
    capabilities: { ...base.capabilities, ...(o.capabilities || {}) },
    measure: { ...base.measure, ...(o.measure || {}) },
    cta: { ...base.cta, ...(o.cta || {}) },
    funnel: o.funnel || base.funnel,
  };
}

export const SpecContext = createContext<Spec>(DEFAULT_SPEC);
export const useSpec = () => useContext(SpecContext);
