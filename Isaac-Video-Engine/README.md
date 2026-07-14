# Isaac Video Engine

A local, reusable Remotion video-generation engine. This project exists so that
Claude Code (or any operator) can generate vertical MP4 videos from a simple
request, without re-explaining the setup every time.

- **Framework:** [Remotion](https://www.remotion.dev/) 4 + React 19 + TypeScript
- **Format:** 1080 × 1920 (vertical, 9:16), 30 fps
- **Output:** real MP4 files (H.264 video + AAC audio) via FFmpeg
- **Skill:** the official Remotion Agent Skill (`remotion-dev/skills`) is installed
  in `.agents/skills/` and drives how Claude authors new compositions

## Project structure

```
Isaac-Video-Engine/
├── assets/                    # Put source media here (images, audio, fonts, video clips)
├── public/                    # Static assets Remotion can reference at render time
├── out/                       # Rendered MP4s land here (gitignored)
├── src/
│   ├── index.ts                # Remotion entry point (registerRoot)
│   ├── Root.tsx                 # Registers all compositions
│   ├── Composition.tsx          # <Composition> definitions (id, size, fps, duration)
│   ├── components/              # Reusable building blocks (titles, progress bars, etc.)
│   └── compositions/            # Full video "scenes" assembled from components
├── remotion.config.ts          # CLI render/studio configuration
├── package.json
└── .agents/skills/              # Official Remotion Agent Skill (installed, do not hand-edit)
```

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

This starts a local server and prints a URL (e.g. `http://localhost:3000`).
Open it in a browser to preview compositions, scrub the timeline, and check
for errors before rendering.

### 3. Render the verification video

```bash
npm run render
```

This renders the `IsaacVideoEngineTest` composition to:

```
out/isaac-video-engine-test.mp4
```

### 4. Render any other composition

```bash
npx remotion render <composition-id> out/<name>.mp4
```

Composition IDs are declared in `src/Composition.tsx`.

## Requesting a new video

Once this engine is set up, you can ask Claude Code for a video in plain
language, e.g.:

> "Create a 15-second vertical Tyson video using the files in assets."

See `VIDEO-BRIEF-TEMPLATE.md` for the fields Claude will use to plan it, and
`CLAUDE.md` for exactly how Claude should build it.

## Verified environment

This engine was set up and verified in this environment on 2026-07-14:

- Node.js v22.22.2, npm 10.9.7
- FFmpeg 6.1.1 (installed via `apt-get install ffmpeg`)
- Chromium headless shell (pre-installed at
  `/opt/pw-browsers/chromium_headless_shell-1194/`, wired up in
  `remotion.config.ts` — see `TROUBLESHOOTING.md` if rendering fails on a
  different machine)
- Remotion 4.0.489, React 19.2.3, TypeScript 5.9.3
- Official Remotion Agent Skill installed via `npx -y skills@latest add remotion-dev/skills`

Test render produced `out/isaac-video-engine-test.mp4`: 1080×1920, 30 fps,
H.264/AAC, ~10.0s, 1.09 MB, verified with `ffprobe` and by inspecting the
first/middle/last frames.

## Scope

This phase is a local rendering engine only. No cloud rendering, paid APIs,
social-media posting, or databases are configured — see `PROJECT-STATUS.md`
for what's intentionally out of scope.
