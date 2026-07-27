# Project Handoff

> Every Claude session reads this file first and updates it before finishing. See CLAUDE.md.

## Current state (as of 2026-07-26)

- **College Launch OS**: fully built, redesigned ("premium college command center"), production build fixed, favicon added, deployed via Vercel. All merged to main.
- **Isaac Video Engine**: complete through Phase 7 (docs). Motion, audio, social presets, `npm run render:short` pipeline verified. Merged via PR #4.

## Tyson's Time — posting system (live-checked via Blotato 2026-07-26)

### Channels

| Platform | Account ID | Status |
|---|---|---|
| Instagram @tysonstime | 61044 | ✅ working — **best channel by ~10x** |
| Threads @tysonstravels_rescuepitslife | 8305 | ✅ working |
| YouTube (Tyson's Time) | 42110 | ✅ working |
| TikTok @tysons_time | 49211 | ✅ working |
| Facebook | 43069 | ❌ no Page linked (empty subaccounts) — cannot post |

### Performance reality (drives all decisions)

- Instagram: **~2,200 views / 1,500 reach** per reel. TikTok: 42–275 views. YouTube: ~234.
- **Always cross-post to Instagram.** Historically several videos went TikTok-only — that was the single biggest miss.

### Monetization (must appear in every caption)

- First 30 Days Kit $19 — landing `https://tysons-time-kit.vercel.app/`, Stripe `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`
- Amazon Associates: "Tyson's gear picks — link in bio" + required disclosure line.
- Both kit domains are LIVE and correct (verified via Vercel MCP 2026-07-27): `tysons-time-kit.vercel.app` = full sales page (200); `tysons-kit-link.vercel.app` = 302 straight to Stripe, used with `?s=yt` tracking. **Use the sales page in social captions** — cold viewers need the pitch before a payment screen. No fix needed.
- Note: `*.vercel.app` is blocked by this environment's proxy for plain WebFetch/curl — use the **Vercel MCP `web_fetch_vercel_url`** tool to check these pages.

### Platform rules learned the hard way

- **Instagram: max 5 hashtags** (hard API error above that).
- Google Drive URLs NEVER work as mediaUrls — media must live in Blotato storage.
- Blotato-hosted `database.blotato.io/storage/...` URLs from past posts are reusable forever.
- YouTube requires title + privacyStatus + shouldNotifySubscribers.

## Shipped 2026-07-26

**Published (4):**
- IG "Comment KIT" money reel (rescued from Jul 24 failure) → instagram.com/reel/DbRccyMEUlG
- Threads "my name was Titan" → threads.com/@tysonstravels_rescuepitslife/post/DbRcndWHQuJ
- IG "60lb vs 2lb kitten" (was TikTok-only) → instagram.com/reel/DbRmx5XjmGF
- Threads "60lb vs 2lb kitten" → threads.com/@tysonstravels_rescuepitslife/post/DbRmuWJlbu7

**Scheduled (8) — queue was EMPTY before this session:**
- Jul 27 16:00Z IG "POV new intern" · 23:00Z IG "aggressively asleep"
- Jul 28 16:00Z IG "manatees" · 23:00Z YouTube "manatees"
- Jul 29 16:00Z IG "10-minute walk" · 23:00Z Threads "10-minute walk"
- Jul 30 16:00Z IG "newest rescue" · 23:00Z YouTube "caged 2 years / walk"

All carry Kit link + Amazon disclosure.

## Blocked — needs Isaac (cannot be done by any session)

1. **3 videos stuck in Google Drive — because they are PRIVATE, not because of size.** Verified via Drive permissions: "Tyson treat" ASMR (38MB, id `1-mHQqzUT1CKWnYMvyZjZ_1Wgp3MfLNiT`) and IMG_1719.MOV (48MB, `1HL7fQgjXwTJ8swCT3Rr7gGNgHaIHqnkz`) both show ONLY `isaacmagin78@gmail.com / owner` — no "anyone with the link" entry. IMG_3457.MOV (`1kGsnDsGE-S0QYoMGyfc2qOHArDU1xIFB`) is the third. Blotato fetched a Google login page, not a video, which is exactly the "Failed to read media metadata" error. FIX (10 seconds each): in Drive → Share → General access → "Anyone with the link" → Viewer. Then any session can post them. (Alternative: drag into Blotato's media library.) Claude cannot change Drive sharing — the connector is read-only — and this environment's network policy blocks drive.usercontent.google.com and *.vercel.app at the proxy (403 on CONNECT), so direct download is impossible from here too.
2. **Facebook Page not linked** in Blotato → Accounts. Zero FB posts ever; whole channel dark.
3. **Bios** — no tool can read or edit social bios. Confirm the Amazon Associates link is actually in the TikTok/IG/YouTube bios, or every "link in bio" CTA goes nowhere.

## Next steps

- Claude: after Jul 30, refill the queue (check `blotato_list_schedules` — never let it hit 0). Post the 3 Drive videos once uploaded. Open Facebook once the Page is linked.
- Rule: **verify with live tool checks before telling Isaac anything is broken or asking him to act.**
- Rule: lead with the single best recommendation; ship first, report with live URLs.

## Session log

- **2026-07-26**: Built the CLAUDE.md + HANDOFF.md handoff system. Audited Blotato end-to-end; found the schedule queue empty and Instagram under-used despite being the 10x channel. Published 4, scheduled 8 through Jul 30.
