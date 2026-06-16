import { describe, expect, it } from 'vitest';
import {
  calculateVDOT,
  estimateRaceTime,
  formatPace,
  getTrainingPacesFromVDOT,
} from '../vdot';
import { DISTANCE_METERS, type Distance } from '../../types';

interface ExpectedRace {
  distance: Distance;
  time: string;
  paceMi: string;
  paceKm: string;
  toleranceSeconds?: number;
}

interface ExpectedTraining {
  easy: {
    minMi: string;
    maxMi: string;
    minKm: string;
    maxKm: string;
  };
  marathon: {
    mi: string;
    km: string;
  };
  threshold: {
    mi: string;
    km: string;
  };
  interval: {
    mi: string;
    km: string;
  };
  repetition: {
    mi: string;
    km: string;
  };
}

interface VDOTReference {
  sourceDistance: Distance;
  sourceTimeSeconds: number;
  expectedVdot: number;
  races: ExpectedRace[];
  training: ExpectedTraining;
}

const expectedFastRaceEquivalents: ExpectedRace[] = [
  {
    distance: '42K',
    time: '2:47:11',
    paceMi: '6:23',
    paceKm: '3:58',
  },
  {
    distance: '21K',
    time: '1:20:00',
    paceMi: '6:06',
    paceKm: '3:48',
  },
  {
    distance: '15K',
    time: '55:35',
    paceMi: '5:58',
    paceKm: '3:42',
  },
  {
    distance: '10K',
    time: '36:11',
    paceMi: '5:49',
    paceKm: '3:37',
  },
  {
    distance: '5K',
    time: '17:26',
    paceMi: '5:37',
    paceKm: '3:29',
    toleranceSeconds: 1,
  },
];

const expectedSlowerRaceEquivalents: ExpectedRace[] = [
  {
    distance: '42K',
    time: '3:37:56',
    paceMi: '8:19',
    paceKm: '5:10',
    toleranceSeconds: 3,
  },
  {
    distance: '21K',
    time: '1:45:00',
    paceMi: '8:01',
    paceKm: '4:59',
  },
  {
    distance: '15K',
    time: '1:13:00',
    paceMi: '7:50',
    paceKm: '4:52',
    toleranceSeconds: 1,
  },
  {
    distance: '10K',
    time: '47:24',
    paceMi: '7:38',
    paceKm: '4:44',
    toleranceSeconds: 1,
  },
  {
    distance: '5K',
    time: '22:51',
    paceMi: '7:21',
    paceKm: '4:34',
    toleranceSeconds: 1,
  },
];

const expectedTenKOneHourRaceEquivalents: ExpectedRace[] = [
  {
    distance: '42K',
    time: '4:33:02',
    paceMi: '10:25',
    paceKm: '6:28',
    toleranceSeconds: 12,
  },
  {
    distance: '21K',
    time: '2:12:51',
    paceMi: '10:08',
    paceKm: '6:18',
    toleranceSeconds: 2,
  },
  {
    distance: '15K',
    time: '1:32:27',
    paceMi: '9:55',
    paceKm: '6:10',
    toleranceSeconds: 1,
  },
  {
    distance: '10K',
    time: '1:00:00',
    paceMi: '9:39',
    paceKm: '6:00',
  },
  {
    distance: '5K',
    time: '28:52',
    paceMi: '9:18',
    paceKm: '5:46',
    toleranceSeconds: 2,
  },
];

describe('VDOT equivalence', () => {
  it('matches VDOT O2 race equivalents for a 1:20:00 half marathon', () => {
    expectVDOTReference({
      sourceDistance: '21K',
      sourceTimeSeconds: 80 * 60,
      expectedVdot: 58.4,
      races: expectedFastRaceEquivalents,
      training: {
        easy: {
          minMi: '7:16',
          maxMi: '8:01',
          minKm: '4:31',
          maxKm: '4:59',
        },
        marathon: { mi: '6:23', km: '3:58' },
        threshold: { mi: '6:02', km: '3:45' },
        interval: { mi: '5:33', km: '3:27' },
        repetition: { mi: '5:09', km: '3:12' },
      },
    });
  });

  it('matches VDOT O2 race equivalents for a 1:45:00 half marathon', () => {
    expectVDOTReference({
      sourceDistance: '21K',
      sourceTimeSeconds: 105 * 60,
      expectedVdot: 42.6,
      races: expectedSlowerRaceEquivalents,
      training: {
        easy: {
          minMi: '9:21',
          maxMi: '10:17',
          minKm: '5:49',
          maxKm: '6:23',
        },
        marathon: { mi: '8:19', km: '5:10' },
        threshold: { mi: '7:48', km: '4:51' },
        interval: { mi: '7:10', km: '4:27' },
        repetition: { mi: '6:46', km: '4:12' },
      },
    });
  });

  it('matches VDOT O2 race equivalents for a 1:00:00 10K', () => {
    expectVDOTReference({
      sourceDistance: '10K',
      sourceTimeSeconds: 60 * 60,
      expectedVdot: 32.3,
      races: expectedTenKOneHourRaceEquivalents,
      training: {
        easy: {
          minMi: '11:02',
          maxMi: '12:05',
          minKm: '6:51',
          maxKm: '7:31',
        },
        marathon: { mi: '10:25', km: '6:28' },
        threshold: { mi: '9:28', km: '5:53' },
        interval: { mi: '8:30', km: '5:17' },
        repetition: { mi: '8:06', km: '5:02' },
      },
    });
  });
});

function expectVDOTReference(reference: VDOTReference) {
  const vdot = calculateVDOT(
    DISTANCE_METERS[reference.sourceDistance],
    reference.sourceTimeSeconds,
  );

  expect(vdot).toBeCloseTo(reference.expectedVdot, 1);
  expectRaceEquivalents(vdot, reference, reference.races);
  expectTrainingPaces(vdot, reference.training);
}

function expectRaceEquivalents(
  vdot: number,
  reference: VDOTReference,
  expectedRaces: ExpectedRace[],
) {
  for (const expected of expectedRaces) {
    const meters = DISTANCE_METERS[expected.distance];
    const seconds =
      expected.distance === reference.sourceDistance
        ? reference.sourceTimeSeconds
        : estimateRaceTime(vdot, expected.distance);
    const expectedSeconds = parseExpectedTime(expected.time);
    const secondsPerKm = seconds / (meters / 1000);

    expect(Math.abs(seconds - expectedSeconds)).toBeLessThanOrEqual(
      expected.toleranceSeconds || 0,
    );
    expectPaceWithinOneSecond(
      formatPace(secondsPerKm, 'mile'),
      expected.paceMi,
    );
    expectPaceWithinOneSecond(formatPace(secondsPerKm, 'km'), expected.paceKm);
  }
}

function expectTrainingPaces(vdot: number, expected: ExpectedTraining) {
  const paces = getTrainingPacesFromVDOT(vdot);

  expectPaceWithinOneSecond(
    formatPace(paces.easy.min, 'mile'),
    expected.easy.minMi,
  );
  expectPaceWithinOneSecond(
    formatPace(paces.easy.max, 'mile'),
    expected.easy.maxMi,
  );
  expect(formatPace(paces.easy.min, 'km')).toBe(expected.easy.minKm);
  expect(formatPace(paces.easy.max, 'km')).toBe(expected.easy.maxKm);
  expect(formatPace(paces.marathon, 'mile')).toBe(expected.marathon.mi);
  expect(formatPace(paces.marathon, 'km')).toBe(expected.marathon.km);
  expect(formatPace(paces.threshold, 'mile')).toBe(expected.threshold.mi);
  expect(formatPace(paces.threshold, 'km')).toBe(expected.threshold.km);
  expect(formatPace(paces.interval, 'mile')).toBe(expected.interval.mi);
  expect(formatPace(paces.interval, 'km')).toBe(expected.interval.km);
  expect(formatPace(paces.repetition, 'mile')).toBe(expected.repetition.mi);
  expect(formatPace(paces.repetition, 'km')).toBe(expected.repetition.km);
}

function parseExpectedTime(value: string): number {
  const parts = value.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function expectPaceWithinOneSecond(actual: string, expected: string) {
  expect(
    Math.abs(parseExpectedTime(actual) - parseExpectedTime(expected)),
  ).toBeLessThanOrEqual(1);
}
