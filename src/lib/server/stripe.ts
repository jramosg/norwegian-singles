/**
 * Stripe client and Checkout helpers.
 *
 * Keys are read lazily so that importing this module during a static build
 * (or in a test) does not require the environment to be configured.
 */

import Stripe from 'stripe';
import { CURRENCY, stripePriceId, type Sku } from '../marathon/pricing';
import { env, requireEnv } from './env';
import type { StoredPlanInputs } from './entitlements';

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (client) return client;
  client = new Stripe(requireEnv('STRIPE_SECRET_KEY'));
  return client;
}

export function siteUrl(): string {
  return (env('SITE_URL') || 'https://norwegian-singles.app').replace(
    /\/$/,
    '',
  );
}

export interface CheckoutRequest {
  sku: Sku;
  locale: string;
  planInputs: StoredPlanInputs;
  successPath: string;
  cancelPath: string;
}

/**
 * Metadata has a 500 character limit per value, so the plan inputs go in as
 * one compact JSON blob rather than a field each. They are the only thing
 * needed to regenerate the plan, so they must survive the round trip.
 */
export async function createCheckoutSession(
  request: CheckoutRequest,
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  const base = siteUrl();

  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: stripePriceId(request.sku), quantity: 1 }],
    currency: CURRENCY.toLowerCase(),
    // Stripe collects the email and sends its own receipt, so no sending
    // domain is needed for the purchase itself to be confirmed.
    customer_creation: 'always',
    // Digital goods sold into the EU: let Stripe work out the VAT.
    automatic_tax: { enabled: true },
    success_url: `${base}${request.successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}${request.cancelPath}`,
    metadata: {
      sku: request.sku,
      locale: request.locale,
      plan_inputs: JSON.stringify(request.planInputs),
    },
  });
}

export function verifyWebhook(
  rawBody: string,
  signature: string | null,
): Stripe.Event {
  const secret = env('STRIPE_WEBHOOK_SECRET');
  if (!secret) throw new Error('Missing STRIPE_WEBHOOK_SECRET.');
  if (!signature) throw new Error('Missing stripe-signature header.');
  return getStripe().webhooks.constructEvent(rawBody, signature, secret);
}
