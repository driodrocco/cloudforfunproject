/* More data-based question sets for Biology, Chemistry, Environmental Science and
 * Economics, where the real multiple-choice section is mostly built on data and graphs. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, g, R, pick } = SW;
  const F = SW.fig;
  function opts(right, cands) {
    const out = [String(right)];
    for (const c of cands) { const s = String(c); if (!out.includes(s)) out.push(s); if (out.length === 4) break; }
    return out;
  }
  const Q = (q, right, wrongs, why) => [q, opts(right, wrongs), 0, why];

  // ======================= BIOLOGY =======================
  SW.dataset('bio7', 'hardy-weinberg data', () => {
    const q = pick([0.2, 0.3, 0.4, 0.5, 0.6]), p = r3(1 - q), N = pick([400, 500, 800, 1000]);
    const rec = Math.round(N * q * q), het = r3(2 * p * q);
    return {
      figure: F.table({ title: 'Flower color in a population in Hardy-Weinberg equilibrium (practice data); white (aa) is recessive', head: ['Phenotype', 'Number of plants'], rows: [['Purple (AA or Aa)', N - rec], ['White (aa)', rec]] }),
      qs: [
        Q('What is the frequency of the recessive allele (q)?', g(q), [g(r3(q * q)), g(p), g(r3(rec / N / 2)), g(r3(1 - q * q))], `q^2 = ${rec}/${N} = ${g(r3(q * q))}, so q = ${g(q)}.`),
        Q('What fraction of the population is expected to be heterozygous (Aa)?', g(het), [g(r3(p * p)), g(r3(q * q)), g(r3(p * q)), g(r3(1 - het)), g(r3(het / 2)), g(r3(Math.min(0.99, het + 0.1))), g(r3(Math.max(0.01, het - 0.15)))], `2pq = 2(${g(p)})(${g(q)}) = ${g(het)}.`),
        Q('Which condition is required for Hardy-Weinberg equilibrium?', 'No natural selection', ['Small population size', 'Frequent mutations', 'Migration between populations', 'Nonrandom mating'], 'Also: large population, random mating, no mutation, no gene flow.'),
      ],
    };
  });
  SW.dataset('bio5', 'chi-square test of a cross', () => {
    const N = R(50, 100, 1) * 4, d = R(2, 14, 1), ed = 0.75 * N, er = 0.25 * N;
    const od = ed + d, or = er - d, chi = Math.round((d * d / ed + d * d / er) * 100) / 100;
    const sig = chi > 3.84;
    return {
      figure: F.table({ title: `Offspring of an Aa x Aa cross (practice data); expected ratio 3 dominant : 1 recessive`, head: ['Phenotype', 'Observed'], rows: [['Dominant', od], ['Recessive', or]], note: 'Critical value for df = 1 at p = 0.05: 3.84' }),
      qs: [
        Q('What is the expected number of recessive offspring?', String(er), [String(or), String(ed), String(N / 2), String(er + d)], `0.25 x ${N} = ${er}.`),
        Q('What is the chi-square value?', chi.toFixed(2), [(chi * 2).toFixed(2), (d * d / ed).toFixed(2), (d * d / er).toFixed(2), (chi + 3.84).toFixed(2)], `(${od} - ${ed})^2/${ed} + (${or} - ${er})^2/${er} = ${chi.toFixed(2)}.`),
        Q('What should you conclude?', sig ? 'Reject the null hypothesis: the data do not fit a 3:1 ratio' : 'Fail to reject the null hypothesis: the data fit a 3:1 ratio', [sig ? 'Fail to reject the null hypothesis: the data fit a 3:1 ratio' : 'Reject the null hypothesis: the data do not fit a 3:1 ratio', 'The test proves the genes are linked', 'There are 2 degrees of freedom, so no conclusion is possible'], `${chi.toFixed(2)} is ${sig ? 'greater' : 'less'} than 3.84.`),
      ],
    };
  });

  // ======================= CHEMISTRY =======================
  SW.dataset('chem3', "beer's law calibration", () => {
    const k = R(1.6, 2.6, 0.1), conc = [0.1, 0.2, 0.3, 0.4, 0.5];
    const pts = conc.map(c => [c, r3(k * c)]);
    const Au = r3(k * R(0.15, 0.45, 0.01)), cu = r3(Au / k);
    return {
      figure: F.line({ title: 'Absorbance vs. concentration of CuSO4 at 635 nm (practice data)', xLabel: 'Concentration (M)', yLabel: 'Absorbance', series: [{ name: 'standards', pts: [[0, 0], ...pts] }] }),
      qs: [
        Q('What relationship does the graph show?', 'Absorbance is directly proportional to concentration', ['Absorbance is inversely proportional to concentration', 'Absorbance does not depend on concentration', 'Absorbance decreases exponentially', 'Absorbance depends only on wavelength'], "Beer's law: A = (molar absorptivity)(path length)(concentration)."),
        Q(`An unknown solution has an absorbance of ${g(Au)}. What is its concentration?`, `${g(cu)} M`, [`${g(r3(Au * k))} M`, `${g(r3(cu * 2))} M`, `${g(r3(cu / 2))} M`, `${g(Au)} M`], `Slope = ${g(k)} per M, so c = ${g(Au)} / ${g(k)} = ${g(cu)} M.`),
        Q('If the same solutions were measured in a cuvette with twice the path length, the absorbances would:', 'Double', ['Halve', 'Stay the same', 'Become zero', 'Increase four times'], 'A is proportional to path length.'),
      ],
    };
  }, ['chem']);

  // ======================= ENVIRONMENTAL SCIENCE =======================
  SW.dataset('es2', 'species diversity table', () => {
    const n = R(20, 30, 1), sp = ['Oak', 'Maple', 'Hickory', 'Beech'];
    const dom = 4 * n - 3 * R(2, 5, 1), rest = (4 * n - dom) / 3;
    return {
      figure: F.table({ title: 'Trees counted in two forest plots (practice data)', head: ['Species', 'Plot A', 'Plot B'], rows: sp.map((s, i) => [s, n, i === 0 ? dom : rest]) }),
      qs: [
        Q('How does species richness compare between the plots?', 'It is the same (4 species in each)', ['Plot A has more species', 'Plot B has more species', 'Plot B has no species', 'Richness cannot be compared'], 'Richness counts the number of species.'),
        Q('Which plot has higher species diversity, and why?', 'Plot A, because its species are more evenly distributed', ['Plot B, because it has more oak trees', 'Plot B, because it has more trees', 'They are equal because richness is equal', 'Plot A, because it has fewer trees'], 'Evenness is part of diversity.'),
        Q('If a disease killed most oaks, which plot would likely be affected more?', 'Plot B', ['Plot A', 'Neither', 'Both equally'], `Plot B depends on oaks (${dom} of ${4 * n} trees).`),
      ],
    };
  });

  // ======================= ECONOMICS =======================
  SW.sourceSet('ma5', 'phillips curve graph', { figure: F.diagram({ title: 'Phillips curves', xLabel: 'Unemployment rate', yLabel: 'Inflation rate', guides: false, lines: [{ from: [1.5, 9], to: [9, 1.5], label: 'SRPC' }, { from: [5, 0.3], to: [5, 9.7], label: 'LRPC' }], points: [{ at: [5, 5.5], label: 'A' }, { at: [3.5, 7], label: 'B' }] }), passage: 'The economy starts at point A, at the natural rate of unemployment.' }, [
    ['An increase in aggregate demand would move the economy from A toward:', ['Point B: lower unemployment and higher inflation', 'Higher unemployment and lower inflation along the LRPC', 'A rightward shift of the LRPC', 'No change'], 0, 'Movement along the SRPC.'],
    ['The vertical LRPC shows that in the long run:', ['Unemployment returns to the natural rate whatever the inflation rate', 'Inflation is always zero', 'There is a permanent tradeoff between inflation and unemployment', 'Unemployment is zero'], 0, 'The LRPC sits at the natural rate.'],
    ['A negative supply shock (such as an oil price spike) would:', ['Shift the SRPC to the right (up)', 'Shift the SRPC to the left (down)', 'Shift the LRPC to the left', 'Move the economy to point B'], 0, 'Stagflation: higher inflation and higher unemployment.'],
  ], ['macro']);
  SW.dataset('mi4', 'monopoly revenue table', () => {
    const a = R(24, 34, 2), mc = R(6, 10, 2);
    const rows = [1, 2, 3, 4, 5, 6].map(q => { const p = a - 2 * q; return [q, p, p * q]; });
    rows.forEach((r, i) => r.push(i ? r[2] - rows[i - 1][2] : r[2]));
    let best = 0; rows.forEach((r, i) => { if (r[3] >= mc) best = i; });
    const [q, p] = rows[best];
    return {
      figure: F.table({ title: `A single-price monopolist; marginal cost = $${mc} at every quantity (practice data)`, head: ['Quantity', 'Price ($)', 'Total revenue ($)', 'Marginal revenue ($)'], rows }),
      qs: [
        Q('What quantity maximizes profit?', String(q), [1, 2, 3, 4, 5, 6].filter(x => x !== q).sort((x, y) => Math.abs(x - q) - Math.abs(y - q)).map(String), 'Produce while MR >= MC.'),
        Q('What price does the monopolist charge?', `$${p}`, [`$${mc}`, `$${rows[best][3]}`, `$${p + 2}`, `$${p - 2}`, `$${a}`], 'Read the price from the demand (price) column at that quantity.'),
        Q('At this output, the monopoly is:', 'Not allocatively efficient, because price is greater than marginal cost', ['Allocatively efficient, because P = MC', 'Productively efficient, because it produces at minimum ATC', 'Earning zero economic profit in the long run', 'A price taker'], `P = $${p} > MC = $${mc}.`),
      ],
    };
  });
  SW.dataset('ma4', 'reserve requirement table', () => {
    const rr = pick([0.05, 0.1, 0.2, 0.25]), dep = R(10, 50, 5) * 1000, req = Math.round(dep * rr), ex = dep - req;
    const mult = Math.round(1 / rr), maxM = ex * mult;
    return {
      figure: F.table({ title: `A bank's balance sheet after a new $${dep.toLocaleString('en-US')} cash deposit; reserve requirement ${rr * 100}% (practice data)`, head: ['Assets', '', 'Liabilities', ''], rows: [['Required reserves', `$${req.toLocaleString('en-US')}`, 'Demand deposits', `$${dep.toLocaleString('en-US')}`], ['Excess reserves', `$${ex.toLocaleString('en-US')}`, '', '']] }),
      qs: [
        Q('What is the money multiplier?', g(mult), [g(rr), g(r3(mult / 2)), g(r3(mult + 1)), g(r3(1 - rr))], `1 / ${rr} = ${g(mult)}.`),
        Q('What is the maximum amount of new loans this bank alone can make?', `$${ex.toLocaleString('en-US')}`, [`$${dep.toLocaleString('en-US')}`, `$${maxM.toLocaleString('en-US')}`, `$${req.toLocaleString('en-US')}`, '$0'], 'A single bank can lend its excess reserves.'),
        Q('What is the maximum change in the money supply from the new loans in the whole banking system?', `$${maxM.toLocaleString('en-US')}`, [`$${ex.toLocaleString('en-US')}`, `$${dep.toLocaleString('en-US')}`, `$${(maxM + dep).toLocaleString('en-US')}`, `$${req.toLocaleString('en-US')}`], `Excess reserves x multiplier = ${ex.toLocaleString('en-US')} x ${g(mult)}.`),
      ],
    };
  });
})();
