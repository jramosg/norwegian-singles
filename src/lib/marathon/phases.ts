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

/**
 * Volume progression.
 *
 * Three weeks up, one week back, in four-week blocks. Each block opens higher
 * than the last, and the down week returns to the block's own opening volume
 * rather than dropping below it.
 *
 * The earlier version ramped almost flat (about 2 km a week) and then applied
 * a multiplicative down week, so coming out of a deload was a 21 km jump on a
 * 95 km plan while normal progression was 2 km. This keeps every week-to-week
 * change inside roughly 8% of peak.
 */
const START_FRACTION = 0.72;
/** Step between consecutive weeks inside a block. */
const WEEK_STEP = 0.03;
const BLOCK_LENGTH = 4;

/** Taper weeks before race week, as fractions of peak. */
const TAPER_FRACTIONS: Record<number, number[]> = {
  1: [],
  2: [0.72],
  3: [0.82, 0.65],
};
/**
 * Race week counts only the running around the marathon; the race is added on
 * top. Kept generous enough that nobody arrives feeling flat.
 */
const RACE_WEEK_FRACTION = 0.3;

/** Position inside the four-week block, 0-based; 3 is the down week. */
function positionInBlock(weekNumber: number): number {
  return (weekNumber - 1) % BLOCK_LENGTH;
}

/**
 * A down week is the fourth week of a block, and never the last build week:
 * stepping back immediately before the taper wastes the final chance to
 * consolidate.
 */
export function isDeloadWeek(
  lengthWeeks: PlanLength,
  weekNumber: number,
): boolean {
  const lastBuild = lastBuildWeek(lengthWeeks);
  if (weekNumber >= lastBuild) return false;
  if (peakWeeks(lengthWeeks).includes(weekNumber)) return false;
  return positionInBlock(weekNumber) === BLOCK_LENGTH - 1;
}

/** The weeks that reach full peak volume, both in the final block. */
export function peakWeeks(lengthWeeks: PlanLength): number[] {
  const lastBuild = lastBuildWeek(lengthWeeks);
  return lastBuild > 1 ? [lastBuild - 1, lastBuild] : [lastBuild];
}

/** Fraction of peak volume for a build week. */
function buildFraction(lengthWeeks: PlanLength, weekNumber: number): number {
  const lastBuild = lastBuildWeek(lengthWeeks);
  if (peakWeeks(lengthWeeks).includes(weekNumber)) return 1;

  const blocks = Math.max(1, Math.ceil(lastBuild / BLOCK_LENGTH));
  const block = Math.floor((weekNumber - 1) / BLOCK_LENGTH);
  const position = positionInBlock(weekNumber);

  // Where each block opens, ramped so the final block's closing weeks land
  // on the peak.
  const topOfLastBlock = 1 - WEEK_STEP * (BLOCK_LENGTH - 2);
  const blockOpen =
    blocks <= 1
      ? START_FRACTION
      : START_FRACTION +
        (topOfLastBlock - START_FRACTION) * (block / (blocks - 1));

  // Positions 0 to 2 climb; position 3 steps back to the block's opening.
  const step = position === BLOCK_LENGTH - 1 ? 0 : position;
  return Math.min(1, blockOpen + WEEK_STEP * step);
}

/** Planned volume for a week, in metres. */
export function weekVolumeM(
  tierId: TierId,
  lengthWeeks: PlanLength,
  weekNumber: number,
): number {
  const { peakM } = getTier(tierId);
  const lastBuild = lastBuildWeek(lengthWeeks);

  if (weekNumber === lengthWeeks) {
    return Math.round(peakM * RACE_WEEK_FRACTION);
  }
  if (weekNumber > lastBuild) {
    const fractions = TAPER_FRACTIONS[taperWeeks(lengthWeeks)] ?? [0.72];
    const idx = weekNumber - lastBuild - 1;
    return Math.round(peakM * (fractions[idx] ?? 0.65));
  }

  return Math.round(peakM * buildFraction(lengthWeeks, weekNumber));
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
  // Copeland's long run is about 22% of his week. A quarter of the week in
  // one run, on top of three quality sessions, leaves nothing easy.
  const share = phase === 'taper' ? 0.2 : phase === 'supportive' ? 0.21 : 0.23;
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
