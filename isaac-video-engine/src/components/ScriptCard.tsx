/**
 * ScriptCard — one line of a written script, held on screen as the whole
 * frame. The unit a text-only ("faceless") video is built from.
 *
 * `Title`/`Subtitle` are single elements a composition positions itself;
 * `EditorialCard` is a brand/contact card (nowrap wordmark, portrait,
 * button). Neither can take an arbitrary sentence from a text file and
 * guarantee it lands legibly inside a platform's safe zone. That is this
 * component's whole job:
 *
 * - **It sizes itself to the words.** A long sentence steps down through a
 *   fixed type scale rather than overflowing — nothing in between, per the
 *   design direction, and deterministic so a render is reproducible.
 * - **It centres optically, not geometrically.** Platform safe zones are
 *   lopsided (TikTok reserves ~180px on the right for buttons, ~40px on the
 *   left). Insetting by each side separately would push centred type
 *   visibly off-axis, so the larger horizontal inset is mirrored to both
 *   sides — the text stays centred *and* clear of the chrome.
 * - **It scales with the canvas**, so the same card reads at 1080×1920,
 *   1080×1080 or 1920×1080 without per-preset sizes.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { beatMotion, entranceMotion, SPRINGS } from "../lib/motion";
import type { BrandTheme, SafeZone } from "../lib/types";

type Props = {
  theme: BrandTheme;
  /** The line itself. The one thing the viewer is meant to read. */
  statement: string;
  /** Optional quieter lines beneath it. */
  supportingLines?: string[];
  /** Optional wide-tracked micro-label above the statement. */
  eyebrow?: string;
  /** How long this card is on screen — the exit is timed off the end. */
  durationInFrames: number;
  /** Keeps the card clear of platform UI chrome. */
  safeZone?: SafeZone;
  /** Overrides the fitted size when a specific line needs a specific weight. */
  fontSize?: number;
};

/**
 * The display scale. Steps, not a formula: the design direction asks for a
 * real scale "with nothing in between". Character counts are tuned against
 * a 1080-wide canvas and scaled from there.
 */
const fitStatementFontSize = (text: string): number => {
  const { length } = text;
  if (length <= 28) return 104;
  if (length <= 48) return 88;
  if (length <= 72) return 74;
  if (length <= 104) return 62;
  return 52;
};

export const ScriptCard: React.FC<Props> = ({
  theme,
  statement,
  supportingLines = [],
  eyebrow,
  durationInFrames,
  safeZone,
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const scale = width / 1080;

  const card = beatMotion({ frame, fps, durationInFrames, spring: SPRINGS.smooth });
  const rule = entranceMotion({ frame: frame - 8, fps, spring: SPRINGS.subtle });

  const horizontalInset =
    Math.max(safeZone?.left ?? 0, safeZone?.right ?? 0) + 56 * scale;
  const statementSize = (fontSize ?? fitStatementFontSize(statement)) * scale;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: safeZone?.top ?? 0,
        paddingBottom: safeZone?.bottom ?? 0,
        paddingLeft: horizontalInset,
        paddingRight: horizontalInset,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: card.opacity,
        transform: `translateY(${card.translateY}px) scale(${card.scale})`,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 22 * scale,
            fontWeight: 600,
            letterSpacing: 7 * scale,
            textTransform: "uppercase",
            color: theme.colors.primary,
            marginBottom: 34 * scale,
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: statementSize,
          fontWeight: 700,
          // Tight tracking on large display type; it loosens as the type
          // steps down, which is where the eye needs the air instead.
          letterSpacing: statementSize > 80 * scale ? -2 * scale : -0.5 * scale,
          lineHeight: 1.12,
          color: theme.colors.text,
          textShadow: `0 ${6 * scale}px ${48 * scale}px ${theme.colors.background}`,
        }}
      >
        {statement}
      </div>

      {supportingLines.length > 0 ? (
        <>
          <div
            style={{
              width: 120 * scale * rule.progress,
              height: 1,
              backgroundColor: theme.colors.primary,
              opacity: rule.opacity * 0.8,
              margin: `${38 * scale}px 0`,
            }}
          />
          {supportingLines.map((line, index) => (
            <SupportingLine
              key={line}
              text={line}
              theme={theme}
              scale={scale}
              delayInFrames={12 + index * 6}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

const SupportingLine: React.FC<{
  text: string;
  theme: BrandTheme;
  scale: number;
  delayInFrames: number;
}> = ({ text, theme, scale, delayInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = entranceMotion({
    frame: frame - delayInFrames,
    fps,
    spring: SPRINGS.smooth,
    distance: 18,
  });

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        fontSize: 38 * scale,
        fontWeight: 400,
        // Generous line-height on the body line, where the display type is tight.
        lineHeight: 1.5,
        letterSpacing: 0.2 * scale,
        color: theme.colors.textMuted,
        marginTop: 8 * scale,
        opacity: entrance.opacity,
        transform: `translateY(${entrance.translateY}px)`,
      }}
    >
      {text}
    </div>
  );
};
