/**
 * The data contract for a listing film.
 *
 * `SeaMonarchFilm` was hand-authored for one address, with its section
 * boundaries written in as frame constants. Every listing after it needs the
 * same cut — brand open → the property, uninterrupted → feature beats →
 * price → and only then contact — so the cut lives in `PropertyFilm` and the
 * listing is reduced to one of these specs.
 *
 * Section boundaries are *derived* from the spec rather than declared, so a
 * still added or a hold lengthened cannot leave a gap or an overlap behind.
 */
import type { BrandTheme } from "./types";

/** One held still, pushed slowly, captioned with the feature it shows. */
export type FilmStill = {
  /** Path relative to `public/`. */
  src: string;
  /**
   * Which edge the push is anchored to. Scaling anchors here, so the
   * *opposite* edge crops out of shot — that is how a caption or a piece of
   * clutter along one edge of the source frame is framed away rather than
   * fought with. Use "center" for a clean frame.
   */
  anchor: "top" | "bottom" | "center";
  /** Ken Burns start and end scale. Keep clean frames near 1.0. */
  zoom: [number, number];
  caption: string;
};

/** Moving footage, if the shoot produced any. Films work without it. */
export type FilmFootage = {
  src: string;
  /** How long the picture stays usable — often shorter than the file. */
  durationInFrames: number;
  /**
   * How long the source's own narration runs. When this outlasts the
   * picture, the audio is mounted separately so the voiceover finishes its
   * sentence instead of being cut off with the image.
   */
  narrationDurationInFrames?: number;
};

export type FilmCard = {
  eyebrow?: string;
  wordmark: string;
  lines?: string[];
  emphasis?: string;
  portraitSrc?: string;
  button?: string;
  footnote?: string;
  durationInFrames: number;
};

/** Persistent name/address mark, vertical cuts only. */
export type FilmChrome = {
  wordmark: string;
  subtitle: string;
};

export type FilmMusic = {
  src: string;
  /**
   * The bed is usually shorter than the film, so it is mounted twice rather
   * than relying on looping playback. This is the frame the second pass
   * starts on; it crossfades in over `overlapInFrames`.
   */
  splitInFrames: number;
  overlapInFrames: number;
};

export type PropertyFilmSpec = {
  /** Key into `BRAND_THEMES` — the agent's own brand, not a house style. */
  brandId: string;
  /** Clean frame used as the blurred backdrop behind vertical cuts. */
  plate: string;
  open: FilmCard;
  footage?: FilmFootage;
  stills: FilmStill[];
  stillDurationInFrames: number;
  chrome?: FilmChrome;
  contact: FilmCard;
  music?: FilmMusic;
};

/** Every section boundary in the film, derived once from the spec. */
export type FilmTimeline = {
  open: { from: number; durationInFrames: number };
  footage: { from: number; durationInFrames: number } | null;
  narration: { from: number; durationInFrames: number } | null;
  stillsFrom: number;
  contact: { from: number; durationInFrames: number };
  durationInFrames: number;
};

export const buildFilmTimeline = (spec: PropertyFilmSpec): FilmTimeline => {
  const open = { from: 0, durationInFrames: spec.open.durationInFrames };

  const footage = spec.footage
    ? { from: open.durationInFrames, durationInFrames: spec.footage.durationInFrames }
    : null;

  const narration =
    spec.footage && footage
      ? {
          from: footage.from,
          durationInFrames:
            spec.footage.narrationDurationInFrames ?? spec.footage.durationInFrames,
        }
      : null;

  const stillsFrom = footage ? footage.from + footage.durationInFrames : open.durationInFrames;

  const contact = {
    from: stillsFrom + spec.stillDurationInFrames * spec.stills.length,
    durationInFrames: spec.contact.durationInFrames,
  };

  return {
    open,
    footage,
    narration,
    stillsFrom,
    contact,
    durationInFrames: contact.from + contact.durationInFrames,
  };
};

export const propertyFilmDuration = (spec: PropertyFilmSpec): number =>
  buildFilmTimeline(spec).durationInFrames;

export type PropertyFilmProps = {
  spec: PropertyFilmSpec;
  orientation: "landscape" | "vertical";
};

/** Narrow re-export so composition files don't reach into two type modules. */
export type { BrandTheme };
