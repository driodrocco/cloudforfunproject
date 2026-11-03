/* Generated data sets for science and math: each call draws a new graph or
 * table and builds 3-4 questions whose answers are computed from the data. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const { r3, num, g, R, pick } = SW;
  const F = SW.fig;

  // Right answer first, then three distinct wrong ones (the page shuffles).
  function opts(right, cands) {
    const out = [String(right)];
    for (const c of cands) { const s = String(c); if (!out.includes(s)) out.push(s); if (out.length === 4) break; }
    let k = 1;
    while (out.length < 4) { const s = String(right) + ' (approx. ' + k++ + ')'; if (!out.includes(s)) out.push(s); }
    return out;
  }
  const Q = (q, right, wrongs, why) => [q, opts(right, wrongs), 0, why];

  // ======================= BIOLOGY =======================
  SW.dataset('bio3', 'enzyme activity graph', () => {
    const opt = pick([25, 30, 35, 40, 45]), peak = R(18, 40, 1);
    const pts = [10, 20, 30, 40, 50, 60, 70].map(t => [t, Math.max(0, r3(peak * Math.exp(-((t - opt) ** 2) / (t > opt ? 120 : 260))))]);
    const t2 = pick([20, 30, 50]), v2 = pts.find(p => p[0] === t2)[1];
    const best = pts.reduce((a, b) => (b[1] > a[1] ? b : a));
    return {
      figure: F.line({ title: 'Enzyme activity vs. temperature (practice data)', xLabel: 'Temperature (C)', yLabel: 'O2 produced (mL/min)', series: [{ name: 'activity', pts }] }),
      qs: [
        Q('Based on the graph, at about what temperature is the enzyme most active?', `${best[0]} C`, [`${best[0] + 20} C`, `${best[0] - 20} C`, '70 C', '10 C'], 'The highest point on the curve is the optimum temperature.'),
        Q(`What is the rate of O2 production at ${t2} C?`, `${g(v2)} mL/min`, [`${g(r3(v2 * 1.5 + 2))} mL/min`, `${g(r3(v2 / 2 + 1))} mL/min`, `${g(best[1])} mL/min`, '0 mL/min'], 'Read straight up from the temperature to the curve.'),
        Q('Which best explains the drop in activity at 70 C?', 'The enzyme is denatured, so its active site changes shape', ['The substrate is used up', 'Molecules move more slowly', 'The enzyme is inhibited by O2', 'More enzyme is made'], 'High heat breaks the bonds that hold the enzyme\'s 3-D shape.'),
      ],
    };
  });

  SW.dataset('bio8', 'population growth graph', () => {
    const K = R(4, 12, 1) * 100, r = R(0.4, 0.8, 0.05), N0 = r3(K / 20);
    const pts = Array.from({ length: 11 }, (_, i) => [i * 2, Math.round(K / (1 + ((K - N0) / N0) * Math.exp(-r * i * 2)))]);
    const steepest = pts.slice(1).reduce((best, p, i) => (p[1] - pts[i][1] > best.d ? { d: p[1] - pts[i][1], t: pts[i][0] } : best), { d: -1, t: 0 });
    return {
      figure: F.line({ title: 'Deer population on an island (practice data)', xLabel: 'Year', yLabel: 'Number of deer', series: [{ name: 'deer', pts }] }),
      qs: [
        Q('The carrying capacity of the island is closest to:', String(K), [String(K / 2), String(K * 2), String(Math.round(N0)), String(K + 300)], 'The population levels off near the carrying capacity.'),
        Q('Which model best describes this growth?', 'Logistic growth', ['Exponential growth', 'Linear growth', 'Declining population', 'No growth'], 'Fast growth that slows and levels off is logistic.'),
        Q('During which period does the population grow fastest?', `Years ${steepest.t}-${steepest.t + 2}`, ['Years 0-2', `Years ${pts[pts.length - 3][0]}-${pts[pts.length - 2][0]}`, 'Years 18-20', 'It grows at the same rate the whole time'], 'The steepest part of an S-shaped curve is near half the carrying capacity.'),
      ],
    };
  });

  SW.dataset('bio3', 'photosynthesis light graph', () => {
    const max = R(20, 40, 1), half = R(150, 350, 50);
    const pts = [0, 100, 200, 300, 400, 500, 600, 700, 800].map(l => [l, r3((max * l) / (l + half))]);
    const l1 = pick([100, 200, 300]);
    return {
      figure: F.line({ title: 'Rate of photosynthesis vs. light intensity (practice data)', xLabel: 'Light intensity (umol photons/m^2/s)', yLabel: 'O2 released (umol/m^2/s)', series: [{ name: 'rate', pts }] }),
      qs: [
        Q(`What is the rate at a light intensity of ${l1}?`, g(pts.find(p => p[0] === l1)[1]), [g(r3(max * 0.9)), g(r3(pts.find(p => p[0] === l1)[1] / 2)), '0', g(max * 2)], 'Read the curve at that light intensity.'),
        Q('At the highest light intensities the rate levels off. The most likely limiting factor there is:', 'CO2 concentration (or temperature)', ['Light intensity', 'Oxygen concentration', 'The number of mitochondria', 'Glucose concentration'], 'Once more light no longer helps, something else, often CO2, limits the Calvin cycle.'),
        Q('The independent variable in this experiment is:', 'Light intensity', ['Rate of photosynthesis', 'O2 released', 'Temperature', 'Plant species'], 'It is the variable the researcher changed (x-axis).'),
      ],
    };
  });

  SW.dataset('bio5', 'cross data table', () => {
    const n = R(10, 25, 1) * 16, obs = [Math.round(n * 9 / 16 + R(-8, 8, 1)), Math.round(n * 3 / 16 + R(-6, 6, 1)), Math.round(n * 3 / 16 + R(-6, 6, 1))];
    obs.push(n - obs[0] - obs[1] - obs[2]);
    return {
      figure: F.table({ title: 'Offspring of a dihybrid cross AaBb x AaBb (practice data)', head: ['Phenotype', 'Observed'], rows: [['Dominant A, dominant B', obs[0]], ['Dominant A, recessive b', obs[1]], ['Recessive a, dominant B', obs[2]], ['Recessive a, recessive b', obs[3]]] }),
      qs: [
        Q('What ratio is expected if the genes assort independently?', '9:3:3:1', ['3:1', '1:2:1', '1:1:1:1', '9:7'], 'A dihybrid cross of two heterozygotes gives 9:3:3:1.'),
        Q(`How many recessive-recessive offspring are expected out of ${n}?`, String(n / 16), [String(n / 4), String((n * 3) / 16), String(obs[3] + 10), String(n / 8)], '1/16 of the total.'),
        Q('How many degrees of freedom does a chi-square test on this data have?', '3', ['4', '2', '1', String(n - 1)], 'Categories minus 1: 4 - 1 = 3.'),
      ],
    };
  });

  // ======================= ENVIRONMENTAL SCIENCE =======================
  SW.dataset('es9', 'CO2 trend graph', () => {
    const y0 = pick([1990, 1995, 2000]), c0 = R(350, 370, 1), rate = R(1.5, 2.5, 0.1);
    const pts = Array.from({ length: 6 }, (_, i) => [y0 + 5 * i, r3(c0 + rate * 5 * i)]);
    const last = pts[pts.length - 1], avg = r3((last[1] - c0) / (last[0] - y0)), pct = r3(((last[1] - c0) / c0) * 100);
    return {
      figure: F.line({ title: 'Atmospheric CO2 at a monitoring station (practice data)', xLabel: 'Year', yLabel: 'CO2 (ppm)', series: [{ name: 'CO2', pts }], yMin: 340 }),
      qs: [
        Q(`What is the average rate of increase from ${y0} to ${last[0]}?`, `${g(avg)} ppm per year`, [`${g(r3(avg * 5))} ppm per year`, `${g(r3(avg / 2))} ppm per year`, `${g(r3(last[1] - c0))} ppm per year`, '0 ppm per year'], `(${g(last[1])} - ${c0})/(${last[0]} - ${y0}).`),
        Q(`By about what percent did CO2 rise over the whole period?`, `${g(pct)}%`, [`${g(r3(pct * 2))}%`, `${g(r3(pct / 3))}%`, `${g(r3(last[1] - c0))}%`, '100%'], '% change = (new - old)/old x 100.'),
        Q('The main human cause of this trend is:', 'Burning fossil fuels', ['Volcanic eruptions', 'Ozone depletion', 'Acid rain', 'Nuclear power'], 'Fossil fuel combustion releases CO2 that had been stored for millions of years.'),
      ],
    };
  });

  SW.dataset('es8', 'dissolved oxygen downstream', () => {
    const low = R(2, 4, 0.5), at = pick([2, 3, 4]);
    const pts = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(d => [d, r3(d === 0 ? 9 : 9 - (9 - low) * Math.exp(-((d - at) ** 2) / 4))]);
    const minP = pts.reduce((a, b) => (b[1] < a[1] ? b : a));
    return {
      figure: F.line({ title: 'Dissolved oxygen below a wastewater outfall at km 0 (practice data)', xLabel: 'Distance downstream (km)', yLabel: 'Dissolved O2 (mg/L)', series: [{ name: 'DO', pts }], yMin: 0 }),
      qs: [
        Q('At what distance is dissolved oxygen lowest?', `${minP[0]} km`, ['0 km', '8 km', `${minP[0] + 3} km`, '1 km'], 'Find the lowest point on the curve.'),
        Q('Why does oxygen drop downstream of the outfall?', 'Bacteria use up oxygen decomposing organic waste', ['Fish produce extra CO2', 'Water gets colder', 'Algae make too much oxygen', 'Sunlight is blocked by bridges'], 'High biological oxygen demand (BOD) from decomposition lowers DO.'),
        Q('Oxygen recovers farther downstream mainly because:', 'Waste is used up and the water re-aerates', ['The river flows uphill', 'Fish leave the area', 'Temperature rises', 'Salinity increases'], 'As decomposition finishes, mixing with air restores oxygen.'),
      ],
    };
  });

  SW.dataset('es6', 'energy mix bar chart', () => {
    let vals;
    do { // percents must total 100, and the three renewables must differ so "largest" is clear
      vals = { Coal: R(10, 25, 1), Gas: R(28, 38, 1), Nuclear: R(15, 20, 1), Wind: R(6, 12, 1), Solar: R(3, 8, 1) };
      vals.Hydro = 100 - Object.values(vals).reduce((a, b) => a + b, 0);
    } while (vals.Hydro < 2 || new Set([vals.Wind, vals.Solar, vals.Hydro]).size < 3);
    const renew = vals.Wind + vals.Solar + vals.Hydro, fossil = vals.Coal + vals.Gas;
    const ren = Object.entries({ Wind: vals.Wind, Solar: vals.Solar, Hydro: vals.Hydro }).sort((a, b) => b[1] - a[1])[0][0];
    return {
      figure: F.bar({ title: 'Electricity generation by source, percent (practice data; Gas = natural gas)', yLabel: 'Percent of total', bars: Object.entries(vals).map(([label, value]) => ({ label, value })) }),
      qs: [
        Q('What percent of electricity comes from renewable sources (wind, solar, hydro)?', `${renew}%`, [`${fossil}%`, `${vals.Nuclear}%`, `${100 - renew}%`, `${renew + vals.Nuclear}%`], 'Add the three renewable bars.'),
        Q('Which renewable source is largest?', ren, ['Coal', 'Nuclear', 'Natural gas', 'Geothermal'].concat(['Wind', 'Solar', 'Hydro'].filter(x => x !== ren)), 'Compare the wind, solar and hydro bars.'),
        Q('Switching from coal to natural gas lowers CO2 emissions per kWh because natural gas:', 'Releases less CO2 per unit of energy when burned', ['Contains no carbon', 'Is renewable', 'Produces no air pollution', 'Is always cheaper'], 'Methane has more hydrogen per carbon atom than coal.'),
      ],
    };
  });

  // ======================= CHEMISTRY =======================
  SW.dataset('chem8', 'titration curve', () => {
    const pKa = R(3.5, 5.5, 0.1), Ve = R(20, 30, 1), Ca = 0.1;
    const pH = v => {
      if (v <= 0) return 0.5 * (pKa - Math.log10(Ca));
      if (v < Ve - 0.2) return pKa + Math.log10(v / (Ve - v));
      if (v <= Ve + 0.2) return 7 + 0.5 * (pKa + Math.log10(Ca / 2) + 0); // weak base at equivalence (approx.)
      const excess = (0.1 * (v - Ve)) / (Ve * 2 + (v - Ve)); return 14 + Math.log10(excess);
    };
    const pts = [0, 2, 5, Ve / 2, Ve - 5, Ve - 2, Ve - 0.5, Ve, Ve + 0.5, Ve + 2, Ve + 5, Ve + 10].map(v => [r3(v), r3(pH(v))]);
    return {
      figure: F.line({ title: 'Titration of a weak acid with 0.10 M NaOH (practice data)', xLabel: 'Volume of NaOH added (mL)', yLabel: 'pH', series: [{ name: 'pH', pts }], yMin: 0, yMax: 14, dots: false }),
      qs: [
        Q('What is the volume of NaOH at the equivalence point?', `${Ve} mL`, [`${Ve / 2} mL`, `${Ve + 10} mL`, '0 mL', `${Ve * 2} mL`], 'The equivalence point is the middle of the steep jump.'),
        Q(`Using the graph, the pKa of the acid is closest to:`, g(r3(pKa)), [g(r3(pKa + 3)), '7', g(r3(pts[0][1])), '12'], `At the half-equivalence point (${Ve / 2} mL), pH = pKa.`),
        Q('Why is the pH at the equivalence point above 7?', 'The conjugate base of the weak acid makes the solution basic', ['Excess NaOH is present', 'The acid is strong', 'Water is basic', 'Some acid is left over'], 'At equivalence only A- remains, and it reacts with water to make OH-.'),
      ],
    };
  });

  SW.dataset('chem5', 'first-order decay graph', () => {
    const A0 = R(0.4, 1.2, 0.1), th = R(5, 20, 1), k = 0.693 / th;
    const pts = Array.from({ length: 9 }, (_, i) => [i * th / 2, r3(A0 * Math.exp(-k * (i * th / 2)))]);
    return {
      figure: F.line({ title: 'Concentration of reactant A over time (practice data)', xLabel: 'Time (s)', yLabel: '[A] (M)', series: [{ name: '[A]', pts }], yMin: 0 }),
      qs: [
        Q('Using the graph, the half-life of the reaction is about:', `${g(th)} s`, [`${g(th * 2)} s`, `${g(th / 2)} s`, `${g(th * 4)} s`, '1 s'], `[A] falls from ${g(A0)} to ${g(r3(A0 / 2))} M in ${g(th)} s.`),
        Q('The half-life stays the same as [A] drops. The reaction is:', 'First order', ['Zero order', 'Second order', 'Third order', 'Not possible to tell'], 'Only first-order reactions have a constant half-life.'),
        Q('Which plot of this data would be a straight line?', 'ln[A] vs. time', ['[A] vs. time', '1/[A] vs. time', '[A]^2 vs. time', 'time vs. temperature'], 'First order: ln[A] = ln[A]0 - kt.'),
      ],
    };
  });

  SW.dataset('chem5', 'initial rates table', () => {
    const m = pick([0, 1, 2]), n = pick([1, 2]), r1 = R(1, 9, 0.5);
    const rows = [[1, 0.1, 0.1, r1], [2, 0.2, 0.1, r1 * 2 ** m], [3, 0.1, 0.2, r1 * 2 ** n]];
    const law = `rate = k[A]${m === 0 ? '^0' : m === 1 ? '' : '^2'}[B]${n === 1 ? '' : '^2'}`;
    return {
      figure: F.table({ title: 'Initial rates for A + B -> products (practice data)', head: ['Trial', '[A] (M)', '[B] (M)', 'Rate (x 10^-3 M/s)'], rows: rows.map(r => r.map(x => g(x))) }),
      qs: [
        Q('What is the order of the reaction with respect to A?', String(m), ['1', '2', '0', '3'].filter(x => x !== String(m)), `Trials 1 and 2: doubling [A] multiplies the rate by ${2 ** m}, so 2^m = ${2 ** m}.`),
        Q('What is the order with respect to B?', String(n), ['0', '1', '2', '3'].filter(x => x !== String(n)), `Trials 1 and 3: doubling [B] multiplies the rate by ${2 ** n}.`),
        Q('Which rate law fits the data?', law, ['rate = k[A][B]', 'rate = k[A]^2[B]^2', 'rate = k[B]', 'rate = k[A]^2'].filter(x => x !== law), 'Combine the two orders.'),
      ],
    };
  });

  // ======================= PHYSICS =======================
  const vtGraph = () => {
    const v0 = R(0, 6, 1), v1 = R(4, 12, 1), t1 = R(2, 5, 1), t2 = t1 + R(2, 5, 1), t3 = t2 + R(2, 4, 1);
    const pts = [[0, v0], [t1, v1], [t2, v1], [t3, 0]];
    const a1 = r3((v1 - v0) / t1), disp = r3(((v0 + v1) / 2) * t1 + v1 * (t2 - t1) + (v1 / 2) * (t3 - t2));
    return {
      figure: F.line({ title: 'Velocity vs. time for a cart', xLabel: 'Time (s)', yLabel: 'Velocity (m/s)', series: [{ name: 'v', pts }], yMin: 0 }),
      qs: [
        Q(`What is the cart's acceleration from 0 to ${t1} s?`, `${g(a1)} m/s^2`, [`${g(v1)} m/s^2`, `${g(r3(a1 * 2))} m/s^2`, '0 m/s^2', `${g(r3(v1 / t2))} m/s^2`], 'Acceleration is the slope of a v-t graph.'),
        Q(`During ${t1} to ${t2} s, the cart is:`, 'Moving at constant velocity', ['At rest', 'Speeding up', 'Slowing down', 'Moving backward'], 'A flat line on a v-t graph means constant velocity, not rest.'),
        Q(`What is the total displacement from 0 to ${t3} s?`, `${g(disp)} m`, [`${g(r3(disp / 2))} m`, `${g(v1 * t3)} m`, `${g(r3(disp + v1))} m`, '0 m'], 'Displacement is the area under the v-t graph (trapezoid + rectangle + triangle).'),
      ],
    };
  };
  SW.dataset('kin', 'velocity-time graph', vtGraph);

  SW.dataset('mom', 'force-time graph', () => {
    const Fm = R(100, 900, 50), T = R(0.02, 0.2, 0.01), m = R(0.1, 2, 0.1), J = r3(0.5 * Fm * T), dv = r3(J / m);
    return {
      figure: F.line({ title: 'Force on a ball during a kick', xLabel: 'Time (s)', yLabel: 'Force (N)', series: [{ name: 'F', pts: [[0, 0], [r3(T / 2), Fm], [T, 0]] }] }),
      qs: [
        Q('What impulse does the force deliver?', `${g(J)} N s`, [`${g(Fm * T)} N s`, `${g(Fm)} N s`, `${g(r3(J / 2))} N s`, `${g(T)} N s`], 'Impulse is the area under F-t: a triangle, (1/2)(base)(height).'),
        Q(`The ball (${g(m)} kg) starts at rest. What is its speed after the kick?`, `${g(dv)} m/s`, [`${g(r3(dv * 2))} m/s`, `${g(r3(Fm / m))} m/s`, `${g(J)} m/s`, `${g(r3(dv / 2))} m/s`], 'J = m(delta v), so v = J/m.'),
        Q('If the same impulse were spread over a longer time, the peak force would be:', 'Smaller', ['Larger', 'The same', 'Zero', 'Negative'], 'Same area with a wider base means a lower peak.'),
      ],
    };
  });

  SW.dataset('thermo', 'pressure-volume graph', () => {
    const P = R(1, 3, 0.5) * 1e5, V1 = R(1, 3, 1), V2 = V1 + R(1, 3, 1), Wby = r3(P * (V2 - V1) * 1e-3);
    return {
      figure: F.line({ title: 'Gas expanding at constant pressure', xLabel: 'Volume (L)', yLabel: 'Pressure (x 10^5 Pa)', series: [{ name: 'process', pts: [[V1, P / 1e5], [V2, P / 1e5]] }], yMin: 0, yMax: 4 }),
      qs: [
        Q('How much work does the gas do on its surroundings? (1 L = 10^-3 m^3)', `${g(Wby)} J`, [`${g(r3(Wby * 1000))} J`, `${g(-Wby)} J`, `${g(r3(Wby / 2))} J`, '0 J'], 'Work by the gas = area under the P-V graph = P(delta V).'),
        Q('Using the AP convention (W is work done ON the gas), W for this process is:', 'Negative', ['Positive', 'Zero', 'It depends on temperature', 'Undefined'], 'The gas expands and pushes outward, so work done on it is negative.'),
        Q('Since PV = nRT and P is constant while V increases, the temperature:', 'Increases', ['Decreases', 'Stays the same', 'Drops to zero', 'Cannot change'], 'T is proportional to V at constant pressure.'),
      ],
    };
  });

  SW.dataset('circ', 'voltage-current data', () => {
    const Rr = R(5, 50, 5), rows = [0.1, 0.2, 0.3, 0.4, 0.5].map(I => [g(I), g(r3(I * Rr))]);
    return {
      figure: F.table({ title: 'Voltage across a resistor at different currents', head: ['Current (A)', 'Voltage (V)'], rows }),
      qs: [
        Q('What is the resistance of the resistor?', `${Rr} ohm`, [`${Rr * 2} ohm`, `${Rr / 5} ohm`, `${Rr / 2} ohm`, '1 ohm'], 'R = V/I, the slope of a V vs. I graph.'),
        Q('The data show the resistor is ohmic because:', 'Voltage is proportional to current', ['Current stays constant', 'Voltage is zero', 'Resistance increases with current', 'Power is constant'], 'A straight line through the origin means constant resistance.'),
        Q(`What power does it use at 0.5 A?`, `${g(r3(0.25 * Rr))} W`, [`${g(r3(0.5 * Rr))} W`, `${g(Rr)} W`, `${g(r3(0.125 * Rr))} W`, '0.5 W'], 'P = I^2 R.'),
      ],
    };
  });

  // ======================= CALCULUS =======================
  SW.dataset('calc5', "graph of f'", () => {
    // f' piecewise linear through integer points; f' crosses zero at two places
    const a = R(1, 3, 1), b = a + R(2, 3, 1), top = R(2, 4, 1);
    const pts = [[0, -2], [a, 0], [r3((a + b) / 2), top], [b, 0], [b + 2, -2]];
    const area = (x1, x2) => { // area under the piecewise-linear f' from x1 to x2
      let s = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const [xa, ya] = pts[i], [xb, yb] = pts[i + 1];
        const lo = Math.max(x1, xa), hi = Math.min(x2, xb);
        if (hi <= lo) continue;
        const yAt = x => ya + ((yb - ya) * (x - xa)) / (xb - xa);
        s += ((yAt(lo) + yAt(hi)) / 2) * (hi - lo);
      }
      return r3(s);
    };
    const f0 = R(-3, 5, 1), fb = r3(f0 + area(0, b));
    return {
      figure: F.line({ title: "Graph of f' (the derivative of f)", xLabel: 'x', yLabel: "f'(x)", series: [{ name: "f'", pts }], dots: false }),
      qs: [
        Q('On which interval is f increasing?', `(${a}, ${b})`, [`(0, ${a})`, `(${b}, ${b + 2})`, `(0, ${b + 2})`, `(${r3((a + b) / 2)}, ${b + 2})`], "f increases where f' > 0 (the graph is above the x-axis)."),
        Q('At what x-value does f have a local maximum?', `x = ${b}`, [`x = ${a}`, `x = ${r3((a + b) / 2)}`, 'x = 0', `x = ${b + 2}`], "f' changes from positive to negative there."),
        Q(`Where is f concave down, for x > ${a}?`, `(${r3((a + b) / 2)}, ${b + 2})`, [`(${a}, ${r3((a + b) / 2)})`, `(0, ${a})`, `(${a}, ${b})`, 'Nowhere'], "f is concave down where f' is decreasing."),
        Q(`If f(0) = ${f0}, what is f(${b})?`, g(fb), [g(r3(f0 + area(a, b))), g(area(0, b)), g(r3(f0 - area(0, b))), g(f0)], `f(${b}) = f(0) + integral of f' from 0 to ${b}: below-axis area counts as negative.`),
      ],
    };
  });

  // ======================= STATISTICS =======================
  SW.dataset('st2', 'regression output', () => {
    const b0 = R(10, 60, 0.5), b1 = R(0.5, 4, 0.1), r = R(0.6, 0.97, 0.01), x = R(5, 30, 1), yhat = r3(b0 + b1 * x);
    return {
      figure: F.table({ title: 'Computer output: predicting exam score from hours studied (practice data)', head: ['Predictor', 'Coef', 'SE Coef', 'T', 'P'], rows: [['Constant', g(b0), g(r3(b0 / 8)), g(r3(8)), '0.000'], ['Hours', g(b1), g(r3(b1 / 5)), '5.00', '0.000']], note: `S = 6.2   R-Sq = ${g(r3(r * r * 100))}%` }),
      qs: [
        Q('Which is the correct interpretation of the slope?', `Each additional hour studied is associated with a predicted increase of ${g(b1)} points`, [`Students score ${g(b1)} points on average`, `Studying causes a ${g(b1)}-point gain`, `The predicted score with 0 hours is ${g(b1)}`, `${g(b1)}% of the variation is explained`], 'Slope = predicted change in y per 1-unit increase in x. Avoid causal language.'),
        Q(`What is the predicted score for a student who studies ${x} hours?`, g(yhat), [g(r3(b0 * x)), g(r3(b1 * x)), g(b0), g(r3(yhat + b1))], `y-hat = ${g(b0)} + ${g(b1)}(${x}).`),
        Q(`What does R-Sq = ${g(r3(r * r * 100))}% mean?`, `About ${g(r3(r * r * 100))}% of the variation in scores is explained by the linear model with hours`, [`${g(r3(r * r * 100))}% of predictions are correct`, `The correlation is ${g(r3(r * r * 100))}`, `${g(r3(r * r * 100))}% of students studied`, 'The slope is significant'], 'r^2 is the fraction of variation in y explained by the model.'),
      ],
    };
  });

  SW.dataset('st4', 'two-way table', () => {
    const a = R(20, 60, 1), b = R(20, 60, 1), c = R(20, 60, 1), d = R(20, 60, 1), N = a + b + c + d;
    const pA = r3(a / (a + b)), pAll = r3((a + c) / N);
    return {
      figure: F.table({ title: 'Survey of students: grade level and favorite lunch (practice data)', head: ['', 'Pizza', 'Salad', 'Total'], rows: [['9th grade', a, b, a + b], ['12th grade', c, d, c + d], ['Total', a + c, b + d, N]] }),
      qs: [
        Q('What is P(pizza | 9th grade)?', g(pA), [g(r3(a / N)), g(r3(a / (a + c))), g(pAll), g(r3((a + b) / N))], `Only 9th graders: ${a}/${a + b}.`),
        Q('What is P(pizza)?', g(pAll), [g(pA), g(r3(a / N)), g(r3((b + d) / N)), '0.5'], `All students: ${a + c}/${N}.`),
        Q('If grade level and lunch choice were independent, then:', 'P(pizza | 9th) would equal P(pizza)', ['The table would have no pizza fans', 'P(pizza) would be 0.5', 'All 9th graders would choose salad', 'The totals would be equal'], 'Independence means the condition does not change the probability.'),
      ],
    };
  });
})();
