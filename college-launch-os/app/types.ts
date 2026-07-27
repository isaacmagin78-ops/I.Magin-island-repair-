export type UserRole = 'parent' | 'student';

export type TaskCategory =
  // Admissions-focused
  | 'academics'
  | 'college-list'
  | 'applications'
  | 'essays'
  | 'finances'
  | 'scholarships'
  | 'documents'
  // Enrollment & logistics
  | 'housing'
  | 'enrollment'
  | 'medical'
  | 'safety'
  | 'technology'
  | 'packing'
  | 'travel'
  | 'food'
  | 'laundry';

export type TaskOwner = 'parent' | 'student' | 'shared';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'not-started' | 'in-progress' | 'waiting' | 'complete' | 'overdue';
export type HousingType = 'dorm' | 'apartment' | 'house' | 'greek-life' | 'unknown';

/** Preparation phases used by the timeline and "You are here". */
export type PhaseId =
  | 'freshman'
  | 'sophomore'
  | 'junior'
  | 'senior'
  | 'applications'
  | 'decisions'
  | 'enrollment';

export interface FamilyProfile {
  id: string;
  studentName: string;
  parentName: string;
  collegeName: string;
  housingType: HousingType;
  moveInDate: string;
  studentType: string;
  homeState: string;
  collegeState: string;
  hasRoommate: boolean;
  hasVehicle: boolean;
  hasPrescriptionMedication: boolean;
  /** High-school graduation / college-enrollment year; drives the timeline. */
  graduationYear?: number;
  gradeLevel?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  owner: TaskOwner;
  priority: TaskPriority;
  completionWindow: string;
  completed: boolean;
  details?: string;
  dueDate?: string;
  /** Explicit workflow status. `completed` remains the source of truth for done-ness. */
  status?: TaskStatus;
  estimatedMinutes?: number;
  phase?: PhaseId;
  notes?: string;
}

export interface Reminder {
  id: string;
  title: string;
  date: string;
  assignedTo: TaskOwner;
  notes: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  actual: number;
}

export interface BudgetData {
  categories: BudgetCategory[];
}

export interface DocumentItem {
  id: string;
  name: string;
  isReady: boolean;
  notes?: string;
}

export type CollegeTier = 'reach' | 'target' | 'safety';
export type ApplicationStatus =
  | 'not-started'
  | 'in-progress'
  | 'submitted'
  | 'accepted'
  | 'waitlisted'
  | 'denied';

export interface CollegeListItem {
  id: string;
  name: string;
  location: string;
  tier: CollegeTier;
  deadline?: string;
  applicationStatus: ApplicationStatus;
  favorite?: boolean;
  notes?: string;
}

export type EssayStatus = 'not-started' | 'in-progress' | 'draft' | 'revising' | 'complete';

export interface Essay {
  id: string;
  title: string;
  type: string;
  college?: string;
  status: EssayStatus;
  wordLimit?: number;
  dueDate?: string;
  notes?: string;
}

export type ScholarshipStatus = 'researching' | 'applying' | 'submitted' | 'awarded' | 'not-awarded';

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline?: string;
  status: ScholarshipStatus;
  notes?: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AppState {
  profile: FamilyProfile;
  tasks: Task[];
  reminders: Reminder[];
  budget: BudgetData;
  documents: DocumentItem[];
  collegeList: CollegeListItem[];
  essays: Essay[];
  scholarships: Scholarship[];
  activity: ActivityItem[];
  currentRole: UserRole;
}

export interface ConciergeMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  /** Optional clickable follow-up suggestions attached to an assistant message. */
  suggestions?: string[];
}
