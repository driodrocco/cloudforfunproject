/* AP Computer Science A (2025-26 four-unit course): Java tracing problems,
 * concept questions, free response, Java quick reference. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { R, pick, W, add } = SW;

  SW.defineCourse('csa', {
    name: 'AP Computer Science A', short: 'CS A', subject: 'Math and Computer Science',
    units: [
      ['csa1', 1, 'Using Objects and Methods', '15-25%'],
      ['csa2', 2, 'Selection and Iteration', '25-35%'],
      ['csa3', 3, 'Class Creation', '10-18%'],
      ['csa4', 4, 'Data Collections', '30-40%'],
    ],
    format: '42 multiple-choice questions (90 min, 55%) + 4 free-response questions (90 min, 45%), all in Java',
    dist: { year: 2025, 5: 25.6, 4: 21.8, 3: 19.8, mean: 3.18 },
    past: 'https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/computing/computer-programming',
  });
  // Khan Academy has no AP CSA course; CSAwesome is the free standard.
  SW.COURSES.csa.khan = 'https://runestone.academy/ns/books/published/csawesome2/index.html';

  const jdiv = (a, b) => Math.trunc(a / b);

  // ---------- Unit 1: objects, methods, expressions ----------
  add('csa1', 'Integer division and modulus', () => {
    const a = R(10, 99, 1), b = R(2, 9, 1), c = R(2, 9, 1), ans = jdiv(a, b) + (a % c);
    return W()
      .code(`int a = ${a};\nint result = a / ${b} + a % ${c};\nSystem.out.println(result);`)
      .l(`a / ${b} = ${jdiv(a, b)} (int division drops the decimal)`, `a % ${c} = ${a % c} (remainder)`, `result = ${jdiv(a, b)} + ${a % c} = ${ans}`)
      .f('int / int truncates toward zero; % gives the remainder')
      .n('7 / 2 is 3 in Java, not 3.5, when both are ints.')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa1', 'Casting and order of operations', () => {
    const d = R(2.1, 9.9, 0.1), a = R(3, 20, 1), b = R(2, 5, 1), ans = Math.trunc(d) + jdiv(a, b);
    return W()
      .code(`double d = ${d.toFixed(1)};\nint x = (int) d + ${a} / ${b};\nSystem.out.println(x);`)
      .l(`(int) ${d.toFixed(1)} = ${Math.trunc(d)} (casting cuts off the decimal)`, `${a} / ${b} = ${jdiv(a, b)}`, `x = ${Math.trunc(d)} + ${jdiv(a, b)} = ${ans}`)
      .f('(int) casts truncate; the cast applies only to d, not the whole expression')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa1', 'String indexOf', () => {
    const word = pick(['programming', 'computer', 'algorithm', 'iteration', 'variable', 'recursion', 'abstraction']);
    const chars = [...new Set(word)], ch = pick(chars), ans = word.indexOf(ch);
    return W()
      .code(`String s = "${word}";\nSystem.out.println(s.indexOf("${ch}"));`)
      .l(`indexes: ${[...word].map((c, i) => `${i}:${c}`).join(' ')}`, `first "${ch}" is at index ${ans}`)
      .f('indexOf returns the FIRST index (starting at 0), or -1 if not found')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa1', 'String substring length', () => {
    const word = pick(['programming', 'computer', 'algorithm', 'iteration', 'variable', 'abstraction']);
    const a = R(0, 3, 1), b = R(a + 1, word.length, 1), sub = word.substring(a, b), ans = sub.length;
    return W()
      .code(`String s = "${word}";\nString t = s.substring(${a}, ${b});\nSystem.out.println(t.length());`)
      .l(`substring(${a}, ${b}) takes indexes ${a} to ${b - 1}: "${sub}"`, `length = ${b} - ${a} = ${ans}`)
      .f('substring(a, b) includes index a but NOT index b')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa1', 'Math.abs and Math.pow', () => {
    const a = R(-9, -1, 1), b = R(2, 4, 1), c = R(2, 3, 1), ans = Math.abs(a) + b ** c;
    return W()
      .code(`int x = Math.abs(${a}) + (int) Math.pow(${b}, ${c});\nSystem.out.println(x);`)
      .l(`Math.abs(${a}) = ${-a}`, `Math.pow(${b}, ${c}) = ${b ** c}.0, cast to ${b ** c}`, `x = ${-a} + ${b ** c} = ${ans}`)
      .f('Math.pow returns a double; cast it to store in an int')
      .exact()
      .done('What is printed?', ans, '');
  });

  // ---------- Unit 2: selection and iteration ----------
  add('csa2', 'Trace a for loop sum', () => {
    const a = R(0, 5, 1), b = R(a + 4, a + 15, 1), s = pick([1, 2, 3]);
    let sum = 0; for (let i = a; i <= b; i += s) sum += i;
    const vals = []; for (let i = a; i <= b; i += s) vals.push(i);
    return W()
      .code(`int sum = 0;\nfor (int i = ${a}; i <= ${b}; i += ${s}) {\n    sum += i;\n}\nSystem.out.println(sum);`)
      .l(`i takes the values ${vals.join(', ')}`, `sum = ${vals.join(' + ')} = ${sum}`)
      .f('List every value the loop variable takes, including the last one that still passes the condition')
      .exact()
      .done('What is printed?', sum, '');
  });

  add('csa2', 'Trace a while loop', () => {
    const n0 = R(20, 500, 1);
    let n = n0, count = 0; const steps = [];
    while (n > 1) { n = jdiv(n, 2); count++; steps.push(n); }
    return W()
      .code(`int n = ${n0};\nint count = 0;\nwhile (n > 1) {\n    n = n / 2;\n    count++;\n}\nSystem.out.println(count);`)
      .l(`n goes: ${n0} -> ${steps.join(' -> ')}`, `loop stops when n is 1; count = ${count}`)
      .f('Check the condition before every pass; int division rounds down')
      .exact()
      .done('What is printed?', count, '');
  });

  add('csa2', 'Nested loop count', () => {
    const n = R(3, 8, 1), ans = (n * (n + 1)) / 2;
    return W()
      .code(`int count = 0;\nfor (int i = 0; i < ${n}; i++) {\n    for (int j = i; j < ${n}; j++) {\n        count++;\n    }\n}\nSystem.out.println(count);`)
      .l(`inner loop runs ${n}, ${n - 1}, ..., 1 times`, `total = ${Array.from({ length: n }, (_, i) => n - i).join(' + ')} = ${ans}`)
      .f('When the inner loop depends on i, count each pass separately')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa2', 'If / else if chain', () => {
    const x = R(-10, 30, 1);
    const ans = x > 20 ? 3 : x > 10 ? 2 : x > 0 ? 1 : 0;
    return W()
      .code(`int x = ${x};\nint r;\nif (x > 20) r = 3;\nelse if (x > 10) r = 2;\nelse if (x > 0) r = 1;\nelse r = 0;\nSystem.out.println(r);`)
      .l(`x = ${x}`, `first true condition gives r = ${ans}`)
      .f('Only the FIRST true branch of an if / else if chain runs')
      .exact()
      .done('What is printed?', ans, '');
  });

  // ---------- Unit 3: class creation ----------
  add('csa3', 'Trace object state', () => {
    const start = R(0, 10, 1), a = R(1, 9, 1), b = R(1, 9, 1), ans = start + a + b;
    return W()
      .code(`public class Counter {\n    private int count;\n    public Counter(int start) { count = start; }\n    public void add(int n) { count += n; }\n    public int getCount() { return count; }\n}\n\nCounter c = new Counter(${start});\nc.add(${a});\nc.add(${b});\nSystem.out.println(c.getCount());`)
      .l(`constructor sets count = ${start}`, `add(${a}) -> ${start + a}`, `add(${b}) -> ${ans}`)
      .f('Each method call changes the same object\'s instance variable')
      .exact()
      .done('What is printed?', ans, '');
  });

  // ---------- Unit 4: data collections ----------
  add('csa4', 'Array traversal: count', () => {
    const arr = Array.from({ length: R(5, 9, 1) }, () => R(-5, 20, 1)), k = R(0, 12, 1), ans = arr.filter(x => x > k).length;
    return W()
      .code(`int[] arr = {${arr.join(', ')}};\nint count = 0;\nfor (int v : arr) {\n    if (v > ${k}) count++;\n}\nSystem.out.println(count);`)
      .l(`values greater than ${k}: ${arr.filter(x => x > k).join(', ') || 'none'}`, `count = ${ans}`)
      .f('The enhanced for loop visits each element once')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa4', 'Array traversal: even indexes', () => {
    const arr = Array.from({ length: R(5, 9, 1) }, () => R(1, 20, 1)), ans = arr.filter((_, i) => i % 2 === 0).reduce((s, x) => s + x, 0);
    return W()
      .code(`int[] arr = {${arr.join(', ')}};\nint sum = 0;\nfor (int i = 0; i < arr.length; i += 2) {\n    sum += arr[i];\n}\nSystem.out.println(sum);`)
      .l(`indexes 0, 2, 4...: ${arr.filter((_, i) => i % 2 === 0).join(' + ')}`, `sum = ${ans}`)
      .f('Indexes start at 0; i += 2 skips every other element')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa4', 'ArrayList operations', () => {
    const a = R(1, 9, 1), b = R(1, 9, 1), c = R(1, 9, 1), d = R(1, 9, 1);
    const list = [a, b, c]; list.splice(1, 0, d); list.splice(0, 1); const ans = list.reduce((s, x) => s + x, 0) * 10 + list.length;
    return W()
      .code(`ArrayList<Integer> list = new ArrayList<>();\nlist.add(${a});\nlist.add(${b});\nlist.add(${c});\nlist.add(1, ${d});\nlist.remove(0);\nint total = 0;\nfor (int v : list) total += v;\nSystem.out.println(total * 10 + list.size());`)
      .l(`after adds: [${a}, ${b}, ${c}]`, `add(1, ${d}): [${a}, ${d}, ${b}, ${c}]`, `remove(0): [${list.join(', ')}]`, `total = ${list.reduce((s, x) => s + x, 0)}, size = ${list.length}`, `printed: ${ans}`)
      .f('add(i, x) shifts later items right; remove(i) shifts them left')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa4', '2D array row sum', () => {
    const rows = R(2, 4, 1), cols = R(2, 4, 1), m = Array.from({ length: rows }, () => Array.from({ length: cols }, () => R(0, 9, 1))), r = R(0, rows - 1, 1);
    const ans = m[r].reduce((s, x) => s + x, 0);
    return W()
      .code(`int[][] m = {${m.map(row => `{${row.join(', ')}}`).join(', ')}};\nint sum = 0;\nfor (int c = 0; c < m[${r}].length; c++) {\n    sum += m[${r}][c];\n}\nSystem.out.println(sum);`)
      .l(`row ${r} is {${m[r].join(', ')}}`, `sum = ${m[r].join(' + ')} = ${ans}`)
      .f('m[row][col]: the first index picks the row')
      .exact()
      .done('What is printed?', ans, '');
  });

  add('csa4', 'Trace recursion', () => {
    const n = R(3, 7, 1), f = k => (k === 0 ? 0 : k + f(k - 1)), ans = f(n);
    return W()
      .code(`public static int mystery(int n) {\n    if (n == 0) return 0;\n    return n + mystery(n - 1);\n}\n\nSystem.out.println(mystery(${n}));`)
      .l(`mystery(${n}) = ${Array.from({ length: n }, (_, i) => n - i).join(' + ')} + 0`, `= ${ans}`)
      .f('Expand each call until the base case, then add up on the way back')
      .exact()
      .done('What is printed?', ans, '');
  });

  // ---------- concept questions ----------
  SW.mcqs('csa1', [
    ['string immutability', 'After String s = "cat"; s.toUpperCase(); what is s?', ['"CAT"', '"cat"', 'null', 'Error'], 1, 'Strings are immutable; toUpperCase returns a new String that was never stored.'],
    ['equals vs ==', 'To check if two String objects have the same characters, use:', ['==', '.equals()', '=', 'compareTo() == 1'], 1, '== checks whether they are the same object; equals compares contents.'],
    ['null pointer', 'Calling a method on a variable that holds null causes:', ['A compile error', 'A NullPointerException at runtime', 'It returns 0', 'Nothing happens'], 1, 'There is no object to call the method on.'],
    ['integer overflow', 'Integer.MAX_VALUE + 1 evaluates to:', ['Integer.MAX_VALUE', 'Integer.MIN_VALUE', 'An error', 'Infinity'], 1, 'int overflow wraps around to the most negative value.'],
  ]);
  SW.mcqs('csa2', [
    ['short circuit', 'In (x != 0 && 10 / x > 2), what happens when x is 0?', ['ArithmeticException', 'The second part is skipped, result false', 'Result true', 'Compile error'], 1, '&& short-circuits: if the left side is false, the right side never runs.'],
    ['de morgan', '!(a > 5 || b < 3) is equivalent to:', ['a <= 5 && b >= 3', 'a < 5 || b > 3', 'a <= 5 || b >= 3', 'a > 5 && b < 3'], 0, "De Morgan: flip each comparison and swap || for &&."],
    ['off by one', 'for (int i = 0; i <= arr.length; i++) { sum += arr[i]; } will:', ['Work correctly', 'Throw ArrayIndexOutOfBoundsException', 'Skip the first element', 'Loop forever'], 1, 'The last valid index is arr.length - 1.'],
    ['infinite loop', 'Which loop never ends?', ['int i = 0; while (i < 5) i++;', 'int i = 0; while (i < 5) i--;', 'for (int i = 0; i < 5; i++) {}', 'int i = 10; while (i > 5) i--;'], 1, 'i keeps getting smaller and is always less than 5.'],
  ]);
  SW.mcqs('csa3', [
    ['encapsulation private', 'Why are instance variables usually private?', ['To make the program faster', 'So other classes must use methods, protecting the data (encapsulation)', 'Because Java requires it', 'So they can be static'], 1, 'Methods can check values before changing the object.'],
    ['constructor', 'A constructor:', ['Has a return type of void', 'Has the same name as the class and no return type', 'Must be static', 'Is called with .construct()'], 1, 'It initializes a new object when you use new.'],
    ['static method', 'A static method:', ['Belongs to the class, not a specific object', 'Can use instance variables directly', 'Must be called on an object', 'Cannot have parameters'], 0, 'Call it with ClassName.method(); it has no "this".'],
    ['this keyword', 'In a constructor, this.x = x; means:', ['Assign the parameter x to the instance variable x', 'Compare two values', 'Create a new object', 'Call another constructor'], 0, 'this.x is the instance variable; plain x is the parameter.'],
  ]);
  SW.mcqs('csa4', [
    ['arraylist remove in loop', 'Removing items from an ArrayList while looping forward by index often:', ['Works perfectly', 'Skips the element after each removed one', 'Throws a compile error', 'Removes everything'], 1, 'Items shift left, so i++ jumps past one. Loop backwards or don\'t increment after removing.'],
    ['array default values', 'What does new int[5] contain?', ['Five nulls', 'Five 0s', 'Random values', 'Nothing until filled'], 1, 'Numeric arrays start filled with 0; object arrays start with null.'],
    ['linear vs binary search', 'Binary search requires the array to be:', ['Unsorted', 'Sorted', 'Small', 'Of Strings'], 1, 'It throws away half the remaining values each step based on order.'],
    ['selection sort', 'After one pass of selection sort (ascending), what is guaranteed?', ['The array is sorted', 'The smallest element is in index 0', 'The largest element is first', 'Nothing'], 1, 'Each pass finds the minimum of the unsorted part and swaps it into place.'],
    ['2d array dimensions', 'For int[][] grid = new int[3][5]; grid[0].length is:', ['3', '5', '15', '0'], 1, 'There are 3 rows, each with 5 columns.'],
  ]);

  // ---------- free response ----------
  SW.frq('csa2', 'Methods and control structures',
    'Write a static method countVowels that takes a String word and returns the number of vowels (a, e, i, o, u, lowercase only) in the word.\nExample: countVowels("banana") returns 3, countVowels("sky") returns 0.\n\npublic static int countVowels(String word)',
    [[1, 'Loops over every character of word (no index out of bounds)'], [1, 'Accesses one character/one-letter substring correctly (substring(i, i + 1) or charAt)'], [1, 'Correctly checks whether it is one of a, e, i, o, u'], [1, 'Counts matches in a variable initialized to 0'], [1, 'Returns the count (not printing it)']],
    'public static int countVowels(String word) {\n    int count = 0;\n    for (int i = 0; i < word.length(); i++) {\n        String c = word.substring(i, i + 1);\n        if ("aeiou".indexOf(c) >= 0) {\n            count++;\n        }\n    }\n    return count;\n}');
  SW.frq('csa3', 'Class design: BankAccount',
    'Write a complete BankAccount class.\n- A constructor takes an owner name (String) and a starting balance (double).\n- deposit(double amt) adds amt to the balance only if amt > 0.\n- withdraw(double amt) subtracts amt and returns true only if amt <= balance; otherwise it changes nothing and returns false.\n- getBalance() returns the balance.',
    [[1, 'Private instance variables for owner and balance'], [1, 'Constructor with correct header that initializes both variables'], [1, 'deposit adds only when amt > 0'], [2, 'withdraw checks amt <= balance, subtracts and returns true, else returns false without changing balance'], [1, 'getBalance returns the balance'], [1, 'Methods are public with correct return types']],
    'public class BankAccount {\n    private String owner;\n    private double balance;\n\n    public BankAccount(String owner, double balance) {\n        this.owner = owner;\n        this.balance = balance;\n    }\n\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n\n    public boolean withdraw(double amt) {\n        if (amt <= balance) {\n            balance -= amt;\n            return true;\n        }\n        return false;\n    }\n\n    public double getBalance() {\n        return balance;\n    }\n}');
  SW.frq('csa4', 'ArrayList: remove short words',
    'Write a method removeShort that takes an ArrayList<String> words and an int min, and removes every word whose length is less than min. The method returns the number of words removed.\nExample: words = ["a", "tree", "is", "green"], min = 3 -> words becomes ["tree", "green"], returns 2.\n\npublic static int removeShort(ArrayList<String> words, int min)',
    [[1, 'Traverses the whole list'], [1, 'Correctly compares length() to min'], [2, 'Removes items without skipping any (loops backward, or does not increment after a removal)'], [1, 'Counts and returns the number removed']],
    'public static int removeShort(ArrayList<String> words, int min) {\n    int removed = 0;\n    for (int i = words.size() - 1; i >= 0; i--) {\n        if (words.get(i).length() < min) {\n            words.remove(i);\n            removed++;\n        }\n    }\n    return removed;\n}');

  // ---------- reference ----------
  SW.REF.csa = () => `
    <p class="muted small">Based on the Java Quick Reference you get on the exam.</p>
    <div class="ref-grid">
      <div class="ref-unit"><h4>String</h4><table>
        <tr><td class="eqn">int length()</td></tr><tr><td class="eqn">String substring(int from, int to)</td><td class="muted">from to to-1</td></tr>
        <tr><td class="eqn">String substring(int from)</td></tr><tr><td class="eqn">int indexOf(String str)</td><td class="muted">-1 if not found</td></tr>
        <tr><td class="eqn">boolean equals(Object other)</td></tr><tr><td class="eqn">int compareTo(String other)</td><td class="muted">&lt;0, 0, &gt;0</td></tr>
        <tr><td class="eqn">String[] split(String del)</td></tr></table></div>
      <div class="ref-unit"><h4>Math</h4><table>
        <tr><td class="eqn">static int abs(int x), static double abs(double x)</td></tr><tr><td class="eqn">static double pow(double base, double exp)</td></tr>
        <tr><td class="eqn">static double sqrt(double x)</td></tr><tr><td class="eqn">static double random()</td><td class="muted">0.0 to &lt;1.0</td></tr>
        <tr><td class="eqn">(int)(Math.random() * n) + a</td><td class="muted">random int a to a+n-1</td></tr></table></div>
      <div class="ref-unit"><h4>ArrayList&lt;E&gt;</h4><table>
        <tr><td class="eqn">int size()</td></tr><tr><td class="eqn">boolean add(E obj)</td></tr><tr><td class="eqn">void add(int index, E obj)</td></tr>
        <tr><td class="eqn">E get(int index)</td></tr><tr><td class="eqn">E set(int index, E obj)</td></tr><tr><td class="eqn">E remove(int index)</td></tr></table></div>
      <div class="ref-unit"><h4>Integer and Object</h4><table>
        <tr><td class="eqn">Integer.MAX_VALUE, Integer.MIN_VALUE</td></tr><tr><td class="eqn">int intValue(), Integer.parseInt(String s)</td></tr>
        <tr><td class="eqn">boolean equals(Object other)</td></tr><tr><td class="eqn">String toString()</td></tr></table></div>
      <div class="ref-unit"><h4>Arrays</h4><table>
        <tr><td class="eqn">int[] a = new int[n];</td><td class="muted">filled with 0</td></tr><tr><td class="eqn">a.length</td><td class="muted">no parentheses</td></tr>
        <tr><td class="eqn">int[][] g = new int[rows][cols];</td></tr><tr><td class="eqn">g.length (rows), g[0].length (cols)</td></tr></table></div>
      <div class="ref-unit"><h4>Common patterns</h4><table>
        <tr><td class="eqn">for (int i = 0; i &lt; arr.length; i++)</td></tr><tr><td class="eqn">for (Type x : collection)</td><td class="muted">read only</td></tr>
        <tr><td class="eqn">for (int i = list.size() - 1; i &gt;= 0; i--)</td><td class="muted">safe removal</td></tr></table></div>
    </div>`;
})();
