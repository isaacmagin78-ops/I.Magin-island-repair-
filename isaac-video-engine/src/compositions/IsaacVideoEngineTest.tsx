import { AbsoluteFill, Sequence } from "remotion";
import { DarkBackground } from "../components/DarkBackground";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { SystemVerified } from "../components/SystemVerified";

export const TOTAL_DURATION_IN_FRAMES = 300;

const TITLE_EXIT_START = 220;
const SUBTITLE_START = 10;
const SUBTITLE_EXIT_START = 220;
const PROGRESS_START = 20;
const PROGRESS_END = 220;
const VERIFIED_START = 230;

export const IsaacVideoEngineTest: React.FC = () => {
  return (
    <AbsoluteFill>
      <DarkBackground />

      <Sequence  durationInFrames={VERIFIED_START}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 28,
            padding: "0 80px",
          }}
        >
          <AnimatedTitle text="Isaac Video Engine" exitStart={TITLE_EXIT_START} />
          <AnimatedSubtitle
            text="Claude Code + Remotion"
            startFrame={SUBTITLE_START}
            exitStart={SUBTITLE_EXIT_START}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 220,
          }}
        >
          <ProgressIndicator startFrame={PROGRESS_START} endFrame={PROGRESS_END} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={VERIFIED_START} durationInFrames={TOTAL_DURATION_IN_FRAMES - VERIFIED_START}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <SystemVerified />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
