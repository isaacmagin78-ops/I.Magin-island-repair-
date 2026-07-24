# Legends Ranch website audit — findings to date

Ordered by revenue impact. Every claim is backed by evidence or marked
unverified. See FIX-INSTRUCTIONS.md for the developer's verification and
fix procedures, and SUMMARY.txt for the plain-English owner summary.

## Finding 1 — Reported "broken homepage video": NOT REPRODUCED

**Status: disproven on the one device tested so far.**

- Reported issue: the film in the "Why hunt at Legends Ranch?" section
  fails to load (suspected broken Vimeo embed).
- Evidence: five owner-supplied iPhone screenshots taken 2026-07-24,
  ~11:57–11:58 local, on Wi-Fi, saved in `screenshots/`
  (`owner-iphone-01` … `owner-iphone-05`).
  - `owner-iphone-02-vimeo-playing-0017.png`: the embedded Vimeo player
    ("Legends Ranch – Presidential Hunt") is actively playing — visible
    pause control, progress bar advancing, timestamp 00:17, Vimeo logo.
  - `owner-iphone-03/04/05`: three later frames of the same playback
    (lodge exterior, fireside interior, group scene) — the stream is
    advancing, not frozen on a poster image.
  - `owner-iphone-01`: the Presidential hunt hero and "Inquire About a
    Presidential Hunt" CTA render correctly on mobile.
- The player starts muted with an "Unmute" overlay. That is standard
  mobile-browser autoplay behavior, not a defect. If the original
  reporter interpreted a silent start as "not loading," that would
  explain the report.
- Caveats (unverified): one device, one browser, one network, one
  session. Not verified on desktop, Android, other networks, or over
  time (an intermittent failure or a since-fixed problem cannot be
  ruled out). The developer's DevTools procedure in FIX-INSTRUCTIONS.md
  §1 remains the definitive check.

**Recommendation:** do not change the video embed. Ask whoever reported
the issue for their device/browser and a screenshot; only act if the
failure reproduces under FIX-INSTRUCTIONS.md §1.

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
