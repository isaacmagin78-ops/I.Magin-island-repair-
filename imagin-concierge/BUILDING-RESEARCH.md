# Island Club — what the community actually is, and what is wrong with its web presence

Researched **2026-08-22** by web search. Isaac's note that day was fair and is the
reason this file exists:

> *"You guys should all do enough research to get exactly what it is I mean… There's
> a webpage for this building. Apparently we can improve. I thought that he has had
> all the information."*

He was right that nobody had looked. He was also right that it was never written
down — so every session started blind. It is written down now.

## ⚠️ How to read this file

**Everything below came from web search snippets, not from opening the sites.**
This container's egress proxy **blocks `islandclubtwo.com`, `islandclubrec.com` and
`islandclubrecreationcenter.com`** — `WebFetch` returns `EGRESS_BLOCKED` for all
three, verified 2026-08-22. So:

- Facts that appeared in **two independent searches** are marked ✅ CONFIRMED.
- Facts from **one** search are marked ⚠️ SINGLE SOURCE — open the page before
  repeating them to anyone.
- **Nothing here has been seen with eyes.** Before this is used in a pitch, someone
  on a normal network must open the actual pages.

## The community

**Island Club is not one association. It is four phases plus a recreation center,
and every one of them runs its own separate website.**

| Entity | Site | Notes |
|---|---|---|
| Phase 1 | `islandclubone.com` | ⚠️ |
| **Phase 2 — Island Club Two, Inc. (Royal Palm) — Isaac's building** | `islandclubtwo.com` | ✅ |
| Phase 3 | `islandclubthree.com` | ⚠️ 88 condominiums |
| Phase 4 | `islandclubphase4.com` | ⚠️ 5 buildings, 121 units |
| Recreation Center | `islandclubrec.com` **and** `islandclubrecreationcenter.com` | ⚠️ **two live sites for one rec center** |

**Six websites for one community.** That is the headline finding.

## Isaac's association

- **Island Club Two, Inc. ("Royal Palm Building")** ✅ CONFIRMED — this settles the
  "Royal Palm vs Island Club" question the renovation dashboard raised. One entity,
  two names.
- **777 S Federal Hwy, Pompano Beach, FL 33062** ✅ CONFIRMED (appears as both the
  association address and the rec center address, suite 2a).
- **Managed by Florida Skyline Management** — ⚠️ SINGLE SOURCE —
  **954-946-1338**, `info@floridaskylinemanagement.com`, listed against
  "IC2 CONDO BOARD PHASE 2".

**This matters for the Chloe conversation.** If Chloe is the on-site manager, she
most likely answers to Florida Skyline, not to the board directly. A website
proposal that goes to her goes to a management company with an existing contract —
that is a different sale than a neighbor buying a $99 page, and slower.

## Defects worth pointing at

1. **The Rec Center publishes a placeholder phone number.** Its contact page lists
   **`777-777-7777`** — ✅ CONFIRMED, it surfaced in two separate searches. A real
   number, **954-946-4912**, exists on third-party directories instead. So the
   community's own site sends residents to a fake number while the working one only
   lives on a listing site nobody visits. This is the single most concrete,
   least-arguable defect found.
2. **Two competing rec-center domains** — `islandclubrec.com` and
   `islandclubrecreationcenter.com`. ⚠️ Confirm both are live and which is official.
3. **`islandclubtwo.com` runs a dated CMS.** ⚠️ Search-indexed URLs look like
   `modules/documentcenter-select.php?choice=Photo+Gallery` and `accessibility.php`
   — query-string module routing on `.php`, the signature of a legacy HOA website
   product, not a current build. Sibling phases appear to be on WordPress, so the
   community is split across at least two platforms.
4. **No consistency of any kind** across six sites for one gated community sharing
   one rec center, one gate and one set of amenities.

## The honest read on selling this

**The defect list is real, but a condo board is the slowest buyer in this repo.**
Boards vote, management companies hold the contract, and a unit owner walking in
with "your website is bad" is a political act as much as a pitch. Everything that
has actually converted here started with **a named person with a problem they said
out loud** — Scott in Zagreb, Linda's listing. A board is not that.

**The fast, non-political version, if he wants one:** the fake phone number. It is
factual, it costs nothing to report, it helps residents whether or not anyone hires
him, and it demonstrates the exact skill he sells without asking anyone for money.
That is a warm introduction to Chloe and the board, not a cold pitch.

## Privacy note — the repo is public

This file records **777 S Federal Hwy** as the association's public address (it is
already on the City of Pompano Beach's published HOA/condo list). The repo
separately records **PH3** as the unit under renovation. Together those pin Isaac's
exact home in a public repository. That was already partly true before this file;
it is more true now. **His call, not a session's** — flagged so he can decide
rather than discover it later.

## What is NOT known and must be checked on a normal network

- What `islandclubtwo.com` actually looks like, whether documents are public or
  login-gated, and when it was last updated.
- Whether the rec center's placeholder number is still live today.
- Whether Chloe works for Florida Skyline or for the association directly.
- Total unit count. Isaac says **507**; the repo has also seen **508**. Phase 3 (88)
  and Phase 4 (121) are the only per-phase counts found. **Still unsettled.**
