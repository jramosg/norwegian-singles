import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createPlan } from '../../../lib/plan-generator';
import {
  markOrderFulfilled,
  readCheckoutOrder,
  saveCheckoutOrder,
} from '../../../lib/server/order-store';
import { POST } from '../reminders/send';

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

describe('reminder sender API', () => {
  it('requires the cron bearer secret', async () => {
    delete process.env.REMINDER_CRON_SECRET;

    const response = await POST({
      request: new Request('https://norwegian-singles.app/api/reminders/send', {
        method: 'POST',
      }),
    } as never);

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  it('sends due weekly reminders and advances the schedule', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'ns-reminders-'));
    process.env.ORDER_STORE_DIR = tmpDir;
    process.env.REMINDER_CRON_SECRET = 'secret';
    process.env.RESEND_API_KEY = 're_test';
    process.env.FULFILLMENT_FROM_EMAIL =
      'Norwegian Singles <orders@example.com>';

    const fetchMock = vi.fn(async () => Response.json({ id: 'email_123' }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const order = await saveCheckoutOrder({
      id: 'order_123456',
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
      pageUrl: 'https://norwegian-singles.app/en/plan',
    });
    await markOrderFulfilled(order);

    const response = await POST({
      request: new Request('https://norwegian-singles.app/api/reminders/send', {
        method: 'POST',
        headers: { Authorization: 'Bearer secret' },
      }),
    } as never);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      sent: 1,
      failed: 0,
      failures: [],
    });
    expect(fetchMock).toHaveBeenCalledOnce();

    const updated = await readCheckoutOrder('order_123456');
    expect(updated?.reminderWeek).toBe(2);
    expect(updated?.nextReminderAt).toBeDefined();
  });
});
