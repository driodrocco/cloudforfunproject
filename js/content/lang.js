/* AP English Language and Composition: passage-based reading and writing
 * questions (original passages), the three essays with the 6-point rubric,
 * and a reference sheet of rhetorical terms. */
(function () {
  'use strict';
  const SW = globalThis.SW;

  SW.defineCourse('lang', {
    name: 'AP English Language', short: 'Eng Lang', subject: 'English',
    units: [
      ['lang1', 1, 'Rhetorical Situation', '22-28%'],
      ['lang2', 2, 'Claims and Evidence', '24-30%'],
      ['lang3', 3, 'Reasoning and Organization', '24-30%'],
      ['lang4', 4, 'Style', '22-28%'],
    ],
    format: '45 multiple-choice questions on reading and revising passages (60 min, 45%) + 3 essays: synthesis, rhetorical analysis, argument (2 hr 15 min, 55%). Unit weights here are the skill areas of the multiple-choice section.',
    dist: { year: 2025, 5: 13.4, 4: 28.0, 3: 32.8 },
    past: 'https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/ap-english-language',
    cut: [72, 58, 42, 28],
  });

  // ---------- reading passages (original, written for practice) ----------
  SW.passage('lang1', `The following passage is from a speech given by a city librarian to the town council in a year when the library's budget was set to be cut.

I am not here to ask you for money. I am here to tell you who you would be taking it from. On Tuesday afternoons, our children's room holds forty kids whose parents work until six. On Thursday mornings, a retired machinist named Ray teaches three strangers to read the manual for the job they just started. On any given night, the only warm, quiet, free place in this town with an outlet and the internet is my building. You will vote on a number. I am asking you to remember that every number has a face.`, [
    ['purpose', "The speaker's main purpose is to:", ['Ask the council to raise taxes', 'Persuade the council not to cut the library budget by showing who depends on it', 'Describe the history of the library', 'Criticize the council members personally'], 1, 'Every example shows a real person who would lose something if the budget were cut.'],
    ['audience', 'The opening sentence ("I am not here to ask you for money") most likely works to:', ['Confuse the audience', 'Lower the council\'s defenses before making the case', 'Show the library has enough money', 'Change the subject'], 1, 'It disarms listeners who expect a request and gets them to listen to the stories first.'],
    ['appeal', 'The details about Ray and the forty children mainly appeal to:', ['Logos, through statistics', 'Pathos, through specific human examples', 'Ethos, through the speaker\'s credentials', 'Kairos, through a deadline'], 1, 'Concrete, human details make the audience feel the cost.'],
  ]);

  SW.passage('lang2', `The following paragraph is from an op-ed about school start times.

Teenagers are not lazy; they are on a different clock. During puberty, the body releases melatonin, the hormone that signals sleep, about two hours later than it does in children and adults. A student who falls asleep at 11:30 p.m. and wakes at 6:00 a.m. is not undisciplined. That student is short on sleep by the measure of every major medical group. Districts that moved their first bell to 8:30 have reported fewer car crashes involving teen drivers and higher attendance in first period. If we want students in their seats and awake, we should stop asking their bodies to do something they cannot.`, [
    ['claim', 'Which sentence best states the writer\'s main claim?', ['"Teenagers are not lazy; they are on a different clock."', '"During puberty, the body releases melatonin..."', 'Schools should start later so students can get enough sleep', '"Districts ... reported fewer car crashes"'], 2, 'The opening sentence sets it up, but the full claim is the call to action at the end: change start times.'],
    ['evidence', 'The information about melatonin functions mainly as:', ['A counterargument', 'Scientific evidence explaining why teens sleep later', 'An emotional appeal', 'A personal anecdote'], 1, 'It gives a biological cause for the behavior the writer is defending.'],
    ['counterargument', 'Which claim does the writer implicitly argue AGAINST?', ['Teenagers need less sleep than children', 'Teens sleep late because they lack discipline', 'Medical groups support later start times', 'Car crashes are common'], 1, '"Teenagers are not lazy" and "is not undisciplined" answer that assumption directly.'],
  ]);

  SW.passage('lang3', `The following passage is from an essay about learning to cook.

My grandmother never measured anything. "Until it looks right," she would say, which is not an instruction so much as a dare. For years I thought this was her way of keeping secrets. Then I spent a winter making her bread badly, again and again, and I began to understand that "looks right" was the most precise instruction she could give. Dough on a humid day needs less water than dough in January. A cup of flour packed down is not the same as a cup sifted. Recipes pretend the world holds still. My grandmother had simply stopped pretending.`, [
    ['organization', 'The passage is organized mainly by:', ['Comparing two recipes', 'Moving from a misunderstanding to a realization', 'Listing steps in a process', 'Arguing against cookbooks with statistics'], 1, 'The writer first thinks it is secrecy, then learns it is precision.'],
    ['line of reasoning', 'The examples about humid days and packed flour support the idea that:', ['Bread is hard to make', 'Measurements alone cannot account for changing conditions', 'The grandmother was careless', 'January is a bad month for baking'], 1, 'They show why a fixed recipe fails when conditions change.'],
    ['transition', 'The word "Then" in the fourth sentence marks a shift from:', ['Past to present tense', 'The writer\'s early assumption to what experience taught them', 'Cooking to gardening', 'Narration to argument against the grandmother'], 1, 'It is the turning point of the passage.'],
  ]);

  SW.passage('lang4', `The following sentences are from a nature essay.

The river does not hurry, and it does not wait. It has been carving this canyon for longer than there have been eyes to watch it, one grain at a time, with the patience of something that has never once doubted it would finish. We stand at the rim with our cameras and our schedules, as if we could hold it still long enough to understand it.`, [
    ['figurative language', 'The phrase "the patience of something that has never once doubted it would finish" is an example of:', ['Personification', 'Hyperbole', 'Understatement', 'Alliteration'], 0, 'It gives the river a human quality: confidence.'],
    ['contrast', 'The final sentence creates a contrast between:', ['The river\'s timelessness and human hurry', 'Two different rivers', 'Photography and painting', 'Morning and evening'], 0, 'Cameras and schedules represent our short, busy time next to the river\'s endless work.'],
    ['syntax', 'The first sentence uses parallel structure ("does not hurry, and it does not wait") mainly to:', ['Create a balanced, steady rhythm that mirrors the river', 'Show the river is confused', 'List the river\'s features', 'Introduce a counterargument'], 0, 'The even rhythm imitates the river\'s constant pace.'],
  ]);

  // ---------- writing / revision questions ----------
  SW.passage('lang3', `The following is a student's draft paragraph.

(1) Community gardens do more than grow food. (2) In our neighborhood, the garden on Elm Street turned an empty lot into a place where neighbors meet every weekend. (3) Tomatoes need at least six hours of sun a day. (4) Older residents teach younger ones how to plant, and families who never spoke now trade recipes. (5) A garden, in other words, can grow a community.`, [
    ['revision cohesion', 'Which sentence should be deleted to improve the focus of the paragraph?', ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'], 2, 'Sunlight needs for tomatoes do not support the claim about building community.'],
    ['revision conclusion', 'The writer is considering removing sentence 5. Should it be kept?', ['Yes, it restates the claim in a memorable way that ties the paragraph together', 'Yes, because it adds new evidence', 'No, because it contradicts sentence 1', 'No, because it is too informal'], 0, 'It echoes "do more than grow food" and wraps up the point.'],
  ]);
  SW.passage('lang2', `The following is a student's draft paragraph.

(1) Banning phones in class has helped students focus. (2) At Lincoln High, teachers reported fewer interruptions in the first month of the ban. (3) ________ (4) Some students argue they need phones for emergencies, but the office phone is available at all times.`, [
    ['revision evidence', 'Which sentence, placed at (3), would best support the writer\'s claim?', ['Phones were invented in the 1970s.', 'Average quiz scores in ninth grade rose 7 percent compared with the semester before.', 'Many students like their phones.', 'The principal has worked at the school for ten years.'], 1, 'It gives specific, relevant evidence that focus improved.'],
    ['revision counterargument', 'Sentence 4 mainly serves to:', ['Introduce and respond to a counterargument', 'Provide a new claim', 'Offer a personal anecdote', 'Define a key term'], 0, 'It raises an objection (emergencies) and answers it.'],
  ]);

  // ---------- standalone terms ----------
  SW.mcqs('lang1', [
    ['exigence', 'In rhetoric, the "exigence" is:', ['The speaker\'s credibility', 'The problem or event that prompts the writer to write', 'The main claim', 'The concluding appeal'], 1, 'It is the "why now" behind the text.'],
    ['ethos', 'A speaker who mentions her 20 years as an ER nurse before discussing hospital staffing is building:', ['Pathos', 'Logos', 'Ethos', 'Irony'], 2, 'Her experience makes her credible on the topic.'],
  ]);
  SW.mcqs('lang4', [
    ['anaphora', 'Repeating the same words at the start of successive clauses ("We shall fight... we shall fight...") is:', ['Anaphora', 'Antithesis', 'Asyndeton', 'Chiasmus'], 0, 'Repetition at the beginning builds intensity.'],
    ['diction tone', 'A writer describes a policy as "reckless" instead of "risky." This word choice makes the tone:', ['More neutral', 'More critical', 'More humorous', 'More uncertain'], 1, '"Reckless" adds blame that "risky" does not.'],
  ]);

  // ---------- essays (6-point rubric) ----------
  const rubric = sources => [
    [1, `Row A, Thesis (0-1): responds to the prompt with a defensible thesis that takes a position${sources ? '' : ' or analyzes the writer\'s choices'}`],
    [4, `Row B, Evidence and commentary (0-4): 4 = specific evidence ${sources ? 'from at least three sources ' : ''}that consistently supports a line of reasoning AND commentary that explains how each piece supports it; 3 = specific evidence and explains how some of it supports the reasoning; 2 = some relevant evidence with limited explanation; 1 = mostly summary or general evidence; 0 = no relevant evidence`],
    [1, 'Row C, Sophistication (0-1): shows complex understanding (nuance, tensions, broader implications, or a vivid, persuasive style throughout)'],
  ];

  SW.frq('lang2', 'Synthesis essay: four-day school week',
    'Some school districts have moved to a four-day school week, with longer days, to save money and attract teachers.\n\nRead the sources above (written for practice). Then write an essay that develops your position on whether school districts should adopt a four-day week. Use evidence from at least three of the sources. Cite them as (Source A), (Source B) and so on.',
    rubric(true),
    'Sample high-scoring approach: Thesis: districts should adopt a four-day week only where they fund a fifth-day option for families who need it, because the savings and teacher retention are real but should not be paid for by working parents. Body 1 uses Source A (teacher recruitment) and Source C (attendance) to show benefits, explaining why morale matters for learning. Body 2 uses Source B (childcare costs) to show who carries the cost, explaining the equity problem. Body 3 uses Source D (mixed test score results) to argue the academic case is unproven, so the decision should rest on community needs. Sophistication: acknowledges the tension between budget pressure and family burden, and proposes a condition rather than a simple yes/no.',
    null,
    `Source A (district survey summary): After switching to a four-day week, a rural district reported that teacher applications rose by about half, and that teachers cited the extra day for planning and rest as the main reason.
Source B (parent interview): "I work Monday to Friday. The fifth day means paying for childcare I can't really afford, or leaving my nine-year-old home alone."
Source C (attendance report): Districts using four-day weeks reported that more medical appointments were scheduled on the off day, and student absences on school days fell slightly.
Source D (research summary): Studies of four-day weeks show mixed results. Some found small drops in math scores, especially in districts without enrichment programs on the fifth day; others found no difference.`);

  SW.frq('lang1', 'Rhetorical analysis: the Gettysburg Address',
    'On November 19, 1863, President Abraham Lincoln spoke at the dedication of a national cemetery at Gettysburg, Pennsylvania, months after a battle there killed thousands of soldiers. Read the speech above carefully. Write an essay that analyzes the rhetorical choices Lincoln makes to convey his message about the purpose of the war to his audience.',
    rubric(false),
    'Sample high-scoring approach: Thesis: Lincoln reframes a funeral into a call to action, using a shift from past to present to future and the repeated idea of "dedication" to move his audience from mourning the dead to finishing their work. Body 1: the opening "Four score and seven years ago" ties the war to the nation\'s founding ideal of equality, giving the deaths a larger meaning. Body 2: the turn "But, in a larger sense, we can not dedicate" uses repetition (dedicate, consecrate, hallow) to admit that words are smaller than sacrifice, which humbles the living. Body 3: the final long sentence piles up dashes and parallel clauses ("of the people, by the people, for the people") so the speech ends on a forward-looking, collective promise. Sophistication: notes the irony that Lincoln claims "the world will little note" his words while crafting a speech meant to be remembered.',
    null,
    `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.
Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.
But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.`);

  SW.frq('lang3', 'Argument essay: the value of failure',
    'Many people say that failure teaches more than success does. Write an essay that argues your position on the extent to which failure is valuable. Use evidence from your reading, experience or observations to support your argument.',
    rubric(false),
    'Sample high-scoring approach: Thesis: failure is valuable only when it is followed by honest reflection and a safe chance to try again; without those, it teaches fear instead of skill. Body 1: an example from sports or music where repeated mistakes, reviewed with a coach, led to mastery, explaining the role of feedback. Body 2: a counterexample, such as students who fail a class and give up, explaining that failure with no second chance discourages people. Body 3: a broader example, such as engineers studying bridge collapses to write safer building codes, explaining how institutions turn failure into progress. Sophistication: qualifies the claim ("to what extent") instead of simply praising failure.');

  // ---------- reference ----------
  SW.REF.lang = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Essay rubric (each essay, 6 points)</h4><table>
        <tr><td><b>Row A: Thesis (0-1)</b> A defensible claim that answers the prompt.</td></tr>
        <tr><td><b>Row B: Evidence and commentary (0-4)</b> Specific evidence + explaining HOW it supports your line of reasoning. Commentary matters more than quotes.</td></tr>
        <tr><td><b>Row C: Sophistication (0-1)</b> Nuance, complexity, implications, or a consistently vivid style.</td></tr></table></div>
      <div class="ref-unit"><h4>The three essays</h4><table>
        <tr><td><b>Synthesis:</b> take a position; use at least 3 sources; cite as (Source A).</td></tr>
        <tr><td><b>Rhetorical analysis:</b> explain HOW the writer's choices achieve a purpose for an audience. Use "The writer [verb] to [effect] because [audience/context]."</td></tr>
        <tr><td><b>Argument:</b> take a position; use evidence from reading, history, experience; qualify your claim.</td></tr></table></div>
      <div class="ref-unit"><h4>Rhetorical situation (SPACECAT)</h4><table>
        <tr><td>Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, Tone</td></tr>
        <tr><td><b>Ethos</b> credibility, <b>Pathos</b> emotion, <b>Logos</b> logic and evidence, <b>Kairos</b> timeliness</td></tr></table></div>
      <div class="ref-unit"><h4>Style terms</h4><table>
        <tr><td><b>Anaphora</b> repeated opening words. <b>Antithesis</b> contrasting ideas in parallel form.</td></tr>
        <tr><td><b>Asyndeton</b> no conjunctions ("I came, I saw, I conquered"). <b>Polysyndeton</b> many conjunctions.</td></tr>
        <tr><td><b>Diction</b> word choice. <b>Syntax</b> sentence structure. <b>Tone</b> attitude toward the subject.</td></tr>
        <tr><td><b>Concession</b> admitting a point to the other side. <b>Rebuttal</b> answering it.</td></tr></table></div>
      <div class="ref-unit"><h4>Strong analysis verbs</h4><table>
        <tr><td>emphasizes, juxtaposes, undercuts, dramatizes, reframes, invites, concedes, intensifies, humanizes</td></tr></table></div>
    </div>`;
})();
