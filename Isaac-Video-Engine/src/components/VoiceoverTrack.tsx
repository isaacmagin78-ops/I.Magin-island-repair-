/**
 * Foreground voiceover/narration track. Meant to be placed inside a
 * <Sequence> matching the line's on-screen window so it lines up with
 * captions; also the thing BackgroundMusic ducks around (pass this
 * Sequence's [from, from + durationInFrames] into BackgroundMusic's
 * `duckDuringRanges`).
 *
 * `durationInFrames` must be passed explicitly (matching the enclosing
 * Sequence's length) rather than read from useVideoConfig — inside a
 * Sequence, useCurrentFrame() is already local to that Sequence, but
 * useVideoConfig().durationInFrames is still the *whole composition's*
 * duration, which would make any fadeOutFrames on this track compute
 * against the wrong length.
 */
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { computeTrackVolume } from "../lib/audio";
import type { AudioTrackSpec } from "../lib/types";

type Props = {
  track: AudioTrackSpec;
  durationInFrames: number;
};

export const VoiceoverTrack: React.FC<Props> = ({ track, durationInFrames }) => {
  const frame = useCurrentFrame();
  const volume = computeTrackVolume({ frame, durationInFrames, track });

  return (
    <Audio src={staticFile(track.src)} volume={volume} startFrom={track.startFrom} />
  );
};
