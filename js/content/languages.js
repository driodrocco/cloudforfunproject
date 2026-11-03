/* AP World Languages: Spanish, French, German, Italian, Chinese, Japanese,
 * Latin, and Spanish Literature. Original practice passages, vocabulary,
 * grammar, and writing tasks graded with the AP 0-5 holistic scale.
 * Latin and Spanish Literature use public-domain texts. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const THEMES = ['Families and Communities', 'Personal and Public Identities', 'Beauty and Aesthetics', 'Science and Technology', 'Contemporary Life', 'Global Challenges'];
  const themeUnits = p => THEMES.map((t, i) => [`${p}${i + 1}`, i + 1, t, '15-18%']);
  const LANG_FORMAT = 'Section I: 65 multiple-choice questions on reading and listening (95 min, 50%). Section II: email reply, argumentative essay, conversation, cultural comparison (about 85 min, 50%). Unit weights are approximate: the six themes are spread across the exam.';
  const ASIAN_FORMAT = 'Section I: about 70 multiple-choice questions on listening and reading (80 min, 50%). Section II: story narration and email response in writing, conversation and cultural presentation in speaking (about 35 min, 50%). Unit weights are approximate.';

  const holistic = task => [[5, `Holistic score (0-5), using the AP ${task} scoring guidelines. 5 = strong: completes every part of the task, fully understandable, rich and varied vocabulary, accurate grammar with few errors, appropriate register. 4 = good. 3 = fair: completes the task, generally understandable, appropriate but limited vocabulary, errors that do not block meaning. 2 = weak. 1 = poor. 0 = off task, blank, or mostly in English.`]];
  const CB = slug => `https://apcentral.collegeboard.org/courses/${slug}/exam/past-exam-questions`;

  // ======================= SPANISH =======================
  SW.defineCourse('spanish', {
    name: 'AP Spanish Language and Culture', short: 'Spanish', subject: 'World Languages',
    units: themeUnits('sp'), format: LANG_FORMAT,
    dist: { year: 2025, 5: 21.9, 4: 31.9, 3: 31.1 },
    past: CB('ap-spanish-language-and-culture'), khan: 'https://www.spanishdict.com/guide',
  });
  SW.vocab('Spanish', [
    ['sp1', 'la crianza', 'upbringing'], ['sp1', 'el vecindario', 'neighborhood'], ['sp1', 'los lazos familiares', 'family ties'],
    ['sp2', 'el orgullo', 'pride'], ['sp2', 'la herencia', 'heritage'], ['sp2', 'el bilingüismo', 'bilingualism'],
    ['sp3', 'la artesanía', 'handicrafts'], ['sp3', 'la obra maestra', 'masterpiece'], ['sp3', 'el patrimonio', 'cultural inheritance'],
    ['sp4', 'la investigación', 'research'], ['sp4', 'el desarrollo', 'development'], ['sp4', 'el invento', 'invention'],
    ['sp5', 'el ocio', 'leisure time'], ['sp5', 'la jornada laboral', 'workday'], ['sp5', 'el voluntariado', 'volunteer work'],
    ['sp6', 'el medio ambiente', 'environment'], ['sp6', 'la sequía', 'drought'], ['sp6', 'la pobreza', 'poverty'],
  ]);
  SW.passage('sp1', `Cada sábado, Lucía y su abuelo caminan juntos al mercado del barrio. Él le enseña a escoger las frutas más frescas y a saludar a los vendedores por su nombre. "En este mercado conocí a tu abuela", le dice siempre. Para Lucía, esas mañanas no son solo para comprar: son una lección sobre la comunidad y la memoria de su familia.`, [
    ['reading detail', '¿Qué hacen Lucía y su abuelo los sábados?', ['Van juntos al mercado', 'Visitan a la abuela', 'Trabajan en una tienda', 'Estudian en la biblioteca'], 0, 'El texto dice que "caminan juntos al mercado del barrio".'],
    ['reading detail', '¿Qué le enseña el abuelo a Lucía?', ['A cocinar platos típicos', 'A escoger frutas y a saludar a los vendedores', 'A vender frutas', 'A manejar un carro'], 1, 'Aprende a escoger frutas frescas y a saludar por su nombre.'],
    ['main idea', '¿Cuál es la idea principal del texto?', ['El mercado es muy caro', 'Las visitas al mercado conectan a Lucía con su comunidad y su familia', 'Lucía no quiere ir al mercado', 'El abuelo trabaja como vendedor'], 1, 'Las mañanas son "una lección sobre la comunidad y la memoria de su familia".'],
  ]);
  SW.mcqs('sp5', [
    ['subjunctive', 'Espero que tú ___ a la fiesta el viernes.', ['vengas', 'vienes', 'vendrás', 'venir'], 0, '"Esperar que" expresses a wish, so it takes the present subjunctive.'],
    ['conditional', 'Si tuviera más tiempo, ___ un instrumento.', ['aprendo', 'aprendería', 'aprenderé', 'aprendí'], 1, 'Si + imperfect subjunctive pairs with the conditional.'],
    ['preterite imperfect', 'Cuando era niña, ___ al parque todos los días.', ['fui', 'iba', 'voy', 'iré'], 1, 'Habitual past actions use the imperfect.'],
  ]);
  SW.frq('sp5', 'Email reply (Correo electrónico)',
    'Responde al siguiente correo. Saluda, contesta todas las preguntas, pide más información sobre algo mencionado y despídete. Usa un registro formal.\n\nDe: Coordinadora del Programa de Voluntariado\nAsunto: Tu solicitud\n\nEstimado/a estudiante: Gracias por tu interés en nuestro programa de voluntariado en el centro comunitario. Para completar tu solicitud, por favor responde: ¿Por qué quieres participar en este programa? ¿Qué habilidades puedes ofrecer a la comunidad? Esperamos tu respuesta. Atentamente, Sra. Morales',
    holistic('Spanish email reply'),
    'Estimada Sra. Morales:\nLe agradezco mucho su mensaje. Quiero participar en el programa porque me importa mi comunidad y deseo ayudar a los niños del barrio con sus tareas. Puedo ofrecer mi experiencia como tutor de matemáticas y hablo inglés y español, así que puedo traducir para las familias. Me gustaría saber, ¿cuántas horas por semana necesitan voluntarios y en qué días? Quedo atento/a a su respuesta.\nAtentamente,\n[Nombre]');
  SW.frq('sp6', 'Argumentative essay (Ensayo argumentativo)',
    'Tema: ¿Deben las ciudades prohibir los coches en el centro?\nLee las fuentes (resúmenes escritos para practicar) y escribe un ensayo persuasivo en español. Presenta tu punto de vista, usa información de las fuentes y cítalas (Fuente 1, Fuente 2).\n\nFuente 1 (resumen): Un informe municipal indica que, después de cerrar el centro a los coches los domingos, la contaminación del aire bajó un 20% y aumentaron los paseos a pie.\nFuente 2 (resumen): Una asociación de comerciantes advierte que muchos clientes llegan en coche y teme que las ventas bajen si se prohíben los vehículos.',
    holistic('Spanish argumentative essay'),
    'Una buena respuesta presenta una tesis clara (por ejemplo, que las ciudades deben prohibir los coches en el centro con excepciones), usa la Fuente 1 (menos contaminación, más peatones) para apoyarla, reconoce la preocupación de la Fuente 2 sobre las ventas y la refuta (por ejemplo, con transporte público y estacionamientos fuera del centro), y concluye. Usa conectores (además, sin embargo, por lo tanto) y una variedad de tiempos verbales y el subjuntivo.');

  // ======================= FRENCH =======================
  SW.defineCourse('french', {
    name: 'AP French Language and Culture', short: 'French', subject: 'World Languages',
    units: themeUnits('fr'), format: LANG_FORMAT,
    dist: { year: 2025, 5: 14.0, 4: 25.0, 3: 34.5 },
    past: CB('ap-french-language-and-culture'), khan: 'https://www.tv5monde.com/apprendre-francais',
  });
  SW.vocab('French', [
    ['fr1', 'le quartier', 'neighborhood'], ['fr1', 'les liens familiaux', 'family ties'], ['fr1', 'élever', 'to raise (a child)'],
    ['fr2', 'la fierté', 'pride'], ['fr2', 'le patrimoine', 'heritage'], ['fr2', 'appartenir', 'to belong'],
    ['fr3', 'le chef-d\'oeuvre', 'masterpiece'], ['fr3', 'la mode', 'fashion'], ['fr3', 'le savoir-faire', 'know-how'],
    ['fr4', 'la recherche', 'research'], ['fr4', 'un ordinateur', 'a computer'], ['fr4', 'une découverte', 'a discovery'],
    ['fr5', 'les loisirs', 'leisure activities'], ['fr5', 'le bénévolat', 'volunteer work'], ['fr5', 'un emploi', 'a job'],
    ['fr6', 'le réchauffement climatique', 'global warming'], ['fr6', 'la pauvreté', 'poverty'], ['fr6', 'les déchets', 'waste'],
  ]);
  SW.passage('fr6', `Dans notre lycée, les élèves ont lancé un projet contre le gaspillage alimentaire. Chaque midi, ils pèsent les restes de la cantine et affichent les résultats dans le couloir. En trois mois, la quantité de nourriture jetée a diminué de moitié. Le directeur a décidé d'utiliser l'argent économisé pour acheter des produits locaux.`, [
    ['reading detail', 'Quel est le but du projet des élèves?', ['Organiser une fête', 'Réduire le gaspillage alimentaire', 'Construire une nouvelle cantine', 'Vendre des produits locaux'], 1, 'Le texte parle d\'un projet "contre le gaspillage alimentaire".'],
    ['reading detail', 'Quel a été le résultat après trois mois?', ['La nourriture jetée a diminué de moitié', 'La cantine a fermé', 'Les élèves mangent moins', 'Les prix ont augmenté'], 0, '"La quantité de nourriture jetée a diminué de moitié."'],
  ]);
  SW.mcqs('fr5', [
    ['subjonctif', 'Il faut que tu ___ tes devoirs avant le dîner.', ['fais', 'fasses', 'feras', 'faire'], 1, '"Il faut que" takes the subjunctive.'],
    ['passé composé', 'Hier, nous ___ au cinéma.', ['sommes allés', 'avons allé', 'allons', 'irons'], 0, '"Aller" uses être in the passé composé, and agrees with the subject.'],
  ]);
  SW.frq('fr5', 'Email reply (Réponse à un courriel)',
    'Répondez à ce courriel. Saluez, répondez à toutes les questions, demandez des détails sur quelque chose de mentionné et terminez poliment. Utilisez un registre formel.\n\nDe : Service des stages, Mairie de Lyon\nObjet : Votre candidature\n\nMadame, Monsieur, nous avons bien reçu votre demande de stage d\'été à la mairie. Pourriez-vous nous dire pourquoi ce stage vous intéresse et quelles langues vous parlez ? Cordialement, M. Durand',
    holistic('French email reply'),
    'Monsieur Durand,\nJe vous remercie de votre message. Ce stage m\'intéresse parce que je voudrais découvrir le fonctionnement d\'une mairie et aider les habitants. Je parle anglais, français et un peu d\'espagnol. Pourriez-vous me préciser les horaires du stage et s\'il est rémunéré ?\nVeuillez agréer, Monsieur, mes salutations distinguées.\n[Nom]');

  // ======================= GERMAN =======================
  SW.defineCourse('german', {
    name: 'AP German Language and Culture', short: 'German', subject: 'World Languages',
    units: themeUnits('de'), format: LANG_FORMAT,
    dist: { year: 2025, 5: 21.3, 4: 24.5, 3: 25.7 },
    past: CB('ap-german-language-and-culture'), khan: 'https://learngerman.dw.com',
  });
  SW.vocab('German', [
    ['de1', 'die Nachbarschaft', 'neighborhood'], ['de1', 'die Erziehung', 'upbringing'], ['de1', 'der Zusammenhalt', 'togetherness'],
    ['de2', 'die Heimat', 'homeland'], ['de2', 'der Stolz', 'pride'], ['de2', 'die Zugehörigkeit', 'belonging'],
    ['de3', 'das Kunstwerk', 'work of art'], ['de3', 'die Baukunst', 'architecture'], ['de3', 'die Mode', 'fashion'],
    ['de4', 'die Forschung', 'research'], ['de4', 'die Erfindung', 'invention'], ['de4', 'der Fortschritt', 'progress'],
    ['de5', 'die Freizeit', 'free time'], ['de5', 'der Beruf', 'profession'], ['de5', 'das Ehrenamt', 'volunteer work'],
    ['de6', 'der Umweltschutz', 'environmental protection'], ['de6', 'die Armut', 'poverty'], ['de6', 'der Klimawandel', 'climate change'],
  ]);
  SW.passage('de6', `In vielen deutschen Städten gibt es jetzt "Repair-Cafés". Dort treffen sich Nachbarn einmal im Monat, um kaputte Geräte gemeinsam zu reparieren, zum Beispiel Toaster, Fahrräder oder Lampen. Die Idee ist einfach: weniger wegwerfen und voneinander lernen. Viele Besucher sagen, dass sie dort auch neue Freunde gefunden haben.`, [
    ['reading detail', 'Was machen die Leute in einem Repair-Café?', ['Sie kaufen neue Geräte', 'Sie reparieren gemeinsam kaputte Sachen', 'Sie trinken nur Kaffee', 'Sie verkaufen Fahrräder'], 1, '"...um kaputte Geräte gemeinsam zu reparieren."'],
    ['main idea', 'Was ist die Idee der Repair-Cafés?', ['Weniger wegwerfen und voneinander lernen', 'Geld verdienen', 'Neue Geräte testen', 'Touristen anziehen'], 0, 'Der Text sagt es direkt.'],
  ]);
  SW.mcqs('de5', [
    ['cases', 'Ich gebe ___ Bruder ein Geschenk.', ['der', 'den', 'dem', 'des'], 2, '"Geben" takes the dative for the receiver: dem Bruder.'],
    ['word order', 'Which sentence has correct word order?', ['Ich weiß, dass er morgen kommt.', 'Ich weiß, dass er kommt morgen.', 'Ich weiß, dass kommt er morgen.', 'Ich weiß, er dass morgen kommt.'], 0, 'In a "dass" clause the conjugated verb goes to the end.'],
  ]);
  SW.frq('de5', 'Email reply (E-Mail-Antwort)',
    'Beantworten Sie diese E-Mail. Begrüßen Sie, beantworten Sie alle Fragen, fragen Sie nach mehr Details und verabschieden Sie sich. Benutzen Sie die formelle Anrede.\n\nVon: Jugendherberge Hamburg\nBetreff: Ihre Reservierung\n\nSehr geehrte/r Gast, vielen Dank für Ihre Reservierung. Bitte teilen Sie uns mit: Wann kommen Sie an, und haben Sie besondere Wünsche für das Frühstück? Mit freundlichen Grüßen, Frau Becker',
    holistic('German email reply'),
    'Sehr geehrte Frau Becker,\nvielen Dank für Ihre Nachricht. Ich komme am Freitag gegen 18 Uhr mit dem Zug an. Zum Frühstück esse ich vegetarisch, also wäre ich für Müsli oder Käse dankbar. Könnten Sie mir bitte sagen, ob es in der Nähe eine Bushaltestelle gibt?\nMit freundlichen Grüßen\n[Name]');

  // ======================= ITALIAN =======================
  SW.defineCourse('italian', {
    name: 'AP Italian Language and Culture', short: 'Italian', subject: 'World Languages',
    units: themeUnits('it'), format: LANG_FORMAT,
    dist: { year: 2025, 5: 24.6, 4: 24.8, 3: 25.9 },
    past: CB('ap-italian-language-and-culture'), khan: 'https://www.raiplay.it',
  });
  SW.vocab('Italian', [
    ['it1', 'il quartiere', 'neighborhood'], ['it1', 'i nonni', 'grandparents'], ['it1', 'crescere', 'to grow up'],
    ['it2', "l'orgoglio", 'pride'], ['it2', "l'eredità", 'inheritance'], ['it2', 'appartenere', 'to belong'],
    ['it3', "il capolavoro", 'masterpiece'], ['it3', 'la moda', 'fashion'], ['it3', "l'artigianato", 'craftsmanship'],
    ['it4', 'la ricerca', 'research'], ['it4', "l'invenzione", 'invention'], ['it4', 'lo sviluppo', 'development'],
    ['it5', 'il tempo libero', 'free time'], ['it5', 'il lavoro', 'work'], ['it5', 'il volontariato', 'volunteer work'],
    ['it6', "l'ambiente", 'environment'], ['it6', 'la povertà', 'poverty'], ['it6', 'il riscaldamento globale', 'global warming'],
  ]);
  SW.passage('it1', `Ogni domenica la famiglia Rossi pranza insieme a casa della nonna. Anche se i nipoti abitano in città diverse, nessuno vuole perdere questo appuntamento. La nonna prepara le lasagne e tutti raccontano le novità della settimana. Per i Rossi, il pranzo della domenica è il cuore della famiglia.`, [
    ['reading detail', 'Dove pranza la famiglia Rossi la domenica?', ['Al ristorante', 'A casa della nonna', 'In città', 'A scuola'], 1, '"...a casa della nonna."'],
    ['main idea', 'Che cosa rappresenta il pranzo della domenica per i Rossi?', ['Un obbligo noioso', 'Il cuore della famiglia', 'Una festa religiosa', 'Un lavoro'], 1, 'L\'ultima frase lo dice.'],
  ]);
  SW.mcqs('it5', [
    ['passato prossimo', 'Ieri Maria ___ al mare.', ['è andata', 'ha andato', 'va', 'andrà'], 0, '"Andare" uses essere, and the participle agrees with Maria.'],
    ['congiuntivo', 'Penso che lui ___ ragione.', ['ha', 'abbia', 'avrà', 'avere'], 1, '"Penso che" expresses opinion and takes the subjunctive.'],
  ]);
  SW.frq('it5', 'Email reply (Risposta a una email)',
    'Rispondi a questa email. Saluta, rispondi a tutte le domande, chiedi più informazioni su qualcosa e congedati. Usa un registro formale.\n\nDa: Scuola di Cucina "La Tavola"\nOggetto: Corso estivo\n\nGentile studente, grazie per il suo interesse nel nostro corso di cucina. Ci può dire che esperienza ha in cucina e quali piatti vorrebbe imparare? Cordiali saluti, Chef Bianchi',
    holistic('Italian email reply'),
    'Gentile Chef Bianchi,\nla ringrazio per la sua email. Ho poca esperienza: di solito aiuto mia madre a preparare la pasta fresca. Vorrei imparare a fare il risotto e i dolci tipici. Potrebbe dirmi quanto costa il corso e quante ore dura ogni lezione?\nCordiali saluti,\n[Nome]');

  // ======================= CHINESE =======================
  SW.defineCourse('chinese', {
    name: 'AP Chinese Language and Culture', short: 'Chinese', subject: 'World Languages',
    units: themeUnits('zh'), format: ASIAN_FORMAT,
    dist: { year: 2025, 5: 54.9, 4: 18.2, 3: 16.1 },
    past: CB('ap-chinese-language-and-culture'), khan: 'https://www.mdbg.net/chinese/dictionary',
  });
  SW.vocab('Chinese', [
    ['zh1', '家庭 (jiātíng)', 'family'], ['zh1', '邻居 (línjū)', 'neighbor'], ['zh2', '传统 (chuántǒng)', 'tradition'], ['zh2', '文化 (wénhuà)', 'culture'],
    ['zh3', '艺术 (yìshù)', 'art'], ['zh3', '书法 (shūfǎ)', 'calligraphy'], ['zh4', '科技 (kējì)', 'technology'], ['zh4', '手机 (shǒujī)', 'cell phone'],
    ['zh5', '节日 (jiérì)', 'festival'], ['zh5', '健康 (jiànkāng)', 'health'], ['zh6', '环境 (huánjìng)', 'environment'], ['zh6', '污染 (wūrǎn)', 'pollution'],
  ]);
  SW.passage('zh5', `春节是中国最重要的传统节日。每年春节，很多人都会回家和家人一起吃年夜饭。孩子们会收到红包，大家也会贴春联。现在，有些人还用手机发电子红包。`, [
    ['reading detail', 'According to the passage, what do many people do during the Spring Festival?', ['Travel abroad', 'Go home and eat New Year\'s Eve dinner with family', 'Work extra hours', 'Visit the doctor'], 1, '"回家和家人一起吃年夜饭" means going home to eat the New Year\'s Eve dinner with family.'],
    ['reading detail', 'What modern practice does the passage mention?', ['Sending electronic red envelopes by phone', 'Watching movies online', 'Buying fireworks online', 'Writing emails'], 0, '"用手机发电子红包" = sending electronic red envelopes with a phone.'],
  ]);
  SW.frq('zh5', 'Story narration (written)',
    'Write a story in Chinese (simplified or traditional characters) based on these four scenes, in order. Give it a beginning, middle and end.\n1) A student is late and running to the bus stop.\n2) The bus is pulling away.\n3) A neighbor stops and offers the student a ride.\n4) The student arrives at school on time and thanks the neighbor.',
    holistic('Chinese story narration'),
    '早上，小明起晚了，他急忙跑去公共汽车站。可是他到的时候，公共汽车已经开走了。小明很着急。这时候，他的邻居王阿姨开车经过，问他要不要搭车。小明高兴地上了车。最后，他准时到了学校，他对王阿姨说："谢谢您帮了我的大忙！"');

  // ======================= JAPANESE =======================
  SW.defineCourse('japanese', {
    name: 'AP Japanese Language and Culture', short: 'Japanese', subject: 'World Languages',
    units: themeUnits('ja'), format: ASIAN_FORMAT,
    dist: { year: 2025, 5: 43.3, 4: 11.3, 3: 20.2 },
    past: CB('ap-japanese-language-and-culture'), khan: 'https://jisho.org',
  });
  SW.vocab('Japanese', [
    ['ja1', '家族 (kazoku)', 'family'], ['ja1', '友達 (tomodachi)', 'friend'], ['ja2', '伝統 (dentou)', 'tradition'], ['ja2', '文化 (bunka)', 'culture'],
    ['ja3', '季節 (kisetsu)', 'season'], ['ja3', '料理 (ryouri)', 'cooking'], ['ja4', '技術 (gijutsu)', 'technology'], ['ja4', '電車 (densha)', 'train'],
    ['ja5', '旅行 (ryokou)', 'travel'], ['ja5', '健康 (kenkou)', 'health'], ['ja6', '環境 (kankyou)', 'environment'], ['ja6', '地震 (jishin)', 'earthquake'],
  ]);
  SW.passage('ja3', `日本では、春になると多くの人が花見をします。家族や友達と桜の木の下でお弁当を食べたり、写真を撮ったりします。花見は春の大切な伝統です。`, [
    ['reading detail', 'What do many people in Japan do in spring, according to the passage?', ['Go skiing', 'Have hanami (cherry blossom viewing)', 'Visit the beach', 'Start school exams'], 1, '"花見をします" = they do hanami.'],
    ['reading detail', 'What do people do under the cherry trees?', ['Sleep', 'Eat bento lunches and take photos', 'Plant new trees', 'Study'], 1, '"お弁当を食べたり、写真を撮ったりします."'],
  ]);
  SW.frq('ja5', 'Email response (written)',
    'Reply in Japanese to this email from a host family you will stay with. Answer the questions and ask one question of your own.\n\n件名：ホームステイについて\nこんにちは。来月、私たちの家に来てくれるのを楽しみにしています。食べられない物はありますか。日本で何をしたいですか。山田より',
    holistic('Japanese email response'),
    '山田さん、\nメールをありがとうございます。私も楽しみにしています。食べられない物は特にありませんが、辛い物はあまり好きではありません。日本では、お寺を見たり、日本料理を習ったりしたいです。家の近くに駅はありますか。\nよろしくお願いします。\n[名前]');

  // ======================= LATIN =======================
  SW.defineCourse('latin', {
    name: 'AP Latin', short: 'Latin', subject: 'World Languages',
    units: [
      ['la1', 1, "Vergil's Aeneid", '25-35%'],
      ['la2', 2, "Caesar's Gallic War", '25-35%'],
      ['la3', 3, 'Sight Reading', '20-30%'],
      ['la4', 4, 'Grammar and Syntax', '10-20%'],
    ],
    format: '50 multiple-choice questions on syllabus and sight passages (60 min, 50%) + 4 free-response questions: 2 translations, an analytical essay and a short-answer set (2 hr, 50%). Unit weights are approximate.',
    dist: { year: 2025, 5: 12.5, 4: 16.7, 3: 29.4 },
    past: CB('ap-latin'), khan: 'https://dcc.dickinson.edu/vergil-aeneid/vergil-aeneid-preface',
  });
  const AEN = 'Vergil, Aeneid 1.1-4\n\nArma virumque cano, Troiae qui primus ab oris\nItaliam, fato profugus, Laviniaque venit\nlitora, multum ille et terris iactatus et alto\nvi superum saevae memorem Iunonis ob iram;';
  SW.passage('la1', AEN, [
    ['verb form', 'In line 1, "cano" is:', ['First person singular present: "I sing"', 'Third person plural: "they sing"', 'An infinitive: "to sing"', 'A noun: "song"'], 0, 'The -o ending marks first person singular present.'],
    ['translation', '"fato profugus" (line 2) is best translated:', ['"fleeing fate"', '"an exile by fate"', '"the fate of an exile"', '"to the exile\'s fate"'], 1, '"fato" is ablative of cause/means; "profugus" describes Aeneas.'],
    ['content', 'Whose anger (iram) drives Aeneas\'s hardships in line 4?', ['Jupiter\'s', 'Juno\'s', 'Venus\'s', 'Neptune\'s'], 1, '"saevae memorem Iunonis ob iram": because of the mindful anger of cruel Juno.'],
    ['poetic device', 'The phrase "et terris iactatus et alto" uses:', ['Chiasmus', 'Polysyndeton (et...et) to stress land AND sea', 'Onomatopoeia', 'Tricolon crescens'], 1, 'The doubled "et" emphasizes how widely he was tossed.'],
  ]);
  const GAL = 'Caesar, De Bello Gallico 1.1\n\nGallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.';
  SW.passage('la2', GAL, [
    ['content', 'Into how many parts is Gaul divided?', ['Two', 'Three', 'Four', 'It is not divided'], 1, '"in partes tres."'],
    ['relative pronoun', 'The antecedent of "quarum" is:', ['Gallia', 'partes', 'Belgae', 'Aquitani'], 1, 'Feminine plural genitive, agreeing with "partes."'],
    ['ellipsis', 'In "nostra Galli appellantur," "nostra" modifies an understood:', ['lingua', 'Gallia', 'pars', 'tertia'], 0, '"ipsorum lingua... nostra [lingua]": in their own language Celts, in ours Gauls.'],
  ]);
  SW.mcqs('la4', [
    ['ablative absolute', '"Urbe capta, milites discesserunt" is best translated:', ['"The city captured the soldiers"', '"After the city was captured, the soldiers left"', '"The soldiers captured the city and left"', '"The soldiers left the captured city"'], 1, 'Urbe capta is an ablative absolute.'],
    ['purpose clause', '"Venit ut amicum videret" contains:', ['A result clause', 'A purpose clause: "He came to see his friend"', 'An indirect question', 'A conditional'], 1, 'ut + subjunctive after a verb of motion shows purpose.'],
    ['case use', 'In "Marcus librum puellae dat," "puellae" is:', ['Nominative plural', 'Dative: "to the girl"', 'Genitive: "of the girl"', 'Vocative'], 1, 'The indirect object of "dat" is in the dative.'],
  ]);
  SW.frq('la2', 'Translation: Caesar, Gallic War 1.1',
    'Translate the passage from Caesar shown above as literally as possible into English.',
    [[1, 'Gallia est omnis divisa: "All Gaul is divided"'], [1, 'in partes tres: "into three parts"'], [1, 'quarum unam incolunt Belgae: "of which the Belgae inhabit one"'], [1, 'aliam Aquitani: "the Aquitani (inhabit) another"'], [1, 'tertiam qui ipsorum lingua Celtae: "(those) who in their own language (are called) Celts (inhabit) the third"'], [1, 'nostra Galli appellantur: "in ours are called Gauls"']],
    'All Gaul is divided into three parts, one of which the Belgae inhabit, another the Aquitani, and the third those who in their own language are called Celts, in ours Gauls.',
    null, GAL);

  // ======================= SPANISH LITERATURE =======================
  SW.defineCourse('spanlit', {
    name: 'AP Spanish Literature and Culture', short: 'Spanish Lit', subject: 'World Languages',
    units: [
      ['sl1', 1, 'Medieval Period and Golden Age', '20-30%'],
      ['sl2', 2, 'Romanticism, Realism and Modernism', '15-25%'],
      ['sl3', 3, '20th and 21st Century Literature', '25-35%'],
      ['sl4', 4, 'Literary Analysis and Comparison', '20-30%'],
    ],
    format: '65 multiple-choice questions on literary passages and audio (80 min, 50%) + 4 free-response questions: 2 short answer, a text analysis and a text comparison (100 min, 50%). Units here are grouped by period and are approximate.',
    dist: { year: 2025, 5: 9.1, 4: 23.6, 3: 37.7 },
    past: CB('ap-spanish-literature-and-culture'), khan: 'https://www.cervantesvirtual.com',
  });
  const QUIJOTE = 'Miguel de Cervantes, Don Quijote de la Mancha (1605), comienzo\n\nEn un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.';
  SW.passage('sl1', QUIJOTE, [
    ['narrador', '¿Qué efecto tiene la frase "de cuyo nombre no quiero acordarme"?', ['Muestra que el narrador no sabe nada', 'Crea un tono irónico y juguetón del narrador', 'Indica que la historia es falsa', 'Describe el paisaje'], 1, 'El narrador decide no decir el nombre, lo cual crea complicidad e ironía.'],
    ['caracterizacion', 'Los detalles "rocín flaco" y "adarga antigua" sugieren que el hidalgo:', ['Es rico y poderoso', 'Es pobre y vive con objetos viejos', 'Es un soldado moderno', 'Vive en la ciudad'], 1, 'Un caballo flaco y un escudo viejo muestran su pobreza.'],
  ]);
  const SORJUANA = 'Sor Juana Inés de la Cruz, "Hombres necios que acusáis" (fines del siglo XVII), primeros versos\n\nHombres necios que acusáis\na la mujer sin razón,\nsin ver que sois la ocasión\nde lo mismo que culpáis';
  SW.passage('sl1', SORJUANA, [
    ['tema', '¿Qué critica la voz poética en estos versos?', ['La belleza de las mujeres', 'La hipocresía de los hombres que culpan a las mujeres', 'La religión', 'La vida en el campo'], 1, 'Los hombres causan lo mismo que critican.'],
    ['apostrofe', 'Hablarle directamente a "Hombres necios" es un ejemplo de:', ['Apóstrofe', 'Metáfora', 'Hipérbaton', 'Onomatopeya'], 0, 'La voz poética se dirige a un destinatario ausente o general.'],
  ]);
  SW.frq('sl1', 'Análisis de texto: Sor Juana',
    'Lee los versos de Sor Juana Inés de la Cruz que aparecen arriba. En un ensayo en español, analiza cómo la autora usa recursos literarios para presentar su crítica de la sociedad de su época. Usa ejemplos del texto.',
    holistic('Spanish Literature text analysis'),
    'Una respuesta fuerte presenta una tesis (por ejemplo, que Sor Juana usa el apóstrofe y la antítesis para denunciar el doble estándar masculino), analiza el apóstrofe "Hombres necios", la paradoja de que los hombres son "la ocasión / de lo mismo que culpáis", y el tono acusatorio, y relaciona el poema con el contexto colonial y la limitada libertad de la mujer en el siglo XVII.',
    null, SORJUANA);

  // ======================= reference sheets =======================
  const langRef = (tips, extra = '') => () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>The six themes</h4><table>${THEMES.map(t => `<tr><td>${t}</td></tr>`).join('')}</table></div>
      <div class="ref-unit"><h4>Writing tasks (scored 0-5)</h4><table>
        <tr><td><b>Email reply:</b> greeting, answer every question, ask for more details, formal closing. Use formal "you".</td></tr>
        <tr><td><b>Argumentative essay:</b> clear thesis, cite every source, connectors, varied tenses.</td></tr>
        <tr><td><b>Speaking:</b> practice out loud: Stepwise cannot record audio, so time yourself (20 seconds per conversation turn, 2 minutes for a cultural comparison).</td></tr></table></div>
      <div class="ref-unit"><h4>Useful connectors</h4><table><tr><td>${tips}</td></tr></table></div>
      ${extra}
    </div>`;
  SW.REF.spanish = langRef('además, sin embargo, por lo tanto, en cambio, por un lado... por otro lado, es decir, en conclusión');
  SW.REF.french = langRef('de plus, cependant, donc, en revanche, d\'une part... d\'autre part, c\'est-à-dire, en conclusion');
  SW.REF.german = langRef('außerdem, jedoch, deshalb, im Gegensatz dazu, einerseits... andererseits, das heißt, zusammenfassend');
  SW.REF.italian = langRef('inoltre, tuttavia, quindi, invece, da un lato... dall\'altro, cioè, in conclusione');
  SW.REF.chinese = langRef('首先 (first), 然后 (then), 但是 (but), 因为...所以 (because...so), 虽然...但是 (although...), 总之 (in short)');
  SW.REF.japanese = langRef('まず (first), それから (then), でも (but), だから (so), たとえば (for example), つまり (in other words)');
  SW.REF.latin = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Required readings</h4><table><tr><td>Vergil, Aeneid: selections from Books 1, 2, 4 and 6</td></tr><tr><td>Caesar, De Bello Gallico: selections from Books 1, 4, 5 and 6</td></tr></table></div>
      <div class="ref-unit"><h4>Syntax to know</h4><table>
        <tr><td>Ablative absolute; purpose and result clauses (ut, ne); indirect statement (accusative + infinitive); indirect question; cum clauses; conditionals; gerunds and gerundives; relative clauses of characteristic</td></tr></table></div>
      <div class="ref-unit"><h4>Poetic devices</h4><table>
        <tr><td>Anaphora, apostrophe, asyndeton, chiasmus, ellipsis, enjambment, hendiadys, hyperbaton, litotes, metonymy, polysyndeton, simile, synchesis, tricolon crescens</td></tr>
        <tr><td>Meter: dactylic hexameter (Aeneid)</td></tr></table></div>
      <div class="ref-unit"><h4>Translation scoring</h4><table><tr><td>The passage is split into segments; each correctly translated segment earns a point. Be literal and keep every word.</td></tr></table></div>
    </div>`;
  SW.REF.spanlit = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Recursos literarios</h4><table>
        <tr><td>Metáfora, símil, personificación, apóstrofe, hipérbaton, antítesis, paradoja, ironía, anáfora, aliteración, encabalgamiento</td></tr></table></div>
      <div class="ref-unit"><h4>Movimientos</h4><table>
        <tr><td>Edad Media, Siglo de Oro, Romanticismo, Realismo, Naturalismo, Modernismo, Generación del 98, Vanguardias, Boom latinoamericano, realismo mágico</td></tr></table></div>
      <div class="ref-unit"><h4>Análisis</h4><table><tr><td>Tesis clara, citas del texto, explica CÓMO los recursos crean significado, relaciona con el contexto histórico y cultural.</td></tr></table></div>
    </div>`;
})();
