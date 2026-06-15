import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { fulfillPaidOrder } from '../../lib/server/fulfillment';
import {
  markOrderFulfilled,
  markOrderFulfillmentFailed,
  markOrderPaid,
  readCheckoutOrder,
} from '../../lib/server/order-store';

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
    try {
      await fulfillCheckoutSession(session);
    } catch (error) {
      console.error('Order fulfillment failed', error);
      return json({ error: 'Fulfillment failed' }, 500);
    }
  }

  return json({ received: true });
};

async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const orderId = session.client_reference_id || session.metadata?.order_id;
  if (!orderId) throw new Error('Checkout session is missing order id');

  const existing = await readCheckoutOrder(orderId);
  if (existing?.status === 'fulfilled') return;

  const order = await markOrderPaid(orderId, {
    stripeSessionId: session.id,
    paymentStatus: session.payment_status,
  });

  try {
    await fulfillPaidOrder(order);
    await markOrderFulfilled(order);
  } catch (error) {
    await markOrderFulfillmentFailed(order, error);
    throw error;
  }
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
