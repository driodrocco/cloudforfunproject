/* Shared helpers: number formatting (plain keyboard characters, 3 sig figs),
 * the worked-solution builder, random givens, and answer checking. */
(function () {
  'use strict';
  const SW = (globalThis.SW = globalThis.SW || {});

  SW.UNITS = [
    { id: 'kin', course: 1, n: 1, name: 'Kinematics' },
    { id: 'dyn', course: 1, n: 2, name: 'Force and Translational Dynamics' },
    { id: 'energy', course: 1, n: 3, name: 'Work, Energy, and Power' },
    { id: 'mom', course: 1, n: 4, name: 'Linear Momentum' },
    { id: 'rot', course: 1, n: 5, name: 'Torque and Rotational Dynamics' },
    { id: 'rotE', course: 1, n: 6, name: 'Energy and Momentum of Rotating Systems' },
    { id: 'osc', course: 1, n: 7, name: 'Oscillations' },
    { id: 'fluids', course: 1, n: 8, name: 'Fluids' },
    { id: 'thermo', course: 2, n: 9, name: 'Thermodynamics' },
    { id: 'elec', course: 2, n: 10, name: 'Electric Force, Field, and Potential' },
    { id: 'circ', course: 2, n: 11, name: 'Electric Circuits' },
    { id: 'mag', course: 2, n: 12, name: 'Magnetism and Electromagnetism' },
    { id: 'optics', course: 2, n: 13, name: 'Geometric Optics' },
    { id: 'waves', course: 2, n: 14, name: 'Waves, Sound, and Physical Optics' },
    { id: 'modern', course: 2, n: 15, name: 'Modern Physics' },
  ];

  // Round to 3 significant figures, the way a student carries numbers forward.
  const r3 = x => (x === 0 || !Number.isFinite(x) ? x : Number(x.toPrecision(3)));

  const isSci = a => a >= 1e5 || a < 1e-3;
  const sci = (a, digits) => {
    const [m, e] = (digits ? a.toExponential(digits - 1) : a.toExponential()).split('e');
    return `${m} x 10^${Number(e)}`;
  };

  // Answers: always 3 significant figures, e.g. 35.0, 0.0312, 6.67 x 10^-11.
  function num(x) {
    if (x === 0) return '0';
    const a = Math.abs(x), sign = x < 0 ? '-' : '';
    if (isSci(a)) return sign + sci(a, 3);
    const r = r3(a);
    return sign + (r >= 1000 ? String(Math.round(r)) : r.toPrecision(3));
  }

  // Givens: shortest form, the way a textbook writes them (3.5, 12, 2.4 x 10^-6).
  function g(x) {
    if (x === 0) return '0';
    const a = Math.abs(x), sign = x < 0 ? '-' : '';
    const clean = Number(a.toPrecision(6));
    return sign + (isSci(clean) ? sci(clean) : String(clean));
  }

  const plus = (x, s) => (x > 0 ? '+' : '') + s;
  const sg = x => plus(x, num(x)); // signed answer
  const sgv = x => plus(x, g(x)); // signed given

  // Random value between min and max on a step grid (keeps givens tidy).
  function R(min, max, step = 1) {
    const n = Math.round((min + Math.random() * (max - min)) / step) * step;
    const decimals = (String(step).split('.')[1] || '').length;
    return Number(n.toFixed(decimals));
  }
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const deg = d => (d * Math.PI) / 180;
  const toDeg = r => (r * 180) / Math.PI;

  // Builds one worked solution: l() adds lines, f() adds a formula line, n() adds a Note.
  function W() {
    const lines = [], formulas = [], notes = [];
    const w = {
      l(...s) { lines.push(...s); return w; },
      f(s) { formulas.push(s); lines.push(s); return w; },
      n(s) { notes.push(s); return w; },
      done(q, v, unit, signed = false) {
        return { q, lines, formulas, notes, ans: { v, unit, signed } };
      },
    };
    return w;
  }

  SW.problems = [];
  SW.add = (unit, title, gen) => SW.problems.push({ unit, title, gen });

  // Accepts 35, +35.0, -4.2e-5, 4.2 x 10^-5, 4.2*10^(-5), with or without units after it.
  function parseNum(s) {
    if (s == null) return NaN;
    let t = String(s).trim().replace(/[−–]/g, '-').replace(/,/g, '').replace(/\s+/g, '');
    t = t.replace(/(?:x|\*|×)10\^?\(?([-+]?\d+)\)?/i, 'e$1');
    const m = t.match(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i);
    return m ? Number(m[0]) : NaN;
  }

  // Within 2% counts as right (3 sig figs plus rounding along the way). Signs matter for vectors.
  function check(input, ans) {
    const x = parseNum(input);
    if (!Number.isFinite(x)) return { ok: false, msg: 'Type a number (like 12.5 or 3.2 x 10^-5).' };
    const v = ans.v;
    const close = v === 0 ? Math.abs(x) < 1e-9 : Math.abs((Math.abs(x) - Math.abs(v)) / v) <= 0.02;
    if (!close) return { ok: false, msg: 'Not quite. Check your givens and the formula, then try again.' };
    if (ans.signed && v !== 0 && Math.sign(x) !== Math.sign(v)) {
      return { ok: false, msg: 'Right size, wrong sign. Check your sign convention.' };
    }
    return { ok: true, msg: 'Correct!' };
  }

  Object.assign(SW, { r3, num, g, sg, sgv, R, pick, deg, toDeg, W, parseNum, check });
})();
