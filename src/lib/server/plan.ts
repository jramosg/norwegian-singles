/**
 * Building a bought plan.
 *
 * Plans are never stored. They are regenerated from the order's inputs plus
 * the current fitness estimate on every view, which is what lets an engine
 * fix reach a plan that has already been sold, and what makes a fitness
 * update re-price every remaining week.
 */

import { generateMarathonPlan } from '../marathon/generate';
import { calculateTimeFromVDOT, calculateVDOT } from '../vdot';
import type {
  FitnessEstimate,
  MarathonPlan,
  PlanLength,
} from '../marathon/types';
import {
  currentFitness,
  getFitnessHistory,
  type FitnessRecord,
  type Order,
} from './entitlements';
import type { Db } from './db';
import { getDb } from './db';

/** The estimate implied by the race result the plan was bought with. */
export function purchaseFitness(order: Order): FitnessEstimate {
  const { raceDistanceM, raceTimeSec } = order.planInputs;
  const vdot = calculateVDOT(raceDistanceM, raceTimeSec);
  return {
    vdot,
    fiveKEquivalentSec: calculateTimeFromVDOT(vdot, 5000),
    source: 'race',
    updatedAt: order.createdAt,
    setAtWeek: 1,
  };
}

export interface OrderPlan {
  plan: MarathonPlan;
  fitness: FitnessEstimate;
  history: FitnessRecord[];
}

export function planForOrder(order: Order, db: Db = getDb()): OrderPlan {
  const history = getFitnessHistory(order.id, db);
  const latest = currentFitness(order.id, db);

  const fitness: FitnessEstimate = latest
    ? {
        vdot: latest.vdot,
        fiveKEquivalentSec: latest.fiveKSeconds,
        source: latest.source,
        updatedAt: latest.createdAt,
        setAtWeek: latest.setAtWeek,
      }
    : purchaseFitness(order);

  const plan = generateMarathonPlan({
    tier: order.planInputs.tier,
    lengthWeeks: order.planInputs.lengthWeeks as PlanLength,
    marathonDate: order.planInputs.marathonDate,
    unit: order.planInputs.unit,
    fitness,
    goalFinishSec: order.planInputs.goalFinishSec,
  });

  return { plan, fitness, history };
}

/**
 * Which plan week a date falls in, or null when the build has not started or
 * is already over. Used to point a runner at today rather than at week one.
 */
export function currentWeekNumber(
  plan: MarathonPlan,
  today = new Date(),
): number | null {
  const iso = today.toISOString().slice(0, 10);
  for (const week of plan.weeks) {
    const dates = week.days.map((d) => d.date).filter(Boolean) as string[];
    if (dates.length === 0) continue;
    if (iso >= dates[0] && iso <= dates[dates.length - 1]) {
      return week.weekNumber;
    }
  }
  return null;
}
