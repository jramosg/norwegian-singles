/**
 * Storage utility for persisting user data
 */

import type { UserData, UserInput, TrainingBlock, Paces } from '../types';

const STORAGE_KEY = 'ns-user-data';

/**
 * Save user data to localStorage
 */
export function saveUserData(data: Partial<UserData>): void {
  try {
    const existing = getUserData();
    const updated: UserData = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
      createdAt: existing?.createdAt || new Date().toISOString(),
    } as UserData;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

/**
 * Get user data from localStorage
 */
export function getUserData(): UserData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserData;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
}

/**
 * Clear user data
 */
export function clearUserData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
}

/**
 * Check if user has existing data
 */
export function hasUserData(): boolean {
  return getUserData() !== null;
}

/**
 * Save just the input configuration
 */
export function saveInput(input: UserInput, vdot: number, paces: Paces): void {
  saveUserData({ input, vdot, paces });
}

/**
 * Save the current training block
 */
export function saveBlock(block: TrainingBlock): void {
  saveUserData({ currentBlock: block });
}

/**
 * Get current locale from storage
 */
export function getSavedLocale(): 'es' | 'en' | null {
  try {
    return localStorage.getItem('ns-locale') as 'es' | 'en' | null;
  } catch {
    return null;
  }
}
