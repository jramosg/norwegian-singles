/**
 * TrainingForm — React island
 * Collects a race result, weekly hours, and unit, then saves plan and redirects.
 */

import { type FormEvent, useState, useId, useMemo, useRef } from 'react';
import {
  DISTANCE_METERS,
  MIN_CUSTOM_DISTANCE_METERS,
  type UserInput,
  type Locale,
  type RaceDistance,
  type Unit,
} from '../../types';
import { parseTime, formatPace } from '../../lib/paces';
import { createPlan, resolve5KSeconds } from '../../lib/plan-generator';
import { savePlan } from '../../lib/storage';
import { encodePlanInput } from '../../lib/plan-url';
import { getPlanByHours } from '../../lib/training-plans';
import { trackEvent } from '../../lib/analytics';

interface Props {
  locale: Locale;
}

const RACE_OPTIONS = [
  {
    value: '42K',
    labels: { en: 'Marathon', es: 'Maratón', ko: '마라톤' },
    meters: DISTANCE_METERS['42K'],
  },
  {
    value: '21K',
    labels: { en: 'Half-Marathon', es: 'Media maratón', ko: '하프 마라톤' },
    meters: DISTANCE_METERS['21K'],
  },
  {
    value: '15K',
    labels: { en: '15K', es: '15K', ko: '15K' },
    meters: DISTANCE_METERS['15K'],
  },
  {
    value: '10K',
    labels: { en: '10K', es: '10K', ko: '10K' },
    meters: DISTANCE_METERS['10K'],
  },
  {
    value: '5K',
    labels: { en: '5K', es: '5K', ko: '5K' },
    meters: DISTANCE_METERS['5K'],
  },
  {
    value: '2MI',
    labels: { en: '2Mi', es: '2 mi', ko: '2마일' },
    meters: DISTANCE_METERS['2MI'],
  },
  {
    value: '3200M',
    labels: { en: '3200m', es: '3200 m', ko: '3200m' },
    meters: DISTANCE_METERS['3200M'],
  },
  {
    value: '3K',
    labels: { en: '3K', es: '3K', ko: '3K' },
    meters: DISTANCE_METERS['3K'],
  },
  {
    value: '1MI',
    labels: { en: '1Mi', es: '1 mi', ko: '1마일' },
    meters: DISTANCE_METERS['1MI'],
  },
  {
    value: '1600M',
    labels: { en: '1600m', es: '1600 m', ko: '1600m' },
    meters: DISTANCE_METERS['1600M'],
  },
  {
    value: '1500M',
    labels: { en: '1500m', es: '1500 m', ko: '1500m' },
    meters: DISTANCE_METERS['1500M'],
  },
  {
    value: 'custom',
    labels: { en: 'Other', es: 'Otra', ko: '기타' },
    meters: 0,
  },
] as const satisfies ReadonlyArray<{
  value: RaceDistance;
  labels: Record<Locale, string>;
  meters: number;
}>;

const minCustomDistance = (unit: Unit) =>
  unit === 'mile' ? MIN_CUSTOM_DISTANCE_METERS / 1609.344 : 0.8;

export default function TrainingForm({ locale }: Props) {
  const [raceDistance, setRaceDistance] = useState<RaceDistance>('5K');
  const [raceTime, setRaceTime] = useState('');
  const [customDistanceRaw, setCustomDistanceRaw] = useState('');
  const [customDistanceUnit, setCustomDistanceUnit] = useState<Unit>('km');
  const [weeklyHoursRaw, setWeeklyHoursRaw] = useState('6');
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [marathonDate, setMarathonDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const startedRef = useRef(false);
  const hoursId = useId();
  const raceDistanceId = useId();
  const raceTimeId = useId();
  const customDistanceId = useId();
  const marathonDateId = useId();
  const unitLabelId = useId();

  // Earliest selectable marathon date: today (no past dates).
  const todayISO = new Date().toISOString().slice(0, 10);

  const weeklyHours = parseFloat(weeklyHoursRaw) || 6;
  const matchedPlan = getPlanByHours(weeklyHours);
  const customDistance = parseFloat(customDistanceRaw);
  const customDistanceMin = minCustomDistance(customDistanceUnit);

  const unitLabel = unit === 'km' ? 'min/km' : 'min/mi';
  const selectedDistance = RACE_OPTIONS.find(
    (option) => option.value === raceDistance,
  );
  const seoPage = useMemo(
    () =>
      typeof document === 'undefined'
        ? ''
        : document.documentElement.dataset.seoPage || window.location.pathname,
    [],
  );

  const baseInput = useMemo<UserInput>(
    () => ({
      raceDistance,
      raceTime: raceTime || undefined,
      customDistance:
        raceDistance === 'custom' && Number.isFinite(customDistance)
          ? customDistance
          : undefined,
      customDistanceUnit:
        raceDistance === 'custom' ? customDistanceUnit : undefined,
      customDistanceKm:
        raceDistance === 'custom' && Number.isFinite(customDistance)
          ? customDistance * (customDistanceUnit === 'mile' ? 1.609344 : 1)
          : undefined,
      weeklyHours: matchedPlan.hours,
      unit,
      marathonDate: marathonDate || undefined,
    }),
    [
      customDistance,
      customDistanceUnit,
      marathonDate,
      matchedPlan.hours,
      raceDistance,
      raceTime,
      unit,
    ],
  );

  // Live pace preview
  const preview = useMemo(() => {
    if (!raceTime) return null;
    try {
      const fiveK = resolve5KSeconds(baseInput);
      if (!fiveK || fiveK <= 0) return null;
      const plan = createPlan(baseInput);
      const p = plan.paces;
      return {
        rep3: formatPace(p.rep3min, unit),
        rep6: formatPace(p.rep6min, unit),
        rep10: formatPace(p.rep10min, unit),
        easy: formatPace(p.easy, unit),
      };
    } catch {
      return null;
    }
  }, [baseInput, raceTime, unit]);

  const trackFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('training_form_start', {
      locale,
      raceDistance,
      seoPage,
    });
  };

  const raceTimePlaceholder =
    raceDistance === '42K' || raceDistance === '21K' ? 'h:mm:ss' : 'mm:ss';

  const sessionPreview = useMemo(() => {
    if (!preview) return [];

    const dayNames = {
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      es: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      ko: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    }[locale];

    return matchedPlan.days
      .map((session, index) => ({ session, day: dayNames[index] }))
      .filter(({ session }) => session.kind === 'subT')
      .map(({ session, day }) => {
        if (session.kind !== 'subT') return null;
        const pace =
          session.paceColumn === 'rep3min'
            ? preview.rep3
            : session.paceColumn === 'rep6min'
              ? preview.rep6
              : preview.rep10;
        return {
          day,
          title: `${session.reps} x ${session.repDurationMin} min`,
          detail:
            locale === 'es'
              ? `${session.totalDurationMin} min total`
              : `${session.totalDurationMin} min total`,
          pace,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [locale, matchedPlan.days, preview]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!raceTime) {
      setError(
        {
          en: 'Enter a recent race time',
          es: 'Introduce una marca reciente',
          ko: '최근 레이스 기록을 입력하세요',
        }[locale],
      );
      return;
    }
    if (!parseTime(raceTime)) {
      setError(
        {
          en: 'Invalid time format',
          es: 'Formato inválido',
          ko: '시간 형식이 올바르지 않습니다',
        }[locale],
      );
      return;
    }
    if (
      raceDistance === 'custom' &&
      (!Number.isFinite(customDistance) ||
        customDistance < customDistanceMin ||
        customDistance > (customDistanceUnit === 'mile' ? 300 : 500))
    ) {
      setError(
        {
          en: 'Enter a valid custom distance',
          es: 'Introduce una distancia personalizada válida',
          ko: '올바른 사용자 지정 거리를 입력하세요',
        }[locale],
      );
      return;
    }

    setSubmitting(true);
    try {
      const input: UserInput = baseInput;
      const plan = createPlan(input);
      savePlan(plan);
      trackEvent('training_plan_generate', {
        locale,
        raceDistance,
        weeklyHours: matchedPlan.hours,
        hasMarathonDate: Boolean(marathonDate),
        seoPage,
      });
      // Encode the input in the URL so the plan is shareable / bookmarkable.
      window.location.href = `/${locale}/plan?${encodePlanInput(input)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setSubmitting(false);
    }
  };

  const T = {
    en: {
      title: 'Configure your plan',
      raceDistance: 'Race distance',
      raceTime: 'Recent race time',
      customDistance: 'Custom distance',
      customDistanceUnit: 'Custom distance unit',
      hint: 'Use a recent race. 5K or 10K usually gives the most precise paces.',
      hours: 'Weekly training hours',
      hoursHint: 'Nearest plan:',
      unitLabel: 'Unit',
      previewTitle: 'Pace preview',
      keySessions: 'Your key sessions',
      submit: 'Generate plan',
      rep3: '3-min reps',
      rep6: '6-min reps',
      rep10: '10-min reps',
      easyLabel: 'Easy pace',
      marathonDateLabel: 'Marathon date (optional)',
      marathonDateHint: 'Generates a 15-week build plan.',
    },
    es: {
      title: 'Configura tu plan',
      raceDistance: 'Distancia de carrera',
      raceTime: 'Marca reciente',
      customDistance: 'Distancia personalizada',
      customDistanceUnit: 'Unidad de distancia personalizada',
      hint: 'Usa una carrera reciente. 5K o 10K suelen dar ritmos más precisos.',
      hours: 'Horas de entrenamiento / semana',
      hoursHint: 'Plan más cercano:',
      unitLabel: 'Unidad',
      previewTitle: 'Vista previa de ritmos',
      keySessions: 'Tus sesiones clave',
      submit: 'Generar plan',
      rep3: 'Intervalos 3 min',
      rep6: 'Intervalos 6 min',
      rep10: 'Intervalos 10 min',
      easyLabel: 'Ritmo fácil',
      marathonDateLabel: 'Fecha del maratón (opcional)',
      marathonDateHint: 'Genera un plan de 15 semanas.',
    },
    ko: {
      title: '플랜 설정',
      raceDistance: '레이스 거리',
      raceTime: '최근 레이스 기록',
      customDistance: '사용자 지정 거리',
      customDistanceUnit: '사용자 지정 거리 단위',
      hint: '최근 레이스 기록을 사용하세요. 5K 또는 10K가 가장 정확한 페이스를 제공합니다.',
      hours: '주간 훈련 시간',
      hoursHint: '가장 가까운 플랜:',
      unitLabel: '단위',
      previewTitle: '페이스 미리보기',
      keySessions: '핵심 세션',
      submit: '플랜 생성',
      rep3: '3분 반복',
      rep6: '6분 반복',
      rep10: '10분 반복',
      easyLabel: '이지 페이스',
      marathonDateLabel: '마라톤 날짜(선택)',
      marathonDateHint: '15주 빌드업 플랜을 생성합니다.',
    },
  }[locale];

  return (
    <div className="tf">
      <form onSubmit={handleSubmit} onFocusCapture={trackFormStart}>
        {/* Race Result */}
        <div className="tf-row">
          <div className="form-group">
            <label className="form-label" htmlFor={raceDistanceId}>
              {T.raceDistance}
            </label>
            <div className="tf-distance-dropdown">
              <button
                id={raceDistanceId}
                type="button"
                className="form-select tf-distance-btn"
                aria-haspopup="menu"
                aria-expanded={distanceOpen}
                onClick={() => setDistanceOpen((open) => !open)}
              >
                {selectedDistance?.labels[locale] ?? '5K'}
              </button>
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby={raceDistanceId}
                style={{ display: distanceOpen ? 'block' : 'none' }}
              >
                {RACE_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <a
                      className="dropdown-item"
                      role="button"
                      tabIndex={-1}
                      data-unit={option.meters}
                      onClick={() => {
                        setRaceDistance(option.value);
                        setDistanceOpen(false);
                      }}
                    >
                      {option.labels[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={raceTimeId}>
              {T.raceTime}
            </label>
            <input
              id={raceTimeId}
              type="text"
              inputMode="numeric"
              className="form-input"
              placeholder={raceTimePlaceholder}
              value={raceTime}
              onChange={(e) => setRaceTime(e.target.value)}
            />
          </div>
        </div>
        {raceDistance === 'custom' && (
          <div className="form-group tf-custom-distance">
            <label className="form-label" htmlFor={customDistanceId}>
              {T.customDistance}
            </label>
            <div className="tf-hours-input-wrap">
              <input
                id={customDistanceId}
                type="number"
                inputMode="decimal"
                className="form-input tf-hours-input"
                min={customDistanceMin}
                max={customDistanceUnit === 'mile' ? 300 : 500}
                step={0.1}
                value={customDistanceRaw}
                onChange={(e) => setCustomDistanceRaw(e.target.value)}
                placeholder="15"
              />
              <span className="tf-hours-unit">
                {customDistanceUnit === 'mile' ? 'mi' : 'km'}
              </span>
            </div>
            <div
              className="tf-unit tf-custom-unit"
              role="group"
              aria-label={T.customDistanceUnit}
            >
              {(['km', 'mile'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={customDistanceUnit === u}
                  className={`tf-unit-btn ${
                    customDistanceUnit === u ? 'is-active' : ''
                  }`}
                  onClick={() => setCustomDistanceUnit(u)}
                >
                  {u === 'km' ? 'km' : 'mi'}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="form-hint">{T.hint}</p>

        {/* Weekly Hours */}
        <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
          <label className="form-label" htmlFor={hoursId}>
            {T.hours}
          </label>
          <div className="tf-hours-input-wrap">
            <input
              id={hoursId}
              type="number"
              className="form-input tf-hours-input"
              min={4}
              max={12}
              step={0.5}
              value={weeklyHoursRaw}
              onChange={(e) => setWeeklyHoursRaw(e.target.value)}
              placeholder="6"
            />
            <span className="tf-hours-unit">h/week</span>
          </div>
          <p className="form-hint tf-hours-hint">
            {T.hoursHint} <strong>{matchedPlan.label}</strong>
          </p>
        </div>

        {/* Marathon date */}
        <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
          <label className="form-label" htmlFor={marathonDateId}>
            {T.marathonDateLabel}
          </label>
          <input
            id={marathonDateId}
            type="date"
            className="form-input tf-date-input"
            min={todayISO}
            value={marathonDate}
            onChange={(e) => setMarathonDate(e.target.value)}
          />
          <p className="form-hint tf-hours-hint">{T.marathonDateHint}</p>
        </div>

        {/* Unit */}
        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
          <span className="form-label" id={unitLabelId}>
            {T.unitLabel}
          </span>
          <div className="tf-unit" role="group" aria-labelledby={unitLabelId}>
            {(['km', 'mile'] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                className={`tf-unit-btn ${unit === u ? 'is-active' : ''}`}
                onClick={() => setUnit(u)}
              >
                {u === 'km' ? 'km' : 'mi'}
              </button>
            ))}
          </div>
        </div>

        {/* Pace Preview */}
        {preview && (
          <div className="tf-preview" aria-live="polite">
            <p className="tf-preview-title">{T.previewTitle}</p>
            <div className="tf-preview-grid">
              <PaceRow
                label={T.rep3}
                value={preview.rep3}
                unit={unitLabel}
                color="var(--color-threshold)"
              />
              <PaceRow
                label={T.rep6}
                value={preview.rep6}
                unit={unitLabel}
                color="var(--color-threshold)"
              />
              <PaceRow
                label={T.rep10}
                value={preview.rep10}
                unit={unitLabel}
                color="var(--color-threshold)"
              />
              <PaceRow
                label={T.easyLabel}
                value={preview.easy}
                unit={unitLabel}
                color="var(--color-easy)"
              />
            </div>
            <div className="tf-session-preview">
              <p className="tf-preview-title tf-session-title">
                {T.keySessions}
              </p>
              <div className="tf-session-grid">
                {sessionPreview.map((session) => (
                  <div className="tf-session-card" key={session.day}>
                    <span className="tf-session-day">{session.day}</span>
                    <strong>{session.title}</strong>
                    <span>{session.detail}</span>
                    <em>
                      {session.pace} {unitLabel}
                    </em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: '100%', marginTop: 'var(--space-6)' }}
          disabled={submitting}
        >
          {submitting ? '...' : T.submit}
        </button>
      </form>

      <style>{`
        @keyframes tf-preview-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .tf-hours-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .tf-distance-dropdown {
          position: relative;
        }
        .tf-distance-btn {
          width: 100%;
          text-align: left;
        }
        .tf-distance-btn::after {
          content: "";
          position: absolute;
          right: var(--space-4);
          top: 50%;
          width: 0.5rem;
          height: 0.5rem;
          border-right: 2px solid currentColor;
          border-bottom: 2px solid currentColor;
          transform: translateY(-65%) rotate(45deg);
        }
        .dropdown-menu {
          position: absolute;
          z-index: 30;
          top: calc(100% + var(--space-2));
          left: 0;
          right: 0;
          max-height: 18rem;
          overflow: auto;
          padding: var(--space-2);
          margin: 0;
          list-style: none;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
        }
        .dropdown-item {
          display: block;
          padding: var(--space-2) var(--space-3);
          color: var(--color-text-primary);
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .dropdown-item:hover,
        .dropdown-item:focus-visible {
          background: rgba(239,68,68,0.12);
          color: var(--color-text-primary);
          outline: none;
        }
        .tf-hours-input {
          width: 120px;
          padding-right: var(--space-10);
          font-family: var(--font-mono);
          font-weight: var(--font-semibold);
        }
        .tf-hours-unit {
          position: absolute;
          right: var(--space-3);
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .tf-hours-hint {
          margin-top: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }
        .tf-hours-hint strong {
          color: var(--color-accent-primary);
          font-weight: var(--font-semibold);
        }
        .tf-date-input {
          max-width: 200px;
          font-family: var(--font-mono);
        }
        .tf-unit {
          display: flex;
          gap: var(--space-2);
        }
        .tf-custom-unit {
          margin-top: var(--space-3);
        }
        .tf-unit-btn {
          padding: var(--space-2) var(--space-5);
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-secondary);
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .tf-unit-btn.is-active {
          border-color: var(--color-accent-primary);
          background: rgba(239,68,68,0.12);
          color: var(--color-text-primary);
        }
        .tf-preview {
          margin-top: var(--space-6);
          padding: var(--space-4);
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          animation: tf-preview-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .tf-preview-title {
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: var(--space-3);
        }
        .tf-preview-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--space-3);
        }
        .tf-pace-row {
          min-height: 5.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: var(--space-2);
          padding: var(--space-3);
          background: rgba(255,255,255,0.045);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition:
            border-color var(--transition-fast),
            transform var(--transition-fast),
            background var(--transition-fast);
        }
        .tf-pace-row:hover {
          background: rgba(255,255,255,0.065);
          border-color: var(--color-border-accent);
          transform: translateY(-2px);
        }
        .tf-pace-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        .tf-pace-value {
          font-family: var(--font-mono);
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          animation: tf-preview-in 0.22s ease both;
        }
        .tf-pace-unit {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-left: var(--space-1);
        }
        .tf-session-preview {
          margin-top: var(--space-5);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }
        .tf-session-title {
          margin-bottom: var(--space-3);
        }
        .tf-session-grid {
          display: grid;
          gap: var(--space-2);
        }
        .tf-session-card {
          display: grid;
          grid-template-columns: 5.25rem 1fr auto;
          gap: var(--space-2);
          align-items: center;
          padding: var(--space-3);
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.18);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
        }
        .tf-session-day {
          color: var(--color-text-muted);
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          text-transform: uppercase;
        }
        .tf-session-card strong {
          color: var(--color-text-primary);
        }
        .tf-session-card span:not(.tf-session-day) {
          display: none;
          color: var(--color-text-muted);
        }
        .tf-session-card em {
          color: var(--color-threshold);
          font-family: var(--font-mono);
          font-style: normal;
          font-weight: var(--font-bold);
          white-space: nowrap;
        }
        @media (max-width: 560px) {
          .tf-row,
          .tf-preview-grid {
            grid-template-columns: 1fr;
          }
          .tf-session-card {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .tf-session-card span:not(.tf-session-day) {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

function PaceRow({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="tf-pace-row">
      <span className="tf-pace-label">{label}</span>
      <span>
        <span className="tf-pace-value" style={{ color }} key={value}>
          {value}
        </span>
        <span className="tf-pace-unit">{unit}</span>
      </span>
    </div>
  );
}
