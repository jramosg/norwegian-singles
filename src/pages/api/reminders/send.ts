import type { APIRoute } from 'astro';
import { sendWeeklyReminder } from '../../../lib/server/fulfillment';
import {
  markOrderReminderSent,
  readCheckoutOrders,
  type CheckoutOrder,
} from '../../../lib/server/order-store';

export const prerender = false;

const MAX_REMINDER_WEEKS = 15;

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const dueOrders = (await readCheckoutOrders()).filter(isDueReminder);
  const failures: Array<{ orderId: string; error: string }> = [];
  let sent = 0;

  for (const order of dueOrders) {
    try {
      await sendWeeklyReminder(order);
      await markOrderReminderSent(order, nextReminderAt(order));
      sent += 1;
    } catch (error) {
      failures.push({
        orderId: order.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return json(
    {
      sent,
      failed: failures.length,
      failures,
    },
    failures.length > 0 ? 500 : 200,
  );
};

function isAuthorized(request: Request): boolean {
  const secret = process.env.REMINDER_CRON_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

function isDueReminder(order: CheckoutOrder): boolean {
  if (order.status !== 'fulfilled') return false;
  if (order.productId !== 'bundle') return false;
  if (order.remindersCompletedAt) return false;
  if ((order.reminderWeek ?? 1) > MAX_REMINDER_WEEKS) return false;
  if (!order.nextReminderAt) return false;
  return Date.parse(order.nextReminderAt) <= Date.now();
}

function nextReminderAt(order: CheckoutOrder): string | null {
  if ((order.reminderWeek ?? 1) >= MAX_REMINDER_WEEKS) return null;
  const next = new Date();
  next.setDate(next.getDate() + 7);
  return next.toISOString();
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
