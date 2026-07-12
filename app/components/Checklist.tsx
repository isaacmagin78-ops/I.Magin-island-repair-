'use client';

import { useState } from 'react';
import { AppState, UserRole, Task } from '../types';

interface ChecklistProps {
  state: AppState;
  role: UserRole;
  onTaskToggle: (taskId: string) => void;
  onTaskSelect: (task: Task | null) => void;
  selectedTask: Task | null;
}

export default function Checklist({ state, role, onTaskToggle, onTaskSelect, selectedTask }: ChecklistProps) {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const visibleTasks = state.tasks.filter(t => {
    if (role === 'parent') {
      if (t.owner !== 'parent' && t.owner !== 'shared') return false;
    } else {
      if (t.owner !== 'student' && t.owner !== 'shared') return false;
    }

    if (!showCompleted && t.completed) return false;
    if (filterCategory && t.category !== filterCategory) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  const categories = [...new Set(state.tasks.map(t => t.category))].sort();
  const incompleteCount = state.tasks.filter(t => !t.completed && visibleTasks.includes(t)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cream rounded-lg shadow p-6 border border-gold-light">
        <h1 className="text-2xl font-bold text-ink mb-2">College Preparation Checklist</h1>
        <p className="text-ink-secondary">
          {incompleteCount} tasks remaining • {visibleTasks.filter(t => t.completed).length} completed
        </p>
      </div>

      {/* Filters */}
      <div className="bg-cream rounded-lg shadow p-4 space-y-4 border border-gold-light">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Filter by Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory(null)}
              className={`px-3 py-1 rounded text-sm transition ${
                filterCategory === null
                  ? 'bg-navy text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded text-sm transition capitalize ${
                  filterCategory === cat
                    ? 'bg-navy text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Priority</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPriority(null)}
              className={`px-3 py-1 rounded text-sm transition ${
                filterPriority === null
                  ? 'bg-navy text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {['high', 'medium', 'low'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(filterPriority === p ? null : p)}
                className={`px-3 py-1 rounded text-sm transition capitalize ${
                  filterPriority === p
                    ? 'bg-navy text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">Show completed tasks</span>
        </label>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {visibleTasks.length > 0 ? (
            visibleTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                isSelected={selectedTask?.id === task.id}
                onToggle={() => onTaskToggle(task.id)}
                onSelect={() => onTaskSelect(task)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-600">No tasks match your filters</div>
          )}
        </div>
      </div>

      {/* Task Details */}
      {selectedTask && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-blue">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-navy">{selectedTask.title}</h2>
              <p className="text-gray-600 mt-2">{selectedTask.description}</p>
            </div>
            <button
              onClick={() => onTaskSelect(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold capitalize">{selectedTask.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Owner</p>
              <p className="font-semibold capitalize">{selectedTask.owner}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <p className={`font-semibold capitalize ${getPriorityColor(selectedTask.priority)}`}>
                {selectedTask.priority}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Timeframe</p>
              <p className="font-semibold">{selectedTask.completionWindow}</p>
            </div>
          </div>

          {selectedTask.details && (
            <div className="bg-blue-50 p-4 rounded mb-4 border-l-2 border-brand-blue">
              <p className="text-sm text-gray-800">{selectedTask.details}</p>
            </div>
          )}

          <button
            onClick={() => onTaskToggle(selectedTask.id)}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              selectedTask.completed
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-status-success text-white hover:bg-green-600'
            }`}
          >
            {selectedTask.completed ? '✓ Completed - Click to undo' : 'Mark as Complete'}
          </button>
        </div>
      )}
    </div>
  );
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    default:
      return 'text-green-600';
  }
}

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
}

function TaskItem({ task, isSelected, onToggle, onSelect }: TaskItemProps) {
  return (
    <div
      className={`p-4 cursor-pointer transition ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      } ${task.completed ? 'opacity-60' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`flex-shrink-0 mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
            task.completed
              ? 'bg-status-success border-status-success text-white'
              : 'border-gray-400 hover:border-brand-blue'
          }`}
        >
          {task.completed && '✓'}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.title}
          </p>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded capitalize">
              {task.category}
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityBg(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
              {task.owner}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPriorityBg(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-200 text-red-800';
    case 'medium':
      return 'bg-yellow-200 text-yellow-800';
    default:
      return 'bg-green-200 text-green-800';
  }
}
