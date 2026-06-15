import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createPlan } from '../../lib/plan-generator';
import {
  saveCheckoutOrder,
  type ProductId,
} from '../../lib/server/order-store';
import type { UserInput } from '../../types';

export const prerender = false;

type Locale = 'es' | 'en';
interface CheckoutRequest {
  order?: {
    id?: unknown;
    email?: unknown;
    locale?: unknown;
    productId?: unknown;
    pageUrl?: unknown;
  };
  plan?: {
    input?: {
      weeklyHours?: unknown;
      unit?: unknown;
      marathonDate?: unknown;
      time5K?: unknown;
      time10K?: unknown;
    };
    paces?: {
      fiveKSeconds?: unknown;
    };
  };
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const PRODUCT_PRICE_ENV: Record<ProductId, string> = {
  export: 'STRIPE_EXPORT_PRICE_ID',
  bundle: 'STRIPE_BUNDLE_PRICE_ID',
};

const PRODUCT_NAMES: Record<ProductId, string> = {
  export: 'Norwegian Singles Basic Export',
  bundle: 'Norwegian Singles Marathon + Reminders Bundle',
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!isAllowedOrigin(request)) {
    return json({ error: 'Forbidden' }, 403);
  }

  const rateKey = clientAddress || request.headers.get('x-forwarded-for') || '';
  if (!consumeRateLimit(rateKey)) {
    return json({ error: 'Too many requests' }, 429);
  }

  const stripe = stripeClient();
  if (!stripe) {
    return json({ error: 'Checkout is not configured' }, 503);
  }

  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const parsed = parseCheckoutRequest(body);
  if (!parsed.ok) {
    return json({ error: parsed.error }, 400);
  }

  const { orderId, email, locale, productId, input, pageUrl } = parsed.value;
  const priceId = process.env[PRODUCT_PRICE_ENV[productId]];

  if (!priceId) {
    return json({ error: 'Product is not configured' }, 503);
  }

  const siteUrl = getSiteUrl(request);
  const successUrl = new URL(`/${locale}/checkout/success`, siteUrl);
  successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}');
  const cancelUrl = new URL(`/${locale}/checkout/cancel`, siteUrl);
  const plan = createPlan(input);
  const price = productId === 'bundle' ? 19 : 9;

  await saveCheckoutOrder({
    id: orderId,
    email,
    locale,
    productId,
    price,
    currency: 'EUR',
    plan,
    pageUrl,
  });

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        client_reference_id: orderId,
        success_url: successUrl.toString(),
        cancel_url: cancelUrl.toString(),
        allow_promotion_codes: true,
        metadata: safeMetadata({
          order_id: orderId,
          product_id: productId,
          product_name: PRODUCT_NAMES[productId],
          locale,
          weekly_hours: plan.input.weeklyHours,
          unit: plan.input.unit,
          marathon_date: plan.input.marathonDate,
          time_5k: plan.input.time5K,
          time_10k: plan.input.time10K,
          five_k_seconds: plan.paces.fiveKSeconds,
        }),
      },
      {
        idempotencyKey: orderId,
      },
    );
  } catch (error) {
    console.error('Stripe checkout session creation failed', error);
    return json({ error: 'Could not create checkout session' }, 502);
  }

  if (!session.url) {
    return json({ error: 'Checkout URL missing' }, 502);
  }

  return json({ url: session.url });
};

function parseCheckoutRequest(body: CheckoutRequest):
  | {
      ok: true;
      value: {
        orderId: string;
        email: string;
        locale: Locale;
        productId: ProductId;
        input: UserInput;
        pageUrl: string;
      };
    }
  | { ok: false; error: string } {
  const orderId = asShortString(body.order?.id, 80);
  const email = asShortString(body.order?.email, 254);
  const locale = body.order?.locale;
  const productId = body.order?.productId;
  const input = parsePlanInput(body.plan?.input);
  const pageUrl = asShortString(body.order?.pageUrl, 2048) ?? '';

  if (!orderId) return { ok: false, error: 'Order ID is required' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Valid email is required' };
  }
  if (locale !== 'es' && locale !== 'en') {
    return { ok: false, error: 'Invalid locale' };
  }
  if (productId !== 'export' && productId !== 'bundle') {
    return { ok: false, error: 'Invalid product' };
  }
  if (!input) return { ok: false, error: 'Invalid plan input' };

  return {
    ok: true,
    value: { orderId, email, locale, productId, input, pageUrl },
  };
}

function parsePlanInput(
  input: NonNullable<CheckoutRequest['plan']>['input'],
): UserInput | null {
  if (!input) return null;
  const weeklyHours =
    typeof input.weeklyHours === 'number' ? input.weeklyHours : NaN;
  const unit =
    input.unit === 'mile' ? 'mile' : input.unit === 'km' ? 'km' : null;
  const time5K = asOptionalString(input.time5K, 20);
  const time10K = asOptionalString(input.time10K, 20);
  const marathonDate = asOptionalString(input.marathonDate, 10);

  if (!Number.isFinite(weeklyHours) || weeklyHours < 4 || weeklyHours > 12) {
    return null;
  }
  if (!unit || (!time5K && !time10K)) return null;

  return {
    weeklyHours,
    unit,
    time5K: time5K ?? undefined,
    time10K: time10K ?? undefined,
    marathonDate: marathonDate ?? undefined,
  };
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';

  const configuredOrigins = [
    normalizedOrigin(process.env.SITE_URL),
    normalizedOrigin(process.env.PUBLIC_SITE_URL),
  ].filter(Boolean);
  const allowed = new Set(
    configuredOrigins.length > 0
      ? configuredOrigins
      : [new URL(request.url).origin],
  );

  return allowed.has(normalizedOrigin(origin));
}

function getSiteUrl(request: Request): string {
  const configured = process.env.SITE_URL || process.env.PUBLIC_SITE_URL;
  if (configured) return configured;

  const origin = request.headers.get('origin');
  if (origin) return origin;
  return new URL(request.url).origin;
}

function stripeClient(): Stripe | null {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  return stripeSecretKey
    ? new Stripe(stripeSecretKey, { apiVersion: '2026-05-27.dahlia' })
    : null;
}

function normalizedOrigin(value: string | undefined): string {
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

function consumeRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

function asShortString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function asOptionalString(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  return asShortString(value, maxLength);
}

function safeMetadata(
  metadata: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(metadata).flatMap(([key, value]) => {
      if (value === undefined || value === null || value === '') return [];
      return [[key, String(value).slice(0, 500)]];
    }),
  );
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
