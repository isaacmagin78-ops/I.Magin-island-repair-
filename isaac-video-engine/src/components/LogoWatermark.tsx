/**
 * Persistent logo/watermark overlay. Meant to be mounted for the whole
 * composition duration (not inside a Sequence that starts/ends), fading in
 * once at the start. Position defaults to bottom-right, inside the social
 * preset's safe zone if one is passed.
 */
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useState } from "react";
import type { BrandTheme, SafeZone } from "../lib/types";

type Props = {
  theme: BrandTheme;
  /** Provide to keep the watermark clear of platform UI chrome. */
  safeZone?: SafeZone;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
};

export const LogoWatermark: React.FC<Props> = ({
  theme,
  safeZone,
  position = "bottom-right",
  size = 96,
  opacity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Falls back to text if the brand's logo file hasn't been dropped into
  // public/ yet, so a missing asset never fails a render — see
  // TROUBLESHOOTING.md "Logo image fails to load".
  const [logoFailed, setLogoFailed] = useState(false);
  const useImage = Boolean(theme.logo) && !logoFailed;

  const margin = 32;
  const offsets: Record<string, React.CSSProperties> = {
    "top-left": { top: (safeZone?.top ?? 0) + margin, left: (safeZone?.left ?? 0) + margin },
    "top-right": { top: (safeZone?.top ?? 0) + margin, right: (safeZone?.right ?? 0) + margin },
    "bottom-left": { bottom: (safeZone?.bottom ?? 0) + margin, left: (safeZone?.left ?? 0) + margin },
    "bottom-right": { bottom: (safeZone?.bottom ?? 0) + margin, right: (safeZone?.right ?? 0) + margin },
  };

  return (
    <div style={{ position: "absolute", ...offsets[position], opacity: fadeIn }}>
      {useImage ? (
        <Img
          src={staticFile(theme.logo as string)}
          style={{ width: size, height: size, objectFit: "contain" }}
          onError={() => setLogoFailed(true)}
        />
      ) : theme.watermarkText ? (
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: size * 0.28,
            fontWeight: 700,
            color: theme.colors.text,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            letterSpacing: 1,
          }}
        >
          {theme.watermarkText}
        </div>
      ) : null}
    </div>
  );
};
