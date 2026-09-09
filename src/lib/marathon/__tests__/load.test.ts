import { describe, it, expect } from 'vitest';
import { generateMarathonPlan } from '../generate';
import { createResolver } from '../resolve';
import {
  QUALITY_SHARE_CEILING,
  intensityWeight,
  weeklyQualityBudgetM,
  weeklyQualityLoad,
} from '../load';
import { TIER_IDS } from '../tiers';
import { PLAN_LENGTHS } from '../phases';
import { calculateTimeFromVDOT, calculateVDOT } from '../../vdot';
import type { FitnessEstimate } from '../types';

/** A 40:00 10K runner. */
function fitnessFor(vdotOffset = 0): FitnessEstimate {
  const vdot = calculateVDOT(10000, 2400) + vdotOffset;
  return {
    vdot,
    fiveKEquivalentSec: calculateTimeFromVDOT(vdot, 5000),
    source: 'race',
    updatedAt: '2026-09-09T00:00:00Z',
    setAtWeek: 1,
  };
}

const MARATHON_DATE = '2027-04-18';

/**
 * Weekly quality should sit around a quarter of volume, weighted by how
 * costly each kilometre is: 30% of a week at subthreshold is trainable,
 * 30% at VO2max is not. 30% weighted is the hard ceiling; 25% is the target.
 */
const HARD_CEILING = 0.3;

describe('intensityWeight', () => {
  it('ranks cost per kilometre in the physiologically sensible order', () => {
    const easy = intensityWeight({ kind: 'easy' });
    const longRunPace = intensityWeight({ kind: 'mp', pct: 85 });
    const mp = intensityWeight({ kind: 'mp', pct: 100 });
    const subT = intensityWeight({ kind: 'subT', column: 'rep10min' });
    const tenK = intensityWeight({ kind: 'race', distance: '10K' });
    const fiveK = intensityWeight({ kind: 'race', distance: '5K' });
    const hill = intensityWeight({ kind: 'effort', label: 'hill_max' });

    expect(easy).toBe(0);
    expect(longRunPace).toBeLessThan(mp);
    expect(mp).toBeLessThan(subT);
    expect(subT).toBeLessThan(tenK);
    expect(tenK).toBeLessThan(fiveK);
    expect(fiveK).toBeLessThanOrEqual(hill);
  });

  it('treats subthreshold as the unit of cost', () => {
    expect(intensityWeight({ kind: 'subT', column: 'rep10min' })).toBe(1);
  });

  it('charges more for shorter, faster subthreshold reps', () => {
    const long = intensityWeight({ kind: 'subT', column: 'rep10min' });
    const medium = intensityWeight({ kind: 'subT', column: 'rep6min' });
    const short = intensityWeight({ kind: 'subT', column: 'rep3min' });
    expect(long).toBeLessThan(medium);
    expect(medium).toBeLessThan(short);
  });
});

describe('weeklyQualityBudgetM', () => {
  it('ramps across the build', () => {
    const early = weeklyQualityBudgetM(100_000, 1, 15);
    const late = weeklyQualityBudgetM(100_000, 15, 15);
    expect(late).toBeGreaterThan(early);
  });

  it('stays under the ceiling even at the top of the ramp', () => {
    const budget = weeklyQualityBudgetM(100_000, 15, 15);
    expect(budget / 100_000).toBeLessThan(QUALITY_SHARE_CEILING);
  });

  it('takes load off a down week, not just distance', () => {
    const normal = weeklyQualityBudgetM(100_000, 8, 15, false);
    const deload = weeklyQualityBudgetM(100_000, 8, 15, true);
    expect(deload).toBeLessThan(normal);
  });
});

describe('weekly quality load across every generated plan', () => {
  const fitness = fitnessFor();

  for (const tier of TIER_IDS) {
    for (const lengthWeeks of PLAN_LENGTHS) {
      it(`${tier} / ${lengthWeeks}wk never exceeds the hard ceiling`, () => {
        const plan = generateMarathonPlan({
          tier,
          lengthWeeks,
          marathonDate: MARATHON_DATE,
          unit: 'km',
          fitness,
        });
        const resolver = createResolver(fitness, plan.mp);

        for (const week of plan.weeks) {
          if (week.weekNumber === lengthWeeks) continue;
          const load = weeklyQualityLoad(week, resolver);
          expect(
            load.share,
            `${tier}/${lengthWeeks}wk W${week.weekNumber} at ` +
              `${(load.share * 100).toFixed(1)}% weighted quality`,
          ).toBeLessThanOrEqual(HARD_CEILING);
        }
      });
    }
  }

  it('keeps the median week comfortably under the 25% target', () => {
    const shares: number[] = [];
    for (const tier of TIER_IDS) {
      for (const lengthWeeks of PLAN_LENGTHS) {
        const plan = generateMarathonPlan({
          tier,
          lengthWeeks,
          marathonDate: MARATHON_DATE,
          unit: 'km',
          fitness,
        });
        const resolver = createResolver(fitness, plan.mp);
        for (const week of plan.weeks) {
          if (week.weekNumber === lengthWeeks) continue;
          shares.push(weeklyQualityLoad(week, resolver).share);
        }
      }
    }
    shares.sort((a, b) => a - b);
    const median = shares[Math.floor(shares.length / 2)];
    expect(median).toBeLessThan(QUALITY_SHARE_CEILING);
    // A plan that is all easy running is not a marathon plan either.
    expect(median).toBeGreaterThan(0.1);
  });

  it('excludes races and time trials from the training-quality budget', () => {
    const plan = generateMarathonPlan({
      tier: 'singles75',
      lengthWeeks: 12,
      marathonDate: MARATHON_DATE,
      unit: 'km',
      fitness,
    });
    const resolver = createResolver(fitness, plan.mp);
    const testWeek = plan.weeks.find((w) => w.isTestWeek);
    expect(testWeek).toBeDefined();
    const testDay = testWeek?.days.find((d) => d.kind === 'test');
    expect(testDay?.segments).toBeDefined();
    // The 5K itself is quality running, but it is the point of the week
    // rather than part of its budget, so it must not be counted.
    const load = weeklyQualityLoad(testWeek!, resolver);
    expect(load.qualityM).toBeLessThan(testDay!.targetDistanceM * 3);
  });

  it('drops a test week to two quality sessions', () => {
    for (const lengthWeeks of PLAN_LENGTHS) {
      const plan = generateMarathonPlan({
        tier: 'singles95',
        lengthWeeks,
        marathonDate: MARATHON_DATE,
        unit: 'km',
        fitness,
      });
      for (const week of plan.weeks.filter((w) => w.isTestWeek)) {
        const quality = week.days.filter((d) => d.isQuality);
        expect(quality.length, `${lengthWeeks}wk W${week.weekNumber}`).toBe(2);
      }
    }
  });

  it('scales quality with the tier rather than repeating one dose', () => {
    const shareFor = (tier: (typeof TIER_IDS)[number]) => {
      const plan = generateMarathonPlan({
        tier,
        lengthWeeks: 18,
        marathonDate: MARATHON_DATE,
        unit: 'km',
        fitness,
      });
      const resolver = createResolver(fitness, plan.mp);
      const week = plan.weeks.find((w) => w.weekNumber === 10)!;
      return weeklyQualityLoad(week, resolver);
    };
    // Absolute quality volume rises with the tier, while the *share* stays
    // in the same band — which is the whole point of tiering.
    expect(shareFor('singles140').qualityM).toBeGreaterThan(
      shareFor('singles75').qualityM,
    );
    expect(shareFor('singles140').share).toBeLessThanOrEqual(HARD_CEILING);
    expect(shareFor('singles75').share).toBeLessThanOrEqual(HARD_CEILING);
  });
});
