/**
 * Social platform presets. A preset is pure configuration — resolution,
 * fps, safe zones, and export settings — never layout logic. Components
 * read `safeZone` to keep text/UI clear of platform chrome (profile pic,
 * caption box, share buttons); they don't need to know which platform
 * they're rendering for.
 *
 * Safe zone numbers are conservative, commonly-cited defaults for each
 * platform's overlaid UI as of this writing. Revisit if a platform changes
 * its UI; treat them as guidance for keeping key content readable, not a
 * pixel-perfect spec from each platform.
 */
import type { SocialPreset, SocialPresetName } from "../lib/types";

const verticalExport = {
  codec: "h264" as const,
  crf: 18,
  pixelFormat: "yuv420p" as const,
};

export const SOCIAL_PRESETS: Record<SocialPresetName, SocialPreset> = {
  tiktok: {
    name: "tiktok",
    label: "TikTok",
    width: 1080,
    height: 1920,
    fps: 30,
    safeZone: { top: 220, bottom: 320, left: 40, right: 180 },
    recommendedMaxDurationInSeconds: 60,
    export: verticalExport,
  },
  "instagram-reels": {
    name: "instagram-reels",
    label: "Instagram Reels",
    width: 1080,
    height: 1920,
    fps: 30,
    safeZone: { top: 200, bottom: 340, left: 40, right: 160 },
    recommendedMaxDurationInSeconds: 90,
    export: verticalExport,
  },
  "facebook-reels": {
    name: "facebook-reels",
    label: "Facebook Reels",
    width: 1080,
    height: 1920,
    fps: 30,
    safeZone: { top: 200, bottom: 340, left: 40, right: 160 },
    recommendedMaxDurationInSeconds: 90,
    export: verticalExport,
  },
  "youtube-shorts": {
    name: "youtube-shorts",
    label: "YouTube Shorts",
    width: 1080,
    height: 1920,
    fps: 30,
    safeZone: { top: 180, bottom: 280, left: 40, right: 180 },
    recommendedMaxDurationInSeconds: 60,
    export: verticalExport,
  },
  "square-post": {
    name: "square-post",
    label: "Square Post",
    width: 1080,
    height: 1080,
    fps: 30,
    safeZone: { top: 60, bottom: 60, left: 60, right: 60 },
    recommendedMaxDurationInSeconds: 60,
    export: verticalExport,
  },
  story: {
    name: "story",
    label: "Story (IG/FB)",
    width: 1080,
    height: 1920,
    fps: 30,
    safeZone: { top: 250, bottom: 250, left: 40, right: 40 },
    recommendedMaxDurationInSeconds: 15,
    export: verticalExport,
  },
};

export const getSocialPreset = (name: SocialPresetName): SocialPreset =>
  SOCIAL_PRESETS[name];

export const listSocialPresets = (): SocialPreset[] =>
  Object.values(SOCIAL_PRESETS);
