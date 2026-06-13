import { AbsoluteFill } from "remotion";
import { useSpec } from "../spec";

// Soft radial brand wash — the "glow" the site uses behind the hero. Position +
// size + opacity are caller-driven; color defaults to the spec's primary.
export const Glow = ({
  x = "50%",
  y = "50%",
  size = 1100,
  opacity = 0.5,
  color,
}: {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
  color?: string;
}) => {
  const { colors: C } = useSpec();
  const c = color || C.primary;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${c} 0%, transparent 68%)`,
          opacity,
          filter: "blur(8px)",
        }}
      />
    </AbsoluteFill>
  );
};
