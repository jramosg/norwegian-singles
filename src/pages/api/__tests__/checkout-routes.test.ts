import { afterEach, describe, expect, it } from 'vitest';
import { POST as checkoutPost } from '../checkout';
import { POST as webhookPost } from '../stripe-webhook';

const checkoutBody = {
  order: {
    id: '8f564b66-3534-4767-b9a1-80445e8f34f2',
    email: 'runner@example.com',
    locale: 'en',
    productId: 'bundle',
  },
  plan: {
    input: {
      weeklyHours: 6,
      unit: 'km',
    },
    paces: {
      fiveKSeconds: 1200,
    },
  },
};

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('checkout API security', () => {
  it('rejects cross-origin checkout attempts in production', async () => {
    process.env.NODE_ENV = 'production';
    process.env.SITE_URL = 'https://norwegian-singles.app';
    delete process.env.STRIPE_SECRET_KEY;

    const response = await checkoutPost({
      request: jsonRequest('https://norwegian-singles.app/api/checkout', {
        body: checkoutBody,
        origin: 'https://evil.example',
      }),
      clientAddress: '203.0.113.10',
    } as never);

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'Forbidden' });
  });

  it('fails closed when checkout secrets are missing', async () => {
    process.env.NODE_ENV = 'production';
    process.env.SITE_URL = 'https://norwegian-singles.app';
    delete process.env.STRIPE_SECRET_KEY;

    const response = await checkoutPost({
      request: jsonRequest('https://norwegian-singles.app/api/checkout', {
        body: checkoutBody,
        origin: 'https://norwegian-singles.app',
      }),
      clientAddress: '203.0.113.11',
    } as never);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: 'Checkout is not configured',
    });
  });

  it('fails closed when webhook secrets are missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const response = await webhookPost({
      request: jsonRequest('https://norwegian-singles.app/api/stripe-webhook', {
        body: {},
      }),
    } as never);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: 'Webhook is not configured',
    });
  });
});

function jsonRequest(
  url: string,
  opts: {
    body: unknown;
    origin?: string;
  },
): Request {
  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.origin ? { Origin: opts.origin } : {}),
    },
    body: JSON.stringify(opts.body),
  });
}
