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

## Standing configuration (do not change without reason)

- Canvas: **1080 × 1920** (vertical, 9:16)
- Frame rate: **30 fps**
- Language: TypeScript
- Styling: Tailwind is available (`@remotion/tailwind-v4`), plain inline
  styles are also fine and used in the verification composition
- Entry point: `src/index.ts` → `src/Root.tsx` → `src/Composition.tsx`

## Workflow for a new video request

Given a request like *"Create a 15-second vertical Tyson video using the
files in assets"*:

1. **Read the brief.** If the user gave a one-liner, treat duration, subject,
   and `assets/` as the brief; otherwise use `VIDEO-BRIEF-TEMPLATE.md` to fill
   in gaps (ask only if something blocks correctness — otherwise use sane
   defaults matching the dark/modern style of the verification video).
2. **Inspect `assets/`** for any images, video clips, audio, or fonts the
   user wants used. Reference them from `public/` or directly via Remotion's
   `staticFile()` — copy user-supplied files into `public/` if they aren't
   already there.
3. **Compute frame count:** `durationInSeconds * 30`. A 15-second video is
   `450` frames.
4. **Create a new composition** under `src/compositions/<Name>.tsx`, built
   from small reusable pieces in `src/components/` (title, subtitle,
   progress/loader, image/video layers, end card, etc.). Prefer composing
   existing components in `src/components/` over duplicating logic.
5. **Register it** as a new `<Composition>` in `src/Composition.tsx` with a
   unique `id`, the standing `fps`/`width`/`height` above, and the computed
   `durationInFrames`. Do not remove the existing `IsaacVideoEngineTest`
   composition — it's the standing verification/reference composition.
6. **Typecheck:** `npx tsc --noEmit` must be clean before rendering.
7. **Sanity-check in Studio if useful:** `npm run studio` (headless-safe: it
   just starts a server; you don't need a real browser to confirm it
   bundles and serves without errors).
8. **Render:**
   ```bash
   npx remotion render <composition-id> out/<descriptive-name>.mp4
   ```
9. **Verify the output** the same way the original test video was verified
   (see `TROUBLESHOOTING.md` → "How to verify a render"): file exists,
   correct resolution/fps/duration via `ffprobe`, size > 0, and inspect
   first/middle/last frames with `ffmpeg -vf select=...` + image read.
10. **Report back** the exact output path and a one-line description of
    what was rendered. Do not claim success without having run the
    verification step.

## Style conventions established by the verification video

Reuse these unless the user asks for something different:

- Dark background (`#05070d`) with a subtle radial glow + grid overlay —
  see `src/components/DarkBackground.tsx`
- Bold sans-serif titles (`~90px`, weight 800, slight negative letter
  spacing, soft glow via `textShadow`)
- Muted accent color for subtitles/labels (`#9fb4ff`), uppercase, wide
  letter-spacing
- Entrances via `spring()` (damping ~200, stiffness ~110-120) combined with
  `interpolate()` for opacity/translateY; exits via a short `interpolate()`
  window (~20 frames) driving opacity/translateY in the opposite direction
- Progress bars / loaders: thin (6px) rounded track with a blue→purple
  gradient fill
- End cards: centered icon/mark + bold statement, entrance via a snappier
  spring (lower damping, higher stiffness) for a "pop" feel

## Things not to do (out of scope for this phase)

Per project scope, do not add, wire up, or suggest without being asked:
cloud rendering services, paid third-party APIs, social-media auto-posting,
or databases. Keep this a local, file-based engine.

## Rendering environment note

`remotion.config.ts` auto-detects a pre-installed Chromium at a known
container path and falls back to Remotion's own downloaded headless Chrome
if that path doesn't exist (e.g. on a real Mac/PC) — you shouldn't need to
touch this. If a render fails with a Chrome/browser download error, see
`TROUBLESHOOTING.md`.
