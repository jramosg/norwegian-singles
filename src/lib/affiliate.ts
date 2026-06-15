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

// One tag per marketplace. Sign up separately for each country you target.
const TAGS = {
  es: 'jramosg-21', // amazon.es
  com: 'TODO_YOUR_COM_TAG-20', // amazon.com — not registered yet
} as const;

// Map app locale -> Amazon marketplace (TLD + which tag to use).
// NOTE: English visitors are routed to amazon.es for now, because that is the
// only marketplace where you have a working tag (commissions are per-market).
// Once you register an amazon.com Associates account, switch `en` to
// { tld: 'com', tag: TAGS.com } — or adopt Amazon OneLink for auto geo-routing.
const MARKETPLACE: Record<Locale, { tld: string; tag: string }> = {
  es: { tld: 'es', tag: TAGS.es },
  en: { tld: 'es', tag: TAGS.es },
};

export interface Book {
  /** ASIN (books) or ISBN-10. Shared across marketplaces. */
  asin: string;
  title: string;
  author?: string;
}

export const books: Book[] = [
  {
    asin: 'B0G4D8438Z',
    title: 'The Norwegian Singles Method: Subthreshold Running',
    author: 'James Copeland',
  },
  {
    asin: '8269471100',
    title: 'The Norwegian Method Applied: Training at Threshold Intensity',
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
