import type { Locale } from '../types';

/**
 * Page-specific guide content. Pages listed here replace the shared
 * method text with their own article and FAQ, so each URL answers its own
 * search intent instead of repeating the same copy. Keys are English slugs;
 * the matching page in each locale uses the same entry.
 *
 * Facts stay within what the planner implements and what James Copeland's
 * "NSM: Subthreshold Running Kept Simple" describes. HTML is limited to
 * <strong> and <a>.
 */
export interface SeoArticle {
  sections: { title: string; html: string }[];
  faqs: { q: string; a: string }[];
}

type ArticleSet = Record<string, SeoArticle>;

const en: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'What is the Norwegian Singles Method?',
        html: 'The <strong>Norwegian Singles Method</strong> (also called the Norwegian Singles Approach, NSA, or NSM) is a way to train like the Norwegian distance runners without their schedule. Instead of two threshold sessions in one day, you run <strong>one controlled sub-threshold session</strong> on three days of the week and keep every other run easy.',
      },
      {
        title: 'Where it comes from',
        html: 'Elite Norwegian runners use <strong>double threshold</strong> days: two sessions just below lactate threshold, morning and evening, often checked with a lactate meter. That works for full-time athletes. James Copeland, known online as sirpoc, adapted the idea for people with jobs: single sessions, set by pace instead of lactate, and repeated week after week. His book is <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'What a week looks like',
        html: 'A typical week has three sub-threshold workouts: <strong>3 × 10 minutes</strong>, <strong>5 × 6 minutes</strong> and <strong>9 × 3 minutes</strong>, each with about a minute of easy jogging or standing between reps. The rest of the week is easy running. Quality work stays around 20 to 25% of weekly volume, so most of your time is still easy.',
      },
      {
        title: 'Why it works for everyday runners',
        html: 'Running just under threshold builds a lot of aerobic fitness for little fatigue. You finish each session knowing you could do more, so you recover by the next one and can repeat the week for months. Progress comes from consistency and from paces that rise as your race times improve, not from harder workouts.',
      },
      {
        title: 'How to start',
        html: 'Enter a recent 5K or 10K in the calculator above. You get your pace for each rep length, an easy-pace range, and a week matched to the hours you train, from 4.5 to 9 per week. Run the week as written, retest with a race every 6 weeks or so, and let the paces follow.',
      },
    ],
    faqs: [
      {
        q: 'Is the Norwegian Singles Method good for beginners?',
        a: 'It suits runners who already run regularly and can handle three structured sessions a week. If you are new to running, build a few months of easy running first, then start with the lowest weekly hours.',
      },
      {
        q: 'How fast are sub-threshold reps?',
        a: 'Slower than threshold pace. The 3-minute reps sit near 15K race pace, the 6-minute reps near half marathon pace, and the 10-minute reps closer to 30K pace.',
      },
      {
        q: 'Do I need a lactate meter?',
        a: 'No. The method uses pace from a recent race, with heart rate and feel as a check. Finishing every session with something left matters more than a lactate number.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'Who is James Copeland?',
        html: '<strong>James Copeland</strong>, known on running forums as <strong>sirpoc</strong>, is the amateur runner who made the Norwegian Singles approach popular. He shared his training publicly, explained why sub-threshold work let him train consistently, and later wrote it up in <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'The core of his method',
        html: 'Three sub-threshold sessions a week, built from short, medium and long reps, with easy running everywhere else. Paces come from a recent race and stay controlled: the aim is a session you could repeat tomorrow, not one that leaves you flat for days. The same structure is repeated week after week while fitness and paces rise.',
      },
      {
        title: 'How this calculator follows it',
        html: 'The calculator uses Copeland’s rep lengths (3, 6 and 10 minutes), short recoveries, and weekly volumes from 4.5 to 9 hours. Add a marathon date and it builds the <strong>15-week marathon block</strong> from his book, with marathon-pace work inside long runs, tune-up races and a taper.',
      },
      {
        title: 'Independent and unofficial',
        html: 'This site is not affiliated with James Copeland. It is a free tool that turns the published method into paces and plans. For the full reasoning, examples and edge cases, read the book.',
      },
    ],
    faqs: [
      {
        q: 'What is sirpoc’s Norwegian Singles method?',
        a: 'It is James Copeland’s single-session version of Norwegian threshold training: three controlled sub-threshold workouts a week plus easy running, with paces set from a recent race.',
      },
      {
        q: 'What is the name of James Copeland’s book?',
        a: 'NSM: Subthreshold Running Kept Simple. It explains the method, the paces and the 15-week marathon build that this planner uses.',
      },
      {
        q: 'Is this the official James Copeland calculator?',
        a: 'No. It is an independent, free calculator based on his published approach.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'How the 15-week build works',
        html: 'Add your marathon date and the planner counts back <strong>15 weeks</strong>. Each week keeps the sub-threshold sessions that built your fitness, then adds marathon-specific work: blocks at <strong>marathon pace inside longer easy runs</strong>, a longer weekend run, and tune-up races along the way.',
      },
      {
        title: 'Why keep sub-threshold work in a marathon block',
        html: 'Most marathon plans swap aerobic work for long tempo runs and big intervals. The Norwegian Singles build keeps the controlled sessions that let you train every week without breaking down, and layers marathon pace on top. Consistency over 15 weeks beats a few heroic sessions.',
      },
      {
        title: 'Marathon pace and the taper',
        html: 'Marathon pace comes from your current fitness, not a goal time, so the sessions stay realistic. The last weeks cut volume while keeping some quality, so you reach the start line fresh but not flat.',
      },
      {
        title: 'Which weekly hours to pick',
        html: 'Choose the hours you can sustain for the whole 15 weeks, not your best week. Between 6 and 9 hours a week suits most runners targeting a marathon. If you are unsure, start lower: the plan works because you can repeat it.',
      },
    ],
    faqs: [
      {
        q: 'How long is the Norwegian Singles marathon plan?',
        a: '15 weeks, counted back from your race date, following the build in James Copeland’s NSM book.',
      },
      {
        q: 'Do I run long runs in this plan?',
        a: 'Yes. Long easy runs stay in, and some include blocks at marathon pace.',
      },
      {
        q: 'Can I use it for a first marathon?',
        a: 'Yes, if you already run regularly. Pick lower weekly hours and set paces from a recent 5K or 10K.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'The three NSM workouts',
        html: '<strong>10-minute reps</strong> (usually 3 of them) build the longest aerobic stretch of the week. <strong>6-minute reps</strong> (about 5) sit in the middle. <strong>3-minute reps</strong> (about 9) are the quickest. Each rep length has its own pace, all below threshold.',
      },
      {
        title: 'Recoveries',
        html: 'Rest is short: about 60 seconds between 3-minute reps, and 60 to 120 seconds for the longer ones. Stand, walk or jog very easily. Short rests keep the session continuous enough to train the aerobic system without letting the effort climb.',
      },
      {
        title: 'Easy days are part of the method',
        html: 'Everything that is not a sub-threshold session is easy, at or below about 70% of maximum heart rate. Easy days are what let you hit the next workout at the right pace. If fatigue builds, slow the easy runs down before touching the workouts.',
      },
      {
        title: 'Progressing with NSM',
        html: 'Repeat the same week. Every 6 weeks or so, race or time trial a 5K or 10K and update your paces. Add volume slowly by moving up in weekly hours only when the current week feels routine.',
      },
    ],
    faqs: [
      {
        q: 'How many NSM sessions per week?',
        a: 'Three sub-threshold sessions, usually on non-consecutive days, with easy running in between.',
      },
      {
        q: 'What if a session feels hard?',
        a: 'Slow down. Every rep should finish with room left. A session that feels hard means the pace is too fast for today.',
      },
      {
        q: 'Can I add a long run?',
        a: 'Yes. The weekend easy run is often the longest of the week. Keep it easy.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'About the book',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> is James Copeland’s write-up of the Norwegian Singles Method. It explains why sub-threshold training works for amateurs, how to set paces, how to structure a week, and how to build towards a marathon.',
      },
      {
        title: 'Key ideas in short',
        html: 'Train below threshold, never to failure. Use three structured sessions a week with short recoveries and keep the rest easy. Repeat the week and let fitness, not effort, push the paces up. Retest with races instead of chasing harder workouts.',
      },
      {
        title: 'Using the book with this calculator',
        html: 'The book gives the reasoning. This calculator does the arithmetic: enter a race result and get your paces for every rep length, a weekly plan and the 15-week marathon build. Use both together and you can start the method the same day.',
      },
      {
        title: 'Related reading',
        html: 'For the elite double threshold system it grew from, Marius Bakken’s <strong>The Norwegian Method Applied</strong> covers the background in depth.',
      },
    ],
    faqs: [
      {
        q: 'Who wrote the Norwegian Singles Method book?',
        a: 'James Copeland, also known as sirpoc. The book is called NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: 'Is there a free PDF of the book?',
        a: 'Not from this site. The book is sold by its author; the calculator here is free and turns its method into paces and plans.',
      },
      {
        q: 'Do I need the book to use the calculator?',
        a: 'No. The calculator works on its own, but the book explains the reasoning behind every session.',
      },
    ],
  },
};

const es: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: '¿Qué es el Norwegian Singles Method?',
        html: 'El <strong>Norwegian Singles Method</strong> (también llamado Norwegian Singles Approach, NSA o NSM) es una forma de entrenar como los corredores noruegos de fondo sin su horario. En lugar de dos sesiones de umbral en un mismo día, haces <strong>una sola sesión controlada subumbral</strong> tres días a la semana y el resto de las salidas son suaves.',
      },
      {
        title: 'De dónde viene',
        html: 'Los corredores noruegos de élite usan días de <strong>doble umbral</strong>: dos sesiones justo por debajo del umbral de lactato, una por la mañana y otra por la tarde, a menudo controladas con un medidor de lactato. Eso funciona para atletas a tiempo completo. James Copeland, conocido en internet como sirpoc, adaptó la idea para gente con trabajo: sesiones únicas, marcadas por ritmo en lugar de por lactato, y repetidas semana tras semana. Su libro es <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Cómo es una semana',
        html: 'Una semana típica tiene tres entrenamientos subumbral: <strong>3 × 10 minutos</strong>, <strong>5 × 6 minutos</strong> y <strong>9 × 3 minutos</strong>, cada uno con aproximadamente un minuto de trote suave o parado entre repeticiones. El resto de la semana es carrera suave. El trabajo de calidad se mantiene en torno al 20 a 25% del volumen semanal, así que la mayor parte de tu tiempo sigue siendo suave.',
      },
      {
        title: 'Por qué funciona para corredores de a pie',
        html: 'Correr justo por debajo del umbral genera mucha forma aeróbica con poca fatiga. Terminas cada sesión sabiendo que podrías hacer más, así que llegas recuperado a la siguiente y puedes repetir la semana durante meses. El progreso viene de la constancia y de unos ritmos que suben a medida que mejoran tus marcas, no de entrenamientos más duros.',
      },
      {
        title: 'Cómo empezar',
        html: 'Introduce un 5K o un 10K reciente en la calculadora de arriba. Obtienes tu ritmo para cada duración de repetición, un rango de ritmo suave y una semana adaptada a las horas que entrenas, de 4,5 a 9 por semana. Haz la semana tal como está escrita, vuelve a medirte con una carrera cada 6 semanas más o menos y deja que los ritmos te sigan.',
      },
    ],
    faqs: [
      {
        q: '¿Es bueno el Norwegian Singles Method para principiantes?',
        a: 'Va bien a corredores que ya corren con regularidad y aguantan tres sesiones estructuradas a la semana. Si estás empezando a correr, haz primero unos meses de carrera suave y luego empieza con las horas semanales más bajas.',
      },
      {
        q: '¿A qué ritmo van las repeticiones subumbral?',
        a: 'Más lento que el ritmo de umbral. Las repeticiones de 3 minutos se sitúan cerca del ritmo de carrera de 15K, las de 6 minutos cerca del ritmo de media maratón y las de 10 minutos más cerca del ritmo de 30K.',
      },
      {
        q: '¿Necesito un medidor de lactato?',
        a: 'No. El método usa el ritmo de una carrera reciente, con la frecuencia cardíaca y las sensaciones como comprobación. Terminar cada sesión con algo de reserva importa más que un número de lactato.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: '¿Quién es James Copeland?',
        html: '<strong>James Copeland</strong>, conocido en los foros de running como <strong>sirpoc</strong>, es el corredor aficionado que popularizó el Norwegian Singles Approach. Compartió su entrenamiento en público, explicó por qué el trabajo subumbral le permitía entrenar con constancia y más tarde lo puso por escrito en <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'El núcleo de su método',
        html: 'Tres sesiones subumbral a la semana, formadas por repeticiones cortas, medias y largas, y carrera suave en todo lo demás. Los ritmos salen de una carrera reciente y se mantienen controlados: el objetivo es una sesión que podrías repetir mañana, no una que te deje sin piernas durante días. La misma estructura se repite semana tras semana mientras suben la forma y los ritmos.',
      },
      {
        title: 'Cómo lo sigue esta calculadora',
        html: 'La calculadora usa las duraciones de repetición de Copeland (3, 6 y 10 minutos), recuperaciones cortas y volúmenes semanales de 4,5 a 9 horas. Añade la fecha de un maratón y construye el <strong>bloque de maratón de 15 semanas</strong> de su libro, con trabajo a ritmo de maratón dentro de las tiradas largas, carreras de puesta a punto y un tapering.',
      },
      {
        title: 'Independiente y no oficial',
        html: 'Este sitio no tiene ninguna relación con James Copeland. Es una herramienta gratuita que convierte el método publicado en ritmos y planes. Para ver el razonamiento completo, los ejemplos y los casos límite, lee el libro.',
      },
    ],
    faqs: [
      {
        q: '¿Qué es el método Norwegian Singles de sirpoc?',
        a: 'Es la versión de James Copeland del entrenamiento noruego de umbral en una sola sesión: tres entrenamientos subumbral controlados a la semana más carrera suave, con los ritmos marcados a partir de una carrera reciente.',
      },
      {
        q: '¿Cómo se llama el libro de James Copeland?',
        a: 'NSM: Subthreshold Running Kept Simple. Explica el método, los ritmos y el plan de maratón de 15 semanas que usa este planificador.',
      },
      {
        q: '¿Es esta la calculadora oficial de James Copeland?',
        a: 'No. Es una calculadora independiente y gratuita basada en su método publicado.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'Cómo funciona el bloque de 15 semanas',
        html: 'Añade la fecha de tu maratón y el planificador cuenta <strong>15 semanas</strong> hacia atrás. Cada semana mantiene las sesiones subumbral que construyeron tu forma y añade trabajo específico de maratón: bloques a <strong>ritmo de maratón dentro de tiradas suaves más largas</strong>, una salida larga de fin de semana y carreras de puesta a punto por el camino.',
      },
      {
        title: 'Por qué mantener el trabajo subumbral en un bloque de maratón',
        html: 'La mayoría de los planes de maratón cambian el trabajo aeróbico por tiradas largas a tempo e intervalos grandes. El bloque Norwegian Singles mantiene las sesiones controladas que te permiten entrenar cada semana sin romperte, y pone encima el ritmo de maratón. La constancia durante 15 semanas vale más que unas pocas sesiones heroicas.',
      },
      {
        title: 'Ritmo de maratón y tapering',
        html: 'El ritmo de maratón sale de tu forma actual, no de un tiempo objetivo, así que las sesiones se mantienen realistas. Las últimas semanas recortan volumen pero conservan algo de calidad, para que llegues a la salida fresco pero no plano.',
      },
      {
        title: 'Qué horas semanales elegir',
        html: 'Elige las horas que puedes sostener durante las 15 semanas completas, no tu mejor semana. Entre 6 y 9 horas por semana va bien para la mayoría de los corredores que preparan un maratón. Si dudas, empieza más bajo: el plan funciona porque puedes repetirlo.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto dura el plan de maratón Norwegian Singles?',
        a: '15 semanas, contadas hacia atrás desde la fecha de tu carrera, siguiendo el bloque del libro NSM de James Copeland.',
      },
      {
        q: '¿Hago tiradas largas en este plan?',
        a: 'Sí. Las tiradas largas suaves se mantienen y algunas incluyen bloques a ritmo de maratón.',
      },
      {
        q: '¿Puedo usarlo para mi primer maratón?',
        a: 'Sí, si ya corres con regularidad. Elige menos horas semanales y marca los ritmos a partir de un 5K o un 10K reciente.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'Los tres entrenamientos NSM',
        html: 'Las <strong>repeticiones de 10 minutos</strong> (normalmente 3) construyen el tramo aeróbico más largo de la semana. Las <strong>repeticiones de 6 minutos</strong> (unas 5) quedan en el medio. Las <strong>repeticiones de 3 minutos</strong> (unas 9) son las más rápidas. Cada duración de repetición tiene su propio ritmo, todos por debajo del umbral.',
      },
      {
        title: 'Recuperaciones',
        html: 'El descanso es corto: unos 60 segundos entre repeticiones de 3 minutos y de 60 a 120 segundos en las más largas. Quédate de pie, camina o trota muy suave. Los descansos cortos mantienen la sesión lo bastante continua para trabajar el sistema aeróbico sin dejar que el esfuerzo se dispare.',
      },
      {
        title: 'Los días suaves forman parte del método',
        html: 'Todo lo que no es una sesión subumbral es suave, a un 70% o menos de la frecuencia cardíaca máxima aproximadamente. Los días suaves son los que te permiten llegar al siguiente entrenamiento al ritmo correcto. Si se acumula la fatiga, ralentiza primero las salidas suaves antes de tocar los entrenamientos.',
      },
      {
        title: 'Progresar con NSM',
        html: 'Repite la misma semana. Cada 6 semanas más o menos, corre una carrera o una contrarreloj de 5K o 10K y actualiza tus ritmos. Añade volumen poco a poco, subiendo de horas semanales solo cuando la semana actual te resulte rutinaria.',
      },
    ],
    faqs: [
      {
        q: '¿Cuántas sesiones NSM por semana?',
        a: 'Tres sesiones subumbral, normalmente en días no consecutivos, con carrera suave entre medias.',
      },
      {
        q: '¿Y si una sesión se me hace dura?',
        a: 'Baja el ritmo. Cada repetición debe acabar con margen. Una sesión que se siente dura significa que el ritmo es demasiado rápido para hoy.',
      },
      {
        q: '¿Puedo añadir una tirada larga?',
        a: 'Sí. La salida suave del fin de semana suele ser la más larga de la semana. Mantenla suave.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'Sobre el libro',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> es la exposición de James Copeland del Norwegian Singles Method. Explica por qué el entrenamiento subumbral funciona para aficionados, cómo marcar los ritmos, cómo estructurar una semana y cómo construir hacia un maratón.',
      },
      {
        title: 'Ideas clave en breve',
        html: 'Entrena por debajo del umbral, nunca hasta el fallo. Usa tres sesiones estructuradas a la semana con recuperaciones cortas y mantén el resto suave. Repite la semana y deja que la forma, no el esfuerzo, haga subir los ritmos. Vuelve a medirte con carreras en lugar de perseguir entrenamientos más duros.',
      },
      {
        title: 'Usar el libro con esta calculadora',
        html: 'El libro da el razonamiento. Esta calculadora hace las cuentas: introduce el resultado de una carrera y obtén tus ritmos para cada duración de repetición, un plan semanal y el bloque de maratón de 15 semanas. Usa las dos cosas juntas y puedes empezar el método ese mismo día.',
      },
      {
        title: 'Lecturas relacionadas',
        html: 'Para el sistema de doble umbral de élite del que surgió, <strong>The Norwegian Method Applied</strong> de Marius Bakken cubre el contexto en profundidad.',
      },
    ],
    faqs: [
      {
        q: '¿Quién escribió el libro del Norwegian Singles Method?',
        a: 'James Copeland, también conocido como sirpoc. El libro se llama NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: '¿Hay un PDF gratuito del libro?',
        a: 'No en este sitio. El libro lo vende su autor; la calculadora de aquí es gratuita y convierte su método en ritmos y planes.',
      },
      {
        q: '¿Necesito el libro para usar la calculadora?',
        a: 'No. La calculadora funciona por sí sola, pero el libro explica el razonamiento detrás de cada sesión.',
      },
    ],
  },
};

const ko: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'Norwegian Singles Method란 무엇인가요?',
        html: '<strong>Norwegian Singles Method</strong>(Norwegian Singles Approach, NSA, NSM이라고도 부릅니다)는 노르웨이 장거리 선수들의 일정 없이도 그들처럼 훈련하는 방법입니다. 하루에 두 번 역치 훈련을 하는 대신, 일주일에 사흘 <strong>서브스레숄드 훈련을 한 번만 통제된 강도로</strong> 하고 나머지 러닝은 모두 편하게 뜁니다.',
      },
      {
        title: '어디에서 왔나요',
        html: '노르웨이 엘리트 선수들은 <strong>더블 스레숄드</strong> 데이를 활용합니다. 아침과 저녁에 젖산 역치 바로 아래의 훈련을 두 번 하고, 종종 젖산 측정기로 확인합니다. 전업 선수에게는 잘 맞는 방식입니다. 온라인에서 sirpoc으로 알려진 James Copeland는 이 아이디어를 직장인에게 맞게 바꿨습니다. 하루에 한 번만 하고, 젖산 대신 페이스로 강도를 정하며, 매주 반복합니다. 그의 책은 <strong>NSM: Subthreshold Running Kept Simple</strong>입니다.',
      },
      {
        title: '일주일은 어떤 모습인가요',
        html: '전형적인 한 주에는 세 번의 서브스레숄드 훈련이 있습니다. <strong>3 × 10분</strong>, <strong>5 × 6분</strong>, <strong>9 × 3분</strong>이며, 각 반복 사이에는 약 1분간 가볍게 조깅하거나 서서 쉽니다. 나머지 날은 이지 러닝입니다. 질 높은 훈련은 주간 볼륨의 20 ~ 25% 정도로 유지되므로, 대부분의 시간은 여전히 편하게 뜁니다.',
      },
      {
        title: '일반 러너에게 효과적인 이유',
        html: '역치 바로 아래로 달리면 피로는 적게 쌓이면서 유산소 능력이 크게 늘어납니다. 매 세션을 끝낼 때 더 할 수 있다고 느끼므로 다음 훈련까지 회복되고, 몇 달 동안 같은 주를 반복할 수 있습니다. 성장은 더 힘든 훈련이 아니라 꾸준함과, 기록이 좋아짐에 따라 올라가는 페이스에서 나옵니다.',
      },
      {
        title: '시작하는 방법',
        html: '위 계산기에 최근 5K 또는 10K 기록을 입력하세요. 반복 길이별 페이스, 이지 페이스 범위, 그리고 주당 4.5시간에서 9시간 사이에서 훈련 시간에 맞춘 한 주 계획이 나옵니다. 적힌 대로 한 주를 소화하고, 6주마다 한 번 정도 대회로 다시 측정한 뒤 페이스를 따라 올리세요.',
      },
    ],
    faqs: [
      {
        q: 'Norwegian Singles Method는 초보자에게 좋은가요?',
        a: '이미 꾸준히 달리고 있고 일주일에 세 번의 구조화된 훈련을 소화할 수 있는 러너에게 맞습니다. 러닝을 막 시작했다면 먼저 몇 달 동안 이지 러닝으로 기초를 쌓고, 가장 적은 주간 시간부터 시작하세요.',
      },
      {
        q: '서브스레숄드 반복은 얼마나 빠르게 뛰나요?',
        a: '역치 페이스보다 느립니다. 3분 반복은 15K 대회 페이스 근처, 6분 반복은 하프 마라톤 페이스 근처, 10분 반복은 30K 페이스에 더 가깝습니다.',
      },
      {
        q: '젖산 측정기가 필요한가요?',
        a: '아니요. 이 방법은 최근 대회 기록에서 나온 페이스를 사용하고, 심박수와 체감 강도로 확인합니다. 젖산 수치보다 매 세션을 여유를 남기고 끝내는 것이 더 중요합니다.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'James Copeland는 누구인가요?',
        html: '러닝 포럼에서 <strong>sirpoc</strong>으로 알려진 <strong>James Copeland</strong>는 Norwegian Singles Approach를 널리 알린 아마추어 러너입니다. 그는 자신의 훈련을 공개적으로 공유했고, 서브스레숄드 훈련 덕분에 꾸준히 훈련할 수 있었던 이유를 설명했으며, 나중에 이를 <strong>NSM: Subthreshold Running Kept Simple</strong>로 정리했습니다.',
      },
      {
        title: '그의 방법의 핵심',
        html: '짧은 반복, 중간 반복, 긴 반복으로 구성한 서브스레숄드 훈련을 일주일에 세 번 하고, 나머지는 모두 이지 러닝입니다. 페이스는 최근 대회 기록에서 정하고 통제된 상태를 유지합니다. 목표는 며칠 동안 지치게 만드는 훈련이 아니라 내일도 반복할 수 있는 훈련입니다. 체력과 페이스가 올라가는 동안에도 같은 구조를 매주 반복합니다.',
      },
      {
        title: '이 계산기가 따르는 방식',
        html: '이 계산기는 Copeland의 반복 길이(3분, 6분, 10분), 짧은 회복, 주당 4.5시간에서 9시간까지의 주간 볼륨을 사용합니다. 마라톤 날짜를 추가하면 그의 책에 나오는 <strong>15주 마라톤 블록</strong>을 만들어 줍니다. 롱런 안의 마라톤 페이스 훈련, 점검용 대회, 테이퍼링이 포함됩니다.',
      },
      {
        title: '독립적이며 비공식입니다',
        html: '이 사이트는 James Copeland와 관련이 없습니다. 공개된 방법을 페이스와 계획으로 바꿔 주는 무료 도구입니다. 전체 논리, 예시, 예외 상황은 책에서 확인하세요.',
      },
    ],
    faqs: [
      {
        q: 'sirpoc의 Norwegian Singles 방법이란 무엇인가요?',
        a: '노르웨이식 역치 훈련을 하루 한 번으로 바꾼 James Copeland의 버전입니다. 일주일에 세 번의 통제된 서브스레숄드 훈련과 이지 러닝으로 구성되며, 페이스는 최근 대회 기록에서 정합니다.',
      },
      {
        q: 'James Copeland의 책 제목은 무엇인가요?',
        a: 'NSM: Subthreshold Running Kept Simple입니다. 이 플래너가 사용하는 방법, 페이스, 15주 마라톤 빌드를 설명합니다.',
      },
      {
        q: '이 계산기는 James Copeland 공식 계산기인가요?',
        a: '아니요. 그가 공개한 방법을 바탕으로 만든 독립적인 무료 계산기입니다.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: '15주 빌드는 어떻게 작동하나요',
        html: '마라톤 날짜를 입력하면 플래너가 거꾸로 <strong>15주</strong>를 계산합니다. 매주 체력을 만들어 준 서브스레숄드 훈련을 유지하면서 마라톤 전용 훈련을 더합니다. 더 긴 이지 러닝 안에서 하는 <strong>마라톤 페이스 구간</strong>, 더 긴 주말 러닝, 중간중간의 점검용 대회가 그것입니다.',
      },
      {
        title: '마라톤 블록에서도 서브스레숄드 훈련을 유지하는 이유',
        html: '대부분의 마라톤 계획은 유산소 훈련을 긴 템포런과 강한 인터벌로 바꿉니다. Norwegian Singles 빌드는 무너지지 않고 매주 훈련할 수 있게 해 주는 통제된 세션을 유지하고, 그 위에 마라톤 페이스를 얹습니다. 15주 동안의 꾸준함이 몇 번의 영웅적인 훈련보다 낫습니다.',
      },
      {
        title: '마라톤 페이스와 테이퍼링',
        html: '마라톤 페이스는 목표 기록이 아니라 현재 체력에서 나오므로 세션이 현실적으로 유지됩니다. 마지막 몇 주는 볼륨을 줄이면서도 약간의 질 높은 훈련을 유지해, 출발선에 지치지 않고 상쾌하게 설 수 있습니다.',
      },
      {
        title: '주간 시간은 얼마로 정할까요',
        html: '가장 좋았던 한 주가 아니라 15주 내내 유지할 수 있는 시간을 고르세요. 마라톤을 준비하는 대부분의 러너에게는 주당 6시간에서 9시간이 알맞습니다. 확신이 없다면 낮게 시작하세요. 이 계획은 반복할 수 있기 때문에 효과가 있습니다.',
      },
    ],
    faqs: [
      {
        q: 'Norwegian Singles 마라톤 계획은 얼마나 긴가요?',
        a: '대회 날짜에서 거꾸로 센 15주이며, James Copeland의 NSM 책에 나오는 빌드를 따릅니다.',
      },
      {
        q: '이 계획에도 롱런이 있나요?',
        a: '네. 긴 이지 러닝이 유지되고, 일부에는 마라톤 페이스 구간이 포함됩니다.',
      },
      {
        q: '첫 마라톤에도 사용할 수 있나요?',
        a: '이미 꾸준히 달리고 있다면 가능합니다. 주간 시간을 낮게 고르고, 최근 5K 또는 10K 기록으로 페이스를 정하세요.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'NSM의 세 가지 훈련',
        html: '<strong>10분 반복</strong>(보통 3회)은 한 주에서 가장 긴 유산소 구간을 만듭니다. <strong>6분 반복</strong>(약 5회)은 중간입니다. <strong>3분 반복</strong>(약 9회)은 가장 빠릅니다. 반복 길이마다 고유한 페이스가 있고, 모두 역치 아래입니다.',
      },
      {
        title: '회복',
        html: '휴식은 짧습니다. 3분 반복 사이에는 약 60초, 더 긴 반복에서는 60초에서 120초입니다. 서 있거나 걷거나 아주 가볍게 조깅하세요. 짧은 휴식은 강도가 올라가지 않게 하면서도 유산소 시스템을 훈련할 수 있을 만큼 세션을 이어지게 해 줍니다.',
      },
      {
        title: '이지 데이도 방법의 일부입니다',
        html: '서브스레숄드 훈련이 아닌 모든 러닝은 최대 심박수의 약 70% 이하로 편하게 뜁니다. 이지 데이가 있어야 다음 훈련을 올바른 페이스로 해낼 수 있습니다. 피로가 쌓이면 훈련 강도를 건드리기 전에 먼저 이지 러닝의 속도를 늦추세요.',
      },
      {
        title: 'NSM으로 발전하기',
        html: '같은 한 주를 반복하세요. 6주마다 한 번 정도 5K 또는 10K를 대회나 타임트라이얼로 뛰고 페이스를 업데이트하세요. 볼륨은 천천히 늘립니다. 현재의 한 주가 익숙하게 느껴질 때만 주간 시간을 올리세요.',
      },
    ],
    faqs: [
      {
        q: '일주일에 NSM 세션은 몇 번인가요?',
        a: '서브스레숄드 세션 세 번이며, 보통 연속되지 않는 날에 하고 사이에 이지 러닝을 넣습니다.',
      },
      {
        q: '세션이 힘들게 느껴지면 어떻게 하나요?',
        a: '속도를 늦추세요. 모든 반복은 여유를 남기고 끝나야 합니다. 세션이 힘들게 느껴진다면 오늘 컨디션에는 페이스가 너무 빠르다는 뜻입니다.',
      },
      {
        q: '롱런을 추가해도 되나요?',
        a: '네. 주말의 이지 러닝이 한 주에서 가장 긴 경우가 많습니다. 편하게 유지하세요.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: '책 소개',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong>은 James Copeland가 Norwegian Singles Method를 정리한 책입니다. 서브스레숄드 훈련이 아마추어에게 효과적인 이유, 페이스를 정하는 방법, 한 주를 구성하는 방법, 마라톤을 향해 쌓아 가는 방법을 설명합니다.',
      },
      {
        title: '핵심 아이디어 요약',
        html: '역치 아래에서 훈련하고, 절대 한계까지 가지 마세요. 일주일에 짧은 회복이 있는 세 번의 구조화된 세션을 하고 나머지는 편하게 유지하세요. 같은 한 주를 반복하고, 노력이 아니라 체력이 페이스를 끌어올리게 하세요. 더 힘든 훈련을 쫓기보다 대회로 다시 측정하세요.',
      },
      {
        title: '이 계산기와 책을 함께 사용하기',
        html: '책은 논리를 알려 주고, 이 계산기는 계산을 해 줍니다. 대회 기록을 입력하면 모든 반복 길이의 페이스, 주간 계획, 15주 마라톤 빌드를 얻을 수 있습니다. 둘을 함께 사용하면 같은 날 바로 이 방법을 시작할 수 있습니다.',
      },
      {
        title: '함께 읽을 책',
        html: '이 방법의 뿌리가 된 엘리트 더블 스레숄드 시스템에 대해서는 Marius Bakken의 <strong>The Norwegian Method Applied</strong>가 배경을 깊이 있게 다룹니다.',
      },
    ],
    faqs: [
      {
        q: 'Norwegian Singles Method 책은 누가 썼나요?',
        a: 'sirpoc으로도 알려진 James Copeland입니다. 책 제목은 NSM: Subthreshold Running Kept Simple입니다.',
      },
      {
        q: '책의 무료 PDF가 있나요?',
        a: '이 사이트에는 없습니다. 책은 저자가 판매하고 있으며, 여기 계산기는 무료로 그의 방법을 페이스와 계획으로 바꿔 줍니다.',
      },
      {
        q: '계산기를 쓰려면 책이 필요한가요?',
        a: '아니요. 계산기는 혼자서도 작동하지만, 책은 모든 세션의 논리를 설명해 줍니다.',
      },
    ],
  },
};

const de: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'Was ist die Norwegian Singles Method?',
        html: 'Die <strong>Norwegian Singles Method</strong> (auch Norwegian Singles Approach, NSA oder NSM genannt) ist eine Art, wie die norwegischen Distanzläufer zu trainieren, ohne ihren Tagesablauf zu brauchen. Statt zwei Schwellentrainings an einem Tag läufst du an drei Tagen pro Woche <strong>eine kontrollierte Einheit unterhalb der Schwelle</strong> und alle anderen Läufe bleiben locker.',
      },
      {
        title: 'Woher sie kommt',
        html: 'Norwegische Spitzenläufer nutzen <strong>Doppelschwelle</strong>-Tage: zwei Einheiten knapp unter der Laktatschwelle, morgens und abends, oft mit einem Laktatmessgerät kontrolliert. Das funktioniert für Vollzeitathleten. James Copeland, online als sirpoc bekannt, hat die Idee für Menschen mit Job angepasst: einzelne Einheiten, nach Tempo statt nach Laktat gesteuert und Woche für Woche wiederholt. Sein Buch heißt <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Wie eine Woche aussieht',
        html: 'Eine typische Woche hat drei Sub-Threshold-Einheiten: <strong>3 × 10 Minuten</strong>, <strong>5 × 6 Minuten</strong> und <strong>9 × 3 Minuten</strong>, jeweils mit etwa einer Minute lockerem Traben oder Stehen zwischen den Wiederholungen. Der Rest der Woche besteht aus lockeren Läufen. Die Qualitätseinheiten machen etwa 20 bis 25% des Wochenumfangs aus, der größte Teil deiner Zeit bleibt also locker.',
      },
      {
        title: 'Warum es für Alltagsläufer funktioniert',
        html: 'Läufe knapp unter der Schwelle bauen viel aerobe Fitness auf, bei wenig Ermüdung. Du beendest jede Einheit mit dem Gefühl, mehr zu können, bist bis zur nächsten erholt und kannst die Woche monatelang wiederholen. Fortschritt kommt aus Kontinuität und aus Tempi, die mit deinen besser werdenden Wettkampfzeiten steigen, nicht aus härteren Einheiten.',
      },
      {
        title: 'So fängst du an',
        html: 'Gib im Rechner oben einen aktuellen 5-km- oder 10-km-Lauf ein. Du bekommst dein Tempo für jede Wiederholungslänge, einen Bereich für das lockere Tempo und eine Woche passend zu deinen Trainingsstunden, von 4,5 bis 9 pro Woche. Lauf die Woche wie vorgegeben, teste dich etwa alle 6 Wochen mit einem Wettkampf neu und lass die Tempi nachziehen.',
      },
    ],
    faqs: [
      {
        q: 'Ist die Norwegian Singles Method etwas für Anfänger?',
        a: 'Sie passt zu Läufern, die schon regelmäßig laufen und drei strukturierte Einheiten pro Woche verkraften. Wenn du neu im Laufen bist, baue zuerst einige Monate lockeres Laufen auf und starte dann mit den wenigsten Wochenstunden.',
      },
      {
        q: 'Wie schnell sind Sub-Threshold-Wiederholungen?',
        a: 'Langsamer als das Schwellentempo. Die 3-Minuten-Wiederholungen liegen nahe am 15-km-Wettkampftempo, die 6-Minuten-Wiederholungen nahe am Halbmarathontempo und die 10-Minuten-Wiederholungen eher beim 30-km-Tempo.',
      },
      {
        q: 'Brauche ich ein Laktatmessgerät?',
        a: 'Nein. Die Methode nutzt das Tempo aus einem aktuellen Wettkampf, mit Herzfrequenz und Körpergefühl als Kontrolle. Jede Einheit mit Reserve zu beenden ist wichtiger als ein Laktatwert.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'Wer ist James Copeland?',
        html: '<strong>James Copeland</strong>, in Lauf-Foren als <strong>sirpoc</strong> bekannt, ist der Hobbyläufer, der den Norwegian Singles Approach populär gemacht hat. Er teilte sein Training öffentlich, erklärte, warum ihm Sub-Threshold-Training konsequentes Training ermöglichte, und schrieb es später in <strong>NSM: Subthreshold Running Kept Simple</strong> auf.',
      },
      {
        title: 'Der Kern seiner Methode',
        html: 'Drei Sub-Threshold-Einheiten pro Woche aus kurzen, mittleren und langen Wiederholungen, dazu überall sonst lockeres Laufen. Die Tempi kommen aus einem aktuellen Wettkampf und bleiben kontrolliert: Ziel ist eine Einheit, die du morgen wiederholen könntest, keine, die dich tagelang platt macht. Dieselbe Struktur wird Woche für Woche wiederholt, während Fitness und Tempi steigen.',
      },
      {
        title: 'Wie der Rechner das umsetzt',
        html: 'Der Rechner nutzt Copelands Wiederholungslängen (3, 6 und 10 Minuten), kurze Pausen und Wochenumfänge von 4,5 bis 9 Stunden. Gib ein Marathon-Datum ein und er baut den <strong>15-Wochen-Marathonblock</strong> aus seinem Buch, mit Marathontempo-Abschnitten in den langen Läufen, Vorbereitungswettkämpfen und einem Tapering.',
      },
      {
        title: 'Unabhängig und inoffiziell',
        html: 'Diese Seite steht in keiner Verbindung zu James Copeland. Sie ist ein kostenloses Tool, das die veröffentlichte Methode in Tempi und Pläne übersetzt. Für die vollständige Begründung, Beispiele und Sonderfälle lies das Buch.',
      },
    ],
    faqs: [
      {
        q: 'Was ist sirpocs Norwegian-Singles-Methode?',
        a: 'Es ist James Copelands Version des norwegischen Schwellentrainings mit einzelnen Einheiten: drei kontrollierte Sub-Threshold-Einheiten pro Woche plus lockeres Laufen, mit Tempi aus einem aktuellen Wettkampf.',
      },
      {
        q: 'Wie heißt das Buch von James Copeland?',
        a: 'NSM: Subthreshold Running Kept Simple. Es erklärt die Methode, die Tempi und den 15-Wochen-Marathonaufbau, den dieser Planer nutzt.',
      },
      {
        q: 'Ist das der offizielle Rechner von James Copeland?',
        a: 'Nein. Es ist ein unabhängiger, kostenloser Rechner auf Basis seines veröffentlichten Ansatzes.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'So funktioniert der 15-Wochen-Aufbau',
        html: 'Gib dein Marathon-Datum ein und der Planer zählt <strong>15 Wochen</strong> zurück. Jede Woche behält die Sub-Threshold-Einheiten, die deine Fitness aufgebaut haben, und fügt marathonspezifische Arbeit hinzu: Abschnitte im <strong>Marathontempo innerhalb längerer lockerer Läufe</strong>, einen längeren Lauf am Wochenende und Vorbereitungswettkämpfe unterwegs.',
      },
      {
        title: 'Warum Sub-Threshold-Training im Marathonblock bleibt',
        html: 'Die meisten Marathonpläne ersetzen aerobe Arbeit durch lange Tempoläufe und große Intervalle. Der Norwegian-Singles-Aufbau behält die kontrollierten Einheiten, mit denen du jede Woche trainieren kannst, ohne zusammenzubrechen, und legt das Marathontempo obendrauf. Kontinuität über 15 Wochen schlägt ein paar heroische Einheiten.',
      },
      {
        title: 'Marathontempo und Tapering',
        html: 'Das Marathontempo richtet sich nach deiner aktuellen Fitness, nicht nach einer Wunschzeit, damit die Einheiten realistisch bleiben. In den letzten Wochen sinkt der Umfang, während etwas Qualität erhalten bleibt, damit du frisch, aber nicht platt an der Startlinie stehst.',
      },
      {
        title: 'Welche Wochenstunden du wählen solltest',
        html: 'Wähle die Stunden, die du über alle 15 Wochen durchhalten kannst, nicht deine beste Woche. Zwischen 6 und 9 Stunden pro Woche passen für die meisten Läufer mit Marathonziel. Wenn du unsicher bist, starte niedriger: Der Plan funktioniert, weil du ihn wiederholen kannst.',
      },
    ],
    faqs: [
      {
        q: 'Wie lang ist der Norwegian-Singles-Marathonplan?',
        a: '15 Wochen, vom Wettkampftermin zurückgerechnet, nach dem Aufbau in James Copelands NSM-Buch.',
      },
      {
        q: 'Laufe ich in diesem Plan lange Läufe?',
        a: 'Ja. Lange lockere Läufe bleiben drin, und einige enthalten Abschnitte im Marathontempo.',
      },
      {
        q: 'Kann ich ihn für meinen ersten Marathon nutzen?',
        a: 'Ja, wenn du schon regelmäßig läufst. Wähle weniger Wochenstunden und lege die Tempi anhand eines aktuellen 5-km- oder 10-km-Laufs fest.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'Die drei NSM-Einheiten',
        html: '<strong>10-Minuten-Wiederholungen</strong> (meist 3) bauen den längsten aeroben Abschnitt der Woche auf. <strong>6-Minuten-Wiederholungen</strong> (etwa 5) liegen in der Mitte. <strong>3-Minuten-Wiederholungen</strong> (etwa 9) sind die schnellsten. Jede Wiederholungslänge hat ihr eigenes Tempo, alle unterhalb der Schwelle.',
      },
      {
        title: 'Pausen',
        html: 'Die Pausen sind kurz: etwa 60 Sekunden zwischen 3-Minuten-Wiederholungen und 60 bis 120 Sekunden bei den längeren. Steh, geh oder trab ganz locker. Kurze Pausen halten die Einheit zusammenhängend genug, um das aerobe System zu trainieren, ohne dass die Belastung hochschießt.',
      },
      {
        title: 'Lockere Tage gehören zur Methode',
        html: 'Alles, was keine Sub-Threshold-Einheit ist, läuft locker, bei etwa 70% der maximalen Herzfrequenz oder darunter. Lockere Tage sorgen dafür, dass du das nächste Training im richtigen Tempo triffst. Wenn sich Müdigkeit aufbaut, werde zuerst bei den lockeren Läufen langsamer, bevor du an den Einheiten etwas änderst.',
      },
      {
        title: 'Fortschritt mit NSM',
        html: 'Wiederhole dieselbe Woche. Etwa alle 6 Wochen läufst du einen 5-km- oder 10-km-Wettkampf oder Zeitlauf und aktualisierst deine Tempi. Steigere den Umfang langsam: Erhöhe die Wochenstunden erst, wenn sich die aktuelle Woche routiniert anfühlt.',
      },
    ],
    faqs: [
      {
        q: 'Wie viele NSM-Einheiten pro Woche?',
        a: 'Drei Sub-Threshold-Einheiten, meist an nicht aufeinanderfolgenden Tagen, dazwischen lockeres Laufen.',
      },
      {
        q: 'Was, wenn sich eine Einheit hart anfühlt?',
        a: 'Werde langsamer. Jede Wiederholung sollte mit Reserve enden. Fühlt sich eine Einheit hart an, ist das Tempo für heute zu schnell.',
      },
      {
        q: 'Kann ich einen langen Lauf ergänzen?',
        a: 'Ja. Der lockere Lauf am Wochenende ist oft der längste der Woche. Halte ihn locker.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'Über das Buch',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> ist James Copelands Darstellung der Norwegian Singles Method. Es erklärt, warum Sub-Threshold-Training für Hobbyläufer funktioniert, wie man Tempi festlegt, wie man eine Woche aufbaut und wie man auf einen Marathon hinarbeitet.',
      },
      {
        title: 'Die Kernideen kurz gefasst',
        html: 'Trainiere unterhalb der Schwelle, nie bis zum Versagen. Nutze drei strukturierte Einheiten pro Woche mit kurzen Pausen und halte den Rest locker. Wiederhole die Woche und lass die Fitness, nicht die Anstrengung, die Tempi nach oben ziehen. Teste dich mit Wettkämpfen neu, statt härteren Einheiten nachzujagen.',
      },
      {
        title: 'Das Buch zusammen mit diesem Rechner nutzen',
        html: 'Das Buch liefert die Begründung. Dieser Rechner übernimmt die Rechenarbeit: Gib ein Wettkampfergebnis ein und erhalte deine Tempi für jede Wiederholungslänge, einen Wochenplan und den 15-Wochen-Marathonaufbau. Nutzt du beides zusammen, kannst du noch am selben Tag mit der Methode starten.',
      },
      {
        title: 'Weiterführende Lektüre',
        html: 'Für das Doppelschwelle-System der Elite, aus dem alles hervorging, behandelt <strong>The Norwegian Method Applied</strong> von Marius Bakken den Hintergrund ausführlich.',
      },
    ],
    faqs: [
      {
        q: 'Wer hat das Buch zur Norwegian Singles Method geschrieben?',
        a: 'James Copeland, auch als sirpoc bekannt. Das Buch heißt NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: 'Gibt es das Buch als kostenloses PDF?',
        a: 'Nicht auf dieser Seite. Das Buch wird von seinem Autor verkauft; der Rechner hier ist kostenlos und übersetzt seine Methode in Tempi und Pläne.',
      },
      {
        q: 'Brauche ich das Buch, um den Rechner zu nutzen?',
        a: 'Nein. Der Rechner funktioniert für sich allein, aber das Buch erklärt die Begründung hinter jeder Einheit.',
      },
    ],
  },
};

const fr: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'Qu’est-ce que la Norwegian Singles Method ?',
        html: 'La <strong>Norwegian Singles Method</strong> (aussi appelée Norwegian Singles Approach, NSA ou NSM) est une façon de t’entraîner comme les coureurs de fond norvégiens sans avoir leur emploi du temps. Au lieu de deux séances au seuil dans la même journée, tu fais <strong>une seule séance contrôlée sous le seuil</strong> trois jours par semaine et tout le reste est en endurance facile.',
      },
      {
        title: 'D’où ça vient',
        html: 'Les coureurs norvégiens de haut niveau font des journées de <strong>double seuil</strong> : deux séances juste sous le seuil lactique, matin et soir, souvent contrôlées avec un lactatomètre. Ça marche pour des athlètes à plein temps. James Copeland, connu en ligne sous le nom de sirpoc, a adapté l’idée pour les gens qui travaillent : des séances uniques, réglées à l’allure plutôt qu’au lactate, et répétées semaine après semaine. Son livre s’appelle <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'À quoi ressemble une semaine',
        html: 'Une semaine type comprend trois séances sous le seuil : <strong>3 × 10 minutes</strong>, <strong>5 × 6 minutes</strong> et <strong>9 × 3 minutes</strong>, chacune avec environ une minute de trot lent ou d’arrêt entre les répétitions. Le reste de la semaine, c’est de la course facile. Le travail de qualité reste autour de 20 à 25% du volume hebdomadaire, donc la plus grande partie de ton temps reste facile.',
      },
      {
        title: 'Pourquoi ça marche pour les coureurs du quotidien',
        html: 'Courir juste sous le seuil construit beaucoup de condition aérobie pour peu de fatigue. Tu finis chaque séance en sachant que tu pourrais en faire plus, donc tu es récupéré pour la suivante et tu peux répéter la semaine pendant des mois. Le progrès vient de la régularité et d’allures qui montent à mesure que tes chronos s’améliorent, pas de séances plus dures.',
      },
      {
        title: 'Comment démarrer',
        html: 'Entre un 5K ou un 10K récent dans le calculateur ci-dessus. Tu obtiens ton allure pour chaque durée de répétition, une plage d’allure facile et une semaine adaptée à tes heures d’entraînement, de 4,5 à 9 par semaine. Fais la semaine telle qu’elle est écrite, refais un test en course toutes les 6 semaines environ et laisse les allures suivre.',
      },
    ],
    faqs: [
      {
        q: 'La Norwegian Singles Method convient-elle aux débutants ?',
        a: 'Elle convient aux coureurs qui courent déjà régulièrement et qui supportent trois séances structurées par semaine. Si tu débutes, construis d’abord quelques mois de course facile, puis commence avec le plus petit nombre d’heures hebdomadaires.',
      },
      {
        q: 'À quelle vitesse se font les répétitions sous le seuil ?',
        a: 'Plus lentement que l’allure seuil. Les répétitions de 3 minutes se situent près de l’allure de course sur 15K, celles de 6 minutes près de l’allure semi-marathon et celles de 10 minutes plus près de l’allure sur 30K.',
      },
      {
        q: 'Ai-je besoin d’un lactatomètre ?',
        a: 'Non. La méthode utilise l’allure d’une course récente, avec la fréquence cardiaque et les sensations comme vérification. Finir chaque séance avec de la réserve compte plus qu’une valeur de lactate.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'Qui est James Copeland ?',
        html: '<strong>James Copeland</strong>, connu sur les forums de course à pied sous le nom de <strong>sirpoc</strong>, est le coureur amateur qui a rendu populaire la Norwegian Singles Approach. Il a partagé son entraînement publiquement, expliqué pourquoi le travail sous le seuil lui permettait de s’entraîner avec régularité, puis l’a mis par écrit dans <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Le cœur de sa méthode',
        html: 'Trois séances sous le seuil par semaine, construites avec des répétitions courtes, moyennes et longues, et de la course facile partout ailleurs. Les allures viennent d’une course récente et restent contrôlées : le but est une séance que tu pourrais refaire demain, pas une qui te laisse vidé pendant des jours. La même structure est répétée semaine après semaine pendant que la forme et les allures progressent.',
      },
      {
        title: 'Comment ce calculateur la suit',
        html: 'Le calculateur reprend les durées de répétition de Copeland (3, 6 et 10 minutes), des récupérations courtes et des volumes hebdomadaires de 4,5 à 9 heures. Ajoute une date de marathon et il construit le <strong>bloc marathon de 15 semaines</strong> de son livre, avec du travail à allure marathon dans les sorties longues, des courses de préparation et un affûtage.',
      },
      {
        title: 'Indépendant et non officiel',
        html: 'Ce site n’est pas affilié à James Copeland. C’est un outil gratuit qui transforme la méthode publiée en allures et en plans. Pour le raisonnement complet, les exemples et les cas particuliers, lis le livre.',
      },
    ],
    faqs: [
      {
        q: 'Qu’est-ce que la méthode Norwegian Singles de sirpoc ?',
        a: 'C’est la version de James Copeland de l’entraînement norvégien au seuil en séance unique : trois séances contrôlées sous le seuil par semaine plus de la course facile, avec des allures réglées d’après une course récente.',
      },
      {
        q: 'Comment s’appelle le livre de James Copeland ?',
        a: 'NSM: Subthreshold Running Kept Simple. Il explique la méthode, les allures et la préparation marathon de 15 semaines qu’utilise ce planificateur.',
      },
      {
        q: 'Est-ce le calculateur officiel de James Copeland ?',
        a: 'Non. C’est un calculateur indépendant et gratuit, basé sur son approche publiée.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'Comment fonctionne la préparation de 15 semaines',
        html: 'Ajoute la date de ton marathon et le planificateur compte <strong>15 semaines</strong> à rebours. Chaque semaine garde les séances sous le seuil qui ont construit ta forme, puis ajoute du travail spécifique marathon : des blocs à <strong>allure marathon à l’intérieur de sorties faciles plus longues</strong>, une sortie plus longue le week-end et des courses de préparation en chemin.',
      },
      {
        title: 'Pourquoi garder le travail sous le seuil dans un bloc marathon',
        html: 'La plupart des plans marathon remplacent le travail aérobie par de longs footings tempo et de gros fractionnés. La préparation Norwegian Singles garde les séances contrôlées qui te permettent de t’entraîner chaque semaine sans te casser, et ajoute l’allure marathon par-dessus. La régularité sur 15 semaines vaut mieux que quelques séances héroïques.',
      },
      {
        title: 'Allure marathon et affûtage',
        html: 'L’allure marathon vient de ta forme actuelle, pas d’un temps objectif, donc les séances restent réalistes. Les dernières semaines réduisent le volume tout en gardant un peu de qualité, pour que tu arrives sur la ligne de départ frais, mais pas éteint.',
      },
      {
        title: 'Quel volume horaire choisir',
        html: 'Choisis les heures que tu peux tenir pendant les 15 semaines, pas celles de ta meilleure semaine. Entre 6 et 9 heures par semaine convient à la plupart des coureurs qui visent un marathon. Si tu hésites, pars plus bas : le plan marche parce que tu peux le répéter.',
      },
    ],
    faqs: [
      {
        q: 'Combien de temps dure le plan marathon Norwegian Singles ?',
        a: '15 semaines, comptées à rebours depuis la date de ta course, selon la préparation du livre NSM de James Copeland.',
      },
      {
        q: 'Est-ce que je fais des sorties longues dans ce plan ?',
        a: 'Oui. Les sorties longues faciles sont conservées, et certaines comportent des blocs à allure marathon.',
      },
      {
        q: 'Puis-je l’utiliser pour un premier marathon ?',
        a: 'Oui, si tu cours déjà régulièrement. Choisis moins d’heures hebdomadaires et règle les allures d’après un 5K ou un 10K récent.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'Les trois séances NSM',
        html: 'Les <strong>répétitions de 10 minutes</strong> (en général 3) construisent la plus longue plage aérobie de la semaine. Les <strong>répétitions de 6 minutes</strong> (environ 5) se placent au milieu. Les <strong>répétitions de 3 minutes</strong> (environ 9) sont les plus rapides. Chaque durée de répétition a sa propre allure, toutes sous le seuil.',
      },
      {
        title: 'Récupérations',
        html: 'Le repos est court : environ 60 secondes entre les répétitions de 3 minutes, et de 60 à 120 secondes pour les plus longues. Reste debout, marche ou trotte très lentement. Les repos courts gardent la séance assez continue pour travailler le système aérobie sans laisser l’effort grimper.',
      },
      {
        title: 'Les jours faciles font partie de la méthode',
        html: 'Tout ce qui n’est pas une séance sous le seuil est facile, à environ 70% de la fréquence cardiaque maximale ou moins. Ce sont les jours faciles qui te permettent d’aborder la séance suivante à la bonne allure. Si la fatigue s’accumule, ralentis d’abord les sorties faciles avant de toucher aux séances.',
      },
      {
        title: 'Progresser avec la NSM',
        html: 'Répète la même semaine. Toutes les 6 semaines environ, cours un 5K ou un 10K en course ou en test chronométré et mets tes allures à jour. Augmente le volume lentement, en passant à plus d’heures hebdomadaires seulement quand la semaine en cours te semble routinière.',
      },
    ],
    faqs: [
      {
        q: 'Combien de séances NSM par semaine ?',
        a: 'Trois séances sous le seuil, en général sur des jours non consécutifs, avec de la course facile entre les deux.',
      },
      {
        q: 'Et si une séance me paraît dure ?',
        a: 'Ralentis. Chaque répétition doit se terminer avec de la marge. Une séance qui paraît dure signifie que l’allure est trop rapide pour aujourd’hui.',
      },
      {
        q: 'Puis-je ajouter une sortie longue ?',
        a: 'Oui. La sortie facile du week-end est souvent la plus longue de la semaine. Garde-la facile.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'À propos du livre',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> est l’exposé de James Copeland sur la Norwegian Singles Method. Il explique pourquoi l’entraînement sous le seuil marche pour les amateurs, comment régler les allures, comment structurer une semaine et comment préparer un marathon.',
      },
      {
        title: 'Les idées clés en bref',
        html: 'Entraîne-toi sous le seuil, jamais jusqu’à l’échec. Fais trois séances structurées par semaine avec des récupérations courtes et garde le reste facile. Répète la semaine et laisse la forme, pas l’effort, faire monter les allures. Refais des tests en course plutôt que de courir après des séances plus dures.',
      },
      {
        title: 'Utiliser le livre avec ce calculateur',
        html: 'Le livre donne le raisonnement. Ce calculateur fait les calculs : entre un résultat de course et obtiens tes allures pour chaque durée de répétition, un plan hebdomadaire et la préparation marathon de 15 semaines. Utilise les deux ensemble et tu peux commencer la méthode le jour même.',
      },
      {
        title: 'Pour aller plus loin',
        html: 'Pour le système de double seuil des élites dont elle est issue, <strong>The Norwegian Method Applied</strong> de Marius Bakken couvre le contexte en profondeur.',
      },
    ],
    faqs: [
      {
        q: 'Qui a écrit le livre sur la Norwegian Singles Method ?',
        a: 'James Copeland, aussi connu sous le nom de sirpoc. Le livre s’appelle NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: 'Existe-t-il un PDF gratuit du livre ?',
        a: 'Pas sur ce site. Le livre est vendu par son auteur ; le calculateur ici est gratuit et transforme sa méthode en allures et en plans.',
      },
      {
        q: 'Ai-je besoin du livre pour utiliser le calculateur ?',
        a: 'Non. Le calculateur fonctionne seul, mais le livre explique le raisonnement derrière chaque séance.',
      },
    ],
  },
};

const it: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'Che cos’è la Norwegian Singles Method?',
        html: 'La <strong>Norwegian Singles Method</strong> (chiamata anche Norwegian Singles Approach, NSA o NSM) è un modo di allenarti come i fondisti norvegesi senza avere i loro orari. Invece di due sedute di soglia nello stesso giorno, fai <strong>una sola seduta controllata sotto soglia</strong> in tre giorni della settimana e tutte le altre uscite restano facili.',
      },
      {
        title: 'Da dove viene',
        html: 'I corridori norvegesi d’élite usano giornate di <strong>doppia soglia</strong>: due sedute appena sotto la soglia del lattato, mattina e sera, spesso controllate con un lattacidometro. Funziona per atleti a tempo pieno. James Copeland, noto online come sirpoc, ha adattato l’idea per chi lavora: sedute singole, impostate sul ritmo anziché sul lattato e ripetute settimana dopo settimana. Il suo libro è <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Come si presenta una settimana',
        html: 'Una settimana tipo ha tre allenamenti sotto soglia: <strong>3 × 10 minuti</strong>, <strong>5 × 6 minuti</strong> e <strong>9 × 3 minuti</strong>, ognuno con circa un minuto di corsetta facile o di sosta tra le ripetute. Il resto della settimana è corsa facile. Il lavoro di qualità resta intorno al 20 a 25% del volume settimanale, quindi la maggior parte del tuo tempo è ancora facile.',
      },
      {
        title: 'Perché funziona per i runner di tutti i giorni',
        html: 'Correre appena sotto la soglia costruisce molta forma aerobica con poca fatica. Finisci ogni seduta sapendo di poter fare di più, quindi sei recuperato per la successiva e puoi ripetere la settimana per mesi. I progressi vengono dalla costanza e da ritmi che salgono man mano che i tuoi tempi migliorano, non da allenamenti più duri.',
      },
      {
        title: 'Come iniziare',
        html: 'Inserisci un 5K o un 10K recente nel calcolatore qui sopra. Ottieni il tuo ritmo per ogni durata di ripetuta, un intervallo di ritmo facile e una settimana adatta alle ore che ti alleni, da 4,5 a 9 a settimana. Fai la settimana come scritta, ripeti il test con una gara ogni 6 settimane circa e lascia che i ritmi seguano.',
      },
    ],
    faqs: [
      {
        q: 'La Norwegian Singles Method va bene per i principianti?',
        a: 'Va bene per chi già corre con regolarità e regge tre sedute strutturate a settimana. Se sei agli inizi, costruisci prima qualche mese di corsa facile, poi parti con le ore settimanali più basse.',
      },
      {
        q: 'Quanto veloci sono le ripetute sotto soglia?',
        a: 'Più lente del ritmo soglia. Le ripetute da 3 minuti stanno vicino al ritmo gara dei 15K, quelle da 6 minuti vicino al ritmo della mezza maratona e quelle da 10 minuti più vicino al ritmo dei 30K.',
      },
      {
        q: 'Mi serve un lattacidometro?',
        a: 'No. Il metodo usa il ritmo di una gara recente, con frequenza cardiaca e sensazioni come controllo. Finire ogni seduta con qualcosa in più conta più di un valore di lattato.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'Chi è James Copeland?',
        html: '<strong>James Copeland</strong>, noto nei forum di corsa come <strong>sirpoc</strong>, è il runner amatoriale che ha reso popolare la Norwegian Singles Approach. Ha condiviso pubblicamente i suoi allenamenti, ha spiegato perché il lavoro sotto soglia gli permetteva di allenarsi con costanza e in seguito l’ha messo per iscritto in <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Il nucleo del suo metodo',
        html: 'Tre sedute sotto soglia a settimana, costruite con ripetute brevi, medie e lunghe, e corsa facile tutto il resto del tempo. I ritmi derivano da una gara recente e restano controllati: l’obiettivo è una seduta che potresti ripetere domani, non una che ti lascia a terra per giorni. La stessa struttura si ripete settimana dopo settimana mentre forma e ritmi crescono.',
      },
      {
        title: 'Come lo segue questo calcolatore',
        html: 'Il calcolatore usa le durate delle ripetute di Copeland (3, 6 e 10 minuti), recuperi brevi e volumi settimanali da 4,5 a 9 ore. Aggiungi la data di una maratona e costruisce il <strong>blocco maratona di 15 settimane</strong> del suo libro, con lavoro a ritmo maratona dentro i lunghi, gare di rifinitura e un tapering.',
      },
      {
        title: 'Indipendente e non ufficiale',
        html: 'Questo sito non è affiliato a James Copeland. È uno strumento gratuito che trasforma il metodo pubblicato in ritmi e piani. Per il ragionamento completo, gli esempi e i casi particolari, leggi il libro.',
      },
    ],
    faqs: [
      {
        q: 'Che cos’è il metodo Norwegian Singles di sirpoc?',
        a: 'È la versione di James Copeland dell’allenamento norvegese di soglia a seduta singola: tre allenamenti controllati sotto soglia a settimana più corsa facile, con ritmi impostati da una gara recente.',
      },
      {
        q: 'Come si chiama il libro di James Copeland?',
        a: 'NSM: Subthreshold Running Kept Simple. Spiega il metodo, i ritmi e la preparazione maratona di 15 settimane che usa questo planner.',
      },
      {
        q: 'È il calcolatore ufficiale di James Copeland?',
        a: 'No. È un calcolatore indipendente e gratuito basato sul suo approccio pubblicato.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'Come funziona la preparazione di 15 settimane',
        html: 'Aggiungi la data della tua maratona e il planner conta <strong>15 settimane</strong> a ritroso. Ogni settimana mantiene le sedute sotto soglia che hanno costruito la tua forma, poi aggiunge lavoro specifico per la maratona: blocchi a <strong>ritmo maratona dentro uscite facili più lunghe</strong>, un lungo nel weekend e gare di rifinitura lungo il percorso.',
      },
      {
        title: 'Perché tenere il lavoro sotto soglia in un blocco maratona',
        html: 'La maggior parte dei piani maratona sostituisce il lavoro aerobico con lunghi tempo run e grandi ripetute. La preparazione Norwegian Singles mantiene le sedute controllate che ti permettono di allenarti ogni settimana senza spezzarti, e ci mette sopra il ritmo maratona. La costanza su 15 settimane vale più di qualche seduta eroica.',
      },
      {
        title: 'Ritmo maratona e tapering',
        html: 'Il ritmo maratona deriva dalla tua forma attuale, non da un tempo obiettivo, così le sedute restano realistiche. Le ultime settimane riducono il volume mantenendo un po’ di qualità, così arrivi al via fresco ma non scarico.',
      },
      {
        title: 'Quali ore settimanali scegliere',
        html: 'Scegli le ore che riesci a sostenere per tutte le 15 settimane, non quelle della tua settimana migliore. Tra 6 e 9 ore a settimana vanno bene per la maggior parte dei runner che puntano a una maratona. Se non sei sicuro, parti più basso: il piano funziona perché puoi ripeterlo.',
      },
    ],
    faqs: [
      {
        q: 'Quanto dura il piano maratona Norwegian Singles?',
        a: '15 settimane, contate a ritroso dalla data della gara, seguendo la preparazione del libro NSM di James Copeland.',
      },
      {
        q: 'In questo piano faccio i lunghi?',
        a: 'Sì. I lunghi facili restano, e alcuni includono blocchi a ritmo maratona.',
      },
      {
        q: 'Posso usarlo per la prima maratona?',
        a: 'Sì, se corri già con regolarità. Scegli meno ore settimanali e imposta i ritmi da un 5K o un 10K recente.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'I tre allenamenti NSM',
        html: 'Le <strong>ripetute da 10 minuti</strong> (di solito 3) costruiscono il tratto aerobico più lungo della settimana. Le <strong>ripetute da 6 minuti</strong> (circa 5) stanno nel mezzo. Le <strong>ripetute da 3 minuti</strong> (circa 9) sono le più veloci. Ogni durata di ripetuta ha il suo ritmo, tutti sotto la soglia.',
      },
      {
        title: 'Recuperi',
        html: 'Il riposo è breve: circa 60 secondi tra le ripetute da 3 minuti e da 60 a 120 secondi per quelle più lunghe. Stai fermo, cammina o fai una corsetta molto facile. I recuperi brevi tengono la seduta abbastanza continua da allenare il sistema aerobico senza lasciare salire lo sforzo.',
      },
      {
        title: 'I giorni facili fanno parte del metodo',
        html: 'Tutto ciò che non è una seduta sotto soglia è facile, a circa il 70% della frequenza cardiaca massima o meno. I giorni facili ti permettono di affrontare l’allenamento successivo al ritmo giusto. Se la fatica si accumula, rallenta prima le uscite facili prima di toccare gli allenamenti.',
      },
      {
        title: 'Progredire con la NSM',
        html: 'Ripeti la stessa settimana. Ogni 6 settimane circa, corri una gara o un test cronometrato sui 5K o 10K e aggiorna i ritmi. Aumenta il volume lentamente, salendo di ore settimanali solo quando la settimana attuale ti sembra di routine.',
      },
    ],
    faqs: [
      {
        q: 'Quante sedute NSM a settimana?',
        a: 'Tre sedute sotto soglia, di solito in giorni non consecutivi, con corsa facile in mezzo.',
      },
      {
        q: 'E se una seduta mi sembra dura?',
        a: 'Rallenta. Ogni ripetuta deve finire con margine. Una seduta che sembra dura significa che il ritmo è troppo veloce per oggi.',
      },
      {
        q: 'Posso aggiungere un lungo?',
        a: 'Sì. L’uscita facile del weekend è spesso la più lunga della settimana. Tienila facile.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'Sul libro',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> è l’esposizione di James Copeland della Norwegian Singles Method. Spiega perché l’allenamento sotto soglia funziona per gli amatori, come impostare i ritmi, come strutturare una settimana e come costruire verso una maratona.',
      },
      {
        title: 'Le idee chiave in breve',
        html: 'Allenati sotto la soglia, mai fino al cedimento. Usa tre sedute strutturate a settimana con recuperi brevi e tieni facile il resto. Ripeti la settimana e lascia che sia la forma, non lo sforzo, a spingere in alto i ritmi. Ripeti i test con le gare invece di inseguire allenamenti più duri.',
      },
      {
        title: 'Usare il libro con questo calcolatore',
        html: 'Il libro dà il ragionamento. Questo calcolatore fa i conti: inserisci il risultato di una gara e ottieni i tuoi ritmi per ogni durata di ripetuta, un piano settimanale e la preparazione maratona di 15 settimane. Usa le due cose insieme e puoi iniziare il metodo lo stesso giorno.',
      },
      {
        title: 'Letture correlate',
        html: 'Per il sistema di doppia soglia d’élite da cui è nato, <strong>The Norwegian Method Applied</strong> di Marius Bakken approfondisce il contesto.',
      },
    ],
    faqs: [
      {
        q: 'Chi ha scritto il libro sulla Norwegian Singles Method?',
        a: 'James Copeland, noto anche come sirpoc. Il libro si intitola NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: 'Esiste un PDF gratuito del libro?',
        a: 'Non da questo sito. Il libro è venduto dal suo autore; il calcolatore qui è gratuito e trasforma il suo metodo in ritmi e piani.',
      },
      {
        q: 'Mi serve il libro per usare il calcolatore?',
        a: 'No. Il calcolatore funziona da solo, ma il libro spiega il ragionamento dietro ogni seduta.',
      },
    ],
  },
};

const ptBR: ArticleSet = {
  'norwegian-method-recreational-runners': {
    sections: [
      {
        title: 'O que é o Norwegian Singles Method?',
        html: 'O <strong>Norwegian Singles Method</strong> (também chamado de Norwegian Singles Approach, NSA ou NSM) é um jeito de treinar como os corredores de fundo noruegueses sem ter a rotina deles. Em vez de dois treinos de limiar no mesmo dia, você faz <strong>um único treino controlado abaixo do limiar</strong> em três dias da semana e mantém todos os outros treinos leves.',
      },
      {
        title: 'De onde vem',
        html: 'Os corredores de elite noruegueses usam dias de <strong>duplo limiar</strong>: dois treinos logo abaixo do limiar de lactato, de manhã e à noite, muitas vezes conferidos com um medidor de lactato. Isso funciona para atletas em tempo integral. James Copeland, conhecido online como sirpoc, adaptou a ideia para quem trabalha: treinos únicos, definidos por pace em vez de lactato e repetidos semana após semana. O livro dele é <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'Como é uma semana',
        html: 'Uma semana típica tem três treinos sublimiar: <strong>3 × 10 minutos</strong>, <strong>5 × 6 minutos</strong> e <strong>9 × 3 minutos</strong>, cada um com cerca de um minuto de trote leve ou parado entre as repetições. O resto da semana é corrida leve. O trabalho de qualidade fica em torno de 20 a 25% do volume semanal, então a maior parte do seu tempo continua sendo leve.',
      },
      {
        title: 'Por que funciona para corredores do dia a dia',
        html: 'Correr logo abaixo do limiar constrói muita condição aeróbica com pouca fadiga. Você termina cada treino sabendo que poderia fazer mais, então chega recuperado ao próximo e consegue repetir a semana por meses. O progresso vem da consistência e de paces que sobem conforme seus tempos de prova melhoram, não de treinos mais pesados.',
      },
      {
        title: 'Como começar',
        html: 'Digite um 5K ou 10K recente na calculadora acima. Você recebe seu pace para cada duração de repetição, uma faixa de pace leve e uma semana ajustada às horas que você treina, de 4,5 a 9 por semana. Faça a semana como está escrita, refaça o teste com uma prova a cada 6 semanas mais ou menos e deixe os paces acompanharem.',
      },
    ],
    faqs: [
      {
        q: 'O Norwegian Singles Method é bom para iniciantes?',
        a: 'Serve para corredores que já correm com regularidade e aguentam três treinos estruturados por semana. Se você está começando a correr, construa primeiro alguns meses de corrida leve e depois comece com as menores horas semanais.',
      },
      {
        q: 'Qual a velocidade das repetições sublimiar?',
        a: 'Mais lentas que o pace de limiar. As repetições de 3 minutos ficam perto do pace de prova de 15K, as de 6 minutos perto do pace de meia maratona e as de 10 minutos mais perto do pace de 30K.',
      },
      {
        q: 'Preciso de um medidor de lactato?',
        a: 'Não. O método usa o pace de uma prova recente, com frequência cardíaca e sensação como conferência. Terminar cada treino com folga importa mais do que um número de lactato.',
      },
    ],
  },

  'james-copeland-norwegian-singles': {
    sections: [
      {
        title: 'Quem é James Copeland?',
        html: '<strong>James Copeland</strong>, conhecido em fóruns de corrida como <strong>sirpoc</strong>, é o corredor amador que popularizou o Norwegian Singles Approach. Ele compartilhou seus treinos publicamente, explicou por que o trabalho sublimiar o deixava treinar com consistência e depois escreveu tudo em <strong>NSM: Subthreshold Running Kept Simple</strong>.',
      },
      {
        title: 'O núcleo do método dele',
        html: 'Três treinos sublimiar por semana, montados com repetições curtas, médias e longas, e corrida leve em todo o resto. Os paces vêm de uma prova recente e ficam controlados: o objetivo é um treino que você poderia repetir amanhã, não um que te deixa destruído por dias. A mesma estrutura se repete semana após semana enquanto a condição e os paces sobem.',
      },
      {
        title: 'Como esta calculadora segue o método',
        html: 'A calculadora usa as durações de repetição de Copeland (3, 6 e 10 minutos), recuperações curtas e volumes semanais de 4,5 a 9 horas. Adicione a data de uma maratona e ela monta o <strong>bloco de maratona de 15 semanas</strong> do livro dele, com trabalho em pace de maratona dentro dos longões, provas de ajuste e um polimento final (taper).',
      },
      {
        title: 'Independente e não oficial',
        html: 'Este site não é afiliado a James Copeland. É uma ferramenta gratuita que transforma o método publicado em paces e planos. Para o raciocínio completo, exemplos e casos especiais, leia o livro.',
      },
    ],
    faqs: [
      {
        q: 'O que é o método Norwegian Singles do sirpoc?',
        a: 'É a versão de James Copeland do treino norueguês de limiar com sessão única: três treinos sublimiar controlados por semana mais corrida leve, com paces definidos a partir de uma prova recente.',
      },
      {
        q: 'Qual é o nome do livro de James Copeland?',
        a: 'NSM: Subthreshold Running Kept Simple. Ele explica o método, os paces e a preparação de maratona de 15 semanas que este planejador usa.',
      },
      {
        q: 'Esta é a calculadora oficial de James Copeland?',
        a: 'Não. É uma calculadora independente e gratuita, baseada na abordagem publicada dele.',
      },
    ],
  },

  'norwegian-method-marathon-plan': {
    sections: [
      {
        title: 'Como funciona a preparação de 15 semanas',
        html: 'Adicione a data da sua maratona e o planejador conta <strong>15 semanas</strong> para trás. Cada semana mantém os treinos sublimiar que construíram sua condição e acrescenta trabalho específico de maratona: blocos em <strong>pace de maratona dentro de treinos leves mais longos</strong>, um longão no fim de semana e provas de ajuste pelo caminho.',
      },
      {
        title: 'Por que manter o trabalho sublimiar em um bloco de maratona',
        html: 'A maioria dos planos de maratona troca o trabalho aeróbico por longos tempo runs e grandes tiros. A preparação Norwegian Singles mantém os treinos controlados que deixam você treinar toda semana sem quebrar e põe o pace de maratona por cima. Consistência ao longo de 15 semanas vale mais do que alguns treinos heroicos.',
      },
      {
        title: 'Pace de maratona e taper',
        html: 'O pace de maratona vem da sua condição atual, não de um tempo-meta, então os treinos continuam realistas. As últimas semanas cortam volume mantendo alguma qualidade, para você chegar à largada descansado, mas não destreinado.',
      },
      {
        title: 'Quais horas semanais escolher',
        html: 'Escolha as horas que você consegue sustentar durante as 15 semanas inteiras, não a sua melhor semana. Entre 6 e 9 horas por semana serve para a maioria dos corredores que miram uma maratona. Se estiver em dúvida, comece menos: o plano funciona porque você consegue repeti-lo.',
      },
    ],
    faqs: [
      {
        q: 'Quanto tempo dura o plano de maratona Norwegian Singles?',
        a: '15 semanas, contadas para trás a partir da data da sua prova, seguindo a preparação do livro NSM de James Copeland.',
      },
      {
        q: 'Faço longões neste plano?',
        a: 'Sim. Os longões leves continuam, e alguns incluem blocos em pace de maratona.',
      },
      {
        q: 'Posso usar para a primeira maratona?',
        a: 'Sim, se você já corre com regularidade. Escolha menos horas semanais e defina os paces a partir de um 5K ou 10K recente.',
      },
    ],
  },

  'nsm-training-method': {
    sections: [
      {
        title: 'Os três treinos NSM',
        html: 'As <strong>repetições de 10 minutos</strong> (geralmente 3) constroem o trecho aeróbico mais longo da semana. As <strong>repetições de 6 minutos</strong> (cerca de 5) ficam no meio. As <strong>repetições de 3 minutos</strong> (cerca de 9) são as mais rápidas. Cada duração de repetição tem seu próprio pace, todos abaixo do limiar.',
      },
      {
        title: 'Recuperações',
        html: 'O descanso é curto: cerca de 60 segundos entre repetições de 3 minutos e de 60 a 120 segundos nas mais longas. Fique parado, ande ou trote bem leve. Descansos curtos mantêm o treino contínuo o bastante para treinar o sistema aeróbico sem deixar o esforço subir.',
      },
      {
        title: 'Dias leves fazem parte do método',
        html: 'Tudo que não é treino sublimiar é leve, em cerca de 70% da frequência cardíaca máxima ou menos. Os dias leves é que deixam você chegar ao próximo treino no pace certo. Se a fadiga se acumular, diminua o ritmo dos treinos leves antes de mexer nos treinos fortes.',
      },
      {
        title: 'Progredindo com o NSM',
        html: 'Repita a mesma semana. A cada 6 semanas mais ou menos, corra uma prova ou um teste de tempo de 5K ou 10K e atualize seus paces. Aumente o volume devagar, subindo as horas semanais só quando a semana atual parecer rotina.',
      },
    ],
    faqs: [
      {
        q: 'Quantos treinos NSM por semana?',
        a: 'Três treinos sublimiar, normalmente em dias não consecutivos, com corrida leve entre eles.',
      },
      {
        q: 'E se um treino parecer pesado?',
        a: 'Diminua o ritmo. Cada repetição deve terminar com folga. Um treino que parece pesado significa que o pace está rápido demais para hoje.',
      },
      {
        q: 'Posso incluir um longão?',
        a: 'Sim. A corrida leve do fim de semana costuma ser a mais longa da semana. Mantenha-a leve.',
      },
    ],
  },

  'norwegian-singles-method-book': {
    sections: [
      {
        title: 'Sobre o livro',
        html: '<strong>NSM: Subthreshold Running Kept Simple</strong> é o relato de James Copeland sobre o Norwegian Singles Method. Ele explica por que o treino sublimiar funciona para amadores, como definir os paces, como estruturar uma semana e como se preparar para uma maratona.',
      },
      {
        title: 'Ideias-chave em resumo',
        html: 'Treine abaixo do limiar, nunca até a falha. Use três treinos estruturados por semana com recuperações curtas e mantenha o resto leve. Repita a semana e deixe a condição, não o esforço, empurrar os paces para cima. Refaça os testes com provas em vez de perseguir treinos mais pesados.',
      },
      {
        title: 'Usando o livro com esta calculadora',
        html: 'O livro dá o raciocínio. Esta calculadora faz as contas: digite o resultado de uma prova e receba seus paces para cada duração de repetição, um plano semanal e a preparação de maratona de 15 semanas. Use os dois juntos e você pode começar o método no mesmo dia.',
      },
      {
        title: 'Leitura relacionada',
        html: 'Para o sistema de duplo limiar da elite do qual o método surgiu, <strong>The Norwegian Method Applied</strong>, de Marius Bakken, cobre o contexto em profundidade.',
      },
    ],
    faqs: [
      {
        q: 'Quem escreveu o livro do Norwegian Singles Method?',
        a: 'James Copeland, também conhecido como sirpoc. O livro se chama NSM: Subthreshold Running Kept Simple.',
      },
      {
        q: 'Existe PDF gratuito do livro?',
        a: 'Não neste site. O livro é vendido pelo autor; a calculadora aqui é gratuita e transforma o método dele em paces e planos.',
      },
      {
        q: 'Preciso do livro para usar a calculadora?',
        a: 'Não. A calculadora funciona sozinha, mas o livro explica o raciocínio por trás de cada treino.',
      },
    ],
  },
};

export const seoArticles: Record<Locale, ArticleSet> = {
  en,
  es,
  ko,
  de,
  fr,
  it,
  'pt-BR': ptBR,
};
