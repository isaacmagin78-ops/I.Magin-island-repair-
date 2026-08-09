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

**Queue is EMPTY. 0 posts scheduled.** This is the live action item.

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
