/**
 * PlanViewer — React island
 * Displays the weekly training plan, paces, and taper reference.
 */

import React, { useState, useEffect } from 'react';
import type { SavedPlan, Locale, TrainingPaces } from '../../types';
import { loadPlan } from '../../lib/storage';
import { formatPace } from '../../lib/paces';
import {
  DAYS_OF_WEEK,
  getPlanByHours,
  getNextPlan,
  PLAN_HOURS,
} from '../../lib/training-plans';
import type {
  DaySession,
  SubTSession,
  DoubleDaySession,
  PlanHours,
} from '../../lib/training-plans';
import {
  TAPER_10K,
  REVERSE_TAPER_10K,
  TAPER_HALF,
  REVERSE_TAPER_HALF,
} from '../../lib/tapering';
import {
  MARATHON_BUILD,
  getBuildStartDate,
  getWeekStartDate,
  getCurrentBuildWeek,
  getWeeksToMarathon,
} from '../../lib/marathon-build';
import type { MarathonBuildDay } from '../../lib/marathon-build';

interface Props {
  locale: Locale;
}

const DAY_LABELS: Record<string, { en: string; es: string }> = {
  monday: { en: 'Monday', es: 'Lunes' },
  tuesday: { en: 'Tuesday', es: 'Martes' },
  wednesday: { en: 'Wednesday', es: 'Miércoles' },
  thursday: { en: 'Thursday', es: 'Jueves' },
  friday: { en: 'Friday', es: 'Viernes' },
  saturday: { en: 'Saturday', es: 'Sábado' },
  sunday: { en: 'Sunday', es: 'Domingo' },
};

export default function PlanViewer({ locale }: Props) {
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [tab, setTab] = useState<'week' | 'paces' | 'taper' | 'marathon'>(
    'week',
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = loadPlan();
    if (saved) {
      setPlan(saved);
      setUnit(saved.input.unit);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="skeleton" style={{ height: 300 }} />;

  if (!plan) {
    return (
      <div className="pv-empty">
        <div className="pv-empty-icon">📋</div>
        <h3>
          {locale === 'es'
            ? 'Aún no tienes un plan'
            : "You don't have a plan yet"}
        </h3>
        <a href={`/${locale}`} className="btn btn-primary">
          {locale === 'es' ? 'Crear mi plan' : 'Create my plan'}
        </a>
        <style>{`.pv-empty{text-align:center;padding:var(--space-16) var(--space-4)}.pv-empty-icon{font-size:4rem;margin-bottom:var(--space-4)}.pv-empty h3{color:var(--color-text-secondary);margin-bottom:var(--space-6)}`}</style>
      </div>
    );
  }

  const { paces, input } = plan;
  const unitLabel = unit === 'km' ? 'min/km' : 'min/mi';
  const weekly = getPlanByHours(input.weeklyHours);
  const nextPlan = (() => {
    const tier = PLAN_HOURS.reduce((p, c) =>
      Math.abs(c - input.weeklyHours) < Math.abs(p - input.weeklyHours) ? c : p,
    );
    return getNextPlan(tier as PlanHours);
  })();

  const dayLabel = (day: string) => DAY_LABELS[day]?.[locale] ?? day;

  const paceForSession = (session: DaySession): string | null => {
    if (session.kind !== 'subT') return null;
    const s = session as SubTSession;
    const raw = paces[s.paceColumn];
    return formatPace(raw, unit);
  };

  const sessionColor = (session: DaySession) => {
    if (session.kind === 'rest') return 'var(--color-text-muted)';
    if (session.kind === 'easy' || session.kind === 'double')
      return 'var(--color-easy)';
    return 'var(--color-threshold)';
  };

  const sessionTitle = (session: DaySession): string => {
    if (session.kind === 'rest') return locale === 'es' ? 'Descanso' : 'Rest';
    if (session.kind === 'easy')
      return locale === 'es' ? 'Rodaje fácil' : 'Easy run';
    if (session.kind === 'double')
      return locale === 'es' ? 'Doble rodaje' : 'Double easy';
    const s = session as SubTSession;
    return `${s.reps} × ${s.repDurationMin} min`;
  };

  const sessionDesc = (session: DaySession): string => {
    if (session.kind === 'rest') return '';
    if (session.kind === 'easy') return `${session.durationMin} min`;
    if (session.kind === 'double') {
      const d = session as DoubleDaySession;
      return locale === 'es'
        ? `AM ${d.morning.durationMin} min · PM ${d.afternoon.durationMin} min`
        : `AM ${d.morning.durationMin} min · PM ${d.afternoon.durationMin} min`;
    }
    const s = session as SubTSession;
    const fmtSec = (sec: number) => {
      const m = Math.floor(sec / 60);
      const r = sec % 60;
      if (r === 0) return `${m}:00`;
      return `${m}:${r.toString().padStart(2, '0')}`;
    };
    const rec = s.recoverySecondsMax
      ? `${fmtSec(s.recoverySeconds)}–${fmtSec(s.recoverySecondsMax)}`
      : fmtSec(s.recoverySeconds);
    const note = s.intensityNote ? ` — ${s.intensityNote}` : '';
    const wucd = locale === 'es' ? 'cal.+vuelta a calma incl.' : 'WU+CD incl.';
    const recLabel = locale === 'es' ? 'recup.' : 'recovery';
    return `${s.totalDurationMin} min total (${wucd}) · ${rec} ${recLabel}${note}`;
  };

  const hasMarathon = Boolean(input.marathonDate);

  const tabs = [
    { id: 'week' as const, label: locale === 'es' ? 'Semana' : 'Week' },
    { id: 'paces' as const, label: locale === 'es' ? 'Paces' : 'Paces' },
    { id: 'taper' as const, label: locale === 'es' ? 'Tapering' : 'Tapering' },
    ...(hasMarathon
      ? [
          {
            id: 'marathon' as const,
            label: locale === 'es' ? 'Maratón' : 'Marathon',
          },
        ]
      : []),
  ];

  return (
    <div className="pv">
      {/* Header */}
      <div className="pv-header">
        <div>
          <h2 className="pv-plan-name">{weekly.label}</h2>
          <p className="pv-5k">
            5K:{' '}
            <span className="pv-5k-val">{formatTime(paces.fiveKSeconds)}</span>
          </p>
        </div>
        <div className="pv-unit-toggle">
          {(['km', 'mile'] as const).map((u) => (
            <button
              key={u}
              className={`pv-unit-btn ${unit === u ? 'is-active' : ''}`}
              onClick={() => setUnit(u)}
            >
              {u === 'km' ? 'KM' : 'MI'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="pv-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`pv-tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Week */}
      {tab === 'week' && (
        <div className="pv-week">
          {DAYS_OF_WEEK.map((day, i) => {
            const session = weekly.days[i];
            const pace = paceForSession(session);
            return (
              <div key={day} className={`pv-day pv-day--${session.kind}`}>
                <div className="pv-day-name">{dayLabel(day)}</div>
                <div className="pv-day-content">
                  <span
                    className="pv-day-title"
                    style={{ color: sessionColor(session) }}
                  >
                    {sessionTitle(session)}
                  </span>
                  {sessionDesc(session) && (
                    <span className="pv-day-desc">{sessionDesc(session)}</span>
                  )}
                  {pace && (
                    <span className="pv-day-pace">
                      {pace}{' '}
                      <span className="pv-day-pace-unit">{unitLabel}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {nextPlan && (
            <div className="pv-next">
              <span className="pv-next-label">
                {locale === 'es' ? '→ Siguiente nivel:' : '→ Next level:'}
              </span>{' '}
              <span className="pv-next-val">{nextPlan.label}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab: Paces */}
      {tab === 'paces' && (
        <div className="pv-paces">
          <PaceCard
            label={
              locale === 'es'
                ? 'Intervalos 3 min (Sub-T corto)'
                : '3-min reps (short Sub-T)'
            }
            pace={formatPace(paces.rep3min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={
              locale === 'es' ? 'Ritmo ~15 km de carrera' : '~15 km race pace'
            }
          />
          <PaceCard
            label={
              locale === 'es'
                ? 'Intervalos 6 min (Sub-T medio)'
                : '6-min reps (medium Sub-T)'
            }
            pace={formatPace(paces.rep6min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={
              locale === 'es' ? 'Ritmo ~30 km de carrera' : '~30 km race pace'
            }
          />
          <PaceCard
            label={
              locale === 'es'
                ? 'Intervalos 10 min (Sub-T largo)'
                : '10-min reps (long Sub-T)'
            }
            pace={formatPace(paces.rep10min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={
              locale === 'es'
                ? 'Próximo a ritmo maratón'
                : 'Close to marathon race pace'
            }
          />
          <PaceCard
            label={
              locale === 'es' ? 'Ritmo Maratón (MP)' : 'Marathon Pace (MP)'
            }
            pace={formatPace(paces.marathonPace, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={
              locale === 'es'
                ? 'Usado en recuperación tapering ("@ MP reducido"). ~14% más lento que tu 5K.'
                : 'Used in taper/recovery sessions ("@ MP reduced intensity"). ~14% slower than 5K pace.'
            }
          />
          <PaceCard
            label={locale === 'es' ? 'Rodaje fácil' : 'Easy run'}
            pace={formatPace(paces.easy, unit)}
            unit={unitLabel}
            color="var(--color-easy)"
            note={
              locale === 'es'
                ? 'Cómodo, conversacional. Todos los días fáciles.'
                : 'Comfortable, conversational. All easy days.'
            }
          />
          <div className="pv-recovery-note">
            <span className="pv-recovery-icon">⏱</span>
            {locale === 'es'
              ? 'Recuperación entre intervalos: 60 s (excepto 10 min con 2 min). Mantiene el estado de lactato.'
              : 'Recovery between reps: 60 s (except 10-min reps: 2 min). Keeps lactate elevated.'}
          </div>
        </div>
      )}

      {/* Tab: Taper */}
      {tab === 'taper' && (
        <div className="pv-taper">
          <TaperTable
            plan={TAPER_10K}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={
              locale === 'es'
                ? 'Taper 10K (semana de carrera)'
                : 'Taper into 10K (race week)'
            }
          />
          <TaperTable
            plan={REVERSE_TAPER_10K}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={
              locale === 'es' ? 'Recuperación post 10K' : 'Recovery after 10K'
            }
          />
          <TaperTable
            plan={TAPER_HALF}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={
              locale === 'es'
                ? 'Taper Media Maratón (semana de carrera)'
                : 'Taper into Half Marathon (race week)'
            }
          />
          <TaperTable
            plan={REVERSE_TAPER_HALF}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={
              locale === 'es'
                ? 'Recuperación post Media Maratón'
                : 'Recovery after Half Marathon'
            }
          />
        </div>
      )}

      {/* Tab: Marathon Build */}
      {tab === 'marathon' && input.marathonDate && (
        <MarathonBuildTab
          marathonDate={input.marathonDate}
          paces={paces}
          unit={unit}
          unitLabel={unitLabel}
          locale={locale}
        />
      )}

      <style>{`
        .pv { max-width: 780px; margin: 0 auto; }
        .pv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-6);
        }
        .pv-plan-name { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .pv-5k { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
        .pv-5k-val { font-family: var(--font-mono); font-weight: var(--font-bold); color: var(--color-text-secondary); }
        .pv-unit-toggle {
          display: flex;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .pv-unit-btn {
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          color: var(--color-text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .pv-unit-btn.is-active { background: var(--color-accent-primary); color: #fff; }
        .pv-tabs {
          display: flex;
          gap: var(--space-1);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-6);
        }
        .pv-tab {
          padding: var(--space-2) var(--space-5);
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-bottom: -1px;
        }
        .pv-tab:hover { color: var(--color-text-primary); }
        .pv-tab.is-active { color: var(--color-text-primary); border-bottom-color: var(--color-accent-primary); }
        .pv-week { display: grid; gap: var(--space-3); }
        .pv-day {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          align-items: start;
        }
        .pv-day--rest { opacity: 0.5; }
        .pv-day-name {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding-top: 2px;
        }
        .pv-day-content { display: flex; flex-direction: column; gap: var(--space-1); }
        .pv-day-title { font-weight: var(--font-semibold); font-size: var(--text-base); }
        .pv-day-desc { font-size: var(--text-sm); color: var(--color-text-secondary); }
        .pv-day-pace { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: var(--font-bold); color: var(--color-text-primary); }
        .pv-day-pace-unit { font-weight: var(--font-normal); color: var(--color-text-muted); font-size: var(--text-xs); }
        .pv-next {
          margin-top: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background: rgba(239,68,68,0.06);
          border: 1px dashed rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
        }
        .pv-next-label { color: var(--color-text-muted); }
        .pv-next-val { font-weight: var(--font-semibold); color: var(--color-accent-primary); }
        .pv-paces { display: grid; gap: var(--space-4); }
        .pv-pace-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4) var(--space-5);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }
        .pv-pace-info { display: flex; flex-direction: column; gap: var(--space-1); }
        .pv-pace-name { font-weight: var(--font-semibold); color: var(--color-text-primary); }
        .pv-pace-note { font-size: var(--text-xs); color: var(--color-text-muted); }
        .pv-pace-right { text-align: right; }
        .pv-pace-val { font-family: var(--font-mono); font-size: var(--text-3xl); font-weight: var(--font-bold); }
        .pv-pace-unit-label { font-size: var(--text-xs); color: var(--color-text-muted); }
        .pv-recovery-note {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-bg-glass);
          border-left: 3px solid var(--color-accent-primary);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }
        .pv-recovery-icon { font-size: var(--text-base); flex-shrink: 0; }
        .pv-taper { display: grid; gap: var(--space-8); }
        .pv-taper-section {}
        .pv-taper-title { font-size: var(--text-lg); font-weight: var(--font-semibold); margin-bottom: var(--space-3); }
        .pv-taper-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
        .pv-taper-table td { padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--color-border); vertical-align: top; }
        .pv-taper-table td:first-child { font-weight: var(--font-semibold); color: var(--color-text-secondary); white-space: nowrap; width: 110px; }
        .pv-taper-table td:last-child { color: var(--color-text-primary); }
        .pv-taper-table tr:last-child td { border-bottom: none; }
        @media (max-width: 520px) {
          .pv-day { grid-template-columns: 1fr; gap: var(--space-1); }
          .pv-day-name { font-size: var(--text-xs); }
        }
      `}</style>
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function PaceCard({
  label,
  pace,
  unit,
  color,
  note,
}: {
  label: string;
  pace: string;
  unit: string;
  color: string;
  note: string;
}) {
  return (
    <div className="pv-pace-card">
      <div className="pv-pace-info">
        <span className="pv-pace-name">{label}</span>
        <span className="pv-pace-note">{note}</span>
      </div>
      <div className="pv-pace-right">
        <div className="pv-pace-val" style={{ color }}>
          {pace}
        </div>
        <div className="pv-pace-unit-label">{unit}</div>
      </div>
    </div>
  );
}

function getEasyMinutes(session: DaySession): number {
  if (session.kind === 'easy') return session.durationMin;
  if (session.kind === 'double')
    return session.morning.durationMin + session.afternoon.durationMin;
  if (session.kind === 'subT') return session.totalDurationMin;
  return 30; // rest day fallback
}

function TaperTable({
  plan,
  weekly,
  paces,
  unit,
  unitLabel,
  locale,
  title,
}: {
  plan: import('../../lib/tapering').TaperPlan;
  weekly: import('../../lib/training-plans').WeeklyPlan;
  paces: import('../../types').TrainingPaces;
  unit: 'km' | 'mile';
  unitLabel: string;
  locale: Locale;
  title: string;
}) {
  const mpLabel = `${formatPace(paces.marathonPace, unit)} ${unitLabel}`;

  const descFor = (d: import('../../lib/tapering').TaperDay): string => {
    const normalSession = weekly.days[d.dayIndex];
    const normalMin = getEasyMinutes(normalSession);

    switch (d.kind) {
      case 'easy_normal':
        return locale === 'es'
          ? `Rodaje fácil ${normalMin} min`
          : `Easy run ${normalMin} min`;
      case 'easy_shorter': {
        const computed = Math.round(normalMin * (d.factor ?? 1));
        return locale === 'es'
          ? `Rodaje fácil ${computed} min`
          : `Easy run ${computed} min`;
      }
      case 'subt_normal': {
        if (normalSession.kind === 'subT') {
          const s = normalSession as SubTSession;
          return locale === 'es'
            ? `${s.reps} × ${s.repDurationMin} min (entrenamiento normal)`
            : `${s.reps} × ${s.repDurationMin} min (normal workout)`;
        }
        return d.description;
      }
      case 'subt_modified':
        // Inject the actual MP pace into the description where it says "@ MP"
        return d.description.replace('@ MP', `@ MP (${mpLabel})`);
      case 'race':
        return locale === 'es' ? 'Carrera' : 'Race';
      default:
        return d.description;
    }
  };

  return (
    <div className="pv-taper-section">
      <h3 className="pv-taper-title">{title}</h3>
      <table className="pv-taper-table">
        <tbody>
          {plan.days.map((d) => (
            <tr key={d.day}>
              <td>{d.day}</td>
              <td>{descFor(d)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MarathonBuildTab
// ---------------------------------------------------------------------------

const MB_DAY_ABBR = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MB_DAY_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function mbSessionColor(day: MarathonBuildDay): string {
  if (day.kind === 'rest') return 'var(--color-text-muted)';
  if (day.kind === 'easy') return 'var(--color-easy)';
  if (day.kind === 'race') return 'var(--color-accent-primary)';
  return 'var(--color-threshold)';
}

function mbSessionLabel(day: MarathonBuildDay): string {
  if (day.kind === 'rest') return 'Rest';
  if (day.kind === 'easy') return `${day.durationMin}E`;
  if (day.kind === 'race') return day.raceName;
  if (day.kind === 'subT') {
    if (day.reps === 1) return `${day.distanceM / 1000}K S`;
    return `${day.reps}×${day.distanceM >= 1000 ? `${day.distanceM / 1000}K` : `${day.distanceM}m`}`;
  }
  if (day.kind === 'marathon_specific') {
    if (day.reps === 1) return `${day.distanceM / 1000}K*`;
    return `${day.reps}×${day.distanceM >= 1000 ? `${day.distanceM / 1000}K*` : `${day.distanceM}m*`}`;
  }
  return '—';
}

function mbSessionDetail(
  day: MarathonBuildDay,
  paces: TrainingPaces,
  unit: 'km' | 'mile',
  unitLabel: string,
): React.ReactNode {
  if (day.kind === 'rest')
    return <span style={{ color: 'var(--color-text-muted)' }}>—</span>;

  if (day.kind === 'easy') {
    return (
      <>
        <div className="mb-day-main" style={{ color: 'var(--color-easy)' }}>
          {day.durationMin} min easy
        </div>
        <div className="mb-day-pace">
          {formatPace(paces.easy, unit)}{' '}
          <span className="mb-day-unit">{unitLabel}</span>
        </div>
      </>
    );
  }

  if (day.kind === 'race') {
    return <div className="mb-day-main mb-day-race">{day.raceName}</div>;
  }

  if (day.kind === 'subT') {
    const pace = formatPace(paces[day.paceColumn], unit);
    const repLabel =
      day.reps === 1
        ? `${day.distanceM >= 1000 ? `${day.distanceM / 1000} km` : `${day.distanceM} m`}`
        : `${day.reps} × ${day.distanceM >= 1000 ? `${day.distanceM / 1000} km` : `${day.distanceM} m`}`;
    return (
      <>
        <div
          className="mb-day-main"
          style={{ color: 'var(--color-threshold)' }}
        >
          {repLabel}
        </div>
        <div className="mb-day-pace">
          {pace} <span className="mb-day-unit">{unitLabel}</span>
        </div>
        <div className="mb-day-meta">{day.totalDurationMin} min total</div>
      </>
    );
  }

  if (day.kind === 'marathon_specific') {
    const pace = formatPace(paces.marathonPace, unit);
    const repLabel =
      day.reps === 1
        ? `${day.distanceM >= 1000 ? `${day.distanceM / 1000} km` : `${day.distanceM} m`} @ MP`
        : `${day.reps} × ${day.distanceM >= 1000 ? `${day.distanceM / 1000} km` : `${day.distanceM} m`} @ MP`;
    return (
      <>
        <div className="mb-day-main mb-day-mp">{repLabel}</div>
        <div className="mb-day-pace">
          {pace} <span className="mb-day-unit">{unitLabel}</span>
        </div>
        {day.paceNote && <div className="mb-day-meta">{day.paceNote}</div>}
        <div className="mb-day-meta">{day.totalDurationMin} min total</div>
      </>
    );
  }

  return null;
}

function MarathonBuildTab({
  marathonDate,
  paces,
  unit,
  unitLabel,
  locale,
}: {
  marathonDate: string;
  paces: TrainingPaces;
  unit: 'km' | 'mile';
  unitLabel: string;
  locale: Locale;
}) {
  const currentWeek = getCurrentBuildWeek(marathonDate);
  const weeksLeft = getWeeksToMarathon(marathonDate);
  const startDate = getBuildStartDate(marathonDate);
  const marathonDateObj = new Date(marathonDate);
  marathonDateObj.setHours(0, 0, 0, 0);

  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek);

  const fmt = (d: Date) =>
    d.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
      day: 'numeric',
      month: 'short',
    });

  const notStarted = currentWeek === null && new Date() < startDate;
  const isFinished = currentWeek === null && new Date() >= startDate;

  return (
    <div className="mb-root">
      {/* Header */}
      <div className="mb-header">
        <div>
          <div className="mb-header-title">
            {locale === 'es' ? 'Preparación Maratón' : 'Marathon Build'}
          </div>
          <div className="mb-header-date">
            {marathonDateObj.toLocaleDateString(
              locale === 'es' ? 'es-ES' : 'en-GB',
              {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            )}
          </div>
        </div>
        <div className="mb-header-badge">
          {notStarted ? (
            <>
              <span className="mb-badge-num">{weeksLeft}</span>
              <span className="mb-badge-label">
                {locale === 'es' ? 'sem.' : 'wks'}
              </span>
            </>
          ) : isFinished ? (
            <span className="mb-badge-done">✓</span>
          ) : (
            <>
              <span className="mb-badge-num">{currentWeek}</span>
              <span className="mb-badge-label">/ 15</span>
            </>
          )}
        </div>
      </div>

      {notStarted && (
        <div className="mb-notice">
          {locale === 'es'
            ? `La preparación empieza el ${fmt(startDate)}.`
            : `Build starts ${fmt(startDate)}.`}
        </div>
      )}

      {/* Week list */}
      <div className="mb-weeks">
        {MARATHON_BUILD.map((week) => {
          const weekStart = getWeekStartDate(marathonDate, week.weekNumber);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          const isCurrent = week.weekNumber === currentWeek;
          const isPast =
            currentWeek !== null ? week.weekNumber < currentWeek : !notStarted;
          const isOpen = expandedWeek === week.weekNumber;

          return (
            <div
              key={week.weekNumber}
              className={`mb-week ${isCurrent ? 'mb-week--current' : ''} ${isPast ? 'mb-week--past' : ''}`}
            >
              {/* Week header (always visible, clickable) */}
              <button
                className="mb-week-header"
                onClick={() => setExpandedWeek(isOpen ? null : week.weekNumber)}
                aria-expanded={isOpen}
              >
                <div className="mb-week-meta">
                  <span className="mb-week-num">
                    {locale === 'es'
                      ? `Semana ${week.weekNumber}`
                      : `Week ${week.weekNumber}`}
                  </span>
                  <span className="mb-week-label">{week.label}</span>
                </div>
                <div className="mb-week-right">
                  <span className="mb-week-dates">
                    {fmt(weekStart)} – {fmt(weekEnd)}
                  </span>
                  <span className="mb-week-chevron">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Compact day strip (always visible) */}
              <div className="mb-day-strip">
                {week.days.map((day, i) => (
                  <div key={i} className="mb-strip-cell" title={MB_DAY_FULL[i]}>
                    <span className="mb-strip-abbr">{MB_DAY_ABBR[i]}</span>
                    <span
                      className="mb-strip-dot"
                      style={{ background: mbSessionColor(day) }}
                    />
                    <span className="mb-strip-label">
                      {mbSessionLabel(day)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expanded day details */}
              {isOpen && (
                <div className="mb-day-grid">
                  {week.days.map((day, i) => (
                    <div
                      key={i}
                      className={`mb-day-card mb-day-card--${day.kind}`}
                    >
                      <div className="mb-day-card-header">
                        <span className="mb-day-card-name">
                          {MB_DAY_FULL[i]}
                        </span>
                        <span
                          className="mb-day-card-dot"
                          style={{ background: mbSessionColor(day) }}
                        />
                      </div>
                      <div className="mb-day-card-body">
                        {mbSessionDetail(day, paces, unit, unitLabel)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .mb-root { }
        .mb-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: var(--space-4) var(--space-5);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }
        .mb-header-title {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          margin-bottom: var(--space-1);
        }
        .mb-header-date {
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
          color: var(--color-text-primary);
        }
        .mb-header-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-4);
          min-width: 60px;
        }
        .mb-badge-num {
          font-family: var(--font-mono);
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--color-accent-primary);
          line-height: 1;
        }
        .mb-badge-label {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }
        .mb-badge-done {
          font-size: var(--text-2xl);
          color: var(--color-easy);
        }
        .mb-notice {
          padding: var(--space-3) var(--space-4);
          background: rgba(239,68,68,0.06);
          border: 1px dashed rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
        .mb-weeks { display: grid; gap: var(--space-2); }
        .mb-week {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-surface);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }
        .mb-week--current {
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 0 1px rgba(239,68,68,0.2);
        }
        .mb-week--past { opacity: 0.55; }
        .mb-week-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: var(--space-4);
        }
        .mb-week-header:hover { background: var(--color-bg-glass); }
        .mb-week-meta { display: flex; flex-direction: column; gap: 2px; }
        .mb-week-num {
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          color: var(--color-accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .mb-week-label {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-primary);
        }
        .mb-week-right {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-shrink: 0;
        }
        .mb-week-dates {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .mb-week-chevron {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }
        .mb-day-strip {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-top: 1px solid var(--color-border);
          padding: var(--space-2) var(--space-3);
          gap: var(--space-1);
        }
        .mb-strip-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .mb-strip-abbr {
          font-size: 10px;
          color: var(--color-text-muted);
          font-weight: var(--font-semibold);
        }
        .mb-strip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .mb-strip-label {
          font-size: 9px;
          color: var(--color-text-secondary);
          text-align: center;
          line-height: 1.2;
          max-width: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mb-day-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-top: 1px solid var(--color-border);
          gap: 0;
        }
        .mb-day-card {
          padding: var(--space-3) var(--space-2);
          border-right: 1px solid var(--color-border);
        }
        .mb-day-card:last-child { border-right: none; }
        .mb-day-card--rest { opacity: 0.4; }
        .mb-day-card-header {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          margin-bottom: var(--space-2);
        }
        .mb-day-card-name {
          font-size: 10px;
          font-weight: var(--font-bold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .mb-day-card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .mb-day-card-body { display: flex; flex-direction: column; gap: 2px; }
        .mb-day-main {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          line-height: 1.3;
        }
        .mb-day-race {
          color: var(--color-accent-primary) !important;
          font-weight: var(--font-bold) !important;
        }
        .mb-day-mp { color: var(--color-threshold) !important; }
        .mb-day-pace {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: var(--font-bold);
          color: var(--color-text-primary);
        }
        .mb-day-unit {
          font-weight: var(--font-normal);
          color: var(--color-text-muted);
          font-size: 9px;
        }
        .mb-day-meta {
          font-size: 9px;
          color: var(--color-text-muted);
          line-height: 1.3;
        }
        @media (max-width: 600px) {
          .mb-day-grid { grid-template-columns: repeat(7, 1fr); }
          .mb-day-card { padding: var(--space-2) var(--space-1); }
          .mb-week-dates { display: none; }
        }
      `}</style>
    </div>
  );
}
