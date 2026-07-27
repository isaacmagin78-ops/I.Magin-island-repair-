/**
 * One-shot sound effect (whoosh, pop, ding). Place inside a <Sequence> at
 * the frame it should fire — no fade by default, since SFX are usually
 * short and meant to hit immediately, but a fade can be added via `track`.
 *
 * `durationInFrames` must be passed explicitly (the enclosing Sequence's
 * length) — see VoiceoverTrack for why useVideoConfig's duration would be
 * wrong here.
 */
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { computeTrackVolume } from "../lib/audio";
import type { AudioTrackSpec } from "../lib/types";

type Props = {
  track: AudioTrackSpec;
  durationInFrames: number;
};

export const SoundEffect: React.FC<Props> = ({ track, durationInFrames }) => {
  const frame = useCurrentFrame();
  const volume = computeTrackVolume({ frame, durationInFrames, track });

  return (
    <Audio src={staticFile(track.src)} volume={volume} startFrom={track.startFrom} />
  );
};
