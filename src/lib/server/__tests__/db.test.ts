import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb, type Db } from '../db';

let db: Db;

beforeEach(() => {
  db = createTestDb();
});

describe('schema', () => {
  it('creates every table the app needs', () => {
    const names = (
      db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
        .all() as { name: string }[]
    ).map((r) => r.name);
    for (const table of [
      'orders',
      'webhook_events',
      'fitness_history',
      'token_access',
      'schema_version',
    ]) {
      expect(names).toContain(table);
    }
  });

  it('is idempotent, so booting twice is safe', () => {
    const version = () =>
      (
        db.prepare('SELECT version FROM schema_version').get() as {
          version: number;
        }
      ).version;
    const first = version();
    const second = createTestDb();
    expect(
      (
        second.prepare('SELECT version FROM schema_version').get() as {
          version: number;
        }
      ).version,
    ).toBe(first);
  });
});

describe('webhook idempotency', () => {
  it('claims an event exactly once', () => {
    const claim = (id: string) =>
      db
        .prepare(
          'INSERT OR IGNORE INTO webhook_events (id, type) VALUES (?, ?)',
        )
        .run(id, 'checkout.session.completed').changes;

    // Stripe retries. The second delivery of the same event must be a no-op,
    // because the alternative is charging someone once and mailing them two
    // different plan links.
    expect(claim('evt_1')).toBe(1);
    expect(claim('evt_1')).toBe(0);
    expect(claim('evt_2')).toBe(1);
  });

  it('releases a claim so a failed event can be retried', () => {
    db.prepare(
      'INSERT OR IGNORE INTO webhook_events (id, type) VALUES (?, ?)',
    ).run('evt_3', 'checkout.session.completed');
    db.prepare('DELETE FROM webhook_events WHERE id = ?').run('evt_3');
    const again = db
      .prepare('INSERT OR IGNORE INTO webhook_events (id, type) VALUES (?, ?)')
      .run('evt_3', 'checkout.session.completed').changes;
    expect(again).toBe(1);
  });
});

describe('referential integrity', () => {
  it('will not orphan fitness history', () => {
    expect(() =>
      db
        .prepare(
          `INSERT INTO fitness_history (order_id, vdot, five_k_seconds, source, set_at_week)
           VALUES (9999, 50, 1200, 'checkin', 1)`,
        )
        .run(),
    ).toThrow();
  });
});
