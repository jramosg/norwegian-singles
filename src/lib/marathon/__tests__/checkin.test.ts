import { describe, it, expect } from 'vitest';
import {
  MAX_DOWNWARD_NUDGE,
  MAX_UPWARD_NUDGE,
  applyCheckin,
  vdotNudge,
  type CheckinResponses,
} from '../checkin';

const answers = (over: Partial<CheckinResponses> = {}): CheckinResponses => ({
  reserve: 'one_or_two_more',
  lastRep: 'held',
  effort: 'on_target',
  ...over,
});

describe('vdotNudge', () => {
  it('does not move fitness when the session was pitched correctly', () => {
    // A rep or two in reserve, holding pace, around 7 out of 10 is the target,
    // so it is evidence the paces are right rather than evidence of a change.
    expect(vdotNudge(answers())).toBe(0);
  });

  it('is asymmetric: a good session lifts less than a bad one drops', () => {
    const best = vdotNudge(
      answers({ reserve: 'several_more', lastRep: 'held', effort: 'under' }),
    );
    const worst = vdotNudge(
      answers({
        reserve: 'could_not_finish',
        lastRep: 'fell_away',
        effort: 'over',
      }),
    );
    expect(best).toBeLessThanOrEqual(MAX_UPWARD_NUDGE);
    expect(worst).toBeGreaterThanOrEqual(MAX_DOWNWARD_NUDGE);
    expect(Math.abs(worst)).toBeGreaterThan(Math.abs(best));
  });

  it('never exceeds the documented bounds for any combination', () => {
    const reserves = [
      'several_more',
      'one_or_two_more',
      'nothing_left',
      'could_not_finish',
    ] as const;
    const lastReps = ['held', 'drifted', 'fell_away'] as const;
    const efforts = ['under', 'on_target', 'over'] as const;
    for (const reserve of reserves) {
      for (const lastRep of lastReps) {
        for (const effort of efforts) {
          const n = vdotNudge({ reserve, lastRep, effort });
          expect(n).toBeLessThanOrEqual(MAX_UPWARD_NUDGE);
          expect(n).toBeGreaterThanOrEqual(MAX_DOWNWARD_NUDGE);
          expect(n * 2).toBe(Math.round(n * 2));
        }
      }
    }
  });

  it('treats failing to finish as strong evidence to come down', () => {
    expect(vdotNudge(answers({ reserve: 'could_not_finish' }))).toBeLessThan(
      -1,
    );
  });

  it('treats "felt easy" as weak evidence on its own', () => {
    // One soft positive signal should not move a plan.
    expect(vdotNudge(answers({ reserve: 'several_more' }))).toBeLessThanOrEqual(
      0.5,
    );
  });

  it('reads a session run above 8 out of 10 as too hard, not as fitness', () => {
    expect(vdotNudge(answers({ effort: 'over' }))).toBeLessThan(0);
  });
});

describe('applyCheckin', () => {
  it('reports the change and keeps one decimal place', () => {
    const outcome = applyCheckin(51.9, answers({ reserve: 'several_more' }));
    expect(outcome.previousVdot).toBe(51.9);
    expect(outcome.nextVdot).toBe(52.4);
    expect(outcome.delta).toBe(0.5);
    expect(outcome.unchanged).toBe(false);
  });

  it('flags an unchanged estimate so the UI can say "paces are right"', () => {
    expect(applyCheckin(51.9, answers()).unchanged).toBe(true);
    expect(applyCheckin(51.9, answers()).nextVdot).toBe(51.9);
  });
});
