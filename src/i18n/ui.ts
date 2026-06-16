// Internationalization utilities for Norwegian Singles

import type { Locale } from '../types';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es', 'ko'];

export const languageLabels: Record<
  Locale,
  {
    code: string;
    name: string;
    nativeName: string;
    hreflang: string;
    og: string;
  }
> = {
  en: {
    code: 'EN',
    name: 'English',
    nativeName: 'English',
    hreflang: 'en',
    og: 'en_US',
  },
  es: {
    code: 'ES',
    name: 'Spanish',
    nativeName: 'Español',
    hreflang: 'es',
    og: 'es_ES',
  },
  ko: {
    code: 'KO',
    name: 'Korean',
    nativeName: '한국어',
    hreflang: 'ko',
    og: 'ko_KR',
  },
};

// UI translations
export const ui = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.plan': 'Mi Plan',
    'nav.method': 'El Método',

    // Hero
    'hero.title': 'Calculadora Norwegian Singles',
    'hero.titleAccent': 'NSA / NSM',
    'hero.subtitle':
      'Genera ritmos sub-umbral, semanas de 4.5-9h y preparación de maratón desde tu marca de 5K o 10K.',
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

    // Tapering
    'taper.tab': 'Tapering',
    'taper.title.10k': 'Taper 10K (semana de carrera)',
    'taper.title.recovery10k': 'Recuperación post 10K',
    'taper.title.half': 'Taper Media Maratón (semana de carrera)',
    'taper.title.recoveryHalf': 'Recuperación post Media Maratón',
    'taper.desc.easy_normal': 'Rodaje fácil normal',
    'taper.desc.subt_normal': 'Entrenamiento sub-umbral normal',
    'taper.desc.10k_taper_thursday':
      '6–8 × 3 min @ ~ritmo HM, últimas 2 repeticiones a ritmo objetivo 10K',
    'taper.desc.easy_shorter_30': 'Muy fácil, 30% más corto de lo normal',
    'taper.desc.easy_shorter_40': 'Muy fácil, 40% más corto de lo normal',
    'taper.desc.race': 'Carrera',
    'taper.desc.easy_shorter_20_25': 'Fácil, 20–25% más corto de lo normal',
    'taper.desc.3x10_mp_reduced': '3 × 10 min @ MP (intensidad reducida)',
    'taper.desc.scheduled_normal_workout': 'Entrenamiento normal programado',
    'taper.desc.normal_long_run': 'Tirada larga normal',
    'taper.desc.half_taper_thursday':
      '6–8 × 3 min @ MP, últimas 2 repeticiones a ritmo objetivo HM',
    'taper.desc.easy_shorter_50': 'Muy fácil, 50% más corto de lo normal',
    'taper.desc.easy_shorter_30_40': 'Muy fácil, 30–40% más corto de lo normal',
    'taper.desc.easy_or_shorter_30': 'Fácil o 30% más corto de lo normal',
    'taper.desc.3x6_mp_reduced': '3 × 6 min @ MP (intensidad reducida)',
    'taper.desc.long_run_or_15_shorter':
      'Tirada larga (o 15% más corta si hay fatiga)',

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
      'Corre las sesiones clave por debajo del umbral. Manténlas cerca del 20-25% del volumen semanal.',
    'method.principle2.title': 'Nunca al fallo',
    'method.principle2.desc':
      'Usa ritmos que puedas repetir semana tras semana. Termina con margen.',
    'method.principle3.title': 'Descansos cortos',
    'method.principle3.desc':
      'Recupera unos 60 segundos para mantener la sesión continua.',
    'method.principle4.title': 'Semanas Repetibles',
    'method.principle4.desc':
      'Consistencia sobre variedad. Repite la misma estructura semanal y deja que el ritmo progrese con tu VDOT.',

    // Books / affiliate
    'books.title': 'Libros recomendados',
    'books.subtitle':
      'Profundiza en el método con estas lecturas de referencia.',
    'books.cta': 'Ver en Amazon',
    'books.affiliate': 'Enlaces de afiliado',

    // Footer
    'footer.credit': 'Basado en el método de entrenamiento Norwegian Singles',
    'footer.disclaimer':
      'Herramienta no oficial. No tiene relación con los autores, entrenadores o marcas mencionadas. Consulta con un profesional antes de iniciar un plan.',
    'footer.dev': 'Desarrollado por',
    'footer.support': 'Apoyar el proyecto',
    'footer.supportTagline':
      'Ayuda a financiar futuras funciones como envío al reloj, impresión de calendarios y más.',
    'support.floatingMessage':
      '¿Te gusta el planificador gratuito? Ayuda a impulsar las próximas funciones con un café',
    'support.floatingButton': 'Invítame a un café',
    'support.floatingAria':
      '¿Te gusta el planificador gratuito? Ayuda a impulsar las próximas funciones con un café',

    // SEO
    'seo.title': 'Calculadora Norwegian Singles, ritmos y planes NSA/NSM',
    'seo.description':
      'Calcula ritmos sub-umbral, semanas NSA/NSM de 4.5-9 h y preparación de maratón desde una marca reciente. Herramienta independiente Norwegian Singles.',

    // SEO Content Section
    'seo.content.h2': '¿Qué es el Norwegian Singles Method?',
    'seo.content.intro':
      'El <strong>Norwegian Singles Approach (NSA)</strong>, también conocido como <strong>Norwegian Singles Method (NSM)</strong>, aplica principios de entrenamiento sub-umbral de estilo noruego en <strong>sesiones únicas</strong> accesibles para corredores de todos los niveles.',
    'seo.content.doubleThreshold.title':
      'Del doble umbral al Norwegian Singles',
    'seo.content.doubleThreshold.text':
      'El <strong>Método Noruego</strong> original usa dos sesiones de umbral al día, una por la mañana y otra por la tarde. La mayoría de corredores no puede sostener ese volumen. NSM conserva tres piezas: intensidad sub-umbral, recuperaciones cortas y una semana estable.',
    'seo.content.howItWorks.title': 'Cómo funciona el método',
    'seo.content.howItWorks.text':
      'Cada semana sigue la misma estructura repetible: <strong>tres sesiones sub-umbral</strong> (martes, jueves, sábado) más rodajes fáciles el resto de días. Las sesiones sub-umbral usan tres longitudes de intervalo diferentes:',
    'seo.content.howItWorks.rep3':
      '<strong>Repeticiones de 3 minutos</strong>: ritmo cercano a 15K, con 60 segundos de recuperación',
    'seo.content.howItWorks.rep6':
      '<strong>Repeticiones de 6 minutos</strong>: ritmo cercano a 30K, con 60-90s de recuperación',
    'seo.content.howItWorks.rep10':
      '<strong>Repeticiones de 10 minutos</strong>: cerca del ritmo de maratón, con 90-120s de recuperación',
    'seo.content.howItWorks.paces':
      'La calculadora usa tu <strong>marca actual de 5K o 10K</strong> para dar objetivos de entrenamiento. Corres por debajo del umbral de lactato y terminas con margen.',
    'seo.content.weeklyPlans.title': 'Planes semanales: 4.5 a 9 horas',
    'seo.content.weeklyPlans.text':
      'NSM ofrece planes estructurados de <strong>4.5 a 9 horas semanales</strong>, escalando el número de repeticiones y la duración de los rodajes fáciles conforme crece tu condición física. Progresar significa pasar al siguiente nivel de horas cuando el plan actual se sienta cómodo durante varias semanas consecutivas.',
    'seo.content.marathon.title': 'Preparación Maratón: programa de 15 semanas',
    'seo.content.marathon.text':
      'Para corredores que se preparan para un maratón, esta app genera una <strong>preparación de 15 semanas</strong> con tiradas largas progresivas, carreras de puesta a punto y <strong>sesiones específicas a ritmo maratón</strong> en las últimas semanas. Introduce la fecha de tu maratón y la app genera toda la cuenta atrás.',
    'seo.content.whoIsItFor.title': '¿Para quién es este método?',
    'seo.content.whoIsItFor.text':
      'NSM sirve para muchos niveles: desde 5K en 30 minutos hasta atletas sub-15. Las tablas cubren tiempos de 5K desde 15:00 hasta 30:00. Usa la misma estructura para preparar un 10K o un maratón.',

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
    'hero.title': 'Norwegian Singles',
    'hero.titleAccent': 'NSA / NSM Calculator',
    'hero.subtitle':
      'Calculate sub-threshold paces, 4.5-9h training weeks, and a 15-week marathon build from your 5K or 10K.',
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

    // Tapering
    'taper.tab': 'Tapering',
    'taper.title.10k': 'Taper into 10K (race week)',
    'taper.title.recovery10k': 'Recovery after 10K',
    'taper.title.half': 'Taper into Half Marathon (race week)',
    'taper.title.recoveryHalf': 'Recovery after Half Marathon',
    'taper.desc.easy_normal': 'Easy as per normal week',
    'taper.desc.subt_normal': 'Normal sub-T workout',
    'taper.desc.10k_taper_thursday':
      '6–8 × 3 min @ ~HM pace, last 2 reps at goal 10K pace',
    'taper.desc.easy_shorter_30': 'Very easy, 30% shorter than normal',
    'taper.desc.easy_shorter_40': 'Very easy, 40% shorter than normal',
    'taper.desc.race': 'Race',
    'taper.desc.easy_shorter_20_25': 'Easy, 20–25% shorter than normal',
    'taper.desc.3x10_mp_reduced': '3 × 10 min @ MP (reduced intensity)',
    'taper.desc.scheduled_normal_workout': 'Scheduled normal workout',
    'taper.desc.normal_long_run': 'Normal long run',
    'taper.desc.half_taper_thursday':
      '6–8 × 3 min @ MP, last 2 reps at goal HM pace',
    'taper.desc.easy_shorter_50': 'Very easy, 50% shorter than normal',
    'taper.desc.easy_shorter_30_40': 'Very easy, 30–40% shorter than normal',
    'taper.desc.easy_or_shorter_30': 'Easy or 30% shorter than normal',
    'taper.desc.3x6_mp_reduced': '3 × 6 min @ MP (reduced intensity)',
    'taper.desc.long_run_or_15_shorter':
      'Long run (or 15% shorter if fatigued)',

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
      'Run key sessions below threshold. Keep them near 20-25% of weekly volume.',
    'method.principle2.title': 'Never to failure',
    'method.principle2.desc':
      'Use paces you can repeat week after week. Finish with room left.',
    'method.principle3.title': 'Short recoveries',
    'method.principle3.desc':
      'Recover around 60 seconds so the workout keeps moving.',
    'method.principle4.title': 'Repeatable Weeks',
    'method.principle4.desc':
      'Consistency over variety. Repeat a solid weekly structure and let your paces progress as your VDOT improves.',

    // Books / affiliate
    'books.title': 'Recommended books',
    'books.subtitle': 'Reference books for the method.',
    'books.cta': 'View on Amazon',
    'books.affiliate': 'Affiliate links',

    // Footer
    'footer.credit': 'Based on the Norwegian Singles training method',
    'footer.disclaimer':
      'Unofficial planning tool. It has no relationship with the authors, coaches, or brands mentioned. Consult a professional before starting a plan.',
    'footer.dev': 'Built by',
    'footer.support': 'Support the project',
    'footer.supportTagline':
      'Help fund future features like sending to watch, calendar print, and more.',
    'support.floatingMessage':
      'Enjoying the free training planner? Fuel the next features with a coffee',
    'support.floatingButton': 'Buy me a coffee',
    'support.floatingAria':
      'Enjoying the free training planner? Fuel the next features with a coffee',

    // SEO
    'seo.title': 'Norwegian Singles Calculator, NSA / NSM Paces and Plans',
    'seo.description':
      'Free Norwegian Singles calculator for NSA / NSM runners. Calculate sub-threshold paces from your 5K or 10K, 4.5-9h plans, and marathon builds.',

    // SEO Content Section
    'seo.content.h2': 'What is the Norwegian Singles Method?',
    'seo.content.intro':
      'The <strong>Norwegian Singles Approach (NSA)</strong>, also known as the <strong>Norwegian Singles Method (NSM)</strong>, applies Norwegian-style sub-threshold training principles in <strong>single daily sessions</strong> accessible to everyday runners.',
    'seo.content.doubleThreshold.title':
      'From Double Threshold to Norwegian Singles',
    'seo.content.doubleThreshold.text':
      'The original <strong>Norwegian Method</strong> uses two threshold sessions per day, one in the morning and one in the evening. Most runners cannot hold that volume. NSM keeps three pieces: sub-threshold intensity, short recoveries, and a stable week.',
    'seo.content.howItWorks.title': 'How the Method Works',
    'seo.content.howItWorks.text':
      'Every week follows the same repeatable structure: <strong>three sub-threshold workouts</strong> (Tuesday, Thursday, Saturday) plus easy runs on the other days. The sub-threshold sessions use three different interval lengths:',
    'seo.content.howItWorks.rep3':
      '<strong>3-minute reps</strong>: near 15K effort, with 60-second recovery',
    'seo.content.howItWorks.rep6':
      '<strong>6-minute reps</strong>: near 30K effort, with 60-90s recovery',
    'seo.content.howItWorks.rep10':
      '<strong>10-minute reps</strong>: close to marathon effort, with 90-120s recovery',
    'seo.content.howItWorks.paces':
      'The calculator uses your current <strong>5K or 10K race time</strong> to set workout targets. You run below lactate threshold and finish with room left.',
    'seo.content.weeklyPlans.title': 'Weekly Plans: 4.5 to 9 Hours',
    'seo.content.weeklyPlans.text':
      'NSM provides plans from <strong>4.5 to 9 hours per week</strong>. As fitness grows, the plan adds reps and easy-run time. Move to the next tier after several comfortable weeks.',
    'seo.content.marathon.title': 'Marathon Build: 15-Week Program',
    'seo.content.marathon.text':
      'For runners targeting a marathon, this app generates a <strong>15-week marathon build</strong> with progressive long runs, tune-up races, and <strong>marathon-pace specific sessions</strong> in the final weeks. Enter your marathon date and the app generates the entire countdown.',
    'seo.content.whoIsItFor.title': 'Who Is This For?',
    'seo.content.whoIsItFor.text':
      'NSM works for many levels: from a 30-minute 5K to sub-15 athletes. The tables cover 5K times from 15:00 to 30:00. Use the same structure for a first 10K or a marathon PB.',

    // Misc
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
  },
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.plan': '내 플랜',
    'nav.method': '훈련법',

    // Hero
    'hero.title': 'Norwegian Singles',
    'hero.titleAccent': 'NSA / NSM 계산기',
    'hero.subtitle':
      '5K 또는 10K 기록으로 서브스레숄드 페이스, 주 4.5-9시간 훈련 주간, 15주 마라톤 빌드업을 계산하세요.',
    'hero.cta': '플랜 만들기',

    // Form
    'form.title': '훈련 설정',
    'form.targetDistance': '목표 거리',
    'form.time5K': '현재 5K 기록',
    'form.time10K': '현재 10K 기록',
    'form.timePlaceholder': 'mm:ss',
    'form.timeHint':
      '5K 또는 10K 기록 중 하나를 입력하세요. 다른 기록은 자동으로 추정합니다.',
    'form.trainingDays': '훈련 일수',
    'form.trainingDaysHint': '최적의 결과를 위해 주 5-6일을 권장합니다',
    'form.daysPerWeek': '일/주',
    'form.unit': '페이스 단위',
    'form.previewThreshold': '서브스레숄드',
    'form.previewEasy': '이지',
    'form.submit': '플랜 생성',
    'form.validation.required': '기록을 하나 이상 입력하세요',
    'form.validation.format': '형식이 올바르지 않습니다(mm:ss 사용)',

    // Distances
    'distance.21K': '하프 마라톤',
    'distance.42K': '마라톤',

    // Session types
    'session.easy': '이지',
    'session.threshold': '서브스레숄드',
    'session.long': '롱런',
    'session.test': '테스트',
    'session.rest': '휴식',
    'session.race': '레이스',

    // Paces
    'pace.threshold': '서브스레숄드',
    'pace.easy': '이지',
    'pace.intervals.short': "짧은 Sub-T (3-4')",
    'pace.intervals.medium': "중간 Sub-T (6-8')",
    'pace.intervals.long': "긴 Sub-T (10-12')",

    // Plan
    'plan.title': '내 훈련 플랜',
    'plan.week': '주',
    'plan.block': '블록',
    'plan.testWeek': '테스트 주간',
    'plan.paces': '내 페이스',
    'plan.intervals': 'NS 인터벌',
    'plan.addRace': '레이스 추가',
    'plan.recalculate': '다시 계산',

    // Days
    'day.monday': '월요일',
    'day.tuesday': '화요일',
    'day.wednesday': '수요일',
    'day.thursday': '목요일',
    'day.friday': '금요일',
    'day.saturday': '토요일',
    'day.sunday': '일요일',
    'day.mon': '월',
    'day.tue': '화',
    'day.wed': '수',
    'day.thu': '목',
    'day.fri': '금',
    'day.sat': '토',
    'day.sun': '일',

    // Races
    'race.title': '레이스',
    'race.add': '레이스 추가',
    'race.name': '이름',
    'race.date': '날짜',
    'race.type': '유형',
    'race.typeA': 'A 레이스(우선)',
    'race.typeB': 'B 레이스(보조)',
    'race.remove': '삭제',

    // Intervals table
    'intervals.type': '유형',
    'intervals.structure': '구성',
    'intervals.pace': '목표 페이스',
    'intervals.recovery': '회복',
    'intervals.byTime': '시간 기준',
    'intervals.byDistance': '거리 기준',

    // Methodology
    'method.title': 'Norwegian Singles Method',
    'method.principle1.title': '서브스레숄드 여유',
    'method.principle1.desc':
      '핵심 세션은 여유 있는 임계값 아래 페이스로 달리며, 주간 볼륨의 약 20-25%를 차지합니다.',
    'method.principle2.title': '한계까지 밀지 않기',
    'method.principle2.desc':
      '더 할 수 있어도 멈출 수 있는 보수적이고 지속 가능한 페이스를 사용합니다.',
    'method.principle3.title': '짧은 회복',
    'method.principle3.desc':
      '60초 회복으로 젖산이 약간 높은 상태를 유지합니다.',
    'method.principle4.title': '반복 가능한 주간',
    'method.principle4.desc':
      '변화보다 일관성입니다. 같은 주간 구조를 반복하고, 체력이 좋아지면 페이스가 자연스럽게 올라갑니다.',

    // Books / affiliate
    'books.title': '추천 도서',
    'books.subtitle': '훈련법을 더 깊게 이해할 수 있는 참고 도서입니다.',
    'books.cta': 'Amazon에서 보기',
    'books.affiliate': '제휴 링크',

    // Footer
    'footer.credit': 'Norwegian Singles 훈련법 기반',
    'footer.disclaimer':
      '독립적인 비공식 플래닝 도구입니다. 언급된 저자, 코치, 브랜드와 제휴, 보증, 승인 관계가 없습니다. 훈련 프로그램을 시작하기 전에 전문가와 상담하세요.',
    'footer.dev': '제작',
    'footer.support': '프로젝트 후원',
    'footer.supportTagline':
      '워치 전송, 캘린더 출력 등 향후 기능 개발을 도와주세요.',
    'support.floatingMessage':
      '무료 훈련 플래너가 도움이 되나요? 다음 기능 개발을 후원해 주세요',
    'support.floatingButton': '커피 후원',
    'support.floatingAria':
      '무료 훈련 플래너가 도움이 되나요? 다음 기능 개발을 후원해 주세요',

    // SEO
    'seo.title': 'NSM 러닝 계산기, Norwegian Singles 페이스와 훈련 플랜',
    'seo.description':
      'NSM 러닝과 Norwegian Singles Method를 위한 무료 계산기. 5K 또는 10K 기록으로 서브스레숄드 페이스, 주간 플랜, 마라톤 빌드업을 계산하세요.',

    // SEO Content Section
    'seo.content.h2': 'Norwegian Singles Method란?',
    'seo.content.intro':
      '<strong>Norwegian Singles Approach (NSA)</strong>, 또는 <strong>Norwegian Singles Method (NSM)</strong>는 노르웨이식 서브스레숄드 훈련 원칙을 하루 한 번의 세션으로 적용하는 방식입니다.',
    'seo.content.doubleThreshold.title':
      '더블 스레숄드에서 Norwegian Singles로',
    'seo.content.doubleThreshold.text':
      '원래 노르웨이식 훈련은 오전과 오후에 두 번의 임계값 세션을 수행합니다. 프로 선수에게는 효과적이지만 대부분의 러너에게는 어렵습니다. NSM은 조절된 서브스레숄드 강도, 짧은 회복, 높은 주간 일관성이라는 핵심 원칙을 하루 한 번 세션으로 단순화합니다.',
    'seo.content.howItWorks.title': '훈련 방식',
    'seo.content.howItWorks.text':
      '기본 주간 구조는 반복 가능합니다. 화요일, 목요일, 토요일에 세 번의 서브스레숄드 세션을 하고 나머지는 이지런으로 채웁니다.',
    'seo.content.howItWorks.rep3':
      '<strong>3분 반복</strong>: 약 15K 레이스 노력, 60초 회복',
    'seo.content.howItWorks.rep6':
      '<strong>6분 반복</strong>: 약 30K 레이스 노력, 60-90초 회복',
    'seo.content.howItWorks.rep10':
      '<strong>10분 반복</strong>: 마라톤 노력에 가까운 페이스, 90-120초 회복',
    'seo.content.howItWorks.paces':
      '현재 <strong>5K 또는 10K 기록</strong>을 바탕으로 실전적인 훈련 페이스를 추정합니다. 핵심은 젖산 역치보다 아래에서 달려 회복 가능성을 유지하는 것입니다.',
    'seo.content.weeklyPlans.title': '주 4.5-9시간 플랜',
    'seo.content.weeklyPlans.text':
      'NSM은 주 4.5-9시간 플랜을 제공합니다. 체력이 올라갈수록 반복 횟수와 이지런 시간이 늘어나며, 현재 플랜이 여러 주 동안 편안할 때 다음 단계로 이동합니다.',
    'seo.content.marathon.title': '15주 마라톤 빌드업',
    'seo.content.marathon.text':
      '마라톤을 준비한다면 레이스 날짜를 입력해 15주 빌드업을 생성할 수 있습니다. 롱런, 점검 레이스, 마라톤 페이스 세션, 테이퍼가 포함됩니다.',
    'seo.content.whoIsItFor.title': '누구에게 적합한가요?',
    'seo.content.whoIsItFor.text':
      'NSM은 5K 30분 러너부터 15분 이하 러너까지 다양한 수준에 맞게 조정됩니다. 첫 10K부터 마라톤 기록 향상까지 같은 구조로 확장할 수 있습니다.',

    // Misc
    loading: '불러오는 중...',
    error: '오류',
    save: '저장',
    cancel: '취소',
    edit: '수정',
    delete: '삭제',
  },
} as const;

export type TranslationKey = keyof typeof ui.es;

/**
 * Get translation for a key in the specified locale
 */
export function t(locale: Locale, key: TranslationKey): string {
  const translations = ui[locale] as Partial<Record<TranslationKey, string>>;
  const fallback = ui[defaultLocale] as Record<TranslationKey, string>;

  return translations[key] || fallback[key] || key;
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
