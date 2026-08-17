# What is sitting finished in Google Drive

**Audited 2026-08-17.** Nine months of work, inventoried for the first time.
Nothing below was in any status file. Every item was **opened and read**, not
guessed from a filename — filenames here mislead in both directions.

---

## 🚨 Two security items — do these first

1. **Five copies of `openai-api-key*.txt`** (164 bytes each) sit in Drive folder
   `1xV5uFMqFtpOS3-EL1Bz7Jumf2H2p4N3v`. **If those are live keys, rotate them.**
2. **A hardcoded operator passcode** (`CONCIERGE2026`) sits in client-side
   source in the Trip Concierge tool below. Anyone who opens the page can read
   it. Move it server-side before that tool is ever hosted.

## ⚠️ Two files assert numbers that were never earned

- **`imagin-concierge-marketing-piece.pdf`** (2026-08-16) claims **"3x Lead
  Conversion," "70% Time Saved," "48hr Faster Listings."** There is no product
  with customers behind those figures. **Cut or reframe them before this reaches
  a real agent** — this repo's no-fabricated-metrics rule is absolute.
- **`linda-hoyt-luxury-app.html`** asserts **"900+ Sales," "$2.1B Volume," "160
  verified Zillow reviews,"** a named testimonial from "Michael & Rachel T.," and
  five closed sales with addresses and prices. **Almost certainly demo content.**
  Source every one or replace with placeholders **before this is shown as hers.**

---

## ⛔ The repo's own map is wrong: the handyman app was built

`CLAUDE.md` says *"the handyman lead-capture app it refers to was never built
here."* **It was built.** It is in Drive, in a folder named "Imagin Handy man":

- **`resident-portal-airtable.html`** — a working maintenance-request form for
  Island Club residents (unit, name, phone, issue, three urgency tiers) that
  POSTs into Airtable and **generates its own QR code** for phone submission.
- **`contractor-dashboard-airtable.html`** — the contractor-side sibling.

**To finish:** fill `AIRTABLE_TOKEN` / `BASE_ID` (still `YOUR_..._HERE`), create
the base, host it. The token would sit in client-side JS — it needs a proxy or a
write-only scoped key.

---

## Finished work, ranked by value sitting unused

### 1. `Trip_Concierge_Tool_Code_v1.html` — **the concierge business, already built**
Not a code sample. A complete AI lead-capture product: client intake → a live
conversational concierge that elicits destination, dates, travelers, budget and
problems-to-solve → a second pass that extracts a structured **Trip Brief** as
JSON → a **passcode-gated operator dashboard** with a New / Contacted / Booked /
Closed pipeline. **The travel skin is cosmetic; the engine is domain-agnostic.**
*Needs:* a backend proxy for the API key and real storage.

### 2. `Interactive Tactical Blueprint` — **a finished consulting deliverable for a named prospect**
*"The Top 5 Vulnerabilities of South Florida AC Companies,"* written directly to
**Bill Thomas / Thomas AC, Cooper City**, referencing his father's 30-year
word-of-mouth network. Five diagnosed problems, each with a concrete fix:
missed-call text-back, Google Business Profile claim, field-service app,
text-to-pay invoicing, voice-memo-to-SOP capture.
**It needs nothing. It needs a send.**

### 3. `START HERE — The Screen (angel deal evaluator) v2.html` — **giftable today**
Built for a named person, **Scott Osman**. A five-question go/no-go screen, six
weighted scoring dimensions with live 0–100 scoring, five automatic
disqualifiers that override the score, a verdict with `.txt` export, plus
plain-English cards on SAFEs, convertible notes, cap-table red flags and pro
rata. **Functionally complete — it only needs hosting.** Use v2; v1 is superseded.

### 4. `imagin-concierge-car-care.html` — **the only fully-priced offer in existence**
Mobile detailing, four real tiers: **Golden Wash $45 · Essential Clean $85 ·
Full Detail $165 · Premium Shine $285**, each with duration and scope, plus
availability windows and a membership tier. Serves Island Club and the Pompano
Intracoastal corridor. Its own footer names the blocker: *"payment links are live
in Stripe **test mode** — switch to live keys and connect a real scheduler."*

### 5. `island-club-cuts-flyer.pdf` — **one conversation from shipping**
A print-ready flyer for **Emilio, a real resident barber at Island Club.**
Correctly left `$XXXXXXXX` and `(561) XXX-XXXX` rather than inventing them.
**Blocked on four prices and a phone number.**

### 6. `Legends Ranch — Master Marketing Executive Package`
Brand positioning, a shot-by-shot 60-second hero documentary script, a 22-second
conversion cut with timecodes, two ad campaigns, a 3-minute anthem, and
ready-to-paste video-model prompts per shot. **The anthem was produced; the 60s,
22s and ad copy appear unshipped.** Carries specific claims (2,000 acres, 83%
return rate, 5 SCI top-10 records, 24,000 sq ft) — **re-verify before use**, the
Legends Ranch audit is already flagged stale.

### 7. `scott-briefing.html` — a partnership pitch, possibly never sent
A private, well-typeset letter to Scott proposing a co-owned business: **a system
that reads where South Florida real estate is heading before it is obvious** —
"the next Pompano, the next corridor worth land or multifamily" — with Scott
owning the signal-vs-noise call and a long game of owning the property the engine
identifies. Ends with five open questions. **Unclear whether it was ever sent.**

### 8. `Book1` — a second finished picture book, with an ownership question
*Positively Negbaum — The Little Negbaum Who Chose the Good Current.* 52 pages,
a dozen drafts, locked canon, back-cover copy, discussion questions and a full
per-page **Illustration Guide.** **⚠️ Owned by `vernonamus@gmail.com` and shared
with Isaac — not his own file, and authorship cannot be verified from the
document. Establish who owns it before anything else.** `ASSET-INVENTORY.md`
dismissed this as "an unrelated manatee manuscript" from a voice-to-text mix-up.
Half right: it is not the Tyson book, but it is real and finished, not an error.

### 9. `Tyson_Picks_App_Prototype_v2`
An app prototype for "Tyson's Pet Network" — a South Florida rescue and pet
services hub with vetted picks, video episodes, affiliate deals, a 30-day rescue
progress tracker, and the $19 Kit as the featured product.

---

## The state of the Drive

**Chaotic.** An Aug 12 iPhone backup dumped ~62 raw camera-roll files (many
50–340 MB) into the root; media outnumbers documents about 5:1. Real deliverables
sit unfoldered next to 2011 résumés.

**The organizing attempt failed in a specific, telling way.** An "Ike OS" folder
scaffold (`01_BUSINESS_COMMAND_CENTER`, `Project_Brief`, `Master_Context`,
`Decision_Log`, `AI_Handoff_Protocol`) was **created at least four separate times
in parallel on 2026-07-12**, and most of its documents are 1–2 KB near-empty
templates. **The scaffolding got built four times; it never got filled in once.**

### Duplicates worth knowing
- `linda-hoyt-luxury-app.html` — **six byte-identical copies** across four folders
- `scott-autopilot-clean.html` — 3 copies; `linda-real-estate-autopilot.html` looks like the same tool re-skinned
- Legends Ranch package — 3 escalating versions; the "Executive" one is most complete
- IMagin Concierge deck — 4 generations (V4, V5, V7, V8)
- `Collection_Catalog_CANONICAL` — exists as two Sheets *plus* an `.xlsx`
- QR walkthrough — 3 copies · car-care page — 2 identical · Tactical Blueprint — 1 deck + 2 identical exports

### Not opened, worth a look
The Doc titled **`U`** (740 KB, id `1-LSCeIWrPDbGGcgxpHV09dXBg8asYPxpY3gLE3zjLFM`)
returns empty text but its size suggests real content. Also unopened:
`contractor-dashboard-airtable.html`, `scott-autopilot-clean.html`,
`linda-real-estate-autopilot.html`, `Ike_Learning_Plan.html`, the Royal Palm
Miele SOP, and three zip archives.

**Caution on names:** `Scott demo` (532 KB) is **not** a demo — it is a saved
logged-out ChatGPT share page whose conversation was never captured. An empty
shell. Filenames here cannot be trusted in either direction.
