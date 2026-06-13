import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";

// Beat 3 (NEW): the differentiator. Proof.astro "Operator, not a chatbot" +
// IntegrationsStrip "act, not just report". The single line that positions dolv.
export const Operator = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors: C, operator } = useSpec();

  const pop = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 120 } });
  const strike = interpolate(frame, [26, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: C.text,
            transform: `scale(${interpolate(pop, [0, 1], [0.86, 1])})`,
            opacity: pop,
            lineHeight: 1.05,
          }}
        >
          An <span style={{ color: C.primary }}>{operator.accent}</span>,
          <br />
          not a{" "}
          <span style={{ position: "relative", display: "inline-block", color: C.muted }}>
            {operator.strike}
            <span
              style={{
                position: "absolute",
                left: -4,
                right: -4,
                top: "52%",
                height: 7,
                background: C.accent,
                borderRadius: 6,
                transformOrigin: "left center",
                transform: `scaleX(${strike})`,
              }}
            />
          </span>
          .
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 36,
            fontWeight: 500,
            color: C.muted,
            opacity: sub,
            transform: `translateY(${interpolate(sub, [0, 1], [12, 0])}px)`,
          }}
        >
          {operator.sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};
