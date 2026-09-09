import type { APIRoute } from 'astro';
import { getDb } from '../../lib/server/db';
import { findOrdersByEmail } from '../../lib/server/entitlements';
import { sendPlanLink } from '../../lib/server/email';
import { siteUrl } from '../../lib/server/stripe';
import { getTierCopy } from '../../lib/marathon/tier-copy';
import type { Locale } from '../../types';

export const prerender = false;

/**
 * Re-send a plan link.
 *
 * The response is identical whether or not the address bought anything. This
 * endpoint must not be usable to find out who is a customer, and a plan link
 * only ever goes to the address that paid.
 */
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null);
  const email = String(form?.get('email') ?? '')
    .trim()
    .toLowerCase();
  const locale = (String(form?.get('locale') ?? 'en') || 'en') as Locale;

  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    const db = getDb();
    for (const order of findOrdersByEmail(email, db)) {
      const tier = getTierCopy(locale)[order.planInputs.tier];
      await sendPlanLink({
        to: order.email,
        locale,
        planUrl: `${siteUrl()}/${locale}/marathon/p/${order.accessToken}`,
        tierName: tier.name,
      });
    }
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: `/${locale}/marathon/recover?sent=1`,
      'Cache-Control': 'no-store',
    },
  });
};
