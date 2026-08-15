import type {CaptionCue} from './types';

/** "00:00:01,500" -> 1.5 (seconds) */
const srtTimeToSeconds = (t: string): number => {
  const [h, m, sRest] = t.trim().split(':');
  const [s, ms] = sRest.split(',');
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms || 0) / 1000;
};

export const parseSrt = (content: string, fps: number): CaptionCue[] => {
  const blocks = content.replace(/\r/g, '').trim().split(/\n\n+/);
  const cues: CaptionCue[] = [];
  for (const block of blocks) {
    const lines = block.split('\n').filter(Boolean);
    const timeLine = lines.find((l) => l.includes('-->'));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split('-->');
    const text = lines.slice(lines.indexOf(timeLine) + 1).join(' ').trim();
    if (!text) continue;
    cues.push({
      startFrame: Math.round(srtTimeToSeconds(startStr) * fps),
      endFrame: Math.round(srtTimeToSeconds(endStr) * fps),
      text,
    });
  }
  return cues;
};

interface RawJsonCue {
  start: number;
  end: number;
  text: string;
}

export const parseJsonCues = (content: string, fps: number): CaptionCue[] => {
  const data = JSON.parse(content) as RawJsonCue[];
  return data.map((c) => ({
    startFrame: Math.round(c.start * fps),
    endFrame: Math.round(c.end * fps),
    text: c.text,
  }));
};

/** No explicit timing given: split plain text into sentences/lines and spread
 * them evenly across the video's total duration. Still fully automatic —
 * just without per-word precision. */
export const distributeEvenly = (text: string, totalFrames: number): CaptionCue[] => {
  const parts = text
    .split(/\r?\n+|(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return [];
  const perCue = Math.max(1, Math.floor(totalFrames / parts.length));
  return parts.map((p, i) => ({
    startFrame: i * perCue,
    endFrame: i === parts.length - 1 ? totalFrames : (i + 1) * perCue,
    text: p,
  }));
};

/** Reads a caption asset (served from the local public dir) and converts it
 * to frame-accurate cues. Supports .srt (real timestamps), .json
 * ([{start,end,text}] in seconds), and plain .txt (auto-distributed evenly).
 * This is local, file-driven auto-captioning — no speech-to-text/paid API. */
export const buildCaptionCues = async (
  captionAsset: {src: string; name: string} | undefined,
  totalFrames: number,
  fps: number,
): Promise<CaptionCue[]> => {
  if (!captionAsset) return [];
  const response = await fetch(captionAsset.src);
  const content = await response.text();
  const ext = captionAsset.name.slice(captionAsset.name.lastIndexOf('.')).toLowerCase();

  if (ext === '.srt') return parseSrt(content, fps);
  if (ext === '.json') return parseJsonCues(content, fps);
  return distributeEvenly(content, totalFrames);
};
