/* World-language and Music Theory task types that Stepwise did not practice before.
 * Spoken tasks: the browser reads each prompt aloud, the student answers out loud
 * and types what they said (Stepwise cannot record audio).
 * Music: dictation and sight-singing use tones generated with the Web Audio API. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const holistic = task => [[5, `Holistic score (0-5), using the AP ${task} scoring guidelines. 5 = strong: completes every part of the task, fully understandable, rich and varied vocabulary, accurate grammar with few errors, appropriate register. 4 = good. 3 = fair: completes the task, generally understandable, appropriate but limited vocabulary, errors that do not block meaning. 2 = weak. 1 = poor. 0 = off task, blank, or mostly in English.`]];
  const SPOKEN = 'Spoken task (practiced in writing): press Listen, answer each prompt out loud in about 20 seconds, then type what you said.';
  const conv = (unit, title, lang, langName, setup, lines, task, model) =>
    SW.frq(unit, title, `${SPOKEN}\n\n${setup}\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n')}`, holistic(task), model, null, { speak: { lang, langName, lines } });
  const present = (unit, title, lang, langName, prompt, task, model) =>
    SW.frq(unit, title, `Spoken task (practiced in writing): you have 4 minutes to prepare and 2 minutes to speak. Say your presentation out loud, then type what you said.\n\n${prompt}`, holistic(task), model, null, { speak: { lang, langName, lines: [prompt] } });

  // ======================= SPANISH =======================
  conv('sp2', 'Conversación (hablada): un festival de música', 'es-ES', 'Spanish',
    'Vas a participar en una conversación con Lucía, una amiga, sobre un festival de música.',
    ['¡Hola! ¿Qué tal? Oye, este sábado hay un festival de música en el parque. ¿Quieres ir conmigo?', '¡Qué bien! ¿Qué tipo de música te gusta más y por qué?', 'Mis padres dicen que las entradas son muy caras. ¿Cómo podemos conseguir el dinero?', '¿Cómo vamos a llegar al parque? ¿Prefieres ir en autobús o en bicicleta?', 'Perfecto. ¿A qué hora nos vemos y dónde?'],
    'Spanish interpersonal speaking (conversation)',
    '1. ¡Hola, Lucía! Sí, me encantaría ir contigo. Hace mucho que no voy a un concierto.\n2. Me gusta más el rock en español porque las letras cuentan historias y me dan energía.\n3. Podríamos cuidar niños o lavar coches este fin de semana. Si ahorramos un poco, tendremos suficiente.\n4. Prefiero ir en bicicleta porque es gratis y no tenemos que esperar el autobús.\n5. Nos vemos a las cuatro delante de la biblioteca, ¿te parece bien?');
  present('sp3', 'Comparación cultural (hablada): el arte público', 'es-ES', 'Spanish',
    'Tema: La belleza y la estética. ¿Qué papel tiene el arte público, como los murales, en tu comunidad? Compara tus observaciones de las comunidades en las que has vivido con tus observaciones de una región del mundo hispanohablante.',
    'Spanish cultural comparison',
    'En mi comunidad el arte público es poco común; hay algunas estatuas en el parque, pero la gente casi no las mira. En cambio, en México los murales tienen un papel muy importante. Después de la Revolución, artistas como Diego Rivera pintaron murales en edificios públicos para enseñar la historia del país a todos, incluso a las personas que no sabían leer. Hoy en día todavía se pintan murales en muchas ciudades mexicanas para expresar la identidad y los problemas sociales. Por lo tanto, mientras que en mi comunidad el arte es más decorativo, en México el arte público sirve para educar y unir a la comunidad.');

  // ======================= FRENCH =======================
  SW.frq('fr6', 'Essai argumentatif : les bouteilles en plastique',
    'Thème : Les défis mondiaux. Faut-il interdire les bouteilles en plastique à usage unique ?\nLisez les sources (écrites pour s\'entraîner) et écrivez un essai argumentatif en français. Présentez votre point de vue, utilisez les trois sources et citez-les (Source 1, Source 2, Source 3).\n\nSource 1 (résumé) : Depuis 2020, la France interdit les gobelets et les assiettes en plastique jetables. Les associations écologistes demandent d\'aller plus loin avec les bouteilles.\nSource 2 (résumé) : Des fabricants affirment que les bouteilles en plastique sont légères et bon marché, et que le recyclage peut résoudre le problème.\nSource 3 (données d\'entraînement) : Taux de recyclage des bouteilles en plastique : 2010 : 45 % ; 2015 : 52 % ; 2020 : 58 %.',
    holistic('French argumentative essay'),
    'Une bonne réponse présente une thèse claire (par exemple : il faut interdire les bouteilles à usage unique, avec une période de transition). Elle s\'appuie sur la Source 1 (la France a déjà interdit d\'autres objets jetables), utilise la Source 3 pour montrer que même en 2020 plus de 40 % des bouteilles ne sont pas recyclées, et répond à la Source 2 en expliquant que le recyclage ne suffit pas et que les gourdes réutilisables sont une alternative bon marché. Elle utilise des connecteurs (d\'abord, en revanche, par conséquent), le subjonctif (il faut que...) et une conclusion.');
  conv('fr2', 'Conversation (orale) : un échange scolaire', 'fr-FR', 'French',
    'Vous allez participer à une conversation avec Julien, un ami, au sujet d\'un échange scolaire.',
    ['Salut ! Tu as entendu parler de l\'échange scolaire avec le Québec ? Tu veux y participer ?', 'Moi aussi ! Qu\'est-ce que tu voudrais faire là-bas ?', 'Mais il faut vivre dans une famille d\'accueil pendant trois semaines. Ça ne te fait pas peur ?', 'Il faut aussi écrire une lettre de motivation. Qu\'est-ce que tu vas y mettre ?', 'Super. On en parle au prof demain ?'],
    'French interpersonal speaking (conversation)',
    '1. Salut Julien ! Oui, j\'en ai entendu parler et j\'aimerais beaucoup y participer.\n2. Je voudrais visiter la vieille ville de Québec et améliorer mon français en parlant avec des jeunes de mon âge.\n3. Un peu, mais je pense que c\'est la meilleure façon de découvrir la culture québécoise. Et je peux appeler ma famille si j\'ai le mal du pays.\n4. Je vais expliquer que j\'étudie le français depuis trois ans et que je veux devenir plus autonome.\n5. Bonne idée ! On peut aller le voir après le cours de maths.');
  present('fr1', 'Comparaison culturelle (orale) : les repas en famille', 'fr-FR', 'French',
    'Thème : La famille et la communauté. Quel est le rôle des repas en famille dans votre communauté ? Comparez vos observations des communautés où vous avez vécu avec vos observations d\'une région du monde francophone.',
    'French cultural comparison',
    'Dans ma communauté, beaucoup de familles mangent rapidement, souvent à des heures différentes à cause du travail et des activités. En France, par contre, le repas en famille reste un moment important : on mange ensemble, souvent à heure fixe, et le repas peut durer longtemps, surtout le dimanche. Le « repas gastronomique des Français » est même inscrit au patrimoine culturel immatériel de l\'UNESCO depuis 2010. Ainsi, alors que chez moi le repas sert surtout à se nourrir, en France il sert aussi à renforcer les liens familiaux.');

  // ======================= GERMAN =======================
  SW.frq('de6', 'Argumentativer Aufsatz: Solaranlagen auf Schulen',
    'Thema: Globale Herausforderungen. Sollte jede Schule Solaranlagen auf dem Dach haben?\nLesen Sie die Quellen (zum Üben geschrieben) und schreiben Sie einen argumentativen Aufsatz auf Deutsch. Stellen Sie Ihre Meinung dar, benutzen Sie alle drei Quellen und zitieren Sie sie (Quelle 1, Quelle 2, Quelle 3).\n\nQuelle 1 (Zusammenfassung): Ein Bericht zeigt, dass eine Schule mit Solaranlage etwa ein Drittel ihres Stroms selbst produziert und dadurch Geld spart.\nQuelle 2 (Zusammenfassung): Kritiker sagen, die Installation sei teuer, und das Geld solle lieber für Lehrkräfte und Bücher ausgegeben werden.\nQuelle 3 (Daten, gerundet): Anteil erneuerbarer Energien am Stromverbrauch in Deutschland: 2010: 17 %, 2015: 31 %, 2020: 45 %.',
    holistic('German argumentative essay'),
    'Eine gute Antwort hat eine klare These (zum Beispiel: Ja, Schulen sollten Solaranlagen haben). Sie benutzt Quelle 1 (die Schule spart Geld und produziert ein Drittel ihres Stroms), Quelle 3 (der Anteil erneuerbarer Energien steigt, also passt die Schule zu diesem Trend) und antwortet auf Quelle 2 (die Kosten sind am Anfang hoch, aber die Ersparnisse bezahlen später Bücher und Lehrkräfte). Sie benutzt Konnektoren (erstens, außerdem, trotzdem, deshalb), Nebensätze mit richtiger Wortstellung und einen Schluss.');
  conv('de2', 'Gespräch (mündlich): eine Überraschungsparty', 'de-DE', 'German',
    'Sie führen ein Gespräch mit Lena, einer Freundin, über eine Party.',
    ['Hallo! Nächsten Freitag hat Jonas Geburtstag. Wollen wir eine Überraschungsparty organisieren?', 'Super Idee! Wo sollen wir die Party feiern?', 'Was sollen wir ihm schenken? Er hat ja schon fast alles.', 'Ich kann leider erst um acht Uhr kommen. Kannst du die Dekoration übernehmen?', 'Danke! Wen sollen wir noch einladen?'],
    'German interpersonal speaking (conversation)',
    '1. Hallo Lena! Ja, das ist eine tolle Idee. Jonas wird sich bestimmt freuen.\n2. Wir könnten bei mir im Garten feiern, weil es dort genug Platz gibt.\n3. Vielleicht schenken wir ihm Konzertkarten, denn er hört so gern Musik.\n4. Klar, ich kümmere mich um die Dekoration. Ich kaufe Luftballons und Girlanden.\n5. Wir sollten seine Freunde aus dem Fußballverein und seine Cousine einladen.');
  present('de4', 'Kultureller Vergleich (mündlich): soziale Medien', 'de-DE', 'German',
    'Thema: Wissenschaft und Technologie. Wie beeinflussen soziale Medien das Leben von Jugendlichen in Ihrer Gemeinde? Vergleichen Sie Ihre Beobachtungen der Gemeinden, in denen Sie gelebt haben, mit Ihren Beobachtungen einer Region der deutschsprachigen Welt.',
    'German cultural comparison',
    'In meiner Gemeinde benutzen fast alle Jugendlichen jeden Tag soziale Medien, oft mehrere Stunden lang, und viele Schulen erlauben Handys in den Pausen. In Deutschland sind soziale Medien bei Jugendlichen auch sehr beliebt, aber es gibt mehr Diskussionen über Datenschutz, und einige Bundesländer haben Regeln für die private Handynutzung an Grundschulen eingeführt. Außerdem verbringen viele deutsche Jugendliche ihre Freizeit in Vereinen, zum Beispiel im Sportverein. Deshalb sind soziale Medien in beiden Kulturen wichtig, aber in Deutschland gibt es mehr Grenzen und mehr Alternativen.');

  // ======================= ITALIAN =======================
  SW.frq('it6', 'Saggio argomentativo: il turismo di massa',
    'Tema: Le sfide mondiali. Il turismo di massa fa più male che bene alle città d\'arte?\nLeggi le fonti (scritte per esercitarsi) e scrivi un saggio argomentativo in italiano. Presenta la tua opinione, usa tutte e tre le fonti e citale (Fonte 1, Fonte 2, Fonte 3).\n\nFonte 1 (riassunto): Nel 2024 Venezia ha introdotto un contributo d\'accesso per i visitatori giornalieri in alcuni giorni dell\'anno.\nFonte 2 (riassunto): Albergatori e ristoratori dicono che il turismo crea migliaia di posti di lavoro.\nFonte 3 (dati, circa): Abitanti del centro storico di Venezia: 1951: circa 175.000; 2023: meno di 50.000.',
    holistic('Italian argumentative essay'),
    'Una buona risposta presenta una tesi chiara (per esempio: il turismo di massa fa più male che bene se non viene regolato). Usa la Fonte 3 (gli abitanti del centro storico sono diminuiti moltissimo), la Fonte 1 (Venezia ha dovuto introdurre un contributo d\'accesso) e risponde alla Fonte 2 (il turismo crea lavoro, ma un turismo più sostenibile può mantenere i posti di lavoro senza cacciare i residenti). Usa connettivi (innanzitutto, inoltre, tuttavia, quindi), il congiuntivo (penso che sia...) e una conclusione.');
  conv('it2', 'Conversazione (orale): pulire la spiaggia', 'it-IT', 'Italian',
    'Parteciperai a una conversazione con Marco, un amico, su un\'attività di volontariato.',
    ['Ciao! Sabato prossimo puliamo la spiaggia con un gruppo di volontari. Vuoi venire?', 'Fantastico! Hai mai fatto volontariato? Racconta.', 'Dobbiamo portare qualcosa? Cosa pensi che serva?', 'Dopo la pulizia andiamo a mangiare una pizza. Ti va?', 'Perfetto. Ci vediamo alle nove davanti alla stazione?'],
    'Italian interpersonal speaking (conversation)',
    '1. Ciao Marco! Sì, vengo volentieri. Mi piace aiutare l\'ambiente.\n2. Sì, l\'anno scorso ho aiutato in una biblioteca per bambini: leggevo storie ogni sabato.\n3. Penso che servano guanti, sacchetti della spazzatura e tanta acqua, perché farà caldo.\n4. Certo, mi va! Dopo tanto lavoro avremo fame.\n5. Va benissimo, alle nove davanti alla stazione. A sabato!');
  present('it3', 'Confronto culturale (orale): la moda', 'it-IT', 'Italian',
    'Tema: La bellezza e l\'estetica. Che ruolo ha la moda nella tua comunità? Confronta le tue osservazioni delle comunità in cui hai vissuto con le tue osservazioni di una regione del mondo italiano.',
    'Italian cultural comparison',
    'Nella mia comunità la maggior parte dei giovani si veste in modo comodo e sportivo, e la moda non è molto importante nella vita quotidiana. In Italia, invece, la moda ha un ruolo centrale: Milano è una delle capitali mondiali della moda, con la Settimana della Moda e marchi famosi. Molti italiani curano il proprio aspetto anche per andare al lavoro o a fare la passeggiata la sera. Quindi, mentre nella mia comunità la moda è soprattutto pratica, in Italia è anche una parte importante dell\'identità e dell\'economia.');

  // ======================= CHINESE =======================
  SW.frq('zh2', 'Email response (written)',
    'Read this email from a friend and write a reply in Chinese (simplified or traditional characters). Answer all of the questions.\n\n主题：夏令营\n你好！我听说你今年夏天要参加一个中文夏令营。你为什么想参加？你觉得在北京学习好还是在上海学习好？为什么？我下个月也想去，你能给我一些建议吗？\n李明',
    holistic('Chinese email response'),
    '李明，你好！\n谢谢你的邮件。我想参加中文夏令营，因为我想提高我的中文口语，也想多了解中国文化。我觉得在北京学习比较好，因为北京有很多名胜古迹，比如长城和故宫，而且那里的人说普通话很标准。我给你的建议是：去以前多练习听力，还要带一些舒服的鞋子，因为每天都要走很多路。祝你一切顺利！\n[名字]');
  conv('zh1', 'Conversation (spoken): a culture festival', 'zh-CN', 'Chinese',
    'You will have a conversation with a classmate about a school culture festival.',
    ['你好！下个星期我们学校有一个中国文化节，你想参加吗？', '太好了！你想在文化节上表演什么节目？', '听说文化节有很多中国菜。你最喜欢吃什么中国菜？为什么？', '我们需要一些志愿者帮忙。你周末有空吗？', '谢谢！你觉得我们应该怎么邀请更多的同学来参加？'],
    'Chinese conversation',
    '1. 你好！我很想参加，我对中国文化很感兴趣。\n2. 我想表演中国歌，因为我在中文课上学过几首歌。\n3. 我最喜欢吃饺子，因为饺子很好吃，而且包饺子的时候可以跟朋友一起聊天。\n4. 我星期六有空，可以帮忙布置会场。\n5. 我觉得我们可以做海报，也可以在学校的网站上发通知。');
  present('zh3', 'Cultural presentation (spoken)', 'zh-CN', 'Chinese',
    'Choose ONE Chinese cultural practice or product, for example the Spring Festival, the Mid-Autumn Festival, or calligraphy. In your presentation (in Chinese), describe this cultural practice or product and explain its significance.',
    'Chinese cultural presentation',
    '我要介绍的是中秋节。中秋节在农历八月十五，是中国最重要的传统节日之一。中秋节的时候，家人会一起吃月饼、赏月。月亮在这一天又大又圆，圆代表团圆，所以中秋节对中国人来说是一个家人团聚的节日。很多在外地工作的人也会回家跟家人一起过节。中秋节的意义是表达对家人的思念和对生活的美好希望。');

  // ======================= JAPANESE =======================
  SW.frq('ja3', 'Story narration (written)',
    'Write a story in Japanese based on these four scenes, in order. Give it a beginning, middle and end.\n1) A girl finds a small dog alone in the park.\n2) She reads a phone number on the dog\'s collar.\n3) She calls the number, and the owner runs to the park.\n4) The owner thanks her and gives her a small gift.',
    holistic('Japanese story narration'),
    'ある日、ゆきさんは公園で小さい犬を見つけました。犬は一人でないていました。ゆきさんは犬のくびわに電話番号が書いてあるのを見ました。それで、すぐにその番号に電話をかけました。しばらくして、犬の飼い主が公園まで走って来ました。飼い主はとても喜んで、「本当にありがとうございました」と言って、ゆきさんに小さいプレゼントをくれました。ゆきさんもうれしくなりました。');
  conv('ja1', 'Conversation (spoken): weekend plans', 'ja-JP', 'Japanese',
    'You will have a conversation with Tanaka-san, a Japanese classmate, about weekend plans.',
    ['こんにちは。週末は何をする予定ですか。', 'そうですか。私は日曜日に映画を見に行きます。一緒に行きませんか。', 'どんな映画が好きですか。どうしてですか。', '映画の後で、何を食べたいですか。', 'じゃあ、何時にどこで会いましょうか。'],
    'Japanese conversation',
    '1. こんにちは。土曜日は宿題をして、それから友達とテニスをするつもりです。\n2. ありがとうございます。ぜひ一緒に行きたいです。\n3. アニメの映画が好きです。絵がきれいで、話がおもしろいからです。\n4. ラーメンが食べたいです。駅の近くにおいしい店がありますよ。\n5. 一時に駅の前で会いましょう。');
  present('ja4', 'Cultural perspective presentation (spoken)', 'ja-JP', 'Japanese',
    'Choose ONE Japanese cultural practice or product, for example the tea ceremony, origami, or New Year (oshogatsu). In your presentation (in Japanese), describe it and explain its significance.',
    'Japanese cultural perspective presentation',
    '私は日本のお正月について話します。お正月は一年で一番大切な行事です。家族が集まって、おせち料理を食べたり、神社やお寺に初もうでに行ったりします。子どもはお年玉をもらいます。おせち料理には、健康や長生きなどの願いがこめられています。ですから、お正月は新しい年の幸せを願い、家族のきずなを大切にする行事だと思います。');

  // ======================= MUSIC THEORY =======================
  // MIDI note numbers: C4 = 60. Chords are arrays of notes played together.
  const tonicC = { label: 'Tonic chord (C major)', bpm: 60, notes: [[[60, 64, 67], 2]] };
  SW.frq('mu2', 'Melodic dictation',
    'Two short melodies, each in 4/4 with quarter notes and a final half note. First play the tonic chord, then play each melody up to 4 times.\n(a) Melody 1 is in C major and starts on the tonic. Write the scale degrees of all 8 notes (for example: 1 2 3 ...).\n(b) Melody 2 is in G major and starts on scale degree 5 (above the tonic). Write the scale degrees of all 8 notes.\nIf you prefer, also write the letter names.',
    [[4, '(a) 1 2 3 1 4 3 2 1 (1 point for every 2 correct pitches in order)'], [4, '(b) 5 3 4 2 3 1 7 1 (1 point for every 2 correct pitches in order; 7 is below the final tonic)']],
    '(a) 1 2 3 1 4 3 2 1 (C D E C F E D C)\n(b) 5 3 4 2 3 1 7 1 (D B C A B G F# G), with 7 (F#) just below the final tonic',
    null, { audio: [tonicC,
      { label: 'Melody 1', bpm: 80, notes: [[60, 1], [62, 1], [64, 1], [60, 1], [65, 1], [64, 1], [62, 1], [60, 2]] },
      { label: 'Tonic chord (G major)', bpm: 60, notes: [[[55, 59, 62], 2]] },
      { label: 'Melody 2', bpm: 80, notes: [[74, 1], [71, 1], [72, 1], [69, 1], [71, 1], [67, 1], [66, 1], [67, 2]] }] });
  SW.frq('mu4', 'Harmonic dictation',
    'Two progressions in C major, played as block chords. Play the tonic chord, then each progression up to 4 times.\n(a) Progression 1 has 5 chords. Write the scale degrees of the bass and soprano, and the Roman numeral of each chord.\n(b) Progression 2 has 6 chords, including inversions. Write the scale degrees of the bass and soprano, and the Roman numeral (with inversion) of each chord.',
    [[4, '(a) Bass 1 6 4 5 1; soprano 5 6 6 5 5; I vi IV V I (1 point for bass, 1 for soprano, 2 for Roman numerals)'], [4, '(b) Bass 1 7 1 4 5 1; soprano 1 2 1 2 7 1; I V6 I ii6 V I (1 point for bass, 1 for soprano, 2 for Roman numerals)']],
    '(a) Bass: 1 6 4 5 1. Soprano: 5 6 6 5 5. Roman numerals: I vi IV V I.\n(b) Bass: 1 7 1 4 5 1. Soprano: 1 2 1 2 7 1. Roman numerals: I V6 I ii6 V I.',
    null, { audio: [tonicC,
      { label: 'Progression 1', bpm: 50, notes: [[[48, 60, 64, 67], 1.5], [[45, 60, 64, 69], 1.5], [[41, 60, 65, 69], 1.5], [[43, 59, 62, 67], 1.5], [[48, 60, 64, 67], 2.5]] },
      { label: 'Progression 2', bpm: 50, notes: [[[48, 64, 67, 72], 1.5], [[47, 62, 67, 74], 1.5], [[48, 64, 67, 72], 1.5], [[41, 62, 69, 74], 1.5], [[43, 62, 67, 71], 1.5], [[48, 64, 67, 72], 2.5]] }] });
  SW.frq('mu5', 'Part-writing from figured bass',
    'Realize this figured bass in C major in four voices (SATB). Bass notes and figures:\n1. C3 (no figure)\n2. D3, figure 6\n3. E3, figure 6\n4. F3 (no figure)\n5. G3, figure 7\n6. C3 (no figure)\nFor each chord, write the soprano, alto and tenor notes (for example: S C5, A E4, T G3), and give the Roman numeral. Follow common-practice voice leading: resolve tendency tones, avoid parallel fifths and octaves, and keep good spacing.',
    [[6, 'Correct chords with complete or properly incomplete voicings for all 6 chords: I, vii(dim)6, I6, IV, V7, I (1 point each)'], [6, 'Voice leading: leading tone resolves up, chordal seventh prepared and resolved down, no parallel fifths or octaves, good spacing and ranges (1 point per chord connection, plus 1 for the cadence)'], [3, 'Roman numerals with correct inversion figures']],
    'Roman numerals: I - vii(dim)6 - I6 - IV - V7 - I\n1. I: S C5, A E4, T G3, B C3\n2. vii(dim)6: S B4, A F4, T D4, B D3 (third doubled)\n3. I6: S C5, A G4, T C4, B E3 (root doubled; F moves up to G because the bass moves to E in parallel tenths)\n4. IV: S C5, A F4, T A3, B F3 (F prepares the seventh of V7)\n5. V7: S B4, A F4, T D4, B G3 (complete V7)\n6. I: S C5, A E4, T C4, B C3 (leading tone B to C, seventh F to E; incomplete I with tripled root is normal after a complete V7)',
    null, { audio: [
      { label: 'Bass line', bpm: 70, notes: [[48, 1], [50, 1], [52, 1], [53, 1], [55, 1], [48, 2]] },
      { label: 'Model realization (check after you finish)', bpm: 55, notes: [[[48, 55, 64, 72], 1], [[50, 62, 65, 71], 1], [[52, 60, 67, 72], 1], [[53, 57, 65, 72], 1], [[55, 62, 65, 71], 1], [[48, 60, 64, 72], 2]] }] });
  SW.frq('mu6', 'Harmonization of a melody',
    'Harmonize this soprano melody in C major by writing a bass line and Roman numerals. Melody: E5 - F5 - G5 - C5 - B4 - C5.\nUse a variety of chords, end with an authentic cadence, and avoid parallel fifths and octaves between the soprano and bass.',
    [[3, 'Each chord contains its soprano note, and the progression is functional (tonic, predominant, dominant)'], [2, 'Ends with an authentic cadence (V or V7 to I) on the last two chords'], [2, 'Bass line has no parallel fifths or octaves with the soprano and moves mostly by step or with contrary motion'], [2, 'Roman numerals correctly match the bass notes and inversions']],
    'One good answer:\nSoprano: E5  F5  G5  C5  B4  C5\nBass:    C3  F3  E3  F3  G3  C3\nRoman:   I   IV  I6  IV  V   I\nCheck: the outer voices form 10th, octave, 10th, 12th, 10th, octave, and every perfect interval is approached by contrary or oblique motion. Other correct answers are possible (for example ii6 instead of the second IV).',
    null, { audio: [{ label: 'Melody', bpm: 70, notes: [[76, 1], [77, 1], [79, 1], [72, 1], [71, 1], [72, 2]] }] });
  SW.frq('mu1', 'Sight-singing (self-check)',
    'Key of F major, 4/4. Melody in scale degrees: 1 3 5 3 4 2 7 1 (F A C A B-flat G E F), all quarter notes except a half note at the end.\nPlay the starting pitch once. Take 75 seconds to practice silently, then sing the melody once on any syllable or solfege. Then play the check and compare.\nType a short self-assessment: which notes were off, and was your tempo steady?',
    [[8, 'Self-score: 1 point for each pitch sung correctly in the right rhythm (8 notes)'], [1, 'Steady tempo throughout']],
    'Notes: F A C A B-flat G E F (do mi sol mi fa re ti do). Watch the leap from do up to sol and the leading tone ti (E) resolving up to do.',
    null, { audio: [
      { label: 'Starting pitch (F)', bpm: 60, notes: [[65, 2]] },
      { label: 'Check: the melody', bpm: 80, notes: [[65, 1], [69, 1], [72, 1], [69, 1], [70, 1], [67, 1], [64, 1], [65, 2]] }] });
})();
