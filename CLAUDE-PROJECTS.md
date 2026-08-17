# The projects I cannot see

**Written 2026-08-17 because Isaac had to point at his own screen to prove they
existed.** He sent four screenshots of the claude.ai Projects list and said:

> *"I'm sitting here looking at fucking dozens of projects that haven't been
> touched in days weeks months. You haven't mentioned any of that shit so
> obviously you haven't found everything."*

He is right, and the reason is worth stating plainly rather than apologising for.

## The hard limit

**Claude Code has no tool that reads claude.ai Projects.** Not one. It can reach
Notion, Google Drive, Gmail, GitHub, Vercel, Slack, Airtable, Blotato and thirty
other services — and none of them is claude.ai. A Code session can list
**Artifacts** (40 of them, as of today) but Projects are a different surface with
no API behind it.

So every Project below is invisible to every Code session, permanently, until
its contents are copied somewhere a session can read. That is not a thing that
gets fixed by a better prompt or a longer sweep. **The only fix is moving the
content.**

This is the same failure `WORKSPACE-MAP.md` already named — *"It is not a memory
problem"* — in a second place nobody had looked.

## The inventory, read off the screenshots

23 visible on 2026-08-17 at 6:23–6:24 AM. The list scrolls past the bottom of
the last screenshot, so **this is a floor, not a total.**

| Project | Last touched | Anything in this repo? |
|---|---|---|
| Money Engine OS: AI-Automated Digital Product Funnels | last wk | partial — `kit-site/` |
| ? | 3w | — |
| Use Underdog Academy | 3w | **nothing** |
| Isaac Os 3 Brain System | 3w | **nothing** |
| The Private Office | 4w | name only |
| Ai And Social Ex Employees | 4w | **nothing** |
| Revenue Engine | last mo | **nothing** |
| Brand Factory | last mo | **nothing** |
| Isaac Headquarters - Operating Partner | last wk | partial — `THE-BOARD.md` |
| College Launch OS | last mo | yes — `college-launch-os/` |
| IMagin Travel Planner | 3w | **nothing** |
| The real | last mo | **nothing** |
| LifeHacks | last mo | **nothing** |
| Living/2ndbed | last mo | **nothing** |
| Cat203 | last mo | **nothing** |
| Scooter | last mo | **nothing** |
| Self improvement = life improvement = happiness and money | 3w | **nothing** |
| Closing gift | last mo | **nothing** |
| IM Global Financial Command | 3mo | **nothing** |
| Pompano Beach Concierge Demo | last wk | yes — ⚠️ the **closed** 611 listing |
| IMagin Concierge \| Pilot Client – Linda Hoyt | last wk | yes — `Listing-Content-System/` |
| Tyson Brand App referral business | last wk | yes — `shop-tyson/` |
| Scooter accident | 3mo | **nothing** |

Verified by grep against the whole tree on 2026-08-17: `Underdog`, `Brand
Factory`, `Revenue Engine`, `Travel Planner`, `LifeHacks`, `Cat203`, `Scooter`,
`Closing gift`, `Global Financial`, `3 Brain`, `Ex Employees` and
`Living/2ndbed` return **zero hits**. Not a stale reference — no reference.

**Seventeen of twenty-three have no footprint here at all.** Whatever thinking,
research or half-built work is inside them has never been visible to a single
Code session, including every session that produced a "state of everything"
file.

## Before anything gets copied over: sort it

Several of these are plainly not work — `Scooter accident`, `Cat203`,
`Living/2ndbed`, `Closing gift`. **This repo is public.** Health, legal,
financial-personal and family material goes to **Notion**, never here. Sort at
intake, per `CLAUDE.md`, not after it is already pushed.

Work projects get a one-page summary in this repo. Personal ones get a Notion
page and a line here saying only that they exist.

## The "custom AI app" — searched 2026-08-17, not found

Isaac: *"Claude Code built that custom AI app that I haven't even touched because
everyone says not to touch it, so that's probably where he lives."*

Every reachable system was checked. **It is not in any of them:**

| Searched | Result |
|---|---|
| GitHub — both repos, **all 36 branches** | No agent app, no MCP server, no `.claude/agents/`. The only non-Remotion skills are `market-read`, `room-read`, `show-it`. |
| `claude/autonomous-agent-setup-bprzw4` (best-named candidate) | It is a **Jest test suite** for College Launch OS. 9 files, 390 lines. Not an agent. |
| Vercel (connected account) | **Zero projects** — confirms the account mismatch already on record. |
| Replit | One app: *Wine Column Design*, Aug 11. |
| Notion | No page describes a custom AI app built by Claude Code. |
| Google Drive | Apps exist (below) — none is an AI agent. |

**The conclusion that matters:** a session does not live inside an app it built.
Nothing of a Claude session survives in its output — not its judgment, not its
manner, not its memory. What made the first Claude Code different was its
**instructions**, and instructions are text. That is why the teaching rule was
written into `CLAUDE.md` on 2026-08-17 rather than hunted for. **The recovery
route is to re-author the instructions, not to find the app.**

If a written copy of that first session's promise exists anywhere, the only
place left is a **claude.ai Project's custom instructions** — which is the
unreadable surface this whole file is about. Isaac is the only one who can open
it and paste it.

## Finished work sitting in Drive that no status file mentions

Found while searching for the app. Verified by reading the files, 2026-08-17.

| File | Created | What it actually is |
|---|---|---|
| `Tyson_Picks_App_Prototype_v2` (+2 copies) | Aug 6, copies Aug 9 | **A complete "Tyson's Pet Network" app** — South Florida rescue/pet-service hub. Featured $19 Kit, curated Picks with ratings, near-you listings, episode grid, live-offers section, a 30-day 3-3-3 progress tracker, bottom nav. Never launched, never referenced anywhere. |
| `linda-hoyt-luxury-app.html` | Jul 11 & 14 | A finished luxury real-estate site for Linda. 558 KB with photos embedded as base64. **Five identical copies** across four Drive folders. |
| `imagin_harbor_mom_app.html` | Jul 4 | 17 KB. Unexamined. |
| `app.html` | Jul 18 | 142 KB. Unexamined. |

The Tyson's Picks prototype matters most: the Amazon tag `tysonspicks-20` is
live and has earned **$1.29** because no storefront was ever built — and a built
storefront has been sitting in Drive since Aug 6.

## What a session should do with this file

1. **Do not claim a full picture without saying this surface was excluded.**
   Every "state of everything" artifact written before today was written blind
   to 17 projects. Say so.
2. **When Isaac names one, ask him to paste the contents** — that is the only
   transport there is. Then write it to a file in the same turn.
3. **Re-check the count.** This list is a floor read off a screenshot at one
   moment. It goes stale like anything else.

---

## Open: an unidentified app on the Mac dock

**Isaac, 2026-08-17:** *"That custom AI — which you said was a developer app —
was never there before Claude Code took over the fucking computer."*

Recorded as his statement, not as a verified finding, because **no Code session
can verify it.** `HANDOFF.md` already lists **Local Mac** as unreachable: the
container is a fresh clone in the cloud with no access to his filesystem, his
`/Applications`, or `~/.claude/projects/*.jsonl`. Any earlier session that
described that icon was guessing, and guessing about his own machine is the
exact failure `CLAUDE.md` forbids.

What the repo does hold: `SESSION-INDEX.md` dates "the night Claude Code took
over the computer" to **Jul 22–23**, and `HANDOFF.md` lists what that night
*built* — the $19 Kit, TysonScripts, the Southwest package, UGC templates, the
Amazon storefront guide. **Nothing in either file records an app being
installed.** That is an absence of evidence, not evidence of absence.

**Resolves the moment Isaac reads the name off the icon.** Until then it stays
open. Do not identify it from a photo.
