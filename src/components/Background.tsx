import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, INTEGRATIONS } from "../theme";
import { Logo } from "./Logo";
import { Noise } from "./Noise";

// Persistent, layered, living backdrop — runs the full 900f under every beat.
// Layers (back → front): base gradient · drifting mesh blobs (parallax depth) ·
// dot grid · ambient floating integration glyphs · diagonal light sweep ·
// vignette · film grain. The point: the frame is never empty.

const Blob = ({ x, y, size, color, op }: { x: string; y: string; size: number; color: string; op: number }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      transform: "translate(-50%, -50%)",
      background: `radial-gradient(circle, ${color} 0%, transparent 62%)`,
      opacity: op,
      filter: "blur(14px)",
    }}
  />
);

export const Background = () => {
  const frame = useCurrentFrame();

  // Parallax drift — each layer moves at its own speed for depth.
  const slow = interpolate(frame, [0, 900], [0, 1]);
  const dx1 = Math.sin(slow * Math.PI * 2) * 70;
  const dy1 = Math.cos(slow * Math.PI * 2) * 50;
  const dx2 = Math.cos(slow * Math.PI * 2) * 90;
  const gridShift = interpolate(frame, [0, 900], [0, 120]);
  const sweep = interpolate(frame, [0, 900], [-30, 130]);

  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 120% at 50% 18%, ${C.bgGrad2} 0%, ${C.bg} 60%)` }}>
      {/* mesh blobs */}
      <AbsoluteFill style={{ transform: `translate(${dx1}px, ${dy1}px)` }}>
        <Blob x="26%" y="30%" size={1200} color={C.primary} op={0.16} />
        <Blob x="80%" y="68%" size={1000} color="#0ea5a0" op={0.12} />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translate(${dx2}px, 0)` }}>
        <Blob x="62%" y="22%" size={760} color={C.accent} op={0.05} />
      </AbsoluteFill>

      {/* drifting dot grid (masked to fade at edges) */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, rgba(16,185,129,0.16) 1.4px, transparent 1.6px)`,
          backgroundSize: "46px 46px",
          backgroundPosition: `${gridShift}px ${gridShift * 0.6}px`,
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 40%, #000 35%, transparent 78%)",
          maskImage: "radial-gradient(120% 100% at 50% 40%, #000 35%, transparent 78%)",
          opacity: 0.7,
        }}
      />

      {/* ambient floating integration glyphs — low opacity brand context in the periphery */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {INTEGRATIONS.map((it, i) => {
          const baseY = [16, 74, 30, 82, 52][i] ?? 50;
          const baseX = [9, 16, 88, 80, 50][i] ?? 50;
          const float = Math.sin((slow * Math.PI * 2) + i) * 18;
          const size = [120, 90, 150, 100, 80][i] ?? 100;
          return (
            <div
              key={it.label}
              style={{
                position: "absolute",
                left: `${baseX}%`,
                top: `calc(${baseY}% + ${float}px)`,
                opacity: 0.05,
                transform: `rotate(${i * 7 - 14}deg)`,
              }}
            >
              <Logo src={it.src} color={C.primary} size={size} />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* slow diagonal light sweep */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(115deg, transparent ${sweep - 18}%, rgba(16,185,129,0.06) ${sweep}%, transparent ${sweep + 18}%)`,
          pointerEvents: "none",
        }}
      />

      {/* vignette + grain */}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 480px 150px rgba(0,0,0,0.6)", pointerEvents: "none" }} />
      <Noise opacity={0.05} />
    </AbsoluteFill>
  );
};
