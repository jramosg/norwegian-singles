/**
 * English source copy for the marathon plan sales pages.
 *
 * This file is the schema of record for the other locales. Everything here
 * describes something the engine actually does. If a claim stops being true,
 * the claim comes out.
 */

import type { TierId } from './types';

export interface TierPageCopy {
  /** URL slug, localized per locale. */
  slug: string;
  name: string;
  /** One line under the name. */
  tagline: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Who this tier is for. */
  whoFor: string[];
  /** Who should pick a different tier. Honesty sells better than hype. */
  notFor: string[];
  /** How a typical week is shaped at this volume. */
  weeklyShape: string;
}

export interface MarathonCopyShared {
  /** Slug of the marathon hub page. */
  indexSlug: string;
  indexTitle: string;
  indexDescription: string;
  indexH1: string;
  indexIntro: string;
  /** The "not official" statement. Prominent, not buried. */
  disclaimer: string;
  medicalNote: string;
  chooseTierHeading: string;
  notForHeading: string;
  chooseLengthHeading: string;
  lengthNote: string;
  phasesHeading: string;
  phases: { name: string; weeks: string; body: string }[];
  comparisonHeading: string;
  comparisonIntro: string;
  comparison: { label: string; pdf: string; ours: string }[];
  sampleHeading: string;
  sampleNote: string;
  includedHeading: string;
  included: string[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  ctaBuy: string;
  ctaBundle: string;
  ctaLearnMore: string;
  priceNote: string;
  /** Labels used in the plan grid and tables. */
  labels: {
    peakVolume: string;
    weeklyVolume: string;
    qualitySessions: string;
    longRun: string;
    runsPerWeek: string;
    week: string;
    phase: string;
    perWeek: string;
    strengthOptional: string;
    whyThisSession: string;
    ifYouCant: string;
  };
}

export const tierCopyEn: Record<TierId, TierPageCopy> = {
  singles75: {
    slug: 'marathon-plan-75km',
    name: 'Singles 75',
    tagline: 'Peaks at 75 km (47 mi) a week',
    title:
      'Norwegian Singles Marathon Plan: 75 km/week (47 mi) | 12, 15 or 18 weeks',
    description:
      'A sub-threshold marathon plan peaking at 75 km (47 mi) per week, in 12, 15 or 18 weeks. Paces computed from your own race result, in km or miles.',
    h1: 'Singles 75: a marathon plan peaking at 75 km a week',
    intro:
      'The entry point to sub-threshold marathon training. Six running days, two sub-threshold sessions and one X-session a week, and a long run that grows to 30 km. Enough volume to race a marathon properly without the training taking over your life.',
    whoFor: [
      'You already run 50-65 km a week comfortably and want to add a little',
      'First marathon, or a first serious attempt at one',
      'You have six days a week to run and no interest in doubling',
    ],
    notFor: [
      'You are already running 90 km a week. Start at Singles 95, because this one will feel too easy to be worth paying for',
      'If you are running under 45 km a week, spend a few months building base first. No plan fixes a missing foundation',
    ],
    weeklyShape:
      'Two sub-threshold sessions on Tuesday and Thursday, an X-session on Saturday, a long run on Sunday, and one full rest day. In the marathon-specific phase the Saturday session disappears and the weekend long run becomes the hard session of the week.',
  },
  singles95: {
    slug: 'marathon-plan-95km',
    name: 'Singles 95',
    tagline: 'Peaks at 95 km (59 mi) a week',
    title:
      'Norwegian Singles Marathon Plan: 95 km/week (59 mi) | 12, 15 or 18 weeks',
    description:
      'A sub-threshold marathon plan peaking at 95 km (59 mi) per week, in 12, 15 or 18 weeks. Paces computed from your own race result, in km or miles.',
    h1: 'Singles 95: a marathon plan peaking at 95 km a week',
    intro:
      'The tier most people who want a personal best belong in. Seven running days, longer sub-threshold sessions than Singles 75, and marathon-specific weekend work that builds to 20 km at race pace inside a long run.',
    whoFor: [
      'You have run a marathon before and want to take real time off it',
      'You already handle 70-85 km a week without falling apart',
      'Chasing a Boston, London or other championship qualifying time',
    ],
    notFor: [
      'This would be a big jump from what you run now. Take Singles 75 for one build and come here for the next one',
      'You are consistently over 110 km a week, in which case Singles 120 fits you better',
    ],
    weeklyShape:
      'Two sub-threshold sessions and one X-session a week across seven running days, with the long run growing to 32 km. In the marathon-specific phase the week drops to two quality sessions: one big weekend session and one sub-threshold session three to four days away from it.',
  },
  singles120: {
    slug: 'marathon-plan-120km',
    name: 'Singles 120',
    tagline: 'Peaks at 120 km (75 mi) a week',
    title:
      'Norwegian Singles Marathon Plan: 120 km/week (75 mi) | 12, 15 or 18 weeks',
    description:
      'A sub-threshold marathon plan peaking at 120 km (75 mi) per week, in 12, 15 or 18 weeks. Paces computed from your own race result, in km or miles.',
    h1: 'Singles 120: a marathon plan peaking at 120 km a week',
    intro:
      'High volume, still one main session a day. Seven running days with one or two second runs a week, sub-threshold sessions of 30-40 minutes of quality, and marathon-specific sessions that reach 20 km at race pace.',
    whoFor: [
      'You have trained at 100 km a week or more and stayed healthy doing it',
      'Several marathons behind you and a specific time in mind',
      'Happy to add a short second run when the week calls for it',
    ],
    notFor: [
      '120 km a week would be a personal record for volume. A marathon build is the wrong place to find out how that goes',
      'Your week cannot absorb 9 to 11 hours of running. Singles 95 will produce a better race than a tier you keep missing sessions in',
    ],
    weeklyShape:
      'Seven running days plus roughly one second run, a long run to 34 km, and 30-40 minutes of sub-threshold work per session. Second runs split a big easy day rather than adding to it.',
  },
  singles140: {
    slug: 'marathon-plan-140km',
    name: 'Singles 140',
    tagline: 'Peaks at 140 km (87 mi) a week',
    title:
      'Norwegian Singles Marathon Plan: 140 km/week (87 mi) | 12, 15 or 18 weeks',
    description:
      'A sub-threshold marathon plan peaking at 140 km (87 mi) per week, in 12, 15 or 18 weeks. Paces computed from your own race result, in km or miles.',
    h1: 'Singles 140: a marathon plan peaking at 140 km a week',
    intro:
      'The most volume this method carries while staying recognisably singles training. Two to three second runs a week, sub-threshold sessions of 35-45 minutes of quality, and a long run to 38 km.',
    whoFor: [
      'You have sustained 120 km a week or more for months at a time',
      'Racing near the front of your age group or chasing a fast absolute time',
      'You have the recovery habits (sleep, food, low life stress) that this volume demands',
    ],
    notFor: [
      'Almost everyone. Volume is rarely the variable a runner is actually missing, and this tier assumes years of it already behind you',
      'You are unsure whether you belong here, in which case you belong in Singles 120',
    ],
    weeklyShape:
      'Seven running days with two to three second runs, a long run to 38 km, and the largest sub-threshold doses in the range. The last phase still holds to two quality sessions a week, because at this volume the weekend session is hard enough on its own.',
  },
};

export const sharedCopyEn: MarathonCopyShared = {
  indexSlug: 'marathon-plans',
  indexTitle:
    'Norwegian Singles Marathon Plans | 12, 15 and 18 weeks, 75-140 km/week',
  indexDescription:
    'Sub-threshold marathon plans in four volume tiers, 12, 15 or 18 weeks, with paces computed from your own race result. Km and miles. Not a static PDF: your paces update as your fitness does.',
  indexH1: 'Norwegian Singles marathon plans',
  indexIntro:
    'Four plans, built on sub-threshold training and Marius Bakken’s marathon periodization. Pick the one that matches the volume you actually run, choose 12, 15 or 18 weeks, and every session comes back with your own pace bands on it.',
  disclaimer:
    'These plans are based on the published principles of the Norwegian Singles Method and on Marius Bakken’s writing about marathon training. They are not official, not affiliated with, and not endorsed by Bakken, James Copeland, or any other coach. The sessions are generated by our own engine.',
  medicalNote:
    'Training advice, not medical advice. If you are injured, ill, or unsure whether this volume suits you, talk to a doctor or physiotherapist before starting.',
  chooseTierHeading: 'This one is for you if',
  notForHeading: 'Pick a different tier if',
  chooseLengthHeading: 'How long have you got',
  lengthNote:
    'Every tier comes in all three lengths, and the phases scale with the length rather than being cut off the end. If your race is 14 weeks away, take the 12-week plan and keep building for two more weeks first.',
  phasesHeading: 'How the plan is built',
  phases: [
    {
      name: 'Sub-threshold base',
      weeks: 'Weeks 1-6 of 18',
      body: 'Everything quality is sub-threshold, long reps included from the first week, plus a long run that grows steadily. The third session each week is the X-session: hills, 45/15s, short intervals, or a parkrun. No marathon-pace work at all yet, because there is no point rehearsing a pace you have not yet earned.',
    },
    {
      name: 'Race-pace build',
      weeks: 'Weeks 7-11 of 18',
      body: 'The two sub-threshold sessions stay. The third becomes a moderate marathon-specific session on the weekend: blocks at marathon pace, a continuous marathon-pace block inside a longer run, or a progression. The long run is still an easy run.',
    },
    {
      name: 'Race simulation',
      weeks: 'Weeks 12-15 of 18',
      body: 'The weekend session gets hard enough that two quality sessions is the whole week. The big marathon-specific session becomes the long run, and one sub-threshold session sits three to four days away from it. Everything else is easy. This is the phase the race is won in.',
    },
    {
      name: 'Taper',
      weeks: 'Weeks 16-18 of 18',
      body: 'Volume and session length come down while the intensity stays, in small doses: 20 x 1 minute, short 30/30 sets, one last reminder of marathon pace. Race week is a handful of one-minute efforts and a shakeout.',
    },
  ],
  comparisonHeading: 'Why not just buy a PDF',
  comparisonIntro:
    'Because a PDF is wrong a month after you buy it. Your fitness moves and the paces on the page do not.',
  comparison: [
    {
      label: 'Paces',
      pdf: 'Generic, or frozen at the moment you bought',
      ours: 'Computed from your race result, in km or miles',
    },
    {
      label: 'When your fitness changes',
      pdf: 'The file is now wrong',
      ours: 'Every future week re-prices. Reprint and the sheet is current',
    },
    {
      label: 'Volume',
      pdf: 'One plan for everybody',
      ours: 'Four tiers matched to the volume you actually run',
    },
    {
      label: 'Timeline',
      pdf: 'One length',
      ours: '12, 15 or 18 weeks',
    },
    {
      label: 'Each session',
      pdf: '"10 x 1 km"',
      ours: 'Structure, your pace band, and why the session exists',
    },
    {
      label: 'No hill, no track, travel week',
      pdf: 'You improvise',
      ours: 'Every session ships with a documented substitute',
    },
    {
      label: 'Marathon pace',
      pdf: 'One optimistic number',
      ours: 'A band from current fitness, with an honest verdict on your goal',
    },
    {
      label: 'If we find a mistake',
      pdf: 'Your copy stays wrong',
      ours: 'The fix reaches plans already sold',
    },
  ],
  sampleHeading: 'A real week from this plan',
  sampleNote:
    'Generated by the same engine you would buy, for a runner who has run 40:00 for 10K. Buy the plan and every session below arrives with your own paces on it.',
  includedHeading: 'What you get',
  included: [
    'The full plan, every week, every session, with your own pace bands',
    'All three lengths of your tier: 12, 15 and 18 weeks',
    'A one-line reason for every session, and a substitute for every one that needs a hill, a track or an event',
    'Fitness check-ins that do not need a race: update your paces from how the sessions actually went',
    'An optional strength track: heavy lifting, plyometrics and hill sprints, placed so they do not wreck the running',
    'Printable sheets, CSV, and a calendar feed that stays current',
    'Lifetime access from any device, and every improvement we make later',
  ],
  faqHeading: 'Questions',
  faq: [
    {
      q: 'Is this the official Norwegian Singles Method?',
      a: 'No. There is no official Norwegian Singles marathon plan. These plans are built on the method’s published principles and on Bakken’s writing about marathon periodization, by us, and we are not affiliated with or endorsed by anyone.',
    },
    {
      q: 'How is this different from the free plan on this site?',
      a: 'The free tools give you sub-threshold paces and a repeating weekly structure that does not change week to week. These are full marathon builds: a volume curve, four phases, marathon-specific sessions, a taper, and a race date.',
    },
    {
      q: 'What if I do not know my marathon pace?',
      a: 'You do not need to. Enter a recent race at any distance and the plan works out what your current fitness supports, using a conversion that accounts for your weekly volume. If you also enter a goal time, we will tell you honestly how far apart the two are.',
    },
    {
      q: 'What happens when I get fitter mid-build?',
      a: 'You run a check-in (a few questions about how the last sessions felt, or a 5K result if you have one) and every remaining week re-prices around the new estimate. Weeks you have already run keep the paces you ran them at.',
    },
    {
      q: 'Do I need a race to update my fitness?',
      a: 'No. Races are never required and never scheduled as mandatory. The default check-in asks how your sub-threshold sessions went: whether you could have added a rep, whether you held the band on the last rep as well as the first.',
    },
    {
      q: 'Can I run three quality sessions a week in the marathon phase?',
      a: 'The plan will not give you three, deliberately. Once the weekend session reaches 20 km at race pace it needs three to four days on either side of it. Adding a third session is how people arrive at the start line already tired.',
    },
    {
      q: 'Miles or kilometres?',
      a: 'Both, everywhere, on a toggle. The plans are generated in metric and displayed in whichever you prefer.',
    },
    {
      q: 'What if I miss a session, or a whole week?',
      a: 'The plan adjusts rather than telling you to catch up. A missed session is skipped, not stacked; a missed week repeats rather than jumping ahead; and coming back from illness prompts a fitness check-in instead of assuming nothing changed.',
    },
    {
      q: 'Which length should I pick?',
      a: 'The longest one that fits before your race. Eighteen weeks gives the base phase room to do its work; twelve gets you there if that is the time you have.',
    },
  ],
  ctaBuy: 'Get this plan',
  ctaBundle: 'Get all four tiers',
  ctaLearnMore: 'See the plan',
  priceNote: 'One payment, lifetime access. No subscription.',
  labels: {
    peakVolume: 'Peak volume',
    weeklyVolume: 'Weekly volume',
    qualitySessions: 'Quality sessions',
    longRun: 'Long run',
    runsPerWeek: 'Runs per week',
    week: 'Week',
    phase: 'Phase',
    perWeek: 'per week',
    strengthOptional: 'Strength (optional)',
    whyThisSession: 'Why this session',
    ifYouCant: 'If you cannot do it as written',
  },
};
