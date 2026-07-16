/**
 * Call-to-action screen: headline + button-shaped label + optional
 * secondary line. Meant to be the final beat before/instead of an EndCard,
 * e.g. "Follow for more" / "Visit the link in bio".
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  headline: string;
  buttonLabel: string;
  secondaryText?: string;
};

export const CTAScreen: React.FC<Props> = ({
  theme,
  headline,
  buttonLabel,
  secondaryText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRINGS.smooth });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [36, 0]);

  const pulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "0 72px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 60,
          fontWeight: 800,
          color: theme.colors.text,
          lineHeight: 1.1,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 32,
          fontWeight: 700,
          color: "#ffffff",
          padding: "20px 48px",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          boxShadow: `0 0 40px ${theme.colors.primary}80`,
          transform: `scale(${pulse})`,
        }}
      >
        {buttonLabel}
      </div>
      {secondaryText ? (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 24,
            color: theme.colors.textMuted,
            letterSpacing: 1,
          }}
        >
          {secondaryText}
        </div>
      ) : null}
    </div>
  );
};
