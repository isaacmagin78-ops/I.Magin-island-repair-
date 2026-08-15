# Imagin Concierge — sales page

`index.html` is the source for **https://imagin-concierge.vercel.app**.

Static, self-contained, no build step. Open it in a browser or deploy this
folder. Everything is inline — no fonts, scripts or images fetched from
anywhere, so it renders identically offline.

## Why this file exists

The live page was deployed on 2026-07-31 with **no source committed anywhere**.
Commit `04cabb5` is titled "Add Imagin Concierge sales page and referral kit"
and describes the three tiers in detail, but changed exactly one file —
`REFERRAL-MESSAGE.md`. The page itself lived only as a Vercel deployment, so
nobody could change a word of it, including a personal email address and a
`noindex` tag that kept it out of Google.

Rebuilt from that commit message's own spec on 2026-08-15 so it is editable
again. **Redeploy this folder to `imagin-concierge.vercel.app` to replace the
orphaned version.**

## What changed from the orphaned page

- **`noindex` removed.** The page is now indexable. Nothing here blocks crawlers.
- **Email kept as `isaacmagin78@gmail.com`** — deliberately unchanged. It is the
  address already live on the page and the one in `REFERRAL-MESSAGE.md`. Swap it
  in two places (the `mailto:` in the CTA and the footer) when a business address
  exists. Do not invent one.

## Editing

| Change | Where |
|---|---|
| Prices or tiers | the three `.item` blocks under "Services & rates" |
| Proof / past work | the `.proof-row` blocks |
| Trades listed | the `.trade` spans |
| Email | `mailto:` in `.cta`, and the `<footer>` |
| Colors | the `:root` token block — all three theme blocks must stay in sync |

## Claims on this page

Every line under "Work already shipped" maps to something real in this repo:
the $19 Kit (`kit-site/`), the PH3 punch list (documented in `HANDOFF.md`), the
Legends Ranch films (`legends-ranch/deliverables/`), Madison Moves
(`madison-moves/`), College Launch OS (`college-launch-os/`), and the Tyson's
Time posting system.

**Clients are described, never named** — no client is identified without their
authorization. There are no invented numbers, results or testimonials on this
page, and none should be added. See the content rules in the root `CLAUDE.md`.
