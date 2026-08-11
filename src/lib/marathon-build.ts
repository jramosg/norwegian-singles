/**
 * 15-week marathon build plan.
 * Source: "NSM: Subthreshold Running Kept Simple" by James Copeland
 *
 * Mon–Sun (indices 0–6). All durations in minutes.
 *
 * Book notation:
 *  E  = easy run
 *  S  = regular sub-T sweet spot workout (10 min WU + 6-10 min CD)
 *  S (italic) = atypical sub-T session (unusual distance/structure, still sub-T pace)
 *  * (asterisk) = marathon-specific quality bouts embedded in a longer easy run,
 *                 performed at current marathon pace
 *  bold = races
 */

export interface MBEasyDay {
  kind: 'easy';
  durationMin: number;
  /** Optional distance label, e.g. "8 km" or "10 km" */
  distanceLabel?: string;
}

export interface MBRestDay {
  kind: 'rest';
}

export interface MBSubTDay {
  kind: 'subT';
  reps: number;
  /** Distance per rep in metres */
  distanceM: number;
  paceColumn: 'rep3min' | 'rep6min' | 'rep10min';
  recoverySeconds: number;
  /** Total session time including warm-up and cool-down */
  totalDurationMin: number;
  /** True for sessions italicised in the book (atypical structure but same pace) */
  atypical?: boolean;
}

/** Marathon-pace quality bouts embedded in a run (book asterisk notation) */
export interface MBMarathonSpecificDay {
  kind: 'marathon_specific';
  reps: number;
  distanceM: number;
  recoverySeconds: number;
  totalDurationMin: number;
  /** Fixed warm-up and cool-down time for MP-dependent duration estimates */
  warmupCooldownMin?: number;
  /** e.g. "92→93→100% MP progressive, no rest" */
  paceNote?: string;
}

export interface MBRaceDay {
  kind: 'race';
  raceName: string;
  distanceM: number;
  /** Alternative if race is unavailable, e.g. "10×1000m S" */
  alternativeNote?: string;
}

export type MarathonBuildDay =
  | MBEasyDay
  | MBRestDay
  | MBSubTDay
  | MBMarathonSpecificDay
  | MBRaceDay;

export interface MarathonBuildWeek {
  weekNumber: number;
  label: string;
  days: [
    MarathonBuildDay, // Monday
    MarathonBuildDay, // Tuesday
    MarathonBuildDay, // Wednesday
    MarathonBuildDay, // Thursday
    MarathonBuildDay, // Friday
    MarathonBuildDay, // Saturday
    MarathonBuildDay, // Sunday
  ];
}

// ---------------------------------------------------------------------------
// Reusable blocks
// ---------------------------------------------------------------------------

const E60: MBEasyDay = { kind: 'easy', durationMin: 60 };
const E45: MBEasyDay = { kind: 'easy', durationMin: 45 };

const TUE_3x3200: MBSubTDay = {
  kind: 'subT',
  reps: 3,
  distanceM: 3200,
  paceColumn: 'rep10min',
  recoverySeconds: 120,
  totalDurationMin: 60,
};

const TUE_4x3000: MBSubTDay = {
  kind: 'subT',
  reps: 4,
  distanceM: 3000,
  paceColumn: 'rep10min',
  recoverySeconds: 120,
  totalDurationMin: 65,
  atypical: true,
};

const TUE_3x5000_italic: MBSubTDay = {
  kind: 'subT',
  reps: 3,
  distanceM: 5000,
  paceColumn: 'rep10min',
  recoverySeconds: 120,
  totalDurationMin: 85,
  atypical: true,
};

const TUE_5x2000: MBSubTDay = {
  kind: 'subT',
  reps: 5,
  distanceM: 2000,
  paceColumn: 'rep6min',
  recoverySeconds: 90,
  totalDurationMin: 65,
};

const THU_6x1600: MBSubTDay = {
  kind: 'subT',
  reps: 6,
  distanceM: 1600,
  paceColumn: 'rep6min',
  recoverySeconds: 90,
  totalDurationMin: 60,
};

const THU_10x1000: MBSubTDay = {
  kind: 'subT',
  reps: 10,
  distanceM: 1000,
  paceColumn: 'rep3min',
  recoverySeconds: 60,
  totalDurationMin: 58,
};

const THU_8x1000: MBSubTDay = {
  kind: 'subT',
  reps: 8,
  distanceM: 1000,
  paceColumn: 'rep3min',
  recoverySeconds: 60,
  totalDurationMin: 50,
};

const SAT_10x1000: MBSubTDay = {
  kind: 'subT',
  reps: 10,
  distanceM: 1000,
  paceColumn: 'rep3min',
  recoverySeconds: 60,
  totalDurationMin: 58,
};

const SAT_PARKRUN: MBRaceDay = {
  kind: 'race',
  raceName: 'Parkrun',
  distanceM: 5000,
  alternativeNote: 'Or 10×1000m S if no parkrun available',
};

// ---------------------------------------------------------------------------
// The 15-week build
// ---------------------------------------------------------------------------

export const MARATHON_BUILD: MarathonBuildWeek[] = [
  // === WEEKS 1–4: Base Build (same session structure, long run grows) ===
  {
    weekNumber: 1,
    label: 'Base Build',
    days: [
      E60,
      TUE_3x3200,
      E60,
      THU_6x1600,
      E60,
      SAT_10x1000,
      { kind: 'easy', durationMin: 110 },
    ],
  },
  {
    weekNumber: 2,
    label: 'Base Build',
    days: [
      E60,
      TUE_4x3000,
      E60,
      THU_6x1600,
      E60,
      SAT_10x1000,
      { kind: 'easy', durationMin: 115 },
    ],
  },
  {
    weekNumber: 3,
    label: 'Base Build',
    days: [
      E60,
      TUE_3x3200,
      E60,
      THU_6x1600,
      E60,
      SAT_10x1000,
      { kind: 'easy', durationMin: 120 },
    ],
  },
  {
    weekNumber: 4,
    label: 'Base Build',
    days: [
      E60,
      TUE_3x3200,
      E60,
      THU_6x1600,
      E60,
      SAT_10x1000,
      { kind: 'easy', durationMin: 125 },
    ],
  },

  // === WEEK 5: First Parkrun ===
  {
    weekNumber: 5,
    label: 'Parkrun Week',
    days: [
      E60,
      TUE_3x5000_italic,
      E60,
      THU_6x1600,
      E45,
      SAT_PARKRUN,
      { kind: 'easy', durationMin: 130 },
    ],
  },

  // === WEEK 6: Second Parkrun ===
  {
    weekNumber: 6,
    label: 'Parkrun Week',
    days: [
      E60,
      TUE_3x3200,
      { kind: 'easy', durationMin: 75 },
      THU_6x1600,
      E60,
      SAT_PARKRUN,
      { kind: 'easy', durationMin: 130 },
    ],
  },

  // === WEEK 7: Key Session (Sat marathon-specific 3×5000m*) ===
  {
    weekNumber: 7,
    label: 'Key Session',
    days: [
      E60,
      TUE_3x3200,
      E60,
      TUE_3x3200, // Thu = same as Tue this week
      E45,
      {
        kind: 'marathon_specific',
        reps: 3,
        distanceM: 5000,
        recoverySeconds: 120,
        totalDurationMin: 90,
      } as MBMarathonSpecificDay,
      { kind: 'easy', durationMin: 135 },
    ],
  },

  // === WEEK 8: Deload (long run drops to 90 min, Sat marathon-specific) ===
  {
    weekNumber: 8,
    label: 'Deload',
    days: [
      E60,
      TUE_3x3200,
      { kind: 'easy', durationMin: 75 },
      THU_10x1000,
      E45,
      {
        kind: 'marathon_specific',
        reps: 4,
        distanceM: 5000,
        recoverySeconds: 120,
        totalDurationMin: 100,
      } as MBMarathonSpecificDay,
      { kind: 'easy', durationMin: 90 },
    ],
  },

  // === WEEK 9: Peak Build resumes ===
  {
    weekNumber: 9,
    label: 'Peak Build',
    days: [
      E60,
      TUE_3x3200,
      E60,
      TUE_3x5000_italic, // Thu = 3×5000m italic (atypical sub-T)
      E45,
      SAT_10x1000,
      { kind: 'easy', durationMin: 140 },
    ],
  },

  // === WEEK 10: 10K Tune-up Race ===
  {
    weekNumber: 10,
    label: '10K Tune-up',
    days: [
      { kind: 'easy', durationMin: 75 },
      TUE_4x3000,
      E60,
      THU_8x1000,
      E45,
      { kind: 'easy', durationMin: 60, distanceLabel: '10 km' } as MBEasyDay,
      { kind: 'race', raceName: '10K Race', distanceM: 10000 } as MBRaceDay,
    ],
  },

  // === WEEK 11: Peak Build ===
  {
    weekNumber: 11,
    label: 'Peak Build',
    days: [
      E60,
      TUE_4x3000,
      E60,
      THU_10x1000,
      E45,
      {
        kind: 'marathon_specific',
        reps: 3,
        distanceM: 5000,
        recoverySeconds: 120,
        totalDurationMin: 90,
      } as MBMarathonSpecificDay,
      { kind: 'easy', durationMin: 140 },
    ],
  },

  // === WEEK 12: Half Marathon Tune-up Race ===
  {
    weekNumber: 12,
    label: 'Half Marathon Tune-up',
    days: [
      { kind: 'easy', durationMin: 75 },
      TUE_5x2000,
      { kind: 'easy', durationMin: 75 },
      THU_8x1000,
      E60,
      { kind: 'easy', durationMin: 50, distanceLabel: '8 km' } as MBEasyDay,
      {
        kind: 'race',
        raceName: 'Half Marathon',
        distanceM: 21097,
      } as MBRaceDay,
    ],
  },

  // === WEEK 13: Recovery + Marathon-Specific Work ===
  {
    weekNumber: 13,
    label: 'MP Introduction',
    days: [
      E60,
      { kind: 'easy', durationMin: 75 },
      { kind: 'easy', durationMin: 90 },
      E60,
      {
        kind: 'marathon_specific',
        reps: 5,
        distanceM: 5000,
        recoverySeconds: 120,
        totalDurationMin: 110,
      } as MBMarathonSpecificDay,
      { kind: 'easy', durationMin: 60, distanceLabel: '10 km' } as MBEasyDay,
      {
        kind: 'marathon_specific',
        reps: 1,
        distanceM: 10000,
        recoverySeconds: 0,
        totalDurationMin: 90,
        warmupCooldownMin: 50,
        paceNote: '25 min WU + 10 km @ current MP + 25 min CD',
      } as MBMarathonSpecificDay,
    ],
  },

  // === WEEK 14: Race Prep ===
  {
    weekNumber: 14,
    label: 'Race Prep',
    days: [
      E45,
      {
        kind: 'marathon_specific',
        reps: 3,
        distanceM: 8000,
        recoverySeconds: 0,
        totalDurationMin: 120,
        paceNote: '92→93→100% MP progressive, no rest. 25 min WU + 10 min CD.',
      } as MBMarathonSpecificDay,
      E45,
      THU_8x1000,
      E60,
      { kind: 'easy', durationMin: 60, distanceLabel: '10 km' } as MBEasyDay,
      {
        kind: 'marathon_specific',
        reps: 3,
        distanceM: 3000,
        recoverySeconds: 120,
        totalDurationMin: 90,
        paceNote: 'Goal MP with 2 min rests. 30 min WU + 30 min CD.',
      } as MBMarathonSpecificDay,
    ],
  },

  // === WEEK 15: Taper & Race ===
  {
    weekNumber: 15,
    label: 'Taper & Race',
    days: [
      E45,
      {
        kind: 'subT',
        reps: 1,
        distanceM: 5000,
        paceColumn: 'rep10min',
        recoverySeconds: 0,
        totalDurationMin: 40,
      } as MBSubTDay,
      E45,
      {
        kind: 'subT',
        reps: 1,
        distanceM: 5000,
        paceColumn: 'rep10min',
        recoverySeconds: 0,
        totalDurationMin: 40,
      } as MBSubTDay,
      { kind: 'easy', durationMin: 40 },
      { kind: 'easy', durationMin: 25 },
      { kind: 'race', raceName: 'Marathon', distanceM: 42195 } as MBRaceDay,
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/**
 * Estimate a marathon-specific session duration from the current MP.
 * Sessions without a fixed warm-up/cool-down value retain their plan total.
 */
export function getMarathonSpecificDurationMin(
  day: MBMarathonSpecificDay,
  marathonPaceSecondsPerKm: number,
): number {
  if (day.warmupCooldownMin === undefined) return day.totalDurationMin;

  const workSeconds =
    (day.reps * day.distanceM * marathonPaceSecondsPerKm) / 1000;
  const recoverySeconds = Math.max(0, day.reps - 1) * day.recoverySeconds;

  return Math.round(
    day.warmupCooldownMin + (workSeconds + recoverySeconds) / 60,
  );
}

/**
 * Calculate the Monday of week 1 for a given marathon date.
 * Week 15 Sunday = marathon day → Week 1 Monday = marathon − 104 days.
 */
export function getBuildStartDate(marathonDateStr: string): Date {
  const d = new Date(marathonDateStr);
  d.setDate(d.getDate() - 104);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Monday of the given week number (1-based). */
export function getWeekStartDate(
  marathonDateStr: string,
  weekNumber: number,
): Date {
  const start = getBuildStartDate(marathonDateStr);
  start.setDate(start.getDate() + (weekNumber - 1) * 7);
  return start;
}

/**
 * Returns which build week we're currently in (1–15), or null if
 * training hasn't started or the marathon has already passed.
 */
export function getCurrentBuildWeek(marathonDateStr: string): number | null {
  const startDate = getBuildStartDate(marathonDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(
    (today.getTime() - startDate.getTime()) / 86_400_000,
  );
  if (diffDays < 0) return null;
  const week = Math.floor(diffDays / 7) + 1;
  return week <= 15 ? week : null;
}

/** Returns how many full weeks remain until the marathon. */
export function getWeeksToMarathon(marathonDateStr: string): number {
  const marathon = new Date(marathonDateStr);
  marathon.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(
    (marathon.getTime() - today.getTime()) / 86_400_000,
  );
  return Math.max(0, Math.floor(diffDays / 7));
}
