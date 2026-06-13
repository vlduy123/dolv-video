import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";
import { Logo } from "../components/Logo";

// Beat 6 (NEW): capabilities montage. The 5 "does the work" rows from
// Capabilities.astro fire in fast as emerald line-icon chips — raises the
// information rate without padding the runtime.
export const Capabilities = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors: C, capabilities } = useSpec();
  const CAPABILITIES = capabilities.items;

  const heading = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, width: 1080 }}>
        <div style={{ textAlign: "center", opacity: heading, transform: `translateY(${interpolate(heading, [0, 1], [12, 0])}px)` }}>
          <span style={{ fontSize: 28, fontWeight: 600, color: C.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {capabilities.kicker}
          </span>
          <div style={{ fontSize: 56, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginTop: 4 }}>
            {capabilities.title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          {CAPABILITIES.map((cap, i) => {
            const s = spring({ frame: frame - 18 - i * 9, fps, config: { damping: 16, mass: 0.5, stiffness: 130 } });
            return (
              <div
                key={cap.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "22px 30px",
                  borderRadius: 18,
                  background: C.card,
                  border: `1px solid ${C.cardBorder}`,
                  transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)`,
                  opacity: s,
                }}
              >
                <span
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 12,
                    background: C.primarySoft,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {cap.icon ? <Logo src={cap.icon} color={C.primary} size={30} /> : <span style={{ width: 18, height: 18, borderRadius: 5, background: C.primary }} />}
                </span>
                <span style={{ fontSize: 34, fontWeight: 600, color: C.text }}>{cap.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
