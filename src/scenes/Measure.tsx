import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";

// Beat 7: MEASURE. The funnel figures count up under their real TOFU/MOFU/BOFU
// names (LoopStory) and resolve to "qualified pipeline".
export const Measure = () => {
  const frame = useCurrentFrame();
  const { colors: C, measure, funnel: FUNNEL } = useSpec();

  const heading = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tail = interpolate(frame, [64, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: C.primary, letterSpacing: "0.12em", textTransform: "uppercase", opacity: heading }}>
          {measure.kicker}
        </span>
        <div style={{ display: "flex", gap: 80, alignItems: "flex-end" }}>
          {FUNNEL.map((m, i) => {
            const start = 8 + i * 9;
            const val = interpolate(frame, [start, start + 46], [0, m.pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.muted, letterSpacing: "0.1em" }}>{m.stage}</div>
                <div style={{ fontSize: 124, fontWeight: 800, color: C.text, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                  {Math.round(val)}<span style={{ color: C.primary }}>%</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 500, color: C.muted }}>{m.label}</div>
              </div>
            );
          })}
        </div>
        {/* climbing sparkline — the "measured over time" trend */}
        <svg width={820} height={120} style={{ overflow: "visible" }}>
          {(() => {
            const pts = [
              [0, 104], [120, 92], [240, 96], [360, 70], [480, 58], [600, 40], [700, 28], [820, 10],
            ];
            const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
            const total = 1100;
            const draw = interpolate(frame, [18, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const head = pts[Math.min(pts.length - 1, Math.floor(draw * (pts.length - 1)))];
            return (
              <>
                <line x1={0} y1={118} x2={820} y2={118} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
                <path d={d} fill="none" stroke={C.primary} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={total} strokeDashoffset={total * (1 - draw)} />
                <circle cx={head[0]} cy={head[1]} r={7} fill={C.primary} opacity={draw > 0.05 ? 1 : 0} />
              </>
            );
          })()}
        </svg>

        <span style={{ fontSize: 30, fontWeight: 600, color: C.text, opacity: tail, transform: `translateY(${interpolate(tail, [0, 1], [10, 0])}px)` }}>
          → measured into <span style={{ color: C.primary }}>{measure.tail}</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
