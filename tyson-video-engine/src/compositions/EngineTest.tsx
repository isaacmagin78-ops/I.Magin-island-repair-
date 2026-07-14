import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {THEME} from '../config/theme';

export const EngineTest: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const pulse = 1 + 0.05 * Math.sin(frame / 8);

  return (
    <AbsoluteFill style={{backgroundColor: THEME.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          opacity,
          transform: `scale(${pulse})`,
          color: THEME.accent,
          fontFamily: THEME.fontFamily,
          fontSize: 72,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Tyson Video Engine
        <div style={{color: THEME.text, fontSize: 32, marginTop: 24, fontWeight: 400}}>
          Frame {frame} / {durationInFrames}
        </div>
      </div>
    </AbsoluteFill>
  );
};
