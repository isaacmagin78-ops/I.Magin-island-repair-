# Morning brief — the Linda pitch

Everything is generated and committed. Nothing to run, nothing to set up.
Just open the files below.

**Where it all lives:**
`Listing-Content-System/out/111-pompano-beach-611/`

This is the package for her real active listing — 111 N Pompano Beach Blvd
Unit 611, The Sea Monarch, $775,000, MLS B26053249. 19 files.

---

## Read these three first (10 minutes)

Read them in this order. This is the whole pitch.

1. **`agent-pitch.md`** — the sales document. One page, addressed to her,
   listing what came out of a single brief and ending with the ask. If you
   only read one file, read this one.
2. **`just-listed-caption.txt`** — ready-to-post launch caption. Real price,
   real features, her real phone and brokerage. This is the "oh, that's
   actually good" moment.
3. **`seller-value-summary.md`** — the seller-facing report. This is the one
   that matters most to *her business*, because it's what she hands a seller
   to win the listing appointment. Photos alone don't do this.

## Then skim these if you have time

- `cinematic-listing-video.md` — the 60–90s film plan (hook, 3-act shot list,
  voiceover, CTA)
- `reel-1-lifestyle.md`, `reel-2-features.md`, `reel-3-urgency.md` — three
  reels, three different buyer angles
- `story-slides.md` — 5-slide story launch sequence
- `open-house-promo.md` / `open-house-recap.md` — event promo and the
  post-event "still in demand" follow-up
- `under-contract-template.md` — the post that turns her sale into her next
  seller lead
- `signage/` — three print-ready QR codes (yard sign, open-house sign,
  flyer), each tracked separately so she can tell a seller how many scans
  each sign produced
- `README.md` — launch-order checklist and the data provenance block

---

## Three things you need FROM Linda before anything gets published

These are already flagged inside the package. Don't publish without them.

1. **The open-house date and time.** The brief has
   `[CONFIRM DATE — held late June 2026]` as a placeholder. The recap asset
   can't go out until she confirms the real date.
2. **Attendance numbers.** The recap uses `[N] buyer groups`. The system
   deliberately refuses to guess — never inflate this.
3. **Her authorization, full stop.** Every asset carries her name, phone,
   and ONE Sotheby's branding. She has final say on all of it. The package
   README says this out loud, which is the right instinct — leave it in.

---

## Two small things I noticed

Neither blocks tomorrow. Just so you're not surprised.

1. **The caption has 7 hashtags. Instagram's limit is 5** — your own
   HANDOFF.md notes it's a hard API error above 5. If any of this gets
   posted to Instagram, trim two hashtags first. Worth fixing in the
   generator later so it never bites you.
2. **The video isn't rendered yet.** The handoff files
   (`video-engine/script.txt`, `cta.txt`, `endcard.txt`) are written and
   ready, but rendering the actual reel needs her listing photos. That's a
   natural thing to ask her for — and a good reason for a second
   conversation.

---

## The one-line version, if you only remember one thing

You're not asking her to buy software. You're showing her what one listing
brief produced in a few minutes, and asking for her next listing to run it
on for real. The ask is already written at the bottom of `agent-pitch.md`.

---

*To regenerate this package any time (e.g. after editing the brief):*

```bash
cd Listing-Content-System
npm install          # only needed once
node scripts/generate-package.mjs listings/111-pompano-beach-611.json
```
