#!/usr/bin/env node
/**
 * Luxury Listing Content System — package generator.
 *
 * Turns one listing brief (JSON) into a complete marketing content package:
 *
 *   1. Cinematic listing video plan (hook, shot list, on-screen text, VO, CTA)
 *   2. Three short-form reels (lifestyle / features / urgency angles)
 *   3. Five story slides
 *   4. Open-house promo
 *   5. Just-listed ad caption
 *   6. Seller-facing value summary
 *   7. "Under contract" follow-up post template
 *   8. Open-house recap (only when openHouse.isPast is true)
 *   9. video-engine/ handoff files (script.txt, cta.txt, endcard.txt) that
 *      drop straight into Isaac-Video-Engine/assets/ for `npm run render:short`
 *
 * Usage:
 *   node scripts/generate-package.mjs listings/<listing>.json
 *
 * Output lands in out/<slug>/ next to this system's root. Purely local and
 * deterministic — no network, no APIs, same brief in = same package out.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const SYSTEM_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// ---------------------------------------------------------------------------
// Brief loading & validation
// ---------------------------------------------------------------------------

const REQUIRED_FIELDS = [
  "slug",
  "address",
  "neighborhood",
  "city",
  "state",
  "price",
  "beds",
  "baths",
  "sqft",
  "headlineFeature",
  "features",
  "lifestyle",
  "agent",
];

const loadBrief = (argPath) => {
  if (!argPath) {
    console.error(
      "Usage: node scripts/generate-package.mjs listings/<listing>.json",
    );
    process.exit(1);
  }
  const path = resolve(process.cwd(), argPath);
  let brief;
  try {
    brief = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.error(`Could not read listing brief at ${path}: ${err.message}`);
    process.exit(1);
  }
  // A brief may reference a reusable profile in agents/<id>.json instead of
  // (or in addition to) an inline `agent` object; inline fields win.
  if (brief.agentProfile) {
    const profilePath = join(SYSTEM_ROOT, "agents", `${brief.agentProfile}.json`);
    let profile;
    try {
      profile = JSON.parse(readFileSync(profilePath, "utf8"));
    } catch (err) {
      console.error(`Could not read agent profile ${profilePath}: ${err.message}`);
      process.exit(1);
    }
    brief.agent = { ...profile, ...(brief.agent ?? {}) };
  }
  const missing = REQUIRED_FIELDS.filter((f) => brief[f] == null);
  if (missing.length > 0) {
    console.error(`Listing brief is missing required fields: ${missing.join(", ")}`);
    process.exit(1);
  }
  if (!Array.isArray(brief.features) || brief.features.length < 3) {
    console.error("Listing brief needs a `features` array with at least 3 entries.");
    process.exit(1);
  }
  for (const f of ["name", "brokerage", "phone"]) {
    if (!brief.agent[f]) {
      console.error(`Listing brief is missing agent.${f}`);
      process.exit(1);
    }
  }
  return brief;
};

// ---------------------------------------------------------------------------
// Shared copy helpers
// ---------------------------------------------------------------------------

const bathsLabel = (baths) => `${baths} bath${baths === 1 ? "" : "s"}`;

const statLine = (b) =>
  `${b.beds} beds · ${bathsLabel(b.baths)} · ${b.sqft} SF${
    b.lotOrWaterfrontage ? ` · ${b.lotOrWaterfrontage}` : ""
  }`;

const shortLocation = (b) => `${b.neighborhood}, ${b.city}`;

const agentSignature = (b) => {
  const a = b.agent;
  const lines = [`${a.name}${a.title ? ` — ${a.title}` : ""}`, a.brokerage, a.phone];
  if (a.email) lines.push(a.email);
  if (a.instagram) lines.push(a.instagram);
  if (a.website) lines.push(a.website);
  return lines.join("\n");
};

// Instagram hard-errors above 5 hashtags, so the list is capped rather than
// trimmed by hand at post time. Ordered most specific first — the hyperlocal
// tags earn more reach than the generic ones, so the generic tail is what gets
// dropped. #JustListed must stay inside the cap: the under-contract variant
// rewrites it.
const HASHTAG_LIMIT = 5;

const hashtags = (b, limit = HASHTAG_LIMIT) =>
  [
    `#${b.city.replace(/\s+/g, "")}RealEstate`,
    `#${b.neighborhood.replace(/[^A-Za-z0-9]/g, "")}`,
    "#JustListed",
    "#LuxuryListing",
    "#WaterfrontLiving",
    "#SouthFloridaLuxury",
    "#DreamHome",
  ]
    .filter((tag) => tag.length > 1)
    .slice(0, limit)
    .join(" ");

const top = (b, n) => b.features.slice(0, n);

// ---------------------------------------------------------------------------
// Asset templates
// ---------------------------------------------------------------------------

const cinematicVideo = (b) => `# Cinematic Listing Video — ${b.address}

**Format:** 60–90s horizontal (YouTube / listing page) with a 9:16 vertical recut
**Tone:** Slow, confident, editorial. Let the property breathe — no fast cuts until the feature montage.

## Hook (0:00–0:05)
Drone pulls back over the water toward the home at golden hour.
**On-screen:** "${b.headlineFeature}"
**VO:** "Some homes you tour. This one you never want to leave."

## Act 1 — Arrival (0:05–0:20)
| Shot | Description | On-screen text |
|---|---|---|
| 1 | Gimbal push through the front entry as doors open | "${b.address}" |
| 2 | Wide of main living space, morning light | "${statLine(b)}" |
| 3 | Slow slider across the signature sightline to the water | — |

**VO:** "Welcome to ${b.address} in ${shortLocation(b)} — ${b.sqft} square feet of ${b.yearBuiltOrRenovated ? b.yearBuiltOrRenovated.toLowerCase() + " " : ""}waterfront living."

## Act 2 — Feature montage (0:20–0:55)
One elegant shot per feature, 4–5s each, matched to VO:
${top(b, 6)
  .map((f, i) => `${i + 1}. ${f}`)
  .join("\n")}

**VO:** "${top(b, 3).join(". ")}. Every detail chosen for the way you actually live here."

## Act 3 — Lifestyle close (0:55–1:15)
Sunset sequence: dock, pool deck, terrace dinner setting. Real moments, not staged stiffness.
**VO:** "${b.lifestyle}"

## CTA end card (final 5s)
**On-screen:**
"${b.address} · ${b.price}"
"Private showings now booking."
${b.agent.name} · ${b.agent.brokerage} · ${b.agent.phone}

**VO:** "Offered at ${b.price}. Reach out for a private showing before it's gone."

## Deliverables from this one shoot
- 60–90s horizontal master (listing page, YouTube)
- 9:16 vertical recut (reel 1 below)
- 8–10 stills pulled from footage for stories and ads
`;

const REEL_ANGLES = [
  {
    file: "reel-1-lifestyle.md",
    title: "Reel 1 — Lifestyle POV",
    hook: (b) => `POV: your new ${b.city} morning routine`,
    build: (b) => `**Length:** 20–30s vertical · **Audio:** trending ambient/luxury track

## Hook (first 1.5s — on-screen + spoken)
"POV: your new ${b.city} morning routine"

## Shot list
1. Coffee on the terrace, water view (POV)
2. Barefoot walk past the pool to the dock
3. ${top(b, 1)[0]}
4. Slow pan back to the house from the dock

## On-screen text beats
- "wake up here" → "walk out here" → "and this is just Tuesday"
- Final frame: "${b.address} · ${b.price}"

## Voiceover (optional — works as text-only)
"${b.lifestyle}"

## Caption
Mornings hit different at ${b.address}. ${statLine(b)}. DM "TOUR" for a private showing. ${"\n\n"}${hashtags(b)}

## CTA
Comment or DM **"TOUR"** → auto-reply with showing link.`,
  },
  {
    file: "reel-2-features.md",
    title: "Reel 2 — Top 5 Features Countdown",
    hook: (b) => `5 things that make this ${b.city} listing unreal`,
    build: (b) => `**Length:** 30s vertical · **Audio:** beat-synced cuts, one feature per beat

## Hook (first 1.5s)
"5 things that make this ${b.city} listing unreal"

## Countdown (one shot + one text overlay each)
${top(b, 5)
  .map((f, i) => `**#${5 - i}** — ${f}`)
  .join("\n")}

## Closer
Wide golden-hour drone. Text: "${b.price} · ${shortLocation(b)}"

## Caption
Number ${Math.min(5, b.features.length)} is the one everyone asks about. ${b.address} — ${statLine(b)}. Save this one. ${"\n\n"}${hashtags(b)}

## CTA
"Save this post + DM 'DETAILS' for the full feature sheet."`,
  },
  {
    file: "reel-3-urgency.md",
    title: "Reel 3 — Market Urgency",
    hook: (b) => `Homes like this don't wait in ${b.neighborhood}`,
    build: (b) => `**Length:** 15–20s vertical · **Audio:** tense-to-resolve trending sound

## Hook (first 1.5s)
"Homes like this don't wait in ${b.neighborhood}"

## Shot list
1. Fast push-in on the money shot (${b.headlineFeature.toLowerCase()})
2. 3 quick feature hits (1s each): ${top(b, 3).join(" / ")}
3. End card: "${b.price} — showings now booking"

## On-screen text beats
- "${b.headlineFeature}"
- "in ${shortLocation(b)}"
- "at ${b.price}"
- "…and buyers already know."

## Caption
${b.neighborhood} inventory like this is measured in days, not weeks. If ${b.address} is on your list, move now — private showings are booking through ${b.agent.name}. ${"\n\n"}${hashtags(b)}

## CTA
"DM 'SHOWING' today — serious buyers only."`,
  },
];

const storySlides = (b) => `# Story Slides — ${b.address}

Five vertical (9:16) slides, posted as one sequence. Each slide holds 5–7s.

## Slide 1 — Tease
**Visual:** Money shot, slow zoom. **Text:** "New to market in ${b.neighborhood} 👀"
**Sticker:** "Tap for the tour →"

## Slide 2 — The numbers
**Visual:** Clean interior wide. **Text:**
"${b.address}"
"${statLine(b)}"
"${b.price}"

## Slide 3 — Signature feature
**Visual:** ${top(b, 1)[0]}. **Text:** "${b.headlineFeature}"
**Sticker:** Poll — "Could you live here? YES / OBVIOUSLY"

## Slide 4 — Lifestyle
**Visual:** Sunset terrace/dock clip. **Text:** "${b.lifestyle}"

## Slide 5 — CTA
**Visual:** Agent on-site or branded card. **Text:**
"Private showings now booking"
"DM 'TOUR' or call ${b.agent.phone}"
**Sticker:** Link → showing scheduler${b.openHouse && !b.openHouse.isPast ? `\n**Bonus:** Countdown sticker to the open house (${b.openHouse.date}, ${b.openHouse.time})` : ""}
`;

const openHousePromo = (b) => {
  const oh = b.openHouse;
  const when = oh ? `${oh.date} · ${oh.time}` : "[DATE · TIME]";
  return `# Open House Promo — ${b.address}

**Formats:** feed post + story slide + 15s clip (reuse reel 3 footage)

## Headline
OPEN HOUSE — ${when}

## Body copy
Step inside ${b.address} in ${b.neighborhood} — ${statLine(b)}, offered at ${b.price}.

${b.headlineFeature}. See in person:
${top(b, 3)
  .map((f) => `• ${f}`)
  .join("\n")}

Champagne tour, feature sheets in hand, and the ${b.city} waterfront doing the rest.

## On-screen text (clip version)
"OPEN HOUSE" → "${when}" → "${b.address}" → "be there before the offers are"

## CTA
RSVP via DM "OPEN" or call ${b.agent.phone}. Private pre-open-house showings available for qualified buyers.

${agentSignature(b)}
`;
};

const justListedCaption = (b) => `JUST LISTED · ${b.address}, ${shortLocation(b)}

${b.headlineFeature} — ${statLine(b)}, offered at ${b.price}.

${top(b, 4)
  .map((f) => `✦ ${f}`)
  .join("\n")}

${b.lifestyle}

Private showings now booking — DM "TOUR" or call ${b.agent.phone}.

${b.agent.name} · ${b.agent.brokerage}

${hashtags(b)}
`;

const sellerValueSummary = (b) => `# Marketing Value Summary — ${b.address}

Prepared for the seller by ${b.agent.name}, ${b.agent.brokerage}

## What your listing campaign includes

From a single professional shoot, your property is marketed with a complete
content system — not just photos on the MLS:

| Asset | Where it works for you |
|---|---|
| Cinematic listing film (60–90s) | Listing page, YouTube, email blast |
| Vertical recut + 3 targeted reels | Instagram, TikTok, YouTube Shorts |
| 5-slide story sequence | Instagram/Facebook stories, day-one launch |
| Open-house promo + recap | Event turnout and post-event urgency |
| Just-listed ad creative | Paid social targeting active buyers |
| Twilight & aerial stills | Print, brochures, broker outreach |
| QR signage kit (tracked codes) | Yard sign, open-house signs, flyers — measurable drive-by traffic |

## Why this matters for your sale

- **Reach:** short-form video puts ${b.address} in front of buyers who never
  open a portal search — including out-of-market and relocation buyers.
- **Positioning:** editorial-grade content frames the home at its price point
  (${b.price}) rather than competing on photos alone.
- **Urgency:** the launch sequence (tease → just listed → open house → recap)
  is engineered to concentrate buyer attention in the first 14 days, when
  negotiating leverage is highest.

## What we report back to you

Weekly exposure summary: views across platforms, saves/shares (intent
signals), showing requests generated, and buyer feedback themes — so pricing
and strategy decisions are made on data, not guesswork.

${agentSignature(b)}
`;

const underContractTemplate = (b) => `# "Under Contract" Post Template — ${b.address}

Post within 24h of executed contract. Reuse the strongest hero shot with an
"UNDER CONTRACT" overlay band.

## Caption
UNDER CONTRACT ✒️ ${b.address}, ${shortLocation(b)}

[X] days on market. [Y] showings. [Z] offers.

This is what a launch strategy does: cinematic film, targeted reels, and a
packed open house put this ${b.beds}-bedroom waterfront home in front of the
right buyers fast.

Thinking of selling in ${b.neighborhood} or anywhere on the ${b.city}
waterfront? Your home deserves the same campaign. DM "SELL" for a private
marketing consultation.

${b.agent.name} · ${b.agent.brokerage} · ${b.agent.phone}

${hashtags(b).replace("#JustListed", "#UnderContract")}

## Fill in before posting
- [X] days on market, [Y] showings, [Z] offers (use real numbers only)
- Tag the buyer's agent if appropriate
- Story version: same image + "SOLD-ish 🥂" countdown-to-closing sticker
`;

const openHouseRecap = (b) => {
  const oh = b.openHouse;
  return `# Open-House Recap — ${b.address}

Best posted within a few days of the event (${oh.date}) — but it works weeks
later as a "still in demand" follow-up too. Goal: make the property feel
active and in demand for buyers who missed it.

## Format
15–20s vertical clip from event b-roll (arrivals, tour moments, dock/pool
crowd shots — no identifiable faces without consent) + carousel of 3 stills.

## On-screen text beats
"${oh.date}'s open house at ${b.address}…" → "[N] groups through the door" →
"feature everyone stopped at: ${top(b, 1)[0].toLowerCase()}" →
"missed it? Private showings still available — for now."

## Caption
That's a wrap on ${b.address}. [N] buyer groups toured on ${oh.date}, and the
${b.headlineFeature.toLowerCase()} stole the show — exactly like we expected.

Serious about ${b.neighborhood}? The window on this one is closing. DM
"SHOWING" for one of the remaining private tour slots this week.

${b.agent.name} · ${b.agent.brokerage} · ${b.agent.phone}

${hashtags(b)}

## Fill in before posting
- [N] = real attendance count — never inflate
- Swap in actual buyer-reaction quote if you captured one (with permission)
`;
};

// ---------------------------------------------------------------------------
// QR signage — physical signs → digital campaign, with measurable scans
// ---------------------------------------------------------------------------

// One QR per placement, each with its own utm_content, so the agent can see
// exactly which sign drove traffic in their analytics (or a link shortener).
const QR_PLACEMENTS = [
  { id: "yard-sign", label: "Yard / listing sign rider" },
  { id: "open-house-sign", label: "Open-house directional + A-frame signs" },
  { id: "flyer", label: "Feature sheets / flyers handed out at showings" },
];

const qrUrl = (b, placement) => {
  const base = b.listingUrl;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}utm_source=qr&utm_medium=print&utm_campaign=${b.slug}&utm_content=${placement}`;
};

const signageGuide = (b) => `# QR Signage Kit — ${b.address}

Physical signs are the one marketing channel that runs 24/7 on-site — a QR
code turns every drive-by and open-house visitor into a tracked digital
lead instead of a hope. Each code below points at the listing page with its
own tracking tag, so analytics show exactly which sign produced the scan.

| File | Where it goes | Tagged as |
|---|---|---|
${QR_PLACEMENTS.map((p) => `| \`qr-${p.id}.svg\` | ${p.label} | \`utm_content=${p.id}\` |`).join("\n")}

Destination: ${b.listingUrl}

## Print specs

- SVGs scale losslessly — print at any size. Minimum QR size ≈ 1/10 of the
  intended scan distance (a rider scanned from 6 ft needs a ~7" code).
- High contrast only: dark code on white. Never print the code over a photo.
- Always pair with a call-to-action line, e.g.:
  - Yard rider: **"Scan for the full video tour"**
  - Open-house sign: **"Can't make it in? Scan to tour it now"**
  - Flyer: **"Scan to save this listing + book a private showing"**
- Test-scan a printed proof from actual distance before ordering the run.

## Why this sells the seller (put it in the listing report)

Scans are measurable exposure: "your sign generated [N] scans this week"
turns the yard sign into data for the weekly seller report — something
listing photos alone can never do.
`;

const agentPitch = (b) => `# For ${b.agent.name.split(" ")[0]} — what one listing shoot just produced

This entire package was generated from a single brief for **${b.address}**,
your ${b.beds} bed / ${b.baths} bath at ${b.price}. No agency retainer, no
per-asset fees — one shoot, one brief, and every asset below comes out
matched to your listing and your branding:

- A **cinematic listing film plan** ready to hand to any videographer —
  hook, shot list, on-screen text, and voiceover already written
- **Three reels** with three different buyer angles (lifestyle POV,
  feature countdown, urgency) — hooks, text beats, captions, CTAs done
- A **5-slide story launch sequence** with poll and countdown stickers
- **Open-house promo and recap** engineered to make the property read as
  in-demand
- A **just-listed caption** ready to post, and an **under-contract post**
  that converts the sale into your next seller lead
- A **seller-facing marketing report** — the piece that wins listing
  appointments, because it shows sellers a campaign, not just photos
- Drop-in files that render an actual **branded vertical video** from the
  shoot's photos through a local video engine — no editor on retainer
- A **QR signage kit** — print-ready codes for your yard sign rider,
  open-house signs, and flyers, each individually tracked so you can tell
  a seller exactly how many people their sign sent to the listing page

## Why this matters for your book of business

Every listing you take gets the full launch treatment in minutes instead
of hours — consistent, luxury-toned, and conversion-focused. The recap and
under-contract assets keep working after the event, turning each sale into
proof for the next seller pitch.

**The ask:** pick your next listing, send over the details and the shoot,
and compare this launch against what you'd normally run.
`;

// Handoff files for Isaac-Video-Engine/assets/ → `npm run render:short`.
const videoEngineScript = (b) =>
  `Welcome to ${b.address} in ${shortLocation(b)}. ${b.headlineFeature}. ${top(b, 3).join(". ")}. ${b.lifestyle} Offered at ${b.price}.`;

const videoEngineCta = (b) => `Private showings now booking — ${b.agent.phone}`;

// The auto pipeline reads only the first line of endcard.txt — keep it to one.
const videoEngineEndcard = (b) =>
  `${b.address} · ${b.price} — ${b.agent.name}, ${b.agent.brokerage}`;

const provenanceSection = (b) => {
  const p = b.provenance;
  if (!p) return "";
  return `
## Listing data provenance — read before publishing

- **Status:** ${p.status ?? "unverified"}
- **MLS #:** ${p.mls ?? "n/a"}
- **Listed by:** ${p.listedBy ?? "n/a"}
${(p.sources ?? []).map((s) => `- Source: ${s}`).join("\n")}

> ⚠️ ${p.note ?? "Verify listing status, price, and authorization with the listing brokerage before publishing any of these assets."}
${b.agent?.profileNote ? `\n> ⚠️ Agent profile note: ${b.agent.profileNote}\n` : ""}`;
};

const packageReadme = (b, files) => `# Content Package — ${b.address}

Generated by the Luxury Listing Content System from \`listings/\` brief
\`${b.slug}\`. Launch order:

1. Story slide 1 (tease) the evening before launch
2. Just-listed caption + reel 1 on launch morning
3. Cinematic film to listing page/YouTube same day
4. Reels 2–3 over the next 4 days
5. Open-house promo 5 days out${b.openHouse?.isPast ? "\n6. Open-house recap (included — event already held)" : ""}
6. Under-contract template when it happens

## Files
${files.map((f) => `- \`${f}\``).join("\n")}
${provenanceSection(b)}

## Rendering the vertical video
Drop the listing's photos/clips into \`Isaac-Video-Engine/assets/images\` /
\`assets/videos\`, copy the three files from \`video-engine/\` into
\`Isaac-Video-Engine/assets/\`, then:

\`\`\`bash
cd Isaac-Video-Engine
BRAND=${b.brand ?? "luxury-coastal"} PRESET=tiktok OUTPUT=out/${b.slug}-reel.mp4 npm run render:short
\`\`\`
`;

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

const brief = loadBrief(process.argv[2]);
const outDir = join(SYSTEM_ROOT, "out", brief.slug);
mkdirSync(join(outDir, "video-engine"), { recursive: true });

const signageAssets = [];
if (brief.listingUrl) {
  mkdirSync(join(outDir, "signage"), { recursive: true });
  signageAssets.push(["signage/README.md", signageGuide(brief)]);
  for (const placement of QR_PLACEMENTS) {
    const svg = await QRCode.toString(qrUrl(brief, placement.id), {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 2,
    });
    signageAssets.push([`signage/qr-${placement.id}.svg`, svg]);
  }
} else {
  console.log(
    "Note: no `listingUrl` in the brief — skipping the QR signage kit. Add the listing page URL to generate it.",
  );
}

const assets = [
  ["cinematic-listing-video.md", cinematicVideo(brief)],
  ...REEL_ANGLES.map((r) => [r.file, `# ${r.title} — ${brief.address}\n\n${r.build(brief)}\n`]),
  ["story-slides.md", storySlides(brief)],
  ["open-house-promo.md", openHousePromo(brief)],
  ["just-listed-caption.txt", justListedCaption(brief)],
  ["seller-value-summary.md", sellerValueSummary(brief)],
  ["agent-pitch.md", agentPitch(brief)],
  ["under-contract-template.md", underContractTemplate(brief)],
  ["video-engine/script.txt", videoEngineScript(brief)],
  ["video-engine/cta.txt", videoEngineCta(brief)],
  ["video-engine/endcard.txt", videoEngineEndcard(brief)],
];

if (brief.openHouse?.isPast) {
  assets.push(["open-house-recap.md", openHouseRecap(brief)]);
}
assets.push(...signageAssets);

const fileNames = assets.map(([name]) => name);
assets.push(["README.md", packageReadme(brief, fileNames)]);

for (const [name, content] of assets) {
  writeFileSync(join(outDir, name), content);
}

console.log(`Generated ${assets.length} assets for ${brief.address}:`);
for (const [name] of assets) console.log(`  out/${brief.slug}/${name}`);
