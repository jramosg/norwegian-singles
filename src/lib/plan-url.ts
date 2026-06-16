/**
 * Shareable plan URLs — encode/decode UserInput to and from query params.
 * Lets a generated plan be bookmarked, shared, and reopened on any device.
 */

import { DISTANCE_METERS, type UserInput, type Unit } from '../types';

const raceDistances = new Set([...Object.keys(DISTANCE_METERS), 'custom']);

/** Build a query string (without leading "?") from the user's plan input. */
export function encodePlanInput(input: UserInput): string {
  const params = new URLSearchParams();
  if (input.raceDistance) params.set('d', input.raceDistance);
  if (input.raceTime) params.set('rt', input.raceTime);
  if (input.customDistance) {
    params.set('cd', String(input.customDistance));
    params.set('cu', input.customDistanceUnit === 'mile' ? 'mile' : 'km');
  } else if (input.customDistanceKm) {
    params.set('cd', String(input.customDistanceKm));
  }
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
  const rawRaceDistance = params.get('d');
  const raceDistance = raceDistances.has(rawRaceDistance || '')
    ? (rawRaceDistance as UserInput['raceDistance'])
    : undefined;
  const raceTime = params.get('rt') ?? undefined;
  const customDistanceKm = parseFloat(params.get('cd') ?? '');
  const customDistanceUnit: Unit = params.get('cu') === 'mile' ? 'mile' : 'km';
  const customDistance = Number.isFinite(customDistanceKm)
    ? customDistanceKm
    : undefined;
  if (!raceTime && !time5K && !time10K) return null;

  const hours = parseFloat(params.get('h') ?? '');
  const unit: Unit = params.get('u') === 'mile' ? 'mile' : 'km';
  const marathonDate = params.get('m') ?? undefined;

  return {
    time5K,
    time10K,
    raceDistance,
    raceTime,
    customDistance,
    customDistanceUnit: customDistance ? customDistanceUnit : undefined,
    customDistanceKm:
      customDistance && !params.has('cu') ? customDistance : undefined,
    weeklyHours: Number.isFinite(hours) && hours > 0 ? hours : 6,
    unit,
    marathonDate,
  };
}
