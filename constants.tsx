
import React from 'react';
import { SubscriptionPlan, Subject, Book, Video, LiveClass } from './types';

export const COLORS = {
  primary: '#006D44', // Forest Green
  secondary: '#C8102E', // Crimson Red
  dark: '#000000',
  light: '#FFFFFF'
};

export const PRICING = {
  [SubscriptionPlan.DAILY]: { price: 2000, duration: '24 Hours' },
  [SubscriptionPlan.WEEKLY]: { price: 15000, duration: '7 Days' },
  [SubscriptionPlan.MONTHLY]: { price: 35000, duration: '30 Days' },
  LIVE_CLASS: 500
};

export const SUBJECTS: Subject[] = [
  { id: 'chi', name: 'Chichewa', description: 'National language and literature', thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400', icon: 'fa-language', category: 'Languages' },
  { id: 'eng', name: 'English', description: 'Language and grammar mastery', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400', icon: 'fa-book', category: 'Languages' },
  { id: 'mat', name: 'Mathematics', description: 'Core algebraic and geometric concepts', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400', icon: 'fa-calculator', category: 'Sciences' },
  { id: 'bio', name: 'Biology', description: 'Study of living organisms', thumbnail: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400', icon: 'fa-dna', category: 'Sciences' },
  { id: 'phy', name: 'Physical Science', description: 'Physics and chemistry combined', thumbnail: 'https://images.unsplash.com/photo-1532187875605-2fe358a71424?auto=format&fit=crop&q=80&w=400', icon: 'fa-flask', category: 'Sciences' },
  { id: 'geo', name: 'Geography', description: 'Earth systems and human impact', thumbnail: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=400', icon: 'fa-earth-africa', category: 'Humanities' },
  { id: 'his', name: 'History', description: 'African and world historical events', thumbnail: 'https://images.unsplash.com/photo-1461360226499-313da5d7b5b6?auto=format&fit=crop&q=80&w=400', icon: 'fa-monument', category: 'Humanities' },
  { id: 'soc', name: 'Social Studies', description: 'Community and civic understanding', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400', icon: 'fa-people-group', category: 'Humanities' }
];

export const MOCK_BOOKS: Book[] = [
  { id: 'b1', title: 'MSCE Mathematics Revision', author: 'Dr. J. Banda', subjectId: 'mat', grade: 'Form 4', coverUrl: 'https://images.unsplash.com/photo-1543003923-38010467c699?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 245, isPaid: true },
  { id: 'b2', title: 'Biology for Malawi Schools', author: 'L. Mbeki', subjectId: 'bio', grade: 'Form 3', coverUrl: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 180, isPaid: true },
  { id: 'b3', title: 'The Concubine Study Guide', author: 'Mrs. Phiri', subjectId: 'eng', grade: 'Form 4', coverUrl: 'https://images.unsplash.com/photo-1474932430478-3a7fb9067bd0?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 95, isPaid: false },
  { id: 'b4', title: 'Geography Map Reading', author: 'K. Gondwe', subjectId: 'geo', grade: 'Form 2', coverUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 120, isPaid: true },
  { id: 'b5', title: 'Physical Science Essentials', author: 'P. Chimwaza', subjectId: 'phy', grade: 'Form 3', coverUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 310, isPaid: false },
  { id: 'b6', title: 'History of Central Africa', author: 'G. Kalua', subjectId: 'his', grade: 'Form 4', coverUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400', pdfUrl: '#', pages: 215, isPaid: true }
];

export const MOCK_VIDEOS: Video[] = [
  { id: 'v1', subjectId: 'mat', title: 'Quadratic Equations Part 1', description: 'Introduction to factoring methods', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=11', duration: 1200, isPaid: true },
  { id: 'v2', subjectId: 'mat', title: 'Calculus: Differentiation', description: 'Understanding rates of change', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=12', duration: 1500, isPaid: true },
  { id: 'v3', subjectId: 'bio', title: 'The Human Heart', description: 'Detailed anatomy and physiology', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=13', duration: 1800, isPaid: true },
  { id: 'v4', subjectId: 'eng', title: 'Essay Writing Techniques', description: 'Crafting the perfect argumentative essay', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=14', duration: 900, isPaid: false }
];

// Added missing MOCK_LIVE_CLASSES to resolve import errors in App.tsx, LiveClassesView.tsx,
// TeacherDashboard.tsx, and LiveClassRoom.tsx.
export const MOCK_LIVE_CLASSES: LiveClass[] = [
  { 
    id: 'lc1', 
    teacherId: 't1', 
    teacherName: 'Mr. Banda', 
    title: 'Mathematics: Quadratic Equations', 
    description: 'A deep dive into solving complex quadratic equations.', 
    scheduledAt: new Date(Date.now() + 86400000).toISOString(), 
    duration: 60, 
    price: 500, 
    status: 'scheduled' 
  },
  { 
    id: 'lc2', 
    teacherId: 't2', 
    teacherName: 'Mrs. Phiri', 
    title: 'English: Essay Structure', 
    description: 'Learn how to structure your MSCE essays for maximum marks.', 
    scheduledAt: new Date(Date.now() + 172800000).toISOString(), 
    duration: 45, 
    price: 500, 
    status: 'scheduled' 
  },
  { 
    id: 'lc3', 
    teacherId: 't1', 
    teacherName: 'Mr. Banda', 
    title: 'Physical Science: Waves', 
    description: 'Understanding wave motion and properties.', 
    scheduledAt: new Date(Date.now() + 259200000).toISOString(), 
    duration: 90, 
    price: 500, 
    status: 'scheduled' 
  }
];
