/**
 * Comic-style thought bubble: cloud shape + trailing circles, gentle
 * float animation (thoughts drift, unlike speech which pops in sharply).
 */
import { interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  text: string;
  maxWidth?: number;
  fontSize?: number;
  originX?: number;
  originY?: number;
};

export const ThoughtBubble: React.FC<Props> = ({
  theme,
  text,
  maxWidth = 420,
  fontSize = 28,
  originX = 40,
  originY = 40,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame / 20) * 6;

  return (
    <div style={{ opacity, transform: `translateY(${floatY}px)`, position: "relative" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111111",
          fontFamily: theme.fontFamily,
          fontSize,
          fontWeight: 500,
          fontStyle: "italic",
          padding: "22px 28px",
          borderRadius: 32,
          maxWidth,
          lineHeight: 1.35,
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </div>
      <div
        style={{
          position: "absolute",
          left: originX,
          bottom: -originY * 0.4,
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: originX - 18,
          bottom: -originY * 0.75,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          opacity: 0.8,
        }}
      />
    </div>
  );
};
