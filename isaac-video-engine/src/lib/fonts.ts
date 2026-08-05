/**
 * Self-hosted display fonts.
 *
 * The .woff2 files live in `public/assets/fonts/` so a render never depends
 * on network access (headless Chrome in a sandboxed container often can't
 * reach fonts.gstatic.com, and a font that 404s silently falls back to
 * Times — which you only notice after a 10-minute render).
 *
 * `loadBrandFonts()` injects the @font-face rules and holds the render open
 * (`delayRender`) until the faces are actually parsed and ready, so frame 0
 * is never captured with a fallback face. It is idempotent and safe to call
 * from any composition.
 */
import { continueRender, delayRender, staticFile } from "remotion";

type FontFace = {
  family: string;
  weight: number;
  style: "normal" | "italic";
  /** File name inside public/assets/fonts/ */
  file: string;
};

const FACES: FontFace[] = [
  { family: "Playfair Display", weight: 500, style: "normal", file: "playfair-500.woff2" },
  { family: "Playfair Display", weight: 500, style: "italic", file: "playfair-500i.woff2" },
  { family: "Playfair Display", weight: 700, style: "normal", file: "playfair-700.woff2" },
  { family: "Anton", weight: 400, style: "normal", file: "anton-400.woff2" },
  { family: "Inter", weight: 400, style: "normal", file: "inter-400.woff2" },
  { family: "Inter", weight: 600, style: "normal", file: "inter-600.woff2" },
];

/**
 * Ready-made stacks. Brands reference these from `themes.ts` rather than
 * repeating font strings in component code.
 */
export const FONT_STACKS = {
  /** High-contrast editorial serif — wordmarks, captions, pull quotes. */
  serifDisplay: "'Playfair Display', Georgia, 'Times New Roman', serif",
  /** Neutral UI sans — eyebrows, small caps, fine print. */
  sansText: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  /** Heavy condensed sans — smash cuts, impact slates, meme text. */
  sansImpact: "'Anton', 'Arial Narrow', Impact, sans-serif",
} as const;

let started = false;

export const loadBrandFonts = (): void => {
  if (started || typeof document === "undefined") return;
  started = true;

  const handle = delayRender("Loading self-hosted brand fonts", {
    timeoutInMilliseconds: 30_000,
  });

  const style = document.createElement("style");
  style.setAttribute("data-brand-fonts", "true");
  style.textContent = FACES.map(
    (f) =>
      `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};` +
      `font-display:block;src:url('${staticFile(`assets/fonts/${f.file}`)}') format('woff2');}`,
  ).join("\n");
  document.head.appendChild(style);

  Promise.all(
    FACES.map((f) => document.fonts.load(`${f.style} ${f.weight} 64px '${f.family}'`)),
  )
    .then(() => document.fonts.ready)
    .then(() => continueRender(handle))
    // A missing face must not wedge the render — fall back and keep going.
    .catch(() => continueRender(handle));
};
