/**
 * Shared type contracts for the video engine. Every reusable component,
 * preset, and pipeline stage is built against these types so that new
 * brands/templates can be added by composing them, not by forking code.
 */

export type FrameRange = {
  from: number;
  durationInFrames: number;
};

export type EasingName =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "spring";

export type TransitionKind = "fade" | "slide" | "zoom" | "blur" | "none";

export type SlideDirection = "left" | "right" | "up" | "down";

export type TransitionSpec = {
  kind: TransitionKind;
  durationInFrames: number;
  direction?: SlideDirection;
};

/** A single word with its own timing, for word-by-word caption highlighting. */
export type CaptionWord = {
  text: string;
  startFrame: number;
  endFrame: number;
};

/**
 * One spoken line pinned to the frame window in which it is heard.
 * `lib/captions.ts` turns a cue list into word-timed `Caption[]` for
 * AnimatedCaptions — per-line timing without a transcription API.
 */
export type CaptionCue = {
  text: string;
  fromFrame: number;
  toFrame: number;
};

export type CaptionLine = {
  words: CaptionWord[];
};

export type MediaKind = "image" | "video";

export type MediaAsset = {
  kind: MediaKind;
  /** Path relative to `public/`, e.g. "assets/images/beach.jpg" */
  src: string;
  /** Optional: trims a video asset. Ignored for images. */
  trimStartInSeconds?: number;
  trimEndInSeconds?: number;
};

/**
 * A Scene is one beat of a video: a piece of media on screen for a range of
 * frames, with an optional Ken Burns/pan-zoom motion and optional caption.
 * Timelines are arrays of Scenes: this is the core reusable unit that the
 * auto-pipeline (Phase 6) generates from files dropped into assets/.
 */
export type Scene = {
  id: string;
  media: MediaAsset;
  durationInFrames: number;
  kenBurns?: KenBurnsSpec;
  captionLine?: CaptionLine;
  transitionIn?: TransitionSpec;
  transitionOut?: TransitionSpec;
};

export type KenBurnsDirection =
  | "in"
  | "out"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-down";

export type KenBurnsSpec = {
  direction: KenBurnsDirection;
  /** How much the image scales over the duration, e.g. 1.15 = 15% zoom. */
  scaleAmount?: number;
};

export type SafeZone = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SocialPresetName =
  | "tiktok"
  | "instagram-reels"
  | "facebook-reels"
  | "youtube-shorts"
  | "square-post"
  | "story";

export type SocialPreset = {
  name: SocialPresetName;
  label: string;
  width: number;
  height: number;
  fps: number;
  /** Pixels to keep clear of UI chrome (profile pic, caption bar, buttons). */
  safeZone: SafeZone;
  /** Recommended max duration in seconds for this placement (soft guidance). */
  recommendedMaxDurationInSeconds: number;
  export: {
    codec: "h264";
    crf: number;
    pixelFormat: "yuv420p";
  };
};

export type BrandTheme = {
  id: string;
  displayName: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
  };
  fontFamily: string;
  logo?: string;
  watermarkText?: string;
};

export type AudioTrackSpec = {
  /** Path relative to `public/`. */
  src: string;
  volume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  startFrom?: number;
  /** Duck (lower) this track's volume while a voiceover/sfx track is playing. */
  duckToVolume?: number;
};
