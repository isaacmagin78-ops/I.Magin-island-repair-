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
