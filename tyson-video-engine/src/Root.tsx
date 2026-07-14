import React from 'react';
import {Composition} from 'remotion';
import {CANVAS_WIDTH, CANVAS_HEIGHT, FPS} from './config/theme';
import {EngineTest} from './compositions/EngineTest';
import {TysonReel, type TysonReelProps} from './compositions/TysonReel';
import {ComponentsDemo} from './compositions/ComponentsDemo';
import {buildTimeline} from './lib/timeline';
import {listCaptionAssets, listMusicAssets, listLogoAssets} from './lib/assetLoader';
import {buildCaptionCues} from './lib/captions';
import {computeTransitionFrames, totalDurationWithTransitions} from './lib/transitions';
import type {CaptionCue, Scene} from './lib/types';

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
      <Composition
        id="ComponentsDemo"
        component={ComponentsDemo}
        durationInFrames={60}
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
        defaultProps={{scenes: [] as Scene[], cues: [] as CaptionCue[]}}
        calculateMetadata={async () => {
          const scenes = await buildTimeline(FPS);
          const transitionFrames = computeTransitionFrames(scenes);
          const totalFrames = Math.max(totalDurationWithTransitions(scenes, transitionFrames), FPS);
          const cues = await buildCaptionCues(listCaptionAssets()[0], totalFrames, FPS);
          const musicSrc = listMusicAssets()[0]?.src;
          const logoSrc = listLogoAssets()[0]?.src;
          return {
            durationInFrames: totalFrames,
            props: {scenes, cues, musicSrc, logoSrc},
          };
        }}
      />
    </>
  );
};
