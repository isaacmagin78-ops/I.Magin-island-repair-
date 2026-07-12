export type UserRole = 'parent' | 'student';
export type TaskCategory = 'housing' | 'medical' | 'documents' | 'finances' | 'safety' | 'technology' | 'packing' | 'travel' | 'food' | 'laundry' | 'academics';
export type TaskOwner = 'parent' | 'student' | 'shared';
export type TaskPriority = 'high' | 'medium' | 'low';
export type HousingType = 'dorm' | 'apartment' | 'house' | 'greek-life' | 'unknown';

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

export interface AppState {
  profile: FamilyProfile;
  tasks: Task[];
  reminders: Reminder[];
  budget: BudgetData;
  documents: DocumentItem[];
  currentRole: UserRole;
}

export interface ConciergeMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}
