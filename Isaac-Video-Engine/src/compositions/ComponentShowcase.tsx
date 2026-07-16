/**
 * Exercises every Phase 2 reusable component in one composition so each
 * can be visually verified with a single render, without needing a
 * separate test file per component. Not meant to be a polished video —
 * it's a diagnostic/reference composition. Keep it working as new
 * components are added; it's the fastest way to catch regressions.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { getBrandTheme } from "../branding/themes";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { LowerThird } from "../components/LowerThird";
import { ProgressBar } from "../components/ProgressBar";
import { EndCard } from "../components/EndCard";
import { CTAScreen } from "../components/CTAScreen";
import { LogoWatermark } from "../components/LogoWatermark";
import { SpeechBubble } from "../components/SpeechBubble";
import { ThoughtBubble } from "../components/ThoughtBubble";
import { AnimatedSticker } from "../components/AnimatedSticker";
import { AnimatedCaptions, type Caption } from "../components/AnimatedCaptions";

export const SHOWCASE_DURATION_IN_FRAMES = 480;

const theme = getBrandTheme("tysons-time");

const sampleCaptions: Caption[] = [
  { text: "This ", startMs: 0, endMs: 300, timestampMs: null, confidence: null },
  { text: "is ", startMs: 300, endMs: 500, timestampMs: null, confidence: null },
  { text: "word-by-word ", startMs: 500, endMs: 1100, timestampMs: null, confidence: null },
  { text: "caption ", startMs: 1100, endMs: 1500, timestampMs: null, confidence: null },
  { text: "highlighting.", startMs: 1500, endMs: 2200, timestampMs: null, confidence: null },
];

export const ComponentShowcase: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGradient theme={theme} />
      <LogoWatermark theme={theme} position="bottom-right" />

      {/* Title + Subtitle */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 24, flexDirection: "column" }}>
          <Title text="Title Component" theme={theme} exitStart={60} />
          <Subtitle text="Subtitle Component" theme={theme} startFrame={10} exitStart={60} />
        </AbsoluteFill>
      </Sequence>

      {/* Lower third */}
      <Sequence from={80} durationInFrames={70}>
        <AbsoluteFill>
          <LowerThird theme={theme} title="Lower Third" subtitle="Broadcast-style label" exitStart={50} />
        </AbsoluteFill>
      </Sequence>

      {/* Progress bar */}
      <Sequence from={150} durationInFrames={60}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <ProgressBar theme={theme} startFrame={0} endFrame={50} />
        </AbsoluteFill>
      </Sequence>

      {/* Speech + thought bubbles */}
      <Sequence from={210} durationInFrames={60}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40, flexDirection: "row" }}>
          <SpeechBubble theme={theme} text="Speech bubble component" />
          <ThoughtBubble theme={theme} text="Thought bubble component" />
        </AbsoluteFill>
      </Sequence>

      {/* Animated stickers */}
      <Sequence from={270} durationInFrames={50}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30, flexDirection: "row" }}>
          <AnimatedSticker theme={theme} label="🔥" />
          <AnimatedSticker theme={theme} label="NEW" />
        </AbsoluteFill>
      </Sequence>

      {/* Animated captions (word-by-word) */}
      <Sequence from={320} durationInFrames={70}>
        <AnimatedCaptions captions={sampleCaptions} theme={theme} position="center" />
      </Sequence>

      {/* CTA screen */}
      <Sequence from={390} durationInFrames={45}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <CTAScreen theme={theme} headline="CTA Screen" buttonLabel="Follow for more" secondaryText="@tysonstime" />
        </AbsoluteFill>
      </Sequence>

      {/* End card */}
      <Sequence from={435} durationInFrames={SHOWCASE_DURATION_IN_FRAMES - 435}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <EndCard theme={theme} text="END CARD" />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
