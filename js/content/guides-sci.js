/* Study guides, batch 1: AP Physics 2, AP Physics C (Mechanics, E and M),
 * AP Chemistry, AP Biology, AP Environmental Science. */
(function () {
  'use strict';
  const SW = globalThis.SW;

  // ======================= AP PHYSICS 2 =======================
  SW.guides('phys2', {
    thermo: {
      big: ['Temperature measures the average kinetic energy of particles; heat is energy transferred because of a temperature difference.', 'Ideal gases follow PV = nRT; pressure comes from particle collisions with the walls.', 'The first law of thermodynamics is conservation of energy: delta U = Q + W (W = work done ON the gas).', 'The second law: entropy of an isolated system never decreases; heat flows from hot to cold on its own.'],
      terms: [['Internal energy (U)', 'Total kinetic energy of the gas particles; depends only on temperature for an ideal gas.'], ['Isothermal', 'Constant temperature: delta U = 0, so Q = -W.'], ['Isobaric', 'Constant pressure: W = -P(delta V).'], ['Isochoric (isovolumetric)', 'Constant volume: W = 0, so delta U = Q.'], ['Adiabatic', 'No heat transfer: Q = 0, so delta U = W.'], ['Conduction', 'Heat transfer through contact; rate depends on k, area, temperature difference and thickness.'], ['Entropy', 'A measure of disorder or the number of possible arrangements.'], ['Thermal equilibrium', 'Objects at the same temperature; no net heat flow.']],
      knowTitle: 'Equations', know: ['PV = nRT = NkBT', 'K(avg) = 3/2 kBT', 'delta U = Q + W  (W on the gas = -P(delta V))', 'Work done BY the gas = area under the P-V curve', 'Rate of conduction: Q/(delta t) = kA(delta T)/L'],
      mistakes: ['Sign of work: in the AP convention, W is work done ON the gas, so expansion gives negative W.', 'Using Celsius in PV = nRT. Always use kelvins.'],
      tips: ['On a P-V cycle, net work = area enclosed; clockwise means net work done by the gas is positive.'],
    },
    elec: {
      big: ['Charge is conserved and quantized; like charges repel, unlike attract.', 'Coulomb\'s law gives the force between point charges; it is an inverse-square law like gravity.', 'The electric field is force per unit charge; potential is energy per unit charge.', 'Field lines point from high to low potential and are perpendicular to equipotential lines.'],
      terms: [['Conductor / insulator', 'Charges move freely / charges stay in place.'], ['Charging by induction', 'Using a nearby charge to separate charges, then grounding.'], ['Electric field (E)', 'Force per unit positive charge, N/C or V/m.'], ['Electric potential (V)', 'Potential energy per unit charge, volts.'], ['Equipotential line', 'All points at the same potential; no work to move along it.'], ['Electric dipole', 'Equal and opposite charges separated by a distance.']],
      knowTitle: 'Equations', know: ['F = k q1 q2 / r^2   (k = 9.0 x 10^9 N m^2/C^2)', 'E = F/q;  point charge: E = kq/r^2', 'Uniform field between plates: E = (delta V)/d', 'U = k q1 q2 / r;  V = kq/r', 'delta U = q(delta V)'],
      mistakes: ['Forgetting that field and potential from several charges add differently: fields as vectors, potentials as numbers (with sign).', 'Thinking a positive charge moves toward higher potential. It moves toward lower potential.'],
      tips: ['Draw field vectors from each charge at the point, then add components.'],
    },
    circ: {
      big: ['Current is the rate of flow of charge; resistors convert electrical energy into thermal energy.', 'Kirchhoff\'s junction rule (charge conservation) and loop rule (energy conservation) analyze any circuit.', 'Series resistors share current; parallel resistors share voltage.', 'Capacitors store charge and energy; in steady state no current flows through a capacitor\'s branch.'],
      terms: [['Current (I)', 'Charge per time, amperes.'], ['Resistance (R)', 'Opposition to current, ohms.'], ['Resistivity (rho)', 'Material property; R = rho L / A.'], ['EMF', 'Energy per charge supplied by a battery.'], ['Internal resistance', 'Resistance inside a battery that lowers terminal voltage.'], ['Equivalent resistance', 'Single resistance that could replace a network.'], ['Capacitance', 'C = Q/(delta V); charge stored per volt.'], ['Time constant', 'tau = RC; time to charge to about 63 percent.']],
      knowTitle: 'Equations', know: ['I = (delta q)/(delta t);  delta V = IR', 'P = I(delta V) = I^2 R = (delta V)^2 / R', 'Series: Req = R1 + R2 + ...;  parallel: 1/Req = 1/R1 + 1/R2 + ...', 'Capacitors: parallel add directly; series add as reciprocals', 'C = kappa epsilon0 A/d;  U = 1/2 Q(delta V) = 1/2 C(delta V)^2'],
      mistakes: ['Thinking current is "used up" by resistors. Current is the same everywhere in a series path.', 'Adding capacitors like resistors (the rules are reversed).'],
      tips: ['For brightness questions, compare the power in each bulb.'],
    },
    mag: {
      big: ['Moving charges and currents create magnetic fields and feel magnetic forces.', 'The magnetic force is perpendicular to both velocity and field, so it changes direction, not speed.', 'A changing magnetic flux induces an EMF (Faraday\'s law); the induced current opposes the change (Lenz\'s law).'],
      terms: [['Magnetic field (B)', 'Measured in teslas.'], ['Right-hand rule', 'Finds the direction of force on a positive charge or of a field around a wire.'], ['Magnetic flux', 'Phi = BA cos(theta).'], ['Faraday\'s law', 'EMF = -delta(Phi)/delta t.'], ['Lenz\'s law', 'Induced current opposes the change in flux.'], ['Motional EMF', 'EMF = BLv for a rod moving through a field.']],
      knowTitle: 'Equations', know: ['F = qvB sin(theta)', 'F = ILB sin(theta) on a current-carrying wire', 'Field near a long wire: B = mu0 I / (2 pi r)', 'Phi = BA cos(theta);  EMF = -N delta(Phi)/delta t', 'Charged particle in a uniform field moves in a circle: r = mv/(qB)'],
      mistakes: ['Using the right-hand rule for a negative charge without reversing the result.', 'Saying a magnetic force does work on a charge. It does not change its speed.'],
      tips: ['For Lenz\'s law: decide whether flux is increasing or decreasing, then make the induced field oppose that change.'],
    },
    optics: {
      big: ['Light reflects with equal angles and refracts (bends) when its speed changes between materials.', 'Lenses and curved mirrors form real or virtual images described by the same equation.', 'Total internal reflection happens when light goes from a slower to a faster medium beyond the critical angle.'],
      terms: [['Index of refraction', 'n = c/v.'], ['Snell\'s law', 'n1 sin(theta1) = n2 sin(theta2).'], ['Critical angle', 'sin(theta c) = n2/n1 (n1 > n2).'], ['Real / virtual image', 'Light actually converges (can be projected) / only appears to come from it.'], ['Converging / diverging', 'Convex lens or concave mirror / concave lens or convex mirror.'], ['Focal length', 'Distance from lens or mirror to the focal point.']],
      knowTitle: 'Equations', know: ['1/si + 1/so = 1/f', 'M = hi/ho = -si/so', 'Mirror: f = R/2', 'Sign rules: positive si = real image; negative f = diverging'],
      mistakes: ['Thinking light bends away from the normal entering glass. It bends toward the normal when slowing down.', 'Forgetting the negative sign in magnification (negative = inverted).'],
      tips: ['Always sketch a ray diagram to check the sign and size of your answer.'],
    },
    waves: {
      big: ['Waves transfer energy without transferring matter.', 'Wave speed depends on the medium; frequency is set by the source.', 'Superposition causes interference; standing waves form at specific frequencies.', 'Light behaves as a wave in interference and diffraction.'],
      terms: [['Transverse / longitudinal', 'Displacement perpendicular / parallel to the direction of travel.'], ['Wavelength / frequency', 'Distance between crests / waves per second.'], ['Constructive / destructive interference', 'Path difference of whole wavelengths / half wavelengths.'], ['Standing wave', 'Interference pattern with nodes and antinodes.'], ['Doppler effect', 'Observed frequency rises as source and observer approach.'], ['Diffraction', 'Bending of waves around obstacles or through openings.'], ['Thin film interference', 'Reflections from two surfaces interfere; can involve phase shifts.']],
      knowTitle: 'Equations', know: ['v = f lambda', 'Double slit bright fringes: d sin(theta) = m lambda', 'String fixed at both ends: lambda = 2L/n', 'Open-open pipe: lambda = 2L/n;  open-closed pipe: lambda = 4L/n (odd n only)'],
      mistakes: ['Thinking frequency changes when a wave enters a new medium. Speed and wavelength change; frequency stays.'],
      tips: ['Draw the standing wave pattern and count wavelengths in the length L.'],
    },
    modern: {
      big: ['Light also behaves as particles (photons) with energy proportional to frequency.', 'The photoelectric effect shows electrons absorb single photons; intensity does not change maximum kinetic energy.', 'Atoms have discrete energy levels; transitions emit or absorb photons of specific energies.', 'Nuclear reactions conserve charge and nucleon number; mass converts to energy.'],
      terms: [['Photon', 'A particle of light with E = hf.'], ['Work function', 'Minimum energy to remove an electron from a metal.'], ['Threshold frequency', 'Lowest frequency that ejects electrons.'], ['de Broglie wavelength', 'lambda = h/p for any moving particle.'], ['Half-life', 'Time for half of a radioactive sample to decay.'], ['Alpha / beta / gamma decay', 'Helium nucleus / electron or positron / high-energy photon.']],
      knowTitle: 'Equations', know: ['E = hf = hc/lambda', 'Kmax = hf - phi', 'lambda = h/p', 'E = mc^2 (mass defect to energy)', 'h = 6.63 x 10^-34 J s = 4.14 x 10^-15 eV s'],
      mistakes: ['Saying brighter light gives electrons more energy. It gives more electrons.', 'Forgetting to balance both charge and mass number in decay equations.'],
      tips: ['For energy-level diagrams, the photon energy equals the difference between levels.'],
    },
  });

  // ======================= AP PHYSICS C: MECHANICS =======================
  SW.guides('physcm', {
    kin: {
      big: ['Velocity is the derivative of position; acceleration is the derivative of velocity.', 'Integrals reverse this: displacement is the integral of velocity, change in velocity the integral of acceleration.', 'Constant-acceleration equations are special cases; when acceleration varies with time, use calculus.', 'Projectile and relative motion problems split into independent components.'],
      terms: [['v(t) = dx/dt', 'Instantaneous velocity.'], ['a(t) = dv/dt = d^2x/dt^2', 'Instantaneous acceleration.'], ['Displacement', 'Integral of v dt.'], ['Chain rule trick', 'a = v dv/dx when acceleration depends on position.']],
      knowTitle: 'Equations', know: ['v = v0 + at;  x = x0 + v0t + 1/2at^2;  v^2 = v0^2 + 2a(x - x0)  (constant a only)', 'x(t) = x0 + integral of v(t) dt', 'v(t) = v0 + integral of a(t) dt'],
      mistakes: ['Using constant-acceleration equations when a depends on t or x.', 'Forgetting the initial condition (constant of integration).'],
      tips: ['If a = f(v), separate variables: dv/f(v) = dt.'],
    },
    dyn: {
      big: ['Newton\'s laws with calculus: Fnet = ma = m dv/dt.', 'Drag forces that depend on velocity lead to terminal velocity and exponential approach.', 'Circular motion requires a net inward force mv^2/r.', 'Gravity follows the universal law; orbits balance gravity and centripetal acceleration.'],
      terms: [['Terminal velocity', 'Speed where drag equals weight; acceleration is zero.'], ['Linear drag', 'F = -bv; gives v(t) = vT(1 - e^(-t/tau)).'], ['Banked curve', 'The normal force has a horizontal component toward the center.'], ['Apparent weight', 'The normal force felt in an accelerating frame.']],
      knowTitle: 'Equations', know: ['Fnet = ma = dp/dt', 'Drag -bv: vT = mg/b, tau = m/b', 'Fg = GMm/r^2;  orbital speed v = sqrt(GM/r)', 'Friction: fk = mu_k N; fs <= mu_s N'],
      mistakes: ['Dropping the direction of drag (it always opposes velocity).', 'Assuming N = mg on banked curves.'],
      tips: ['Write the differential equation first (m dv/dt = mg - bv), then solve by separation.'],
    },
    energy: {
      big: ['Work is the integral of force over displacement; for variable forces use W = integral of F dx.', 'Conservative forces have potential energy with F = -dU/dx.', 'Energy diagrams show turning points and equilibrium (stable at U minima).', 'Power is dW/dt = F v.'],
      terms: [['W = integral F dx', 'Work by a variable force.'], ['F = -dU/dx', 'Force from a potential energy function.'], ['Stable / unstable equilibrium', 'Minimum / maximum of U(x).'], ['Turning point', 'Where total energy equals U, so K = 0.']],
      knowTitle: 'Equations', know: ['K = 1/2mv^2;  Wnet = delta K', 'Spring: U = 1/2kx^2;  gravity (far): U = -GMm/r', 'P = dW/dt = F v', 'Escape speed: sqrt(2GM/R)'],
      mistakes: ['Forgetting the negative sign in F = -dU/dx.', 'Using mgh far from Earth instead of -GMm/r.'],
      tips: ['On U(x) graphs, the force points downhill on the graph.'],
    },
    mom: {
      big: ['Impulse is the integral of force over time and equals the change in momentum.', 'Momentum is conserved when net external force is zero.', 'The center of mass moves as if all external forces act on the total mass.'],
      terms: [['Impulse', 'J = integral of F dt = delta p.'], ['Center of mass', 'xcm = sum(m x)/M, or integral of x dm / M for continuous objects.'], ['Elastic collision', 'Both momentum and kinetic energy conserved.']],
      knowTitle: 'Equations', know: ['p = mv;  F = dp/dt', 'J = integral of F dt', 'xcm = (1/M) integral of x dm;  for a rod with lambda(x): dm = lambda dx'],
      mistakes: ['Not setting up dm correctly for non-uniform objects.'],
      tips: ['For a rod with variable density, write dm = lambda(x) dx before integrating.'],
    },
    rot: {
      big: ['Rotational inertia is found by integration: I = integral of r^2 dm.', 'Net torque equals I alpha; torque is a cross product r x F.', 'Static equilibrium needs zero net force and zero net torque.'],
      terms: [['I = integral r^2 dm', 'Moment of inertia for continuous objects.'], ['Parallel axis theorem', 'I = Icm + Md^2.'], ['Torque', 'tau = r x F, magnitude rF sin(theta).']],
      knowTitle: 'Common moments of inertia', know: ['Rod about center: 1/12 ML^2;  about end: 1/3 ML^2', 'Hoop: MR^2;  solid disk: 1/2 MR^2;  solid sphere: 2/5 MR^2', 'tau_net = I alpha;  angular kinematics mirror linear kinematics'],
      mistakes: ['Using I for the wrong axis without the parallel axis theorem.'],
      tips: ['For pulleys with mass, include the pulley\'s I alpha = (T1 - T2)R.'],
    },
    rotE: {
      big: ['Rolling objects share energy between translation and rotation.', 'Angular momentum L = r x p is conserved when external torque is zero.', 'Collisions with rotating objects conserve angular momentum about the pivot, not linear momentum (the pivot exerts a force).'],
      terms: [['Angular momentum', 'L = I omega (rigid body); L = r x p (particle).'], ['Rolling without slipping', 'v = R omega, a = R alpha.'], ['Angular impulse', 'integral of tau dt = delta L.']],
      knowTitle: 'Equations', know: ['K = 1/2 Mv^2 + 1/2 I omega^2 for rolling', 'L = I omega;  tau = dL/dt', 'Particle hitting a rod: m v r = (I_rod + m r^2) omega'],
      mistakes: ['Conserving linear momentum when a pivot is present.'],
      tips: ['Choose the pivot as your axis so its force produces no torque.'],
    },
    osc: {
      big: ['SHM comes from a restoring force proportional to displacement: d^2x/dt^2 = -omega^2 x.', 'The solution is x(t) = A cos(omega t + phi).', 'Physical pendulums use the rotational version with I.'],
      terms: [['Angular frequency', 'omega = 2 pi f = 2 pi / T.'], ['Phase constant', 'phi sets the starting point of the motion.'], ['Physical pendulum', 'T = 2 pi sqrt(I/(m g d)).']],
      knowTitle: 'Equations', know: ['Spring: omega = sqrt(k/m), T = 2 pi sqrt(m/k)', 'Simple pendulum: T = 2 pi sqrt(L/g)', 'vmax = A omega;  amax = A omega^2', 'E = 1/2kA^2'],
      mistakes: ['Confusing f (Hz) and omega (rad/s).'],
      tips: ['If you can write the equation as x\'\' = -(constant)x, the constant is omega^2.'],
    },
  });

  // ======================= AP PHYSICS C: E AND M =======================
  SW.guides('physce', {
    em1: {
      big: ['Electric fields from continuous charge distributions are found by integrating dE from each dq.', 'Gauss\'s law relates the flux through a closed surface to the charge enclosed; it is easiest with symmetry.', 'Inside a conductor in equilibrium, E = 0 and excess charge sits on the surface.'],
      terms: [['Linear / surface / volume charge density', 'lambda = Q/L, sigma = Q/A, rho = Q/V.'], ['Electric flux', 'Phi = integral of E dA.'], ['Gaussian surface', 'An imagined closed surface chosen to match the symmetry.']],
      knowTitle: 'Equations', know: ['dE = k dq / r^2', 'Gauss: closed integral of E dA = Qenc/epsilon0', 'Line charge: E = lambda/(2 pi epsilon0 r);  plane: E = sigma/(2 epsilon0)', 'Sphere outside: E = kQ/r^2'],
      mistakes: ['Using Gauss\'s law on a shape without enough symmetry.', 'Forgetting that only the enclosed charge counts.'],
      tips: ['For spheres with charge spread through the volume, find Qenc as a fraction of the total volume (or integrate rho).'],
    },
    em2: {
      big: ['Electric potential is the work per unit charge; V = -integral of E dr.', 'E = -dV/dr: the field points toward decreasing potential.', 'Potential energy of a system of charges sums over every pair.'],
      terms: [['Potential difference', 'delta V = -integral of E dl.'], ['Equipotential surface', 'Perpendicular to field lines.'], ['Electron volt', '1 eV = 1.6 x 10^-19 J.']],
      knowTitle: 'Equations', know: ['V = kq/r (point charge, zero at infinity)', 'U = k q1 q2 / r;  delta U = q delta V', 'E = -dV/dx'],
      mistakes: ['Adding potentials as vectors. They are scalars.'],
      tips: ['To find V inside a charged sphere, integrate E from infinity in pieces (outside, then inside).'],
    },
    em3: {
      big: ['Conductors in equilibrium: E = 0 inside, surface is an equipotential.', 'Capacitors store energy in the electric field between plates.', 'Dielectrics increase capacitance by reducing the field.'],
      terms: [['Capacitance', 'C = Q/V.'], ['Dielectric constant', 'kappa: factor by which C increases.'], ['Energy density', 'u = 1/2 epsilon0 E^2.']],
      knowTitle: 'Equations', know: ['Parallel plate: C = kappa epsilon0 A/d', 'U = 1/2 CV^2 = Q^2/(2C)', 'Series: 1/C = 1/C1 + 1/C2;  parallel: C = C1 + C2'],
      mistakes: ['Forgetting whether the battery stays connected (V constant) or not (Q constant) when plates move.'],
      tips: ['Disconnected capacitor: Q fixed. Connected: V fixed. Decide first.'],
    },
    em4: {
      big: ['Kirchhoff\'s rules analyze circuits.', 'RC circuits charge and discharge exponentially with time constant RC.', 'Power is the rate of energy transfer in each element.'],
      terms: [['Time constant', 'tau = RC.'], ['Steady state', 'Capacitor current is zero; it acts like an open circuit.'], ['Initially uncharged capacitor', 'Acts like a wire at t = 0.']],
      knowTitle: 'Equations', know: ['Charging: Q(t) = Qmax(1 - e^(-t/RC));  I(t) = I0 e^(-t/RC)', 'Discharging: Q(t) = Q0 e^(-t/RC)', 'P = IV = I^2 R'],
      mistakes: ['Treating a capacitor as a wire in steady state (it is a break).'],
      tips: ['Check limits: at t = 0 and t = infinity your expression must make physical sense.'],
    },
    em5: {
      big: ['Magnetic fields come from currents; Biot-Savart works for any shape, Ampere\'s law for symmetric ones.', 'Magnetic forces on moving charges and currents are perpendicular to velocity.', 'Solenoids produce nearly uniform fields inside.'],
      terms: [['Biot-Savart law', 'dB = (mu0/4 pi) I dl x r-hat / r^2.'], ['Ampere\'s law', 'closed integral of B dl = mu0 Ienc.'], ['Solenoid', 'B = mu0 n I inside (n = turns per length).']],
      knowTitle: 'Equations', know: ['F = qv x B;  F = IL x B', 'Long wire: B = mu0 I/(2 pi r)', 'Loop center: B = mu0 I/(2R)', 'Parallel wires attract if currents are in the same direction'],
      mistakes: ['Using Ampere\'s law without symmetry.'],
      tips: ['Use the right-hand rule with your thumb along current for fields around wires.'],
    },
    em6: {
      big: ['A changing magnetic flux induces an EMF (Faraday) that opposes the change (Lenz).', 'Inductors resist changes in current; RL circuits have time constant L/R.', 'LC circuits oscillate, trading energy between capacitor and inductor.'],
      terms: [['Inductance', 'EMF = -L dI/dt.'], ['RL time constant', 'tau = L/R.'], ['Energy in an inductor', 'U = 1/2 L I^2.']],
      knowTitle: 'Equations', know: ['EMF = -d(Phi)/dt;  rod: EMF = BLv', 'RL: I(t) = (EMF/R)(1 - e^(-tR/L))', 'LC: omega = 1/sqrt(LC)'],
      mistakes: ['Forgetting that an inductor acts like a break at t = 0 and a wire in steady state (opposite of a capacitor).'],
      tips: ['A force is needed to keep a conducting rod moving at constant speed: F = B^2 L^2 v / R.'],
    },
  });

  // ======================= AP CHEMISTRY =======================
  SW.guides('chem', {
    chem1: {
      big: ['The mole connects mass, particles and formulas.', 'Mass spectra reveal isotopes; average atomic mass is a weighted average.', 'Electron configuration and Coulomb\'s law explain periodic trends.', 'Photoelectron spectroscopy shows electron energy levels.'],
      terms: [['Mole', '6.022 x 10^23 particles.'], ['Empirical formula', 'Simplest whole-number ratio.'], ['Effective nuclear charge', 'Net positive charge felt by valence electrons.'], ['Ionization energy', 'Energy to remove an electron.'], ['Electronegativity', 'Attraction for shared electrons.'], ['Shielding', 'Inner electrons reduce the attraction outer electrons feel.']],
      knowTitle: 'Trends and formulas', know: ['n = m/MM;  particles = n x 6.022 x 10^23', 'Atomic radius: decreases across a period, increases down a group.', 'Ionization energy and electronegativity: increase across, decrease down.', 'PES: peak position = binding energy; peak height = number of electrons.'],
      mistakes: ['Explaining trends with "wants a full octet." Use Coulomb\'s law: charge and distance.'],
      tips: ['For trend explanations, mention protons (nuclear charge), shells (distance) and shielding.'],
    },
    chem2: {
      big: ['Bonds form because of electrostatic attraction: ionic, covalent and metallic.', 'Lewis structures and formal charge predict structure; VSEPR predicts shape.', 'Shape and polarity determine molecular properties.'],
      terms: [['Ionic bond', 'Transfer of electrons; metal + nonmetal.'], ['Covalent bond', 'Sharing electrons; nonmetals.'], ['Metallic bond', 'Sea of delocalized electrons.'], ['Formal charge', 'Valence e- minus (nonbonding + half of bonding).'], ['Resonance', 'Several valid Lewis structures; actual structure is an average.'], ['Hybridization', 'sp (linear), sp2 (trigonal planar), sp3 (tetrahedral).']],
      knowTitle: 'VSEPR shapes', know: ['2 domains: linear 180;  3: trigonal planar 120;  4: tetrahedral 109.5', '4 domains with 1 lone pair: trigonal pyramidal; 2 lone pairs: bent', '5: trigonal bipyramidal;  6: octahedral', 'Bond order up -> bond length down, bond energy up'],
      mistakes: ['Calling a molecule polar just because it has polar bonds (CO2 is nonpolar).'],
      tips: ['Best Lewis structure: formal charges closest to zero, negative charge on the most electronegative atom.'],
    },
    chem3: {
      big: ['Intermolecular forces (IMFs) determine boiling point, vapor pressure and solubility.', 'Gases follow the ideal gas law and kinetic molecular theory; real gases deviate at high pressure and low temperature.', 'Solutions, separation (chromatography, distillation) and Beer\'s law describe mixtures.'],
      terms: [['London dispersion', 'All molecules; larger electron clouds mean stronger forces.'], ['Dipole-dipole', 'Between polar molecules.'], ['Hydrogen bonding', 'H bonded to N, O or F attracted to a lone pair on N, O or F.'], ['Molarity', 'mol solute per liter of solution.'], ['Beer-Lambert law', 'A = epsilon b c.'], ['Partial pressure', 'Ptotal = sum of partial pressures; Pa = Xa Ptotal.']],
      knowTitle: 'Equations', know: ['PV = nRT  (R = 0.08206 L atm/mol K)', 'M = mol/L;  M1V1 = M2V2', 'KE(avg) proportional to T (kelvin)', 'A = epsilon b c'],
      mistakes: ['Saying boiling breaks covalent bonds. It overcomes IMFs.', 'Using Celsius in gas laws.'],
      tips: ['When comparing boiling points, name the strongest IMF and connect it to the energy needed to separate molecules.'],
    },
    chem4: {
      big: ['Balanced equations show conservation of atoms and charge.', 'Stoichiometry converts between substances using mole ratios; the limiting reactant controls the amount of product.', 'Reaction types: precipitation, acid-base, redox.'],
      terms: [['Net ionic equation', 'Shows only the species that react.'], ['Spectator ions', 'Ions that do not change.'], ['Limiting reactant', 'Runs out first.'], ['Oxidation / reduction', 'Loss / gain of electrons (OIL RIG).'], ['Titration', 'Adding a known solution to find an unknown concentration.']],
      know: ['Grams -> moles -> mole ratio -> moles -> grams', 'Percent yield = actual / theoretical x 100', 'Strong acids, strong bases and soluble salts are written as ions.', 'Physical vs chemical change: chemical changes break or form bonds.'],
      mistakes: ['Writing weak acids or solids as ions in net ionic equations.'],
      tips: ['Always check which reactant is limiting before computing product mass.'],
    },
    chem5: {
      big: ['Reaction rate depends on concentration, temperature, surface area and catalysts.', 'Rate laws are found by experiment, not from coefficients (except elementary steps).', 'Mechanisms are series of elementary steps; the slow step controls the rate.', 'Collision theory: particles must collide with enough energy and the right orientation.'],
      terms: [['Rate law', 'rate = k[A]^m[B]^n.'], ['Order', 'The exponent of a concentration in the rate law.'], ['Half-life (first order)', 't1/2 = 0.693/k, constant.'], ['Activation energy', 'Minimum energy to react.'], ['Catalyst', 'Lowers activation energy with a new pathway; not consumed.'], ['Intermediate', 'Made in one step and used in a later one.']],
      knowTitle: 'Integrated rate laws', know: ['Zero order: [A] vs t is linear', 'First order: ln[A] vs t is linear, slope = -k', 'Second order: 1/[A] vs t is linear, slope = k', 'Initial rates: double [A] and rate doubles -> first order; quadruples -> second order'],
      mistakes: ['Using balanced-equation coefficients as orders for an overall reaction.'],
      tips: ['A mechanism is valid if steps add to the overall reaction and the slow step matches the rate law.'],
    },
    chem6: {
      big: ['Energy is conserved; heat flows between system and surroundings.', 'Exothermic reactions release heat (delta H < 0); endothermic absorb (delta H > 0).', 'Enthalpy can be found from calorimetry, Hess\'s law, formation enthalpies or bond energies.'],
      terms: [['Specific heat', 'Energy to raise 1 g by 1 C.'], ['Calorimetry', 'q = mc(delta T).'], ['Hess\'s law', 'Add reactions and their delta H values.'], ['Standard enthalpy of formation', 'delta H to form 1 mol from elements in standard states.'], ['Bond enthalpy', 'Energy to break a bond.']],
      knowTitle: 'Equations', know: ['q = mc(delta T)', 'delta H(rxn) = sum(delta Hf products) - sum(delta Hf reactants)', 'delta H = sum(bonds broken) - sum(bonds formed)', 'Phase changes: q = n(delta H fus or vap)'],
      mistakes: ['Sign errors: if the solution warms up, the reaction is exothermic (negative delta H).'],
      tips: ['Breaking bonds always takes energy; forming bonds always releases energy.'],
    },
    chem7: {
      big: ['At equilibrium, forward and reverse rates are equal; concentrations are constant, not equal.', 'K tells how far a reaction goes; Q compared with K tells which way it shifts.', 'Le Chatelier\'s principle predicts shifts after a disturbance.', 'Solubility equilibria use Ksp.'],
      terms: [['K', 'Products over reactants at equilibrium (no solids or pure liquids).'], ['Q', 'Same expression at any moment.'], ['Le Chatelier', 'System shifts to counteract a change.'], ['Ksp', 'Solubility product constant.'], ['Common ion effect', 'An added common ion lowers solubility.']],
      know: ['Q < K: shifts right; Q > K: shifts left', 'Reverse a reaction: K becomes 1/K;  multiply by n: K^n', 'Only temperature changes the value of K', 'ICE tables for equilibrium calculations'],
      mistakes: ['Including solids or liquids in K.', 'Thinking a catalyst shifts equilibrium. It only speeds reaching it.'],
      tips: ['For "explain the shift," compare Q to K after the change.'],
    },
    chem8: {
      big: ['pH measures [H3O+]; strong acids ionize completely, weak acids partially.', 'Buffers resist pH changes because they contain a weak acid and its conjugate base.', 'Titration curves show equivalence points and buffer regions.'],
      terms: [['Bronsted-Lowry acid / base', 'Proton donor / acceptor.'], ['Ka / Kb', 'Acid / base ionization constants; Ka x Kb = Kw.'], ['pKa', '-log Ka; pH at half-equivalence.'], ['Buffer', 'Weak acid + conjugate base.'], ['Equivalence point', 'Moles of acid = moles of base.']],
      knowTitle: 'Equations', know: ['pH = -log[H3O+];  pH + pOH = 14 (25 C)', 'Kw = 1.0 x 10^-14', 'Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])', 'Weak acid: [H3O+] = sqrt(Ka x C) (approximation)', 'Weak acid + strong base: equivalence pH > 7'],
      mistakes: ['Saying the equivalence point always has pH 7.', 'Confusing strength (degree of ionization) with concentration.'],
      tips: ['Half-equivalence point: pH = pKa. Look for it on titration curves.'],
    },
    chem9: {
      big: ['Entropy (S) measures dispersal of matter and energy; Gibbs free energy decides thermodynamic favorability.', 'delta G = delta H - T delta S; negative delta G means thermodynamically favored.', 'Galvanic cells convert chemical energy to electrical; electrolytic cells use electricity to drive reactions.'],
      terms: [['Thermodynamically favored', 'delta G < 0 (does not mean fast).'], ['Anode / cathode', 'Oxidation / reduction (AN OX, RED CAT).'], ['Cell potential', 'E cell = E cathode - E anode.'], ['Faraday constant', '96,485 C per mol e-.']],
      knowTitle: 'Equations', know: ['delta G = delta H - T delta S', 'delta G = -RT ln K;  delta G = -nFE', 'q = It;  moles e- = q/F', 'Favored at all T: delta H < 0 and delta S > 0'],
      mistakes: ['Saying a favored reaction must be fast. Kinetics controls speed.'],
      tips: ['For electrolysis, find charge (It), then moles of electrons, then moles of metal.'],
    },
  });

  // ======================= AP BIOLOGY =======================
  SW.guides('bio', {
    bio1: {
      big: ['Water\'s polarity and hydrogen bonds give it cohesion, adhesion, high specific heat and solvent properties.', 'Life is built from four macromolecules made by dehydration synthesis and broken by hydrolysis.', 'Structure determines function at every level, from monomers to proteins.'],
      terms: [['Carbohydrates', 'Monosaccharides; energy and structure (glucose, cellulose).'], ['Lipids', 'Fats, phospholipids, steroids; not true polymers.'], ['Proteins', 'Amino acid polymers; primary to quaternary structure.'], ['Nucleic acids', 'Nucleotides (sugar, phosphate, base); DNA and RNA.'], ['Dehydration synthesis / hydrolysis', 'Builds polymers releasing water / breaks them using water.'], ['Saturated / unsaturated', 'No double bonds, solid / double bonds, kinked, liquid.']],
      know: ['DNA: deoxyribose, A-T and C-G, double strand, antiparallel (5\' to 3\').', 'RNA: ribose, uracil instead of thymine, single strand.', 'Protein R groups (hydrophobic, hydrophilic, charged) determine folding.'],
      mistakes: ['Calling lipids polymers.'],
      tips: ['Predict how changing one amino acid affects folding based on the R group\'s properties.'],
    },
    bio2: {
      big: ['Cells are small to keep a high surface area to volume ratio.', 'Organelles compartmentalize functions; endosymbiosis explains mitochondria and chloroplasts.', 'Membranes control transport by passive and active mechanisms; water potential predicts osmosis.'],
      terms: [['Fluid mosaic model', 'Phospholipid bilayer with embedded proteins.'], ['Passive transport', 'Diffusion, facilitated diffusion, osmosis; no energy.'], ['Active transport', 'Against the gradient; uses ATP (sodium-potassium pump).'], ['Endocytosis / exocytosis', 'Bringing in / releasing materials with vesicles.'], ['Hypertonic / hypotonic', 'Higher / lower solute concentration than the cell.'], ['Water potential', 'psi = psi(s) + psi(p); water moves from high to low.']],
      knowTitle: 'Organelles and formulas', know: ['Ribosomes: protein synthesis. Rough ER: proteins for export. Golgi: modifies and ships. Lysosomes: digestion. Mitochondria: ATP. Chloroplasts: photosynthesis.', 'Solute potential: psi(s) = -iCRT', 'Surface area / volume decreases as cells get bigger.'],
      mistakes: ['Saying water moves toward lower solute concentration. It moves toward HIGHER solute (lower water potential).'],
      tips: ['In osmosis questions, compare water potential first.'],
    },
    bio3: {
      big: ['Enzymes speed reactions by lowering activation energy; shape and environment (temperature, pH) affect them.', 'Photosynthesis captures light energy in the light reactions and makes sugar in the Calvin cycle.', 'Cellular respiration releases energy from glucose, making most ATP through the electron transport chain and chemiosmosis.'],
      terms: [['Active site', 'Where the substrate binds.'], ['Competitive / noncompetitive inhibitor', 'Binds the active site / binds elsewhere and changes shape.'], ['Denaturation', 'Loss of shape and function.'], ['Chemiosmosis', 'H+ gradient drives ATP synthase.'], ['Glycolysis', 'Glucose to pyruvate in the cytoplasm; 2 ATP net.'], ['Krebs cycle', 'In the mitochondrial matrix; makes NADH, FADH2, CO2.'], ['Fermentation', 'Regenerates NAD+ without oxygen.']],
      know: ['Photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2', 'Respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP', 'Oxygen is the final electron acceptor in respiration.', 'Light reactions: thylakoid membrane; Calvin cycle: stroma.'],
      mistakes: ['Saying plants do photosynthesis instead of respiration. They do both.'],
      tips: ['When asked about a poison that blocks the ETC, explain that the H+ gradient and ATP synthesis stop.'],
    },
    bio4: {
      big: ['Cells communicate by direct contact, local signals and hormones.', 'Signal transduction: reception, transduction (often with second messengers and phosphorylation cascades), response.', 'Feedback loops maintain homeostasis.', 'The cell cycle is regulated by checkpoints; failures can cause cancer.'],
      terms: [['Ligand', 'Signal molecule that binds a receptor.'], ['G protein-coupled receptor', 'Activates a G protein, often making cAMP.'], ['Second messenger', 'Small molecule (cAMP, Ca2+) relaying the signal inside.'], ['Negative feedback', 'Response reduces the stimulus (body temperature).'], ['Positive feedback', 'Response increases the stimulus (childbirth).'], ['Cyclins and CDKs', 'Proteins that control cell cycle progress.'], ['Apoptosis', 'Programmed cell death.']],
      know: ['Cell cycle: G1, S (DNA copied), G2, then mitosis (prophase, metaphase, anaphase, telophase) and cytokinesis.', 'Checkpoints: G1, G2, M.', 'Mutations in tumor suppressors or proto-oncogenes can lead to cancer.'],
      mistakes: ['Confusing negative feedback with "bad" feedback. It means the response opposes the change.'],
      tips: ['Predict the effect of a blocked step: everything after it in the pathway stops.'],
    },
    bio5: {
      big: ['Meiosis makes haploid gametes and creates variation through crossing over and independent assortment.', 'Mendel\'s laws predict inheritance; many traits follow non-Mendelian patterns.', 'Chi-square tests whether observed data fit expected ratios.'],
      terms: [['Homologous chromosomes', 'Pairs with the same genes, one from each parent.'], ['Crossing over', 'Exchange between homologs in prophase I.'], ['Nondisjunction', 'Chromosomes fail to separate.'], ['Incomplete dominance / codominance', 'Blended / both traits fully shown.'], ['Sex-linked', 'Genes on the X chromosome.'], ['Linked genes', 'Close together on one chromosome; inherited together.']],
      knowTitle: 'Ratios and formulas', know: ['Monohybrid Aa x Aa: 3:1 phenotype; dihybrid: 9:3:3:1', 'Probability: AND = multiply; OR = add', 'Chi-square = sum((o - e)^2 / e); df = categories - 1; critical value at df 1 = 3.84', 'Recombination frequency (percent) = map units'],
      mistakes: ['Using df = number of categories instead of categories minus 1.'],
      tips: ['If chi-square is larger than the critical value, reject the null hypothesis.'],
    },
    bio6: {
      big: ['DNA replication is semiconservative.', 'Gene expression: transcription (DNA to mRNA) then translation (mRNA to protein).', 'Gene regulation controls which genes are expressed (operons in prokaryotes; transcription factors, methylation in eukaryotes).', 'Mutations and biotechnology change or analyze DNA.'],
      terms: [['Helicase / DNA polymerase / ligase', 'Unzips / adds nucleotides 5\' to 3\' / joins fragments.'], ['Leading / lagging strand', 'Continuous / Okazaki fragments.'], ['RNA processing', '5\' cap, poly-A tail, intron removal (splicing).'], ['Codon / anticodon', 'Three mRNA bases / tRNA match.'], ['lac operon', 'Inducible: on when lactose is present.'], ['trp operon', 'Repressible: off when tryptophan is present.'], ['PCR / gel electrophoresis', 'Copies DNA / separates fragments by size (small ones move farther).']],
      know: ['Point mutations: silent, missense, nonsense; frameshift from insertions or deletions.', 'Epigenetics: methylation silences genes; acetylation opens chromatin.', 'Alternative splicing makes several proteins from one gene.'],
      mistakes: ['Saying RNA polymerase needs a primer. Only DNA polymerase does.'],
      tips: ['Use the codon chart carefully: read mRNA 5\' to 3\'.'],
    },
    bio7: {
      big: ['Natural selection acts on heritable variation; populations evolve, individuals do not.', 'Evidence for evolution: fossils, anatomy, molecular data, biogeography.', 'Hardy-Weinberg describes a non-evolving population.', 'Phylogenetic trees show relationships based on shared derived traits.'],
      terms: [['Fitness', 'Reproductive success.'], ['Genetic drift', 'Random changes, strongest in small populations (bottleneck, founder effect).'], ['Gene flow', 'Movement of alleles between populations.'], ['Homologous / analogous structures', 'Shared ancestry / similar function only (convergent evolution).'], ['Speciation', 'Allopatric (geographic) or sympatric; reproductive isolation.'], ['Clade', 'An ancestor and all its descendants.']],
      knowTitle: 'Hardy-Weinberg', know: ['p + q = 1', 'p^2 + 2pq + q^2 = 1', 'Conditions: large population, random mating, no mutation, no migration, no selection', 'Find q from the recessive phenotype: q = sqrt(q^2)'],
      mistakes: ['Saying organisms evolve because they need to.'],
      tips: ['Start Hardy-Weinberg problems from the homozygous recessive frequency.'],
    },
    bio8: {
      big: ['Organisms respond to their environment through behavior and physiology.', 'Energy flows through ecosystems (about 10 percent passes to each level); matter cycles.', 'Populations grow exponentially or logistically; communities depend on interactions.', 'Biodiversity increases ecosystem resilience; disruptions affect whole systems.'],
      terms: [['Exponential growth', 'dN/dt = rN; J-curve.'], ['Logistic growth', 'dN/dt = rN((K - N)/K); S-curve.'], ['Carrying capacity (K)', 'Maximum population the environment supports.'], ['Keystone species', 'Has a large effect relative to its numbers.'], ['Trophic levels', 'Producers, primary consumers, secondary consumers...'], ['Simpson\'s diversity index', '1 - sum((n/N)^2).']],
      know: ['Net primary productivity = gross productivity - respiration', 'Symbioses: mutualism (+/+), commensalism (+/0), parasitism (+/-)', 'Invasive species often lack predators and outcompete natives.'],
      mistakes: ['Saying energy cycles. Energy flows; matter cycles.'],
      tips: ['When asked to predict effects of removing a species, trace effects up AND down the food web.'],
    },
  });

  // ======================= AP ENVIRONMENTAL SCIENCE =======================
  SW.guides('apes', {
    es1: {
      big: ['Ecosystems are shaped by interactions among organisms and with the physical environment.', 'Energy flows from producers up trophic levels with about 90 percent lost as heat at each step.', 'Matter cycles: carbon, nitrogen, phosphorus, water.'],
      terms: [['Biome', 'A large region with similar climate and organisms.'], ['Primary productivity', 'Rate producers convert energy into biomass.'], ['Nitrogen fixation', 'N2 to ammonia, by bacteria or lightning.'], ['Nitrification / denitrification', 'Ammonia to nitrates / nitrates back to N2.'], ['Phosphorus cycle', 'No atmospheric part; slow; limits growth.'], ['10 percent rule', 'About 10 percent of energy passes to the next level.']],
      know: ['NPP = GPP - respiration', 'Carbon sinks: oceans, forests, sediments; sources: burning fossil fuels, deforestation.', 'Phosphorus and nitrogen are common limiting nutrients.'],
      mistakes: ['Saying energy is recycled in ecosystems.'],
      tips: ['For calculations, multiply by 0.1 for each trophic level.'],
    },
    es2: {
      big: ['Biodiversity includes genetic, species and ecosystem diversity.', 'More diverse ecosystems are more resilient.', 'Island biogeography and ecological succession explain how communities form and change.'],
      terms: [['Species richness / evenness', 'Number of species / how evenly individuals are spread.'], ['Ecosystem services', 'Benefits from nature (pollination, water filtration).'], ['Primary / secondary succession', 'Starts on bare rock / after a disturbance with soil left.'], ['Pioneer species', 'First colonizers (lichens, mosses).'], ['Generalist / specialist', 'Broad / narrow niche.']],
      know: ['Larger islands and islands closer to the mainland have more species.', 'Intermediate disturbance often gives the highest diversity.'],
      mistakes: ['Confusing primary succession (no soil) with secondary (soil present).'],
      tips: ['Explain resilience: more species means more backups if one is lost.'],
    },
    es3: {
      big: ['Populations grow exponentially until resources limit them to carrying capacity.', 'r-selected species have many offspring with little care; K-selected species have few with much care.', 'Human population growth depends on fertility, mortality and development (demographic transition).'],
      terms: [['Carrying capacity', 'Maximum sustainable population.'], ['Survivorship curves', 'Type I (low early death), II (constant), III (high early death).'], ['Total fertility rate', 'Average children per woman.'], ['Replacement fertility', 'About 2.1 children per woman.'], ['Demographic transition', 'Pre-industrial, transitional, industrial, post-industrial stages.']],
      knowTitle: 'Formulas', know: ['Rule of 70: doubling time = 70 / percent growth rate', 'Growth rate (percent) = (birth rate - death rate)/10 (rates per 1,000)', 'Age structure diagrams: wide base = rapid growth'],
      mistakes: ['Forgetting to divide by 10 when rates are per 1,000.'],
      tips: ['Explain falling fertility with education for women, access to contraception and urbanization.'],
    },
    es4: {
      big: ['Plate tectonics shapes landforms, earthquakes and volcanoes.', 'Soil forms slowly; its texture and composition affect farming.', 'Atmosphere layers and global wind and ocean currents distribute heat and shape climate.'],
      terms: [['Convergent / divergent / transform', 'Plates collide / separate / slide past.'], ['Soil horizons', 'O (organic), A (topsoil), B (subsoil), C (weathered rock).'], ['Troposphere / stratosphere', 'Weather layer / ozone layer.'], ['Coriolis effect', 'Earth\'s rotation deflects winds.'], ['El Nino', 'Weakened trade winds warm the eastern Pacific.'], ['Rain shadow', 'Dry side of a mountain range.']],
      know: ['Soil texture triangle: sand, silt, clay percentages.', 'Watersheds drain to a common body of water.', 'Solar intensity is highest at the equator.'],
      mistakes: ['Mixing up the troposphere and stratosphere.'],
      tips: ['For climate questions, link latitude, ocean currents and elevation.'],
    },
    es5: {
      big: ['Land use (agriculture, forestry, mining, urbanization) involves tradeoffs.', 'The tragedy of the commons describes overuse of shared resources.', 'Sustainable practices reduce soil erosion, water use and habitat loss.'],
      terms: [['Clear-cutting', 'Removing all trees; erosion and habitat loss.'], ['Green Revolution', 'High-yield crops, fertilizer, irrigation and pesticides.'], ['Monoculture', 'One crop over large areas; low diversity.'], ['Integrated pest management', 'Combining methods to reduce pesticide use.'], ['CAFO', 'Concentrated animal feeding operation.'], ['Urban sprawl / impervious surfaces', 'Low-density growth / surfaces that block infiltration and raise runoff.']],
      know: ['Irrigation types: drip (most efficient), flood, furrow, spray.', 'Overfishing leads to fishery collapse; bycatch harms other species.', 'Mining: surface mining disrupts land; reclamation restores it.'],
      mistakes: ['Saying all solutions have no downside. APES expects tradeoffs.'],
      tips: ['FRQ solutions should be specific (contour plowing, drip irrigation) and include one drawback.'],
    },
    es6: {
      big: ['Most energy comes from nonrenewable fossil fuels and nuclear power.', 'Renewables (solar, wind, hydro, geothermal, biomass) reduce emissions but have tradeoffs.', 'Energy conservation reduces demand.'],
      terms: [['Nonrenewable', 'Coal, oil, natural gas, uranium.'], ['Fracking', 'Hydraulic fracturing to release natural gas.'], ['Nuclear fission', 'Splitting uranium-235; no CO2 but radioactive waste.'], ['Photovoltaic cell', 'Turns sunlight into electricity.'], ['Energy efficiency', 'Useful output / input.'], ['Cogeneration', 'Using waste heat from electricity production.']],
      knowTitle: 'Calculations', know: ['1 kWh = 1,000 W for 1 hour', 'Cost = kWh x price per kWh', 'Use dimensional analysis and show units at every step'],
      mistakes: ['Dropping units in energy calculations.'],
      tips: ['APES calculations are done without a calculator; practice scientific notation.'],
    },
    es7: {
      big: ['Air pollutants come from combustion and other human activities.', 'Photochemical smog forms when NOx and VOCs react in sunlight.', 'Thermal inversions trap pollution near the ground.', 'Acid rain comes from SO2 and NOx.'],
      terms: [['Primary / secondary pollutant', 'Emitted directly / formed in the air.'], ['Criteria pollutants', 'CO, Pb, NOx, O3, PM, SO2 (Clean Air Act).'], ['Tropospheric ozone', 'A harmful secondary pollutant.'], ['Particulate matter', 'Tiny particles that harm lungs.'], ['Catalytic converter', 'Reduces CO, NOx and hydrocarbons from cars.'], ['Scrubber', 'Removes SO2 from smokestacks.']],
      know: ['Indoor pollutants: radon, carbon monoxide, mold, asbestos.', 'Acid rain lowers pH of lakes and damages forests; limestone buffers it.'],
      mistakes: ['Confusing stratospheric ozone (good) with tropospheric ozone (pollutant).'],
      tips: ['Name the pollutant, its source, its effect and a specific reduction method.'],
    },
    es8: {
      big: ['Water pollution comes from point sources (one location) and nonpoint sources (runoff).', 'Excess nutrients cause eutrophication, algal blooms and dead zones.', 'Toxins can bioaccumulate in organisms and biomagnify up food chains.', 'Solid waste is managed by landfills, incineration, recycling and composting.'],
      terms: [['Eutrophication', 'Nutrient overload -> algae -> decomposition -> low oxygen.'], ['BOD', 'Biological oxygen demand.'], ['Bioaccumulation / biomagnification', 'Builds in one organism / increases up the food chain.'], ['LD50', 'Dose that kills half the test population.'], ['Wastewater treatment', 'Primary (physical), secondary (biological), tertiary (chemical).'], ['Leachate', 'Liquid that drains from landfills.']],
      know: ['Mercury and DDT biomagnify.', 'Oil spills, plastics and thermal pollution harm aquatic life.', 'Indicator species (mayflies, stoneflies) signal clean water.'],
      mistakes: ['Saying algae use up oxygen directly. Decomposers breaking down dead algae use it.'],
      tips: ['Explain the full eutrophication chain step by step.'],
    },
    es9: {
      big: ['Greenhouse gases trap heat; human emissions are warming the climate.', 'Stratospheric ozone protects life from UV; CFCs destroyed it, and the Montreal Protocol is helping it recover.', 'Climate change causes sea level rise, ocean acidification, coral bleaching and species shifts.', 'Invasive species and habitat loss threaten biodiversity.'],
      terms: [['Greenhouse gases', 'CO2, CH4, N2O, water vapor, CFCs.'], ['Global warming potential', 'Heat trapped relative to CO2.'], ['Ocean acidification', 'CO2 dissolving forms carbonic acid, lowering pH.'], ['Montreal Protocol (1987)', 'Phased out CFCs.'], ['HIPPCO', 'Habitat loss, invasive species, population, pollution, climate change, overexploitation.'], ['Endangered Species Act', 'US law protecting threatened species.']],
      know: ['Methane traps more heat per molecule than CO2 but stays in the air for a shorter time.', 'Coral bleaching: warm water causes corals to expel algae.', 'Climate solutions: renewable energy, efficiency, carbon taxes, reforestation.'],
      mistakes: ['Confusing ozone depletion (UV) with global warming (greenhouse effect).'],
      tips: ['Link a cause, an effect on a system and a specific solution in FRQ answers.'],
    },
  });
})();
