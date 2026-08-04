# Amazon — how this actually makes money

Written 2026-08-04, triggered by the Seller Central approval email.
All figures below were verified against live sources on that date (links at bottom).

---

## The headline

**The account you just got approved for is not the one that makes you money.**

Amazon Seller Central sells **physical products only**. Third-party sellers cannot
list a digital download on it. The First 30 Days Kit — a finished 15-page PDF, our
single best-developed product — **cannot be sold on Seller Central at all.**

The account that sells it is **KDP (Kindle Direct Publishing)**. It is free, it is a
separate signup, and it is where every dollar in this plan comes from.

Seller Central still has a use. It's just later, and it costs money to get there.
See "Seller Central's real job" below.

---

## Do this first — it may be costing $39.99/month right now

Seller Central has two plans:

| Plan | Cost | Notes |
|---|---|---|
| Individual | $0.99 per item sold, **no monthly fee** | Cannot run Amazon ads |
| Professional | **$39.99/month** | Buy Box, ads, bulk upload |

If the signup put us on **Professional**, we are paying $39.99/month for an account
with zero listings — **$480/year for nothing**. Log in, check the plan, and switch to
Individual until there's an actual physical product to sell. Listings stay live when
you downgrade; we lose ad tools we aren't using anyway.

**Action: Isaac — check Settings → Account Info → Manage Selling Plan.** This is the
single fastest money move in this document, because it's money we stop losing today.

---

## The play: put the Kit on KDP

The Kit already exists. `kit-site/product/first-30-days-kit.html` renders the finished
15-page PDF. Nothing needs to be invented — it needs to be reformatted and expanded.

### The one blocker

KDP paperbacks require **a minimum of 24 pages**, and the total must be an **even
number**. We're at 15. The book cannot be published until it grows.

### The insight that decides the whole product

KDP's US black-and-white printing cost is **flat at $2.30 for any book from 24 to 108
pages.** A 24-page book and a 108-page book cost us *exactly the same to print.*

So going from 24 pages to ~100 pages costs **$0.00** and lets us:

- charge $14.99 instead of $9.99 without the listing looking like a rip-off
- survive the "this is too thin for the price" review that would otherwise kill us
- put 30 daily log pages in, one per day, which is what this product wants to be anyway

**Build to ~100 pages. The extra 85 pages are free.**

### Money per copy

| Product | Price | We keep | Why |
|---|---|---|---|
| Paperback (~100pp) | **$14.99** | **$6.69** | (14.99 × 60%) − $2.30 print |
| Paperback | $12.99 | $5.49 | 60% tier needs ≥ $9.99 |
| Paperback | $9.99 | $3.69 | too thin a margin, don't |
| Kindle edition | **$6.99** | **~$4.68** | 70% tier is $2.99–$9.99, minus $0.15/MB delivery |
| **Direct sale (today)** | **$19** | **$18.15** | after Stripe 2.9% + $0.30 |

**Read that last row twice.** A direct sale is worth **2.7× a paperback sale**. Amazon
is not where the margin is.

### So why do it at all

Because Amazon has something we do not: **buyers who are already searching.**

Instagram is our best channel at ~2,200 views per reel, and that's a channel where we
have to go find people. Someone typing "rescue dog first week" into Amazon has already
raised their hand and has a card on file. We're not buying attention, we're standing
where it already is.

**Treat Amazon as customer acquisition, not as profit.** Every copy of the book carries
a link to the full digital kit and the printable trackers. The $6.69 is a bonus; the
buyer is the point.

---

## Do NOT enroll in KDP Select

KDP Select requires **digital exclusivity** — the ebook cannot be sold anywhere else
for 90 days. We currently sell substantially the same content as a $19 PDF at
`tysons-time-kit.vercel.app`. Enrolling would put us in violation.

**Safe route:** publish the **paperback** (never subject to exclusivity, ever) and keep
selling the $19 PDF direct. Add the Kindle edition without Select, or skip Kindle at
launch. We lose Kindle Unlimited page-reads, which are worth very little on a workbook
anyway.

---

## Amazon Associates — be honest about this one

We already have Associates and the "gear picks — link in bio" CTA is in every caption.

**Pet supplies pay 3%.**

To clear $100/month we need **$3,333 in tracked sales** — from an audience whose best
channel does 2,200 views a reel. That is not realistic this year.

Associates is not a revenue line. It's worth keeping because it costs nothing, but it
should stop being treated as one of two monetization pillars in our captions. The kit
link is doing the actual work.

Related and still blocked: **nobody has confirmed the Associates link is actually in
the IG/TikTok/YouTube bios.** No tool can read a social bio. If it isn't there, every
"link in bio" CTA we've published has gone nowhere. Isaac needs to eyeball this.

---

## Seller Central's real job — later, not now

There is a genuine physical-product play: a spiral-bound First 30 Days planner, a
fridge wall chart, a boxed new-adopter starter kit. Seller Central is the right home
for those.

It is not the right move *now* because it requires:

- inventory bought up front (real capital, real downside if it doesn't sell)
- a GS1 barcode
- storage and fulfillment
- $39.99/month once we're doing volume

**Sequence it properly:** the KDP paperback is a free market test for the exact same
customer. If the book sells, we have proof — and *then* spending money on physical
inventory is an informed bet instead of a guess. If the book doesn't sell, we just
saved ourselves the inventory.

---

## What happens next

| # | Step | Who | Cost |
|---|---|---|---|
| 1 | Check the Seller Central plan, downgrade to Individual | **Isaac** | saves ~$480/yr |
| 2 | Create the free KDP account | **Isaac** | $0 |
| 3 | Expand the manuscript 15 → ~100 pages | Claude | $0 |
| 4 | Render print-ready interior PDF + cover at 8.5×11 | Claude | $0 |
| 5 | Paste the listing copy from `KDP-LISTING-COPY.md` | Isaac/Claude | $0 |
| 6 | Order one proof copy, approve, publish | **Isaac** | ~$4 |
| 7 | Announce to the IG audience, link in bio → Amazon | Claude | $0 |

Total cash to get a product live on Amazon: **about four dollars.**

Steps 3 and 4 are the real work and they're ours. Step 2 gates everything —
nothing can be uploaded until the KDP account exists.

## What to expect

A new book with no reviews sells in low single digits per month on organic Amazon
traffic alone. Our IG audience should push the first month higher. Realistic early
range is **$70–200/month**, growing as reviews accumulate — reviews are the flywheel,
and the first ten matter more than everything else combined.

The honest framing: this is not a fast money machine. It's a **second storefront that
runs itself**, built from an asset we already finished and are currently only selling
to people we personally reach.

---

## Sources

- [Seller Central is physical-only / KDP for digital](https://www.dotcomreps.com/blog/how-to-sell-digital-products-on-amazon-kdp-seller-central-guide)
- [KDP paperback 24-page minimum, even page count](https://kdp.amazon.com/en_US/help/topic/G201857950)
- [KDP printing cost — $2.30 flat, 24–108 pages B&W US](https://cambric.pub/guides/kdp-printing-cost-guide/)
- [KDP 60% paperback royalty tier, ≥$9.99](https://kindlepreneur.com/kdp-royalty-calculator/)
- [Kindle 70% tier $2.99–$9.99, $0.15/MB delivery](https://kdp.amazon.com/en_US/help/topic/G200644210)
- [Associates pet supplies = 3%](https://azonpress.com/amazon-affiliate-commission-rates/)
- [Individual vs Professional selling plan](https://www.sellerapp.com/blog/become-an-amazon-individual-seller/)
