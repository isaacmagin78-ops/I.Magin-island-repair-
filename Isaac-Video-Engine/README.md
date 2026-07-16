# Isaac Video Engine

A local, reusable Remotion video-generation engine. This project exists so that
Claude Code (or any operator) can generate polished vertical MP4 videos —
for Tyson's Time, Tyson's Picks, IMagin Concierge, or any future brand —
from a simple request, without re-explaining the setup every time.

- **Framework:** [Remotion](https://www.remotion.dev/) 4 + React 19 + TypeScript
- **Format:** vertical short-form by default (1080 × 1920, 30 fps), with presets
  for TikTok, Instagram/Facebook Reels, YouTube Shorts, Square posts, and Stories
- **Output:** real MP4 files (H.264 video + AAC audio) via FFmpeg
- **Skill:** the official Remotion Agent Skill (`remotion-dev/skills`) is installed
  in `.agents/skills/` and drives how Claude authors new compositions

## What's in the engine

- A **component library** (`src/components/`) of 15+ reusable, theme-driven
  pieces: titles, subtitles, lower thirds, progress bars, CTA screens, end
  cards, logo/watermark overlays, speech/thought bubbles, animated stickers,
  background gradients, and word-by-word animated captions.
- A **motion system** (`src/lib/motion.ts`): Ken Burns/pan-zoom, four scene
  transition kinds (fade/slide/zoom/blur), and consistent entrance/exit
  spring presets — used by every component instead of hand-rolled animation.
- An **audio system** (`src/lib/audio.ts` + `src/components/BackgroundMusic.tsx`
  etc.): fades and automatic music ducking under voiceover/SFX.
- A **brand theme system** (`src/branding/themes.ts`): colors, fonts, logo,
  and watermark text per brand — components read a `theme` prop, they never
  hardcode brand details.
- **Social presets** (`src/presets/social.ts`): resolution/fps/safe-zone/
  export config for six platforms.
- An **auto render pipeline** (`scripts/render-short.mjs`): discovers media
  in `assets/`, builds a timeline with motion/transitions/captions/branding
  applied, and renders a finished MP4 with one command.

## Project structure

```
Isaac-Video-Engine/
├── assets/                       # DROP YOUR MEDIA HERE (symlinked to public/assets/)
│   ├── images/                    # Photos for the auto pipeline
│   ├── videos/                    # Video clips for the auto pipeline
│   ├── music/                     # Background music (first file found is used)
│   ├── voiceover/                 # Narration tracks (for hand-authored videos)
│   ├── sfx/                       # Sound effects (for hand-authored videos)
│   ├── logos/                     # Brand logo (first image file found is used)
│   ├── script.txt                 # Optional: plain text -> auto word-by-word captions
│   ├── cta.txt                    # Optional: first line -> call-to-action headline
│   └── endcard.txt                # Optional: first line -> end card text
├── public/                       # Remotion's static asset root (assets/ lives inside it)
├── out/                          # Rendered MP4s land here (gitignored)
├── scripts/
│   └── render-short.mjs           # The auto pipeline behind `npm run render:short`
├── src/
│   ├── index.ts                   # Remotion entry point (registerRoot)
│   ├── Root.tsx                   # Registers the RemotionRoot
│   ├── Composition.tsx            # Every <Composition> definition lives here
│   ├── lib/
│   │   ├── types.ts                # Scene, MediaAsset, BrandTheme, SocialPreset, etc.
│   │   ├── motion.ts                # Easing, springs, Ken Burns, transitions
│   │   └── audio.ts                 # Fade/duck volume math
│   ├── branding/
│   │   └── themes.ts                # Per-brand color/font/logo tokens
│   ├── presets/
│   │   └── social.ts                # Per-platform resolution/fps/safe-zone/export
│   ├── components/                  # Reusable, theme-driven building blocks
│   └── compositions/                # Assembled videos (hand-authored + diagnostics)
├── remotion.config.ts             # CLI render/studio configuration
├── package.json
└── .agents/skills/                 # Official Remotion Agent Skill (installed, do not hand-edit)
```

See `CLAUDE.md` for how templates/components fit together and how to build a
new video, and `PROJECT-STATUS.md` for exactly what's been built and verified.

## Operating instructions

### 1. Install dependencies (first time only)

```bash
cd Isaac-Video-Engine
npm install
```

### 2. Open Remotion Studio (live preview)

```bash
npm run studio
```

Starts a local server and prints a URL (e.g. `http://localhost:3000`). Open
it in a browser to preview any composition, scrub the timeline, and check
for errors before rendering.

### 3. Generate a video the simple way (recommended)

Drop photos/video clips into `assets/images/` and `assets/videos/`, optionally
add music to `assets/music/`, a logo to `assets/logos/`, and a script to
`assets/script.txt` — then:

```bash
npm run render:short
```

This discovers your media, builds a timeline with Ken Burns motion and
transitions, applies captions/branding/music, and renders to
`out/isaac-short.mp4`. See "Customizing a render:short run" below for brand
and platform options.

### 4. Render the standing verification video

```bash
npm run render
```

Renders the `IsaacVideoEngineTest` composition to
`out/isaac-video-engine-test.mp4` — this is the standing regression check for
the base Remotion setup itself (Phase 1), independent of the component/motion/
audio/pipeline systems built on top of it.

### 5. Render any other composition

```bash
npx remotion render <composition-id> out/<name>.mp4
```

Composition IDs are declared in `src/Composition.tsx`. The diagnostic
compositions (`ComponentShowcase`, `MotionTest`, `AudioTest`,
`SocialPreset-<name>`) are useful references for how each part of the engine
is meant to be used — render them any time to see it working.

## Customizing a `render:short` run

```bash
BRAND=tysons-time npm run render:short
PRESET=instagram-reels npm run render:short
OUTPUT=out/tyson-picks-episode-4.mp4 BRAND=tysons-picks npm run render:short
```

- `BRAND` — one of the ids in `src/branding/themes.ts` (`isaac-video-engine`,
  `tysons-time`, `tysons-picks`, `imagin-concierge`, or a new one you add).
  Defaults to `isaac-video-engine`.
- `PRESET` — one of the names in `src/presets/social.ts` (`tiktok`,
  `instagram-reels`, `facebook-reels`, `youtube-shorts`, `square-post`,
  `story`). Defaults to `tiktok` (1080×1920 @ 30fps).
- `OUTPUT` — output file path. Defaults to `out/isaac-short.mp4`.

## Requesting a new video from Claude Code

Once this engine is set up, you can ask Claude Code for a video in plain
language, e.g.:

> "Create a 15-second vertical Tyson video using the files in assets."

See `VIDEO-BRIEF-TEMPLATE.md` for the fields Claude will use to plan it, and
`CLAUDE.md` for exactly how Claude should build it — either by running the
auto pipeline for a simple drop-in-and-go video, or by hand-assembling a new
composition from the component library for something more specific.

## Verified environment

This engine was originally set up and verified on 2026-07-14, and Phases 1–6
(core architecture, component library, motion system, audio system, social
presets, and the auto render pipeline) were each implemented, rendered, and
verified in sequence on 2026-07-14/15. See `PROJECT-STATUS.md` for the full,
current verification record — it is the source of truth for what's been
tested, not this file.

- Node.js v22.22.2, npm 10.9.7
- FFmpeg 6.1.1 (installed via `apt-get install ffmpeg`)
- Chromium headless shell (pre-installed at
  `/opt/pw-browsers/chromium_headless_shell-1194/`, wired up in
  `remotion.config.ts` with an automatic fallback — see `TROUBLESHOOTING.md`
  if rendering fails on a different machine)
- Remotion 4.0.489, React 19.2.3, TypeScript 5.9.3, @remotion/captions 4.0.489
- Official Remotion Agent Skill installed via `npx -y skills@latest add remotion-dev/skills`

## Scope

This is a local rendering engine only. No cloud rendering, paid APIs
(including paid transcription — captions are generated locally from
`assets/script.txt` by even word-timing, not speech-to-text), social-media
posting, or databases are configured — see `PROJECT-STATUS.md` for what's
intentionally out of scope and why.
