import { AbsoluteFill, useCurrentFrame } from "remotion";

// Subtle animated film grain (SVG turbulence) over everything — gives the frame
// texture so flat-color areas never look dead. Cheap; opacity intentionally tiny.
export const Noise = ({ opacity = 0.05 }: { opacity?: number }) => {
  const frame = useCurrentFrame();
  const seed = (frame % 12) + 1; // re-roll the pattern a few times/sec for shimmer
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
