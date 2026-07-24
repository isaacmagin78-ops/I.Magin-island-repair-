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
};

export const DEFAULT_BRAND_ID = "isaac-video-engine";

export const getBrandTheme = (id?: string): BrandTheme =>
  BRAND_THEMES[id ?? DEFAULT_BRAND_ID] ?? BRAND_THEMES[DEFAULT_BRAND_ID];

export const listBrandThemes = (): BrandTheme[] => Object.values(BRAND_THEMES);
