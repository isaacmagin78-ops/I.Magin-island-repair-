/**
 * Animated sticker: wraps an emoji, short text badge, or image asset with
 * a pop-in + idle wobble, mimicking the "sticker" overlays common on
 * short-form video. Use for reaction emoji, badges ("NEW", "HOT TAKE"),
 * or small PNG stickers dropped in assets/.
 */
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

type Props = {
  theme: BrandTheme;
  /** Emoji or short text, e.g. "🔥" or "NEW". Ignored if `imageSrc` is set. */
  label?: string;
  /** Path relative to public/, e.g. "assets/stickers/fire.png". */
  imageSrc?: string;
  size?: number;
  rotationDeg?: number;
};

export const AnimatedSticker: React.FC<Props> = ({
  theme,
  label,
  imageSrc,
  size = 120,
  rotationDeg = -8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRINGS.pop });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const wobble = Math.sin(frame / 12) * 4;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale}) rotate(${rotationDeg + wobble}deg)`,
      }}
    >
      {imageSrc ? (
        <Img src={staticFile(imageSrc)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: size * 0.4,
            fontWeight: 800,
            color: theme.colors.text,
            backgroundColor: theme.colors.primary,
            borderRadius: 999,
            padding: "10px 18px",
            boxShadow: `0 8px 24px ${theme.colors.primary}80`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
