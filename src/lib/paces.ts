/**
 * Pace utilities for Norwegian Singles
 */

const KM_PER_MILE = 1.60934;

/**
 * Format seconds-per-km as a mm:ss string.
 * Pass unit='mile' to convert to min/mile before formatting.
 */
export function formatPace(
  secondsPerKm: number,
  unit: 'km' | 'mile' = 'km',
): string {
  const pace = unit === 'mile' ? secondsPerKm * KM_PER_MILE : secondsPerKm;
  const mins = Math.floor(pace / 60);
  const secs = Math.round(pace % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

/**
 * Parse a time string (mm:ss or h:mm:ss) into total seconds.
 * Returns null if the format is invalid or values are out of range.
 */
export function parseTime(timeStr: string): number | null {
  if (!timeStr) return null;

  const parts = timeStr.split(':').map(Number);

  if (parts.some(isNaN)) return null;

  if (parts.length === 2) {
    const [mins, secs] = parts;
    if (secs >= 60 || secs < 0 || mins < 0) return null;
    return mins * 60 + secs;
  }

  if (parts.length === 3) {
    const [hours, mins, secs] = parts;
    if (secs >= 60 || secs < 0 || mins >= 60 || mins < 0 || hours < 0)
      return null;
    return hours * 3600 + mins * 60 + secs;
  }

  return null;
}

/**
 * Add time separators to digits entered in a mobile-friendly time field.
 * The last two digits are seconds; marathon inputs may also include hours.
 */
export function formatTimeInput(value: string, includeHours = false): string {
  const digits = value.replace(/\D/g, '');

  if (!digits) return '';

  if (includeHours && digits.length > 4) {
    const minuteSecond = digits.slice(-4);
    return `${digits.slice(0, -4)}:${minuteSecond.slice(
      0,
      2,
    )}:${minuteSecond.slice(2)}`;
  }

  if (digits.length > 2) {
    return `${digits.slice(0, -2)}:${digits.slice(-2)}`;
  }

  return digits;
}

/**
 * Format total seconds as mm:ss (or h:mm:ss when >= 1 hour).
 */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}
