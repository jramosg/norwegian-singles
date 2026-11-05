import { describe, expect, it } from 'vitest';
import { AMAZON_TAGS, amazonUrl, books, gear } from '../affiliate';
import { storeFor } from '../amazon-store';

describe('storeFor', () => {
  it('uses the region of the first language that has one', () => {
    expect(storeFor(['en-US'])).toBe('us');
    expect(storeFor(['en-GB', 'en'])).toBe('uk');
    expect(storeFor(['fr', 'fr-CA'])).toBe('ca');
    expect(storeFor(['de-AT'])).toBe('de');
  });

  it('falls back to the language, then the time zone', () => {
    expect(storeFor(['fr'])).toBe('fr');
    expect(storeFor(['sv'])).toBe('se');
    expect(storeFor(['en'], 'America/Chicago')).toBe('us');
    expect(storeFor(['en'], 'America/Toronto')).toBe('ca');
    expect(storeFor(['en'], 'Europe/London')).toBe('uk');
    expect(storeFor(['en'], 'Australia/Sydney')).toBe('au');
  });

  it('returns null when it cannot tell', () => {
    expect(storeFor(['ko'], 'Asia/Seoul')).toBeNull();
    expect(storeFor(['en'], 'Asia/Jakarta')).toBeNull();
  });
});

describe('amazonUrl', () => {
  const product = gear[0];

  it('keeps the verified default link for Amazon.es', () => {
    expect(amazonUrl('es', product)).toBeNull();
  });

  it('keeps the default link for stores without a tag', () => {
    for (const store of ['us', 'uk', 'de'] as const) {
      if (!AMAZON_TAGS[store]) expect(amazonUrl(store, product)).toBeNull();
    }
  });

  it('builds a tagged search link once a store has a tag', () => {
    AMAZON_TAGS.us = 'test-20';
    const url = new URL(amazonUrl('us', product)!);
    delete AMAZON_TAGS.us;
    expect(url.hostname).toBe('www.amazon.com');
    expect(url.searchParams.get('tag')).toBe('test-20');
    expect(url.searchParams.get('k')).toBe(product.search);
  });

  it('has an ASIN and search query for every product', () => {
    for (const item of [...gear, ...books]) {
      expect(item.asin, item.key).toMatch(/^[A-Z0-9]{10}$/);
      expect(item.search.length, item.key).toBeGreaterThan(3);
    }
  });
});
