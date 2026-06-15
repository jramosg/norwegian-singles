/**
 * Shareable plan URLs — encode/decode UserInput to and from query params.
 * Lets a generated plan be bookmarked, shared, and reopened on any device.
 */

import type { UserInput, Unit } from '../types';

/** Build a query string (without leading "?") from the user's plan input. */
export function encodePlanInput(input: UserInput): string {
  const params = new URLSearchParams();
  if (input.time5K) params.set('t5', input.time5K);
  if (input.time10K) params.set('t10', input.time10K);
  params.set('h', String(input.weeklyHours));
  params.set('u', input.unit);
  if (input.marathonDate) params.set('m', input.marathonDate);
  return params.toString();
}

/**
 * Parse a UserInput from query params. Returns null when neither a 5K nor a
 * 10K time is present (the minimum needed to compute a plan).
 */
export function decodePlanInput(params: URLSearchParams): UserInput | null {
  const time5K = params.get('t5') ?? undefined;
  const time10K = params.get('t10') ?? undefined;
  if (!time5K && !time10K) return null;

  const hours = parseFloat(params.get('h') ?? '');
  const unit: Unit = params.get('u') === 'mile' ? 'mile' : 'km';
  const marathonDate = params.get('m') ?? undefined;

  return {
    time5K,
    time10K,
    weeklyHours: Number.isFinite(hours) && hours > 0 ? hours : 6,
    unit,
    marathonDate,
  };
}
