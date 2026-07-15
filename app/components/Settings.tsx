'use client';

import { AppState } from '../types';
import { exportState } from '../utils/storage';

interface SettingsProps {
  state: AppState;
  onLoadSampleFamily: () => void;
  onResetData: () => void;
}

export default function Settings({ state, onLoadSampleFamily, onResetData }: SettingsProps) {
  const handleExport = () => {
    const data = exportState(state);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college-launch-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (
      typeof window !== 'undefined' &&
      confirm('Are you sure? This will delete all your data and reset to the default empty state. This cannot be undone.')
    ) {
      onResetData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ink to-ink-secondary rounded-2xl p-6 text-cream">
        <h1 className="text-3xl font-bold">Settings & Tools</h1>
        <p className="text-cream/80 mt-2">Manage your college launch data and preferences</p>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-ink border-b pb-3">Data Management</h2>

        <div className="space-y-3">
          {/* Export Button */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-ink mb-2">📥 Export Your Progress</h3>
            <p className="text-sm text-gray-700 mb-3">
              Download your profile, tasks, budget, and progress as a JSON file. You can use this to back up your data
              or share your progress.
            </p>
            <button
              onClick={handleExport}
              className="bg-ink text-cream px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download Progress (JSON)
            </button>
          </div>

          {/* Load Sample Data */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-ink mb-2">🎓 Load Sample Family</h3>
            <p className="text-sm text-gray-700 mb-3">
              Load the pre-populated example with Jordan Carter (a rising senior) and family. This shows how the app
              looks with real data and some completed tasks. Great for understanding the app flow.
            </p>
            <button
              onClick={onLoadSampleFamily}
              className="bg-status-success text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Load Sample Data
            </button>
          </div>

          {/* Reset Data */}
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-ink mb-2">🔄 Reset All Data</h3>
            <p className="text-sm text-gray-700 mb-3">
              Clear all data and reset to a fresh, empty state. Your family profile will be reset to default values,
              and all tasks will be marked incomplete. This action cannot be undone.
            </p>
            <button
              onClick={handleReset}
              className="bg-status-danger text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>

      {/* Current Data Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-ink border-b pb-3 mb-4">Current Data Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Tasks" value={state.tasks.length.toString()} icon="📋" />
          <StatCard
            label="Completed"
            value={state.tasks.filter(t => t.completed).length.toString()}
            icon="✓"
          />
          <StatCard label="Reminders" value={state.reminders.length.toString()} icon="🔔" />
          <StatCard label="Documents" value={state.documents.length.toString()} icon="📄" />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Profile:</strong> {state.profile.studentName} preparing for {state.profile.collegeName}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Move-In:</strong> {new Date(state.profile.moveInDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Budget:</strong> $
            {state.budget.categories.reduce((sum, c) => sum + c.planned, 0).toFixed(2)} planned
          </p>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-blue-50 border-l-4 border-gold rounded-lg p-6">
        <h2 className="font-bold text-ink mb-3">ℹ️ About College Launch OS</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Version:</strong> 1.0.0 - Prototype
          </p>
          <p>
            <strong>Storage:</strong> All data is stored locally in your browser using localStorage. Nothing is sent
            to remote servers.
          </p>
          <p>
            <strong>Data Persistence:</strong> Your data persists even after closing the browser, as long as you don't
            clear browser data.
          </p>
          <p>
            <strong>Browser Support:</strong> Works on modern browsers (Chrome, Firefox, Safari, Edge) on desktop and
            mobile.
          </p>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6">
        <h2 className="font-bold text-ink mb-3">🔐 Privacy & Security</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            ✓ <strong>Local Storage:</strong> All your data stays on your device. We never store it on our servers.
          </p>
          <p>
            ✓ <strong>No Sign-Up Required:</strong> Start using immediately without creating an account.
          </p>
          <p>
            ✓ <strong>No Tracking:</strong> We don't track your behavior or collect usage analytics.
          </p>
          <p>
            ℹ️ <strong>Production Version:</strong> When this app goes to production, encryption and secure cloud
            storage will be added.
          </p>
        </div>
      </div>

      {/* Support & Feedback */}
      <div className="bg-amber-50 border-l-4 border-teal rounded-lg p-6">
        <h2 className="font-bold text-ink mb-3">📞 Support & Feedback</h2>
        <p className="text-sm text-gray-700 mb-4">
          Have questions or feedback about College Launch OS? We'd love to hear from you!
        </p>
        <div className="space-y-2 text-sm">
          <p>
            📧 <strong>Email:</strong>{' '}
            <a href="mailto:support@collegelaunch.app" className="text-gold hover:underline">
              support@collegelaunch.app
            </a>
          </p>
          <p>
            🐛 <strong>Report a Bug:</strong> Found an issue? Let us know and help us improve!
          </p>
          <p>
            💡 <strong>Feature Requests:</strong> Have an idea? We're always looking to improve the app.
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <p className="text-3xl mb-2">{icon}</p>
      <p className="text-gray-600 text-sm font-semibold">{label}</p>
      <p className="text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
