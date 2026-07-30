import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  startFrame: number;
  endFrame: number;
};

export const ProgressIndicator: React.FC<Props> = ({
  startFrame,
  endFrame,
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
    <div
      style={{
        width: 480,
        opacity,
      }}
    >
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
            background: "linear-gradient(90deg, #4f7dff, #9f6bff)",
            boxShadow: "0 0 20px rgba(120,120,255,0.6)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          textAlign: "center",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 22,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {Math.round(progress * 100)}% initializing
      </div>
    </div>
  );
};
