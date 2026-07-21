import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// "Miss the cat vs Tyson the PitBull" — 12.5s vertical short from Tyson's
// point of view. The source clip is a 720x1280 file whose real picture is a
// 16:9 landscape region (720x404 at y=438); everything outside that region
// (black bars + a baked-in watermark in the bottom bar) is cropped away here
// and never reaches the frame.
const SRC = staticFile("assets/videos/miss-vs-tyson-source.mp4");

const SRC_W = 720;
const CONTENT_Y = 438; // first content row in the source
const CONTENT_H = 404; // 16:9 content height

const FPS = 30;

// Three segments of source footage (seconds), chosen frame-by-frame:
// A: the kitten squares up and struts at Tyson from the first frame.
// B: the kitten keeps weaving under a very patient, mildly confused Tyson.
// C: Tyson walks straight into the camera — his exit line.
const SEGMENTS = [
  { from: 0.0, to: 5.5 },
  { from: 7.5, to: 11.45 },
  { from: 15.95, to: 18.6 },
] as const;

// Camera-holder noises (coughs etc.) in SOURCE seconds, found by energy
// analysis of the audio track. Segment boundaries above already dodge the
// two loudest (11.5-11.75s, 15.5-15.9s); the rest are ducked to near-zero
// with fast ramps so room ambience continues underneath.
const AUDIO_DUCKS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.12],
  [0.55, 0.8],
  [1.38, 1.57],
  [4.73, 5.17],
  [8.38, 8.62],
  [16.98, 17.17],
];
const DUCK_RAMP = 0.06; // seconds
const duckVolumeAt = (sourceTime: number): number => {
  let v = 1;
  for (const [d0, d1] of AUDIO_DUCKS) {
    if (sourceTime > d0 - DUCK_RAMP && sourceTime < d1 + DUCK_RAMP) {
      const edge = Math.min(sourceTime - (d0 - DUCK_RAMP), d1 + DUCK_RAMP - sourceTime);
      const inRamp = Math.min(1, Math.max(0, edge / DUCK_RAMP));
      v = Math.min(v, 1 - inRamp * 0.97); // duck to 3%, not dead silence
    }
  }
  return v;
};

export const TYSON_VS_MISS_DURATION = Math.round(
  SEGMENTS.reduce((acc, s) => acc + (s.to - s.from), 0) * FPS,
); // 374 frames = ~12.47s

const FONT = "'Helvetica Neue', Arial, sans-serif";

/**
 * The source video positioned inside a fixed-size window so that exactly the
 * 720x404 content region is visible, scaled by `scale` relative to the
 * fit-to-width size. overflow:hidden on the parent does the cropping.
 */
const CroppedSource: React.FC<{
  startFromFrame: number;
  windowW: number;
  windowH: number;
  scale?: number;
  blur?: boolean;
  muted?: boolean;
}> = ({ startFromFrame, windowW, windowH, scale = 1, blur = false, muted = true }) => {
  const base = windowW / SRC_W; // fit content width to window width
  const s = base * scale;
  const contentW = SRC_W * s;
  const contentH = CONTENT_H * s;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <OffthreadVideo
        src={SRC}
        muted={muted}
        startFrom={startFromFrame}
        style={{
          position: "absolute",
          width: 720 * s,
          height: 1280 * s,
          left: (windowW - contentW) / 2,
          top: (windowH - contentH) / 2 - CONTENT_Y * s,
          filter: blur ? "blur(45px) brightness(0.45) saturate(1.15)" : undefined,
        }}
      />
    </div>
  );
};

/** One edited segment: blurred ambient fill + sharp 16:9 window, own audio. */
const SegmentScene: React.FC<{
  from: number;
  approachZoom?: boolean;
  fadeOutAudio?: boolean;
}> = ({ from, approachZoom = false, fadeOutAudio = false }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const startFrom = Math.round(from * FPS);
  const winH = Math.round((CONTENT_H / SRC_W) * width); // 606
  // Gentle push-in on the final approach; static elsewhere.
  const zoom = approachZoom
    ? interpolate(frame, [0, durationInFrames], [1, 1.1], {
        extrapolateRight: "clamp",
      })
    : 1;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12" }}>
      {/* Ambient background: the same footage, blown up, blurred, darkened. */}
      <CroppedSource
        startFromFrame={startFrom}
        windowW={width}
        windowH={height}
        scale={height / ((CONTENT_H / SRC_W) * width)}
        blur
      />
      {/* Sharp full-width 16:9 media window, vertically centered. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: (height - winH) / 2,
          width,
          height: winH,
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
        }}
      >
        <CroppedSource startFromFrame={startFrom} windowW={width} windowH={winH} scale={zoom} />
      </div>
      <Audio
        src={SRC}
        startFrom={startFrom}
        volume={(f) => {
          const fade = fadeOutAudio
            ? interpolate(f, [durationInFrames - 14, durationInFrames - 2], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 1;
          return fade * duckVolumeAt(from + f / FPS);
        }}
      />
    </AbsoluteFill>
  );
};

/** Large readable caption card, kept out of the media window. */
const Caption: React.FC<{
  text: string;
  position: "top" | "bottom";
  appearAt?: number;
  thought?: boolean;
}> = ({ text, position, appearAt = 0, thought = false }) => {
  const frame = useCurrentFrame();
  const t = frame - appearAt;
  const opacity = interpolate(t, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(t, [0, 12], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (t < 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        [position]: position === "top" ? 250 : 290,
        textAlign: "center",
        opacity,
        transform: `translateY(${position === "top" ? rise : -rise}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: thought ? 76 : 68,
          lineHeight: 1.18,
          color: "#ffffff",
          fontStyle: thought ? "italic" : "normal",
          textShadow: "0 4px 26px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)",
          letterSpacing: -0.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const TysonVsMiss: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const segFrames = SEGMENTS.map((s) => Math.round((s.to - s.from) * fps));
  const [aLen, bLen, cLen] = segFrames;
  const total = aLen + bLen + cLen;
  // Fade the whole video (and audio, via volume below) out at the very end.
  const endFade = interpolate(frame, [total - 14, total - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: endFade }}>
        <Sequence durationInFrames={aLen}>
          <SegmentScene from={SEGMENTS[0].from} />
          <Caption text={"I was told kittens were fragile…"} position="top" appearAt={4} />
        </Sequence>
        <Sequence from={aLen} durationInFrames={bLen}>
          <SegmentScene from={SEGMENTS[1].from} />
          <Caption text={"Apparently, nobody told the kitten."} position="top" appearAt={5} />
        </Sequence>
        <Sequence from={aLen + bLen} durationInFrames={cLen}>
          <SegmentScene from={SEGMENTS[2].from} approachZoom fadeOutAudio />
          <Caption text={"I live here too, right?"} position="bottom" appearAt={8} thought />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
