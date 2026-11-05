/**
 * Affiliate product data.
 *
 * Links are Amazon SiteStripe ("Obtener enlace") short links with tag
 * jramosg-20 (verified 2026-10-15). Amazon routes each visitor to their
 * own store: a link created on amazon.com resolves to amazon.es from
 * Spain (checked 2026-11-05), so one link per product is enough.
 */

import type { IconName } from './icons';

export interface GearItem {
  key:
    | 'polar-h10'
    | 'coros-pace4'
    | 'garmin-fr265'
    | 'coospo'
    | 'coros'
    | 'garmin-hrm'
    | 'garmin-fr165';
  title: string;
  description: string;
  icon: IconName;
  /** Local product photo; items without one show their icon. */
  cover?: string;
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
    key: 'polar-h10',
    title: 'Polar H10',
    description:
      'Reference chest strap for heart rate accuracy. Bluetooth + ANT+.',
    icon: 'heart-pulse',
    // amazon.es/dp/B07PM54P4N, verified 2026-11-05
    link: 'https://link.amazon/B0iKXSYWG',
  },
  {
    key: 'coros-pace4',
    title: 'COROS PACE 4',
    description:
      'Ultralight GPS watch with AMOLED screen and long battery life.',
    icon: 'watch',
    // amazon.es/dp/B0FYGTCX83, verified 2026-11-05
    link: 'https://link.amazon/B07HNDdLd',
  },
  {
    key: 'garmin-fr265',
    title: 'Garmin Forerunner 265',
    description:
      'AMOLED GPS running watch with training readiness and structured workouts.',
    icon: 'watch',
    // amazon.es/dp/B0BS1T9J4Y, verified 2026-11-05
    link: 'https://link.amazon/B00HeGlMU',
  },
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
