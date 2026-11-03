/* AP Computer Science Principles: course, binary and pseudocode tracing problems
 * (AP exam reference sheet style), concept questions, written responses, reference. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { R, pick, W, add } = SW;

  SW.defineCourse('csp', {
    name: 'AP Computer Science Principles', short: 'CS Principles', subject: 'Math and Computer Science',
    units: [
      ['csp1', 1, 'Creative Development', '10-13%'],
      ['csp2', 2, 'Data', '17-22%'],
      ['csp3', 3, 'Algorithms and Programming', '30-35%'],
      ['csp4', 4, 'Computer Systems and Networks', '11-15%'],
      ['csp5', 5, 'Impact of Computing', '21-26%'],
    ],
    format: '70 multiple-choice questions (120 min, 70%) + Create performance task with written response questions (30%)',
    dist: { year: 2025, 5: 10.7, 4: 19.9, 3: 31.1 },
    past: 'https://apcentral.collegeboard.org/courses/ap-computer-science-principles/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/computing/ap-computer-science-principles',
  });

  // ---------- data ----------
  add('csp2', 'Binary to decimal', () => {
    const n = R(5, 255, 1), bits = n.toString(2);
    const parts = [...bits].map((b, i) => (b === '1' ? 2 ** (bits.length - 1 - i) : 0)).filter(Boolean);
    return W()
      .l('Binary to decimal', `binary ${bits}`, '')
      .f('Each place is a power of 2: ..., 16, 8, 4, 2, 1. Add the places that have a 1.')
      .l(`places with 1: ${parts.join(' + ')}`, `= ${n}`)
      .exact()
      .done(`What is the decimal value of the binary number ${bits}?`, n, '');
  });

  add('csp2', 'Decimal to binary', () => {
    const n = R(5, 127, 1), bits = n.toString(2);
    const steps = [];
    let x = n;
    for (let p = 2 ** (bits.length - 1); p >= 1; p /= 2) {
      if (x >= p) { steps.push(`${p} fits: 1 (left ${x - p})`); x -= p; } else steps.push(`${p} does not fit: 0`);
    }
    return W()
      .l('Decimal to binary', `decimal ${n}`, '')
      .f('Go from the biggest power of 2 that fits down to 1; write 1 if it fits, 0 if not')
      .l(...steps, `binary = ${bits}`)
      .exact()
      .done(`Write ${n} in binary (type just the 1s and 0s).`, Number(bits), '');
  });

  add('csp2', 'Bits needed', () => {
    const n = R(3, 2000, 1), b = Math.ceil(Math.log2(n));
    return W()
      .l('How many bits?', `${n} different values`, '')
      .f('n bits can represent 2^n values; find the smallest n with 2^n >= the count')
      .l(`2^${b - 1} = ${2 ** (b - 1)} (too few)`, `2^${b} = ${2 ** b} (enough)`, `bits = ${b}`)
      .exact()
      .done(`What is the minimum number of bits needed to give a unique code to each of ${n} different items?`, b, 'bits');
  });

  add('csp2', 'Overflow and number of values', () => {
    const b = R(3, 16, 1), ans = 2 ** b - 1;
    return W()
      .l('Largest value', `${b} bits, unsigned`, '')
      .f('n bits store 0 to 2^n - 1; going past that causes overflow')
      .l(`2^${b} - 1 = ${ans}`)
      .exact()
      .done(`What is the largest whole number that can be stored in ${b} bits (no negative numbers)? Adding 1 to it would cause overflow.`, ans, '');
  });

  // ---------- algorithms (AP pseudocode, text version) ----------
  add('csp3', 'Trace a REPEAT loop', () => {
    const a = R(-5, 10, 1), k = R(2, 6, 1), n = R(3, 8, 1), ans = a + n * k;
    const code = `x <- ${a}\nREPEAT ${n} TIMES\n{\n   x <- x + ${k}\n}\nDISPLAY(x)`;
    return W()
      .code(code)
      .l('Trace', `x starts at ${a}`, `each of the ${n} times adds ${k}`, `x = ${a} + ${n} x ${k} = ${ans}`)
      .f('REPEAT n TIMES runs the block exactly n times')
      .exact()
      .done('What is displayed when this code runs?', ans, '');
  });

  add('csp3', 'Trace a list traversal', () => {
    const list = Array.from({ length: R(5, 8, 1) }, () => R(1, 20, 1)), t = R(5, 15, 1);
    const kept = list.filter(x => x > t), ans = kept.reduce((s, x) => s + x, 0);
    const code = `nums <- [${list.join(', ')}]\ntotal <- 0\nFOR EACH n IN nums\n{\n   IF (n > ${t})\n   {\n      total <- total + n\n   }\n}\nDISPLAY(total)`;
    return W()
      .code(code)
      .l('Trace', `items greater than ${t}: ${kept.length ? kept.join(', ') : 'none'}`, `total = ${kept.length ? kept.join(' + ') : '0'} = ${ans}`)
      .f('FOR EACH visits every item in order; only items passing the IF are added')
      .exact()
      .done('What is displayed?', ans, '');
  });

  add('csp3', 'MOD operator', () => {
    const a = R(10, 99, 1), b = R(2, 9, 1), ans = a % b;
    return W()
      .l('MOD', `${a} MOD ${b}`, '')
      .f('a MOD b is the remainder when a is divided by b')
      .l(`${a} / ${b} = ${Math.floor(a / b)} remainder ${ans}`, `${a} MOD ${b} = ${ans}`)
      .exact()
      .done(`What does ${a} MOD ${b} evaluate to?`, ans, '');
  });

  add('csp3', 'Trace a REPEAT UNTIL loop', () => {
    const start = R(40, 200, 1), ans = (() => { let x = start, c = 0; while (!(x < 10)) { x = Math.floor(x / 2); c++; } return c; })();
    const code = `x <- ${start}\ncount <- 0\nREPEAT UNTIL (x < 10)\n{\n   x <- x / 2   (round down)\n   count <- count + 1\n}\nDISPLAY(count)`;
    const trace = []; for (let x = start, c = 0; !(x < 10); ) { x = Math.floor(x / 2); c++; trace.push(`pass ${c}: x = ${x}`); }
    return W()
      .code(code)
      .l(...trace, `x < 10 now, so the loop stops. count = ${ans}`)
      .f('REPEAT UNTIL checks the condition BEFORE each pass and stops once it is true')
      .exact()
      .done('What is displayed?', ans, '');
  });

  add('csp3', 'Binary search comparisons', () => {
    const n = pick([7, 15, 31, 63, 100, 127, 500, 1000, 1023, 4095]), ans = Math.floor(Math.log2(n)) + 1;
    return W()
      .l('Binary search', `${n} items, sorted`, '')
      .f('Each comparison cuts the list in half; worst case = how many halvings to reach 1 item, plus 1')
      .l(`2^${ans - 1} = ${2 ** (ans - 1)} <= ${n} < 2^${ans} = ${2 ** ans}`, `worst case = ${ans} comparisons`)
      .exact()
      .done(`What is the maximum number of comparisons a binary search needs to find an item in a sorted list of ${n} items?`, ans, '');
  });

  add('csp3', 'Nested loop count', () => {
    const a = R(2, 6, 1), b = R(2, 6, 1), ans = a * b;
    const code = `count <- 0\nREPEAT ${a} TIMES\n{\n   REPEAT ${b} TIMES\n   {\n      count <- count + 1\n   }\n}\nDISPLAY(count)`;
    return W().code(code).l('Inner loop runs fully each outer pass', `${a} x ${b} = ${ans}`).f('nested loops multiply').exact().done('What is displayed?', ans, '');
  });

  // ---------- concept questions ----------
  SW.mcqs('csp1', [
    ['collaboration', 'Why is collaboration helpful when developing a program?', ['It always makes programs run faster', 'Different perspectives can reduce bias and catch errors', 'It removes the need for testing', 'It makes code shorter'], 1, 'Diverse teams spot problems and ideas one person would miss.'],
    ['logic error', 'A program runs without crashing but gives the wrong average. This is a:', ['Syntax error', 'Logic error', 'Runtime error', 'Overflow error'], 1, 'The code is valid but the algorithm is wrong.'],
    ['iterative development', 'In an iterative development process, programmers:', ['Write all code before testing', 'Repeatedly design, test and refine', 'Never change requirements', 'Only test at the end'], 1, 'Each cycle improves the program based on feedback.'],
  ]);
  SW.mcqs('csp2', [
    ['lossless compression', 'Which is true of lossless compression?', ['Some data is permanently lost', 'The original can be perfectly rebuilt', 'It always makes files smaller than lossy', 'It only works on images'], 1, 'Lossless keeps all information; lossy throws some away for smaller size.'],
    ['metadata', 'The date and location stored with a photo are examples of:', ['Metadata', 'Encryption', 'Compression', 'Pixels'], 0, 'Data about the data.'],
    ['data bias', 'A survey only posted on a gaming website may produce biased results because:', ['The sample does not represent the whole population', 'It has too much data', 'It uses binary', 'It is encrypted'], 0, 'Who is in the data matters as much as how much data there is.'],
    ['rounding error', 'Why might 0.1 + 0.2 not equal exactly 0.3 in a computer?', ['Computers cannot add', 'Some decimals cannot be stored exactly in binary (round-off error)', 'Overflow', 'Lossy compression'], 1, 'Real numbers are approximated with a fixed number of bits.'],
  ]);
  SW.mcqs('csp3', [
    ['procedural abstraction', 'Why use a procedure with parameters?', ['To make code run slower', 'To reuse code for different inputs and manage complexity', 'To avoid using variables', 'To store data permanently'], 1, 'One general procedure replaces many copies of nearly identical code.'],
    ['list index', 'In AP pseudocode, if list <- [7, 3, 9], what is list[2]?', ['7', '3', '9', 'Error'], 1, 'AP pseudocode lists start at index 1, so list[2] is the second item.'],
    ['undecidable problem', 'An undecidable problem is one where:', ['No algorithm can always give a correct yes/no answer for every input', 'The algorithm is slow', 'There are two answers', 'The input is too large'], 0, 'The halting problem is the classic example.'],
    ['algorithm efficiency', 'An algorithm that takes about n^2 steps for n items runs in:', ['Unreasonable time', 'Reasonable (polynomial) time', 'Constant time', 'No time'], 1, 'Polynomial time is reasonable; exponential (2^n) is unreasonable.'],
    ['boolean logic', 'NOT (a AND b) is equivalent to:', ['(NOT a) AND (NOT b)', '(NOT a) OR (NOT b)', 'a OR b', 'a AND b'], 1, "De Morgan's law."],
    ['heuristic', 'A heuristic is used when:', ['An exact solution is too slow, so a "good enough" answer is accepted', 'The problem is undecidable', 'The program has a syntax error', 'Data must be encrypted'], 0, 'Like approximating the traveling salesperson route.'],
  ]);
  SW.mcqs('csp4', [
    ['internet redundancy', 'Redundant routing on the Internet means:', ['Data takes one fixed path', 'There are multiple possible paths, so the network is fault tolerant', 'Packets are sent twice', 'Routers store every website'], 1, 'If one path fails, packets can go another way.'],
    ['packets', 'When data is sent over the Internet, it is:', ['Sent as one large file', 'Broken into packets that may arrive out of order', 'Always encrypted', 'Sent only over fiber'], 1, 'TCP reassembles packets in the right order at the destination.'],
    ['parallel computing', 'A task takes 60 s on one processor. Split across 3 processors with a 10 s step that must run alone, the best time is about:', ['20 s', '26.7 s', '30 s', '60 s'], 1, 'The 10 s runs alone; the other 50 s split 3 ways is 16.7 s. Total about 26.7 s.'],
    ['ip address', 'An IP address is used to:', ['Encrypt messages', 'Identify a device on the network so data can be routed to it', 'Compress data', 'Store passwords'], 1, 'Like a mailing address for packets.'],
  ]);
  SW.mcqs('csp5', [
    ['digital divide', 'The digital divide refers to:', ['Splitting data into packets', 'Unequal access to computing and the Internet', 'Lossy compression', 'Dividing by zero'], 1, 'Access varies by income, location and more.'],
    ['phishing', 'An email pretending to be your bank asking for your password is:', ['Phishing', 'Encryption', 'Crowdsourcing', 'A firewall'], 0, 'It tricks people into giving up personal information.'],
    ['public key encryption', 'In public key encryption:', ['The same key encrypts and decrypts', 'Anyone can encrypt with the public key, only the private key decrypts', 'There are no keys', 'Keys are shared publicly for decryption'], 1, 'This lets strangers send you secret messages.'],
    ['creative commons', 'A Creative Commons license lets a creator:', ['Give up all rights', 'Choose how others may share and use their work', 'Prevent all copying', 'Patent software'], 1, 'They pick the terms, like attribution or non-commercial.'],
    ['multifactor authentication', 'Multifactor authentication requires:', ['Two passwords', 'Two or more types of evidence, like a password and a code from a phone', 'A longer password', 'Encryption only'], 1, 'Something you know + something you have (or are).'],
  ]);

  // ---------- written response ----------
  SW.frq('csp3', 'Written response: list and procedure',
    'Think of a program you have written (or imagine an app that tracks a list of quiz scores).\n(a) Describe how a list is used in your program to manage complexity. Explain why the program would be harder to write without it.\n(b) Describe a procedure you wrote that has at least one parameter. Explain what the parameter does and how it changes what the procedure does.\n(c) Describe two different calls to that procedure with different arguments, and the different results each produces.\n(d) Describe one condition a test case checks, and explain how you would know the program worked.',
    [[1, '(a) Names a specific list and what data it stores'], [1, '(a) Explains how the list manages complexity (one variable for many values, loops can process any number of items)'], [1, '(b) Identifies a procedure with a parameter and explains how the parameter changes its behavior'], [1, '(c) Two different calls with different arguments that cause different results, both described'], [1, '(d) Describes a specific test condition and the expected result']],
    '(a) My program stores quiz scores in a list called scores. Without the list I would need a separate variable for each score, and the code to average them would have to change every time a score was added. With the list, one loop handles any number of scores.\n(b) The procedure countAbove(scores, cutoff) returns how many scores are greater than cutoff. The cutoff parameter decides which scores are counted.\n(c) countAbove(scores, 90) with scores [95, 82, 91] returns 2. countAbove(scores, 80) returns 3, because 82 is now counted.\n(d) Test: an empty list should return 0. If countAbove([], 90) returns 0 instead of crashing, the procedure works for that edge case.');
  SW.frq('csp5', 'Computing innovation impact',
    'Consider a facial recognition system used to unlock phones and by police to identify suspects.\n(a) Describe one beneficial effect of this innovation.\n(b) Describe one harmful effect, and explain how bias in the training data could cause it.\n(c) Describe a data privacy concern related to the innovation.',
    [[1, '(a) Valid benefit with explanation'], [2, '(b) Valid harm AND explains that unrepresentative training data can make the system less accurate for some groups'], [1, '(c) Valid privacy concern (collecting/storing images without consent, tracking people, data breaches)']],
    '(a) It makes phones more secure and faster to unlock, since a face is harder to steal than a short PIN.\n(b) It can misidentify people. If the training data has mostly faces from one group, the system is less accurate for other groups, which can lead to wrongful police stops.\n(c) Images of people\'s faces can be collected and stored without their consent, then used to track where they go.');

  // ---------- reference ----------
  SW.REF.csp = () => `
    <p class="muted small">A plain-text version of the AP CSP exam reference sheet. Lists start at index 1.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>Assignment, display, input</h4><table>
        <tr><td class="eqn">a <- expression</td><td class="muted">store a value</td></tr><tr><td class="eqn">DISPLAY(expression)</td></tr><tr><td class="eqn">INPUT()</td></tr></table></div>
      <div class="ref-unit"><h4>Operators</h4><table>
        <tr><td class="eqn">+ - * /</td></tr><tr><td class="eqn">a MOD b</td><td class="muted">remainder</td></tr>
        <tr><td class="eqn">= != &gt; &lt; &gt;= &lt;=</td></tr><tr><td class="eqn">NOT, AND, OR</td></tr><tr><td class="eqn">RANDOM(a, b)</td><td class="muted">integer from a to b</td></tr></table></div>
      <div class="ref-unit"><h4>Selection and iteration</h4><table>
        <tr><td class="eqn">IF (condition) { } ELSE { }</td></tr><tr><td class="eqn">REPEAT n TIMES { }</td></tr>
        <tr><td class="eqn">REPEAT UNTIL (condition) { }</td></tr><tr><td class="eqn">FOR EACH item IN aList { }</td></tr></table></div>
      <div class="ref-unit"><h4>Lists</h4><table>
        <tr><td class="eqn">aList <- [v1, v2, v3]</td></tr><tr><td class="eqn">aList[i]</td><td class="muted">index starts at 1</td></tr>
        <tr><td class="eqn">INSERT(aList, i, value)</td></tr><tr><td class="eqn">APPEND(aList, value)</td></tr>
        <tr><td class="eqn">REMOVE(aList, i)</td></tr><tr><td class="eqn">LENGTH(aList)</td></tr></table></div>
      <div class="ref-unit"><h4>Procedures</h4><table>
        <tr><td class="eqn">PROCEDURE name(p1, p2) { ... RETURN(x) }</td></tr></table></div>
      <div class="ref-unit"><h4>Binary</h4><table>
        <tr><td class="eqn">place values: 128 64 32 16 8 4 2 1</td></tr><tr><td class="eqn">n bits store 2^n values (0 to 2^n - 1)</td></tr>
        <tr><td class="eqn">binary search worst case ~ log2(n) + 1 steps (list must be sorted)</td></tr></table></div>
    </div>`;
})();
