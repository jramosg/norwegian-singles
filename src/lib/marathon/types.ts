/**
 * Type model for the generated NSM marathon plans.
 *
 * Design rule: a session never stores an absolute pace. It stores a
 * *relative anchor* (subthreshold column, race pace, % of marathon pace)
 * and the pace band is computed at render time from the runner's current
 * fitness estimate. Updating fitness therefore re-prices every future
 * week without touching the plan structure.
 */

import type { Unit } from '../../types';

export type TierId = 'singles75' | 'singles95' | 'singles120' | 'singles140';

/** Supported build lengths in weeks. */
export type PlanLength = 12 | 15 | 18;

/**
 * P1 base   — everything subthreshold, no marathon-pace work
 * P2 supportive — 2 subT + a moderate marathon-specific session
 * P3 specific   — 1 subT + one big marathon-specific session (2 quality)
 * P4 taper      — reduced volume, intensity retained in small doses
 */
export type PhaseId = 'base' | 'supportive' | 'specific' | 'taper';

/** Monday = 0 … Sunday = 6, matching the existing weekly plans. */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// ---------------------------------------------------------------------------
// Pace anchors
// ---------------------------------------------------------------------------

/** Subthreshold columns from the existing NSM pace table. */
export type SubTColumn = 'rep3min' | 'rep6min' | 'rep10min';

/** Race-pace anchors resolved through VDOT. */
export type RaceAnchorDistance = '3K' | '5K' | '10K' | '21K';

/**
 * A relative pace anchor.
 *
 * `mp.pct` is a percentage of marathon-pace *speed*: 100 is marathon pace,
 * 90 is slower (a steady long-run effort), 105 is faster. Resolution is
 * therefore `mpSecPerKm * 100 / pct`.
 */
export type PaceAnchor =
  | { kind: 'subT'; column: SubTColumn }
  | { kind: 'race'; distance: RaceAnchorDistance }
  | { kind: 'mp'; pct: number }
  | { kind: 'easy' }
  /** Efforts with no meaningful pace band: hills, max-speed sprints. */
  | { kind: 'effort'; label: EffortLabel };

export type EffortLabel =
  | 'hill_strong'
  | 'hill_max'
  | 'max_speed'
  | 'above_threshold'
  | 'relaxed';

// ---------------------------------------------------------------------------
// Session structure
// ---------------------------------------------------------------------------

export type RecoveryKind = 'jog' | 'walk' | 'easy' | 'float' | 'standing';

export interface Recovery {
  kind: RecoveryKind;
  durationSec?: number;
  distanceM?: number;
  /** Float recoveries run at a real pace rather than easy jogging. */
  anchor?: PaceAnchor;
}

/** One measured piece of running. Exactly one of distanceM/durationSec. */
export interface Effort {
  distanceM?: number;
  durationSec?: number;
  anchor: PaceAnchor;
}

export type Segment =
  /** A single continuous block: warm-up, cool-down, steady MP run, long run. */
  | ({ kind: 'steady'; label?: string } & Effort)
  /** count × work with recovery between; sets repeat the whole group. */
  | {
      kind: 'interval';
      count: number;
      work: Effort;
      recovery: Recovery;
      sets?: number;
      setRecovery?: Recovery;
      label?: string;
    }
  /** Ordered blocks at changing intensity: 8-8-8-8 km @ 90/94/98/100% MP. */
  | {
      kind: 'progression';
      blocks: Effort[];
      recovery?: Recovery;
      label?: string;
    };

// ---------------------------------------------------------------------------
// Session archetypes
// ---------------------------------------------------------------------------

export type SessionKind = 'subT' | 'x' | 'ms' | 'test';

/** subT families drive the weekly rotation (long reps Tue, shorter Thu). */
export type SubTFamily = 'long' | 'medium' | 'short';

export interface SessionContext {
  tier: TierId;
  phase: PhaseId;
  /** 1-based week number within the whole build. */
  weekNumber: number;
  /** 0-based index of this week within its phase — drives progression. */
  weekInPhase: number;
  /** Total weeks in this phase. */
  phaseWeeks: number;
  /** Planned volume for the week, in metres. */
  weekVolumeM: number;
  /**
   * Minutes of quality work this session should contain, derived from the
   * week's weighted quality budget rather than from the tier alone.
   */
  qualityMin: number;
  /**
   * Metres of *quality* running allocated to this session, at this session's
   * own intensity. Every archetype scales its rep count from this rather than
   * hardcoding one, which is what keeps a 56 km week and a 140 km week both
   * inside the weighted quality ceiling.
   */
  workM: number;
  /** Long-run ceiling for the tier, in metres. */
  longRunCapM: number;
}

export interface SessionArchetype {
  id: string;
  kind: SessionKind;
  family?: SubTFamily;
  /** Phases this archetype may appear in. */
  phases: PhaseId[];
  /** Lowest tier allowed to see this session. */
  minTier?: TierId;
  /** Session only makes sense above this quality budget, in minutes. */
  minQualityMin?: number;
  /** i18n key for the one-line purpose shown on every session. */
  whyKey: string;
  /** i18n keys for documented substitutions (no hill, treadmill, travel). */
  substitutionKeys?: string[];
  /** Requires a hill; used to offer substitutions up front. */
  needsHill?: boolean;
  /** Requires a parkrun/race; never scheduled as mandatory. */
  needsEvent?: boolean;
  build(ctx: SessionContext): Segment[];
}

// ---------------------------------------------------------------------------
// Fitness
// ---------------------------------------------------------------------------

export type FitnessSource = 'race' | 'time_trial' | 'checkin' | 'manual';

export interface FitnessEstimate {
  vdot: number;
  /** 5K equivalent in seconds — the key into the NSM pace table. */
  fiveKEquivalentSec: number;
  source: FitnessSource;
  /** ISO timestamp. */
  updatedAt: string;
  /** Week number this estimate took effect from. */
  setAtWeek: number;
}

/** Marathon pace expressed as a band, never a single optimistic number. */
export interface MarathonPaceBand {
  /** Faster end, s/km. */
  fastSecPerKm: number;
  /** Slower end, s/km. */
  slowSecPerKm: number;
  /** Midpoint used to resolve `mp` anchors, s/km. */
  midSecPerKm: number;
  /** Riegel exponent used, for transparency. */
  exponent: number;
  /** Predicted finish time in seconds, from midSecPerKm. */
  predictedFinishSec: number;
}

// ---------------------------------------------------------------------------
// Strength
// ---------------------------------------------------------------------------

export type StrengthModality = 'lifting' | 'plyometrics' | 'hill_sprints';

export interface StrengthItem {
  modality: StrengthModality;
  /** 'full' or 'maintenance' dose. */
  dose: 'intro' | 'full' | 'maintenance';
  /** Rendered prescription, e.g. '3 x 4 @ 4RM'. */
  prescription: string;
  /** Placement relative to the run. */
  timing: 'after_run' | 'separate_session';
  notesKey?: string;
}

export interface StrengthOptions {
  lifting: boolean;
  plyometrics: boolean;
  hillSprints: boolean;
  /** No prior hill-sprint experience triggers the 5-week intro ramp. */
  hillSprintsInexperienced?: boolean;
}

// ---------------------------------------------------------------------------
// Generated plan
// ---------------------------------------------------------------------------

export type DayKind =
  | 'rest'
  | 'easy'
  | 'long'
  | 'subT'
  | 'x'
  | 'ms'
  | 'test'
  | 'race';

export interface SecondRun {
  targetDistanceM: number;
  anchor: PaceAnchor;
}

/**
 * Perceived-effort target for a session.
 *
 * The subthreshold cue is the one that matters: finish around 7 out of 10,
 * feeling like there was room for another rep or two. That is how the
 * intensity is actually controlled day to day — and it is also the primary
 * evidence for a fitness check-in, which is why it is part of the plan data
 * rather than a footnote.
 */
export interface RpeTarget {
  /** e.g. '7' or '8-9'. */
  target: string;
  /** i18n key for the one-line cue. */
  noteKey: string;
}

/** A session the runner may do instead, with no penalty. */
export interface DayAlternative {
  sessionId: string;
  segments: Segment[];
  whyKey: string;
  substitutionKeys?: string[];
  /** Why this is offered, e.g. 'no race available'. */
  reasonKey: string;
}

export interface PlannedDay {
  dayIndex: DayIndex;
  /** ISO date, present when the plan is anchored to a marathon date. */
  date?: string;
  kind: DayKind;
  isQuality: boolean;
  sessionId?: string;
  segments?: Segment[];
  /** Target volume for the day including warm-up and cool-down. */
  targetDistanceM: number;
  whyKey?: string;
  substitutionKeys?: string[];
  rpe?: RpeTarget;
  /** Offered when the prescribed session needs a race, a hill or an event. */
  alternative?: DayAlternative;
  strength?: StrengthItem[];
  /** Second easy run for the doubling tiers. */
  secondRun?: SecondRun;
}

export interface PlannedWeek {
  weekNumber: number;
  phase: PhaseId;
  /** i18n key for the week label, e.g. 'week.label.deload'. */
  labelKey: string;
  volumeM: number;
  longRunM: number;
  isDeload: boolean;
  /** The X session is a test/parkrun this week, and a check-in is offered. */
  isTestWeek: boolean;
  /** True when the week ends the phase — where the check-in card appears. */
  isPhaseBoundary: boolean;
  days: PlannedDay[];
}

export interface MarathonPlanInput {
  tier: TierId;
  lengthWeeks: PlanLength;
  /** ISO date of the marathon. Optional; without it weeks are unanchored. */
  marathonDate?: string;
  /** Display unit. Does not affect generation, which is metric throughout. */
  unit: Unit;
  fitness: FitnessEstimate;
  strength?: StrengthOptions;
  /** Goal finish time in seconds. Displayed for comparison only. */
  goalFinishSec?: number;
}

export interface MarathonPlan {
  input: MarathonPlanInput;
  engineVersion: string;
  weeks: PlannedWeek[];
  mp: MarathonPaceBand;
  /** Peak weekly volume actually generated, in metres. */
  peakVolumeM: number;
}
