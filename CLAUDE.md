# CLAUDE.md - College Launch OS Development Guide

## Project Overview

**College Launch OS** is a guided family launch system helping parents and first-time college students prepare for the college transition. It's a **Next.js 14 + React 18 + TypeScript + Tailwind CSS** application that runs entirely in the browser with localStorage-based persistence.

**Repository**: `isaacmagin78-ops/I.Magin-island-repair-`  
**Current Branch**: `claude/claude-md-docs-if24f6`  
**Status**: Fully functional prototype with all core features implemented

## Architecture at a Glance

```
┌─────────────────────────────────────────────────────┐
│           Next.js App Router (App Dir)               │
│  (page.tsx: main state mgmt + navigation)            │
└──────────────┬──────────────────────────────────────┘
               │
        ┌──────┴──────────┬────────────┬─────────┐
        │                 │            │         │
    Components        Types        Utils       Data
    (8 files)       (types.ts)   (2 files)   (seed.ts)
        │             │            │         │
    • Dashboard    • UserRole    • storage   • DEFAULT_*
    • Checklist    • Task        • concierge • SAMPLE_*
    • Timeline     • Reminder    • helpers
    • Budget       • Profile
    • Documents    • AppState
    • Concierge
    • Personalize
    • Settings
    └──────────────┬───────────────────────────┘
                   │
            localStorage (persistent)
```

## Data Model & Types

All types are defined in **`app/types.ts`**:

### Core Interfaces

```typescript
FamilyProfile {
  id: string;
  studentName, parentName, collegeName: string;
  housingType: 'dorm' | 'apartment' | 'house' | 'greek-life' | 'unknown';
  moveInDate: string; // ISO date
  hasRoommate, hasVehicle, hasPrescriptionMedication: boolean;
  homeState, collegeState, studentType: string;
}

Task {
  id: string; title, description: string;
  category: TaskCategory; // 11 types: housing, medical, documents, etc.
  owner: 'parent' | 'student' | 'shared';
  priority: 'high' | 'medium' | 'low';
  completionWindow: string; // e.g., "30 days before"
  completed: boolean;
  details?: string;
  dueDate?: string;
}

Reminder {
  id: string; title: string;
  date: string; // ISO date
  assignedTo: 'parent' | 'student' | 'shared';
  notes: string;
}

BudgetCategory {
  id: string; name: string;
  planned: number; actual: number;
}

DocumentItem {
  id: string; name: string;
  isReady: boolean; notes?: string;
}

AppState {
  profile: FamilyProfile;
  tasks: Task[];
  reminders: Reminder[];
  budget: BudgetData;
  documents: DocumentItem[];
  currentRole: 'parent' | 'student';
}
```

## File Structure & Responsibilities

### `app/page.tsx` — Main Component
- **Entry point** of the application
- Manages global `AppState` using React `useState`
- Handles all state mutations (task toggle, profile update, budget changes, etc.)
- Routes between 8 main sections via `currentSection` state variable
- Controls mobile menu state
- **Key functions**:
  - `handleTaskToggle()` — Mark task complete/incomplete
  - `handleProfileUpdate()` — Save family profile changes
  - `handleUpdateBudget()` — Update budget category values
  - `handleAddReminder()` / `handleRemoveReminder()` — Manage reminders
  - `handleUpdateDocument()` — Update document readiness
  - `renderSection()` — Conditional rendering of 8 main views

### `app/types.ts` — Type Definitions
- Single source of truth for all TypeScript interfaces
- No implementation logic — types only
- Keep this file as the contract between components

### `app/utils/storage.ts` — LocalStorage Management
- **`loadState()`** — Loads from localStorage, falls back to `getInitialState()`
- **`saveState(state)`** — Persists `AppState` to localStorage
- **`getInitialState()`** — Returns fresh state with default values (empty profile, all tasks incomplete)
- **`getSampleState()`** — Pre-populated sample family (Taylor Morgan, University of Florida, some tasks/reminders done)
- **`resetState()`** — Clears localStorage
- **`exportState(state)`** — Creates JSON export for download
- Server-side safe: checks `typeof window` before accessing localStorage

### `app/utils/concierge.ts` — AI Responses
- **`CONCIERGE_KNOWLEDGE_BASE`** — Object mapping keywords → answers
- Structure per entry:
  ```typescript
  'keyword': {
    category: string;
    answer: string;
    suggestedTasks: string[];
  }
  ```
- 50+ curated responses covering 10 topics
- Used by Concierge component for chat responses

### `app/data/seed.ts` — Initial Data
- Exports **default constants**:
  - `DEFAULT_FAMILY_PROFILE` — Empty profile template
  - `DEFAULT_TASKS` — All 50+ tasks across 11 categories
  - `DEFAULT_BUDGET` — 10 budget categories (Bedding, Tech, Travel, etc.)
  - `DEFAULT_DOCUMENTS` — 12+ essential documents
  - `SAMPLE_FAMILY_PROFILE` — Taylor Morgan sample data

### Components (`app/components/*.tsx`)

Each component receives necessary state and callback props, updates state via callbacks passed to parent:

| Component | Props | Responsibilities |
|-----------|-------|------------------|
| **Dashboard** | `state`, `role`, `onNavigate` | Overview of progress, top tasks, move-in countdown |
| **Checklist** | `state`, `role`, `onTaskToggle`, `onTaskSelect`, `selectedTask` | Task list, filtering by category/priority, task detail panel |
| **Timeline** | `state`, `onAddReminder`, `onRemoveReminder` | 7-phase timeline, reminder management |
| **Budget** | `state`, `onUpdateBudget`, `onAddCategory` | Expense tracking, planned vs. actual comparison |
| **Documents** | `state`, `onUpdateDocument` | Document readiness checklist |
| **Concierge** | (none) | Chat interface, knowledge base lookup |
| **Personalize** | `profile`, `onProfileUpdate` | Family/college/housing form |
| **Settings** | `state`, `onLoadSampleFamily`, `onResetData` | Data export, sample loading, reset |
| **RoleToggle** | `role`, `onRoleChange` | Parent/Student toggle button |
| **CategoryProgress** | `category`, `completed`, `total` | Progress bar for a single category |

**Component Pattern**:
- All components are client components (`'use client'`)
- Props-based communication (callback-driven state updates)
- No local useState for data (only for UI state like modals)
- Filter/display logic based on `role` parameter

## Key Workflows

### 1. Loading the App
1. `page.tsx` mounts, runs `useEffect`
2. `loadState()` reads from localStorage
3. If no data exists, `getInitialState()` returns defaults
4. State renders, user sees Dashboard with empty profile and 50 unchecked tasks

### 2. Completing a Task
1. User clicks task checkbox in Checklist
2. `onTaskToggle(taskId)` callback fires
3. `page.tsx` toggles `Task.completed` boolean
4. `saveState()` persists to localStorage
5. Components re-render with updated progress

### 3. Updating Family Profile
1. User fills "Profile" section (Personalize component)
2. Submits form
3. `onProfileUpdate(profile)` callback fires
4. `page.tsx` updates `state.profile`
5. `saveState()` persists changes
6. Dashboard immediately reflects new student/parent names, move-in date, etc.

### 4. Adding a Reminder
1. User navigates to Timeline section
2. Selects a phase, enters title/date/assignment
3. Clicks "Add Reminder"
4. `onAddReminder(reminder)` callback fires
5. `page.tsx` appends to `state.reminders`
6. `saveState()` persists
7. Reminder appears in Timeline list

### 5. Exporting Data
1. User clicks "Export Progress" in Settings
2. `exportState()` creates JSON with summary
3. Browser downloads `college-launch-os-export.json`
4. File includes profile, completed tasks, reminders, budget, documents

### 6. Loading Sample Data
1. User clicks "Load Sample Family" button in Settings
2. `getSampleState()` returns pre-populated state (Taylor Morgan family)
3. `saveState()` persists it
4. All sections instantly show sample data
5. Useful for demos and exploring features

## Development Workflows

### Adding a New Task

1. Edit `app/data/seed.ts`
2. Add to `DEFAULT_TASKS` array:
   ```typescript
   {
     id: 'unique-slug-id', // Use lowercase with hyphens
     title: 'Task Title',
     description: 'One-line summary visible in list',
     category: 'housing', // Must match TaskCategory type
     owner: 'parent', // or 'student' or 'shared'
     priority: 'high', // or 'medium' or 'low'
     completionWindow: '30 days before', // User-facing guidance
     completed: false, // Always starts as false
     details: 'Extended details shown in task panel (optional)',
   }
   ```
3. Task automatically appears in Checklist and Dashboard
4. No other files need modification (uses DEFAULT_TASKS from page.tsx → storage.ts)

### Adding Concierge Responses

1. Edit `app/utils/concierge.ts`
2. Find `CONCIERGE_KNOWLEDGE_BASE` object
3. Add new keyword entry:
   ```typescript
   'roommate conflict': {
     category: 'housing',
     answer: 'If you have concerns about your roommate...',
     suggestedTasks: ['Meet Your Roommate', 'Discuss Room Setup'],
   }
   ```
4. When user asks about "roommate", component searches KB and returns answer
5. Keywords are case-insensitive substring matches

### Adding a Budget Category

1. Edit `app/data/seed.ts`, `DEFAULT_BUDGET.categories` array
2. Add object with unique `id`, `name`, `planned: 0`, `actual: 0`
3. Budget component automatically renders new category
4. No component code changes needed

### Adding a Document Type

1. Edit `app/data/seed.ts`, `DEFAULT_DOCUMENTS` array
2. Add `{ id: 'unique-id', name: 'Doc Name', isReady: false }`
3. Documents component automatically includes it in checklist

### Adding a New Feature Section

1. Create `app/components/NewFeature.tsx` with React component
2. Add type to `Section` union in `page.tsx`:
   ```typescript
   type Section = 'dashboard' | ... | 'newfeature';
   ```
3. Add to `NAV_ITEMS` array in `page.tsx`:
   ```typescript
   { id: 'newfeature', label: 'Feature Name', icon: '✨' }
   ```
4. Add case in `renderSection()` switch statement in `page.tsx`
5. If needs state updates, add callbacks in `page.tsx` and pass as props

## Design & UI Conventions

### Color Scheme (Tailwind)
- **Navy** (`bg-navy`) — Primary header, buttons, active states
- **Blue** — Links, secondary actions
- **Red** — Destructive actions (reset, delete)
- **Green** — Success, completed tasks
- **Gray** — Borders, disabled states, background
- **Custom**: `tailwind.config.js` extends defaults (navy = #001f3f)

### Icons
- Using **Unicode emoji** (no icon library)
- Dashboard 📊, Checklist ✓, Timeline 📅, Budget 💰, Documents 📄, Concierge 🎓, Profile 👤, Settings ⚙️
- Easy to swap or add new ones in `NAV_ITEMS`

### Responsive Design
- **Mobile-first**: Start with mobile styles, add `md:` breakpoints
- **Sidebar**: Hidden on mobile, revealed with hamburger menu
- **Bottom nav**: Mobile-exclusive navigation bar (sticks to bottom)
- **Tailwind breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### Layout Patterns
- **Sticky header** — `sticky top-0 z-50` with shadow
- **Sidebar + main**: `flex flex-col md:flex-row` with sidebar width `w-64` on desktop
- **Max width container**: `max-w-6xl` for main content
- **Padding**: `px-4 py-4` mobile, `p-8` desktop

## Testing & Verification

### Manual Testing Checklist
- [ ] App loads without errors
- [ ] All 8 navigation items switch sections correctly
- [ ] Parent/Student role toggle works, changes visible content
- [ ] Task checkboxes toggle completion status
- [ ] Progress bars update after task completion
- [ ] Data persists after page refresh
- [ ] Profile form saves changes
- [ ] Budget values calculate totals correctly
- [ ] Reminders can be added and removed
- [ ] Concierge responds to input
- [ ] Sample data loads completely
- [ ] Data export downloads JSON file
- [ ] Settings reset clears all data
- [ ] Mobile layout is usable (hamburger menu, bottom nav)
- [ ] No TypeScript errors
- [ ] No console errors

### Run Tests
```bash
npm test
```
(Project has Jest/React Testing Library setup but minimal coverage currently)

### Type Checking
```bash
# Next.js includes TypeScript checking in build/dev
npm run dev
npm run build
```

## Deployment

### Vercel (Recommended)
```bash
git push origin claude/claude-md-docs-if24f6
# Visit https://vercel.com/new
# Import repo, configure, deploy
# App runs at your-project.vercel.app
```

**No environment variables needed** — prototype uses browser localStorage only.

### Self-Hosted
```bash
npm run build
npm run start
# Runs on http://localhost:3000 (or PORT env var)
```

## Common Patterns & Best Practices

### State Management Philosophy
- **Single source of truth**: `AppState` in `page.tsx`
- **Immutable updates**: `useState` with object spreading
- **Derived state**: Don't store computed values (e.g., completion %, category totals)
  - Calculate on render: `state.tasks.filter(t => t.completed).length`
- **No global state library** (no Redux, Zustand) — callbacks work fine at this scale
- **Future**: Easy to migrate to Zustand or Supabase by updating `storage.ts` and callbacks

### Component Best Practices
- **Props-based**: Only pass what's needed
- **Callback props**: Keep components stateless for data
- **TypeScript strict mode**: All types explicit, no `any`
- **No side effects outside useEffect**: All async/localStorage in utility functions
- **Accessibility**: Use semantic HTML, alt text, ARIA labels where applicable

### File Naming
- **Components**: PascalCase, one per file (`Dashboard.tsx`)
- **Utilities**: camelCase (`storage.ts`, `concierge.ts`)
- **Data files**: camelCase (`seed.ts`)
- **Types**: One file `types.ts` (central)

### Tailwind CSS Usage
- **Preferred**: Use Tailwind classes, minimal custom CSS
- **Custom colors**: Extend `tailwind.config.js` if needed
- **CSS file**: `app/globals.css` only for global resets/base styles
- **Responsive**: Use `md:`, `lg:` prefixes for breakpoints
- **Spacing**: Use consistent Tailwind scales (not arbitrary values)

### Error Handling
- **localStorage**: Wrapped in try/catch in `storage.ts`
- **JSON parsing**: Fallback to initial state if corrupt
- **Server-side**: Check `typeof window` to avoid errors in SSR
- **User input**: Basic validation in component forms (not strict — prototype)

## Git Workflow

### Branches
- **Main branch**: Not used in current setup
- **Feature branch**: `claude/claude-md-docs-if24f6` (designated development branch)
- **All work**: Commit and push to designated branch only

### Commit Messages
```bash
# Format: descriptive present-tense
git commit -m "Add roommate conflict resolution to concierge KB"
git commit -m "Fix timeline reminder date formatting"
git commit -m "Update budget category layout for mobile"
git commit -m "Refactor storage.ts to improve error handling"
```

### Push
```bash
git push -u origin claude/claude-md-docs-if24f6
```

## Troubleshooting

### App Won't Load
- Check browser console for errors (F12)
- Verify localStorage not full: `localStorage.clear()` (clears all browser data)
- Check TypeScript errors: `npm run build` should list them

### Data Not Persisting
- Verify localStorage is enabled in browser
- Check that `saveState()` is called after state changes (it is, in all handlers)
- Try Settings → Reset Data, then reload

### Type Errors
- All types centralized in `types.ts` — update there
- Re-run `npm run dev` for TypeScript server to recheck
- Check component props match interface definitions

### Mobile Layout Issues
- Verify breakpoints use `md:` for 768px+
- Test with DevTools (F12 → mobile view)
- Check navbar sticky/bottom nav z-index not overlapping

## Future Enhancements

### Likely Next Steps (Planned)
1. **Backend Integration** — Replace localStorage with Supabase database
2. **Real Authentication** — Add student/parent login (Supabase Auth)
3. **Dynamic Concierge** — Call OpenAI/Anthropic API instead of curated KB
4. **Email Reminders** — SendGrid integration for timeline alerts
5. **Google Calendar** — Sync reminders to user calendar
6. **Stripe Payments** — Premium features (affiliate recommendations, priority support)
7. **Mobile Apps** — React Native iOS/Android versions

### Architecture for Backend
- Create `app/api/` directory with route handlers
- Update `utils/storage.ts` to call API instead of localStorage
- Add environment variables for API keys
- Update components — no UI changes needed (same state/props pattern)

### Scaling Considerations
- Current design supports 100-200 tasks/reminders without performance issues
- Beyond that: paginate task list, virtualize long lists
- Add search/filter to Checklist for quick access

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check code style
npm test             # Run Jest tests

# Git
git status           # Check current state
git log --oneline    # See commit history
git commit -m "..."  # Create commit
git push -u origin claude/claude-md-docs-if24f6  # Push to designated branch

# TypeScript
# Built into npm run dev/build, no separate command

# Data
# Export: Settings → "Export Progress" button (downloads JSON)
# Reset: Settings → "Reset All Data" button
# Sample: Settings → "Load Sample Data" button
```

## Emergency Contacts (For Future)

When major refactors are needed:
- **State shape changes**: Update `types.ts` + `storage.ts` + `page.tsx`
- **New section**: Add to `types.ts`, `page.tsx`, `components/`
- **Database migration**: Plan carefully, consider migration script in localStorage

## Documentation Updates

This file (`CLAUDE.md`) should be updated when:
- ✓ New major features added
- ✓ Directory structure changes
- ✓ Key patterns are established
- ✓ Complex workflows are introduced

Last updated: 2026-07-13
