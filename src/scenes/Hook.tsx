import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";

// Beat 2 (4–9s): the hook — the site's exact H1 line.
// "don't just plan it." → "dolv it." (emerald gradient, the brand payoff).
export const Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors: C, hook } = useSpec();

  const line1 = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1Y = interpolate(line1, [0, 1], [22, 0]);

  const pop = spring({ frame: frame - 20, fps, config: { damping: 12, mass: 0.9, stiffness: 120 } });
  const popScale = interpolate(pop, [0, 1], [0.7, 1]);

  const underline = interpolate(frame, [34, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", fontFamily: FONT_FAMILY }}>
        <div
          style={{
            fontSize: 58,
            fontWeight: 600,
            color: C.text,
            opacity: line1,
            transform: `translateY(${line1Y}px)`,
            letterSpacing: "-0.02em",
          }}
        >
          {hook.pre}
        </div>
        <div style={{ position: "relative", display: "inline-block", marginTop: 14, transform: `scale(${popScale})`, opacity: pop }}>
          <span
            style={{
              fontSize: 168,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              backgroundImage: `linear-gradient(100deg, ${C.primary} 0%, ${C.mint} 55%, ${C.primary} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1,
            }}
          >
            {hook.big}
          </span>
          <div
            style={{
              height: 8,
              borderRadius: 8,
              marginTop: 6,
              background: C.accent,
              transformOrigin: "left center",
              transform: `scaleX(${underline})`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
