/**
 * Programmatic SEO pages for common race inputs.
 * Paces are computed at module load time from the NSA pace table.
 */

import type { Distance, Locale } from '../types';
import { DISTANCE_METERS } from '../types';
import { parseTime, formatPace, formatTime } from './paces';
import {
  getSubTPaces,
  estimate5KFrom10K,
  estimate5KFromHM,
} from './nsa-pace-table';
import { calculateVDOT, calculateTimeFromVDOT } from './vdot';

export type RaceDistKey = '5K' | '10K' | 'HM' | 'marathon';

export interface PaceCardData {
  raceLabel: string;
  rep3min: string;
  rep6min: string;
  rep10min: string;
  easy: string;
}

export interface RaceSeoPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  howToName: string;
  paceCard: PaceCardData;
  distanceKey: RaceDistKey;
  raceDistance: Distance;
  raceTime: string;
  displayTime: string;
  equivalents: RaceEquivalent[];
}

export interface RaceEquivalent {
  distance: Distance;
  label: string;
  time: string;
}

interface RaceEntry {
  distance: RaceDistKey;
  time: string;
}

const RACE_ENTRIES: RaceEntry[] = [
  // 5K
  { distance: '5K', time: '17:00' },
  { distance: '5K', time: '18:00' },
  { distance: '5K', time: '19:00' },
  { distance: '5K', time: '20:00' },
  { distance: '5K', time: '21:00' },
  { distance: '5K', time: '22:00' },
  { distance: '5K', time: '23:00' },
  { distance: '5K', time: '24:00' },
  { distance: '5K', time: '25:00' },
  { distance: '5K', time: '27:00' },
  { distance: '5K', time: '30:00' },
  // 10K
  { distance: '10K', time: '35:00' },
  { distance: '10K', time: '37:00' },
  { distance: '10K', time: '40:00' },
  { distance: '10K', time: '42:00' },
  { distance: '10K', time: '45:00' },
  { distance: '10K', time: '48:00' },
  { distance: '10K', time: '50:00' },
  { distance: '10K', time: '55:00' },
  { distance: '10K', time: '60:00' },
  // Half marathon
  { distance: 'HM', time: '1:20:00' },
  { distance: 'HM', time: '1:25:00' },
  { distance: 'HM', time: '1:30:00' },
  { distance: 'HM', time: '1:35:00' },
  { distance: 'HM', time: '1:40:00' },
  { distance: 'HM', time: '1:45:00' },
  { distance: 'HM', time: '1:50:00' },
  { distance: 'HM', time: '2:00:00' },
  { distance: 'HM', time: '2:15:00' },
  { distance: 'HM', time: '2:30:00' },
  // Marathon
  { distance: 'marathon', time: '3:00:00' },
  { distance: 'marathon', time: '3:15:00' },
  { distance: 'marathon', time: '3:30:00' },
  { distance: 'marathon', time: '3:45:00' },
  { distance: 'marathon', time: '4:00:00' },
  { distance: 'marathon', time: '4:30:00' },
  { distance: 'marathon', time: '5:00:00' },
];

// Strip trailing :00 from h:mm:ss → h:mm for display
function displayTime(time: string): string {
  const parts = time.split(':');
  return parts.length === 3 && parts[2] === '00'
    ? `${parts[0]}:${parts[1]}`
    : time;
}

function timeToSlug(time: string): string {
  return time.replace(/:/g, '-');
}

function compute5KSeconds(d: RaceDistKey, time: string): number {
  const t = parseTime(time);
  if (t === null) throw new Error(`Invalid time: ${time}`);
  switch (d) {
    case '5K':
      return t;
    case '10K':
      return estimate5KFrom10K(t);
    case 'HM':
      return estimate5KFromHM(t);
    case 'marathon': {
      const vdot = calculateVDOT(DISTANCE_METERS['42K'], t);
      return calculateTimeFromVDOT(vdot, DISTANCE_METERS['5K']);
    }
  }
}

function distanceForEntry(distance: RaceDistKey): Distance {
  switch (distance) {
    case '5K':
      return '5K';
    case '10K':
      return '10K';
    case 'HM':
      return '21K';
    case 'marathon':
      return '42K';
  }
}

function equivalentLabels(locale: Locale): Record<Distance, string> {
  return {
    '42K':
      locale === 'es'
        ? 'Maratón'
        : locale === 'ko'
          ? '마라톤'
          : locale === 'fr'
            ? 'Marathon'
            : 'Marathon',
    '21K':
      locale === 'es'
        ? 'Media maratón'
        : locale === 'ko'
          ? '하프 마라톤'
          : locale === 'de'
            ? 'Halbmarathon'
            : locale === 'fr'
              ? 'Semi-marathon'
              : 'Half marathon',
    '15K': '15K',
    '10K': '10K',
    '5K': '5K',
    '2MI':
      locale === 'fr' ? '2 miles' : locale === 'de' ? '2 Meilen' : '2 miles',
    '3200M': '3200 m',
    '3K': '3K',
    '1MI':
      locale === 'es'
        ? '1 milla'
        : locale === 'ko'
          ? '1마일'
          : locale === 'de'
            ? '1 Meile'
            : locale === 'fr'
              ? '1 mile'
              : '1 mile',
    '1600M': '1600 m',
    '1500M': '1500 m',
  };
}

function buildEquivalents(
  distance: RaceDistKey,
  time: string,
  locale: Locale,
): RaceEquivalent[] {
  const raceDistance = distanceForEntry(distance);
  const parsed = parseTime(time);
  if (parsed === null) throw new Error(`Invalid time: ${time}`);

  const labels = equivalentLabels(locale);
  const vdot = calculateVDOT(DISTANCE_METERS[raceDistance], parsed);
  return (['5K', '10K', '21K', '42K'] as Distance[]).map((d) => ({
    distance: d,
    label: labels[d],
    time: displayTime(
      formatTime(calculateTimeFromVDOT(vdot, DISTANCE_METERS[d])),
    ),
  }));
}

function buildPage(entry: RaceEntry, locale: Locale): RaceSeoPage {
  const { distance, time } = entry;
  const fiveK = compute5KSeconds(distance, time);
  const paces = getSubTPaces(fiveK);
  const raceDistance = distanceForEntry(distance);
  const equivalents = buildEquivalents(distance, time, locale);

  const r3 = `${formatPace(paces.rep3min)}/km`;
  const r6 = `${formatPace(paces.rep6min)}/km`;
  const r10 = `${formatPace(paces.rep10min)}/km`;
  const ez = `${formatPace(paces.easy)}/km`;
  const dt = displayTime(time);
  const tSlug = timeToSlug(time);

  if (locale === 'en') {
    const distTitle =
      distance === 'HM'
        ? 'Half Marathon'
        : distance === 'marathon'
          ? 'Marathon'
          : distance;
    const distLabel =
      distance === 'HM'
        ? 'half marathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance;
    const distSlug =
      distance === 'HM'
        ? 'half-marathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance.toLowerCase();

    return {
      slug: `${distSlug}-${tSlug}-training-paces`,
      title: `${dt} ${distTitle} NSA Training Paces: Norwegian Singles`,
      description:
        `NSA / NSM training paces for a ${dt} ${distLabel} runner. ` +
        `Short sub-T: ${r3} · medium: ${r6} · long: ${r10} · easy: ${ez}.`,
      h1: `${dt} ${distLabel} NSA / NSM training paces`,
      intro:
        `These <strong>NSA / NSM training paces</strong> are based on a ` +
        `${dt} ${distLabel}. Short reps (3 min) target ${r3}, medium reps ` +
        `(6 min) ${r6}, long reps (10 min) ${r10}, and easy running stays ` +
        `around ${ez}. Open the sample plan or use the calculator below to ` +
        `adjust to your actual time.`,
      howToName: `Calculate NSA training paces from a ${dt} ${distLabel}`,
      paceCard: {
        raceLabel: `${dt} ${distTitle}`,
        rep3min: r3,
        rep6min: r6,
        rep10min: r10,
        easy: ez,
      },
      distanceKey: distance,
      raceDistance,
      raceTime: time,
      displayTime: dt,
      equivalents,
    };
  }

  if (locale === 'ko') {
    const distTitle =
      distance === 'HM'
        ? '하프 마라톤'
        : distance === 'marathon'
          ? '마라톤'
          : distance;
    const distLabel =
      distance === 'HM'
        ? '하프 마라톤'
        : distance === 'marathon'
          ? '마라톤'
          : distance;
    const distSlug =
      distance === 'HM'
        ? 'half-marathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance.toLowerCase();

    return {
      slug: `${distSlug}-${tSlug}-training-paces`,
      title: `${dt} ${distTitle} NSA 훈련 페이스: Norwegian Singles`,
      description:
        `${dt} ${distLabel} 러너를 위한 NSA / NSM 훈련 페이스. ` +
        `짧은 Sub-T: ${r3} · 중간: ${r6} · 긴: ${r10} · 이지: ${ez}.`,
      h1: `${dt} ${distLabel} NSA / NSM 훈련 페이스`,
      intro:
        `이 <strong>NSA / NSM 훈련 페이스</strong>는 ${dt} ` +
        `${distLabel} 기록을 기준으로 계산했습니다. 짧은 반복(3분)은 ` +
        `${r3}, 중간 반복(6분)은 ${r6}, 긴 반복(10분)은 ${r10}, ` +
        `이지런은 약 ${ez}입니다. 예시 플랜을 열거나 아래 계산기로 ` +
        `실제 기록에 맞게 조정하세요.`,
      howToName: `${dt} ${distLabel}에서 NSA 훈련 페이스 계산하기`,
      paceCard: {
        raceLabel: `${dt} ${distTitle}`,
        rep3min: r3,
        rep6min: r6,
        rep10min: r10,
        easy: ez,
      },
      distanceKey: distance,
      raceDistance,
      raceTime: time,
      displayTime: dt,
      equivalents,
    };
  }

  if (locale === 'de') {
    const distTitle =
      distance === 'HM'
        ? 'Halbmarathon'
        : distance === 'marathon'
          ? 'Marathon'
          : distance;
    const distLabel =
      distance === 'HM'
        ? 'Halbmarathon'
        : distance === 'marathon'
          ? 'Marathon'
          : distance;
    const distSlug =
      distance === 'HM'
        ? 'halbmarathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance.toLowerCase();

    return {
      slug: `${distSlug}-${tSlug}-trainingspaces`,
      title: `${dt} ${distTitle} NSA Trainingspaces: Norwegian Singles`,
      description:
        `NSA / NSM Trainingspaces für einen ${dt} ${distLabel}-Läufer. ` +
        `Kurze Sub-T: ${r3} · mittlere: ${r6} · lange: ${r10} · locker: ${ez}.`,
      h1: `${dt} ${distLabel} NSA / NSM Trainingspaces`,
      intro:
        `Diese <strong>NSA / NSM Trainingspaces</strong> basieren auf einem ` +
        `${dt} ${distLabel}. Kurze Intervalle (3 min) zielen auf ${r3}, ` +
        `mittlere (6 min) ${r6}, lange (10 min) ${r10}, und lockeres Laufen ` +
        `bleibt um ${ez}. Öffne den Beispielplan oder nutze den Rechner ` +
        `unten, um auf deine echte Zeit anzupassen.`,
      howToName: `NSA Trainingspaces aus einem ${dt} ${distLabel} berechnen`,
      paceCard: {
        raceLabel: `${dt} ${distTitle}`,
        rep3min: r3,
        rep6min: r6,
        rep10min: r10,
        easy: ez,
      },
      distanceKey: distance,
      raceDistance,
      raceTime: time,
      displayTime: dt,
      equivalents,
    };
  }

  if (locale === 'fr') {
    const distTitle =
      distance === 'HM'
        ? 'Semi-marathon'
        : distance === 'marathon'
          ? 'Marathon'
          : distance;
    const distLabel =
      distance === 'HM'
        ? 'semi-marathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance;
    const distSlug =
      distance === 'HM'
        ? 'semi-marathon'
        : distance === 'marathon'
          ? 'marathon'
          : distance.toLowerCase();

    return {
      slug: `allures-${distSlug}-${tSlug}`,
      title: `Allures NSA ${distTitle} ${dt} : Norwegian Singles`,
      description:
        `Allures NSA / NSM pour un ${distLabel} en ${dt}. ` +
        `Sous-S court : ${r3} · moyen : ${r6} · long : ${r10} · facile : ${ez}.`,
      h1: `Allures NSA / NSM pour un ${distLabel} en ${dt}`,
      intro:
        `Ces <strong>allures NSA / NSM</strong> sont calculées pour un ` +
        `${distLabel} en ${dt}. Intervalles courts (3 min) à ${r3}, ` +
        `moyens (6 min) à ${r6}, longs (10 min) à ${r10}, et footing facile ` +
        `autour de ${ez}. Utilise le calculateur pour ajuster à ton résultat réel.`,
      howToName: `Calculer les allures NSA pour un ${distLabel} en ${dt}`,
      paceCard: {
        raceLabel: `${distTitle} ${dt}`,
        rep3min: r3,
        rep6min: r6,
        rep10min: r10,
        easy: ez,
      },
      distanceKey: distance,
      raceDistance,
      raceTime: time,
      displayTime: dt,
      equivalents,
    };
  }

  // ES
  const distTitle =
    distance === 'HM'
      ? 'Media Maratón'
      : distance === 'marathon'
        ? 'Maratón'
        : distance;
  const distLabel =
    distance === 'HM'
      ? 'media maratón'
      : distance === 'marathon'
        ? 'maratón'
        : distance;
  const distSlug =
    distance === 'HM'
      ? 'media-maraton'
      : distance === 'marathon'
        ? 'maraton'
        : distance.toLowerCase();

  return {
    slug: `ritmos-${distSlug}-${tSlug}`,
    title: `Ritmos NSA ${distTitle} ${dt}: Norwegian Singles`,
    description:
      `Ritmos NSA / NSM para ${distLabel} en ${dt}. ` +
      `Sub-T corto: ${r3} · medio: ${r6} · largo: ${r10} · fácil: ${ez}.`,
    h1: `Ritmos NSA / NSM para ${distLabel} en ${dt}`,
    intro:
      `Estos <strong>ritmos NSA / NSM</strong> están calculados para una ` +
      `marca de ${dt} en ${distLabel}. Intervalos cortos (3 min) a ${r3}, ` +
      `medios (6 min) a ${r6}, largos (10 min) a ${r10}, y rodaje fácil ` +
      `alrededor de ${ez}. Usa la calculadora para ajustar a tu resultado real.`,
    howToName: `Calcular ritmos NSA para ${distLabel} en ${dt}`,
    distanceKey: distance,
    raceDistance,
    raceTime: time,
    displayTime: dt,
    equivalents,
    paceCard: {
      raceLabel: `${distTitle} ${dt}`,
      rep3min: r3,
      rep6min: r6,
      rep10min: r10,
      easy: ez,
    },
  };
}

const RACE_PAGES: Record<Locale, RaceSeoPage[]> = {
  en: RACE_ENTRIES.map((e) => buildPage(e, 'en')),
  es: RACE_ENTRIES.map((e) => buildPage(e, 'es')),
  ko: RACE_ENTRIES.map((e) => buildPage(e, 'ko')),
  de: RACE_ENTRIES.map((e) => buildPage(e, 'de')),
  fr: RACE_ENTRIES.map((e) => buildPage(e, 'fr')),
};

export function getRacePages(locale: Locale): RaceSeoPage[] {
  return RACE_PAGES[locale];
}

export function getRacePagesByDistance(
  locale: Locale,
): Record<RaceDistKey, RaceSeoPage[]> {
  const result: Record<RaceDistKey, RaceSeoPage[]> = {
    '5K': [],
    '10K': [],
    HM: [],
    marathon: [],
  };
  for (const page of RACE_PAGES[locale]) {
    result[page.distanceKey].push(page);
  }
  return result;
}

export function getRacePage(
  locale: Locale,
  slug: string,
): RaceSeoPage | undefined {
  return RACE_PAGES[locale].find((p) => p.slug === slug);
}

export function getNearbyRacePages(
  locale: Locale,
  page: RaceSeoPage,
  radius = 2,
): RaceSeoPage[] {
  const group = RACE_PAGES[locale].filter(
    (candidate) => candidate.distanceKey === page.distanceKey,
  );
  const index = group.findIndex((candidate) => candidate.slug === page.slug);
  if (index === -1) return [];

  const start = Math.max(0, index - radius);
  const end = Math.min(group.length, index + radius + 1);
  return group.slice(start, end);
}

export function getRaceAlternateSlug(
  locale: Locale,
  slug: string,
  alternateLocale: Locale,
): string | undefined {
  const idx = RACE_PAGES[locale].findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return RACE_PAGES[alternateLocale][idx]?.slug;
}

export function createRaceSeoStructuredData(
  locale: Locale,
  page: RaceSeoPage,
): Record<string, unknown>[] {
  const site = 'https://norwegian-singles.app';
  const url = `${site}/${locale}/${page.slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name:
            locale === 'es'
              ? 'Inicio'
              : locale === 'ko'
                ? '홈'
                : locale === 'de'
                  ? 'Start'
                  : locale === 'fr'
                    ? 'Accueil'
                    : 'Home',
          item: `${site}/${locale}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.h1,
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: page.howToName,
      description: page.description,
      step: [
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Introduce tu marca'
              : locale === 'ko'
                ? '레이스 기록 입력'
                : locale === 'de'
                  ? 'Gib deine Rennzeit ein'
                  : locale === 'fr'
                    ? 'Saisis ton temps de course'
                    : 'Enter your race time',
          text:
            locale === 'es'
              ? 'Añade una marca reciente para confirmar los ritmos.'
              : locale === 'ko'
                ? '페이스를 확인할 최근 기록을 입력하세요.'
                : locale === 'de'
                  ? 'Füge ein aktuelles Ergebnis hinzu, um diese Paces zu bestätigen.'
                  : locale === 'fr'
                    ? 'Ajoute un résultat récent pour confirmer ces allures.'
                    : 'Add a recent result to confirm these paces.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Elige horas semanales'
              : locale === 'ko'
                ? '주간 훈련 시간 선택'
                : locale === 'de'
                  ? 'Wähle die Wochenstunden'
                  : locale === 'fr'
                    ? 'Choisis tes heures hebdomadaires'
                    : 'Choose weekly training hours',
          text:
            locale === 'es'
              ? 'Selecciona el volumen semanal que puedes repetir.'
              : locale === 'ko'
                ? '꾸준히 반복할 수 있는 주간 볼륨을 선택하세요.'
                : locale === 'de'
                  ? 'Wähle den Wochenumfang, den du konstant wiederholen kannst.'
                  : locale === 'fr'
                    ? 'Choisis le volume hebdomadaire que tu peux répéter régulièrement.'
                    : 'Select the weekly volume you can repeat consistently.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Genera ritmos y plan'
              : locale === 'ko'
                ? '페이스와 플랜 생성'
                : locale === 'de'
                  ? 'Paces und Plan generieren'
                  : locale === 'fr'
                    ? 'Génère les allures et le plan'
                    : 'Generate paces and plan',
          text:
            locale === 'es'
              ? 'Obtén ritmos sub-umbral, ritmo fácil y una semana NSA/NSM.'
              : locale === 'ko'
                ? '서브스레숄드 페이스, 이지 페이스, NSA/NSM 주간을 확인하세요.'
                : locale === 'de'
                  ? 'Erhalte Sub-Threshold-Paces, lockeres Tempo und eine NSA/NSM-Woche.'
                  : locale === 'fr'
                    ? "Obtiens des allures sous-seuil, l'allure facile et une semaine NSA/NSM."
                    : 'Get sub-threshold paces, easy pace, and an NSA/NSM week.',
        },
      ],
    },
  ];
}
