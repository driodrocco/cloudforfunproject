// Runs every AP CSA tracing problem as real Java and checks the printed output
// matches the answer Stepwise expects. Needs javac/java on the PATH.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
for (const [, src] of html.matchAll(/<script src="([^"]+)" defer><\/script>/g)) if (!src.endsWith('app.js')) require(path.join(__dirname, '..', src));
const SW = globalThis.SW;

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'csa-'));
const cases = [];
for (const p of SW.problems.filter(x => x.unit.startsWith('csa'))) {
  for (let i = 0; i < 12; i++) {
    const out = p.gen();
    const parts = out.code.split('\n\n');
    const decls = parts.length > 1 ? parts.slice(0, -1).join('\n').replace('public class ', 'static class ') : '';
    const body = parts[parts.length - 1];
    const name = `T${cases.length}`;
    fs.writeFileSync(path.join(dir, name + '.java'), `import java.util.*;\npublic class ${name} {\n${decls}\npublic static void main(String[] args) {\n${body}\n}\n}\n`);
    cases.push({ name, title: p.title, want: out.ans.v, code: out.code });
  }
}
fs.writeFileSync(path.join(dir, 'Main.java'), `public class Main { public static void main(String[] a) throws Exception {\n${cases.map(c => `${c.name}.main(a); System.out.println("@@");`).join('\n')}\n} }\n`);
execFileSync('javac', ['-d', dir, ...fs.readdirSync(dir).filter(f => f.endsWith('.java')).map(f => path.join(dir, f))], { stdio: 'inherit' });
const outputs = execFileSync('java', ['-cp', dir, 'Main'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('@@\n');
let fails = 0;
cases.forEach((c, i) => {
  const got = outputs[i].trim();
  if (Number(got) !== c.want) { fails++; if (fails < 6) console.log(`FAIL ${c.title}: java printed ${got}, app expects ${c.want}\n${c.code}\n`); }
});
console.log(`${cases.length} Java programs run`);
console.log(fails ? `${fails} FAILURES` : 'ALL PASS');
process.exit(fails ? 1 : 0);
