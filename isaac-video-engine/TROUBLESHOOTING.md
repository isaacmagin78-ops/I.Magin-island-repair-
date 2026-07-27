# Troubleshooting

## "Received a status code of 403 while downloading ... Host not in allowlist: remotion.media"

Remotion tries to download its own headless Chrome from `remotion.media` the
first time it renders. In a network-restricted environment (sandboxed
container, locked-down CI) that host may be blocked by egress policy.

**Fix used in this project:** `remotion.config.ts` auto-detects a
pre-installed Chromium at:

```
/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

and calls `Config.setBrowserExecutable(...)` to use it instead, via
`existsSync()` — so it only activates when that path exists.

**On a machine without egress restrictions (a normal Mac/PC):** that path
won't exist, the check falls through, and Remotion downloads and manages its
own headless Chrome automatically — no action needed.

**If you're on a different restricted environment** with a different
Chrome/Chromium path, either:
- set the `REMOTION_BROWSER_EXECUTABLE` environment variable to the full
  path of a Chrome/Chromium/headless-shell binary before rendering, or
- edit the `fallbackBrowserPath` constant in `remotion.config.ts`.

## `npx create-video@latest` refuses to scaffold: "Something already exists"

`create-video` will not scaffold into a non-empty directory. If you need to
re-scaffold, run it into an empty temp directory and copy the files in:

```bash
npx create-video@latest --yes --blank --no-tailwind /tmp/video-scaffold
rm -rf /tmp/video-scaffold/.git   # important: don't copy a nested .git
cp -a /tmp/video-scaffold/. ./
```

Always verify no `.git` directory got copied into this project afterward
(`ls -la` — there should be none; this project is tracked by the parent
repo's git, not its own).

## TypeScript errors

Run:

```bash
npx tsc --noEmit
```

Fix reported errors before rendering — Remotion Studio will also surface
these in the browser, but `tsc` is faster to iterate against.

## Studio won't start / port already in use

```bash
npx remotion studio --port 3457
```

Pick a free port explicitly.

## Render succeeds but audio track sounds/looks wrong

Remotion always writes an audio track (silent by default if no `<Audio>` is
used in the composition). This is expected and not an error — `ffprobe` will
show an AAC stream even for a silent composition.

## How to verify a render

After any render, confirm the output is real and correct:

```bash
# 1. File exists and is a valid MP4
file out/<name>.mp4
ls -la out/<name>.mp4

# 2. Technical metadata (resolution, fps, duration, codecs)
ffprobe -v error -show_format -show_streams out/<name>.mp4

# 3. Visual spot-check: pull first/middle/last frames as PNGs
ffmpeg -y -i out/<name>.mp4 \
  -vf "select='eq(n,0)+eq(n,<middle_frame>)+eq(n,<last_frame>)'" \
  -vsync 0 /tmp/frame-check/frame_%02d.png
```

Then actually look at the extracted PNGs (e.g. via the Read tool) — don't
declare a render correct from ffprobe metadata alone.

## Chromium sandbox errors (`No usable sandbox`, `EPERM`)

Some containers run as `root` without user namespaces, which can break
Chrome's sandbox. If you see sandbox-related crashes, Remotion's Chrome mode
already runs without the sandbox in most containerized setups; if it
persists, check whether the environment allows `--no-sandbox` execution and
that `libnss3`, `libatk1.0-0`, `libgbm1`, `libasound2` and related shared
libraries are installed (`apt-get install` list is in `README.md`).

## Missing shared libraries for Chromium

If Chromium fails to launch with errors about missing `.so` files, install:

```bash
apt-get update && apt-get install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64 \
  libpango-1.0-0 libcairo2 fonts-liberation
```

(Package names may differ slightly on non-Debian/Ubuntu systems.)

## `npm run render:short` says "No media found in assets/images/ or assets/videos/"

Nothing usable was found. Confirm:
- Files are directly inside `assets/images/` or `assets/videos/` (not a
  subfolder — the pipeline doesn't recurse).
- File extensions are recognized: images `.jpg`/`.jpeg`/`.png`/`.webp`,
  videos `.mp4`/`.mov`/`.webm`/`.m4v`.
- Filenames don't start with `test-pattern`, `test-music`, or
  `test-voiceover` — those prefixes are reserved for the engine's own
  diagnostic fixtures and are always excluded from auto-discovery.
- `assets/` still resolves as a symlink to `public/assets/`:
  `ls -la Isaac-Video-Engine | grep assets` should show
  `assets -> public/assets`. If it's a real (non-symlink) empty directory,
  something recreated it — remove it and re-run
  `ln -s public/assets assets` from the project root.

## `npm run render:short` fails with an image/logo 404 or `CancelledError`

A referenced file (usually a logo) doesn't exist under `public/assets/`.
`LogoWatermark` already falls back to the brand's watermark text if
`theme.logo` (or `logoOverride`) 404s — see "Logo image fails to load"
below. If a *scene* image/video 404s instead, the file was likely deleted
or renamed after the pipeline discovered it but before the render finished
reading it; just re-run `npm run render:short`.

## Logo image fails to load

`src/components/LogoWatermark.tsx` catches the image's `onError` and falls
back to rendering `theme.watermarkText` instead, so a missing/broken logo
file never fails a render. If you see the brand name as text instead of
your logo image, check that the file path in `theme.logo`
(`src/branding/themes.ts`) or the `logoOverride` prop actually exists
under `public/assets/logos/` and is a format the browser can decode (PNG/
JPG/WebP — not SVG with unusual features, not a corrupted file).

## Captions from `assets/script.txt` don't match the narration timing

This is expected — see CLAUDE.md "Captions without a transcription API".
The auto pipeline distributes words evenly across the total scene
duration; it does not listen to any audio. If you need captions that
actually track spoken narration timing, that requires a transcription
step this project intentionally does not include (no paid APIs). Either
accept the approximate timing, hand-time captions by constructing a
`Caption[]` directly in a hand-authored composition (see
`src/components/AnimatedCaptions.tsx`), or add a local (non-paid)
transcription tool as an explicit, separate decision.

## Background music doesn't ducking during narration in a hand-authored composition

`BackgroundMusic` only ducks during frame ranges you tell it about via
`duckDuringRanges`. If you added a `VoiceoverTrack` inside a `<Sequence>`
but didn't pass that Sequence's `[from, from + durationInFrames]` into the
`BackgroundMusic`'s `duckDuringRanges` prop, nothing will duck — see
`src/compositions/AudioTest.tsx` for a working example.

## How a render is verified in this project (reference)

`ffprobe`/frame-inspection alone doesn't prove *audio* behavior (fades,
ducking) — volume curves don't show up in a still frame. The audio system
was verified two ways, and either is reusable for future audio work:

```bash
# Isolate a time segment and read its measured loudness
ffmpeg -y -ss <start_seconds> -t <duration_seconds> -i out/<name>.mp4 \
  -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume"

# Or evaluate the pure volume-curve function directly (fast, exact, no audio ambiguity)
npx tsx -e "
import { computeTrackVolume } from './src/lib/audio';
console.log(computeTrackVolume({ frame: 150, durationInFrames: 360, track: { volume: 0.8, duckToVolume: 0.2 }, isDucked: true }));
"
```
