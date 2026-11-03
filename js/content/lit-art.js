/* AP English Literature (public-domain passages) and AP Art History. */
(function () {
  'use strict';
  const SW = globalThis.SW;

  // ======================= AP ENGLISH LITERATURE =======================
  SW.defineCourse('lit', {
    name: 'AP English Literature', short: 'Eng Lit', subject: 'English',
    units: [
      ['li1', 1, 'Character', '15-20%'],
      ['li2', 2, 'Setting', '10-15%'],
      ['li3', 3, 'Structure', '20-25%'],
      ['li4', 4, 'Narration', '20-25%'],
      ['li5', 5, 'Figurative Language', '20-25%'],
    ],
    format: '55 multiple-choice questions on prose and poetry passages (60 min, 45%) + 3 essays: poetry analysis, prose fiction analysis, literary argument (2 hr, 55%). Unit weights here are the skill areas of the multiple-choice section.',
    dist: { year: 2025, 5: 16.2, 4: 26.9, 3: 31.0 },
    past: 'https://apcentral.collegeboard.org/courses/ap-english-literature-and-composition/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/grammar',
    cut: [72, 58, 42, 28],
  });

  const SONNET18 = `Sonnet 18, by William Shakespeare (1609)

Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee.`;

  SW.passage('li3', SONNET18, [
    ['volta', 'The shift (volta) in the sonnet begins with which word?', ['"Shall"', '"Rough"', '"But"', '"So"'], 2, '"But thy eternal summer shall not fade" turns from summer\'s flaws to the beloved\'s lasting beauty.'],
    ['couplet', 'The final couplet claims that the beloved will live on through:', ['Their children', 'The poem itself', 'Summer', 'Memory of friends'], 1, '"This" refers to the poem: as long as people read it, it gives the beloved life.'],
  ]);
  SW.passage('li5', SONNET18, [
    ['personification', '"Nor shall Death brag thou wander\'st in his shade" uses:', ['Simile', 'Personification', 'Understatement', 'Onomatopoeia'], 1, 'Death is given the human ability to brag.'],
    ['metaphor', '"The eye of heaven" is a metaphor for:', ['God', 'The sun', 'The moon', 'The beloved\'s eye'], 1, 'The sun watches the world like an eye in the sky.'],
  ]);

  const HOPE = `"Hope" is the thing with feathers, by Emily Dickinson (written about 1861)

"Hope" is the thing with feathers -
That perches in the soul -
And sings the tune without the words -
And never stops - at all -

And sweetest - in the Gale - is heard -
And sore must be the storm -
That could abash the little Bird
That kept so many warm -

I've heard it in the chillest land -
And on the strangest Sea -
Yet - never - in Extremity,
It asked a crumb - of me.`;

  SW.passage('li5', HOPE, [
    ['extended metaphor', 'The poem develops which extended metaphor?', ['Hope as a storm', 'Hope as a small bird', 'Hope as a sea voyage', 'Hope as a song with lyrics'], 1, 'Feathers, perching, singing and a "little Bird" build the metaphor.'],
    ['meaning', 'The last two lines suggest that hope:', ['Demands a lot from us', 'Gives comfort without asking for anything in return', 'Disappears in hard times', 'Only exists at sea'], 1, 'Even in extremity it "asked a crumb" of nothing.'],
  ]);
  SW.passage('li3', HOPE, [
    ['dashes', 'Dickinson\'s frequent dashes mainly create:', ['A fast, smooth rhythm', 'Pauses that slow the reader and emphasize words', 'A list structure', 'Rhyme'], 1, 'They break lines into halting pieces, stressing words like "never."'],
  ]);

  const HOUR = `From "The Story of an Hour," by Kate Chopin (1894)

Knowing that Mrs. Mallard was afflicted with a heart trouble, great care was taken to break to her as gently as possible the news of her husband's death.

It was her sister Josephine who told her, in broken sentences; veiled hints that revealed in half concealing.`;
  SW.passage('li4', HOUR, [
    ['point of view', 'The opening is told from which point of view?', ['First person', 'Third person', 'Second person', 'A letter'], 1, 'The narrator refers to "Mrs. Mallard" and "her."'],
    ['irony foreshadowing', 'The detail that Mrs. Mallard has "heart trouble" most likely serves to:', ['Explain her age', 'Foreshadow that her heart will matter later in the story', 'Describe her sister', 'Show she is a doctor'], 1, 'In the story, her heart becomes both literal and symbolic.'],
  ]);
  SW.passage('li1', HOUR, [
    ['characterization', 'Josephine telling the news "in broken sentences" characterizes her as:', ['Careless', 'Careful and anxious to protect her sister', 'Angry', 'Joyful'], 1, 'She hesitates, trying to soften the shock.'],
  ]);

  SW.mcqs('li2', [
    ['setting function', 'In literary analysis, setting can work to:', ['Only tell time and place', 'Reflect characters\' emotions and shape conflict', 'Replace the plot', 'Name the author'], 1, 'A storm or a cramped room often mirrors what characters feel.'],
    ['setting symbol', 'A story set in a decaying mansion most likely uses the setting to suggest:', ['Wealth and growth', 'The decline of a family or way of life', 'A happy ending', 'Modern technology'], 1, 'Physical decay often symbolizes social or moral decay.'],
  ]);
  SW.mcqs('li1', [
    ['foil', 'A foil is a character who:', ['Narrates the story', 'Contrasts with another character to highlight their traits', 'Is always the villain', 'Appears only once'], 1, 'Laertes is a foil to Hamlet: both avenge fathers, but in opposite ways.'],
    ['dynamic character', 'A dynamic character:', ['Never changes', 'Undergoes important internal change', 'Is very active', 'Is minor'], 1, 'Static characters stay the same.'],
  ]);
  SW.mcqs('li4', [
    ['unreliable narrator', 'An unreliable narrator is one whose account:', ['Is always told in third person', 'Cannot be fully trusted because of bias, limited knowledge or deception', 'Is very short', 'Includes dialogue'], 1, 'Readers must read between the lines.'],
  ]);

  const essay = poem => [
    [1, `Row A, Thesis (0-1): a defensible interpretation of the ${poem ? 'poem' : 'passage'} that answers the prompt`],
    [4, 'Row B, Evidence and commentary (0-4): 4 = specific textual evidence that supports a line of reasoning, with consistent commentary explaining how literary elements create meaning; 3 = explains how some evidence supports the reasoning; 2 = some relevant evidence with limited commentary; 1 = summary; 0 = none'],
    [1, 'Row C, Sophistication (0-1): complex interpretation (tensions, ambiguity, broader context) or consistently vivid writing'],
  ];
  SW.frq('li5', 'Poetry analysis: "Hope" is the thing with feathers',
    'Read Emily Dickinson\'s poem above carefully. In a well-written essay, analyze how Dickinson uses literary elements and techniques to convey a complex understanding of hope.',
    essay(true),
    'Sample high-scoring approach: Thesis: Dickinson\'s extended metaphor of a tiny bird portrays hope as fragile in form yet powerful and generous in effect, surviving where it seems least likely. Body 1: the domestic imagery of perching and singing "without the words" shows hope as instinctive rather than reasoned. Body 2: the storm stanza uses contrast ("sore must be the storm" vs. "little Bird") to show hope\'s surprising strength. Body 3: the final stanza\'s dashes and the inversion "Yet - never - in Extremity" stress that hope asks nothing in return. Sophistication: notes the tension between the bird\'s smallness and its endurance.',
    null, HOPE);
  SW.frq('li4', 'Prose fiction analysis: "The Story of an Hour" opening',
    'Read the opening of Kate Chopin\'s "The Story of an Hour" above. In a well-written essay, analyze how Chopin uses literary elements and techniques (such as narration, characterization and diction) to establish the situation and the relationships between the characters.',
    essay(false),
    'Sample high-scoring approach: Thesis: Chopin\'s careful, almost clinical narration establishes a world where Mrs. Mallard is treated as fragile, setting up the irony that she is stronger and freer than others assume. Evidence: the passive construction "great care was taken" hides who is protecting her, suggesting social expectations rather than individuals; the diction of "afflicted" and "broken sentences" emphasizes delicacy; "veiled hints that revealed in half concealing" uses paradox to show the gap between what is said and what is meant. Sophistication: connects the protective tone to the story\'s critique of marriage and women\'s autonomy.',
    null, HOUR);
  SW.frq('li1', 'Literary argument: characters who refuse to conform',
    'In many works of literature, a character refuses to conform to the expectations of their society. Choose a work of fiction in which a character resists social expectations. Then, in a well-written essay, analyze how that resistance contributes to an interpretation of the work as a whole. Do not merely summarize the plot.',
    essay(false),
    'Sample high-scoring approach (using a novel such as The Scarlet Letter, Jane Eyre, or Their Eyes Were Watching God): Thesis names the character\'s specific act of resistance and what it reveals about the work\'s meaning (for example, that true identity costs social belonging). Body paragraphs use specific moments and explain how each choice by the author develops that meaning. Sophistication: explores the cost or ambiguity of nonconformity rather than simply praising it.');

  SW.REF.lit = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Essay rubric (each essay, 6 points)</h4><table>
        <tr><td><b>Thesis (0-1):</b> a defensible interpretation.</td></tr>
        <tr><td><b>Evidence and commentary (0-4):</b> specific quotes AND explanation of how techniques create meaning.</td></tr>
        <tr><td><b>Sophistication (0-1):</b> complexity, tension, ambiguity, or a vivid style.</td></tr></table></div>
      <div class="ref-unit"><h4>Poetry terms</h4><table>
        <tr><td>Volta (turn), enjambment, caesura, meter (iambic pentameter), rhyme scheme, sonnet (Petrarchan, Shakespearean)</td></tr>
        <tr><td>Imagery, metaphor, extended metaphor (conceit), personification, apostrophe, paradox</td></tr></table></div>
      <div class="ref-unit"><h4>Prose terms</h4><table>
        <tr><td>Point of view, narrator reliability, free indirect discourse, foil, dynamic vs. static, motif, symbol, irony (verbal, situational, dramatic)</td></tr></table></div>
    </div>`;

  // ======================= AP ART HISTORY =======================
  SW.defineCourse('arthist', {
    name: 'AP Art History', short: 'Art History', subject: 'Arts',
    units: [
      ['ah1', 1, 'Global Prehistory (30,000-500 BCE)', '3-5%'],
      ['ah2', 2, 'Ancient Mediterranean (3500 BCE-300 CE)', '14-16%'],
      ['ah3', 3, 'Early Europe and Colonial Americas (200-1750 CE)', '19-21%'],
      ['ah4', 4, 'Later Europe and Americas (1750-1980 CE)', '19-21%'],
      ['ah5', 5, 'Indigenous Americas (1000 BCE-1980 CE)', '5-7%'],
      ['ah6', 6, 'Africa (1100-1980 CE)', '5-7%'],
      ['ah7', 7, 'West and Central Asia (500 BCE-1980 CE)', '3-5%'],
      ['ah8', 8, 'South, East, and Southeast Asia (300 BCE-1980 CE)', '7-9%'],
      ['ah9', 9, 'The Pacific (700-1980 CE)', '2-4%'],
      ['ah10', 10, 'Global Contemporary (1980 CE-present)', '10-12%'],
    ],
    format: '80 multiple-choice questions (60 min, 50%) + 6 free-response questions: 2 long essays and 4 short essays (2 hr, 50%). The course has 250 required works.',
    dist: { year: 2025, 5: 16.0, 4: 23.3, 3: 26.2 },
    past: 'https://apcentral.collegeboard.org/courses/ap-art-history/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/ap-art-history',
  });
  SW.mcqs('ah1', [
    ['apollo 11 stones', 'Why are the Apollo 11 Stones (Namibia) important?', ['They are the oldest known Egyptian paintings', 'They are among the oldest known portable artworks in Africa', 'They are Roman mosaics', 'They show Christian scenes'], 1, 'Painted animal figures on stone slabs, about 25,000 years old.'],
    ['stonehenge', 'Stonehenge was most likely used for:', ['A royal palace', 'Ritual and tracking the sun\'s movements', 'A Roman fort', 'A marketplace'], 1, 'It aligns with the summer solstice sunrise.'],
  ]);
  SW.mcqs('ah2', [
    ['parthenon', 'The Parthenon is a temple dedicated to:', ['Zeus', 'Athena', 'Apollo', 'Poseidon'], 1, 'Athena Parthenos, patron goddess of Athens.'],
    ['contrapposto', 'Contrapposto, as in Polykleitos\'s Doryphoros, means:', ['A stiff, frontal pose', 'A relaxed stance with weight on one leg', 'A seated figure', 'Painted relief'], 1, 'It made Greek sculpture look natural and alive.'],
    ['pantheon', 'The Roman Pantheon is known for:', ['Its pointed arches', 'Its huge concrete dome with an oculus', 'Flying buttresses', 'Steel frame'], 1, 'Roman concrete made the unreinforced dome possible.'],
  ]);
  SW.mcqs('ah3', [
    ['gothic', 'Gothic cathedrals like Chartres use flying buttresses so that:', ['Walls can be thinner with large stained glass windows', 'Domes can be built', 'Buildings are shorter', 'No windows are needed'], 0, 'External supports carry the weight of the vaults.'],
    ['renaissance perspective', 'Linear perspective, used in works like Masaccio\'s Holy Trinity, creates:', ['Flat gold backgrounds', 'The illusion of depth with a vanishing point', 'Abstract shapes', 'Symbolic sizes only'], 1, 'Lines converge to a single point on the horizon.'],
    ['baroque', 'Caravaggio\'s Calling of Saint Matthew is known for dramatic:', ['Chiaroscuro / tenebrism (strong light and dark)', 'Gold leaf', 'Pointillism', 'Abstraction'], 0, 'A beam of light picks out the moment of calling.'],
  ]);
  SW.mcqs('ah4', [
    ['impressionism', 'Monet\'s Saint-Lazare Station reflects Impressionism\'s interest in:', ['Religious scenes', 'Modern life and the effects of light and atmosphere', 'Ancient history', 'Geometric abstraction'], 1, 'Steam, light and a modern train station.'],
    ['cubism', 'Picasso\'s Les Demoiselles d\'Avignon broke with tradition by:', ['Using perfect perspective', 'Fracturing forms and showing multiple viewpoints', 'Copying Renaissance works', 'Being a sculpture'], 1, 'It led toward Cubism.'],
  ]);
  SW.mcqs('ah5', [['machu picchu', 'Machu Picchu was built by the:', ['Aztec', 'Inka', 'Maya', 'Olmec'], 1, 'An Inka royal estate in the Andes, built with fitted stone masonry.']]);
  SW.mcqs('ah6', [['great zimbabwe', 'Great Zimbabwe is notable for:', ['Pyramids', 'Massive dry-stone walls built without mortar', 'Wooden longhouses', 'Glass skyscrapers'], 1, 'The Great Enclosure is a huge mortarless stone structure.']]);
  SW.mcqs('ah7', [['dome of the rock', 'The Dome of the Rock in Jerusalem is decorated mainly with:', ['Figural paintings of people', 'Mosaics and calligraphy with geometric and plant designs', 'Marble statues', 'Stained glass'], 1, 'Islamic religious art generally avoids figural imagery.']]);
  SW.mcqs('ah8', [['great wave', 'Hokusai\'s Under the Wave off Kanagawa is a:', ['Oil painting', 'Woodblock print', 'Fresco', 'Bronze sculpture'], 1, 'Mass-produced ukiyo-e print, which influenced Western artists.']]);
  SW.mcqs('ah9', [['moai', 'The moai on Rapa Nui (Easter Island) are believed to represent:', ['Gods of the sea', 'Deified ancestors', 'European explorers', 'Animals'], 1, 'They face inland, watching over the community.']]);
  SW.mcqs('ah10', [['contemporary global', 'Many global contemporary works challenge the boundaries between:', ['Painting and drawing only', 'Art, life, technology and identity', 'Greek and Roman art', 'Gothic and Romanesque'], 1, 'Installations, video and performance blur traditional categories.']]);
  SW.frq('ah3', 'Long essay: art and religious authority',
    'Choose a work of art from the required course content made to express religious authority or devotion (for example, Chartres Cathedral, the Arena Chapel, or the Great Mosque of Cordoba).\n(a) Accurately identify the work: name, culture or artist, and date range.\n(b) Describe at least two visual or architectural features of the work.\n(c) Explain how those features express religious authority or devotion.\n(d) Explain how the work\'s context (patron, location, audience or function) shaped its meaning.\n(e) Compare it with another work from a different culture that also expresses religious ideas.',
    [[1, '(a) Accurate identification with at least two identifiers'], [1, '(b) Accurate description of two features'], [2, '(c) Explains how features express religious meaning (1 point for partial explanation)'], [1, '(d) Explains how context shaped meaning'], [1, '(e) Valid comparison with a work from another culture']],
    'Example with Chartres Cathedral (Gothic, France, c. 1145-1220): (b) soaring rib vaults and flying buttresses allow enormous stained glass windows like the Notre-Dame de la Belle Verriere. (c) Height draws the eye heavenward, and colored light symbolizes divine presence. (d) As a pilgrimage church holding the Virgin\'s tunic, it was designed to impress crowds of pilgrims and display the Church\'s power. (e) Like Chartres, the Great Stupa at Sanchi guides worshipers through a sacred path (circumambulation), but uses a solid dome rather than an interior space.');
  SW.REF.arthist = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>How to discuss a work</h4><table>
        <tr><td><b>Identify:</b> title, artist or culture, date, material</td></tr>
        <tr><td><b>Form:</b> line, color, composition, scale, space, material and technique</td></tr>
        <tr><td><b>Function and context:</b> patron, audience, location, purpose, reception</td></tr>
        <tr><td><b>Content:</b> subject, iconography, narrative, symbols</td></tr></table></div>
      <div class="ref-unit"><h4>Key terms</h4><table>
        <tr><td>Contrapposto, chiaroscuro, tenebrism, linear perspective, iconography, hierarchical scale</td></tr>
        <tr><td>Post-and-lintel, arch, vault, dome, flying buttress, oculus, apse, nave</td></tr>
        <tr><td>Fresco, tempera, woodblock print, lost-wax casting, mosaic, installation</td></tr></table></div>
    </div>`;
})();
