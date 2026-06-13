import { AbsoluteFill } from "remotion";
import { DEFAULT_SPEC, SpecContext, mergeSpec, type Spec } from "./spec";
import { Background } from "./components/Background";
import { Wordmark } from "./components/Wordmark";
import { FONT_FAMILY } from "./fonts";

// A brand image = a single rendered frame ("the same way you create the frame
// picture"). Spec-driven + templated, so it produces on-brand post/blog graphics
// from the same brand spec as the video. Rendered as a STILL (free CI / local),
// then saved to the Asset Library and attached to posts/blogs.
export type ImageTemplate = "announcement" | "quote" | "stat";

export interface BrandImageProps {
  spec?: Partial<Spec>;
  template?: ImageTemplate;
  headline?: string;
  sub?: string;       // announcement subtitle / quote attribution
  statValue?: string; // for the "stat" template, e.g. "3.2x"
}

const grad = (C: Spec["colors"]) => ({
  backgroundImage: `linear-gradient(100deg, ${C.primary} 0%, ${C.mint} 55%, ${C.primary} 100%)`,
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
});

export const BrandImage = ({
  spec: incoming,
  template = "announcement",
  headline = "Don’t just plan it. dolv it.",
  sub = "",
  statValue = "3.2x",
}: BrandImageProps) => {
  const spec = mergeSpec(DEFAULT_SPEC, incoming);
  const C = spec.colors;

  return (
    <SpecContext.Provider value={spec}>
      <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT_FAMILY }}>
        <Background />
        <AbsoluteFill style={{ padding: 84, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* top: wordmark */}
          <Wordmark size={62} fontSize={46} />

          {/* middle: template body */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {template === "announcement" && (
              <>
                <div style={{ fontSize: 86, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, lineHeight: 1.05, maxWidth: 980 }}>
                  {headline}
                </div>
                {sub ? <div style={{ marginTop: 26, fontSize: 32, fontWeight: 500, color: C.muted, maxWidth: 900 }}>{sub}</div> : null}
              </>
            )}

            {template === "quote" && (
              <>
                <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em", color: C.text, lineHeight: 1.25, maxWidth: 1000 }}>
                  <span style={{ color: C.primary }}>“</span>{headline}<span style={{ color: C.primary }}>”</span>
                </div>
                {sub ? <div style={{ marginTop: 30, fontSize: 28, fontWeight: 600, color: C.muted }}>— {sub}</div> : null}
              </>
            )}

            {template === "stat" && (
              <>
                <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, ...grad(C) }}>{statValue}</div>
                <div style={{ marginTop: 16, fontSize: 44, fontWeight: 700, color: C.text, maxWidth: 940 }}>{headline}</div>
                {sub ? <div style={{ marginTop: 16, fontSize: 28, fontWeight: 500, color: C.muted }}>{sub}</div> : null}
              </>
            )}
          </div>

          {/* bottom: url + accent rule */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 56, height: 6, borderRadius: 6, background: C.accent }} />
            <span style={{ fontSize: 30, fontWeight: 600, color: C.muted }}>{spec.cta.url}</span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SpecContext.Provider>
  );
};
