/**
 * The optional strength track: heavy low-rep lifting, plyometrics and hill
 * sprints, for running economy rather than strength.
 *
 * The prescriptions are the consensus ones in the running-strength
 * literature (heavy and slow for very few reps, or explosive with minimal
 * ground contact), expressed as our own uniform progression. The placement
 * rules matter as much as the prescriptions and are enforced here rather than
 * left to prose:
 *
 *  - lifting goes on quality days, *after* the run
 *  - plyometrics never the day before a quality session
 *  - hill sprints after an easy run, and never in marathon week
 */

import type { PhaseId, StrengthItem, StrengthOptions, TierId } from './types';
import { getTier } from './tiers';

export interface StrengthPlacement {
  /** Position within the week, 0-based, where 6 is the last day. */
  position: number;
  item: StrengthItem;
}

interface WeekShape {
  phase: PhaseId;
  weekNumber: number;
  /** Positions holding a quality session, ascending. */
  qualityPositions: number[];
  /** True for the week containing the marathon. */
  isRaceWeek: boolean;
}

/** Four-week ramp to heavy, then hold; maintenance once racing nears. */
function liftingPrescription(weekNumber: number, dose: StrengthItem['dose']) {
  if (dose === 'maintenance') return '2 x 4 @ 80-90% of working load';
  switch (weekNumber) {
    case 1:
      return '2 x 5 @ ~8RM';
    case 2:
      return '2 x 4 @ ~7RM';
    case 3:
      return '3 x 4 @ ~6RM';
    default:
      return '3 x 4 @ ~4-5RM';
  }
}

function hillSprintPrescription(
  tier: TierId,
  weekNumber: number,
  phase: PhaseId,
  inexperienced: boolean,
): { prescription: string; dose: StrengthItem['dose'] } {
  // Five-week introductory ramp before anyone touches maximal speed.
  if (inexperienced && weekNumber <= 5) {
    const intro = [
      '4 x 10 s at 75-90% max speed, 1-2 min walk recovery',
      '4 x 10 s at 80-95% max speed, 1-2 min walk recovery',
      '5 x 10 s at 80-98% max speed, 1-2 min walk recovery',
      '5 x 10 s at 85-100% max speed, 1-2 min walk recovery',
      '6 x 10 s at 85-100% max speed, 1-2 min walk recovery',
    ];
    return { prescription: intro[weekNumber - 1], dose: 'intro' };
  }

  if (phase === 'specific' || phase === 'taper') {
    return {
      prescription: '5-6 x 10 s at 85-100% max speed, 1-2 min walk recovery',
      dose: 'maintenance',
    };
  }

  const { hillSprintReps } = getTier(tier);
  // Never add more than one rep per week, and never go past ten.
  const reps = Math.min(hillSprintReps, 10, 4 + weekNumber);
  return {
    prescription: `${reps} x 10 s at 85-100% max speed, 1-2 min walk recovery`,
    dose: 'full',
  };
}

/**
 * Strength work for one week, keyed to positions within that week.
 * Returns an empty list when every modality is switched off.
 */
export function strengthForWeek(
  options: StrengthOptions,
  tier: TierId,
  shape: WeekShape,
): StrengthPlacement[] {
  const { phase, weekNumber, qualityPositions, isRaceWeek } = shape;
  const out: StrengthPlacement[] = [];
  const maintaining = phase === 'specific' || phase === 'taper';

  if (options.lifting && !isRaceWeek) {
    const dose: StrengthItem['dose'] = maintaining
      ? 'maintenance'
      : weekNumber <= 4
        ? 'intro'
        : 'full';
    // Two sessions while building, one once the racing weeks arrive.
    const days = maintaining
      ? qualityPositions.slice(0, 1)
      : qualityPositions.slice(0, 2);
    for (const position of days) {
      out.push({
        position,
        item: {
          modality: 'lifting',
          dose,
          prescription: liftingPrescription(weekNumber, dose),
          timing: 'after_run',
          notesKey: 'strength.notes.lifting',
        },
      });
    }
  }

  if (options.plyometrics && !isRaceWeek) {
    const dose: StrengthItem['dose'] = maintaining ? 'maintenance' : 'full';
    const prescription = maintaining
      ? '2 sets x 6 reps, maximal height, minimal ground contact'
      : '3 sets x 8 reps, maximal height, minimal ground contact';
    // Only ever on a quality day, and only when the next day is not itself a
    // quality day — being fresh is the whole point of a plyometric session.
    const days = qualityPositions
      .filter((p) => !qualityPositions.includes(p + 1))
      .slice(0, maintaining ? 1 : 2);
    for (const position of days) {
      out.push({
        position,
        item: {
          modality: 'plyometrics',
          dose,
          prescription,
          timing: 'separate_session',
          notesKey: 'strength.notes.plyometrics',
        },
      });
    }
  }

  // Hill sprints are the least fatiguing of the three and survive closest to
  // race day — but never during marathon week.
  if (options.hillSprints && !isRaceWeek) {
    const { prescription, dose } = hillSprintPrescription(
      tier,
      weekNumber,
      phase,
      options.hillSprintsInexperienced ?? false,
    );
    const midweekQuality = qualityPositions.find((p) => p > 0) ?? 2;
    // The day before the mid-week session once specific work starts, after an
    // easy run early in the week while still building.
    const position = maintaining ? Math.max(0, midweekQuality - 1) : 0;
    if (!qualityPositions.includes(position) || maintaining) {
      out.push({
        position,
        item: {
          modality: 'hill_sprints',
          dose,
          prescription,
          timing: 'after_run',
          notesKey: 'strength.notes.hill_sprints',
        },
      });
    }
  }

  return out;
}

export const DEFAULT_STRENGTH: StrengthOptions = {
  lifting: false,
  plyometrics: false,
  hillSprints: false,
};
