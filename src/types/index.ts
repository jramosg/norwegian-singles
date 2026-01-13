// Types for Norwegian Singles Training Application

export type Distance = '5K' | '10K' | '21K' | '42K';
export type SessionType =
  | 'easy'
  | 'threshold'
  | 'long'
  | 'test'
  | 'rest'
  | 'race';
export type RaceType = 'A' | 'B';
export type IntervalType = 'short' | 'medium' | 'long';
export type Locale = 'es' | 'en';

// Distance in meters
export const DISTANCE_METERS: Record<Distance, number> = {
  '5K': 5000,
  '10K': 10000,
  '21K': 21097.5,
  '42K': 42195,
};

// User input from the form
export interface UserInput {
  targetDistance: Distance;
  time5K?: string; // Format: "mm:ss" or "h:mm:ss"
  time10K?: string;
  trainingDays: number; // 3-7
  races: Race[];
}

// Pace in seconds per kilometer
export interface Paces {
  threshold: number;
  easy: number;
  intervals: {
    short: { min: number; max: number };
    medium: { min: number; max: number };
    long: { min: number; max: number };
  };
}

// Norwegian Singles interval structure
export interface IntervalSession {
  type: IntervalType;
  reps: { min: number; max: number };
  duration: string; // "3-4'" or "1K"
  paceRange: { min: number; max: number }; // seconds per km
  recovery: number; // seconds
}

// Training session for a single day
export interface TrainingSession {
  day: number; // 1-7 (Monday = 1)
  type: SessionType;
  title: string;
  description: string;
  duration?: number; // minutes
  intervals?: IntervalSession;
  paces?: {
    target: number;
    range?: { min: number; max: number };
  };
  race?: Race;
}

// Week plan within a block
export interface WeekPlan {
  weekNumber: number; // 1-6
  isTestWeek: boolean;
  isRecoveryWeek: boolean;
  sessions: TrainingSession[];
  totalVolume?: number; // km
}

// Training block (6 weeks)
export interface TrainingBlock {
  blockNumber: number;
  weeks: WeekPlan[];
  startDate?: Date;
  endDate?: Date;
  vdot: number;
  paces: Paces;
}

// Race information
export interface Race {
  id: string;
  name: string;
  date: string; // ISO date string
  type: RaceType;
  distance: Distance;
}

// Stored user data
export interface UserData {
  input: UserInput;
  vdot: number;
  paces: Paces;
  currentBlock?: TrainingBlock;
  history?: TrainingBlock[];
  createdAt: string;
  updatedAt: string;
}

// VDOT calculation result
export interface VDOTResult {
  vdot: number;
  distance: Distance;
  time: number; // seconds
}

// Time parsing result
export interface ParsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}
