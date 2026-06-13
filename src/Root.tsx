import { Composition, Still } from "remotion";
import { DolvPromo } from "./DolvPromo";
import { BrandImage } from "./BrandImage";
import { DEFAULT_SPEC } from "./spec";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DolvPromo"
        component={DolvPromo}
        durationInFrames={952}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ spec: DEFAULT_SPEC }}
      />
      <Still
        id="BrandImage"
        component={BrandImage}
        width={1200}
        height={630}
        defaultProps={{ spec: DEFAULT_SPEC, template: "announcement" as const, headline: "Don’t just plan it. dolv it.", sub: "", statValue: "3.2x" }}
      />
    </>
  );
};
