# Test Coverage Analysis

Analysis date: 2026-08-05 · Branch: `claude/test-coverage-analysis-97p337`

## Summary

The workspace has **~9,700 lines of source across five projects and zero
automated assertions**. There is no CI, no test runner that actually runs, and
one file named like a test that never asserts anything.

Coverage is not "low" — it is absent. So the useful question is not "which
percentage should we raise" but "where does the absence currently cost us
most." Four real defects were found and reproduced during this analysis, all
in code that a first round of unit tests would have caught.

## Inventory

| Project | Source | Test files | Runner | CI |
|---|---|---|---|---|
| `isaac-video-engine/` | 5,520 LOC / 55 files | 0 | none (`lint` = eslint + tsc) | none |
| `college-launch-os/` | 2,147 LOC / 23 files | 0 | jest declared, **unconfigured** | none |
| `madison-moves/` | 1,375 LOC / 22 files | 0 | no `test` script | none |
| `Listing-Content-System/` | 626 LOC / 1 file | 0 | no `test` script | none |
| `legends-ranch/site-audit/` | 14 LOC + 169 LOC Python | 1 (not a test) | `test` = `exit 1` | none |

Two things in that table are worse than they look:

- **`legends-ranch/site-audit/test_nav.mjs` is not a test.** It launches
  Chromium, `console.log`s a status code, and exits 0 whether the site
  returned 200, returned 500, or threw a navigation error. It is a manual
  connectivity probe with a misleading filename.
- **`college-launch-os` promises a test suite it cannot run.** `package.json`
  declares `"test": "jest"` and installs `jest`, `jest-environment-jsdom`,
  `@testing-library/react`, `@testing-library/jest-dom`, and `@types/jest` —
  but there is no `jest.config.*`, no `jest` key in `package.json`, no
  transform for TS/TSX, no setup file wiring `jest-dom`, and no test files.
  `npm test` cannot pass. This is the most misleading signal in the repo: it
  reads as "tested" to anyone skimming.

The `isaac-video-engine` does have a real verification practice, but it is
manual. `PROJECT-STATUS.md` designates four compositions
(`IsaacVideoEngineTest`, `ComponentShowcase`, `MotionTest`, `AudioTest`) as
"standing regression tests," verified by rendering an MP4 and eyeballing
extracted frames. That caught two genuine bugs historically, so it works — but
it only runs when a human remembers to run it. Last recorded verification:
2026-07-21, with commits landing after.

## Defects found and reproduced during this analysis

These were confirmed by executing the logic, not by reading it.

### 1. Due dates are off by one day east of UTC — `college-launch-os/app/utils/derive.ts:45`

`resolveDueDate` builds a `Date` in local time and then serializes it with
`.toISOString()` (UTC), so the calendar day shifts for any user at or east of
Greenwich. For a 2026-08-15 move-in and a "30 days before" task:

```
TZ=UTC              -> 2026-07-16   correct
TZ=America/New_York -> 2026-07-16   correct
TZ=Europe/London    -> 2026-07-15   WRONG
TZ=Asia/Tokyo       -> 2026-07-15   WRONG
TZ=Australia/Sydney -> 2026-07-15   WRONG
```

This propagates into `relativeDue` copy shown to users, `isOverdue` /
`isDueSoon` flags, `upcomingDeadlines` ordering, and the 15-point deadline
component of the readiness score. The same `toISOString()` pattern appears at
`app/data/seed.ts:23` in `getDefaultMoveInDate()`.

### 2. Seven of twenty seeded tasks appear in none of the dashboard's eight sections — `college-launch-os/app/utils/readiness.ts:47-90`

`TaskCategory` (`app/types.ts:3-21`) has 16 values. The section buckets in
`readinessSections` cover 12. These four map to no bucket at all:

```
college-list, essays, scholarships, documents
```

Those four categories *are* section names on the dashboard, but each section
is computed from a different collection (`state.essays`, `state.scholarships`,
…) rather than from tasks. So a task with `category: 'essays'` contributes to
the 35% checklist score but is counted in **zero** sections. Against the
shipped seed data that is 7 of 20 tasks (35%) — invisible in the breakdown the
user actually reads.

### 3. `nextMission` ranks priority strictly above urgency — `derive.ts:84`

`.sort((a, b) => a.prio - b.prio || a.urgency - b.urgency)` means urgency only
ever breaks ties *within* a priority band. Reproduced:

```
tasks: [ "FAFSA — 90 days OVERDUE"   (low priority)
         "Buy dorm shower caddy"     (high priority, due 2029) ]
nextMission picks: "Buy dorm shower caddy"
```

This may be the intended product behavior — but nothing records that decision
either way, so it is equally likely to be an accident, and a future refactor
has nothing to preserve.

### 4. The deadline score saturates at five overdue items — `readiness.ts:145`

`clamp(100 - overdueCount * 20)` bottoms out at 5:

```
0 overdue -> 100      5 overdue -> 0
3 overdue ->  40     20 overdue -> 0
```

A family going from 5 overdue items to 20 sees no movement in that component.

### 5. Concierge routing misroutes plausible questions — `app/utils/concierge.ts:138-145`

Eight regexes are evaluated in fixed order, first match wins:

```
"what should i do about scholarships"  -> routes to: this week   (also matched: scholarships)
"when is my essay due"                 -> routes to: deadlines   (also matched: essays)
```

The `what.*do` and `due` patterns are broad enough to swallow more specific
intents. Ordering here is load-bearing and completely undefended.

## Proposed priorities

Ordered by value per hour of work, not by size.

### Tier 1 — pure functions, no infrastructure required

The highest-leverage target by a wide margin. These modules are dependency-free
or near-dependency-free, deterministic, and contain every confirmed defect.

1. **`college-launch-os/app/utils/derive.ts`** — date parsing, due-date
   resolution, overdue/due-soon predicates, `nextMission` ordering,
   `currentPhase` boundaries. Run the date tests under several fixed `TZ`
   values; that alone reproduces defect #1. Pin `nextMission` ordering so the
   product decision becomes explicit.
2. **`college-launch-os/app/utils/readiness.ts`** — scoring. Three tests worth
   writing first: weights sum to 100 (they do: 35+15+15+15+10+10); overall
   score stays in 0–100 for empty, all-complete, and all-overdue states; and
   **every `TaskCategory` maps to exactly one section** — that last assertion
   is what would have caught defect #2, and it stays valid as categories are
   added.
3. **`isaac-video-engine/src/lib/audio.ts`** — the module docstring says these
   are pure "so they can be unit-reasoned-about," and then nothing reasons
   about them. Assert volume never exceeds 1 or goes negative under combined
   fade-in/fade-out/duck, that fade windows land where intended, and that
   `isWithinDuckWindow` honors its 6-frame lead-in at range boundaries.
4. **`isaac-video-engine/src/lib/motion.ts`, `utils/assets.ts`,
   `config/videoFormats.ts`** — `classifyAsset` extension mapping (including
   uppercase and no-extension inputs), `pickKenBurnsDirection` determinism
   across the seed cycle, `secondsToFrames` rounding, and the fact that every
   `transitionIn/OutStyle` branch returns finite numbers.

### Tier 2 — make the declared harness real, and unlock the untestable scripts

5. **Fix `college-launch-os`'s jest setup** so `npm test` means something:
   a `jest.config.js` using `next/jest`, `testEnvironment: 'jsdom'`, and a
   setup file importing `@testing-library/jest-dom`. Everything needed is
   already in `devDependencies`. Until this exists, Tier 1 items 1–2 have
   nowhere to run.
6. **`Listing-Content-System/scripts/generate-package.mjs`** is untestable by
   construction — 626 lines with everything at module top level, nothing
   exported, and validation that calls `process.exit()` directly. Extract the
   brief loader, validation, and templates into an importable module, then
   snapshot the generated package against the four committed briefs in
   `listings/`. This is the actual product: a broken template ships wrong
   marketing copy — wrong price, wrong agent phone number — to a client.
   Validation deserves direct tests too (missing required fields, fewer than
   three features, missing `agent.phone`, absent `agentProfile` file).
7. **`isaac-video-engine/scripts/render-short.mjs`** has the same shape.
   `buildScenes`, `buildCaptionsFromScript`, and `readFirstLine` are pure and
   worth pinning: the 60/240-frame video clamp, the 90-frame image default,
   even word distribution across total duration, `test-pattern`/`test-music`
   fixture exclusion, and the empty-assets path.

### Tier 3 — the paths where a failure is silent

8. **`college-launch-os/app/utils/storage.ts`** — `normalize()` is the only
   thing standing between a schema change and a user losing their entire
   saved plan, and it currently trusts `parsed` for shape. Test partial
   payloads, wrong-typed fields, corrupt JSON, and payloads from an older
   shape. Failures here are silent and destructive.
9. **`madison-moves` booking form** — this is live lead capture for a real
   business, and its fallback path hands the lead to `mailto:`. If
   `buildMailtoUrl` encodes wrongly or `siteConfig.contact.email` drifts, leads
   vanish with no error anywhere. `validate()` and `buildMailtoUrl` are
   closures inside the component; extract them, test them directly, then add
   one rendered-form test for the error-display and `aria-invalid` wiring.
   `isPlaceholder` deserves a test too — it gates which path runs at all.
10. **`concierge.ts` routing** — a table-driven test over representative
    questions, including the two misrouting cases above, so the ordering is a
    recorded decision instead of an accident.

### Tier 4 — CI, and automating the cheap half of the manual ritual

11. **There is no `.github/workflows/` directory at all.** A single workflow
    running `tsc --noEmit`, `eslint`, and the new unit tests per project would
    catch most regressions and would have caught nothing today only because
    nothing runs. This is the change that makes every tier above durable —
    without it, new tests decay exactly the way the manual render checks did.
12. **Automate the composition registry check** in `isaac-video-engine`. The
    visual regression compositions should stay manual — rendering and eyeballing
    frames is the right tool for "does this look correct." But the cheap
    invariants around them need not be: every registered composition has a
    unique `id`, positive `durationInFrames`, and valid `fps`/dimensions.
    That is a fast test and it protects `Root.tsx`/`Composition.tsx` from the
    kind of drift a render would only reveal minutes later.

## Two cross-cutting notes

**Seed data is time-dependent.** `SAMPLE_GRAD_YEAR`, `getDefaultMoveInDate()`,
and the `daysFromNow(...)` due dates in `app/data/seed.ts` all read the wall
clock, so the sample state's meaning drifts as real time passes. Any test over
readiness, phases, or overdue counts must inject or freeze the clock, or it
will pass in August and fail in November. Worth deciding this convention before
writing the first test, not after.

**Prefer invariants over example assertions where possible.** Several defects
here are of the "a case was added but a mapping wasn't updated" kind — defect
#2 especially. A test asserting *every* `TaskCategory` maps to exactly one
section keeps working as categories are added; a test asserting three specific
categories does not.

## Suggested first step

Tier 2 item 5 (make jest actually run), then Tier 1 items 1–2 in the same pass
— that turns four of the five confirmed defects into failing tests inside a
single project, with no new dependencies to add.
