import type { Locale } from '../types';
import { getRaceAlternateSlug } from './race-seo-pages';

export interface SeoLandingPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  howToName: string;
}

export interface SeoFaq {
  q: string;
  a: string;
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
      slug: 'norwegian-singles-calculator',
      title: 'Norwegian Singles Calculator — NSA / NSM Pace Tool',
      description:
        'Free Norwegian Singles calculator for NSA / NSM runners. Estimate sub-threshold paces, easy pace, weekly sessions, and marathon builds.',
      h1: 'Norwegian Singles calculator',
      intro:
        'Use this <strong>Norwegian Singles calculator</strong> to estimate practical NSA / NSM training paces from a recent race. It turns your 5K, 10K, half marathon, marathon, or custom distance into sub-threshold targets, easy pace, and a repeatable weekly plan.',
      howToName: 'Use the Norwegian Singles calculator',
    },
    {
      slug: 'nsm-calculator',
      title: 'NSM Calculator — Norwegian Singles Method Paces',
      description:
        'Calculate Norwegian Singles Method paces for 3, 6, and 10-minute sub-threshold intervals from a recent race result.',
      h1: 'NSM calculator for Norwegian Singles Method runners',
      intro:
        'This <strong>NSM calculator</strong> is built for runners using the Norwegian Singles Method. Enter a recent race result to estimate 3-minute, 6-minute, and 10-minute sub-threshold paces, plus easy pace and weekly training structure.',
      howToName: 'Calculate NSM training paces',
    },
    {
      slug: 'nsm-running',
      title: 'NSM Running — Norwegian Singles Method for Runners',
      description:
        'Learn NSM running basics and calculate Norwegian Singles Method paces for repeatable sub-threshold training weeks.',
      h1: 'NSM running guide and calculator',
      intro:
        '<strong>NSM running</strong> keeps Norwegian-style threshold training practical: one controlled quality session per day, short recoveries, easy running around workouts, and pace targets based on your current race fitness.',
      howToName: 'Start NSM running',
    },
    {
      slug: 'nsm-training-method',
      title: 'NSM Training Method — Norwegian Singles Workouts',
      description:
        'Use the NSM training method with 3, 6, and 10-minute sub-threshold workouts, easy runs, and weekly plans.',
      h1: 'NSM training method for everyday runners',
      intro:
        'The <strong>NSM training method</strong> organizes the week around three controlled sub-threshold workouts: long 10-minute reps, medium 6-minute reps, and short 3-minute reps. The goal is sustainable aerobic development, not maximal interval effort.',
      howToName: 'Apply the NSM training method',
    },
    {
      slug: 'norwegian-method-calculator',
      title: 'Norwegian Method Calculator — Single-Session Threshold Paces',
      description:
        'Estimate Norwegian Method-inspired threshold paces adapted into single-session NSA / NSM training weeks.',
      h1: 'Norwegian method calculator for recreational runners',
      intro:
        'This <strong>Norwegian method calculator</strong> adapts double-threshold ideas into single-session NSA / NSM weeks. Enter a race result to get practical sub-threshold paces without needing professional training volume.',
      howToName: 'Calculate Norwegian method training paces',
    },
    {
      slug: 'sub-threshold-pace-calculator',
      title: 'Sub-Threshold Pace Calculator — 3, 6, and 10-Minute Reps',
      description:
        'Calculate sub-threshold pace targets for short, medium, and long running intervals from a recent race result.',
      h1: 'Sub-threshold pace calculator',
      intro:
        'Use this <strong>sub-threshold pace calculator</strong> to choose controlled workout targets for 3-minute, 6-minute, and 10-minute repetitions. It is built for runners who want repeatable threshold work rather than all-out intervals.',
      howToName: 'Calculate sub-threshold pace',
    },
    {
      slug: 'norwegian-method-marathon-plan',
      title: 'Norwegian Method Marathon Plan — NSA / NSM Build',
      description:
        'Build a marathon plan using Norwegian-style sub-threshold training, long runs, marathon-pace work, and tapering.',
      h1: 'Norwegian method marathon plan builder',
      intro:
        'A <strong>Norwegian method marathon plan</strong> for non-professional runners should stay repeatable. This builder combines NSA / NSM sub-threshold workouts with long runs, marathon-pace sessions, and a 15-week countdown from race day.',
      howToName: 'Build a Norwegian method marathon plan',
    },
    {
      slug: 'marius-bakken-pace-calculator',
      title: 'Marius Bakken Pace Calculator — Norwegian Method Inspired',
      description:
        'Estimate Norwegian-style sub-threshold paces inspired by Marius Bakken training principles, adapted for single-session NSA / NSM weeks.',
      h1: 'Marius Bakken pace calculator for single-session training',
      intro:
        'Looking for a <strong>Marius Bakken pace calculator</strong>? This tool adapts Norwegian-style threshold ideas into practical single-session NSA / NSM weeks. It estimates controlled sub-threshold targets from your current race fitness instead of prescribing double-threshold days.',
      howToName: 'Estimate Norwegian-style training paces',
    },
    {
      slug: 'norwegian-singles-method-book',
      title: 'Norwegian Singles Method Book — Calculator Companion',
      description:
        'Explore Norwegian Singles Method book references and use a free calculator to turn NSM concepts into practical paces and plans.',
      h1: 'Norwegian Singles Method book and calculator',
      intro:
        'Runners searching for the <strong>Norwegian Singles Method book</strong> often want to turn the ideas into day-to-day training. This independent calculator complements NSM references by estimating paces, weekly sessions, and marathon builds from your own race result.',
      howToName: 'Apply Norwegian Singles Method book ideas',
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
    {
      slug: 'subthreshold-calculator-alternative',
      title: 'SubThreshold Calculator Alternative — NSA / NSM Planner',
      description:
        'Compare Norwegian Singles calculator options and generate NSA / NSM paces, weekly plans, marathon builds, and shareable links in one tool.',
      h1: 'SubThreshold calculator alternative for NSA / NSM',
      intro:
        'Looking for a <strong>SubThreshold calculator alternative</strong>? This independent Norwegian Singles planner focuses on fast pace calculation, visible weekly structure, marathon builds, and shareable plan URLs without requiring an account.',
      howToName: 'Compare and generate an NSA / NSM plan',
    },
    {
      slug: 'lactrace-alternative-norwegian-singles',
      title: 'LacTrace Alternative for Norwegian Singles — NSA / NSM Tool',
      description:
        'A lightweight LacTrace alternative for runners who want Norwegian Singles paces, weekly plans, and marathon builds from a recent race result.',
      h1: 'LacTrace alternative for Norwegian Singles runners',
      intro:
        'This <strong>LacTrace alternative</strong> is built for runners who want a simple NSA / NSM calculator first: enter a recent race, get sub-threshold paces, see the key sessions, and save or share the generated plan.',
      howToName: 'Create a Norwegian Singles plan without account setup',
    },
    {
      slug: 'norwegian-singles-calculator-comparison',
      title: 'Best Norwegian Singles Calculator — NSA / NSM Comparison',
      description:
        'Compare Norwegian Singles calculators and choose an NSA / NSM tool with pace cards, weekly plans, marathon planning, and shareable URLs.',
      h1: 'Best Norwegian Singles calculator features to look for',
      intro:
        'The <strong>best Norwegian Singles calculator</strong> should do more than output paces. It should explain the weekly structure, show key sessions, support multiple race distances, generate shareable links, and make marathon planning straightforward.',
      howToName: 'Choose a Norwegian Singles calculator',
    },
    {
      slug: 'nsa-training-plan-generator',
      title: 'NSA Training Plan Generator — Norwegian Singles Approach',
      description:
        'Generate an NSA training plan from 5K, 10K, half marathon, marathon, or custom race results with paces and weekly sessions.',
      h1: 'NSA training plan generator',
      intro:
        'Use this <strong>NSA training plan generator</strong> to convert a recent race into a repeatable Norwegian Singles Approach week. It supports 5K, 10K, half marathon, marathon, and custom race distances.',
      howToName: 'Generate an NSA training plan',
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
      slug: 'calculadora-norwegian-singles',
      title: 'Calculadora Norwegian Singles — Ritmos NSA / NSM',
      description:
        'Calculadora Norwegian Singles gratis para corredores NSA/NSM. Estima ritmos sub-umbral, ritmo fácil, sesiones semanales y maratón.',
      h1: 'Calculadora Norwegian Singles',
      intro:
        'Usa esta <strong>calculadora Norwegian Singles</strong> para estimar ritmos NSA / NSM desde una carrera reciente. Convierte tu marca de 5K, 10K, media maratón, maratón o distancia personalizada en ritmos sub-umbral, ritmo fácil y plan semanal.',
      howToName: 'Usar la calculadora Norwegian Singles',
    },
    {
      slug: 'calculadora-nsm',
      title: 'Calculadora NSM — Ritmos Norwegian Singles Method',
      description:
        'Calcula ritmos Norwegian Singles Method para intervalos sub-umbral de 3, 6 y 10 minutos desde una marca reciente.',
      h1: 'Calculadora NSM para Norwegian Singles Method',
      intro:
        'Esta <strong>calculadora NSM</strong> está pensada para corredores que usan Norwegian Singles Method. Introduce una marca reciente para estimar ritmos sub-umbral de 3, 6 y 10 minutos, además del ritmo fácil y la estructura semanal.',
      howToName: 'Calcular ritmos de entrenamiento NSM',
    },
    {
      slug: 'running-nsm',
      title: 'Running NSM — Norwegian Singles Method para corredores',
      description:
        'Aprende las bases del running NSM y calcula ritmos Norwegian Singles Method para semanas sub-umbral repetibles.',
      h1: 'Guía running NSM y calculadora',
      intro:
        'El <strong>running NSM</strong> hace práctico el entrenamiento de umbral de estilo noruego: una sesión de calidad controlada al día, recuperaciones cortas, rodajes fáciles alrededor de los entrenamientos y ritmos basados en tu forma actual.',
      howToName: 'Empezar con running NSM',
    },
    {
      slug: 'entrenamiento-nsm',
      title: 'Entrenamiento NSM — Sesiones Norwegian Singles',
      description:
        'Aplica el entrenamiento NSM con intervalos sub-umbral de 3, 6 y 10 minutos, rodajes fáciles y planes semanales.',
      h1: 'Entrenamiento NSM para corredores populares',
      intro:
        'El <strong>entrenamiento NSM</strong> organiza la semana alrededor de tres sesiones sub-umbral controladas: repeticiones largas de 10 minutos, medias de 6 minutos y cortas de 3 minutos. El objetivo es mejorar de forma sostenible, no correr intervalos al máximo.',
      howToName: 'Aplicar el entrenamiento NSM',
    },
    {
      slug: 'calculadora-metodo-noruego',
      title: 'Calculadora método noruego — Ritmos de umbral adaptados',
      description:
        'Estima ritmos inspirados en el método noruego adaptados a semanas NSA / NSM de sesión única para corredores populares.',
      h1: 'Calculadora del método noruego para corredores populares',
      intro:
        'Esta <strong>calculadora del método noruego</strong> adapta ideas de doble umbral a semanas NSA / NSM de sesión única. Introduce una marca para obtener ritmos sub-umbral prácticos sin necesitar volumen de atleta profesional.',
      howToName: 'Calcular ritmos del método noruego',
    },
    {
      slug: 'calculadora-ritmos-sub-umbral',
      title: 'Calculadora ritmos sub-umbral — Repeticiones 3, 6 y 10 min',
      description:
        'Calcula ritmos sub-umbral para intervalos cortos, medios y largos desde una marca reciente de carrera.',
      h1: 'Calculadora de ritmos sub-umbral',
      intro:
        'Usa esta <strong>calculadora de ritmos sub-umbral</strong> para elegir objetivos controlados en repeticiones de 3, 6 y 10 minutos. Está pensada para corredores que quieren trabajo de umbral repetible, no intervalos al límite.',
      howToName: 'Calcular ritmos sub-umbral',
    },
    {
      slug: 'plan-maraton-metodo-noruego',
      title: 'Plan maratón método noruego — Preparación NSA / NSM',
      description:
        'Crea un plan de maratón con entrenamiento sub-umbral de estilo noruego, tiradas largas, ritmo maratón y taper.',
      h1: 'Plan maratón con método noruego',
      intro:
        'Un <strong>plan de maratón con método noruego</strong> para corredores populares debe ser repetible. Este generador combina sesiones sub-umbral NSA / NSM con tiradas largas, trabajo a ritmo maratón y una cuenta atrás de 15 semanas.',
      howToName: 'Crear un plan maratón con método noruego',
    },
    {
      slug: 'calculadora-ritmos-marius-bakken',
      title: 'Calculadora ritmos Marius Bakken — Método noruego',
      description:
        'Estima ritmos sub-umbral de estilo noruego inspirados en principios de Marius Bakken, adaptados a semanas NSA / NSM.',
      h1: 'Calculadora de ritmos Marius Bakken para sesiones únicas',
      intro:
        'Si buscas una <strong>calculadora Marius Bakken</strong>, esta herramienta adapta ideas de umbral de estilo noruego a semanas NSA / NSM de sesión única. Estima ritmos sub-umbral controlados desde tu estado de forma actual.',
      howToName: 'Estimar ritmos de estilo noruego',
    },
    {
      slug: 'libro-norwegian-singles-method',
      title: 'Libro Norwegian Singles Method — Calculadora complementaria',
      description:
        'Consulta referencias del libro Norwegian Singles Method y usa una calculadora gratis para convertir NSM en ritmos y planes.',
      h1: 'Libro Norwegian Singles Method y calculadora',
      intro:
        'Quienes buscan el <strong>libro Norwegian Singles Method</strong> suelen querer aplicar las ideas al entrenamiento diario. Esta calculadora independiente complementa las referencias NSM estimando ritmos, semanas y preparación de maratón desde tu marca.',
      howToName: 'Aplicar ideas del libro Norwegian Singles Method',
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
    {
      slug: 'alternativa-calculadora-subthreshold',
      title: 'Alternativa a SubThreshold Calculator — Planner NSA / NSM',
      description:
        'Compara calculadoras Norwegian Singles y genera ritmos NSA / NSM, planes semanales, preparación maratón y enlaces compartibles.',
      h1: 'Alternativa a SubThreshold Calculator para NSA / NSM',
      intro:
        '¿Buscas una <strong>alternativa a SubThreshold Calculator</strong>? Este planner independiente de Norwegian Singles prioriza cálculo rápido de ritmos, estructura semanal visible, preparación maratón y URLs compartibles sin crear cuenta.',
      howToName: 'Comparar y generar un plan NSA / NSM',
    },
    {
      slug: 'alternativa-lactrace-norwegian-singles',
      title: 'Alternativa a LacTrace para Norwegian Singles — NSA / NSM',
      description:
        'Alternativa ligera a LacTrace para corredores que quieren ritmos Norwegian Singles, planes semanales y preparación maratón desde una marca reciente.',
      h1: 'Alternativa a LacTrace para corredores Norwegian Singles',
      intro:
        'Esta <strong>alternativa a LacTrace</strong> está pensada para corredores que quieren una calculadora NSA / NSM sencilla: introduce una marca reciente, obtén ritmos sub-umbral, visualiza sesiones clave y comparte el plan.',
      howToName: 'Crear un plan Norwegian Singles sin configuración de cuenta',
    },
    {
      slug: 'comparativa-calculadora-norwegian-singles',
      title: 'Mejor calculadora Norwegian Singles — Comparativa NSA / NSM',
      description:
        'Compara calculadoras Norwegian Singles y elige una herramienta NSA / NSM con ritmos, planes semanales, maratón y URLs compartibles.',
      h1: 'Qué debe tener la mejor calculadora Norwegian Singles',
      intro:
        'La <strong>mejor calculadora Norwegian Singles</strong> debe hacer más que mostrar ritmos. Tiene que explicar la semana, mostrar sesiones clave, aceptar varias distancias de carrera, generar enlaces compartibles y facilitar la preparación de maratón.',
      howToName: 'Elegir una calculadora Norwegian Singles',
    },
    {
      slug: 'generador-plan-entrenamiento-nsa',
      title: 'Generador de plan NSA — Norwegian Singles Approach',
      description:
        'Genera un plan NSA desde 5K, 10K, media maratón, maratón o distancia personalizada con ritmos y sesiones semanales.',
      h1: 'Generador de plan de entrenamiento NSA',
      intro:
        'Usa este <strong>generador de plan NSA</strong> para convertir una carrera reciente en una semana repetible de Norwegian Singles Approach. Acepta 5K, 10K, media maratón, maratón y distancias personalizadas.',
      howToName: 'Generar un plan de entrenamiento NSA',
    },
  ],
  ko: [
    {
      slug: 'nsa-pace-calculator',
      title: 'NSA 페이스 계산기 — Norwegian Singles 훈련 페이스',
      description:
        'Norwegian Singles Approach 러너를 위한 무료 NSA 페이스 계산기. 5K 또는 10K 기록으로 서브스레숄드와 이지 페이스를 추정합니다.',
      h1: 'Norwegian Singles 러너를 위한 NSA 페이스 계산기',
      intro:
        '<strong>NSA 페이스 계산기</strong>로 최근 5K 또는 10K 기록을 Norwegian Singles Approach / Method 훈련 페이스로 바꾸세요. 짧은, 중간, 긴 서브스레숄드 목표와 이지 페이스, 주간 플랜을 제공합니다.',
      howToName: 'NSA 훈련 페이스 계산하기',
    },
    {
      slug: 'norwegian-singles-calculator',
      title: 'Norwegian Singles 계산기 — NSA / NSM 페이스 도구',
      description:
        'NSA/NSM 러너를 위한 무료 Norwegian Singles 계산기. 서브스레숄드 페이스, 이지 페이스, 주간 세션, 마라톤 빌드업을 추정합니다.',
      h1: 'Norwegian Singles 계산기',
      intro:
        '<strong>Norwegian Singles 계산기</strong>는 최근 레이스 기록으로 실전적인 NSA / NSM 훈련 페이스를 계산합니다. 5K, 10K, 하프, 마라톤 또는 사용자 지정 거리에서 서브스레숄드 목표, 이지 페이스, 반복 가능한 주간 플랜을 만듭니다.',
      howToName: 'Norwegian Singles 계산기 사용하기',
    },
    {
      slug: 'nsm-calculator',
      title: 'NSM 계산기 — Norwegian Singles Method 페이스',
      description:
        '최근 레이스 기록으로 Norwegian Singles Method의 3분, 6분, 10분 서브스레숄드 페이스를 계산하세요.',
      h1: 'Norwegian Singles Method 러너를 위한 NSM 계산기',
      intro:
        '<strong>NSM 계산기</strong>는 Norwegian Singles Method를 사용하는 러너를 위해 만들었습니다. 최근 레이스 기록을 입력하면 3분, 6분, 10분 서브스레숄드 페이스와 이지 페이스, 주간 구조를 추정합니다.',
      howToName: 'NSM 훈련 페이스 계산하기',
    },
    {
      slug: 'nsm-running',
      title: 'NSM 러닝 — Norwegian Singles Method 러너 가이드',
      description:
        'NSM 러닝의 기본 구조를 배우고 Norwegian Singles Method 서브스레숄드 페이스와 반복 가능한 주간 플랜을 계산하세요.',
      h1: 'NSM 러닝 가이드와 계산기',
      intro:
        '<strong>NSM 러닝</strong>은 노르웨이식 임계값 훈련을 현실적인 방식으로 바꿉니다. 하루 한 번의 조절된 품질 세션, 짧은 회복, 운동 전후 이지런, 현재 레이스 체력 기반 페이스가 핵심입니다.',
      howToName: 'NSM 러닝 시작하기',
    },
    {
      slug: 'nsm-training',
      title: 'NSM 훈련법 — Norwegian Singles Method 워크아웃',
      description:
        'NSM 훈련법으로 3분, 6분, 10분 서브스레숄드 인터벌과 이지런을 주간 플랜에 적용하세요.',
      h1: '일반 러너를 위한 NSM 훈련법',
      intro:
        '<strong>NSM 훈련법</strong>은 세 가지 서브스레숄드 세션을 중심으로 주간을 구성합니다. 긴 10분 반복, 중간 6분 반복, 짧은 3분 반복을 사용해 한계까지 밀지 않고 지속 가능한 유산소 성장을 노립니다.',
      howToName: 'NSM 훈련법 적용하기',
    },
    {
      slug: 'norwegian-method-calculator',
      title: '노르웨이식 훈련 계산기 — 단일 세션 임계값 페이스',
      description:
        '노르웨이식 임계값 훈련을 NSA/NSM 단일 세션 주간으로 적용해 서브스레숄드 페이스를 계산하세요.',
      h1: '일반 러너를 위한 노르웨이식 훈련 계산기',
      intro:
        '이 <strong>노르웨이식 훈련 계산기</strong>는 더블 스레숄드 아이디어를 단일 세션 NSA / NSM 주간으로 바꿉니다. 레이스 기록을 입력하면 전문 선수 수준의 훈련량 없이도 실전적인 서브스레숄드 페이스를 얻을 수 있습니다.',
      howToName: '노르웨이식 훈련 페이스 계산하기',
    },
    {
      slug: 'sub-threshold-pace-calculator',
      title: '서브스레숄드 페이스 계산기 — 3, 6, 10분 반복',
      description:
        '최근 레이스 기록으로 짧은, 중간, 긴 러닝 인터벌의 서브스레숄드 페이스 목표를 계산하세요.',
      h1: '서브스레숄드 페이스 계산기',
      intro:
        '<strong>서브스레숄드 페이스 계산기</strong>로 3분, 6분, 10분 반복에 사용할 조절된 목표 페이스를 선택하세요. 전력 인터벌보다 반복 가능한 임계값 훈련을 원하는 러너에게 맞춰져 있습니다.',
      howToName: '서브스레숄드 페이스 계산하기',
    },
    {
      slug: 'norwegian-method-marathon-plan',
      title: '노르웨이식 마라톤 플랜 — NSA / NSM 빌드업',
      description:
        '노르웨이식 서브스레숄드 훈련, 롱런, 마라톤 페이스 훈련, 테이퍼를 결합한 마라톤 플랜을 만드세요.',
      h1: '노르웨이식 마라톤 플랜 빌더',
      intro:
        '일반 러너를 위한 <strong>노르웨이식 마라톤 플랜</strong>은 반복 가능해야 합니다. 이 빌더는 NSA / NSM 서브스레숄드 워크아웃, 롱런, 마라톤 페이스 세션, 레이스 당일까지의 15주 카운트다운을 결합합니다.',
      howToName: '노르웨이식 마라톤 플랜 만들기',
    },
    {
      slug: 'marius-bakken-pace-calculator',
      title: 'Marius Bakken 페이스 계산기 — 노르웨이식 훈련',
      description:
        'Marius Bakken 훈련 원칙에서 영감을 받은 노르웨이식 서브스레숄드 페이스를 NSA/NSM 단일 세션 주간으로 적용합니다.',
      h1: '단일 세션 훈련을 위한 Marius Bakken 페이스 계산기',
      intro:
        '<strong>Marius Bakken 페이스 계산기</strong>를 찾고 있다면, 이 도구는 노르웨이식 임계값 훈련 아이디어를 실용적인 NSA / NSM 단일 세션 주간으로 바꿉니다. 더블 스레숄드 대신 현재 레이스 체력에서 조절된 서브스레숄드 목표를 추정합니다.',
      howToName: '노르웨이식 훈련 페이스 추정하기',
    },
    {
      slug: 'norwegian-singles-method-book',
      title: 'Norwegian Singles Method 책 — 계산기 동반 도구',
      description:
        'Norwegian Singles Method 책과 참고 자료를 확인하고, 무료 계산기로 NSM 개념을 실제 페이스와 플랜으로 바꾸세요.',
      h1: 'Norwegian Singles Method 책과 계산기',
      intro:
        '<strong>Norwegian Singles Method 책</strong>을 찾는 러너는 보통 그 내용을 실제 훈련에 적용하고 싶어합니다. 이 독립 계산기는 자신의 레이스 기록에서 페이스, 주간 세션, 마라톤 빌드업을 추정해 NSM 참고 자료를 보완합니다.',
      howToName: 'Norwegian Singles Method 책 내용 적용하기',
    },
    {
      slug: 'norwegian-singles-training-plan',
      title: 'Norwegian Singles 훈련 플랜 생성기 — NSA / NSM',
      description:
        '서브스레숄드 세션, 이지런, 공유 가능한 링크가 포함된 주 4.5-9시간 Norwegian Singles 훈련 플랜을 생성하세요.',
      h1: 'Norwegian Singles 훈련 플랜 생성기',
      intro:
        '현재 체력과 주간 훈련 시간을 바탕으로 <strong>Norwegian Singles 훈련 플랜</strong>을 만드세요. 세 번의 서브스레숄드 세션, 이지런, 실행 가능한 페이스가 포함된 반복 가능한 NSA / NSM 주간을 생성합니다.',
      howToName: 'Norwegian Singles 훈련 플랜 생성하기',
    },
    {
      slug: 'norwegian-singles-marathon-plan',
      title: 'Norwegian Singles 마라톤 플랜 — 15주 NSA / NSM 빌드업',
      description:
        '서브스레숄드 세션, 마라톤 페이스 훈련, 롱런, 점검 레이스, 테이퍼가 포함된 15주 마라톤 플랜을 만드세요.',
      h1: 'Norwegian Singles 마라톤 플랜 빌더',
      intro:
        '<strong>Norwegian Singles 마라톤 플랜</strong> 빌더로 레이스 날짜에서 역산한 15주 빌드업을 생성하세요. NSA / NSM 서브스레숄드 훈련에 롱런, 마라톤 특화 세션, 점검 레이스, 테이퍼를 결합합니다.',
      howToName: 'Norwegian Singles 마라톤 플랜 만들기',
    },
    {
      slug: 'sub-threshold-running-calculator',
      title: '서브스레숄드 러닝 계산기 — NSA / NSM 페이스 도구',
      description:
        '최근 5K 또는 10K 기록으로 짧은, 중간, 긴 인터벌용 서브스레숄드 러닝 페이스를 계산하세요.',
      h1: '서브스레숄드 러닝 계산기',
      intro:
        '<strong>서브스레숄드 러닝 계산기</strong>는 NSA, NSM, 노르웨이식 임계값 훈련을 하는 러너에게 조절된 운동 페이스를 제공합니다. 레이스 기록을 입력하면 반복 가능한 주간을 위한 인터벌 목표와 이지 페이스를 얻을 수 있습니다.',
      howToName: '서브스레숄드 러닝 페이스 계산하기',
    },
    {
      slug: 'norwegian-method-recreational-runners',
      title: '일반 러너를 위한 노르웨이식 훈련 — 단일 세션',
      description:
        '일반 러너가 NSA/NSM 단일 세션 주간, 보수적 페이스, 이지런으로 노르웨이식 임계값 훈련을 적용하는 방법.',
      h1: '일반 러너를 위한 노르웨이식 훈련',
      intro:
        '<strong>일반 러너를 위한 노르웨이식 훈련</strong>은 실용적이어야 합니다. 이 계산기는 단일 세션 NSA / NSM 주간에 집중합니다. 조절된 서브스레숄드 인터벌, 아주 쉬운 러닝, 지속 가능한 진행을 제공합니다.',
      howToName: '일반 러너로 노르웨이식 훈련 시작하기',
    },
    {
      slug: 'subthreshold-calculator-alternative',
      title: 'SubThreshold Calculator 대안 — NSA / NSM 플래너',
      description:
        'Norwegian Singles 계산기 옵션을 비교하고 NSA/NSM 페이스, 주간 플랜, 마라톤 빌드업, 공유 링크를 한 도구에서 생성하세요.',
      h1: 'NSA / NSM을 위한 SubThreshold Calculator 대안',
      intro:
        '<strong>SubThreshold Calculator 대안</strong>을 찾고 있나요? 이 독립 Norwegian Singles 플래너는 빠른 페이스 계산, 명확한 주간 구조, 마라톤 빌드업, 계정 없는 공유 URL에 집중합니다.',
      howToName: 'NSA / NSM 플랜 비교하고 생성하기',
    },
    {
      slug: 'lactrace-alternative-norwegian-singles',
      title: 'Norwegian Singles용 LacTrace 대안 — NSA / NSM 도구',
      description:
        '최근 레이스 기록으로 Norwegian Singles 페이스, 주간 플랜, 마라톤 빌드업을 원하는 러너를 위한 가벼운 LacTrace 대안.',
      h1: 'Norwegian Singles 러너를 위한 LacTrace 대안',
      intro:
        '이 <strong>LacTrace 대안</strong>은 간단한 NSA / NSM 계산기를 원하는 러너를 위해 만들었습니다. 최근 기록을 입력하고 서브스레숄드 페이스, 핵심 세션, 공유 가능한 플랜을 확인하세요.',
      howToName: '계정 설정 없이 Norwegian Singles 플랜 만들기',
    },
    {
      slug: 'norwegian-singles-calculator-comparison',
      title: '최고의 Norwegian Singles 계산기 — NSA / NSM 비교',
      description:
        'Norwegian Singles 계산기를 비교하고 페이스 카드, 주간 플랜, 마라톤 플랜, 공유 URL을 제공하는 NSA/NSM 도구를 선택하세요.',
      h1: '좋은 Norwegian Singles 계산기의 기준',
      intro:
        '<strong>좋은 Norwegian Singles 계산기</strong>는 페이스만 보여주면 부족합니다. 주간 구조를 설명하고, 핵심 세션을 보여주며, 여러 레이스 거리를 지원하고, 공유 링크와 마라톤 플랜을 제공해야 합니다.',
      howToName: 'Norwegian Singles 계산기 선택하기',
    },
    {
      slug: 'nsa-training-plan-generator',
      title: 'NSA 훈련 플랜 생성기 — Norwegian Singles Approach',
      description:
        '5K, 10K, 하프, 마라톤 또는 사용자 지정 레이스 기록으로 페이스와 주간 세션이 포함된 NSA 플랜을 생성하세요.',
      h1: 'NSA 훈련 플랜 생성기',
      intro:
        '<strong>NSA 훈련 플랜 생성기</strong>로 최근 레이스 기록을 반복 가능한 Norwegian Singles Approach 주간으로 바꾸세요. 5K, 10K, 하프, 마라톤, 사용자 지정 거리를 지원합니다.',
      howToName: 'NSA 훈련 플랜 생성하기',
    },
  ],
};

export function getVisibleFaqs(locale: Locale): SeoFaq[] {
  if (locale === 'ko') {
    return [
      {
        q: 'NSA와 NSM은 같은 의미인가요?',
        a: '이 앱에서는 NSA를 Norwegian Singles Approach, NSM을 Norwegian Singles Method로 사용합니다. Approach와 Method는 같은 훈련 개념으로 다룹니다.',
      },
      {
        q: '공식 앱인가요?',
        a: '아니요. 러너가 Norwegian Singles 훈련 페이스와 주간 구조를 계산하도록 돕는 독립적인 비공식 도구입니다.',
      },
      {
        q: '어떤 레이스 기록을 입력할 수 있나요?',
        a: '5K, 10K, 하프 마라톤, 마라톤 또는 킬로미터 단위 사용자 지정 거리를 입력할 수 있습니다.',
      },
      {
        q: '마라톤 훈련에도 사용할 수 있나요?',
        a: '네. 마라톤 날짜를 추가하면 서브스레숄드 세션, 마라톤 페이스 훈련, 롱런, 테이퍼가 포함된 15주 빌드업을 생성합니다.',
      },
      {
        q: 'James Copeland와 어떤 관련이 있나요?',
        a: 'James Copeland는 Norwegian Singles Method의 저자입니다. 이 독립 계산기는 최근 레이스 기록을 NSM과 호환되는 페이스와 주간 구조로 바꾸는 데 도움을 줍니다.',
      },
      {
        q: 'Marius Bakken 공식 계산기인가요?',
        a: '아니요. 공식 Marius Bakken 도구가 아닙니다. 노르웨이식 임계값 훈련 원칙을 일반 러너용 단일 세션 주간으로 적용합니다.',
      },
    ];
  }

  return locale === 'es'
    ? [
        {
          q: '¿NSA y NSM significan lo mismo?',
          a: 'Sí. En esta app usamos NSA para Norwegian Singles Approach y NSM para Norwegian Singles Method. Approach y Method se tratan como el mismo concepto de entrenamiento.',
        },
        {
          q: '¿Esta app es oficial?',
          a: 'No. Es una herramienta independiente y no oficial para ayudar a corredores a estimar ritmos y organizar semanas de entrenamiento Norwegian Singles.',
        },
        {
          q: '¿Qué marcas puedo introducir?',
          a: 'Puedes introducir 5K, 10K, media maratón, maratón o una distancia personalizada en kilómetros.',
        },
        {
          q: '¿Puedo usarlo para maratón?',
          a: 'Sí. Si añades fecha de maratón, la app genera una preparación de 15 semanas con sesiones sub-umbral, ritmo maratón, tiradas largas y taper.',
        },
        {
          q: '¿Qué relación tiene con James Copeland?',
          a: 'James Copeland es el autor de Norwegian Singles Method. Esta calculadora es independiente y sirve para convertir una marca reciente en ritmos y estructuras prácticas compatibles con NSM.',
        },
        {
          q: '¿Es una calculadora de Marius Bakken?',
          a: 'No es una herramienta oficial de Marius Bakken. Adapta principios de entrenamiento noruego de umbral a semanas de sesión única para corredores populares.',
        },
      ]
    : [
        {
          q: 'Are NSA and NSM the same thing?',
          a: 'Yes. This app uses NSA for Norwegian Singles Approach and NSM for Norwegian Singles Method. Approach and Method are treated as the same training concept.',
        },
        {
          q: 'Is this app official?',
          a: 'No. This is an independent, unofficial tool that helps runners estimate paces and organize Norwegian Singles training weeks.',
        },
        {
          q: 'What race results can I enter?',
          a: 'You can enter a 5K, 10K, half marathon, marathon, or a custom race distance.',
        },
        {
          q: 'Can I use it for marathon training?',
          a: 'Yes. If you add a marathon date, the app generates a 15-week build with sub-threshold sessions, marathon-pace work, long runs, and tapering.',
        },
        {
          q: 'How does this relate to James Copeland?',
          a: 'James Copeland is the author of Norwegian Singles Method. This independent calculator helps turn recent race fitness into practical paces and weekly structures compatible with NSM.',
        },
        {
          q: 'Is this a Marius Bakken calculator?',
          a: 'It is not an official Marius Bakken tool. It adapts Norwegian-style threshold principles into single-session weeks for recreational runners.',
        },
      ];
}

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
  if (index !== -1) {
    const alternate = pages[alternateLocale][index];
    return alternate ? `/${alternateLocale}/${alternate.slug}/` : undefined;
  }

  const raceSlug = getRaceAlternateSlug(locale, slug, alternateLocale);
  return raceSlug ? `/${alternateLocale}/${raceSlug}/` : undefined;
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
          name: locale === 'es' ? 'Inicio' : locale === 'ko' ? '홈' : 'Home',
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
                : 'Enter your race time',
          text:
            locale === 'es'
              ? 'Añade una marca reciente de 5K o 10K.'
              : locale === 'ko'
                ? '최근 5K 또는 10K 기록을 입력하세요.'
                : 'Add a recent 5K or 10K result.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Elige horas semanales'
              : locale === 'ko'
                ? '주간 훈련 시간 선택'
                : 'Choose weekly training hours',
          text:
            locale === 'es'
              ? 'Selecciona el volumen semanal que puedes repetir.'
              : locale === 'ko'
                ? '꾸준히 반복할 수 있는 주간 볼륨을 선택하세요.'
                : 'Select the weekly volume you can repeat consistently.',
        },
        {
          '@type': 'HowToStep',
          name:
            locale === 'es'
              ? 'Genera ritmos y plan'
              : locale === 'ko'
                ? '페이스와 플랜 생성'
                : 'Generate paces and plan',
          text:
            locale === 'es'
              ? 'Obtén ritmos sub-umbral, ritmo fácil y una semana NSA/NSM.'
              : locale === 'ko'
                ? '서브스레숄드 페이스, 이지 페이스, NSA/NSM 주간을 확인하세요.'
                : 'Get sub-threshold paces, easy pace, and an NSA/NSM week.',
        },
      ],
    },
  ];
}
