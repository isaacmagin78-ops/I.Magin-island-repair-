'use client';

import { UserRole } from '../types';

export default function RoleToggle({ role, onRoleChange }: { role: UserRole; onRoleChange: (role: UserRole) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onRoleChange('parent')} className={`px-4 py-2 rounded-lg font-semibold transition ${role === 'parent' ? 'bg-white text-ink shadow' : 'bg-white/10 text-cream hover:bg-white/20'}`} aria-pressed={role === 'parent'}>Parent</button>
      <button onClick={() => onRoleChange('student')} className={`px-4 py-2 rounded-lg font-semibold transition ${role === 'student' ? 'bg-white text-ink shadow' : 'bg-white/10 text-cream hover:bg-white/20'}`} aria-pressed={role === 'student'}>Student</button>
    </div>
  );
}
