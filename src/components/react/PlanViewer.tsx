/**
 * PlanViewer — React island
 * Displays the weekly training plan, paces, and taper reference.
 */

import React, { useState, useEffect } from 'react';
import type { SavedPlan, Locale, TrainingPaces } from '../../types';
import { useTranslations, type TranslationKey } from '../../i18n/ui';
import { loadPlan, savePlan } from '../../lib/storage';
import { createPlan } from '../../lib/plan-generator';
import { encodePlanInput, decodePlanInput } from '../../lib/plan-url';
import { sharePlanCard, type PlanCardData } from '../../lib/share-card';
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
  const t = useTranslations(locale);
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [tab, setTab] = useState<'week' | 'paces' | 'taper' | 'marathon'>(
    'week',
  );
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [imgBusy, setImgBusy] = useState(false);

  useEffect(() => {
    // Prefer a plan encoded in the URL (shared / bookmarked link), then fall
    // back to the locally cached plan.
    const params = new URLSearchParams(window.location.search);
    const fromUrl = decodePlanInput(params);

    let saved: SavedPlan | null = null;
    if (fromUrl) {
      try {
        saved = createPlan(fromUrl);
        savePlan(saved);
      } catch {
        saved = null;
      }
    }
    if (!saved) saved = loadPlan();

    if (saved) {
      setPlan(saved);
      setUnit(saved.input.unit);
      // Make sure the URL carries the plan so it can be shared from anywhere.
      if (!fromUrl) {
        const qs = encodePlanInput(saved.input);
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}?${qs}`,
        );
      }
    }
    setLoading(false);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled the share sheet or clipboard is unavailable.
    }
  };

  const handleShareImage = async () => {
    if (!plan || imgBusy) return;
    setImgBusy(true);
    try {
      const { paces } = plan;
      const card: PlanCardData = {
        planLabel: getPlanByHours(plan.input.weeklyHours).label,
        fiveKLabel: formatTime(paces.fiveKSeconds),
        unitLabel: unit === 'km' ? 'min/km' : 'min/mi',
        rows: [
          {
            label: locale === 'es' ? 'Interv. 3 min' : '3-min reps',
            value: formatPace(paces.rep3min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'es' ? 'Interv. 6 min' : '6-min reps',
            value: formatPace(paces.rep6min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'es' ? 'Interv. 10 min' : '10-min reps',
            value: formatPace(paces.rep10min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'es' ? 'Ritmo maratón' : 'Marathon pace',
            value: formatPace(paces.marathonPace, unit),
            color: '#ef4444',
          },
          {
            label: locale === 'es' ? 'Ritmo fácil' : 'Easy pace',
            value: formatPace(paces.easy, unit),
            color: '#22c55e',
          },
        ].map((r) => ({
          ...r,
          // Resolve the two CSS-var colors to hex for the canvas.
          color: r.color === 'var(--color-threshold)' ? '#f59e0b' : r.color,
        })),
      };
      await sharePlanCard(card, locale, window.location.href);
    } finally {
      setImgBusy(false);
    }
  };

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
    { id: 'week' as const, label: t('plan.week') },
    { id: 'paces' as const, label: locale === 'es' ? 'Paces' : 'Paces' },
    { id: 'taper' as const, label: t('taper.tab') },
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
        <div className="pv-header-actions">
          <button
            type="button"
            className={`pv-share-btn ${copied ? 'is-copied' : ''}`}
            onClick={handleShare}
            aria-label={locale === 'es' ? 'Compartir plan' : 'Share plan'}
          >
            {copied ? (
              <svg
                className="pv-share-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                className="pv-share-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
            <span className="pv-share-label">
              {copied
                ? locale === 'es'
                  ? 'Copiado'
                  : 'Copied'
                : locale === 'es'
                  ? 'Compartir'
                  : 'Share'}
            </span>
          </button>
          <button
            type="button"
            className="pv-share-btn"
            onClick={handleShareImage}
            disabled={imgBusy}
            aria-label={
              locale === 'es' ? 'Compartir como imagen' : 'Share as image'
            }
          >
            <svg
              className="pv-share-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="pv-share-label">
              {imgBusy ? '…' : locale === 'es' ? 'Imagen' : 'Image'}
            </span>
          </button>
          <div
            className="pv-unit-toggle"
            role="group"
            aria-label={locale === 'es' ? 'Unidad' : 'Unit'}
          >
            {(['km', 'mile'] as const).map((u) => (
              <button
                key={u}
                aria-pressed={unit === u}
                className={`pv-unit-btn ${unit === u ? 'is-active' : ''}`}
                onClick={() => setUnit(u)}
              >
                {u === 'km' ? 'KM' : 'MI'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PlanUpgradeCard plan={plan} locale={locale} />

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
            title={t('taper.title.10k')}
            t={t}
          />
          <TaperTable
            plan={REVERSE_TAPER_10K}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={t('taper.title.recovery10k')}
            t={t}
          />
          <TaperTable
            plan={TAPER_HALF}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={t('taper.title.half')}
            t={t}
          />
          <TaperTable
            plan={REVERSE_TAPER_HALF}
            weekly={weekly}
            paces={paces}
            unit={unit}
            unitLabel={unitLabel}
            locale={locale}
            title={t('taper.title.recoveryHalf')}
            t={t}
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
        .pv-upgrade {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--space-4);
          padding: var(--space-5);
          margin-bottom: var(--space-6);
          background:
            linear-gradient(135deg, rgba(239,68,68,0.13), rgba(59,130,246,0.07)),
            var(--color-surface);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-lg);
        }
        .pv-upgrade-kicker {
          display: inline-flex;
          width: fit-content;
          padding: 2px var(--space-2);
          margin-bottom: var(--space-2);
          color: #fecaca;
          background: rgba(239,68,68,0.14);
          border: 1px solid rgba(239,68,68,0.28);
          border-radius: var(--radius-md);
          font-size: 11px;
          font-weight: var(--font-bold);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .pv-upgrade-title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-xl);
          letter-spacing: 0;
        }
        .pv-upgrade-copy {
          margin: 0;
          max-width: 58ch;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          line-height: 1.6;
        }
        .pv-upgrade-products {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--space-3);
        }
        .pv-upgrade-product {
          appearance: none;
          width: 100%;
          padding: var(--space-4);
          background: rgba(10,10,11,0.42);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: inherit;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }
        .pv-upgrade-product:hover {
          border-color: var(--color-border-accent);
          background: rgba(255,255,255,0.04);
        }
        .pv-upgrade-product.is-featured {
          border-color: rgba(239,68,68,0.45);
          box-shadow: inset 0 0 0 1px rgba(239,68,68,0.08);
        }
        .pv-upgrade-product.is-selected {
          border-color: var(--color-accent-primary);
          box-shadow:
            inset 0 0 0 1px rgba(239,68,68,0.2),
            0 0 0 3px rgba(239,68,68,0.12);
        }
        .pv-upgrade-product-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--space-3);
          margin-bottom: var(--space-2);
        }
        .pv-upgrade-product-name {
          color: var(--color-text-primary);
          font-size: var(--text-sm);
          font-weight: var(--font-bold);
        }
        .pv-upgrade-price {
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: var(--font-bold);
        }
        .pv-upgrade-product p {
          margin: 0;
          color: var(--color-text-muted);
          font-size: var(--text-xs);
          line-height: 1.5;
        }
        .pv-upgrade-features {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--space-2) var(--space-4);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .pv-upgrade-features li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          line-height: 1.4;
        }
        .pv-upgrade-features li::before {
          content: '';
          width: 7px;
          height: 7px;
          margin-top: 0.45em;
          border-radius: 50%;
          background: var(--color-accent-primary);
          flex: 0 0 auto;
        }
        .pv-upgrade-form {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: var(--space-2);
          align-items: start;
        }
        .pv-upgrade-input {
          min-height: 42px;
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-sm);
        }
        .pv-upgrade-submit {
          min-height: 42px;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
        }
        .pv-upgrade-consent {
          grid-column: 1 / -1;
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
          color: var(--color-text-muted);
          font-size: var(--text-xs);
          line-height: 1.45;
        }
        .pv-upgrade-consent input {
          width: 15px;
          height: 15px;
          margin-top: 1px;
          accent-color: var(--color-accent-primary);
          flex: 0 0 auto;
        }
        .pv-upgrade-message {
          grid-column: 1 / -1;
          margin: 0;
          font-size: var(--text-xs);
        }
        .pv-upgrade-message.is-error { color: var(--color-accent-primary); }
        .pv-upgrade-message.is-success { color: var(--color-easy); }
        .pv-upgrade-footer {
          display: flex;
          justify-content: space-between;
          gap: var(--space-3);
          padding-top: var(--space-2);
          border-top: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: var(--text-xs);
        }
        .pv-plan-name { font-size: var(--text-2xl); margin-bottom: var(--space-1); }
        .pv-5k { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
        .pv-5k-val { font-family: var(--font-mono); font-weight: var(--font-bold); color: var(--color-text-secondary); }
        .pv-header-actions { display: flex; align-items: center; gap: var(--space-2); }
        .pv-share-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          color: var(--color-text-secondary);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .pv-share-btn:hover {
          color: var(--color-accent-primary);
          border-color: var(--color-accent-primary);
        }
        .pv-share-btn.is-copied {
          color: var(--color-easy);
          border-color: var(--color-easy);
        }
        .pv-share-btn:disabled { opacity: 0.6; cursor: default; }
        .pv-share-icon { flex-shrink: 0; }
        @media (max-width: 420px) {
          .pv-share-label { display: none; }
        }
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
          .pv-header {
            flex-direction: column;
            gap: var(--space-3);
          }
          .pv-header-actions { flex-wrap: wrap; }
          .pv-upgrade {
            padding: var(--space-4);
          }
          .pv-upgrade-products,
          .pv-upgrade-features,
          .pv-upgrade-form {
            grid-template-columns: 1fr;
          }
          .pv-upgrade-footer {
            flex-direction: column;
            gap: var(--space-1);
          }
          .pv-day { grid-template-columns: 1fr; gap: var(--space-1); }
          .pv-day-name { font-size: var(--text-xs); }
        }
      `}</style>
    </div>
  );
}

type UpgradeProductId = 'export' | 'bundle';

interface UpgradeProduct {
  id: UpgradeProductId;
  price: 9 | 19;
}

const UPGRADE_PRODUCTS: Record<UpgradeProductId, UpgradeProduct> = {
  export: {
    id: 'export',
    price: 9,
  },
  bundle: {
    id: 'bundle',
    price: 19,
  },
};

function PlanUpgradeCard({
  plan,
  locale,
}: {
  plan: SavedPlan;
  locale: Locale;
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] =
    useState<UpgradeProductId>('bundle');
  const [messageKind, setMessageKind] = useState<'error' | 'success'>(
    'success',
  );
  const [submitting, setSubmitting] = useState(false);

  const weekly = getPlanByHours(plan.input.weeklyHours);
  const hasMarathon = Boolean(plan.input.marathonDate);

  const text = {
    kicker: locale === 'es' ? 'Checkout seguro' : 'Secure checkout',
    title:
      locale === 'es'
        ? 'Compra los exports de tu plan'
        : 'Buy exports for your plan',
    copy:
      locale === 'es'
        ? 'Selecciona el formato, deja tu email para la entrega y continúa al pago. Tu plan actual se adjunta al pedido.'
        : 'Choose the package, enter your delivery email, and continue to payment. Your current plan is attached to the order.',
    exportName: locale === 'es' ? 'Export básico' : 'Basic export',
    exportCopy:
      locale === 'es'
        ? 'Calendario .ics, PDF imprimible y archivo de entrenos.'
        : 'Calendar .ics, printable PDF, and workout export file.',
    bundleName:
      locale === 'es'
        ? 'Bundle maratón + recordatorios'
        : 'Marathon + reminders bundle',
    bundleCopy:
      locale === 'es'
        ? 'Todo el export básico, PDF de 15 semanas y emails semanales.'
        : 'Everything in basic export, 15-week PDF, and weekly emails.',
    emailPlaceholder: locale === 'es' ? 'tu@email.com' : 'you@example.com',
    submit: locale === 'es' ? 'Continuar al pago' : 'Continue to checkout',
    submitting:
      locale === 'es' ? 'Preparando pago...' : 'Preparing checkout...',
    consent:
      locale === 'es'
        ? 'Acepto recibir el producto comprado, recordatorios relacionados y emails transaccionales de este pedido.'
        : 'I agree to receive the purchased product, related reminders, and transactional emails for this order.',
    missingEmail:
      locale === 'es' ? 'Introduce un email válido.' : 'Enter a valid email.',
    missingConsent:
      locale === 'es'
        ? 'Confirma el permiso para enviarte emails.'
        : 'Confirm permission to send emails.',
    success:
      locale === 'es'
        ? 'Pedido preparado. Redirigiendo al pago...'
        : 'Order ready. Redirecting to checkout...',
    error:
      locale === 'es'
        ? 'No he podido preparar el checkout. Prueba otra vez.'
        : 'Could not prepare checkout. Try again.',
    planAttached: locale === 'es' ? 'Plan adjunto' : 'Plan attached',
    secure:
      locale === 'es'
        ? 'Pago externo seguro. Entrega por email.'
        : 'Secure external payment. Delivery by email.',
    features:
      locale === 'es'
        ? [
            'Exportar a calendario .ics',
            'PDF imprimible del plan',
            'Archivo Garmin / Coros / TrainingPeaks',
            'PDF maratón 15 semanas',
            'Recordatorios semanales por email',
          ]
        : [
            'Export to .ics calendar',
            'Printable plan PDF',
            'Garmin / Coros / TrainingPeaks file',
            '15-week marathon PDF',
            'Weekly email reminders',
          ],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessageKind('error');
      setMessage(text.missingEmail);
      return;
    }
    if (!consent) {
      setMessageKind('error');
      setMessage(text.missingConsent);
      return;
    }

    const product = UPGRADE_PRODUCTS[selectedProduct];
    const order = {
      id: crypto.randomUUID(),
      email: cleanEmail,
      locale,
      productId: product.id,
      price: product.price,
      currency: 'EUR',
      planLabel: weekly.label,
      fiveK: formatTime(plan.paces.fiveKSeconds),
      weeklyHours: plan.input.weeklyHours,
      time5K: plan.input.time5K ?? null,
      time10K: plan.input.time10K ?? null,
      unit: plan.input.unit,
      marathonDate: plan.input.marathonDate ?? null,
      pageUrl: window.location.href,
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      localStorage.setItem('ns-pending-order', JSON.stringify(order));
      const checkoutUrl = await resolveCheckoutUrl(order, plan);
      setMessageKind('success');
      setMessage(text.success);
      window.location.href = checkoutUrl;
    } catch {
      setMessageKind('error');
      setMessage(text.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pv-upgrade" aria-labelledby="pv-upgrade-title">
      <div>
        <span className="pv-upgrade-kicker">{text.kicker}</span>
        <h3 className="pv-upgrade-title" id="pv-upgrade-title">
          {text.title}
        </h3>
        <p className="pv-upgrade-copy">{text.copy}</p>
      </div>

      <div className="pv-upgrade-products" role="radiogroup">
        <button
          type="button"
          className={`pv-upgrade-product ${selectedProduct === 'export' ? 'is-selected' : ''}`}
          onClick={() => setSelectedProduct('export')}
          role="radio"
          aria-checked={selectedProduct === 'export'}
        >
          <div className="pv-upgrade-product-head">
            <span className="pv-upgrade-product-name">{text.exportName}</span>
            <span className="pv-upgrade-price">€9</span>
          </div>
          <p>{text.exportCopy}</p>
        </button>
        <button
          type="button"
          className={`pv-upgrade-product is-featured ${selectedProduct === 'bundle' ? 'is-selected' : ''}`}
          onClick={() => setSelectedProduct('bundle')}
          role="radio"
          aria-checked={selectedProduct === 'bundle'}
        >
          <div className="pv-upgrade-product-head">
            <span className="pv-upgrade-product-name">{text.bundleName}</span>
            <span className="pv-upgrade-price">€19</span>
          </div>
          <p>{text.bundleCopy}</p>
        </button>
      </div>

      <ul className="pv-upgrade-features">
        {text.features
          .filter((feature) => hasMarathon || !feature.includes('15'))
          .map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
      </ul>

      <form className="pv-upgrade-form" onSubmit={handleSubmit}>
        <input
          className="form-input pv-upgrade-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={text.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
        <button
          className="btn btn-primary pv-upgrade-submit"
          type="submit"
          disabled={submitting}
        >
          {submitting ? text.submitting : text.submit}
        </button>
        <label className="pv-upgrade-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>{text.consent}</span>
        </label>
        {message && (
          <p className={`pv-upgrade-message is-${messageKind}`}>{message}</p>
        )}
      </form>
      <div className="pv-upgrade-footer">
        <span>
          {text.planAttached}: {weekly.label}
        </span>
        <span>{text.secure}</span>
      </div>
    </section>
  );
}

async function resolveCheckoutUrl(
  order: {
    id: string;
    email: string;
    locale: Locale;
    productId: UpgradeProductId;
    price: number;
    currency: string;
    pageUrl: string;
  },
  plan: SavedPlan,
): Promise<string> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order, plan }),
  });
  if (!response.ok) throw new Error('Checkout session failed');
  const payload = (await response.json()) as { url?: string };
  if (!payload.url) throw new Error('Checkout URL missing');
  return payload.url;
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
  t,
}: {
  plan: import('../../lib/tapering').TaperPlan;
  weekly: import('../../lib/training-plans').WeeklyPlan;
  paces: import('../../types').TrainingPaces;
  unit: 'km' | 'mile';
  unitLabel: string;
  locale: Locale;
  title: string;
  t: (key: TranslationKey) => string;
}) {
  const mpLabel = `${formatPace(paces.marathonPace, unit)} ${unitLabel}`;
  const taperDayLabel = (day: string) =>
    DAY_LABELS[day.toLowerCase()]?.[locale] ?? day;

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
        return t(d.description as TranslationKey);
      }
      case 'subt_modified':
        // Inject the actual MP pace into the description where it says "@ MP"
        return t(d.description as TranslationKey).replace(
          '@ MP',
          `@ MP (${mpLabel})`,
        );
      case 'race':
        return locale === 'es' ? 'Carrera' : 'Race';
      default:
        return t(d.description as TranslationKey);
    }
  };

  return (
    <div className="pv-taper-section">
      <h3 className="pv-taper-title">{title}</h3>
      <table className="pv-taper-table">
        <tbody>
          {plan.days.map((d) => (
            <tr key={d.day}>
              <td>{taperDayLabel(d.day)}</td>
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
