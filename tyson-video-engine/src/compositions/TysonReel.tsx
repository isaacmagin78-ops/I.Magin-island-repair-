import React from 'react';
import {AbsoluteFill, Series, Video} from 'remotion';
import type {CaptionCue, Scene} from '../lib/types';
import {THEME} from '../config/theme';
import {Captions} from '../components/Captions';
import {KenBurnsImage, type KenBurnsImageProps} from '../components/KenBurnsImage';

const PAN_CYCLE: NonNullable<KenBurnsImageProps['pan']>[] = ['left', 'right', 'up', 'down'];

export type TysonReelProps = {
  scenes: Scene[];
  cues: CaptionCue[];
} & Record<string, unknown>;

const EmptyState: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: THEME.bg, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{color: THEME.text, fontFamily: THEME.fontFamily, fontSize: 40, textAlign: 'center', padding: 40}}>
      No photos or videos found in /assets
    </div>
  </AbsoluteFill>
);

export const TysonReel: React.FC<TysonReelProps> = ({scenes, cues}) => {
  if (scenes.length === 0) {
    return <EmptyState />;
  }

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence key={scene.asset.name} durationInFrames={scene.durationInFrames} layout="none">
            <AbsoluteFill>
              {scene.asset.kind === 'image' ? (
                <KenBurnsImage
                  src={scene.asset.src}
                  durationInFrames={scene.durationInFrames}
                  direction={index % 2 === 0 ? 'in' : 'out'}
                  pan={PAN_CYCLE[index % PAN_CYCLE.length]}
                />
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
      <Captions cues={cues} />
    </AbsoluteFill>
  );
};
