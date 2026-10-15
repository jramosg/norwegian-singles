/**
 * Affiliate product data.
 *
 * Links are generated with Amazon SiteStripe ("Obtener enlace") using
 * jramosg-20 as both the store and tracking ID. Their Amazon.es destinations
 * and tag=jramosg-20 were verified on 2026-10-15.
 */

import type { IconName } from './icons';

export interface GearItem {
  key: 'coospo' | 'coros' | 'garmin-hrm' | 'garmin-fr165';
  title: string;
  description: string;
  icon: IconName;
  cover: string;
  link: string;
}

export interface Book {
  key: 'nsm' | 'bakken';
  title: string;
  author?: string;
  cover?: string;
  link: string;
  kindleLink?: string;
}

export const gear: GearItem[] = [
  {
    key: 'coospo',
    title: 'COOSPO HR Monitor',
    description:
      'Chest strap with Bluetooth + ANT+. Budget-friendly, accurate heart rate data for every session.',
    icon: 'heart-pulse',
    cover: '/coospo-hrm.jpg',
    link: 'https://link.amazon/B00o9vUjk',
  },
  {
    key: 'coros',
    title: 'COROS Heart Rate Monitor',
    description:
      'Advanced optical sensor, 80-day battery, auto-wear detection. Premium arm-band HR monitor.',
    icon: 'heart-pulse',
    cover: '/coros-hrm.jpg',
    link: 'https://link.amazon/B0f3Zd8yq',
  },
  {
    key: 'garmin-hrm',
    title: 'Garmin HRM-200',
    description:
      'Chest strap, water-resistant, washable band, up to 1 year battery. Precise HR for NSM training.',
    icon: 'heart-pulse',
    cover: '/garmin-hrm200.jpg',
    link: 'https://link.amazon/B0acBWizW',
  },
  {
    key: 'garmin-fr165',
    title: 'Garmin Forerunner 165',
    description:
      'Lightweight GPS running watch with AMOLED display, real-time pace, distance and HR data.',
    icon: 'watch',
    cover: '/garmin-fr165.jpg',
    link: 'https://link.amazon/B0dKyKxck',
  },
];

export const books: Book[] = [
  {
    key: 'nsm',
    title: 'Norwegian Singles Method',
    author: 'James Copeland',
    cover: '/book-nsm.jpg',
    link: 'https://link.amazon/B07Btl9Zx',
    kindleLink: 'https://link.amazon/B0ab0wFoF',
  },
  {
    key: 'bakken',
    title: 'The Norwegian Method Applied',
    author: 'Marius Bakken, MD',
    cover: '/book-bakken.jpg',
    link: 'https://link.amazon/B0hEe3cFw',
  },
];
