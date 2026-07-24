/**
 * The Wildlife Center at Legends Ranch — legacy & fundraising film.
 * Facts verified against public sources (wildlifecentermi.org, IRS 990
 * listings for Gutierrez Wildlife Center EIN 81-4613373, press):
 * 24,000 sq ft; 3,000+ animals; continent's largest private taxidermy
 * collection; founded by Arthur Gutierrez, Sr. (5 of the top 10 SCI
 * estate whitetail records); free student field trips; Purple Heart and
 * youth hunts; 501(c)(3) since 2018.
 *
 * Museum-interior scenes currently use stat cards + the owner's Purple
 * Heart photo; swap in real Wildlife Center footage as it arrives.
 */
import { CinematicFilm, filmDurationInFrames } from "../components/CinematicFilm";
import type { CinematicSceneSpec } from "../components/CinematicScene";
import { getBrandTheme } from "../branding/themes";

export const WILDLIFE_FPS = 30;

const SCENES: CinematicSceneSpec[] = [
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip1-fog.mp4",
    durationInFrames: 170,
    title: "In Michigan's Northwoods",
    subtitle: "Bitely — along the Manistee National Forest",
    vo: { src: "assets/voiceover/wc-01.wav", durationInFrames: 144 },
  },
  {
    kind: "stat",
    statValue: "24,000 SQ FT",
    statLabel:
      "3,000+ animals from every corner of the earth — the continent's largest private collection",
    durationInFrames: 260,
    vo: { src: "assets/voiceover/wc-02.wav", durationInFrames: 232 },
  },
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip3-buck.mp4",
    playbackRate: 0.55,
    durationInFrames: 385,
    title: "A Hunter's Life's Work",
    subtitle:
      "Founded by Arthur Gutierrez, Sr. — 5 of the top 10 SCI estate whitetail records",
    vo: { src: "assets/voiceover/wc-03.wav", durationInFrames: 363 },
  },
  {
    kind: "stat",
    statValue: "THOUSANDS",
    statLabel:
      "of Michigan students visit free every year — hands-on conservation education",
    durationInFrames: 285,
    vo: { src: "assets/voiceover/wc-04.wav", durationInFrames: 257 },
  },
  {
    kind: "image",
    fit: "frame",
    src: "assets/images/real-purple-heart.jpg",
    durationInFrames: 130,
    title: "Honoring Heroes",
    subtitle: "Purple Heart Hunts • Youth Challenge Hunts • Learn to Hunt",
    vo: { src: "assets/voiceover/wc-05.wav", durationInFrames: 100 },
  },
  {
    kind: "video",
    fit: "cover",
    src: "assets/videos/clip5-fire.mp4",
    playbackRate: 0.6,
    durationInFrames: 330,
    title: "Help the Legacy Live Forever",
    subtitle: "Visit • Become a Member • Donate",
    vo: { src: "assets/voiceover/wc-06.wav", durationInFrames: 297 },
  },
];

export const WILDLIFE_DURATION_IN_FRAMES = filmDurationInFrames(SCENES);

export const WildlifeCenterFilm: React.FC = () => (
  <CinematicFilm
    theme={getBrandTheme("wildlife-center")}
    scenes={SCENES}
    music={{
      src: "assets/music/legends-ranch-piano-score.wav",
      volume: 0.5,
      fadeInFrames: 30,
      fadeOutFrames: 60,
      duckToVolume: 0.16,
    }}
    lockup={{
      heading: "The Wildlife Center",
      ctaLine: "A 501(c)(3) Nonprofit — Every Gift Keeps the Doors Open",
      detailLine: "wildlifecentermi.org • Bitely, Michigan • at Legends Ranch",
      leadFrames: 110,
      headingSize: 96,
    }}
  />
);
