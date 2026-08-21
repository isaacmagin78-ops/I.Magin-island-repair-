# Client pages — the stamp

`build.py` turns one JSON brief into one finished client page. **Adding a client
is adding a JSON file.** Nobody hand-writes HTML again, and nobody edits the
template to change a client's content.

```bash
python3 build.py           # builds every brief in clients/ into out/
```

| Path | What it is |
|---|---|
| `build.py` | the template and the renderer. One layout, five section kinds: `facts`, `frames`, `items`, `prose`, `cta`. |
| `clients/*.json` | one brief per client. Every word on the page comes from here. |
| `out/*.html` | generated. Safe to delete and rebuild. |

## The rule the generator enforces

**A fact with no value renders as a visible blank, never as a guess.**

```json
{"label": "Hourly", "value": "", "blank": "Marc to set"}
```

renders as an italic *"Marc to set"* in muted type. This is the repo's
no-fabricated-numbers rule made structural: a placeholder **cannot** silently
become a claim, because the only way to fill it is to put the real value in the
brief. `build.py` prints the blank count for every page it builds, so an
unfinished page announces itself.

## Built so far

| Brief | For | State |
|---|---|---|
| `unit-rental.json` | Isaac's own unit, for-rent-by-owner, I.Magin Concierge mark | frames awaiting the cleaned-up photos |
| `ivan-auto.json` | Ivan, used cars | **draft — not published under his name** |
| `marc-handyman.json` | Marc, handyman in the building | **draft — not published under his name** |

Ivan's and Marc's pages carry a footer stating they are unpublished drafts. That
line comes out **only** when they have said yes and their own numbers are in.

---

## The launch offer — decided 2026-08-19

Isaac floated **"lowest tier free for the first hundred."** That is the most
expensive line in the plan, and here is the version that survives contact:

### Ten free, residents only, and only while listed on the board

**Not a hundred.** A hundred free pages is a hundred units of his time at zero,
and — worse — a scarcity offer that cannot possibly fill is not scarcity. It
reads as an empty room. Ten fills, and ten is a weekend.

**Residents only,** because every constraint pays for itself:

- **Revisions cost minutes, not a drive.** The client is upstairs.
- **The board stops looking empty.** Ten filled slots is what makes scanning the
  QR worth a stranger's four seconds — the free pages *are* the marketing spend.
- **Neighbours talk to neighbours.** A referral engine that costs nothing and
  cannot be bought.

**And the free page stays free only while it is listed on the resident board.**
That makes the board the distribution channel rather than a favour, and it gives
every free page a reason to point back at the thing that sells the paid ones.

**The upgrade is built into the deliverable.** The free page is the $99 Quick Win
minus the two things a business actually pays to get: **their own phone number on
it, and a Google Business profile so they show up on a map instead of only in an
elevator.** Anyone who wants to be *found* rather than merely *listed* is already
holding the reason to pay.

### For realtors, the offer is not a free tier at all

A realtor does not want a free page. A realtor wants the next listing to move.
So the pitch is one sentence:

> *"Send me one listing's photos. I'll send back the page and a QR rider for the
> sign. If you like it, it's $99 a listing."*

**The QR rider on the yard sign is the product.** A buyer standing at the curb
scans it and gets the full gallery, the terms, and a way to ask a question —
instead of squinting at a flyer box that's been empty since Tuesday. `unit-rental`
is the working sample to show them, and it is real work on a real unit, not a mock.
