# Luxury Listing Content System

One listing shoot in → a complete luxury marketing package out. Built for the
way top-producing agents (think top-1% South Florida waterfront specialists)
actually market a premium listing: not a photo album, but a coordinated
content launch across the listing page, Instagram/TikTok, stories, email,
and open-house events.

Everything is local and deterministic — no APIs, no network. The same
listing brief always generates the same package, and every asset is a plain
text/markdown file you can edit before publishing.

## What one brief generates

| Asset | Purpose |
|---|---|
| `cinematic-listing-video.md` | 60–90s film plan: hook, 3-act shot list, on-screen text, voiceover, CTA |
| `reel-1-lifestyle.md` | Vertical reel — POV lifestyle angle |
| `reel-2-features.md` | Vertical reel — top-5 features countdown |
| `reel-3-urgency.md` | Vertical reel — market-urgency angle |
| `story-slides.md` | 5-slide story sequence (tease → numbers → feature → lifestyle → CTA) |
| `open-house-promo.md` | Event promo: headline, body, clip text beats, RSVP CTA |
| `open-house-recap.md` | Post-event "in demand" recap (generated when `openHouse.isPast` is true) |
| `just-listed-caption.txt` | Ready-to-post launch caption with hashtags |
| `seller-value-summary.md` | Seller-facing report on the campaign and why it drives the sale |
| `under-contract-template.md` | Follow-up post that converts the win into new seller leads |
| `video-engine/` | `script.txt`, `cta.txt`, `endcard.txt` — drop-ins for the Isaac Video Engine auto pipeline |
| `README.md` | Package launch-order checklist |

Every asset includes a hook, the shots or visuals it needs, on-screen text,
voiceover/caption copy, and a CTA — conversion-focused, luxury tone.

## Usage

```bash
cd Listing-Content-System
node scripts/generate-package.mjs listings/sample-harborage-isle.json
```

Output lands in `out/<slug>/` (gitignored). To create a package for a new
listing, copy `LISTING-BRIEF-TEMPLATE.md`'s JSON skeleton into
`listings/<your-listing>.json`, fill it in, and run the generator.

## Rendering the actual vertical video

The package's `video-engine/` folder hands off to the existing
[Isaac Video Engine](../Isaac-Video-Engine/):

1. Drop the shoot's photos into `Isaac-Video-Engine/assets/images/` (and/or
   clips into `assets/videos/`, music into `assets/music/`).
2. Copy `out/<slug>/video-engine/*.txt` into `Isaac-Video-Engine/assets/`.
3. Render:

   ```bash
   cd ../Isaac-Video-Engine
   BRAND=luxury-coastal PRESET=tiktok OUTPUT=out/<slug>-reel.mp4 npm run render:short
   ```

The `luxury-coastal` brand theme (deep navy / champagne gold) lives in
`Isaac-Video-Engine/src/branding/themes.ts` alongside the other brands.

## The listing brief

See `LISTING-BRIEF-TEMPLATE.md` for the full field reference, and
`listings/sample-harborage-isle.json` for a filled-in example (a fictional
Fort Lauderdale deepwater estate).

Ground rules baked into the templates:

- **Real numbers only** — recap and under-contract templates use `[N]`/`[X]`
  placeholders and explicitly say never to inflate them.
- **Fictional sample data** — the sample listing, agent, and contact info are
  invented; replace them with your own before publishing anything.
- **Edit before posting** — generated copy is a strong first draft in a
  consistent luxury voice, not a substitute for your judgment on a live deal.
