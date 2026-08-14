# Project Handoff

> **Every Claude session reads this file first and updates it before finishing.**
>
> This file exists because sessions cannot see each other. Kelly (GPT),
> Flex (Perplexity), and Claude each start from zero every time. This is
> the only shared memory. If it goes stale, everyone wakes up lost — that
> is exactly what happened between Jul 29 and Aug 7.

**Last updated: 2026-08-14** · Anything below marked *(secondhand)* came from
another session's summary and has not been re-verified. Re-check before acting.

> **Aug 14 — read this before asking Isaac anything.** He has spent six weeks
> re-explaining the same night to every new session. The Jul 22–23 recovery is
> written below. The four-rooms problem is written below. **Do not make him
> explain it again.** Verify with tools, then act.

## ⚠️ There are FOUR rooms, and none of them can see each other

This is the root cause of six weeks of confusion. In the Claude app, **Code**,
**Dispatch**, **Cowork**, and **Chats** are separate surfaces. Work done in one
is invisible to the others. Isaac has been re-explaining from zero in every room
because each one genuinely does start blank.

| Room | What lives there | Reachable from Code? |
|---|---|---|
| **Code** (this repo) | All eight projects, this file | — |
| **Dispatch** | Read the Jul 22–23 transcripts; holds that recovery | ❌ No |
| **Cowork** | 5 open tasks dated Aug 6 (see below) | ❌ No |
| **Chats** | Starred: Money Engine OS, The Private Office, Isaac HQ, IMagin Concierge, Tyson Brand App | ❌ No |
| **Local Mac** | `~/.claude/projects/*.jsonl` session transcripts | ❌ No |

**This file is the only shared memory.** Anything that matters must land here or
it is lost to every other room.

### What Dispatch recovered about the Jul 22–23 night *(secondhand — from Dispatch, not re-verified here)*

Isaac repeatedly asked what happened the night Claude Code "took over the
computer." **Dispatch already answered this.** It read the full prior session
transcripts and reported that on **Jul 22–23** the following was built:

- **$19 First 30 Days Kit — LIVE** at `tysons-time-kit.vercel.app`; promo videos
  posted Jul 21 across TikTok, IG, YouTube. *(Kit site confirmed in `kit-site/`.)*
- **TysonScripts library** — captions for every ready-to-post video, a 7-day
  posting schedule, product scripts, YouTube longform outline, Legends Ranch
  documentary narration scripts.
- **Southwest Airlines DM response package** with rate guidance **$1,500–$3,000**.
  This is an unclosed brand-deal opportunity and appears nowhere else in this repo.
- **UGC brand outreach templates** for Chewy / BarkBox / similar.
- **Amazon storefront setup guide.**
- **"Tomorrow Plan"** — a morning brief built from Notion + YouTube Studio data.

**TysonScripts is not in this repo.** It is most likely in Google Drive or Notion.
Finding it and getting it into version control is worth doing before it goes stale.

### Cowork — 5 open tasks, all dated Aug 6, none visible from here

Legends Ranch video production · Multi-AI blind spot analysis · IMagin Concierge
service overview · App integration confusion · System status confusion

### ⚠️ Privacy issue on the Mac, flagged by `START HERE.md` and not resolved

The Jul cleanup moved `DS11_Complete-2.pdf` (passport application),
`Florida Blue Ins Card.pdf`, and an Apple Card statement into `02 Admin` **on the
Desktop, which syncs to Google Drive.** Also referenced: a credentials file that
should not be left as a `.txt`. Isaac should decide on both deliberately.

---

## The other half of the system lives in Notion

This repo holds the **technical** state — code, generated packages, what runs.
The **business** state lives in Isaac's Notion workspace, **Ike's Venture HQ**:

- **Ike OS — Master Project Registry** — the master list of projects
- **Venture Tracker** — venture status
- **Convert Linda pilot to paying arrangement** — the live plan for turning the
  Listing Content System into paid work (see the Listing section below)

No Claude session can read or write Notion — there is no connector here. If a
decision, deadline, or client plan seems to be missing from this file, it is
probably in Notion. Ask Isaac rather than assuming it does not exist.

**Perplexity Pro's Notion connector is Max-tier only**, so Flex cannot read
Notion either. Its **GitHub connector works on Pro** — so this file is the one
place Claude, Perplexity, and Isaac can all reach. Keep it current.

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

### Queue: VERIFIED LIVE 2026-08-14 via `blotato_list_schedules`

**🔴 QUEUE IS EMPTY. 0 posts scheduled.**

Last post published **Aug 10 23:00Z** (YouTube). All channels have been dark
since. Instagram — the best channel by ~10x — has posted nothing in that window.

**Refilling the queue is the highest-value action available right now.**

**Two posts published broken on Aug 8** with the literal caption `Post Text`:
TikTok `5968806` and YouTube `5968795`. No Kit link, no Amazon disclosure.
The missing disclosure is an Associates compliance problem, not just a typo.
Consider deleting or editing both.

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

1. **Refill the posting queue — it is empty and all channels are dark since Aug 10.**
2. Delete or fix the two `Post Text` posts from Aug 8 (missing Amazon disclosure).
3. Find TysonScripts (Drive or Notion) and get it into this repo.
4. Follow up the Southwest Airlines opportunity — $1,500–$3,000, still unclosed.
5. Decide on the Desktop → Google Drive sync of passport/insurance/card documents.
6. Install `INSTRUCTIONS.md` into the Claude project.
7. Show Linda the package.

**Operating rules that keep this from happening again:**
- Verify with live tool checks before telling Isaac anything is broken.
- Lead with the single best recommendation; ship first, report with live URLs.
- Update this file before finishing. Every time.
