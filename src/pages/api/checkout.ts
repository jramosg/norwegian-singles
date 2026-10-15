import type { APIRoute } from 'astro';
import { createCheckoutSession } from '../../lib/server/stripe';
import type { StoredPlanInputs } from '../../lib/server/entitlements';
import { TIER_IDS } from '../../lib/marathon/tiers';
import { PLAN_LENGTHS } from '../../lib/marathon/phases';
import { getMarathonHubPath } from '../../lib/marathon/hub';
import { locales, useTranslations, type TranslationKey } from '../../i18n/ui';
import type { Locale } from '../../types';
import type { Sku } from '../../lib/marathon/pricing';
import { parseTime } from '../../lib/paces';

export const prerender = false;

const MIN_RACE_M = 800;
const MAX_RACE_M = 100_000;
const MIN_RACE_SEC = 100;
const MAX_RACE_SEC = 12 * 3600;

interface Body {
  sku?: string;
  locale?: string;
  tier?: string;
  lengthWeeks?: number;
  marathonDate?: string;
  unit?: string;
  goalFinishSec?: number;
  raceDistanceM?: number;
  raceTimeSec?: number;
}

function bad(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Validate every field rather than trusting the client. The plan inputs make
 * the round trip through Stripe metadata and come back as the basis for a
 * paid plan, so anything malformed has to be rejected here, at the only point
 * where a human is still watching.
 */
function parse(
  body: Body,
):
  | { ok: true; sku: Sku; locale: Locale; inputs: StoredPlanInputs }
  | { ok: false; error: TranslationKey } {
  const sku = body.sku;
  if (
    !sku ||
    (sku !== 'bundle' && !TIER_IDS.includes(sku as (typeof TIER_IDS)[number]))
  ) {
    return { ok: false, error: 'checkout.unknownPlan' };
  }

  const locale = body.locale;
  if (!locale || !locales.includes(locale as Locale)) {
    return { ok: false, error: 'checkout.unknownLocale' };
  }

  const tier = body.tier;
  if (!tier || !TIER_IDS.includes(tier as (typeof TIER_IDS)[number])) {
    return { ok: false, error: 'checkout.pickTier' };
  }
  // Buying one tier must not hand over a different one.
  if (sku !== 'bundle' && sku !== tier) {
    return { ok: false, error: 'checkout.wrongTier' };
  }

  const lengthWeeks = Number(body.lengthWeeks);
  if (!PLAN_LENGTHS.includes(lengthWeeks as (typeof PLAN_LENGTHS)[number])) {
    return { ok: false, error: 'checkout.pickLength' };
  }

  const unit = body.unit === 'mile' ? 'mile' : 'km';

  const raceDistanceM = Number(body.raceDistanceM);
  if (
    !Number.isFinite(raceDistanceM) ||
    raceDistanceM < MIN_RACE_M ||
    raceDistanceM > MAX_RACE_M
  ) {
    return { ok: false, error: 'checkout.raceDistance' };
  }

  const raceTimeSec = Number(body.raceTimeSec);
  if (
    !Number.isFinite(raceTimeSec) ||
    raceTimeSec < MIN_RACE_SEC ||
    raceTimeSec > MAX_RACE_SEC
  ) {
    return { ok: false, error: 'checkout.raceTime' };
  }

  let marathonDate: string | undefined;
  if (body.marathonDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.marathonDate)) {
      return { ok: false, error: 'checkout.dateFormat' };
    }
    const date = new Date(`${body.marathonDate}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) {
      return { ok: false, error: 'checkout.invalidDate' };
    }
    marathonDate = body.marathonDate;
  }

  const goalFinishSec = Number(body.goalFinishSec);

  return {
    ok: true,
    sku: sku as Sku,
    locale: locale as Locale,
    inputs: {
      tier: tier as StoredPlanInputs['tier'],
      lengthWeeks,
      marathonDate,
      unit,
      goalFinishSec:
        Number.isFinite(goalFinishSec) && goalFinishSec > 0
          ? goalFinishSec
          : undefined,
      raceDistanceM,
      raceTimeSec,
    },
  };
}

/**
 * Accepts JSON or a plain form post, so the purchase form works without
 * JavaScript: the form submits, we create the session, and the browser is
 * redirected straight to Stripe.
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
      return typeof value === 'string' && value !== '' ? value : undefined;
    };
    // The form collects a human time string; the API takes seconds.
    const raceTimeSec = get('raceTime')
      ? (parseTime(get('raceTime') as string) ?? undefined)
      : Number(get('raceTimeSec'));
    const goal = get('goalTime')
      ? (parseTime(get('goalTime') as string) ?? undefined)
      : undefined;
    return {
      isForm: true,
      body: {
        sku: get('sku'),
        locale: get('locale'),
        tier: get('tier'),
        lengthWeeks: Number(get('lengthWeeks')),
        marathonDate: get('marathonDate'),
        unit: get('unit'),
        goalFinishSec: goal,
        raceDistanceM: Number(get('raceDistanceM')),
        raceTimeSec,
      },
    };
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const read = await readBody(request);
  if (!read) return bad(useTranslations('en')('request.unsupported'));
  const { body, isForm } = read;
  const locale = locales.includes(body.locale as Locale)
    ? (body.locale as Locale)
    : 'en';
  const t = useTranslations(locale);

  const parsed = parse(body);
  if (!parsed.ok) return bad(t(parsed.error));

  const hub = getMarathonHubPath(parsed.locale) ?? `/${parsed.locale}/`;

  try {
    const session = await createCheckoutSession({
      sku: parsed.sku,
      locale: parsed.locale,
      planInputs: parsed.inputs,
      successPath: `/${parsed.locale}/marathon/success`,
      cancelPath: hub,
    });
    if (!session.url) throw new Error('Stripe returned no checkout URL.');
    if (isForm) {
      return new Response(null, {
        status: 303,
        headers: { Location: session.url, 'Cache-Control': 'no-store' },
      });
    }
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[checkout] failed to create a session', error);
    return new Response(JSON.stringify({ error: t('checkout.failed') }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
