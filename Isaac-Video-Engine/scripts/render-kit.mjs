#!/usr/bin/env node
/**
 * Render pipeline for the First 30 Days Kit launch video
 * (`npm run render:kit`). Same design as render-short.mjs: this script
 * only *assembles data* — which files fill which storyboard beat — and
 * hands it to `remotion render` via --props; all rendering logic lives in
 * src/compositions/FirstThirtyDaysKit.tsx.
 *
 * Footage is matched to beats by filename prefix in assets/videos/ and
 * assets/images/ (alphabetical within a beat):
 *
 *   hook-*      Beat 1  day-one corner footage
 *   problem-*   Beat 2  the hard first days
 *   turning-*   Beat 3  the turning point
 *   solution-*  Beat 4  kit UI on a phone
 *   cta-*       Beat 5  rapid kit scroll
 *
 * Beats with no matching files render as labeled FOOTAGE SLOT
 * placeholders — an empty assets/ produces the shot-listed animatic, a
 * full one produces the real cut. A recorded VO in assets/voiceover/ and
 * a music bed in assets/music/ are picked up automatically.
 *
 * Usage:
 *   npm run render:kit
 *   BRAND=tysons-time PRESET=instagram-reels OUTPUT=out/kit.mp4 npm run render:kit
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, extname } from "node:path";

const PROJECT_ROOT = new URL("..", import.meta.url).pathname;
const ASSETS_DIR = join(PROJECT_ROOT, "assets");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".m4a", ".aac"]);

// Synthetic fixtures used by the engine's diagnostic compositions.
const isFixtureFile = (name) =>
  name.startsWith("test-pattern") ||
  name.startsWith("test-music") ||
  name.startsWith("test-voiceover");

/** Beat order + filename prefixes; mirrors KIT_BEATS in the composition. */
const BEATS = [
  { id: "hook", prefix: "hook" },
  { id: "problem", prefix: "problem" },
  { id: "turningPoint", prefix: "turning" },
  { id: "solution", prefix: "solution" },
  { id: "cta", prefix: "cta" },
];

function listMediaFiles(dir, extensions) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => extensions.has(extname(name).toLowerCase()))
    .filter((name) => !isFixtureFile(name))
    .sort((a, b) => a.localeCompare(b));
}

function discoverFootage() {
  const entries = [
    ...listMediaFiles(join(ASSETS_DIR, "images"), IMAGE_EXTENSIONS).map(
      (name) => ({ kind: "image", name, src: `assets/images/${name}` }),
    ),
    ...listMediaFiles(join(ASSETS_DIR, "videos"), VIDEO_EXTENSIONS).map(
      (name) => ({ kind: "video", name, src: `assets/videos/${name}` }),
    ),
  ];

  const footage = Object.fromEntries(BEATS.map((beat) => [beat.id, []]));
  const unmatched = [];

  for (const entry of entries) {
    const beat = BEATS.find((b) => entry.name.startsWith(`${b.prefix}-`));
    if (beat) {
      footage[beat.id].push({ kind: entry.kind, src: entry.src });
    } else {
      unmatched.push(entry.name);
    }
  }

  return { footage, unmatched };
}

function main() {
  const brandId = process.env.BRAND || "tysons-time";
  const preset = process.env.PRESET || "tiktok";
  const outputPath = process.env.OUTPUT || "out/first-30-days-kit-launch.mp4";

  const { footage, unmatched } = discoverFootage();

  const voiceoverFile = listMediaFiles(
    join(ASSETS_DIR, "voiceover"),
    AUDIO_EXTENSIONS,
  )[0];
  const voiceover = voiceoverFile
    ? { src: `assets/voiceover/${voiceoverFile}`, volume: 1 }
    : undefined;

  const musicFile = listMediaFiles(join(ASSETS_DIR, "music"), AUDIO_EXTENSIONS)[0];
  const music = musicFile
    ? {
        src: `assets/music/${musicFile}`,
        volume: 0.5,
        fadeInFrames: 30,
        fadeOutFrames: 150,
        duckToVolume: 0.2,
      }
    : undefined;

  const logoFile = listMediaFiles(join(ASSETS_DIR, "logos"), IMAGE_EXTENSIONS)[0];
  const logoOverride = logoFile ? `assets/logos/${logoFile}` : undefined;

  const props = { footage, brandId, preset, logoOverride, voiceover, music };

  const placeholderBeats = BEATS.filter((b) => footage[b.id].length === 0);
  console.log(
    placeholderBeats.length === 0
      ? "All beats have footage — rendering the full cut."
      : `Animatic mode — ${placeholderBeats.length} of ${BEATS.length} beats are placeholder slots.`,
  );
  for (const beat of BEATS) {
    const files = footage[beat.id];
    console.log(
      `  ${beat.id}: ${
        files.length > 0
          ? files.map((f) => f.src).join(", ")
          : `FOOTAGE SLOT (drop ${beat.prefix}-*.mp4 into assets/videos/)`
      }`,
    );
  }
  if (unmatched.length > 0) {
    console.log(
      `Ignored ${unmatched.length} file(s) without a beat prefix: ${unmatched.join(", ")}`,
    );
  }
  if (voiceover) console.log(`Voiceover: ${voiceover.src}`);
  if (music) console.log(`Music: ${music.src}`);
  if (logoOverride) console.log(`Logo: ${logoOverride}`);
  console.log(`Brand: ${brandId} | Preset: ${preset} | Output: ${outputPath}`);

  const tmpDir = mkdtempSync(join(tmpdir(), "isaac-video-engine-"));
  const propsPath = join(tmpDir, "first-thirty-days-kit-props.json");
  writeFileSync(propsPath, JSON.stringify(props, null, 2));

  const result = spawnSync(
    "npx",
    ["remotion", "render", "FirstThirtyDaysKit", outputPath, `--props=${propsPath}`],
    { stdio: "inherit", cwd: PROJECT_ROOT },
  );

  process.exit(result.status ?? 1);
}

main();
