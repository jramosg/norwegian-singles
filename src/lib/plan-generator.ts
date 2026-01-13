/**
 * Training Plan Generator
 *
 * Generates 6-week training blocks based on Norwegian Singles methodology:
 * - Week 1: Base load (80%)
 * - Week 2: Build (90%)
 * - Week 3: Peak load (100%)
 * - Week 4: Build (95%)
 * - Week 5: Peak load (100%)
 * - Week 6: Unload (60%) + Test
 *
 * Weekly structure (7 days):
 * - Monday: Easy
 * - Tuesday: Threshold (NS)
 * - Wednesday: Easy
 * - Thursday: Threshold (NS)
 * - Friday: Easy
 * - Saturday: Threshold (NS)
 * - Sunday: Long Run
 */

import type {
  TrainingSession,
  WeekPlan,
  TrainingBlock,
  UserInput,
  Paces,
  SessionType,
  Race,
  IntervalType,
  Distance,
  Unit,
} from '../types';
import { calculatePaces, NS_INTERVALS } from './paces';
import { calculateVDOT, formatPace } from './vdot';
import { DISTANCE_METERS } from '../types';

/**
 * NSM follows a repeatable weekly structure.
 * Progression comes primarily from pace adjustments (VDOT) rather than volume.
 * Week 6 is a test/reload week.
 */
const WEEK_VOLUME_MULTIPLIERS = [1.0, 1.0, 1.0, 1.0, 1.0, 0.7] as const;

/**
 * Easy run durations (minutes)
 * NSM emphasizes consistency over progressive duration builds.
 */
const EASY_RUN_DURATIONS: Record<
  Distance,
  { base: number; max: number; unload: number }
> = {
  '5K': { base: 45, max: 45, unload: 30 },
  '10K': { base: 50, max: 50, unload: 35 },
  '21K': { base: 60, max: 60, unload: 40 },
  '42K': { base: 75, max: 75, unload: 50 },
};

/**
 * Long run durations (minutes)
 */
const LONG_RUN_DURATIONS: Record<
  Distance,
  { base: number; max: number; unload: number }
> = {
  '5K': { base: 70, max: 70, unload: 45 },
  '10K': { base: 85, max: 85, unload: 55 },
  '21K': { base: 105, max: 105, unload: 70 },
  '42K': { base: 130, max: 130, unload: 90 },
};

/**
 * Interval repetitions - Stable for NSM
 */
const INTERVAL_REPS_BY_DISTANCE: Record<
  Distance,
  Array<{ short: number; medium: number; long: number }>
> = {
  '5K': [
    { short: 10, medium: 5, long: 3 }, // Stable weeks
    { short: 10, medium: 5, long: 3 },
    { short: 10, medium: 5, long: 3 },
    { short: 10, medium: 5, long: 3 },
    { short: 10, medium: 5, long: 3 },
    { short: 6, medium: 3, long: 2 }, // Week 6: Unload
  ],
  '10K': [
    { short: 12, medium: 6, long: 3 },
    { short: 12, medium: 6, long: 3 },
    { short: 12, medium: 6, long: 3 },
    { short: 12, medium: 6, long: 3 },
    { short: 12, medium: 6, long: 3 },
    { short: 8, medium: 4, long: 2 },
  ],
  '21K': [
    { short: 12, medium: 6, long: 4 },
    { short: 12, medium: 6, long: 4 },
    { short: 12, medium: 6, long: 4 },
    { short: 12, medium: 6, long: 4 },
    { short: 12, medium: 6, long: 4 },
    { short: 8, medium: 4, long: 3 },
  ],
  '42K': [
    { short: 14, medium: 8, long: 5 },
    { short: 14, medium: 8, long: 5 },
    { short: 14, medium: 8, long: 5 },
    { short: 14, medium: 8, long: 5 },
    { short: 14, medium: 8, long: 5 },
    { short: 8, medium: 5, long: 3 },
  ],
};

/**
 * Base weekly structure with all 7 days
 */
const BASE_WEEK_STRUCTURE: {
  type: SessionType;
  intervalType?: IntervalType;
}[] = [
  { type: 'easy' }, // Monday
  { type: 'threshold', intervalType: 'short' }, // Tuesday
  { type: 'easy' }, // Wednesday
  { type: 'threshold', intervalType: 'medium' }, // Thursday
  { type: 'easy' }, // Friday
  { type: 'threshold', intervalType: 'long' }, // Saturday
  { type: 'long' }, // Sunday
];

/**
 * Get reduced week structure based on training days
 * Priority: 1. Keep quality sessions (Thresholds, Long Run) 2. Keep Easy sessions
 */
function getWeekStructure(trainingDays: number): typeof BASE_WEEK_STRUCTURE {
  // Copy to avoid mutating original template
  const structure = BASE_WEEK_STRUCTURE.map((s) => ({ ...s }));

  const targetDays = Math.max(3, Math.min(7, Math.floor(trainingDays)));
  if (targetDays === 7) return structure;

  const daysToRemove = 7 - targetDays;

  // Removal priority to maintain balance:
  // 1. Friday Easy (4)
  // 2. Monday Easy (0)
  // 3. Wednesday Easy (2)
  // 4. Saturday Sub-T (5)
  // 5. Thursday Sub-T (3)
  const removalPriority = [4, 0, 2, 5, 3];
  const toRemove = removalPriority.slice(0, daysToRemove);

  for (const index of toRemove) {
    if (index < structure.length) {
      structure[index] = { type: 'rest' };
    }
  }

  return structure;
}

/**
 * Calculate easy run duration for a specific week and distance
 */
function getEasyDuration(
  weekNumber: number,
  targetDistance: Distance,
  _day: number,
): number {
  const config = EASY_RUN_DURATIONS[targetDistance];
  if (weekNumber === 6) return config.unload;

  return config.base;
}

/**
 * Calculate long run duration for a specific week and distance
 */
function getLongDuration(weekNumber: number, targetDistance: Distance): number {
  const config = LONG_RUN_DURATIONS[targetDistance];
  if (weekNumber === 6) return config.unload;

  return config.base;
}

/**
 * Get interval repetitions for a specific week, type, and target distance
 */
function getIntervalReps(
  weekNumber: number,
  intervalType: IntervalType,
  targetDistance: Distance,
): number {
  const distanceConfig = INTERVAL_REPS_BY_DISTANCE[targetDistance];
  const weekConfig = distanceConfig[weekNumber - 1] || distanceConfig[0];
  return weekConfig[intervalType];
}

/**
 * Create a training session for a specific day
 */
function createSession(
  day: number,
  sessionConfig: { type: SessionType; intervalType?: IntervalType },
  paces: Paces,
  weekNumber: number,
  targetDistance: Distance,
  _isTestWeek: boolean,
  unit: Unit = 'km',
): TrainingSession {
  const { type, intervalType } = sessionConfig;
  const unitLabel = unit === 'km' ? 'km' : 'mi';

  const baseSession: TrainingSession = {
    day,
    type,
    title: '',
    description: '',
  };

  switch (type) {
    case 'easy': {
      const duration = getEasyDuration(weekNumber, targetDistance, day);
      return {
        ...baseSession,
        title: 'Easy Run',
        description: `${duration} min @ easy pace`,
        duration,
        paces: { target: paces.easy },
      };
    }

    case 'threshold': {
      const interval = intervalType || 'short';
      const nsConfig = NS_INTERVALS.byTime[interval];
      const paceRange = paces.intervals[interval];
      const reps = getIntervalReps(weekNumber, interval, targetDistance);

      const intervalName =
        interval === 'short'
          ? 'Short'
          : interval === 'medium'
            ? 'Medium'
            : 'Long';

      return {
        ...baseSession,
        title: `NS ${intervalName} Sub-T`,
        description: `${reps} × ${nsConfig.duration} @ ${formatPace(
          paceRange.min,
          unit,
        )}-${formatPace(paceRange.max, unit)}/${unitLabel} (60s rec)`,
        intervals: {
          type: interval,
          reps: { min: reps, max: reps },
          duration: nsConfig.duration,
          paceRange,
          recovery: nsConfig.recovery,
        },
        paces: {
          target: Math.round((paceRange.min + paceRange.max) / 2),
          range: paceRange,
        },
      };
    }

    case 'long': {
      const duration = getLongDuration(weekNumber, targetDistance);
      return {
        ...baseSession,
        title: 'Long Run',
        description: `${duration} min @ easy pace`,
        duration,
        paces: { target: paces.easy },
      };
    }

    case 'test':
      return {
        ...baseSession,
        title: 'Test Day',
        description: 'Time trial 5K or 10K - max effort',
      };

    case 'race':
      return {
        ...baseSession,
        title: 'Race Day',
        description: baseSession.race?.name || 'Race',
        race: baseSession.race,
      };

    case 'rest':
      return {
        ...baseSession,
        title: 'Rest',
        description: 'Active recovery or complete rest',
      };

    default:
      return baseSession;
  }
}

/**
 * Calculate total volume for a week (approximate km)
 */
function calculateWeekVolume(
  _weekNumber: number,
  sessions: TrainingSession[],
): number {
  let totalMinutes = 0;

  for (const session of sessions) {
    if (session.type === 'easy' || session.type === 'long') {
      totalMinutes += session.duration || 0;
    } else if (session.type === 'threshold' && session.intervals) {
      // Estimate threshold session duration: warmup + work + cooldown
      const workMinutes =
        session.intervals.reps.min *
        (session.intervals.type === 'short'
          ? 3.5
          : session.intervals.type === 'medium'
            ? 7
            : 11);
      totalMinutes += 15 + workMinutes + 10; // warmup + work + cooldown
    }
  }

  // Rough conversion: assume average 5:30/km = 10.9 km/hour
  return Math.round(totalMinutes / 5.5);
}

/**
 * Generate a week plan with progressive volume
 */
function generateWeekPlan(
  weekNumber: number,
  trainingDays: number,
  paces: Paces,
  targetDistance: Distance,
  unit: Unit = 'km',
): WeekPlan {
  const isTestWeek = weekNumber === 6;
  const structure = getWeekStructure(trainingDays);

  const sessions: TrainingSession[] = structure.map((config, index) => {
    // On test week, Saturday (index 5) MUST be a test day regardless of structure
    if (isTestWeek && index === 5) {
      return createSession(
        index + 1,
        { type: 'test' },
        paces,
        weekNumber,
        targetDistance,
        true,
        unit,
      );
    }

    return createSession(
      index + 1,
      config,
      paces,
      weekNumber,
      targetDistance,
      isTestWeek,
      unit,
    );
  });

  const totalVolume = calculateWeekVolume(weekNumber, sessions);

  return {
    weekNumber,
    isTestWeek,
    isRecoveryWeek: isTestWeek,
    sessions,
    totalVolume,
  };
}

/**
 * Generate a complete 6-week training block
 */
export function generateTrainingBlock(
  blockNumber: number,
  input: UserInput,
  vdot: number,
  paces: Paces,
): TrainingBlock {
  const weeks: WeekPlan[] = [];

  for (let week = 1; week <= 6; week++) {
    weeks.push(
      generateWeekPlan(
        week,
        input.trainingDays,
        paces,
        input.targetDistance,
        input.unit,
      ),
    );
  }

  return {
    blockNumber,
    weeks,
    vdot,
    paces,
  };
}

/**
 * Apply race tapering to a block
 *
 * Race A: 7-10 day taper
 * Race B: 3-4 day taper
 */
export function applyRaceTapering(
  block: TrainingBlock,
  race: Race,
  raceWeek: number,
  raceDay: number,
): TrainingBlock {
  const updatedBlock = { ...block, weeks: [...block.weeks] };
  const taperDays = race.type === 'A' ? 7 : 3;

  const weekIndex = raceWeek - 1;
  if (weekIndex < 0 || weekIndex >= updatedBlock.weeks.length) {
    return block;
  }

  const week = {
    ...updatedBlock.weeks[weekIndex],
    sessions: [...updatedBlock.weeks[weekIndex].sessions],
  };
  const dayIndex = raceDay - 1;

  if (dayIndex >= 0 && dayIndex < week.sessions.length) {
    week.sessions[dayIndex] = {
      day: raceDay,
      type: 'race',
      title: `Race Day: ${race.name}`,
      description: `${race.distance} race - ${
        race.type === 'A' ? 'Priority' : 'Tune-up'
      }`,
      race,
    };
  }

  // Apply taper to preceding days
  let daysToTaper = taperDays;
  let currentWeek = weekIndex;
  let currentDay = dayIndex - 1;

  while (daysToTaper > 0 && currentWeek >= 0) {
    while (currentDay >= 0 && daysToTaper > 0) {
      const session = week.sessions[currentDay];
      if (session.type === 'threshold') {
        week.sessions[currentDay] = {
          ...session,
          title: 'NS Intervals (Taper)',
          description: 'Reduced volume - maintain intensity',
        };
      } else if (session.type === 'long') {
        week.sessions[currentDay] = {
          ...session,
          type: 'easy',
          title: 'Easy Run (Taper)',
          description: '40 min @ easy pace',
          duration: 40,
        };
      }
      currentDay--;
      daysToTaper--;
    }

    if (daysToTaper > 0 && currentWeek > 0) {
      currentWeek--;
      currentDay = 6;
    }
  }

  updatedBlock.weeks[weekIndex] = week;

  return updatedBlock;
}

/**
 * Calculate training block from user input
 */
export function createTrainingPlan(input: UserInput): TrainingBlock {
  let vdot: number;

  if (input.time10K) {
    const parsed = parseTimeString(input.time10K);
    if (parsed) {
      vdot = calculateVDOT(DISTANCE_METERS['10K'], parsed);
    } else {
      throw new Error('Invalid 10K time format');
    }
  } else if (input.time5K) {
    const parsed = parseTimeString(input.time5K);
    if (parsed) {
      vdot = calculateVDOT(DISTANCE_METERS['5K'], parsed);
    } else {
      throw new Error('Invalid 5K time format');
    }
  } else {
    throw new Error('At least one race time is required');
  }

  const paces = calculatePaces(vdot);

  let block = generateTrainingBlock(1, input, vdot, paces);

  // Apply race tapering if races exist
  // TODO: Calculate race position in block based on date
  /* for (const race of input.races) {
   
  } */

  return block;
}

/**
 * Parse time string helper
 */
function parseTimeString(timeStr: string): number | null {
  const parts = timeStr.split(':').map(Number);
  if (parts.some(isNaN)) return null;

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return null;
}

/**
 * Get week volume multiplier for display
 */
export function getWeekLoadPercentage(weekNumber: number): number {
  return Math.round(WEEK_VOLUME_MULTIPLIERS[weekNumber - 1] * 100);
}
