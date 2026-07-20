'use client';

import { AppState } from '../types';
import { Card } from './ui';

export default function Budget({ state, onUpdateBudget }: { state: AppState; onUpdateBudget: (categoryId: string, planned: number, actual: number) => void }) {
  const { budget } = state;
  const plannedTotal = budget.categories.reduce((s, c) => s + c.planned, 0);
  const actualTotal = budget.categories.reduce((s, c) => s + c.actual, 0);
  const remaining = plannedTotal - actualTotal;
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden"><div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream"><h1 className="text-2xl font-extrabold">College Budget Planner</h1><p className="text-cream/80 text-sm mt-1">Track your college expenses and stay within budget.</p></div></Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-l-4 border-gold"><p className="text-ink-secondary text-sm font-semibold">Planned Budget</p><p className="text-3xl font-extrabold text-ink mt-1">${plannedTotal.toLocaleString()}</p></Card>
        <Card className="p-5 border-l-4 border-teal"><p className="text-ink-secondary text-sm font-semibold">Actual Spending</p><p className="text-3xl font-extrabold text-ink mt-1">${actualTotal.toLocaleString()}</p></Card>
        <Card className={`p-5 border-l-4 ${remaining >= 0 ? 'border-emerald-500' : 'border-red-500'}`}><p className="text-ink-secondary text-sm font-semibold">Remaining</p><p className="text-3xl font-extrabold text-ink mt-1">${remaining.toLocaleString()}</p></Card>
      </div>
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink mb-4">Expense categories</h2>
        <div className="space-y-3">
          {budget.categories.map((cat) => {
            const diff = cat.actual - cat.planned;
            return (
              <div key={cat.id} className="flex flex-wrap items-center gap-3 p-3 rounded-xl border border-slate-100">
                <p className="font-semibold text-ink flex-1 min-w-[8rem]">{cat.name}</p>
                <label className="text-xs text-ink-secondary">Planned <input type="number" value={cat.planned} onChange={(e) => onUpdateBudget(cat.id, parseFloat(e.target.value) || 0, cat.actual)} className="w-24 ml-1 px-2 py-1 border border-slate-200 rounded text-right" /></label>
                <label className="text-xs text-ink-secondary">Actual <input type="number" value={cat.actual} onChange={(e) => onUpdateBudget(cat.id, cat.planned, parseFloat(e.target.value) || 0)} className="w-24 ml-1 px-2 py-1 border border-slate-200 rounded text-right" /></label>
                <span className={`text-sm font-semibold w-24 text-right ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-emerald-600' : 'text-slate-500'}`}>{diff > 0 ? '+' : ''}${diff.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 font-bold text-ink"><span>Total</span><span>${plannedTotal.toLocaleString()} planned · ${actualTotal.toLocaleString()} spent</span></div>
      </Card>
    </div>
  );
}
