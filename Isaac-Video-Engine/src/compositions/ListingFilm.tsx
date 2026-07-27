/**
 * ListingFilm — takes a supplied listing video (e.g. an AI-generated or
 * videographer-shot cut) and finishes it with a clean, branded agent end
 * card overlaid on the tail. Used when the source footage is good but its
 * closing frames carry no branding — or, in the case of generated footage,
 * carry garbled text and wrong contact details that must be covered.
 *
 * The source audio keeps playing underneath the end card, so the music
 * resolves naturally instead of cutting off.
 */
import { AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";

export type ListingFilmProps = {
  /** Source video, relative to public/ — e.g. "assets/videos/foo.mp4". */
  videoSrc: string;
  /** Pre-composed end-card image, relative to public/. */
  endCardSrc: string;
  /** Frame at which the end card starts covering the footage. */
  endCardStartFrame: number;
  /** Cross-fade length for the end card, in frames. */
  fadeInFrames?: number;
};

const EndCardOverlay: React.FC<{ src: string; fadeInFrames: number }> = ({
  src,
  fadeInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

export const ListingFilm: React.FC<ListingFilmProps> = ({
  videoSrc,
  endCardSrc,
  endCardStartFrame,
  fadeInFrames = 14,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <OffthreadVideo src={staticFile(videoSrc)} />
      <Sequence from={endCardStartFrame}>
        <EndCardOverlay src={endCardSrc} fadeInFrames={fadeInFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SEA_MONARCH_611_PROPS: ListingFilmProps = {
  videoSrc: "assets/videos/sea-monarch-611-source.mp4",
  endCardSrc: "assets/endcard-611.png",
  // Source footage is clean through ~6.9s; its own closing card is garbled.
  endCardStartFrame: 207,
};

/** 10.0s of source footage at 30fps. */
export const SEA_MONARCH_611_DURATION_IN_FRAMES = 300;
