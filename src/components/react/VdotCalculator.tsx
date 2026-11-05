import { useId, useMemo, useRef, useState } from 'react';
import type { VdotCopy } from '../../i18n/vdot-page';
import { formatTimeInput } from '../../lib/paces';
import { encodePlanInput } from '../../lib/plan-url';
import { formatPace, formatTime } from '../../lib/vdot';
import {
  computeVdotReport,
  parseRaceTime,
  VDOT_DISTANCES,
  type VdotDistance,
} from '../../lib/vdot-report';
import { DISTANCE_METERS, type Locale, type Unit } from '../../types';

interface Props {
  locale: Locale;
  copy: VdotCopy;
  defaultDistance?: VdotDistance;
  defaultTime?: string;
}

export default function VdotCalculator({
  locale,
  copy,
  defaultDistance = '5K',
  defaultTime = '20:00',
}: Props) {
  const id = useId();
  const [distance, setDistance] = useState<VdotDistance>(defaultDistance);
  const [time, setTime] = useState(defaultTime);
  const [unit, setUnit] = useState<Unit>('km');
  const report = useMemo(
    () => computeVdotReport(distance, time),
    [distance, time],
  );
  // Keep the last valid result on screen while the visitor is mid-typing.
  const lastValid = useRef(report);
  if (report) lastValid.current = report;
  const shown = report ?? lastValid.current;
  const showError = time.length >= 4 && !report;

  const unitLabel = unit === 'km' ? '/km' : '/mi';
  const pace = (secondsPerKm: number) => formatPace(secondsPerKm, unit);
  const per400 = (secondsPerKm: number) => formatTime(secondsPerKm * 0.4);

  const seconds = parseRaceTime(time);
  const planHref = `/${locale}/plan?${encodePlanInput({
    raceDistance: distance,
    raceTime: seconds ? formatTime(seconds) : defaultTime,
    weeklyHours: 6,
    unit,
  })}`;

  if (!shown) return null;
  const { paces } = shown;
  const zones = [
    {
      key: 'easy',
      ...copy.zones.easy,
      pace: `${pace(paces.easy.min)}–${pace(paces.easy.max)}`,
      rep: '',
    },
    {
      key: 'marathon',
      ...copy.zones.marathon,
      pace: pace(paces.marathon),
      rep: '',
    },
    {
      key: 'threshold',
      ...copy.zones.threshold,
      pace: pace(paces.threshold),
      rep: per400(paces.threshold),
    },
    {
      key: 'interval',
      ...copy.zones.interval,
      pace: pace(paces.interval),
      rep: per400(paces.interval),
    },
    {
      key: 'repetition',
      ...copy.zones.repetition,
      pace: pace(paces.repetition),
      rep: per400(paces.repetition),
    },
  ];

  return (
    <div className="vc">
      <form className="vc-input" onSubmit={(e) => e.preventDefault()}>
        <h2 className="vc-input-title">{copy.calcTitle}</h2>
        <div className="vc-fields">
          <div className="form-group">
            <label className="form-label" htmlFor={`${id}-distance`}>
              {copy.distance}
            </label>
            <select
              id={`${id}-distance`}
              className="form-select"
              value={distance}
              onChange={(e) => setDistance(e.target.value as VdotDistance)}
            >
              {VDOT_DISTANCES.map((d) => (
                <option key={d} value={d}>
                  {copy.distances[d]}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={`${id}-time`}>
              {copy.time}
            </label>
            <input
              id={`${id}-time`}
              className="form-input vc-time"
              inputMode="numeric"
              autoComplete="off"
              placeholder={copy.timePlaceholder}
              value={time}
              aria-invalid={showError}
              aria-describedby={`${id}-hint`}
              onChange={(e) => setTime(formatTimeInput(e.target.value, true))}
            />
          </div>
        </div>
        <p
          id={`${id}-hint`}
          className={showError ? 'vc-hint is-error' : 'vc-hint'}
        >
          {showError ? copy.invalidTime : copy.timeHint}
        </p>
        <div className="vc-unit" role="group" aria-label={copy.unit}>
          {(['km', 'mile'] as const).map((u) => (
            <button
              key={u}
              type="button"
              className={unit === u ? 'is-active' : undefined}
              aria-pressed={unit === u}
              onClick={() => setUnit(u)}
            >
              {u === 'km' ? 'km' : 'mi'}
            </button>
          ))}
        </div>
      </form>

      <output className="vc-score" htmlFor={`${id}-distance ${id}-time`}>
        <span className="vc-score-label">{copy.vdotLabel}</span>
        <strong className="vc-score-value">
          {shown.vdot.toLocaleString(locale, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </strong>
        <span className="vc-score-note">
          {shown.inTableRange ? copy.vdotNote : copy.outOfRange}
        </span>
      </output>

      <section className="vc-block" aria-labelledby={`${id}-paces`}>
        <div className="vc-block-head">
          <h2 id={`${id}-paces`}>{copy.pacesTitle}</h2>
          <p>{copy.pacesIntro}</p>
        </div>
        <table className="vc-table">
          <thead>
            <tr>
              <th scope="col">{copy.zoneCol}</th>
              <th scope="col" className="vc-num">
                {copy.paceCol} {unitLabel}
              </th>
              <th scope="col" className="vc-num">
                {copy.per400Col}
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.key} className={`vc-zone vc-zone-${zone.key}`}>
                <th scope="row">
                  <span className="vc-zone-name">{zone.name}</span>
                  <span className="vc-zone-use">{zone.use}</span>
                </th>
                <td className="vc-num vc-strong">{zone.pace}</td>
                <td className="vc-num">{zone.rep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="vc-block" aria-labelledby={`${id}-equiv`}>
        <div className="vc-block-head">
          <h2 id={`${id}-equiv`}>{copy.equivTitle}</h2>
          <p>{copy.equivIntro}</p>
        </div>
        <table className="vc-table">
          <thead>
            <tr>
              <th scope="col">{copy.distanceCol}</th>
              <th scope="col" className="vc-num">
                {copy.timeCol}
              </th>
              <th scope="col" className="vc-num">
                {copy.paceCol} {unitLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.equivalents.map((e) => (
              <tr
                key={e.distance}
                className={e.distance === distance ? 'is-input' : undefined}
              >
                <th scope="row">{copy.distances[e.distance]}</th>
                <td className="vc-num vc-strong">{formatTime(e.seconds)}</td>
                <td className="vc-num">
                  {pace(e.seconds / (DISTANCE_METERS[e.distance] / 1000))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <aside className="vc-cta">
        <div>
          <h2>{copy.ctaTitle}</h2>
          <p>{copy.ctaText}</p>
        </div>
        <a className="btn btn-primary btn-lg" href={planHref}>
          {copy.ctaButton}
        </a>
      </aside>
    </div>
  );
}
