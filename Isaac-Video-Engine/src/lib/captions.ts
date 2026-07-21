/**
 * Caption timing helpers. The auto pipeline distributes a whole script's
 * words evenly across a whole video; scripted compositions can do better
 * because they know when each line is spoken. A CaptionCue pins one line
 * of narration to a frame window, and words are distributed evenly within
 * that window only — so captions land on the right beat without a
 * transcription API (see CLAUDE.md "Captions without a transcription API").
 */
import type { Caption } from "@remotion/captions";
import type { CaptionCue } from "./types";

export const buildCueCaptions = (
  cues: CaptionCue[],
  fps: number,
): Caption[] =>
  cues.flatMap((cue) => {
    const words = cue.text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    const fromMs = (cue.fromFrame / fps) * 1000;
    const toMs = (cue.toFrame / fps) * 1000;
    const perWordMs = (toMs - fromMs) / words.length;

    // Leading space, matching Whisper's token convention:
    // createTikTokStyleCaptions only starts a new page at a token that
    // begins with a space, so trailing-space tokens collapse the whole
    // script into a single page.
    return words.map((word, index) => ({
      text: ` ${word}`,
      startMs: Math.round(fromMs + index * perWordMs),
      endMs: Math.round(fromMs + (index + 1) * perWordMs),
      timestampMs: null,
      confidence: null,
    }));
  });
