#!/usr/bin/env node
/**
 * The faceless pipeline. Turns one plain text file into one finished vertical
 * MP4 — no footage, no camera, no editing. The single command described in
 * `FACELESS.md` as `npm run render:script`.
 *
 * Design decision, same as `render-short.mjs`: this script only *reads and
 * shapes text* (which lines, in what order). It does not know what a card
 * looks like or how long a beat lasts — the components own the look and
 * `ScriptShort.tsx` owns the timing rule, imported here rather than
 * reimplemented, so there is exactly one answer to "how long is this line on
 * screen".
 *
 * The file format is deliberately the least a person can be asked to learn:
 *
 *   - A blank line starts a new card.
 *   - The first line of a card is the line people read.
 *   - Any further lines of that card are the quieter lines underneath.
 *   - A line starting with `#` is a note to yourself and is never rendered.
 *
 * Usage:
 *   npm run render:script
 *   FILE=assets/faceless/next.txt npm run render:script
 *   BRAND=tysons-time PRESET=youtube-shorts OUTPUT=out/monday.mp4 npm run render:script
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, isAbsolute } from "node:path";

const PROJECT_ROOT = new URL("..", import.meta.url).pathname;

const DEFAULT_SCRIPT_FILE = "assets/faceless/next.txt";
const DEFAULT_BRAND = "isaac-video-engine";
const DEFAULT_PRESET = "youtube-shorts";
const DEFAULT_OUTPUT = "out/faceless-short.mp4";

/**
 * Mirrors ScriptShort.tsx's rule so the timeline can be reported before the
 * render starts. Kept in lockstep with that file — it is the source of truth.
 */
const WORDS_PER_SECOND = 2.6;
const SETTLE_IN_SECONDS = 0.9;
const MIN_BEAT_IN_SECONDS = 2.4;
const MAX_BEAT_IN_SECONDS = 6.5;
const FPS = 30;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

function beatDurationInFrames(beat) {
  const words = (beat.supportingLines ?? []).reduce(
    (total, line) => total + countWords(line),
    countWords(beat.statement),
  );
  const seconds = Math.min(
    MAX_BEAT_IN_SECONDS,
    Math.max(MIN_BEAT_IN_SECONDS, words / WORDS_PER_SECOND + SETTLE_IN_SECONDS),
  );
  return Math.round(seconds * FPS);
}

function parseScript(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n")
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .filter((lines) => lines.length > 0)
    .map((lines) => ({
      statement: lines[0],
      supportingLines: lines.length > 1 ? lines.slice(1) : undefined,
    }));
}

function main() {
  const scriptFile = process.env.FILE || DEFAULT_SCRIPT_FILE;
  const scriptPath = isAbsolute(scriptFile)
    ? scriptFile
    : join(PROJECT_ROOT, scriptFile);

  if (!existsSync(scriptPath)) {
    console.error(
      [
        `No script file at ${scriptPath}.`,
        "",
        "Write your lines into a plain text file — a blank line between each",
        "card — then run this again. See FACELESS.md.",
        "",
        `  FILE=<path-to-your-file.txt> npm run render:script`,
      ].join("\n"),
    );
    process.exit(1);
  }

  const beats = parseScript(readFileSync(scriptPath, "utf-8"));

  if (beats.length === 0) {
    console.error(
      `${scriptPath} has no lines in it. Write at least one line and run this again.`,
    );
    process.exit(1);
  }

  const brandId = process.env.BRAND || DEFAULT_BRAND;
  const preset = process.env.PRESET || DEFAULT_PRESET;
  const outputPath = process.env.OUTPUT || DEFAULT_OUTPUT;

  // Every key is sent explicitly, including the empty ones. Remotion merges
  // `--props` *over* the composition's `defaultProps`, so a key left out here
  // silently inherits the default instead of being unset — which is how the
  // first Tyson's Time render came out labelled "ISAAC VIDEO ENGINE".
  const props = {
    beats,
    brandId,
    preset,
    eyebrow: process.env.EYEBROW || "",
  };

  const totalFrames = beats.reduce(
    (total, beat) => total + beatDurationInFrames(beat),
    0,
  );

  console.log(`Script: ${scriptFile}`);
  console.log(`Read ${beats.length} card(s):`);
  for (const beat of beats) {
    const seconds = (beatDurationInFrames(beat) / FPS).toFixed(1);
    console.log(`  - "${beat.statement}" (${seconds}s)`);
    for (const line of beat.supportingLines ?? []) {
      console.log(`      ${line}`);
    }
  }
  console.log(
    `Brand: ${brandId} | Preset: ${preset} | About ${(totalFrames / FPS).toFixed(1)}s`,
  );
  console.log(`Output: ${outputPath}`);

  const tmpDir = mkdtempSync(join(tmpdir(), "isaac-video-engine-"));
  const propsPath = join(tmpDir, "script-short-props.json");
  writeFileSync(propsPath, JSON.stringify(props, null, 2));

  const result = spawnSync(
    "npx",
    ["remotion", "render", "ScriptShort", outputPath, `--props=${propsPath}`],
    { stdio: "inherit", cwd: PROJECT_ROOT },
  );

  process.exit(result.status ?? 1);
}

main();
