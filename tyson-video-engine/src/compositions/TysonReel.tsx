import React from 'react';
import {AbsoluteFill, Series, Img, Video} from 'remotion';
import type {Scene} from '../lib/types';
import {THEME} from '../config/theme';

export type TysonReelProps = {
  scenes: Scene[];
} & Record<string, unknown>;

const EmptyState: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: THEME.bg, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{color: THEME.text, fontFamily: THEME.fontFamily, fontSize: 40, textAlign: 'center', padding: 40}}>
      No photos or videos found in /assets
    </div>
  </AbsoluteFill>
);

export const TysonReel: React.FC<TysonReelProps> = ({scenes}) => {
  if (scenes.length === 0) {
    return <EmptyState />;
  }

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Series>
        {scenes.map((scene) => (
          <Series.Sequence key={scene.asset.name} durationInFrames={scene.durationInFrames} layout="none">
            <AbsoluteFill>
              {scene.asset.kind === 'image' ? (
                <Img src={scene.asset.src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                <Video
                  src={scene.asset.src}
                  muted
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              )}
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
