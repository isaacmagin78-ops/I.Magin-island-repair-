/**
 * The render target for the auto pipeline (Phase 6 / `npm run render:short`).
 * Takes fully-formed props (scenes discovered from assets/, optional music,
 * optional branding) and assembles them with the Phase 2-5 components. This
 * component contains no Tyson-specific or brand-specific logic — every
 * brand-facing detail arrives via props, so the exact same composition
 * renders Tyson's Time, Tyson's Picks, IMagin Concierge, or any future
 * brand's short.
 *
 * Duration is computed from props via `calculateMetadata`, since the
 * number and length of scenes isn't known until the pipeline script
 * discovers media in assets/.
 */
import { AbsoluteFill, CalculateMetadataFunction, Sequence } from "remotion";
import { Timeline, computeTimelineDurationInFrames } from "../components/Timeline";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { LogoWatermark } from "../components/LogoWatermark";
import { EndCard } from "../components/EndCard";
import { CTAScreen } from "../components/CTAScreen";
import { AnimatedCaptions, type Caption } from "../components/AnimatedCaptions";
import { getBrandTheme } from "../branding/themes";
import { getSocialPreset } from "../presets/social";
import type { AudioTrackSpec, Scene, SocialPresetName } from "../lib/types";

export type AutoShortProps = {
  scenes: Scene[];
  music?: AudioTrackSpec;
  brandId?: string;
  preset?: SocialPresetName;
  /** Overrides the brand theme's logo path (e.g. a logo found in assets/logos/). */
  logoOverride?: string;
  /** Word-timed captions spanning the whole video, e.g. from a local script. */
  captions?: Caption[];
  /** Shown as a closing beat after all scenes. Omit for no end card. */
  endCardText?: string;
  /** If set, shown as a CTA beat before the end card. */
  ctaHeadline?: string;
  ctaButtonLabel?: string;
};

const END_CARD_DURATION_IN_FRAMES = 60;
const CTA_DURATION_IN_FRAMES = 60;

export const calculateAutoShortMetadata: CalculateMetadataFunction<
  AutoShortProps
> = ({ props }) => {
  const preset = getSocialPreset(props.preset ?? "tiktok");
  const scenesDuration = computeTimelineDurationInFrames(props.scenes);
  const ctaDuration = props.ctaHeadline ? CTA_DURATION_IN_FRAMES : 0;
  const endCardDuration = props.endCardText ? END_CARD_DURATION_IN_FRAMES : 0;

  return {
    durationInFrames: Math.max(
      1,
      scenesDuration + ctaDuration + endCardDuration,
    ),
    fps: preset.fps,
    width: preset.width,
    height: preset.height,
  };
};

export const AutoShort: React.FC<AutoShortProps> = ({
  scenes,
  music,
  brandId,
  preset: presetName,
  logoOverride,
  captions,
  endCardText,
  ctaHeadline,
  ctaButtonLabel,
}) => {
  const baseTheme = getBrandTheme(brandId);
  const theme = logoOverride ? { ...baseTheme, logo: logoOverride } : baseTheme;
  const preset = getSocialPreset(presetName ?? "tiktok");
  const scenesDuration = computeTimelineDurationInFrames(scenes);

  return (
    <AbsoluteFill>
      <Timeline scenes={scenes} />

      {music ? <BackgroundMusic track={music} /> : null}

      {captions && captions.length > 0 ? (
        <Sequence from={0} durationInFrames={scenesDuration}>
          <AnimatedCaptions captions={captions} theme={theme} position="bottom" />
        </Sequence>
      ) : null}

      <LogoWatermark theme={theme} safeZone={preset.safeZone} />

      {ctaHeadline ? (
        <Sequence from={scenesDuration} durationInFrames={CTA_DURATION_IN_FRAMES}>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            <CTAScreen
              theme={theme}
              headline={ctaHeadline}
              buttonLabel={ctaButtonLabel ?? "Follow for more"}
            />
          </AbsoluteFill>
        </Sequence>
      ) : null}

      {endCardText ? (
        <Sequence
          from={scenesDuration + (ctaHeadline ? CTA_DURATION_IN_FRAMES : 0)}
          durationInFrames={END_CARD_DURATION_IN_FRAMES}
        >
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            <EndCard theme={theme} text={endCardText} />
          </AbsoluteFill>
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
