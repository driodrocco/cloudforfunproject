/* The AP Physics 1 and 2 equation sheets, plus a solver that works for any
 * unknown in any equation (numeric root finding, so no algebra per variable).
 *
 * Each equation: tpl uses {var} placeholders, f(v) returns left - right.
 * Variable spec: [name, unit, flags] where flags can include
 *   vec   - a vector component, so the solution shows its sign (+/-)
 *   pos   - must be positive (mass, time, distance...)
 *   ang   - an angle in degrees between 0 and 90 (or 180 with ang180)
 *   c=... - a constant that is filled in for you */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const sin = d => Math.sin((d * Math.PI) / 180);
  const cos = d => Math.cos((d * Math.PI) / 180);
  const PI = Math.PI;

  const V = {
    // shared variable definitions, reused across equations
    t: ['time', 's', 'pos'],
    m: ['mass', 'kg', 'pos'],
    a: ['acceleration', 'm/s^2', 'vec'],
    g: ['gravitational field', 'm/s^2', 'pos c=9.8'],
    G: ['universal gravitational constant', 'N m^2/kg^2', 'pos c=6.67e-11'],
    k9: ['Coulomb constant', 'N m^2/C^2', 'pos c=9.0e9'],
    eps0: ['vacuum permittivity', 'C^2/(N m^2)', 'pos c=8.85e-12'],
    u0: ['vacuum permeability', 'T m/A', 'pos c=1.26e-6'],
    h: ['Planck constant', 'J s', 'pos c=6.63e-34'],
    c: ['speed of light', 'm/s', 'pos c=3.0e8'],
    R8: ['gas constant', 'J/(mol K)', 'pos c=8.31'],
    kB: ['Boltzmann constant', 'J/K', 'pos c=1.38e-23'],
    theta: ['angle', 'degrees', 'ang'],
  };
  const v = (name, unit, flags = '') => [name, unit, flags];

  SW.EQUATIONS = [
    // ---- Unit 1: Kinematics ----
    { unit: 'kin', name: 'Constant velocity', tpl: '{v} = {x}/{t}', vars: { v: v('velocity', 'm/s', 'vec'), x: v('displacement', 'm', 'vec'), t: V.t }, f: q => q.v - q.x / q.t },
    { unit: 'kin', name: 'Velocity-time (horizontal)', tpl: '{Vx} = {V0x} + {a}{t}', vars: { Vx: v('final velocity', 'm/s', 'vec'), V0x: v('initial velocity', 'm/s', 'vec'), a: V.a, t: V.t }, f: q => q.Vx - (q.V0x + q.a * q.t) },
    { unit: 'kin', name: 'Displacement-time (horizontal)', tpl: '{x} = {V0x}{t} + 1/2{a}{t}^2', vars: { x: v('displacement', 'm', 'vec'), V0x: v('initial velocity', 'm/s', 'vec'), t: V.t, a: V.a }, f: q => q.x - (q.V0x * q.t + 0.5 * q.a * q.t ** 2) },
    { unit: 'kin', name: 'No-time equation (horizontal)', tpl: '{Vx}^2 = {V0x}^2 + 2{a}{x}', vars: { Vx: v('final velocity', 'm/s', 'vec'), V0x: v('initial velocity', 'm/s', 'vec'), a: V.a, x: v('displacement', 'm', 'vec') }, f: q => q.Vx ** 2 - (q.V0x ** 2 + 2 * q.a * q.x) },
    { unit: 'kin', name: 'Velocity-time (vertical)', tpl: '{Vy} = {V0y} + {a}{t}', vars: { Vy: v('final velocity', 'm/s', 'vec'), V0y: v('initial velocity', 'm/s', 'vec'), a: ['acceleration (+9.8 or -9.8 in freefall)', 'm/s^2', 'vec'], t: V.t }, f: q => q.Vy - (q.V0y + q.a * q.t) },
    { unit: 'kin', name: 'Displacement-time (vertical)', tpl: '{y} = {V0y}{t} + 1/2{a}{t}^2', vars: { y: v('displacement', 'm', 'vec'), V0y: v('initial velocity', 'm/s', 'vec'), t: V.t, a: ['acceleration (+9.8 or -9.8 in freefall)', 'm/s^2', 'vec'] }, f: q => q.y - (q.V0y * q.t + 0.5 * q.a * q.t ** 2) },
    { unit: 'kin', name: 'No-time equation (vertical)', tpl: '{Vy}^2 = {V0y}^2 + 2{a}{y}', vars: { Vy: v('final velocity', 'm/s', 'vec'), V0y: v('initial velocity', 'm/s', 'vec'), a: ['acceleration (+9.8 or -9.8 in freefall)', 'm/s^2', 'vec'], y: v('displacement', 'm', 'vec') }, f: q => q.Vy ** 2 - (q.V0y ** 2 + 2 * q.a * q.y) },

    // ---- Unit 2: Force and Translational Dynamics ----
    { unit: 'dyn', name: "Newton's 2nd law", tpl: '{Fnet} = {m}{a}', vars: { Fnet: v('net force', 'N', 'vec'), m: V.m, a: V.a }, f: q => q.Fnet - q.m * q.a },
    { unit: 'dyn', name: 'Weight', tpl: '{Fg} = {m}{g}', vars: { Fg: v('weight', 'N', 'pos'), m: V.m, g: V.g }, f: q => q.Fg - q.m * q.g },
    { unit: 'dyn', name: 'Friction', tpl: '{Ff} = {u}{Fn}', vars: { Ff: v('friction force', 'N', 'pos'), u: v('coefficient of friction', '', 'pos'), Fn: v('normal force', 'N', 'pos') }, f: q => q.Ff - q.u * q.Fn },
    { unit: 'dyn', name: "Hooke's law", tpl: '{Fs} = {k}{x}', vars: { Fs: v('spring force', 'N', 'pos'), k: v('spring constant', 'N/m', 'pos'), x: v('stretch or compression', 'm', 'pos') }, f: q => q.Fs - q.k * q.x },
    { unit: 'dyn', name: 'Universal gravitation', tpl: '{Fg} = {G}{m1}{m2}/{r}^2', vars: { Fg: v('gravitational force', 'N', 'pos'), G: V.G, m1: v('mass 1', 'kg', 'pos'), m2: v('mass 2', 'kg', 'pos'), r: v('center-to-center distance', 'm', 'pos') }, f: q => q.Fg - (q.G * q.m1 * q.m2) / q.r ** 2 },
    { unit: 'dyn', name: 'Gravitational field', tpl: '{g} = {G}{M}/{r}^2', vars: { g: v('gravitational field', 'm/s^2', 'pos'), G: V.G, M: v('planet mass', 'kg', 'pos'), r: v('distance from center', 'm', 'pos') }, f: q => q.g - (q.G * q.M) / q.r ** 2 },
    { unit: 'dyn', name: 'Centripetal acceleration', tpl: '{ac} = {v}^2/{r}', vars: { ac: v('centripetal acceleration', 'm/s^2', 'pos'), v: v('speed', 'm/s', 'pos'), r: v('radius', 'm', 'pos') }, f: q => q.ac - q.v ** 2 / q.r },
    { unit: 'dyn', name: 'Centripetal force', tpl: '{Fc} = {m}{v}^2/{r}', vars: { Fc: v('centripetal force', 'N', 'pos'), m: V.m, v: v('speed', 'm/s', 'pos'), r: v('radius', 'm', 'pos') }, f: q => q.Fc - (q.m * q.v ** 2) / q.r },
    { unit: 'dyn', name: 'Period of circular motion', tpl: '{T} = 2pi{r}/{v}', vars: { T: v('period', 's', 'pos'), r: v('radius', 'm', 'pos'), v: v('speed', 'm/s', 'pos') }, f: q => q.T - (2 * PI * q.r) / q.v },

    // ---- Unit 3: Work, Energy, and Power ----
    { unit: 'energy', name: 'Kinetic energy', tpl: '{K} = 1/2{m}{v}^2', vars: { K: v('kinetic energy', 'J', 'pos'), m: V.m, v: v('speed', 'm/s', 'pos') }, f: q => q.K - 0.5 * q.m * q.v ** 2 },
    { unit: 'energy', name: 'Gravitational potential energy', tpl: '{Ug} = {m}{g}{h}', vars: { Ug: v('potential energy', 'J'), m: V.m, g: V.g, h: v('height', 'm') }, f: q => q.Ug - q.m * q.g * q.h },
    { unit: 'energy', name: 'Spring potential energy', tpl: '{Us} = 1/2{k}{x}^2', vars: { Us: v('spring energy', 'J', 'pos'), k: v('spring constant', 'N/m', 'pos'), x: v('stretch or compression', 'm', 'pos') }, f: q => q.Us - 0.5 * q.k * q.x ** 2 },
    { unit: 'energy', name: 'Work', tpl: '{W} = {F}{d} cos({theta})', vars: { W: v('work', 'J'), F: v('force', 'N', 'pos'), d: v('distance moved', 'm', 'pos'), theta: ['angle between F and motion', 'degrees', 'ang180'] }, f: q => q.W - q.F * q.d * cos(q.theta) },
    { unit: 'energy', name: 'Power (work over time)', tpl: '{P} = {W}/{t}', vars: { P: v('power', 'W'), W: v('work or energy', 'J'), t: V.t }, f: q => q.P - q.W / q.t },
    { unit: 'energy', name: 'Power (force times velocity)', tpl: '{P} = {F}{v}', vars: { P: v('power', 'W'), F: v('force', 'N'), v: v('speed', 'm/s') }, f: q => q.P - q.F * q.v },
    { unit: 'energy', name: 'Energy conservation: drop from rest', tpl: '{m}{g}{h} = 1/2{m}{v}^2', vars: { m: V.m, g: V.g, h: v('height dropped', 'm', 'pos'), v: v('speed at the bottom', 'm/s', 'pos') }, f: q => q.m * q.g * q.h - 0.5 * q.m * q.v ** 2 },
    { unit: 'energy', name: 'Gravitational PE (far from Earth)', tpl: '{Ug} = -{G}{m1}{m2}/{r}', vars: { Ug: v('potential energy', 'J'), G: V.G, m1: v('mass 1', 'kg', 'pos'), m2: v('mass 2', 'kg', 'pos'), r: v('distance between centers', 'm', 'pos') }, f: q => q.Ug + (q.G * q.m1 * q.m2) / q.r },

    // ---- Unit 4: Linear Momentum ----
    { unit: 'mom', name: 'Momentum', tpl: '{p} = {m}{v}', vars: { p: v('momentum', 'kg m/s', 'vec'), m: V.m, v: v('velocity', 'm/s', 'vec') }, f: q => q.p - q.m * q.v },
    { unit: 'mom', name: 'Impulse (force and time)', tpl: '{J} = {F}{dt}', vars: { J: v('impulse', 'N s', 'vec'), F: v('average force', 'N', 'vec'), dt: v('contact time', 's', 'pos') }, f: q => q.J - q.F * q.dt },
    { unit: 'mom', name: 'Impulse-momentum', tpl: '{F}{dt} = {m}({v} - {v0})', vars: { F: v('average force', 'N', 'vec'), dt: v('contact time', 's', 'pos'), m: V.m, v: v('final velocity', 'm/s', 'vec'), v0: v('initial velocity', 'm/s', 'vec') }, f: q => q.F * q.dt - q.m * (q.v - q.v0) },
    { unit: 'mom', name: 'Collision (general)', tpl: '{m1}{v1} + {m2}{v2} = {m1}{v1f} + {m2}{v2f}', vars: { m1: v('mass 1', 'kg', 'pos'), v1: v('velocity 1 before', 'm/s', 'vec'), m2: v('mass 2', 'kg', 'pos'), v2: v('velocity 2 before', 'm/s', 'vec'), v1f: v('velocity 1 after', 'm/s', 'vec'), v2f: v('velocity 2 after', 'm/s', 'vec') }, f: q => q.m1 * q.v1 + q.m2 * q.v2 - (q.m1 * q.v1f + q.m2 * q.v2f) },
    { unit: 'mom', name: 'Collision (stick together)', tpl: '{m1}{v1} + {m2}{v2} = ({m1} + {m2}){vf}', vars: { m1: v('mass 1', 'kg', 'pos'), v1: v('velocity 1 before', 'm/s', 'vec'), m2: v('mass 2', 'kg', 'pos'), v2: v('velocity 2 before', 'm/s', 'vec'), vf: v('shared velocity after', 'm/s', 'vec') }, f: q => q.m1 * q.v1 + q.m2 * q.v2 - (q.m1 + q.m2) * q.vf },
    { unit: 'mom', name: 'Center of mass velocity', tpl: '{vcm} = ({m1}{v1} + {m2}{v2})/({m1} + {m2})', vars: { vcm: v('center of mass velocity', 'm/s', 'vec'), m1: v('mass 1', 'kg', 'pos'), v1: v('velocity 1', 'm/s', 'vec'), m2: v('mass 2', 'kg', 'pos'), v2: v('velocity 2', 'm/s', 'vec') }, f: q => q.vcm - (q.m1 * q.v1 + q.m2 * q.v2) / (q.m1 + q.m2) },

    // ---- Unit 5: Torque and Rotational Dynamics ----
    { unit: 'rot', name: 'Torque', tpl: '{tau} = {r}{F} sin({theta})', vars: { tau: v('torque', 'N m', 'pos'), r: v('lever arm distance', 'm', 'pos'), F: v('force', 'N', 'pos'), theta: ['angle between r and F', 'degrees', 'ang180'] }, f: q => q.tau - q.r * q.F * sin(q.theta) },
    { unit: 'rot', name: "Newton's 2nd law for rotation", tpl: '{tau} = {I}{alpha}', vars: { tau: v('net torque', 'N m', 'vec'), I: v('rotational inertia', 'kg m^2', 'pos'), alpha: v('angular acceleration', 'rad/s^2', 'vec') }, f: q => q.tau - q.I * q.alpha },
    { unit: 'rot', name: 'Angular velocity-time', tpl: '{omega} = {omega0} + {alpha}{t}', vars: { omega: v('final angular velocity', 'rad/s', 'vec'), omega0: v('initial angular velocity', 'rad/s', 'vec'), alpha: v('angular acceleration', 'rad/s^2', 'vec'), t: V.t }, f: q => q.omega - (q.omega0 + q.alpha * q.t) },
    { unit: 'rot', name: 'Angular displacement-time', tpl: '{theta} = {omega0}{t} + 1/2{alpha}{t}^2', vars: { theta: v('angular displacement', 'rad', 'vec'), omega0: v('initial angular velocity', 'rad/s', 'vec'), t: V.t, alpha: v('angular acceleration', 'rad/s^2', 'vec') }, f: q => q.theta - (q.omega0 * q.t + 0.5 * q.alpha * q.t ** 2) },
    { unit: 'rot', name: 'Angular no-time equation', tpl: '{omega}^2 = {omega0}^2 + 2{alpha}{theta}', vars: { omega: v('final angular velocity', 'rad/s', 'vec'), omega0: v('initial angular velocity', 'rad/s', 'vec'), alpha: v('angular acceleration', 'rad/s^2', 'vec'), theta: v('angular displacement', 'rad', 'vec') }, f: q => q.omega ** 2 - (q.omega0 ** 2 + 2 * q.alpha * q.theta) },
    { unit: 'rot', name: 'Linear and angular speed', tpl: '{v} = {r}{omega}', vars: { v: v('linear speed', 'm/s', 'pos'), r: v('radius', 'm', 'pos'), omega: v('angular speed', 'rad/s', 'pos') }, f: q => q.v - q.r * q.omega },
    { unit: 'rot', name: 'Tangential acceleration', tpl: '{at} = {r}{alpha}', vars: { at: v('tangential acceleration', 'm/s^2', 'vec'), r: v('radius', 'm', 'pos'), alpha: v('angular acceleration', 'rad/s^2', 'vec') }, f: q => q.at - q.r * q.alpha },
    { unit: 'rot', name: 'Arc length', tpl: '{s} = {r}{theta}', vars: { s: v('arc length', 'm', 'pos'), r: v('radius', 'm', 'pos'), theta: v('angle', 'rad', 'pos') }, f: q => q.s - q.r * q.theta },
    { unit: 'rot', name: 'Rotational inertia of a point mass', tpl: '{I} = {m}{r}^2', vars: { I: v('rotational inertia', 'kg m^2', 'pos'), m: V.m, r: v('distance from the axis', 'm', 'pos') }, f: q => q.I - q.m * q.r ** 2 },
    { unit: 'rot', name: 'Parallel axis theorem', tpl: '{I} = {Icm} + {M}{d}^2', vars: { I: v('new rotational inertia', 'kg m^2', 'pos'), Icm: v('inertia about center of mass', 'kg m^2', 'pos'), M: v('mass', 'kg', 'pos'), d: v('distance between axes', 'm', 'pos') }, f: q => q.I - (q.Icm + q.M * q.d ** 2) },

    // ---- Unit 6: Energy and Momentum of Rotating Systems ----
    { unit: 'rotE', name: 'Rotational kinetic energy', tpl: '{K} = 1/2{I}{omega}^2', vars: { K: v('rotational kinetic energy', 'J', 'pos'), I: v('rotational inertia', 'kg m^2', 'pos'), omega: v('angular speed', 'rad/s', 'pos') }, f: q => q.K - 0.5 * q.I * q.omega ** 2 },
    { unit: 'rotE', name: 'Angular momentum (rigid body)', tpl: '{L} = {I}{omega}', vars: { L: v('angular momentum', 'kg m^2/s', 'vec'), I: v('rotational inertia', 'kg m^2', 'pos'), omega: v('angular velocity', 'rad/s', 'vec') }, f: q => q.L - q.I * q.omega },
    { unit: 'rotE', name: 'Angular momentum (point mass)', tpl: '{L} = {m}{v}{r}', vars: { L: v('angular momentum', 'kg m^2/s', 'pos'), m: V.m, v: v('speed', 'm/s', 'pos'), r: v('distance', 'm', 'pos') }, f: q => q.L - q.m * q.v * q.r },
    { unit: 'rotE', name: 'Conservation of angular momentum', tpl: '{I1}{omega1} = {I2}{omega2}', vars: { I1: v('inertia before', 'kg m^2', 'pos'), omega1: v('angular speed before', 'rad/s', 'vec'), I2: v('inertia after', 'kg m^2', 'pos'), omega2: v('angular speed after', 'rad/s', 'vec') }, f: q => q.I1 * q.omega1 - q.I2 * q.omega2 },
    { unit: 'rotE', name: 'Angular impulse', tpl: '{tau}{dt} = {dL}', vars: { tau: v('torque', 'N m', 'vec'), dt: v('time', 's', 'pos'), dL: v('change in angular momentum', 'kg m^2/s', 'vec') }, f: q => q.tau * q.dt - q.dL },
    { unit: 'rotE', name: 'Rolling: rotational work', tpl: '{W} = {tau}{theta}', vars: { W: v('work', 'J'), tau: v('torque', 'N m'), theta: v('angle turned', 'rad') }, f: q => q.W - q.tau * q.theta },

    // ---- Unit 7: Oscillations ----
    { unit: 'osc', name: 'Period of a spring', tpl: '{T} = 2pi sqrt({m}/{k})', vars: { T: v('period', 's', 'pos'), m: V.m, k: v('spring constant', 'N/m', 'pos') }, f: q => q.T - 2 * PI * Math.sqrt(q.m / q.k) },
    { unit: 'osc', name: 'Period of a pendulum', tpl: '{T} = 2pi sqrt({L}/{g})', vars: { T: v('period', 's', 'pos'), L: v('length', 'm', 'pos'), g: V.g }, f: q => q.T - 2 * PI * Math.sqrt(q.L / q.g) },
    { unit: 'osc', name: 'Frequency and period', tpl: '{f} = 1/{T}', vars: { f: v('frequency', 'Hz', 'pos'), T: v('period', 's', 'pos') }, f: q => q.f - 1 / q.T },
    { unit: 'osc', name: 'Position in SHM', tpl: '{x} = {A} cos(2pi{f}{t})', vars: { x: v('position', 'm', 'vec'), A: v('amplitude', 'm', 'pos'), f: v('frequency', 'Hz', 'pos'), t: V.t }, f: q => q.x - q.A * Math.cos(2 * PI * q.f * q.t) },
    { unit: 'osc', name: 'Max speed of a spring oscillator', tpl: '1/2{k}{A}^2 = 1/2{m}{vmax}^2', vars: { k: v('spring constant', 'N/m', 'pos'), A: v('amplitude', 'm', 'pos'), m: V.m, vmax: v('maximum speed', 'm/s', 'pos') }, f: q => 0.5 * q.k * q.A ** 2 - 0.5 * q.m * q.vmax ** 2 },

    // ---- Unit 8: Fluids ----
    { unit: 'fluids', name: 'Density', tpl: '{rho} = {m}/{V}', vars: { rho: v('density', 'kg/m^3', 'pos'), m: V.m, V: v('volume', 'm^3', 'pos') }, f: q => q.rho - q.m / q.V },
    { unit: 'fluids', name: 'Pressure', tpl: '{P} = {F}/{A}', vars: { P: v('pressure', 'Pa', 'pos'), F: v('force', 'N', 'pos'), A: v('area', 'm^2', 'pos') }, f: q => q.P - q.F / q.A },
    { unit: 'fluids', name: 'Pressure at depth', tpl: '{P} = {P0} + {rho}{g}{h}', vars: { P: v('absolute pressure', 'Pa', 'pos'), P0: ['surface pressure', 'Pa', 'pos c=1.0e5'], rho: v('fluid density', 'kg/m^3', 'pos c=1000'), g: V.g, h: v('depth', 'm', 'pos') }, f: q => q.P - (q.P0 + q.rho * q.g * q.h) },
    { unit: 'fluids', name: 'Buoyant force', tpl: '{Fb} = {rho}{V}{g}', vars: { Fb: v('buoyant force', 'N', 'pos'), rho: v('fluid density', 'kg/m^3', 'pos c=1000'), V: v('submerged volume', 'm^3', 'pos'), g: V.g }, f: q => q.Fb - q.rho * q.V * q.g },
    { unit: 'fluids', name: 'Continuity', tpl: '{A1}{v1} = {A2}{v2}', vars: { A1: v('area 1', 'm^2', 'pos'), v1: v('speed 1', 'm/s', 'pos'), A2: v('area 2', 'm^2', 'pos'), v2: v('speed 2', 'm/s', 'pos') }, f: q => q.A1 * q.v1 - q.A2 * q.v2 },
    { unit: 'fluids', name: "Bernoulli's equation", tpl: '{P1} + {rho}{g}{y1} + 1/2{rho}{v1}^2 = {P2} + {rho}{g}{y2} + 1/2{rho}{v2}^2', vars: { P1: v('pressure 1', 'Pa', 'pos'), rho: v('fluid density', 'kg/m^3', 'pos c=1000'), g: V.g, y1: v('height 1', 'm'), v1: v('speed 1', 'm/s', 'pos'), P2: v('pressure 2', 'Pa', 'pos'), y2: v('height 2', 'm'), v2: v('speed 2', 'm/s', 'pos') }, f: q => q.P1 + q.rho * q.g * q.y1 + 0.5 * q.rho * q.v1 ** 2 - (q.P2 + q.rho * q.g * q.y2 + 0.5 * q.rho * q.v2 ** 2) },
    { unit: 'fluids', name: "Pascal's principle (hydraulic lift)", tpl: '{F1}/{A1} = {F2}/{A2}', vars: { F1: v('force 1', 'N', 'pos'), A1: v('area 1', 'm^2', 'pos'), F2: v('force 2', 'N', 'pos'), A2: v('area 2', 'm^2', 'pos') }, f: q => q.F1 / q.A1 - q.F2 / q.A2 },
    { unit: 'fluids', name: 'Volume flow rate', tpl: '{Q} = {A}{v}', vars: { Q: v('flow rate', 'm^3/s', 'pos'), A: v('area', 'm^2', 'pos'), v: v('speed', 'm/s', 'pos') }, f: q => q.Q - q.A * q.v },

    // ---- Unit 9: Thermodynamics ----
    { unit: 'thermo', name: 'Ideal gas law (moles)', tpl: '{P}{V} = {n}{R}{T}', vars: { P: v('pressure', 'Pa', 'pos'), V: v('volume', 'm^3', 'pos'), n: v('moles', 'mol', 'pos'), R: V.R8, T: v('temperature (Kelvin!)', 'K', 'pos') }, f: q => q.P * q.V - q.n * q.R * q.T },
    { unit: 'thermo', name: 'Ideal gas law (molecules)', tpl: '{P}{V} = {N}{kB}{T}', vars: { P: v('pressure', 'Pa', 'pos'), V: v('volume', 'm^3', 'pos'), N: v('number of molecules', '', 'pos'), kB: V.kB, T: v('temperature (Kelvin!)', 'K', 'pos') }, f: q => q.P * q.V - q.N * q.kB * q.T },
    { unit: 'thermo', name: 'Average kinetic energy of a molecule', tpl: '{K} = 3/2{kB}{T}', vars: { K: v('average kinetic energy', 'J', 'pos'), kB: V.kB, T: v('temperature (Kelvin!)', 'K', 'pos') }, f: q => q.K - 1.5 * q.kB * q.T },
    { unit: 'thermo', name: 'First law of thermodynamics', tpl: '{dU} = {Q} + {W}', vars: { dU: v('change in internal energy', 'J', 'vec'), Q: v('heat added (+) or removed (-)', 'J', 'vec'), W: v('work done ON the gas', 'J', 'vec') }, f: q => q.dU - (q.Q + q.W) },
    { unit: 'thermo', name: 'Work on a gas', tpl: '{W} = -{P}{dV}', vars: { W: v('work done ON the gas', 'J', 'vec'), P: v('pressure', 'Pa', 'pos'), dV: v('change in volume', 'm^3', 'vec') }, f: q => q.W + q.P * q.dV },
    { unit: 'thermo', name: 'Specific heat', tpl: '{Q} = {m}{c}{dT}', vars: { Q: v('heat', 'J', 'vec'), m: V.m, c: v('specific heat', 'J/(kg K)', 'pos c=4186'), dT: v('change in temperature', 'K', 'vec') }, f: q => q.Q - q.m * q.c * q.dT },
    { unit: 'thermo', name: 'Thermal conduction', tpl: '{H} = {k}{A}{dT}/{L}', vars: { H: v('heat flow rate Q/delta t', 'W', 'pos'), k: v('thermal conductivity', 'W/(m K)', 'pos'), A: v('area', 'm^2', 'pos'), dT: v('temperature difference', 'K', 'pos'), L: v('thickness', 'm', 'pos') }, f: q => q.H - (q.k * q.A * q.dT) / q.L },
    { unit: 'thermo', name: 'Combined gas law', tpl: '{P1}{V1}/{T1} = {P2}{V2}/{T2}', vars: { P1: v('pressure 1', 'Pa', 'pos'), V1: v('volume 1', 'm^3', 'pos'), T1: v('temperature 1 (Kelvin!)', 'K', 'pos'), P2: v('pressure 2', 'Pa', 'pos'), V2: v('volume 2', 'm^3', 'pos'), T2: v('temperature 2 (Kelvin!)', 'K', 'pos') }, f: q => (q.P1 * q.V1) / q.T1 - (q.P2 * q.V2) / q.T2 },

    // ---- Unit 10: Electric Force, Field, and Potential ----
    { unit: 'elec', name: "Coulomb's law", tpl: '{F} = {k}{q1}{q2}/{r}^2', vars: { F: v('electric force (+ repel, - attract)', 'N'), k: V.k9, q1: v('charge 1', 'C'), q2: v('charge 2', 'C'), r: v('distance', 'm', 'pos') }, f: q => q.F - (q.k * q.q1 * q.q2) / q.r ** 2 },
    { unit: 'elec', name: 'Electric field (force per charge)', tpl: '{E} = {F}/{q}', vars: { E: v('electric field', 'N/C'), F: v('electric force', 'N'), q: v('charge', 'C') }, f: q => q.E - q.F / q.q },
    { unit: 'elec', name: 'Electric field of a point charge', tpl: '{E} = {k}{q}/{r}^2', vars: { E: v('electric field', 'N/C', 'pos'), k: V.k9, q: v('charge (size)', 'C', 'pos'), r: v('distance', 'm', 'pos') }, f: q => q.E - (q.k * q.q) / q.r ** 2 },
    { unit: 'elec', name: 'Electric potential of a point charge', tpl: '{V} = {k}{q}/{r}', vars: { V: v('electric potential', 'V'), k: V.k9, q: v('charge', 'C'), r: v('distance', 'm', 'pos') }, f: q => q.V - (q.k * q.q) / q.r },
    { unit: 'elec', name: 'Electric potential energy (two charges)', tpl: '{U} = {k}{q1}{q2}/{r}', vars: { U: v('potential energy', 'J'), k: V.k9, q1: v('charge 1', 'C'), q2: v('charge 2', 'C'), r: v('distance', 'm', 'pos') }, f: q => q.U - (q.k * q.q1 * q.q2) / q.r },
    { unit: 'elec', name: 'Change in potential energy', tpl: '{dU} = {q}{dV}', vars: { dU: v('change in potential energy', 'J'), q: v('charge', 'C'), dV: v('potential difference', 'V') }, f: q => q.dU - q.q * q.dV },
    { unit: 'elec', name: 'Uniform field', tpl: '{E} = {dV}/{d}', vars: { E: v('electric field', 'V/m', 'pos'), dV: v('potential difference', 'V', 'pos'), d: v('distance', 'm', 'pos') }, f: q => q.E - q.dV / q.d },
    { unit: 'elec', name: 'Parallel-plate capacitance', tpl: '{C} = {kappa}{eps0}{A}/{d}', vars: { C: v('capacitance', 'F', 'pos'), kappa: v('dielectric constant (1 for air)', '', 'pos c=1'), eps0: V.eps0, A: v('plate area', 'm^2', 'pos'), d: v('plate separation', 'm', 'pos') }, f: q => q.C - (q.kappa * q.eps0 * q.A) / q.d },
    { unit: 'elec', name: 'Capacitor charge', tpl: '{Q} = {C}{dV}', vars: { Q: v('charge', 'C', 'pos'), C: v('capacitance', 'F', 'pos'), dV: v('voltage', 'V', 'pos') }, f: q => q.Q - q.C * q.dV },
    { unit: 'elec', name: 'Capacitor energy', tpl: '{Uc} = 1/2{C}{dV}^2', vars: { Uc: v('stored energy', 'J', 'pos'), C: v('capacitance', 'F', 'pos'), dV: v('voltage', 'V', 'pos') }, f: q => q.Uc - 0.5 * q.C * q.dV ** 2 },

    // ---- Unit 11: Electric Circuits ----
    { unit: 'circ', name: 'Current', tpl: '{I} = {dq}/{dt}', vars: { I: v('current', 'A', 'pos'), dq: v('charge passing', 'C', 'pos'), dt: v('time', 's', 'pos') }, f: q => q.I - q.dq / q.dt },
    { unit: 'circ', name: "Ohm's law", tpl: '{dV} = {I}{R}', vars: { dV: v('voltage', 'V', 'pos'), I: v('current', 'A', 'pos'), R: v('resistance', 'ohm', 'pos') }, f: q => q.dV - q.I * q.R },
    { unit: 'circ', name: 'Resistivity', tpl: '{R} = {rho}{L}/{A}', vars: { R: v('resistance', 'ohm', 'pos'), rho: v('resistivity', 'ohm m', 'pos'), L: v('length', 'm', 'pos'), A: v('cross-section area', 'm^2', 'pos') }, f: q => q.R - (q.rho * q.L) / q.A },
    { unit: 'circ', name: 'Power (current and voltage)', tpl: '{P} = {I}{dV}', vars: { P: v('power', 'W', 'pos'), I: v('current', 'A', 'pos'), dV: v('voltage', 'V', 'pos') }, f: q => q.P - q.I * q.dV },
    { unit: 'circ', name: 'Power (voltage and resistance)', tpl: '{P} = {dV}^2/{R}', vars: { P: v('power', 'W', 'pos'), dV: v('voltage', 'V', 'pos'), R: v('resistance', 'ohm', 'pos') }, f: q => q.P - q.dV ** 2 / q.R },
    { unit: 'circ', name: 'Power (current and resistance)', tpl: '{P} = {I}^2{R}', vars: { P: v('power', 'W', 'pos'), I: v('current', 'A', 'pos'), R: v('resistance', 'ohm', 'pos') }, f: q => q.P - q.I ** 2 * q.R },
    { unit: 'circ', name: 'Resistors in series (3)', tpl: '{Req} = {R1} + {R2} + {R3}', vars: { Req: v('equivalent resistance', 'ohm', 'pos'), R1: v('R1', 'ohm', 'pos'), R2: v('R2', 'ohm', 'pos'), R3: v('R3', 'ohm', 'pos') }, f: q => q.Req - (q.R1 + q.R2 + q.R3) },
    { unit: 'circ', name: 'Resistors in parallel (2)', tpl: '1/{Req} = 1/{R1} + 1/{R2}', vars: { Req: v('equivalent resistance', 'ohm', 'pos'), R1: v('R1', 'ohm', 'pos'), R2: v('R2', 'ohm', 'pos') }, f: q => 1 / q.Req - (1 / q.R1 + 1 / q.R2) },
    { unit: 'circ', name: 'Resistors in parallel (3)', tpl: '1/{Req} = 1/{R1} + 1/{R2} + 1/{R3}', vars: { Req: v('equivalent resistance', 'ohm', 'pos'), R1: v('R1', 'ohm', 'pos'), R2: v('R2', 'ohm', 'pos'), R3: v('R3', 'ohm', 'pos') }, f: q => 1 / q.Req - (1 / q.R1 + 1 / q.R2 + 1 / q.R3) },
    { unit: 'circ', name: 'Capacitors in parallel', tpl: '{Ceq} = {C1} + {C2}', vars: { Ceq: v('equivalent capacitance', 'F', 'pos'), C1: v('C1', 'F', 'pos'), C2: v('C2', 'F', 'pos') }, f: q => q.Ceq - (q.C1 + q.C2) },
    { unit: 'circ', name: 'Capacitors in series', tpl: '1/{Ceq} = 1/{C1} + 1/{C2}', vars: { Ceq: v('equivalent capacitance', 'F', 'pos'), C1: v('C1', 'F', 'pos'), C2: v('C2', 'F', 'pos') }, f: q => 1 / q.Ceq - (1 / q.C1 + 1 / q.C2) },

    // ---- Unit 12: Magnetism and Electromagnetism ----
    { unit: 'mag', name: 'Force on a moving charge', tpl: '{F} = {q}{v}{B} sin({theta})', vars: { F: v('magnetic force', 'N', 'pos'), q: v('charge (size)', 'C', 'pos'), v: v('speed', 'm/s', 'pos'), B: v('magnetic field', 'T', 'pos'), theta: ['angle between v and B', 'degrees', 'ang180'] }, f: q => q.F - q.q * q.v * q.B * sin(q.theta) },
    { unit: 'mag', name: 'Force on a current-carrying wire', tpl: '{F} = {I}{L}{B} sin({theta})', vars: { F: v('magnetic force', 'N', 'pos'), I: v('current', 'A', 'pos'), L: v('wire length', 'm', 'pos'), B: v('magnetic field', 'T', 'pos'), theta: ['angle between wire and B', 'degrees', 'ang180'] }, f: q => q.F - q.I * q.L * q.B * sin(q.theta) },
    { unit: 'mag', name: 'Field of a long straight wire', tpl: '{B} = {u0}{I}/(2pi{r})', vars: { B: v('magnetic field', 'T', 'pos'), u0: V.u0, I: v('current', 'A', 'pos'), r: v('distance from wire', 'm', 'pos') }, f: q => q.B - (q.u0 * q.I) / (2 * PI * q.r) },
    { unit: 'mag', name: 'Radius in a magnetic field', tpl: '{q}{v}{B} = {m}{v}^2/{r}', vars: { q: v('charge (size)', 'C', 'pos'), v: v('speed', 'm/s', 'pos'), B: v('magnetic field', 'T', 'pos'), m: V.m, r: v('radius', 'm', 'pos') }, f: q => q.q * q.v * q.B - (q.m * q.v ** 2) / q.r },
    { unit: 'mag', name: 'Magnetic flux', tpl: '{Phi} = {B}{A} cos({theta})', vars: { Phi: v('magnetic flux', 'T m^2'), B: v('magnetic field', 'T', 'pos'), A: v('area', 'm^2', 'pos'), theta: ['angle between B and the normal', 'degrees', 'ang180'] }, f: q => q.Phi - q.B * q.A * cos(q.theta) },
    { unit: 'mag', name: "Faraday's law", tpl: '{emf} = {N}{dPhi}/{dt}', vars: { emf: v('induced emf (size)', 'V', 'pos'), N: v('number of turns', '', 'pos c=1'), dPhi: v('change in flux', 'T m^2', 'pos'), dt: v('time', 's', 'pos') }, f: q => q.emf - (q.N * q.dPhi) / q.dt },
    { unit: 'mag', name: 'Motional emf', tpl: '{emf} = {B}{L}{v}', vars: { emf: v('induced emf', 'V', 'pos'), B: v('magnetic field', 'T', 'pos'), L: v('rod length', 'm', 'pos'), v: v('speed', 'm/s', 'pos') }, f: q => q.emf - q.B * q.L * q.v },

    // ---- Unit 13: Geometric Optics ----
    { unit: 'optics', name: 'Index of refraction', tpl: '{n} = {c}/{v}', vars: { n: v('index of refraction', '', 'pos'), c: V.c, v: v('speed of light in the material', 'm/s', 'pos') }, f: q => q.n - q.c / q.v },
    { unit: 'optics', name: "Snell's law", tpl: '{n1} sin({theta1}) = {n2} sin({theta2})', vars: { n1: v('index 1', '', 'pos'), theta1: ['angle 1 (from the normal)', 'degrees', 'ang'], n2: v('index 2', '', 'pos'), theta2: ['angle 2 (from the normal)', 'degrees', 'ang'] }, f: q => q.n1 * sin(q.theta1) - q.n2 * sin(q.theta2) },
    { unit: 'optics', name: 'Critical angle', tpl: 'sin({thetac}) = {n2}/{n1}', vars: { thetac: ['critical angle', 'degrees', 'ang'], n2: v('outside index (smaller)', '', 'pos'), n1: v('inside index (bigger)', '', 'pos') }, f: q => sin(q.thetac) - q.n2 / q.n1 },
    { unit: 'optics', name: 'Thin lens / mirror equation', tpl: '1/{f} = 1/{do} + 1/{di}', vars: { f: v('focal length', 'cm', 'vec'), do: v('object distance', 'cm', 'pos'), di: v('image distance', 'cm', 'vec') }, f: q => 1 / q.f - (1 / q.do + 1 / q.di) },
    { unit: 'optics', name: 'Magnification (heights)', tpl: '{M} = {hi}/{ho}', vars: { M: v('magnification', '', 'vec'), hi: v('image height', 'cm', 'vec'), ho: v('object height', 'cm', 'pos') }, f: q => q.M - q.hi / q.ho },
    { unit: 'optics', name: 'Magnification (distances)', tpl: '{M} = -{di}/{do}', vars: { M: v('magnification', '', 'vec'), di: v('image distance', 'cm', 'vec'), do: v('object distance', 'cm', 'pos') }, f: q => q.M + q.di / q.do },
    { unit: 'optics', name: 'Focal length of a mirror', tpl: '{f} = {R}/2', vars: { f: v('focal length', 'cm', 'vec'), R: v('radius of curvature', 'cm', 'vec') }, f: q => q.f - q.R / 2 },

    // ---- Unit 14: Waves, Sound, and Physical Optics ----
    { unit: 'waves', name: 'Wave equation', tpl: '{v} = {f}{lambda}', vars: { v: v('wave speed', 'm/s', 'pos'), f: v('frequency', 'Hz', 'pos'), lambda: v('wavelength', 'm', 'pos') }, f: q => q.v - q.f * q.lambda },
    { unit: 'waves', name: 'Period and frequency', tpl: '{T} = 1/{f}', vars: { T: v('period', 's', 'pos'), f: v('frequency', 'Hz', 'pos') }, f: q => q.T - 1 / q.f },
    { unit: 'waves', name: 'Wave speed on a string', tpl: '{v} = sqrt({FT}/{mu})', vars: { v: v('wave speed', 'm/s', 'pos'), FT: v('tension', 'N', 'pos'), mu: v('mass per length', 'kg/m', 'pos') }, f: q => q.v - Math.sqrt(q.FT / q.mu) },
    { unit: 'waves', name: 'String or open pipe harmonics', tpl: '{fn} = {n}{v}/(2{L})', vars: { fn: v('frequency', 'Hz', 'pos'), n: v('harmonic number (1, 2, 3...)', '', 'pos c=1'), v: v('wave speed', 'm/s', 'pos'), L: v('length', 'm', 'pos') }, f: q => q.fn - (q.n * q.v) / (2 * q.L) },
    { unit: 'waves', name: 'Closed pipe harmonics', tpl: '{fn} = {n}{v}/(4{L})', vars: { fn: v('frequency', 'Hz', 'pos'), n: v('harmonic number (1, 3, 5...)', '', 'pos c=1'), v: v('wave speed', 'm/s', 'pos c=343'), L: v('length', 'm', 'pos') }, f: q => q.fn - (q.n * q.v) / (4 * q.L) },
    { unit: 'waves', name: 'Double slit / grating', tpl: '{d} sin({theta}) = {m}{lambda}', vars: { d: v('slit spacing', 'm', 'pos'), theta: ['angle', 'degrees', 'ang'], m: v('order (0, 1, 2...)', '', 'pos c=1'), lambda: v('wavelength', 'm', 'pos') }, f: q => q.d * sin(q.theta) - q.m * q.lambda },
    { unit: 'waves', name: 'Fringe position (small angle)', tpl: '{y} = {m}{lambda}{L}/{d}', vars: { y: v('distance from center', 'm', 'pos'), m: v('order', '', 'pos c=1'), lambda: v('wavelength', 'm', 'pos'), L: v('distance to screen', 'm', 'pos'), d: v('slit spacing', 'm', 'pos') }, f: q => q.y - (q.m * q.lambda * q.L) / q.d },
    { unit: 'waves', name: 'Beat frequency', tpl: '{fbeat} = {f1} - {f2}', vars: { fbeat: v('beat frequency', 'Hz', 'pos'), f1: v('higher frequency', 'Hz', 'pos'), f2: v('lower frequency', 'Hz', 'pos') }, f: q => q.fbeat - (q.f1 - q.f2) },

    // ---- Unit 15: Modern Physics ----
    { unit: 'modern', name: 'Photon energy (frequency)', tpl: '{E} = {h}{f}', vars: { E: v('photon energy', 'J', 'pos'), h: V.h, f: v('frequency', 'Hz', 'pos') }, f: q => q.E - q.h * q.f },
    { unit: 'modern', name: 'Photon energy (wavelength, eV)', tpl: '{E} = {hc}/{lambda}', vars: { E: v('photon energy', 'eV', 'pos'), hc: ['hc', 'eV nm', 'pos c=1240'], lambda: v('wavelength', 'nm', 'pos') }, f: q => q.E - q.hc / q.lambda },
    { unit: 'modern', name: 'Photoelectric effect', tpl: '{Kmax} = {h}{f} - {phi}', vars: { Kmax: v('max kinetic energy', 'eV'), h: ['Planck constant', 'eV s', 'pos c=4.14e-15'], f: v('frequency', 'Hz', 'pos'), phi: v('work function', 'eV', 'pos') }, f: q => q.Kmax - (q.h * q.f - q.phi) },
    { unit: 'modern', name: 'de Broglie wavelength', tpl: '{lambda} = {h}/({m}{v})', vars: { lambda: v('wavelength', 'm', 'pos'), h: V.h, m: V.m, v: v('speed', 'm/s', 'pos') }, f: q => q.lambda - q.h / (q.m * q.v) },
    { unit: 'modern', name: 'Mass-energy', tpl: '{E} = {m}{c}^2', vars: { E: v('energy', 'J', 'pos'), m: V.m, c: V.c }, f: q => q.E - q.m * q.c ** 2 },
    { unit: 'modern', name: 'Half-life', tpl: '{N} = {N0}(1/2)^({t}/{T})', vars: { N: v('amount left', '', 'pos'), N0: v('starting amount', '', 'pos'), t: v('time', 's', 'pos'), T: v('half-life (same units as t)', 's', 'pos') }, f: q => q.N - q.N0 * 0.5 ** (q.t / q.T) },
  ];

  // ---------- solving ----------

  function flags(spec) {
    const s = spec[2] || '';
    const c = s.match(/c=([-\d.e+]+)/);
    return { vec: /\bvec\b/.test(s), pos: /\bpos\b/.test(s), ang: /\bang/.test(s), ang180: /ang180/.test(s), c: c ? Number(c[1]) : null };
  }
  SW.varFlags = flags;

  // Finds every root of f(x) = 0. Scans a log grid on both signs (or 0-90/180 degrees
  // for angles), then refines each sign change by bisection and rejects poles.
  function roots(fx, opt) {
    const grid = [];
    if (opt.ang) {
      const hi = opt.ang180 ? 180 : 90;
      for (let d = 0; d <= hi; d += 0.25) grid.push(d);
    } else {
      const mags = [];
      for (let e = -45; e <= 45; e += 0.02) mags.push(10 ** e);
      if (!opt.pos) for (let i = mags.length - 1; i >= 0; i--) grid.push(-mags[i]);
      if (!opt.pos) grid.push(0);
      grid.push(...mags);
    }
    const out = [];
    const ys = grid.map(fx);
    for (let i = 0; i < grid.length; i++) {
      if (ys[i] === 0) { out.push(grid[i]); continue; }
      if (i === 0 || !Number.isFinite(ys[i - 1]) || !Number.isFinite(ys[i])) continue;
      if (ys[i - 1] === 0 || Math.sign(ys[i - 1]) === Math.sign(ys[i])) continue;
      let a = grid[i - 1], b = grid[i], fa = ys[i - 1];
      for (let k = 0; k < 200; k++) {
        const m = (a + b) / 2, fm = fx(m);
        if (fm === 0 || m === a || m === b) { a = b = m; break; }
        if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else b = m;
      }
      const x = (a + b) / 2, fxv = Math.abs(fx(x));
      if (fxv <= 1e-6 * Math.max(Math.abs(ys[i - 1]), Math.abs(ys[i]))) out.push(x); // not a pole
    }
    return out
      .filter(x => x === 0 || Math.abs(x) > 1e-40) // edge of the search range, not a real answer
      .filter((x, i, arr) => i === 0 || Math.abs(x - arr[i - 1]) > 1e-9 * Math.max(1, Math.abs(x)));
  }

  // known: { var: number }, unknown: var name. Returns { roots: [...], lines: [...] }.
  SW.solveEquation = function (eq, known, unknown) {
    const spec = eq.vars[unknown], fl = flags(spec);
    const fx = x => {
      const v = eq.f({ ...known, [unknown]: x });
      return Number.isFinite(v) ? v : NaN;
    };
    let exact = roots(fx, fl);
    // Repeating equations (cos, sin) have endless answers: keep the first one.
    const repeats = exact.length > 3;
    if (repeats) exact = [exact.filter(x => x > 0)[0] ?? exact[0]];
    const rs = exact.map(x => SW.r3(x));
    const lines = SW.writeSolution(eq, known, unknown, rs);
    if (repeats) lines.push(`(This one repeats, so there are more answers. This is the smallest positive one.)`);
    return { roots: rs, exact, repeats, lines };
  };

  // Formats the worked solution in the class format.
  SW.writeSolution = function (eq, known, unknown, rs) {
    const { g, num, sg, sgv } = SW;
    const fmtVal = (name, x, answer) => {
      const fl = flags(eq.vars[name]);
      const s = answer ? (fl.vec ? sg(x) : num(x)) : fl.vec ? sgv(x) : g(x);
      const unit = eq.vars[name][1];
      return unit ? `${s} ${unit}` : s;
    };
    const lines = [eq.name];
    for (const name of Object.keys(eq.vars)) {
      if (name === unknown) continue;
      lines.push(`${name} = ${fmtVal(name, known[name])}`);
    }
    lines.push(`${unknown} = ?`, '');
    lines.push(eq.tpl.replace(/\{(\w+)\}/g, '$1'));
    lines.push(
      eq.tpl.replace(/(\()?\{(\w+)\}(\))?/g, (all, open, name, close) => {
        if (name === unknown) return (open || '') + name + (close || '');
        const val = fmtVal(name, known[name]);
        return open && close ? `(${val})` : `${open || ''}(${val})${close || ''}`;
      })
    );
    if (!rs.length) lines.push(`No real answer for ${unknown}. Check your givens and signs.`);
    else lines.push(rs.map(x => `${unknown} = ${fmtVal(unknown, x, true)}`).join('  or  '));
    return lines;
  };
})();
