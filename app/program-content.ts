// The sales page and the welcome page for each program.
//
// One entry per program id. Everything a buyer reads between the quiz and
// the checkout, and everything they read straight after paying, lives here —
// so changing the pitch is a copy edit in one file, not a hunt through JSX.
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
  /** Two or three short paragraphs: why the area gets weak, what this does about it. */
  why: string[];
  /** What is actually in the program. */
  inside: { title: string; body: string }[];
  /** Honest about who should not buy it. Earns more trust than another benefit. */
  notFor: string[];
  /** Shown after payment, above the next steps. */
  welcome: string;
};

export const PROGRAM_CONTENT: Record<string, ProgramContent> = {
  shoulder: {
    promise: 'Overhead strength you can trust again.',
    why: [
      'The shoulder is the most mobile joint you have, which is another way of saying it depends almost entirely on the muscles around it to stay where it should be. There is no deep socket doing the work for you.',
      'So when a shoulder has been through something, the instinct is to stop pressing. Reasonable in the first week, expensive after that: the cuff and the muscles that hold your shoulder blade in place get weaker, the joint gets less support, and the next flare arrives sooner than the last.',
      'This program puts load back through the shoulder in an order it can accept. Control before range, range before weight. By the end you are pressing properly again, and the structures that keep it stable are strong enough to still be there in six months.',
    ],
    inside: [
      { title: 'Pressing, rebuilt in order', body: 'Starts on machines and supported angles where the path is fixed, moves to dumbbells and barbells as control holds up. You are not guessing when to progress; the program tells you.' },
      { title: 'Cuff and scapular work, every session', body: 'The small muscles that hold the joint together get trained deliberately rather than hoped for. This is the part most people skip and then wonder why it keeps coming back.' },
      { title: 'Pulling matched to pressing', body: 'Equal volume through the upper back. A shoulder that only ever presses ends up short at the front and unsupported at the back.' },
      { title: 'The rest of you keeps training', body: 'Legs, core and conditioning continue throughout. One sore shoulder is not a reason to lose eight weeks of progress everywhere else.' },
    ],
    notFor: [
      'A shoulder you have not had looked at. Get a diagnosis first.',
      'Pain that wakes you at night and does not ease when you move.',
      'A recent dislocation or surgery still inside your surgeon’s restrictions.',
    ],
    welcome: 'Your shoulder program is ready. Eight weeks, four sessions a week, starting from where you actually are rather than where a generic plan assumes you are.',
  },

  'lower-back': {
    promise: 'A back that handles load instead of avoiding it.',
    why: [
      'Backs do not get strong by being protected. The longer you treat yours as fragile, the less it can do, and the smaller the thing that sets it off next time.',
      'Most lower back programs are a list of stretches and a warning. Stretching an area that is already being asked to hold you up is not the problem, and it is rarely the answer.',
      'This one builds tolerance instead. Bracing, hinging and carrying, loaded from positions you can control and progressed week by week until a heavy shopping bag or a bad night on the couch is no longer an event.',
    ],
    inside: [
      { title: 'Bracing you can actually use', body: 'Taught under load, not on a mat. Holding a position with weight in your hands is what transfers to picking something up badly on a Tuesday.' },
      { title: 'Hinging, from the floor up', body: 'Progressions that start with your hips above your knees and your range restricted, and open up only as the position holds.' },
      { title: 'Carries and loaded walking', body: 'The most underused tool for a back. Cheap, hard to do badly, and it builds exactly the kind of endurance a spine needs.' },
      { title: 'Full-body training around it', body: 'Pressing, pulling and legs continue. The back work fits into real training rather than replacing it.' },
    ],
    notFor: [
      'Back pain with numbness, pins and needles or weakness down a leg.',
      'Any change in bladder or bowel function. See a doctor today, not us.',
      'An undiagnosed back that has never been looked at.',
    ],
    welcome: 'Your lower back program is ready. Eight weeks of building tolerance rather than avoiding load, four sessions a week.',
  },

  knee: {
    promise: 'Strength through the whole range, not just the part that feels safe.',
    why: [
      'Knees rarely lose strength evenly. They lose it at the end of the range, in the positions you have been quietly avoiding, and then the avoidance becomes the habit.',
      'Quads take most of the blame and most of the rehab. They matter, but a knee is held together by what happens above and below it too: hamstrings, calves, and the control that stops it drifting inwards under load.',
      'This program trains all of it, and it trains the range you have been skipping. Depth comes back gradually, with the load following rather than leading.',
    ],
    inside: [
      { title: 'Quads through full range', body: 'Not just the top third. Depth is reintroduced on a schedule with the load scaled to match, so the hard part gets stronger instead of getting dodged.' },
      { title: 'Hamstrings and calves, properly', body: 'Both are load-bearing for the knee and both are usually an afterthought. Here they get their own work, every week.' },
      { title: 'Control under fatigue', body: 'Single-leg work placed late in the session, because a knee that tracks well when fresh and collapses when tired is still a knee that collapses.' },
      { title: 'Ten weeks, not six', body: 'Knees take longer. The extra four weeks are where the end-range strength actually gets built.' },
    ],
    notFor: [
      'A knee that gives way, locks, or cannot take your bodyweight.',
      'Post-surgical knees still inside the surgeon’s loading restrictions.',
      'Significant swelling that has not been assessed.',
    ],
    welcome: 'Your knee program is ready. Ten weeks, four sessions a week, with the range coming back on a schedule rather than on a feeling.',
  },

  hip: {
    promise: 'Hips that hold up under everything you do standing.',
    why: [
      'Your hips are the base for every lift you do on your feet and most of what you do away from the gym. When they are weak or sore, everything above them starts compensating, and the complaint often shows up somewhere else entirely.',
      'Glutes are the usual suspect and the usual victim of bad advice. Endless band walks build very little. Hips respond to load through range, the same as anything else.',
      'This program loads them properly: hinging, bracing on one leg, and the deep positions people tend to abandon. Eight weeks of that and the base stops being the weak link.',
    ],
    inside: [
      { title: 'Loaded hinging', body: 'The single best thing you can do for a set of hips, progressed from supported variations to free weight as control holds.' },
      { title: 'Single-leg strength', body: 'Most of life happens on one leg at a time. Split squats, step-ups and single-leg hinging, all loaded, all progressed.' },
      { title: 'Deep positions, rebuilt', body: 'Range you can hold under load, rather than range you can reach while relaxed. They are not the same thing and only one of them lasts.' },
      { title: 'Trunk work that belongs', body: 'Anti-rotation and bracing, because a hip only transmits force as well as the trunk above it allows.' },
    ],
    notFor: [
      'Groin or hip pain that came on suddenly and has not been assessed.',
      'A hip replacement still inside its restrictions.',
      'Deep, aching hip pain at rest, particularly at night.',
    ],
    welcome: 'Your hip and glute program is ready. Eight weeks, four sessions a week, building a base that does not need protecting.',
  },

  neck: {
    promise: 'Hold a position all day without it costing you.',
    why: [
      'Necks and upper backs rarely hurt because of one thing you did. They hurt because of a position you hold for eight hours and the fact that nothing in your week asks them to be strong.',
      'Posture advice treats it as a discipline problem. Sit up straight, pull your shoulders back. Nobody can hold a position by willpower for eight hours, and being told to try mostly produces guilt.',
      'Strength works better. When the muscles that hold your head and shoulder blades where they belong can do it without strain, the position stops being something you maintain and starts being somewhere you default to.',
    ],
    inside: [
      { title: 'Direct neck work', body: 'Trained deliberately and loaded gently. Almost nobody does this and it is the fastest change most people feel.' },
      { title: 'Upper back strength', body: 'Rowing and scapular work at the volume it actually takes, rather than three sets tacked onto the end of a session.' },
      { title: 'Shoulders that support it', body: 'Overhead and lateral work, because the neck does not hold a position on its own.' },
      { title: 'Six weeks, four sessions', body: 'The shortest program here. The area responds quickly, and it needs consistency rather than duration.' },
    ],
    notFor: [
      'Neck pain with numbness, tingling or weakness in your arms or hands.',
      'Headaches that started with the neck pain and are getting worse.',
      'Any neck injury from an impact that has not been imaged.',
    ],
    welcome: 'Your neck and upper back program is ready. Six weeks, four sessions a week, and it is usually the one people feel first.',
  },

  return: {
    promise: 'Back to full training at a rate you can actually hold.',
    why: [
      'Coming back after months off has one failure mode, and almost everybody finds it: you train like the person you were before the break, feel fine for ten days, and then something gives.',
      'Your strength comes back faster than your tendons and joints adapt. That gap is the whole problem, and it does not care how motivated you are in week one.',
      'This program paces it for you. Twelve weeks that start lighter than your ego wants and end at full training, with the progression already decided so you cannot talk yourself into a week you have not earned.',
    ],
    inside: [
      { title: 'A deliberately easy start', body: 'Week one will feel like not enough. That is the point, and it is the single most common reason comebacks fail.' },
      { title: 'Everything, from the beginning', body: 'Full body from day one. No long isolation phase before you are allowed to train properly again.' },
      { title: 'Progression you do not negotiate', body: 'Load and volume step up on a schedule rather than on how good you feel that morning, which is the judgement nobody makes well about themselves.' },
      { title: 'Twelve weeks to full training', body: 'At the end you are training normally, having arrived there without the setback in week three.' },
    ],
    notFor: [
      'Coming back from a specific injury. Take the program for that area instead.',
      'Anyone who has not been cleared after illness or surgery.',
      'Someone already training consistently who just wants more volume.',
    ],
    welcome: 'Your return to training program is ready. Twelve weeks, four sessions a week, paced so you are still going in week ten.',
  },
};

export const contentFor = (id: string): ProgramContent | null =>
  PROGRAM_CONTENT[id] ?? null;
