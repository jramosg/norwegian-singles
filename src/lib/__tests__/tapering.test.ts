import { describe, it, expect } from 'vitest';
import {
  getTaperPlan,
  getReverseTaperPlan,
  TAPER_10K,
  REVERSE_TAPER_10K,
  TAPER_HALF,
  REVERSE_TAPER_HALF,
} from '../tapering';

describe('taper plans have 7 days', () => {
  it.each([TAPER_10K, REVERSE_TAPER_10K, TAPER_HALF, REVERSE_TAPER_HALF])(
    '$name has 7 days',
    (plan) => {
      expect(plan.days).toHaveLength(7);
    },
  );
});

describe('taper plans end with Race on Sunday', () => {
  it('TAPER_10K Sunday = Race', () => {
    expect(TAPER_10K.days[6].kind).toBe('race');
  });
  it('TAPER_HALF Sunday = Race', () => {
    expect(TAPER_HALF.days[6].kind).toBe('race');
  });
});

describe('taper days have valid dayIndex (0–6)', () => {
  it.each([TAPER_10K, REVERSE_TAPER_10K, TAPER_HALF, REVERSE_TAPER_HALF])(
    '$name all dayIndex in 0–6',
    (plan) => {
      for (const day of plan.days) {
        expect(day.dayIndex).toBeGreaterThanOrEqual(0);
        expect(day.dayIndex).toBeLessThanOrEqual(6);
      }
    },
  );
});

describe('easy_shorter days have a factor', () => {
  it.each([TAPER_10K, REVERSE_TAPER_10K, TAPER_HALF, REVERSE_TAPER_HALF])(
    '$name easy_shorter days have factor between 0 and 1',
    (plan) => {
      for (const day of plan.days.filter((d) => d.kind === 'easy_shorter')) {
        expect(day.factor).toBeDefined();
        expect(day.factor!).toBeGreaterThan(0);
        expect(day.factor!).toBeLessThan(1);
      }
    },
  );
});

describe('getTaperPlan', () => {
  it('returns 10K taper for 10k', () => {
    expect(getTaperPlan('10k')).toBe(TAPER_10K);
  });
  it('returns half taper for half', () => {
    expect(getTaperPlan('half')).toBe(TAPER_HALF);
  });
  it('returns half taper for marathon (fallback)', () => {
    expect(getTaperPlan('marathon')).toBe(TAPER_HALF);
  });
});

describe('getReverseTaperPlan', () => {
  it('returns 10K recovery for 10k', () => {
    expect(getReverseTaperPlan('10k')).toBe(REVERSE_TAPER_10K);
  });
  it('returns HM recovery for half', () => {
    expect(getReverseTaperPlan('half')).toBe(REVERSE_TAPER_HALF);
  });
});
