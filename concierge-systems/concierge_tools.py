#!/usr/bin/env python3
"""Turn the collection inventory CSV into decisions and draft listings.

    python3 concierge_tools.py collection-inventory.csv
    python3 concierge_tools.py collection-inventory.csv --limit 3
    python3 concierge_tools.py collection-inventory.csv --sellable

Two jobs, both rule-based — no network, no API keys, no model calls:

  next_action(item)   the one thing to do next with this piece, derived from
                      provenance, condition, valuation and emotional tag.
  draft_listing(item) a product title and short description for anything on a
                      print or sale path.

Nothing is written back to the CSV. This reads and prints; you stay the editor.
"""

import argparse
import csv
import sys

# Paths that mean money changes hands, so provenance and a number matter first.
SALE_PATHS = {
    "Print & license",
    "Consign — auction",
    "Private sale",
    "Donate — appraise first",
}

THIN_PROVENANCE = {"Undocumented", "Family memory only", "Photo record only"}
NEEDS_A_NUMBER = {"Not valued", "Appraisal needed"}

PATH_ACTIONS = {
    "Print & license": "Scan at 600 dpi, then publish the print listing.",
    "Consign — auction": "Send photos and the valuation to two auction houses for consignment quotes.",
    "Private sale": "Offer it to the two dealers on the shortlist before going public.",
    "Donate — appraise first": "Book the qualified appraisal, then open the conversation with the donee.",
    "Hold — insure only": "Confirm it is on the current insurance schedule.",
    "Legal check first": "Confirm import, export and sale rules before it is listed anywhere.",
}


def next_action(item):
    """Return the single next step for one inventory row.

    Order is deliberate: the things that can cause harm or embarrassment are
    checked before the things that only cost money.
    """
    if item["emotional_tag"] == "Keep — do not sell":
        return "Photograph and add to the insurance schedule. No sale conversation."

    if item["monetization_path"] == "Legal check first":
        return PATH_ACTIONS["Legal check first"]

    if item["condition"] == "Restoration needed":
        return "Get one conservator quote before deciding anything else."

    if item["monetization_path"] in SALE_PATHS:
        if item["provenance_status"] in THIN_PROVENANCE:
            return "Write down where, when and from whom it came — three sentences beats nothing."
        if item["valuation_status"] in NEEDS_A_NUMBER:
            return "Get a valuation before setting a price."

    return PATH_ACTIONS.get(item["monetization_path"], "Review at the next collection pass.")


def _origin_parts(origin):
    """Split 'South Florida — 1946-1952' into ('South Florida', '1946-1952')."""
    if "—" in origin:
        place, era = origin.split("—", 1)
        return place.strip(), era.strip()
    return origin.strip(), ""


def draft_listing(item):
    """Return {title, subtitle, description} for a print or sale candidate.

    Returns None for anything being held — there is nothing to list.
    """
    path = item["monetization_path"]
    if path not in SALE_PATHS:
        return None

    place, era = _origin_parts(item["origin"])
    base = item["title"].split(",")[0].strip()
    lead = item["description"].split(". ")[0].strip().rstrip(".")
    where_when = ", ".join(part for part in (place, era) if part)

    if path == "Print & license":
        return {
            "title": f"{base} — {where_when}",
            "subtitle": "Archival pigment print, reproduced from the original.",
            "description": (
                f"{lead}. Printed from the original {item['type'].lower()} held in a "
                f"private South Florida collection, and shipped with a provenance card "
                f"noting origin and date."
            ),
        }

    return {
        "title": f"{base} — {where_when}",
        "subtitle": f"{item['condition']} condition · {item['provenance_status']}",
        "description": (
            f"{lead}. Offered from a single-owner South Florida collection assembled "
            f"through decades of travel. Photographs and condition notes on request."
        ),
    }


def load_items(csv_path):
    """Read the inventory CSV into a list of dicts.

    Lines starting with '#' are skipped. Both data files carry a leading
    '# UNVERIFIED DATA' banner (added 2026-08-15) so anyone opening a CSV
    directly meets the warning before the numbers. Three separate sessions had
    already quoted figures out of these files as established fact.
    """
    with open(csv_path, newline="", encoding="utf-8") as handle:
        rows = (line for line in handle if not line.lstrip().startswith("#"))
        return list(csv.DictReader(rows))


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("csv_path", help="path to collection-inventory.csv")
    parser.add_argument("--limit", type=int, help="only process the first N items")
    parser.add_argument(
        "--sellable",
        action="store_true",
        help="only show items on a print or sale path",
    )
    args = parser.parse_args(argv)

    items = load_items(args.csv_path)
    if args.sellable:
        items = [i for i in items if i["monetization_path"] in SALE_PATHS]
    if args.limit:
        items = items[: args.limit]

    if not items:
        print("No matching items.")
        return 0

    for item in items:
        print(f"\n{item['item_id']}  {item['title']}")
        print(f"  location   {item['location']}")
        print(f"  path       {item['monetization_path']}")
        print(f"  NEXT       {next_action(item)}")

        listing = draft_listing(item)
        if listing:
            print(f"  listing    {listing['title']}")
            print(f"             {listing['subtitle']}")
            print(f"             {listing['description']}")

    print(f"\n{len(items)} item(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
