/* AP Physics 1 problem generators (units 1-8).
 * Each one picks fresh numbers and returns the question, the worked solution
 * (one item per line, plain keyboard characters) and the answer. */
(function () {
  'use strict';
  const { r3, num, g, sg, sgv, R, pick, deg, W, add } = globalThis.SW;
  const G9 = '9.8 m/s^2';

  // ---------------- Unit 1: Kinematics ----------------

  add('kin', 'Dropped object: speed after a time', () => {
    const t = R(1.5, 5, 0.5), v = r3(9.8 * t);
    return W()
      .l('Freefall', 'Down = +', 'a = +9.8 m/s^2', 'V0y = 0 m/s (dropped)', `t = ${g(t)} s`, 'Vy = ?', '')
      .f('Vy = V0y + at')
      .l(`Vy = (0 m/s) + (+${G9})(${g(t)} s)`, `Vy = ${sg(v)} m/s`)
      .n('Dropped means it starts from rest, so V0y = 0 m/s.')
      .n('It only moves down, so pick Down = + and a = +9.8 m/s^2.')
      .done(`A rock is dropped from a bridge. How fast is it falling after ${g(t)} s?`, v, 'm/s', true);
  });

  add('kin', 'Thrown down: distance fallen', () => {
    const v0 = R(2, 12, 0.5), t = R(1, 4, 0.5);
    const y = r3(v0 * t + 0.5 * 9.8 * t * t);
    return W()
      .l('Freefall', 'Down = +', 'a = +9.8 m/s^2', `V0y = +${g(v0)} m/s`, `t = ${g(t)} s`, 'y = ?', '')
      .f('y = V0yt + 1/2at^2')
      .l(`y = (+${g(v0)} m/s)(${g(t)} s) + 1/2(+${G9})(${g(t)} s)^2`, `y = ${sg(y)} m`)
      .n('Thrown down, so Down = + and both V0y and a are positive.')
      .n('Common mistake: square the time first, then multiply by 1/2 and a.')
      .done(`A ball is thrown straight down from a tall building at ${g(v0)} m/s. How far does it fall in ${g(t)} s?`, y, 'm', true);
  });

  add('kin', 'Thrown up: maximum height', () => {
    const v0 = R(8, 30, 0.5), y = r3((v0 * v0) / (2 * 9.8));
    return W()
      .l('Freefall', 'Up = +', 'a = -9.8 m/s^2', `V0y = +${g(v0)} m/s`, 'Vy = 0 m/s (at the top)', 'y = ?', '')
      .f('Vy^2 = V0y^2 + 2ay')
      .l(`(0 m/s)^2 = (+${g(v0)} m/s)^2 + 2(-${G9})y`, `y = ${sg(y)} m`)
      .n('At the very top it stops for an instant, so Vy = 0 m/s. That is the hidden given.')
      .n('Up = + because it starts going up, so gravity is a = -9.8 m/s^2.')
      .done(`A ball is thrown straight up at ${g(v0)} m/s. How high does it go above the launch point?`, y, 'm', true);
  });

  add('kin', 'Thrown up: time to the top', () => {
    const v0 = R(8, 35, 0.5), t = r3(v0 / 9.8);
    return W()
      .l('Freefall', 'Up = +', 'a = -9.8 m/s^2', `V0y = +${g(v0)} m/s`, 'Vy = 0 m/s (at the top)', 't = ?', '')
      .f('Vy = V0y + at')
      .l(`0 m/s = (+${g(v0)} m/s) + (-${G9})t`, `t = ${num(t)} s`)
      .n('Vy = 0 m/s at the top, even though a is still -9.8 m/s^2 there.')
      .done(`An arrow is shot straight up at ${g(v0)} m/s. How long does it take to reach the top?`, t, 's');
  });

  add('kin', 'Thrown up: total time in the air', () => {
    const v0 = R(6, 30, 0.5), t = r3((2 * v0) / 9.8);
    return W()
      .l('Freefall', 'Up = +', 'a = -9.8 m/s^2', `V0y = +${g(v0)} m/s`, `Vy = -${g(v0)} m/s (same speed on the way down)`, 't = ?', '')
      .f('Vy = V0y + at')
      .l(`(-${g(v0)} m/s) = (+${g(v0)} m/s) + (-${G9})t`, `t = ${num(t)} s`)
      .n('It lands at the height it was thrown from, so it has the same speed, just pointing down.')
      .n('Quick check: time up = time down, so this is double the time to the top.')
      .done(`A ball is tossed straight up at ${g(v0)} m/s and caught at the same height. How long is it in the air?`, t, 's');
  });

  add('kin', 'Car speeding up: displacement', () => {
    const v0 = R(2, 20, 1), a = R(0.5, 4, 0.5), t = R(2, 10, 1);
    const x = r3(v0 * t + 0.5 * a * t * t);
    return W()
      .l('Constant a', 'Right = +', `V0x = +${g(v0)} m/s`, `a = +${g(a)} m/s^2`, `t = ${g(t)} s`, 'x = ?', '')
      .f('x = V0xt + 1/2at^2')
      .l(`x = (+${g(v0)} m/s)(${g(t)} s) + 1/2(+${g(a)} m/s^2)(${g(t)} s)^2`, `x = ${sg(x)} m`)
      .n('Speeding up while moving right, so a is positive too.')
      .done(`A car moving right at ${g(v0)} m/s speeds up at ${g(a)} m/s^2 for ${g(t)} s. How far does it travel?`, x, 'm', true);
  });

  add('kin', 'Braking car: stopping distance', () => {
    const v0 = R(10, 35, 1), a = R(2, 8, 0.5), x = r3((v0 * v0) / (2 * a));
    return W()
      .l('Constant a', 'Right = +', `V0x = +${g(v0)} m/s`, 'Vx = 0 m/s (stops)', `a = -${g(a)} m/s^2`, 'x = ?', '')
      .f('Vx^2 = V0x^2 + 2ax')
      .l(`(0 m/s)^2 = (+${g(v0)} m/s)^2 + 2(-${g(a)} m/s^2)x`, `x = ${sg(x)} m`)
      .n('It is slowing down while moving right, so a is negative.')
      .n('No time is given, so use the formula without t.')
      .done(`A car moving right at ${g(v0)} m/s brakes and slows down at ${g(a)} m/s^2 until it stops. How far does it go while braking?`, x, 'm', true);
  });

  add('kin', 'Constant velocity: time', () => {
    const v = R(3, 30, 0.5), x = R(50, 600, 10), t = r3(x / v);
    return W()
      .l('Constant v', 'Right = +', `v = +${g(v)} m/s`, `x = +${g(x)} m`, 't = ?', '')
      .f('v = x/t')
      .l(`(+${g(v)} m/s) = (+${g(x)} m)/t`, `t = ${num(t)} s`)
      .n('Constant velocity means a = 0, so the simple v = x/t works.')
      .done(`A cyclist rides at a steady ${g(v)} m/s. How long does it take to go ${g(x)} m?`, t, 's');
  });

  add('kin', 'Speeding up from rest: final speed', () => {
    const a = R(1, 6, 0.5), x = R(20, 200, 5), v = r3(Math.sqrt(2 * a * x));
    return W()
      .l('Constant a', 'Right = +', 'V0x = 0 m/s (starts from rest)', `a = +${g(a)} m/s^2`, `x = +${g(x)} m`, 'Vx = ?', '')
      .f('Vx^2 = V0x^2 + 2ax')
      .l(`Vx^2 = (0 m/s)^2 + 2(+${g(a)} m/s^2)(+${g(x)} m)`, `Vx = ${sg(v)} m/s`)
      .n('Take the square root at the very end. Pick + because it is moving right.')
      .done(`A sprinter starts from rest and speeds up at ${g(a)} m/s^2 over ${g(x)} m. How fast is the sprinter going at the end?`, v, 'm/s', true);
  });

  add('kin', 'Ball rolls off a table: landing distance', () => {
    const h = R(0.6, 2, 0.1), vx = R(1, 6, 0.5);
    const t = r3(Math.sqrt((2 * h) / 9.8)), x = r3(vx * t);
    return W()
      .l('Freefall', 'Down = +', 'a = +9.8 m/s^2', 'V0y = 0 m/s (launched sideways)', `y = +${g(h)} m`, 't = ?', '')
      .f('y = V0yt + 1/2at^2')
      .l(`(+${g(h)} m) = (0 m/s)t + 1/2(+${G9})t^2`, `t = ${num(t)} s`, '')
      .l('Constant v (sideways)', 'Right = +', `v = +${g(vx)} m/s`, `t = ${num(t)} s (same time as the fall)`, 'x = ?', '')
      .f('v = x/t')
      .l(`(+${g(vx)} m/s) = x/(${num(t)} s)`, `x = ${sg(x)} m`)
      .n('Sideways launch means all the speed is in x, so V0y = 0 m/s.')
      .n('The fall and the sideways motion take the same time. Find t from the fall first.')
      .done(`A ball rolls off a ${g(h)} m tall table at ${g(vx)} m/s. How far from the table does it land?`, x, 'm', true);
  });

  add('kin', 'Two-stage rocket: maximum altitude', () => {
    const a = R(2, 6, 0.2), y1 = R(200, 900, 25);
    const v = r3(Math.sqrt(2 * a * y1)), y2 = r3((v * v) / (2 * 9.8)), total = r3(y1 + y2);
    return W()
      .l('Constant a', 'Up = +', `a = +${g(a)} m/s^2`, 'V0y = 0 m/s (starts on the ground)', `y = +${g(y1)} m`, 'Vy = ?', '')
      .f('Vy^2 = V0y^2 + 2ay')
      .l(`Vy^2 = (0 m/s)^2 + 2(+${g(a)} m/s^2)(+${g(y1)} m)`, `Vy = ${sg(v)} m/s`, '')
      .l('Freefall after the fuel runs out', 'Up = +', 'a = -9.8 m/s^2', `V0y = ${sg(v)} m/s (end of stage 1)`, 'Vy = 0 m/s (at the top)', 'y = ?', '')
      .f('Vy^2 = V0y^2 + 2ay')
      .l(`(0 m/s)^2 = (${sg(v)} m/s)^2 + 2(-${G9})y`, `y = ${sg(y2)} m`, '')
      .l(`max altitude = ${g(y1)} m + ${num(y2)} m = ${num(total)} m`)
      .n('The speed at the end of stage 1 is the starting speed of stage 2.')
      .n('After the fuel runs out it keeps going up while slowing down, so it is freefall.')
      .done(`A rocket launches from rest and accelerates straight up at ${g(a)} m/s^2 until its fuel runs out at ${g(y1)} m. What is its maximum altitude?`, total, 'm');
  });

  // ---------------- Unit 2: Force and Translational Dynamics ----------------

  add('dyn', "Newton's 2nd law: acceleration", () => {
    const F = R(20, 120, 5), m = R(2, 25, 0.5), a = r3(F / m);
    return W()
      .l("Newton's 2nd law", 'Right = +', `m = ${g(m)} kg`, `Fnet = +${g(F)} N (only sideways force, no friction)`, 'a = ?', '')
      .f('Fnet = ma')
      .l(`(+${g(F)} N) = (${g(m)} kg)a`, `a = ${sg(a)} m/s^2`)
      .n('Frictionless means the push is the whole net force.')
      .done(`A ${g(m)} kg cart on a frictionless floor is pushed right with a ${g(F)} N force. What is its acceleration?`, a, 'm/s^2', true);
  });

  add('dyn', 'Pushing a box with friction', () => {
    const m = R(5, 20, 1), mu = R(0.1, 0.4, 0.05);
    const Fn = r3(m * 9.8), Ff = r3(mu * Fn), F = R(Math.ceil(Ff) + 10, Math.ceil(Ff) + 80, 5);
    const a = r3((F - Ff) / m);
    return W()
      .l("Newton's 2nd law", 'Right = +', `m = ${g(m)} kg`, `F = +${g(F)} N`, `uk = ${g(mu)}`, 'a = ?', '')
      .f('Fn = mg (flat floor, no vertical acceleration)')
      .l(`Fn = (${g(m)} kg)(${G9})`, `Fn = ${num(Fn)} N`, '')
      .f('Ff = ukFn')
      .l(`Ff = (${g(mu)})(${num(Fn)} N)`, `Ff = ${num(Ff)} N (points left, against the motion)`, '')
      .f('Fnet = ma')
      .l(`(+${g(F)} N) + (-${num(Ff)} N) = (${g(m)} kg)a`, `a = ${sg(a)} m/s^2`)
      .n('Friction points opposite the motion, so it goes in as a negative.')
      .n('On a flat floor with no other up or down forces, Fn = mg.')
      .done(`A ${g(m)} kg box is pushed right across the floor with a ${g(F)} N force. The coefficient of kinetic friction is ${g(mu)}. What is the box's acceleration?`, a, 'm/s^2', true);
  });

  add('dyn', 'Frictionless ramp: acceleration', () => {
    const th = R(15, 50, 5), a = r3(9.8 * Math.sin(deg(th)));
    return W()
      .l("Newton's 2nd law (frictionless ramp)", 'Down the ramp = +', `theta = ${th} degrees`, 'a = ?', '')
      .f('a = g sin(theta)')
      .l(`a = (${G9})sin(${th} degrees)`, `a = ${sg(a)} m/s^2`)
      .n('Only the part of gravity along the ramp, mg sin(theta), speeds it up. The mass cancels.')
      .n('Make sure your calculator is in degree mode.')
      .done(`A block slides down a frictionless ramp tilted at ${th} degrees. What is its acceleration?`, a, 'm/s^2', true);
  });

  add('dyn', 'Atwood machine: acceleration', () => {
    const m1 = R(1, 5, 0.5), m2 = r3(m1 + R(0.5, 4, 0.5));
    const a = r3(((m2 - m1) * 9.8) / (m1 + m2));
    return W()
      .l("Newton's 2nd law (Atwood machine)", 'Direction the heavier mass moves = +', `m1 = ${g(m1)} kg`, `m2 = ${g(m2)} kg`, 'a = ?', '')
      .f('Fnet = ma (both masses as one system)')
      .l(`(${g(m2)} kg)(${G9}) - (${g(m1)} kg)(${G9}) = (${g(m1 + m2)} kg)a`, `a = ${sg(a)} m/s^2`)
      .n('The tension pulls both ways inside the system, so it cancels out.')
      .n('Use the total mass on the right side, because both masses speed up together.')
      .done(`Masses of ${g(m1)} kg and ${g(m2)} kg hang on either side of a light, frictionless pulley. What is the acceleration of the masses?`, a, 'm/s^2', true);
  });

  add('dyn', 'Gravity on another planet', () => {
    const M = R(1, 9, 0.1) * 1e24, r = R(2, 9, 0.1) * 1e6;
    const gp = r3((6.67e-11 * M) / (r * r));
    return W()
      .l('Gravitation', 'G = 6.67 x 10^-11 N m^2/kg^2', `M = ${g(M)} kg`, `r = ${g(r)} m (radius of the planet)`, 'g = ?', '')
      .f('g = GM/r^2')
      .l(`g = (6.67 x 10^-11 N m^2/kg^2)(${g(M)} kg)/(${g(r)} m)^2`, `g = ${num(gp)} m/s^2`)
      .n('At the surface, the distance r is the radius of the planet.')
      .n('Square the whole radius, including the power of 10.')
      .done(`A planet has a mass of ${g(M)} kg and a radius of ${g(r)} m. What is the gravitational field strength at its surface?`, gp, 'm/s^2');
  });

  add('dyn', "Hooke's law: hanging mass", () => {
    const m = R(0.2, 2, 0.1), k = R(50, 400, 10);
    const Fs = r3(m * 9.8), x = r3(Fs / k);
    return W()
      .l("Hooke's law", `m = ${g(m)} kg`, `k = ${g(k)} N/m`, 'x = ?', '')
      .f('Fs = mg (hanging still, so the forces balance)')
      .l(`Fs = (${g(m)} kg)(${G9})`, `Fs = ${num(Fs)} N`, '')
      .f('Fs = kx')
      .l(`(${num(Fs)} N) = (${g(k)} N/m)x`, `x = ${num(x)} m`)
      .n('Hanging at rest means the spring force equals the weight.')
      .done(`A ${g(m)} kg mass hangs at rest from a spring with k = ${g(k)} N/m. How far is the spring stretched?`, x, 'm');
  });

  add('dyn', 'Car on a curve: centripetal force', () => {
    const m = R(800, 2000, 50), v = R(8, 25, 1), r = R(20, 120, 5);
    const F = r3((m * v * v) / r);
    return W()
      .l('Circular motion', 'Toward the center = +', `m = ${g(m)} kg`, `v = ${g(v)} m/s`, `r = ${g(r)} m`, 'Fc = ?', '')
      .f('Fc = mv^2/r')
      .l(`Fc = (${g(m)} kg)(${g(v)} m/s)^2/(${g(r)} m)`, `Fc = ${sg(F)} N`)
      .n('Static friction from the road is what supplies this force toward the center.')
      .done(`A ${g(m)} kg car drives around a flat curve of radius ${g(r)} m at ${g(v)} m/s. How much friction force is needed to keep it on the curve?`, F, 'N', true);
  });

  add('dyn', 'Elevator: scale reading', () => {
    const m = R(50, 90, 1), a = R(0.5, 3, 0.1), Fn = r3(m * (9.8 + a));
    return W()
      .l("Newton's 2nd law (elevator)", 'Up = +', `m = ${g(m)} kg`, `a = +${g(a)} m/s^2 (speeding up going up)`, 'Fn = ?', '')
      .f('Fnet = ma')
      .l(`Fn - (${g(m)} kg)(${G9}) = (${g(m)} kg)(+${g(a)} m/s^2)`, `Fn = ${sg(Fn)} N`)
      .n('The scale reads Fn, so you feel heavier when the elevator speeds up going up.')
      .done(`A ${g(m)} kg person stands on a scale in an elevator that speeds up going up at ${g(a)} m/s^2. What does the scale read (in newtons)?`, Fn, 'N', true);
  });

  // ---------------- Unit 3: Work, Energy, and Power ----------------

  add('energy', 'Work done by an angled force', () => {
    const F = R(10, 80, 5), d = R(2, 20, 1), th = pick([0, 20, 30, 37, 45, 60]);
    const Wk = r3(F * d * Math.cos(deg(th)));
    return W()
      .l('Work', `F = ${g(F)} N`, `d = ${g(d)} m`, `theta = ${th} degrees (angle between the force and the motion)`, 'W = ?', '')
      .f('W = Fd cos(theta)')
      .l(`W = (${g(F)} N)(${g(d)} m)cos(${th} degrees)`, `W = ${num(Wk)} J`)
      .n('Only the part of the force along the motion does work.')
      .done(`A sled is pulled ${g(d)} m by a rope with ${g(F)} N of tension at ${th} degrees above the horizontal. How much work does the rope do?`, Wk, 'J');
  });

  add('energy', 'Kinetic energy', () => {
    const m = Math.random() < 0.5 ? R(500, 2000, 50) : R(0.1, 5, 0.1), v = R(2, 30, 0.5);
    const K = r3(0.5 * m * v * v);
    return W()
      .l('Kinetic energy', `m = ${g(m)} kg`, `v = ${g(v)} m/s`, 'K = ?', '')
      .f('K = 1/2mv^2')
      .l(`K = 1/2(${g(m)} kg)(${g(v)} m/s)^2`, `K = ${num(K)} J`)
      .n('Only the speed gets squared, not the mass.')
      .done(`What is the kinetic energy of a ${g(m)} kg object moving at ${g(v)} m/s?`, K, 'J');
  });

  add('energy', 'Energy conservation: speed after a drop', () => {
    const m = R(0.5, 5, 0.5), h = R(2, 40, 1), v = r3(Math.sqrt(2 * 9.8 * h));
    return W()
      .l('Conservation of energy (no friction)', `m = ${g(m)} kg`, `h = ${g(h)} m`, 'v at top = 0 m/s (starts from rest)', 'v = ?', '')
      .f('Ug (top) = K (bottom)')
      .f('mgh = 1/2mv^2')
      .l(`(${g(m)} kg)(${G9})(${g(h)} m) = 1/2(${g(m)} kg)v^2`, `v = ${num(v)} m/s`)
      .n('The mass cancels, so any mass hits the ground at the same speed.')
      .n('All the starting Ug turns into K at the bottom.')
      .done(`A ${g(m)} kg ball is released from rest ${g(h)} m above the ground. Ignoring air resistance, how fast is it moving just before it hits the ground?`, v, 'm/s');
  });

  add('energy', 'Spring launcher: launch speed', () => {
    const k = R(100, 800, 25), x = R(0.05, 0.3, 0.01), m = R(0.05, 0.5, 0.01);
    const v = r3(Math.sqrt((k * x * x) / m));
    return W()
      .l('Conservation of energy', `k = ${g(k)} N/m`, `x = ${g(x)} m`, `m = ${g(m)} kg`, 'v = ?', '')
      .f('Us = K')
      .f('1/2kx^2 = 1/2mv^2')
      .l(`1/2(${g(k)} N/m)(${g(x)} m)^2 = 1/2(${g(m)} kg)v^2`, `v = ${num(v)} m/s`)
      .n('All the spring energy turns into kinetic energy once the ball leaves the spring.')
      .done(`A spring (k = ${g(k)} N/m) is compressed ${g(x)} m and launches a ${g(m)} kg ball across a frictionless surface. How fast is the ball moving?`, v, 'm/s');
  });

  add('energy', 'Power: lifting a load', () => {
    const m = R(20, 300, 10), h = R(2, 20, 1), t = R(2, 30, 1);
    const Wk = r3(m * 9.8 * h), P = r3(Wk / t);
    return W()
      .l('Power', `m = ${g(m)} kg`, `h = ${g(h)} m`, `t = ${g(t)} s`, 'P = ?', '')
      .f('W = mgh (lifting at a steady speed)')
      .l(`W = (${g(m)} kg)(${G9})(${g(h)} m)`, `W = ${num(Wk)} J`, '')
      .f('P = W/t')
      .l(`P = (${num(Wk)} J)/(${g(t)} s)`, `P = ${num(P)} W`)
      .n('Steady speed means the work done goes into Ug, which is mgh.')
      .done(`A motor lifts a ${g(m)} kg load ${g(h)} m at a steady speed in ${g(t)} s. What power does the motor supply?`, P, 'W');
  });

  add('energy', 'Work-energy theorem: braking distance', () => {
    const m = R(800, 2000, 50), v = R(10, 30, 1), F = R(3000, 9000, 250);
    const K = r3(0.5 * m * v * v), d = r3(K / F);
    return W()
      .l('Work-energy theorem', `m = ${g(m)} kg`, `v0 = ${g(v)} m/s`, 'v = 0 m/s (stops)', `F = ${g(F)} N (braking force, opposite the motion)`, 'd = ?', '')
      .f('Wnet = deltaK')
      .f('-Fd = 1/2mv^2 - 1/2mv0^2')
      .l(`-(${g(F)} N)d = 0 J - 1/2(${g(m)} kg)(${g(v)} m/s)^2`, `d = ${num(d)} m`)
      .n('The braking force points backwards, so it does negative work and takes away kinetic energy.')
      .done(`A ${g(m)} kg car going ${g(v)} m/s brakes with a constant ${g(F)} N force. How far does it travel before stopping?`, d, 'm');
  });

  add('energy', 'Roller coaster: speed at the bottom', () => {
    const v0 = R(2, 10, 0.5), h = R(10, 60, 1), v = r3(Math.sqrt(v0 * v0 + 2 * 9.8 * h));
    return W()
      .l('Conservation of energy (no friction)', `v0 = ${g(v0)} m/s (at the top)`, `h = ${g(h)} m (drop height)`, 'v = ?', '')
      .f('K (top) + Ug (top) = K (bottom)')
      .f('1/2mv0^2 + mgh = 1/2mv^2')
      .l(`1/2(${g(v0)} m/s)^2 + (${G9})(${g(h)} m) = 1/2v^2`, `v = ${num(v)} m/s`)
      .n('Mass is in every term, so divide it out before plugging in.')
      .done(`A roller coaster car moves over the top of a hill at ${g(v0)} m/s, then drops ${g(h)} m. Ignoring friction, how fast is it going at the bottom?`, v, 'm/s');
  });

  // ---------------- Unit 4: Linear Momentum ----------------

  add('mom', 'Momentum of a moving object', () => {
    const m = R(0.05, 3, 0.05), v = R(5, 45, 1), p = r3(m * v);
    return W()
      .l('Momentum', 'Right = +', `m = ${g(m)} kg`, `v = +${g(v)} m/s`, 'p = ?', '')
      .f('p = mv')
      .l(`p = (${g(m)} kg)(+${g(v)} m/s)`, `p = ${sg(p)} kg m/s`)
      .n('Momentum is a vector, so it points the same way as the velocity.')
      .done(`What is the momentum of a ${g(m)} kg ball moving right at ${g(v)} m/s?`, p, 'kg m/s', true);
  });

  add('mom', 'Impulse: ball bounces off a wall', () => {
    const m = R(0.1, 0.6, 0.05), v1 = R(10, 30, 1), v2 = R(5, v1, 1), t = R(0.01, 0.05, 0.005);
    const F = r3((m * (-v2 - v1)) / t);
    return W()
      .l('Impulse', 'Right = + (toward the wall)', `m = ${g(m)} kg`, `v0 = +${g(v1)} m/s`, `v = -${g(v2)} m/s (bounces back)`, `delta t = ${g(t)} s`, 'F = ?', '')
      .f('F delta t = m(v - v0)')
      .l(`F(${g(t)} s) = (${g(m)} kg)((-${g(v2)} m/s) - (+${g(v1)} m/s))`, `F = ${sg(F)} N`)
      .n('Bouncing back flips the sign of the velocity. Do not just subtract the speeds.')
      .n('The negative answer means the wall pushes the ball to the left.')
      .done(`A ${g(m)} kg ball moving right at ${g(v1)} m/s hits a wall and bounces back at ${g(v2)} m/s. The contact lasts ${g(t)} s. What average force does the wall exert on the ball?`, F, 'N', true);
  });

  add('mom', 'Perfectly inelastic collision', () => {
    const m1 = R(500, 2500, 100), v1 = R(5, 25, 1), m2 = R(500, 2500, 100);
    const vf = r3((m1 * v1) / (m1 + m2));
    return W()
      .l('Conservation of momentum', 'Right = +', `m1 = ${g(m1)} kg`, `v1 = +${g(v1)} m/s`, `m2 = ${g(m2)} kg`, 'v2 = 0 m/s (parked)', 'vf = ?', '')
      .f('m1v1 + m2v2 = (m1 + m2)vf')
      .l(`(${g(m1)} kg)(+${g(v1)} m/s) + (${g(m2)} kg)(0 m/s) = (${g(m1 + m2)} kg)vf`, `vf = ${sg(vf)} m/s`)
      .n('They stick together, so after the crash it is one object with the total mass.')
      .done(`A ${g(m1)} kg car moving right at ${g(v1)} m/s rear-ends a ${g(m2)} kg parked car and they stick together. How fast do they move just after the crash?`, vf, 'm/s', true);
  });

  add('mom', 'Recoil: pushing off', () => {
    const m1 = R(40, 90, 1), m2 = R(20, 70, 1), v1 = R(0.5, 3, 0.1);
    const v2 = r3((-m1 * v1) / m2);
    return W()
      .l('Conservation of momentum (starts at rest)', 'Right = +', `m1 = ${g(m1)} kg`, `v1 = +${g(v1)} m/s`, `m2 = ${g(m2)} kg`, 'v2 = ?', '')
      .f('0 = m1v1 + m2v2')
      .l(`0 = (${g(m1)} kg)(+${g(v1)} m/s) + (${g(m2)} kg)v2`, `v2 = ${sg(v2)} m/s`)
      .n('Total momentum was 0 before, so it is still 0 after.')
      .n('The negative sign means skater 2 moves left.')
      .done(`Two skaters stand at rest on ice and push off each other. The ${g(m1)} kg skater moves right at ${g(v1)} m/s. What is the velocity of the ${g(m2)} kg skater?`, v2, 'm/s', true);
  });

  add('mom', 'Collision: find the other cart', () => {
    let m1, m2, v1, v1f, v2f;
    do { // keep it physical: no kinetic energy created in the crash
      m1 = R(0.2, 2, 0.1); m2 = R(0.2, 2, 0.1); v1 = R(1, 5, 0.5); v1f = R(-1.5, 1, 0.5);
      v2f = r3((m1 * v1 - m1 * v1f) / m2);
    } while (m1 * v1f * v1f + m2 * v2f * v2f > m1 * v1 * v1 || v2f < v1f);
    return W()
      .l('Conservation of momentum', 'Right = +', `m1 = ${g(m1)} kg`, `v1 = +${g(v1)} m/s`, `m2 = ${g(m2)} kg`, 'v2 = 0 m/s (at rest)', `v1f = ${sgv(v1f) || '0'} m/s`, 'v2f = ?', '')
      .f('m1v1 + m2v2 = m1v1f + m2v2f')
      .l(`(${g(m1)} kg)(+${g(v1)} m/s) + (${g(m2)} kg)(0 m/s) = (${g(m1)} kg)(${sgv(v1f) || '0'} m/s) + (${g(m2)} kg)v2f`, `v2f = ${sg(v2f)} m/s`)
      .n('Plug in the sign of cart 1 after the crash. If it bounces back it is negative.')
      .done(`A ${g(m1)} kg cart moving right at ${g(v1)} m/s hits a ${g(m2)} kg cart at rest. After the collision cart 1 has a velocity of ${sgv(v1f) || '0'} m/s (right is +). What is the velocity of cart 2?`, v2f, 'm/s', true);
  });

  // ---------------- Unit 5: Torque and Rotational Dynamics ----------------

  add('rot', 'Torque from a wrench', () => {
    const r = R(0.15, 0.5, 0.05), F = R(20, 150, 5), th = pick([90, 60, 45, 30]);
    const tau = r3(r * F * Math.sin(deg(th)));
    return W()
      .l('Torque', `r = ${g(r)} m`, `F = ${g(F)} N`, `theta = ${th} degrees (angle between r and F)`, 'tau = ?', '')
      .f('tau = rF sin(theta)')
      .l(`tau = (${g(r)} m)(${g(F)} N)sin(${th} degrees)`, `tau = ${num(tau)} N m`)
      .n('Pushing straight across the handle (90 degrees) gives the most torque.')
      .done(`A ${g(F)} N force is applied to the end of a ${g(r)} m wrench at ${th} degrees to the handle. What torque does it make?`, tau, 'N m');
  });

  add('rot', 'Spinning up: final angular speed', () => {
    const w0 = R(0, 10, 0.5), al = R(0.5, 6, 0.5), t = R(2, 10, 1);
    const w = r3(w0 + al * t);
    return W()
      .l('Rotational kinematics', 'Counterclockwise = +', `omega0 = ${w0 === 0 ? '0' : '+' + g(w0)} rad/s`, `alpha = +${g(al)} rad/s^2`, `t = ${g(t)} s`, 'omega = ?', '')
      .f('omega = omega0 + alpha t')
      .l(`omega = (${w0 === 0 ? '0' : '+' + g(w0)} rad/s) + (+${g(al)} rad/s^2)(${g(t)} s)`, `omega = ${sg(w)} rad/s`)
      .n('Same idea as Vx = V0x + at, just with angles.')
      .done(`A wheel spinning counterclockwise at ${g(w0)} rad/s speeds up at ${g(al)} rad/s^2 for ${g(t)} s. What is its final angular velocity?`, w, 'rad/s', true);
  });

  add('rot', 'Spinning up: number of turns', () => {
    const al = R(1, 8, 0.5), t = R(2, 10, 1);
    const th = r3(0.5 * al * t * t), rev = r3(th / (2 * Math.PI));
    return W()
      .l('Rotational kinematics', 'Counterclockwise = +', 'omega0 = 0 rad/s (starts from rest)', `alpha = +${g(al)} rad/s^2`, `t = ${g(t)} s`, 'theta = ?', '')
      .f('theta = omega0t + 1/2alphat^2')
      .l(`theta = (0 rad/s)(${g(t)} s) + 1/2(+${g(al)} rad/s^2)(${g(t)} s)^2`, `theta = ${sg(th)} rad`, '')
      .f('revolutions = theta/(2pi)')
      .l(`revolutions = (${num(th)} rad)/(2pi)`, `revolutions = ${num(rev)}`)
      .n('One full turn is 2pi radians.')
      .done(`A fan starts from rest and speeds up at ${g(al)} rad/s^2 for ${g(t)} s. How many revolutions does it make?`, rev, 'rev');
  });

  add('rot', "Newton's 2nd law for rotation: disk", () => {
    const M = R(2, 20, 1), r = R(0.1, 0.5, 0.05), F = R(5, 40, 1);
    const I = r3(0.5 * M * r * r), tau = r3(r * F), al = r3(tau / I);
    return W()
      .l("Newton's 2nd law for rotation", `M = ${g(M)} kg`, `r = ${g(r)} m`, `F = ${g(F)} N (pulled along the edge)`, 'alpha = ?', '')
      .f('I = 1/2Mr^2 (solid disk)')
      .l(`I = 1/2(${g(M)} kg)(${g(r)} m)^2`, `I = ${num(I)} kg m^2`, '')
      .f('tau = rF sin(theta)')
      .l(`tau = (${g(r)} m)(${g(F)} N)sin(90 degrees)`, `tau = ${num(tau)} N m`, '')
      .f('tau = I alpha')
      .l(`(${num(tau)} N m) = (${num(I)} kg m^2)alpha`, `alpha = ${num(al)} rad/s^2`)
      .n('A rope pulled along the edge is at 90 degrees to the radius.')
      .done(`A rope wrapped around a ${g(M)} kg solid disk of radius ${g(r)} m is pulled with ${g(F)} N. What is the disk's angular acceleration?`, al, 'rad/s^2');
  });

  add('rot', 'Balanced seesaw', () => {
    const m1 = R(20, 60, 1), r1 = R(1, 2.5, 0.1), m2 = R(25, 80, 1);
    const r2 = r3((m1 * r1) / m2);
    return W()
      .l('Rotational equilibrium', `m1 = ${g(m1)} kg`, `r1 = ${g(r1)} m`, `m2 = ${g(m2)} kg`, 'r2 = ?', '')
      .f('net tau = 0 (balanced), so m1gr1 = m2gr2')
      .l(`(${g(m1)} kg)(${G9})(${g(r1)} m) = (${g(m2)} kg)(${G9})r2`, `r2 = ${num(r2)} m`)
      .n('g is on both sides, so it cancels.')
      .n('The heavier kid has to sit closer to the pivot.')
      .done(`A ${g(m1)} kg child sits ${g(r1)} m from the pivot of a seesaw. Where must a ${g(m2)} kg child sit on the other side to balance it?`, r2, 'm');
  });

  add('rot', 'Linear speed on a spinning wheel', () => {
    const r = R(0.1, 1.5, 0.05), w = R(2, 30, 0.5), v = r3(r * w);
    return W()
      .l('Rotation to linear', `r = ${g(r)} m`, `omega = ${g(w)} rad/s`, 'v = ?', '')
      .f('v = r omega')
      .l(`v = (${g(r)} m)(${g(w)} rad/s)`, `v = ${num(v)} m/s`)
      .n('Points farther from the center move faster, even though omega is the same.')
      .done(`A point on the rim of a wheel is ${g(r)} m from the center. The wheel spins at ${g(w)} rad/s. How fast is the point moving?`, v, 'm/s');
  });

  // ---------------- Unit 6: Energy and Momentum of Rotating Systems ----------------

  add('rotE', 'Rotational kinetic energy of a disk', () => {
    const M = R(1, 30, 1), r = R(0.1, 0.6, 0.05), w = R(5, 40, 1);
    const I = r3(0.5 * M * r * r), K = r3(0.5 * I * w * w);
    return W()
      .l('Rotational kinetic energy', `M = ${g(M)} kg`, `r = ${g(r)} m`, `omega = ${g(w)} rad/s`, 'K = ?', '')
      .f('I = 1/2Mr^2 (solid disk)')
      .l(`I = 1/2(${g(M)} kg)(${g(r)} m)^2`, `I = ${num(I)} kg m^2`, '')
      .f('K = 1/2I omega^2')
      .l(`K = 1/2(${num(I)} kg m^2)(${g(w)} rad/s)^2`, `K = ${num(K)} J`)
      .n('Same shape as 1/2mv^2: I takes the place of m and omega takes the place of v.')
      .done(`A ${g(M)} kg solid disk of radius ${g(r)} m spins at ${g(w)} rad/s. What is its rotational kinetic energy?`, K, 'J');
  });

  add('rotE', 'Spinning skater pulls in arms', () => {
    const I1 = R(2, 6, 0.1), I2 = r3(I1 * R(0.3, 0.7, 0.05)), w1 = R(1, 6, 0.5);
    const w2 = r3((I1 * w1) / I2);
    return W()
      .l('Conservation of angular momentum', `I1 = ${g(I1)} kg m^2`, `omega1 = ${g(w1)} rad/s`, `I2 = ${g(I2)} kg m^2`, 'omega2 = ?', '')
      .f('I1 omega1 = I2 omega2')
      .l(`(${g(I1)} kg m^2)(${g(w1)} rad/s) = (${g(I2)} kg m^2)omega2`, `omega2 = ${num(w2)} rad/s`)
      .n('No outside torque, so L stays the same. Smaller I means faster spin.')
      .done(`A skater spins at ${g(w1)} rad/s with a rotational inertia of ${g(I1)} kg m^2. She pulls in her arms and her rotational inertia drops to ${g(I2)} kg m^2. How fast does she spin now?`, w2, 'rad/s');
  });

  add('rotE', 'Rolling cylinder down a ramp', () => {
    const h = R(0.5, 5, 0.1), v = r3(Math.sqrt((4 * 9.8 * h) / 3));
    return W()
      .l('Conservation of energy (rolling without slipping)', `h = ${g(h)} m`, 'v0 = 0 m/s (starts from rest)', 'I = 1/2mr^2 (solid cylinder)', 'v = ?', '')
      .f('mgh = 1/2mv^2 + 1/2I omega^2')
      .l('mgh = 1/2mv^2 + 1/2(1/2mr^2)(v/r)^2 (rolling: omega = v/r)', 'gh = 3/4v^2 (m and r cancel)')
      .l(`(${G9})(${g(h)} m) = 3/4v^2`, `v = ${num(v)} m/s`)
      .n('Some of the energy goes into spinning, so it ends up slower than a block sliding without friction.')
      .done(`A solid cylinder rolls without slipping down a ramp from rest, dropping a height of ${g(h)} m. How fast is it moving at the bottom?`, v, 'm/s');
  });

  add('rotE', 'Angular momentum of a ball on a string', () => {
    const m = R(0.1, 2, 0.1), v = R(2, 15, 0.5), r = R(0.3, 2, 0.1), L = r3(m * v * r);
    return W()
      .l('Angular momentum', `m = ${g(m)} kg`, `v = ${g(v)} m/s`, `r = ${g(r)} m`, 'L = ?', '')
      .f('L = mvr')
      .l(`L = (${g(m)} kg)(${g(v)} m/s)(${g(r)} m)`, `L = ${num(L)} kg m^2/s`)
      .n('Use L = mvr for a small object moving in a circle around a point.')
      .done(`A ${g(m)} kg ball on a string moves in a circle of radius ${g(r)} m at ${g(v)} m/s. What is its angular momentum about the center?`, L, 'kg m^2/s');
  });

  add('rotE', 'Child jumps onto a merry-go-round', () => {
    const I = R(100, 400, 10), w1 = R(0.5, 3, 0.1), m = R(20, 50, 1), r = R(1, 2.5, 0.1);
    const Ic = r3(m * r * r), w2 = r3((I * w1) / (I + Ic));
    return W()
      .l('Conservation of angular momentum', `I = ${g(I)} kg m^2 (merry-go-round)`, `omega1 = ${g(w1)} rad/s`, `m = ${g(m)} kg`, `r = ${g(r)} m`, 'omega2 = ?', '')
      .f('I child = mr^2')
      .l(`I child = (${g(m)} kg)(${g(r)} m)^2`, `I child = ${num(Ic)} kg m^2`, '')
      .f('I omega1 = (I + I child)omega2')
      .l(`(${g(I)} kg m^2)(${g(w1)} rad/s) = (${g(I)} kg m^2 + ${num(Ic)} kg m^2)omega2`, `omega2 = ${num(w2)} rad/s`)
      .n('The child lands straight down, so she adds rotational inertia but no angular momentum.')
      .done(`A merry-go-round (I = ${g(I)} kg m^2) spins at ${g(w1)} rad/s. A ${g(m)} kg child drops straight down onto it ${g(r)} m from the center. What is the new angular speed?`, w2, 'rad/s');
  });

  // ---------------- Unit 7: Oscillations ----------------

  add('osc', 'Mass on a spring: period', () => {
    const m = R(0.1, 3, 0.1), k = R(10, 300, 5), T = r3(2 * Math.PI * Math.sqrt(m / k));
    return W()
      .l('Simple harmonic motion (spring)', `m = ${g(m)} kg`, `k = ${g(k)} N/m`, 'T = ?', '')
      .f('T = 2pi sqrt(m/k)')
      .l(`T = 2pi sqrt((${g(m)} kg)/(${g(k)} N/m))`, `T = ${num(T)} s`)
      .n('The amplitude does not change the period.')
      .done(`A ${g(m)} kg mass bounces on a spring with k = ${g(k)} N/m. What is the period of its motion?`, T, 's');
  });

  add('osc', 'Pendulum: period', () => {
    const L = R(0.2, 3, 0.1), T = r3(2 * Math.PI * Math.sqrt(L / 9.8));
    return W()
      .l('Simple harmonic motion (pendulum)', `L = ${g(L)} m`, 'g = 9.8 m/s^2', 'T = ?', '')
      .f('T = 2pi sqrt(L/g)')
      .l(`T = 2pi sqrt((${g(L)} m)/(${G9}))`, `T = ${num(T)} s`)
      .n('The mass of the bob does not matter for a pendulum (small swings).')
      .done(`What is the period of a pendulum that is ${g(L)} m long?`, T, 's');
  });

  add('osc', 'Find the spring constant from the period', () => {
    const m = R(0.2, 3, 0.1), T = R(0.3, 2, 0.05), k = r3((4 * Math.PI ** 2 * m) / (T * T));
    return W()
      .l('Simple harmonic motion (spring)', `m = ${g(m)} kg`, `T = ${g(T)} s`, 'k = ?', '')
      .f('T = 2pi sqrt(m/k)')
      .l(`(${g(T)} s) = 2pi sqrt((${g(m)} kg)/k)`, `k = ${num(k)} N/m`)
      .n('Divide by 2pi, square both sides, then solve for k.')
      .done(`A ${g(m)} kg mass on a spring oscillates with a period of ${g(T)} s. What is the spring constant?`, k, 'N/m');
  });

  add('osc', 'Frequency from counting cycles', () => {
    const n = R(10, 40, 1), t = R(5, 60, 1), T = r3(t / n), f = r3(1 / T);
    return W()
      .l('Period and frequency', `${n} cycles in ${g(t)} s`, 'f = ?', '')
      .f('T = time/cycles')
      .l(`T = (${g(t)} s)/${n}`, `T = ${num(T)} s`, '')
      .f('f = 1/T')
      .l(`f = 1/(${num(T)} s)`, `f = ${num(f)} Hz`)
      .n('Period is seconds per cycle. Frequency is cycles per second.')
      .done(`A swing completes ${n} full back-and-forth cycles in ${g(t)} s. What is its frequency?`, f, 'Hz');
  });

  add('osc', 'Maximum speed of a spring oscillator', () => {
    const k = R(20, 400, 10), A = R(0.02, 0.3, 0.01), m = R(0.1, 2, 0.1);
    const v = r3(A * Math.sqrt(k / m));
    return W()
      .l('Conservation of energy (spring)', `k = ${g(k)} N/m`, `A = ${g(A)} m`, `m = ${g(m)} kg`, 'vmax = ?', '')
      .f('1/2kA^2 = 1/2mvmax^2')
      .l(`1/2(${g(k)} N/m)(${g(A)} m)^2 = 1/2(${g(m)} kg)vmax^2`, `vmax = ${num(v)} m/s`)
      .n('It moves fastest at the middle, where all the spring energy has turned into K.')
      .done(`A ${g(m)} kg block on a spring (k = ${g(k)} N/m) oscillates with an amplitude of ${g(A)} m. What is its maximum speed?`, v, 'm/s');
  });

  // ---------------- Unit 8: Fluids ----------------

  add('fluids', 'Density', () => {
    const m = R(0.2, 20, 0.1), V = R(0.0001, 0.01, 0.0001), rho = r3(m / V);
    return W()
      .l('Density', `m = ${g(m)} kg`, `V = ${g(V)} m^3`, 'rho = ?', '')
      .f('rho = m/V')
      .l(`rho = (${g(m)} kg)/(${g(V)} m^3)`, `rho = ${num(rho)} kg/m^3`)
      .n('Water is 1000 kg/m^3. Bigger than that sinks, smaller floats.')
      .done(`An object has a mass of ${g(m)} kg and a volume of ${g(V)} m^3. What is its density?`, rho, 'kg/m^3');
  });

  add('fluids', 'Pressure at depth', () => {
    const h = R(2, 50, 1), P = r3(1.0e5 + 1000 * 9.8 * h);
    return W()
      .l('Fluid pressure', 'P0 = 1.0 x 10^5 Pa (air pressure at the surface)', 'rho = 1000 kg/m^3 (water)', `h = ${g(h)} m`, 'P = ?', '')
      .f('P = P0 + rho g h')
      .l(`P = (1.0 x 10^5 Pa) + (1000 kg/m^3)(${G9})(${g(h)} m)`, `P = ${num(P)} Pa`)
      .n('This is absolute pressure. Gauge pressure would just be rho g h.')
      .done(`What is the absolute pressure ${g(h)} m below the surface of a lake?`, P, 'Pa');
  });

  add('fluids', 'Buoyant force on a submerged object', () => {
    const V = R(0.001, 0.05, 0.001), Fb = r3(1000 * V * 9.8);
    return W()
      .l('Buoyancy', 'rho = 1000 kg/m^3 (water)', `V = ${g(V)} m^3 (fully under water)`, 'Fb = ?', '')
      .f('Fb = rho V g')
      .l(`Fb = (1000 kg/m^3)(${g(V)} m^3)(${G9})`, `Fb = ${num(Fb)} N`)
      .n('Use the density of the fluid, not the object.')
      .done(`A rock with a volume of ${g(V)} m^3 is fully under water. What is the buoyant force on it?`, Fb, 'N');
  });

  add('fluids', 'Continuity: water in a narrowing pipe', () => {
    const A1 = R(0.01, 0.05, 0.005), A2 = r3(A1 * R(0.2, 0.6, 0.05)), v1 = R(0.5, 4, 0.5);
    const v2 = r3((A1 * v1) / A2);
    return W()
      .l('Continuity', `A1 = ${g(A1)} m^2`, `v1 = ${g(v1)} m/s`, `A2 = ${g(A2)} m^2`, 'v2 = ?', '')
      .f('A1v1 = A2v2')
      .l(`(${g(A1)} m^2)(${g(v1)} m/s) = (${g(A2)} m^2)v2`, `v2 = ${num(v2)} m/s`)
      .n('Narrower pipe, faster water. Same amount flows through each second.')
      .done(`Water flows at ${g(v1)} m/s through a pipe with area ${g(A1)} m^2. The pipe narrows to ${g(A2)} m^2. How fast is the water in the narrow part?`, v2, 'm/s');
  });

  add('fluids', "Bernoulli: water out of a hole (Torricelli)", () => {
    const h = R(0.5, 10, 0.1), v = r3(Math.sqrt(2 * 9.8 * h));
    return W()
      .l("Bernoulli's equation", `h = ${g(h)} m (depth of the hole below the surface)`, 'P1 = P2 = P0 (both open to the air)', 'v1 = 0 m/s (top surface barely moves)', 'v2 = ?', '')
      .f('P1 + rho g y1 + 1/2rho v1^2 = P2 + rho g y2 + 1/2rho v2^2')
      .l('rho g h = 1/2rho v2^2 (P0 cancels, rho cancels)', `(${G9})(${g(h)} m) = 1/2v2^2`, `v2 = ${num(v)} m/s`)
      .n('Same speed as if the water fell freely through height h.')
      .done(`A large open tank has a small hole ${g(h)} m below the water surface. How fast does water shoot out of the hole?`, v, 'm/s');
  });

  add('fluids', 'Hydraulic lift', () => {
    const A1 = R(0.002, 0.02, 0.001), A2 = R(0.2, 1.5, 0.05), F2 = R(5000, 20000, 500);
    const F1 = r3((F2 * A1) / A2);
    return W()
      .l("Pascal's principle", `A1 = ${g(A1)} m^2 (small piston)`, `A2 = ${g(A2)} m^2 (big piston)`, `F2 = ${g(F2)} N (weight of the car)`, 'F1 = ?', '')
      .f('F1/A1 = F2/A2')
      .l(`F1/(${g(A1)} m^2) = (${g(F2)} N)/(${g(A2)} m^2)`, `F1 = ${num(F1)} N`)
      .n('The pressure is the same on both pistons, so a small force on a small piston lifts a big load.')
      .done(`A hydraulic lift has a small piston of area ${g(A1)} m^2 and a large piston of area ${g(A2)} m^2. What force on the small piston holds up a ${g(F2)} N car?`, F1, 'N');
  });
})();
