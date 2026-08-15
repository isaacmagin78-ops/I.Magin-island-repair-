import React from 'react';
import {Audio, interpolate} from 'remotion';

export interface BackgroundMusicProps {
  src: string;
  durationInFrames: number;
  volume?: number;
  fadeFrames?: number;
}

/** Loops (if shorter than the video) or trims (if longer) automatically via
 * Remotion's Audio `loop` prop, with a fade-in/fade-out envelope so the
 * track never cuts in or out abruptly. */
export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  durationInFrames,
  volume = 0.4,
  fadeFrames = 30,
}) => {
  return (
    <Audio
      src={src}
      loop
      volume={(frame: number) => {
        const fadeIn = interpolate(frame, [0, fadeFrames], [0, volume], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const fadeOut = interpolate(frame, [durationInFrames - fadeFrames, durationInFrames], [volume, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return Math.max(0, Math.min(fadeIn, fadeOut));
      }}
    />
  );
};
