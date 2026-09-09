import type { APIRoute } from 'astro';
import { calculateTimeFromVDOT, calculateVDOT } from '../../lib/vdot';
import {
  applyCheckin,
  type CheckinResponses,
} from '../../lib/marathon/checkin';
import { getDb } from '../../lib/server/db';
import { findOrderByToken, recordFitness } from '../../lib/server/entitlements';
import { planForOrder, currentWeekNumber } from '../../lib/server/plan';

export const prerender = false;

/**
 * Record a new fitness estimate for a bought plan.
 *
 * Two ways in: a race or time-trial result, or a session check-in. Neither
 * requires a race, because most runners do not have one when the plan wants a
 * checkpoint. Either way the estimate lands on the order, not in the browser,
 * so it follows the runner between devices.
 */
interface Body {
  token?: string;
  /** 'race' | 'time_trial' feed a result; 'checkin' feeds answers. */
  mode?: 'result' | 'checkin' | 'manual';
  raceDistanceM?: number;
  raceTimeSec?: number;
  vdot?: number;
  responses?: CheckinResponses;
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

const MIN_VDOT = 20;
const MAX_VDOT = 85;

/**
 * Accepts JSON or a plain form post. The form path exists so the check-in
 * works with JavaScript disabled: a training plan is a document, and it
 * should not need a bundle to be usable.
 */
async function readBody(
  request: Request,
): Promise<{ body: Body; isForm: boolean } | null> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    try {
      return { body: (await request.json()) as Body, isForm: false };
    } catch {
      return null;
    }
  }
  if (
    type.includes('application/x-www-form-urlencoded') ||
    type.includes('multipart/form-data')
  ) {
    const form = await request.formData();
    const get = (key: string) => {
      const value = form.get(key);
      return typeof value === 'string' ? value : undefined;
    };
    const responses =
      get('reserve') && get('lastRep') && get('effort')
        ? ({
            reserve: get('reserve'),
            lastRep: get('lastRep'),
            effort: get('effort'),
          } as CheckinResponses)
        : undefined;
    return {
      isForm: true,
      body: {
        token: get('token'),
        mode: (get('mode') as Body['mode']) ?? 'checkin',
        raceDistanceM: Number(get('raceDistanceM')),
        raceTimeSec: Number(get('raceTimeSec')),
        vdot: Number(get('vdot')),
        responses,
      },
    };
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const read = await readBody(request);
  if (!read) return json({ error: 'Unsupported body.' }, 400);
  const { body, isForm } = read;

  const db = getDb();
  const order = body.token ? findOrderByToken(body.token, db) : null;
  if (!order) return json({ error: 'Unknown plan link.' }, 404);

  const { plan, fitness } = planForOrder(order, db);
  const setAtWeek = currentWeekNumber(plan) ?? 1;

  let nextVdot: number;
  let source: 'race' | 'time_trial' | 'checkin' | 'manual';

  if (body.mode === 'checkin') {
    if (!body.responses) return json({ error: 'Answer the check-in.' }, 400);
    const outcome = applyCheckin(fitness.vdot, body.responses);
    nextVdot = outcome.nextVdot;
    source = 'checkin';
  } else if (body.mode === 'manual') {
    nextVdot = Number(body.vdot);
    source = 'manual';
  } else {
    const distance = Number(body.raceDistanceM);
    const time = Number(body.raceTimeSec);
    if (
      !Number.isFinite(distance) ||
      distance < 800 ||
      distance > 100_000 ||
      !Number.isFinite(time) ||
      time < 100 ||
      time > 12 * 3600
    ) {
      return json({ error: 'Enter a distance and a time.' }, 400);
    }
    nextVdot = calculateVDOT(distance, time);
    source = 'race';
  }

  if (
    !Number.isFinite(nextVdot) ||
    nextVdot < MIN_VDOT ||
    nextVdot > MAX_VDOT
  ) {
    return json({ error: 'That fitness estimate is out of range.' }, 400);
  }

  recordFitness(
    order.id,
    {
      vdot: nextVdot,
      fiveKSeconds: calculateTimeFromVDOT(nextVdot, 5000),
      source,
      // Weeks already run keep the paces they were run at; only the weeks
      // from here on are re-priced.
      setAtWeek,
    },
    db,
  );

  if (isForm) {
    // Redirect back to the plan so a no-JavaScript submit lands somewhere
    // sensible rather than on a page of JSON.
    return new Response(null, {
      status: 303,
      headers: {
        Location: `${new URL(request.url).origin}${planPath(request, order.accessToken)}#fitness`,
        'Cache-Control': 'no-store',
      },
    });
  }

  return json({
    previousVdot: fitness.vdot,
    vdot: nextVdot,
    setAtWeek,
    unchanged: nextVdot === fitness.vdot,
  });
};

/** Rebuild the plan URL from the referring page so the locale is kept. */
function planPath(request: Request, token: string): string {
  const referer = request.headers.get('referer');
  const locale = referer?.match(/\/([a-z]{2})\/marathon\/p\//)?.[1] ?? 'en';
  return `/${locale}/marathon/p/${token}`;
}
