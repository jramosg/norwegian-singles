/**
 * Affiliate product data.
 *
 * All links use Global Earning (OneLink): a single link per product
 * automatically redirects visitors to their local Amazon marketplace.
 * No per-marketplace URL building needed.
 */

import type { IconName } from './icons';

export interface GearItem {
  key: string;
  title: string;
  description: string;
  icon: IconName;
  cover: string;
  link: string;
}

export interface Book {
  key: string;
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
    link: 'https://amzn.to/3UDL4fS',
  },
  {
    key: 'coros',
    title: 'COROS Heart Rate Monitor',
    description:
      'Advanced optical sensor, 80-day battery, auto-wear detection. Premium arm-band HR monitor.',
    icon: 'heart-pulse',
    cover: '/coros-hrm.jpg',
    link: 'https://link.amazon/B036D10OK',
  },
  {
    key: 'garmin-hrm',
    title: 'Garmin HRM-200',
    description:
      'Chest strap, water-resistant, washable band, up to 1 year battery. Precise HR for NSM training.',
    icon: 'heart-pulse',
    cover: '/garmin-hrm200.jpg',
    link: 'https://link.amazon/B0aozWFa9',
  },
  {
    key: 'garmin-fr165',
    title: 'Garmin Forerunner 165',
    description:
      'Lightweight GPS running watch with AMOLED display, real-time pace, distance and HR data.',
    icon: 'watch',
    cover: '/garmin-fr165.jpg',
    link: 'https://amzn.to/4xK02PE',
  },
];

export const books: Book[] = [
  {
    key: 'nsm',
    title: 'Norwegian Singles Method',
    author: 'James Copeland',
    cover: '/book-nsm.jpg',
    link: 'https://amzn.to/4gjb7jW',
    kindleLink: 'https://amzn.to/4gpXvU6',
  },
  {
    key: 'bakken',
    title: 'The Norwegian Method Applied',
    author: 'Marius Bakken, MD',
    cover: '/book-bakken.jpg',
    link: 'https://amzn.to/4giIPFY',
  },
];
