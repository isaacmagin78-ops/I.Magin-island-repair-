# Project Handoff

> Every Claude session reads this file first and updates it before finishing. See CLAUDE.md.
>
> **Restructured 2026-08-05.** The old format layered "supersedes the above" queue
> snapshots until nobody could tell which figures were live. Current state now lives in
> one place at the top and gets overwritten, not appended. History moved to the log.

---

# CURRENT STATE — live-verified 2026-08-05 22:05Z

## Channels (`blotato_list_accounts`, verified twice today)

| Platform | Account ID | Status |
|---|---|---|
| Instagram @tysonstime | 61044 | ✅ working — **best channel by ~10×** |
| TikTok @tysons_time | 49211 | ✅ working — **posting daily now** |
| Threads @tysonstravels_rescuepitslife | 8305 | ✅ working |
| YouTube (Tyson's Time) | 42110 | ✅ working — 6 playlists available |
| Facebook | 43069 | ❌ **still dark** — `subaccounts: []` |

**Facebook diagnosis (new).** What's connected is Isaac's **personal profile**
(`fullname: "Isaac Magin"`, no username, no subaccounts). Blotato needs a `pageId` and
the API cannot post to a personal profile at all. So it's one of two situations:

- **A Page exists but wasn't granted during OAuth.** Most likely. Facebook's consent
  screen has a separate Page-selection step that's easy to click past; skipping it
  produces exactly this empty-subaccounts result. Fix: disconnect Facebook in Blotato,
  reconnect, slow down on the Page-selection screen.
- **No Page exists**, only the personal profile. Then a Page must be created first.

Determine which before hunting for a permission toggle on a Page that may not exist.

## Queue — ⚠️ EMPTIES TONIGHT

`blotato_list_schedules` shows **2 posts left, both today**:

| When (UTC) | Channel | Post |
|---|---|---|
| Aug 5 22:30 | Threads | "aggressive breed lists" |
| Aug 5 23:00 | YouTube | "Dad Said She Was Only Staying One Night" |

**Nothing scheduled after Aug 5 23:00Z.** Refill is the next posting job.

## Correction: the TikTok gap is CLOSED

Earlier handoffs said "TikTok has zero posts queued / is being skipped." **That is no
longer true** and shouldn't be carried forward. TikTok published Jul 31 (×2), Aug 1, 2,
3, 4, and 5 — it's the most consistent channel right now.

## Published Jul 29 – Aug 5 — **zero failures**

| Date | Channel | URL |
|---|---|---|
| Aug 5 | Instagram | [reel/DbrDf37DO7c](https://www.instagram.com/reel/DbrDf37DO7c/) |
| Aug 5 | TikTok | [video/7670593360326937886](https://www.tiktok.com/@tysons_time/video/7670593360326937886) |
| Aug 4 | YouTube | [watch?v=hjGcs7KERu4](https://www.youtube.com/watch?v=hjGcs7KERu4) |
| Aug 4 | Instagram | [reel/DboerpsDuk1](https://www.instagram.com/reel/DboerpsDuk1/) |
| Aug 4 | Threads | [post/Dboo-6aDTZF](https://www.threads.com/@tysonstravels_rescuepitslife/post/Dboo-6aDTZF) |
| Aug 4 | TikTok | [video/7670222289840950559](https://www.tiktok.com/@tysons_time/video/7670222289840950559) |
| Aug 3 | YouTube | [watch?v=ApsgYWEqFSs](https://www.youtube.com/watch?v=ApsgYWEqFSs) |
| Aug 3 | Instagram | [reel/Dbl59ikiDUv](https://www.instagram.com/reel/Dbl59ikiDUv/) |
| Aug 3 | Threads | [post/DbmEMHkieev](https://www.threads.com/@tysonstravels_rescuepitslife/post/DbmEMHkieev) |
| Aug 3 | TikTok | [video/7669851179169500447](https://www.tiktok.com/@tysons_time/video/7669851179169500447) |
| Aug 2 | TikTok | [video/7669480114576428319](https://www.tiktok.com/@tysons_time/video/7669480114576428319) |
| Aug 1 | TikTok | [video/7669109008434760990](https://www.tiktok.com/@tysons_time/video/7669109008434760990) |
| Jul 31 | Instagram | [reel/DbeZPsyD7x9](https://www.instagram.com/reel/DbeZPsyD7x9/) · [reel/DbdpLLCjlDj](https://www.instagram.com/reel/DbdpLLCjlDj/) |
| Jul 31 | Threads | [post/DbeTg4wl_iW](https://www.threads.com/@tysonstravels_rescuepitslife/post/DbeTg4wl_iW) · [post/Dbb72hFDkOa](https://www.threads.com/@tysonstravels_rescuepitslife/post/Dbb72hFDkOa) |
| Jul 31 | TikTok | [video/7668815270261067039](https://www.tiktok.com/@tysons_time/video/7668815270261067039) · [video/7668737977375378719](https://www.tiktok.com/@tysons_time/video/7668737977375378719) |
| Jul 30 | YouTube | [watch?v=7Gyg1TP87fE](https://www.youtube.com/watch?v=7Gyg1TP87fE) |
| Jul 30 | Instagram | [reel/Dbbyfd7k_BP](https://www.instagram.com/reel/Dbbyfd7k_BP/) (LIVE promo) · [reel/DbbEY_uiWbv](https://www.instagram.com/reel/DbbEY_uiWbv/) |
| Jul 30 | Threads | [post/Dbbyh66Cc_X](https://www.threads.com/@tysonstravels_rescuepitslife/post/Dbbyh66Cc_X) |
| Jul 29 | Instagram | [reel/DbYflQpj0JT](https://www.instagram.com/reel/DbYflQpj0JT/) |
| Jul 29 | Threads | [post/DbZPpZLD5n9](https://www.threads.com/@tysonstravels_rescuepitslife/post/DbZPpZLD5n9) |

**Also undocumented until now: there is live streaming.** A TikTok LIVE ran Jul 30 at
8PM ET, promoted on IG and Threads. Nothing in the handoff system covered this.

---

# MONETIZATION — verified live 2026-08-05

## ⚠️ There are TWO competing link-in-bio pages, and neither is complete

Both are live (200) and both have been posted publicly. Whichever one is actually in the
bios determines what earns.

| | `tysons-links.vercel.app` | `tysons-time-hub.vercel.app` |
|---|---|---|
| Kit $19 | ✅ direct to sales page | ✅ via `tysons-kit-link?s=bio` |
| **Amazon gear picks** | ✅ **real affiliate link** | ❌ **absent** |
| **Amazon disclosure** | ✅ present, correct | ❌ **absent** |
| **$5/mo stream sub** | ❌ absent | ✅ present |
| Socials | IG, TikTok, YouTube, Threads | TikTok, YouTube, IG |
| Last modified | Aug 5 22:05Z | Aug 4 01:08Z |

**This needs one decision: merge them into a single page.** Right now, whichever is in
the bio silently drops either the Amazon income or the recurring income.

Minor: the two pages disagree on the YouTube handle (`@TysonsTime` vs `@tysonstime`).
Handles are case-insensitive so both resolve, but pick one.

## RESOLVED — the Associates gear page is built and live

Previous handoffs listed this as blocked "awaiting Isaac's Amazon storefront/affiliate
link." **It exists.** `tysons-links.vercel.app` carries a real Amazon Idea List link with:

- **Associates tag: `tysonspicks-20`**
- correct `rel="sponsored nofollow noopener"`
- the required disclosure, on-page

No longer a blocker. Stop asking Isaac for the tag.

## Revenue lines

| Line | Price | Where |
|---|---|---|
| First 30 Days Kit | $19 | `tysons-time-kit.vercel.app` → Stripe `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00` |
| **Stream subscription** | **$5/month** | Stripe `buy.stripe.com/dRmdR90uX8tPgN84dIg7e01` — **recurring, and previously undocumented** |
| Amazon Associates | 1–4.5% by category | tag `tysonspicks-20` via the links page |

The $5/month subscription is the only **recurring** line in the whole business and no
handoff had recorded it. It deserves more attention than it's getting.

## ⚠️ Monetization regression, Aug 3–5

Captions carried the Kit link *and* "As an Amazon Associate I earn from qualifying
purchases" consistently through **Aug 2**. From **Aug 3 onward, IG and TikTok posts
carry neither** — six posts with no monetization and no disclosure. YouTube still
carries the Kit link.

Two problems: money left on the table, and posts saying "link in bio" that point at a
bio containing affiliate links, with no disclosure on the post. They were doing this
correctly two weeks ago; it lapsed. Restore it.

## Kit pricing conflict with the Amazon plan

The Kit is publicly advertised as **15 pages for $19**. The KDP plan builds a **~100-page
paperback for $14.99**. Shipping both makes the direct product look strictly worse —
more money for less book. Resolve before publishing: expand the digital Kit too, or
reprice.

---

# Platform rules learned the hard way

- **Instagram: max 5 hashtags** (hard API error above that). Recent posts are at exactly 5.
- Google Drive URLs NEVER work as mediaUrls — media must live in Blotato storage.
- Blotato-hosted `database.blotato.io/storage/...` URLs from past posts are reusable forever.
- YouTube requires title + privacyStatus + shouldNotifySubscribers.
- Facebook requires a `pageId` from `subaccounts` — a personal profile cannot be posted to.
- `*.vercel.app` is blocked by this environment's proxy for plain WebFetch/curl — use the
  **Vercel MCP `web_fetch_vercel_url`** tool.
- Google Drive media must be "Anyone with the link → Viewer" *before* posting; use
  `https://drive.usercontent.google.com/download?id=FILE_ID&export=download&confirm=t`.

# Amazon — see `amazon/AMAZON-MONEY-PLAN.md`

**Seller Central sells physical products only.** The $19 Kit PDF cannot be listed there;
**KDP** is the account that sells it (free, separate signup).

| Channel | Price | We keep |
|---|---|---|
| Direct Stripe | $19 | **$18.15** |
| KDP paperback ~100pp | $14.99 | $6.69 |
| KDP Kindle | $6.99 | ~$4.68 |

- Amazon is **customer acquisition, not margin** — a direct sale is worth 2.7× a paperback.
- KDP print cost is **flat $2.30 for 24–108 pages**, so 24 → ~100 pages is free.
- **Do NOT enroll in KDP Select** — digital exclusivity conflicts with the $19 PDF.
- Associates pays on **the entire cart** filled within 24 hours of the click (cart-adds
  credited up to 90 days), not just the linked item — a converting click is worth
  ~$1.50–$3. But: **our own friends and relatives earn $0**, links **cannot** be texted,
  DM'd or emailed (material breach), and forwards don't attribute.
- **⚠️ 180-day clock: 3 qualifying sales from 3 separate checkouts or the account closes
  permanently.** Family orders don't count. Registration date still unknown.

Blocker: manuscript is 15 pages; KDP minimum is 24 and must be even. Expansion to ~100
pages + print-ready render is Claude's next job.

# Blocked — needs Isaac (cannot be done by any session)

1. **⚠️ Associates registration date** — the 180-day deadline may be close. Highest urgency.
2. **Amazon Seller Central plan — possibly bleeding $39.99/month.** If signup landed on
   Professional that's $480/yr for an account with zero listings. Settings → Account Info
   → Manage Selling Plan → Individual.
3. **KDP account does not exist.** Free signup at kdp.amazon.com; gates the whole plan.
4. **Which link page is actually in the bios?** No tool can read a social bio. Until this
   is known we cannot tell whether Amazon income or the $5/mo sub is reaching anyone.
5. **Facebook: Page vs no Page** — see the diagnosis above; determines which fix applies.

# Next steps for Claude

- **Refill the queue** — empty after Aug 5 23:00Z. Never let it hit 0.
- **Merge the two link pages** into one carrying Kit + Amazon gear + disclosure + $5/mo sub.
- **Restore Kit link + Amazon disclosure** to IG and TikTok captions (lapsed Aug 3).
- Expand the Kit manuscript 15 → ~100 pages and render print-ready interior for KDP.
- Resolve the 15-page-$19 vs 100-page-$14.99 pricing conflict.
- Open Facebook once the Page is linked.

# Standing rules

- **Verify with live tool checks before telling Isaac anything is broken or asking him to act.**
- Always run `blotato_list_schedules` before saying anything about the queue.
- Always verify media is publicly readable BEFORE posting.
- Lead with the single best recommendation; ship first, report with live URLs.
- **Overwrite the current-state section — never append a "supersedes the above" snapshot.**

# Session log

- **2026-07-26**: Built the CLAUDE.md + HANDOFF.md handoff system. Audited Blotato
  end-to-end; found the queue empty and Instagram under-used despite being the 10× channel.
  Published 4, scheduled 8.
- **2026-07-27**: Reorganized the repo into clean project folders. Resolved the 3 "stuck"
  Drive videos — root cause was private Drive sharing, not file size.
- **2026-07-29**: Live-checked the queue; found the previous figures two days stale.
- **2026-08-04**: Seller Central approval routed to KDP. Built `amazon/` plan + listing copy.
- **2026-08-05**: Corrected the Associates math after Isaac pushed back — whole-cart
  attribution, plus the three rules and the 180-day clock. Full system status check:
  found the TikTok gap closed, the Associates gear page already live with tag
  `tysonspicks-20`, a second competing link page, an undocumented $5/mo stream
  subscription, undocumented live streaming, and a monetization regression from Aug 3.
  Restructured this file so current state is overwritten rather than appended.
