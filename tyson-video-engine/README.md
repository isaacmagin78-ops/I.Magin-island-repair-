# Tyson Video Engine

A local, reusable [Remotion](https://www.remotion.dev/) video engine that turns a folder of
Tyson photos/videos into a finished **1080×1920** vertical MP4 — captions, animated text,
thought bubbles, Ken Burns pans, transitions, background music, and a logo/watermark, all
rendered locally with no paid APIs.

Status: under active development. See `TEST_LOG.md` for what has been verified so far.

## Requirements

- Node.js 18+
- `ffmpeg` / `ffprobe` on `PATH` (used by Remotion's renderer)

## Setup

```bash
cd tyson-video-engine
npm install
```

## Development

Open the Remotion Studio to preview compositions live:

```bash
npm run dev
```

Render a specific composition directly:

```bash
npx remotion render src/index.ts EngineTest output/engine-test.mp4
```

## Project layout

```
tyson-video-engine/
├── assets/            # INPUT: drop Tyson photos/videos, captions, music, logo here
│   ├── photos/
│   ├── video/
│   ├── music/
│   └── logo/
├── output/            # OUTPUT: rendered MP4s land here
├── src/
│   ├── index.ts       # Remotion entry point
│   ├── Root.tsx        # composition registry
│   ├── compositions/  # top-level video templates (e.g. TysonReel)
│   ├── components/    # reusable pieces: captions, Ken Burns, transitions, watermark...
│   ├── lib/           # asset scanning, timeline building, caption parsing
│   └── config/        # theme + canvas constants (1080x1920, 30fps)
├── scripts/           # render.mjs — the one-command /assets -> /output pipeline
└── TEST_LOG.md
```

## Milestones

1. [x] Reusable Remotion video engine scaffold
2. [x] Tyson video templates
3. [ ] Automatic captions
4. [ ] Animated text and thought bubbles
5. [ ] Ken Burns effects
6. [ ] Transitions
7. [ ] Background music support
8. [ ] Logo/watermark support
9. [ ] One-command `/assets` → `/output` vertical-video render pipeline

## The `TysonReel` template

Drop photos into `assets/photos/` and/or video clips into `assets/video/` and render the
`TysonReel` composition:

```bash
npx remotion render src/index.ts TysonReel output/tysonreel.mp4
```

- Photos are shown for a fixed duration (3.5s by default, `DEFAULT_IMAGE_DURATION_SECONDS` in
  `src/lib/timeline.ts`).
- Video clips keep their real duration (probed locally, no external service).
- Assets are ordered photos-first, then videos, each group sorted by filename — prefix files
  like `01-`, `02-` to control order within a folder.
- If `/assets` is empty, `TysonReel` renders a 1-second placeholder instead of failing.

## Design notes

- Everything runs locally: Remotion's headless Chromium renderer + system `ffmpeg`. No paid
  transcription/TTS/cloud rendering APIs are used anywhere in this engine.
- Captions are driven by a local cue file you provide alongside your assets (`.srt`, or a
  simple JSON/text cue format) — see the captions section below once Milestone 3 lands.
