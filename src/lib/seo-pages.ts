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
      title: 'NSA Pace Calculator: Norwegian Singles Training Paces',
      description:
        'Free NSA pace calculator for Norwegian Singles Approach runners. Estimate short, medium, long sub-threshold paces and easy pace from a 5K or 10K.',
      h1: 'NSA pace calculator for Norwegian Singles runners',
      intro:
        'Enter a recent 5K or 10K in the <strong>NSA pace calculator</strong>. You get short, medium, and long sub-threshold targets, easy pace, and a weekly plan.',
      howToName: 'Calculate NSA training paces',
    },
    {
      slug: 'norwegian-singles-calculator',
      title: 'Norwegian Singles Calculator: NSA / NSM Pace Tool',
      description:
        'Free Norwegian Singles calculator for NSA / NSM runners. Estimate sub-threshold paces, easy pace, weekly sessions, and marathon builds.',
      h1: 'Norwegian Singles calculator',
      intro:
        'Enter a 5K, 10K, half marathon, marathon, or custom distance in the <strong>Norwegian Singles calculator</strong>. You get sub-threshold targets, easy pace, and a weekly plan.',
      howToName: 'Use the Norwegian Singles calculator',
    },
    {
      slug: 'nsm-calculator',
      title: 'NSM Calculator: Norwegian Singles Method Paces',
      description:
        'Calculate Norwegian Singles Method paces for 3, 6, and 10-minute sub-threshold intervals from a recent race result.',
      h1: 'NSM calculator for Norwegian Singles Method runners',
      intro:
        'The <strong>NSM calculator</strong> turns a recent race result into 3-minute, 6-minute, and 10-minute sub-threshold paces, plus easy pace and a weekly structure.',
      howToName: 'Calculate NSM training paces',
    },
    {
      slug: 'nsm-running',
      title: 'NSM Running: Norwegian Singles Method for Runners',
      description:
        'Learn NSM running basics and calculate Norwegian Singles Method paces for repeatable sub-threshold training weeks.',
      h1: 'NSM running guide and calculator',
      intro:
        '<strong>NSM running</strong> keeps Norwegian-style threshold training manageable: one controlled quality session per day, short recoveries, easy running around workouts, and pace targets based on your current race fitness.',
      howToName: 'Start NSM running',
    },
    {
      slug: 'nsm-training-method',
      title: 'NSM Training Method: Norwegian Singles Workouts',
      description:
        'Use the NSM training method with 3, 6, and 10-minute sub-threshold workouts, easy runs, and weekly plans.',
      h1: 'NSM training method for everyday runners',
      intro:
        'The <strong>NSM training method</strong> organizes the week around three controlled sub-threshold workouts: long 10-minute reps, medium 6-minute reps, and short 3-minute reps. The goal is sustainable aerobic development, not maximal interval effort.',
      howToName: 'Apply the NSM training method',
    },
    {
      slug: 'norwegian-method-calculator',
      title: 'Norwegian Method Calculator: Single-Session Threshold Paces',
      description:
        'Estimate Norwegian Method-inspired threshold paces adapted into single-session NSA / NSM training weeks.',
      h1: 'Norwegian method calculator for recreational runners',
      intro:
        'The <strong>Norwegian method calculator</strong> adapts double-threshold ideas into single-session NSA / NSM weeks. Enter a race result to get sub-threshold paces at normal training volume.',
      howToName: 'Calculate Norwegian method training paces',
    },
    {
      slug: 'sub-threshold-pace-calculator',
      title: 'Sub-Threshold Pace Calculator: 3, 6, and 10-Minute Reps',
      description:
        'Calculate sub-threshold pace targets for short, medium, and long running intervals from a recent race result.',
      h1: 'Sub-threshold pace calculator',
      intro:
        'Use the <strong>sub-threshold pace calculator</strong> to choose targets for 3-minute, 6-minute, and 10-minute reps. Keep the work controlled enough to repeat next week.',
      howToName: 'Calculate sub-threshold pace',
    },
    {
      slug: 'norwegian-method-marathon-plan',
      title: 'Norwegian Method Marathon Plan: NSA / NSM Build',
      description:
        'Build a marathon plan using Norwegian-style sub-threshold training, long runs, marathon-pace work, and tapering.',
      h1: 'Norwegian method marathon plan builder',
      intro:
        'A <strong>Norwegian method marathon plan</strong> needs a week you can repeat. Build a 15-week countdown with sub-threshold workouts, long runs, and marathon-pace sessions.',
      howToName: 'Build a Norwegian method marathon plan',
    },
    {
      slug: 'marius-bakken-pace-calculator',
      title: 'Marius Bakken Pace Calculator: Norwegian Method Inspired',
      description:
        'Estimate Norwegian-style sub-threshold paces inspired by Marius Bakken training principles, adapted for single-session NSA / NSM weeks.',
      h1: 'Marius Bakken pace calculator for single-session training',
      intro:
        '<strong>Marius Bakken pace calculator</strong> notes help connect Norwegian threshold training with single-session NSA / NSM weeks. Enter a race result to get controlled sub-threshold targets from your current fitness.',
      howToName: 'Estimate Norwegian-style training paces',
    },
    {
      slug: 'norwegian-singles-method-book',
      title: 'Norwegian Singles Method Book: Calculator Companion',
      description:
        'Explore Norwegian Singles Method book references and use a free calculator to turn NSM concepts into paces and plans.',
      h1: 'Norwegian Singles Method book and calculator',
      intro:
        'The <strong>Norwegian Singles Method book</strong> gives the training idea. This calculator turns a recent race result into paces, weekly sessions, and marathon builds.',
      howToName: 'Apply Norwegian Singles Method book ideas',
    },
    {
      slug: 'norwegian-singles-training-plan',
      title: 'Norwegian Singles Training Plan Generator: NSA / NSM',
      description:
        'Generate a Norwegian Singles training plan with 4.5-9 hour weekly structures, sub-threshold sessions, easy runs, and shareable plan links.',
      h1: 'Norwegian Singles training plan generator',
      intro:
        'Create a <strong>Norwegian Singles training plan</strong> from your current fitness and weekly hours. The planner builds NSA / NSM weeks with three sub-threshold workouts, easy runs, and paces you can hold.',
      howToName: 'Generate a Norwegian Singles training plan',
    },
    {
      slug: 'norwegian-singles-marathon-plan',
      title: 'Norwegian Singles Marathon Plan: 15-Week NSA / NSM Build',
      description:
        'Build a 15-week Norwegian Singles marathon plan with sub-threshold sessions, marathon-pace work, long runs, tune-up races, and tapering.',
      h1: 'Norwegian Singles marathon plan builder',
      intro:
        'Use this <strong>Norwegian Singles marathon plan</strong> builder to create a 15-week countdown from your race date. It combines NSA / NSM sub-threshold training with long runs, marathon-specific workouts, tune-up races, and tapering.',
      howToName: 'Build a Norwegian Singles marathon plan',
    },
    {
      slug: 'sub-threshold-running-calculator',
      title: 'Sub-Threshold Running Calculator: NSA / NSM Pace Tool',
      description:
        'Calculate sub-threshold running paces for short, medium, and long intervals using a recent 5K or 10K performance.',
      h1: 'Sub-threshold running calculator',
      intro:
        'This <strong>sub-threshold running calculator</strong> estimates controlled workout paces for runners using NSA, NSM, or Norwegian-style threshold training. Enter a race result to get interval targets and an easy pace range for repeatable weeks.',
      howToName: 'Calculate sub-threshold running paces',
    },
    {
      slug: 'norwegian-method-recreational-runners',
      title: 'Norwegian Method for Recreational Runners: Single Sessions',
      description:
        'Apply Norwegian-style threshold training as a recreational runner with single-session NSA / NSM weeks, conservative paces, and easy running.',
      h1: 'Norwegian method for recreational runners',
      intro:
        'The <strong>Norwegian method for recreational runners</strong> works with single-session NSA / NSM weeks: controlled sub-threshold intervals, easy running, and steady progression.',
      howToName: 'Start Norwegian-style training as a recreational runner',
    },
    {
      slug: 'subthreshold-calculator-alternative',
      title: 'SubThreshold Calculator Alternative: NSA / NSM Planner',
      description:
        'Compare Norwegian Singles calculator options and generate NSA / NSM paces, weekly plans, marathon builds, and shareable links in one tool.',
      h1: 'SubThreshold calculator alternative for NSA / NSM',
      intro:
        'Use this <strong>SubThreshold calculator alternative</strong> for fast pace calculation, a visible weekly structure, marathon builds, and shareable plan URLs without an account.',
      howToName: 'Compare and generate an NSA / NSM plan',
    },
    {
      slug: 'lactrace-alternative-norwegian-singles',
      title: 'LacTrace Alternative for Norwegian Singles: NSA / NSM Tool',
      description:
        'A lightweight LacTrace alternative for runners who want Norwegian Singles paces, weekly plans, and marathon builds from a recent race result.',
      h1: 'LacTrace alternative for Norwegian Singles runners',
      intro:
        'Use this <strong>LacTrace alternative</strong> to enter a recent race, get sub-threshold paces, see the key sessions, and save or share the generated plan.',
      howToName: 'Create a Norwegian Singles plan without account setup',
    },
    {
      slug: 'norwegian-singles-calculator-comparison',
      title: 'Best Norwegian Singles Calculator: NSA / NSM Comparison',
      description:
        'Compare Norwegian Singles calculators and choose an NSA / NSM tool with pace cards, weekly plans, marathon planning, and shareable URLs.',
      h1: 'Best Norwegian Singles calculator features to look for',
      intro:
        'A useful <strong>Norwegian Singles calculator</strong> shows the weekly structure, key sessions, race-distance options, shareable links, and marathon planning.',
      howToName: 'Choose a Norwegian Singles calculator',
    },
    {
      slug: 'nsa-training-plan-generator',
      title: 'NSA Training Plan Generator: Norwegian Singles Approach',
      description:
        'Generate an NSA training plan from 5K, 10K, half marathon, marathon, or custom race results with paces and weekly sessions.',
      h1: 'NSA training plan generator',
      intro:
        'Use this <strong>NSA training plan generator</strong> to convert a recent race into a repeatable Norwegian Singles Approach week. It supports 5K, 10K, half marathon, marathon, and custom race distances.',
      howToName: 'Generate an NSA training plan',
    },
    {
      slug: 'vdot-calculator',
      title: 'VDOT Calculator: Jack Daniels Running Paces & Race Equivalents',
      description:
        "Free VDOT calculator based on Jack Daniels' running formula. Enter any race result to get Easy, Marathon, Threshold, Interval, and Repetition paces and equivalent times for five race distances.",
      h1: 'VDOT running calculator',
      intro:
        'Enter any race result in the <strong>VDOT calculator</strong> to get your VDOT score, all five Jack Daniels training zones (Easy, Marathon, Threshold, Interval, Repetition), and equivalent race-time predictions. The same form generates your full NSM weekly plan.',
      howToName: 'Calculate VDOT and training paces',
    },
    {
      slug: 'jack-daniels-running-calculator',
      title: 'Jack Daniels Running Calculator: VDOT Training Zones',
      description:
        'Calculate Jack Daniels VDOT training paces (Easy, Threshold, Interval, and Repetition) from a 5K, 10K, half marathon, or marathon result.',
      h1: 'Jack Daniels running calculator',
      intro:
        'The <strong>Jack Daniels running calculator</strong> takes a race result, computes your VDOT, and shows training paces for every zone: Easy, Marathon, Threshold, Interval, and Repetition. Add your weekly hours to get a full NSM plan.',
      howToName: 'Calculate Jack Daniels VDOT training paces',
    },
    {
      slug: 'vdot-running-formula',
      title: 'VDOT Running Formula: Training Paces & Equivalent Races',
      description:
        'Use the VDOT running formula to calculate training paces and predict equivalent race times from your current fitness.',
      h1: 'VDOT running formula calculator',
      intro:
        'The <strong>VDOT running formula</strong> converts a race result into a fitness score and uses that score to assign training paces across all five zones. Enter any distance and time to see your VDOT, zone targets, and predicted times for common race distances.',
      howToName: 'Apply the VDOT running formula',
    },
    {
      slug: 'norwegian-singles-app',
      title: 'Norwegian Singles App: Free NSA / NSM Calculator & Planner',
      description:
        'Free Norwegian Singles app for NSA / NSM runners. Calculate sub-threshold paces, build weekly plans and a 15-week marathon block right in your browser — no download.',
      h1: 'Norwegian Singles app',
      intro:
        'This free <strong>Norwegian Singles app</strong> runs in any browser — no install, no account. Enter a recent 5K or 10K to get NSA / NSM sub-threshold paces, a repeatable weekly plan, and a 15-week marathon build you can save and share.',
      howToName: 'Use the Norwegian Singles app',
    },
    {
      slug: 'james-copeland-norwegian-singles',
      title: 'James Copeland Norwegian Singles: Method Calculator',
      description:
        'Turn the James Copeland Norwegian Singles Method into real paces and plans. Free calculator for the sub-threshold single-session approach popularised by Copeland (sirpoc).',
      h1: 'James Copeland Norwegian Singles Method calculator',
      intro:
        '<strong>James Copeland</strong> (known online as sirpoc) documented the <strong>Norwegian Singles Method</strong> — repeatable sub-threshold single sessions for everyday runners. This independent calculator turns a recent race result into the 3, 6, and 10-minute paces and weekly structure described in his work.',
      howToName: 'Apply the James Copeland Norwegian Singles Method',
    },
  ],
  es: [
    {
      slug: 'calculadora-ritmos-nsa',
      title: 'Calculadora NSA: Ritmos Norwegian Singles',
      description:
        'Calculadora NSA gratis para corredores Norwegian Singles. Estima ritmos sub-umbral cortos, medios, largos y ritmo fácil desde 5K o 10K.',
      h1: 'Calculadora de ritmos NSA para Norwegian Singles',
      intro:
        'Usa esta <strong>calculadora NSA</strong> para convertir una marca reciente de 5K o 10K en ritmos de Norwegian Singles Approach / Method. Calcula ritmos sub-umbral cortos, medios y largos, ritmo fácil y una semana de entrenamiento.',
      howToName: 'Calcular ritmos de entrenamiento NSA',
    },
    {
      slug: 'calculadora-norwegian-singles',
      title: 'Calculadora Norwegian Singles: Ritmos NSA / NSM',
      description:
        'Calculadora Norwegian Singles gratis para corredores NSA/NSM. Estima ritmos sub-umbral, ritmo fácil, sesiones semanales y maratón.',
      h1: 'Calculadora Norwegian Singles',
      intro:
        'Usa esta <strong>calculadora Norwegian Singles</strong> para estimar ritmos NSA / NSM desde una carrera reciente. Convierte tu marca de 5K, 10K, media maratón, maratón o distancia personalizada en ritmos sub-umbral, ritmo fácil y plan semanal.',
      howToName: 'Usar la calculadora Norwegian Singles',
    },
    {
      slug: 'calculadora-nsm',
      title: 'Calculadora NSM: Ritmos Norwegian Singles Method',
      description:
        'Calcula ritmos Norwegian Singles Method para intervalos sub-umbral de 3, 6 y 10 minutos desde una marca reciente.',
      h1: 'Calculadora NSM para Norwegian Singles Method',
      intro:
        'Esta <strong>calculadora NSM</strong> está pensada para corredores que usan Norwegian Singles Method. Introduce una marca reciente para estimar ritmos sub-umbral de 3, 6 y 10 minutos, además del ritmo fácil y la estructura semanal.',
      howToName: 'Calcular ritmos de entrenamiento NSM',
    },
    {
      slug: 'running-nsm',
      title: 'Running NSM: Norwegian Singles Method para corredores',
      description:
        'Aprende las bases del running NSM y calcula ritmos Norwegian Singles Method para semanas sub-umbral repetibles.',
      h1: 'Guía running NSM y calculadora',
      intro:
        'El <strong>running NSM</strong> adapta el umbral de estilo noruego a una sesión de calidad controlada al día, recuperaciones cortas, rodajes fáciles y ritmos basados en tu forma actual.',
      howToName: 'Empezar con running NSM',
    },
    {
      slug: 'entrenamiento-nsm',
      title: 'Entrenamiento NSM: Sesiones Norwegian Singles',
      description:
        'Aplica el entrenamiento NSM con intervalos sub-umbral de 3, 6 y 10 minutos, rodajes fáciles y planes semanales.',
      h1: 'Entrenamiento NSM para corredores populares',
      intro:
        'El <strong>entrenamiento NSM</strong> organiza la semana alrededor de tres sesiones sub-umbral: repeticiones largas de 10 minutos, medias de 6 minutos y cortas de 3 minutos. Buscas mejora aeróbica con margen.',
      howToName: 'Aplicar el entrenamiento NSM',
    },
    {
      slug: 'calculadora-metodo-noruego',
      title: 'Calculadora método noruego: Ritmos de umbral adaptados',
      description:
        'Estima ritmos inspirados en el método noruego adaptados a semanas NSA / NSM de sesión única para corredores populares.',
      h1: 'Calculadora del método noruego para corredores populares',
      intro:
        'La <strong>calculadora del método noruego</strong> adapta el doble umbral a semanas NSA / NSM de sesión única. Introduce una marca y calcula ritmos sub-umbral con volumen normal.',
      howToName: 'Calcular ritmos del método noruego',
    },
    {
      slug: 'calculadora-ritmos-sub-umbral',
      title: 'Calculadora ritmos sub-umbral: Repeticiones 3, 6 y 10 min',
      description:
        'Calcula ritmos sub-umbral para intervalos cortos, medios y largos desde una marca reciente de carrera.',
      h1: 'Calculadora de ritmos sub-umbral',
      intro:
        'Usa la <strong>calculadora de ritmos sub-umbral</strong> para elegir objetivos en repeticiones de 3, 6 y 10 minutos. Mantén la sesión controlada para poder repetirla la semana siguiente.',
      howToName: 'Calcular ritmos sub-umbral',
    },
    {
      slug: 'plan-maraton-metodo-noruego',
      title: 'Plan maratón método noruego: Preparación NSA / NSM',
      description:
        'Crea un plan de maratón con entrenamiento sub-umbral de estilo noruego, tiradas largas, ritmo maratón y taper.',
      h1: 'Plan maratón con método noruego',
      intro:
        'Un <strong>plan de maratón con método noruego</strong> necesita una semana que puedas repetir. Crea una cuenta atrás de 15 semanas con sesiones sub-umbral, tiradas largas y ritmo maratón.',
      howToName: 'Crear un plan maratón con método noruego',
    },
    {
      slug: 'calculadora-ritmos-marius-bakken',
      title: 'Calculadora ritmos Marius Bakken: Método noruego',
      description:
        'Estima ritmos sub-umbral de estilo noruego inspirados en principios de Marius Bakken, adaptados a semanas NSA / NSM.',
      h1: 'Calculadora de ritmos Marius Bakken para sesiones únicas',
      intro:
        'La <strong>calculadora Marius Bakken</strong> conecta el trabajo de umbral noruego con semanas NSA / NSM de sesión única. Introduce una marca y calcula ritmos sub-umbral desde tu forma actual.',
      howToName: 'Estimar ritmos de estilo noruego',
    },
    {
      slug: 'libro-norwegian-singles-method',
      title: 'Libro Norwegian Singles Method: Calculadora complementaria',
      description:
        'Consulta referencias del libro Norwegian Singles Method y usa una calculadora gratis para convertir NSM en ritmos y planes.',
      h1: 'Libro Norwegian Singles Method y calculadora',
      intro:
        'El <strong>libro Norwegian Singles Method</strong> explica la idea de entrenamiento. La calculadora convierte tu marca en ritmos, semanas y preparación de maratón.',
      howToName: 'Aplicar ideas del libro Norwegian Singles Method',
    },
    {
      slug: 'plan-entrenamiento-norwegian-singles',
      title: 'Plan de entrenamiento Norwegian Singles: NSA / NSM',
      description:
        'Genera un plan Norwegian Singles de 4.5-9 horas semanales con sesiones sub-umbral, rodajes fáciles y enlace compartible.',
      h1: 'Generador de plan Norwegian Singles',
      intro:
        'Crea un <strong>plan de entrenamiento Norwegian Singles</strong> desde tu estado de forma actual y tus horas semanales. El planner genera semanas NSA / NSM repetibles con tres sesiones sub-umbral, rodajes fáciles y ritmos objetivos.',
      howToName: 'Generar un plan Norwegian Singles',
    },
    {
      slug: 'plan-maraton-norwegian-singles',
      title: 'Plan maratón Norwegian Singles: Preparación NSA / NSM',
      description:
        'Crea una preparación de maratón Norwegian Singles de 15 semanas con sesiones sub-umbral, ritmo maratón, tiradas largas y taper.',
      h1: 'Plan maratón Norwegian Singles',
      intro:
        'Usa este <strong>plan maratón Norwegian Singles</strong> para crear una cuenta atrás de 15 semanas desde tu fecha de carrera. Combina entrenamiento sub-umbral NSA / NSM con tiradas largas, sesiones a ritmo maratón, carreras de control y taper.',
      howToName: 'Crear un plan maratón Norwegian Singles',
    },
    {
      slug: 'calculadora-sub-umbral-running',
      title: 'Calculadora sub-umbral running: Ritmos NSA / NSM',
      description:
        'Calcula ritmos sub-umbral de running para intervalos cortos, medios y largos desde una marca reciente de 5K o 10K.',
      h1: 'Calculadora sub-umbral running',
      intro:
        'Esta <strong>calculadora sub-umbral running</strong> estima ritmos controlados para corredores que usan NSA, NSM o entrenamiento de umbral de estilo noruego. Introduce una marca para obtener ritmos de intervalo y ritmo fácil.',
      howToName: 'Calcular ritmos sub-umbral de running',
    },
    {
      slug: 'metodo-noruego-corredores-populares',
      title: 'Método noruego para corredores populares: Sesiones únicas',
      description:
        'Aplica entrenamiento de umbral de estilo noruego con semanas NSA / NSM de sesión única, ritmos conservadores y rodajes fáciles.',
      h1: 'Método noruego para corredores populares',
      intro:
        'El <strong>método noruego para corredores populares</strong> funciona mejor con semanas de sesión única: intervalos sub-umbral, rodajes fáciles y progresión estable.',
      howToName: 'Empezar entrenamiento noruego como corredor popular',
    },
    {
      slug: 'alternativa-calculadora-subthreshold',
      title: 'Alternativa a SubThreshold Calculator: Planner NSA / NSM',
      description:
        'Compara calculadoras Norwegian Singles y genera ritmos NSA / NSM, planes semanales, preparación maratón y enlaces compartibles.',
      h1: 'Alternativa a SubThreshold Calculator para NSA / NSM',
      intro:
        'Esta <strong>alternativa a SubThreshold Calculator</strong> calcula ritmos rápido, muestra la semana completa, prepara maratón y genera URLs compartibles sin crear cuenta.',
      howToName: 'Comparar y generar un plan NSA / NSM',
    },
    {
      slug: 'alternativa-lactrace-norwegian-singles',
      title: 'Alternativa a LacTrace para Norwegian Singles: NSA / NSM',
      description:
        'Alternativa ligera a LacTrace para corredores que quieren ritmos Norwegian Singles, planes semanales y preparación maratón desde una marca reciente.',
      h1: 'Alternativa a LacTrace para corredores Norwegian Singles',
      intro:
        'Usa esta <strong>alternativa a LacTrace</strong> para introducir una marca reciente, obtener ritmos sub-umbral, ver sesiones clave y compartir el plan.',
      howToName: 'Crear un plan Norwegian Singles sin configuración de cuenta',
    },
    {
      slug: 'comparativa-calculadora-norwegian-singles',
      title: 'Mejor calculadora Norwegian Singles: Comparativa NSA / NSM',
      description:
        'Compara calculadoras Norwegian Singles y elige una herramienta NSA / NSM con ritmos, planes semanales, maratón y URLs compartibles.',
      h1: 'Funciones útiles en una calculadora Norwegian Singles',
      intro:
        'Una buena <strong>calculadora Norwegian Singles</strong> muestra la semana, las sesiones clave, varias distancias de carrera, enlaces compartibles y preparación de maratón.',
      howToName: 'Elegir una calculadora Norwegian Singles',
    },
    {
      slug: 'generador-plan-entrenamiento-nsa',
      title: 'Generador de plan NSA: Norwegian Singles Approach',
      description:
        'Genera un plan NSA desde 5K, 10K, media maratón, maratón o distancia personalizada con ritmos y sesiones semanales.',
      h1: 'Generador de plan de entrenamiento NSA',
      intro:
        'Usa este <strong>generador de plan NSA</strong> para convertir una carrera reciente en una semana repetible de Norwegian Singles Approach. Acepta 5K, 10K, media maratón, maratón y distancias personalizadas.',
      howToName: 'Generar un plan de entrenamiento NSA',
    },
    {
      slug: 'calculadora-vdot',
      title:
        'Calculadora VDOT: Ritmos de entrenamiento y equivalencias de carrera',
      description:
        'Calculadora VDOT gratuita basada en la fórmula de Jack Daniels. Calcula ritmos Fácil, Maratón, Umbral, Intervalo y Repetición, y equivalencias de carrera desde cualquier marca.',
      h1: 'Calculadora VDOT de running',
      intro:
        'Introduce cualquier marca en la <strong>calculadora VDOT</strong> para obtener tu puntuación VDOT, las cinco zonas de entrenamiento Jack Daniels (Fácil, Maratón, Umbral, Intervalo, Repetición) y predicciones de carrera equivalentes. El mismo formulario genera tu plan NSM semanal.',
      howToName: 'Calcular VDOT y ritmos de entrenamiento',
    },
    {
      slug: 'calculadora-jack-daniels-running',
      title: 'Calculadora Jack Daniels Running: Zonas de entrenamiento VDOT',
      description:
        'Calcula los ritmos de entrenamiento VDOT de Jack Daniels (Fácil, Umbral, Intervalo y Repetición) desde una marca de 5K, 10K, media maratón o maratón.',
      h1: 'Calculadora Jack Daniels running',
      intro:
        'La <strong>calculadora Jack Daniels running</strong> toma una marca, calcula tu VDOT y muestra ritmos para cada zona: Fácil, Maratón, Umbral, Intervalo y Repetición. Añade tus horas semanales y obtienes el plan NSM completo.',
      howToName: 'Calcular ritmos de entrenamiento VDOT Jack Daniels',
    },
    {
      slug: 'formula-vdot-running',
      title: 'Fórmula VDOT Running: Ritmos de entrenamiento y equivalencias',
      description:
        'Usa la fórmula VDOT de running para calcular ritmos de entrenamiento y predecir tiempos de carrera equivalentes desde tu forma física actual.',
      h1: 'Calculadora de la fórmula VDOT de running',
      intro:
        'La <strong>fórmula VDOT de running</strong> convierte una marca en una puntuación de forma física y asigna ritmos de entrenamiento para cada zona. Introduce cualquier distancia y tiempo para ver tu VDOT, los cinco objetivos de zona y los tiempos equivalentes en distancias habituales.',
      howToName: 'Aplicar la fórmula VDOT de running',
    },
    {
      slug: 'app-norwegian-singles',
      title: 'App Norwegian Singles: Calculadora y planificador NSA / NSM',
      description:
        'App Norwegian Singles gratis para corredores NSA / NSM. Calcula ritmos sub-umbral, crea planes semanales y un bloque de maratón de 15 semanas en el navegador, sin descargar nada.',
      h1: 'App Norwegian Singles',
      intro:
        'Esta <strong>app Norwegian Singles</strong> gratuita funciona en cualquier navegador, sin instalar y sin cuenta. Introduce una marca reciente de 5K o 10K para obtener ritmos sub-umbral NSA / NSM, un plan semanal repetible y una preparación de maratón de 15 semanas que puedes guardar y compartir.',
      howToName: 'Usar la app Norwegian Singles',
    },
    {
      slug: 'james-copeland-norwegian-singles',
      title: 'James Copeland Norwegian Singles: Calculadora del método',
      description:
        'Convierte el Norwegian Singles Method de James Copeland en ritmos y planes reales. Calculadora gratis del enfoque sub-umbral de sesión única popularizado por Copeland (sirpoc).',
      h1: 'Calculadora del método Norwegian Singles de James Copeland',
      intro:
        '<strong>James Copeland</strong> (conocido como sirpoc) documentó el <strong>Norwegian Singles Method</strong>: sesiones únicas sub-umbral repetibles para corredores populares. Esta calculadora independiente convierte una marca reciente en los ritmos de 3, 6 y 10 minutos y la estructura semanal de su método.',
      howToName: 'Aplicar el método Norwegian Singles de James Copeland',
    },
  ],
  ko: [
    {
      slug: 'nsa-pace-calculator',
      title: 'NSA 페이스 계산기: Norwegian Singles 훈련 페이스',
      description:
        'Norwegian Singles Approach 러너를 위한 무료 NSA 페이스 계산기. 5K 또는 10K 기록으로 서브스레숄드와 이지 페이스를 추정합니다.',
      h1: 'Norwegian Singles 러너를 위한 NSA 페이스 계산기',
      intro:
        '<strong>NSA 페이스 계산기</strong>로 최근 5K 또는 10K 기록을 Norwegian Singles Approach / Method 훈련 페이스로 바꾸세요. 짧은, 중간, 긴 서브스레숄드 목표와 이지 페이스, 주간 플랜을 제공합니다.',
      howToName: 'NSA 훈련 페이스 계산하기',
    },
    {
      slug: 'norwegian-singles-calculator',
      title: 'Norwegian Singles 계산기: NSA / NSM 페이스 도구',
      description:
        'NSA/NSM 러너를 위한 무료 Norwegian Singles 계산기. 서브스레숄드 페이스, 이지 페이스, 주간 세션, 마라톤 빌드업을 추정합니다.',
      h1: 'Norwegian Singles 계산기',
      intro:
        '<strong>Norwegian Singles 계산기</strong>는 최근 레이스 기록으로 실전적인 NSA / NSM 훈련 페이스를 계산합니다. 5K, 10K, 하프, 마라톤 또는 사용자 지정 거리에서 서브스레숄드 목표, 이지 페이스, 반복 가능한 주간 플랜을 만듭니다.',
      howToName: 'Norwegian Singles 계산기 사용하기',
    },
    {
      slug: 'nsm-calculator',
      title: 'NSM 계산기: Norwegian Singles Method 페이스',
      description:
        '최근 레이스 기록으로 Norwegian Singles Method의 3분, 6분, 10분 서브스레숄드 페이스를 계산하세요.',
      h1: 'Norwegian Singles Method 러너를 위한 NSM 계산기',
      intro:
        '<strong>NSM 계산기</strong>는 Norwegian Singles Method를 사용하는 러너를 위해 만들었습니다. 최근 레이스 기록을 입력하면 3분, 6분, 10분 서브스레숄드 페이스와 이지 페이스, 주간 구조를 추정합니다.',
      howToName: 'NSM 훈련 페이스 계산하기',
    },
    {
      slug: 'nsm-running',
      title: 'NSM 러닝: Norwegian Singles Method 러너 가이드',
      description:
        'NSM 러닝의 기본 구조를 배우고 Norwegian Singles Method 서브스레숄드 페이스와 반복 가능한 주간 플랜을 계산하세요.',
      h1: 'NSM 러닝 가이드와 계산기',
      intro:
        '<strong>NSM 러닝</strong>은 노르웨이식 임계값 훈련을 현실적인 방식으로 바꿉니다. 하루 한 번의 조절된 품질 세션, 짧은 회복, 운동 전후 이지런, 현재 레이스 체력 기반 페이스가 핵심입니다.',
      howToName: 'NSM 러닝 시작하기',
    },
    {
      slug: 'nsm-training',
      title: 'NSM 훈련법: Norwegian Singles Method 워크아웃',
      description:
        'NSM 훈련법으로 3분, 6분, 10분 서브스레숄드 인터벌과 이지런을 주간 플랜에 적용하세요.',
      h1: '일반 러너를 위한 NSM 훈련법',
      intro:
        '<strong>NSM 훈련법</strong>은 세 가지 서브스레숄드 세션을 중심으로 주간을 구성합니다. 긴 10분 반복, 중간 6분 반복, 짧은 3분 반복을 사용해 한계까지 밀지 않고 지속 가능한 유산소 성장을 노립니다.',
      howToName: 'NSM 훈련법 적용하기',
    },
    {
      slug: 'norwegian-method-calculator',
      title: '노르웨이식 훈련 계산기: 단일 세션 임계값 페이스',
      description:
        '노르웨이식 임계값 훈련을 NSA/NSM 단일 세션 주간으로 적용해 서브스레숄드 페이스를 계산하세요.',
      h1: '일반 러너를 위한 노르웨이식 훈련 계산기',
      intro:
        '이 <strong>노르웨이식 훈련 계산기</strong>는 더블 스레숄드 아이디어를 단일 세션 NSA / NSM 주간으로 바꿉니다. 레이스 기록을 입력하면 전문 선수 수준의 훈련량 없이도 실전적인 서브스레숄드 페이스를 얻을 수 있습니다.',
      howToName: '노르웨이식 훈련 페이스 계산하기',
    },
    {
      slug: 'sub-threshold-pace-calculator',
      title: '서브스레숄드 페이스 계산기: 3, 6, 10분 반복',
      description:
        '최근 레이스 기록으로 짧은, 중간, 긴 러닝 인터벌의 서브스레숄드 페이스 목표를 계산하세요.',
      h1: '서브스레숄드 페이스 계산기',
      intro:
        '<strong>서브스레숄드 페이스 계산기</strong>로 3분, 6분, 10분 반복에 사용할 조절된 목표 페이스를 선택하세요. 전력 인터벌보다 반복 가능한 임계값 훈련을 원하는 러너에게 맞춰져 있습니다.',
      howToName: '서브스레숄드 페이스 계산하기',
    },
    {
      slug: 'norwegian-method-marathon-plan',
      title: '노르웨이식 마라톤 플랜: NSA / NSM 빌드업',
      description:
        '노르웨이식 서브스레숄드 훈련, 롱런, 마라톤 페이스 훈련, 테이퍼를 결합한 마라톤 플랜을 만드세요.',
      h1: '노르웨이식 마라톤 플랜 빌더',
      intro:
        '일반 러너를 위한 <strong>노르웨이식 마라톤 플랜</strong>은 반복 가능해야 합니다. 이 빌더는 NSA / NSM 서브스레숄드 워크아웃, 롱런, 마라톤 페이스 세션, 레이스 당일까지의 15주 카운트다운을 결합합니다.',
      howToName: '노르웨이식 마라톤 플랜 만들기',
    },
    {
      slug: 'marius-bakken-pace-calculator',
      title: 'Marius Bakken 페이스 계산기: 노르웨이식 훈련',
      description:
        'Marius Bakken 훈련 원칙에서 영감을 받은 노르웨이식 서브스레숄드 페이스를 NSA/NSM 단일 세션 주간으로 적용합니다.',
      h1: '단일 세션 훈련을 위한 Marius Bakken 페이스 계산기',
      intro:
        '<strong>Marius Bakken 페이스 계산기</strong>를 찾고 있다면, 이 도구는 노르웨이식 임계값 훈련 아이디어를 실용적인 NSA / NSM 단일 세션 주간으로 바꿉니다. 더블 스레숄드 대신 현재 레이스 체력에서 조절된 서브스레숄드 목표를 추정합니다.',
      howToName: '노르웨이식 훈련 페이스 추정하기',
    },
    {
      slug: 'norwegian-singles-method-book',
      title: 'Norwegian Singles Method 책: 계산기 동반 도구',
      description:
        'Norwegian Singles Method 책과 참고 자료를 확인하고, 무료 계산기로 NSM 개념을 실제 페이스와 플랜으로 바꾸세요.',
      h1: 'Norwegian Singles Method 책과 계산기',
      intro:
        '<strong>Norwegian Singles Method 책</strong>을 찾는 러너는 보통 그 내용을 실제 훈련에 적용하고 싶어합니다. 이 독립 계산기는 자신의 레이스 기록에서 페이스, 주간 세션, 마라톤 빌드업을 추정해 NSM 참고 자료를 보완합니다.',
      howToName: 'Norwegian Singles Method 책 내용 적용하기',
    },
    {
      slug: 'norwegian-singles-training-plan',
      title: 'Norwegian Singles 훈련 플랜 생성기: NSA / NSM',
      description:
        '서브스레숄드 세션, 이지런, 공유 가능한 링크가 포함된 주 4.5-9시간 Norwegian Singles 훈련 플랜을 생성하세요.',
      h1: 'Norwegian Singles 훈련 플랜 생성기',
      intro:
        '현재 체력과 주간 훈련 시간을 바탕으로 <strong>Norwegian Singles 훈련 플랜</strong>을 만드세요. 세 번의 서브스레숄드 세션, 이지런, 실행 가능한 페이스가 포함된 반복 가능한 NSA / NSM 주간을 생성합니다.',
      howToName: 'Norwegian Singles 훈련 플랜 생성하기',
    },
    {
      slug: 'norwegian-singles-marathon-plan',
      title: 'Norwegian Singles 마라톤 플랜: 15주 NSA / NSM 빌드업',
      description:
        '서브스레숄드 세션, 마라톤 페이스 훈련, 롱런, 점검 레이스, 테이퍼가 포함된 15주 마라톤 플랜을 만드세요.',
      h1: 'Norwegian Singles 마라톤 플랜 빌더',
      intro:
        '<strong>Norwegian Singles 마라톤 플랜</strong> 빌더로 레이스 날짜에서 역산한 15주 빌드업을 생성하세요. NSA / NSM 서브스레숄드 훈련에 롱런, 마라톤 특화 세션, 점검 레이스, 테이퍼를 결합합니다.',
      howToName: 'Norwegian Singles 마라톤 플랜 만들기',
    },
    {
      slug: 'sub-threshold-running-calculator',
      title: '서브스레숄드 러닝 계산기: NSA / NSM 페이스 도구',
      description:
        '최근 5K 또는 10K 기록으로 짧은, 중간, 긴 인터벌용 서브스레숄드 러닝 페이스를 계산하세요.',
      h1: '서브스레숄드 러닝 계산기',
      intro:
        '<strong>서브스레숄드 러닝 계산기</strong>는 NSA, NSM, 노르웨이식 임계값 훈련을 하는 러너에게 조절된 운동 페이스를 제공합니다. 레이스 기록을 입력하면 반복 가능한 주간을 위한 인터벌 목표와 이지 페이스를 얻을 수 있습니다.',
      howToName: '서브스레숄드 러닝 페이스 계산하기',
    },
    {
      slug: 'norwegian-method-recreational-runners',
      title: '일반 러너를 위한 노르웨이식 훈련: 단일 세션',
      description:
        '일반 러너가 NSA/NSM 단일 세션 주간, 보수적 페이스, 이지런으로 노르웨이식 임계값 훈련을 적용하는 방법.',
      h1: '일반 러너를 위한 노르웨이식 훈련',
      intro:
        '<strong>일반 러너를 위한 노르웨이식 훈련</strong>은 실용적이어야 합니다. 이 계산기는 단일 세션 NSA / NSM 주간에 집중합니다. 조절된 서브스레숄드 인터벌, 아주 쉬운 러닝, 지속 가능한 진행을 제공합니다.',
      howToName: '일반 러너로 노르웨이식 훈련 시작하기',
    },
    {
      slug: 'subthreshold-calculator-alternative',
      title: 'SubThreshold Calculator 대안: NSA / NSM 플래너',
      description:
        'Norwegian Singles 계산기 옵션을 비교하고 NSA/NSM 페이스, 주간 플랜, 마라톤 빌드업, 공유 링크를 한 도구에서 생성하세요.',
      h1: 'NSA / NSM을 위한 SubThreshold Calculator 대안',
      intro:
        '<strong>SubThreshold Calculator 대안</strong>을 찾고 있나요? 이 독립 Norwegian Singles 플래너는 빠른 페이스 계산, 명확한 주간 구조, 마라톤 빌드업, 계정 없는 공유 URL에 집중합니다.',
      howToName: 'NSA / NSM 플랜 비교하고 생성하기',
    },
    {
      slug: 'lactrace-alternative-norwegian-singles',
      title: 'Norwegian Singles용 LacTrace 대안: NSA / NSM 도구',
      description:
        '최근 레이스 기록으로 Norwegian Singles 페이스, 주간 플랜, 마라톤 빌드업을 원하는 러너를 위한 가벼운 LacTrace 대안.',
      h1: 'Norwegian Singles 러너를 위한 LacTrace 대안',
      intro:
        '이 <strong>LacTrace 대안</strong>은 간단한 NSA / NSM 계산기를 원하는 러너를 위해 만들었습니다. 최근 기록을 입력하고 서브스레숄드 페이스, 핵심 세션, 공유 가능한 플랜을 확인하세요.',
      howToName: '계정 설정 없이 Norwegian Singles 플랜 만들기',
    },
    {
      slug: 'norwegian-singles-calculator-comparison',
      title: '최고의 Norwegian Singles 계산기: NSA / NSM 비교',
      description:
        'Norwegian Singles 계산기를 비교하고 페이스 카드, 주간 플랜, 마라톤 플랜, 공유 URL을 제공하는 NSA/NSM 도구를 선택하세요.',
      h1: '좋은 Norwegian Singles 계산기의 기준',
      intro:
        '<strong>좋은 Norwegian Singles 계산기</strong>는 페이스만 보여주면 부족합니다. 주간 구조를 설명하고, 핵심 세션을 보여주며, 여러 레이스 거리를 지원하고, 공유 링크와 마라톤 플랜을 제공해야 합니다.',
      howToName: 'Norwegian Singles 계산기 선택하기',
    },
    {
      slug: 'nsa-training-plan-generator',
      title: 'NSA 훈련 플랜 생성기: Norwegian Singles Approach',
      description:
        '5K, 10K, 하프, 마라톤 또는 사용자 지정 레이스 기록으로 페이스와 주간 세션이 포함된 NSA 플랜을 생성하세요.',
      h1: 'NSA 훈련 플랜 생성기',
      intro:
        '<strong>NSA 훈련 플랜 생성기</strong>로 최근 레이스 기록을 반복 가능한 Norwegian Singles Approach 주간으로 바꾸세요. 5K, 10K, 하프, 마라톤, 사용자 지정 거리를 지원합니다.',
      howToName: 'NSA 훈련 플랜 생성하기',
    },
    {
      slug: 'vdot-calculator',
      title: 'VDOT 계산기: 잭 대니얼스 훈련 페이스 및 레이스 등가',
      description:
        '잭 대니얼스 공식 기반 무료 VDOT 계산기. 어떤 레이스 기록에서도 이지, 마라톤, 역치, 인터벌, 반복 페이스와 레이스 등가를 계산하세요.',
      h1: 'VDOT 러닝 계산기',
      intro:
        '<strong>VDOT 계산기</strong>에 어떤 레이스 기록이든 입력하면 VDOT 점수, 잭 대니얼스 5가지 훈련 구역(이지, 마라톤, 역치, 인터벌, 반복), 레이스 등가 예측을 확인할 수 있습니다. 같은 양식으로 전체 NSM 주간 플랜을 생성할 수 있습니다.',
      howToName: 'VDOT 및 훈련 페이스 계산하기',
    },
    {
      slug: 'jack-daniels-running-calculator',
      title: '잭 대니얼스 러닝 계산기: VDOT 훈련 구역',
      description:
        '5K, 10K, 하프, 마라톤 기록으로 잭 대니얼스 VDOT 훈련 페이스(이지, 역치, 인터벌, 반복)를 계산하세요.',
      h1: '잭 대니얼스 러닝 계산기',
      intro:
        '<strong>잭 대니얼스 러닝 계산기</strong>는 레이스 기록으로 VDOT를 계산하고 모든 구역의 훈련 페이스(이지, 마라톤, 역치, 인터벌, 반복)를 보여줍니다. 주간 훈련 시간을 추가하면 전체 NSM 플랜을 생성할 수 있습니다.',
      howToName: '잭 대니얼스 VDOT 훈련 페이스 계산하기',
    },
    {
      slug: 'vdot-running-formula',
      title: 'VDOT 러닝 공식: 훈련 페이스 및 레이스 등가',
      description:
        'VDOT 러닝 공식으로 현재 체력에서 훈련 페이스를 계산하고 레이스 등가 기록을 예측하세요.',
      h1: 'VDOT 러닝 공식 계산기',
      intro:
        '<strong>VDOT 러닝 공식</strong>은 레이스 기록을 체력 점수로 변환하고 그 점수에 따라 5가지 훈련 구역 페이스를 할당합니다. 어떤 거리와 시간이든 입력하면 VDOT, 구역별 목표 페이스, 주요 레이스 등가 기록을 확인할 수 있습니다.',
      howToName: 'VDOT 러닝 공식 적용하기',
    },
    {
      slug: 'norwegian-singles-app',
      title: 'Norwegian Singles 앱: 무료 NSA / NSM 계산기 및 플래너',
      description:
        'NSA / NSM 러너를 위한 무료 Norwegian Singles 앱. 다운로드 없이 브라우저에서 서브스레숄드 페이스, 주간 플랜, 15주 마라톤 빌드업을 계산하세요.',
      h1: 'Norwegian Singles 앱',
      intro:
        '이 무료 <strong>Norwegian Singles 앱</strong>은 설치나 계정 없이 어떤 브라우저에서도 작동합니다. 최근 5K 또는 10K 기록을 입력하면 NSA / NSM 서브스레숄드 페이스, 반복 가능한 주간 플랜, 저장·공유 가능한 15주 마라톤 빌드업을 얻을 수 있습니다.',
      howToName: 'Norwegian Singles 앱 사용하기',
    },
    {
      slug: 'james-copeland-norwegian-singles',
      title: 'James Copeland Norwegian Singles: 방법 계산기',
      description:
        'James Copeland의 Norwegian Singles Method를 실제 페이스와 플랜으로 바꾸세요. Copeland(sirpoc)가 대중화한 단일 세션 서브스레숄드 방식을 위한 무료 계산기.',
      h1: 'James Copeland Norwegian Singles Method 계산기',
      intro:
        '<strong>James Copeland</strong>(온라인에서 sirpoc로 알려짐)는 일반 러너를 위한 반복 가능한 단일 세션 서브스레숄드 훈련인 <strong>Norwegian Singles Method</strong>를 정리했습니다. 이 독립 계산기는 최근 레이스 기록을 그의 방법에 나오는 3분, 6분, 10분 페이스와 주간 구조로 바꿉니다.',
      howToName: 'James Copeland Norwegian Singles Method 적용하기',
    },
  ],
  de: [
    {
      slug: 'nsa-pace-rechner',
      title: 'NSA Pace-Rechner: Norwegian Singles Trainingspaces',
      description:
        'Kostenloser NSA Pace-Rechner für Norwegian Singles Approach. Schätze kurze, mittlere und lange Sub-Threshold-Paces sowie das lockere Tempo aus einer 5K oder 10K.',
      h1: 'NSA Pace-Rechner für Norwegian Singles Läufer',
      intro:
        'Gib eine aktuelle 5K oder 10K in den <strong>NSA Pace-Rechner</strong> ein. Du erhältst kurze, mittlere und lange Sub-Threshold-Ziele, lockeres Tempo und einen Wochenplan.',
      howToName: 'NSA Trainingspaces berechnen',
    },
    {
      slug: 'norwegian-singles-rechner',
      title: 'Norwegian Singles Rechner: NSA / NSM Pace-Tool',
      description:
        'Kostenloser Norwegian Singles Rechner für NSA / NSM. Schätze Sub-Threshold-Paces, lockeres Tempo, Wocheneinheiten und Marathon-Aufbauten.',
      h1: 'Norwegian Singles Rechner',
      intro:
        'Gib eine 5K, 10K, Halbmarathon, Marathon oder eigene Distanz in den <strong>Norwegian Singles Rechner</strong> ein. Du erhältst Sub-Threshold-Ziele, lockeres Tempo und einen Wochenplan.',
      howToName: 'Den Norwegian Singles Rechner nutzen',
    },
    {
      slug: 'nsm-rechner',
      title: 'NSM Rechner: Norwegian Singles Method Paces',
      description:
        'Berechne Norwegian Singles Method Paces für 3-, 6- und 10-Minuten-Sub-Threshold-Intervalle aus einem aktuellen Rennergebnis.',
      h1: 'NSM Rechner für Norwegian Singles Method Läufer',
      intro:
        'Der <strong>NSM Rechner</strong> macht aus einem aktuellen Rennergebnis 3-, 6- und 10-Minuten-Sub-Threshold-Paces plus lockeres Tempo und eine Wochenstruktur.',
      howToName: 'NSM Trainingspaces berechnen',
    },
    {
      slug: 'nsm-running',
      title: 'NSM Running: Norwegian Singles Method für Läufer',
      description:
        'Lerne die Grundlagen von NSM Running und berechne Norwegian Singles Method Paces für wiederholbare Sub-Threshold-Wochen.',
      h1: 'NSM Running Guide und Rechner',
      intro:
        '<strong>NSM Running</strong> hält norwegisches Schwellentraining machbar: eine kontrollierte Qualitätseinheit pro Tag, kurze Pausen, lockeres Laufen drumherum und Pace-Ziele aus deiner aktuellen Form.',
      howToName: 'Mit NSM Running starten',
    },
    {
      slug: 'nsm-trainingsmethode',
      title: 'NSM Trainingsmethode: Norwegian Singles Einheiten',
      description:
        'Nutze die NSM Trainingsmethode mit 3-, 6- und 10-Minuten-Sub-Threshold-Einheiten, lockeren Läufen und Wochenplänen.',
      h1: 'NSM Trainingsmethode für Hobbyläufer',
      intro:
        'Die <strong>NSM Trainingsmethode</strong> baut die Woche um drei kontrollierte Sub-Threshold-Einheiten: lange 10-Minuten-, mittlere 6-Minuten- und kurze 3-Minuten-Intervalle. Ziel ist nachhaltige aerobe Entwicklung, nicht maximaler Intervall-Stress.',
      howToName: 'Die NSM Trainingsmethode anwenden',
    },
    {
      slug: 'norwegische-methode-rechner',
      title: 'Norwegische Methode Rechner: Schwellenpaces für Einzeleinheiten',
      description:
        'Schätze von der norwegischen Methode inspirierte Schwellenpaces, übertragen in NSA / NSM Wochen mit Einzeleinheiten.',
      h1: 'Norwegische Methode Rechner für Hobbyläufer',
      intro:
        'Der <strong>Rechner für die norwegische Methode</strong> überträgt Double-Threshold-Ideen in NSA / NSM Wochen mit Einzeleinheiten. Gib ein Rennergebnis ein und erhalte Sub-Threshold-Paces bei normalem Umfang.',
      howToName: 'Trainingspaces der norwegischen Methode berechnen',
    },
    {
      slug: 'sub-threshold-pace-rechner',
      title: 'Sub-Threshold Pace-Rechner: 3-, 6- und 10-Minuten-Intervalle',
      description:
        'Berechne Sub-Threshold-Pace-Ziele für kurze, mittlere und lange Laufintervalle aus einem aktuellen Rennergebnis.',
      h1: 'Sub-Threshold Pace-Rechner',
      intro:
        'Nutze den <strong>Sub-Threshold Pace-Rechner</strong>, um Ziele für 3-, 6- und 10-Minuten-Intervalle zu wählen. Halte die Arbeit so kontrolliert, dass du sie nächste Woche wiederholen kannst.',
      howToName: 'Sub-Threshold-Pace berechnen',
    },
    {
      slug: 'norwegische-methode-marathonplan',
      title: 'Norwegische Methode Marathonplan: NSA / NSM Aufbau',
      description:
        'Baue einen Marathonplan mit norwegischem Sub-Threshold-Training, langen Läufen, Marathon-Pace-Arbeit und Tapering.',
      h1: 'Marathonplan-Builder nach norwegischer Methode',
      intro:
        'Ein <strong>Marathonplan nach norwegischer Methode</strong> braucht eine wiederholbare Woche. Baue einen 15-Wochen-Countdown mit Sub-Threshold-Einheiten, langen Läufen und Marathon-Pace-Einheiten.',
      howToName: 'Einen Marathonplan nach norwegischer Methode bauen',
    },
    {
      slug: 'marius-bakken-pace-rechner',
      title:
        'Marius Bakken Pace-Rechner: Inspiriert von der norwegischen Methode',
      description:
        'Schätze norwegische Sub-Threshold-Paces inspiriert von Marius-Bakken-Prinzipien, übertragen in NSA / NSM Wochen mit Einzeleinheiten.',
      h1: 'Marius Bakken Pace-Rechner für Einzeleinheiten',
      intro:
        '<strong>Marius Bakken Pace-Rechner</strong>-Notizen verbinden norwegisches Schwellentraining mit NSA / NSM Wochen aus Einzeleinheiten. Gib ein Rennergebnis ein und erhalte kontrollierte Sub-Threshold-Ziele aus deiner aktuellen Form.',
      howToName: 'Norwegische Trainingspaces schätzen',
    },
    {
      slug: 'norwegian-singles-method-buch',
      title: 'Norwegian Singles Method Buch: Rechner-Begleiter',
      description:
        'Entdecke Referenzen zum Norwegian Singles Method Buch und nutze einen kostenlosen Rechner, der NSM-Konzepte in Paces und Pläne übersetzt.',
      h1: 'Norwegian Singles Method Buch und Rechner',
      intro:
        'Das <strong>Norwegian Singles Method Buch</strong> liefert die Trainingsidee. Dieser Rechner macht aus einem aktuellen Rennergebnis Paces, Wocheneinheiten und Marathon-Aufbauten.',
      howToName: 'Ideen aus dem Norwegian Singles Method Buch anwenden',
    },
    {
      slug: 'norwegian-singles-trainingsplan',
      title: 'Norwegian Singles Trainingsplan-Generator: NSA / NSM',
      description:
        'Erstelle einen Norwegian Singles Trainingsplan mit 4.5-9-Stunden-Wochen, Sub-Threshold-Einheiten, lockeren Läufen und teilbaren Plan-Links.',
      h1: 'Norwegian Singles Trainingsplan-Generator',
      intro:
        'Erstelle einen <strong>Norwegian Singles Trainingsplan</strong> aus deiner aktuellen Form und deinen Wochenstunden. Der Planer baut NSA / NSM Wochen mit drei Sub-Threshold-Einheiten, lockeren Läufen und haltbaren Paces.',
      howToName: 'Einen Norwegian Singles Trainingsplan erstellen',
    },
    {
      slug: 'norwegian-singles-marathonplan',
      title: 'Norwegian Singles Marathonplan: 15-Wochen NSA / NSM Aufbau',
      description:
        'Baue einen 15-wöchigen Norwegian Singles Marathonplan mit Sub-Threshold-Einheiten, Marathon-Pace-Arbeit, langen Läufen, Tune-up-Rennen und Tapering.',
      h1: 'Norwegian Singles Marathonplan-Builder',
      intro:
        'Nutze diesen <strong>Norwegian Singles Marathonplan</strong>-Builder für einen 15-Wochen-Countdown ab deinem Renndatum. Er kombiniert NSA / NSM Sub-Threshold-Training mit langen Läufen, marathonspezifischen Einheiten, Tune-up-Rennen und Tapering.',
      howToName: 'Einen Norwegian Singles Marathonplan bauen',
    },
    {
      slug: 'sub-threshold-running-rechner',
      title: 'Sub-Threshold Running Rechner: NSA / NSM Pace-Tool',
      description:
        'Berechne Sub-Threshold-Laufpaces für kurze, mittlere und lange Intervalle aus einer aktuellen 5K oder 10K.',
      h1: 'Sub-Threshold Running Rechner',
      intro:
        'Dieser <strong>Sub-Threshold Running Rechner</strong> schätzt kontrollierte Trainingspaces für Läufer mit NSA, NSM oder norwegischem Schwellentraining. Gib ein Rennergebnis ein und erhalte Intervallziele und einen lockeren Pace-Bereich für wiederholbare Wochen.',
      howToName: 'Sub-Threshold-Laufpaces berechnen',
    },
    {
      slug: 'norwegische-methode-hobbylaeufer',
      title: 'Norwegische Methode für Hobbyläufer: Einzeleinheiten',
      description:
        'Wende norwegisches Schwellentraining als Hobbyläufer an, mit NSA / NSM Wochen aus Einzeleinheiten, konservativen Paces und lockerem Laufen.',
      h1: 'Norwegische Methode für Hobbyläufer',
      intro:
        'Die <strong>norwegische Methode für Hobbyläufer</strong> funktioniert mit NSA / NSM Wochen aus Einzeleinheiten: kontrollierte Sub-Threshold-Intervalle, lockeres Laufen und stetige Steigerung.',
      howToName: 'Als Hobbyläufer norwegisch trainieren',
    },
    {
      slug: 'subthreshold-rechner-alternative',
      title: 'SubThreshold Calculator Alternative: NSA / NSM Planer',
      description:
        'Vergleiche Norwegian Singles Rechner und erstelle NSA / NSM Paces, Wochenpläne, Marathon-Aufbauten und teilbare Links in einem Tool.',
      h1: 'SubThreshold Calculator Alternative für NSA / NSM',
      intro:
        'Nutze diese <strong>SubThreshold Calculator Alternative</strong> für schnelle Pace-Berechnung, eine sichtbare Wochenstruktur, Marathon-Aufbauten und teilbare Plan-URLs ohne Account.',
      howToName: 'Einen NSA / NSM Plan vergleichen und erstellen',
    },
    {
      slug: 'lactrace-alternative-norwegian-singles',
      title: 'LacTrace Alternative für Norwegian Singles: NSA / NSM Tool',
      description:
        'Eine leichte LacTrace-Alternative für Läufer, die Norwegian Singles Paces, Wochenpläne und Marathon-Aufbauten aus einem aktuellen Rennergebnis wollen.',
      h1: 'LacTrace Alternative für Norwegian Singles Läufer',
      intro:
        'Nutze diese <strong>LacTrace Alternative</strong>, um ein aktuelles Rennen einzugeben, Sub-Threshold-Paces zu erhalten, die Schlüsseleinheiten zu sehen und den Plan zu speichern oder zu teilen.',
      howToName: 'Einen Norwegian Singles Plan ohne Account erstellen',
    },
    {
      slug: 'norwegian-singles-rechner-vergleich',
      title: 'Bester Norwegian Singles Rechner: NSA / NSM Vergleich',
      description:
        'Vergleiche Norwegian Singles Rechner und wähle ein NSA / NSM Tool mit Pace-Karten, Wochenplänen, Marathonplanung und teilbaren URLs.',
      h1: 'Worauf du beim besten Norwegian Singles Rechner achten solltest',
      intro:
        'Ein nützlicher <strong>Norwegian Singles Rechner</strong> zeigt die Wochenstruktur, die Schlüsseleinheiten, Renndistanz-Optionen, teilbare Links und Marathonplanung.',
      howToName: 'Einen Norwegian Singles Rechner wählen',
    },
    {
      slug: 'nsa-trainingsplan-generator',
      title: 'NSA Trainingsplan-Generator: Norwegian Singles Approach',
      description:
        'Erstelle einen NSA Trainingsplan aus 5K-, 10K-, Halbmarathon-, Marathon- oder eigenen Rennergebnissen mit Paces und Wocheneinheiten.',
      h1: 'NSA Trainingsplan-Generator',
      intro:
        'Nutze diesen <strong>NSA Trainingsplan-Generator</strong>, um ein aktuelles Rennen in eine wiederholbare Norwegian Singles Approach Woche zu verwandeln. Er unterstützt 5K, 10K, Halbmarathon, Marathon und eigene Distanzen.',
      howToName: 'Einen NSA Trainingsplan erstellen',
    },
    {
      slug: 'vdot-rechner',
      title: 'VDOT Rechner: Jack Daniels Laufpaces & Renn-Äquivalente',
      description:
        'Kostenloser VDOT Rechner nach der Formel von Jack Daniels. Gib ein Rennergebnis ein und erhalte Easy-, Marathon-, Threshold-, Interval- und Repetition-Paces sowie äquivalente Zeiten.',
      h1: 'VDOT Lauf-Rechner',
      intro:
        'Gib ein Rennergebnis in den <strong>VDOT Rechner</strong> ein und erhalte deinen VDOT-Wert, alle fünf Jack-Daniels-Trainingszonen (Easy, Marathon, Threshold, Interval, Repetition) und äquivalente Renn-Vorhersagen. Dasselbe Formular erstellt deinen kompletten NSM-Wochenplan.',
      howToName: 'VDOT und Trainingspaces berechnen',
    },
    {
      slug: 'jack-daniels-lauf-rechner',
      title: 'Jack Daniels Lauf-Rechner: VDOT Trainingszonen',
      description:
        'Berechne Jack-Daniels-VDOT-Trainingspaces (Easy, Threshold, Interval, Repetition) aus einer 5K, 10K, einem Halbmarathon oder Marathon.',
      h1: 'Jack Daniels Lauf-Rechner',
      intro:
        'Der <strong>Jack Daniels Lauf-Rechner</strong> nimmt ein Rennergebnis, berechnet deinen VDOT und zeigt Trainingspaces für jede Zone: Easy, Marathon, Threshold, Interval und Repetition. Füge deine Wochenstunden hinzu für einen kompletten NSM-Plan.',
      howToName: 'Jack-Daniels-VDOT-Trainingspaces berechnen',
    },
    {
      slug: 'vdot-lauf-formel',
      title: 'VDOT Lauf-Formel: Trainingspaces & äquivalente Rennen',
      description:
        'Nutze die VDOT Lauf-Formel, um Trainingspaces zu berechnen und äquivalente Rennzeiten aus deiner aktuellen Form vorherzusagen.',
      h1: 'VDOT Lauf-Formel Rechner',
      intro:
        'Die <strong>VDOT Lauf-Formel</strong> wandelt ein Rennergebnis in einen Formwert um und weist darauf basierend Trainingspaces in allen fünf Zonen zu. Gib eine beliebige Distanz und Zeit ein, um VDOT, Zonenziele und Vorhersagen für gängige Distanzen zu sehen.',
      howToName: 'Die VDOT Lauf-Formel anwenden',
    },
    {
      slug: 'norwegian-singles-app',
      title: 'Norwegian Singles App: Kostenloser NSA / NSM Rechner & Planer',
      description:
        'Kostenlose Norwegian Singles App für NSA / NSM Läufer. Berechne Sub-Threshold-Paces, baue Wochenpläne und einen 15-Wochen-Marathonblock direkt im Browser — kein Download.',
      h1: 'Norwegian Singles App',
      intro:
        'Diese kostenlose <strong>Norwegian Singles App</strong> läuft in jedem Browser — keine Installation, kein Account. Gib eine aktuelle 5K oder 10K ein für NSA / NSM Sub-Threshold-Paces, einen wiederholbaren Wochenplan und einen 15-Wochen-Marathon-Aufbau, den du speichern und teilen kannst.',
      howToName: 'Die Norwegian Singles App nutzen',
    },
    {
      slug: 'james-copeland-norwegian-singles',
      title: 'James Copeland Norwegian Singles: Methoden-Rechner',
      description:
        'Verwandle die Norwegian Singles Method von James Copeland in echte Paces und Pläne. Kostenloser Rechner für den Sub-Threshold-Ansatz mit Einzeleinheiten, bekannt durch Copeland (sirpoc).',
      h1: 'James Copeland Norwegian Singles Method Rechner',
      intro:
        '<strong>James Copeland</strong> (online als sirpoc bekannt) dokumentierte die <strong>Norwegian Singles Method</strong> — wiederholbare Sub-Threshold-Einzeleinheiten für Hobbyläufer. Dieser unabhängige Rechner macht aus einem aktuellen Rennergebnis die 3-, 6- und 10-Minuten-Paces und die Wochenstruktur seiner Methode.',
      howToName: 'Die James Copeland Norwegian Singles Method anwenden',
    },
  ],
  fr: [
    {
      slug: 'calculateur-allures-nsa',
      title: 'Calculateur NSA : allures Norwegian Singles',
      description:
        "Calculateur NSA gratuit pour les coureurs Norwegian Singles. Estime les allures sous-seuil courtes, moyennes, longues et l'allure facile à partir d'un 5K ou 10K.",
      h1: "Calculateur d'allures NSA pour Norwegian Singles",
      intro:
        "Saisis un 5K ou 10K récent dans le <strong>calculateur NSA</strong>. Tu obtiens des cibles sous-seuil courtes, moyennes et longues, l'allure facile et un plan hebdomadaire.",
      howToName: "Calculer les allures d'entraînement NSA",
    },
    {
      slug: 'calculateur-norwegian-singles',
      title: 'Calculateur Norwegian Singles : allures NSA / NSM',
      description:
        "Calculateur Norwegian Singles gratuit pour NSA / NSM. Estime les allures sous-seuil, l'allure facile, les séances hebdomadaires et les plans marathon.",
      h1: 'Calculateur Norwegian Singles',
      intro:
        "Saisis un 5K, 10K, semi-marathon, marathon ou une distance personnalisée dans le <strong>calculateur Norwegian Singles</strong>. Tu obtiens des cibles sous-seuil, l'allure facile et un plan hebdomadaire.",
      howToName: 'Utiliser le calculateur Norwegian Singles',
    },
    {
      slug: 'calculateur-nsm',
      title: 'Calculateur NSM : allures Norwegian Singles Method',
      description:
        "Calcule les allures Norwegian Singles Method pour les intervalles sous-seuil de 3, 6 et 10 minutes à partir d'un résultat récent.",
      h1: 'Calculateur NSM pour Norwegian Singles Method',
      intro:
        "Le <strong>calculateur NSM</strong> transforme un résultat de course récent en allures sous-seuil de 3, 6 et 10 minutes, plus l'allure facile et une structure hebdomadaire.",
      howToName: "Calculer les allures d'entraînement NSM",
    },
    {
      slug: 'nsm-running',
      title: 'NSM Running : Norwegian Singles Method pour coureurs',
      description:
        'Apprends les bases du NSM running et calcule les allures Norwegian Singles Method pour des semaines sous-seuil répétables.',
      h1: 'Guide NSM running et calculateur',
      intro:
        "Le <strong>NSM running</strong> garde l'entraînement de seuil norvégien gérable : une séance de qualité contrôlée par jour, des récupérations courtes, du footing facile autour et des allures basées sur ta forme actuelle.",
      howToName: 'Démarrer le NSM running',
    },
    {
      slug: 'methode-entrainement-nsm',
      title: "Méthode d'entraînement NSM : séances Norwegian Singles",
      description:
        "Applique la méthode d'entraînement NSM avec des intervalles sous-seuil de 3, 6 et 10 minutes, des footings faciles et des plans hebdomadaires.",
      h1: "Méthode d'entraînement NSM pour coureurs amateurs",
      intro:
        "La <strong>méthode d'entraînement NSM</strong> organise la semaine autour de trois séances sous-seuil contrôlées : longues répét. de 10 min, moyennes de 6 min et courtes de 3 min. Objectif : un développement aérobie durable, pas un effort maximal.",
      howToName: "Appliquer la méthode d'entraînement NSM",
    },
    {
      slug: 'calculateur-methode-norvegienne',
      title: 'Calculateur méthode norvégienne : allures seuil en séance unique',
      description:
        'Estime des allures de seuil inspirées de la méthode norvégienne, adaptées en semaines NSA / NSM à séance unique.',
      h1: 'Calculateur de la méthode norvégienne pour coureurs amateurs',
      intro:
        'Le <strong>calculateur de la méthode norvégienne</strong> adapte les idées du double seuil en semaines NSA / NSM à séance unique. Saisis un résultat pour obtenir des allures sous-seuil à volume normal.',
      howToName: 'Calculer les allures de la méthode norvégienne',
    },
    {
      slug: 'calculateur-allure-sous-seuil',
      title: 'Calculateur allure sous-seuil : répét. 3, 6 et 10 min',
      description:
        "Calcule des cibles d'allure sous-seuil pour des intervalles courts, moyens et longs à partir d'un résultat de course récent.",
      h1: "Calculateur d'allure sous-seuil",
      intro:
        "Utilise le <strong>calculateur d'allure sous-seuil</strong> pour choisir des cibles sur des répét. de 3, 6 et 10 min. Garde le travail assez contrôlé pour le répéter la semaine suivante.",
      howToName: "Calculer l'allure sous-seuil",
    },
    {
      slug: 'plan-marathon-methode-norvegienne',
      title: 'Plan marathon méthode norvégienne : préparation NSA / NSM',
      description:
        "Construis un plan marathon avec un entraînement sous-seuil norvégien, des sorties longues, du travail à allure marathon et de l'affûtage.",
      h1: 'Générateur de plan marathon méthode norvégienne',
      intro:
        "Un <strong>plan marathon méthode norvégienne</strong> a besoin d'une semaine répétable. Construis un compte à rebours de 15 semaines avec des séances sous-seuil, des sorties longues et des séances à allure marathon.",
      howToName: 'Construire un plan marathon méthode norvégienne',
    },
    {
      slug: 'calculateur-allures-marius-bakken',
      title: 'Calculateur allures Marius Bakken : inspiré méthode norvégienne',
      description:
        'Estime des allures sous-seuil norvégiennes inspirées des principes de Marius Bakken, adaptées en semaines NSA / NSM à séance unique.',
      h1: "Calculateur d'allures Marius Bakken pour séance unique",
      intro:
        "Les notes du <strong>calculateur d'allures Marius Bakken</strong> relient l'entraînement de seuil norvégien aux semaines NSA / NSM à séance unique. Saisis un résultat pour obtenir des cibles sous-seuil contrôlées depuis ta forme actuelle.",
      howToName: "Estimer des allures d'entraînement norvégiennes",
    },
    {
      slug: 'livre-norwegian-singles-method',
      title: 'Livre Norwegian Singles Method : calculateur compagnon',
      description:
        'Explore les références du livre Norwegian Singles Method et utilise un calculateur gratuit pour transformer les concepts NSM en allures et plans.',
      h1: 'Livre Norwegian Singles Method et calculateur',
      intro:
        "Le <strong>livre Norwegian Singles Method</strong> donne l'idée d'entraînement. Ce calculateur transforme un résultat récent en allures, séances hebdomadaires et plans marathon.",
      howToName: 'Appliquer les idées du livre Norwegian Singles Method',
    },
    {
      slug: 'plan-entrainement-norwegian-singles',
      title: 'Générateur de plan Norwegian Singles : NSA / NSM',
      description:
        'Génère un plan Norwegian Singles de 4.5-9 heures par semaine avec des séances sous-seuil, des footings faciles et des liens de plan partageables.',
      h1: "Générateur de plan d'entraînement Norwegian Singles",
      intro:
        "Crée un <strong>plan d'entraînement Norwegian Singles</strong> depuis ta forme actuelle et tes heures hebdomadaires. Le planificateur construit des semaines NSA / NSM avec trois séances sous-seuil, des footings faciles et des allures tenables.",
      howToName: "Générer un plan d'entraînement Norwegian Singles",
    },
    {
      slug: 'plan-marathon-norwegian-singles',
      title:
        'Plan marathon Norwegian Singles : préparation NSA / NSM de 15 semaines',
      description:
        'Construis un plan marathon Norwegian Singles de 15 semaines avec séances sous-seuil, travail à allure marathon, sorties longues, courses de préparation et affûtage.',
      h1: 'Générateur de plan marathon Norwegian Singles',
      intro:
        "Utilise ce générateur de <strong>plan marathon Norwegian Singles</strong> pour créer un compte à rebours de 15 semaines depuis ta date de course. Il combine l'entraînement sous-seuil NSA / NSM avec sorties longues, séances spécifiques marathon, courses de préparation et affûtage.",
      howToName: 'Construire un plan marathon Norwegian Singles',
    },
    {
      slug: 'calculateur-running-sous-seuil',
      title: "Calculateur running sous-seuil : outil d'allures NSA / NSM",
      description:
        "Calcule des allures de running sous-seuil pour des intervalles courts, moyens et longs à partir d'un 5K ou 10K récent.",
      h1: 'Calculateur running sous-seuil',
      intro:
        "Ce <strong>calculateur running sous-seuil</strong> estime des allures d'entraînement contrôlées pour les coureurs en NSA, NSM ou entraînement de seuil norvégien. Saisis un résultat pour obtenir des cibles d'intervalle et une plage d'allure facile.",
      howToName: 'Calculer des allures de running sous-seuil',
    },
    {
      slug: 'methode-norvegienne-coureurs-amateurs',
      title: 'Méthode norvégienne pour coureurs amateurs : séances uniques',
      description:
        "Applique l'entraînement de seuil norvégien en tant que coureur amateur avec des semaines NSA / NSM à séance unique, des allures prudentes et du footing facile.",
      h1: 'Méthode norvégienne pour coureurs amateurs',
      intro:
        'La <strong>méthode norvégienne pour coureurs amateurs</strong> fonctionne avec des semaines NSA / NSM à séance unique : intervalles sous-seuil contrôlés, footing facile et progression régulière.',
      howToName: "Démarrer l'entraînement norvégien en amateur",
    },
    {
      slug: 'alternative-calculateur-subthreshold',
      title: 'Alternative à SubThreshold Calculator : planificateur NSA / NSM',
      description:
        'Compare les calculateurs Norwegian Singles et génère des allures NSA / NSM, des plans hebdomadaires, des plans marathon et des liens partageables dans un seul outil.',
      h1: 'Alternative à SubThreshold Calculator pour NSA / NSM',
      intro:
        "Utilise cette <strong>alternative à SubThreshold Calculator</strong> pour un calcul d'allures rapide, une structure hebdomadaire visible, des plans marathon et des URL de plan partageables sans compte.",
      howToName: 'Comparer et générer un plan NSA / NSM',
    },
    {
      slug: 'alternative-lactrace-norwegian-singles',
      title: 'Alternative à LacTrace pour Norwegian Singles : outil NSA / NSM',
      description:
        'Une alternative légère à LacTrace pour les coureurs qui veulent des allures Norwegian Singles, des plans hebdomadaires et des plans marathon depuis un résultat récent.',
      h1: 'Alternative à LacTrace pour coureurs Norwegian Singles',
      intro:
        'Utilise cette <strong>alternative à LacTrace</strong> pour saisir une course récente, obtenir des allures sous-seuil, voir les séances clés et enregistrer ou partager le plan généré.',
      howToName: 'Créer un plan Norwegian Singles sans compte',
    },
    {
      slug: 'comparatif-calculateur-norwegian-singles',
      title: 'Meilleur calculateur Norwegian Singles : comparatif NSA / NSM',
      description:
        "Compare les calculateurs Norwegian Singles et choisis un outil NSA / NSM avec cartes d'allures, plans hebdomadaires, planification marathon et URL partageables.",
      h1: "Les fonctions d'un bon calculateur Norwegian Singles",
      intro:
        'Un <strong>calculateur Norwegian Singles</strong> utile montre la structure hebdomadaire, les séances clés, les options de distance, les liens partageables et la planification marathon.',
      howToName: 'Choisir un calculateur Norwegian Singles',
    },
    {
      slug: 'generateur-plan-entrainement-nsa',
      title: 'Générateur de plan NSA : Norwegian Singles Approach',
      description:
        'Génère un plan NSA depuis un 5K, 10K, semi-marathon, marathon ou une distance personnalisée avec des allures et des séances hebdomadaires.',
      h1: "Générateur de plan d'entraînement NSA",
      intro:
        'Utilise ce <strong>générateur de plan NSA</strong> pour transformer une course récente en une semaine Norwegian Singles Approach répétable. Il accepte 5K, 10K, semi, marathon et distances personnalisées.',
      howToName: "Générer un plan d'entraînement NSA",
    },
    {
      slug: 'calculateur-vdot',
      title: 'Calculateur VDOT : allures Jack Daniels & équivalences de course',
      description:
        'Calculateur VDOT gratuit basé sur la formule de Jack Daniels. Saisis un résultat pour obtenir les allures Facile, Marathon, Seuil, Intervalle et Répétition et les temps équivalents.',
      h1: 'Calculateur VDOT de running',
      intro:
        "Saisis un résultat dans le <strong>calculateur VDOT</strong> pour obtenir ton score VDOT, les cinq zones d'entraînement Jack Daniels (Facile, Marathon, Seuil, Intervalle, Répétition) et des prédictions de course équivalentes. Le même formulaire génère ton plan NSM hebdomadaire.",
      howToName: "Calculer le VDOT et les allures d'entraînement",
    },
    {
      slug: 'calculateur-jack-daniels-running',
      title: "Calculateur Jack Daniels Running : zones d'entraînement VDOT",
      description:
        "Calcule les allures d'entraînement VDOT de Jack Daniels (Facile, Seuil, Intervalle, Répétition) à partir d'un 5K, 10K, semi ou marathon.",
      h1: 'Calculateur Jack Daniels running',
      intro:
        'Le <strong>calculateur Jack Daniels running</strong> prend un résultat, calcule ton VDOT et affiche les allures de chaque zone : Facile, Marathon, Seuil, Intervalle et Répétition. Ajoute tes heures hebdomadaires pour obtenir le plan NSM complet.',
      howToName: "Calculer les allures d'entraînement VDOT Jack Daniels",
    },
    {
      slug: 'formule-vdot-running',
      title: "Formule VDOT Running : allures d'entraînement & équivalences",
      description:
        "Utilise la formule VDOT de running pour calculer des allures d'entraînement et prédire des temps de course équivalents depuis ta forme actuelle.",
      h1: 'Calculateur de la formule VDOT de running',
      intro:
        "La <strong>formule VDOT de running</strong> convertit un résultat en score de forme et attribue des allures d'entraînement pour chaque zone. Saisis une distance et un temps pour voir ton VDOT, les cibles par zone et les temps équivalents.",
      howToName: 'Appliquer la formule VDOT de running',
    },
    {
      slug: 'application-norwegian-singles',
      title: 'Application Norwegian Singles : calculateur NSA / NSM gratuit',
      description:
        'Application Norwegian Singles gratuite pour NSA / NSM. Calcule les allures sous-seuil, crée des plans hebdomadaires et un bloc marathon de 15 semaines dans le navigateur — sans téléchargement.',
      h1: 'Application Norwegian Singles',
      intro:
        'Cette <strong>application Norwegian Singles</strong> gratuite fonctionne dans tout navigateur — sans installation ni compte. Saisis un 5K ou 10K récent pour obtenir des allures sous-seuil NSA / NSM, un plan hebdomadaire répétable et un plan marathon de 15 semaines à enregistrer et partager.',
      howToName: "Utiliser l'application Norwegian Singles",
    },
    {
      slug: 'james-copeland-norwegian-singles',
      title: 'James Copeland Norwegian Singles : calculateur de la méthode',
      description:
        "Transforme la Norwegian Singles Method de James Copeland en allures et plans réels. Calculateur gratuit pour l'approche sous-seuil à séance unique popularisée par Copeland (sirpoc).",
      h1: 'Calculateur de la méthode Norwegian Singles de James Copeland',
      intro:
        '<strong>James Copeland</strong> (connu en ligne sous le nom de sirpoc) a documenté la <strong>Norwegian Singles Method</strong> — des séances uniques sous-seuil répétables pour coureurs amateurs. Ce calculateur indépendant transforme un résultat récent en allures de 3, 6 et 10 minutes et en structure hebdomadaire de sa méthode.',
      howToName: 'Appliquer la méthode Norwegian Singles de James Copeland',
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

  if (locale === 'de') {
    return [
      {
        q: 'Bedeuten NSA und NSM dasselbe?',
        a: 'Ja. Diese App nutzt NSA für Norwegian Singles Approach und NSM für Norwegian Singles Method. Approach und Method werden als dasselbe Trainingskonzept behandelt.',
      },
      {
        q: 'Ist diese App offiziell?',
        a: 'Nein. Es ist ein unabhängiges, inoffizielles Tool, das Läufern hilft, Paces zu schätzen und Norwegian-Singles-Wochen zu organisieren.',
      },
      {
        q: 'Welche Rennergebnisse kann ich eingeben?',
        a: 'Du kannst eine 5K, 10K, einen Halbmarathon, Marathon oder eine eigene Distanz eingeben.',
      },
      {
        q: 'Kann ich es für das Marathontraining nutzen?',
        a: 'Ja. Mit einem Marathondatum erstellt die App einen 15-Wochen-Aufbau mit Sub-Threshold-Einheiten, Marathon-Pace-Arbeit, langen Läufen und Tapering.',
      },
      {
        q: 'Wie hängt das mit James Copeland zusammen?',
        a: 'James Copeland ist der Autor der Norwegian Singles Method. Dieser unabhängige Rechner hilft, aktuelle Form in praktische Paces und Wochenstrukturen zu übersetzen, die mit NSM kompatibel sind.',
      },
      {
        q: 'Ist das ein Marius-Bakken-Rechner?',
        a: 'Es ist kein offizielles Marius-Bakken-Tool. Es überträgt norwegische Schwellenprinzipien in Wochen mit Einzeleinheiten für Hobbyläufer.',
      },
    ];
  }

  if (locale === 'fr') {
    return [
      {
        q: 'NSA et NSM signifient-ils la même chose ?',
        a: "Oui. Cette app utilise NSA pour Norwegian Singles Approach et NSM pour Norwegian Singles Method. Approach et Method sont traités comme le même concept d'entraînement.",
      },
      {
        q: 'Cette app est-elle officielle ?',
        a: "Non. C'est un outil indépendant et non officiel qui aide les coureurs à estimer des allures et à organiser des semaines Norwegian Singles.",
      },
      {
        q: 'Quels résultats de course puis-je saisir ?',
        a: 'Tu peux saisir un 5K, 10K, semi-marathon, marathon ou une distance personnalisée.',
      },
      {
        q: "Puis-je l'utiliser pour le marathon ?",
        a: "Oui. Si tu ajoutes une date de marathon, l'app génère un plan de 15 semaines avec séances sous-seuil, travail à allure marathon, sorties longues et affûtage.",
      },
      {
        q: 'Quel est le lien avec James Copeland ?',
        a: "James Copeland est l'auteur de la Norwegian Singles Method. Ce calculateur indépendant aide à transformer ta forme récente en allures et structures hebdomadaires pratiques compatibles avec NSM.",
      },
      {
        q: 'Est-ce un calculateur Marius Bakken ?',
        a: "Ce n'est pas un outil officiel de Marius Bakken. Il adapte les principes de seuil norvégiens en semaines à séance unique pour coureurs amateurs.",
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
              ? 'Añade una marca reciente de 5K o 10K.'
              : locale === 'ko'
                ? '최근 5K 또는 10K 기록을 입력하세요.'
                : locale === 'de'
                  ? 'Füge ein aktuelles 5K- oder 10K-Ergebnis hinzu.'
                  : locale === 'fr'
                    ? 'Ajoute un résultat récent sur 5K ou 10K.'
                    : 'Add a recent 5K or 10K result.',
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
