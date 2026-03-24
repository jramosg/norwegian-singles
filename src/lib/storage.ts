/**
 * LocalStorage persistence for the user's saved plan.
 */

import type { SavedPlan } from '../types';

const KEY = 'nsm-plan-v2';

export function savePlan(plan: SavedPlan): void {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ ...plan, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // Storage unavailable (SSR or private mode)
  }
}

export function loadPlan(): SavedPlan | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedPlan;
  } catch {
    return null;
  }
}

export function clearPlan(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function getSavedLocale(): 'es' | 'en' | null {
  try {
    return localStorage.getItem('ns-locale') as 'es' | 'en' | null;
  } catch {
    return null;
  }
}
