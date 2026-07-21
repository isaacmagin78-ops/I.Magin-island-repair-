/**
 * Labeled placeholder for a storyboard/animatic render: shown in place of
 * a real clip when a composition's footage slot hasn't been filled yet.
 * Renders the brand background, a dashed film-frame, the shot description,
 * and the assets/ filename to drop in — so an animatic render doubles as a
 * shot list. Never meant to appear in a final cut.
 */
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

export type FootageSlotLayout = "center" | "lower" | "frame-only";

type Props = {
  theme: BrandTheme;
  /** e.g. "Beat 2 — The hard first days" */
  beatLabel: string;
  /** e.g. "Untouched food bowl" */
  slotLabel: string;
  /** e.g. "assets/videos/problem-01.mp4" */
  fileHint?: string;
  /** The enclosing Sequence's length, for pacing the slow push-in. */
  durationInFrames: number;
  /**
   * Where the slot info sits, so it stays clear of whatever overlay the
   * composition draws on this beat: "center" (default) for beats with no
   * center overlay, "lower" when a statement/title owns the center, and
   * "frame-only" (a single compact line at the top) when a full-screen
   * overlay like a CTA owns the middle of the frame.
   */
  layout?: FootageSlotLayout;
};

export const FootageSlot: React.FC<Props> = ({
  theme,
  beatLabel,
  slotLabel,
  fileHint,
  durationInFrames,
  layout = "center",
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        backgroundImage: `radial-gradient(circle at 50% 35%, ${theme.colors.primary}26 0%, transparent 60%)`,
        transform: `scale(${scale})`,
      }}
    >
      <AbsoluteFill
        style={{
          margin: "220px 80px 320px",
          border: `3px dashed ${theme.colors.primary}66`,
          borderRadius: 32,
          width: "auto",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: layout === "lower" ? "flex-end" : "center",
          gap: 30,
          padding: layout === "lower" ? "0 60px 90px" : "0 60px",
          textAlign: "center",
        }}
      >
        {layout === "frame-only" ? (
          <div
            style={{
              position: "absolute",
              top: 28,
              left: 0,
              right: 0,
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: 24,
              color: theme.colors.textMuted,
              opacity: 0.85,
              textAlign: "center",
            }}
          >
            {slotLabel}
            {fileHint ? ` · ${fileHint}` : ""}
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 4,
                color: theme.colors.accent,
              }}
            >
              FOOTAGE SLOT
            </div>
            <div
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 32,
                fontWeight: 600,
                color: theme.colors.textMuted,
              }}
            >
              {beatLabel}
            </div>
            <div
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.2,
                color: theme.colors.text,
              }}
            >
              {slotLabel}
            </div>
            {fileHint ? (
              <div
                style={{
                  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                  fontSize: 24,
                  color: theme.colors.textMuted,
                  opacity: 0.8,
                }}
              >
                {fileHint}
              </div>
            ) : null}
          </>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
