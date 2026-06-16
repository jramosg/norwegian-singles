import { describe, expect, it } from 'vitest';
import { decodePlanInput, encodePlanInput } from '../plan-url';
import type { UserInput } from '../../types';

describe('plan-url', () => {
  it('round-trips a primary race result', () => {
    const input: UserInput = {
      raceDistance: '21K',
      raceTime: '1:30:00',
      weeklyHours: 6,
      unit: 'km',
      marathonDate: '2027-04-18',
    };

    const decoded = decodePlanInput(
      new URLSearchParams(encodePlanInput(input)),
    );

    expect(decoded).toEqual(input);
  });

  it('round-trips a custom distance result', () => {
    const input: UserInput = {
      raceDistance: 'custom',
      raceTime: '1:00:00',
      customDistance: 10,
      customDistanceUnit: 'mile',
      weeklyHours: 6.5,
      unit: 'mile',
    };

    const decoded = decodePlanInput(
      new URLSearchParams(encodePlanInput(input)),
    );

    expect(decoded).toEqual(input);
  });

  it('round-trips short VDOT-style race distances', () => {
    const input: UserInput = {
      raceDistance: '2MI',
      raceTime: '12:00',
      weeklyHours: 5,
      unit: 'km',
    };

    const decoded = decodePlanInput(
      new URLSearchParams(encodePlanInput(input)),
    );

    expect(decoded).toEqual(input);
  });

  it('keeps decoding legacy custom-kilometer links', () => {
    const decoded = decodePlanInput(
      new URLSearchParams('d=custom&rt=1%3A00%3A00&cd=15&h=6.5&u=km'),
    );

    expect(decoded).toMatchObject({
      raceDistance: 'custom',
      customDistance: 15,
      customDistanceKm: 15,
      customDistanceUnit: 'km',
    });
  });

  it('keeps decoding legacy 5K links', () => {
    const decoded = decodePlanInput(new URLSearchParams('t5=20%3A00&h=6&u=km'));

    expect(decoded).toMatchObject({
      time5K: '20:00',
      weeklyHours: 6,
      unit: 'km',
    });
  });
});
