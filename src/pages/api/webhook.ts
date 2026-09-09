/**
 * Alias for the Stripe webhook.
 *
 * `stripe listen --forward-to localhost:4321/webhook` is the path most people
 * have in their shell history, so /webhook and /api/webhook both resolve here
 * rather than 404ing during a test purchase. One implementation, three paths:
 * two copies of signature verification would drift, and the copy that drifted
 * would be the one taking money.
 */
export const prerender = false;

export { POST } from './stripe-webhook';
