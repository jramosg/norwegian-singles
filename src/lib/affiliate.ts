/**
 * Affiliate product data.
 *
 * `link` is the default: an Amazon SiteStripe short link to Amazon.es with
 * tag jramosg-20 (verified 2026-10-15). Visitors from other countries are
 * sent to their own Amazon store instead, but only for stores listed in
 * AMAZON_TAGS (see lib/amazon-store.ts). `asin` is the Amazon.es product
 * the short link resolves to; `search` finds the same product in stores
 * whose catalogue may use a different ASIN.
 */

import type { IconName } from './icons';

export interface GearItem {
  key: 'coospo' | 'coros' | 'garmin-hrm' | 'garmin-fr165';
  title: string;
  description: string;
  icon: IconName;
  cover: string;
  link: string;
  asin: string;
  search: string;
}

export interface Book {
  key: 'nsm' | 'bakken';
  title: string;
  author?: string;
  cover?: string;
  link: string;
  kindleLink?: string;
  asin: string;
  search: string;
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
    asin: 'B0C6KD4Q7L',
    search: 'COOSPO heart rate monitor chest strap',
  },
  {
    key: 'coros',
    title: 'COROS Heart Rate Monitor',
    description:
      'Advanced optical sensor, 80-day battery, auto-wear detection. Premium arm-band HR monitor.',
    icon: 'heart-pulse',
    cover: '/coros-hrm.jpg',
    link: 'https://link.amazon/B0f3Zd8yq',
    asin: 'B0FPG31ZFQ',
    search: 'COROS heart rate monitor',
  },
  {
    key: 'garmin-hrm',
    title: 'Garmin HRM-200',
    description:
      'Chest strap, water-resistant, washable band, up to 1 year battery. Precise HR for NSM training.',
    icon: 'heart-pulse',
    cover: '/garmin-hrm200.jpg',
    link: 'https://link.amazon/B0acBWizW',
    asin: 'B0DQ9KDKT2',
    search: 'Garmin HRM 200',
  },
  {
    key: 'garmin-fr165',
    title: 'Garmin Forerunner 165',
    description:
      'Lightweight GPS running watch with AMOLED display, real-time pace, distance and HR data.',
    icon: 'watch',
    cover: '/garmin-fr165.jpg',
    link: 'https://link.amazon/B0dKyKxck',
    asin: 'B0CT3SGHXL',
    search: 'Garmin Forerunner 165',
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
    asin: 'B0G4D8438Z',
    search: 'NSM Subthreshold Running Kept Simple James Copeland',
  },
  {
    key: 'bakken',
    title: 'The Norwegian Method Applied',
    author: 'Marius Bakken, MD',
    cover: '/book-bakken.jpg',
    link: 'https://link.amazon/B0hEe3cFw',
    asin: '8269471100',
    search: 'The Norwegian Method Applied Marius Bakken',
  },
];

/**
 * Associates tags by Amazon store. Only stores listed here receive
 * localized links; everyone else keeps the default Amazon.es link.
 * Add a store after joining its Associates program, e.g. us: 'name-20'.
 */
export const AMAZON_TAGS: Partial<Record<AmazonStore, string>> = {
  es: 'jramosg-20',
};

export type AmazonStore =
  | 'us'
  | 'ca'
  | 'uk'
  | 'au'
  | 'de'
  | 'fr'
  | 'it'
  | 'es'
  | 'nl'
  | 'se'
  | 'pl'
  | 'be';

export const AMAZON_DOMAINS: Record<AmazonStore, string> = {
  us: 'amazon.com',
  ca: 'amazon.ca',
  uk: 'amazon.co.uk',
  au: 'amazon.com.au',
  de: 'amazon.de',
  fr: 'amazon.fr',
  it: 'amazon.it',
  es: 'amazon.es',
  nl: 'amazon.nl',
  se: 'amazon.se',
  pl: 'amazon.pl',
  be: 'amazon.com.be',
};

/**
 * Affiliate URL for a product in a given store, or null to keep the
 * default link. Amazon.es uses the verified product page; other stores
 * use a search so the product is found even if its ASIN differs there.
 */
export function amazonUrl(
  store: AmazonStore,
  product: { asin: string; search: string },
): string | null {
  const tag = AMAZON_TAGS[store];
  if (!tag || store === 'es') return null;
  const params = new URLSearchParams({ k: product.search, tag });
  return `https://www.${AMAZON_DOMAINS[store]}/s?${params.toString()}`;
}
