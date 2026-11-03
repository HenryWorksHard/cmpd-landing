// The sales page and the welcome page for each program.
//
// One entry per program id. Everything a buyer reads between the quiz and
// the checkout, and everything they read straight after paying, lives here —
// so changing the pitch is a copy edit in one file, not a hunt through JSX.
//
// WRITTEN SHORT ON PURPOSE. A sales page is read in about forty seconds and
// mostly skimmed. Every field here has a hard ceiling: `promise` is one line,
// `outcomes` is three, `why` is one paragraph, `inside` is four one-liners.
// If a new idea does not fit, something else comes out. Length does not
// persuade; a reader who reaches the price still interested does.
//
// Deliberately written as training, not treatment. These programs are for
// someone who already knows what they are dealing with; they do not diagnose
// anything and they do not promise to fix anything. Keep it that way.
//
// VIDEO SLOTS. Each program has two, both silent until the file exists:
//   /media/program-<id>.mp4   Eddy explaining the program, on the sales page
//   /media/welcome-<id>.mp4   Eddy welcoming them, on the post-purchase page
// Drop a file in and it appears. Nothing to change here.

export type ProgramContent = {
  /** One line under the name. The promise, in plain words. */
  promise: string;
  /**
   * Three things that are true at the end of it, written as the finished
   * state rather than as activities. "Pressing a barbell again" sells;
   * "progressive pressing protocol" does not. Exactly three, short.
   */
  outcomes: string[];
  /** One paragraph. Why the area gets weak and what this does about it. */
  why: string;
  /** What is actually in the program. Four, one line each. */
  inside: { title: string; body: string }[];
  /** Shown after payment, above the next steps. */
  welcome: string;
};

export const PROGRAM_CONTENT: Record<string, ProgramContent> = {
  shoulder: {
    promise: 'Press overhead again without thinking about it first.',
    outcomes: [
      'Pressing with a barbell again, from a position the shoulder can hold.',
      'A cuff and upper back strong enough that the next flare does not turn up.',
      'Full overhead range under load, not just when you are warm.',
    ],
    why: 'The shoulder has almost no bony support. It stays where it should because the muscles around it are strong enough to keep it there. Stop pressing and those fade, the joint loses its support, and the next flare arrives sooner than the last one did. This puts load back through it in an order it can accept: control, then range, then weight.',
    inside: [
      { title: 'Pressing, rebuilt in order', body: 'Machines first where the path is fixed, barbells once control holds. The program tells you when to move up.' },
      { title: 'Cuff work in every session', body: 'The part everyone skips, which is exactly why it keeps coming back.' },
      { title: 'Pulling matched to pressing', body: 'Equal volume through the upper back, so the front never outruns the back.' },
      { title: 'The rest of you keeps training', body: 'Legs, core and conditioning throughout. One sore shoulder is not eight lost weeks.' },
    ],
    welcome: 'Your shoulder program is ready. Eight weeks, four sessions a week, starting from where you actually are rather than where a generic plan assumes you are.',
  },

  'lower-back': {
    promise: 'A back that takes load instead of avoiding it.',
    outcomes: [
      'Hinging and carrying again, with a brace you can actually feel.',
      'Picking something up badly stops being an event.',
      'Eight weeks of tolerance built on purpose rather than hoped for.',
    ],
    why: 'Backs do not get strong by being protected. The longer you treat yours as fragile the less it can do, and the smaller the thing that sets it off next time. Most back programs are a list of stretches and a warning. This one builds tolerance instead: bracing, hinging and carrying, loaded from positions you can control and progressed every week.',
    inside: [
      { title: 'Bracing under load', body: 'Taught with weight in your hands, not on a mat, because that is the version that transfers.' },
      { title: 'Hinging from the floor up', body: 'Range opens only as the position holds. Nothing is left to how you feel on the day.' },
      { title: 'Carries and loaded walking', body: 'Hard to do badly, and it builds exactly the endurance a spine runs on.' },
      { title: 'Real training around it', body: 'Pressing, pulling and legs continue. The back work fits in rather than replacing everything.' },
    ],
    welcome: 'Your lower back program is ready. Eight weeks of building tolerance rather than avoiding load, four sessions a week.',
  },

  knee: {
    promise: 'Strength through the whole range, not just the part that feels safe.',
    outcomes: [
      'Squatting to depth again, with the load matched to it.',
      'A knee that tracks properly when you are tired, not only when you are fresh.',
      'Hamstrings and calves carrying their share instead of the quads doing all of it.',
    ],
    why: 'Knees rarely lose strength evenly. They lose it at the end of the range, in the positions you have quietly been avoiding, and then the avoidance becomes the habit. Quads take the blame, but a knee is held together by what happens above and below it too. This trains all of it, and it brings the range back on a schedule with the load following rather than leading.',
    inside: [
      { title: 'Quads through full range', body: 'Depth is reintroduced on a schedule, with the load scaled to meet it.' },
      { title: 'Hamstrings and calves, properly', body: 'Both load-bearing for the knee, both usually an afterthought. Here they get their own work.' },
      { title: 'Control under fatigue', body: 'Single-leg work placed late in the session, because late is when knees actually give.' },
      { title: 'Ten weeks, not six', body: 'Knees take longer. The extra weeks are where end-range strength gets built.' },
    ],
    welcome: 'Your knee program is ready. Ten weeks, four sessions a week, with the range coming back on a schedule rather than on a feeling.',
  },

  hip: {
    promise: 'Hips that hold up under everything you do standing.',
    outcomes: [
      'A hinge that feels strong rather than careful.',
      'Single-leg strength, so everything above the hip stops compensating for it.',
      'Deep positions you can hold under load, not just reach while relaxed.',
    ],
    why: 'Your hips are the base for every lift you do on your feet. When they are weak the complaint usually turns up somewhere else, and the glutes get treated with endless band walks that build very little. Hips respond to load through range, the same as anything else does. Eight weeks of that and the base stops being the weak link in everything else you train.',
    inside: [
      { title: 'Loaded hinging', body: 'The single best thing you can do for a set of hips, progressed from supported to free weight.' },
      { title: 'Single-leg strength', body: 'Most of life happens on one leg. Split squats, step-ups and single-leg hinging, all loaded.' },
      { title: 'Deep positions, rebuilt', body: 'Range you can hold with weight on you. That is the kind that lasts.' },
      { title: 'Trunk work that belongs', body: 'A hip only transmits force as well as the trunk above it lets it.' },
    ],
    welcome: 'Your hip and glute program is ready. Eight weeks, four sessions a week, building a base that does not need protecting.',
  },

  neck: {
    promise: 'Hold a position all day without it costing you.',
    outcomes: [
      'A neck strong enough that posture stops being something you maintain.',
      'An upper back that sits where it should by default rather than by willpower.',
      'The fastest result of the six. Most people notice it inside two weeks.',
    ],
    why: 'Necks rarely hurt because of one thing you did. They hurt because of a position you hold for eight hours and the fact that nothing in your week asks them to be strong. Posture advice treats that as a discipline problem, which mostly produces guilt. Strength works better: when the muscles can hold the position without strain, it stops being something you have to think about.',
    inside: [
      { title: 'Direct neck work', body: 'Loaded gently and trained on purpose. Almost nobody does this, and it is the fastest change most people feel.' },
      { title: 'Upper back strength', body: 'Rowing and scapular work at the volume it takes, not three sets tacked on at the end.' },
      { title: 'Shoulders that support it', body: 'Overhead and lateral work, because the neck does not hold a position on its own.' },
      { title: 'Six weeks, four sessions', body: 'The shortest program here. This area needs consistency rather than duration.' },
    ],
    welcome: 'Your neck and upper back program is ready. Six weeks, four sessions a week, and it is usually the one people feel first.',
  },

  return: {
    promise: 'Back to full training at a rate you can actually hold.',
    outcomes: [
      'Training normally again in twelve weeks, without the setback in week three.',
      'A start lighter than your ego wants, which is the whole reason it works.',
      'Every progression decided in advance, so you cannot talk yourself into a week you have not earned.',
    ],
    why: 'Coming back after months off has one failure mode and almost everybody finds it. You train like the person you were before the break, feel fine for ten days, and then something gives. Your strength returns faster than your tendons and joints adapt, and that gap does not care how motivated you are in week one. This paces it for you.',
    inside: [
      { title: 'A deliberately easy start', body: 'Week one will feel like not enough. That is the point, and it is why comebacks fail without it.' },
      { title: 'Everything, from day one', body: 'Full body from the start. No long isolation phase before you are allowed to train again.' },
      { title: 'Progression you do not negotiate', body: 'Load steps up on a schedule, not on how good you happen to feel that morning.' },
      { title: 'Twelve weeks to full training', body: 'You get to normal training having arrived there in one piece.' },
    ],
    welcome: 'Your return to training program is ready. Twelve weeks, four sessions a week, paced so you are still going in week ten.',
  },
};

export const contentFor = (id: string): ProgramContent | null =>
  PROGRAM_CONTENT[id] ?? null;
