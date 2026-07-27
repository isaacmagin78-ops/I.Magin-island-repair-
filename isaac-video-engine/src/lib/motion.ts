/**
 * Motion primitives shared by every component and scene transition.
 *
 * Design decision: components never hand-roll spring configs or easing
 * curves inline. They call into this module so that "what does entrance
 * motion feel like across the whole engine" is answered in one place. If
 * the brand's motion language changes, it changes here once.
 */
import {
  Easing,
  interpolate,
  spring,
  type SpringConfig,
} from "remotion";
import type {
  KenBurnsDirection,
  KenBurnsSpec,
  SlideDirection,
  TransitionSpec,
} from "./types";

/** Standard spring feels. Pick by intent, not by tuning numbers ad hoc. */
export const SPRINGS: Record<string, Partial<SpringConfig>> = {
  /** Gentle settle — for titles, subtitles, lower thirds. */
  smooth: { damping: 200, stiffness: 120, mass: 0.8 },
  /** Snappy pop — for end cards, stickers, CTA buttons. */
  pop: { damping: 12, stiffness: 140, mass: 0.6 },
  /** Minimal overshoot — for logo/watermark, safe for tight corners. */
  subtle: { damping: 26, stiffness: 100, mass: 1 },
};

export const EASINGS = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
};

type EntranceOptions = {
  frame: number;
  fps: number;
  spring?: Partial<SpringConfig>;
  /** Pixels of vertical travel on entry. Positive = rises up into place. */
  distance?: number;
};

/**
 * Standard "rise + fade + scale-in" entrance used across titles, subtitles,
 * lower thirds, CTAs. Returns ready-to-spread style values.
 */
export const entranceMotion = ({
  frame,
  fps,
  spring: springConfig = SPRINGS.smooth,
  distance = 40,
}: EntranceOptions) => {
  const progress = spring({ frame, fps, config: springConfig });
  const translateY = interpolate(progress, [0, 1], [distance, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  return { translateY, opacity, scale, progress };
};

type ExitOptions = {
  frame: number;
  exitStart: number;
  exitDurationInFrames?: number;
  /** Pixels of vertical travel on exit. Negative = rises up and out. */
  distance?: number;
};

/** Standard fade + rise-out exit, paired with entranceMotion. */
export const exitMotion = ({
  frame,
  exitStart,
  exitDurationInFrames = 20,
  distance = -50,
}: ExitOptions) => {
  const progress = interpolate(
    frame,
    [exitStart, exitStart + exitDurationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const translateY = progress * distance;
  const opacity = 1 - progress;
  return { translateY, opacity, progress };
};

/**
 * Ken Burns / auto pan-zoom transform for a full-bleed image or video layer.
 * Returns a CSS transform string driven by the current frame across the
 * scene's total duration — call once per frame from inside the scene.
 */
export const kenBurnsTransform = (
  frame: number,
  durationInFrames: number,
  spec: KenBurnsSpec,
): string => {
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = Easing.inOut(Easing.ease)(t);
  const scaleAmount = spec.scaleAmount ?? 1.15;

  const panDistance = 6; // percent of frame travelled during pan directions

  switch (spec.direction) {
    case "in": {
      const scale = interpolate(eased, [0, 1], [1, scaleAmount]);
      return `scale(${scale})`;
    }
    case "out": {
      const scale = interpolate(eased, [0, 1], [scaleAmount, 1]);
      return `scale(${scale})`;
    }
    case "pan-left": {
      const scale = scaleAmount;
      const x = interpolate(eased, [0, 1], [panDistance, -panDistance]);
      return `scale(${scale}) translateX(${x}%)`;
    }
    case "pan-right": {
      const scale = scaleAmount;
      const x = interpolate(eased, [0, 1], [-panDistance, panDistance]);
      return `scale(${scale}) translateX(${x}%)`;
    }
    case "pan-up": {
      const scale = scaleAmount;
      const y = interpolate(eased, [0, 1], [panDistance, -panDistance]);
      return `scale(${scale}) translateY(${y}%)`;
    }
    case "pan-down": {
      const scale = scaleAmount;
      const y = interpolate(eased, [0, 1], [-panDistance, panDistance]);
      return `scale(${scale}) translateY(${y}%)`;
    }
    default:
      return "scale(1)";
  }
};

/**
 * Deterministically picks a Ken Burns direction from a seed (e.g. scene
 * index) so the auto-pipeline varies motion across a timeline without
 * randomness that would make renders non-reproducible.
 */
export const pickKenBurnsDirection = (seed: number): KenBurnsDirection => {
  const directions: KenBurnsDirection[] = [
    "in",
    "pan-left",
    "pan-right",
    "out",
    "pan-up",
    "pan-down",
  ];
  return directions[seed % directions.length];
};

type TransitionFrameStyle = {
  opacity: number;
  transform: string;
  filter: string;
};

const identityStyle: TransitionFrameStyle = {
  opacity: 1,
  transform: "none",
  filter: "none",
};

const slideOffset = (direction: SlideDirection, progress: number, sign: 1 | -1) => {
  const distance = 100 * sign * (1 - progress);
  switch (direction) {
    case "left":
      return `translateX(${-distance}%)`;
    case "right":
      return `translateX(${distance}%)`;
    case "up":
      return `translateY(${-distance}%)`;
    case "down":
      return `translateY(${distance}%)`;
  }
};

/**
 * Computes the style for a scene entering the frame under a given
 * transition. `localFrame` is frames since the scene (or transition) began.
 */
export const transitionInStyle = (
  localFrame: number,
  spec: TransitionSpec,
): TransitionFrameStyle => {
  if (spec.kind === "none") return identityStyle;

  const progress = interpolate(
    localFrame,
    [0, spec.durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const eased = Easing.out(Easing.cubic)(progress);

  switch (spec.kind) {
    case "fade":
      return { ...identityStyle, opacity: eased };
    case "slide":
      return {
        ...identityStyle,
        transform: slideOffset(spec.direction ?? "right", eased, 1),
      };
    case "zoom":
      return {
        ...identityStyle,
        opacity: eased,
        transform: `scale(${interpolate(eased, [0, 1], [1.12, 1])})`,
      };
    case "blur":
      return {
        ...identityStyle,
        opacity: eased,
        filter: `blur(${interpolate(eased, [0, 1], [24, 0])}px)`,
      };
    default:
      return identityStyle;
  }
};

/** Same as transitionInStyle but for a scene leaving the frame. */
export const transitionOutStyle = (
  localFrame: number,
  spec: TransitionSpec,
): TransitionFrameStyle => {
  if (spec.kind === "none") return identityStyle;

  const progress = interpolate(
    localFrame,
    [0, spec.durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const eased = Easing.in(Easing.cubic)(progress);

  switch (spec.kind) {
    case "fade":
      return { ...identityStyle, opacity: 1 - eased };
    case "slide":
      return {
        ...identityStyle,
        transform: slideOffset(spec.direction ?? "right", 1 - eased, -1),
      };
    case "zoom":
      return {
        ...identityStyle,
        opacity: 1 - eased,
        transform: `scale(${interpolate(eased, [0, 1], [1, 1.12])})`,
      };
    case "blur":
      return {
        ...identityStyle,
        opacity: 1 - eased,
        filter: `blur(${interpolate(eased, [0, 1], [0, 24])}px)`,
      };
    default:
      return identityStyle;
  }
};

/**
 * Approximate motion blur via CSS filter, driven by per-frame velocity.
 * Cheap and good enough for fast pans/slides; real motion blur would need
 * frame blending which is expensive to render. Use sparingly (fast moves
 * only) — a static shot with motion blur applied looks wrong.
 */
export const motionBlurFilter = (velocityPxPerFrame: number): string => {
  const blur = Math.min(Math.abs(velocityPxPerFrame) * 0.15, 14);
  return blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : "none";
};
