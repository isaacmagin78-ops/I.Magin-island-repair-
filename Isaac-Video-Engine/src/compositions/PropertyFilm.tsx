/**
 * PropertyFilm — the listing cut, generalized.
 *
 * This is `SeaMonarchFilm` with the address taken out of it. The cut is the
 * same, and deliberately so:
 *
 *   brand open → the property, uninterrupted → feature beats → price →
 *   and only then, contact.
 *
 * Contact details never appear while the property is still being shown. Every
 * listing after the first is a `PropertyFilmSpec` in `src/listings/`, not a
 * new file in here.
 *
 * Films without moving footage are supported: omit `spec.footage` and the
 * film opens straight into the stills, with the music bed carrying it.
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
import {
  buildFilmTimeline,
  type FilmChrome,
  type PropertyFilmProps,
} from "../lib/property-film";
import type { BrandTheme } from "../lib/types";

/** Persistent name/address mark for vertical cuts. */
const VerticalChrome: React.FC<{ theme: BrandTheme; chrome: FilmChrome }> = ({
  theme,
  chrome,
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
      {chrome.wordmark}
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
      {chrome.subtitle}
    </div>
  </AbsoluteFill>
);

/** Fades a section in, and out again on the way to the next one. */
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

/**
 * In vertical cuts the footage sits in a 16:9 band over a blurred backdrop of
 * itself, matching how the stills are framed, so the cut between moving and
 * still footage doesn't change the layout under the viewer.
 */
const FootageSection: React.FC<{
  src: string;
  orientation: "landscape" | "vertical";
  theme: BrandTheme;
}> = ({ src, orientation, theme }) => {
  const { width } = useVideoConfig();

  const video = (
    <OffthreadVideo
      src={staticFile(src)}
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
          src={staticFile(src)}
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

export const PropertyFilm: React.FC<PropertyFilmProps> = ({ spec, orientation }) => {
  const theme = getBrandTheme(spec.brandId);
  const isVertical = orientation === "vertical";
  const cardScale = isVertical ? 1.6 : 1.5;
  const wordmarkFontSize = isVertical ? 74 : undefined;
  const t = buildFilmTimeline(spec);
  const { music, footage, narration } = { ...spec, ...t };

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {music ? (
        <>
          {/* First pass: ducks under the narration so the voice stays clear. */}
          <Sequence durationInFrames={music.splitInFrames + music.overlapInFrames}>
            <Audio
              src={staticFile(music.src)}
              volume={(f) =>
                interpolate(
                  f,
                  narration
                    ? [
                        0,
                        25,
                        narration.from - 5,
                        narration.from + 15,
                        narration.from + narration.durationInFrames - 20,
                        narration.from + narration.durationInFrames + 20,
                        music.splitInFrames,
                        music.splitInFrames + music.overlapInFrames,
                      ]
                    : [
                        0,
                        25,
                        music.splitInFrames - 1,
                        music.splitInFrames,
                        music.splitInFrames + music.overlapInFrames,
                      ],
                  narration
                    ? [0, 0.5, 0.5, 0.13, 0.13, 0.5, 0.5, 0]
                    : [0, 0.5, 0.5, 0.5, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                )
              }
            />
          </Sequence>
          {/* Second pass: carries the feature beats and the closing card. */}
          <Sequence
            from={music.splitInFrames}
            durationInFrames={t.durationInFrames - music.splitInFrames}
          >
            <Audio
              src={staticFile(music.src)}
              volume={(f) =>
                interpolate(
                  f,
                  [
                    0,
                    music.overlapInFrames,
                    t.durationInFrames - music.splitInFrames - 45,
                    t.durationInFrames - music.splitInFrames,
                  ],
                  [0, 0.5, 0.5, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                )
              }
            />
          </Sequence>
        </>
      ) : null}

      {/* Source narration, mounted apart from the (muted) picture so it can
          outlive the footage rather than being cut off with it. */}
      {spec.footage && narration ? (
        <Sequence from={narration.from} durationInFrames={narration.durationInFrames}>
          <Audio
            src={staticFile(spec.footage.src)}
            volume={(f) =>
              interpolate(
                f,
                [
                  0,
                  6,
                  narration.durationInFrames - 12,
                  narration.durationInFrames,
                ],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            }
          />
        </Sequence>
      ) : null}

      <Sequence from={t.open.from} durationInFrames={t.open.durationInFrames}>
        <SectionFade durationInFrames={t.open.durationInFrames}>
          <EditorialCard
            theme={theme}
            eyebrow={spec.open.eyebrow}
            wordmark={spec.open.wordmark}
            lines={spec.open.lines}
            scale={cardScale}
            wordmarkFontSize={wordmarkFontSize}
          />
        </SectionFade>
      </Sequence>

      {spec.footage && footage ? (
        <Sequence from={footage.from} durationInFrames={footage.durationInFrames}>
          <SectionFade durationInFrames={footage.durationInFrames}>
            <FootageSection
              src={spec.footage.src}
              orientation={orientation}
              theme={theme}
            />
          </SectionFade>
        </Sequence>
      ) : null}

      {spec.stills.map((still, index) => (
        <Sequence
          key={still.caption}
          from={t.stillsFrom + index * spec.stillDurationInFrames}
          durationInFrames={spec.stillDurationInFrames}
        >
          <SectionFade durationInFrames={spec.stillDurationInFrames}>
            <StillScene
              theme={theme}
              src={still.src}
              anchor={still.anchor}
              zoom={still.zoom}
              caption={still.caption}
              orientation={orientation}
              plateSrc={spec.plate}
              durationInFrames={spec.stillDurationInFrames}
            />
          </SectionFade>
        </Sequence>
      ))}

      {isVertical && spec.chrome ? (
        <Sequence
          from={t.open.durationInFrames}
          durationInFrames={t.contact.from - t.open.durationInFrames}
        >
          <VerticalChrome theme={theme} chrome={spec.chrome} />
        </Sequence>
      ) : null}

      <Sequence from={t.contact.from} durationInFrames={t.contact.durationInFrames}>
        <EditorialCard
          theme={theme}
          eyebrow={spec.contact.eyebrow}
          wordmark={spec.contact.wordmark}
          lines={spec.contact.lines}
          emphasis={spec.contact.emphasis}
          portraitSrc={spec.contact.portraitSrc}
          button={spec.contact.button}
          footnote={spec.contact.footnote}
          scale={cardScale}
          wordmarkFontSize={wordmarkFontSize}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
