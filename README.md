# Isaac's Projects — Monorepo

Reorganized 2026-07-27 from a tangle of unrelated branches into clean project folders.
Two more were recovered on 2026-07-29 — there are six.
Master workspace context lives in the `imagin-concierge` repo (`CLAUDE.md` there).

| Folder | What it is | Umbrella |
|---|---|---|
| `madison-moves/` | South Florida home concierge site (Next.js, booking form, Stripe links) | I.Magin Concierge |
| `college-launch-os/` | Family college-prep app — synced to the live build at https://college-launch-os.vercel.app | Digital products |
| `isaac-video-engine/` | Remotion-based branded video production engine (own CLAUDE.md + skills inside) | Shared tool |
| `legends-ranch/` | Legends Ranch project: finished films in `deliverables/`, existing-site audit in `site-audit/` | Legends Ranch (with Arturo, Mom, Bobby) |
| `Listing-Content-System/` | One listing brief in → a full luxury marketing package out (offline generator) | Real estate |
| `kit-site/` | The First 30 Days Kit: sales page, access page, PDF, launch content | Tyson's Time |

## Notes

- The live College Launch site is deployed by direct upload to Vercel — it is NOT auto-deployed from this repo. `college-launch-os/` matches the live streamlined build (the richer pre-sync version is preserved in git history on `main` before the 2026-07-27 reorg).
- Legends Ranch videos render from `isaac-video-engine/` (legends-ranch theme, LegendsAnthem composition). Finished MP4s live in `legends-ranch/deliverables/`.
- This repo's name (`I.Magin-island-repair-`) is historical; the handyman lead-capture app it references was never built here.
- **Not in this repo but live:** `tysons-links.vercel.app` and `tysons-time-hub.vercel.app`
  are deployed on Vercel with no source committed anywhere. They have no version history
  and nothing to rebuild from — see HANDOFF.md.
