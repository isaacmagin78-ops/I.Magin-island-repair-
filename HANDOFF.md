# Project Handoff

> **Every Claude session reads this file first and updates it before finishing.**
>
> This file exists because sessions cannot see each other. Kelly (GPT),
> Flex (Perplexity), and Claude each start from zero every time. This is
> the only shared memory. If it goes stale, everyone wakes up lost — that
> is exactly what happened between Jul 29 and Aug 7.

> ## ⭐ THE MISSION — read this before anything else in this file
>
> **In Isaac's words, 2026-08-16:**
>
> *"It's not about competing AI — you guys are a team. We're all working
> together to show that this can be something where people don't have to be
> scared of AI. AI and humans can interact and live together."*
>
> **That is the point of the whole operation.** Not the video engine, not the
> listing packages, not the storefront. Those are demonstrations. The thing being
> demonstrated is that a non-technical person and a set of AI tools can build
> real work together — and that it is worth other people not being afraid of.
>
> He has said this repeatedly, in several rooms, over months. **No session ever
> wrote it down until now.** Do not lose it again, and do not treat it as a nice
> sentiment — it is the product strategy:
>
> - **`the-read.tsx` in his Google Drive** (built 1 July, never finished) is this
>   mission as a product: a career-exposure tool for people frightened of AI,
>   written in his voice, grounded in real WEF/McKinsey/IMF research. **The
>   mission and the unfinished product are the same idea.**
> - **Imagin Concierge** is the same idea sold as a service: *you don't have to
>   learn this, I'll do it for you.*
> - His own experience — overwhelmed, non-technical, losing things across eight
>   tools — **is the qualification, not the weakness.** Every other person
>   teaching AI is technical and enthusiastic. He is neither, and that is exactly
>   why the audience would trust him.
>
> **Never frame one AI tool as beating another in front of him.** He is not
> shopping for the best model. He is trying to prove they can work together.


**Last updated: 2026-08-15** · Anything below marked *(secondhand)* came from
another session's summary and has not been re-verified. Re-check before acting.

> **Consolidated 2026-08-15.** Until today this file existed as eleven rival
> copies on eleven unmerged branches, and `main`'s was frozen at Jul 29. This is
> the reconciliation of all of them. See `WORKSPACE-MAP.md` for what was on each
> branch and what is still archived.
>
> **Check `date -u` before trusting any tool's idea of "now."** A stale Blotato
> snapshot and a stale Vercel `date` header agreed with each other on 2026-08-15
> and cost a session an entire wrong status report.

> ## 🚨 The 611 "photos" are AI-generated. Do not render or ship them.
>
> Found 2026-08-15 by opening them. `isaac-video-engine/public/assets/stills/`
> holds `611-living.png`, `611-kitchen.png`, `611-sunset.png`, plus
> `plate-611.png`. **All four are AI-generated and carry a visible Gemini/Veo
> sparkle watermark in the bottom-right corner.** They have a real property's
> address, real bed/bath/sqft, and real marketing copy burned into the frame
> ("Sea Monarch Unit 611 | 2 Bed • 2 Bath • 1,450 Sq Ft", "Fully Renovated &
> Turnkey Furnished").
>
> They are wired into `src/compositions/SeaMonarchFilm.tsx` (stills) and
> `ListingFilm.tsx` (plate). Neither composition is registered in
> `src/Composition.tsx`, so **nothing has ever rendered or shipped with them.**
> Keep it that way.
>
> This is not a branding problem. A synthetic interior of a *real* listing,
> captioned with that listing's real specs, published under a licensed broker's
> name, is a misrepresentation-of-property problem — and the watermark makes it
> detectable. **Never generate property images. The shoot is the client's input,
> not our output.** Say so out loud in pitches; it is a differentiator, not a
> weakness.

> **Aug 14 — read this before asking Isaac anything.** He has spent six weeks
> re-explaining the same night to every new session. The Jul 22–23 recovery is
> written below. The four-rooms problem is written below. **Do not make him
> explain it again.** Verify with tools, then act.

## ⚠️ There are FOUR rooms — but three walls came down on Aug 14

This was the root cause of six weeks of confusion. In the Claude app, **Code**,
**Dispatch**, **Cowork**, and **Chats** are separate surfaces. Work done in one
is invisible to the others. Isaac has been re-explaining from zero in every room
because each one genuinely does start blank.

**That is now only half true.** A Code session *with MCP connectors enabled* can
read Notion, Google Drive, and Blotato directly. Verified live 2026-08-14 — all
three were previously written off in this file as unreachable. **Before you
conclude something is out of reach, check your tool list.**

| Room / System | What lives there | Reachable from Code? |
|---|---|---|
| **Code** (this repo) | All eight projects, this file | — |
| **Notion** (`Ike's Venture HQ`) | Master Project Registry, Venture Tracker, daily briefings | ✅ **YES** — `notion-search`, `notion-fetch` |
| **Google Drive** | TysonScripts, raw footage, Content Hub, prototypes | ✅ **YES** — `search_files`, `read_file_content` |
| **Blotato** (posting queue) | Live schedule + all 5 channels | ✅ **YES** — `blotato_list_schedules`, `blotato_create_post` |
| **Dispatch** | Read the Jul 22–23 transcripts; holds that recovery | ❌ No |
| **Cowork** | 5 open tasks dated Aug 6 (see below) | ❌ No |
| **Chats** | Starred: Money Engine OS, The Private Office, Isaac HQ, IMagin Concierge, Tyson Brand App | ❌ No |
| **Local Mac** | `~/.claude/projects/*.jsonl` session transcripts | ❌ No |

**This file is still the shared memory of record.** Anything that matters must
land here or it is lost to every room that lacks connectors.

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

### ✅ TysonScripts — FOUND 2026-08-14, in Google Drive, contents verified

Not secondhand. Both documents were opened and read this session.

> **This repo is PUBLIC.** Drive file IDs and the Amazon Associate tag are
> deliberately not written here. Retrieve them with the Drive connector —
> `search_files` on the titles below finds both in seconds.

| Document (search Drive by title) | What is actually in it |
|---|---|
| **Tyson's Time — 10 Ready-to-Post Packages** (Jul 26) | 10 complete posts: hook line, full caption, hashtags, and a named source clip each |
| **Tyson's Time — Amazon Storefront Build Kit + Agent Prompt** (Jul 26) | 6 Idea Lists w/ product briefs, influencer-approval path, network money-move |

**Two facts recovered that appear nowhere else in this repo:**

- **The Amazon Associate tracking ID is in the Storefront doc, Part A.** Not
  reproduced here — public repo. It was previously recorded nowhere at all.
- **All 10 captions already carry exactly 5 hashtags** — already inside
  Instagram's hard limit. These are post-ready as written.

**The matching footage is also in Drive** — `Tyson's Time Content Hub/` and
`02 Raw Tyson Videos/`. Spot-checked: the clips named by Posts 1, 2, 3, and 5
all exist as real files. **Scripts + footage are both in hand, so the empty
queue is refillable now** — it is not blocked on producing anything new.

⚠️ The Packages doc ends with: *"Post natively in-app for best reach (scheduler
tends to get throttled)."* That is in tension with scheduling via Blotato.
Isaac's call — native reach vs. scheduling convenience.

Still worth copying both into version control before they drift.

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

**✅ CORRECTED 2026-08-14 — Notion IS readable from Code.** The previous line
here said "No Claude session can read or write Notion — there is no connector
here." That is false when connectors are enabled, and it caused sessions to
stand down from work they could have done. Verified live this session:

Search these by title with `notion-search` (IDs omitted — public repo):

- **Ike OS — Master Project Registry** (database)
- **Venture Tracker** (database)
- **Ike's Venture HQ**
- **Ike OS**
- **Agent Roster — canonical (Aug 4, 2026)**
- **Knowledge Asset… Cross-AI Continuity Loss — Recovery Inventory** (Jul 29)

A **daily briefing page** has been generating on schedule (Aug 8–13 all present),
reading Venture Tracker, Master Project Registry, Stripe, and Pre-Flight
Checklist. That automation is alive and nobody in Code knew it.

If a decision, deadline, or client plan seems missing from this file, **search
Notion first** — then ask Isaac.

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

### Queue: RE-VERIFIED LIVE 2026-08-14 (second check, from a Code session)

### Queue: REFILLED 2026-08-15 07:30Z — 16 posts through Aug 18 23:00Z

**Verified `count: 16`.** Four channels a day in the proven slots
(TikTok 17:00 · Instagram 21:00 · Threads 22:30 · YouTube 23:00 UTC),
Aug 15 → Aug 18. Every caption carries the Kit link and the Amazon disclosure;
Instagram uses `firstComment`, YouTube and Threads carry real clickable URLs.
Footage rotated so nothing repeats on the same channel inside ~10 days.

**Refill again before Aug 18 23:00Z.**

Before this refill the queue was empty and **every channel was dark from
Aug 10 23:00Z to Aug 15 — four and a half days.** That is the second time the
queue has silently run to zero. It is the single most repeatable failure here.

✅ **A cloud Code session CAN reach Blotato.** Earlier guidance in this file said
it could not and routed this to Dispatch. That was wrong; the tools are here.

Last post published **Aug 10 23:00Z** (YouTube). All channels have been dark
since.

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
| Instagram `@tysonstime` | 61044 | ✅ highest **views** (~1,100–2,200/reel) but near-zero engagement — see below |
| TikTok `@tysons_time` | 49211 | ✅ working (42–275 views) — cross-post always, costs nothing |
| YouTube (Tyson's Time) | 42110 | ✅ working (~234 views) |
| Threads `@tysonstravels_rescuepitslife` | 8305 | ✅ working |
| Facebook | 43069 | ❌ dark — no Page linked. Needs Isaac. |

### Channel value is inverted from what this file has always said

"Instagram is the best channel by ~10x" is true for **views** and false for
everything else. Measured 2026-08-15 via `blotato_list_top_posts`:

| Post | Channel | Views | Likes | New subs |
|---|---|---|---|---|
| "The first month sets the rhythm" | YouTube | 1,281 | 94 | 12 |
| "Returned once, years confined" | YouTube | 1,457 | 66 | 2 |
| "Aggressively asleep" | YouTube | 1,385 | 55 | 10 |
| "Dad said she was only staying one night" | Instagram | 2,217 | 30 | — |
| "Kittens are fragile" | Instagram | 1,981 | 21 | — |
| "60lbs vs 2lbs" | Instagram | 1,195 | 5 | — |

Instagram delivers reach without a relationship — **near-zero comments on almost
every post**, despite every caption ending in a question. YouTube converts a
smaller audience into likes, comments and actual subscribers, and it is the one
high-volume channel where a clickable link already works in the description.

Keep cross-posting to Instagram — it costs nothing and the reach is real. But
when choosing where to spend *effort*, YouTube is what compounds.

**Footage decay:** the same ~12 clips have cycled for a month and reposts lose
about 17% (2,217 → 1,839 on the same reel; 1,981 → 1,649). New footage is the
highest-value hour available. Blotato collects **no analytics for TikTok**, so
TikTok is absent from every figure here.

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

> **CORRECTED 2026-08-15 from the live layer (Stripe + Blotato + Gmail).** This section
> previously said the Kit was "already transacting." It is not, and that claim propagated
> into `money-engine/INSTRUCTIONS.md` and several sessions. Per the verified-state rule
> below: the live layer wins, Notion and this file get corrected.

**Total verified third-party revenue, all time: $1.29.**

- First 30 Days Kit **$19** — sales page `tysons-time-kit.vercel.app`,
  Stripe `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`.
  **ZERO external customers.** Infrastructure works end to end (page, checkout, PDF,
  automated delivery). One charge exists all-time: 2026-07-24, billed to Isaac Magin at
  his own address — a self-test. 25 checkout sessions created, 24 expired unpaid, none
  since 07-31. Stripe balance $0. Do not describe this offer as proven or selling.
  Use the **sales page** in captions, not the raw Stripe link.
- **College Checklist $49 — live Stripe link EXISTS but was never wired up.**
  `https://buy.stripe.com/00w6oH1z16lHcwS9y2g7e02` (created 2026-08-07). The button on
  `college-checklist.vercel.app` still points at a **test** link, so real cards are
  rejected and the product has never been purchasable. Swapping the button is the whole
  fix. Seasonal note: college move-in is late August — this is the product's window.
- Amazon Associates active — **$1.29 earned, 67 clicks, 1 order, 1.49% conversion.**
  That single qualifying sale retired the 180-day account-closure risk. Probation
  continues: 3 qualifying sales from 3 separate checkouts by ~mid-Jan 2027; 1 so far.
  Only **one** affiliate link has ever been created. 33 YouTube videos (11,929 views)
  carry **no tagged links in their descriptions**, while ~25 posts carry the disclosure
  with no link in the funnel — lost revenue and a disclosure-accuracy exposure.
  Disclosure required in every caption that carries a link.
#### The 24 abandoned checkouts — verified independently 2026-08-15

`GetCheckoutSessions` live: **25 sessions, 24 expired unpaid, 1 paid** (Isaac's
own test, Jul 24 03:48). All 25 on the same $19 payment link.

**This corrects a diagnosis another session reached this morning.** Counting only
`GetPaymentIntents` shows one record and makes it look like nobody ever reached
the payment screen — i.e. a severed link path. That is wrong. A Checkout Session
is created when a real person lands on the Stripe page; an abandoned one never
becomes a PaymentIntent. **Two dozen real people reached checkout and left.**
The funnel is not severed. Amazon's 67 clicks say the same thing: the bio link
works.

**The pattern that matters is the dates:**

| Window | Checkout sessions |
|---|---|
| Jul 21 → Jul 31 14:30Z | 25 |
| Aug 1 → Aug 15 | **0** |

Traffic to checkout stopped dead on Jul 31 and has never resumed, through two
solid weeks of daily four-channel posting. Something in the path changed that
day, not gradually.

**Leading hypothesis, unconfirmed:** on Jul 31 00:05Z a Threads post announced
`tysons-time-hub.vercel.app` as the new "everything in one place" link. The hub
leads with the **$5/month stream subscription** and demotes the Kit to second
card; `tysons-links` leads with the Kit as a filled orange button. If the bio
moved from `tysons-links` to the hub around Jul 31, the Kit lost the hero slot
on the same day checkout traffic went to zero — and the subscription that
replaced it has **never sold once** (0 subscriptions, all time).

**To test it:** ask Isaac which page is in the IG and TikTok bios. If it is the
hub, put the Kit back on top or point the bio at `tysons-links`, then watch
whether checkout sessions resume. That is a one-line change with a measurable
answer.

#### Post-payment delivery is UNVERIFIED and may be broken

The Kit's Stripe link redirects paid customers to
`https://tysons-kit-access.vercel.app/access-tyk30-8f4d2/` — a **different
domain** from the `tysons-time-kit.vercel.app` that `kit-site/LAUNCH.md` and the
sales page both name. On 2026-08-15 `web_fetch_vercel_url` fetched
`tysons-links`, `tysons-time-kit` and `tysons-time-hub` fine but could **not**
resolve `tysons-kit-access.vercel.app` or the `/access-tyk30-8f4d2/` path on
either domain. Plain curl is proxy-blocked for `*.vercel.app`, so this is
genuinely unresolved from here.

**If that page is dead, anyone who pays $19 gets nothing.** Isaac has to open the
Stripe link, pay or use the success URL directly, and confirm the delivery page
loads and the PDF downloads. Highest-severity unknown on this list.

**Related, now fixed:** `kit-site/site/vercel.json` was redirecting the product
PDF to a raw GitHub URL pinned to the feature branch
`claude/fable-video-prompt-refine-b21x3t`. Deleting that branch would have
404'd product delivery. Repointed at `main` on 2026-08-15.

- **Amazon email goes to iCloud, not Gmail** — there is a dedicated Amazon folder there.
  A Gmail sweep finds nothing. Likely tied to the open Apple Hide My Email item.
- Link pages live and fixed *(secondhand, Aug 6)*.
- **Not deals, despite prior claims:** Southwest (public comment 07-23, DM never arrived,
  window closed). **TikTok Shop is not cleanly approved** — six "Application Rejected"
  emails 07-12→08-02, resubmitted 08-10, settlement tier **Deferred**, W-9 not on file,
  withdrawals blocked, zero products listed. **YouTube Partner Program not approved** —
  18.3 of 4,000 watch hours. **Amazon Influencer blocked** — needs 10 sales/30 days, has 1.
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
| First 30 Days Kit | **Not selling.** Live page + working Stripe link, **zero external customers in 25 days.** See Money. |
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
5. **Confirm post-payment delivery works.** Open the Kit's Stripe success URL and
   check the page loads and the PDF downloads. See "Post-payment delivery" above.
   If it is broken, every future sale fails silently.
6. **Say which link page is in the IG and TikTok bios** — `tysons-links` or
   `tysons-time-hub`. Checkout traffic died the day the hub was announced; this
   answer is testable and probably worth more than anything else on this list.
7. **Delete the two `Post Text` posts** (TikTok `7671553026762575134`,
   YouTube `cBbaW6pyXWQ`). No tool here can delete a published post.

---

## Next steps

1. **Refill the posting queue — it is empty and all channels are dark since Aug 10.**
   Runbook: **`money-engine/REFILL-QUEUE.md`**. Captions are ready (TysonScripts,
   above) and the footage is in Drive. **Any session with Blotato tools can do
   this — including cloud Code.** Do not route it to Dispatch by default.
2. Delete or fix the two `Post Text` posts from Aug 8 (missing Amazon disclosure).
3. Copy TysonScripts out of Drive into this repo before it drifts (it was
   *found* on Aug 14 — the two documents are named in the Drive section above;
   this step is the copy, not another search).
4. ~~Follow up Southwest~~ — **dead.** The DM never arrived and the window
   closed; see "Not deals" under Money. Do not resurrect this.
5. Decide on the Desktop → Google Drive sync of passport/insurance/card documents.
6. Install `INSTRUCTIONS.md` into the Claude project.
7. Show Linda the package.

**Operating rules that keep this from happening again:**
- Verify with live tool checks before telling Isaac anything is broken.
- Lead with the single best recommendation; ship first, report with live URLs.
- Update this file before finishing. Every time.

---

## Linda Hoyt — verified state as of 2026-08-15

Everything here came from Isaac's own screenshots of her live Facebook and
Instagram, taken 2026-08-15 ~13:36 ET. It is public-post data, not MLS.

**Her current listing — this is the live one. `111-pompano-beach-611` is CLOSED
and must not be pitched again.**

| Field | Value |
|---|---|
| Address | 1205 SW 4th Street, Fort Lauderdale, FL 33312 |
| Neighborhood | Sailboat Bend |
| Price | $750,000 |
| Beds / baths | 3 / 2 |
| Character | 1923 restored historic cottage; she calls it "the Cozy Cottage" |
| Features | Original hardwood, French doors, designed kitchen; fenced yard, artificial turf, decorative gravel, mosquito misting; newer roof, A/C, fencing |
| Position | Minutes to Las Olas, downtown FTL, the beach, FLL |
| **Open house** | **Sunday 2026-08-16, 1:00–3:00 PM. Mimosas.** |

**Her numbers — the finding that should lead any pitch to her.**

- Instagram `@linda_s_hoyt_realtor`: 1,968 posts · **2,693 followers** · 1,700 following
- Bio: Top 1.5% of Realtors nationwide · Global RE Advisor · ONE Sotheby's Int'l Realty · lindashoyt.com
- RealTrends Verified 2026 — **ranked #18 Realtor in Fort Lauderdale**
- Her Jun 11 RealTrends award post: **184 likes, 57 comments = 8.95% engagement.**
  Instagram benchmark for that follower count is 1–3%; real estate averages 1–2%.
- Her Facebook open-house post for the cottage, up 22 hours: **5 reactions.**

**Her YouTube — the number that matters most.** Channel "Linda S. Hoyt - Realtor",
**29 subscribers**. She produced a real episodic series, *The American Dream:
Selling Fort Lauderdale* — professionally shot on the water, styled, titled.
**Episode 1: 1,005 views, posted 3 years ago, 16 likes, 0 comments.**

**The read — corrected by Isaac 2026-08-15, and he was right.** Do not call the
8.95% "great marketing reach." Those 2,693 followers are her *warm network*:
family, past clients, referral sources. They gave the award post 184 likes
because they are proud of her; they gave the cottage 5 reactions because none of
them needs a 3/2 in Sailboat Bend. Meanwhile the one channel built to reach
strangers has 29 subscribers.

So the pitch is **not** "your engagement is great." It is: *the expensive part is
already done and nobody built the thing that carries it.* Feed and Facebook posts
distribute to existing followers; **reels, Shorts and TikTok are the only formats
shown to non-followers.** Everything she posts currently lands in the same warm
room. She needs distribution and repurposing, not content generation — and the
seller report is what converts a referral network into listings.

> **Isaac's standing instruction, 2026-08-15: do not ask Linda for anything.**
> "I really don't wanna ask her anything. I just wanted to see what we can do for
> her." He also read her working style: she plans ahead and is already thinking
> about next week and three weeks out, so anything hinging on *tomorrow* is both
> an ask and badly timed. **Give, don't request.** Build the finished thing and
> hand it over with no reply required.

**The pitch page** is `Listing-Content-System/pitch/linda-hoyt-pitch.html`
(published at `claude.ai/code/artifact/a3b18477-dfad-4fce-87ac-02fffc4fd91f`).
It is **not a pitch** — it is a three-week campaign calendar for the cottage
(Aug 17 → Labor Day) with all nine captions already written, five postable as-is
and four needing ~60s of phone video with the exact shot named. It closes with no
ask at all. Strongest angles, both buried in her own listing copy and unused: the
**mosquito misting system** ("why you can actually sit outside here, in August")
and **1923** ("try getting these floors today"). Every figure is a real blank.

## Brokerage AI landscape — researched 2026-08-15

Isaac asked what the high-end brokerages are actually running, so the pitch does
not duplicate what she already gets daily.

- **Compass Home Platform.** Compass closed the Anywhere acquisition; rollout to
  company-owned brands (incl. Sotheby's International Realty) began July 2026,
  ~4,000 agents at launch, ~80,000 expected by end of September. **Franchise
  network — which is ONE Sotheby's — begins Q1 2027.** AI Assistant with context
  across contacts/pipeline/marketing, daily briefings, "Likely to Sell", CMA,
  reverse prospecting.
- **Maestro** (HomeServices of America — Berkshire Hathaway's brokerage arm),
  launched 2026-03-26. AI "front door" unifying consumer search, CRM, marketing
  and transaction management behind one login. BHHS also runs an AI Academy
  certification track.
- **Content tools** (AutoReel $19–49/mo, Reel-E $44–449/mo, Trolto, etc.) —
  crowded and cheap. 97% of brokerage leaders report agent AI use, up from 80%
  in 2024; only independents under 10 agents still lag.

**The gap, and the only defensible position:** every one of these is
agent-facing back-office. None produces an artifact the *seller* holds.
Meanwhile luxury-seller research is consistent that they want a consolidated
read-out — the private-banking pattern — not a stream of updates. The
seller-facing marketing report, tracked QR signage, and done-for-you service are
the three things absent from the entire competitive set.

**Do not pitch "AI makes content."** She gets that mail every day, and her own
brokerage ships a better version of it next year.

---

## ⛔ The Legends Ranch audit is stale — 2026-08-15

`legends-ranch/site-audit/REPORT.md` Finding 1 ("homepage anthem embed plays a
Vimeo placeholder") was **confirmed on 24 July 2026 and is no longer safe to
repeat.** Isaac looked at legendsranch.com twice on the evening of 2026-08-15 and
reports the site looks substantially better than a few months ago. He did not see
the defect.

**`legendsranch.com` is blocked by this environment's egress proxy.** No session
can re-verify it. Only Isaac can, by looking at it.

**What went wrong, so it doesn't happen again:** a session built him a page around
that finding and handed it to him to show people at dinner, with "may since have
been fixed — worth re-checking" in small print at the bottom instead of said
plainly before the handoff. He nearly showed a real client's defect that had
already been fixed.

> **Standing rule: a finding in a file is only as fresh as its date.** Before
> handing Isaac anything to *show another human*, state the date out loud and say
> whether you can re-verify it right now. If you can't re-verify it, say so
> before the link, not after.

**Also standing, from the same evening:** he asked for one video and got five
pages and a stack of links. The film he wanted had existed in
`legends-ranch/deliverables/` since 31 July. **When he asks for one thing, give
him that one thing** — and put content in the chat as plain text, not behind
links, because links scroll away and he cannot find them again.

---

## 2026-08-15, late — what this day actually taught, read this before anything

**The single most important finding, in his own words:** *"All the TikTok momentum
is from those live feeds I was doing."* He stopped doing TikTok Live about a month
ago to build systems. **Those systems have earned $0. The live feeds were working.**

And the economics back him up — checked tonight:

| Channel | Commission |
|---|---|
| Amazon Associates | 1–10% fixed (pet supplies ~3%) |
| TikTok Shop, average US | ~13% |
| **TikTok Shop, LIVE sessions** | **20–30%** — sellers pay more for live |

Same $50 product: **$1.50 from Amazon vs $10–15 from a TikTok live.** The one
activity he already proved works for him is also the highest-paying format on the
platform. **This is the lead, not the content systems.**

> ⚠️ **He was about to text Amazon affiliate links to family and friends.** That is
> two explicit Associates violations — links in private messages, and encouraging
> relatives to buy through them — and it gets accounts terminated. He has a real
> Associate ID. He was warned tonight. **Do not let anyone walk him into this.**

**Why Linda still has no walkthrough video, after weeks:** the engine can build one
from stills (Workflow A, Ken Burns). **The only missing input is photographs of
1205 SW 4th Street.** He has none, and hers belong to ONE Sotheby's. Nobody ever
asked her for the files. A session today built her a calendar and a pitch page
instead of asking for the one input that unblocks the actual deliverable.
**Photos are not a favor, they are an input** — that distinction was not made to
him and it cost him the thing he wanted.

**Corrections logged today, all of them mine:**

- I told him the repo held 8 projects. **It holds 15.** `ASSET-INVENTORY.md`
  (written 2026-08-15) is the real map and is better than anything I produced.
  **Read it before claiming to know what exists.**
- `tyson-and-the-kitten/` is a **finished book** — manuscript, print-ready dummy
  PDF, storyboard, funder packet. A July session dismissed his description of it
  as a voice-to-text error. Per his own file: *"Isaac was accurate every time."*
- `concierge-systems/PRODUCT-PILOT.md` — "The Collection Record" — is the tiered
  concierge offer he keeps describing from memory. **It is already written.** Aimed
  at 65–85 year old South Florida homeowners, which is the room he was in tonight.
- The Legends Ranch audit finding is stale. He checked the site himself.

**The pattern to break:** he asked for one video tonight and received five pages
and a stack of links. The film had existed since July 31. **Give him the one thing
he asked for. Put it in the chat as text or a file, not behind a link.**

---

## 📌 THE TWO CREATORS ISAAC FOLLOWS — write nothing over this

**Isaac has named these two repeatedly across multiple sessions and rooms. No
session ever wrote them down. He had to say it again on 2026-08-16, angry, and
he was right to be. This is the record. Do not lose it again.**

### Sabrina Ramonov 🍄 — `@sabrina_ramonov`

- **She is the solo founder of Blotato.com** — the posting tool already wired into
  this repo's MCP stack (`blotato_*`). **Isaac is already inside her product.**
  Following her is not random advice; it is the person who built a tool he uses.
- YouTube: **20,354,603 views**, joined 18 May 2024. Grew 0 → 500k+ in six months solo.
- Stated mission: *"teach 1 million people AI."*
- **Free AI prompts, playbooks and agents: `sabrina.dev/p/free`** — go read these
  before inventing any workflow from scratch.
- Blotato link: `l.blotato.com/yt-sabrina`

### Dan Martell — `@danmartell`

- **2.99M subscribers**, 3.6K videos. *"My #1 passion is teaching."*
- Business/SaaS operator teaching systems, buybacks-of-time, and self-education.
- Recent, relevant: **"How To Become Dangerously Self-Educated (with AI)"** — 454K
  views; "If I Wanted to Make My First $100K/Month, I'd Do This"; "You only need
  6 months to change your life."

**Standing instruction from Isaac: follow their guidance.** He stopped watching
both for roughly a month while buried in AI tooling and considers that a mistake.
When proposing a content, monetization or AI-workflow approach, check it against
what these two actually teach before inventing something new.
