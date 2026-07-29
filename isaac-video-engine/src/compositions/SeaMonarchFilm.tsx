/**
 * SeaMonarchFilm — a full listing film for 111 N Pompano Beach Blvd #611,
 * cut in the order a broker would actually want it:
 *
 *   brand open → the property, uninterrupted → feature beats → price →
 *   and only then, contact.
 *
 * Contact details never appear while the property is still being shown.
 * Everything is set in the agent's own website idiom (cream ground, warm
 * taupe rules and buttons, letterspaced serif wordmark) so the film reads
 * as an extension of her site rather than a generic template.
 *
 * The moving footage runs to 7.4s, where the source's own closing card
 * becomes unusable; the feature beats after that are stills lifted from
 * the same footage, framed to keep the source's baked-in captions out of
 * shot, and held on slow pushes.
 */
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EditorialCard } from "../components/EditorialCard";
import { StillScene } from "../components/StillScene";
import { getBrandTheme } from "../branding/themes";

export type SeaMonarchFilmProps = {
  orientation: "landscape" | "vertical";
};

const BRAND_ID = "linda-hoyt";
const PLATE = "assets/stills/611-sunset.png";
const SOURCE = "assets/videos/sea-monarch-611-source.mp4";

/**
 * The source's narration runs the full 10s, past where its picture stops
 * being usable at 7.4s — so its audio is mounted separately and keeps
 * playing under the first feature beat, letting the voiceover finish its
 * sentence instead of being cut off with the picture.
 */
const NARRATION_DURATION = 300;

/**
 * The music bed is shorter than the film, so it is mounted twice rather
 * than relying on looping playback. The first pass ducks under the
 * narration; the second carries the feature beats and closing card.
 */
const MUSIC = "assets/music/_samples/sample-track.mp3";
const MUSIC_SPLIT = 435;
/** Frames of overlap so the second pass crossfades in rather than cutting. */
const MUSIC_OVERLAP = 17;

/** Section boundaries, in frames at 30fps. */
const BRAND_OPEN = { from: 0, duration: 75 };
const FILM = { from: 75, duration: 222 };
const STILLS = [
  {
    src: "assets/stills/611-living.png",
    // These frames carry the source's own caption along the bottom edge,
    // so the push is anchored to the top and crops it out of shot.
    anchor: "top" as const,
    zoom: [1.3, 1.44] as [number, number],
    caption: "1,450 square feet · turnkey furnished",
  },
  {
    src: "assets/stills/611-kitchen.png",
    anchor: "top" as const,
    zoom: [1.3, 1.44] as [number, number],
    caption: "Quartz counters · stainless · breakfast bar",
  },
  {
    // The only frame in the source with no caption burned into it.
    src: PLATE,
    anchor: "center" as const,
    zoom: [1.04, 1.16] as [number, number],
    caption: "Direct oceanfront · impact glass · steps to the pier",
  },
];

const STILL_DURATION = 140;
const STILLS_FROM = 297;
const CONTACT = {
  from: STILLS_FROM + STILL_DURATION * STILLS.length,
  duration: 120,
};

export const SEA_MONARCH_FILM_DURATION_IN_FRAMES = CONTACT.from + CONTACT.duration;


const VerticalChrome: React.FC<{ theme: ReturnType<typeof getBrandTheme> }> = ({
  theme,
}) => (
  <AbsoluteFill
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "150px 0",
      fontFamily: theme.fontFamily,
      color: theme.colors.text,
      pointerEvents: "none",
    }}
  >
    <div style={{ fontSize: 46, letterSpacing: "0.18em", textTransform: "uppercase" }}>
      Linda S. Hoyt
    </div>
    <div
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 22,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: theme.colors.secondary,
        textAlign: "center",
      }}
    >
      111 N Pompano Beach Blvd · Unit 611
    </div>
  </AbsoluteFill>
);

/** Fades a section in, and out again if it is followed by another. */
const SectionFade: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const FilmSection: React.FC<{
  orientation: "landscape" | "vertical";
  theme: ReturnType<typeof getBrandTheme>;
}> = ({ orientation, theme }) => {
  const { width } = useVideoConfig();

  const video = (
    <OffthreadVideo
      src={staticFile(SOURCE)}
      muted
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "contrast(1.05) saturate(1.06)",
      }}
    />
  );

  if (orientation === "landscape") {
    return <AbsoluteFill>{video}</AbsoluteFill>;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(SOURCE)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(48px) brightness(0.55)",
            transform: "scale(1.2)",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `${theme.colors.background}b0` }} />
      <AbsoluteFill
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ width: "100%", height: (width * 9) / 16, overflow: "hidden" }}>
          {video}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SeaMonarchFilm: React.FC<SeaMonarchFilmProps> = ({ orientation }) => {
  const theme = getBrandTheme(BRAND_ID);
  const isVertical = orientation === "vertical";
  const cardScale = isVertical ? 1.6 : 1.5;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Music bed, ducked under the narration so the voice stays clear. */}
      <Sequence durationInFrames={MUSIC_SPLIT + MUSIC_OVERLAP}>
        <Audio
          src={staticFile(MUSIC)}
          volume={(f) =>
            interpolate(
              f,
              [
                0,
                25,
                FILM.from - 5,
                FILM.from + 15,
                FILM.from + NARRATION_DURATION - 20,
                FILM.from + NARRATION_DURATION + 20,
                MUSIC_SPLIT,
                MUSIC_SPLIT + MUSIC_OVERLAP,
              ],
              [0, 0.5, 0.5, 0.13, 0.13, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      </Sequence>
      <Sequence
        from={MUSIC_SPLIT}
        durationInFrames={SEA_MONARCH_FILM_DURATION_IN_FRAMES - MUSIC_SPLIT}
      >
        <Audio
          src={staticFile(MUSIC)}
          volume={(f) =>
            interpolate(
              f,
              [
                0,
                MUSIC_OVERLAP,
                SEA_MONARCH_FILM_DURATION_IN_FRAMES - MUSIC_SPLIT - 45,
                SEA_MONARCH_FILM_DURATION_IN_FRAMES - MUSIC_SPLIT,
              ],
              [0, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      </Sequence>

      <Sequence from={FILM.from} durationInFrames={NARRATION_DURATION}>
        <Audio
          src={staticFile(SOURCE)}
          volume={(f) =>
            interpolate(f, [0, 6, NARRATION_DURATION - 12, NARRATION_DURATION], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={BRAND_OPEN.from} durationInFrames={BRAND_OPEN.duration}>
        <SectionFade durationInFrames={BRAND_OPEN.duration}>
          <EditorialCard
            theme={theme}
            eyebrow="Unparalleled service"
            wordmark="Linda S. Hoyt"
            lines={["Florida real estate expert"]}
            scale={cardScale}
            wordmarkFontSize={isVertical ? 74 : undefined}
          />
        </SectionFade>
      </Sequence>

      <Sequence from={FILM.from} durationInFrames={FILM.duration}>
        <SectionFade durationInFrames={FILM.duration}>
          <FilmSection orientation={orientation} theme={theme} />
        </SectionFade>
      </Sequence>

      {STILLS.map((still, index) => (
        <Sequence
          key={still.caption}
          from={STILLS_FROM + index * STILL_DURATION}
          durationInFrames={STILL_DURATION}
        >
          <SectionFade durationInFrames={STILL_DURATION}>
            <StillScene
              theme={theme}
              src={still.src}
              anchor={still.anchor}
              zoom={still.zoom}
              caption={still.caption}
              orientation={orientation}
              plateSrc={PLATE}
              durationInFrames={STILL_DURATION}
            />
          </SectionFade>
        </Sequence>
      ))}

      {isVertical ? (
        <Sequence from={FILM.from} durationInFrames={CONTACT.from - FILM.from}>
          <VerticalChrome theme={theme} />
        </Sequence>
      ) : null}

      <Sequence from={CONTACT.from} durationInFrames={CONTACT.duration}>
        <EditorialCard
          theme={theme}
          eyebrow="111 N Pompano Beach Blvd · Unit 611"
          wordmark="Linda S. Hoyt"
          lines={["ONE Sotheby's International Realty", "(954) 647-9295"]}
          emphasis="$775,000"
          portraitSrc={theme.logo}
          button="Let's connect"
          footnote="lindahoytrealestate.com"
          scale={cardScale}
          wordmarkFontSize={isVertical ? 74 : undefined}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
