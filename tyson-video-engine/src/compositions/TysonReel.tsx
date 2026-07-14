import React from 'react';
import {AbsoluteFill, Video} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import type {CaptionCue, Scene} from '../lib/types';
import {THEME} from '../config/theme';
import {Captions} from '../components/Captions';
import {KenBurnsImage, type KenBurnsImageProps} from '../components/KenBurnsImage';
import {computeTransitionFrames, PRESENTATION_CYCLE} from '../lib/transitions';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presentationFor = (name: 'fade' | 'slide' | 'wipe'): any => {
  if (name === 'slide') return slide();
  if (name === 'wipe') return wipe();
  return fade();
};

export const TysonReel: React.FC<TysonReelProps> = ({scenes, cues}) => {
  if (scenes.length === 0) {
    return <EmptyState />;
  }

  const transitionFrames = computeTransitionFrames(scenes);

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <TransitionSeries>
        {scenes.map((scene, index) => {
          const sceneNode = (
            <TransitionSeries.Sequence key={scene.asset.name} durationInFrames={scene.durationInFrames}>
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
            </TransitionSeries.Sequence>
          );

          if (index === scenes.length - 1) {
            return sceneNode;
          }

          const presentationName = PRESENTATION_CYCLE[index % PRESENTATION_CYCLE.length];

          return (
            <React.Fragment key={`${scene.asset.name}-group`}>
              {sceneNode}
              <TransitionSeries.Transition
                presentation={presentationFor(presentationName)}
                timing={linearTiming({durationInFrames: transitionFrames[index]})}
              />
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <Captions cues={cues} />
    </AbsoluteFill>
  );
};
