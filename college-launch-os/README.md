# College Launch OS

A guided family launch system that helps parents and first-time college students prepare for the college transition without forgetting important responsibilities.

## Features

- **Interactive Checklist**: 50+ realistic preparation tasks across 11 categories
- **Parent & Student Modes**: Role-based views with different perspectives and responsibilities
- **Dashboard**: Real-time progress tracking with move-in countdown
- **Timeline**: 7-phase preparation calendar (90 days → Move-in day → First week)
- **Budget Planner**: Track planned vs. actual expenses across 10 categories
- **Document Tracker**: Monitor readiness of 12+ essential documents
- **Reminders**: Create custom reminders assigned to parent, student, or both
- **College Concierge**: AI-like chatbot with curated answers to common college prep questions
- **Profile Personalization**: Customize family info, college details, and circumstances
- **Data Export**: Download progress as JSON for backup
- **Sample Data**: Load a pre-populated example to explore features

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app opens at http://localhost:3000

### Production Build

```bash
npm run build
npm run start
```

The app runs at http://localhost:3000 (or your configured port)

## Project Structure

```
app/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── Checklist.tsx
│   ├── Timeline.tsx
│   ├── Budget.tsx
│   ├── Documents.tsx
│   ├── Concierge.tsx
│   ├── Personalize.tsx
│   ├── Settings.tsx
│   ├── RoleToggle.tsx
│   └── CategoryProgress.tsx
├── data/
│   └── seed.ts         # Initial data & sample family
├── utils/
│   ├── storage.ts      # LocalStorage management
│   └── concierge.ts    # Knowledge base for concierge
├── types.ts            # TypeScript interfaces
├── page.tsx            # Main app component
├── layout.tsx          # HTML layout
└── globals.css         # Tailwind styles
```

## Key Components

### Dashboard
- Family profile display (Student, Parent, College, Move-in date)
- Overall progress percentage
- Category-by-category breakdown
- Top 3 priority unfinished tasks
- Quick access to Concierge

### Checklist
- 50+ tasks across 11 categories
- Filter by category and priority
- Task details panel with expandable information
- Instant progress updates
- Persistent completion state

### Timeline
- 7 phases: 90 days → Move-in → First week
- Recommended actions for each phase
- Custom reminder creation and management
- Days-until-move-in countdown

### Budget
- 10 expense categories (Bedding, Tech, Travel, etc.)
- Planned vs. actual tracking
- Real-time total and remaining calculations
- Visual budget utilization meter

### Documents
- 12 document categories
- Readiness status tracking
- Privacy notice (docs not actually encrypted in prototype)
- Gathering timeline guidance

### Concierge
- Chat interface with 50+ curated responses
- Covers topics: Housing, Medical, Documents, Finances, Safety, Technology, Food, Laundry, Travel, Academics
- Fallback responses for uncovered topics
- Suggested question quick-links

### Personalize
- Family profile form
- College and location info
- Special circumstances (roommate, vehicle, prescriptions)
- Local storage persistence

### Settings
- Export progress to JSON
- Load sample family data
- Reset all data
- Data summary display
- Privacy & security information

## Data Management

All data is stored in browser localStorage:

- **Profile**: Family information, college details
- **Tasks**: Completion status, all 50+ tasks
- **Reminders**: Custom reminders and assignments
- **Budget**: Planned and actual expenses
- **Documents**: Document readiness checklist
- **Role**: Current selected role (Parent/Student)

Data persists across browser sessions until cleared.

## Sample Family

Load with "Load Sample Data" button in Settings:

- Student: Taylor Morgan
- Parent: Sarah Morgan
- College: University of Florida
- Housing: Dorm
- Roommate: Yes
- Vehicle: No
- Medication: Yes

Sample includes pre-populated data across all features.

## Technology Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Icons**: Unicode emoji
- **Responsiveness**: Mobile-first design with breakpoints

## Browser Support

Works on modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Fully responsive on:
- Desktop (1920px+, 1366px, 1024px)
- Tablet (768px)
- Mobile (375px and up)

## Testing Coverage

The following interactions have been manually tested:

✓ Application loads without errors
✓ All navigation buttons work
✓ Parent / Student mode switch toggles correctly
✓ Role changes update visible content
✓ Task checkboxes toggle completion
✓ Task completion updates progress bars
✓ Progress persists after page refresh
✓ Profile information can be edited and saved
✓ Budget values update totals in real-time
✓ Reminders can be added and removed
✓ Concierge accepts input and returns responses
✓ Sample data loads and populates all sections
✓ Data export creates downloadable JSON
✓ Mobile layout displays correctly
✓ No console errors
✓ Production build succeeds

## Known Limitations

This is a prototype version. Future enhancements include:

- Real Supabase authentication and cloud database
- Stripe payment integration for premium features
- Real OpenAI/Anthropic API for dynamic concierge
- Email reminders before key dates
- Google Calendar integration
- Affiliate product recommendations
- Secure encrypted document uploads
- Family account sharing and synchronization
- Mobile app (iOS/Android)

## Deployment to Vercel

1. Ensure code is committed and pushed to GitHub
2. Visit https://vercel.com/new
3. Import the repository
4. Configure project settings (defaults work fine for prototype)
5. Deploy

No environment variables needed for prototype version.

## Development Notes

### Adding New Tasks

Edit `app/data/seed.ts` and add to `DEFAULT_TASKS` array:

```typescript
{
  id: 'unique-id',
  title: 'Task Title',
  description: 'Brief description',
  category: 'housing',
  owner: 'parent',
  priority: 'high',
  completionWindow: '30 days before',
  completed: false,
  details: 'Optional detailed info',
}
```

### Adding Concierge Responses

Edit `app/utils/concierge.ts` and add to `CONCIERGE_KNOWLEDGE_BASE`:

```typescript
'keyword': {
  category: 'category-name',
  answer: 'Response text...',
  suggestedTasks: ['Task 1', 'Task 2'],
}
```

### Customizing Theme

Edit `tailwind.config.js` for brand colors:

```javascript
colors: {
  navy: '#001f3f',
  'brand-blue': '#0066cc',
  'brand-warm': '#ff6b35',
}
```

## Architecture

The app is built for extensibility:

- **Clean component structure**: Easy to add new pages/features
- **Type-safe**: Full TypeScript for fewer runtime errors
- **Decoupled state**: Simple state management pattern for future migration to Redux/Zustand
- **Utility functions**: Reusable logic in `utils/` folder
- **Tailwind styling**: Consistent design system without custom CSS

### Future: Backend Integration

The app is structured to easily connect to:

- **Supabase**: Replace localStorage with cloud database
- **OpenAI/Anthropic**: Replace curated responses with real AI
- **Stripe**: Add payment processing
- **SendGrid**: Add email reminders

No backend code changes needed to current frontend.

## Privacy

**Current (Prototype)**:
- All data stored locally in browser
- No remote data storage
- No analytics or tracking

**Future (Production)**:
- Encrypted data transmission
- Secure server storage
- Privacy policy compliance
- Optional FERPA compliance for educational data

## License

Proprietary - See LICENSE file

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 
