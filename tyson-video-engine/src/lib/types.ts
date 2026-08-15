export type SceneAsset =
  | {kind: 'image'; src: string; name: string}
  | {kind: 'video'; src: string; name: string; durationInSeconds: number};

export interface Scene {
  asset: SceneAsset;
  durationInFrames: number;
}

export type TransitionPresentation = 'fade' | 'slide' | 'wipe';

export interface CaptionCue {
  startFrame: number;
  endFrame: number;
  text: string;
}
