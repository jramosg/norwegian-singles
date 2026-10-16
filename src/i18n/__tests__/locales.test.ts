import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
import {
  defaultLocale,
  formatWeeklyPlanLabel,
  getLocaleFromPath,
  getTranslations,
  languageLabels,
  locales,
  ui,
} from '../ui';
import { getAlternateSeoPath, getSeoPages } from '../../lib/seo-pages';
import { getRacePages } from '../../lib/race-seo-pages';

const addedLocales = ['it', 'pt-BR'] as const;

function placeholders(text: string): string[] {
  return [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
}

describe.each(addedLocales)('%s language coverage', (locale) => {
  it('provides every UI key and preserves interpolation placeholders', () => {
    const translations = getTranslations(locale) as Record<string, string>;
    expect(Object.keys(translations).sort()).toEqual(Object.keys(ui.en).sort());
    for (const [key, english] of Object.entries(ui.en)) {
      expect(translations[key].trim(), key).not.toBe('');
      expect(placeholders(translations[key]), key).toEqual(
        placeholders(english),
      );
    }
  });

  it('maps every guide and race page to and from all supported languages', () => {
    const localizedPages = [...getSeoPages(locale), ...getRacePages(locale)];
    expect(localizedPages).toHaveLength(
      getSeoPages('en').length + getRacePages('en').length,
    );
    expect(new Set(localizedPages.map((page) => page.slug)).size).toBe(
      localizedPages.length,
    );
    for (const page of localizedPages) {
      const path = `/${locale}/${page.slug}/`;
      expect(getLocaleFromPath(path)).toBe(locale);
      for (const target of locales) {
        const alternate = getAlternateSeoPath(path, locale, target);
        expect(alternate, path).toBeDefined();
        expect(getAlternateSeoPath(alternate!, target, locale)).toBe(path);
      }
    }
  });

  it('keeps computed paces identical to the original race pages', () => {
    const english = getRacePages('en');
    for (const [index, page] of getRacePages(locale).entries()) {
      const { raceLabel, ...paces } = page.paceCard;
      const { raceLabel: englishLabel, ...englishPaces } =
        english[index].paceCard;
      expect(paces).toEqual(englishPaces);
      expect(raceLabel).not.toBe(englishLabel);
    }
  });
});

it('uses regional Portuguese metadata and localized decimal separators', () => {
  expect(languageLabels['pt-BR'].hreflang).toBe('pt-BR');
  expect(languageLabels['pt-BR'].og).toBe('pt_BR');
  expect(formatWeeklyPlanLabel('6.5 h/week', 'it')).toBe('6,5 h/settimana');
  expect(formatWeeklyPlanLabel('6.5 h/week', 'pt-BR')).toBe('6,5 h/semana');
});

const rootSource = readFileSync(
  new URL('../../pages/index.astro', import.meta.url),
  'utf8',
);
const rootScript = rootSource.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)?.[1];
if (!rootScript)
  throw new Error('The static homepage redirect script is missing.');

function visitRoot({
  saved = null,
  languages = [],
  language = '',
  blocked = false,
  search = '',
  hash = '',
}: {
  saved?: string | null;
  languages?: string[];
  language?: string;
  blocked?: boolean;
  search?: string;
  hash?: string;
} = {}) {
  const replace = vi.fn();
  runInNewContext(rootScript!, {
    supportedLocales: locales,
    fallbackLocale: defaultLocale,
    localStorage: {
      getItem() {
        if (blocked) throw new Error('Storage disabled');
        return saved;
      },
    },
    navigator: { languages, language },
    window: { location: { replace, search, hash } },
  });
  return replace;
}

describe('static homepage language selection', () => {
  it('prefers the saved choice over browser settings', () => {
    expect(
      visitRoot({ saved: 'it', languages: ['pt-BR'] }),
    ).toHaveBeenCalledWith('/it/');
  });

  it('matches browser languages in priority order, including regions', () => {
    expect(
      visitRoot({ languages: ['nl-NL', 'it-IT', 'pt-BR'] }),
    ).toHaveBeenCalledWith('/it/');
    expect(visitRoot({ languages: ['pt-br'] })).toHaveBeenCalledWith('/pt-BR/');
    expect(visitRoot({ languages: ['pt-PT'] })).toHaveBeenCalledWith('/pt-BR/');
  });

  it('ignores unsupported saved languages and handles blocked storage', () => {
    expect(
      visitRoot({ saved: 'xx', languages: ['pt-BR'] }),
    ).toHaveBeenCalledWith('/pt-BR/');
    expect(
      visitRoot({ blocked: true, languages: ['de-DE'] }),
    ).toHaveBeenCalledWith('/de/');
  });

  it('supports older browsers and falls back to English', () => {
    expect(visitRoot({ language: 'es-ES' })).toHaveBeenCalledWith('/es/');
    expect(visitRoot({ languages: ['nl-NL'] })).toHaveBeenCalledWith('/en/');
    expect(visitRoot()).toHaveBeenCalledWith('/en/');
  });

  it('preserves query strings and fragments', () => {
    expect(
      visitRoot({
        saved: 'pt-BR',
        search: '?utm_source=test',
        hash: '#calculator',
      }),
    ).toHaveBeenCalledWith('/pt-BR/?utm_source=test#calculator');
  });
});
