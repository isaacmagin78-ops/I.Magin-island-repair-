/**
 * EditorialCard — a full-frame typographic card in the understated
 * luxury-brokerage idiom: a wide-tracked eyebrow, a letterspaced serif
 * wordmark, a hairline rule, then supporting lines. Optionally carries a
 * portrait above the wordmark and a flat button beneath.
 *
 * Used for both the opening brand card and the closing contact card, so a
 * film starts and ends in the same voice as the agent's own website.
 */
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { BrandTheme } from "../lib/types";

export type EditorialCardProps = {
  theme: BrandTheme;
  eyebrow?: string;
  wordmark: string;
  /** Supporting lines under the rule, in order. */
  lines?: string[];
  /** A single emphasized line — a price, typically. */
  emphasis?: string;
  portraitSrc?: string;
  button?: string;
  footnote?: string;
  scale?: number;
};

const useRise = (delayInFrames: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [14, 0])}px)`,
  };
};

export const EditorialCard: React.FC<EditorialCardProps> = ({
  theme,
  eyebrow,
  wordmark,
  lines = [],
  emphasis,
  portraitSrc,
  button,
  footnote,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const portraitSpring = spring({ frame, fps, config: { damping: 200, mass: 0.7 } });
  const ruleWidth = interpolate(
    spring({ frame: frame - 16, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 260 * scale],
  );

  const eyebrowStyle = useRise(4);
  const wordmarkStyle = useRise(8);
  const emphasisStyle = useRise(26);
  const buttonStyle = useRise(32);
  const footnoteStyle = useRise(38);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: theme.fontFamily,
        color: theme.colors.text,
        textAlign: "center",
        padding: 60 * scale,
      }}
    >
      {portraitSrc ? (
        <Img
          src={staticFile(portraitSrc)}
          style={{
            width: 132 * scale,
            height: 132 * scale,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "50% 18%",
            border: `${1.5 * scale}px solid ${theme.colors.primary}`,
            marginBottom: 26 * scale,
            opacity: portraitSpring,
            transform: `scale(${interpolate(portraitSpring, [0, 1], [0.9, 1])})`,
          }}
        />
      ) : null}

      {eyebrow ? (
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12 * scale,
            letterSpacing: `${0.34 * scale}em`,
            textTransform: "uppercase",
            color: theme.colors.textMuted,
            marginBottom: 18 * scale,
            ...eyebrowStyle,
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          fontSize: 58 * scale,
          letterSpacing: `${0.16 * scale}em`,
          textTransform: "uppercase",
          lineHeight: 1.1,
          fontWeight: 400,
          ...wordmarkStyle,
        }}
      >
        {wordmark}
      </div>

      <div
        style={{
          width: ruleWidth,
          height: 1,
          backgroundColor: theme.colors.primary,
          margin: `${26 * scale}px 0`,
        }}
      />

      {lines.map((line, index) => (
        <LineItem
          key={line}
          text={line}
          theme={theme}
          scale={scale}
          delayInFrames={20 + index * 5}
        />
      ))}

      {emphasis ? (
        <div
          style={{
            fontSize: 34 * scale,
            marginTop: 16 * scale,
            letterSpacing: `${0.04 * scale}em`,
            ...emphasisStyle,
          }}
        >
          {emphasis}
        </div>
      ) : null}

      {button ? (
        <div
          style={{
            marginTop: 30 * scale,
            padding: `${13 * scale}px ${36 * scale}px`,
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12 * scale,
            letterSpacing: `${0.26 * scale}em`,
            textTransform: "uppercase",
            ...buttonStyle,
          }}
        >
          {button}
        </div>
      ) : null}

      {footnote ? (
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12 * scale,
            letterSpacing: `${0.2 * scale}em`,
            textTransform: "uppercase",
            color: theme.colors.textMuted,
            marginTop: 26 * scale,
            ...footnoteStyle,
          }}
        >
          {footnote}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const LineItem: React.FC<{
  text: string;
  theme: BrandTheme;
  scale: number;
  delayInFrames: number;
}> = ({ text, theme, scale, delayInFrames }) => {
  const style = useRise(delayInFrames);

  return (
    <div
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 15 * scale,
        letterSpacing: `${0.22 * scale}em`,
        textTransform: "uppercase",
        color: theme.colors.secondary,
        marginTop: 9 * scale,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
