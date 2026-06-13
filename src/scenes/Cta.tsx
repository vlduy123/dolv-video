import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { C } from "../theme";
import { FONT_FAMILY } from "../fonts";
import { Wordmark } from "../components/Wordmark";
import { Glow } from "../components/Glow";

// Beat 8: the payoff. Wordmark + "dolv it." + Open dolv / app.dolv.work.
export const Cta = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 14, mass: 0.9, stiffness: 120 } });
  const sub = interpolate(frame, [16, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const btn = spring({ frame: frame - 26, fps, config: { damping: 16, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <Glow opacity={0.5} size={1300} y="50%" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.78, 1])})`, opacity: pop }}>
          <Wordmark size={92} fontSize={72} />
        </div>
        <div
          style={{
            fontSize: 148,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            backgroundImage: `linear-gradient(100deg, ${C.primary} 0%, #34e0ab 55%, ${C.primary} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`,
            opacity: pop,
          }}
        >
          dolv it.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [12, 0])}px)` }}>
          <span
            style={{
              padding: "18px 38px",
              borderRadius: 999,
              fontSize: 30,
              fontWeight: 700,
              color: C.bg,
              background: C.primary,
              transform: `scale(${interpolate(btn, [0, 1], [0.9, 1])})`,
            }}
          >
            Open dolv →
          </span>
          <span style={{ fontSize: 32, fontWeight: 500, color: C.muted }}>app.dolv.work</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
