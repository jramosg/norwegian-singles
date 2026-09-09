/**
 * The plan generator.
 *
 * Deterministic and pure: the same input always produces the same plan, which
 * is what shareable links, reproducible orders and the test suite depend on.
 * Nothing here resolves a pace into a number, sessions keep their anchors so
 * a later fitness update re-prices every remaining week.
 */

import { ENGINE_VERSION } from './constants';
import { marathonPaceBand } from './mp';
import {
  isDeloadWeek,
  isPhaseBoundary,
  isTestWeek,
  lastBuildWeek,
  longRunM,
  phaseForWeek,
  qualityMinutes as tierQualityMinutes,
  phaseSpan,
  weekVolumeM,
} from './phases';
import {
  REFERENCE_SUBT_PACE_SEC,
  SLOT_ASSUMED_WEIGHT,
  SLOT_BUDGET_SHARE,
  weeklyQualityBudgetM,
} from './load';
import { createResolver, sessionDistanceM } from './resolve';
import {
  getRaceWeekPrimer,
  getTestSession,
  pickMS,
  pickSubT,
  pickTaper,
  pickX,
} from './sessions';
import { strengthForWeek } from './strength';
import { getTier } from './tiers';
import type {
  DayAlternative,
  DayIndex,
  DayKind,
  RpeTarget,
  MarathonPlan,
  MarathonPlanInput,
  PlannedDay,
  PlannedWeek,
  SessionArchetype,
  SessionContext,
  Segment,
  PhaseId,
} from './types';

/** What occupies each of the seven positions in a week. */
type SlotKind =
  | 'easy'
  | 'rest'
  | 'shakeout'
  | 'long'
  | 'race'
  | 'subT_long'
  | 'subT_medium'
  | 'subT_short'
  | 'x'
  | 'ms'
  | 'test';

const DAY_MS = 86_400_000;
const SHAKEOUT_M = 6000;
const RACE_WEEK_SHAKEOUT_M = 4000;
const RACE_WEEK_EASY_M = 6000;
const MIN_EASY_M = 4000;
const MIN_SECOND_RUN_M = 5000;
/**
 * Above this, a single easy run stops being easy. The overflow goes into a
 * second run that day, which is the point of doubling: it splits a big day,
 * it does not bolt extra mileage onto one.
 */
const MAX_SINGLE_EASY_M = 16_000;

/**
 * Week templates. Position 6 is always the last day of the week, which is the
 * same weekday as the marathon, so a Saturday race shifts the whole build
 * coherently rather than leaving the long session mid-week.
 */
function template(
  phase: PhaseId,
  runDays: number,
  isRaceWeek: boolean,
): SlotKind[] {
  const filler: SlotKind = runDays >= 7 ? 'easy' : 'rest';

  if (isRaceWeek) {
    // Nothing here builds fitness. One short primer to stay sharp, a shakeout,
    // and a rest day; everything else is out of the way of the race.
    return ['easy', 'x', 'easy', 'easy', 'rest', 'shakeout', 'race'];
  }

  switch (phase) {
    case 'base':
      return ['easy', 'subT_long', 'easy', 'subT_medium', filler, 'x', 'long'];
    case 'supportive':
      return ['easy', 'subT_long', 'easy', 'subT_medium', filler, 'ms', 'long'];
    case 'specific':
      // Two quality sessions only. The weekend session is the hardest thing
      // in the week, so it gets three days before the next one and four after.
      return ['easy', 'easy', 'subT_long', 'easy', filler, 'shakeout', 'ms'];
    case 'taper':
      return ['easy', 'subT_medium', 'easy', 'x', 'rest', 'easy', 'long'];
  }
}

/**
 * Perceived-effort target per slot. Sub-threshold finishing around 7/10 with
 * a rep or two in reserve is the cue that keeps the method honest, and it is
 * also what a fitness check-in is read from.
 */
function rpeFor(slot: SlotKind): RpeTarget | undefined {
  switch (slot) {
    case 'subT_long':
    case 'subT_medium':
    case 'subT_short':
      return { target: '7', noteKey: 'rpe.subt' };
    case 'x':
      return { target: '8-9', noteKey: 'rpe.x' };
    case 'ms':
      return { target: '6-7', noteKey: 'rpe.ms' };
    case 'test':
      return { target: '10', noteKey: 'rpe.test' };
    case 'easy':
    case 'long':
    case 'shakeout':
      return { target: '2-3', noteKey: 'rpe.easy' };
    default:
      return undefined;
  }
}

const QUALITY_SLOTS: SlotKind[] = [
  'subT_long',
  'subT_medium',
  'subT_short',
  'x',
  'ms',
  'test',
];

function slotKindToDayKind(slot: SlotKind): DayKind {
  switch (slot) {
    case 'subT_long':
    case 'subT_medium':
    case 'subT_short':
      return 'subT';
    case 'shakeout':
    case 'easy':
      return 'easy';
    case 'rest':
      return 'rest';
    case 'long':
      return 'long';
    case 'race':
      return 'race';
    case 'test':
      return 'test';
    case 'x':
      return 'x';
    case 'ms':
      return 'ms';
  }
}

function archetypeFor(
  slot: SlotKind,
  ctx: SessionContext,
  isRaceWeek: boolean,
): SessionArchetype | null {
  if (isRaceWeek && slot === 'x') return getRaceWeekPrimer();
  switch (slot) {
    case 'subT_long':
      return pickSubT(ctx, 'long', 0);
    case 'subT_medium':
      return pickSubT(ctx, 'medium', 2);
    case 'subT_short':
      return pickSubT(ctx, 'short', 1);
    case 'x':
      return ctx.phase === 'taper' ? pickTaper(ctx, 0) : pickX(ctx);
    case 'ms':
      return ctx.phase === 'taper' ? pickTaper(ctx, 1) : pickMS(ctx, 0);
    case 'test':
      return getTestSession();
    default:
      return null;
  }
}

/** Monday = 0 … Sunday = 6, from a Date. */
function mondayFirstIndex(date: Date): DayIndex {
  return ((date.getUTCDay() + 6) % 7) as DayIndex;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function generateMarathonPlan(input: MarathonPlanInput): MarathonPlan {
  const tier = getTier(input.tier);
  const { lengthWeeks } = input;
  const mp = marathonPaceBand(input.fitness.fiveKEquivalentSec, tier.nominalKm);
  const resolver = createResolver(input.fitness, mp);
  const strength = input.strength;

  const raceDate = input.marathonDate
    ? new Date(`${input.marathonDate}T00:00:00Z`)
    : null;

  const weeks: PlannedWeek[] = [];

  for (let weekNumber = 1; weekNumber <= lengthWeeks; weekNumber++) {
    const phase = phaseForWeek(lengthWeeks, weekNumber);
    const span = phaseSpan(lengthWeeks, phase);
    const isRaceWeek = weekNumber === lengthWeeks;
    const targetVolumeM = weekVolumeM(input.tier, lengthWeeks, weekNumber);

    const baseCtx = {
      tier: input.tier,
      phase,
      weekNumber,
      weekInPhase: weekNumber - span.fromWeek,
      phaseWeeks: span.toWeek - span.fromWeek + 1,
      weekVolumeM: targetVolumeM,
      longRunCapM: tier.longRunCapM,
    };

    // The week owns the quality budget; each session draws its share of it.
    // Sharing a fixed per-session dose across three sessions is what pushes a
    // low-volume week to a third of its mileage at quality pace.
    const budgetM = weeklyQualityBudgetM(
      targetVolumeM,
      weekNumber,
      lastBuildWeek(lengthWeeks),
      isDeloadWeek(lengthWeeks, weekNumber),
    );
    const tierCapMin = tierQualityMinutes(input.tier, lengthWeeks, weekNumber);

    const contextFor = (slot: SlotKind): SessionContext => {
      const share = SLOT_BUDGET_SHARE[slot] ?? 0.3;
      const weight = SLOT_ASSUMED_WEIGHT[slot] ?? 1;
      const allocatedM = (budgetM * share) / weight;
      return {
        ...baseCtx,
        // Never above what the tier can absorb, whatever the volume allows.
        qualityMin: Math.min(
          tierCapMin,
          Math.round((allocatedM / 1000) * (REFERENCE_SUBT_PACE_SEC / 60)),
        ),
        workM: allocatedM,
      };
    };

    const ctx: SessionContext = contextFor('subT_long');

    const testWeek = isTestWeek(lengthWeeks, weekNumber) && !isRaceWeek;
    const slots = template(phase, tier.runDays, isRaceWeek);
    if (testWeek && (slots[5] === 'x' || slots[5] === 'ms')) {
      // On a test week the third session becomes a parkrun or time trial:
      // and the week drops to two quality sessions, because a 5K flat out is
      // the hard session. Keeping three would blow the week's quality budget.
      slots[5] = 'test';
      slots[3] = 'easy';
    }

    // Sessions first: their distance is a consequence of their structure.
    const built = slots.map((slot) => {
      const slotCtx = contextFor(slot);
      const archetype = archetypeFor(slot, slotCtx, isRaceWeek);
      if (!archetype) {
        return { slot, archetype: null, segments: null, alternative: null };
      }
      const segments: Segment[] = archetype.build(slotCtx);

      // A test needs a parkrun, a race, or the willingness to run one flat
      // out, none of which can be assumed. Every test therefore ships with
      // a real session to do instead, at no cost to the plan.
      let alternative: DayAlternative | null = null;
      if (slot === 'test') {
        const fallback = pickX(slotCtx);
        alternative = {
          sessionId: fallback.id,
          segments: fallback.build(slotCtx),
          whyKey: fallback.whyKey,
          substitutionKeys: fallback.substitutionKeys,
          reasonKey: 'alt.reason.no_event',
        };
      }
      return { slot, archetype, segments, alternative };
    });

    const longTargetM =
      phase === 'specific' && !isRaceWeek
        ? 0
        : Math.round(longRunM(input.tier, lengthWeeks, weekNumber) / 1000) *
          1000;

    const shakeoutM = isRaceWeek ? RACE_WEEK_SHAKEOUT_M : SHAKEOUT_M;

    let fixedM = 0;
    for (const b of built) {
      if (b.segments) fixedM += sessionDistanceM(b.segments, resolver);
      else if (b.slot === 'long') fixedM += longTargetM;
      else if (b.slot === 'shakeout') fixedM += shakeoutM;
    }

    const easyPositions = built
      .map((b, i) => (b.slot === 'easy' ? i : -1))
      .filter((i) => i >= 0);

    // Doubles never land next to the weekend session in the specific phase,
    // and never on a quality day.
    const doubleCount = isRaceWeek ? 0 : tier.doublesPerWeek;
    const doublePositions = new Set(
      easyPositions
        .filter((p) => !(phase === 'specific' && p >= 4))
        .slice(0, doubleCount),
    );

    const remainingM = targetVolumeM - fixedM;
    // Easy and long runs are prescribed in whole kilometres. Nobody sets out
    // to run 8.4 km, and a plan that says so reads like a spreadsheet
    // rounding error rather than a coach's instruction.
    const perEasyM = isRaceWeek
      ? RACE_WEEK_EASY_M
      : easyPositions.length > 0
        ? Math.max(
            MIN_EASY_M,
            Math.round(remainingM / easyPositions.length / 1000) * 1000,
          )
        : 0;

    // A day is split when the tier calls for a double, or when the day's
    // share has simply grown too big to run in one go.
    const splitEasyDay = (position: number): number | null => {
      if (isRaceWeek) return null;
      const wanted =
        doublePositions.has(position) || perEasyM > MAX_SINGLE_EASY_M;
      if (!wanted) return null;
      const second = Math.max(
        MIN_SECOND_RUN_M,
        Math.round((perEasyM * 0.4) / 500) * 500,
      );
      return second < perEasyM - MIN_EASY_M ? second : null;
    };

    const days: PlannedDay[] = built.map((b, position) => {
      const kind = slotKindToDayKind(b.slot);
      const isQuality = QUALITY_SLOTS.includes(b.slot);

      let targetDistanceM = 0;
      if (b.segments) targetDistanceM = sessionDistanceM(b.segments, resolver);
      else if (b.slot === 'long') targetDistanceM = longTargetM;
      else if (b.slot === 'shakeout') targetDistanceM = shakeoutM;
      else if (b.slot === 'race') targetDistanceM = 42_195;
      else if (b.slot === 'easy') targetDistanceM = perEasyM;

      const secondRunM = b.slot === 'easy' ? splitEasyDay(position) : null;
      if (secondRunM !== null) targetDistanceM = perEasyM - secondRunM;

      const day: PlannedDay = {
        dayIndex: position as DayIndex,
        kind,
        isQuality,
        targetDistanceM,
        sessionId: b.archetype?.id,
        segments: b.segments ?? undefined,
        whyKey: b.archetype?.whyKey,
        substitutionKeys: b.archetype?.substitutionKeys,
        rpe: rpeFor(b.slot),
        alternative: b.alternative ?? undefined,
      };

      if (secondRunM !== null) {
        day.secondRun = {
          targetDistanceM: secondRunM,
          anchor: { kind: 'easy' },
        };
      }

      return day;
    });

    // Dates, and with them the real weekday of every session.
    if (raceDate) {
      const weekEnd = new Date(
        raceDate.getTime() - (lengthWeeks - weekNumber) * 7 * DAY_MS,
      );
      for (const day of days) {
        const date = new Date(weekEnd.getTime() - (6 - day.dayIndex) * DAY_MS);
        day.date = isoDate(date);
        day.dayIndex = mondayFirstIndex(date);
      }
    }

    if (strength) {
      const qualityPositions = built
        .map((b, i) => (QUALITY_SLOTS.includes(b.slot) ? i : -1))
        .filter((i) => i >= 0);
      for (const placement of strengthForWeek(strength, input.tier, {
        phase,
        weekNumber,
        qualityPositions,
        isRaceWeek,
      })) {
        const day = days[placement.position];
        if (!day || day.kind === 'rest') continue;
        day.strength = [...(day.strength ?? []), placement.item];
      }
    }

    // Per-day rounding drifts a kilometre or two off the week's target, which
    // then shows up as a plan that peaks at 96 km on a page that promises 95.
    // Settle the difference on the largest easy day.
    const dayTotal = (d: PlannedDay) =>
      d.targetDistanceM + (d.secondRun?.targetDistanceM ?? 0);
    const raceM = days
      .filter((d) => d.kind === 'race')
      .reduce((sum, d) => sum + d.targetDistanceM, 0);
    const drift =
      targetVolumeM - (days.reduce((sum, d) => sum + dayTotal(d), 0) - raceM);
    const easyDays = days
      .filter((d) => d.kind === 'easy' && d.targetDistanceM > 0)
      .sort((a, b) => b.targetDistanceM - a.targetDistanceM);
    // Hand out whole kilometres, one day at a time, so every easy run stays a
    // round number and the week still adds up to its target.
    let remainingDriftKm = Math.round(drift / 1000);
    for (let i = 0; remainingDriftKm !== 0 && easyDays.length > 0; i++) {
      const day = easyDays[i % easyDays.length];
      const step = remainingDriftKm > 0 ? 1000 : -1000;
      if (step < 0 && day.targetDistanceM <= MIN_EASY_M) {
        if (easyDays.every((d) => d.targetDistanceM <= MIN_EASY_M)) break;
        continue;
      }
      day.targetDistanceM += step;
      remainingDriftKm -= step / 1000;
    }

    const actualVolumeM = days.reduce((sum, d) => sum + dayTotal(d), 0);

    weeks.push({
      weekNumber,
      phase,
      labelKey: isRaceWeek
        ? 'week.label.race'
        : testWeek
          ? 'week.label.test'
          : isDeloadWeek(lengthWeeks, weekNumber)
            ? 'week.label.deload'
            : `week.label.${phase}`,
      volumeM: actualVolumeM,
      longRunM: Math.max(
        0,
        ...days
          .filter((d) => d.kind === 'long' || d.kind === 'ms')
          .map((d) => d.targetDistanceM),
      ),
      isDeload: isDeloadWeek(lengthWeeks, weekNumber),
      isTestWeek: testWeek,
      isPhaseBoundary: isPhaseBoundary(lengthWeeks, weekNumber),
      days,
    });
  }

  const peakVolumeM = Math.max(...weeks.map((w) => w.volumeM));

  return { input, engineVersion: ENGINE_VERSION, weeks, mp, peakVolumeM };
}
