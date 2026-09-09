/**
 * Fitness check-in: reading current fitness from how the sessions went.
 *
 * Races are optional and most runners do not have one when the plan needs a
 * checkpoint, so the default evidence is the sessions themselves. The cue the
 * method actually runs on is the subthreshold one: finish around 7 out of 10,
 * feeling like there was a rep or two in reserve.
 *
 * The scoring is deliberately asymmetric. "It felt easy" is weak evidence of
 * a gain, because a controlled session is *supposed* to feel like that, and
 * because the whole point of subthreshold work is not racing it. "I could not
 * hold the pace" is strong evidence to come down, because the cost of
 * training too hard for six more weeks is a ruined build.
 */

export type ReserveAnswer =
  /** Could have done several more reps at the same pace. */
  | 'several_more'
  /** Could have done one or two more. This is the target. */
  | 'one_or_two_more'
  /** Finished the session with nothing left. */
  | 'nothing_left'
  /** Could not complete it as written. */
  | 'could_not_finish';

export type LastRepAnswer =
  /** The last rep matched the first. */
  | 'held'
  /** The last rep drifted a little slower. */
  | 'drifted'
  /** The last reps fell well off the pace. */
  | 'fell_away';

export type EffortAnswer =
  /** Comfortably under the target effort. */
  | 'under'
  /** Around 7 out of 10. */
  | 'on_target'
  /** Over 8: this was racing, not subthreshold. */
  | 'over';

export interface CheckinResponses {
  reserve: ReserveAnswer;
  lastRep: LastRepAnswer;
  effort: EffortAnswer;
}

const RESERVE_SCORE: Record<ReserveAnswer, number> = {
  several_more: 0.5,
  // Zero on purpose: this is what a correctly pitched session feels like, so
  // it is evidence that the paces are right, not that fitness has moved.
  one_or_two_more: 0,
  nothing_left: -0.5,
  could_not_finish: -1.5,
};

const LAST_REP_SCORE: Record<LastRepAnswer, number> = {
  held: 0,
  drifted: -0.5,
  fell_away: -1,
};

const EFFORT_SCORE: Record<EffortAnswer, number> = {
  under: 0.5,
  on_target: 0,
  over: -1,
};

/** Most a check-in may raise fitness in one go. */
export const MAX_UPWARD_NUDGE = 1;
/** Most it may lower it. Larger, because being over-paced is the real risk. */
export const MAX_DOWNWARD_NUDGE = -2;

/** VDOT points to add, given a set of check-in answers. */
export function vdotNudge(responses: CheckinResponses): number {
  const raw =
    RESERVE_SCORE[responses.reserve] +
    LAST_REP_SCORE[responses.lastRep] +
    EFFORT_SCORE[responses.effort];
  const clamped = Math.max(MAX_DOWNWARD_NUDGE, Math.min(MAX_UPWARD_NUDGE, raw));
  // Half-point resolution: finer than that is false precision on evidence
  // this soft.
  return Math.round(clamped * 2) / 2;
}

export interface CheckinOutcome {
  previousVdot: number;
  nextVdot: number;
  delta: number;
  /** True when the answers say the paces were already right. */
  unchanged: boolean;
}

export function applyCheckin(
  currentVdot: number,
  responses: CheckinResponses,
): CheckinOutcome {
  const delta = vdotNudge(responses);
  const nextVdot = Math.round((currentVdot + delta) * 10) / 10;
  return {
    previousVdot: currentVdot,
    nextVdot,
    delta,
    unchanged: delta === 0,
  };
}
