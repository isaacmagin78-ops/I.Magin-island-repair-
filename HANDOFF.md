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

## VERIFIED LIVE 2026-08-15 07:12Z (supersedes everything above)

> **Correction to the entry originally committed under this heading.** It was
> written as "2026-08-04" because `blotato_list_schedules` and `blotato_list_posts`
> returned a stale snapshot and a Vercel `date` header agreed with it. The real
> date was Aug 15. **Cross-check tool-reported time against `date -u` before
> trusting any "current state" claim.** Everything below is re-verified.

### THE HEADLINE: 22,900+ views, $0 revenue, zero checkout attempts

Checked Stripe live mode directly (`GetCharges`, `GetPaymentIntents`,
`GetSubscriptions`, balance):

- **Lifetime payment intents: 1.** $19, Jul 23, billed to *Isaac Magin, 777 S
  Federal Hwy Unit PH3, Pompano Beach FL*, Apple Pay. That is Isaac's own test
  purchase. Balance $0.00.
- **Lifetime subscriptions: 0.** The $5/mo stream subscription has never sold.
- **Zero failed or abandoned payment intents.** Stripe records an attempt the
  moment anyone starts checkout. Nobody has ever reached the payment screen.

That last point is the diagnosis: this is not a price or copy problem, it is a
**plumbing problem**. The top 15 posts alone drew 22,900+ views (TikTok excluded —
Blotato collects no TikTok analytics) and produced zero checkout attempts.

**Most likely cause — unverifiable by any tool:** Instagram and TikTok generate
almost all the views, and on both, a bio link is the *only* clickable path. Every
IG/TikTok caption says "link in bio." Nobody has ever confirmed the bio contains
`tysons-links.vercel.app`. YouTube and Threads do carry working clickable links
and still produced no clicks, so the bio may not be the whole story — but it is
the only unchecked link in the chain.

**No analytics exist on any page**, so sales-page visits are unmeasurable. That
missing instrument is why this went 25 days undiagnosed.

### Channel value is inverted from what this file has always claimed

"Instagram is the best channel by 10x" is true for views and false for everything
else. Instagram is reach without a relationship; YouTube compounds.

| Post | Channel | Views | Likes | New subs |
|---|---|---|---|---|
| "The first month sets the rhythm" | YouTube | 1,281 | 94 | 12 |
| "Returned once, years confined" | YouTube | 1,457 | 66 | 2 |
| "Aggressively asleep" | YouTube | 1,385 | 55 | 10 |
| "Dad said she was only staying one night" | Instagram | 2,217 | 30 | — |
| "Kittens are fragile" | Instagram | 1,981 | 21 | — |
| "60lbs vs 2lbs" | Instagram | 1,195 | 5 | — |

Nearly every Instagram post has **zero comments** despite every caption ending in
a question. YouTube gets real comments and subscribers, and is the one
high-volume channel where a clickable link already works.

### Queue

Was **empty** at 07:12Z Aug 15. Last post before that: Aug 10 23:00Z — the account
was dark 4.5 days. **Refilled this session: 16 posts, Aug 15 17:00Z → Aug 18
23:00Z**, four channels, proven 17:00/21:00/22:30/23:00 slots, every caption
carrying the Kit link + Amazon disclosure, footage rotated so nothing reruns on
the same channel inside ~10 days.

Published Jul 28 → Aug 10 was otherwise a clean daily four-channel rotation.
The Aug 1–2 Instagram gap and the Aug 4–5 missing-monetization regression both
self-corrected from Aug 6. Blotato credits: 2,640.

### Two defects nobody logged

1. **Two posts published with the literal caption `Post Text`** on Aug 8 —
   TikTok `7671553026762575134` and YouTube `cBbaW6pyXWQ`. Still live. Blotato
   cannot edit published posts; Isaac must delete them natively.
2. **Footage exhaustion.** The same ~12 clips have cycled for a month and
   reposts decay ~17% (2,217→1,839; 1,981→1,649). New footage is the highest-value
   hour available.

### Money surfaces — all 200, all verified live Aug 15

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

1. **IS THE LINK ACTUALLY IN THE IG AND TIKTOK BIOS?** This is now the single
   highest-value open question in the whole workspace — it plausibly explains
   $0 revenue against 22,900+ views. No tool can read or edit a social bio.
   Ask Isaac before doing any other revenue work.
2. **Facebook Page not linked** in Blotato → Accounts. Re-verified 2026-08-15:
   account 43069 connected, `subaccounts` still empty, API cannot post. Zero FB
   posts ever; 20 days unchanged.
3. **Delete the two `Post Text` posts** (TikTok `7671553026762575134`, YouTube
   `cBbaW6pyXWQ`). Only Isaac can — Blotato cannot edit published posts.

## Next steps

- **Instrument the funnel.** There is no analytics anywhere, which is why zero
  revenue went 25 days undiagnosed. Enable Vercel Web Analytics on the kit site
  (one toggle) and give each channel its own `?s=` tagged link so traffic is
  attributable. Do this before optimizing any copy.
- **Shift effort toward YouTube.** It converts views into subscribers and comments,
  and it is the highest-volume channel with a working clickable link.
- Queue is filled through Aug 18 23:00Z — refill before then. Always run
  `blotato_list_schedules` AND `date -u` first.
- Commit the `tysons-links` and `tysons-time-hub` sources into this repo — they
  are live on Vercel with no source and no backup anywhere.
- Legends Ranch: the homepage Vimeo-placeholder defect is **22 days** live. The
  replacement anthem film has been ready in `legends-ranch/deliverables/` since
  Jul 24 — send it to Fish and Hunt USA's developer directly.
- Rule: **verify with live tool checks before telling Isaac anything is broken or asking him to act.**
- Rule: **check `date -u` before trusting any tool's view of "now."** A stale
  snapshot cost this session a whole wrong status report.
- Rule: lead with the single best recommendation; ship first, report with live URLs.
- Rule: **update this file before finishing.**

## Session log

- **2026-07-26**: Built the CLAUDE.md + HANDOFF.md handoff system. Audited Blotato end-to-end; found the schedule queue empty and Instagram under-used despite being the 10x channel. Published 4, scheduled 8 through Jul 30.
- **2026-08-15**: Full workspace audit. First pass was built on a stale tool
  snapshot and wrongly dated Aug 4 — corrected mid-session after checking `date -u`.
  Then checked Stripe for the first time ever and found the real story: **the Kit
  has never sold a single copy**, the only charge is Isaac's own test, and nobody
  has ever started a checkout despite 22,900+ views. Diagnosed it as a severed
  link path (IG/TikTok are bio-only and the bio is unverified) compounded by a
  total absence of analytics. Also found channel value is inverted from what this
  file claimed (YouTube converts, Instagram doesn't), two posts live with `Post Text`
  captions, and footage decay from over-recycling. Refilled the empty queue with
  16 posts through Aug 18.
