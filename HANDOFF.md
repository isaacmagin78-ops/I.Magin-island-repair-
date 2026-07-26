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

### Shipped 2026-07-26 (this session)

- Reposted the failed "Comment KIT" money reel to Instagram → LIVE: instagram.com/reel/DbRccyMEUlG
- Cross-posted the "my name was Titan" adoption story to Threads (was TikTok/IG only) → LIVE: threads.com/@tysonstravels_rescuepitslife/post/DbRcndWHQuJ

### Blocked (verified, with reasons)

- **3 Drive-hosted videos can't be posted from any session**: "Tyson treat" ASMR (38MB) + IMG_1719.MOV (48MB) + IMG_3457.MOV (106MB). Root cause of original failures: Google Drive serves a virus-scan warning page instead of the file for >25MB downloads, so Blotato can never read them. The Drive connector caps at 10MB and direct Drive network access is blocked. FIX: Isaac drag-drops these 3 files into Blotato's media library once → then any session can post them.
- **Facebook page not linked in Blotato** (account exists but has no page subaccount) — zero Facebook posts ever. Isaac must link his FB page in Blotato → Accounts to open that channel.

## Next steps

- Isaac: (1) drop the 3 videos into Blotato media library, (2) link Facebook page in Blotato, (3) confirm Amazon Associates link is in TikTok/IG/YouTube bios.
- Claude: post the 3 rescued videos once uploaded; start posting to Facebook once page is linked; keep cadence going.
- Rule: verify current state with live tool checks before telling Isaac anything is broken or asking him to act.

## Session log

- **2026-07-26**: Set up the CLAUDE.md + HANDOFF.md handoff system so context carries across sessions automatically.
