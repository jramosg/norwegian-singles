/**
 * English source copy for generated marathon plans.
 *
 * Every session carries a one-line reason it exists. That line is a product
 * requirement, not decoration: it is most of what separates a training plan
 * from a spreadsheet of intervals.
 *
 * This file is the schema of record — other locales are typed against it.
 */

export const marathonCopyEn = {
  // -------------------------------------------------------------------------
  // Why this session
  // -------------------------------------------------------------------------
  'why.subt.long':
    'Long reps at subthreshold are the engine of this method: enough time at a controlled effort to lift your threshold, without the recovery cost of racing.',
  'why.subt.continuous':
    'One continuous run with the pace drifting between two subthreshold gears. The same work as reps, with nowhere to hide and no standing around.',
  'why.subt.medium':
    'Medium reps hold the same controlled effort at a slightly quicker gear, so you bank threshold time with a little more speed than the long reps give you.',
  'why.subt.connected':
    'The easy-running rests keep this almost continuous, which is what marathon endurance actually asks for: hold the effort for a long time without stopping.',
  'why.subt.short':
    'Short reps let you touch a quicker pace while the total effort stays controlled. Speed maintenance that costs you almost nothing in recovery.',
  'why.subt.4515':
    'Forty-five seconds on, fifteen off. The short rests hold lactate steady while the pace stays honest, so you get a lot of quality time for very little damage.',
  'why.subt.3030':
    'Thirty-thirty is the gentlest way to run fast: each rep is short enough to stay relaxed, and the constant switching keeps the average effort right at threshold.',

  // -------------------------------------------------------------------------
  // X-sessions
  // -------------------------------------------------------------------------
  'why.x.hills_short':
    'Short hill sprints are strength work disguised as running: near-maximal force with almost no impact, which is why they carry so little injury risk.',
  'why.x.hills_200':
    'Two hundred metres uphill, above threshold — a Bakken staple. The hill does the strength work while the reduced speed keeps the risk down.',
  'why.x.hills_long':
    'Longer hill reps stay above threshold for long enough to bite, with the gradient capping your speed and protecting your legs.',
  'why.x.4515_progressive':
    'Start just under threshold and finish above it. The same session as the controlled version, but you leave having touched a genuinely hard pace.',
  'why.x.vo2':
    'A small dose of work above threshold. This is not a VO2max block — it just keeps the top end awake while the threshold work does the heavy lifting.',
  'why.x.long_rest':
    'Long easy rests turn this into a series of separate high-quality efforts instead of one grinding session. You reach near 5K pace on every rep and still recover in a day.',
  'why.test':
    'A 5K flat out is the cheapest fitness test there is. Race it, enter the result, and the rest of your plan re-prices itself around it.',

  // -------------------------------------------------------------------------
  // Marathon-specific
  // -------------------------------------------------------------------------
  'why.ms.blocks':
    'Blocks at marathon pace with short jogs between. Broken up, you can hold goal pace far longer than one continuous run allows — which is the point this early.',
  'why.ms.continuous':
    'One unbroken block at marathon pace inside a longer run. The closest thing to a race rehearsal: same pace, same fuelling, same monotony.',
  'why.ms.alternating':
    'Marathon pace with a floating kilometre instead of a rest. The float never lets you recover fully, so the back half feels like the back half of the race.',
  'why.ms.progression':
    'Start steady, finish at marathon pace. A progression teaches pace discipline early and makes you run fastest when you are already tired.',
  'why.ms.long_specific':
    'The session this phase exists for: a long run with most of its distance at or near race pace, run on legs that are already tired.',
  'why.ms.progressive_blocks':
    'Four blocks stepping up towards marathon pace. Each is harder than the last while fatigue accumulates — the specific demand of the final 10 km.',

  // -------------------------------------------------------------------------
  // Taper
  // -------------------------------------------------------------------------
  'why.taper.sharpener':
    'Short, quick and comfortable. Enough intensity to stay sharp, far too little to cost you anything on race day.',
  'why.taper.mp':
    'A short reminder of marathon pace. Long enough to rehearse the rhythm, short enough that you finish wanting more.',
  'why.taper.primer':
    'Race week. A handful of one-minute efforts to wake the legs up — nothing here builds fitness, it only stops you feeling flat on race morning.',

  // -------------------------------------------------------------------------
  // Substitutions — every session has an answer for a bad week
  // -------------------------------------------------------------------------
  'sub.treadmill':
    'Treadmill: hold the pace band at 1% incline and run the same durations.',
  'sub.no_track':
    'No track: run the reps by time rather than distance, on any flat road or path.',
  'sub.no_hill_flat_strides':
    'No hill: run the same efforts on the flat as relaxed, near-maximal strides.',
  'sub.no_hill_flat_reps':
    'No hill: run the reps flat at 5K effort. You lose some of the strength benefit but keep the stimulus.',
  'sub.treadmill_incline':
    'Treadmill: use a 6-10% incline for the same time per rep.',
  'sub.no_parkrun_solo_tt':
    'No parkrun nearby: run the 5K solo as a time trial on a flat, measured route.',
  'sub.skip_test_checkin':
    'Would rather not test: skip it, run easy, and use the session check-in to update your fitness instead.',

  // -------------------------------------------------------------------------
  // Perceived effort
  // -------------------------------------------------------------------------
  'rpe.label': 'Effort',
  'rpe.subt':
    'Finish around 7 out of 10. You should feel you had another rep or two in you — if you did not, the pace was too quick.',
  'rpe.x':
    'Hard, 8 to 9 out of 10, but never a race. Stop the session if the pace starts falling away.',
  'rpe.ms':
    'Marathon pace should feel controlled, 6 to 7 out of 10 early on. If it feels like racing in the first half, the pace is wrong for today.',
  'rpe.easy':
    'Easy, 2 to 3 out of 10. Conversational the whole way. Most of the week is here, and it is meant to be.',
  'rpe.test': 'All out. This is a race, so treat it like one.',

  // -------------------------------------------------------------------------
  // Optional sessions
  // -------------------------------------------------------------------------
  'alt.label': 'Or, instead',
  'alt.reason.no_event':
    'Tests are optional. No parkrun, no race, or no wish to race — take this instead and update your fitness from how your sessions have felt.',
  'alt.reason.no_hill':
    'No hill you can use? This does the same job on flat ground.',

  // -------------------------------------------------------------------------
  // Week labels
  // -------------------------------------------------------------------------
  'week.label.base': 'Subthreshold base',
  'week.label.supportive': 'Marathon-supportive',
  'week.label.specific': 'Marathon-specific',
  'week.label.taper': 'Taper',
  'week.label.deload': 'Down week',
  'week.label.test': 'Test week',
  'week.label.race': 'Race week',

  // -------------------------------------------------------------------------
  // Strength placement notes
  // -------------------------------------------------------------------------
  'strength.notes.lifting':
    'Lift after the run, never before, and never the day before a hard session. Heavy, few reps: you are training economy, not building muscle.',
  'strength.notes.plyometrics':
    'Leave several hours after the run. Maximal height and minimal ground contact on every jump — stop the moment the bounce goes.',
  'strength.notes.hill_sprints':
    'After an easy run, while you are fresh enough to sprint. Build up over weeks and stop entirely in race week. Introduce these carefully if you have any Achilles, calf, foot or ankle history.',

  // -------------------------------------------------------------------------
  // Session structure vocabulary
  // -------------------------------------------------------------------------
  'anchor.subT.rep3min': 'sub-threshold, short reps',
  'anchor.subT.rep6min': 'sub-threshold, medium reps',
  'anchor.subT.rep10min': 'sub-threshold, long reps',
  'anchor.easy': 'easy',
  'anchor.mp': 'marathon pace',
  'anchor.mp.pct': '{pct}% of marathon pace',
  'anchor.race': '{distance} pace',
  'anchor.effort.hill_strong': 'strong uphill effort',
  'anchor.effort.hill_max': 'maximal uphill effort',
  'anchor.effort.max_speed': 'near-maximal speed',
  'anchor.effort.above_threshold': 'above threshold',
  'anchor.effort.relaxed': 'relaxed',
  'seg.warmup': 'warm-up',
  'seg.cooldown': 'cool-down',
  'seg.leadIn': 'easy to start',
  'rec.jog': 'jog',
  'rec.walk': 'walk',
  'rec.easy': 'easy running',
  'rec.float': 'float',
  'rec.standing': 'standing rest',

  // -------------------------------------------------------------------------
  // Day kinds
  // -------------------------------------------------------------------------
  'day.rest': 'Rest',
  'day.easy': 'Easy',
  'day.long': 'Long run',
  'day.subT': 'Sub-threshold',
  'day.x': 'X-session',
  'day.ms': 'Marathon-specific',
  'day.test': 'Test',
  'day.race': 'Marathon',
  'day.secondRun': 'Second run',
} as const;

export type MarathonCopyKey = keyof typeof marathonCopyEn;
export type MarathonCopy = Record<MarathonCopyKey, string>;
