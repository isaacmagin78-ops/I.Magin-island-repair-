/**
 * "Miss T's" menu poster — the still companion to `MissTsFineDining`, sized
 * 4:5 for a feed post or a text message.
 *
 * Split layout: the photograph owns the top half (the silver serving dish is
 * the whole joke, so it is never covered), and the menu sits on a solid panel
 * beneath it with a soft gradient blending the two.
 *
 * Rendered with `remotion still MissTsPoster <out>.png --frame=70`; the frame
 * number matters because every element animates in, and 70 is past the last
 * stagger.
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MenuList } from "../components/MenuList";
import { getBrandTheme } from "../branding/themes";
import { loadBrandFonts } from "../lib/fonts";
import { SPRINGS } from "../lib/motion";
import { assetFile } from "../utils/assets";

export const MISS_TS_POSTER_WIDTH = 1080;
export const MISS_TS_POSTER_HEIGHT = 1350;
export const MISS_TS_POSTER_DURATION = 90;
/** Frame to grab as the still — past every entrance animation. */
export const MISS_TS_POSTER_STILL_FRAME = 70;

const PHOTO_HEIGHT = 700;
const PHOTO = assetFile("images/miss-t-poster-photo.jpg");

const theme = getBrandTheme("miss-ts");

const Rise: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: SPRINGS.smooth });
  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [14, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Rule: React.FC<{ delay: number; width: number; marginTop?: number }> = ({
  delay,
  width,
  marginTop = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: SPRINGS.smooth });
  return (
    <div
      style={{
        width: interpolate(progress, [0, 1], [0, width]),
        height: 1,
        backgroundColor: theme.colors.primary,
        opacity: 0.85,
        margin: `${marginTop}px auto 0`,
      }}
    />
  );
};

export const MissTsPoster: React.FC = () => {
  loadBrandFonts();
  const accentFont = theme.accentFontFamily ?? "Helvetica, Arial, sans-serif";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Photograph ──────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: PHOTO_HEIGHT, flex: "none" }}>
        <Img
          src={PHOTO}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.05) contrast(1.05) brightness(0.99)",
          }}
        />
        {/* Blend the photo's lower edge into the menu panel. */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,11,9,0.14) 0%, rgba(13,11,9,0) 34%, rgba(13,11,9,0) 66%, rgba(13,11,9,0.9) 94%, rgba(13,11,9,1) 100%)",
          }}
        />
      </div>

      {/* ── Menu panel ──────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 78px 44px",
          color: theme.colors.text,
        }}
      >
        <Rise delay={4}>
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: theme.colors.primary,
              marginLeft: "0.4em",
              whiteSpace: "nowrap",
            }}
          >
            Reservations only · Est. 2026
          </div>
        </Rise>

        <Rise delay={8}>
          <div
            style={{
              fontFamily: theme.fontFamily,
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              lineHeight: 1,
              marginLeft: "0.09em",
              marginTop: 20,
              whiteSpace: "nowrap",
            }}
          >
            Miss T&rsquo;s
          </div>
        </Rise>

        <Rise delay={13}>
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 21,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginLeft: "0.3em",
              marginTop: 20,
              whiteSpace: "nowrap",
            }}
          >
            Rooftop dining · Elev. 3 ft
          </div>
        </Rise>

        <Rule delay={18} width={660} marginTop={30} />

        <div style={{ width: "100%", marginTop: 10, marginBottom: 26 }}>
          <MenuList
            theme={theme}
            appearAt={24}
            fontSize={41}
            maxWidth={860}
            rows={[
              { label: "Kibble, plated · rooftop", value: "40 min" },
              { label: "Kibble, ground floor", value: "1 lick", emphasis: true },
              { label: "Table for Tyson", value: "unavailable" },
            ]}
          />
        </div>

        <Rule delay={44} width={300} />

        <Rise delay={50}>
          <div
            style={{
              fontFamily: accentFont,
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginLeft: "0.24em",
              marginTop: 26,
              lineHeight: 1.8,
              whiteSpace: "nowrap",
            }}
          >
            Ground-floor location permanently closed
            <br />
            Silver service · No dogs
          </div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};
