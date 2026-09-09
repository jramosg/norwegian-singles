import { describe, it, expect } from 'vitest';
import { calculateVDOT, calculateTimeFromVDOT } from '../../vdot';
import { generateMarathonPlan } from '../generate';
import { DEFAULT_STRENGTH } from '../strength';
import { TIER_IDS } from '../tiers';
import { PLAN_LENGTHS } from '../phases';
import type {
  FitnessEstimate,
  MarathonPlanInput,
  PlanLength,
  StrengthOptions,
  TierId,
} from '../types';

// ---------------------------------------------------------------------------
// Shared test helpers
// ---------------------------------------------------------------------------

function makeFitness(): FitnessEstimate {
  const vdot = calculateVDOT(10_000, 2400); // 40:00 10K
  const fiveKEquivalentSec = calculateTimeFromVDOT(vdot, 5000);
  return {
    vdot,
    fiveKEquivalentSec,
    source: 'race',
    updatedAt: '2026-01-01T00:00:00.000Z',
    setAtWeek: 1,
  };
}

function inputWithStrength(
  tier: TierId,
  lengthWeeks: PlanLength,
  strength: StrengthOptions,
): MarathonPlanInput {
  return {
    tier,
    lengthWeeks,
    unit: 'km',
    fitness: makeFitness(),
    strength,
  };
}

/** Rep count parsed from a hill-sprint prescription: "8 x 10 s at ..." -> 8,
 * "5-6 x 10 s at ..." -> 6 (the upper end of the maintenance range). */
function parseHillSprintReps(prescription: string): number {
  const match = /^(\d+)(?:-(\d+))?\s*x\s*10\b/.exec(prescription);
  if (!match) throw new Error(`Unparseable prescription: ${prescription}`);
  return Number(match[2] ?? match[1]);
}

// ---------------------------------------------------------------------------

describe('strength: everything off', () => {
  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: no day has strength when all modalities are off`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, DEFAULT_STRENGTH),
        );
        for (const week of plan.weeks) {
          for (const day of week.days) {
            expect(day.strength).toBeUndefined();
          }
        }
      });
    }
  }
});

describe('strength: lifting placement', () => {
  const strength: StrengthOptions = {
    lifting: true,
    plyometrics: false,
    hillSprints: false,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: lifting only ever lands on quality days`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );
        for (const week of plan.weeks) {
          for (const day of week.days) {
            const hasLifting = day.strength?.some(
              (s) => s.modality === 'lifting',
            );
            if (hasLifting) expect(day.isQuality).toBe(true);
          }
        }
      });
    }
  }
});

describe('strength: plyometrics placement', () => {
  const strength: StrengthOptions = {
    lifting: false,
    plyometrics: true,
    hillSprints: false,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: plyometrics never precede a quality day`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );
        for (const week of plan.weeks) {
          for (let i = 0; i < week.days.length; i++) {
            const hasPlyo = week.days[i].strength?.some(
              (s) => s.modality === 'plyometrics',
            );
            if (hasPlyo) {
              const next = week.days[i + 1];
              if (next) expect(next.isQuality).toBe(false);
            }
          }
        }
      });
    }
  }
});

describe('strength: hill sprints never in race week', () => {
  const strength: StrengthOptions = {
    lifting: false,
    plyometrics: false,
    hillSprints: true,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: zero hill sprints in the final week`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );
        const raceWeek = plan.weeks[plan.weeks.length - 1];
        for (const day of raceWeek.days) {
          const hasHills = day.strength?.some(
            (s) => s.modality === 'hill_sprints',
          );
          expect(hasHills).toBeFalsy();
        }
      });
    }
  }
});

describe('strength: lifting dose', () => {
  const strength: StrengthOptions = {
    lifting: true,
    plyometrics: false,
    hillSprints: false,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: lifting is 'maintenance' in specific/taper weeks, never in base`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );
        for (const week of plan.weeks) {
          for (const day of week.days) {
            const lifting = day.strength?.find((s) => s.modality === 'lifting');
            if (!lifting) continue;
            if (week.phase === 'specific' || week.phase === 'taper') {
              expect(lifting.dose).toBe('maintenance');
            }
            if (week.phase === 'base') {
              expect(lifting.dose).not.toBe('maintenance');
            }
          }
        }
      });
    }
  }
});

describe('strength: hill sprint rep progression', () => {
  const strength: StrengthOptions = {
    lifting: false,
    plyometrics: false,
    hillSprints: true,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: rep counts never exceed 10 and never grow by more than 1 week-to-week`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );

        const repsByWeek: number[] = [];
        for (const week of plan.weeks) {
          for (const day of week.days) {
            const hill = day.strength?.find(
              (s) => s.modality === 'hill_sprints',
            );
            if (hill) {
              repsByWeek[week.weekNumber - 1] = parseHillSprintReps(
                hill.prescription,
              );
            }
          }
        }

        for (const reps of repsByWeek) {
          if (reps !== undefined) expect(reps).toBeLessThanOrEqual(10);
        }

        for (let i = 1; i < repsByWeek.length; i++) {
          if (repsByWeek[i] === undefined || repsByWeek[i - 1] === undefined) {
            continue;
          }
          expect(repsByWeek[i] - repsByWeek[i - 1]).toBeLessThanOrEqual(1);
        }
      });
    }
  }
});

describe('strength: inexperienced hill-sprint ramp', () => {
  const INTRO_PRESCRIPTIONS = [
    '4 x 10 s at 75-90% max speed, 1-2 min walk recovery',
    '4 x 10 s at 80-95% max speed, 1-2 min walk recovery',
    '5 x 10 s at 80-98% max speed, 1-2 min walk recovery',
    '5 x 10 s at 85-100% max speed, 1-2 min walk recovery',
    '6 x 10 s at 85-100% max speed, 1-2 min walk recovery',
  ];

  const strength: StrengthOptions = {
    lifting: false,
    plyometrics: false,
    hillSprints: true,
    hillSprintsInexperienced: true,
  };

  for (const tier of TIER_IDS) {
    for (const length of PLAN_LENGTHS) {
      it(`${tier} ${length}wk: weeks 1-5 follow the introductory progression`, () => {
        const plan = generateMarathonPlan(
          inputWithStrength(tier, length, strength),
        );
        for (let weekNumber = 1; weekNumber <= 5; weekNumber++) {
          const week = plan.weeks[weekNumber - 1];
          const hillDay = week.days.find((d) =>
            d.strength?.some((s) => s.modality === 'hill_sprints'),
          );
          const hill = hillDay?.strength?.find(
            (s) => s.modality === 'hill_sprints',
          );
          expect(hill).toBeDefined();
          expect(hill!.dose).toBe('intro');
          expect(hill!.prescription).toBe(INTRO_PRESCRIPTIONS[weekNumber - 1]);
        }
      });
    }
  }
});
