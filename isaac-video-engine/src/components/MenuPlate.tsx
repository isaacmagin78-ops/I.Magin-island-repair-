/**
 * MenuPlate — a restaurant-menu-style identity plate that sits *over* footage
 * rather than replacing it: hairline rule, tracked eyebrow, letterspaced
 * serif wordmark, second hairline rule, tracked subline.
 *
 * Distinct from `EditorialCard` (a full-frame card that owns the whole
 * screen). Use this when the footage has to keep playing underneath — brand
 * plates, venue titles, "chapter" markers.
 *
 * Fully theme-driven: colors and all three faces come from `BrandTheme`.
 */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

export type MenuPlateProps = {
  theme: BrandTheme;
  wordmark: string;
  eyebrow?: string;
  subline?: string;
  /** Which edge the plate is anchored to. */
  position?: "top" | "bottom";
  /** Distance from that edge, in px. */
  offset?: number;
  /** Frame (relative to the enclosing Sequence) when the plate appears. */
  appearAt?: number;
  /** Frame when the plate starts fading out. Omit to hold to the end. */
  exitAt?: number;
  wordmarkFontSize?: number;
  /** Adds a soft dark scrim behind the plate so light footage stays legible. */
  scrim?: boolean;
};

const RULE_MAX = 300;

export const MenuPlate: React.FC<MenuPlateProps> = ({
  theme,
  wordmark,
  eyebrow,
  subline,
  position = "bottom",
  offset = 210,
  appearAt = 0,
  exitAt,
  wordmarkFontSize = 96,
  scrim = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - appearAt;

  const entrance = spring({ frame: t, fps, config: SPRINGS.smooth });
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const opacity = entrance * (1 - exit);

  if (t < 0 || opacity <= 0.001) return null;

  const ruleWidth = interpolate(entrance, [0, 1], [0, RULE_MAX]);
  const rise = interpolate(entrance, [0, 1], [26, 0]) + exit * 12;
  const accentFont = theme.accentFontFamily ?? "Helvetica, Arial, sans-serif";

  const rule = (
    <div
      style={{
        width: ruleWidth,
        height: 1,
        backgroundColor: theme.colors.primary,
        opacity: 0.85,
      }}
    />
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {scrim ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [position]: 0,
            height: 720,
            opacity,
            background: `linear-gradient(to ${position === "bottom" ? "top" : "bottom"}, rgba(6,5,4,0.86) 0%, rgba(6,5,4,0.55) 42%, rgba(6,5,4,0) 100%)`,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [position]: offset,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity,
          transform: `translateY(${position === "bottom" ? rise : -rise}px)`,
        }}
      >
        {rule}

        {eyebrow ? (
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: theme.colors.primary,
              marginLeft: "0.42em", // optical: cancel trailing tracking
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: wordmarkFontSize,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: theme.colors.text,
            lineHeight: 1,
            marginLeft: "0.1em",
            textShadow: "0 6px 34px rgba(0,0,0,0.55)",
          }}
        >
          {wordmark}
        </div>

        {rule}

        {subline ? (
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 21,
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginLeft: "0.3em",
            }}
          >
            {subline}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
