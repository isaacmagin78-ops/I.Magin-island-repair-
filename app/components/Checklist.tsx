'use client';

import { useMemo, useState } from 'react';
import { AppState, Task, TaskStatus, UserRole } from '../types';
import { effectiveStatus, isOverdue, isDueSoon, relativeDue, resolveDueDate, ownerLabel } from '../utils/derive';
import { Card, StatusPill, Tone } from './ui';

type FilterKey = 'all' | 'due-soon' | 'overdue' | 'in-progress' | 'complete' | 'parent' | 'student';
type SortKey = 'urgent' | 'due' | 'category' | 'time';

const STATUS_TONE: Record<TaskStatus, Tone> = { complete: 'green', overdue: 'red', 'in-progress': 'blue', waiting: 'amber', 'not-started': 'gray' };
const STATUS_LABEL: Record<TaskStatus, string> = { complete: 'Complete', overdue: 'Overdue', 'in-progress': 'In progress', waiting: 'Waiting', 'not-started': 'Not started' };
const PRIORITY_TONE: Record<string, Tone> = { high: 'red', medium: 'amber', low: 'gray' };

function prettyCategory(c: string): string {
  return c.replace('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Checklist({ state, role, onToggleTask, onUpdateTask }: { state: AppState; role: UserRole; onToggleTask: (taskId: string) => void; onUpdateTask: (taskId: string, patch: Partial<Task>) => void }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('urgent');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const categories = useMemo(() => Array.from(new Set(state.tasks.map((t) => t.category))).sort(), [state.tasks]);
  const completedTotal = state.tasks.filter((t) => t.completed).length;
  const dueSoonTotal = state.tasks.filter((t) => isDueSoon(t, state.profile, 7)).length;
  const overdueTotal = state.tasks.filter((t) => isOverdue(t, state.profile)).length;
  const visible = useMemo(() => {
    let list = state.tasks.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    if (category !== 'all') list = list.filter((t) => t.category === category);
    switch (filter) {
      case 'due-soon': list = list.filter((t) => isDueSoon(t, state.profile, 7)); break;
      case 'overdue': list = list.filter((t) => isOverdue(t, state.profile)); break;
      case 'in-progress': list = list.filter((t) => !t.completed && effectiveStatus(t, state.profile) === 'in-progress'); break;
      case 'complete': list = list.filter((t) => t.completed); break;
      case 'parent': list = list.filter((t) => t.owner === 'parent' || t.owner === 'shared'); break;
      case 'student': list = list.filter((t) => t.owner === 'student' || t.owner === 'shared'); break;
    }
    const dueVal = (t: Task) => {
      const n = resolveDueDate(t, state.profile);
      return n ? new Date(n).getTime() : Number.MAX_SAFE_INTEGER;
    };
    const prioRank: Record<string, number> = { high: 0, medium: 1, low: 2 };
    list.sort((a, b) => {
      switch (sort) {
        case 'due': return dueVal(a) - dueVal(b);
        case 'category': return a.category.localeCompare(b.category);
        case 'time': return (a.estimatedMinutes ?? 9999) - (b.estimatedMinutes ?? 9999);
        default: {
          const ao = isOverdue(a, state.profile) ? 0 : 1;
          const bo = isOverdue(b, state.profile) ? 0 : 1;
          if (ao !== bo) return ao - bo;
          if (dueVal(a) !== dueVal(b)) return dueVal(a) - dueVal(b);
          return (prioRank[a.priority] ?? 3) - (prioRank[b.priority] ?? 3);
        }
      }
    });
    if (filter !== 'complete') list.sort((a, b) => Number(a.completed) - Number(b.completed));
    return list;
  }, [state.tasks, state.profile, query, category, filter, sort]);
  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'due-soon', label: `Due soon${dueSoonTotal ? ` (${dueSoonTotal})` : ''}` },
    { key: 'overdue', label: `Overdue${overdueTotal ? ` (${overdueTotal})` : ''}` },
    { key: 'in-progress', label: 'In progress' },
    { key: 'complete', label: 'Complete' },
    { key: 'parent', label: 'Parent' },
    { key: 'student', label: 'Student' },
  ];
  const percent = Math.round((completedTotal / Math.max(1, state.tasks.length)) * 100);
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><h1 className="text-2xl font-extrabold text-ink">Preparation Checklist</h1><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-light/50 text-ink capitalize">{role} view</span></div>
            <p className="text-ink-secondary text-sm mt-1"><span className="font-semibold text-ink">{completedTotal}</span> of {state.tasks.length} complete · <span className="text-amber-700 font-semibold">{dueSoonTotal}</span> due soon · <span className="text-red-700 font-semibold">{overdueTotal}</span> overdue</p>
          </div>
          <span className="text-3xl font-extrabold text-ink">{percent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden"><div className="h-2 rounded-full bg-gradient-to-r from-gold to-teal transition-all duration-500" style={{ width: `${percent}%` }} /></div>
      </Card>
      <div className="space-y-3">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${filter === f.key ? 'bg-ink text-cream' : 'bg-white border border-slate-200 text-ink-secondary hover:bg-slate-50'}`}>{f.label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"><option value="all">All categories</option>{categories.map((c) => <option key={c} value={c}>{prettyCategory(c)}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white ml-auto"><option value="urgent">Sort: Most urgent</option><option value="due">Sort: Due date</option><option value="category">Sort: Category</option><option value="time">Sort: Est. time</option></select>
        </div>
      </div>
      {visible.length ? (
        <div className="space-y-3">
          {visible.map((task) => {
            const status = effectiveStatus(task, state.profile);
            const due = resolveDueDate(task, state.profile);
            const isOpen = expanded === task.id;
            return (
              <Card key={task.id} className={`p-4 ${task.completed ? 'opacity-70' : ''}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => onToggleTask(task.id)} aria-label="toggle" className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-emerald-500'}`}>{task.completed && '✓'}</button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2"><p className={`font-semibold text-ink ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</p><StatusPill tone={STATUS_TONE[status]} label={STATUS_LABEL[status]} /></div>
                    <p className="text-sm text-ink-secondary mt-1">{task.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">{prettyCategory(task.category)}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">{ownerLabel(task.owner)}</span>
                      {task.estimatedMinutes ? <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">~{task.estimatedMinutes}m</span> : null}
                      <span className={`px-2 py-0.5 rounded font-semibold ${chipForPriority(task.priority)}`}>{task.priority.toUpperCase()}</span>
                      {due ? <span className={`px-2 py-0.5 rounded font-semibold ${isOverdue(task, state.profile) ? 'bg-red-50 text-red-700' : isDueSoon(task, state.profile, 7) ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-700'}`}>{relativeDue(due)}</span> : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {!task.completed && (
                        <select value={task.status && task.status !== 'complete' ? task.status : status} onChange={(e) => onUpdateTask(task.id, { status: e.target.value as TaskStatus })} className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white"><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="waiting">Waiting</option></select>
                      )}
                      <button onClick={() => onToggleTask(task.id)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${task.completed ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>{task.completed ? 'Undo' : 'Mark complete'}</button>
                      <button onClick={() => setExpanded(isOpen ? null : task.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-ink-secondary hover:bg-slate-50">{isOpen ? 'Hide guidance' : 'View guidance'}</button>
                    </div>
                    {isOpen && (
                      <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
                        {task.details && <p className="text-sm text-ink-secondary">{task.details}</p>}
                        <div><label className="block text-xs font-semibold text-ink-secondary mb-1">Your notes</label><textarea value={task.notes ?? ''} onChange={(e) => onUpdateTask(task.id, { notes: e.target.value })} placeholder="Add a note..." className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold" rows={2} /></div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : <Card className="p-8 text-center text-ink-secondary">No tasks match these filters.</Card>}
    </div>
  );
}

function chipForPriority(priority: string): string {
  const tone = PRIORITY_TONE[priority] ?? 'gray';
  const map: Record<Tone, string> = { red: 'bg-red-50 text-red-700', amber: 'bg-amber-50 text-amber-800', blue: 'bg-blue-50 text-blue-700', green: 'bg-emerald-50 text-emerald-700', gray: 'bg-slate-100 text-slate-600' };
  return map[tone];
}
