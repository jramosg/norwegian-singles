/**
 * Weekly quality load.
 *
 * Total quality should sit around a quarter of weekly volume, but kilometres
 * are not interchangeable. Thirty per cent of the week at subthreshold is
 * sustainable; thirty per cent at VO2max would wreck anyone. So quality is
 * weighted by physiological cost per kilometre before the share is taken,
 * with subthreshold as the unit.
 */

import { effortDistanceM, type PaceResolver } from './resolve';
import type { PaceAnchor, PlannedWeek, Segment } from './types';

/** Cost per kilometre relative to subthreshold long reps (= 1.0). */
export function intensityWeight(anchor: PaceAnchor): number {
  switch (anchor.kind) {
    case 'easy':
      return 0;
    case 'mp':
      // Marathon pace is slower than subthreshold for almost everyone, and
      // a float is slower still.
      if (anchor.pct <= 92) return 0.5;
      return 0.75;
    case 'subT':
      return { rep10min: 1, rep6min: 1.05, rep3min: 1.1 }[anchor.column];
    case 'race':
      return { '21K': 1.2, '10K': 1.5, '5K': 1.9, '3K': 2.2 }[anchor.distance];
    case 'effort':
      return {
        relaxed: 0.3,
        above_threshold: 1.6,
        hill_strong: 1.8,
        hill_max: 2.2,
        max_speed: 2.2,
      }[anchor.label];
  }
}

/**
 * Weighted quality as a share of weekly volume: the ceiling is 25%, and the
 * engine aims below it so that a rounding decision never pushes a week over.
 * The share ramps across the build rather than sitting at the top from week
 * one.
 */
export const QUALITY_SHARE_CEILING = 0.3;
/**
 * Calibrated against Copeland's base weeks, which carry roughly 29 km of
 * subthreshold work, about 30% of the week. All of it is at weight 1.0, so
 * the weighting lets that pass while still refusing 30% of VO2max work.
 */
const QUALITY_SHARE_FROM = 0.2;
const QUALITY_SHARE_TO = 0.27;

/** A down week takes load off, not just distance. */
const DELOAD_QUALITY_FACTOR = 0.85;

/** Weighted quality budget for a week, in metres, ramped across the build. */
export function weeklyQualityBudgetM(
  volumeM: number,
  weekNumber: number,
  lastBuildWeek: number,
  isDeload = false,
): number {
  const t =
    lastBuildWeek <= 1
      ? 1
      : Math.min(1, Math.max(0, (weekNumber - 1) / (lastBuildWeek - 1)));
  const share =
    QUALITY_SHARE_FROM + (QUALITY_SHARE_TO - QUALITY_SHARE_FROM) * t;
  return volumeM * share * (isDeload ? DELOAD_QUALITY_FACTOR : 1);
}

/**
 * How the week's quality budget is divided between its sessions. The
 * X-session takes the smallest slice because its cost per kilometre is the
 * highest, which is the whole reason the budget is weighted.
 */
export const SLOT_BUDGET_SHARE: Record<string, number> = {
  subT_long: 0.4,
  subT_medium: 0.34,
  subT_short: 0.3,
  x: 0.26,
  ms: 0.36,
  test: 0.26,
};

/**
 * Pace used to convert a distance budget into a session duration, in s/km.
 *
 * Deliberately a fixed reference rather than the runner's own subthreshold
 * pace: the dose must not depend on current fitness, or a fitness update
 * would change which *session* a runner does rather than only the pace they
 * run it at, and "your structure stays, your paces move" is the promise the
 * whole product rests on.
 */
export const REFERENCE_SUBT_PACE_SEC = 270;

/** Assumed cost per km for a slot, used to turn a budget into a dose. */
export const SLOT_ASSUMED_WEIGHT: Record<string, number> = {
  subT_long: 1,
  subT_medium: 1.05,
  subT_short: 1.1,
  x: 1.7,
  ms: 0.75,
  test: 1.9,
};

export interface QualityLoad {
  /** Raw quality distance, metres. */
  qualityM: number;
  /** Quality distance weighted by intensity, metres. */
  weightedM: number;
  /** Weighted quality as a share of weekly volume. */
  share: number;
}

function accumulate(
  segments: Segment[],
  r: PaceResolver,
  add: (metres: number, anchor: PaceAnchor) => void,
): void {
  for (const seg of segments) {
    if (seg.kind === 'steady') {
      add(effortDistanceM(seg, r), seg.anchor);
    } else if (seg.kind === 'interval') {
      const sets = seg.sets ?? 1;
      add(sets * seg.count * effortDistanceM(seg.work, r), seg.work.anchor);
      if (seg.recovery.anchor && seg.recovery.kind === 'float') {
        const each = effortDistanceM(
          {
            distanceM: seg.recovery.distanceM,
            durationSec: seg.recovery.durationSec,
            anchor: seg.recovery.anchor,
          },
          r,
        );
        add(sets * (seg.count - 1) * each, seg.recovery.anchor);
      }
    } else {
      for (const b of seg.blocks) add(effortDistanceM(b, r), b.anchor);
    }
  }
}

/**
 * Races and time trials are excluded: a 5K flat out is the point of the week,
 * not part of its training-quality budget, and coaches state the 20-30% rule
 * the same way. The generator drops such a week to two quality sessions for
 * exactly this reason.
 */
export function weeklyQualityLoad(
  week: PlannedWeek,
  r: PaceResolver,
): QualityLoad {
  let qualityM = 0;
  let weightedM = 0;
  for (const day of week.days) {
    if (!day.segments) continue;
    if (day.kind === 'race' || day.kind === 'test') continue;
    accumulate(day.segments, r, (metres, anchor) => {
      const weight = intensityWeight(anchor);
      if (weight === 0) return;
      qualityM += metres;
      weightedM += metres * weight;
    });
  }
  return {
    qualityM: Math.round(qualityM),
    weightedM: Math.round(weightedM),
    share: week.volumeM > 0 ? weightedM / week.volumeM : 0,
  };
}
