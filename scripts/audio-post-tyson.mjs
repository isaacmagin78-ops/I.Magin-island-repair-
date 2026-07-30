/**
 * Audio post for the TysonVsMiss short. Rebuilds the soundtrack as a mix of:
 *   1. the render's own (already duck-automated) camera audio at 40%
 *   2. a synthesized warm/playful instrumental bed at ~15%
 *   3. small comedic SFX covering the concealed-cough gaps, synced to action
 * The video stream is copied untouched. Everything is generated in code —
 * no external/stock audio — so the result is royalty-free by construction.
 *
 * Usage: node scripts/audio-post-tyson.mjs <in.mp4> <out.mp4>
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , IN = "out/tyson-vs-miss-vertical.mp4", OUT = "out/tyson-vs-miss-final-mix.mp4"] =
  process.argv;

const SR = 48000;
const CH = 2;
const work = mkdtempSync(join(tmpdir(), "tyson-mix-"));
const ff = (args) => execFileSync("npx", ["remotion", "ffmpeg", ...args], { stdio: "pipe" });

// ---------- helpers ----------
const readWavData = (path) => {
  const b = readFileSync(path);
  let p = 12;
  while (p + 8 <= b.length) {
    const id = b.toString("ascii", p, p + 4);
    const sz = b.readUInt32LE(p + 4);
    if (id === "data") return { buf: b, off: p + 8, bytes: sz };
    p += 8 + sz + (sz % 2);
  }
  throw new Error("no data chunk in " + path);
};

const writeWav = (path, left, right) => {
  const n = left.length;
  const data = Buffer.alloc(n * 2 * CH);
  for (let i = 0; i < n; i++) {
    data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(left[i] * 32767))), i * 4);
    data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(right[i] * 32767))), i * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write("WAVEfmt ", 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(CH, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * CH * 2, 28);
  h.writeUInt16LE(CH * 2, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([h, data]));
};

// ---------- 1. extract camera audio ----------
const camWavPath = join(work, "cam.wav");
ff(["-y", "-i", IN, "-map", "0:a", "-ar", String(SR), "-ac", String(CH), "-c:a", "pcm_s16le", "-f", "wav", camWavPath]);
const cam = readWavData(camWavPath);
const N = Math.floor(cam.bytes / (2 * CH));
const durationSec = N / SR;
const camL = new Float64Array(N);
const camR = new Float64Array(N);
for (let i = 0; i < N; i++) {
  camL[i] = cam.buf.readInt16LE(cam.off + i * 4) / 32768;
  camR[i] = cam.buf.readInt16LE(cam.off + i * 4 + 2) / 32768;
}

// ---------- 2. synthesize the music bed ----------
// Warm, playful, modern: kalimba-style plucks (Karplus-Strong) over a soft
// sine bass, ukulele-ish strummed triads, and an airy shaker. C major,
// I–V–vi–IV, 112 BPM. Deterministic (seeded) so renders are reproducible.
let seed = 20260721;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const musL = new Float64Array(N);
const musR = new Float64Array(N);
const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

const pluck = (dest, tSec, hz, amp, sustain = 0.994, pan = 0.5) => {
  // Karplus-Strong string with a soft (lowpassed) exciter for warmth.
  const start = Math.floor(tSec * SR);
  if (start >= N) return;
  const period = Math.max(2, Math.round(SR / hz));
  const line = new Float64Array(period);
  let prevNoise = 0;
  for (let i = 0; i < period; i++) {
    const n = rand() * 2 - 1;
    prevNoise = 0.6 * prevNoise + 0.4 * n;
    line[i] = prevNoise;
  }
  const len = Math.min(N - start, Math.floor(SR * 1.6));
  let idx = 0;
  for (let i = 0; i < len; i++) {
    const cur = line[idx];
    const nxt = line[(idx + 1) % period];
    line[idx] = sustain * 0.5 * (cur + nxt);
    idx = (idx + 1) % period;
    const v = cur * amp;
    dest.l[start + i] += v * (1 - pan);
    dest.r[start + i] += v * pan;
  }
};

const bassNote = (tSec, hz, amp, lenSec) => {
  const start = Math.floor(tSec * SR);
  const len = Math.min(N - start, Math.floor(lenSec * SR));
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.02) * Math.exp(-2.2 * t);
    const v = (Math.sin(2 * Math.PI * hz * t) + 0.25 * Math.sin(4 * Math.PI * hz * t)) * amp * env;
    musL[start + i] += v;
    musR[start + i] += v;
  }
};

const shaker = (tSec, amp) => {
  const start = Math.floor(tSec * SR);
  const len = Math.min(N - start, Math.floor(0.07 * SR));
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const n = rand() * 2 - 1;
    lp = 0.55 * lp + 0.45 * n; // tame the top end
    const env = Math.exp(-45 * (i / SR));
    const v = (n - lp) * amp * env; // highpassed noise = shaker hiss
    musL[start + i] += v * 0.8;
    musR[start + i] += v * 1.2;
  }
};

const BPM = 112;
const beat = 60 / BPM;
const bars = Math.ceil(durationSec / (4 * beat));
// C major: C, G, Am, F (midi triads) — warm and upbeat.
const CHORDS = [
  { root: 36, triad: [60, 64, 67] }, // C
  { root: 43, triad: [59, 62, 67] }, // G
  { root: 45, triad: [60, 64, 69] }, // Am
  { root: 41, triad: [60, 65, 69] }, // F
];
const MELODY_POOL = [72, 74, 76, 79, 81, 84]; // C pentatonic, upper octave
const dest = { l: musL, r: musR };
for (let bar = 0; bar < bars; bar++) {
  const t0 = bar * 4 * beat;
  const ch = CHORDS[bar % 4];
  // bass on 1 and 3
  bassNote(t0, midiHz(ch.root), 0.24, 0.55);
  bassNote(t0 + 2 * beat, midiHz(ch.root), 0.19, 0.5);
  // ukulele-ish strums on 1 and the "and" of 2 (staggered notes)
  for (const [si, strumT] of [t0, t0 + 1.5 * beat].entries()) {
    ch.triad.forEach((m, i) => {
      pluck(dest, strumT + i * 0.014, midiHz(m), si === 0 ? 0.16 : 0.12, 0.9935, 0.35 + i * 0.15);
    });
  }
  // sparse kalimba melody on offbeats
  for (const b of [1, 2.5, 3.5]) {
    if (rand() < 0.75) {
      const m = MELODY_POOL[Math.floor(rand() * MELODY_POOL.length)];
      pluck(dest, t0 + b * beat, midiHz(m), 0.11, 0.9955, rand() < 0.5 ? 0.3 : 0.7);
    }
  }
  // shaker eighths, offbeats accented
  for (let e = 0; e < 8; e++) shaker(t0 + e * 0.5 * beat, e % 2 ? 0.05 : 0.028);
}
// gentle overall warmth: one-pole lowpass ~6.5kHz
{
  const a = Math.exp((-2 * Math.PI * 6500) / SR);
  let l = 0,
    r = 0;
  for (let i = 0; i < N; i++) {
    l = a * l + (1 - a) * musL[i];
    r = a * r + (1 - a) * musR[i];
    musL[i] = l;
    musR[i] = r;
  }
}
// normalize music to 0.9 peak
{
  let peak = 0;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(musL[i]), Math.abs(musR[i]));
  const g = peak > 0 ? 0.9 / peak : 1;
  for (let i = 0; i < N; i++) {
    musL[i] *= g;
    musR[i] *= g;
  }
}

// ---------- 3. comedic SFX over the concealed-cough gaps ----------
const sfxL = new Float64Array(N);
const sfxR = new Float64Array(N);
const boing = (tSec, amp) => {
  // springy pitch wobble sliding up — classic gentle cartoon boing
  const start = Math.floor(tSec * SR);
  const len = Math.min(N - start, Math.floor(0.42 * SR));
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const hz = 320 + 320 * (t / 0.42) + 70 * Math.sin(2 * Math.PI * 13 * t) * Math.exp(-4 * t);
    phase += (2 * Math.PI * hz) / SR;
    const env = Math.min(1, t / 0.012) * Math.exp(-7.5 * t);
    const v = Math.sin(phase) * amp * env;
    sfxL[start + i] += v;
    sfxR[start + i] += v;
  }
};
const pop = (tSec, amp) => {
  // short pitch-drop "plok"
  const start = Math.floor(tSec * SR);
  const len = Math.min(N - start, Math.floor(0.09 * SR));
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const hz = 620 * Math.exp(-14 * t) + 130;
    phase += (2 * Math.PI * hz) / SR;
    const env = Math.min(1, t / 0.004) * Math.exp(-38 * t);
    const v = Math.sin(phase) * amp * env;
    sfxL[start + i] += v;
    sfxR[start + i] += v;
  }
};
// Output-timeline placement (video edit unchanged):
//  4.78s — kitten's boldest strut right as the long cough-duck opens (boing)
//  6.40s — kitten pops through under Tyson during the mid duck (pop)
// 10.50s — small pop as Tyson commits to the camera during the last duck
boing(4.78, 0.3);
pop(6.4, 0.3);
pop(10.5, 0.24);

// ---------- 4. mix ----------
const CAM_GAIN = 0.4;
const MUSIC_GAIN = 0.15;
const SFX_GAIN = 0.8; // SFX synthesized at low amp already
// Lift the whole program to a platform-ready level (peak ≈ -1 dBFS) while
// preserving the 40/15 balance between stems. The tanh limiter below
// catches any excursions.
const MASTER_GAIN = 2.6;
const outL = new Float64Array(N);
const outR = new Float64Array(N);
const fadeIn = Math.floor(0.03 * SR);
const fadeOut = Math.floor(0.45 * SR); // matches the video's end fade
for (let i = 0; i < N; i++) {
  let g = 1;
  if (i < fadeIn) g = i / fadeIn;
  if (i > N - fadeOut) g = Math.min(g, Math.max(0, (N - i) / fadeOut));
  let l = (camL[i] * CAM_GAIN + musL[i] * MUSIC_GAIN + sfxL[i] * SFX_GAIN) * g * MASTER_GAIN;
  let r = (camR[i] * CAM_GAIN + musR[i] * MUSIC_GAIN + sfxR[i] * SFX_GAIN) * g * MASTER_GAIN;
  // soft limiter
  outL[i] = Math.tanh(l * 1.15) / Math.tanh(1.15);
  outR[i] = Math.tanh(r * 1.15) / Math.tanh(1.15);
}
const mixPath = join(work, "mix.wav");
writeWav(mixPath, outL, outR);

// ---------- 5. mux against the untouched video stream ----------
ff(["-y", "-i", IN, "-i", mixPath, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", OUT]);
console.log("wrote", OUT, "duration", durationSec.toFixed(2) + "s");
