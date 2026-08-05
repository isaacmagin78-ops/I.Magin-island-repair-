/**
 * ImpactSlate — full-bleed heavy-condensed typography for a smash cut: a
 * tracked kicker, one enormous headline, and an optional sub-line, all
 * slammed in over whatever is playing behind.
 *
 * This is the loud counterpart to `MenuCaption`. Give the headline a
 * `hitAt` and it lands with a scale-down snap plus a one-frame flash, which
 * is what sells a hard cut. Colors and the impact face come from the theme,
 * so the same slate reads as "meme" or "broadcast" depending on the brand.
 */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { BrandTheme } from "../lib/types";

export type ImpactSlateProps = {
  theme: BrandTheme;
  headline: string;
  kicker?: string;
  sub?: string;
  /** Frame (relative to the enclosing Sequence) when the slate hits. */
  hitAt?: number;
  exitAt?: number;
  headlineFontSize?: number;
  /** White flash frames on impact. 0 disables. */
  flashFrames?: number;
  /** Darkens the footage behind so the type stays punchy. */
  scrimOpacity?: number;
};

export const ImpactSlate: React.FC<ImpactSlateProps> = ({
  theme,
  headline,
  kicker,
  sub,
  hitAt = 0,
  exitAt,
  headlineFontSize = 168,
  flashFrames = 2,
  scrimOpacity = 0.38,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - hitAt;

  const hit = spring({
    frame: t,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.5 },
  });
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const opacity = interpolate(hit, [0, 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * (1 - exit);

  if (t < 0 || opacity <= 0.001) return null;

  // Slams down from oversized to true size.
  const scale = interpolate(hit, [0, 1], [1.35, 1]);
  const impactFont = theme.impactFontFamily ?? "'Arial Narrow', Impact, sans-serif";
  const accentFont = theme.accentFontFamily ?? "Helvetica, Arial, sans-serif";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: scrimOpacity * opacity }} />

      {t < flashFrames ? (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffffff",
            opacity: interpolate(t, [0, flashFrames], [0.72, 0], {
              extrapolateRight: "clamp",
            }),
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 70px",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {kicker ? (
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: theme.colors.primary,
              marginLeft: "0.44em",
              marginBottom: 26,
            }}
          >
            {kicker}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: impactFont,
            fontSize: headlineFontSize,
            fontWeight: 400,
            lineHeight: 0.94,
            letterSpacing: "0.005em",
            textTransform: "uppercase",
            color: theme.colors.text,
            textShadow: "0 10px 46px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)",
          }}
        >
          {headline}
        </div>

        {sub ? (
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginLeft: "0.24em",
              marginTop: 30,
              textShadow: "0 4px 20px rgba(0,0,0,0.85)",
            }}
          >
            {sub}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
