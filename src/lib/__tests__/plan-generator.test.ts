import { describe, it, expect } from 'vitest';
import { createPlan } from '../plan-generator';
import type { UserInput } from '../../types';

describe('createPlan', () => {
  it('creates a plan from 5K time', () => {
    const input: UserInput = { time5K: '20:00', weeklyHours: 6, unit: 'km' };
    const plan = createPlan(input);
    expect(plan.paces.fiveKSeconds).toBe(1200);
    expect(plan.paces.rep3min).toBe(254); // 4:14 from table
    expect(plan.paces.rep6min).toBe(260); // 4:20
    expect(plan.paces.rep10min).toBe(269); // 4:29
  });

  it('creates a plan from 10K time by estimating 5K', () => {
    const input: UserInput = { time10K: '40:00', weeklyHours: 5.5, unit: 'km' };
    const plan = createPlan(input);
    // 40:00 10K → ~18:29 5K (2400 * 0.462 = 1108.8 ≈ 1109s)
    expect(plan.paces.fiveKSeconds).toBeGreaterThan(0);
    expect(plan.paces.rep3min).toBeGreaterThan(0);
  });

  it('creates a plan from a half marathon race result', () => {
    const input: UserInput = {
      raceDistance: '21K',
      raceTime: '1:30:00',
      weeklyHours: 6,
      unit: 'km',
    };
    const plan = createPlan(input);
    expect(plan.paces.fiveKSeconds).toBeGreaterThan(0);
    expect(plan.paces.rep3min).toBeGreaterThan(0);
  });

  it('creates a plan from a marathon race result', () => {
    const input: UserInput = {
      raceDistance: '42K',
      raceTime: '3:15:00',
      weeklyHours: 6,
      unit: 'km',
    };
    const plan = createPlan(input);
    expect(plan.paces.fiveKSeconds).toBeGreaterThan(0);
    expect(plan.paces.easy).toBeGreaterThan(plan.paces.rep10min);
  });

  it('creates a plan from a custom race result', () => {
    const input: UserInput = {
      raceDistance: 'custom',
      raceTime: '1:00:00',
      customDistanceKm: 15,
      weeklyHours: 6,
      unit: 'km',
    };
    const plan = createPlan(input);
    expect(plan.paces.fiveKSeconds).toBeGreaterThan(0);
  });

  it('creates a plan from VDOT-style short race distances', () => {
    const input: UserInput = {
      raceDistance: '1MI',
      raceTime: '6:00',
      weeklyHours: 6,
      unit: 'km',
    };

    const plan = createPlan(input);
    expect(plan.paces.fiveKSeconds).toBeGreaterThan(0);
    expect(plan.paces.rep3min).toBeGreaterThan(0);
  });

  it('matches built-in mile distances with custom miles', () => {
    const builtIn: UserInput = {
      raceDistance: '1MI',
      raceTime: '6:00',
      weeklyHours: 6,
      unit: 'km',
    };
    const custom: UserInput = {
      raceDistance: 'custom',
      raceTime: '6:00',
      customDistance: 1,
      customDistanceUnit: 'mile',
      weeklyHours: 6,
      unit: 'km',
    };

    expect(createPlan(custom).paces.fiveKSeconds).toBe(
      createPlan(builtIn).paces.fiveKSeconds,
    );
  });

  it('prefers 5K over 10K when both provided', () => {
    const inputWith5K: UserInput = {
      time5K: '20:00',
      time10K: '42:00',
      weeklyHours: 6,
      unit: 'km',
    };
    const inputOnly5K: UserInput = {
      time5K: '20:00',
      weeklyHours: 6,
      unit: 'km',
    };
    expect(createPlan(inputWith5K).paces.fiveKSeconds).toBe(
      createPlan(inputOnly5K).paces.fiveKSeconds,
    );
  });

  it('stores input and timestamps in returned plan', () => {
    const input: UserInput = { time5K: '25:00', weeklyHours: 7, unit: 'mile' };
    const plan = createPlan(input);
    expect(plan.input).toEqual(input);
    expect(plan.createdAt).toBeTruthy();
    expect(plan.updatedAt).toBeTruthy();
  });

  it('throws when no time is provided', () => {
    const input: UserInput = { weeklyHours: 6, unit: 'km' };
    expect(() => createPlan(input)).toThrow();
  });

  it('throws on invalid time format', () => {
    const input: UserInput = { time5K: 'abc', weeklyHours: 6, unit: 'km' };
    expect(() => createPlan(input)).toThrow();
  });

  it('throws on invalid custom distance', () => {
    const input: UserInput = {
      raceDistance: 'custom',
      raceTime: '1:00:00',
      customDistanceKm: 0,
      weeklyHours: 6,
      unit: 'km',
    };
    expect(() => createPlan(input)).toThrow();
  });

  it('throws when custom distance is under 800 meters', () => {
    const input: UserInput = {
      raceDistance: 'custom',
      raceTime: '2:00',
      customDistance: 0.4,
      customDistanceUnit: 'km',
      weeklyHours: 6,
      unit: 'km',
    };
    expect(() => createPlan(input)).toThrow();
  });
});
