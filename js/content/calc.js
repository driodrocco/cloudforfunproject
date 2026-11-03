/* AP Calculus AB and BC: problem generators with worked steps, concept
 * questions, free-response practice, and the reference sheet.
 * Topics only on BC are tagged { only: ['calcbc'] }. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick, W, add } = SW;
  const BC = { only: ['calcbc'] };

  // ---------- helpers ----------
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  function fr(n, d) { // reduced fraction as plain text
    if (d < 0) { n = -n; d = -d; }
    const k = gcd(n, d) || 1;
    n /= k; d /= k;
    return d === 1 ? String(n) : `${n}/${d}`;
  }
  // terms: [[coef, power], ...] highest power first -> "3x^2 - 5x + 1"
  function poly(terms, v = 'x') {
    let s = '';
    for (const [c, p] of terms) {
      if (c === 0) continue;
      const a = Math.abs(c);
      const coef = a === 1 && p !== 0 ? '' : g(a);
      const body = p === 0 ? coef : `${coef}${v}${p === 1 ? '' : '^' + p}`;
      s += s ? (c < 0 ? ' - ' : ' + ') + body : (c < 0 ? '-' : '') + body;
    }
    return s || '0';
  }
  const paren = x => (x < 0 ? `(${g(x)})` : g(x));
  const nz = () => pick([-1, 1]) * R(1, 6, 1);

  // ================= Unit 1: Limits and Continuity =================
  add('calc1', 'Limit by factoring', () => {
    const a = R(1, 9, 1), ans = 2 * a;
    return W()
      .l('Limit (0/0 form)', `lim x->${a} (x^2 - ${a * a})/(x - ${a})`, '')
      .l(`Plug in x = ${a}: (${a * a} - ${a * a})/(${a} - ${a}) = 0/0, so factor first`)
      .f('x^2 - a^2 = (x - a)(x + a)')
      .l(`= lim x->${a} (x - ${a})(x + ${a})/(x - ${a})`, `= lim x->${a} (x + ${a})`, `= ${a} + ${a}`, `= ${ans}`)
      .n('0/0 does not mean the limit is 0 or that it does not exist. It means do more algebra.')
      .done(`Find lim as x -> ${a} of (x^2 - ${a * a})/(x - ${a}).`, ans, '');
  });

  add('calc1', 'Limit of a quadratic over a linear factor', () => {
    const r = R(1, 6, 1);
    let s; do { s = R(-6, 6, 1); } while (s === r);
    const ans = r - s, top = poly([[1, 2], [-(r + s), 1], [r * s, 0]]);
    return W()
      .l('Limit (0/0 form)', `lim x->${r} (${top})/(x - ${r})`, '')
      .l(`Plug in x = ${r}: 0/0, so factor the top`)
      .f('Factor, cancel the common factor, then plug in')
      .l(`${top} = (x - ${r})(${poly([[1, 1], [-s, 0]])})`, `= lim x->${r} (${poly([[1, 1], [-s, 0]])})`, `= ${r} ${s < 0 ? '+ ' + -s : '- ' + s}`, `= ${ans}`)
      .done(`Find lim as x -> ${r} of (${top})/(x - ${r}).`, ans, '');
  });

  add('calc1', 'Limit at infinity', () => {
    const a = nz(), b = R(1, 7, 1), c = R(-9, 9, 1), d = R(1, 9, 1), ans = r3(a / b);
    return W()
      .l('Limit at infinity (same degree top and bottom)', `lim x->infinity (${poly([[a, 2], [c, 1], [5, 0]])})/(${poly([[b, 2], [d, 0]])})`, '')
      .f('Same degree: the limit is the ratio of the leading coefficients')
      .l(`= ${a}/${b}`, `= ${fr(a, b)}${b === 1 ? '' : ` = ${num(ans)}`}`)
      .n('Divide every term by x^2. Everything except the leading terms goes to 0.')
      .done(`Find lim as x -> infinity of (${poly([[a, 2], [c, 1], [5, 0]])})/(${poly([[b, 2], [d, 0]])}).`, ans, '', true);
  });

  add('calc1', 'Make a piecewise function continuous', () => {
    const a = pick([2, 3, 4]), k = R(-3, 6, 1), p = a * a + k - k * a;
    return W()
      .l('Continuity', `f(x) = kx ${p < 0 ? '- ' + -p : '+ ' + p} for x < ${a}`, `f(x) = x^2 + k for x >= ${a}`, 'k = ?', '')
      .f('Continuous at x = a means the left piece and the right piece meet: lim from left = lim from right = f(a)')
      .l(`k(${a}) ${p < 0 ? '- ' + -p : '+ ' + p} = (${a})^2 + k`, `${a}k ${p < 0 ? '- ' + -p : '+ ' + p} = ${a * a} + k`, `${a - 1}k = ${a * a - p}`, `k = ${k}`)
      .n('Plug the break point into BOTH pieces and set them equal.')
      .done(`f(x) = kx ${p < 0 ? '- ' + -p : '+ ' + p} for x < ${a} and f(x) = x^2 + k for x >= ${a}. What value of k makes f continuous everywhere?`, k, '', true);
  });

  add('calc1', 'Special trig limit', () => {
    const a = R(2, 9, 1), b = R(2, 9, 1), ans = r3(a / b);
    return W()
      .l('Special limit', `lim x->0 sin(${a}x)/(${b}x)`, '')
      .f('lim u->0 sin(u)/u = 1')
      .l(`= lim x->0 (${a}/${b}) * sin(${a}x)/(${a}x)`, `= (${a}/${b})(1)`, `= ${fr(a, b)}${a % b ? ' = ' + num(ans) : ''}`)
      .n('Multiply and divide by the number inside the sine so it matches sin(u)/u.')
      .done(`Find lim as x -> 0 of sin(${a}x)/(${b}x).`, ans, '');
  });

  // ================= Unit 2: Derivative basics =================
  add('calc2', 'Power rule: derivative at a point', () => {
    const a3 = nz(), a2 = R(-6, 6, 1), a1 = R(-9, 9, 1), c = R(-3, 3, 1);
    const f = poly([[a3, 3], [a2, 2], [a1, 1], [R(-9, 9, 1), 0]]), fp = poly([[3 * a3, 2], [2 * a2, 1], [a1, 0]]);
    const ans = 3 * a3 * c * c + 2 * a2 * c + a1;
    return W()
      .l('Power rule', `f(x) = ${f}`, `f'(${c}) = ?`, '')
      .f('d/dx x^n = nx^(n-1)')
      .l(`f'(x) = ${fp}`, `f'(${c}) = ${3 * a3}${paren(c)}^2 ${2 * a2 < 0 ? '- ' + -2 * a2 : '+ ' + 2 * a2}${paren(c)} ${a1 < 0 ? '- ' + -a1 : '+ ' + a1}`, `f'(${c}) = ${ans}`)
      .n('The constant term disappears when you take the derivative.')
      .done(`If f(x) = ${f}, find f'(${c}).`, ans, '', true);
  });

  add('calc2', 'Recognize the limit definition', () => {
    const n = pick([2, 3, 4]), c = R(1, 5, 1), ans = n * c ** (n - 1);
    return W()
      .l('Definition of the derivative', `lim h->0 ((${c} + h)^${n} - ${c ** n})/h`, '')
      .f("f'(a) = lim h->0 (f(a + h) - f(a))/h")
      .l(`This is f'(${c}) for f(x) = x^${n}`, `f'(x) = ${n}x^${n - 1}`, `f'(${c}) = ${n}(${c})^${n - 1} = ${ans}`)
      .n(`${c ** n} is just ${c}^${n}, which is f(${c}). Spotting that saves a lot of algebra.`)
      .done(`Find lim as h -> 0 of ((${c} + h)^${n} - ${c ** n})/h.`, ans, '');
  });

  add('calc2', 'Product rule', () => {
    const a = R(1, 5, 1), b = R(-5, 5, 1), c = R(1, 4, 1), d = R(-5, 5, 1), x0 = R(-2, 3, 1);
    const u = a * x0 + b, v = c * x0 * x0 + d, ans = a * v + u * 2 * c * x0;
    return W()
      .l('Product rule', `f(x) = (${poly([[a, 1], [b, 0]])})(${poly([[c, 2], [d, 0]])})`, `f'(${x0}) = ?`, '')
      .f("(uv)' = u'v + uv'")
      .l(`u = ${poly([[a, 1], [b, 0]])}, u' = ${a}`, `v = ${poly([[c, 2], [d, 0]])}, v' = ${2 * c}x`)
      .l(`f'(x) = (${a})(${poly([[c, 2], [d, 0]])}) + (${poly([[a, 1], [b, 0]])})(${2 * c}x)`)
      .l(`f'(${x0}) = (${a})(${v}) + (${u})(${2 * c * x0})`, `f'(${x0}) = ${ans}`)
      .done(`If f(x) = (${poly([[a, 1], [b, 0]])})(${poly([[c, 2], [d, 0]])}), find f'(${x0}).`, ans, '', true);
  });

  add('calc2', 'Quotient rule', () => {
    let a, b, c, d, x0, den;
    do { a = R(1, 6, 1); b = R(-6, 6, 1); c = R(1, 4, 1); d = R(-5, 5, 1); x0 = R(-2, 3, 1); den = c * x0 + d; } while (den === 0 || a * d - b * c === 0);
    const top = a * d - b * c, ans = r3(top / (den * den));
    return W()
      .l('Quotient rule', `f(x) = (${poly([[a, 1], [b, 0]])})/(${poly([[c, 1], [d, 0]])})`, `f'(${x0}) = ?`, '')
      .f("(u/v)' = (u'v - uv')/v^2")
      .l(`f'(x) = ((${a})(${poly([[c, 1], [d, 0]])}) - (${poly([[a, 1], [b, 0]])})(${c}))/(${poly([[c, 1], [d, 0]])})^2`)
      .l(`f'(x) = ${top}/(${poly([[c, 1], [d, 0]])})^2`, `f'(${x0}) = ${top}/(${den})^2 = ${fr(top, den * den)}${Number.isInteger(top / den / den) ? '' : ' = ' + num(ans)}`)
      .n('Low d-high minus high d-low, over low squared. The order on top matters.')
      .done(`If f(x) = (${poly([[a, 1], [b, 0]])})/(${poly([[c, 1], [d, 0]])}), find f'(${x0}).`, ans, '', true);
  });

  add('calc2', 'Tangent line', () => {
    const b = R(-6, 6, 1), k = R(-9, 9, 1), c = R(-3, 4, 1);
    const fc = c * c + b * c + k, m = 2 * c + b, yint = fc - m * c;
    return W()
      .l('Tangent line', `f(x) = ${poly([[1, 2], [b, 1], [k, 0]])}, at x = ${c}`, '')
      .f("y - f(a) = f'(a)(x - a)")
      .l(`f(${c}) = ${fc}`, `f'(x) = ${poly([[2, 1], [b, 0]])}, so f'(${c}) = ${m}`, `y - ${paren(fc)} = ${m}(x - ${paren(c)})`, `y = ${poly([[m, 1], [yint, 0]])}`, `y-intercept = ${yint}`)
      .done(`Find the y-intercept of the line tangent to f(x) = ${poly([[1, 2], [b, 1], [k, 0]])} at x = ${c}.`, yint, '', true);
  });

  add('calc2', 'Derivative of sine and cosine', () => {
    const a = nz(), b = nz(), ans = -b;
    return W()
      .l('Trig derivatives', `f(x) = ${a}sin(x) ${b < 0 ? '- ' + -b : '+ ' + b}cos(x)`, "f'(pi/2) = ?", '')
      .f("d/dx sin(x) = cos(x), d/dx cos(x) = -sin(x)")
      .l(`f'(x) = ${a}cos(x) ${b < 0 ? '+ ' + -b : '- ' + b}sin(x)`, `f'(pi/2) = ${a}(0) ${b < 0 ? '+ ' + -b : '- ' + b}(1)`, `f'(pi/2) = ${ans}`)
      .n('cos(pi/2) = 0 and sin(pi/2) = 1.')
      .done(`If f(x) = ${a}sin(x) ${b < 0 ? '- ' + -b : '+ ' + b}cos(x), find f'(pi/2).`, ans, '', true);
  });

  // ================= Unit 3: Chain, implicit, inverse =================
  add('calc3', 'Chain rule', () => {
    const n = R(2, 4, 1), a = R(1, 3, 1), b = R(-3, 3, 1), x0 = R(0, 2, 1);
    const inner = a * x0 + b, ans = n * a * inner ** (n - 1);
    return W()
      .l('Chain rule', `f(x) = (${poly([[a, 1], [b, 0]])})^${n}`, `f'(${x0}) = ?`, '')
      .f("d/dx [u^n] = n u^(n-1) u'")
      .l(`f'(x) = ${n}(${poly([[a, 1], [b, 0]])})^${n - 1}(${a})`, `f'(${x0}) = ${n}(${inner})^${n - 1}(${a})`, `f'(${x0}) = ${ans}`)
      .n("Don't forget to multiply by the derivative of the inside.")
      .done(`If f(x) = (${poly([[a, 1], [b, 0]])})^${n}, find f'(${x0}).`, ans, '', true);
  });

  add('calc3', 'Implicit differentiation: circle', () => {
    const [x, y, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
    const sx = pick([1, -1]), sy = pick([1, -1]), X = sx * x, Y = sy * y, ans = r3(-X / Y);
    return W()
      .l('Implicit differentiation', `x^2 + y^2 = ${r * r}, at the point (${X}, ${Y})`, '')
      .f('Differentiate both sides with respect to x; d/dx [y^2] = 2y dy/dx')
      .l('2x + 2y dy/dx = 0', 'dy/dx = -x/y', `dy/dx = -(${X})/(${Y})`, `dy/dx = ${fr(-X, Y)} = ${num(ans)}`)
      .done(`Find dy/dx for x^2 + y^2 = ${r * r} at the point (${X}, ${Y}).`, ans, '', true);
  });

  add('calc3', 'Derivative of an inverse function', () => {
    const a = R(1, 3, 1), k = R(1, 4, 1), b = a ** 3 + k * a, fp = 3 * a * a + k, ans = r3(1 / fp);
    return W()
      .l('Inverse function derivative', `f(x) = x^3 + ${k}x, and f(${a}) = ${b}`, `(f^-1)'(${b}) = ?`, '')
      .f("(f^-1)'(b) = 1/f'(a), where f(a) = b")
      .l(`f'(x) = 3x^2 + ${k}`, `f'(${a}) = 3(${a})^2 + ${k} = ${fp}`, `(f^-1)'(${b}) = 1/${fp} = ${num(ans)}`)
      .n(`Plug in a = ${a} (the x-value of f), not ${b}.`)
      .done(`Let f(x) = x^3 + ${k}x. Find the derivative of the inverse of f at x = ${b}.`, ans, '');
  });

  add('calc3', 'Derivative of a natural log', () => {
    const a = R(1, 6, 1), ans = r3((2 * a) / (a + 1));
    return W()
      .l('Chain rule with ln', `f(x) = ln(${a}x^2 + 1)`, "f'(1) = ?", '')
      .f("d/dx ln(u) = u'/u")
      .l(`f'(x) = ${2 * a}x/(${a}x^2 + 1)`, `f'(1) = ${2 * a}/(${a + 1}) = ${fr(2 * a, a + 1)}${(2 * a) % (a + 1) ? ' = ' + num(ans) : ''}`)
      .done(`If f(x) = ln(${a}x^2 + 1), find f'(1).`, ans, '');
  });

  add('calc3', 'Derivative of an exponential', () => {
    const c = R(1, 9, 1), k = nz(), ans = c * k;
    return W()
      .l('Chain rule with e^x', `f(x) = ${c}e^(${k}x)`, "f'(0) = ?", '')
      .f("d/dx e^(kx) = k e^(kx)")
      .l(`f'(x) = ${c}(${k})e^(${k}x)`, `f'(0) = ${c * k}e^0 = ${ans}`)
      .done(`If f(x) = ${c}e^(${k}x), find f'(0).`, ans, '', true);
  });

  // ================= Unit 4: Contextual applications =================
  add('calc4', 'Related rates: growing circle', () => {
    const r = R(2, 20, 1), dr = R(0.5, 4, 0.5), ans = r3(2 * Math.PI * r * dr);
    return W()
      .l('Related rates', `r = ${r} cm`, `dr/dt = ${g(dr)} cm/s`, 'dA/dt = ?', '')
      .f('A = pi r^2, so dA/dt = 2 pi r dr/dt')
      .l(`dA/dt = 2pi(${r} cm)(${g(dr)} cm/s)`, `dA/dt = ${num(ans)} cm^2/s`)
      .n('Plug in r only AFTER taking the derivative.')
      .done(`A circular oil spill's radius grows at ${g(dr)} cm/s. How fast is its area growing when r = ${r} cm?`, ans, 'cm^2/s');
  });

  add('calc4', 'Related rates: sliding ladder', () => {
    const [x, y, L] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [7, 24, 25]]), dx = R(0.5, 3, 0.5);
    const ans = r3((-x / y) * dx);
    return W()
      .l('Related rates', `L = ${L} ft (ladder)`, `x = ${x} ft (bottom from the wall)`, `y = ${y} ft (top height)`, `dx/dt = +${g(dx)} ft/s`, 'dy/dt = ?', '')
      .f('x^2 + y^2 = L^2, so 2x dx/dt + 2y dy/dt = 0')
      .l(`2(${x})(${g(dx)}) + 2(${y})dy/dt = 0`, `dy/dt = ${num(ans)} ft/s`)
      .n('Negative means the top is sliding DOWN.')
      .done(`A ${L} ft ladder leans on a wall. The bottom slides away at ${g(dx)} ft/s. How fast is the top moving when the bottom is ${x} ft from the wall?`, ans, 'ft/s', true);
  });

  add('calc4', 'Particle motion: velocity', () => {
    const p = R(1, 5, 1), q = R(-5, 9, 1), t = R(1, 5, 1), v = 3 * t * t - 2 * p * t + q;
    return W()
      .l('Motion', `x(t) = ${poly([[1, 3], [-p, 2], [q, 1]], 't')}`, `v(${t}) = ?`, '')
      .f("v(t) = x'(t)")
      .l(`v(t) = ${poly([[3, 2], [-2 * p, 1], [q, 0]], 't')}`, `v(${t}) = 3(${t})^2 - ${2 * p}(${t}) ${q < 0 ? '- ' + -q : '+ ' + q}`, `v(${t}) = ${v}`)
      .n('A negative velocity means the particle moves left (or down).')
      .done(`A particle's position is x(t) = ${poly([[1, 3], [-p, 2], [q, 1]], 't')}. What is its velocity at t = ${t}?`, v, '', true);
  });

  add('calc4', 'Linear approximation', () => {
    const n = R(3, 10, 1), d = R(1, 4, 1), ans = r3(n + d / (2 * n));
    return W()
      .l('Local linear approximation', `f(x) = sqrt(x), near x = ${n * n}`, `f(${n * n + d}) is about ?`, '')
      .f("L(x) = f(a) + f'(a)(x - a)")
      .l(`f(${n * n}) = ${n}`, `f'(x) = 1/(2 sqrt(x)), so f'(${n * n}) = 1/${2 * n}`, `L(${n * n + d}) = ${n} + (1/${2 * n})(${d})`, `L(${n * n + d}) = ${num(ans)}`)
      .n('Pick a nearby point where the square root is easy.')
      .done(`Use a tangent line approximation at x = ${n * n} to estimate sqrt(${n * n + d}).`, ans, '');
  });

  add('calc4', "L'Hospital's rule", () => {
    const a = R(1, 9, 1), b = R(1, 9, 1), ans = r3(a / b);
    return W()
      .l("L'Hospital's rule", `lim x->0 (e^(${a}x) - 1)/(${b}x)`, '')
      .l('Plug in x = 0: (1 - 1)/0 = 0/0')
      .f("If 0/0, then lim f/g = lim f'/g'")
      .l(`= lim x->0 ${a}e^(${a}x)/${b}`, `= ${a}/${b}`, `= ${num(ans)}`)
      .n('Take the derivative of the top and bottom separately. Not the quotient rule!')
      .done(`Find lim as x -> 0 of (e^(${a}x) - 1)/(${b}x).`, ans, '');
  });

  // ================= Unit 5: Analytical applications =================
  add('calc5', 'Local maximum', () => {
    const p = R(1, 4, 1), c = R(-9, 9, 1), ans = 2 * p ** 3 + c;
    return W()
      .l('First and second derivative tests', `f(x) = ${poly([[1, 3], [-3 * p * p, 1], [c, 0]])}`, 'local max value = ?', '')
      .f("Critical points: f'(x) = 0. Second derivative test: f'' < 0 means local max")
      .l(`f'(x) = 3x^2 - ${3 * p * p} = 0, so x = ${p} or x = -${p}`, "f''(x) = 6x")
      .l(`f''(-${p}) = ${-6 * p} < 0, so local max at x = -${p}`, `f(-${p}) = ${-(p ** 3)} + ${3 * p ** 3}${c < 0 ? ' - ' + -c : ' + ' + c} = ${ans}`)
      .done(`Find the local maximum VALUE of f(x) = ${poly([[1, 3], [-3 * p * p, 1], [c, 0]])}.`, ans, '', true);
  });

  add('calc5', 'Mean Value Theorem', () => {
    const b = R(-6, 6, 1), a1 = R(-3, 2, 1), a2 = a1 + R(2, 6, 1), ans = (a1 + a2) / 2;
    const f = x => x * x + b * x, slope = (f(a2) - f(a1)) / (a2 - a1);
    return W()
      .l('Mean Value Theorem', `f(x) = ${poly([[1, 2], [b, 1]])} on [${a1}, ${a2}]`, '')
      .f("f'(c) = (f(b) - f(a))/(b - a)")
      .l(`(f(${a2}) - f(${a1}))/(${a2} - ${a1}) = (${f(a2)} - ${paren(f(a1))})/${a2 - a1} = ${slope}`, `f'(c) = 2c ${b < 0 ? '- ' + -b : '+ ' + b} = ${slope}`, `c = ${g(ans)}`)
      .n('For a parabola, c is always the midpoint of the interval.')
      .done(`For f(x) = ${poly([[1, 2], [b, 1]])} on [${a1}, ${a2}], find the value c guaranteed by the Mean Value Theorem.`, ans, '', true);
  });

  add('calc5', 'Optimization: fence along a river', () => {
    const P = R(100, 1200, 20), x = P / 4, A = r3((P * P) / 8);
    return W()
      .l('Optimization', `${P} ft of fence, river is the 4th side`, 'max area = ?', '')
      .l(`Let x = each side touching the river. Then the far side = ${P} - 2x`, `A(x) = x(${P} - 2x) = ${P}x - 2x^2`)
      .f("Max: set A'(x) = 0")
      .l(`A'(x) = ${P} - 4x = 0`, `x = ${g(x)} ft`, `A = ${g(x)}(${P} - ${g(2 * x)}) = ${num(A)} ft^2`)
      .n("A''(x) = -4 < 0, so this really is a maximum.")
      .done(`A farmer has ${P} ft of fence to make a rectangular pen along a straight river (no fence on the river side). What is the largest area possible?`, A, 'ft^2');
  });

  add('calc5', 'Inflection point', () => {
    const a = nz(), k = R(-4, 4, 1), b = -3 * a * k, c1 = R(-9, 9, 1), ans = k;
    const f = poly([[a, 3], [b, 2], [c1, 1], [3, 0]]);
    return W()
      .l('Inflection point', `f(x) = ${f}`, '')
      .f("Inflection point: f'' changes sign")
      .l(`f'(x) = ${poly([[3 * a, 2], [2 * b, 1], [c1, 0]])}`, `f''(x) = ${poly([[6 * a, 1], [2 * b, 0]])} = 0`, `x = ${ans}`)
      .n("f'' is a line, so it changes sign where it crosses zero.")
      .done(`At what x-value does f(x) = ${f} have an inflection point?`, ans, '', true);
  });

  add('calc5', 'Absolute maximum on a closed interval', () => {
    const h = R(1, 5, 1), m = h + R(1, 4, 1), c = R(-5, 9, 1);
    const f = x => -x * x + 2 * h * x + c, ans = f(h);
    return W()
      .l('Candidates test', `f(x) = ${poly([[-1, 2], [2 * h, 1], [c, 0]])} on [0, ${m}]`, '')
      .f('Check critical points AND endpoints')
      .l(`f'(x) = -2x + ${2 * h} = 0, so x = ${h}`, `f(0) = ${f(0)}`, `f(${h}) = ${f(h)}`, `f(${m}) = ${f(m)}`, `absolute max = ${ans}`)
      .done(`Find the absolute maximum value of f(x) = ${poly([[-1, 2], [2 * h, 1], [c, 0]])} on [0, ${m}].`, ans, '', true);
  });

  // ================= Unit 6: Integration =================
  add('calc6', 'Definite integral of a polynomial', () => {
    const p = R(-3, 3, 1) || 1, q = R(-4, 4, 1), r = R(-6, 6, 1), a = R(0, 2, 1), b = a + R(1, 3, 1);
    const F = x => p * x ** 3 + q * x * x + r * x, ans = F(b) - F(a);
    return W()
      .l('Fundamental Theorem of Calculus', `integral from ${a} to ${b} of (${poly([[3 * p, 2], [2 * q, 1], [r, 0]])}) dx`, '')
      .f('integral from a to b of f(x) dx = F(b) - F(a)')
      .l(`F(x) = ${poly([[p, 3], [q, 2], [r, 1]])}`, `F(${b}) - F(${a}) = ${F(b)} - ${paren(F(a))}`, `= ${ans}`)
      .done(`Evaluate the integral from ${a} to ${b} of (${poly([[3 * p, 2], [2 * q, 1], [r, 0]])}) dx.`, ans, '', true);
  });

  add('calc6', 'Riemann sum from a table', () => {
    const dx = pick([1, 2, 3]), xs = [0, 1, 2, 3, 4].map(i => i * dx), ys = xs.map(() => R(1, 20, 1));
    const kind = pick(['left', 'right', 'trapezoid']);
    let ans, work;
    if (kind === 'left') { ans = dx * (ys[0] + ys[1] + ys[2] + ys[3]); work = `${dx}(${ys.slice(0, 4).join(' + ')})`; }
    else if (kind === 'right') { ans = dx * (ys[1] + ys[2] + ys[3] + ys[4]); work = `${dx}(${ys.slice(1).join(' + ')})`; }
    else { ans = (dx / 2) * (ys[0] + 2 * ys[1] + 2 * ys[2] + 2 * ys[3] + ys[4]); work = `(${dx}/2)(${ys[0]} + 2(${ys[1]}) + 2(${ys[2]}) + 2(${ys[3]}) + ${ys[4]})`; }
    const table = `x: ${xs.join(', ')} | f(x): ${ys.join(', ')}`;
    return W()
      .l(`${kind[0].toUpperCase() + kind.slice(1)} Riemann sum, 4 equal subintervals`, table, `width = ${dx}`, '')
      .f(kind === 'trapezoid' ? 'Trapezoid: (width/2)(f0 + 2f1 + 2f2 + 2f3 + f4)' : `${kind === 'left' ? 'Left' : 'Right'}: width times the sum of the ${kind} heights`)
      .l(`= ${work}`, `= ${g(ans)}`)
      .done(`Use a ${kind === 'trapezoid' ? 'trapezoidal sum' : kind + ' Riemann sum'} with the 4 subintervals in the table to approximate the integral from 0 to ${4 * dx} of f(x) dx.  ${table}`, ans, '');
  });

  add('calc6', 'u-substitution', () => {
    const n = R(1, 4, 1), ans = r3((2 ** (n + 1) - 1) / (n + 1));
    return W()
      .l('u-substitution', `integral from 0 to 1 of 2x(x^2 + 1)^${n} dx`, '')
      .f('Let u = inside; du = derivative of inside dx; change the bounds too')
      .l('u = x^2 + 1, du = 2x dx', 'x = 0 -> u = 1, x = 1 -> u = 2', `= integral from 1 to 2 of u^${n} du`, `= [u^${n + 1}/${n + 1}] from 1 to 2`, `= (${2 ** (n + 1)} - 1)/${n + 1}`, `= ${fr(2 ** (n + 1) - 1, n + 1)}${(2 ** (n + 1) - 1) % (n + 1) ? ' = ' + num(ans) : ''}`)
      .n('If you change the bounds to u-values, you never have to go back to x.')
      .done(`Evaluate the integral from 0 to 1 of 2x(x^2 + 1)^${n} dx.`, ans, '');
  });

  add('calc6', 'Average value of a function', () => {
    const k = R(1, 6, 1), c = R(-5, 5, 1), b = pick([3, 6, 9]), ans = (k * b * b) / 3 + c;
    return W()
      .l('Average value', `f(x) = ${poly([[k, 2], [c, 0]])} on [0, ${b}]`, '')
      .f('average = (1/(b - a)) integral from a to b of f(x) dx')
      .l(`integral from 0 to ${b} = [${k}x^3/3 ${c < 0 ? '- ' + -c : '+ ' + c}x] = ${(k * b ** 3) / 3 + c * b}`, `average = (1/${b})(${(k * b ** 3) / 3 + c * b})`, `average = ${g(ans)}`)
      .done(`Find the average value of f(x) = ${poly([[k, 2], [c, 0]])} on the interval [0, ${b}].`, ans, '', true);
  });

  add('calc6', 'Fundamental Theorem with a variable bound', () => {
    const k = R(1, 6, 1), c = R(1, 3, 1), ans = (c ** 4 + k) * 2 * c;
    return W()
      .l('FTC part 1 with the chain rule', `g(x) = integral from 1 to x^2 of (t^2 + ${k}) dt`, `g'(${c}) = ?`, '')
      .f('d/dx integral from a to u(x) of f(t) dt = f(u(x)) * u\'(x)')
      .l(`g'(x) = ((x^2)^2 + ${k})(2x)`, `g'(${c}) = (${c ** 4} + ${k})(${2 * c})`, `g'(${c}) = ${ans}`)
      .n('Plug the upper bound into the function, then multiply by its derivative.')
      .done(`Let g(x) = the integral from 1 to x^2 of (t^2 + ${k}) dt. Find g'(${c}).`, ans, '');
  });

  add('calc6', 'Accumulation: filling a tank', () => {
    const A0 = R(50, 400, 10), p = R(5, 30, 1), q = R(1, 6, 1), T = R(4, 12, 1), ans = A0 + p * T + (q * T * T) / 2;
    return W()
      .l('Accumulation', `starts with ${A0} gal`, `rate in r(t) = ${p} + ${q}t gal/min`, `0 <= t <= ${T}`, '')
      .f('amount = starting amount + integral of the rate')
      .l(`= ${A0} + integral from 0 to ${T} of (${p} + ${q}t) dt`, `= ${A0} + [${p}t + ${q}t^2/2] from 0 to ${T}`, `= ${A0} + ${p * T + (q * T * T) / 2}`, `= ${g(ans)} gal`)
      .done(`A tank holds ${A0} gallons. Water flows in at r(t) = ${p} + ${q}t gallons per minute. How much water is in the tank after ${T} minutes?`, ans, 'gal');
  });

  add('calc6', 'Integration by parts', () => {
    const b = R(1, 3, 1), ans = r3((b - 1) * Math.exp(b) + 1);
    return W()
      .l('Integration by parts', `integral from 0 to ${b} of x e^x dx`, '')
      .f('integral u dv = uv - integral v du')
      .l('u = x, dv = e^x dx, du = dx, v = e^x', `= [x e^x] from 0 to ${b} - integral from 0 to ${b} of e^x dx`, `= [x e^x - e^x] from 0 to ${b}`, `= (${b}e^${b} - e^${b}) - (0 - 1)`, `= ${b - 1 ? b - 1 + 'e^' + b + ' + 1' : '1'} = ${num(ans)}`)
      .n('LIATE: pick u = the polynomial so it gets simpler.')
      .done(`Evaluate the integral from 0 to ${b} of x e^x dx.`, ans, '');
  }, BC);

  add('calc6', 'Partial fractions', () => {
    const b = R(2, 6, 1), ans = r3(Math.log((2 * b) / (b + 1)));
    return W()
      .l('Partial fractions', `integral from 1 to ${b} of 1/(x(x + 1)) dx`, '')
      .f('1/(x(x + 1)) = A/x + B/(x + 1)')
      .l('1 = A(x + 1) + Bx -> A = 1, B = -1', `= [ln|x| - ln|x + 1|] from 1 to ${b}`, `= ln(${b}/${b + 1}) - ln(1/2)`, `= ln(${fr(2 * b, b + 1)})`, `= ${num(ans)}`)
      .done(`Evaluate the integral from 1 to ${b} of 1/(x(x + 1)) dx.`, ans, '');
  }, BC);

  add('calc6', 'Improper integral', () => {
    const p = pick([2, 3, 4, 1.5]), ans = r3(1 / (p - 1));
    return W()
      .l('Improper integral', `integral from 1 to infinity of 1/x^${g(p)} dx`, '')
      .f('Replace infinity with b and take the limit as b -> infinity')
      .l(`= lim b->infinity [x^(${g(1 - p)})/(${g(1 - p)})] from 1 to b`, `= lim b->infinity (b^(${g(1 - p)}) - 1)/(${g(1 - p)})`, `= (0 - 1)/(${g(1 - p)})`, `= ${num(ans)}`)
      .n('1/x^p from 1 to infinity converges only when p > 1.')
      .done(`Evaluate the integral from 1 to infinity of 1/x^${g(p)} dx.`, ans, '');
  }, BC);

  // ================= Unit 7: Differential equations =================
  add('calc7', 'Exponential growth', () => {
    const P0 = R(100, 5000, 100), k = R(0.02, 0.12, 0.01), t = R(5, 30, 1), ans = r3(P0 * Math.exp(k * t));
    return W()
      .l('Exponential model', `dP/dt = ${g(k)}P`, `P(0) = ${P0}`, `P(${t}) = ?`, '')
      .f('dy/dt = ky has solution y = y0 e^(kt)')
      .l(`P(t) = ${P0}e^(${g(k)}t)`, `P(${t}) = ${P0}e^(${g(r3(k * t))})`, `P(${t}) = ${num(ans)}`)
      .done(`A population grows according to dP/dt = ${g(k)}P with P(0) = ${P0}. Find P(${t}).`, ans, '');
  });

  add('calc7', 'Separable differential equation', () => {
    const [x1, y0, ans] = pick([[4, 3, 5], [3, 4, 5], [12, 5, 13], [8, 6, 10], [15, 8, 17]]);
    return W()
      .l('Separation of variables', 'dy/dx = x/y', `y(0) = ${y0}`, `y(${x1}) = ?`, '')
      .f('Separate, integrate both sides, then use the initial condition to find C')
      .l('y dy = x dx', 'y^2/2 = x^2/2 + C', `${y0}^2/2 = 0 + C, so C = ${(y0 * y0) / 2}`, `y^2 = x^2 + ${y0 * y0}`, `y = sqrt(x^2 + ${y0 * y0}) (positive because y(0) > 0)`, `y(${x1}) = sqrt(${x1 * x1 + y0 * y0}) = ${ans}`)
      .done(`Solve dy/dx = x/y with y(0) = ${y0}. What is y(${x1})?`, ans, '');
  });

  add('calc7', 'Slope field value', () => {
    const x = R(-3, 3, 1), y = R(-3, 3, 1), ans = x - 2 * y;
    return W()
      .l('Slope field', 'dy/dx = x - 2y', `at (${x}, ${y})`, '')
      .f('The slope at a point is dy/dx evaluated there')
      .l(`dy/dx = ${x} - 2(${y})`, `dy/dx = ${ans}`)
      .done(`For the slope field of dy/dx = x - 2y, what is the slope of the segment at (${x}, ${y})?`, ans, '', true);
  });

  add('calc7', "Euler's method", () => {
    const y0 = R(1, 4, 1), h = pick([0.1, 0.5]);
    const y1 = r3(y0 + h * (0 + y0)), y2 = r3(y1 + h * (h + y1));
    return W()
      .l("Euler's method", 'dy/dx = x + y', `y(0) = ${y0}`, `step h = ${g(h)}`, `y(${g(2 * h)}) is about ?`, '')
      .f('y_new = y_old + h * (slope at the old point)')
      .l(`step 1: slope at (0, ${y0}) = ${y0}; y = ${y0} + ${g(h)}(${y0}) = ${g(y1)}`, `step 2: slope at (${g(h)}, ${g(y1)}) = ${g(r3(h + y1))}; y = ${g(y1)} + ${g(h)}(${g(r3(h + y1))}) = ${g(y2)}`)
      .done(`Use Euler's method with step size ${g(h)} and two steps to approximate y(${g(2 * h)}) for dy/dx = x + y, y(0) = ${y0}.`, y2, '');
  }, BC);

  add('calc7', 'Logistic growth', () => {
    const M = R(200, 5000, 100), k = R(0.1, 0.9, 0.1), ans = M / 2;
    return W()
      .l('Logistic model', `dP/dt = ${g(k)}P(1 - P/${M})`, '')
      .f('Logistic growth is fastest at half the carrying capacity')
      .l(`carrying capacity M = ${M}`, `fastest growth at P = M/2 = ${g(ans)}`)
      .done(`A population follows dP/dt = ${g(k)}P(1 - P/${M}). At what population is it growing fastest?`, ans, '');
  }, BC);

  // ================= Unit 8: Applications of integration =================
  add('calc8', 'Area between two curves', () => {
    const a = R(1, 6, 1), ans = r3(a ** 3 / 6);
    return W()
      .l('Area between curves', `y = ${a === 1 ? '' : a}x and y = x^2`, '')
      .f('Area = integral of (top - bottom) dx between the intersections')
      .l(`Intersect: x^2 = ${a}x -> x = 0 and x = ${a}`, `Top is y = ${a}x on [0, ${a}]`, `= integral from 0 to ${a} of (${a}x - x^2) dx`, `= [${g(a / 2)}x^2 - x^3/3] from 0 to ${a}`, `= ${g(a ** 3 / 2)} - ${g(r3(a ** 3 / 3))} = ${num(ans)}`)
      .done(`Find the area of the region between y = ${a === 1 ? '' : a}x and y = x^2.`, ans, '');
  });

  add('calc8', 'Volume by disks', () => {
    const b = R(1, 9, 1), ans = r3((Math.PI * b * b) / 2);
    return W()
      .l('Disk method', `y = sqrt(x), 0 <= x <= ${b}, rotated about the x-axis`, '')
      .f('V = pi * integral of [R(x)]^2 dx')
      .l(`V = pi * integral from 0 to ${b} of (sqrt(x))^2 dx`, `= pi * [x^2/2] from 0 to ${b}`, `= ${g(b * b / 2)}pi = ${num(ans)}`)
      .done(`The region under y = sqrt(x) from x = 0 to x = ${b} is rotated about the x-axis. Find the volume.`, ans, '');
  });

  add('calc8', 'Total distance traveled', () => {
    const c = R(1, 5, 1), T = c + R(1, 5, 1), ans = (c * c) / 2 + ((T - c) ** 2) / 2;
    return W()
      .l('Total distance', `v(t) = t - ${c}`, `0 <= t <= ${T}`, '')
      .f('distance = integral of |v(t)| dt; split where v = 0')
      .l(`v = 0 at t = ${c}`, `0 to ${c}: integral of (t - ${c}) dt = ${g(-(c * c) / 2)}`, `${c} to ${T}: integral of (t - ${c}) dt = ${g(((T - c) ** 2) / 2)}`, `distance = ${g((c * c) / 2)} + ${g(((T - c) ** 2) / 2)} = ${g(ans)}`)
      .n('Displacement would be the signed total. Distance adds the sizes.')
      .done(`A particle moves with v(t) = t - ${c}. Find the total distance it travels from t = 0 to t = ${T}.`, ans, '');
  });

  add('calc8', 'Volume with square cross sections', () => {
    const b = R(1, 9, 1), ans = r3(b ** 3 / 3);
    return W()
      .l('Known cross sections', `base: between y = ${b} - x and the x-axis, 0 <= x <= ${b}`, 'cross sections: squares', '')
      .f('V = integral of (area of one slice) dx; square area = side^2')
      .l(`V = integral from 0 to ${b} of (${b} - x)^2 dx`, `= [-(${b} - x)^3/3] from 0 to ${b}`, `= 0 + ${b ** 3}/3 = ${num(ans)}`)
      .done(`A solid has a base bounded by y = ${b} - x, the x-axis and the y-axis. Cross sections perpendicular to the x-axis are squares. Find the volume.`, ans, '');
  });

  // ================= Unit 9 (BC): Parametric, polar, vectors =================
  add('calc9', 'Parametric slope', () => {
    const t = R(1, 6, 1) * pick([1, -1]), ans = r3((3 * t) / 2);
    return W()
      .l('Parametric derivative', 'x = t^2 + 1, y = t^3', `at t = ${t}`, '')
      .f('dy/dx = (dy/dt)/(dx/dt)')
      .l('dx/dt = 2t, dy/dt = 3t^2', 'dy/dx = 3t^2/(2t) = 3t/2', `dy/dx = 3(${t})/2 = ${num(ans)}`)
      .done(`A curve is given by x = t^2 + 1, y = t^3. Find dy/dx at t = ${t}.`, ans, '', true);
  }, BC);

  add('calc9', 'Speed of a particle', () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), t = R(1, 4, 1), ans = c * t;
    return W()
      .l('Vector-valued motion', `x'(t) = ${a}t, y'(t) = ${b}t`, `at t = ${t}`, '')
      .f("speed = sqrt((x'(t))^2 + (y'(t))^2)")
      .l(`speed = sqrt((${a * t})^2 + (${b * t})^2)`, `= sqrt(${(a * t) ** 2 + (b * t) ** 2})`, `= ${ans}`)
      .done(`A particle moves with x'(t) = ${a}t and y'(t) = ${b}t. What is its speed at t = ${t}?`, ans, '');
  }, BC);

  add('calc9', 'Polar area', () => {
    const a = R(1, 8, 1), ans = r3((Math.PI * a * a) / 4);
    return W()
      .l('Polar area', `r = ${a}sin(theta), 0 <= theta <= pi`, '')
      .f('A = (1/2) integral of r^2 d(theta)')
      .l(`A = (1/2) integral from 0 to pi of ${a * a}sin^2(theta) d(theta)`, `sin^2(theta) = (1 - cos(2theta))/2`, `= (${a * a}/2)(pi/2)`, `= ${g((a * a) / 4)}pi = ${num(ans)}`)
      .n('This curve is a circle of radius a/2, so the area should be pi(a/2)^2. It checks.')
      .done(`Find the area enclosed by the polar curve r = ${a}sin(theta).`, ans, '');
  }, BC);

  add('calc9', 'Arc length', () => {
    const b = pick([3, 8, 15, 24]), ans = r3((2 / 3) * ((1 + b) ** 1.5 - 1));
    return W()
      .l('Arc length', `y = (2/3)x^(3/2), 0 <= x <= ${b}`, '')
      .f("L = integral of sqrt(1 + (dy/dx)^2) dx")
      .l("dy/dx = x^(1/2), so (dy/dx)^2 = x", `L = integral from 0 to ${b} of sqrt(1 + x) dx`, `= [(2/3)(1 + x)^(3/2)] from 0 to ${b}`, `= (2/3)(${(1 + b) ** 1.5} - 1) = ${num(ans)}`)
      .done(`Find the arc length of y = (2/3)x^(3/2) from x = 0 to x = ${b}.`, ans, '');
  }, BC);

  // ================= Unit 10 (BC): Series =================
  add('calc10', 'Sum of a geometric series', () => {
    const a = R(2, 20, 1), [p, q] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [-1, 2], [-1, 3]]), ans = r3(a / (1 - p / q));
    return W()
      .l('Geometric series', `first term a = ${a}`, `ratio r = ${p}/${q}`, '')
      .f('If |r| < 1, sum = a/(1 - r)')
      .l(`sum = ${a}/(1 - (${p}/${q}))`, `= ${a}/(${fr(q - p, q)})`, `= ${fr(a * q, q - p)}${(a * q) % (q - p) ? ' = ' + num(ans) : ''}`)
      .done(`Find the sum of the infinite geometric series with first term ${a} and common ratio ${p}/${q}.`, ans, '');
  }, BC);

  add('calc10', 'Taylor polynomial approximation', () => {
    const x = R(0.1, 0.5, 0.1), n = pick([2, 3]);
    const terms = [1, x, (x * x) / 2, (x ** 3) / 6].slice(0, n + 1), ans = r3(terms.reduce((s, v) => s + v, 0));
    return W()
      .l('Maclaurin polynomial', `f(x) = e^x, degree ${n}`, `estimate e^${g(x)}`, '')
      .f('e^x = 1 + x + x^2/2! + x^3/3! + ...')
      .l(`P${n}(x) = 1 + x + x^2/2${n === 3 ? ' + x^3/6' : ''}`, `P${n}(${g(x)}) = 1 + ${g(x)} + ${g(r3(x * x))}/2${n === 3 ? ` + ${g(r3(x ** 3))}/6` : ''}`, `= ${num(ans)}`)
      .done(`Use the degree ${n} Maclaurin polynomial for e^x to estimate e^${g(x)}.`, ans, '');
  }, BC);

  add('calc10', 'Radius of convergence', () => {
    const k = R(2, 9, 1);
    return W()
      .l('Ratio test', `sum from n = 1 to infinity of x^n/(n * ${k}^n)`, '')
      .f('Ratio test: converges when lim |a(n+1)/a(n)| < 1')
      .l(`|a(n+1)/a(n)| = |x| * n/((n + 1)${k}) -> |x|/${k}`, `|x|/${k} < 1 -> |x| < ${k}`, `R = ${k}`)
      .done(`Find the radius of convergence of the sum of x^n/(n * ${k}^n).`, k, '');
  }, BC);

  add('calc10', 'Maclaurin coefficient', () => {
    const k = R(2, 4, 1), n = R(2, 4, 1), fact = [1, 1, 2, 6, 24][n], ans = r3(k ** n / fact);
    return W()
      .l('Maclaurin series', `f(x) = e^(${k}x)`, `coefficient of x^${n} = ?`, '')
      .f('e^u = sum of u^n/n!, with u = kx')
      .l(`term = (${k}x)^${n}/${n}! = ${k ** n}x^${n}/${fact}`, `coefficient = ${fr(k ** n, fact)}${(k ** n) % fact ? ' = ' + num(ans) : ''}`)
      .done(`What is the coefficient of x^${n} in the Maclaurin series for e^(${k}x)?`, ans, '');
  }, BC);

  add('calc10', 'Alternating series error bound', () => {
    const N = R(3, 9, 1), ans = r3(1 / (N + 1) ** 2);
    return W()
      .l('Alternating series error bound', 'sum of (-1)^(n+1)/n^2', `using the first ${N} terms`, '')
      .f('The error is at most the size of the first term you left out')
      .l(`first unused term: 1/(${N + 1})^2 = 1/${(N + 1) ** 2}`, `error <= ${num(ans)}`)
      .done(`If the first ${N} terms of the sum of (-1)^(n+1)/n^2 are used to approximate the series, what is the largest the error can be (alternating series error bound)?`, ans, '');
  }, BC);

  // ================= Concept questions =================
  const Q = (unit, topic, q, c, a, why, only) => ({ unit, topic, q, c, a, why, only });
  SW.MCQ.push(
    Q('calc1', 'limits from a graph', 'If lim x->2 from the left of f(x) = 5 and lim x->2 from the right of f(x) = 5, but f(2) = 3, then:',
      ['lim x->2 f(x) = 3', 'lim x->2 f(x) = 5 and f is not continuous at 2', 'The limit does not exist', 'f is continuous at 2'], 1,
      'Both one-sided limits agree, so the limit is 5. Continuity also needs f(2) to equal 5, and it does not.'),
    Q('calc1', 'intermediate value theorem', 'f is continuous on [1, 4], f(1) = -2 and f(4) = 6. Which must be true?',
      ['f(x) = 0 for some x in (1, 4)', "f'(x) = 0 for some x", 'f has a maximum of 6', 'f is increasing'], 0,
      'IVT: a continuous function hits every value between -2 and 6, including 0.'),
    Q('calc1', 'vertical asymptote', 'Where does f(x) = (x - 2)/(x^2 - 4) have a vertical asymptote?',
      ['x = 2 only', 'x = -2 only', 'x = 2 and x = -2', 'Nowhere'], 1,
      'f = (x - 2)/((x - 2)(x + 2)) = 1/(x + 2) for x != 2. x = 2 is a hole; x = -2 is the asymptote.'),
    Q('calc2', 'differentiability', 'Which function is continuous at x = 0 but NOT differentiable there?',
      ['x^2', '|x|', 'sin(x)', 'e^x'], 1,
      '|x| has a sharp corner at 0, so the slope from the left (-1) and right (+1) disagree.'),
    Q('calc2', 'derivative meaning', "If f'(3) = -2, then near x = 3 the graph of f is:",
      ['Increasing', 'Decreasing', 'Concave down', 'At a maximum'], 1,
      "A negative derivative means the function is going down at that point."),
    Q('calc3', 'chain rule', 'd/dx [sin(x^2)] =',
      ['cos(x^2)', '2x cos(x^2)', '2x sin(x)', 'cos(2x)'], 1,
      'Outside derivative cos(x^2), times inside derivative 2x.'),
    Q('calc3', 'implicit differentiation', "When differentiating y^3 with respect to x, you get:",
      ['3y^2', "3y^2 dy/dx", '3x^2', 'y^3 dy/dx'], 1,
      'y is a function of x, so the chain rule adds dy/dx.'),
    Q('calc4', 'particle motion speeding up', 'At t = 2, a particle has v(2) = -3 and a(2) = -1. The particle is:',
      ['Speeding up', 'Slowing down', 'At rest', 'Changing direction'], 0,
      'Velocity and acceleration have the same sign, so the speed is increasing.'),
    Q('calc4', 'related rates units', "In 'dV/dt = 12 cm^3/s', dV/dt means:",
      ['The volume', 'How fast the volume changes per second', 'The rate of the radius', 'Volume per centimeter'], 1,
      'd/dt of a quantity is how fast it changes with time.'),
    Q('calc5', 'first derivative test', "f' changes from positive to negative at x = 4. At x = 4, f has a:",
      ['Local minimum', 'Local maximum', 'Inflection point', 'Vertical asymptote'], 1,
      'Going up then down is a peak.'),
    Q('calc5', 'concavity', "If f''(x) > 0 on an interval, the graph of f is:",
      ['Increasing', 'Concave up', 'Concave down', 'Linear'], 1,
      "f'' > 0 means the slopes are increasing: the graph curves upward like a cup."),
    Q('calc5', 'mean value theorem conditions', 'The Mean Value Theorem needs f to be:',
      ['Differentiable on [a, b] only', 'Continuous on [a, b] and differentiable on (a, b)', 'Increasing', 'Positive'], 1,
      'Those are the exact hypotheses. Without them the guaranteed c may not exist.'),
    Q('calc5', 'graph of f prime', "On a graph of f', the x-intercepts where f' crosses from below to above the axis are:",
      ['Local maxima of f', 'Local minima of f', 'Inflection points of f', 'Zeros of f'], 1,
      "f' goes from negative to positive: f goes down then up, a valley."),
    Q('calc6', 'fundamental theorem', 'd/dx of the integral from 2 to x of cos(t) dt is:',
      ['sin(x)', 'cos(x)', 'cos(x) - cos(2)', 'sin(x) - sin(2)'], 1,
      'FTC part 1: the derivative of an accumulation function is the integrand at x.'),
    Q('calc6', 'riemann sum over under estimate', 'f is increasing. A left Riemann sum for the integral of f will be:',
      ['An overestimate', 'An underestimate', 'Exact', 'Impossible to tell'], 1,
      'Left endpoints of an increasing function are the lowest heights on each piece.'),
    Q('calc6', 'integral properties', 'If the integral from 0 to 5 of f is 8 and from 0 to 2 of f is 3, the integral from 2 to 5 of f is:',
      ['11', '5', '-5', '24'], 1,
      '8 = 3 + (2 to 5), so it is 5.'),
    Q('calc7', 'separable differential equation', 'Which is a solution of dy/dx = 3y?',
      ['y = 3x', 'y = e^(3x)', 'y = x^3', 'y = 3e^x'], 1,
      "y' = 3e^(3x) = 3y. It checks."),
    Q('calc8', 'average value meaning', 'The average value of f on [a, b] is:',
      ['(f(a) + f(b))/2', '(1/(b - a)) times the integral from a to b of f', "f'(average x)", 'the integral of f'], 1,
      'Total accumulated amount divided by the width.'),
    Q('calc8', 'displacement vs distance', 'For a particle, the integral of v(t) from a to b gives:',
      ['Total distance', 'Displacement', 'Speed', 'Acceleration'], 1,
      'Integrating velocity gives net change in position. Distance needs |v|.'),
    Q('calc10', 'nth term test', 'If lim n->infinity a(n) = 0, then the series sum of a(n):',
      ['Must converge', 'Must diverge', 'Might converge or diverge', 'Sums to 0'], 2,
      'The harmonic series 1/n has terms going to 0 but diverges. The nth term test can only prove divergence.', ['calcbc']),
    Q('calc10', 'p-series', 'The series sum of 1/n^p converges when:',
      ['p > 0', 'p >= 1', 'p > 1', 'p < 1'], 2,
      'p-series test. p = 1 is the harmonic series, which diverges.', ['calcbc']),
    Q('calc10', 'taylor series sin', 'The Maclaurin series for sin(x) starts:',
      ['1 - x^2/2 + x^4/24', 'x - x^3/6 + x^5/120', '1 + x + x^2/2', 'x + x^2/2 + x^3/3'], 1,
      'sin(x) is odd, so only odd powers, with alternating signs and factorials.', ['calcbc']),
    Q('calc9', 'polar area formula', 'The area inside a polar curve from theta = a to b is:',
      ['integral of r d(theta)', '(1/2) integral of r^2 d(theta)', 'integral of r^2 d(theta)', 'pi r^2'], 1,
      'Each thin slice is a little sector with area (1/2)r^2 d(theta).', ['calcbc']),
    Q('calc9', 'parametric second derivative', 'For a parametric curve, d^2y/dx^2 equals:',
      ['(d^2y/dt^2)/(d^2x/dt^2)', '(d/dt (dy/dx))/(dx/dt)', 'd/dt (dy/dx)', '(dy/dt)^2'], 1,
      'Take the t-derivative of dy/dx, then divide by dx/dt again.', ['calcbc']),
  );

  // ================= Free response =================
  SW.FRQ.push(
    {
      unit: 'calc6', title: 'Rate in, rate out (tank)', only: ['calcab', 'calcbc'],
      prompt: 'Water flows into a tank at E(t) = 30 + 6t gallons per hour and drains out at L(t) = 20 + 10t gallons per hour, for 0 <= t <= 5. At t = 0 the tank holds 100 gallons.\n(a) How many gallons flow INTO the tank from t = 0 to t = 5?\n(b) Is the amount of water in the tank increasing or decreasing at t = 3? Explain.\n(c) At what time is the amount of water in the tank greatest? Justify your answer.\n(d) How much water is in the tank at that time?',
      rubric: [
        { pts: 1, text: '(a) Sets up the integral from 0 to 5 of E(t) dt' },
        { pts: 1, text: '(a) Answer 225 gallons' },
        { pts: 1, text: '(b) Computes E(3) - L(3) = 48 - 50 = -2' },
        { pts: 1, text: '(b) Says decreasing because E(3) - L(3) < 0' },
        { pts: 1, text: '(c) Sets E(t) - L(t) = 0, giving t = 2.5' },
        { pts: 1, text: '(c) Justifies max: the rate of change goes from positive to negative at t = 2.5 (or candidates test)' },
        { pts: 1, text: '(d) Sets up 100 + integral from 0 to 2.5 of (E(t) - L(t)) dt' },
        { pts: 1, text: '(d) Integrates correctly: integral of (10 - 4t) from 0 to 2.5 = 12.5' },
        { pts: 1, text: '(d) Answer 112.5 gallons' },
      ],
      model: '(a) integral from 0 to 5 of (30 + 6t) dt = [30t + 3t^2] from 0 to 5 = 150 + 75 = 225 gallons.\n(b) E(3) - L(3) = 48 - 50 = -2 < 0, so the amount is decreasing at t = 3.\n(c) The amount changes at E(t) - L(t) = 10 - 4t. This is 0 at t = 2.5. It is positive before 2.5 and negative after, so the amount is greatest at t = 2.5 hours.\n(d) 100 + integral from 0 to 2.5 of (10 - 4t) dt = 100 + [10t - 2t^2] from 0 to 2.5 = 100 + 12.5 = 112.5 gallons.',
    },
    {
      unit: 'calc4', title: 'Particle motion', only: ['calcab', 'calcbc'],
      prompt: 'A particle moves along the x-axis with velocity v(t) = t^2 - 4t + 3 for 0 <= t <= 5. Its position at t = 0 is x(0) = 2.\n(a) At what times is the particle at rest?\n(b) Is the particle speeding up or slowing down at t = 2.5? Explain.\n(c) Find the position of the particle at t = 5.\n(d) Find the total distance traveled from t = 0 to t = 5.',
      rubric: [
        { pts: 1, text: '(a) Sets v(t) = 0' },
        { pts: 1, text: '(a) t = 1 and t = 3' },
        { pts: 1, text: '(b) Finds v(2.5) = -0.75 and a(2.5) = 2(2.5) - 4 = 1' },
        { pts: 1, text: '(b) Slowing down because v and a have opposite signs' },
        { pts: 1, text: '(c) x(5) = 2 + integral from 0 to 5 of v(t) dt' },
        { pts: 1, text: '(c) Answer x(5) = 2 + 20/3 = 26/3 (about 8.67)' },
        { pts: 1, text: '(d) Splits the integral at t = 1 and t = 3 (or uses |v|)' },
        { pts: 2, text: '(d) Correct total distance 28/3 (about 9.33); 1 point for a single arithmetic slip' },
      ],
      model: '(a) t^2 - 4t + 3 = (t - 1)(t - 3) = 0, so t = 1 and t = 3.\n(b) v(2.5) = 6.25 - 10 + 3 = -0.75. a(t) = 2t - 4, so a(2.5) = 1. v < 0 and a > 0 have opposite signs, so it is slowing down.\n(c) integral from 0 to 5 of v = [t^3/3 - 2t^2 + 3t] from 0 to 5 = 125/3 - 50 + 15 = 20/3. x(5) = 2 + 20/3 = 26/3.\n(d) 0 to 1: 4/3. 1 to 3: -4/3 (size 4/3). 3 to 5: 20/3. Distance = 4/3 + 4/3 + 20/3 = 28/3.',
    },
    {
      unit: 'calc10', title: 'Taylor polynomial and error', only: ['calcbc'],
      prompt: 'Let f(x) = e^(2x).\n(a) Write the first four nonzero terms of the Maclaurin series for f.\n(b) Write the general term and find the interval of convergence.\n(c) Use the third-degree Taylor polynomial to approximate f(0.1).\n(d) Use the Lagrange error bound to show the approximation in (c) is within 0.0001 of the true value.',
      rubric: [
        { pts: 2, text: '(a) 1 + 2x + 2x^2 + (4/3)x^3 (1 point for at least two correct terms)' },
        { pts: 1, text: '(b) General term (2x)^n/n!' },
        { pts: 2, text: '(b) Uses ratio test: limit 2|x|/(n + 1) -> 0, so converges for all real x' },
        { pts: 1, text: '(c) P3(0.1) = 1 + 0.2 + 0.02 + 0.001333 = 1.221333' },
        { pts: 1, text: '(d) Uses max of |f^(4)| = 16e^(2c) on [0, 0.1], bounded by 16e^(0.2)' },
        { pts: 2, text: '(d) Error <= 16e^(0.2)(0.1)^4/4! = about 0.0000814 < 0.0001' },
      ],
      model: '(a) e^u = 1 + u + u^2/2 + u^3/6 with u = 2x: 1 + 2x + 2x^2 + (4/3)x^3.\n(b) General term (2x)^n/n!. Ratio: |a(n+1)/a(n)| = 2|x|/(n + 1) -> 0 < 1 for every x, so the interval is all real numbers.\n(c) P3(0.1) = 1 + 0.2 + 0.02 + 0.001333 = 1.2213.\n(d) f^(4)(x) = 16e^(2x) <= 16e^(0.2) on [0, 0.1]. Error <= 16e^(0.2)(0.1)^4/24 = 0.0000814 < 0.0001.',
    },
    {
      unit: 'calc9', title: 'Parametric motion', only: ['calcbc'],
      prompt: 'A particle moves in the plane with x(t) = t^2 and y(t) = t^3 - 3t for t >= 0.\n(a) Find dy/dx at t = 2.\n(b) At what time t > 0 does the particle have a horizontal tangent? Find the point.\n(c) Find the speed of the particle at t = 1.\n(d) Write, but do not evaluate, an integral for the distance traveled from t = 0 to t = 2.',
      rubric: [
        { pts: 1, text: "(a) dy/dx = (3t^2 - 3)/(2t)" },
        { pts: 1, text: '(a) dy/dx at t = 2 is 9/4' },
        { pts: 1, text: '(b) Sets dy/dt = 0 with dx/dt != 0: t = 1' },
        { pts: 1, text: '(b) Point (1, -2)' },
        { pts: 2, text: '(c) speed = sqrt((2t)^2 + (3t^2 - 3)^2) = 2 at t = 1' },
        { pts: 2, text: '(d) integral from 0 to 2 of sqrt((2t)^2 + (3t^2 - 3)^2) dt' },
      ],
      model: '(a) dx/dt = 2t, dy/dt = 3t^2 - 3. dy/dx = (3t^2 - 3)/(2t). At t = 2: 9/4.\n(b) dy/dt = 0 when t = 1 (t >= 0), and dx/dt = 2 != 0. Point: (1, 1 - 3) = (1, -2).\n(c) At t = 1: x\' = 2, y\' = 0, speed = sqrt(4 + 0) = 2.\n(d) Distance = integral from 0 to 2 of sqrt((2t)^2 + (3t^2 - 3)^2) dt.',
    },
  );

  // ================= Reference sheet =================
  const calcRef = bc => () => `
    <p class="muted small">There is no formula sheet on the real AP Calculus exam, so these need to be memorized.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>Limits</h4><table>
        <tr><td class="eqn">lim x->0 sin(x)/x = 1</td></tr><tr><td class="eqn">lim x->0 (1 - cos(x))/x = 0</td></tr>
        <tr><td class="eqn">L'Hospital: if 0/0 or inf/inf, lim f/g = lim f'/g'</td></tr>
        <tr><td class="eqn">Continuous at a: lim x->a f(x) = f(a)</td></tr></table></div>
      <div class="ref-unit"><h4>Derivatives</h4><table>
        <tr><td class="eqn">d/dx x^n = nx^(n-1)</td></tr><tr><td class="eqn">d/dx e^x = e^x, d/dx a^x = a^x ln(a)</td></tr>
        <tr><td class="eqn">d/dx ln(x) = 1/x</td></tr><tr><td class="eqn">d/dx sin(x) = cos(x), d/dx cos(x) = -sin(x)</td></tr>
        <tr><td class="eqn">d/dx tan(x) = sec^2(x)</td></tr><tr><td class="eqn">d/dx sec(x) = sec(x)tan(x)</td></tr>
        <tr><td class="eqn">d/dx arcsin(x) = 1/sqrt(1 - x^2)</td></tr><tr><td class="eqn">d/dx arctan(x) = 1/(1 + x^2)</td></tr>
        <tr><td class="eqn">Product: (uv)' = u'v + uv'</td></tr><tr><td class="eqn">Quotient: (u/v)' = (u'v - uv')/v^2</td></tr>
        <tr><td class="eqn">Chain: d/dx f(g(x)) = f'(g(x))g'(x)</td></tr><tr><td class="eqn">Inverse: (f^-1)'(b) = 1/f'(a), f(a) = b</td></tr></table></div>
      <div class="ref-unit"><h4>Integrals</h4><table>
        <tr><td class="eqn">integral x^n dx = x^(n+1)/(n+1) + C (n != -1)</td></tr><tr><td class="eqn">integral 1/x dx = ln|x| + C</td></tr>
        <tr><td class="eqn">integral e^x dx = e^x + C</td></tr><tr><td class="eqn">integral sin(x) dx = -cos(x) + C</td></tr>
        <tr><td class="eqn">integral cos(x) dx = sin(x) + C</td></tr><tr><td class="eqn">integral sec^2(x) dx = tan(x) + C</td></tr>
        <tr><td class="eqn">integral 1/(1 + x^2) dx = arctan(x) + C</td></tr>
        <tr><td class="eqn">FTC: integral from a to b of f = F(b) - F(a)</td></tr><tr><td class="eqn">d/dx integral from a to x of f(t) dt = f(x)</td></tr>
        ${bc ? '<tr><td class="eqn">By parts: integral u dv = uv - integral v du</td></tr>' : ''}</table></div>
      <div class="ref-unit"><h4>Applications</h4><table>
        <tr><td class="eqn">Average value = (1/(b - a)) integral from a to b of f</td></tr>
        <tr><td class="eqn">MVT: f'(c) = (f(b) - f(a))/(b - a)</td></tr>
        <tr><td class="eqn">Area = integral of (top - bottom) dx</td></tr>
        <tr><td class="eqn">Disk: V = pi integral R^2 dx</td></tr><tr><td class="eqn">Washer: V = pi integral (R^2 - r^2) dx</td></tr>
        <tr><td class="eqn">Distance = integral of |v(t)| dt</td></tr><tr><td class="eqn">dy/dt = ky -> y = y0 e^(kt)</td></tr>
        ${bc ? '<tr><td class="eqn">Logistic: dP/dt = kP(1 - P/M), fastest at P = M/2</td></tr><tr><td class="eqn">Euler: y_new = y + h(dy/dx)</td></tr><tr><td class="eqn">Arc length = integral sqrt(1 + (dy/dx)^2) dx</td></tr>' : ''}</table></div>
      ${bc ? `<div class="ref-unit"><h4>Parametric, polar, vectors</h4><table>
        <tr><td class="eqn">dy/dx = (dy/dt)/(dx/dt)</td></tr><tr><td class="eqn">d2y/dx2 = (d/dt (dy/dx))/(dx/dt)</td></tr>
        <tr><td class="eqn">speed = sqrt((x')^2 + (y')^2)</td></tr><tr><td class="eqn">Arc length = integral sqrt((x')^2 + (y')^2) dt</td></tr>
        <tr><td class="eqn">Polar area = (1/2) integral r^2 d(theta)</td></tr><tr><td class="eqn">x = r cos(theta), y = r sin(theta)</td></tr></table></div>
      <div class="ref-unit"><h4>Series</h4><table>
        <tr><td class="eqn">Geometric: a/(1 - r) if |r| < 1</td></tr><tr><td class="eqn">p-series 1/n^p converges iff p > 1</td></tr>
        <tr><td class="eqn">Ratio test: lim |a(n+1)/a(n)| < 1 converges</td></tr>
        <tr><td class="eqn">Alternating error <= |first omitted term|</td></tr>
        <tr><td class="eqn">Lagrange error <= max|f^(n+1)| |x - a|^(n+1)/(n+1)!</td></tr>
        <tr><td class="eqn">e^x = 1 + x + x^2/2! + x^3/3! + ...</td></tr><tr><td class="eqn">sin(x) = x - x^3/3! + x^5/5! - ...</td></tr>
        <tr><td class="eqn">cos(x) = 1 - x^2/2! + x^4/4! - ...</td></tr><tr><td class="eqn">1/(1 - x) = 1 + x + x^2 + ... (|x| < 1)</td></tr>
        <tr><td class="eqn">ln(1 + x) = x - x^2/2 + x^3/3 - ...</td></tr></table></div>` : ''}
      <div class="ref-unit"><h4>Trig values</h4><table>
        <tr><td class="eqn">sin(0) = 0, cos(0) = 1</td></tr><tr><td class="eqn">sin(pi/6) = 1/2, cos(pi/6) = sqrt(3)/2</td></tr>
        <tr><td class="eqn">sin(pi/4) = cos(pi/4) = sqrt(2)/2</td></tr><tr><td class="eqn">sin(pi/3) = sqrt(3)/2, cos(pi/3) = 1/2</td></tr>
        <tr><td class="eqn">sin(pi/2) = 1, cos(pi/2) = 0</td></tr><tr><td class="eqn">sin^2(x) + cos^2(x) = 1</td></tr>
        <tr><td class="eqn">sin^2(x) = (1 - cos(2x))/2</td></tr></table></div>
    </div>`;
  SW.REF.calcab = calcRef(false);
  SW.REF.calcbc = calcRef(true);
})();
