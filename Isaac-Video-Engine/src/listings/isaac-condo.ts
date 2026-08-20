/**
 * Isaac's own condo, offered as a rental — the second listing through the
 * engine, and the one Linda is meant to look at and decide whether she'd
 * take on.
 *
 * NOT YET REGISTERED as a composition in `src/Composition.tsx`. Registering
 * it before the stills exist would produce a film that fails to render, and
 * registering it with the phone photos we have would produce a film that
 * renders and is worse than nothing. See SHOT-LIST.md in
 * `Listing-Content-System/listings/assets/isaac-condo/` for the six frames
 * this spec is waiting on and exactly how to shoot them.
 *
 * To finish: shoot the six frames, drop them in `public/assets/stills/` under
 * the filenames below, fill in the three bracketed facts, then add two
 * `<Composition>` entries (landscape + vertical) pointing at `PropertyFilm`
 * with this spec — same as the Sea Monarch pair.
 */
import type { PropertyFilmSpec } from "../lib/property-film";

/** The hero frame, also the blurred backdrop behind the vertical cut. */
const PLATE = "assets/stills/condo-balcony-view.png";

export const ISAAC_CONDO: PropertyFilmSpec = {
  // Light and warm rather than the navy/gold "luxury" default — a Florida
  // high-rise rental in daylight, not an evening oceanfront sale.
  brandId: "imagin-coastal",
  plate: PLATE,

  open: {
    eyebrow: "Now available for lease",
    wordmark: "IMagin",
    lines: ["Fort Lauderdale · high floor"],
    durationInFrames: 75,
  },

  // No moving footage yet. The film is built to work without it — the stills
  // carry it and the music bed runs unducked. Add a walkthrough clip here if
  // one gets shot and the cut absorbs it without any other change.
  footage: undefined,

  stills: [
    {
      src: PLATE,
      anchor: "center",
      zoom: [1.04, 1.16],
      caption: "High floor · skyline and treetop views",
    },
    {
      src: "assets/stills/condo-living.png",
      anchor: "center",
      zoom: [1.05, 1.18],
      caption: "Open plan · floor-to-ceiling sliders",
    },
    {
      src: "assets/stills/condo-kitchen.png",
      anchor: "center",
      zoom: [1.05, 1.18],
      caption: "[KITCHEN CAPTION — counters, appliances]",
    },
    {
      src: "assets/stills/condo-balcony.png",
      anchor: "center",
      zoom: [1.04, 1.16],
      caption: "Private screened balcony",
    },
    {
      src: "assets/stills/condo-entry.png",
      anchor: "center",
      zoom: [1.06, 1.2],
      caption: "Keyless entry · Ring doorbell",
    },
    {
      src: "assets/stills/condo-floor.png",
      anchor: "center",
      zoom: [1.06, 1.2],
      caption: "Large-format travertine-look tile throughout",
    },
  ],
  stillDurationInFrames: 140,

  chrome: {
    wordmark: "IMagin",
    subtitle: "[ADDRESS] · Fort Lauderdale",
  },

  contact: {
    eyebrow: "[ADDRESS] · Fort Lauderdale",
    wordmark: "IMagin",
    lines: ["Available furnished", "[PHONE]"],
    emphasis: "[$X,XXX / month]",
    button: "Schedule a showing",
    footnote: "imaginconcierge.com",
    durationInFrames: 120,
  },

  music: {
    src: "assets/music/_samples/sample-track.mp3",
    // Without narration to duck under, the bed just needs a second pass
    // before the first runs out. 15s of source at 30fps ≈ 450 frames.
    splitInFrames: 420,
    overlapInFrames: 17,
  },
};
