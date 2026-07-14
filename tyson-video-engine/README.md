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
4. [x] Animated text and thought bubbles
5. [x] Ken Burns effects
6. [x] Transitions
7. [x] Background music support
8. [x] Logo/watermark support
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
- Every photo automatically gets a Ken Burns pan/zoom (`src/components/KenBurnsImage.tsx`),
  cycling through left/right/up/down pan and alternating zoom-in/zoom-out per scene so a
  multi-photo reel stays visually dynamic.
- Scenes transition into each other with `@remotion/transitions`, cycling through
  fade/slide/wipe (`src/lib/transitions.ts`).

## Background music

Drop one audio file (`.mp3`, `.wav`, `.m4a`, `.aac`) into `assets/music/` and it's
automatically mixed in under the video with a fade-in/fade-out envelope
(`src/components/BackgroundMusic.tsx`) — no manual timing needed:

- Shorter than the video? It loops seamlessly to fill the full duration.
- Longer than the video? It's simply trimmed.
- No music file present? The rendered video is just silent — no crash.

## Logo / watermark

Drop one image into `assets/logo/` and it's shown as a persistent corner watermark for the
whole video (`src/components/Watermark.tsx`, default bottom-right, ~85% opacity). No logo
file present? No watermark is rendered.

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

## Animated text & thought bubbles

Reusable components in `src/components/` for use in any composition:

- `AnimatedText` — spring-driven `fade` / `pop` / `slideUp` text, e.g.
  `<AnimatedText text="Tyson's Big Day" animation="pop" startFrame={0} />`.
- `ThoughtBubble` — a pop-in cloud-style bubble with a trailing dot tail, e.g.
  `<ThoughtBubble text="Is that a treat?!" startFrame={10} />`.

See `src/compositions/ComponentsDemo.tsx` (composition id `ComponentsDemo`) for a live example
of both, or render it yourself:

```bash
npx remotion render src/index.ts ComponentsDemo output/components-demo.mp4
```

## Design notes

- Everything runs locally: Remotion's headless Chromium renderer + system `ffmpeg`. No paid
  transcription/TTS/cloud rendering APIs are used anywhere in this engine.
