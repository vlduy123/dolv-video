import { staticFile, delayRender, continueRender } from "remotion";

// Load the REAL Manrope.woff2 shipped by dolv-site (public/fonts). Module-level
// FontFace load gated by delayRender so neither the Studio preview nor the render
// paints before the brand font is ready. Fail-open: any error still continues.
export const FONT_FAMILY = "Manrope";

const handle = delayRender("Loading Manrope");
const face = new FontFace(
  FONT_FAMILY,
  `url(${staticFile("fonts/Manrope.woff2")}) format("woff2")`,
  { weight: "200 800", display: "swap" },
);
face
  .load()
  .then((loaded) => {
    document.fonts.add(loaded);
    continueRender(handle);
  })
  .catch(() => continueRender(handle));
