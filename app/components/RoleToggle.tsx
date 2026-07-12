'use client';

import { UserRole } from '../types';

interface RoleToggleProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function RoleToggle({ role, onRoleChange }: RoleToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onRoleChange('parent')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          role === 'parent'
            ? 'bg-navy text-white shadow-lg'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-pressed={role === 'parent'}
      >
        👨‍👩‍👧 Parent
      </button>
      <button
        onClick={() => onRoleChange('student')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          role === 'student'
            ? 'bg-navy text-white shadow-lg'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-pressed={role === 'student'}
      >
        🎓 Student
      </button>
    </div>
  );
}
