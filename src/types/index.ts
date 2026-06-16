// Types for Norwegian Singles Training Application

export type Distance = '5K' | '10K' | '21K' | '42K';
export type Locale = 'es' | 'en';
export type Unit = 'km' | 'mile';

export const DISTANCE_METERS: Record<Distance, number> = {
  '5K': 5000,
  '10K': 10000,
  '21K': 21097.5,
  '42K': 42195,
};

/** User input from the form */
export interface UserInput {
  /** 5K race time as "mm:ss" (preferred for pace lookup) */
  time5K?: string;
  /** 10K race time as "mm:ss" or "h:mm:ss" (will estimate 5K) */
  time10K?: string;
  /** Weekly training hours (4.5 to 8) */
  weeklyHours: number;
  unit: Unit;
  /** Target marathon date as ISO date string (YYYY-MM-DD), optional */
  marathonDate?: string;
}

/** Resolved NSA/NSM-style training paces. */
export interface TrainingPaces {
  /** 5K time used for the lookup (seconds) */
  fiveKSeconds: number;
  /** Sub-T pace for 3-min reps (s/km) */
  rep3min: number;
  /** Sub-T pace for 6-min reps (s/km) */
  rep6min: number;
  /** Sub-T pace for 10-min reps (s/km) */
  rep10min: number;
  /** Easy run pace (s/km) */
  easy: number;
  /** Estimated marathon race pace (s/km) — used in taper/recovery sessions */
  marathonPace: number;
}

/** Complete training plan saved in storage */
export interface SavedPlan {
  input: UserInput;
  paces: TrainingPaces;
  createdAt: string;
  updatedAt: string;
}

/** Time parsing result */
export interface ParsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}
