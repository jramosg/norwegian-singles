import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb, type Db } from '../db';
import {
  DEVICE_SOFT_LIMIT,
  createOrder,
  currentFitness,
  findOrderBySessionId,
  findOrderByToken,
  findOrdersByEmail,
  getFitnessHistory,
  mintAccessToken,
  noteTokenAccess,
  orderGrantsTier,
  recordFitness,
  tiersForSku,
  type CreateOrderInput,
} from '../entitlements';
import { planForOrder, purchaseFitness } from '../plan';
import { TIER_IDS } from '../../marathon/tiers';
import { ENGINE_VERSION } from '../../marathon/constants';

let db: Db;

beforeEach(() => {
  db = createTestDb();
});

function orderInput(over: Partial<CreateOrderInput> = {}): CreateOrderInput {
  return {
    stripeSessionId: 'cs_test_1',
    email: 'runner@example.com',
    buyerName: 'Test Runner',
    sku: 'singles95',
    planInputs: {
      tier: 'singles95',
      lengthWeeks: 18,
      marathonDate: '2027-04-18',
      unit: 'km',
      raceDistanceM: 10_000,
      raceTimeSec: 2400,
    },
    engineVersion: ENGINE_VERSION,
    ...over,
  };
}

describe('access tokens', () => {
  it('mints long, unique, url-safe tokens', () => {
    const tokens = new Set(
      Array.from({ length: 500 }, () => mintAccessToken()),
    );
    expect(tokens.size).toBe(500);
    for (const token of tokens) {
      expect(token.length).toBeGreaterThanOrEqual(40);
      expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    }
  });
});

describe('createOrder', () => {
  it('is idempotent for a Checkout Session', () => {
    // Stripe delivers webhooks at least once, so replaying the same event
    // must not create a second order or a second token.
    const first = createOrder(orderInput(), db);
    const second = createOrder(orderInput(), db);

    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect(second.order.id).toBe(first.order.id);
    expect(second.order.accessToken).toBe(first.order.accessToken);

    const count = db.prepare('SELECT COUNT(*) AS n FROM orders').get() as {
      n: number;
    };
    expect(count.n).toBe(1);
  });

  it('round-trips the plan inputs the plan is rebuilt from', () => {
    const { order } = createOrder(orderInput(), db);
    expect(order.planInputs.tier).toBe('singles95');
    expect(order.planInputs.lengthWeeks).toBe(18);
    expect(order.planInputs.raceTimeSec).toBe(2400);
    expect(order.engineVersion).toBe(ENGINE_VERSION);
  });

  it('records the engine version so a plan can be reproduced as sold', () => {
    const { order } = createOrder(orderInput({ engineVersion: '0.9.9' }), db);
    expect(order.engineVersion).toBe('0.9.9');
  });
});

describe('entitlements', () => {
  it('grants one tier for a single-tier purchase', () => {
    expect(tiersForSku('singles95')).toEqual(['singles95']);
  });

  it('grants every tier for the bundle', () => {
    expect(tiersForSku('bundle')).toEqual([...TIER_IDS]);
  });

  it('will not let a single-tier order open another tier', () => {
    const { order } = createOrder(orderInput({ sku: 'singles95' }), db);
    expect(orderGrantsTier(order, 'singles95')).toBe(true);
    expect(orderGrantsTier(order, 'singles120')).toBe(false);
    expect(orderGrantsTier(order, 'singles75')).toBe(false);
  });

  it('lets a bundle order open all four tiers', () => {
    const { order } = createOrder(orderInput({ sku: 'bundle' }), db);
    for (const tier of TIER_IDS) {
      expect(orderGrantsTier(order, tier)).toBe(true);
    }
  });
});

describe('finding an order', () => {
  it('finds it by its token', () => {
    const { order } = createOrder(orderInput(), db);
    expect(findOrderByToken(order.accessToken, db)?.id).toBe(order.id);
  });

  it('returns null for an unknown or malformed token', () => {
    createOrder(orderInput(), db);
    expect(findOrderByToken('nope', db)).toBeNull();
    expect(findOrderByToken('', db)).toBeNull();
    expect(findOrderByToken('x'.repeat(500), db)).toBeNull();
    expect(findOrderByToken(mintAccessToken(), db)).toBeNull();
  });

  it('finds it by Stripe session id', () => {
    const { order } = createOrder(orderInput(), db);
    expect(findOrderBySessionId('cs_test_1', db)?.id).toBe(order.id);
    expect(findOrderBySessionId('cs_test_missing', db)).toBeNull();
  });

  it('finds every order for an email, newest first', () => {
    createOrder(orderInput({ stripeSessionId: 'cs_a' }), db);
    createOrder(orderInput({ stripeSessionId: 'cs_b' }), db);
    createOrder(
      orderInput({ stripeSessionId: 'cs_c', email: 'other@example.com' }),
      db,
    );
    expect(findOrdersByEmail('runner@example.com', db)).toHaveLength(2);
    expect(findOrdersByEmail('RUNNER@EXAMPLE.COM', db)).toHaveLength(2);
    expect(findOrdersByEmail('nobody@example.com', db)).toHaveLength(0);
  });
});

describe('fitness history', () => {
  it('starts from the race result the plan was bought with', () => {
    const { order } = createOrder(orderInput(), db);
    expect(currentFitness(order.id, db)).toBeNull();
    const fitness = purchaseFitness(order);
    expect(fitness.source).toBe('race');
    expect(fitness.vdot).toBeGreaterThan(45);
    expect(fitness.vdot).toBeLessThan(58);
  });

  it('keeps the whole history in order, not just the latest', () => {
    const { order } = createOrder(orderInput(), db);
    recordFitness(
      order.id,
      { vdot: 50, fiveKSeconds: 1200, source: 'checkin', setAtWeek: 3 },
      db,
    );
    recordFitness(
      order.id,
      { vdot: 52, fiveKSeconds: 1160, source: 'race', setAtWeek: 8 },
      db,
    );
    const history = getFitnessHistory(order.id, db);
    expect(history.map((h) => h.vdot)).toEqual([50, 52]);
    expect(currentFitness(order.id, db)?.vdot).toBe(52);
    // The week an estimate took effect from is what lets past weeks keep the
    // paces they were actually run at.
    expect(history[1].setAtWeek).toBe(8);
  });
});

describe('token access signal', () => {
  it('counts a device once, however often it returns', () => {
    const { order } = createOrder(orderInput(), db);
    expect(noteTokenAccess(order.id, '1.2.3.4', 'Firefox', db)).toBe(1);
    expect(noteTokenAccess(order.id, '1.2.3.4', 'Firefox', db)).toBe(1);
    expect(noteTokenAccess(order.id, '1.2.3.4', 'Firefox', db)).toBe(1);
  });

  it('counts distinct devices', () => {
    const { order } = createOrder(orderInput(), db);
    noteTokenAccess(order.id, '1.2.3.4', 'Firefox', db);
    noteTokenAccess(order.id, '1.2.3.4', 'Safari on iPhone', db);
    noteTokenAccess(order.id, '5.6.7.8', 'Chrome at work', db);
    const count = noteTokenAccess(order.id, '9.9.9.9', 'Edge', db);
    expect(count).toBe(4);
  });

  it('leaves normal use well under the soft limit', () => {
    const { order } = createOrder(orderInput(), db);
    // Phone, home laptop, work machine: a real buyer.
    noteTokenAccess(order.id, '1.1.1.1', 'phone', db);
    noteTokenAccess(order.id, '2.2.2.2', 'laptop', db);
    const count = noteTokenAccess(order.id, '3.3.3.3', 'work', db);
    expect(count).toBeLessThan(DEVICE_SOFT_LIMIT);
  });

  it('does not store the raw address or user agent', () => {
    const { order } = createOrder(orderInput(), db);
    noteTokenAccess(order.id, '203.0.113.42', 'Mozilla/5.0 secret', db);
    const rows = db.prepare('SELECT * FROM token_access').all() as {
      ip_hash: string;
      ua_hash: string;
    }[];
    expect(rows[0].ip_hash).not.toContain('203.0.113');
    expect(rows[0].ua_hash).not.toContain('secret');
  });
});

describe('planForOrder', () => {
  it('regenerates the plan from the stored inputs', () => {
    const { order } = createOrder(orderInput(), db);
    const { plan } = planForOrder(order, db);
    expect(plan.weeks).toHaveLength(18);
    expect(plan.input.tier).toBe('singles95');
    expect(plan.weeks.at(-1)?.days.at(-1)?.date).toBe('2027-04-18');
  });

  it('re-prices future weeks after a check-in but keeps the structure', () => {
    const { order } = createOrder(orderInput(), db);
    const before = planForOrder(order, db);

    recordFitness(
      order.id,
      { vdot: 56, fiveKSeconds: 1080, source: 'race', setAtWeek: 1 },
      db,
    );
    const after = planForOrder(order, db);

    // This is the claim the product is sold on, so it is asserted directly.
    expect(after.fitness.vdot).toBe(56);
    expect(after.plan.mp.midSecPerKm).toBeLessThan(before.plan.mp.midSecPerKm);

    const shape = (p: typeof before.plan) =>
      p.weeks.flatMap((w) => w.days.map((d) => d.sessionId ?? d.kind));
    expect(shape(after.plan)).toEqual(shape(before.plan));
  });

  it('never stores a pace on a plan, only an anchor', () => {
    const { order } = createOrder(orderInput(), db);
    const { plan } = planForOrder(order, db);
    const allowed = new Set(['kind', 'column', 'distance', 'pct', 'label']);
    for (const week of plan.weeks) {
      for (const day of week.days) {
        for (const segment of day.segments ?? []) {
          const anchors =
            segment.kind === 'steady'
              ? [segment.anchor]
              : segment.kind === 'interval'
                ? [segment.work.anchor]
                : segment.blocks.map((b) => b.anchor);
          for (const anchor of anchors) {
            for (const key of Object.keys(anchor)) {
              expect(allowed.has(key)).toBe(true);
            }
          }
        }
      }
    }
  });
});
