import { AppState, Task, TaskCategory } from '../types';
import { isOverdue, currentPhase, phaseIndex, PHASE_ORDER } from './derive';

/* ------------------------------------------------------------------ */
/* Tone helpers                                                        */
/* ------------------------------------------------------------------ */

export type Tone = 'green' | 'blue' | 'amber' | 'red' | 'gray';

export interface SectionStatus {
  label: string;
  tone: Tone;
}

function sectionStatus(percent: number, total: number): SectionStatus {
  if (total === 0) return { label: 'Not started', tone: 'gray' };
  if (percent >= 100) return { label: 'Complete', tone: 'green' };
  if (percent >= 70) return { label: 'On track', tone: 'green' };
  if (percent >= 40) return { label: 'In progress', tone: 'blue' };
  if (percent > 0) return { label: 'Needs attention', tone: 'amber' };
  return { label: 'Not started', tone: 'gray' };
}

/* ------------------------------------------------------------------ */
/* 8-section breakdown (shown on the dashboard)                        */
/* ------------------------------------------------------------------ */

export interface ReadinessSection {
  key: string;
  label: string;
  percent: number;
  completed: number;
  total: number;
  status: SectionStatus;
}

function taskFraction(tasks: Task[], categories: TaskCategory[]) {
  const inCat = tasks.filter((t) => categories.includes(t.category));
  const completed = inCat.filter((t) => t.completed).length;
  return { completed, total: inCat.length };
}

function pct(completed: number, total: number): number {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

export function readinessSections(state: AppState): ReadinessSection[] {
  const { tasks, collegeList, essays, scholarships, documents } = state;

  const academics = taskFraction(tasks, ['academics']);
  const applications = taskFraction(tasks, ['applications']);
  const financial = taskFraction(tasks, ['finances']);
  const housing = taskFraction(tasks, [
    'housing',
    'enrollment',
    'medical',
    'technology',
    'packing',
    'travel',
    'food',
    'laundry',
    'safety',
  ]);

  const collegeDone = collegeList.filter((c) =>
    ['submitted', 'accepted', 'waitlisted', 'denied'].includes(c.applicationStatus),
  ).length;
  const essaysDone = essays.filter((e) => e.status === 'complete').length;
  const scholarshipsDone = scholarships.filter((s) =>
    ['submitted', 'awarded'].includes(s.status),
  ).length;
  const docsReady = documents.filter((d) => d.isReady).length;

  const sections: ReadinessSection[] = [
    build('academics', 'Academics', academics.completed, academics.total),
    build('college-list', 'College List', collegeDone, collegeList.length),
    build('applications', 'Applications', applications.completed, applications.total),
    build('essays', 'Essays', essaysDone, essays.length),
    build('financial', 'Financial Aid', financial.completed, financial.total),
    build('scholarships', 'Scholarships', scholarshipsDone, scholarships.length),
    build('documents', 'Documents', docsReady, documents.length),
    build('housing', 'Housing & Enrollment', housing.completed, housing.total),
  ];
  return sections;

  function build(key: string, label: string, completed: number, total: number): ReadinessSection {
    const percent = pct(completed, total);
    return { key, label, completed, total, percent, status: sectionStatus(percent, total) };
  }
}

/* ------------------------------------------------------------------ */
/* Weighted overall score (0–100)                                     */
/* ------------------------------------------------------------------ */

/**
 * Transparent, weighted readiness score. Each component is a 0–100 value and
 * the weights sum to 100. The overall score is the weighted average, clamped
 * to 0–100. Weights follow the product spec:
 *   Checklist completion .......... 35%
 *   Deadlines / overdue ........... 15%
 *   Document readiness ............ 15%
 *   Application progress .......... 15%
 *   Financial planning ............ 10%
 *   Timeline milestones ........... 10%
 */
export interface ScoreContribution {
  key: string;
  label: string;
  weight: number;
  score: number; // 0–100 for this component
  points: number; // contribution to the overall score
}

export interface ReadinessResult {
  overall: number;
  label: string;
  blurb: string;
  contributions: ScoreContribution[];
  sections: ReadinessSection[];
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, n));
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'College ready';
  if (score >= 75) return 'On track';
  if (score >= 60) return 'Making progress';
  if (score >= 40) return 'Building momentum';
  return 'Getting started';
}

export function computeReadiness(state: AppState): ReadinessResult {
  const { tasks, documents, collegeList, essays, scholarships } = state;

  // 1) Checklist completion (35)
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const checklistScore = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // 2) Deadlines / overdue (15)
  const overdueCount = tasks.filter((t) => isOverdue(t, state.profile)).length;
  const deadlineScore = clamp(100 - overdueCount * 20);

  // 3) Document readiness (15)
  const docsReady = documents.filter((d) => d.isReady).length;
  const documentScore = documents.length === 0 ? 0 : (docsReady / documents.length) * 100;

  // 4) Application progress (15) — colleges submitted + essays complete
  const collegeProgress =
    collegeList.length === 0
      ? 0
      : collegeList.reduce((acc, c) => {
          if (['submitted', 'accepted', 'waitlisted', 'denied'].includes(c.applicationStatus)) return acc + 1;
          if (c.applicationStatus === 'in-progress') return acc + 0.5;
          return acc;
        }, 0) / collegeList.length;
  const essayProgress =
    essays.length === 0
      ? 0
      : essays.reduce((acc, e) => {
          if (e.status === 'complete') return acc + 1;
          if (e.status === 'revising' || e.status === 'draft') return acc + 0.6;
          if (e.status === 'in-progress') return acc + 0.3;
          return acc;
        }, 0) / essays.length;
  const applicationScore = ((collegeProgress + essayProgress) / 2) * 100;

  // 5) Financial planning (10) — finance tasks + scholarship activity
  const financeTasks = tasks.filter((t) => t.category === 'finances');
  const financeTaskFraction =
    financeTasks.length === 0 ? 0 : financeTasks.filter((t) => t.completed).length / financeTasks.length;
  const scholarshipProgress =
    scholarships.length === 0
      ? 0
      : scholarships.filter((s) => ['applying', 'submitted', 'awarded'].includes(s.status)).length /
        scholarships.length;
  const financialScore = (financeTaskFraction * 0.6 + scholarshipProgress * 0.4) * 100;

  // 6) Timeline milestones (10) — tasks in phases reached so far
  const cur = currentPhase(state.profile);
  const reachedIdx = phaseIndex(cur);
  const reachedTasks = tasks.filter((t) => {
    if (!t.phase) return true; // undated tasks count toward "now"
    return PHASE_ORDER.indexOf(t.phase) <= reachedIdx;
  });
  const timelineScore =
    reachedTasks.length === 0 ? 0 : (reachedTasks.filter((t) => t.completed).length / reachedTasks.length) * 100;

  const contributions: ScoreContribution[] = [
    contrib('checklist', 'Checklist completion', 35, checklistScore),
    contrib('deadlines', 'Deadlines & overdue', 15, deadlineScore),
    contrib('documents', 'Document readiness', 15, documentScore),
    contrib('applications', 'Application progress', 15, applicationScore),
    contrib('financial', 'Financial planning', 10, financialScore),
    contrib('timeline', 'Timeline milestones', 10, timelineScore),
  ];

  const overall = clamp(Math.round(contributions.reduce((sum, c) => sum + c.points, 0)));
  const sections = readinessSections(state);

  return {
    overall,
    label: scoreLabel(overall),
    blurb: buildBlurb(overall, sections, overdueCount),
    contributions,
    sections,
  };

  function contrib(key: string, label: string, weight: number, score: number): ScoreContribution {
    const s = clamp(score);
    return { key, label, weight, score: Math.round(s), points: (s * weight) / 100 };
  }
}

function buildBlurb(overall: number, sections: ReadinessSection[], overdueCount: number): string {
  const weak = sections
    .filter((s) => s.total > 0 && s.percent < 60)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 2)
    .map((s) => s.label.toLowerCase());

  const lead =
    overall >= 90
      ? 'You are college ready.'
      : overall >= 75
        ? 'On track, with a few areas to tighten up.'
        : overall >= 60
          ? 'Making solid progress.'
          : overall >= 40
            ? 'Good momentum — keep going.'
            : 'Let’s build your plan step by step.';

  const attention =
    overdueCount > 0
      ? ` ${overdueCount} item${overdueCount === 1 ? '' : 's'} overdue.`
      : weak.length > 0
        ? ` ${weak.join(' and ')} need attention.`
        : '';

  return lead + attention;
}
