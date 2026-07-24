'use client';

import { useEffect, useState } from 'react';
import {
  AppState,
  UserRole,
  Task,
  Reminder,
  FamilyProfile,
  CollegeListItem,
  Essay,
  Scholarship,
  ActivityItem,
} from './types';
import { loadState, saveState, resetState, getSampleState, getInitialState } from './utils/storage';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import Timeline from './components/Timeline';
import Budget from './components/Budget';
import Documents from './components/Documents';
import Concierge from './components/Concierge';
import CollegeList from './components/CollegeList';
import Personalize from './components/Personalize';
import Settings from './components/Settings';
import RoleToggle from './components/RoleToggle';

type Section =
  | 'dashboard'
  | 'checklist'
  | 'timeline'
  | 'collegelist'
  | 'budget'
  | 'documents'
  | 'concierge'
  | 'personalize'
  | 'settings';

interface NavItem {
  id: Section;
  label: string;
  icon: string;
  primary?: boolean; // shown in the mobile bottom bar
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', primary: true },
  { id: 'checklist', label: 'Checklist', icon: '✓', primary: true },
  { id: 'timeline', label: 'Timeline', icon: '🗓', primary: true },
  { id: 'collegelist', label: 'College List', icon: '🎓', primary: true },
  { id: 'concierge', label: 'Concierge', icon: '✨', primary: true },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'personalize', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const uid = () => Math.random().toString(36).slice(2, 9);

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [section, setSection] = useState<Section>('dashboard');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) {
    return <div className="flex items-center justify-center h-screen text-ink-secondary">Loading…</div>;
  }

  /* ------------------------- persistence helper ------------------------- */
  const commit = (next: AppState) => {
    setState(next);
    saveState(next);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const logActivity = (partial: Omit<ActivityItem, 'id' | 'timestamp'>): ActivityItem => ({
    id: uid(),
    timestamp: new Date().toISOString(),
    ...partial,
  });

  const actorName = () =>
    state.currentRole === 'parent'
      ? `${state.profile.parentName.split(' ')[0]} (parent)`
      : state.profile.studentName.split(' ')[0];

  /* ------------------------------ handlers ------------------------------ */
  const handleRoleChange = (role: UserRole) => commit({ ...state, currentRole: role });

  const handleToggleTask = (taskId: string) => {
    const target = state.tasks.find((t) => t.id === taskId);
    if (!target) return;
    const nowComplete = !target.completed;
    const tasks = state.tasks.map((t) =>
      t.id === taskId
        ? { ...t, completed: nowComplete, status: nowComplete ? ('complete' as const) : ('not-started' as const) }
        : t,
    );
    const activity = nowComplete
      ? [logActivity({ actor: actorName(), action: 'completed', target: target.title }), ...state.activity].slice(0, 20)
      : state.activity;
    commit({ ...state, tasks, activity });
  };

  const handleUpdateTask = (taskId: string, patch: Partial<Task>) => {
    const tasks = state.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t));
    commit({ ...state, tasks });
  };

  const handleProfileUpdate = (profile: FamilyProfile) => {
    commit({ ...state, profile });
    showToast('Profile saved');
  };

  const handleUpdateBudget = (categoryId: string, planned: number, actual: number) => {
    const categories = state.budget.categories.map((c) => (c.id === categoryId ? { ...c, planned, actual } : c));
    commit({ ...state, budget: { categories } });
  };

  const handleAddReminder = (reminder: Reminder) => commit({ ...state, reminders: [...state.reminders, reminder] });
  const handleRemoveReminder = (id: string) =>
    commit({ ...state, reminders: state.reminders.filter((r) => r.id !== id) });

  const handleUpdateDocument = (docId: string, isReady: boolean) => {
    const documents = state.documents.map((d) => (d.id === docId ? { ...d, isReady } : d));
    const doc = state.documents.find((d) => d.id === docId);
    const activity =
      isReady && doc
        ? [logActivity({ actor: actorName(), action: 'marked ready', target: doc.name }), ...state.activity].slice(0, 20)
        : state.activity;
    commit({ ...state, documents, activity });
  };

  // College list
  const handleAddCollege = (c: CollegeListItem) => commit({ ...state, collegeList: [...state.collegeList, c] });
  const handleUpdateCollege = (id: string, patch: Partial<CollegeListItem>) =>
    commit({ ...state, collegeList: state.collegeList.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const handleRemoveCollege = (id: string) =>
    commit({ ...state, collegeList: state.collegeList.filter((c) => c.id !== id) });

  // Essays
  const handleAddEssay = (e: Essay) => commit({ ...state, essays: [...state.essays, e] });
  const handleUpdateEssay = (id: string, patch: Partial<Essay>) =>
    commit({ ...state, essays: state.essays.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  const handleRemoveEssay = (id: string) => commit({ ...state, essays: state.essays.filter((e) => e.id !== id) });

  // Scholarships
  const handleAddScholarship = (s: Scholarship) => commit({ ...state, scholarships: [...state.scholarships, s] });
  const handleUpdateScholarship = (id: string, patch: Partial<Scholarship>) =>
    commit({ ...state, scholarships: state.scholarships.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const handleRemoveScholarship = (id: string) =>
    commit({ ...state, scholarships: state.scholarships.filter((s) => s.id !== id) });

  const handleLoadSampleFamily = () => {
    commit(getSampleState());
    setSection('dashboard');
    showToast('Loaded Jordan Carter sample family');
  };

  const handleResetData = () => {
    resetState();
    commit(getInitialState());
    setSection('dashboard');
    showToast('Reset to a fresh, blank plan');
  };

  const navigate = (s: Section) => {
    setSection(s);
    setMobileMenu(false);
    setMoreOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  /* ------------------------------- render ------------------------------- */
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard state={state} role={state.currentRole} onNavigate={navigate} onToggleTask={handleToggleTask} />;
      case 'checklist':
        return (
          <Checklist state={state} role={state.currentRole} onToggleTask={handleToggleTask} onUpdateTask={handleUpdateTask} />
        );
      case 'timeline':
        return (
          <Timeline
            state={state}
            onAddReminder={handleAddReminder}
            onRemoveReminder={handleRemoveReminder}
            onToggleTask={handleToggleTask}
          />
        );
      case 'collegelist':
        return (
          <CollegeList
            state={state}
            onAddCollege={handleAddCollege}
            onUpdateCollege={handleUpdateCollege}
            onRemoveCollege={handleRemoveCollege}
            onAddEssay={handleAddEssay}
            onUpdateEssay={handleUpdateEssay}
            onRemoveEssay={handleRemoveEssay}
            onAddScholarship={handleAddScholarship}
            onUpdateScholarship={handleUpdateScholarship}
            onRemoveScholarship={handleRemoveScholarship}
          />
        );
      case 'budget':
        return <Budget state={state} onUpdateBudget={handleUpdateBudget} onAddCategory={() => {}} />;
      case 'documents':
        return <Documents state={state} onUpdateDocument={handleUpdateDocument} />;
      case 'concierge':
        return <Concierge state={state} onNavigate={navigate} />;
      case 'personalize':
        return <Personalize profile={state.profile} onProfileUpdate={handleProfileUpdate} />;
      case 'settings':
        return <Settings state={state} onLoadSampleFamily={handleLoadSampleFamily} onResetData={handleResetData} />;
      default:
        return null;
    }
  };

  const primaryNav = NAV_ITEMS.filter((n) => n.primary);
  const moreNav = NAV_ITEMS.filter((n) => !n.primary);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-gradient-to-r from-ink to-ink-secondary text-cream sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => navigate('dashboard')} className="text-xl font-extrabold tracking-tight">
              <span className="text-gold">→</span> Magin
            </button>
            <div className="hidden md:block">
              <RoleToggle role={state.currentRole} onRoleChange={handleRoleChange} />
            </div>
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
          <div className="md:hidden mt-3">
            <RoleToggle role={state.currentRole} onRoleChange={handleRoleChange} />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Sidebar (desktop) + slide-down (mobile) */}
        <nav className={`${mobileMenu ? 'block' : 'hidden'} md:block w-full md:w-60 md:flex-shrink-0`}>
          <div className="p-3 md:p-4 md:sticky md:top-[72px] space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold transition flex items-center gap-3 ${
                  section === item.id ? 'bg-ink text-cream' : 'text-ink hover:bg-gold-light/40'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto">{renderSection()}</div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gold-light z-40">
        <div className="flex">
          {primaryNav.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex-1 py-2 text-center text-[11px] font-semibold transition ${
                section === item.id ? 'text-gold' : 'text-ink-secondary'
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <div className="truncate px-0.5">{item.label}</div>
            </button>
          ))}
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex-1 py-2 text-center text-[11px] font-semibold ${
              moreNav.some((n) => n.id === section) ? 'text-gold' : 'text-ink-secondary'
            }`}
          >
            <div className="text-lg">⋯</div>
            <div>More</div>
          </button>
        </div>
      </nav>

      {/* More sheet */}
      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-ink/50 flex items-end" onClick={() => setMoreOpen(false)}>
          <div className="bg-white w-full rounded-t-2xl p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3" />
            {moreNav.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl font-semibold text-ink hover:bg-gold-light/40 flex items-center gap-3"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global toast */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-ink text-cream px-5 py-3 rounded-xl shadow-lg text-sm font-semibold">
          {toast}
        </div>
      )}
    </div>
  );
}
