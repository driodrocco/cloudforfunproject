/* AP Computer Science Principles: more pseudocode tracing (AP exam reference sheet
 * style, lists start at index 1), concept questions for every unit, and practice for
 * the Create performance task written responses using the student's own program. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { R, pick, W, add, r3, num } = SW;
  const M = (unit, rows) => SW.mcqs(unit, rows.map(([t, q, c, why]) => [t, q, c, 0, why]));

  // ======================= TRACING GENERATORS =======================
  add('csp3', 'Trace a procedure with RETURN', () => {
    const a = R(2, 15, 1), b = R(2, 15, 1), k = R(2, 4, 1);
    const big = a > b, ans = big ? a - b : a + b * k;
    const code = `PROCEDURE mystery(x, y)\n{\n   IF (x > y)\n   {\n      RETURN (x - y)\n   }\n   ELSE\n   {\n      RETURN (x + y * ${k})\n   }\n}\nDISPLAY(mystery(${a}, ${b}))`;
    return W().code(code)
      .l(`x = ${a}, y = ${b}`, `Is ${a} > ${b}? ${big ? 'true' : 'false'}`, big ? `RETURN ${a} - ${b} = ${ans}` : `RETURN ${a} + ${b} * ${k} = ${ans}`)
      .f('Arguments are copied into the parameters in order; RETURN sends the value back to the call')
      .n('Multiplication happens before addition, as in math.')
      .exact().done('What is displayed?', ans, '');
  });

  add('csp3', 'List operations (APPEND, INSERT, REMOVE)', () => {
    const list = Array.from({ length: R(4, 6, 1) }, () => R(1, 30, 1));
    const app = R(1, 30, 1), insAt = R(1, list.length, 1), insVal = R(31, 60, 1);
    const work = list.slice(), steps = [];
    work.push(app); steps.push(`APPEND: [${work.join(', ')}]`);
    work.splice(insAt - 1, 0, insVal); steps.push(`INSERT at ${insAt}: [${work.join(', ')}]`);
    const remAt = R(1, work.length, 1);
    work.splice(remAt - 1, 1); steps.push(`REMOVE index ${remAt}: [${work.join(', ')}]`);
    const askLen = Math.random() < 0.3, idx = R(1, work.length, 1), ans = askLen ? work.length : work[idx - 1];
    const code = `nums <- [${list.join(', ')}]\nAPPEND(nums, ${app})\nINSERT(nums, ${insAt}, ${insVal})\nREMOVE(nums, ${remAt})\nDISPLAY(${askLen ? 'LENGTH(nums)' : `nums[${idx}]`})`;
    return W().code(code)
      .l(...steps, askLen ? `LENGTH(nums) = ${ans}` : `nums[${idx}] = ${ans}`)
      .f('AP lists start at index 1. INSERT shifts later items right; REMOVE shifts them left')
      .exact().done('What is displayed?', ans, '');
  });

  add('csp3', 'Trace variable assignments', () => {
    const x = R(2, 12, 1), y = R(2, 12, 1);
    const ops = [['a <- a + b', (a, b) => [a + b, b]], ['b <- a - b', (a, b) => [a, a - b]], ['a <- a * 2', (a, b) => [a * 2, b]], ['b <- b + a', (a, b) => [a, b + a]], ['a <- a - b', (a, b) => [a - b, b]]];
    const chosen = [pick(ops), pick(ops), pick(ops)];
    let a = x, b = y;
    const lines = [`a = ${a}, b = ${b}`];
    for (const [txt, fn] of chosen) { [a, b] = fn(a, b); lines.push(`${txt}: a = ${a}, b = ${b}`); }
    const showA = Math.random() < 0.5, ans = showA ? a : b;
    return W().code(`a <- ${x}\nb <- ${y}\n${chosen.map(c => c[0]).join('\n')}\nDISPLAY(${showA ? 'a' : 'b'})`)
      .l(...lines, `${showA ? 'a' : 'b'} = ${ans}`)
      .f('Each assignment uses the CURRENT values, then overwrites the variable on the left')
      .exact().done('What is displayed?', ans, '');
  });

  add('csp3', 'Linear search comparisons', () => {
    const list = [...new Set(Array.from({ length: 12 }, () => R(1, 50, 1)))].slice(0, R(6, 9, 1));
    const found = Math.random() < 0.7, target = found ? pick(list) : 51 + R(0, 20, 1);
    const ans = found ? list.indexOf(target) + 1 : list.length;
    return W()
      .l(`list = [${list.join(', ')}]`, `target = ${target}`, found ? `found at position ${ans}` : 'not in the list: every item is checked', `comparisons = ${ans}`)
      .f('Linear search checks items one at a time from the start until it finds the target or reaches the end')
      .exact().done(`A linear search looks for ${target} in [${list.join(', ')}], stopping as soon as it is found. How many items are compared with the target?`, ans, '');
  });

  add('csp4', 'Parallel computing speedup', () => {
    const tasks = Array.from({ length: R(3, 4, 1) }, () => R(10, 60, 5));
    const seq = tasks.reduce((s, x) => s + x, 0);
    let best = Infinity, split = null;
    for (let m = 0; m < 1 << tasks.length; m++) {
      const p1 = tasks.filter((_, i) => m & (1 << i)), p2 = tasks.filter((_, i) => !(m & (1 << i)));
      const t = Math.max(p1.reduce((s, x) => s + x, 0), p2.reduce((s, x) => s + x, 0));
      if (t < best) { best = t; split = [p1, p2]; }
    }
    const sp = seq / best;
    return W()
      .l(`tasks = ${tasks.join(', ')} seconds`, `sequential time = ${tasks.join(' + ')} = ${seq} s`, `best split: [${split[0].join(', ') || 'none'}] and [${split[1].join(', ') || 'none'}]`, `parallel time = ${best} s (the slower processor)`)
      .f('speedup = sequential time / parallel time')
      .l(`speedup = ${seq} / ${best}`, `speedup = ${num(sp)}`)
      .done(`Independent tasks take ${tasks.join(', ')} seconds. They are split between 2 processors as efficiently as possible. What is the speedup compared with running them all on 1 processor?`, r3(sp), '');
  });

  add('csp2', 'Image file size in bytes', () => {
    const w = pick([8, 16, 32, 64]), h = pick([8, 10, 16, 20]), bits = pick([1, 8, 24]);
    const total = (w * h * bits) / 8;
    return W()
      .l(`pixels = ${w} x ${h} = ${w * h}`, `bits per pixel = ${bits}`, `total bits = ${w * h} x ${bits} = ${w * h * bits}`)
      .f('bytes = bits / 8')
      .l(`bytes = ${w * h * bits} / 8 = ${total}`)
      .exact().done(`An image is ${w} by ${h} pixels and uses ${bits} bit${bits > 1 ? 's' : ''} per pixel. How many bytes are needed to store the pixel data (no compression)?`, total, 'bytes');
  });

  // ======================= CONCEPT QUESTIONS =======================
  M('csp1', [
    ['program requirements', 'Program requirements (specifications) describe:', ['What the program must do and how it should behave', 'The exact code to write', 'Only the colors of the interface', 'The programmer\'s schedule'], 'They are written before and refined during development.'],
    ['user testing', 'A developer watches students use a new study app and notes where they get confused. This is:', ['User testing to gather feedback', 'Debugging syntax errors', 'Data compression', 'Encryption'], 'Feedback drives the next iteration.'],
    ['comments', 'Comments in code are mainly used to:', ['Explain the code for people reading it; they do not affect how it runs', 'Make the program run faster', 'Store data', 'Fix errors automatically'], 'Documentation helps collaborators and your future self.'],
    ['syntax error', 'A program will not run because a closing bracket is missing. This is a:', ['Syntax error', 'Logic error', 'Overflow error', 'Run-time error'], 'The code breaks the rules of the language.'],
    ['run-time error', 'A program crashes while running when it tries to access list[10] in a list of 5 items. This is a:', ['Run-time error', 'Syntax error', 'Logic error that never stops the program', 'Rounding error'], 'It happens during execution.'],
    ['test cases', 'Which set of test inputs is best for testing a procedure that should accept ages from 13 to 18?', ['12, 13, 18 and 19', '15 only', '13 and 14', '100 and 200'], 'Test boundaries on both sides (edge cases).'],
    ['event-driven', 'In an app where code runs when the user clicks a button, the program is:', ['Event-driven', 'Sequential only', 'Compressed', 'Recursive'], 'Events (clicks, key presses) trigger code.'],
    ['incremental development', 'Writing and testing a small part of a program before adding the next part is:', ['Incremental development', 'Waterfall planning', 'Lossy compression', 'Phishing'], 'Build and test piece by piece.'],
    ['acknowledgment', 'When using code written by someone else in your program, you should:', ['Acknowledge the source and author in your program or documentation', 'Rename it so it looks like yours', 'Remove all comments', 'Never use code from others'], 'Required for the Create task too.'],
    ['program input', 'Which is an example of program input?', ['Text a user types into a search box', 'A message displayed on screen', 'A sound the program plays', 'A file the program saves'], 'Input comes into the program; output goes out.'],
    ['collaboration diversity', 'A team with members from different backgrounds is more likely to:', ['Notice how the program affects different users and avoid bias', 'Write code with more syntax errors', 'Finish more slowly with no benefit', 'Need fewer test cases'], 'Diverse perspectives improve design.'],
  ]);
  M('csp2', [
    ['analog vs digital', 'Converting a sound wave into digital data by measuring it at regular intervals is called:', ['Sampling', 'Encryption', 'Compression', 'Routing'], 'More samples per second = closer to the original sound.'],
    ['lossy compression', 'Which is the best reason to choose lossy compression for photos on a website?', ['Smaller files load faster, and the small loss in quality is hard to notice', 'It keeps every original bit', 'It can always be reversed exactly', 'It increases the file size'], 'Lossless is needed when exact data matters (like text).'],
    ['bits represent', 'The same sequence of bits can represent a number, a letter or a color. This shows that:', ['The meaning of bits depends on how they are interpreted (abstraction)', 'Computers cannot store letters', 'Every bit sequence is a number only', 'Bits are always text'], 'Context determines meaning.'],
    ['correlation', 'Data shows that cities with more coffee shops have more patents. A valid conclusion is:', ['The two are correlated, but that does not prove coffee shops cause patents', 'Coffee shops cause patents', 'Patents cause coffee shops to open', 'The data must be wrong'], 'Correlation does not imply causation (city size may explain both).'],
    ['data cleaning', 'Changing "CA", "Calif." and "California" in a dataset to one consistent value is:', ['Data cleaning', 'Encryption', 'Lossy compression', 'Phishing'], 'Makes the data uniform for processing.'],
    ['big data scalability', 'Processing a very large dataset may require:', ['Parallel or distributed computing across many machines', 'Deleting most of the data first', 'Only one slow computer', 'Converting it all to images'], 'Large data needs scalable systems.'],
    ['overflow', 'A program stores numbers in 4 bits. What happens when it tries to store 16?', ['Overflow error, because 4 bits can only represent 0 to 15', 'It stores 16 correctly', 'It rounds to 16.5', 'It becomes a letter'], '2^4 = 16 values: 0 to 15.'],
    ['visualization', 'A data scientist makes a scatter plot of study time vs. test score. The plot mainly helps to:', ['Discover patterns or trends in the data', 'Encrypt the data', 'Compress the data', 'Remove all outliers automatically'], 'Visualizations reveal relationships.'],
  ]);
  M('csp3', [
    ['random', 'RANDOM(1, 6) in AP pseudocode can return:', ['Any integer from 1 to 6, including 1 and 6', 'Only 2, 3, 4 or 5', 'Any decimal between 1 and 6', 'Only 1 or 6'], 'Both ends are included.'],
    ['binary search requirement', 'Binary search can only be used when:', ['The list is sorted', 'The list has fewer than 10 items', 'The list contains only strings', 'The list has duplicates'], 'It repeatedly halves a sorted range.'],
    ['reasonable time', 'Which algorithm runs in an UNREASONABLE amount of time as n grows?', ['One that takes 2^n steps', 'One that takes n steps', 'One that takes n^2 steps', 'One that takes 5n + 3 steps'], 'Exponential time is unreasonable; polynomial is reasonable.'],
    ['halting problem', 'The halting problem is an example of:', ['An undecidable problem: no algorithm can solve it for all inputs', 'A problem solved by binary search', 'A syntax error', 'A lossless compression method'], 'Proven by Alan Turing.'],
    ['argument vs parameter', 'In the call area(4, 7), the values 4 and 7 are:', ['Arguments', 'Parameters', 'Return values', 'Libraries'], 'Parameters are the names in the procedure definition.'],
    ['library api', 'An API (application programming interface) for a library mainly:', ['Explains how to use the library\'s procedures', 'Compresses the program', 'Encrypts the code', 'Removes all errors'], 'Documentation for using existing code.'],
    ['simulation', 'Simulations are useful because they:', ['Let you study situations that are too costly, dangerous or slow to test in real life', 'Always give perfectly accurate results', 'Never use random numbers', 'Replace all real-world testing'], 'They simplify reality, so results can have limits.'],
    ['string concatenation', 'If name <- "Ada", what does "Hi " + name produce in a language that joins strings with +?', ['"Hi Ada"', '"HiAda "', '"Ada Hi"', 'An error'], 'Concatenation joins strings end to end.'],
  ]);
  M('csp4', [
    ['protocol', 'A protocol is:', ['An agreed set of rules for how devices communicate', 'A type of computer virus', 'A physical cable', 'A programming language'], 'Examples: TCP, IP, HTTP.'],
    ['tcp', 'TCP is responsible for:', ['Making sure packets arrive and are put back in the right order', 'Translating domain names into IP addresses', 'Displaying web pages', 'Encrypting all data'], 'Reliable delivery.'],
    ['dns', 'The Domain Name System (DNS):', ['Translates names like example.com into IP addresses', 'Encrypts web traffic', 'Routes packets between continents', 'Stores all websites'], 'Like a phone book for the Internet.'],
    ['www vs internet', 'The World Wide Web is:', ['A system of linked pages that runs on the Internet using HTTP', 'The same thing as the Internet', 'The physical cables of the Internet', 'A single computer'], 'The Internet is the network; the Web is one service on it.'],
    ['fault tolerance', 'A network is fault-tolerant when:', ['It keeps working even if some devices or connections fail', 'It never has any errors', 'It uses only one path', 'It blocks all traffic'], 'Redundancy makes this possible.'],
    ['bandwidth', 'Bandwidth is:', ['The maximum amount of data that can be sent in a fixed amount of time', 'The delay before data arrives', 'The number of users online', 'The size of a packet'], 'Measured in bits per second.'],
    ['packets order', 'Packets from the same message may:', ['Take different routes and arrive out of order', 'Always arrive in order on one path', 'Never be resent if lost', 'Contain the whole file each'], 'They are reassembled at the destination.'],
    ['distributed computing', 'Using many computers in different places to solve a problem together is:', ['Distributed computing', 'Sequential computing', 'Lossy compression', 'Phishing'], 'Example: scientific projects on volunteers\' computers.'],
    ['open standards', 'The Internet can grow to billions of devices mainly because:', ['It is built on open, shared protocols that anyone can use', 'One company controls all devices', 'Every device needs a special license', 'It uses only one router'], 'Open protocols allow scalability.'],
    ['parallel limit', 'Why does adding more processors eventually stop making a program faster?', ['Some steps must still be done in order (sequentially)', 'Processors slow each other down to zero', 'Computers can only use 2 processors', 'Parallel computing never helps'], 'The sequential part limits the speedup.'],
  ]);
  M('csp5', [
    ['crowdsourcing', 'An app that gathers traffic reports from thousands of drivers is an example of:', ['Crowdsourcing', 'Encryption', 'Lossy compression', 'A digital divide'], 'Many people contribute data or work.'],
    ['citizen science', 'Volunteers classifying galaxies in photos for astronomers is:', ['Citizen science', 'Phishing', 'Malware', 'A rogue access point'], 'The public helps with scientific research.'],
    ['pii', 'Which is personally identifiable information (PII)?', ['A person\'s Social Security number', 'The population of a country', 'The average temperature of a city', 'The number of students in a school'], 'It can identify a specific person.'],
    ['cookies', 'Websites use cookies to:', ['Store small pieces of data, such as login status or browsing activity', 'Speed up the CPU', 'Encrypt passwords', 'Block all ads'], 'They can raise privacy concerns when used to track users.'],
    ['keylogging', 'Software that secretly records what a user types is:', ['A keylogger (malware)', 'A firewall', 'A certificate authority', 'Open-source software'], 'Used to steal passwords.'],
    ['rogue access point', 'A free Wi-Fi hotspot set up by an attacker to capture users\' data is a:', ['Rogue access point', 'Certificate authority', 'Protocol', 'Router upgrade'], 'Avoid sending sensitive data on unknown networks.'],
    ['symmetric encryption', 'In symmetric encryption:', ['The same key is used to encrypt and decrypt', 'A public key encrypts and a private key decrypts', 'No key is used', 'Only the receiver has a key'], 'Both sides must share the secret key.'],
    ['certificate authority', 'A certificate authority (CA) helps users by:', ['Verifying that a website\'s public key really belongs to that website', 'Blocking all viruses', 'Making websites load faster', 'Storing everyone\'s passwords'], 'Digital certificates build trust.'],
    ['algorithmic bias', 'A hiring algorithm trained on past hiring decisions favors one group. The most likely cause is:', ['Bias in the historical training data', 'The algorithm used too many comments', 'The computer was too slow', 'The data was compressed'], 'Algorithms can reproduce human bias in data.'],
    ['open source', 'Open-source software:', ['Makes its code freely available for others to view and modify', 'Can never be used by companies', 'Is always less secure', 'Is software with no license at all'], 'Licenses still set terms of use.'],
    ['unintended consequences', 'A social media feature designed to connect friends also spreads false information quickly. This shows that:', ['Computing innovations can have unintended harmful effects', 'The feature had no benefits', 'Software cannot be changed', 'Only intended effects matter'], 'Effects can be both beneficial and harmful.'],
  ]);

  // ======================= CREATE TASK: WRITTEN RESPONSES =======================
  // On exam day students answer written-response prompts about their own Create task program,
  // using their Personalized Project Reference (screen captures of a procedure and a list).
  const PPR = 'Paste your Personalized Project Reference first: (1) the code for your student-developed procedure, (2) the code where that procedure is called, (3) the code where data is stored in your list, and (4) the code where the list is used. Then answer the questions below about YOUR program.';
  SW.frq('csp1', 'Create task written response 1: program design, function and purpose',
    `${PPR}\n\n(a) Identify the expected users of your program and describe one way your program meets their needs or interests.\n(b) Describe one way you used feedback, testing or reflection during development to change your program. Explain why you made the change.\n(c) Describe the input to your program and the output it produces, and explain how they relate to the program's purpose.`,
    [[1, '(a) Identifies a specific group of users and describes how the program meets a need or interest of that group'], [1, '(b) Describes a specific change made because of feedback, testing or reflection and explains why'], [1, '(c) Identifies a specific input and output and explains how they connect to the program\'s purpose']],
    'Example for a quiz-score tracker:\n(a) My users are high school students preparing for tests. The program lets them enter quiz scores and shows which unit has the lowest average, so they know what to review.\n(b) When a friend tested it, she entered "eighty" instead of 80 and the program crashed. I added a check that only accepts numbers from 0 to 100 and shows a message otherwise, so users get clear feedback instead of an error.\n(c) The input is the score typed by the user and the unit chosen from a menu. The output is a message such as "Review Unit 3: average 64%." The input fills the list of scores, and the output gives the advice that is the program\'s purpose.');
  SW.frq('csp3', 'Create task written response 2: algorithm, errors and abstraction',
    `${PPR}\n\n(a) Algorithm development: Consider the procedure in your Personalized Project Reference. Describe in detail how the algorithm in the procedure uses sequencing, selection and iteration to accomplish its task, so that someone else could write it.\n(b) Errors and testing: Describe two calls to your procedure that each pass a different argument and cause a different segment of code to run. Describe the condition being tested by each call and the result of each call.\n(c) Data and procedural abstraction: Explain how your list manages complexity in your program. Explain why your program could not be written, or how it would be written differently, without the list.`,
    [[1, '(a) Describes the algorithm accurately in enough detail to recreate it, including sequencing, selection and iteration as they appear in the procedure'], [1, '(b) Two calls with different arguments that cause different code segments to run, with the condition tested and the result of each'], [1, '(c) Explains how the list manages complexity and why the program would be harder or impossible to write without it']],
    'Example for a procedure averageAbove(scores, minimum):\n(a) The procedure starts total and count at 0 (sequencing). It loops through every item in the scores list (iteration). For each score, an IF checks whether it is at least minimum (selection); if so, it adds the score to total and adds 1 to count. After the loop, if count is 0 it returns 0, otherwise it returns total / count.\n(b) Call 1: averageAbove([90, 70, 85], 80). The condition "score >= 80" is true for 90 and 85, so those are added and the result is 87.5. Call 2: averageAbove([50, 60], 80). The condition is false for every score, so count stays 0 and the "count = 0" branch returns 0.\n(c) The scores list holds every quiz score in one variable, so one loop can process any number of scores. Without the list, I would need a separate variable for each score and would have to change the code every time a new score was added, so the program could not handle a changing number of scores.');
})();
