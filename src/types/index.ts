// Types for Norwegian Singles Training Application

export type Distance =
  | '42K'
  | '21K'
  | '15K'
  | '10K'
  | '5K'
  | '2MI'
  | '3200M'
  | '3K'
  | '1MI'
  | '1600M'
  | '1500M';
export type RaceDistance = Distance | 'custom';
export type Locale = 'en' | 'es' | 'ko' | 'de' | 'fr';
export type Unit = 'km' | 'mile';

export const DISTANCE_METERS: Record<Distance, number> = {
  '42K': 42195,
  '21K': 21097.5,
  '15K': 15000,
  '10K': 10000,
  '5K': 5000,
  '2MI': 3218.688,
  '3200M': 3200,
  '3K': 3000,
  '1MI': 1609.344,
  '1600M': 1600,
  '1500M': 1500,
};

export const MIN_CUSTOM_DISTANCE_METERS = 800;

/** User input from the form */
export interface UserInput {
  /** Primary race distance for the entered result. */
  raceDistance?: RaceDistance;
  /** Race time for raceDistance as "mm:ss" or "h:mm:ss". */
  raceTime?: string;
  /** Custom race distance value, used when raceDistance is custom. */
  customDistance?: number;
  /** Unit for customDistance, used when raceDistance is custom. */
  customDistanceUnit?: Unit;
  /** Legacy custom race distance in kilometers. */
  customDistanceKm?: number;
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
