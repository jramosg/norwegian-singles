import type { Locale } from '../types';

export interface SeoLandingPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  howToName: string;
}

const pages: Record<Locale, SeoLandingPage[]> = {
  en: [
    {
      slug: 'nsa-pace-calculator',
      title: 'NSA Pace Calculator — Norwegian Singles Training Paces',
      description:
        'Free NSA pace calculator for Norwegian Singles Approach runners. Estimate short, medium, long sub-threshold paces and easy pace from a 5K or 10K.',
      h1: 'NSA pace calculator for Norwegian Singles runners',
      intro:
        'Use this <strong>NSA pace calculator</strong> to turn a recent 5K or 10K into practical Norwegian Singles Approach / Method training paces. The calculator gives short, medium, and long sub-threshold targets plus easy pace and a weekly plan.',
      howToName: 'Calculate NSA training paces',
    },
    {
      slug: 'norwegian-singles-training-plan',
      title: 'Norwegian Singles Training Plan Generator — NSA / NSM',
      description:
        'Generate a Norwegian Singles training plan with 4.5-9 hour weekly structures, sub-threshold sessions, easy runs, and shareable plan links.',
      h1: 'Norwegian Singles training plan generator',
      intro:
        'Create a <strong>Norwegian Singles training plan</strong> from your current fitness and target weekly hours. The planner builds repeatable NSA / NSM weeks with three sub-threshold workouts, easy runs, and paces you can actually execute.',
      howToName: 'Generate a Norwegian Singles training plan',
    },
    {
      slug: 'norwegian-singles-marathon-plan',
      title: 'Norwegian Singles Marathon Plan — 15-Week NSA / NSM Build',
      description:
        'Build a 15-week Norwegian Singles marathon plan with sub-threshold sessions, marathon-pace work, long runs, tune-up races, and tapering.',
      h1: 'Norwegian Singles marathon plan builder',
      intro:
        'Use this <strong>Norwegian Singles marathon plan</strong> builder to create a 15-week countdown from your race date. It combines NSA / NSM sub-threshold training with long runs, marathon-specific workouts, tune-up races, and tapering.',
      howToName: 'Build a Norwegian Singles marathon plan',
    },
    {
      slug: 'sub-threshold-running-calculator',
      title: 'Sub-Threshold Running Calculator — NSA / NSM Pace Tool',
      description:
        'Calculate sub-threshold running paces for short, medium, and long intervals using a recent 5K or 10K performance.',
      h1: 'Sub-threshold running calculator',
      intro:
        'This <strong>sub-threshold running calculator</strong> estimates controlled workout paces for runners using NSA, NSM, or Norwegian-style threshold training. Enter a race result to get interval targets and an easy pace range for repeatable weeks.',
      howToName: 'Calculate sub-threshold running paces',
    },
    {
      slug: 'norwegian-method-recreational-runners',
      title: 'Norwegian Method for Recreational Runners — Single Sessions',
      description:
        'Apply Norwegian-style threshold training as a recreational runner with single-session NSA / NSM weeks, conservative paces, and easy running.',
      h1: 'Norwegian method for recreational runners',
      intro:
        'The <strong>Norwegian method for recreational runners</strong> works best when it is practical. This calculator focuses on single-session NSA / NSM weeks: controlled sub-threshold intervals, very easy running, and steady progression without double-threshold days.',
      howToName: 'Start Norwegian-style training as a recreational runner',
    },
  ],
  es: [
    {
      slug: 'calculadora-ritmos-nsa',
      title: 'Calculadora NSA — Ritmos Norwegian Singles',
      description:
        'Calculadora NSA gratis para corredores Norwegian Singles. Estima ritmos sub-umbral cortos, medios, largos y ritmo fácil desde 5K o 10K.',
      h1: 'Calculadora de ritmos NSA para Norwegian Singles',
      intro:
        'Usa esta <strong>calculadora NSA</strong> para convertir una marca reciente de 5K o 10K en ritmos prácticos de Norwegian Singles Approach / Method. Calcula ritmos sub-umbral cortos, medios y largos, además del ritmo fácil y una semana de entrenamiento.',
      howToName: 'Calcular ritmos de entrenamiento NSA',
    },
    {
      slug: 'plan-entrenamiento-norwegian-singles',
      title: 'Plan de entrenamiento Norwegian Singles — NSA / NSM',
      description:
        'Genera un plan Norwegian Singles de 4.5-9 horas semanales con sesiones sub-umbral, rodajes fáciles y enlace compartible.',
      h1: 'Generador de plan Norwegian Singles',
      intro:
        'Crea un <strong>plan de entrenamiento Norwegian Singles</strong> desde tu estado de forma actual y tus horas semanales. El planner genera semanas NSA / NSM repetibles con tres sesiones sub-umbral, rodajes fáciles y ritmos objetivos.',
      howToName: 'Generar un plan Norwegian Singles',
    },
    {
      slug: 'plan-maraton-norwegian-singles',
      title: 'Plan maratón Norwegian Singles — Preparación NSA / NSM',
      description:
        'Crea una preparación de maratón Norwegian Singles de 15 semanas con sesiones sub-umbral, ritmo maratón, tiradas largas y taper.',
      h1: 'Plan maratón Norwegian Singles',
      intro:
        'Usa este <strong>plan maratón Norwegian Singles</strong> para crear una cuenta atrás de 15 semanas desde tu fecha de carrera. Combina entrenamiento sub-umbral NSA / NSM con tiradas largas, sesiones a ritmo maratón, carreras de control y taper.',
      howToName: 'Crear un plan maratón Norwegian Singles',
    },
    {
      slug: 'calculadora-sub-umbral-running',
      title: 'Calculadora sub-umbral running — Ritmos NSA / NSM',
      description:
        'Calcula ritmos sub-umbral de running para intervalos cortos, medios y largos desde una marca reciente de 5K o 10K.',
      h1: 'Calculadora sub-umbral running',
      intro:
        'Esta <strong>calculadora sub-umbral running</strong> estima ritmos controlados para corredores que usan NSA, NSM o entrenamiento de umbral de estilo noruego. Introduce una marca para obtener ritmos de intervalo y ritmo fácil.',
      howToName: 'Calcular ritmos sub-umbral de running',
    },
    {
      slug: 'metodo-noruego-corredores-populares',
      title: 'Método noruego para corredores populares — Sesiones únicas',
      description:
        'Aplica entrenamiento de umbral de estilo noruego con semanas NSA / NSM de sesión única, ritmos conservadores y rodajes fáciles.',
      h1: 'Método noruego para corredores populares',
      intro:
        'El <strong>método noruego para corredores populares</strong> necesita ser práctico. Esta calculadora se centra en semanas NSA / NSM de sesión única: intervalos sub-umbral controlados, rodajes muy fáciles y progresión sostenible.',
      howToName: 'Empezar entrenamiento noruego como corredor popular',
    },
  ],
};

export function getSeoPages(locale: Locale): SeoLandingPage[] {
  return pages[locale];
}

export function getSeoPage(
  locale: Locale,
  slug: string,
): SeoLandingPage | undefined {
  return pages[locale].find((page) => page.slug === slug);
}

export function getAlternateSeoPath(
  currentPath: string,
  locale: Locale,
  alternateLocale: Locale,
): string | undefined {
  const slug = currentPath.split('/').filter(Boolean)[1];
  if (!slug) return undefined;

  const index = pages[locale].findIndex((page) => page.slug === slug);
  const alternate = pages[alternateLocale][index];

  return alternate ? `/${alternateLocale}/${alternate.slug}/` : undefined;
}

export function createSeoStructuredData(
  locale: Locale,
  page: SeoLandingPage,
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
          name: locale === 'es' ? 'Inicio' : 'Home',
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
          name: locale === 'es' ? 'Introduce tu marca' : 'Enter your race time',
          text:
            locale === 'es'
              ? 'Añade una marca reciente de 5K o 10K.'
              : 'Add a recent 5K or 10K result.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Elige horas semanales'
              : 'Choose weekly training hours',
          text:
            locale === 'es'
              ? 'Selecciona el volumen semanal que puedes repetir.'
              : 'Select the weekly volume you can repeat consistently.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Genera ritmos y plan'
              : 'Generate paces and plan',
          text:
            locale === 'es'
              ? 'Obtén ritmos sub-umbral, ritmo fácil y una semana NSA/NSM.'
              : 'Get sub-threshold paces, easy pace, and an NSA/NSM week.',
        },
      ],
    },
  ];
}
