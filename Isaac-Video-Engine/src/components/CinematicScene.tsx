/**
 * One beat of a cinematic film: full-bleed or framed media (video/photo)
 * or a typographic stat card, with fade-through-black cuts, a slow
 * push-in, a legibility gradient, and a timed CinematicTitle. Extracted
 * from the Legends anthem so any brand's film can assemble these.
 */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CinematicTitle } from "./CinematicTitle";
import type { BrandTheme } from "../lib/types";

export type CinematicSceneSpec = {
  kind: "video" | "image" | "stat";
  /**
   * cover: full-bleed (16:9 media). frame: media shown WHOLE, centered
   * over a blurred copy of itself — portrait/square photos and phone
   * video lose nothing. Ignored for stat cards.
   */
  fit?: "cover" | "frame";
  src?: string;
  /** Slows a video clip so it can carry a longer narration line. */
  playbackRate?: number;
  /** Stat card content (kind: "stat"). */
  statValue?: string;
  statLabel?: string;
  durationInFrames: number;
  title?: string;
  subtitle?: string;
  /** Voiceover line played over this scene. */
  vo?: { src: string; durationInFrames: number };
};

const FADE_FRAMES = 14;

const SceneMedia: React.FC<{
  scene: CinematicSceneSpec;
  objectFit: "cover" | "contain";
}> = ({ scene, objectFit }) =>
  scene.kind === "video" ? (
    <OffthreadVideo
      src={staticFile(scene.src as string)}
      muted
      playbackRate={scene.playbackRate ?? 1}
      style={{ width: "100%", height: "100%", objectFit }}
    />
  ) : (
    <Img
      src={staticFile(scene.src as string)}
      style={{ width: "100%", height: "100%", objectFit }}
    />
  );

const StatCard: React.FC<{ theme: BrandTheme; scene: CinematicSceneSpec }> = ({
  theme,
  scene,
}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [10, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [10, 34], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const grow = interpolate(frame, [0, scene.durationInFrames], [1, 1.04], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse at center, ${theme.colors.secondary}33 0%, ${theme.colors.background} 72%)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: appear,
          transform: `translateY(${rise}px) scale(${grow})`,
          textAlign: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 148,
            fontWeight: 700,
            letterSpacing: 8,
            color: theme.colors.primary,
            textShadow: "0 6px 60px rgba(0,0,0,0.8)",
          }}
        >
          {scene.statValue}
        </div>
        <div style={{ width: 160, height: 3, background: theme.colors.primary, opacity: 0.7 }} />
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 40,
            letterSpacing: 3,
            color: theme.colors.text,
            lineHeight: 1.45,
          }}
        >
          {scene.statLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CinematicSceneBlock: React.FC<{
  theme: BrandTheme;
  scene: CinematicSceneSpec;
  isFirst: boolean;
  letterboxHeight: number;
  hideTitleEarly?: number;
}> = ({ theme, scene, isFirst, letterboxHeight, hideTitleEarly }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(
    frame,
    [0, isFirst ? FADE_FRAMES * 2 : FADE_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fadeOut = interpolate(
    frame,
    [scene.durationInFrames - FADE_FRAMES, scene.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [0, scene.durationInFrames], [1, 1.07], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: fadeIn * fadeOut }}>
      {scene.kind === "stat" ? (
        <StatCard theme={theme} scene={scene} />
      ) : scene.fit === "frame" ? (
        <>
          <AbsoluteFill
            style={{
              transform: `scale(${scale * 1.12})`,
              filter: "blur(42px) brightness(0.45)",
            }}
          >
            <SceneMedia scene={scene} objectFit="cover" />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              top: letterboxHeight + 16,
              bottom: letterboxHeight + 16,
              height: "auto",
              transform: `scale(${1 + (scale - 1) * 0.4})`,
            }}
          >
            <SceneMedia scene={scene} objectFit="contain" />
          </AbsoluteFill>
        </>
      ) : (
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>
          <SceneMedia scene={scene} objectFit="cover" />
        </AbsoluteFill>
      )}

      {scene.kind !== "stat" ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 34%)",
          }}
        />
      ) : null}

      {scene.title ? (
        <CinematicTitle
          theme={theme}
          title={scene.title}
          subtitle={scene.subtitle}
          appearAt={isFirst ? 30 : 22}
          fadeOutAt={
            hideTitleEarly !== undefined
              ? hideTitleEarly
              : scene.durationInFrames - FADE_FRAMES - 14
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
