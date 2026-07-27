/**
 * Comic-style speech bubble with a directional tail. Pop-in entrance.
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  text: string;
  tailDirection?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  maxWidth?: number;
  fontSize?: number;
};

export const SpeechBubble: React.FC<Props> = ({
  theme,
  text,
  tailDirection = "bottom-left",
  maxWidth = 460,
  fontSize = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRINGS.pop });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const tailStyle = getTailStyle(tailDirection, "#ffffff");

  return (
    <div style={{ transform: `scale(${scale})`, opacity, position: "relative", maxWidth }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111111",
          fontFamily: theme.fontFamily,
          fontSize,
          fontWeight: 600,
          padding: "20px 26px",
          borderRadius: 24,
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
      <div style={tailStyle} />
    </div>
  );
};

const getTailStyle = (
  direction: NonNullable<Props["tailDirection"]>,
  color: string,
): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  };

  switch (direction) {
    case "bottom-left":
      return {
        ...base,
        left: 36,
        bottom: -16,
        borderWidth: "18px 16px 0 0",
        borderColor: `${color} transparent transparent transparent`,
      };
    case "bottom-right":
      return {
        ...base,
        right: 36,
        bottom: -16,
        borderWidth: "18px 0 0 16px",
        borderColor: `${color} transparent transparent transparent`,
      };
    case "top-left":
      return {
        ...base,
        left: 36,
        top: -16,
        borderWidth: "0 16px 18px 0",
        borderColor: `transparent transparent ${color} transparent`,
      };
    case "top-right":
      return {
        ...base,
        right: 36,
        top: -16,
        borderWidth: "0 0 18px 16px",
        borderColor: `transparent transparent ${color} transparent`,
      };
  }
};
