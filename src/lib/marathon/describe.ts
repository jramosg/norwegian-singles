/**
 * Renders a session as text, in the reader's language.
 *
 * Notation is the shorthand runners already read on a training log
 * ("5 x 10 min @ 4:16-4:21/km w/ 2 min jog"), so the same function serves the
 * plan grid, the CSV and the calendar feed.
 *
 * Every line carries both the absolute pace band and the anchor it came from,
 * so a sheet printed three weeks ago is still usable after fitness moves on.
 */

import { formatPace } from '../paces';
import type { PaceResolver } from './resolve';
import type { Unit } from '../../types';
import type { MarathonCopy } from './copy.en';
import { METRES_PER_MILE } from './constants';
import type { Effort, PaceAnchor, Recovery, Segment } from './types';

export function anchorLabel(anchor: PaceAnchor, copy: MarathonCopy): string {
  switch (anchor.kind) {
    case 'subT':
      return copy[`anchor.subT.${anchor.column}`];
    case 'easy':
      return copy['anchor.easy'];
    case 'race':
      return copy['anchor.race'].replace('{distance}', anchor.distance);
    case 'mp':
      return anchor.pct === 100
        ? copy['anchor.mp']
        : copy['anchor.mp.pct'].replace('{pct}', String(anchor.pct));
    case 'effort':
      return copy[`anchor.effort.${anchor.label}`];
  }
}

function paceText(
  anchor: PaceAnchor,
  r: PaceResolver,
  unit: Unit,
  copy: MarathonCopy,
): string {
  const band = r.band(anchor);
  const label = anchorLabel(anchor, copy);
  if (!band) return label;
  const suffix = unit === 'km' ? '/km' : '/mi';
  const fast = formatPace(band.fastSecPerKm, unit);
  const slow = formatPace(band.slowSecPerKm, unit);
  const range = fast === slow ? fast : `${fast}-${slow}`;
  return `${range}${suffix} (${label})`;
}

function amount(e: Effort | Recovery, unit: Unit): string {
  if (e.distanceM !== undefined) {
    if (unit === 'mile') {
      const mi = e.distanceM / METRES_PER_MILE;
      return mi < 1 ? `${e.distanceM} m` : `${+mi.toFixed(2)} mi`;
    }
    return e.distanceM >= 1000
      ? `${+(e.distanceM / 1000).toFixed(2)} km`
      : `${e.distanceM} m`;
  }
  const sec = e.durationSec ?? 0;
  return sec >= 60 && sec % 60 === 0 ? `${sec / 60} min` : `${sec} s`;
}

function recoveryText(
  rec: Recovery,
  r: PaceResolver,
  unit: Unit,
  copy: MarathonCopy,
): string {
  const verb = copy[`rec.${rec.kind}`];
  if (rec.kind === 'float' && rec.anchor) {
    return `${amount(rec, unit)} ${verb} @ ${paceText(rec.anchor, r, unit, copy)}`;
  }
  return `${amount(rec, unit)} ${verb}`;
}

function steadyLabel(label: string | undefined, copy: MarathonCopy): string {
  if (label === 'warmup') return copy['seg.warmup'];
  if (label === 'cooldown') return copy['seg.cooldown'];
  if (label === 'lead_in') return copy['seg.leadIn'];
  return copy['anchor.easy'];
}

export function describeSegment(
  seg: Segment,
  r: PaceResolver,
  unit: Unit,
  copy: MarathonCopy,
): string {
  switch (seg.kind) {
    case 'steady': {
      const what = amount(seg, unit);
      if (seg.anchor.kind === 'easy') {
        return `${what} ${steadyLabel(seg.label, copy)}`;
      }
      return `${what} @ ${paceText(seg.anchor, r, unit, copy)}`;
    }
    case 'interval': {
      const sets = seg.sets ?? 1;
      const core =
        `${seg.count} x ${amount(seg.work, unit)} @ ` +
        `${paceText(seg.work.anchor, r, unit, copy)} w/ ` +
        `${recoveryText(seg.recovery, r, unit, copy)}`;
      const body = sets > 1 ? `${sets} x [${core}]` : core;
      const between =
        sets > 1 && seg.setRecovery
          ? `, ${recoveryText(seg.setRecovery, r, unit, copy)} between sets`
          : '';
      return `${body}${between}`;
    }
    case 'progression': {
      // An alternating session reads as one continuous run, not a list.
      if (seg.label === 'alternating' && seg.blocks.length > 1) {
        const totalMin = Math.round(
          seg.blocks.reduce((sum, b) => sum + (b.durationSec ?? 0), 0) / 60,
        );
        const [a, b] = seg.blocks;
        return (
          `${totalMin} min: ${amount(a, unit)} @ ` +
          `${paceText(a.anchor, r, unit, copy)} / ${amount(b, unit)} @ ` +
          `${paceText(b.anchor, r, unit, copy)}`
        );
      }
      return seg.blocks
        .map((b) => `${amount(b, unit)} @ ${paceText(b.anchor, r, unit, copy)}`)
        .join(' -> ');
    }
  }
}

export function describeSession(
  segments: Segment[],
  r: PaceResolver,
  unit: Unit,
  copy: MarathonCopy,
): string {
  return segments.map((s) => describeSegment(s, r, unit, copy)).join(' + ');
}
