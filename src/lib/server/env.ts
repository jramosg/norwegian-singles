/**
 * Server-side environment access.
 *
 * Astro's dev server loads .env into `import.meta.env` and does not populate
 * `process.env`; the built Node server gets real process environment and does
 * not have build-time values for secrets. Reading only one of the two works
 * in exactly one of the two places, so read both, preferring the real process
 * environment at runtime.
 */

type EnvBag = Record<string, string | undefined>;

export function env(name: string): string | undefined {
  const fromProcess =
    typeof process !== 'undefined' ? process.env?.[name] : undefined;
  if (fromProcess) return fromProcess;
  const meta = import.meta.env as unknown as EnvBag;
  const fromMeta = meta?.[name];
  return fromMeta || undefined;
}

/** Same, but a missing value is a configuration error worth shouting about. */
export function requireEnv(name: string): string {
  const value = env(name);
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env for local work, or as a deploy secret.`,
    );
  }
  return value;
}
