# Public-records retrieval — Royal Palm governing documents

**Purpose.** Pull the recorded documents that decide three practical questions:

1. **What the declaration actually permits** in a unit and in the common elements.
2. **Who holds easements over the master common elements** — access, utilities,
   parking, drives.
3. **What the signage covenants say** — which is the clause that governs whether
   a QR poster, a flyer, or a resident board may hang in a common area.

> ⚠️ **Written 2026-08-19. Nothing below was executed from this session.**
> `officialrecords.broward.org` is **blocked by this environment's egress proxy**
> (`EGRESS_BLOCKED`, verified 2026-08-19), so every URL and field label here comes
> from prior knowledge and **must be confirmed on Isaac's own device**. No
> instrument number, book/page, or recording date appears in this file, because
> none has been read. Do not add one that has not been opened.

> ⚠️ **The association's legal name is not yet established.** Isaac said
> **"Royal Palm"** on 2026-08-19; this repo elsewhere says **"Island Club."**
> They may be the same property under different names, a master association and a
> sub-association, or two different places. **Step 1 exists to settle this**, and
> nothing downstream is reliable until it does.

---

## Step 1 — Establish the exact legal name (do this first, it is free)

Everything else is a name search. A name that is one word off returns nothing and
looks like "the document doesn't exist."

### 1a. Broward County Property Appraiser — get the legal description

`https://web.bcpa.net/BcpaClient/#/Record-Search`

Search by **site address**. From the parcel record, copy verbatim:

| Field | Why it matters |
|---|---|
| **Folio / Parcel ID** | the key for every other county system |
| **Legal description** | contains the recorded condominium name and often its **OR Book / Page** |
| **Property owner / association name** | the name the declaration was recorded under |

The legal description usually reads like
`<CONDOMINIUM NAME> CONDO UNIT <n> PER OR <book>/<page>`. **That book/page is the
declaration.** If it is there, Step 2 becomes a direct lookup instead of a search.

### 1b. Sunbiz — confirm the corporate entity

`https://search.sunbiz.org/Inquiry/CorporationSearch/ByName`

Search terms, in this order, stopping at the first that returns a Florida
not-for-profit corporation whose address matches the property:

```
Royal Palm Condominium Association
Royal Palm Association
Island Club Condominium Association
Island Club Association
```

Record: **exact entity name**, document number, FEI/EIN, registered agent,
principal address, officers, and status (Active / Inactive). The **exact entity
name** from here is the string used in every Official Records search below.

---

## Step 2 — Broward County Official Records

`https://officialrecords.broward.org/AcclaimWeb/`

Recorded land records for Broward County, maintained by the Records, Taxes and
Treasury Division. Searching and viewing are free; certified copies are not.

Three search modes matter:

- **Search by Name** — party name, with a date range and a document-type filter.
- **Search by Document Type** — same, narrowed to one instrument class.
- **Search by Book/Page** — direct retrieval when Step 1a gave you the numbers.

Search the association as **both** grantor and grantee. A declaration is recorded
by the developer, so the association may not be a party to the original at all —
search the **condominium name** as well as the corporate name.

### 2a. The declaration and its amendments

| Search term | Document type filter |
|---|---|
| `<exact condominium name from 1a>` | `DECLARATION OF CONDOMINIUM` |
| `<exact entity name from 1b>` | `DECLARATION OF CONDOMINIUM` |
| `<exact entity name from 1b>` | `AMENDMENT` |
| `<exact entity name from 1b>` | `DECLARATION OF COVENANTS` |

**Pull every amendment, not just the original.** Use restrictions are amended far
more often than they are written, and the operative text is the original **as
amended**. Sort by recording date and read forward.

### 2b. Master common-element easements

| Search term | Document type filter |
|---|---|
| `<exact entity name from 1b>` | `EASEMENT` |
| `<exact condominium name>` | `EASEMENT` |
| `<exact entity name from 1b>` | `GRANT OF EASEMENT` |
| `<developer name from the declaration>` | `EASEMENT` |

Also worth a pass: `RECIPROCAL EASEMENT`, `ACCESS EASEMENT`, `UTILITY EASEMENT`,
and the recorded **plat** for the parcel, which often carries dedicated easements
that never appear as a separate instrument.

### 2c. Signage covenants — read this part carefully

**Signage restrictions are usually not a separate recorded document.** In a
Florida condominium they normally sit in one of three places, and only the first
two are at the county:

1. **Inside the declaration**, under "Use Restrictions," "Restrictions on Use," or
   "Nuisances." Search the declaration PDF for: `sign`, `signage`, `solicit`,
   `advertis`, `poster`, `notice`, `bulletin`, `common element`, `common area`.
   Use the stem `advertis` and `solicit` so you catch every ending.
2. **Inside a master or supplemental declaration of covenants** — try document
   types `DECLARATION OF COVENANTS`, `DECLARATION OF RESTRICTIONS`,
   `SUPPLEMENTAL DECLARATION`.
3. **In board-adopted rules and regulations — which are almost never recorded.**
   These are the ones that actually get a flyer taken down, and the county will
   not have them. They come from the association or its management company, and
   under **Fla. Stat. §718.111(12)** a unit owner may make a **written records
   request** for them. That statute, not the county, is the route to the rules.

**Practical consequence for the QR board:** the county tells you what the
*declaration* forbids. The posted-flyer question is far more likely answered by
the unrecorded rules. If the goal is only "can I hang this," the records request
in (3) is the faster and more accurate path than a title search.

---

## Step 3 — DBPR

**Division of Florida Condominiums, Timeshares, and Mobile Homes (DFCTMH).**

`https://www.myfloridalicense.com/wl11.asp?mode=0&SID=`
→ Condominiums / Cooperatives / Timeshares search

Search by **association name** (from 1b) or by **county = Broward**. What DBPR
holds that the county does not:

- The association's **DBPR ID** and registration status.
- **Annual financial reporting** filings.
- **Arbitration and enforcement history** — prior disputes, which frequently name
  the exact provision being fought over. A past signage or use-restriction case is
  the cheapest possible read on how this board interprets its own documents.

**Scope caution:** DBPR regulates **condominium** associations. If Royal Palm is a
**homeowners' association** rather than a condominium, DFCTMH oversight is far
narrower and much of the above will be empty — that is a real result, not a failed
search. Step 1b tells you which one you are dealing with.

---

## What "done" looks like

A folder containing, each opened and read rather than assumed:

- [ ] BCPA parcel record — folio and full legal description
- [ ] Sunbiz entity record — exact legal name, status, officers
- [ ] Declaration of Condominium — complete, with the recording stamp visible
- [ ] Every recorded amendment, in date order
- [ ] Each easement instrument affecting the master common elements
- [ ] The signage / solicitation clause, quoted with its section number
- [ ] Current rules and regulations, obtained from the association under §718.111(12)
- [ ] DBPR registration record and any arbitration history

**When any item is filled in, write the instrument number and recording date next
to it.** A document nobody can locate again has not really been retrieved.

---

## One warning before this is used

This file describes how to **find and read** public records. It is not legal
advice, and a declaration is a legal instrument that routinely turns on a single
defined term. Before anything is posted, sold, or promised on the strength of a
clause found this way, have the clause read by someone qualified to read it.
