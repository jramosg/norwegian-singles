// Internationalization utilities for Norwegian Singles

import type { Locale } from '../types';

export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['es', 'en'];

// UI translations
export const ui = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.plan': 'Mi Plan',
    'nav.method': 'El Método',

    // Hero
    'hero.title': 'Entrena como los',
    'hero.titleAccent': 'Noruegos',
    'hero.subtitle':
      'Planificación de entrenamiento basada en el método Norwegian Singles. Ritmos conservadores, descansos cortos, resultados excepcionales.',
    'hero.cta': 'Crear mi plan',

    // Form
    'form.title': 'Configura tu entrenamiento',
    'form.targetDistance': 'Distancia objetivo',
    'form.time5K': 'Marca actual 5K',
    'form.time10K': 'Marca actual 10K',
    'form.timePlaceholder': 'mm:ss',
    'form.timeHint':
      'Introduce al menos una marca (5K o 10K). Estimaremos la otra automáticamente.',
    'form.trainingDays': 'Días de entrenamiento',
    'form.trainingDaysHint': 'Recomendamos 5-6 días para resultados óptimos',
    'form.daysPerWeek': 'días/semana',
    'form.unit': 'Unidad de ritmo',
    'unit.km': 'km',
    'unit.mile': 'mi',
    'form.previewThreshold': 'Sub-Umbral',
    'form.previewEasy': 'Fácil',
    'form.submit': 'Generar plan',
    'form.validation.required': 'Introduce al menos una marca',
    'form.validation.format': 'Formato inválido (usa mm:ss)',

    // Distances
    'distance.5K': '5K',
    'distance.10K': '10K',
    'distance.21K': 'Media Maratón',
    'distance.42K': 'Maratón',

    // Session types
    'session.easy': 'Fácil',
    'session.threshold': 'Sub-Umbral',
    'session.long': 'Tirada Larga',
    'session.test': 'Test',
    'session.rest': 'Descanso',
    'session.race': 'Carrera',

    // Paces
    'pace.threshold': 'Sub-Umbral',
    'pace.easy': 'Fácil',
    'pace.unit': 'min/km',
    'pace.intervals.short': "Sub-T Cortos (3-4')",
    'pace.intervals.medium': "Sub-T Medios (6-8')",
    'pace.intervals.long': "Sub-T Largos (10-12')",

    // Plan
    'plan.title': 'Tu Plan de Entrenamiento',
    'plan.week': 'Semana',
    'plan.block': 'Bloque',
    'plan.testWeek': 'Semana de Test',
    'plan.paces': 'Tus Ritmos',
    'plan.intervals': 'Intervalos NS',
    'plan.addRace': 'Añadir carrera',
    'plan.recalculate': 'Recalcular',

    // Days
    'day.monday': 'Lunes',
    'day.tuesday': 'Martes',
    'day.wednesday': 'Miércoles',
    'day.thursday': 'Jueves',
    'day.friday': 'Viernes',
    'day.saturday': 'Sábado',
    'day.sunday': 'Domingo',
    'day.mon': 'Lun',
    'day.tue': 'Mar',
    'day.wed': 'Mié',
    'day.thu': 'Jue',
    'day.fri': 'Vie',
    'day.sat': 'Sáb',
    'day.sun': 'Dom',

    // Races
    'race.title': 'Carreras',
    'race.add': 'Añadir carrera',
    'race.name': 'Nombre',
    'race.date': 'Fecha',
    'race.type': 'Tipo',
    'race.typeA': 'Carrera A (prioritaria)',
    'race.typeB': 'Carrera B (secundaria)',
    'race.remove': 'Eliminar',

    // Intervals table
    'intervals.type': 'Tipo',
    'intervals.structure': 'Estructura',
    'intervals.pace': 'Ritmo objetivo',
    'intervals.recovery': 'Recuperación',
    'intervals.byTime': 'Por tiempo',
    'intervals.byDistance': 'Por distancia',

    // Methodology
    'method.title': 'El Método Norwegian Singles',
    'method.principle1.title': 'Margen Sub-Umbral',
    'method.principle1.desc':
      'El trabajo de calidad se realiza a ritmos sub-umbral (umbral relajado), representando el 20-25% del volumen.',
    'method.principle2.title': 'Nunca al fallo',
    'method.principle2.desc':
      'Ritmos conservadores y sostenibles. Podrías hacer más, pero no lo haces.',
    'method.principle3.title': 'Descansos cortos',
    'method.principle3.desc':
      '60 segundos de recuperación para mantener el estado de lactato elevado.',
    'method.principle4.title': 'Semanas Repetibles',
    'method.principle4.desc':
      'Consistencia sobre variedad. Repite la misma estructura semanal y deja que el ritmo progrese con tu VDOT.',

    // Footer
    'footer.credit': 'Basado en el método de entrenamiento Norwegian Singles',
    'footer.disclaimer':
      'Esta aplicación es una herramienta de planificación. Consulta con un profesional antes de iniciar cualquier programa de entrenamiento.',
    'footer.dev': 'Desarrollado por',
    'footer.support': 'Apoyar el proyecto',
    'footer.supportTagline':
      'Ayuda a financiar futuras funciones como envío al reloj, impresión de calendarios y más.',

    // SEO
    'seo.title':
      'Norwegian Singles Method (NSM) — Calculadora gratuita de ritmos sub-umbral',
    'seo.description':
      'Genera planes de entrenamiento con el método Norwegian Singles de James Copeland (sirpoc). Simplifica el doble umbral de Marius Bakken en sesiones únicas diarias. Calcula ritmos sub-T a partir de tu marca de 5K. Incluye planes semanales de 4.5–9h y preparación maratón de 15 semanas.',

    // SEO Content Section
    'seo.content.h2': '¿Qué es el Norwegian Singles Method?',
    'seo.content.intro':
      'El <strong>Norwegian Singles Method (NSM)</strong> es un sistema de entrenamiento sub-umbral creado por <strong>James Copeland</strong> (conocido como <strong>sirpoc</strong> en la comunidad runner). Adapta el <strong>método de doble umbral de Marius Bakken</strong> — el mismo enfoque detrás de los récords mundiales de Jakob Ingebrigtsen — en <strong>sesiones diarias únicas</strong> accesibles para corredores de todos los niveles.',
    'seo.content.doubleThreshold.title':
      'Del doble umbral al Norwegian Singles',
    'seo.content.doubleThreshold.text':
      'El <strong>Método Noruego</strong> original prescribe dos sesiones de umbral de lactato al día, una por la mañana y otra por la tarde. Aunque extraordinariamente efectivo para atletas profesionales, es impracticable para la mayoría de corredores. NSM destila los <strong>principios fisiológicos clave</strong> — intensidad sub-umbral controlada, recuperaciones cortas para mantener el lactato elevado, y alta consistencia semanal — en un formato de sesión única que se adapta a la vida normal.',
    'seo.content.howItWorks.title': 'Cómo funciona el método',
    'seo.content.howItWorks.text':
      'Cada semana sigue la misma estructura repetible: <strong>tres sesiones sub-umbral</strong> (martes, jueves, sábado) más rodajes fáciles el resto de días. Las sesiones sub-umbral usan tres longitudes de intervalo diferentes:',
    'seo.content.howItWorks.rep3':
      '<strong>Repeticiones de 3 minutos</strong> — a ritmo de carrera de ~15K, con 60 segundos de recuperación',
    'seo.content.howItWorks.rep6':
      '<strong>Repeticiones de 6 minutos</strong> — a ritmo de carrera de ~30K, con 60–90s de recuperación',
    'seo.content.howItWorks.rep10':
      '<strong>Repeticiones de 10 minutos</strong> — cercano al ritmo de maratón, con 90–120s de recuperación',
    'seo.content.howItWorks.paces':
      'Todos los ritmos se derivan de tu <strong>marca actual de 5K</strong> usando las tablas del libro <em>"NSM: Subthreshold Running Kept Simple"</em> de James Copeland. La idea clave: corres a ritmos <strong>por debajo</strong> de tu umbral de lactato, nunca al fallo, maximizando las ganancias aeróbicas y minimizando el riesgo de lesión.',
    'seo.content.weeklyPlans.title': 'Planes semanales: 4.5 a 9 horas',
    'seo.content.weeklyPlans.text':
      'NSM ofrece planes estructurados de <strong>4.5 a 9 horas semanales</strong>, escalando el número de repeticiones y la duración de los rodajes fáciles conforme crece tu condición física. Progresar significa pasar al siguiente nivel de horas cuando el plan actual se sienta cómodo durante varias semanas consecutivas.',
    'seo.content.marathon.title': 'Preparación Maratón: programa de 15 semanas',
    'seo.content.marathon.text':
      'Para corredores que se preparan para un maratón, esta app incluye el programa completo <strong>"My Marathon Build" de 15 semanas</strong> del libro NSM. Incluye tiradas largas progresivas hasta 140 minutos, carreras de puesta a punto (parkrun, 10K, media maratón) y <strong>sesiones específicas a ritmo maratón</strong> en las últimas semanas. Introduce la fecha de tu maratón y la app genera toda la cuenta atrás.',
    'seo.content.whoIsItFor.title': '¿Para quién es este método?',
    'seo.content.whoIsItFor.text':
      'NSM está diseñado para corredores de <strong>todos los niveles</strong> — desde quienes corren un 5K en 30 minutos hasta atletas sub-15. Las tablas de ritmos cubren tiempos de 5K desde 15:00 hasta 30:00. Ya sea que entrenes para tu primer 10K o prepares un maratón, el método escala a tu condición física con la misma estructura probada.',

    // Misc
    loading: 'Cargando...',
    error: 'Error',
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.plan': 'My Plan',
    'nav.method': 'The Method',

    // Hero
    'hero.title': 'Train like the',
    'hero.titleAccent': 'Norwegians',
    'hero.subtitle':
      'Training planning based on the Norwegian Singles method. Conservative paces, short recoveries, exceptional results.',
    'hero.cta': 'Create my plan',

    // Form
    'form.title': 'Configure your training',
    'form.targetDistance': 'Target distance',
    'form.time5K': 'Current 5K time',
    'form.time10K': 'Current 10K time',
    'form.timePlaceholder': 'mm:ss',
    'form.timeHint':
      "Enter at least one time (5K or 10K). We'll estimate the other automatically.",
    'form.trainingDays': 'Training days',
    'form.trainingDaysHint': 'We recommend 5-6 days for optimal results',
    'form.daysPerWeek': 'days/week',
    'form.unit': 'Pace unit',
    'unit.km': 'km',
    'unit.mile': 'mi',
    'form.previewThreshold': 'Sub-Threshold',
    'form.previewEasy': 'Easy',
    'form.submit': 'Generate plan',
    'form.validation.required': 'Enter at least one time',
    'form.validation.format': 'Invalid format (use mm:ss)',

    // Distances
    'distance.5K': '5K',
    'distance.10K': '10K',
    'distance.21K': 'Half Marathon',
    'distance.42K': 'Marathon',

    // Session types
    'session.easy': 'Easy',
    'session.threshold': 'Sub-Threshold',
    'session.long': 'Long Run',
    'session.test': 'Test',
    'session.rest': 'Rest',
    'session.race': 'Race',

    // Paces
    'pace.threshold': 'Sub-Threshold',
    'pace.easy': 'Easy',
    'pace.unit': 'min/km',
    'pace.intervals.short': "Sub-T Short (3-4')",
    'pace.intervals.medium': "Sub-T Medium (6-8')",
    'pace.intervals.long': "Sub-T Long (10-12')",

    // Plan
    'plan.title': 'Your Training Plan',
    'plan.week': 'Week',
    'plan.block': 'Block',
    'plan.testWeek': 'Test Week',
    'plan.paces': 'Your Paces',
    'plan.intervals': 'NS Intervals',
    'plan.addRace': 'Add race',
    'plan.recalculate': 'Recalculate',

    // Days
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',
    'day.mon': 'Mon',
    'day.tue': 'Tue',
    'day.wed': 'Wed',
    'day.thu': 'Thu',
    'day.fri': 'Fri',
    'day.sat': 'Sat',
    'day.sun': 'Sun',

    // Races
    'race.title': 'Races',
    'race.add': 'Add race',
    'race.name': 'Name',
    'race.date': 'Date',
    'race.type': 'Type',
    'race.typeA': 'Race A (priority)',
    'race.typeB': 'Race B (secondary)',
    'race.remove': 'Remove',

    // Intervals table
    'intervals.type': 'Type',
    'intervals.structure': 'Structure',
    'intervals.pace': 'Target pace',
    'intervals.recovery': 'Recovery',
    'intervals.byTime': 'By time',
    'intervals.byDistance': 'By distance',

    // Methodology
    'method.title': 'The Norwegian Singles Method',
    'method.principle1.title': 'The Sub-T Margin',
    'method.principle1.desc':
      'Quality sessions are run at sub-threshold paces (relaxed threshold). They represent 20-25% of your volume.',
    'method.principle2.title': 'Never to failure',
    'method.principle2.desc':
      "Conservative and sustainable paces. You could do more, but you don't.",
    'method.principle3.title': 'Short recoveries',
    'method.principle3.desc':
      '60 seconds recovery to maintain elevated lactate state.',
    'method.principle4.title': 'Repeatable Weeks',
    'method.principle4.desc':
      'Consistency over variety. Repeat a solid weekly structure and let your paces progress as your VDOT improves.',

    // Footer
    'footer.credit': 'Based on the Norwegian Singles training method',
    'footer.disclaimer':
      'This app is a planning tool. Consult a professional before starting any training program.',
    'footer.dev': 'Built by',
    'footer.support': 'Support the project',
    'footer.supportTagline':
      'Help fund future features like sending to watch, calendar print, and more.',

    // SEO
    'seo.title':
      'Norwegian Singles Method (NSM) — Free Sub-Threshold Pace Calculator',
    'seo.description':
      "Generate training plans using James Copeland's Norwegian Singles Method (sirpoc). Simplifies Marius Bakken's double threshold into single daily sessions. Calculate sub-T paces from your 5K time. Weekly plans from 4.5–9h plus 15-week marathon build.",

    // SEO Content Section
    'seo.content.h2': 'What is the Norwegian Singles Method?',
    'seo.content.intro':
      "The <strong>Norwegian Singles Method (NSM)</strong> is a sub-threshold running system created by <strong>James Copeland</strong> (known as <strong>sirpoc</strong> in the running community). It adapts <strong>Marius Bakken's</strong> elite <strong>double threshold method</strong> — the same approach behind Jakob Ingebrigtsen's world records — into <strong>single daily sessions</strong> accessible to everyday runners.",
    'seo.content.doubleThreshold.title':
      'From Double Threshold to Norwegian Singles',
    'seo.content.doubleThreshold.text':
      'The original <strong>Norwegian Method</strong> prescribes two lactate threshold sessions per day, one in the morning and one in the evening. While extraordinarily effective for professional athletes, this is impractical for most runners. NSM distills the <strong>core physiological principles</strong> — controlled sub-threshold intensity, short recoveries to maintain elevated lactate, and high weekly consistency — into a single-session format that fits a normal life.',
    'seo.content.howItWorks.title': 'How the Method Works',
    'seo.content.howItWorks.text':
      'Every week follows the same repeatable structure: <strong>three sub-threshold workouts</strong> (Tuesday, Thursday, Saturday) plus easy runs on the other days. The sub-threshold sessions use three different interval lengths:',
    'seo.content.howItWorks.rep3':
      '<strong>3-minute reps</strong> — at roughly 15K race effort, with 60-second recovery',
    'seo.content.howItWorks.rep6':
      '<strong>6-minute reps</strong> — at roughly 30K race effort, with 60–90s recovery',
    'seo.content.howItWorks.rep10':
      '<strong>10-minute reps</strong> — close to marathon effort, with 90–120s recovery',
    'seo.content.howItWorks.paces':
      'All paces are derived from your current <strong>5K race time</strong> using the pace tables from the book <em>"NSM: Subthreshold Running Kept Simple"</em> by James Copeland. The key insight: you run at paces <strong>below</strong> your lactate threshold, never to failure, maximizing aerobic gains while minimizing injury risk.',
    'seo.content.weeklyPlans.title': 'Weekly Plans: 4.5 to 9 Hours',
    'seo.content.weeklyPlans.text':
      'NSM provides structured plans ranging from <strong>4.5 to 9 hours per week</strong>, scaling the number of repetitions and easy run duration as your fitness grows. Progression means moving to the next hours tier when your current plan feels comfortable for several consecutive weeks — not by increasing pace.',
    'seo.content.marathon.title': 'Marathon Build: 15-Week Program',
    'seo.content.marathon.text':
      'For runners targeting a marathon, this app includes the complete <strong>15-week "My Marathon Build"</strong> from the NSM book. It features progressive long runs up to 140 minutes, tune-up races (parkrun, 10K, half marathon), and <strong>marathon-pace specific sessions</strong> in the final weeks. Enter your marathon date and the app generates the entire countdown.',
    'seo.content.whoIsItFor.title': 'Who Is This For?',
    'seo.content.whoIsItFor.text':
      "NSM is designed for runners of <strong>all levels</strong> — from those running a 30-minute 5K to sub-15 athletes. The pace tables cover 5K times from 15:00 to 30:00. Whether you're training for your first 10K or preparing for a marathon PB, the method scales to your fitness through the same proven structure.",

    // Misc
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
  },
} as const;

export type TranslationKey = keyof typeof ui.es;

/**
 * Get translation for a key in the specified locale
 */
export function t(locale: Locale, key: TranslationKey): string {
  return ui[locale][key] || ui[defaultLocale][key] || key;
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale) {
  return ui[locale];
}

/**
 * Create a translation function bound to a locale
 */
export function useTranslations(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}

/**
 * Get locale from URL path
 */
export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0] as Locale;
  return locales.includes(firstSegment) ? firstSegment : defaultLocale;
}

/**
 * Get path in another locale
 */
export function getPathInLocale(path: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(path);
  if (currentLocale === targetLocale) return path;

  const segments = path.split('/').filter(Boolean);
  if (locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return '/' + segments.join('/');
}
