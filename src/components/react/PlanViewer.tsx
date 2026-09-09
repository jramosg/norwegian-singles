/**
 * PlanViewer: React island
 * Displays the weekly training plan, paces, and taper reference.
 */

import React, { useState, useEffect } from 'react';
import type { SavedPlan, Locale } from '../../types';
import { useTranslations, type TranslationKey } from '../../i18n/ui';
import { loadPlan, savePlan } from '../../lib/storage';
import { createPlan } from '../../lib/plan-generator';
import { encodePlanInput, decodePlanInput } from '../../lib/plan-url';
import { sharePlanCard, type PlanCardData } from '../../lib/share-card';
import { trackEvent } from '../../lib/analytics';
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

interface Props {
  locale: Locale;
}

const DAY_LABELS: Record<string, Record<Locale, string>> = {
  monday: {
    en: 'Monday',
    es: 'Lunes',
    ko: '월요일',
    de: 'Montag',
    fr: 'Lundi',
  },
  tuesday: {
    en: 'Tuesday',
    es: 'Martes',
    ko: '화요일',
    de: 'Dienstag',
    fr: 'Mardi',
  },
  wednesday: {
    en: 'Wednesday',
    es: 'Miércoles',
    ko: '수요일',
    de: 'Mittwoch',
    fr: 'Mercredi',
  },
  thursday: {
    en: 'Thursday',
    es: 'Jueves',
    ko: '목요일',
    de: 'Donnerstag',
    fr: 'Jeudi',
  },
  friday: {
    en: 'Friday',
    es: 'Viernes',
    ko: '금요일',
    de: 'Freitag',
    fr: 'Vendredi',
  },
  saturday: {
    en: 'Saturday',
    es: 'Sábado',
    ko: '토요일',
    de: 'Samstag',
    fr: 'Samedi',
  },
  sunday: {
    en: 'Sunday',
    es: 'Domingo',
    ko: '일요일',
    de: 'Sonntag',
    fr: 'Dimanche',
  },
};

export default function PlanViewer({ locale }: Props) {
  const t = useTranslations(locale);
  const planLabel = (label: string) =>
    label.replace('h/week', t('plan.hoursPerWeek'));
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [tab, setTab] = useState<'week' | 'paces' | 'taper'>('week');
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
      document.documentElement.dataset.planReady = 'true';
      window.dispatchEvent(new CustomEvent('nsm:plan-ready'));
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
        trackEvent('plan_share', { locale, method: 'native' });
        return;
      }
      await navigator.clipboard.writeText(url);
      trackEvent('plan_share', { locale, method: 'clipboard' });
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
        planLabel: planLabel(getPlanByHours(plan.input.weeklyHours).label),
        fiveKLabel: formatTime(paces.fiveKSeconds),
        unitLabel: unit === 'km' ? 'min/km' : 'min/mi',
        rows: [
          {
            label: locale === 'ko' ? '3분 반복' : t('plan.reps3'),
            value: formatPace(paces.rep3min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'ko' ? '6분 반복' : t('plan.reps6'),
            value: formatPace(paces.rep6min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'ko' ? '10분 반복' : t('plan.reps10'),
            value: formatPace(paces.rep10min, unit),
            color: 'var(--color-threshold)',
          },
          {
            label: locale === 'ko' ? '마라톤 페이스' : t('plan.marathonPace'),
            value: formatPace(paces.marathonPace, unit),
            color: '#ef4444',
          },
          {
            label: locale === 'ko' ? '이지 페이스' : t('plan.easyPace'),
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
      trackEvent('plan_share_image', {
        locale,
        weeklyHours: plan.input.weeklyHours,
      });
    } finally {
      setImgBusy(false);
    }
  };

  if (loading) return <div className="skeleton" style={{ height: 300 }} />;

  const text = {
    en: {
      empty: "You don't have a plan yet",
      create: 'Create my plan',
      paces: 'Paces',
      share: 'Share',
      copied: 'Copied',
      image: 'Image',
      sharePlan: 'Share plan',
      shareImage: 'Share as image',
      unit: 'Unit',
      wucd: 'WU+CD incl.',
      recovery: 'recovery',
    },
    es: {
      empty: 'Aún no tienes un plan',
      create: 'Crear mi plan',
      paces: 'Ritmos',
      share: 'Compartir',
      copied: 'Copiado',
      image: 'Imagen',
      sharePlan: 'Compartir plan',
      shareImage: 'Compartir como imagen',
      unit: 'Unidad',
      wucd: 'cal.+vuelta a calma incl.',
      recovery: 'recup.',
    },
    ko: {
      empty: '아직 플랜이 없습니다',
      create: '플랜 만들기',
      paces: '페이스',
      share: '공유',
      copied: '복사됨',
      image: '이미지',
      sharePlan: '플랜 공유',
      shareImage: '이미지로 공유',
      unit: '단위',
      wucd: '워밍업+쿨다운 포함',
      recovery: '회복',
    },
    de: {
      empty: 'Du hast noch keinen Plan',
      create: 'Plan erstellen',
      paces: 'Paces',
      share: 'Teilen',
      copied: 'Kopiert',
      image: 'Bild',
      sharePlan: 'Plan teilen',
      shareImage: 'Als Bild teilen',
      unit: 'Einheit',
      wucd: 'inkl. Ein-/Auslaufen',
      recovery: 'Pause',
    },
    fr: {
      empty: "Tu n'as pas encore de plan",
      create: 'Créer mon plan',
      paces: 'Allures',
      share: 'Partager',
      copied: 'Copié',
      image: 'Image',
      sharePlan: 'Partager le plan',
      shareImage: 'Partager en image',
      unit: 'Unité',
      wucd: 'éch.+retour au calme incl.',
      recovery: 'récup.',
    },
  }[locale];

  if (!plan) {
    return (
      <div className="pv-empty">
        <div className="pv-empty-icon">📋</div>
        <h3>{text.empty}</h3>
        <a href={`/${locale}`} className="btn btn-primary">
          {text.create}
        </a>
        <style>{`.pv-empty{text-align:center;padding:var(--space-16) var(--space-4)}.pv-empty-icon{font-size:4rem;margin-bottom:var(--space-4)}.pv-empty h3{color:var(--color-text-secondary);margin-bottom:var(--space-6)}`}</style>
      </div>
    );
  }

  const { paces, input } = plan;
  const unitLabel = unit === 'km' ? 'min/km' : 'min/mi';
  const weekly = getPlanByHours(input.weeklyHours);
  const { nextPlan, nextPlanUrl } = (() => {
    const tier = PLAN_HOURS.reduce((p, c) =>
      Math.abs(c - input.weeklyHours) < Math.abs(p - input.weeklyHours) ? c : p,
    );
    const idx = PLAN_HOURS.indexOf(tier as PlanHours);
    const nextHours =
      idx >= 0 && idx < PLAN_HOURS.length - 1 ? PLAN_HOURS[idx + 1] : null;
    return {
      nextPlan: getNextPlan(tier as PlanHours),
      nextPlanUrl: nextHours
        ? `?${encodePlanInput({ ...input, weeklyHours: nextHours })}`
        : null,
    };
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
    if (session.kind === 'rest') return t('session.rest');
    if (session.kind === 'easy') return t('plan.easyRun');
    if (session.kind === 'double') return t('plan.doubleEasy');
    const s = session as SubTSession;
    return `${s.reps} × ${s.repDurationMin} min`;
  };

  const sessionDesc = (session: DaySession): string => {
    if (session.kind === 'rest') return '';
    if (session.kind === 'easy') return `${session.durationMin} min`;
    if (session.kind === 'double') {
      const d = session as DoubleDaySession;
      return `${t('plan.morning')} ${d.morning.durationMin} min · ${t('plan.afternoon')} ${d.afternoon.durationMin} min`;
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
    const note = s.intensityNote
      ? `: ${s.intensityNote === '~95% of marathon pace (gateway intensity)' ? t('plan.gatewayIntensity') : s.intensityNote}`
      : '';
    const wucd = text.wucd;
    const recLabel = text.recovery;
    const duration = t('plan.totalMinutes').replace(
      '{minutes}',
      String(s.totalDurationMin),
    );
    return `${duration} (${wucd}) · ${rec} ${recLabel}${note}`;
  };

  const tabs = [
    { id: 'week' as const, label: t('plan.week') },
    { id: 'paces' as const, label: text.paces },
    { id: 'taper' as const, label: t('taper.tab') },
  ];

  return (
    <div className="pv">
      {/* Header */}
      <div className="pv-header">
        <div>
          <h2 className="pv-plan-name">{planLabel(weekly.label)}</h2>
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
            aria-label={text.sharePlan}
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
              {copied ? text.copied : text.share}
            </span>
          </button>
          <button
            type="button"
            className="pv-share-btn"
            onClick={handleShareImage}
            disabled={imgBusy}
            aria-label={text.shareImage}
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
            <span className="pv-share-label">{imgBusy ? '…' : text.image}</span>
          </button>
          <div className="pv-unit-toggle" role="group" aria-label={text.unit}>
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
          {nextPlan && nextPlanUrl && (
            <a href={nextPlanUrl} className="pv-next">
              <div className="pv-next-content">
                <span className="pv-next-label">{t('plan.nextLevel')}</span>
                <span className="pv-next-val">{planLabel(nextPlan.label)}</span>
              </div>
              <svg
                className="pv-next-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Tab: Paces */}
      {tab === 'paces' && (
        <div className="pv-paces">
          <PaceCard
            label={t('plan.reps3Title')}
            pace={formatPace(paces.rep3min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={t('plan.reps3Note')}
          />
          <PaceCard
            label={t('plan.reps6Title')}
            pace={formatPace(paces.rep6min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={t('plan.reps6Note')}
          />
          <PaceCard
            label={t('plan.reps10Title')}
            pace={formatPace(paces.rep10min, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={t('plan.reps10Note')}
          />
          <PaceCard
            label={t('plan.mpTitle')}
            pace={formatPace(paces.marathonPace, unit)}
            unit={unitLabel}
            color="var(--color-threshold)"
            note={t('plan.mpNote')}
          />
          <PaceCard
            label={t('plan.easyRun')}
            pace={formatPace(paces.easy, unit)}
            unit={unitLabel}
            color="var(--color-easy)"
            note={t('plan.easyNote')}
          />
          <div className="pv-recovery-note">
            <span className="pv-recovery-icon">⏱</span>
            {t('plan.recoveryNote')}
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }
        .pv-next:hover {
          border-color: var(--color-accent-primary);
          background: rgba(239,68,68,0.04);
        }
        .pv-next:hover .pv-next-icon { color: var(--color-accent-primary); }
        .pv-next-content { display: flex; flex-direction: column; gap: 2px; }
        .pv-next-label {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .pv-next-val { font-size: var(--text-sm); font-weight: var(--font-semibold); color: var(--color-accent-primary); }
        .pv-next-icon { color: var(--color-text-muted); flex-shrink: 0; transition: color var(--transition-fast); }
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
        return `${t('plan.easyRun')} ${normalMin} min`;
      case 'easy_shorter': {
        const computed = Math.round(normalMin * (d.factor ?? 1));
        return `${t('plan.easyRun')} ${computed} min`;
      }
      case 'subt_normal': {
        if (normalSession.kind === 'subT') {
          const s = normalSession as SubTSession;
          return `${s.reps} × ${s.repDurationMin} min (${t('plan.normalWorkout')})`;
        }
        return t(d.description as TranslationKey);
      }
      case 'subt_modified':
        // Inject the actual MP pace into the description where it says "@ MP"
        return t(d.description as TranslationKey).replace(
          /@ (?:MP|AM)/,
          `@ ${locale === 'fr' ? 'AM' : 'MP'} (${mpLabel})`,
        );
      case 'race':
        return t('session.race');
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
