# Test Log — Tyson Video Engine

## Milestone 1: Reusable Remotion video engine scaffold
- Date: 2026-07-14
- `npm install` — installed remotion 4.0.286 + cli/renderer/transitions, react 18.3.1, typescript 5.6.3. No paid/cloud services used.
- System dependency: `ffmpeg` was not present in the environment; installed via `apt-get install --no-install-recommends ffmpeg` (local system package, no paid API).
- `npx tsc --noEmit` — passes, no type errors.
- `npx remotion render src/index.ts EngineTest output/engine-test.mp4` — rendered 90/90 frames, stitched successfully.
- Verified with `ffprobe`: output is H.264, **1080x1920**, 30fps, ~3.05s duration — matches the 90-frame/30fps composition definition.
- Result: **PASS**. Engine scaffold renders a valid vertical MP4 end to end.
