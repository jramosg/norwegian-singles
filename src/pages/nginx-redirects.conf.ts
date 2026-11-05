import type { APIRoute } from 'astro';
import { getSeoRedirects } from '../lib/seo-pages';

/**
 * nginx rules for retired duplicate pages. The Docker build moves this
 * file out of the web root into nginx's config (see Dockerfile).
 */
export const GET: APIRoute = () => {
  const rules = getSeoRedirects().flatMap(({ from, to }) => [
    `location = ${from} { return 301 ${to}; }`,
    `location = ${from.replace(/\/$/, '')} { return 301 ${to}; }`,
  ]);
  return new Response(`${rules.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
