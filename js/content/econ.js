/* AP Macroeconomics and AP Microeconomics: calculations, concept
 * questions, free response (described graphs), reference sheets. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, sg, R, pick, W, add } = SW;
  const FORMAT = '60 multiple-choice questions (70 min, 66%) + 3 free-response questions: 1 long, 2 short (60 min, 33%)';

  SW.defineCourse('macro', {
    name: 'AP Macroeconomics', short: 'Macro', subject: 'History and Social Sciences',
    units: [
      ['ma1', 1, 'Basic Economic Concepts', '5-10%'],
      ['ma2', 2, 'Economic Indicators and the Business Cycle', '12-17%'],
      ['ma3', 3, 'National Income and Price Determination', '17-27%'],
      ['ma4', 4, 'Financial Sector', '18-23%'],
      ['ma5', 5, 'Long-Run Consequences of Stabilization Policies', '20-30%'],
      ['ma6', 6, 'Open Economy: International Trade and Finance', '10-13%'],
    ],
    format: FORMAT,
    dist: { year: 2025, 5: 20.4, 4: 22.9, 3: 24.0 },
    past: 'https://apcentral.collegeboard.org/courses/ap-macroeconomics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/economics-finance-domain/ap-macroeconomics',
  });
  SW.defineCourse('micro', {
    name: 'AP Microeconomics', short: 'Micro', subject: 'History and Social Sciences',
    units: [
      ['mi1', 1, 'Basic Economic Concepts', '12-15%'],
      ['mi2', 2, 'Supply and Demand', '20-25%'],
      ['mi3', 3, 'Production, Cost, and the Perfect Competition Model', '22-25%'],
      ['mi4', 4, 'Imperfect Competition', '15-22%'],
      ['mi5', 5, 'Factor Markets', '10-13%'],
      ['mi6', 6, 'Market Failure and the Role of Government', '8-13%'],
    ],
    format: FORMAT,
    dist: { year: 2025, 5: 21.5, 4: 24.0, 3: 22.6 },
    past: 'https://apcentral.collegeboard.org/courses/ap-microeconomics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/economics-finance-domain/ap-microeconomics',
  });

  // ================= Macro calculations =================
  add('ma2', 'GDP by the expenditure approach', () => {
    const C = R(500, 2000, 10), I = R(100, 600, 10), G = R(200, 800, 10), X = R(50, 400, 10), M = R(50, 450, 10), gdp = C + I + G + X - M;
    return W()
      .l('Expenditure approach', `C = ${C}, I = ${I}, G = ${G}, exports = ${X}, imports = ${M} (billions)`, '')
      .f('GDP = C + I + G + (X - M)')
      .l(`GDP = ${C} + ${I} + ${G} + (${X} - ${M})`, `GDP = ${gdp} billion`)
      .n('Imports are subtracted because they were produced in another country.')
      .done(`Consumption is $${C}B, investment $${I}B, government spending $${G}B, exports $${X}B and imports $${M}B. What is GDP?`, gdp, 'billion');
  });

  add('ma2', 'Unemployment rate', () => {
    const emp = R(100, 300, 1), un = R(5, 30, 1), rate = r3((100 * un) / (emp + un));
    return W()
      .l('Unemployment rate', `employed = ${emp} million`, `unemployed = ${un} million`, '')
      .f('rate = unemployed / labor force x 100; labor force = employed + unemployed')
      .l(`labor force = ${emp + un} million`, `rate = ${un}/${emp + un} x 100 = ${num(rate)}%`)
      .n('Discouraged workers who stopped looking are NOT in the labor force.')
      .done(`A country has ${emp} million employed and ${un} million unemployed. What is the unemployment rate?`, rate, '%');
  });

  add('ma2', 'Inflation rate from CPI', () => {
    const c1 = R(100, 280, 0.5), c2 = r3(c1 * R(0.98, 1.1, 0.005)), inf = r3(((c2 - c1) / c1) * 100);
    return W()
      .l('Inflation', `CPI last year = ${g(c1)}`, `CPI this year = ${g(c2)}`, '')
      .f('inflation rate = (new CPI - old CPI)/old CPI x 100')
      .l(`= (${g(c2)} - ${g(c1)})/${g(c1)} x 100`, `= ${num(inf)}%`)
      .done(`The CPI rises from ${g(c1)} to ${g(c2)}. What is the inflation rate?`, inf, '%', true);
  });

  add('ma2', 'Real GDP from nominal GDP', () => {
    const nom = R(1000, 30000, 100), defl = R(90, 140, 1), real = r3((nom / defl) * 100);
    return W()
      .l('Real GDP', `nominal GDP = ${nom}`, `GDP deflator = ${defl}`, '')
      .f('real GDP = nominal GDP / deflator x 100')
      .l(`real GDP = ${nom}/${defl} x 100`, `real GDP = ${num(real)}`)
      .done(`Nominal GDP is $${nom} billion and the GDP deflator is ${defl}. What is real GDP (in billions)?`, real, 'billion');
  });

  add('ma3', 'Spending multiplier', () => {
    const mpc = pick([0.5, 0.6, 0.75, 0.8, 0.9]), dG = R(10, 200, 10), m = r3(1 / (1 - mpc)), dY = r3(m * dG);
    return W()
      .l('Spending multiplier', `MPC = ${mpc}`, `change in government spending = +${dG} billion`, '')
      .f('multiplier = 1/MPS = 1/(1 - MPC); change in real GDP = multiplier x change in spending')
      .l(`MPS = 1 - ${mpc} = ${g(r3(1 - mpc))}`, `multiplier = 1/${g(r3(1 - mpc))} = ${num(m)}`, `change in GDP = ${num(m)} x ${dG} = ${num(dY)} billion`)
      .done(`The MPC is ${mpc}. If government spending rises by $${dG} billion, what is the maximum change in real GDP?`, dY, 'billion');
  });

  add('ma3', 'Tax multiplier', () => {
    const mpc = pick([0.5, 0.6, 0.75, 0.8, 0.9]), dT = R(10, 200, 10), m = r3(-mpc / (1 - mpc)), dY = r3(m * dT);
    return W()
      .l('Tax multiplier', `MPC = ${mpc}`, `tax increase = ${dT} billion`, '')
      .f('tax multiplier = -MPC/MPS')
      .l(`tax multiplier = -${mpc}/${g(r3(1 - mpc))} = ${num(m)}`, `change in GDP = ${num(m)} x ${dT} = ${sg(dY)} billion`)
      .n('The tax multiplier is always one smaller (in size) than the spending multiplier.')
      .done(`The MPC is ${mpc}. If taxes are raised by $${dT} billion, what is the maximum change in real GDP?`, dY, 'billion', true);
  });

  add('ma4', 'Money multiplier', () => {
    const rr = pick([0.05, 0.1, 0.125, 0.2, 0.25]), dep = R(100, 5000, 100), excess = dep * (1 - rr), m = r3(1 / rr), dM = r3(excess * m);
    return W()
      .l('Money creation', `reserve requirement = ${g(rr * 100)}%`, `new deposit = $${dep}`, '')
      .f('money multiplier = 1/reserve requirement; max new loans = excess reserves x multiplier')
      .l(`required reserves = ${g(rr)} x ${dep} = ${g(r3(rr * dep))}`, `excess reserves = ${g(excess)}`, `multiplier = 1/${g(rr)} = ${num(m)}`, `max money created by loans = ${g(excess)} x ${num(m)} = ${num(dM)}`)
      .done(`A $${dep} cash deposit is made into a bank. The reserve requirement is ${g(rr * 100)}%. What is the maximum increase in loans (new money) in the banking system?`, dM, 'dollars');
  });

  add('ma4', 'Real interest rate', () => {
    const n = R(1, 12, 0.5), inf = R(0, 8, 0.5), real = r3(n - inf);
    return W()
      .l('Real interest rate', `nominal rate = ${g(n)}%`, `inflation = ${g(inf)}%`, '')
      .f('real interest rate = nominal rate - inflation rate')
      .l(`real = ${g(n)} - ${g(inf)} = ${g(real)}%`)
      .done(`A loan has a nominal interest rate of ${g(n)}% and inflation is ${g(inf)}%. What is the real interest rate?`, real, '%', true);
  });

  add('ma6', 'Comparative advantage (opportunity cost)', () => {
    const a = R(2, 20, 1), b = R(2, 20, 1), oc = r3(b / a);
    return W()
      .l('Opportunity cost', `A worker in Country X can make ${a} shirts or ${b} bushels of wheat per day`, '')
      .f('opportunity cost of 1 shirt = wheat given up / shirts gained')
      .l(`1 shirt costs ${b}/${a} = ${num(oc)} bushels of wheat`)
      .n('The country with the LOWER opportunity cost has the comparative advantage.')
      .done(`A worker in Country X can produce either ${a} shirts or ${b} bushels of wheat in a day. What is the opportunity cost of one shirt, in bushels of wheat?`, oc, 'bushels');
  });

  // ================= Micro calculations =================
  add('mi2', 'Price elasticity of demand (midpoint)', () => {
    const p1 = R(2, 20, 1), p2 = p1 + R(1, 6, 1), q1 = R(50, 200, 5), q2 = q1 - R(5, 40, 5);
    const pq = (q2 - q1) / ((q1 + q2) / 2), pp = (p2 - p1) / ((p1 + p2) / 2), e = r3(Math.abs(pq / pp));
    return W()
      .l('Price elasticity of demand', `price ${p1} -> ${p2}`, `quantity ${q1} -> ${q2}`, '')
      .f('E = |% change in quantity / % change in price|, using midpoints')
      .l(`% change Q = (${q2} - ${q1})/${g((q1 + q2) / 2)} = ${num(r3(pq * 100))}%`, `% change P = (${p2} - ${p1})/${g((p1 + p2) / 2)} = ${num(r3(pp * 100))}%`, `E = ${num(e)}`, e > 1 ? 'Elastic (E > 1)' : e < 1 ? 'Inelastic (E < 1)' : 'Unit elastic')
      .done(`When the price rises from $${p1} to $${p2}, quantity demanded falls from ${q1} to ${q2}. Using the midpoint method, what is the price elasticity of demand?`, e, '');
  });

  add('mi3', 'Profit of a firm', () => {
    const P = R(10, 50, 1), atc = r3(P * R(0.6, 1.3, 0.05)), Q = R(10, 200, 5), profit = r3((P - atc) * Q);
    return W()
      .l('Profit', `P = $${P}`, `ATC = $${g(atc)}`, `Q = ${Q}`, '')
      .f('profit = (P - ATC) x Q')
      .l(`profit = (${P} - ${g(atc)}) x ${Q}`, `profit = $${num(profit)}`, profit < 0 ? 'Negative: the firm has an economic loss' : 'Positive: economic profit')
      .done(`A firm sells ${Q} units at $${P} each. Average total cost is $${g(atc)}. What is its economic profit?`, profit, 'dollars', true);
  });

  add('mi2', 'Consumer surplus', () => {
    const a = R(20, 100, 5), P = R(5, a - 5, 1), Q = R(10, 200, 10), cs = r3(0.5 * (a - P) * Q);
    return W()
      .l('Consumer surplus', `demand meets the price axis at $${a}`, `market price $${P}, quantity ${Q}`, '')
      .f('CS = (1/2)(base)(height) = (1/2)(Q)(max price - P)')
      .l(`CS = (1/2)(${Q})(${a} - ${P})`, `CS = $${num(cs)}`)
      .done(`A linear demand curve hits the price axis at $${a}. At the market price of $${P}, ${Q} units are bought. What is consumer surplus?`, cs, 'dollars');
  });

  add('mi6', 'Tax revenue and deadweight loss', () => {
    const t = R(1, 10, 1), Q0 = R(50, 200, 10), Q1 = Q0 - R(5, 40, 5), rev = t * Q1, dwl = r3(0.5 * t * (Q0 - Q1));
    return W()
      .l('Per-unit tax', `tax = $${t} per unit`, `quantity falls from ${Q0} to ${Q1}`, '')
      .f('tax revenue = tax x new quantity; DWL = (1/2)(tax)(drop in quantity)')
      .l(`revenue = ${t} x ${Q1} = $${rev}`, `DWL = (1/2)(${t})(${Q0} - ${Q1}) = $${num(dwl)}`)
      .done(`A $${t} per-unit tax lowers the quantity sold from ${Q0} to ${Q1}. What is the deadweight loss?`, dwl, 'dollars');
  });

  add('mi5', 'Marginal revenue product of labor', () => {
    const mp = R(2, 20, 1), P = R(2, 30, 1), mrp = mp * P;
    return W()
      .l('Factor markets', `MP of the next worker = ${mp} units`, `product price = $${P}`, '')
      .f('MRP = MP x P (in a perfectly competitive product market)')
      .l(`MRP = ${mp} x ${P} = $${mrp}`, 'Hire the worker if MRP >= wage')
      .done(`The next worker adds ${mp} units of output, which sells for $${P} each. What is that worker's marginal revenue product?`, mrp, 'dollars');
  });

  add('mi1', 'Marginal utility per dollar', () => {
    const mu = R(10, 120, 2), p = R(1, 12, 1), ans = r3(mu / p);
    return W()
      .l('Utility maximization', `MU = ${mu} utils`, `price = $${p}`, '')
      .f('MU per dollar = MU / P; buy more of the good with the higher MU per dollar')
      .l(`MU/P = ${mu}/${p} = ${num(ans)} utils per dollar`)
      .done(`The next slice of pizza gives ${mu} utils and costs $${p}. What is its marginal utility per dollar?`, ans, 'utils/$');
  });

  add('mi3', 'Marginal cost from total cost', () => {
    const fc = R(20, 100, 5), costs = [fc]; for (let i = 1; i <= 5; i++) costs.push(costs[i - 1] + R(5, 30, 1));
    const q = R(1, 5, 1), mc = costs[q] - costs[q - 1];
    return W()
      .l('Marginal cost', `TC for Q = 0..5: ${costs.join(', ')}`, '')
      .f('MC = change in TC / change in Q')
      .l(`MC of unit ${q} = ${costs[q]} - ${costs[q - 1]} = ${mc}`, `(fixed cost = TC at Q = 0 = ${fc})`)
      .done(`Total cost for 0 to 5 units is ${costs.join(', ')}. What is the marginal cost of unit ${q}?`, mc, 'dollars');
  });

  // ================= concept questions =================
  SW.mcqs('ma1', [
    ['ppc', 'A point inside a production possibilities curve shows:', ['Efficient use of resources', 'Unemployment or inefficiency', 'Economic growth', 'An impossible combination'], 1, 'Resources are not being fully used.'],
    ['opportunity cost', 'Opportunity cost is:', ['The money price of a good', 'The value of the next best alternative given up', 'All alternatives given up', 'Sunk cost'], 1, 'Only the next best option counts.'],
  ]);
  SW.mcqs('ma2', [
    ['types of unemployment', 'A coal miner who loses her job because power plants switch to solar is:', ['Frictionally unemployed', 'Structurally unemployed', 'Cyclically unemployed', 'Not in the labor force'], 1, 'Her skills no longer match what employers want.'],
    ['gdp exclusions', 'Which is NOT counted in GDP?', ['A new car made in the US', 'A used car sold this year', 'A government road project', 'Exports of wheat'], 1, 'Used goods were counted when they were first produced.'],
    ['natural rate', 'The natural rate of unemployment includes:', ['Cyclical unemployment only', 'Frictional and structural unemployment', 'All unemployment', 'Discouraged workers'], 1, 'It is the rate when the economy is at full employment.'],
  ]);
  SW.mcqs('ma3', [
    ['ad shift', 'Which shifts aggregate demand to the right?', ['Higher taxes', 'An increase in government spending', 'Higher interest rates', 'A fall in consumer confidence'], 1, 'G is a component of AD.'],
    ['sras shift', 'An increase in oil prices most likely:', ['Shifts SRAS left, causing stagflation', 'Shifts AD right', 'Shifts LRAS right', 'Has no effect'], 0, 'Higher input costs reduce SRAS: higher prices and lower output.'],
    ['recessionary gap', 'In a recessionary gap:', ['Output is above full employment', 'Output is below full employment and unemployment is above natural', 'Inflation is very high', 'LRAS shifts left'], 1, 'Real GDP is less than potential.'],
  ]);
  SW.mcqs('ma4', [
    ['open market operations', 'To increase the money supply, the central bank:', ['Sells government bonds', 'Buys government bonds', 'Raises the reserve requirement', 'Raises the discount rate'], 1, 'Buying bonds puts reserves into banks.'],
    ['money market', 'An increase in the money supply causes the nominal interest rate to:', ['Rise', 'Fall', 'Stay the same', 'Become negative'], 1, 'More money supply shifts MS right along the money demand curve.'],
    ['ample reserves', 'In an ample-reserves system, the Fed\'s main tool for changing the policy rate is:', ['Reserve requirements', 'Changing administered rates such as interest on reserves', 'Printing currency', 'Tax changes'], 1, 'Changing the interest on reserves moves the federal funds rate.'],
  ]);
  SW.mcqs('ma5', [
    ['phillips curve', 'The short-run Phillips curve shows:', ['A positive link between inflation and unemployment', 'A trade-off between inflation and unemployment', 'No relationship', 'The money supply'], 1, 'Moving along SRAS changes both in opposite directions.'],
    ['crowding out', 'Crowding out happens when government borrowing:', ['Lowers interest rates and raises investment', 'Raises interest rates and reduces private investment', 'Increases exports', 'Lowers the deficit'], 1, 'Higher demand for loanable funds raises the real interest rate.'],
    ['long run self correction', 'Without policy, a recessionary gap closes in the long run as:', ['Wages and input prices fall, shifting SRAS right', 'AD keeps falling', 'LRAS shifts left', 'Inflation rises'], 0, 'Flexible wages adjust down over time.'],
  ]);
  SW.mcqs('ma6', [
    ['currency appreciation', 'If the US dollar appreciates, US exports:', ['Become cheaper for foreigners and rise', 'Become more expensive for foreigners and fall', 'Are unaffected', 'Stop completely'], 1, 'Foreign buyers need more of their currency to buy dollars.'],
    ['current account', 'The current account mainly records:', ['Purchases of foreign assets', 'Trade in goods and services', 'Central bank reserves only', 'Government budgets'], 1, 'Net exports, plus income and transfers.'],
  ]);
  SW.mcqs('mi1', [
    ['diminishing marginal utility', 'Diminishing marginal utility means:', ['Total utility falls with each unit', 'Each extra unit adds less satisfaction than the one before', 'Utility is negative', 'Prices fall'], 1, 'The third slice of pizza is less exciting than the first.'],
    ['comparative advantage', 'Countries gain from trade when they specialize based on:', ['Absolute advantage', 'Comparative advantage', 'Larger population', 'Higher prices'], 1, 'Lower opportunity cost decides specialization.'],
  ]);
  SW.mcqs('mi2', [
    ['demand shift', 'A rise in the price of a substitute good causes demand for the original good to:', ['Decrease', 'Increase', 'Stay the same', 'Become perfectly elastic'], 1, 'People switch toward the now relatively cheaper good.'],
    ['price ceiling', 'A binding price ceiling causes:', ['A surplus', 'A shortage', 'Higher quality', 'More supply'], 1, 'Price is held below equilibrium, so Qd > Qs.'],
    ['elasticity revenue', 'If demand is elastic, a price increase causes total revenue to:', ['Rise', 'Fall', 'Stay the same', 'Double'], 1, 'The % drop in quantity is bigger than the % rise in price.'],
  ]);
  SW.mcqs('mi3', [
    ['profit maximization', 'Every firm maximizes profit where:', ['P = ATC', 'MR = MC', 'TR is largest', 'AVC is lowest'], 1, 'Produce until the last unit adds as much revenue as cost.'],
    ['shutdown rule', 'A firm should shut down in the short run when price falls below:', ['ATC', 'Minimum AVC', 'MC', 'AFC'], 1, 'Below AVC it cannot even cover variable costs.'],
    ['long run perfect competition', 'In long-run equilibrium, a perfectly competitive firm earns:', ['Positive economic profit', 'Zero economic profit', 'Losses', 'Monopoly profit'], 1, 'Entry and exit drive P to minimum ATC.'],
  ]);
  SW.mcqs('mi4', [
    ['monopoly', 'Compared with perfect competition, a monopoly produces:', ['More output at a lower price', 'Less output at a higher price', 'The same output', 'Output where P = MC'], 1, 'It sets MR = MC, where P > MC: deadweight loss.'],
    ['game theory dominant strategy', 'A dominant strategy is one that:', ['Gives the best result no matter what the other player does', 'Always leads to cooperation', 'Is chosen randomly', 'Minimizes the other player\'s payoff'], 0, 'Check each of the opponent\'s choices: if one option is always better, it is dominant.'],
    ['price discrimination', 'A perfectly price-discriminating monopolist:', ['Produces less than a single-price monopolist', 'Produces the efficient quantity, with no consumer surplus', 'Charges everyone the same price', 'Has deadweight loss'], 1, 'It charges each buyer their maximum willingness to pay.'],
  ]);
  SW.mcqs('mi5', [
    ['hiring rule', 'A firm in competitive markets hires workers until:', ['MRP = wage', 'MP is largest', 'TR is largest', 'MRP = 0'], 0, 'The last worker should add as much revenue as she costs.'],
    ['monopsony', 'Compared with a competitive labor market, a monopsony hires:', ['More workers at a higher wage', 'Fewer workers at a lower wage', 'The same number', 'Only skilled workers'], 1, 'MFC is above the supply curve.'],
  ]);
  SW.mcqs('mi6', [
    ['negative externality', 'A factory polluting a river creates:', ['A positive externality; the market underproduces', 'A negative externality; the market overproduces', 'A public good', 'A price floor'], 1, 'Marginal social cost is above private cost.'],
    ['public goods', 'A public good is:', ['Rival and excludable', 'Non-rival and non-excludable', 'Made by the government', 'Always free'], 1, 'National defense: one person\'s use does not reduce another\'s, and no one can be excluded.'],
    ['pigouvian tax', 'A per-unit tax equal to the external cost of pollution:', ['Increases overproduction', 'Moves the market to the socially efficient quantity', 'Creates a shortage', 'Has no effect'], 1, 'It makes producers pay the full social cost.'],
  ]);

  // ================= free response =================
  SW.frq('ma5', 'AD-AS: recession and policy (long)',
    'Assume the economy of Country Z is in a recession with high unemployment.\n(a) Describe a correctly labeled AD-AS graph showing the economy, with current output Y1 and full-employment output Yf. Which is larger?\n(b) Identify a fiscal policy action that could close the gap.\n(c) Show (describe) the effect of your policy on AD, real output and the price level.\n(d) Now assume instead the central bank acts. Identify an open-market operation that would close the gap, and explain its effect on the nominal interest rate.\n(e) Explain how the policy in (d) affects investment spending.',
    [[1, '(a) Correctly labeled graph: AD, SRAS, vertical LRAS; Y1 < Yf'], [1, '(b) Increase government spending or decrease taxes'], [2, '(c) AD shifts right; real output increases and price level increases'], [2, '(d) Buy government bonds; nominal interest rate decreases'], [1, '(e) Lower interest rates increase investment spending']],
    '(a) Price level on the vertical axis, real GDP on the horizontal. AD and SRAS cross at Y1 and PL1, to the left of the vertical LRAS at Yf. Y1 < Yf.\n(b) Increase government spending (or cut taxes).\n(c) AD shifts to the right, so real output rises toward Yf and the price level rises.\n(d) The central bank should buy government bonds on the open market. This increases bank reserves and the money supply, so the nominal interest rate falls.\n(e) A lower interest rate makes borrowing cheaper, so firms increase investment spending, which further raises AD.');
  SW.frq('mi3', 'Perfectly competitive firm (long)',
    'A perfectly competitive firm currently earns positive economic profit.\n(a) Describe correctly labeled side-by-side graphs of the market and the firm. Label the market price Pm, the firm\'s quantity Qf, and the area of economic profit.\n(b) Explain how the firm chooses its output.\n(c) Explain what happens in the long run to the number of firms, market supply, market price and the firm\'s profit.\n(d) In long-run equilibrium, is the firm allocatively efficient? Productively efficient? Explain.',
    [[1, '(a) Market graph with supply and demand setting Pm; firm faces horizontal demand = MR = P at Pm'], [1, '(a) Firm produces where MR = MC; profit area between P and ATC at Qf shaded'], [1, '(b) Produces where MR = MC'], [2, '(c) Firms enter, market supply increases, price falls, profit falls to zero'], [2, '(d) Allocatively efficient (P = MC) and productively efficient (P = minimum ATC)']],
    '(a) Market: supply and demand set price Pm. Firm: horizontal line at Pm (D = MR = AR = P), MC crossing it at Qf, ATC below Pm at Qf. Profit is the rectangle (Pm - ATC) x Qf.\n(b) The firm produces where MR = MC, since producing one more unit would add more to cost than to revenue.\n(c) Profit attracts new firms. Market supply shifts right, the price falls, and economic profit falls until it is zero (P = minimum ATC).\n(d) Yes to both. P = MC means allocative efficiency, and producing at minimum ATC means productive efficiency.');

  // ================= reference =================
  SW.REF.macro = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Measuring the economy</h4><table>
        <tr><td class="eqn">GDP = C + I + G + (X - M)</td></tr><tr><td class="eqn">real GDP = nominal GDP / deflator x 100</td></tr>
        <tr><td class="eqn">inflation = (CPI2 - CPI1)/CPI1 x 100</td></tr><tr><td class="eqn">unemployment rate = unemployed / labor force x 100</td></tr>
        <tr><td class="eqn">real interest rate = nominal - inflation</td></tr></table></div>
      <div class="ref-unit"><h4>Multipliers</h4><table>
        <tr><td class="eqn">MPC + MPS = 1</td></tr><tr><td class="eqn">spending multiplier = 1/MPS</td></tr>
        <tr><td class="eqn">tax multiplier = -MPC/MPS</td></tr><tr><td class="eqn">money multiplier = 1/reserve requirement</td></tr></table></div>
      <div class="ref-unit"><h4>Policy cheat sheet</h4><table>
        <tr><td><b>Recession:</b> raise G, cut taxes; buy bonds, lower rates. AD right.</td></tr>
        <tr><td><b>Inflation:</b> cut G, raise taxes; sell bonds, raise rates. AD left.</td></tr>
        <tr><td><b>Graphs:</b> AD-AS, money market, loanable funds, Phillips curve, foreign exchange, PPC</td></tr></table></div>
    </div>`;
  SW.REF.micro = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Costs and profit</h4><table>
        <tr><td class="eqn">TC = FC + VC</td></tr><tr><td class="eqn">ATC = TC/Q, AVC = VC/Q, AFC = FC/Q</td></tr>
        <tr><td class="eqn">MC = change in TC / change in Q</td></tr><tr><td class="eqn">profit = TR - TC = (P - ATC) x Q</td></tr>
        <tr><td class="eqn">profit max: MR = MC; shut down if P &lt; min AVC</td></tr></table></div>
      <div class="ref-unit"><h4>Elasticity and surplus</h4><table>
        <tr><td class="eqn">E = %change Q / %change P (midpoint method)</td></tr><tr><td class="eqn">E &gt; 1 elastic, E &lt; 1 inelastic</td></tr>
        <tr><td class="eqn">CS and PS = (1/2)(base)(height)</td></tr><tr><td class="eqn">DWL = (1/2)(tax)(change in Q)</td></tr></table></div>
      <div class="ref-unit"><h4>Market structures</h4><table>
        <tr><td><b>Perfect competition:</b> P = MR = MC; long-run zero profit; efficient</td></tr>
        <tr><td><b>Monopoly:</b> MR below demand; P &gt; MC; DWL</td></tr>
        <tr><td><b>Monopolistic competition:</b> long-run zero profit, excess capacity</td></tr>
        <tr><td><b>Oligopoly:</b> game theory, Nash equilibrium, dominant strategies</td></tr>
        <tr><td><b>Factor markets:</b> hire where MRP = MRC (= wage if competitive); MRP = MP x P</td></tr></table></div>
    </div>`;
})();
