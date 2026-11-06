import { describe, expect, it } from 'vitest';
import { isValidEmail, retestDate } from '../newsletter';

describe('newsletter helpers', () => {
  it('schedules the retest six weeks out', () => {
    expect(retestDate(new Date('2026-11-05T12:00:00Z'))).toBe('2026-12-17');
  });

  it('accepts real addresses and rejects obvious typos', () => {
    expect(isValidEmail(' runner@example.com ')).toBe(true);
    for (const bad of ['', 'runner', 'runner@', 'runner@example', 'a b@c.de']) {
      expect(isValidEmail(bad), bad).toBe(false);
    }
  });
});
