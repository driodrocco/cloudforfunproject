/* AP Physics C: Mechanics and AP Physics C: Electricity and Magnetism.
 * Mechanics shares the Physics 1 unit structure (same unit names since the
 * 2024 revision) and adds calculus-based problems; E&M has its own units. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, sg, R, pick, W, add } = SW;
  const CM = { only: ['physcm'] };
  const K = '9.0 x 10^9 N m^2/C^2', k = 9.0e9, e0 = 8.85e-12, u0 = 4 * Math.PI * 1e-7;

  SW.defineCourse('physcm', {
    name: 'AP Physics C: Mechanics', short: 'Physics C Mech', subject: 'Science',
    units: [
      ['kin', 1, 'Kinematics', '10-15%'],
      ['dyn', 2, 'Force and Translational Dynamics', '20-25%'],
      ['energy', 3, 'Work, Energy, and Power', '15-25%'],
      ['mom', 4, 'Linear Momentum', '10-20%'],
      ['rot', 5, 'Torque and Rotational Dynamics', '10-15%'],
      ['rotE', 6, 'Energy and Momentum of Rotating Systems', '5-10%'],
      ['osc', 7, 'Oscillations', '10-15%'],
    ],
    format: '40 multiple-choice questions (80 min, 50%) + 4 free-response questions (100 min, 50%). Calculus used throughout. Unit weights are approximate.',
    dist: { year: 2025, 5: 21.7, 4: 24.0, 3: 27.5 },
    past: 'https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/science/physics',
    tools: ['solver', 'graph'],
  });

  SW.defineCourse('physce', {
    name: 'AP Physics C: Electricity and Magnetism', short: 'Physics C E&M', subject: 'Science',
    units: [
      ['em1', 8, "Electric Charges, Fields, and Gauss's Law", '15-25%'],
      ['em2', 9, 'Electric Potential', '10-20%'],
      ['em3', 10, 'Conductors and Capacitors', '10-15%'],
      ['em4', 11, 'Electric Circuits', '15-25%'],
      ['em5', 12, 'Magnetic Fields and Electromagnetism', '10-20%'],
      ['em6', 13, 'Electromagnetic Induction', '10-20%'],
    ],
    format: '40 multiple-choice questions (80 min, 50%) + 4 free-response questions (100 min, 50%). Calculus used throughout. Unit weights are approximate.',
    dist: null,
    past: 'https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism/exam/past-exam-questions',
    khan: 'https://www.khanacademy.org/science/physics',
    tools: ['solver'],
  });

  // ================= Mechanics (calculus) =================
  add('kin', 'Velocity and acceleration from x(t)', () => {
    const a = R(1, 4, 1), b = R(-6, 6, 1), c = R(-9, 9, 1), t = R(1, 5, 1);
    const v = 3 * a * t * t + 2 * b * t + c, acc = 6 * a * t + 2 * b;
    return W()
      .l('Calculus kinematics', `x(t) = ${a}t^3 ${b < 0 ? '- ' + -b : '+ ' + b}t^2 ${c < 0 ? '- ' + -c : '+ ' + c}t (m)`, `t = ${t} s`, 'a = ?', '')
      .f('v = dx/dt, a = dv/dt')
      .l(`v(t) = ${3 * a}t^2 ${2 * b < 0 ? '- ' + -2 * b : '+ ' + 2 * b}t ${c < 0 ? '- ' + -c : '+ ' + c}`, `v(${t}) = ${v} m/s`, `a(t) = ${6 * a}t ${2 * b < 0 ? '- ' + -2 * b : '+ ' + 2 * b}`, `a(${t}) = ${sg(acc)} m/s^2`)
      .done(`A particle moves with x(t) = ${a}t^3 ${b < 0 ? '- ' + -b : '+ ' + b}t^2 ${c < 0 ? '- ' + -c : '+ ' + c}t (x in m, t in s). What is its acceleration at t = ${t} s?`, acc, 'm/s^2', true);
  }, CM);

  add('kin', 'Displacement from v(t)', () => {
    const kk = R(0.5, 4, 0.5), T = R(2, 6, 1), x = r3((kk * T ** 3) / 3);
    return W()
      .l('Calculus kinematics', `v(t) = ${g(kk)}t^2 (m/s)`, `0 to ${T} s`, 'displacement = ?', '')
      .f('displacement = integral of v dt')
      .l(`= integral from 0 to ${T} of ${g(kk)}t^2 dt`, `= ${g(kk)}t^3/3 from 0 to ${T}`, `= ${num(x)} m`)
      .done(`An object's velocity is v(t) = ${g(kk)}t^2 m/s. How far does it move from t = 0 to t = ${T} s?`, x, 'm');
  }, CM);

  add('energy', 'Work by a variable force', () => {
    const kk = R(1, 20, 1), L = R(0.5, 4, 0.5), Wk = r3((kk * L ** 3) / 3);
    return W()
      .l('Variable force', `F(x) = ${kk}x^2 (N)`, `x from 0 to ${g(L)} m`, 'W = ?', '')
      .f('W = integral of F dx')
      .l(`W = integral from 0 to ${g(L)} of ${kk}x^2 dx`, `= ${kk}x^3/3 from 0 to ${g(L)}`, `= ${num(Wk)} J`)
      .done(`A force F(x) = ${kk}x^2 newtons pushes an object from x = 0 to x = ${g(L)} m. How much work does it do?`, Wk, 'J');
  }, CM);

  add('energy', 'Power at an instant', () => {
    const F = R(50, 500, 10), v = R(2, 30, 1), P = F * v;
    return W()
      .l('Power', `F = ${F} N (along the motion)`, `v = ${v} m/s`, '')
      .f('P = F . v = Fv cos(theta)')
      .l(`P = (${F} N)(${v} m/s)`, `P = ${num(P)} W`)
      .done(`A ${F} N force pushes a cart forward while it moves at ${v} m/s. What power does the force deliver?`, P, 'W');
  }, CM);

  add('mom', 'Impulse from a changing force', () => {
    const c = R(10, 200, 10), T = R(0.1, 2, 0.1), m = R(0.5, 10, 0.5), J = r3((c * T * T) / 2), dv = r3(J / m);
    return W()
      .l('Impulse', `F(t) = ${c}t (N)`, `0 to ${g(T)} s`, `m = ${g(m)} kg (starts at rest)`, 'v = ?', '')
      .f('J = integral of F dt = change in momentum')
      .l(`J = ${c}t^2/2 from 0 to ${g(T)} = ${num(J)} N s`, `v = J/m = ${num(J)}/${g(m)} = ${num(dv)} m/s`)
      .done(`A ${g(m)} kg object at rest feels a force F(t) = ${c}t newtons for ${g(T)} s. What is its final speed?`, dv, 'm/s');
  }, CM);

  add('dyn', 'Terminal velocity with linear drag', () => {
    const m = R(0.1, 5, 0.1), b = R(0.1, 5, 0.1), vt = r3((m * 9.8) / b);
    return W()
      .l('Drag force F = -bv', `m = ${g(m)} kg`, `b = ${g(b)} kg/s`, 'terminal speed = ?', '')
      .f('At terminal speed, drag balances gravity: bv = mg')
      .l(`v = mg/b = (${g(m)})(9.8)/${g(b)}`, `v = ${num(vt)} m/s`)
      .n('The full solution is v(t) = (mg/b)(1 - e^(-bt/m)); it approaches mg/b.')
      .done(`An object of mass ${g(m)} kg falls with a drag force -bv, where b = ${g(b)} kg/s. What is its terminal speed?`, vt, 'm/s');
  }, CM);

  add('dyn', 'Center of mass of a nonuniform rod', () => {
    const L = R(0.5, 4, 0.5), xcm = r3((2 * L) / 3);
    return W()
      .l('Center of mass', `rod from x = 0 to ${g(L)} m`, 'density lambda = cx (heavier at the far end)', '')
      .f('x_cm = (integral of x dm)/(integral of dm), dm = lambda dx')
      .l(`top: integral of cx^2 dx = c L^3/3`, `bottom: integral of cx dx = c L^2/2`, `x_cm = (L^3/3)/(L^2/2) = 2L/3 = ${num(xcm)} m`)
      .done(`A rod of length ${g(L)} m has linear density lambda = cx. Where is its center of mass (distance from x = 0)?`, xcm, 'm');
  }, CM);

  add('rot', 'Rotational inertia of a rod', () => {
    const M = R(0.5, 10, 0.5), L = R(0.5, 3, 0.1), end = Math.random() < 0.5, I = r3(((end ? 1 / 3 : 1 / 12) * M * L * L));
    return W()
      .l('Rotational inertia', `uniform rod: M = ${g(M)} kg, L = ${g(L)} m`, `axis through the ${end ? 'end' : 'center'}`, '')
      .f(`I = integral of r^2 dm = ${end ? '(1/3)ML^2 about an end' : '(1/12)ML^2 about the center'}`)
      .l(`I = ${end ? '(1/3)' : '(1/12)'}(${g(M)})(${g(L)})^2`, `I = ${num(I)} kg m^2`)
      .done(`What is the rotational inertia of a ${g(M)} kg, ${g(L)} m uniform rod about an axis through its ${end ? 'end' : 'center'}?`, I, 'kg m^2');
  }, CM);

  add('rotE', 'Rolling sphere down an incline', () => {
    const h = R(0.5, 5, 0.1), v = r3(Math.sqrt((10 * 9.8 * h) / 7));
    return W()
      .l('Rolling without slipping', `solid sphere, I = (2/5)MR^2`, `drop height h = ${g(h)} m`, '')
      .f('Mgh = (1/2)Mv^2 + (1/2)I omega^2 with omega = v/R')
      .l('Mgh = (1/2)Mv^2 + (1/5)Mv^2 = (7/10)Mv^2', `v = sqrt(10gh/7) = sqrt(10(9.8)(${g(h)})/7)`, `v = ${num(v)} m/s`)
      .done(`A solid sphere rolls without slipping from rest down a ramp, dropping ${g(h)} m. What is its speed at the bottom?`, v, 'm/s');
  }, CM);

  add('osc', 'Simple harmonic motion: maximum speed', () => {
    const kk = R(10, 400, 10), m = R(0.1, 4, 0.1), A = R(0.02, 0.4, 0.01), w = r3(Math.sqrt(kk / m)), v = r3(A * Math.sqrt(kk / m));
    return W()
      .l('SHM', `k = ${kk} N/m, m = ${g(m)} kg, A = ${g(A)} m`, '')
      .f('x(t) = A cos(omega t + phi), omega = sqrt(k/m), v max = A omega')
      .l(`omega = sqrt(${kk}/${g(m)}) = ${num(w)} rad/s`, `v max = (${g(A)})(${num(w)}) = ${num(v)} m/s`)
      .done(`A ${g(m)} kg mass on a spring with k = ${kk} N/m oscillates with amplitude ${g(A)} m. What is its maximum speed?`, v, 'm/s');
  }, CM);

  // ================= E&M =================
  add('em1', 'Field outside a charged sphere (Gauss)', () => {
    const Q = R(1, 9, 0.5) * 1e-6, r = R(0.1, 2, 0.05), E = r3((k * Q) / (r * r));
    return W()
      .l("Gauss's law", `Q = ${g(Q)} C on a sphere`, `r = ${g(r)} m (outside)`, '')
      .f('flux = E(4 pi r^2) = Q/eps0, so E = kQ/r^2 outside')
      .l(`E = (${K})(${g(Q)})/(${g(r)})^2`, `E = ${num(E)} N/C`)
      .n('Outside a spherical charge, the field is the same as if all the charge were at the center.')
      .done(`A sphere carries ${g(Q * 1e6)} uC spread evenly. What is the field ${g(r)} m from its center (outside the sphere)?`, E, 'N/C');
  });

  add('em1', 'Field of a long line of charge', () => {
    const lam = R(1, 9, 0.5) * 1e-6, r = R(0.05, 1, 0.05), E = r3(lam / (2 * Math.PI * e0 * r));
    return W()
      .l("Gauss's law (cylinder)", `lambda = ${g(lam)} C/m`, `r = ${g(r)} m`, '')
      .f('E(2 pi r L) = lambda L / eps0, so E = lambda/(2 pi eps0 r)')
      .l(`E = ${g(lam)}/(2pi(8.85 x 10^-12)(${g(r)}))`, `E = ${num(E)} N/C`)
      .done(`A long straight wire carries ${g(lam * 1e6)} uC per meter. What is the field ${g(r)} m away?`, E, 'N/C');
  });

  add('em1', 'Electric flux through a closed surface', () => {
    const q = R(1, 9, 0.5) * 1e-9 * pick([1, -1]), flux = r3(q / e0);
    return W()
      .l("Gauss's law", `charge enclosed = ${g(q)} C`, '')
      .f('flux = q enclosed / eps0')
      .l(`flux = ${g(q)}/(8.85 x 10^-12)`, `flux = ${sg(flux)} N m^2/C`)
      .n('The shape and size of the surface do not matter, only the charge inside.')
      .done(`A closed surface surrounds a ${g(q * 1e9)} nC charge. What is the electric flux through it?`, flux, 'N m^2/C', true);
  });

  add('em2', 'Potential from two point charges', () => {
    const q1 = R(1, 9, 0.5) * 1e-9, q2 = R(1, 9, 0.5) * 1e-9 * pick([1, -1]), r1 = R(0.1, 1, 0.05), r2 = R(0.1, 1, 0.05);
    const V = r3(k * q1 / r1 + k * q2 / r2);
    return W()
      .l('Superposition of potential', `q1 = ${g(q1)} C at r1 = ${g(r1)} m`, `q2 = ${g(q2)} C at r2 = ${g(r2)} m`, '')
      .f('V = sum of kq/r (scalars, keep signs)')
      .l(`V = (9.0 x 10^9)(${g(q1)})/${g(r1)} + (9.0 x 10^9)(${g(q2)})/${g(r2)}`, `V = ${sg(V)} V`)
      .done(`Point P is ${g(r1)} m from a ${g(q1 * 1e9)} nC charge and ${g(r2)} m from a ${g(q2 * 1e9)} nC charge. What is the electric potential at P?`, V, 'V', true);
  });

  add('em2', 'Field from a potential function', () => {
    const a = R(1, 20, 1), x = R(0.5, 5, 0.5), E = r3(-2 * a * x);
    return W()
      .l('E from V', `V(x) = ${a}x^2 (V)`, `x = ${g(x)} m`, '')
      .f('E = -dV/dx')
      .l(`dV/dx = ${2 * a}x`, `E = -${2 * a}(${g(x)}) = ${sg(E)} V/m`)
      .n('The field points toward lower potential.')
      .done(`The potential along an axis is V(x) = ${a}x^2 volts. What is the x-component of the electric field at x = ${g(x)} m?`, E, 'V/m', true);
  });

  add('em3', 'Capacitors in series', () => {
    const c1 = R(1, 20, 1), c2 = R(1, 20, 1), V = R(3, 24, 1), C = r3(1 / (1 / c1 + 1 / c2)), Q = r3(C * V);
    return W()
      .l('Series capacitors', `C1 = ${c1} uF, C2 = ${c2} uF`, `battery ${V} V`, 'charge on each = ?', '')
      .f('1/Ceq = 1/C1 + 1/C2; series capacitors carry the same charge Q = Ceq V')
      .l(`Ceq = ${num(C)} uF`, `Q = (${num(C)} uF)(${V} V) = ${num(Q)} uC`)
      .done(`${c1} uF and ${c2} uF capacitors are in series with a ${V} V battery. How much charge (in uC) is on each?`, Q, 'uC');
  });

  add('em3', 'Capacitor with a dielectric', () => {
    const kap = pick([2.1, 3.0, 3.7, 4.5, 5.6]), A = R(0.01, 0.2, 0.01), d = R(0.0005, 0.005, 0.0005), C = r3((kap * e0 * A) / d);
    return W()
      .l('Parallel plates with dielectric', `kappa = ${kap}, A = ${g(A)} m^2, d = ${g(d)} m`, '')
      .f('C = kappa eps0 A / d')
      .l(`C = (${kap})(8.85 x 10^-12)(${g(A)})/(${g(d)})`, `C = ${num(C)} F`)
      .done(`A parallel-plate capacitor (A = ${g(A)} m^2, d = ${g(d)} m) is filled with a dielectric of kappa = ${kap}. What is its capacitance?`, C, 'F');
  });

  add('em4', 'RC circuit: charge after time t', () => {
    const Rr = R(1, 100, 1) * 1000, C = R(1, 100, 1) * 1e-6, V = R(3, 24, 1), tau = r3(Rr * C), t = r3(tau * R(0.3, 3, 0.1)), Q = r3(C * V * (1 - Math.exp(-t / tau)));
    return W()
      .l('Charging capacitor', `R = ${g(Rr)} ohm, C = ${g(C)} F, emf = ${V} V`, `t = ${g(t)} s`, '')
      .f('q(t) = C emf (1 - e^(-t/RC)), tau = RC')
      .l(`tau = (${g(Rr)})(${g(C)}) = ${num(tau)} s`, `q = (${g(C)})(${V})(1 - e^(-${g(t)}/${num(tau)}))`, `q = ${num(Q)} C`)
      .done(`An uncharged ${g(C * 1e6)} uF capacitor charges through a ${g(Rr / 1000)} kilohm resistor from a ${V} V battery. What is its charge after ${g(t)} s?`, Q, 'C');
  });

  add('em4', 'RC time constant', () => {
    const Rr = R(1, 500, 1) * 1000, C = R(1, 500, 1) * 1e-6, tau = r3(Rr * C);
    return W().l('RC circuit', `R = ${g(Rr)} ohm, C = ${g(C)} F`, '').f('tau = RC').l(`tau = (${g(Rr)})(${g(C)}) = ${num(tau)} s`)
      .done(`What is the time constant of a ${g(Rr / 1000)} kilohm resistor in series with a ${g(C * 1e6)} uF capacitor?`, tau, 's');
  });

  add('em5', 'Field inside a solenoid', () => {
    const n = R(200, 5000, 100), I = R(0.5, 10, 0.5), B = r3(u0 * n * I);
    return W()
      .l("Ampere's law (solenoid)", `n = ${n} turns/m`, `I = ${g(I)} A`, '')
      .f('B = u0 n I')
      .l(`B = (4pi x 10^-7)(${n})(${g(I)})`, `B = ${num(B)} T`)
      .done(`A long solenoid has ${n} turns per meter and carries ${g(I)} A. What is the magnetic field inside?`, B, 'T');
  });

  add('em5', 'Force between parallel wires', () => {
    const I1 = R(1, 20, 1), I2 = R(1, 20, 1), d = R(0.01, 0.5, 0.01), F = r3((u0 * I1 * I2) / (2 * Math.PI * d));
    return W()
      .l('Parallel currents', `I1 = ${I1} A, I2 = ${I2} A`, `d = ${g(d)} m`, 'force per meter = ?', '')
      .f('F/L = u0 I1 I2/(2 pi d)')
      .l(`F/L = (4pi x 10^-7)(${I1})(${I2})/(2pi(${g(d)}))`, `F/L = ${num(F)} N/m`)
      .n('Currents in the same direction attract; opposite directions repel.')
      .done(`Two long parallel wires ${g(d)} m apart carry ${I1} A and ${I2} A. What is the force per meter between them?`, F, 'N/m');
  });

  add('em6', 'Induced emf from a changing field', () => {
    const N = R(10, 500, 10), A = R(0.001, 0.05, 0.001), dB = R(0.1, 5, 0.1), emf = r3(N * A * dB);
    return W()
      .l("Faraday's law", `N = ${N} turns, A = ${g(A)} m^2`, `dB/dt = ${g(dB)} T/s`, '')
      .f('emf = -N dPhi/dt = -N A dB/dt (size)')
      .l(`emf = (${N})(${g(A)})(${g(dB)})`, `emf = ${num(emf)} V`)
      .done(`A ${N}-turn coil of area ${g(A)} m^2 sits in a field changing at ${g(dB)} T/s. What is the size of the induced emf?`, emf, 'V');
  });

  add('em6', 'Energy stored in an inductor', () => {
    const L = R(0.01, 2, 0.01), I = R(0.5, 10, 0.5), U = r3(0.5 * L * I * I);
    return W().l('Inductor energy', `L = ${g(L)} H, I = ${g(I)} A`, '').f('U = (1/2)LI^2').l(`U = (1/2)(${g(L)})(${g(I)})^2`, `U = ${num(U)} J`)
      .done(`How much energy is stored in a ${g(L)} H inductor carrying ${g(I)} A?`, U, 'J');
  });

  add('em6', 'LR time constant', () => {
    const L = R(0.01, 5, 0.01), Rr = R(1, 200, 1), tau = r3(L / Rr);
    return W().l('LR circuit', `L = ${g(L)} H, R = ${Rr} ohm`, '').f('tau = L/R; I(t) = (emf/R)(1 - e^(-t/tau))').l(`tau = ${g(L)}/${Rr} = ${num(tau)} s`)
      .done(`What is the time constant of a ${g(L)} H inductor in series with a ${Rr} ohm resistor?`, tau, 's');
  });

  // Solver equations for E&M
  const v = (name, unit, flags = '') => [name, unit, flags];
  SW.EQUATIONS.push(
    { unit: 'em1', name: "Gauss's law", tpl: '{flux} = {q}/{eps0}', vars: { flux: v('electric flux', 'N m^2/C'), q: v('charge enclosed', 'C'), eps0: v('vacuum permittivity', 'C^2/(N m^2)', 'pos c=8.85e-12') }, f: q => q.flux - q.q / q.eps0 },
    { unit: 'em1', name: 'Field of a line of charge', tpl: '{E} = {lambda}/(2pi{eps0}{r})', vars: { E: v('electric field', 'N/C', 'pos'), lambda: v('charge per length', 'C/m', 'pos'), eps0: v('vacuum permittivity', 'C^2/(N m^2)', 'pos c=8.85e-12'), r: v('distance', 'm', 'pos') }, f: q => q.E - q.lambda / (2 * Math.PI * q.eps0 * q.r) },
    { unit: 'em1', name: 'Field of a sheet of charge', tpl: '{E} = {sigma}/(2{eps0})', vars: { E: v('electric field', 'N/C', 'pos'), sigma: v('charge per area', 'C/m^2', 'pos'), eps0: v('vacuum permittivity', 'C^2/(N m^2)', 'pos c=8.85e-12') }, f: q => q.E - q.sigma / (2 * q.eps0) },
    { unit: 'em3', name: 'Capacitance with dielectric', tpl: '{C} = {kappa}{eps0}{A}/{d}', vars: { C: v('capacitance', 'F', 'pos'), kappa: v('dielectric constant', '', 'pos c=1'), eps0: v('vacuum permittivity', 'C^2/(N m^2)', 'pos c=8.85e-12'), A: v('plate area', 'm^2', 'pos'), d: v('separation', 'm', 'pos') }, f: q => q.C - (q.kappa * q.eps0 * q.A) / q.d },
    { unit: 'em4', name: 'Charging capacitor', tpl: '{q} = {C}{emf}(1 - e^(-{t}/({R}{C})))', vars: { q: v('charge', 'C', 'pos'), C: v('capacitance', 'F', 'pos'), emf: v('battery emf', 'V', 'pos'), t: v('time', 's', 'pos'), R: v('resistance', 'ohm', 'pos') }, f: q => q.q - q.C * q.emf * (1 - Math.exp(-q.t / (q.R * q.C))) },
    { unit: 'em4', name: 'RC time constant', tpl: '{tau} = {R}{C}', vars: { tau: v('time constant', 's', 'pos'), R: v('resistance', 'ohm', 'pos'), C: v('capacitance', 'F', 'pos') }, f: q => q.tau - q.R * q.C },
    { unit: 'em5', name: 'Solenoid field', tpl: '{B} = {u0}{n}{I}', vars: { B: v('magnetic field', 'T', 'pos'), u0: v('vacuum permeability', 'T m/A', 'pos c=1.26e-6'), n: v('turns per meter', '/m', 'pos'), I: v('current', 'A', 'pos') }, f: q => q.B - q.u0 * q.n * q.I },
    { unit: 'em5', name: 'Force between parallel wires', tpl: '{F} = {u0}{I1}{I2}{L}/(2pi{d})', vars: { F: v('force', 'N', 'pos'), u0: v('vacuum permeability', 'T m/A', 'pos c=1.26e-6'), I1: v('current 1', 'A', 'pos'), I2: v('current 2', 'A', 'pos'), L: v('length', 'm', 'pos'), d: v('separation', 'm', 'pos') }, f: q => q.F - (q.u0 * q.I1 * q.I2 * q.L) / (2 * Math.PI * q.d) },
    { unit: 'em6', name: 'Inductor energy', tpl: '{U} = 1/2{L}{I}^2', vars: { U: v('energy', 'J', 'pos'), L: v('inductance', 'H', 'pos'), I: v('current', 'A', 'pos') }, f: q => q.U - 0.5 * q.L * q.I ** 2 },
    { unit: 'em6', name: 'LR time constant', tpl: '{tau} = {L}/{R}', vars: { tau: v('time constant', 's', 'pos'), L: v('inductance', 'H', 'pos'), R: v('resistance', 'ohm', 'pos') }, f: q => q.tau - q.L / q.R },
    { unit: 'em6', name: "Faraday's law (changing B)", tpl: '{emf} = {N}{A}{dBdt}', vars: { emf: v('induced emf (size)', 'V', 'pos'), N: v('turns', '', 'pos c=1'), A: v('area', 'm^2', 'pos'), dBdt: v('rate of change of B', 'T/s', 'pos') }, f: q => q.emf - q.N * q.A * q.dBdt },
  );

  // ---------- concept questions ----------
  SW.mcqs('kin', [
    ['calculus kinematics', 'If a(t) is known, velocity is found by:', ['Differentiating a(t)', 'Integrating a(t) and adding the initial velocity', 'Multiplying a by t only when a is constant', 'Squaring a(t)'], 1, 'v(t) = v0 + integral of a dt works even when a changes.'],
  ], ['physcm']);
  SW.mcqs('dyn', [
    ['drag differential equation', 'For an object falling with drag force -bv, the velocity:', ['Grows forever', 'Approaches mg/b exponentially', 'Is constant from the start', 'Oscillates'], 1, 'Solving m dv/dt = mg - bv gives v = (mg/b)(1 - e^(-bt/m)).'],
  ], ['physcm']);
  SW.mcqs('energy', [
    ['potential energy force', 'If U(x) is known, the conservative force is:', ['F = dU/dx', 'F = -dU/dx', 'F = integral of U dx', 'F = U/x'], 1, 'Force points toward lower potential energy.'],
  ], ['physcm']);
  SW.mcqs('rot', [
    ['parallel axis', 'The parallel axis theorem states I = I_cm + Md^2. This means I is smallest about:', ['Any axis', 'An axis through the center of mass', 'The end of the object', 'An axis far away'], 1, 'Md^2 is always positive, so moving away from the center adds inertia.'],
  ], ['physcm']);
  SW.mcqs('em1', [
    ['gauss law symmetry', "Gauss's law is most useful for finding E when the charge has:", ['No symmetry', 'Spherical, cylindrical or planar symmetry', 'Moving charges', 'Magnetic fields'], 1, 'Symmetry lets you pull E out of the flux integral.'],
    ['conductor field inside', 'In electrostatic equilibrium, the field inside a conductor is:', ['Maximum', 'Zero', 'Equal to the surface field', 'kQ/r^2'], 1, 'Free charges move until the inside field is zero.'],
    ['shell theorem', 'Inside a uniformly charged thin spherical shell, the electric field is:', ['kQ/r^2', 'Zero', 'Constant and nonzero', 'Infinite'], 1, 'A Gaussian sphere inside encloses no charge.'],
  ]);
  SW.mcqs('em2', [
    ['equipotential', 'Equipotential surfaces are always:', ['Parallel to field lines', 'Perpendicular to field lines', 'Circular', 'Inside conductors only'], 1, 'No work is done moving along them, so E has no component along them.'],
    ['potential conductor', 'The surface of a conductor in equilibrium is:', ['An equipotential', 'At zero potential always', 'Where E is zero', 'Uncharged'], 0, 'If there were a potential difference, charges would move.'],
  ]);
  SW.mcqs('em3', [
    ['dielectric effect', 'Inserting a dielectric into a capacitor connected to a battery:', ['Decreases C', 'Increases C and the stored charge', 'Decreases the voltage', 'Has no effect'], 1, 'C = kappa C0; with V fixed by the battery, Q = CV goes up.'],
    ['capacitor energy disconnected', 'A charged capacitor is disconnected, then its plates are pulled apart. Its stored energy:', ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'], 0, 'Q stays fixed, C drops, and U = Q^2/(2C) rises (you did work pulling).'],
  ]);
  SW.mcqs('em4', [
    ['rc initial', 'Right after the switch closes on an uncharged capacitor in an RC circuit, the capacitor acts like:', ['An open circuit', 'A wire (short circuit)', 'A battery', 'A resistor of value C'], 1, 'With no charge, there is no voltage across it, so the full current flows.'],
    ['rc long time', 'A long time after charging, the current in a DC RC branch is:', ['Maximum', 'Zero', 'emf/R', 'Oscillating'], 1, 'The capacitor is full and blocks steady current.'],
    ['kirchhoff loop', "Kirchhoff's loop rule is a statement of:", ['Conservation of charge', 'Conservation of energy', "Newton's third law", "Coulomb's law"], 1, 'The sum of voltage changes around a loop is zero.'],
  ]);
  SW.mcqs('em5', [
    ['ampere law', "Ampere's law relates the magnetic field around a closed loop to:", ['The charge enclosed', 'The current passing through the loop', 'The flux through the loop', 'The voltage'], 1, 'Line integral of B dl = u0 I enclosed.'],
    ['biot savart direction', 'The magnetic field around a long straight current is:', ['Radial, pointing outward', 'Circles around the wire (right-hand rule)', 'Parallel to the wire', 'Zero'], 1, 'Thumb along I, fingers curl in the direction of B.'],
  ]);
  SW.mcqs('em6', [
    ['lenz law', 'A magnet is pushed north-pole first toward a loop. The induced current makes the loop act like:', ['A north pole facing the magnet (repelling)', 'A south pole facing the magnet (attracting)', 'No magnet', 'An electric dipole'], 0, "Lenz's law: it opposes the increasing flux by repelling."],
    ['inductor behavior', 'An inductor in a circuit:', ['Opposes changes in current', 'Opposes steady current', 'Stores charge', 'Has no effect in DC'], 0, 'emf = -L dI/dt; once current is steady it acts like a wire.'],
  ]);

  // ---------- free response ----------
  SW.frq('dyn', 'Falling with air resistance (calculus)',
    'A ball of mass m is dropped from rest and experiences a drag force of magnitude bv, where b is a positive constant.\n(a) Write the differential equation for the ball\'s velocity v(t) (down = +).\n(b) Solve it to find v(t), with v(0) = 0.\n(c) Find the terminal speed.\n(d) Sketch or describe the graph of v vs t and of the acceleration vs t.',
    [[1, '(a) m dv/dt = mg - bv'], [2, '(b) Separates variables and integrates correctly; 1 point for correct setup'], [1, '(b) v(t) = (mg/b)(1 - e^(-bt/m))'], [1, '(c) v_t = mg/b'], [1, '(d) v rises from 0 and levels off at mg/b; a starts at g and decays to 0']],
    '(a) Down = +: m dv/dt = mg - bv.\n(b) dv/(mg - bv) = dt/m. Integrating: -(1/b)ln(mg - bv) = t/m + C. With v(0) = 0: ln((mg - bv)/mg) = -bt/m, so v(t) = (mg/b)(1 - e^(-bt/m)).\n(c) As t -> infinity, v -> mg/b.\n(d) v starts at 0 with slope g and curves up to approach mg/b. a(t) = g e^(-bt/m) starts at g and decays to 0.',
    ['physcm']);
  SW.frq('em4', 'RC circuit analysis',
    'An uncharged 50 uF capacitor, a 2.0 kilohm resistor and a 12 V battery are connected in series with an open switch. At t = 0 the switch is closed.\n(a) What is the current right after the switch closes?\n(b) Derive an expression for the charge q(t) on the capacitor using Kirchhoff\'s loop rule.\n(c) Calculate the time constant and the charge at t = 0.10 s.\n(d) How much energy is stored in the capacitor after a long time?',
    [[1, '(a) I0 = emf/R = 6.0 mA'], [1, '(b) Loop rule: emf - IR - q/C = 0 with I = dq/dt'], [1, '(b) q(t) = C emf (1 - e^(-t/RC))'], [1, '(c) tau = RC = 0.10 s'], [1, '(c) q = (50 x 10^-6)(12)(1 - e^-1) = 3.8 x 10^-4 C'], [1, '(d) U = (1/2)CV^2 = 3.6 x 10^-3 J']],
    '(a) Uncharged, the capacitor acts like a wire: I0 = 12 V / 2000 ohm = 6.0 x 10^-3 A.\n(b) emf - R dq/dt - q/C = 0. Separating: dq/(C emf - q) = dt/(RC), giving q(t) = C emf (1 - e^(-t/RC)).\n(c) tau = (2000)(50 x 10^-6) = 0.10 s. q(0.10) = (50 x 10^-6)(12)(1 - e^-1) = 6.0 x 10^-4 (0.632) = 3.8 x 10^-4 C.\n(d) Fully charged at 12 V: U = (1/2)(50 x 10^-6)(12)^2 = 3.6 x 10^-3 J.');
  SW.frq('em1', "Gauss's law for a charged sphere",
    'A solid insulating sphere of radius R has total charge Q spread uniformly through its volume.\n(a) Use Gauss\'s law to find E at a distance r > R from the center.\n(b) Use Gauss\'s law to find E at a distance r < R.\n(c) Sketch or describe E as a function of r from 0 to 3R.\n(d) If the sphere were a conductor with the same total charge, how would your answer to (b) change? Explain.',
    [[1, '(a) Chooses a spherical Gaussian surface and writes E(4 pi r^2) = Q/eps0'], [1, '(a) E = Q/(4 pi eps0 r^2)'], [1, '(b) Charge enclosed = Q r^3/R^3'], [1, '(b) E = Qr/(4 pi eps0 R^3)'], [1, '(c) E rises linearly to a max at r = R, then falls off as 1/r^2'], [1, '(d) Inside a conductor E = 0, because all the charge sits on the surface']],
    '(a) Spherical Gaussian surface of radius r > R: E(4 pi r^2) = Q/eps0, so E = Q/(4 pi eps0 r^2).\n(b) For r < R, q_enc = Q(r^3/R^3). E(4 pi r^2) = Qr^3/(eps0 R^3), so E = Qr/(4 pi eps0 R^3).\n(c) E increases linearly from 0 at the center to a maximum Q/(4 pi eps0 R^2) at r = R, then decreases as 1/r^2.\n(d) In a conductor, charges move to the surface, so the field inside would be zero.');

  SW.REF.physcm = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Calculus relationships</h4><table>
        <tr><td class="eqn">v = dx/dt, a = dv/dt</td></tr><tr><td class="eqn">x = integral v dt, v = integral a dt</td></tr>
        <tr><td class="eqn">W = integral F . dx</td></tr><tr><td class="eqn">J = integral F dt = change in p</td></tr>
        <tr><td class="eqn">F = -dU/dx</td></tr><tr><td class="eqn">P = dW/dt = F . v</td></tr>
        <tr><td class="eqn">x_cm = integral x dm / integral dm</td></tr><tr><td class="eqn">I = integral r^2 dm</td></tr></table></div>
      <div class="ref-unit"><h4>Rotation</h4><table>
        <tr><td class="eqn">tau = r x F, tau net = I alpha</td></tr><tr><td class="eqn">L = I omega, K = (1/2)I omega^2</td></tr>
        <tr><td class="eqn">I = I_cm + Md^2</td></tr><tr><td class="eqn">rod (center) ML^2/12, rod (end) ML^2/3</td></tr>
        <tr><td class="eqn">disk MR^2/2, hoop MR^2, solid sphere 2MR^2/5</td></tr><tr><td class="eqn">rolling: v = R omega</td></tr></table></div>
      <div class="ref-unit"><h4>Oscillations and gravity</h4><table>
        <tr><td class="eqn">x = A cos(omega t + phi)</td></tr><tr><td class="eqn">spring omega = sqrt(k/m), pendulum omega = sqrt(g/L)</td></tr>
        <tr><td class="eqn">T = 2pi/omega</td></tr><tr><td class="eqn">F = Gm1m2/r^2, U = -Gm1m2/r</td></tr>
        <tr><td class="eqn">drag -bv: v_t = mg/b, tau = m/b</td></tr></table></div>
    </div>`;
  SW.REF.physce = () => `
    <div class="ref-grid">
      <div class="ref-unit"><h4>Constants</h4><table>
        <tr><td class="eqn">k = 1/(4 pi eps0) = 9.0 x 10^9 N m^2/C^2</td></tr><tr><td class="eqn">eps0 = 8.85 x 10^-12 C^2/(N m^2)</td></tr>
        <tr><td class="eqn">u0 = 4pi x 10^-7 T m/A</td></tr><tr><td class="eqn">e = 1.60 x 10^-19 C</td></tr></table></div>
      <div class="ref-unit"><h4>Fields and potential</h4><table>
        <tr><td class="eqn">Gauss: closed integral E . dA = q_enc/eps0</td></tr><tr><td class="eqn">sphere outside: kQ/r^2; line: lambda/(2 pi eps0 r); sheet: sigma/(2 eps0)</td></tr>
        <tr><td class="eqn">delta V = -integral E . dl</td></tr><tr><td class="eqn">E = -dV/dx</td></tr><tr><td class="eqn">V = sum kq/r</td></tr></table></div>
      <div class="ref-unit"><h4>Capacitors and circuits</h4><table>
        <tr><td class="eqn">C = Q/V = kappa eps0 A/d</td></tr><tr><td class="eqn">U = (1/2)CV^2 = Q^2/(2C)</td></tr>
        <tr><td class="eqn">series 1/C = sum 1/Ci; parallel C = sum Ci</td></tr>
        <tr><td class="eqn">charging: q = C emf(1 - e^(-t/RC)); discharging q = Q0 e^(-t/RC)</td></tr>
        <tr><td class="eqn">Kirchhoff: sum I in = sum I out; sum delta V around a loop = 0</td></tr></table></div>
      <div class="ref-unit"><h4>Magnetism and induction</h4><table>
        <tr><td class="eqn">F = qv x B, F = IL x B</td></tr><tr><td class="eqn">Biot-Savart: dB = (u0/4pi) I dl x r-hat / r^2</td></tr>
        <tr><td class="eqn">Ampere: closed integral B . dl = u0 I_enc</td></tr><tr><td class="eqn">wire u0 I/(2 pi r); solenoid u0 n I</td></tr>
        <tr><td class="eqn">emf = -d(Phi)/dt</td></tr><tr><td class="eqn">emf = -L dI/dt, U = (1/2)LI^2, tau = L/R</td></tr></table></div>
    </div>`;
})();
