'use client';

import { AppState, Reminder } from '../types';
import { getDateDaysFromNow } from '../utils/storage';
import { useState } from 'react';

interface TimelineProps {
  state: AppState;
  onAddReminder: (reminder: Reminder) => void;
  onRemoveReminder: (reminderId: string) => void;
}

export default function Timeline({ state, onAddReminder, onRemoveReminder }: TimelineProps) {
  const { profile, reminders } = state;
  const [showAddReminder, setShowAddReminder] = useState(false);

  const moveInDate = new Date(profile.moveInDate);
  const today = new Date();

  const phases = [
    {
      label: '90 Days Before',
      date: new Date(moveInDate.getTime() - 90 * 24 * 60 * 60 * 1000),
      tasks: [
        'Select and confirm housing',
        'Set college budget',
        'Get financial aid paperwork',
        'Book move-in travel',
      ],
    },
    {
      label: '60 Days Before',
      date: new Date(moveInDate.getTime() - 60 * 24 * 60 * 60 * 1000),
      tasks: [
        'Receive roommate information',
        'Schedule physical exam',
        'Verify immunizations',
        'Book flights/transportation',
      ],
    },
    {
      label: '30 Days Before',
      date: new Date(moveInDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      tasks: [
        'Measure dorm room',
        'Purchase bedding and dorm essentials',
        'Get health insurance card',
        'Set up college email',
      ],
    },
    {
      label: '14 Days Before',
      date: new Date(moveInDate.getTime() - 14 * 24 * 60 * 60 * 1000),
      tasks: [
        'Confirm arrival date with housing',
        'Refill prescriptions',
        'Establish family check-in routine',
        'Create emergency contacts list',
      ],
    },
    {
      label: '7 Days Before',
      date: new Date(moveInDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      tasks: [
        'Pack for move-in',
        'Buy laundry supplies',
        'Confirm travel arrangements',
        'Prepare vehicle if driving',
      ],
    },
    {
      label: 'Move-In Day',
      date: moveInDate,
      tasks: ['Arrive at college', 'Check into housing', 'Meet your roommate', 'Attend orientation'],
    },
    {
      label: 'First Week',
      date: new Date(moveInDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      tasks: [
        'Explore campus',
        'Attend orientation activities',
        'Meet classmates',
        'Attend first classes',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">College Preparation Timeline</h1>
        <p className="text-blue-100 mt-2">
          Key milestones leading up to {new Date(profile.moveInDate).toLocaleDateString()}
        </p>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-4">
        {phases.map((phase, idx) => {
          const isPast = phase.date < today;
          const isCurrent =
            phase.date <= today &&
            new Date(phase.date.getTime() + 1 * 24 * 60 * 60 * 1000) > today;

          return (
            <div key={idx} className={`rounded-lg overflow-hidden transition ${
              isCurrent ? 'ring-2 ring-brand-warm shadow-lg' : ''
            }`}>
              <div
                className={`p-6 ${
                  isCurrent
                    ? 'bg-amber-50 border-l-4 border-brand-warm'
                    : isPast
                      ? 'bg-gray-50 border-l-4 border-gray-400'
                      : 'bg-white border-l-4 border-brand-blue'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy">{phase.label}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      📅 {phase.date.toLocaleDateString()}
                      {isCurrent && ' • 🔔 This week!'}
                      {isPast && ' • ✓ Completed'}
                    </p>
                  </div>
                  <div className="text-4xl">{getPhaseEmoji(phase.label)}</div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Recommended actions:</h3>
                  <ul className="space-y-1">
                    {phase.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Reminders */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-navy">Custom Reminders</h2>
          <button
            onClick={() => setShowAddReminder(!showAddReminder)}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Reminder
          </button>
        </div>

        {showAddReminder && (
          <AddReminderForm
            onAdd={(reminder) => {
              onAddReminder(reminder);
              setShowAddReminder(false);
            }}
            onCancel={() => setShowAddReminder(false)}
          />
        )}

        {reminders.length > 0 ? (
          <div className="space-y-3">
            {reminders.map(reminder => (
              <div key={reminder.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{reminder.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    📅 {new Date(reminder.date).toLocaleDateString()} •
                    <span className="ml-1 capitalize">{reminder.assignedTo}</span>
                  </p>
                  {reminder.notes && <p className="text-sm text-gray-700 mt-1 italic">{reminder.notes}</p>}
                </div>
                <button
                  onClick={() => onRemoveReminder(reminder.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No custom reminders yet. Add one to get started!</p>
        )}
      </div>

      {/* Countdown */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-600 rounded-lg p-6 text-white text-center">
        <p className="text-lg mb-2">Days Until Move-In</p>
        <p className="text-5xl font-bold">
          {Math.max(0, Math.ceil((moveInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))}
        </p>
      </div>
    </div>
  );
}

interface AddReminderFormProps {
  onAdd: (reminder: Reminder) => void;
  onCancel: () => void;
}

function AddReminderForm({ onAdd, onCancel }: AddReminderFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignedTo] = useState<'parent' | 'student' | 'shared'>('shared');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    onAdd({
      id: Date.now().toString(),
      title,
      date,
      assignedTo,
      notes,
    });

    setTitle('');
    setDate('');
    setAssignedTo('shared');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4 p-4 bg-blue-50 rounded-lg">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Reminder Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Order textbooks"
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Assign To</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value as 'parent' | 'student' | 'shared')}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="parent">Parent</option>
          <option value="student">Student</option>
          <option value="shared">Both (Shared)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Reminder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function getPhaseEmoji(label: string): string {
  if (label.includes('90')) return '🚀';
  if (label.includes('60')) return '📊';
  if (label.includes('30')) return '🛒';
  if (label.includes('14')) return '✈️';
  if (label.includes('7')) return '🎒';
  if (label === 'Move-In Day') return '🎓';
  return '🎉';
}
