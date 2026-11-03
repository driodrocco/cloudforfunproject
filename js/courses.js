/* Course registry. Each course lists its units with the College Board exam
 * weight ranges, the exam format, the latest official score distribution,
 * and links. Content files (problems, concept questions, free response,
 * reference sheets) register themselves against unit ids. */
(function () {
  'use strict';
  const SW = (globalThis.SW = globalThis.SW || {});

  SW.UNITS = []; // { id, n, name }
  SW.COURSES = {}; // id -> course
  SW.MCQ = SW.MCQ || [];
  SW.FRQ = SW.FRQ || [];
  SW.REF = SW.REF || {}; // course id -> () => html

  const mid = r => { const [a, b] = r.split('-').map(parseFloat); return (a + b) / 2; };

  function course(id, def) {
    def.id = id;
    def.unitIds = def.units.map(u => u[0]);
    def.ranges = {};
    def.weights = {};
    for (const [uid, n, name, range] of def.units) {
      if (!SW.UNITS.some(u => u.id === uid)) SW.UNITS.push({ id: uid, n, name });
      def.ranges[uid] = range;
      def.weights[uid] = mid(range);
    }
    def.tools = def.tools || [];
    def.cut = def.cut || [70, 55, 40, 25]; // rough percent-correct cutoffs for 5/4/3/2
    SW.COURSES[id] = def;
  }

  const CB = slug => `https://apcentral.collegeboard.org/courses/${slug}/exam/past-exam-questions`;
  const DIST = slug => `https://apstudents.collegeboard.org/about-ap-scores/score-distributions/${slug}`;

  // ---------------- Science ----------------
  course('phys1', {
    name: 'AP Physics 1', short: 'Physics 1', subject: 'Science',
    units: [
      ['kin', 1, 'Kinematics', '10-15%'],
      ['dyn', 2, 'Force and Translational Dynamics', '18-23%'],
      ['energy', 3, 'Work, Energy, and Power', '18-23%'],
      ['mom', 4, 'Linear Momentum', '10-15%'],
      ['rot', 5, 'Torque and Rotational Dynamics', '10-15%'],
      ['rotE', 6, 'Energy and Momentum of Rotating Systems', '5-8%'],
      ['osc', 7, 'Oscillations', '5-8%'],
      ['fluids', 8, 'Fluids', '10-15%'],
    ],
    format: '40 multiple-choice questions (80 min, 50%) + 4 free-response questions (100 min, 50%)',
    dist: { year: 2025, 5: 19.8, 4: 24.7, 3: 22.9, mean: 3.12 },
    past: CB('ap-physics-1'), distUrl: DIST('ap-physics-1'),
    khan: 'https://www.khanacademy.org/science/ap-physics-1',
    tools: ['solver', 'graph'],
  });

  course('phys2', {
    name: 'AP Physics 2', short: 'Physics 2', subject: 'Science',
    units: [
      ['thermo', 9, 'Thermodynamics', '15-18%'],
      ['elec', 10, 'Electric Force, Field, and Potential', '15-18%'],
      ['circ', 11, 'Electric Circuits', '15-18%'],
      ['mag', 12, 'Magnetism and Electromagnetism', '12-15%'],
      ['optics', 13, 'Geometric Optics', '12-15%'],
      ['waves', 14, 'Waves, Sound, and Physical Optics', '12-15%'],
      ['modern', 15, 'Modern Physics', '12-15%'],
    ],
    format: '40 multiple-choice questions (80 min, 50%) + 4 free-response questions (100 min, 50%)',
    dist: null,
    past: CB('ap-physics-2'), distUrl: DIST('ap-physics-2'),
    khan: 'https://www.khanacademy.org/science/ap-physics-2',
    tools: ['solver'],
  });

  course('chem', {
    name: 'AP Chemistry', short: 'Chemistry', subject: 'Science',
    units: [
      ['chem1', 1, 'Atomic Structure and Properties', '7-9%'],
      ['chem2', 2, 'Compound Structure and Properties', '7-9%'],
      ['chem3', 3, 'Properties of Substances and Mixtures', '18-22%'],
      ['chem4', 4, 'Chemical Reactions', '7-9%'],
      ['chem5', 5, 'Kinetics', '7-9%'],
      ['chem6', 6, 'Thermochemistry', '7-9%'],
      ['chem7', 7, 'Equilibrium', '7-9%'],
      ['chem8', 8, 'Acids and Bases', '11-15%'],
      ['chem9', 9, 'Thermodynamics and Electrochemistry', '7-9%'],
    ],
    format: '60 multiple-choice questions (90 min, 50%) + 7 free-response questions: 3 long, 4 short (105 min, 50%)',
    dist: { year: 2025, 5: 17.8, 4: 28.6, 3: 31.5, mean: 3.36 },
    past: CB('ap-chemistry'), distUrl: DIST('ap-chemistry'),
    khan: 'https://www.khanacademy.org/science/ap-chemistry-beta',
    tools: ['solver'],
  });

  // ---------------- Math ----------------
  const CALC_UNITS_AB = [
    ['calc1', 1, 'Limits and Continuity', '10-12%'],
    ['calc2', 2, 'Differentiation: Definition and Fundamental Properties', '10-12%'],
    ['calc3', 3, 'Differentiation: Composite, Implicit, and Inverse Functions', '9-13%'],
    ['calc4', 4, 'Contextual Applications of Differentiation', '10-15%'],
    ['calc5', 5, 'Analytical Applications of Differentiation', '15-18%'],
    ['calc6', 6, 'Integration and Accumulation of Change', '17-20%'],
    ['calc7', 7, 'Differential Equations', '6-12%'],
    ['calc8', 8, 'Applications of Integration', '10-15%'],
  ];
  course('calcab', {
    name: 'AP Calculus AB', short: 'Calc AB', subject: 'Math',
    units: CALC_UNITS_AB,
    format: '45 multiple-choice questions (30 no calculator + 15 calculator, 105 min, 50%) + 6 free-response questions (2 calculator + 4 no calculator, 90 min, 50%)',
    dist: { year: 2025, 5: 20.3, 4: 28.9, 3: 15.0 },
    past: CB('ap-calculus-ab'), distUrl: DIST('ap-calculus-ab'),
    khan: 'https://www.khanacademy.org/math/ap-calculus-ab',
    tools: ['graph'],
    cut: [65, 50, 37, 25],
  });
  course('calcbc', {
    name: 'AP Calculus BC', short: 'Calc BC', subject: 'Math',
    units: [
      ['calc1', 1, 'Limits and Continuity', '4-7%'],
      ['calc2', 2, 'Differentiation: Definition and Fundamental Properties', '4-7%'],
      ['calc3', 3, 'Differentiation: Composite, Implicit, and Inverse Functions', '4-7%'],
      ['calc4', 4, 'Contextual Applications of Differentiation', '6-9%'],
      ['calc5', 5, 'Analytical Applications of Differentiation', '8-11%'],
      ['calc6', 6, 'Integration and Accumulation of Change', '17-20%'],
      ['calc7', 7, 'Differential Equations', '6-9%'],
      ['calc8', 8, 'Applications of Integration', '6-9%'],
      ['calc9', 9, 'Parametric Equations, Polar Coordinates, and Vector-Valued Functions', '11-12%'],
      ['calc10', 10, 'Infinite Sequences and Series', '17-18%'],
    ],
    format: '45 multiple-choice questions (30 no calculator + 15 calculator, 105 min, 50%) + 6 free-response questions (2 calculator + 4 no calculator, 90 min, 50%)',
    dist: { year: 2025, 5: 43.9, 4: 21.8, 3: 12.8, mean: 3.82 },
    past: CB('ap-calculus-bc'), distUrl: DIST('ap-calculus-bc'),
    khan: 'https://www.khanacademy.org/math/ap-calculus-bc',
    tools: ['graph'],
    cut: [65, 50, 37, 25],
  });

  SW.courseList = () => Object.values(SW.COURSES);
  SW.unitById = id => SW.UNITS.find(u => u.id === id);
  SW.courseOfUnit = (id, prefer) => (prefer && SW.COURSES[prefer]?.unitIds.includes(id) ? SW.COURSES[prefer] : SW.courseList().find(c => c.unitIds.includes(id)));

  // A generator, question or free-response item can be limited to some courses with `only`.
  SW.inCourse = (item, courseId) => SW.COURSES[courseId].unitIds.includes(item.unit) && (!item.only || item.only.includes(courseId));

  SW.predictScore = (pct, courseId) => {
    const [c5, c4, c3, c2] = SW.COURSES[courseId].cut;
    return pct >= c5 ? 5 : pct >= c4 ? 4 : pct >= c3 ? 3 : pct >= c2 ? 2 : 1;
  };

  SW.videoLink = (topic, courseId) =>
    'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${SW.COURSES[courseId].name} ${topic} explained`);
})();
