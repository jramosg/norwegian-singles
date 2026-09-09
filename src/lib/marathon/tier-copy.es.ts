/**
 * Spanish copy for the marathon plan sales pages.
 *
 * Translated from tier-copy.en.ts, matching the vocabulary already
 * established in copy.es.ts and src/i18n/ui.ts (sub-umbral, tirada larga).
 */

import type { TierId } from './types';
import type { TierPageCopy, MarathonCopyShared } from './tier-copy.en';

export const tierCopyEs: Record<TierId, TierPageCopy> = {
  singles75: {
    slug: 'plan-maraton-75km',
    name: 'Singles 75',
    tagline: 'Máximo de 75 km (47 mi) a la semana',
    title:
      'Plan de maratón Norwegian Singles: 75 km/semana (47 mi) | 12, 15 o 18 semanas',
    description:
      'Un plan de maratón sub-umbral con un máximo de 75 km (47 mi) a la semana, en 12, 15 o 18 semanas. Ritmos calculados a partir de tu propia marca, en km o millas.',
    h1: 'Singles 75 — un plan de maratón con un máximo de 75 km a la semana',
    intro:
      'La puerta de entrada al entrenamiento de maratón sub-umbral. Seis días de carrera a la semana, dos sesiones sub-umbral y una sesión X, y una tirada larga que crece hasta 30 km. Volumen suficiente para correr un maratón en condiciones sin que el entrenamiento se adueñe de tu vida.',
    whoFor: [
      'Ya corres 50-65 km a la semana sin problema y quieres añadir un poco más',
      'Tu primer maratón, o tu primer intento serio',
      'Tienes seis días a la semana para correr y ningún interés en doblar',
    ],
    notFor: [
      'Si ya corres 90 km a la semana, empieza en Singles 95 — este te resultará demasiado fácil como para que merezca la pena pagarlo',
      'Si corres menos de 45 km a la semana, dedica antes unos meses a construir base. Ningún plan arregla una base inexistente',
    ],
    weeklyShape:
      'Dos sesiones sub-umbral el martes y el jueves, una sesión X el sábado, una tirada larga el domingo, y un día completo de descanso. En la fase específica de maratón desaparece la sesión del sábado y la tirada larga del fin de semana se convierte en la sesión dura de la semana.',
  },
  singles95: {
    slug: 'plan-maraton-95km',
    name: 'Singles 95',
    tagline: 'Máximo de 95 km (59 mi) a la semana',
    title:
      'Plan de maratón Norwegian Singles: 95 km/semana (59 mi) | 12, 15 o 18 semanas',
    description:
      'Un plan de maratón sub-umbral con un máximo de 95 km (59 mi) a la semana, en 12, 15 o 18 semanas. Ritmos calculados a partir de tu propia marca, en km o millas.',
    h1: 'Singles 95 — un plan de maratón con un máximo de 95 km a la semana',
    intro:
      'El nivel en el que encaja la mayoría de quienes buscan una mejor marca personal. Siete días de carrera, sesiones sub-umbral más largas que en Singles 75, y trabajo específico de maratón el fin de semana que llega a 20 km a ritmo de carrera dentro de una tirada larga.',
    whoFor: [
      'Ya has corrido un maratón antes y quieres bajar tu marca de verdad',
      'Ya llevas 70-85 km a la semana sin venirte abajo',
      'Vas a por una marca clasificatoria para Boston, Londres u otra carrera de categoría',
    ],
    notFor: [
      'Si esto supondría un salto grande respecto a tu volumen actual, coge Singles 75 para un ciclo y ven aquí la próxima vez',
      'Si superas de forma constante los 110 km a la semana, Singles 120 te encajará mejor',
    ],
    weeklyShape:
      'Dos sesiones sub-umbral y una sesión X a la semana repartidas en siete días de carrera, con la tirada larga creciendo hasta 32 km. En la fase específica de maratón la semana baja a dos sesiones de calidad: una gran sesión de fin de semana y una sesión sub-umbral a tres o cuatro días de ella.',
  },
  singles120: {
    slug: 'plan-maraton-120km',
    name: 'Singles 120',
    tagline: 'Máximo de 120 km (75 mi) a la semana',
    title:
      'Plan de maratón Norwegian Singles: 120 km/semana (75 mi) | 12, 15 o 18 semanas',
    description:
      'Un plan de maratón sub-umbral con un máximo de 120 km (75 mi) a la semana, en 12, 15 o 18 semanas. Ritmos calculados a partir de tu propia marca, en km o millas.',
    h1: 'Singles 120 — un plan de maratón con un máximo de 120 km a la semana',
    intro:
      'Volumen alto, pero con una sola sesión principal al día. Siete días de carrera con una o dos segundas tiradas a la semana, sesiones sub-umbral de 30-40 minutos de calidad, y sesiones específicas de maratón que llegan a 20 km a ritmo de carrera.',
    whoFor: [
      'Has entrenado a 100 km a la semana o más y te has mantenido sano haciéndolo',
      'Varios maratones a tus espaldas y una marca concreta en mente',
      'No te importa añadir una segunda tirada corta cuando la semana lo pide',
    ],
    notFor: [
      'Si 120 km a la semana sería tu récord personal de volumen, no lo aprendas durante un ciclo de maratón',
      'Si tu vida no puede absorber 9-11 horas de carrera a la semana, Singles 95 te dará una mejor carrera',
    ],
    weeklyShape:
      'Siete días de carrera más aproximadamente una segunda tirada, una tirada larga hasta 34 km, y 30-40 minutos de trabajo sub-umbral por sesión. Las segundas tiradas dividen un día fácil largo en lugar de sumarse a él.',
  },
  singles140: {
    slug: 'plan-maraton-140km',
    name: 'Singles 140',
    tagline: 'Máximo de 140 km (87 mi) a la semana',
    title:
      'Plan de maratón Norwegian Singles: 140 km/semana (87 mi) | 12, 15 o 18 semanas',
    description:
      'Un plan de maratón sub-umbral con un máximo de 140 km (87 mi) a la semana, en 12, 15 o 18 semanas. Ritmos calculados a partir de tu propia marca, en km o millas.',
    h1: 'Singles 140 — un plan de maratón con un máximo de 140 km a la semana',
    intro:
      'El mayor volumen que este método soporta sin dejar de ser reconociblemente entrenamiento singles. De dos a tres segundas tiradas a la semana, sesiones sub-umbral de 35-45 minutos de calidad, y una tirada larga hasta 38 km.',
    whoFor: [
      'Has sostenido 120 km a la semana o más durante meses seguidos',
      'Corres cerca de la cabeza de tu categoría o vas a por una marca absoluta rápida',
      'Tienes los hábitos de recuperación —sueño, alimentación, poco estrés vital— que exige este volumen',
    ],
    notFor: [
      'Casi todo el mundo. El volumen no es la variable que le falta a la mayoría de corredores, y este nivel da por hecho años de él a tus espaldas',
      'Si no tienes claro si encajas aquí, encajas en Singles 120',
    ],
    weeklyShape:
      'Siete días de carrera con dos o tres segundas tiradas, una tirada larga hasta 38 km, y las mayores dosis sub-umbral de todo el rango. La fase específica de maratón se mantiene en dos sesiones de calidad a la semana: a este volumen, la sesión de fin de semana ya es suficientemente dura por sí sola.',
  },
};

export const sharedCopyEs: MarathonCopyShared = {
  indexSlug: 'planes-maraton',
  indexTitle:
    'Planes de maratón Norwegian Singles | 12, 15 y 18 semanas, 75-140 km/semana',
  indexDescription:
    'Planes de maratón sub-umbral en cuatro niveles de volumen, 12, 15 o 18 semanas, con ritmos calculados a partir de tu propia marca. Km y millas. No es un PDF estático: tus ritmos se actualizan según lo hace tu forma física.',
  indexH1: 'Planes de maratón Norwegian Singles',
  indexIntro:
    'Cuatro planes, construidos sobre el entrenamiento sub-umbral y la periodización de maratón de Marius Bakken. Elige el que encaje con el volumen que realmente corres, elige 12, 15 o 18 semanas, y cada sesión vuelve con tus propias bandas de ritmo.',
  disclaimer:
    'Estos planes se basan en los principios publicados del Norwegian Singles Method y en los escritos de Marius Bakken sobre entrenamiento de maratón. No son oficiales, ni están afiliados ni respaldados por Bakken, James Copeland, ni ningún otro entrenador. Las sesiones las genera nuestro propio motor.',
  medicalNote:
    'Consejo de entrenamiento, no consejo médico. Si estás lesionado, enfermo, o no sabes si este volumen te conviene, habla con un médico o fisioterapeuta antes de empezar.',
  chooseTierHeading: 'Qué nivel te encaja',
  chooseLengthHeading: 'Cuánto tiempo tienes',
  lengthNote:
    'Cada nivel viene en las tres duraciones, y las fases escalan con la duración en lugar de recortarse al final. Si tu carrera es dentro de 14 semanas, coge el plan de 12 semanas y sigue construyendo base dos semanas más antes.',
  phasesHeading: 'Cómo está construido el plan',
  phases: [
    {
      name: 'Base sub-umbral',
      weeks: 'Semanas 1-6 de 18',
      body: 'Todo lo de calidad es sub-umbral, con repeticiones largas desde la primera semana, más una tirada larga que crece de forma constante. La tercera sesión de cada semana es la sesión X: cuestas, 45/15, series cortas, o un parkrun. Todavía sin nada de trabajo a ritmo de maratón — no tiene sentido ensayar un ritmo que aún no te has ganado.',
    },
    {
      name: 'Apoyo al maratón',
      weeks: 'Semanas 7-11 de 18',
      body: 'Las dos sesiones sub-umbral se mantienen. La tercera se convierte en una sesión moderada específica de maratón el fin de semana: bloques a ritmo de maratón, un bloque continuo a ritmo de maratón dentro de una tirada más larga, o una progresión. La tirada larga sigue siendo una carrera fácil.',
    },
    {
      name: 'Específica de maratón',
      weeks: 'Semanas 12-15 de 18',
      body: 'La sesión de fin de semana se vuelve lo bastante dura como para que dos sesiones de calidad sean toda la semana. La gran sesión específica de maratón se convierte en la tirada larga, y una sesión sub-umbral se coloca a tres o cuatro días de ella. Todo lo demás es fácil. Esta es la fase en la que se gana la carrera.',
    },
    {
      name: 'Taper',
      weeks: 'Semanas 16-18 de 18',
      body: 'El volumen y la duración de las sesiones bajan mientras la intensidad se mantiene, en dosis pequeñas: 20 x 1 minuto, series cortas de 30/30, un último recordatorio del ritmo de maratón. La semana de carrera es un puñado de esfuerzos de un minuto y una activación.',
    },
  ],
  comparisonHeading: 'Por qué no comprar simplemente un PDF',
  comparisonIntro:
    'Porque un PDF está equivocado un mes después de comprarlo. Tu forma física cambia y los ritmos de la hoja no.',
  comparison: [
    {
      label: 'Ritmos',
      pdf: 'Genéricos, o congelados en el momento en que lo compraste',
      ours: 'Calculados a partir de tu marca, en km o millas',
    },
    {
      label: 'Cuando cambia tu forma física',
      pdf: 'El archivo ya está equivocado',
      ours: 'Cada semana futura se reajusta. Reimprime y la hoja está al día',
    },
    {
      label: 'Volumen',
      pdf: 'Un plan para todo el mundo',
      ours: 'Cuatro niveles ajustados al volumen que realmente corres',
    },
    {
      label: 'Duración',
      pdf: 'Una sola duración',
      ours: '12, 15 o 18 semanas',
    },
    {
      label: 'Cada sesión',
      pdf: '"10 x 1 km"',
      ours: 'Estructura, tu banda de ritmo, y por qué existe la sesión',
    },
    {
      label: 'Sin cuesta, sin pista, semana de viaje',
      pdf: 'Improvisas',
      ours: 'Cada sesión viene con una alternativa documentada',
    },
    {
      label: 'Ritmo de maratón',
      pdf: 'Un número optimista',
      ours: 'Una banda a partir de tu forma actual, con un veredicto honesto sobre tu objetivo',
    },
    {
      label: 'Si encontramos un error',
      pdf: 'Tu copia sigue equivocada',
      ours: 'La corrección llega a los planes ya vendidos',
    },
  ],
  sampleHeading: 'Una semana real de este plan',
  sampleNote:
    'Generada por el mismo motor que comprarías, para un corredor que ha hecho 40:00 en 10K. Compra el plan y cada sesión de abajo llega con tus propios ritmos.',
  includedHeading: 'Qué recibes',
  included: [
    'El plan completo, cada semana, cada sesión, con tus propias bandas de ritmo',
    'Las tres duraciones de tu nivel: 12, 15 y 18 semanas',
    'Una razón de una línea para cada sesión, y una alternativa para cada una que necesite cuesta, pista o evento',
    'Controles de forma física que no necesitan una carrera — actualiza tus ritmos según cómo te hayan ido de verdad las sesiones',
    'Un bloque de fuerza opcional: levantamiento pesado, pliometría y sprints de cuesta, colocados para que no estropeen la carrera',
    'Hojas imprimibles, CSV, y un feed de calendario que se mantiene al día',
    'Acceso de por vida desde cualquier dispositivo, y todas las mejoras que hagamos más adelante',
  ],
  faqHeading: 'Preguntas',
  faq: [
    {
      q: '¿Es este el Norwegian Singles Method oficial?',
      a: 'No. No existe un plan de maratón Norwegian Singles oficial. Estos planes están construidos sobre los principios publicados del método y sobre los escritos de Bakken acerca de la periodización de maratón, hechos por nosotros, y no estamos afiliados ni respaldados por nadie.',
    },
    {
      q: '¿En qué se diferencia esto de la herramienta gratuita de esta web?',
      a: 'Las herramientas gratuitas te dan ritmos sub-umbral y una estructura semanal que se repite sin cambiar de semana en semana. Estos son ciclos completos de maratón: una curva de volumen, cuatro fases, sesiones específicas de maratón, un taper, y una fecha de carrera.',
    },
    {
      q: '¿Y si no sé mi ritmo de maratón?',
      a: 'No lo necesitas. Introduce una carrera reciente a cualquier distancia y el plan calcula lo que tu forma física actual soporta, usando una conversión que tiene en cuenta tu volumen semanal. Si además introduces una marca objetivo, te diremos con honestidad cuánto las separa.',
    },
    {
      q: '¿Qué pasa cuando mejoro mi forma física a mitad del ciclo?',
      a: 'Haces un check-in — unas preguntas sobre cómo te sentaron las últimas sesiones, o un resultado de 5K si tienes uno — y cada semana que queda se reajusta en torno a la nueva estimación. Las semanas que ya has corrido conservan los ritmos con los que las corriste.',
    },
    {
      q: '¿Necesito una carrera para actualizar mi forma física?',
      a: 'No. Las carreras nunca son obligatorias ni se programan como tal. El check-in por defecto pregunta cómo te fueron las sesiones sub-umbral: si podrías haber añadido una repetición, si mantuviste la banda en la última repetición igual que en la primera.',
    },
    {
      q: '¿Puedo correr tres sesiones de calidad a la semana en la fase de maratón?',
      a: 'El plan no te dará tres, de forma deliberada. En cuanto la sesión de fin de semana llega a 20 km a ritmo de carrera, necesita tres o cuatro días a cada lado. Añadir una tercera sesión es la forma en que la gente llega a la salida ya cansada.',
    },
    {
      q: '¿Millas o kilómetros?',
      a: 'Ambos, en todas partes, con un interruptor. Los planes se generan en métrico y se muestran en el que prefieras.',
    },
    {
      q: '¿Y si me salto una sesión, o una semana entera?',
      a: 'El plan se adapta en lugar de decirte que te pongas al día. Una sesión saltada se omite, no se acumula; una semana saltada se repite en lugar de saltar hacia delante; y volver de una enfermedad activa un check-in de forma física en lugar de asumir que nada ha cambiado.',
    },
    {
      q: '¿Qué duración debería elegir?',
      a: 'La más larga que encaje antes de tu carrera. Dieciocho semanas dan a la fase de base espacio para hacer su trabajo; doce te llevan igual si es el tiempo que tienes.',
    },
  ],
  ctaBuy: 'Consigue este plan',
  ctaBundle: 'Consigue los cuatro niveles',
  ctaLearnMore: 'Ver el plan',
  priceNote: 'Un solo pago, acceso de por vida. Sin suscripción.',
  labels: {
    peakVolume: 'Volumen máximo',
    weeklyVolume: 'Volumen semanal',
    qualitySessions: 'Sesiones de calidad',
    longRun: 'Tirada larga',
    runsPerWeek: 'Carreras por semana',
    week: 'Semana',
    phase: 'Fase',
    perWeek: 'a la semana',
    strengthOptional: 'Fuerza (opcional)',
    whyThisSession: 'Por qué esta sesión',
    ifYouCant: 'Si no puedes hacerla tal como está',
  },
};
