# Stepwise: AP study, step by step

Practice for AP courses with **step-by-step worked solutions**, free-response grading, demo tests with a predicted score, and reference sheets.

**All 40 AP courses** from the College Board catalog: sciences, math and computer science, English, history and social sciences, world languages, arts, and the AP Capstone courses (Seminar and Research). Pick a course from the menu at the top. Courses without a sit-down exam (Research and the three Art and Design portfolios) practice through rubric-graded written tasks instead of a demo test.

Worked solutions use a clear class format: givens, the unknown, the formula, the substitution with units and signs, then the answer with 3 significant figures.

No sign-up, no dependencies, no build step. Open `index.html` and go.

## What's inside

| Tab | What it does |
| --- | --- |
| **Practice** | 99 calculation problem types across all 15 units, plus original AP-style concept questions. New numbers every time. Checks your answer (signs count for vectors), gives hints, and shows the full worked solution with optional `Note:` lines. "Exam mix" picks topics using the real exam weights. |
| **Demo test** | 10, 20 or 40 multiple-choice questions weighted like the real exam. Ends with your level, a predicted AP score (1-5), your strongest and weakest units, and a review of every question with solutions and video help. |
| **Free response** | AP-style written questions with the full point rubric. On the hosted page, Claude grades your answer line by line against the rubric (it asks your permission first). Or switch to **Rubric + model answer** and score yourself. |
| **Formula solver** | 116 equations from both courses. Fill in what you know, pick what to solve for, and get the work written out. Handles any unknown, including quadratics like `y = V0yt + 1/2at^2`. |
| **v-t graphs** | Type the corner points of a velocity-time graph. Draws the x-t, v-t and a-t graphs and works out (a) the description, (b) displacement, (c) distance split where it turns around, and (d) the comparison. |
| **Reference sheet** | Every formula and constant, grouped by unit, in plain keyboard characters. Printable. |
| **My progress** | Accuracy per unit, strongest and weakest units, and demo test history with a trend line. Saved in your browser. |
| **Worksheet** | Printable practice sets for any units, with an answer key and a "Numerical Solutions" list. |

### Built like the real exams

- **Source and data sets:** many questions come in groups of 3-4 about one primary-source excerpt, data table or graph, the way the real multiple-choice sections work. Data sets draw new numbers every time.
- **Drawn graphs:** graphs of f', supply and demand, AD-AS, Phillips curves, titration and decay curves, PV and v-t graphs, bar charts and tables are drawn in the page (`js/charts.js`).
- **Every real free-response type:** all 146 task types across the 40 exams have at least one practice question with an official-style rubric, including DBQs, SCOTUS comparison, graph-of-f' questions and CS A 2D arrays.
- **Audio:** Music Theory dictation and sight-singing play generated tones (Web Audio). Language speaking tasks read the prompts aloud with the browser's voice; you answer out loud, then type what you said.
- **Official media:** languages, Music Theory, Art History and Spanish Literature link to the official past questions that include audio and images.

`tools/compare.js` measures how closely each course matches its real exam; `docs-comparison-report.html` shows the results before and after these changes.

Every problem has a **"Watch a video on this"** link (YouTube search for that exact topic) and a link to Khan Academy's free AP Physics course.

## About the questions and the predicted score

- All questions are **original**, written in the style of the AP exams. Real released free-response questions are free on AP Central: [AP Physics 1](https://apcentral.collegeboard.org/courses/ap-physics-1/exam/past-exam-questions), [AP Physics 2](https://apcentral.collegeboard.org/courses/ap-physics-2/exam/past-exam-questions).
- Topic weights follow the College Board course framework ranges (for example Force and Translational Dynamics 18-23% of AP Physics 1).
- The predicted score is a **rough estimate** from multiple-choice practice only. The real exam is half free response, and the College Board does not publish exact cutoffs. For context, in 2025, 19.8% of AP Physics 1 students earned a 5, 24.7% a 4 and 22.9% a 3 (mean 3.12).

## Tests

```bash
node test/test-problems.js   # runs every problem generator 300 times
node test/test-solver.js     # hides each variable of each equation and checks the solver recovers it
node test/test-java.js       # runs every AP CSA tracing problem as real Java (needs a JDK)
```

## Files

- `js/fmt.js`: number formatting (3 sig figs, plain characters), answer checking
- `js/courses.js`: every course, its units, exam weights and score data
- `js/problems-ap1.js`, `js/problems-ap2.js`: physics problem generators
- `js/content/calc.js`, `js/content/chem.js`, `js/content/phys-frq.js`: calculus, chemistry and physics content (problems, concept questions, free response, reference sheets)
- `js/equations.js`: the equation sheet and solver
- `js/mcq.js`: physics concept questions
- `js/app.js`: the interface

AP is a trademark of the College Board, which is not affiliated with this project.

## Also in this repo: Hush

[`hush/`](hush/) is an ambient sound mixer (rain, thunder, waves, a campfire, cafe murmur and more), with every sound synthesized live in the browser. Open `hush/index.html`, or `/hush/` on the GitHub Pages site. See [hush/README.md](hush/README.md).

## Website (GitHub Pages)

Once Pages is turned on (Settings, Pages, Deploy from a branch, `main`, `/ (root)`):

- Stepwise: `https://driodrocco.github.io/cloudforfunproject/`
- Hush: `https://driodrocco.github.io/cloudforfunproject/hush/`

The site is plain HTML, CSS and JavaScript with no server or database. Progress is saved in each visitor's own browser.

- **Works offline and installs like an app.** After the first visit, a service worker (`sw.js`) saves the app so it opens without internet. On a phone, use "Add to Home Screen" (`manifest.webmanifest`, `icons/`).
- **Free-response grading.** On the website, answers are scored with the rubric, and "Copy for Claude" copies your answer, the question and the rubric so you can paste them into any Claude chat for grading. Built-in one-click Claude grading works in the claude.ai version, which can call Claude directly.
- **Tests run automatically** on every push (`.github/workflows/tests.yml`).

## License

MIT
