/* Figures for questions: line graphs, bar charts, data tables, and labeled
 * line diagrams (supply and demand, AD-AS, graphs of f'). Each returns an
 * HTML string. Colors come from CSS (class names), so figures follow the
 * subject accent and the light/dark theme. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const nice = span => { const p = 10 ** Math.floor(Math.log10(span / 4 || 1)); return [1, 2, 2.5, 5, 10].map(m => m * p).find(s => span / s <= 6) || p * 10; };
  const fmt = v => String(+Number(v).toFixed(4));

  function frame({ title, xLabel, yLabel, xMin, xMax, yMin, yMax, xTicks = true, yTicks = true, W = 440, H = 260 }) {
    const L = 52, R = 16, T = 16, B = 42;
    const X = x => L + ((x - xMin) / (xMax - xMin)) * (W - L - R);
    const Y = y => T + ((yMax - y) / (yMax - yMin)) * (H - T - B);
    let g = '';
    if (yTicks) {
      const st = nice(yMax - yMin);
      for (let y = Math.ceil(yMin / st) * st; y <= yMax + 1e-9; y += st) g += `<line class="fg" x1="${L}" x2="${W - R}" y1="${Y(y)}" y2="${Y(y)}"/><text x="${L - 6}" y="${Y(y) + 4}" text-anchor="end">${fmt(y)}</text>`;
    }
    if (xTicks) {
      const st = nice(xMax - xMin);
      for (let x = Math.ceil(xMin / st) * st; x <= xMax + 1e-9; x += st) g += `<line class="fg" y1="${T}" y2="${H - B}" x1="${X(x)}" x2="${X(x)}"/><text x="${X(x)}" y="${H - B + 15}" text-anchor="middle">${fmt(x)}</text>`;
    }
    const axes = `<line class="fa" x1="${L}" x2="${W - R}" y1="${Y(Math.max(yMin, Math.min(0, yMax)))}" y2="${Y(Math.max(yMin, Math.min(0, yMax)))}"/><line class="fa" x1="${X(Math.max(xMin, Math.min(0, xMax)))}" x2="${X(Math.max(xMin, Math.min(0, xMax)))}" y1="${T}" y2="${H - B}"/>`;
    const labels = `<text class="fl" x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle">${esc(xLabel || '')}</text><text class="fl" transform="translate(13 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle">${esc(yLabel || '')}</text>`;
    const open = `<figure class="fig"><figcaption>${esc(title || '')}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title || 'figure')}">`;
    return { X, Y, W, H, L, R, T, B, open, close: '</svg></figure>', grid: g + axes + labels };
  }

  // series: [{ name, pts: [[x, y], ...], dash? }]
  function line({ title, xLabel, yLabel, series, yMin, yMax, dots = true }) {
    const xs = series.flatMap(s => s.pts.map(p => p[0])), ys = series.flatMap(s => s.pts.map(p => p[1]));
    let lo = yMin ?? Math.min(0, ...ys), hi = yMax ?? Math.max(...ys);
    if (hi - lo < 1e-9) hi = lo + 1;
    const pad = yMax == null ? (hi - lo) * 0.08 : 0;
    const f = frame({ title, xLabel, yLabel, xMin: Math.min(...xs), xMax: Math.max(...xs), yMin: lo, yMax: hi + pad });
    let body = '';
    series.forEach((s, i) => {
      body += `<path class="fs fs${i}${s.dash ? ' fd' : ''}" d="${s.pts.map((p, k) => `${k ? 'L' : 'M'}${f.X(p[0])},${f.Y(p[1])}`).join('')}"/>`;
      if (dots) body += s.pts.map(p => `<circle class="fp fp${i}" cx="${f.X(p[0])}" cy="${f.Y(p[1])}" r="3"/>`).join('');
    });
    const legend = series.length > 1 ? `<div class="flegend">${series.map((s, i) => `<span><i class="fk${i}"></i>${esc(s.name)}</span>`).join('')}</div>` : '';
    return f.open + f.grid + body + f.close.replace('</figure>', legend + '</figure>');
  }

  // bars: [{ label, value }]
  function bar({ title, yLabel, bars, yMax }) {
    const W = 440, H = 260, L = 52, R = 16, T = 16, B = 52, n = bars.length;
    const hi = yMax ?? Math.max(...bars.map(b => b.value)) * 1.12;
    const Y = y => T + ((hi - y) / hi) * (H - T - B), bw = (W - L - R) / n;
    let g = '';
    const st = nice(hi);
    for (let y = 0; y <= hi + 1e-9; y += st) g += `<line class="fg" x1="${L}" x2="${W - R}" y1="${Y(y)}" y2="${Y(y)}"/><text x="${L - 6}" y="${Y(y) + 4}" text-anchor="end">${fmt(y)}</text>`;
    const body = bars.map((b, i) => `<rect class="fb" x="${L + i * bw + bw * 0.18}" y="${Y(b.value)}" width="${bw * 0.64}" height="${Y(0) - Y(b.value)}" rx="3"/><text x="${L + i * bw + bw / 2}" y="${H - B + 15}" text-anchor="middle">${esc(b.label)}</text>`).join('');
    return `<figure class="fig"><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${g}<line class="fa" x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}"/>${body}<text class="fl" transform="translate(13 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle">${esc(yLabel || '')}</text></svg></figure>`;
  }

  function table({ title, head, rows, note }) {
    return `<figure class="fig ftable"><figcaption>${esc(title)}</figcaption><div class="ftable-wrap"><table><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${note ? `<p class="fnote">${esc(note)}</p>` : ''}</figure>`;
  }

  // Schematic diagram with straight labeled lines and marked points, no numbers on axes
  // lines: [{ from:[x,y], to:[x,y], label, dash? }], points: [{ at:[x,y], label }], axes 0-10
  function diagram({ title, xLabel, yLabel, lines, points = [], guides = true }) {
    const f = frame({ title, xLabel, yLabel, xMin: 0, xMax: 10, yMin: 0, yMax: 10, xTicks: false, yTicks: false });
    let body = lines.map((l, i) => `<path class="fs fs${i % 4}${l.dash ? ' fd' : ''}" d="M${f.X(l.from[0])},${f.Y(l.from[1])}L${f.X(l.to[0])},${f.Y(l.to[1])}"/><text class="flab" x="${f.X(l.to[0]) + 4}" y="${f.Y(l.to[1]) - 4}">${esc(l.label)}</text>`).join('');
    body += points.map(p => `${guides ? `<line class="fguide" x1="${f.X(p.at[0])}" x2="${f.X(p.at[0])}" y1="${f.Y(p.at[1])}" y2="${f.Y(0)}"/><line class="fguide" x1="${f.X(0)}" x2="${f.X(p.at[0])}" y1="${f.Y(p.at[1])}" y2="${f.Y(p.at[1])}"/>` : ''}<circle class="fp" cx="${f.X(p.at[0])}" cy="${f.Y(p.at[1])}" r="4"/><text class="flab" x="${f.X(p.at[0]) + 6}" y="${f.Y(p.at[1]) + 14}">${esc(p.label)}</text>`).join('');
    return f.open + f.grid + body + f.close;
  }

  SW.fig = { line, bar, table, diagram, esc };

  // Question sets and generated data sets ---------------------------------
  // A data set: gen() returns { passage?, figure?, qs: [[question, [4 choices], right index, why], ...] }.
  SW.dataset = (unit, topic, gen, only) => SW.MCQ.push({ unit, topic, setGen: gen, only, q: topic, c: ['', '', '', ''], a: 0, why: '' });
  // A fixed source set: one stimulus, several questions shown together.
  let setCount = 0;
  SW.sourceSet = (unit, topic, stim, qs, only) => {
    const id = 'set' + ++setCount;
    qs.forEach(([q, c, a, why]) => SW.MCQ.push({ unit, topic, q, c, a, why, set: id, passage: stim.passage, figure: stim.figure, only }));
  };
  // Expand one bank entry into the list of questions to show.
  SW.materialize = (q, bank = SW.MCQ) => {
    if (q.setGen) {
      const out = q.setGen();
      return out.qs.map(([qq, c, a, why]) => ({ unit: q.unit, topic: q.topic, q: qq, c, a, why, passage: out.passage, figure: out.figure, set: 'gen' }));
    }
    if (q.set) return bank.filter(x => x.set === q.set);
    return [q];
  };
})();
