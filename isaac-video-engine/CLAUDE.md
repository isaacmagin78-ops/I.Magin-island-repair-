# CLAUDE.md — Isaac Video Engine

Instructions for Claude Code when asked to create or edit a video in this
project. Read this before touching any file here.

## First, read the official skill

Before authoring or editing a composition, read:

- `.agents/skills/remotion-create/SKILL.md` — scaffolding & starting studio
- `.agents/skills/remotion-best-practices/SKILL.md` — general dos/don'ts
- `.agents/skills/remotion-markup/SKILL.md` — React Markup patterns
- `.agents/skills/remotion-interactivity/SKILL.md` — keeping edits Studio-editable
- `.agents/skills/remotion-render/SKILL.md` — rendering
- `.agents/skills/remotion-captions/SKILL.md` — if the brief needs captions/subtitles
- `.agents/skills/mediabunny/SKILL.md` — if you need to inspect/transcode media

These are the authoritative, up-to-date instructions from Remotion. This file
only tells you how *this project* is organized and how to turn a plain-English
request into a rendered MP4 — it does not replace the skill docs.

## Two ways to produce a video — pick the right one

**1. The auto pipeline (`npm run render:short`)** — for "make me a video from
these photos/clips" requests where a scene-by-scene slideshow-with-motion is
enough (the vast majority of "create a video using the files in assets"
requests). Zero new code required. See "Workflow A" below.

**2. Hand-authored composition** — for requests with specific structure a
generic slideshow can't express: precise timing/dialogue, multiple named
segments, custom on-screen graphics, a non-vertical layout the pipeline
doesn't already produce as a preset composition, etc. See "Workflow B" below.

Default to Workflow A. Only reach for Workflow B when the request needs
something the pipeline genuinely can't produce.

## Standing configuration (do not change without reason)

- Default canvas: **1080 × 1920 @ 30fps** (vertical, 9:16) — see
  `src/presets/social.ts` for the other five supported platform sizes
- Language: TypeScript
- Styling: Tailwind is available (`@remotion/tailwind-v4`), plain inline
  styles are also fine and are what every existing component uses
- Entry point: `src/index.ts` → `src/Root.tsx` → `src/Composition.tsx`
- Every visual component takes a `theme: BrandTheme` prop
  (`src/branding/themes.ts`) — never hardcode a brand's colors, font, or
  logo path inside a component

## Workflow A: the auto pipeline

Given a request like *"Create a 15-second vertical Tyson video using the
files in assets"*:

1. **Place media.** If the user hasn't already dropped files into
   `assets/images/` and/or `assets/videos/`, either ask them to, or if they
   gave you files/URLs directly, save them there yourself. Optionally add
   music to `assets/music/`, a logo to `assets/logos/`, narration text to
   `assets/script.txt` (auto-captioned by even word timing — see
   "Captions without a transcription API" below), a CTA line to
   `assets/cta.txt`, and a closing line to `assets/endcard.txt`.
2. **Pick brand and preset.** Match `BRAND` to the brand named in the
   request (`tysons-time`, `tysons-picks`, `imagin-concierge`, or add a new
   one — see "Adding a new brand" below) and `PRESET` to the platform
   named, if any (default `tiktok` covers most vertical short requests).
3. **Run it:**
   ```bash
   BRAND=<brand-id> PRESET=<preset-name> OUTPUT=out/<descriptive-name>.mp4 npm run render:short
   ```
4. **Verify the output** (see "How to verify a render" below) before
   reporting success.
5. **Report back** the exact output path and what was rendered (scene
   count, brand, preset, duration).

The pipeline (`scripts/render-short.mjs`) handles discovery, timeline
building, Ken Burns motion, transitions, captions, and branding
automatically — read it if you need to understand or extend its behavior,
but you should not need to edit it per-request. If a request needs pacing
or scene-count control the pipeline doesn't expose, that's a signal to
either extend the pipeline's env vars (durable, reusable) rather than
hand-authoring a one-off composition (see the maintainability note at the
bottom of this file).

## Workflow B: hand-authored composition

1. **Read the brief.** If the user gave a one-liner, treat duration,
   subject, and `assets/` as the brief; otherwise use
   `VIDEO-BRIEF-TEMPLATE.md` to fill in gaps (ask only if something blocks
   correctness — otherwise use sane defaults matching the dark/modern style
   established by the reference compositions).
2. **Reuse components first.** Check `src/components/` before writing new
   UI — titles, subtitles, lower thirds, progress bars, CTA screens, end
   cards, logo/watermark, speech/thought bubbles, animated stickers,
   background gradients, and word-by-word captions all already exist and
   take a `theme` prop. Reach for `src/components/Timeline.tsx` +
   `MediaScene.tsx` if the video is fundamentally a sequence of
   photos/clips with motion — that's the same machinery the auto pipeline
   uses, exposed for hand-authoring.
3. **Compute frame count:** `durationInSeconds * fps` (fps from the chosen
   preset, default 30). A 15-second video at 30fps is `450` frames.
4. **Create a new composition** under `src/compositions/<Name>.tsx`,
   assembled from `src/components/`. Pass the right `theme` (from
   `getBrandTheme()`) and, if relevant, the right `SocialPreset` (from
   `getSocialPreset()`) through to components that need safe-zone or
   dimension info.
5. **Register it** as a new `<Composition>` in `src/Composition.tsx` with a
   unique `id` and the computed `durationInFrames`/`fps`/`width`/`height`.
   Do not remove or repurpose any existing composition — they are standing
   regression/reference tests (see `PROJECT-STATUS.md`).
6. **Typecheck:** `npx tsc --noEmit` must be clean before rendering.
7. **Render:**
   ```bash
   npx remotion render <composition-id> out/<descriptive-name>.mp4
   ```
8. **Verify the output** (see "How to verify a render" below).
9. **Report back** the exact output path and a one-line description of
   what was rendered. Do not claim success without having run the
   verification step.

## How to verify a render

Never report a render as done without checking it. At minimum:

```bash
ffprobe -v error -show_format -show_streams out/<name>.mp4
```

Confirm: file exists and is non-empty, resolution/fps match what was
requested, duration is in the right ballpark, both a video and audio stream
are present (Remotion always writes a silent audio track if no `<Audio>` is
used — that's expected, not an error). Then pull a few representative
frames and actually look at them:

```bash
ffmpeg -y -i out/<name>.mp4 -vf "select='eq(n,<frame>)+eq(n,<frame>)+...'" -vsync 0 /tmp/check/frame_%02d.png
```

Read the resulting PNGs with the Read tool. Full details and more edge
cases in `TROUBLESHOOTING.md`.

## Adding a new brand

Add one entry to `BRAND_THEMES` in `src/branding/themes.ts` (colors,
`fontFamily`, optional `logo` path under `assets/logos/`, optional
`watermarkText`). No component code changes are needed — every component
already reads from whatever theme it's given.

## Captions without a transcription API

Per project scope, there is no speech-to-text integration. The auto
pipeline instead splits `assets/script.txt` into words and distributes them
evenly across the video's total scene duration — good enough for
on-screen captions that roughly track a script, not a substitute for
matching real spoken timing. If a request needs captions matched to actual
narration audio timing, that would require adding a transcription
dependency — flag this to the user rather than silently approximating it
as exact.

## Things not to do (out of scope for this phase)

Per project scope, do not add, wire up, or suggest without being asked:
cloud rendering services, paid third-party APIs (including paid
transcription), social-media auto-posting, or databases. Keep this a
local, file-based engine.

## Rendering environment note

`remotion.config.ts` auto-detects a pre-installed Chromium at a known
container path and falls back to Remotion's own downloaded headless Chrome
if that path doesn't exist (e.g. on a real Mac/PC) — you shouldn't need to
touch this. If a render fails with a Chrome/browser download error, see
`TROUBLESHOOTING.md`.

## Maintainability over one-off convenience

This engine is meant to power hundreds of future videos, not just the one
in front of you. When a request seems to need something new:

- If it's a new *visual element* (another kind of overlay, bubble, card),
  add it to `src/components/` as a theme-driven, brand-agnostic component —
  not inline JSX in a single composition.
- If it's a new *motion or transition*, add it to `src/lib/motion.ts` next
  to the existing primitives, not as one-off `interpolate()` calls in a
  composition.
- If it's a new *platform target*, add it to `src/presets/social.ts`, not
  a hardcoded width/height in a composition.
- If it's a new *brand*, add it to `src/branding/themes.ts`, not hardcoded
  colors in a component.

A hand-authored composition should mostly be *assembly* of existing
pieces. If you find yourself writing a lot of new animation/styling logic
inside a `compositions/*.tsx` file, stop and ask whether it belongs in
`components/` or `lib/` instead.
