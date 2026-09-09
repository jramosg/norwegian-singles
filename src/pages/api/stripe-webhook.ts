import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { verifyWebhook, siteUrl } from '../../lib/server/stripe';
import { getDb } from '../../lib/server/db';
import {
  createOrder,
  type StoredPlanInputs,
} from '../../lib/server/entitlements';
import { sendPlanLink } from '../../lib/server/email';
import { ENGINE_VERSION } from '../../lib/marathon/constants';
import { TIERS } from '../../lib/marathon/tiers';
import type { Sku } from '../../lib/marathon/pricing';

export const prerender = false;

/**
 * Stripe webhook.
 *
 * Two rules drive everything here. The signature is verified against the raw
 * body, byte for byte, before anything is trusted. And delivery is
 * at-least-once, so the event id is an idempotency key: processing the same
 * event twice must not create two orders or send two emails.
 */
export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = verifyWebhook(raw, request.headers.get('stripe-signature'));
  } catch (error) {
    console.error('[webhook] signature rejected', error);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge anything else so Stripe stops retrying it.
    return new Response('Ignored', { status: 200 });
  }

  const db = getDb();
  const claimed = db
    .prepare('INSERT OR IGNORE INTO webhook_events (id, type) VALUES (?, ?)')
    .run(event.id, event.type);
  if (claimed.changes === 0) {
    console.log(`[webhook] ${event.id} already processed`);
    return new Response('Already processed', { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    const sku = session.metadata?.sku as Sku | undefined;
    const locale = session.metadata?.locale || 'en';
    const rawInputs = session.metadata?.plan_inputs;
    const email =
      session.customer_details?.email || session.customer_email || '';

    if (!sku || !rawInputs || !email) {
      // Nothing to recover from: without the inputs there is no plan to
      // build, and without an email there is nobody to send it to.
      console.error(
        `[webhook] ${event.id} is missing metadata or an email; ` +
          `sku=${sku} email=${Boolean(email)}`,
      );
      return new Response('Missing metadata', { status: 200 });
    }

    const planInputs = JSON.parse(rawInputs) as StoredPlanInputs;

    const { order, created } = createOrder(
      {
        stripeSessionId: session.id,
        stripePaymentIntent:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : null,
        email: email.trim().toLowerCase(),
        buyerName: session.customer_details?.name ?? null,
        sku,
        planInputs,
        engineVersion: ENGINE_VERSION,
        amountTotal: session.amount_total,
        currency: session.currency,
      },
      db,
    );

    if (created) {
      const planUrl = `${siteUrl()}/${locale}/marathon/p/${order.accessToken}`;
      await sendPlanLink({
        to: order.email,
        locale,
        planUrl,
        tierName:
          sku === 'bundle'
            ? 'Norwegian Singles'
            : TIERS[planInputs.tier].nominalKm
              ? `Singles ${TIERS[planInputs.tier].nominalKm}`
              : 'Norwegian Singles',
      });
      console.log(`[webhook] order ${order.id} created for ${order.email}`);
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    // The event row is already written, so a retry would be a no-op. Undo the
    // claim so Stripe's retry can have another go at a transient failure.
    db.prepare('DELETE FROM webhook_events WHERE id = ?').run(event.id);
    console.error(`[webhook] ${event.id} failed, released for retry`, error);
    return new Response('Processing failed', { status: 500 });
  }
};
