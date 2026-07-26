# Project Handoff

> Every Claude session reads this file first and updates it before finishing. See CLAUDE.md.

## Current state (as of 2026-07-26)

- **College Launch OS**: fully built, redesigned ("premium college command center"), production build fixed, favicon added, deployed via Vercel. All merged to main.
- **Isaac Video Engine**: complete through Phase 7 (docs). Motion, audio, social presets, and `npm run render:short` pipeline all verified. Demo fixtures replaced with real content; personal clips gitignored. Merged via PR #4.

## Marketing / Tyson's Time state (checked live via Blotato, 2026-07-26)

- ~40 posts published in the last 2 weeks across TikTok (@tysons_time), Instagram (@tysonstime), YouTube, Threads (@tysonstravels_rescuepitslife). Tyson vs. Kitten series is the main content line.
- Monetization live in captions: First 30 Days Kit ($19) Stripe link `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`, landing page `tysons-time-kit.vercel.app`, Amazon Associates disclosure + "gear picks link in bio".

### Verified working

- **All 5 platforms connected and publishing**: Facebook, YouTube, Instagram, Threads, TikTok. Instagram had a token failure Jul 24 10am but published successfully Jul 25 9pm — it is FINE. (Lesson learned: check post dates after an error before declaring something broken.)

### Actually broken (verified)

1. **6 failed posts never retried.** Causes: Google Drive media URLs don't work with Blotato (media must be uploaded to Blotato instead — posts 626938, 596052, 596051), TikTok photo-size limit (600139), IG story alt_text error (600138), and one IG post (625534, the "Comment KIT" reel) that failed only because of the now-resolved Jul 24 token blip — it can be reposted as-is.
2. **Bios unverified** — captions say "Amazon gear picks: link in bio". Whether TikTok/IG/YouTube bios actually contain the Amazon Associates link cannot be checked or edited via any connected tool; only Isaac can confirm/set bios.

## Next steps

- Claude (on Isaac's go-ahead): repost the failed "Comment KIT" IG reel; repost the Google-Drive-media posts with properly uploaded media.
- Isaac: confirm the Amazon Associates link is in the TikTok/IG/YouTube bios (only thing tools can't verify).
- Rule going forward: verify current state with live tool checks before telling Isaac anything is broken or asking him to act.

## Session log

- **2026-07-26**: Set up the CLAUDE.md + HANDOFF.md handoff system so context carries across sessions automatically.
