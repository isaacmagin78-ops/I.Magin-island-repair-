/**
 * Canonical output formats for the engine. Compositions and render
 * scripts should reference these instead of hard-coding dimensions so a
 * brief can simply say "vertical" / "square" / "landscape".
 */
export type VideoFormatName = "vertical" | "square" | "landscape";

export interface VideoFormat {
  width: number;
  height: number;
  fps: number;
}

export const VIDEO_FORMATS: Record<VideoFormatName, VideoFormat> = {
  vertical: { width: 1080, height: 1920, fps: 30 },
  square: { width: 1080, height: 1080, fps: 30 },
  landscape: { width: 1920, height: 1080, fps: 30 },
};

export const DEFAULT_FORMAT: VideoFormatName = "vertical";

export const secondsToFrames = (seconds: number, fps: number): number =>
  Math.round(seconds * fps);
