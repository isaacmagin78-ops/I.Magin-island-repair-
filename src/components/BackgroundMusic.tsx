/**
 * Background music bed for a composition. Applies fade in/out from
 * lib/audio, and ducks under any active voiceover/SFX window it's told
 * about — so a single component handles "play music under everything,
 * get quieter when someone's talking" instead of every composition
 * hand-rolling volume curves.
 */
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { computeTrackVolume, isWithinDuckWindow } from "../lib/audio";
import type { AudioTrackSpec } from "../lib/types";

type Props = {
  track: AudioTrackSpec;
  /** Frame ranges (e.g. voiceover lines) that should duck this music. */
  duckDuringRanges?: Array<{ startFrame: number; endFrame: number }>;
};

export const BackgroundMusic: React.FC<Props> = ({
  track,
  duckDuringRanges = [],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const isDucked = isWithinDuckWindow(frame, duckDuringRanges);
  const volume = computeTrackVolume({
    frame,
    durationInFrames,
    track,
    isDucked,
  });

  return (
    <Audio
      src={staticFile(track.src)}
      volume={volume}
      startFrom={track.startFrom}
    />
  );
};
