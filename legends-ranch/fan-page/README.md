# Legends Ranch — fan page

`index.html` is a single, self-contained fan page for **Legends Ranch**
(Bitely, Michigan) and **The Wildlife Center at Legends Ranch**, made by Isaac.
It doubles as a portfolio page: the two films embedded in it are the ones he
actually produced and delivered, and they live one directory up in
`../deliverables/`.

Built 2026-08-17. No build step, no dependencies, no network calls. Open it:

```
open legends-ranch/fan-page/index.html
```

The two `<video>` tags use relative paths (`../deliverables/*.mp4`), so the page
only plays its films **from inside the repo**. If it is ever moved or deployed,
the MP4s have to move with it — see "If it ever gets published" below.

---

## ⛔ The rule this page exists under

**It is a fan page and it must stay unmistakably a fan page.** Legends Ranch is
a real business with real customers. Everything below is non-negotiable; if a
future edit can't keep all six, don't make the edit.

1. **Never present it as the ranch's own site, page, or voice.** No "we" as the
   ranch. No official-sounding announcements. No writing on their behalf.
2. **The disclaimer stays in the first screen and in the footer.** Both. It is a
   structural element, not fine print, and it must survive any redesign. The top
   band is the first thing under `<body>` and it says, in plain words,
   *independent fan page — not affiliated with, authorized by, or endorsed by
   Legends Ranch.*
3. **Never copy their logo, marks, colors, fonts, or site design.** The page is
   deliberately built to look nothing like them: they use a gold-on-forest
   serif; this is a near-black page in a system sans with a closed
   ember→coral accent. That contrast is doing legal and ethical work, not just
   aesthetic work — keep it.
4. **Never invent a fact about them.** No history, acreage, prices, packages,
   awards, hunt results, reviews or quotes that aren't sourced. Every factual
   line on the page carries a visible link to where it came from. **If you can't
   source it, cut it — don't soften it.**
5. **Never fabricate a testimonial or a review.** There are none on the page and
   there should never be.
6. **Credit the films honestly.** They are "films I made for them" — Isaac's own
   work, delivered to the ranch. They are *not* the ranch's official videos and
   the page must not imply the ranch commissioned this page or endorsed it.

---

## What is on the page, and where each fact came from

`legendsranch.com`, `wildlifecentermi.org` and `michigan.org` are all **blocked
by this container's egress proxy** — `WebFetch` returns `EGRESS_BLOCKED` and no
session can read them directly from here. Every fact was therefore gathered by
**web search on 2026-08-17** and cross-checked across independent results before
being used. Each one links to its source on the page itself.

Facts used (all sourced, all linked in the page):

| Claim | Source |
|---|---|
| Bitely, MI · Newaygo County · Manistee National Forest · est. 1998 | legendsranch.com/about |
| ~2,000 acres of managed habitat | legendsranch.com/about · wildlifecentermi.org |
| Trophy whitetail, plus turkey and pheasant; Presidential Whitetail is the flagship; personal guide per hunter | legendsranch.com · legendsranch.com/hunts/presidential |
| Lodge ~6,000 sq ft · 8 private suites · dining hall + fireplace over a private lake · chef · pontoons, kayaks, hiking, supervised range | legendsranch.com lodge page |
| Purple Heart Hunt since 2003; sponsored, by invitation; Youth Challenge Hunt | legendsranch.com/the-hunts · Herald Review · SCI Foundation |
| Wildlife Center: separate 501(c)(3), est. 2018, 24,000 sq ft, 3,000+ mounts, largest private collection on the continent | wildlifecentermi.org · legendsranch.com/wildlife-center · Michigan Enjoyer |
| Free sponsored school tours · 15 curriculum stations · 1.1-mile nature trail | wildlifecentermi.org/our-programs · UpNorthLive |
| Founder Arthur Gutierrez, Sr., adult-onset hunter who started in his fifties | wildlifecentermi.org/about · Michigan Enjoyer |
| Taxidermy studio on site (The Studio at Legends Ranch) | legendsranch.com/studio · thestudioatlegendsranch.com |

Film metadata was verified **from the actual files**, not from a status
document: the MP4 containers were parsed for duration and dimensions —
`legends-ranch-anthem.mp4` is 64.06s at 1920×1080 with video and audio tracks,
`wildlife-center-film.mp4` is 52.05s at 1920×1080. (`ffprobe` is not installed
in this container; the bundled Playwright ffmpeg has no H.264 decoder.)

### What was deliberately left out, and why

These were considered and **cut**. Do not add them back without a real source.

- **"83% of guests return."** It is on screen in `LegendsAnthem.tsx` but appears
  on **no public source** found in any search. Off the page.
- **Arthur Gutierrez's quote** ("It's not just the trophy…") — also in the film,
  also unverifiable publicly. Off the page. Never put words in a real person's
  mouth.
- **Trophy scores** (200-inch / 300-inch class) — these come from their own
  marketing pages and were only reachable second-hand through a search summary.
  Not worth the risk of a wrong number.
- **How many veterans the Purple Heart Hunt takes each year** — sources
  disagreed (one said 5–8, another said nine). When sources disagree, say
  nothing.
- **Student and visitor counts** — framing varied between sources ("thousands of
  Michigan students" vs. "the neighboring six counties"). Cut the number, kept
  the fact that the tours are free.
- **Prices and package details.** None, anywhere.
- **Reviews and testimonials.** None, anywhere. Real ones exist on TripAdvisor;
  they are not ours to reprint and a fan page does not need them.
- **The ranch's phone number.** It is public, but a fan page reprinting a
  business's contact details starts to look like it is *being* the business —
  and a stale number is worse than no number. The page sends people to
  legendsranch.com instead.
- **The Wildlife Center's EIN and 990 finances.** They are in
  `../site-audit/WILDLIFE-CENTER-FUNDRAISING.md` and they are public, but a fan
  page is not the place to publish a nonprofit's balance sheet.
- **The 2026-07-24 website audit finding.** `../site-audit/REPORT.md` Finding 1
  is **stale** — Isaac looked at the live site on 2026-08-15 and did not see the
  defect. A fan page must never carry a client-facing bug report anyway.

---

## Design notes

Per `/DESIGN-DIRECTION.md`:

- **Apple restraint.** One idea per screen, system font stack, tight tracking on
  display type, generous line-height on body, real space between sections. No
  emoji, no centered everything, no accent bar on every card.
- **Closed palette, no rainbow.** A two-stop `#ff6b35 → #ff5787` ember→coral ramp
  on true black, used only on the eyebrow, the hero rule, the film numerals and
  one border. **No full-spectrum ramp anywhere** — no yellow-green band exists in
  this file, and none should be added.
- **Mobile first.** Verified with headless Chromium at **320px, 390px and
  834px** — no horizontal overflow at any of them. Isaac works from an iPad and
  an iPhone; a desktop-only layout is a failed layout.
- Single committed dark treatment, painted explicitly on `body` — the page never
  borrows a host background.

## How to re-verify after editing

There is no `ffprobe` and no image tooling in this container, so the check is
Chromium over CDP. `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` with
`--headless --no-sandbox`, an `Emulation.setDeviceMetricsOverride` at the target
width, then `Page.captureScreenshot` in viewport-height slices — and then
**actually look at the PNGs**. Check three things: the disclaimer is visible in
the first screen, `cssContentSize.width` never exceeds the viewport width, and
no unsourced claim has crept in.

## If it ever gets published

Right now this page is a **local file only**. It is not deployed anywhere, and
`.github/workflows/pages.yml` publishes `/site`, not this directory — so nothing
about it is live until someone deliberately makes it live.

Before it goes anywhere public:

1. **Move the films with it,** or repoint the two `<video src>` attributes. The
   relative paths break the moment the file leaves this folder. The MP4s are
   ~70MB and ~31MB, so a real host wants them on a CDN, not inline.
2. **Re-check every fact.** The page is stamped "facts checked 17 August 2026"
   for exactly this reason. A ranch changes its packages, its lodge, its site.
   Re-date the stamp or don't publish.
3. **Tell the ranch.** Not required, but it is the right thing and it is how a
   fan page becomes a relationship instead of a surprise. Isaac is already a
   vendor to them.

## If Legends Ranch ever wants it to be official

Then it stops being a fan page, and this file stops applying. That transition is
not an edit — it is a rebuild, and it needs, in order:

1. **Written authorization** from the ranch, naming who approved it and what
   they approved. This repo's standing rule: nothing publishes under a real
   business's name without their engagement.
2. **Their brand, supplied by them** — logo files, colors, fonts, approved
   photography. Not recreated, not approximated, not pulled off their site.
3. **The disclaimer removed and replaced** with a real ownership line, and the
   whole "what I left off" section replaced with facts they confirm and stand
   behind. Prices, packages and availability can only come from them.
4. **A new home.** Their domain or a subdomain they control, not a page in
   Isaac's personal monorepo.
5. **A signed scope for the films** — including the human narration read that
   the current text-to-speech scratch track is standing in for.

Until all five exist, it stays a fan page and every rule above stays in force.
