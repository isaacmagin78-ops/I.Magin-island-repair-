/**
 * Diagnostic composition for Phase 4 (audio system). Plays a 12s music
 * bed with fade in/out, and a 3s voiceover in the middle that ducks the
 * music. Verified not by ear during automated testing but by rendering
 * and running ffmpeg's volumedetect on isolated time segments of the
 * output — see TROUBLESHOOTING.md "How to verify audio behavior".
 */
import { AbsoluteFill, Sequence } from "remotion";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { VoiceoverTrack } from "../components/VoiceoverTrack";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { getBrandTheme } from "../branding/themes";

export const AUDIO_TEST_DURATION_IN_FRAMES = 360; // 12s @ 30fps

const VOICEOVER_START = 120; // 4s in
const VOICEOVER_DURATION = 90; // 3s

const theme = getBrandTheme("isaac-video-engine");

export const AudioTest: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGradient theme={theme} />

      <BackgroundMusic
        track={{
          src: "assets/music/test-music.mp3",
          volume: 0.8,
          fadeInFrames: 30,
          fadeOutFrames: 30,
          duckToVolume: 0.2,
        }}
        duckDuringRanges={[
          {
            startFrame: VOICEOVER_START,
            endFrame: VOICEOVER_START + VOICEOVER_DURATION,
          },
        ]}
      />

      <Sequence from={VOICEOVER_START} durationInFrames={VOICEOVER_DURATION}>
        <VoiceoverTrack
          track={{ src: "assets/voiceover/test-voiceover.mp3" }}
          durationInFrames={VOICEOVER_DURATION}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
