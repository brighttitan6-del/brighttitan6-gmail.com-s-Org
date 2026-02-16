
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
  balance?: number;
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
  category?: 'Sciences' | 'Humanities' | 'Languages' | 'Vocational';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subjectId: string;
  grade: string;
  coverUrl: string;
  pdfUrl: string;
  pages: number;
  isPaid: boolean;
}

export interface Video {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number; // seconds
  isPaid: boolean;
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

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: 'subscription' | 'live_class' | 'withdrawal' | string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  detail: string;
}
