# First 30 Days Kit — Launch Dashboard & Content

Last updated: 2026-07-21. This is the compact operating record for the launch.

## Live system

| Thing | Where |
| --- | --- |
| Sales page | https://tysons-time-kit.vercel.app/ |
| Checkout | **LIVE**: https://buy.stripe.com/cNi4gz1z1aBXdAW7pUg7e00 ($19 → redirects to the access page) |
| Delivery / access page | https://tysons-time-kit.vercel.app/access-tyk30-8f4d2/ (unlisted, noindex) |
| Product file (PDF, 15 pages) | served from this repo: `kit-site/files/first-30-days-kit.pdf` (public raw URL wired into the access page) |
| Product source | `kit-site/product/first-30-days-kit.html` (edit → re-render PDF with headless Chromium `--print-to-pdf`) |
| Launch videos | `Isaac-Video-Engine/out/first-30-days-kit-launch{,-hook-b,-clean}[-hq].mp4` + thumbnail (delivered in chat; re-render any time with `npm run render:kit`, `HOOK=b`, `CAPTIONS=off`) |
| Price | **$19**, one product, one price, instant digital delivery |
| Support | Instagram DMs — https://www.instagram.com/tysons_time/ |
| Analytics | none configured (known limitation — Vercel Analytics is a one-toggle add later) |

**Checkout design (2-minute setup in Stripe):** Payment Links → New → product
"The First 30 Days Kit", $19 one-time → Confirmation: "Don't show confirmation
page — redirect customers" → paste the access URL above. Stripe emails the
receipt; the redirect IS the delivery. Then paste the payment-link URL into
the clearly-marked `PAYMENT_LINK` constant at the bottom of
`kit-site/site/index.html` (search "CHECKOUT SWAP POINT") and redeploy — or
paste the link to Claude in one message and it's swapped and redeployed for
you. Until then, buy buttons route to the honest interim `/buy.html`.

## Positioning (use everywhere)

**The First 30 Days Kit** — *A calm, practical adjustment plan for your rescue
dog's first month home.* A day-by-day organization resource (roadmap,
decompression schedule, routines, trackers, checklists) built from Tyson's
real first month. Not training, not veterinary care — the calm plan that makes
the professionals' job easier.

## First-24-hours posting order

1. **TikTok** — main video (hook A), link in bio → sales page.
2. **Instagram Reel** — same video, 2–3 h later, link in bio.
3. **Instagram Story** — reshare the Reel + link sticker → sales page.
4. **YouTube Short** — hook B cut.
5. **Facebook Reel + Story** — next morning, founder-story caption.
6. **Static product post** (thumbnail image) — day 2, practical-angle caption.

## Ready-to-post captions

### 1 · TikTok (emotional rescue story — POST FIRST, hook A video)
Cover text: "his first 30 days changed everything"
> He didn't need a perfect family. He needed to feel safe. 🐾 Tyson's first
> month home wasn't about training — it was the same walk, same words, same
> calm, every single day. We turned that month into The First 30 Days Kit — a
> day-by-day plan for new rescue adopters (roadmap, decompression schedule,
> printable routines, trust tracker). Link in bio. #rescuedog #adoptdontshop
> #newdog #dogsoftiktok #rescuedogsoftiktok
Pinned comment: "Every page of the kit came from Tyson's actual first month. Questions? Ask below 👇"
First reply (to "what's in it?"): "15 pages: 30-day roadmap, decompression & adjustment schedule, daily rhythm builder, consistency tracker, home-prep + first-night checklists, 10 trust activities, vet/trainer question sheets, household rules, progress tracker, emergency contacts. Instant PDF."

### 2 · Instagram Reel (new-adopter anxiety → clarity)
Cover text: "bringing home a rescue? read this"
> That first week home is beautiful and completely overwhelming — the
> untouched bowl, the 2am googling, the forty open tabs. You're not doing it
> wrong. You're doing it without a plan. 🧡 The First 30 Days Kit is the calm,
> day-by-day plan we wish we'd had when Tyson came home: decompression
> schedule, daily rhythm, trackers, checklists. Link in bio — instant PDF.
> #rescuedog #adoptdontshop #dogmom #dogdad #newpuppy #rescuedogsofinstagram
Pinned comment: same as TikTok.

### 3 · YouTube Short (practical angle, hook B video)
Title: "A rescue dog's first 30 days can change everything"
> The first month sets the rhythm for everything after. Here's the
> day-by-day plan we built from our rescue Tyson's real first month —
> decompression schedule, routines, trackers, and checklists for new
> adopters. Link in the description.

### 4 · Facebook Reel + Story (founder/story angle)
> When we brought Tyson home, he pressed himself into a corner and watched
> us. No tricks fixed that. A rhythm did — same walk, same words, same calm,
> every day, for a month. We turned that month into The First 30 Days Kit
> for new rescue adopters: a calm, practical, day-by-day adjustment plan.
> It's $19, it's instant, and it's the thing we wish someone had handed us
> on day one. Link in comments. 🐾
First comment: sales page link.

### 5 · Static product post (day 2, thumbnail or cover image)
> 15 pages. One calm month. 🐾 The First 30 Days Kit: 30-day roadmap ·
> decompression schedule · daily rhythm builder · consistency tracker ·
> first-night checklist · 10 trust-building activities · vet & trainer
> question sheets. Built from Tyson's real first month. Link in bio.

### 6 · Instagram/Facebook Story frames
Frame 1: video hook (0–3s) + text "his first 30 days changed everything"
Frame 2: kit page previews + text "the plan we wish we'd had" + link sticker → sales page

## Marketing angles (rotate)

1. **Emotional rescue story** — Tyson's corner → smile arc (captions 1, 4)
2. **Practical first-month plan** — what's actually inside (captions 3, 5)
3. **New-adopter anxiety → clarity** — "you're not doing it wrong" (caption 2)

## Known limitations

- Checkout is the interim `/buy.html` until the Stripe Payment Link is
  created (single founder action; API creation was declined in-session).
- Video is mute-first by design: ElevenLabs VO blocked (no connected
  account; approval-gated Zapier), music sources blocked by network policy.
  Drop a recorded VO in `Isaac-Video-Engine/assets/voiceover/` + a licensed
  track in `assets/music/` and re-render to add sound.
- No analytics; the 10–15s retargeting cut was deferred (splicing the
  master mid-caption reads badly; render a dedicated short variant later).
- Sales-page SEO: served with Vercel's team-URL noindex on non-production
  aliases; canonical https://tysons-time-kit.vercel.app/ is public.

## First optimization after real feedback

Watch the first ~20 DMs/comments: if buyers ask "will this work for my
[fearful/older/second] dog," add an FAQ answering it in their words — then
test hook C ("Bringing a rescue home is overwhelming. It doesn't have to
be.") against hook A on TikTok.
