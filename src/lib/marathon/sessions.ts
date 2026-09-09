/**
 * The session catalog.
 *
 * Every session is data plus a `build` that scales it to the tier and the
 * week. Sessions never carry a pace, only an anchor, so the same archetype
 * serves a 3:00 and a 5:00 marathoner.
 *
 * Sources of the archetypes: Bakken's published subthreshold and X-session
 * structures, and the generic marathon-specific constructs common to every
 * modern marathon plan. No third party's week-by-week table is reproduced.
 */

import { tierAtLeast } from './tiers';
import type {
  Effort,
  PaceAnchor,
  Segment,
  SessionArchetype,
  SessionContext,
  SubTFamily,
  TierId,
} from './types';

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

const EASY: PaceAnchor = { kind: 'easy' };
const subT = (column: 'rep3min' | 'rep6min' | 'rep10min'): PaceAnchor => ({
  kind: 'subT',
  column,
});
const mp = (pct: number): PaceAnchor => ({ kind: 'mp', pct });
const race = (distance: '3K' | '5K' | '10K' | '21K'): PaceAnchor => ({
  kind: 'race',
  distance,
});
const effort = (
  label: 'hill_strong' | 'hill_max' | 'max_speed' | 'above_threshold',
): PaceAnchor => ({ kind: 'effort', label });

function easySteady(distanceM: number, label?: string): Segment {
  return { kind: 'steady', distanceM, anchor: EASY, label };
}

/**
 * Warm-up and cool-down scale with the week, not with the tier.
 *
 * A flat 3 km plus 2 km put 13.5 km of a 75 km week into warm-ups alone,
 * which squeezed the easy days down to 5 km and left a week that was 87%
 * quality sessions and long run. Most of the week has to be easy running for
 * this method to work at all.
 */
function warmupM(ctx: SessionContext): number {
  return roundTo(Math.min(4000, Math.max(2000, ctx.weekVolumeM * 0.035)), 500);
}

function cooldownM(ctx: SessionContext): number {
  return roundTo(Math.min(3000, Math.max(1500, ctx.weekVolumeM * 0.025)), 500);
}

function wrap(ctx: SessionContext, ...work: Segment[]): Segment[] {
  return [
    easySteady(warmupM(ctx), 'warmup'),
    ...work,
    easySteady(cooldownM(ctx), 'cooldown'),
  ];
}

/** Reps needed to hit the tier's quality budget, clamped to sane bounds. */
function repsFor(
  qualityMin: number,
  repMinutes: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, Math.round(qualityMin / repMinutes)));
}

const min = (m: number): number => m * 60;
const roundTo = (value: number, step: number): number =>
  Math.round(value / step) * step;

/**
 * Total distance for a marathon-specific session. In the specific phase the
 * session *is* the long run, so it takes the full share; in the supportive
 * phase it is a workout sitting alongside a long run and stays much shorter.
 */
function longSessionM(ctx: SessionContext, share?: number): number {
  const resolved = share ?? (ctx.phase === 'specific' ? 0.28 : 0.19);
  return roundTo(Math.min(ctx.longRunCapM, ctx.weekVolumeM * resolved), 500);
}

/**
 * How much *marathon-pace* running a session should contain. Fixed rep counts
 * do not survive four tiers: three by five kilometres is a sensible session at
 * 120 km a week and a race at 75, so the budget comes first and the rep count
 * follows from it. The budget itself is set by the week, not the session.
 */
function msWorkM(ctx: SessionContext): number {
  return roundTo(Math.min(20_000, ctx.workM), 500);
}

/** Reps of `repM` that spend the session's allocation, within bounds. */
function repsForWork(
  ctx: SessionContext,
  repM: number,
  low: number,
  high: number,
): number {
  return Math.max(low, Math.min(high, Math.round(ctx.workM / repM)));
}

/**
 * Rep count for an X-session, chosen the way a coach would: by tier, growing
 * a little across the phase.
 *
 * X-sessions deliberately do *not* take their dose from the weekly quality
 * budget. Dividing a threshold-shaped budget by a VO2 cost produced things
 * like 3 x 1 km at 10K pace, which is not a session anyone would prescribe.
 * The budget still binds the week as a whole through the load ceiling; it
 * just no longer decides what a session looks like.
 */
function xReps(
  ctx: SessionContext,
  perTier: [number, number, number, number],
  growth = 1,
): number {
  const base = tierAtLeast(ctx.tier, 'singles140')
    ? perTier[3]
    : tierAtLeast(ctx.tier, 'singles120')
      ? perTier[2]
      : tierAtLeast(ctx.tier, 'singles95')
        ? perTier[1]
        : perTier[0];
  // A couple of reps added over the course of the phase, not per week.
  const added = Math.floor((ctx.weekInPhase / Math.max(1, ctx.phaseWeeks)) * 2);
  return base + added * growth;
}

/** Reps of `repM` needed to spend the budget, clamped to a sane count. */
function msReps(
  ctx: SessionContext,
  repM: number,
  low: number,
  high: number,
): number {
  return Math.max(low, Math.min(high, Math.round(msWorkM(ctx) / repM)));
}

// ---------------------------------------------------------------------------
// Subthreshold sessions
// ---------------------------------------------------------------------------

const SUBT: SessionArchetype[] = [
  {
    id: 'subt_10min_reps',
    kind: 'subT',
    family: 'long',
    phases: ['base', 'supportive', 'specific', 'taper'],
    whyKey: 'why.subt.long',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 10, 2, 5);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: min(10), anchor: subT('rep10min') },
        recovery: { kind: 'jog', durationSec: min(2) },
      });
    },
  },
  {
    id: 'subt_12min_reps',
    kind: 'subT',
    family: 'long',
    phases: ['base', 'supportive', 'specific'],
    minQualityMin: 32,
    whyKey: 'why.subt.long',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 12, 3, 4);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: min(12), anchor: subT('rep10min') },
        recovery: { kind: 'jog', durationSec: min(2) },
      });
    },
  },
  {
    id: 'subt_3km_reps',
    kind: 'subT',
    family: 'long',
    phases: ['base', 'supportive', 'specific'],
    minQualityMin: 32,
    whyKey: 'why.subt.long',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 12, 3, 4);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { distanceM: 3000, anchor: subT('rep10min') },
        recovery: { kind: 'jog', durationSec: min(2) },
      });
    },
  },
  {
    id: 'subt_continuous_varied',
    kind: 'subT',
    family: 'long',
    phases: ['base', 'supportive'],
    // A continuous run that switches gears is a session you have to already
    // know your paces to execute. It has no place in week two.
    minQualityMin: 34,
    whyKey: 'why.subt.continuous',
    substitutionKeys: ['sub.treadmill'],
    build: (ctx) => {
      const blocks: Effort[] = [];
      const total = Math.max(4, Math.round(ctx.qualityMin / 4));
      for (let i = 0; i < total; i++) {
        // Top and bottom of the subthreshold range, not two adjacent gears:
        // the contrast has to be big enough to feel.
        blocks.push({
          durationSec: min(4),
          anchor: subT(i % 2 === 0 ? 'rep10min' : 'rep3min'),
        });
      }
      return wrap(ctx, {
        kind: 'progression',
        blocks,
        label: 'alternating',
      });
    },
  },
  {
    id: 'subt_6min_reps',
    kind: 'subT',
    family: 'medium',
    phases: ['base', 'supportive', 'specific', 'taper'],
    whyKey: 'why.subt.medium',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 6, 3, 8);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: min(6), anchor: subT('rep6min') },
        recovery: { kind: 'jog', durationSec: 90 },
      });
    },
  },
  {
    id: 'subt_6x6_easy_rest',
    kind: 'subT',
    family: 'medium',
    phases: ['supportive', 'specific'],
    minQualityMin: 22,
    whyKey: 'why.subt.connected',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 6, 4, 7);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: min(6), anchor: subT('rep6min') },
        // Two minutes of easy *running* rather than a jog: keeps the session
        // continuous, which is the point for marathon-specific endurance.
        recovery: { kind: 'easy', durationSec: min(2), anchor: EASY },
      });
    },
  },
  {
    id: 'subt_1km_reps',
    kind: 'subT',
    family: 'medium',
    phases: ['base', 'supportive', 'specific', 'taper'],
    minQualityMin: 18,
    whyKey: 'why.subt.medium',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 4, 5, 12);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { distanceM: 1000, anchor: subT('rep6min') },
        recovery: { kind: 'jog', durationSec: 70 },
      });
    },
  },
  {
    id: 'subt_2km_reps',
    kind: 'subT',
    family: 'medium',
    phases: ['base', 'supportive', 'specific', 'taper'],
    minQualityMin: 22,
    whyKey: 'why.subt.medium',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 8, 3, 6);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { distanceM: 2000, anchor: subT('rep6min') },
        recovery: { kind: 'jog', durationSec: 90 },
      });
    },
  },
  {
    id: 'subt_400s',
    kind: 'subT',
    family: 'short',
    phases: ['base', 'supportive', 'taper'],
    whyKey: 'why.subt.short',
    substitutionKeys: ['sub.no_track'],
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 1.6, 10, 25);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { distanceM: 400, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 30 },
      });
    },
  },
  {
    id: 'subt_45_15',
    kind: 'subT',
    family: 'short',
    phases: ['base', 'supportive', 'taper'],
    whyKey: 'why.subt.4515',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 0.75, 20, 30);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: 45, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 15 },
      });
    },
  },
  {
    id: 'subt_3min_reps',
    kind: 'subT',
    family: 'short',
    phases: ['base', 'supportive', 'specific', 'taper'],
    whyKey: 'why.subt.short',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 3, 6, 14);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        work: { durationSec: min(3), anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 60 },
      });
    },
  },
  {
    id: 'subt_30_30_blocks',
    kind: 'subT',
    family: 'short',
    phases: ['base', 'supportive'],
    whyKey: 'why.subt.3030',
    build: (ctx) => {
      const sets = ctx.qualityMin >= 34 ? 4 : 3;
      return wrap(ctx, {
        kind: 'interval',
        sets,
        count: 8,
        work: { durationSec: 30, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 30 },
        setRecovery: { kind: 'jog', durationSec: min(3) },
      });
    },
  },
];

// ---------------------------------------------------------------------------
// X-sessions, the third session of the base phase
// ---------------------------------------------------------------------------

const X_SESSIONS: SessionArchetype[] = [
  {
    id: 'x_hills_short',
    kind: 'x',
    phases: ['base'],
    whyKey: 'why.x.hills_short',
    needsHill: true,
    substitutionKeys: ['sub.no_hill_flat_strides', 'sub.treadmill_incline'],
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: xReps(ctx, [8, 8, 10, 10], 0),
        work: { distanceM: 80, anchor: effort('max_speed') },
        recovery: { kind: 'walk', durationSec: min(2) },
      }),
  },
  {
    id: 'x_hills_200',
    kind: 'x',
    phases: ['base'],
    whyKey: 'why.x.hills_200',
    needsHill: true,
    substitutionKeys: ['sub.no_hill_flat_reps', 'sub.treadmill_incline'],
    build: (ctx) => {
      const reps = xReps(ctx, [8, 10, 12, 14]);
      return wrap(
        ctx,
        {
          kind: 'interval',
          count: reps,
          work: { distanceM: 200, anchor: effort('hill_strong') },
          recovery: { kind: 'jog', distanceM: 200 },
        },
        // Bakken's drip load: a small dose of the previous phase's stimulus.
        {
          kind: 'interval',
          count: 3,
          work: { distanceM: 60, anchor: effort('max_speed') },
          recovery: { kind: 'walk', durationSec: min(2) },
          label: 'drip',
        },
      );
    },
  },
  {
    id: 'x_hills_long',
    kind: 'x',
    phases: ['base'],
    whyKey: 'why.x.hills_long',
    needsHill: true,
    substitutionKeys: ['sub.no_hill_flat_reps', 'sub.treadmill_incline'],
    build: (ctx) =>
      wrap(
        ctx,
        {
          kind: 'interval',
          count: xReps(ctx, [4, 5, 6, 6]),
          work: { distanceM: 700, anchor: effort('above_threshold') },
          recovery: { kind: 'jog', distanceM: 700 },
        },
        {
          kind: 'interval',
          count: 2,
          work: { distanceM: 200, anchor: effort('hill_strong') },
          recovery: { kind: 'jog', distanceM: 200 },
          label: 'drip',
        },
      ),
  },
  {
    id: 'x_45_15_progressive',
    kind: 'x',
    phases: ['base', 'supportive'],
    whyKey: 'why.x.4515_progressive',
    build: (ctx) => {
      const reps = repsFor(ctx.qualityMin, 0.75, 15, 30);
      return wrap(ctx, {
        kind: 'interval',
        count: reps,
        // Starts just under threshold and finishes above it.
        work: { durationSec: 45, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 15 },
        label: 'progressive',
      });
    },
  },
  {
    id: 'x_1km_vo2',
    kind: 'x',
    phases: ['base'],
    whyKey: 'why.x.vo2',
    substitutionKeys: ['sub.no_track'],
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: xReps(ctx, [5, 6, 8, 8]),
        work: { distanceM: 1000, anchor: race('10K') },
        recovery: { kind: 'jog', durationSec: min(2) },
      }),
  },
  {
    id: 'x_3min_vo2',
    kind: 'x',
    phases: ['base'],
    whyKey: 'why.x.vo2',
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: xReps(ctx, [5, 6, 7, 8], 0),
        work: { durationSec: min(3), anchor: race('5K') },
        recovery: { kind: 'jog', durationSec: min(2) },
      }),
  },
  {
    id: 'x_400_long_rest',
    kind: 'x',
    phases: ['base', 'taper'],
    whyKey: 'why.x.long_rest',
    substitutionKeys: ['sub.no_track'],
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: xReps(ctx, [8, 10, 10, 12], 0),
        work: { distanceM: 400, anchor: race('5K') },
        // Long easy rests: ten separate high-quality doses instead of one
        // grinding session. Race-pace work without the wreckage.
        recovery: { kind: 'easy', durationSec: min(3), anchor: EASY },
      }),
  },
];

const TEST_SESSION: SessionArchetype = {
  id: 'x_test_5k',
  kind: 'test',
  phases: ['base', 'supportive'],
  whyKey: 'why.test',
  needsEvent: true,
  substitutionKeys: ['sub.no_parkrun_solo_tt', 'sub.skip_test_checkin'],
  build: (ctx) =>
    wrap(ctx, {
      kind: 'steady',
      distanceM: 5000,
      anchor: race('5K'),
      label: 'test',
    }),
};

// ---------------------------------------------------------------------------
// Marathon-specific sessions
// ---------------------------------------------------------------------------

const MS_MODERATE: SessionArchetype[] = [
  {
    id: 'ms_mp_blocks_long',
    kind: 'ms',
    phases: ['supportive'],
    whyKey: 'why.ms.blocks',
    build: (ctx) => {
      const repM = roundTo(msWorkM(ctx) / 3, 500);
      return wrap(ctx, {
        kind: 'interval',
        count: 3,
        work: { distanceM: repM, anchor: mp(100) },
        recovery: { kind: 'jog', durationSec: min(2) },
      });
    },
  },
  {
    id: 'ms_mp_blocks_short',
    kind: 'ms',
    phases: ['supportive'],
    whyKey: 'why.ms.blocks',
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: msReps(ctx, 2000, 4, 8),
        work: { distanceM: 2000, anchor: mp(100) },
        recovery: { kind: 'jog', durationSec: 90 },
      }),
  },
  {
    id: 'ms_mp_block',
    kind: 'ms',
    phases: ['supportive'],
    whyKey: 'why.ms.continuous',
    build: (ctx) => {
      const block = msWorkM(ctx);
      const leadIn = roundTo(warmupM(ctx) * 1.5, 500);
      return [
        easySteady(leadIn, 'lead_in'),
        { kind: 'steady', distanceM: block, anchor: mp(100), label: 'mp' },
        easySteady(cooldownM(ctx), 'cooldown'),
      ];
    },
  },
  {
    id: 'ms_3k_1k',
    kind: 'ms',
    phases: ['supportive', 'specific'],
    whyKey: 'why.ms.alternating',
    build: (ctx) => {
      const repM = roundTo(Math.min(3000, msWorkM(ctx) / 3), 500);
      return wrap(ctx, {
        kind: 'interval',
        count: msReps(ctx, repM, 3, 6),
        work: { distanceM: repM, anchor: mp(100) },
        // The float is the session: no standing around, no full recovery.
        recovery: { kind: 'float', distanceM: 1000, anchor: mp(85) },
      });
    },
  },
  {
    id: 'ms_kenyan',
    kind: 'ms',
    phases: ['supportive'],
    whyKey: 'why.ms.progression',
    build: (ctx) => {
      const total = roundTo(Math.max(6000, msWorkM(ctx)), 500);
      const block = roundTo(total / 4, 500);
      return [
        {
          kind: 'progression',
          blocks: [
            { distanceM: block, anchor: mp(82) },
            { distanceM: block, anchor: mp(88) },
            { distanceM: block, anchor: mp(94) },
            { distanceM: total - 3 * block, anchor: mp(100) },
          ],
        },
        easySteady(1500, 'cooldown'),
      ];
    },
  },
];

const MS_BIG: SessionArchetype[] = [
  {
    id: 'ms_long_mp',
    kind: 'ms',
    phases: ['specific'],
    whyKey: 'why.ms.long_specific',
    build: (ctx) => {
      const total = longSessionM(ctx);
      const work = msWorkM(ctx);
      const leadIn = roundTo((total - work) * 0.6, 500);
      const half = roundTo(work / 2, 500);
      return [
        easySteady(leadIn, 'lead_in'),
        {
          kind: 'progression',
          blocks: [
            { distanceM: half, anchor: mp(95) },
            { distanceM: work - half, anchor: mp(100) },
          ],
        },
        easySteady(Math.max(1500, total - leadIn - work), 'cooldown'),
      ];
    },
  },
  {
    id: 'ms_8888',
    kind: 'ms',
    phases: ['specific'],
    minTier: 'singles95',
    whyKey: 'why.ms.progressive_blocks',
    build: (ctx) => {
      const total = longSessionM(ctx);
      const work = msWorkM(ctx);
      const block = roundTo(work / 4, 500);
      const leadIn = roundTo((total - 4 * block) * 0.55, 500);
      return [
        easySteady(leadIn, 'lead_in'),
        {
          kind: 'progression',
          blocks: [
            { distanceM: block, anchor: mp(90) },
            { distanceM: block, anchor: mp(94) },
            { distanceM: block, anchor: mp(98) },
            { distanceM: block, anchor: mp(100) },
          ],
        },
        easySteady(Math.max(1500, total - leadIn - 4 * block), 'cooldown'),
      ];
    },
  },
  {
    id: 'ms_mp_blocks_big',
    kind: 'ms',
    phases: ['specific'],
    whyKey: 'why.ms.blocks',
    build: (ctx) => {
      const repM = roundTo(Math.min(5000, msWorkM(ctx) / 3), 500);
      return wrap(ctx, {
        kind: 'interval',
        count: msReps(ctx, repM, 3, 5),
        work: { distanceM: repM, anchor: mp(100) },
        recovery: { kind: 'jog', durationSec: min(2) },
      });
    },
  },
  {
    id: 'ms_5k_float',
    kind: 'ms',
    phases: ['specific'],
    whyKey: 'why.ms.alternating',
    build: (ctx) => {
      const repM = roundTo(Math.min(5000, msWorkM(ctx) / 3), 500);
      return wrap(ctx, {
        kind: 'interval',
        count: msReps(ctx, repM, 2, 4),
        work: { distanceM: repM, anchor: mp(102) },
        recovery: { kind: 'float', distanceM: 1000, anchor: mp(85) },
      });
    },
  },
  {
    id: 'ms_10k_in_long',
    kind: 'ms',
    phases: ['specific'],
    whyKey: 'why.ms.continuous',
    build: (ctx) => {
      const total = longSessionM(ctx);
      const block = msWorkM(ctx);
      const leadIn = roundTo((total - block) * 0.6, 500);
      return [
        easySteady(leadIn, 'lead_in'),
        { kind: 'steady', distanceM: block, anchor: mp(100), label: 'mp' },
        easySteady(Math.max(1500, total - leadIn - block), 'cooldown'),
      ];
    },
  },
];

const RACE_WEEK_PRIMER: SessionArchetype = {
  id: 'race_week_primer',
  kind: 'x',
  phases: ['taper'],
  whyKey: 'why.taper.primer',
  build: () => [
    easySteady(2000, 'warmup'),
    {
      kind: 'interval',
      count: 6,
      work: { durationSec: 60, anchor: subT('rep3min') },
      recovery: { kind: 'jog', durationSec: 60 },
    },
    easySteady(1500, 'cooldown'),
  ],
};

const TAPER_SESSIONS: SessionArchetype[] = [
  {
    id: 'taper_20x1min',
    kind: 'x',
    phases: ['taper'],
    whyKey: 'why.taper.sharpener',
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: 20,
        work: { durationSec: 60, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 60 },
      }),
  },
  {
    id: 'taper_mp_sharpener',
    kind: 'ms',
    phases: ['taper'],
    whyKey: 'why.taper.mp',
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        count: 3,
        work: { distanceM: 2000, anchor: mp(100) },
        recovery: { kind: 'jog', durationSec: min(2) },
      }),
  },
  {
    id: 'taper_30_30',
    kind: 'x',
    phases: ['taper'],
    whyKey: 'why.taper.sharpener',
    build: (ctx) =>
      wrap(ctx, {
        kind: 'interval',
        sets: 2,
        count: 8,
        work: { durationSec: 30, anchor: subT('rep3min') },
        recovery: { kind: 'jog', durationSec: 30 },
        setRecovery: { kind: 'jog', durationSec: min(3) },
      }),
  },
];

// ---------------------------------------------------------------------------
// Catalog access
// ---------------------------------------------------------------------------

export const ALL_SESSIONS: SessionArchetype[] = [
  RACE_WEEK_PRIMER,
  ...SUBT,
  ...X_SESSIONS,
  TEST_SESSION,
  ...MS_MODERATE,
  ...MS_BIG,
  ...TAPER_SESSIONS,
];

export function getSession(id: string): SessionArchetype {
  const found = ALL_SESSIONS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown session archetype: ${id}`);
  return found;
}

function eligible(archetype: SessionArchetype, ctx: SessionContext): boolean {
  if (!archetype.phases.includes(ctx.phase)) return false;
  if (archetype.minTier && !tierAtLeast(ctx.tier, archetype.minTier)) {
    return false;
  }
  if (archetype.minQualityMin && ctx.qualityMin < archetype.minQualityMin) {
    return false;
  }
  return true;
}

/**
 * Deterministic rotation. The same input always yields the same plan, which
 * shareable links and the test suite both depend on.
 */
function pick(
  candidates: SessionArchetype[],
  ctx: SessionContext,
  salt: number,
): SessionArchetype {
  const pool = candidates.filter((c) => eligible(c, ctx));
  if (pool.length === 0) {
    throw new Error(
      `No eligible session for ${ctx.phase}/${ctx.tier} (salt ${salt})`,
    );
  }
  return pool[(ctx.weekNumber + salt) % pool.length];
}

export function pickSubT(
  ctx: SessionContext,
  family: SubTFamily,
  salt = 0,
): SessionArchetype {
  return pick(
    SUBT.filter((s) => s.family === family),
    ctx,
    salt,
  );
}

/**
 * The X-session for a base-phase week. Hills rotate on Bakken's three-week
 * cycle (short sprints, 200s, long reps) so the stimulus varies without the
 * injury risk of a fixed hill session.
 */
export function pickX(ctx: SessionContext): SessionArchetype {
  const hillCycle = ['x_hills_short', 'x_hills_200', 'x_hills_long'];
  // Every other week is a hill week; the alternates are speed/threshold work.
  if (ctx.weekInPhase % 2 === 0) {
    const id = hillCycle[Math.floor(ctx.weekInPhase / 2) % hillCycle.length];
    return getSession(id);
  }
  return pick(
    X_SESSIONS.filter((s) => !s.needsHill),
    ctx,
    1,
  );
}

export function getTestSession(): SessionArchetype {
  return TEST_SESSION;
}

export function pickMS(ctx: SessionContext, salt = 0): SessionArchetype {
  const pool = ctx.phase === 'specific' ? MS_BIG : MS_MODERATE;
  return pick(pool, ctx, salt);
}

export function pickTaper(ctx: SessionContext, salt = 0): SessionArchetype {
  return pick(TAPER_SESSIONS, ctx, salt);
}

export function getRaceWeekPrimer(): SessionArchetype {
  return RACE_WEEK_PRIMER;
}

export { SUBT, X_SESSIONS, MS_MODERATE, MS_BIG, TAPER_SESSIONS };
