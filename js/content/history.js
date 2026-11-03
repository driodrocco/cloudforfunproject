/* AP US History and AP World History: Modern. Key-date drills, concept
 * questions, SAQ / DBQ / LEQ practice with the College Board rubric structure,
 * and period reference sheets. Documents are summaries written for practice. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const FORMAT = '55 multiple-choice questions (55 min, 40%) + 3 short-answer questions (40 min, 20%) + 1 document-based question (60 min, 25%) + 1 long essay (40 min, 15%)';

  // Shared rubrics
  const SAQ = (a, b, c) => [[1, `(a) ${a}`], [1, `(b) ${b}`], [1, `(c) ${c}`]];
  const DBQ = [
    [1, 'Thesis/claim: a historically defensible claim that establishes a line of reasoning'],
    [1, 'Contextualization: describes the broader historical context relevant to the prompt'],
    [2, 'Evidence from documents: 1 point for describing the content of at least 3 documents; 2 points for using at least 4 documents to support an argument'],
    [1, 'Evidence beyond the documents: uses at least one additional specific piece of evidence not in the documents'],
    [1, 'Sourcing: explains how or why the point of view, purpose, historical situation or audience of at least 2 documents is relevant to the argument'],
    [1, 'Complexity: shows a complex understanding (multiple causes, both similarity and difference, change and continuity, or corroborating/qualifying evidence)'],
  ];
  const LEQ = [
    [1, 'Thesis/claim: a historically defensible claim that establishes a line of reasoning'],
    [1, 'Contextualization: describes the broader historical context relevant to the prompt'],
    [2, 'Evidence: 1 point for at least two specific examples; 2 points for using specific evidence to support an argument'],
    [1, 'Historical reasoning: uses causation, comparison, or continuity and change to frame the argument'],
    [1, 'Complexity: shows a complex understanding of the development in the prompt'],
  ];

  const writingRef = `
    <div class="ref-unit"><h4>How written answers are scored</h4><table>
      <tr><td><b>SAQ (3 pts):</b> one point per part. Answer directly, give a specific example, explain it. No thesis needed.</td></tr>
      <tr><td><b>DBQ (7 pts):</b> thesis 1, contextualization 1, document evidence 2 (describe 3 / use 4), outside evidence 1, sourcing (HIPP) 1, complexity 1.</td></tr>
      <tr><td><b>LEQ (6 pts):</b> thesis 1, contextualization 1, evidence 2, historical reasoning 1, complexity 1.</td></tr>
      <tr><td><b>HIPP sourcing:</b> Historical situation, Intended audience, Purpose, Point of view.</td></tr></table></div>`;

  // ======================= AP US HISTORY =======================
  SW.defineCourse('apush', {
    name: 'AP US History', short: 'APUSH', subject: 'History and Social Sciences',
    units: [
      ['us1', 1, 'Period 1: 1491-1607', '4-6%'],
      ['us2', 2, 'Period 2: 1607-1754', '6-8%'],
      ['us3', 3, 'Period 3: 1754-1800', '10-17%'],
      ['us4', 4, 'Period 4: 1800-1848', '10-17%'],
      ['us5', 5, 'Period 5: 1844-1877', '10-17%'],
      ['us6', 6, 'Period 6: 1865-1898', '10-17%'],
      ['us7', 7, 'Period 7: 1890-1945', '10-17%'],
      ['us8', 8, 'Period 8: 1945-1980', '10-17%'],
      ['us9', 9, 'Period 9: 1980-Present', '4-6%'],
    ],
    format: FORMAT,
    dist: { year: 2025, 5: 14.1, 4: 36.2, 3: 23.3, mean: 3.3 },
    past: 'https://apcentral.collegeboard.org/courses/ap-united-states-history/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/us-history',
    calcLabel: 'Key dates',
  });

  SW.dates('us1', [['Columbus reaches the Caribbean', 1492], ['Treaty of Tordesillas', 1494], ['Cortes conquers Tenochtitlan', 1521], ['Spain founds St. Augustine, Florida', 1565]]);
  SW.dates('us2', [['Jamestown is founded', 1607], ['The Mayflower Compact is signed', 1620], ["Bacon's Rebellion", 1676], ['The Pueblo Revolt', 1680], ['The Salem witch trials', 1692], ['The Stono Rebellion', 1739]]);
  SW.dates('us3', [['The French and Indian War begins', 1754], ['The Proclamation Line is issued', 1763], ['The Stamp Act', 1765], ['The Declaration of Independence', 1776], ['The Treaty of Paris ends the Revolution', 1783], ['The Constitution is signed', 1787], ['The Whiskey Rebellion', 1794]]);
  SW.dates('us4', [['The Louisiana Purchase', 1803], ['Marbury v. Madison', 1803], ['The War of 1812 begins', 1812], ['The Missouri Compromise', 1820], ['The Monroe Doctrine', 1823], ['The Indian Removal Act', 1830], ['The Seneca Falls Convention', 1848]]);
  SW.dates('us5', [['The Mexican-American War begins', 1846], ['The Compromise of 1850', 1850], ['The Kansas-Nebraska Act', 1854], ['The Dred Scott decision', 1857], ['The Civil War begins at Fort Sumter', 1861], ['The Emancipation Proclamation takes effect', 1863], ['Reconstruction ends', 1877]]);
  SW.dates('us6', [['The transcontinental railroad is completed', 1869], ['The Chinese Exclusion Act', 1882], ['The Dawes Act', 1887], ['The Interstate Commerce Act', 1887], ['The Sherman Antitrust Act', 1890], ['Plessy v. Ferguson', 1896]]);
  SW.dates('us7', [['The Spanish-American War', 1898], ['The US enters World War I', 1917], ['The 19th Amendment is ratified', 1920], ['The stock market crash', 1929], ['The Social Security Act', 1935], ['The attack on Pearl Harbor', 1941]]);
  SW.dates('us8', [['The Truman Doctrine', 1947], ['Brown v. Board of Education', 1954], ['The Montgomery Bus Boycott begins', 1955], ['The Civil Rights Act', 1964], ['The Voting Rights Act', 1965], ['The Watergate break-in', 1972]]);
  SW.dates('us9', [['Ronald Reagan is elected president', 1980], ['The Berlin Wall falls', 1989], ['NAFTA takes effect', 1994], ['The September 11 attacks', 2001], ['The financial crisis and Great Recession', 2008], ['The Affordable Care Act becomes law', 2010]]);

  SW.mcqs('us1', [
    ['columbian exchange', 'The most devastating effect of the Columbian Exchange on Native Americans was:', ['The introduction of horses', 'Epidemic diseases such as smallpox', 'The spread of maize', 'New trade routes to Asia'], 1, 'Native peoples had no immunity, and populations collapsed.'],
    ['encomienda', 'The Spanish encomienda system:', ['Granted colonists the labor of Native people in exchange for "protection" and Christian teaching', 'Gave land to Native Americans', 'Ended slavery in the colonies', 'Created a democratic assembly'], 0, 'In practice it forced Native people into labor.'],
    ['native societies', 'Before 1492, maize cultivation in the Southwest and Mississippi Valley helped lead to:', ['Nomadic hunting bands only', 'Permanent settlements and more complex societies', 'Contact with Europe', 'A decline in population'], 1, 'Reliable food supported villages and trade networks.'],
  ]);
  SW.mcqs('us2', [
    ['chesapeake colonies', 'The economy of the Chesapeake colonies was built mainly on:', ['Fishing', 'Tobacco grown with indentured and then enslaved labor', 'Fur trading with the Dutch', 'Wheat and small family farms only'], 1, 'Tobacco was the cash crop; labor shifted to slavery after Bacon\'s Rebellion.'],
    ['bacons rebellion', "One long-term result of Bacon's Rebellion was:", ['More indentured servants', 'A shift toward enslaved African labor', 'Independence from Britain', 'Peace with Native Americans'], 1, 'Planters saw landless former servants as a threat and turned to slavery.'],
    ['great awakening', 'The First Great Awakening:', ['Strengthened the authority of established churches', 'Encouraged emotional religion and questioning of authority', 'Was led by Enlightenment scientists', 'Ended religious diversity'], 1, 'Preachers like Whitefield drew huge crowds and split congregations.'],
    ['salutary neglect', 'Salutary neglect refers to:', ['Strict British enforcement of trade laws', 'Britain\'s loose enforcement of colonial trade rules, allowing self-government to grow', 'Colonial neglect of Native treaties', 'A colonial tax'], 1, 'It ended after the French and Indian War.'],
  ]);
  SW.mcqs('us3', [
    ['french and indian war consequences', 'A major result of the French and Indian War was:', ['Britain lowered taxes', 'Britain tried to tax the colonies to pay its war debt', 'France gained Canada', 'The colonies declared independence immediately'], 1, 'Acts like the Stamp Act followed, sparking resistance.'],
    ['articles of confederation', 'A weakness of the Articles of Confederation was that Congress could not:', ['Declare war', 'Tax or regulate trade between states', 'Make treaties', 'Admit new states'], 1, 'Without taxing power, the government could not pay its debts.'],
    ['federalists anti federalists', 'Anti-Federalists insisted the Constitution add:', ['A stronger president', 'A Bill of Rights', 'A national bank', 'An end to slavery'], 1, 'They feared a strong central government would threaten liberties.'],
  ]);
  SW.mcqs('us4', [
    ['market revolution', 'The Market Revolution was driven by:', ['Canals, railroads, and factories linking regional economies', 'The end of slavery', 'Government ownership of factories', 'Free trade with France'], 0, 'Transportation and industry tied farms to national markets.'],
    ['jacksonian democracy', 'Jacksonian Democracy is associated with:', ['Expanding voting to most white men', 'Giving women the vote', 'Ending Indian removal', 'Strengthening the national bank'], 0, 'Property requirements for white men fell, while others stayed excluded.'],
    ['second great awakening', 'The Second Great Awakening helped inspire:', ['The temperance and abolition movements', 'The Gilded Age', 'Imperialism', 'The New Deal'], 0, 'Belief in perfecting society fueled reform movements.'],
  ]);
  SW.mcqs('us5', [
    ['manifest destiny', 'Manifest Destiny was the belief that:', ['The US should stay out of foreign affairs', 'The US was destined to expand across North America', 'Slavery should end', 'States could nullify federal laws'], 1, 'It justified the Mexican-American War and westward expansion.'],
    ['popular sovereignty', 'The Kansas-Nebraska Act increased sectional tension by:', ['Banning slavery in the West', 'Letting settlers vote on slavery, overturning the Missouri Compromise line', 'Admitting California as free', 'Ending the Fugitive Slave Act'], 1, 'Violence in "Bleeding Kansas" followed.'],
    ['reconstruction amendments', 'The 14th Amendment:', ['Abolished slavery', 'Guaranteed citizenship and equal protection of the laws', 'Gave Black men the right to vote', 'Created income tax'], 1, '13th: abolition. 14th: citizenship and equal protection. 15th: voting regardless of race.'],
  ]);
  SW.mcqs('us6', [
    ['gilded age industry', 'Andrew Carnegie\'s control of every step of steel production is called:', ['Horizontal integration', 'Vertical integration', 'A holding company', 'Laissez-faire'], 1, 'He owned the mines, railroads and mills.'],
    ['populism', 'The Populist Party mainly represented:', ['Factory owners', 'Farmers angry about railroads, debt and falling prices', 'Northern bankers', 'Immigrants in cities'], 1, 'They called for silver coinage and railroad regulation.'],
    ['new immigration', 'Immigrants after 1880 came increasingly from:', ['Northern and Western Europe', 'Southern and Eastern Europe', 'Africa', 'Latin America'], 1, 'Italians, Poles, Jews and others faced nativist hostility.'],
  ]);
  SW.mcqs('us7', [
    ['progressive era', 'Progressive reformers generally wanted to:', ['Reduce the role of government', 'Use government to fix problems of industrialization and corruption', 'Expand imperialism only', 'End immigration completely'], 1, 'Examples: food safety laws, trust-busting, direct election of senators.'],
    ['new deal', 'The New Deal changed the federal government by:', ['Shrinking it', 'Greatly expanding its role in the economy and social welfare', 'Ending the income tax', 'Eliminating labor unions'], 1, 'Programs like Social Security created a lasting safety net.'],
    ['isolationism', 'Neutrality Acts of the 1930s reflected:', ['Strong interventionism', 'Isolationist feeling after World War I', 'An alliance with Britain', 'Support for fascism'], 1, 'Americans wanted to avoid being dragged into another war.'],
  ]);
  SW.mcqs('us8', [
    ['containment', 'The policy of containment aimed to:', ['Defeat the USSR militarily', 'Stop the spread of communism', 'Withdraw from world affairs', 'Spread fascism'], 1, 'It guided the Truman Doctrine, Marshall Plan, Korea and Vietnam.'],
    ['civil rights tactics', 'Sit-ins and the Montgomery Bus Boycott relied on:', ['Armed resistance', 'Nonviolent direct action', 'Court cases only', 'Moving to the North'], 1, 'Nonviolence exposed injustice and won national sympathy.'],
    ['great society', 'Lyndon Johnson\'s Great Society included:', ['Medicare and Medicaid', 'The Interstate Highway System', 'Social Security', 'The G.I. Bill'], 0, 'It expanded the New Deal with health care and anti-poverty programs.'],
  ]);
  SW.mcqs('us9', [
    ['conservative resurgence', 'Reagan-era conservatism emphasized:', ['Higher taxes and more regulation', 'Tax cuts, deregulation and a strong military', 'Ending the Cold War through disarmament first', 'Expanding welfare'], 1, '"Government is the problem" captured the philosophy.'],
    ['globalization', 'A major effect of globalization in the 1990s-2000s was:', ['More manufacturing jobs in the US', 'The loss of many US manufacturing jobs as production moved overseas', 'The end of trade agreements', 'Less immigration'], 1, 'Free trade lowered prices but hurt industrial towns.'],
  ]);

  SW.frq('us7', 'SAQ: Causes of the Great Depression',
    'Answer (a), (b) and (c).\n(a) Briefly describe ONE economic cause of the Great Depression.\n(b) Briefly describe ONE way the federal government responded to the Depression between 1933 and 1941.\n(c) Briefly explain ONE way the New Deal had a lasting effect on American society.',
    SAQ('Describes a valid cause (overproduction, stock speculation and buying on margin, bank failures, unequal wealth, tariffs/Smoot-Hawley)', 'Describes a valid response (CCC, WPA, Social Security Act, FDIC, Wagner Act, AAA, bank holiday)', 'Explains a lasting effect (federal safety net, deposit insurance, stronger unions, bigger federal role, New Deal coalition)'),
    '(a) Many Americans bought stocks on margin, so when prices fell in 1929 investors could not pay their loans, wiping out savings and causing bank failures.\n(b) The Works Progress Administration hired millions of unemployed people to build roads, schools and public buildings.\n(c) The Social Security Act created old-age pensions and unemployment insurance, establishing a federal safety net that still exists.');
  SW.frq('us7', 'DBQ: The New Deal and the federal government',
    'Evaluate the extent to which the New Deal changed the role of the federal government in the American economy from 1933 to 1941. Use the documents above (summaries written for practice) and your own knowledge.',
    DBQ,
    'Sample high-scoring approach: Contextualization: the 1929 crash, 25% unemployment by 1933, and Hoover\'s limited response. Thesis: The New Deal greatly expanded the federal government\'s role by creating a permanent safety net and regulating labor and finance, though the Supreme Court and critics limited how far it went. Uses Doc 2 (Social Security) and Doc 4 (WPA jobs) for expansion; Doc 5 (Wagner Act) for labor; Doc 3 (critics) and Doc 6 (Schechter case) to show limits. Outside evidence: the FDIC guaranteeing bank deposits. Sourcing: Doc 3\'s authors were wealthy business leaders whose purpose was to protect their interests from regulation. Complexity: explains both change (new federal responsibilities) and continuity (capitalism and private ownership stayed in place).',
    null,
    `Document 1 (summary): In his first inaugural address in March 1933, Franklin Roosevelt told Americans that "the only thing we have to fear is fear itself" and asked Congress for broad power to fight the emergency.
Document 2 (summary): The Social Security Act of 1935 set up federal old-age pensions paid for by payroll taxes on workers and employers, plus unemployment insurance run with the states.
Document 3 (summary): The American Liberty League, a group backed by wealthy business leaders, argued in 1935 that New Deal programs threatened private property and individual liberty.
Document 4 (summary): Government reports show the Works Progress Administration employed millions of Americans between 1935 and 1943 on roads, bridges, schools and arts projects.
Document 5 (summary): The National Labor Relations (Wagner) Act of 1935 guaranteed workers the right to join unions and bargain collectively, and created a federal board to enforce it.
Document 6 (summary): In Schechter Poultry Corp. v. United States (1935), the Supreme Court struck down the National Industrial Recovery Act, ruling Congress had given the president too much power over business.`);
  SW.frq('us5', 'LEQ: Causes of the Civil War',
    'Evaluate the relative importance of causes of the Civil War in the period from 1844 to 1861.',
    LEQ,
    'Sample high-scoring approach: Contextualization: the Missouri Compromise had balanced slave and free states, but westward expansion after the Mexican-American War reopened the question. Thesis: The expansion of slavery into the western territories was the most important cause, because it turned an existing moral and economic divide into a political crisis that destroyed compromise. Evidence: the Wilmot Proviso, the Compromise of 1850 and the Fugitive Slave Act, the Kansas-Nebraska Act and Bleeding Kansas, the Dred Scott decision, Lincoln\'s 1860 election. Reasoning: causation, ranking expansion above economic differences and states\' rights arguments. Complexity: shows how states\' rights arguments were themselves used to protect slavery.');

  SW.REF.apush = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Periods and big themes</h4><table>
        <tr><td><b>1. 1491-1607</b> Native societies; contact; Columbian Exchange; Spanish colonization</td></tr>
        <tr><td><b>2. 1607-1754</b> British colonies by region; slavery; Great Awakening; salutary neglect</td></tr>
        <tr><td><b>3. 1754-1800</b> French and Indian War; Revolution; Articles; Constitution; early republic</td></tr>
        <tr><td><b>4. 1800-1848</b> Jefferson to Jackson; Market Revolution; reform; Indian removal</td></tr>
        <tr><td><b>5. 1844-1877</b> Manifest Destiny; sectional crisis; Civil War; Reconstruction</td></tr>
        <tr><td><b>6. 1865-1898</b> Industrialization; Gilded Age; immigration; West; Populism</td></tr>
        <tr><td><b>7. 1890-1945</b> Imperialism; Progressives; WWI; 1920s; Depression; New Deal; WWII</td></tr>
        <tr><td><b>8. 1945-1980</b> Cold War; civil rights; Great Society; Vietnam; counterculture</td></tr>
        <tr><td><b>9. 1980-present</b> Conservatism; end of the Cold War; globalization; 9/11; technology</td></tr></table></div>
      ${writingRef}
      <div class="ref-unit"><h4>Themes (use for contextualization)</h4><table>
        <tr><td>American and national identity; work, exchange and technology; geography and environment; migration and settlement; politics and power; America in the world; American and regional culture; social structures</td></tr></table></div>
    </div>`;

  // ======================= AP WORLD HISTORY: MODERN =======================
  SW.defineCourse('world', {
    name: 'AP World History: Modern', short: 'World', subject: 'History and Social Sciences',
    units: [
      ['wh1', 1, 'The Global Tapestry (1200-1450)', '8-10%'],
      ['wh2', 2, 'Networks of Exchange (1200-1450)', '8-10%'],
      ['wh3', 3, 'Land-Based Empires (1450-1750)', '12-15%'],
      ['wh4', 4, 'Transoceanic Interconnections (1450-1750)', '12-15%'],
      ['wh5', 5, 'Revolutions (1750-1900)', '12-15%'],
      ['wh6', 6, 'Consequences of Industrialization (1750-1900)', '12-15%'],
      ['wh7', 7, 'Global Conflict (1900-present)', '8-10%'],
      ['wh8', 8, 'Cold War and Decolonization (1900-present)', '8-10%'],
      ['wh9', 9, 'Globalization (1900-present)', '8-10%'],
    ],
    format: FORMAT,
    dist: { year: 2025, 5: 13.9, 4: 33.4, 3: 17.0, mean: 3.16 },
    past: 'https://apcentral.collegeboard.org/courses/ap-world-history/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/whp-origins',
    calcLabel: 'Key dates',
  });

  SW.dates('wh1', [['The Song dynasty falls to the Mongols', 1279], ['Mansa Musa\'s pilgrimage to Mecca', 1324], ['The Aztecs found Tenochtitlan', 1325], ['The Black Death reaches Europe', 1347], ['The Ming dynasty is founded', 1368]]);
  SW.dates('wh2', [['Genghis Khan unites the Mongols', 1206], ['Ibn Battuta begins his travels', 1325], ["Zheng He's first voyage", 1405]]);
  SW.dates('wh3', [['The Ottomans capture Constantinople', 1453], ['The Safavid Empire is founded', 1501], ["Martin Luther's 95 Theses", 1517], ['The Mughal Empire is founded', 1526], ['The Tokugawa shogunate begins', 1603], ['The Qing dynasty is founded', 1644]]);
  SW.dates('wh4', [['Columbus reaches the Americas', 1492], ['Treaty of Tordesillas', 1494], ['Vasco da Gama reaches India', 1498], ["Magellan's expedition sets sail", 1519], ['Spain conquers the Aztec capital', 1521], ['Silver is found at Potosi', 1545]]);
  SW.dates('wh5', [["James Watt patents his improved steam engine", 1769], ['The French Revolution begins', 1789], ['The Haitian Revolution begins', 1791], ['Mexico declares independence (Grito de Dolores)', 1810], ['The Meiji Restoration', 1868], ['Germany is unified', 1871]]);
  SW.dates('wh6', [['The First Opium War begins', 1839], ['The Taiping Rebellion begins', 1850], ['The Indian Rebellion (Sepoy Mutiny)', 1857], ['The Suez Canal opens', 1869], ['The Berlin Conference', 1884], ['Brazil abolishes slavery', 1888]]);
  SW.dates('wh7', [['World War I begins', 1914], ['The Russian Revolution', 1917], ['The Treaty of Versailles', 1919], ['The Great Depression begins', 1929], ['World War II begins in Europe', 1939], ['Atomic bombs are dropped on Japan', 1945]]);
  SW.dates('wh8', [['The United Nations is founded', 1945], ['India and Pakistan become independent', 1947], ['The Chinese Communist Revolution succeeds', 1949], ['Ghana becomes independent', 1957], ['The Cuban Missile Crisis', 1962], ['The Soviet Union dissolves', 1991]]);
  SW.dates('wh9', [['Nelson Mandela is elected president of South Africa', 1994], ['The World Trade Organization is founded', 1995], ['The Kyoto Protocol is adopted', 1997], ['The euro is introduced', 1999], ['The September 11 attacks', 2001]]);

  SW.mcqs('wh1', [
    ['song china', 'Song dynasty China\'s economy grew partly because of:', ['Champa rice and new farming techniques', 'Silver from the Americas', 'Steam power', 'The end of the civil service exam'], 0, 'Fast-ripening Champa rice supported a large population.'],
    ['dar al islam', 'Dar al-Islam in 1200-1450 is best described as:', ['A single unified empire', 'Many Muslim states linked by religion, trade and learning', 'A Christian kingdom', 'An empire in the Americas'], 1, 'The Abbasids had split, but Islam tied a huge region together.'],
    ['mit a system', 'The Inca mit\'a system was:', ['A tax paid in silver', 'Required labor service for the state', 'A religious ceremony', 'A trade route'], 1, 'Communities sent workers to build roads and farm state lands.'],
  ]);
  SW.mcqs('wh2', [
    ['silk roads', 'Caravanserai along the Silk Roads helped trade by:', ['Providing safe lodging for merchants and their animals', 'Collecting taxes for the Mongols', 'Producing silk', 'Spreading Christianity only'], 0, 'Safer, easier travel meant more trade.'],
    ['indian ocean monsoon', 'Indian Ocean trade depended heavily on:', ['Knowledge of the monsoon winds', 'Steamships', 'Overland camels', 'Atlantic currents'], 0, 'Predictable seasonal winds let sailors plan voyages.'],
    ['mongol effects', 'One effect of the Mongol Empire was:', ['Less trade across Eurasia', 'Increased trade and the spread of the Black Death', 'The end of the Silk Roads', 'Christianity spreading to China'], 1, 'The Pax Mongolica made travel safer, for goods and germs.'],
  ]);
  SW.mcqs('wh3', [
    ['gunpowder empires', 'The Ottoman, Safavid and Mughal empires expanded largely through:', ['Naval exploration of the Atlantic', 'Gunpowder weapons', 'Industrial factories', 'Democratic reforms'], 1, 'Cannons and firearms helped them conquer and hold land.'],
    ['devshirme', 'The Ottoman devshirme system:', ['Taxed merchants', 'Took Christian boys to be trained as soldiers (Janissaries) and officials', 'Elected the sultan', 'Built mosques'], 1, 'It created a loyal elite that depended on the sultan.'],
    ['protestant reformation', 'A major effect of the Protestant Reformation was:', ['Greater unity of the Catholic Church', 'Religious wars and the weakening of Catholic Church authority', 'The end of the printing press', 'The fall of the Ottoman Empire'], 1, 'Europe split into competing Christian groups.'],
  ]);
  SW.mcqs('wh4', [
    ['silver trade', 'Much of the silver mined in Spanish America ended up in:', ['Africa', 'China', 'North America', 'Russia'], 1, 'China\'s demand for silver (for taxes) linked the global economy.'],
    ['atlantic slave trade', 'The Atlantic slave trade grew mainly because of:', ['Demand for labor on sugar and cash crop plantations', 'European need for soldiers', 'African demand for silver', 'Religious missions'], 0, 'Plantations needed huge labor forces after Native populations collapsed.'],
    ['joint stock companies', 'Joint-stock companies like the Dutch East India Company:', ['Were run by the Catholic Church', 'Let investors share the risks and profits of overseas trade', 'Were owned by African kingdoms', 'Banned private trade'], 1, 'Sharing risk made expensive voyages possible.'],
  ]);
  SW.mcqs('wh5', [
    ['enlightenment', 'Enlightenment ideas like natural rights most directly inspired:', ['The Atlantic revolutions', 'The Protestant Reformation', 'The Mongol conquests', 'Feudalism'], 0, 'American, French, Haitian and Latin American revolutions.'],
    ['industrial revolution britain', 'Britain industrialized first partly because it had:', ['No coal', 'Coal, iron, capital, colonies and a large labor supply', 'A ban on trade', 'Few rivers'], 1, 'Resources, markets and money all came together.'],
    ['nationalism', 'Nationalism in the 1800s led to:', ['The unification of Italy and Germany', 'The breakup of the US', 'The end of all empires', 'The spread of feudalism'], 0, 'Shared language and culture became the basis for new states.'],
  ]);
  SW.mcqs('wh6', [
    ['imperialism justification', 'Social Darwinism was used to:', ['Argue against imperialism', 'Justify imperialism by claiming some races were superior', 'Promote equality', 'End the slave trade'], 1, 'It twisted evolution to support colonial rule.'],
    ['economic imperialism', 'The Opium Wars show:', ['Chinese military dominance', 'Economic imperialism forcing China to open trade on British terms', 'Japanese expansion', 'The end of the Qing in 1842'], 1, 'Treaties like Nanjing gave Britain ports and Hong Kong.'],
    ['migration indentured', 'In the 1800s, many people from India and China migrated as:', ['Indentured laborers to plantations around the world', 'Conquering soldiers', 'Slaves to Europe', 'Missionaries'], 0, 'They filled labor needs after slavery was abolished.'],
  ]);
  SW.mcqs('wh7', [
    ['world war one causes', 'Which was a long-term cause of World War I?', ['The Cold War', 'Alliances, militarism, imperialism and nationalism', 'The Great Depression', 'The atomic bomb'], 1, 'MAIN: the assassination of Franz Ferdinand was only the spark.'],
    ['total war', 'Total war means:', ['Only soldiers fight', 'Whole societies and economies are mobilized for the war', 'A war lasting one day', 'A war without weapons'], 1, 'Factories, propaganda and rationing all served the war effort.'],
    ['fascism', 'Fascist governments in the 1920s-30s featured:', ['Free elections', 'Extreme nationalism, one-party rule and suppression of opposition', 'Communist economics', 'Weak leaders'], 1, 'Mussolini and Hitler are the main examples.'],
  ]);
  SW.mcqs('wh8', [
    ['decolonization india', 'Indian independence was achieved largely through:', ['Armed revolution', 'Mass nonviolent resistance led by Gandhi and the Congress Party', 'A Soviet invasion', 'A US treaty'], 1, 'Civil disobedience pressured Britain, which was weakened by WWII.'],
    ['proxy wars', 'The Korean and Vietnam wars are examples of:', ['World wars', 'Cold War proxy conflicts', 'Wars of religion', 'Colonial wars against Spain'], 1, 'The superpowers backed opposite sides without fighting each other directly.'],
    ['non aligned movement', 'The Non-Aligned Movement was made up of countries that:', ['Joined NATO', 'Refused to side with either the US or USSR', 'Were Soviet satellites', 'Were European colonies'], 1, 'Leaders like Nehru and Nasser wanted independence from both blocs.'],
  ]);
  SW.mcqs('wh9', [
    ['globalization technology', 'Globalization since 1900 was made faster by:', ['Advances in communication and transportation', 'The decline of trade', 'The end of the internet', 'Feudalism'], 0, 'Shipping containers, jets and the internet shrank distances.'],
    ['green revolution', 'The Green Revolution:', ['Increased crop yields with new seeds, fertilizers and irrigation', 'Ended pollution', 'Was a political revolution in China', 'Reduced food production'], 0, 'It fed more people but increased chemical use and inequality.'],
  ]);

  SW.frq('wh6', 'SAQ: Responses to imperialism',
    'Answer (a), (b) and (c).\n(a) Identify ONE way a society in Africa or Asia resisted European imperialism between 1850 and 1900.\n(b) Explain ONE economic motive for European imperialism in the period 1850-1900.\n(c) Explain ONE way a state outside Europe industrialized or modernized in response to Western pressure in this period.',
    SAQ('Identifies valid resistance (Sepoy Rebellion, Zulu resistance, Ethiopia at Adwa, Boxer Rebellion, Maji Maji)', 'Explains a valid economic motive (raw materials like rubber and cotton, new markets for factory goods, investment)', 'Explains a valid example (Meiji Japan building railroads, factories, and a modern army; Ottoman Tanzimat reforms; Egypt under Muhammad Ali)'),
    '(a) In 1896 Ethiopia defeated an Italian army at the Battle of Adwa and stayed independent.\n(b) Industrial factories in Europe needed raw materials such as rubber from the Congo and cotton from Egypt, so Europeans took control of the lands that produced them.\n(c) Meiji Japan sent officials to study the West, then built railroads, state-sponsored factories and a modern army so it could avoid being colonized.');
  SW.frq('wh4', 'DBQ: The Columbian Exchange',
    'Evaluate the extent to which the Columbian Exchange transformed societies in the Americas and Afro-Eurasia from 1492 to 1750. Use the documents above (summaries written for practice) and your own knowledge.',
    DBQ,
    'Sample high-scoring approach: Contextualization: Iberian maritime exploration and the search for direct trade with Asia. Thesis: The Columbian Exchange transformed the Americas far more drastically than Afro-Eurasia, causing demographic collapse and new labor systems, while in Afro-Eurasia it mainly boosted populations and trade and devastated West Africa through the slave trade. Docs 1 and 2 for disease and labor; Doc 3 for silver linking China; Doc 4 for new crops and population growth; Doc 5 for the horse on the Plains. Outside evidence: the encomienda system. Sourcing: Doc 1\'s author was a Spanish friar writing to persuade the king to protect Native people, which explains his emphasis on cruelty. Complexity: distinguishes between regions and shows both destructive and productive effects.',
    null,
    `Document 1 (summary): A Spanish friar in the 1540s wrote to the king of Spain describing the deaths of huge numbers of Native people from overwork and disease, and urged laws to protect them.
Document 2 (summary): Estimates by historians suggest the Native population of central Mexico fell by around 90 percent in the century after 1519, mostly due to smallpox and other diseases.
Document 3 (summary): Records of the Manila galleon trade show silver from Mexico and Potosi was shipped across the Pacific to buy Chinese silk and porcelain.
Document 4 (summary): Historians link population growth in China and Europe in the 1600s and 1700s partly to American crops such as maize, sweet potatoes and potatoes, which grew in poor soils.
Document 5 (summary): Accounts from the 1700s describe how horses, brought by the Spanish, allowed Plains peoples like the Comanche to hunt bison more efficiently and expand their power.`);
  SW.frq('wh5', 'LEQ: Effects of the Industrial Revolution',
    'Develop an argument that evaluates the extent to which industrialization changed social structures in the period 1750 to 1900.',
    LEQ,
    'Sample high-scoring approach: Contextualization: the Agricultural Revolution freed labor and Britain had coal, capital and colonies. Thesis: Industrialization greatly changed social structures by creating a new industrial working class and middle class and by pulling people into cities, though older hierarchies of gender and landowning elites persisted. Evidence: factory working conditions and child labor in Britain, the rise of labor unions and socialism (Marx), urbanization in Manchester, the middle-class ideal of separate spheres, Meiji Japan\'s factory workers. Reasoning: continuity and change. Complexity: compares industrialized and non-industrialized regions.');

  SW.REF.world = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Time periods</h4><table>
        <tr><td><b>1200-1450:</b> Song China, Dar al-Islam, Mali, Aztec and Inca; Silk Roads, Indian Ocean, trans-Saharan trade; Mongols</td></tr>
        <tr><td><b>1450-1750:</b> Ottoman, Safavid, Mughal, Qing, Tokugawa; European maritime empires; Columbian Exchange; Atlantic slave trade</td></tr>
        <tr><td><b>1750-1900:</b> Enlightenment and Atlantic revolutions; Industrial Revolution; nationalism; imperialism; migration</td></tr>
        <tr><td><b>1900-present:</b> World wars; Depression and fascism; Cold War; decolonization; globalization</td></tr></table></div>
      ${writingRef}
      <div class="ref-unit"><h4>Historical thinking skills</h4><table>
        <tr><td><b>Causation:</b> causes and effects, primary vs. secondary</td></tr><tr><td><b>Comparison:</b> similarities AND differences, with reasons</td></tr>
        <tr><td><b>Continuity and change:</b> what changed, what stayed, and why</td></tr></table></div>
    </div>`;
})();
