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
import {
  AudioTest,
  AUDIO_TEST_DURATION_IN_FRAMES,
} from "./compositions/AudioTest";
import {
  SocialPresetPreview,
  SOCIAL_PRESET_PREVIEW_DURATION_IN_FRAMES,
} from "./compositions/SocialPresetPreview";
import { listSocialPresets } from "./presets/social";

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
      <Composition
        id="AudioTest"
        component={AudioTest}
        durationInFrames={AUDIO_TEST_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      {listSocialPresets().map((preset) => (
        <Composition
          key={preset.name}
          id={`SocialPreset-${preset.name}`}
          component={SocialPresetPreview}
          durationInFrames={SOCIAL_PRESET_PREVIEW_DURATION_IN_FRAMES}
          fps={preset.fps}
          width={preset.width}
          height={preset.height}
          defaultProps={{ preset }}
        />
      ))}
    </>
  );
};
