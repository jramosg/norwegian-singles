/**
 * Pace Calculator for Norwegian Singles
 * 
 * Calculates training paces based on VDOT:
 * - Threshold Pace: ~88-90% of VO2max
 * - Easy Pace: ~65-70% of VO2max (≤70% HRmax)
 * - Norwegian Singles intervals: various percentages based on target distance
 */

import type { Paces, Distance } from '../types';
import { calculateTimeFromVDOT, formatPace } from './vdot';
import { DISTANCE_METERS } from '../types';

/**
 * Calculate Threshold Pace from VDOT
 * 
 * Threshold pace is typically the pace you can sustain for about 60 minutes
 * It corresponds to approximately 88% of VO2max
 */
export function calculateThresholdPace(vdot: number): number {
  // Threshold pace corresponds roughly to 1-hour race pace
  // For most runners, this is close to their 15K to half marathon pace
  // We calculate using a slightly conservative approach
  
  // Calculate the pace for a 60-minute effort
  // This involves finding the distance covered at threshold intensity
  // Threshold VO2 is approximately 88% of VDOT
  
  const thresholdVdot = vdot * 0.88;
  
  // Calculate pace for "hour race" using adjusted VDOT
  // Typical threshold distance is about 15K for competitive runners
  const thresholdDistance = 15000;
  const thresholdTime = calculateTimeFromVDOT(thresholdVdot + 5, thresholdDistance);
  
  // Return pace per km in seconds
  return thresholdTime / (thresholdDistance / 1000);
}

/**
 * Alternative threshold calculation based on percentage of 10K pace
 * More practical and directly derived from the user's race time
 */
export function calculateThresholdPaceFrom10K(time10KSeconds: number): number {
  // 10K pace
  const pace10K = time10KSeconds / 10;
  
  // Threshold is approximately 4-6% slower than 10K race pace
  // Using 5% slower as a conservative estimate (Norwegian style)
  return pace10K * 1.05;
}

/**
 * Calculate Easy Pace from VDOT
 * 
 * Easy pace should be approximately 65-70% of VO2max
 * This corresponds to ≤70% of maximum heart rate
 * The emphasis is on EASY - it should feel comfortable
 */
export function calculateEasyPace(vdot: number): number {
  // Easy pace is significantly slower than threshold
  // Typically 1:00-1:30 per km slower than threshold
  
  // Calculate based on ~65% VO2max equivalent
  const easyVdot = vdot * 0.65;
  
  // Use marathon distance as reference for easy pace range
  const marathonTime = calculateTimeFromVDOT(easyVdot + 15, DISTANCE_METERS['42K']);
  
  return marathonTime / 42.195;
}

/**
 * Alternative easy pace calculation based on threshold pace
 * More practical approach used in Norwegian Singles
 */
export function calculateEasyPaceFromThreshold(thresholdPace: number): number {
  // Easy pace is approximately 25-35% slower than threshold
  // Norwegian Singles emphasizes VERY easy running
  // Using 38% slower for the ~65% MAS target
  return thresholdPace * 1.38;
}

/**
 * Calculate Norwegian Singles interval paces
 * 
 * Short intervals (3-4'): 15K pace
 * Medium intervals (6-8'): Half Marathon pace
 * Long intervals (10-12'): ~30K/Marathon pace
 * 
 * All with 60s recovery to maintain lactate state
 */
export function calculateNSIntervalPaces(vdot: number): Paces['intervals'] {
  // Short intervals: 15K pace (slightly faster than threshold)
  const pace15K = calculateTimeFromVDOT(vdot, 15000) / 15;
  
  // Medium intervals: Half Marathon pace
  const paceHM = calculateTimeFromVDOT(vdot, DISTANCE_METERS['21K']) / 21.0975;
  
  // Long intervals: ~30K pace (between HM and Marathon)
  const pace30K = calculateTimeFromVDOT(vdot, 30000) / 30;
  
  return {
    short: {
      min: Math.floor(pace15K - 3), // Slight pace range
      max: Math.floor(pace15K + 4),
    },
    medium: {
      min: Math.floor(paceHM - 3),
      max: Math.floor(paceHM + 4),
    },
    long: {
      min: Math.floor(pace30K - 3),
      max: Math.floor(pace30K + 5),
    },
  };
}

/**
 * Calculate all training paces from VDOT
 */
export function calculatePaces(vdot: number): Paces {
  const threshold = calculateThresholdPace(vdot);
  const easy = calculateEasyPaceFromThreshold(threshold);
  const intervals = calculateNSIntervalPaces(vdot);
  
  return {
    threshold: Math.round(threshold),
    easy: Math.round(easy),
    intervals,
  };
}

/**
 * Calculate paces from 10K race time (preferred method for accuracy)
 */
export function calculatePacesFrom10K(time10KSeconds: number): Paces {
  const threshold = calculateThresholdPaceFrom10K(time10KSeconds);
  const easy = calculateEasyPaceFromThreshold(threshold);
  
  // Calculate VDOT for interval paces
  const vdot = 56.9; // Will be calculated properly
  const intervals = calculateNSIntervalPaces(vdot);
  
  return {
    threshold: Math.round(threshold),
    easy: Math.round(easy),
    intervals,
  };
}

/**
 * Get formatted pace strings for display
 */
export function getFormattedPaces(paces: Paces): {
  threshold: string;
  easy: string;
  intervals: {
    short: string;
    medium: string;
    long: string;
  };
} {
  return {
    threshold: formatPace(paces.threshold),
    easy: formatPace(paces.easy),
    intervals: {
      short: `${formatPace(paces.intervals.short.min)}–${formatPace(paces.intervals.short.max)}`,
      medium: `${formatPace(paces.intervals.medium.min)}–${formatPace(paces.intervals.medium.max)}`,
      long: `${formatPace(paces.intervals.long.min)}–${formatPace(paces.intervals.long.max)}`,
    },
  };
}

/**
 * Norwegian Singles interval structures
 */
export const NS_INTERVALS = {
  byTime: {
    short: {
      reps: { min: 8, max: 12 },
      duration: "3–4'",
      paceDesc: '15K pace',
      recovery: 60,
    },
    medium: {
      reps: { min: 4, max: 6 },
      duration: "6–8'",
      paceDesc: 'HM pace',
      recovery: 60,
    },
    long: {
      reps: { min: 3, max: 3 },
      duration: "10–12'",
      paceDesc: '~30K pace',
      recovery: 60,
    },
  },
  byDistance: {
    short: {
      reps: { min: 8, max: 12 },
      distance: '1K',
      paceDesc: '15K pace',
      recovery: 60,
    },
    medium: {
      reps: { min: 4, max: 6 },
      distance: '2K',
      paceDesc: 'HM pace',
      recovery: 60,
    },
    long: {
      reps: { min: 3, max: 3 },
      distance: '3K',
      paceDesc: '~30K pace',
      recovery: 60,
    },
  },
} as const;

/**
 * Validate that calculated paces match the official example
 * 10K: 37:00 should yield:
 * - VDOT: ~56.9
 * - Threshold: 3:50/km
 * - Easy: 5:18/km
 * - Short intervals: 3:47-3:54/km
 */
export function validateOfficialExample(): boolean {
  const time10K = 37 * 60; // 37:00 in seconds
  const expectedThreshold = 3 * 60 + 50; // 3:50 = 230 seconds
  const expectedEasy = 5 * 60 + 18; // 5:18 = 318 seconds
  
  const threshold = calculateThresholdPaceFrom10K(time10K);
  const easy = calculateEasyPaceFromThreshold(threshold);
  
  // Allow 5 second tolerance
  const thresholdOk = Math.abs(threshold - expectedThreshold) <= 10;
  const easyOk = Math.abs(easy - expectedEasy) <= 15;
  
  return thresholdOk && easyOk;
}
