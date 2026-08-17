/**
 * ScriptShort — the render target for the faceless pipeline
 * (`npm run render:script`). Takes the lines of a written script and nothing
 * else: no footage, no stills, no camera. See `FACELESS.md`.
 *
 * Design decision, mirroring `AutoShort`: this composition carries no
 * brand-specific or subject-specific logic. Every brand-facing detail
 * arrives via props, so the same composition renders a Tyson's Time short, a
 * Legends Ranch short, or any future channel.
 *
 * Timing is *derived*, not authored. A beat is on screen for as long as it
 * takes to read plus a settle, clamped at both ends — so a text file can be
 * written by someone who has never thought about frame counts, and two
 * different-length lines don't get the same dwell. `scriptBeatDuration` is
 * exported so the pipeline script can report the timeline before rendering
 * it, without duplicating the rule.
 */
import { AbsoluteFill, CalculateMetadataFunction, Sequence } from "remotion";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ScriptCard } from "../components/ScriptCard";
import { LogoWatermark } from "../components/LogoWatermark";
import { getBrandTheme } from "../branding/themes";
import { getSocialPreset } from "../presets/social";
import type { SocialPresetName } from "../lib/types";

export type ScriptBeat = {
  /** The line the viewer is meant to read. */
  statement: string;
  /** Optional quieter lines under it. */
  supportingLines?: string[];
  /** Overrides the derived length when a beat needs a specific dwell. */
  durationInFrames?: number;
};

export type ScriptShortProps = {
  beats: ScriptBeat[];
  brandId?: string;
  preset?: SocialPresetName;
  /** Wide-tracked micro-label, shown on the opening card only. */
  eyebrow?: string;
};

/**
 * Reading pace for on-screen short-form text. Slower than speech: the viewer
 * is reading, not listening, and a line they didn't finish is a line they
 * scrolled past.
 */
const WORDS_PER_SECOND = 2.6;
/** Allowance for the card to rise in and settle out around the read. */
const SETTLE_IN_SECONDS = 0.9;
const MIN_BEAT_IN_SECONDS = 2.4;
const MAX_BEAT_IN_SECONDS = 6.5;

const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

export const scriptBeatDuration = (beat: ScriptBeat, fps: number): number => {
  if (beat.durationInFrames) return beat.durationInFrames;

  const words = (beat.supportingLines ?? []).reduce(
    (total, line) => total + countWords(line),
    countWords(beat.statement),
  );

  const seconds = Math.min(
    MAX_BEAT_IN_SECONDS,
    Math.max(MIN_BEAT_IN_SECONDS, words / WORDS_PER_SECOND + SETTLE_IN_SECONDS),
  );

  return Math.round(seconds * fps);
};

export const scriptShortDurationInFrames = (
  beats: ScriptBeat[],
  fps: number,
): number =>
  beats.reduce((total, beat) => total + scriptBeatDuration(beat, fps), 0);

export const calculateScriptShortMetadata: CalculateMetadataFunction<
  ScriptShortProps
> = ({ props }) => {
  const preset = getSocialPreset(props.preset ?? "tiktok");

  return {
    durationInFrames: Math.max(
      1,
      scriptShortDurationInFrames(props.beats, preset.fps),
    ),
    fps: preset.fps,
    width: preset.width,
    height: preset.height,
  };
};

export const ScriptShort: React.FC<ScriptShortProps> = ({
  beats,
  brandId,
  preset: presetName,
  eyebrow,
}) => {
  const theme = getBrandTheme(brandId);
  const preset = getSocialPreset(presetName ?? "tiktok");

  let startFrame = 0;

  return (
    <AbsoluteFill>
      {/* Mounted outside the beats so the drift is continuous across the
          whole video — the cuts happen in the type, never in the ground. */}
      <AmbientBackdrop theme={theme} />

      {beats.map((beat, index) => {
        const durationInFrames = scriptBeatDuration(beat, preset.fps);
        const from = startFrame;
        startFrame += durationInFrames;

        return (
          <Sequence
            key={`${index}-${beat.statement}`}
            from={from}
            durationInFrames={durationInFrames}
          >
            <ScriptCard
              theme={theme}
              statement={beat.statement}
              supportingLines={beat.supportingLines}
              eyebrow={index === 0 ? eyebrow : undefined}
              durationInFrames={durationInFrames}
              safeZone={preset.safeZone}
            />
          </Sequence>
        );
      })}

      <LogoWatermark theme={theme} safeZone={preset.safeZone} />
    </AbsoluteFill>
  );
};
