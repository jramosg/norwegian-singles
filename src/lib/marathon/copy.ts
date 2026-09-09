/**
 * Locale registry for marathon plan copy.
 *
 * `MARATHON_LOCALES` is the list of locales whose copy is actually
 * translated. Pages are only generated for these, so an untranslated locale
 * gets no marathon pages rather than English text under a /es/ URL, which
 * would be worse than nothing for both readers and search engines.
 */

import type { Locale } from '../../types';
import { marathonCopyDe } from './copy.de';
import { marathonCopyEn, type MarathonCopy } from './copy.en';
import { marathonCopyEs } from './copy.es';
import { marathonCopyFr } from './copy.fr';
import { marathonCopyKo } from './copy.ko';

const COPY: Partial<Record<Locale, MarathonCopy>> = {
  en: marathonCopyEn,
  es: marathonCopyEs,
  ko: marathonCopyKo,
  de: marathonCopyDe,
  fr: marathonCopyFr,
};

export const MARATHON_LOCALES: Locale[] = Object.keys(COPY) as Locale[];

export function hasMarathonCopy(locale: Locale): boolean {
  return COPY[locale] !== undefined;
}

export function getMarathonCopy(locale: Locale): MarathonCopy {
  const copy = COPY[locale];
  if (!copy) {
    throw new Error(
      `No marathon copy for locale "${locale}". Add it to MARATHON_LOCALES ` +
        `only once its translation exists.`,
    );
  }
  return copy;
}

export type { MarathonCopy };
