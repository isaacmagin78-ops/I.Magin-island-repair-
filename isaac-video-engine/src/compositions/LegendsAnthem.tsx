/**
 * Legends Ranch — brand anthem (Workflow B, hand-authored).
 * Part 1: the ranch story (licensed motion + real owner media).
 * Part 2: heritage — the founder's words and six decades of passion.
 * Assembled entirely from the shared CinematicFilm machinery; this file
 * is pure scene data + the legends-ranch theme.
 */
import { CinematicFilm, filmDurationInFrames } from "../components/CinematicFilm";
import type { CinematicSceneSpec } from "../components/CinematicScene";
import { getBrandTheme } from "../branding/themes";

export const ANTHEM_FPS = 30;

const SCENES: CinematicSceneSpec[] = [
  // ---- Part 1: the ranch ----
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip1-fog.mp4",
    durationInFrames: 175,
    title: "Deep in Michigan's Northwoods",
    subtitle: "Est. 1998 — Bitely, Michigan",
    vo: { src: "assets/voiceover/vo-01.wav", durationInFrames: 145 },
  },
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip2-aerial.mp4",
    durationInFrames: 195,
    title: "2,000 Acres of Managed Habitat",
    subtitle: "One standard of stewardship",
    vo: { src: "assets/voiceover/vo-02.wav", durationInFrames: 167 },
  },
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip3-buck.mp4",
    durationInFrames: 200,
    title: "Where 200-Inch Bucks Are the Standard",
    subtitle: "— not the exception",
    vo: { src: "assets/voiceover/vo-03.wav", durationInFrames: 174 },
  },
  {
    kind: "video",
    fit: "frame",
    src: "assets/videos/real-newborn-fawn.mp4",
    durationInFrames: 140,
    title: "Born on the Ranch",
    subtitle: "New life in the pens every spring",
    vo: { src: "assets/voiceover/vo-04.wav", durationInFrames: 110 },
  },
  {
    kind: "image",
    fit: "frame",
    src: "assets/images/real-fawns-group.jpg",
    durationInFrames: 100,
    title: "Raised Here. Cared for Daily.",
    subtitle: "The Legends Ranch deer program",
    vo: { src: "assets/voiceover/vo-05.wav", durationInFrames: 70 },
  },
  {
    kind: "video",
    fit: "frame",
    src: "assets/videos/real-fawn-care.mp4",
    durationInFrames: 130,
    title: "Family-Run Since 1998",
    subtitle: "Hands-on, every single day",
    vo: { src: "assets/voiceover/vo-06.wav", durationInFrames: 100 },
  },
  {
    kind: "image",
    fit: "frame",
    src: "assets/images/real-lodge-interior.jpg",
    durationInFrames: 110,
    title: "Rustic Luxury, Northwoods Character",
    subtitle: "The lodge at Legends",
    vo: { src: "assets/voiceover/vo-07.wav", durationInFrames: 80 },
  },
  {
    kind: "image",
    fit: "frame",
    src: "assets/images/real-shooting-range.jpg",
    durationInFrames: 115,
    title: "A World-Class Shooting Center",
    subtitle: "Sight in before your hunt — guided one-on-one",
    vo: { src: "assets/voiceover/vo-08.wav", durationInFrames: 84 },
  },
  {
    kind: "image",
    fit: "frame",
    src: "assets/images/real-purple-heart.jpg",
    durationInFrames: 140,
    title: "Honoring Our Nation's Heroes",
    subtitle: "Home of the Purple Heart Hunt",
    vo: { src: "assets/voiceover/vo-09.wav", durationInFrames: 83 },
  },
  // ---- Part 2: heritage & vision ----
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip4-cabins.mp4",
    playbackRate: 0.6,
    durationInFrames: 200,
    title: "“It's Not Just the Trophy”",
    subtitle:
      "“— it's the memory, the friendship, and the return trip.” — Arthur J. Gutierrez, Founder",
    vo: { src: "assets/voiceover/vo-11.wav", durationInFrames: 175 },
  },
  {
    kind: "stat",
    statValue: "83%",
    statLabel: "of guests return, season after season — six decades of passion, 27 years of stewardship",
    durationInFrames: 220,
    vo: { src: "assets/voiceover/vo-12.wav", durationInFrames: 199 },
  },
  // ---- Finale ----
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip5-fire.mp4",
    durationInFrames: 195,
    title: "This Is More Than a Hunt.",
    subtitle: "It's a legacy.",
    vo: { src: "assets/voiceover/vo-10.wav", durationInFrames: 128 },
  },
];

export const ANTHEM_DURATION_IN_FRAMES = filmDurationInFrames(SCENES);

export const LegendsAnthem: React.FC = () => (
  <CinematicFilm
    theme={getBrandTheme("legends-ranch")}
    scenes={SCENES}
    music={{
      src: "assets/music/legends-ranch-piano-score.wav",
      volume: 0.5,
      fadeInFrames: 30,
      fadeOutFrames: 60,
      duckToVolume: 0.16,
    }}
    lockup={{
      heading: "Legends Ranch",
      ctaLine: "Book Your Legacy Hunt",
      detailLine: "(231) 745-8000 • legendsranch.com • Bitely, Michigan",
      leadFrames: 95,
    }}
  />
);
