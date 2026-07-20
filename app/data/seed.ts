import {
  Task,
  FamilyProfile,
  DocumentItem,
  BudgetData,
  CollegeListItem,
  Essay,
  Scholarship,
  ActivityItem,
} from '../types';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getDefaultMoveInDate(): string {
  const today = new Date();
  const nextAugust = new Date(today.getFullYear(), 7, 21);
  if (today > nextAugust) nextAugust.setFullYear(nextAugust.getFullYear() + 1);
  return nextAugust.toISOString().split('T')[0];
}

const SAMPLE_GRAD_YEAR =
  new Date().getMonth() >= 6 ? new Date().getFullYear() + 1 : new Date().getFullYear();

export const DEFAULT_FAMILY_PROFILE: FamilyProfile = {
  id: 'default',
  studentName: 'Student',
  parentName: 'Parent',
  collegeName: 'Your College',
  housingType: 'dorm',
  moveInDate: getDefaultMoveInDate(),
  studentType: 'First-year',
  homeState: 'FL',
  collegeState: 'FL',
  hasRoommate: false,
  hasVehicle: false,
  hasPrescriptionMedication: false,
  graduationYear: new Date().getFullYear() + 1,
  gradeLevel: 'Rising senior',
};

export const SAMPLE_FAMILY_PROFILE: FamilyProfile = {
  id: 'sample',
  studentName: 'Jordan Carter',
  parentName: 'Alex Carter',
  collegeName: 'University of Florida (target)',
  housingType: 'dorm',
  moveInDate: `${SAMPLE_GRAD_YEAR}-08-21`,
  studentType: 'First-year',
  homeState: 'FL',
  collegeState: 'FL',
  hasRoommate: false,
  hasVehicle: false,
  hasPrescriptionMedication: true,
  graduationYear: SAMPLE_GRAD_YEAR,
  gradeLevel: 'Rising senior',
};

export const SAMPLE_TASKS: Task[] = [
  { id: 'ac1', title: 'Finalize senior-year course schedule', description: 'Lock in a rigorous but balanced senior schedule with your counselor.', category: 'academics', owner: 'student', priority: 'high', phase: 'senior', completionWindow: 'Start of senior year', estimatedMinutes: 30, completed: true, status: 'complete', details: 'Colleges look closely at senior-year rigor.' },
  { id: 'ac2', title: 'Register for the October SAT / ACT', description: 'Reserve a seat for a final test attempt to improve your score.', category: 'academics', owner: 'student', priority: 'high', phase: 'senior', completionWindow: 'Early fall', estimatedMinutes: 20, dueDate: daysFromNow(9), completed: false, status: 'in-progress' },
  { id: 'ac3', title: 'Request official transcript from counselor', description: 'Ask your counselor to send transcripts to your application platform.', category: 'academics', owner: 'student', priority: 'medium', phase: 'applications', completionWindow: 'Before first deadline', estimatedMinutes: 15, dueDate: daysFromNow(21), completed: false, status: 'not-started' },
  { id: 'cl1', title: 'Finalize balanced college list', description: 'Confirm a mix of reach, target, and safety schools.', category: 'college-list', owner: 'student', priority: 'high', phase: 'senior', completionWindow: 'Early senior year', estimatedMinutes: 60, completed: true, status: 'complete', details: 'Aim for 2 reach, 2-3 target, and 2 safety schools.' },
  { id: 'cl2', title: 'Compare in-state vs. out-of-state costs', description: 'Estimate net price at each school using their cost calculators.', category: 'college-list', owner: 'parent', priority: 'medium', phase: 'senior', completionWindow: 'Before applying', estimatedMinutes: 40, completed: false, status: 'in-progress' },
  { id: 'app1', title: 'Create Common App account', description: 'Set up your application platform and start the profile section.', category: 'applications', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Early fall', estimatedMinutes: 30, completed: true, status: 'complete' },
  { id: 'app2', title: 'Complete the activities & honors section', description: 'Add extracurriculars, leadership, and awards with strong descriptions.', category: 'applications', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Fall', estimatedMinutes: 90, dueDate: daysFromNow(12), completed: false, status: 'in-progress' },
  { id: 'app3', title: 'Submit first early-action application', description: 'Finish and submit your top early-action school.', category: 'applications', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Nov 1', estimatedMinutes: 60, dueDate: daysFromNow(24), completed: false, status: 'not-started' },
  { id: 'es1', title: 'Finalize personal statement', description: 'Complete the final revision of your main Common App essay.', category: 'essays', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Before first deadline', estimatedMinutes: 120, dueDate: daysFromNow(7), completed: false, status: 'in-progress' },
  { id: 'es2', title: 'Draft UF supplemental essay', description: 'Write a first draft of the school-specific supplemental.', category: 'essays', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Fall', estimatedMinutes: 90, dueDate: daysFromNow(15), completed: false, status: 'in-progress' },
  { id: 'fa1', title: 'Complete the FAFSA preparation worksheet', description: 'Gather tax and income information before starting the FAFSA.', category: 'finances', owner: 'parent', priority: 'high', phase: 'applications', completionWindow: 'October', estimatedMinutes: 20, dueDate: daysFromNow(6), completed: false, status: 'in-progress' },
  { id: 'fa2', title: 'Create FSA ID for parent and student', description: 'Both need a Federal Student Aid ID to sign the FAFSA.', category: 'finances', owner: 'shared', priority: 'high', phase: 'applications', completionWindow: 'Before FAFSA', estimatedMinutes: 25, completed: true, status: 'complete' },
  { id: 'fa3', title: 'Submit the FAFSA', description: 'File the Free Application for Federal Student Aid.', category: 'finances', owner: 'parent', priority: 'high', phase: 'applications', completionWindow: 'As early as possible', estimatedMinutes: 60, dueDate: daysFromNow(20), completed: false, status: 'not-started' },
  { id: 'sc1', title: 'Apply to the state merit scholarship', description: 'Submit your application for the state-funded merit award.', category: 'scholarships', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Fall', estimatedMinutes: 45, dueDate: daysFromNow(3), completed: false, status: 'in-progress' },
  { id: 'sc3', title: 'Request a scholarship recommendation letter', description: 'Ask a mentor or teacher for a scholarship-specific reference.', category: 'scholarships', owner: 'student', priority: 'medium', phase: 'applications', completionWindow: 'Fall', estimatedMinutes: 15, dueDate: daysFromNow(-2), completed: false, status: 'overdue', details: 'This is past its target date — follow up today.' },
  { id: 'doc1', title: 'Request two teacher recommendation letters', description: 'Ask teachers early and share your resume and deadlines.', category: 'documents', owner: 'student', priority: 'high', phase: 'applications', completionWindow: 'Early fall', estimatedMinutes: 20, dueDate: daysFromNow(-4), completed: false, status: 'overdue', details: 'Recommenders need lead time — follow up right away.' },
  { id: 'ho2', title: 'Complete the housing application', description: 'Apply for on-campus housing and select preferences.', category: 'housing', owner: 'student', priority: 'high', phase: 'enrollment', completionWindow: '90 days before', estimatedMinutes: 30, completed: false, status: 'not-started' },
  { id: 'ho3', title: 'Purchase Twin XL bedding', description: 'Most dorms use Twin XL mattresses — buy sheets and a mattress pad.', category: 'housing', owner: 'parent', priority: 'medium', phase: 'enrollment', completionWindow: '30 days before', estimatedMinutes: 45, completed: false, status: 'not-started' },
  { id: 'en1', title: 'Register for new-student orientation', description: 'Sign up for orientation and pre-enrollment advising.', category: 'enrollment', owner: 'student', priority: 'medium', phase: 'enrollment', completionWindow: 'Summer', estimatedMinutes: 20, completed: false, status: 'not-started' },
  { id: 'en4', title: 'Schedule physical exam & refill prescriptions', description: 'Complete a checkup and stock needed medication before move-in.', category: 'medical', owner: 'parent', priority: 'medium', phase: 'enrollment', completionWindow: '60 days before', estimatedMinutes: 60, completed: false, status: 'not-started' },
];

export const DEFAULT_TASKS: Task[] = SAMPLE_TASKS.map((t) => ({
  ...t,
  completed: false,
  status: 'not-started',
}));

export const SAMPLE_COLLEGE_LIST: CollegeListItem[] = [
  { id: 'col1', name: 'University of Florida', location: 'Gainesville, FL', tier: 'target', applicationStatus: 'in-progress', deadline: daysFromNow(24), favorite: true, notes: 'Top choice — great value in-state.' },
  { id: 'col2', name: 'Georgia Tech', location: 'Atlanta, GA', tier: 'reach', applicationStatus: 'not-started', deadline: daysFromNow(45) },
  { id: 'col3', name: 'University of Michigan', location: 'Ann Arbor, MI', tier: 'reach', applicationStatus: 'not-started', deadline: daysFromNow(52) },
  { id: 'col4', name: 'Florida State University', location: 'Tallahassee, FL', tier: 'target', applicationStatus: 'submitted', deadline: daysFromNow(-3) },
  { id: 'col5', name: 'University of South Florida', location: 'Tampa, FL', tier: 'safety', applicationStatus: 'submitted', deadline: daysFromNow(-8) },
  { id: 'col6', name: 'UCF', location: 'Orlando, FL', tier: 'safety', applicationStatus: 'in-progress', deadline: daysFromNow(30) },
];

export const SAMPLE_ESSAYS: Essay[] = [
  { id: 'e1', title: 'Common App Personal Statement', type: 'Personal statement', status: 'revising', wordLimit: 650, dueDate: daysFromNow(7), notes: 'Second draft done, tightening the ending.' },
  { id: 'e2', title: 'UF — Why Us', type: 'Supplemental', college: 'University of Florida', status: 'in-progress', wordLimit: 250, dueDate: daysFromNow(15) },
  { id: 'e3', title: 'Georgia Tech — Why this major', type: 'Supplemental', college: 'Georgia Tech', status: 'not-started', wordLimit: 300, dueDate: daysFromNow(45) },
  { id: 'e5', title: 'Reusable scholarship essay', type: 'Scholarship', status: 'draft', wordLimit: 500 },
];

export const SAMPLE_SCHOLARSHIPS: Scholarship[] = [
  { id: 's1', name: 'State Merit Scholarship', amount: 6000, status: 'applying', deadline: daysFromNow(3) },
  { id: 's2', name: 'Local Rotary Club Award', amount: 2500, status: 'researching', deadline: daysFromNow(28) },
  { id: 's3', name: 'STEM Leaders Scholarship', amount: 5000, status: 'submitted', deadline: daysFromNow(-5) },
  { id: 's5', name: 'Community Service Award', amount: 1500, status: 'awarded' },
];

export const DEFAULT_DOCUMENTS: DocumentItem[] = [
  { id: 'd1', name: 'Official high school transcript', isReady: false },
  { id: 'd2', name: 'SAT / ACT score report', isReady: false },
  { id: 'd3', name: 'Teacher recommendation letter #1', isReady: false },
  { id: 'd4', name: 'Teacher recommendation letter #2', isReady: false },
  { id: 'd5', name: 'Counselor recommendation', isReady: false },
  { id: 'd6', name: 'Activities / resume list', isReady: false },
  { id: 'd7', name: 'FAFSA confirmation', isReady: false },
  { id: 'd8', name: 'Tax returns (for financial aid)', isReady: false },
  { id: 'd9', name: 'Government ID', isReady: false },
  { id: 'd10', name: 'Immunization records', isReady: false },
  { id: 'd11', name: 'Health insurance card', isReady: false },
  { id: 'd12', name: 'Emergency contacts list', isReady: false },
];

export const DEFAULT_BUDGET: BudgetData = {
  categories: [
    { id: 'b1', name: 'Application Fees', planned: 500, actual: 0 },
    { id: 'b2', name: 'Testing & AP Exams', planned: 300, actual: 0 },
    { id: 'b3', name: 'Tuition & Fees (est.)', planned: 6500, actual: 0 },
    { id: 'b4', name: 'Housing & Meal Plan', planned: 11000, actual: 0 },
    { id: 'b5', name: 'Books & Supplies', planned: 1000, actual: 0 },
    { id: 'b6', name: 'Technology (laptop, etc.)', planned: 1200, actual: 0 },
    { id: 'b7', name: 'Dorm Setup', planned: 600, actual: 0 },
    { id: 'b8', name: 'Travel', planned: 500, actual: 0 },
    { id: 'b9', name: 'Personal & Misc', planned: 800, actual: 0 },
    { id: 'b10', name: 'Emergency Fund', planned: 500, actual: 0 },
  ],
};

export const SAMPLE_BUDGET: BudgetData = {
  categories: DEFAULT_BUDGET.categories.map((c) => {
    const spent: Record<string, number> = { b1: 220, b2: 190, b6: 1150 };
    return { ...c, actual: spent[c.id] ?? 0 };
  }),
};

export const SAMPLE_READY_DOCUMENT_IDS = ['d1', 'd6', 'd9'];

export function buildSampleActivity(): ActivityItem[] {
  const now = Date.now();
  const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString();
  return [
    { id: 'act1', actor: 'Jordan', action: 'completed', target: 'Finalize balanced college list', timestamp: hoursAgo(3) },
    { id: 'act2', actor: 'Alex (parent)', action: 'updated', target: 'the college cost budget', timestamp: hoursAgo(9) },
    { id: 'act3', actor: 'Jordan', action: 'moved', target: 'Personal statement to Revising', timestamp: hoursAgo(26) },
    { id: 'act4', actor: 'Jordan', action: 'submitted', target: 'Florida State University application', timestamp: hoursAgo(50) },
    { id: 'act5', actor: 'Alex (parent)', action: 'completed', target: 'Create FSA ID', timestamp: hoursAgo(74) },
  ];
}
