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
import { AutoShort, calculateAutoShortMetadata } from "./compositions/AutoShort";
import {
  SeaMonarchFilm,
  SEA_MONARCH_FILM_DURATION_IN_FRAMES,
} from "./compositions/SeaMonarchFilm";
import {
  ListingFilm,
  SEA_MONARCH_611_DURATION_IN_FRAMES,
  SEA_MONARCH_611_PROPS,
  SEA_MONARCH_611_VERTICAL_PROPS,
} from "./compositions/ListingFilm";
import { PropertyFilm } from "./compositions/PropertyFilm";
import { propertyFilmDuration } from "./lib/property-film";
import { SEA_MONARCH_611 } from "./listings/sea-monarch-611";

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
      <Composition
        id="SeaMonarch611"
        component={ListingFilm}
        durationInFrames={SEA_MONARCH_611_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={1280}
        height={720}
        defaultProps={SEA_MONARCH_611_PROPS}
      />
      <Composition
        id="SeaMonarch611Vertical"
        component={ListingFilm}
        durationInFrames={SEA_MONARCH_611_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={SEA_MONARCH_611_VERTICAL_PROPS}
      />
      <Composition
        id="SeaMonarchFilm"
        component={SeaMonarchFilm}
        durationInFrames={SEA_MONARCH_FILM_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{ orientation: "landscape" as const }}
      />
      <Composition
        id="SeaMonarchFilmVertical"
        component={SeaMonarchFilm}
        durationInFrames={SEA_MONARCH_FILM_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ orientation: "vertical" as const }}
      />
      {/* The same cut as SeaMonarchFilm above, driven by a listing spec
          instead of frame constants. Every listing after this one registers
          here as a spec pair and needs no new composition file. */}
      <Composition
        id="PropertyFilm-SeaMonarch611"
        component={PropertyFilm}
        durationInFrames={propertyFilmDuration(SEA_MONARCH_611)}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{
          spec: SEA_MONARCH_611,
          orientation: "landscape" as const,
        }}
      />
      <Composition
        id="PropertyFilm-SeaMonarch611Vertical"
        component={PropertyFilm}
        durationInFrames={propertyFilmDuration(SEA_MONARCH_611)}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          spec: SEA_MONARCH_611,
          orientation: "vertical" as const,
        }}
      />
    </>
  );
};
