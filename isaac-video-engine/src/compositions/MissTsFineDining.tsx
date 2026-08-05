/**
 * "Miss T's" — a 14.5s vertical short that frames a kitten's relocated food
 * bowl as an exclusive rooftop restaurant.
 *
 * The joke is structural, so the edit carries it: the Miss T footage plays
 * slightly *under* speed throughout (she takes her time), and is interrupted
 * exactly once by a hard, full-speed cut to Tyson — the reason the
 * ground-floor dining room closed.
 *
 * Source footage is one continuous 7.87s handheld take with a natural slow
 * push-in that ends on the kitten looking straight down the lens. That look
 * is the punchline, so the cut to Tyson is placed *before* it and the last
 * caption is timed to land on it.
 *
 * Everything typographic comes from `components/` (MenuPlate, MenuCaption,
 * ImpactSlate, EstablishmentCard) driven by the `miss-ts` brand theme.
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EstablishmentCard } from "../components/EstablishmentCard";
import { ImpactSlate } from "../components/ImpactSlate";
import { MenuCaption } from "../components/MenuCaption";
import { MenuPlate } from "../components/MenuPlate";
import { getBrandTheme } from "../branding/themes";
import { loadBrandFonts } from "../lib/fonts";
import { assetFile } from "../utils/assets";

const MISS_T = assetFile("videos/miss-t-dining-source.mp4");
const TYSON = assetFile("videos/tyson-incident.mp4");
const LOOK_STILL = assetFile("images/miss-t-look.jpg");
const MUSIC = assetFile("music/dining-piano-bed.wav");
const SFX_BELL = assetFile("sfx/bell.wav");
const SFX_THUD = assetFile("sfx/thud.wav");
const SFX_CHIME = assetFile("sfx/chime.wav");

/**
 * Act lengths in *screen* frames. Act I and Act III are contiguous halves of
 * the same take split around the Tyson cut, both slowed, so the joined
 * footage still reads as one continuous shot.
 */
const ACT_I = 191; // source 0.00 → 5.10s at 0.80x
const ACT_II = 38; // Tyson, full speed
const ACT_III = 105; // source 5.10 → 7.85s at 0.785x — ends on the look
const ACT_IV = 100; // end card

const MISS_T_RATE_I = 0.8;
const MISS_T_RATE_III = 0.785;
/** Source frame where Act III resumes (5.10s x 30fps). */
const ACT_III_START_FRAME = 153;

export const MISS_TS_DURATION = ACT_I + ACT_II + ACT_III + ACT_IV; // 434 = 14.47s

const ACT_II_START = ACT_I;
const ACT_III_START = ACT_I + ACT_II;
const ACT_IV_START = ACT_I + ACT_II + ACT_III;

const theme = getBrandTheme("miss-ts");

/** Warm restaurant grade + vignette, applied over every footage act. */
const Grade: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(120% 78% at 50% 42%, rgba(0,0,0,0) 42%, rgba(8,6,4,0.42) 84%, rgba(8,6,4,0.68) 100%)",
    }}
  />
);

const FOOTAGE_FILTER = "saturate(1.06) contrast(1.04) brightness(0.99)";

/** Act I + III — Miss T, under speed. */
const DiningShot: React.FC<{ startFromFrame: number; playbackRate: number }> = ({
  startFromFrame,
  playbackRate,
}) => (
  <AbsoluteFill style={{ backgroundColor: "#0d0b09" }}>
    <OffthreadVideo
      src={MISS_T}
      muted
      startFrom={startFromFrame}
      playbackRate={playbackRate}
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: FOOTAGE_FILTER }}
    />
    <Grade />
  </AbsoluteFill>
);

/** Act II — the smash cut. Handheld shake sells the speed difference. */
const IncidentShot: React.FC = () => {
  const frame = useCurrentFrame();
  const shakeX = Math.sin(frame * 1.9) * 9 * Math.max(0, 1 - frame / 26);
  const shakeY = Math.cos(frame * 2.4) * 7 * Math.max(0, 1 - frame / 26);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={TYSON}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(1.06) translate(${shakeX}px, ${shakeY}px)`,
          filter: "saturate(0.92) contrast(1.18) brightness(0.94)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Act IV — the end card, over a slowly drifting frozen frame. */
const Establishment: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [1.04, 1.11]);
  const settle = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0b09" }}>
      <Img
        src={LOOK_STILL}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${drift})`,
          filter: `blur(${settle * 6}px) saturate(0.88) brightness(${1 - settle * 0.42})`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(10,8,6,0.42)", opacity: settle }} />
      <EstablishmentCard
        theme={theme}
        eyebrow="Reservations only · Est. 2026"
        wordmark="Miss T’s"
        wordmarkFontSize={124}
        rating={5}
        lines={["Rooftop seating · Elev. 3 ft", "Silver service · No dogs"]}
        quote="“Elevated. Literally.”"
        footnote="Ground-floor location permanently closed"
      />
    </AbsoluteFill>
  );
};

export const MissTsFineDining: React.FC = () => {
  // Holds the render open until the self-hosted faces are ready, so no frame
  // is ever captured in a fallback font. Idempotent per browser page.
  loadBrandFonts();
  const frame = useCurrentFrame();

  const openFade = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const closeFade = interpolate(
    frame,
    [MISS_TS_DURATION - 16, MISS_TS_DURATION - 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: openFade * closeFade }}>
        {/* ── Act I — the establishment ─────────────────────────────── */}
        <Sequence durationInFrames={ACT_I} name="I · The establishment">
          <DiningShot startFromFrame={0} playbackRate={MISS_T_RATE_I} />
          <MenuPlate
            theme={theme}
            eyebrow="Reservations only"
            wordmark="Miss T’s"
            subline="Rooftop dining · elev. 3 ft"
            position="bottom"
            offset={230}
            appearAt={8}
            exitAt={118}
          />
          <MenuCaption
            theme={theme}
            lines={["Management relocated", "her dining room."]}
            position="top"
            offset={250}
            appearAt={52}
            exitAt={112}
          />
          <MenuCaption
            theme={theme}
            lines={["The ground floor was", "…compromised."]}
            position="top"
            offset={250}
            appearAt={128}
          />
        </Sequence>

        {/* ── Act II — the incident ─────────────────────────────────── */}
        <Sequence from={ACT_II_START} durationInFrames={ACT_II} name="II · The incident">
          <IncidentShot />
          <ImpactSlate
            theme={theme}
            kicker="The problem"
            headline="Tyson"
            sub="One lick. Bowl gone."
            headlineFontSize={230}
            hitAt={0}
          />
        </Sequence>

        {/* ── Act III — the philosophy, ending on the look ──────────── */}
        <Sequence from={ACT_III_START} durationInFrames={ACT_III} name="III · The look">
          <DiningShot
            startFromFrame={ACT_III_START_FRAME}
            playbackRate={MISS_T_RATE_III}
          />
          <MenuCaption
            theme={theme}
            lines={["Miss T prefers", "to take her time."]}
            position="top"
            offset={250}
            appearAt={6}
            exitAt={48}
          />
          <MenuCaption
            theme={theme}
            lines={["Some of us are here", "for the experience."]}
            position="bottom"
            offset={210}
            appearAt={58}
            italic
            fontSize={66}
          />
        </Sequence>

        {/* ── Act IV — the end card ─────────────────────────────────── */}
        <Sequence from={ACT_IV_START} durationInFrames={ACT_IV} name="IV · The establishment card">
          <Establishment />
        </Sequence>
      </AbsoluteFill>

      {/* ── Sound ───────────────────────────────────────────────────── */}
      <Audio
        src={MUSIC}
        volume={(f) => {
          // Duck hard under the smash cut, then come back up.
          const duck =
            f > ACT_II_START - 3 && f < ACT_III_START + 8
              ? interpolate(
                  f,
                  [ACT_II_START - 3, ACT_II_START + 2, ACT_III_START, ACT_III_START + 8],
                  [1, 0.22, 0.22, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                )
              : 1;
          const out = interpolate(
            f,
            [MISS_TS_DURATION - 34, MISS_TS_DURATION - 2],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return 0.52 * duck * out;
        }}
      />
      <Sequence from={10} name="sfx · bell">
        <Audio src={SFX_BELL} volume={0.5} />
      </Sequence>
      <Sequence from={ACT_II_START} name="sfx · impact">
        <Audio src={SFX_THUD} volume={0.95} />
      </Sequence>
      <Sequence from={ACT_IV_START} name="sfx · chime">
        <Audio src={SFX_CHIME} volume={0.42} />
      </Sequence>
    </AbsoluteFill>
  );
};
