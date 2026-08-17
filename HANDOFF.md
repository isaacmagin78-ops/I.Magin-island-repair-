# Project Handoff

> # 🛑 2026-08-17 — ISAAC HAS STEPPED BACK. NOTHING IS WAITING ON HIM.
>
> He said it plainly today: *"I don't understand anything you guys are talking
> about anymore because I've been at this too long."* He has been running at
> this for six weeks straight, his home has gone to hell, and he is done for
> now. **That is a legitimate decision and it is his to make.**
>
> **If you are a session opening after this: do not greet him with a task
> list, a status dump, or a question.** He is not the operator. Read this
> file, do the work yourself, and only surface something if it is on fire.
>
> **The state is safe.** Everything is on `main` — 129 commits, 16 project
> folders, every rule and finding. Nothing decays while he is gone.
>
> **Running without him:** `.github/workflows/watch.yml` fires 07:12 and
> 19:12 UTC daily on GitHub's servers, needs no session and no key, and
> appends to `WATCH-FEED.md` on `main`.
>
> ⚠️ **Re-checked 2026-08-17 16:39 UTC — the schedule is UNPROVEN, not verified.**
> `actions_list` on `watch.yml` returns **exactly one run, `workflow_dispatch`** —
> Isaac pressed the button. The job itself works (it wrote the 11:37 entry), but
> **no cron-triggered run has ever fired.** 07:12 today was before the workflow
> existed; the first real scheduled run is **tonight, 19:12 UTC.** Do not write
> "verified working" against a manual run again — check `event:` on the run.
>
> **The two live blockers, both needing only him, neither urgent enough to
> chase him about:** the Vercel account that hosts his sites is not the one
> connected here (re-verified today: 1 team, 0 projects), and GitHub Pages
> needs switching on by hand once. Until one of those, the $49 College
> Checklist cannot take a card.
>
> **✅ Posting queue REFILLED 2026-08-17 — verified live at `count: 23`.**
> Was 8 and dry after Aug 18. Now four channels a day in the proven slots
> (TikTok 17:00 · IG 21:00 · Threads 22:30 · YouTube 23:00 UTC) **through
> 2026-08-22 23:00 UTC.** Facebook stays dark — still no Page linked.
>
> **Refill again before Aug 22 23:00 UTC.** Runbook: `money-engine/REFILL-QUEUE.md`.
>
> Two mid-run blocks from the permission classifier were **transient** — the
> same call succeeded later unchanged. If `blotato_create_post` is refused,
> finish the other slots and retry; do not conclude the tool is unavailable, and
> do not record a partial refill as complete.
>
> **What today actually was:** this session opened a ten-day-old copy of the
> repo, told him things that were stale, and he had to fight through the fog
> to get to that. The repo was never lost — it was on `main` the whole time.
> That is the failure to fix, and it is ours, not his.

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

> ## 📱 The first 6–7 months were built on an iPhone. Do not get this wrong again.
>
> **Recorded 2026-08-16, after a session got it wrong.**
>
> The entire first 6–7 months of this body of work was done on an **iPhone
> only.** The MacBook and the iPads came later, and he learned them
> mid-project with Claude Code walking him through it.
>
> This is not trivia. It is the strongest single fact in the whole pitch — a
> person with no technical background, limited mobility, and a phone built a
> video engine, a listing system, a published product and a book. Describing
> his setup as "an iPad Pro, a MacBook and an iPhone" is accurate only for the
> last stretch and **erases the part that proves the mission.**
>
> How this got lost: a session saw him working on an iPad *today*, wrote that
> into a brief as if it were the history, and then "corrected" ChatGPT for
> saying "built primarily from an iPhone" — which was right. The device
> history had never been written into any file, so there was nothing to check
> it against. It is written down now.


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
> holds `611-living.png`, `611-kitchen.png` and `611-sunset.png`; `plate-611.png`
> sits one level up in `public/assets/`. **All four are AI-generated and carry a visible Gemini/Veo
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

## ❓ OPEN QUESTION — the "black AI" that appeared on his screen (2026-08-17)

**Isaac, 2026-08-17:** *"How did that black AI appear on my screen that was
never there before and I opened it up. It looks different than the other one and
it seems more advanced."*

**Nobody knows which app this is. Do not guess it.** Plausible candidates are
the Claude desktop app in dark mode, Claude Code in a terminal, or another
vendor's desktop app entirely — and picking one and being wrong is exactly the
failure that has cost him days. **Ask him for the name at the top of the window,
or a screenshot.** Then write the answer here.

**What he was actually worried about, and the answer to it:** *"it probably has
somebody already working there."* No — there is no other person in any of these
surfaces. Each one starts blank. That is the four-rooms problem already
documented above, and it is why this repo exists.

### ⚙️ Why "you used to be able to take over my computer" is true, and not a downgrade

He is not misremembering. **The difference is *where* the session runs, not what
Claude Code can do:**

| | On his Mac | In the cloud (this session) |
|---|---|---|
| His Desktop, Documents, whole drive | ✅ reachable | ❌ never |
| This repo | ✅ | ✅ |
| Organizing his actual files | ✅ | ❌ |

**A cloud session gets a fresh copy of this one repo and nothing else of his.**
So when a session says "I can't organize your folders," that is the location,
not a lost capability — and it should be said in exactly one sentence rather
than as "I can't."

**The part he thinks he lost but hasn't:** the memory. This repo *is* the
partner that remembers. A session that reads it knows about Todd, the iPhone
history, the Buzz miss and the paste rule before he says a word. That is
working. **Say so when he doubts it** — and if a session ever *doesn't* know
those things, it skipped step zero.

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

> ✅ **CORRECTED 2026-08-17 — there are 61 clips in Blotato storage, not 12.**
> Counted from `blotato_list_posts` across 115 published posts (Jul 15 → Aug 17):
> **61 distinct media URLs, and 49 of them have been used twice or less.** Only
> the top 12 are on heavy rotation; a whole second tier from mid/late July has
> run once and been forgotten.
>
> **This changes the "we need new footage before we can post" conclusion.** A
> refill can pull clips whose last use on that channel is 3+ weeks old without
> filming anything. The Aug 19–20 posts added today were selected that way.
>
> **How to do it safely:** `blotato_list_posts` returns each post's `text`
> alongside its `mediaUrls`, so the caption that originally ran with a clip tells
> you what is actually *in* the clip. Match new copy to that history — never
> write a caption for a clip nobody has looked at, or you get a kitten story over
> a beach video.
>
> **API gotcha, cost one failed call:** `blotato_create_post` for TikTok rejects
> the request unless **all six** target booleans are passed explicitly —
> `isYourBrand`, `isBrandedContent`, `isAiGenerated`, `disabledComments`,
> `disabledDuet`, `disabledStitch`. Omitting any is a hard 400.

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
  emails 07-12→08-02, resubmitted 08-10 — **SUPERSEDED: Isaac confirmed 2026-08-17
  that TikTok Shop is APPROVED, with one or two setup steps outstanding. The
  Deferred / no-W-9 status below is historical, not current.**
  withdrawals blocked, zero products listed. **YouTube Partner Program not approved** —
  18.3 of 4,000 watch hours. **Amazon Influencer blocked** — needs 10 sales/30 days, has 1.
- `*.vercel.app` is blocked for plain WebFetch here — use the Vercel MCP
  `web_fetch_vercel_url` tool to check those pages.

---

> ⚠️ **PROVENANCE WARNING, added 2026-08-15.** `concierge-systems/renovation-dashboard.csv`
> and `collection-inventory.csv` carry **realistic placeholders, not Isaac's real budgets,
> vendors, timelines or items.** The session that wrote them said so explicitly; that
> warning did not survive into `main` until now.
>
> On 2026-08-15 a session read the dashboard's cargo-elevator/COI risk line as fact and
> told Isaac a certificate of insurance was urgently blocking a September panel install.
> **He did not know what it was talking about.** The Ferguson COI email in his inbox is
> real; the deadline and the elevator reasoning attached to it came from placeholder text.
>
> **Do not quote these CSVs to him as fact.** Ask, or check with him, before acting on
> anything in them. The same caution applies to the elevator dimensions below unless he
> confirms them.

## PH3 Punchlist — LIVE, and not in this repo

`https://ph3-punchlist.vercel.app` — verified 200 on 2026-08-04, last modified
that afternoon. Built and deployed outside this repo (Vercel + Supabase:
`ph3_photos` table, `ph3` storage bucket). **Source is not here.** Do not
rebuild it; ask Isaac where it lives before touching anything.

14 items across Laundry, Primary bath, Primary bedroom, Elevator/access, Second
bedroom, Kitchen & bar. Each carries an owner (Jared / Ike / Building), a note,
and closes on a photo. Live tallies for Open / Closed / On Jared. No login,
mobile-first — that is deliberate, it is shared into a group text.

**This is the concierge model working in production.** Sent into a thread with
Suzanne and Jared Silverman (project lead, title unconfirmed) on 2026-08-04; both replied and engaged on
substance the same evening. Contractor committed to reviewing the punchlist.
Nearest thing to proof-of-model Isaac has — it belongs in any pitch.

**Elevator finding, easy to lose:** the constraint is the *door opening*, not
the cab height. Panels run ~91"; the opening is roughly 36" × 84". That is why
the letter went to the building office — the open question is whether the cab
has a removable ceiling hatch. Suzanne asked for a tape-verified cab height and
this reasoning was never explained to her, which caused a serious family
argument on 2026-08-04. If it comes up: explain the door, do not re-litigate.

**Source location, still unknown as of 2026-08-15.** Isaac has a file named
`punchlist-track…​.tsx` in his iPhone Files app (folder "Ideas and Side
Projects"), which is very likely the React component behind the live site. It
has never been committed anywhere. **Ask him to send it, then commit it** — the
punchlist is the strongest proof-of-model in the workspace and currently exists
only as a Vercel deployment plus one file on a phone.


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

## 🎬 Legends Ranch FAN PAGE — built 2026-08-17, local file only

His words: *"Why don't you just start a Legends Ranch fan page and we'll make it
look like we're fans… I am a fan."* Built at
**`legends-ranch/fan-page/index.html`** — one self-contained page, mobile-first,
verified in headless Chromium at 320 / 390 / 834px with no horizontal overflow.
It doubles as his portfolio: both delivered films are embedded from
`../deliverables/`, credited honestly as *films I made for them*.

**It is not deployed.** `.github/workflows/pages.yml` publishes `/site`, not this
folder, so nothing is live until someone makes it live. The `<video>` paths are
relative — the MP4s must travel with the file if it ever moves.

**`legends-ranch/fan-page/README.md` carries the rules and they are load-bearing:**
disclaimer in the first screen *and* the footer, never their branding, never
their voice, never an unsourced fact. Every claim on the page links to its
source. Read it before editing the page.

**Left off on purpose, because nothing public supports them:** the **83% return
rate** and the **Arthur Gutierrez quote** — both are on screen in
`LegendsAnthem.tsx` and neither could be found on any public source. Also cut:
prices, trophy scores, veteran/student counts (sources disagreed), reviews, and
their phone number. Do not add any of them back without a real source.

**Research constraint, unchanged:** `legendsranch.com`, `wildlifecentermi.org`
and `michigan.org` are all **egress-blocked** here — `WebFetch` returns
`EGRESS_BLOCKED`. Facts came from WebSearch on 2026-08-17, cross-checked across
independent results. `ffprobe` is also absent (the bundled Playwright ffmpeg has
no H.264 decoder); film durations were verified by parsing the MP4 containers
directly — anthem 64.06s, wildlife 52.05s, both 1920×1080.

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

## 📊 TIKTOK — the first real numbers, and they overturn the current strategy

**Pulled from Isaac's own TikTok analytics, 2026-08-17. None of this existed in
any file before tonight.** Blotato collects no TikTok analytics, so this channel
has been operating blind for months.

### The account
**`@tysons_time` — 302 followers · 2,467 likes · 391 following.**
Bio link: `tysons-kit-link.vercel.app`. A **TikTok Shop tab is visible on his
profile** — do not assume the shop is closed without checking what that grants.

### LIVE analytics, Jun 17 → Aug 15
| | |
|---|---|
| LIVE duration | **30 hours** |
| Views | 5.2K |
| Unique viewers | 4.8K |
| Diamonds | **147** |
| Average watch duration | 1m 17s |
| Peak concurrent viewers | 8 |
| Average concurrent viewers | 0 |

### 🔴 The finding — his read, and the chart backs it

**Isaac, 2026-08-17:** *"All the followers were from when I was doing a live feed
and interacting. Whatever has been done since then has been failing."*

**He is right, and the graph shows it plainly.** Views spike to ~1,200 in late
June, and the follower line rises *in the same window*. After the live sessions
stop, both lines flatten to near zero and stay there through Aug 15.

**Thirty hours of him talking to people produced the entire audience.** Two
months of automated daily posting — the same twelve recycled clips through
Blotato — produced a flat line next to it.

### What this overturns

- The operating strategy is **automated posting**. His own data says **live
  interaction is what worked and automation has not moved this channel.**
- **147 Diamonds is real third-party revenue from strangers** — gifts from people
  who watched him talk. *(Diamond-to-dollar value not verified here; check
  TikTok's current rate before quoting a figure.)* The $19 Kit has **zero**
  outside customers. **Live out-earned the product.**
- Average watch 1m 17s with peak concurrent of 8 means it was never a big room —
  **it was a real one.** Small and live beat large and automated.

### The number that gates the money door
**302 followers. TikTok Shop Affiliate Creator requires 1,000.** He is 698 short
of an 8–22% commission program, against Amazon's 1–10%. **Live is both the thing
that grows followers here and the format that program is built around.** That is
the same lever twice.

**Do not tell him to post more clips.** Tell him what the data says: get back on
live.

---

## 🔗 ARTURO AND LEGENDS RANCH — a connection no file ever stated plainly

**Surfaced 2026-08-17 by cross-checking two agents' findings.** Three facts that
were each recorded separately and never joined up:

1. `README.md:25` describes the Legends Ranch project as *"Legends Ranch **(with
   Arturo, Mom, Bobby)**."*
2. `legends-ranch/deliverables/README.md:6` says the anthem's second half is
   *"heritage — **Arturo's quote** and the 83% return-rate stat."*
3. `LegendsAnthem.tsx:106` renders that quote on screen attributed to
   **"Arthur J. Gutierrez, Founder"** — and public sources name the founder of
   Legends Ranch as **Arthur Gutierrez, Sr.**

**Read together: Arturo is connected to Legends Ranch, and appears to be its
founder.** *Strongly implied, not confirmed — ask Isaac to confirm rather than
asserting it.*

**Why this matters more than a filing detail:** Isaac asked a session for a
**high-end hunting gear list for Arturo, who is recovering** — described as
someone older who may not know current equipment. Every session treated that as
a personal favour. **If Arturo is the founder of a 2,000-acre trophy hunting
ranch that is already Isaac's client, it is not a favour. It is client work, for
the owner of the business he has already delivered two films to.**

That changes what the gear list should be, who it is for, and what it is worth.

---

## ⚠️ THE 83% STAT IS IN A DELIVERED FILM AND ITS SOURCE IS NOT RECORDED

`legends-ranch/deliverables/legends-ranch-anthem.mp4` — a film **already
delivered to a paying client** — carries two claims on screen:

- **"83% of guests return, season after season"** (`LegendsAnthem.tsx:111-112`)
- A quote attributed to **Arthur J. Gutierrez, Founder** (`:106`)

**Neither appears on any public source.** A research pass on 2026-08-17 searched
legendsranch.com, wildlifecentermi.org and independent coverage and found no
support for either. Both were deliberately left off the fan page for that reason.

**This is probably fine and must still be closed.** The deliverables README calls
it *"Arturo's quote,"* which points to the material being **supplied by the
client himself** — the ordinary and legitimate way a founder's quote and an
internal figure reach a brand film. **That is very different from fabrication.**

**But no file records where either came from.** Under this repo's absolute
no-fabricated-numbers rule, a delivered client asset carrying an unsourced
statistic is a loose end that has to be tied off, not assumed.

### Do this before the stat is reused anywhere
1. **Ask Isaac where the 83% came from** — Arturo directly, a ranch document, or
   somewhere else. One question, one line, closed forever.
2. **Write the answer into `legends-ranch/deliverables/README.md`** next to the
   film, so the provenance travels with the asset.
3. **Until then, do not put either claim in any new material** — not the fan
   page, not a pitch, not a case study. The fan page already correctly omits both.
4. If it turns out nobody can source it, **it comes out of the film** and the
   client is told plainly why.

---

## 💰 GMAIL AUDIT 2026-08-17 — money, deadlines and breakage nobody recorded

*Read-only sweep of 60 days of inbox. Every line below is quoted from an actual
email. Personal-financial items were deliberately excluded from this public repo.*

### Money he has earned and not collected
- **AIRBNB IS HOLDING HOSTING INCOME.** `automated@airbnb.com`, **2026-07-15 and
  again 2026-08-15**: *"THE MONEY YOU EARNED HOSTING IS WAITING FOR YOU… add or
  update your payout method in your account so you get the hosting income you
  earned."* **No amount is stated — do not guess one.** Sent twice, a month apart,
  so still unresolved. **Nothing in this entire repo has ever mentioned that Isaac
  hosts on Airbnb.**
- **Stripe works end to end.** First payment 2026-07-24, **$19.00 from Isaac Magin**
  (his own name — a self-test, not a customer), account *Imagin Consultation*
  `acct_1ToG3jFDa35si8Lw`. Paid out **$18.15** to Wells Fargo on 2026-07-31. **No
  disputes, no chargebacks, no restrictions.**

### Deadlines that already passed or are running
- **`imaginhq.com` may be disabled.** Vercel/registrar, **2026-07-13**: *"we must
  verify your email address within 15 days, or your domain will be temporarily
  disabled."* Deadline was ~Jul 28; the email is **still unread** and no
  suspension notice ever arrived. He paid $11.25 for it on 2026-07-12. **State
  unknown — check the dashboard, do not assume either way.**
- **Supabase project paused** (`dzaxjebkbxifgxzmehrl`, "IMagIn consulting"),
  2026-08-10, after 7 days idle. **Restorable for 90 days — that window closes
  about 2026-11-08.** After that the project is gone, though data stays downloadable.
- **Netlify projects suspended** 2026-07-04 — credit allowance exhausted. Reset was
  stated as Jul 22 so they may have self-restored. Needs a live check.

### Recurring spend — nothing in this repo tracks any of it
Claude Pro $20/mo · Linktree Pro **$15/mo** (a free trial that auto-converted
2026-07-31, account `imaginconcierge`) · iCloud+ $2.99 · Apple One **rising
$25.95 → $27.95 on Sept 10** · CapCut Pro · LinkedIn Premium Business (renews
Aug 22). Lapsed or ending: Grammarly $139.99/yr, Perplexity Pro $20/mo,
Supermetrics and Airtable trials.

**Against $1.29 of lifetime third-party revenue, the subscription burn is the
larger number and no file has ever named it.**

### Closed doors
- **PartnerStack rejected him**, 2026-07-30: *"Your profile is not a great fit,
  but may be in the future."* He can reapply from the dashboard.
- **A TikTok for Business partner signup was started 2026-07-22 and never
  finished** — *"Follow this link to finish signing up."*

### Quiet lanes — said out loud, because silence is a finding
- **Amazon Associates and Amazon Influencer: totally silent for 90 days**,
  including spam and trash. No status notice, no warning, **and nothing about a
  180-day probation.** That probation belief appears in this repo's own files and
  **has no email support** — verify it at the source before building on it.
- **YouTube monetization: silent.** One item only — **2026-07-20, advanced
  features unlocked** after video verification.
- **TikTok payouts, LIVE, Creator Rewards: silent. No violations or strikes.**
- **Legends Ranch: no contact in 60 days.**
- **Linda Hoyt: no business contact at all.** She appears only as an automated
  Luxury Presence listing digest he subscribes to. **No engagement, no
  authorization, no reply.** The do-not-publish-without-authorization rule stands
  completely untouched.

### Two loose ends
- **TikTok hit 300 followers on 2026-08-14** (now 302).
- **Seven different spellings of the same brand across seven billing systems:**
  "Tyson's Time" · `tysonstime` · `imaginconcierge` · "Imagin Consultation" ·
  "Imagin bespoke concuerg" · "IMagIn consulting" · `isaacmagin78-4065`.
- **`CLAUDE.md` says "no CI, `.github/` does not exist." That is now false** —
  `.github/workflows/pages.yml` was added today.

---

## 🛒 THE TYSON PRODUCT LIST — FOUND. Stop rebuilding it. (2026-08-17)

**He said "Gemini, Claude or ChatGPT already has a detailed list." He was right, and
it took three sessions of rebuilding before anyone looked outside the repo.**

**It is not in this repo.** It is in Drive and Notion:

| Where | What |
|---|---|
| Drive · [`Tysons_Picks_Revenue_System`](https://docs.google.com/document/d/1sXyNJ-UaZeNBuGP5VY0udr_Q332xHLOLsN-C54TtVsc/edit) | **Section 9 = "PRODUCTS TYSON ACTUALLY USES."** The drawer rule, already written 2026-07-13. Also holds Associates ID `tysonspicks-20`, disclosure wording, category rules |
| Drive · [`Tyson's Time — Amazon Storefront Build Kit`](https://docs.google.com/document/d/1Fys2WebqW_JTlEwGPKexr3Imko9S3F_s72_tK8MOP64/edit) | 6 named collections + the "mid-to-premium, never cheapest" selection rule |
| Notion · [`Tyson's Brand`](https://app.notion.com/p/3a308c7e2ece81c2b6c7cd66d84c8f2a) | Verified shortlist: Nerf Dog soccer ball, Miami Dolphins jersey, bed, ID tag |

**Two decoys — do not mistake these for the list.** `app/gear/page.tsx` in git history
(commit `41713de`, branch `claude/tyson-gear-page-d15ud7`) is three invented placeholders
pointing at `amazon.com/dp/EXAMPLE`. `Tyson_Picks_App_Prototype_v2` in Drive is a UI
mockup with a fabricated "Chewy 20% OFF" tile.

**Two open questions closed by looking at a photo already in this repo** —
`kit-site/product/cover-tyson.jpg` and `tyson-and-miss.jpg`:
- **The Miami Dolphins collar is real.** The Drive doc says *"No evidence it exists."*
  It's on Tyson's neck in `cover-tyson.jpg`, webbing reading "Dolphins". Update that doc.
- **The bed is Beautyrest** — brand legible in `tyson-and-miss.jpg`, which also shows the
  ZippyPaws-style football plush, a plush duck, and an elevated bowl stand.

**The full write-up, with the ready-to-paste listing and an iPad checklist, is
`shop-tyson/TIKTOK-SHOP-LISTING.md`.** Do not summarise it back to him; point at it.

### ⛔ The listing is gated on brand authorization — this is new and it matters

TikTok Shop requires **brand authorization** to list any trademarked product, and marking
a branded item "No Brand" is explicitly prohibited. CRAVE is Mars Petcare. Two routes:
a Letter of Authorization from Mars (unobtainable for pallet stock), or **proof of
purchase** — the pallet-store receipt — which TikTok accepts *only for brands in their
drop-down and only for sellers TikTok selects.* **Until that check is run in Seller
Center → Qualification Center, nobody knows whether CRAVE is listable at all.**

And the fallbacks are already closed: the **$19 Kit cannot be listed** — digital goods
need the invite-only Virtual Goods category (gift cards / game codes / software licences
only, auto-delivery via API, ebooks and courses excluded). Tyson's own gear is one of each,
not stock. **If CRAVE is blocked, he has no listable product today** — say that plainly
rather than writing more copy.

### Also confirmed today
- **Amazon order confirmations are not in this Gmail account.** Searched every phrasing;
  zero results. Product ownership cannot be verified from the inbox — only from his eyes
  on the bag.
- **The drawer photos are in Drive** in [`Ike's Ipad Pro`](https://drive.google.com/drive/folders/1cr6vkOoEL1hDpx_w5A-CwoITNcUDXZNH),
  all named `IMG_####`. Unlabelled means unfindable — renaming three files fixes it forever.
- The Notion page **`Tyson's new toy`** (2026-08-15) is **empty** — the attachment never saved.

---

## ✅ TIKTOK SHOP IS OPEN — verified in Gmail 2026-08-17, with dates

**Isaac said it was approved. He was right. Independently confirmed from his own
inbox — this is no longer his word against a Notion page.**

| Date | From | What it says |
|---|---|---|
| Jul 17, 19, 26 · Aug 2 | `sellersupport@shop.tiktok.com` | *"Application Rejected? Here's How to Fix It"* — Business Verification needed updating. **This is the era Ike OS recorded.** |
| **Aug 10, 07:28** | `no-reply@shop.tiktok.com` | New login to the TikTok Shop account — Safari, Florida |
| **Aug 10, 07:30** | `sellersupport@` | *"We've Received Your Documents"* — review in 48–72h |
| **Aug 10, 07:56** | `sellersupport@` | *"Your Settlement Tier Status Has Been Updated"* |
| **Aug 10, 07:56** | `sellersupport@` | 🎉 **"Congrats! your shop setup is complete!"** |
| Aug 13 · Aug 16 | `sellersupport@` | *"Your Shop Is Ready — Let's Get Your First Product Live"* — sent again, twice |
| Aug 13 | `sellersupport@` | *"70% of Shoppers Buy Through Shop Tab First"* |
| Aug 14 | `sellersupport@` | Seller training invitations |

### The remaining step is one thing: **list a product**

Not "one or two setup steps." **TikTok has now asked him three times to list his
first product.** That is the entire gap between an open shop and a working one.

### Why this is the highest-value unfinished item in the workspace

Every piece is already in his hands:
- **A shop that is open**, as of Aug 10
- **A proven supply** — CRAVE pet product at **$2–3 a unit against ~$18 retail**,
  bought with his own hands at a pallet store
- **An audience that matches it** — a rescue-dog brand
- **The format that works** — 30 hours of LIVE built his entire TikTok following
  and earned 147 diamonds, while two months of automated posting moved nothing
- **Commission of 8–22%** against Amazon's 1–10%

**One listing closes the loop.**

### ⚠️ The process failure this exposes — do not repeat it

The shop was approved **Aug 10 at 7:56am.** Ike OS was edited **Aug 15** and still
said *"Deferred, W-9 missing."* Sessions then repeated that back to Isaac for two
days while TikTok emailed him three times asking for a product.

**The proof was in Gmail the whole time and no session looked.** This was not a
tooling limit — a Gmail tool was available and simply never used. Standing rule
from this:

> **Before repeating any account status from a file, ask where the proof would
> live and go look there.** Approvals, rejections, payouts and policy changes
> arrive by email. Notion records what someone believed; the inbox records what
> actually happened.

---

### ⚠️ CORRECTION, same day: approved and payable are two different things

**An earlier entry today said the "W-9 missing" note was stale. That was an
overcorrection and it is wrong.** A Gmail audit found the two are separate
systems:

- **Business Verification** — this is what was approved 2026-08-10. Shop open. ✅
- **Form W-9** — lives in Seller Center tax information. The only email about it
  is **2026-07-11**, and it says plainly: *"Failure to submit a valid Form W-9
  results in your withdrawals being blocked."* **No later email anywhere in the
  mailbox confirms it was received or accepted.**

**A shop can be fully approved and still have withdrawals blocked.** Do not tell
Isaac the money side is clear until someone opens Seller Center and looks at the
tax information tab. **Shop ID: `USUSLCE6ESY2`.**

### ⚠️ "Deferred" now means two unrelated things — do not let a session confuse them
- The old project-status note said TikTok Shop was *deferred* (an application state).
- TikTok's 2026-08-10 email assigns **Settlement Tier: Deferred Settlement** — that
  is a **payout schedule**, the slowest one, and it is current and unrelated.

A future session will "correct" one using the other unless this stays written down.

---

## 🌐 PUBLIC HOSTING — where it stands, 2026-08-16, and one 30-second unblock

Isaac needs **a public URL that works for anyone with no login** — the claude.ai
artifact share flow keeps bouncing him to a sign-in he can't complete on mobile.
Three routes attempted tonight. **Read this before trying a fourth.**

### ✅ The unblock — 30 seconds, only Isaac can do it
**GitHub → repo Settings → Pages → Source: "GitHub Actions". Save.**
That is the entire fix. `.github/workflows/pages.yml` is already committed and
will publish `/site` automatically on the next push to
`claude/project-status-update-xbolj2`.

Live URL once enabled: `https://isaacmagin78-ops.github.io/I.Magin-island-repair-/`
(`/built.html`, `/brand.html`, `/holo.html` alongside it.)

**Why it failed tonight:** `actions/configure-pages@v5` with `enablement: true`
returned *"Create Pages site failed — Resource not accessible by integration."*
The default `GITHUB_TOKEN` **cannot create a Pages site**; Pages has to be
switched on once by hand. Everything after that is automatic. Do not rewrite the
workflow — it is correct, it is only waiting on the toggle.

### ⚠️ The Vercel account mismatch — unresolved since 2026-07-20, confirmed again tonight

A production deploy through the Vercel MCP returned **READY** with
`imagin-concierge-ovjmi6yae-c8j6sgyyh7-5024s-projects.vercel.app`. Then:

- `list_projects` on the only connected team → **empty**
- `get_deployment` on the id it had just returned → **404 not found**
- `get_project_deployment_protection` → **404**
- `*.vercel.app` is blocked by this container's egress proxy, so no direct test

**The connected Vercel account is not the one hosting his live sites.**
`tysons-time-kit`, `shop-tyson`, `college-checklist` and `tysons-links` are all
live in the world and **none of them appear in the connected account.** Ike OS
flagged exactly this on 2026-07-20 and nobody resolved it; four weeks later it
is still true and it silently wasted a deploy tonight.

**Consequence:** *do not trust any Vercel URL produced through the MCP*, and do
not report one as live. **Fixing the account connection is a real task nobody has
picked up** — until then Vercel is not a usable publishing route from here.

### Netlify
`deploy-site` requires an existing `siteId` and explicitly refuses to assume a
new site. Not attempted further.

---

## 💡 THE CONCIERGE DIFFERENTIATOR — situational intelligence, not task execution

**Isaac, 2026-08-16, and this is a product requirement, not a passing remark.**

He asked what to wear before going out. The answer mattered less than the point
he made after it:

> *"The context is bigger picture. If we're selling a personal assistant for
> Arturo or anybody of his ilk — anywhere in the world, wants to change their
> travel or do anything they want — that needs to be built in."*

**Anyone can build "book my flight."** What a client like Arturo actually pays
for is an assistant that knows **how a room works**: what to wear to this
specific kind of evening, what will get you turned away at a door, what is
current versus dated, how people actually behave when they get together at an
event. That is the layer generic assistants have no idea exists.

### Why Isaac is uniquely qualified to specify it

**He has thirty years of lived experience in exactly these rooms.** In his own
words, *"I know the game. I know how this operates in this life."* He knows that
jeans, a t-shirt and the right shoes read better in the right room than a suit
does — the kind of judgment that cannot be scraped, only lived.

**That is the moat.** It is the same pattern as the rest of this workspace: his
own experience is the qualification, not the weakness. Non-technical is why the
AI-fear audience trusts him; thirty years in the room is why a concierge product
built by him would be worth paying for.

### What this means for IMagin Concierge

- **Situational intelligence is a feature to build, not a nice-to-have.** Dress
  codes and door policy for a specific venue. What is current this season, not
  in general. How an event actually runs. Who is in the room.
- **It has to be verified and current** — the same rule as everything else here.
  A confidently wrong answer about a dress code gets a client turned away at a
  door, which is worse than no answer.
- **It has to work from a phone, anywhere in the world**, spoken, in the ten
  minutes before someone walks out the door. That is the actual usage moment.

**Nobody has scoped this.** `imagin-concierge/` and `concierge-systems/` describe
task execution. This is the part that would make it worth money, and it is not in
either of them.

*(Isaac also shared personal context alongside this. Per the intake rule, that
belongs in Notion, not in a public repo. Only the product-relevant part is here.)*

---

## 💥 LIVE DEFECT FOUND 2026-08-16 — the link-in-bio may be taking money and not delivering

**Found by reading the repo, not by being told. No status file has ever mentioned it.**

There are **two different Stripe payment links** in this repo:

| Link | Where it lives | Status |
|---|---|---|
| `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00` | `kit-site/site/index.html` (`PAYMENT_LINK`) and `buy.html` | The **known-good** one. Verified live. 25 sessions, 24 expired, 1 paid. |
| `buy.stripe.com/dRmdR90uX8tPgN84dIg7e01` | **`link-pages/tysons-time-hub/index.html:131`** and **`link-pages/tysons-links/index.html:57`** | **Undocumented anywhere.** Almost certainly the "second link." |

**Why this matters more than anything else on the open list:** the original
`PROJECT-BRIEF.md` (2026-07-31, commit history) listed as open item #1:

> *"Second Stripe payment link doesn't redirect buyers to their download"*

That defect was recorded on Jul 31, **never carried into `HANDOFF.md`**, and so
no session since has known about it. Meanwhile the link it refers to is sitting
on **both link-in-bio pages** — the destination his social bios point at, and the
entry point to his entire funnel.

**The plain-language version: someone arriving from his bio may be able to pay
and never receive the product.** Anyone arriving at the Kit sales page hits the
good link instead. Two doors, one of them possibly broken, and the broken one is
the one his audience walks through.

> ## 🔻 CORRECTION — 2026-08-17. The paragraph above is wrong. Read this before acting on it.
>
> The `dRmdR90…` link is **not a product checkout and has no download to
> deliver.** On both pages it is labelled, in the markup itself:
>
> > **"Keep the Stream Running — $5 / month · Tyson and Kitty go live
> > regularly. This keeps it going. Cancel anytime."**
>
> — `link-pages/tysons-links/index.html:57` and
> `link-pages/tysons-time-hub/index.html:131`.
>
> It is a **recurring stream-support subscription**, not the Kit. The Jul 31
> note about a "second link" that "doesn't redirect buyers to their download"
> was matched to this link by inference alone; nothing connects the two, and a
> $5/month subscription has no download to redirect to in the first place.
>
> **The danger this correction removes:** the section above ranks this as
> mattering "more than anything else on the open list," which invites the
> obvious fix — swap `dRmdR90…` for the known-good Kit link. **Doing that would
> replace his stream-support subscription with a $19 one-off product and break
> a working page.** This session came within one edit of doing exactly that,
> and stopped only after reading the surrounding markup.
>
> **Still genuinely unverified:** what the Stripe link charges and whether it is
> live. No Stripe tool is connected in this container — the Stripe MCP requires
> authorization that no session can complete. Verify in the Stripe dashboard
> before touching either link.

### ⚠️ What is verified and what is not

- **VERIFIED from files (2026-08-16):** two distinct links exist; the
  `dRmdR90…` link is on both link-in-bio pages; the Jul 31 brief flagged a
  second link as not delivering; `HANDOFF.md` never carried it forward.
- **NOT VERIFIED — no Stripe tool is available in this container:** whether
  `dRmdR90…` is live, what product and price it is attached to, and whether its
  post-payment redirect is actually broken today.

### Next session: do this before anything else

1. Open Stripe → Payment Links → find `dRmdR90uX8tPgN84dIg7e01`. Check that it is
   live, what it charges, and **whether it has an after-payment redirect to the
   delivery page**.
2. If it is broken or duplicative, **point both link-in-bio pages at
   `cNi4gz1z1aBXdAW7pUg7e00`** — the one known to work end to end — and redeploy.
3. This also resolves old open item #2, *"four different link URLs across bios —
   consolidate to one."*

**Do not tell Isaac his funnel is broken until step 1 is done.** The file
evidence is strong; the live status is not confirmed. Verify, then report.

---

## 📅 JULY 11–14, 2026 — what actually happened, and why it was not Isaac's fault

**Mirrored into this repo 2026-08-16.** This was verified by Perplexity Computer
on 2026-08-14 and written into Ike OS in Notion — but it was **never copied
here**, so no Claude Code session has ever known it. Isaac has been trying to
explain this for weeks against sessions that had no record of it.

### The method that worked

- **`CLAUDE.md` was created 2026-07-13** (commit `ff8c8f9`) — **494 lines**
  documenting College Launch OS: full architecture diagram, every data type,
  every convention, spelled out.
- **On 2026-07-14 an agent built three complete projects in one day:** the entire
  Remotion video engine (Phases 1–7, commits `4adad13`→`0a8428e`, 22:36–22:55),
  the college command center redesign, and the whole Madison Moves site (36
  files, commit `1d89fc5`, 22:08).

**That is the recipe, and it is not lost.** Exhaustive written documentation plus
an agent that does not stop to ask. The July 13 file is still readable at
`git show ff8c8f9:CLAUDE.md`.

### The three platform events that broke it — all real, all external

| Date | Event | Effect |
|---|---|---|
| **Jul 11, 2026** | Claude Code **Auto Mode** went live *without requiring opt-in* — an autonomous edit-run-observe-refine loop | Removed the pause-and-ask step. This is what let a session reorganize his MacBook without checking in. |
| **Jul 13, 2026, 6PM PDT** | A temporary **50% higher Claude Code weekly usage limit expired**; limits snapped back to standard | Matches him repeatedly running out of usage right around this day. |
| **Jul 14, 2026, 9:31–9:58PM UTC** | A real **~45-minute Claude.ai outage** broke Claude Code, file uploads/downloads and document creation | A genuine platform failure, not an error on his end. |

**Isaac, 2026-08-16:** *"That was all interrupted by fucking usage limits — at
some point something happened with Anthropic where they made system adjustments."*
**He is correct.** Auto Mode removed the brakes, his usage ceiling dropped
overnight, and the platform went down, inside the same 72 hours.

**Never tell him the July collapse was disorganization on his part.** The best
work in this repo and the worst incident in it happened on the same day, for the
same reason, and neither was his doing.

---

## 🛑 THE AGENT ROSTER IS WRONG. Do not paste one until Isaac confirms it.

**Recorded 2026-08-16, in his words, after a session pasted the Aug 4 Notion
roster at him as if it were true.**

**The Notion page "Agent Roster — canonical (Aug 4, 2026)" is NOT reliable.**
It flagged its own unresolved conflicts on the day it was written and they sat
for twelve days. A page being labeled canonical in Notion does not make its
contents current — Ike OS's own rule says the live layer wins, and for *which
assistants Isaac actually uses*, **Isaac is the live layer.** Ask him; do not
read it off a page.

### What he confirmed

- **The agents are named after real people in his life.** That is the naming
  convention, and no file in this repo has ever recorded it. Losing it is why
  the roster reads like arbitrary labels.
- **Claude Code is "Sy"** — named after his stepfather. *(The family detail
  stays in Notion; the repo is public. The agent name itself is operational and
  belongs here.)* Sessions have been signing off as "Sy" without any file saying
  why.
- **Flex is now also "Arturo."**
- **Flex's original job — never built, and lost:** *"Flex was originally supposed
  to be my second brain, someone I could talk to as my second brain and
  strategize and oversee all of you guys."* Then Perplexity's capabilities
  changed and the role blurred. **Nothing in this workspace fills that seat
  today.**

### What is still unknown — leave it unknown, do not guess

- **"Todd."** Isaac does not recognize him: *"there's no Todd."* The Aug 4 page
  invented or inherited the name and handed him final decision-making. **Never
  use the name Todd until Isaac says what it is.**
- The rest of the roster. Kelly, Percy, Gem — plausible but unconfirmed by him.

**Standing rule from this:** do not hand Isaac a roster, an org chart, or a
"paste this into every AI" block until he has confirmed every name on it. A
wrong roster is worse than none — he pastes it, every assistant adopts it, and
the error propagates into five rooms at once.

---

## ⚠️ THE REGRESSION — the system made him slower at what he was best at

**Isaac, 2026-08-16:** *"Three months ago I would've known about Buzz before Scott."*

He is not describing a capability he never had. He **had it and lost it.** Three
months ago he was in the feeds on his phone, following creators, watching what
shipped — he *was* the trend sensor. The tooling never added sensing. It
consumed the hours he used to spend sensing and filled them with maintaining
tools, re-explaining context, and chasing work that evaporated.

Nine months of building, honestly scored: hours in the feeds went from most of
them to near zero; he went from ahead of his friends on launches in his own lane
to three weeks late and secondhand.

**Consequences for every future session — these outrank tidiness:**

1. **Any new file, tool or process must remove more of his time than it adds.**
   If you cannot name the hour it gives back, do not build it. This repo already
   has fifteen project folders and a dozen status documents. Organization has
   never been the bottleneck.
2. **Never hand him a system to operate.** The recurring failure is building
   something that only works if he tends it. He is not the operator; he is the
   person it runs for.
3. **The measure of this project is whether he is back ahead of the news and out
   of the maintenance** — not how clean the repo looks. A tidier workspace that
   costs him another hour a day is a loss.

See `TREND-WATCH.md` for the repair.

---

## 🛒 Retail arbitrage — a proven channel no file had ever mentioned

**Recorded 2026-08-16.** Isaac told this to a session and it was never written
down, so it does not appear in any revenue planning anywhere in this repo.

There is a **Hopkins store selling Amazon pallets — open-box and returns.**
Isaac ran a weekend test there and it worked: **CRAVE** pet product bought at
roughly **$2–3 a unit against about $18 retail.**

Given that total verified third-party revenue is $1.29, a channel he has
*already executed successfully with his own hands* deserves to be on the board
next to the $19 Kit that has never sold to an outsider. Nobody has costed it out.

**His own caveat, stated at the time:** he is not switching Tyson's food over it.

**Related standing rule for the storefront:** on the Tyson shop page he only
wants **products Tyson actually uses.** He photographed a drawer to show which
ones — the photos were about the products, not the drawer.

**Amazon Associates compliance, learned the hard way:** affiliate links in
**emails and private messages are prohibited**, and **encouraging friends or
relatives to purchase through a link is prohibited.** Either one terminates the
account. Both came up because he was about to send a link privately.

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

---

## 🎬 FACELESS VIDEO — built and proven 2026-08-17. It renders. It does not post.

**Isaac asked: *"Why don't we have a faceless YouTube channel going already?
Isn't that supposed to be pretty damn easy?"*** He was right. The engine could
turn photos and clips into video since July; it could not turn **words** into
video, so the one format that needs no camera and no filming day was the one
thing it couldn't make. That is now built.

### What he does

Write lines into `isaac-video-engine/assets/faceless/next.txt`, then run one
line in the `isaac-video-engine` folder:

```bash
BRAND=tysons-time PRESET=youtube-shorts npm run render:script
```

Blank line = new card. First line of a card is the big line. Lines under it are
the smaller line. `#` = a note that never renders. No timings to set — each card
holds for as long as it takes to read. **Full instructions: `isaac-video-engine/FACELESS.md`.**

### Verified, not claimed — 2026-08-17, this container

- `npm ci` from the committed lockfile: clean, **9.4s**.
- `npx tsc --noEmit` clean; eslint clean (2 pre-existing warnings, neither new).
- Rendered `isaac-video-engine/out/faceless-first-30-days.mp4` from the six-card
  demo script. `ffprobe`: **h264, 1080×1920, SAR 1:1 / DAR 9:16, 30 fps, 27.90s,
  837 frames**, 8.6 MB, plus the expected silent aac track.
- Six frames extracted and **looked at**: every card legible, brand watermark
  correct, hairline rule and supporting lines correct, crossfade confirmed
  mid-transition, warm amber/ember ground drifting, no rainbow band.

**Looking at a frame caught a defect nothing else would have.** The first render
came out labelled "ISAAC VIDEO ENGINE" on a Tyson's Time video: Remotion merges
`--props` *over* `defaultProps`, and a key passed as `undefined` is dropped by
`JSON.stringify`, so it silently inherited the default. Fixed, re-rendered,
re-verified, and written into `TROUBLESHOOTING.md`.

### ⚠️ What is NOT built — the honest gap

**The engine makes the file. Nothing carries it to Blotato.** Verified live via
`blotato_list_accounts` and `blotato_list_schedules` on 2026-08-17: 5 channels
connected (TikTok `49211`, Instagram `61044`, Threads `8305`, YouTube `42110`,
Facebook `43069`) and 8 posts scheduled through Aug 18 — **every one of them
with media already sitting in `database.blotato.io/storage/...`.**

That is the whole gap. Blotato will not post from a file on a machine or from a
Drive link; the video has to be uploaded into Blotato's own storage first
(`blotato_create_presigned_upload_url` → `blotato_create_post`). Today a Claude
session does that by hand.

**To make it daily, one job has to do three things nobody has strung together:**
render the next text file → upload the MP4 to Blotato storage → schedule the
post. Every piece is proven and available. **Nothing should be built until it is
worth more than the ten minutes a day it replaces** — see the regression section
above; a system he has to operate is a loss, not a win.

### Where the code lives

`ScriptShort` composition (`src/compositions/ScriptShort.tsx`), driven by
`scripts/render-script.mjs`, built from `ScriptCard.tsx` and
`AmbientBackdrop.tsx`. **`AmbientBackdrop.tsx` is where `DESIGN-DIRECTION.md`'s
closed-palette rule is enforced in code** — light comes only from the brand's
own primary/secondary over its background, and hue is never computed or cycled,
so it structurally cannot produce a rainbow. Nothing existing was changed or
removed; every diagnostic composition still stands.
