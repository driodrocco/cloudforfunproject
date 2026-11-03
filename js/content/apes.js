/* AP Environmental Science: course, calculations (APES math is all
 * no-calculator dimensional analysis), concept questions, free response, reference. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;

  SW.defineCourse('apes', {
    name: 'AP Environmental Science', short: 'Env Science', subject: 'Science',
    units: [
      ['es1', 1, 'The Living World: Ecosystems', '6-8%'],
      ['es2', 2, 'The Living World: Biodiversity', '6-8%'],
      ['es3', 3, 'Populations', '10-15%'],
      ['es4', 4, 'Earth Systems and Resources', '10-15%'],
      ['es5', 5, 'Land and Water Use', '10-15%'],
      ['es6', 6, 'Energy Resources and Consumption', '10-15%'],
      ['es7', 7, 'Atmospheric Pollution', '7-10%'],
      ['es8', 8, 'Aquatic and Terrestrial Pollution', '7-10%'],
      ['es9', 9, 'Global Change', '15-20%'],
    ],
    format: '80 multiple-choice questions (90 min, 60%) + 3 free-response questions (70 min, 40%)',
    dist: { year: 2025, 5: 12.6, 4: 27.8, 3: 28.8 },
    past: 'https://apcentral.collegeboard.org/courses/ap-environmental-science/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/science/ap-college-environmental-science',
  });

  // ---------- calculations ----------
  add('es3', 'Rule of 70: doubling time', () => {
    const r = pick([0.5, 1, 1.4, 2, 2.5, 3.5, 7]), t = r3(70 / r);
    return W()
      .l('Rule of 70', `growth rate = ${g(r)}% per year`, 'doubling time = ?', '')
      .f('doubling time = 70 / (percent growth rate)')
      .l(`= 70 / ${g(r)}`, `= ${num(t)} years`)
      .n('Use the growth rate as a percent (2%), not a decimal (0.02).')
      .done(`A population grows at ${g(r)}% per year. About how many years will it take to double?`, t, 'years');
  });

  add('es3', 'Population growth rate from birth and death rates', () => {
    const b = R(8, 40, 1), d = R(5, 15, 1), i = R(0, 10, 1), e = R(0, 6, 1), pct = r3((b + i - d - e) / 10);
    return W()
      .l('Growth rate', `CBR = ${b}, CDR = ${d}`, `immigration = ${i}, emigration = ${e} (per 1000 people)`, '')
      .f('growth rate (%) = [(births + immigration) - (deaths + emigration)] / 10')
      .l(`= [(${b} + ${i}) - (${d} + ${e})] / 10`, `= ${b + i - d - e} / 10`, `= ${g(pct)}%`)
      .n('Dividing by 10 turns "per 1000" into "per 100", which is a percent.')
      .done(`A country has a crude birth rate of ${b}, death rate of ${d}, immigration of ${i} and emigration of ${e}, all per 1000 people per year. What is its annual growth rate in percent?`, pct, '%', true);
  });

  add('es1', 'Ten percent rule', () => {
    const E = R(1, 50, 1) * 1000, lv = R(2, 4, 1), ans = E * 0.1 ** (lv - 1);
    return W()
      .l('10% rule', `producers: ${E} kcal`, `trophic level ${lv}`, '')
      .f('Each level gets about 10% of the energy from the level below')
      .l(`= ${E} x (0.1)^${lv - 1}`, `= ${g(ans)} kcal`)
      .done(`Producers capture ${E} kcal. How much energy reaches the trophic level ${lv} consumers?`, ans, 'kcal');
  });

  add('es1', 'Net primary productivity', () => {
    const gpp = R(1000, 5000, 100), resp = R(300, gpp - 200, 100), npp = gpp - resp;
    return W()
      .l('Primary productivity', `GPP = ${gpp} kcal/m^2/yr`, `R = ${resp} kcal/m^2/yr`, 'NPP = ?', '')
      .f('NPP = GPP - R')
      .l(`NPP = ${gpp} - ${resp}`, `NPP = ${npp} kcal/m^2/yr`)
      .n('NPP is the energy left over for growth, which is what consumers can eat.')
      .done(`A forest has a gross primary productivity of ${gpp} kcal/m^2/yr and loses ${resp} kcal/m^2/yr to respiration. What is its net primary productivity?`, npp, 'kcal/m^2/yr');
  });

  add('es9', 'Percent change', () => {
    const a = R(100, 900, 10), b = r3(a * R(0.4, 1.8, 0.05)), pct = r3(((b - a) / a) * 100);
    return W()
      .l('Percent change', `old = ${a}`, `new = ${g(b)}`, '')
      .f('% change = (new - old) / old x 100')
      .l(`= (${g(b)} - ${a}) / ${a} x 100`, `= ${num(pct)}%`)
      .done(`A measurement changes from ${a} to ${g(b)}. What is the percent change?`, pct, '%', true);
  });

  add('es8', 'Radioactive half-life', () => {
    const N0 = R(16, 800, 16), T = R(5, 30, 1), n = R(1, 5, 1), left = N0 / 2 ** n;
    return W()
      .l('Half-life', `start = ${N0} g`, `half-life = ${T} years`, `time = ${T * n} years`, '')
      .f('number of half-lives = time / half-life; halve the amount that many times')
      .l(`${T * n} / ${T} = ${n} half-lives`, `${N0} x (1/2)^${n} = ${g(left)} g`)
      .done(`A ${N0} g sample of a radioactive waste has a half-life of ${T} years. How much remains after ${T * n} years?`, left, 'g');
  });

  add('es6', 'Energy savings from efficient bulbs', () => {
    const w1 = pick([60, 75, 100]), w2 = pick([9, 10, 13, 15]), n = R(5, 30, 1), h = R(2, 8, 1), price = pick([0.1, 0.12, 0.15, 0.2]);
    const kwh = (n * (w1 - w2) * h * 365) / 1000, cost = r3(kwh * price);
    return W()
      .l('Energy and cost', `${n} bulbs, ${w1} W -> ${w2} W`, `${h} hours/day, 365 days`, `$${price}/kWh`, '')
      .f('kWh = watts x hours / 1000; cost = kWh x price')
      .l(`watts saved = ${n} x (${w1} - ${w2}) = ${n * (w1 - w2)} W`, `kWh saved = ${n * (w1 - w2)} W x ${h} h x 365 / 1000 = ${g(r3(kwh))} kWh`, `money saved = ${g(r3(kwh))} x $${price} = $${num(cost)}`)
      .n('Write units at every step so they cancel correctly (dimensional analysis).')
      .done(`A school replaces ${n} bulbs of ${w1} W with ${w2} W LEDs. They run ${h} hours a day all year, and power costs $${price} per kWh. How many dollars are saved per year?`, cost, 'dollars');
  });

  add('es6', 'CO2 from driving', () => {
    const miles = R(5000, 20000, 500), mpg = R(15, 50, 1), gal = r3(miles / mpg), co2 = r3(gal * 8.9);
    return W()
      .l('Carbon emissions', `${miles} miles/year`, `${mpg} miles per gallon`, '8.9 kg CO2 per gallon of gasoline', '')
      .f('gallons = miles / mpg; CO2 = gallons x 8.9 kg/gal')
      .l(`gallons = ${miles} / ${mpg} = ${num(gal)} gal`, `CO2 = ${num(gal)} x 8.9 = ${num(co2)} kg`)
      .done(`A car is driven ${miles} miles a year and gets ${mpg} mpg. Burning a gallon of gasoline releases 8.9 kg of CO2. How many kg of CO2 does it emit per year?`, co2, 'kg');
  });

  add('es5', 'Water use for a city', () => {
    const per = R(50, 200, 5), pop = R(10, 900, 10) * 1000, days = 365, total = per * pop * days;
    return W()
      .l('Water use', `${per} gallons per person per day`, `population ${g(pop)}`, '')
      .f('total = per person per day x people x days')
      .l(`= ${per} x ${g(pop)} x 365`, `= ${num(total)} gallons per year`)
      .done(`Each of a city's ${g(pop)} residents uses ${per} gallons of water a day. How many gallons does the city use in a year?`, total, 'gallons');
  });

  add('es3', 'Mark and recapture', () => {
    const M = R(20, 120, 5), C = R(20, 120, 5), Rr = R(2, Math.min(M, C) - 1, 1), N = r3((M * C) / Rr);
    return W()
      .l('Mark-recapture estimate', `marked first time M = ${M}`, `caught second time C = ${C}`, `marked in second catch R = ${Rr}`, '')
      .f('N = (M x C) / R')
      .l(`N = (${M} x ${C}) / ${Rr}`, `N = ${num(N)}`)
      .done(`Researchers mark ${M} turtles and release them. Later they catch ${C}, and ${Rr} are marked. Estimate the population size.`, N, 'turtles');
  });

  add('es3', 'Population density', () => {
    const n = R(50, 5000, 10), area = R(2, 200, 1), d = r3(n / area);
    return W()
      .l('Density', `${n} individuals`, `${area} km^2`, '')
      .f('density = number / area')
      .l(`= ${n} / ${area}`, `= ${num(d)} per km^2`)
      .done(`${n} deer live in a ${area} km^2 forest. What is the population density?`, d, 'per km^2');
  });

  // ---------- concept questions ----------
  SW.mcqs('es1', [
    ['biogeochemical cycles nitrogen', 'Which process converts nitrogen gas (N2) into ammonia that plants can use?', ['Denitrification', 'Nitrogen fixation', 'Assimilation', 'Ammonification'], 1, 'Nitrogen-fixing bacteria (and lightning) break the strong N2 triple bond.'],
    ['phosphorus cycle', 'The phosphorus cycle differs from the carbon cycle because it:', ['Has no atmospheric gas phase', 'Moves fastest of all cycles', 'Involves no rocks', 'Is controlled by plants only'], 0, 'Phosphorus moves mostly through rock, soil and water, so it is slow.'],
    ['biomes', 'Which biome has the highest net primary productivity per area on land?', ['Desert', 'Tundra', 'Tropical rainforest', 'Taiga'], 2, 'Warm temperatures, sun and lots of rain all year.'],
  ]);
  SW.mcqs('es2', [
    ['island biogeography', 'According to island biogeography, which island has the MOST species?', ['Small and far from the mainland', 'Large and close to the mainland', 'Small and close', 'Large and far'], 1, 'Large islands have more habitats; near islands get more colonists.'],
    ['ecological succession', 'Primary succession begins on:', ['An abandoned farm field', 'Bare rock, such as after a lava flow', 'A forest after a fire', 'A clear-cut forest'], 1, 'No soil exists yet, so pioneer species like lichens start it.'],
    ['ecosystem services', 'Bees pollinating crops is an example of which ecosystem service?', ['Provisioning', 'Regulating', 'Supporting', 'Cultural'], 1, 'Pollination is commonly classed as a regulating service (some lists call it supporting).'],
  ]);
  SW.mcqs('es3', [
    ['r and k selected species', 'Which is a trait of r-selected species?', ['Few offspring with lots of care', 'Many offspring with little care', 'Long lifespan', 'Population near carrying capacity'], 1, 'r-selected species bet on numbers: insects, weeds, fish.'],
    ['demographic transition', 'In stage 2 of the demographic transition:', ['Birth and death rates are both low', 'Death rates fall but birth rates stay high', 'Birth rates fall below death rates', 'The population shrinks'], 1, 'Better food and medicine cut deaths first, so the population grows fast.'],
    ['survivorship curves', 'A Type III survivorship curve shows:', ['Most survive to old age', 'Steady death rate', 'High death rate early in life', 'No deaths'], 2, 'Many offspring die young, like sea turtles or oak trees.'],
    ['age structure diagram', 'A population pyramid with a wide base indicates:', ['A shrinking population', 'A rapidly growing population', 'A stable population', 'Many elderly people'], 1, 'Lots of young people means many future parents.'],
  ]);
  SW.mcqs('es4', [
    ['plate tectonics', 'Convergent boundaries between oceanic and continental plates form:', ['Mid-ocean ridges', 'Subduction zones with volcanoes', 'Transform faults', 'Rift valleys'], 1, 'The denser oceanic plate sinks, melting rock that rises as volcanoes.'],
    ['soil horizons', 'Which soil horizon contains the most organic matter (humus)?', ['O and A horizons', 'B horizon', 'C horizon', 'Bedrock'], 0, 'The top layers collect decaying leaves and living roots.'],
    ['el nino', 'During El Nino:', ['Trade winds strengthen', 'Warm water spreads to the eastern Pacific', 'Upwelling off Peru increases', 'Australia gets more rain'], 1, 'Weaker trade winds let warm water slosh east, cutting upwelling.'],
    ['rain shadow', 'The side of a mountain range facing away from the wind is usually:', ['Wet', 'Dry', 'Warmer and wetter', 'Covered in glaciers'], 1, 'Air drops its moisture rising up the windward side, then sinks dry.'],
  ]);
  SW.mcqs('es5', [
    ['tragedy of the commons', 'Overfishing in international waters is an example of:', ['The tragedy of the commons', 'Integrated pest management', 'Sustainable yield', 'Ecological succession'], 0, 'A shared resource is overused because no one owns it.'],
    ['irrigation methods', 'Which irrigation method uses water most efficiently?', ['Flood irrigation', 'Furrow irrigation', 'Drip irrigation', 'Spray irrigation'], 2, 'Drip delivers water straight to the roots with little evaporation.'],
    ['urban sprawl', 'A major effect of urban sprawl is:', ['Less impervious surface', 'More car dependence and habitat loss', 'Lower energy use', 'More public transit'], 1, 'Spread-out development needs roads and cars and paves over habitat.'],
  ]);
  SW.mcqs('es6', [
    ['nonrenewable energy', 'Which energy source does NOT produce CO2 while generating electricity?', ['Natural gas', 'Coal', 'Nuclear fission', 'Oil'], 2, 'Fission releases energy from uranium without burning anything.'],
    ['energy efficiency', 'A coal plant is about 33% efficient. This means:', ['33% of the coal is burned', 'About 2/3 of the energy is lost, mostly as heat', '33% of the electricity is wasted', 'It emits 33% less CO2'], 1, 'Only a third of the chemical energy becomes electricity.'],
    ['hydroelectric', 'A drawback of large hydroelectric dams is:', ['High CO2 emissions while running', 'Flooding habitats and blocking fish migration', 'They only work at night', 'They need uranium'], 1, 'Reservoirs drown land and dams block salmon runs.'],
  ]);
  SW.mcqs('es7', [
    ['photochemical smog', 'Photochemical smog forms when sunlight reacts with:', ['CO2 and water', 'NOx and VOCs', 'Sulfur and ash', 'CFCs'], 1, 'NOx + VOCs + sunlight make ground-level ozone.'],
    ['thermal inversion', 'A thermal inversion traps pollution because:', ['Warm air sits above cooler air near the ground', 'Cold air rises', 'Wind speeds increase', 'It rains more'], 0, 'The cool air below cannot rise through the warm layer.'],
    ['acid rain', 'Acid rain is mostly caused by:', ['CO2 and CH4', 'SO2 and NOx', 'Ozone', 'Particulates only'], 1, 'They form sulfuric and nitric acid in clouds.'],
  ]);
  SW.mcqs('es8', [
    ['eutrophication', 'Fertilizer runoff into a lake usually leads to:', ['More dissolved oxygen', 'Algal blooms, then low oxygen when algae decompose', 'Clearer water', 'Lower nutrient levels'], 1, 'Decomposers use up oxygen breaking down dead algae, causing dead zones.'],
    ['biomagnification', 'Mercury concentrations are highest in:', ['Phytoplankton', 'Small fish', 'Top predators like tuna', 'Water'], 2, 'Persistent toxins build up at each level of the food chain.'],
    ['ld50', 'An LD50 is the dose that:', ['Kills 50% of a test population', 'Causes no effect', 'Kills all test subjects', 'Is safe for humans'], 0, 'Lower LD50 means more toxic.'],
  ]);
  SW.mcqs('es9', [
    ['greenhouse gases', 'Per molecule, which greenhouse gas traps the most heat?', ['CO2', 'Methane', 'Water vapor', 'Nitrous oxide'], 3, 'N2O has a global warming potential about 300 times CO2 (methane is about 25-30).'],
    ['ozone depletion', 'Stratospheric ozone is destroyed mainly by:', ['CO2', 'Chlorine from CFCs', 'Methane', 'Sulfur dioxide'], 1, 'One chlorine atom can break down thousands of ozone molecules.'],
    ['ocean acidification', 'Ocean acidification happens because oceans absorb:', ['Methane', 'CO2, which forms carbonic acid', 'Ozone', 'Nitrogen'], 1, 'Lower pH makes it harder for corals and shellfish to build shells.'],
    ['invasive species', 'Invasive species often spread quickly because they:', ['Have many natural predators', 'Lack natural predators in the new area', 'Are always K-selected', 'Need special habitats'], 1, 'Without predators or diseases, they outcompete native species.'],
  ]);

  // ---------- free response ----------
  SW.frq('es8', 'Lake eutrophication investigation',
    'Farms surround Lake Clear. Over 10 years, summer algal blooms have increased and fish kills have been reported.\n(a) Identify the most likely pollutant and its source.\n(b) Describe the steps that lead from that pollutant to fish deaths.\n(c) A student wants to test whether fertilizer amount affects algae growth. Identify the independent variable and one control.\n(d) Propose one solution that farmers could use and describe one drawback of it.',
    [[1, '(a) Nitrates/phosphates from fertilizer runoff (or animal waste)'], [2, '(b) Nutrients -> algal bloom -> algae die -> decomposers use oxygen -> hypoxia kills fish (1 point for partial chain)'], [1, '(c) IV = amount of fertilizer'], [1, '(c) Valid control: a sample with no fertilizer, or same light/temperature/water volume'], [1, '(d) Valid solution: buffer strips, less or timed fertilizer, cover crops, precision agriculture'], [1, '(d) Valid drawback (cost, lost cropland, labor)']],
    '(a) Nitrates and phosphates from fertilizer washing off the farms.\n(b) The extra nutrients cause algae to grow fast (bloom). When the algae die, bacteria decompose them and use up dissolved oxygen. The water becomes hypoxic, and fish suffocate.\n(c) Independent variable: amount of fertilizer added. Control: a tank with no fertilizer, kept at the same light and temperature.\n(d) Plant vegetated buffer strips along the shore to absorb runoff. Drawback: it takes land out of crop production, costing farmers money.');
  SW.frq('es6', 'Energy calculation (no calculator)',
    'A town of 10,000 homes uses an average of 900 kWh per home per month. Its power plant burns coal. 1 kg of coal produces 2.5 kWh of electricity.\n(a) Calculate the electricity the town uses in one year.\n(b) Calculate the mass of coal burned per year.\n(c) Describe one environmental impact of mining or burning this coal.\n(d) Identify a renewable source the town could switch to and one limitation of it.',
    [[1, '(a) 900 x 12 x 10,000 = 108,000,000 kWh (1.08 x 10^8)'], [1, '(b) 1.08 x 10^8 / 2.5 = 4.32 x 10^7 kg'], [1, '(b) Shows units/dimensional analysis'], [1, '(c) Valid impact: CO2/climate change, SO2 acid rain, mercury, habitat loss from mining, acid mine drainage'], [1, '(d) Valid renewable source'], [1, '(d) Valid limitation (intermittent, land use, cost, location)']],
    '(a) 900 kWh/home/month x 12 months x 10,000 homes = 1.08 x 10^8 kWh per year.\n(b) 1.08 x 10^8 kWh x (1 kg / 2.5 kWh) = 4.32 x 10^7 kg of coal.\n(c) Burning coal releases SO2, which forms acid rain that lowers the pH of lakes.\n(d) Solar power. Limitation: it only produces electricity when the sun is out, so storage or backup is needed.');

  // ---------- reference ----------
  SW.REF.apes = () => `
    <p class="muted small">No calculator on the APES exam: practice dimensional analysis and scientific notation.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>Key equations</h4><table>
        <tr><td class="eqn">% change = (new - old)/old x 100</td></tr><tr><td class="eqn">Rule of 70: doubling time = 70 / % growth rate</td></tr>
        <tr><td class="eqn">growth rate (%) = [(CBR + immigration) - (CDR + emigration)]/10</td></tr>
        <tr><td class="eqn">NPP = GPP - R</td></tr><tr><td class="eqn">10% of energy passes to the next level</td></tr>
        <tr><td class="eqn">Mark-recapture: N = (M x C)/R</td></tr><tr><td class="eqn">density = number / area</td></tr>
        <tr><td class="eqn">half-lives = time / half-life</td></tr></table></div>
      <div class="ref-unit"><h4>Energy units</h4><table>
        <tr><td class="eqn">1 kW = 1000 W</td></tr><tr><td class="eqn">kWh = kW x hours</td></tr>
        <tr><td class="eqn">1 kWh = 3412 BTU</td></tr><tr><td class="eqn">power plant efficiency ~ 33%</td></tr>
        <tr><td class="eqn">8.9 kg CO2 per gallon of gasoline</td></tr></table></div>
      <div class="ref-unit"><h4>Metric prefixes</h4><table>
        <tr><td class="eqn">giga 10^9, mega 10^6, kilo 10^3</td></tr><tr><td class="eqn">centi 10^-2, milli 10^-3, micro 10^-6</td></tr>
        <tr><td class="eqn">1 hectare = 10,000 m^2</td></tr><tr><td class="eqn">1 ppm = 1 part per million</td></tr></table></div>
      <div class="ref-unit"><h4>Laws and treaties</h4><table>
        <tr><td>Clean Air Act, Clean Water Act, Safe Drinking Water Act</td></tr><tr><td>Endangered Species Act; CITES (wildlife trade)</td></tr>
        <tr><td>Montreal Protocol (CFCs, ozone); Kyoto Protocol and Paris Agreement (greenhouse gases)</td></tr>
        <tr><td>CERCLA / Superfund (hazardous waste sites); RCRA (hazardous waste)</td></tr></table></div>
    </div>`;
})();
