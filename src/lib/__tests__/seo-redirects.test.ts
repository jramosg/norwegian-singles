import { describe, expect, it } from 'vitest';
import { locales } from '../../i18n/ui';
import {
  getAlternateSeoPath,
  getSeoPage,
  getSeoPages,
  getSeoRedirects,
} from '../seo-pages';

describe('SEO redirects', () => {
  const redirects = getSeoRedirects();
  const live = new Set(
    locales.flatMap((locale) =>
      getSeoPages(locale).map((page) => `/${locale}/${page.slug}/`),
    ),
  );

  it('redirects the same seven duplicates in every locale', () => {
    expect(redirects).toHaveLength(7 * locales.length);
  });

  it('only points at live pages, so there are no chains', () => {
    for (const { from, to } of redirects) {
      expect(live.has(to), `${from} -> ${to}`).toBe(true);
      expect(live.has(from), from).toBe(false);
    }
  });

  it('keeps redirected slugs out of page lookups', () => {
    expect(getSeoPage('en', 'jack-daniels-running-calculator')).toBeUndefined();
    expect(getSeoPage('en', 'vdot-calculator')).toBeDefined();
  });

  it('never uses a redirected page as a language alternate', () => {
    const redirected = new Set(redirects.map((r) => r.from));
    for (const path of live) {
      const locale = path.split('/')[1] as (typeof locales)[number];
      for (const other of locales) {
        const alt = getAlternateSeoPath(path, locale, other);
        if (alt) expect(redirected.has(alt), `${path} -> ${alt}`).toBe(false);
      }
    }
  });
});
