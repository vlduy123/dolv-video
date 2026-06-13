import { AbsoluteFill } from "remotion";
import { C } from "../theme";

// Soft radial brand wash — the "glow" the site uses behind the hero. Position +
// size + opacity are caller-driven so each scene can place its own light source.
export const Glow = ({
  x = "50%",
  y = "50%",
  size = 1100,
  opacity = 0.5,
  color = C.primary,
}: {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
  color?: string;
}) => {
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
          background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
          opacity,
          filter: "blur(8px)",
        }}
      />
    </AbsoluteFill>
  );
};
