export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  xp: number;
  coins: number;
  streak: number;
  lastActive: string;
  createdAt: string;
}

export interface StudyMaterial {
  id: string;
  userId: string;
  title: string;
  type: 'note' | 'pdf' | 'image' | 'generated';
  content: string;
  fileUrl?: string;
  tags: string[];
  createdAt: string;
}

export interface PlannerTask {
  id: string;
  userId: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Exam {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  type: 'mcq' | 'coding' | 'theory' | 'mixed';
  questions: ExamQuestion[];
  settings: ExamSettings;
  createdAt: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'coding' | 'theory' | 'fill-blanks' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface ExamSettings {
  durationMinutes: number;
  negativeMarking: boolean;
  randomizeQuestions: boolean;
  passingScore: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
