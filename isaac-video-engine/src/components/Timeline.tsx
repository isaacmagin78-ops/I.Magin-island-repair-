/**
 * Lays out an ordered list of Scenes as sequential <Sequence> blocks and
 * renders each with MediaScene. This is the reusable "timeline assembler"
 * that both hand-authored compositions and the auto render pipeline
 * (Phase 6) use — the pipeline's only job is to produce a `Scene[]`; this
 * component turns that data into an actual video timeline.
 *
 * Design decision: scenes are NOT overlapped/crossfaded at the Sequence
 * level. Each scene reserves its full durationInFrames, and transitions
 * are drawn *within* that duration (see MediaScene) via opacity/transform
 * on entry and exit. This keeps total timeline duration a simple sum of
 * scene durations — easy to reason about and easy for the pipeline to
 * compute up front.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { MediaScene } from "./MediaScene";
import type { Scene } from "../lib/types";

type Props = {
  scenes: Scene[];
};

export const computeTimelineDurationInFrames = (scenes: Scene[]): number =>
  scenes.reduce((total, scene) => total + scene.durationInFrames, 0);

export const Timeline: React.FC<Props> = ({ scenes }) => {
  let cursor = 0;
  const positioned = scenes.map((scene) => {
    const from = cursor;
    cursor += scene.durationInFrames;
    return { scene, from };
  });

  return (
    <AbsoluteFill>
      {positioned.map(({ scene, from }) => (
        <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
          <MediaScene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
