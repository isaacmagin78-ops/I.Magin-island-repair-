import type {Scene, TransitionPresentation} from './types';

export const MAX_TRANSITION_FRAMES = 15;
export const PRESENTATION_CYCLE: TransitionPresentation[] = ['fade', 'slide', 'wipe'];

/** One entry per boundary between consecutive scenes (length = scenes.length - 1).
 * Clamped to half of each neighboring scene's duration so a transition never
 * eats more than a scene actually has. */
export const computeTransitionFrames = (scenes: Scene[]): number[] => {
  const frames: number[] = [];
  for (let i = 0; i < scenes.length - 1; i++) {
    const a = scenes[i].durationInFrames;
    const b = scenes[i + 1].durationInFrames;
    frames.push(Math.max(1, Math.min(MAX_TRANSITION_FRAMES, Math.floor(a / 2), Math.floor(b / 2))));
  }
  return frames;
};

/** TransitionSeries overlaps neighboring sequences by the transition's
 * duration, so the rendered total is shorter than the sum of scene
 * durations by the sum of all transition overlaps. */
export const totalDurationWithTransitions = (scenes: Scene[], transitionFrames: number[]): number => {
  const raw = scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
  const overlap = transitionFrames.reduce((sum, f) => sum + f, 0);
  return raw - overlap;
};
