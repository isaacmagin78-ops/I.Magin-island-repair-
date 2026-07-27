# Video Brief Template

Use this to turn a request into a video. Not every field needs to be filled
in by the requester — Claude should infer sensible defaults for anything
left blank, and only ask a clarifying question if a gap would block
correctness (e.g. no usable asset at all for a video that requires one).

## Example minimal request

> "Create a 15-second vertical Tyson video using the files in assets."

That single sentence is enough to fill this template, and is exactly what
the auto pipeline (`npm run render:short`) is for:

```
Brand: Tyson's Time (BRAND=tysons-time)
Duration: ~15s — driven by however many files are in assets/images and
  assets/videos (3s per image, actual length per video clip, capped 2-8s)
Platform / preset: vertical short-form default (PRESET=tiktok)
Assets: everything currently in assets/images, assets/videos,
  assets/music, assets/logos
Style: brand theme default (colors/font from src/branding/themes.ts)
```

## Full template

- **Brand:** which brand this is for (`tysons-time`, `tysons-picks`,
  `imagin-concierge`, or a new one — see CLAUDE.md "Adding a new brand")
- **Working name:** used for the output filename, e.g. `tyson-picks-ep4`
- **Duration:** in seconds. For the auto pipeline this is mostly a
  function of how much media is provided, not a dial to set directly — a
  duration request usually means "add/remove media until it's about this
  long," not "stretch the pacing." For a hand-authored composition,
  convert directly: `durationInFrames = duration_seconds * fps`.
- **Platform / preset:** `tiktok`, `instagram-reels`, `facebook-reels`,
  `youtube-shorts`, `square-post`, or `story` (see
  `src/presets/social.ts`). Default: `tiktok` (vertical, 1080×1920).
- **Assets to use:** which files should appear, and in what order. The
  auto pipeline orders by filename (alphabetical) — name files
  `01-intro.jpg`, `02-beach.jpg`, etc. if order matters.
- **Text content:**
  - Narration/script (`assets/script.txt`) → auto word-by-word captions
  - Call-to-action line (`assets/cta.txt`)
  - Closing / end-card line (`assets/endcard.txt`)
  - For a hand-authored composition: title, subtitle, lower-third labels,
    any other on-screen text
- **Style notes:** only needed if it should deviate from the brand's
  standing theme (`src/branding/themes.ts`) — e.g. a one-off accent color.
- **Music / audio:** background track (`assets/music/`, first file found
  is used by the auto pipeline), voiceover (`assets/voiceover/` — hand-
  authored compositions only, via `VoiceoverTrack`), or silent.
- **Must-have beats:** anything that must appear in a specific order or
  can't be produced by "photos/clips in sequence with motion + captions +
  CTA + end card" — this is the signal to use Workflow B (hand-authored)
  instead of the auto pipeline. See CLAUDE.md.
- **Output filename:** defaults to `out/isaac-short.mp4` (auto pipeline) or
  `out/<working-name>.mp4` (hand-authored) if not specified.

## What Claude does with this

**Auto pipeline (default):**
1. Places/confirms media in `assets/`, plus optional music/logo/script/
   CTA/end-card text.
2. Runs `BRAND=<id> PRESET=<name> OUTPUT=out/<name>.mp4 npm run render:short`.
3. Verifies the output (ffprobe + frame inspection) and reports the path.

**Hand-authored (only when the auto pipeline can't express the request):**
1. Fills in the template (explicitly or by inference) from the request.
2. Computes `durationInFrames = duration_seconds * fps`.
3. Assembles a new composition in `src/compositions/` from existing pieces
   in `src/components/`, passing the right brand theme and preset.
4. Registers it in `src/Composition.tsx`.
5. Renders, verifies, and reports the output path.

See `CLAUDE.md` for the full step-by-step workflow and how to choose
between the two paths.
