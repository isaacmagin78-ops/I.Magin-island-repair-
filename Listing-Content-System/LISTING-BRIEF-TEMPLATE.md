# Listing Brief Template

Copy this JSON skeleton into `listings/<slug>.json`, fill in every field,
then run `node scripts/generate-package.mjs listings/<slug>.json`.

```json
{
  "slug": "short-url-safe-name",
  "address": "Street address shown on all assets",
  "neighborhood": "Neighborhood or community name",
  "city": "City",
  "state": "FL",
  "price": "$0,000,000",
  "beds": 4,
  "baths": 3.5,
  "sqft": "3,200",
  "lotOrWaterfrontage": "optional — e.g. 100' of deepwater frontage",
  "yearBuiltOrRenovated": "optional — e.g. Fully renovated 2024",
  "headlineFeature": "The one line that sells the home (used as the film hook)",
  "features": [
    "3–6 entries, best first — each becomes a shot in the film and reels",
    "Lead with what buyers at this price point actually ask about",
    "Concrete beats vague: '24,000 lb boat lift' > 'great dock'"
  ],
  "lifestyle": "One sentence about the life this home enables — used as the emotional close.",
  "agent": {
    "name": "Required",
    "title": "optional — e.g. Luxury Waterfront Specialist",
    "brokerage": "Required",
    "phone": "Required",
    "instagram": "optional — @handle",
    "website": "optional"
  },
  "openHouse": {
    "date": "Sunday, August 9",
    "time": "1:00–4:00 PM",
    "isPast": false
  },
  "brand": "luxury-coastal"
}
```

## Field notes

- **`slug`** — names the output folder `out/<slug>/`.
- **`features`** — order matters everywhere: feature #1 is the story-slide
  hero and the reel-2 countdown climax; the first 3 drive the film voiceover.
- **`headlineFeature`** — the differentiator, not a stat. "No fixed bridges
  to the Intracoastal" sells; "5 bedrooms" doesn't.
- **`openHouse`** — omit the whole object if none is scheduled. Set
  `isPast: true` after the event to also generate `open-house-recap.md`.
- **`brand`** — Isaac Video Engine theme id used in the render command
  (`luxury-coastal` is the default luxury look).
