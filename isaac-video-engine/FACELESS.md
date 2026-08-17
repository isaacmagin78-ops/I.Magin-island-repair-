# Faceless videos — text file in, finished video out

You write words in a text file. You run one line. You get a vertical video
with no footage, no camera, and nobody on screen.

Nothing to set up. Nothing to maintain. If you never open this file again, the
command still works.

---

## The whole thing

**1. Open this one file and write your lines:**

```
isaac-video-engine/assets/faceless/next.txt
```

**2. Run this one line** (in the `isaac-video-engine` folder):

```bash
BRAND=tysons-time PRESET=youtube-shorts npm run render:script
```

**3. Your video is here:**

```
isaac-video-engine/out/faceless-short.mp4
```

That's it. Everything below is optional.

---

## How to write the file

One idea per card. A blank line starts a new card.

```
The first month sets the rhythm

A new dog does not need more freedom
He needs a smaller world he can trust

Same walk. Same route. Same hour.

Follow for the rest of the first 30 days
```

Four rules, and there are no others:

- **A blank line starts a new card.**
- **The first line of a card is the big line** — the one people read.
- **Any lines under it** become the smaller line underneath, in the brand colour.
- **A line starting with `#`** is a note to yourself. It never appears in the video.

You do not set timings. Each card stays up for as long as it takes to read it,
between 2.4 and 6.5 seconds. Six short cards comes out around 28 seconds.

**Don't** put a card's whole paragraph on one line. If a line feels long when
you say it out loud, it is long. Split it.

---

## Changing the look

Add either of these in front of the command. Both are optional.

| | What it does | Choices |
|---|---|---|
| `BRAND=` | Colours, typeface, watermark | `tysons-time`, `tysons-picks`, `legends-ranch`, `wildlife-center`, `imagin-concierge`, `luxury-coastal`, `isaac-video-engine` |
| `PRESET=` | Shape and safe zones | `youtube-shorts`, `tiktok`, `instagram-reels`, `facebook-reels`, `story`, `square-post`, `widescreen` |

Two more, rarely needed:

| | What it does |
|---|---|
| `FILE=` | Use a different text file instead of `assets/faceless/next.txt` |
| `OUTPUT=` | Save the video somewhere other than `out/faceless-short.mp4` |
| `EYEBROW=` | A small wide-spaced label above the first card only |

A full example with everything set:

```bash
FILE=assets/faceless/monday.txt \
BRAND=tysons-time \
PRESET=youtube-shorts \
EYEBROW="Tyson's Time" \
OUTPUT=out/monday.mp4 \
npm run render:script
```

The video is the same either way — same brand, same size. The preset only
changes the shape and which edges it keeps clear of the app's buttons.

---

## Getting it posted

**This step is still by hand, and this file will not pretend otherwise.**

The engine makes the video. **Blotato** posts it. Nothing currently carries the
file from one to the other — that connection has never been built.

Today, the honest sequence is:

1. Render the video (above).
2. Hand the file to a Claude session with the Blotato tools and say which
   channel and when. It uploads to Blotato storage and schedules the post.
3. Blotato publishes it on schedule.

Step 2 is the manual link. Blotato will not post from a file on this machine or
from a Google Drive link — the video has to be uploaded into Blotato's own
storage first, and only a session with those tools can do that.

**What would make it daily:** one scheduled job that renders the next text file,
uploads it, and schedules the post. Every piece of it exists and is proven; it
has simply never been strung together. Nobody should build it until it is worth
more than the ten minutes a day it replaces.

---

## What this deliberately does not do

- **No footage, no photos, no stills.** Type on a moving ground, nothing else.
  That is the point — it is the format that needs nothing from you but words.
- **No voice, no music.** The file has a silent audio track so every platform
  accepts it. Music can be added later; it is not needed to post.
- **No auto-posting from the engine.** Posting lives in Blotato, on purpose.
- **No AI-generated images.** The engine has some quarantined ones. They are
  never used here.

---

## If something goes wrong

| What you see | What it means |
|---|---|
| `No script file at …` | The path in `FILE=` is wrong, or `assets/faceless/next.txt` was deleted. |
| `… has no lines in it` | The file is empty, or every line starts with `#`. |
| A card's text looks small | That card is long. It stepped down a size so it would fit. Split the line. |
| The wrong brand name in the corner | Check `BRAND=`. Unknown names print a warning and fall back to the default. |

Everything else: `TROUBLESHOOTING.md` in this folder.

---

## For the next session

The composition is `ScriptShort` (`src/compositions/ScriptShort.tsx`),
registered in `src/Composition.tsx`, driven by `scripts/render-script.mjs`.
Cards are `src/components/ScriptCard.tsx`; the moving ground is
`src/components/AmbientBackdrop.tsx`, which is where the closed-palette rule
from `DESIGN-DIRECTION.md` is enforced in code. Timing lives in one place —
`scriptBeatDuration()` in `ScriptShort.tsx`.
