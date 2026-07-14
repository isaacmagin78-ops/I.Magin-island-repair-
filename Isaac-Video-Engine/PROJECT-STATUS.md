# Project Status

Last verified: **2026-07-14**

## Status: ✅ Operational

The Isaac Video Engine is set up, dependencies are installed, TypeScript
compiles with zero errors, Remotion Studio starts and bundles cleanly, and a
real verification MP4 has been rendered and technically validated.

## What exists

- `src/Composition.tsx` — registers `IsaacVideoEngineTest`
  (1080×1920, 30fps, 300 frames / 10s)
- `src/compositions/IsaacVideoEngineTest.tsx` — the verification video
  timeline
- `src/components/` — reusable building blocks:
  - `DarkBackground.tsx`
  - `AnimatedTitle.tsx`
  - `AnimatedSubtitle.tsx`
  - `ProgressIndicator.tsx`
  - `SystemVerified.tsx`
- `assets/` — empty, ready for user-supplied source media
- `public/` — empty, ready for static assets referenced at render time
- `out/isaac-video-engine-test.mp4` — rendered and verified (gitignored;
  re-render anytime with `npm run render`)
- `.agents/skills/` — official Remotion Agent Skill and 7 related skills,
  installed via `npx -y skills@latest add remotion-dev/skills`

## Installed components

| Component | Version |
|---|---|
| Node.js | v22.22.2 |
| npm | 10.9.7 |
| FFmpeg | 6.1.1-3ubuntu5 |
| remotion | 4.0.489 |
| @remotion/cli | 4.0.489 |
| @remotion/tailwind-v4 | 4.0.489 |
| @remotion/eslint-config-flat | 4.0.489 |
| react | 19.2.3 |
| react-dom | 19.2.3 |
| typescript | 5.9.3 |
| tailwindcss | 4.0.0 |
| eslint | 9.19.0 |
| prettier | 3.8.1 |
| @types/react | 19.2.7 |
| @types/web | 0.0.166 |
| Chromium (rendering) | pre-installed headless shell, build 1194 (this environment); Remotion manages its own on a normal machine |

## Verification test results (2026-07-14)

- `npx tsc --noEmit` → clean, zero errors
- `npm run studio` → server starts, bundles in ~5.6s, responds HTTP 200
- `npm run render` → completes successfully, reproducible
- Output file: `out/isaac-video-engine-test.mp4`
  - Format: MP4 (ISO Media, ISO 14496-12)
  - Video: H.264 (High profile), 1080×1920, 30fps, 10.000s exactly
  - Audio: AAC-LC, 48kHz stereo (silent track, no `<Audio>` used)
  - File size: 1,093,200 bytes (~1.09 MB)
  - `ffprobe` probe_score: 100 (fully valid container)
  - First frame (t=0): dark background, pre-entrance — correct
  - Middle frame (t=5s): title, subtitle, and progress bar mid-animation at
    the expected position — correct
  - Last frame (t≈9.97s): "SYSTEM VERIFIED" end card with checkmark —
    correct

## Known environment-specific detail

`remotion.config.ts` points at a pre-installed Chromium headless shell
because this container blocks Remotion's normal Chrome download host
(`remotion.media`). This is auto-detected and only applies when that exact
path exists — see `TROUBLESHOOTING.md`. On an unrestricted machine (e.g. a
real Mac), no action is needed; Remotion downloads and manages its own
Chrome automatically.

## Explicitly out of scope (this phase)

- Cloud rendering (Remotion Lambda, etc.)
- Paid third-party APIs
- Social-media auto-posting
- Databases
- Any integration unrelated to local MP4 generation

## Next steps for future requests

Just ask, e.g.: *"Create a 15-second vertical Tyson video using the files in
assets."* — see `VIDEO-BRIEF-TEMPLATE.md` and `CLAUDE.md` for how that gets
turned into a rendered file.
