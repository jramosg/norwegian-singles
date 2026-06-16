/**
 * VDOT Calculator
 * Based on Jack Daniels' running formula
 *
 * VDOT represents the oxygen consumption ability of a runner and is used
 * to predict race performances and calculate training paces.
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

const TRAINING_PACE_ANCHORS: { vdot: number; paces: VDOTTrainingPaces }[] = [
  {
    vdot: 32.3,
    paces: {
      easy: { min: 411, max: 451 },
      marathon: 388.4,
      threshold: 353,
      interval: 317,
      repetition: 302,
    },
  },
  {
    vdot: 42.6,
    paces: {
      easy: { min: 349, max: 383 },
      marathon: 310,
      threshold: 291,
      interval: 267,
      repetition: 252,
    },
  },
  {
    vdot: 58.4,
    paces: {
      easy: { min: 271, max: 299 },
      marathon: 238,
      threshold: 225,
      interval: 207,
      repetition: 192,
    },
  },
];

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
  const timeMinutes = timeSeconds / 60;
  const velocity = distanceMeters / timeMinutes; // meters per minute

  // VO2 calculation (oxygen consumption)
  const vo2 = -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity;

  // Percentage of VO2max based on race duration
  // This models the dropoff in sustainable VO2 percentage as race gets longer
  const percentVO2max =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * timeMinutes) +
    0.2989558 * Math.exp(-0.1932605 * timeMinutes);

  // VDOT is the normalized value
  const vdot = vo2 / percentVO2max;

  return vdot;
}

/**
 * Calculate race time from VDOT and distance
 * Inverts the VDOT calculation using numerical methods
 */
export function calculateTimeFromVDOT(
  vdot: number,
  distanceMeters: number,
): number {
  // Use binary search to find the time that produces the given VDOT
  let low = 1 * 60; // 1 minute
  let high = 6 * 3600; // 6 hours

  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    const calculatedVdot = calculateVDOTRaw(distanceMeters, mid);

    if (calculatedVdot > vdot) {
      // Need slower time (higher seconds)
      low = mid;
    } else {
      // Need faster time (lower seconds)
      high = mid;
    }
  }

  return Math.round((low + high) / 2);
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
  const anchors = TRAINING_PACE_ANCHORS;
  let lower = anchors[0];
  let upper = anchors[1];

  if (vdot <= anchors[0].vdot) {
    [lower, upper] = [anchors[0], anchors[1]];
  } else if (vdot >= anchors[anchors.length - 1].vdot) {
    [lower, upper] = [anchors[anchors.length - 2], anchors[anchors.length - 1]];
  } else {
    for (let i = 0; i < anchors.length - 1; i++) {
      if (vdot >= anchors[i].vdot && vdot <= anchors[i + 1].vdot) {
        [lower, upper] = [anchors[i], anchors[i + 1]];
        break;
      }
    }
  }

  const t = (vdot - lower.vdot) / (upper.vdot - lower.vdot);
  const interpolate = (a: number, b: number) => a + (b - a) * t;

  return {
    easy: {
      min: interpolate(lower.paces.easy.min, upper.paces.easy.min),
      max: interpolate(lower.paces.easy.max, upper.paces.easy.max),
    },
    marathon: interpolate(lower.paces.marathon, upper.paces.marathon),
    threshold: interpolate(lower.paces.threshold, upper.paces.threshold),
    interval: interpolate(lower.paces.interval, upper.paces.interval),
    repetition: interpolate(lower.paces.repetition, upper.paces.repetition),
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
