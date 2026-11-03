/* Generated and fixed question sets for economics, government, psychology,
 * human geography and comparative government. Data marked "practice data"
 * is invented for practice; country facts are real. */
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

  // ======================= ECONOMICS =======================
  const SHIFTS = [
    { name: 'demand increases', lines: [{ from: [2.5, 9.5], to: [9.5, 2.5], label: 'D2', dash: true }], eq: [6, 6], p: 'increases', q: 'increases', cause: 'Consumers\' incomes rise (normal good)', wrongCause: ['The cost of raw materials rises', 'A better production technology is adopted', 'The price of a complement rises'] },
    { name: 'demand decreases', lines: [{ from: [0.5, 7.5], to: [7.5, 0.5], label: 'D2', dash: true }], eq: [4, 4], p: 'decreases', q: 'decreases', cause: 'The price of a substitute good falls', wrongCause: ['Consumers\' incomes rise (normal good)', 'The government gives producers a subsidy', 'Wages for workers fall'] },
    { name: 'supply increases', lines: [{ from: [3, 1], to: [9.5, 7.5], label: 'S2', dash: true }], eq: [6, 4], p: 'decreases', q: 'increases', cause: 'A new technology lowers production costs', wrongCause: ['A per-unit tax on producers', 'Consumers\' tastes shift toward the good', 'The price of inputs rises'] },
    { name: 'supply decreases', lines: [{ from: [1, 3], to: [7.5, 9.5], label: 'S2', dash: true }], eq: [4, 6], p: 'increases', q: 'decreases', cause: 'A drought destroys part of the harvest', wrongCause: ['Producers adopt better technology', 'Consumers\' incomes fall', 'The number of sellers increases'] },
  ];
  const SD_ONLY = { only: ['micro', 'macro'] };
  SW.dataset('mi2', 'supply and demand shift', () => {
    const sh = pick(SHIFTS);
    return {
      figure: F.diagram({ title: `Market for a good: ${sh.name === 'demand increases' || sh.name === 'demand decreases' ? 'demand' : 'supply'} shifts`, xLabel: 'Quantity', yLabel: 'Price', lines: [{ from: [1, 9], to: [9, 1], label: 'D1' }, { from: [1, 1], to: [9, 9], label: 'S1' }, ...sh.lines], points: [{ at: [5, 5], label: 'E1' }, { at: sh.eq, label: 'E2' }] }),
      qs: [
        Q('Compared with E1, at the new equilibrium E2 the price:', sh.p, ['increases', 'decreases', 'stays the same', 'cannot be determined'].filter(x => x !== sh.p), 'Read the price at E2 on the vertical axis.'),
        Q('At E2, the equilibrium quantity:', sh.q, ['increases', 'decreases', 'stays the same', 'cannot be determined'].filter(x => x !== sh.q), 'Read the quantity at E2 on the horizontal axis.'),
        Q('Which event could cause the shift shown?', sh.cause, sh.wrongCause, `The graph shows ${sh.name}.`),
      ],
    };
  });

  const ADAS = [
    { name: 'AD shifts left', lines: [{ from: [0.5, 7.5], to: [7.5, 0.5], label: 'AD2', dash: true }], eq: [4, 4], gap: 'A recessionary (negative output) gap', unemp: 'Above the natural rate', fiscal: 'Increase government spending or cut taxes', monetary: 'Buy government bonds to lower interest rates' },
    { name: 'AD shifts right', lines: [{ from: [2.5, 9.5], to: [9.5, 2.5], label: 'AD2', dash: true }], eq: [6, 6], gap: 'An inflationary (positive output) gap', unemp: 'Below the natural rate', fiscal: 'Decrease government spending or raise taxes', monetary: 'Sell government bonds to raise interest rates' },
    { name: 'SRAS shifts left', lines: [{ from: [1, 3], to: [7.5, 9.5], label: 'SRAS2', dash: true }], eq: [4, 6], gap: 'A recessionary gap with a higher price level (stagflation)', unemp: 'Above the natural rate', fiscal: 'Increase government spending or cut taxes', monetary: 'Buy government bonds to lower interest rates' },
  ];
  SW.dataset('ma5', 'AD-AS graph', () => {
    const c = pick(ADAS);
    return {
      figure: F.diagram({ title: `Aggregate demand and supply: ${c.name}`, xLabel: 'Real GDP', yLabel: 'Price level', lines: [{ from: [1, 9], to: [9, 1], label: 'AD1' }, { from: [1, 1], to: [9, 9], label: 'SRAS1' }, { from: [5, 0.3], to: [5, 9.7], label: 'LRAS' }, ...c.lines], points: [{ at: c.eq, label: 'E2' }] }),
      qs: [
        Q('At the new short-run equilibrium E2, the economy has:', c.gap, ADAS.map(x => x.gap).filter(x => x !== c.gap).concat(['No output gap']), 'Compare E2 with the vertical LRAS at full-employment output.'),
        Q('At E2, unemployment is:', c.unemp, ['Above the natural rate', 'Below the natural rate', 'Equal to the natural rate', 'Zero'].filter(x => x !== c.unemp), 'Output below full employment means cyclical unemployment.'),
        Q('Which fiscal policy would move output back toward full employment?', c.fiscal, ['Increase government spending or cut taxes', 'Decrease government spending or raise taxes', 'Raise the reserve requirement', 'Do nothing; fiscal policy has no effect'].filter(x => x !== c.fiscal), 'Close a recessionary gap by raising AD; close an inflationary gap by lowering it.'),
        Q('Which open-market operation would the central bank use?', c.monetary, ['Buy government bonds to lower interest rates', 'Sell government bonds to raise interest rates', 'Print more coins', 'Raise taxes'].filter(x => x !== c.monetary), 'Buying bonds adds reserves and lowers rates (expansionary).'),
      ],
    };
  });

  SW.dataset('ma4', 'money market graph', () => {
    const buy = Math.random() < 0.5;
    return {
      figure: F.diagram({ title: 'The money market', xLabel: 'Quantity of money', yLabel: 'Nominal interest rate', lines: [{ from: [1, 9], to: [9, 1], label: 'MD' }, { from: [5, 0.3], to: [5, 9.7], label: 'MS1' }, { from: [buy ? 6.5 : 3.5, 0.3], to: [buy ? 6.5 : 3.5, 9.7], label: 'MS2', dash: true }], points: [{ at: [5, 5], label: 'r1' }, { at: [buy ? 6.5 : 3.5, buy ? 3.5 : 6.5], label: 'r2' }] }),
      qs: [
        Q('Which open-market operation causes the shift from MS1 to MS2?', buy ? 'The central bank buys government bonds' : 'The central bank sells government bonds', [buy ? 'The central bank sells government bonds' : 'The central bank buys government bonds', 'The government raises taxes', 'Consumers save more'], 'Buying bonds adds money; selling bonds removes it.'),
        Q('The nominal interest rate:', buy ? 'falls' : 'rises', ['falls', 'rises', 'stays the same', 'becomes zero'].filter(x => x !== (buy ? 'falls' : 'rises')), 'Moving along money demand to the new vertical supply line.'),
        Q('As a result, investment spending will most likely:', buy ? 'increase' : 'decrease', ['increase', 'decrease', 'stay the same', 'stop entirely'].filter(x => x !== (buy ? 'increase' : 'decrease')), 'Lower interest rates make borrowing for investment cheaper.'),
      ],
    };
  }, SD_ONLY.only.slice(1));

  SW.dataset('mi3', 'cost table and profit maximization', () => {
    const P = R(20, 40, 2), fc = R(20, 60, 5), mc = [0, R(8, 12, 1)];
    for (let i = 2; i <= 6; i++) mc.push(mc[i - 1] + R(3, 9, 1));
    const tc = [fc]; for (let i = 1; i <= 6; i++) tc.push(tc[i - 1] + mc[i]);
    let q = 0; for (let i = 1; i <= 6; i++) if (mc[i] <= P) q = i;
    const profit = P * q - tc[q];
    return {
      figure: F.table({ title: `A perfectly competitive firm; market price = $${P} (practice data)`, head: ['Quantity', 'Total cost ($)', 'Marginal cost ($)'], rows: tc.map((t, i) => [i, t, i ? mc[i] : '-']) }),
      qs: [
        Q('What is the firm\'s fixed cost?', `$${fc}`, [`$${tc[1]}`, `$${mc[1]}`, `$${tc[6]}`, '$0'], 'Fixed cost is total cost at zero output.'),
        Q('What quantity maximizes profit?', String(q), [1, 2, 3, 4, 5, 6].filter(x => x !== q).sort((x, y) => Math.abs(x - q) - Math.abs(y - q)), 'Produce every unit where P >= MC (MR = MC rule).'),
        Q('What is the firm\'s profit at that quantity?', `$${profit}`, [`$${P * q}`, `$${profit + fc}`, `$${-fc}`, `$${profit - 10}`, `$${profit + 10}`, `$${profit + 20}`], `TR - TC = ${P}(${q}) - ${tc[q]}.`),
      ],
    };
  });

  SW.dataset('mi2', 'market schedule and price ceiling', () => {
    const prices = [2, 4, 6, 8, 10], a = R(110, 140, 5), qd = prices.map(p => a - 8 * p), qs = prices.map(p => 10 * p + (a - 108));
    // supply is shifted so Qs = Qd exactly at $6
    const eq = 6, Qe = a - 8 * eq, ceil = 4, short = qd[1] - qs[1];
    return {
      figure: F.table({ title: 'Market schedule (practice data)', head: ['Price ($)', 'Quantity demanded', 'Quantity supplied'], rows: prices.map((p, i) => [p, qd[i], qs[i]]) }),
      qs: [
        Q('What is the equilibrium price?', '$6', ['$4', '$8', '$10', '$2'], 'Quantity demanded equals quantity supplied at $6.'),
        Q(`A price ceiling of $${ceil} is set. What happens?`, `A shortage of ${short} units`, [`A surplus of ${short} units`, 'No effect, because the ceiling is not binding', `A shortage of ${Qe} units`, `A shortage of ${qd[1]} units`], `At $4, Qd = ${qd[1]} and Qs = ${qs[1]}.`),
        Q('A binding price ceiling also creates:', 'Deadweight loss', ['A surplus', 'More producer surplus', 'Higher prices', 'Allocative efficiency'], 'Fewer units are traded than the efficient quantity.'),
      ],
    };
  });

  // ======================= US GOVERNMENT =======================
  SW.dataset('gv5', 'voter turnout by age', () => {
    const base = R(38, 48, 1);
    const bars = [['18-24', base], ['25-44', base + R(10, 16, 1)], ['45-64', base + R(20, 26, 1)], ['65+', base + R(26, 32, 1)]].map(([label, value]) => ({ label, value }));
    return {
      figure: F.bar({ title: 'Voter turnout by age group in a presidential election (practice data)', yLabel: 'Percent who voted', bars, yMax: 100 }),
      qs: [
        Q('Which age group had the highest turnout?', '65+', ['18-24', '25-44', '45-64'], 'The tallest bar.'),
        Q('Which describes the pattern shown?', 'Turnout increases with age', ['Turnout decreases with age', 'Turnout is the same for all ages', 'Only young people vote', 'Turnout peaks in the middle ages'], 'Each older group votes at a higher rate.'),
        Q('Which is a likely reason for the pattern?', 'Older citizens are more likely to be registered and to have a habit of voting', ['Young people are not allowed to vote', 'Older citizens are required to vote', 'Ballots are harder to read for young people', 'Primary elections are only for older voters'], 'Registration, residential stability and habit all rise with age.'),
      ],
    };
  });
  SW.sourceSet('gv1', 'federalist 51', { passage: 'James Madison, Federalist No. 51 (1788):\n"If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary. In framing a government which is to be administered by men over men, the great difficulty lies in this: you must first enable the government to control the governed; and in the next place oblige it to control itself."' }, [
    ['Madison\'s main argument in this excerpt is that:', ['Government must be strong enough to govern but also limited so it controls itself', 'Government is unnecessary', 'Only angels should hold office', 'The states should have all the power'], 0, 'He wants both power and limits on that power.'],
    ['Which feature of the Constitution best reflects the idea that government must "control itself"?', ['Checks and balances among the three branches', 'The Supremacy Clause', 'The Electoral College', 'The amendment process'], 0, 'Each branch can limit the others, which is Madison\'s "internal control."'],
    ['Which group would most likely have opposed the idea of a strong national government that Madison defends?', ['Anti-Federalists', 'Federalists', 'Loyalists', 'Whigs'], 0, 'Anti-Federalists, such as Brutus, feared a powerful central government.'],
  ]);

  // ======================= PSYCHOLOGY =======================
  SW.dataset('ps2', 'experiment results chart', () => {
    const c = R(10, 15, 1), t = c + R(2, 6, 1), p = pick(['0.01', '0.03', '0.20']);
    const sig = Number(p) < 0.05;
    return {
      figure: F.bar({ title: `Words recalled: music vs. silence (practice data; p = ${p})`, yLabel: 'Mean words recalled', bars: [{ label: 'Silence', value: c }, { label: 'Background music', value: t }].reverse(), yMax: 25 }),
      passage: 'Sixty students were randomly assigned to study a 30-word list either in silence or with background music. They were then tested on how many words they could recall.',
      qs: [
        Q('What is the independent variable?', 'Whether students studied with background music or in silence', ['Number of words recalled', 'The 30-word list', 'The students\' ages', 'The p-value'], 'It is the condition the researchers assigned.'),
        Q('What is the operational definition of the dependent variable?', 'Number of words correctly recalled on the test', ['How much students like music', 'Time spent studying', 'Whether music was played', 'The type of music'], 'How the outcome was actually measured.'),
        Q('Which conclusion is best supported?', sig ? 'Background music caused a statistically significant difference in recall' : 'The difference in recall could be due to chance', [sig ? 'The difference in recall could be due to chance' : 'Background music caused a statistically significant difference in recall', 'Music always improves memory for everyone', 'The study shows only a correlation because it is an experiment'], `p = ${p} is ${sig ? 'below' : 'above'} 0.05.`),
      ],
    };
  });
  SW.sourceSet('ps3', 'conditioning scenario', { passage: 'Every time Maya opens the cabinet where the dog treats are kept, the cabinet door squeaks. Her dog Biscuit now runs to the kitchen and drools whenever he hears the squeak, even when Maya is getting something else.' }, [
    ['In this scenario, the squeak of the cabinet is the:', ['Conditioned stimulus', 'Unconditioned stimulus', 'Unconditioned response', 'Neutral response'], 0, 'It was once neutral but now triggers drooling after being paired with treats.'],
    ['The dog\'s drooling to the treat itself (before any learning) is the:', ['Unconditioned response', 'Conditioned response', 'Conditioned stimulus', 'Reinforcer'], 0, 'Drooling to food is natural and unlearned.'],
    ['If Maya opens the squeaky cabinet many times without giving treats, the drooling will likely fade. This is:', ['Extinction', 'Spontaneous recovery', 'Generalization', 'Shaping'], 0, 'The CS no longer predicts the UCS, so the CR weakens.'],
  ]);

  // ======================= HUMAN GEOGRAPHY =======================
  SW.dataset('hg2', 'population pyramid table', () => {
    const young = Math.random() < 0.5;
    const rows = young
      ? [['0-14', R(38, 44, 1)], ['15-29', R(26, 30, 1)], ['30-44', R(14, 18, 1)], ['45-64', R(7, 10, 1)], ['65+', R(2, 4, 1)]]
      : [['0-14', R(12, 15, 1)], ['15-29', R(15, 18, 1)], ['30-44', R(18, 21, 1)], ['45-64', R(26, 30, 1)], ['65+', R(20, 24, 1)]];
    const tot = rows.reduce((s, r) => s + r[1], 0);
    rows[2][1] += 100 - tot; // make the column total exactly 100
    const dep = r3(((rows[0][1] + rows[4][1]) / (rows[1][1] + rows[2][1] + rows[3][1])) * 100);
    return {
      figure: F.bar({ title: 'Population by age group, percent (practice data)', yLabel: 'Percent of population', bars: rows.map(([label, value]) => ({ label, value })) }),
      qs: [
        Q('This age structure most likely belongs to a country in which stage of the demographic transition model?', young ? 'Stage 2' : 'Stage 4 or 5', young ? ['Stage 4 or 5', 'Stage 1', 'Stage 3 with zero growth'] : ['Stage 2', 'Stage 1', 'Stage 3 with rapid growth'], young ? 'A wide young base means high birth rates and falling death rates.' : 'A narrow base and many older people mean low birth rates.'),
        Q('What is the dependency ratio? (ages 0-14 and 65+ per 100 people aged 15-64)', g(dep), [g(r3(dep / 2)), g(rows[0][1] + rows[4][1]), g(r3(dep + 20)), '100'], `(${rows[0][1]} + ${rows[4][1]})/(${rows[1][1]} + ${rows[2][1]} + ${rows[3][1]}) x 100.`),
        Q('Which policy would a government with this population most likely adopt?', young ? 'Antinatalist policies such as family planning programs' : 'Pronatalist policies such as paid parental leave and child allowances', young ? ['Pronatalist policies such as paid parental leave and child allowances', 'Raising the retirement age to support pensions', 'Banning immigration'] : ['Antinatalist policies such as family planning programs', 'Limiting families to one child', 'Closing schools due to too many children'], young ? 'Fast growth strains schools and jobs.' : 'Too few young workers will support many retirees.'),
      ],
    };
  });

  // ======================= COMPARATIVE GOVERNMENT =======================
  SW.sourceSet('cg2', 'course country comparison table', { figure: F.table({ title: 'The six AP Comparative Government course countries', head: ['Country', 'System', 'National legislature', 'Lower house elections'], rows: [['United Kingdom', 'Parliamentary', 'Bicameral (Commons, Lords)', 'Single-member districts (FPTP)'], ['Mexico', 'Presidential, federal', 'Bicameral', 'Mixed: districts + proportional'], ['Nigeria', 'Presidential, federal', 'Bicameral', 'Single-member districts (FPTP)'], ['Russia', 'Semi-presidential, federal', 'Bicameral (Duma, Federation Council)', 'Mixed: districts + proportional'], ['China', 'One-party communist state', 'Unicameral (National People\'s Congress)', 'Indirect elections'], ['Iran', 'Theocratic republic', 'Unicameral (Majles)', 'Direct; candidates vetted by Guardian Council']] }) }, [
    ['According to the table, which country has a unicameral legislature AND an unelected body that screens candidates?', ['Iran', 'China', 'United Kingdom', 'Mexico'], 0, 'The Guardian Council vets candidates for the Majles.'],
    ['Which pair of countries uses a mixed electoral system for the lower house?', ['Mexico and Russia', 'UK and Nigeria', 'China and Iran', 'UK and Mexico'], 0, 'Both combine single-member districts with proportional seats.'],
    ['Based on Duverger\'s law, which countries in the table would most likely have two dominant parties in the lower house?', ['The UK and Nigeria', 'China and Iran', 'Mexico and Russia', 'Russia and Iran'], 0, 'Single-member plurality (FPTP) systems tend to produce two large parties.'],
  ]);
})();
