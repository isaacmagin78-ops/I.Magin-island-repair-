/**
 * ListingFilm — finishes a supplied listing video (videographer cut or
 * generated footage) into a branded, postable film.
 *
 * It does three things the raw source can't do for itself:
 *   1. keeps the agent's mark on screen throughout, so any frame is branded
 *   2. applies a light cinematic grade to the footage
 *   3. covers the source's closing frames with a branded end card — which
 *      matters most for generated footage, whose end cards routinely carry
 *      garbled text and hallucinated contact details
 *
 * Source audio keeps playing under the end card so music resolves. The
 * vertical variant re-frames the same source for Reels/TikTok/Stories:
 * the film sits in a letterbox over a blurred backdrop of itself, with
 * the listing headline above and details below.
 */
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgentEndCard } from "../components/AgentEndCard";
import { AgentLockup } from "../components/AgentLockup";
import { getBrandTheme } from "../branding/themes";

export type ListingFilmProps = {
  brandId: string;
  /** Source video, relative to public/ — e.g. "assets/videos/foo.mp4". */
  videoSrc: string;
  /** Still from the source used as the end card's blurred backdrop. */
  plateSrc: string;
  /** Frame at which the end card takes over the frame. */
  endCardStartFrame: number;
  agentName: string;
  brokerage: string;
  addressLine: string;
  price: string;
  phone: string;
  cta: string;
  /** Headline shown above the film in the vertical cut. */
  headline: string;
  /** Supporting spec line shown below the film in the vertical cut. */
  specLine: string;
  orientation: "landscape" | "vertical";
};

/** Light grade — lifts contrast and warmth without looking filtered. */
const GRADE = "contrast(1.06) saturate(1.08) brightness(1.02)";

const VerticalFrame: React.FC<{
  props: ListingFilmProps;
  theme: ReturnType<typeof getBrandTheme>;
}> = ({ props, theme }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const filmHeight = (width * 9) / 16;

  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const specIn = spring({ frame: frame - 16, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(props.plateSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(44px) brightness(0.52) saturate(1.05)",
            transform: `scale(${interpolate(frame, [0, 300], [1.15, 1.25], {
              extrapolateRight: "clamp",
            })})`,
          }}
        />
      </AbsoluteFill>
      {/* Navy veil — keeps the blurred interior from reading as muddy brown. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${theme.colors.background}e0, ${theme.colors.secondary}66 45%, ${theme.colors.background}f2)`,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 54,
        }}
      >
        <div
          style={{
            fontFamily: theme.fontFamily,
            color: theme.colors.text,
            fontSize: 62,
            textAlign: "center",
            lineHeight: 1.15,
            padding: "0 70px",
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [22, 0])}px)`,
          }}
        >
          {props.headline}
        </div>
        <div
          style={{
            width: "100%",
            height: filmHeight,
            overflow: "hidden",
            boxShadow: "0 26px 70px rgba(0,0,0,0.55)",
          }}
        >
          <OffthreadVideo
            src={staticFile(props.videoSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: GRADE }}
          />
        </div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            color: theme.colors.primary,
            fontSize: 30,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0 60px",
            opacity: specIn,
            transform: `translateY(${interpolate(specIn, [0, 1], [22, 0])}px)`,
          }}
        >
          {props.specLine}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ListingFilm: React.FC<ListingFilmProps> = (props) => {
  const theme = getBrandTheme(props.brandId);
  const isVertical = props.orientation === "vertical";
  const scale = isVertical ? 1.6 : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {isVertical ? (
        <VerticalFrame props={props} theme={theme} />
      ) : (
        <>
          <OffthreadVideo
            src={staticFile(props.videoSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: GRADE }}
          />
          <AgentLockup
            theme={theme}
            agentName={props.agentName}
            brokerage={props.brokerage}
            exitFrame={props.endCardStartFrame}
          />
        </>
      )}
      <Sequence from={props.endCardStartFrame}>
        <AgentEndCard
          theme={theme}
          plateSrc={props.plateSrc}
          agentName={props.agentName}
          brokerage={props.brokerage}
          addressLine={props.addressLine}
          price={props.price}
          phone={props.phone}
          cta={props.cta}
          scale={scale}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const SEA_MONARCH_611_BASE = {
  brandId: "luxury-coastal",
  videoSrc: "assets/videos/sea-monarch-611-source.mp4",
  plateSrc: "assets/plate-611.png",
  // The bedroom scene plays out in full and the sunset lands clean at
  // 7.40s; the source's own garbled end card ghosts in from ~7.47s, so
  // the hand-off happens exactly on that scene change.
  endCardStartFrame: 222,
  agentName: "Linda S. Hoyt",
  brokerage: "ONE Sotheby's International Realty",
  addressLine: "111 N Pompano Beach Blvd · Unit 611",
  price: "$775,000",
  phone: "(954) 647-9295",
  cta: "Private showings by appointment",
  headline: "Oceanfront Luxury\nPompano Beach",
  specLine: "2 Bed · 2 Bath · 1,450 SF · Turnkey",
} as const;

export const SEA_MONARCH_611_PROPS: ListingFilmProps = {
  ...SEA_MONARCH_611_BASE,
  headline: "Oceanfront Luxury · Pompano Beach",
  orientation: "landscape",
};

export const SEA_MONARCH_611_VERTICAL_PROPS: ListingFilmProps = {
  ...SEA_MONARCH_611_BASE,
  orientation: "vertical",
};

/**
 * 7.4s of source footage, then a 3.6s end card — ending at 11s, just past
 * where the source's music resolves on its own at 10s.
 */
export const SEA_MONARCH_611_DURATION_IN_FRAMES = 330;
