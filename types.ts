
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export enum SubscriptionPlan {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isApproved: boolean;
  isLocked: boolean;
  avatar?: string;
}

export interface Subscription {
  userId: string;
  plan: SubscriptionPlan;
  expiryDate: string;
  isActive: boolean;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  icon: string;
}

export interface Video {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number; // seconds
}

export interface LiveClass {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number; // minutes
  price: number; // MWK
  status: 'scheduled' | 'live' | 'completed';
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
}
