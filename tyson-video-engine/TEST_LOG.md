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

## Milestone 5: Ken Burns effects
- Date: 2026-07-14
- Built `src/components/KenBurnsImage.tsx`: frame-driven pan/zoom wrapper around Remotion's
  `Img`, configurable `direction` (`in`/`out`), `pan` (`left`/`right`/`up`/`down`/`none`), and
  scale range. Wired into `TysonReel` — every image scene now cycles through
  left/right/up/down pan with alternating zoom-in/zoom-out per scene index, so a multi-photo
  reel doesn't look static or repetitive. Video scenes are left untouched (no Ken Burns
  needed, they already have motion).
- Test: generated a local `ffmpeg testsrc2` pattern image (grid/checkerboard/diagonal line —
  chosen specifically so zoom and pan are visually obvious), rendered a single-photo
  `TysonReel`, extracted frames at the scene's first and last frame with `ffmpeg -ss`.
  Confirmed visually: the left black border present at frame 0 is fully cropped out by the
  final frame, and the checkerboard region in the bottom-right has visibly grown — proof the
  zoom+pan transform is animating correctly over the scene's duration. **PASS**.
- Result: **PASS**. Ken Burns pan/zoom confirmed working and wired into the main template.

## Milestone 6: Transitions
- Date: 2026-07-14
- Switched `TysonReel` from Remotion's plain `<Series>` to `@remotion/transitions`'
  `<TransitionSeries>`, inserting a `<TransitionSeries.Transition>` between every pair of
  scenes. Presentation cycles through `fade` / `slide` / `wipe` per boundary
  (`PRESENTATION_CYCLE` in `src/lib/transitions.ts`) so a multi-scene reel doesn't feel
  repetitive.
- `computeTransitionFrames` clamps each transition to `min(15 frames, half of either
  neighboring scene's duration)` so a transition never eats more of a scene than it has, then
  `totalDurationWithTransitions` accounts for the overlap when computing the composition's
  real total length (`TransitionSeries` overlaps neighboring sequences by the transition
  duration, so total = sum(scene durations) − sum(overlaps)).
- Test: rendered a 3-scene `TysonReel` (red photo, blue photo, video clip) with sample assets.
  `ffprobe` confirmed the new shorter total duration exactly matches
  `sum(durations) - overlaps` (270 → 240 frames / 8.0s for a 15-frame overlap on each of 2
  boundaries). Extracted stills at t=1.0s (pure red, scene 1 solo), t=3.23s (inside the first
  transition window), and t=4.0s (pure blue, scene 2 solo). The mid-transition frame rendered
  as **purple** — the exact expected blend of red and blue during a fade — objectively
  confirming the crossfade is compositing both scenes correctly. **PASS**.
- Result: **PASS**. Transitions confirmed working and wired into the main template.

## Milestone 7: Background music support
- Date: 2026-07-14
- Built `src/components/BackgroundMusic.tsx`: wraps Remotion's `<Audio loop>` with a
  frame-driven volume envelope (fade in over `fadeFrames`, fade out over the last
  `fadeFrames`, default 30 frames / 1s, default 40% volume) so a track never cuts in/out
  abruptly. `loop` means a short track automatically repeats to fill the video; a long track
  is simply trimmed to the video's length. Wired into `TysonReel`/`Root.tsx`: the first file
  found in `assets/music/` is picked up automatically and passed as `musicSrc`; if the folder
  is empty, no `<Audio>` is rendered at all (silent video, no crash).
- Debugging note: initial verification via `ffmpeg volumedetect` on short time-windows gave
  misleading flat readings near the fade-out tail. Cross-checked by (1) logging the actual
  per-frame `fadeIn`/`fadeOut`/`result` values computed inside the volume callback during a
  real render — confirmed the values correctly ramp down to ~0.013 by the final frames — and
  (2) rendering the audio waveform directly with `ffmpeg ... showwavespic` and visually
  inspecting it. The waveform image is unambiguous: thin/near-silent at both the very start
  and very end, full amplitude in the middle — proof the envelope is really being applied in
  the final mixed-down audio, not just computed in React.
- Test 1 — long (8s) non-looping WAV under a 6.5s video: waveform shows a clean taper in and
  taper out. **PASS**.
- Test 2 — short (2s) WAV under the same 6.5s video: waveform shows 3 repeated loop cycles
  with the overall fade envelope still intact at the true start/end of the full timeline.
  **PASS**.
- Result: **PASS**. Background music (loop-or-trim + fade envelope) confirmed working.

## Milestone 8: Logo/watermark support
- Date: 2026-07-14
- Built `src/components/Watermark.tsx`: persistent corner overlay (`top-left`/`top-right`/
  `bottom-left`/`bottom-right`, default `bottom-right`), configurable width/opacity/margin.
  Wired into `TysonReel`/`Root.tsx`: the first file found in `assets/logo/` is picked up
  automatically and passed as `logoSrc`; if the folder is empty, no watermark is rendered.
- Test: rendered a single-photo `TysonReel` with a distinctive solid-yellow test logo PNG in
  `assets/logo/`, extracted a frame with `ffmpeg -ss`, visually confirmed the yellow square
  appears correctly sized and positioned in the bottom-right corner with the expected margin,
  over the red photo background. **PASS**.
- Result: **PASS**. Logo/watermark support confirmed working.

## Milestone 9: One-command /assets to /output pipeline
- Date: 2026-07-14
- Built `scripts/render.mjs` (`npm run render`): scans each `assets/` subfolder, prints a
  summary of what was found (photo/video counts, whether captions/music/logo are present),
  warns (without failing) if no photos or videos are present, ensures `output/` exists, then
  shells out to `npx remotion render src/index.ts TysonReel output/tyson-reel.mp4` (or a
  custom path via `npm run render -- <path>`).

### Full acceptance test
- Populated `/assets` with sample media standing in for real Tyson photos/videos (no real
  Tyson footage available in this environment, so representative local test media was
  generated): 2 photos, 1 video clip, a timed `.srt` caption file, a music track, and a logo.
- Ran the documented one-command pipeline: `npm run render`.
- Result: `output/tyson-reel.mp4` created. `ffprobe` confirms **H.264, 1080×1920, 30fps, AAC
  audio, 8.06s** — exactly the required vertical format.
- Extracted frames at 1.0s and 5.0s: both show the correct synced caption text ("Tyson's big
  day at the beach" / "He wouldn't stop running"), the watermark logo in the bottom-right
  corner, and the Ken Burns-zoomed photo content, all composited together correctly.
- Result: **PASS**. The full pipeline — photos/video in, captions + music + logo optional,
  one command, finished vertical MP4 out — works end to end.
