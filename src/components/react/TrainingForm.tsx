/**
 * TrainingForm — React island
 * Collects 5K/10K time, weekly hours, and unit, then saves plan and redirects.
 */

import { type FormEvent, useState, useId, useMemo } from 'react';
import type { UserInput, Locale } from '../../types';
import { parseTime, formatPace } from '../../lib/paces';
import { getSubTPaces, estimate5KFrom10K } from '../../lib/nsa-pace-table';
import { createPlan } from '../../lib/plan-generator';
import { savePlan } from '../../lib/storage';
import { encodePlanInput } from '../../lib/plan-url';
import { getPlanByHours } from '../../lib/training-plans';

interface Props {
  locale: Locale;
}

export default function TrainingForm({ locale }: Props) {
  const [time5K, setTime5K] = useState('');
  const [time10K, setTime10K] = useState('');
  const [weeklyHoursRaw, setWeeklyHoursRaw] = useState('6');
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [marathonDate, setMarathonDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const hoursId = useId();
  const time5KId = useId();
  const time10KId = useId();
  const marathonDateId = useId();
  const unitLabelId = useId();

  // Earliest selectable marathon date: today (no past dates).
  const todayISO = new Date().toISOString().slice(0, 10);

  const weeklyHours = parseFloat(weeklyHoursRaw) || 6;
  const matchedPlan = getPlanByHours(weeklyHours);

  const unitLabel = unit === 'km' ? 'min/km' : 'min/mi';

  // Live pace preview
  const preview = useMemo(() => {
    const t5 = parseTime(time5K);
    const t10 = parseTime(time10K);
    const fiveK = t5 ?? (t10 ? estimate5KFrom10K(t10) : null);
    if (!fiveK || fiveK <= 0) return null;
    const p = getSubTPaces(fiveK);
    return {
      rep3: formatPace(p.rep3min, unit),
      rep6: formatPace(p.rep6min, unit),
      rep10: formatPace(p.rep10min, unit),
      easy: formatPace(p.easy, unit),
    };
  }, [time5K, time10K, unit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!time5K && !time10K) {
      setError(
        locale === 'es'
          ? 'Introduce al menos una marca'
          : 'Enter at least one time',
      );
      return;
    }
    if (time5K && !parseTime(time5K)) {
      setError(
        locale === 'es'
          ? 'Formato 5K inválido (mm:ss)'
          : 'Invalid 5K format (mm:ss)',
      );
      return;
    }
    if (time10K && !parseTime(time10K)) {
      setError(
        locale === 'es'
          ? 'Formato 10K inválido (mm:ss)'
          : 'Invalid 10K format (mm:ss)',
      );
      return;
    }

    setSubmitting(true);
    try {
      const input: UserInput = {
        time5K: time5K || undefined,
        time10K: time10K || undefined,
        weeklyHours: matchedPlan.hours,
        unit,
        marathonDate: marathonDate || undefined,
      };
      const plan = createPlan(input);
      savePlan(plan);
      // Encode the input in the URL so the plan is shareable / bookmarkable.
      window.location.href = `/${locale}/plan?${encodePlanInput(input)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setSubmitting(false);
    }
  };

  const T = {
    title: locale === 'es' ? 'Configura tu plan' : 'Configure your plan',
    race5K: locale === 'es' ? 'Marca 5K' : '5K race time',
    race10K: locale === 'es' ? 'Marca 10K' : '10K race time',
    hint:
      locale === 'es'
        ? 'Introduce al menos una. La 5K da paces más precisos.'
        : 'Enter at least one. A 5K time gives the most accurate paces.',
    hours:
      locale === 'es'
        ? 'Horas de entrenamiento / semana'
        : 'Weekly training hours',
    hoursHint: locale === 'es' ? 'Plan más cercano:' : 'Nearest plan:',
    unitLabel: locale === 'es' ? 'Unidad' : 'Unit',
    previewTitle: locale === 'es' ? 'Vista previa de paces' : 'Pace preview',
    submit: locale === 'es' ? 'Generar plan' : 'Generate plan',
    rep3: locale === 'es' ? 'Intervalos 3 min' : '3-min reps',
    rep6: locale === 'es' ? 'Intervalos 6 min' : '6-min reps',
    rep10: locale === 'es' ? 'Intervalos 10 min' : '10-min reps',
    easyLabel: locale === 'es' ? 'Ritmo fácil' : 'Easy pace',
    marathonDateLabel:
      locale === 'es'
        ? 'Fecha del maratón (opcional)'
        : 'Marathon date (optional)',
    marathonDateHint:
      locale === 'es'
        ? 'Genera un plan de 15 semanas.'
        : 'Generates a 15-week build plan.',
  };

  return (
    <div className="tf">
      <form onSubmit={handleSubmit}>
        {/* Race Times */}
        <div className="tf-row">
          <div className="form-group">
            <label className="form-label" htmlFor={time5KId}>
              {T.race5K}
            </label>
            <input
              id={time5KId}
              type="text"
              inputMode="numeric"
              className="form-input"
              placeholder="mm:ss"
              value={time5K}
              onChange={(e) => setTime5K(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={time10KId}>
              {T.race10K}
            </label>
            <input
              id={time10KId}
              type="text"
              inputMode="numeric"
              className="form-input"
              placeholder="mm:ss"
              value={time10K}
              onChange={(e) => setTime10K(e.target.value)}
            />
          </div>
        </div>
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
          gap: var(--space-2);
        }
        .tf-pace-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-1) 0;
          border-bottom: 1px solid var(--color-border);
        }
        .tf-pace-row:last-child { border-bottom: none; }
        .tf-pace-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        .tf-pace-value {
          font-family: var(--font-mono);
          font-size: var(--text-base);
          font-weight: var(--font-bold);
        }
        .tf-pace-unit {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-left: var(--space-1);
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
        <span className="tf-pace-value" style={{ color }}>
          {value}
        </span>
        <span className="tf-pace-unit">{unit}</span>
      </span>
    </div>
  );
}
