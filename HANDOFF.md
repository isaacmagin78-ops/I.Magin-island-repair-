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

**Published Jul 27 — the 3 rescued Drive videos:**
- IG ASMR reel → instagram.com/reel/DbR88LYlDSq
- Threads ASMR → threads.com/@tysonstravels_rescuepitslife/post/DbR9FBuDyb2
- TikTok ASMR → tiktok.com/@tysons_time/video/7667038097124740383
- (IMG_1719 "returned once, now runs this condo" → IG Jul 31 16:00Z · IMG_3457 "doghouse to penthouse" → IG Jul 31 23:00Z)

**Scheduled (10) — queue was EMPTY before this session:**
- Jul 27 16:00Z IG "POV new intern" · 23:00Z IG "aggressively asleep"
- Jul 28 16:00Z IG "manatees" · 23:00Z YouTube "manatees"
- Jul 29 16:00Z IG "10-minute walk" · 23:00Z Threads "10-minute walk"
- Jul 30 16:00Z IG "newest rescue" · 23:00Z YouTube "caged 2 years / walk"

All carry Kit link + Amazon disclosure.

## RESOLVED 2026-07-27: the 3 "stuck" Drive videos

Root cause was **private Drive sharing**, not file size. Isaac set all three to "Anyone with the link → Viewer" (verified: permissions now include `{"role":"reader","type":"anyone"}`) and they posted immediately using
`https://drive.usercontent.google.com/download?id=FILE_ID&export=download&confirm=t`.
File IDs: ASMR `1-mHQqzUT1CKWnYMvyZjZ_1Wgp3MfLNiT` · IMG_1719 `1HL7fQgjXwTJ8swCT3Rr7gGNgHaIHqnkz` · IMG_3457 `1kGsnDsGE-S0QYoMGyfc2qOHArDU1xIFB`.
Prevention rule is now in CLAUDE.md — always verify media is publicly readable BEFORE posting.

## VERIFIED LIVE 2026-07-29 (supersedes the queue figures above)

Checked directly with `blotato_list_schedules`. **6 posts scheduled, queue runs
out after Jul 31 23:00Z** — not Jul 30 as stated above.

| When (UTC) | Channel | Post |
|---|---|---|
| Jul 29 16:00 | Instagram | "10-minute walk" reel |
| Jul 29 23:00 | Threads | "10-minute walk" |
| Jul 30 16:00 | Instagram | "60lb vs 2lb kitten" reel |
| Jul 30 23:00 | YouTube | "Caged 2 years / walk takes an hour" |
| Jul 31 16:00 | Instagram | "returned once, now runs this condo" |
| Jul 31 23:00 | Instagram | "doghouse to penthouse" |

All six carry the Kit link and the Amazon disclosure. All are within the IG
5-hashtag limit.

**Gap: TikTok has zero posts queued.** @tysons_time (49211) is connected and
working; it is simply being skipped. Instagram is correctly getting the bulk,
but TikTok costs nothing to cross-post to.

**Standing rule reaffirmed:** always run `blotato_list_schedules` before saying
anything about the queue. This section exists because the figures above were
two days stale and would have sent a session refilling a queue that was fine.

## Amazon 2026-08-04 — Seller Central approved, but it's the wrong account

Isaac sent the "You're approved to list on Amazon" Seller Central email. Researched and
planned in `amazon/AMAZON-MONEY-PLAN.md` + `amazon/KDP-LISTING-COPY.md`.

**The key finding: Seller Central sells physical products only.** The $19 First 30 Days
Kit PDF cannot be listed there. The account that sells it is **KDP** — free, separate
signup, and where every dollar of this plan comes from.

Verified economics (live-checked 2026-08-04):

| Channel | Price | We keep |
|---|---|---|
| Direct Stripe (today) | $19 | **$18.15** |
| KDP paperback ~100pp | $14.99 | $6.69 |
| KDP Kindle | $6.99 | ~$4.68 |
| Associates, pet supplies | — | **3%** |

- **Amazon is customer acquisition, not margin** — a direct sale is worth 2.7× a
  paperback. The point is Amazon's search traffic, which we don't have to go find.
- **KDP print cost is flat $2.30 for 24–108 pages.** Going 24 → ~100 pages is free.
  Build the big version.
- **Do NOT enroll in KDP Select** — it demands digital exclusivity and we already sell
  the same content as a $19 PDF. Paperback is never exclusive; ship that.
- **Associates at 3% is not a revenue line.** $100/mo needs $3,333 in tracked sales.
  Stop treating it as a monetization pillar in captions; the Kit link does the work.

Blocker: manuscript is 15 pages, KDP minimum is 24 and must be even. Expansion to ~100
pages + print-ready render is Claude's next job, gated on the KDP account existing.

## Blocked — needs Isaac (cannot be done by any session)

1. **Amazon Seller Central plan — possibly bleeding $39.99/month.** If signup put us on
   Professional, that's $480/yr for an account with zero listings. Check Settings →
   Account Info → Manage Selling Plan, switch to Individual. Fastest money move we have.
2. **KDP account does not exist.** Free signup at kdp.amazon.com. Nothing can be
   uploaded until it does — this gates the entire Amazon plan.
3. **Facebook Page not linked** in Blotato → Accounts. Zero FB posts ever; whole channel dark.
4. **Bios** — no tool can read or edit social bios. Confirm the Amazon Associates link is actually in the TikTok/IG/YouTube bios, or every "link in bio" CTA goes nowhere. Isaac was offered a single link-in-bio page (Kit + Amazon picks, deployed to Vercel) — awaiting his Amazon storefront/affiliate link to build it.

## Next steps

- Claude: after Jul 30, refill the queue (check `blotato_list_schedules` — never let it hit 0). Post the 3 Drive videos once uploaded. Open Facebook once the Page is linked.
- Rule: **verify with live tool checks before telling Isaac anything is broken or asking him to act.**
- Rule: lead with the single best recommendation; ship first, report with live URLs.

## Session log

- **2026-07-26**: Built the CLAUDE.md + HANDOFF.md handoff system. Audited Blotato end-to-end; found the schedule queue empty and Instagram under-used despite being the 10x channel. Published 4, scheduled 8 through Jul 30.
