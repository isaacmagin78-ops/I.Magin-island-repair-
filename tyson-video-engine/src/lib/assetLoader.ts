import {getStaticFiles} from 'remotion';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm'];

const extOf = (name: string) => name.slice(name.lastIndexOf('.')).toLowerCase();

const listByFolder = (folder: string, extensions: string[]) => {
  return getStaticFiles()
    .filter((f) => f.name.startsWith(`${folder}/`))
    .filter((f) => extensions.includes(extOf(f.name)))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));
};

export const listPhotoAssets = () => listByFolder('photos', IMAGE_EXTENSIONS);
export const listVideoAssets = () => listByFolder('video', VIDEO_EXTENSIONS);
export const listMusicAssets = () => listByFolder('music', ['.mp3', '.wav', '.m4a', '.aac']);
export const listLogoAssets = () => listByFolder('logo', IMAGE_EXTENSIONS.concat(['.svg']));
