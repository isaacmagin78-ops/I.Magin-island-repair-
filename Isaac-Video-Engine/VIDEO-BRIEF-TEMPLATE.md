# Video Brief Template

Use this to turn a request into a video. Not every field needs to be filled
in by the requester — Claude should infer sensible defaults (matching the
dark/modern style of `isaac-video-engine-test.mp4`) for anything left blank,
and only ask a clarifying question if a gap would block correctness (e.g. no
usable asset at all for a video that requires one).

## Example minimal request

> "Create a 15-second vertical Tyson video using the files in assets."

That single sentence is enough to fill this template:

```
Title / working name: Tyson
Duration: 15s (450 frames @ 30fps)
Orientation: vertical (1080x1920) — standing default
Assets: everything currently in assets/
Style: dark/modern default, unless assets suggest otherwise
```

## Full template

- **Working name:** (used for the output filename, e.g. `tyson-15s`)
- **Duration:** in seconds (converted to frames at 30fps)
- **Orientation / size:** default 1080×1920 vertical unless told otherwise
  (e.g. 1920×1080 for horizontal, 1080×1080 for square)
- **Assets to use:** which files in `assets/` (images, clips, audio, logos)
  should appear, and where/when
- **Text content:**
  - Title
  - Subtitle / supporting line
  - Any additional captions or callouts
  - Closing / end-card text
- **Style notes:** color palette, tone (playful, serious, corporate,
  energetic), fonts if specific ones are required
- **Music / audio:** background track from `assets/`, voiceover, or silent
- **Must-have beats:** anything that must appear in a specific order
  (e.g. logo intro → clip → stat callout → end card)
- **Output filename:** defaults to `out/<working-name>.mp4` if not specified

## What Claude does with this

1. Fills in the template (explicitly or by inference) from the request.
2. Computes `durationInFrames = duration_seconds * 30`.
3. Builds/reuses components in `src/components/` and assembles a new
   composition in `src/compositions/`.
4. Registers it in `src/Composition.tsx`.
5. Renders, verifies, and reports the output path.

See `CLAUDE.md` for the full step-by-step workflow.
