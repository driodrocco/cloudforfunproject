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
  phys1: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Diagrams in concept questions are still few; many are described in words.' },
  phys2: { mcq: 'computation', frq: PHYS, have: 0, gap: 'Circuit and ray diagrams are described in words rather than drawn.' },
  physcm: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Force and motion diagrams are mostly described in words.' },
  physce: { mcq: 'computation', frq: PHYS, have: 2, gap: 'Field and circuit diagrams are described in words rather than drawn.' },
  chem: { mcq: 'stimulus', frq: ['Long free response (multi-part)', 'Short free response'], have: 2, gap: 'Particle diagrams and PES spectra are not drawn; most concept questions are text-only.' },
  bio: { mcq: 'stimulus', frq: ['Interpreting and evaluating experimental results', 'Experimental results with graphing', 'Scientific investigation', 'Conceptual analysis', 'Analyze a model or visual representation', 'Analyze data'], have: 3, gap: 'Most concept questions are still text-only; real questions are mostly data and figures.' },
  apes: { mcq: 'stimulus', frq: ['Design an investigation', 'Analyze an environmental problem and propose a solution', 'Same, with calculations'], have: 2, gap: 'Most concept questions are text-only; real ones use maps, graphs and data tables.' },
  calcab: { mcq: 'computation', frq: CALC, have: 2, gap: 'No built-in graphing calculator for the calculator sections.' },
  calcbc: { mcq: 'computation', frq: [...CALC, 'Parametric, polar or vector functions', 'Series'], have: 4, gap: 'No built-in graphing calculator for the calculator sections.' },
  precalc: { mcq: 'computation', frq: ['Function concepts', 'Modeling a non-periodic context', 'Modeling a periodic context', 'Symbolic manipulations'], have: 2, gap: 'No built-in graphing calculator; few graph-reading multiple-choice questions.' },
  stats: { mcq: 'stimulus', frq: ['Exploring data', 'Collecting data', 'Probability and sampling distributions', 'Inference', 'Multi-focus question', 'Investigative task'], have: 2, gap: 'Real questions show more graphs and computer output than the bank has so far.' },
  csp: { mcq: 'code', frq: ['Program design, function and purpose', 'Algorithm development', 'Errors and testing', 'Data and procedural abstraction'], have: 3, gap: 'Real exam includes reading-passage questions about computing innovations and multiple-select questions.' },
  csa: { mcq: 'code', frq: ['Methods and control structures', 'Class design', 'Data analysis with ArrayList', '2D array'], have: 3, gap: 'The bank is small compared with AP Classroom.' },
  lang: { mcq: 'stimulus', frq: ['Synthesis essay', 'Rhetorical analysis essay', 'Argument essay'], have: 3, gap: 'Real reading sets are longer (about 5 passages, 23-25 questions); Stepwise passages are short.' },
  lit: { mcq: 'stimulus', frq: ['Poetry analysis', 'Prose fiction analysis', 'Literary argument'], have: 3, gap: 'Needs more and longer passages (the real exam has 5 passages of prose and poetry).' },
  apush: { mcq: 'stimulus', frq: HIST, have: 3, gap: 'Real source sets also use images, maps and political cartoons; Stepwise sets use text excerpts and tables.' },
  world: { mcq: 'stimulus', frq: HIST, have: 3, gap: 'Real source sets also use images, maps and political cartoons; Stepwise sets use text excerpts and tables.' },
  euro: { mcq: 'stimulus', frq: HIST, have: 2, gap: 'Real source sets also use images, maps and political cartoons; Stepwise sets use text excerpts and tables.' },
  aas: { mcq: 'stimulus', frq: ['Short-answer questions on sources', 'Document-based question'], have: 1, gap: 'Real questions use images, art and data from the diaspora; Stepwise uses text excerpts and tables.' },
  gov: { mcq: 'stimulus', frq: ['Concept application', 'Quantitative analysis', 'SCOTUS comparison', 'Argument essay'], have: 2, gap: 'More data-based multiple-choice sets (charts, maps) are needed.' },
  compgov: { mcq: 'stimulus', frq: ['Conceptual analysis', 'Quantitative analysis', 'Comparative analysis', 'Argument essay'], have: 1, gap: 'The bank is still small; more data sets on the six course countries are needed.' },
  hug: { mcq: 'stimulus', frq: ['No stimulus', 'One stimulus', 'Two stimuli'], have: 1, gap: 'Real questions use maps and photos; Stepwise uses tables, charts and written model descriptions.' },
  psych: { mcq: 'stimulus', frq: ['Article analysis question (AAQ)', 'Evidence-based question (EBQ)'], have: 2, gap: 'More data-based scenario questions would help; the bank is small.' },
  macro: { mcq: 'stimulus', frq: ['Long free response (10 points)', 'Short free response (5 points)'], have: 1, gap: 'Most concept questions are still text-only; real ones are mostly graphs.' },
  micro: { mcq: 'stimulus', frq: ['Long free response (10 points)', 'Short free response (5 points)'], have: 1, gap: 'Most concept questions are still text-only; real ones are mostly graphs.' },
  arthist: { mcq: 'media', frq: ['Long comparison essay', 'Long visual or contextual analysis', 'Visual analysis', 'Contextual analysis', 'Attribution', 'Continuity and change'], have: 1, gap: 'The real exam is built on images; Stepwise describes works in words and links to images on Khan Academy.' },
  spanish: { mcq: 'media', frq: LANG4, have: 2, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  french: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  german: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  italian: { mcq: 'media', frq: LANG4, have: 1, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  chinese: { mcq: 'media', frq: ASIA4, have: 1, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  japanese: { mcq: 'media', frq: ASIA4, have: 1, gap: 'Listening and speaking can only be practiced in writing, with prompts read aloud by the browser; there is no real audio or recording.' },
  latin: { mcq: 'stimulus', frq: ['Translation', 'Analytical essay', 'Short-answer set'], have: 1, gap: 'Few syllabus passages; more Vergil and Caesar sets are needed.' },
  spanlit: { mcq: 'media', frq: ['Text explanation', 'Text and art comparison', 'Analysis of a single text', 'Text comparison'], have: 1, gap: 'Bank is small; audio questions are not possible; many required works are not yet covered.' },
  music: { mcq: 'media', frq: ['Melodic dictation', 'Harmonic dictation', 'Part-writing from Roman numerals', 'Part-writing from figured bass', 'Harmonization', 'Sight-singing'], have: 1, gap: 'Aural multiple choice (recorded excerpts) is not possible; dictation uses simple generated tones.' },
  seminar: { mcq: 'stimulus', frq: ['Argument analysis (short answer)', 'Evidence-based argument essay'], have: 2, gap: 'Performance tasks (team project, individual essay and presentations) can only be outlined in writing.' },
  research: { mcq: 'none', frq: ['Academic paper', 'Presentation and oral defense'], have: 1, gap: 'The presentation and oral defense can only be practiced in writing.' },
  art2d: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced; the artwork itself is scored on images.' },
  art3d: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced; the artwork itself is scored on images.' },
  drawing: { mcq: 'none', frq: ['Sustained Investigation written responses', 'Selected Works written evidence'], have: 2, gap: 'Only the written parts can be practiced; the artwork itself is scored on images.' },
};

// Which real free-response task types Stepwise practices (checked against the content files).
// Every type now has at least one question. Types in PARTIAL can only be practiced
// in a limited way (spoken tasks answered in writing, sight-singing self-checked),
// so they count half.
const ON = Object.fromEntries(Object.entries(OFFICIAL).map(([id, o]) => [id, o.frq.slice()]));
const PARTIAL = new Set(['Conversation (spoken)', 'Cultural comparison (spoken)', 'Cultural presentation (spoken)', 'Sight-singing', 'Presentation and oral defense']);

const rows = SW.courseList().map(c => {
  const o = OFFICIAL[c.id];
  if (!o) throw new Error('missing official data for ' + c.id);
  const on = ON[c.id];
  for (const t of on) if (!o.frq.includes(t)) throw new Error(`${c.id}: unknown task type ${t}`);
  o.partial = on.filter(t => PARTIAL.has(t));
  o.have = on.length;
  o.frq = [...on, ...o.frq.filter(t => !on.includes(t))]; // practiced types first
  const gens = SW.problems.filter(p => SW.inCourse(p, c.id));
  const mcqs = SW.MCQ.filter(q => SW.inCourse(q, c.id));
  const frqs = SW.FRQ.filter(q => SW.inCourse(q, c.id));
  const units = c.unitIds.length;
  const covered = c.unitIds.filter(u => gens.some(p => p.unit === u) || mcqs.some(q => q.unit === u) || frqs.some(q => q.unit === u)).length;
  const stim = mcqs.filter(q => q.passage || q.code).length + gens.filter(p => /trace|loop|array|string|recursion|code/i.test(p.title)).length;
  // A generated data set yields new numbers every time; count it as the questions one copy holds.
  const mcqItems = mcqs.reduce((n, q) => n + (q.setGen ? SW.materialize(q).length : 1), 0);
  const items = gens.length + mcqItems + frqs.length;
  const isStim = q => q.passage || q.figure || q.setGen;

  // Scores (0-1)
  const frqScore = (o.have - o.partial.length / 2) / o.frq.length;
  const unitScore = covered / units;
  let styleScore;
  if (o.mcq === 'computation') styleScore = Math.min(1, gens.length / (3 * units));
  else if (o.mcq === 'stimulus') styleScore = mcqs.length ? Math.min(1, mcqs.filter(isStim).length / mcqs.length / 0.7) : 0;
  else if (o.mcq === 'code') styleScore = Math.min(1, stim / Math.max(1, mcqs.length + gens.length) / 0.6);
  else if (o.mcq === 'media') styleScore = Math.min(0.5, mcqs.filter(isStim).length / Math.max(1, mcqs.length));
  else styleScore = 0.5; // no sit-down exam: only the written parts of the real task can be practiced here
  const volumeScore = Math.min(1, items / (15 * units));
  const score = Math.round(100 * (0.35 * frqScore + 0.2 * unitScore + 0.25 * styleScore + 0.2 * volumeScore));

  return {
    id: c.id, name: c.name, subject: c.subject, units, covered, gens: gens.length, mcqs: mcqItems,
    stimulus: mcqs.reduce((n, q) => n + (q.setGen ? SW.materialize(q).length : (q.passage || q.figure || q.code) ? 1 : 0), 0), frqs: frqs.length,
    partial: o.partial,
    frqTypes: o.frq, have: o.have, mcqStyle: o.mcq, format: c.format, gap: o.gap,
    parts: { frq: Math.round(frqScore * 100), units: Math.round(unitScore * 100), style: Math.round(styleScore * 100), volume: Math.round(volumeScore * 100) },
    score, dist: c.dist,
  };
});
process.stdout.write(JSON.stringify(rows, null, 1));
