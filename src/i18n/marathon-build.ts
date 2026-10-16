import type { Locale } from '../types';

/** Localized labels for the free 15-week marathon build. */
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

const marathonBuildIt: Record<string, string> = {
  'Base Build': 'Costruzione della base',
  'Parkrun Week': 'Settimana del parkrun',
  'Key Session': 'Seduta chiave',
  Deload: 'Settimana di scarico',
  'Peak Build': 'Carico massimo',
  '10K Tune-up': 'Gara di preparazione sui 10 km',
  'Half Marathon Tune-up': 'Mezza maratona di preparazione',
  'MP Introduction': 'Introduzione al ritmo maratona',
  'Race Prep': 'Preparazione alla gara',
  'Taper & Race': 'Scarico e gara',
  '10K Race': 'Gara di 10 km',
  'Half Marathon': 'Mezza maratona',
  Marathon: 'Maratona',
  '25 min WU + 10 km @ current MP + 25 min CD':
    '25 min di riscaldamento + 10 km al ritmo maratona attuale + 25 min di defaticamento',
  '92→93→100% MP progressive, no rest. 25 min WU + 10 min CD.':
    '92→93→100% del ritmo maratona, in progressione senza pause. 25 min di riscaldamento + 10 min di defaticamento.',
  'Goal MP with 2 min rests. 30 min WU + 30 min CD.':
    'Ritmo maratona obiettivo con 2 min di recupero. 30 min di riscaldamento + 30 min di defaticamento.',
};

const marathonBuildPtBr: Record<string, string> = {
  'Base Build': 'Construção da base',
  'Parkrun Week': 'Semana de parkrun',
  'Key Session': 'Treino-chave',
  Deload: 'Semana de recuperação',
  'Peak Build': 'Pico de carga',
  '10K Tune-up': 'Prova preparatória de 10 km',
  'Half Marathon Tune-up': 'Meia maratona preparatória',
  'MP Introduction': 'Introdução ao ritmo de maratona',
  'Race Prep': 'Preparação para a prova',
  'Taper & Race': 'Polimento e prova',
  '10K Race': 'Prova de 10 km',
  'Half Marathon': 'Meia maratona',
  Marathon: 'Maratona',
  '25 min WU + 10 km @ current MP + 25 min CD':
    '25 min de aquecimento + 10 km no ritmo atual de maratona + 25 min de desaquecimento',
  '92→93→100% MP progressive, no rest. 25 min WU + 10 min CD.':
    '92→93→100% do ritmo de maratona, em progressão sem pausa. 25 min de aquecimento + 10 min de desaquecimento.',
  'Goal MP with 2 min rests. 30 min WU + 30 min CD.':
    'Ritmo-alvo de maratona com 2 min de recuperação. 30 min de aquecimento + 30 min de desaquecimento.',
};

const marathonBuildCopy: Partial<Record<Locale, Record<string, string>>> = {
  de: marathonBuildDe,
  it: marathonBuildIt,
  'pt-BR': marathonBuildPtBr,
};

export function localizeMarathonBuildText(
  text: string,
  locale: Locale,
): string {
  return marathonBuildCopy[locale]?.[text] ?? text;
}
