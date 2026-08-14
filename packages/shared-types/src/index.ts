// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interview related types
export interface InterviewSession {
  id: string;
  userId: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: InterviewQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewQuestion {
  id: string;
  content: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserResponse {
  questionId: string;
  content: string;
  duration: number; // in seconds
  timestamp: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}
