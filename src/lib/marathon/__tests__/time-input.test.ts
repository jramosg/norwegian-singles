import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseTime } from '../../paces';

/**
 * The purchase form validates race times with an HTML `pattern` attribute.
 *
 * Astro strips a backslash out of an attribute string, so a pattern written
 * as `\d{1,2}` reaches the browser as `d{1,2}` and rejects every real time:
 * entering 35:00 turned the field red. The bug is invisible in the source and
 * only shows in rendered HTML, so the pattern is read back out of the
 * component here and exercised against real times.
 */
const FORM = 'src/components/marathon/BuyForm.astro';

function patternsFrom(file: string): string[] {
  const source = readFileSync(file, 'utf8');
  return [...source.matchAll(/pattern="([^"]+)"/g)].map((m) => m[1]);
}

const VALID = ['35:00', '40:00', '19:45', '9:59', '1:25:00', '3:05:00'];
const INVALID = ['', 'abc', '35:0', '::', '1:2:3', '12345'];

describe('race time input pattern', () => {
  const patterns = patternsFrom(FORM);

  it('is present on both time fields', () => {
    expect(patterns).toHaveLength(2);
  });

  it('contains no backslash escape, which Astro would silently strip', () => {
    for (const pattern of patterns) {
      expect(pattern).not.toContain('\\');
    }
  });

  for (const pattern of patterns) {
    it(`accepts real race times: ${pattern}`, () => {
      for (const value of VALID) {
        expect(
          new RegExp(pattern).test(value),
          `${value} should be accepted`,
        ).toBe(true);
      }
    });

    it(`rejects nonsense: ${pattern}`, () => {
      for (const value of INVALID) {
        expect(
          new RegExp(pattern).test(value),
          `${value} should be rejected`,
        ).toBe(false);
      }
    });
  }

  it('agrees with the parser that reads the value server-side', () => {
    // A value the browser accepts must be something the server can parse,
    // or a buyer gets bounced after passing validation.
    for (const value of VALID) {
      expect(parseTime(value), `${value} should parse`).toBeGreaterThan(0);
    }
  });
});
