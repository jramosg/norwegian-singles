import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createPlan } from '../../plan-generator';
import { fulfillPaidOrder } from '../fulfillment';
import type { CheckoutOrder } from '../order-store';

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
let tmpDir: string | null = null;

afterEach(async () => {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
  if (tmpDir) await rm(tmpDir, { recursive: true, force: true });
  tmpDir = null;
  vi.restoreAllMocks();
});

describe('paid order fulfillment', () => {
  it('fails closed when email delivery is not configured', async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.FULFILLMENT_FROM_EMAIL;

    await expect(fulfillPaidOrder(orderFixture())).rejects.toThrow(
      'Email fulfillment is not configured',
    );
  });

  it('sends PDF, calendar, CSV, and ZIP attachments by email', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'ns-orders-'));
    process.env.ORDER_STORE_DIR = tmpDir;
    process.env.RESEND_API_KEY = 're_test';
    process.env.FULFILLMENT_FROM_EMAIL =
      'Norwegian Singles <orders@example.com>';
    process.env.SUPPORT_EMAIL = 'support@example.com';

    let sentBody = '';
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      sentBody = String(init?.body ?? '');
      return Response.json({ id: 'email_123' });
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await fulfillPaidOrder(orderFixture());

    expect(fetchMock).toHaveBeenCalledOnce();
    const body = JSON.parse(sentBody) as {
      attachments: Array<{ filename: string; content: string }>;
      to: string[];
    };

    expect(body.to).toEqual(['runner@example.com']);
    expect(body.attachments.map((a) => a.filename)).toEqual([
      'norwegian-singles-plan.pdf',
      'norwegian-singles-calendar.ics',
      'norwegian-singles-workouts.csv',
      'norwegian-singles-workouts.zip',
    ]);
    body.attachments.forEach((attachment) => {
      expect(attachment.content.length).toBeGreaterThan(100);
    });
  });
});

function orderFixture(): CheckoutOrder {
  return {
    id: 'order_123',
    email: 'runner@example.com',
    locale: 'en',
    productId: 'bundle',
    price: 19,
    currency: 'EUR',
    plan: createPlan({
      time5K: '20:00',
      weeklyHours: 6,
      unit: 'km',
      marathonDate: '2026-10-18',
    }),
    pageUrl: 'https://norwegian-singles.app/en/plan?t5=20:00&h=6&u=km',
    status: 'paid',
    createdAt: '2026-06-15T08:00:00.000Z',
    updatedAt: '2026-06-15T08:00:00.000Z',
    fulfillmentAttempts: 0,
  };
}
