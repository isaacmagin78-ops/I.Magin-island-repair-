import { AppState, FamilyProfile, Task, Reminder, BudgetData, DocumentItem } from '../types';
import { DEFAULT_FAMILY_PROFILE, DEFAULT_TASKS, DEFAULT_DOCUMENTS, DEFAULT_BUDGET, SAMPLE_FAMILY_PROFILE } from '../data/seed';

const STORAGE_KEY = 'college-launch-os-state';

export function getInitialState(): AppState {
  return {
    profile: { ...DEFAULT_FAMILY_PROFILE },
    tasks: DEFAULT_TASKS.map(t => ({ ...t })),
    reminders: [],
    budget: { categories: DEFAULT_BUDGET.categories.map(c => ({ ...c })) },
    documents: DEFAULT_DOCUMENTS.map(d => ({ ...d })),
    currentRole: 'parent',
  };
}

export function getSampleState(): AppState {
  return {
    profile: { ...SAMPLE_FAMILY_PROFILE },
    tasks: DEFAULT_TASKS.map(t => ({ ...t })),
    reminders: [
      {
        id: 'r1',
        title: 'Schedule Taylor\'s physical exam',
        date: getDateDaysFromNow(60),
        assignedTo: 'parent',
        notes: 'Need to complete before college',
      },
      {
        id: 'r2',
        title: 'Order Taylor\'s textbooks',
        date: getDateDaysFromNow(30),
        assignedTo: 'student',
        notes: 'Check course syllabus for required books',
      },
    ],
    budget: {
      categories: [
        { id: 'b1', name: 'Bedding and Bath', planned: 150, actual: 120 },
        { id: 'b2', name: 'Dorm Supplies', planned: 200, actual: 180 },
        { id: 'b3', name: 'Technology', planned: 800, actual: 1200 },
        { id: 'b4', name: 'Travel', planned: 400, actual: 350 },
        { id: 'b5', name: 'Clothing', planned: 300, actual: 250 },
        { id: 'b6', name: 'Food/Meal Plan', planned: 2000, actual: 0 },
        { id: 'b7', name: 'Books & Academic Supplies', planned: 300, actual: 0 },
        { id: 'b8', name: 'Transportation', planned: 200, actual: 0 },
        { id: 'b9', name: 'Medical Supplies', planned: 100, actual: 75 },
        { id: 'b10', name: 'Emergency Fund', planned: 500, actual: 0 },
      ],
    },
    documents: DEFAULT_DOCUMENTS.map((d, idx) => ({
      ...d,
      isReady: idx < 5,
    })),
    currentRole: 'parent',
  };
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return getInitialState();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getInitialState();

  try {
    return JSON.parse(stored);
  } catch {
    return getInitialState();
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
      completed: state.tasks.filter(t => t.completed).length,
      byCategory: groupBy(state.tasks, 'category'),
      byOwner: groupBy(state.tasks, 'owner'),
    },
    completedTasks: state.tasks.filter(t => t.completed).map(t => ({
      title: t.title,
      category: t.category,
      owner: t.owner,
    })),
    reminders: state.reminders,
    budget: {
      categories: state.budget.categories,
      plannedTotal: state.budget.categories.reduce((sum, c) => sum + c.planned, 0),
      actualTotal: state.budget.categories.reduce((sum, c) => sum + c.actual, 0),
    },
    documents: {
      total: state.documents.length,
      ready: state.documents.filter(d => d.isReady).length,
      items: state.documents,
    },
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
