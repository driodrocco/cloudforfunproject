/* AP Music Theory, AP Seminar, AP Research, and the AP Art and Design
 * portfolios (2-D, 3-D, Drawing). Research and the portfolios have no
 * sit-down exam, so they practice through rubric-graded written tasks. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { R, pick, W, add } = SW;

  // ======================= MUSIC THEORY =======================
  SW.defineCourse('music', {
    name: 'AP Music Theory', short: 'Music Theory', subject: 'Arts',
    units: [
      ['mu1', 1, 'Music Fundamentals I: Pitch, Major Scales and Key Signatures, Rhythm', '10-15%'],
      ['mu2', 2, 'Music Fundamentals II: Minor Scales, Intervals, Timbre', '10-15%'],
      ['mu3', 3, 'Music Fundamentals III: Triads and Seventh Chords', '10-15%'],
      ['mu4', 4, 'Harmony and Voice Leading I: Chord Function and Cadences', '10-15%'],
      ['mu5', 5, 'Harmony and Voice Leading II: Chord Progressions', '10-15%'],
      ['mu6', 6, 'Harmony and Voice Leading III: Embellishments and Motives', '10-15%'],
      ['mu7', 7, 'Harmony and Voice Leading IV: Secondary Function', '10-15%'],
      ['mu8', 8, 'Modes and Form', '5-10%'],
    ],
    format: '75 multiple-choice questions, many with recorded music (80 min, 45%) + 9 free-response questions: dictation, harmony writing and 2 sight-singing tasks (about 70 min, 55%). Unit weights are approximate.',
    dist: { year: 2025, 5: 18.8, 4: 18.0, 3: 23.7 },
    past: 'https://apcentral.collegeboard.org/courses/ap-music-theory/exam/past-exam-questions',
    khan: 'https://www.musictheory.net/lessons',
    calcLabel: 'Theory drills',
  });
  const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SHARP_KEYS = [['G', 1], ['D', 2], ['A', 3], ['E', 4], ['B', 5], ['F#', 6], ['C#', 7]];
  const FLAT_KEYS = [['F', 1], ['Bb', 2], ['Eb', 3], ['Ab', 4], ['Db', 5], ['Gb', 6], ['Cb', 7]];

  add('mu2', 'Half steps in an interval', () => {
    const a = R(0, 11, 1), b = R(0, 11, 1), steps = (b - a + 12) % 12 || 12;
    return W().l('Counting half steps', `${NOTES[a]} up to ${NOTES[b]}`, '').f('Count every key on the piano, black and white, from the lower note to the higher note')
      .l(`${NOTES[a]} -> ${NOTES[b]} = ${steps} half steps`).exact()
      .done(`How many half steps are there from ${NOTES[a]} up to the next ${NOTES[b]}${steps === 12 ? ' (an octave)' : ''}?`, steps, 'half steps');
  });
  add('mu2', 'Generic interval size', () => {
    const a = R(0, 6, 1), size = R(2, 8, 1), b = (a + size - 1) % 7;
    return W().l('Interval number', `${LETTERS[a]} up to ${LETTERS[b]}`, '').f('Count letter names, including both the bottom and the top note')
      .l(`${Array.from({ length: size }, (_, i) => LETTERS[(a + i) % 7]).join(', ')} = ${size} letters`, `interval = a ${size === 8 ? 'octave (8)' : size}`).exact()
      .done(`What is the generic interval size (2 = second, 3 = third, ...) from ${LETTERS[a]} up to the next ${LETTERS[b]}?`, size, '');
  });
  add('mu1', 'Key signature: sharps', () => {
    const [k, n] = pick(SHARP_KEYS);
    return W().l('Sharp keys', `${k} major`, '').f('Order of sharps: F C G D A E B. The major key is a half step above the last sharp.')
      .l(`${k} major has ${n} sharp${n > 1 ? 's' : ''}: ${'FCGDAEB'.slice(0, n).split('').map(x => x + '#').join(' ')}`).exact()
      .done(`How many sharps are in the key signature of ${k} major?`, n, 'sharps');
  });
  add('mu1', 'Key signature: flats', () => {
    const [k, n] = pick(FLAT_KEYS);
    return W().l('Flat keys', `${k} major`, '').f('Order of flats: B E A D G C F. The second-to-last flat names the key.')
      .l(`${k} major has ${n} flat${n > 1 ? 's' : ''}: ${'BEADGCF'.slice(0, n).split('').map(x => x + 'b').join(' ')}`).exact()
      .done(`How many flats are in the key signature of ${k} major?`, n, 'flats');
  });
  add('mu1', 'Scale degree', () => {
    const t = R(0, 6, 1), deg = R(1, 7, 1), note = LETTERS[(t + deg - 1) % 7];
    return W().l('Scale degrees', `key: ${LETTERS[t]} major`, `note: ${note} (letter name)`, '').f('Count up the scale letters from the tonic (degree 1)')
      .l(`${Array.from({ length: deg }, (_, i) => LETTERS[(t + i) % 7]).join(', ')}`, `${note} is scale degree ${deg}`).exact()
      .done(`In ${LETTERS[t]} major, which scale degree is the note with letter name ${note}?`, deg, '');
  });
  add('mu1', 'Rhythm: counting beats', () => {
    const counts = { whole: 4, 'dotted half': 3, half: 2, 'dotted quarter': 1.5, quarter: 1, eighth: 0.5 };
    const names = Object.keys(counts), notes = Array.from({ length: R(2, 4, 1) }, () => pick(names)), total = notes.reduce((s, n) => s + counts[n], 0);
    return W().l('Beats in 4/4', notes.join(' + '), '').f('In 4/4 a quarter note gets one beat; a dot adds half the note\'s value')
      .l(notes.map(n => `${n} = ${counts[n]}`).join(', '), `total = ${total} beats`).exact()
      .done(`In 4/4 time, how many beats do these notes last in total: ${notes.join(', ')}?`, total, 'beats');
  });

  SW.mcqs('mu1', [
    ['enharmonic', 'Which pair of notes is enharmonic?', ['C# and Db', 'C and D', 'E and F#', 'G and A'], 0, 'They sound the same but are spelled differently.'],
    ['compound meter', '6/8 time is:', ['Simple duple', 'Compound duple', 'Simple triple', 'Compound triple'], 1, 'Two dotted-quarter beats per measure, each divided in three.'],
  ]);
  SW.mcqs('mu2', [
    ['relative minor', 'The relative minor of C major is:', ['C minor', 'A minor', 'E minor', 'G minor'], 1, 'Same key signature (no sharps or flats), tonic a minor third below.'],
    ['harmonic minor', 'The harmonic minor scale raises which scale degree of natural minor?', ['3', '5', '6', '7'], 3, 'The raised 7th creates a leading tone.'],
    ['interval quality', 'C up to E-flat is a:', ['Major third', 'Minor third', 'Perfect fourth', 'Augmented second'], 1, 'Three half steps spelled as a third.'],
  ]);
  SW.mcqs('mu3', [
    ['triad quality', 'A triad with a major third and a perfect fifth above the root is:', ['Major', 'Minor', 'Diminished', 'Augmented'], 0, 'Example: C-E-G.'],
    ['diminished triad', 'In a major key, the triad built on scale degree 7 is:', ['Major', 'Minor', 'Diminished', 'Augmented'], 2, 'vii(dim): for C major, B-D-F.'],
    ['inversions', 'A triad with its third in the bass is in:', ['Root position', 'First inversion', 'Second inversion', 'Third inversion'], 1, 'Figured bass 6.'],
  ]);
  SW.mcqs('mu4', [
    ['cadences', 'A V-I cadence with both chords in root position and the tonic in the soprano is a:', ['Half cadence', 'Perfect authentic cadence', 'Plagal cadence', 'Deceptive cadence'], 1, 'The strongest ending in tonal music.'],
    ['deceptive cadence', 'A deceptive cadence most often moves:', ['V to I', 'IV to I', 'V to vi', 'I to V'], 2, 'The ear expects I but hears vi.'],
  ]);
  SW.mcqs('mu5', [
    ['parallel fifths', 'In four-part writing, which is usually forbidden?', ['Contrary motion', 'Parallel perfect fifths and octaves', 'Doubling the root', 'Oblique motion'], 1, 'They weaken the independence of the voices.'],
    ['predominant', 'Which chords usually have predominant function?', ['I and vi', 'ii and IV', 'V and vii(dim)', 'iii only'], 1, 'They lead toward the dominant.'],
  ]);
  SW.mcqs('mu6', [['nonchord tones', 'A note that moves by step from a chord tone and returns to the same chord tone is a:', ['Passing tone', 'Neighbor tone', 'Suspension', 'Anticipation'], 1, 'Upper or lower neighbor.']]);
  SW.mcqs('mu7', [['secondary dominant', 'In C major, V/V is:', ['G major', 'D major (D-F#-A)', 'A minor', 'F major'], 1, 'The dominant of G is D, with F# borrowed as a leading tone.']]);
  SW.mcqs('mu8', [
    ['modes', 'The Dorian mode is like natural minor but with a raised:', ['2nd', '4th', '6th', '7th'], 2, 'D Dorian uses the white keys from D to D.'],
    ['form', 'A piece with sections A B A is in:', ['Binary form', 'Ternary form', 'Strophic form', 'Rondo form'], 1, 'The return of A makes it ternary.'],
  ]);
  SW.frq('mu5', 'Harmony: spell a progression',
    'In D major, spell each chord of this progression from the bass up, using four voices (SATB). Write note names, and explain one voice-leading choice.\nI - IV - V7 - I',
    [[1, 'I spelled correctly (D-F#-A with a doubled D)'], [1, 'IV spelled correctly (G-B-D)'], [1, 'V7 spelled correctly (A-C#-E-G)'], [1, 'Final I correct, with the leading tone C# resolving up to D'], [1, 'Explains a valid voice-leading choice (common tones held, no parallel fifths/octaves, 7th of V7 resolves down)']],
    'I: D (bass), A, F#, D. IV: G, B, G, D (keep D as a common tone). V7: A, G, E, C# (G is the 7th). I: D, F#, D, D (C# resolves up to D; G resolves down to F#). The 7th of V7 (G) resolves down by step to F#, and the leading tone C# rises to the tonic D, avoiding parallel fifths.');
  SW.REF.music = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Key signatures</h4><table>
        <tr><td class="eqn">Sharps: F C G D A E B (G, D, A, E, B, F#, C# major)</td></tr>
        <tr><td class="eqn">Flats: B E A D G C F (F, Bb, Eb, Ab, Db, Gb, Cb major)</td></tr>
        <tr><td>Relative minor: down a minor third (3 half steps)</td></tr></table></div>
      <div class="ref-unit"><h4>Intervals (half steps)</h4><table>
        <tr><td class="eqn">m2 1, M2 2, m3 3, M3 4, P4 5, tritone 6, P5 7, m6 8, M6 9, m7 10, M7 11, P8 12</td></tr></table></div>
      <div class="ref-unit"><h4>Chords in a major key</h4><table>
        <tr><td class="eqn">I ii iii IV V vi vii(dim)</td></tr><tr><td>Tonic: I, vi. Predominant: ii, IV. Dominant: V, vii(dim).</td></tr>
        <tr><td>Figured bass: root 5/3, first inversion 6, second inversion 6/4; V7 inversions 6/5, 4/3, 4/2</td></tr></table></div>
      <div class="ref-unit"><h4>Voice leading rules</h4><table>
        <tr><td>No parallel 5ths or octaves; resolve the leading tone up and the chordal 7th down; keep common tones; avoid voice crossing; double the root in root-position triads</td></tr></table></div>
    </div>`;

  // ======================= AP SEMINAR =======================
  const BIG = [['Question and Explore', '20-30%'], ['Understand and Analyze', '20-30%'], ['Evaluate Multiple Perspectives', '15-25%'], ['Synthesize Ideas', '15-25%'], ['Team, Transform, and Transmit', '5-15%']];
  SW.defineCourse('seminar', {
    name: 'AP Seminar', short: 'Seminar', subject: 'Capstone',
    units: BIG.map(([n, w], i) => [`sem${i + 1}`, i + 1, n, w]),
    format: 'Team project and presentation (20%) + individual research-based essay and presentation (35%) + end-of-course exam (45%): 3 short-answer questions on an argument, and 1 evidence-based argument essay. Unit weights are approximate.',
    dist: { year: 2025, 5: 9.4, 4: 18.9, 3: 55.0 },
    past: 'https://apcentral.collegeboard.org/courses/ap-seminar/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/grammar',
  });
  SW.mcqs('sem2', [
    ['line of reasoning', 'An author\'s line of reasoning is:', ['The list of sources', 'The logical sequence of claims that leads to the conclusion', 'The title', 'The tone'], 1, 'How each claim builds toward the main argument.'],
    ['credibility', 'Which source is generally most credible for a claim about vaccine safety?', ['A personal blog', 'A peer-reviewed medical journal', 'A social media post', 'An anonymous forum'], 1, 'Peer review and expert authorship add credibility.'],
    ['evidence types', 'Statistics from a national survey are an example of:', ['Anecdotal evidence', 'Quantitative evidence', 'Expert opinion', 'A counterclaim'], 1, 'Numerical data.'],
  ]);
  SW.mcqs('sem3', [
    ['perspective', 'A "perspective" in AP Seminar is:', ['Just an opinion', 'A point of view shaped by a lens such as economic, ethical, or scientific', 'A fact', 'A source citation'], 1, 'Lenses help you see why people disagree.'],
    ['counterargument', 'Including a counterargument in your essay mainly:', ['Weakens your claim', 'Shows you have considered other views and strengthens your argument when you respond to it', 'Fills space', 'Confuses the reader'], 1, 'Concede, then rebut.'],
  ]);
  SW.frq('sem2', 'Exam part A: analyze an argument',
    'Read this short argument (written for practice):\n"Cities should replace grass lawns in public parks with native plants. Native plants need far less water, which matters as droughts grow longer. They also support local bees and butterflies, which pollinate crops. Some residents say lawns are better for sports, but most park visitors walk rather than play field games, so a few dedicated fields would be enough."\n(a) Identify the author\'s argument, main idea or thesis.\n(b) Explain the author\'s line of reasoning by identifying the claims used to build the argument and the connections between them.\n(c) Evaluate the effectiveness of the evidence the author uses to support the claims.',
    [[2, '(a) Accurately identifies the argument (cities should replace park lawns with native plants); 1 point if only partly accurate'], [3, '(b) Explains the line of reasoning: water savings, pollinator support, and rebuttal about sports, and how they connect; scaled for completeness'], [3, '(c) Evaluates evidence: notes it is mostly general claims without data or sources, weighs relevance and credibility; scaled for depth']],
    '(a) The author argues that cities should replace grass lawns in public parks with native plants.\n(b) The author first claims native plants save water, linking it to longer droughts; then claims they support pollinators that help crops, adding an ecological and economic reason; finally the author anticipates the objection about sports and rebuts it by saying most visitors walk, so a few fields would be enough.\n(c) The reasoning is logical, but the evidence is weak: there are no statistics on water use, no sources on pollinator benefits, and the claim that "most visitors walk" is unsupported. Adding data from a city water department or a park-use survey would make it more convincing.');
  SW.frq('sem4', 'Exam part B: evidence-based argument essay',
    'Theme: "Technology and attention." Write an argument essay that identifies a research question related to this theme, presents a clear position, and supports it with evidence. Use at least two perspectives (for example educational, psychological, economic, ethical). Since this is practice, you may use evidence you know, but name the source type for each piece.',
    [[2, 'Research question and thesis: clear, specific, arguable'], [3, 'Uses relevant evidence from multiple sources and explains it'], [2, 'Considers and responds to different perspectives'], [2, 'Clear line of reasoning and organization'], [1, 'Style and conventions appropriate for an academic audience']],
    'A strong essay asks a focused question (for example, "Should high schools ban phones during class?"), takes a clear position, uses specific evidence (a study on test scores after phone bans, a teacher survey, an economic argument about learning time), weighs an opposing perspective (student safety or digital learning tools) and responds to it, and ends with a conclusion that reflects on implications.');
  SW.REF.seminar = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>QUEST framework</h4><table>
        <tr><td><b>Q</b>uestion and explore; <b>U</b>nderstand and analyze arguments; <b>E</b>valuate multiple perspectives; <b>S</b>ynthesize ideas; <b>T</b>eam, transform and transmit</td></tr></table></div>
      <div class="ref-unit"><h4>Analyzing an argument</h4><table>
        <tr><td>Claim, reasoning, evidence (type, relevance, credibility), assumptions, implications, counterclaims</td></tr>
        <tr><td>Lenses: cultural, economic, environmental, ethical, historical, political, scientific, social</td></tr></table></div>
    </div>`;

  // ======================= AP RESEARCH =======================
  SW.defineCourse('research', {
    name: 'AP Research', short: 'Research', subject: 'Capstone',
    units: BIG.map(([n, w], i) => [`res${i + 1}`, i + 1, n, w]),
    format: 'No sit-down exam. Academic paper of 4,000-5,000 words (75%) + presentation and oral defense (25%).',
    dist: { year: 2025, 5: 14.8, 4: 28.1, 3: 45.6 },
    past: 'https://apcentral.collegeboard.org/courses/ap-research',
    khan: 'https://www.khanacademy.org/math/statistics-probability/designing-studies',
    noExam: true,
  });
  SW.mcqs('res1', [
    ['research question', 'Which is the strongest research question?', ['Is social media bad?', 'How does daily time on short-video apps relate to self-reported sleep quality among 10th graders at one high school?', 'Why do people use phones?', 'What is technology?'], 1, 'It is specific, measurable and narrow enough to study.'],
    ['gap', 'A "gap" in the literature is:', ['A missing page', 'Something existing research has not yet answered', 'A citation error', 'A short paper'], 1, 'Your study should aim to fill one.'],
  ]);
  SW.mcqs('res2', [
    ['method', 'Interviews and open-ended surveys produce mainly:', ['Quantitative data', 'Qualitative data', 'Experimental data', 'No data'], 1, 'Words and themes rather than numbers.'],
    ['irb', 'Why does research with human participants need review (for example, by an IRB)?', ['To check grammar', 'To protect participants\' rights and safety', 'To make it longer', 'To pick the topic'], 1, 'Informed consent and minimizing harm.'],
  ]);
  SW.frq('res1', 'Research proposal: question and method',
    'Write a short research proposal (about 250 words) for a study you could actually do as a high school student.\n(a) State a focused research question.\n(b) Summarize what is already known about the topic and identify a gap.\n(c) Describe your method (who, what data, how you will collect and analyze it) and explain why it fits your question.\n(d) Identify one limitation and one ethical consideration.',
    [[2, '(a) Focused, researchable question (specific population, variables or phenomenon)'], [2, '(b) Summarizes prior work and identifies a credible gap'], [3, '(c) Method aligned with the question, with clear data collection and analysis'], [1, '(d) Realistic limitation'], [1, '(d) Relevant ethical consideration (consent, anonymity, minors)']],
    'Question: Among 9th graders at my school, is there a relationship between participation in team sports and self-reported stress during exam week? Prior work: studies of college students link exercise to lower stress, but few look at high school team sports specifically during high-stress periods. Method: an anonymous survey of 9th graders using a validated short stress scale plus questions on sports participation, given during exam week; compare mean stress scores with a t-test. Limitation: self-reported data and one school limit generalization. Ethics: get parental consent for minors and keep responses anonymous.');
  SW.REF.research = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Paper structure</h4><table>
        <tr><td>Introduction and literature review; method; results; discussion, conclusion and future directions; bibliography</td></tr></table></div>
      <div class="ref-unit"><h4>Methods</h4><table>
        <tr><td>Experimental, correlational, survey, interview, content analysis, case study, meta-analysis, philosophical or artistic inquiry</td></tr>
        <tr><td>Always justify why your method answers your question</td></tr></table></div>
    </div>`;

  // ======================= AP ART AND DESIGN =======================
  const ARTFORMAT = 'No sit-down exam. Portfolio: Selected Works, 5 works with written evidence of ideas, materials and processes (40%) + Sustained Investigation, 15 images with written responses about inquiry, practice, experimentation and revision (60%).';
  const artCourse = (id, name, short, d, skill) => {
    SW.defineCourse(id, {
      name, short, subject: 'Arts',
      units: [[`${id}1`, 1, 'Sustained Investigation', '60%'], [`${id}2`, 2, 'Selected Works', '40%']],
      format: ARTFORMAT, dist: d,
      past: 'https://apcentral.collegeboard.org/courses/ap-art-and-design-program',
      khan: 'https://www.khanacademy.org/humanities/art-history-basics',
      noExam: true,
    });
    SW.mcqs(`${id}1`, [
      ['inquiry', 'A strong sustained investigation is guided by:', ['A single finished piece', 'An inquiry (question) explored through practice, experimentation and revision', 'Copying a famous artist', 'Using as many materials as possible'], 1, 'Readers look for growth over time driven by a question.'],
      ['revision', 'Which best shows "revision" in a sustained investigation?', ['Making 15 identical works', 'Showing how feedback or a failed attempt led to a changed approach in later work', 'Erasing mistakes', 'Changing the topic each time'], 1, 'Document what you changed and why.'],
    ]);
    SW.mcqs(`${id}2`, [
      ['principles of design', 'Which is a principle of design (not an element)?', ['Line', 'Color', 'Balance', 'Texture'], 2, 'Elements: line, shape, form, color, value, texture, space. Principles: balance, emphasis, contrast, rhythm, unity, movement, proportion.'],
      ['written evidence', 'Selected Works written evidence should identify:', ['Your favorite artist only', 'The ideas, materials and processes used in each work', 'The price of the work', 'Your grade'], 1, 'Be specific and concise.'],
      ['skill', `In ${short}, "${skill}" is assessed through:`, ['A multiple-choice exam', 'Visual evidence across your portfolio', 'An interview', 'A timed drawing on exam day'], 1, 'There is no sit-down exam.'],
    ]);
    SW.frq(`${id}1`, 'Sustained Investigation: inquiry statement',
      'Write the written responses for your Sustained Investigation (draft them for a real or planned body of work).\n(a) Identify the questions that guided your sustained investigation (up to 600 characters).\n(b) Describe how your investigation shows evidence of practice, experimentation and revision guided by your questions (up to 600 characters).',
      [[2, '(a) A clear, specific inquiry that could guide 15 works'], [2, '(b) Describes practice and experimentation with specific materials, processes or ideas'], [2, '(b) Describes revision: how and why the work changed'], [1, 'Stays within the character limits and connects writing to the visual work']],
      '(a) How can I show the passage of time in my family\'s kitchen through layered imagery? I asked how memory distorts familiar spaces.\n(b) I began with observational drawings of the kitchen, then experimented with layering transparent prints and collage of old recipe cards. Feedback that early pieces felt flat led me to add cut-paper depth and to repeat one object, my grandmother\'s kettle, across works so that change over time would read clearly.');
    SW.frq(`${id}2`, 'Selected Works: written evidence',
      'For one of your Selected Works, write the required written evidence.\n(a) Ideas visually evident (up to 100 characters).\n(b) Materials used (up to 100 characters).\n(c) Processes used (up to 100 characters).',
      [[1, '(a) Specific idea that a viewer can see in the work'], [1, '(b) Specific materials'], [1, '(c) Specific processes'], [1, 'Concise and within the character limits']],
      '(a) Isolation in a crowded city, shown by one bright figure in a gray crowd.\n(b) Charcoal, white chalk and red acrylic on toned paper.\n(c) Blending, erasure for highlights, and a single layer of paint for focus.');
    SW.REF[id] = () => `
      <div class="ref-grid">
        <div class="ref-unit"><h4>Portfolio</h4><table>
          <tr><td><b>Sustained Investigation (60%):</b> 15 images. Inquiry, practice, experimentation, revision, and synthesis of materials, processes and ideas.</td></tr>
          <tr><td><b>Selected Works (40%):</b> 5 works showing ${skill}, each with ideas, materials and processes written evidence (100 characters each).</td></tr></table></div>
        <div class="ref-unit"><h4>Elements and principles</h4><table>
          <tr><td><b>Elements:</b> line, shape, form, color, value, texture, space</td></tr>
          <tr><td><b>Principles:</b> balance, contrast, emphasis, movement, pattern, rhythm, unity, variety, proportion, scale</td></tr></table></div>
      </div>`;
  };
  artCourse('art2d', 'AP 2-D Art and Design', '2-D Art and Design', { year: 2025, 5: 11.9, 4: 29.3, 3: 41.8 }, '2-D design skills (composition, color, typography, photography or digital media)');
  artCourse('art3d', 'AP 3-D Art and Design', '3-D Art and Design', { year: 2025, 5: 6.7, 4: 24.9, 3: 39.9 }, '3-D design skills (form, space, mass, volume and materials)');
  artCourse('drawing', 'AP Drawing', 'Drawing', { year: 2025, 5: 17.1, 4: 31.5, 3: 35.6 }, 'drawing skills (mark-making, line, value, surface and space)');
})();
