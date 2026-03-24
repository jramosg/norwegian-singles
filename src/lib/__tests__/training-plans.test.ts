import { describe, it, expect } from 'vitest';
import {
  WEEKLY_PLANS,
  getPlanByHours,
  getNextPlan,
  PLAN_HOURS,
  DAYS_OF_WEEK,
} from '../training-plans';
import type { SubTSession } from '../training-plans';

describe('WEEKLY_PLANS structure', () => {
  it('every plan has exactly 7 days', () => {
    for (const hours of PLAN_HOURS) {
      expect(WEEKLY_PLANS[hours].days).toHaveLength(7);
    }
  });

  it('sub-T sessions are on Tue (index 1), Thu (3), Sat (5) for plans up to 8h', () => {
    for (const hours of PLAN_HOURS.filter((h) => h <= 8)) {
      const days = WEEKLY_PLANS[hours].days;
      expect(days[1].kind).toBe('subT'); // Tuesday
      expect(days[3].kind).toBe('subT'); // Thursday
      expect(days[5].kind).toBe('subT'); // Saturday
    }
  });

  it('9h plan has sub-T on Tue, Thu, Sat and double on Sun', () => {
    const days = WEEKLY_PLANS[9].days;
    expect(days[1].kind).toBe('subT'); // Tuesday
    expect(days[3].kind).toBe('subT'); // Thursday
    expect(days[5].kind).toBe('subT'); // Saturday — 10×3min
    expect(days[6].kind).toBe('double'); // Sunday — double 90+35 min
  });

  it('9h plan has double easy on Wednesday and Friday', () => {
    const days = WEEKLY_PLANS[9].days;
    expect(days[2].kind).toBe('double'); // Wednesday
    expect(days[4].kind).toBe('double'); // Friday
  });

  it('Sunday (index 6) is easy for all plans except 9h (which is double)', () => {
    for (const hours of PLAN_HOURS) {
      const sunday = WEEKLY_PLANS[hours].days[6];
      if (hours === 9) {
        expect(sunday.kind).toBe('double');
      } else {
        expect(sunday.kind).toBe('easy');
      }
    }
  });

  it('4.5h plan has rest on Monday', () => {
    expect(WEEKLY_PLANS[4.5].days[0].kind).toBe('rest');
  });

  it('all other plans have easy or double on Monday', () => {
    for (const hours of PLAN_HOURS.filter((h) => h !== 4.5)) {
      const mon = WEEKLY_PLANS[hours].days[0];
      expect(['easy', 'double']).toContain(mon.kind);
    }
  });

  it('Sunday long run duration is non-decreasing across plans up to 8h', () => {
    const plans8 = PLAN_HOURS.filter((h) => h <= 8);
    const sundays = plans8.map((h) => {
      const day = WEEKLY_PLANS[h].days[6];
      return day.kind === 'easy' ? day.durationMin : 0;
    });
    for (let i = 1; i < sundays.length; i++) {
      expect(sundays[i]).toBeGreaterThanOrEqual(sundays[i - 1]);
    }
  });

  it('Saturday sub-T uses rep3min pace column (plans ≤ 8h)', () => {
    for (const hours of PLAN_HOURS.filter((h) => h <= 8)) {
      const sat = WEEKLY_PLANS[hours].days[5] as SubTSession;
      expect(sat.paceColumn).toBe('rep3min');
    }
  });

  it('Tuesday sub-T uses rep10min pace column', () => {
    for (const hours of PLAN_HOURS) {
      const tue = WEEKLY_PLANS[hours].days[1] as SubTSession;
      expect(tue.paceColumn).toBe('rep10min');
    }
  });

  it('Thursday sub-T uses rep6min pace column', () => {
    for (const hours of PLAN_HOURS) {
      const thu = WEEKLY_PLANS[hours].days[3] as SubTSession;
      expect(thu.paceColumn).toBe('rep6min');
    }
  });

  it('Saturday reps count increases from 4.5h to 8h plan', () => {
    const plans8 = PLAN_HOURS.filter((h) => h <= 8);
    const satReps = plans8.map(
      (h) => (WEEKLY_PLANS[h].days[5] as SubTSession).reps,
    );
    expect(satReps[0]).toBeLessThanOrEqual(satReps[satReps.length - 1]);
  });
});

describe('getPlanByHours', () => {
  it('returns exact match for exact hours', () => {
    expect(getPlanByHours(6).hours).toBe(6);
    expect(getPlanByHours(8).hours).toBe(8);
    expect(getPlanByHours(9).hours).toBe(9);
  });

  it('returns nearest plan for inexact hours', () => {
    expect(getPlanByHours(5.3).hours).toBe(5.5); // 5.3 is closer to 5.5 than 4.5
    expect(getPlanByHours(7.2).hours).toBe(7);
    expect(getPlanByHours(7.8).hours).toBe(8);
    expect(getPlanByHours(8.6).hours).toBe(9);
  });
});

describe('getNextPlan', () => {
  it('returns next tier for all but the last', () => {
    expect(getNextPlan(4.5)?.hours).toBe(5.5);
    expect(getNextPlan(7.5)?.hours).toBe(8);
    expect(getNextPlan(8)?.hours).toBe(9);
  });

  it('returns null for the highest tier', () => {
    expect(getNextPlan(9)).toBeNull();
  });
});

describe('DAYS_OF_WEEK', () => {
  it('has 7 entries starting with monday', () => {
    expect(DAYS_OF_WEEK).toHaveLength(7);
    expect(DAYS_OF_WEEK[0]).toBe('monday');
    expect(DAYS_OF_WEEK[6]).toBe('sunday');
  });
});
