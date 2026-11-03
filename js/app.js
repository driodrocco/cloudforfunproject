/* Stepwise UI: practice, demo test, solver, v-t graphs, reference sheet, progress, worksheets. */
(function () {
  'use strict';
  const SW = globalThis.SW;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const unitById = id => SW.UNITS.find(u => u.id === id);
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sw:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('sw:' + k, JSON.stringify(v)); } catch { /* ignore */ } },
  };
  const stats = store.get('stats', {}); // unit -> { att, cor }
  function record(unit, correct) {
    const s = (stats[unit] = stats[unit] || { att: 0, cor: 0 });
    s.att++;
    if (correct) s.cor++;
    store.set('stats', stats);
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied'); } catch { toast('Select the text and copy it'); }
  }

  const solutionText = (out, notes) => [...out.lines, ...(notes ? out.notes.map(n => 'Note: ' + n) : [])].join('\n');
  const solutionHTML = (out, notes) =>
    `<pre class="work">${esc(out.lines.join('\n'))}${notes && out.notes.length ? '\n' + out.notes.map(n => `<em>Note: ${esc(n)}</em>`).join('\n') : ''}</pre>`;

  function weightedUnit(course) {
    const w = SW.EXAM[course].weights, total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [u, x] of Object.entries(w)) if ((r -= x) <= 0) return u;
    return Object.keys(w)[0];
  }

  function helpLinks(topic, course) {
    return `<div class="help">
      <span>Stuck?</span>
      <a href="${SW.videoLink(topic, course)}" target="_blank" rel="noopener">&#9654; Watch a video on this</a>
      <a href="${SW.EXAM[course].khan}" target="_blank" rel="noopener">Khan Academy lessons</a>
    </div>`;
  }

  // ---------- tabs ----------
  function showTab(name) {
    $$('.tabs [role=tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === name));
    $$('.tab').forEach(s => (s.hidden = s.id !== 'tab-' + name));
    if (name === 'progress') renderProgress();
    if (name === 'ref' && !$('#ref-root').children.length) renderReference();
    if (name === 'test' && !$('#test-root').children.length) renderTestStart();
    history.replaceState(null, '', '#' + name);
  }
  $$('.tabs [role=tab]').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));

  // =====================================================================
  // Practice
  // =====================================================================
  const prac = { course: store.get('course', 1), kind: 'both', unit: 'mix', notes: store.get('notes', true), current: null };

  function renderUnitList() {
    const units = SW.UNITS.filter(u => u.course === prac.course);
    const ul = $('#unit-list');
    ul.innerHTML =
      `<li><button data-unit="mix" class="${prac.unit === 'mix' ? 'on' : ''}"><span>Exam mix</span><small>weighted like the real exam</small></button></li>` +
      units.map(u => {
        const s = stats[u.id], pct = s && s.att ? Math.round((100 * s.cor) / s.att) : null;
        return `<li><button data-unit="${u.id}" class="${prac.unit === u.id ? 'on' : ''}">
          <span><b>${u.n}.</b> ${esc(u.name)}</span>
          <small>${SW.EXAM[prac.course].ranges[u.id]} of exam${pct !== null ? ` · you: ${pct}%` : ''}</small>
          ${pct !== null ? `<i class="bar"><i style="width:${pct}%"></i></i>` : ''}
        </button></li>`;
      }).join('');
    $$('button', ul).forEach(b => b.addEventListener('click', () => { prac.unit = b.dataset.unit; renderUnitList(); nextProblem(); }));
    $$('[data-course]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.course) === prac.course));
    $$('[data-kind]').forEach(b => b.setAttribute('aria-pressed', b.dataset.kind === prac.kind));
  }

  $$('[data-course]').forEach(b => b.addEventListener('click', () => {
    prac.course = Number(b.dataset.course);
    prac.unit = 'mix';
    store.set('course', prac.course);
    renderUnitList();
    nextProblem();
  }));
  $$('[data-kind]').forEach(b => b.addEventListener('click', () => { prac.kind = b.dataset.kind; renderUnitList(); nextProblem(); }));

  function nextProblem() {
    const unit = prac.unit === 'mix' ? weightedUnit(prac.course) : prac.unit;
    const mcqs = SW.MCQ.filter(q => q.unit === unit), calcs = SW.problems.filter(p => p.unit === unit);
    const useConcept = prac.kind === 'concept' || (prac.kind === 'both' && mcqs.length && Math.random() < 0.4);
    if (useConcept && mcqs.length) renderConcept(SW.pick(mcqs));
    else renderCalc(SW.pick(calcs));
  }

  function problemHeader(unit, title) {
    const u = unitById(unit);
    return `<div class="tags"><span class="tag">Unit ${u.n}: ${esc(u.name)}</span><span class="tag ghost">${esc(title)}</span></div>`;
  }

  function renderCalc(p) {
    const out = p.gen();
    const state = { tried: false, done: false };
    prac.current = out;
    const box = $('#problem');
    box.innerHTML = `${problemHeader(p.unit, p.title)}
      <p class="q">${esc(out.q)}</p>
      <form class="answer" autocomplete="off">
        <input name="a" inputmode="decimal" placeholder="Your answer${out.ans.signed ? ' (include the sign)' : ''}" aria-label="Your answer">
        <span class="unit">${esc(out.ans.unit)}</span>
        <button class="btn primary">Check</button>
      </form>
      <p class="feedback" role="status"></p>
      <div class="row">
        <button class="btn" data-act="hint">Hint</button>
        <button class="btn" data-act="show">Show solution</button>
        <button class="btn" data-act="next">Next problem &rarr;</button>
        <label class="check"><input type="checkbox" data-act="notes" ${prac.notes ? 'checked' : ''}> Show notes</label>
      </div>
      <div class="hint" hidden></div>
      <div class="solution" hidden></div>
      ${helpLinks(p.title, prac.course)}`;

    const form = $('form', box), fb = $('.feedback', box);
    const finish = correct => {
      if (!state.done) { record(p.unit, correct); state.done = true; renderUnitList(); }
    };
    const showSolution = () => {
      const sol = $('.solution', box);
      sol.hidden = false;
      sol.innerHTML = `<div class="sol-head"><h3>Worked solution</h3><button class="btn small" data-act="copy">Copy</button></div>${solutionHTML(out, prac.notes)}`;
      $('[data-act=copy]', sol).addEventListener('click', () => copy(solutionText(out, prac.notes)));
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const r = SW.check(form.a.value, out.ans);
      fb.textContent = r.msg;
      fb.className = 'feedback ' + (r.ok ? 'good' : 'bad');
      if (r.ok) { finish(!state.tried); showSolution(); } else state.tried = true;
    });
    $('[data-act=hint]', box).addEventListener('click', () => {
      const h = $('.hint', box);
      h.hidden = false;
      h.innerHTML = `<b>Formula${out.formulas.length > 1 ? 's' : ''} to use:</b><pre class="work">${esc(out.formulas.join('\n'))}</pre>`;
    });
    $('[data-act=show]', box).addEventListener('click', () => { finish(false); showSolution(); });
    $('[data-act=next]', box).addEventListener('click', nextProblem);
    $('[data-act=notes]', box).addEventListener('change', e => {
      prac.notes = e.target.checked;
      store.set('notes', prac.notes);
      if (!$('.solution', box).hidden) showSolution();
    });
    form.a.focus({ preventScroll: true });
  }

  function renderConcept(q) {
    const order = shuffle([0, 1, 2, 3]);
    const box = $('#problem');
    let done = false;
    box.innerHTML = `${problemHeader(q.unit, 'Concept question')}
      <p class="q">${esc(q.q)}</p>
      <div class="choices">${order.map((i, k) => `<button class="choice" data-i="${i}"><b>${'ABCD'[k]}</b> ${esc(q.c[i])}</button>`).join('')}</div>
      <p class="feedback" role="status"></p>
      <div class="solution" hidden></div>
      <div class="row"><button class="btn" data-act="next">Next problem &rarr;</button></div>
      ${helpLinks(q.topic, unitById(q.unit).course)}`;
    $$('.choice', box).forEach(b => b.addEventListener('click', () => {
      if (done) return;
      done = true;
      const ok = Number(b.dataset.i) === q.a;
      record(q.unit, ok);
      renderUnitList();
      $$('.choice', box).forEach(c => {
        c.disabled = true;
        if (Number(c.dataset.i) === q.a) c.classList.add('right');
      });
      if (!ok) b.classList.add('wrong');
      const fb = $('.feedback', box);
      fb.textContent = ok ? 'Correct!' : 'Not quite.';
      fb.className = 'feedback ' + (ok ? 'good' : 'bad');
      const sol = $('.solution', box);
      sol.hidden = false;
      sol.innerHTML = `<p class="why"><b>Why:</b> ${esc(q.why)}</p>`;
    }));
    $('[data-act=next]', box).addEventListener('click', nextProblem);
  }

  // =====================================================================
  // Demo test
  // =====================================================================
  const LEVELS = {
    5: 'Extremely well qualified',
    4: 'Well qualified',
    3: 'Qualified',
    2: 'Possibly qualified',
    1: 'Not yet qualified',
  };

  function renderTestStart() {
    const root = $('#test-root');
    root.innerHTML = `<div class="card">
      <h2>Demo test</h2>
      <p class="muted">A multiple-choice test with topics weighted like the real exam. At the end you get your level, a predicted AP score, and your strongest and weakest units.</p>
      <div class="row">
        <div class="seg" role="group" aria-label="Course">
          <button data-tc="1" aria-pressed="true">AP Physics 1</button>
          <button data-tc="2" aria-pressed="false">AP Physics 2</button>
        </div>
        <label class="field inline"><span>Length</span>
          <select id="test-len">
            <option value="10">10 questions (quick, ~20 min)</option>
            <option value="20" selected>20 questions (~40 min)</option>
            <option value="40">40 questions (full MC section, 80 min)</option>
          </select>
        </label>
      </div>
      <div id="test-info" class="info"></div>
      <button id="test-start" class="btn primary big">Start test</button>
    </div>`;
    let course = 1;
    const info = () => {
      const ex = SW.EXAM[course];
      $('#test-info').innerHTML = `<p><b>Real ${ex.name} exam:</b> ${ex.format}.</p>
        <p class="muted small">Unit weights: ${Object.entries(ex.ranges).map(([u, r]) => `${esc(unitById(u).name)} ${r}`).join(' · ')}</p>`;
    };
    $$('[data-tc]', root).forEach(b => b.addEventListener('click', () => {
      course = Number(b.dataset.tc);
      $$('[data-tc]', root).forEach(x => x.setAttribute('aria-pressed', x === b));
      info();
    }));
    info();
    $('#test-start').addEventListener('click', () => startTest(course, Number($('#test-len').value)));
  }

  // Turns a numeric problem into a 4-choice question using common-mistake distractors.
  function numericChoices(ans) {
    const f = x => `${ans.signed ? SW.sg(x) : SW.num(x)} ${ans.unit}`;
    const v = ans.v, right = f(v);
    const pool = shuffle([v * 2, v / 2, v * SW.R(1.3, 1.7, 0.05), v * SW.R(0.55, 0.75, 0.05), v * 4, Math.sqrt(Math.abs(v)) * Math.sign(v) || v + 1]);
    if (ans.signed) pool.unshift(-v);
    const opts = [right];
    for (const x of pool) {
      const s = f(SW.r3(x));
      if (Number.isFinite(x) && x !== 0 && !opts.includes(s)) opts.push(s);
      if (opts.length === 4) break;
    }
    const c = shuffle(opts);
    return { c, a: c.indexOf(right) };
  }

  function buildTest(course, n) {
    const qs = [];
    const usedMcq = new Set();
    for (let i = 0; i < n; i++) {
      const unit = weightedUnit(course);
      const mcqs = SW.MCQ.filter(q => q.unit === unit && !usedMcq.has(q));
      if (mcqs.length && Math.random() < 0.55) {
        const q = SW.pick(mcqs);
        usedMcq.add(q);
        const order = shuffle([0, 1, 2, 3]);
        qs.push({ unit, topic: q.topic, q: q.q, c: order.map(i => q.c[i]), a: order.indexOf(q.a), why: q.why });
      } else {
        const p = SW.pick(SW.problems.filter(x => x.unit === unit));
        const out = p.gen();
        qs.push({ unit, topic: p.title, q: out.q, ...numericChoices(out.ans), out });
      }
    }
    // Real exams roughly go in unit order
    return qs.sort((a, b) => unitById(a.unit).n - unitById(b.unit).n);
  }

  function startTest(course, n) {
    const t = { course, qs: buildTest(course, n), picks: Array(n).fill(null), i: 0, start: Date.now() };
    const root = $('#test-root');
    const limit = n * 2 * 60; // the real exam gives about 2 minutes per question
    let timer;
    const draw = () => {
      const q = t.qs[t.i], answered = t.picks.filter(x => x !== null).length;
      root.innerHTML = `<div class="card">
        <div class="test-top">
          <span>Question <b>${t.i + 1}</b> of ${n}</span>
          <span class="clock" aria-live="off"></span>
        </div>
        <div class="progress"><i style="width:${(100 * answered) / n}%"></i></div>
        ${problemHeader(q.unit, q.out ? 'Calculation' : 'Concept')}
        <p class="q">${esc(q.q)}</p>
        <div class="choices">${q.c.map((c, k) => `<button class="choice ${t.picks[t.i] === k ? 'picked' : ''}" data-k="${k}"><b>${'ABCD'[k]}</b> ${esc(c)}</button>`).join('')}</div>
        <div class="row spread">
          <button class="btn" data-act="prev" ${t.i === 0 ? 'disabled' : ''}>&larr; Back</button>
          <div class="dots">${t.qs.map((_, k) => `<button class="dot ${t.picks[k] !== null ? 'done' : ''} ${k === t.i ? 'here' : ''}" data-go="${k}" aria-label="Question ${k + 1}"></button>`).join('')}</div>
          ${t.i < n - 1 ? '<button class="btn primary" data-act="next">Next &rarr;</button>' : '<button class="btn primary" data-act="submit">Submit test</button>'}
        </div>
      </div>`;
      $$('.choice', root).forEach(b => b.addEventListener('click', () => {
        t.picks[t.i] = Number(b.dataset.k);
        if (t.i < n - 1) t.i++;
        draw();
      }));
      $$('[data-go]', root).forEach(b => b.addEventListener('click', () => { t.i = Number(b.dataset.go); draw(); }));
      const nav = (sel, fn) => { const b = $(sel, root); if (b) b.addEventListener('click', fn); };
      nav('[data-act=prev]', () => { t.i--; draw(); });
      nav('[data-act=next]', () => { t.i++; draw(); });
      nav('[data-act=submit]', () => {
        const left = t.picks.filter(x => x === null).length;
        if (left && !confirm(`You have ${left} unanswered question${left > 1 ? 's' : ''}. Submit anyway?`)) return;
        clearInterval(timer);
        finishTest(t);
      });
      tick();
    };
    const tick = () => {
      const s = Math.floor((Date.now() - t.start) / 1000), c = $('.clock', root);
      if (c) {
        c.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} / ${limit / 60}:00 suggested`;
        c.classList.toggle('over', s > limit);
      }
    };
    timer = setInterval(tick, 1000);
    draw();
  }

  function finishTest(t) {
    const n = t.qs.length, byUnit = {};
    let right = 0;
    t.qs.forEach((q, k) => {
      const ok = t.picks[k] === q.a;
      if (ok) right++;
      const u = (byUnit[q.unit] = byUnit[q.unit] || { att: 0, cor: 0 });
      u.att++;
      if (ok) u.cor++;
      record(q.unit, ok);
    });
    const pct = Math.round((100 * right) / n), score = SW.predictScore(pct);
    const mins = Math.round((Date.now() - t.start) / 60000);
    const history = store.get('tests', []);
    history.push({ date: Date.now(), course: t.course, n, right, pct, score, mins });
    store.set('tests', history);

    const ex = SW.EXAM[t.course];
    const ranked = Object.entries(byUnit).map(([u, s]) => ({ u, ...s, pct: Math.round((100 * s.cor) / s.att) })).sort((a, b) => b.pct - a.pct || b.att - a.att);
    const dist = ex.dist;
    $('#test-root').innerHTML = `<div class="card result">
        <div class="score-big s${score}">
          <span class="num">${score}</span>
          <span class="lbl">Predicted AP score</span>
        </div>
        <div>
          <h2>${LEVELS[score]}</h2>
          <p><b>${right} of ${n}</b> correct (${pct}%) in ${mins} min.</p>
          <p class="muted small">This is an estimate from multiple-choice practice only. The real exam also has free-response questions (half the score), and the College Board does not publish exact cutoffs.${dist ? ` For context: in ${dist.year}, ${dist[5]}% of ${ex.name} students earned a 5, ${dist[4]}% a 4, and ${dist[3]}% a 3 (mean ${dist.mean}).` : ''}</p>
        </div>
      </div>
      <div class="card">
        <h3>By unit</h3>
        ${unitBars(ranked)}
        ${strongWeak(ranked)}
      </div>
      <div class="card">
        <h3>Review</h3>
        ${t.qs.map((q, k) => {
          const ok = t.picks[k] === q.a;
          return `<details class="review ${ok ? 'ok' : 'miss'}" ${ok ? '' : 'open'}>
            <summary><span class="mark">${ok ? '&#10003;' : '&#10007;'}</span> Q${k + 1}. ${esc(q.q)}</summary>
            <p>Your answer: <b>${t.picks[k] === null ? 'blank' : esc(q.c[t.picks[k]])}</b>${ok ? '' : ` · Correct: <b>${esc(q.c[q.a])}</b>`}</p>
            ${q.out ? solutionHTML(q.out, true) : `<p class="why"><b>Why:</b> ${esc(q.why)}</p>`}
            ${ok ? '' : helpLinks(q.topic, t.course)}
          </details>`;
        }).join('')}
      </div>
      <div class="row"><button class="btn primary" id="again">Take another test</button>
      <a class="btn" href="${ex.past}" target="_blank" rel="noopener">Real released AP questions (College Board)</a></div>`;
    $('#again').addEventListener('click', renderTestStart);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderUnitList();
  }

  function unitBars(rows) {
    return `<div class="bars">${rows.map(r => `<div class="bar-row">
      <span class="name">${unitById(r.u).n}. ${esc(unitById(r.u).name)}</span>
      <span class="track"><i class="${r.pct >= 70 ? 'hi' : r.pct >= 45 ? 'mid' : 'lo'}" style="width:${Math.max(r.pct, 2)}%"></i></span>
      <span class="val">${r.pct}% <small>(${r.cor}/${r.att})</small></span>
    </div>`).join('')}</div>`;
  }

  function strongWeak(ranked, minAtt = 1) {
    const ok = ranked.filter(r => r.att >= minAtt);
    if (ok.length < 2) return '';
    // ranked is best-first. Strong = top units at 50% or better; weak = lowest units under 70%.
    const strong = ok.filter(r => r.pct >= 50).slice(0, 3);
    const weak = ok.slice().reverse().filter(r => r.pct < 70 && !strong.includes(r)).slice(0, 3);
    const li = r => `<li><b>${esc(unitById(r.u).name)}</b> <span class="muted">${r.pct}%</span></li>`;
    const practice = r => li(r).replace('</li>', ` <button class="btn small" data-practice="${r.u}">Practice</button></li>`);
    return `<div class="sw">
      <div class="strong"><h4>Strongest</h4>${strong.length ? `<ul>${strong.map(li).join('')}</ul>` : '<p class="small">No unit at 50% or higher yet. Keep going!</p>'}</div>
      <div class="weak"><h4>Needs work</h4>${weak.length ? `<ul>${weak.map(practice).join('')}</ul>` : '<p class="small">Nothing under 70%. Nice work!</p>'}</div>
    </div>`;
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-practice]');
    if (!b) return;
    const u = unitById(b.dataset.practice);
    prac.course = u.course;
    prac.unit = u.id;
    renderUnitList();
    nextProblem();
    showTab('practice');
  });

  // =====================================================================
  // Progress
  // =====================================================================
  function renderProgress() {
    const root = $('#progress-root');
    const tests = store.get('tests', []);
    const section = course => {
      const rows = SW.UNITS.filter(u => u.course === course && stats[u.id] && stats[u.id].att)
        .map(u => ({ u: u.id, ...stats[u.id], pct: Math.round((100 * stats[u.id].cor) / stats[u.id].att) }))
        .sort((a, b) => b.pct - a.pct || b.att - a.att);
      const total = rows.reduce((a, r) => a + r.att, 0);
      if (!total) return `<div class="card"><h3>${SW.EXAM[course].name}</h3><p class="muted">No questions answered yet. Try the Practice tab or a demo test.</p></div>`;
      const untried = SW.UNITS.filter(u => u.course === course && !(stats[u.id] && stats[u.id].att));
      return `<div class="card"><h3>${SW.EXAM[course].name} <small class="muted">${total} questions answered</small></h3>
        ${unitBars(rows)}
        ${strongWeak(rows, 3) || '<p class="muted small">Answer at least 3 questions in two or more units to see your strongest and weakest.</p>'}
        ${untried.length ? `<p class="muted small">Not tried yet: ${untried.map(u => `<button class="link" data-practice="${u.id}">${esc(u.name)}</button>`).join(', ')}</p>` : ''}
      </div>`;
    };
    root.innerHTML = `${section(1)}${section(2)}
      <div class="card"><h3>Demo test history</h3>
        ${tests.length ? `<table class="hist"><thead><tr><th>Date</th><th>Course</th><th>Score</th><th>Correct</th><th>Predicted</th></tr></thead><tbody>
          ${tests.slice().reverse().map(x => `<tr><td>${new Date(x.date).toLocaleDateString()}</td><td>AP ${x.course}</td><td>${x.pct}%</td><td>${x.right}/${x.n}</td><td><b>${x.score}</b></td></tr>`).join('')}
        </tbody></table>${trend(tests)}` : '<p class="muted">No tests yet.</p>'}
      </div>
      <button class="btn small danger" id="reset">Reset all progress</button>`;
    $('#reset').addEventListener('click', () => {
      if (!confirm('Erase all your practice stats and test history?')) return;
      Object.keys(stats).forEach(k => delete stats[k]);
      store.set('stats', stats);
      store.set('tests', []);
      renderProgress();
      renderUnitList();
    });
  }

  function trend(tests) {
    if (tests.length < 2) return '';
    const last = tests.slice(-10), w = 300, h = 80;
    const pts = last.map((t, i) => `${(i / (last.length - 1)) * w},${h - (t.pct / 100) * h}`).join(' ');
    return `<svg class="trend" viewBox="-6 -6 ${w + 12} ${h + 12}" role="img" aria-label="Test scores over time"><polyline points="${pts}"/>${last.map((t, i) => `<circle cx="${(i / (last.length - 1)) * w}" cy="${h - (t.pct / 100) * h}" r="4"/>`).join('')}</svg>`;
  }

  // =====================================================================
  // Formula solver
  // =====================================================================
  const eqSelect = $('#eq-select'), eqSearch = $('#eq-search');
  function fillEquations(filter = '') {
    const f = filter.trim().toLowerCase();
    const prev = eqSelect.value;
    eqSelect.innerHTML = SW.UNITS.map(u => {
      const eqs = SW.EQUATIONS.map((e, i) => ({ e, i })).filter(({ e }) => e.unit === u.id &&
        (!f || (e.name + ' ' + e.tpl + ' ' + u.name).toLowerCase().includes(f)));
      return eqs.length ? `<optgroup label="${u.course === 1 ? 'AP1' : 'AP2'} Unit ${u.n}: ${esc(u.name)}">${eqs.map(({ e, i }) =>
        `<option value="${i}">${esc(e.name)}:  ${esc(e.tpl.replace(/[{}]/g, ''))}</option>`).join('')}</optgroup>` : '';
    }).join('');
    if ([...eqSelect.options].some(o => o.value === prev)) eqSelect.value = prev;
    renderEqForm();
  }

  function renderEqForm() {
    const eq = SW.EQUATIONS[eqSelect.value];
    const form = $('#eq-form');
    $('#eq-out').innerHTML = '';
    if (!eq) { form.innerHTML = '<p class="muted">No equations match.</p>'; return; }
    const names = Object.keys(eq.vars);
    const firstFree = names.find(n => SW.varFlags(eq.vars[n]).c == null);
    form.innerHTML = `<p class="eq-big">${esc(eq.tpl.replace(/[{}]/g, ''))}</p>
      <form class="vars" autocomplete="off">
        ${names.map(n => {
          const [label, unit] = eq.vars[n], fl = SW.varFlags(eq.vars[n]);
          return `<div class="var">
            <label class="radio" title="Solve for ${esc(n)}"><input type="radio" name="unknown" value="${n}" ${n === firstFree ? 'checked' : ''}><span>solve</span></label>
            <label class="vlabel" for="v-${n}"><b>${esc(n)}</b> <small>${esc(label)}</small></label>
            <input id="v-${n}" name="${n}" inputmode="decimal" value="${fl.c != null ? esc(SW.g(fl.c)) : ''}" placeholder="${fl.vec ? '+ or -' : ''}">
            <span class="unit">${esc(unit)}</span>
          </div>`;
        }).join('')}
        <button class="btn primary">Solve</button>
      </form>
      <p class="muted small">Numbers like <code>6.67 x 10^-11</code> or <code>6.67e-11</code> both work. Use + and - for directions.</p>`;
    const f = $('form', form);
    const sync = () => names.forEach(n => {
      const isUnknown = f.unknown.value === n, inp = f[n];
      inp.disabled = isUnknown;
      inp.closest('.var').classList.toggle('unknown', isUnknown);
      if (isUnknown) inp.value = '';
    });
    $$('input[name=unknown]', f).forEach(r => r.addEventListener('change', sync));
    sync();
    f.addEventListener('submit', e => {
      e.preventDefault();
      const unknown = f.unknown.value, known = {};
      for (const n of names) {
        if (n === unknown) continue;
        const x = SW.parseNum(f[n].value);
        if (!Number.isFinite(x)) { toast(`Fill in ${n}`); f[n].focus(); return; }
        known[n] = x;
      }
      const res = SW.solveEquation(eq, known, unknown);
      const text = res.lines.join('\n');
      $('#eq-out').innerHTML = `<div class="card"><div class="sol-head"><h3>Worked solution</h3><button class="btn small" id="eq-copy">Copy</button></div><pre class="work">${esc(text)}</pre>${helpLinks(eq.name, unitById(eq.unit).course)}</div>`;
      $('#eq-copy').addEventListener('click', () => copy(text));
    });
  }
  eqSearch.addEventListener('input', () => fillEquations(eqSearch.value));
  eqSelect.addEventListener('change', renderEqForm);

  // =====================================================================
  // v-t graphs
  // =====================================================================
  function plot(title, pts, { yUnit, step = false } = {}) {
    const W = 320, H = 180, L = 44, B = 28, T = 12, Rr = 10;
    const ts = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    let yMin = Math.min(0, ...ys), yMax = Math.max(0, ...ys);
    if (yMax - yMin < 1e-9) { yMax += 1; yMin -= 1; }
    const pad = (yMax - yMin) * 0.1;
    yMin -= pad; yMax += pad;
    const tMax = Math.max(...ts) || 1;
    const X = t => L + (t / tMax) * (W - L - Rr), Y = y => T + ((yMax - y) / (yMax - yMin)) * (H - T - B);
    const nice = span => { const p = 10 ** Math.floor(Math.log10(span / 4)); return [1, 2, 5, 10].map(m => m * p).find(s => span / s <= 6); };
    const ys0 = nice(yMax - yMin), ts0 = nice(tMax);
    let grid = '';
    for (let y = Math.ceil(yMin / ys0) * ys0; y <= yMax; y += ys0) grid += `<line class="g" x1="${L}" x2="${W - Rr}" y1="${Y(y)}" y2="${Y(y)}"/><text x="${L - 6}" y="${Y(y) + 4}" text-anchor="end">${+y.toFixed(6)}</text>`;
    for (let t = 0; t <= tMax + 1e-9; t += ts0) grid += `<line class="g" y1="${T}" y2="${H - B}" x1="${X(t)}" x2="${X(t)}"/><text x="${X(t)}" y="${H - B + 16}" text-anchor="middle">${+t.toFixed(6)}</text>`;
    let d = '';
    if (step) pts.forEach(([t, y], i) => { d += (i ? `L${X(t)},${Y(pts[i - 1][1])}L` : 'M') + `${X(t)},${Y(y)}`; });
    else d = pts.map(([t, y], i) => `${i ? 'L' : 'M'}${X(t)},${Y(y)}`).join('');
    return `<figure class="plot"><figcaption>${title}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
      ${grid}<line class="axis" x1="${L}" x2="${W - Rr}" y1="${Y(0)}" y2="${Y(0)}"/><line class="axis" x1="${L}" x2="${L}" y1="${T}" y2="${H - B}"/>
      <path d="${d}"/><text class="ax" x="${W - Rr}" y="${H - 2}" text-anchor="end">t (s)</text><text class="ax" x="4" y="${T}" >${yUnit}</text></svg></figure>`;
  }

  function vtSolve(points, name) {
    const { num, sg, sgv, g, r3 } = SW;
    const V = x => (x === 0 ? '0' : sgv(x));
    const segs = [];
    for (let i = 0; i < points.length - 1; i++) {
      const [t0, v0] = points[i], [t1, v1] = points[i + 1];
      segs.push({ t0, t1, v0, v1, dt: r3(t1 - t0), a: r3((v1 - v0) / (t1 - t0)) });
    }
    // part a: describe
    const dir = v => (v > 0 ? 'moving right' : v < 0 ? 'moving left' : 'at rest');
    const desc = [`${name} starts at ${V(points[0][1])} m/s (${dir(points[0][1])}).`];
    segs.forEach(s => {
      if (s.v0 * s.v1 < 0) {
        const tz = r3(s.t0 + (s.dt * Math.abs(s.v0)) / (Math.abs(s.v0) + Math.abs(s.v1)));
        desc.push(`It stops at t = ${g(tz)} s and turns around.`);
      } else if (s.v1 === 0 && s.v0 !== 0) desc.push(`It stops at t = ${g(s.t1)} s.`);
      else if (s.v0 === s.v1) desc.push(`From ${g(s.t0)} s to ${g(s.t1)} s it moves at a constant ${V(s.v0)} m/s.`);
    });
    const last = points[points.length - 1];
    desc.push(`It ends at ${V(last[1])} m/s (${dir(last[1])}).`);

    // part b: displacement
    const b = ['Constant a', 'Right = +', ''];
    const xs = [];
    const segWork = (label, s, out) => {
      out.push(`${label} (${g(s.t0)} to ${g(s.t1)} s): V0x = ${V(s.v0)} m/s, Vx = ${V(s.v1)} m/s, t = ${g(s.dt)} s`);
      let x;
      if (s.v0 === s.v1) {
        x = r3(s.v0 * s.dt);
        out.push('v = x/t', `(${V(s.v0)} m/s) = x/(${g(s.dt)} s)`, `x = ${x === 0 ? '0' : sg(x)} m`);
      } else {
        out.push('Vx = V0x + at', `(${V(s.v1)} m/s) = (${V(s.v0)} m/s) + a(${g(s.dt)} s)`, `a = ${sg(s.a)} m/s^2`);
        x = r3(s.v0 * s.dt + 0.5 * s.a * s.dt * s.dt);
        out.push('x = V0xt + 1/2at^2', `x = (${V(s.v0)} m/s)(${g(s.dt)} s) + 1/2(${sg(s.a)} m/s^2)(${g(s.dt)} s)^2`, `x = ${x === 0 ? '0' : sg(x)} m`);
      }
      out.push('');
      return x;
    };
    segs.forEach((s, i) => xs.push(segWork(`Segment ${i + 1}`, s, b)));
    const disp = r3(xs.reduce((a, x) => a + x, 0));
    if (xs.length > 1) b.push(`total displacement = ${xs.map(x => `(${sg(x)} m)`).join(' + ')} = ${sg(disp)} m`);
    else b.pop();

    // part c: distance (split wherever it turns around)
    const pieces = [];
    segs.forEach(s => {
      if (s.v0 * s.v1 < 0) {
        const tz = r3(s.t0 + (s.dt * Math.abs(s.v0)) / (Math.abs(s.v0) + Math.abs(s.v1)));
        pieces.push({ t0: s.t0, t1: tz, v0: s.v0, v1: 0, dt: r3(tz - s.t0), a: s.a }, { t0: tz, t1: s.t1, v0: 0, v1: s.v1, dt: r3(s.t1 - tz), a: s.a });
      } else pieces.push(s);
    });
    const c = [];
    let dist;
    const turns = new Set(points.map(p => Math.sign(p[1])).filter(s => s !== 0)).size > 1;
    if (!turns) {
      dist = Math.abs(disp);
      c.push(`${name} doesn't turn around so distance = ${num(dist)} m`);
    } else {
      const sizes = pieces.map((p, i) => Math.abs(segWork(`Piece ${i + 1}`, p, c)));
      dist = r3(sizes.reduce((a, x) => a + x, 0));
      c.push(`distance = ${sizes.map(x => `${num(x)} m`).join(' + ')} = ${num(dist)} m`);
    }
    const d = `Distance equals the size of the displacement only when the object never turns around. Here distance = ${num(dist)} m and |displacement| = ${num(Math.abs(disp))} m${Math.abs(dist - Math.abs(disp)) < 1e-9 ? ', so they match.' : ', so they are different.'}`;
    return { desc, b, c, d, segs };
  }

  function renderVT() {
    const name = $('#vt-name').value.trim() || 'Car 1';
    const pts = $('#vt-points').value.split('\n').map(l => l.split(/[,\s]+/).filter(Boolean).map(Number)).filter(p => p.length === 2 && p.every(Number.isFinite));
    pts.sort((a, b) => a[0] - b[0]);
    const out = $('#vt-out');
    if (pts.length < 2 || pts.some((p, i) => i && p[0] === pts[i - 1][0])) {
      out.innerHTML = '<div class="card"><p class="bad">Enter at least two points with different times, like <code>0, 5</code>.</p></div>';
      return;
    }
    const w = vtSolve(pts, name);
    // x-t curve by integrating each segment
    const xt = [[pts[0][0], 0]];
    let x = 0;
    w.segs.forEach(s => {
      for (let k = 1; k <= 20; k++) {
        const tau = (s.dt * k) / 20;
        xt.push([s.t0 + tau, x + s.v0 * tau + 0.5 * s.a * tau * tau]);
      }
      x += s.v0 * s.dt + 0.5 * s.a * s.dt * s.dt;
    });
    const at = [];
    w.segs.forEach(s => { at.push([s.t0, s.a]); });
    at.push([pts[pts.length - 1][0], w.segs[w.segs.length - 1].a]);
    const all = ['a) Describe', ...w.desc, '', 'b) Displacement', ...w.b, '', 'c) Distance', ...w.c, '', 'd) Compare', w.d].join('\n');
    out.innerHTML = `<div class="card"><div class="plots">
        ${plot('Position vs. time (starting at x = 0)', xt, { yUnit: 'x (m)' })}
        ${plot('Velocity vs. time', pts, { yUnit: 'v (m/s)' })}
        ${plot('Acceleration vs. time', at, { yUnit: 'a (m/s^2)', step: true })}
      </div></div>
      <div class="card"><div class="sol-head"><h3>Worked solution</h3><button class="btn small" id="vt-copy">Copy</button></div>
        <h4>a) Describe the motion</h4><p>${w.desc.map(esc).join(' ')}</p>
        <h4>b) Displacement</h4><pre class="work">${esc(w.b.join('\n'))}</pre>
        <h4>c) Distance</h4><pre class="work">${esc(w.c.join('\n'))}</pre>
        <h4>d) Compare</h4><p>${esc(w.d)}</p>
        ${helpLinks('velocity time graph displacement distance', 1)}
      </div>`;
    $('#vt-copy').addEventListener('click', () => copy(all));
  }
  $('#vt-go').addEventListener('click', renderVT);

  // =====================================================================
  // Reference sheet
  // =====================================================================
  function renderReference() {
    const consts = [
      ['g', 'Gravitational field near Earth', '9.8 m/s^2'],
      ['G', 'Universal gravitational constant', '6.67 x 10^-11 N m^2/kg^2'],
      ['k', 'Coulomb constant', '9.0 x 10^9 N m^2/C^2'],
      ['e', 'Elementary charge', '1.6 x 10^-19 C'],
      ['me', 'Electron mass', '9.11 x 10^-31 kg'],
      ['mp', 'Proton mass', '1.67 x 10^-27 kg'],
      ['eps0', 'Vacuum permittivity', '8.85 x 10^-12 C^2/(N m^2)'],
      ['u0', 'Vacuum permeability', '4pi x 10^-7 T m/A'],
      ['c', 'Speed of light', '3.0 x 10^8 m/s'],
      ['h', 'Planck constant', '6.63 x 10^-34 J s = 4.14 x 10^-15 eV s'],
      ['hc', '', '1240 eV nm'],
      ['R', 'Gas constant', '8.31 J/(mol K)'],
      ['kB', 'Boltzmann constant', '1.38 x 10^-23 J/K'],
      ['1 atm', 'Atmospheric pressure', '1.0 x 10^5 Pa'],
      ['1 eV', 'Electron volt', '1.6 x 10^-19 J'],
      ['rho water', 'Density of water', '1000 kg/m^3'],
      ['v sound', 'Speed of sound in air', '343 m/s'],
    ];
    const inertias = [['Point mass', 'mr^2'], ['Hoop (about center)', 'MR^2'], ['Solid disk or cylinder', '1/2MR^2'], ['Solid sphere', '2/5MR^2'], ['Hollow sphere', '2/3MR^2'], ['Rod about center', '1/12ML^2'], ['Rod about end', '1/3ML^2']];
    const section = course => SW.UNITS.filter(u => u.course === course).map(u => `
      <div class="ref-unit"><h4>${u.n}. ${esc(u.name)}</h4><table>
        ${SW.EQUATIONS.filter(e => e.unit === u.id).map(e => `<tr><td class="eqn">${esc(e.tpl.replace(/[{}]/g, ''))}</td><td class="muted">${esc(e.name)}</td></tr>`).join('')}
      </table></div>`).join('');
    $('#ref-root').innerHTML = `<div class="card ref">
      <div class="sol-head no-print"><h2>Reference sheet</h2><button class="btn small" id="ref-print">Print</button></div>
      <p class="muted small no-print">Every formula Stepwise uses, in plain keyboard characters. On test day you get the official College Board equation sheet, which is written a bit differently. Check it on AP Central: <a href="${SW.EXAM[1].past}" target="_blank" rel="noopener">AP Physics 1</a>, <a href="${SW.EXAM[2].past}" target="_blank" rel="noopener">AP Physics 2</a>.</p>
      <h3>Constants</h3>
      <table class="consts">${consts.map(c => `<tr><td><b>${esc(c[0])}</b></td><td>${esc(c[1])}</td><td class="eqn">${esc(c[2])}</td></tr>`).join('')}</table>
      <h3>Rotational inertia</h3>
      <table class="consts">${inertias.map(c => `<tr><td>${esc(c[0])}</td><td class="eqn">I = ${esc(c[1])}</td></tr>`).join('')}</table>
      <h3>Sign conventions (class format)</h3>
      <ul class="tight"><li>Dropped or thrown down: Down = +, a = +9.8 m/s^2</li><li>Thrown up: Up = +, a = -9.8 m/s^2</li><li>Horizontal motion and graphs: Right = +</li><li>Rotation: Counterclockwise = +</li><li>Thermodynamics: W is work done ON the gas</li></ul>
      <h3 class="course-h">AP Physics 1</h3><div class="ref-grid">${section(1)}</div>
      <h3 class="course-h">AP Physics 2</h3><div class="ref-grid">${section(2)}</div>
    </div>`;
    $('#ref-print').addEventListener('click', () => window.print());
  }

  // =====================================================================
  // Worksheet maker
  // =====================================================================
  $('#sheet-units').innerHTML = [1, 2].map(c => `<fieldset><legend>${SW.EXAM[c].name}</legend>${SW.UNITS.filter(u => u.course === c).map(u =>
    `<label class="check"><input type="checkbox" value="${u.id}" ${u.id === 'kin' ? 'checked' : ''}> ${u.n}. ${esc(u.name)}</label>`).join('')}</fieldset>`).join('');
  $('#sheet-go').addEventListener('click', () => {
    const units = $$('#sheet-units input:checked').map(i => i.value);
    if (!units.length) return toast('Pick at least one unit');
    const n = Number($('#sheet-count').value), key = $('#sheet-key').checked, notes = $('#sheet-notes').checked;
    const pool = SW.problems.filter(p => units.includes(p.unit));
    const picks = [];
    let bag = [];
    for (let i = 0; i < n; i++) {
      if (!bag.length) bag = shuffle(pool.slice()); // avoid repeats until every type was used
      const p = bag.pop();
      picks.push({ p, out: p.gen() });
    }
    const names = units.map(u => unitById(u).name).join(', ');
    $('#sheet-out').innerHTML = `<div class="page">
        <h2>Practice set</h2><p class="muted">${esc(names)}</p><p>Name: ____________________ &nbsp; Date: __________</p>
        <ol class="sheet-q">${picks.map(({ out }) => `<li><p>${esc(out.q)}</p><div class="space"></div></li>`).join('')}</ol>
      </div>
      ${key ? `<div class="page key"><h2>Answer key</h2>
        <ol class="sheet-q">${picks.map(({ out }) => `<li><p>${esc(out.q)}</p>${solutionHTML(out, notes)}</li>`).join('')}</ol>
        <h3>Numerical Solutions</h3>
        <ol class="nums">${picks.map(({ out }) => `<li>${esc((out.ans.signed ? SW.sg(out.ans.v) : SW.num(out.ans.v)) + ' ' + out.ans.unit)}</li>`).join('')}</ol>
      </div>` : ''}`;
    $('#sheet-print').hidden = false;
  });
  $('#sheet-print').addEventListener('click', () => window.print());

  // ---------- start ----------
  renderUnitList();
  nextProblem();
  fillEquations();
  const start = location.hash.slice(1);
  if (['practice', 'test', 'solver', 'graph', 'ref', 'progress', 'sheet'].includes(start)) showTab(start);
})();
