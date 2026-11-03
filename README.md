# Stepwise: AP study, step by step

Practice for AP courses with **step-by-step worked solutions**, free-response grading, demo tests with a predicted score, and reference sheets.

**Courses so far (20):** AP Physics 1, AP Physics 2, AP Physics C: Mechanics, AP Physics C: E&M, AP Chemistry, AP Biology, AP Environmental Science, AP Calculus AB, AP Calculus BC, AP Precalculus, AP Statistics, AP Computer Science Principles, AP Computer Science A, AP English Language, AP US History, AP World History: Modern, AP Macroeconomics, AP Microeconomics. More are being added in batches.

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

## License

MIT
