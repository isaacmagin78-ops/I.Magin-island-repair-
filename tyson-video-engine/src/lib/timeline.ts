import {getVideoMetadata} from '@remotion/media-utils';
import {listPhotoAssets, listVideoAssets} from './assetLoader';
import type {Scene} from './types';

export const DEFAULT_IMAGE_DURATION_SECONDS = 3.5;

/** Scans /assets/photos and /assets/video and builds a sequential scene timeline.
 * Photos get a fixed duration; video clips keep their real (probed) duration.
 * Assets are ordered photos-first, each group sorted by filename — prefix files
 * like 01-, 02- to control order within a folder. */
export const buildTimeline = async (fps: number): Promise<Scene[]> => {
  const scenes: Scene[] = [];

  for (const photo of listPhotoAssets()) {
    scenes.push({
      asset: {kind: 'image', src: photo.src, name: photo.name},
      durationInFrames: Math.round(DEFAULT_IMAGE_DURATION_SECONDS * fps),
    });
  }

  for (const video of listVideoAssets()) {
    const metadata = await getVideoMetadata(video.src);
    const durationInSeconds = metadata.durationInSeconds || DEFAULT_IMAGE_DURATION_SECONDS;
    scenes.push({
      asset: {kind: 'video', src: video.src, name: video.name, durationInSeconds},
      durationInFrames: Math.max(1, Math.round(durationInSeconds * fps)),
    });
  }

  return scenes;
};
