import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { APIContext } from 'astro';
import * as database from '../db';
import { createOrder, getFitnessHistory, type Order } from '../entitlements';
import { ENGINE_VERSION } from '../../marathon/constants';
import { GET as exportPlan } from '../../../pages/api/plan-export';
import { POST as updateFitness } from '../../../pages/api/fitness';
import { POST as checkout } from '../../../pages/api/checkout';

let db: database.Db;
let order: Order;

beforeEach(() => {
  db = database.createTestDb();
  vi.spyOn(database, 'getDb').mockReturnValue(db);
  ({ order } = createOrder(
    {
      stripeSessionId: 'cs_test_french',
      email: 'runner@example.com',
      sku: 'singles95',
      planInputs: {
        tier: 'singles95',
        lengthWeeks: 12,
        marathonDate: '2027-04-18',
        unit: 'km',
        raceDistanceM: 10_000,
        raceTimeSec: 2400,
      },
      engineVersion: ENGINE_VERSION,
    },
    db,
  ));
});

afterEach(() => {
  vi.restoreAllMocks();
  db.close();
});

describe('French marathon flows without a Referer header', () => {
  it('exports a French CSV even when the client sends no referring page', async () => {
    const url = new URL('https://example.com/api/plan-export');
    url.search = new URLSearchParams({
      token: order.accessToken,
      locale: 'fr',
      format: 'csv',
      unit: 'mile',
    }).toString();
    const response = await exportPlan({
      url,
      request: new Request(url),
    } as APIContext);
    const csv = await response.text();

    expect(response.status).toBe(200);
    expect(csv).toMatch(/^semaine,phase,date,jour,type,séance,notes/);
    expect(csv).toContain(' mi');
    expect(csv).toContain('répétitions');
    expect(csv).not.toContain('Easy run');
  });

  it('keeps a subscribed French calendar localized and folds UTF-8 safely', async () => {
    const url = new URL('https://example.com/api/plan-export');
    url.search = new URLSearchParams({
      token: order.accessToken,
      locale: 'fr',
      format: 'ics',
    }).toString();
    const response = await exportPlan({
      url,
      request: new Request(url),
    } as APIContext);
    const calendar = await response.text();
    const unfolded = calendar.replace(/\r\n /g, '');

    expect(response.status).toBe(200);
    expect(unfolded).toContain('X-WR-CALNAME:Plan marathon');
    expect(unfolded).toContain('répétitions');
    expect(unfolded).not.toContain('\uFFFD');
    for (const line of calendar.split('\r\n')) {
      expect(Buffer.byteLength(line, 'utf8')).toBeLessThanOrEqual(75);
    }
  });

  it('returns to the French plan after a form check-in with no Referer', async () => {
    const body = new URLSearchParams({
      token: order.accessToken,
      locale: 'fr',
      mode: 'checkin',
      reserve: 'one_or_two_more',
      lastRep: 'held',
      effort: 'on_target',
    });
    const response = await updateFitness({
      request: new Request('https://example.com/api/fitness', {
        method: 'POST',
        body,
      }),
    } as APIContext);

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe(
      `https://example.com/fr/marathon/p/${order.accessToken}#fitness`,
    );
    expect(getFitnessHistory(order.id, db)).toHaveLength(1);
  });

  it('explains invalid checkout inputs in French before contacting Stripe', async () => {
    const response = await checkout({
      request: new Request('https://example.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku: 'singles95',
          tier: 'singles95',
          lengthWeeks: 12,
          locale: 'fr',
          raceDistanceM: 10_000,
          raceTimeSec: 0,
        }),
      }),
    } as APIContext);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Saisis un temps de course.',
    });
  });

  it('falls back safely when an export requests an unsupported language', async () => {
    const url = new URL('https://example.com/api/plan-export');
    url.search = new URLSearchParams({
      token: order.accessToken,
      locale: 'xx',
    }).toString();
    const response = await exportPlan({
      url,
      request: new Request(url),
    } as APIContext);

    expect(response.status).toBe(200);
    expect(await response.text()).toMatch(
      /^week,phase,date,day,kind,session,notes/,
    );
  });
});
