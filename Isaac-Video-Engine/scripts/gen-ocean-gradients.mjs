// Generates cinematic ocean-gradient placeholder stills (1080x1920 PNG)
// for the Sea Monarch 611 teaser, using only node:zlib (no deps).
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const W = 1080, H = 1920;

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

function writePng(path, pixelFn) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  let o = 0;
  for (let y = 0; y < H; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < W; x++) {
      const [r, g, b] = pixelFn(x, y);
      raw[o++] = r; raw[o++] = g; raw[o++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
  console.log(`wrote ${path} (${png.length} bytes)`);
}

const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
// Deterministic per-pixel dither so gradients don't band.
const noise = (x, y) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return (s - Math.floor(s) - 0.5) * 6;
};

// Each scene: vertical gradient stops + optional horizon glow, all in a
// deep-ocean dusk palette matching the dramatic luxury direction.
const scenes = [
  { name: "01-open-atlantic", stops: [[6, 12, 28], [10, 40, 66], [16, 84, 104]], glow: { y: 0.62, color: [232, 190, 120], w: 0.05, a: 0.35 } },
  { name: "02-welcome", stops: [[8, 16, 34], [12, 52, 78], [22, 104, 122]], glow: { y: 0.58, color: [240, 205, 140], w: 0.06, a: 0.3 } },
  { name: "03-interior-light", stops: [[24, 26, 38], [58, 62, 80], [140, 130, 118]], glow: { y: 0.5, color: [250, 230, 190], w: 0.12, a: 0.35 } },
  { name: "04-open-layout", stops: [[14, 22, 40], [30, 66, 92], [90, 140, 150]], glow: { y: 0.55, color: [235, 210, 160], w: 0.08, a: 0.25 } },
  { name: "05-ocean-lifestyle", stops: [[4, 10, 24], [8, 46, 74], [12, 96, 118]], glow: { y: 0.6, color: [225, 180, 110], w: 0.05, a: 0.4 } },
  { name: "06-primary-suite", stops: [[18, 16, 32], [44, 44, 66], [110, 100, 104]], glow: { y: 0.52, color: [244, 222, 180], w: 0.1, a: 0.3 } },
  { name: "07-statement", stops: [[6, 8, 22], [14, 36, 60], [24, 78, 100]], glow: { y: 0.64, color: [238, 196, 128], w: 0.045, a: 0.45 } },
  { name: "08-payoff-view", stops: [[3, 8, 20], [10, 52, 84], [20, 118, 138]], glow: { y: 0.6, color: [248, 208, 138], w: 0.07, a: 0.55 } },
];

const outDir = process.argv[2];
mkdirSync(outDir, { recursive: true });

for (const scene of scenes) {
  writePng(join(outDir, `${scene.name}.png`), (x, y) => {
    const t = y / H;
    const [c1, c2, c3] = scene.stops;
    let c = t < 0.55 ? mix(c1, c2, t / 0.55) : mix(c2, c3, (t - 0.55) / 0.45);
    if (scene.glow) {
      const d = Math.abs(t - scene.glow.y) / scene.glow.w;
      const g = Math.exp(-d * d) * scene.glow.a;
      c = mix(c, scene.glow.color, g);
    }
    const n = noise(x, y);
    return [clamp(c[0] + n), clamp(c[1] + n), clamp(c[2] + n)];
  });
}
