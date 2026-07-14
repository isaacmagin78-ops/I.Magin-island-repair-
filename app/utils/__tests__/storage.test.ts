import {
  getInitialState,
  getSampleState,
  loadState,
  saveState,
  resetState,
  exportState,
  getDateDaysFromNow,
} from '../storage';
import { DEFAULT_TASKS, DEFAULT_DOCUMENTS, DEFAULT_BUDGET } from '../../data/seed';

describe('getInitialState', () => {
  it('returns a fresh copy of the default profile, tasks, documents, and budget', () => {
    const state = getInitialState();

    expect(state.currentRole).toBe('parent');
    expect(state.reminders).toEqual([]);
    expect(state.tasks).toHaveLength(DEFAULT_TASKS.length);
    expect(state.documents).toHaveLength(DEFAULT_DOCUMENTS.length);
    expect(state.budget.categories).toHaveLength(DEFAULT_BUDGET.categories.length);
  });

  it('returns independent copies so mutating one call does not affect another', () => {
    const first = getInitialState();
    first.tasks[0].completed = true;

    const second = getInitialState();
    expect(second.tasks[0].completed).toBe(false);
  });
});

describe('getSampleState', () => {
  it('populates the sample family profile with reminders and partially-ready documents', () => {
    const state = getSampleState();

    expect(state.profile.studentName).toBe('Taylor Morgan');
    expect(state.profile.hasRoommate).toBe(true);
    expect(state.reminders).toHaveLength(2);
    expect(state.documents.filter(d => d.isReady)).toHaveLength(5);
  });
});

describe('loadState / saveState / resetState (localStorage)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('falls back to the initial state when nothing is stored', () => {
    const state = loadState();
    expect(state.tasks).toHaveLength(DEFAULT_TASKS.length);
    expect(state.currentRole).toBe('parent');
  });

  it('falls back to the initial state when stored data is corrupt JSON', () => {
    window.localStorage.setItem('college-launch-os-state', '{not valid json');
    const state = loadState();
    expect(state.tasks).toHaveLength(DEFAULT_TASKS.length);
  });

  it('round-trips state through saveState/loadState', () => {
    const state = getInitialState();
    state.currentRole = 'student';
    state.tasks[0].completed = true;

    saveState(state);
    const loaded = loadState();

    expect(loaded.currentRole).toBe('student');
    expect(loaded.tasks[0].completed).toBe(true);
  });

  it('clears stored state on resetState', () => {
    saveState(getInitialState());
    resetState();
    expect(window.localStorage.getItem('college-launch-os-state')).toBeNull();
  });
});

describe('exportState', () => {
  it('summarizes tasks, budget totals, and document readiness', () => {
    const state = getInitialState();
    state.tasks[0].completed = true;
    state.tasks[1].completed = true;
    state.documents[0].isReady = true;

    const exported = JSON.parse(exportState(state));

    expect(exported.tasksSummary.total).toBe(DEFAULT_TASKS.length);
    expect(exported.tasksSummary.completed).toBe(2);
    expect(exported.completedTasks).toHaveLength(2);
    expect(exported.documents.ready).toBe(1);
    expect(exported.budget.plannedTotal).toBe(
      DEFAULT_BUDGET.categories.reduce((sum, c) => sum + c.planned, 0)
    );
    expect(typeof exported.exportDate).toBe('string');
  });

  it('groups tasks by category and owner', () => {
    const state = getInitialState();
    const exported = JSON.parse(exportState(state));

    const housingCount = DEFAULT_TASKS.filter(t => t.category === 'housing').length;
    expect(exported.tasksSummary.byCategory.housing).toBe(housingCount);

    const parentCount = DEFAULT_TASKS.filter(t => t.owner === 'parent').length;
    expect(exported.tasksSummary.byOwner.parent).toBe(parentCount);
  });
});

describe('getDateDaysFromNow', () => {
  it('returns a YYYY-MM-DD date offset from today', () => {
    const result = getDateDaysFromNow(10);
    const expected = new Date();
    expected.setDate(expected.getDate() + 10);
    expect(result).toBe(expected.toISOString().split('T')[0]);
  });

  it('supports zero offset (today)', () => {
    const result = getDateDaysFromNow(0);
    expect(result).toBe(new Date().toISOString().split('T')[0]);
  });
});
