import { afterEach, describe, expect, it } from 'vitest';
import Stripe from 'stripe';
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
      time5K: '20:00',
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

  it('returns a retryable failure when a paid order cannot be fulfilled', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
    process.env.ORDER_STORE_DIR = '/tmp/norwegian-singles-test-missing-order';

    const payload = JSON.stringify({
      id: 'evt_test',
      object: 'event',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test',
          object: 'checkout.session',
          client_reference_id: 'missing_order',
          payment_status: 'paid',
          metadata: {
            order_id: 'missing_order',
          },
        },
      },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload,
      secret: 'whsec_test',
    });

    const response = await webhookPost({
      request: new Request('https://norwegian-singles.app/api/stripe-webhook', {
        method: 'POST',
        headers: {
          'stripe-signature': signature,
          'Content-Type': 'application/json',
        },
        body: payload,
      }),
    } as never);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: 'Fulfillment failed',
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
