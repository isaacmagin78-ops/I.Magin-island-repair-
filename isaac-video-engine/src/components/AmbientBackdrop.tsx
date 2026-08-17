/**
 * AmbientBackdrop — the ground for a video that has no footage.
 *
 * `BackgroundGradient` is a backdrop that sits *behind* media; this is the
 * frame's only subject when there is nothing but type on screen, so it has a
 * different job: hold a near-black ground, keep it quietly alive, and never
 * compete with the words.
 *
 * Two rules are enforced here rather than left to each composition:
 *
 * 1. **Closed palette.** Light comes only from `theme.colors.primary` and
 *    `theme.colors.secondary` over `theme.colors.background`. Hue is never
 *    computed, cycled, or rotated — see `DESIGN-DIRECTION.md`. A backdrop
 *    that generates its own hues is how a brand ends up with a rainbow.
 * 2. **Motion is felt, not watched.** The pools drift on long, decorrelated
 *    sines (`ambientDrift`) and nothing pulses, flashes, or loops visibly.
 */
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ambientDrift } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  /** Overall strength of the two light pools, 0–1. Default is deliberately low. */
  intensity?: number;
  /** Vignette strength, 0–1. Holds the eye at the centre of the frame. */
  vignette?: number;
};

export const AmbientBackdrop: React.FC<Props> = ({
  theme,
  intensity = 1,
  vignette = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Pool size is tied to the canvas so the same backdrop reads identically
  // at 1080×1920, 1080×1080 and 1920×1080.
  const poolSize = Math.max(width, height) * 0.9;
  const travel = width * 0.14;

  const primaryX = ambientDrift({ frame, periodInFrames: 620, amplitude: travel });
  const primaryY = ambientDrift({
    frame,
    periodInFrames: 830,
    amplitude: travel * 0.7,
    phase: 0.25,
  });
  const secondaryX = ambientDrift({
    frame,
    periodInFrames: 740,
    amplitude: travel,
    phase: 0.6,
  });
  const secondaryY = ambientDrift({
    frame,
    periodInFrames: 910,
    amplitude: travel * 0.8,
    phase: 0.15,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <Pool
        color={theme.colors.primary}
        size={poolSize}
        opacity={0.5 * intensity}
        style={{
          top: -poolSize * 0.35,
          left: (width - poolSize) / 2,
          transform: `translate(${primaryX}px, ${primaryY}px)`,
        }}
      />
      <Pool
        color={theme.colors.secondary}
        size={poolSize}
        opacity={0.42 * intensity}
        style={{
          bottom: -poolSize * 0.42,
          left: (width - poolSize) / 2,
          transform: `translate(${secondaryX}px, ${secondaryY}px)`,
        }}
      />

      {/* Vignette, painted in the brand's own background colour so the
          corners fall to the same true black the ground is made of. */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, transparent 30%, ${theme.colors.background} 100%)`,
          opacity: vignette,
        }}
      />
    </AbsoluteFill>
  );
};

const Pool: React.FC<{
  color: string;
  size: number;
  opacity: number;
  style: React.CSSProperties;
}> = ({ color, size, opacity, style }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      // Two stops of one brand colour — no third hue enters the ramp.
      background: `radial-gradient(circle, ${color} 0%, ${color}00 68%)`,
      filter: "blur(90px)",
      opacity,
      ...style,
    }}
  />
);
