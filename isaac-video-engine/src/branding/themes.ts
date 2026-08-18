/**
 * Brand themes. Components (titles, lower thirds, CTAs, end cards, etc.)
 * never hardcode a brand's colors or logo — they accept a `theme: BrandTheme`
 * prop and read from it. Adding a new brand means adding one entry here,
 * not touching component code. This is the mechanism that keeps the engine
 * reusable across Tyson's Time, Tyson's Picks, IMagin Concierge, and any
 * future brand.
 */
import type { BrandTheme } from "../lib/types";

export const BRAND_THEMES: Record<string, BrandTheme> = {
  "isaac-video-engine": {
    id: "isaac-video-engine",
    displayName: "Isaac Video Engine",
    colors: {
      background: "#05070d",
      primary: "#4f7dff",
      secondary: "#9f6bff",
      accent: "#22c98a",
      text: "#ffffff",
      textMuted: "#9fb4ff",
    },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  "tysons-time": {
    id: "tysons-time",
    displayName: "Tyson's Time",
    colors: {
      background: "#0a0602",
      primary: "#ffb020",
      secondary: "#ff6b35",
      accent: "#ffd166",
      text: "#ffffff",
      textMuted: "#ffd9a0",
    },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    logo: "assets/logos/tysons-time.png",
    watermarkText: "Tyson's Time",
  },
  "tysons-picks": {
    id: "tysons-picks",
    displayName: "Tyson's Picks",
    colors: {
      background: "#04120c",
      primary: "#22c98a",
      secondary: "#17a673",
      accent: "#ffd166",
      text: "#ffffff",
      textMuted: "#a8e6c8",
    },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    logo: "assets/logos/tysons-picks.png",
    watermarkText: "Tyson's Picks",
  },
  "legends-ranch": {
    id: "legends-ranch",
    displayName: "Legends Ranch",
    colors: {
      background: "#14110b",
      primary: "#c9a15a",
      secondary: "#2f3d2a",
      accent: "#e8d6a8",
      text: "#f5efe0",
      textMuted: "#c9bfa4",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    logo: "assets/logos/legends-ranch.png",
    watermarkText: "Legends Ranch",
  },
  "wildlife-center": {
    id: "wildlife-center",
    displayName: "The Wildlife Center at Legends Ranch",
    colors: {
      background: "#0b1710",
      primary: "#d4af5f",
      secondary: "#1d3325",
      accent: "#e8d6a8",
      text: "#f2eddc",
      textMuted: "#b9c4ae",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    watermarkText: "The Wildlife Center",
  },
  "imagin-concierge": {
    id: "imagin-concierge",
    displayName: "IMagin Concierge",
    colors: {
      background: "#050814",
      primary: "#7c6bff",
      secondary: "#4f7dff",
      accent: "#e0c3fc",
      text: "#ffffff",
      textMuted: "#c3c9ff",
    },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    logo: "assets/logos/imagin-concierge.png",
    watermarkText: "IMagin Concierge",
  },
  /**
   * Added 2026-08-16 to close a silent failure. Every listing brief in
   * `Listing-Content-System/listings/` and `ListingFilm.tsx` already declared
   * `brandId: "luxury-coastal"`, and `assets/logos/luxury-coastal.png` was
   * already on disk — but no entry existed here. `getBrandTheme()` falls back to
   * the default rather than throwing, so listing renders came out in the dark
   * blue engine palette with no error and nothing to debug.
   *
   * This is the one theme that sets a serif face: it fronts real-estate work for
   * a licensed agent, where the other brands front pet and ranch content.
   */
  "luxury-coastal": {
    id: "luxury-coastal",
    displayName: "Luxury Coastal",
    colors: {
      background: "#06161d",
      primary: "#d9c3a0",
      secondary: "#5f9ea0",
      accent: "#f2e9dc",
      text: "#ffffff",
      textMuted: "#bcd3d6",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    logo: "assets/logos/luxury-coastal.png",
    watermarkText: "Luxury Coastal",
  },

  /**
   * ⚠️ UNCONFIRMED NAME — added 2026-08-18 for the Scott Kukes demo.
   *
   * Isaac believes his friend's business is called "The Kukes Group" but said
   * "I believe", and a Sunbiz search on 2026-08-18 found NO Florida entity by
   * that name (two unrelated Kukes entities exist; neither matches). It may be
   * informal, registered in another state, or not registered at all.
   *
   * DO NOT show a render carrying this name to Scott until he confirms the
   * spelling himself. Getting a man's own company name wrong on the first
   * thing you hand him undoes the demo.
   *
   * Palette reasoning: he is an angel investor in real estate and finance who
   * over-analyses and will not appear on camera. So — no warmth, no
   * personality, no showmanship. Ink-blue ground, a single cold signal blue,
   * one restrained brass accent for the figure that matters. It should read
   * like a terminal, not a channel.
   */
  "kukes-group": {
    id: "kukes-group",
    displayName: "The Kukes Group",
    colors: {
      background: "#070b12",
      primary: "#4d8dd6",
      secondary: "#2b4f79",
      accent: "#c9a227",
      text: "#f2f5f9",
      textMuted: "#8ea3bd",
    },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    watermarkText: "The Kukes Group",
  },
};

export const DEFAULT_BRAND_ID = "isaac-video-engine";

/**
 * Resolving an unknown brand id used to fail *silently*: it returned the default
 * theme, so a typo or an unregistered brand rendered a whole video off-brand
 * with no error and nothing to debug. That is exactly what happened with
 * `luxury-coastal` for weeks. Adding the theme fixed one instance; this fixes
 * the mechanism. It still falls back rather than throwing — a render half-way
 * through a batch should not die — but it can no longer do so quietly.
 */
export const getBrandTheme = (id?: string): BrandTheme => {
  const key = id ?? DEFAULT_BRAND_ID;
  const theme = BRAND_THEMES[key];
  if (!theme) {
    // eslint-disable-next-line no-console
    console.warn(
      `[branding] Unknown brandId "${key}" — falling back to "${DEFAULT_BRAND_ID}". ` +
        `This render will be OFF-BRAND. Registered ids: ${Object.keys(BRAND_THEMES).join(", ")}`,
    );
    return BRAND_THEMES[DEFAULT_BRAND_ID];
  }
  return theme;
};

export const listBrandThemes = (): BrandTheme[] => Object.values(BRAND_THEMES);
