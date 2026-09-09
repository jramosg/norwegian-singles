/**
 * Prices for the marathon plans.
 *
 * NOTE: these amounts are placeholders pending a decision, they are
 * deliberately in one place so changing them is a one-line edit, and the
 * Stripe Price IDs are read from the environment rather than hardcoded so
 * test and live mode can differ.
 */

import type { TierId } from './types';

export const CURRENCY = 'EUR';
export const CURRENCY_SYMBOL = '€';

/** A single tier, granting all three lengths of it. */
export const SINGLE_TIER_PRICE = 29;
/** All four tiers, all three lengths. */
export const BUNDLE_PRICE = 49;

export type Sku = TierId | 'bundle';

export function priceFor(sku: Sku): number {
  return sku === 'bundle' ? BUNDLE_PRICE : SINGLE_TIER_PRICE;
}

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount}`;
}

/**
 * Stripe Price ID for a SKU, from the environment. Missing IDs are a
 * configuration error rather than a silent fallback: a checkout that quietly
 * charges the wrong amount is far worse than one that fails loudly.
 */
export function stripePriceId(sku: Sku): string {
  const key = `STRIPE_PRICE_${sku.toUpperCase()}`;
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key} in the environment.`);
  return value;
}
