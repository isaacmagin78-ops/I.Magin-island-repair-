/**
 * TikTok-style animated captions with word-by-word highlighting.
 *
 * Design decision: this follows the official @remotion/captions pattern
 * (createTikTokStyleCaptions -> one <Sequence> per page -> highlight the
 * active token by absolute time) rather than a hand-rolled timing system,
 * so caption behavior stays correct as Remotion's captions package evolves.
 *
 * Input is a plain `Caption[]` (see `lib/types` re-export) — typically
 * produced by a transcription step and saved as JSON in `public/`, but you
 * can also construct it by hand for scripted captions.
 */
import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { useMemo } from "react";
import type { BrandTheme } from "../lib/types";

export type { Caption };

type Props = {
  captions: Caption[];
  theme: BrandTheme;
  /** How many ms of speech are grouped into one on-screen caption page. */
  switchCaptionsEveryMs?: number;
  /** Vertical position within the safe area. */
  position?: "bottom" | "center" | "top";
  fontSize?: number;
};

export const AnimatedCaptions: React.FC<Props> = ({
  captions,
  theme,
  switchCaptionsEveryMs = 1200,
  position = "bottom",
  fontSize = 52,
}) => {
  const { fps } = useVideoConfig();

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: switchCaptionsEveryMs,
      }),
    [captions, switchCaptionsEveryMs],
  );

  const justifyContent =
    position === "bottom" ? "flex-end" : position === "top" ? "flex-start" : "center";

  return (
    <AbsoluteFill
      style={{ justifyContent, alignItems: "center", paddingBottom: position === "bottom" ? 260 : 0, paddingTop: position === "top" ? 200 : 0 }}
    >
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.round((page.startMs / 1000) * fps);
        // A page stays up until its last token has been spoken (pages can
        // run longer than switchCaptionsEveryMs — the grouper only splits
        // once a page *exceeds* that length), plus a short linger before
        // hiding during silence. Capping at startFrame + switch window cut
        // long pages mid-highlight and left gaps between contiguous pages.
        const lastTokenEndMs = page.tokens[page.tokens.length - 1]?.toMs ?? page.startMs;
        const endFrame = Math.min(
          nextPage ? Math.round((nextPage.startMs / 1000) * fps) : Infinity,
          Math.round((lastTokenEndMs / 1000) * fps) +
            Math.round((switchCaptionsEveryMs / 1000) * fps),
        );
        const durationInFrames = endFrame - startFrame;

        if (durationInFrames <= 0) return null;

        // layout="none": the default Sequence wrapper is an AbsoluteFill,
        // which would escape this component's flex positioning and pin
        // every page (and its backdrop blur) to the top-left corner.
        return (
          <Sequence
            key={page.startMs}
            from={startFrame}
            durationInFrames={durationInFrames}
            layout="none"
          >
            <CaptionPage page={page} theme={theme} fontSize={fontSize} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const CaptionPage: React.FC<{
  page: ReturnType<typeof createTikTokStyleCaptions>["pages"][number];
  theme: BrandTheme;
  fontSize: number;
}> = ({ page, theme, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <div
      style={{
        maxWidth: "88%",
        textAlign: "center",
        fontFamily: theme.fontFamily,
        fontSize,
        fontWeight: 800,
        lineHeight: 1.25,
        whiteSpace: "pre-wrap",
        padding: "14px 28px",
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
      }}
    >
      {page.tokens.map((token) => {
        const isActive = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
        const isSpoken = token.toMs <= absoluteTimeMs;
        return (
          <span
            key={token.fromMs}
            style={{
              color: isActive ? theme.colors.accent : theme.colors.text,
              opacity: isSpoken || isActive ? 1 : 0.55,
              textShadow: isActive
                ? `0 0 24px ${theme.colors.accent}99`
                : "0 2px 8px rgba(0,0,0,0.6)",
              transition: "color 0.05s linear",
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
