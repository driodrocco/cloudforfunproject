/* AP Biology: course, calculation problems (from the AP Bio equation sheet),
 * concept questions, free response, reference sheet. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;

  SW.defineCourse('bio', {
    name: 'AP Biology', short: 'Biology', subject: 'Science',
    units: [
      ['bio1', 1, 'Chemistry of Life', '8-11%'],
      ['bio2', 2, 'Cell Structure and Function', '10-13%'],
      ['bio3', 3, 'Cellular Energetics', '12-16%'],
      ['bio4', 4, 'Cell Communication and Cell Cycle', '10-15%'],
      ['bio5', 5, 'Heredity', '8-11%'],
      ['bio6', 6, 'Gene Expression and Regulation', '12-16%'],
      ['bio7', 7, 'Natural Selection', '13-20%'],
      ['bio8', 8, 'Ecology', '10-15%'],
    ],
    format: '60 multiple-choice questions (90 min, 50%) + 6 free-response questions: 2 long, 4 short (90 min, 50%)',
    dist: { year: 2025, 5: 18.9, 4: 24.1, 3: 27.4 },
    past: 'https://apcentral.collegeboard.org/courses/ap-biology/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/science/ap-biology',
  });

  // ---------- calculations ----------
  add('bio7', 'Hardy-Weinberg: carriers', () => {
    const q2 = R(1, 36, 1) / 100, q = r3(Math.sqrt(q2)), p = r3(1 - q), het = r3(2 * p * q), pct = r3(het * 100);
    return W()
      .l('Hardy-Weinberg', `q^2 = ${g(q2)} (recessive phenotype, ${g(q2 * 100)}%)`, '2pq = ?', '')
      .f('p^2 + 2pq + q^2 = 1 and p + q = 1')
      .l(`q = sqrt(${g(q2)}) = ${num(q)}`, `p = 1 - ${num(q)} = ${num(p)}`, `2pq = 2(${num(p)})(${num(q)}) = ${num(het)}`, `heterozygous = ${num(pct)}%`)
      .n('Start from the recessive phenotype: that is the only group you can count directly (q^2).')
      .done(`In a population in Hardy-Weinberg equilibrium, ${g(q2 * 100)}% of individuals show the recessive phenotype. What percent are heterozygous carriers?`, pct, '%');
  });

  add('bio5', 'Chi-square test', () => {
    const n = R(100, 400, 4), ratio = pick([[3, 1], [9, 3, 3, 1], [1, 1]]), tot = ratio.reduce((a, b) => a + b, 0);
    const exp = ratio.map(x => (n * x) / tot), obs = exp.map(e => Math.max(1, Math.round(e + R(-0.15, 0.15, 0.01) * e)));
    const N = obs.reduce((a, b) => a + b, 0), exp2 = ratio.map(x => r3((N * x) / tot));
    const terms = obs.map((o, i) => ((o - exp2[i]) ** 2) / exp2[i]), chi = r3(terms.reduce((a, b) => a + b, 0));
    const crit = [3.84, 5.99, 7.81][ratio.length - 2], df = ratio.length - 1;
    return W()
      .l('Chi-square goodness of fit', `expected ratio ${ratio.join(':')}`, `observed: ${obs.join(', ')} (total ${N})`, `expected: ${exp2.map(g).join(', ')}`, '')
      .f('X^2 = sum of (o - e)^2/e')
      .l(`X^2 = ${obs.map((o, i) => `(${o} - ${g(exp2[i])})^2/${g(exp2[i])}`).join(' + ')}`, `X^2 = ${num(chi)}`, `df = ${df}, critical value (p = 0.05) = ${crit}`, chi > crit ? 'X^2 > critical value: reject the null hypothesis' : 'X^2 < critical value: fail to reject the null hypothesis')
      .n('Degrees of freedom = number of categories - 1.')
      .done(`A cross is expected to give a ${ratio.join(':')} ratio. The offspring counts are ${obs.join(', ')}. Calculate the chi-square value.`, chi, '');
  });

  add('bio2', 'Solute potential', () => {
    const [solute, i] = pick([['sucrose', 1], ['glucose', 1], ['NaCl', 2], ['CaCl2', 3]]);
    const C = R(0.1, 1, 0.05), Tc = R(15, 30, 1), T = Tc + 273, psi = r3(-i * C * 0.0831 * T);
    return W()
      .l('Water potential', `${solute}: i = ${i}`, `C = ${g(C)} mol/L`, `T = ${Tc} C + 273 = ${T} K`, 'R = 0.0831 L bar/(mol K)', 'solute potential = ?', '')
      .f('solute potential = -iCRT')
      .l(`= -(${i})(${g(C)})(0.0831)(${T})`, `= ${num(psi)} bars`)
      .n('i is the number of particles each molecule makes in water: sucrose stays whole (1), NaCl splits into 2.')
      .done(`What is the solute potential of a ${g(C)} M ${solute} solution at ${Tc} C?`, psi, 'bars', true);
  });

  add('bio2', 'Surface area to volume ratio', () => {
    const s = R(1, 10, 1), ans = r3(6 / s);
    return W()
      .l('Surface area to volume', `cube side = ${s} um`, '')
      .f('SA = 6s^2, V = s^3')
      .l(`SA = 6(${s})^2 = ${6 * s * s}`, `V = (${s})^3 = ${s ** 3}`, `SA/V = ${6 * s * s}/${s ** 3} = ${num(ans)}`)
      .n('Smaller cells have a bigger SA/V ratio, so they exchange materials more efficiently.')
      .done(`What is the surface area to volume ratio of a cube-shaped cell with sides of ${s} um?`, ans, '/um');
  });

  add('bio5', 'Probability of a genotype (product rule)', () => {
    const genes = R(2, 3, 1), pcs = Array.from({ length: genes }, () => pick([['AA', 0.25], ['Aa', 0.5], ['aa', 0.25]]));
    const letters = 'ABC';
    const want = pcs.map(([gt], i) => gt.replace(/A/g, letters[i]).replace(/a/g, letters[i].toLowerCase())).join('');
    const parent = Array.from({ length: genes }, (_, i) => letters[i] + letters[i].toLowerCase()).join('');
    const ans = pcs.reduce((a, [, p]) => a * p, 1);
    return W()
      .l('Product rule', `${parent} x ${parent}`, `P(${want}) = ?`, '')
      .f('Treat each gene separately, then multiply (independent assortment)')
      .l(...pcs.map(([gt, p], i) => `P(${gt.replace(/A/g, letters[i]).replace(/a/g, letters[i].toLowerCase())}) = ${p === 0.5 ? '1/2' : '1/4'}`), `P = ${pcs.map(([, p]) => (p === 0.5 ? '1/2' : '1/4')).join(' x ')} = ${num(ans)}`)
      .done(`Two ${parent} individuals are crossed. What is the probability that an offspring is ${want}? (Answer as a decimal.)`, ans, '');
  });

  add('bio8', 'Exponential population growth', () => {
    const r = R(0.02, 0.5, 0.01), N = R(100, 5000, 50), ans = r3(r * N);
    return W()
      .l('Population growth', `rmax = ${g(r)}`, `N = ${N}`, 'dN/dt = ?', '')
      .f('dN/dt = rmax N')
      .l(`dN/dt = (${g(r)})(${N})`, `dN/dt = ${num(ans)} individuals per unit time`)
      .done(`A population of ${N} has a maximum per capita growth rate of ${g(r)}. How fast is it growing (exponential model)?`, ans, 'per time');
  });

  add('bio8', 'Logistic population growth', () => {
    const r = R(0.05, 0.6, 0.01), K = R(500, 5000, 100), N = R(50, K - 50, 10), ans = r3((r * N * (K - N)) / K);
    return W()
      .l('Logistic growth', `rmax = ${g(r)}`, `K = ${K}`, `N = ${N}`, 'dN/dt = ?', '')
      .f('dN/dt = rmax N (K - N)/K')
      .l(`dN/dt = (${g(r)})(${N})(${K} - ${N})/${K}`, `dN/dt = ${num(ans)}`)
      .n('Growth is fastest at N = K/2 and slows to zero as N reaches K.')
      .done(`A population with rmax = ${g(r)} and carrying capacity ${K} currently has ${N} individuals. What is dN/dt?`, ans, 'per time');
  });

  add('bio3', 'Rate from data', () => {
    const v1 = R(0, 5, 0.5), t = R(5, 30, 5), v2 = r3(v1 + R(2, 40, 0.5)), ans = r3((v2 - v1) / t);
    return W()
      .l('Rate', `O2 at start = ${g(v1)} mL`, `O2 after ${t} min = ${g(v2)} mL`, '')
      .f('rate = change in Y / change in time')
      .l(`rate = (${g(v2)} - ${g(v1)}) mL / ${t} min`, `rate = ${num(ans)} mL/min`)
      .done(`In a photosynthesis experiment, O2 produced goes from ${g(v1)} mL to ${g(v2)} mL in ${t} minutes. What is the rate of O2 production?`, ans, 'mL/min');
  });

  add('bio1', 'Standard error of the mean', () => {
    const sd = R(0.5, 10, 0.1), n = R(4, 50, 1), se = r3(sd / Math.sqrt(n));
    return W()
      .l('Standard error', `s = ${g(sd)}`, `n = ${n}`, 'SE = ?', '')
      .f('SE = s / sqrt(n)')
      .l(`SE = ${g(sd)}/sqrt(${n})`, `SE = ${num(se)}`, `error bars (+/- 2SE) = +/- ${num(r3(2 * se))}`)
      .n('If the +/- 2SE error bars of two groups overlap, the difference is probably not significant.')
      .done(`A sample of ${n} measurements has a standard deviation of ${g(sd)}. What is the standard error of the mean?`, se, '');
  });

  add('bio8', "Simpson's diversity index", () => {
    const n = [R(5, 40, 1), R(5, 40, 1), R(5, 40, 1)], N = n[0] + n[1] + n[2];
    const D = r3(1 - n.reduce((s, x) => s + (x / N) ** 2, 0));
    return W()
      .l("Simpson's diversity index", `species counts: ${n.join(', ')} (total ${N})`, '')
      .f('D = 1 - sum of (n/N)^2')
      .l(`D = 1 - [(${n[0]}/${N})^2 + (${n[1]}/${N})^2 + (${n[2]}/${N})^2]`, `D = ${num(D)}`)
      .n('Closer to 1 means more diverse.')
      .done(`A sample has three species with ${n.join(', ')} individuals. Calculate Simpson's diversity index.`, D, '');
  });

  add('bio8', 'Energy transfer between trophic levels', () => {
    const E = R(1, 90, 1) * 1000, lv = R(2, 4, 1), ans = E * 0.1 ** (lv - 1);
    return W()
      .l('10% rule', `producers: ${E} kcal`, `trophic level ${lv}`, '')
      .f('About 10% of energy passes to each next level')
      .l(`energy = ${E} x (0.1)^${lv - 1}`, `energy = ${num(ans)} kcal`)
      .n('The other 90% is mostly lost as heat from cellular respiration.')
      .done(`Producers in an ecosystem store ${E} kcal. About how much energy reaches trophic level ${lv}?`, ans, 'kcal');
  });

  // ---------- concept questions ----------
  SW.mcqs('bio1', [
    ['hydrogen bonding water', 'Which property of water comes from hydrogen bonds between molecules?', ['Nonpolar covalent bonds', 'High specific heat', 'Low surface tension', 'It is less dense as a liquid'], 1, 'Hydrogen bonds absorb a lot of energy before molecules speed up, so water resists temperature change.'],
    ['macromolecules monomers', 'Which pair matches a polymer with its monomer?', ['Protein - nucleotide', 'DNA - amino acid', 'Starch - glucose', 'Lipid - monosaccharide'], 2, 'Starch is a chain of glucose. Proteins are amino acids; nucleic acids are nucleotides.'],
    ['dehydration synthesis', 'Building a polymer from monomers is called:', ['Hydrolysis', 'Dehydration synthesis', 'Denaturation', 'Phosphorylation'], 1, 'A water molecule is removed each time two monomers join.'],
    ['protein structure', 'Which level of protein structure is held together by peptide bonds only?', ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], 0, 'Primary structure is just the amino acid sequence linked by peptide bonds.'],
  ]);
  SW.mcqs('bio2', [
    ['membrane transport', 'Which moves ions AGAINST their concentration gradient?', ['Simple diffusion', 'Facilitated diffusion', 'Active transport', 'Osmosis'], 2, 'Moving against a gradient takes energy, usually ATP.'],
    ['osmosis tonicity', 'A plant cell is placed in a hypertonic solution. It will:', ['Gain water and burst', 'Lose water and plasmolyze', 'Stay the same', 'Gain water and become turgid'], 1, 'Water leaves toward the higher solute concentration; the membrane pulls away from the wall.'],
    ['organelle function', 'Which organelle modifies, sorts and packages proteins?', ['Ribosome', 'Golgi apparatus', 'Lysosome', 'Mitochondrion'], 1, 'Proteins from the rough ER go to the Golgi for processing and shipping.'],
    ['endosymbiosis', 'Which supports the endosymbiotic theory for mitochondria?', ['They have a single membrane', 'They have their own circular DNA and ribosomes', 'They are found in prokaryotes', 'They make proteins for the nucleus'], 1, 'Circular DNA and bacteria-like ribosomes suggest they were once free-living prokaryotes.'],
  ]);
  SW.mcqs('bio3', [
    ['enzyme competitive inhibition', 'A competitive inhibitor:', ['Binds the active site and can be outcompeted by more substrate', 'Binds an allosteric site and changes shape', 'Raises activation energy permanently', 'Denatures the enzyme'], 0, 'It competes for the active site, so adding lots of substrate restores the rate.'],
    ['electron transport chain', 'In cellular respiration, most ATP is made by:', ['Glycolysis', 'The Krebs cycle', 'Oxidative phosphorylation (ATP synthase)', 'Fermentation'], 2, 'The proton gradient from the electron transport chain drives ATP synthase.'],
    ['photosynthesis light reactions', 'The light-dependent reactions produce:', ['Glucose and CO2', 'ATP, NADPH and O2', 'CO2 and water', 'Pyruvate'], 1, 'Light splits water (O2 released) and makes ATP and NADPH for the Calvin cycle.'],
    ['enzyme temperature', 'Why does enzyme activity drop sharply above its optimal temperature?', ['Substrate runs out', 'The enzyme denatures and the active site changes shape', 'Molecules move slower', 'More inhibitors form'], 1, 'Heat breaks the weak bonds holding the 3-D shape.'],
  ]);
  SW.mcqs('bio4', [
    ['signal transduction', 'In a signal transduction pathway, a second messenger such as cAMP:', ['Carries the signal from outside to inside the cell', 'Amplifies and relays the signal inside the cell', 'Is the receptor', 'Ends the cell cycle'], 1, 'First messenger binds outside; cAMP spreads and amplifies the signal inside.'],
    ['cell cycle checkpoint', 'A mutation that disables the G1 checkpoint is most likely to cause:', ['Cell death', 'Uncontrolled cell division (cancer)', 'Faster meiosis', 'More apoptosis'], 1, 'Damaged cells would keep dividing without being stopped.'],
    ['mitosis phases', 'Sister chromatids separate during:', ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], 2, 'Anaphase: the chromatids are pulled to opposite poles.'],
    ['feedback', 'Body temperature regulation by sweating is an example of:', ['Positive feedback', 'Negative feedback', 'Signal amplification', 'Apoptosis'], 1, 'The response reverses the change, bringing the body back to the set point.'],
  ]);
  SW.mcqs('bio5', [
    ['meiosis genetic variation', 'Which process in meiosis I creates new combinations of alleles on one chromosome?', ['Independent assortment', 'Crossing over', 'Cytokinesis', 'DNA replication'], 1, 'Crossing over swaps segments between homologous chromosomes.'],
    ['sex-linked inheritance', 'A color-blind man (X-linked recessive) and a carrier woman have a son. P(son is color-blind)?', ['0', '1/4', '1/2', '1'], 2, 'Sons get their X from mom; she passes the affected X half the time.'],
    ['linked genes', 'Two genes that are close together on the same chromosome will:', ['Assort independently', 'Usually be inherited together', 'Always cross over', 'Be on sex chromosomes'], 1, 'Close genes rarely get separated by crossing over.'],
  ]);
  SW.mcqs('bio6', [
    ['transcription translation', 'Translation happens at the:', ['Nucleus', 'Ribosome', 'Golgi', 'Nucleolus only'], 1, 'Ribosomes read mRNA codons and build the polypeptide.'],
    ['lac operon', 'In the lac operon, when lactose is present the repressor:', ['Binds the operator more tightly', 'Is inactivated, so genes are transcribed', 'Is made in larger amounts', 'Destroys lactose'], 1, 'Allolactose binds the repressor, which releases the operator.'],
    ['mutation types', 'A frameshift mutation is caused by:', ['A single base substitution', 'Inserting or deleting bases (not a multiple of 3)', 'A silent change', 'Methylation'], 1, 'Adding or removing bases shifts every codon after it.'],
    ['dna replication', 'DNA polymerase can only add nucleotides to:', ["The 5' end", "The 3' end", 'Either end', 'RNA only'], 1, "It builds 5' to 3', so the lagging strand is made in Okazaki fragments."],
    ['biotechnology gel electrophoresis', 'In gel electrophoresis, smaller DNA fragments:', ['Move farther toward the positive end', 'Stay near the wells', 'Move toward the negative end', 'Do not move'], 0, 'DNA is negative and small pieces slip through the gel faster.'],
  ]);
  SW.mcqs('bio7', [
    ['natural selection', 'Which is required for natural selection to occur?', ['Organisms try to adapt', 'Heritable variation that affects survival or reproduction', 'Large population size', 'Mutations caused by the environment'], 1, 'Selection acts on inherited differences in fitness.'],
    ['genetic drift', 'Genetic drift has the biggest effect in:', ['Large populations', 'Small populations', 'Populations with gene flow', 'Asexual populations only'], 1, 'Random chance changes allele frequencies more when there are few individuals.'],
    ['phylogenetic tree', 'On a phylogenetic tree, two species that share a more recent common ancestor are:', ['Less related', 'More closely related', 'The same species', 'Not related'], 1, 'The more recent the shared branch point, the closer the relationship.'],
    ['homologous structures', 'Human arms and whale flippers are:', ['Analogous structures', 'Homologous structures', 'Vestigial structures', 'Convergent traits'], 1, 'Same bone layout inherited from a common ancestor, different use.'],
    ['hardy weinberg conditions', 'Which is NOT a Hardy-Weinberg condition?', ['No mutation', 'Random mating', 'Natural selection', 'Large population'], 2, 'Hardy-Weinberg needs NO selection; selection changes allele frequencies.'],
  ]);
  SW.mcqs('bio8', [
    ['keystone species', 'Removing a keystone species usually:', ['Has little effect', 'Greatly changes community structure', 'Increases diversity', 'Only affects producers'], 1, 'Keystone species have an effect far larger than their numbers suggest.'],
    ['energy flow', 'Why are food chains rarely longer than 4-5 levels?', ['Predators are rare', 'Most energy is lost as heat at each level', 'Nutrients run out', 'Producers are inefficient'], 1, 'Only about 10% passes on, so there is too little left at high levels.'],
    ['carrying capacity', 'When a population reaches carrying capacity:', ['Birth rate is zero', 'Birth rate about equals death rate', 'It grows exponentially', 'Resources are unlimited'], 1, 'Growth stops because births and deaths balance.'],
    ['community interactions', 'A relationship where one species benefits and the other is unaffected is:', ['Mutualism', 'Commensalism', 'Parasitism', 'Competition'], 1, 'Commensalism is +/0.'],
  ]);

  // ---------- free response ----------
  SW.frq('bio3', 'Enzyme experiment (long)',
    'Catalase breaks down hydrogen peroxide into water and oxygen gas. A student measures the volume of O2 produced in 2 minutes at 10, 20, 30, 40, 50 and 60 C. The volumes are 4, 9, 15, 18, 7 and 1 mL.\n(a) Identify the independent and dependent variables.\n(b) Identify one variable that must be held constant and explain why.\n(c) Describe the trend in the data and explain the drop above 40 C.\n(d) Predict the effect of adding a competitive inhibitor at 40 C, and justify your prediction.\n(e) Propose a control for this experiment.',
    [[1, '(a) IV = temperature, DV = volume of O2 produced'], [1, '(b) Names a valid constant (enzyme concentration, substrate concentration, pH, time)'], [1, '(b) Explains it would otherwise change the reaction rate'], [1, '(c) Rate increases up to about 40 C, then decreases'], [2, '(c) Explains higher kinetic energy below the optimum AND denaturation (active site shape change) above it'], [1, '(d) Less O2 produced / lower rate'], [1, '(d) Inhibitor competes with substrate for the active site'], [1, '(e) Valid control: boiled (denatured) enzyme, or no enzyme, at each temperature']],
    '(a) Independent: temperature. Dependent: volume of O2 produced in 2 minutes.\n(b) Enzyme concentration, because more enzyme would speed up the reaction no matter the temperature.\n(c) O2 production rises from 10 C to a peak at 40 C, then falls sharply. Below 40 C, molecules move faster and collide more. Above 40 C, the enzyme denatures, so the active site loses its shape and cannot bind substrate.\n(d) Less O2 would be produced, because the competitive inhibitor occupies the active site so fewer substrate molecules can bind.\n(e) Run the same setup with boiled catalase (or no catalase) to show O2 only comes from the enzyme reaction.');
  SW.frq('bio5', 'Fruit fly cross with chi-square (short)',
    'Two fruit flies heterozygous for wing shape (Ww, W = normal is dominant) are crossed. The offspring are 290 normal-winged and 110 curly-winged.\n(a) State the expected ratio and the expected numbers.\n(b) Calculate the chi-square value.\n(c) Using p = 0.05 (critical value 3.84 for 1 degree of freedom), state whether the data support the hypothesis. Justify.',
    [[1, '(a) 3:1 ratio, expected 300 normal and 100 curly'], [1, '(b) Correct setup: (290-300)^2/300 + (110-100)^2/100'], [1, '(b) X^2 = 1.33'], [1, '(c) 1.33 < 3.84, so fail to reject the null; the data fit a 3:1 ratio (differences due to chance)']],
    '(a) Ww x Ww gives 3 normal : 1 curly. Out of 400: 300 normal, 100 curly.\n(b) X^2 = (290 - 300)^2/300 + (110 - 100)^2/100 = 0.333 + 1.00 = 1.33.\n(c) 1.33 < 3.84, so we fail to reject the null hypothesis. The difference from 3:1 is likely due to random chance, so the data support simple dominant/recessive inheritance.');
  SW.frq('bio7', 'Antibiotic resistance (short)',
    'A population of bacteria is exposed to an antibiotic. After 20 generations, most of the population is resistant.\n(a) Explain how natural selection led to this change.\n(b) Explain why a resistant bacterium can pass resistance to bacteria of a DIFFERENT species.\n(c) Predict what would happen to the frequency of the resistance allele if the antibiotic were removed and resistance has a small cost. Justify.',
    [[1, '(a) Variation existed before exposure (resistance from random mutation)'], [1, '(a) Resistant bacteria survived and reproduced more, so the allele frequency rose'], [1, '(b) Horizontal gene transfer (plasmids, conjugation or transformation)'], [1, '(c) Frequency decreases because non-resistant bacteria now have higher fitness']],
    '(a) Some bacteria already had a resistance allele from random mutation. The antibiotic killed most non-resistant cells, so resistant cells survived and reproduced. Over generations the resistance allele became more common.\n(b) Bacteria can share genes by horizontal gene transfer, for example passing a plasmid with the resistance gene by conjugation.\n(c) The resistance allele would slowly decrease, because without the antibiotic it gives no advantage and its cost lowers fitness compared to non-resistant cells.');

  // ---------- reference sheet ----------
  SW.REF.bio = () => `
    <p class="muted small">Based on the AP Biology equations and formulas sheet you get on the exam.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>Statistics</h4><table>
        <tr><td class="eqn">Chi-square: X^2 = sum (o - e)^2/e</td></tr><tr><td class="eqn">df = number of categories - 1</td></tr>
        <tr><td class="eqn">Critical values (p = 0.05): df1 3.84, df2 5.99, df3 7.81, df4 9.49, df5 11.07</td></tr>
        <tr><td class="eqn">Mean = sum x / n</td></tr><tr><td class="eqn">SE = s / sqrt(n); error bars = mean +/- 2SE</td></tr></table></div>
      <div class="ref-unit"><h4>Genetics and evolution</h4><table>
        <tr><td class="eqn">Hardy-Weinberg: p^2 + 2pq + q^2 = 1, p + q = 1</td></tr>
        <tr><td class="eqn">Product rule: P(A and B) = P(A) x P(B)</td></tr><tr><td class="eqn">Sum rule: P(A or B) = P(A) + P(B)</td></tr></table></div>
      <div class="ref-unit"><h4>Water potential</h4><table>
        <tr><td class="eqn">water potential = pressure potential + solute potential</td></tr>
        <tr><td class="eqn">solute potential = -iCRT</td></tr><tr><td class="eqn">R = 0.0831 L bar/(mol K), T in Kelvin</td></tr>
        <tr><td class="eqn">Water moves from high to low water potential</td></tr></table></div>
      <div class="ref-unit"><h4>Ecology</h4><table>
        <tr><td class="eqn">Exponential: dN/dt = rmax N</td></tr><tr><td class="eqn">Logistic: dN/dt = rmax N (K - N)/K</td></tr>
        <tr><td class="eqn">Simpson's index D = 1 - sum (n/N)^2</td></tr><tr><td class="eqn">About 10% of energy passes to the next trophic level</td></tr>
        <tr><td class="eqn">NPP = GPP - respiration</td></tr></table></div>
      <div class="ref-unit"><h4>Cells</h4><table>
        <tr><td class="eqn">SA/V of a cube = 6s^2/s^3 = 6/s</td></tr><tr><td class="eqn">Rate = change in Y / change in time</td></tr>
        <tr><td class="eqn">pH = -log[H+]</td></tr></table></div>
    </div>`;
})();
