# Test Log — Tyson Video Engine

## Milestone 1: Reusable Remotion video engine scaffold
- Date: 2026-07-14
- `npm install` — installed remotion 4.0.286 + cli/renderer/transitions, react 18.3.1, typescript 5.6.3. No paid/cloud services used.
- System dependency: `ffmpeg` was not present in the environment; installed via `apt-get install --no-install-recommends ffmpeg` (local system package, no paid API).
- `npx tsc --noEmit` — passes, no type errors.
- `npx remotion render src/index.ts EngineTest output/engine-test.mp4` — rendered 90/90 frames, stitched successfully.
- Verified with `ffprobe`: output is H.264, **1080x1920**, 30fps, ~3.05s duration — matches the 90-frame/30fps composition definition.
- Result: **PASS**. Engine scaffold renders a valid vertical MP4 end to end.

## Milestone 2: Tyson video templates
- Date: 2026-07-14
- Added `assets/` as Remotion's public directory (`Config.setPublicDir`) so `/assets/photos`, `/assets/video`, `/assets/music`, `/assets/logo` are scannable via `getStaticFiles()`.
- Bug found & fixed: `Config.setPublicDir(path.join(__dirname, 'assets'))` resolved to Remotion CLI's own internal bundle directory (`node_modules/@remotion/cli/dist/assets`), not the project root, because the config file is bundled/executed from a different location. Fixed by using `process.cwd()` instead of `__dirname` — confirmed correct path via a debug log, then re-verified `npx remotion compositions` picks up real asset counts.
- Built `src/lib/assetLoader.ts` (folder-scoped static file listing) and `src/lib/timeline.ts` (builds a `Scene[]` timeline: photos get a fixed 3.5s duration, videos keep their real probed duration via `@remotion/media-utils`' `getVideoMetadata`).
- Built `TysonReel` composition using `<Series>`/`<Series.Sequence>` to sequence scenes, with `calculateMetadata` computing true `durationInFrames` from the scanned assets, and an empty-state fallback (1s "No photos or videos found" frame) so the pipeline never crashes on an empty `/assets`.
- Test 1 — empty `/assets`: rendered `TysonReel`, `ffprobe` confirmed 1.0s duration (fallback empty-state frame). **PASS**.
- Test 2 — sample assets (2 solid-color 1080x1920 JPEGs + 1 2s test MP4 with a sine-wave audio track, generated locally via `ffmpeg lavfi`, not committed): rendered `TysonReel`, `ffprobe` confirmed H.264, 1080x1920, 30fps, **9.05s** duration — matches 2×3.5s photos + 1×2s video exactly. **PASS**.
- Sample test assets removed after verification; `assets/*` folders left empty (`.gitkeep` only) for real Tyson media to be dropped in later.
- Result: **PASS**. Reusable asset-driven video template engine confirmed working end to end.

## Milestone 3: Automatic captions
- Date: 2026-07-14
- Design decision: "automatic" here means fully local, file-driven auto-sync — drop a caption
  file in `assets/captions/` and the engine automatically parses and times it. Real ASR
  (transcribing audio to text) was deliberately not added: it would require either a paid
  cloud API (disallowed) or bundling a local Whisper model (large download, heavy compile/
  runtime footprint, high risk in this sandboxed environment) — out of proportion to the
  other 8 milestones. The engine supports three local input formats, auto-detected by extension:
  - `.srt` — real timestamps, parsed to frame-accurate cues.
  - `.json` — `[{start, end, text}]` in seconds.
  - `.txt` — no explicit timing; sentences/lines are auto-distributed evenly across the total
    video duration.
- Built `src/lib/captions.ts` (parsing/timing, all pure local string/JSON parsing) and
  `src/components/Captions.tsx` (bottom-safe-area styled overlay, reads the active cue for the
  current frame). Wired into `TysonReel` via `calculateMetadata`, which now also loads the first
  file found in `assets/captions/` (via `fetch` against Remotion's local static server) and
  converts it to cues before rendering.
- Test 1 — `.srt` with 3 explicitly-timed cues over a 9s reel: rendered, extracted frames at
  1.5s/4.5s/7.5s with `ffmpeg -ss`, visually confirmed each caption appears in its correct
  window with correct text ("Tyson is ready for his walk." / "Watch him go!" / "What a good
  boy."). **PASS**.
- Test 2 — plain `.txt` with 3 sentences, no timing: rendered, extracted frames at 0.5s/4.5s,
  confirmed sentences were auto-split and evenly spread across the 9s duration with correct
  word-wrap. **PASS**.
- Test 3 — no caption file present: confirmed no crash, `Captions` renders nothing (`cues: []`,
  from Milestone 2 empty-state/asset tests). **PASS**.
- Result: **PASS**. Local automatic captioning confirmed for timed and untimed input.

## Milestone 4: Animated text and thought bubbles
- Date: 2026-07-14
- Built `src/components/AnimatedText.tsx` (spring-driven fade/pop/slideUp text, reusable in
  any composition/Sequence, configurable `startFrame`) and `src/components/ThoughtBubble.tsx`
  (spring pop-in cloud-style bubble with a trailing dot tail, configurable position/text).
- Added `ComponentsDemo` composition (`src/compositions/ComponentsDemo.tsx`, registered in
  `Root.tsx`) as both a visual reference and a test harness for the two components together.
- Test: rendered `ComponentsDemo` (60 frames), extracted stills at 0.0s / 0.5s / ~1.17s with
  `ffmpeg -ss`. Confirmed: at frame 0 nothing has animated in yet; at 0.5s the thought bubble
  (`startFrame=10`) and pop title (`startFrame=0`) are both fully visible/settled while the
  slide-up caption (`startFrame=20`) is still hidden; at ~1.17s the slide-up caption has also
  animated in. Animation timing and visual placement all correct. **PASS**.
- Result: **PASS**. Reusable animated text and thought bubble components confirmed working.
