# Concierge Systems

> ## ⚠️ THE TWO CSVs ARE UNVERIFIED — do not quote a figure from them as fact
>
> **Flagged 2026-08-15, after three separate sessions were misled by them in one day.**
>
> They contain **real project and people names** — Island Club / Royal Palm PH3, Townsend
> Place 503, Arturo, Legends Ranch, Mom's house in Boca, Pompano storage — alongside
> **budgets, dates, vendors and item details that Isaac has never confirmed.** That
> combination is what makes them dangerous: they read as authoritative because the
> surrounding context is genuine.
>
> Documented damage from treating them as fact:
> - one session reported a certificate-of-insurance problem blocking a cargo elevator
> - another quoted Isaac a **$2.6M budget he never set**
> - a third cited Island Club PH3 and Townsend 503 to him as two confirmed live projects
>
> **A separate, important caution against over-correcting:** a session then dismissed the
> COI item entirely as fabricated — but a real Ferguson certificate-of-insurance email
> exists (order `SUZANNE SHNEIDER-7556820`, forwarded by Isaac's mother 2026-08-15) and
> that mailbox is iCloud, unreachable from Code. **The spreadsheet being unverified does
> not make every item in it false.** Verify individually; do not resolve either way by
> assumption.
>
> Treat every value here as a **placeholder pending Isaac's confirmation.** The tooling
> below is sound — only its inputs are unconfirmed.

Plug-in pieces for the UHNW concierge practice. Two spreadsheets and one script
— open the CSVs in any spreadsheet app, run the script when you want the list to
tell you what to do next.

| File | What it is |
|---|---|
| `collection-inventory.csv` | Art / artifact / historical collection. 10 sample rows, 12 fields. |
| `renovation-dashboard.csv` | Island Club PH3 and Boca 503, one row each. |
| `concierge_tools.py` | Reads the inventory, prints a next action per item and drafts listings. Stdlib only. |
| `PRODUCT-PILOT.md` | The sellable offer built on top of the above, with a 30-day pilot. |

## Running the script

```bash
cd concierge-systems
python3 concierge_tools.py collection-inventory.csv              # everything
python3 concierge_tools.py collection-inventory.csv --sellable   # only sale/print paths
python3 concierge_tools.py collection-inventory.csv --limit 3    # first three
```

No network, no API keys, no dependencies. It never writes back to the CSV — it
reads and prints, and you stay the editor.

## Design notes

- **`emotional_tag` is a real field, not a nicety.** It is checked first in the
  triage logic, so anything marked `Keep — do not sell` returns an insurance
  action and never a sale action, no matter what the other columns say. That is
  what keeps a monetization pass from turning into a family argument.
- **Thin provenance blocks a price, not the item.** Rows marked `Undocumented`
  or `Family memory only` get sent back for three sentences of history before
  they get a valuation. Written-down provenance is most of the value gap on
  pieces like these.
- **`next_action` is derived, not stored.** No stale action column to maintain —
  change the condition or valuation and the recommendation changes with it.
- **`load_level` on the dashboard is the recovery guardrail.** It exists so the
  two projects can be read side by side and deliberately not peaked at the same
  time. Island Club closes out in October; Boca stays in design mode until it
  does.
- Controlled vocabularies (paths, tags, conditions) are the constants at the top
  of `concierge_tools.py`. Edit them there and the CSV stays consistent.
