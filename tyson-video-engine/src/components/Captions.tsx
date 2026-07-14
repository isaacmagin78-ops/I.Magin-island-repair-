import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {CaptionCue} from '../lib/types';
import {THEME} from '../config/theme';

export const Captions: React.FC<{cues: CaptionCue[]}> = ({cues}) => {
  const frame = useCurrentFrame();
  const active = cues.find((c) => frame >= c.startFrame && frame < c.endFrame);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        bottom: 220,
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          backgroundColor: THEME.captionBg,
          color: THEME.text,
          fontFamily: THEME.fontFamily,
          fontSize: 46,
          fontWeight: 700,
          lineHeight: 1.3,
          padding: '14px 28px',
          borderRadius: 14,
        }}
      >
        {active.text}
      </span>
    </div>
  );
};
