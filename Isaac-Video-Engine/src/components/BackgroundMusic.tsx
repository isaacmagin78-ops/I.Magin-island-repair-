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
  /**
   * Pass when mounting inside a <Sequence> that is shorter than the
   * composition (e.g. music that enters late): useVideoConfig() still
   * reports the whole composition's duration there, which would make
   * fadeOutFrames complete after the Sequence has already ended — same
   * rationale as VoiceoverTrack. Defaults to the composition duration.
   */
  durationInFrames?: number;
};

export const BackgroundMusic: React.FC<Props> = ({
  track,
  duckDuringRanges = [],
  durationInFrames: durationOverride,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames: compositionDuration } = useVideoConfig();
  const durationInFrames = durationOverride ?? compositionDuration;

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
