import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  text: string;
  exitStart: number;
};

export const AnimatedTitle: React.FC<Props> = ({ text, exitStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 120, mass: 0.8 },
  });

  const exitProgress = interpolate(frame, [exitStart, exitStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]) + exitProgress * -50;
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * (1 - exitProgress);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        fontFamily:
          "'Helvetica Neue', Arial, sans-serif",
        fontSize: 92,
        fontWeight: 800,
        color: "#ffffff",
        letterSpacing: -1.5,
        textAlign: "center",
        lineHeight: 1.05,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        textShadow: "0 0 60px rgba(90,140,255,0.45)",
      }}
    >
      {text}
    </div>
  );
};
