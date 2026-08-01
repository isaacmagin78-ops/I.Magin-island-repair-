# Isaac's Projects — Monorepo

Reorganized 2026-07-27 from a tangle of unrelated branches into four clean project folders.
Master workspace context lives in the `imagin-concierge` repo (`CLAUDE.md` there).

| Folder | What it is | Umbrella |
|---|---|---|
| `madison-moves/` | South Florida home concierge site (Next.js, booking form, Stripe links) | I.Magin Concierge |
| `college-launch-os/` | Family college-prep app — synced to the live build at https://college-launch-os.vercel.app | Digital products |
| `isaac-video-engine/` | Remotion-based branded video production engine (own CLAUDE.md + skills inside) | Shared tool |
| `legends-ranch/` | Legends Ranch project: finished films in `deliverables/`, existing-site audit in `site-audit/` | Legends Ranch (with Arturo, Mom, Bobby) |
| `concierge-systems/` | Collection inventory + renovation dashboard CSVs, triage script, and the Collection Record pilot offer | I.Magin Concierge |

## Notes

- The live College Launch site is deployed by direct upload to Vercel — it is NOT auto-deployed from this repo. `college-launch-os/` matches the live streamlined build (the richer pre-sync version is preserved in git history on `main` before the 2026-07-27 reorg).
- Legends Ranch videos render from `isaac-video-engine/` (legends-ranch theme, LegendsAnthem composition). Finished MP4s live in `legends-ranch/deliverables/`.
- This repo's name (`I.Magin-island-repair-`) is historical; the handyman lead-capture app it references was never built here.
