import { describe, it, expect } from 'vitest';
import {
  assessGoal,
  marathonPaceBand,
  predictMarathonSec,
  riegelExponent,
} from '../mp';

describe('riegelExponent', () => {
  it('returns the documented values at the 135/115/90 boundaries', () => {
    expect(riegelExponent(135)).toBe(1.06);
    expect(riegelExponent(115)).toBe(1.07);
    expect(riegelExponent(90)).toBe(1.08);
    expect(riegelExponent(89)).toBe(1.1);
  });

  it('is monotonically non-increasing as volume rises', () => {
    const volumes = [40, 70, 89, 90, 100, 114, 115, 120, 134, 135, 160];
    for (let i = 1; i < volumes.length; i++) {
      expect(riegelExponent(volumes[i])).toBeLessThanOrEqual(
        riegelExponent(volumes[i - 1]),
      );
    }
  });
});

describe('predictMarathonSec', () => {
  it('is monotonic in the 5K time: a slower 5K predicts a slower marathon', () => {
    const times = [1000, 1100, 1200, 1300, 1400];
    const peakWeeklyKm = 100;
    for (let i = 1; i < times.length; i++) {
      expect(predictMarathonSec(times[i], peakWeeklyKm)).toBeGreaterThan(
        predictMarathonSec(times[i - 1], peakWeeklyKm),
      );
    }
  });

  it('is monotonic in weekly volume: more volume never predicts a slower marathon', () => {
    const fiveKSeconds = 1200;
    const volumes = [50, 70, 89, 90, 100, 114, 115, 120, 134, 135, 160];
    for (let i = 1; i < volumes.length; i++) {
      expect(predictMarathonSec(fiveKSeconds, volumes[i])).toBeLessThanOrEqual(
        predictMarathonSec(fiveKSeconds, volumes[i - 1]),
      );
    }
  });

  it('a 20:00 5K at 95 km/wk predicts a marathon between 3:15:00 and 3:25:00', () => {
    // The anchor case: the old flat 1.14 multiplier predicted 3:12, which
    // was too optimistic for this volume.
    const predicted = predictMarathonSec(20 * 60, 95);
    expect(predicted).toBeGreaterThan(3 * 3600 + 15 * 60);
    expect(predicted).toBeLessThan(3 * 3600 + 25 * 60);
  });

  it('a 20:00 5K at 140 km/wk is faster than the same 5K at 75 km/wk', () => {
    const fast = predictMarathonSec(20 * 60, 140);
    const slow = predictMarathonSec(20 * 60, 75);
    expect(fast).toBeLessThan(slow);
  });
});

describe('marathonPaceBand', () => {
  it('fast < mid < slow, and predictedFinishSec is consistent with midSecPerKm', () => {
    for (const peakWeeklyKm of [70, 95, 120, 150]) {
      const band = marathonPaceBand(20 * 60, peakWeeklyKm);
      expect(band.fastSecPerKm).toBeLessThan(band.midSecPerKm);
      expect(band.midSecPerKm).toBeLessThan(band.slowSecPerKm);

      const impliedFinish = band.midSecPerKm * 42.195;
      expect(Math.abs(band.predictedFinishSec - impliedFinish)).toBeLessThan(
        30,
      );
    }
  });
});

describe('assessGoal', () => {
  it('is realistic when the goal matches the prediction', () => {
    const band = marathonPaceBand(20 * 60, 95);
    const verdict = assessGoal(band, band.predictedFinishSec);
    expect(verdict.verdict).toBe('realistic');
  });

  it('is unrealistic when the goal is far faster than the prediction', () => {
    const band = marathonPaceBand(20 * 60, 95);
    const ambitiousGoal = Math.round(band.predictedFinishSec * 0.8);
    const verdict = assessGoal(band, ambitiousGoal);
    expect(verdict.verdict).toBe('unrealistic');
  });
});
