import { staticFile } from "remotion";

/**
 * Resolve a file that lives under public/assets/ regardless of which
 * machine the project is running on. Always go through this (or
 * staticFile directly) — never build absolute filesystem paths, so the
 * project stays portable between the cloud environment and a local Mac.
 */
export const assetFile = (relativePath: string): string =>
  staticFile(`assets/${relativePath.replace(/^\/+/, "")}`);

const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "m4v"];
const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif", "avif"];
const AUDIO_EXTENSIONS = ["mp3", "wav", "m4a", "aac", "ogg"];

export type AssetKind = "video" | "image" | "audio" | "other";

export const classifyAsset = (fileName: string): AssetKind => {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (AUDIO_EXTENSIONS.includes(ext)) return "audio";
  return "other";
};
