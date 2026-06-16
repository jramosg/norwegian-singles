/**
 * Plan Generator — composes paces + hours-based weekly plan into a SavedPlan.
 */

import type { UserInput, TrainingPaces, SavedPlan } from '../types';
import { DISTANCE_METERS, MIN_CUSTOM_DISTANCE_METERS } from '../types';
import { getSubTPaces, estimate5KFrom10K } from './nsa-pace-table';
import { parseTime } from './paces';
import { calculateTimeFromVDOT, calculateVDOT } from './vdot';

const metersFromCustomDistance = (input: UserInput): number => {
  if (
    typeof input.customDistance === 'number' &&
    Number.isFinite(input.customDistance)
  ) {
    return (
      input.customDistance *
      (input.customDistanceUnit === 'mile' ? 1609.344 : 1000)
    );
  }

  return (input.customDistanceKm || 0) * 1000;
};

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
export function resolve5KSeconds(input: UserInput): number {
  if (input.raceTime && input.raceDistance) {
    const t = parseTime(input.raceTime);
    if (!t || t <= 0) throw new Error('Invalid race time.');

    if (input.raceDistance === '5K') return t;

    const distanceMeters =
      input.raceDistance === 'custom'
        ? metersFromCustomDistance(input)
        : DISTANCE_METERS[input.raceDistance];

    if (
      !Number.isFinite(distanceMeters) ||
      distanceMeters < MIN_CUSTOM_DISTANCE_METERS
    ) {
      throw new Error('Invalid race distance.');
    }

    const vdot = calculateVDOT(distanceMeters, t);
    return calculateTimeFromVDOT(vdot, DISTANCE_METERS['5K']);
  }

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
