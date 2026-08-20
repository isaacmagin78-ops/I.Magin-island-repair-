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
  "linda-hoyt": {
    id: "linda-hoyt",
    displayName: "Linda S. Hoyt",
    colors: {
      background: "#f2efe9",
      primary: "#a2968a",
      secondary: "#6e6459",
      accent: "#2a2723",
      text: "#2a2723",
      textMuted: "#8a8177",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    logo: "assets/agents/linda-hoyt.jpg",
    watermarkText: "Linda S. Hoyt",
  },
  "luxury-coastal": {
    id: "luxury-coastal",
    displayName: "Luxury Coastal Listings",
    colors: {
      background: "#0a1220",
      primary: "#d4b26a",
      secondary: "#3d6b8f",
      accent: "#f0e2c4",
      text: "#ffffff",
      textMuted: "#b8c4d4",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    logo: "assets/logos/luxury-coastal.png",
    watermarkText: "Luxury Coastal Listings",
  },
  /**
   * IMagin, daylight. Same mark as `imagin-concierge`, but a sand-and-sea
   * palette instead of the near-black one — for Florida listings shot in
   * daylight, where the dark treatment reads as the wrong coast.
   */
  "imagin-coastal": {
    id: "imagin-coastal",
    displayName: "IMagin",
    colors: {
      background: "#f6f2ec",
      primary: "#3f7f8c",
      secondary: "#5d6b70",
      accent: "#1f2b2f",
      text: "#1f2b2f",
      textMuted: "#87908f",
    },
    fontFamily: "Georgia, 'Times New Roman', serif",
    logo: "assets/logos/imagin-concierge.png",
    watermarkText: "IMagin",
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
};

export const DEFAULT_BRAND_ID = "isaac-video-engine";

export const getBrandTheme = (id?: string): BrandTheme =>
  BRAND_THEMES[id ?? DEFAULT_BRAND_ID] ?? BRAND_THEMES[DEFAULT_BRAND_ID];

export const listBrandThemes = (): BrandTheme[] => Object.values(BRAND_THEMES);
