import { defineMiddleware } from 'astro:middleware';

// Replaces the security headers and asset caching that nginx provided before
// the move to the Node SSR adapter.
const STATIC_ASSET =
  /\.(?:js|mjs|css|png|jpe?g|gif|ico|svg|webp|avif|woff2?|ttf|otf)$/;

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Long-lived caching for fingerprinted static assets only; never cache
  // SSR HTML or API responses (those set their own no-store headers).
  if (
    STATIC_ASSET.test(new URL(context.request.url).pathname) &&
    !response.headers.has('Cache-Control')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  return response;
});
