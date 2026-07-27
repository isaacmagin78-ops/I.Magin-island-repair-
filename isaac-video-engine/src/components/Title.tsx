/**
 * Reusable animated title. Any brand, any text — pass `theme` and `text`.
 * Motion comes from lib/motion so entrance/exit feel is consistent with
 * every other component in the engine.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { entranceMotion, exitMotion, SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  text: string;
  theme: BrandTheme;
  /** Frame (relative to this component's Sequence) when the exit begins. */
  exitStart?: number;
  fontSize?: number;
};

export const Title: React.FC<Props> = ({
  text,
  theme,
  exitStart,
  fontSize = 92,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = entranceMotion({ frame, fps, spring: SPRINGS.smooth });
  const exit =
    exitStart !== undefined
      ? exitMotion({ frame, exitStart })
      : { translateY: 0, opacity: 1 };

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        fontSize,
        fontWeight: 800,
        color: theme.colors.text,
        letterSpacing: -1.5,
        textAlign: "center",
        lineHeight: 1.05,
        transform: `translateY(${entrance.translateY + exit.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity * exit.opacity,
        textShadow: `0 0 60px ${theme.colors.primary}73`,
      }}
    >
      {text}
    </div>
  );
};
