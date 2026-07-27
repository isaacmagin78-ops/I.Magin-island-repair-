'use client';

import { useState } from 'react';
import { AppState, Reminder, Task } from '../types';
import { PHASE_META, currentPhase, phaseIndex, effectiveStatus, resolveDueDate, relativeDue, formatDate, ownerLabel } from '../utils/derive';
import { Card, StatusPill, Bar, Tone } from './ui';

const STATUS_TONE: Record<string, Tone> = { complete: 'green', overdue: 'red', 'in-progress': 'blue', waiting: 'amber', 'not-started': 'gray' };

export default function Timeline({ state, onAddReminder, onRemoveReminder, onToggleTask }: { state: AppState; onAddReminder: (r: Reminder) => void; onRemoveReminder: (id: string) => void; onToggleTask: (id: string) => void }) {
  const cur = currentPhase(state.profile);
  const curIdx = phaseIndex(cur);
  const [open, setOpen] = useState<string | null>(cur);
  const [showForm, setShowForm] = useState(false);
  const moveIn = new Date(state.profile.moveInDate);
  const daysToMoveIn = Math.max(0, Math.ceil((moveIn.getTime() - Date.now()) / 86400000));
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-2xl font-extrabold">Your College Journey</h1><p className="text-cream/80 text-sm mt-1">{state.profile.studentName} · Class of {state.profile.graduationYear}</p></div>
          <div className="text-center bg-white/10 rounded-xl px-5 py-3 border border-white/15"><p className="text-3xl font-extrabold text-gold-light">{daysToMoveIn}</p><p className="text-xs text-cream/80">days to move-in</p></div>
        </div>
      </Card>
      <div className="space-y-3">
        {PHASE_META.map((meta) => {
          const idx = phaseIndex(meta.id);
          const isCurrent = meta.id === cur;
          const isPast = idx < curIdx;
          const tasks = state.tasks.filter((t) => t.phase === meta.id);
          const done = tasks.filter((t) => t.completed).length;
          const percent = tasks.length ? Math.round((done / tasks.length) * 100) : isPast ? 100 : 0;
          const isOpen = open === meta.id;
          return (
            <Card key={meta.id} className={`overflow-hidden ${isCurrent ? 'ring-2 ring-gold' : ''} ${isPast ? 'opacity-80' : ''}`}>
              <button onClick={() => setOpen(isOpen ? null : meta.id)} className="w-full text-left p-4 flex items-center gap-4 hover:bg-slate-50 transition">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCurrent ? 'bg-gold text-ink' : isPast ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>{isPast ? '✓' : idx + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><h2 className="font-bold text-ink">{meta.label}</h2>{isCurrent && <span className="text-xs font-bold text-ink bg-gold px-2 py-0.5 rounded-full">You are here</span>}</div>
                  <p className="text-xs text-ink-secondary">{meta.subtitle}</p>
                  {tasks.length > 0 && <div className="mt-2 max-w-xs"><Bar percent={percent} tone={percent >= 100 ? 'green' : percent > 0 ? 'blue' : 'gray'} /></div>}
                </div>
                <div className="text-right"><p className="text-sm font-bold text-ink">{percent}%</p>{tasks.length > 0 && <p className="text-xs text-ink-secondary">{done}/{tasks.length}</p>}</div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <div className="pt-3">
                    <p className="text-xs font-semibold text-ink-secondary uppercase tracking-wide mb-2">Goals</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">{meta.goals.map((g) => <span key={g} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{g}</span>)}</div>
                    {tasks.length > 0 ? (
                      <div className="space-y-2">{tasks.map((t) => <TaskRow key={t.id} task={t} state={state} onToggleTask={onToggleTask} />)}</div>
                    ) : <p className="text-sm text-ink-secondary">{isPast ? 'This phase is behind you.' : 'Tasks for this phase will appear here.'}</p>}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3"><h2 className="text-lg font-bold text-ink">Custom reminders</h2><button onClick={() => setShowForm(!showForm)} className="bg-gold text-ink px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition text-sm">+ Add reminder</button></div>
        {showForm && <AddReminderForm onAdd={(r) => { onAddReminder(r); setShowForm(false); }} onCancel={() => setShowForm(false)} />}
        {state.reminders.length ? (
          <div className="space-y-2">
            {state.reminders.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((r) => (
              <div key={r.id} className="flex items-start justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                <div><p className="font-semibold text-ink">{r.title}</p><p className="text-xs text-ink-secondary mt-0.5">{formatDate(r.date)} · {ownerLabel(r.assignedTo)}</p>{r.notes && <p className="text-sm text-ink-secondary italic mt-1">{r.notes}</p>}</div>
                <button onClick={() => onRemoveReminder(r.id)} className="text-slate-400 hover:text-red-500 text-xl leading-none" aria-label="Remove">×</button>
              </div>
            ))}
          </div>
        ) : <p className="text-ink-secondary text-sm">No custom reminders yet.</p>}
      </Card>
    </div>
  );
}

function TaskRow({ task, state, onToggleTask }: { task: Task; state: AppState; onToggleTask: (id: string) => void }) {
  const status = effectiveStatus(task, state.profile);
  const due = resolveDueDate(task, state.profile);
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
      <button onClick={() => onToggleTask(task.id)} aria-label="toggle" className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-emerald-500'}`}>{task.completed && '✓'}</button>
      <div className="flex-1 min-w-0"><p className={`text-sm font-medium text-ink truncate ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</p>{due && <p className="text-xs text-ink-secondary">{relativeDue(due)}</p>}</div>
      <StatusPill tone={STATUS_TONE[status]} label={status.replace('-', ' ')} />
    </div>
  );
}

function AddReminderForm({ onAdd, onCancel }: { onAdd: (r: Reminder) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignedTo] = useState<'parent' | 'student' | 'shared'>('shared');
  const [notes, setNotes] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    onAdd({ id: Date.now().toString(), title, date, assignedTo, notes });
  };
  return (
    <form onSubmit={submit} className="space-y-3 mb-4 p-4 bg-slate-50 rounded-xl">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reminder title" className="input" required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" required />
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value as 'parent' | 'student' | 'shared')} className="input bg-white"><option value="parent">Parent</option><option value="student">Student</option><option value="shared">Family (shared)</option></select>
      </div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" className="input" rows={2} />
      <div className="flex gap-2"><button type="submit" className="flex-1 bg-gold text-ink py-2 rounded-lg font-semibold hover:bg-gold-light transition">Add reminder</button><button type="button" onClick={onCancel} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300 transition">Cancel</button></div>
    </form>
  );
}
