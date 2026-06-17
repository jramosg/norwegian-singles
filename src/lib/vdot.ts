/**
 * VDOT Calculator
 * Based on Jack Daniels' running formula, matching vdoto2.com's implementation.
 */

import type { Distance, ParsedTime } from '../types';

interface VDOTResult {
  vdot: number;
  distance: Distance;
  time: number;
}
import { DISTANCE_METERS } from '../types';

export interface VDOTTrainingPaces {
  easy: {
    min: number;
    max: number;
  };
  marathon: number;
  threshold: number;
  interval: number;
  repetition: number;
}

// Polynomial inverse of the VO2-velocity relationship (vdoto2.com _getPaceVelocity)
function paceVelocity(vo2: number): number {
  return 29.54 + 5.000663 * vo2 - 0.007546 * vo2 * vo2;
}

// Runners below this VDOT get adjusted training paces (vdoto2.com _SlowVdotLimit)
const SLOW_VDOT_LIMIT = 39;

function isSlowVdot(vdot: number): boolean {
  return vdot > 0 && vdot < SLOW_VDOT_LIMIT;
}

// Adjusted VDOT for slow runners (vdoto2.com _getSRVDOT)
function slowRunnerVdot(vdot: number): number {
  return (vdot * 2) / 3 + 13;
}

// Returns pace in seconds per km for a given VDOT and effort fraction
function effortPaceSecondsPerKm(vdot: number, fraction: number): number {
  const velocity = paceVelocity(vdot * fraction); // m/min
  return (1000 / velocity) * 60; // s/km
}

/**
 * Parse a time string (mm:ss or h:mm:ss) to seconds
 */
export function parseTime(timeStr: string): ParsedTime | null {
  if (!timeStr) return null;

  const parts = timeStr.split(':').map(Number);

  if (parts.some(isNaN)) return null;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 2) {
    [minutes, seconds] = parts;
  } else if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else {
    return null;
  }

  if (
    minutes >= 60 ||
    seconds >= 60 ||
    minutes < 0 ||
    seconds < 0 ||
    hours < 0
  ) {
    return null;
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return { hours, minutes, seconds, totalSeconds };
}

/**
 * Format seconds to mm:ss or h:mm:ss string
 */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format pace (seconds per km) to mm:ss string
 */
export function formatPace(
  secondsPerKm: number,
  unit: 'km' | 'mile' = 'km',
): string {
  const pace = unit === 'mile' ? secondsPerKm * 1.60934 : secondsPerKm;
  const minutes = Math.floor(pace / 60);
  const seconds = Math.round(pace % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate VDOT from race performance
 *
 * Formula based on Jack Daniels' Running Formula
 * VO2 = -4.60 + 0.182258 * (d/t) + 0.000104 * (d/t)²
 * where d = distance in meters, t = time in minutes
 *
 * %VO2max is approximated based on race duration
 * VDOT = VO2 / (%VO2max / 100)
 */
export function calculateVDOT(
  distanceMeters: number,
  timeSeconds: number,
): number {
  return Math.round(calculateVDOTRaw(distanceMeters, timeSeconds) * 10) / 10;
}

function calculateVDOTRaw(distanceMeters: number, timeSeconds: number): number {
  const t = timeSeconds / 60; // minutes
  const v = distanceMeters / t; // m/min
  const vo2 = 0.182258 * v + 0.000104 * v * v - 4.6;
  // Coefficients match vdoto2.com exactly
  const pctVO2max =
    0.8 +
    0.298956 * Math.exp(-0.193261 * t) +
    0.189439 * Math.exp(-0.012778 * t);
  return vo2 / pctVO2max;
}

// Newton's method matching vdoto2.com getPredictedRaceTime — returns seconds
export function calculateTimeFromVDOT(
  vdot: number,
  distanceMeters: number,
): number {
  let t = distanceMeters / (4 * vdot); // initial estimate in minutes
  for (let i = 0; i < 3; i++) {
    const e = Math.exp(-0.193261 * t);
    const r = 0.298956 * e + Math.exp(-0.012778 * t) * 0.189439 + 0.8;
    const o = (vdot * r) ** 2 * -0.0075 + vdot * r * 5.000663 + 29.54;
    const c = 0.298956 * e * 0.19326;
    const s = c - Math.exp(-0.012778 * t) * 0.189439 * -0.012778;
    const l = r * s * vdot * -0.007546 * 3;
    const a = s * vdot * 5.000663 + l;
    const denom = (distanceMeters * a) / (o * o) + 1;
    t -= (t - distanceMeters / o) / denom;
  }
  return Math.round(t * 60);
}

/**
 * Get VDOT from a race result
 */
export function getVDOTFromRace(
  distance: Distance,
  timeStr: string,
): VDOTResult | null {
  const parsed = parseTime(timeStr);
  if (!parsed) return null;

  const distanceMeters = DISTANCE_METERS[distance];
  const vdot = calculateVDOT(distanceMeters, parsed.totalSeconds);

  return {
    vdot,
    distance,
    time: parsed.totalSeconds,
  };
}

/**
 * Estimate race time for a distance given VDOT
 */
export function estimateRaceTime(vdot: number, distance: Distance): number {
  return calculateTimeFromVDOT(vdot, DISTANCE_METERS[distance]);
}

export function getTrainingPacesFromVDOT(vdot: number): VDOTTrainingPaces {
  // Slow runners use an adjusted VDOT for easy/interval/repetition
  const adjustedVdot = isSlowVdot(vdot) ? slowRunnerVdot(vdot) : vdot;
  // Threshold uses average of adjusted and actual VDOT for slow runners
  const thresholdVdot = isSlowVdot(vdot)
    ? (slowRunnerVdot(vdot) + vdot) / 2
    : vdot;

  const interval = effortPaceSecondsPerKm(adjustedVdot, 0.975);
  // Repetition is 15 s/km faster than interval (1000m/400m * 6min/60 * 60s)
  const repetition = interval - 15;

  const marathonSeconds = calculateTimeFromVDOT(vdot, 42195);

  return {
    easy: {
      min: effortPaceSecondsPerKm(adjustedVdot, 0.7),
      max: effortPaceSecondsPerKm(adjustedVdot, 0.62),
    },
    marathon: marathonSeconds / 42.195,
    threshold: effortPaceSecondsPerKm(thresholdVdot, 0.88),
    interval,
    repetition,
  };
}

/**
 * Convert between 5K and 10K times using VDOT
 */
export function estimate5KFrom10K(time10K: string): string | null {
  const parsed = parseTime(time10K);
  if (!parsed) return null;

  const vdot = calculateVDOT(DISTANCE_METERS['10K'], parsed.totalSeconds);
  const time5K = calculateTimeFromVDOT(vdot, DISTANCE_METERS['5K']);

  return formatTime(time5K);
}

export function estimate10KFrom5K(time5K: string): string | null {
  const parsed = parseTime(time5K);
  if (!parsed) return null;

  const vdot = calculateVDOT(DISTANCE_METERS['5K'], parsed.totalSeconds);
  const time10K = calculateTimeFromVDOT(vdot, DISTANCE_METERS['10K']);

  return formatTime(time10K);
}

// VDOT reference table for common values
export const VDOT_TABLE: Record<
  number,
  {
    '5K': string;
    '10K': string;
    '21K': string;
    '42K': string;
    threshold: string;
    easy: string;
  }
> = {
  30: {
    '5K': '30:40',
    '10K': '63:46',
    '21K': '2:21:04',
    '42K': '4:49:17',
    threshold: '7:03',
    easy: '9:23',
  },
  35: {
    '5K': '25:37',
    '10K': '53:10',
    '21K': '1:57:29',
    '42K': '4:03:06',
    threshold: '5:53',
    easy: '7:48',
  },
  40: {
    '5K': '21:58',
    '10K': '45:35',
    '21K': '1:40:49',
    '42K': '3:28:10',
    threshold: '5:03',
    easy: '6:42',
  },
  45: {
    '5K': '19:18',
    '10K': '40:04',
    '21K': '1:28:17',
    '42K': '3:02:27',
    threshold: '4:27',
    easy: '5:54',
  },
  50: {
    '5K': '17:16',
    '10K': '35:50',
    '21K': '1:18:49',
    '42K': '2:43:01',
    threshold: '3:59',
    easy: '5:19',
  },
  55: {
    '5K': '15:40',
    '10K': '32:32',
    '21K': '1:11:29',
    '42K': '2:28:06',
    threshold: '3:37',
    easy: '4:50',
  },
  57: {
    '5K': '15:03',
    '10K': '31:14',
    '21K': '1:08:40',
    '42K': '2:22:36',
    threshold: '3:29',
    easy: '4:40',
  },
  60: {
    '5K': '14:21',
    '10K': '29:47',
    '21K': '1:05:30',
    '42K': '2:15:56',
    threshold: '3:19',
    easy: '4:26',
  },
  65: {
    '5K': '13:14',
    '10K': '27:28',
    '21K': '1:00:24',
    '42K': '2:05:47',
    threshold: '3:04',
    easy: '4:05',
  },
  70: {
    '5K': '12:18',
    '10K': '25:31',
    '21K': '56:04',
    '42K': '1:56:56',
    threshold: '2:51',
    easy: '3:49',
  },
  75: {
    '5K': '11:31',
    '10K': '23:52',
    '21K': '52:26',
    '42K': '1:49:18',
    threshold: '2:40',
    easy: '3:35',
  },
  80: {
    '5K': '10:49',
    '10K': '22:27',
    '21K': '49:18',
    '42K': '1:42:37',
    threshold: '2:31',
    easy: '3:23',
  },
};
