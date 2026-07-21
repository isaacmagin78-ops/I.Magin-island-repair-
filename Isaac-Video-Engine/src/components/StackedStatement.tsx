/**
 * Multi-line statement overlay with staggered line entrances — the
 * text-first hook pattern (a line lands, a beat passes, the next line
 * lands) used by short-form openers, and equally useful as a product
 * lockup (headline + smaller support line). Lines use the engine's
 * standard entranceMotion; a line with kind "support" renders smaller and
 * muted under a "headline" line.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { entranceMotion } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

export type StackedLine = {
  text: string;
  kind?: "headline" | "support";
};

type Props = {
  theme: BrandTheme;
  lines: StackedLine[];
  /** Frames between one line's entrance and the next. */
  staggerFrames?: number;
  position?: "center" | "top";
  headlineSize?: number;
  supportSize?: number;
};

export const StackedStatement: React.FC<Props> = ({
  theme,
  lines,
  staggerFrames = 12,
  position = "center",
  headlineSize = 64,
  supportSize = 34,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: position === "center" ? "center" : "flex-start",
        // Top placement clears the tallest platform safe zone (story: 250px).
        padding: position === "top" ? "300px 72px 0" : "0 72px",
        gap: 28,
        textAlign: "center",
      }}
    >
      {lines.map((line, index) => {
        const { translateY, opacity, scale } = entranceMotion({
          frame: frame - index * staggerFrames,
          fps,
        });
        const isSupport = line.kind === "support";

        return (
          <div
            key={`${index}-${line.text}`}
            style={{
              fontFamily: theme.fontFamily,
              fontSize: isSupport ? supportSize : headlineSize,
              fontWeight: isSupport ? 600 : 800,
              color: isSupport ? theme.colors.textMuted : theme.colors.text,
              letterSpacing: isSupport ? 0.5 : -1,
              lineHeight: 1.15,
              textShadow: "0 2px 24px rgba(0,0,0,0.65)",
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
