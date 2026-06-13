import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { C, INTEGRATIONS } from "../theme";
import { FONT_FAMILY } from "../fonts";
import { Logo } from "../components/Logo";
import { Mark } from "../components/Wordmark";

// Beat 4 (CONNECT): a radial hub. The brand mark is the center; the real
// integrations orbit it, each wired in by a connector line that draws itself,
// with pulse dots flowing INTO the hub — "connect your stack", visualized.
const W = 1040;
const H = 560;
const HUB = { x: 520, y: 280 };
const NODES = [
  { x: 175, y: 118 },
  { x: 865, y: 118 },
  { x: 105, y: 330 },
  { x: 935, y: 330 },
  { x: 520, y: 505 },
];

export const Connect = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heading = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const markIn = spring({ frame: frame - 8, fps, config: { damping: 200, mass: 0.7 } });
  const pulse = 1 + Math.sin(frame / 9) * 0.04;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ textAlign: "center", opacity: heading, transform: `translateY(${interpolate(heading, [0, 1], [14, 0])}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            01 · Connect
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginTop: 4 }}>
            Connect your stack
          </div>
        </div>

        <div style={{ position: "relative", width: W, height: H }}>
          {/* connector lines + flowing pulse dots */}
          <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {NODES.map((n, i) => {
              const len = Math.hypot(HUB.x - n.x, HUB.y - n.y);
              const draw = interpolate(frame, [18 + i * 6, 46 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const t = ((frame * 0.9 + i * 16) % 54) / 54; // 0→1 flow toward hub
              const px = n.x + (HUB.x - n.x) * t;
              const py = n.y + (HUB.y - n.y) * t;
              return (
                <g key={i}>
                  <line
                    x1={n.x}
                    y1={n.y}
                    x2={HUB.x}
                    y2={HUB.y}
                    stroke={C.primary}
                    strokeWidth={2}
                    strokeOpacity={0.35}
                    strokeDasharray={len}
                    strokeDashoffset={len * (1 - draw)}
                  />
                  {draw > 0.95 && (
                    <circle cx={px} cy={py} r={5} fill={C.primary} opacity={Math.sin(t * Math.PI)} />
                  )}
                </g>
              );
            })}
          </svg>

          {/* hub */}
          <div
            style={{
              position: "absolute",
              left: HUB.x,
              top: HUB.y,
              transform: `translate(-50%, -50%) scale(${interpolate(markIn, [0, 1], [0.5, 1]) * pulse})`,
              opacity: markIn,
            }}
          >
            <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: `radial-gradient(circle, ${C.primarySoft} 0%, transparent 70%)` }} />
            <Mark size={108} />
          </div>

          {/* integration nodes */}
          {NODES.map((n, i) => {
            const it = INTEGRATIONS[i];
            const s = spring({ frame: frame - 24 - i * 7, fps, config: { damping: 15, mass: 0.6, stiffness: 120 } });
            return (
              <div
                key={it.label}
                style={{
                  position: "absolute",
                  left: n.x,
                  top: n.y,
                  transform: `translate(-50%, -50%) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
                  opacity: s,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 18px",
                  borderRadius: 18,
                  background: C.card,
                  border: `1px solid ${C.cardBorder}`,
                  boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
                }}
              >
                <Logo src={it.src} color={it.color} size={42} />
                <span style={{ fontSize: 17, fontWeight: 500, color: C.muted, whiteSpace: "nowrap" }}>{it.label}</span>
              </div>
            );
          })}
        </div>

        <span style={{ fontSize: 24, fontWeight: 500, color: C.muted, opacity: interpolate(frame, [70, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Twenty read &amp; write integrations — so dolv can act, not just report.
        </span>
      </div>
    </AbsoluteFill>
  );
};
