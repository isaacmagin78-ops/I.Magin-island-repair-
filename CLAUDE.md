# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.
Last verified against the tree on **2026-08-07**.

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
workspaces, Turborepo, Nx), and no CI** (`.github/` does not exist). Nothing
builds or tests the repo as a whole. Always `cd` into a project folder before
running anything.

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
`imagin-concierge`.
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
  (Isaac's sister) and the first intended client; `111-pompano-beach-611` is
  her real listing and the flagship demo.
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

- **`luxury-coastal` is not a registered brand theme.** Every listing brief and
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
- `Listing-Content-System/` has **no `.gitignore`**, so its `out/` directory is
  *not* ignored despite the README saying so. Don't commit generated packages.
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
