/**
 * French copy for the marathon plan sales pages.
 *
 * Translated from tier-copy.en.ts, matching the vocabulary already
 * established in copy.fr.ts and src/i18n/ui.ts (sous-seuil, sortie longue).
 */

import type { TierId } from './types';
import type { TierPageCopy, MarathonCopyShared } from './tier-copy.en';

export const tierCopyFr: Record<TierId, TierPageCopy> = {
  singles75: {
    slug: 'plan-marathon-75km',
    name: 'Singles 75',
    tagline: 'Pic à 75 km (47 mi) par semaine',
    title:
      'Plan marathon Norwegian Singles : 75 km/semaine (47 mi) | 12, 15 ou 18 semaines',
    description:
      'Un plan marathon sous-seuil culminant à 75 km (47 mi) par semaine, en 12, 15 ou 18 semaines. Allures calculées à partir de ton propre résultat de course, en km ou en miles.',
    h1: 'Singles 75 : un plan marathon culminant à 75 km par semaine',
    intro:
      "La porte d'entrée vers l'entraînement marathon sous-seuil. Six jours de course par semaine, deux séances sous-seuil et une séance X, et une sortie longue qui grandit jusqu'à 30 km. Assez de volume pour courir un marathon sérieusement sans que l'entraînement ne prenne toute la place dans ta vie.",
    whoFor: [
      'Tu cours déjà 50-65 km par semaine sans problème et tu veux en ajouter un peu',
      'Premier marathon, ou première tentative sérieuse',
      'Tu as six jours par semaine pour courir et aucune envie de doubler',
    ],
    notFor: [
      'Tu cours déjà 90 km par semaine. Commence par Singles 95, car celui-ci te paraîtra trop facile pour valoir la peine de payer',
      "Si tu cours moins de 45 km par semaine, passe d'abord quelques mois à construire ta base. Aucun plan ne comble une base absente",
    ],
    weeklyShape:
      'Deux séances sous-seuil le mardi et le jeudi, une séance X le samedi, une sortie longue le dimanche, et un jour de repos complet. Dans la phase spécifique marathon, la séance du samedi disparaît et la sortie longue du week-end devient la séance difficile de la semaine.',
  },
  singles95: {
    slug: 'plan-marathon-95km',
    name: 'Singles 95',
    tagline: 'Pic à 95 km (59 mi) par semaine',
    title:
      'Plan marathon Norwegian Singles : 95 km/semaine (59 mi) | 12, 15 ou 18 semaines',
    description:
      'Un plan marathon sous-seuil culminant à 95 km (59 mi) par semaine, en 12, 15 ou 18 semaines. Allures calculées à partir de ton propre résultat de course, en km ou en miles.',
    h1: 'Singles 95 : un plan marathon culminant à 95 km par semaine',
    intro:
      "Le palier où se retrouve la plupart de ceux qui visent un record personnel. Sept jours de course, des séances sous-seuil plus longues que Singles 75, et un travail spécifique marathon le week-end qui monte jusqu'à 20 km à l'allure de course au sein d'une sortie longue.",
    whoFor: [
      'Tu as déjà couru un marathon et tu veux vraiment progresser sur ce temps',
      "Tu gères déjà 70-85 km par semaine sans t'effondrer",
      'Tu vises un temps qualificatif pour Boston, Londres ou une autre course de championnat',
    ],
    notFor: [
      'Ce serait un grand saut par rapport à ce que tu cours actuellement. Prends Singles 75 pour un cycle et reviens ici pour le suivant',
      'Tu dépasses régulièrement 110 km par semaine, auquel cas Singles 120 te conviendra mieux',
    ],
    weeklyShape:
      "Deux séances sous-seuil et une séance X par semaine réparties sur sept jours de course, avec la sortie longue qui grandit jusqu'à 32 km. Dans la phase spécifique marathon, la semaine descend à deux séances de qualité : une grande séance de week-end et une séance sous-seuil trois à quatre jours avant ou après.",
  },
  singles120: {
    slug: 'plan-marathon-120km',
    name: 'Singles 120',
    tagline: 'Pic à 120 km (75 mi) par semaine',
    title:
      'Plan marathon Norwegian Singles : 120 km/semaine (75 mi) | 12, 15 ou 18 semaines',
    description:
      'Un plan marathon sous-seuil culminant à 120 km (75 mi) par semaine, en 12, 15 ou 18 semaines. Allures calculées à partir de ton propre résultat de course, en km ou en miles.',
    h1: 'Singles 120 : un plan marathon culminant à 120 km par semaine',
    intro:
      "Un gros volume, mais toujours une seule séance principale par jour. Sept jours de course avec une ou deux deuxièmes sorties par semaine, des séances sous-seuil de 30-40 minutes de qualité, et des séances spécifiques marathon qui atteignent 20 km à l'allure de course.",
    whoFor: [
      'Tu as déjà entraîné à 100 km par semaine ou plus en restant en bonne santé',
      'Plusieurs marathons derrière toi et un temps précis en tête',
      'Prêt à ajouter une courte deuxième sortie quand la semaine le demande',
    ],
    notFor: [
      '120 km par semaine serait un record personnel de volume. Un cycle marathon est le pire endroit pour le découvrir',
      "Ta semaine ne peut pas absorber 9 à 11 heures de course. Singles 95 te donnera une meilleure course qu'un palier où tu sautes sans cesse des séances",
    ],
    weeklyShape:
      "Sept jours de course plus environ une deuxième sortie, une sortie longue jusqu'à 34 km, et 30-40 minutes de travail sous-seuil par séance. Les deuxièmes sorties fractionnent une grande journée facile plutôt que de s'y ajouter.",
  },
  singles140: {
    slug: 'plan-marathon-140km',
    name: 'Singles 140',
    tagline: 'Pic à 140 km (87 mi) par semaine',
    title:
      'Plan marathon Norwegian Singles : 140 km/semaine (87 mi) | 12, 15 ou 18 semaines',
    description:
      'Un plan marathon sous-seuil culminant à 140 km (87 mi) par semaine, en 12, 15 ou 18 semaines. Allures calculées à partir de ton propre résultat de course, en km ou en miles.',
    h1: 'Singles 140 : un plan marathon culminant à 140 km par semaine',
    intro:
      "Le volume maximal que cette méthode peut porter tout en restant reconnaissable comme entraînement singles. Deux à trois deuxièmes sorties par semaine, des séances sous-seuil de 35-45 minutes de qualité, et une sortie longue jusqu'à 38 km.",
    whoFor: [
      "Tu as tenu 120 km par semaine ou plus pendant des mois d'affilée",
      "Tu cours près de la tête de ta catégorie d'âge ou tu vises un temps absolu rapide",
      "Tu as les habitudes de récupération (sommeil, alimentation, peu de stress au quotidien) qu'exige ce volume",
    ],
    notFor: [
      'Presque tout le monde. Le volume est rarement la variable qui manque vraiment à un coureur, et ce palier suppose déjà des années de volume derrière toi',
      "Tu n'es pas sûr d'avoir ta place ici, auquel cas ta place est en Singles 120",
    ],
    weeklyShape:
      "Sept jours de course avec deux à trois deuxièmes sorties, une sortie longue jusqu'à 38 km, et les plus grosses doses sous-seuil de toute la gamme. La phase spécifique marathon garde tout de même deux séances de qualité par semaine, car à ce volume la séance du week-end est déjà assez dure à elle seule.",
  },
};

export const sharedCopyFr: MarathonCopyShared = {
  indexSlug: 'plans-marathon',
  indexTitle:
    'Plans marathon Norwegian Singles | 12, 15 et 18 semaines, 75-140 km/semaine',
  indexDescription:
    'Plans marathon sous-seuil en quatre paliers de volume, 12, 15 ou 18 semaines, avec des allures calculées à partir de ton propre résultat de course. Km et miles. Pas un PDF statique : tes allures évoluent avec ta forme.',
  indexH1: 'Plans marathon Norwegian Singles',
  indexIntro:
    "Quatre plans, construits sur l'entraînement sous-seuil et la périodisation marathon de Marius Bakken. Choisis celui qui correspond au volume que tu cours vraiment, choisis 12, 15 ou 18 semaines, et chaque séance revient avec tes propres fourchettes d'allure.",
  disclaimer:
    "Ces plans reposent sur les principes publiés de la Norwegian Singles Method et sur les écrits de Marius Bakken sur l'entraînement marathon. Ils ne sont pas officiels, ni affiliés à, ni approuvés par Bakken, James Copeland, ou tout autre entraîneur. Les séances sont générées par notre propre moteur.",
  medicalNote:
    "Conseil d'entraînement, pas un conseil médical. Si tu es blessé, malade, ou si tu n'es pas sûr que ce volume te convienne, parles-en à un médecin ou un kinésithérapeute avant de commencer.",
  chooseTierHeading: "C'est pour toi si",
  notForHeading: 'Choisis un autre palier si',
  chooseLengthHeading: 'Combien de temps as-tu devant toi',
  lengthNote:
    "Chaque palier existe dans les trois durées, et les phases s'ajustent à la durée plutôt que d'être coupées à la fin. Si ta course a lieu dans 14 semaines, prends le plan de 12 semaines et continue à construire ta base deux semaines de plus avant.",
  phasesHeading: 'Comment le plan est construit',
  phases: [
    {
      name: 'Base sous-seuil',
      weeks: 'Semaines 1-6 sur 18',
      body: "Tout ce qui est qualité est sous-seuil, avec des répétitions longues dès la première semaine, plus une sortie longue qui grandit régulièrement. La troisième séance de chaque semaine est la séance X : côtes, 45/15, intervalles courts, ou un parkrun. Pas encore de travail à allure marathon, car inutile de répéter une allure que tu n'as pas encore méritée.",
    },
    {
      name: "Construction de l'allure de course",
      weeks: 'Semaines 7-11 sur 18',
      body: "Les deux séances sous-seuil restent. La troisième devient une séance modérée spécifique marathon le week-end : des blocs à allure marathon, un bloc continu à allure marathon au sein d'une sortie plus longue, ou une progression. La sortie longue reste une sortie facile.",
    },
    {
      name: 'Simulation de course',
      weeks: 'Semaines 12-15 sur 18',
      body: "La séance du week-end devient assez dure pour que deux séances de qualité suffisent à remplir la semaine. La grande séance spécifique marathon devient la sortie longue, et une séance sous-seuil se place trois à quatre jours avant ou après. Tout le reste est facile. C'est la phase où la course se gagne.",
    },
    {
      name: 'Affûtage',
      weeks: 'Semaines 16-18 sur 18',
      body: "Le volume et la durée des séances diminuent tandis que l'intensité reste présente, à petites doses : 20 x 1 minute, courtes séries de 30/30, un dernier rappel de l'allure marathon. La semaine de course se résume à une poignée d'efforts d'une minute et un footing d'activation.",
    },
  ],
  comparisonHeading: 'Pourquoi ne pas simplement acheter un PDF',
  comparisonIntro:
    "Parce qu'un PDF est faux un mois après l'achat. Ta forme évolue, les allures sur la feuille non.",
  comparison: [
    {
      label: 'Allures',
      pdf: "Génériques, ou figées au moment de l'achat",
      ours: 'Calculées à partir de ton résultat de course, en km ou en miles',
    },
    {
      label: 'Quand ta forme change',
      pdf: 'Le fichier est maintenant faux',
      ours: 'Chaque semaine à venir se recalcule. Réimprime et la feuille est à jour',
    },
    {
      label: 'Volume',
      pdf: 'Un seul plan pour tout le monde',
      ours: 'Quatre paliers ajustés au volume que tu cours vraiment',
    },
    {
      label: 'Durée',
      pdf: 'Une seule durée',
      ours: '12, 15 ou 18 semaines',
    },
    {
      label: 'Chaque séance',
      pdf: '« 10 x 1 km »',
      ours: "Structure, ta fourchette d'allure, et pourquoi la séance existe",
    },
    {
      label: 'Pas de côte, pas de piste, semaine en déplacement',
      pdf: 'Tu improvises',
      ours: 'Chaque séance est livrée avec une alternative documentée',
    },
    {
      label: 'Allure marathon',
      pdf: 'Un chiffre optimiste',
      ours: 'Une fourchette basée sur ta forme actuelle, avec un verdict honnête sur ton objectif',
    },
    {
      label: 'Si on trouve une erreur',
      pdf: 'Ton exemplaire reste faux',
      ours: 'La correction atteint les plans déjà vendus',
    },
  ],
  sampleHeading: 'Une vraie semaine de ce plan',
  sampleNote:
    'Générée par le même moteur que celui que tu achèterais, pour un coureur qui a couru 40:00 sur 10K. Achète le plan et chaque séance ci-dessous arrive avec tes propres allures.',
  includedHeading: 'Ce que tu reçois',
  included: [
    "Le plan complet, chaque semaine, chaque séance, avec tes propres fourchettes d'allure",
    'Les trois durées de ton palier : 12, 15 et 18 semaines',
    'Une raison en une ligne pour chaque séance, et une alternative pour chacune qui nécessite une côte, une piste ou un événement',
    'Des bilans de forme qui ne nécessitent pas de course : mets à jour tes allures selon la façon dont les séances se sont réellement passées',
    'Un volet renforcement optionnel : musculation lourde, pliométrie et sprints en côte, placés pour ne pas gêner la course',
    'Des feuilles imprimables, un CSV, et un flux calendrier qui reste à jour',
    "Un accès à vie depuis n'importe quel appareil, et toutes les améliorations que nous ferons plus tard",
  ],
  faqHeading: 'Questions',
  faq: [
    {
      q: 'Est-ce la Norwegian Singles Method officielle ?',
      a: "Non. Il n'existe pas de plan marathon Norwegian Singles officiel. Ces plans sont construits sur les principes publiés de la méthode et sur les écrits de Bakken sur la périodisation marathon, réalisés par nous, et nous ne sommes affiliés à personne ni approuvés par personne.",
    },
    {
      q: 'En quoi est-ce différent du plan gratuit sur ce site ?',
      a: 'Les outils gratuits te donnent des allures sous-seuil et une structure hebdomadaire répétitive qui ne change pas de semaine en semaine. Ce sont ici des cycles marathon complets : une courbe de volume, quatre phases, des séances spécifiques marathon, un affûtage, et une date de course.',
    },
    {
      q: 'Et si je ne connais pas mon allure marathon ?',
      a: "Tu n'en as pas besoin. Saisis une course récente sur n'importe quelle distance et le plan détermine ce que ta forme actuelle permet, grâce à une conversion qui tient compte de ton volume hebdomadaire. Si tu saisis aussi un temps objectif, on te dira honnêtement l'écart entre les deux.",
    },
    {
      q: 'Que se passe-t-il quand je progresse en plein cycle ?',
      a: 'Tu fais un bilan (quelques questions sur le ressenti des dernières séances, ou un résultat de 5K si tu en as un) et chaque semaine restante se recalcule autour de la nouvelle estimation. Les semaines déjà courues gardent les allures avec lesquelles tu les as courues.',
    },
    {
      q: "Ai-je besoin d'une course pour mettre à jour ma forme ?",
      a: 'Non. Les courses ne sont jamais obligatoires ni programmées comme telles. Le bilan par défaut demande comment se sont passées tes séances sous-seuil : si tu aurais pu ajouter une répétition, si tu as tenu la fourchette sur la dernière répétition aussi bien que sur la première.',
    },
    {
      q: 'Puis-je courir trois séances de qualité par semaine pendant la phase marathon ?',
      a: "Le plan ne t'en donnera pas trois, volontairement. Une fois que la séance du week-end atteint 20 km à l'allure de course, elle a besoin de trois à quatre jours de chaque côté. Ajouter une troisième séance, c'est la façon dont on arrive déjà fatigué sur la ligne de départ.",
    },
    {
      q: 'Miles ou kilomètres ?',
      a: 'Les deux, partout, avec un interrupteur. Les plans sont générés en métrique et affichés dans celle que tu préfères.',
    },
    {
      q: 'Et si je manque une séance, ou une semaine entière ?',
      a: "Le plan s'ajuste plutôt que de te dire de rattraper. Une séance manquée est sautée, pas empilée ; une semaine manquée se répète plutôt que de sauter en avant ; et un retour après une maladie déclenche un bilan de forme plutôt que de supposer que rien n'a changé.",
    },
    {
      q: 'Quelle durée dois-je choisir ?',
      a: "La plus longue qui tienne avant ta course. Dix-huit semaines laissent à la phase de base le temps de faire son travail ; douze t'y amènent quand même si c'est le temps dont tu disposes.",
    },
  ],
  ctaBuy: 'Obtenir ce plan',
  ctaBundle: 'Obtenir les quatre paliers',
  ctaLearnMore: 'Voir le plan',
  priceNote: "Un seul paiement, accès à vie. Pas d'abonnement.",
  labels: {
    peakVolume: 'Volume maximal',
    weeklyVolume: 'Volume hebdomadaire',
    qualitySessions: 'Séances de qualité',
    longRun: 'Sortie longue',
    runsPerWeek: 'Sorties par semaine',
    week: 'Semaine',
    phase: 'Phase',
    perWeek: 'par semaine',
    strengthOptional: 'Renforcement (optionnel)',
    whyThisSession: 'Pourquoi cette séance',
    ifYouCant: 'Si tu ne peux pas la faire telle quelle',
  },
};
