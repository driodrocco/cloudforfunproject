/* AP Chemistry: problem generators, solver equations, concept questions,
 * free response, and the reference sheet (with a periodic table). */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, sg, R, pick, W, add } = SW;

  // ---------- data ----------
  // [symbol, atomic number, molar mass, valence electrons (main group) or null, row, column]
  const ELEMENTS = [
    ['H', 1, 1.008, 1, 1, 1], ['He', 2, 4.0, 2, 1, 18],
    ['Li', 3, 6.94, 1, 2, 1], ['Be', 4, 9.01, 2, 2, 2], ['B', 5, 10.81, 3, 2, 13], ['C', 6, 12.01, 4, 2, 14], ['N', 7, 14.01, 5, 2, 15], ['O', 8, 16.0, 6, 2, 16], ['F', 9, 19.0, 7, 2, 17], ['Ne', 10, 20.18, 8, 2, 18],
    ['Na', 11, 22.99, 1, 3, 1], ['Mg', 12, 24.31, 2, 3, 2], ['Al', 13, 26.98, 3, 3, 13], ['Si', 14, 28.09, 4, 3, 14], ['P', 15, 30.97, 5, 3, 15], ['S', 16, 32.06, 6, 3, 16], ['Cl', 17, 35.45, 7, 3, 17], ['Ar', 18, 39.95, 8, 3, 18],
    ['K', 19, 39.1, 1, 4, 1], ['Ca', 20, 40.08, 2, 4, 2], ['Sc', 21, 44.96, null, 4, 3], ['Ti', 22, 47.87, null, 4, 4], ['V', 23, 50.94, null, 4, 5], ['Cr', 24, 52.0, null, 4, 6], ['Mn', 25, 54.94, null, 4, 7], ['Fe', 26, 55.85, null, 4, 8], ['Co', 27, 58.93, null, 4, 9], ['Ni', 28, 58.69, null, 4, 10], ['Cu', 29, 63.55, null, 4, 11], ['Zn', 30, 65.38, null, 4, 12], ['Ga', 31, 69.72, 3, 4, 13], ['Ge', 32, 72.63, 4, 4, 14], ['As', 33, 74.92, 5, 4, 15], ['Se', 34, 78.97, 6, 4, 16], ['Br', 35, 79.9, 7, 4, 17], ['Kr', 36, 83.8, 8, 4, 18],
    ['Rb', 37, 85.47, 1, 5, 1], ['Sr', 38, 87.62, 2, 5, 2], ['Ag', 47, 107.87, null, 5, 11], ['Sn', 50, 118.71, 4, 5, 14], ['I', 53, 126.9, 7, 5, 17], ['Xe', 54, 131.29, 8, 5, 18],
    ['Cs', 55, 132.91, 1, 6, 1], ['Ba', 56, 137.33, 2, 6, 2], ['Pt', 78, 195.08, null, 6, 10], ['Au', 79, 196.97, null, 6, 11], ['Hg', 80, 200.59, null, 6, 12], ['Pb', 82, 207.2, 4, 6, 14],
  ];
  const MM = Object.fromEntries(ELEMENTS.map(e => [e[0], e[2]]));
  const VAL = Object.fromEntries(ELEMENTS.map(e => [e[0], e[3]]));
  SW.CHEM_MM = MM;

  // "Ca(OH)2" -> { Ca: 1, O: 2, H: 2 }
  function parse(f) {
    let i = 0;
    const group = () => {
      const counts = {};
      while (i < f.length && f[i] !== ')') {
        let part;
        if (f[i] === '(') { i++; part = group(); i++; }
        else { const m = /^[A-Z][a-z]?/.exec(f.slice(i)); i += m[0].length; part = { [m[0]]: 1 }; }
        const n = /^\d+/.exec(f.slice(i));
        const k = n ? (i += n[0].length, Number(n[0])) : 1;
        for (const [el, c] of Object.entries(part)) counts[el] = (counts[el] || 0) + c * k;
      }
      return counts;
    };
    return group();
  }
  const molarMass = f => Object.entries(parse(f)).reduce((s, [el, n]) => s + MM[el] * n, 0);
  SW.molarMass = molarMass;
  const COMPOUNDS = ['H2O', 'CO2', 'NaCl', 'C6H12O6', 'CaCO3', 'NH3', 'CH4', 'H2SO4', 'NaOH', 'KCl', 'MgO', 'Fe2O3', 'C3H8', 'C2H6O', 'Al2O3', 'HCl', 'NaHCO3', 'CuSO4', 'AgNO3', 'Ca(OH)2', 'KNO3', 'Mg(OH)2', '(NH4)2SO4'];

  function mmWork(f) {
    const parts = Object.entries(parse(f));
    const terms = parts.map(([el, n]) => (n > 1 ? `${n}(${MM[el]})` : `${MM[el]}`));
    return { line: `MM ${f} = ${terms.join(' + ')} = ${num(r3(molarMass(f)))} g/mol`, mm: r3(molarMass(f)) };
  }

  // ================= Unit 1: Atomic structure =================
  add('chem1', 'Molar mass', () => {
    const f = pick(COMPOUNDS), { line, mm } = mmWork(f);
    return W()
      .l('Molar mass', `compound: ${f}`, 'MM = ?', '')
      .f('MM = sum of (atoms of each element x its atomic mass)')
      .l(line)
      .n('Subscripts outside parentheses multiply everything inside.')
      .done(`What is the molar mass of ${f}?`, mm, 'g/mol');
  });

  add('chem1', 'Grams to molecules', () => {
    const f = pick(COMPOUNDS.filter(c => !/Na|K|Mg|Ca|Fe|Al|Cu|Ag/.test(c))), m = R(1, 100, 0.5), { line, mm } = mmWork(f);
    const n = r3(m / mm), N = r3(n * 6.022e23);
    return W()
      .l('Moles and particles', `m = ${g(m)} g ${f}`, 'NA = 6.022 x 10^23 /mol', 'molecules = ?', '')
      .l(line, '')
      .f('n = m/MM')
      .l(`n = (${g(m)} g)/(${num(mm)} g/mol)`, `n = ${num(n)} mol`, '')
      .f('N = n x NA')
      .l(`N = (${num(n)} mol)(6.022 x 10^23 /mol)`, `N = ${num(N)} molecules`)
      .n('Grams -> moles -> particles. Always go through moles.')
      .done(`How many molecules are in ${g(m)} g of ${f}?`, N, 'molecules');
  });

  add('chem1', 'Percent composition', () => {
    const f = pick(COMPOUNDS), counts = parse(f), el = pick(Object.keys(counts)), { line, mm } = mmWork(f);
    const part = r3(counts[el] * MM[el]), pct = r3((100 * part) / mm);
    return W()
      .l('Percent by mass', `compound: ${f}`, `element: ${el}`, `% ${el} = ?`, '')
      .l(line)
      .l(`mass of ${el} in 1 mol = ${counts[el]}(${MM[el]}) = ${num(part)} g`, '')
      .f('% = (mass of element / molar mass) x 100')
      .l(`% ${el} = (${num(part)} g / ${num(mm)} g) x 100`, `% ${el} = ${num(pct)}%`)
      .done(`What is the percent by mass of ${el} in ${f}?`, pct, '%');
  });

  add('chem1', 'Empirical formula from percent', () => {
    const [name, pcts, ask, ansN] = pick([
      ['CH2O', { C: 40.0, H: 6.71, O: 53.3 }, 'H', 2],
      ['Fe2O3', { Fe: 69.9, O: 30.1 }, 'O', 3],
      ['NO2', { N: 30.4, O: 69.6 }, 'O', 2],
      ['C2H6O', { C: 52.1, H: 13.1, O: 34.7 }, 'H', 6],
      ['P2O5', { P: 43.6, O: 56.4 }, 'O', 5],
      ['CH4', { C: 74.9, H: 25.1 }, 'H', 4],
    ]);
    const mol = Object.fromEntries(Object.entries(pcts).map(([el, p]) => [el, r3(p / MM[el])]));
    const small = Math.min(...Object.values(mol)), ratio = Object.fromEntries(Object.entries(mol).map(([el, n]) => [el, r3(n / small)]));
    const needs2 = Object.values(ratio).some(x => Math.abs(x - Math.round(x)) > 0.2);
    return W()
      .l('Empirical formula', Object.entries(pcts).map(([el, p]) => `${el}: ${g(p)}%`).join(', '), '')
      .f('Assume 100 g, change grams to moles, divide by the smallest number of moles')
      .l(...Object.entries(pcts).map(([el, p]) => `${el}: ${g(p)} g / ${MM[el]} g/mol = ${num(mol[el])} mol`))
      .l(`divide by ${num(small)}: ${Object.entries(ratio).map(([el, x]) => `${el} = ${num(x)}`).join(', ')}`)
      .l(...(needs2 ? ['multiply everything by 2 to get whole numbers'] : []))
      .l(`empirical formula: ${name}`, `${ask} atoms = ${ansN}`)
      .n('If a ratio ends in .5, double everything.')
      .done(`A compound is ${Object.entries(pcts).map(([el, p]) => `${g(p)}% ${el}`).join(', ')} by mass. How many ${ask} atoms are in its empirical formula?`, ansN, 'atoms');
  });

  // ================= Unit 2: Compound structure =================
  add('chem2', 'Counting valence electrons for a Lewis structure', () => {
    const [f, charge] = pick([['CO2', 0], ['NH3', 0], ['CH4', 0], ['H2O', 0], ['SO2', 0], ['NO3', -1], ['CO3', -2], ['HCN', 0], ['CH2O', 0], ['PCl5', 0], ['SF6', 0], ['XeF4', 0], ['NH4', 1], ['O3', 0]]);
    const counts = parse(f), base = Object.entries(counts).reduce((s, [el, n]) => s + VAL[el] * n, 0), ans = base - charge;
    const name = f + (charge ? (charge > 0 ? '+' : charge === -1 ? '-' : `${-charge}-`) : '');
    return W()
      .l('Lewis structure', `species: ${name}`, 'total valence electrons = ?', '')
      .f('Add the valence electrons of every atom; add 1 per negative charge, subtract 1 per positive charge')
      .l(...Object.entries(counts).map(([el, n]) => `${el}: ${n} x ${VAL[el]} = ${n * VAL[el]}`))
      .l(...(charge ? [`charge ${charge > 0 ? '+' : ''}${charge}: ${charge < 0 ? 'add ' + -charge : 'subtract ' + charge}`] : []))
      .l(`total = ${ans} electrons`)
      .done(`How many valence electrons should the Lewis structure of ${name} show?`, ans, 'electrons');
  });

  // ================= Unit 3: Properties of substances and mixtures =================
  add('chem3', 'Ideal gas law: volume', () => {
    const n = R(0.1, 4, 0.05), C = R(0, 100, 1), P = R(0.5, 3, 0.05), T = C + 273, V = r3((n * 0.08206 * T) / P);
    return W()
      .l('Ideal gas law', `n = ${g(n)} mol`, `T = ${C} C + 273 = ${T} K`, `P = ${g(P)} atm`, 'R = 0.08206 L atm/(mol K)', 'V = ?', '')
      .f('PV = nRT')
      .l(`(${g(P)} atm)V = (${g(n)} mol)(0.08206 L atm/(mol K))(${T} K)`, `V = ${num(V)} L`)
      .n('Use the R that matches your units: 0.08206 with atm and L.')
      .done(`What volume does ${g(n)} mol of an ideal gas occupy at ${C} C and ${g(P)} atm?`, V, 'L');
  });

  add('chem3', 'Molarity', () => {
    const f = pick(['NaCl', 'KCl', 'NaOH', 'C6H12O6', 'KNO3', 'CuSO4', 'AgNO3']), m = R(1, 50, 0.5), mL = R(100, 1000, 50), { line, mm } = mmWork(f);
    const n = r3(m / mm), M = r3(n / (mL / 1000));
    return W()
      .l('Molarity', `${g(m)} g ${f}`, `V = ${mL} mL = ${g(mL / 1000)} L`, 'M = ?', '')
      .l(line, `n = ${g(m)} g / ${num(mm)} g/mol = ${num(n)} mol`, '')
      .f('M = n/V (liters)')
      .l(`M = (${num(n)} mol)/(${g(mL / 1000)} L)`, `M = ${num(M)} M`)
      .n('Volume must be in liters of SOLUTION.')
      .done(`${g(m)} g of ${f} is dissolved to make ${mL} mL of solution. What is the molarity?`, M, 'M');
  });

  add('chem3', 'Dilution', () => {
    const M1 = R(1, 18, 0.5), M2 = R(0.05, 0.9 * M1 > 2 ? 2 : M1 / 2, 0.05) || 0.1, V2 = R(100, 1000, 50), V1 = r3((M2 * V2) / M1);
    return W()
      .l('Dilution', `M1 = ${g(M1)} M (stock)`, `M2 = ${g(M2)} M`, `V2 = ${V2} mL`, 'V1 = ?', '')
      .f('M1V1 = M2V2')
      .l(`(${g(M1)} M)V1 = (${g(M2)} M)(${V2} mL)`, `V1 = ${num(V1)} mL`)
      .n('Moles of solute stay the same; only water is added.')
      .done(`What volume of ${g(M1)} M stock solution is needed to make ${V2} mL of ${g(M2)} M solution?`, V1, 'mL');
  });

  add('chem3', "Dalton's law: partial pressure", () => {
    const nA = R(0.1, 3, 0.1), nB = R(0.1, 3, 0.1), P = R(0.5, 5, 0.1), x = r3(nA / (nA + nB)), PA = r3(x * P);
    return W()
      .l("Dalton's law", `n(N2) = ${g(nA)} mol, n(O2) = ${g(nB)} mol`, `P total = ${g(P)} atm`, 'P(N2) = ?', '')
      .f('P(A) = X(A) x P total, with X(A) = n(A)/n total')
      .l(`X(N2) = ${g(nA)}/${g(r3(nA + nB))} = ${num(x)}`, `P(N2) = (${num(x)})(${g(P)} atm)`, `P(N2) = ${num(PA)} atm`)
      .done(`A container holds ${g(nA)} mol N2 and ${g(nB)} mol O2 at a total pressure of ${g(P)} atm. What is the partial pressure of N2?`, PA, 'atm');
  });

  add('chem3', "Beer's law", () => {
    const eps = R(500, 15000, 100), b = 1, A = R(0.1, 1.2, 0.01), c = r3(A / (eps * b));
    return W()
      .l("Beer-Lambert law", `A = ${g(A)}`, `e = ${eps} /(M cm)`, 'b = 1.00 cm', 'c = ?', '')
      .f('A = ebc')
      .l(`${g(A)} = (${eps} /(M cm))(1.00 cm)c`, `c = ${num(c)} M`)
      .n('Absorbance has no units. Higher concentration means more light absorbed.')
      .done(`A solution in a 1.00 cm cuvette has an absorbance of ${g(A)}. The molar absorptivity is ${eps} /(M cm). What is the concentration?`, c, 'M');
  });

  add('chem3', 'Photon energy from wavelength', () => {
    const nm = R(200, 750, 5), E = r3((6.626e-34 * 2.998e8) / (nm * 1e-9));
    return W()
      .l('Photon energy', `lambda = ${nm} nm = ${g(nm * 1e-9)} m`, 'h = 6.626 x 10^-34 J s', 'c = 2.998 x 10^8 m/s', 'E = ?', '')
      .f('E = hc/lambda')
      .l(`E = (6.626 x 10^-34 J s)(2.998 x 10^8 m/s)/(${g(nm * 1e-9)} m)`, `E = ${num(E)} J`)
      .n('Change nm to m first: multiply by 10^-9.')
      .done(`What is the energy of one photon of light with a wavelength of ${nm} nm?`, E, 'J');
  });

  // ================= Unit 4: Chemical reactions =================
  const RXNS = [
    { eq: '2 H2 + O2 -> 2 H2O', c: { H2: 2, O2: 1, H2O: 2 }, r: ['H2', 'O2'], p: ['H2O'] },
    { eq: 'CH4 + 2 O2 -> CO2 + 2 H2O', c: { CH4: 1, O2: 2, CO2: 1, H2O: 2 }, r: ['CH4', 'O2'], p: ['CO2', 'H2O'] },
    { eq: 'N2 + 3 H2 -> 2 NH3', c: { N2: 1, H2: 3, NH3: 2 }, r: ['N2', 'H2'], p: ['NH3'] },
    { eq: '2 Na + Cl2 -> 2 NaCl', c: { Na: 2, Cl2: 1, NaCl: 2 }, r: ['Na', 'Cl2'], p: ['NaCl'] },
    { eq: '4 Fe + 3 O2 -> 2 Fe2O3', c: { Fe: 4, O2: 3, Fe2O3: 2 }, r: ['Fe', 'O2'], p: ['Fe2O3'] },
    { eq: 'C3H8 + 5 O2 -> 3 CO2 + 4 H2O', c: { C3H8: 1, O2: 5, CO2: 3, H2O: 4 }, r: ['C3H8', 'O2'], p: ['CO2', 'H2O'] },
    { eq: '2 Al + 3 Cl2 -> 2 AlCl3', c: { Al: 2, Cl2: 3, AlCl3: 2 }, r: ['Al', 'Cl2'], p: ['AlCl3'] },
  ];

  add('chem4', 'Stoichiometry: grams to grams', () => {
    const rx = pick(RXNS), A = pick(rx.r), B = pick(rx.p), m = R(1, 100, 0.5);
    const mmA = r3(molarMass(A)), mmB = r3(molarMass(B)), nA = r3(m / mmA), nB = r3((nA * rx.c[B]) / rx.c[A]), mB = r3(nB * mmB);
    return W()
      .l('Stoichiometry', rx.eq, `${g(m)} g ${A}`, `g ${B} = ?`, '')
      .f('grams A -> moles A -> (mole ratio) -> moles B -> grams B')
      .l(`n(${A}) = ${g(m)} g / ${num(mmA)} g/mol = ${num(nA)} mol`, `n(${B}) = ${num(nA)} mol x (${rx.c[B]} ${B} / ${rx.c[A]} ${A}) = ${num(nB)} mol`, `m(${B}) = ${num(nB)} mol x ${num(mmB)} g/mol = ${num(mB)} g`)
      .n('The coefficients in the balanced equation give the mole ratio, never the gram ratio.')
      .done(`For ${rx.eq}, how many grams of ${B} form from ${g(m)} g of ${A} (with plenty of the other reactant)?`, mB, 'g');
  });

  add('chem4', 'Limiting reactant', () => {
    const rx = pick(RXNS), [A, B] = rx.r, P = rx.p[0], mA = R(2, 60, 1), mB = R(2, 60, 1);
    const nA = r3(mA / r3(molarMass(A))), nB = r3(mB / r3(molarMass(B)));
    const pA = r3((nA * rx.c[P]) / rx.c[A]), pB = r3((nB * rx.c[P]) / rx.c[B]);
    const lim = pA <= pB ? A : B, nP = Math.min(pA, pB), mP = r3(nP * r3(molarMass(P)));
    return W()
      .l('Limiting reactant', rx.eq, `${g(mA)} g ${A}, ${g(mB)} g ${B}`, `g ${P} = ?`, '')
      .f('Find how much product EACH reactant could make. The smaller amount wins.')
      .l(`from ${A}: ${g(mA)}/${num(r3(molarMass(A)))} = ${num(nA)} mol x ${rx.c[P]}/${rx.c[A]} = ${num(pA)} mol ${P}`)
      .l(`from ${B}: ${g(mB)}/${num(r3(molarMass(B)))} = ${num(nB)} mol x ${rx.c[P]}/${rx.c[B]} = ${num(pB)} mol ${P}`)
      .l(`limiting reactant: ${lim}`, `m(${P}) = ${num(nP)} mol x ${num(r3(molarMass(P)))} g/mol = ${num(mP)} g`)
      .done(`For ${rx.eq}, ${g(mA)} g of ${A} reacts with ${g(mB)} g of ${B}. What mass of ${P} can form?`, mP, 'g');
  });

  add('chem4', 'Acid-base titration', () => {
    const Vb = R(10, 45, 0.05), Mb = R(0.05, 0.5, 0.005), Va = R(10, 50, 5), Ma = r3((Mb * Vb) / Va);
    return W()
      .l('Titration (1:1 HCl + NaOH)', `NaOH: ${g(Mb)} M, ${g(Vb)} mL`, `HCl: ${Va} mL`, '[HCl] = ?', '')
      .f('At equivalence: moles acid = moles base, so MaVa = MbVb')
      .l(`Ma(${Va} mL) = (${g(Mb)} M)(${g(Vb)} mL)`, `Ma = ${num(Ma)} M`)
      .n('This shortcut only works when the mole ratio is 1:1.')
      .done(`${Va} mL of HCl is titrated to the equivalence point with ${g(Vb)} mL of ${g(Mb)} M NaOH. What is the HCl concentration?`, Ma, 'M');
  });

  add('chem4', 'Percent yield', () => {
    const th = R(5, 80, 0.5), act = r3(th * R(0.55, 0.97, 0.01)), pct = r3((100 * act) / th);
    return W()
      .l('Percent yield', `theoretical = ${g(th)} g`, `actual = ${g(act)} g`, '% yield = ?', '')
      .f('% yield = actual/theoretical x 100')
      .l(`% yield = (${g(act)} g / ${g(th)} g) x 100`, `% yield = ${num(pct)}%`)
      .done(`A reaction should make ${g(th)} g of product but only ${g(act)} g is collected. What is the percent yield?`, pct, '%');
  });

  // ================= Unit 5: Kinetics =================
  add('chem5', 'First-order half-life', () => {
    const k = R(0.001, 0.5, 0.001), t = r3(0.693 / k);
    return W()
      .l('First-order kinetics', `k = ${g(k)} s^-1`, 't1/2 = ?', '')
      .f('t1/2 = 0.693/k (first order)')
      .l(`t1/2 = 0.693/(${g(k)} s^-1)`, `t1/2 = ${num(t)} s`)
      .n('A first-order half-life does not depend on concentration.')
      .done(`A first-order reaction has k = ${g(k)} s^-1. What is its half-life?`, t, 's');
  });

  add('chem5', 'First-order: concentration after time', () => {
    const A0 = R(0.1, 2, 0.05), k = R(0.005, 0.2, 0.005), t = R(5, 120, 5), A = r3(A0 * Math.exp(-k * t));
    return W()
      .l('Integrated rate law (first order)', `[A]0 = ${g(A0)} M`, `k = ${g(k)} s^-1`, `t = ${t} s`, '[A] = ?', '')
      .f('ln[A] = ln[A]0 - kt')
      .l(`ln[A] = ln(${g(A0)}) - (${g(k)})(${t})`, `ln[A] = ${num(Math.log(A0) - k * t)}`, `[A] = ${num(A)} M`)
      .done(`A first-order reaction starts at [A] = ${g(A0)} M with k = ${g(k)} s^-1. What is [A] after ${t} s?`, A, 'M');
  });

  add('chem5', 'Order from experiment data', () => {
    const order = pick([0, 1, 2]), c1 = R(0.1, 0.5, 0.05), r1 = R(1, 9, 0.5);
    const factor = pick([2, 3]), r2 = r3(r1 * factor ** order);
    return W()
      .l('Method of initial rates', `exp 1: [A] = ${g(c1)} M, rate = ${g(r1)} x 10^-3 M/s`, `exp 2: [A] = ${g(r3(c1 * factor))} M, rate = ${g(r2)} x 10^-3 M/s`, 'order in A = ?', '')
      .f('(rate2/rate1) = ([A]2/[A]1)^order')
      .l(`rate ratio = ${g(r2)}/${g(r1)} = ${g(r3(r2 / r1))}`, `conc ratio = ${factor}`, `${factor}^order = ${g(r3(r2 / r1))}`, `order = ${order}`)
      .done(`When [A] goes from ${g(c1)} M to ${g(r3(c1 * factor))} M, the rate goes from ${g(r1)} x 10^-3 to ${g(r2)} x 10^-3 M/s. What is the order with respect to A?`, order, '');
  });

  add('chem5', 'Second-order: concentration after time', () => {
    const A0 = R(0.2, 2, 0.1), k = R(0.01, 0.5, 0.01), t = R(5, 100, 5), A = r3(1 / (1 / A0 + k * t));
    return W()
      .l('Integrated rate law (second order)', `[A]0 = ${g(A0)} M`, `k = ${g(k)} /(M s)`, `t = ${t} s`, '[A] = ?', '')
      .f('1/[A] = 1/[A]0 + kt')
      .l(`1/[A] = 1/${g(A0)} + (${g(k)})(${t})`, `1/[A] = ${num(1 / A0 + k * t)} /M`, `[A] = ${num(A)} M`)
      .done(`A second-order reaction has k = ${g(k)} /(M s) and [A]0 = ${g(A0)} M. What is [A] after ${t} s?`, A, 'M');
  });

  // ================= Unit 6: Thermochemistry =================
  add('chem6', 'Heat absorbed by water', () => {
    const m = R(50, 500, 10), dT = R(2, 60, 1), q = r3(m * 4.18 * dT);
    return W()
      .l('Calorimetry', `m = ${m} g water`, 'c = 4.18 J/(g C)', `deltaT = ${dT} C`, 'q = ?', '')
      .f('q = mc deltaT')
      .l(`q = (${m} g)(4.18 J/(g C))(${dT} C)`, `q = ${num(q)} J`)
      .done(`How much heat is needed to warm ${m} g of water by ${dT} C?`, q, 'J');
  });

  add('chem6', 'Enthalpy of dissolving from calorimetry', () => {
    const f = pick(['NaOH', 'KNO3', 'NH4NO3']), endo = f !== 'NaOH';
    const m = R(2, 10, 0.5), water = R(50, 200, 10), dT = R(1, 8, 0.1), mm = r3(molarMass(f));
    const qw = r3((m + water) * 4.18 * dT * (endo ? -1 : 1)), n = r3(m / mm), dH = r3(-qw / 1000 / n);
    return W()
      .l('Coffee-cup calorimetry', `${g(m)} g ${f} dissolved in ${water} g water`, `temperature ${endo ? 'drops' : 'rises'} ${g(dT)} C`, 'c = 4.18 J/(g C)', 'deltaH (kJ/mol) = ?', '')
      .f('q solution = mc deltaT; deltaH = -q solution / moles')
      .l(`q soln = (${g(m + water)} g)(4.18)(${endo ? '-' : '+'}${g(dT)} C) = ${sg(qw)} J`, `n = ${g(m)} g / ${num(mm)} g/mol = ${num(n)} mol`, `deltaH = -(${sg(r3(qw / 1000))} kJ)/(${num(n)} mol)`, `deltaH = ${sg(dH)} kJ/mol`)
      .n(endo ? 'The water got colder, so the dissolving absorbed heat: endothermic, positive deltaH.' : 'The water got warmer, so the dissolving released heat: exothermic, negative deltaH.')
      .done(`${g(m)} g of ${f} dissolves in ${water} g of water and the temperature ${endo ? 'drops' : 'rises'} by ${g(dT)} C. Find deltaH of dissolving in kJ/mol (use the total mass and c = 4.18 J/(g C)).`, dH, 'kJ/mol', true);
  });

  add('chem6', 'Enthalpy from heats of formation', () => {
    const [eq, prods, reacts, ans] = pick([
      ['CH4 + 2 O2 -> CO2 + 2 H2O(l)', 'CO2: -393.5, H2O(l): -285.8', 'CH4: -74.8, O2: 0', -890.3],
      ['C3H8 + 5 O2 -> 3 CO2 + 4 H2O(l)', 'CO2: -393.5, H2O(l): -285.8', 'C3H8: -103.8, O2: 0', -2219.9],
      ['C2H5OH + 3 O2 -> 2 CO2 + 3 H2O(l)', 'CO2: -393.5, H2O(l): -285.8', 'C2H5OH: -277.7, O2: 0', -1366.7],
      ['CaCO3 -> CaO + CO2', 'CaO: -635.1, CO2: -393.5', 'CaCO3: -1206.9', 178.3],
      ['2 H2O2 -> 2 H2O(l) + O2', 'H2O(l): -285.8, O2: 0', 'H2O2: -187.8', -196.0],
    ]);
    return W()
      .l('Enthalpy of reaction', eq, `deltaHf (kJ/mol): ${prods}; ${reacts}`, '')
      .f('deltaH rxn = sum(n deltaHf products) - sum(n deltaHf reactants)')
      .l('Multiply each deltaHf by its coefficient, then products minus reactants', `deltaH rxn = ${sg(ans)} kJ/mol rxn`)
      .n('Elements in their standard state (like O2) have deltaHf = 0.')
      .done(`Using these standard heats of formation (kJ/mol): ${prods}; ${reacts}, find deltaH for ${eq}.`, ans, 'kJ/mol', true);
  });

  add('chem6', "Hess's law: flip and scale", () => {
    const dH = R(-500, 500, 5) || 100, k = pick([2, 3, 0.5]), ans = r3(-dH * k);
    return W()
      .l("Hess's law", `A -> B, deltaH = ${sg(dH)} kJ`, `want: ${g(k)} B -> ${g(k)} A`, '')
      .f('Reverse a reaction: flip the sign. Multiply a reaction: multiply deltaH.')
      .l(`reverse: B -> A, deltaH = ${sg(-dH)} kJ`, `times ${g(k)}: deltaH = ${g(k)}(${sg(-dH)} kJ) = ${sg(ans)} kJ`)
      .done(`If A -> B has deltaH = ${sg(dH)} kJ, what is deltaH for ${g(k)} B -> ${g(k)} A?`, ans, 'kJ', true);
  });

  add('chem6', 'Enthalpy from bond energies', () => {
    const [eq, broken, formed, ans] = pick([
      ['H2 + Cl2 -> 2 HCl', 'H-H 436 + Cl-Cl 243 = 679', '2(H-Cl 432) = 864', -185],
      ['H2 + F2 -> 2 HF', 'H-H 436 + F-F 158 = 594', '2(H-F 568) = 1136', -542],
      ['N2 + 3 H2 -> 2 NH3', 'N=N triple 945 + 3(H-H 436) = 2253', '6(N-H 391) = 2346', -93],
      ['H2 + Br2 -> 2 HBr', 'H-H 436 + Br-Br 193 = 629', '2(H-Br 366) = 732', -103],
    ]);
    return W()
      .l('Bond enthalpies', eq, '')
      .f('deltaH = (bonds broken) - (bonds formed)')
      .l(`broken: ${broken} kJ`, `formed: ${formed} kJ`, `deltaH = ${broken.split('= ')[1]} - ${formed.split('= ')[1]} = ${sg(ans)} kJ`)
      .n('Breaking bonds costs energy; forming bonds releases it.')
      .done(`Use bond energies to estimate deltaH for ${eq}. (H-H 436, Cl-Cl 243, H-Cl 432, F-F 158, H-F 568, N triple bond 945, N-H 391, Br-Br 193, H-Br 366 kJ/mol)`, ans, 'kJ', true);
  });

  // ================= Unit 7: Equilibrium =================
  add('chem7', 'Equilibrium constant Kc', () => {
    const N2 = R(0.1, 1, 0.05), H2 = R(0.1, 1, 0.05), NH3 = R(0.01, 0.5, 0.01), K = r3((NH3 * NH3) / (N2 * H2 ** 3));
    return W()
      .l('Equilibrium constant', 'N2(g) + 3 H2(g) <-> 2 NH3(g)', `[N2] = ${g(N2)} M, [H2] = ${g(H2)} M, [NH3] = ${g(NH3)} M`, 'Kc = ?', '')
      .f('Kc = [products]^coefficients / [reactants]^coefficients')
      .l('Kc = [NH3]^2/([N2][H2]^3)', `Kc = (${g(NH3)})^2/((${g(N2)})(${g(H2)})^3)`, `Kc = ${num(K)}`)
      .n('Coefficients become exponents. Solids and pure liquids are left out.')
      .done(`At equilibrium, [N2] = ${g(N2)} M, [H2] = ${g(H2)} M and [NH3] = ${g(NH3)} M. Find Kc for N2 + 3 H2 <-> 2 NH3.`, K, '');
  });

  add('chem7', 'Reaction quotient Q', () => {
    const H2 = R(0.1, 1, 0.05), I2 = R(0.1, 1, 0.05), HI = R(0.1, 3, 0.05), K = pick([50.5, 54.3, 64]), Q = r3((HI * HI) / (H2 * I2));
    return W()
      .l('Reaction quotient', 'H2 + I2 <-> 2 HI', `Kc = ${K}`, `[H2] = ${g(H2)}, [I2] = ${g(I2)}, [HI] = ${g(HI)}`, 'Q = ?', '')
      .f('Q has the same form as K but uses the current concentrations')
      .l(`Q = [HI]^2/([H2][I2]) = (${g(HI)})^2/((${g(H2)})(${g(I2)}))`, `Q = ${num(Q)}`, Q < K ? `Q < K, so the reaction shifts right (toward HI)` : `Q > K, so the reaction shifts left (toward H2 and I2)`)
      .done(`For H2 + I2 <-> 2 HI (Kc = ${K}), a mixture has [H2] = ${g(H2)} M, [I2] = ${g(I2)} M and [HI] = ${g(HI)} M. What is Q?`, Q, '');
  });

  add('chem7', 'Molar solubility from Ksp', () => {
    const [salt, type] = pick([['AgCl', 1], ['BaSO4', 1], ['AgBr', 1], ['CaF2', 2], ['PbI2', 2], ['Mg(OH)2', 2]]);
    const Ksp = Number((R(1, 9, 0.1) * 10 ** -R(5, 12, 1)).toPrecision(2));
    const s = r3(type === 1 ? Math.sqrt(Ksp) : Math.cbrt(Ksp / 4));
    return W()
      .l('Solubility equilibrium', `${salt}, Ksp = ${g(Ksp)}`, 's = ?', '')
      .f(type === 1 ? 'AB(s) <-> A+ + B-, Ksp = s x s = s^2' : 'AB2(s) <-> A2+ + 2 B-, Ksp = s(2s)^2 = 4s^3')
      .l(type === 1 ? `s^2 = ${g(Ksp)}` : `4s^3 = ${g(Ksp)}`, `s = ${num(s)} M`)
      .n(type === 2 ? 'Do not forget to square the 2s.' : 'Each formula unit that dissolves gives one of each ion.')
      .done(`What is the molar solubility of ${salt} (Ksp = ${g(Ksp)})?`, s, 'M');
  });

  add('chem7', 'Simple ICE table', () => {
    const K = R(0.5, 9, 0.5), A0 = R(0.2, 2, 0.1), x = r3((K * A0) / (1 + K));
    return W()
      .l('ICE table', `A <-> B, K = ${g(K)}`, `[A]0 = ${g(A0)} M, [B]0 = 0`, '[B] at equilibrium = ?', '')
      .f('Change: A loses x, B gains x. Then plug into K.')
      .l(`K = x/(${g(A0)} - x)`, `${g(K)}(${g(A0)} - x) = x`, `x = ${g(K)}(${g(A0)})/(1 + ${g(K)})`, `[B] = ${num(x)} M`)
      .done(`For A <-> B with K = ${g(K)}, starting with ${g(A0)} M A and no B, what is [B] at equilibrium?`, x, 'M');
  });

  // ================= Unit 8: Acids and bases =================
  add('chem8', 'pH of a strong acid', () => {
    const C = Number((R(1, 9.9, 0.1) * 10 ** -R(1, 4, 1)).toPrecision(2)), pH = r3(-Math.log10(C));
    return W()
      .l('Strong acid', `[HCl] = ${g(C)} M`, 'pH = ?', '')
      .f('Strong acids ionize completely: [H3O+] = [acid]; pH = -log[H3O+]')
      .l(`[H3O+] = ${g(C)} M`, `pH = -log(${g(C)})`, `pH = ${num(pH)}`)
      .done(`What is the pH of ${g(C)} M HCl?`, pH, '');
  });

  add('chem8', 'pH of a strong base', () => {
    const C = Number((R(1, 9.9, 0.1) * 10 ** -R(1, 4, 1)).toPrecision(2)), pOH = r3(-Math.log10(C)), pH = r3(14 - pOH);
    return W()
      .l('Strong base', `[NaOH] = ${g(C)} M`, 'pH = ?', '')
      .f('[OH-] = [base]; pOH = -log[OH-]; pH = 14 - pOH (at 25 C)')
      .l(`pOH = -log(${g(C)}) = ${num(pOH)}`, `pH = 14 - ${num(pOH)}`, `pH = ${num(pH)}`)
      .done(`What is the pH of ${g(C)} M NaOH at 25 C?`, pH, '');
  });

  add('chem8', 'pH of a weak acid', () => {
    const [name, Ka] = pick([['acetic acid', 1.8e-5], ['HF', 6.8e-4], ['HCN', 4.9e-10], ['HNO2', 4.5e-4], ['benzoic acid', 6.3e-5]]);
    const C = R(0.05, 1, 0.05), x = r3(Math.sqrt(Ka * C)), pH = r3(-Math.log10(x));
    return W()
      .l('Weak acid', `${name}, Ka = ${g(Ka)}`, `C = ${g(C)} M`, 'pH = ?', '')
      .f('Ka = x^2/(C - x), and x is small so Ka = x^2/C')
      .l(`x = sqrt((${g(Ka)})(${g(C)}))`, `x = [H3O+] = ${num(x)} M`, `pH = -log(${num(x)}) = ${num(pH)}`)
      .n('Check the 5% rule: x should be much smaller than C.')
      .done(`What is the pH of ${g(C)} M ${name} (Ka = ${g(Ka)})?`, pH, '');
  });

  add('chem8', 'Buffer pH (Henderson-Hasselbalch)', () => {
    const [acid, base, pKa] = pick([['CH3COOH', 'CH3COO-', 4.74], ['HF', 'F-', 3.17], ['NH4+', 'NH3', 9.25], ['H2PO4-', 'HPO4 2-', 7.21]]);
    const A = R(0.05, 1, 0.05), B = R(0.05, 1, 0.05), pH = r3(pKa + Math.log10(B / A));
    return W()
      .l('Buffer', `[${acid}] = ${g(A)} M, [${base}] = ${g(B)} M`, `pKa = ${pKa}`, 'pH = ?', '')
      .f('pH = pKa + log([A-]/[HA])')
      .l(`pH = ${pKa} + log(${g(B)}/${g(A)})`, `pH = ${num(pH)}`)
      .n('More base than acid means pH > pKa.')
      .done(`A buffer has ${g(A)} M ${acid} and ${g(B)} M ${base} (pKa = ${pKa}). What is its pH?`, pH, '');
  });

  add('chem8', 'Ka from pH', () => {
    const C = R(0.05, 1, 0.05), pH = R(2.2, 4, 0.05), x = r3(10 ** -pH), Ka = r3((x * x) / (C - x));
    return W()
      .l('Finding Ka', `C = ${g(C)} M weak acid`, `pH = ${g(pH)}`, 'Ka = ?', '')
      .f('[H3O+] = 10^-pH; Ka = x^2/(C - x)')
      .l(`x = 10^-${g(pH)} = ${num(x)} M`, `Ka = (${num(x)})^2/(${g(C)} - ${num(x)})`, `Ka = ${num(Ka)}`)
      .done(`A ${g(C)} M solution of a weak acid has a pH of ${g(pH)}. What is Ka?`, Ka, '');
  });

  // ================= Unit 9: Thermodynamics and electrochemistry =================
  add('chem9', 'Gibbs free energy', () => {
    const dH = R(-200, 200, 1), dS = R(-300, 300, 1), T = R(250, 600, 5), dG = r3(dH - (T * dS) / 1000);
    return W()
      .l('Gibbs free energy', `deltaH = ${sg(dH)} kJ/mol`, `deltaS = ${sg(dS)} J/(mol K) = ${sg(dS / 1000)} kJ/(mol K)`, `T = ${T} K`, 'deltaG = ?', '')
      .f('deltaG = deltaH - T deltaS')
      .l(`deltaG = (${sg(dH)}) - (${T})(${sg(dS / 1000)})`, `deltaG = ${sg(dG)} kJ/mol`, dG < 0 ? 'Negative: thermodynamically favorable' : 'Positive: not thermodynamically favorable')
      .n('Change deltaS from J to kJ before combining with deltaH.')
      .done(`A reaction has deltaH = ${sg(dH)} kJ/mol and deltaS = ${sg(dS)} J/(mol K). What is deltaG at ${T} K?`, dG, 'kJ/mol', true);
  });

  const HALF = [['Ag+', 'Ag', 0.8, 1], ['Cu2+', 'Cu', 0.34, 2], ['Pb2+', 'Pb', -0.13, 2], ['Ni2+', 'Ni', -0.25, 2], ['Fe2+', 'Fe', -0.44, 2], ['Zn2+', 'Zn', -0.76, 2], ['Al3+', 'Al', -1.66, 3], ['Mg2+', 'Mg', -2.37, 2]];
  add('chem9', 'Standard cell potential', () => {
    let a, b; do { a = pick(HALF); b = pick(HALF); } while (a === b);
    const [cat, an] = a[2] > b[2] ? [a, b] : [b, a], E = r3(cat[2] - an[2]);
    return W()
      .l('Galvanic cell', `${a[0]}/${a[1]}: E red = ${g(a[2])} V`, `${b[0]}/${b[1]}: E red = ${g(b[2])} V`, 'E cell = ?', '')
      .f('E cell = E(cathode) - E(anode); the higher reduction potential is the cathode')
      .l(`cathode: ${cat[0]}/${cat[1]} (${g(cat[2])} V)`, `anode: ${an[1]}/${an[0]} (${g(an[2])} V)`, `E cell = ${g(cat[2])} - (${g(an[2])})`, `E cell = ${sg(E)} V`)
      .n('Do not multiply E by the coefficients, even if you balance electrons.')
      .done(`A galvanic cell uses ${a[1]}/${a[0]} (E red = ${g(a[2])} V) and ${b[1]}/${b[0]} (E red = ${g(b[2])} V). What is the standard cell potential?`, E, 'V', true);
  });

  add('chem9', 'Free energy from cell potential', () => {
    const n = pick([1, 2, 3, 6]), E = R(0.1, 2.5, 0.01), dG = r3((-n * 96485 * E) / 1000);
    return W()
      .l('Free energy and cell potential', `n = ${n} mol e-`, `E = ${g(E)} V`, 'F = 96485 C/mol', 'deltaG = ?', '')
      .f('deltaG = -nFE')
      .l(`deltaG = -(${n})(96485 C/mol)(${g(E)} V)`, `deltaG = ${num(r3(-n * 96485 * E))} J = ${sg(dG)} kJ/mol`)
      .n('A positive E cell always means a negative deltaG: the cell runs on its own.')
      .done(`A cell reaction transfers ${n} mol of electrons and has E = ${g(E)} V. What is deltaG in kJ/mol?`, dG, 'kJ/mol', true);
  });

  add('chem9', 'Equilibrium constant from deltaG', () => {
    const dG = R(-40, 40, 1) || -10, T = 298, K = r3(Math.exp((-dG * 1000) / (8.314 * T)));
    return W()
      .l('Free energy and K', `deltaG = ${sg(dG)} kJ/mol`, 'T = 298 K', 'R = 8.314 J/(mol K)', 'K = ?', '')
      .f('deltaG = -RT ln K, so K = e^(-deltaG/RT)')
      .l(`K = e^(-(${sg(dG * 1000)} J)/((8.314)(298)))`, `K = e^(${g(r3((-dG * 1000) / (8.314 * T)))})`, `K = ${num(K)}`)
      .n('Negative deltaG means K > 1: products are favored at equilibrium.')
      .done(`A reaction has deltaG = ${sg(dG)} kJ/mol at 298 K. What is K?`, K, '');
  });

  add('chem9', 'Electrolysis: mass of metal plated', () => {
    const [ion, metal, n] = pick([['Cu2+', 'Cu', 2], ['Ag+', 'Ag', 1], ['Zn2+', 'Zn', 2], ['Ni2+', 'Ni', 2], ['Al3+', 'Al', 3]]);
    const I = R(0.5, 10, 0.5), min = R(5, 120, 5), q = I * min * 60, mol = r3(q / 96485 / n), m = r3(mol * MM[metal]);
    return W()
      .l('Electrolysis', `${ion} + ${n}e- -> ${metal}`, `I = ${g(I)} A`, `t = ${min} min = ${min * 60} s`, 'mass = ?', '')
      .f('q = It; mol e- = q/F; mol metal = mol e-/n; mass = mol x MM')
      .l(`q = (${g(I)} A)(${min * 60} s) = ${g(q)} C`, `mol e- = ${g(q)}/96485 = ${num(r3(q / 96485))} mol`, `mol ${metal} = ${num(r3(q / 96485))}/${n} = ${num(mol)} mol`, `mass = ${num(mol)} mol x ${MM[metal]} g/mol = ${num(m)} g`)
      .done(`A current of ${g(I)} A runs through a ${ion} solution for ${min} minutes. What mass of ${metal} plates out?`, m, 'g');
  });

  // ================= Solver equations =================
  const v = (name, unit, flags = '') => [name, unit, flags];
  SW.EQUATIONS.push(
    { unit: 'chem1', name: 'Moles from mass', tpl: '{n} = {m}/{MM}', vars: { n: v('moles', 'mol', 'pos'), m: v('mass', 'g', 'pos'), MM: v('molar mass', 'g/mol', 'pos') }, f: q => q.n - q.m / q.MM },
    { unit: 'chem1', name: 'Particles from moles', tpl: '{N} = {n}{NA}', vars: { N: v('number of particles', '', 'pos'), n: v('moles', 'mol', 'pos'), NA: v('Avogadro number', '/mol', 'pos c=6.022e23') }, f: q => q.N - q.n * q.NA },
    { unit: 'chem3', name: 'Ideal gas law (L, atm)', tpl: '{P}{V} = {n}{R}{T}', vars: { P: v('pressure', 'atm', 'pos'), V: v('volume', 'L', 'pos'), n: v('moles', 'mol', 'pos'), R: v('gas constant', 'L atm/(mol K)', 'pos c=0.08206'), T: v('temperature (Kelvin!)', 'K', 'pos') }, f: q => q.P * q.V - q.n * q.R * q.T },
    { unit: 'chem3', name: 'Molarity', tpl: '{M} = {n}/{V}', vars: { M: v('molarity', 'M', 'pos'), n: v('moles of solute', 'mol', 'pos'), V: v('liters of solution', 'L', 'pos') }, f: q => q.M - q.n / q.V },
    { unit: 'chem3', name: 'Dilution', tpl: '{M1}{V1} = {M2}{V2}', vars: { M1: v('starting molarity', 'M', 'pos'), V1: v('starting volume', 'mL', 'pos'), M2: v('final molarity', 'M', 'pos'), V2: v('final volume', 'mL', 'pos') }, f: q => q.M1 * q.V1 - q.M2 * q.V2 },
    { unit: 'chem3', name: "Dalton's law", tpl: '{PA} = {XA}{Ptotal}', vars: { PA: v('partial pressure', 'atm', 'pos'), XA: v('mole fraction', '', 'pos'), Ptotal: v('total pressure', 'atm', 'pos') }, f: q => q.PA - q.XA * q.Ptotal },
    { unit: 'chem3', name: "Beer-Lambert law", tpl: '{A} = {e}{b}{c}', vars: { A: v('absorbance', '', 'pos'), e: v('molar absorptivity', '/(M cm)', 'pos'), b: v('path length', 'cm', 'pos c=1'), c: v('concentration', 'M', 'pos') }, f: q => q.A - q.e * q.b * q.c },
    { unit: 'chem3', name: 'Photon energy (wavelength)', tpl: '{E} = {h}{c}/{lambda}', vars: { E: v('energy', 'J', 'pos'), h: v('Planck constant', 'J s', 'pos c=6.626e-34'), c: v('speed of light', 'm/s', 'pos c=2.998e8'), lambda: v('wavelength', 'm', 'pos') }, f: q => q.E - (q.h * q.c) / q.lambda },
    { unit: 'chem5', name: 'First-order half-life', tpl: '{t} = 0.693/{k}', vars: { t: v('half-life', 's', 'pos'), k: v('rate constant', '/s', 'pos') }, f: q => q.t - 0.693 / q.k },
    { unit: 'chem5', name: 'First-order integrated rate law', tpl: 'ln({A}) = ln({A0}) - {k}{t}', vars: { A: v('concentration at t', 'M', 'pos'), A0: v('starting concentration', 'M', 'pos'), k: v('rate constant', '/s', 'pos'), t: v('time', 's', 'pos') }, f: q => Math.log(q.A) - (Math.log(q.A0) - q.k * q.t) },
    { unit: 'chem5', name: 'Second-order integrated rate law', tpl: '1/{A} = 1/{A0} + {k}{t}', vars: { A: v('concentration at t', 'M', 'pos'), A0: v('starting concentration', 'M', 'pos'), k: v('rate constant', '/(M s)', 'pos'), t: v('time', 's', 'pos') }, f: q => 1 / q.A - (1 / q.A0 + q.k * q.t) },
    { unit: 'chem6', name: 'Heat (calorimetry)', tpl: '{q} = {m}{c}{dT}', vars: { q: v('heat', 'J', 'vec'), m: v('mass', 'g', 'pos'), c: v('specific heat', 'J/(g C)', 'pos c=4.18'), dT: v('temperature change', 'C', 'vec') }, f: q => q.q - q.m * q.c * q.dT },
    { unit: 'chem8', name: 'pH', tpl: '{pH} = -log({H})', vars: { pH: v('pH', ''), H: v('[H3O+]', 'M', 'pos') }, f: q => q.pH + Math.log10(q.H) },
    { unit: 'chem8', name: 'pOH and pH', tpl: '{pH} + {pOH} = 14', vars: { pH: v('pH', ''), pOH: v('pOH', '') }, f: q => q.pH + q.pOH - 14 },
    { unit: 'chem8', name: 'Henderson-Hasselbalch', tpl: '{pH} = {pKa} + log({base}/{acid})', vars: { pH: v('pH', ''), pKa: v('pKa', ''), base: v('[A-]', 'M', 'pos'), acid: v('[HA]', 'M', 'pos') }, f: q => q.pH - (q.pKa + Math.log10(q.base / q.acid)) },
    { unit: 'chem8', name: 'Weak acid (x is small)', tpl: '{Ka} = {x}^2/{C}', vars: { Ka: v('Ka', '', 'pos'), x: v('[H3O+]', 'M', 'pos'), C: v('acid concentration', 'M', 'pos') }, f: q => q.Ka - q.x ** 2 / q.C },
    { unit: 'chem8', name: 'pKa', tpl: '{pKa} = -log({Ka})', vars: { pKa: v('pKa', ''), Ka: v('Ka', '', 'pos') }, f: q => q.pKa + Math.log10(q.Ka) },
    { unit: 'chem9', name: 'Gibbs free energy', tpl: '{dG} = {dH} - {T}{dS}', vars: { dG: v('deltaG', 'kJ/mol', 'vec'), dH: v('deltaH', 'kJ/mol', 'vec'), T: v('temperature', 'K', 'pos'), dS: v('deltaS (in kJ!)', 'kJ/(mol K)', 'vec') }, f: q => q.dG - (q.dH - q.T * q.dS) },
    { unit: 'chem9', name: 'Free energy and cell potential', tpl: '{dG} = -{n}{F}{E}', vars: { dG: v('deltaG', 'J/mol', 'vec'), n: v('moles of electrons', 'mol', 'pos'), F: v('Faraday constant', 'C/mol', 'pos c=96485'), E: v('cell potential', 'V', 'vec') }, f: q => q.dG + q.n * q.F * q.E },
    { unit: 'chem9', name: 'Free energy and K', tpl: '{dG} = -{R}{T} ln({K})', vars: { dG: v('deltaG', 'J/mol', 'vec'), R: v('gas constant', 'J/(mol K)', 'pos c=8.314'), T: v('temperature', 'K', 'pos'), K: v('equilibrium constant', '', 'pos') }, f: q => q.dG + q.R * q.T * Math.log(q.K) },
    { unit: 'chem9', name: 'Charge from current', tpl: '{q} = {I}{t}', vars: { q: v('charge', 'C', 'pos'), I: v('current', 'A', 'pos'), t: v('time', 's', 'pos') }, f: q => q.q - q.I * q.t },
  );

  // ================= Concept questions =================
  const Q = (unit, topic, q, c, a, why) => ({ unit, topic, q, c, a, why });
  SW.MCQ.push(
    Q('chem1', 'photoelectron spectroscopy', 'In a photoelectron spectrum, the peak with the HIGHEST binding energy comes from:',
      ['Valence electrons', 'The 1s electrons', 'The outermost p electrons', 'Electrons in the nucleus'], 1,
      'Core 1s electrons are closest to the nucleus and hardest to remove.'),
    Q('chem1', 'periodic trends atomic radius', 'Moving left to right across a period, atomic radius generally:',
      ['Increases', 'Decreases', 'Stays the same', 'Increases then decreases'], 1,
      'More protons pull the same shell of electrons in tighter (higher effective nuclear charge).'),
    Q('chem1', 'ionization energy trend', 'Which has the highest first ionization energy?',
      ['Na', 'Mg', 'Cl', 'Ar'], 3,
      'Noble gases have full shells and the highest effective nuclear charge in their period.'),
    Q('chem1', 'mass spectrometry isotopes', 'A mass spectrum of an element shows two peaks at 35 (75%) and 37 (25%). The average atomic mass is about:',
      ['35.0', '35.5', '36.0', '37.0'], 1,
      '0.75(35) + 0.25(37) = 35.5. That is chlorine.'),
    Q('chem2', 'vsepr shape', 'What is the molecular shape of NH3?',
      ['Trigonal planar', 'Trigonal pyramidal', 'Tetrahedral', 'Bent'], 1,
      'Four electron domains (3 bonds + 1 lone pair) give a tetrahedral arrangement, but the shape with one lone pair is trigonal pyramidal.'),
    Q('chem2', 'hybridization', 'The carbon in CO2 is:',
      ['sp', 'sp2', 'sp3', 'sp3d'], 0,
      'Two electron domains (two double bonds) means sp hybridization and a linear shape.'),
    Q('chem2', 'polarity', 'Which molecule is NONPOLAR even though it has polar bonds?',
      ['H2O', 'NH3', 'CCl4', 'HCl'], 2,
      'CCl4 is symmetric (tetrahedral), so the bond dipoles cancel.'),
    Q('chem2', 'ionic vs metallic bonding', 'Why do metals conduct electricity as solids, but ionic compounds do not?',
      ['Metals have more protons', 'Metals have a sea of delocalized electrons; ions in a solid crystal cannot move', 'Ionic compounds have no charges', 'Metals are liquids'], 1,
      'Charge has to move to conduct. Ions are locked in place until melted or dissolved.'),
    Q('chem3', 'intermolecular forces boiling point', 'Which has the highest boiling point?',
      ['CH4', 'H2S', 'H2O', 'Ne'], 2,
      'Water has hydrogen bonding, the strongest intermolecular force here.'),
    Q('chem3', 'london dispersion', 'Why does I2 have a higher boiling point than F2?',
      ['I2 has hydrogen bonds', 'I2 has more electrons, so stronger London dispersion forces', 'I2 is ionic', 'F2 is polar'], 1,
      'Bigger, more polarizable electron clouds mean stronger dispersion forces.'),
    Q('chem3', 'ideal gas deviation', 'Real gases behave LEAST like ideal gases at:',
      ['High T, low P', 'Low T, high P', 'High T, high P', 'Low T, low P'], 1,
      'At low temperature attractions matter, and at high pressure the molecules\' own volume matters.'),
    Q('chem3', 'chromatography', 'In paper chromatography with a nonpolar solvent, which travels farthest?',
      ['The most polar compound', 'The least polar compound', 'The largest ion', 'All travel equally'], 1,
      '"Like dissolves like": a nonpolar compound stays in the nonpolar solvent and moves with it.'),
    Q('chem4', 'net ionic equation', 'In the net ionic equation for AgNO3(aq) + NaCl(aq), which ions are spectators?',
      ['Ag+ and Cl-', 'Na+ and NO3-', 'Ag+ and NO3-', 'None'], 1,
      'Ag+ + Cl- -> AgCl(s) is the net reaction. Na+ and NO3- stay dissolved.'),
    Q('chem4', 'redox oxidation', 'In Zn + Cu2+ -> Zn2+ + Cu, which is oxidized?',
      ['Zn', 'Cu2+', 'Zn2+', 'Cu'], 0,
      'Zn loses electrons (0 -> +2). OIL RIG: oxidation is loss.'),
    Q('chem4', 'physical vs chemical change', 'Which is a chemical change?',
      ['Ice melting', 'Sugar dissolving', 'Iron rusting', 'Water boiling'], 2,
      'Rusting makes a new substance (iron oxide). The others only change phase or mix.'),
    Q('chem5', 'catalyst', 'A catalyst speeds up a reaction by:',
      ['Raising the temperature', 'Lowering the activation energy', 'Changing deltaH', 'Shifting the equilibrium'], 1,
      'It gives a new pathway with a lower Ea. deltaH and K are unchanged.'),
    Q('chem5', 'rate law from mechanism', 'The rate law of a reaction is determined by:',
      ['The balanced equation coefficients', 'The slowest elementary step', 'The fastest step', 'deltaH'], 1,
      'The rate-determining (slow) step controls the overall rate.'),
    Q('chem5', 'first order graph', 'For a first-order reaction, which plot gives a straight line?',
      ['[A] vs t', 'ln[A] vs t', '1/[A] vs t', '[A]^2 vs t'], 1,
      'Zero: [A] vs t. First: ln[A] vs t. Second: 1/[A] vs t.'),
    Q('chem6', 'endothermic exothermic', 'When a reaction in water makes the solution feel cold, the reaction is:',
      ['Exothermic, deltaH < 0', 'Endothermic, deltaH > 0', 'At equilibrium', 'Not happening'], 1,
      'It pulls heat out of the water to run, so it absorbs energy.'),
    Q('chem6', 'bond breaking energy', 'Breaking a chemical bond:',
      ['Releases energy', 'Requires energy', 'Has no energy change', 'Only happens in exothermic reactions'], 1,
      'You must put energy in to pull atoms apart. Forming bonds releases energy.'),
    Q('chem7', 'le chatelier', 'For N2 + 3 H2 <-> 2 NH3, increasing the pressure by shrinking the container shifts the equilibrium:',
      ['Left', 'Right', 'Not at all', 'It stops the reaction'], 1,
      'Right has fewer moles of gas (2 vs 4), so it relieves the pressure.'),
    Q('chem7', 'temperature and k', 'For an exothermic reaction, raising the temperature makes K:',
      ['Larger', 'Smaller', 'Unchanged', 'Zero'], 1,
      'Treat heat as a product; adding heat shifts left, so K decreases.'),
    Q('chem7', 'common ion effect', 'Adding NaCl to a saturated AgCl solution will:',
      ['Dissolve more AgCl', 'Make some AgCl precipitate', 'Change Ksp', 'Have no effect'], 1,
      'Extra Cl- shifts AgCl(s) <-> Ag+ + Cl- to the left (common ion effect).'),
    Q('chem8', 'strong vs weak acid', 'Which statement is true about a 0.1 M weak acid compared to 0.1 M strong acid?',
      ['The weak acid has a lower pH', 'The weak acid has a higher pH', 'They have the same pH', 'The weak acid has more H3O+'], 1,
      'A weak acid only partly ionizes, so [H3O+] is lower and pH is higher.'),
    Q('chem8', 'buffer half equivalence', 'At the half-equivalence point of a weak acid titration:',
      ['pH = 7', 'pH = pKa', 'pH = 14', '[HA] = 0'], 1,
      'Half the acid has become A-, so [A-] = [HA] and log(1) = 0.'),
    Q('chem8', 'weak acid strong base equivalence', 'Titrating a weak acid with a strong base, the pH at the equivalence point is:',
      ['Less than 7', 'Exactly 7', 'Greater than 7', 'Equal to pKa'], 2,
      'Only the conjugate base A- is left, and it makes the solution basic.'),
    Q('chem9', 'entropy sign', 'Which process has deltaS > 0?',
      ['Water freezing', '2 H2(g) + O2(g) -> 2 H2O(l)', 'Dry ice subliming', 'Gas condensing'], 2,
      'Solid to gas greatly increases disorder (more ways to arrange the particles).'),
    Q('chem9', 'thermodynamic favorability', 'A reaction with deltaH < 0 and deltaS > 0 is:',
      ['Favorable at all temperatures', 'Never favorable', 'Favorable only at high T', 'Favorable only at low T'], 0,
      'deltaG = deltaH - T deltaS is negative minus positive, always negative.'),
    Q('chem9', 'galvanic cell electrons', 'In a galvanic cell, electrons flow through the wire from:',
      ['Cathode to anode', 'Anode to cathode', 'Salt bridge to anode', 'They do not flow'], 1,
      'Oxidation at the anode releases electrons, which travel to the cathode. "An Ox, Red Cat."'),
  );

  // ================= Free response =================
  SW.FRQ.push(
    {
      unit: 'chem4', title: 'Decomposing calcium carbonate (long)',
      prompt: 'A student heats 2.50 g of CaCO3(s), which decomposes: CaCO3(s) -> CaO(s) + CO2(g).\n(a) Calculate the number of moles of CaCO3 in the sample.\n(b) Calculate the volume of CO2 produced at 1.00 atm and 298 K, assuming the reaction goes to completion.\n(c) The student collects 0.550 L of CO2 at these conditions. Calculate the percent yield.\n(d) Give one reason, based on the experiment, that the percent yield could be less than 100%.',
      rubric: [
        { pts: 1, text: '(a) Molar mass of CaCO3 = 100.09 g/mol and n = 2.50/100.09 = 0.0250 mol' },
        { pts: 1, text: '(b) Uses 1:1 mole ratio: 0.0250 mol CO2' },
        { pts: 1, text: '(b) V = nRT/P = (0.0250)(0.08206)(298)/1.00 = 0.611 L' },
        { pts: 1, text: '(c) % yield = 0.550/0.611 x 100 = 90.0% (consistent with their (b))' },
        { pts: 1, text: '(d) Valid reason: incomplete decomposition (not heated long enough), CO2 escaped before collection, or similar' },
      ],
      model: '(a) MM CaCO3 = 40.08 + 12.01 + 3(16.00) = 100.09 g/mol. n = 2.50 g / 100.09 g/mol = 0.0250 mol.\n(b) 1 mol CaCO3 makes 1 mol CO2, so 0.0250 mol CO2. V = nRT/P = (0.0250)(0.08206)(298)/(1.00) = 0.611 L.\n(c) % yield = 0.550 L / 0.611 L x 100 = 90.0%.\n(d) The sample may not have been heated long enough to decompose completely, so less CO2 formed.',
    },
    {
      unit: 'chem8', title: 'Acetate buffer (short)',
      prompt: 'A buffer is made with 0.20 M CH3COOH and 0.30 M NaCH3COO. Ka of CH3COOH = 1.8 x 10^-5.\n(a) Calculate the pH of the buffer.\n(b) Write the net ionic equation for the reaction that happens when a small amount of HCl is added to the buffer.\n(c) Explain why the pH changes only a little when the HCl is added.',
      rubric: [
        { pts: 1, text: '(a) pKa = -log(1.8 x 10^-5) = 4.74' },
        { pts: 1, text: '(a) pH = 4.74 + log(0.30/0.20) = 4.92' },
        { pts: 1, text: '(b) H3O+ + CH3COO- -> CH3COOH + H2O (or H+ + CH3COO- -> CH3COOH)' },
        { pts: 1, text: '(c) The added H3O+ is consumed by the acetate (conjugate base), so [H3O+] barely changes; the ratio [A-]/[HA] changes only slightly' },
      ],
      model: '(a) pKa = -log(1.8 x 10^-5) = 4.74. pH = 4.74 + log(0.30/0.20) = 4.74 + 0.18 = 4.92.\n(b) H3O+(aq) + CH3COO-(aq) -> CH3COOH(aq) + H2O(l)\n(c) The acetate ions react with the added H3O+, turning it into the weak acid CH3COOH. Since the strong acid is used up, [H3O+] stays almost the same. The ratio [CH3COO-]/[CH3COOH] only shifts slightly, so the pH only drops a little.',
    },
    {
      unit: 'chem7', title: 'NO2 and N2O4 equilibrium (short)',
      prompt: 'N2O4(g) <-> 2 NO2(g), deltaH = +57 kJ/mol. At equilibrium in a flask, [N2O4] = 0.040 M and [NO2] = 0.012 M.\n(a) Write the expression for Kc and calculate its value.\n(b) More NO2 is injected into the flask. Which way does the reaction shift? Justify with Q and K.\n(c) The flask is heated. Does Kc increase, decrease, or stay the same? Explain.',
      rubric: [
        { pts: 1, text: '(a) Kc = [NO2]^2/[N2O4]' },
        { pts: 1, text: '(a) Kc = (0.012)^2/0.040 = 0.0036' },
        { pts: 1, text: '(b) Shifts left (toward N2O4) because adding NO2 makes Q > K' },
        { pts: 1, text: '(c) Kc increases because the forward reaction is endothermic (heat acts like a reactant)' },
      ],
      model: '(a) Kc = [NO2]^2/[N2O4] = (0.012)^2/(0.040) = 0.0036.\n(b) Adding NO2 makes the top of Q bigger, so Q > K. The reaction shifts left, making N2O4, until Q = K again.\n(c) The forward reaction is endothermic (deltaH > 0), so heat acts like a reactant. Heating shifts it right, and Kc increases.',
    },
  );

  // ================= Reference sheet =================
  SW.REF.chem = () => {
    const cells = ELEMENTS.map(([s, z, m, , row, col]) => `<div class="el" style="grid-row:${row};grid-column:${col}"><small>${z}</small><b>${s}</b><span>${m}</span></div>`).join('');
    return `
      <h3>Periodic table (main elements used on the exam)</h3>
      <div class="ptable-wrap"><div class="ptable">${cells}</div></div>
      <div class="ref-grid">
        <div class="ref-unit"><h4>Constants</h4><table>
          <tr><td class="eqn">NA = 6.022 x 10^23 /mol</td></tr><tr><td class="eqn">R = 0.08206 L atm/(mol K) = 8.314 J/(mol K)</td></tr>
          <tr><td class="eqn">h = 6.626 x 10^-34 J s</td></tr><tr><td class="eqn">c = 2.998 x 10^8 m/s</td></tr>
          <tr><td class="eqn">F = 96485 C/mol e-</td></tr><tr><td class="eqn">Kw = 1.0 x 10^-14 at 25 C</td></tr>
          <tr><td class="eqn">c(water) = 4.18 J/(g C)</td></tr><tr><td class="eqn">STP: 273 K, 1 atm</td></tr></table></div>
        <div class="ref-unit"><h4>Equations</h4><table>
          <tr><td class="eqn">n = m/MM</td></tr><tr><td class="eqn">PV = nRT</td></tr><tr><td class="eqn">P(A) = X(A) P total</td></tr>
          <tr><td class="eqn">M = mol/L</td></tr><tr><td class="eqn">M1V1 = M2V2</td></tr><tr><td class="eqn">A = ebc</td></tr>
          <tr><td class="eqn">E = h nu, c = lambda nu</td></tr><tr><td class="eqn">q = mc deltaT</td></tr>
          <tr><td class="eqn">deltaH = sum deltaHf(prod) - sum deltaHf(react)</td></tr>
          <tr><td class="eqn">deltaG = deltaH - T deltaS</td></tr><tr><td class="eqn">deltaG = -RT ln K = -nFE</td></tr>
          <tr><td class="eqn">I = q/t</td></tr></table></div>
        <div class="ref-unit"><h4>Kinetics</h4><table>
          <tr><td class="eqn">0th: [A] = [A]0 - kt</td></tr><tr><td class="eqn">1st: ln[A] = ln[A]0 - kt</td></tr>
          <tr><td class="eqn">2nd: 1/[A] = 1/[A]0 + kt</td></tr><tr><td class="eqn">1st order t1/2 = 0.693/k</td></tr></table></div>
        <div class="ref-unit"><h4>Acids and bases</h4><table>
          <tr><td class="eqn">pH = -log[H3O+], pOH = -log[OH-]</td></tr><tr><td class="eqn">pH + pOH = 14 (25 C)</td></tr>
          <tr><td class="eqn">Ka Kb = Kw</td></tr><tr><td class="eqn">pKa = -log Ka</td></tr>
          <tr><td class="eqn">pH = pKa + log([A-]/[HA])</td></tr></table></div>
        <div class="ref-unit"><h4>Strong acids and bases</h4><table>
          <tr><td>Acids: HCl, HBr, HI, HNO3, H2SO4, HClO4</td></tr><tr><td>Bases: Group 1 hydroxides (NaOH, KOH...), Ca(OH)2, Sr(OH)2, Ba(OH)2</td></tr></table></div>
        <div class="ref-unit"><h4>Always soluble</h4><table>
          <tr><td>Group 1 ions (Na+, K+, Li+...), NH4+, NO3-</td></tr></table>
          <h4>Common ions</h4><table>
          <tr><td class="eqn">NO3- nitrate, SO4 2- sulfate, CO3 2- carbonate</td></tr><tr><td class="eqn">PO4 3- phosphate, OH- hydroxide, NH4+ ammonium</td></tr>
          <tr><td class="eqn">CH3COO- acetate, HCO3- bicarbonate, MnO4- permanganate</td></tr></table></div>
      </div>`;
  };
})();
