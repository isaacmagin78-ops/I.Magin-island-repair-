# Video Brief — Sea Monarch Unit 611 (Dramatic Luxury Listing)

- **Brand:** IMagin Concierge (`BRAND=imagin-concierge`)
- **Working name:** `sea-monarch-611`
- **Platform / preset:** vertical short-form (`PRESET=tiktok`; also suitable
  for `instagram-reels` / `youtube-shorts`)
- **Assets to use:** listing photos/clips of the unit and ocean views placed
  in `assets/images/` / `assets/videos/`, ordered by filename. Save the most
  striking ocean-view shot for last — it is the emotional payoff.
- **Output filename:** `out/sea-monarch-611.mp4`

## Voiceover script (dramatic luxury)

Imagine waking up above the Atlantic in a residence that feels like a
private coastal escape.

Welcome to Sea Monarch Unit 611 in Pompano Beach — a fully renovated, fully
furnished oceanfront condo offering 2 bedrooms, 2 baths, and 1,450 square
feet of elevated living.

From the first step inside, the home delivers a sense of space, light, and
refinement.

The open layout flows effortlessly, creating a backdrop for both relaxed
living and unforgettable entertaining.

Every finish feels intentional. Every view feels rare.

And just beyond the windows, the ocean becomes part of your everyday
lifestyle.

The primary suite offers a peaceful retreat, while the guest bedroom and
additional bath add comfort, flexibility, and sophistication.

This is more than a condo — it is a statement of luxury, ease, and
beachfront living at its finest.

In a market where true oceanfront opportunities are limited, Sea Monarch
Unit 611 stands apart.

## Dramatic on-screen text

- Oceanfront Luxury in Pompano Beach
- Sea Monarch Unit 611
- Fully Renovated
- Fully Furnished
- 2 Bed | 2 Bath | 1,450 Sq Ft
- Unobstructed Ocean Views
- Rare Turnkey Opportunity

## Style direction

Use slower motion, stronger pauses, richer music, and more contrast in the
edit. Let the ocean shots feel cinematic and premium, and use the most
striking view as the emotional payoff at the end.

## Pipeline wiring

The auto pipeline text assets are loaded with this brief's content:

- `assets/script.txt` — the voiceover above (drives word-by-word captions)
- `assets/cta.txt` — "Rare Turnkey Opportunity"
- `assets/endcard.txt` — "Sea Monarch Unit 611 — Oceanfront Luxury in Pompano Beach"

Render with:

```bash
BRAND=imagin-concierge PRESET=tiktok OUTPUT=out/sea-monarch-611.mp4 npm run render:short
```

## Possible variations (not yet produced)

- More aggressive and salesy
- More elegant, Sotheby's-style
- Trimmed to a 30-second reel
