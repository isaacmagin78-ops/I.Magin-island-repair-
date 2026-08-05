/**
 * EstablishmentCard — a centered closing plate designed to sit *over* a held
 * or frozen shot rather than replace it: eyebrow, wordmark, hairline rule,
 * optional rating, tracked detail lines, a pull quote, and fine print.
 *
 * The counterpart to `MenuPlate` (which anchors to an edge mid-film) and to
 * `EditorialCard` (which paints its own full-screen background). Everything
 * staggers in, so render stills a second or so past the start.
 *
 * Type sizes are absolute and tracking is expressed in `em`, so the card
 * scales predictably by changing `wordmarkFontSize` alone.
 */
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

export type EstablishmentCardProps = {
  theme: BrandTheme;
  wordmark: string;
  eyebrow?: string;
  /** Number of filled stars to show under the rule. 0 hides the row. */
  rating?: number;
  /** Tracked uppercase detail lines, one per row. */
  lines?: string[];
  /** A pull quote in the display serif — the card's emotional beat. */
  quote?: string;
  footnote?: string;
  wordmarkFontSize?: number;
  appearAt?: number;
};

const Stagger: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: SPRINGS.smooth });
  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  theme,
  wordmark,
  eyebrow,
  rating = 0,
  lines = [],
  quote,
  footnote,
  wordmarkFontSize = 118,
  appearAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accentFont = theme.accentFontFamily ?? "Helvetica, Arial, sans-serif";
  const ruleProgress = spring({
    frame: frame - appearAt - 8,
    fps,
    config: SPRINGS.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 64px",
        color: theme.colors.text,
        pointerEvents: "none",
      }}
    >
      {eyebrow ? (
        <Stagger delay={appearAt + 2}>
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 23,
              fontWeight: 600,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: theme.colors.primary,
              marginLeft: "0.38em",
              marginBottom: 30,
              whiteSpace: "nowrap",
            }}
          >
            {eyebrow}
          </div>
        </Stagger>
      ) : null}

      <Stagger delay={appearAt + 6}>
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: wordmarkFontSize,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            lineHeight: 1,
            marginLeft: "0.09em",
            whiteSpace: "nowrap",
            textShadow: "0 8px 44px rgba(0,0,0,0.6)",
          }}
        >
          {wordmark}
        </div>
      </Stagger>

      <div
        style={{
          width: interpolate(ruleProgress, [0, 1], [0, 420]),
          height: 1,
          backgroundColor: theme.colors.primary,
          opacity: 0.9,
          margin: "34px 0 0",
        }}
      />

      {rating > 0 ? (
        <Stagger delay={appearAt + 14}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: "0.5em",
              color: theme.colors.primary,
              marginLeft: "0.5em",
              marginTop: 30,
            }}
          >
            {"★".repeat(rating)}
          </div>
        </Stagger>
      ) : null}

      {lines.length > 0 ? (
        <div style={{ marginTop: 26 }}>
          {lines.map((line, index) => (
            <Stagger key={line} delay={appearAt + 18 + index * 4}>
              <div
                style={{
                  fontFamily: accentFont,
                  fontSize: 24,
                  fontWeight: 400,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: theme.colors.textMuted,
                  marginLeft: "0.26em",
                  marginTop: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {line}
              </div>
            </Stagger>
          ))}
        </div>
      ) : null}

      {quote ? (
        <Stagger delay={appearAt + 30}>
          <div
            style={{
              fontFamily: theme.fontFamily,
              fontSize: 66,
              fontStyle: "italic",
              fontWeight: 500,
              color: theme.colors.accent,
              marginTop: 44,
              lineHeight: 1.2,
              textShadow: "0 5px 30px rgba(0,0,0,0.65)",
            }}
          >
            {quote}
          </div>
        </Stagger>
      ) : null}

      {footnote ? (
        <Stagger delay={appearAt + 40}>
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginLeft: "0.22em",
              marginTop: 48,
              opacity: 0.9,
              whiteSpace: "nowrap",
            }}
          >
            {footnote}
          </div>
        </Stagger>
      ) : null}
    </AbsoluteFill>
  );
};
