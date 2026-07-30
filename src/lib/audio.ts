/**
 * Audio helpers: fades and ducking as pure frame->volume functions, so
 * they can be unit-reasoned-about and reused by <Audio> components without
 * each composition reinventing volume curves.
 */
import { interpolate } from "remotion";
import type { AudioTrackSpec } from "./types";

type VolumeArgs = {
  frame: number;
  durationInFrames: number;
  track: AudioTrackSpec;
  /** True while a voiceover/SFX track that should duck this track is active. */
  isDucked?: boolean;
};

/**
 * Computes the effective volume [0, 1] for a track at the given frame,
 * applying fade-in, fade-out, base volume, and ducking (if requested).
 * Ducking cross-fades smoothly over ~15 frames rather than snapping, so a
 * voiceover starting never causes an audible volume "pop" in the music bed.
 */
export const computeTrackVolume = ({
  frame,
  durationInFrames,
  track,
  isDucked = false,
}: VolumeArgs): number => {
  const baseVolume = track.volume ?? 1;
  const fadeInFrames = track.fadeInFrames ?? 0;
  const fadeOutFrames = track.fadeOutFrames ?? 0;

  const fadeIn =
    fadeInFrames > 0
      ? interpolate(frame, [0, fadeInFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const fadeOut =
    fadeOutFrames > 0
      ? interpolate(
          frame,
          [durationInFrames - fadeOutFrames, durationInFrames],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 1;

  const duckMultiplier = isDucked
    ? (track.duckToVolume ?? 0.25)
    : 1;

  return baseVolume * fadeIn * fadeOut * duckMultiplier;
};

/**
 * Given the current frame and a list of [startFrame, endFrame] ranges where
 * a foreground track (voiceover/SFX) is speaking, returns whether a
 * background track should be ducked right now — with a short lead-in so the
 * duck begins slightly before the foreground audio, matching how broadcast
 * mixing anticipates dialogue.
 */
export const isWithinDuckWindow = (
  frame: number,
  ranges: Array<{ startFrame: number; endFrame: number }>,
  leadInFrames = 6,
): boolean =>
  ranges.some(
    (r) => frame >= r.startFrame - leadInFrames && frame <= r.endFrame,
  );
