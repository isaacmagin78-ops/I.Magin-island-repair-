'use client';

import { useState } from 'react';
import { AppState, UserRole } from '../types';
import { computeReadiness } from '../utils/readiness';
import { nextMission, upcomingDeadlines, isOverdue, isDueSoon, relativeDue, resolveDueDate, formatDate, ownerLabel, currentPhase, PHASE_META } from '../utils/derive';
import { Card, ProgressRing, StatusPill, Bar, SectionTitle, scoreTone, Tone } from './ui';

function overallTone(score: number): Tone {
  if (score >= 75) return 'green';
  if (score >= 60) return 'blue';
  if (score >= 40) return 'amber';
  return 'red';
}

export default function Dashboard({ state, role, onNavigate, onToggleTask }: { state: AppState; role: UserRole; onNavigate: (section: any) => void; onToggleTask: (taskId: string) => void }) {
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const readiness = computeReadiness(state);
  const mission = nextMission(state);
  const deadlines = upcomingDeadlines(state, 5);
  const phase = PHASE_META.find((p) => p.id === currentPhase(state.profile));
  const openTasks = state.tasks.filter((t) => !t.completed);
  const dueThisWeek = openTasks.filter((t) => isDueSoon(t, state.profile, 7)).length;
  const overdue = openTasks.filter((t) => isOverdue(t, state.profile)).length;
  const docsMissing = state.documents.filter((d) => !d.isReady).length;
  const estBudget = state.budget.categories.reduce((s, c) => s + c.planned, 0);
  const completedCount = state.tasks.filter((t) => t.completed).length;
  const firstName = state.profile.studentName.split(' ')[0];
  const summary = [
    { label: 'Tasks remaining', value: openTasks.length, to: 'checklist' },
    { label: 'Due this week', value: dueThisWeek, to: 'checklist' },
    { label: 'Overdue', value: overdue, to: 'checklist' },
    { label: 'Documents missing', value: docsMissing, to: 'documents' },
    { label: 'Scholarships tracked', value: state.scholarships.length, to: 'collegelist' },
    { label: 'Est. college budget', value: `$${estBudget.toLocaleString()}`, to: 'budget' },
  ];
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-ink to-ink-secondary p-6 md:p-8 text-cream">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <ProgressRing value={readiness.overall} tone={overallTone(readiness.overall)}>
              <span className="text-4xl font-extrabold text-cream">{readiness.overall}</span>
              <span className="text-xs font-semibold text-gold-light tracking-wide">/ 100</span>
            </ProgressRing>
            <div className="flex-1 text-center md:text-left">
              <p className="text-gold-light text-sm font-semibold uppercase tracking-wide">College Readiness</p>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-1">{readiness.label}</h1>
              <p className="text-cream/80 mt-2 max-w-xl">{readiness.blurb}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                <button onClick={() => setShowScoreInfo(true)} className="bg-gold text-ink px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition text-sm">How this score works</button>
                <button onClick={() => onNavigate('checklist')} className="bg-white/10 text-cream px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition text-sm border border-white/20">View checklist</button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 flex items-center justify-between text-sm">
          <span className="text-ink-secondary"><span className="font-semibold text-ink">{phase?.label}</span> · {phase?.subtitle}</span>
          <span className="text-ink-secondary hidden sm:block">{firstName}, class of {state.profile.graduationYear}</span>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {mission ? (
            <Card className="p-5 h-full border-l-4 border-gold">
              <div className="flex items-center gap-2 mb-2"><span className="text-gold text-lg">★</span><h2 className="text-lg font-bold text-ink">Today's Mission</h2></div>
              <p className="text-xl font-semibold text-ink">{mission.title}</p>
              <p className="text-ink-secondary text-sm mt-1">{mission.description}</p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {mission.estimatedMinutes ? <span className="px-2 py-1 rounded bg-slate-100 text-slate-600">~{mission.estimatedMinutes} min</span> : null}
                {resolveDueDate(mission, state.profile) ? <span className={`px-2 py-1 rounded ${isOverdue(mission, state.profile) ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'}`}>{relativeDue(resolveDueDate(mission, state.profile))}</span> : null}
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-600">Assigned to {ownerLabel(mission.owner)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={() => onToggleTask(mission.id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition text-sm">Mark complete</button>
                <button onClick={() => onNavigate('checklist')} className="bg-ink text-cream px-4 py-2 rounded-lg font-semibold hover:bg-ink-secondary transition text-sm">Go to checklist</button>
              </div>
            </Card>
          ) : (
            <Card className="p-5 h-full flex items-center justify-center text-center"><p className="text-ink-secondary">Every task is complete. Incredible work!</p></Card>
          )}
        </div>
        <Card className="p-5 bg-gradient-to-br from-teal/15 to-gold/10">
          <h2 className="text-lg font-bold text-ink mb-1">This week</h2>
          <p className="text-sm text-ink-secondary mb-4">{completedCount > 0 ? `You have completed ${completedCount} tasks so far. Keep the momentum going!` : 'Complete your first task to start building momentum.'}</p>
          <div className="space-y-3">
            <MiniStat label="Readiness score" value={`${readiness.overall}/100`} tone={overallTone(readiness.overall)} />
            <MiniStat label="Due in 7 days" value={dueThisWeek} tone={dueThisWeek ? 'amber' : 'green'} />
            <MiniStat label="Overdue" value={overdue} tone={overdue ? 'red' : 'green'} />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {summary.map((s) => (
          <button key={s.label} onClick={() => onNavigate(s.to)} className="text-left bg-white rounded-xl border border-gold-light/70 p-4 hover:shadow-md hover:-translate-y-0.5 transition">
            <p className="text-2xl font-extrabold text-ink">{s.value}</p>
            <p className="text-xs text-ink-secondary mt-1">{s.label}</p>
          </button>
        ))}
      </div>
      <Card className="p-5">
        <SectionTitle title="Readiness by area" action={<button onClick={() => setShowScoreInfo(true)} className="text-sm text-gold font-semibold hover:underline">How it's calculated</button>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readiness.sections.map((sec) => (
            <div key={sec.key} className="p-3 rounded-xl border border-slate-100 hover:border-gold-light transition">
              <div className="flex items-center justify-between mb-1.5"><p className="font-semibold text-ink">{sec.label}</p><StatusPill tone={sec.status.tone} label={sec.status.label} /></div>
              <Bar percent={sec.percent} tone={scoreTone(sec.percent, sec.total)} />
              <div className="flex items-center justify-between mt-1.5 text-xs text-ink-secondary"><span>{sec.percent}%</span><span>{sec.completed} of {sec.total} complete</span></div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionTitle title="Upcoming deadlines" action={<button onClick={() => onNavigate('timeline')} className="text-sm text-gold font-semibold hover:underline">Timeline</button>} />
          {deadlines.length ? (
            <div className="space-y-2">
              {deadlines.map((d) => (
                <div key={d.task.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                  <div className="flex-1 min-w-0"><p className="font-semibold text-ink truncate">{d.task.title}</p><p className="text-xs text-ink-secondary">{formatDate(d.due)} · {ownerLabel(d.task.owner)}</p></div>
                  <StatusPill tone={d.days < 0 ? 'red' : d.days <= 7 ? 'amber' : 'blue'} label={relativeDue(d.due)} />
                  <button onClick={() => onToggleTask(d.task.id)} className="text-xs font-semibold text-emerald-700 hover:underline whitespace-nowrap">Done</button>
                </div>
              ))}
            </div>
          ) : <p className="text-ink-secondary text-sm">No upcoming dated tasks.</p>}
        </Card>
        <Card className="p-5">
          <SectionTitle title="Recent family activity" />
          {state.activity.length ? (
            <ul className="space-y-3">
              {state.activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex gap-3 text-sm"><span className="mt-1.5 w-2 h-2 rounded-full bg-teal flex-shrink-0" /><span className="text-ink-secondary"><span className="font-semibold text-ink">{a.actor}</span> {a.action} {a.target}</span></li>
              ))}
            </ul>
          ) : <p className="text-ink-secondary text-sm">Activity from your family will show up here.</p>}
        </Card>
      </div>
      <Card className="p-6 bg-gradient-to-r from-ink to-ink-secondary text-cream flex flex-col sm:flex-row items-center justify-between gap-4">
        <div><h2 className="text-lg font-bold">Not sure what to tackle next?</h2><p className="text-cream/80 text-sm">Ask the College Concierge — it reads your plan and tells you what matters now.</p></div>
        <button onClick={() => onNavigate('concierge')} className="bg-gold text-ink px-5 py-2.5 rounded-lg font-semibold hover:bg-gold-light transition whitespace-nowrap">Ask the Concierge</button>
      </Card>
      {showScoreInfo && (
        <div className="fixed inset-0 z-[60] bg-ink/60 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowScoreInfo(false)}>
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3"><h3 className="text-xl font-bold text-ink">How your score works</h3><button onClick={() => setShowScoreInfo(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button></div>
            <p className="text-sm text-ink-secondary mb-4">Your readiness score is a weighted average of completed tasks, deadlines, document readiness, application progress, financial planning, and timeline milestones.</p>
            <div className="space-y-3">
              {readiness.contributions.map((c) => (
                <div key={c.key}><div className="flex items-center justify-between text-sm mb-1"><span className="font-semibold text-ink">{c.label}</span><span className="text-ink-secondary">{c.score}/100 · weight {c.weight}%</span></div><Bar percent={c.score} tone={scoreTone(c.score)} /></div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between bg-slate-50 rounded-xl p-4"><span className="font-semibold text-ink">Overall readiness</span><span className="text-2xl font-extrabold text-ink">{readiness.overall}/100</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string | number; tone: Tone }) {
  const dot: Record<Tone, string> = { green: 'bg-emerald-500', blue: 'bg-blue-500', amber: 'bg-amber-500', red: 'bg-red-500', gray: 'bg-slate-300' };
  return (
    <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
      <span className="flex items-center gap-2 text-sm text-ink-secondary"><span className={`w-2 h-2 rounded-full ${dot[tone]}`} />{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}
