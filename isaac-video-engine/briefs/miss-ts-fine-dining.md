# Brief — "Miss T's" (fine dining short + menu poster)

**Status:** delivered
**Compositions:** `MissTsFineDining` (1080×1920, 30fps, 434f / 14.47s), `MissTsPoster` (1080×1350 still)
**Brand:** `miss-ts`
**Outputs:** `exports/miss-ts-fine-dining.mp4`, `exports/miss-ts-poster.png`
**Microsite:** https://claude.ai/code/artifact/382ae4ba-680c-492e-b329-9b8598aa4af8
(private until shared — a straight-faced restaurant page carrying the film,
the menu and the beat sheet)

## The ask

Make a funny meme out of one clip: Miss T (kitten) eating from a silver
serving dish on top of her cat tower. The real story is that her food had to
be moved up there because Tyson (pitbull) would clear the bowl in one lick,
and she likes to take her time. Wanted something impressive enough to send to
friends.

## The angle

Play it completely straight as an exclusive rooftop restaurant. The comedy is
in the register mismatch — hairline gold rules, Playfair Display, tracked
small caps and a five-star pull quote, all deployed on a kitten and a sugar
bowl. Nothing in the copy ever admits it's a joke.

## Structure

The edit carries the premise, not just the captions: Miss T's footage runs
**under speed** the whole way through (she takes her time), and is
interrupted exactly once by a hard, **full-speed** cut to Tyson.

| Act | Frames | Source | Beat |
|---|---|---|---|
| I · The establishment | 0–190 | 0.00–5.10s @ 0.80× | Title plate, "Management relocated her dining room." |
| II · The incident | 191–228 | Tyson, 1.0× | Smash cut — `TYSON / ONE LICK. BOWL GONE.` |
| III · The look | 229–333 | 5.10–7.85s @ 0.785× | "…take her time." → the punchline lands on her look to camera |
| IV · The card | 334–433 | frozen still | Five-star establishment card |

The source is one continuous 7.87s handheld take with a natural push-in that
ends on Miss T looking straight down the lens. That look is the punchline, so
Act II is placed *before* it and the final caption is timed to land on it.
Acts I and III are contiguous halves of the same take at nearly the same
rate, so the cut back from Tyson reads as continuous.

## Source media

| File | Origin |
|---|---|
| `assets/videos/miss-t-dining-source.mp4` | Uploaded `IMG_0291.mov` (HEVC 1920×1080 + 90° rotate flag) transcoded to H.264 1080×1920 |
| `assets/videos/tyson-incident.mp4` | 10.15–11.40s of `exports/tyson-vs-miss-final-mix.mp4`, sharp 16:9 window cropped out and re-framed to 9:16 |
| `assets/images/miss-t-look.jpg` | Frame at 7.30s — the look to camera |
| `assets/images/miss-t-dining.jpg`, `miss-t-poster-photo.jpg` | Frame at 5.63s; the poster crop keeps the silver dish in shot |
| `assets/music/dining-piano-bed.wav` | 17s from the sparse intro of `legends-ranch-piano-score.wav`, loudness-normalised |
| `assets/sfx/*.wav` | Synthesised: maître d' bell, impact thud, closing chime |

Source audio was room tone at −45 to −51 dBFS with nothing usable, so the
clip is muted and the bed carries the track. The bed ducks to 22% under the
smash cut.

## Reusable pieces added

Everything typographic is theme-driven and brand-agnostic, per the
engine's rules — none of it is specific to this video:

- `lib/fonts.ts` — self-hosted Playfair Display / Anton / Inter with
  `delayRender` gating, so no frame is captured in a fallback face
- `components/MenuPlate.tsx` — identity plate that sits *over* footage
- `components/MenuCaption.tsx` — editorial serif caption with scrim
- `components/ImpactSlate.tsx` — heavy-condensed smash-cut slate
- `components/MenuList.tsx` — dotted-leader `label … value` rows
- `components/EstablishmentCard.tsx` — centred closing plate over held footage
- `BrandTheme` gained optional `accentFontFamily` / `impactFontFamily`
  (both fall back to system faces, so existing brands are unchanged)

## Rendering

```bash
npx remotion render MissTsFineDining out/miss-ts-fine-dining.mp4
npx remotion still  MissTsPoster    out/miss-ts-poster.png --frame=70
```

The poster's `--frame=70` is not optional — every element animates in, and 70
is past the last stagger.
