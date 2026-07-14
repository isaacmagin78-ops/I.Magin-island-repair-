import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, interpolate} from 'remotion';

export interface KenBurnsImageProps {
  src: string;
  durationInFrames: number;
  /** Zoom in over the duration, or start zoomed-in and ease out. */
  direction?: 'in' | 'out';
  pan?: 'left' | 'right' | 'up' | 'down' | 'none';
  startScale?: number;
  endScale?: number;
}

const PAN_DISTANCE_PX = 50;

/** Reusable Ken Burns pan/zoom wrapper for a static image, driven purely by
 * the current frame — safe to use inside any Sequence. */
export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  durationInFrames,
  direction = 'in',
  pan = 'none',
  startScale,
  endScale,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const from = startScale ?? (direction === 'in' ? 1.0 : 1.15);
  const to = endScale ?? (direction === 'in' ? 1.15 : 1.0);
  const scale = interpolate(progress, [0, 1], [from, to]);

  let translateX = 0;
  let translateY = 0;
  if (pan === 'left') translateX = interpolate(progress, [0, 1], [PAN_DISTANCE_PX, -PAN_DISTANCE_PX]);
  if (pan === 'right') translateX = interpolate(progress, [0, 1], [-PAN_DISTANCE_PX, PAN_DISTANCE_PX]);
  if (pan === 'up') translateY = interpolate(progress, [0, 1], [PAN_DISTANCE_PX, -PAN_DISTANCE_PX]);
  if (pan === 'down') translateY = interpolate(progress, [0, 1], [-PAN_DISTANCE_PX, PAN_DISTANCE_PX]);

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: 'center center',
        }}
      />
    </AbsoluteFill>
  );
};
