# College Checklist — $49. The deployable file.

**Recovered 2026-08-18.** This folder is the fix for a defect that has been live since
**2026-07-17** and has been re-diagnosed by at least three separate AI sessions, none of
which could find that the fix already existed.

## What was actually wrong

Not what the status notes say. Three different records disagree, so here is the verified
sequence:

| Date | What actually happened |
|---|---|
| 2026-07-17 | Buy button starts pointing at a Stripe **test** link. Real cards rejected. |
| 2026-08-06 | A session diagnoses the test link and tells Isaac to switch it. Correct, but incomplete. |
| **2026-08-07** | **A live Stripe link is created** — `buy.stripe.com/00w6oH1z16lHcwS9y2g7e02`. The Stripe half is done from this point on. |
| 2026-08-13 | A session repairs the sales page, replacing a `STRIPE_LIVE_LINK_HERE` placeholder with the live link. **Delivers the file "to Isaac directly in chat."** Records: *"REMAINING — Isaac only: deploy that file."* |
| 2026-08-18 | The repaired file is found sitting in git on branch `claude/macbook-pro-setup-oqe3tm` of the `-imagin-concierge` repo — a branch named after a laptop setup. Copied here. |

**So the fix was made twice and delivered into rooms that evaporated.** The Stripe work is
finished. The remaining problem was never Stripe — it is deployment.

## Verified in this file, 2026-08-18

- `test_` links: **0**
- Placeholders (`STRIPE_LIVE_LINK_HERE`, TODO, XXXX): **0**
- Live Stripe link `buy.stripe.com/00w6oH1z16lHcwS9y2g7e02`: present **twice**
- Price `$49`: 7 occurrences, consistent
- Self-contained: no build step, no dependencies

## The one thing a session cannot do

**Deploy it.** `college-checklist.vercel.app` is not in the connected Vercel account —
the same gap that HANDOFF.md records for every other live site. No agent can push to it.

**Isaac (or anyone with that Vercel login) drags this folder into Vercel, or drops
`index.html` onto the existing project.** That is the whole remaining task.

## Then, before pushing any traffic

1. **Buy it once with a real card.** $49. Confirm the delivery email and access arrive.
2. **Refund yourself.**
3. Only then distribute.

The Stripe link created 2026-08-07 has **never been independently verified** — HANDOFF.md
says so explicitly. A live-format URL is not proof that the checkout works end to end.
Do not skip step 1.

## Timing

College move-in is late August. **This is the product's window, and it is now.**
