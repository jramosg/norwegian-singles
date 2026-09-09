import type { APIRoute } from 'astro';

/**
 * Cookie-free click beacon for affiliate and support links.
 *
 * This used to be an nginx `return 204` with a custom access-log format.
 * The Node runtime that replaced nginx has to keep both halves: the 204 and
 * the log line, whose shape the documented workflow depends on:
 * `docker logs norwegian-singles 2>&1 | grep '^monetization '`.
 */
export const prerender = false;

/** Keep the field order identical to the old nginx `monetization` format. */
const FIELDS = ['type', 'placement', 'item', 'locale', 'path'] as const;

export const GET: APIRoute = ({ url }) => {
  const parts = FIELDS.map(
    (field) => `${field}=${url.searchParams.get(field) ?? '-'}`,
  );
  // eslint-disable-next-line no-console
  console.log(`monetization ${new Date().toISOString()} ${parts.join(' ')}`);

  return new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'no-store' },
  });
};

/** `navigator.sendBeacon` issues a POST, so accept both verbs. */
export const POST = GET;
