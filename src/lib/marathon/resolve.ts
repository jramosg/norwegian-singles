/**
 * Turns relative pace anchors into concrete pace bands, and estimates the
 * distance and duration of a session.
 *
 * Nothing here is stored on a plan: resolution happens at render time from
 * the current fitness estimate, which is what makes a fitness update
 * re-price every future week.
 */

import { getSubTPaces } from '../nsa-pace-table';
import { calculateTimeFromVDOT } from '../vdot';
import { DISTANCE_METERS } from '../../types';
import type {
  Effort,
  EffortLabel,
  FitnessEstimate,
  MarathonPaceBand,
  PaceAnchor,
  Recovery,
  Segment,
} from './types';

export interface PaceBand {
  fastSecPerKm: number;
  slowSecPerKm: number;
  midSecPerKm: number;
}

/** Subthreshold work is a narrow band; easy running is deliberately wide. */
const SUBT_SPREAD = 0.01;
const RACE_SPREAD = 0.01;
const EASY_SPREAD = 0.05;

export interface PaceResolver {
  /** Null for pure-effort work (hills, max-speed sprints). */
  band(anchor: PaceAnchor): PaceBand | null;
  mid(anchor: PaceAnchor): number | null;
  /** Always returns a usable pace, for distance/duration estimation only. */
  estimationPace(anchor: PaceAnchor): number;
  mp: MarathonPaceBand;
  fitness: FitnessEstimate;
}

function band(mid: number, spread: number): PaceBand {
  return {
    fastSecPerKm: Math.round(mid * (1 - spread)),
    slowSecPerKm: Math.round(mid * (1 + spread)),
    midSecPerKm: Math.round(mid),
  };
}

/**
 * Rough pace for effort-based work, used only so duration and distance
 * estimates stay finite. Never shown to the runner as a target.
 */
function effortEstimationPace(label: EffortLabel, fiveKPace: number): number {
  switch (label) {
    case 'max_speed':
    case 'hill_max':
      return fiveKPace * 0.85;
    case 'hill_strong':
    case 'above_threshold':
      return fiveKPace * 0.97;
    case 'relaxed':
      return fiveKPace * 1.35;
  }
}

export function createResolver(
  fitness: FitnessEstimate,
  mp: MarathonPaceBand,
): PaceResolver {
  const subT = getSubTPaces(fitness.fiveKEquivalentSec);
  const fiveKPace = fitness.fiveKEquivalentSec / 5;

  const racePace = (meters: number): number =>
    (calculateTimeFromVDOT(fitness.vdot, meters) / meters) * 1000;

  const resolveBand = (anchor: PaceAnchor): PaceBand | null => {
    switch (anchor.kind) {
      case 'subT':
        return band(subT[anchor.column], SUBT_SPREAD);
      case 'easy':
        return band(subT.easy, EASY_SPREAD);
      case 'race':
        return band(racePace(DISTANCE_METERS[anchor.distance]), RACE_SPREAD);
      case 'mp': {
        const factor = 100 / anchor.pct;
        return {
          fastSecPerKm: Math.round(mp.fastSecPerKm * factor),
          slowSecPerKm: Math.round(mp.slowSecPerKm * factor),
          midSecPerKm: Math.round(mp.midSecPerKm * factor),
        };
      }
      case 'effort':
        return null;
    }
  };

  return {
    band: resolveBand,
    mid: (anchor) => resolveBand(anchor)?.midSecPerKm ?? null,
    estimationPace: (anchor) =>
      anchor.kind === 'effort'
        ? effortEstimationPace(anchor.label, fiveKPace)
        : (resolveBand(anchor) as PaceBand).midSecPerKm,
    mp,
    fitness,
  };
}

// ---------------------------------------------------------------------------
// Distance and duration estimation
// ---------------------------------------------------------------------------

export function effortDistanceM(e: Effort, r: PaceResolver): number {
  if (e.distanceM !== undefined) return e.distanceM;
  const pace = r.estimationPace(e.anchor);
  return ((e.durationSec ?? 0) / pace) * 1000;
}

export function effortDurationSec(e: Effort, r: PaceResolver): number {
  if (e.durationSec !== undefined) return e.durationSec;
  const pace = r.estimationPace(e.anchor);
  return ((e.distanceM ?? 0) / 1000) * pace;
}

function recoveryDistanceM(rec: Recovery, r: PaceResolver): number {
  if (rec.distanceM !== undefined) return rec.distanceM;
  if (rec.kind === 'standing') return 0;
  const anchor: PaceAnchor = rec.anchor ?? { kind: 'easy' };
  const pace = r.estimationPace(anchor);
  return ((rec.durationSec ?? 0) / pace) * 1000;
}

function recoveryDurationSec(rec: Recovery, r: PaceResolver): number {
  if (rec.durationSec !== undefined) return rec.durationSec;
  const anchor: PaceAnchor = rec.anchor ?? { kind: 'easy' };
  const pace = r.estimationPace(anchor);
  return ((rec.distanceM ?? 0) / 1000) * pace;
}

export function segmentDistanceM(seg: Segment, r: PaceResolver): number {
  switch (seg.kind) {
    case 'steady':
      return effortDistanceM(seg, r);
    case 'interval': {
      const sets = seg.sets ?? 1;
      const perSet =
        seg.count * effortDistanceM(seg.work, r) +
        (seg.count - 1) * recoveryDistanceM(seg.recovery, r);
      const between =
        seg.setRecovery && sets > 1
          ? (sets - 1) * recoveryDistanceM(seg.setRecovery, r)
          : 0;
      return sets * perSet + between;
    }
    case 'progression': {
      const work = seg.blocks.reduce(
        (sum, b) => sum + effortDistanceM(b, r),
        0,
      );
      const rec = seg.recovery
        ? (seg.blocks.length - 1) * recoveryDistanceM(seg.recovery, r)
        : 0;
      return work + rec;
    }
  }
}

export function segmentDurationSec(seg: Segment, r: PaceResolver): number {
  switch (seg.kind) {
    case 'steady':
      return effortDurationSec(seg, r);
    case 'interval': {
      const sets = seg.sets ?? 1;
      const perSet =
        seg.count * effortDurationSec(seg.work, r) +
        (seg.count - 1) * recoveryDurationSec(seg.recovery, r);
      const between =
        seg.setRecovery && sets > 1
          ? (sets - 1) * recoveryDurationSec(seg.setRecovery, r)
          : 0;
      return sets * perSet + between;
    }
    case 'progression': {
      const work = seg.blocks.reduce(
        (sum, b) => sum + effortDurationSec(b, r),
        0,
      );
      const rec = seg.recovery
        ? (seg.blocks.length - 1) * recoveryDurationSec(seg.recovery, r)
        : 0;
      return work + rec;
    }
  }
}

export function sessionDistanceM(segments: Segment[], r: PaceResolver): number {
  return Math.round(
    segments.reduce((sum, s) => sum + segmentDistanceM(s, r), 0),
  );
}

export function sessionDurationSec(
  segments: Segment[],
  r: PaceResolver,
): number {
  return Math.round(
    segments.reduce((sum, s) => sum + segmentDurationSec(s, r), 0),
  );
}

/**
 * Quality minutes in a session: everything that is not easy running or
 * recovery. This is what the tier's quality budget is measured against.
 */
export function qualityMinutes(segments: Segment[], r: PaceResolver): number {
  let seconds = 0;
  for (const seg of segments) {
    if (seg.kind === 'steady') {
      if (seg.anchor.kind !== 'easy') seconds += effortDurationSec(seg, r);
    } else if (seg.kind === 'interval') {
      const sets = seg.sets ?? 1;
      if (seg.work.anchor.kind !== 'easy') {
        seconds += sets * seg.count * effortDurationSec(seg.work, r);
      }
    } else {
      for (const b of seg.blocks) {
        if (b.anchor.kind !== 'easy') seconds += effortDurationSec(b, r);
      }
    }
  }
  return Math.round(seconds / 60);
}
