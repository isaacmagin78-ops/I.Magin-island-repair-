'use client';

import { AppState, UserRole } from '../types';
import CategoryProgress from './CategoryProgress';

interface DashboardProps {
  state: AppState;
  role: UserRole;
  onNavigate: (section: any) => void;
}

export default function Dashboard({ state, role, onNavigate }: DashboardProps) {
  const { profile, tasks } = state;

  const daysUntilMoveIn = Math.ceil(
    (new Date(profile.moveInDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const visibleTasks = tasks.filter(t => {
    if (role === 'parent') return t.owner === 'parent' || t.owner === 'shared';
    return t.owner === 'student' || t.owner === 'shared';
  });

  const completedCount = visibleTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / visibleTasks.length) * 100);

  const upcomingTasks = visibleTasks
    .filter(t => !t.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);

  const categoryProgress = calculateCategoryProgress(visibleTasks);

  const roleTitle = role === 'parent' ? 'Parent\'s Launch Dashboard' : 'Student\'s Launch Dashboard';
  const roleSubtitle =
    role === 'parent'
      ? 'Your comprehensive guide to preparing your student for college success.'
      : 'Everything you need to prepare for a successful college transition.';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ink to-ink-secondary rounded-lg p-6 text-cream">
        <h1 className="text-3xl font-bold">{roleTitle}</h1>
        <p className="text-gold-light mt-2">{roleSubtitle}</p>
      </div>

      {/* Profile Card */}
      <div className="bg-cream rounded-lg shadow p-6 border-l-4 border-gold">
        <h2 className="text-xl font-bold text-ink mb-4">Family Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-ink-secondary">Student</p>
            <p className="text-lg font-semibold text-ink">{profile.studentName}</p>
          </div>
          <div>
            <p className="text-ink-secondary">Parent/Guardian</p>
            <p className="text-lg font-semibold text-ink">{profile.parentName}</p>
          </div>
          <div>
            <p className="text-ink-secondary">College</p>
            <p className="text-lg font-semibold text-ink">{profile.collegeName}</p>
          </div>
          <div>
            <p className="text-ink-secondary">Move-In Date</p>
            <p className="text-lg font-semibold text-ink">{new Date(profile.moveInDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-ink-secondary">Housing Type</p>
            <p className="text-lg font-semibold capitalize text-ink">{profile.housingType}</p>
          </div>
          <div>
            <p className="text-ink-secondary">Days Until Move-In</p>
            <p className={`text-lg font-bold ${daysUntilMoveIn <= 14 ? 'text-status-danger' : 'text-teal'}`}>
              {daysUntilMoveIn} days
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('personalize')}
          className="mt-4 text-gold font-semibold hover:underline text-sm"
        >
          Edit Profile →
        </button>
      </div>

      {/* Progress Summary */}
      <div className="bg-cream rounded-lg shadow p-6 border border-gold-light">
        <h2 className="text-xl font-bold text-ink mb-4">Overall Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-ink-secondary">
              {completedCount} of {visibleTasks.length} tasks completed
            </span>
            <span className="text-lg font-bold text-gold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gold-light rounded-full h-3">
            <div
              className="bg-gradient-to-r from-gold to-teal h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => onNavigate('checklist')}
          className="mt-4 w-full bg-gold text-ink py-2 rounded-lg font-semibold hover:bg-gold-light transition"
        >
          View Full Checklist
        </button>
      </div>

      {/* Category Progress */}
      <div className="bg-cream rounded-lg shadow p-6 border border-gold-light">
        <h2 className="text-xl font-bold text-ink mb-4">Progress by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryProgress).map(([category, { completed, total }]) => (
            <CategoryProgress key={category} category={category} completed={completed} total={total} />
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-cream rounded-lg shadow p-6 border border-gold-light">
        <h2 className="text-xl font-bold text-ink mb-4">Top Priority Unfinished Tasks</h2>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <div key={task.id} className="border-l-4 border-gold p-3 bg-gold-light bg-opacity-30 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-ink">{task.title}</p>
                    <p className="text-sm text-ink-secondary mt-1">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-teal text-cream px-2 py-1 rounded capitalize">
                        {task.category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          task.priority === 'high'
                            ? 'bg-status-danger text-cream'
                            : task.priority === 'medium'
                              ? 'bg-status-warning text-ink'
                              : 'bg-teal text-cream'
                        }`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-secondary text-center py-4">🎉 All high-priority tasks are done! Great work!</p>
        )}
      </div>

      {/* Concierge CTA */}
      <div className="bg-gradient-to-r from-teal to-gold rounded-lg p-6 text-cream">
        <h2 className="text-xl font-bold mb-2">Need Help?</h2>
        <p className="text-cream opacity-90 mb-4">Ask our Send-Off Guide for personalized guidance on any topic.</p>
        <button
          onClick={() => onNavigate('concierge')}
          className="bg-cream text-gold font-semibold px-6 py-2 rounded-lg hover:bg-gold-light transition"
        >
          Ask for Guidance
        </button>
      </div>
    </div>
  );
}

function calculateCategoryProgress(tasks: any[]) {
  const categories: Record<string, { completed: number; total: number }> = {};

  tasks.forEach(task => {
    if (!categories[task.category]) {
      categories[task.category] = { completed: 0, total: 0 };
    }
    categories[task.category].total++;
    if (task.completed) {
      categories[task.category].completed++;
    }
  });

  return categories;
}
