import { describe, it, expect } from 'vitest';
import { calculateVDOT, calculateTimeFromVDOT } from '../../vdot';
import { generateMarathonPlan } from '../generate';
import { createResolver } from '../resolve';
import { TIER_IDS, getTier } from '../tiers';
import { PLAN_LENGTHS } from '../phases';
import type {
  FitnessEstimate,
  MarathonPlanInput,
  PaceAnchor,
  PlannedDay,
  PlanLength,
  Segment,
  TierId,
} from '../types';

// ---------------------------------------------------------------------------
// Shared test helpers
// ---------------------------------------------------------------------------

/** A realistic fitness estimate, built the way the product does it: a 10K
 * race result converted to VDOT, then a 5K-equivalent time read back off it. */
function makeFitness(
  overrides: Partial<FitnessEstimate> = {},
): FitnessEstimate {
  const vdot = calculateVDOT(10_000, 2400); // 40:00 10K
  const fiveKEquivalentSec = calculateTimeFromVDOT(vdot, 5000);
  return {
    vdot,
    fiveKEquivalentSec,
    source: 'race',
    updatedAt: '2026-01-01T00:00:00.000Z',
    setAtWeek: 1,
    ...overrides,
  };
}

function baseInput(
  tier: TierId,
  lengthWeeks: PlanLength,
  overrides: Partial<MarathonPlanInput> = {},
): MarathonPlanInput {
  return {
    tier,
    lengthWeeks,
    unit: 'km',
    fitness: makeFitness(),
    ...overrides,
  };
}

/** Recursively pulls every PaceAnchor out of a day's segment tree. */
function collectAnchors(segments: Segment[] | undefined): PaceAnchor[] {
  const anchors: PaceAnchor[] = [];
  for (const seg of segments ?? []) {
    if (seg.kind === 'steady') {
      anchors.push(seg.anchor);
    } else if (seg.kind === 'interval') {
      anchors.push(seg.work.anchor);
      if (seg.recovery.anchor) anchors.push(seg.recovery.anchor);
      if (seg.setRecovery?.anchor) anchors.push(seg.setRecovery.anchor);
    } else if (seg.kind === 'progression') {
      for (const block of seg.blocks) anchors.push(block.anchor);
      if (seg.recovery?.anchor) anchors.push(seg.recovery.anchor);
    }
  }
  return anchors;
}

function dayAnchors(day: PlannedDay): PaceAnchor[] {
  const anchors = collectAnchors(day.segments);
  if (day.secondRun) anchors.push(day.secondRun.anchor);
  return anchors;
}

// ---------------------------------------------------------------------------

describe('plan generation', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk generates a well-formed plan`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        expect(plan.weeks).toHaveLength(length);
        for (const week of plan.weeks) {
          expect(week.days).toHaveLength(7);
        }
      });
    }
  }
});

describe('marathon-date anchoring', () => {
  const cases: { label: string; marathonDate: string }[] = [
    { label: 'Saturday marathon', marathonDate: '2026-04-25' },
    { label: 'Sunday marathon', marathonDate: '2026-04-26' },
  ];

  for (const { label, marathonDate } of cases) {
    for (const length of PLAN_LENGTHS) {
      it(`${label}, ${length}wk plan: dates are consecutive, race day is correct, weeks end on the marathon weekday`, () => {
        const plan = generateMarathonPlan(
          baseInput('singles95', length, { marathonDate }),
        );

        const allDays = plan.weeks.flatMap((w) => w.days);
        for (const day of allDays) {
          expect(day.date).toBeTruthy();
        }

        for (let i = 1; i < allDays.length; i++) {
          const prev = Date.parse(`${allDays[i - 1].date}T00:00:00Z`);
          const curr = Date.parse(`${allDays[i].date}T00:00:00Z`);
          expect(curr - prev).toBe(86_400_000);
        }

        const lastWeek = plan.weeks[plan.weeks.length - 1];
        const raceDay = lastWeek.days[lastWeek.days.length - 1];
        expect(raceDay.kind).toBe('race');
        expect(raceDay.date).toBe(marathonDate);

        const marathonWeekday = new Date(
          `${marathonDate}T00:00:00Z`,
        ).getUTCDay();
        for (const week of plan.weeks) {
          const last = week.days[week.days.length - 1];
          expect(new Date(`${last.date}T00:00:00Z`).getUTCDay()).toBe(
            marathonWeekday,
          );
        }
      });
    }
  }
});

describe('quality-session placement', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: at most 3 quality sessions/week, exactly 2 in specific weeks, never on consecutive days`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          const qualityFlags = week.days.map((d) => d.isQuality);
          const qualityCount = qualityFlags.filter(Boolean).length;
          expect(qualityCount).toBeLessThanOrEqual(3);
          if (week.phase === 'specific') {
            expect(qualityCount).toBe(2);
          }
          for (let i = 0; i < qualityFlags.length - 1; i++) {
            expect(qualityFlags[i] && qualityFlags[i + 1]).toBe(false);
          }
        }
      });
    }
  }
});

describe('no marathon-pace work in the base phase', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk has no 'mp' anchor anywhere in a base-phase week`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks.filter((w) => w.phase === 'base')) {
          for (const day of week.days) {
            const anchors = collectAnchors(day.segments);
            expect(anchors.some((a) => a.kind === 'mp')).toBe(false);
          }
        }
      });
    }
  }
});

describe('specific-phase sessions are the long run', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk has no 'long' day in a non-race specific week`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks.filter((w) => w.phase === 'specific')) {
          expect(week.weekNumber).not.toBe(length); // never the race week
          expect(week.days.some((d) => d.kind === 'long')).toBe(false);
        }
      });
    }
  }
});

describe('determinism', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: identical input yields deeply equal plans`, () => {
        const input = baseInput(tier, length, {
          marathonDate: '2026-04-26',
        });
        const planA = generateMarathonPlan(input);
        const planB = generateMarathonPlan(input);
        expect(planB).toEqual(planA);
      });
    }
  }
});

describe('doubles / second runs', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: secondRun never lands on quality, rest, or race-week days`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          for (const day of week.days) {
            if (day.secondRun) {
              expect(day.isQuality).toBe(false);
              expect(day.kind).not.toBe('rest');
              expect(week.weekNumber).not.toBe(length);
            }
          }
        }
      });
    }
  }

  it('singles75 12-week plan has no secondRun at all', () => {
    const plan = generateMarathonPlan(baseInput('singles75', 12));
    for (const week of plan.weeks) {
      for (const day of week.days) {
        expect(day.secondRun).toBeUndefined();
      }
    }
  });
});

describe('weekly volume', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: peak volume sits inside the published band`, () => {
        const spec = getTier(tier);
        const plan = generateMarathonPlan(baseInput(tier, length));
        const peakKm = plan.peakVolumeM / 1000;
        expect(peakKm).toBeGreaterThanOrEqual(spec.bandMinKm - 2);
        expect(peakKm).toBeLessThanOrEqual(spec.bandMaxKm + 2);
      });

      it(`${tier} ${length}wk: taper volume (excluding race week) descends monotonically`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        const taperNonRace = plan.weeks.filter(
          (w) => w.phase === 'taper' && w.weekNumber !== length,
        );
        for (let i = 1; i < taperNonRace.length; i++) {
          expect(taperNonRace[i].volumeM).toBeLessThan(
            taperNonRace[i - 1].volumeM,
          );
        }
      });

      it(`${tier} ${length}wk: long run never exceeds the tier cap`, () => {
        const spec = getTier(tier);
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          expect(week.longRunM).toBeLessThanOrEqual(spec.longRunCapM);
        }
      });

      it(`${tier} ${length}wk: no day exceeds 30% of weekly volume outside race week`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          if (week.weekNumber === length) continue; // race week is exempt
          for (const day of week.days) {
            expect(day.targetDistanceM).toBeLessThanOrEqual(
              week.volumeM * 0.3 + 1,
            );
          }
        }
      });
    }
  }
});

describe('session metadata', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: every quality day has a whyKey and a sessionId`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          for (const day of week.days) {
            if (day.isQuality) {
              expect(day.whyKey).toBeTruthy();
              expect(day.sessionId).toBeTruthy();
            }
          }
        }
      });
    }
  }
});

describe('pace anchors are relative, never absolute', () => {
  const ALLOWED_ANCHOR_KEYS = new Set([
    'kind',
    'column',
    'distance',
    'pct',
    'label',
  ]);

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: no anchor carries an absolute seconds-per-km value`, () => {
        const plan = generateMarathonPlan(baseInput(tier, length));
        for (const week of plan.weeks) {
          for (const day of week.days) {
            for (const anchor of dayAnchors(day)) {
              for (const key of Object.keys(anchor)) {
                expect(ALLOWED_ANCHOR_KEYS.has(key)).toBe(true);
              }
            }
          }
        }
      });
    }
  }
});

describe('fitness re-pricing', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: a higher fitness estimate re-prices paces without changing structure`, () => {
        const fitnessLow = makeFitness();
        const fitnessHigh: FitnessEstimate = {
          ...fitnessLow,
          vdot: fitnessLow.vdot + 2,
          fiveKEquivalentSec: calculateTimeFromVDOT(fitnessLow.vdot + 2, 5000),
        };

        const planLow = generateMarathonPlan(
          baseInput(tier, length, { fitness: fitnessLow }),
        );
        const planHigh = generateMarathonPlan(
          baseInput(tier, length, { fitness: fitnessHigh }),
        );

        // Structure, the sequence of session ids per day, is unchanged.
        for (let w = 0; w < planLow.weeks.length; w++) {
          const idsLow = planLow.weeks[w].days.map((d) => d.sessionId);
          const idsHigh = planHigh.weeks[w].days.map((d) => d.sessionId);
          expect(idsHigh).toEqual(idsLow);
        }

        // Resolved paces for future sessions change with fitness.
        const resolverLow = createResolver(fitnessLow, planLow.mp);
        const resolverHigh = createResolver(fitnessHigh, planHigh.mp);
        const subTAnchor: PaceAnchor = { kind: 'subT', column: 'rep10min' };
        const bandLow = resolverLow.band(subTAnchor)!;
        const bandHigh = resolverHigh.band(subTAnchor)!;
        expect(bandHigh.midSecPerKm).not.toBe(bandLow.midSecPerKm);
        // Fitter runner => faster (lower seconds-per-km) pace.
        expect(bandHigh.midSecPerKm).toBeLessThan(bandLow.midSecPerKm);
      });
    }
  }
});

describe('goal time does not affect prescription', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: goalFinishSec leaves weeks unchanged`, () => {
        const fitness = makeFitness();
        const planA = generateMarathonPlan(
          baseInput(tier, length, { fitness }),
        );
        const planB = generateMarathonPlan(
          baseInput(tier, length, {
            fitness,
            goalFinishSec: 3 * 3600 + 30 * 60,
          }),
        );
        expect(planB.weeks).toEqual(planA.weeks);
      });
    }
  }
});
