/**
 * Everything the VDOT calculator page shows, computed from one race result.
 * Pure functions so the page can render a default result at build time and
 * the island can recompute it on input.
 */
import { DISTANCE_METERS, type Distance } from '../types';
import {
  calculateVDOT,
  calculateTimeFromVDOT,
  getTrainingPacesFromVDOT,
  type VDOTTrainingPaces,
} from './vdot';

export const VDOT_DISTANCES = [
  '1500M',
  '1MI',
  '3K',
  '5K',
  '10K',
  '15K',
  '21K',
  '42K',
] as const satisfies readonly Distance[];

export type VdotDistance = (typeof VDOT_DISTANCES)[number];

/** Range covered by the published tables; outside it results are rough. */
export const VDOT_TABLE_MIN = 30;
export const VDOT_TABLE_MAX = 85;

export interface VdotReport {
  vdot: number;
  paces: VDOTTrainingPaces;
  equivalents: { distance: VdotDistance; seconds: number }[];
  inTableRange: boolean;
}

/**
 * Parse "mm:ss" or "h:mm:ss" into seconds. Unlike the plan parser, minutes
 * may exceed 59 in the two-part form, so "65:00" works for a 10K.
 */
export function parseRaceTime(value: string): number | null {
  const parts = value.trim().split(':');
  if (parts.length < 2 || parts.length > 3) return null;
  if (parts.some((part) => !/^\d+$/.test(part))) return null;

  const numbers = parts.map(Number);
  const seconds = numbers[numbers.length - 1];
  const minutes = numbers[numbers.length - 2];
  const hours = numbers.length === 3 ? numbers[0] : 0;
  if (seconds >= 60 || (numbers.length === 3 && minutes >= 60)) return null;

  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

export function computeVdotReport(
  distance: VdotDistance,
  time: string,
): VdotReport | null {
  const seconds = parseRaceTime(time);
  if (!seconds) return null;

  const meters = DISTANCE_METERS[distance];
  // Reject results faster than world-record speed or slower than walking.
  const speed = meters / seconds;
  if (speed > 6.6 || speed < 1.2) return null;

  const vdot = calculateVDOT(meters, seconds);
  return {
    vdot,
    paces: getTrainingPacesFromVDOT(vdot),
    equivalents: VDOT_DISTANCES.map((d) => ({
      distance: d,
      seconds: calculateTimeFromVDOT(vdot, DISTANCE_METERS[d]),
    })),
    inTableRange: vdot >= VDOT_TABLE_MIN && vdot <= VDOT_TABLE_MAX,
  };
}

export interface VdotChartRow {
  vdot: number;
  fiveK: number;
  tenK: number;
  half: number;
  marathon: number;
  paces: VDOTTrainingPaces;
}

export function buildVdotChart(
  min = VDOT_TABLE_MIN,
  max = VDOT_TABLE_MAX,
): VdotChartRow[] {
  const rows: VdotChartRow[] = [];
  for (let vdot = min; vdot <= max; vdot++) {
    rows.push({
      vdot,
      fiveK: calculateTimeFromVDOT(vdot, DISTANCE_METERS['5K']),
      tenK: calculateTimeFromVDOT(vdot, DISTANCE_METERS['10K']),
      half: calculateTimeFromVDOT(vdot, DISTANCE_METERS['21K']),
      marathon: calculateTimeFromVDOT(vdot, DISTANCE_METERS['42K']),
      paces: getTrainingPacesFromVDOT(vdot),
    });
  }
  return rows;
}
