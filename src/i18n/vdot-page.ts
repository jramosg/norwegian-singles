import type { Locale } from '../types';

/** Copy for the dedicated VDOT calculator pages. */
export interface VdotCopy {
  calcTitle: string;
  distance: string;
  time: string;
  timePlaceholder: string;
  timeHint: string;
  unit: string;
  vdotLabel: string;
  vdotNote: string;
  invalidTime: string;
  outOfRange: string;
  distances: {
    '1500M': string;
    '1MI': string;
    '3K': string;
    '5K': string;
    '10K': string;
    '15K': string;
    '21K': string;
    '42K': string;
  };
  pacesTitle: string;
  pacesIntro: string;
  zoneCol: string;
  paceCol: string;
  per400Col: string;
  zones: {
    easy: { name: string; use: string };
    marathon: { name: string; use: string };
    threshold: { name: string; use: string };
    interval: { name: string; use: string };
    repetition: { name: string; use: string };
  };
  equivTitle: string;
  equivIntro: string;
  distanceCol: string;
  timeCol: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  chartTitle: string;
  chartIntro: string;
  chartVdotCol: string;
  chartMarathonCol: string;
  chartHalfCol: string;
  chartEasyCol: string;
  chartThresholdCol: string;
  chartIntervalCol: string;
  sections: { title: string; text: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

const en: VdotCopy = {
  calcTitle: 'Your race result',
  distance: 'Race distance',
  time: 'Finish time',
  timePlaceholder: '20:00',
  timeHint: 'Use a race from the last 6 to 8 weeks, run at full effort.',
  unit: 'Pace unit',
  vdotLabel: 'Your VDOT',
  vdotNote:
    'A fitness score from one race. Higher means faster at every distance.',
  invalidTime: 'Enter a time like 20:00 or 1:35:00.',
  outOfRange:
    'This result is outside the usual VDOT range (30 to 85), so treat the numbers as rough.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Mile',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Half marathon',
    '42K': 'Marathon',
  },
  pacesTitle: 'Training paces',
  pacesIntro: 'The five Daniels zones for your current fitness.',
  zoneCol: 'Zone',
  paceCol: 'Pace',
  per400Col: '400 m',
  zones: {
    easy: { name: 'Easy', use: 'Recovery runs and most weekly mileage' },
    marathon: { name: 'Marathon', use: 'Steady runs at marathon effort' },
    threshold: {
      name: 'Threshold',
      use: 'Tempo runs and cruise intervals, about one-hour race effort',
    },
    interval: { name: 'Interval', use: '3 to 5 minute reps that build VO2max' },
    repetition: {
      name: 'Repetition',
      use: 'Short fast reps for speed and economy',
    },
  },
  equivTitle: 'Equivalent race times',
  equivIntro:
    'What the same fitness predicts at other distances. Longer races also need the training to match.',
  distanceCol: 'Distance',
  timeCol: 'Time',
  ctaTitle: 'Turn your VDOT into a Norwegian Singles week',
  ctaText:
    'The planner uses the same race result to set 3, 6 and 10 minute sub-threshold paces and build a week you can repeat.',
  ctaButton: 'Build my plan',
  chartTitle: 'VDOT chart',
  chartIntro:
    'Race times and training paces for VDOT 30 to 85, from the same formula as the calculator.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Marathon',
  chartHalfCol: 'Half',
  chartEasyCol: 'Easy',
  chartThresholdCol: 'Threshold',
  chartIntervalCol: 'Interval',
  sections: [
    {
      title: 'What VDOT means',
      text: "VDOT is Jack Daniels' estimate of your current running fitness. It comes from a single race result and works like an effective VO2max: two runners with the same VDOT should race about the same at any distance, whatever their lab numbers say.",
    },
    {
      title: 'How the calculator works',
      text: 'It uses the Daniels and Gilbert equations. One estimates the oxygen cost of running at your race speed. The other estimates the share of VO2max you can hold for the race duration. Dividing the first by the second gives your VDOT. Training paces and race predictions run the same equations in reverse.',
    },
    {
      title: 'Using the five zones',
      text: 'Easy and Marathon pace build the aerobic base and should make up most of your week. Threshold work raises the pace you can hold for about an hour. Interval and Repetition sessions are short and hard, so keep them to a small share of weekly volume.',
    },
    {
      title: 'VDOT and Norwegian Singles',
      text: "Norwegian Singles also starts from a race result, but it replaces Daniels' threshold, interval and repetition sessions with three sub-threshold workouts a week, run slightly slower than threshold pace. Use VDOT to check fitness and race predictions, and the planner when you want the Norwegian structure.",
    },
    {
      title: 'When to recalculate',
      text: 'Retest every 4 to 6 weeks, or after any race run at full effort. Heat, hills, wind and altitude slow race times, so a result from a hard course will underestimate your VDOT.',
    },
  ],
  faqTitle: 'VDOT questions',
  faqs: [
    {
      q: 'Is this the official Jack Daniels VDOT calculator?',
      a: 'No. It is an independent calculator built on the published Daniels and Gilbert formulas, and its results closely match the official VDOT tables.',
    },
    {
      q: 'Which race gives the most accurate VDOT?',
      a: 'A 5K to half marathon run at full effort in the last 6 to 8 weeks. Very short races overstate endurance, and marathons are often slowed by fueling or pacing.',
    },
    {
      q: 'What is a good VDOT?',
      a: 'Most recreational runners land between 30 and 50. A 50:00 10K is VDOT 40, a 20:00 5K is close to 50, and a 3:00 marathon is about 53.5.',
    },
    {
      q: 'Why is my marathon prediction faster than I can run?',
      a: 'The prediction assumes marathon-specific training: long runs and enough weekly volume. Without them, expect to run slower than the equivalent time.',
    },
    {
      q: 'Can I see paces per mile?',
      a: 'Yes. Switch the pace unit to mi and every pace in the calculator and the chart updates.',
    },
  ],
};

const es: VdotCopy = {
  calcTitle: 'Tu resultado de carrera',
  distance: 'Distancia de la carrera',
  time: 'Tiempo final',
  timePlaceholder: '20:00',
  timeHint: 'Usa una carrera de las últimas 6 a 8 semanas, corrida a tope.',
  unit: 'Unidad de ritmo',
  vdotLabel: 'Tu VDOT',
  vdotNote:
    'Un índice de forma física a partir de una carrera. Cuanto más alto, más rápido en todas las distancias.',
  invalidTime: 'Introduce un tiempo como 20:00 o 1:35:00.',
  outOfRange:
    'Este resultado queda fuera del rango habitual de VDOT (30 a 85), así que toma los números como orientativos.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Milla',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Media maratón',
    '42K': 'Maratón',
  },
  pacesTitle: 'Ritmos de entrenamiento',
  pacesIntro: 'Las cinco zonas de Daniels para tu forma actual.',
  zoneCol: 'Zona',
  paceCol: 'Ritmo',
  per400Col: '400 m',
  zones: {
    easy: {
      name: 'Fácil',
      use: 'Rodajes de recuperación y la mayor parte del volumen semanal',
    },
    marathon: {
      name: 'Maratón',
      use: 'Rodajes constantes a ritmo de maratón',
    },
    threshold: {
      name: 'Umbral',
      use: 'Tempos y series de crucero, esfuerzo de carrera de una hora aproximadamente',
    },
    interval: {
      name: 'Intervalos',
      use: 'Series de 3 a 5 minutos que desarrollan el VO2max',
    },
    repetition: {
      name: 'Repeticiones',
      use: 'Series cortas y rápidas para velocidad y economía de carrera',
    },
  },
  equivTitle: 'Tiempos equivalentes en otras distancias',
  equivIntro:
    'Lo que predice tu misma forma física en otras distancias. Las carreras más largas también exigen un entrenamiento acorde.',
  distanceCol: 'Distancia',
  timeCol: 'Tiempo',
  ctaTitle: 'Convierte tu VDOT en una semana de Norwegian Singles',
  ctaText:
    'El planificador usa el mismo resultado para fijar ritmos subumbral de 3, 6 y 10 minutos y montar una semana que puedas repetir.',
  ctaButton: 'Crear mi plan',
  chartTitle: 'Tabla VDOT',
  chartIntro:
    'Tiempos de carrera y ritmos de entrenamiento para VDOT de 30 a 85, con la misma fórmula que la calculadora.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Maratón',
  chartHalfCol: 'Media',
  chartEasyCol: 'Fácil',
  chartThresholdCol: 'Umbral',
  chartIntervalCol: 'Intervalos',
  sections: [
    {
      title: 'Qué significa VDOT',
      text: 'El VDOT es la estimación de Jack Daniels de tu forma física actual para correr. Sale de un solo resultado de carrera y funciona como un VO2max efectivo: dos corredores con el mismo VDOT deberían rendir parecido en cualquier distancia, sean cuales sean sus datos de laboratorio.',
    },
    {
      title: 'Cómo funciona la calculadora',
      text: 'Usa las ecuaciones de Daniels y Gilbert. Una estima el coste de oxígeno de correr a tu velocidad de carrera. La otra estima el porcentaje del VO2max que puedes sostener durante la duración de la carrera. Al dividir la primera entre la segunda se obtiene tu VDOT. Los ritmos de entrenamiento y las predicciones de carrera aplican las mismas ecuaciones a la inversa.',
    },
    {
      title: 'Cómo usar las cinco zonas',
      text: 'Los ritmos Fácil y Maratón construyen la base aeróbica y deberían ocupar la mayor parte de tu semana. El trabajo de umbral sube el ritmo que puedes mantener durante una hora. Las sesiones de intervalos y repeticiones son cortas e intensas, así que limítalas a una parte pequeña del volumen semanal.',
    },
    {
      title: 'VDOT y Norwegian Singles',
      text: 'Norwegian Singles también parte de un resultado de carrera, pero sustituye las sesiones de umbral, intervalos y repeticiones de Daniels por tres entrenamientos subumbral a la semana, algo más lentos que el ritmo de umbral. Usa el VDOT para valorar tu forma y predecir tiempos, y el planificador cuando quieras la estructura noruega.',
    },
    {
      title: 'Cuándo volver a calcular',
      text: 'Repite el test cada 4 a 6 semanas, o después de cualquier carrera corrida a tope. El calor, las cuestas, el viento y la altitud ralentizan los tiempos, así que un resultado en un recorrido duro subestimará tu VDOT.',
    },
  ],
  faqTitle: 'Preguntas sobre el VDOT',
  faqs: [
    {
      q: '¿Es esta la calculadora oficial de VDOT de Jack Daniels?',
      a: 'No. Es una calculadora independiente basada en las fórmulas publicadas de Daniels y Gilbert, y sus resultados coinciden casi por completo con las tablas oficiales de VDOT.',
    },
    {
      q: '¿Qué carrera da el VDOT más preciso?',
      a: 'Una carrera de 5K a media maratón corrida a tope en las últimas 6 a 8 semanas. Las carreras muy cortas sobrestiman la resistencia, y los maratones suelen verse frenados por la nutrición o la gestión del ritmo.',
    },
    {
      q: '¿Qué es un buen VDOT?',
      a: 'La mayoría de los corredores populares están entre 30 y 50. Un 10K en 50:00 es VDOT 40, un 5K en 20:00 se acerca a 50 y un maratón en 3:00 equivale a unos 53,5.',
    },
    {
      q: '¿Por qué la predicción de maratón es más rápida de lo que puedo correr?',
      a: 'La predicción da por hecho un entrenamiento específico de maratón: tiradas largas y suficiente volumen semanal. Sin ello, espera correr más lento que el tiempo equivalente.',
    },
    {
      q: '¿Puedo ver los ritmos por milla?',
      a: 'Sí. Cambia la unidad de ritmo a mi y todos los ritmos de la calculadora y de la tabla se actualizan.',
    },
  ],
};

const ko: VdotCopy = {
  calcTitle: '대회 기록 입력',
  distance: '대회 거리',
  time: '완주 기록',
  timePlaceholder: '20:00',
  timeHint: '최근 6~8주 안에 전력으로 달린 대회 기록을 사용하세요.',
  unit: '페이스 단위',
  vdotLabel: '내 VDOT',
  vdotNote:
    '대회 한 번의 기록으로 구한 체력 지수예요. 높을수록 모든 거리에서 더 빠릅니다.',
  invalidTime: '20:00 또는 1:35:00 형식으로 기록을 입력하세요.',
  outOfRange:
    '이 기록은 일반적인 VDOT 범위(30~85)를 벗어나므로 수치를 대략적인 참고용으로만 봐 주세요.',
  distances: {
    '1500M': '1500 m',
    '1MI': '마일',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': '하프 마라톤',
    '42K': '마라톤',
  },
  pacesTitle: '훈련 페이스',
  pacesIntro: '현재 체력에 맞는 다니엘스의 다섯 가지 훈련 구간이에요.',
  zoneCol: '구간',
  paceCol: '페이스',
  per400Col: '400 m',
  zones: {
    easy: { name: '이지', use: '회복 조깅과 주간 주행거리의 대부분' },
    marathon: { name: '마라톤', use: '마라톤 강도로 꾸준히 달리는 러닝' },
    threshold: {
      name: '역치',
      use: '템포런과 크루즈 인터벌, 1시간 레이스 강도 정도',
    },
    interval: {
      name: '인터벌',
      use: 'VO2max를 키우는 3~5분 반복 훈련',
    },
    repetition: {
      name: '반복',
      use: '스피드와 러닝 이코노미를 위한 짧고 빠른 반복 훈련',
    },
  },
  equivTitle: '거리별 환산 기록',
  equivIntro:
    '같은 체력으로 다른 거리에서 낼 수 있는 기록 예측이에요. 긴 거리는 그에 맞는 훈련도 필요합니다.',
  distanceCol: '거리',
  timeCol: '기록',
  ctaTitle: '내 VDOT로 Norwegian Singles 주간 훈련 만들기',
  ctaText:
    '플래너가 같은 대회 기록으로 3분, 6분, 10분 서브 역치 페이스를 정하고 꾸준히 반복할 수 있는 한 주 훈련표를 만들어 줍니다.',
  ctaButton: '내 훈련 계획 만들기',
  chartTitle: 'VDOT 표',
  chartIntro:
    '계산기와 같은 공식으로 계산한 VDOT 30~85의 대회 기록과 훈련 페이스예요.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: '마라톤',
  chartHalfCol: '하프',
  chartEasyCol: '이지',
  chartThresholdCol: '역치',
  chartIntervalCol: '인터벌',
  sections: [
    {
      title: 'VDOT란 무엇인가요',
      text: 'VDOT는 Jack Daniels가 만든 현재 러닝 체력 추정치예요. 대회 기록 하나로 계산하며, 일종의 유효 VO2max처럼 작동합니다. VDOT가 같은 두 러너는 실험실 수치가 달라도 어떤 거리에서든 비슷한 기록을 낼 것으로 봅니다.',
    },
    {
      title: '계산기는 어떻게 작동하나요',
      text: 'Daniels와 Gilbert의 방정식을 사용해요. 하나는 대회 속도로 달릴 때 필요한 산소 비용을 추정하고, 다른 하나는 대회 시간 동안 유지할 수 있는 VO2max 비율을 추정합니다. 앞의 값을 뒤의 값으로 나누면 VDOT가 나옵니다. 훈련 페이스와 대회 기록 예측은 같은 방정식을 거꾸로 적용한 결과예요.',
    },
    {
      title: '다섯 가지 구간 활용법',
      text: '이지와 마라톤 페이스는 유산소 기반을 쌓아 주며 주간 훈련의 대부분을 차지해야 합니다. 역치 훈련은 약 1시간 동안 유지할 수 있는 페이스를 끌어올려요. 인터벌과 반복 훈련은 짧고 강하므로 주간 훈련량의 작은 비중으로만 하세요.',
    },
    {
      title: 'VDOT와 Norwegian Singles',
      text: 'Norwegian Singles도 대회 기록에서 출발하지만, Daniels의 역치, 인터벌, 반복 훈련 대신 역치 페이스보다 조금 느리게 달리는 서브 역치 훈련 세 번으로 한 주를 구성합니다. 체력 확인과 기록 예측에는 VDOT를, 노르웨이식 구성이 필요할 때는 플래너를 사용하세요.',
    },
    {
      title: '언제 다시 계산하나요',
      text: '4~6주마다, 또는 전력으로 달린 대회 뒤에 다시 측정하세요. 더위, 언덕, 바람, 고도는 기록을 느리게 만들기 때문에 힘든 코스에서 나온 기록은 VDOT를 낮게 추정하게 됩니다.',
    },
  ],
  faqTitle: 'VDOT 자주 묻는 질문',
  faqs: [
    {
      q: '이 계산기는 Jack Daniels 공식 VDOT 계산기인가요?',
      a: '아니요. 공개된 Daniels와 Gilbert 공식을 바탕으로 만든 독립 계산기이며, 결과는 공식 VDOT 표와 거의 일치합니다.',
    },
    {
      q: '어떤 대회 기록이 VDOT를 가장 정확하게 보여 주나요?',
      a: '최근 6~8주 안에 전력으로 달린 5K부터 하프 마라톤까지의 기록이 좋아요. 너무 짧은 대회는 지구력을 과대평가하고, 마라톤은 보급이나 페이스 조절 때문에 느려지는 경우가 많습니다.',
    },
    {
      q: 'VDOT가 어느 정도면 좋은 건가요?',
      a: '일반 러너 대부분은 30에서 50 사이예요. 10K 50:00은 VDOT 40, 5K 20:00은 50에 가깝고, 마라톤 3:00은 약 53.5입니다.',
    },
    {
      q: '마라톤 예측 기록이 제가 달릴 수 있는 기록보다 빠른 이유는 무엇인가요?',
      a: '예측은 롱런과 충분한 주간 훈련량 같은 마라톤 전용 훈련을 했다고 가정합니다. 그렇지 않다면 환산 기록보다 느리게 달릴 가능성이 큽니다.',
    },
    {
      q: '마일당 페이스도 볼 수 있나요?',
      a: '네. 페이스 단위를 mi로 바꾸면 계산기와 표의 모든 페이스가 바뀝니다.',
    },
  ],
};

const de: VdotCopy = {
  calcTitle: 'Dein Wettkampfergebnis',
  distance: 'Wettkampfdistanz',
  time: 'Zielzeit',
  timePlaceholder: '20:00',
  timeHint:
    'Nimm einen Wettkampf der letzten 6 bis 8 Wochen, den du mit vollem Einsatz gelaufen bist.',
  unit: 'Tempo-Einheit',
  vdotLabel: 'Dein VDOT',
  vdotNote:
    'Ein Fitnesswert aus einem einzigen Wettkampf. Je höher, desto schneller auf jeder Distanz.',
  invalidTime: 'Gib eine Zeit wie 20:00 oder 1:35:00 ein.',
  outOfRange:
    'Dieses Ergebnis liegt außerhalb des üblichen VDOT-Bereichs (30 bis 85), nimm die Werte also nur als grobe Orientierung.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Meile',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Halbmarathon',
    '42K': 'Marathon',
  },
  pacesTitle: 'Trainingstempos',
  pacesIntro: 'Die fünf Daniels-Zonen für deine aktuelle Form.',
  zoneCol: 'Zone',
  paceCol: 'Tempo',
  per400Col: '400 m',
  zones: {
    easy: {
      name: 'Locker',
      use: 'Regenerationsläufe und der Großteil des Wochenumfangs',
    },
    marathon: {
      name: 'Marathon',
      use: 'Gleichmäßige Läufe im Marathontempo',
    },
    threshold: {
      name: 'Schwelle',
      use: 'Tempoläufe und Cruise-Intervalle, etwa die Intensität eines Ein-Stunden-Rennens',
    },
    interval: {
      name: 'Intervall',
      use: 'Wiederholungen von 3 bis 5 Minuten, die die VO2max verbessern',
    },
    repetition: {
      name: 'Wiederholung',
      use: 'Kurze, schnelle Wiederholungen für Schnelligkeit und Laufökonomie',
    },
  },
  equivTitle: 'Äquivalente Wettkampfzeiten',
  equivIntro:
    'Was dieselbe Form auf anderen Distanzen vorhersagt. Für längere Wettkämpfe brauchst du auch das passende Training.',
  distanceCol: 'Distanz',
  timeCol: 'Zeit',
  ctaTitle: 'Mach aus deinem VDOT eine Norwegian-Singles-Woche',
  ctaText:
    'Der Planer nutzt dasselbe Wettkampfergebnis, um Tempos unterhalb der Schwelle für 3, 6 und 10 Minuten festzulegen und eine Woche zu bauen, die du wiederholen kannst.',
  ctaButton: 'Meinen Plan erstellen',
  chartTitle: 'VDOT-Tabelle',
  chartIntro:
    'Wettkampfzeiten und Trainingstempos für VDOT 30 bis 85, berechnet mit derselben Formel wie der Rechner.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Marathon',
  chartHalfCol: 'Halbmarathon',
  chartEasyCol: 'Locker',
  chartThresholdCol: 'Schwelle',
  chartIntervalCol: 'Intervall',
  sections: [
    {
      title: 'Was VDOT bedeutet',
      text: 'VDOT ist Jack Daniels’ Schätzung deiner aktuellen Laufform. Er wird aus einem einzigen Wettkampfergebnis berechnet und wirkt wie eine effektive VO2max: Zwei Läufer mit demselben VDOT sollten auf jeder Distanz etwa gleich schnell sein, egal was ihre Laborwerte sagen.',
    },
    {
      title: 'So funktioniert der Rechner',
      text: 'Er nutzt die Gleichungen von Daniels und Gilbert. Die eine schätzt den Sauerstoffbedarf beim Laufen in deinem Wettkampftempo. Die andere schätzt den Anteil der VO2max, den du über die Wettkampfdauer halten kannst. Teilst du die erste durch die zweite, erhältst du deinen VDOT. Trainingstempos und Wettkampfprognosen verwenden dieselben Gleichungen in umgekehrter Richtung.',
    },
    {
      title: 'Die fünf Zonen nutzen',
      text: 'Lockeres und Marathontempo bauen die aerobe Basis auf und sollten den Großteil deiner Woche ausmachen. Schwellentraining erhöht das Tempo, das du etwa eine Stunde lang halten kannst. Intervall- und Wiederholungseinheiten sind kurz und hart, halte sie deshalb auf einen kleinen Anteil des Wochenumfangs begrenzt.',
    },
    {
      title: 'VDOT und Norwegian Singles',
      text: 'Auch Norwegian Singles geht von einem Wettkampfergebnis aus, ersetzt aber die Schwellen-, Intervall- und Wiederholungseinheiten von Daniels durch drei Einheiten pro Woche unterhalb der Schwelle, etwas langsamer als das Schwellentempo. Nutze VDOT, um Form und Wettkampfprognosen zu prüfen, und den Planer, wenn du die norwegische Struktur willst.',
    },
    {
      title: 'Wann du neu berechnen solltest',
      text: 'Teste alle 4 bis 6 Wochen neu oder nach jedem Wettkampf mit vollem Einsatz. Hitze, Hügel, Wind und Höhe machen Wettkampfzeiten langsamer, deshalb unterschätzt ein Ergebnis auf einer harten Strecke deinen VDOT.',
    },
  ],
  faqTitle: 'Fragen zu VDOT',
  faqs: [
    {
      q: 'Ist das der offizielle VDOT-Rechner von Jack Daniels?',
      a: 'Nein. Es ist ein unabhängiger Rechner auf Basis der veröffentlichten Formeln von Daniels und Gilbert. Seine Ergebnisse stimmen sehr gut mit den offiziellen VDOT-Tabellen überein.',
    },
    {
      q: 'Welcher Wettkampf liefert den genauesten VDOT?',
      a: 'Ein 5K bis Halbmarathon mit vollem Einsatz in den letzten 6 bis 8 Wochen. Sehr kurze Rennen überschätzen die Ausdauer, und Marathons werden oft durch Verpflegung oder Tempoeinteilung gebremst.',
    },
    {
      q: 'Was ist ein guter VDOT?',
      a: 'Die meisten Hobbyläufer liegen zwischen 30 und 50. Ein 10K in 50:00 entspricht VDOT 40, ein 5K in 20:00 liegt nahe 50, und ein Marathon in 3:00 entspricht etwa 53,5.',
    },
    {
      q: 'Warum ist meine Marathonprognose schneller, als ich laufen kann?',
      a: 'Die Prognose setzt marathonspezifisches Training voraus: lange Läufe und genug Wochenumfang. Ohne beides wirst du langsamer laufen als die äquivalente Zeit.',
    },
    {
      q: 'Kann ich Tempos pro Meile sehen?',
      a: 'Ja. Stelle die Tempo-Einheit auf mi um, dann ändern sich alle Tempos im Rechner und in der Tabelle.',
    },
  ],
};

const fr: VdotCopy = {
  calcTitle: 'Ton résultat de course',
  distance: 'Distance de la course',
  time: 'Temps final',
  timePlaceholder: '20:00',
  timeHint: 'Utilise une course des 6 à 8 dernières semaines, courue à fond.',
  unit: 'Unité d’allure',
  vdotLabel: 'Ton VDOT',
  vdotNote:
    'Un score de forme issu d’une seule course. Plus il est élevé, plus tu es rapide sur toutes les distances.',
  invalidTime: 'Saisis un temps comme 20:00 ou 1:35:00.',
  outOfRange:
    'Ce résultat est hors de la plage habituelle du VDOT (30 à 85), considère donc les chiffres comme approximatifs.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Mile',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Semi-marathon',
    '42K': 'Marathon',
  },
  pacesTitle: 'Allures d’entraînement',
  pacesIntro: 'Les cinq zones de Daniels pour ta forme actuelle.',
  zoneCol: 'Zone',
  paceCol: 'Allure',
  per400Col: '400 m',
  zones: {
    easy: {
      name: 'Facile',
      use: 'Sorties de récupération et l’essentiel du kilométrage hebdomadaire',
    },
    marathon: {
      name: 'Marathon',
      use: 'Sorties régulières à allure marathon',
    },
    threshold: {
      name: 'Seuil',
      use: 'Footings tempo et intervalles de croisière, effort d’une course d’environ une heure',
    },
    interval: {
      name: 'Intervalles',
      use: 'Répétitions de 3 à 5 minutes qui développent la VO2max',
    },
    repetition: {
      name: 'Répétitions',
      use: 'Courtes répétitions rapides pour la vitesse et l’économie de course',
    },
  },
  equivTitle: 'Temps de course équivalents',
  equivIntro:
    'Ce que la même forme laisse prévoir sur d’autres distances. Les courses plus longues demandent aussi un entraînement adapté.',
  distanceCol: 'Distance',
  timeCol: 'Temps',
  ctaTitle: 'Transforme ton VDOT en semaine Norwegian Singles',
  ctaText:
    'Le planificateur utilise le même résultat de course pour fixer des allures sous le seuil de 3, 6 et 10 minutes et construire une semaine que tu peux répéter.',
  ctaButton: 'Créer mon plan',
  chartTitle: 'Tableau VDOT',
  chartIntro:
    'Temps de course et allures d’entraînement pour un VDOT de 30 à 85, avec la même formule que le calculateur.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Marathon',
  chartHalfCol: 'Semi',
  chartEasyCol: 'Facile',
  chartThresholdCol: 'Seuil',
  chartIntervalCol: 'Intervalles',
  sections: [
    {
      title: 'Ce que signifie le VDOT',
      text: 'Le VDOT est l’estimation de Jack Daniels de ta forme actuelle en course à pied. Il se calcule à partir d’un seul résultat de course et fonctionne comme une VO2max effective : deux coureurs avec le même VDOT devraient courir à peu près pareil sur n’importe quelle distance, quels que soient leurs chiffres de laboratoire.',
    },
    {
      title: 'Comment fonctionne le calculateur',
      text: 'Il utilise les équations de Daniels et Gilbert. L’une estime le coût en oxygène de la course à ta vitesse de compétition. L’autre estime la part de VO2max que tu peux tenir pendant la durée de la course. En divisant la première par la seconde, on obtient ton VDOT. Les allures d’entraînement et les prédictions de course appliquent les mêmes équations à l’envers.',
    },
    {
      title: 'Utiliser les cinq zones',
      text: 'Les allures Facile et Marathon construisent la base aérobie et devraient représenter l’essentiel de ta semaine. Le travail au seuil augmente l’allure que tu peux tenir pendant environ une heure. Les séances d’intervalles et de répétitions sont courtes et dures, alors limite-les à une petite part du volume hebdomadaire.',
    },
    {
      title: 'VDOT et Norwegian Singles',
      text: 'Norwegian Singles part aussi d’un résultat de course, mais remplace les séances de seuil, d’intervalles et de répétitions de Daniels par trois séances sous le seuil par semaine, courues un peu plus lentement que l’allure seuil. Utilise le VDOT pour évaluer ta forme et prédire tes temps, et le planificateur quand tu veux la structure norvégienne.',
    },
    {
      title: 'Quand recalculer',
      text: 'Refais un test toutes les 4 à 6 semaines, ou après toute course courue à fond. La chaleur, les côtes, le vent et l’altitude ralentissent les temps, donc un résultat sur un parcours difficile sous-estimera ton VDOT.',
    },
  ],
  faqTitle: 'Questions sur le VDOT',
  faqs: [
    {
      q: 'Est-ce le calculateur VDOT officiel de Jack Daniels ?',
      a: 'Non. C’est un calculateur indépendant basé sur les formules publiées de Daniels et Gilbert, et ses résultats correspondent de très près aux tables VDOT officielles.',
    },
    {
      q: 'Quelle course donne le VDOT le plus précis ?',
      a: 'Une course du 5K au semi-marathon courue à fond au cours des 6 à 8 dernières semaines. Les courses très courtes surestiment l’endurance, et les marathons sont souvent ralentis par l’alimentation ou la gestion de l’allure.',
    },
    {
      q: 'Qu’est-ce qu’un bon VDOT ?',
      a: 'La plupart des coureurs loisir se situent entre 30 et 50. Un 10K en 50:00 correspond à un VDOT de 40, un 5K en 20:00 s’approche de 50 et un marathon en 3:00 vaut environ 53,5.',
    },
    {
      q: 'Pourquoi ma prédiction de marathon est-elle plus rapide que ce que je peux courir ?',
      a: 'La prédiction suppose un entraînement spécifique au marathon : sorties longues et volume hebdomadaire suffisant. Sans cela, attends-toi à courir plus lentement que le temps équivalent.',
    },
    {
      q: 'Puis-je voir les allures au mile ?',
      a: 'Oui. Passe l’unité d’allure sur mi et toutes les allures du calculateur et du tableau sont mises à jour.',
    },
  ],
};

const it: VdotCopy = {
  calcTitle: 'Il tuo risultato in gara',
  distance: 'Distanza della gara',
  time: 'Tempo finale',
  timePlaceholder: '20:00',
  timeHint: 'Usa una gara delle ultime 6 a 8 settimane, corsa al massimo.',
  unit: 'Unità di passo',
  vdotLabel: 'Il tuo VDOT',
  vdotNote:
    'Un punteggio di forma ricavato da una sola gara. Più è alto, più sei veloce su ogni distanza.',
  invalidTime: 'Inserisci un tempo come 20:00 o 1:35:00.',
  outOfRange:
    'Questo risultato è fuori dall’intervallo abituale del VDOT (30 a 85), quindi considera i numeri indicativi.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Miglio',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Mezza maratona',
    '42K': 'Maratona',
  },
  pacesTitle: 'Passi di allenamento',
  pacesIntro: 'Le cinque zone di Daniels per la tua forma attuale.',
  zoneCol: 'Zona',
  paceCol: 'Passo',
  per400Col: '400 m',
  zones: {
    easy: {
      name: 'Lento',
      use: 'Corse di recupero e la maggior parte del chilometraggio settimanale',
    },
    marathon: {
      name: 'Maratona',
      use: 'Corse costanti a ritmo maratona',
    },
    threshold: {
      name: 'Soglia',
      use: 'Corse a tempo e cruise intervals, sforzo di una gara di circa un’ora',
    },
    interval: {
      name: 'Intervalli',
      use: 'Ripetizioni da 3 a 5 minuti che sviluppano il VO2max',
    },
    repetition: {
      name: 'Ripetute',
      use: 'Ripetute brevi e veloci per velocità ed economia di corsa',
    },
  },
  equivTitle: 'Tempi equivalenti in gara',
  equivIntro:
    'Cosa prevede la stessa forma su altre distanze. Le gare più lunghe richiedono anche un allenamento adeguato.',
  distanceCol: 'Distanza',
  timeCol: 'Tempo',
  ctaTitle: 'Trasforma il tuo VDOT in una settimana Norwegian Singles',
  ctaText:
    'Il planner usa lo stesso risultato di gara per fissare passi sotto soglia da 3, 6 e 10 minuti e costruire una settimana che puoi ripetere.',
  ctaButton: 'Crea il mio piano',
  chartTitle: 'Tabella VDOT',
  chartIntro:
    'Tempi di gara e passi di allenamento per VDOT da 30 a 85, con la stessa formula del calcolatore.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Maratona',
  chartHalfCol: 'Mezza',
  chartEasyCol: 'Lento',
  chartThresholdCol: 'Soglia',
  chartIntervalCol: 'Intervalli',
  sections: [
    {
      title: 'Cosa significa VDOT',
      text: 'Il VDOT è la stima di Jack Daniels della tua forma attuale nella corsa. Si ricava da un solo risultato di gara e funziona come un VO2max effettivo: due runner con lo stesso VDOT dovrebbero correre più o meno uguale su qualsiasi distanza, qualunque sia il loro valore di laboratorio.',
    },
    {
      title: 'Come funziona il calcolatore',
      text: 'Usa le equazioni di Daniels e Gilbert. Una stima il costo di ossigeno della corsa alla tua velocità di gara. L’altra stima la quota di VO2max che riesci a sostenere per la durata della gara. Dividendo la prima per la seconda si ottiene il tuo VDOT. I passi di allenamento e le previsioni di gara applicano le stesse equazioni al contrario.',
    },
    {
      title: 'Usare le cinque zone',
      text: 'I passi Lento e Maratona costruiscono la base aerobica e dovrebbero occupare la maggior parte della tua settimana. Il lavoro a soglia alza il passo che riesci a tenere per circa un’ora. Le sedute a intervalli e di ripetute sono brevi e dure, quindi tienile a una piccola parte del volume settimanale.',
    },
    {
      title: 'VDOT e Norwegian Singles',
      text: 'Anche Norwegian Singles parte da un risultato di gara, ma sostituisce le sedute di soglia, intervalli e ripetute di Daniels con tre allenamenti sotto soglia a settimana, corsi un po’ più lenti del passo soglia. Usa il VDOT per valutare la forma e prevedere i tempi, e il planner quando vuoi la struttura norvegese.',
    },
    {
      title: 'Quando ricalcolare',
      text: 'Rifai il test ogni 4 a 6 settimane, o dopo qualsiasi gara corsa al massimo. Caldo, salite, vento e altitudine rallentano i tempi, quindi un risultato su un percorso duro sottostimerà il tuo VDOT.',
    },
  ],
  faqTitle: 'Domande sul VDOT',
  faqs: [
    {
      q: 'È il calcolatore VDOT ufficiale di Jack Daniels?',
      a: 'No. È un calcolatore indipendente basato sulle formule pubblicate di Daniels e Gilbert, e i suoi risultati corrispondono molto da vicino alle tabelle VDOT ufficiali.',
    },
    {
      q: 'Quale gara dà il VDOT più accurato?',
      a: 'Una gara dai 5K alla mezza maratona corsa al massimo nelle ultime 6 a 8 settimane. Le gare molto brevi sovrastimano la resistenza, e le maratone sono spesso rallentate da alimentazione o gestione del passo.',
    },
    {
      q: 'Qual è un buon VDOT?',
      a: 'La maggior parte dei runner amatoriali sta tra 30 e 50. Una 10K in 50:00 è VDOT 40, una 5K in 20:00 è vicina a 50 e una maratona in 3:00 vale circa 53,5.',
    },
    {
      q: 'Perché la previsione sulla maratona è più veloce di quanto riesco a correre?',
      a: 'La previsione presuppone un allenamento specifico per la maratona: lunghi e abbastanza volume settimanale. Senza, aspettati di correre più lento del tempo equivalente.',
    },
    {
      q: 'Posso vedere i passi al miglio?',
      a: 'Sì. Cambia l’unità di passo in mi e tutti i passi nel calcolatore e nella tabella si aggiornano.',
    },
  ],
};

const ptBR: VdotCopy = {
  calcTitle: 'Seu resultado de prova',
  distance: 'Distância da prova',
  time: 'Tempo final',
  timePlaceholder: '20:00',
  timeHint:
    'Use uma prova das últimas 6 a 8 semanas, corrida com esforço máximo.',
  unit: 'Unidade de pace',
  vdotLabel: 'Seu VDOT',
  vdotNote:
    'Um índice de condicionamento a partir de uma prova. Quanto maior, mais rápido em todas as distâncias.',
  invalidTime: 'Digite um tempo como 20:00 ou 1:35:00.',
  outOfRange:
    'Este resultado está fora da faixa usual de VDOT (30 a 85), então trate os números como aproximados.',
  distances: {
    '1500M': '1500 m',
    '1MI': 'Milha',
    '3K': '3K',
    '5K': '5K',
    '10K': '10K',
    '15K': '15K',
    '21K': 'Meia maratona',
    '42K': 'Maratona',
  },
  pacesTitle: 'Paces de treino',
  pacesIntro: 'As cinco zonas de Daniels para o seu condicionamento atual.',
  zoneCol: 'Zona',
  paceCol: 'Pace',
  per400Col: '400 m',
  zones: {
    easy: {
      name: 'Leve',
      use: 'Corridas de recuperação e a maior parte do volume semanal',
    },
    marathon: {
      name: 'Maratona',
      use: 'Corridas constantes no esforço de maratona',
    },
    threshold: {
      name: 'Limiar',
      use: 'Tempo runs e intervalados de cruzeiro, esforço de uma prova de cerca de uma hora',
    },
    interval: {
      name: 'Intervalado',
      use: 'Tiros de 3 a 5 minutos que desenvolvem o VO2max',
    },
    repetition: {
      name: 'Repetição',
      use: 'Tiros curtos e rápidos para velocidade e economia de corrida',
    },
  },
  equivTitle: 'Tempos de prova equivalentes',
  equivIntro:
    'O que o mesmo condicionamento prevê em outras distâncias. Provas mais longas também exigem um treino compatível.',
  distanceCol: 'Distância',
  timeCol: 'Tempo',
  ctaTitle: 'Transforme seu VDOT em uma semana Norwegian Singles',
  ctaText:
    'O planejador usa o mesmo resultado de prova para definir paces abaixo do limiar de 3, 6 e 10 minutos e montar uma semana que você consiga repetir.',
  ctaButton: 'Montar meu plano',
  chartTitle: 'Tabela VDOT',
  chartIntro:
    'Tempos de prova e paces de treino para VDOT de 30 a 85, com a mesma fórmula da calculadora.',
  chartVdotCol: 'VDOT',
  chartMarathonCol: 'Maratona',
  chartHalfCol: 'Meia',
  chartEasyCol: 'Leve',
  chartThresholdCol: 'Limiar',
  chartIntervalCol: 'Intervalado',
  sections: [
    {
      title: 'O que significa VDOT',
      text: 'O VDOT é a estimativa de Jack Daniels do seu condicionamento atual na corrida. Ele sai de um único resultado de prova e funciona como um VO2max efetivo: dois corredores com o mesmo VDOT devem correr mais ou menos igual em qualquer distância, não importa o que digam seus números de laboratório.',
    },
    {
      title: 'Como a calculadora funciona',
      text: 'Ela usa as equações de Daniels e Gilbert. Uma estima o custo de oxigênio de correr na sua velocidade de prova. A outra estima a fração do VO2max que você consegue sustentar durante a duração da prova. Dividindo a primeira pela segunda, você chega ao seu VDOT. Os paces de treino e as previsões de prova usam as mesmas equações no sentido inverso.',
    },
    {
      title: 'Como usar as cinco zonas',
      text: 'Os paces Leve e Maratona constroem a base aeróbica e devem ocupar a maior parte da sua semana. O trabalho de limiar eleva o pace que você consegue manter por cerca de uma hora. As sessões de intervalado e repetição são curtas e fortes, então mantenha-as em uma pequena parte do volume semanal.',
    },
    {
      title: 'VDOT e Norwegian Singles',
      text: 'O Norwegian Singles também parte de um resultado de prova, mas troca as sessões de limiar, intervalado e repetição de Daniels por três treinos abaixo do limiar por semana, um pouco mais lentos que o pace de limiar. Use o VDOT para avaliar seu condicionamento e prever tempos, e o planejador quando quiser a estrutura norueguesa.',
    },
    {
      title: 'Quando recalcular',
      text: 'Refaça o teste a cada 4 a 6 semanas, ou depois de qualquer prova corrida com esforço máximo. Calor, subidas, vento e altitude deixam os tempos mais lentos, então um resultado em um percurso difícil vai subestimar seu VDOT.',
    },
  ],
  faqTitle: 'Perguntas sobre VDOT',
  faqs: [
    {
      q: 'Esta é a calculadora oficial de VDOT de Jack Daniels?',
      a: 'Não. É uma calculadora independente, baseada nas fórmulas publicadas de Daniels e Gilbert, e os resultados batem de perto com as tabelas oficiais de VDOT.',
    },
    {
      q: 'Qual prova dá o VDOT mais preciso?',
      a: 'Uma prova de 5K a meia maratona corrida com esforço máximo nas últimas 6 a 8 semanas. Provas muito curtas superestimam a resistência, e maratonas costumam ser prejudicadas por alimentação ou controle de pace.',
    },
    {
      q: 'O que é um bom VDOT?',
      a: 'A maioria dos corredores amadores fica entre 30 e 50. Um 10K em 50:00 é VDOT 40, um 5K em 20:00 chega perto de 50 e uma maratona em 3:00 equivale a cerca de 53,5.',
    },
    {
      q: 'Por que a previsão de maratona é mais rápida do que eu consigo correr?',
      a: 'A previsão pressupõe um treino específico de maratona: longões e volume semanal suficiente. Sem isso, espere correr mais devagar que o tempo equivalente.',
    },
    {
      q: 'Posso ver os paces por milha?',
      a: 'Sim. Troque a unidade de pace para mi e todos os paces da calculadora e da tabela são atualizados.',
    },
  ],
};

export const vdotCopy: Record<Locale, VdotCopy> = {
  en,
  es,
  ko,
  de,
  fr,
  it,
  'pt-BR': ptBR,
};
