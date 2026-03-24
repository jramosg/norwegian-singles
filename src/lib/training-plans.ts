/**
 * NSM Hours-Based Weekly Training Plans
 * Source: "NSM: Subthreshold Running Kept Simple" by James Copeland, Tables 2.5–3.1
 *
 * The NSM method uses repeatable weekly structures scaled by total training hours.
 * Sub-T sessions are always Tue / Thu / Sat. Easy runs fill the remaining days.
 * The plan repeats every week — progression comes from moving to the next hours tier.
 */

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type SessionKind = 'rest' | 'easy' | 'subT';

export interface EasySession {
  kind: 'easy';
  durationMin: number;
}

export interface RestSession {
  kind: 'rest';
}

/** Two easy runs in one day (morning + afternoon) */
export interface DoubleDaySession {
  kind: 'double';
  morning: EasySession;
  afternoon: EasySession;
}

export interface SubTSession {
  kind: 'subT';
  reps: number;
  /** Duration per rep in minutes */
  repDurationMin: number;
  /** Total session duration including warm-up and cool-down */
  totalDurationMin: number;
  /** Pace column to use from the NSA table */
  paceColumn: 'rep3min' | 'rep6min' | 'rep10min';
  /** Recovery between reps in seconds */
  recoverySeconds: number;
  /** Note for reduced-intensity gateway plans */
  intensityNote?: string;
}

export type DaySession =
  | EasySession
  | RestSession
  | SubTSession
  | DoubleDaySession;

export interface WeeklyPlan {
  /** Label shown to user */
  label: string;
  /** Total weekly hours (approximate) */
  hours: number;
  /** Sessions indexed by day (0=Monday … 6=Sunday) */
  days: [
    DaySession, // Monday
    DaySession, // Tuesday
    DaySession, // Wednesday
    DaySession, // Thursday
    DaySession, // Friday
    DaySession, // Saturday
    DaySession, // Sunday
  ];
}

/** Available hours tiers in ascending order */
export const PLAN_HOURS = [4.5, 5.5, 6, 6.5, 7, 7.5, 8, 9] as const;
export type PlanHours = (typeof PLAN_HOURS)[number];

/**
 * All weekly plans from the book (Tables 2.5–3.1).
 */
export const WEEKLY_PLANS: Record<PlanHours, WeeklyPlan> = {
  4.5: {
    label: '4–4.5 h/week',
    hours: 4.5,
    days: [
      { kind: 'rest' },
      {
        kind: 'subT',
        reps: 2,
        repDurationMin: 10,
        totalDurationMin: 40,
        paceColumn: 'rep10min',
        recoverySeconds: 120,
        intensityNote: '~95% of marathon pace (gateway intensity)',
      },
      { kind: 'easy', durationMin: 35 },
      {
        kind: 'subT',
        reps: 4,
        repDurationMin: 5,
        totalDurationMin: 40,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 35 },
      {
        kind: 'subT',
        reps: 7,
        repDurationMin: 3,
        totalDurationMin: 40,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 60 },
    ],
  },

  5.5: {
    label: '5–5.5 h/week',
    hours: 5.5,
    days: [
      { kind: 'easy', durationMin: 40 },
      {
        kind: 'subT',
        reps: 3,
        repDurationMin: 10,
        totalDurationMin: 50,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 40 },
      {
        kind: 'subT',
        reps: 5,
        repDurationMin: 5,
        totalDurationMin: 45,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 40 },
      {
        kind: 'subT',
        reps: 8,
        repDurationMin: 3,
        totalDurationMin: 50,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 70 },
    ],
  },

  6: {
    label: '6 h/week',
    hours: 6,
    days: [
      { kind: 'easy', durationMin: 45 },
      {
        kind: 'subT',
        reps: 3,
        repDurationMin: 10,
        totalDurationMin: 50,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 45 },
      {
        kind: 'subT',
        reps: 5,
        repDurationMin: 6,
        totalDurationMin: 50,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 40 },
      {
        kind: 'subT',
        reps: 9,
        repDurationMin: 3,
        totalDurationMin: 55,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 75 },
    ],
  },

  6.5: {
    label: '6.5 h/week',
    hours: 6.5,
    days: [
      { kind: 'easy', durationMin: 50 },
      {
        kind: 'subT',
        reps: 3,
        repDurationMin: 10,
        totalDurationMin: 55,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 45 },
      {
        kind: 'subT',
        reps: 5,
        repDurationMin: 6,
        totalDurationMin: 55,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 45 },
      {
        kind: 'subT',
        reps: 10,
        repDurationMin: 3,
        totalDurationMin: 60,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 80 },
    ],
  },

  7: {
    label: '7 h/week',
    hours: 7,
    days: [
      { kind: 'easy', durationMin: 55 },
      {
        kind: 'subT',
        reps: 3,
        repDurationMin: 10,
        totalDurationMin: 60,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 55 },
      {
        kind: 'subT',
        reps: 5,
        repDurationMin: 6,
        totalDurationMin: 55,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 50 },
      {
        kind: 'subT',
        reps: 10,
        repDurationMin: 3,
        totalDurationMin: 60,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 85 },
    ],
  },

  7.5: {
    label: '7.5 h/week',
    hours: 7.5,
    days: [
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 3,
        repDurationMin: 12,
        totalDurationMin: 65,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 5,
        repDurationMin: 6,
        totalDurationMin: 55,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 55 },
      {
        kind: 'subT',
        reps: 10,
        repDurationMin: 3,
        totalDurationMin: 60,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 95 },
    ],
  },

  8: {
    label: '8 h/week',
    hours: 8,
    days: [
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 4,
        repDurationMin: 10,
        totalDurationMin: 70,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 6,
        repDurationMin: 6,
        totalDurationMin: 65,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 10,
        repDurationMin: 3,
        totalDurationMin: 60,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      { kind: 'easy', durationMin: 105 },
    ],
  },

  9: {
    label: '9 h/week',
    hours: 9,
    days: [
      { kind: 'easy', durationMin: 60 },
      {
        kind: 'subT',
        reps: 4,
        repDurationMin: 10,
        totalDurationMin: 70,
        paceColumn: 'rep10min',
        recoverySeconds: 60,
      },
      {
        kind: 'double',
        morning: { kind: 'easy', durationMin: 35 },
        afternoon: { kind: 'easy', durationMin: 40 },
      },
      {
        kind: 'subT',
        reps: 6,
        repDurationMin: 6,
        totalDurationMin: 65,
        paceColumn: 'rep6min',
        recoverySeconds: 60,
      },
      {
        kind: 'double',
        morning: { kind: 'easy', durationMin: 35 },
        afternoon: { kind: 'easy', durationMin: 40 },
      },
      {
        kind: 'subT',
        reps: 10,
        repDurationMin: 3,
        totalDurationMin: 60,
        paceColumn: 'rep3min',
        recoverySeconds: 60,
      },
      {
        kind: 'double',
        morning: { kind: 'easy', durationMin: 90 },
        afternoon: { kind: 'easy', durationMin: 35 },
      },
    ],
  },
};

/**
 * Get the weekly plan closest to the requested hours.
 */
export function getPlanByHours(hours: number): WeeklyPlan {
  const tier = PLAN_HOURS.reduce((prev, curr) =>
    Math.abs(curr - hours) < Math.abs(prev - hours) ? curr : prev,
  );
  return WEEKLY_PLANS[tier];
}

/**
 * Return the next tier up (if any) for suggesting progression.
 */
export function getNextPlan(currentHours: PlanHours): WeeklyPlan | null {
  const idx = PLAN_HOURS.indexOf(currentHours);
  if (idx === -1 || idx === PLAN_HOURS.length - 1) return null;
  return WEEKLY_PLANS[PLAN_HOURS[idx + 1]];
}

/** Ordered days array for indexing */
export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
