/**
 * Legends Ranch — brand anthem concept (Workflow B, hand-authored).
 * Five licensed motion clips, fade-through-black cuts, subtle push-in on
 * every scene, cinematic letterbox, timed titles, and a closing brand
 * lockup. All brand-facing values come from the legends-ranch theme.
 */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { CinematicTitle } from "../components/CinematicTitle";
import { getBrandTheme } from "../branding/themes";

export const ANTHEM_FPS = 30;

const FADE_FRAMES = 14;
const LETTERBOX_HEIGHT = 104;

type AnthemScene = {
  kind: "video" | "image";
  src: string;
  durationInFrames: number;
  title: string;
  subtitle?: string;
};

/**
 * Mix of licensed stock motion (scene-setting) and real Legends Ranch
 * photos supplied by the owner (fawn program, family, shooting center,
 * Purple Heart Hunt tribute).
 */
const SCENES: AnthemScene[] = [
  {
    kind: "video",
    src: "assets/videos/clip1-fog.mp4",
    durationInFrames: 165,
    title: "Deep in Michigan's Northwoods",
    subtitle: "Est. 1998 — Bitely, Michigan",
  },
  {
    kind: "video",
    src: "assets/videos/clip2-aerial.mp4",
    durationInFrames: 165,
    title: "2,000 Acres of Managed Habitat",
    subtitle: "One standard of stewardship",
  },
  {
    kind: "video",
    src: "assets/videos/clip3-buck.mp4",
    durationInFrames: 200,
    title: "Where 200-Inch Bucks Are the Standard",
    subtitle: "— not the exception",
  },
  {
    kind: "image",
    src: "assets/images/real-fawns-group.jpg",
    durationInFrames: 130,
    title: "Raised Here. Cared for Daily.",
    subtitle: "The Legends Ranch deer program",
  },
  {
    kind: "image",
    src: "assets/images/real-family-fawn.jpg",
    durationInFrames: 130,
    title: "Family-Run Since 1998",
    subtitle: "The people behind the ranch",
  },
  {
    kind: "image",
    src: "assets/images/real-shooting-range.jpg",
    durationInFrames: 130,
    title: "A World-Class Shooting Center",
    subtitle: "Sight in before your hunt — guided one-on-one",
  },
  {
    kind: "image",
    src: "assets/images/real-purple-heart.jpg",
    durationInFrames: 150,
    title: "Honoring Our Nation's Heroes",
    subtitle: "Home of the Purple Heart Hunt",
  },
  {
    kind: "video",
    src: "assets/videos/clip5-fire.mp4",
    durationInFrames: 200,
    title: "This Is More Than a Hunt.",
    subtitle: "It's a legacy.",
  },
];

export const ANTHEM_DURATION_IN_FRAMES = SCENES.reduce(
  (sum, scene) => sum + scene.durationInFrames,
  0,
);

const BRAND_LOCKUP_LEAD_FRAMES = 95;

const SceneBlock: React.FC<{
  scene: AnthemScene;
  isFirst: boolean;
  hideTitleEarly?: boolean;
}> = ({ scene, isFirst, hideTitleEarly }) => {
  const frame = useCurrentFrame();
  const theme = getBrandTheme("legends-ranch");

  const fadeIn = isFirst
    ? interpolate(frame, [0, FADE_FRAMES * 2], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(frame, [0, FADE_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
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
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        {scene.kind === "video" ? (
          <OffthreadVideo
            src={staticFile(scene.src)}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Img
            src={staticFile(scene.src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </AbsoluteFill>
      {/* Bottom gradient keeps titles readable over bright footage. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 34%)",
        }}
      />
      <CinematicTitle
        theme={theme}
        title={scene.title}
        subtitle={scene.subtitle}
        appearAt={isFirst ? 30 : 22}
        fadeOutAt={
          hideTitleEarly
            ? scene.durationInFrames - BRAND_LOCKUP_LEAD_FRAMES - 12
            : scene.durationInFrames - FADE_FRAMES - 14
        }
      />
    </AbsoluteFill>
  );
};

/** Closing brand lockup over the final scene's last seconds. */
const BrandLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = getBrandTheme("legends-ranch");
  const fadeIn = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
        background: "rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: 20,
          textTransform: "uppercase",
          color: theme.colors.text,
          textShadow: "0 4px 40px rgba(0,0,0,0.9)",
        }}
      >
        Legends Ranch
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: theme.fontFamily,
          fontSize: 34,
          letterSpacing: 5,
          color: theme.colors.primary,
        }}
      >
        BOOK YOUR LEGACY HUNT
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: theme.fontFamily,
          fontSize: 28,
          letterSpacing: 2,
          color: theme.colors.textMuted,
        }}
      >
        (231) 745-8000 • legendsranch.com • Bitely, Michigan
      </div>
    </AbsoluteFill>
  );
};

export const LegendsAnthem: React.FC = () => {
  let from = 0;
  const sceneSequences = SCENES.map((scene, index) => {
    const sequence = (
      <Sequence
        key={scene.src}
        from={from}
        durationInFrames={scene.durationInFrames}
      >
        <SceneBlock
          scene={scene}
          isFirst={index === 0}
          hideTitleEarly={index === SCENES.length - 1}
        />
      </Sequence>
    );
    from += scene.durationInFrames;
    return sequence;
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {sceneSequences}

      <Sequence
        from={ANTHEM_DURATION_IN_FRAMES - BRAND_LOCKUP_LEAD_FRAMES}
        durationInFrames={BRAND_LOCKUP_LEAD_FRAMES}
      >
        <BrandLockup />
      </Sequence>

      {/* Cinematic letterbox above everything. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: LETTERBOX_HEIGHT,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: LETTERBOX_HEIGHT,
          background: "#000",
        }}
      />

      <BackgroundMusic
        track={{
          src: "assets/music/legends-ranch-piano-score.wav",
          volume: 0.55,
          fadeInFrames: 30,
          fadeOutFrames: 60,
        }}
      />
    </AbsoluteFill>
  );
};
