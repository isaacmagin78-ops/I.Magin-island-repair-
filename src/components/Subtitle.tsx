/**
 * Reusable animated subtitle/kicker line, meant to pair with <Title>.
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { entranceMotion, exitMotion, SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  text: string;
  theme: BrandTheme;
  startFrame?: number;
  exitStart?: number;
  fontSize?: number;
};

export const Subtitle: React.FC<Props> = ({
  text,
  theme,
  startFrame = 0,
  exitStart,
  fontSize = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const entrance = entranceMotion({
    frame: localFrame,
    fps,
    spring: SPRINGS.smooth,
    distance: 24,
  });
  const exit =
    exitStart !== undefined
      ? exitMotion({ frame, exitStart, distance: -30 })
      : { translateY: 0, opacity: 1 };

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        fontSize,
        fontWeight: 500,
        color: theme.colors.textMuted,
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
        transform: `translateY(${entrance.translateY + exit.translateY}px)`,
        opacity: entrance.opacity * exit.opacity,
      }}
    >
      {text}
    </div>
  );
};
