# Handoff — read this first

**Rule for every session:** verify with a live tool call before telling Isaac
anything is broken. The previous version of this file was 12 days stale and
sent multiple sessions chasing problems that were already fixed. Stale notes
did more damage here than any bug.

Last verified: **2026-08-09**, against live Blotato data.

---

## Isaac, in one line

Solo operator running several small businesses at once. The recurring failure
mode is **not** unfinished work — it's finished work he's lost track of. When
he says something is missing, check whether it already exists before building
it again.

---

## Tyson's Time — social (VERIFIED 2026-08-09)

**Queue is EMPTY. Last post went out 2026-08-10 23:00 UTC — three days dark
as of 2026-08-13.** Refilling is the live action item.

The 8-post refill authorised on Aug 9 all **published successfully** — four
platforms on Aug 9 and Aug 10, real live URLs, zero failures. Aug 11 and Aug 12
were written but never submitted (the Blotato MCP server dropped mid-run and
its reconnected instance gated `create_post` behind an approval that never
resolved). Nothing partial was left behind — those calls created nothing.

**Two malformed posts are live and public.** On 2026-08-08 at 07:03 and 07:04
UTC, a TikTok and a YouTube post published with the literal body text
`Post Text` — placeholder copy that was never filled in.
- TikTok: `tiktok.com/@tysons_time/video/7671553026762575134`
- YouTube: `youtube.com/watch?v=cBbaW6pyXWQ`

These carry no Kit link, no disclosure, no caption. Neither was created by this
session. They should be deleted or edited — Isaac has to do it in-app; no tool
here can delete a published post.

Note: the 17:00 UTC TikTok slot on the current day rejects as "in the past" if
the session runs later than that. Check the clock before assuming it's free.

- Jul 28 → Aug 6: **32 posts published, 0 failed.** Four platforms a day
  (TikTok 17:00 / Instagram 21:00 / Threads 22:30 / YouTube 23:00 UTC) for the
  Aug 3–6 stretch. The system works unattended — that pattern is the template.
- Last post out: Aug 8, 23:00 UTC (YouTube). Nothing after it.

### Channels

| Platform | Account ID | Status |
|---|---|---|
| Instagram @tysonstime | 61044 | working — best channel by ~10x |
| TikTok @tysons_time | 49211 | working, posting daily |
| Threads @tysonstravels_rescuepitslife | 8305 | working |
| YouTube (Tyson's Time) | 42110 | working |
| Facebook | 43069 | no Page linked as of Jul 26 — **not re-verified since** |

### Rules learned the hard way

- **Instagram: max 5 hashtags.** Hard API error above that.
- Media must live in Blotato storage. Google Drive URLs never work as
  `mediaUrls`; Drive files must also be "Anyone with the link → Viewer".
- Existing `database.blotato.io/storage/...` URLs are reusable forever.
- YouTube needs title + privacyStatus + shouldNotifySubscribers.
- Always cross-post to Instagram. Historically the biggest miss was
  TikTok-only posts.

### Money links (in every caption)

- First 30 Days Kit $19 — sales page `https://tysons-time-kit.vercel.app/`,
  Stripe `buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00`
- Link-in-bio page **`https://tysons-links.vercel.app`** — LIVE, in use in
  Threads captions. (An older note claimed this was still blocked waiting on
  Isaac's Amazon link. It isn't. It shipped.)
- `https://tysons-time-hub.vercel.app` also referenced in a Jul 31 post.
- Amazon Associates disclosure line required wherever gear is mentioned.
- `*.vercel.app` is blocked for plain WebFetch/curl in this environment — use
  the Vercel MCP `web_fetch_vercel_url` tool to check those pages.

---

## Dispatch — the other Claude surface (IMPORTANT, 2026-08-13)

**Dispatch is a Claude feature**, listed in the app sidebar alongside Code and
Cowork. It is not a third-party product. It holds a large amount of Isaac's
context that **no Code session can see** — sessions do not share memory across
surfaces. Isaac spent days assuming Dispatch and Code were one system. They
are not, and that assumption cost him most of a week of contradictory advice.

**Anything that must survive between surfaces has to live in this file.**
Isaac can paste this file into Dispatch to sync it in one message.

### What Dispatch holds that this repo did not

- **TysonScripts** — a full content library: captions for every ready-to-post
  video, a 7-day posting schedule, UGC brand outreach templates (Chewy,
  BarkBox), an Amazon storefront setup guide, product scripts, a YouTube
  longform outline, Legends Ranch documentary narration scripts, and a
  "Tomorrow Plan" morning brief built from Notion + YouTube Studio data.
- **IMagin Concierge** and **IMagin Travel** — built as separate child
  sessions: service menus, pricing, pitch docs, a first-3-clients strategy,
  and the travel concept with **Madison as pilot client**.
- **The winning YouTube formula**, from real Studio data: top video was
  *"60lb Pitbull vs. 2lb Kitten"* at **2,529 views**. The pattern is
  **kitten + Tyson size contrast, under 13 seconds, seamless loop.**
  Use this to select clips — it beats guessing, and it beats
  platform-novelty as a selection rule.

### Pending since 2026-07-23 — nobody has done these

1. **Southwest Airlines DM — still unread since July 23.** Dispatch prepared a
   full response package with rate guidance of **$1,500–$3,000**. This is the
   single largest money item on any board, and it has been sitting for three
   weeks. Cannot be read or answered by any tool here.
2. **Amazon Influencer application never filed** (Associates is already done).
3. **Amazon tax info never completed.**
4. **Gumroad never set up.**
5. **3 bad YouTube Shorts never deleted.**

### Unresolved — the Kit site could not be verified by either surface

Dispatch tried to reach `tysons-time-kit.vercel.app` and **timed out**. From
here, `web_fetch_vercel_url` failed to produce a shareable URL, and
`list_projects` on the connected Vercel team
(`team_MCU3MembxNrAzrNozh6h8uWA`) returns **zero projects**.

Most likely the live sites are deployed under a **different Vercel account**
than the one wired into these sessions — but that is unconfirmed. Since this
is the paid checkout page for the $19 Kit, **Isaac should open the URL himself
and confirm it loads.** Do not assume it is up, and do not assume it is down.

---

## Balcony Buddies — collab series (NEW, 2026-08-09)

**"Balcony Buddies" is the name of the collab series.** Guest pets featured
with Tyson.

First planned guest: **Theresa**, who has a pit bull — Isaac has said both
**Luna** and **Luca**; name unconfirmed, ask before publishing. She messaged
Tyson's **TikTok** account. She runs a startup: dog clothing (referred to as
"Royal Robes" / "Royal Roads" — exact name unconfirmed) plus a dog-walking
service. Isaac wants her as a client *and* eventually a salesperson.

- **Hold off on the calico cat.** Not to be featured yet.
- **Tool limit:** Blotato DM tools cover **Instagram and Facebook only**.
  TikTok DMs cannot be read by any tool in this session. Theresa's message must
  be screenshotted by Isaac. Her Instagram comments were checked — she isn't
  there either.
- **No Luna/Luca/Theresa/Royal assets exist in this repo.** Searched every
  file: zero hits. That footage and those product photos are on Isaac's phone
  and in his DMs, not in any system. Do not go looking for them here again.

Also wanted: a post from the **Tyson + Miss T first stroller walk** footage.
A `TysonVsMiss` Remotion composition already exists in
`isaac-video-engine/src/compositions/`.

**The footage is in Google Drive** — `First walk mst new ride`, file ID
`1ip4WYauPA1nZ46eleRzNIWX5zFiUiqdt`, 47.7 MB QuickTime, uploaded 2026-08-09.
It is currently **private (owner-only)** and therefore unusable until shared.

---

## Google Drive — the recurring trap

Drive IS connected and readable from these sessions (`search_files`,
`read_file_content`, `download_file_content`; also `create_file`/`copy_file`).
There is **no delete and no overwrite tool** — files there cannot be destroyed
from here.

**The trap, hit three times now:** a Drive file that is owner-only cannot be
fetched by Blotato or downloaded here. It fails in a way that looks like a
file-size or format problem and isn't. It is always permissions.

**Permanent fix — do this once instead of per-file:** create a single folder,
set *that folder* to **Anyone with the link → Viewer**, and put every asset
meant for these sessions inside it. Everything dropped in inherits the
permission and just works. Loose files in My Drive root do not.

Direct-download form that works once a file is shared:
`https://drive.usercontent.google.com/download?id=FILE_ID&export=download&confirm=t`

Media still has to end up in Blotato storage to post — a Drive URL is never a
valid `mediaUrls` value.

**Also in Drive as of 2026-08-09** (all owner-only unless noted): `MrT new play
pen`, `Mrs t playing with toy while Tyson watches`, `IMG_0411.MOV` (154 MB),
`IMG_0407.MOV`, several `.heic` stills, a ~13-photo batch in folder
`1UZKuUrCOD6-C5ZbgGPo4cBwthl4uoP3w`, and two edited exports
(`cut01hooked.mp4`, `verticalmaster.mp4`) in `1qYhswxhTChb9nU7oz0gp491Fx2VubseG`.

**No Claude session has ever had access to Isaac's computer.** These sessions
run in a disposable cloud container with a fresh clone of this repo. There is
no access to his camera roll, his filesystem, or his local Photos library — so
nothing here organised his photos, and nothing here can lose them. Drive and
chat uploads are the only two ways footage reaches a session.

---

## Payments — decided 2026-08-09

Isaac has a PayPal business account (**"Imagin Int"**) with Point of Sale /
Tap to Pay available. POS lifetime sales: $0.00 (never used — not a defect).

**The split, and it's one rule:**

- **In person → PayPal POS Tap to Pay.** Car wash, dog walking, house
  cleaning — anything where he's physically standing there. Zero build, works
  off the phone today.
- **Online / pre-booked → Stripe links.** Already wired into `kit-site` and
  `madison-moves`. Don't rebuild these in PayPal.

Do not consolidate onto one processor without a specific reason. Stripe also
does Tap to Pay, but it needs Terminal SDK work; PayPal POS needs an app
download. For a solo operator taking $40 at a driveway, PayPal wins on
time-to-first-dollar.

---

## Linda Hoyt — real estate (ready, not sent)

Linda is Isaac's sister, a top-producing Broker-Associate at ONE Sotheby's
International Realty, Fort Lauderdale. See
`Listing-Content-System/CONTEXT.md`.

- **She already said yes.** In texts she replied "That would be amazingggggg"
  to the idea of a system-run real estate YouTube channel. **Do not re-pitch
  her.** The next move is logistics, not persuasion.
- She just got an award and posted about it on Facebook — congratulate first.
- A congratulations + "come see it at your open house" text is drafted and
  waiting on Isaac to send at a reasonable hour.
- **Confirmed hers:** `111 N Pompano Beach Blvd #611` — the brief carries her
  own `lindahoytrealestate.com` listing URL. `18 Nurmi Drive` and
  `709 Isle of Palms Drive` are in the system but have no agent attribution;
  don't claim they're hers without asking.
- Do **not** put "Linda concierge that brings in leads" in writing yet. It's
  the vaguest, largest part of the pitch and it wasn't in the conversation she
  agreed to. Say it in person.

---

## Repo map

| Folder | What it is |
|---|---|
| `madison-moves/` | South Florida home concierge site (Next.js, booking form, Stripe) |
| `college-launch-os/` | Family college-prep app, synced to college-launch-os.vercel.app |
| `isaac-video-engine/` | Remotion branded-video engine (own CLAUDE.md + skills) |
| `legends-ranch/` | Finished films in `deliverables/`, site audit in `site-audit/` |
| `kit-site/` | First 30 Days Kit sales page, product PDF, launch record |
| `Listing-Content-System/` | Luxury listing content generator (Linda's tool) |

College Launch is deployed by direct upload to Vercel — **not** auto-deployed
from this repo.

---

## Next actions

1. **Refill the social queue — it is at 0.** Copy the Aug 3–6 four-a-day
   pattern. Reuse existing `database.blotato.io` media URLs. Needs Isaac's
   go-ahead before anything publishes to his accounts.
2. Isaac to send: Theresa's TikTok DM screenshot + the Miss T stroller
   footage. Nothing on Balcony Buddies can move without those.
3. Isaac to send Linda the drafted text.
4. Confirm the guest dog's name (Luna vs Luca) and her company name before
   any Balcony Buddies post goes out.

## Blocked — only Isaac can do these

1. **Facebook Page not linked** in Blotato → Accounts. Channel has never
   posted. (Status from Jul 26; re-verify before raising it again.)
2. **Bios** — no tool can read or edit social bios. Every "link in bio" CTA
   depends on `tysons-links.vercel.app` actually being in the TikTok, IG, and
   YouTube bios. Unverifiable from here.
