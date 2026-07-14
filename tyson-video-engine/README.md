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
3. [x] Automatic captions
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

## Automatic captions

Drop **one** caption file into `assets/captions/` and it's automatically parsed, timed, and
burned into the video — no manual keyframing needed:

- `captions.srt` — standard SRT with real timestamps (`00:00:01,500 --> 00:00:03,000`).
- `captions.json` — `[{"start": 0, "end": 3, "text": "..."}]`, times in seconds.
- `captions.txt` — plain text, no timestamps. Sentences/lines are automatically spread evenly
  across the video's total duration.

This is local, file-driven auto-captioning, not speech-to-text transcription — see
`TEST_LOG.md` (Milestone 3) for why: real ASR needs either a paid cloud API (not allowed here)
or a bundled local model that's a heavy, risky addition for a single milestone. If you want
ASR later, run a local tool (e.g. `whisper.cpp`) yourself and drop the resulting `.srt` into
`assets/captions/` — the engine will pick it up automatically.

## Design notes

- Everything runs locally: Remotion's headless Chromium renderer + system `ffmpeg`. No paid
  transcription/TTS/cloud rendering APIs are used anywhere in this engine.
