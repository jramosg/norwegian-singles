import type { Locale } from '../types';

/** German labels for the free 15-week marathon build. */
const marathonBuildDe: Record<string, string> = {
  'Base Build': 'Grundlagenaufbau',
  'Parkrun Week': 'Parkrun-Woche',
  'Key Session': 'Schlüsseleinheit',
  Deload: 'Entlastungswoche',
  'Peak Build': 'Spitzenbelastung',
  '10K Tune-up': '10K-Vorbereitungsrennen',
  'Half Marathon Tune-up': 'Halbmarathon-Vorbereitungsrennen',
  'MP Introduction': 'Einstieg ins Marathontempo',
  'Race Prep': 'Wettkampfvorbereitung',
  'Taper & Race': 'Taper und Wettkampf',
  '10K Race': '10K-Wettkampf',
  'Half Marathon': 'Halbmarathon',
  '25 min WU + 10 km @ current MP + 25 min CD':
    '25 min Einlaufen + 10 km im aktuellen Marathontempo + 25 min Auslaufen',
  '92→93→100% MP progressive, no rest. 25 min WU + 10 min CD.':
    '92→93→100 % des Marathontempos, progressiv ohne Pause. 25 min Einlaufen + 10 min Auslaufen.',
  'Goal MP with 2 min rests. 30 min WU + 30 min CD.':
    'Marathon-Zieltempo mit 2 min Pause. 30 min Einlaufen + 30 min Auslaufen.',
};

export function localizeMarathonBuildText(
  text: string,
  locale: Locale,
): string {
  return locale === 'de' ? (marathonBuildDe[text] ?? text) : text;
}
