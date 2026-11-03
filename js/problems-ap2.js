/* AP Physics 2 problem generators (units 9-15). Same format as problems-ap1.js. */
(function () {
  'use strict';
  const { r3, num, g, sg, R, pick, deg, toDeg, W, add } = globalThis.SW;
  const K = '9.0 x 10^9 N m^2/C^2';
  const k = 9.0e9, e = 1.6e-19, mp = 1.67e-27, me = 9.11e-31;

  // ---------------- Unit 9: Thermodynamics ----------------

  add('thermo', 'Ideal gas law: pressure', () => {
    const n = R(0.5, 5, 0.1), C = R(0, 100, 1), V = R(0.01, 0.1, 0.005);
    const T = C + 273, P = r3((n * 8.31 * T) / V);
    return W()
      .l('Ideal gas law', `n = ${g(n)} mol`, 'R = 8.31 J/(mol K)', `T = ${C} C + 273 = ${T} K`, `V = ${g(V)} m^3`, 'P = ?', '')
      .f('PV = nRT')
      .l(`P(${g(V)} m^3) = (${g(n)} mol)(8.31 J/(mol K))(${T} K)`, `P = ${num(P)} Pa`)
      .n('Always change Celsius to Kelvin first by adding 273.')
      .done(`${g(n)} mol of an ideal gas at ${C} C is kept in a ${g(V)} m^3 container. What is the pressure of the gas?`, P, 'Pa');
  });

  add('thermo', 'Heating water', () => {
    const m = R(0.2, 3, 0.1), dT = R(5, 60, 1), Q = r3(m * 4186 * dT);
    return W()
      .l('Specific heat', `m = ${g(m)} kg`, 'c = 4186 J/(kg C) (water)', `deltaT = ${dT} C`, 'Q = ?', '')
      .f('Q = mc deltaT')
      .l(`Q = (${g(m)} kg)(4186 J/(kg C))(${dT} C)`, `Q = ${num(Q)} J`)
      .n('A change of 1 C is the same as a change of 1 K, so no +273 is needed for deltaT.')
      .done(`How much heat does it take to warm ${g(m)} kg of water by ${dT} C?`, Q, 'J');
  });

  add('thermo', 'First law: change in internal energy', () => {
    const Q = R(300, 2000, 50), Wby = R(100, Q - 100, 50), dU = r3(Q - Wby);
    return W()
      .l('First law of thermodynamics', `Q = +${g(Q)} J (heat added to the gas)`, `W = -${g(Wby)} J (the gas does work, so work done ON it is negative)`, 'deltaU = ?', '')
      .f('deltaU = Q + W')
      .l(`deltaU = (+${g(Q)} J) + (-${g(Wby)} J)`, `deltaU = ${sg(dU)} J`)
      .n('In AP Physics, W is the work done ON the gas. When the gas pushes outward, W is negative.')
      .done(`A gas absorbs ${g(Q)} J of heat and does ${g(Wby)} J of work pushing a piston out. What is the change in its internal energy?`, dU, 'J', true);
  });

  add('thermo', 'Work on a gas at constant pressure', () => {
    const P = R(1, 3, 0.1) * 1e5, V1 = R(0.01, 0.03, 0.005), V2 = r3(V1 + R(0.005, 0.03, 0.005));
    const dV = r3(V2 - V1), Wk = r3(-P * dV);
    return W()
      .l('Work on a gas (constant pressure)', `P = ${g(P)} Pa`, `V1 = ${g(V1)} m^3`, `V2 = ${g(V2)} m^3`, 'W = ?', '')
      .f('deltaV = V2 - V1')
      .l(`deltaV = (${g(V2)} m^3) - (${g(V1)} m^3)`, `deltaV = ${num(dV)} m^3`, '')
      .f('W = -P deltaV')
      .l(`W = -(${g(P)} Pa)(${num(dV)} m^3)`, `W = ${sg(Wk)} J`)
      .n('The gas expands, so it does work on the outside and the work done ON it is negative.')
      .done(`A gas at a constant ${g(P)} Pa expands from ${g(V1)} m^3 to ${g(V2)} m^3. How much work is done on the gas?`, Wk, 'J', true);
  });

  add('thermo', 'Heat conduction through a window', () => {
    const A = R(1, 3, 0.1), L = R(0.003, 0.01, 0.001), dT = R(5, 30, 1);
    const rate = r3((0.8 * A * dT) / L);
    return W()
      .l('Thermal conduction', 'k = 0.8 W/(m K) (glass)', `A = ${g(A)} m^2`, `L = ${g(L)} m (thickness)`, `deltaT = ${dT} K`, 'Q/delta t = ?', '')
      .f('Q/delta t = kA deltaT/L')
      .l(`Q/delta t = (0.8 W/(m K))(${g(A)} m^2)(${dT} K)/(${g(L)} m)`, `Q/delta t = ${num(rate)} W`)
      .n('A thinner window or a bigger temperature difference lets heat through faster.')
      .done(`A glass window (k = 0.8 W/(m K)) is ${g(A)} m^2 and ${g(L)} m thick. It is ${dT} K warmer inside than outside. How fast does heat flow through it?`, rate, 'W');
  });

  add('thermo', 'Heated gas in a sealed tank', () => {
    const P1 = R(1, 3, 0.1) * 1e5, C1 = R(0, 30, 1), C2 = R(40, 150, 5);
    const T1 = C1 + 273, T2 = C2 + 273, P2 = r3((P1 * T2) / T1);
    return W()
      .l('Ideal gas law (constant volume)', `P1 = ${g(P1)} Pa`, `T1 = ${C1} C + 273 = ${T1} K`, `T2 = ${C2} C + 273 = ${T2} K`, 'P2 = ?', '')
      .f('P1/T1 = P2/T2 (n and V stay the same)')
      .l(`(${g(P1)} Pa)/(${T1} K) = P2/(${T2} K)`, `P2 = ${num(P2)} Pa`)
      .n('Using Celsius here gives a wrong answer. Gas laws only work in Kelvin.')
      .done(`A sealed rigid tank holds gas at ${g(P1)} Pa and ${C1} C. It is heated to ${C2} C. What is the new pressure?`, P2, 'Pa');
  });

  // ---------------- Unit 10: Electric Force, Field, and Potential ----------------

  add('elec', "Coulomb's law: force between charges", () => {
    const q1 = R(1, 9, 0.5) * 1e-6, q2 = R(1, 9, 0.5) * 1e-6, r = R(0.05, 0.5, 0.01);
    const F = r3((k * q1 * q2) / (r * r));
    return W()
      .l("Coulomb's law", `k = ${K}`, `q1 = ${g(q1)} C`, `q2 = ${g(q2)} C`, `r = ${g(r)} m`, 'F = ?', '')
      .f('F = kq1q2/r^2')
      .l(`F = (${K})(${g(q1)} C)(${g(q2)} C)/(${g(r)} m)^2`, `F = ${num(F)} N`)
      .n('1 microcoulomb = 1 x 10^-6 C. Both charges are positive, so they repel.')
      .done(`Two charges of ${g(q1 * 1e6)} uC and ${g(q2 * 1e6)} uC are ${g(r)} m apart. What is the size of the electric force between them?`, F, 'N');
  });

  add('elec', 'Electric field of a point charge', () => {
    const q = R(1, 9, 0.5) * 1e-9, r = R(0.02, 0.3, 0.01), E = r3((k * q) / (r * r));
    return W()
      .l('Electric field (point charge)', `k = ${K}`, `q = ${g(q)} C`, `r = ${g(r)} m`, 'E = ?', '')
      .f('E = kq/r^2')
      .l(`E = (${K})(${g(q)} C)/(${g(r)} m)^2`, `E = ${num(E)} N/C`)
      .n('1 nanocoulomb = 1 x 10^-9 C. The field points away from a positive charge.')
      .done(`What is the electric field strength ${g(r)} m from a ${g(q * 1e9)} nC point charge?`, E, 'N/C');
  });

  add('elec', 'Proton in a uniform field: acceleration', () => {
    const E = R(1, 9, 0.5) * 1e3, F = r3(e * E), a = r3(F / mp);
    return W()
      .l('Electric force', `q = 1.6 x 10^-19 C (proton)`, `m = 1.67 x 10^-27 kg`, `E = ${g(E)} N/C`, 'a = ?', '')
      .f('F = qE')
      .l(`F = (1.6 x 10^-19 C)(${g(E)} N/C)`, `F = ${num(F)} N`, '')
      .f('Fnet = ma')
      .l(`(${num(F)} N) = (1.67 x 10^-27 kg)a`, `a = ${num(a)} m/s^2`)
      .n('Gravity on a proton is tiny compared to the electric force, so ignore it.')
      .done(`A proton is placed in a uniform ${g(E)} N/C electric field. What is its acceleration?`, a, 'm/s^2');
  });

  add('elec', 'Electric potential near a point charge', () => {
    const q = R(1, 9, 0.5) * 1e-9 * pick([1, -1]), r = R(0.05, 0.5, 0.01), V = r3((k * q) / r);
    return W()
      .l('Electric potential (point charge)', `k = ${K}`, `q = ${g(q)} C`, `r = ${g(r)} m`, 'V = ?', '')
      .f('V = kq/r')
      .l(`V = (${K})(${g(q)} C)/(${g(r)} m)`, `V = ${sg(V)} V`)
      .n('Potential is a scalar, but keep the sign of the charge. Negative charge gives negative V.')
      .n('It is r, not r^2, for potential.')
      .done(`What is the electric potential ${g(r)} m from a ${g(q * 1e9)} nC point charge?`, V, 'V', true);
  });

  add('elec', 'Change in potential energy', () => {
    const q = R(1, 9, 0.5) * 1e-6, dV = R(10, 500, 10) * pick([1, -1]), dU = r3(q * dV);
    return W()
      .l('Electric potential energy', `q = ${g(q)} C`, `deltaV = ${sg(dV)} V`, 'deltaU = ?', '')
      .f('deltaU = q deltaV')
      .l(`deltaU = (${g(q)} C)(${sg(dV)} V)`, `deltaU = ${sg(dU)} J`)
      .n('A positive charge loses potential energy when it moves to lower potential.')
      .done(`A ${g(q * 1e6)} uC charge moves through a potential difference of ${sg(dV)} V. What is its change in electric potential energy?`, dU, 'J', true);
  });

  add('elec', 'Field between parallel plates', () => {
    const V = R(6, 500, 2), d = R(0.002, 0.05, 0.001), E = r3(V / d);
    return W()
      .l('Uniform electric field', `deltaV = ${g(V)} V`, `d = ${g(d)} m`, 'E = ?', '')
      .f('E = deltaV/d')
      .l(`E = (${g(V)} V)/(${g(d)} m)`, `E = ${num(E)} V/m`)
      .n('V/m and N/C are the same unit.')
      .done(`Two parallel plates are ${g(d)} m apart with a ${g(V)} V potential difference between them. What is the field between them?`, E, 'V/m');
  });

  add('elec', 'Parallel-plate capacitor: charge stored', () => {
    const A = R(0.01, 0.2, 0.01), d = R(0.0005, 0.005, 0.0005), V = R(3, 24, 1);
    const C = r3((8.85e-12 * A) / d), Q = r3(C * V);
    return W()
      .l('Capacitors', 'eps0 = 8.85 x 10^-12 C^2/(N m^2)', `A = ${g(A)} m^2`, `d = ${g(d)} m`, `deltaV = ${g(V)} V`, 'Q = ?', '')
      .f('C = eps0 A/d')
      .l(`C = (8.85 x 10^-12 C^2/(N m^2))(${g(A)} m^2)/(${g(d)} m)`, `C = ${num(C)} F`, '')
      .f('Q = C deltaV')
      .l(`Q = (${num(C)} F)(${g(V)} V)`, `Q = ${num(Q)} C`)
      .n('Find C from the shape first, then use the battery voltage.')
      .done(`An air-filled parallel-plate capacitor has plates of area ${g(A)} m^2 separated by ${g(d)} m. It is connected to a ${g(V)} V battery. How much charge does it store?`, Q, 'C');
  });

  add('elec', 'Energy stored in a capacitor', () => {
    const C = R(1, 900, 1) * 1e-6, V = R(3, 50, 1), U = r3(0.5 * C * V * V);
    return W()
      .l('Capacitor energy', `C = ${g(C)} F`, `deltaV = ${g(V)} V`, 'Uc = ?', '')
      .f('Uc = 1/2C deltaV^2')
      .l(`Uc = 1/2(${g(C)} F)(${g(V)} V)^2`, `Uc = ${num(U)} J`)
      .n('1 uF = 1 x 10^-6 F.')
      .done(`A ${g(C * 1e6)} uF capacitor is charged to ${g(V)} V. How much energy does it store?`, U, 'J');
  });

  // ---------------- Unit 11: Electric Circuits ----------------

  add('circ', "Ohm's law: current", () => {
    const V = R(1.5, 24, 0.5), Rr = R(2, 500, 1), I = r3(V / Rr);
    return W()
      .l("Ohm's law", `deltaV = ${g(V)} V`, `R = ${g(Rr)} ohm`, 'I = ?', '')
      .f('deltaV = IR')
      .l(`(${g(V)} V) = I(${g(Rr)} ohm)`, `I = ${num(I)} A`)
      .done(`A ${g(Rr)} ohm resistor is connected to a ${g(V)} V battery. What current flows through it?`, I, 'A');
  });

  add('circ', 'Resistors in series', () => {
    const V = R(6, 24, 1), [R1, R2, R3] = [R(2, 50, 1), R(2, 50, 1), R(2, 50, 1)];
    const Req = R1 + R2 + R3, I = r3(V / Req);
    return W()
      .l('Series circuit', `deltaV = ${g(V)} V`, `R1 = ${R1} ohm, R2 = ${R2} ohm, R3 = ${R3} ohm`, 'I = ?', '')
      .f('Req = R1 + R2 + R3')
      .l(`Req = ${R1} ohm + ${R2} ohm + ${R3} ohm`, `Req = ${Req} ohm`, '')
      .f('deltaV = IR')
      .l(`(${g(V)} V) = I(${Req} ohm)`, `I = ${num(I)} A`)
      .n('In series the same current goes through every resistor.')
      .done(`Resistors of ${R1} ohm, ${R2} ohm, and ${R3} ohm are in series with a ${g(V)} V battery. What current flows from the battery?`, I, 'A');
  });

  add('circ', 'Resistors in parallel', () => {
    const V = R(6, 24, 1), R1 = R(5, 60, 1), R2 = R(5, 60, 1);
    const Req = r3(1 / (1 / R1 + 1 / R2)), I = r3(V / Req);
    return W()
      .l('Parallel circuit', `deltaV = ${g(V)} V`, `R1 = ${R1} ohm, R2 = ${R2} ohm`, 'I total = ?', '')
      .f('1/Req = 1/R1 + 1/R2')
      .l(`1/Req = 1/(${R1} ohm) + 1/(${R2} ohm)`, `Req = ${num(Req)} ohm`, '')
      .f('deltaV = IR')
      .l(`(${g(V)} V) = I(${num(Req)} ohm)`, `I total = ${num(I)} A`)
      .n('Common mistake: forgetting to flip 1/Req at the end.')
      .n('Quick check: Req in parallel is always smaller than the smallest resistor.')
      .done(`A ${R1} ohm and a ${R2} ohm resistor are connected in parallel to a ${g(V)} V battery. What is the total current from the battery?`, I, 'A');
  });

  add('circ', 'Power used by a resistor', () => {
    const V = R(3, 120, 1), Rr = R(5, 500, 5), P = r3((V * V) / Rr);
    return W()
      .l('Electric power', `deltaV = ${g(V)} V`, `R = ${g(Rr)} ohm`, 'P = ?', '')
      .f('P = deltaV^2/R')
      .l(`P = (${g(V)} V)^2/(${g(Rr)} ohm)`, `P = ${num(P)} W`)
      .n('This comes from P = I deltaV with I = deltaV/R plugged in.')
      .done(`A ${g(Rr)} ohm heater is connected to ${g(V)} V. How much power does it use?`, P, 'W');
  });

  add('circ', 'Resistance of a wire', () => {
    const rho = pick([[1.7e-8, 'copper'], [2.8e-8, 'aluminum'], [1.0e-7, 'iron']]);
    const L = R(1, 100, 1), d = R(0.5, 3, 0.1) * 1e-3, rad = d / 2;
    const A = r3(Math.PI * rad * rad), Rr = r3((rho[0] * L) / A);
    return W()
      .l('Resistivity', `rho = ${g(rho[0])} ohm m (${rho[1]})`, `L = ${g(L)} m`, `r = ${g(rad)} m (half the diameter)`, 'R = ?', '')
      .f('A = pi r^2')
      .l(`A = pi(${g(rad)} m)^2`, `A = ${num(A)} m^2`, '')
      .f('R = rho L/A')
      .l(`R = (${g(rho[0])} ohm m)(${g(L)} m)/(${num(A)} m^2)`, `R = ${num(Rr)} ohm`)
      .n('Use the radius, not the diameter, for the area.')
      .done(`A ${rho[1]} wire (rho = ${g(rho[0])} ohm m) is ${g(L)} m long with a diameter of ${g(d * 1000)} mm. What is its resistance?`, Rr, 'ohm');
  });

  add('circ', 'Series-parallel combination', () => {
    const V = R(6, 24, 1), R1 = R(2, 30, 1), R2 = R(5, 60, 1), R3 = R(5, 60, 1);
    const Rp = r3(1 / (1 / R2 + 1 / R3)), Req = r3(R1 + Rp), I = r3(V / Req);
    return W()
      .l('Series-parallel circuit', `deltaV = ${g(V)} V`, `R1 = ${R1} ohm (in series)`, `R2 = ${R2} ohm and R3 = ${R3} ohm (in parallel)`, 'I total = ?', '')
      .f('1/Rp = 1/R2 + 1/R3')
      .l(`1/Rp = 1/(${R2} ohm) + 1/(${R3} ohm)`, `Rp = ${num(Rp)} ohm`, '')
      .f('Req = R1 + Rp')
      .l(`Req = ${R1} ohm + ${num(Rp)} ohm`, `Req = ${num(Req)} ohm`, '')
      .f('deltaV = IR')
      .l(`(${g(V)} V) = I(${num(Req)} ohm)`, `I total = ${num(I)} A`)
      .n('Combine the parallel pair first, then add the series resistor.')
      .done(`A ${R1} ohm resistor is in series with a parallel pair of ${R2} ohm and ${R3} ohm resistors, all connected to a ${g(V)} V battery. What current leaves the battery?`, I, 'A');
  });

  add('circ', 'Capacitors in series', () => {
    const C1 = R(1, 20, 1), C2 = R(1, 20, 1), Ceq = r3(1 / (1 / C1 + 1 / C2));
    return W()
      .l('Capacitors in series', `C1 = ${C1} uF`, `C2 = ${C2} uF`, 'Ceq = ?', '')
      .f('1/Ceq = 1/C1 + 1/C2')
      .l(`1/Ceq = 1/(${C1} uF) + 1/(${C2} uF)`, `Ceq = ${num(Ceq)} uF`)
      .n('Capacitors are the opposite of resistors: series uses the 1/ rule.')
      .done(`A ${C1} uF and a ${C2} uF capacitor are connected in series. What is the equivalent capacitance (in uF)?`, Ceq, 'uF');
  });

  // ---------------- Unit 12: Magnetism and Electromagnetism ----------------

  add('mag', 'Force on a moving charge', () => {
    const v = R(1, 9, 0.5) * 1e5, B = R(0.1, 2, 0.1), th = pick([90, 60, 45, 30]);
    const F = r3(e * v * B * Math.sin(deg(th)));
    return W()
      .l('Magnetic force on a charge', 'q = 1.6 x 10^-19 C (proton)', `v = ${g(v)} m/s`, `B = ${g(B)} T`, `theta = ${th} degrees`, 'F = ?', '')
      .f('F = qvB sin(theta)')
      .l(`F = (1.6 x 10^-19 C)(${g(v)} m/s)(${g(B)} T)sin(${th} degrees)`, `F = ${num(F)} N`)
      .n('Use the right-hand rule for the direction. Moving along the field gives zero force.')
      .done(`A proton moves at ${g(v)} m/s at ${th} degrees to a ${g(B)} T magnetic field. What is the size of the magnetic force on it?`, F, 'N');
  });

  add('mag', 'Charged particle circling in a field', () => {
    const v = R(1, 9, 0.5) * 1e5, B = R(0.05, 1, 0.05), r = r3((mp * v) / (e * B));
    return W()
      .l('Circular motion in a magnetic field', 'q = 1.6 x 10^-19 C, m = 1.67 x 10^-27 kg (proton)', `v = ${g(v)} m/s`, `B = ${g(B)} T`, 'r = ?', '')
      .f('qvB = mv^2/r (magnetic force is the centripetal force)')
      .l(`(1.6 x 10^-19 C)(${g(v)} m/s)(${g(B)} T) = (1.67 x 10^-27 kg)(${g(v)} m/s)^2/r`, `r = ${num(r)} m`)
      .n('The magnetic force is always sideways to the motion, so it bends the path into a circle.')
      .done(`A proton moving at ${g(v)} m/s enters a ${g(B)} T magnetic field at 90 degrees. What is the radius of its circular path?`, r, 'm');
  });

  add('mag', 'Force on a current-carrying wire', () => {
    const I = R(1, 20, 0.5), L = R(0.1, 2, 0.1), B = R(0.05, 1.5, 0.05), th = pick([90, 60, 30]);
    const F = r3(I * L * B * Math.sin(deg(th)));
    return W()
      .l('Magnetic force on a wire', `I = ${g(I)} A`, `L = ${g(L)} m`, `B = ${g(B)} T`, `theta = ${th} degrees`, 'F = ?', '')
      .f('F = ILB sin(theta)')
      .l(`F = (${g(I)} A)(${g(L)} m)(${g(B)} T)sin(${th} degrees)`, `F = ${num(F)} N`)
      .done(`A ${g(L)} m wire carrying ${g(I)} A sits at ${th} degrees to a ${g(B)} T magnetic field. What force acts on it?`, F, 'N');
  });

  add('mag', 'Magnetic field near a long wire', () => {
    const I = R(1, 50, 1), r = R(0.01, 0.2, 0.01), B = r3((4 * Math.PI * 1e-7 * I) / (2 * Math.PI * r));
    return W()
      .l('Field of a long straight wire', 'u0 = 4pi x 10^-7 T m/A', `I = ${g(I)} A`, `r = ${g(r)} m`, 'B = ?', '')
      .f('B = u0I/(2pi r)')
      .l(`B = (4pi x 10^-7 T m/A)(${g(I)} A)/(2pi(${g(r)} m))`, `B = ${num(B)} T`)
      .n('The pi cancels: this is the same as (2 x 10^-7)(I/r).')
      .done(`What is the magnetic field ${g(r)} m from a long straight wire carrying ${g(I)} A?`, B, 'T');
  });

  add('mag', 'Motional emf: sliding rod', () => {
    const B = R(0.1, 1.5, 0.05), L = R(0.1, 1, 0.05), v = R(1, 10, 0.5), Rr = R(1, 20, 1);
    const emf = r3(B * L * v), I = r3(emf / Rr);
    return W()
      .l('Motional emf', `B = ${g(B)} T`, `L = ${g(L)} m`, `v = ${g(v)} m/s`, `R = ${g(Rr)} ohm`, 'I = ?', '')
      .f('emf = BLv')
      .l(`emf = (${g(B)} T)(${g(L)} m)(${g(v)} m/s)`, `emf = ${num(emf)} V`, '')
      .f('I = emf/R')
      .l(`I = (${num(emf)} V)/(${g(Rr)} ohm)`, `I = ${num(I)} A`)
      .n('The moving rod acts like a battery with voltage BLv.')
      .done(`A ${g(L)} m rod slides at ${g(v)} m/s along rails in a ${g(B)} T field. The circuit has a resistance of ${g(Rr)} ohm. What current flows?`, I, 'A');
  });

  add('mag', "Faraday's law: changing field in a coil", () => {
    const N = R(10, 500, 10), A = R(0.001, 0.05, 0.001), B1 = R(0, 0.5, 0.05), B2 = r3(B1 + R(0.1, 1, 0.05)), t = R(0.05, 2, 0.05);
    const dPhi = r3((B2 - B1) * A), emf = r3((N * dPhi) / t);
    return W()
      .l("Faraday's law", `N = ${N} turns`, `A = ${g(A)} m^2`, `B goes from ${g(B1)} T to ${g(B2)} T`, `delta t = ${g(t)} s`, 'emf = ?', '')
      .f('deltaPhi = (deltaB)A')
      .l(`deltaPhi = (${g(B2)} T - ${g(B1)} T)(${g(A)} m^2)`, `deltaPhi = ${num(dPhi)} T m^2`, '')
      .f('emf = N deltaPhi/delta t')
      .l(`emf = (${N})(${num(dPhi)} T m^2)/(${g(t)} s)`, `emf = ${num(emf)} V`)
      .n('Only a CHANGING flux makes an emf. Each turn adds its own emf, so multiply by N.')
      .done(`A ${N}-turn coil of area ${g(A)} m^2 is in a magnetic field that changes from ${g(B1)} T to ${g(B2)} T in ${g(t)} s. What emf is induced?`, emf, 'V');
  });

  // ---------------- Unit 13: Geometric Optics ----------------

  const MEDIA = [[1.33, 'water'], [1.5, 'glass'], [2.42, 'diamond'], [1.46, 'quartz']];

  add('optics', "Snell's law: refraction angle", () => {
    const [n2, name] = pick(MEDIA), th1 = R(10, 70, 5);
    const th2 = r3(toDeg(Math.asin(Math.sin(deg(th1)) / n2)));
    return W()
      .l("Snell's law", 'n1 = 1.00 (air)', `n2 = ${g(n2)} (${name})`, `theta1 = ${th1} degrees`, 'theta2 = ?', '')
      .f('n1 sin(theta1) = n2 sin(theta2)')
      .l(`(1.00)sin(${th1} degrees) = (${g(n2)})sin(theta2)`, `theta2 = ${num(th2)} degrees`)
      .n('Going into a slower material, light bends toward the normal, so theta2 is smaller.')
      .n('Angles are measured from the normal, not from the surface.')
      .done(`Light in air hits ${name} (n = ${g(n2)}) at ${th1} degrees from the normal. What is the angle of refraction?`, th2, 'degrees');
  });

  add('optics', 'Critical angle', () => {
    const [n1, name] = pick(MEDIA), th = r3(toDeg(Math.asin(1 / n1)));
    return W()
      .l('Total internal reflection', `n1 = ${g(n1)} (${name})`, 'n2 = 1.00 (air)', 'thetac = ?', '')
      .f('sin(thetac) = n2/n1')
      .l(`sin(thetac) = (1.00)/(${g(n1)})`, `thetac = ${num(th)} degrees`)
      .n('Total internal reflection only happens going from the slower material into the faster one.')
      .done(`What is the critical angle for light going from ${name} (n = ${g(n1)}) into air?`, th, 'degrees');
  });

  function lensDistances() {
    const f = R(5, 30, 1);
    let d;
    do { d = R(0.4 * f, 4 * f, 1); } while (Math.abs(d - f) < 2 || d <= 0);
    return [f, d, r3(1 / (1 / f - 1 / d))];
  }

  add('optics', 'Thin lens: image distance', () => {
    const [f, d, di] = lensDistances();
    return W()
      .l('Thin lens equation', `f = +${f} cm (converging lens)`, `do = ${d} cm`, 'di = ?', '')
      .f('1/f = 1/do + 1/di')
      .l(`1/(${f} cm) = 1/(${d} cm) + 1/di`, `di = ${sg(di)} cm`)
      .n(di > 0 ? 'Positive di means a real image on the other side of the lens.' : 'Negative di means a virtual image on the same side as the object (like a magnifying glass).')
      .done(`An object is ${d} cm from a converging lens with a focal length of ${f} cm. Where is the image?`, di, 'cm', true);
  });

  add('optics', 'Thin lens: image height', () => {
    const [f, d, di] = lensDistances(), ho = R(1, 10, 0.5), hi = r3((-di / d) * ho);
    return W()
      .l('Thin lens equation', `f = +${f} cm`, `do = ${d} cm`, `ho = ${g(ho)} cm`, 'hi = ?', '')
      .f('1/f = 1/do + 1/di')
      .l(`1/(${f} cm) = 1/(${d} cm) + 1/di`, `di = ${sg(di)} cm`, '')
      .f('hi/ho = -di/do')
      .l(`hi/(${g(ho)} cm) = -(${sg(di)} cm)/(${d} cm)`, `hi = ${sg(hi)} cm`)
      .n('You need di before you can find the magnification.')
      .n(hi < 0 ? 'Negative hi means the image is upside down.' : 'Positive hi means the image is upright.')
      .done(`A ${g(ho)} cm tall object is ${d} cm from a converging lens with f = ${f} cm. How tall is the image (include the sign)?`, hi, 'cm', true);
  });

  add('optics', 'Concave mirror: image distance', () => {
    const Rm = R(10, 60, 2), f = Rm / 2;
    let d;
    do { d = R(0.4 * f, 4 * f, 1); } while (Math.abs(d - f) < 2);
    const di = r3(1 / (1 / f - 1 / d));
    return W()
      .l('Mirror equation', `R = ${Rm} cm (concave mirror)`, `do = ${d} cm`, 'di = ?', '')
      .f('f = R/2')
      .l(`f = (${Rm} cm)/2`, `f = +${g(f)} cm`, '')
      .f('1/f = 1/do + 1/di')
      .l(`1/(${g(f)} cm) = 1/(${d} cm) + 1/di`, `di = ${sg(di)} cm`)
      .n('For a mirror, a positive di means the image is in front of the mirror (real).')
      .done(`An object is ${d} cm in front of a concave mirror with a radius of curvature of ${Rm} cm. Where is the image?`, di, 'cm', true);
  });

  add('optics', 'Speed of light in a material', () => {
    const [n, name] = pick(MEDIA), v = r3(3.0e8 / n);
    return W()
      .l('Index of refraction', 'c = 3.0 x 10^8 m/s', `n = ${g(n)} (${name})`, 'v = ?', '')
      .f('n = c/v')
      .l(`(${g(n)}) = (3.0 x 10^8 m/s)/v`, `v = ${num(v)} m/s`)
      .n('n is always 1 or bigger, so light is never faster than c.')
      .done(`How fast does light travel in ${name} (n = ${g(n)})?`, v, 'm/s');
  });

  // ---------------- Unit 14: Waves, Sound, and Physical Optics ----------------

  add('waves', 'Wave speed, frequency, and wavelength', () => {
    const f = R(100, 2000, 10), v = 343, lam = r3(v / f);
    return W()
      .l('Wave equation', 'v = 343 m/s (sound in air)', `f = ${g(f)} Hz`, 'lambda = ?', '')
      .f('v = f lambda')
      .l(`(343 m/s) = (${g(f)} Hz)lambda`, `lambda = ${num(lam)} m`)
      .n('Higher frequency means shorter wavelength when the speed stays the same.')
      .done(`A speaker plays a ${g(f)} Hz note in air (v = 343 m/s). What is the wavelength of the sound?`, lam, 'm');
  });

  add('waves', 'Standing wave on a string', () => {
    const L = R(0.5, 2, 0.1), v = R(100, 400, 10), n = R(1, 4, 1), f = r3((n * v) / (2 * L));
    return W()
      .l('Standing waves (string fixed at both ends)', `L = ${g(L)} m`, `v = ${g(v)} m/s`, `n = ${n} (harmonic number)`, 'f = ?', '')
      .f('fn = nv/(2L)')
      .l(`f = (${n})(${g(v)} m/s)/(2(${g(L)} m))`, `f = ${num(f)} Hz`)
      .n('Fixed at both ends means the longest wave that fits is twice the string length.')
      .done(`A string ${g(L)} m long is fixed at both ends. Waves travel on it at ${g(v)} m/s. What is the frequency of harmonic n = ${n}?`, f, 'Hz');
  });

  add('waves', 'Pipe closed at one end', () => {
    const L = R(0.2, 2, 0.05), f = r3(343 / (4 * L));
    return W()
      .l('Standing waves (pipe closed at one end)', 'v = 343 m/s', `L = ${g(L)} m`, 'f1 = ?', '')
      .f('f1 = v/(4L)')
      .l(`f1 = (343 m/s)/(4(${g(L)} m))`, `f1 = ${num(f)} Hz`)
      .n('Closed end is a node, open end is an antinode, so only a quarter wavelength fits.')
      .done(`What is the fundamental frequency of a ${g(L)} m pipe that is closed at one end? (v = 343 m/s)`, f, 'Hz');
  });

  add('waves', 'Pipe open at both ends', () => {
    const L = R(0.2, 2, 0.05), f = r3(343 / (2 * L));
    return W()
      .l('Standing waves (pipe open at both ends)', 'v = 343 m/s', `L = ${g(L)} m`, 'f1 = ?', '')
      .f('f1 = v/(2L)')
      .l(`f1 = (343 m/s)/(2(${g(L)} m))`, `f1 = ${num(f)} Hz`)
      .n('Open at both ends behaves like a string fixed at both ends: half a wavelength fits.')
      .done(`What is the fundamental frequency of a ${g(L)} m pipe that is open at both ends? (v = 343 m/s)`, f, 'Hz');
  });

  add('waves', 'Double slit: bright fringe position', () => {
    const lam = R(400, 700, 10) * 1e-9, d = R(0.1, 0.5, 0.05) * 1e-3, L = R(1, 3, 0.1), m = R(1, 3, 1);
    const y = r3((m * lam * L) / d);
    return W()
      .l('Double-slit interference (small angles)', `lambda = ${g(lam)} m`, `d = ${g(d)} m`, `L = ${g(L)} m`, `m = ${m}`, 'y = ?', '')
      .f('y = m lambda L/d')
      .l(`y = (${m})(${g(lam)} m)(${g(L)} m)/(${g(d)} m)`, `y = ${num(y)} m`)
      .n('Change nm to m (x 10^-9) and mm to m (x 10^-3) before plugging in.')
      .done(`Light of wavelength ${g(lam * 1e9)} nm passes through two slits ${g(d * 1000)} mm apart. How far from the center of a screen ${g(L)} m away is bright fringe m = ${m}?`, y, 'm');
  });

  add('waves', 'Diffraction grating: angle', () => {
    let N, lam, m, d, th;
    do {
      N = R(300, 800, 50); lam = R(400, 700, 10) * 1e-9; m = R(1, 2, 1);
      d = r3(1 / (N * 1000));
    } while ((m * lam) / d >= 0.95);
    th = r3(toDeg(Math.asin((m * lam) / d)));
    return W()
      .l('Diffraction grating', `${N} lines per mm`, `lambda = ${g(lam)} m`, `m = ${m}`, 'theta = ?', '')
      .f('d = 1/(lines per meter)')
      .l(`d = 1/(${N * 1000} lines/m)`, `d = ${num(d)} m`, '')
      .f('d sin(theta) = m lambda')
      .l(`(${num(d)} m)sin(theta) = (${m})(${g(lam)} m)`, `theta = ${num(th)} degrees`)
      .n('Lines per mm times 1000 gives lines per meter.')
      .done(`Light of wavelength ${g(lam * 1e9)} nm shines on a grating with ${N} lines per mm. At what angle is the order m = ${m} bright spot?`, th, 'degrees');
  });

  add('waves', 'Wave speed on a string', () => {
    const FT = R(10, 200, 5), mu = R(0.001, 0.02, 0.001), v = r3(Math.sqrt(FT / mu));
    return W()
      .l('Wave speed on a string', `FT = ${g(FT)} N`, `mu = ${g(mu)} kg/m`, 'v = ?', '')
      .f('v = sqrt(FT/mu)')
      .l(`v = sqrt((${g(FT)} N)/(${g(mu)} kg/m))`, `v = ${num(v)} m/s`)
      .n('Tighter string = faster waves. Heavier string = slower waves.')
      .done(`A string with a linear density of ${g(mu)} kg/m is under ${g(FT)} N of tension. How fast do waves travel on it?`, v, 'm/s');
  });

  // ---------------- Unit 15: Modern Physics ----------------

  add('modern', 'Photon energy from wavelength', () => {
    const lam = R(200, 700, 10), E = r3(1240 / lam);
    return W()
      .l('Photon energy', 'hc = 1240 eV nm', `lambda = ${lam} nm`, 'E = ?', '')
      .f('E = hc/lambda')
      .l(`E = (1240 eV nm)/(${lam} nm)`, `E = ${num(E)} eV`)
      .n('Using hc = 1240 eV nm with lambda in nm gives the answer straight in eV.')
      .done(`What is the energy, in eV, of a photon with a wavelength of ${lam} nm?`, E, 'eV');
  });

  add('modern', 'Photoelectric effect: max kinetic energy', () => {
    const metal = pick([[2.28, 'sodium'], [2.1, 'cesium'], [4.3, 'zinc'], [4.7, 'copper'], [2.9, 'calcium']]);
    let f, E;
    do { f = R(0.6, 2.5, 0.1) * 1e15; E = r3(4.14e-15 * f); } while (E < metal[0] + 0.3);
    const Kmax = r3(E - metal[0]);
    return W()
      .l('Photoelectric effect', 'h = 4.14 x 10^-15 eV s', `f = ${g(f)} Hz`, `phi = ${g(metal[0])} eV (${metal[1]})`, 'Kmax = ?', '')
      .f('E = hf')
      .l(`E = (4.14 x 10^-15 eV s)(${g(f)} Hz)`, `E = ${num(E)} eV`, '')
      .f('Kmax = hf - phi')
      .l(`Kmax = (${num(E)} eV) - (${g(metal[0])} eV)`, `Kmax = ${num(Kmax)} eV`)
      .n('If hf were smaller than phi, no electrons would come out at all, no matter how bright the light.')
      .done(`Light of frequency ${g(f)} Hz shines on ${metal[1]} (work function ${g(metal[0])} eV). What is the maximum kinetic energy of the ejected electrons, in eV?`, Kmax, 'eV');
  });

  add('modern', 'de Broglie wavelength of an electron', () => {
    const v = R(1, 9, 0.5) * 1e6, lam = r3(6.63e-34 / (me * v));
    return W()
      .l('de Broglie wavelength', 'h = 6.63 x 10^-34 J s', 'm = 9.11 x 10^-31 kg (electron)', `v = ${g(v)} m/s`, 'lambda = ?', '')
      .f('lambda = h/(mv)')
      .l(`lambda = (6.63 x 10^-34 J s)/((9.11 x 10^-31 kg)(${g(v)} m/s))`, `lambda = ${num(lam)} m`)
      .n('This is about the size of an atom, which is why electrons can diffract off crystals.')
      .done(`What is the de Broglie wavelength of an electron moving at ${g(v)} m/s?`, lam, 'm');
  });

  add('modern', 'Mass-energy equivalence', () => {
    const m = R(0.1, 9, 0.1) * 1e-3, E = r3(m * 9e16);
    return W()
      .l('Mass-energy equivalence', 'c = 3.0 x 10^8 m/s', `delta m = ${g(m)} kg`, 'E = ?', '')
      .f('E = mc^2')
      .l(`E = (${g(m)} kg)(3.0 x 10^8 m/s)^2`, `E = ${num(E)} J`)
      .n('Square c first: (3.0 x 10^8)^2 = 9.0 x 10^16.')
      .done(`In a nuclear reaction, ${g(m)} kg of mass is converted to energy. How much energy is released?`, E, 'J');
  });

  add('modern', 'Radioactive half-life', () => {
    const N0 = R(20, 400, 10), T = R(2, 30, 1), halves = R(1, 5, 1), t = T * halves;
    const N = r3(N0 * 0.5 ** halves);
    return W()
      .l('Half-life', `N0 = ${g(N0)} g`, `T1/2 = ${T} days`, `t = ${t} days`, 'N = ?', '')
      .f('N = N0(1/2)^(t/T1/2)')
      .l(`N = (${g(N0)} g)(1/2)^(${t} days/${T} days)`, `N = ${num(N)} g`)
      .n(`${t}/${T} = ${halves} half-lives, so you cut it in half ${halves} time${halves > 1 ? 's' : ''}.`)
      .done(`A sample has ${g(N0)} g of an isotope with a half-life of ${T} days. How much is left after ${t} days?`, N, 'g');
  });

  add('modern', 'Hydrogen: photon from an energy jump', () => {
    const levels = [[-13.6, 1], [-3.4, 2], [-1.51, 3], [-0.85, 4], [-0.54, 5]];
    let a, b;
    do { a = pick(levels); b = pick(levels); } while (a[1] <= b[1]);
    const E = r3(a[0] - b[0]), lam = r3(1240 / E);
    return W()
      .l('Atomic energy levels', `E${a[1]} = ${g(a[0])} eV`, `E${b[1]} = ${g(b[0])} eV`, 'hc = 1240 eV nm', 'lambda = ?', '')
      .f('E photon = E upper - E lower')
      .l(`E photon = (${g(a[0])} eV) - (${g(b[0])} eV)`, `E photon = ${num(E)} eV`, '')
      .f('E = hc/lambda')
      .l(`(${num(E)} eV) = (1240 eV nm)/lambda`, `lambda = ${num(lam)} nm`)
      .n('The photon carries away exactly the energy difference between the two levels.')
      .done(`An electron in hydrogen drops from level n = ${a[1]} (${g(a[0])} eV) to level n = ${b[1]} (${g(b[0])} eV). What is the wavelength of the photon it gives off, in nm?`, lam, 'nm');
  });
})();
