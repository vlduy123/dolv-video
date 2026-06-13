import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { C } from "../theme";
import { FONT_FAMILY } from "../fonts";
import { Wordmark } from "../components/Wordmark";
import { Glow } from "../components/Glow";

// Beat 1 (0–4s): cold open. Brand glow blooms, wordmark springs in, eyebrow
// reveals — the "the AI-native command center" line straight from Hero.astro.
export const ColdOpen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const scale = interpolate(enter, [0, 1], [0.82, 1]);
  const glow = interpolate(frame, [0, 30], [0, 0.55], { extrapolateRight: "clamp" });
  const eyebrow = interpolate(frame, [14, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Concentric rings emanating from the center — continuous, behind the wordmark.
  const rings = [0, 1, 2].map((k) => {
    const p = ((frame + k * 20) % 60) / 60;
    return { size: 220 + p * 760, opacity: (1 - p) * 0.22 * glow };
  });

  return (
    <AbsoluteFill>
      <Glow opacity={glow} size={1200} y="46%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {rings.map((r, k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              width: r.size,
              height: r.size,
              borderRadius: "50%",
              border: `1.5px solid ${C.primary}`,
              opacity: r.opacity,
            }}
          />
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `scale(${scale})`, opacity: enter, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <Wordmark size={132} fontSize={104} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 500,
              fontSize: 30,
              letterSpacing: "0.04em",
              color: C.muted,
              opacity: eyebrow,
              transform: `translateY(${interpolate(eyebrow, [0, 1], [10, 0])}px)`,
            }}
          >
            the AI-native command center
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
