import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const DarkBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const glow = interpolate(frame, [0, 300], [0.55, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070d",
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(64, 132, 255, ${glow * 0.25}) 0%, rgba(5, 7, 13, 0) 55%),
          radial-gradient(circle at 50% 100%, rgba(120, 80, 255, ${glow * 0.18}) 0%, rgba(5, 7, 13, 0) 60%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </AbsoluteFill>
  );
};
