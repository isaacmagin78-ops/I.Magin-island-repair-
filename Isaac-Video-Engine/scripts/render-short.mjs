#!/usr/bin/env node
/**
 * Auto render pipeline (Phase 6). Discovers media dropped into assets/,
 * builds a Scene[] timeline with motion/transitions/branding applied, and
 * renders the AutoShort composition to a real MP4 — the single command
 * described in the project docs as `npm run render:short`.
 *
 * Design decision: this script only *assembles data* (which files, in what
 * order, with what timing) and hands it to `remotion render` via --props.
 * All actual rendering/motion/animation logic lives in the React
 * components (Phase 2-5) so there is exactly one implementation of "what a
 * scene looks like" — this script never duplicates that logic.
 *
 * Usage:
 *   npm run render:short
 *   BRAND=tysons-time npm run render:short
 *   PRESET=instagram-reels OUTPUT=out/my-video.mp4 npm run render:short
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, extname, basename } from "node:path";

const PROJECT_ROOT = new URL("..", import.meta.url).pathname;
const ASSETS_DIR = join(PROJECT_ROOT, "assets");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".m4a", ".aac"]);

// Synthetic fixtures used by the engine's own diagnostic compositions
// (ComponentShowcase/MotionTest/AudioTest) — never treated as real content.
const isFixtureFile = (name) =>
  name.startsWith("test-pattern") ||
  name.startsWith("test-music") ||
  name.startsWith("test-voiceover");

const IMAGE_DURATION_IN_FRAMES = 90; // 3s @ 30fps
const MIN_VIDEO_DURATION_IN_FRAMES = 60; // 2s
const MAX_VIDEO_DURATION_IN_FRAMES = 240; // 8s
const TRANSITION_DURATION_IN_FRAMES = 15;
const FPS = 30;

const KEN_BURNS_DIRECTIONS = ["in", "pan-left", "pan-right", "out", "pan-up", "pan-down"];
const TRANSITION_KINDS = ["fade", "slide", "zoom"];

function listMediaFiles(dir, extensions) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => extensions.has(extname(name).toLowerCase()))
    .filter((name) => !isFixtureFile(name))
    .sort((a, b) => a.localeCompare(b));
}

function probeDurationInSeconds(absolutePath) {
  try {
    const output = execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        absolutePath,
      ],
      { encoding: "utf-8" },
    );
    const seconds = parseFloat(output.trim());
    return Number.isFinite(seconds) ? seconds : null;
  } catch {
    return null;
  }
}

function buildScenes() {
  const imageFiles = listMediaFiles(join(ASSETS_DIR, "images"), IMAGE_EXTENSIONS);
  const videoFiles = listMediaFiles(join(ASSETS_DIR, "videos"), VIDEO_EXTENSIONS);

  const mediaEntries = [
    ...imageFiles.map((name) => ({ kind: "image", name })),
    ...videoFiles.map((name) => ({ kind: "video", name })),
  ];

  if (mediaEntries.length === 0) {
    return null;
  }

  return mediaEntries.map((entry, index) => {
    const kenBurnsDirection = KEN_BURNS_DIRECTIONS[index % KEN_BURNS_DIRECTIONS.length];
    const transitionKind = TRANSITION_KINDS[index % TRANSITION_KINDS.length];
    const isFirst = index === 0;
    const isLast = index === mediaEntries.length - 1;

    let durationInFrames = IMAGE_DURATION_IN_FRAMES;
    let src;

    if (entry.kind === "image") {
      src = `assets/images/${entry.name}`;
    } else {
      src = `assets/videos/${entry.name}`;
      const absolutePath = join(ASSETS_DIR, "videos", entry.name);
      const seconds = probeDurationInSeconds(absolutePath);
      durationInFrames = seconds
        ? Math.min(
            MAX_VIDEO_DURATION_IN_FRAMES,
            Math.max(MIN_VIDEO_DURATION_IN_FRAMES, Math.round(seconds * FPS)),
          )
        : IMAGE_DURATION_IN_FRAMES;
    }

    return {
      id: `scene-${index}-${basename(entry.name, extname(entry.name))}`,
      media: { kind: entry.kind, src },
      durationInFrames,
      // Ken Burns only applies to still images — video already has its own motion.
      kenBurns:
        entry.kind === "image"
          ? { direction: kenBurnsDirection, scaleAmount: 1.15 }
          : undefined,
      transitionIn: isFirst
        ? { kind: "fade", durationInFrames: TRANSITION_DURATION_IN_FRAMES }
        : { kind: transitionKind, durationInFrames: TRANSITION_DURATION_IN_FRAMES, direction: "right" },
      transitionOut: isLast
        ? { kind: "fade", durationInFrames: TRANSITION_DURATION_IN_FRAMES }
        : { kind: transitionKind, durationInFrames: TRANSITION_DURATION_IN_FRAMES, direction: "left" },
    };
  });
}

function findFirstFile(dir, extensions) {
  const files = listMediaFiles(dir, extensions);
  return files[0] ?? null;
}

function buildCaptionsFromScript(totalDurationInFrames) {
  const scriptPath = join(ASSETS_DIR, "script.txt");
  if (!existsSync(scriptPath)) return undefined;

  const text = readFileSync(scriptPath, "utf-8").trim();
  if (!text) return undefined;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return undefined;

  const totalDurationMs = (totalDurationInFrames / FPS) * 1000;
  const perWordMs = totalDurationMs / words.length;

  // Leading space, matching Whisper's token convention:
  // createTikTokStyleCaptions only starts a new page at a token that
  // begins with a space, so trailing-space tokens collapse the whole
  // script into a single page shown for ~1.2s.
  return words.map((word, index) => ({
    text: ` ${word}`,
    startMs: Math.round(index * perWordMs),
    endMs: Math.round((index + 1) * perWordMs),
    timestampMs: null,
    confidence: null,
  }));
}

function readFirstLine(path) {
  if (!existsSync(path)) return null;
  const content = readFileSync(path, "utf-8").trim();
  return content.split("\n")[0]?.trim() || null;
}

function main() {
  const scenes = buildScenes();

  if (!scenes) {
    console.error(
      [
        "No media found in assets/images/ or assets/videos/.",
        "",
        "Drop photos and/or video clips into:",
        `  ${join(ASSETS_DIR, "images")}`,
        `  ${join(ASSETS_DIR, "videos")}`,
        "",
        "Then run this command again.",
      ].join("\n"),
    );
    process.exit(1);
  }

  const brandId = process.env.BRAND || "isaac-video-engine";
  const preset = process.env.PRESET || "tiktok";
  const outputPath = process.env.OUTPUT || "out/isaac-short.mp4";

  const musicFile = findFirstFile(join(ASSETS_DIR, "music"), AUDIO_EXTENSIONS);
  const music = musicFile
    ? {
        src: `assets/music/${musicFile}`,
        volume: 0.5,
        fadeInFrames: 30,
        fadeOutFrames: 45,
        duckToVolume: 0.2,
      }
    : undefined;

  const logoFile = findFirstFile(join(ASSETS_DIR, "logos"), IMAGE_EXTENSIONS);
  const logoOverride = logoFile ? `assets/logos/${logoFile}` : undefined;

  const totalScenesDuration = scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
  const captions = buildCaptionsFromScript(totalScenesDuration);

  const ctaHeadline = readFirstLine(join(ASSETS_DIR, "cta.txt")) || undefined;
  const endCardText = readFirstLine(join(ASSETS_DIR, "endcard.txt")) || undefined;

  const props = {
    scenes,
    music,
    brandId,
    preset,
    logoOverride,
    captions,
    ctaHeadline,
    endCardText,
  };

  console.log(`Discovered ${scenes.length} scene(s):`);
  for (const scene of scenes) {
    console.log(`  - ${scene.media.src} (${scene.durationInFrames} frames)`);
  }
  if (music) console.log(`Music: ${music.src}`);
  if (logoOverride) console.log(`Logo: ${logoOverride}`);
  if (captions) console.log(`Captions: ${captions.length} words from assets/script.txt`);
  console.log(`Brand: ${brandId} | Preset: ${preset} | Output: ${outputPath}`);

  const tmpDir = mkdtempSync(join(tmpdir(), "isaac-video-engine-"));
  const propsPath = join(tmpDir, "auto-short-props.json");
  writeFileSync(propsPath, JSON.stringify(props, null, 2));

  const result = spawnSync(
    "npx",
    ["remotion", "render", "AutoShort", outputPath, `--props=${propsPath}`],
    { stdio: "inherit", cwd: PROJECT_ROOT },
  );

  process.exit(result.status ?? 1);
}

main();
