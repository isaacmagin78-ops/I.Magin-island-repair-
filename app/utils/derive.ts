import { AppState, FamilyProfile, PhaseId, Task, TaskStatus, TaskOwner } from '../types';

/* ----------------------------- dates ----------------------------- */

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Parse a yyyy-mm-dd string as a *local* date (avoids timezone drift). */
export function parseLocalDate(s?: string): Date | null {
  if (!s) return null;
  const parts = s.split('-').map(Number);
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function daysUntil(dateStr?: string): number | null {
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  return Math.round((d.getTime() - startOfToday().getTime()) / 86_400_000);
}

export function formatDate(dateStr?: string): string {
  const d = parseLocalDate(dateStr);
  if (!d) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function relativeDue(dateStr?: string): string {
  const n = daysUntil(dateStr);
  if (n === null) return '';
  if (n < 0) return `${Math.abs(n)} day${Math.abs(n) === 1 ? '' : 's'} overdue`;
  if (n === 0) return 'Due today';
  if (n === 1) return 'Due tomorrow';
  return `Due in ${n} days`;
}

/* ------------------------- task derivations ------------------------ */

/**
 * Resolve a concrete due date for a task. Uses the explicit `dueDate` when
 * present, otherwise derives one from the "N days before" completion window
 * relative to the move-in date.
 */
export function resolveDueDate(task: Task, profile: FamilyProfile): string | undefined {
  if (task.dueDate) return task.dueDate;
  const move = parseLocalDate(profile.moveInDate);
  if (!move) return undefined;
  const win = task.completionWindow.toLowerCase();
  const m = win.match(/(\d+)\s*days?\s*before/);
  if (m) {
    const d = new Date(move);
    d.setDate(d.getDate() - Number(m[1]));
    return d.toISOString().split('T')[0];
  }
  if (win.includes('move-in')) return profile.moveInDate;
  return undefined;
}

export function effectiveStatus(task: Task, profile: FamilyProfile): TaskStatus {
  if (task.completed) return 'complete';
  const due = resolveDueDate(task, profile);
  const n = daysUntil(due);
  if (n !== null && n < 0) return 'overdue';
  if (task.status && task.status !== 'complete') return task.status;
  return 'not-started';
}

export function isOverdue(task: Task, profile: FamilyProfile): boolean {
  return !task.completed && effectiveStatus(task, profile) === 'overdue';
}

export function isDueSoon(task: Task, profile: FamilyProfile, withinDays = 7): boolean {
  if (task.completed) return false;
  const n = daysUntil(resolveDueDate(task, profile));
  return n !== null && n >= 0 && n <= withinDays;
}

const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

/** The single most important next action for the family. */
export function nextMission(state: AppState): Task | null {
  const open = state.tasks.filter((t) => !t.completed);
  if (open.length === 0) return null;
  const scored = open
    .map((t) => {
      const due = resolveDueDate(t, state.profile);
      const n = daysUntil(due);
      const overdue = n !== null && n < 0;
      const urgency = overdue ? -1000 + (n ?? 0) : n ?? 9999;
      return { t, urgency, prio: PRIORITY_RANK[t.priority] ?? 3 };
    })
    .sort((a, b) => a.prio - b.prio || a.urgency - b.urgency);
  return scored[0].t;
}

export interface DeadlineEntry {
  task: Task;
  due: string;
  days: number;
}

export function upcomingDeadlines(state: AppState, limit = 5): DeadlineEntry[] {
  return state.tasks
    .filter((t) => !t.completed)
    .map((t) => {
      const due = resolveDueDate(t, state.profile);
      const n = daysUntil(due);
      return due && n !== null ? { task: t, due, days: n } : null;
    })
    .filter((x): x is DeadlineEntry => x !== null)
    .sort((a, b) => a.days - b.days)
    .slice(0, limit);
}

/** Tasks visible to a given role. */
export function tasksForRole(tasks: Task[], role: 'parent' | 'student'): Task[] {
  return tasks.filter((t) => t.owner === role || t.owner === 'shared');
}

export function ownerLabel(owner: TaskOwner): string {
  if (owner === 'shared') return 'Family';
  return owner.charAt(0).toUpperCase() + owner.slice(1);
}

/* ----------------------------- phases ----------------------------- */

export const PHASE_ORDER: PhaseId[] = [
  'freshman',
  'sophomore',
  'junior',
  'senior',
  'applications',
  'decisions',
  'enrollment',
];

export interface PhaseMeta {
  id: PhaseId;
  label: string;
  subtitle: string;
  goals: string[];
}

export const PHASE_META: PhaseMeta[] = [
  { id: 'freshman', label: 'Freshman Year', subtitle: 'Build the foundation', goals: ['Strong grades & study habits', 'Explore activities and interests'] },
  { id: 'sophomore', label: 'Sophomore Year', subtitle: 'Explore & grow', goals: ['Deepen 1–2 activities', 'Take a PSAT / practice test'] },
  { id: 'junior', label: 'Junior Year', subtitle: 'Get serious', goals: ['Take the SAT/ACT', 'Start a college list', 'Line up recommenders'] },
  { id: 'senior', label: 'Senior Year', subtitle: 'Finalize your plan', goals: ['Finalize college list', 'Meet your counselor', 'Prep the FAFSA'] },
  { id: 'applications', label: 'Application Season', subtitle: 'Apply with confidence', goals: ['Finish essays', 'Submit applications', 'File the FAFSA', 'Apply for scholarships'] },
  { id: 'decisions', label: 'Decision Season', subtitle: 'Compare & choose', goals: ['Compare aid offers', 'Decide by May 1', 'Submit enrollment deposit'] },
  { id: 'enrollment', label: 'Enrollment & Move-In', subtitle: 'Get ready for campus', goals: ['Housing & orientation', 'Health & documents', 'Pack and move in'] },
];

/**
 * Determine the current phase from the graduation (enrollment) year, using a
 * "rising" convention so summer counts toward the upcoming grade.
 */
export function currentPhase(profile: FamilyProfile): PhaseId {
  const g =
    profile.graduationYear ??
    (parseLocalDate(profile.moveInDate)?.getFullYear() ?? new Date().getFullYear());
  const today = startOfToday();
  const at = (year: number, monthIndex: number) => new Date(year, monthIndex, 1);

  const boundaries: { id: PhaseId; start: Date }[] = [
    { id: 'freshman', start: at(g - 4, 5) }, // Jun G-4
    { id: 'sophomore', start: at(g - 3, 5) },
    { id: 'junior', start: at(g - 2, 5) },
    { id: 'senior', start: at(g - 1, 5) }, // Jun G-1
    { id: 'applications', start: at(g - 1, 10) }, // Nov G-1
    { id: 'decisions', start: at(g, 1) }, // Feb G
    { id: 'enrollment', start: at(g, 4) }, // May G
  ];

  let current: PhaseId = 'freshman';
  for (const b of boundaries) {
    if (today >= b.start) current = b.id;
  }
  // Before freshman start, still show freshman.
  return current;
}

export function phaseIndex(id: PhaseId): number {
  return PHASE_ORDER.indexOf(id);
}
