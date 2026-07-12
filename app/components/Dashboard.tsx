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
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">{roleTitle}</h1>
        <p className="text-blue-100 mt-2">{roleSubtitle}</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-blue">
        <h2 className="text-xl font-bold text-navy mb-4">Family Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Student</p>
            <p className="text-lg font-semibold">{profile.studentName}</p>
          </div>
          <div>
            <p className="text-gray-600">Parent/Guardian</p>
            <p className="text-lg font-semibold">{profile.parentName}</p>
          </div>
          <div>
            <p className="text-gray-600">College</p>
            <p className="text-lg font-semibold">{profile.collegeName}</p>
          </div>
          <div>
            <p className="text-gray-600">Move-In Date</p>
            <p className="text-lg font-semibold">{new Date(profile.moveInDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Housing Type</p>
            <p className="text-lg font-semibold capitalize">{profile.housingType}</p>
          </div>
          <div>
            <p className="text-gray-600">Days Until Move-In</p>
            <p className={`text-lg font-bold ${daysUntilMoveIn <= 14 ? 'text-brand-warm' : 'text-status-success'}`}>
              {daysUntilMoveIn} days
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('personalize')}
          className="mt-4 text-brand-blue font-semibold hover:underline text-sm"
        >
          Edit Profile →
        </button>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Overall Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {completedCount} of {visibleTasks.length} tasks completed
            </span>
            <span className="text-lg font-bold text-brand-blue">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-brand-blue to-brand-warm h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => onNavigate('checklist')}
          className="mt-4 w-full bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Full Checklist
        </button>
      </div>

      {/* Category Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Progress by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryProgress).map(([category, { completed, total }]) => (
            <CategoryProgress key={category} category={category} completed={completed} total={total} />
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Top Priority Unfinished Tasks</h2>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <div key={task.id} className="border-l-4 border-brand-warm p-3 bg-amber-50 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-navy">{task.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded capitalize">
                        {task.category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          task.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : task.priority === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
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
          <p className="text-gray-600 text-center py-4">🎉 All high-priority tasks are done! Great work!</p>
        )}
      </div>

      {/* Concierge CTA */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Need Help?</h2>
        <p className="text-blue-100 mb-4">Ask our College Concierge for personalized guidance on any topic.</p>
        <button
          onClick={() => onNavigate('concierge')}
          className="bg-white text-brand-blue font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Ask the Concierge
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
