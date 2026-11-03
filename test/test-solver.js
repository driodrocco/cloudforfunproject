// Round-trip test: for every equation, make a consistent set of values, then hide
// each variable in turn and check the solver recovers it.
require('../js/fmt.js'); require('../js/equations.js');
const SW = globalThis.SW;
let fails = 0, checks = 0;
const rnd = (a, b) => a + Math.random() * (b - a);
for (const eq of SW.EQUATIONS) {
  // Random small numbers make hf - phi cancel badly; real photoelectric values do not.
  if (eq.name === 'Photoelectric effect') continue;
  const names = Object.keys(eq.vars);
  for (let trial = 0; trial < 10; trial++) {
    const vals = {};
    for (const n of names) {
      const fl = SW.varFlags(eq.vars[n]);
      vals[n] = fl.c != null ? fl.c : fl.ang ? rnd(5, 85) : Number((rnd(0.5, 50) * (fl.vec && Math.random() < 0.4 ? -1 : 1)).toPrecision(3));
    }
    // make the set consistent by solving for the first non-constant variable
    const target = names.find(n => SW.varFlags(eq.vars[n]).c == null);
    const known0 = { ...vals }; delete known0[target];
    const r0 = SW.solveEquation(eq, known0, target).exact;
    if (!r0.length) continue; // random givens had no physical solution; try again
    vals[target] = r0[0];
    for (const hide of names) {
      if (SW.varFlags(eq.vars[hide]).c != null) continue;
      const known = { ...vals }; delete known[hide];
      const res = SW.solveEquation(eq, known, hide);
      checks++;
      const scale = Math.abs(eq.f({ ...known, [hide]: vals[hide] * 1.05 })) + 1e-300;
      const ok = res.repeats || res.roots.some(x => Math.abs(x - vals[hide]) <= 0.01 * Math.abs(vals[hide]) + 1e-12) ||
        (res.exact.length > 0 && res.exact.every(x => Math.abs(eq.f({ ...known, [hide]: x })) < 1e-6 * scale));
      const text = res.lines.join('\n');
      if (!ok || /NaN|undefined|\{|\}/.test(text) || /[^\x20-\x7e\n]/.test(text)) {
        fails++;
        if (fails < 10) console.log(`FAIL ${eq.name} hide=${hide} want=${vals[hide]} got=${res.roots}\n${text}\n`);
      }
    }
  }
}
console.log(`${SW.EQUATIONS.length} equations, ${checks} round-trip solves`);
const eq = SW.EQUATIONS.find(e => e.name === 'Velocity-time (vertical)');
console.log(SW.solveEquation(eq, { Vy: 0, V0y: 34.3, a: -9.8 }, 't').lines.join('\n'));
const eq2 = SW.EQUATIONS.find(e => e.name === 'Displacement-time (vertical)');
console.log(SW.solveEquation(eq2, { y: 10, V0y: 20, a: -9.8 }, 't').lines.join('\n'));
console.log(fails ? `${fails} FAILURES` : 'ALL PASS');
process.exit(fails ? 1 : 0);
