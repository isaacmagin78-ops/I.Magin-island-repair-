/**
 * Assembles a full cinematic film from scene specs: sequenced
 * CinematicSceneBlocks, per-scene voiceover lines (music ducks under
 * them automatically), letterbox bars, background music, and a closing
 * brand lockup. Compositions using this are pure data + a theme.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { BackgroundMusic } from "./BackgroundMusic";
import { BrandLockup } from "./BrandLockup";
import { CinematicSceneBlock, type CinematicSceneSpec } from "./CinematicScene";
import { VoiceoverTrack } from "./VoiceoverTrack";
import type { AudioTrackSpec, BrandTheme } from "../lib/types";

export const filmDurationInFrames = (scenes: CinematicSceneSpec[]): number =>
  scenes.reduce((sum, s) => sum + s.durationInFrames, 0);

type LockupSpec = {
  heading: string;
  ctaLine: string;
  detailLine: string;
  leadFrames: number;
  headingSize?: number;
};

type Props = {
  theme: BrandTheme;
  scenes: CinematicSceneSpec[];
  music: AudioTrackSpec;
  lockup: LockupSpec;
  letterboxHeight?: number;
  /** Frames into the scene at which each VO line starts. */
  voDelayFrames?: number;
};

export const CinematicFilm: React.FC<Props> = ({
  theme,
  scenes,
  music,
  lockup,
  letterboxHeight = 104,
  voDelayFrames = 12,
}) => {
  const total = filmDurationInFrames(scenes);
  const lockupStart = total - lockup.leadFrames;

  let cursor = 0;
  const placed = scenes.map((scene, index) => {
    const from = cursor;
    cursor += scene.durationInFrames;
    return { scene, from, index };
  });

  const voWindows = placed
    .filter(({ scene }) => scene.vo)
    .map(({ scene, from }) => ({
      src: (scene.vo as NonNullable<CinematicSceneSpec["vo"]>).src,
      from: from + voDelayFrames,
      durationInFrames:
        (scene.vo as NonNullable<CinematicSceneSpec["vo"]>).durationInFrames + 6,
    }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {placed.map(({ scene, from, index }) => (
        <Sequence key={index} from={from} durationInFrames={scene.durationInFrames}>
          <CinematicSceneBlock
            theme={theme}
            scene={scene}
            isFirst={index === 0}
            letterboxHeight={letterboxHeight}
            hideTitleEarly={
              index === scenes.length - 1
                ? scene.durationInFrames - lockup.leadFrames - 12
                : undefined
            }
          />
        </Sequence>
      ))}

      <Sequence from={lockupStart} durationInFrames={lockup.leadFrames}>
        <BrandLockup
          theme={theme}
          heading={lockup.heading}
          ctaLine={lockup.ctaLine}
          detailLine={lockup.detailLine}
          headingSize={lockup.headingSize}
        />
      </Sequence>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: letterboxHeight,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: letterboxHeight,
          background: "#000",
        }}
      />

      {voWindows.map((line) => (
        <Sequence key={line.src} from={line.from} durationInFrames={line.durationInFrames}>
          <VoiceoverTrack
            track={{ src: line.src, volume: 1 }}
            durationInFrames={line.durationInFrames}
          />
        </Sequence>
      ))}

      <BackgroundMusic
        track={music}
        duckDuringRanges={voWindows.map((line) => ({
          startFrame: line.from,
          endFrame: line.from + line.durationInFrames,
        }))}
      />
    </AbsoluteFill>
  );
};
