/**
 * German copy for the marathon plan sales pages.
 *
 * Translated from tier-copy.en.ts, matching the vocabulary already
 * established in copy.de.ts and src/i18n/ui.ts (Sub-Threshold, langer Lauf).
 */

import type { TierId } from './types';
import type { TierPageCopy, MarathonCopyShared } from './tier-copy.en';

export const tierCopyDe: Record<TierId, TierPageCopy> = {
  singles75: {
    slug: 'marathonplan-75km',
    name: 'Singles 75',
    tagline: 'Spitze bei 75 km (47 mi) pro Woche',
    title:
      'Norwegian Singles Marathonplan: 75 km/Woche (47 mi) | 12, 15 oder 18 Wochen',
    description:
      'Ein Sub-Threshold-Marathonplan mit einer Spitze von 75 km (47 mi) pro Woche, in 12, 15 oder 18 Wochen. Paces berechnet aus deinem eigenen Rennergebnis, in km oder Meilen.',
    h1: 'Singles 75: ein Marathonplan mit einer Spitze von 75 km pro Woche',
    intro:
      'Der Einstieg ins Sub-Threshold-Marathontraining. Sechs Lauftage, zwei Sub-Threshold-Einheiten und eine X-Einheit pro Woche, sowie ein langer Lauf, der auf 30 km anwächst. Genug Umfang, um einen Marathon ordentlich zu laufen, ohne dass das Training dein Leben übernimmt.',
    whoFor: [
      'Du läufst schon problemlos 50-65 km pro Woche und willst etwas draufsatteln',
      'Erster Marathon, oder der erste ernsthafte Versuch',
      'Du hast sechs Tage pro Woche zum Laufen und kein Interesse am Doppeln',
    ],
    notFor: [
      'Du läufst bereits 90 km pro Woche. Starte bei Singles 95, denn dieser Plan wird sich zu leicht anfühlen, um dafür zu bezahlen',
      'Wenn du unter 45 km pro Woche läufst, baue zuerst ein paar Monate lang eine Basis auf. Kein Plan repariert eine fehlende Grundlage',
    ],
    weeklyShape:
      'Zwei Sub-Threshold-Einheiten am Dienstag und Donnerstag, eine X-Einheit am Samstag, ein langer Lauf am Sonntag, und ein voller Ruhetag. In der marathonspezifischen Phase entfällt die Samstagseinheit, und der lange Lauf am Wochenende wird zur harten Einheit der Woche.',
  },
  singles95: {
    slug: 'marathonplan-95km',
    name: 'Singles 95',
    tagline: 'Spitze bei 95 km (59 mi) pro Woche',
    title:
      'Norwegian Singles Marathonplan: 95 km/Woche (59 mi) | 12, 15 oder 18 Wochen',
    description:
      'Ein Sub-Threshold-Marathonplan mit einer Spitze von 95 km (59 mi) pro Woche, in 12, 15 oder 18 Wochen. Paces berechnet aus deinem eigenen Rennergebnis, in km oder Meilen.',
    h1: 'Singles 95: ein Marathonplan mit einer Spitze von 95 km pro Woche',
    intro:
      'Die Stufe, in die die meisten gehören, die eine persönliche Bestzeit wollen. Sieben Lauftage, längere Sub-Threshold-Einheiten als bei Singles 75, und marathonspezifische Wochenendarbeit, die innerhalb eines langen Laufs auf 20 km im Renntempo anwächst.',
    whoFor: [
      'Du bist schon einen Marathon gelaufen und willst dort wirklich Zeit gutmachen',
      'Du steckst bereits 70-85 km pro Woche weg, ohne einzubrechen',
      'Du jagst eine Boston-, London- oder andere qualifizierende Zeit',
    ],
    notFor: [
      'Das wäre ein großer Sprung von dem, was du aktuell läufst. Nimm für einen Aufbau Singles 75 und komm für den nächsten hierher',
      'Du läufst konstant über 110 km pro Woche, dann passt Singles 120 besser zu dir',
    ],
    weeklyShape:
      'Zwei Sub-Threshold-Einheiten und eine X-Einheit pro Woche über sieben Lauftage verteilt, wobei der lange Lauf auf 32 km anwächst. In der marathonspezifischen Phase sinkt die Woche auf zwei Qualitätseinheiten: eine große Wochenendeinheit und eine Sub-Threshold-Einheit drei bis vier Tage davon entfernt.',
  },
  singles120: {
    slug: 'marathonplan-120km',
    name: 'Singles 120',
    tagline: 'Spitze bei 120 km (75 mi) pro Woche',
    title:
      'Norwegian Singles Marathonplan: 120 km/Woche (75 mi) | 12, 15 oder 18 Wochen',
    description:
      'Ein Sub-Threshold-Marathonplan mit einer Spitze von 120 km (75 mi) pro Woche, in 12, 15 oder 18 Wochen. Paces berechnet aus deinem eigenen Rennergebnis, in km oder Meilen.',
    h1: 'Singles 120: ein Marathonplan mit einer Spitze von 120 km pro Woche',
    intro:
      'Hoher Umfang, aber immer noch eine Haupteinheit pro Tag. Sieben Lauftage mit ein oder zwei zweiten Läufen pro Woche, Sub-Threshold-Einheiten mit 30-40 Minuten Qualität, und marathonspezifische Einheiten, die 20 km im Renntempo erreichen.',
    whoFor: [
      'Du hast schon mit 100 km pro Woche oder mehr trainiert und bist dabei gesund geblieben',
      'Mehrere Marathons hinter dir und eine konkrete Zeit im Kopf',
      'Bereit, einen kurzen zweiten Lauf hinzuzufügen, wenn die Woche es verlangt',
    ],
    notFor: [
      '120 km pro Woche wären ein persönlicher Umfangsrekord. Ein Marathonaufbau ist der falsche Ort, um das herauszufinden',
      'Deine Woche verkraftet keine 9 bis 11 Stunden Laufen. Singles 95 liefert dir ein besseres Rennen als eine Stufe, in der du ständig Einheiten ausfallen lässt',
    ],
    weeklyShape:
      'Sieben Lauftage plus etwa ein zweiter Lauf, ein langer Lauf bis 34 km, und 30-40 Minuten Sub-Threshold-Arbeit pro Einheit. Zweite Läufe teilen einen großen lockeren Tag, statt ihn zu ergänzen.',
  },
  singles140: {
    slug: 'marathonplan-140km',
    name: 'Singles 140',
    tagline: 'Spitze bei 140 km (87 mi) pro Woche',
    title:
      'Norwegian Singles Marathonplan: 140 km/Woche (87 mi) | 12, 15 oder 18 Wochen',
    description:
      'Ein Sub-Threshold-Marathonplan mit einer Spitze von 140 km (87 mi) pro Woche, in 12, 15 oder 18 Wochen. Paces berechnet aus deinem eigenen Rennergebnis, in km oder Meilen.',
    h1: 'Singles 140: ein Marathonplan mit einer Spitze von 140 km pro Woche',
    intro:
      'Der größte Umfang, den diese Methode trägt, während sie noch erkennbar Singles-Training bleibt. Zwei bis drei zweite Läufe pro Woche, Sub-Threshold-Einheiten mit 35-45 Minuten Qualität, und ein langer Lauf bis 38 km.',
    whoFor: [
      'Du hast monatelang 120 km pro Woche oder mehr durchgehalten',
      'Du läufst nahe der Spitze deiner Altersklasse oder jagst eine schnelle absolute Zeit',
      'Du hast die Erholungsgewohnheiten (Schlaf, Ernährung, wenig Alltagsstress), die dieser Umfang verlangt',
    ],
    notFor: [
      'Fast jeder. Umfang ist selten die Variable, die einem Läufer tatsächlich fehlt, und diese Stufe setzt bereits Jahre davon voraus',
      'Du bist unsicher, ob du hierher gehörst, dann gehörst du zu Singles 120',
    ],
    weeklyShape:
      'Sieben Lauftage mit zwei bis drei zweiten Läufen, ein langer Lauf bis 38 km, und die größten Sub-Threshold-Dosen im ganzen Bereich. Die marathonspezifische Phase hält weiterhin an zwei Qualitätseinheiten pro Woche fest, weil bei diesem Umfang die Wochenendeinheit allein schon hart genug ist.',
  },
};

export const sharedCopyDe: MarathonCopyShared = {
  indexSlug: 'marathonplaene',
  indexTitle:
    'Norwegian Singles Marathonpläne | 12, 15 und 18 Wochen, 75-140 km/Woche',
  indexDescription:
    'Sub-Threshold-Marathonpläne in vier Umfangsstufen, 12, 15 oder 18 Wochen, mit Paces berechnet aus deinem eigenen Rennergebnis. Km und Meilen. Kein statisches PDF: deine Paces aktualisieren sich mit deiner Form.',
  indexH1: 'Norwegian Singles Marathonpläne',
  indexIntro:
    'Vier Pläne, aufgebaut auf Sub-Threshold-Training und Marius Bakkens Marathon-Periodisierung. Wähle den, der zum Umfang passt, den du tatsächlich läufst, entscheide dich für 12, 15 oder 18 Wochen, und jede Einheit kommt mit deinen eigenen Pace-Bändern zurück.',
  disclaimer:
    'Diese Pläne basieren auf den veröffentlichten Prinzipien der Norwegian Singles Method und auf Marius Bakkens Texten über Marathontraining. Sie sind nicht offiziell, nicht mit Bakken, James Copeland oder einem anderen Trainer verbunden und werden von ihnen nicht unterstützt. Die Einheiten werden von unserer eigenen Engine erzeugt.',
  medicalNote:
    'Trainingsrat, kein medizinischer Rat. Wenn du verletzt oder krank bist oder unsicher, ob dieser Umfang zu dir passt, sprich vor dem Start mit einem Arzt oder einer Physiotherapeutin.',
  chooseTierHeading: 'Das hier ist für dich, wenn',
  notForHeading: 'Wähle eine andere Stufe, wenn',
  chooseLengthHeading: 'Wie viel Zeit hast du',
  lengthNote:
    'Jede Stufe gibt es in allen drei Längen, und die Phasen skalieren mit der Länge, statt am Ende abgeschnitten zu werden. Wenn dein Rennen in 14 Wochen ist, nimm den 12-Wochen-Plan und baue vorher zwei weitere Wochen lang auf.',
  phasesHeading: 'Wie der Plan aufgebaut ist',
  phases: [
    {
      name: 'Sub-Threshold-Grundlage',
      weeks: 'Wochen 1-6 von 18',
      body: 'Alles an Qualität ist Sub-Threshold, lange Wiederholungen bereits ab der ersten Woche, dazu ein langer Lauf, der stetig wächst. Die dritte Einheit jeder Woche ist die X-Einheit: Berge, 45/15er, kurze Intervalle oder ein Parkrun. Noch keine Marathon-Pace-Arbeit, denn es hat keinen Sinn, ein Tempo zu proben, das du dir noch nicht verdient hast.',
    },
    {
      name: 'Renntempo-Aufbau',
      weeks: 'Wochen 7-11 von 18',
      body: 'Die beiden Sub-Threshold-Einheiten bleiben bestehen. Die dritte wird am Wochenende zu einer moderaten marathonspezifischen Einheit: Blöcke im Marathon-Pace, ein durchgehender Marathon-Pace-Block innerhalb eines längeren Laufs, oder eine Progression. Der lange Lauf ist weiterhin ein lockerer Lauf.',
    },
    {
      name: 'Rennsimulation',
      weeks: 'Wochen 12-15 von 18',
      body: 'Die Wochenendeinheit wird hart genug, dass zwei Qualitätseinheiten die ganze Woche ausmachen. Die große marathonspezifische Einheit wird zum langen Lauf, und eine Sub-Threshold-Einheit liegt drei bis vier Tage davon entfernt. Alles andere ist locker. Das ist die Phase, in der das Rennen gewonnen wird.',
    },
    {
      name: 'Taper',
      weeks: 'Wochen 16-18 von 18',
      body: 'Umfang und Einheitslänge sinken, während die Intensität in kleinen Dosen bleibt: 20 x 1 Minute, kurze 30/30-Sätze, eine letzte Erinnerung an den Marathon-Pace. Die Rennwoche besteht aus einer Handvoll einminütiger Läufe und einem Shakeout.',
    },
  ],
  comparisonHeading: 'Warum nicht einfach ein PDF kaufen',
  comparisonIntro:
    'Weil ein PDF einen Monat nach dem Kauf schon falsch ist. Deine Form verändert sich, die Paces auf dem Blatt nicht.',
  comparison: [
    {
      label: 'Paces',
      pdf: 'Generisch, oder eingefroren im Moment des Kaufs',
      ours: 'Berechnet aus deinem Rennergebnis, in km oder Meilen',
    },
    {
      label: 'Wenn sich deine Form ändert',
      pdf: 'Die Datei ist jetzt falsch',
      ours: 'Jede zukünftige Woche wird neu berechnet. Neu drucken, und das Blatt ist aktuell',
    },
    {
      label: 'Umfang',
      pdf: 'Ein Plan für alle',
      ours: 'Vier Stufen, passend zum Umfang, den du tatsächlich läufst',
    },
    {
      label: 'Zeitrahmen',
      pdf: 'Eine Länge',
      ours: '12, 15 oder 18 Wochen',
    },
    {
      label: 'Jede Einheit',
      pdf: '"10 x 1 km"',
      ours: 'Struktur, dein Pace-Band, und warum die Einheit existiert',
    },
    {
      label: 'Kein Berg, keine Bahn, Reisewoche',
      pdf: 'Du improvisierst',
      ours: 'Jede Einheit kommt mit einer dokumentierten Alternative',
    },
    {
      label: 'Marathon-Pace',
      pdf: 'Eine optimistische Zahl',
      ours: 'Ein Band basierend auf deiner aktuellen Form, mit einem ehrlichen Urteil zu deinem Ziel',
    },
    {
      label: 'Wenn wir einen Fehler finden',
      pdf: 'Dein Exemplar bleibt falsch',
      ours: 'Die Korrektur erreicht bereits verkaufte Pläne',
    },
  ],
  sampleHeading: 'Eine echte Woche aus diesem Plan',
  sampleNote:
    'Erzeugt von derselben Engine, die du kaufen würdest, für einen Läufer mit 40:00 auf 10K. Kaufe den Plan, und jede Einheit unten kommt mit deinen eigenen Paces.',
  includedHeading: 'Was du bekommst',
  included: [
    'Den vollständigen Plan, jede Woche, jede Einheit, mit deinen eigenen Pace-Bändern',
    'Alle drei Längen deiner Stufe: 12, 15 und 18 Wochen',
    'Einen Einzeiler als Grund für jede Einheit, und eine Alternative für jede, die einen Berg, eine Bahn oder eine Veranstaltung braucht',
    'Formcheck-ins, die kein Rennen brauchen: aktualisiere deine Paces danach, wie die Einheiten sich tatsächlich angefühlt haben',
    'Ein optionales Krafttraining-Modul: schweres Krafttraining, Plyometrie und Bergsprints, so platziert, dass sie das Laufen nicht ruinieren',
    'Druckbare Blätter, CSV, und einen Kalender-Feed, der aktuell bleibt',
    'Lebenslangen Zugang von jedem Gerät, und jede Verbesserung, die wir später vornehmen',
  ],
  faqHeading: 'Fragen',
  faq: [
    {
      q: 'Ist das die offizielle Norwegian Singles Method?',
      a: 'Nein. Es gibt keinen offiziellen Norwegian-Singles-Marathonplan. Diese Pläne basieren auf den veröffentlichten Prinzipien der Methode und auf Bakkens Texten über Marathon-Periodisierung, erstellt von uns, und wir sind mit niemandem verbunden oder von jemandem autorisiert.',
    },
    {
      q: 'Wie unterscheidet sich das vom kostenlosen Plan auf dieser Seite?',
      a: 'Die kostenlosen Tools geben dir Sub-Threshold-Paces und eine sich wiederholende Wochenstruktur, die sich von Woche zu Woche nicht ändert. Das hier sind vollständige Marathon-Aufbauten: eine Umfangskurve, vier Phasen, marathonspezifische Einheiten, ein Taper, und ein Renndatum.',
    },
    {
      q: 'Was, wenn ich meinen Marathon-Pace nicht kenne?',
      a: 'Musst du nicht. Gib ein aktuelles Rennen über eine beliebige Distanz ein, und der Plan errechnet, was deine aktuelle Form hergibt, mithilfe einer Umrechnung, die deinen Wochenumfang berücksichtigt. Wenn du zusätzlich eine Zielzeit eingibst, sagen wir dir ehrlich, wie weit beide auseinanderliegen.',
    },
    {
      q: 'Was passiert, wenn ich mitten im Aufbau fitter werde?',
      a: 'Du machst einen Check-in (ein paar Fragen dazu, wie sich die letzten Einheiten angefühlt haben, oder ein 5K-Ergebnis, falls du eines hast), und jede verbleibende Woche wird um die neue Schätzung herum neu berechnet. Wochen, die du bereits gelaufen bist, behalten die Paces, mit denen du sie gelaufen bist.',
    },
    {
      q: 'Brauche ich ein Rennen, um meine Form zu aktualisieren?',
      a: 'Nein. Rennen sind nie erforderlich und nie als Pflicht eingeplant. Der Standard-Check-in fragt, wie deine Sub-Threshold-Einheiten liefen: ob du eine Wiederholung hättest anhängen können, ob du das Band in der letzten Wiederholung genauso gehalten hast wie in der ersten.',
    },
    {
      q: 'Kann ich in der Marathonphase drei Qualitätseinheiten pro Woche laufen?',
      a: 'Der Plan gibt dir bewusst keine drei. Sobald die Wochenendeinheit 20 km im Renntempo erreicht, braucht sie drei bis vier Tage auf jeder Seite. Eine dritte Einheit hinzuzufügen ist der Weg, auf dem Läufer schon müde an der Startlinie ankommen.',
    },
    {
      q: 'Meilen oder Kilometer?',
      a: 'Beides, überall, per Umschalter. Die Pläne werden metrisch erzeugt und in der von dir bevorzugten Einheit angezeigt.',
    },
    {
      q: 'Was, wenn ich eine Einheit oder eine ganze Woche verpasse?',
      a: 'Der Plan passt sich an, statt dir zu sagen, du sollst aufholen. Eine verpasste Einheit wird übersprungen, nicht nachgeholt; eine verpasste Woche wiederholt sich, statt vorzuspringen; und die Rückkehr nach einer Krankheit löst einen Formcheck-in aus, statt anzunehmen, dass sich nichts geändert hat.',
    },
    {
      q: 'Welche Länge sollte ich wählen?',
      a: 'Die längste, die noch vor deinem Rennen passt. Achtzehn Wochen geben der Grundlagenphase Raum, ihre Arbeit zu tun; zwölf bringen dich trotzdem hin, wenn das die Zeit ist, die du hast.',
    },
  ],
  ctaBuy: 'Diesen Plan holen',
  ctaBundle: 'Alle vier Stufen holen',
  ctaLearnMore: 'Plan ansehen',
  priceNote: 'Einmalzahlung, lebenslanger Zugang. Kein Abo.',
  buy: {
    heading: 'Meinen Plan erstellen',
    lengthLabel: 'Wie lang ist dein Aufbau',
    lengthHint: 'Wähle die längste, die noch vor deinem Rennen passt.',
    raceLabel: 'Dein letztes Rennergebnis',
    raceHint:
      'Beliebige Distanz. Daraus wird jeder Pace im Plan berechnet, also nutze ein Ergebnis, das du wirklich gelaufen bist, nicht eines, das du dir erhoffst.',
    timeLabel: 'Zeit',
    timePlaceholder: 'mm:ss oder h:mm:ss',
    unitLabel: 'Paces anzeigen in',
    dateLabel: 'Renndatum (optional)',
    dateHint: 'Fügt jeder Einheit echte Kalenderdaten hinzu.',
    goalLabel: 'Zielzeit (optional)',
    goalHint:
      'Wird neben dem angezeigt, was deine aktuelle Form hergibt. Keine Einheit wird jemals aus einem Ziel abgeleitet.',
    submit: 'Weiter zur Zahlung',
    weeks: 'Wochen',
  },
  labels: {
    peakVolume: 'Spitzenumfang',
    weeklyVolume: 'Wochenumfang',
    qualitySessions: 'Qualitätseinheiten',
    longRun: 'Langer Lauf',
    runsPerWeek: 'Läufe pro Woche',
    week: 'Woche',
    phase: 'Phase',
    perWeek: 'pro Woche',
    strengthOptional: 'Kraft (optional)',
    whyThisSession: 'Warum diese Einheit',
    ifYouCant: 'Wenn du es nicht wie beschrieben schaffst',
  },
};
