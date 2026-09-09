import { describe, it, expect } from 'vitest';
import {
  getPhaseLayout,
  isDeloadWeek,
  isTestWeek,
  lastBuildWeek,
  longRunM,
  peakWeeks,
  phaseForWeek,
  phaseSpan,
  PLAN_LENGTHS,
  qualityMinutes,
  weekVolumeM,
} from '../phases';
import { getTier, TIER_IDS } from '../tiers';
import type { PhaseId, PlanLength } from '../types';

const PHASE_ORDER: PhaseId[] = ['base', 'supportive', 'specific', 'taper'];

describe('phase layout', () => {
  for (const length of PLAN_LENGTHS) {
    it(`${length}wk: spans are contiguous, span 1..${length}, in the fixed order`, () => {
      const layout = getPhaseLayout(length);
      expect(layout.map((s) => s.phase)).toEqual(PHASE_ORDER);
      expect(layout[0].fromWeek).toBe(1);
      expect(layout[layout.length - 1].toWeek).toBe(length);
      for (let i = 1; i < layout.length; i++) {
        expect(layout[i].fromWeek).toBe(layout[i - 1].toWeek + 1);
      }
    });

    it(`${length}wk: phaseForWeek agrees with the spans for every week`, () => {
      const layout = getPhaseLayout(length);
      for (let week = 1; week <= length; week++) {
        const span = layout.find((s) => week >= s.fromWeek && week <= s.toWeek);
        expect(span).toBeDefined();
        expect(phaseForWeek(length, week)).toBe(span!.phase);
      }
    });
  }
});

describe('volume curve', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: week 1 is roughly 0.73 of peak`, () => {
        const spec = getTier(tier);
        const week1 = weekVolumeM(tier, length, 1);
        expect(week1 / spec.peakM).toBeCloseTo(0.73, 1);
      });

      it(`${tier} ${length}wk: the two peak weeks hit peak exactly and sit inside the specific phase`, () => {
        const spec = getTier(tier);
        for (const week of peakWeeks(length)) {
          expect(weekVolumeM(tier, length, week)).toBe(spec.peakM);
          expect(phaseForWeek(length, week)).toBe('specific');
        }
      });

      it(`${tier} ${length}wk: no week exceeds the tier peak`, () => {
        const spec = getTier(tier);
        for (let week = 1; week <= length; week++) {
          expect(weekVolumeM(tier, length, week)).toBeLessThanOrEqual(
            spec.peakM,
          );
        }
      });

      it(`${tier} ${length}wk: longRunM never exceeds the tier cap`, () => {
        const spec = getTier(tier);
        for (let week = 1; week <= length; week++) {
          expect(longRunM(tier, length, week)).toBeLessThanOrEqual(
            spec.longRunCapM,
          );
        }
      });
    }
  }

  it('the supportive-phase long-run share is lower than the base-phase share for the same volume', () => {
    // Compare the first week of each phase, where volume is low enough that
    // the tier's long-run cap never clamps the result, so the ratio
    // longRunM/volume is a pure read of the phase's share.
    for (const tier of TIER_IDS) {
      for (const length of PLAN_LENGTHS) {
        const base = phaseSpan(length, 'base');
        const supportive = phaseSpan(length, 'supportive');

        const baseVolume = weekVolumeM(tier, length, base.fromWeek);
        const baseShare = longRunM(tier, length, base.fromWeek) / baseVolume;

        const supportiveVolume = weekVolumeM(tier, length, supportive.fromWeek);
        const supportiveShare =
          longRunM(tier, length, supportive.fromWeek) / supportiveVolume;

        expect(supportiveShare).toBeLessThan(baseShare);
      }
    }
  });
});

describe('isDeloadWeek', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: never on a peak week, never in taper, never on the final build week`, () => {
        const lastBuild = lastBuildWeek(length);
        const peaks = peakWeeks(length);
        for (let week = 1; week <= length; week++) {
          if (isDeloadWeek(length, week)) {
            expect(peaks).not.toContain(week);
            expect(phaseForWeek(length, week)).not.toBe('taper');
            expect(week).not.toBe(lastBuild);
          }
        }
      });
    }
  }
});

describe('isTestWeek', () => {
  for (const length of PLAN_LENGTHS) {
    it(`${length}wk: true on the last base week and the last supportive week`, () => {
      const base = phaseSpan(length, 'base');
      const supportive = phaseSpan(length, 'supportive');
      expect(isTestWeek(length, base.toWeek)).toBe(true);
      expect(isTestWeek(length, supportive.toWeek)).toBe(true);
    });
  }

  it('an 18-week plan (6-week base) also has a mid-base test week', () => {
    const base = phaseSpan(18, 'base');
    const mid = Math.floor((base.fromWeek + base.toWeek) / 2);
    expect(isTestWeek(18, mid)).toBe(true);
    // Exactly two test weeks inside the base phase itself.
    const testWeeksInBase = [];
    for (let week = base.fromWeek; week <= base.toWeek; week++) {
      if (isTestWeek(18, week)) testWeeksInBase.push(week);
    }
    expect(testWeeksInBase).toHaveLength(2);
  });

  for (const length of [12, 15] as PlanLength[]) {
    it(`${length}wk plan (short base) has no mid-base test week`, () => {
      const base = phaseSpan(length, 'base');
      const testWeeksInBase = [];
      for (let week = base.fromWeek; week <= base.toWeek; week++) {
        if (isTestWeek(length, week)) testWeeksInBase.push(week);
      }
      expect(testWeeksInBase).toEqual([base.toWeek]);
    });
  }
});

describe('qualityMinutes', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: non-decreasing across the build, lower in taper than at peak`, () => {
        const lastBuild = lastBuildWeek(length);
        const values: number[] = [];
        for (let week = 1; week <= lastBuild; week++) {
          values.push(qualityMinutes(tier, length, week));
        }
        for (let i = 1; i < values.length; i++) {
          expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
        }

        const peakValue = values[values.length - 1];
        const taperValue = qualityMinutes(tier, length, lastBuild + 1);
        expect(taperValue).toBeLessThan(peakValue);
      });
    }
  }
});
