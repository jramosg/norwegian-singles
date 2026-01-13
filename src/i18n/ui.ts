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
    'hero.subtitle': 'Planificación de entrenamiento basada en el método Norwegian Singles. Ritmos conservadores, descansos cortos, resultados excepcionales.',
    'hero.cta': 'Crear mi plan',
    
    // Form
    'form.title': 'Configura tu entrenamiento',
    'form.targetDistance': 'Distancia objetivo',
    'form.time5K': 'Marca actual 5K',
    'form.time10K': 'Marca actual 10K',
    'form.timePlaceholder': 'mm:ss',
    'form.timeHint': 'Si solo introduces una, estimaremos la otra',
    'form.trainingDays': 'Días de entrenamiento',
    'form.trainingDaysHint': 'Recomendamos 5-6 días para resultados óptimos',
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
    'session.threshold': 'Umbral',
    'session.long': 'Tirada Larga',
    'session.test': 'Test',
    'session.rest': 'Descanso',
    'session.race': 'Carrera',
    
    // Paces
    'pace.threshold': 'Umbral',
    'pace.easy': 'Fácil',
    'pace.unit': 'min/km',
    'pace.intervals.short': 'Cortos (3-4\')',
    'pace.intervals.medium': 'Medios (6-8\')',
    'pace.intervals.long': 'Largos (10-12\')',
    
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
    'method.principle1.title': 'El umbral manda',
    'method.principle1.desc': 'El trabajo de calidad representa el 20-25% del volumen semanal. El resto es rodaje fácil.',
    'method.principle2.title': 'Nunca al fallo',
    'method.principle2.desc': 'Ritmos conservadores y sostenibles. Podrías hacer más, pero no lo haces.',
    'method.principle3.title': 'Descansos cortos',
    'method.principle3.desc': '60 segundos de recuperación para mantener el estado de lactato elevado.',
    'method.principle4.title': 'Sistema repetible',
    'method.principle4.desc': 'Bloques de 6 semanas con test y recalibración. La consistencia gana.',
    
    // Footer
    'footer.credit': 'Basado en el método de entrenamiento Norwegian Singles',
    'footer.disclaimer': 'Esta aplicación es una herramienta de planificación. Consulta con un profesional antes de iniciar cualquier programa de entrenamiento.',
    'footer.dev': 'Desarrollado por',
    
    // Misc
    'loading': 'Cargando...',
    'error': 'Error',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Eliminar',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.plan': 'My Plan',
    'nav.method': 'The Method',
    
    // Hero
    'hero.title': 'Train like the',
    'hero.titleAccent': 'Norwegians',
    'hero.subtitle': 'Training planning based on the Norwegian Singles method. Conservative paces, short recoveries, exceptional results.',
    'hero.cta': 'Create my plan',
    
    // Form
    'form.title': 'Configure your training',
    'form.targetDistance': 'Target distance',
    'form.time5K': 'Current 5K time',
    'form.time10K': 'Current 10K time',
    'form.timePlaceholder': 'mm:ss',
    'form.timeHint': 'If you only enter one, we\'ll estimate the other',
    'form.trainingDays': 'Training days',
    'form.trainingDaysHint': 'We recommend 5-6 days for optimal results',
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
    'session.threshold': 'Threshold',
    'session.long': 'Long Run',
    'session.test': 'Test',
    'session.rest': 'Rest',
    'session.race': 'Race',
    
    // Paces
    'pace.threshold': 'Threshold',
    'pace.easy': 'Easy',
    'pace.unit': 'min/km',
    'pace.intervals.short': 'Short (3-4\')',
    'pace.intervals.medium': 'Medium (6-8\')',
    'pace.intervals.long': 'Long (10-12\')',
    
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
    'method.principle1.title': 'Threshold rules',
    'method.principle1.desc': 'Quality work represents 20-25% of weekly volume. The rest is easy running.',
    'method.principle2.title': 'Never to failure',
    'method.principle2.desc': 'Conservative and sustainable paces. You could do more, but you don\'t.',
    'method.principle3.title': 'Short recoveries',
    'method.principle3.desc': '60 seconds recovery to maintain elevated lactate state.',
    'method.principle4.title': 'Repeatable system',
    'method.principle4.desc': '6-week blocks with test and recalibration. Consistency wins.',
    
    // Footer
    'footer.credit': 'Based on the Norwegian Singles training method',
    'footer.disclaimer': 'This app is a planning tool. Consult a professional before starting any training program.',
    'footer.dev': 'Built by',
    
    // Misc
    'loading': 'Loading...',
    'error': 'Error',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
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
