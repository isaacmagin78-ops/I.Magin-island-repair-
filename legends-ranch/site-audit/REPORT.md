# Legends Ranch website audit — findings to date

Ordered by revenue impact. Every claim is backed by evidence or marked
unverified. See FIX-INSTRUCTIONS.md for the developer's verification and
fix procedures, and SUMMARY.txt for the plain-English owner summary.

## Finding 1 — Homepage "brand anthem" embed plays the WRONG video: CONFIRMED

**Status: confirmed content defect, owner-witnessed on iPhone,
2026-07-24 ~11:12 and ~12:00 local.**

The player loads and plays — the embed is not technically dead — but
the video it plays is **not Legends Ranch footage**. The homepage
section that says *"Five minutes of grounds, lodge, hunts and the
people who make Legends what it is. Watch the brand anthem, then call
the ranch"* (with "WATCH THE FILM" / "MORE FILMS" links) is embedding
what appears to be a Vimeo placeholder/demo film.

- Evidence, in `screenshots/`:
  - `owner-iphone-07-anthem-embed-vimeo-placeholder-logo.png` (12:00):
    the anthem slot at 00:00 playing a craft video — hands, scissors,
    string — with a large purple "vimeo" logo watermark. This is
    Vimeo's own demo content, not ranch footage.
  - `owner-iphone-06-anthem-embed-wrong-video-sketching.png` (11:12):
    the same section at 00:46 showing a hand sketching on paper —
    again non-ranch content, playing normally.
- Why this costs bookings: this is the single "brand anthem" moment on
  the homepage — the section explicitly tells a high-intent visitor to
  watch the film *and then call the ranch*. Instead of 2,000 acres,
  trophy whitetail, and the lodge, they are shown an unrelated
  stock/demo clip. It reads as a broken or abandoned website to a
  visitor considering a five-figure booking. This also fully explains
  the original "video doesn't work" report.
- Contrast — the Presidential Hunt film embed is fine: `owner-iphone-02`
  …`05` show "Legends Ranch – Presidential Hunt" playing correct ranch
  footage (pause control, progress bar, timestamp advancing). So this
  is not a site-wide Vimeo problem; it is one wrong video ID in one
  section.
- Real replacement footage exists:
  `owner-iphone-08-facebook-reels-real-footage-exists.png` shows the
  ranch's Facebook Reels library (owner tours, Wildlife Center interior,
  live deer, lodge interiors — 1.1K–5.2K views each), confirming the
  ranch has genuine video assets even if the anthem master file needs
  to be located.

**Exact fix (see FIX-INSTRUCTIONS.md §1 and §1-B):** find the Vimeo
video ID in the homepage anthem section, confirm it does not belong to
the ranch's Vimeo account, and replace it with the real ~5-minute brand
anthem film. If no anthem film exists on the ranch's Vimeo account,
that is the actual root cause — the placeholder was never swapped out
when the section was built — and the film must be uploaded (or the
section re-pointed at an existing ranch film) before the section makes
sense. Also verify the "WATCH THE FILM" and "MORE FILMS" links target
real destinations while in there.

## Finding 2 — Contact form delivery: UNVERIFIED

The form renders (owner confirmed it is present), but end-to-end
delivery — submission success, entry storage, notification email to
legends@legendsranch.com, correct reply-to — has not been tested.
Requires owner-approved live test per FIX-INSTRUCTIONS.md §3. A silently
failing form is the single most expensive possible defect for a
high-ticket booking business, which is why it stays #2 despite no
evidence of failure.

## Finding 3 — Mobile phone CTA on hunt pages: PARTIALLY VERIFIED

`owner-iphone-01` shows the Presidential page's inquiry CTA above the
fold on mobile. A tel: (tap-to-call) link above the fold was not
confirmed on any page; the other five hunt pages are untested. Check
per FIX-INSTRUCTIONS.md §4.

## Finding 4 — Legacy .html URLs / redirects: UNVERIFIED

No crawl was possible from the audit environment (its own egress policy
returned 403 for legendsranch.com — an audit-side limitation, not a
site defect; log evidence in README.md). No dead-URL inventory exists
yet. Build one from Search Console/logs per FIX-INSTRUCTIONS.md §5; do
not deploy guessed redirects.

## Finding 5 — Performance, broken links, metadata, alt text: UNVERIFIED

No measurements exist. Run `audit.py` and Lighthouse from an
unrestricted machine per FIX-INSTRUCTIONS.md §2. No estimates are
provided in place of measurements.
