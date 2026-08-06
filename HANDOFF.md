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

## Queue — refilled 2026-08-06, verified 12 scheduled

Aug 5's last two posts published clean (Threads
[DbrNxVRmPDa](https://www.threads.com/@tysonstravels_rescuepitslife/post/DbrNxVRmPDa),
YouTube [xRccSPCxudw](https://www.youtube.com/watch?v=xRccSPCxudw)), the queue hit 0, and
was refilled the same night. `blotato_list_schedules` → `count: 12`.

Daily rhythm matches the established pattern: **TikTok 17:00Z · Instagram 21:00Z ·
Threads 22:30Z · YouTube 23:00Z.**

| Date | TikTok 17:00 | Instagram 21:00 | Threads 22:30 | YouTube 23:00 |
|---|---|---|---|---|
| Aug 6 | year-two montage | manatees | "he waits" (text) | kittens are fragile |
| Aug 7 | Episode 1 takeover | POV new intern | year-two montage | manatees |
| Aug 8 | first time they met | kittens are fragile | Episode 1 takeover | don't bring a kitten |

**Every slot uses media that channel has never run.** No new production — this closes the
cross-post gap the handoff calls the biggest historical miss, using only proven clips
from Blotato storage (those URLs are reusable forever).

Queue runs dry after **Aug 8 23:00Z**. Refill before then.

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

## RESOLVED 2026-08-06 — both link pages now carry everything

There were two competing link-in-bio pages and **neither was complete**: `tysons-links`
had the Amazon gear link and disclosure but no subscription; `tysons-time-hub` had the
$5/mo subscription but no Amazon and no disclosure. Whichever sat in the bio was
silently dropping an income line.

Rather than force a choice about which URL is canonical (which would have needed a bio
edit only Isaac can do), **both pages were made content-complete and redeployed.** Now
either one works:

| | `tysons-links.vercel.app` | `tysons-time-hub.vercel.app` |
|---|---|---|
| Kit $19 → sales page | ✅ | ✅ |
| Amazon gear (`tysonspicks-20`) | ✅ | ✅ |
| Amazon disclosure | ✅ | ✅ |
| $5/mo stream sub | ✅ | ✅ |
| Socials (IG/TikTok/YT/Threads) | ✅ | ✅ |

Each keeps its own visual design — the orange card layout and the serif editorial layout
were left alone; only the missing content was added.

Two fixes folded in:

- The hub's Kit link pointed at `tysons-kit-link` which 302s **straight to Stripe**. That
  violates our own documented rule ("cold viewers need the pitch before a payment
  screen"). Both pages now go to the sales page with `?s=bio` tracking.
- YouTube handle unified to `@tysonstime` (the pages previously disagreed on case).

**Sources now live in `link-pages/` in this repo.** Before this they existed *only* on
Vercel — one accidental deletion from being gone with no copy anywhere.

Deploy note: `list_projects` returns an empty array for this team even though the
projects exist. Use `get_project` with the slug (`tysons-links`, `tysons-time-hub`) —
both are real, in `team_MCU3MembxNrAzrNozh6h8uWA`, and own their `.vercel.app` domains.
Redeploy with `deploy_to_vercel` using the project name + `target: production`.

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

## Monetization regression Aug 3–5 — fixed going forward

Captions carried the Kit link *and* "As an Amazon Associate I earn from qualifying
purchases" consistently through **Aug 2**. From **Aug 3–5, IG and TikTok posts carried
neither** — six posts with no monetization and no disclosure, while still saying "link in
bio" about a bio containing affiliate links.

**All 12 posts in the current queue carry both lines.** The standard, restored:

- **IG / TikTok:** `🐾 First 30 Days Kit + Tyson's gear picks: link in bio` +
  `As an Amazon Associate I earn from qualifying purchases.`
- **Threads:** the actual `https://tysons-links.vercel.app` URL (the page carries the
  disclosure itself).
- **YouTube:** direct Kit URL + gear picks link-in-bio + disclosure.

The six already-published Aug 3–5 posts cannot be retroactively edited through Blotato.

TikTok flags were set `isYourBrand: false` / `isBrandedContent: false`, matching every
previous post. Worth a human look sometime: these posts do promote our own product, so
the stricter reading of TikTok's labels is arguably `true`. Left consistent with what has
been working rather than changed unilaterally.

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
4. **Facebook: Page vs no Page** — see the diagnosis above; determines which fix applies.
5. **Confirm a link page is in the bios at all.** No longer urgent for *which* one — both
   are complete now — but if neither is in a bio, every "link in bio" CTA still goes
   nowhere. No tool can read a social bio.

# Next steps for Claude

- **Refill the queue before Aug 8 23:00Z.** Never let it hit 0.
- Expand the Kit manuscript 15 → ~100 pages and render print-ready interior for KDP.
- Resolve the 15-page-$19 vs 100-page-$14.99 pricing conflict.
- Open Facebook once the Page is linked.
- Consider giving the $5/mo subscription real promotion — it's the only recurring line
  and it has never been pushed in a caption.

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
- **2026-08-06**: Queue hit 0 and was refilled with 12 posts through Aug 8, every slot
  using proven media the target channel had never run. Restored the Kit link and Amazon
  disclosure to every caption. Made both link pages content-complete and redeployed them,
  and pulled their sources into `link-pages/` — they had existed only on Vercel.
