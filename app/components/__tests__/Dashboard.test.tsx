import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { AppState, Task } from '../../types';
import { DEFAULT_DOCUMENTS, DEFAULT_BUDGET } from '../../data/seed';

function makeTask(overrides: Partial<Task>): Task {
  return {
    id: overrides.id ?? 'task',
    title: overrides.title ?? 'Task title',
    description: overrides.description ?? 'Task description',
    category: overrides.category ?? 'housing',
    owner: overrides.owner ?? 'shared',
    priority: overrides.priority ?? 'medium',
    completionWindow: overrides.completionWindow ?? '30 days before',
    completed: overrides.completed ?? false,
  };
}

function makeState(tasks: Task[]): AppState {
  return {
    profile: {
      id: 'default',
      studentName: 'Jamie Doe',
      parentName: 'Alex Doe',
      collegeName: 'Test University',
      housingType: 'dorm',
      moveInDate: '2099-08-15',
      studentType: 'First-year',
      homeState: 'FL',
      collegeState: 'FL',
      hasRoommate: false,
      hasVehicle: false,
      hasPrescriptionMedication: false,
    },
    tasks,
    reminders: [],
    budget: { categories: DEFAULT_BUDGET.categories.map(c => ({ ...c })) },
    documents: DEFAULT_DOCUMENTS.map(d => ({ ...d })),
    currentRole: 'parent',
  };
}

describe('Dashboard', () => {
  it('only counts tasks visible to the current role toward progress', () => {
    const tasks = [
      makeTask({ id: '1', owner: 'parent', completed: true }),
      makeTask({ id: '2', owner: 'parent', completed: false }),
      makeTask({ id: '3', owner: 'student', completed: true }),
      makeTask({ id: '4', owner: 'shared', completed: true }),
    ];
    const state = makeState(tasks);

    render(<Dashboard state={state} role="parent" onNavigate={() => {}} />);

    // Parent sees tasks 1, 2, 4 (parent + shared): 2 of 3 completed.
    expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
  });

  it('shows the celebration message when all visible tasks are complete', () => {
    const tasks = [makeTask({ id: '1', owner: 'parent', completed: true })];
    const state = makeState(tasks);

    render(<Dashboard state={state} role="parent" onNavigate={() => {}} />);

    expect(screen.getByText(/all high-priority tasks are done/i)).toBeInTheDocument();
  });

  it('lists incomplete tasks sorted with high priority first', () => {
    const tasks = [
      makeTask({ id: '1', title: 'Low priority task', owner: 'parent', priority: 'low', completed: false }),
      makeTask({ id: '2', title: 'High priority task', owner: 'parent', priority: 'high', completed: false }),
      makeTask({ id: '3', title: 'Medium priority task', owner: 'parent', priority: 'medium', completed: false }),
    ];
    const state = makeState(tasks);

    render(<Dashboard state={state} role="parent" onNavigate={() => {}} />);

    const titles = screen.getAllByText(/priority task$/).map(el => el.textContent);
    expect(titles).toEqual(['High priority task', 'Medium priority task', 'Low priority task']);
  });

  it('invokes onNavigate when the checklist CTA is clicked', () => {
    const onNavigate = jest.fn();
    const state = makeState([makeTask({ id: '1', owner: 'parent', completed: false })]);

    render(<Dashboard state={state} role="parent" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: /view full checklist/i }));

    expect(onNavigate).toHaveBeenCalledWith('checklist');
  });
});
