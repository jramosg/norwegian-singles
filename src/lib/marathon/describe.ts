/**
 * Locale-neutral text rendering of a session.
 *
 * Notation is the same shorthand runners already read on a training log
 * ("5 x 10 min @ 4:16-4:21/km w/ 2 min jog"), so it works as the CSV and
 * calendar payload as well as the fallback for the UI.
 *
 * Every line carries both the absolute band and the anchor it came from, so a
 * printed sheet is still usable after fitness moves on.
 */

import { formatPace } from '../paces';
import type { PaceResolver } from './resolve';
import type { Unit } from '../../types';
import type { Effort, PaceAnchor, Recovery, Segment } from './types';

export function anchorLabel(anchor: PaceAnchor): string {
  switch (anchor.kind) {
    case 'subT':
      return {
        rep3min: 'sub-T (short reps)',
        rep6min: 'sub-T (medium reps)',
        rep10min: 'sub-T (long reps)',
      }[anchor.column];
    case 'easy':
      return 'easy';
    case 'race':
      return `${anchor.distance} pace`;
    case 'mp':
      return anchor.pct === 100 ? 'marathon pace' : `${anchor.pct}% MP`;
    case 'effort':
      return {
        hill_strong: 'strong uphill effort',
        hill_max: 'maximal uphill effort',
        max_speed: 'near-maximal speed',
        above_threshold: 'above threshold',
        relaxed: 'relaxed',
      }[anchor.label];
  }
}

function paceText(anchor: PaceAnchor, r: PaceResolver, unit: Unit): string {
  const band = r.band(anchor);
  if (!band) return anchorLabel(anchor);
  const suffix = unit === 'km' ? '/km' : '/mi';
  const fast = formatPace(band.fastSecPerKm, unit);
  const slow = formatPace(band.slowSecPerKm, unit);
  const range = fast === slow ? fast : `${fast}-${slow}`;
  return `${range}${suffix} (${anchorLabel(anchor)})`;
}

function amount(e: Effort | Recovery, unit: Unit): string {
  if (e.distanceM !== undefined) {
    if (unit === 'mile') {
      const mi = e.distanceM / 1609.344;
      return mi < 1 ? `${e.distanceM} m` : `${+mi.toFixed(2)} mi`;
    }
    return e.distanceM >= 1000
      ? `${+(e.distanceM / 1000).toFixed(2)} km`
      : `${e.distanceM} m`;
  }
  const sec = e.durationSec ?? 0;
  return sec >= 60 && sec % 60 === 0 ? `${sec / 60} min` : `${sec} s`;
}

function recoveryText(rec: Recovery, r: PaceResolver, unit: Unit): string {
  const verb = {
    jog: 'jog',
    walk: 'walk',
    easy: 'easy running',
    float: 'float',
    standing: 'standing rest',
  }[rec.kind];
  if (rec.kind === 'float' && rec.anchor) {
    return `${amount(rec, unit)} ${verb} @ ${paceText(rec.anchor, r, unit)}`;
  }
  return `${amount(rec, unit)} ${verb}`;
}

export function describeSegment(
  seg: Segment,
  r: PaceResolver,
  unit: Unit,
): string {
  switch (seg.kind) {
    case 'steady': {
      const what = amount(seg, unit);
      if (seg.anchor.kind === 'easy') {
        const label =
          seg.label === 'warmup'
            ? 'warm-up'
            : seg.label === 'cooldown'
              ? 'cool-down'
              : 'easy';
        return `${what} ${label}`;
      }
      return `${what} @ ${paceText(seg.anchor, r, unit)}`;
    }
    case 'interval': {
      const sets = seg.sets ?? 1;
      const core = `${seg.count} x ${amount(seg.work, unit)} @ ${paceText(
        seg.work.anchor,
        r,
        unit,
      )} w/ ${recoveryText(seg.recovery, r, unit)}`;
      const body = sets > 1 ? `${sets} sets of ${core}` : core;
      const between =
        sets > 1 && seg.setRecovery
          ? `, ${recoveryText(seg.setRecovery, r, unit)} between sets`
          : '';
      const note = seg.label === 'progressive' ? ' (progressive)' : '';
      return `${body}${between}${note}`;
    }
    case 'progression': {
      // An alternating session reads as one continuous run, not a list.
      if (seg.label === 'alternating' && seg.blocks.length > 1) {
        const totalMin = Math.round(
          seg.blocks.reduce((sum, b) => sum + (b.durationSec ?? 0), 0) / 60,
        );
        const a = seg.blocks[0];
        const b = seg.blocks[1];
        return (
          `${totalMin} min continuous, alternating ` +
          `${amount(a, unit)} @ ${paceText(a.anchor, r, unit)} / ` +
          `${amount(b, unit)} @ ${paceText(b.anchor, r, unit)}`
        );
      }
      const parts = seg.blocks.map(
        (b) => `${amount(b, unit)} @ ${paceText(b.anchor, r, unit)}`,
      );
      return parts.join(' -> ');
    }
  }
}

export function describeSession(
  segments: Segment[],
  r: PaceResolver,
  unit: Unit,
): string {
  return segments.map((s) => describeSegment(s, r, unit)).join(' + ');
}
