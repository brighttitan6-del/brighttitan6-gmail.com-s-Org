
import React from 'react';
import { SubscriptionPlan, Subject } from './types';

export const COLORS = {
  primary: '#006D44', // Forest Green (representing Malawi)
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
  { id: 'chi', name: 'Chichewa', description: 'National language and literature', thumbnail: 'https://picsum.photos/400/300?random=1', icon: 'fa-language' },
  { id: 'eng', name: 'English', description: 'Language and grammar mastery', thumbnail: 'https://picsum.photos/400/300?random=2', icon: 'fa-book' },
  { id: 'mat', name: 'Mathematics', description: 'Core algebraic and geometric concepts', thumbnail: 'https://picsum.photos/400/300?random=3', icon: 'fa-calculator' },
  { id: 'bio', name: 'Biology', description: 'Study of living organisms', thumbnail: 'https://picsum.photos/400/300?random=4', icon: 'fa-dna' },
  { id: 'phy', name: 'Physical Science', description: 'Physics and chemistry combined', thumbnail: 'https://picsum.photos/400/300?random=5', icon: 'fa-flask' },
  { id: 'geo', name: 'Geography', description: 'Earth systems and human impact', thumbnail: 'https://picsum.photos/400/300?random=6', icon: 'fa-earth-africa' },
  { id: 'his', name: 'History', description: 'African and world historical events', thumbnail: 'https://picsum.photos/400/300?random=7', icon: 'fa-monument' },
  { id: 'soc', name: 'Social Studies', description: 'Community and civic understanding', thumbnail: 'https://picsum.photos/400/300?random=8', icon: 'fa-people-group' }
];

export const MOCK_VIDEOS = [
  { id: 'v1', subjectId: 'mat', title: 'Quadratic Equations Part 1', description: 'Introduction to factoring methods', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=11', duration: 1200 },
  { id: 'v2', subjectId: 'mat', title: 'Calculus: Differentiation', description: 'Understanding rates of change', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=12', duration: 1500 },
  { id: 'v3', subjectId: 'bio', title: 'The Human Heart', description: 'Detailed anatomy and physiology', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=13', duration: 1800 },
  { id: 'v4', subjectId: 'eng', title: 'Essay Writing Techniques', description: 'Crafting the perfect argumentative essay', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://picsum.photos/400/300?random=14', duration: 900 }
];

export const MOCK_LIVE_CLASSES = [
  { id: 'l1', teacherId: 't1', teacherName: 'Mr. Banda', title: 'Mathematics Revision: MSCE Prep', description: 'Intensive session on past paper analysis.', scheduledAt: new Date(Date.now() + 86400000).toISOString(), duration: 60, price: 500, status: 'scheduled' },
  { id: 'l2', teacherId: 't2', teacherName: 'Mrs. Phiri', title: 'English Literature: The Concubine', description: 'Deep dive into themes and characterization.', scheduledAt: new Date(Date.now() + 3600000).toISOString(), duration: 45, price: 500, status: 'scheduled' }
];
