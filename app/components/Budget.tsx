'use client';

import { AppState } from '../types';

interface BudgetProps {
  state: AppState;
  onUpdateBudget: (categoryId: string, planned: number, actual: number) => void;
  onAddCategory: (name: string, planned: number) => void;
}

export default function Budget({ state, onUpdateBudget, onAddCategory }: BudgetProps) {
  const { budget } = state;

  const plannedTotal = budget.categories.reduce((sum, c) => sum + c.planned, 0);
  const actualTotal = budget.categories.reduce((sum, c) => sum + c.actual, 0);
  const remaining = plannedTotal - actualTotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ink to-ink-secondary rounded-2xl p-6 text-cream">
        <h1 className="text-3xl font-bold">College Budget Planner</h1>
        <p className="text-cream/80 mt-2">Track your college expenses and stay within budget.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Planned Budget" amount={plannedTotal} color="bg-blue-50 border-gold" />
        <SummaryCard title="Actual Spending" amount={actualTotal} color="bg-orange-50 border-teal" />
        <SummaryCard title="Remaining Budget" amount={remaining} color={remaining > 0 ? 'bg-green-50 border-status-success' : 'bg-red-50 border-status-danger'} />
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-ink">Expense Categories</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Category</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Planned</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Actual</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Difference</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {budget.categories.map(cat => {
                const diff = cat.actual - cat.planned;
                const status = cat.actual === 0 ? 'pending' : diff > 0 ? 'over' : 'under';

                return (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{cat.name}</p>
                    </td>
                    <td className="text-right px-6 py-4">
                      <input
                        type="number"
                        value={cat.planned}
                        onChange={(e) =>
                          onUpdateBudget(cat.id, parseFloat(e.target.value) || 0, cat.actual)
                        }
                        className="w-24 px-2 py-1 border rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-right px-6 py-4">
                      <input
                        type="number"
                        value={cat.actual}
                        onChange={(e) =>
                          onUpdateBudget(cat.id, cat.planned, parseFloat(e.target.value) || 0)
                        }
                        className="w-24 px-2 py-1 border rounded text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className={`text-right px-6 py-4 font-semibold ${diff > 0 ? 'text-status-danger' : diff < 0 ? 'text-status-success' : 'text-gray-600'}`}>
                      ${diff > 0 ? '+' : ''}{diff.toFixed(2)}
                    </td>
                    <td className="text-center px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          status === 'pending'
                            ? 'bg-gray-200 text-gray-700'
                            : status === 'over'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {status === 'pending' ? 'Pending' : status === 'over' ? 'Over' : 'Under'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Row */}
        <div className="bg-gray-50 px-6 py-4 border-t font-bold text-gray-900 grid grid-cols-5 gap-4">
          <div>TOTAL</div>
          <div className="text-right">${plannedTotal.toFixed(2)}</div>
          <div className="text-right">${actualTotal.toFixed(2)}</div>
          <div className={`text-right ${remaining > 0 ? 'text-status-success' : 'text-status-danger'}`}>
            ${remaining.toFixed(2)}
          </div>
          <div></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-ink mb-4">Budget Utilization</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Total Spent vs Planned</span>
              <span className="text-sm font-bold text-gray-700">
                {plannedTotal > 0
                  ? Math.round((actualTotal / plannedTotal) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  actualTotal > plannedTotal
                    ? 'bg-status-danger'
                    : actualTotal > plannedTotal * 0.9
                      ? 'bg-status-warning'
                      : 'bg-status-success'
                }`}
                style={{
                  width: `${plannedTotal > 0 ? Math.min(100, (actualTotal / plannedTotal) * 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border-l-4 border-gold rounded-lg p-6">
        <h3 className="font-bold text-ink mb-3">💡 Budget Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Budget extra for unexpected expenses</li>
          <li>• Compare prices for textbooks and supplies</li>
          <li>• Consider meal plan options carefully</li>
          <li>• Set up a separate account for college spending</li>
          <li>• Track actual spending to monitor progress</li>
        </ul>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  amount: number;
  color: string;
}

function SummaryCard({ title, amount, color }: SummaryCardProps) {
  return (
    <div className={`${color} border-l-4 rounded-lg p-6`}>
      <p className="text-gray-600 text-sm font-semibold">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">${amount.toFixed(2)}</p>
    </div>
  );
}
