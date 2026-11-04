# cloudforfunproject

Two static web apps, published with GitHub Pages from `main` / root:
- **Stepwise** (root): AP study tool for all 40 AP courses. https://driodrocco.github.io/cloudforfunproject/
- **Hush** (`hush/`): ambient sound mixer, plus the **Tab Mixer** Chrome extension (`hush/tab-mixer/`).

No build step, no server, no dependencies. Plain HTML, CSS and JavaScript; progress is saved in each visitor's browser (localStorage).

## Owner
High school student. Current classes (exams May 2027): AP Gov, AP CS Principles, AP English Language. Next year: AP Physics 1, AP Calculus AB, AP English Literature, AP Psychology. Keep explanations simple and plain.

## Where things are
- `index.html` lists every script in load order (globals on `globalThis.SW`). New content files must be added there.
- `js/courses.js`: course registry (`SW.defineCourse`) and helpers: `SW.mcqs`, `SW.frq`, `SW.passage`, `SW.sourceSet`, `SW.dataset`, `SW.guide(s)`.
- `js/content/*.js`: course content. `guides-*.js` are the unit study guides. `*-more.js`, `sets-*.js`, `frq-*.js` add questions.
- `js/app.js`: the whole UI (practice, study guide, demo and full-length exams, solver, reference, progress, worksheet).
- `js/charts.js`: SVG graphs and tables used in questions (`SW.fig`).
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and installing as an app.
- `docs-comparison-report.html`: how Stepwise compares with the real AP exams.

## Writing style for content
- Worked answers: givens, the unknown "= ?", formula, substitution with units and signs, answer to 3 significant figures, plain keyboard characters (x 10^-5, not superscripts). g = 9.8 m/s^2.
- Multiple-choice rows put the right answer first when using the `M` / `P` helpers (choices are shuffled when shown); check each helper's signature.
- Use only facts you are sure of; label invented data "practice data".

## Test before pushing
```
node test/test-problems.js   # every generator, question, FRQ and study guide
node test/test-solver.js
node test/test-java.js       # needs javac
python3 tools/build-tab-mixer.py --check
```
GitHub Actions runs these on every push (`.github/workflows/tests.yml`).

## Other copies
- claude.ai version (one-click Claude grading): https://claude.ai/artifact/Kc9oQ3G5nnhErpyKg9XUBr. It is a separate single-file build made with `python3 tools/build-single.py OUT.html` and published as an artifact; it does not update from GitHub automatically.
- Tab Mixer download: rebuild `hush/hush-tab-mixer.zip` with `python3 tools/build-tab-mixer.py` after changing `hush/tab-mixer/`.
