import { AppState } from '../types';
import {
  isOverdue,
  isDueSoon,
  nextMission,
  upcomingDeadlines,
  resolveDueDate,
  relativeDue,
  currentPhase,
  PHASE_META,
  ownerLabel,
} from './derive';
import { computeReadiness } from './readiness';

export interface ConciergeReply {
  answer: string;
  suggestions: string[];
}

export interface QuickAction {
  key: string;
  label: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { key: 'week', label: 'What should I do this week?' },
  { key: 'score', label: 'Explain my readiness score' },
  { key: 'deadlines', label: 'Check upcoming deadlines' },
  { key: 'fafsa', label: 'Prepare for FAFSA' },
  { key: 'essays', label: 'Review my essay plan' },
  { key: 'list', label: 'Build my college list' },
  { key: 'scholarships', label: 'Find scholarship opportunities' },
  { key: 'documents', label: 'Review missing documents' },
];

function thisWeek(state: AppState): ConciergeReply {
  const due = state.tasks.filter((t) => !t.completed && isDueSoon(t, state.profile, 7));
  const overdue = state.tasks.filter((t) => isOverdue(t, state.profile));
  const lines: string[] = [];
  if (overdue.length) lines.push(`${overdue.length} overdue: ${overdue.slice(0, 3).map((t) => t.title).join('; ')}.`);
  if (due.length) {
    lines.push('Due within 7 days:\n' + due.slice(0, 5).map((t) => `• ${t.title} — ${relativeDue(resolveDueDate(t, state.profile))} (${ownerLabel(t.owner)})`).join('\n'));
  }
  if (!overdue.length && !due.length) lines.push('Nothing is due in the next 7 days — a great time to get ahead on essays or scholarships.');
  return {
    answer: `Here is your focus for this week:\n\n${lines.join('\n\n')}`,
    suggestions: ['Explain my readiness score', 'Review my essay plan', 'Find scholarship opportunities'],
  };
}

function explainScore(state: AppState): ConciergeReply {
  const r = computeReadiness(state);
  const weak = r.sections.filter((s) => s.total > 0).sort((a, b) => a.percent - b.percent).slice(0, 2);
  const contribLines = r.contributions.map((c) => `• ${c.label}: ${c.score}/100 (weight ${c.weight}%)`).join('\n');
  return {
    answer: `Your College Readiness Score is ${r.overall}/100 — "${r.label}".\n\nIt is a weighted average of:\n${contribLines}\n\nBiggest opportunities: ${weak.map((s) => `${s.label} (${s.percent}%)`).join(' and ')}.`,
    suggestions: ['What should I do this week?', 'Check upcoming deadlines', 'Review missing documents'],
  };
}

function deadlines(state: AppState): ConciergeReply {
  const list = upcomingDeadlines(state, 5);
  if (!list.length) return { answer: 'No dated tasks are coming up. Add due dates in the Checklist to track deadlines here.', suggestions: ['What should I do this week?'] };
  return {
    answer: 'Your next deadlines:\n\n' + list.map((d) => `• ${d.task.title} — ${relativeDue(d.due)} (${ownerLabel(d.task.owner)})`).join('\n'),
    suggestions: ['What should I do this week?', 'Prepare for FAFSA'],
  };
}

function fafsa(state: AppState): ConciergeReply {
  const open = state.tasks.filter((t) => t.category === 'finances' && !t.completed);
  return {
    answer: 'Prototype College Concierge — FAFSA plan:\n\n1) Create an FSA ID for both parent and student.\n2) Gather last year tax return, W-2s, and bank balances.\n3) File as early as possible.\n\n' + (open.length ? `Open financial-aid tasks: ${open.map((t) => t.title).join('; ')}.` : 'Your financial-aid tasks are all complete!'),
    suggestions: ['Find scholarship opportunities', 'Check upcoming deadlines'],
  };
}

function essaysPlan(state: AppState): ConciergeReply {
  const open = state.essays.filter((e) => e.status !== 'complete');
  const body = open.length ? open.map((e) => `• ${e.title} — ${e.status}${e.dueDate ? `, ${relativeDue(e.dueDate)}` : ''}`).join('\n') : 'All your tracked essays are complete.';
  return {
    answer: `Your essay plan:\n\n${body}\n\nTip: finish your personal statement first — you can reuse pieces of it across supplements.`,
    suggestions: ['What should I do this week?', 'Build my college list'],
  };
}

function collegeListReply(state: AppState): ConciergeReply {
  const byTier = (tier: string) => state.collegeList.filter((c) => c.tier === tier).length;
  return {
    answer: `Your college list has ${state.collegeList.length} schools: ${byTier('reach')} reach, ${byTier('target')} target, ${byTier('safety')} safety.\n\nA balanced list is roughly 2 reach, 2-3 target, and 2 safety schools. Open the College List tab to add schools and track each application.`,
    suggestions: ['Review my essay plan', 'Check upcoming deadlines'],
  };
}

function scholarshipsReply(state: AppState): ConciergeReply {
  const potential = state.scholarships.reduce((sum, s) => sum + s.amount, 0);
  return {
    answer: `You are tracking ${state.scholarships.length} scholarships worth up to $${potential.toLocaleString()}.\n\nFocus first on ones with the nearest deadlines, and write one reusable essay you can adapt. Local scholarships often have the best odds.`,
    suggestions: ['Check upcoming deadlines', 'Review my essay plan'],
  };
}

function documentsReply(state: AppState): ConciergeReply {
  const missing = state.documents.filter((d) => !d.isReady);
  return {
    answer: missing.length ? `You still need ${missing.length} documents:\n\n${missing.map((d) => `• ${d.name}`).join('\n')}` : 'All your tracked documents are ready.',
    suggestions: ['What should I do this week?', 'Prepare for FAFSA'],
  };
}

const KNOWLEDGE: { keys: string[]; answer: string; suggestions?: string[] }[] = [
  { keys: ['recommendation', 'rec letter', 'teacher letter'], answer: 'Ask recommenders at least 3-4 weeks before your first deadline. Choose teachers who know you well, give them your resume, and follow up politely a week before the due date.', suggestions: ['Review missing documents', 'Check upcoming deadlines'] },
  { keys: ['common app', 'application'], answer: 'The Common App lets you apply to many schools with one core application plus school-specific supplements. Complete your profile once, then add each supplement and deadline.', suggestions: ['Review my essay plan', 'Check upcoming deadlines'] },
  { keys: ['essay', 'personal statement'], answer: 'A strong personal statement is specific and reflective. Finish it first, keep it under the word limit, and get one round of feedback from a teacher or mentor.', suggestions: ['Review my essay plan'] },
  { keys: ['scholarship', 'merit'], answer: 'Apply broadly and start local. Track deadlines, and reuse one flexible essay you can tailor quickly.', suggestions: ['Find scholarship opportunities'] },
  { keys: ['fafsa', 'financial aid', 'aid'], answer: 'File the FAFSA as early as you can. Create an FSA ID ahead of time, gather tax documents, and submit — many aid programs are first-come, first-served.', suggestions: ['Prepare for FAFSA'] },
  { keys: ['roommate', 'dorm', 'housing', 'mattress'], answer: 'Most dorms use Twin XL mattresses. Once you have a housing assignment, coordinate with your roommate on shared items and preferences.', suggestions: ['What should I do this week?'] },
];

export function respondByKey(key: string, state: AppState): ConciergeReply {
  switch (key) {
    case 'week': return thisWeek(state);
    case 'score': return explainScore(state);
    case 'deadlines': return deadlines(state);
    case 'fafsa': return fafsa(state);
    case 'essays': return essaysPlan(state);
    case 'list': return collegeListReply(state);
    case 'scholarships': return scholarshipsReply(state);
    case 'documents': return documentsReply(state);
    default: return respond(key, state);
  }
}

export function respond(question: string, state: AppState): ConciergeReply {
  const q = question.toLowerCase().trim();
  const qa = QUICK_ACTIONS.find((a) => a.label.toLowerCase() === q);
  if (qa) return respondByKey(qa.key, state);
  if (/(this week|today|what.*do)/.test(q)) return thisWeek(state);
  if (/(score|readiness|on track)/.test(q)) return explainScore(state);
  if (/(deadline|due|upcoming)/.test(q)) return deadlines(state);
  if (/(fafsa|financial aid)/.test(q)) return fafsa(state);
  if (/(essay|personal statement)/.test(q)) return essaysPlan(state);
  if (/(college list|reach|safety|target school)/.test(q)) return collegeListReply(state);
  if (/(scholarship|merit)/.test(q)) return scholarshipsReply(state);
  if (/(document|transcript|records)/.test(q)) return documentsReply(state);
  for (const entry of KNOWLEDGE) {
    if (entry.keys.some((k) => q.includes(k))) return { answer: entry.answer, suggestions: entry.suggestions ?? ['What should I do this week?'] };
  }
  const mission = nextMission(state);
  const phase = PHASE_META.find((p) => p.id === currentPhase(state.profile));
  return {
    answer: `I am your Prototype College Concierge — I use your plan to guide you (curated responses, not live AI).\n\nYou are in the "${phase?.label}" phase. ` + (mission ? `The most useful next step is: "${mission.title}".` : 'Your plan is all caught up!'),
    suggestions: ['What should I do this week?', 'Explain my readiness score', 'Check upcoming deadlines'],
  };
}
