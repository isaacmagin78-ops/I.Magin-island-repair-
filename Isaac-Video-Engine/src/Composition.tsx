import { Composition } from "remotion";
import {
  IsaacVideoEngineTest,
  TOTAL_DURATION_IN_FRAMES,
} from "./compositions/IsaacVideoEngineTest";

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const MyComposition = () => {
  return (
    <Composition
      id="IsaacVideoEngineTest"
      component={IsaacVideoEngineTest}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
