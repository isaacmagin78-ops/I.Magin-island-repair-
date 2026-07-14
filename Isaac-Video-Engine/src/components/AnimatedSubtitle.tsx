import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  text: string;
  startFrame: number;
  exitStart: number;
};

export const AnimatedSubtitle: React.FC<Props> = ({
  text,
  startFrame,
  exitStart,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 200, stiffness: 110, mass: 0.8 },
  });

  const exitProgress = interpolate(frame, [exitStart, exitStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [24, 0]) + exitProgress * -30;
  const opacity =
    interpolate(entrance, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    (1 - exitProgress);

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: 40,
        fontWeight: 500,
        color: "#9fb4ff",
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};
