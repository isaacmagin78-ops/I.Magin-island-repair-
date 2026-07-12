'use client';

const CATEGORY_ICONS: Record<string, string> = {
  housing: '🏠',
  medical: '⚕️',
  documents: '📄',
  finances: '💰',
  safety: '🛡️',
  technology: '💻',
  packing: '🎒',
  travel: '✈️',
  food: '🍽️',
  laundry: '🧺',
  academics: '📚',
};

interface CategoryProgressProps {
  category: string;
  completed: number;
  total: number;
}

export default function CategoryProgress({ category, completed, total }: CategoryProgressProps) {
  const percent = Math.round((completed / total) * 100);
  const icon = CATEGORY_ICONS[category] || '📌';

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-gray-800 capitalize">{category}</span>
        </div>
        <span className="text-sm font-bold text-gray-600">
          {completed}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className="bg-status-success h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-1">{percent}% complete</p>
    </div>
  );
}
