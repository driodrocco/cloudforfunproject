/* AP Statistics: course, calculations (normal, binomial, inference, regression),
 * concept questions, free response, formula sheet. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;

  SW.defineCourse('stats', {
    name: 'AP Statistics', short: 'Statistics', subject: 'Math and Computer Science',
    units: [
      ['st1', 1, 'Exploring One-Variable Data', '15-23%'],
      ['st2', 2, 'Exploring Two-Variable Data', '5-7%'],
      ['st3', 3, 'Collecting Data', '12-15%'],
      ['st4', 4, 'Probability, Random Variables, and Probability Distributions', '10-20%'],
      ['st5', 5, 'Sampling Distributions', '7-12%'],
      ['st6', 6, 'Inference for Categorical Data: Proportions', '12-15%'],
      ['st7', 7, 'Inference for Quantitative Data: Means', '10-18%'],
      ['st8', 8, 'Inference for Categorical Data: Chi-Square', '2-5%'],
      ['st9', 9, 'Inference for Quantitative Data: Slopes', '2-5%'],
    ],
    format: '40 multiple-choice questions (90 min, 50%) + 6 free-response questions, including 1 investigative task (90 min, 50%)',
    dist: { year: 2025, 5: 17.0, 4: 21.4, 3: 21.9 },
    past: 'https://apcentral.collegeboard.org/courses/ap-statistics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/math/ap-statistics',
    cut: [68, 54, 40, 26],
  });

  // Standard normal CDF (Abramowitz-Stegun erf approximation, error < 2e-7).
  function phi(z) {
    const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
    return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
  }
  SW.phi = phi;
  const choose = (n, k) => { let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return c; };
  const r4 = x => Number(x.toFixed(4));

  add('st1', 'z-score', () => {
    const mu = R(50, 100, 1), sd = R(4, 15, 1), x = mu + R(-30, 30, 1), z = r3((x - mu) / sd);
    return W()
      .l('Standardizing', `x = ${x}`, `mean = ${mu}`, `SD = ${sd}`, 'z = ?', '')
      .f('z = (x - mean)/SD')
      .l(`z = (${x} - ${mu})/${sd}`, `z = ${num(z)}`)
      .n(`The value is ${Math.abs(z) < 0.005 ? 'exactly at' : num(Math.abs(z)) + ' standard deviations ' + (z > 0 ? 'above' : 'below')} the mean.`)
      .done(`Test scores have mean ${mu} and standard deviation ${sd}. What is the z-score for a score of ${x}?`, z, '', true);
  });

  add('st1', 'Normal distribution probability', () => {
    const mu = R(50, 100, 1), sd = R(4, 15, 1), x = mu + R(-2.5, 2.5, 0.1) * sd, z = Number(((x - mu) / sd).toFixed(2));
    const above = Math.random() < 0.5, p = r4(above ? 1 - phi(z) : phi(z));
    return W()
      .l('Normal probability', `X ~ N(${mu}, ${sd})`, `P(X ${above ? '>' : '<'} ${g(r3(x))}) = ?`, '')
      .f('z = (x - mean)/SD, then use the standard normal table (or normalcdf)')
      .l(`z = (${g(r3(x))} - ${mu})/${sd} = ${z.toFixed(2)}`, above ? `P(Z > ${z.toFixed(2)}) = 1 - ${r4(phi(z)).toFixed(4)}` : `P(Z < ${z.toFixed(2)})`, `= ${p.toFixed(4)}`)
      .done(`Heights are approximately normal with mean ${mu} and standard deviation ${sd}. What proportion are ${above ? 'greater' : 'less'} than ${g(r3(x))}?`, p, '');
  });

  add('st1', 'Outlier boundary (1.5 x IQR rule)', () => {
    const q1 = R(10, 50, 1), q3 = q1 + R(5, 30, 1), iqr = q3 - q1, hi = q3 + 1.5 * iqr;
    return W()
      .l('Outliers', `Q1 = ${q1}, Q3 = ${q3}`, '')
      .f('IQR = Q3 - Q1; high outliers are above Q3 + 1.5(IQR)')
      .l(`IQR = ${q3} - ${q1} = ${iqr}`, `upper fence = ${q3} + 1.5(${iqr}) = ${g(hi)}`)
      .done(`A data set has Q1 = ${q1} and Q3 = ${q3}. Above what value is a data point considered a high outlier?`, hi, '');
  });

  add('st2', 'Regression prediction and residual', () => {
    const a = R(-20, 40, 0.5), b = R(0.5, 5, 0.1), x = R(5, 40, 1), yhat = r3(a + b * x), y = r3(yhat + R(-8, 8, 0.5)), res = r3(y - yhat);
    return W()
      .l('Least-squares regression', `predicted y = ${g(a)} + ${g(b)}x`, `x = ${x}, actual y = ${g(y)}`, 'residual = ?', '')
      .f('residual = actual - predicted')
      .l(`predicted = ${g(a)} + ${g(b)}(${x}) = ${num(yhat)}`, `residual = ${g(y)} - ${num(yhat)} = ${num(res)}`)
      .n(res > 0 ? 'Positive residual: the model underestimated this point.' : 'Negative residual: the model overestimated this point.')
      .done(`The regression line is predicted y = ${g(a)} + ${g(b)}x. A point has x = ${x} and y = ${g(y)}. What is its residual?`, res, '', true);
  });

  add('st2', 'Coefficient of determination', () => {
    const r = R(-0.98, 0.98, 0.01), r2 = r3(r * r * 100);
    return W()
      .l('r and r^2', `r = ${g(r)}`, '')
      .f('r^2 = (r)^2 = fraction of variation in y explained by the linear model')
      .l(`r^2 = (${g(r)})^2 = ${num(r3(r * r))}`, `= ${num(r2)}%`)
      .done(`The correlation between two variables is r = ${g(r)}. What percent of the variation in y is explained by the linear model?`, r2, '%');
  });

  add('st4', 'Binomial probability', () => {
    const n = R(5, 15, 1), k = R(0, n, 1), p = R(0.1, 0.9, 0.05), P = r4(choose(n, k) * p ** k * (1 - p) ** (n - k));
    return W()
      .l('Binomial', `n = ${n}, p = ${g(p)}`, `P(X = ${k}) = ?`, '')
      .f('P(X = k) = (n choose k) p^k (1 - p)^(n - k)')
      .l(`= (${n} choose ${k})(${g(p)})^${k}(${g(r3(1 - p))})^${n - k}`, `= ${choose(n, k)}(${g(p)})^${k}(${g(r3(1 - p))})^${n - k}`, `= ${P.toFixed(4)}`)
      .n('Check BINS: binary outcomes, independent trials, fixed n, same p each trial.')
      .done(`A free-throw shooter makes ${g(p * 100)}% of shots. If she takes ${n} shots, what is the probability she makes exactly ${k}?`, P, '');
  });

  add('st4', 'Expected value of a random variable', () => {
    const xs = [R(0, 3, 1), R(4, 7, 1), R(8, 12, 1)];
    const p1 = R(0.1, 0.5, 0.05), p2 = R(0.1, Math.min(0.85 - p1, 0.6), 0.05), p3 = Number((1 - p1 - p2).toFixed(2));
    const ps = [p1, p2, p3], E = r3(xs.reduce((s, x, i) => s + x * ps[i], 0));
    return W()
      .l('Expected value', xs.map((x, i) => `P(X = ${x}) = ${g(ps[i])}`).join(', '), '')
      .f('E(X) = sum of x times P(x)')
      .l(`E(X) = ${xs.map((x, i) => `${x}(${g(ps[i])})`).join(' + ')}`, `E(X) = ${num(E)}`)
      .done(`X takes the values ${xs.join(', ')} with probabilities ${ps.map(g).join(', ')}. Find E(X).`, E, '');
  });

  add('st4', 'Standard deviation of a sum', () => {
    const s1 = R(1, 12, 1), s2 = R(1, 12, 1), sd = r3(Math.sqrt(s1 * s1 + s2 * s2));
    return W()
      .l('Combining random variables', `SD(X) = ${s1}, SD(Y) = ${s2}, independent`, 'SD(X + Y) = ?', '')
      .f('For independent X and Y: Var(X + Y) = Var(X) + Var(Y); add VARIANCES, not SDs')
      .l(`Var = ${s1}^2 + ${s2}^2 = ${s1 * s1 + s2 * s2}`, `SD = sqrt(${s1 * s1 + s2 * s2}) = ${num(sd)}`)
      .n('This is also true for X - Y: variances still add.')
      .done(`X and Y are independent with SDs ${s1} and ${s2}. What is the standard deviation of X + Y?`, sd, '');
  });

  add('st5', 'Standard deviation of a sample proportion', () => {
    const p = R(0.1, 0.9, 0.05), n = R(50, 1000, 10), sd = r4(Math.sqrt((p * (1 - p)) / n));
    return W()
      .l('Sampling distribution of p-hat', `p = ${g(p)}, n = ${n}`, '')
      .f('SD of p-hat = sqrt(p(1 - p)/n)')
      .l(`= sqrt((${g(p)})(${g(r3(1 - p))})/${n})`, `= ${sd.toFixed(4)}`)
      .n('Check the 10% condition: n should be less than 10% of the population.')
      .done(`In a population, ${g(p * 100)}% support a policy. For random samples of size ${n}, what is the standard deviation of the sample proportion?`, sd, '');
  });

  add('st6', 'Margin of error for a proportion', () => {
    const n = R(100, 2000, 10), x = Math.round(n * R(0.2, 0.8, 0.01)), ph = r4(x / n), me = r4(1.96 * Math.sqrt((ph * (1 - ph)) / n));
    return W()
      .l('95% confidence interval for p', `n = ${n}, successes = ${x}`, '')
      .f('margin of error = z* sqrt(p-hat(1 - p-hat)/n), z* = 1.96 for 95%')
      .l(`p-hat = ${x}/${n} = ${ph}`, `ME = 1.96 sqrt((${ph})(${r4(1 - ph)})/${n})`, `ME = ${me.toFixed(4)}`, `interval: (${r4(ph - me)}, ${r4(ph + me)})`)
      .done(`In a random sample of ${n} students, ${x} say they get enough sleep. Find the margin of error for a 95% confidence interval for the true proportion.`, me, '');
  });

  add('st6', 'Test statistic for a proportion', () => {
    const p0 = pick([0.25, 0.3, 0.4, 0.5, 0.6]), n = R(100, 800, 10), x = Math.round(n * (p0 + R(-0.08, 0.08, 0.01))), ph = r4(x / n);
    const z = r3((ph - p0) / Math.sqrt((p0 * (1 - p0)) / n));
    return W()
      .l('One-sample z test for p', `H0: p = ${p0}`, `n = ${n}, p-hat = ${x}/${n} = ${ph}`, '')
      .f('z = (p-hat - p0)/sqrt(p0(1 - p0)/n)')
      .l(`z = (${ph} - ${p0})/sqrt((${p0})(${g(1 - p0)})/${n})`, `z = ${num(z)}`)
      .n('Use p0 (not p-hat) in the standard error for a significance test.')
      .done(`A company claims ${p0 * 100}% of customers prefer its product. In a random sample of ${n}, ${x} prefer it. Calculate the test statistic for H0: p = ${p0}.`, z, '', true);
  });

  add('st7', 'Test statistic for a mean', () => {
    const mu0 = R(20, 80, 1), n = R(10, 60, 1), s = R(2, 12, 0.5), xbar = r3(mu0 + R(-4, 4, 0.1)), t = r3((xbar - mu0) / (s / Math.sqrt(n)));
    return W()
      .l('One-sample t test', `H0: mu = ${mu0}`, `x-bar = ${g(xbar)}, s = ${g(s)}, n = ${n}`, '')
      .f('t = (x-bar - mu0)/(s/sqrt(n)), df = n - 1')
      .l(`t = (${g(xbar)} - ${mu0})/(${g(s)}/sqrt(${n}))`, `t = ${num(t)}, df = ${n - 1}`)
      .done(`A sample of ${n} bags has mean weight ${g(xbar)} g and standard deviation ${g(s)} g. Find the t statistic for H0: mu = ${mu0}.`, t, '', true);
  });

  add('st8', 'Chi-square statistic', () => {
    const exp = [R(20, 60, 1), R(20, 60, 1), R(20, 60, 1)], obs = exp.map(e => e + R(-10, 10, 1));
    const chi = r3(obs.reduce((s, o, i) => s + (o - exp[i]) ** 2 / exp[i], 0));
    return W()
      .l('Chi-square goodness of fit', `observed: ${obs.join(', ')}`, `expected: ${exp.join(', ')}`, '')
      .f('X^2 = sum of (observed - expected)^2/expected, df = categories - 1')
      .l(`X^2 = ${obs.map((o, i) => `(${o} - ${exp[i]})^2/${exp[i]}`).join(' + ')}`, `X^2 = ${num(chi)}, df = 2`)
      .done(`Observed counts are ${obs.join(', ')} and expected counts are ${exp.join(', ')}. Compute the chi-square statistic.`, chi, '');
  });

  add('st9', 'Slope test statistic', () => {
    const b = R(0.5, 4, 0.1), se = R(0.1, 1.5, 0.05), t = r3(b / se);
    return W()
      .l('t test for slope', `b = ${g(b)}`, `SE(b) = ${g(se)}`, 'H0: beta = 0', '')
      .f('t = (b - 0)/SE(b), df = n - 2')
      .l(`t = ${g(b)}/${g(se)}`, `t = ${num(t)}`)
      .done(`Computer output gives a slope of ${g(b)} with standard error ${g(se)}. What is the t statistic for testing H0: beta = 0?`, t, '');
  });

  // ---------- concept questions ----------
  SW.mcqs('st1', [
    ['skew mean median', 'In a distribution strongly skewed to the right, the mean is usually:', ['Less than the median', 'Greater than the median', 'Equal to the median', 'Zero'], 1, 'The long right tail pulls the mean toward it.'],
    ['resistant measures', 'Which measure of spread is resistant to outliers?', ['Standard deviation', 'Range', 'IQR', 'Variance'], 2, 'IQR uses the middle 50% only.'],
    ['describe distribution', 'When describing a distribution you should mention:', ['Shape, center, spread and unusual features, in context', 'Only the mean', 'Only the graph type', 'The sample size only'], 0, 'SOCS: shape, outliers, center, spread.'],
  ]);
  SW.mcqs('st2', [
    ['correlation causation', 'A strong correlation between ice cream sales and drownings shows:', ['Ice cream causes drowning', 'An association, possibly due to a lurking variable like temperature', 'No relationship', 'Drowning causes ice cream sales'], 1, 'Correlation is not causation; hot weather drives both.'],
    ['slope interpretation', 'For predicted score = 52 + 3.1(hours), the slope means:', ['Each extra hour studied is associated with a predicted 3.1-point increase', 'Students score 3.1 on average', 'Score increases by 52', 'Hours cause scores'], 0, 'Always interpret slope as a predicted change, in context.'],
    ['residual plot', 'A residual plot with a clear curved pattern means:', ['A linear model is appropriate', 'A linear model is not appropriate', 'r = 1', 'There are no outliers'], 1, 'Curvature in residuals means a curve would fit better.'],
  ]);
  SW.mcqs('st3', [
    ['experiment vs observational', 'Only a well-designed experiment can show:', ['Association', 'Cause and effect', 'Correlation', 'Bias'], 1, 'Random assignment to treatments lets you conclude causation.'],
    ['sampling bias', 'Asking volunteers to call in to a radio show creates:', ['Undercoverage', 'Voluntary response bias', 'Response bias', 'A simple random sample'], 1, 'People with strong opinions are more likely to respond.'],
    ['blocking', 'In an experiment, blocking by gender is used to:', ['Increase bias', 'Reduce variability from a known source', 'Avoid random assignment', 'Make the sample bigger'], 1, 'Compare treatments within similar groups.'],
    ['stratified sample', 'In a stratified random sample, you:', ['Pick whole groups at random', 'Split the population into groups and randomly sample within each', 'Pick every 10th person', 'Use volunteers'], 1, 'Cluster sampling picks whole groups; stratified samples within every group.'],
  ]);
  SW.mcqs('st4', [
    ['independent events', 'Events A and B are independent if:', ['P(A and B) = 0', 'P(A | B) = P(A)', 'P(A) + P(B) = 1', 'They cannot happen together'], 1, 'Knowing B happened does not change the chance of A.'],
    ['mutually exclusive', 'If A and B are mutually exclusive, P(A or B) =', ['P(A) x P(B)', 'P(A) + P(B)', 'P(A) + P(B) - P(A)P(B)', '1'], 1, 'They cannot overlap, so nothing is double counted.'],
    ['law of large numbers', 'The law of large numbers says:', ['Small samples are best', 'As the number of trials grows, the sample proportion gets close to the true probability', 'Streaks always even out quickly', 'Every outcome is equally likely'], 1, 'Long-run relative frequency approaches the probability.'],
  ]);
  SW.mcqs('st5', [
    ['central limit theorem', 'The Central Limit Theorem says that for large n, the sampling distribution of x-bar is:', ['Always skewed', 'Approximately normal, even if the population is not', 'The same as the population', 'Uniform'], 1, 'Usually n >= 30 is enough.'],
    ['sample size effect', 'Quadrupling the sample size changes the standard deviation of x-bar by a factor of:', ['4', '2', '1/2', '1/4'], 2, 'SD is sigma/sqrt(n), and sqrt(4) = 2.'],
  ]);
  SW.mcqs('st6', [
    ['confidence level meaning', 'A 95% confidence level means:', ['95% of the data is in the interval', 'If we repeated sampling many times, about 95% of the intervals would capture the true parameter', 'There is a 95% chance p is in this one interval', 'The sample proportion is 95% accurate'], 1, 'The confidence is in the method, not one interval.'],
    ['p value meaning', 'A p-value of 0.03 means:', ['There is a 3% chance H0 is true', 'If H0 were true, there is a 3% chance of getting a result at least this extreme', 'The alternative is 97% likely', 'The effect is small'], 1, 'It is computed assuming H0 is true.'],
    ['type i error', 'A Type I error is:', ['Failing to reject a false H0', 'Rejecting a true H0', 'Using the wrong test', 'A calculation mistake'], 1, 'Its probability is alpha, the significance level.'],
  ]);
  SW.mcqs('st7', [
    ['paired t test', 'Measuring the same students\' scores before and after tutoring calls for:', ['A two-sample t test', 'A paired t test on the differences', 'A chi-square test', 'A z test for proportions'], 1, 'Each before/after pair comes from one student.'],
    ['t vs z', 'We use t instead of z for means because:', ['The data are categorical', 'We estimate sigma with s', 'The sample is large', 'We know sigma'], 1, 't accounts for the extra uncertainty in estimating sigma.'],
  ]);
  SW.mcqs('st8', [
    ['chi square test choice', 'To test whether favorite sport is independent of grade level from one sample, use:', ['Goodness of fit', 'Test of independence', 'Test of homogeneity', 'Two-sample t test'], 1, 'One sample, two categorical variables.'],
  ]);
  SW.mcqs('st9', [
    ['slope inference conditions', 'Which is a condition for inference about the regression slope?', ['The residuals are roughly normal with equal spread', 'The correlation is above 0.9', 'n > 1000', 'The slope is positive'], 0, 'LINER: linear, independent, normal residuals, equal SD, random.'],
  ]);

  // ---------- free response ----------
  SW.frq('st6', 'Inference for a proportion (4-step)',
    'A school claims that 60% of its students eat breakfast. A random sample of 200 students finds that 104 eat breakfast.\n(a) State the hypotheses for testing whether the true proportion is less than 0.60. Define the parameter.\n(b) Check the conditions for the test.\n(c) Calculate the test statistic and p-value.\n(d) State your conclusion at the alpha = 0.05 level, in context.',
    [[1, '(a) H0: p = 0.60, Ha: p < 0.60, with p defined as the true proportion of all students at the school who eat breakfast'], [1, '(b) Random sample; 200 < 10% of students (or assumed); np0 = 120 and n(1 - p0) = 80 are both at least 10'], [1, '(c) p-hat = 0.52, z = (0.52 - 0.60)/sqrt(0.6(0.4)/200) = -2.31, p-value about 0.0104'], [1, '(d) Because p-value 0.0104 < 0.05, reject H0: convincing evidence that fewer than 60% of students eat breakfast']],
    '(a) Let p = the true proportion of all students at this school who eat breakfast. H0: p = 0.60. Ha: p < 0.60.\n(b) Random: random sample. 10%: 200 is less than 10% of all students. Large counts: 200(0.60) = 120 >= 10 and 200(0.40) = 80 >= 10.\n(c) p-hat = 104/200 = 0.52. z = (0.52 - 0.60)/sqrt(0.60(0.40)/200) = -0.08/0.0346 = -2.31. p-value = P(Z < -2.31) = 0.0104.\n(d) Since 0.0104 < 0.05, we reject H0. There is convincing evidence that the true proportion of students at this school who eat breakfast is less than 0.60.');
  SW.frq('st3', 'Designing an experiment',
    'A researcher wants to know whether a new fertilizer increases tomato yield. She has 40 tomato plants in a greenhouse.\n(a) Describe how to randomly assign the plants to two treatments.\n(b) Explain why random assignment is important here.\n(c) The plants are on two different benches, one near a window and one far from it. Describe how blocking could improve the experiment.\n(d) Explain what it would mean if the difference in mean yield was statistically significant.',
    [[1, '(a) Valid random assignment method (label 1-40, random number generator, first 20 unique numbers get fertilizer; or cards in a hat)'], [1, '(b) Balances other variables between groups so differences can be attributed to the fertilizer (allows cause and effect)'], [1, '(c) Block by bench, then randomly assign treatments within each bench; reduces variability from sunlight'], [1, '(d) The difference is too large to be explained by chance variation in random assignment alone']],
    '(a) Number the plants 1 to 40. Use a random number generator to pick 20 different numbers; those plants get the new fertilizer and the other 20 get the regular fertilizer.\n(b) Random assignment balances other variables, like plant size and health, between the groups. Then a difference in yield can be attributed to the fertilizer.\n(c) Treat each bench as a block. Within each bench, randomly assign half the plants to each fertilizer. This removes the effect of sunlight differences from the comparison.\n(d) It would mean the difference in mean yield is larger than what we would expect from random assignment alone, so it provides convincing evidence that the fertilizer affects yield.');

  SW.REF.stats = () => `
    <p class="muted small">Based on the formulas and tables provided on the AP Statistics exam.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>Descriptive statistics</h4><table>
        <tr><td class="eqn">x-bar = sum x / n</td></tr><tr><td class="eqn">s = sqrt( sum (x - x-bar)^2 / (n - 1) )</td></tr>
        <tr><td class="eqn">z = (x - mean)/SD</td></tr><tr><td class="eqn">outliers: below Q1 - 1.5 IQR or above Q3 + 1.5 IQR</td></tr>
        <tr><td class="eqn">y-hat = a + bx, b = r (sy/sx)</td></tr><tr><td class="eqn">residual = y - y-hat</td></tr></table></div>
      <div class="ref-unit"><h4>Probability</h4><table>
        <tr><td class="eqn">P(A or B) = P(A) + P(B) - P(A and B)</td></tr><tr><td class="eqn">P(A | B) = P(A and B)/P(B)</td></tr>
        <tr><td class="eqn">E(X) = sum x P(x)</td></tr><tr><td class="eqn">Var(X +/- Y) = Var(X) + Var(Y) (independent)</td></tr>
        <tr><td class="eqn">Binomial: P(X = k) = (n choose k) p^k (1 - p)^(n - k); mean np; SD sqrt(np(1 - p))</td></tr>
        <tr><td class="eqn">Geometric: P(X = k) = (1 - p)^(k - 1) p; mean 1/p</td></tr></table></div>
      <div class="ref-unit"><h4>Sampling distributions</h4><table>
        <tr><td class="eqn">p-hat: mean p, SD sqrt(p(1 - p)/n)</td></tr><tr><td class="eqn">x-bar: mean mu, SD sigma/sqrt(n)</td></tr>
        <tr><td class="eqn">conditions: random, 10% rule, large counts (np >= 10 and n(1 - p) >= 10) or n >= 30</td></tr></table></div>
      <div class="ref-unit"><h4>Inference</h4><table>
        <tr><td class="eqn">statistic +/- (critical value)(standard error)</td></tr>
        <tr><td class="eqn">test statistic = (statistic - parameter)/(standard error)</td></tr>
        <tr><td class="eqn">z* for 90%, 95%, 99%: 1.645, 1.96, 2.576</td></tr>
        <tr><td class="eqn">chi-square = sum (O - E)^2/E</td></tr><tr><td class="eqn">slope: t = (b - 0)/SE(b), df = n - 2</td></tr></table></div>
      <div class="ref-unit"><h4>Four steps (State, Plan, Do, Conclude)</h4><table>
        <tr><td>State hypotheses and define the parameter. Plan: name the test, check conditions. Do: test statistic and p-value. Conclude in context: compare p-value with alpha.</td></tr></table></div>
    </div>`;
})();
