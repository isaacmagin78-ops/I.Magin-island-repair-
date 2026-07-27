/**
 * Classic broadcast-style lower third: a name/label bar anchored near the
 * bottom-left, slides/fades in and out. Useful for introducing a person,
 * location, or stat callout without covering the main subject.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate, spring } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  title: string;
  subtitle?: string;
  /** Frame (relative to this Sequence) when the exit begins. */
  exitStart?: number;
  x?: number;
  bottom?: number;
};

export const LowerThird: React.FC<Props> = ({
  theme,
  title,
  subtitle,
  exitStart,
  x = 64,
  bottom = 220,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRINGS.smooth });
  const barWidth = interpolate(entrance, [0, 1], [0, 1]);
  const textOpacity = interpolate(entrance, [0.4, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitProgress =
    exitStart !== undefined
      ? interpolate(frame, [exitStart, exitStart + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: 1 - exitProgress,
        transform: `translateX(${exitProgress * -40}px)`,
      }}
    >
      <div
        style={{
          height: 6,
          width: `${barWidth * 220}px`,
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 44,
          fontWeight: 800,
          color: theme.colors.text,
          opacity: textOpacity,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 24,
            fontWeight: 500,
            color: theme.colors.textMuted,
            opacity: textOpacity,
            letterSpacing: 1,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
