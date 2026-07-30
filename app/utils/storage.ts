import { AppState } from '../types';
import {
  DEFAULT_FAMILY_PROFILE,
  DEFAULT_TASKS,
  DEFAULT_DOCUMENTS,
  DEFAULT_BUDGET,
  SAMPLE_FAMILY_PROFILE,
  SAMPLE_TASKS,
  SAMPLE_BUDGET,
  SAMPLE_COLLEGE_LIST,
  SAMPLE_ESSAYS,
  SAMPLE_SCHOLARSHIPS,
  SAMPLE_READY_DOCUMENT_IDS,
  buildSampleActivity,
} from '../data/seed';

const STORAGE_KEY = 'college-launch-os-state';

/** A fresh, empty plan (used by "Reset all data"). */
export function getInitialState(): AppState {
  return {
    profile: { ...DEFAULT_FAMILY_PROFILE },
    tasks: DEFAULT_TASKS.map((t) => ({ ...t })),
    reminders: [],
    budget: { categories: DEFAULT_BUDGET.categories.map((c) => ({ ...c })) },
    documents: DEFAULT_DOCUMENTS.map((d) => ({ ...d })),
    collegeList: [],
    essays: [],
    scholarships: [],
    activity: [],
    currentRole: 'parent',
  };
}

/** The "alive" showcase plan for Jordan Carter. Also shown on first visit. */
export function getSampleState(): AppState {
  return {
    profile: { ...SAMPLE_FAMILY_PROFILE },
    tasks: SAMPLE_TASKS.map((t) => ({ ...t })),
    reminders: [
      {
        id: 'r1',
        title: 'FAFSA opens — file as early as possible',
        date: nDaysFromNowISO(20),
        assignedTo: 'parent',
        notes: 'Aid is often first-come, first-served.',
      },
      {
        id: 'r2',
        title: 'UF early-action deadline',
        date: nDaysFromNowISO(24),
        assignedTo: 'student',
        notes: 'Submit application + supplemental essay.',
      },
    ],
    budget: { categories: SAMPLE_BUDGET.categories.map((c) => ({ ...c })) },
    documents: DEFAULT_DOCUMENTS.map((d) => ({
      ...d,
      isReady: SAMPLE_READY_DOCUMENT_IDS.includes(d.id),
    })),
    collegeList: SAMPLE_COLLEGE_LIST.map((c) => ({ ...c })),
    essays: SAMPLE_ESSAYS.map((e) => ({ ...e })),
    scholarships: SAMPLE_SCHOLARSHIPS.map((s) => ({ ...s })),
    activity: buildSampleActivity(),
    currentRole: 'parent',
  };
}

/** Ensure a parsed/older state has every field the current app expects. */
function normalize(parsed: Partial<AppState>): AppState {
  const base = getInitialState();
  return {
    ...base,
    ...parsed,
    profile: { ...base.profile, ...(parsed.profile ?? {}) },
    budget: parsed.budget && parsed.budget.categories ? parsed.budget : base.budget,
    tasks: parsed.tasks ?? base.tasks,
    reminders: parsed.reminders ?? base.reminders,
    documents: parsed.documents ?? base.documents,
    collegeList: parsed.collegeList ?? base.collegeList,
    essays: parsed.essays ?? base.essays,
    scholarships: parsed.scholarships ?? base.scholarships,
    activity: parsed.activity ?? base.activity,
    currentRole: parsed.currentRole ?? base.currentRole,
  };
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return getSampleState();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getSampleState();

  try {
    return normalize(JSON.parse(stored));
  } catch {
    return getSampleState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function exportState(state: AppState): string {
  const exportData = {
    exportDate: new Date().toISOString(),
    profile: state.profile,
    tasksSummary: {
      total: state.tasks.length,
      completed: state.tasks.filter((t) => t.completed).length,
      byCategory: groupBy(state.tasks, 'category'),
      byOwner: groupBy(state.tasks, 'owner'),
    },
    completedTasks: state.tasks
      .filter((t) => t.completed)
      .map((t) => ({ title: t.title, category: t.category, owner: t.owner })),
    reminders: state.reminders,
    budget: {
      categories: state.budget.categories,
      plannedTotal: state.budget.categories.reduce((sum, c) => sum + c.planned, 0),
      actualTotal: state.budget.categories.reduce((sum, c) => sum + c.actual, 0),
    },
    documents: {
      total: state.documents.length,
      ready: state.documents.filter((d) => d.isReady).length,
      items: state.documents,
    },
    collegeList: state.collegeList,
    essays: state.essays,
    scholarships: state.scholarships,
  };

  return JSON.stringify(exportData, null, 2);
}

function groupBy<T extends Record<string, any>>(items: T[], key: keyof T): Record<string, number> {
  return items.reduce((acc, item) => {
    const k = String(item[key]);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function getDateDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function nDaysFromNowISO(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
