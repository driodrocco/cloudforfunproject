/* Hush UI: cards, presets, sharing, timer and visualizer. Audio lives in engine.js. */
(function () {
  'use strict';

  const SOUNDS = [
    { id: 'rain', name: 'Rain', hue: 205, icon: '<path d="M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3"/><path d="M8 19v2M8 13v2M16 19v2M16 13v2M12 21v1M12 15v2"/>' },
    { id: 'thunder', name: 'Thunder', hue: 265, icon: '<path d="M13 2 4 14h8l-1 8 9-12h-8z"/>' },
    { id: 'wind', name: 'Wind', hue: 175, icon: '<path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/>' },
    { id: 'waves', name: 'Waves', hue: 195, icon: '<path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>' },
    { id: 'stream', name: 'Stream', hue: 185, icon: '<path d="M12 2.7 17.7 8.3a8 8 0 1 1-11.3 0z"/>' },
    { id: 'birds', name: 'Birds', hue: 95, icon: '<path d="M16 7h.01M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.3-2.3L2 20M20 7l2 .5-2 .5M10 18v3M14 17.8V21M7 18a6 6 0 0 0 3.8-10.6"/>' },
    { id: 'crickets', name: 'Night', hue: 235, icon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>' },
    { id: 'fire', name: 'Campfire', hue: 22, icon: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 2-5 5-5 8 0 4 3 7 7 7z"/>' },
    { id: 'cafe', name: 'Café', hue: 35, icon: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zM6 2v3M10 2v3M14 2v3"/>' },
    { id: 'white', name: 'White noise', hue: 220, icon: '<path d="M2 12h2l2-6 3 12 3-14 3 16 3-10 2 4h2"/>' },
    { id: 'pink', name: 'Pink noise', hue: 330, icon: '<path d="M2 12h3l2-4 3 8 3-10 3 10 2-4h4"/>' },
    { id: 'brown', name: 'Brown noise', hue: 28, icon: '<path d="M2 12h4l2-3 3 6 3-6 3 5 1-2h4"/>' },
  ];

  const PRESETS = [
    { name: 'Rainy café', mix: { rain: 0.55, cafe: 0.5, thunder: 0.2 } },
    { name: 'Campfire night', mix: { fire: 0.7, crickets: 0.45, wind: 0.2 } },
    { name: 'Ocean storm', mix: { waves: 0.75, wind: 0.45, rain: 0.4, thunder: 0.35 } },
    { name: 'Forest morning', mix: { birds: 0.6, stream: 0.5, wind: 0.2 } },
    { name: 'Deep focus', mix: { brown: 0.55, rain: 0.25 } },
    { name: 'Sleep', mix: { pink: 0.35, waves: 0.3 } },
  ];

  const $ = sel => document.querySelector(sel);
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
    },
  };

  const state = { vols: {}, last: {}, master: 0.8, muted: false, timerLeft: 0 };
  const cards = {};
  const playBtn = $('#play'), masterRange = $('#master'), timerSel = $('#timer');

  const anyOn = () => SOUNDS.some(s => state.vols[s.id] > 0);
  const mixKey = mix => SOUNDS.filter(s => mix[s.id] > 0).map(s => s.id + Math.round(mix[s.id] * 100)).join();

  // ---------- sound cards ----------

  function buildCards() {
    const grid = $('#grid');
    for (const s of SOUNDS) {
      const el = document.createElement('div');
      el.className = 'card';
      el.style.setProperty('--hue', s.hue);
      el.innerHTML =
        `<button class="toggle" type="button" aria-pressed="false">` +
        `<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke">${s.icon}</svg><span>${s.name}</span></button>` +
        `<input type="range" min="0" max="100" value="0" aria-label="${s.name} volume">`;
      const btn = el.querySelector('button'), range = el.querySelector('input');
      btn.addEventListener('click', () => setVol(s.id, state.vols[s.id] > 0 ? 0 : state.last[s.id] || 0.5));
      range.addEventListener('input', () => setVol(s.id, range.value / 100));
      grid.append(el);
      cards[s.id] = { el, btn, range };
    }
  }

  function setVol(id, v, { batch = false, autoplay = true } = {}) {
    v = Math.round(Math.max(0, Math.min(1, v)) * 100) / 100;
    state.vols[id] = v;
    if (v > 0) state.last[id] = v;
    Engine.setVolume(id, v);
    const c = cards[id];
    c.range.value = Math.round(v * 100);
    c.el.style.setProperty('--v', v);
    c.el.classList.toggle('on', v > 0);
    c.btn.setAttribute('aria-pressed', v > 0);
    if (batch) return;
    changed();
    if (autoplay && v > 0 && !Engine.playing) play();
  }

  function setMix(mix, autoplay = true) {
    for (const s of SOUNDS) setVol(s.id, mix[s.id] || 0, { batch: true });
    changed();
    if (autoplay && anyOn() && !Engine.playing) play();
  }

  function changed() {
    writeHash();
    store.set('hush:mix', state.vols);
    markPreset();
    tintPage();
  }

  // Blend the hues of the active sounds (weighted by volume) into the page accent.
  function tintPage() {
    let x = 0, y = 0;
    for (const s of SOUNDS) {
      const v = state.vols[s.id] || 0, a = (s.hue * Math.PI) / 180;
      x += Math.cos(a) * v;
      y += Math.sin(a) * v;
    }
    if (x === 0 && y === 0) return;
    const hue = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    document.documentElement.style.setProperty('--mix-hue', hue.toFixed(0));
  }

  // ---------- playback ----------

  async function play() {
    if (!anyOn()) setMix(PRESETS[0].mix, false);
    const started = Engine.play();
    syncPlay();
    await started;
    startViz();
  }

  async function pause(fade) {
    const done = Engine.pause(fade);
    syncPlay();
    await done;
  }

  function syncPlay() {
    const p = Engine.playing;
    playBtn.setAttribute('aria-pressed', p);
    playBtn.setAttribute('aria-label', p ? 'Pause' : 'Play');
    document.body.classList.toggle('playing', p);
    document.title = p ? 'Hush ♪' : 'Hush';
  }

  function setMaster(v) {
    state.master = v;
    masterRange.value = Math.round(v * 100);
    masterRange.style.setProperty('--v', v);
    Engine.setMaster(v);
    store.set('hush:master', v);
  }

  // ---------- presets ----------

  function renderPresets() {
    const row = $('#presets');
    row.textContent = '';
    const custom = store.get('hush:presets', []);
    const list = [...PRESETS, ...custom.map(p => ({ ...p, custom: true }))];
    list.forEach((p, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.dataset.key = mixKey(p.mix);
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p.name;
      b.addEventListener('click', () => setMix(p.mix));
      chip.append(b);
      if (p.custom) {
        const x = document.createElement('button');
        x.type = 'button';
        x.className = 'x';
        x.textContent = '×';
        x.setAttribute('aria-label', `Delete preset ${p.name}`);
        x.addEventListener('click', () => {
          store.set('hush:presets', custom.filter((_, j) => j !== i - PRESETS.length));
          renderPresets();
          toast(`Deleted “${p.name}”`);
        });
        chip.append(x);
      }
      row.append(chip);
    });
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'chip add';
    save.textContent = '+ Save mix';
    save.addEventListener('click', openSave);
    row.append(save);
    markPreset();
  }

  function markPreset() {
    const key = mixKey(state.vols);
    document.querySelectorAll('.chip[data-key]').forEach(c => c.classList.toggle('active', key !== '' && c.dataset.key === key));
  }

  const dialog = $('#save-dialog'), nameInput = $('#preset-name');

  function openSave() {
    if (!anyOn()) return toast('Turn on a sound or two first');
    nameInput.value = '';
    dialog.showModal();
  }

  dialog.addEventListener('close', () => {
    const name = nameInput.value.trim();
    if (dialog.returnValue !== 'save' || !name) return;
    const mix = {};
    for (const s of SOUNDS) if (state.vols[s.id] > 0) mix[s.id] = state.vols[s.id];
    store.set('hush:presets', [...store.get('hush:presets', []), { name, mix }]);
    renderPresets();
    toast(`Saved “${name}”`);
  });

  // ---------- share link (#rain=55&cafe=40) ----------

  function writeHash() {
    const p = new URLSearchParams();
    for (const s of SOUNDS) if (state.vols[s.id] > 0) p.set(s.id, Math.round(state.vols[s.id] * 100));
    const q = p.toString();
    history.replaceState(null, '', q ? '#' + q : location.pathname + location.search);
  }

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    const mix = {};
    let found = false;
    for (const s of SOUNDS) {
      const v = parseInt(p.get(s.id), 10);
      if (v > 0) { mix[s.id] = Math.min(v, 100) / 100; found = true; }
    }
    return found ? mix : null;
  }

  async function share() {
    if (!anyOn()) return toast('Turn on a sound or two first');
    writeHash();
    try {
      await navigator.clipboard.writeText(location.href);
      toast('Link copied. Anyone who opens it hears this mix.');
    } catch {
      toast('Copy the address bar to share this mix');
    }
  }

  // ---------- extras ----------

  function shuffle() {
    const nature = SOUNDS.filter(s => !['white', 'pink', 'brown'].includes(s.id)).map(s => s.id);
    nature.sort(() => Math.random() - 0.5);
    const mix = {};
    nature.slice(0, 2 + Math.floor(Math.random() * 2)).forEach(id => (mix[id] = 0.25 + Math.random() * 0.55));
    if (Math.random() < 0.3) mix[['white', 'pink', 'brown'][Math.floor(Math.random() * 3)]] = 0.2;
    setMix(mix);
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // Sleep timer: counts down while playing, then fades out over 10 seconds.
  function renderTimer() {
    const s = state.timerLeft;
    $('#timer-left').textContent = s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : '';
  }

  setInterval(() => {
    if (!state.timerLeft || !Engine.playing) return;
    state.timerLeft--;
    renderTimer();
    if (state.timerLeft === 0) {
      timerSel.value = '0';
      pause(10).then(() => toast('Timer finished. Sweet dreams.'));
    }
  }, 1000);

  // ---------- visualizer ----------

  const canvas = $('#viz'), g2d = canvas.getContext('2d');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0, bins = null;

  function startViz() {
    if (!raf && !reducedMotion.matches && Engine.analyser) raf = requestAnimationFrame(draw);
  }

  function draw() {
    raf = 0;
    const a = Engine.analyser;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = canvas.clientWidth * dpr, h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    if (!bins) bins = new Uint8Array(a.frequencyBinCount);
    a.getByteFrequencyData(bins);
    g2d.clearRect(0, 0, w, h);

    const N = 64, lo = 2, hi = 420, pts = [];
    let energy = 0;
    for (let i = 0; i < N; i++) {
      const v = bins[Math.floor(lo * Math.pow(hi / lo, i / (N - 1)))] / 255;
      energy += v;
      pts.push([(i / (N - 1)) * w, h - Math.pow(v, 1.6) * h * 0.85]);
    }
    const hue = getComputedStyle(document.documentElement).getPropertyValue('--mix-hue').trim() || '205';
    const grad = g2d.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, `hsla(${hue}, 80%, 62%, 0.35)`);
    grad.addColorStop(1, `hsla(${hue}, 80%, 62%, 0)`);
    g2d.beginPath();
    g2d.moveTo(0, h);
    g2d.lineTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < N; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      g2d.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
    }
    g2d.lineTo(w, h);
    g2d.closePath();
    g2d.fillStyle = grad;
    g2d.fill();

    if (Engine.playing || energy > 0.5) raf = requestAnimationFrame(draw);
  }

  // ---------- wiring ----------

  playBtn.addEventListener('click', () => (Engine.playing ? pause() : play()));
  masterRange.addEventListener('input', () => { state.muted = false; setMaster(masterRange.value / 100); });
  $('#shuffle').addEventListener('click', shuffle);
  $('#share').addEventListener('click', share);
  $('#clear').addEventListener('click', () => { setMix({}, false); pause(); });

  timerSel.addEventListener('change', () => {
    state.timerLeft = Number(timerSel.value) * 60;
    renderTimer();
    if (state.timerLeft) toast(`Fading out in ${timerSel.selectedOptions[0].text}`);
  });

  window.addEventListener('hashchange', () => {
    const mix = readHash();
    if (mix) setMix(mix);
  });

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || dialog.open) return;
    if (e.target.closest('select, textarea, input:not([type=range])')) return;
    if (e.code === 'Space' && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      Engine.playing ? pause() : play();
    } else if (e.key === 's' || e.key === 'S') {
      shuffle();
    } else if (e.key === 'm' || e.key === 'M') {
      state.muted = !state.muted;
      Engine.setMaster(state.muted ? 0 : state.master);
      masterRange.value = state.muted ? 0 : Math.round(state.master * 100);
      masterRange.style.setProperty('--v', state.muted ? 0 : state.master);
      toast(state.muted ? 'Muted' : 'Unmuted');
    }
  });

  // ---------- start ----------

  buildCards();
  setMaster(store.get('hush:master', 0.8));
  setMix(readHash() || store.get('hush:mix', {}), false); // browsers need a click before audio can start
  renderPresets();
  syncPlay();
})();
