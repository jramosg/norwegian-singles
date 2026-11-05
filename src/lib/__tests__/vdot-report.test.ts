import { describe, expect, it } from 'vitest';
import {
  buildVdotChart,
  computeVdotReport,
  parseRaceTime,
} from '../vdot-report';

describe('parseRaceTime', () => {
  it('accepts mm:ss and h:mm:ss', () => {
    expect(parseRaceTime('20:00')).toBe(1200);
    expect(parseRaceTime('1:35:00')).toBe(5700);
  });

  it('accepts minutes above 59 in the two-part form', () => {
    expect(parseRaceTime('65:00')).toBe(3900);
  });

  it('rejects malformed times', () => {
    for (const bad of [
      '',
      '20',
      '20:60',
      '1:60:00',
      'a:00',
      '0:00',
      '1:2:3:4',
    ]) {
      expect(parseRaceTime(bad)).toBeNull();
    }
  });
});

describe('computeVdotReport', () => {
  it('matches the reference VDOT for a 20:00 5K', () => {
    const report = computeVdotReport('5K', '20:00');
    expect(report?.vdot).toBe(49.8);
    expect(report?.inTableRange).toBe(true);
  });

  it('predicts the input race back within a few seconds', () => {
    const report = computeVdotReport('10K', '50:00');
    const tenK = report?.equivalents.find((e) => e.distance === '10K');
    expect(Math.abs((tenK?.seconds ?? 0) - 3000)).toBeLessThanOrEqual(5);
  });

  it('orders equivalents from fastest to slowest distance', () => {
    const seconds = computeVdotReport('5K', '25:00')!.equivalents.map(
      (e) => e.seconds,
    );
    expect([...seconds].sort((a, b) => a - b)).toEqual(seconds);
  });

  it('rejects impossible results', () => {
    expect(computeVdotReport('5K', '5:00')).toBeNull();
    expect(computeVdotReport('5K', '3:00:00')).toBeNull();
  });

  it('flags results outside the table range', () => {
    expect(computeVdotReport('5K', '45:00')?.inTableRange).toBe(false);
  });
});

describe('buildVdotChart', () => {
  it('covers VDOT 30 to 85 with faster times as VDOT rises', () => {
    const rows = buildVdotChart();
    expect(rows).toHaveLength(56);
    expect(rows[0].vdot).toBe(30);
    expect(rows.at(-1)?.vdot).toBe(85);
    expect(rows[1].fiveK).toBeLessThan(rows[0].fiveK);
  });
});
