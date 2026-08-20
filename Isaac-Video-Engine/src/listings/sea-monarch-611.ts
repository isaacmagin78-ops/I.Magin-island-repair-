/**
 * 111 N Pompano Beach Blvd, Unit 611 — "The Sea Monarch".
 *
 * Linda S. Hoyt's own listing, and the first film the engine cut. The frame
 * constants here are the ones that were arrived at by frame-sampling the
 * source: the picture stops being usable at 7.4s (frame 222 of the film),
 * where the source's own closing card begins, while its narration runs the
 * full 10s — hence the separate narration duration.
 *
 * The two interior stills carry the source's captions baked along their
 * bottom edge, so their pushes are anchored to the top and crop them away.
 * The sunset plate is the only frame in the source with nothing burned in.
 */
import type { PropertyFilmSpec } from "../lib/property-film";

const PLATE = "assets/stills/611-sunset.png";

export const SEA_MONARCH_611: PropertyFilmSpec = {
  brandId: "linda-hoyt",
  plate: PLATE,
  open: {
    eyebrow: "Unparalleled service",
    wordmark: "Linda S. Hoyt",
    lines: ["Florida real estate expert"],
    durationInFrames: 75,
  },
  footage: {
    src: "assets/videos/sea-monarch-611-source.mp4",
    durationInFrames: 222,
    narrationDurationInFrames: 300,
  },
  stills: [
    {
      src: "assets/stills/611-living.png",
      anchor: "top",
      zoom: [1.3, 1.44],
      caption: "1,450 square feet · turnkey furnished",
    },
    {
      src: "assets/stills/611-kitchen.png",
      anchor: "top",
      zoom: [1.3, 1.44],
      caption: "Quartz counters · stainless · breakfast bar",
    },
    {
      src: PLATE,
      anchor: "center",
      zoom: [1.04, 1.16],
      caption: "Direct oceanfront · impact glass · steps to the pier",
    },
  ],
  stillDurationInFrames: 140,
  chrome: {
    wordmark: "Linda S. Hoyt",
    subtitle: "111 N Pompano Beach Blvd · Unit 611",
  },
  contact: {
    eyebrow: "111 N Pompano Beach Blvd · Unit 611",
    wordmark: "Linda S. Hoyt",
    lines: ["ONE Sotheby's International Realty", "(954) 647-9295"],
    emphasis: "$775,000",
    portraitSrc: "assets/agents/linda-hoyt.jpg",
    button: "Let's connect",
    footnote: "lindahoytrealestate.com",
    durationInFrames: 120,
  },
  music: {
    src: "assets/music/_samples/sample-track.mp3",
    splitInFrames: 435,
    overlapInFrames: 17,
  },
};
