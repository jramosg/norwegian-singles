/**
 * Plan Generator — composes paces + hours-based weekly plan into a SavedPlan.
 */

import type { UserInput, TrainingPaces, SavedPlan } from '../types';
import { getSubTPaces, estimate5KFrom10K } from './nsa-pace-table';
import { parseTime } from './paces';

/**
 * Create a training plan from user input.
 * Resolves 5K time directly or estimates it from 10K, then looks up
 * NSA/NSM-style training paces.
 */
export function createPlan(input: UserInput): SavedPlan {
  const fiveKSeconds = resolve5KSeconds(input);
  const subT = getSubTPaces(fiveKSeconds);

  const paces: TrainingPaces = {
    fiveKSeconds,
    rep3min: subT.rep3min,
    rep6min: subT.rep6min,
    rep10min: subT.rep10min,
    easy: subT.easy,
    marathonPace: subT.marathonPace,
  };

  const now = new Date().toISOString();
  return { input, paces, createdAt: now, updatedAt: now };
}

/**
 * Resolve 5K time in seconds from user input.
 * Preference: explicit 5K → estimate from 10K.
 */
function resolve5KSeconds(input: UserInput): number {
  if (input.time5K) {
    const t = parseTime(input.time5K);
    if (t && t > 0) return t;
  }
  if (input.time10K) {
    const t = parseTime(input.time10K);
    if (t && t > 0) return estimate5KFrom10K(t);
  }
  throw new Error('Provide at least a 5K or 10K time.');
}
