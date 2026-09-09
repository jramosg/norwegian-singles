/**
 * Phase layout and weekly volume curve.
 *
 * The shape: start with everything subthreshold plus an easy long run,
 * introduce marathon-specific work, then let one big weekend session become
 * the centre of the week, then taper.
 */

import { getTier } from './tiers';
import type { PhaseId, PlanLength, TierId } from './types';

export interface PhaseSpan {
  phase: PhaseId;
  /** 1-based, inclusive. */
  fromWeek: number;
  toWeek: number;
}

/** Phase spans per plan length. Marathon is the last day of the last week. */
const LAYOUTS: Record<PlanLength, PhaseSpan[]> = {
  18: [
    { phase: 'base', fromWeek: 1, toWeek: 6 },
    { phase: 'supportive', fromWeek: 7, toWeek: 11 },
    { phase: 'specific', fromWeek: 12, toWeek: 15 },
    { phase: 'taper', fromWeek: 16, toWeek: 18 },
  ],
  15: [
    { phase: 'base', fromWeek: 1, toWeek: 5 },
    { phase: 'supportive', fromWeek: 6, toWeek: 9 },
    { phase: 'specific', fromWeek: 10, toWeek: 13 },
    { phase: 'taper', fromWeek: 14, toWeek: 15 },
  ],
  12: [
    { phase: 'base', fromWeek: 1, toWeek: 4 },
    { phase: 'supportive', fromWeek: 5, toWeek: 7 },
    { phase: 'specific', fromWeek: 8, toWeek: 10 },
    { phase: 'taper', fromWeek: 11, toWeek: 12 },
  ],
};

export const PLAN_LENGTHS: readonly PlanLength[] = [12, 15, 18] as const;

export function getPhaseLayout(lengthWeeks: PlanLength): PhaseSpan[] {
  return LAYOUTS[lengthWeeks];
}

export function phaseForWeek(
  lengthWeeks: PlanLength,
  weekNumber: number,
): PhaseId {
  const span = LAYOUTS[lengthWeeks].find(
    (s) => weekNumber >= s.fromWeek && weekNumber <= s.toWeek,
  );
  if (!span) throw new Error(`Week ${weekNumber} is outside the plan.`);
  return span.phase;
}

export function phaseSpan(lengthWeeks: PlanLength, phase: PhaseId): PhaseSpan {
  const span = LAYOUTS[lengthWeeks].find((s) => s.phase === phase);
  if (!span) throw new Error(`No ${phase} phase in a ${lengthWeeks}wk plan.`);
  return span;
}

/** Weeks of taper, i.e. the length of P4. */
export function taperWeeks(lengthWeeks: PlanLength): number {
  const span = phaseSpan(lengthWeeks, 'taper');
  return span.toWeek - span.fromWeek + 1;
}

/** Last week of building before the taper begins. */
export function lastBuildWeek(lengthWeeks: PlanLength): number {
  return lengthWeeks - taperWeeks(lengthWeeks);
}

// ---------------------------------------------------------------------------
// Volume curve
// ---------------------------------------------------------------------------

/** Week 1 as a fraction of peak. */
const START_FRACTION = 0.73;
/** Down-week multiplier applied to the ramp value. */
const DELOAD_FACTOR = 0.82;
/** Taper fractions of peak, indexed by taper length. */
const TAPER_FRACTIONS: Record<number, number[]> = {
  2: [0.68, 0.45],
  3: [0.8, 0.62, 0.45],
};

/**
 * Deload every fourth week of the build, but never on a peak week and never
 * on the final build week. In the marathon-specific phase this same week is
 * where the big weekend session steps down to a plain long run, so volume
 * and session load come off together.
 */
export function isDeloadWeek(
  lengthWeeks: PlanLength,
  weekNumber: number,
): boolean {
  const lastBuild = lastBuildWeek(lengthWeeks);
  if (weekNumber > lastBuild) return false;
  if (weekNumber === lastBuild) return false;
  if (peakWeeks(lengthWeeks).includes(weekNumber)) return false;
  return weekNumber % 4 === 0;
}

/** The two weeks that hit full peak volume, both inside P3. */
export function peakWeeks(lengthWeeks: PlanLength): number[] {
  const lastBuild = lastBuildWeek(lengthWeeks);
  return [lastBuild - 2, lastBuild];
}

/** Planned volume for a week, in metres. */
export function weekVolumeM(
  tierId: TierId,
  lengthWeeks: PlanLength,
  weekNumber: number,
): number {
  const { peakM } = getTier(tierId);
  const lastBuild = lastBuildWeek(lengthWeeks);

  if (weekNumber > lastBuild) {
    // Race week budgets only the running *around* the marathon; the race
    // itself is added on top, so the fraction here stays deliberately small.
    if (weekNumber === lengthWeeks) return Math.round(peakM * 0.25);
    const fractions = TAPER_FRACTIONS[taperWeeks(lengthWeeks)];
    const idx = weekNumber - lastBuild - 1;
    return Math.round(peakM * fractions[idx]);
  }

  if (peakWeeks(lengthWeeks).includes(weekNumber)) return peakM;

  const ramp =
    lastBuild === 1
      ? 1
      : START_FRACTION +
        (1 - START_FRACTION) * ((weekNumber - 1) / (lastBuild - 1));
  const factor = isDeloadWeek(lengthWeeks, weekNumber) ? DELOAD_FACTOR : 1;
  return Math.round(Math.min(peakM, peakM * ramp * factor));
}

/**
 * Long run target for a week, in metres: a share of weekly volume, clamped to
 * the tier ceiling. In the taper the long run comes down faster than volume.
 */
export function longRunM(
  tierId: TierId,
  lengthWeeks: PlanLength,
  weekNumber: number,
): number {
  const tier = getTier(tierId);
  const volume = weekVolumeM(tierId, lengthWeeks, weekNumber);
  const phase = phaseForWeek(lengthWeeks, weekNumber);
  // In the supportive phase the weekend already carries a marathon-specific
  // session, so the long run gives ground rather than stacking on top of it.
  const share = phase === 'taper' ? 0.2 : phase === 'supportive' ? 0.21 : 0.26;
  return Math.round(Math.min(tier.longRunCapM, volume * share));
}

/**
 * Subthreshold quality minutes for a session this week, ramping from the
 * tier's floor to its ceiling across the build.
 */
export function qualityMinutes(
  tierId: TierId,
  lengthWeeks: PlanLength,
  weekNumber: number,
): number {
  const tier = getTier(tierId);
  const lastBuild = lastBuildWeek(lengthWeeks);
  // Taper keeps intensity but cuts the dose hard.
  if (weekNumber > lastBuild) return Math.round(tier.qualityMinFrom * 0.7);
  const t = lastBuild === 1 ? 1 : (weekNumber - 1) / (lastBuild - 1);
  const span = tier.qualityMinTo - tier.qualityMinFrom;
  return Math.round(tier.qualityMinFrom + span * t);
}

/**
 * Test weeks: two in the base phase and one closing the supportive phase.
 * On these weeks the third session becomes a parkrun / time trial, and the
 * plan offers a fitness check-in. Never mandatory, the session ships with a
 * self-administered substitute.
 */
export function isTestWeek(
  lengthWeeks: PlanLength,
  weekNumber: number,
): boolean {
  const base = phaseSpan(lengthWeeks, 'base');
  const supportive = phaseSpan(lengthWeeks, 'supportive');
  if (weekNumber === base.toWeek) return true;
  if (weekNumber === supportive.toWeek) return true;
  // A mid-base test only earns its place when the base phase is long enough
  // that a runner would otherwise go six weeks without a reference point.
  const baseLength = base.toWeek - base.fromWeek + 1;
  if (baseLength < 6) return false;
  return weekNumber === Math.floor((base.fromWeek + base.toWeek) / 2);
}

/** Phase boundaries are where the fitness check-in card is surfaced. */
export function isPhaseBoundary(
  lengthWeeks: PlanLength,
  weekNumber: number,
): boolean {
  return LAYOUTS[lengthWeeks].some((s) => s.toWeek === weekNumber);
}
