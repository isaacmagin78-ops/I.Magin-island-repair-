/**
 * Reusable end card: icon/checkmark + closing statement, snappy pop-in.
 * Generalizes the "SYSTEM VERIFIED" card from the verification video.
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  text: string;
  icon?: "check" | "none";
};

export const EndCard: React.FC<Props> = ({ theme, text, icon = "check" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRINGS.pop });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const ringScale = interpolate(frame, [0, 30], [0.6, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 10, 30], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {icon === "check" ? (
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: `2px solid ${theme.colors.accent}cc`,
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 60px ${theme.colors.accent}8c`,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : null}
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: 1,
          color: theme.colors.text,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {text}
      </div>
    </div>
  );
};
