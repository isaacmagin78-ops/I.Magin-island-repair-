'use client';

import { useEffect, useState } from 'react';
import { AppState, UserRole, Task, Reminder, FamilyProfile } from './types';
import { loadState, saveState, resetState, getSampleState, getInitialState } from './utils/storage';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import Timeline from './components/Timeline';
import Budget from './components/Budget';
import Documents from './components/Documents';
import Concierge from './components/Concierge';
import Personalize from './components/Personalize';
import Settings from './components/Settings';
import RoleToggle from './components/RoleToggle';

type Section = 'dashboard' | 'checklist' | 'timeline' | 'budget' | 'documents' | 'concierge' | 'personalize' | 'settings';

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'checklist', label: 'Checklist', icon: '✓' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'concierge', label: 'Concierge', icon: '🎓' },
  { id: 'personalize', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize state from localStorage
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
  }, []);

  if (!state) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const handleRoleChange = (role: UserRole) => {
    const newState = { ...state, currentRole: role };
    setState(newState);
    saveState(newState);
  };

  const handleTaskToggle = (taskId: string) => {
    const newTasks = state.tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const newState = { ...state, tasks: newTasks };
    setState(newState);
    saveState(newState);

    // Update selected task if it was toggled
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, completed: !selectedTask.completed });
    }
  };

  const handleProfileUpdate = (profile: FamilyProfile) => {
    const newState = { ...state, profile };
    setState(newState);
    saveState(newState);
  };

  const handleUpdateBudget = (categoryId: string, planned: number, actual: number) => {
    const newCategories = state.budget.categories.map(c =>
      c.id === categoryId ? { ...c, planned, actual } : c
    );
    const newState = { ...state, budget: { categories: newCategories } };
    setState(newState);
    saveState(newState);
  };

  const handleAddReminder = (reminder: Reminder) => {
    const newState = { ...state, reminders: [...state.reminders, reminder] };
    setState(newState);
    saveState(newState);
  };

  const handleRemoveReminder = (reminderId: string) => {
    const newState = {
      ...state,
      reminders: state.reminders.filter(r => r.id !== reminderId),
    };
    setState(newState);
    saveState(newState);
  };

  const handleUpdateDocument = (docId: string, isReady: boolean) => {
    const newDocs = state.documents.map(d =>
      d.id === docId ? { ...d, isReady } : d
    );
    const newState = { ...state, documents: newDocs };
    setState(newState);
    saveState(newState);
  };

  const handleLoadSampleFamily = () => {
    const sampleState = getSampleState();
    setState(sampleState);
    saveState(sampleState);
  };

  const handleResetData = () => {
    resetState();
    const initialState = getInitialState();
    setState(initialState);
    setCurrentSection('dashboard');
    setSelectedTask(null);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard state={state} role={state.currentRole} onNavigate={setCurrentSection} />;
      case 'checklist':
        return (
          <Checklist
            state={state}
            role={state.currentRole}
            onTaskToggle={handleTaskToggle}
            onTaskSelect={setSelectedTask}
            selectedTask={selectedTask}
          />
        );
      case 'timeline':
        return (
          <Timeline
            state={state}
            onAddReminder={handleAddReminder}
            onRemoveReminder={handleRemoveReminder}
          />
        );
      case 'budget':
        return (
          <Budget
            state={state}
            onUpdateBudget={handleUpdateBudget}
            onAddCategory={() => {}}
          />
        );
      case 'documents':
        return <Documents state={state} onUpdateDocument={handleUpdateDocument} />;
      case 'concierge':
        return <Concierge />;
      case 'personalize':
        return <Personalize profile={state.profile} onProfileUpdate={handleProfileUpdate} />;
      case 'settings':
        return (
          <Settings
            state={state}
            onLoadSampleFamily={handleLoadSampleFamily}
            onResetData={handleResetData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">🎓 College Launch OS</h1>
            <button
              className="md:hidden p-2 hover:bg-navy-light rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Role Toggle */}
          <div className="flex justify-between items-center">
            <RoleToggle role={state.currentRole} onRoleChange={handleRoleChange} />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white border-r border-gray-200 overflow-y-auto`}
        >
          <div className="p-4 space-y-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition flex items-center gap-3 ${
                  currentSection === item.id
                    ? 'bg-navy text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl">{renderSection()}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex overflow-x-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentSection(item.id);
              }}
              className={`flex-1 py-2 px-2 text-center text-xs font-semibold transition ${
                currentSection === item.id
                  ? 'text-navy border-t-2 border-navy'
                  : 'text-gray-600'
              }`}
            >
              <div className="text-xl">{item.icon}</div>
              <div className="truncate">{item.label}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Add padding for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
}
