/**
 * Training Form Component (React Island)
 *
 * Interactive form for configuring training parameters
 */

import React, { useState, useEffect } from 'react';
import type { Distance, UserInput, Locale } from '../../types';
import {
  calculateVDOT,
  parseTime,
  estimate5KFrom10K,
  estimate10KFrom5K,
} from '../../lib/vdot';
import { calculatePaces, getFormattedPaces } from '../../lib/paces';
import { createTrainingPlan } from '../../lib/plan-generator';
import { saveInput, saveBlock } from '../../lib/storage';
import { DISTANCE_METERS } from '../../types';

interface Props {
  locale: Locale;
  translations: {
    title: string;
    targetDistance: string;
    time5K: string;
    time10K: string;
    timePlaceholder: string;
    timeHint: string;
    trainingDays: string;
    trainingDaysHint: string;
    daysPerWeek: string;
    unit: string;
    unitKm: string;
    unitMile: string;
    previewThreshold: string;
    previewEasy: string;
    submit: string;
    validationRequired: string;
    validationFormat: string;
    distance5K: string;
    distance10K: string;
    distance21K: string;
    distance42K: string;
  };
}

const DISTANCES: { value: Distance; label: string }[] = [
  { value: '5K', label: '5K' },
  { value: '10K', label: '10K' },
  { value: '21K', label: 'Half Marathon' },
  { value: '42K', label: 'Marathon' },
];

export default function TrainingForm({ locale, translations }: Props) {
  const [targetDistance, setTargetDistance] = useState<Distance>('10K');
  const [time5K, setTime5K] = useState('');
  const [time10K, setTime10K] = useState('');
  const [trainingDays, setTrainingDays] = useState(5);
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate derived values for preview
  const [preview, setPreview] = useState<{
    vdot: number;
    threshold: string;
    easy: string;
  } | null>(null);

  // Estimate missing time when one is entered
  useEffect(() => {
    if (time10K && !time5K) {
      estimate5KFrom10K(time10K);
      // Don't auto-fill, just show in calculated preview
    } else if (time5K && !time10K) {
      estimate10KFrom5K(time5K);
      // Don't auto-fill, just show in calculated preview
    }
  }, [time5K, time10K]);

  // Calculate preview when times change
  useEffect(() => {
    const time = time10K || time5K;
    if (!time) {
      setPreview(null);
      return;
    }

    const parsed = parseTime(time);
    if (!parsed) {
      setPreview(null);
      return;
    }

    const distance = time10K ? '10K' : '5K';
    const vdot = calculateVDOT(DISTANCE_METERS[distance], parsed.totalSeconds);
    const paces = calculatePaces(vdot);
    const formatted = getFormattedPaces(paces, unit);

    setPreview({
      vdot,
      threshold: formatted.threshold,
      easy: formatted.easy,
    });
  }, [time5K, time10K, unit]);

  const validateTime = (time: string): boolean => {
    if (!time) return true;
    return parseTime(time) !== null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!time5K && !time10K) {
      setError(translations.validationRequired);
      return;
    }

    if (
      (time5K && !validateTime(time5K)) ||
      (time10K && !validateTime(time10K))
    ) {
      setError(translations.validationFormat);
      return;
    }

    setIsSubmitting(true);

    try {
      const input: UserInput = {
        targetDistance,
        time5K: time5K || undefined,
        time10K: time10K || undefined,
        trainingDays,
        races: [],
        unit,
      };

      // Create plan
      const block = createTrainingPlan(input);

      // Save to storage
      saveInput(input, block.vdot, block.paces);
      saveBlock(block);

      // Redirect to plan page
      window.location.href = `/${locale}/plan`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="training-form">
      <form onSubmit={handleSubmit}>
        {/* Target Distance */}
        <div className="form-group">
          <label className="form-label">{translations.targetDistance}</label>
          <div className="distance-grid">
            {DISTANCES.map((d) => (
              <button
                key={d.value}
                type="button"
                className={`distance-btn ${
                  targetDistance === d.value ? 'is-active' : ''
                }`}
                onClick={() => setTargetDistance(d.value)}
              >
                {d.value === '5K'
                  ? translations.distance5K
                  : d.value === '10K'
                    ? translations.distance10K
                    : d.value === '21K'
                      ? translations.distance21K
                      : translations.distance42K}
              </button>
            ))}
          </div>
        </div>

        {/* Current Times */}
        <div className="times-row">
          <div className="form-group">
            <label className="form-label" htmlFor="time5K">
              {translations.time5K}
            </label>
            <input
              id="time5K"
              type="text"
              className="form-input"
              placeholder={translations.timePlaceholder}
              value={time5K}
              onChange={(e) => setTime5K(e.target.value)}
              pattern="[0-9:]*"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="time10K">
              {translations.time10K}
            </label>
            <input
              id="time10K"
              type="text"
              className="form-input"
              placeholder={translations.timePlaceholder}
              value={time10K}
              onChange={(e) => setTime10K(e.target.value)}
              pattern="[0-9:]*"
            />
          </div>
        </div>
        <p className="form-hint">{translations.timeHint}</p>

        {/* Training Days */}
        <div className="form-group">
          <label
            id="trainingDaysLabel"
            htmlFor="trainingDays"
            className="form-label"
          >
            {translations.trainingDays}
          </label>
          <div className="days-slider">
            <input
              type="range"
              min="3"
              max="7"
              id="trainingDays"
              value={trainingDays}
              onChange={(e) => setTrainingDays(Number(e.target.value))}
              className="slider"
              style={{ '--value': trainingDays } as React.CSSProperties}
            />
            <div className="days-display">
              <span className="days-value">{trainingDays}</span>
              <span className="days-label">{translations.daysPerWeek}</span>
            </div>
          </div>
          <p className="form-hint">{translations.trainingDaysHint}</p>
        </div>

        {/* Pace Unit */}
        <div className="form-group">
          <label className="form-label">{translations.unit}</label>
          <div className="unit-selector">
            <button
              type="button"
              className={`unit-btn ${unit === 'km' ? 'is-active' : ''}`}
              onClick={() => setUnit('km')}
            >
              {translations.unitKm}
            </button>
            <button
              type="button"
              className={`unit-btn ${unit === 'mile' ? 'is-active' : ''}`}
              onClick={() => setUnit('mile')}
            >
              {translations.unitMile}
            </button>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="preview-card">
            <div className="preview-row">
              <span className="preview-label">VDOT</span>
              <span className="preview-value">{preview.vdot.toFixed(1)}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">
                {translations.previewThreshold}
              </span>
              <span className="preview-value">
                {preview.threshold} min/{unit === 'km' ? 'km' : 'mi'}
              </span>
            </div>
            <div className="preview-row">
              <span className="preview-label">{translations.previewEasy}</span>
              <span className="preview-value">
                {preview.easy} min/{unit === 'km' ? 'km' : 'mi'}
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && <p className="form-error">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-lg submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : translations.submit}
        </button>
      </form>

      <style>{`
        .training-form {
          max-width: 480px;
          margin: 0 auto;
        }
        
        .form-group {
          margin-bottom: var(--space-6);
        }
        
        .distance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
        }
        
        @media (min-width: 480px) {
          .distance-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .distance-btn {
          padding: var(--space-4);
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--color-text-secondary);
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
        }
        
        .distance-btn:hover {
          border-color: var(--color-border-accent);
          color: var(--color-text-primary);
        }
        
        .distance-btn.is-active {
          border-color: var(--color-accent-primary);
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-text-primary);
        }
        
        .times-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        
        .days-slider {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .unit-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }

        .unit-btn {
          padding: var(--space-3);
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: var(--font-medium);
          color: var(--color-text-secondary);
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .unit-btn:hover {
          border-color: var(--color-border-accent);
          color: var(--color-text-primary);
        }

        .unit-btn.is-active {
          border-color: var(--color-accent-primary);
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-text-primary);
        }
        
        .slider {
          flex: 1;
          height: 8px;
          border-radius: var(--radius-full);
          background: linear-gradient(to right, 
            var(--color-accent-primary) 0%, 
            var(--color-accent-primary) calc((100% / 4) * (var(--value, 5) - 3)), 
            var(--color-border) calc((100% / 4) * (var(--value, 5) - 3)), 
            var(--color-border) 100%);
          appearance: none;
          cursor: pointer;
          outline: none;
        }
        
        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: var(--radius-full);
          background: transparent;
        }
        
        .slider::-moz-range-track {
          height: 8px;
          border-radius: var(--radius-full);
          background: transparent;
          border: none;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-accent-gradient);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
          margin-top: -8px;
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-accent-gradient);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
          border: none;
        }
        
        .days-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }
        
        .days-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--color-text-primary);
        }
        
        .days-label {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }
        
        .preview-card {
          padding: var(--space-4);
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
        }
        
        .preview-row {
          display: flex;
          justify-content: space-between;
          padding: var(--space-2) 0;
          border-bottom: 1px solid var(--color-border);
        }
        
        .preview-row:last-child {
          border-bottom: none;
        }
        
        .preview-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .preview-value {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-primary);
        }
        
        .submit-btn {
          width: 100%;
          margin-top: var(--space-4);
        }
        
        .form-error {
          color: var(--color-accent-primary);
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
        }
      `}</style>
    </div>
  );
}
