import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";

// Beat 5 (15–19s): EXECUTE. The human-in-the-loop flow (Prepare → Approve →
// Execute) lights up across the top, then the command-center card from the Hero
// mock — funnel bars filling 94/66/40 + the "Outreach sent — measuring" row.
export const Execute = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors: C, execute, funnel: FUNNEL } = useSpec();
  const FLOW = execute.flow;

  const card = spring({ frame: frame - 30, fps, config: { damping: 200, mass: 0.8 } });
  const footIn = interpolate(frame, [108, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        {/* phase label */}
        <span style={{ fontSize: 28, fontWeight: 600, color: C.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {execute.kicker}
        </span>

        {/* Prepare → Approve → Execute stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {FLOW.map((f, i) => {
            const lit = interpolate(frame, [6 + i * 13, 16 + i * 13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={f.step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: "14px 26px",
                    borderRadius: 14,
                    background: `rgba(16,185,129,${0.04 + lit * 0.12})`,
                    border: `1px solid rgba(16,185,129,${0.12 + lit * 0.4})`,
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 700, color: lit > 0.5 ? C.primary : C.muted }}>{f.step}</span>
                  <span style={{ fontSize: 17, fontWeight: 500, color: C.muted }}>{f.note}</span>
                </div>
                {i < FLOW.length - 1 && (
                  <span style={{ fontSize: 30, color: C.muted, opacity: interpolate(frame, [12 + i * 13, 20 + i * 13], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* command-center card */}
        <div
          style={{
            width: 1120,
            borderRadius: 26,
            background: "rgba(13,22,19,0.92)",
            border: `1px solid ${C.cardBorder}`,
            boxShadow: "0 40px 110px rgba(0,0,0,0.55)",
            overflow: "hidden",
            transform: `translateY(${interpolate(card, [0, 1], [40, 0])}px) scale(${interpolate(card, [0, 1], [0.95, 1])})`,
            opacity: card,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 28px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
            <span style={{ display: "flex", gap: 8 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <i key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
            </span>
            <span style={{ fontSize: 22, fontWeight: 600, color: C.text, marginLeft: 6 }}>{execute.cardTitle}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 600, color: C.primary }}>
              <i style={{ width: 10, height: 10, borderRadius: "50%", background: C.primary, boxShadow: `0 0 0 4px ${C.primarySoft}` }} />
              live
            </span>
          </div>

          <div style={{ padding: "30px 40px 22px", display: "flex", flexDirection: "column", gap: 22 }}>
            {FUNNEL.map((row, i) => {
              const start = 44 + i * 14;
              const fill = interpolate(frame, [start, start + 42], [0, row.pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <span style={{ width: 260, fontSize: 27, fontWeight: 500, color: C.text }}>{row.label}</span>
                  <div style={{ flex: 1, height: 22, borderRadius: 11, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ width: `${fill}%`, height: "100%", borderRadius: 11, background: `linear-gradient(90deg, ${C.primaryDim}, ${C.primary})` }} />
                  </div>
                  <span style={{ width: 72, textAlign: "right", fontSize: 25, fontWeight: 700, color: C.primary }}>{Math.round(fill)}%</span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "20px 40px",
              borderTop: `1px solid rgba(255,255,255,0.06)`,
              background: "rgba(16,185,129,0.05)",
              opacity: footIn,
            }}
          >
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: C.primary, display: "grid", placeItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.bg} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m20 6-11 11-5-5" />
              </svg>
            </span>
            <span style={{ fontSize: 24, fontWeight: 500, color: C.text }}>{execute.footer}</span>
            <span style={{ marginLeft: "auto", padding: "9px 18px", borderRadius: 999, fontSize: 20, fontWeight: 600, color: C.primary, background: C.primarySoft, border: `1px solid ${C.cardBorder}` }}>
              {execute.chip}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
