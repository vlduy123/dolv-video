import { useSpec } from "../spec";
import { FONT_FAMILY } from "../fonts";

// The brand mark (emerald rounded square + white glyph, inlined from favicon.svg)
// next to the wordmark. Colors + the wordmark name come from the active spec.
export const Mark = ({ size = 120 }: { size?: number }) => {
  const { colors: C } = useSpec();
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" role="img" aria-label="brand mark">
      <rect width="256" height="256" rx="56" fill={C.primary} />
      <g fill={C.white}>
        <rect x="150" y="46" width="34" height="168" rx="17" />
        <path
          fillRule="evenodd"
          d="M42 150a62 62 0 1 0 124 0a62 62 0 1 0-124 0M88 122 130 150 88 178Z"
        />
      </g>
    </svg>
  );
};

export const Wordmark = ({
  size = 120,
  fontSize = 88,
}: {
  size?: number;
  fontSize?: number;
}) => {
  const { colors: C, open } = useSpec();
  const name = open.name || "dolv.ai";
  const dot = name.indexOf(".");
  const pre = dot > -1 ? name.slice(0, dot) : name;
  const post = dot > -1 ? name.slice(dot) : "";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.22 }}>
      <Mark size={size} />
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize,
          letterSpacing: "-0.03em",
          color: C.text,
        }}
      >
        {pre}
        <span style={{ color: C.primary }}>{post}</span>
      </span>
    </div>
  );
};
