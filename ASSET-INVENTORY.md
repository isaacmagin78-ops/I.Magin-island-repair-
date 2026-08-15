# Asset Inventory — everything, in one tree

**Built 2026-08-15.** This branch gathers work that existed only on unmerged branches
and was effectively invisible. Nothing was deleted or overwritten; every directory below
is additive on top of `main`.

## Why this exists

`SESSION-INDEX.md` mapped sessions to **branch names**. Branch names lie. The branch
called `optimize-repository-context-i7ulyu` contained the entire live business —
`kit-site/`, `money-engine/`, and `HANDOFF.md`. Nobody could have found that by reading
the name, and for six weeks nobody did.

**An index of names is not an index.** This file lists what is actually inside things.

---

## ⭐ Recovered here — was on a branch nobody would have opened

### `tyson-and-the-kitten/` — the book, finished
*Was on `claude/positively-negbaum-book-w0qgpx`, a branch named for the superseded draft.*

**This is Book #1.** Tyson (Isaac's rescue pit bull), Miss (the kitten), and Walker (the
old dog who teaches him). Isaac described it repeatedly as "the Tyson and cat story"; a
July session logged that phrase as a voice-to-text error and substituted an unrelated
manatee manuscript. **Isaac was accurate every time.**

| File | What it is |
|---|---|
| `tyson-and-the-kitten-manuscript.md` | Master manuscript + illustration guide |
| `tyson-and-the-kitten-book-dummy.pdf` | Print-ready 8.5×8.5 book dummy |
| `tyson-book-dummy.html` | Source for the dummy |
| `tyson-storyboard-grid.html` | Storyboard grid |
| `tyson-funder-packet.html` / `tysons-time-founder-packet.pdf` | Funder-facing packet |
| `brand-strategy.md` | IP repositioning strategy — book → character universe |
| `BRAND-STRATEGY-REALITY-CHECK.md` | The strategy graded against verified account data |
| `rewritten-captions-aug1-3.md` | Story-first caption rewrites for a real posting queue |

**The reality-check file independently found the same thing this session did** — Stripe
lifetime revenue **$0.00** — on **July 31, two weeks earlier**. It also records the most
useful audience finding in the repo: *"The kitten is the breakout star — the top three
posts by views all feature Miss."*

The strategy's own thesis: *"Tyson is not a book character. Tyson is a media property
that includes a book."*

### `shop-tyson/` — storefront
*Same branch.* `index.html` + `vercel.json`. Deployable.

### `amazon/` and `link-pages/`
*Was on `claude/new-session-5fi2ps`.* The Amazon affiliate work and the link pages —
directly relevant to the open affiliate gap (one link ever created; 33 YouTube videos
carrying no tagged links).

### `concierge-systems/` — working software
*Was on `claude/uhnw-concierge-systems-anl09p`.*

`concierge_tools.py` reads a CSV and derives a next action per row. Stdlib only, no
network, no API keys. It reads and prints and never writes back, so the operator stays
the editor. Ships with `collection-inventory.csv`, `renovation-dashboard.csv`
(**Island Club PH3** and **Boca 503**), and `PRODUCT-PILOT.md` — a sellable offer with a
30-day pilot.

**Its architecture is the right shape for the multi-family DSCR screen** — `next_action()`
is derived rather than stored, so changing an input changes the recommendation. Swapping
the schema from art to buildings and the triage rules from provenance to DSCR / insurance /
flood zone is a schema change, not a build.

Its design notes also contain the clearest example in the whole system of Isaac's judgment
encoded in code:

> *"`emotional_tag` is checked first in the triage logic, so anything marked
> `Keep — do not sell` returns an insurance action and never a sale action… That is what
> keeps a monetization pass from turning into a family argument."*

### `balcony-buddies/`
*Was on `claude/scott-ipad-dashboard-cett89`.*

### `tyson-video-engine/`
*Was on `claude/remotion-engine-resume-1zna7u`.* An earlier engine layout, superseded by
`isaac-video-engine/` on `main`. Kept for reference — **verify before reusing.**

### `CLIP-LICENSING.md` and `IKE-OS-HANDOFF-2026-08-13.md`
*From `clip-licensing-constraints-w43zf4` and `understand-current-situation-13c37d`.*

### `PROJECT-BRIEF.md`, `imagin-concierge/REFERRAL-MESSAGE.md`
*From the book branch.*

---

## Already on `main` — not orphaned

`HANDOFF.md` (memory of record) · `kit-site/` (the $19 storefront) · `money-engine/` ·
`Listing-Content-System/` · `legends-ranch/` (both finished films + site audit) ·
`isaac-video-engine/` · `college-launch-os/` · `madison-moves/` ·
`START-HERE-LINDA-PITCH.md` · `TEST-COVERAGE-ANALYSIS.md`

## Superseded — old structure, not lost work

Branches showing a root-level `app/`, `Isaac-Video-Engine/` (capitalised), or
`next.config.js` at root predate the **2026-07-27 reorganisation** into four project
folders. They are old layouts of work that now lives on `main`, not separate assets.

Affected: `autonomous-agent-setup`, `claude-md-docs-if24f6`, `college-launch-os-tcdpg3`,
`fable-video-prompt-refine`, `luxury-listing-content-system`, `madison-moves-production`,
`previous-chat-context`, `remotion-video-engine-*`, `sea-monarch-sales-script`,
`tyson-gear-page`, `legends-ranch-repositioning`, `export/*`.

**Before assuming any of these is dead, diff it** — a few carry one unique file each.

---

## Also live, in the other repo — `-imagin-concierge`

| Path | Branch |
|---|---|
| `projects/open-house-2756-ne-35th/` | `claude/mobile-open-house-poc-y70dtp` |
| `projects/concierge-site/` + samples | `claude/qr-code-gate-map-5sbszh` |
| `projects/investor-brief/` (research prompt + SpaceX 2026 brief) | `claude/qr-code-gate-map-5sbszh` |
| `projects/template-pack-firstgen-financial/` | `claude/macbook-pro-setup-oqe3tm` |
| `projects/outdoors-content/` | `claude/isaac-workspace-charter-htet5g` |
| `projects/multifamily-acquisition/` | `claude/isaac-workspace-charter-htet5g` |
| `SESSION-INDEX.md`, corrected `CLAUDE.md` | `claude/isaac-workspace-charter-htet5g` |

## Not reachable from Code at all

Dispatch · Cowork (5 open tasks dated Aug 6) · Chats · local Mac transcripts ·
**iCloud mail** — Amazon correspondence routes there, not to Gmail, which is why Gmail
sweeps for Associates mail return nothing.

---

## Rule going forward

A branch name is not a description. **When work matters, it goes on `main` or into
`HANDOFF.md` — not into a branch named after the task that happened to create it.**
