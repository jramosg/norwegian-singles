/**
 * Send affiliate clicks to the visitor's own Amazon store.
 *
 * Amazon only pays commission on purchases in the store the tag belongs
 * to, and most visitors are not in Spain, so an Amazon.es link earns
 * nothing for them. The store is guessed from browser language and time
 * zone; no request or cookie is involved.
 */
import { amazonUrl, books, gear, type AmazonStore } from './affiliate';

const REGION_STORES: Record<string, AmazonStore> = {
  US: 'us',
  CA: 'ca',
  GB: 'uk',
  IE: 'uk',
  AU: 'au',
  NZ: 'au',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  FR: 'fr',
  IT: 'it',
  ES: 'es',
  NL: 'nl',
  SE: 'se',
  PL: 'pl',
  BE: 'be',
};

const LANGUAGE_STORES: Record<string, AmazonStore> = {
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
  nl: 'nl',
  sv: 'se',
  pl: 'pl',
};

function storeFromTimeZone(timeZone: string): AmazonStore | null {
  if (
    /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns)/.test(
      timeZone,
    )
  ) {
    return 'ca';
  }
  if (timeZone.startsWith('America/')) return 'us';
  if (timeZone === 'Europe/London' || timeZone === 'Europe/Dublin') return 'uk';
  if (timeZone.startsWith('Australia/') || timeZone === 'Pacific/Auckland') {
    return 'au';
  }
  return null;
}

/** Best guess of the visitor's Amazon store, or null if unclear. */
export function storeFor(
  languages: readonly string[],
  timeZone = '',
): AmazonStore | null {
  for (const language of languages) {
    const region = language.split('-')[1]?.toUpperCase();
    if (region && REGION_STORES[region]) return REGION_STORES[region];
  }
  const language = languages[0]?.split('-')[0]?.toLowerCase() ?? '';
  return LANGUAGE_STORES[language] ?? storeFromTimeZone(timeZone);
}

/** Point every `[data-amazon-asin]` link at the visitor's store. */
export function localizeAmazonLinks(): void {
  const store = storeFor(
    navigator.languages?.length ? navigator.languages : [navigator.language],
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  if (!store) return;

  const products = [...gear, ...books];
  document
    .querySelectorAll<HTMLAnchorElement>('a[data-amazon-asin]')
    .forEach((link) => {
      const product = products.find((p) => p.asin === link.dataset.amazonAsin);
      if (!product) return;
      const kindle = link.dataset.amazonFormat === 'kindle';
      const url = amazonUrl(
        store,
        kindle ? { ...product, search: `${product.search} kindle` } : product,
      );
      if (!url) return;
      link.href = url;
      link.dataset.store = store;
    });
}
