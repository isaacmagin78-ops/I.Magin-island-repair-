import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SystemVerified: React.FC = () => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 140, mass: 0.6 },
  });

  const opacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const ringScale = interpolate(localFrame, [0, 30], [0.6, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(localFrame, [0, 10, 30], [0, 0.5, 0], {
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
            border: "2px solid rgba(101,255,171,0.8)",
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #22c98a, #17a673)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(34,201,138,0.55)",
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
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: 1,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        SYSTEM VERIFIED
      </div>
    </div>
  );
};
