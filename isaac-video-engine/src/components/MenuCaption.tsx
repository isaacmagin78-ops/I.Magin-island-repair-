/**
 * MenuCaption — an editorial caption line set in the brand's display serif,
 * with an optional hairline ornament above it and a gradient scrim so it
 * stays readable over bright footage.
 *
 * This is the narration voice for footage-led films: one thought at a time,
 * anchored top or bottom, fading in and out on its own schedule. It differs
 * from `Subtitle`/`AnimatedCaptions` (which track spoken words) — a
 * MenuCaption is written copy placed by the editor.
 */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

export type MenuCaptionProps = {
  theme: BrandTheme;
  /** One entry per line; lines are centered and stacked. */
  lines: string[];
  position?: "top" | "bottom";
  offset?: number;
  appearAt?: number;
  /** Frame when the caption starts fading out. Omit to hold to the end. */
  exitAt?: number;
  fontSize?: number;
  italic?: boolean;
  /** Small tracked label above the lines, e.g. a course or chapter name. */
  kicker?: string;
  ornament?: boolean;
  scrim?: boolean;
};

export const MenuCaption: React.FC<MenuCaptionProps> = ({
  theme,
  lines,
  position = "top",
  offset = 250,
  appearAt = 0,
  exitAt,
  fontSize = 72,
  italic = false,
  kicker,
  ornament = true,
  scrim = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - appearAt;

  const entrance = spring({ frame: t, fps, config: SPRINGS.smooth });
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const opacity = entrance * (1 - exit);

  if (t < 0 || opacity <= 0.001) return null;

  const rise = interpolate(entrance, [0, 1], [22, 0]) + exit * 10;
  const accentFont = theme.accentFontFamily ?? "Helvetica, Arial, sans-serif";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {scrim ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [position]: 0,
            height: 780,
            opacity: opacity * 0.95,
            background: `linear-gradient(to ${position === "top" ? "bottom" : "top"}, rgba(6,5,4,0.82) 0%, rgba(6,5,4,0.5) 46%, rgba(6,5,4,0) 100%)`,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          [position]: offset,
          textAlign: "center",
          opacity,
          transform: `translateY(${position === "top" ? -rise : rise}px)`,
        }}
      >
        {kicker ? (
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: theme.colors.primary,
              marginLeft: "0.38em",
              marginBottom: 22,
            }}
          >
            {kicker}
          </div>
        ) : null}

        {ornament ? (
          <div
            style={{
              width: interpolate(entrance, [0, 1], [0, 86]),
              height: 1,
              backgroundColor: theme.colors.primary,
              opacity: 0.8,
              margin: "0 auto 26px",
            }}
          />
        ) : null}

        {lines.map((line) => (
          <div
            key={line}
            style={{
              fontFamily: theme.fontFamily,
              fontSize,
              fontWeight: 500,
              fontStyle: italic ? "italic" : "normal",
              lineHeight: 1.24,
              color: theme.colors.text,
              letterSpacing: "-0.005em",
              textShadow: "0 5px 30px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
