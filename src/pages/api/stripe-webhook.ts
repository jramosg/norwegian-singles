import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripe = stripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return json({ error: 'Webhook is not configured' }, 503);
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return json({ error: 'Missing signature' }, 400);

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return json({ error: 'Invalid signature' }, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await forwardFulfillment(session);
  }

  return json({ received: true });
};

async function forwardFulfillment(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const fulfillmentWebhookUrl = process.env.FULFILLMENT_WEBHOOK_URL;
  if (!fulfillmentWebhookUrl) return;
  const fulfillmentWebhookSecret = process.env.FULFILLMENT_WEBHOOK_SECRET;

  await fetch(fulfillmentWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(fulfillmentWebhookSecret
        ? { Authorization: `Bearer ${fulfillmentWebhookSecret}` }
        : {}),
    },
    body: JSON.stringify({
      event: 'checkout.session.completed',
      sessionId: session.id,
      orderId: session.client_reference_id,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      metadata: session.metadata,
    }),
  });
}

function stripeClient(): Stripe | null {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  return stripeSecretKey
    ? new Stripe(stripeSecretKey, { apiVersion: '2026-05-27.dahlia' })
    : null;
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
