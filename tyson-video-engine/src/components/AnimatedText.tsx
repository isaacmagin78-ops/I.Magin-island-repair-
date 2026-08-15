import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {THEME} from '../config/theme';

export interface AnimatedTextProps {
  text: string;
  /** Frame (relative to the current Sequence) the animation begins on. */
  startFrame?: number;
  animation?: 'fade' | 'pop' | 'slideUp';
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

/** Reusable animated text: fades/pops/slides in with a spring, usable inside
 * any composition or Sequence. */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame = 0,
  animation = 'pop',
  fontSize = 64,
  color = THEME.text,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);
  const progress = spring({frame: localFrame, fps, config: {damping: 14, stiffness: 140}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  let transform = 'none';
  if (animation === 'pop') {
    transform = `scale(${interpolate(progress, [0, 1], [0.6, 1])})`;
  } else if (animation === 'slideUp') {
    transform = `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`;
  }

  return (
    <div
      style={{
        opacity,
        transform,
        fontFamily: THEME.fontFamily,
        fontSize,
        fontWeight: 800,
        color,
        textAlign: 'center',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
