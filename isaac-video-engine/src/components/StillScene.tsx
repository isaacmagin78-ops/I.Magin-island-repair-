/**
 * StillScene — one still from a shoot, held on a slow push, with a
 * wide-tracked caption naming the feature it shows. Framing is controlled
 * per scene (`objectPosition`) so a caption baked into the source frame
 * can be pushed out of shot rather than fought with.
 *
 * In vertical mode the still sits in a 16:9 band over a blurred backdrop,
 * matching how the film itself is framed for Reels, so the cut between
 * moving and still footage doesn't change the layout.
 */
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { BrandTheme } from "../lib/types";

export type StillSceneProps = {
  theme: BrandTheme;
  src: string;
  /**
   * Which edge the push is anchored to. Scaling anchors here, so the
   * opposite edge is what gets cropped out of shot — that is how a
   * caption baked into the source frame is framed away.
   */
  anchor: "top" | "bottom" | "center";
  /** Ken Burns start and end scale. */
  zoom: [number, number];
  caption: string;
  orientation: "landscape" | "vertical";
  /** Blurred backdrop for the vertical layout. */
  plateSrc: string;
  durationInFrames: number;
};

export const StillScene: React.FC<StillSceneProps> = ({
  theme,
  src,
  anchor,
  zoom,
  caption,
  orientation,
  plateSrc,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isVertical = orientation === "vertical";

  const scale = interpolate(frame, [0, durationInFrames], zoom, {
    extrapolateRight: "clamp",
  });
  const captionIn = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const captionStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: isVertical ? 30 : 26,
    letterSpacing: "0.24em",
    textTransform: "uppercase" as const,
    opacity: captionIn,
    transform: `translateY(${interpolate(captionIn, [0, 1], [14, 0])}px)`,
  };

  const still = (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transformOrigin: `center ${anchor}`,
        transform: `scale(${scale})`,
      }}
    />
  );

  if (isVertical) {
    return (
      <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img
            src={staticFile(plateSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(48px) brightness(0.55) saturate(1.02)",
              transform: "scale(1.2)",
            }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{ backgroundColor: `${theme.colors.background}b0` }}
        />
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 54,
          }}
        >
          <div style={{ width: "100%", height: (width * 9) / 16, overflow: "hidden" }}>
            {still}
          </div>
          <div style={{ ...captionStyle, color: theme.colors.text, textAlign: "center", padding: "0 60px" }}>
            {caption}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>{still}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(12,14,16,0.62) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 78, bottom: 74 }}>
        <div
          style={{
            width: 58,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.85)",
            marginBottom: 16,
            opacity: captionIn,
          }}
        />
        <div style={{ ...captionStyle, color: "#ffffff" }}>{caption}</div>
      </div>
    </AbsoluteFill>
  );
};
