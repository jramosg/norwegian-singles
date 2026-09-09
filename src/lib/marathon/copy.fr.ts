/**
 * French copy for generated marathon plans.
 *
 * Every session carries a one-line reason it exists. That line is a product
 * requirement, not decoration: it is most of what separates a training plan
 * from a spreadsheet of intervals.
 *
 * This file is the schema of record — other locales are typed against it.
 */

import type { MarathonCopy } from './copy.en';

export const marathonCopyFr: MarathonCopy = {
  'rpe.label': 'Effort',
  'rpe.subt':
    "Termine autour de 7 sur 10. Tu dois sentir qu'il te restait une ou deux répétitions ; sinon, l'allure était trop rapide.",
  'rpe.x':
    "Dur, 8 à 9 sur 10, mais jamais une course. Arrête la séance si l'allure commence à se dégrader.",
  'rpe.ms':
    "L'allure marathon doit rester contrôlée, 6 à 7 sur 10 au début. Si la première moitié ressemble à une course, l'allure n'est pas la bonne aujourd'hui.",
  'rpe.easy':
    "Facile, 2 à 3 sur 10. En conversation tout du long. La majeure partie de la semaine est ici, et c'est voulu.",
  'rpe.test': "À fond. C'est une course, traite-la comme telle.",
  'alt.label': 'Ou, à la place',
  'alt.reason.no_event':
    "Les tests sont optionnels. Pas de parkrun, pas de course, ou pas envie de courir vite — prends ceci et mets à jour ta forme d'après tes séances.",
  'alt.reason.no_hill':
    'Pas de côte disponible ? Ceci fait le même travail sur le plat.',
  // -------------------------------------------------------------------------
  // Why this session
  // -------------------------------------------------------------------------
  'why.subt.long':
    "Les répétitions longues en sous-seuil sont le moteur de cette méthode : assez de temps à un effort contrôlé pour élever ton seuil, sans le coût de récupération d'une course.",
  'why.subt.continuous':
    "Une sortie continue dont l'allure oscille entre deux vitesses sous-seuil. Le même travail que des répétitions, sans possibilité de se cacher et sans temps mort.",
  'why.subt.medium':
    'Les répétitions moyennes maintiennent le même effort contrôlé à une vitesse légèrement plus rapide, ce qui te fait accumuler du temps au seuil avec un peu plus de vitesse que les répétitions longues.',
  'why.subt.connected':
    "Les récupérations en footing facile rendent la séance presque continue, ce qui est exactement ce que demande l'endurance marathon : tenir l'effort longtemps sans s'arrêter.",
  'why.subt.short':
    "Les répétitions courtes te permettent de toucher une allure plus rapide tout en gardant l'effort total sous contrôle. Un entretien de la vitesse qui ne coûte presque rien en récupération.",
  'why.subt.4515':
    "Quarante-cinq secondes d'effort, quinze de récupération. Les pauses courtes maintiennent le lactate stable tandis que l'allure reste exigeante, ce qui te donne beaucoup de temps de qualité pour très peu de fatigue.",
  'why.subt.3030':
    "Le trente-trente est la manière la plus douce de courir vite : chaque répétition est assez courte pour rester relâché, et l'alternance constante maintient l'effort moyen exactement au seuil.",

  // -------------------------------------------------------------------------
  // X-sessions
  // -------------------------------------------------------------------------
  'why.x.hills_short':
    'Les sprints courts en côte sont du renforcement musculaire déguisé en course : une force quasi maximale avec presque aucun impact, ce qui explique leur faible risque de blessure.',
  'why.x.hills_200':
    'Deux cents mètres en côte, au-dessus du seuil : un classique de Bakken. La côte fait le travail de force pendant que la vitesse réduite limite le risque.',
  'why.x.hills_long':
    'Les répétitions plus longues en côte restent au-dessus du seuil assez longtemps pour être efficaces, la pente plafonnant ta vitesse et protégeant tes jambes.',
  'why.x.4515_progressive':
    'Commence juste sous le seuil et termine au-dessus. La même séance que la version contrôlée, mais tu repars ayant touché une allure vraiment difficile.',
  'why.x.vo2':
    "Une petite dose de travail au-dessus du seuil. Ce n'est pas un bloc de VO2max, cela sert juste à garder le haut du spectre éveillé pendant que le travail au seuil fait le gros du travail.",
  'why.x.long_rest':
    "De longues récupérations faciles transforment la séance en dix efforts de qualité distincts plutôt qu'une séance d'usure continue. Tu approches l'allure du 5K à chaque répétition tout en récupérant en une journée.",
  'why.test':
    'Un 5K à fond est le test de forme le moins cher qui soit. Cours-le en compétition, saisis le résultat, et le reste de ton plan se recalibre automatiquement autour de lui.',

  // -------------------------------------------------------------------------
  // Marathon-specific
  // -------------------------------------------------------------------------
  'why.ms.blocks':
    "Des blocs à allure marathon avec de courts footings entre eux. Fractionnée ainsi, tu peux tenir l'allure objectif bien plus longtemps qu'une sortie continue ne le permet — c'est justement l'objectif à ce stade.",
  'why.ms.continuous':
    "Un bloc ininterrompu à allure marathon au sein d'une sortie plus longue. Ce qui se rapproche le plus d'une répétition générale de course : même allure, même ravitaillement, même monotonie.",
  'why.ms.alternating':
    "Allure marathon avec un kilomètre flottant à la place d'une récupération. Le kilomètre flottant ne te laisse jamais récupérer complètement, si bien que la seconde moitié ressemble à la seconde moitié de la course.",
  'why.ms.progression':
    "Commence de manière régulière, termine à allure marathon. Une progression enseigne tôt la discipline d'allure et te fait courir le plus vite au moment où tu es déjà fatigué.",
  'why.ms.long_specific':
    "La séance pour laquelle cette phase existe : une sortie longue dont la majeure partie se court à l'allure de course ou tout près, sur des jambes déjà fatiguées.",
  'why.ms.progressive_blocks':
    "Quatre blocs qui montent progressivement vers l'allure marathon. Chacun est plus difficile que le précédent tandis que la fatigue s'accumule — l'exigence spécifique des 10 derniers kilomètres.",

  // -------------------------------------------------------------------------
  // Taper
  // -------------------------------------------------------------------------
  'why.taper.sharpener':
    "Courte, rapide et confortable. Assez d'intensité pour rester affûté, bien trop peu pour te coûter quoi que ce soit le jour de la course.",
  'why.taper.mp':
    "Un bref rappel de l'allure marathon. Assez longue pour répéter le rythme, assez courte pour finir en voulant en faire plus.",
  'why.taper.primer':
    "Semaine de course. Une poignée d'efforts d'une minute pour réveiller les jambes : rien ici ne construit de la forme, cela évite seulement de te sentir à plat le matin de la course.",

  // -------------------------------------------------------------------------
  // Substitutions — every session has an answer for a bad week
  // -------------------------------------------------------------------------
  'sub.treadmill':
    "Tapis de course : garde la fourchette d'allure avec 1 % d'inclinaison et cours les mêmes durées.",
  'sub.no_track':
    "Pas de piste : cours les répétitions au temps plutôt qu'à la distance, sur une route ou un chemin plat quelconque.",
  'sub.no_hill_flat_strides':
    'Pas de côte : cours les mêmes efforts à plat sous forme de lignes droites relâchées, quasi maximales.',
  'sub.no_hill_flat_reps':
    "Pas de côte : cours les répétitions à plat à l'effort du 5K. Tu perds une partie du bénéfice de force mais gardes le stimulus.",
  'sub.treadmill_incline':
    'Tapis de course : utilise une inclinaison de 6-10 % pour la même durée par répétition.',
  'sub.no_parkrun_solo_tt':
    'Pas de parkrun à proximité : cours le 5K seul en contre-la-montre sur un parcours plat et mesuré.',
  'sub.skip_test_checkin':
    'Tu préfères ne pas tester : passe ton tour, cours facile, et utilise plutôt le bilan de séance pour mettre à jour ta forme.',

  // -------------------------------------------------------------------------
  // Week labels
  // -------------------------------------------------------------------------
  'week.label.base': 'Base sous-seuil',
  'week.label.supportive': 'Soutien marathon',
  'week.label.specific': 'Spécifique marathon',
  'week.label.taper': 'Affûtage',
  'week.label.deload': 'Semaine allégée',
  'week.label.test': 'Semaine test',
  'week.label.race': 'Semaine de course',

  // -------------------------------------------------------------------------
  // Strength placement notes
  // -------------------------------------------------------------------------
  'strength.notes.lifting':
    "Fais de la musculation après la course, jamais avant, et jamais la veille d'une séance difficile. Charges lourdes, peu de répétitions : tu entraînes l'économie de course, pas la prise de muscle.",
  'strength.notes.plyometrics':
    'Laisse plusieurs heures après la course. Hauteur maximale et contact au sol minimal à chaque saut : arrête dès que le rebond disparaît.',
  'strength.notes.hill_sprints':
    "Après un footing facile, tant que tu es encore assez frais pour sprinter. Augmente progressivement sur plusieurs semaines et arrête-les complètement la semaine de course. Introduis-les prudemment en cas d'antécédents au tendon d'Achille, au mollet, au pied ou à la cheville.",

  // -------------------------------------------------------------------------
  // Session structure vocabulary
  // -------------------------------------------------------------------------
  'anchor.subT.rep3min': 'sous-seuil, répétitions courtes',
  'anchor.subT.rep6min': 'sous-seuil, répétitions moyennes',
  'anchor.subT.rep10min': 'sous-seuil, répétitions longues',
  'anchor.easy': 'facile',
  'anchor.mp': 'allure marathon',
  'anchor.mp.pct': "{pct} % de l'allure marathon",
  'anchor.race': 'allure {distance}',
  'anchor.effort.hill_strong': 'effort soutenu en côte',
  'anchor.effort.hill_max': 'effort maximal en côte',
  'anchor.effort.max_speed': 'vitesse quasi maximale',
  'anchor.effort.above_threshold': 'au-dessus du seuil',
  'anchor.effort.relaxed': 'relâché',
  'seg.warmup': 'échauffement',
  'seg.cooldown': 'retour au calme',
  'seg.leadIn': 'facile en début',
  'rec.jog': 'footing',
  'rec.walk': 'marche',
  'rec.easy': 'footing facile',
  'rec.float': 'flottant',
  'rec.standing': 'récupération arrêtée',

  // -------------------------------------------------------------------------
  // Day kinds
  // -------------------------------------------------------------------------
  'day.rest': 'Repos',
  'day.easy': 'Facile',
  'day.long': 'Sortie longue',
  'day.subT': 'Sous-seuil',
  'day.x': 'Séance X',
  'day.ms': 'Spécifique marathon',
  'day.test': 'Test',
  'day.race': 'Marathon',
  'day.secondRun': 'Deuxième sortie',
};
