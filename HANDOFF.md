# Project Handoff

> **Every Claude session reads this file first and updates it before finishing.**
>
> This file exists because sessions cannot see each other. Kelly (GPT),
> Flex (Perplexity), and Claude each start from zero every time. This is
> the only shared memory. If it goes stale, everyone wakes up lost — that
> is exactly what happened between Jul 29 and Aug 7.

**Last updated: 2026-08-07** · Anything below marked *(secondhand)* came from
another session's summary and has not been re-verified. Re-check before acting.

---

## ⚠️ Read this first: why main went quiet

`main` had **zero commits between Jul 29 and Aug 7**. All August work went
onto ~20 `claude/*` branches that were never merged. Since every session
clones `main`, every session since Jul 29 woke up in a nine-day-old repo
knowing nothing about August.

Nothing was lost — it was scattered. **When you finish work, get it onto
`main`,** or the next session (and the next you) will not see it.

---

## The standing rules live in `money-engine/INSTRUCTIONS.md`

Written Aug 3. It is the operating spec that made Aug 3–6 run itself:
role, budget assumptions, real per-channel reach, non-negotiables, claim
grading, and the never-propose list.

**Install step never completed — this is the highest-value 2 minutes available:**
1. Paste `money-engine/INSTRUCTIONS.md` into the Claude project's
   **Instructions** field. Standing rules only persist there; a session's
   memory dies with the session.
2. Upload the Amazon monetization stack file to the same project.

---

## Tyson's Time — posting system

### Queue: VERIFIED LIVE 2026-08-07 via `blotato_list_schedules`

**8 posts scheduled. Queue empties after Aug 8 23:00Z.**

| When (UTC) | Channel |
|---|---|
| Aug 7 17:00 / 21:00 / 22:30 / 23:00 | TikTok · Instagram · Threads · YouTube |
| Aug 8 17:00 / 21:00 / 22:30 / 23:00 | TikTok · Instagram · Threads · YouTube |

All carry the Kit link and the Amazon disclosure. **Refill before Aug 8 evening.**

**Standing rule:** always run `blotato_list_schedules` before saying anything
about the queue. Written figures go stale in days.

### Channels

| Platform | Account ID | Status |
|---|---|---|
| Instagram `@tysonstime` | 61044 | ✅ **best channel by ~10x** (~2,200 views / 1,500 reach) |
| TikTok `@tysons_time` | 49211 | ✅ working (42–275 views) — cross-post always, costs nothing |
| YouTube (Tyson's Time) | 42110 | ✅ working (~234 views) |
| Threads `@tysonstravels_rescuepitslife` | 8305 | ✅ working |
| Facebook | 43069 | ❌ dark — no Page linked. Needs Isaac. |

### Platform rules learned the hard way — do not relearn these

- **Instagram: max 5 hashtags.** Hard API error above that.
- **Google Drive URLs never work as media.** Media must live in Blotato storage.
  Drive files must be "Anyone with the link → Viewer" *and* go through
  `drive.usercontent.google.com/download?id=FILE_ID&export=download&confirm=t`.
- **Blotato-hosted `database.blotato.io/storage/...` URLs are reusable forever.**
- **YouTube requires** title + privacyStatus + shouldNotifySubscribers.
- **Always cross-post to Instagram.** Historically several videos went
  TikTok-only — the single biggest recurring miss.

### Money

- First 30 Days Kit **$19** — sales page `tysons-time-kit.vercel.app`,
  Stripe `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`. Already transacting.
  Use the **sales page** in captions, not the raw Stripe link.
- Amazon Associates active — disclosure required in every caption.
- Link pages live and fixed *(secondhand, Aug 6)*.
- `*.vercel.app` is blocked for plain WebFetch here — use the Vercel MCP
  `web_fetch_vercel_url` tool to check those pages.

---

## Listing Content System — the nearest thing to new revenue

**Linda S. Hoyt is Isaac's sister**, a top-producing Broker-Associate at ONE
Sotheby's (Fort Lauderdale). She is customer #1, with her knowledge.

**Ready now:** a full 19-asset package for her real active listing —
111 N Pompano Beach Blvd Unit 611, The Sea Monarch, $775,000, MLS B26053249.
Lives in `Listing-Content-System/out/111-pompano-beach-611/`.
Review guide: `START-HERE-LINDA-PITCH.md` at repo root.

**Before anything publishes,** need from Linda: real open-house date/time,
real attendance count, and her authorization — every asset carries her name,
phone, and ONE Sotheby's branding.

**Known issue:** generated captions carry 7 hashtags; Instagram's limit is 5.
Trim before posting, or fix `hashtags()` in `scripts/generate-package.mjs`.

**Not done:** the vertical reel. Handoff files are written
(`video-engine/*.txt`); rendering needs her listing photos.

---

## Everything else, honestly

| Project | State |
|---|---|
| First 30 Days Kit | **Selling.** Live page + working Stripe link. |
| Listing Content System | **Ready to sell as a service.** Warm lead, package built. |
| Isaac Video Engine | Real infrastructure — the delivery engine, not a product. |
| Legends Ranch | Delivered films = portfolio. Services, not product. |
| College Launch OS | Live but a **prototype**: browser-only storage, canned "concierge" responses, no accounts, no payments. Not sellable without real work. |
| Madison Moves | One client's site. Pattern is repeatable; not a product. |

**Test coverage: zero.** ~9,700 lines across five projects, no automated tests,
no CI. Five real defects found and reproduced — see `TEST-COVERAGE-ANALYSIS.md`.
Worth fixing *once money depends on the output*, not before.

---

## Blocked — needs Isaac, no session can do these

1. **Install `money-engine/INSTRUCTIONS.md`** into the Claude project (above).
2. **Facebook Page** not linked in Blotato. Whole channel dark.
3. **Bios** — no tool can read or edit social bios. Confirm the Amazon link
   is actually in the TikTok/IG/YouTube bios, or every "link in bio" CTA
   goes nowhere.
4. **~80 clips** in the "Ike's iPad Pro" Drive folder need descriptions +
   published/unpublished calls before the licensing work can move *(secondhand)*.

---

## Next steps

1. Merge the useful August branches into `main` so sessions stop waking up blind.
2. Install `INSTRUCTIONS.md` into the Claude project.
3. Refill the posting queue before Aug 8 evening.
4. Show Linda the package.

**Operating rules that keep this from happening again:**
- Verify with live tool checks before telling Isaac anything is broken.
- Lead with the single best recommendation; ship first, report with live URLs.
- Update this file before finishing. Every time.
