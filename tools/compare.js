// Compares Stepwise's question types with each real AP exam.
// Usage: node tools/compare.js > compare.json
// "Official" data below is taken from each course's exam format in the
// College Board course descriptions (free-response task types and the style of
// the multiple-choice section). `have` = how many of those free-response task
// types Stepwise currently practices.
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
for (const [, src] of html.matchAll(/<script src="([^"]+)" defer><\/script>/g)) if (!src.endsWith('app.js')) require(path.join(__dirname, '..', src));
const SW = globalThis.SW;

// mcq: style of the real multiple-choice section
//   computation = mostly worked problems; stimulus = mostly sets built on passages, sources, data or diagrams;
//   code = built on code; media = built on images or audio Stepwise cannot show; none = no exam
const PHYS = ['Mathematical routines', 'Translation between representations', 'Experimental design and analysis', 'Qualitative/quantitative translation'];
const CALC = ['Rate in/out and accumulation', 'Particle motion', "Analysis of a graph of f'", 'Table data (Riemann sums, MVT)', 'Differential equations and slope fields', 'Area and volume'];
const HIST = ['Short-answer questions', 'Document-based question', 'Long essay'];
const LANG4 = ['Email reply', 'Argumentative essay', 'Conversation (spoken)', 'Cultural comparison (spoken)'];
const ASIA4 = ['Story narration', 'Email response', 'Conversation (spoken)', 'Cultural presentation (spoken)'];
const OFFICIAL = {
  phys1: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Mathematical routines and translation-between-representations free response are missing; real multiple-choice uses many diagrams and graphs.' },
  phys2: { mcq: 'computation', frq: PHYS, have: 0, gap: 'No free-response practice yet, and concept questions are text-only (no circuit or ray diagrams).' },
  physcm: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Translation-between-representations free response is missing, and real questions use many force, motion and energy diagrams that Stepwise describes in words.' },
  physce: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Needs experimental design and translation-between-representations tasks; no field or circuit diagrams.' },
  chem: { mcq: 'stimulus', frq: ['Long free response (multi-part)', 'Short free response'], have: 2, gap: 'Real multiple-choice leans on particle diagrams, PES spectra and titration curves, which Stepwise does not draw.' },
  bio: { mcq: 'stimulus', frq: ['Interpreting and evaluating experimental results', 'Experimental results with graphing', 'Scientific investigation', 'Conceptual analysis', 'Analyze a model or visual representation', 'Analyze data'], have: 3, gap: 'Real questions are mostly data sets and figures; graphing and model-analysis free response are missing.' },
  apes: { mcq: 'stimulus', frq: ['Design an investigation', 'Analyze an environmental problem and propose a solution', 'Same, with calculations'], have: 2, gap: 'Real multiple-choice uses maps, graphs and data tables; Stepwise concept questions are text-only.' },
  calcab: { mcq: 'computation', frq: CALC, have: 2, gap: 'Missing graph-of-f-prime, table-based and slope-field free response; no graphs in questions.' },
  calcbc: { mcq: 'computation', frq: [...CALC, 'Parametric, polar or vector functions', 'Series'], have: 4, gap: 'Same gaps as AB for graph and table questions.' },
  precalc: { mcq: 'computation', frq: ['Function concepts', 'Modeling a non-periodic context', 'Modeling a periodic context', 'Symbolic manipulations'], have: 2, gap: 'Function concepts (from graphs) and symbolic manipulation free response are missing.' },
  stats: { mcq: 'stimulus', frq: ['Exploring data', 'Collecting data', 'Probability and sampling distributions', 'Inference', 'Multi-focus question', 'Investigative task'], have: 2, gap: 'Real questions show graphs, tables and computer output; investigative task practice is missing.' },
  csp: { mcq: 'code', frq: ['Program design, function and purpose', 'Algorithm development', 'Errors and testing', 'Data and procedural abstraction'], have: 3, gap: 'Real exam includes reading-passage questions about computing innovations and multiple-select questions.' },
  csa: { mcq: 'code', frq: ['Methods and control structures', 'Class design', 'Data analysis with ArrayList', '2D array'], have: 3, gap: 'No 2D array free response yet.' },
  lang: { mcq: 'stimulus', frq: ['Synthesis essay', 'Rhetorical analysis essay', 'Argument essay'], have: 3, gap: 'Real reading sets are longer (about 5 passages, 23-25 questions); Stepwise has short passages.' },
  lit: { mcq: 'stimulus', frq: ['Poetry analysis', 'Prose fiction analysis', 'Literary argument'], have: 3, gap: 'Needs more and longer passages (the real exam has 5 passages of prose and poetry).' },
  apush: { mcq: 'stimulus', frq: HIST, have: 3, gap: 'Real multiple-choice comes in sets of 3-4 questions per primary or secondary source; Stepwise questions mostly stand alone.' },
  world: { mcq: 'stimulus', frq: HIST, have: 3, gap: 'Same as APUSH: source-based question sets are missing.' },
  euro: { mcq: 'stimulus', frq: HIST, have: 2, gap: 'No DBQ practice; multiple-choice is not source-based.' },
  aas: { mcq: 'stimulus', frq: ['Short-answer questions on sources', 'Document-based question'], have: 1, gap: 'No DBQ; real questions are built on texts, images and data from the diaspora.' },
  gov: { mcq: 'stimulus', frq: ['Concept application', 'Quantitative analysis', 'SCOTUS comparison', 'Argument essay'], have: 2, gap: 'Quantitative analysis (data/graph) and SCOTUS comparison free response are missing.' },
  compgov: { mcq: 'stimulus', frq: ['Conceptual analysis', 'Quantitative analysis', 'Comparative analysis', 'Argument essay'], have: 1, gap: 'Only comparative analysis is practiced; no data, no argument essay.' },
  hug: { mcq: 'stimulus', frq: ['No stimulus', 'One stimulus', 'Two stimuli'], have: 1, gap: 'Real questions use maps, photos and data; stimulus-based free response missing.' },
  psych: { mcq: 'stimulus', frq: ['Article analysis question (AAQ)', 'Evidence-based question (EBQ)'], have: 2, gap: 'Real multiple-choice uses many short scenarios and some data; the bank is small.' },
  macro: { mcq: 'stimulus', frq: ['Long free response (10 points)', 'Short free response (5 points)'], have: 1, gap: 'Graphs are described in words; no drawn graphs; short free response missing.' },
  micro: { mcq: 'stimulus', frq: ['Long free response (10 points)', 'Short free response (5 points)'], have: 1, gap: 'Same as Macro: graph-heavy questions are text-only; short free response missing.' },
  arthist: { mcq: 'media', frq: ['Long comparison essay', 'Long visual or contextual analysis', 'Visual analysis', 'Contextual analysis', 'Attribution', 'Continuity and change'], have: 1, gap: 'The real exam is image-based; Stepwise cannot show artworks, and 5 of 6 essay types are missing.' },
  spanish: { mcq: 'media', frq: LANG4, have: 2, gap: 'About half the real exam is listening and speaking, which Stepwise cannot do (no audio or microphone).' },
  french: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking not possible here; argumentative essay missing.' },
  german: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking not possible here; argumentative essay missing.' },
  italian: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking not possible here; argumentative essay missing.' },
  chinese: { mcq: 'media', frq: ASIA4, have: 1, gap: 'Listening and speaking not possible here; email response missing.' },
  japanese: { mcq: 'media', frq: ASIA4, have: 1, gap: 'Listening and speaking not possible here; story narration missing.' },
  latin: { mcq: 'stimulus', frq: ['Translation', 'Analytical essay', 'Short-answer set'], have: 1, gap: 'Only one translation; no analytical essay or short-answer sets; few syllabus passages.' },
  spanlit: { mcq: 'media', frq: ['Text explanation', 'Text and art comparison', 'Analysis of a single text', 'Text comparison'], have: 1, gap: 'Very small bank; required reading list mostly not covered; audio questions not possible.' },
  music: { mcq: 'media', frq: ['Melodic dictation', 'Harmonic dictation', 'Part-writing from Roman numerals', 'Part-writing from figured bass', 'Harmonization', 'Sight-singing'], have: 1, gap: 'Most of the real exam is aural (listening, dictation, sight-singing), which needs audio.' },
  seminar: { mcq: 'stimulus', frq: ['Argument analysis (short answer)', 'Evidence-based argument essay'], have: 2, gap: 'Performance tasks (team project, individual essay and presentations) are not practiced; the bank is small.' },
  research: { mcq: 'none', frq: ['Academic paper', 'Presentation and oral defense'], have: 1, gap: 'Only proposal writing is practiced; no presentation or defense practice.' },
  art2d: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced; the artwork itself is scored on images.' },
  art3d: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced.' },
  drawing: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced.' },
};

// Exactly which real free-response task types Stepwise practices (checked against the content files).
const ON = {
  phys1: ['Experimental design and analysis', 'Qualitative/quantitative translation'], phys2: [],
  physcm: ['Mathematical routines', 'Experimental design and analysis', 'Qualitative/quantitative translation'],
  physce: ['Mathematical routines', 'Translation between representations'],
  chem: ['Long free response (multi-part)', 'Short free response'],
  bio: ['Interpreting and evaluating experimental results', 'Conceptual analysis', 'Analyze data'],
  apes: ['Analyze an environmental problem and propose a solution', 'Same, with calculations'],
  calcab: ['Rate in/out and accumulation', 'Particle motion'],
  calcbc: ['Rate in/out and accumulation', 'Particle motion', 'Parametric, polar or vector functions', 'Series'],
  precalc: ['Modeling a non-periodic context', 'Modeling a periodic context'],
  stats: ['Collecting data', 'Inference'],
  csp: ['Program design, function and purpose', 'Errors and testing', 'Data and procedural abstraction'],
  csa: ['Methods and control structures', 'Class design', 'Data analysis with ArrayList'],
  lang: ['Synthesis essay', 'Rhetorical analysis essay', 'Argument essay'],
  lit: ['Poetry analysis', 'Prose fiction analysis', 'Literary argument'],
  apush: ['Short-answer questions', 'Document-based question', 'Long essay'],
  world: ['Short-answer questions', 'Document-based question', 'Long essay'],
  euro: ['Short-answer questions', 'Long essay'], aas: ['Short-answer questions on sources'],
  gov: ['Concept application', 'Argument essay'], compgov: ['Comparative analysis'], hug: ['No stimulus'],
  psych: ['Article analysis question (AAQ)', 'Evidence-based question (EBQ)'],
  macro: ['Long free response (10 points)'], micro: ['Long free response (10 points)'],
  arthist: ['Long visual or contextual analysis'],
  spanish: ['Email reply', 'Argumentative essay'], french: ['Email reply'], german: ['Email reply'], italian: ['Email reply'],
  chinese: ['Story narration'], japanese: ['Email response'], latin: ['Translation'], spanlit: ['Analysis of a single text'],
  music: ['Part-writing from Roman numerals'], seminar: ['Argument analysis (short answer)', 'Evidence-based argument essay'],
  research: ['Academic paper'],
  art2d: ['Sustained Investigation written responses', 'Selected Works written evidence'],
  art3d: ['Sustained Investigation written responses', 'Selected Works written evidence'],
  drawing: ['Sustained Investigation written responses', 'Selected Works written evidence'],
};

const rows = SW.courseList().map(c => {
  const o = OFFICIAL[c.id];
  if (!o) throw new Error('missing official data for ' + c.id);
  const on = ON[c.id];
  for (const t of on) if (!o.frq.includes(t)) throw new Error(`${c.id}: unknown task type ${t}`);
  o.have = on.length;
  o.frq = [...on, ...o.frq.filter(t => !on.includes(t))]; // practiced types first
  const gens = SW.problems.filter(p => SW.inCourse(p, c.id));
  const mcqs = SW.MCQ.filter(q => SW.inCourse(q, c.id));
  const frqs = SW.FRQ.filter(q => SW.inCourse(q, c.id));
  const units = c.unitIds.length;
  const covered = c.unitIds.filter(u => gens.some(p => p.unit === u) || mcqs.some(q => q.unit === u) || frqs.some(q => q.unit === u)).length;
  const stim = mcqs.filter(q => q.passage || q.code).length + gens.filter(p => /trace|loop|array|string|recursion|code/i.test(p.title)).length;
  const items = gens.length + mcqs.length + frqs.length;

  // Scores (0-1)
  const frqScore = o.have / o.frq.length;
  const unitScore = covered / units;
  let styleScore;
  if (o.mcq === 'computation') styleScore = Math.min(1, gens.length / (3 * units));
  else if (o.mcq === 'stimulus') styleScore = mcqs.length ? Math.min(1, mcqs.filter(q => q.passage).length / mcqs.length / 0.7) : 0;
  else if (o.mcq === 'code') styleScore = Math.min(1, stim / Math.max(1, mcqs.length + gens.length) / 0.6);
  else if (o.mcq === 'media') styleScore = Math.min(0.5, mcqs.filter(q => q.passage).length / Math.max(1, mcqs.length));
  else styleScore = 0.5; // no sit-down exam: only the written parts of the real task can be practiced here
  const volumeScore = Math.min(1, items / (15 * units));
  const score = Math.round(100 * (0.35 * frqScore + 0.2 * unitScore + 0.25 * styleScore + 0.2 * volumeScore));

  return {
    id: c.id, name: c.name, subject: c.subject, units, covered, gens: gens.length, mcqs: mcqs.length,
    stimulus: mcqs.filter(q => q.passage || q.code).length, frqs: frqs.length,
    frqTypes: o.frq, have: o.have, mcqStyle: o.mcq, format: c.format, gap: o.gap,
    parts: { frq: Math.round(frqScore * 100), units: Math.round(unitScore * 100), style: Math.round(styleScore * 100), volume: Math.round(volumeScore * 100) },
    score, dist: c.dist,
  };
});
process.stdout.write(JSON.stringify(rows, null, 1));
