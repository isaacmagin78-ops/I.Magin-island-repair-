/**
 * Diagnostic composition for Phase 3 (motion system). Exercises Ken Burns
 * directions and every transition kind against real media through the
 * Timeline component, so the motion primitives are verified end-to-end
 * (not just unit-shaped) before the auto pipeline depends on them.
 */
import { Timeline, computeTimelineDurationInFrames } from "../components/Timeline";
import type { Scene } from "../lib/types";

const scenes: Scene[] = [
  {
    id: "scene-1-kenburns-in",
    media: { kind: "image", src: "assets/images/test-pattern-1.jpg" },
    durationInFrames: 60,
    kenBurns: { direction: "in", scaleAmount: 1.2 },
    transitionIn: { kind: "fade", durationInFrames: 15 },
    transitionOut: { kind: "fade", durationInFrames: 15 },
  },
  {
    id: "scene-2-pan-left",
    media: { kind: "image", src: "assets/images/test-pattern-2.jpg" },
    durationInFrames: 60,
    kenBurns: { direction: "pan-left", scaleAmount: 1.15 },
    transitionIn: { kind: "slide", durationInFrames: 15, direction: "right" },
    transitionOut: { kind: "slide", durationInFrames: 15, direction: "left" },
  },
  {
    id: "scene-3-pan-right",
    media: { kind: "image", src: "assets/images/test-pattern-3.jpg" },
    durationInFrames: 60,
    kenBurns: { direction: "pan-right", scaleAmount: 1.15 },
    transitionIn: { kind: "zoom", durationInFrames: 15 },
    transitionOut: { kind: "zoom", durationInFrames: 15 },
  },
  {
    id: "scene-4-out",
    media: { kind: "image", src: "assets/images/test-pattern-1.jpg" },
    durationInFrames: 60,
    kenBurns: { direction: "out", scaleAmount: 1.2 },
    transitionIn: { kind: "blur", durationInFrames: 15 },
    transitionOut: { kind: "blur", durationInFrames: 15 },
  },
];

export const MOTION_TEST_DURATION_IN_FRAMES = computeTimelineDurationInFrames(scenes);

export const MotionTest: React.FC = () => <Timeline scenes={scenes} />;
