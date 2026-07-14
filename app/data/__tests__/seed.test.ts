import {
  DEFAULT_TASKS,
  DEFAULT_DOCUMENTS,
  DEFAULT_BUDGET,
  DEFAULT_FAMILY_PROFILE,
  SAMPLE_FAMILY_PROFILE,
} from '../seed';
import { TaskCategory } from '../../types';

const EXPECTED_CATEGORIES: TaskCategory[] = [
  'housing',
  'medical',
  'documents',
  'finances',
  'safety',
  'technology',
  'packing',
  'food',
  'laundry',
  'travel',
  'academics',
];

describe('DEFAULT_TASKS', () => {
  it('has at least 50 tasks, matching the README claim', () => {
    expect(DEFAULT_TASKS.length).toBeGreaterThanOrEqual(50);
  });

  it('has all unique ids', () => {
    const ids = DEFAULT_TASKS.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('spans all 11 documented categories', () => {
    const categories = new Set(DEFAULT_TASKS.map(t => t.category));
    expect(categories.size).toBe(11);
    EXPECTED_CATEGORIES.forEach(category => {
      expect(categories.has(category)).toBe(true);
    });
  });

  it('starts every task as not completed', () => {
    expect(DEFAULT_TASKS.every(t => !t.completed)).toBe(true);
  });

  it('assigns a valid owner and priority to every task', () => {
    const validOwners = ['parent', 'student', 'shared'];
    const validPriorities = ['high', 'medium', 'low'];
    DEFAULT_TASKS.forEach(t => {
      expect(validOwners).toContain(t.owner);
      expect(validPriorities).toContain(t.priority);
    });
  });
});

describe('DEFAULT_DOCUMENTS', () => {
  it('has 12 document entries, matching the README claim', () => {
    expect(DEFAULT_DOCUMENTS).toHaveLength(12);
  });

  it('starts every document as not ready', () => {
    expect(DEFAULT_DOCUMENTS.every(d => !d.isReady)).toBe(true);
  });
});

describe('DEFAULT_BUDGET', () => {
  it('has 10 expense categories, matching the README claim', () => {
    expect(DEFAULT_BUDGET.categories).toHaveLength(10);
  });

  it('starts every category with zero actual spend', () => {
    expect(DEFAULT_BUDGET.categories.every(c => c.actual === 0)).toBe(true);
  });
});

describe('family profiles', () => {
  it('uses distinct ids for default vs. sample profiles', () => {
    expect(DEFAULT_FAMILY_PROFILE.id).not.toBe(SAMPLE_FAMILY_PROFILE.id);
  });

  it('produces a move-in date in the future for the default profile', () => {
    expect(new Date(DEFAULT_FAMILY_PROFILE.moveInDate).getTime()).toBeGreaterThan(Date.now());
  });
});
