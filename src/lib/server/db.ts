/**
 * SQLite access for orders and entitlements.
 *
 * The database is tiny and single-writer, so SQLite on a mounted volume is
 * the right shape: no extra service to run, and orders survive a redeploy.
 *
 * Migrations are inlined rather than kept as .sql files because the server is
 * bundled into dist/server, where loose files alongside the source would not
 * be present at runtime.
 */

import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { env } from './env';

const MIGRATIONS: string[] = [
  // 1
  `
  CREATE TABLE IF NOT EXISTS orders (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id     TEXT NOT NULL UNIQUE,
    stripe_payment_intent TEXT,
    email                 TEXT NOT NULL,
    buyer_name            TEXT,
    sku                   TEXT NOT NULL,
    tiers                 TEXT NOT NULL,
    plan_inputs           TEXT NOT NULL,
    access_token          TEXT NOT NULL UNIQUE,
    engine_version        TEXT NOT NULL,
    amount_total          INTEGER,
    currency              TEXT,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS orders_email ON orders (email);

  -- Webhook delivery is at-least-once, so the event id is the idempotency
  -- key and the unique constraint is what actually enforces it.
  CREATE TABLE IF NOT EXISTS webhook_events (
    id           TEXT PRIMARY KEY,
    type         TEXT NOT NULL,
    processed_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- A table rather than a column on orders: past weeks must keep the paces
  -- they were actually run at, which needs the history, and it gives the
  -- plan a progression chart for free.
  CREATE TABLE IF NOT EXISTS fitness_history (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id      INTEGER NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    vdot          REAL NOT NULL,
    five_k_seconds INTEGER NOT NULL,
    source        TEXT NOT NULL,
    set_at_week   INTEGER NOT NULL,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS fitness_order ON fitness_history (order_id);

  -- Hashed, not raw: enough to notice a token being passed around a club,
  -- not enough to be a log of where a buyer reads their plan.
  CREATE TABLE IF NOT EXISTS token_access (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    ip_hash  TEXT NOT NULL,
    ua_hash  TEXT NOT NULL,
    seen_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE UNIQUE INDEX IF NOT EXISTS token_access_unique
    ON token_access (order_id, ip_hash, ua_hash);
  `,
];

export type Db = DatabaseSync;

/**
 * The connection is kept on globalThis, not in a module-level variable.
 *
 * Vite's dev server re-instantiates modules on change, so a module-scoped
 * singleton is created once per instantiation: two DatabaseSync handles end
 * up open on the same file, and node:sqlite segfaults when the first one is
 * finalised while the second is in use. That crash takes the dev server down
 * mid-request, which is exactly what a Stripe webhook landing looks like.
 */
const DB_KEY = Symbol.for('norwegian-singles.db');
type Global = typeof globalThis & { [DB_KEY]?: Db };

export function databasePath(): string {
  if (process.env.DATABASE_PATH) return process.env.DATABASE_PATH;
  if (import.meta.env?.DATABASE_PATH) return import.meta.env.DATABASE_PATH;
  if (process.env.NODE_ENV === 'production') return '/app/data/app.db';
  return './data/app.db';
}

export function getDb(): Db {
  const store = globalThis as Global;
  const existing = store[DB_KEY];
  if (existing) return existing;

  const path = databasePath();
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });

  const db = new DatabaseSync(path);
  // WAL keeps a reader (someone opening their plan) from blocking on a
  // writer (a webhook landing).
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA busy_timeout = 5000;');

  migrate(db);
  store[DB_KEY] = db;
  return db;
}

/** Close and forget the connection. Only needed by tests and shutdown. */
export function closeDb(): void {
  const store = globalThis as Global;
  const db = store[DB_KEY];
  if (!db) return;
  try {
    db.close();
  } finally {
    delete store[DB_KEY];
  }
}

function migrate(db: Db): void {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER NOT NULL
  );`);
  const row = db.prepare('SELECT version FROM schema_version LIMIT 1').get() as
    | { version: number }
    | undefined;
  let current = row?.version ?? 0;
  if (!row) db.prepare('INSERT INTO schema_version (version) VALUES (0)').run();

  for (let i = current; i < MIGRATIONS.length; i++) {
    db.exec('BEGIN');
    try {
      db.exec(MIGRATIONS[i]);
      db.prepare('UPDATE schema_version SET version = ?').run(i + 1);
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    current = i + 1;
  }
}

/** Test helper: an isolated in-memory database with the schema applied. */
export function createTestDb(): Db {
  const db = new DatabaseSync(':memory:');
  db.exec('PRAGMA foreign_keys = ON;');
  migrate(db);
  return db;
}
