import { AbsoluteFill, Audio, Easing, staticFile } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { DEFAULT_SPEC, SpecContext, mergeSpec, type Spec } from "./spec";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { Background } from "./components/Background";
import { Noise } from "./components/Noise";
import { ColdOpen } from "./scenes/ColdOpen";
import { Hook } from "./scenes/Hook";
import { Operator } from "./scenes/Operator";
import { Connect } from "./scenes/Connect";
import { Execute } from "./scenes/Execute";
import { Capabilities } from "./scenes/Capabilities";
import { Measure } from "./scenes/Measure";
import { Cta } from "./scenes/Cta";

// ~31.7s @ 30fps = 952f, matched to the vo.mp3 length (Cta holds while the last
// line plays). 8 beats joined by real transitions (TransitionSeries). Sequence
// durations sum to 1098; transitions overlap (ease=20f, bounce=22f → 4×20 + 3×22
// = 146f), netting 1098 - 146 = 952. Keep durations in sync with Root.tsx
// (durationInFrames) and scripts/check-transitions.mjs.
const ease = linearTiming({ durationInFrames: 20, easing: Easing.inOut(Easing.cubic) });
const bounce = springTiming({ config: { damping: 26, mass: 0.9 }, durationInFrames: 22 });

export const DolvPromo = ({ spec: incoming }: { spec?: Partial<Spec> }) => {
  const spec = mergeSpec(DEFAULT_SPEC, incoming);
  const audioSrc = spec.voUrl || (spec.bundledVo ? staticFile(spec.bundledVo) : null);
  return (
    <SpecContext.Provider value={spec}>
      <AbsoluteFill style={{ backgroundColor: spec.colors.bg }}>
        {audioSrc ? <Audio src={audioSrc} /> : null}
        <Background />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <ColdOpen />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={ease} />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={bounce} />
        <TransitionSeries.Sequence durationInFrames={105}>
          <Operator />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={clockWipe({ width: 1920, height: 1080 })} timing={ease} />
        <TransitionSeries.Sequence durationInFrames={165}>
          <Connect />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={bounce} />
        <TransitionSeries.Sequence durationInFrames={195}>
          <Execute />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={ease} />
        <TransitionSeries.Sequence durationInFrames={135}>
          <Capabilities />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={ease} />
        <TransitionSeries.Sequence durationInFrames={135}>
          <Measure />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={bounce} />
        <TransitionSeries.Sequence durationInFrames={153}>
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* grain over the whole comp too, so transitions stay textured */}
      <Noise opacity={0.035} />
      </AbsoluteFill>
    </SpecContext.Provider>
  );
};
