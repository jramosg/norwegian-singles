/**
 * Amazon affiliate helpers
 *
 * The Amazon Associates program is PER-MARKETPLACE: a tracking tag from
 * amazon.es only earns commissions on amazon.es. Sending a visitor to a
 * marketplace where you don't have a registered tag earns nothing.
 *
 * This module maps the app locale to an Amazon marketplace + the tag for
 * that marketplace, so the link "depends on where the user enters from".
 *
 * ⚠️ REPLACE the placeholder tags below with YOUR real Associates tags.
 *    The tag in shopping URLs (e.g. `googshopes-21`) belongs to Amazon's
 *    own Google Shopping account, not to you — using it pays Amazon, not you.
 *    Get your tags at https://afiliados.amazon.es (one signup per country).
 */

import type { Locale } from '../types';

// One tag per marketplace.
const TAGS = {
  es: 'jramosg-21', // amazon.es
  com: 'jramosg-20', // amazon.com (US)
  uk: 'jramosg00-21', // amazon.co.uk
  de: 'jramosg0c-21', // amazon.de
  fr: 'jramosg09-21', // amazon.fr
} as const;

// Map app locale -> Amazon marketplace (TLD + tag).
// OneLink (configured in the Amazon Associates dashboard) further redirects
// visitors from other countries (DE, FR, IT…) to their local marketplace
// once the OneLink JS snippet is installed in Layout.astro.
const MARKETPLACE: Record<Locale, { tld: string; tag: string }> = {
  es: { tld: 'es', tag: TAGS.es },
  en: { tld: 'com', tag: TAGS.com },
  ko: { tld: 'com', tag: TAGS.com },
  de: { tld: 'de', tag: TAGS.de },
  fr: { tld: 'fr', tag: TAGS.fr },
};

export interface Book {
  /** ASIN (books) or ISBN-10. Shared across marketplaces. */
  asin: string;
  title: string;
  author?: string;
  cover?: string;
}

export const books: Book[] = [
  {
    asin: 'B0G4D8438Z',
    title: 'Norwegian Singles Method',
    author: 'James Copeland',
    cover: '/book-nsm.jpg',
  },
  {
    asin: '8269471100',
    title: 'The Norwegian Method Applied',
    author: 'Marius Bakken, MD',
    cover: '/book-bakken.jpg',
  },
];

/**
 * Build the marketplace-aware affiliate URL for a product.
 * @example amazonUrl('B0G4D8438Z', 'es')
 *   -> https://www.amazon.es/dp/B0G4D8438Z?tag=...
 */
export function amazonUrl(asin: string, locale: Locale): string {
  const { tld, tag } = MARKETPLACE[locale] ?? MARKETPLACE.en;
  return `https://www.amazon.${tld}/dp/${asin}?tag=${tag}`;
}
