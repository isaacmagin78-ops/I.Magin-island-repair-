#!/usr/bin/env node
import {existsSync, mkdirSync, readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const assetsDir = path.join(root, 'assets');
const outputDir = path.join(root, 'output');

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp'];
const VIDEO_EXT = ['.mp4', '.mov', '.webm'];
const MUSIC_EXT = ['.mp3', '.wav', '.m4a', '.aac'];
const CAPTION_EXT = ['.srt', '.txt', '.json'];

const countByExt = (dir, exts) => {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((f) => exts.includes(path.extname(f).toLowerCase())).length;
};

const photoCount = countByExt(path.join(assetsDir, 'photos'), IMAGE_EXT);
const videoCount = countByExt(path.join(assetsDir, 'video'), VIDEO_EXT);
const musicCount = countByExt(path.join(assetsDir, 'music'), MUSIC_EXT);
const logoCount = countByExt(path.join(assetsDir, 'logo'), IMAGE_EXT.concat(['.svg']));
const captionCount = countByExt(path.join(assetsDir, 'captions'), CAPTION_EXT);

console.log('Tyson Video Engine — one-command render');
console.log(`  photos:   ${photoCount}`);
console.log(`  video:    ${videoCount}`);
console.log(`  captions: ${captionCount > 0 ? 'yes' : 'no'}`);
console.log(`  music:    ${musicCount > 0 ? 'yes' : 'no'}`);
console.log(`  logo:     ${logoCount > 0 ? 'yes' : 'no'}`);

if (photoCount === 0 && videoCount === 0) {
  console.warn('\nWarning: no photos or videos found in assets/photos or assets/video.');
  console.warn('Rendering will produce a short placeholder clip instead of a real reel.\n');
}

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, {recursive: true});
}

const outputArg = process.argv[2];
const outputFile = outputArg ? path.resolve(outputArg) : path.join(outputDir, 'tyson-reel.mp4');

console.log(`\nRendering TysonReel -> ${path.relative(root, outputFile)}\n`);

execFileSync('npx', ['remotion', 'render', 'src/index.ts', 'TysonReel', outputFile], {
  cwd: root,
  stdio: 'inherit',
});

console.log(`\nDone. Output: ${outputFile}`);
