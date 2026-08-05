/**
 * MenuList — rows of `label … value` joined by a dotted leader, the way a
 * printed menu or a spec sheet sets them.
 *
 * Reusable for anything two-column and enumerable: menu items and prices,
 * feature/spec rows, before/after stats, package tiers. Rows stagger in.
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../lib/motion";
import type { BrandTheme } from "../lib/types";

export type MenuListRow = {
  label: string;
  value: string;
  /** Renders the row in the theme's accent color — use for the punchline row. */
  emphasis?: boolean;
};

export type MenuListProps = {
  theme: BrandTheme;
  rows: MenuListRow[];
  appearAt?: number;
  /** Frames between successive rows. */
  stagger?: number;
  fontSize?: number;
  maxWidth?: number;
};

export const MenuList: React.FC<MenuListProps> = ({
  theme,
  rows,
  appearAt = 0,
  stagger = 5,
  fontSize = 40,
  maxWidth = 820,
}) => {
  return (
    <div style={{ width: "100%", maxWidth, margin: "0 auto" }}>
      {rows.map((row, index) => (
        <Row
          key={row.label}
          theme={theme}
          row={row}
          fontSize={fontSize}
          appearAt={appearAt + index * stagger}
        />
      ))}
    </div>
  );
};

const Row: React.FC<{
  theme: BrandTheme;
  row: MenuListRow;
  fontSize: number;
  appearAt: number;
}> = ({ theme, row, fontSize, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - appearAt, fps, config: SPRINGS.smooth });
  const color = row.emphasis ? theme.colors.primary : theme.colors.text;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        marginTop: 18,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [12, 0])}px)`,
        fontFamily: theme.fontFamily,
        fontSize,
        color,
        lineHeight: 1.3,
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>{row.label}</span>
      <span
        style={{
          flex: 1,
          height: `${Math.round(fontSize * 0.55)}px`,
          borderBottom: `2px dotted ${theme.colors.secondary}`,
          opacity: 0.75,
        }}
      />
      <span
        style={{
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          color: row.emphasis ? theme.colors.primary : theme.colors.textMuted,
        }}
      >
        {row.value}
      </span>
    </div>
  );
};
