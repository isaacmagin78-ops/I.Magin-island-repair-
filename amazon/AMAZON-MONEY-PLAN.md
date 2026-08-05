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

## Amazon Associates — corrected 2026-08-04

**The first draft of this section dismissed Associates using per-item math. That was the
wrong math.** Isaac's instinct was right, and it changes the picture.

### The mechanism he spotted

You do not earn only on the product you linked. When someone clicks an Associates link:

- you earn on **every qualifying item they add to their cart in the next 24 hours**
- anything added inside that window stays credited for **up to 90 days**, even if they
  check out much later

So a click on a $5 toothbrush link followed by that person's normal weekly Amazon shop
earns commission on **the whole basket**. A converting click is worth roughly **$1.50–$3**
on an $80–150 basket, not the 15 cents that "3% of a toothbrush" implies — about
**10–20× better per click** than the first draft assumed.

Rates are set by the category of what's **purchased**, not what was linked.

### But three rules break the "send it around my network" version

**1. Friends and family earn zero.** Amazon's stated policy: no commission on "orders
for products to be used by you, your friends, your relatives, or your associates in any
manner." They won't publish the detection criteria, but they check buying patterns and
purchase source.

> **Isaac's mom's toothbrush earned $0.** Not a maybe — that's the policy as written.
> Purchases by our own circle are excluded by design. Associates is an advertising
> program, not a friends-and-family discount program.

**2. The links cannot be texted, DM'd, or emailed.** The Operating Agreement bars
Special Links in "any printed material, ebook, mailing, or any oral solicitation," and
email and private social messages are explicitly out. It's classed as a **material
breach** — grounds for immediate account closure.

The "send it to my people" mechanic is precisely the banned mechanic.

**3. "Everyone else's network" does not pass through.** Only people who click *our* link
are tracked. A friend forwarding it attributes nothing — and the forward is itself the
violation in rule 2.

### The rates are lowest exactly where the spending is

| Category | Rate |
|---|---|
| Grocery, Health & Personal Care | **1%** |
| Electronics | 3% |
| Pet supplies | 3% |
| Physical books | 4.5% |
| Luxury Beauty | 10% |

High-spend households mostly spend in the 1–3% bands. A $500 grocery-and-household
basket pays about **$5**. Big baskets help; they don't rescue a 1% rate.

### URGENT — there is a 180-day clock

**Associates requires 3 qualifying sales from 3 separate checkouts within 180 days of
registration.** Miss it and Amazon **closes the account permanently — the Associates ID
cannot be reinstated.** Reapplying is allowed; that ID is gone.

Personal and family orders **do not count** toward the three. Three items in one
checkout counts as **one** sale, not three.

**Action: Isaac — when did you register for Associates?** If we're deep into the window
with only family purchases logged, we have zero qualifying sales and a live deadline.
Most time-sensitive item in this document.

### The legitimate version, which does work

The mechanism is real. The fix is changing *who clicks* and *where the link lives*:

- **Public page, not private messages.** The link-in-bio gear page — offered weeks ago,
  still unbuilt — is the compliant vehicle, and now the highest-priority build. It is
  the only legal way to earn from this.
- **Strangers, not our circle.** The 2,200-view reels are the real asset. Our network is
  specifically excluded; a public audience is specifically allowed.
- **Optimize for clicks, not for commission rate.** Because the whole cart counts, the
  best link is whatever a stranger about to shop will actually tap. Click volume beats
  hunting high-commission categories. Isaac's instinct got here first.

Rough estimate at current reach: a reel driving 20–60 bio taps converts a handful of
baskets — order of **$100–200/month** with daily posting. Real money, in the same range
as the KDP book, and not the write-off the first draft called it. Treat that band as an
estimate, not a figure; we have no click data yet, which is its own problem.

Still blocked and now urgent: **nobody has confirmed the Associates link is actually in
the IG/TikTok/YouTube bios.** No tool can read a social bio. If it isn't there, every
"link in bio" CTA we've ever published went nowhere — while the 180-day clock ran.

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
- [Associates rates by category](https://azonpress.com/amazon-affiliate-commission-rates/)
- [Individual vs Professional selling plan](https://www.sellerapp.com/blog/become-an-amazon-individual-seller/)
- [24-hour cookie, whole-cart attribution, 90-day cart window](https://azonpress.com/amazon-affiliate-cookie-duration/)
- [No commission on own / friends' / relatives' orders](https://affiliate-program.amazon.com/help/node/topic/G46FTB8KQF8NRUWG)
- [Operating Agreement — no Special Links in email, private messages, offline material](https://affiliate-program.amazon.com/help/operating/agreement)
- [3 qualifying sales in 180 days or the account is closed](https://howtojoinaffiliateprograms.com/associates-3-sales-in-180-days/)
