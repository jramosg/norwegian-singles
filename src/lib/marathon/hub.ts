/**
 * The marathon hub path for a locale, or undefined when that locale has no
 * marathon pages yet.
 *
 * Deliberately separate from `tier-pages.ts`: this is safe to call from
 * anywhere, including code that ends up in the client bundle, because it
 * touches string tables only and never the plan engine.
 */

import type { Locale } from '../../types';
import { hasTierCopy, getSharedCopy } from './tier-copy';

export function getMarathonHubPath(locale: Locale): string | undefined {
  if (!hasTierCopy(locale)) return undefined;
  return `/${locale}/${getSharedCopy(locale).indexSlug}/`;
}
