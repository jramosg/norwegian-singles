/**
 * NSM Taper & Reverse-Taper Plans
 * Source: "NSM: Subthreshold Running Kept Simple" by James Copeland, Tables 3.1–3.6
 *
 * TaperDay.factor lets the PlanViewer calculate actual minutes instead of
 * showing vague "X% shorter than normal" text — it multiplies the normal
 * day duration by the factor (e.g. 0.6 = 40% shorter).
 * dayIndex: 0=Mon … 6=Sun — used to look up the normal session.
 */

export type TaperTargetRace = '10k' | 'half' | 'marathon';

export type TaperDayKind =
  | 'easy_normal' // same duration as the normal week day
  | 'easy_shorter' // factor × normal easy duration
  | 'subt_normal' // normal sub-T session from the plan
  | 'subt_modified' // different reps/pace from normal (described in description)
  | 'race'
  | 'rest';

export interface TaperDay {
  day: string;
  /** Index in the weekly plan (0 = Mon, 6 = Sun) for duration lookup */
  dayIndex: number;
  kind: TaperDayKind;
  /**
   * For easy_shorter: fraction of normal duration to keep.
   * e.g. 0.7 = 30% shorter, 0.6 = 40% shorter.
   */
  factor?: number;
  /** Translation key for fallback/modified descriptions */
  description: string;
}

export interface TaperPlan {
  name: string;
  race: TaperTargetRace;
  days: TaperDay[];
}

// Table 3.1 — Taper leading into a 10 km Race (race on Sunday)
export const TAPER_10K: TaperPlan = {
  name: 'Taper into 10K',
  race: '10k',
  days: [
    {
      day: 'Monday',
      dayIndex: 0,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Tuesday',
      dayIndex: 1,
      kind: 'subt_normal',
      description: 'taper.desc.subt_normal',
    },
    {
      day: 'Wednesday',
      dayIndex: 2,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Thursday',
      dayIndex: 3,
      kind: 'subt_modified',
      description: 'taper.desc.10k_taper_thursday',
    },
    {
      day: 'Friday',
      dayIndex: 4,
      kind: 'easy_shorter',
      factor: 0.7,
      description: 'taper.desc.easy_shorter_30',
    },
    {
      day: 'Saturday',
      dayIndex: 5,
      kind: 'easy_shorter',
      factor: 0.6,
      description: 'taper.desc.easy_shorter_40',
    },
    {
      day: 'Sunday',
      dayIndex: 6,
      kind: 'race',
      description: 'taper.desc.race',
    },
  ],
};

// Table 3.4 — Reverse Taper after a 10 km Race
export const REVERSE_TAPER_10K: TaperPlan = {
  name: 'Recovery after 10K',
  race: '10k',
  days: [
    {
      day: 'Monday',
      dayIndex: 0,
      kind: 'easy_shorter',
      factor: 0.75,
      description: 'taper.desc.easy_shorter_20_25',
    },
    {
      day: 'Tuesday',
      dayIndex: 1,
      kind: 'subt_modified',
      description: 'taper.desc.3x10_mp_reduced',
    },
    {
      day: 'Wednesday',
      dayIndex: 2,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Thursday',
      dayIndex: 3,
      kind: 'subt_normal',
      description: 'taper.desc.scheduled_normal_workout',
    },
    {
      day: 'Friday',
      dayIndex: 4,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Saturday',
      dayIndex: 5,
      kind: 'subt_normal',
      description: 'taper.desc.scheduled_normal_workout',
    },
    {
      day: 'Sunday',
      dayIndex: 6,
      kind: 'easy_normal',
      description: 'taper.desc.normal_long_run',
    },
  ],
};

// Table 3.5 — Taper leading into a Half Marathon Race (race on Sunday)
export const TAPER_HALF: TaperPlan = {
  name: 'Taper into Half Marathon',
  race: 'half',
  days: [
    {
      day: 'Monday',
      dayIndex: 0,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Tuesday',
      dayIndex: 1,
      kind: 'subt_modified',
      description: 'taper.desc.3x10_mp_reduced',
    },
    {
      day: 'Wednesday',
      dayIndex: 2,
      kind: 'easy_shorter',
      factor: 0.6,
      description: 'taper.desc.easy_shorter_40',
    },
    {
      day: 'Thursday',
      dayIndex: 3,
      kind: 'subt_modified',
      description: 'taper.desc.half_taper_thursday',
    },
    {
      day: 'Friday',
      dayIndex: 4,
      kind: 'easy_shorter',
      factor: 0.5,
      description: 'taper.desc.easy_shorter_50',
    },
    {
      day: 'Saturday',
      dayIndex: 5,
      kind: 'easy_shorter',
      factor: 0.6,
      description: 'taper.desc.easy_shorter_40',
    },
    {
      day: 'Sunday',
      dayIndex: 6,
      kind: 'race',
      description: 'taper.desc.race',
    },
  ],
};

// Table 3.6 — Reverse Taper after a Half Marathon Race
export const REVERSE_TAPER_HALF: TaperPlan = {
  name: 'Recovery after Half Marathon',
  race: 'half',
  days: [
    {
      day: 'Monday',
      dayIndex: 0,
      kind: 'easy_shorter',
      factor: 0.65,
      description: 'taper.desc.easy_shorter_30_40',
    },
    {
      day: 'Tuesday',
      dayIndex: 1,
      kind: 'easy_shorter',
      factor: 0.7,
      description: 'taper.desc.easy_or_shorter_30',
    },
    {
      day: 'Wednesday',
      dayIndex: 2,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Thursday',
      dayIndex: 3,
      kind: 'subt_modified',
      description: 'taper.desc.3x6_mp_reduced',
    },
    {
      day: 'Friday',
      dayIndex: 4,
      kind: 'easy_normal',
      description: 'taper.desc.easy_normal',
    },
    {
      day: 'Saturday',
      dayIndex: 5,
      kind: 'subt_normal',
      description: 'taper.desc.scheduled_normal_workout',
    },
    {
      day: 'Sunday',
      dayIndex: 6,
      kind: 'easy_shorter',
      factor: 0.85,
      description: 'taper.desc.long_run_or_15_shorter',
    },
  ],
};

/**
 * Get taper plan for a given race type.
 */
export function getTaperPlan(race: TaperTargetRace): TaperPlan {
  if (race === '10k') return TAPER_10K;
  if (race === 'half') return TAPER_HALF;
  return TAPER_HALF; // marathon fallback (book covers separately)
}

/**
 * Get reverse taper (recovery) plan for a given race type.
 */
export function getReverseTaperPlan(race: TaperTargetRace): TaperPlan {
  if (race === '10k') return REVERSE_TAPER_10K;
  return REVERSE_TAPER_HALF;
}
