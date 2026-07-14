# Project Status

Last verified: **2026-07-15** (Phases 1–6 of the production video engine)

## Status: ✅ Operational

The Isaac Video Engine is a complete local Remotion video-generation system:
component library, motion system, audio system, brand theming, social
presets, and a one-command auto render pipeline. Every phase below was
implemented, rendered, and verified before moving to the next, per the
project's build order.

## Phase-by-phase build record

### Phase 1 — Core engine

- Confirmed the original Remotion setup still rendered correctly before any
  new work began (regression check).
- Added `src/lib/types.ts` (shared contracts: `Scene`, `MediaAsset`,
  `CaptionLine`, `TransitionSpec`, `BrandTheme`, `SocialPreset`,
  `AudioTrackSpec`), `src/lib/motion.ts` (springs, easing, Ken Burns,
  transition styles), `src/lib/audio.ts` (fade/duck volume math),
  `src/presets/social.ts` (6 platform presets), `src/branding/themes.ts`
  (4 brand themes: `isaac-video-engine`, `tysons-time`, `tysons-picks`,
  `imagin-concierge`).
- Verified: `tsc --noEmit` clean; original composition re-rendered
  identically (1080×1920, 30fps, 10.0s, 1.09MB).

### Phase 2 — Reusable component library

12 theme-driven components added to `src/components/`: `Title`,
`Subtitle`, `LowerThird`, `ProgressBar`, `EndCard`, `CTAScreen`,
`LogoWatermark`, `SpeechBubble`, `ThoughtBubble`, `AnimatedSticker`,
`BackgroundGradient`, `AnimatedCaptions` (word-by-word highlighting via
the official `@remotion/captions` `createTikTokStyleCaptions` pattern).
None hardcode brand colors/fonts/logos — all take a `theme` prop.

Verified: rendered `ComponentShowcase` composition (exercises all 12) and
visually inspected 8 frames — every component displays and animates
correctly, including live word-by-word caption highlighting. Found and
fixed a real bug during verification: `LogoWatermark` crashed the render
with a 404 when a brand's logo file didn't exist yet; fixed with an
`onError` fallback to watermark text.

### Phase 3 — Motion system

`kenBurnsTransform()` (6 directions: in/out/pan-left/right/up/down),
`transitionInStyle()`/`transitionOutStyle()` (fade/slide/zoom/blur),
`MediaScene.tsx` (applies both to one scene's image/video), `Timeline.tsx`
(sequences a `Scene[]`).

Verified: rendered `MotionTest` composition against real (synthetic
SMPTE-bar) test images and inspected 7 frames spanning every Ken Burns
direction and every transition kind — all confirmed visually correct
(e.g. slide transitions show the correct incoming edge, blur transitions
show the filter easing to zero).

### Phase 4 — Audio system

`BackgroundMusic.tsx` (fade in/out + automatic ducking during supplied
frame ranges), `VoiceoverTrack.tsx`, `SoundEffect.tsx`.

Verified two ways: (1) rendered `AudioTest` (12s, fade in/out, mid-video
ducking under a simulated voiceover) and ran `ffmpeg volumedetect` on 5
isolated time segments — fade-in/fade-out measurably quieter than steady
state, and pre-duck/post-duck segments identical (-26.4dB mean both
times), confirming the duck-and-recover cycle; (2) directly evaluated
`computeTrackVolume()` at key frames and got exact expected values (0 at
fade start, 0.8 steady state, 0.16 = 0.8 × 0.2 while ducked). Found and
fixed a real bug during verification: `VoiceoverTrack`/`SoundEffect` were
reading `useVideoConfig().durationInFrames` (the *whole composition's*
duration) for fade timing instead of their enclosing `Sequence`'s
duration — fixed by requiring an explicit `durationInFrames` prop.

### Phase 5 — Social presets

`src/presets/social.ts` held preset data since Phase 1 but nothing
consumed it. Added `SocialPresetPreview` composition, registered once per
preset via `listSocialPresets().map(...)`, proving presets drive real
`<Composition>` width/height/fps.

Verified: rendered 3 presets with different aspect ratios (`tiktok`
1080×1920, `square-post` 1080×1080, `story` 1080×1920) and confirmed
actual output dimensions/fps via `ffprobe` match the preset data exactly;
visually confirmed each preset's safe-zone rectangle is sized/positioned
correctly for its platform.

### Phase 6 — Auto render pipeline

`scripts/render-short.mjs` (`npm run render:short`): discovers media in
`assets/images`/`assets/videos`, probes video durations with `ffprobe`,
builds a `Scene[]` with alternating Ken Burns directions and transition
kinds, finds optional music/logo/script/CTA/end-card files, and renders
via `remotion render AutoShort --props=<generated JSON>`.
`compositions/AutoShort.tsx` is the render target — brand-agnostic,
duration computed from props via `calculateMetadata`. Symlinked
`assets/ -> public/assets/` so the user-facing drop folder and Remotion's
actual static-file root are the same physical directory.

Verified: (1) empty `assets/` produces a clear "no media found" error,
exit code 1, no crash; (2) dropped in 3 sample images, a music track, a
logo, and script/CTA/end-card text (synthetic content, standing in for
real assets), ran `npm run render:short`, confirmed via `ffprobe`
(1080×1920, 30fps, 13.0s = 3×90 + CTA 60 + end card 60 frames exactly,
both h264 and aac streams present) and 5 inspected frames that motion,
transitions, word-by-word captions from `script.txt`, logo watermark,
CTA, and end card all render correctly from auto-discovered media.

## Installed components

| Component | Version |
|---|---|
| Node.js | v22.22.2 |
| npm | 10.9.7 |
| FFmpeg | 6.1.1-3ubuntu5 |
| remotion | 4.0.489 |
| @remotion/cli | 4.0.489 |
| @remotion/captions | 4.0.489 |
| @remotion/tailwind-v4 | 4.0.489 |
| @remotion/eslint-config-flat | 4.0.489 |
| react | 19.2.3 |
| react-dom | 19.2.3 |
| typescript | 5.9.3 |
| tailwindcss | 4.0.0 |
| eslint | 9.19.0 |
| prettier | 3.8.1 |
| Chromium (rendering) | pre-installed headless shell, build 1194 (this environment); Remotion manages its own on a normal machine |

## Compositions registered (src/Composition.tsx)

| ID | Purpose |
|---|---|
| `IsaacVideoEngineTest` | Original Phase 1 verification video — standing regression test |
| `ComponentShowcase` | Exercises all 12 Phase 2 components — standing visual regression test |
| `MotionTest` | Exercises all Ken Burns directions + transition kinds — standing motion regression test |
| `AudioTest` | Exercises fade in/out + ducking — standing audio regression test |
| `SocialPreset-<name>` × 6 | One per social preset, proves preset data drives real dimensions |
| `AutoShort` | The render target for `npm run render:short` — takes discovered-media props |

All are safe to re-render at any time as a smoke test of the whole engine.

## Known environment-specific detail

`remotion.config.ts` points at a pre-installed Chromium headless shell
because this container blocks Remotion's normal Chrome download host
(`remotion.media`). This is auto-detected and only applies when that exact
path exists — see `TROUBLESHOOTING.md`. On an unrestricted machine (e.g. a
real Mac), no action is needed; Remotion downloads and manages its own
Chrome automatically.

## Explicitly out of scope

- Cloud rendering (Remotion Lambda, etc.)
- Paid third-party APIs, including paid speech-to-text — captions are
  generated locally from `assets/script.txt` by even word-timing
- Social-media auto-posting
- Databases
- Any integration unrelated to local MP4 generation

## Next steps for future requests

Drop media into `assets/images/`, `assets/videos/`, optionally
`assets/music/`, `assets/logos/`, `assets/script.txt`, and run
`npm run render:short` (optionally with `BRAND=`/`PRESET=`/`OUTPUT=`) —
or ask Claude Code in plain language, e.g. *"Create a 15-second vertical
Tyson video using the files in assets."* See `VIDEO-BRIEF-TEMPLATE.md` and
`CLAUDE.md` for how that request gets turned into a rendered file, and
which of the two workflows (auto pipeline vs. hand-authored composition)
applies.
