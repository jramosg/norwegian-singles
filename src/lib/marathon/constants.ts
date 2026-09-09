/** Shared distance constants for the marathon engine. */

export const MARATHON_M = 42_195;
export const HALF_MARATHON_M = 21_097.5;

/** Single source of truth for mile conversion across the engine. */
export const METRES_PER_MILE = 1609.344;
export const KM_PER_MILE = 1.609344;

/** Current engine version, stored on each order so a plan is reproducible. */
export const ENGINE_VERSION = '1.0.0';
