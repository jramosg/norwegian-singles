/**
 * Marathon pace estimation.
 *
 * The existing free tools use a flat `MP = 5K pace x 1.14`, which is a Riegel
 * exponent of 1.06 — an elite-grade conversion. Applied to a 20:00 5K it
 * promises a 3:12 marathon where the standard tables say ~3:21. Selling plans
 * off that number would have people racing a pace they cannot hold, so the
 * exponent here scales with weekly volume: high volume is the evidence that
 * the conversion is earned.
 */

import { MARATHON_M } from './constants';
import type { MarathonPaceBand } from './types';

const FIVE_K_M = 5000;

/**
 * Riegel exponent by peak weekly volume in km.
 * Lower exponent = better long-distance conversion.
 */
export function riegelExponent(peakWeeklyKm: number): number {
  if (peakWeeklyKm >= 135) return 1.06;
  if (peakWeeklyKm >= 115) return 1.07;
  if (peakWeeklyKm >= 90) return 1.08;
  return 1.1;
}

/**
 * Predict a marathon finish time from a 5K equivalent and weekly volume.
 * Returns seconds.
 */
export function predictMarathonSec(
  fiveKSeconds: number,
  peakWeeklyKm: number,
): number {
  const exponent = riegelExponent(peakWeeklyKm);
  return fiveKSeconds * Math.pow(MARATHON_M / FIVE_K_M, exponent);
}

/** Half-width of the marathon-pace band, as a fraction of pace. */
const BAND_SPREAD = 0.015;

/**
 * Marathon pace as a band rather than a single number. `midSecPerKm` is what
 * `mp` pace anchors resolve against.
 */
export function marathonPaceBand(
  fiveKSeconds: number,
  peakWeeklyKm: number,
): MarathonPaceBand {
  const predictedFinishSec = predictMarathonSec(fiveKSeconds, peakWeeklyKm);
  const midSecPerKm = (predictedFinishSec / MARATHON_M) * 1000;
  return {
    fastSecPerKm: Math.round(midSecPerKm * (1 - BAND_SPREAD)),
    slowSecPerKm: Math.round(midSecPerKm * (1 + BAND_SPREAD)),
    midSecPerKm: Math.round(midSecPerKm),
    exponent: riegelExponent(peakWeeklyKm),
    predictedFinishSec: Math.round(predictedFinishSec),
  };
}

/**
 * Compare a goal time against what current fitness supports.
 * `deltaSec` is positive when the goal is faster than the prediction.
 */
export interface GoalVerdict {
  supportedFinishSec: number;
  goalFinishSec: number;
  deltaSec: number;
  verdict: 'realistic' | 'ambitious' | 'unrealistic';
}

export function assessGoal(
  band: MarathonPaceBand,
  goalFinishSec: number,
): GoalVerdict {
  const deltaSec = band.predictedFinishSec - goalFinishSec;
  const ratio = deltaSec / band.predictedFinishSec;
  const verdict =
    ratio <= 0.01 ? 'realistic' : ratio <= 0.04 ? 'ambitious' : 'unrealistic';
  return {
    supportedFinishSec: band.predictedFinishSec,
    goalFinishSec,
    deltaSec,
    verdict,
  };
}
