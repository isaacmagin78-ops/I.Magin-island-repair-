import { Composition } from "remotion";
import {
  IsaacVideoEngineTest,
  TOTAL_DURATION_IN_FRAMES,
} from "./compositions/IsaacVideoEngineTest";
import {
  ComponentShowcase,
  SHOWCASE_DURATION_IN_FRAMES,
} from "./compositions/ComponentShowcase";
import {
  MotionTest,
  MOTION_TEST_DURATION_IN_FRAMES,
} from "./compositions/MotionTest";

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="IsaacVideoEngineTest"
        component={IsaacVideoEngineTest}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="ComponentShowcase"
        component={ComponentShowcase}
        durationInFrames={SHOWCASE_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="MotionTest"
        component={MotionTest}
        durationInFrames={MOTION_TEST_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
