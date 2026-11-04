/* Study guides, batch 3: AP US History, AP World History, AP European History,
 * AP African American Studies, AP Comparative Government, AP Human Geography,
 * AP Macroeconomics, AP Microeconomics. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const HIST_TIPS = ['Use HIPP (historical situation, intended audience, purpose, point of view) to analyze sourcing in the DBQ.', 'Contextualization: describe the broader events before or during the period, in 2-3 sentences, linked to the prompt.'];

  // ======================= AP US HISTORY =======================
  SW.guides('apush', {
    us1: {
      big: ['Native societies in North America were diverse and adapted to their environments (maize farming in the Southwest, mixed farming and hunting in the East, mobile hunting on the Plains).', 'Spanish exploration and conquest created the encomienda system and a racial caste system.', 'The Columbian Exchange moved plants, animals and diseases between hemispheres, devastating Native populations.'],
      terms: [['Columbian Exchange', 'Transfer of crops, animals, people and diseases between the Americas and Europe/Africa.'], ['Encomienda', 'Spanish grant of Native labor and tribute.'], ['Casta system', 'Spanish racial hierarchy based on ancestry.'], ['Valladolid debate (1550-1551)', 'Las Casas vs Sepulveda over the treatment of Native peoples.']],
      knowTitle: 'Key dates', know: ['1492: Columbus reaches the Caribbean', '1519-1521: Cortes conquers the Aztec Empire', '1598: Spanish settle New Mexico'],
      mistakes: ['Treating Native Americans as one group with one culture.'],
      tips: HIST_TIPS,
    },
    us2: {
      big: ['European colonies differed: Spanish (conversion, labor), French and Dutch (trade, alliances), British (settlement, agriculture).', 'British colonial regions developed differently: New England (religion, towns), Middle (diverse, commerce), Chesapeake and South (tobacco, rice, slavery).', 'Slavery expanded and became racially defined; mercantilism tied colonies to Britain.', 'The Great Awakening and the Enlightenment shaped colonial thought.'],
      terms: [['Mercantilism', 'Colonies exist to enrich the mother country.'], ['Navigation Acts', 'Required colonial trade to go through England.'], ['Salutary neglect', 'Britain\'s loose enforcement of trade laws.'], ['Bacon\'s Rebellion (1676)', 'Frontier uprising that pushed planters toward enslaved labor.'], ['Great Awakening', '1730s-40s religious revival.'], ['Pueblo Revolt (1680)', 'Pueblo uprising against Spanish rule.']],
      knowTitle: 'Key dates', know: ['1607: Jamestown', '1619: first Africans brought to Virginia; House of Burgesses', '1620: Plymouth; 1630: Massachusetts Bay', '1739: Stono Rebellion'],
      mistakes: ['Saying the colonies were all founded for religious freedom.'],
      tips: HIST_TIPS,
    },
    us3: {
      big: ['The French and Indian War (1754-1763) left Britain in debt and led to new taxes on the colonies.', 'Colonial resistance grew from protests to revolution, inspired by Enlightenment ideas.', 'The Articles of Confederation proved weak; the Constitution created a stronger federal government.', 'Debates between Federalists and Anti-Federalists, then Hamilton and Jefferson, shaped the first party system.'],
      terms: [['Proclamation of 1763', 'Banned settlement west of the Appalachians.'], ['Stamp Act (1765)', 'Direct tax; sparked "no taxation without representation."'], ['Common Sense (1776)', 'Paine\'s pamphlet for independence.'], ['Northwest Ordinance (1787)', 'Organized territories; banned slavery north of the Ohio River.'], ['Hamilton\'s financial plan', 'National bank, assumption of debts, tariffs.'], ['Washington\'s Farewell Address', 'Warned against parties and foreign alliances.']],
      knowTitle: 'Key dates', know: ['1776: Declaration of Independence', '1781: Yorktown;  1783: Treaty of Paris', '1787: Constitutional Convention;  1791: Bill of Rights', '1794: Whiskey Rebellion'],
      mistakes: ['Confusing the Proclamation of 1763 with the Intolerable Acts (1774).'],
      tips: HIST_TIPS,
    },
    us4: {
      big: ['Democracy expanded for white men (end of property requirements, Jacksonian Democracy) while excluding others.', 'The Market Revolution (canals, railroads, factories) linked regions and changed work.', 'The Second Great Awakening fueled reform movements: abolition, temperance, women\'s rights.', 'Westward expansion forced Native removal and deepened conflict over slavery.'],
      terms: [['Marbury v. Madison (1803)', 'Judicial review.'], ['Louisiana Purchase (1803)', 'Doubled the nation\'s size.'], ['Missouri Compromise (1820)', 'Missouri slave, Maine free; no slavery north of 36 30.'], ['Monroe Doctrine (1823)', 'Western Hemisphere closed to new European colonization.'], ['Indian Removal Act (1830)', 'Led to the Trail of Tears.'], ['Seneca Falls (1848)', 'Women\'s rights convention; Declaration of Sentiments.']],
      knowTitle: 'Key dates', know: ['1812-1815: War of 1812', '1825: Erie Canal', '1828: Jackson elected', '1832-1833: Nullification Crisis'],
      mistakes: ['Saying the Market Revolution only affected the North.'],
      tips: HIST_TIPS,
    },
    us5: {
      big: ['Manifest Destiny drove expansion; the Mexican-American War added land and reopened the slavery debate.', 'Compromises (1850, Kansas-Nebraska) failed; sectional conflict led to secession.', 'The Union won the Civil War with industrial and population advantages; emancipation became a war aim.', 'Reconstruction expanded rights through amendments but ended with Southern "redemption."'],
      terms: [['Wilmot Proviso', 'Proposed banning slavery in land from Mexico.'], ['Compromise of 1850', 'California free; stronger Fugitive Slave Act.'], ['Kansas-Nebraska Act (1854)', 'Popular sovereignty; Bleeding Kansas.'], ['Dred Scott v. Sandford (1857)', 'Enslaved people not citizens; Congress cannot ban slavery in territories.'], ['Emancipation Proclamation (1863)', 'Freed enslaved people in rebelling states.'], ['13th, 14th, 15th Amendments', 'Abolished slavery; citizenship and equal protection; voting regardless of race.'], ['Compromise of 1877', 'Federal troops left the South; Reconstruction ended.']],
      knowTitle: 'Key dates', know: ['1846-1848: Mexican-American War', '1860: Lincoln elected; South Carolina secedes', '1861-1865: Civil War', '1863: Gettysburg'],
      mistakes: ['Saying the Emancipation Proclamation freed all enslaved people.'],
      tips: HIST_TIPS,
    },
    us6: {
      big: ['Industrialization created big business, monopolies and enormous wealth gaps (Gilded Age).', 'Workers organized unions; strikes were often violently suppressed.', 'Immigration from Southern and Eastern Europe and Asia grew cities and sparked nativism.', 'Western settlement displaced Native nations; farmers organized into the Populist movement.'],
      terms: [['Vertical / horizontal integration', 'Control all stages / buy out competitors.'], ['Social Darwinism', 'Survival of the fittest applied to society.'], ['Gospel of Wealth', 'Carnegie: the rich should give back.'], ['Chinese Exclusion Act (1882)', 'Banned Chinese immigration.'], ['Dawes Act (1887)', 'Broke up reservations into individual plots.'], ['Populist Party', 'Farmers\' party: free silver, railroad regulation.'], ['Plessy v. Ferguson (1896)', '"Separate but equal."']],
      knowTitle: 'Key dates', know: ['1869: Transcontinental Railroad', '1886: Haymarket; AFL founded', '1890: Wounded Knee; Sherman Antitrust Act', '1894: Pullman Strike'],
      mistakes: ['Confusing the Knights of Labor (broad, inclusive) with the AFL (skilled workers).'],
      tips: HIST_TIPS,
    },
    us7: {
      big: ['Progressives used government to address problems of industrialization.', 'The US became a world power (Spanish-American War, World War I).', 'The 1920s brought cultural change and conflict; the Great Depression led to the New Deal.', 'World War II mobilized the nation and made the US a superpower.'],
      terms: [['Muckrakers', 'Journalists exposing corruption.'], ['16th-19th Amendments', 'Income tax, direct election of senators, Prohibition, women\'s suffrage.'], ['Roosevelt Corollary', 'US as police power in Latin America.'], ['Harlem Renaissance', 'Flourishing of African American culture.'], ['New Deal', 'Relief, recovery, reform programs (CCC, WPA, Social Security).'], ['Japanese American internment', 'Forced relocation upheld in Korematsu v. US (1944).']],
      knowTitle: 'Key dates', know: ['1898: Spanish-American War', '1917: US enters World War I', '1929: stock market crash', '1941: Pearl Harbor;  1945: atomic bombs, war ends'],
      mistakes: ['Saying the New Deal ended the Depression on its own (World War II spending did much of that).'],
      tips: HIST_TIPS,
    },
    us8: {
      big: ['The Cold War shaped foreign and domestic policy: containment, alliances, the Red Scare.', 'The civil rights movement used courts, nonviolent protest and legislation to end legal segregation.', 'Postwar prosperity created suburbs and consumer culture; the Great Society expanded government.', 'Vietnam and Watergate increased distrust of government.'],
      terms: [['Containment', 'Stopping the spread of communism.'], ['Truman Doctrine / Marshall Plan', 'Aid to resist communism / rebuild Europe.'], ['McCarthyism', 'Anti-communist accusations without evidence.'], ['Brown v. Board (1954)', 'Ended segregated public schools.'], ['Civil Rights Act (1964) / Voting Rights Act (1965)', 'Banned discrimination / protected voting.'], ['Gulf of Tonkin Resolution (1964)', 'Expanded the Vietnam War.']],
      knowTitle: 'Key dates', know: ['1947: Truman Doctrine;  1949: NATO', '1950-1953: Korean War', '1962: Cuban Missile Crisis', '1974: Nixon resigns'],
      mistakes: ['Treating the civil rights movement as only Southern or only King.'],
      tips: HIST_TIPS,
    },
    us9: {
      big: ['A conservative movement grew, leading to Reagan\'s presidency.', 'The Cold War ended; the US faced new challenges in the Middle East and terrorism.', 'Globalization, technology and immigration reshaped the economy and society.'],
      terms: [['Reaganomics', 'Tax cuts, deregulation, defense spending.'], ['NAFTA (1994)', 'Free trade with Canada and Mexico.'], ['9/11 (2001)', 'Terrorist attacks leading to the War on Terror.'], ['Great Recession (2008)', 'Financial crisis and bailouts.']],
      knowTitle: 'Key dates', know: ['1980: Reagan elected', '1991: Soviet Union collapses', '2001: September 11 attacks'],
      mistakes: ['Writing only facts without connecting them to change over time.'],
      tips: HIST_TIPS,
    },
  });

  // ======================= AP WORLD HISTORY =======================
  SW.guides('world', {
    wh1: {
      big: ['States across the world grew more centralized from 1200 to 1450 (Song China, Dar al-Islam, Mali, the Aztecs and Inca, European kingdoms).', 'Belief systems (Confucianism, Buddhism, Islam, Christianity, Hinduism) shaped societies and governments.', 'Song China was innovative and commercial (Champa rice, paper money).'],
      terms: [['Neo-Confucianism', 'Blended Confucianism with Buddhist and Daoist ideas.'], ['Civil service exam', 'Chinese bureaucracy chosen by merit.'], ['Abbasid Caliphate', 'Islamic empire centered in Baghdad; declined by 1258.'], ['Delhi Sultanate', 'Muslim rule in northern India.'], ['Feudalism', 'European system of lords, vassals and serfs.'], ['Mit\'a', 'Inca labor obligation.']],
      know: ['Mali under Mansa Musa: wealth from gold and salt trade; Timbuktu as a center of learning.', 'Bhakti movement in India; Sufism helped Islam spread.'],
      mistakes: ['Describing regions without comparing them.'],
      tips: HIST_TIPS,
    },
    wh2: {
      big: ['Trade networks (Silk Roads, Indian Ocean, trans-Saharan) carried goods, ideas, religions and diseases.', 'The Mongol Empire connected Eurasia and spread technology and the plague.', 'Travelers (Ibn Battuta, Marco Polo, Zheng He) show how connected the world was.'],
      terms: [['Silk Roads', 'Overland Eurasian trade routes.'], ['Indian Ocean trade', 'Monsoon winds; Swahili city-states; Malacca.'], ['Caravanserai', 'Inns for traders on the Silk Roads.'], ['Pax Mongolica', 'Mongol peace that protected trade.'], ['Black Death', 'Plague that spread along trade routes in the 1300s.'], ['Diasporic communities', 'Merchant communities living abroad.']],
      know: ['Innovations: compass, lateen sail, astrolabe, bills of exchange.', 'Camels enabled trans-Saharan trade.'],
      mistakes: ['Saying trade only moved goods (it moved ideas and disease too).'],
      tips: HIST_TIPS,
    },
    wh3: {
      big: ['Gunpowder empires (Ottoman, Safavid, Mughal) and Ming/Qing China expanded using firearms and bureaucracies.', 'Rulers legitimized power through religion, monuments and law.', 'Religious divisions (Sunni vs Shia; Protestant Reformation) shaped politics.'],
      terms: [['Devshirme', 'Ottoman recruitment of Christian boys for service (Janissaries).'], ['Divine right', 'Monarchs rule by God\'s will.'], ['Tax farming', 'Private collection of taxes.'], ['Akbar', 'Mughal ruler known for religious tolerance.'], ['Manchus / Qing', 'Ruled China from 1644; kept Confucian bureaucracy.'], ['Protestant Reformation', 'Luther (1517) challenged the Catholic Church.']],
      know: ['Monumental architecture: Taj Mahal, Versailles, Suleymaniye Mosque.', 'Sunni Ottomans vs Shia Safavids: conflict along their border.'],
      mistakes: ['Mixing up the three Islamic gunpowder empires.'],
      tips: HIST_TIPS,
    },
    wh4: {
      big: ['European maritime exploration created transoceanic empires and trade.', 'The Columbian Exchange transformed diets, populations and environments.', 'The Atlantic slave trade forced millions of Africans into plantation labor.', 'Silver from the Americas fueled global trade, especially with China.'],
      terms: [['Joint-stock company', 'Investors share risk (Dutch and British East India Companies).'], ['Mercantilism', 'Colonies enrich the home country.'], ['Encomienda / hacienda', 'Spanish labor grants / large estates.'], ['Middle Passage', 'Voyage of enslaved Africans to the Americas.'], ['Casta system', 'Racial hierarchy in Spanish America.'], ['Maroon societies', 'Communities of people who escaped slavery.']],
      know: ['Potosi silver mine in Bolivia used forced mita labor.', 'Resistance: Pueblo Revolt, Maroon communities, Queen Nzinga.'],
      mistakes: ['Ignoring how Africans and Asians shaped these exchanges.'],
      tips: HIST_TIPS,
    },
    wh5: {
      big: ['Enlightenment ideas inspired revolutions (American, French, Haitian, Latin American).', 'Nationalism united some peoples and divided empires.', 'Industrialization began in Britain and spread, changing production.'],
      terms: [['Enlightenment', 'Reason, natural rights, social contract.'], ['Haitian Revolution (1791-1804)', 'Enslaved people overthrew French rule; first Black republic.'], ['Creoles', 'People of European descent born in the Americas; led Latin American independence.'], ['Nationalism', 'Loyalty to a nation with shared culture.'], ['Factory system', 'Centralized production with machines and wage labor.']],
      know: ['Britain industrialized first: coal, iron, capital, colonies, rivers.', 'Simon Bolivar led independence in northern South America.'],
      mistakes: ['Treating all revolutions as identical; compare causes and outcomes.'],
      tips: HIST_TIPS,
    },
    wh6: {
      big: ['Industrial states built empires for raw materials and markets.', 'Imperialism faced resistance (Sepoy Rebellion, Boxer Rebellion, Ghost Dance).', 'Migration increased: indentured servants, free migrants and coerced laborers.', 'Some states modernized to resist the West (Meiji Japan) while others weakened (Qing, Ottoman).'],
      terms: [['Social Darwinism', 'Used to justify imperialism.'], ['Berlin Conference (1884-1885)', 'European powers divided Africa.'], ['Opium Wars', 'Britain forced China to open trade.'], ['Meiji Restoration (1868)', 'Japan rapidly industrialized and modernized.'], ['Economic imperialism', 'Control through trade and finance (Latin America, China).'], ['Indentured servitude', 'Contract labor, often from India and China.']],
      know: ['Reform movements: abolition, women\'s rights, labor unions, socialism (Marx).', 'Tanzimat reforms in the Ottoman Empire.'],
      mistakes: ['Saying colonized peoples did not resist.'],
      tips: HIST_TIPS,
    },
    wh7: {
      big: ['World War I was caused by militarism, alliances, imperialism and nationalism; it was a total war.', 'The interwar period saw depression, fascism and communism.', 'World War II was even more global and destructive, including the Holocaust.'],
      terms: [['Total war', 'Whole societies mobilized for war.'], ['Treaty of Versailles (1919)', 'Punished Germany.'], ['Russian Revolution (1917)', 'Bolsheviks took power.'], ['Great Depression', 'Global economic collapse after 1929.'], ['Fascism', 'Authoritarian, nationalist, anti-communist (Mussolini, Hitler).'], ['Holocaust', 'Nazi genocide of six million Jews and others.']],
      know: ['Mandate system gave Ottoman and German lands to Britain and France.', 'Stalin\'s Five-Year Plans and collectivization caused famine.'],
      mistakes: ['Forgetting colonial troops and resources in both world wars.'],
      tips: HIST_TIPS,
    },
    wh8: {
      big: ['The Cold War divided the world between US-led and Soviet-led blocs.', 'Decolonization created new states, through negotiation (India) or violence (Algeria, Kenya).', 'Communist revolutions transformed China and other states.', 'The Non-Aligned Movement refused to choose sides.'],
      terms: [['Containment', 'US strategy to stop communism.'], ['Proxy war', 'Superpowers fight indirectly (Korea, Vietnam, Angola).'], ['Partition of India (1947)', 'India and Pakistan; mass migration and violence.'], ['Cultural Revolution', 'Mao\'s campaign against "old" ideas (1966-1976).'], ['Non-Aligned Movement', 'Led by Nehru, Nasser, Sukarno.'], ['Apartheid', 'South Africa\'s legal segregation until the early 1990s.']],
      know: ['The Soviet Union collapsed in 1991.', 'Gandhi\'s nonviolent resistance influenced movements worldwide.'],
      mistakes: ['Treating decolonization as one event instead of many different processes.'],
      tips: HIST_TIPS,
    },
    wh9: {
      big: ['Technology (medicine, the Green Revolution, communication) transformed life and population.', 'Globalization connected economies through free trade and international organizations.', 'Rights movements and resistance to inequality grew worldwide.', 'Environmental problems (climate change, deforestation) became global concerns.'],
      terms: [['Green Revolution', 'High-yield crops and fertilizer increased food production.'], ['Free-market economics', 'Reduced government role (Reagan, Thatcher, Deng\'s reforms).'], ['WTO / NAFTA / EU', 'Organizations and agreements that expanded trade.'], ['Multinational corporation', 'Company operating in many countries.'], ['Civil rights / women\'s rights', 'Movements for equality worldwide.']],
      know: ['Diseases: HIV/AIDS, Ebola, COVID-19 spread through global connections.', 'Popular culture spread globally (music, film, sports).'],
      mistakes: ['Describing globalization only as positive or only as negative.'],
      tips: HIST_TIPS,
    },
  });

  // ======================= AP EUROPEAN HISTORY =======================
  SW.guides('euro', {
    eu1: {
      big: ['The Renaissance revived classical learning; humanism focused on human potential.', 'The printing press spread ideas quickly.', 'New monarchies centralized power; exploration built overseas empires and global trade.'],
      terms: [['Humanism', 'Study of classical texts; focus on human achievement.'], ['Northern Renaissance', 'Christian humanism (Erasmus, More).'], ['Machiavelli', 'The Prince: practical, secular politics.'], ['Printing press', 'Gutenberg, c. 1450.'], ['Columbian Exchange', 'Exchange of goods, people and disease.'], ['Commercial Revolution', 'Joint-stock companies, banking, rising prices.']],
      know: ['Renaissance art: perspective, realism, patronage (Medici).', 'Portugal sought sea routes to Asia; Spain conquered the Americas.'],
      mistakes: ['Treating the Renaissance as a sudden break from the Middle Ages.'],
      tips: HIST_TIPS,
    },
    eu2: {
      big: ['Luther\'s Reformation (1517) split Western Christianity.', 'Protestantism spread through printing, rulers and new denominations (Calvinism, Anglicanism).', 'The Catholic Reformation responded with the Council of Trent and the Jesuits.', 'Religious wars ended with compromises like the Peace of Westphalia.'],
      terms: [['95 Theses', 'Luther\'s criticism of indulgences.'], ['Calvinism', 'Predestination; Geneva.'], ['Act of Supremacy (1534)', 'Henry VIII heads the Church of England.'], ['Peace of Augsburg (1555)', 'Each prince chooses Lutheran or Catholic.'], ['Edict of Nantes (1598)', 'Limited toleration for Huguenots in France.'], ['Thirty Years\' War (1618-1648)', 'Religious and political war; ended by the Peace of Westphalia.']],
      know: ['Peace of Westphalia recognized Calvinism and weakened the Holy Roman Empire.'],
      mistakes: ['Saying the Reformation was only about religion; politics and economics mattered too.'],
      tips: HIST_TIPS,
    },
    eu3: {
      big: ['Absolute monarchs (Louis XIV, Peter the Great) centralized power.', 'England developed a constitutional monarchy limiting royal power.', 'The Dutch Republic became a commercial power.', 'Balance of power diplomacy shaped European wars.'],
      terms: [['Absolutism', 'Monarch holds total power, often by divine right.'], ['Versailles', 'Louis XIV\'s palace used to control nobles.'], ['English Civil War', 'Parliament vs Charles I; Cromwell.'], ['Glorious Revolution (1688)', 'William and Mary; English Bill of Rights.'], ['Peter the Great', 'Westernized Russia.'], ['Balance of power', 'Preventing any one state from dominating Europe.']],
      know: ['Hobbes (Leviathan) supported strong rule; Locke supported natural rights and limited government.'],
      mistakes: ['Confusing absolutism with constitutionalism.'],
      tips: HIST_TIPS,
    },
    eu4: {
      big: ['The Scientific Revolution used observation and reason to challenge older authorities.', 'The Enlightenment applied reason to government, religion and society.', 'Enlightened absolutists adopted some reforms while keeping power.', 'A consumer revolution and agricultural changes reshaped economies.'],
      terms: [['Heliocentrism', 'Copernicus, Galileo: Earth orbits the Sun.'], ['Scientific method', 'Bacon (empiricism), Descartes (rationalism).'], ['Newton', 'Laws of motion and universal gravitation.'], ['Philosophes', 'Voltaire, Montesquieu, Rousseau.'], ['Deism', 'God as a clockmaker who does not intervene.'], ['Enlightened despot', 'Frederick the Great, Catherine the Great, Joseph II.']],
      know: ['Montesquieu: separation of powers. Rousseau: general will. Adam Smith: free markets.'],
      mistakes: ['Saying the Enlightenment rejected religion entirely.'],
      tips: HIST_TIPS,
    },
    eu5: {
      big: ['The French Revolution moved from liberal reform to radical terror to Napoleon.', 'Napoleon spread revolutionary ideas and nationalism across Europe.', 'The Congress of Vienna (1815) restored conservative order and a balance of power.', 'Romanticism reacted against Enlightenment rationalism.'],
      terms: [['Estates-General', 'France\'s three-estate assembly.'], ['Tennis Court Oath (1789)', 'Third Estate vowed to write a constitution.'], ['Reign of Terror', 'Robespierre\'s radical phase (1793-1794).'], ['Napoleonic Code', 'Legal equality for men; restricted women.'], ['Continental System', 'Napoleon\'s blockade of Britain.'], ['Congress of Vienna', 'Metternich; legitimacy and balance of power.']],
      know: ['Declaration of the Rights of Man and of the Citizen (1789).'],
      mistakes: ['Skipping the stages of the Revolution.'],
      tips: HIST_TIPS,
    },
    eu6: {
      big: ['Industrialization spread from Britain to the continent.', 'It created new social classes, urban problems and new ideologies.', 'Governments responded with reforms (factory acts, public health).'],
      terms: [['Factory system', 'Centralized machine production.'], ['Urbanization', 'Rapid growth of cities.'], ['Middle class / working class', 'New social groups shaped by industry.'], ['Chartism', 'British movement for working-class voting rights.'], ['Second Industrial Revolution', 'Steel, chemicals, electricity (late 1800s).']],
      know: ['Sadler Report (1832) led to the Factory Act of 1833.', 'Public health reforms: sewers, clean water (Chadwick).'],
      mistakes: ['Saying industrialization affected all of Europe equally and at the same time.'],
      tips: HIST_TIPS,
    },
    eu7: {
      big: ['Ideologies competed: conservatism, liberalism, nationalism, socialism.', 'The revolutions of 1848 mostly failed, but nationalism grew.', 'Italy and Germany unified through Realpolitik.', 'New imperialism expanded European empires in Africa and Asia.'],
      terms: [['Liberalism', 'Constitutions, individual rights, free markets.'], ['Marxism', 'Class struggle; proletarian revolution.'], ['Realpolitik', 'Practical politics (Bismarck, Cavour).'], ['Unification of Germany (1871)', 'Through wars led by Prussia.'], ['Social Darwinism', 'Justified imperialism and racism.'], ['Berlin Conference (1884-1885)', 'Divided Africa.']],
      know: ['Darwin, Freud and Einstein challenged older ideas about science and humanity.'],
      mistakes: ['Confusing 19th-century liberalism with modern American liberalism.'],
      tips: HIST_TIPS,
    },
    eu8: {
      big: ['World War I resulted from alliances, militarism, nationalism and imperialism.', 'The Russian Revolution created the Soviet state.', 'Interwar crises led to fascism and World War II.', 'The Holocaust was a genocide carried out by Nazi Germany.'],
      terms: [['Trench warfare', 'Stalemate on the Western Front.'], ['Treaty of Versailles', 'War guilt clause; reparations.'], ['Bolsheviks', 'Lenin\'s communist party.'], ['Totalitarianism', 'Total state control (Stalin, Hitler, Mussolini).'], ['Appeasement', 'Giving in to Hitler (Munich 1938).'], ['Holocaust', 'Murder of six million Jews and millions of others.']],
      know: ['The League of Nations failed to stop aggression.'],
      mistakes: ['Ignoring the economic causes of fascism (the Great Depression).'],
      tips: HIST_TIPS,
    },
    eu9: {
      big: ['The Cold War divided Europe between NATO and the Warsaw Pact.', 'Western Europe rebuilt with the Marshall Plan and moved toward integration.', 'Communism collapsed in Eastern Europe in 1989-1991.', 'Contemporary Europe faces migration, the EU and nationalism.'],
      terms: [['Iron Curtain', 'Churchill\'s term for the divide (1946).'], ['Marshall Plan', 'US aid to rebuild Europe.'], ['Welfare state', 'Government-provided social services.'], ['European Union', 'Economic and political union (Maastricht 1992).'], ['Solidarity', 'Polish trade union movement.'], ['Glasnost / perestroika', 'Gorbachev\'s openness and restructuring.']],
      know: ['1961: Berlin Wall built;  1989: Berlin Wall falls;  1991: Soviet Union dissolves.'],
      mistakes: ['Treating Eastern and Western Europe after 1945 as the same.'],
      tips: HIST_TIPS,
    },
  });

  // ======================= AP AFRICAN AMERICAN STUDIES =======================
  SW.guides('aas', {
    aa1: {
      big: ['African societies (Mali, Songhai, Kongo, Great Zimbabwe, Aksum) were powerful, connected and learned.', 'The trans-Atlantic slave trade forcibly moved about 12.5 million Africans.', 'Africans carried cultures, knowledge and identities into the diaspora.'],
      terms: [['Diaspora', 'Dispersal of people from their homeland.'], ['Timbuktu', 'Center of Islamic learning in Mali and Songhai.'], ['Middle Passage', 'Forced voyage across the Atlantic.'], ['Kongo', 'Central African kingdom; Afonso I\'s letters protested the slave trade.']],
      know: ['Mansa Musa\'s pilgrimage (1324) showed Mali\'s wealth.', 'Olaudah Equiano\'s narrative described the Middle Passage.'],
      mistakes: ['Starting African American history with slavery.'],
      tips: ['Use sources to show African agency, not only victimization.'],
    },
    aa2: {
      big: ['Enslaved people resisted in daily acts and open revolts.', 'Free Black communities and abolitionists fought slavery through writing, organizing and the Underground Railroad.', 'The Civil War and emancipation were shaped by Black action.'],
      terms: [['Resistance', 'Work slowdowns, escape, preserving culture, revolts.'], ['Stono Rebellion (1739)', 'Largest revolt in the British mainland colonies.'], ['Nat Turner\'s Rebellion (1831)', 'Revolt in Virginia; led to harsher laws.'], ['Underground Railroad', 'Network helping people escape; Harriet Tubman.'], ['Frederick Douglass', 'Abolitionist writer and speaker.'], ['54th Massachusetts', 'Black Union regiment.']],
      know: ['Haitian Revolution (1791-1804) inspired and frightened people in the US.', 'Phillis Wheatley, David Walker, Sojourner Truth.'],
      mistakes: ['Ignoring everyday forms of resistance.'],
      tips: ['Explain how each source shows a strategy of resistance or freedom.'],
    },
    aa3: {
      big: ['Reconstruction brought new rights and Black political participation, then backlash.', 'Jim Crow laws and violence enforced segregation.', 'Leaders debated strategies (Washington, Du Bois, Wells, Garvey).', 'The Great Migration and the Harlem Renaissance reshaped Black life and culture.'],
      terms: [['Freedmen\'s Bureau', 'Aid, schools for freed people.'], ['Black Codes', 'Laws restricting freed people.'], ['Plessy v. Ferguson (1896)', '"Separate but equal."'], ['NAACP (1909)', 'Civil rights organization using courts.'], ['Great Migration', 'Movement from the rural South to Northern and Western cities.'], ['Harlem Renaissance', 'Artistic and intellectual movement (Hughes, Hurston).']],
      know: ['Washington: economic progress first; Du Bois: full rights now; Wells: anti-lynching journalism.'],
      mistakes: ['Treating Black leaders as all agreeing.'],
      tips: ['Compare strategies and explain their effectiveness with evidence.'],
    },
    aa4: {
      big: ['The civil rights movement used courts, nonviolent protest and legislation.', 'Black Power emphasized self-determination and pride.', 'Black feminism, arts and politics continue to shape debates about identity and equality.'],
      terms: [['Brown v. Board (1954)', 'Ended legal school segregation.'], ['Montgomery Bus Boycott (1955-1956)', 'Mass nonviolent protest.'], ['Civil Rights Act (1964) / Voting Rights Act (1965)', 'Major federal protections.'], ['Black Power', 'Self-determination (Malcolm X, Stokely Carmichael).'], ['Black Arts Movement', 'Art for Black liberation.'], ['Intersectionality', 'Overlapping identities like race and gender.']],
      know: ['Freedom Summer (1964); Selma (1965); Black Panther Party (1966).'],
      mistakes: ['Ending the story in 1968.'],
      tips: ['Use the debates within movements to show complexity.'],
    },
  });

  // ======================= AP COMPARATIVE GOVERNMENT =======================
  const SIX = 'Course countries: United Kingdom, Mexico, Nigeria (democracies, with Mexico and Nigeria often called hybrid or developing democracies), Russia, Iran, China (authoritarian).';
  SW.guides('compgov', {
    cg1: {
      big: ['Comparative politics studies states, regimes and governments.', 'Regimes range from democratic to authoritarian.', 'Legitimacy comes from tradition, elections, religion, ideology or performance.', SIX],
      terms: [['State', 'A political unit with sovereignty over territory and people.'], ['Nation', 'People with a shared identity.'], ['Regime', 'Rules and institutions of how power is used.'], ['Government', 'People in charge at a given time.'], ['Legitimacy', 'Belief that the government has the right to rule.'], ['Sovereignty', 'Authority to govern without outside interference.'], ['Democratization', 'Transition toward democracy.'], ['Rule of law vs rule by law', 'Law limits leaders vs law is a tool of leaders.']],
      know: ['UK: parliamentary, unitary (with devolution). Mexico, Nigeria: presidential, federal. Russia: federal, semi-presidential and authoritarian. Iran: theocracy. China: one-party state.'],
      mistakes: ['Using "state," "nation" and "government" interchangeably.'],
      tips: ['Always name a specific course country as your example.'],
    },
    cg2: {
      big: ['Executives, legislatures and courts are structured differently across countries.', 'Parliamentary systems fuse executive and legislature; presidential systems separate them.', 'Judicial independence varies widely.'],
      terms: [['Head of state / head of government', 'Symbolic leader / runs government.'], ['Vote of no confidence', 'Parliament can remove the prime minister.'], ['Term limits', 'Mexico\'s president: one 6-year term.'], ['Judicial review', 'Strong in the US; limited in the UK (parliamentary sovereignty).'], ['Guardian Council', 'Iran: vets candidates and laws.'], ['National People\'s Congress', 'China\'s legislature; largely rubber-stamp.']],
      know: ['UK: Parliament with House of Commons (elected) and House of Lords.', 'Russia: president is dominant; Duma and Federation Council.', 'Nigeria: president with two-term limit; bicameral National Assembly.'],
      mistakes: ['Assuming every country has independent courts.'],
      tips: ['Explain how an institution limits or strengthens executive power.'],
    },
    cg3: {
      big: ['Political culture and socialization shape how citizens participate.', 'Civil society is more independent in democracies.', 'Cleavages (ethnic, religious, regional, class) affect politics.'],
      terms: [['Civil society', 'Groups independent of the state.'], ['Cleavage', 'A division in society.'], ['Political efficacy', 'Belief that you can influence government.'], ['Social movement', 'Organized collective action.'], ['Co-optation', 'Bringing opposition into the regime to control it.']],
      know: ['Nigeria: ethnic and religious cleavages (north mostly Muslim, south mostly Christian).', 'China and Russia restrict independent media and NGOs.'],
      mistakes: ['Ignoring how authoritarian states shape participation.'],
      tips: ['Connect cleavages to specific policies (Nigeria\'s federal character principle).'],
    },
    cg4: {
      big: ['Electoral systems (single-member district vs proportional representation) shape party systems.', 'Parties and interest groups link citizens and government.', 'Authoritarian states hold elections but limit competition.'],
      terms: [['First-past-the-post', 'Plurality winner in single-member districts (UK, Nigeria).'], ['Proportional representation', 'Seats match vote share.'], ['Mixed system', 'Combines both (Mexico, Russia).'], ['Pluralism vs corporatism', 'Many competing groups vs state-recognized groups.'], ['Dominant party system', 'One party wins repeatedly (United Russia).']],
      know: ['Duverger\'s law: SMD tends toward two parties; PR toward multiparty systems.', 'Mexico\'s PRI ruled until 2000.'],
      mistakes: ['Saying elections automatically mean democracy.'],
      tips: ['Use vote vs seat data to show how an electoral system affects outcomes.'],
    },
    cg5: {
      big: ['Globalization and economic reform change politics.', 'Countries balance markets and state control.', 'Natural resources, development and inequality affect stability.'],
      terms: [['Neoliberalism', 'Free markets, privatization, deregulation.'], ['Rentier state', 'Depends on resource revenue (Nigeria, Russia, Iran oil).'], ['Resource curse', 'Resource wealth linked to corruption and weak institutions.'], ['Gini coefficient', 'Measure of inequality.'], ['HDI', 'Human Development Index: health, education, income.']],
      know: ['China: market reforms since 1978 with one-party rule.', 'Mexico: NAFTA/USMCA trade integration.', 'Brexit: UK left the EU in 2020.'],
      mistakes: ['Equating economic growth with democratization.'],
      tips: ['For quantitative questions, describe a trend and connect it to a policy.'],
    },
  });

  // ======================= AP HUMAN GEOGRAPHY =======================
  const HG_TIP = ['FRQs reward specific examples: name a real place for every concept.'];
  SW.guides('hug', {
    hg1: { big: ['Geographers study spatial patterns using maps, data and models.', 'Scale of analysis changes what patterns you see.', 'Humans and environment interact (possibilism vs environmental determinism).'], terms: [['Absolute / relative location', 'Coordinates / position relative to other places.'], ['Site / situation', 'Physical features of a place / its connections to others.'], ['Distance decay', 'Interaction decreases with distance.'], ['Time-space compression', 'Reduced effect of distance through technology.'], ['Formal / functional / perceptual region', 'Shared trait / organized around a node / based on perception.'], ['GIS / GPS / remote sensing', 'Mapping data layers / location / satellite images.']], know: ['Map projections distort shape, area, distance or direction (Mercator distorts area).', 'Scales: global, regional, national, local.'], mistakes: ['Confusing site with situation.'], tips: HG_TIP },
    hg2: { big: ['Population is unevenly distributed; density can be measured in several ways.', 'The demographic transition model links development with birth and death rates.', 'Migration has push and pull factors and can be forced or voluntary.'], terms: [['Arithmetic / physiological density', 'People per land / per arable land.'], ['Total fertility rate', 'Average children per woman.'], ['Dependency ratio', 'Dependents compared with working-age people.'], ['Population pyramid', 'Age-sex structure.'], ['Malthusian theory', 'Population grows faster than food.'], ['Push / pull factors', 'Reasons to leave / reasons to go.'], ['Chain migration', 'Following family or community members.'], ['Pronatalist / antinatalist policy', 'Encourage / discourage births.']], know: ['DTM stages 1-5: high birth and death rates -> death rates fall -> birth rates fall -> both low -> decline.', 'Ravenstein\'s laws of migration.', 'Refugees vs internally displaced persons.'], mistakes: ['Using arithmetic density when physiological density is more meaningful.'], tips: HG_TIP },
    hg3: { big: ['Culture includes beliefs, practices and material objects.', 'Culture spreads through diffusion.', 'Language and religion are key cultural traits with distinct patterns.'], terms: [['Relocation / expansion diffusion', 'People move / ideas spread outward (hierarchical, contagious, stimulus).'], ['Acculturation / assimilation / syncretism', 'Adopting some traits / losing original culture / blending.'], ['Universalizing / ethnic religion', 'Seeks converts (Christianity, Islam, Buddhism) / tied to a group (Hinduism, Judaism).'], ['Lingua franca', 'Common language between groups.'], ['Toponym', 'Place name.'], ['Cultural landscape', 'Visible human imprint on the land.']], know: ['Indo-European is the largest language family.', 'Globalization spreads popular culture and can threaten folk culture.'], mistakes: ['Confusing hierarchical and contagious diffusion.'], tips: HG_TIP },
    hg4: { big: ['States, nations and nation-states differ.', 'Boundaries are drawn in different ways and can cause conflict.', 'Devolution and supranationalism challenge state sovereignty.'], terms: [['Nation-state', 'A state whose people share one national identity (Japan).'], ['Multinational state / stateless nation', 'Many nations in one state / a nation without a state (Kurds).'], ['Geometric / antecedent / subsequent / superimposed / relic boundary', 'Straight lines / before settlement / after / imposed by outsiders / no longer used.'], ['Gerrymandering', 'Drawing districts for political advantage.'], ['Devolution', 'Power moves from central to regional governments.'], ['Supranationalism', 'Countries cooperate in organizations (EU, UN).']], know: ['Centrifugal forces divide; centripetal forces unify.', 'Unitary vs federal states.'], mistakes: ['Using "country," "state" and "nation" interchangeably.'], tips: HG_TIP },
    hg5: { big: ['Agriculture depends on climate, technology and markets.', 'Agricultural revolutions transformed food production.', 'Von Thunen\'s model explains land use by distance to market.'], terms: [['Intensive / extensive farming', 'High inputs per area / low inputs over large areas.'], ['Subsistence / commercial', 'Food for the family / for sale.'], ['Green Revolution', 'High-yield seeds, fertilizer, irrigation.'], ['Agribusiness', 'Large-scale, corporate agriculture.'], ['Food desert', 'Area with little access to healthy food.'], ['Rural settlement patterns', 'Clustered, dispersed, linear.']], know: ['Von Thunen rings: dairy and market gardening, forest, grains, ranching.', 'Commodity chains connect farms to global consumers.'], mistakes: ['Saying the Green Revolution had no negative effects.'], tips: HG_TIP },
    hg6: { big: ['Cities grow because of site, situation and economic functions.', 'Urban models (Burgess, Hoyt, Harris-Ullman, Latin American, African, Southeast Asian) describe city structure.', 'Cities face challenges: sprawl, housing, infrastructure, sustainability.'], terms: [['Primate city', 'More than twice as large as the next city.'], ['Rank-size rule', 'nth city is 1/n the size of the largest.'], ['Central place theory', 'Christaller: market areas and threshold/range.'], ['Gentrification', 'Wealthier people move in and raise costs.'], ['Edge city', 'Business center on the urban edge.'], ['Smart growth / new urbanism', 'Compact, walkable, mixed-use development.']], know: ['Gravity model: interaction depends on population and distance.', 'Informal settlements are common in rapidly growing cities.'], mistakes: ['Confusing the concentric zone and sector models.'], tips: HG_TIP },
    hg7: { big: ['Development is measured with GDP, GNI, HDI and gender indices.', 'Industrialization spread from Britain to the world.', 'Theories (Rostow, Wallerstein) explain uneven development.', 'Globalization shifted manufacturing and services worldwide.'], terms: [['HDI', 'Health, education and income.'], ['Gender Inequality Index', 'Measures gender gaps.'], ['Rostow\'s stages', 'Traditional to high mass consumption.'], ['World-systems theory', 'Core, semi-periphery, periphery.'], ['Outsourcing / offshoring', 'Moving work to other firms / other countries.'], ['Special economic zone', 'Area with incentives for foreign investment.'], ['Sectors', 'Primary (raw materials), secondary (manufacturing), tertiary (services).']], know: ['Weber\'s least cost theory: transport, labor, agglomeration.', 'Microloans and sustainable development goals.'], mistakes: ['Using GDP alone to judge development.'], tips: HG_TIP },
  });

  // ======================= AP MACROECONOMICS =======================
  const GRAPH_TIP = 'On graphs: label both axes, every curve and the equilibrium values, and show shifts with arrows.';
  SW.guides('macro', {
    ma1: { big: ['Scarcity forces choices and opportunity costs.', 'The production possibilities curve shows tradeoffs, efficiency and growth.', 'Comparative advantage explains gains from trade.', 'Supply and demand set prices in markets.'], terms: [['Opportunity cost', 'Value of the next best alternative.'], ['PPC', 'Maximum output combinations with full use of resources.'], ['Absolute / comparative advantage', 'Produce more / lower opportunity cost.'], ['Demand / supply shifters', 'Income, tastes, prices of related goods / input costs, technology.']], know: ['Points inside the PPC are inefficient; outside are unattainable.', 'Trade based on comparative advantage benefits both sides.'], mistakes: ['Confusing a change in quantity demanded (movement) with a change in demand (shift).'], tips: [GRAPH_TIP] },
    ma2: { big: ['GDP measures output; unemployment and inflation measure economic health.', 'The business cycle moves through expansion and recession.', 'Real values adjust for inflation.'], terms: [['GDP', 'C + I + G + Xn.'], ['Real vs nominal GDP', 'Adjusted for inflation vs current prices.'], ['Unemployment rate', 'Unemployed / labor force x 100.'], ['Frictional / structural / cyclical', 'Between jobs / skills mismatch / due to recession.'], ['Natural rate', 'Frictional + structural.'], ['CPI', 'Price level of a basket of goods.']], know: ['Inflation rate = (new CPI - old CPI)/old CPI x 100', 'Real GDP = nominal GDP / price index x 100', 'Not in GDP: used goods, financial transactions, intermediate goods, transfer payments.'], mistakes: ['Counting discouraged workers as unemployed (they are not in the labor force).'], tips: [GRAPH_TIP] },
    ma3: { big: ['The AD-AS model shows output and price level.', 'Shifts in AD or SRAS create recessionary or inflationary gaps.', 'Fiscal policy (government spending and taxes) shifts AD; multipliers magnify effects.'], terms: [['Aggregate demand', 'Total spending at each price level.'], ['SRAS / LRAS', 'Short-run supply / vertical at full-employment output.'], ['Recessionary / inflationary gap', 'Output below / above full employment.'], ['Spending multiplier', '1/MPS.'], ['Tax multiplier', '-MPC/MPS.'], ['Automatic stabilizers', 'Taxes and transfers that change automatically.']], know: ['Expansionary fiscal policy: increase G or cut taxes -> AD right.', 'MPC + MPS = 1.'], mistakes: ['Using the spending multiplier for a tax change.'], tips: [GRAPH_TIP] },
    ma4: { big: ['Money serves as a medium of exchange, unit of account and store of value.', 'Banks create money through fractional reserve lending.', 'The Fed conducts monetary policy, changing interest rates and the money supply.'], terms: [['Money multiplier', '1 / reserve requirement.'], ['Required / excess reserves', 'Must keep / can lend.'], ['Open market operations', 'Buying bonds increases the money supply.'], ['Federal funds rate', 'Rate banks charge each other overnight.'], ['Money market graph', 'Nominal interest rate vs quantity of money.'], ['Loanable funds market', 'Real interest rate vs quantity of loanable funds.']], know: ['Expansionary monetary policy: buy bonds, lower interest on reserves or discount rate -> lower interest rates -> more investment -> AD right.', 'Bond prices and interest rates move in opposite directions.'], mistakes: ['Mixing up the money market (nominal rate) and loanable funds market (real rate).'], tips: [GRAPH_TIP] },
    ma5: { big: ['In the long run, the economy returns to full employment.', 'The Phillips curve shows a short-run tradeoff between inflation and unemployment.', 'Deficits can crowd out private investment.', 'Economic growth shifts LRAS right.'], terms: [['SRPC / LRPC', 'Short-run tradeoff / vertical at natural unemployment.'], ['Crowding out', 'Government borrowing raises interest rates, lowering investment.'], ['Quantity theory of money', 'MV = PQ.'], ['Economic growth', 'Increase in potential output (capital, technology, human capital).']], know: ['Supply shocks shift the SRPC (stagflation).', 'Deficit vs debt: one year\'s shortfall vs total accumulated.'], mistakes: ['Confusing deficit and debt.'], tips: [GRAPH_TIP] },
    ma6: { big: ['The balance of payments records international transactions.', 'Exchange rates are set in foreign exchange markets.', 'Interest rates and policy affect currency values and net exports.'], terms: [['Current account', 'Trade in goods and services, income, transfers.'], ['Financial (capital) account', 'Investment flows.'], ['Appreciation / depreciation', 'Currency gains / loses value.'], ['Net exports', 'Exports minus imports.']], know: ['Current account + financial account = 0 (roughly).', 'Higher US interest rates -> more demand for dollars -> dollar appreciates -> net exports fall.'], mistakes: ['Shifting the wrong curve in the foreign exchange market.'], tips: [GRAPH_TIP] },
  });

  // ======================= AP MICROECONOMICS =======================
  SW.guides('micro', {
    mi1: { big: ['Scarcity and opportunity cost underlie every decision.', 'PPCs show tradeoffs; comparative advantage drives trade.', 'Marginal analysis: do more of an activity while marginal benefit >= marginal cost.'], terms: [['Opportunity cost', 'Next best alternative given up.'], ['Marginal benefit / marginal cost', 'Extra benefit / cost of one more unit.'], ['Utility maximization', 'MU per dollar equal across goods.'], ['Comparative advantage', 'Lower opportunity cost.']], know: ['Utility maximization rule: MUa/Pa = MUb/Pb.', 'Terms of trade must fall between the two opportunity costs.'], mistakes: ['Using total instead of marginal values.'], tips: [GRAPH_TIP] },
    mi2: { big: ['Supply and demand determine price and quantity.', 'Elasticity measures responsiveness.', 'Price controls and taxes create shortages, surpluses and deadweight loss.', 'Consumer and producer surplus measure welfare.'], terms: [['Price elasticity of demand', 'Percent change in Qd / percent change in P.'], ['Elastic / inelastic', '|E| > 1 / |E| < 1.'], ['Price ceiling / floor', 'Maximum price (shortage if binding) / minimum price (surplus).'], ['Deadweight loss', 'Lost total surplus.'], ['Tax incidence', 'Who bears the burden; the more inelastic side pays more.']], know: ['Total revenue test: if price rises and TR rises, demand is inelastic.', 'Binding ceiling: below equilibrium. Binding floor: above equilibrium.'], mistakes: ['Saying a ceiling above equilibrium causes a shortage (it is not binding).'], tips: [GRAPH_TIP] },
    mi3: { big: ['Firms face short-run and long-run costs.', 'Profit is maximized where MR = MC.', 'Perfectly competitive firms are price takers; they earn zero economic profit in the long run.'], terms: [['Fixed / variable cost', 'Does not / does change with output.'], ['ATC / AVC / MC', 'Average total, average variable, marginal cost.'], ['Shutdown rule', 'Shut down in the short run if P < minimum AVC.'], ['Economic vs accounting profit', 'Subtracts implicit costs too.'], ['Allocative / productive efficiency', 'P = MC / P = minimum ATC.']], know: ['Perfect competition: P = MR = D (horizontal).', 'Long run: entry and exit drive economic profit to zero.'], mistakes: ['Confusing economic profit with accounting profit.'], tips: [GRAPH_TIP] },
    mi4: { big: ['Monopolies set MR = MC and charge a price above MC.', 'Monopolistic competition has differentiated products and zero long-run profit.', 'Oligopolies are interdependent; game theory models their choices.'], terms: [['Monopoly', 'Single seller; barriers to entry.'], ['Price discrimination', 'Charging different prices to different buyers.'], ['Natural monopoly', 'One firm can supply the market at lowest cost.'], ['Nash equilibrium', 'No player can improve by changing strategy alone.'], ['Dominant strategy', 'Best choice no matter what the other does.']], know: ['Monopoly: MR is below demand; deadweight loss exists.', 'Perfect price discrimination: no deadweight loss, no consumer surplus.'], mistakes: ['Reading the price at MR instead of up to the demand curve.'], tips: [GRAPH_TIP] },
    mi5: { big: ['Factor markets set wages and prices of inputs.', 'Firms hire until MRP = MRC.', 'A monopsony pays a wage below MRP and hires fewer workers.'], terms: [['Derived demand', 'Demand for labor depends on demand for the product.'], ['MRP', 'Marginal product x marginal revenue.'], ['MRC (MFC)', 'Cost of hiring one more worker.'], ['Least-cost rule', 'MPL/wage = MPK/rent.']], know: ['Perfectly competitive labor market: firm is a wage taker (MRC = wage).'], mistakes: ['Using MP instead of MRP.'], tips: [GRAPH_TIP] },
    mi6: { big: ['Externalities cause markets to over- or under-produce.', 'Public goods are under-provided by markets (free riders).', 'Government policies (taxes, subsidies, regulation) can correct market failures.', 'Income inequality is measured with the Lorenz curve and Gini coefficient.'], terms: [['Negative externality', 'MSC > MPC; overproduction.'], ['Positive externality', 'MSB > MPB; underproduction.'], ['Pigouvian tax / subsidy', 'Corrects negative / positive externalities.'], ['Public good', 'Nonrival and nonexcludable.'], ['Lorenz curve', 'Shows income distribution; Gini measures inequality.']], know: ['Socially optimal: MSB = MSC.', 'Deadweight loss triangle points toward the socially optimal quantity.'], mistakes: ['Shifting the wrong curve for an externality.'], tips: [GRAPH_TIP] },
  });
})();
