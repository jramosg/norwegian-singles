/**
 * Locale registry for the marathon sales-page copy.
 * Mirrors `copy.ts`: only translated locales are registered.
 */

import type { Locale } from '../../types';
import { sharedCopyDe, tierCopyDe } from './tier-copy.de';
import {
  sharedCopyEn,
  tierCopyEn,
  type MarathonCopyShared,
  type TierPageCopy,
} from './tier-copy.en';
import { sharedCopyEs, tierCopyEs } from './tier-copy.es';
import { sharedCopyFr, tierCopyFr } from './tier-copy.fr';
import { sharedCopyKo, tierCopyKo } from './tier-copy.ko';
import type { TierId } from './types';

type TierCopyTable = Record<TierId, TierPageCopy>;

const TIER_COPY: Partial<Record<Locale, TierCopyTable>> = {
  en: tierCopyEn,
  es: tierCopyEs,
  ko: tierCopyKo,
  de: tierCopyDe,
  fr: tierCopyFr,
};

const SHARED_COPY: Partial<Record<Locale, MarathonCopyShared>> = {
  en: sharedCopyEn,
  es: sharedCopyEs,
  ko: sharedCopyKo,
  de: sharedCopyDe,
  fr: sharedCopyFr,
};

/**
 * Locales with complete sales-page copy. A locale needs both this and the
 * plan copy in `copy.ts` before its marathon pages are generated.
 */
export const TIER_COPY_LOCALES: Locale[] = Object.keys(TIER_COPY) as Locale[];

export function hasTierCopy(locale: Locale): boolean {
  return TIER_COPY[locale] !== undefined && SHARED_COPY[locale] !== undefined;
}

export function getTierCopy(locale: Locale): TierCopyTable {
  const copy = TIER_COPY[locale];
  if (!copy) throw new Error(`No marathon tier copy for locale "${locale}".`);
  return copy;
}

export function getSharedCopy(locale: Locale): MarathonCopyShared {
  const copy = SHARED_COPY[locale];
  if (!copy) throw new Error(`No marathon shared copy for "${locale}".`);
  return copy;
}
