// Runs every problem generator many times and checks the output is sane.
require('../js/fmt.js'); require('../js/problems-ap1.js'); require('../js/problems-ap2.js');
const SW = globalThis.SW;
let fails = 0;
const fail = (p, msg, out) => { fails++; if (fails < 15) console.log(`FAIL [${p.unit}] ${p.title}: ${msg}\n`, out && out.lines.join('\n')); };
for (const p of SW.problems) {
  for (let i = 0; i < 300; i++) {
    let out;
    try { out = p.gen(); } catch (e) { fail(p, 'threw ' + e.message); break; }
    const text = [out.q, ...out.lines, ...out.notes].join('\n');
    if (/NaN|undefined|Infinity|\[object/.test(text)) { fail(p, 'bad value in text', out); break; }
    if (/[^\x20-\x7e\n]/.test(text)) { fail(p, 'non-plain character: ' + text.match(/[^\x20-\x7e\n]/)[0], out); break; }
    if (!Number.isFinite(out.ans.v)) { fail(p, 'answer not finite', out); break; }
    const last = out.lines[out.lines.length - 1];
    const lastNum = SW.parseNum(last.split('=').pop());
    if (!SW.check(String(out.ans.v), out.ans).ok) { fail(p, 'answer fails own check', out); break; }
    if (Math.abs(lastNum - out.ans.v) > 1e-9 * Math.abs(out.ans.v) + 1e-30 && Math.abs((lastNum - out.ans.v) / out.ans.v) > 0.006) { fail(p, `last line ${lastNum} != answer ${out.ans.v}`, out); break; }
    if (out.lines.some(l => l !== '' && l.trim() === '')) { fail(p, 'whitespace line', out); break; }
  }
}
const byUnit = {};
SW.problems.forEach(p => (byUnit[p.unit] = (byUnit[p.unit] || 0) + 1));
console.log('problem types:', SW.problems.length, byUnit);
console.log('format checks:', SW.num(35), SW.num(0.0312), SW.num(6.67e-11), SW.num(1234.5), SW.num(999.7), SW.g(2.5e-6), SW.sg(-4.2));
console.log('parse:', SW.parseNum('3.2 x 10^-5'), SW.parseNum('+35.0 m/s'), SW.parseNum('-1.2e3'), SW.parseNum('4*10^(-7)'));
console.log(fails ? `${fails} FAILURES` : 'ALL PASS');
process.exit(fails ? 1 : 0);
