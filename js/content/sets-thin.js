/* More stimulus-based question sets for the courses with the smallest banks:
 * Seminar, Research, Spanish Literature, Art History, Comparative Government,
 * Human Geography, the six world languages, Music Theory, Psychology and Statistics.
 * Passages marked "written for practice" are original; literary quotes are public domain. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const F = SW.fig;
  const { R, pick } = SW;
  // qs rows: [question, [right answer first, then wrong answers], why]. Choices are shuffled when shown.
  const P = (unit, topic, passage, qs, only) => SW.sourceSet(unit, topic, { passage }, qs.map(([q, c, why]) => [q, c, 0, why]), only);

  // ======================= AP SEMINAR =======================
  P('sem1', 'four-day school week', 'Passage (written for practice):\n"Districts that move to a four-day school week often promise savings on buses, heating and substitute teachers. A 2021 review of studies found those savings were usually small, around 1 to 2 percent of budgets. Several studies also found modest drops in math scores, especially in districts that did not lengthen the remaining four days. Still, many rural districts report that the schedule helps them recruit teachers who would otherwise take better-paid jobs elsewhere. Policymakers should therefore treat the four-day week not as a money-saving tool, but as a recruitment strategy whose academic costs must be watched closely."', [
    ['Which statement best expresses the author\'s main claim?', ['The four-day week should be judged as a recruitment strategy, while monitoring its academic costs', 'The four-day week saves districts large amounts of money', 'All districts should adopt a four-day week', 'Teachers prefer five-day weeks'], 'The final sentence states the claim.'],
    ['The author uses the 2021 review mainly to:', ['Challenge a common reason for adopting the schedule', 'Prove that test scores rose', 'Describe how buses are scheduled', 'Show that teachers are underpaid'], 'It shows savings are small, undercutting the money argument.'],
    ['Which question would best extend inquiry into this topic?', ['How do outcomes differ between districts that lengthened the school day and those that did not?', 'What year was the first school built?', 'Do students like Fridays?', 'How many buses does a district own?'], 'It follows from the evidence about lengthened days.'],
    ['The phrase "especially in districts that did not lengthen the remaining four days" functions as:', ['A qualification that limits the scope of the evidence', 'A counterargument the author rejects', 'An appeal to emotion', 'A definition of a key term'], 'It narrows where the drop appears.'],
  ]);
  P('sem4', 'urban trees', 'Passage (written for practice):\n"City trees are often treated as decoration, but they function as infrastructure. A single mature tree can lower nearby surface temperatures by several degrees in summer, which matters in neighborhoods where many residents lack air conditioning. Critics note that trees require years of watering and pruning, and that roots can crack sidewalks. These costs are real, but they are predictable and can be budgeted, unlike the health costs of extreme heat, which fall hardest on elderly and low-income residents. A city that plans its tree canopy as carefully as its water pipes will be both cooler and fairer."', [
    ['Which best describes the structure of the argument?', ['Claim, supporting evidence, counterargument, rebuttal, conclusion', 'Story, moral, question', 'List of statistics with no claim', 'Two equally weighted sides with no conclusion'], 'It concedes costs, then rebuts.'],
    ['How does the author respond to critics?', ['By conceding the costs but arguing they are predictable and outweighed', 'By denying that trees cost anything', 'By attacking the critics personally', 'By changing the topic to water pipes'], 'Concession followed by rebuttal.'],
    ['The comparison between trees and water pipes is used to:', ['Frame trees as essential public infrastructure', 'Show that pipes are more important', 'Explain how roots damage pipes', 'Describe the history of city planning'], 'It supports the claim that trees are infrastructure.'],
    ['Which additional evidence would most strengthen the argument?', ['Data comparing heat-related illness in neighborhoods with more and fewer trees', 'A photo of a beautiful park', 'The cost of a new sidewalk', 'A list of tree species'], 'It directly links trees to the health outcome claimed.'],
  ]);
  P('sem5', 'team presentation', 'Scenario (written for practice):\nA team of four students is preparing its Team Multimedia Presentation on reducing food waste in school cafeterias. One member has found strong data on how much food is thrown away, another interviewed cafeteria staff, a third researched share tables in other districts, and the fourth designed slides. Two days before the presentation, the team realizes its solution (share tables) does not address why students throw food away.', [
    ['What should the team do first?', ['Revisit the evidence to connect the cause of waste to a solution that addresses it', 'Add more slides', 'Remove the interview data', 'Present without changes'], 'A solution must respond to the problem\'s causes.'],
    ['Which best describes effective collaboration in this situation?', ['Members combine their findings so each piece of evidence supports the shared argument', 'Each member presents separately with no connection', 'One member rewrites everything alone', 'The team votes without discussing evidence'], 'Synthesis across members.'],
    ['In the oral defense, a judge asks about a limitation. A strong answer would:', ['Name a specific limit of the evidence and explain how it affects the solution', 'Say there are no limitations', 'Change the topic', 'Read the slides again'], 'Acknowledging limits shows understanding.'],
  ]);

  // ======================= AP RESEARCH =======================
  P('res3', 'study design critique', 'Abstract (written for practice):\n"This study examined whether listening to music while studying affects reading comprehension. Thirty volunteers from one high school read two passages: one in silence and one while listening to lyrical pop music, in that order. Comprehension scores were 12 percent lower with music. We conclude that music harms reading comprehension."', [
    ['What is the biggest problem with the order of the conditions?', ['Fatigue or practice effects could explain the difference because every participant did the silent condition first', 'The passages were too short', 'Pop music is not popular', 'Thirty is too many participants'], 'Counterbalancing the order would fix this.'],
    ['The conclusion overreaches mainly because:', ['The study tested only lyrical pop music, not all music', 'It used reading passages', 'It reported a percentage', 'It was done at a school'], 'Generalizing beyond the conditions tested.'],
    ['Which change would most improve the study\'s validity?', ['Randomly assign the order of conditions and use passages of equal difficulty', 'Use only one passage', 'Let participants choose their music', 'Remove the silent condition'], 'Controls order and passage effects.'],
  ]);
  P('res4', 'synthesizing sources', 'Notes from three sources (written for practice):\nSource A (survey of 2,000 teens): 64 percent say social media makes them feel more connected to friends.\nSource B (experiment with 140 college students): limiting social media to 30 minutes a day for three weeks reduced reported loneliness.\nSource C (interviews with 25 teens): many described feeling pressure to respond to messages instantly.', [
    ['Which statement best synthesizes the sources?', ['Social media can increase feelings of connection while also creating pressures that may harm well-being', 'Social media has no effect on teens', 'All teens should quit social media', 'Only college students are affected by social media'], 'Synthesis combines the sources into a new, nuanced claim.'],
    ['Which source provides the strongest evidence of cause and effect?', ['Source B, because it is an experiment', 'Source A, because it has the largest sample', 'Source C, because it uses interviews', 'None of them, because they disagree'], 'Only an experiment can show causation.'],
    ['A gap in this research that a new study could address is:', ['Whether results from college students apply to younger teens', 'Whether teens use phones', 'What social media is', 'Whether surveys exist'], 'Source B used college students, Sources A and C teens.'],
  ]);
  P('res5', 'presenting findings', 'Scenario (written for practice):\nA student found that, in her sample of 60 students, those who ate breakfast scored on average 6 points higher on a quiz. The difference was not statistically significant (p = 0.21).', [
    ['How should she describe this result in her presentation?', ['The breakfast group scored higher, but the difference could easily be due to chance in this sample', 'Breakfast causes higher scores', 'Breakfast has no effect at all', 'The study proves skipping breakfast is harmful'], 'A non-significant result is inconclusive, not proof of no effect.'],
    ['Which is the best "new understanding" to state in her conclusion?', ['A larger study controlling for sleep and income is needed to test the relationship', 'Everyone should eat breakfast', 'Quizzes are unfair', 'Statistics are not useful'], 'Good research conclusions point to next steps.'],
    ['During the oral defense, she is asked why she used a quiz score. A strong answer:', ['Explains the quiz was a consistent, measurable outcome and admits it may not reflect all learning', 'Says the teacher told her to', 'Says she did not think about it', 'Changes her research question'], 'Justify the method and acknowledge its limits.'],
  ]);

  // ======================= AP SPANISH LITERATURE =======================
  P('sl1', 'lazarillo de tormes', 'Lazarillo de Tormes (1554), Tratado primero:\n"Pues sepa Vuestra Merced, ante todas cosas, que a mí llaman Lázaro de Tormes, hijo de Tomé González y de Antona Pérez, naturales de Tejares, aldea de Salamanca."', [
    ['¿Qué tipo de narrador usa esta obra?', ['Narrador en primera persona (autobiográfico)', 'Narrador omnisciente en tercera persona', 'Narrador en segunda persona', 'Un coro de personajes'], 'Lázaro cuenta su propia vida: "a mí llaman".'],
    ['¿A quién se dirige el narrador con "Vuestra Merced"?', ['A un lector de clase alta que le pidió el relato de su vida', 'A su madre', 'A Dios', 'Al ciego'], 'La obra es una carta a una persona de rango superior.'],
    ['¿A qué género pertenece Lazarillo de Tormes?', ['La novela picaresca', 'La novela de caballerías', 'El realismo mágico', 'La poesía modernista'], 'Es el modelo de la picaresca: un pícaro de origen humilde narra su vida.'],
  ]);
  P('sl2', 'becquer rima liii', 'Gustavo Adolfo Bécquer, Rima LIII (1871):\n"Volverán las oscuras golondrinas\nen tu balcón sus nidos a colgar,\ny otra vez con el ala a sus cristales\njugando llamarán.\nPero aquellas que el vuelo refrenaban\ntu hermosura y mi dicha a contemplar,\naquellas que aprendieron nuestros nombres...\nésas... ¡no volverán!"', [
    ['¿Cuál es el tema principal del fragmento?', ['El amor perdido que no puede repetirse', 'La alegría de la primavera', 'La crítica social', 'La vida en el campo'], 'Las golondrinas vuelven, pero el momento de amor compartido no.'],
    ['¿A qué movimiento literario pertenece Bécquer?', ['El Romanticismo (posromanticismo)', 'El Barroco', 'El Realismo', 'La Generación del 27'], 'Expresión íntima del sentimiento y la nostalgia.'],
    ['¿Qué recurso crea el contraste entre "Volverán" y "no volverán"?', ['La antítesis', 'La onomatopeya', 'La enumeración', 'El hipérbaton solamente'], 'Opone lo que se repite a lo que se pierde.'],
  ]);
  P('sl2', 'marti nuestra america', 'José Martí, "Nuestra América" (1891):\n"Cree el aldeano vanidoso que el mundo entero es su aldea ... Lo que quede de aldea en América ha de despertar. Estos tiempos no son para acostarse con el pañuelo a la cabeza, sino con las armas de almohada."', [
    ['¿Qué critica Martí con la imagen del "aldeano vanidoso"?', ['La visión estrecha de quienes no ven los peligros más allá de su entorno', 'La vida en las ciudades grandes', 'La educación universitaria', 'El arte europeo'], 'Pide a los latinoamericanos ampliar su visión.'],
    ['¿Cuál es el propósito del ensayo?', ['Llamar a la unidad y la conciencia de los pueblos latinoamericanos frente a amenazas externas', 'Describir paisajes de Cuba', 'Contar una historia de amor', 'Defender el colonialismo español'], 'Martí advierte sobre la influencia de potencias como Estados Unidos.'],
    ['La frase "con las armas de almohada" es un ejemplo de:', ['Metáfora', 'Rima consonante', 'Diálogo', 'Narrador omnisciente'], 'Pide estar siempre preparados, en sentido figurado.'],
  ]);
  P('sl3', 'machado caminos', 'Antonio Machado, "He andado muchos caminos" (Soledades, 1903):\n"He andado muchos caminos,\nhe abierto muchas veredas;\nhe navegado en cien mares,\ny atracado en cien riberas."', [
    ['¿Qué recurso se repite al principio de los versos ("He andado", "he abierto", "he navegado")?', ['La anáfora con el pretérito perfecto', 'La personificación', 'La onomatopeya', 'El encabalgamiento solamente'], 'La repetición de "he" + participio.'],
    ['¿Qué sugiere el "camino" en la poesía de Machado?', ['La vida como viaje y experiencia', 'Un mapa real de España', 'Una carretera moderna', 'El trabajo agrícola'], 'Símbolo central de su obra.'],
    ['¿Con qué época se asocia esta obra?', ['El Modernismo y la Generación del 98 (principios del siglo XX)', 'El Siglo de Oro', 'El Romanticismo temprano', 'La literatura del boom de los años 60'], 'Soledades se publicó en 1903.'],
  ]);
  P('sl4', 'dario cancion de otono', 'Rubén Darío, "Canción de otoño en primavera" (1905):\n"Juventud, divino tesoro,\n¡ya te vas para no volver!\nCuando quiero llorar, no lloro...\ny a veces lloro sin querer..."', [
    ['¿Qué figura retórica es "Juventud, divino tesoro"?', ['Apóstrofe y metáfora', 'Símil', 'Hipérbole solamente', 'Aliteración solamente'], 'Se dirige a la juventud y la compara con un tesoro.'],
    ['¿Qué tono predomina en estos versos?', ['Nostálgico', 'Humorístico', 'Indiferente', 'Furioso'], 'Lamenta la juventud que se va.'],
    ['¿Qué recurso aparece en "Cuando quiero llorar, no lloro... / y a veces lloro sin querer"?', ['Paradoja y quiasmo', 'Onomatopeya', 'Enumeración', 'Diálogo directo'], 'Ideas cruzadas que parecen contradictorias.'],
  ]);

  // ======================= AP ART HISTORY =======================
  P('ah5', 'machu picchu', 'Work: Machu Picchu, Inka, Peru, c. 1450-1540 CE. Granite buildings and terraces built on a mountain ridge; walls of finely cut stones fit together without mortar (ashlar masonry); the Observatory (Torreon) aligns with the sun at the June solstice.', [
    ['The fitted-stone walls without mortar show the Inka\'s:', ['Advanced ashlar masonry, which also resists earthquakes', 'Use of concrete', 'Use of wood framing', 'Borrowing of Roman arches'], 'Stones shift and resettle during earthquakes.'],
    ['The Torreon\'s alignment with the solstice suggests the site had a:', ['Religious and astronomical function', 'Purely military function', 'Function as a market', 'Function as a European mission'], 'Inti, the sun god, was central to Inka religion.'],
    ['The terraces at Machu Picchu were used mainly for:', ['Farming and controlling erosion on steep slopes', 'Seating for audiences', 'Storing gold', 'Defense against Spanish ships'], 'Agricultural terraces adapted to mountain terrain.'],
  ]);
  P('ah6', 'great zimbabwe', 'Work: Great Zimbabwe, Shona peoples, southeastern Zimbabwe, c. 1000-1400 CE. A large stone complex including the Great Enclosure, with walls of dry-stone (no mortar) granite blocks over 9 meters high and a solid conical tower.', [
    ['Great Zimbabwe\'s wealth came largely from:', ['Trade in gold and ivory reaching the Indian Ocean coast', 'Silver mines worked for Spain', 'The trans-Atlantic slave trade', 'Rubber exports'], 'Chinese ceramics and Persian glass were found there.'],
    ['The dry-stone walls show:', ['Skilled construction without mortar, expressing royal power', 'Roman influence', 'A colonial European design', 'Temporary building materials'], 'Monumental walls signaled the ruler\'s authority.'],
    ['Colonial-era claims that outsiders built Great Zimbabwe were:', ['False and rooted in racism; archaeology shows it was built by Shona ancestors', 'Confirmed by archaeology', 'Accepted by modern historians', 'Based on written records from the site'], 'The site later gave its name to the nation.'],
  ]);
  P('ah7', 'dome of the rock', 'Work: Dome of the Rock, Jerusalem, Islamic, Umayyad, 691-692 CE. An octagonal building with a gilded dome over a sacred rock; interior and exterior decorated with mosaics (later tiles on the exterior) and Arabic inscriptions from the Qur\'an, with no human figures.', [
    ['The building\'s central plan and dome draw on:', ['Byzantine and Roman martyria (central-plan shrines)', 'Japanese pagodas', 'Gothic cathedrals', 'Aztec pyramids'], 'Umayyad builders adapted local Byzantine forms.'],
    ['The absence of human figures reflects:', ['Islamic aniconism in religious spaces', 'A lack of skilled artists', 'Roman law', 'Christian iconoclasm only'], 'Calligraphy and vegetal patterns replace figures.'],
    ['The Dome of the Rock is significant because it:', ['Is one of the earliest surviving major Islamic monuments, marking Islam\'s presence in Jerusalem', 'Was built by the Ottomans', 'Is a mosque for daily prayer with a courtyard', 'Houses the tomb of Muhammad'], 'It is a shrine, not a congregational mosque.'],
  ]);
  P('ah8', 'terra cotta warriors', 'Work: Terra cotta warriors from the mausoleum of the first Qin emperor (Qin Shi Huangdi), China, c. 221-209 BCE. Thousands of life-size clay soldiers in battle formation, with individualized faces, originally painted and equipped with real bronze weapons.', [
    ['The warriors were made to:', ['Protect and serve the emperor in the afterlife', 'Decorate a palace for visitors', 'Celebrate a single battle', 'Serve as Buddhist offerings'], 'They were buried near his tomb.'],
    ['Many figures were made using:', ['Molded body parts assembled and then individually finished', 'Carved marble', 'Lost-wax bronze casting for the whole figure', 'Woven textiles'], 'A standardized, workshop-based system.'],
    ['The project reflects the Qin state\'s:', ['Centralized power and ability to organize labor and resources', 'Weak government', 'Democratic traditions', 'Rejection of the military'], 'Qin unified China and standardized weights, script and coinage.'],
  ]);
  P('ah9', 'navigation chart', 'Work: Navigation chart, Marshall Islands, Micronesia, 19th to early 20th century. A lattice of sticks lashed together with small shells attached; the curved sticks show ocean swells, and the shells mark islands.', [
    ['The chart was used to:', ['Teach and memorize how swells bend around islands before a voyage', 'Show exact distances on a printed map', 'Decorate a meeting house', 'Record family genealogy'], 'Navigators studied it on land, not at sea.'],
    ['The materials (sticks, shells, fiber) show:', ['Use of local materials to encode environmental knowledge', 'Trade with Europe for paper', 'Metalworking skill', 'Imported silk'], 'Knowledge of the ocean was a source of status.'],
    ['This work challenges Western assumptions that art must be:', ['Made mainly for visual display rather than for use and knowledge', 'Small', 'Made by groups', 'Colorful'], 'Pacific art often joins function, knowledge and value.'],
  ]);
  P('ah10', 'vietnam veterans memorial', 'Work: Vietnam Veterans Memorial, Maya Lin, Washington, DC, 1982. Two long walls of polished black granite cut into the ground in a V shape, inscribed with more than 58,000 names in chronological order of death; visitors see their reflections among the names.', [
    ['The reflective granite causes visitors to:', ['See themselves among the names, connecting past and present', 'Read a heroic story of victory', 'See a statue of soldiers', 'Ignore the names'], 'Reflection invites personal contemplation.'],
    ['Listing names in order of death rather than alphabetically:', ['Lets the wall read like a timeline of the war', 'Hides the names', 'Groups soldiers by rank', 'Was required by law'], 'Veterans can find comrades who died together.'],
    ['Why was the design controversial at first?', ['Some saw its abstract, minimalist form as not heroic enough', 'It used too many colors', 'It was too tall', 'It showed scenes of battle'], 'A figurative statue and flag were added nearby as a compromise.'],
  ]);

  // ======================= AP COMPARATIVE GOVERNMENT =======================
  P('cg1', 'regime types', 'Summary (course countries):\nThe United Kingdom is a parliamentary democracy with a constitutional monarch. Mexico and Nigeria are presidential systems that hold competitive elections. Russia holds elections but restricts opposition parties and media. China is a one-party state ruled by the Chinese Communist Party. Iran is a theocratic republic in which the Supreme Leader, a cleric, holds final authority.', [
    ['Which course countries are best classified as authoritarian?', ['China, Iran and Russia', 'UK and Mexico', 'Mexico and Nigeria', 'UK and Nigeria'], 'Elections there are not free and fair, or do not exist for top offices.'],
    ['In Iran, legitimacy is based heavily on:', ['Religion (Shia Islam) and the revolution of 1979', 'A hereditary monarchy', 'Free-market success', 'A Communist party'], 'The Supreme Leader rules as a religious authority.'],
    ['Which country has a head of state who is separate from the head of government and mostly ceremonial?', ['United Kingdom', 'Mexico', 'Nigeria', 'China'], 'The monarch is head of state; the prime minister heads the government.'],
  ]);
  P('cg3', 'civil society', 'Summary: In Mexico, independent civil society groups and journalists have pushed for transparency, though journalists face violence. In China, NGOs must register with the state and foreign NGOs face strict rules. In Russia, groups that receive foreign funding can be labeled "foreign agents."', [
    ['Which statement best compares the three countries?', ['Civil society is more independent in Mexico than in China or Russia, where the state limits it', 'Civil society is equally free in all three', 'China has the most independent NGOs', 'Russia encourages foreign-funded groups'], 'Authoritarian states control civil society.'],
    ['Russia\'s "foreign agent" label is a form of:', ['Restricting civil society by stigmatizing and regulating groups', 'Promoting pluralism', 'Federalism', 'Proportional representation'], 'It discourages independent groups.'],
    ['Why might an authoritarian state allow some NGOs to operate?', ['They can provide services and information without challenging the regime', 'They are required by the UN', 'They elect the president', 'They control the military'], 'Co-optation: tolerate groups that help the state.'],
  ]);
  P('cg5', 'economic reform', 'Summary: China began market reforms in 1978 under Deng Xiaoping, creating special economic zones while keeping one-party rule. Mexico joined NAFTA in 1994, lowering trade barriers. Nigeria depends heavily on oil exports for government revenue.', [
    ['China\'s reforms since 1978 are an example of:', ['Economic liberalization without political liberalization', 'Democratization', 'Nationalization of all industry', 'Isolation from world trade'], 'Markets opened; the party kept power.'],
    ['Nigeria\'s dependence on oil revenue is an example of:', ['A rentier state facing the "resource curse"', 'A diversified economy', 'Import substitution', 'A command economy like China\'s in the 1960s'], 'Oil revenue can fuel corruption and instability.'],
    ['A likely effect of NAFTA on Mexico was:', ['Growth of export manufacturing (maquiladoras) and pressure on small farmers', 'An end to trade with the US', 'The end of the PRI in 1994', 'Rising tariffs'], 'Cheap US corn hurt many small farmers.'],
  ]);
  P('cg4', 'nigeria elections', 'Summary: Nigeria\'s president must win the most votes nationwide and at least 25 percent of the vote in two-thirds of the states. Nigeria returned to civilian rule in 1999; in 2015 an opposition candidate defeated the incumbent president for the first time.', [
    ['The 25 percent rule is designed to:', ['Make the president gain support across Nigeria\'s many regions and ethnic groups', 'Guarantee the north always wins', 'Create a parliamentary system', 'Limit the number of parties to two'], 'It encourages cross-regional coalitions.'],
    ['The 2015 election was significant because it showed:', ['A peaceful transfer of power to the opposition', 'A military coup', 'The end of elections', 'The adoption of sharia nationwide'], 'An important step toward democratic consolidation.'],
    ['Nigeria\'s system of government is:', ['Presidential and federal', 'Parliamentary and unitary', 'A theocracy', 'A one-party state'], 'Modeled partly on the United States.'],
  ]);

  // ======================= AP HUMAN GEOGRAPHY =======================
  SW.sourceSet('hg5', 'von thunen model', { passage: 'Model: Von Thunen (1826). Around a single market city on a flat, featureless plain, land use forms rings: (1) market gardening and dairy closest to the city, (2) forest (wood for fuel and building), (3) grain and field crops, (4) ranching (livestock) farthest out. Beyond is wilderness.' }, [
    ['Why is dairy farming located closest to the city in the model?', ['Its products are perishable and costly to transport', 'Cows need forests', 'Land is cheapest near the city', 'Dairy needs the most land'], 0, 'Transport cost and spoilage drive location.'],
    ['Ranching is farthest from the market because:', ['It uses large amounts of land and animals can walk to market', 'It is the most profitable per acre', 'It needs fresh water from the city', 'It is the newest type of farming'], 0, 'Extensive land use where land is cheap.'],
    ['Which is a limitation of the model today?', ['Refrigeration and fast transport reduce the importance of distance', 'It explains all farming perfectly', 'It applies only to rivers', 'It ignores cities'], 0, 'Modern technology and global markets change land use.'],
  ]);
  SW.sourceSet('hg6', 'burgess concentric zone', { passage: 'Model: Burgess concentric zone model (1925), based on Chicago. Zones: (1) central business district, (2) zone in transition (factories, poor-quality housing), (3) working-class homes, (4) better residences, (5) commuter zone.' }, [
    ['According to the model, new immigrants usually first lived in:', ['The zone in transition near the CBD', 'The commuter zone', 'Better residences', 'Rural areas outside the city'], 0, 'Cheap housing near factories.'],
    ['The model shows a process called:', ['Invasion and succession, as groups move outward over time', 'Gentrification only', 'Counter-urbanization', 'Agglomeration'], 0, 'Groups replace one another as they move outward.'],
    ['A criticism of the Burgess model is that it:', ['Is based on one US city and ignores transportation corridors and multiple centers', 'Applies to all cities equally', 'Includes too many zones', 'Ignores the CBD'], 0, 'The sector and multiple-nuclei models responded to this.'],
  ]);
  SW.sourceSet('hg7', 'rostow stages', { passage: 'Model: Rostow\'s Stages of Economic Growth (1960): (1) traditional society, (2) preconditions for take-off, (3) take-off, (4) drive to maturity, (5) high mass consumption.' }, [
    ['A country rapidly building factories in a few industries is most likely in which stage?', ['Take-off', 'Traditional society', 'High mass consumption', 'Drive to maturity'], 0, 'Take-off is when a few industries grow quickly.'],
    ['A common criticism of Rostow\'s model is that it:', ['Assumes all countries follow the path of Western Europe and the US', 'Has too many stages', 'Focuses only on agriculture', 'Was created by a geographer in Africa'], 0, 'It ignores colonial history and dependency.'],
    ['Which theory argues core countries keep periphery countries dependent?', ['Wallerstein\'s world-systems theory', 'Von Thunen\'s model', 'The gravity model', 'Malthusian theory'], 0, 'Core, semi-periphery and periphery.'],
  ]);
  SW.sourceSet('hg3', 'language diffusion', { passage: 'Data: English is spoken by about 1.5 billion people worldwide, but only about 380 million as a first language (approximate). It is an official language in dozens of countries and is widely used in science, aviation, business and the internet.' }, [
    ['English\'s use around the world as a shared language makes it a:', ['Lingua franca', 'Pidgin', 'Isolated language', 'Dialect of Latin'], 0, 'A common language used between people with different first languages.'],
    ['The spread of English through British colonies is an example of:', ['Relocation and expansion diffusion', 'Stimulus diffusion only', 'Isolation', 'Distance decay preventing spread'], 0, 'Colonists carried it; it then spread locally.'],
    ['The more recent spread of English through the internet and business is mainly:', ['Hierarchical and contagious diffusion', 'Relocation diffusion', 'Forced migration', 'Language extinction'], 0, 'It spreads through hubs and then widely.'],
  ]);
  SW.sourceSet('hg4', 'boundaries', { passage: 'Summary: At the Berlin Conference (1884-1885), European powers set rules for claiming African territory. Many resulting boundaries were straight lines that cut across ethnic and linguistic groups.' }, [
    ['Boundaries drawn this way are called:', ['Superimposed (and often geometric) boundaries', 'Relic boundaries', 'Consequent boundaries', 'Antecedent boundaries'], 0, 'Imposed by outside powers.'],
    ['A long-term effect of these boundaries has been:', ['Conflict and separatist movements among divided or combined groups', 'Perfect nation-states', 'An end to all ethnic diversity', 'The creation of the European Union'], 0, 'States often contain rival groups.'],
    ['A boundary that follows a river or mountain range is a:', ['Physical (natural) boundary', 'Geometric boundary', 'Relic boundary', 'Subsequent boundary only'], 0, 'It follows a physical feature.'],
  ]);

  // ======================= WORLD LANGUAGES: interpretive reading =======================
  P('sp4', 'lectura: aplicacion', 'Lectura (escrita para practicar):\n"Una nueva aplicación creada por estudiantes de Monterrey ayuda a los agricultores a saber cuándo regar sus cultivos. Los sensores miden la humedad del suelo y envían una alerta al teléfono. Según los creadores, los agricultores que la usaron ahorraron hasta un 30 % de agua. Ahora buscan fondos para ofrecerla gratis a las familias con menos recursos."', [
    ['¿Cuál es el propósito principal del artículo?', ['Informar sobre una aplicación que ayuda a ahorrar agua', 'Vender teléfonos', 'Criticar a los agricultores', 'Explicar cómo se cultiva el maíz'], 'Presenta la aplicación y sus resultados.'],
    ['Según el artículo, ¿cómo funciona la aplicación?', ['Sensores miden la humedad y envían alertas al teléfono', 'Un satélite riega los cultivos', 'Los agricultores escriben mensajes a los estudiantes', 'Usa cámaras para contar plantas'], 'Sensores de humedad del suelo.'],
    ['¿Qué quieren hacer ahora los creadores?', ['Conseguir dinero para ofrecerla gratis a familias con menos recursos', 'Venderla a otras empresas', 'Cerrar el proyecto', 'Mudarse a otro país'], '"buscan fondos para ofrecerla gratis".'],
  ]);
  P('fr4', 'lecture: la bibliotheque', 'Lecture (écrite pour s\'entraîner) :\n« À partir du 1er septembre, la bibliothèque municipale prêtera aussi des outils : perceuses, scies et machines à coudre. Les habitants pourront les emprunter gratuitement pendant une semaine avec leur carte de lecteur. La mairie espère ainsi réduire le gaspillage et encourager les réparations plutôt que les achats neufs. »', [
    ['Qu\'est-ce qui change à la bibliothèque ?', ['Elle prêtera des outils en plus des livres', 'Elle va fermer', 'Elle vendra des machines à coudre', 'Elle sera ouverte la nuit'], '« prêtera aussi des outils ».'],
    ['Combien de temps peut-on garder un outil ?', ['Une semaine', 'Un jour', 'Un mois', 'Un an'], '« pendant une semaine ».'],
    ['Quel est l\'objectif de la mairie ?', ['Réduire le gaspillage et encourager les réparations', 'Gagner de l\'argent', 'Vendre plus de livres', 'Fermer les magasins de bricolage'], 'Indiqué dans la dernière phrase.'],
  ]);
  P('de4', 'lesen: e-scooter', 'Lesetext (zum Üben geschrieben):\n„Ab Juli dürfen E-Scooter in der Altstadt nur noch auf markierten Flächen abgestellt werden. Wer seinen Roller woanders parkt, muss 20 Euro Strafe zahlen. Die Stadt reagiert damit auf Beschwerden von Fußgängern und Menschen im Rollstuhl, die oft von Rollern auf dem Gehweg blockiert wurden."', [
    ['Was ist ab Juli neu?', ['E-Scooter dürfen nur auf markierten Flächen geparkt werden', 'E-Scooter sind verboten', 'E-Scooter sind kostenlos', 'Die Altstadt wird geschlossen'], '„nur noch auf markierten Flächen".'],
    ['Was passiert, wenn man falsch parkt?', ['Man muss 20 Euro zahlen', 'Man bekommt einen Gutschein', 'Der Roller wird verschenkt', 'Nichts'], '„20 Euro Strafe".'],
    ['Warum führt die Stadt die Regel ein?', ['Fußgänger und Menschen im Rollstuhl haben sich beschwert', 'Die Roller sind zu langsam', 'Touristen wollen mehr Roller', 'Es gibt zu wenig Roller'], 'Beschwerden über blockierte Gehwege.'],
  ]);
  P('it4', 'lettura: orti urbani', 'Lettura (scritta per esercitarsi):\n«Il comune di Bologna ha trasformato un vecchio parcheggio in un orto urbano. Ogni famiglia del quartiere può coltivare un piccolo terreno per due anni. Gli organizzatori dicono che l\'orto non serve solo a produrre verdure, ma anche a far conoscere i vicini tra loro.»', [
    ['Che cosa era prima l\'orto urbano?', ['Un vecchio parcheggio', 'Una scuola', 'Un mercato', 'Un parco giochi'], '«un vecchio parcheggio».'],
    ['Per quanto tempo una famiglia può coltivare il terreno?', ['Due anni', 'Due mesi', 'Una settimana', 'Per sempre'], '«per due anni».'],
    ['Secondo gli organizzatori, qual è un altro vantaggio dell\'orto?', ['Aiuta i vicini a conoscersi', 'Fa guadagnare molti soldi', 'Riduce il traffico', 'Attira turisti stranieri'], '«far conoscere i vicini tra loro».'],
  ]);
  P('zh4', 'reading: library notice', 'Reading (written for practice):\n图书馆通知：从下个星期一开始，图书馆的开放时间改为早上八点到晚上十点。周末开放时间不变。如果你想借电脑，请先在网上预约。谢谢合作！', [
    ['What is changing at the library?', ['Its opening hours on weekdays', 'Its location', 'Its weekend hours', 'The number of books'], '开放时间改为早上八点到晚上十点; weekend unchanged (周末开放时间不变).'],
    ['When will the library close on weekdays from next Monday?', ['10 p.m.', '8 p.m.', '8 a.m.', 'Noon'], '晚上十点 = 10 p.m.'],
    ['What must you do to borrow a computer?', ['Reserve one online first', 'Pay a fee', 'Come on the weekend', 'Ask a teacher'], '请先在网上预约.'],
  ]);
  P('ja4', 'reading: school notice', 'Reading (written for practice):\nお知らせ：来週の金曜日に、学校で文化祭があります。午前九時から午後三時までです。家族や友だちも来ることができます。体育館では、ダンスと音楽の発表があります。', [
    ['What event is being announced?', ['A school culture festival', 'A sports tournament', 'A field trip', 'A school holiday'], '文化祭 = culture festival.'],
    ['Who may attend?', ['Families and friends too', 'Only teachers', 'Only students', 'Only parents of seniors'], '家族や友だちも来ることができます.'],
    ['What will happen in the gym?', ['Dance and music performances', 'A food market', 'A science fair', 'Sports games'], 'ダンスと音楽の発表.'],
  ]);

  // ======================= MUSIC THEORY: notated excerpts =======================
  P('mu3', 'cadence excerpt', 'Excerpt (written as letter names, soprano over bass, final two chords of a phrase in D major):\nChord 1: soprano E5, bass A2, chord A-C#-E\nChord 2: soprano D5, bass D3, chord D-F#-A', [
    ['What cadence ends the phrase?', ['Perfect authentic cadence (V to I with tonic in soprano)', 'Half cadence', 'Plagal cadence', 'Deceptive cadence'], 'V to I, both in root position, soprano ends on the tonic.'],
    ['What is the Roman numeral of chord 1?', ['V', 'IV', 'ii', 'vi'], 'A is the dominant of D.'],
    ['Which note is the leading tone in D major?', ['C#', 'C', 'D', 'G'], 'Scale degree 7.'],
  ]);
  P('mu7', 'secondary dominant excerpt', 'Excerpt in G major (Roman numeral analysis left blank): G major chord, then A-C#-E-G, then D major chord, then G major chord.', [
    ['What is the second chord (A-C#-E-G) in G major?', ['V7/V (a secondary dominant of D)', 'ii7', 'IV7', 'vi7'], 'It contains C#, the leading tone to D.'],
    ['Where does the C# most naturally resolve?', ['Up by half step to D', 'Down to C', 'Up to E', 'It stays on C#'], 'Temporary leading tone.'],
    ['The progression I - V7/V - V - I is an example of:', ['Tonicization of the dominant', 'Modulation to the subdominant', 'A plagal cadence', 'Modal mixture'], 'Briefly treating V as a tonic.'],
  ]);

  // ======================= PSYCHOLOGY: scenarios =======================
  P('ps1', 'neurotransmitter scenario', 'Scenario: After a car nearly hits her, Maya\'s heart pounds, her breathing speeds up and her pupils widen. Minutes later she feels calm again.', [
    ['Which part of the nervous system caused the pounding heart?', ['Sympathetic nervous system', 'Parasympathetic nervous system', 'Somatic nervous system', 'Central nervous system only'], 'Fight-or-flight arousal.'],
    ['Which part returned her body to a calm state?', ['Parasympathetic nervous system', 'Sympathetic nervous system', 'Cerebellum', 'Broca\'s area'], 'Rest-and-digest.'],
    ['Which hormone released by the adrenal glands helps the fight-or-flight response?', ['Epinephrine (adrenaline)', 'Melatonin', 'Insulin', 'Oxytocin'], 'It boosts heart rate and energy.'],
  ]);
  P('ps5', 'diagnosis scenario', 'Scenario: For the past three weeks, Jordan has felt sad nearly every day, lost interest in soccer, slept much more than usual and had trouble concentrating in class.', [
    ['Which diagnosis best fits these symptoms?', ['Major depressive disorder', 'Generalized anxiety disorder', 'Schizophrenia', 'Specific phobia'], 'Two or more weeks of low mood and loss of interest.'],
    ['A cognitive-behavioral therapist would most likely help Jordan by:', ['Identifying and changing negative thought patterns and behaviors', 'Interpreting his dreams', 'Prescribing medication', 'Using only free association'], 'CBT targets thoughts and behaviors.'],
    ['Which neurotransmitter is most often linked to mood and targeted by SSRIs?', ['Serotonin', 'Acetylcholine', 'GABA', 'Endorphins'], 'SSRIs block serotonin reuptake.'],
  ]);
  P('ps4', 'conformity scenario', 'Scenario: In a study, a participant sits with six other people (secretly working for the researcher) who all give the same wrong answer about which line is longest. The participant, answering last, also gives the wrong answer.', [
    ['This study is most similar to the research of:', ['Solomon Asch on conformity', 'Stanley Milgram on obedience', 'Philip Zimbardo on prison roles', 'Albert Bandura on modeling'], 'The classic line-judgment study.'],
    ['The participant\'s behavior is mainly an example of:', ['Normative social influence', 'Informational social influence only', 'Obedience to authority', 'Group polarization'], 'Going along to fit in with the group.'],
    ['Which change would most likely reduce conformity?', ['Having one other person give the correct answer', 'Adding more people who give the wrong answer', 'Making the participant answer out loud', 'Making the group more attractive'], 'A single ally sharply reduces conformity.'],
  ]);

  // ======================= STATISTICS: generated data sets =======================
  SW.dataset('st7', 'confidence interval output', () => {
    // t* for 95% confidence, df = 19 to 39
    const T95 = [2.093, 2.086, 2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042, 2.040, 2.037, 2.035, 2.032, 2.030, 2.028, 2.026, 2.024, 2.023];
    const n = R(20, 40, 1), mean = R(60, 80, 0.1), sd = R(6, 12, 0.1), tstar = T95[n - 1 - 19];
    const se = sd / Math.sqrt(n), lo = mean - tstar * se, hi = mean + tstar * se;
    const f = x => x.toFixed(2);
    return {
      figure: F.table({ title: 'One-sample t interval for the mean resting heart rate (beats per minute) (practice data)', head: ['n', 'Mean', 'StDev', 'SE Mean', '95% CI'], rows: [[n, mean.toFixed(1), sd.toFixed(1), f(se), `(${f(lo)}, ${f(hi)})`]] }),
      qs: [
        ['Which is the correct interpretation of the interval?', [`We are 95% confident the true mean resting heart rate is between ${f(lo)} and ${f(hi)} bpm`, `95% of people have heart rates between ${f(lo)} and ${f(hi)} bpm`, `There is a 95% chance the sample mean is between ${f(lo)} and ${f(hi)}`, `The true mean is exactly ${mean.toFixed(1)} bpm`], 0, 'Confidence is about the population mean, not individuals.'],
        ['What is the margin of error?', [f(tstar * se), f(se), f(sd), f(2 * tstar * se)], 0, 'Half the width of the interval: t* x SE.'],
        ['If the sample size were 4 times larger (same mean and SD), the margin of error would be about:', ['Half as large', 'Twice as large', 'One-fourth as large', 'The same'], 0, 'SE shrinks by a factor of the square root of 4 = 2.'],
      ],
    };
  });
  SW.dataset('st6', 'two-proportion test output', () => {
    const n1 = R(150, 250, 10), n2 = R(150, 250, 10), p1 = R(0.4, 0.6, 0.01), p2 = p1 - R(0.08, 0.15, 0.01);
    const x1 = Math.round(n1 * p1), x2 = Math.round(n2 * p2), ph1 = x1 / n1, ph2 = x2 / n2, pc = (x1 + x2) / (n1 + n2);
    const z = (ph1 - ph2) / Math.sqrt(pc * (1 - pc) * (1 / n1 + 1 / n2));
    const erf = x => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
    const pval = 1 - 0.5 * (1 + erf(z / Math.SQRT2));
    const pv = pval < 0.0001 ? '< 0.0001' : pval.toFixed(4);
    const sig = pval < 0.05;
    return {
      figure: F.table({ title: 'Two-proportion z-test: did a reminder text increase vaccination? H0: p1 = p2, Ha: p1 > p2 (practice data)', head: ['Group', 'Vaccinated', 'n', 'Sample p'], rows: [['1: Reminder', x1, n1, ph1.toFixed(3)], ['2: No reminder', x2, n2, ph2.toFixed(3)]], note: `z = ${z.toFixed(2)}   p-value = ${pv}` }),
      qs: [
        ['At the 0.05 level, what is the correct conclusion?', [sig ? 'Reject H0: there is convincing evidence the reminder increased the vaccination rate' : 'Fail to reject H0: there is not convincing evidence the reminder increased the vaccination rate', sig ? 'Fail to reject H0: there is not convincing evidence the reminder increased the vaccination rate' : 'Reject H0: there is convincing evidence the reminder increased the vaccination rate', 'Accept H0: the reminder had no effect', 'The test proves the reminder causes vaccination in everyone'], 0, `p-value = ${pv} compared with 0.05.`],
        ['What does the p-value measure here?', ['The probability of a difference at least this large if the reminder truly had no effect', 'The probability that H0 is true', 'The probability the reminder works', 'The proportion of people vaccinated'], 0, 'It assumes H0 is true.'],
        ['What is the difference in sample proportions (reminder minus no reminder)?', [(ph1 - ph2).toFixed(3), (ph2 - ph1).toFixed(3), pc.toFixed(3), (ph1 + ph2).toFixed(3)], 0, `${ph1.toFixed(3)} - ${ph2.toFixed(3)}.`],
      ],
    };
  });
  SW.dataset('st1', 'histogram shape', () => {
    const skew = pick(['right', 'left']);
    const base = skew === 'right' ? [3, 9, 14, 10, 6, 4, 2, 1] : [1, 2, 4, 6, 10, 14, 9, 3];
    const counts = base.map(c => c + R(0, 2, 1));
    const bins = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79'];
    return {
      figure: F.bar({ title: skew === 'right' ? 'Minutes spent on homework last night (practice data)' : 'Scores on an easy quiz (practice data)', yLabel: 'Number of students', bars: bins.map((label, i) => ({ label, value: counts[i] })) }),
      qs: [
        ['Which best describes the shape of the distribution?', [`Skewed ${skew}`, `Skewed ${skew === 'right' ? 'left' : 'right'}`, 'Roughly symmetric', 'Uniform'], 0, `The long tail is on the ${skew}.`],
        ['How would the mean most likely compare to the median?', [skew === 'right' ? 'Mean greater than median' : 'Mean less than median', skew === 'right' ? 'Mean less than median' : 'Mean greater than median', 'Mean equal to median', 'Cannot compare them'], 0, 'The mean is pulled toward the tail.'],
        ['Which measures of center and spread are most appropriate here?', ['Median and IQR', 'Mean and standard deviation', 'Mode and range', 'Mean and range'], 0, 'They resist the effect of skew.'],
      ],
    };
  });
  // ======================= AP LATIN =======================
  P('la3', 'sight reading: catullus 85', 'Sight passage: Catullus 85\n"Odi et amo. Quare id faciam, fortasse requiris.\nNescio, sed fieri sentio et excrucior."', [
    ['What is the best translation of "Odi et amo"?', ['I hate and I love', 'I hated and I will love', 'Hate and love me', 'You hate and you love'], 'Both verbs are first person singular present.'],
    ['What does the speaker say in answer to "quare id faciam"?', ['He does not know why, but he feels it happening and is tormented', 'He does it because he is angry', 'He asks the reader to explain it', 'He stops loving'], '"Nescio, sed fieri sentio et excrucior."'],
    ['What mood is "faciam" in, and why?', ['Subjunctive, in an indirect question after "requiris"', 'Indicative, in a main clause', 'Imperative, giving a command', 'Subjunctive, in a purpose clause after "ut"'], '"Quare" introduces an indirect question.'],
  ]);
  P('la3', 'sight reading: cicero first catilinarian', 'Sight passage: Cicero, In Catilinam 1.1 (63 BCE)\n"Quo usque tandem abutere, Catilina, patientia nostra? Quam diu etiam furor iste tuus nos eludet?"', [
    ['What case is "Catilina"?', ['Vocative', 'Nominative', 'Ablative', 'Genitive'], 'Cicero addresses Catiline directly.'],
    ['What case is "patientia," and why?', ['Ablative, because "abutor" takes the ablative', 'Accusative, as a direct object', 'Nominative, as the subject', 'Dative, with a compound verb'], 'Utor, fruor, fungor, potior, vescor and their compounds take the ablative.'],
    ['What rhetorical device opens the speech?', ['Rhetorical questions', 'Chiasmus', 'Litotes', 'Simile'], 'Two indignant questions in a row.'],
  ]);
  P('la1', 'aeneid 1.33', 'Vergil, Aeneid 1.33\n"Tantae molis erat Romanam condere gentem."', [
    ['What is the best translation?', ['So great a task it was to found the Roman people', 'The Roman people were very large', 'The Romans built a great wall', 'It was easy to found Rome'], '"Tantae molis" is a genitive of characteristic (description).'],
    ['What case is "molis"?', ['Genitive', 'Ablative', 'Dative', 'Nominative'], 'Third declension genitive singular of "moles."'],
    ['What form is "condere"?', ['Present active infinitive', 'Perfect passive participle', 'Present subjunctive', 'Future indicative'], 'It is the subject of "erat."'],
  ]);
  P('la2', 'caesar fortissimi belgae', 'Caesar, De Bello Gallico 1.1\n"Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque humanitate provinciae longissime absunt."', [
    ['According to Caesar, who are the bravest of all the Gauls?', ['The Belgae', 'The Aquitani', 'The Helvetii', 'The Romans'], '"fortissimi sunt Belgae."'],
    ['Why does Caesar say they are the bravest?', ['They are farthest from the culture and refinement of the Roman province', 'They have the most soldiers', 'They are closest to Rome', 'They worship Mars'], '"propterea quod ... longissime absunt."'],
    ['What form is "fortissimi"?', ['Superlative adjective, nominative plural', 'Comparative adverb', 'Genitive singular noun', 'Positive adjective, dative singular'], '"fortis, fortior, fortissimus."'],
  ]);
})();
