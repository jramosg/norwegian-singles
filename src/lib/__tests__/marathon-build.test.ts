import { describe, it, expect } from 'vitest';
import {
  MARATHON_BUILD,
  getBuildStartDate,
  getWeekStartDate,
  getCurrentBuildWeek,
  getWeeksToMarathon,
  getMarathonSpecificDurationMin,
} from '../marathon-build';

describe('MARATHON_BUILD structure', () => {
  it('has exactly 15 weeks', () => {
    expect(MARATHON_BUILD).toHaveLength(15);
  });

  it('week numbers run from 1 to 15', () => {
    for (let i = 0; i < 15; i++) {
      expect(MARATHON_BUILD[i].weekNumber).toBe(i + 1);
    }
  });

  it('every week has exactly 7 days', () => {
    for (const week of MARATHON_BUILD) {
      expect(week.days).toHaveLength(7);
    }
  });

  it('all 15 weeks have a label', () => {
    for (const week of MARATHON_BUILD) {
      expect(week.label.length).toBeGreaterThan(0);
    }
  });

  it('week 15 Sunday is the marathon race', () => {
    const sun = MARATHON_BUILD[14].days[6];
    expect(sun.kind).toBe('race');
    if (sun.kind === 'race') expect(sun.distanceM).toBe(42195);
  });
});

describe('Weeks 1–4 Base Build', () => {
  it('Monday is 60 min easy', () => {
    for (let i = 0; i < 4; i++) {
      const mon = MARATHON_BUILD[i].days[0];
      expect(mon.kind).toBe('easy');
      if (mon.kind === 'easy') expect(mon.durationMin).toBe(60);
    }
  });

  it('weeks 1, 3, 4 Tuesday is 3×3200m sub-T (rep10min)', () => {
    for (const i of [0, 2, 3]) {
      const tue = MARATHON_BUILD[i].days[1];
      expect(tue.kind).toBe('subT');
      if (tue.kind === 'subT') {
        expect(tue.reps).toBe(3);
        expect(tue.distanceM).toBe(3200);
        expect(tue.paceColumn).toBe('rep10min');
      }
    }
  });

  it('week 2 Tuesday is 4×3000m (atypical sub-T)', () => {
    const tue = MARATHON_BUILD[1].days[1];
    expect(tue.kind).toBe('subT');
    if (tue.kind === 'subT') {
      expect(tue.reps).toBe(4);
      expect(tue.distanceM).toBe(3000);
      expect(tue.atypical).toBe(true);
    }
  });

  it('Thursday is 6×1600m sub-T (rep6min) for weeks 1–4', () => {
    for (let i = 0; i < 4; i++) {
      const thu = MARATHON_BUILD[i].days[3];
      expect(thu.kind).toBe('subT');
      if (thu.kind === 'subT') {
        expect(thu.reps).toBe(6);
        expect(thu.distanceM).toBe(1600);
        expect(thu.paceColumn).toBe('rep6min');
      }
    }
  });

  it('Saturday is 10×1000m sub-T (rep3min) for weeks 1–4', () => {
    for (let i = 0; i < 4; i++) {
      const sat = MARATHON_BUILD[i].days[5];
      expect(sat.kind).toBe('subT');
      if (sat.kind === 'subT') {
        expect(sat.reps).toBe(10);
        expect(sat.distanceM).toBe(1000);
        expect(sat.paceColumn).toBe('rep3min');
      }
    }
  });

  it('long run increases 110→115→120→125', () => {
    const expected = [110, 115, 120, 125];
    for (let i = 0; i < 4; i++) {
      const sun = MARATHON_BUILD[i].days[6];
      expect(sun.kind).toBe('easy');
      if (sun.kind === 'easy') expect(sun.durationMin).toBe(expected[i]);
    }
  });
});

describe('Weeks 5–6 Parkrun', () => {
  it('Saturday is parkrun race for weeks 5 and 6', () => {
    for (const i of [4, 5]) {
      const sat = MARATHON_BUILD[i].days[5];
      expect(sat.kind).toBe('race');
      if (sat.kind === 'race') expect(sat.distanceM).toBe(5000);
    }
  });

  it('week 5 Tuesday is 3×5000m (atypical sub-T)', () => {
    const tue = MARATHON_BUILD[4].days[1];
    expect(tue.kind).toBe('subT');
    if (tue.kind === 'subT') {
      expect(tue.reps).toBe(3);
      expect(tue.distanceM).toBe(5000);
      expect(tue.atypical).toBe(true);
    }
  });

  it('week 6 Tuesday is 3×3200m (regular sub-T)', () => {
    const tue = MARATHON_BUILD[5].days[1];
    expect(tue.kind).toBe('subT');
    if (tue.kind === 'subT') {
      expect(tue.reps).toBe(3);
      expect(tue.distanceM).toBe(3200);
    }
  });

  it('parkrun days have an alternative note', () => {
    for (const i of [4, 5]) {
      const sat = MARATHON_BUILD[i].days[5];
      if (sat.kind === 'race') {
        expect(sat.alternativeNote).toBeTruthy();
      }
    }
  });
});

describe('Week 7 Key Session', () => {
  it('Thursday is same 3×3200m as Tuesday (not a double)', () => {
    const thu = MARATHON_BUILD[6].days[3];
    expect(thu.kind).toBe('subT');
    if (thu.kind === 'subT') {
      expect(thu.reps).toBe(3);
      expect(thu.distanceM).toBe(3200);
    }
  });

  it('Saturday is marathon-specific 3×5000m', () => {
    const sat = MARATHON_BUILD[6].days[5];
    expect(sat.kind).toBe('marathon_specific');
    if (sat.kind === 'marathon_specific') {
      expect(sat.reps).toBe(3);
      expect(sat.distanceM).toBe(5000);
    }
  });
});

describe('Week 8 Deload', () => {
  it('Sunday long run drops to 90 min', () => {
    const sun = MARATHON_BUILD[7].days[6];
    expect(sun.kind).toBe('easy');
    if (sun.kind === 'easy') expect(sun.durationMin).toBe(90);
  });

  it('Thursday is 10×1000m', () => {
    const thu = MARATHON_BUILD[7].days[3];
    expect(thu.kind).toBe('subT');
    if (thu.kind === 'subT') {
      expect(thu.reps).toBe(10);
      expect(thu.distanceM).toBe(1000);
    }
  });

  it('Saturday is marathon-specific 4×5000m', () => {
    const sat = MARATHON_BUILD[7].days[5];
    expect(sat.kind).toBe('marathon_specific');
    if (sat.kind === 'marathon_specific') {
      expect(sat.reps).toBe(4);
      expect(sat.distanceM).toBe(5000);
    }
  });
});

describe('Weeks 9–11 Peak Build', () => {
  it('week 10 Sunday is 10K race', () => {
    const sun = MARATHON_BUILD[9].days[6];
    expect(sun.kind).toBe('race');
    if (sun.kind === 'race') expect(sun.distanceM).toBe(10000);
  });

  it('weeks 10 and 11 Tuesday is 4×3000m atypical sub-T', () => {
    for (const i of [9, 10]) {
      const tue = MARATHON_BUILD[i].days[1];
      expect(tue.kind).toBe('subT');
      if (tue.kind === 'subT') {
        expect(tue.reps).toBe(4);
        expect(tue.distanceM).toBe(3000);
        expect(tue.atypical).toBe(true);
      }
    }
  });

  it('week 11 Saturday is marathon-specific 3×5000m', () => {
    const sat = MARATHON_BUILD[10].days[5];
    expect(sat.kind).toBe('marathon_specific');
    if (sat.kind === 'marathon_specific') {
      expect(sat.reps).toBe(3);
      expect(sat.distanceM).toBe(5000);
    }
  });

  it('peak long runs are 140 min (weeks 9, 11)', () => {
    for (const i of [8, 10]) {
      const sun = MARATHON_BUILD[i].days[6];
      expect(sun.kind).toBe('easy');
      if (sun.kind === 'easy') expect(sun.durationMin).toBe(140);
    }
  });
});

describe('Week 12 Half Marathon', () => {
  it('Sunday is half marathon race', () => {
    const sun = MARATHON_BUILD[11].days[6];
    expect(sun.kind).toBe('race');
    if (sun.kind === 'race') expect(sun.distanceM).toBe(21097);
  });

  it('Tuesday is 5×2000m sub-T', () => {
    const tue = MARATHON_BUILD[11].days[1];
    expect(tue.kind).toBe('subT');
    if (tue.kind === 'subT') {
      expect(tue.reps).toBe(5);
      expect(tue.distanceM).toBe(2000);
    }
  });

  it('Saturday is easy run (8 km, not sub-T)', () => {
    const sat = MARATHON_BUILD[11].days[5];
    expect(sat.kind).toBe('easy');
  });
});

describe('Week 13 MP Introduction', () => {
  it('Monday–Thursday are all easy runs', () => {
    for (const i of [0, 1, 2, 3]) {
      expect(MARATHON_BUILD[12].days[i].kind).toBe('easy');
    }
  });

  it('Friday is marathon-specific 5×5000m', () => {
    const fri = MARATHON_BUILD[12].days[4];
    expect(fri.kind).toBe('marathon_specific');
    if (fri.kind === 'marathon_specific') {
      expect(fri.reps).toBe(5);
      expect(fri.distanceM).toBe(5000);
    }
  });

  it('Saturday is easy 10 km', () => {
    const sat = MARATHON_BUILD[12].days[5];
    expect(sat.kind).toBe('easy');
  });

  it('Sunday is marathon-specific 10 km @ MP', () => {
    const sun = MARATHON_BUILD[12].days[6];
    expect(sun.kind).toBe('marathon_specific');
    if (sun.kind === 'marathon_specific') {
      expect(sun.distanceM).toBe(10000);
      expect(getMarathonSpecificDurationMin(sun, 241)).toBe(90);
      expect(getMarathonSpecificDurationMin(sun, 301)).toBe(100);
    }
  });
});

describe('Week 14 Race Prep', () => {
  it('Tuesday is marathon-specific 3×8000m progressive', () => {
    const tue = MARATHON_BUILD[13].days[1];
    expect(tue.kind).toBe('marathon_specific');
    if (tue.kind === 'marathon_specific') {
      expect(tue.reps).toBe(3);
      expect(tue.distanceM).toBe(8000);
    }
  });

  it('Sunday is marathon-specific 3×3000m @ goal MP', () => {
    const sun = MARATHON_BUILD[13].days[6];
    expect(sun.kind).toBe('marathon_specific');
    if (sun.kind === 'marathon_specific') {
      expect(sun.reps).toBe(3);
      expect(sun.distanceM).toBe(3000);
    }
  });
});

describe('Week 15 Taper', () => {
  it('Tuesday and Thursday are single 5000m sub-T', () => {
    for (const i of [1, 3]) {
      const day = MARATHON_BUILD[14].days[i];
      expect(day.kind).toBe('subT');
      if (day.kind === 'subT') {
        expect(day.reps).toBe(1);
        expect(day.distanceM).toBe(5000);
      }
    }
  });

  it('Saturday is a short easy run ≤ 30 min', () => {
    const sat = MARATHON_BUILD[14].days[5];
    expect(sat.kind).toBe('easy');
    if (sat.kind === 'easy') expect(sat.durationMin).toBeLessThanOrEqual(30);
  });
});

describe('Date helpers', () => {
  it('getBuildStartDate is 104 days before marathon', () => {
    const start = getBuildStartDate('2026-04-26');
    const marathon = new Date('2026-04-26');
    const diff = Math.round(
      (marathon.getTime() - start.getTime()) / 86_400_000,
    );
    expect(diff).toBe(104);
  });

  it('week 1 start equals build start', () => {
    const w1 = getWeekStartDate('2026-04-26', 1);
    const start = getBuildStartDate('2026-04-26');
    expect(w1.getTime()).toBe(start.getTime());
  });

  it('week 15 Sunday equals marathon date', () => {
    const w15 = getWeekStartDate('2026-04-26', 15);
    w15.setDate(w15.getDate() + 6);
    const marathon = new Date('2026-04-26');
    marathon.setHours(0, 0, 0, 0);
    expect(w15.getTime()).toBe(marathon.getTime());
  });

  it('getCurrentBuildWeek returns null for past marathon', () => {
    expect(getCurrentBuildWeek('2020-01-01')).toBeNull();
  });

  it('getCurrentBuildWeek returns null if build not started', () => {
    const far = new Date();
    far.setFullYear(far.getFullYear() + 2);
    expect(getCurrentBuildWeek(far.toISOString().slice(0, 10))).toBeNull();
  });

  it('getWeeksToMarathon returns 0 for past date', () => {
    expect(getWeeksToMarathon('2020-01-01')).toBe(0);
  });

  it('getWeeksToMarathon returns > 0 for future date', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    expect(
      getWeeksToMarathon(future.toISOString().slice(0, 10)),
    ).toBeGreaterThan(0);
  });
});
