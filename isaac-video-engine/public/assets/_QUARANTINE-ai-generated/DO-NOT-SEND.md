# ⛔ DO NOT SEND, PUBLISH, OR RENDER THESE

**Quarantined 2026-08-15. Verified by opening the images, not by report.**

These four files are **AI-generated images of a luxury condominium interior**. They are
not photographs. They were previously at `public/assets/stills/` and `plate-611.png`,
where they were wired into renderable compositions.

## Why this is serious

`611-living.png` — opened and inspected directly — shows a fabricated interior with:

- the on-image caption **"Sea Monarch Unit 611 | 2 Bed • 2 Bath • 1,450 Sq Ft"**, which is
  a **real address with real specifications**
- a **visible AI-generation watermark** in the lower-right corner

Publishing a fabricated interior labelled with a real listing's address and square footage
would be a misrepresentation of that property. It would carry Isaac's name and, through
the Listing Content System, potentially **Linda S. Hoyt's name and ONE Sotheby's
branding**. The watermark is visible enough that a viewer would notice.

The 611 listing is also **closed**, so there is no legitimate marketing use for them.

## What broke on purpose

Moving these files intentionally breaks:

- `src/compositions/SeaMonarchFilm.tsx` — referenced `assets/stills/611-sunset.png`,
  `611-living.png`, `611-kitchen.png`
- `src/compositions/ListingFilm.tsx` — referenced `assets/plate-611.png`

**That break is the point.** A loud failure is correct here; silently rendering a film
full of fabricated photos of a real address is not. Do not "fix" it by repointing at
these files.

## The correct fix

Replace them with **real photographs of a real property, with permission to use them.**
Per the 2026-08-15 review, no usable real property photography exists anywhere in Isaac's
files — every property image found was AI-generated. Any listing package therefore needs a
shoot that has not happened yet.

Until real photos exist, listing films cannot be rendered honestly. That is a genuine
constraint, not a bug.

## Do not delete

Kept for provenance so this cannot be rediscovered and mistaken for real photography a
third time. Two sessions on 2026-08-15 were already misled by fabricated assets in this
repository.
