/**
 * AgentEndCard — the closing card for a listing film: agent portrait,
 * name, brokerage, then the listing line, price, and a direct call to
 * action. Fully opaque by design, so it can be laid over source footage
 * whose own closing frames are unusable.
 *
 * Everything animates in on a staggered spring so the card reads as
 * produced rather than pasted on. Brand-agnostic — colors, font, and the
 * portrait all come from the theme and props.
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

export type AgentEndCardProps = {
  theme: BrandTheme;
  /** Blurred backdrop plate, relative to public/. */
  plateSrc: string;
  /** Circular portrait, relative to public/. Defaults to the theme logo. */
  portraitSrc?: string;
  agentName: string;
  brokerage: string;
  addressLine: string;
  price: string;
  phone: string;
  cta: string;
  /** Scales the whole lockup — use >1 for vertical/9:16 canvases. */
  scale?: number;
};

/** Staggered rise-and-fade for each line of the card. */
const useLineStyle = (delayInFrames: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
  };
};

export const AgentEndCard: React.FC<AgentEndCardProps> = ({
  theme,
  plateSrc,
  portraitSrc,
  agentName,
  brokerage,
  addressLine,
  price,
  phone,
  cta,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const portrait = portraitSrc ?? theme.logo;

  // Slow push on the backdrop so the card never sits perfectly still.
  const plateScale = interpolate(frame, [0, 150], [1.12, 1.2], {
    extrapolateRight: "clamp",
  });
  const portraitSpring = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const ruleWidth = interpolate(
    spring({ frame: frame - 14, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 300 * scale],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(plateSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(26px) brightness(0.34) saturate(0.85)",
            transform: `scale(${plateScale})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${theme.colors.background}9e, ${theme.colors.background}c7)`,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.fontFamily,
          color: theme.colors.text,
          textAlign: "center",
          padding: 40 * scale,
        }}
      >
        {portrait ? (
          <Img
            src={staticFile(portrait)}
            style={{
              width: 148 * scale,
              height: 148 * scale,
              borderRadius: "50%",
              objectFit: "cover",
              border: `${4 * scale}px solid ${theme.colors.primary}`,
              boxShadow: `0 0 ${30 * scale}px ${theme.colors.primary}73`,
              marginBottom: 20 * scale,
              opacity: portraitSpring,
              transform: `scale(${interpolate(portraitSpring, [0, 1], [0.86, 1])})`,
            }}
          />
        ) : null}
        <div style={{ fontSize: 44 * scale, lineHeight: 1.1, ...useLineStyle(6) }}>
          {agentName}
        </div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14 * scale,
            letterSpacing: `${0.24 * scale}em`,
            textTransform: "uppercase",
            color: theme.colors.primary,
            marginTop: 10 * scale,
            ...useLineStyle(10),
          }}
        >
          {brokerage}
        </div>
        <div
          style={{
            width: ruleWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
            margin: `${24 * scale}px 0`,
          }}
        />
        <div
          style={{
            fontSize: 27 * scale,
            color: theme.colors.accent,
            ...useLineStyle(20),
          }}
        >
          {addressLine}
        </div>
        <div
          style={{
            fontSize: 31 * scale,
            color: theme.colors.primary,
            marginTop: 8 * scale,
            ...useLineStyle(25),
          }}
        >
          {price}
        </div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 23 * scale,
            letterSpacing: "0.04em",
            marginTop: 22 * scale,
            ...useLineStyle(32),
          }}
        >
          {phone}
        </div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12 * scale,
            letterSpacing: `${0.24 * scale}em`,
            textTransform: "uppercase",
            color: theme.colors.textMuted,
            marginTop: 10 * scale,
            ...useLineStyle(38),
          }}
        >
          {cta}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
