/* Study guides, batch 2: AP Calculus BC, AP Precalculus, AP Statistics,
 * AP Computer Science A. Calculus BC reuses the AB guides for shared units and adds BC topics. */
(function () {
  'use strict';
  const SW = globalThis.SW;

  // ======================= AP CALCULUS BC =======================
  const BC_EXTRA = {
    calc1: {},
    calc2: {},
    calc3: {},
    calc4: {},
    calc5: {},
    calc6: { know: ['BC: integration by parts: integral of u dv = uv - integral of v du (LIATE to choose u).', 'BC: partial fractions for rational functions with linear factors.', 'BC: improper integrals: replace the infinite bound with b and take the limit as b -> infinity.'] },
    calc7: { know: ['BC: Euler\'s method: y(new) = y(old) + (dy/dx)(delta x), step by step.', 'BC: logistic growth dP/dt = kP(1 - P/L): the population grows fastest at P = L/2 and approaches L.'] },
    calc8: { know: ['BC: arc length = integral from a to b of sqrt(1 + (f\'(x))^2) dx.'] },
  };
  for (const [u, extra] of Object.entries(BC_EXTRA)) {
    const g = SW.GUIDES['calcab:' + u];
    if (g) SW.guide('calcbc', u, { ...g, know: [...(g.know || []), ...(extra.know || [])] });
  }
  SW.guides('calcbc', {
    calc9: {
      big: ['Parametric equations give x and y as functions of t; derivatives and arc length use both.', 'Vector-valued functions describe motion in the plane: position, velocity and acceleration vectors.', 'Polar curves r = f(theta) have their own slope and area formulas.'],
      terms: [['Parametric derivative', 'dy/dx = (dy/dt)/(dx/dt).'], ['Second derivative', 'd2y/dx2 = (d/dt(dy/dx))/(dx/dt).'], ['Speed', 'sqrt((dx/dt)^2 + (dy/dt)^2).'], ['Polar conversion', 'x = r cos(theta), y = r sin(theta).']],
      knowTitle: 'Formulas', know: ['Parametric arc length: integral of sqrt((dx/dt)^2 + (dy/dt)^2) dt', 'Total distance traveled by a particle = integral of speed', 'Polar area: 1/2 integral of r^2 d(theta)', 'Area between polar curves: 1/2 integral of (R^2 - r^2) d(theta)', 'Polar slope: dy/dx = (dy/d theta)/(dx/d theta)'],
      mistakes: ['Writing d2y/dx2 as (d2y/dt2)/(d2x/dt2). Divide the t-derivative of dy/dx by dx/dt.', 'Forgetting the 1/2 in polar area.'],
      tips: ['For polar area, find where the curves intersect to set the limits.'],
    },
    calc10: {
      big: ['An infinite series converges if its partial sums approach a limit.', 'Convergence tests decide whether a series converges; choose the test by the form of the terms.', 'Taylor and Maclaurin polynomials approximate functions; the Lagrange and alternating series error bounds measure accuracy.', 'Power series converge on an interval found with the ratio test, then the endpoints are checked separately.'],
      terms: [['Geometric series', 'Sum of ar^n converges to a/(1 - r) when |r| < 1.'], ['p-series', 'Sum of 1/n^p converges when p > 1.'], ['nth term test', 'If the terms do not go to 0, the series diverges.'], ['Alternating series test', 'Terms decrease in size and go to 0 -> converges.'], ['Absolute / conditional convergence', 'Converges with absolute values / only without them.'], ['Radius of convergence', 'Distance from the center where the power series converges.']],
      knowTitle: 'Tests and series to know', know: ['Integral, comparison, limit comparison, ratio test (limit < 1 converges).', 'e^x = 1 + x + x^2/2! + x^3/3! + ...', 'sin x = x - x^3/3! + x^5/5! - ...;  cos x = 1 - x^2/2! + x^4/4! - ...', '1/(1 - x) = 1 + x + x^2 + ... for |x| < 1', 'Taylor coefficient: f^(n)(a)/n!', 'Alternating error bound: |error| <= first omitted term'],
      mistakes: ['Using the nth term test to prove convergence. It can only show divergence.', 'Forgetting to test endpoints of the interval of convergence.'],
      tips: ['Ratio test is the default for power series and terms with factorials or exponentials.'],
    },
  });

  // ======================= AP PRECALCULUS =======================
  SW.guides('precalc', {
    pc1: {
      big: ['Functions are studied by their rates of change: increasing, decreasing, concavity.', 'Polynomials: degree and leading coefficient control end behavior; zeros and multiplicity shape the graph.', 'Rational functions have vertical asymptotes, holes and horizontal or slant asymptotes.', 'Transformations shift, stretch and reflect graphs.'],
      terms: [['Average rate of change', '(f(b) - f(a))/(b - a).'], ['Multiplicity', 'Even: graph touches the axis; odd: crosses it.'], ['End behavior', 'What f does as x goes to plus or minus infinity.'], ['Hole', 'A factor that cancels from top and bottom.'], ['Vertical asymptote', 'A denominator zero that does not cancel.'], ['Transformation', 'g(x) = a f(b(x - h)) + k.']],
      know: ['Horizontal asymptote: compare degrees of numerator and denominator.', 'A degree-n polynomial has at most n real zeros and n - 1 turning points.', 'Complex zeros come in conjugate pairs.', 'Linear functions have constant rate of change; quadratics have a linearly changing rate.'],
      mistakes: ['Calling a canceled factor an asymptote (it is a hole).'],
      tips: ['Show limit notation for end behavior and asymptotes on FRQs.'],
    },
    pc2: {
      big: ['Exponential functions multiply by a constant factor over equal intervals; logarithms are their inverses.', 'Arithmetic sequences add a constant; geometric sequences multiply by a constant.', 'Exponential and logarithmic models fit data and contexts such as growth, decay and pH.', 'Log rules let you solve exponential equations.'],
      terms: [['Exponential function', 'f(x) = ab^x; growth if b > 1, decay if 0 < b < 1.'], ['Logarithm', 'log_b(x) = y means b^y = x.'], ['Natural log', 'ln x = log_e(x).'], ['Semi-log plot', 'Exponential data look linear when y is on a log scale.'], ['Inverse function', 'Swaps inputs and outputs; reflects over y = x.']],
      knowTitle: 'Log rules', know: ['log(MN) = log M + log N', 'log(M/N) = log M - log N', 'log(M^p) = p log M', 'Change of base: log_b(x) = ln x / ln b', 'Domain of log: inputs must be positive'],
      mistakes: ['Writing log(M + N) = log M + log N.', 'Keeping extraneous solutions that make a log input negative.'],
      tips: ['To solve b^x = c, take the log of both sides: x = log(c)/log(b).'],
    },
    pc3: {
      big: ['Sine and cosine model periodic phenomena with amplitude, period, phase shift and midline.', 'The unit circle defines trig values for any angle.', 'Trig identities rewrite expressions; inverse trig functions solve equations with restricted ranges.', 'Polar coordinates describe points by distance and angle.'],
      terms: [['Amplitude', '|a| in a sin(b(x - c)) + d.'], ['Period', '2 pi / |b| for sine and cosine; pi / |b| for tangent.'], ['Midline', 'y = d.'], ['Radian', 'Arc length divided by radius; 2 pi radians in a circle.'], ['Polar coordinates', '(r, theta) with x = r cos(theta), y = r sin(theta).']],
      knowTitle: 'Must know', know: ['sin^2 x + cos^2 x = 1', 'sin(2x) = 2 sin x cos x;  cos(2x) = cos^2 x - sin^2 x', 'tan x = sin x / cos x', 'Unit circle values at 0, pi/6, pi/4, pi/3, pi/2'],
      mistakes: ['Finding only one solution to a trig equation when there are two in [0, 2 pi).'],
      tips: ['For modeling, find the midline and amplitude from the max and min first: d = (max + min)/2, a = (max - min)/2.'],
    },
  });

  // ======================= AP STATISTICS =======================
  SW.guides('stats', {
    st1: {
      big: ['Describe distributions with shape, center, variability and unusual features, always in context.', 'Mean and standard deviation are affected by skew and outliers; median and IQR are resistant.', 'Normal distributions use z-scores and the empirical rule.'],
      terms: [['Skewed right / left', 'Long tail on the right / left.'], ['IQR', 'Q3 - Q1.'], ['Outlier rule', 'Below Q1 - 1.5 IQR or above Q3 + 1.5 IQR.'], ['z-score', '(x - mean)/sd.'], ['Percentile', 'Percent of values at or below a value.'], ['Empirical rule', 'About 68, 95 and 99.7 percent within 1, 2, 3 sd.']],
      know: ['Skewed right: mean > median. Skewed left: mean < median.', 'Adding a constant shifts center, not spread. Multiplying scales both.', 'Compare distributions using comparative words ("greater than") for every feature.'],
      mistakes: ['Describing distributions without context (variable name and units).'],
      tips: ['Use the acronym SOCS: shape, outliers, center, spread.'],
    },
    st2: {
      big: ['Scatterplots show direction, form, strength and unusual features.', 'Least-squares regression predicts y from x; r measures linear strength; r^2 measures explained variation.', 'Residual plots show whether a linear model is appropriate.'],
      terms: [['Correlation (r)', 'Strength and direction of a linear relationship, -1 to 1.'], ['Slope (b)', 'Predicted change in y for each 1-unit increase in x.'], ['r^2', 'Percent of variation in y explained by the linear model.'], ['Residual', 'Actual minus predicted.'], ['Extrapolation', 'Predicting outside the range of data; unreliable.'], ['Influential point', 'Changes the regression line substantially when removed.']],
      know: ['Interpret slope: "For each additional [x unit], the predicted [y] increases/decreases by b [units]."', 'No pattern in the residual plot -> linear model is appropriate.', 'Correlation does not imply causation.'],
      mistakes: ['Leaving out "predicted" when interpreting slope or y-intercept.'],
      tips: ['Read computer output: Constant is the intercept, the variable row\'s Coef is the slope.'],
    },
    st3: {
      big: ['How data are collected determines what conclusions are valid.', 'Random sampling allows generalizing to a population; random assignment allows cause-and-effect conclusions.', 'Bias comes from poor sampling and question design.'],
      terms: [['Observational study / experiment', 'Observes / imposes treatments.'], ['Simple random sample', 'Every group of n individuals is equally likely.'], ['Stratified / cluster sample', 'Random sample within each group / randomly choose whole groups.'], ['Confounding variable', 'Related to both explanatory and response variables.'], ['Blinding', 'Subjects (and/or evaluators) do not know the treatment.'], ['Blocking', 'Grouping similar units before random assignment.'], ['Undercoverage / nonresponse / response bias', 'Groups left out / chosen people do not respond / answers are inaccurate.']],
      know: ['Experiment essentials: comparison, random assignment, control, replication.', 'Stratify to reduce variability when groups differ in the response.', 'Describe a random assignment method specifically (number, use a random generator, assign first half to treatment).'],
      mistakes: ['Confusing random sampling (who is in the study) with random assignment (who gets which treatment).'],
      tips: ['For bias questions, name the bias AND explain the direction (overestimate or underestimate) in context.'],
    },
    st4: {
      big: ['Probability rules combine events; independence and conditional probability are key ideas.', 'Random variables have a mean (expected value) and standard deviation.', 'Binomial and geometric models apply to repeated independent trials.'],
      terms: [['Independent events', 'P(A and B) = P(A) P(B).'], ['Mutually exclusive', 'Cannot happen together: P(A and B) = 0.'], ['Conditional probability', 'P(A | B) = P(A and B)/P(B).'], ['Expected value', 'mean = sum of x P(x).'], ['Binomial', 'Fixed n trials, counting successes.'], ['Geometric', 'Trials until the first success.']],
      knowTitle: 'Formulas', know: ['P(A or B) = P(A) + P(B) - P(A and B)', 'Binomial: mean np, sd sqrt(np(1 - p))', 'Geometric: mean 1/p', 'Sum of independent random variables: means add, variances add'],
      mistakes: ['Adding standard deviations instead of variances.'],
      tips: ['Check BINS for binomial: binary, independent, number fixed, same probability.'],
    },
    st5: {
      big: ['A statistic varies from sample to sample; its sampling distribution describes that variation.', 'Larger samples give less variable statistics.', 'The Central Limit Theorem: sample means are approximately normal for large n.'],
      terms: [['Sampling distribution', 'Distribution of a statistic over all samples of size n.'], ['Unbiased estimator', 'Its sampling distribution is centered at the parameter.'], ['Standard error', 'Estimated sd of a statistic.'], ['Central Limit Theorem', 'x-bar is approximately normal when n >= 30.']],
      knowTitle: 'Formulas', know: ['p-hat: mean p, sd sqrt(p(1 - p)/n)', 'x-bar: mean mu, sd sigma/sqrt(n)', 'Large counts: np >= 10 and n(1 - p) >= 10', '10 percent condition: n <= 10 percent of the population'],
      mistakes: ['Applying the CLT to individual values instead of sample means.'],
      tips: ['To cut the standard deviation in half, multiply the sample size by 4.'],
    },
    st6: {
      big: ['Confidence intervals estimate a population proportion; significance tests check a claim.', 'Conditions: random, 10 percent, large counts.', 'Conclusions are always in context and about the population.'],
      terms: [['Confidence level', 'Percent of intervals from repeated samples that capture the true parameter.'], ['Margin of error', 'z* x SE.'], ['p-value', 'Probability of results at least this extreme if H0 is true.'], ['Type I / Type II error', 'Reject a true H0 / fail to reject a false H0.'], ['Power', 'Probability of correctly rejecting a false H0.']],
      knowTitle: 'Formulas', know: ['One-proportion interval: p-hat +/- z* sqrt(p-hat(1 - p-hat)/n)', 'Test statistic: z = (p-hat - p0)/sqrt(p0(1 - p0)/n)', 'Two proportions: use the pooled p-hat for the test', 'z* = 1.645 (90%), 1.96 (95%), 2.576 (99%)'],
      mistakes: ['Saying there is a 95 percent chance the true value is in a specific interval.', 'Accepting H0. You fail to reject it.'],
      tips: ['Four steps for full credit: state, plan (conditions), do (calculations), conclude in context.'],
    },
    st7: {
      big: ['Inference for means uses t distributions because sigma is unknown.', 'Paired data use the differences as one sample.', 'Conditions: random, 10 percent, normal/large sample (n >= 30 or no strong skew or outliers).'],
      terms: [['t distribution', 'Like normal with heavier tails; df = n - 1.'], ['Paired t procedure', 'Analyze the mean of differences.'], ['Two-sample t', 'Compare means of two independent groups.']],
      knowTitle: 'Formulas', know: ['One-sample interval: x-bar +/- t* s/sqrt(n)', 't = (x-bar - mu0)/(s/sqrt(n))', 'Two-sample: SE = sqrt(s1^2/n1 + s2^2/n2)'],
      mistakes: ['Using two-sample procedures on paired data.'],
      tips: ['Ask: were the same individuals measured twice? If yes, it is paired.'],
    },
    st8: {
      big: ['Chi-square tests compare observed counts with expected counts.', 'Goodness of fit: one categorical variable vs a claimed distribution.', 'Homogeneity: compare distributions across groups. Independence: association between two variables in one sample.'],
      terms: [['Expected count', 'Under H0: (row total x column total)/grand total for two-way tables.'], ['Chi-square statistic', 'sum((O - E)^2 / E).'], ['Degrees of freedom', 'Goodness of fit: categories - 1; two-way: (rows - 1)(columns - 1).']],
      know: ['All expected counts must be at least 5.', 'Large chi-square -> small p-value -> evidence against H0.', 'Biggest contributor: the cell with the largest (O - E)^2 / E.'],
      mistakes: ['Using percentages instead of counts.'],
      tips: ['Name the test correctly: homogeneity (separate samples) vs independence (one sample, two variables).'],
    },
    st9: {
      big: ['Inference for the slope tests whether there is a linear relationship in the population.', 'Use the regression computer output for b and SE(b).', 'Conditions: linear, independent, normal residuals, equal variance, random (LINER).'],
      terms: [['Population slope (beta)', 'True slope of the regression line.'], ['SE of slope', 'From the output; standard error of b.'], ['df', 'n - 2.']],
      knowTitle: 'Formulas', know: ['Interval: b +/- t* SE(b)', 't = (b - 0)/SE(b)', 'H0: beta = 0 (no linear relationship)'],
      mistakes: ['Using df = n - 1 instead of n - 2.'],
      tips: ['If the interval for the slope includes 0, you do not have convincing evidence of a linear relationship.'],
    },
  });

  // ======================= AP COMPUTER SCIENCE A =======================
  SW.guides('csa', {
    csa1: {
      big: ['Java programs use primitive types (int, double, boolean) and objects.', 'Objects are created from classes with constructors and used through methods.', 'Strings are immutable objects with useful methods; Math provides static methods.'],
      terms: [['Primitive types', 'int, double, boolean.'], ['Integer division', '7 / 2 = 3; use % for the remainder.'], ['Casting', '(int) 3.7 = 3 (truncates); (double) 7 / 2 = 3.5.'], ['Object reference', 'A variable that stores where an object is.'], ['null', 'A reference that points to no object.'], ['Static method', 'Called on the class, such as Math.random().']],
      knowTitle: 'Must-know methods', know: ['String: length(), substring(a, b) [a included, b excluded], indexOf(str), equals(other), compareTo(other)', 'Math: abs, pow, sqrt, random() [0.0 to less than 1.0]', 'Random int from a to b: (int)(Math.random() * (b - a + 1)) + a', 'Wrapper classes: Integer, Double; autoboxing'],
      mistakes: ['Comparing Strings with == instead of .equals().', 'Forgetting that substring\'s end index is excluded.'],
      tips: ['Trace integer division carefully: 5 / 2 * 2.0 = 4.0, not 5.0.'],
    },
    csa2: {
      big: ['if statements choose between paths; boolean expressions use &&, || and !.', 'while and for loops repeat code; nested loops multiply iterations.', 'Standard algorithms: sums, counts, min/max, digit processing, string traversal.'],
      terms: [['Short-circuit evaluation', '&& stops at the first false; || at the first true.'], ['De Morgan\'s laws', '!(a && b) == !a || !b;  !(a || b) == !a && !b.'], ['Off-by-one error', 'Loop runs one time too many or too few.'], ['Infinite loop', 'Condition never becomes false.']],
      know: ['for (int i = 0; i < n; i++) runs n times', 'Nested loops: outer n times x inner m times = n x m', 'Reverse a string: build from the end with substring(i, i + 1)'],
      mistakes: ['Using < vs <= incorrectly at loop bounds.'],
      tips: ['Trace loops with a table of variable values for each iteration.'],
    },
    csa3: {
      big: ['A class defines instance variables (state), constructors and methods (behavior).', 'Encapsulation: instance variables are private; access them through methods.', 'this refers to the current object.'],
      terms: [['Constructor', 'Same name as the class; initializes instance variables; no return type.'], ['Accessor / mutator', 'Getter / setter methods.'], ['private / public', 'Access only within the class / from anywhere.'], ['static variable', 'Shared by all objects of the class.'], ['Overloading', 'Same method name, different parameters.']],
      know: ['Instance variables: private, declared at the top of the class.', 'Methods that return a value need a return statement on every path.', 'Pass-by-value: methods receive copies of primitives and copies of references.'],
      mistakes: ['Re-declaring an instance variable inside the constructor (shadowing), so the field is never set.', 'Adding a return type to a constructor.'],
      tips: ['Class design FRQ: write the header, private fields, constructor and every method exactly as specified.'],
    },
    csa4: {
      big: ['Arrays have fixed size; ArrayLists grow and shrink.', '2D arrays are arrays of rows: arr[row][col].', 'Standard algorithms: traverse, search, insert, remove, sort (selection, insertion), and recursion.'],
      terms: [['Array', 'int[] a = new int[n]; a.length.'], ['ArrayList', 'ArrayList<Integer> list; size(), get(i), set(i, v), add(v), add(i, v), remove(i).'], ['Enhanced for loop', 'for (int x : arr) reads each value; cannot change the array\'s structure.'], ['2D traversal', 'for rows: arr.length; for columns: arr[0].length.'], ['Linear / binary search', 'Check each / halve a sorted list.'], ['Recursion', 'A method calls itself with a base case that stops it.']],
      know: ['Removing from an ArrayList in a forward loop skips elements; loop backward or adjust i.', 'Selection sort: find the minimum, swap it into place. Insertion sort: insert each element into the sorted part.', 'ArrayIndexOutOfBoundsException when the index is < 0 or >= length.'],
      mistakes: ['Using .length on an ArrayList (use size()) or size() on an array (use length).', 'Modifying an ArrayList inside an enhanced for loop.'],
      tips: ['For 2D array FRQs, use arr.length for rows and arr[r].length for columns of row r.'],
    },
  });
})();
