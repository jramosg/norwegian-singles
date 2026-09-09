/**
 * Cross-locale slug resolution for the marathon pages.
 *
 * Lives in its own module so `seo-pages.ts` can resolve hreflang alternates
 * without importing the whole page-building pipeline.
 */

import type { Locale } from '../../types';
import {
  MARATHON_LOCALES,
  getMarathonIndexPage,
  getMarathonTierPages,
} from './tier-pages';

/** True when `slug` is one of this locale's marathon pages. */
export function isMarathonSlug(locale: Locale, slug: string): boolean {
  if (!MARATHON_LOCALES.includes(locale)) return false;
  if (getMarathonIndexPage(locale)?.slug === slug) return true;
  return getMarathonTierPages(locale).some((page) => page.slug === slug);
}

/**
 * The equivalent marathon page in another locale, or undefined when that
 * locale has no marathon pages yet. Undefined must mean "omit the hreflang",
 * never "swap the locale segment and hope".
 */
export function getMarathonAlternatePath(
  slug: string,
  locale: Locale,
  alternateLocale: Locale,
): string | undefined {
  if (!MARATHON_LOCALES.includes(alternateLocale)) return undefined;

  if (getMarathonIndexPage(locale)?.slug === slug) {
    const alternate = getMarathonIndexPage(alternateLocale);
    return alternate ? `/${alternateLocale}/${alternate.slug}/` : undefined;
  }

  const tier = getMarathonTierPages(locale).find((p) => p.slug === slug);
  if (!tier) return undefined;
  const alternate = getMarathonTierPages(alternateLocale).find(
    (p) => p.tier === tier.tier,
  );
  return alternate ? `/${alternateLocale}/${alternate.slug}/` : undefined;
}
