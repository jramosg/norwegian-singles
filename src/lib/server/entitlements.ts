/**
 * Orders, access tokens and entitlements.
 *
 * There are no accounts. A purchase mints a long random token, the token is
 * the credential, and the plan is regenerated from the stored inputs on every
 * view. Nothing about a plan is stored as rows, so a fix to the engine
 * reaches plans that have already been sold.
 */

import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { getDb, type Db } from './db';
import { TIER_IDS } from '../marathon/tiers';
import type { Sku } from '../marathon/pricing';
import type { FitnessSource, TierId } from '../marathon/types';

export interface StoredPlanInputs {
  tier: TierId;
  lengthWeeks: number;
  marathonDate?: string;
  unit: 'km' | 'mile';
  goalFinishSec?: number;
  /** The race result the plan was bought with. */
  raceDistanceM: number;
  raceTimeSec: number;
}

export interface Order {
  id: number;
  stripeSessionId: string;
  email: string;
  buyerName: string | null;
  sku: Sku;
  tiers: TierId[];
  planInputs: StoredPlanInputs;
  accessToken: string;
  engineVersion: string;
  createdAt: string;
}

interface OrderRow {
  id: number;
  stripe_session_id: string;
  email: string;
  buyer_name: string | null;
  sku: string;
  tiers: string;
  plan_inputs: string;
  access_token: string;
  engine_version: string;
  created_at: string;
}

function toOrder(row: OrderRow): Order {
  return {
    id: row.id,
    stripeSessionId: row.stripe_session_id,
    email: row.email,
    buyerName: row.buyer_name,
    sku: row.sku as Sku,
    tiers: JSON.parse(row.tiers) as TierId[],
    planInputs: JSON.parse(row.plan_inputs) as StoredPlanInputs,
    accessToken: row.access_token,
    engineVersion: row.engine_version,
    createdAt: row.created_at,
  };
}

/** Which tiers a SKU grants. A single tier grants all three of its lengths. */
export function tiersForSku(sku: Sku): TierId[] {
  return sku === 'bundle' ? [...TIER_IDS] : [sku];
}

/**
 * 32 random bytes, url-safe. This is a bearer credential, so it has to be
 * long enough that guessing is hopeless and it must never be derived from
 * anything guessable like the email or the session id.
 */
export function mintAccessToken(): string {
  return randomBytes(32).toString('base64url');
}

export interface CreateOrderInput {
  stripeSessionId: string;
  stripePaymentIntent?: string | null;
  email: string;
  buyerName?: string | null;
  sku: Sku;
  planInputs: StoredPlanInputs;
  engineVersion: string;
  amountTotal?: number | null;
  currency?: string | null;
}

/**
 * Insert an order, or return the existing one for this Checkout Session.
 * Webhooks are delivered at least once, so this has to be safe to repeat.
 */
export function createOrder(
  input: CreateOrderInput,
  db: Db = getDb(),
): { order: Order; created: boolean } {
  const existing = findOrderBySessionId(input.stripeSessionId, db);
  if (existing) return { order: existing, created: false };

  const token = mintAccessToken();
  db.prepare(
    `INSERT INTO orders (
       stripe_session_id, stripe_payment_intent, email, buyer_name, sku,
       tiers, plan_inputs, access_token, engine_version, amount_total, currency
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    input.stripeSessionId,
    input.stripePaymentIntent ?? null,
    input.email,
    input.buyerName ?? null,
    input.sku,
    JSON.stringify(tiersForSku(input.sku)),
    JSON.stringify(input.planInputs),
    token,
    input.engineVersion,
    input.amountTotal ?? null,
    input.currency ?? null,
  );

  const order = findOrderByToken(token, db);
  if (!order) throw new Error('Order insert did not round-trip.');
  return { order, created: true };
}

export function findOrderBySessionId(
  sessionId: string,
  db: Db = getDb(),
): Order | null {
  const row = db
    .prepare('SELECT * FROM orders WHERE stripe_session_id = ?')
    .get(sessionId) as OrderRow | undefined;
  return row ? toOrder(row) : null;
}

/**
 * Look up an order by its access token.
 *
 * The comparison is done in constant time on a hash of the token so that
 * response timing cannot be used to narrow a guess. SQLite's index lookup is
 * not constant time, so the row is fetched by token and then re-verified.
 */
export function findOrderByToken(
  token: string,
  db: Db = getDb(),
): Order | null {
  if (!token || token.length < 20 || token.length > 200) return null;
  const row = db
    .prepare('SELECT * FROM orders WHERE access_token = ?')
    .get(token) as OrderRow | undefined;
  if (!row) return null;

  const a = createHash('sha256').update(row.access_token).digest();
  const b = createHash('sha256').update(token).digest();
  if (!timingSafeEqual(a, b)) return null;
  return toOrder(row);
}

export function findOrdersByEmail(email: string, db: Db = getDb()): Order[] {
  const rows = db
    .prepare('SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC')
    .all(email.trim().toLowerCase()) as OrderRow[];
  return rows.map(toOrder);
}

/** True when this order may open that tier's plan. */
export function orderGrantsTier(order: Order, tier: TierId): boolean {
  return order.tiers.includes(tier);
}

// ---------------------------------------------------------------------------
// Fitness history
// ---------------------------------------------------------------------------

export interface FitnessRecord {
  vdot: number;
  fiveKSeconds: number;
  source: FitnessSource;
  setAtWeek: number;
  createdAt: string;
}

/**
 * Fitness lives on the order, not in the browser. A runner who updates their
 * estimate on a phone has to see it on a laptop, and localStorage cannot do
 * that.
 */
export function recordFitness(
  orderId: number,
  record: Omit<FitnessRecord, 'createdAt'>,
  db: Db = getDb(),
): void {
  db.prepare(
    `INSERT INTO fitness_history (order_id, vdot, five_k_seconds, source, set_at_week)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(
    orderId,
    record.vdot,
    record.fiveKSeconds,
    record.source,
    record.setAtWeek,
  );
}

export function getFitnessHistory(
  orderId: number,
  db: Db = getDb(),
): FitnessRecord[] {
  const rows = db
    .prepare(
      `SELECT vdot, five_k_seconds, source, set_at_week, created_at
       FROM fitness_history WHERE order_id = ? ORDER BY created_at ASC`,
    )
    .all(orderId) as {
    vdot: number;
    five_k_seconds: number;
    source: string;
    set_at_week: number;
    created_at: string;
  }[];
  return rows.map((r) => ({
    vdot: r.vdot,
    fiveKSeconds: r.five_k_seconds,
    source: r.source as FitnessSource,
    setAtWeek: r.set_at_week,
    createdAt: r.created_at,
  }));
}

/** The estimate in force now, or null when only the purchase result exists. */
export function currentFitness(
  orderId: number,
  db: Db = getDb(),
): FitnessRecord | null {
  const history = getFitnessHistory(orderId, db);
  return history.length > 0 ? history[history.length - 1] : null;
}

// ---------------------------------------------------------------------------
// Token sharing signal
// ---------------------------------------------------------------------------

function hash(value: string): string {
  return createHash('sha256')
    .update(`${process.env.PLAN_TOKEN_SECRET ?? ''}:${value}`)
    .digest('hex')
    .slice(0, 32);
}

/**
 * Record a distinct device seeing this token and return how many have.
 *
 * A real buyer uses a phone, a laptop, maybe a work machine. A token being
 * passed around a running club looks very different. The threshold is
 * deliberately generous and the response is to ask for an email code, never
 * to lock someone out of something they paid for.
 */
export function noteTokenAccess(
  orderId: number,
  ip: string,
  userAgent: string,
  db: Db = getDb(),
): number {
  db.prepare(
    `INSERT OR IGNORE INTO token_access (order_id, ip_hash, ua_hash)
     VALUES (?, ?, ?)`,
  ).run(orderId, hash(ip), hash(userAgent));
  const row = db
    .prepare('SELECT COUNT(*) AS n FROM token_access WHERE order_id = ?')
    .get(orderId) as { n: number };
  return row.n;
}

export const DEVICE_SOFT_LIMIT = 12;
