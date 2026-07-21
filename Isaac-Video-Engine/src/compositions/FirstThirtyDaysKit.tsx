/**
 * First 30 Days Kit — launch video (Tyson's Time).
 *
 * Implements the five-beat storyboard from briefs/first-30-days-kit-launch.md
 * with exact beat timings: hook (0-3s), the hard first days (3-11s), the
 * turning point (11-19s), the kit (19-26s), CTA + end card (26-30s).
 * 30 seconds = 900 frames @ 30fps, vertical 1080×1920.
 *
 * Footage arrives via props (assembled by scripts/render-kit.mjs from
 * beat-prefixed files in assets/). Any beat with no footage renders
 * labeled FootageSlot placeholders instead, so the same composition
 * produces a shot-listed animatic with an empty assets/ and the real cut
 * with a full one. Captions are cue-timed to each beat's voiceover line
 * (lib/captions.ts), not evenly spread across the video.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { Timeline } from "../components/Timeline";
import { FootageSlot, type FootageSlotLayout } from "../components/FootageSlot";
import { StackedStatement } from "../components/StackedStatement";
import { AnimatedCaptions } from "../components/AnimatedCaptions";
import { CTAScreen } from "../components/CTAScreen";
import { EndCard } from "../components/EndCard";
import { LogoWatermark } from "../components/LogoWatermark";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { VoiceoverTrack } from "../components/VoiceoverTrack";
import { buildCueCaptions } from "../lib/captions";
import { pickKenBurnsDirection } from "../lib/motion";
import { getBrandTheme } from "../branding/themes";
import { getSocialPreset } from "../presets/social";
import type {
  AudioTrackSpec,
  CaptionCue,
  MediaAsset,
  Scene,
  SocialPresetName,
} from "../lib/types";

export const FIRST_THIRTY_DAYS_KIT_FPS = 30;
export const FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES = 900; // 30s @ 30fps

export type KitBeatId = "hook" | "problem" | "turningPoint" | "solution" | "cta";

export type KitFootage = Record<KitBeatId, MediaAsset[]>;

export type FirstThirtyDaysKitProps = {
  footage: KitFootage;
  brandId?: string;
  preset?: SocialPresetName;
  /** Overrides the brand theme's logo path (e.g. a logo found in assets/logos/). */
  logoOverride?: string;
  /** The recorded VO read; starts at the first spoken line (beat 2). */
  voiceover?: AudioTrackSpec;
  music?: AudioTrackSpec;
};

type BeatSpec = {
  from: number;
  durationInFrames: number;
  label: string;
  /** Placeholder shot descriptions, one FootageSlot each in animatic mode. */
  slots: string[];
  /** Filename prefix render-kit.mjs matches in assets/videos|images. */
  filePrefix: string;
  /** Keeps animatic slot text clear of this beat's overlay (see FootageSlot). */
  slotLayout?: FootageSlotLayout;
};

export const KIT_BEATS: Record<KitBeatId, BeatSpec> = {
  hook: {
    from: 0,
    durationInFrames: 90,
    label: "Beat 1 — Hook",
    slots: ["Day one: pressed low in the corner — raw, shaky handheld"],
    filePrefix: "hook",
    // The hook statement owns the center of this beat.
    slotLayout: "lower",
  },
  problem: {
    from: 90,
    durationInFrames: 240,
    label: "Beat 2 — The hard first days",
    slots: [
      "Untouched food bowl",
      "Chewed leash or blanket",
      "Late-night hallway pacing",
      "Sitting on the floor, keeping distance",
    ],
    filePrefix: "problem",
  },
  turningPoint: {
    from: 330,
    durationInFrames: 240,
    label: "Beat 3 — The turning point",
    slots: [
      "First tail wag — treat taken from hand",
      "Asleep belly-up",
      "Calm walk (Tyson & Walker)",
    ],
    filePrefix: "turning",
  },
  solution: {
    from: 570,
    durationInFrames: 210,
    label: "Beat 4 — The kit",
    slots: ["Phone in hand, scrolling the First 30 Days Kit"],
    filePrefix: "solution",
  },
  cta: {
    from: 780,
    durationInFrames: 120,
    label: "Beat 5 — CTA",
    slots: ["Rapid clean scroll of the toolkit"],
    filePrefix: "cta",
    // The CTA screen owns this whole beat; keep the slot to a top strip.
    slotLayout: "frame-only",
  },
};

/** VO lines pinned to their beat windows (see the brief's audio section). */
const VO_CUES: CaptionCue[] = [
  {
    text: "The first thirty days with a rescue aren't about training. They're about trust.",
    fromFrame: 90,
    toFrame: 320,
  },
  {
    text: "What changed everything wasn't a trick. It was a rhythm — same walk, same words, same calm, every single day.",
    fromFrame: 330,
    toFrame: 560,
  },
  {
    text: "So I turned those thirty days into the exact plan I wish I'd had — the First 30 Days Kit.",
    fromFrame: 570,
    toFrame: 770,
  },
  {
    text: "Give your rescue their best first thirty days. Link in bio.",
    fromFrame: 780,
    toFrame: 880,
  },
];

const VO_START_FRAME = VO_CUES[0].fromFrame;
const VO_END_FRAME = VO_CUES[VO_CUES.length - 1].toFrame;

// Music enters after the silent hook breath (~1.5s) and fades out under
// the closing CTA line, per the brief's audio strategy.
const MUSIC_START_FRAME = 45;

const CTA_OVERLAY_DURATION_IN_FRAMES = 60;
const END_CARD_DURATION_IN_FRAMES = 60;

const BEAT_TRANSITION_FRAMES = 8;

/** Splits a beat's window evenly across its clips (last clip takes the remainder). */
const buildBeatScenes = (beatId: KitBeatId, media: MediaAsset[]): Scene[] => {
  const beat = KIT_BEATS[beatId];
  const perScene = Math.floor(beat.durationInFrames / media.length);
  const beatOrdinal = (Object.keys(KIT_BEATS) as KitBeatId[]).indexOf(beatId);

  return media.map((asset, index) => {
    const isLast = index === media.length - 1;
    const isVeryFirstShot = beatId === "hook" && index === 0;
    return {
      id: `${beatId}-${index}`,
      media: asset,
      durationInFrames: isLast
        ? beat.durationInFrames - perScene * (media.length - 1)
        : perScene,
      // Stills get Ken Burns motion, direction varied per shot like the
      // auto pipeline so an all-stills cut doesn't repeat the same move;
      // real clips carry their own motion.
      kenBurns:
        asset.kind === "image"
          ? {
              direction: pickKenBurnsDirection(beatOrdinal * 3 + index),
              scaleAmount: 1.15,
            }
          : undefined,
      // The opening frame cuts in hard — raw, no ease — per the brief.
      transitionIn: isVeryFirstShot
        ? undefined
        : { kind: "fade" as const, durationInFrames: BEAT_TRANSITION_FRAMES },
      transitionOut: { kind: "fade" as const, durationInFrames: BEAT_TRANSITION_FRAMES },
    };
  });
};

const BeatMedia: React.FC<{
  beatId: KitBeatId;
  media: MediaAsset[];
  theme: ReturnType<typeof getBrandTheme>;
}> = ({ beatId, media, theme }) => {
  const beat = KIT_BEATS[beatId];

  if (media.length > 0) {
    return <Timeline scenes={buildBeatScenes(beatId, media)} />;
  }

  const perSlot = Math.floor(beat.durationInFrames / beat.slots.length);
  return (
    <AbsoluteFill>
      {beat.slots.map((slot, index) => {
        const isLast = index === beat.slots.length - 1;
        const durationInFrames = isLast
          ? beat.durationInFrames - perSlot * (beat.slots.length - 1)
          : perSlot;
        return (
          <Sequence
            key={slot}
            name={`${beat.label} · slot ${index + 1}`}
            from={index * perSlot}
            durationInFrames={durationInFrames}
          >
            <FootageSlot
              theme={theme}
              beatLabel={beat.label}
              slotLabel={slot}
              fileHint={`assets/videos/${beat.filePrefix}-0${index + 1}.mp4`}
              durationInFrames={durationInFrames}
              layout={beat.slotLayout}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const FirstThirtyDaysKit: React.FC<FirstThirtyDaysKitProps> = ({
  footage,
  brandId,
  preset: presetName,
  logoOverride,
  voiceover,
  music,
}) => {
  const baseTheme = getBrandTheme(brandId ?? "tysons-time");
  const theme = logoOverride ? { ...baseTheme, logo: logoOverride } : baseTheme;
  const preset = getSocialPreset(presetName ?? "tiktok");
  const captions = buildCueCaptions(VO_CUES, FIRST_THIRTY_DAYS_KIT_FPS);
  const endCardStart =
    FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES - END_CARD_DURATION_IN_FRAMES;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {(Object.keys(KIT_BEATS) as KitBeatId[]).map((beatId) => (
        <Sequence
          key={beatId}
          name={KIT_BEATS[beatId].label}
          from={KIT_BEATS[beatId].from}
          durationInFrames={KIT_BEATS[beatId].durationInFrames}
        >
          <BeatMedia beatId={beatId} media={footage[beatId] ?? []} theme={theme} />
        </Sequence>
      ))}

      <Sequence
        name="Hook statement"
        durationInFrames={KIT_BEATS.hook.durationInFrames}
      >
        <StackedStatement
          theme={theme}
          lines={[
            { text: "He didn't need a perfect system." },
            { text: "He just needed safety." },
          ]}
          staggerFrames={30}
        />
      </Sequence>

      <Sequence
        name="Kit lockup"
        from={KIT_BEATS.solution.from}
        durationInFrames={KIT_BEATS.solution.durationInFrames}
      >
        <StackedStatement
          theme={theme}
          position="top"
          lines={[
            { text: "THE FIRST 30 DAYS KIT" },
            {
              text: "Day-by-day plan · Decompression schedule · Printable routines",
              kind: "support",
            },
          ]}
        />
      </Sequence>

      <Sequence
        name="CTA overlay"
        from={KIT_BEATS.cta.from}
        durationInFrames={CTA_OVERLAY_DURATION_IN_FRAMES}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <CTAScreen
            theme={theme}
            headline="Get the First 30 Days Kit"
            buttonLabel="Link in bio"
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence
        name="End card"
        from={endCardStart}
        durationInFrames={END_CARD_DURATION_IN_FRAMES}
      >
        <AbsoluteFill
          style={{
            backgroundColor: theme.colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EndCard theme={theme} text="Tyson's Time" icon="none" />
        </AbsoluteFill>
      </Sequence>

      {/* Above the end card so the VO's final words stay captioned through
          the closing beat — the video must work with sound off. */}
      <Sequence
        name="Captions"
        durationInFrames={FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES}
      >
        <AnimatedCaptions captions={captions} theme={theme} position="bottom" />
      </Sequence>

      <LogoWatermark theme={theme} safeZone={preset.safeZone} />

      {voiceover ? (
        <Sequence
          name="Voiceover"
          from={VO_START_FRAME}
          durationInFrames={FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES - VO_START_FRAME}
        >
          <VoiceoverTrack
            track={voiceover}
            durationInFrames={
              FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES - VO_START_FRAME
            }
          />
        </Sequence>
      ) : null}

      {music ? (
        <Sequence
          name="Music bed"
          from={MUSIC_START_FRAME}
          durationInFrames={
            FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES - MUSIC_START_FRAME
          }
        >
          <BackgroundMusic
            track={music}
            durationInFrames={
              FIRST_THIRTY_DAYS_KIT_DURATION_IN_FRAMES - MUSIC_START_FRAME
            }
            duckDuringRanges={
              voiceover
                ? [
                    {
                      startFrame: VO_START_FRAME - MUSIC_START_FRAME,
                      endFrame: VO_END_FRAME - MUSIC_START_FRAME,
                    },
                  ]
                : []
            }
          />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
