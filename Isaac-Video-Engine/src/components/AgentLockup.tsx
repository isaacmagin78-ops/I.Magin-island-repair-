/**
 * AgentLockup — a small persistent portrait-and-name mark for the corner
 * of a listing film, so any frame someone screenshots or scrubs to is
 * still branded to the agent. Deliberately quiet: it should never compete
 * with the footage or the film's own titles.
 */
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { BrandTheme } from "../lib/types";

export type AgentLockupProps = {
  theme: BrandTheme;
  agentName: string;
  brokerage: string;
  /** Circular portrait, relative to public/. Defaults to the theme logo. */
  portraitSrc?: string;
  /** Frames before the lockup fades in. */
  delayInFrames?: number;
  /** Frame at which it fades back out. */
  exitFrame?: number;
  scale?: number;
};

export const AgentLockup: React.FC<AgentLockupProps> = ({
  theme,
  agentName,
  brokerage,
  portraitSrc,
  delayInFrames = 30,
  exitFrame,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const portrait = portraitSrc ?? theme.logo;

  const entry = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const exit =
    exitFrame === undefined
      ? 1
      : interpolate(frame, [exitFrame - 10, exitFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const opacity = entry * exit;

  return (
    <div
      style={{
        position: "absolute",
        top: 34 * scale,
        left: 34 * scale,
        display: "flex",
        alignItems: "center",
        gap: 14 * scale,
        opacity,
        transform: `translateX(${interpolate(entry, [0, 1], [-14, 0])}px)`,
      }}
    >
      {portrait ? (
        <Img
          src={staticFile(portrait)}
          style={{
            width: 58 * scale,
            height: 58 * scale,
            borderRadius: "50%",
            objectFit: "cover",
            border: `${2 * scale}px solid ${theme.colors.primary}`,
            boxShadow: "0 2px 14px rgba(0,0,0,0.45)",
          }}
        />
      ) : null}
      <div
        style={{
          fontFamily: theme.fontFamily,
          color: theme.colors.text,
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: 21 * scale, lineHeight: 1.15 }}>{agentName}</div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 10 * scale,
            letterSpacing: `${0.18 * scale}em`,
            textTransform: "uppercase",
            color: theme.colors.primary,
            marginTop: 3 * scale,
          }}
        >
          {brokerage}
        </div>
      </div>
    </div>
  );
};
