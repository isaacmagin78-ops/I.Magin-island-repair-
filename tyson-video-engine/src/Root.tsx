import React from 'react';
import {Composition} from 'remotion';
import {CANVAS_WIDTH, CANVAS_HEIGHT, FPS} from './config/theme';
import {EngineTest} from './compositions/EngineTest';

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
    </>
  );
};
