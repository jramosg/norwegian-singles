import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { SavedPlan, Locale } from '../../types';

export type ProductId = 'export' | 'bundle';

export type OrderStatus =
  | 'checkout_started'
  | 'paid'
  | 'fulfilled'
  | 'fulfillment_failed';

export interface CheckoutOrder {
  id: string;
  email: string;
  locale: Locale;
  productId: ProductId;
  price: number;
  currency: 'EUR';
  plan: SavedPlan;
  pageUrl: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  stripeSessionId?: string;
  paymentStatus?: string | null;
  fulfilledAt?: string;
  fulfillmentAttempts: number;
  lastFulfillmentError?: string;
  reminderWeek?: number;
  nextReminderAt?: string;
  remindersCompletedAt?: string;
}

export async function saveCheckoutOrder(
  order: Omit<
    CheckoutOrder,
    'status' | 'createdAt' | 'updatedAt' | 'fulfillmentAttempts'
  >,
): Promise<CheckoutOrder> {
  const now = new Date().toISOString();
  const existing = await readCheckoutOrder(order.id);
  const record: CheckoutOrder = {
    ...existing,
    ...order,
    status: existing?.status ?? 'checkout_started',
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    fulfillmentAttempts: existing?.fulfillmentAttempts ?? 0,
  };
  await writeCheckoutOrder(record);
  return record;
}

export async function readCheckoutOrder(
  orderId: string,
): Promise<CheckoutOrder | null> {
  try {
    const raw = await readFile(orderPath(orderId), 'utf8');
    return JSON.parse(raw) as CheckoutOrder;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export async function readCheckoutOrders(): Promise<CheckoutOrder[]> {
  try {
    const entries = await readdir(orderStoreDir(), { withFileTypes: true });
    const orders = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
        .map((entry) => readCheckoutOrder(entry.name.slice(0, -5))),
    );
    return orders.filter((order): order is CheckoutOrder => Boolean(order));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
}

export async function markOrderPaid(
  orderId: string,
  data: {
    stripeSessionId: string;
    paymentStatus: string | null;
  },
): Promise<CheckoutOrder> {
  const order = await requireOrder(orderId);
  const updated: CheckoutOrder = {
    ...order,
    status: order.status === 'fulfilled' ? 'fulfilled' : 'paid',
    stripeSessionId: data.stripeSessionId,
    paymentStatus: data.paymentStatus,
    updatedAt: new Date().toISOString(),
  };
  await writeCheckoutOrder(updated);
  return updated;
}

export async function markOrderFulfilled(
  order: CheckoutOrder,
): Promise<CheckoutOrder> {
  const now = new Date().toISOString();
  const updated: CheckoutOrder = {
    ...order,
    status: 'fulfilled',
    fulfilledAt: now,
    updatedAt: now,
    lastFulfillmentError: undefined,
    ...(order.productId === 'bundle'
      ? {
          reminderWeek: order.reminderWeek ?? 1,
          nextReminderAt: order.nextReminderAt ?? now,
        }
      : {}),
  };
  await writeCheckoutOrder(updated);
  return updated;
}

export async function markOrderReminderSent(
  order: CheckoutOrder,
  nextReminderAt: string | null,
): Promise<CheckoutOrder> {
  const updated: CheckoutOrder = {
    ...order,
    reminderWeek: (order.reminderWeek ?? 1) + 1,
    nextReminderAt: nextReminderAt ?? undefined,
    remindersCompletedAt: nextReminderAt ? undefined : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await writeCheckoutOrder(updated);
  return updated;
}

export async function markOrderFulfillmentFailed(
  order: CheckoutOrder,
  error: unknown,
): Promise<CheckoutOrder> {
  const updated: CheckoutOrder = {
    ...order,
    status: 'fulfillment_failed',
    fulfillmentAttempts: order.fulfillmentAttempts + 1,
    lastFulfillmentError:
      error instanceof Error ? error.message : 'Unknown fulfillment error',
    updatedAt: new Date().toISOString(),
  };
  await writeCheckoutOrder(updated);
  return updated;
}

async function requireOrder(orderId: string): Promise<CheckoutOrder> {
  const order = await readCheckoutOrder(orderId);
  if (!order) throw new Error(`Order not found: ${orderId}`);
  return order;
}

async function writeCheckoutOrder(order: CheckoutOrder): Promise<void> {
  const target = orderPath(order.id);
  await mkdir(dirname(target), { recursive: true });
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmp, JSON.stringify(order, null, 2), {
    encoding: 'utf8',
    mode: 0o600,
  });
  await rename(tmp, target);
}

function orderPath(orderId: string): string {
  if (!/^[a-zA-Z0-9_-]{8,120}$/.test(orderId)) {
    throw new Error('Invalid order id');
  }
  return join(orderStoreDir(), `${orderId}.json`);
}

function orderStoreDir(): string {
  return process.env.ORDER_STORE_DIR || join(process.cwd(), 'data', 'orders');
}
