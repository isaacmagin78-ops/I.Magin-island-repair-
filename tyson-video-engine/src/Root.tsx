import React from 'react';
import {Composition} from 'remotion';
import {CANVAS_WIDTH, CANVAS_HEIGHT, FPS} from './config/theme';
import {EngineTest} from './compositions/EngineTest';
import {TysonReel, type TysonReelProps} from './compositions/TysonReel';
import {buildTimeline} from './lib/timeline';
import type {Scene} from './lib/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EngineTest"
        component={EngineTest}
        durationInFrames={90}
        fps={FPS}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <Composition<any, TysonReelProps>
        id="TysonReel"
        component={TysonReel}
        fps={FPS}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        durationInFrames={FPS * 3}
        defaultProps={{scenes: [] as Scene[]}}
        calculateMetadata={async () => {
          const scenes = await buildTimeline(FPS);
          const totalFrames = scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
          return {
            durationInFrames: Math.max(totalFrames, FPS),
            props: {scenes},
          };
        }}
      />
    </>
  );
};
