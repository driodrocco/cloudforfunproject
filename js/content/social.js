/* Social sciences: AP Psychology, AP US Government and Politics,
 * AP Comparative Government and Politics, AP Human Geography. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;

  // ======================= AP PSYCHOLOGY =======================
  SW.defineCourse('psych', {
    name: 'AP Psychology', short: 'Psychology', subject: 'History and Social Sciences',
    units: [
      ['ps1', 1, 'Biological Bases of Behavior', '15-25%'],
      ['ps2', 2, 'Cognition', '15-25%'],
      ['ps3', 3, 'Development and Learning', '15-25%'],
      ['ps4', 4, 'Social Psychology and Personality', '15-25%'],
      ['ps5', 5, 'Mental and Physical Health', '15-25%'],
    ],
    format: '75 multiple-choice questions (90 min, 66.7%) + 2 free-response questions: an article analysis question and an evidence-based question (70 min, 33.3%)',
    dist: { year: 2025, 5: 14.4, 4: 30.9, 3: 25.2 },
    past: 'https://apcentral.collegeboard.org/courses/ap-psychology/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/science/ap-psychology',
    calcLabel: 'Research statistics',
  });

  add('ps2', 'Mean of a data set', () => {
    const xs = Array.from({ length: R(5, 8, 1) }, () => R(1, 20, 1)), m = r3(xs.reduce((a, b) => a + b, 0) / xs.length);
    return W().l('Descriptive statistics', `scores: ${xs.join(', ')}`, '').f('mean = sum / count')
      .l(`sum = ${xs.reduce((a, b) => a + b, 0)}, count = ${xs.length}`, `mean = ${num(m)}`)
      .done(`Participants recalled ${xs.join(', ')} words. What is the mean?`, m, 'words');
  });
  add('ps2', 'Median of a data set', () => {
    const xs = Array.from({ length: R(5, 8, 1) }, () => R(1, 30, 1)), s = [...xs].sort((a, b) => a - b), n = s.length;
    const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    return W().l('Descriptive statistics', `data: ${xs.join(', ')}`, '').f('median = middle value after sorting (average the two middle values if the count is even)')
      .l(`sorted: ${s.join(', ')}`, `median = ${g(med)}`)
      .n('The median resists outliers better than the mean.')
      .done(`Find the median of: ${xs.join(', ')}.`, med, '');
  });
  add('ps3', 'Percent who scored within one standard deviation', () => {
    const mu = R(80, 120, 5), sd = R(5, 20, 1);
    return W().l('Normal curve', `mean = ${mu}, SD = ${sd}`, `range ${mu - sd} to ${mu + sd}`, '').f('In a normal distribution: about 68% within 1 SD, 95% within 2 SD, 99.7% within 3 SD')
      .l(`${mu - sd} to ${mu + sd} is within 1 SD of the mean`, 'about 68%')
      .done(`IQ-style scores have mean ${mu} and standard deviation ${sd}. About what percent of people score between ${mu - sd} and ${mu + sd}?`, 68, '%');
  });

  SW.mcqs('ps1', [
    ['neurotransmitters', 'Which neurotransmitter is most linked to reward and movement (and Parkinson\'s disease)?', ['Serotonin', 'Dopamine', 'GABA', 'Acetylcholine'], 1, 'Parkinson\'s involves loss of dopamine-producing neurons.'],
    ['brain regions', 'Damage to Broca\'s area most likely causes difficulty:', ['Understanding speech', 'Producing speech', 'Seeing faces', 'Forming new memories'], 1, 'Broca\'s area (frontal lobe) controls speech production; Wernicke\'s handles comprehension.'],
    ['action potential', 'An action potential is "all-or-none," meaning:', ['Stronger stimuli make bigger action potentials', 'A neuron either fires fully or not at all', 'All neurons fire together', 'Neurons never rest'], 1, 'Intensity is coded by how often neurons fire, not how strongly.'],
    ['sleep stages', 'Vivid dreaming mostly happens during:', ['NREM stage 1', 'NREM stage 3', 'REM sleep', 'Hypnagogic state'], 2, 'REM sleep has fast brain waves and muscle paralysis.'],
  ]);
  SW.mcqs('ps2', [
    ['memory encoding', 'Remembering a list better by relating each word to your own life shows:', ['Shallow processing', 'The self-reference effect (deep processing)', 'Proactive interference', 'Source amnesia'], 1, 'Meaningful, personal encoding sticks better.'],
    ['heuristics', 'Judging how likely plane crashes are based on how easily news stories come to mind is the:', ['Representativeness heuristic', 'Availability heuristic', 'Confirmation bias', 'Framing effect'], 1, 'Vivid, recent examples feel more common than they are.'],
    ['research methods', 'Only an experiment can show cause and effect because it:', ['Uses large samples', 'Randomly assigns participants and manipulates the independent variable', 'Uses surveys', 'Measures correlation'], 1, 'Random assignment controls confounding variables.'],
    ['correlation', 'A correlation of r = -0.85 between screen time and sleep means:', ['Screen time causes less sleep', 'A strong negative relationship', 'A weak relationship', 'No relationship'], 1, 'Strong because it is near -1; negative because one goes up as the other goes down. It still does not prove cause.'],
  ]);
  SW.mcqs('ps3', [
    ['classical conditioning', 'In Pavlov\'s experiment, salivating to the bell after training is the:', ['Unconditioned response', 'Conditioned response', 'Neutral stimulus', 'Unconditioned stimulus'], 1, 'A learned response to a once-neutral stimulus.'],
    ['operant conditioning', 'Taking away a teen\'s phone to reduce late arrivals is:', ['Positive reinforcement', 'Negative reinforcement', 'Positive punishment', 'Negative punishment'], 3, 'Something good is removed to decrease a behavior.'],
    ['piaget', 'A child who understands that pouring water into a taller glass does not change the amount has achieved:', ['Object permanence', 'Conservation', 'Egocentrism', 'Theory of mind'], 1, 'Conservation develops in the concrete operational stage.'],
    ['attachment', 'In Ainsworth\'s Strange Situation, a securely attached infant typically:', ['Ignores the parent', 'Is upset when the parent leaves and comforted on return', 'Clings and cannot be soothed', 'Shows no emotion'], 1, 'The parent is a secure base.'],
  ]);
  SW.mcqs('ps4', [
    ['fundamental attribution error', 'Assuming a driver who cut you off is a rude person, while ignoring that they might be rushing to a hospital, is the:', ['Self-serving bias', 'Fundamental attribution error', 'Halo effect', 'Just-world phenomenon'], 1, 'We overrate personality and underrate the situation for others.'],
    ['conformity', 'Asch\'s line studies showed that people:', ['Never conform', 'Often go along with a group even when the group is clearly wrong', 'Always obey authority', 'Work harder in groups'], 1, 'About a third of responses conformed to the wrong answer.'],
    ['big five', 'Which is one of the Big Five personality traits?', ['Intelligence', 'Conscientiousness', 'Optimism', 'Creativity'], 1, 'OCEAN: openness, conscientiousness, extraversion, agreeableness, neuroticism.'],
  ]);
  SW.mcqs('ps5', [
    ['stress response', 'The general adaptation syndrome has which stages, in order?', ['Alarm, resistance, exhaustion', 'Resistance, alarm, recovery', 'Fight, flight, freeze', 'Denial, anger, acceptance'], 0, 'Selye\'s model of how the body responds to long-term stress.'],
    ['dsm disorders', 'Persistent sadness and loss of interest for at least two weeks suggests:', ['Generalized anxiety disorder', 'Major depressive disorder', 'Bipolar disorder', 'Schizophrenia'], 1, 'Those are core symptoms in the DSM-5-TR.'],
    ['cbt', 'Cognitive-behavioral therapy mainly works by:', ['Exploring unconscious childhood conflicts', 'Changing unhelpful thoughts and behaviors', 'Prescribing medication', 'Free association'], 1, 'It targets how thoughts drive feelings and actions.'],
  ]);

  SW.frq('ps2', 'Article analysis question (AAQ)',
    'Read this summary of a study (written for practice):\nResearchers randomly assigned 120 college students to study a word list either while their phone was face-up on the desk or while it was in another room. Participants then took a 40-word recall test. The phone-in-another-room group recalled an average of 24 words; the phone-on-desk group recalled 19. The difference was statistically significant (p < .05). Participants were from one university and were mostly 18-20 years old.\n(a) Identify the research method used and explain how you know.\n(b) State the operational definition of the dependent variable.\n(c) Describe what the statistical significance means.\n(d) Identify one ethical guideline the researchers should have followed.\n(e) Explain one limitation that affects how well these findings generalize.\n(f) Explain how the findings support or refute the claim that phones on desks hurt memory.',
    [[1, '(a) Experiment, because participants were randomly assigned to conditions'], [1, '(b) Number of words recalled on the 40-word test'], [1, '(c) The difference is unlikely to be due to chance alone'], [1, '(d) Valid guideline: informed consent, debriefing, confidentiality, no harm, right to withdraw'], [1, '(e) Sample was from one university and narrow age range, so may not generalize'], [2, '(f) Supports the claim, citing the higher recall (24 vs 19) with the phone in another room']],
    '(a) Experiment: participants were randomly assigned to the phone-present or phone-absent condition.\n(b) The number of words (out of 40) correctly recalled.\n(c) p < .05 means a difference this large would be very unlikely if the phone location had no real effect.\n(d) Informed consent: participants must agree after being told what the study involves.\n(e) All participants were 18-20-year-olds from one university, so results may not apply to older adults or other populations.\n(f) It supports the claim: students with the phone out of the room recalled more words (24) than those with it on the desk (19), and the difference was significant.');
  SW.frq('ps4', 'Evidence-based question (EBQ)',
    'Develop and justify an argument about whether group settings make people less likely to help someone in need. Use psychological concepts and evidence (for example, the bystander effect, diffusion of responsibility, social norms, or studies you know).\n(a) State a defensible claim.\n(b) Support it with one piece of specific evidence and explain how it supports your claim using a psychological concept.\n(c) Support it with a second piece of evidence and explain it with a different psychological concept.',
    [[1, '(a) Defensible claim that answers the question'], [2, '(b) Cites specific evidence (e.g., Darley and Latane studies) and explains it with a relevant concept'], [2, '(c) Second piece of evidence explained with a different concept']],
    '(a) Group settings often make individuals less likely to help, because responsibility is spread across people.\n(b) Darley and Latane found that participants who believed others could also hear someone having a seizure were slower and less likely to help than those who believed they were alone. This shows diffusion of responsibility: each person assumes someone else will act.\n(c) In ambiguous situations people look to others for cues (informational social influence). If everyone stays calm, each bystander concludes there is no emergency, a pattern called pluralistic ignorance, which further reduces helping.');

  SW.REF.psych = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Research methods</h4><table>
        <tr><td>Experiment: random assignment + manipulated IV = cause and effect</td></tr>
        <tr><td>Correlation (-1 to +1): strength and direction, not cause</td></tr>
        <tr><td>Operational definition: exactly how a variable is measured</td></tr>
        <tr><td>Normal curve: 68% within 1 SD, 95% within 2, 99.7% within 3</td></tr>
        <tr><td>Ethics: informed consent, debriefing, confidentiality, protection from harm</td></tr></table></div>
      <div class="ref-unit"><h4>Learning</h4><table>
        <tr><td>Classical: NS + UCS -> UCR; then CS -> CR</td></tr>
        <tr><td>Operant: reinforcement increases behavior; punishment decreases it. Positive = add, negative = remove.</td></tr>
        <tr><td>Schedules: fixed/variable ratio/interval; variable ratio resists extinction most</td></tr></table></div>
      <div class="ref-unit"><h4>Free-response tips</h4><table>
        <tr><td>AAQ (7 pts): method, variables, statistics, ethics, generalizability, and whether data support a claim.</td></tr>
        <tr><td>EBQ (7 pts): a claim, then evidence + explanation with psychological concepts, twice.</td></tr>
        <tr><td>Always apply the term to the scenario. A definition alone rarely earns the point.</td></tr></table></div>
    </div>`;

  // ======================= AP US GOVERNMENT =======================
  SW.defineCourse('gov', {
    name: 'AP US Government and Politics', short: 'US Gov', subject: 'History and Social Sciences',
    units: [
      ['gv1', 1, 'Foundations of American Democracy', '15-22%'],
      ['gv2', 2, 'Interactions Among Branches of Government', '25-36%'],
      ['gv3', 3, 'Civil Liberties and Civil Rights', '13-18%'],
      ['gv4', 4, 'American Political Ideologies and Beliefs', '10-15%'],
      ['gv5', 5, 'Political Participation', '20-27%'],
    ],
    format: '55 multiple-choice questions (80 min, 50%) + 4 free-response questions: concept application, quantitative analysis, SCOTUS comparison, argument essay (100 min, 50%)',
    dist: { year: 2025, 5: 23.7, 4: 24.8, 3: 23.2 },
    past: 'https://apcentral.collegeboard.org/courses/ap-united-states-government-and-politics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/us-government-and-civics',
    calcLabel: 'Required cases',
  });
  SW.dates('gv1', [['McCulloch v. Maryland', 1819], ['United States v. Lopez', 1995]]);
  SW.dates('gv2', [['Marbury v. Madison', 1803], ['Baker v. Carr', 1962], ['Shaw v. Reno', 1993]]);
  SW.dates('gv3', [['Schenck v. United States', 1919], ['Brown v. Board of Education', 1954], ['Engel v. Vitale', 1962], ['Gideon v. Wainwright', 1963], ['Tinker v. Des Moines', 1969], ['New York Times Co. v. United States', 1971], ['Wisconsin v. Yoder', 1972], ['Roe v. Wade', 1973], ['McDonald v. Chicago', 2010]]);
  SW.dates('gv5', [['Citizens United v. FEC', 2010]]);

  SW.mcqs('gv1', [
    ['federalist 10', 'In Federalist No. 10, Madison argues that the dangers of factions are best controlled by:', ['Banning political parties', 'A large republic with many competing interests', 'A strong monarchy', 'Direct democracy'], 1, 'In a large republic, no single faction can easily dominate.'],
    ['federalism', 'Categorical grants differ from block grants because they:', ['Give states more freedom', 'Come with specific rules on how money is spent', 'Are not federal money', 'Only go to cities'], 1, 'Block grants are broad; categorical grants have strings attached.'],
    ['articles of confederation', 'A key weakness of the Articles of Confederation was:', ['A too-powerful president', 'No national power to tax', 'Too many federal courts', 'A national bank'], 1, 'Shays\' Rebellion highlighted the weak central government.'],
  ]);
  SW.mcqs('gv2', [
    ['checks and balances', 'Which is an example of a check by Congress on the president?', ['Vetoing a bill', 'Overriding a veto with a two-thirds vote', 'Appointing judges', 'Issuing executive orders'], 1, 'Congress can override with two-thirds in both houses.'],
    ['judicial review', 'Judicial review was established in:', ['McCulloch v. Maryland', 'Marbury v. Madison', 'Brown v. Board', 'Baker v. Carr'], 1, 'The Court claimed the power to strike down laws as unconstitutional.'],
    ['filibuster', 'A filibuster can only happen in:', ['The House', 'The Senate', 'The Supreme Court', 'State legislatures only'], 1, 'Ending one takes a cloture vote of 60 senators.'],
    ['bureaucracy discretion', 'Bureaucratic agencies gain power through discretionary authority, which means they:', ['Write the Constitution', 'Decide how to carry out laws passed by Congress', 'Appoint judges', 'Declare war'], 1, 'Congress writes broad laws; agencies fill in the details.'],
  ]);
  SW.mcqs('gv3', [
    ['selective incorporation', 'Selective incorporation applies the Bill of Rights to the states through the:', ['Tenth Amendment', 'Due process clause of the 14th Amendment', 'Commerce clause', 'Necessary and proper clause'], 1, 'Example: McDonald v. Chicago applied the Second Amendment to states.'],
    ['establishment clause', 'Engel v. Vitale ruled that school-sponsored prayer in public schools violates:', ['The free exercise clause', 'The establishment clause', 'The equal protection clause', 'The Fourth Amendment'], 1, 'Government cannot sponsor religion.'],
    ['symbolic speech', 'Tinker v. Des Moines protected students wearing armbands because it was:', ['Commercial speech', 'Symbolic speech that did not disrupt school', 'Obscene', 'A clear and present danger'], 1, 'Students do not lose their rights "at the schoolhouse gate."'],
  ]);
  SW.mcqs('gv4', [
    ['political socialization', 'The process by which people form political beliefs, largely from family, is:', ['Political efficacy', 'Political socialization', 'Polarization', 'Linkage'], 1, 'Family is usually the strongest early influence.'],
    ['ideology economic', 'Liberals generally favor ___ government regulation of the economy than conservatives.', ['Less', 'More', 'The same', 'No'], 1, 'Libertarians favor the least.'],
  ]);
  SW.mcqs('gv5', [
    ['interest groups', 'Interest groups influence policy mainly by:', ['Running candidates for president', 'Lobbying, donating through PACs and mobilizing members', 'Writing court decisions', 'Counting votes'], 1, 'They seek to shape policy, not to win office.'],
    ['citizens united', 'Citizens United v. FEC (2010) ruled that:', ['Corporations cannot spend on elections', 'Limits on independent political spending by corporations and unions violate free speech', 'PACs are illegal', 'Elections must be publicly funded'], 1, 'It led to the growth of super PACs.'],
    ['voter turnout', 'Which group typically has the highest voter turnout?', ['18-24 year olds', 'Older, more educated citizens', 'People who just moved', 'Non-citizens'], 1, 'Age, education and income all predict higher turnout.'],
  ]);

  SW.frq('gv2', 'Concept application',
    'In recent years, presidents have increasingly used executive orders to achieve policy goals when Congress does not pass legislation.\n(a) Describe the power the president is using in this scenario.\n(b) Explain how Congress could respond to limit this use of presidential power.\n(c) Explain how the judicial branch could check the president in this situation.',
    [[1, '(a) Executive orders: directives that manage how the executive branch carries out laws'], [1, '(b) Congress can pass a law overriding the order, limit funding (power of the purse), or hold oversight hearings'], [1, '(c) Courts can rule an executive order unconstitutional or beyond the president\'s legal authority (judicial review)']],
    '(a) Executive orders let the president direct federal agencies on how to enforce laws without new legislation from Congress.\n(b) Congress could pass a law that overrides the order or refuse to fund the program it creates, using the power of the purse.\n(c) Federal courts can use judicial review to strike down an executive order that exceeds the president\'s constitutional or statutory authority.');
  SW.frq('gv1', 'Argument essay: federalism',
    'Develop an argument that explains whether a strong national government or strong state governments better protect citizens\' rights.\nUse at least ONE piece of evidence from: the Constitution, Federalist No. 10, Brutus No. 1, Federalist No. 51, Letter from a Birmingham Jail.\n- Articulate a defensible claim with a line of reasoning.\n- Support it with two pieces of specific evidence (one from the list).\n- Use reasoning to explain why the evidence supports your claim.\n- Respond to an opposing perspective.',
    [[1, 'Claim: defensible thesis with a line of reasoning'], [3, 'Evidence: two pieces of specific, relevant evidence, at least one from the required list (1 point for one piece; 2 for two pieces, one from list; 3 when both support the claim)'], [1, 'Reasoning: explains why or how the evidence supports the claim'], [1, 'Responds to an opposing or alternate perspective with refutation, concession or rebuttal']],
    'Claim: A strong national government better protects citizens\' rights because states have historically used their power to deny rights to minorities. Evidence 1: The 14th Amendment\'s equal protection clause, applied in Brown v. Board, let the national government end state-run school segregation. Evidence 2: In Letter from a Birmingham Jail, King argued that unjust state and local laws must be challenged, showing why national protection was needed. Reasoning: national standards keep a majority in one state from denying rights. Rebuttal: Brutus No. 1 warned a strong national government could threaten liberty, but the Bill of Rights and judicial review limit national power while still protecting individuals.');

  SW.REF.gov = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Required Supreme Court cases</h4><table>
        <tr><td>Marbury v. Madison (1803): judicial review</td></tr><tr><td>McCulloch v. Maryland (1819): implied powers, national supremacy</td></tr>
        <tr><td>Schenck v. US (1919): clear and present danger</td></tr><tr><td>Brown v. Board (1954): school segregation unconstitutional</td></tr>
        <tr><td>Baker v. Carr (1962): redistricting is justiciable; one person, one vote</td></tr><tr><td>Engel v. Vitale (1962): no school-sponsored prayer</td></tr>
        <tr><td>Gideon v. Wainwright (1963): right to an attorney</td></tr><tr><td>Tinker v. Des Moines (1969): student symbolic speech</td></tr>
        <tr><td>NYT v. US (1971): prior restraint</td></tr><tr><td>Wisconsin v. Yoder (1972): free exercise</td></tr>
        <tr><td>Roe v. Wade (1973): privacy (overturned by Dobbs, 2022)</td></tr><tr><td>Shaw v. Reno (1993): racial gerrymandering</td></tr>
        <tr><td>US v. Lopez (1995): limits on the commerce clause</td></tr><tr><td>McDonald v. Chicago (2010): Second Amendment incorporated</td></tr>
        <tr><td>Citizens United v. FEC (2010): independent political spending is speech</td></tr></table></div>
      <div class="ref-unit"><h4>Foundational documents</h4><table>
        <tr><td>Declaration of Independence; Articles of Confederation; Constitution</td></tr>
        <tr><td>Federalist 10 (factions), 51 (checks and balances), 70 (single executive), 78 (judiciary)</td></tr>
        <tr><td>Brutus No. 1 (Anti-Federalist); Letter from a Birmingham Jail</td></tr></table></div>
    </div>`;

  // ======================= AP COMPARATIVE GOVERNMENT =======================
  SW.defineCourse('compgov', {
    name: 'AP Comparative Government and Politics', short: 'Comp Gov', subject: 'History and Social Sciences',
    units: [
      ['cg1', 1, 'Political Systems, Regimes, and Governments', '18-27%'],
      ['cg2', 2, 'Political Institutions', '22-33%'],
      ['cg3', 3, 'Political Culture and Participation', '11-18%'],
      ['cg4', 4, 'Party and Electoral Systems and Citizen Organizations', '13-18%'],
      ['cg5', 5, 'Political and Economic Changes and Development', '16-24%'],
    ],
    format: '55 multiple-choice questions (60 min, 50%) + 4 free-response questions: conceptual analysis, quantitative analysis, comparative analysis, argument essay (90 min, 50%). Course countries: UK, Russia, China, Iran, Mexico, Nigeria.',
    dist: { year: 2025, 5: 16.3, 4: 23.3, 3: 32.2 },
    past: 'https://apcentral.collegeboard.org/courses/ap-comparative-government-and-politics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/ap-us-government-and-politics',
  });
  SW.mcqs('cg1', [
    ['regime types', 'Which course country is a theocracy where religious leaders hold supreme power?', ['Mexico', 'Iran', 'Nigeria', 'United Kingdom'], 1, 'The Supreme Leader is a senior cleric.'],
    ['legitimacy', 'The Chinese Communist Party has relied heavily on which source of legitimacy since the 1980s?', ['Free elections', 'Economic growth (performance legitimacy)', 'Religious authority', 'Traditional monarchy'], 1, 'Rising living standards help justify one-party rule.'],
    ['sovereignty', 'Devolution in the United Kingdom means:', ['Abolishing Parliament', 'Transferring some powers to regional governments like Scotland', 'Joining the EU', 'Electing the Prime Minister directly'], 1, 'Scotland, Wales and Northern Ireland have their own assemblies.'],
  ]);
  SW.mcqs('cg2', [
    ['parliamentary vs presidential', 'In a parliamentary system such as the UK, the head of government is:', ['Directly elected by voters', 'Chosen from the majority in the legislature', 'Appointed by courts', 'A hereditary monarch'], 1, 'The Prime Minister leads the majority party in the House of Commons.'],
    ['judicial independence', 'Which course country has the strongest tradition of independent courts?', ['China', 'Iran', 'United Kingdom', 'Russia'], 2, 'UK courts are independent, though Parliament is sovereign.'],
    ['semi presidential', 'Russia\'s system, with both a president and a prime minister, is best described as:', ['Parliamentary', 'Semi-presidential with a dominant president', 'Purely presidential', 'Theocratic'], 1, 'The president appoints the PM and holds most power.'],
  ]);
  SW.mcqs('cg3', [
    ['civil society', 'Civil society refers to:', ['The military', 'Voluntary groups outside government, like NGOs and unions', 'Political parties in power', 'The bureaucracy'], 1, 'A strong civil society can check government power.'],
    ['social cleavage', 'Nigeria\'s politics are strongly shaped by cleavages based on:', ['Social class only', 'Ethnicity, religion and region', 'Language only', 'Age'], 1, 'Muslim north vs. Christian south, and hundreds of ethnic groups.'],
  ]);
  SW.mcqs('cg4', [
    ['electoral systems', 'Single-member district plurality systems tend to produce:', ['Many small parties', 'Two dominant parties', 'Coalition governments always', 'No parties'], 1, "Duverger's law: winner-take-all rewards big parties."],
    ['proportional representation', 'Proportional representation systems give seats based on:', ['Who wins each district', 'The percentage of votes each party gets', 'Population of regions', 'Appointment'], 1, 'Mexico and Russia use mixed systems with a PR portion.'],
  ]);
  SW.mcqs('cg5', [
    ['economic liberalization', 'Mexico\'s joining NAFTA in 1994 is an example of:', ['Nationalization', 'Economic liberalization', 'Import substitution', 'Collectivization'], 1, 'Opening to free trade and foreign investment.'],
    ['resource curse', 'Nigeria\'s dependence on oil has contributed to:', ['Diverse industry', 'Corruption and economic instability (the resource curse)', 'Low inequality', 'Strong democracy'], 1, 'Oil wealth can weaken accountability and other sectors.'],
  ]);
  SW.frq('cg2', 'Comparative analysis: executive power',
    'Compare how executive power is limited in two different AP Comparative Government course countries.\n(a) Define executive term limits.\n(b) Describe how executive power is limited in one course country.\n(c) Describe how executive power is limited (or not) in a second course country.\n(d) Explain one reason why the two countries differ.',
    [[1, '(a) Correct definition (a legal cap on how long or how many terms an executive can serve)'], [1, '(b) Accurate description for a first country'], [1, '(c) Accurate description for a second country'], [2, '(d) Explains a reason for the difference (regime type, rule of law, party system, constitution)']],
    '(a) Term limits legally restrict how many terms or years a chief executive may serve.\n(b) In Mexico, the president serves a single six-year term (sexenio) with no reelection, and Congress and courts provide checks.\n(c) In Russia, constitutional amendments in 2020 reset presidential term counts, allowing Putin to stay in power, so formal limits are weak in practice.\n(d) Mexico\'s democratic transition and history with long one-party rule made no-reelection a core principle, while Russia\'s dominant-party authoritarian system lets the executive change the rules.');
  SW.REF.compgov = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>The six course countries</h4><table>
        <tr><td><b>UK:</b> parliamentary democracy, unitary with devolution, FPTP, Prime Minister, constitutional monarchy</td></tr>
        <tr><td><b>Mexico:</b> presidential democracy, federal, mixed electoral system, one 6-year term</td></tr>
        <tr><td><b>Nigeria:</b> presidential, federal, ethnic and religious cleavages, oil economy</td></tr>
        <tr><td><b>Russia:</b> semi-presidential, authoritarian, dominant party (United Russia)</td></tr>
        <tr><td><b>China:</b> one-party communist state, CCP, National People's Congress</td></tr>
        <tr><td><b>Iran:</b> theocratic republic, Supreme Leader, Guardian Council</td></tr></table></div>
      <div class="ref-unit"><h4>Key concepts</h4><table>
        <tr><td>Legitimacy, sovereignty, authority, power; regime vs. state vs. government</td></tr>
        <tr><td>Democratization, rule of law, civil society, cleavages, corporatism vs. pluralism</td></tr>
        <tr><td>FPTP vs. proportional vs. mixed systems; neoliberal reform; resource curse</td></tr></table></div>
    </div>`;

  // ======================= AP HUMAN GEOGRAPHY =======================
  SW.defineCourse('hug', {
    name: 'AP Human Geography', short: 'Human Geo', subject: 'History and Social Sciences',
    units: [
      ['hg1', 1, 'Thinking Geographically', '8-10%'],
      ['hg2', 2, 'Population and Migration Patterns and Processes', '12-17%'],
      ['hg3', 3, 'Cultural Patterns and Processes', '12-17%'],
      ['hg4', 4, 'Political Patterns and Processes', '12-17%'],
      ['hg5', 5, 'Agriculture and Rural Land-Use Patterns and Processes', '12-17%'],
      ['hg6', 6, 'Cities and Urban Land-Use Patterns and Processes', '12-17%'],
      ['hg7', 7, 'Industrial and Economic Development Patterns and Processes', '12-17%'],
    ],
    format: '60 multiple-choice questions (60 min, 50%) + 3 free-response questions (75 min, 50%)',
    dist: { year: 2025, 5: 17.0, 4: 25.2, 3: 22.5 },
    past: 'https://apcentral.collegeboard.org/courses/ap-human-geography/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/humanities/ap-human-geography',
  });
  add('hg2', 'Rate of natural increase', () => {
    const b = R(8, 45, 1), d = R(4, 15, 1), rni = r3((b - d) / 10);
    return W().l('Rate of natural increase', `CBR = ${b}, CDR = ${d} (per 1000)`, '').f('RNI (%) = (CBR - CDR)/10')
      .l(`RNI = (${b} - ${d})/10 = ${g(rni)}%`).n('RNI ignores migration.')
      .done(`A country has a crude birth rate of ${b} and crude death rate of ${d} per 1000. What is its rate of natural increase?`, rni, '%', true);
  });
  add('hg2', 'Doubling time', () => {
    const rni = pick([0.5, 1, 1.4, 2, 2.5, 3.5]), t = r3(70 / rni);
    return W().l('Doubling time', `RNI = ${g(rni)}%`, '').f('doubling time = 70 / RNI').l(`= 70/${g(rni)} = ${num(t)} years`)
      .done(`With a rate of natural increase of ${g(rni)}%, about how many years will the population take to double?`, t, 'years');
  });
  add('hg2', 'Physiological density', () => {
    const pop = R(5, 200, 1) * 1e6, arable = R(10, 500, 5) * 1000, d = r3(pop / arable);
    return W().l('Population density', `population ${g(pop)}`, `arable land ${g(arable)} km^2`, '').f('physiological density = people / arable land')
      .l(`= ${g(pop)}/${g(arable)} = ${num(d)} people per km^2 of farmland`).n('A high physiological density means a lot of pressure on farmland.')
      .done(`A country has ${g(pop)} people and ${g(arable)} km^2 of arable land. What is its physiological density?`, d, 'per km^2');
  });
  add('hg2', 'Dependency ratio', () => {
    const young = R(10, 45, 1), old = R(3, 25, 1), work = 100 - young - old, dr = r3(((young + old) / work) * 100);
    return W().l('Dependency ratio', `ages 0-14: ${young}%, 65+: ${old}%, 15-64: ${work}%`, '').f('dependency ratio = (young + old)/working age x 100')
      .l(`= (${young} + ${old})/${work} x 100 = ${num(dr)}`)
      .done(`A population is ${young}% under 15, ${old}% over 64, and ${work}% aged 15-64. What is its dependency ratio?`, dr, '');
  });
  SW.mcqs('hg1', [
    ['scale', 'A map of a single city block is:', ['Small scale, showing a large area', 'Large scale, showing a small area in detail', 'Global scale', 'Unscaled'], 1, 'Large scale = more detail, less area.'],
    ['diffusion', 'The spread of a new phone app from big cities to smaller towns is:', ['Contagious diffusion', 'Hierarchical diffusion', 'Relocation diffusion', 'Stimulus diffusion'], 1, 'It jumps between places by rank, not distance.'],
  ]);
  SW.mcqs('hg2', [
    ['demographic transition', 'In Stage 3 of the demographic transition model:', ['Birth and death rates are both high', 'Birth rates fall while death rates are already low', 'Population declines', 'Death rates rise'], 1, 'Urbanization and education lower birth rates.'],
    ['push pull factors', 'A civil war that forces people to leave is a:', ['Pull factor', 'Push factor', 'Intervening opportunity', 'Chain migration'], 1, 'It pushes people away from their home.'],
    ['malthus', 'Malthus predicted that:', ['Technology would always outpace population', 'Population would grow faster than food supply', 'Populations would decline', 'Cities would shrink'], 1, 'He argued population grows geometrically, food arithmetically.'],
  ]);
  SW.mcqs('hg3', [
    ['universalizing religion', 'Which is a universalizing religion that actively seeks converts?', ['Hinduism', 'Judaism', 'Christianity', 'Shinto'], 2, 'Christianity, Islam and Buddhism are universalizing.'],
    ['lingua franca', 'English used for business between people with different native languages is a:', ['Dialect', 'Lingua franca', 'Creole', 'Pidgin'], 1, 'A common language for communication.'],
  ]);
  SW.mcqs('hg4', [
    ['gerrymandering', 'Drawing district lines to spread opposing voters thinly across many districts is called:', ['Packing', 'Cracking', 'Stacking', 'Devolution'], 1, 'Packing concentrates them into a few districts instead.'],
    ['centrifugal forces', 'Which is a centrifugal force that can divide a state?', ['A shared national language', 'Ethnic separatist movements', 'A national holiday', 'Good transportation'], 1, 'Centripetal forces unify; centrifugal forces divide.'],
  ]);
  SW.mcqs('hg5', [
    ['von thunen', 'In the von Thunen model, the ring closest to the market is used for:', ['Ranching', 'Dairy and market gardening', 'Grain farming', 'Forestry'], 1, 'Perishable, high-cost-to-transport goods go nearest the city.'],
    ['green revolution', 'The Green Revolution increased yields mainly through:', ['Organic farming', 'High-yield seeds, fertilizers and irrigation', 'Shifting cultivation', 'Less mechanization'], 1, 'It boosted food output, especially in South Asia and Mexico.'],
  ]);
  SW.mcqs('hg6', [
    ['urban models', 'The concentric zone model (Burgess) places the central business district:', ['At the edge of the city', 'At the center, with rings around it', 'Along a highway', 'In several separate nodes'], 1, 'Rings of land use spread outward from the CBD.'],
    ['gentrification', 'Gentrification often leads to:', ['Lower rents for long-time residents', 'Displacement of lower-income residents as property values rise', 'Fewer businesses', 'Urban sprawl'], 1, 'Renovation raises costs for existing residents.'],
  ]);
  SW.mcqs('hg7', [
    ['rostow', 'In Rostow\'s stages of growth, the "take-off" stage involves:', ['Subsistence farming', 'Rapid growth in a few industries', 'High mass consumption', 'Deindustrialization'], 1, 'Stage 3: a few leading industries drive growth.'],
    ['world systems', 'Wallerstein\'s world-systems theory divides countries into:', ['First, second and third world', 'Core, semi-periphery and periphery', 'North and south', 'Urban and rural'], 1, 'Core countries benefit from unequal trade with the periphery.'],
  ]);
  SW.frq('hg2', 'Population policy and change',
    'Many countries in Europe and East Asia have total fertility rates below 2.1.\n(a) Define replacement level fertility.\n(b) Explain one economic consequence of a fertility rate below replacement.\n(c) Describe one pronatalist policy a government could adopt.\n(d) Explain one limitation of the policy you described.',
    [[1, '(a) About 2.1 children per woman, the rate needed to keep the population stable without migration'], [2, '(b) Explains a consequence (shrinking workforce, higher dependency ratio, strain on pensions)'], [1, '(c) Describes a pronatalist policy (child payments, paid parental leave, childcare subsidies, tax breaks)'], [1, '(d) Valid limitation (high cost, small effect on births, does not change cultural factors)']],
    '(a) Replacement level is about 2.1 children per woman, enough for each generation to replace its parents.\n(b) Fewer young workers support more retirees, raising the dependency ratio and straining pension and health systems.\n(c) The government could pay families a monthly allowance for each child and subsidize childcare.\n(d) These programs are expensive and studies show they raise birth rates only slightly, because cost of living and career pressures still discourage large families.');
  SW.REF.hug = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Population math</h4><table>
        <tr><td class="eqn">RNI (%) = (CBR - CDR)/10</td></tr><tr><td class="eqn">doubling time = 70 / RNI</td></tr>
        <tr><td class="eqn">arithmetic density = people / total land</td></tr><tr><td class="eqn">physiological density = people / arable land</td></tr>
        <tr><td class="eqn">dependency ratio = (0-14 + 65+)/(15-64) x 100</td></tr><tr><td class="eqn">replacement TFR = 2.1</td></tr></table></div>
      <div class="ref-unit"><h4>Models to know</h4><table>
        <tr><td>Demographic transition, epidemiological transition, Ravenstein's laws of migration, Malthus</td></tr>
        <tr><td>Von Thunen, Weber (least cost), Rostow, Wallerstein world-systems</td></tr>
        <tr><td>Burgess concentric zone, Hoyt sector, Harris and Ullman multiple nuclei, Latin American city</td></tr>
        <tr><td>Christaller central place theory, gravity model, rank-size rule</td></tr></table></div>
    </div>`;
})();
