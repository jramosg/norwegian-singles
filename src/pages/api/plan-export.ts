import type { APIRoute } from 'astro';
import { getDb } from '../../lib/server/db';
import { findOrderByToken } from '../../lib/server/entitlements';
import { planForOrder } from '../../lib/server/plan';
import { createResolver } from '../../lib/marathon/resolve';
import { describeSession } from '../../lib/marathon/describe';
import { getMarathonCopy } from '../../lib/marathon/copy';
import { KM_PER_MILE } from '../../lib/marathon/constants';
import type { Locale } from '../../types';
import type { MarathonCopy } from '../../lib/marathon/copy.en';
import type { PlannedDay } from '../../lib/marathon/types';

export const prerender = false;

/**
 * CSV and calendar exports.
 *
 * Both are generated from the current fitness estimate rather than stored, so
 * a re-export after a check-in carries the new paces. The calendar is a URL
 * rather than a file, which means a subscribed calendar updates itself.
 */

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function foldIcs(line: string): string {
  // RFC 5545 caps a content line at 75 octets; continuations start with a
  // space. Calendar clients are strict about this.
  const chunks: string[] = [];
  let rest = line;
  chunks.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length > 0) {
    chunks.push(` ${rest.slice(0, 73)}`);
    rest = rest.slice(73);
  }
  return chunks.join('\r\n');
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export const GET: APIRoute = ({ url, request }) => {
  const token = url.searchParams.get('token') ?? '';
  const format = url.searchParams.get('format') === 'ics' ? 'ics' : 'csv';
  const unit = url.searchParams.get('unit') === 'mile' ? 'mile' : 'km';

  const db = getDb();
  const order = findOrderByToken(token, db);
  if (!order) return new Response('Not found', { status: 404 });

  const localeMatch = request.headers
    .get('referer')
    ?.match(/\/([a-z]{2})\/marathon\/p\//);
  const locale = (localeMatch?.[1] ?? 'en') as Locale;
  const copy: MarathonCopy = getMarathonCopy(locale);

  const { plan, fitness } = planForOrder(order, db);
  const resolver = createResolver(fitness, plan.mp);

  const detail = (day: PlannedDay): string =>
    day.segments
      ? describeSession(day.segments, resolver, unit, copy)
      : day.kind === 'rest'
        ? copy['day.rest']
        : `${
            unit === 'km'
              ? `${Math.round(day.targetDistanceM / 1000)} km`
              : `${(day.targetDistanceM / 1000 / KM_PER_MILE).toFixed(1)} mi`
          } ${copy['anchor.easy']}`;

  const stamp = `VDOT ${fitness.vdot.toFixed(1)}`;

  if (format === 'csv') {
    const rows = [
      ['week', 'phase', 'date', 'day', 'kind', 'session', 'notes'].join(','),
    ];
    for (const week of plan.weeks) {
      for (const day of week.days) {
        rows.push(
          [
            String(week.weekNumber),
            escapeCsv(copy[`week.label.${week.phase}`]),
            escapeCsv(day.date ?? ''),
            String(day.dayIndex + 1),
            escapeCsv(copy[`day.${day.kind}`]),
            escapeCsv(detail(day)),
            escapeCsv(day.whyKey ? copy[day.whyKey as keyof MarathonCopy] : ''),
          ].join(','),
        );
      }
    }
    // The stamp goes in the file so a printed or shared copy says which
    // fitness estimate produced it.
    rows.push('');
    rows.push(escapeCsv(`${stamp} · ${order.email} · #${order.id}`));

    return new Response(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="marathon-plan-${order.id}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//norwegian-singles//marathon plan//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcs(`Marathon plan (${stamp})`)}`,
  ];

  for (const week of plan.weeks) {
    for (const day of week.days) {
      if (!day.date || day.kind === 'rest') continue;
      const date = day.date.replace(/-/g, '');
      lines.push('BEGIN:VEVENT');
      lines.push(
        `UID:${order.id}-${week.weekNumber}-${day.dayIndex}@norwegian-singles.app`,
      );
      lines.push(`DTSTAMP:${date}T000000Z`);
      lines.push(`DTSTART;VALUE=DATE:${date}`);
      lines.push(
        foldIcs(
          `SUMMARY:${escapeIcs(`${copy[`day.${day.kind}`]}: ${detail(day)}`)}`,
        ),
      );
      if (day.whyKey) {
        lines.push(
          foldIcs(
            `DESCRIPTION:${escapeIcs(copy[day.whyKey as keyof MarathonCopy])}`,
          ),
        );
      }
      lines.push('END:VEVENT');
    }
  }
  lines.push('END:VCALENDAR');

  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="marathon-plan-${order.id}.ics"`,
      'Cache-Control': 'no-store',
    },
  });
};
