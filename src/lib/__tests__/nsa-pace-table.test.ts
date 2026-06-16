import { describe, it, expect } from 'vitest';
import {
  getSubTPaces,
  estimate5KFrom10K,
  estimate5KFromHM,
} from '../nsa-pace-table';

describe('getSubTPaces — exact table rows', () => {
  it('15:00 5K → 3:13, 3:18, 3:25 sub-T paces', () => {
    const p = getSubTPaces(900);
    expect(p.rep3min).toBe(193); // 3:13
    expect(p.rep6min).toBe(198); // 3:18
    expect(p.rep10min).toBe(205); // 3:25
  });

  it('20:00 5K → 4:14, 4:20, 4:29', () => {
    const p = getSubTPaces(1200);
    expect(p.rep3min).toBe(254); // 4:14
    expect(p.rep6min).toBe(260); // 4:20
    expect(p.rep10min).toBe(269); // 4:29
  });

  it('25:00 5K → 5:14, 5:22, 5:32', () => {
    const p = getSubTPaces(1500);
    expect(p.rep3min).toBe(314); // 5:14
    expect(p.rep6min).toBe(322); // 5:22
    expect(p.rep10min).toBe(332); // 5:32
  });

  it('30:00 5K → 6:13, 6:22, 6:34', () => {
    const p = getSubTPaces(1800);
    expect(p.rep3min).toBe(373); // 6:13
    expect(p.rep6min).toBe(382); // 6:22
    expect(p.rep10min).toBe(394); // 6:34
  });
});

describe('getSubTPaces — interpolation', () => {
  it('17:30 (midpoint 17:20–17:40) interpolates correctly', () => {
    const p = getSubTPaces(1050); // midpoint between 1040 and 1060
    // rep3min should be midpoint of 222 and 226 = 224
    expect(p.rep3min).toBe(224);
    // rep6min midpoint of 227 and 232 = 229 (rounded)
    expect(p.rep6min).toBe(230);
  });

  it('paces increase as 5K time increases', () => {
    const slow = getSubTPaces(1500);
    const fast = getSubTPaces(900);
    expect(slow.rep3min).toBeGreaterThan(fast.rep3min);
    expect(slow.rep6min).toBeGreaterThan(fast.rep6min);
    expect(slow.rep10min).toBeGreaterThan(fast.rep10min);
  });

  it('rep paces are ordered: 3min < 6min < 10min for any 5K time', () => {
    for (const t of [900, 1200, 1500, 1800]) {
      const p = getSubTPaces(t);
      expect(p.rep3min).toBeLessThan(p.rep6min);
      expect(p.rep6min).toBeLessThan(p.rep10min);
    }
  });
});

describe('getSubTPaces — easy pace', () => {
  it('easy pace is slower than sub-T rep paces', () => {
    const p = getSubTPaces(1200); // 20:00 5K
    expect(p.easy).toBeGreaterThan(p.rep10min);
  });

  it('20:00 5K → 5:43 easy (343 s/km)', () => {
    expect(getSubTPaces(1200).easy).toBe(343);
  });

  it('15:20 5K → 4:22 easy (262 s/km)', () => {
    expect(getSubTPaces(920).easy).toBe(262);
  });

  it('25:00 5K → 7:09 easy (429 s/km)', () => {
    expect(getSubTPaces(1500).easy).toBe(429);
  });

  it('30:00 5K → 8:34 easy (514 s/km)', () => {
    expect(getSubTPaces(1800).easy).toBe(514);
  });
});

describe('getSubTPaces — extrapolation beyond table', () => {
  it('handles 5K slower than 30:00 without throwing', () => {
    expect(() => getSubTPaces(2100)).not.toThrow(); // 35:00
    const p = getSubTPaces(2100);
    expect(p.rep3min).toBeGreaterThan(373);
  });

  it('handles very fast 5K (below 15:00) without throwing', () => {
    expect(() => getSubTPaces(780)).not.toThrow(); // 13:00
    const p = getSubTPaces(780);
    expect(p.rep3min).toBeLessThanOrEqual(193);
  });
});

describe('estimate5KFrom10K', () => {
  it('produces a 5K time shorter than 10K time', () => {
    const tenK = 2220; // 37:00
    const fiveK = estimate5KFrom10K(tenK);
    expect(fiveK).toBeLessThan(tenK);
  });

  it('ratio is approximately 0.482 (matches VDOT)', () => {
    const tenK = 2400; // 40:00
    const fiveK = estimate5KFrom10K(tenK);
    expect(fiveK).toBeCloseTo(tenK * 0.482, 0);
  });

  it('35:20 10K → ~17:01 5K (VDOT O2 reference)', () => {
    const tenK = 35 * 60 + 20; // 2120s
    const fiveK = estimate5KFrom10K(tenK);
    // VDOT O2 gives 17:01 = 1021s
    expect(fiveK).toBeGreaterThanOrEqual(1020);
    expect(fiveK).toBeLessThanOrEqual(1023);
  });
});

describe('estimate5KFromHM', () => {
  it('produces a 5K time shorter than HM time', () => {
    const hm = 5400; // 1:30:00
    expect(estimate5KFromHM(hm)).toBeLessThan(hm);
  });
});
