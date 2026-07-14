import React from 'react';
import {useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {THEME} from '../config/theme';

export interface ThoughtBubbleProps {
  text: string;
  /** Frame the pop-in animation begins on. */
  startFrame?: number;
  top?: number;
  left?: number;
  right?: number;
  width?: number;
}

/** Reusable "thought bubble" overlay: a cloud-style caption with a pop-in
 * spring and a trailing dot tail, usable inside any composition. */
export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({
  text,
  startFrame = 0,
  top = 140,
  left,
  right,
  width = 520,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);
  const scale = spring({frame: localFrame, fps, config: {damping: 12, stiffness: 180}});

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right: left === undefined ? (right ?? 60) : undefined,
        width,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#111111',
          fontFamily: THEME.fontFamily,
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.3,
          textAlign: 'center',
          padding: '24px 28px',
          borderRadius: 32,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        {text}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10}}>
        <div style={{width: 22, height: 22, borderRadius: '50%', backgroundColor: '#ffffff'}} />
        <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffffff', marginTop: 10}} />
      </div>
    </div>
  );
};
