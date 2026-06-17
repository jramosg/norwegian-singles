import { describe, expect, it } from 'vitest';
import {
  calculateVDOT,
  estimateRaceTime,
  formatPace,
  getTrainingPacesFromVDOT,
} from '../vdot';
import { DISTANCE_METERS, type Distance } from '../../types';

// Reference data from vdoto2.com
interface TrainingExpected {
  easyMinKm: string;
  easyMaxKm: string;
  marathonKm: string;
  thresholdKm: string;
  intervalKm: string;
  repetitionKm: string;
}

interface RaceExpected {
  distance: Distance;
  time: string;
  paceKm: string;
  toleranceSec?: number;
}

function parseSeconds(s: string): number {
  const parts = s.split(':').map(Number);
  return parts.length === 2
    ? parts[0] * 60 + parts[1]
    : parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function withinOneSec(actual: string, expected: string) {
  expect(
    Math.abs(parseSeconds(actual) - parseSeconds(expected)),
  ).toBeLessThanOrEqual(1);
}

function checkTraining(vdot: number, e: TrainingExpected) {
  const p = getTrainingPacesFromVDOT(vdot);
  withinOneSec(formatPace(p.easy.min, 'km'), e.easyMinKm);
  withinOneSec(formatPace(p.easy.max, 'km'), e.easyMaxKm);
  withinOneSec(formatPace(p.marathon, 'km'), e.marathonKm);
  withinOneSec(formatPace(p.threshold, 'km'), e.thresholdKm);
  withinOneSec(formatPace(p.interval, 'km'), e.intervalKm);
  withinOneSec(formatPace(p.repetition, 'km'), e.repetitionKm);
}

function checkRaces(
  vdot: number,
  sourceDist: Distance,
  sourceTimeSec: number,
  races: RaceExpected[],
) {
  for (const r of races) {
    const seconds =
      r.distance === sourceDist
        ? sourceTimeSec
        : estimateRaceTime(vdot, r.distance);
    const expectedSec = parseSeconds(r.time);
    expect(Math.abs(seconds - expectedSec)).toBeLessThanOrEqual(
      r.toleranceSec ?? 5,
    );
    const paceKm = seconds / (DISTANCE_METERS[r.distance] / 1000);
    withinOneSec(formatPace(paceKm, 'km'), r.paceKm);
  }
}

describe('VDOT training paces match vdoto2.com', () => {
  it('5K 20:00 — medium VDOT', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['5K'], 20 * 60);
    expect(vdot).toBeCloseTo(49.8, 0);
    checkTraining(vdot, {
      easyMinKm: '5:08',
      easyMaxKm: '5:39',
      marathonKm: '4:32',
      thresholdKm: '4:16',
      intervalKm: '3:56',
      repetitionKm: '3:41',
    });
    checkRaces(vdot, '5K', 20 * 60, [
      { distance: '42K', time: '3:11:23', paceKm: '4:32', toleranceSec: 10 },
      { distance: '21K', time: '1:31:53', paceKm: '4:21', toleranceSec: 10 },
      { distance: '15K', time: '1:03:49', paceKm: '4:15', toleranceSec: 10 },
      { distance: '10K', time: '41:29', paceKm: '4:09', toleranceSec: 10 },
    ]);
  });

  it('5K 30:00 — slow VDOT (< 39), adjusted paces', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['5K'], 30 * 60);
    expect(vdot).toBeCloseTo(30.8, 0);
    checkTraining(vdot, {
      easyMinKm: '7:00',
      easyMaxKm: '7:41',
      marathonKm: '6:43',
      thresholdKm: '6:03',
      intervalKm: '5:24',
      repetitionKm: '5:09',
    });
    checkRaces(vdot, '5K', 30 * 60, [
      { distance: '42K', time: '4:43:10', paceKm: '6:43', toleranceSec: 12 },
      { distance: '21K', time: '2:18:00', paceKm: '6:32', toleranceSec: 10 },
      { distance: '10K', time: '1:02:22', paceKm: '6:14', toleranceSec: 10 },
    ]);
  });

  it('Marathon 3:00:00 — VDOT ~53.5', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['42K'], 3 * 3600);
    expect(vdot).toBeCloseTo(53.5, 0);
    checkTraining(vdot, {
      easyMinKm: '4:51',
      easyMaxKm: '5:21',
      marathonKm: '4:16',
      thresholdKm: '4:02',
      intervalKm: '3:42',
      repetitionKm: '3:27',
    });
    checkRaces(vdot, '42K', 3 * 3600, [
      { distance: '21K', time: '1:26:18', paceKm: '4:05', toleranceSec: 10 },
      { distance: '15K', time: '59:57', paceKm: '4:00', toleranceSec: 10 },
      { distance: '10K', time: '38:59', paceKm: '3:54', toleranceSec: 10 },
      { distance: '5K', time: '18:48', paceKm: '3:46', toleranceSec: 10 },
    ]);
  });

  it('10K 40:00 — VDOT ~51.9', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['10K'], 40 * 60);
    expect(vdot).toBeCloseTo(51.9, 0);
    checkTraining(vdot, {
      easyMinKm: '4:58',
      easyMaxKm: '5:28',
      marathonKm: '4:23',
      thresholdKm: '4:08',
      intervalKm: '3:48',
      repetitionKm: '3:33',
    });
    checkRaces(vdot, '10K', 40 * 60, [
      { distance: '42K', time: '3:04:43', paceKm: '4:23', toleranceSec: 15 },
      { distance: '21K', time: '1:28:36', paceKm: '4:12', toleranceSec: 10 },
      { distance: '5K', time: '19:18', paceKm: '3:52', toleranceSec: 10 },
    ]);
  });

  it('Marathon 4:00:00 — slow VDOT ~37.9', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['42K'], 4 * 3600);
    expect(vdot).toBeCloseTo(37.9, 0);
    checkTraining(vdot, {
      easyMinKm: '6:20',
      easyMaxKm: '6:57',
      marathonKm: '5:41',
      thresholdKm: '5:18',
      intervalKm: '4:52',
      repetitionKm: '4:37',
    });
    checkRaces(vdot, '42K', 4 * 3600, [
      { distance: '21K', time: '1:56:10', paceKm: '5:30', toleranceSec: 15 },
      { distance: '10K', time: '52:24', paceKm: '5:14', toleranceSec: 10 },
      { distance: '5K', time: '25:15', paceKm: '5:03', toleranceSec: 10 },
    ]);
  });

  it('Marathon 2:30:00 — high VDOT ~66.3', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['42K'], 2.5 * 3600);
    expect(vdot).toBeCloseTo(66.3, 0);
    checkTraining(vdot, {
      easyMinKm: '4:04',
      easyMaxKm: '4:30',
      marathonKm: '3:33',
      thresholdKm: '3:23',
      intervalKm: '3:07',
      repetitionKm: '2:52',
    });
    checkRaces(vdot, '42K', 2.5 * 3600, [
      { distance: '21K', time: '1:11:37', paceKm: '3:24', toleranceSec: 5 },
      { distance: '15K', time: '49:47', paceKm: '3:19', toleranceSec: 5 },
      { distance: '10K', time: '32:27', paceKm: '3:15', toleranceSec: 5 },
      { distance: '5K', time: '15:38', paceKm: '3:08', toleranceSec: 5 },
    ]);
  });

  it('1Mi 4:00 — high VDOT ~76.5', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['1MI'], 4 * 60);
    expect(vdot).toBeCloseTo(76.5, 0);
    checkTraining(vdot, {
      easyMinKm: '3:38',
      easyMaxKm: '4:00',
      marathonKm: '3:08',
      thresholdKm: '3:01',
      intervalKm: '2:46',
      repetitionKm: '2:31',
    });
    checkRaces(vdot, '1MI', 4 * 60, [
      { distance: '42K', time: '2:12:31', paceKm: '3:08', toleranceSec: 10 },
      { distance: '21K', time: '1:03:14', paceKm: '3:00', toleranceSec: 10 },
      { distance: '15K', time: '44:01', paceKm: '2:56', toleranceSec: 10 },
      { distance: '10K', time: '28:43', paceKm: '2:52', toleranceSec: 10 },
      { distance: '5K', time: '13:48', paceKm: '2:46', toleranceSec: 10 },
    ]);
  });

  it('1500m 5:00 — VDOT ~54.5', () => {
    const vdot = calculateVDOT(DISTANCE_METERS['1500M'], 5 * 60);
    expect(vdot).toBeCloseTo(54.5, 0);
    checkTraining(vdot, {
      easyMinKm: '4:47',
      easyMaxKm: '5:16',
      marathonKm: '4:12',
      thresholdKm: '3:58',
      intervalKm: '3:39',
      repetitionKm: '3:24',
    });
    checkRaces(vdot, '1500M', 5 * 60, [
      { distance: '42K', time: '2:57:27', paceKm: '4:12', toleranceSec: 15 },
      { distance: '10K', time: '38:25', paceKm: '3:51', toleranceSec: 10 },
      { distance: '5K', time: '18:32', paceKm: '3:42', toleranceSec: 10 },
    ]);
  });
});
