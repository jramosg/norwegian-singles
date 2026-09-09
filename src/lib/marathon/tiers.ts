/**
 * Volume tiers for the marathon plans.
 *
 * The tier number *is* the peak weekly volume in km, hit twice in the
 * marathon-specific phase. The published band around it is the suitability
 * range: runners peaking anywhere inside it belong in this tier, since where
 * exactly an individual peaks varies. Mean weekly volume across a build lands
 * around 85% of peak, which is what a healthy marathon block looks like.
 */

import type { TierId } from './types';

export interface TierSpec {
  id: TierId;
  /** Number in the tier name, in km — the peak weekly volume. */
  nominalKm: number;
  /** Published suitability band, km. The generated peak sits inside it. */
  bandMinKm: number;
  bandMaxKm: number;
  /** Peak weekly volume used by the generator, in metres. */
  peakM: number;
  /** Running days per week (excluding second runs). */
  runDays: number;
  /** Subthreshold quality minutes per session, start → peak of the build. */
  qualityMinFrom: number;
  qualityMinTo: number;
  /** Long-run ceiling, metres. */
  longRunCapM: number;
  /** Second easy runs per week, added on non-quality days only. */
  doublesPerWeek: number;
  /** Hill-sprint reps in the general phase (never above 10). */
  hillSprintReps: number;
}

export const TIER_IDS: readonly TierId[] = [
  'singles75',
  'singles95',
  'singles120',
  'singles140',
] as const;

export const TIERS: Record<TierId, TierSpec> = {
  singles75: {
    id: 'singles75',
    nominalKm: 75,
    bandMinKm: 65,
    bandMaxKm: 80,
    peakM: 75_000,
    runDays: 6,
    qualityMinFrom: 20,
    qualityMinTo: 30,
    longRunCapM: 30_000,
    doublesPerWeek: 0,
    hillSprintReps: 5,
  },
  singles95: {
    id: 'singles95',
    nominalKm: 95,
    bandMinKm: 90,
    bandMaxKm: 105,
    peakM: 95_000,
    runDays: 7,
    qualityMinFrom: 25,
    qualityMinTo: 35,
    longRunCapM: 32_000,
    doublesPerWeek: 0,
    hillSprintReps: 6,
  },
  singles120: {
    id: 'singles120',
    nominalKm: 120,
    bandMinKm: 115,
    bandMaxKm: 130,
    peakM: 120_000,
    runDays: 7,
    qualityMinFrom: 30,
    qualityMinTo: 40,
    longRunCapM: 34_000,
    doublesPerWeek: 1,
    hillSprintReps: 8,
  },
  singles140: {
    id: 'singles140',
    nominalKm: 140,
    bandMinKm: 135,
    bandMaxKm: 150,
    peakM: 140_000,
    runDays: 7,
    qualityMinFrom: 35,
    qualityMinTo: 45,
    longRunCapM: 38_000,
    doublesPerWeek: 3,
    hillSprintReps: 9,
  },
};

export function getTier(id: TierId): TierSpec {
  return TIERS[id];
}

/** Ascending tier rank, used for `minTier` gates on session archetypes. */
export function tierRank(id: TierId): number {
  return TIER_IDS.indexOf(id);
}

/** True when `id` is at least as high a volume tier as `min`. */
export function tierAtLeast(id: TierId, min: TierId): boolean {
  return tierRank(id) >= tierRank(min);
}
