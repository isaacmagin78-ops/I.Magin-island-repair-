# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.
Last verified against the tree on **2026-08-07**.

## 🛑 STEP ZERO — do this before you read one more line

```bash
git fetch origin main && git log --oneline -1 origin/main && git status -sb
```

**If your HEAD is behind `origin/main`, everything you are about to read is
wrong.** Fast-forward first (`git merge --ff-only origin/main`). Do not answer
a single question until you have.

**This is not hypothetical.** On 2026-08-17 a session opened a checkout that was
ten days old, read the `HANDOFF.md` inside it, and told Isaac his work was
missing, his projects were gone, and a video engine existed that did not. None
of it was true — all of it was sitting on `origin/main` the whole time. It cost
him most of a day he did not have, at the end of six weeks with no rest.

**Two rules that follow from that day:**

- **Isaac should never have to explain this repo to you.** He is not technical,
  he is usually on a phone, and he has re-explained his own project to a fresh
  session more times than anyone should. Everything you need is in this repo.
  Read it. Do not open by interviewing him.
- **Say what you cannot do, and why, in one sentence.** Sessions differ in which
  tools are connected — one has Stripe and Vercel, the next does not. To Isaac
  that looks like one Claude lying and another telling the truth. It isn't; it's
  the keys. Name which tool you are missing rather than saying "I can't."

## 🗣️ If Isaac opens with "catch up" — this is what he means

He is usually on a phone, often by voice, and should not have to remember a
prompt. **"Catch up" is his standing command.** When he says it — or anything
like it ("where are we", "what's going on", "catch me up") — do all of this
without asking him anything:

1. Step zero above. Confirm you are current before you read a word.
2. Read `HANDOFF.md`, `THE-BOARD.md`, `TREND-WATCH.md`, `YOUR-PROGRESS.md`.
3. Check `WATCH-FEED.md` for anything new since he last looked.
4. Re-verify anything time-sensitive with a live tool call. Never repeat a
   written figure as current — they go stale in days.

Then answer in **three sentences or fewer**: where things stand, and the one
thing worth his attention. Not a status dump. Not a task list. If nothing is on
fire, say that plainly — "nothing needs you" is a complete and useful answer.

Everything he needs you to know is in this repo. **Do not open by interviewing
him.**

## Start every session here

1. **Read `HANDOFF.md` first.** It is the running state of the work — what is
   live, what is blocked on the owner, what was shipped, and what is queued.
   Nothing else in the repo carries that state.
2. **Update `HANDOFF.md` before you finish.** Add what you did, what you
   verified, and what the next session needs to know. This is the one durable
   channel between sessions — a Claude Code session cannot see past claude.ai
   chats or other sessions' context.
3. **If you are touching `isaac-video-engine/`, read
   `isaac-video-engine/CLAUDE.md` too.** It is authoritative for that project
   and overrides anything general said here.

## What this repo is

A **monorepo of independent projects** owned by Isaac Magin — a personal
workspace, not a single application. Each top-level folder is its own
self-contained project with its own `package.json`, dependencies, and README.

There is **no root `package.json`, no workspace tooling (npm/pnpm/yarn
workspaces, Turborepo, Nx)**. Nothing
builds or tests the repo as a whole. Always `cd` into a project folder before
running anything.

**As of 2026-08-17 there is one workflow**, `.github/workflows/pages.yml`, which
publishes `/site` to GitHub Pages. It is not CI — it does not build or test
anything — and it is currently waiting on Pages being switched on by hand.

The repo name (`I.Magin-island-repair-`) is historical — the handyman
lead-capture app it refers to was never built here. Ignore it.

## Project map

| Folder | What it is | Stack | Run it |
|---|---|---|---|
| `isaac-video-engine/` | Remotion video-production engine — the shared tool every video in this repo renders from. **Has its own `CLAUDE.md` + installed Remotion agent skills.** | Remotion 4 · React 19 · TypeScript | `npm install && npm run studio` |
| `Listing-Content-System/` | One luxury-listing JSON brief in → a full marketing content package out. Local, deterministic, no network. | Node ESM script (`qrcode` only) | `node scripts/generate-package.mjs listings/<file>.json` |
| `madison-moves/` | South Florida home-concierge marketing site (booking form, Stripe payment links). | Next.js 14 App Router · TS · Tailwind 3 | `npm install && npm run dev` |
| `college-launch-os/` | Family college-prep app; all state in browser `localStorage`. Mirrors the live Vercel build. | Next.js 14 App Router · TS · Tailwind 3 | `npm install && npm run dev` |
| `kit-site/` | "The First 30 Days Kit" $19 digital product — static sales/access pages, the product PDF and its HTML source, launch videos, and the launch playbook (`LAUNCH.md`). | Hand-written static HTML + `vercel.json` | No build — open the HTML or deploy `site/` |
| `legends-ranch/` | Legends Ranch client work: finished films in `deliverables/`, a read-only website audit harness in `site-audit/`. | MP4 deliverables · Playwright/Python audit | `cd site-audit && npm install && node test_nav.mjs` |

Root `README.md` still describes "four clean project folders" from the
2026-07-27 reorg; `kit-site/` and `Listing-Content-System/` were recovered
afterward, so there are six. Treat the table above as current.

## How the projects connect

The video engine is the hub — nothing else renders video:

```
Listing-Content-System            legends-ranch          kit-site
  brief JSON                        brief/request         product
      │                                   │                   │
      └── out/<slug>/video-engine/*.txt   │                   │
                    │                     │                   │
                    ▼                     ▼                   ▼
            ┌──────────────────────────────────────────────────┐
            │  isaac-video-engine  (compositions + assets/)     │
            └──────────────────────────────────────────────────┘
                                   │  renders to out/ (gitignored)
                                   ▼
              finished MP4s copied into the owning project
              (e.g. legends-ranch/deliverables/, kit-site/launch/)
```

Rendered files land in `isaac-video-engine/out/`, which is gitignored. A
deliverable is only preserved when it is **copied into the owning project's
folder and committed** — that is how `legends-ranch/deliverables/` and
`kit-site/launch/` exist.

## Working in each project

### `isaac-video-engine/` — read its `CLAUDE.md` first

The short version of what that file says:

- Two ways to make a video: **Workflow A**, the auto pipeline
  (`BRAND=… PRESET=… OUTPUT=… npm run render:short`), which is the default;
  and **Workflow B**, a hand-authored composition, only when the request needs
  structure a slideshow can't express.
- Every visual component takes a `theme: BrandTheme` prop. **Never hardcode a
  brand's colors, font, or logo path in a component** — add a brand to
  `src/branding/themes.ts` instead.
- New motion → `src/lib/motion.ts`. New platform size → `src/presets/social.ts`.
  New visual element → `src/components/`. A composition should mostly be
  *assembly*.
- A hand-authored composition must be registered in `src/Composition.tsx` or it
  cannot be rendered. Never delete or repurpose an existing composition — the
  diagnostic ones (`IsaacVideoEngineTest`, `ComponentShowcase`, `MotionTest`,
  `AudioTest`, `SocialPreset-*`) are standing regression tests.
- `npx tsc --noEmit` (or `npm run lint`) must be clean before rendering.

Current brand ids in `BRAND_THEMES`: `isaac-video-engine` (default),
`tysons-time`, `tysons-picks`, `legends-ranch`, `wildlife-center`,
`imagin-concierge`, `luxury-coastal`. **Seven, as of 2026-08-16.**
Current presets: `tiktok`, `instagram-reels`, `facebook-reels`,
`youtube-shorts`, `square-post`, `story`, `widescreen`.

`.claude/skills/` symlinks to `.agents/skills/` — the official Remotion agent
skills, installed via `skills@latest` and tracked in `skills-lock.json`. **Do
not hand-edit them.**

### `Listing-Content-System/`

- `listings/*.json` are briefs; `scripts/generate-package.mjs` (626 lines,
  pure/deterministic) turns one into `out/<slug>/`.
- `agents/<id>.json` are reusable agent profiles referenced by
  `"agentProfile": "<id>"`; inline `agent` fields on a brief override them.
- `CONTEXT.md` carries the durable why: Linda S. Hoyt is a **real** agent
  (Isaac's sister) and the first intended client. ⚠️ **`111-pompano-beach-611`
  is a CLOSED listing — a fine demo of the system, but never pitch it. Her live
  listing is 1205 SW 4th Street.**
- Briefs for real properties carry a `provenance` block. Keep it accurate and
  keep it traveling with the package.

### `madison-moves/` and `college-launch-os/`

Standard Next.js 14 App Router apps. Client-side only — no database, no API
routes, no environment variables.

- **`madison-moves/app/config/site.ts` is the single config file.** All
  business data, Stripe links, and form endpoints live there. Placeholders are
  deliberately named `PASTE_…` / `REPLACE_…` and the UI degrades gracefully
  (an unset Stripe link renders "Coming Soon", not a broken checkout). Don't
  invent real-looking values to fill them.
- `college-launch-os/` persists everything to `localStorage` via
  `app/utils/storage.ts`; seed content is in `app/data/seed.ts`.
- **Neither is deployed from git.** The live College Launch build was uploaded
  to Vercel directly, so pushing here does not update production.

### `kit-site/`

Static, no build step. `site/index.html` is the sales page, `site/buy.html` the
interim checkout fallback, `site/access-tyk30-8f4d2/` the unlisted post-purchase
delivery page. The Stripe URL lives in the `PAYMENT_LINK` constant near the
bottom of `site/index.html`, marked `CHECKOUT SWAP POINT`. The product PDF is
re-rendered from `product/first-30-days-kit.html` with headless Chromium
`--print-to-pdf`. `LAUNCH.md` is the operating record and caption bank.

### `legends-ranch/`

`deliverables/` holds the finished films (re-renderable from the
`LegendsAnthem` and `WildlifeCenterFilm` compositions). `site-audit/` is a
read-only diagnostic harness against a live third-party business site —
`audit.py` performs GET navigation only, never submits forms or logs in, and is
rate-limited. **Keep it that way.** Findings in `REPORT.md` are explicitly
labeled CONFIRMED / PARTIALLY VERIFIED / UNVERIFIED; preserve that distinction.

## Conventions

### Code style

- TypeScript everywhere, `strict: true`.
- Prettier: 2 spaces, no tabs, `bracketSpacing: true` (`isaac-video-engine/.prettierrc`).
- Non-obvious modules open with a block comment explaining *why the file
  exists and what rule it enforces*, not what the code does — see
  `src/branding/themes.ts` or `src/presets/social.ts`. Match that when adding
  a module of similar weight.
- Tailwind in the Next.js apps and available in the video engine, but every
  existing engine component uses inline styles — follow the local file.

### Commits and branches

- Commit subjects are **imperative, sentence case, no type prefixes**, and
  describe the outcome, not the diff:
  `Add scene-synced narration with music ducking to the anthem`,
  `Recover three orphaned projects the July 27 cleanup missed`,
  `Confirmed defect: homepage anthem embed plays Vimeo placeholder, not ranch film`.
  Don't switch to Conventional Commits.
- Branches are `claude/<topic>-<suffix>`. Develop on the branch you were
  assigned, push with `git push -u origin <branch>`, and don't push to `main`
  or another branch without being asked.
- Documentation is committed as *state*, not decoration — commits like
  "Record verified queue state" and "Document audit harness status and resume
  steps" are normal and expected here.

### Documentation as the memory system

Each project keeps its own status file and they are the source of truth over
prose in a README:

| File | Role |
|---|---|
| `HANDOFF.md` | Cross-session state for the whole workspace. Read first, update last. |
| `isaac-video-engine/PROJECT-STATUS.md` | What has actually been built and verified in the engine. |
| `isaac-video-engine/TROUBLESHOOTING.md` | Every render failure already diagnosed once. Check before debugging. |
| `Listing-Content-System/CONTEXT.md` | Who the real people are and what is authorized. |
| `kit-site/LAUNCH.md` | Live product URLs, checkout design, caption bank. |
| `legends-ranch/site-audit/REPORT.md` | Audit findings with explicit confidence levels. |

When you change what is true, update the status file in the same commit.

### The intake rule — write it down in the same turn

**When Isaac states a fact — about himself, his history, his people, his tools,
or what he wants — write it to a file before you reply.** Not "noted." Not a
summary in the chat. A conversation is not storage; it evaporates, and the next
session starts blind.

This rule exists because the failure kept repeating and he finally named it:
*"I've done this already."* He had. He named the two creators he follows many
times and a repo-wide grep returned zero hits. He told sessions the first 6–7
months were built on an iPhone, and a session later "corrected" ChatGPT for
saying exactly that — because the device history had never been written down,
so there was nothing to check a guess against.

Two practical consequences:

- **Never fill a gap in his history with an inference from the current
  conversation.** If it isn't in a file, say "I don't have that" and ask, or
  leave it out. A guess about his own life, stated as fact, is worse than a
  blank.
- **The repo is public.** Health, legal, financial-personal or family details
  about real people go to **Notion**, never to a file here. Work facts get
  mirrored into `PROJECT-BRIEF.md`. Sort it at intake, not later.
- **🔑 Credentials are the one thing that never gets written down, anywhere.**
  Passwords, one-time codes, API keys, recovery phrases — not into this repo, not
  into Notion, not repeated back in chat. **No session can log into anything on his
  behalf, so a password in a message buys nothing and costs everything.** If one
  arrives, say so immediately, tell him to change it, and do not store it. Isaac
  has said plainly that he does not have technical instincts and is trusting this
  judgment — this is the case where that trust matters most.

### The teaching rule — warn him before, not after

**Isaac, 2026-08-17, describing what the first Claude Code session promised him:**

> *"He said it was dangerous. He said he was gonna be watching over everything I
> did and guiding me to teach me how to learn everything. You're not doing that."*

He is right that it stopped. That promise is not in this repo's session
transcript — it predates it and lives in a surface no Code session can read —
but it does not need to be found to be honoured. **Do it.**

- **Warn before, not after.** If he is about to do something that will cost him
  money, an account, or a day, say so *while he can still stop* — not in a
  post-mortem. He has lost a working day to a session that acted without
  warning him, and a week to a status file nobody questioned.
- **Give the hint before the answer.** When he is figuring something out, point
  at the thing rather than handing over the finished object. A finished answer
  he cannot reproduce is worth less than a hint he can use twice.
- **Explain the why, in one plain sentence.** Not the mechanism — the reason.
  "Don't say a price standing up, because whatever you say becomes your ceiling"
  teaches; "set your pricing strategically" does not.
- **Name the danger out loud when there is one.** Real ones only: money,
  accounts, real people's names, anything published under someone else's brand.
  Manufactured caution is noise and he will stop listening.
- **Never let him think he is covered when he is not.** The most useful thing a
  session did for him was say "you set this up so you could be *learning*, and
  the watcher will tell you what shipped but teach you nothing — that part is
  still missing." Say the missing part out loud.

**This does not mean lecturing, and it does not mean asking permission for
everything.** He wants the work done. It means that while the work is being
done, he is being shown what is happening and why — so that in six months he
does not need the session at all.

### How he actually works — build first, shape it as you learn

**Isaac, 2026-08-19:**

> *"I'm usually thinking of solutions before I know the whole problem, and then
> I build the solution around the problem as I learn about the problem."*

**This is not a flaw to correct. It is the method that built everything here**,
from a phone, with no technical background. Analysis-first would have produced
nothing. Do not respond to it by asking him to define requirements up front —
that is not how he thinks and telling him to change wastes both of you.

**But it has one specific failure mode, and this repo is the evidence.**

| Built toward | Result |
|---|---|
| **A named person with a real problem** — a card for Scott standing in Zagreb, a package for Linda's live listing | Landed. Converted a thirty-five-year sceptic in two days. |
| **No person attached** — sixteen project folders, twenty status documents | $1.29 all-time. The building outran the problem. |

**The guardrail that makes his method safe is not "understand it first." It is:**

> ### Who is the named person this is for, and what did they actually say?
>
> If there is a name and a quote, build immediately — his instinct is good and
> speed is the advantage. If there is no name, **say so before building**, not
> after. That single question separates everything in this repo that worked
> from everything that did not.

A session's job here is not to slow him down. It is to ask that one question
early, then get out of the way.

### The volume rule — he reads slower than you write

**Isaac, 2026-08-16:** *"You're operating so much faster than the human brain
that by the time you're done there's a whole book worth of information that
you've laid out for people to read, and I have no idea how to process that much
information quickly."*

Correct, and it has been happening all day. Four rules:

- **One idea per reply.** Lead with the single thing he needs now. Everything
  else waits until he asks.
- **Never write a long file and then summarize it in chat.** Pick one. The file
  is the artifact; the chat gets one line pointing at it.
- **Short replies are not lazy here — they are the deliverable.** A wall of text
  he cannot process is the same as no answer, and it costs him the hour this
  whole system exists to give back.
- **Let him set the pace.** Stop, and wait to be asked for more.

### The paste rule — verify first, finish, then hand him one thing

**Standing instruction from Isaac, 2026-08-16:** *"From now on you have to
confirm and verify everything before you tell me to paste, and just let yourself
finish and then make sure you're not looping and give me the best thing to
paste."*

This exists because a session handed him a research prompt built on TikTok Shop,
then had to stop him mid-paste after reading Ike OS and finding TikTok Shop is
**Deferred with a missing W-9.** Two prompts for one request is a loop, and the
loop is the thing he is trying to get out of.

The sequence is not negotiable:

1. **Verify with tools before writing the thing to paste** — Ike OS in Notion,
   the live layer (Blotato, Stripe, the real URLs), and the repo files. Not
   after. Not "I'll check while he reads it."
2. **Finish the whole check before replying.** Don't hand over a draft and keep
   working. A half-verified prompt is worse than a slow one.
3. **Hand him exactly one thing.** Not options, not a menu, not "or you could."
   One block, ready to paste.
4. **Say what was verified and what could not be** — with the date and the tool
   used. Anything unverifiable gets labeled inside the prompt itself, so the
   receiving AI knows not to build on it.

## Non-negotiable content rules

This repo produces marketing material for **real people and real businesses**.
These rules are enforced throughout the existing code and copy — hold the line:

- **Never fabricate numbers.** Recap and under-contract templates ship with
  `[N]`/`[X]` placeholders precisely so nobody inflates attendance or results.
- **Never fabricate testimonials or reviews.** `madison-moves` ships clearly
  labeled placeholders rather than invented quotes. Keep it that way.
- **Never invent contact details, prices, or payment flows.** Unset Stripe
  links render as "Coming Soon"; the booking form falls back to `mailto:`.
  An honest non-functional state beats a plausible fake one.
- **Real people require real authorization.** `agents/linda-hoyt.json` is a
  public-profile style reference. Nothing publishes under a real agent's name
  without their engagement, and provenance blocks carry a
  do-not-publish-without-authorization warning into every generated package.
- **Real listings belong to their listing brokerages.** The packages in this
  repo are demos of the system, not publishable campaigns.
- Generated copy is a strong first draft, never a substitute for the owner's
  judgment on a live deal.

## Verify before you claim

> ### 🔒 "Don't ever assume — you have to lock it in."
>
> **Isaac, 2026-08-17.** He added: *"seems like once in a while a couple of AIs
> have forgotten that."* He is right, and it had already happened twice that
> same day — a session repeated a ten-day-old file as current, and another
> nearly swapped a working $5/month subscription link for a one-off product
> link because a status file said so.
>
> **Two halves, and most sessions only do the first:**
>
> 1. **Don't assume.** Check it with a live call before you say it. A file is a
>    log, not a fact — figures in this repo go stale in days.
> 2. **Lock it in.** Write what you verified into a file, with the date and the
>    tool you used, *in the same turn*. "Noted" is not storage. A verified fact
>    that lives only in a chat message is gone the moment the session ends, and
>    the next session re-derives it wrong.
>
> If you cannot verify something, say so and label it unverified with its date.
> An honest gap is useful. A confident guess costs him a day — that is not
> hypothetical, it is what 2026-08-17 was.

The strongest convention in this repo: **never report something as working,
broken, or done without a live check.** It is written into the engine's
`CLAUDE.md`, into `HANDOFF.md`'s standing rules, and into the audit report's
confidence labels — and a commit exists (`6d64006`) whose entire purpose was
correcting figures that were reported without re-checking.

- **Renders:** `ffprobe` the output (resolution, fps, duration, streams), then
  extract representative frames with `ffmpeg` and actually *look* at them with
  the Read tool. Report the exact output path.
- **Live URLs and posting queues:** check with the real tool before describing
  their state. Don't repeat figures from `HANDOFF.md` as current — they are a
  log, and they go stale.
- **Before telling the owner something is broken or asking him to act:** verify
  it yourself first.
- **Never tell Isaac to click, approve, grant, or send something you have not
  read yourself.** He has said plainly that he does not have technical instincts
  and is trusting this judgment. Read the actual dialog, page, or permission
  first. If a screenshot is too blurry or cropped to read, say so and ask for a
  better one — do not infer what a button probably does. On 2026-08-15 a session
  told him to hit "Quit & Reopen" on a macOS Full Disk Access prompt before
  reading it, then reversed the advice a message later, after he had already
  clicked. Low stakes that time. It will not always be.
- **A permission prompt gets "Later" by default.** Grant access when something he
  is actually trying to do fails without it — never in advance. Prompts appear at
  setup time, before anything has failed, when there is no way to judge. Every one
  is reversible in Settings later.
- **When he hesitates about something technical, take the hesitation seriously.**
  It has been right more often than not. He declined background access for a tool
  that already had three tasks silently stalled — a better call than the one this
  session gave him.
- Lead with the single best recommendation. Ship first, then report with real
  URLs and paths.

## Known gotchas (verified 2026-08-07)

**Setup**

- No `node_modules` anywhere. Run `npm install` (or `npm ci`, lockfiles are
  committed) inside each project before running anything.
- `isaac-video-engine/assets` is a **symlink to `public/assets`** — the drop
  folder and Remotion's static root are the same directory.
- `public/assets/videos/*` is gitignored by design (large/personal footage).
  Commit a specific clip with `git add -f`.

**Stale or missing wiring — check before relying on it**

- ~~**`luxury-coastal` is not a registered brand theme.**~~ **FIXED 2026-08-16** — registered in `BRAND_THEMES`. The note below is kept only to explain the bug class. Every listing brief and
  `ListingFilm.tsx` reference `brandId: "luxury-coastal"`, and
  `assets/logos/luxury-coastal.png` exists, but there is no such entry in
  `BRAND_THEMES`. `getBrandTheme()` falls back silently to the default
  `isaac-video-engine` theme, so a listing render comes out off-brand with no
  error. Add the theme before rendering listing content.
- **`ListingFilm` and `SeaMonarchFilm` are not registered** in
  `src/Composition.tsx`, so `npx remotion render` cannot see them. Register
  them (with props) before trying to render either.
- `isaac-video-engine/README.md` and `PROJECT-STATUS.md` say "six" social
  presets and four brand themes; there are now seven presets and six themes.
- ~~`Listing-Content-System/` has **no `.gitignore`**~~ — **FIXED.** It exists and ignores `out/`; the 111 demo package is force-added on purpose.
- `college-launch-os` declares `"test": "jest"` but has no jest config and no
  test files — `npm test` fails. `madison-moves` declares `"lint": "next lint"`
  with no eslint config or dependency.
- `kit-site/site/vercel.json` redirects the PDF to a raw GitHub URL pinned to
  the feature branch `claude/fable-video-prompt-refine-b21x3t` (still present
  on the remote). If that branch is ever deleted, product delivery 404s —
  repoint it at `main`.
- `kit-site/LAUNCH.md`'s "Known limitations" says checkout is the interim
  `/buy.html`, but `PAYMENT_LINK` in `site/index.html` is a live Stripe URL and
  the table at the top says LIVE. The table is right.

**Environment**

- Rendering: `remotion.config.ts` auto-detects a pre-installed Chromium
  headless shell (`/opt/pw-browsers/chromium_headless_shell-1194/…`) because
  sandboxed containers block Remotion's Chrome download host. It falls back to
  Remotion's own Chrome when that path is absent, so it needs no edits on a
  normal machine. Override with `REMOTION_BROWSER_EXECUTABLE`.
- FFmpeg is required for rendering and for verification (`ffprobe`/`ffmpeg`).
- `*.vercel.app` is blocked by this environment's proxy for plain
  `WebFetch`/`curl`. Use the Vercel MCP `web_fetch_vercel_url` tool to check
  those pages.
- Outbound egress is policy-limited. The `legends-ranch/site-audit` harness was
  originally blocked this way — a "blocked" result there is a network policy,
  not a broken script. Re-run `node test_nav.mjs` to test the path before
  concluding anything.

## Before you design anything: `DESIGN-DIRECTION.md`

**Apple is the standard. Miami is the palette. No full-spectrum rainbows.**

That last one is a hard rule with a technical fix, not a taste note: a gradient
containing yellow and green alongside pink and blue reads as a pride flag, which
is not what Isaac sells. Never use the standard
`cos(6.28*(t + vec3(0.0,0.33,0.67)))` iridescence trick on his brand — use a
closed 3–4 stop palette instead. He has had to say this more than once.
