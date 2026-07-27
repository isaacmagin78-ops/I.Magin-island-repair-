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

export function getSampleState(): AppState {
  return {
    profile: { ...SAMPLE_FAMILY_PROFILE },
    tasks: SAMPLE_TASKS.map((t) => ({ ...t })),
    reminders: [],
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
  return JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      profile: state.profile,
      tasks: state.tasks,
      reminders: state.reminders,
      budget: state.budget,
      documents: state.documents,
      collegeList: state.collegeList,
      essays: state.essays,
      scholarships: state.scholarships,
    },
    null,
    2,
  );
}
