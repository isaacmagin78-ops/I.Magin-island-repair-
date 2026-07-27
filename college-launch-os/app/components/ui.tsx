'use client';

import { ReactNode } from 'react';
import { Tone } from '../utils/readiness';

export type { Tone };

/* ------------------------------------------------------------------ */
/* Tone tokens — full literal class strings so Tailwind keeps them     */
/* ------------------------------------------------------------------ */

export const toneChip: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  amber: 'bg-amber-50 text-amber-800 border border-amber-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  gray: 'bg-slate-100 text-slate-600 border border-slate-200',
};

export const toneBar: Record<Tone, string> = {
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  gray: 'bg-slate-300',
};

export const toneHex: Record<Tone, string> = {
  green: '#10b981',
  blue: '#3b82f6',
  amber: '#f59e0b',
  red: '#ef4444',
  gray: '#cbd5e1',
};

export const toneIcon: Record<Tone, string> = {
  green: '✓',
  blue: '◐',
  amber: '!',
  red: '⚠',
  gray: '○',
};

export function scoreTone(percent: number, total = 1): Tone {
  if (total === 0) return 'gray';
  if (percent >= 75) return 'green';
  if (percent >= 40) return 'blue';
  if (percent > 0) return 'amber';
  return 'gray';
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gold-light/70 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${toneChip[tone]}`}
    >
      <span aria-hidden>{toneIcon[tone]}</span>
      {label}
    </span>
  );
}

export function Bar({ percent, tone = 'blue' }: { percent: number; tone?: Tone }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${toneBar[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}

/** Accessible circular progress gauge. */
export function ProgressRing({
  value,
  size = 168,
  stroke = 14,
  tone = 'green',
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: Tone;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = c - (clamped / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        role="img"
        aria-label={`${Math.round(clamped)} percent`}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDE6D2" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={toneHex[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {action}
    </div>
  );
}
