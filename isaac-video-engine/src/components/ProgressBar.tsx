/**
 * Reusable progress bar / loading indicator. Also doubles as a video
 * "watch progress" style indicator for CTA or intro scenes.
 */
import { interpolate, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  startFrame: number;
  endFrame: number;
  label?: (percent: number) => string;
  width?: number;
};

export const ProgressBar: React.FC<Props> = ({
  theme,
  startFrame,
  endFrame,
  label = (percent) => `${percent}%`,
  width = 480,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 10, endFrame - 10, endFrame + 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ width, opacity }}>
      <div
        style={{
          width: "100%",
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            borderRadius: 3,
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            boxShadow: `0 0 20px ${theme.colors.primary}99`,
          }}
        />
      </div>
      {label ? (
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontFamily: theme.fontFamily,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {label(Math.round(progress * 100))}
        </div>
      ) : null}
    </div>
  );
};
