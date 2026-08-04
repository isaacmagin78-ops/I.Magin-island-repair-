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

## VERIFIED LIVE 2026-08-04 01:08Z (supersedes everything above)

Checked with `blotato_list_schedules`, `blotato_list_posts`, `blotato_list_accounts`,
`blotato_get_credits`, and direct fetches of all four Vercel surfaces.

### Queue — 8 scheduled, runs dry after Aug 5 23:00Z

| When (UTC) | Channel | Post | Kit link |
|---|---|---|---|
| Aug 4 17:00 | TikTok | "she pretends she doesn't live in HIS house" | ❌ missing |
| Aug 4 21:00 | Instagram | "Episode 1: The takeover begins" | ✅ first comment |
| Aug 4 22:30 | Threads | "giant potatoes" / manatees | ❌ missing |
| Aug 4 23:00 | YouTube | "60 lbs of Muscle vs 2 lbs of Pure Attitude" | ✅ |
| Aug 5 17:00 | TikTok | "60lbs vs 2lbs… and he LOST" | ❌ missing |
| Aug 5 21:00 | Instagram | "From a shelter kennel to… everywhere" | ✅ first comment |
| Aug 5 22:30 | Threads | "aggressive breed lists" (text only) | ❌ missing |
| Aug 5 23:00 | YouTube | "Dad Said She Was Only Staying One Night" | ✅ |

**Regression: 4 of 8 dropped monetization.** Both TikToks and both Threads posts
carry no Kit link and no Amazon disclosure. The Jul 31 posts on those same
channels carried both. Standing rule is that monetization appears in every caption.

**Instagram went dark Aug 1 and Aug 2.** Those two days were TikTok-only, one post
each — the exact failure mode this file names as "the single biggest miss." Fixed
from Aug 3 onward (clean four-channel rotation). Watch for it recurring.

Published Jul 28 → Aug 3: 20 posts, no dark days. Blotato credits: 2,640.

### Resolved since the Jul 29 entry

- **TikTok gap closed** — was zero-queued; now publishing daily with 2 more scheduled.
- **Amazon storefront link received and live** — `tysons-links.vercel.app` carries the
  real affiliate storefront (`tag=tysonspicks-20`) plus the required disclosure.
  Blocked item #2 below is therefore half-resolved.

### Money surfaces — all 200, all verified live Aug 4

| URL | Sells | Note |
|---|---|---|
| `tysons-time-kit.vercel.app` | Kit $19, Stripe live | canonical sales page |
| `tysons-links.vercel.app` | Kit + Amazon gear picks | has disclosure |
| `tysons-time-hub.vercel.app` | **$5/mo stream subscription** + Kit | no Amazon links |
| `tysons-kit-link.vercel.app` | 302 → Stripe | used with `?s=` tracking |

**The $5/month stream subscription is a revenue line this file never recorded**
(Stripe `dRmdR90uX8tPgN84dIg7e01`). Same for the TikTok live streams. They went
live without being written down.

**Two competing link-in-bio pages now exist** with different offers. No tool can read
a social bio, so which one followers actually land on is unknown — and whichever it
is, they see only half the offers. Needs Isaac to say which is in the bios.

**Neither `tysons-links` nor `tysons-time-hub` has source in this repo.** They exist
only as Vercel deployments — no version history, nothing to rebuild from. Pull them
down and commit them alongside `kit-site/`.

## Blocked — needs Isaac (cannot be done by any session)

1. **Facebook Page not linked** in Blotato → Accounts. Re-verified 2026-08-04:
   account 43069 is connected but `subaccounts` is still empty, so the API cannot
   post at all. Zero FB posts ever; whole channel dark, 9 days unchanged.
2. **Which link-in-bio page is actually in the bios** — `tysons-links` or
   `tysons-time-hub`? No tool can read or edit social bios. Until Isaac says,
   every "link in bio" CTA points somewhere unverifiable. (The Amazon half of
   this item is now resolved — the storefront link came through and is live.)

## Next steps

- **Refill the queue before Aug 5 23:00Z** — it is empty after that. Always run
  `blotato_list_schedules` first.
- Rewrite the 4 queued TikTok/Threads captions to carry the Kit link before they fire.
- Commit the two link-page sources into this repo so they're recoverable.
- Legends Ranch: the homepage Vimeo-placeholder defect is still live 11 days on.
  The replacement anthem film has been ready in `legends-ranch/deliverables/`
  since Jul 24 — chase Fish and Hunt USA's developer or send them the file.
- Rule: **verify with live tool checks before telling Isaac anything is broken or asking him to act.**
- Rule: lead with the single best recommendation; ship first, report with live URLs.
- Rule: **update this file before finishing.** It sat 6 days stale and was wrong on
  three counts (queue state, TikTok gap, Amazon link) — a session trusting it would
  have chased two non-problems and missed the real one.

## Session log

- **2026-07-26**: Built the CLAUDE.md + HANDOFF.md handoff system. Audited Blotato end-to-end; found the schedule queue empty and Instagram under-used despite being the 10x channel. Published 4, scheduled 8 through Jul 30.
- **2026-08-04**: Status-update pass. Verified the whole workspace live rather than
  from this file. Found the queue healthy but expiring Aug 5, monetization dropped
  from 4 of 8 queued posts, Instagram dark Aug 1–2, a $5/mo revenue line nobody had
  recorded, and two competing link-in-bio pages with no source in the repo. Confirmed
  Facebook still blocked and Legends Ranch still unfixed. Nothing was published or
  scheduled this session — read-only audit plus this file and the README.
