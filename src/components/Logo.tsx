import { staticFile } from "remotion";

// Render a monochrome simple-icons SVG tinted to `color` via CSS mask — the exact
// technique dolv-site HeroX uses for its integration dots. The SVG supplies only
// the shape; the color comes from backgroundColor.
export const Logo = ({
  src,
  color,
  size = 56,
}: {
  src: string;
  color: string;
  size?: number;
}) => {
  const url = `url(${staticFile(src)})`;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
};
