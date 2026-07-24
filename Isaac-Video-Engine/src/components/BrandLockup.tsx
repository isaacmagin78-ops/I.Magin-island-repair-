/**
 * Closing brand lockup: big serif brand name over a dark scrim, with a
 * CTA line and a contact/details line. Theme-driven; used by the Legends
 * anthem and the Wildlife Center film.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  heading: string;
  ctaLine: string;
  detailLine: string;
  headingSize?: number;
};

export const BrandLockup: React.FC<Props> = ({
  theme,
  heading,
  ctaLine,
  detailLine,
  headingSize = 108,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
        background: "rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: headingSize,
          fontWeight: 700,
          letterSpacing: 20,
          textTransform: "uppercase",
          color: theme.colors.text,
          textShadow: "0 4px 40px rgba(0,0,0,0.9)",
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        {heading}
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: theme.fontFamily,
          fontSize: 34,
          letterSpacing: 5,
          color: theme.colors.primary,
          textTransform: "uppercase",
        }}
      >
        {ctaLine}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: theme.fontFamily,
          fontSize: 28,
          letterSpacing: 2,
          color: theme.colors.textMuted,
        }}
      >
        {detailLine}
      </div>
    </AbsoluteFill>
  );
};
