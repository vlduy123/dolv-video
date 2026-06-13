import { Composition } from "remotion";
import { DolvPromo } from "./DolvPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="DolvPromo"
      component={DolvPromo}
      durationInFrames={952}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
