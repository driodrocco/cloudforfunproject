/* AP Precalculus: course, function problems with worked steps, concept
 * questions, free response, reference sheet. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;

  SW.defineCourse('precalc', {
    name: 'AP Precalculus', short: 'Precalculus', subject: 'Math and Computer Science',
    units: [
      ['pc1', 1, 'Polynomial and Rational Functions', '30-40%'],
      ['pc2', 2, 'Exponential and Logarithmic Functions', '27-40%'],
      ['pc3', 3, 'Trigonometric and Polar Functions', '30-35%'],
    ],
    format: '40 multiple-choice questions (28 no calculator + 12 calculator, 120 min, 62.5%) + 4 free-response questions (2 calculator + 2 no calculator, 60 min, 37.5%)',
    dist: { year: 2025, 5: 28.1, 4: 25.8, 3: 26.8 },
    past: 'https://apcentral.collegeboard.org/courses/ap-precalculus/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/math/precalculus',
  });

  add('pc1', 'Average rate of change', () => {
    const a = R(-3, 4, 1) || 1, b = R(-6, 6, 1), c = R(-9, 9, 1), p = R(-3, 2, 1), q = p + R(1, 4, 1);
    const f = x => a * x * x + b * x + c, ans = r3((f(q) - f(p)) / (q - p));
    return W()
      .l('Average rate of change', `f(x) = ${a}x^2 ${b < 0 ? '- ' + -b : '+ ' + b}x ${c < 0 ? '- ' + -c : '+ ' + c}`, `interval [${p}, ${q}]`, '')
      .f('average rate of change = (f(b) - f(a))/(b - a)')
      .l(`f(${q}) = ${f(q)}, f(${p}) = ${f(p)}`, `= (${f(q)} - ${f(p) < 0 ? '(' + f(p) + ')' : f(p)})/(${q} - ${p < 0 ? '(' + p + ')' : p})`, `= ${num(ans)}`)
      .n('This is the slope of the secant line between the two points.')
      .done(`Find the average rate of change of f(x) = ${a}x^2 ${b < 0 ? '- ' + -b : '+ ' + b}x ${c < 0 ? '- ' + -c : '+ ' + c} on [${p}, ${q}].`, ans, '', true);
  });

  add('pc1', 'Vertical asymptote of a rational function', () => {
    const a = R(-5, 5, 1); let b; do { b = R(-6, 6, 1); } while (b === a);
    return W()
      .l('Rational function', `f(x) = (x ${a < 0 ? '+ ' + -a : '- ' + a})/((x ${a < 0 ? '+ ' + -a : '- ' + a})(x ${b < 0 ? '+ ' + -b : '- ' + b}))`, '')
      .f('A factor that cancels gives a HOLE; a factor left in the denominator gives a VERTICAL ASYMPTOTE')
      .l(`(x ${a < 0 ? '+ ' + -a : '- ' + a}) cancels: hole at x = ${a}`, `(x ${b < 0 ? '+ ' + -b : '- ' + b}) stays in the denominator: vertical asymptote at x = ${b}`)
      .exact()
      .done(`f(x) = (x ${a < 0 ? '+ ' + -a : '- ' + a})/((x ${a < 0 ? '+ ' + -a : '- ' + a})(x ${b < 0 ? '+ ' + -b : '- ' + b})). At what x-value is the vertical asymptote?`, b, '', true);
  });

  add('pc1', 'Inverse of a linear function', () => {
    const m = pick([2, 3, 4, 5, -2, -3]), c = R(-9, 9, 1), y = R(-20, 20, 1), ans = r3((y - c) / m);
    return W()
      .l('Inverse function', `f(x) = ${m}x ${c < 0 ? '- ' + -c : '+ ' + c}`, `f^-1(${y}) = ?`, '')
      .f('f^-1(y) is the x that makes f(x) = y')
      .l(`${m}x ${c < 0 ? '- ' + -c : '+ ' + c} = ${y}`, `${m}x = ${y - c}`, `x = ${num(ans)}`)
      .done(`If f(x) = ${m}x ${c < 0 ? '- ' + -c : '+ ' + c}, find f^-1(${y}).`, ans, '', true);
  });

  add('pc1', 'Arithmetic sequence', () => {
    const a1 = R(-10, 20, 1), d = R(-5, 8, 1) || 3, n = R(5, 30, 1), an = a1 + (n - 1) * d;
    return W()
      .l('Arithmetic sequence', `a1 = ${a1}, d = ${d}`, `a${n} = ?`, '')
      .f('a(n) = a1 + (n - 1)d')
      .l(`a${n} = ${a1} + (${n - 1})(${d})`, `a${n} = ${an}`)
      .done(`An arithmetic sequence starts at ${a1} and has common difference ${d}. Find term ${n}.`, an, '', true);
  });

  add('pc2', 'Geometric sequence', () => {
    const a1 = R(1, 9, 1), r = pick([2, 3, 0.5, 1.5]), n = R(4, 9, 1), an = r3(a1 * r ** (n - 1));
    return W()
      .l('Geometric sequence', `g1 = ${a1}, r = ${g(r)}`, `g${n} = ?`, '')
      .f('g(n) = g1 r^(n - 1)')
      .l(`g${n} = ${a1}(${g(r)})^${n - 1}`, `g${n} = ${num(an)}`)
      .n('Geometric sequences are the discrete version of exponential functions.')
      .done(`A geometric sequence has first term ${a1} and common ratio ${g(r)}. Find term ${n}.`, an, '');
  });

  add('pc2', 'Exponential model', () => {
    const a = R(50, 2000, 50), b = pick([1.03, 1.05, 1.08, 1.12, 0.9, 0.85, 0.95]), t = R(3, 20, 1), v = r3(a * b ** t);
    return W()
      .l('Exponential model', `f(t) = ${a}(${b})^t`, `f(${t}) = ?`, '')
      .f('f(t) = a b^t; b > 1 is growth, 0 < b < 1 is decay')
      .l(`f(${t}) = ${a}(${b})^${t}`, `f(${t}) = ${num(v)}`)
      .n(`${b > 1 ? 'Growth' : 'Decay'} of ${g(r3(Math.abs(b - 1) * 100))}% per time unit.`)
      .done(`A quantity is modeled by f(t) = ${a}(${b})^t. Find f(${t}).`, v, '');
  });

  add('pc2', 'Solve an exponential equation', () => {
    const a = R(2, 20, 1), b = pick([2, 3, 1.5, 1.08, 5]), c = r3(a * R(3, 40, 1)), x = r3(Math.log(c / a) / Math.log(b));
    return W()
      .l('Exponential equation', `${a}(${b})^x = ${g(c)}`, '')
      .f('Divide by a, then take a log of both sides: x = log(c/a)/log(b)')
      .l(`(${b})^x = ${g(c)}/${a} = ${num(r3(c / a))}`, `x = ln(${num(r3(c / a))})/ln(${b})`, `x = ${num(x)}`)
      .done(`Solve ${a}(${b})^x = ${g(c)} for x.`, x, '');
  });

  add('pc2', 'Evaluate a logarithm', () => {
    const b = pick([2, 3, 5, 10]), k = R(-2, 6, 1), x = b ** k;
    return W()
      .l('Logarithm', `log base ${b} of ${g(x)}`, '')
      .f('log_b(x) = k means b^k = x')
      .l(`${b}^${k} = ${g(x)}`, `log_${b}(${g(x)}) = ${k}`)
      .exact()
      .done(`Evaluate log base ${b} of ${g(x)}.`, k, '', true);
  });

  add('pc2', 'Compound interest', () => {
    const P = R(500, 10000, 100), r = R(0.02, 0.08, 0.005), n = pick([1, 4, 12]), t = R(2, 20, 1), A = r3(P * (1 + r / n) ** (n * t));
    return W()
      .l('Compound interest', `P = ${P}, r = ${g(r)}, n = ${n} times per year, t = ${t} years`, '')
      .f('A = P(1 + r/n)^(nt)')
      .l(`A = ${P}(1 + ${g(r)}/${n})^(${n * t})`, `A = ${num(A)}`)
      .done(`$${P} is invested at ${g(r * 100)}% annual interest compounded ${n === 1 ? 'yearly' : n === 4 ? 'quarterly' : 'monthly'}. How much is there after ${t} years?`, A, 'dollars');
  });

  add('pc3', 'Period of a sinusoid', () => {
    const A = R(1, 9, 1), B = pick([2, 3, 4, 0.5, Math.PI / 6, Math.PI / 4]), D = R(-5, 5, 1);
    const Bs = B === Math.PI / 6 ? 'pi/6' : B === Math.PI / 4 ? 'pi/4' : g(B), per = r3((2 * Math.PI) / B);
    return W()
      .l('Sinusoidal function', `f(x) = ${A}sin(${Bs}x) ${D < 0 ? '- ' + -D : '+ ' + D}`, '')
      .f('period = 2pi/B; amplitude = |A|; midline y = D')
      .l(`period = 2pi/${Bs}`, `period = ${num(per)}`, `(amplitude ${A}, midline y = ${D})`)
      .done(`What is the period of f(x) = ${A}sin(${Bs}x) ${D < 0 ? '- ' + -D : '+ ' + D}?`, per, '');
  });

  add('pc3', 'Maximum of a sinusoid', () => {
    const A = R(1, 9, 1), D = R(-5, 10, 1), ans = A + D;
    return W()
      .l('Sinusoid range', `f(x) = ${A}cos(x) ${D < 0 ? '- ' + -D : '+ ' + D}`, '')
      .f('max = midline + amplitude; min = midline - amplitude')
      .l(`max = ${D} + ${A} = ${ans}`)
      .done(`What is the maximum value of f(x) = ${A}cos(x) ${D < 0 ? '- ' + -D : '+ ' + D}?`, ans, '', true);
  });

  add('pc3', 'Degrees to radians', () => {
    const d = pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 270, 300, 330]), rad = r3((d * Math.PI) / 180);
    const gcd = (a, b) => (b ? gcd(b, a % b) : a), k = gcd(d, 180);
    return W()
      .l('Radians', `${d} degrees`, '')
      .f('radians = degrees x pi/180')
      .l(`${d} x pi/180 = ${d / k === 1 ? '' : d / k}pi/${180 / k}`.replace('/1', ''), `= ${num(rad)}`)
      .done(`Convert ${d} degrees to radians (as a decimal).`, rad, 'rad');
  });

  add('pc3', 'Polar to rectangular', () => {
    const r = R(1, 10, 1), th = pick([30, 45, 60, 120, 135, 150, 210, 240, 300, 330]), x = r3(r * Math.cos((th * Math.PI) / 180));
    return W()
      .l('Polar to rectangular', `(r, theta) = (${r}, ${th} degrees)`, '')
      .f('x = r cos(theta), y = r sin(theta)')
      .l(`x = ${r}cos(${th} degrees)`, `x = ${num(x)}`)
      .done(`A point has polar coordinates (r, theta) = (${r}, ${th} degrees). What is its x-coordinate?`, x, '', true);
  });

  SW.mcqs('pc1', [
    ['end behavior', 'As x -> infinity, f(x) = -2x^5 + 3x^2 goes to:', ['infinity', '-infinity', '0', '-2'], 1, 'The leading term -2x^5 decides: odd degree, negative coefficient.'],
    ['multiplicity zeros', 'At a zero of even multiplicity, the graph:', ['Crosses the x-axis', 'Touches the x-axis and turns around', 'Has an asymptote', 'Has a hole'], 1, 'For example (x - 2)^2 bounces off x = 2.'],
    ['horizontal asymptote', 'f(x) = (3x^2 + 1)/(x^2 - 4) has a horizontal asymptote at:', ['y = 0', 'y = 3', 'y = 1/4', 'None'], 1, 'Same degree: ratio of leading coefficients, 3/1.'],
    ['concavity rate of change', 'If the rate of change of f is increasing, the graph of f is:', ['Concave up', 'Concave down', 'Linear', 'Decreasing'], 0, 'Slopes getting bigger means the graph bends upward.'],
  ]);
  SW.mcqs('pc2', [
    ['log properties', 'log(a) + log(b) equals:', ['log(a + b)', 'log(ab)', 'log(a)log(b)', 'log(a/b)'], 1, 'The product property of logarithms.'],
    ['exponential vs linear', 'A table where y-values have a constant RATIO over equal x-intervals is:', ['Linear', 'Quadratic', 'Exponential', 'Logarithmic'], 2, 'Linear has constant differences; exponential has constant ratios.'],
    ['inverse exp log', 'The inverse of f(x) = e^x is:', ['f^-1(x) = ln(x)', 'f^-1(x) = 1/e^x', 'f^-1(x) = -e^x', 'f^-1(x) = x^e'], 0, 'ln undoes e^x.'],
    ['semi log plot', 'Exponential data plotted with a log scale on the y-axis appears:', ['Curved upward', 'Linear', 'Periodic', 'Constant'], 1, 'Taking the log of y = ab^x gives a line in x.'],
  ]);
  SW.mcqs('pc3', [
    ['unit circle', 'sin(pi/6) =', ['1/2', 'sqrt(3)/2', 'sqrt(2)/2', '1'], 0, 'At 30 degrees the y-coordinate on the unit circle is 1/2.'],
    ['tangent', 'tan(theta) equals:', ['sin/cos', 'cos/sin', '1/sin', 'sin x cos'], 0, 'Slope of the terminal ray: y/x.'],
    ['phase shift', 'Compared with sin(x), sin(x - pi/2) is shifted:', ['Left pi/2', 'Right pi/2', 'Up pi/2', 'Down pi/2'], 1, 'Subtracting inside shifts right.'],
    ['polar rose', 'The polar graph r = cos(3 theta) is a:', ['Circle', 'Rose with 3 petals', 'Rose with 6 petals', 'Spiral'], 1, 'Odd n gives n petals.'],
  ]);

  SW.frq('pc2', 'Modeling with an exponential function',
    'A cup of coffee cools in a room. Its temperature above room temperature is 70 degrees at t = 0 minutes and 49 degrees at t = 5 minutes.\n(a) Write an exponential model D(t) = a b^t for the temperature difference.\n(b) Use your model to predict the difference at t = 12 minutes.\n(c) Find when the difference reaches 10 degrees. Show the use of logarithms.\n(d) Explain what the value of b means in context.',
    [[1, '(a) a = 70'], [1, '(a) b = (49/70)^(1/5) = 0.7^(0.2), about 0.931'], [1, '(b) D(12) = 70(0.931)^12, about 29.7 degrees'], [1, '(c) 10 = 70 b^t -> t = ln(1/7)/ln(b), about 27.3 minutes'], [1, '(d) Each minute the difference is multiplied by about 0.931 (decreases about 6.9% per minute)']],
    '(a) a = 70. 70 b^5 = 49, so b^5 = 0.7 and b = 0.7^(1/5) = 0.9312. D(t) = 70(0.9312)^t.\n(b) D(12) = 70(0.9312)^12 = 29.7 degrees above room temperature.\n(c) 70(0.9312)^t = 10, so (0.9312)^t = 1/7 and t = ln(1/7)/ln(0.9312) = 27.3 minutes.\n(d) b = 0.931 means each minute the temperature difference is 93.1% of what it was, a decrease of about 6.9% per minute.');
  SW.frq('pc3', 'Ferris wheel sinusoid',
    'A Ferris wheel has a diameter of 40 m and its center is 25 m above the ground. It makes one full turn every 8 minutes. A rider starts at the lowest point at t = 0.\n(a) Find the amplitude, midline and period.\n(b) Write a function h(t) for the rider\'s height in meters.\n(c) Find the rider\'s height at t = 3 minutes.\n(d) On the interval 0 < t < 4, is the height increasing or decreasing, and is the rate of change increasing or decreasing at t = 1? Explain.',
    [[1, '(a) amplitude 20, midline y = 25, period 8'], [2, '(b) h(t) = -20cos(pi t/4) + 25 (or equivalent); 1 point if B or phase is wrong'], [1, '(c) h(3) = -20cos(3pi/4) + 25 = about 39.1 m'], [1, '(d) Increasing from the bottom to the top; at t = 1 the graph is concave up so the rate of change is increasing']],
    '(a) Amplitude = 20 m (half the diameter), midline y = 25 m, period = 8 min.\n(b) Starting at the minimum: h(t) = -20cos((2pi/8)t) + 25 = -20cos(pi t/4) + 25.\n(c) h(3) = -20cos(3pi/4) + 25 = -20(-0.7071) + 25 = 39.1 m.\n(d) From t = 0 to 4 the rider goes from the bottom to the top, so height is increasing. At t = 1 (before the midline at t = 2) the graph is concave up, so the rate of change is increasing.');

  SW.REF.precalc = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Polynomial and rational</h4><table>
        <tr><td class="eqn">average rate of change = (f(b) - f(a))/(b - a)</td></tr>
        <tr><td class="eqn">end behavior: leading term decides</td></tr><tr><td class="eqn">even multiplicity: touch; odd: cross</td></tr>
        <tr><td class="eqn">canceled factor: hole; remaining denominator factor: vertical asymptote</td></tr>
        <tr><td class="eqn">horizontal asymptote: compare degrees</td></tr>
        <tr><td class="eqn">arithmetic: a(n) = a1 + (n - 1)d</td></tr></table></div>
      <div class="ref-unit"><h4>Exponential and logarithmic</h4><table>
        <tr><td class="eqn">f(x) = a b^x; geometric g(n) = g1 r^(n - 1)</td></tr>
        <tr><td class="eqn">log_b(x) = y means b^y = x</td></tr>
        <tr><td class="eqn">log(xy) = log x + log y; log(x/y) = log x - log y; log(x^k) = k log x</td></tr>
        <tr><td class="eqn">change of base: log_b(x) = ln x / ln b</td></tr>
        <tr><td class="eqn">A = P(1 + r/n)^(nt); A = Pe^(rt)</td></tr></table></div>
      <div class="ref-unit"><h4>Trigonometric and polar</h4><table>
        <tr><td class="eqn">f(x) = a sin(b(x + c)) + d: amplitude |a|, period 2pi/|b|, midline y = d</td></tr>
        <tr><td class="eqn">sin^2 x + cos^2 x = 1</td></tr><tr><td class="eqn">tan x = sin x / cos x</td></tr>
        <tr><td class="eqn">radians = degrees x pi/180</td></tr>
        <tr><td class="eqn">x = r cos(theta), y = r sin(theta), r^2 = x^2 + y^2</td></tr>
        <tr><td class="eqn">sin(a + b) = sin a cos b + cos a sin b</td></tr></table></div>
    </div>`;
})();
