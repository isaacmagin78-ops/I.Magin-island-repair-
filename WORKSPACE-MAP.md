# Workspace map — every branch, and what is stranded on it

Generated 2026-08-15. **Read this before starting any work.**

## The problem this file exists to solve

`main` has **27 branches with unmerged commits and zero open pull requests.**
Nothing has been merged since Jul 27.

**Eleven separate branches have each rewritten `HANDOFF.md`.** Each session
verified the live state, wrote the truth into its own copy, and never merged.
So `main`'s `HANDOFF.md` sat frozen at Jul 29 while eleven newer, better
versions existed on branches nobody reads.

That is the mechanical reason this workspace "doesn't remember." It is not a
memory problem. It is a merge problem.

**Four separate branches created a root `CLAUDE.md`.** `main` has none — so the
file that is supposed to tell every session how to behave does not exist where
sessions look for it.

## Branches that have edited HANDOFF.md

Newest first. Each of these believed it was the authoritative record.

| Date | Branch | Note |
|---|---|---|
| Aug 15 | `claude/project-status-update-xbolj2` | Stripe audit: zero revenue on 22,900+ views |
| Aug 15 | `claude/optimize-repository-context-i7ulyu` | "Correct the Kit's revenue claim at both sources" |
| Aug 15 | `claude/consolidate-orphaned-assets` | Gathered 60 files / 8,892 lines of orphaned work |
| Aug 14 | `claude/handoff-origin-fix` | Corrected the project's origin date |
| Aug 13 | `claude/understand-current-situation-13c37d` | 317-line rewrite + `IKE-OS-HANDOFF-2026-08-13.md` |
| Aug 6 | `claude/new-session-5fi2ps` | Queue refill, monetization, **both link-page sources** |
| Aug 5 | `claude/uhnw-concierge-systems-anl09p` | "Warn future sessions about the clock and missing days" |
| Aug 5 | `claude/scott-ipad-dashboard-cett89` | Balcony Buddies reframe |
| Aug 3 | `claude/money-engine-instructions-6pknex` | Money-engine distribution |
| Aug 2 | `claude/clip-licensing-constraints-w43zf4` | Binding clip-licensing constraints |
| Jul 27 | `claude/previous-chat-context-8gar07` | Drive media-reachability rule |

## Work that exists but is not on main

| What | Where | Size |
|---|---|---|
| `link-pages/` — **source for `tysons-links` and `tysons-time-hub`** | `claude/new-session-5fi2ps`, `claude/consolidate-orphaned-assets` | 2 pages |
| `tyson-video-engine/` — a second video engine | `claude/consolidate-orphaned-assets`, `claude/remotion-engine-resume-1zna7u` | ~8,900 lines |
| `amazon/KDP-LISTING-COPY.md` — Amazon KDP listing | `claude/new-session-5fi2ps` | 171 lines |
| Root `CLAUDE.md` — session operating rules | 4 branches, none merged | — |
| `IKE-OS-HANDOFF-2026-08-13.md` | `claude/understand-current-situation-13c37d` | 125 lines |
| `concierge-systems/`, `shop-tyson/`, `balcony-buddies/`, `tyson-and-the-kitten/`, `imagin-concierge/`, `money-engine/` | various | — |
| `CLIP-LICENSING.md` — binding licensing constraints | `claude/clip-licensing-constraints-w43zf4` | — |
| `ASSET-INVENTORY.md` | `claude/consolidate-orphaned-assets` | — |

**Correction to an earlier claim:** a prior session (including this one, at
first) recorded that `tysons-links` and `tysons-time-hub` had "no source
anywhere." That was wrong. The source exists at `link-pages/` on
`claude/new-session-5fi2ps`. It is simply not on `main`.

## Full branch list

| Date | Ahead | Branch | Touches |
|---|---|---|---|
| Aug 15 | 2 | `claude/project-status-update-xbolj2` | HANDOFF, README |
| Aug 15 | 1 | `claude/optimize-repository-context-i7ulyu` | HANDOFF, money-engine |
| Aug 15 | 1 | `claude/consolidate-orphaned-assets` | 60 files across 9 folders |
| Aug 14 | 1 | `claude/handoff-origin-fix` | HANDOFF |
| Aug 13 | 5 | `claude/understand-current-situation-13c37d` | HANDOFF, IKE-OS, README |
| Aug 7 | 1 | `claude/claude-md-docs-4usf84` | CLAUDE.md |
| Aug 6 | 4 | `claude/new-session-5fi2ps` | HANDOFF, amazon, link-pages |
| Aug 5 | 7 | `claude/uhnw-concierge-systems-anl09p` | CLAUDE, HANDOFF, README, concierge-systems |
| Aug 5 | 3 | `claude/scott-ipad-dashboard-cett89` | HANDOFF, balcony-buddies |
| Aug 5 | 1 | `claude/miss-t-tyson-meme-lsj43p` | isaac-video-engine |
| Aug 3 | 3 | `claude/money-engine-instructions-6pknex` | HANDOFF, README, money-engine |
| Aug 2 | 1 | `claude/clip-licensing-constraints-w43zf4` | CLIP-LICENSING, HANDOFF |
| Jul 31 | 2 | `claude/github-inventory-status-1mm8qa` | kit-site |
| Jul 31 | 12 | `claude/positively-negbaum-book-w0qgpx` | PROJECT-BRIEF, imagin-concierge, shop-tyson, tyson-and-the-kitten |
| Jul 30 | 2 | `claude/sea-monarch-sales-script-fd28zd` | Isaac-Video-Engine |
| Jul 30 | 1 | `export/send-off` | standalone export |
| Jul 30 | 1 | `export/madison-moves` | standalone export |
| Jul 30 | 1 | `export/isaac-video-engine` | standalone export |
| Jul 27 | 7 | `claude/previous-chat-context-8gar07` | CLAUDE, HANDOFF |
| Jul 27 | 14 | `claude/luxury-listing-content-system-gbptg5` | Listing-Content-System, Isaac-Video-Engine |
| Jul 24 | 3 | `claude/tyson-gear-page-d15ud7` | README, app |
| Jul 21 | 15 | `claude/fable-video-prompt-refine-b21x3t` | Isaac-Video-Engine, kit-site |
| Jul 20 | 1 | `claude/college-launch-os-tcdpg3` | app |
| Jul 15 | 4 | `claude/madison-moves-production-xfljqf` | app, README |
| Jul 14 | 9 | `claude/remotion-engine-resume-1zna7u` | tyson-video-engine |
| Jul 14 | 1 | `claude/autonomous-agent-setup-bprzw4` | app, jest |
| Jul 13 | 1 | `claude/claude-md-docs-if24f6` | CLAUDE.md |

## Note on casing

Some branches use `Isaac-Video-Engine/` and others `isaac-video-engine/`, and
there is both `isaac-video-engine/` and `tyson-video-engine/`. Any consolidation
has to resolve this or it will produce duplicate trees on case-insensitive
filesystems (macOS).

## The fix

One merge pass into `main` that produces:

1. **One `HANDOFF.md`** — reconciled from all eleven versions, newest facts winning.
2. **One root `CLAUDE.md`** — so every future session has operating rules where
   it actually looks.
3. **The orphaned assets brought across** — `link-pages/`, `amazon/`, the
   licensing and inventory docs at minimum.
4. **Dead branches deleted** — so the next session sees a workspace, not a maze.

Until that happens, every new session will keep reading a stale `main`, redoing
work that already exists on a branch, and adding a twelfth version of the truth.
