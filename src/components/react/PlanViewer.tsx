/**
 * Plan Viewer Component (React Island)
 *
 * Displays the training plan with interactive features
 */

import React, { useState, useEffect } from 'react';
import type { TrainingBlock, Locale } from '../../types';
import { getUserData } from '../../lib/storage';
import { getFormattedPaces } from '../../lib/paces';
import { formatPace } from '../../lib/vdot';

interface Props {
  locale: Locale;
  translations: {
    title: string;
    week: string;
    block: string;
    testWeek: string;
    paces: string;
    intervals: string;
    threshold: string;
    easy: string;
    unit: string;
    intervalsShort: string;
    intervalsMedium: string;
    intervalsLong: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    sessionEasy: string;
    sessionThreshold: string;
    sessionLong: string;
    sessionTest: string;
    sessionRest: string;
    sessionRace: string;
    noData: string;
    createPlan: string;
  };
}

const DAY_KEYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export default function PlanViewer({ locale, translations }: Props) {
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getUserData();
    if (data?.currentBlock) {
      setBlock(data.currentBlock);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="plan-loading">
        <div className="skeleton" style={{ height: 200 }} />
      </div>
    );
  }

  if (!block) {
    return (
      <div className="plan-empty">
        <div className="empty-icon">📋</div>
        <h3>{translations.noData}</h3>
        <a href={`/${locale}`} className="btn btn-primary">
          {translations.createPlan}
        </a>

        <style>{`
          .plan-empty {
            text-align: center;
            padding: var(--space-16) var(--space-4);
          }
          
          .empty-icon {
            font-size: 4rem;
            margin-bottom: var(--space-4);
          }
          
          .plan-empty h3 {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-6);
          }
        `}</style>
      </div>
    );
  }

  const formattedPaces = getFormattedPaces(block.paces);
  const currentWeek = block.weeks[selectedWeek - 1];

  const getDayTranslation = (index: number): string => {
    const key = DAY_KEYS[index];
    return translations[key as keyof typeof translations] || key;
  };

  const getSessionTypeTranslation = (type: string): string => {
    const key = `session${
      type.charAt(0).toUpperCase() + type.slice(1)
    }` as keyof typeof translations;
    return translations[key] || type;
  };

  return (
    <div className="plan-viewer">
      {/* Paces Overview */}
      <section className="paces-section">
        <h2>{translations.paces}</h2>
        <div className="paces-grid">
          <div className="pace-card pace-threshold">
            <span className="pace-label">{translations.threshold}</span>
            <span className="pace-value">{formattedPaces.threshold}</span>
            <span className="pace-unit">{translations.unit}</span>
          </div>
          <div className="pace-card pace-easy">
            <span className="pace-label">{translations.easy}</span>
            <span className="pace-value">{formattedPaces.easy}</span>
            <span className="pace-unit">{translations.unit}</span>
          </div>
        </div>

        <div className="vdot-badge">
          VDOT: <strong>{block.vdot.toFixed(1)}</strong>
        </div>
      </section>

      {/* Intervals Table */}
      <section className="intervals-section">
        <h2>{translations.intervals}</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Estructura</th>
                <th>Ritmo</th>
                <th>Rec.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{translations.intervalsShort}</td>
                <td className="mono">8–12 × 3–4'</td>
                <td className="mono">{formattedPaces.intervals.short}</td>
                <td className="mono">60s</td>
              </tr>
              <tr>
                <td>{translations.intervalsMedium}</td>
                <td className="mono">4–6 × 6–8'</td>
                <td className="mono">{formattedPaces.intervals.medium}</td>
                <td className="mono">60s</td>
              </tr>
              <tr>
                <td>{translations.intervalsLong}</td>
                <td className="mono">3 × 10–12'</td>
                <td className="mono">{formattedPaces.intervals.long}</td>
                <td className="mono">60s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Week Selector */}
      <section className="week-section">
        <div className="week-header">
          <h2>
            {translations.week} {selectedWeek}
          </h2>
          {currentWeek.isTestWeek && (
            <span className="badge badge-test">{translations.testWeek}</span>
          )}
        </div>

        <div className="week-tabs">
          {block.weeks.map((week, i) => (
            <button
              key={i}
              className={`week-tab ${
                selectedWeek === i + 1 ? 'is-active' : ''
              } ${week.isTestWeek ? 'is-test' : ''}`}
              onClick={() => setSelectedWeek(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Sessions Grid */}
        <div className="sessions-grid">
          {currentWeek.sessions.map((session, index) => (
            <div
              key={index}
              className={`session-card session-card--${session.type}`}
            >
              <div className="session-day">{getDayTranslation(index)}</div>
              <div className="session-type">
                <span className={`badge badge-${session.type}`}>
                  {getSessionTypeTranslation(session.type)}
                </span>
              </div>
              <div className="session-title">{session.title}</div>
              <div className="session-desc">{session.description}</div>
              {session.paces && (
                <div className="session-pace">
                  {formatPace(session.paces.target)}/km
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .plan-viewer {
          max-width: var(--containr-max);
          margin: 0 auto;
        }
        
        .paces-section,
        .intervals-section,
        .week-section {
          margin-bottom: var(--space-10);
        }
        
        .paces-section h2,
        .intervals-section h2,
        .week-header h2 {
          margin-bottom: var(--space-4);
        }
        
        .paces-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }
        
        .pace-card {
          padding: var(--space-6);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          text-align: center;
        }
        
        .pace-card.pace-threshold {
          border-color: var(--color-threshold);
        }
        
        .pace-card.pace-easy {
          border-color: var(--color-easy);
        }
        
        .pace-label {
          display: block;
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }
        
        .pace-value {
          display: block;
          font-family: var(--font-mono);
          font-size: var(--text-4xl);
          font-weight: var(--font-bold);
          color: var(--color-text-primary);
        }
        
        .pace-unit {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .vdot-badge {
          display: inline-block;
          padding: var(--space-2) var(--space-4);
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .vdot-badge strong {
          color: var(--color-text-primary);
        }
        
        .table {
          width: 100%;
        }
        
        .mono {
          font-family: var(--font-mono);
        }
        
        .week-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        
        .week-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          overflow-x: auto;
          padding-bottom: var(--space-2);
        }
        
        .week-tab {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
          flex-shrink: 0;
        }
        
        .week-tab:hover {
          border-color: var(--color-border-accent);
          color: var(--color-text-primary);
        }
        
        .week-tab.is-active {
          border-color: var(--color-accent-primary);
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-text-primary);
        }
        
        .week-tab.is-test {
          border-color: var(--color-test);
        }
        
        .week-tab.is-test.is-active {
          background: rgba(236, 72, 153, 0.1);
        }
        
        .sessions-grid {
          display: grid;
          gap: var(--space-3);
        }
        
        @media (min-width: 640px) {
          .sessions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .sessions-grid {
            grid-template-columns: repeat(7, 1fr);
          }
        }
        
        .session-card {
          padding: var(--space-4);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
        }
        
        .session-card:hover {
          border-color: var(--color-border-accent);
        }
        
        .session-day {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--space-2);
        }
        
        .session-type {
          margin-bottom: var(--space-2);
        }
        
        .session-title {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-primary);
          margin-bottom: var(--space-1);
        }
        
        .session-desc {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }
        
        .session-pace {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-accent-primary);
        }
      `}</style>
    </div>
  );
}
