import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_CONFIG = {
  name: 'Circlely',
  tagline: 'Find Your People. Build Your Circle.',
  description: 'Discover welcoming communities, meet people who share your interests, and take part in meaningful activities — all in one safe space.',
  stats: {
    membersCount: '10K+',
    communitiesCount: '120+',
    activitiesCount: '500+',
    citiesCount: '50+',
  },
  supportEmail: 'support@circlely.app',
};

export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(dateInput: Date | string): string {
  const date = new Date(dateInput);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
