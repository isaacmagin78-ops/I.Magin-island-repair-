/**
 * Filmic lower-screen title: small-caps headline in the brand's accent
 * color with an optional sub-line, fading in with a slight rise and
 * fading out before the scene ends. Theme-driven like every component —
 * no brand colors or fonts are hardcoded here.
 */
import { interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  title: string;
  subtitle?: string;
  /** Frame (local to the enclosing Sequence) when the title starts appearing. */
  appearAt?: number;
  /** Frame (local) when the title starts fading out. */
  fadeOutAt?: number;
  size?: number;
};

export const CinematicTitle: React.FC<Props> = ({
  theme,
  title,
  subtitle,
  appearAt = 12,
  fadeOutAt,
  size = 44,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [appearAt, appearAt + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = fadeOutAt
    ? interpolate(frame, [fadeOutAt, fadeOutAt + 15], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const rise = interpolate(frame, [appearAt, appearAt + 18], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: fadeIn * fadeOut,
        transform: `translateY(${rise}px)`,
        textAlign: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: theme.colors.accent,
          textShadow: "0 2px 24px rgba(0,0,0,0.85)",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: size * 0.52,
            fontStyle: "italic",
            color: theme.colors.text,
            textShadow: "0 2px 18px rgba(0,0,0,0.85)",
            letterSpacing: 1.5,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
