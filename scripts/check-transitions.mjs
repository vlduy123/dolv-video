#!/usr/bin/env node
// Transition QA — renders stills across every transition boundary (where two
// scenes overlap) plus each beat's midpoint, so collisions are easy to eyeball.
//
//   node scripts/check-transitions.mjs            # 3 samples per transition
//   node scripts/check-transitions.mjs 5          # 5 samples per transition
//
// KEEP THIS TIMING TABLE IN SYNC WITH src/DolvPromo.tsx. The overlap math mirrors
// @remotion/transitions TransitionSeries: beat B starts at A.start + A.dur - T,
// so the transition window is [B.start, B.start + T].

import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";

const COMPOSITION = "DolvPromo";
const FPS = 30;
const OUT_DIR = "out/qa";

// Beats in order, with their pre-overlap durations (frames).
const BEATS = [
  { name: "ColdOpen", dur: 90 },
  { name: "Hook", dur: 120 },
  { name: "Operator", dur: 105 },
  { name: "Connect", dur: 165 },
  { name: "Execute", dur: 195 },
  { name: "Capabilities", dur: 135 },
  { name: "Measure", dur: 135 },
  { name: "Cta", dur: 153 },
];

// Transition duration BETWEEN beat i and i+1 (frames). ease=20, bounce=22.
const TRANSITIONS = [20, 22, 20, 22, 20, 20, 22];

const samples = Math.max(2, Number(process.argv[2]) || 3);

// ── compute absolute frame positions ─────────────────────────────────────────
let pos = 0;
const beatWindows = []; // { name, start, end, mid }
const transitionWindows = []; // { from, to, start, end }

BEATS.forEach((beat, i) => {
  const start = pos;
  const end = pos + beat.dur;
  beatWindows.push({ name: beat.name, start, end, mid: Math.round((start + end) / 2) });
  if (i < BEATS.length - 1) {
    const T = TRANSITIONS[i];
    const wStart = end - T;
    transitionWindows.push({ from: beat.name, to: BEATS[i + 1].name, start: wStart, end });
    pos = end - T; // next beat starts here (overlap)
  } else {
    pos = end;
  }
});

const EXPECTED = 952; // must match Root.tsx Composition durationInFrames (matched to vo.mp3)
const total = pos;
console.log(`Timeline: ${total} frames (${(total / FPS).toFixed(2)}s) · ${BEATS.length} beats · ${TRANSITIONS.length} transitions`);
if (total !== EXPECTED) {
  console.warn(`⚠  Timeline is ${total}f, not ${EXPECTED}f — update DolvPromo durations or the Composition length.`);
}

const clamp = (f) => Math.max(0, Math.min(total - 1, Math.round(f)));

// ── render ────────────────────────────────────────────────────────────────────
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const shots = [];
transitionWindows.forEach((t, ti) => {
  for (let s = 0; s < samples; s++) {
    const f = clamp(t.start + ((t.end - t.start) * s) / (samples - 1));
    const tag = `t${String(ti + 1).padStart(2, "0")}_${t.from}-to-${t.to}_f${String(f).padStart(3, "0")}`;
    shots.push({ frame: f, file: `${OUT_DIR}/${tag}.png` });
  }
});
beatWindows.forEach((b, bi) => {
  shots.push({ frame: clamp(b.mid), file: `${OUT_DIR}/beat${String(bi + 1).padStart(2, "0")}_${b.name}_f${String(clamp(b.mid)).padStart(3, "0")}.png` });
});

console.log(`Rendering ${shots.length} stills → ${OUT_DIR}/ (${samples} per transition)\n`);

let ok = 0;
for (const shot of shots) {
  try {
    execSync(`npx remotion still ${COMPOSITION} "${shot.file}" --frame=${shot.frame}`, { stdio: ["ignore", "ignore", "pipe"] });
    console.log(`  ✓ f${String(shot.frame).padStart(3, " ")}  ${shot.file}`);
    ok++;
  } catch (e) {
    console.error(`  ✗ f${shot.frame}  FAILED: ${String(e.stderr || e).split("\n")[0]}`);
  }
}

console.log(`\nDone: ${ok}/${shots.length} rendered. Open ${OUT_DIR}/ — transition shots are prefixed tNN_, beat midpoints beatNN_.`);
