// Runs every problem generator many times and checks the output is sane.
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
for (const [, src] of html.matchAll(/<script src="([^"]+)" defer><\/script>/g)) if (!src.endsWith('app.js')) require(path.join(__dirname, '..', src));
const SW = globalThis.SW;
let fails = 0;
const fail = (p, msg, out) => { fails++; if (fails < 15) console.log(`FAIL [${p.unit}] ${p.title}: ${msg}\n`, out && out.lines.join('\n')); };
for (const p of SW.problems) {
  for (let i = 0; i < 300; i++) {
    let out;
    try { out = p.gen(); } catch (e) { fail(p, 'threw ' + e.message); break; }
    const text = [out.q, ...out.lines, ...out.notes].join('\n');
    if (/NaN|undefined|Infinity|\[object/.test(text)) { fail(p, 'bad value in text', out); break; }
    if (/[^\x20-\x7e\n]/.test(text + (out.code || ''))) { fail(p, 'non-plain character: ' + text.match(/[^\x20-\x7e\n]/)[0], out); break; }
    if (!Number.isFinite(out.ans.v)) { fail(p, 'answer not finite', out); break; }
    if (!SW.check(String(out.ans.v), out.ans).ok) { fail(p, 'answer fails own check', out); break; }
    // The answer must appear somewhere in the worked solution.
    const nums = out.lines.flatMap(l => l.match(/-?\d+(?:\.\d+)?(?: x 10\^-?\d+)?/g) || []).map(SW.parseNum);
    const v = out.ans.v;
    if (!nums.some(x => (out.ans.exact ? x === v : Math.abs(x - v) <= 0.006 * Math.abs(v) + 1e-12))) { fail(p, `answer ${v} not shown in the solution`, out); break; }
    if (out.lines.some(l => l !== '' && l.trim() === '')) { fail(p, 'whitespace line', out); break; }
  }
}
const byUnit = {};
SW.problems.forEach(p => (byUnit[p.unit] = (byUnit[p.unit] || 0) + 1));
console.log('problem types:', SW.problems.length, byUnit);
console.log('format checks:', SW.num(35), SW.num(0.0312), SW.num(6.67e-11), SW.num(1234.5), SW.num(999.7), SW.g(2.5e-6), SW.sg(-4.2));
console.log('parse:', SW.parseNum('3.2 x 10^-5'), SW.parseNum('+35.0 m/s'), SW.parseNum('-1.2e3'), SW.parseNum('4*10^(-7)'));
// Every course: units exist, concept answers valid, rubric points add up.
for (const c of SW.courseList()) {
  for (const u of c.unitIds) if (!SW.unitById(u)) { fails++; console.log('missing unit', u); }
  const n = SW.problems.filter(p => SW.inCourse(p, c.id)).length, m = SW.MCQ.filter(q => SW.inCourse(q, c.id)).length, f = SW.FRQ.filter(q => SW.inCourse(q, c.id)).length;
  console.log(`${c.name}: ${n} problem types, ${m} concept questions, ${f} free response`);
}
const langUnits = new Set(SW.courseList().filter(c => c.subject === 'World Languages').flatMap(c => c.unitIds));
for (const q of SW.MCQ) if (q.c.length !== 4 || new Set(q.c).size !== 4 || !(q.a >= 0 && q.a < 4) || !SW.unitById(q.unit) || (!langUnits.has(q.unit) && /[^\x20-\x7e]/.test(q.q + q.c.join('') + q.why))) { fails++; console.log('bad MCQ', q.q, q.c); }
for (const q of SW.FRQ) if (!q.rubric.length || !q.model || !SW.unitById(q.unit)) { fails++; console.log('bad FRQ', q.title); }
console.log(fails ? `${fails} FAILURES` : 'ALL PASS');
process.exit(fails ? 1 : 0);
