/**
 * Reusable full-bleed background. Reads colors from a BrandTheme so the
 * same component produces an on-brand background for any brand without
 * code changes — swap the `theme` prop, not the component.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  /** Subtle grid overlay, matches the verification video's look. Default on. */
  showGrid?: boolean;
  /** Animate the glow intensity slowly over the scene. Default on. */
  animateGlow?: boolean;
};

export const BackgroundGradient: React.FC<Props> = ({
  theme,
  showGrid = true,
  animateGlow = true,
}) => {
  const frame = useCurrentFrame();

  const glow = animateGlow
    ? interpolate(frame, [0, 300], [0.5, 0.85], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.65;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        backgroundImage: `radial-gradient(circle at 50% 30%, ${hexToRgba(
          theme.colors.primary,
          glow * 0.25,
        )} 0%, ${hexToRgba(theme.colors.background, 0)} 55%),
          radial-gradient(circle at 50% 100%, ${hexToRgba(
            theme.colors.secondary,
            glow * 0.18,
          )} 0%, ${hexToRgba(theme.colors.background, 0)} 60%)`,
      }}
    >
      {showGrid ? (
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
