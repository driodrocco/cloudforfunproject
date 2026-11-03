/* AP European History and AP African American Studies. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const SAQ = (a, b, c) => [[1, `(a) ${a}`], [1, `(b) ${b}`], [1, `(c) ${c}`]];
  const LEQ = [
    [1, 'Thesis/claim: a historically defensible claim that establishes a line of reasoning'],
    [1, 'Contextualization: describes the broader historical context relevant to the prompt'],
    [2, 'Evidence: 1 point for at least two specific examples; 2 points for using specific evidence to support an argument'],
    [1, 'Historical reasoning: uses causation, comparison, or continuity and change to frame the argument'],
    [1, 'Complexity: shows a complex understanding of the development in the prompt'],
  ];

  // ======================= AP EUROPEAN HISTORY =======================
  SW.defineCourse('euro', {
    name: 'AP European History', short: 'Euro', subject: 'History and Social Sciences',
    units: [
      ['eu1', 1, 'Renaissance and Exploration (c. 1450-1648)', '10-15%'],
      ['eu2', 2, 'Age of Reformation (c. 1450-1648)', '10-15%'],
      ['eu3', 3, 'Absolutism and Constitutionalism (c. 1648-1815)', '10-15%'],
      ['eu4', 4, 'Scientific, Philosophical, and Political Developments (c. 1648-1815)', '10-15%'],
      ['eu5', 5, 'Conflict, Crisis, and Reaction in the Late 18th Century', '10-15%'],
      ['eu6', 6, 'Industrialization and Its Effects (c. 1815-1914)', '10-15%'],
      ['eu7', 7, '19th-Century Perspectives and Political Developments', '10-15%'],
      ['eu8', 8, '20th-Century Global Conflicts (c. 1914-present)', '10-15%'],
      ['eu9', 9, 'Cold War and Contemporary Europe (c. 1914-present)', '10-15%'],
    ],
    format: '55 multiple-choice questions (55 min, 40%) + 3 short-answer questions (40 min, 20%) + 1 document-based question (60 min, 25%) + 1 long essay (40 min, 15%)',
    dist: { year: 2025, 5: 14.0, 4: 34.8, 3: 23.9 },
    past: 'https://apcentral.collegeboard.org/courses/ap-european-history/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/world-history',
    calcLabel: 'Key dates',
  });
  SW.dates('eu1', [['Gutenberg\'s printing press (Gutenberg Bible) completed', 1455], ['Columbus reaches the Americas', 1492], ['Machiavelli writes The Prince', 1513]]);
  SW.dates('eu2', [['Martin Luther posts the 95 Theses', 1517], ['The Peace of Augsburg', 1555], ['The Council of Trent opens', 1545], ['The Edict of Nantes', 1598], ['The Peace of Westphalia ends the Thirty Years\' War', 1648]]);
  SW.dates('eu3', [['The Glorious Revolution in England', 1688], ['The English Bill of Rights', 1689], ['Peter the Great becomes tsar', 1682]]);
  SW.dates('eu4', [['Newton publishes the Principia', 1687], ['Copernicus publishes On the Revolutions', 1543], ['Rousseau publishes The Social Contract', 1762]]);
  SW.dates('eu5', [['The French Revolution begins (storming of the Bastille)', 1789], ['Napoleon crowns himself emperor', 1804], ['The Congress of Vienna opens', 1814]]);
  SW.dates('eu6', [['The Communist Manifesto is published', 1848], ['The Great Irish Famine begins', 1845], ['Britain\'s Factory Act limits child labor', 1833]]);
  SW.dates('eu7', [['Revolutions sweep Europe', 1848], ['Italy is unified (Kingdom of Italy proclaimed)', 1861], ['Germany is unified', 1871], ['Darwin publishes On the Origin of Species', 1859]]);
  SW.dates('eu8', [['World War I begins', 1914], ['The Russian Revolution', 1917], ['The Treaty of Versailles', 1919], ['Hitler becomes chancellor of Germany', 1933], ['World War II begins', 1939]]);
  SW.dates('eu9', [['The Marshall Plan begins', 1948], ['NATO is founded', 1949], ['The Berlin Wall is built', 1961], ['The Berlin Wall falls', 1989], ['The Maastricht Treaty creates the EU', 1992]]);

  SW.mcqs('eu1', [
    ['humanism', 'Renaissance humanism emphasized:', ['Rejecting classical learning', 'The study of classical texts and human potential', 'Only church doctrine', 'Feudal loyalty'], 1, 'Humanists revived Greek and Roman learning to improve civic life.'],
    ['printing press', 'The printing press most directly helped:', ['Slow the spread of ideas', 'Spread Reformation and Renaissance ideas quickly and cheaply', 'Strengthen the Catholic Church\'s control over texts', 'End exploration'], 1, 'Pamphlets and Bibles reached far more people.'],
    ['commercial revolution', 'Joint-stock companies and banking during the Commercial Revolution helped:', ['Reduce trade', 'Finance overseas trade and colonization', 'End mercantilism', 'Abolish guilds immediately'], 1, 'Shared investment spread risk for long voyages.'],
  ]);
  SW.mcqs('eu2', [
    ['luther', 'Luther\'s central teaching was that salvation comes through:', ['Good works and indulgences', 'Faith alone (sola fide)', 'Obeying the pope', 'Church sacraments only'], 1, 'He also stressed scripture alone as authority.'],
    ['counter reformation', 'The Catholic Counter-Reformation included:', ['Accepting Protestant doctrine', 'The Council of Trent and the Jesuits', 'Ending the papacy', 'Translating the Bible into English only'], 1, 'Trent clarified doctrine and reformed abuses; Jesuits spread education and missions.'],
    ['westphalia', 'The Peace of Westphalia (1648) is significant because it:', ['United Germany', 'Strengthened state sovereignty and religious coexistence', 'Ended the Hundred Years\' War', 'Created the Holy Roman Empire'], 1, 'It is often seen as the start of the modern state system.'],
  ]);
  SW.mcqs('eu3', [
    ['absolutism', 'Louis XIV controlled the French nobility partly by:', ['Giving them more independent armies', 'Requiring them to live at Versailles under his watch', 'Abolishing them', 'Letting them elect him'], 1, 'Court life kept nobles busy and dependent on royal favor.'],
    ['constitutionalism', 'The Glorious Revolution in England resulted in:', ['An absolute monarchy', 'Parliament\'s supremacy and a Bill of Rights', 'A republic under Cromwell', 'Catholic rule'], 1, 'William and Mary accepted limits set by Parliament.'],
  ]);
  SW.mcqs('eu4', [
    ['scientific revolution', 'The Scientific Revolution challenged:', ['Mathematics', 'Aristotelian and church-supported views of the universe', 'Observation', 'Printing'], 1, 'Copernicus, Galileo and Newton replaced the geocentric model.'],
    ['enlightenment thinkers', 'Locke argued that government should protect natural rights to:', ['Liberty, equality, fraternity', 'Life, liberty and property', 'Religion and order', 'Wealth and power'], 1, 'And people may overthrow a government that fails to do so.'],
  ]);
  SW.mcqs('eu5', [
    ['french revolution causes', 'A major cause of the French Revolution was:', ['Too little debt', 'Royal debt and unfair taxation of the Third Estate', 'British invasion', 'The Reformation'], 1, 'The Estates-General was called to fix the financial crisis.'],
    ['napoleon', 'The Napoleonic Code:', ['Restored feudalism', 'Created legal equality for men and protected property, while limiting women\'s rights', 'Abolished private property', 'Gave all women the vote'], 1, 'It spread revolutionary ideas of equality before the law.'],
  ]);
  SW.mcqs('eu6', [
    ['industrial revolution britain', 'Britain industrialized first partly because of:', ['A lack of coal', 'Coal, iron, capital, colonies and a mobile labor force', 'Rigid guilds', 'No navy'], 1, 'Agricultural improvements also freed labor.'],
    ['marxism', 'Marx predicted that:', ['Capitalism would last forever', 'Class struggle would lead to a proletarian revolution', 'Monarchy would return', 'Workers would become capitalists'], 1, 'History as a struggle between the bourgeoisie and proletariat.'],
  ]);
  SW.mcqs('eu7', [
    ['conservatism metternich', 'Metternich and the Congress of Vienna aimed to:', ['Spread revolution', 'Restore monarchies and the balance of power', 'Unify Germany', 'Abolish monarchy'], 1, 'Conservatism after Napoleon.'],
    ['realpolitik', 'Bismarck\'s realpolitik meant:', ['Politics based on ideals', 'Practical politics based on power and national interest', 'Isolation from Europe', 'Pacifism'], 1, 'He used wars and alliances to unify Germany.'],
  ]);
  SW.mcqs('eu8', [
    ['total war', 'World War I was a "total war" because:', ['Only armies fought', 'Entire economies and societies were mobilized', 'It lasted one year', 'No civilians were affected'], 1, 'Governments controlled production, rationing and propaganda.'],
    ['totalitarianism', 'A key feature of totalitarian states like Stalin\'s USSR was:', ['Free press', 'State control of nearly all aspects of life, with terror and propaganda', 'Multiparty elections', 'Weak police'], 1, 'Single-party rule aimed at total control.'],
  ]);
  SW.mcqs('eu9', [
    ['european integration', 'The European Coal and Steel Community (1951) was a step toward:', ['Cold War conflict', 'European economic integration and the EU', 'Decolonization', 'Communism'], 1, 'Sharing key industries made war between members less likely.'],
    ['1989', 'The revolutions of 1989 in Eastern Europe were largely:', ['Violent everywhere', 'Peaceful movements that ended communist rule in most countries', 'Supported by Soviet tanks', 'Royalist'], 1, 'Gorbachev chose not to intervene; Romania was the violent exception.'],
  ]);
  SW.frq('eu2', 'SAQ: The Protestant Reformation',
    'Answer (a), (b) and (c).\n(a) Describe ONE religious cause of the Protestant Reformation.\n(b) Describe ONE political factor that helped Protestantism spread in the 1500s.\n(c) Explain ONE way the Catholic Church responded to the Reformation.',
    SAQ('Valid religious cause (sale of indulgences, corruption, Luther\'s salvation by faith, scripture over tradition)', 'Valid political factor (German princes protected Luther, wanted independence from the emperor/pope; Henry VIII\'s break with Rome)', 'Valid response explained (Council of Trent, Jesuits, Index of Prohibited Books, Inquisition)'),
    '(a) Luther objected to the sale of indulgences, arguing salvation came through faith alone, not payments to the Church.\n(b) German princes such as Frederick of Saxony protected Luther because breaking with Rome let them seize church lands and resist the Holy Roman Emperor.\n(c) The Council of Trent reaffirmed Catholic doctrine while ending abuses like selling indulgences, and the Jesuits spread Catholic education.');
  SW.frq('eu6', 'LEQ: Industrialization and society',
    'Evaluate the extent to which industrialization changed the lives of European workers in the period 1815 to 1914.',
    LEQ,
    'Sample approach: Context: the British Industrial Revolution spreading to the continent. Thesis: industrialization greatly changed workers\' lives by moving them into crowded cities and factories with harsh discipline, though by 1900 reforms, unions and rising wages improved conditions. Evidence: Manchester slums and cholera, child labor and the Factory Acts, Chartism, Marxism and socialist parties, Bismarck\'s social insurance, rising real wages after 1870. Reasoning: continuity and change over time. Complexity: differences between skilled and unskilled workers, or between Britain and eastern Europe.');
  SW.REF.euro = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Periods</h4><table>
        <tr><td><b>1450-1648:</b> Renaissance, exploration, Reformation, wars of religion</td></tr>
        <tr><td><b>1648-1815:</b> absolutism vs. constitutionalism, Scientific Revolution, Enlightenment, French Revolution, Napoleon</td></tr>
        <tr><td><b>1815-1914:</b> industrialization, ideologies (liberalism, conservatism, socialism, nationalism), unification, imperialism</td></tr>
        <tr><td><b>1914-present:</b> world wars, totalitarianism, Cold War, decolonization, European integration</td></tr></table></div>
      <div class="ref-unit"><h4>Written answers</h4><table>
        <tr><td>SAQ: 3 pts. DBQ: 7 pts (thesis, context, docs x2, outside evidence, sourcing, complexity). LEQ: 6 pts.</td></tr></table></div>
    </div>`;

  // ======================= AP AFRICAN AMERICAN STUDIES =======================
  SW.defineCourse('aas', {
    name: 'AP African American Studies', short: 'AfAm Studies', subject: 'History and Social Sciences',
    units: [
      ['aa1', 1, 'Origins of the African Diaspora', '20-25%'],
      ['aa2', 2, 'Freedom, Enslavement, and Resistance', '25-30%'],
      ['aa3', 3, 'The Practice of Freedom', '25-30%'],
      ['aa4', 4, 'Movements and Debates', '20-25%'],
    ],
    format: '60 multiple-choice questions (70 min, 60%) + 4 free-response questions: 3 short answer and 1 document-based (90 min, 30%) + an individual student project (about 10%). Unit weights here are approximate.',
    dist: { year: 2025, 5: 17.3, 4: 32.5, 3: 29.3, mean: 3.41 },
    past: 'https://apcentral.collegeboard.org/courses/ap-african-american-studies/exam',
    khan: 'https://www.khanacademy.org/humanities/us-history',
    calcLabel: 'Key dates',
  });
  SW.dates('aa1', [['Mansa Musa\'s pilgrimage to Mecca', 1324]]);
  SW.dates('aa2', [['Enslaved Africans arrive at Point Comfort, Virginia', 1619], ['The Stono Rebellion', 1739], ['The Haitian Revolution begins', 1791], ["Nat Turner's rebellion", 1831], ['The Dred Scott decision', 1857]]);
  SW.dates('aa3', [['The Emancipation Proclamation takes effect', 1863], ['Juneteenth: freedom announced in Galveston, Texas', 1865], ['The 13th Amendment is ratified', 1865], ['Tuskegee Institute is founded', 1881], ['Plessy v. Ferguson', 1896], ['The NAACP is founded', 1909]]);
  SW.dates('aa4', [['Brown v. Board of Education', 1954], ['The Montgomery Bus Boycott begins', 1955], ['The Civil Rights Act', 1964], ['The Voting Rights Act', 1965], ['The Black Panther Party is founded', 1966]]);
  SW.mcqs('aa1', [
    ['west african empires', 'The wealth of the Mali Empire was based largely on:', ['Silver mines in the Americas', 'Trans-Saharan trade in gold and salt', 'Industrial factories', 'Atlantic fishing'], 1, 'Control of gold fields and trade routes made Mali rich.'],
    ['timbuktu', 'Timbuktu became famous as a center of:', ['Islamic learning and trade', 'European colonial rule', 'Steam power', 'Christian monasteries'], 0, 'Its mosques and manuscripts drew scholars from across the Muslim world.'],
    ['diaspora', 'The African diaspora refers to:', ['A single African kingdom', 'The dispersal of people of African descent around the world', 'A type of ship', 'A religious council'], 1, 'Much of it was caused by the forced migration of the slave trade.'],
  ]);
  SW.mcqs('aa2', [
    ['middle passage', 'The Middle Passage was:', ['A route across the Sahara', 'The forced voyage of enslaved Africans across the Atlantic', 'A road in Virginia', 'A trade route to India'], 1, 'Conditions were brutal and many died.'],
    ['resistance', 'Which is an example of everyday resistance to slavery?', ['Signing a treaty', 'Working slowly, breaking tools or preserving cultural traditions', 'Voting', 'Joining Congress'], 1, 'Not all resistance was open revolt; daily acts mattered too.'],
    ['underground railroad', 'The Underground Railroad was:', ['A real railroad', 'A network of people and safe houses helping enslaved people escape', 'A government program', 'A Civil War battle'], 1, 'Harriet Tubman made many trips guiding people north.'],
  ]);
  SW.mcqs('aa3', [
    ['reconstruction', 'During Reconstruction, African Americans:', ['Could not vote anywhere', 'Were elected to state legislatures and Congress', 'Were excluded from all schools', 'Moved mostly to Europe'], 1, 'Hiram Revels became the first Black U.S. senator in 1870.'],
    ['jim crow', 'Jim Crow laws:', ['Ended segregation', 'Enforced racial segregation and disfranchisement in the South', 'Gave land to freedpeople', 'Protected voting rights'], 1, 'Poll taxes and literacy tests kept Black citizens from voting.'],
    ['great migration', 'The Great Migration was the movement of millions of African Americans:', ['From the North to the South', 'From the rural South to cities in the North and West', 'To Africa', 'To the Caribbean'], 1, 'They sought jobs and escape from Jim Crow.'],
  ]);
  SW.mcqs('aa4', [
    ['harlem renaissance', 'The Harlem Renaissance was:', ['A political party', 'A flowering of Black art, literature and music in the 1920s', 'A court case', 'A labor strike'], 1, 'Langston Hughes and Zora Neale Hurston are key figures.'],
    ['civil rights strategies', 'The Black Power movement differed from earlier civil rights strategies by emphasizing:', ['Only nonviolence and integration', 'Self-determination, racial pride and community control', 'Leaving the US', 'Ending all protest'], 1, 'Leaders like Stokely Carmichael popularized the term.'],
    ['voting rights act', 'The Voting Rights Act of 1965:', ['Created poll taxes', 'Banned discriminatory voting practices like literacy tests', 'Ended the 15th Amendment', 'Applied only to the North'], 1, 'Black voter registration rose sharply in the South.'],
  ]);
  SW.frq('aa3', 'SAQ: Reconstruction and its limits',
    'Answer (a), (b) and (c).\n(a) Identify ONE right or opportunity African Americans gained during Reconstruction (1865-1877).\n(b) Describe ONE way Southern states limited those gains after 1877.\n(c) Explain ONE way African Americans responded to these limits before 1920.',
    SAQ('Valid gain (citizenship and equal protection under the 14th Amendment, Black men\'s voting rights under the 15th, schools, election to office)', 'Valid limit (Black Codes, poll taxes, literacy tests, grandfather clauses, Jim Crow segregation, lynching)', 'Valid response explained (Great Migration, founding the NAACP, Ida B. Wells\'s anti-lynching campaign, building schools and businesses)'),
    '(a) The 15th Amendment protected Black men\'s right to vote, and hundreds of African Americans were elected to office.\n(b) Southern states used poll taxes and literacy tests to keep Black citizens from voting.\n(c) Ida B. Wells published investigations exposing lynching, and activists founded the NAACP in 1909 to fight segregation in the courts.');
  SW.REF.aas = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Course framework</h4><table>
        <tr><td><b>Unit 1:</b> African societies and empires (Mali, Songhai, Kongo, Great Zimbabwe), early diaspora</td></tr>
        <tr><td><b>Unit 2:</b> the Atlantic slave trade, slavery in the Americas, resistance and abolition</td></tr>
        <tr><td><b>Unit 3:</b> Reconstruction, Jim Crow, the Great Migration, institutions and culture</td></tr>
        <tr><td><b>Unit 4:</b> civil rights, Black Power, the arts, and debates about identity and equity</td></tr></table></div>
      <div class="ref-unit"><h4>Source analysis</h4><table>
        <tr><td>Ask: who created it, when, for what audience and purpose? What does it show, and what does it leave out?</td></tr></table></div>
    </div>`;
})();
