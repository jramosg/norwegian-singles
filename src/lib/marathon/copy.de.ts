/**
 * German copy for generated marathon plans.
 *
 * Every session carries a one-line reason it exists. That line is a product
 * requirement, not decoration: it is most of what separates a training plan
 * from a spreadsheet of intervals.
 *
 * This file is the schema of record — other locales are typed against it.
 */

import type { MarathonCopy } from './copy.en';

export const marathonCopyDe: MarathonCopy = {
  'rpe.label': 'Anstrengung',
  'rpe.subt':
    'Beende die Einheit bei etwa 7 von 10. Du solltest das Gefühl haben, dass noch eine oder zwei Wiederholungen drin gewesen wären — wenn nicht, war das Tempo zu hoch.',
  'rpe.x':
    'Hart, 8 bis 9 von 10, aber nie ein Wettkampf. Brich die Einheit ab, wenn das Tempo wegbricht.',
  'rpe.ms':
    'Renntempo soll sich kontrolliert anfühlen, anfangs 6 bis 7 von 10. Fühlt es sich in der ersten Hälfte wie ein Wettkampf an, ist das Tempo für heute falsch.',
  'rpe.easy':
    'Locker, 2 bis 3 von 10. Die ganze Zeit im Gespräch. Der größte Teil der Woche liegt hier, und das ist Absicht.',
  'rpe.test': 'Volle Kraft. Das ist ein Wettkampf, also behandle ihn so.',
  'alt.label': 'Oder stattdessen',
  'alt.reason.no_event':
    'Tests sind optional. Kein parkrun, kein Wettkampf, oder keine Lust zu racen — nimm das hier und aktualisiere deine Form danach, wie sich die Einheiten angefühlt haben.',
  'alt.reason.no_hill':
    'Kein passender Berg? Das erfüllt denselben Zweck in der Ebene.',
  // -------------------------------------------------------------------------
  // Why this session
  // -------------------------------------------------------------------------
  'why.subt.long':
    'Lange Wiederholungen unterhalb der Schwelle sind der Motor dieser Methode: genug Zeit bei kontrollierter Anstrengung, um deine Schwelle anzuheben, ohne die Erholungskosten eines Wettkampfs.',
  'why.subt.continuous':
    'Ein durchgehender Lauf, dessen Tempo zwischen zwei Gängen unterhalb der Schwelle pendelt. Die gleiche Arbeit wie bei Wiederholungen, nur ohne Versteck und ohne Stehpausen.',
  'why.subt.medium':
    'Mittlere Wiederholungen halten dieselbe kontrollierte Anstrengung in einem etwas schnelleren Gang, sodass du Schwellenzeit mit etwas mehr Tempo sammelst als bei den langen Wiederholungen.',
  'why.subt.connected':
    'Die lockeren Erholungsphasen halten die Einheit fast durchgehend, und genau das verlangt Marathon-Ausdauer: die Anstrengung lange halten, ohne zu stoppen.',
  'why.subt.short':
    'Kurze Wiederholungen lassen dich ein schnelleres Tempo anfassen, während die Gesamtanstrengung kontrolliert bleibt. Tempoerhalt, der dich in der Erholung fast nichts kostet.',
  'why.subt.4515':
    'Fünfundvierzig Sekunden hart, fünfzehn Pause. Die kurzen Pausen halten das Laktat stabil, während das Tempo ehrlich bleibt, sodass du viel Qualitätszeit für sehr wenig Verschleiß bekommst.',
  'why.subt.3030':
    'Dreißig-dreißig ist die sanfteste Art, schnell zu laufen: Jede Wiederholung ist kurz genug, um locker zu bleiben, und der ständige Wechsel hält die durchschnittliche Anstrengung genau an der Schwelle.',

  // -------------------------------------------------------------------------
  // X-sessions
  // -------------------------------------------------------------------------
  'why.x.hills_short':
    'Kurze Bergsprints sind Krafttraining, getarnt als Laufen: nahezu maximale Kraft bei fast keiner Belastung, weshalb sie so wenig Verletzungsrisiko bergen.',
  'why.x.hills_200':
    'Zweihundert Meter bergauf, oberhalb der Schwelle — ein Klassiker von Bakken. Der Berg übernimmt die Kraftarbeit, während das reduzierte Tempo das Risiko niedrig hält.',
  'why.x.hills_long':
    'Längere Bergwiederholungen bleiben lange genug oberhalb der Schwelle, um zu wirken, während die Steigung dein Tempo begrenzt und deine Beine schont.',
  'why.x.4515_progressive':
    'Starte knapp unter der Schwelle und beende die Einheit darüber. Dieselbe Einheit wie die kontrollierte Version, aber am Ende hast du ein wirklich hartes Tempo angefasst.',
  'why.x.vo2':
    'Eine kleine Dosis Arbeit oberhalb der Schwelle. Das ist kein VO2max-Block — es hält nur den obersten Bereich wach, während die Schwellenarbeit die Hauptlast trägt.',
  'why.x.long_rest':
    'Lange lockere Pausen machen daraus zehn einzelne hochwertige Belastungen statt einer zermürbenden Einheit. Du erreichst bei jeder Wiederholung fast 5K-Tempo und bist trotzdem an einem Tag erholt.',
  'why.test':
    'Ein 5K am Limit ist der günstigste Fitnesstest, den es gibt. Laufe ihn als Wettkampf, trage das Ergebnis ein, und der Rest deines Plans passt sich automatisch daran an.',

  // -------------------------------------------------------------------------
  // Marathon-specific
  // -------------------------------------------------------------------------
  'why.ms.blocks':
    'Blöcke im Marathon-Pace mit kurzen Trabpausen dazwischen. Aufgeteilt kannst du das Zieltempo viel länger halten, als es ein durchgehender Lauf erlaubt — genau das ist in dieser frühen Phase der Sinn.',
  'why.ms.continuous':
    'Ein ununterbrochener Block im Marathon-Pace innerhalb eines längeren Laufs. Das kommt einer Wettkampfprobe am nächsten: gleiches Tempo, gleiche Verpflegung, gleiche Monotonie.',
  'why.ms.alternating':
    'Marathon-Pace mit einem schwimmenden Kilometer statt einer Pause. Der schwimmende Kilometer lässt dich nie vollständig erholen, sodass sich die zweite Hälfte wie die zweite Hälfte des Rennens anfühlt.',
  'why.ms.progression':
    'Starte ruhig, beende die Einheit im Marathon-Pace. Eine Progression lehrt frühzeitig Tempodisziplin und lässt dich am schnellsten laufen, wenn du bereits müde bist.',
  'why.ms.long_specific':
    'Die Einheit, für die diese Phase existiert: ein langer Lauf, dessen größter Teil im oder nahe am Renntempo läuft — auf Beinen, die schon müde sind.',
  'why.ms.progressive_blocks':
    'Vier Blöcke, die sich stufenweise dem Marathon-Pace annähern. Jeder ist härter als der vorherige, während sich die Ermüdung aufbaut — die spezifische Anforderung der letzten 10 km.',

  // -------------------------------------------------------------------------
  // Taper
  // -------------------------------------------------------------------------
  'why.taper.sharpener':
    'Kurz, schnell und angenehm. Genug Intensität, um scharf zu bleiben, viel zu wenig, um dich am Renntag etwas zu kosten.',
  'why.taper.mp':
    'Eine kurze Erinnerung an den Marathon-Pace. Lang genug, um den Rhythmus zu proben, kurz genug, dass du danach noch Lust auf mehr hast.',
  'why.taper.primer':
    'Rennwoche. Eine Handvoll einminütiger Belastungen, um die Beine zu wecken — hier wird keine Fitness mehr aufgebaut, es verhindert nur, dass du dich am Renntagmorgen platt fühlst.',

  // -------------------------------------------------------------------------
  // Substitutions — every session has an answer for a bad week
  // -------------------------------------------------------------------------
  'sub.treadmill':
    'Laufband: halte das Pace-Band bei 1 % Steigung und laufe dieselben Zeiten.',
  'sub.no_track':
    'Keine Bahn: laufe die Wiederholungen nach Zeit statt nach Distanz, auf einer beliebigen flachen Straße oder einem Weg.',
  'sub.no_hill_flat_strides':
    'Kein Berg: laufe die gleichen Belastungen im Flachen als lockere, nahezu maximale Steigerungsläufe.',
  'sub.no_hill_flat_reps':
    'Kein Berg: laufe die Wiederholungen im Flachen bei 5K-Belastung. Du verlierst etwas vom Kraftgewinn, behältst aber den Trainingsreiz.',
  'sub.treadmill_incline':
    'Laufband: nutze eine Steigung von 6-10 % für dieselbe Zeit pro Wiederholung.',
  'sub.no_parkrun_solo_tt':
    'Kein Parkrun in der Nähe: laufe den 5K solo als Zeitfahren auf einer flachen, vermessenen Strecke.',
  'sub.skip_test_checkin':
    'Willst du lieber nicht testen: lass es aus, laufe locker, und nutze stattdessen den Session-Check-in, um deine Form zu aktualisieren.',

  // -------------------------------------------------------------------------
  // Week labels
  // -------------------------------------------------------------------------
  'week.label.base': 'Sub-Threshold-Grundlage',
  'week.label.supportive': 'Marathon-unterstützend',
  'week.label.specific': 'Marathonspezifisch',
  'week.label.taper': 'Taper',
  'week.label.deload': 'Entlastungswoche',
  'week.label.test': 'Testwoche',
  'week.label.race': 'Rennwoche',

  // -------------------------------------------------------------------------
  // Strength placement notes
  // -------------------------------------------------------------------------
  'strength.notes.lifting':
    'Trainiere Kraft nach dem Lauf, nie davor, und nie am Tag vor einer harten Einheit. Schwer, wenige Wiederholungen: du trainierst Laufökonomie, nicht Muskelaufbau.',
  'strength.notes.plyometrics':
    'Lass mehrere Stunden nach dem Lauf vergehen. Maximale Höhe und minimaler Bodenkontakt bei jedem Sprung — höre auf, sobald die Sprungkraft nachlässt.',
  'strength.notes.hill_sprints':
    'Nach einem lockeren Lauf, solange du noch frisch genug zum Sprinten bist. Steigere sie über mehrere Wochen und setze sie in der Rennwoche komplett aus. Führe sie vorsichtig ein, wenn du Vorgeschichte mit Achillessehne, Wade, Fuß oder Knöchel hast.',

  // -------------------------------------------------------------------------
  // Session structure vocabulary
  // -------------------------------------------------------------------------
  'anchor.subT.rep3min': 'Sub-Threshold, kurze Wiederholungen',
  'anchor.subT.rep6min': 'Sub-Threshold, mittlere Wiederholungen',
  'anchor.subT.rep10min': 'Sub-Threshold, lange Wiederholungen',
  'anchor.easy': 'locker',
  'anchor.mp': 'Marathon-Pace',
  'anchor.mp.pct': '{pct} % des Marathon-Pace',
  'anchor.race': '{distance}-Pace',
  'anchor.effort.hill_strong': 'starke Bergbelastung',
  'anchor.effort.hill_max': 'maximale Bergbelastung',
  'anchor.effort.max_speed': 'nahezu maximales Tempo',
  'anchor.effort.above_threshold': 'oberhalb der Schwelle',
  'anchor.effort.relaxed': 'entspannt',
  'seg.warmup': 'Einlaufen',
  'seg.cooldown': 'Auslaufen',
  'seg.leadIn': 'locker zum Einstieg',
  'rec.jog': 'Trabpause',
  'rec.walk': 'Gehen',
  'rec.easy': 'lockeres Laufen',
  'rec.float': 'Float',
  'rec.standing': 'Stehpause',

  // -------------------------------------------------------------------------
  // Day kinds
  // -------------------------------------------------------------------------
  'day.rest': 'Ruhe',
  'day.easy': 'Locker',
  'day.long': 'Langer Lauf',
  'day.subT': 'Sub-Threshold',
  'day.x': 'X-Einheit',
  'day.ms': 'Marathonspezifisch',
  'day.test': 'Test',
  'day.race': 'Marathon',
  'day.secondRun': 'Zweiter Lauf',
};
