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
import { TysonVsMiss, TYSON_VS_MISS_DURATION } from "./compositions/TysonVsMiss";
import { MissTsFineDining, MISS_TS_DURATION } from "./compositions/MissTsFineDining";
import {
  MissTsPoster,
  MISS_TS_POSTER_DURATION,
  MISS_TS_POSTER_HEIGHT,
  MISS_TS_POSTER_WIDTH,
} from "./compositions/MissTsPoster";
import { AutoShort, calculateAutoShortMetadata } from "./compositions/AutoShort";
import {
  LegendsAnthem,
  ANTHEM_DURATION_IN_FRAMES,
  ANTHEM_FPS,
} from "./compositions/LegendsAnthem";
import {
  WildlifeCenterFilm,
  WILDLIFE_DURATION_IN_FRAMES,
  WILDLIFE_FPS,
} from "./compositions/WildlifeCenterFilm";

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
        id="TysonVsMiss"
        component={TysonVsMiss}
        durationInFrames={TYSON_VS_MISS_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="MissTsFineDining"
        component={MissTsFineDining}
        durationInFrames={MISS_TS_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="MissTsPoster"
        component={MissTsPoster}
        durationInFrames={MISS_TS_POSTER_DURATION}
        fps={VIDEO_FPS}
        width={MISS_TS_POSTER_WIDTH}
        height={MISS_TS_POSTER_HEIGHT}
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
      <Composition
        id="LegendsAnthem"
        component={LegendsAnthem}
        durationInFrames={ANTHEM_DURATION_IN_FRAMES}
        fps={ANTHEM_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="WildlifeCenterFilm"
        component={WildlifeCenterFilm}
        durationInFrames={WILDLIFE_DURATION_IN_FRAMES}
        fps={WILDLIFE_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="AutoShort"
        component={AutoShort}
        calculateMetadata={calculateAutoShortMetadata}
        durationInFrames={1}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ scenes: [] }}
      />
    </>
  );
};
