# Project Handoff

> Every Claude session reads this file first and updates it before finishing. See CLAUDE.md.

## Current state (as of 2026-07-26)

- **College Launch OS**: fully built, redesigned ("premium college command center"), production build fixed, favicon added, deployed via Vercel. All merged to main.
- **Isaac Video Engine**: complete through Phase 7 (docs). Motion, audio, social presets, and `npm run render:short` pipeline all verified. Demo fixtures replaced with real content; personal clips gitignored. Merged via PR #4.

## Marketing / Tyson's Time state (checked live via Blotato, 2026-07-26)

- ~40 posts published in the last 2 weeks across TikTok (@tysons_time), Instagram (@tysonstime), YouTube, Threads (@tysonstravels_rescuepitslife). Tyson vs. Kitten series is the main content line.
- Monetization live in captions: First 30 Days Kit ($19) Stripe link `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`, landing page `tysons-time-kit.vercel.app`, Amazon Associates disclosure + "gear picks link in bio".

### Broken / blocked (in priority order)

1. **Instagram disconnected since ~Jul 24** — posts failing with "session invalidated (password changed)". ISAAC must reconnect Instagram in Blotato → Accounts. Blocks all IG publishing.
2. **Bios unverified** — captions say "Amazon gear picks: link in bio". Confirm TikTok/IG/YouTube bios actually contain the Amazon Associates link. Only Isaac can edit bios.
3. **6 failed posts never retried** — causes: Google Drive media URLs don't work with Blotato (must upload media instead), TikTok photo-size limit, IG story alt_text error. Repost with fixed media once IG is reconnected.

## Next steps

- Isaac: reconnect Instagram in Blotato; confirm bios have the Amazon link.
- Claude: once IG is reconnected, repost the failed posts with properly uploaded media; keep the content cadence going.
- Fold in the handoff summary from Isaac's previous chat if he retrieves it (optional now — live state above is the source of truth).

## Session log

- **2026-07-26**: Set up the CLAUDE.md + HANDOFF.md handoff system so context carries across sessions automatically.
