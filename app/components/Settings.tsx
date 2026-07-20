'use client';

import { AppState } from '../types';
import { exportState } from '../utils/storage';
import { Card } from './ui';

export default function Settings({ state, onLoadSampleFamily, onResetData }: { state: AppState; onLoadSampleFamily: () => void; onResetData: () => void }) {
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
    if (typeof window !== 'undefined' && confirm('Are you sure? This deletes all your data and resets to a blank plan. This cannot be undone.')) onResetData();
  };
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden"><div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream"><h1 className="text-2xl font-extrabold">Settings & Tools</h1><p className="text-cream/80 text-sm mt-1">Manage your college launch data.</p></div></Card>
      <Card className="p-5 space-y-3">
        <div className="p-4 bg-slate-50 rounded-xl"><h3 className="font-semibold text-ink mb-1">Export your progress</h3><p className="text-sm text-ink-secondary mb-3">Download your profile, tasks, budget, and progress as a JSON file.</p><button onClick={handleExport} className="bg-ink text-cream px-5 py-2 rounded-lg font-semibold hover:bg-ink-secondary transition">Download progress (JSON)</button></div>
        <div className="p-4 bg-emerald-50 rounded-xl"><h3 className="font-semibold text-ink mb-1">Load sample family</h3><p className="text-sm text-ink-secondary mb-3">Load the Jordan Carter example (a rising senior) with some completed tasks.</p><button onClick={onLoadSampleFamily} className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">Load sample data</button></div>
        <div className="p-4 bg-red-50 rounded-xl"><h3 className="font-semibold text-ink mb-1">Reset all data</h3><p className="text-sm text-ink-secondary mb-3">Clear all data and reset to a fresh, blank plan. This cannot be undone.</p><button onClick={handleReset} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Reset all data</button></div>
      </Card>
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink mb-3">Current data summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Tasks" value={state.tasks.length} />
          <Stat label="Completed" value={state.tasks.filter((t) => t.completed).length} />
          <Stat label="Colleges" value={state.collegeList.length} />
          <Stat label="Documents" value={state.documents.length} />
        </div>
        <p className="text-sm text-ink-secondary mt-4"><strong>Storage:</strong> All data is stored locally in your browser. Nothing is sent to a server. <strong>Version:</strong> 1.0.0 — Prototype.</p>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="bg-slate-50 rounded-xl p-4 text-center"><p className="text-2xl font-extrabold text-ink">{value}</p><p className="text-xs text-ink-secondary mt-1">{label}</p></div>;
}
