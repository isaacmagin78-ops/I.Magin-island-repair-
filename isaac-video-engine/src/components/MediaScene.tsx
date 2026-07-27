/**
 * Renders one Scene's media (image or video) full-bleed with Ken Burns
 * motion and an entrance/exit transition applied. This is the single
 * component both hand-authored compositions and the auto render pipeline
 * (Phase 6) use to turn a `Scene` into pixels — keeping "how a scene looks
 * on screen" in one place instead of duplicated per composition.
 */
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { kenBurnsTransform, transitionInStyle, transitionOutStyle } from "../lib/motion";
import type { Scene } from "../lib/types";

type Props = {
  scene: Scene;
};

export const MediaScene: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();

  const kenBurns = scene.kenBurns
    ? kenBurnsTransform(frame, scene.durationInFrames, scene.kenBurns)
    : "scale(1)";

  const inStyle = scene.transitionIn
    ? transitionInStyle(frame, scene.transitionIn)
    : { opacity: 1, transform: "none", filter: "none" };

  const exitStart = scene.transitionOut
    ? scene.durationInFrames - scene.transitionOut.durationInFrames
    : scene.durationInFrames;
  const outStyle = scene.transitionOut
    ? transitionOutStyle(frame - exitStart, scene.transitionOut)
    : { opacity: 1, transform: "none", filter: "none" };

  const isExiting = scene.transitionOut ? frame >= exitStart : false;
  const activeTransitionStyle = isExiting ? outStyle : inStyle;

  return (
    <AbsoluteFill
      style={{
        opacity: activeTransitionStyle.opacity,
        filter: activeTransitionStyle.filter,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: activeTransitionStyle.transform }}>
        <AbsoluteFill style={{ transform: kenBurns }}>
          {scene.media.kind === "image" ? (
            <Img
              src={staticFile(scene.media.src)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <OffthreadVideo
              src={staticFile(scene.media.src)}
              startFrom={
                scene.media.trimStartInSeconds
                  ? Math.round(scene.media.trimStartInSeconds * 30)
                  : undefined
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
