/**
 * Spanish copy for generated marathon plans.
 *
 * Every session carries a one-line reason it exists. That line is a product
 * requirement, not decoration: it is most of what separates a training plan
 * from a spreadsheet of intervals.
 *
 * This file is the schema of record; other locales are typed against it.
 */

import type { MarathonCopy } from './copy.en';

export const marathonCopyEs: MarathonCopy = {
  'rpe.label': 'Esfuerzo',
  'rpe.subt':
    'Termina en torno a 7 sobre 10. Deberías sentir que te quedaban una o dos repeticiones más; si no, el ritmo era demasiado rápido.',
  'rpe.x':
    'Duro, 8 o 9 sobre 10, pero nunca una carrera. Corta la sesión si el ritmo empieza a caer.',
  'rpe.ms':
    'El ritmo de maratón debe sentirse controlado, 6 o 7 sobre 10 al principio. Si parece competición en la primera mitad, hoy el ritmo no es el adecuado.',
  'rpe.easy':
    'Suave, 2 o 3 sobre 10. Debes poder conversar todo el rato. La mayor parte de la semana está aquí, y es intencionado.',
  'rpe.test': 'A tope. Es una carrera, así que trátala como tal.',
  'alt.label': 'O, en su lugar',
  'alt.reason.no_event':
    'Los tests son opcionales. Si no hay parkrun ni carrera, o no te apetece competir, haz esto y actualiza tu estado de forma según cómo hayan ido tus sesiones.',
  'alt.reason.no_hill':
    '¿No tienes una cuesta a mano? Esto cumple la misma función en llano.',
  // -------------------------------------------------------------------------
  // Why this session
  // -------------------------------------------------------------------------
  'why.subt.long':
    'Las repeticiones largas a ritmo sub-umbral son el motor de este método: tiempo suficiente a un esfuerzo controlado para elevar tu umbral, sin el coste de recuperación de una carrera.',
  'why.subt.continuous':
    'Una tirada continua con el ritmo oscilando entre dos marchas sub-umbral. El mismo trabajo que las repeticiones, pero sin dónde esconderte y sin paradas.',
  'why.subt.medium':
    'Las repeticiones medias mantienen el mismo esfuerzo controlado a una marcha algo más rápida, así acumulas tiempo al umbral con algo más de velocidad que las repeticiones largas.',
  'why.subt.connected':
    'Las recuperaciones en carrera fácil mantienen esto casi continuo, que es justo lo que pide la resistencia de maratón: sostener el esfuerzo mucho tiempo sin parar.',
  'why.subt.short':
    'Las repeticiones cortas te permiten tocar un ritmo más rápido sin que el esfuerzo total deje de estar controlado. Mantenimiento de la velocidad que casi no te cuesta recuperación.',
  'why.subt.4515':
    'Cuarenta y cinco segundos fuertes, quince de descanso. Las pausas cortas mantienen el lactato estable mientras el ritmo se mantiene exigente, así consigues mucho tiempo de calidad con muy poco desgaste.',
  'why.subt.3030':
    'Treinta-treinta es la forma más suave de correr rápido: cada repetición es tan corta que te mantienes relajado, y el cambio constante deja el esfuerzo medio justo en el umbral.',

  // -------------------------------------------------------------------------
  // X-sessions
  // -------------------------------------------------------------------------
  'why.x.hills_short':
    'Los sprints cortos de cuesta son trabajo de fuerza disfrazado de carrera: fuerza casi máxima con apenas impacto, por eso conllevan tan poco riesgo de lesión.',
  'why.x.hills_200':
    'Doscientos metros cuesta arriba, por encima del umbral: un clásico del Bakken. La cuesta hace el trabajo de fuerza mientras la velocidad reducida mantiene bajo el riesgo.',
  'why.x.hills_long':
    'Las repeticiones de cuesta más largas se mantienen por encima del umbral el tiempo suficiente para hacer mella, con la pendiente limitando tu velocidad y protegiendo tus piernas.',
  'why.x.4515_progressive':
    'Empieza justo por debajo del umbral y termina por encima. La misma sesión que la versión controlada, pero terminas habiendo tocado un ritmo realmente exigente.',
  'why.x.vo2':
    'Una pequeña dosis de trabajo por encima del umbral. Esto no es un bloque de VO2max, solo mantiene despierta la parte alta mientras el trabajo al umbral hace el grueso del esfuerzo.',
  'why.x.long_rest':
    'Las recuperaciones largas y fáciles convierten esto en diez esfuerzos de calidad independientes en lugar de una sesión de desgaste continuo. Llegas cerca del ritmo de 5K en cada repetición y aun así te recuperas en un día.',
  'why.test':
    'Un 5K a tope es el test de forma física más barato que existe. Compítelo, introduce el resultado, y el resto de tu plan se reajusta automáticamente en torno a él.',

  // -------------------------------------------------------------------------
  // Marathon-specific
  // -------------------------------------------------------------------------
  'why.ms.blocks':
    'Bloques a ritmo de maratón con trotes cortos entre medio. Fraccionado así, puedes sostener el ritmo objetivo mucho más tiempo del que permite una tirada continua, que es justo el objetivo en esta fase.',
  'why.ms.continuous':
    'Un bloque continuo a ritmo de maratón dentro de una tirada más larga. Lo más parecido a un ensayo de carrera: mismo ritmo, misma alimentación, misma monotonía.',
  'why.ms.alternating':
    'Ritmo de maratón con un kilómetro flotante en lugar de descanso. El flotante nunca te deja recuperar del todo, así que la segunda mitad se siente como la segunda mitad de la carrera.',
  'why.ms.progression':
    'Empieza constante, termina a ritmo de maratón. Una progresión enseña disciplina de ritmo desde el principio y te hace correr más rápido justo cuando ya estás cansado.',
  'why.ms.long_specific':
    'La sesión por la que existe esta fase: una tirada larga con la mayor parte de su distancia a ritmo de carrera o cerca de él, corrida con las piernas ya cansadas.',
  'why.ms.progressive_blocks':
    'Cuatro bloques que suben progresivamente hacia el ritmo de maratón. Cada uno es más duro que el anterior mientras se acumula la fatiga: la exigencia específica de los últimos 10 km.',

  // -------------------------------------------------------------------------
  // Taper
  // -------------------------------------------------------------------------
  'why.taper.sharpener':
    'Corta, rápida y cómoda. Intensidad suficiente para mantenerte afilado, demasiado poca como para pasarte factura el día de la carrera.',
  'why.taper.mp':
    'Un breve recordatorio del ritmo de maratón. Lo bastante larga para ensayar el ritmo, lo bastante corta para que termines con ganas de más.',
  'why.taper.primer':
    'Semana de carrera. Un puñado de esfuerzos de un minuto para despertar las piernas: esto no construye forma física, solo evita que te sientas apagado la mañana de la carrera.',

  // -------------------------------------------------------------------------
  // Substitutions: every session has an answer for a bad week
  // -------------------------------------------------------------------------
  'sub.treadmill':
    'Cinta: mantén la banda de ritmo con un 1% de inclinación y corre las mismas duraciones.',
  'sub.no_track':
    'Sin pista: corre las repeticiones por tiempo en lugar de por distancia, en cualquier carretera o camino llano.',
  'sub.no_hill_flat_strides':
    'Sin cuesta: corre los mismos esfuerzos en llano como progresiones relajadas casi al máximo.',
  'sub.no_hill_flat_reps':
    'Sin cuesta: corre las repeticiones en llano a esfuerzo de 5K. Pierdes parte del beneficio de fuerza pero mantienes el estímulo.',
  'sub.treadmill_incline':
    'Cinta: usa una inclinación del 6-10% para la misma duración por repetición.',
  'sub.no_parkrun_solo_tt':
    'Sin parkrun cerca: corre el 5K en solitario como contrarreloj en un recorrido llano y medido.',
  'sub.skip_test_checkin':
    'Prefieres no hacer el test: sáltatelo, corre fácil, y usa el check-in de la sesión para actualizar tu forma física en su lugar.',

  // -------------------------------------------------------------------------
  // Week labels
  // -------------------------------------------------------------------------
  'week.label.base': 'Base sub-umbral',
  'week.label.supportive': 'Construcción del ritmo de maratón',
  'week.label.specific': 'Simulación de carrera',
  'week.label.taper': 'Taper',
  'week.label.deload': 'Semana de descarga',
  'week.label.test': 'Semana de test',
  'week.label.race': 'Semana de carrera',

  // -------------------------------------------------------------------------
  // Strength placement notes
  // -------------------------------------------------------------------------
  'strength.notes.lifting':
    'Haz fuerza después de correr, nunca antes, y nunca el día previo a una sesión dura. Cargas pesadas, pocas repeticiones: estás entrenando economía, no ganando músculo.',
  'strength.notes.plyometrics':
    'Deja varias horas después de correr. Altura máxima y contacto mínimo con el suelo en cada salto: para en el momento en que se pierda el rebote.',
  'strength.notes.hill_sprints':
    'Después de una tirada fácil, mientras aún estés lo bastante fresco para esprintar. Ve aumentando a lo largo de las semanas y detenlos por completo en la semana de carrera. Introdúcelos con cuidado si tienes antecedentes de Aquiles, gemelo, pie o tobillo.',

  // -------------------------------------------------------------------------
  // Session structure vocabulary
  // -------------------------------------------------------------------------
  'anchor.subT.rep3min': 'sub-umbral, repeticiones cortas',
  'anchor.subT.rep6min': 'sub-umbral, repeticiones medias',
  'anchor.subT.rep10min': 'sub-umbral, repeticiones largas',
  'anchor.easy': 'fácil',
  'anchor.mp': 'ritmo de maratón',
  'anchor.mp.pct': '{pct}% del ritmo de maratón',
  'anchor.race': 'ritmo de {distance}',
  'anchor.effort.hill_strong': 'esfuerzo fuerte en cuesta',
  'anchor.effort.hill_max': 'esfuerzo máximo en cuesta',
  'anchor.effort.max_speed': 'velocidad casi máxima',
  'anchor.effort.above_threshold': 'por encima del umbral',
  'anchor.effort.relaxed': 'relajado',
  'seg.warmup': 'calentamiento',
  'seg.cooldown': 'vuelta a la calma',
  'seg.leadIn': 'fácil de inicio',
  'rec.jog': 'trote',
  'rec.walk': 'caminar',
  'rec.easy': 'carrera fácil',
  'rec.float': 'flotante',
  'rec.standing': 'descanso parado',

  // -------------------------------------------------------------------------
  // Day kinds
  // -------------------------------------------------------------------------
  'day.rest': 'Descanso',
  'day.easy': 'Fácil',
  'day.long': 'Tirada larga',
  'day.subT': 'Sub-umbral',
  'day.x': 'Sesión X',
  'day.ms': 'Específica de maratón',
  'day.test': 'Test',
  'day.race': 'Maratón',
  'day.secondRun': 'Segunda tirada',
};
