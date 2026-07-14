/**
 * Diagnostic composition proving the social preset system actually drives
 * a render, not just data that sits unused: shows the preset's label and
 * draws its safe-zone rectangle so it can be visually confirmed against
 * the preset's declared width/height/safeZone numbers on any platform.
 */
import { AbsoluteFill } from "remotion";
import { getBrandTheme } from "../branding/themes";
import { BackgroundGradient } from "../components/BackgroundGradient";
import type { SocialPreset } from "../lib/types";

const theme = getBrandTheme("isaac-video-engine");

type Props = {
  preset: SocialPreset;
};

export const SOCIAL_PRESET_PREVIEW_DURATION_IN_FRAMES = 30;

export const SocialPresetPreview: React.FC<Props> = ({ preset }) => {
  return (
    <AbsoluteFill>
      <BackgroundGradient theme={theme} animateGlow={false} />
      <AbsoluteFill
        style={{
          top: preset.safeZone.top,
          bottom: preset.safeZone.bottom,
          left: preset.safeZone.left,
          right: preset.safeZone.right,
          border: `3px dashed ${theme.colors.accent}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 40,
            fontWeight: 800,
            color: theme.colors.text,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {preset.label}
          <br />
          {preset.width}×{preset.height} @ {preset.fps}fps
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
