import { describe, it, expect } from 'vitest';
import { formatPace, parseTime, formatTime } from '../paces';

describe('formatPace', () => {
  it('formats seconds per km as mm:ss', () => {
    expect(formatPace(254)).toBe('4:14'); // 4min 14sec
    expect(formatPace(193)).toBe('3:13');
    expect(formatPace(373)).toBe('6:13');
  });

  it('converts to miles when unit is mile', () => {
    // 254 s/km * 1.60934 = 408.77 s/mi → 6:49
    const result = formatPace(254, 'mile');
    expect(result).toBe('6:49');
  });

  it('pads seconds below 10 with a zero', () => {
    expect(formatPace(183)).toBe('3:03');
    expect(formatPace(300)).toBe('5:00');
  });
});

describe('parseTime', () => {
  it('parses mm:ss correctly', () => {
    expect(parseTime('20:00')).toBe(1200);
    expect(parseTime('17:30')).toBe(1050);
  });

  it('parses h:mm:ss correctly', () => {
    expect(parseTime('1:30:00')).toBe(5400);
  });

  it('returns null for invalid inputs', () => {
    expect(parseTime('')).toBeNull();
    expect(parseTime('abc')).toBeNull();
    expect(parseTime('25:61')).toBeNull(); // seconds ≥ 60
    expect(parseTime('99:61:00')).toBeNull(); // seconds ≥ 60
  });
});

describe('formatTime', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatTime(1200)).toBe('20:00');
    expect(formatTime(73)).toBe('1:13');
  });

  it('formats seconds as h:mm:ss when >= 1 hour', () => {
    expect(formatTime(3661)).toBe('1:01:01');
  });
});
