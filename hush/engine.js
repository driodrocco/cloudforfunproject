/* Hush audio engine.
 * Every sound is synthesized live with the Web Audio API: filtered noise for
 * the beds (rain, wind, surf) plus short scheduled events on top (droplets,
 * crackles, chirps, clinks). No audio files are loaded. */
(function () {
  'use strict';

  let ctx = null;
  let master = null;
  let analyser = null;
  let buffers = {};
  const channels = {}; // id -> { gain, tick }
  const volumes = {}; // id -> 0..1, kept even before the AudioContext exists
  let masterLevel = 0.8;
  let playing = false;
  let schedTimer = null;
  let schedTo = 0;
  const LOOKAHEAD = 1.5; // seconds of events scheduled ahead (survives tab throttling)

  const rand = (a, b) => a + Math.random() * (b - a);
  const expGap = rate => -Math.log(1 - Math.random()) / rate;

  // ---------- building blocks ----------

  // 8 seconds of looping noise, with the end crossfaded into the start so the loop is seamless.
  function noiseBuffer(type) {
    if (buffers[type]) return buffers[type];
    const sr = ctx.sampleRate, len = sr * 8, fade = Math.floor(sr * 0.5);
    const buf = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const raw = new Float32Array(len + fade);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
      for (let i = 0; i < raw.length; i++) {
        const w = Math.random() * 2 - 1;
        if (type === 'white') {
          raw[i] = w * 0.5;
        } else if (type === 'pink') { // Paul Kellet's filter
          b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
          b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
          raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
          b6 = w * 0.115926;
        } else { // brown
          last = (last + 0.02 * w) / 1.02;
          raw[i] = last * 3.5;
        }
      }
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        d[i] = i < fade ? raw[i] * (i / fade) + raw[len + i] * (1 - i / fade) : raw[i];
      }
    }
    return (buffers[type] = buf);
  }

  function noise(type) {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuffer(type);
    s.loop = true;
    s.start(0, Math.random() * 8);
    return s;
  }

  function filter(type, freq, Q = 1) {
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = Q;
    return f;
  }

  function gain(v) {
    const g = ctx.createGain();
    g.gain.value = v;
    return g;
  }

  function chain(...nodes) {
    for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
    return nodes[nodes.length - 1];
  }

  function route(node, dest, pan) {
    if (!pan) return node.connect(dest);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    node.connect(p);
    p.connect(dest);
  }

  // A short hit of filtered noise: droplets, crackles, thunder.
  function burst(t, dest, o) {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuffer(o.noise || 'white');
    const f = filter(o.type || 'bandpass', o.freq, o.Q || 1);
    const g = gain(0);
    const attack = o.attack || 0.001, end = t + attack + o.dur;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(o.amp, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    s.connect(f);
    f.connect(g);
    route(g, dest, o.pan);
    s.start(t, Math.random() * 7);
    s.stop(end + 0.05);
  }

  // A short pitched blip with a frequency sweep: chirps, clinks, bubbles.
  function tone(t, dest, o) {
    const osc = ctx.createOscillator();
    osc.type = o.wave || 'sine';
    const g = gain(0), end = t + o.dur;
    osc.frequency.setValueAtTime(o.f0, t);
    osc.frequency.exponentialRampToValueAtTime(o.f1, end);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(o.amp, t + (o.attack || 0.005));
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(g);
    route(g, dest, o.pan);
    osc.start(t);
    osc.stop(end + 0.02);
  }

  // Calls fn(time) for events spaced by gap(), only within the window being scheduled.
  function every(gap, fn) {
    let next = -1;
    return (from, to) => {
      if (next < from) next = from + gap() * Math.random();
      while (next < to) {
        fn(next);
        next += gap();
      }
    };
  }

  const all = (...ticks) => (a, b) => ticks.forEach(t => t(a, b));

  // ---------- the sounds ----------
  // Each voice wires itself into `out` and may return tick(from, to) to schedule events.

  const VOICES = {
    rain(out) {
      chain(noise('pink'), filter('highpass', 500), filter('lowpass', 7000), gain(0.55), out);
      chain(noise('brown'), filter('lowpass', 400), gain(0.35), out);
      return every(() => expGap(30), t => burst(t, out, {
        freq: rand(1500, 6000), Q: rand(2, 8), dur: rand(0.02, 0.06),
        amp: rand(0.03, 0.18), pan: rand(-0.8, 0.8),
      }));
    },

    thunder(out) {
      let first = true;
      const gap = () => (first ? ((first = false), 2) : rand(12, 35));
      return every(gap, t => {
        burst(t, out, { type: 'lowpass', noise: 'brown', freq: rand(120, 260), Q: 0.7,
          attack: rand(0.2, 0.8), dur: rand(4, 9), amp: rand(0.6, 1) });
        if (Math.random() < 0.6) {
          burst(t, out, { type: 'lowpass', freq: 2500, Q: 0.5, attack: 0.005,
            dur: rand(0.3, 0.8), amp: rand(0.1, 0.25), pan: rand(-0.5, 0.5) });
        }
        for (let i = 0; i < 3; i++) {
          burst(t + rand(0.3, 3), out, { type: 'lowpass', noise: 'brown', freq: rand(80, 180),
            attack: 0.3, dur: rand(2, 5), amp: rand(0.3, 0.6), pan: rand(-0.6, 0.6) });
        }
      });
    },

    wind(out) {
      const bp = filter('bandpass', 500, 0.8), g = gain(0.5);
      chain(noise('pink'), bp, g, out);
      const wbp = filter('bandpass', 900, 12), wg = gain(0);
      chain(noise('white'), wbp, wg, out);
      return every(() => rand(1.5, 4), t => {
        const k = Math.random();
        bp.frequency.setTargetAtTime(250 + k * 900, t, 1.2);
        g.gain.setTargetAtTime(0.25 + k * 0.9, t, 1.2);
        wbp.frequency.setTargetAtTime(600 + k * 900, t, 1.5);
        wg.gain.setTargetAtTime(k > 0.6 ? (k - 0.6) * 0.5 : 0, t, 1.5);
      });
    },

    waves(out) {
      const lp = filter('lowpass', 300, 0.5), g = gain(0.12);
      chain(noise('brown'), lp, g, out);
      const hp = filter('highpass', 1500), foam = gain(0);
      chain(noise('pink'), hp, foam, out);
      return every(() => rand(6, 11), t => {
        const rise = rand(2, 3.5), fall = rand(3, 5), peak = rand(0.7, 1.2);
        g.gain.setTargetAtTime(peak, t, rise / 3);
        g.gain.setTargetAtTime(0.12, t + rise, fall / 3);
        lp.frequency.setTargetAtTime(1200, t, rise / 3);
        lp.frequency.setTargetAtTime(300, t + rise, fall / 3);
        foam.gain.setTargetAtTime(peak * 0.25, t + rise * 0.8, 0.4);
        foam.gain.setTargetAtTime(0, t + rise + 0.5, fall / 4);
      });
    },

    stream(out) {
      chain(noise('pink'), filter('bandpass', 1800, 0.6), gain(0.5), out);
      chain(noise('brown'), filter('lowpass', 600), gain(0.4), out);
      return every(() => expGap(18), t => {
        const f = rand(350, 1100);
        tone(t, out, { f0: f, f1: f * rand(1.6, 2.6), dur: rand(0.03, 0.07),
          amp: rand(0.02, 0.07), attack: 0.003, pan: rand(-0.7, 0.7) });
      });
    },

    birds(out) {
      return every(() => expGap(0.5), t => {
        const base = rand(2200, 4800), n = Math.floor(rand(2, 7)), step = rand(0.08, 0.18);
        const dur = rand(0.04, 0.12), shape = Math.floor(rand(0, 3)), amp = rand(0.04, 0.12);
        const pan = rand(-0.9, 0.9);
        for (let i = 0; i < n; i++) {
          const f = shape === 2 ? base * (1 - i * 0.04) : base;
          const [f0, f1] = shape === 0 ? [f, f * 1.5] : shape === 1 ? [f * 1.4, f * 0.8] : [f, f * 1.15];
          tone(t + i * step, out, { f0, f1, dur, amp, attack: 0.01, pan });
        }
      });
    },

    crickets(out) {
      chain(noise('brown'), filter('lowpass', 200), gain(0.15), out);
      const cricket = (freq, pan) => every(() => rand(0.5, 0.9), t => {
        for (let i = 0; i < 3; i++) {
          tone(t + i * 0.045, out, { f0: freq, f1: freq * 0.98, dur: 0.03, amp: 0.05, attack: 0.004, pan });
        }
      });
      return all(cricket(4300, -0.5), cricket(4700, 0.4), cricket(5100, 0.05));
    },

    fire(out) {
      chain(noise('brown'), filter('lowpass', 350), gain(0.9), out);
      const crackle = every(() => expGap(14), t => burst(t, out, {
        freq: rand(1200, 5000), Q: rand(0.7, 2), dur: rand(0.005, 0.03),
        amp: Math.random() ** 2 * 0.7, pan: rand(-0.4, 0.4),
      }));
      const pop = every(() => expGap(0.7), t => burst(t, out, {
        freq: rand(400, 1200), dur: rand(0.03, 0.08), amp: rand(0.3, 0.7), pan: rand(-0.3, 0.3),
      }));
      return all(crackle, pop);
    },

    cafe(out) {
      // Muffled murmur: several "talkers", each a formant-like band of noise that
      // switches between talking and silence with syllable-rate wobble.
      const room = filter('lowpass', 2200, 0.5);
      room.connect(out);
      chain(noise('brown'), filter('lowpass', 220), gain(0.5), out);
      const talkers = Array.from({ length: 6 }, () => {
        const bp = filter('bandpass', rand(400, 1500), 5), g = gain(0);
        const p = ctx.createStereoPanner();
        p.pan.value = rand(-0.8, 0.8);
        chain(noise('pink'), bp, g, p, room);
        let talking = Math.random() < 0.5, until = 0;
        return every(() => rand(0.1, 0.25), t => {
          if (t > until) {
            talking = !talking;
            until = t + (talking ? rand(2, 6) : rand(1, 4));
          }
          g.gain.setTargetAtTime(talking && Math.random() > 0.15 ? rand(0.3, 1) : 0, t, 0.03);
          bp.frequency.setTargetAtTime(rand(350, 1600), t, 0.04);
        });
      });
      const clink = every(() => expGap(0.35), t => {
        const f = rand(2500, 4200), pan = rand(-0.6, 0.6);
        tone(t, out, { f0: f, f1: f * 0.995, dur: rand(0.25, 0.6), amp: rand(0.015, 0.05), attack: 0.002, pan });
        tone(t, out, { f0: f * 2.76, f1: f * 2.75, dur: 0.15, amp: 0.015, attack: 0.002, pan });
      });
      return all(...talkers, clink);
    },

    white(out) { chain(noise('white'), gain(1), out); },
    pink(out) { chain(noise('pink'), gain(1), out); },
    brown(out) { chain(noise('brown'), gain(1), out); },
  };

  // Loudness trims so every sound sits at a similar level at 100%.
  // Measured with renderOffline() (see README → "Tuning levels").
  const TRIM = {
    rain: 1, thunder: 1.6, wind: 2, waves: 1.1, stream: 1.1, birds: 4,
    crickets: 2.5, fire: 0.6, cafe: 0.95, white: 0.35, pink: 0.55, brown: 0.55,
  };

  // ---------- engine ----------

  function hold(param, t) {
    if (param.cancelAndHoldAtTime) {
      param.cancelAndHoldAtTime(t);
    } else {
      param.cancelScheduledValues(t);
      param.setValueAtTime(param.value, t);
    }
  }

  function ensureContext() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC({ latencyHint: 'playback' });
    master = gain(0);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.knee.value = 12;
    comp.ratio.value = 4;
    comp.attack.value = 0.01;
    comp.release.value = 0.3;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;
    chain(master, comp, analyser, ctx.destination);
    for (const id in volumes) applyVolume(id);
  }

  function channel(id) {
    if (!channels[id]) {
      const g = gain(0), trim = gain(TRIM[id] ?? 1);
      chain(g, trim, master);
      channels[id] = { gain: g, tick: VOICES[id](g) || null };
    }
    return channels[id];
  }

  function applyVolume(id) {
    const v = volumes[id] || 0;
    if (!ctx || (v === 0 && !channels[id])) return;
    channel(id).gain.gain.setTargetAtTime(v * v, ctx.currentTime, 0.08);
  }

  function schedule() {
    const now = ctx.currentTime;
    const from = Math.max(schedTo, now), to = now + LOOKAHEAD;
    for (const id in channels) {
      if (volumes[id] > 0 && channels[id].tick) channels[id].tick(from, to);
    }
    schedTo = to;
  }

  async function play() {
    ensureContext();
    playing = true;
    if (ctx.state !== 'running') await ctx.resume();
    if (!playing) return; // paused again while resuming
    hold(master.gain, ctx.currentTime);
    master.gain.setTargetAtTime(masterLevel, ctx.currentTime, 0.15);
    schedule();
    clearInterval(schedTimer);
    schedTimer = setInterval(schedule, 250);
  }

  // Fades out over `fade` seconds, then suspends the context to save battery.
  function pause(fade = 0.25) {
    if (!ctx || !playing) return Promise.resolve();
    playing = false;
    clearInterval(schedTimer);
    hold(master.gain, ctx.currentTime);
    master.gain.setTargetAtTime(0, ctx.currentTime, fade / 4);
    return new Promise(resolve => setTimeout(() => {
      if (!playing) ctx.suspend();
      resolve();
    }, fade * 1000 + 50));
  }

  function setMaster(v) {
    masterLevel = v * v;
    if (ctx && playing) {
      hold(master.gain, ctx.currentTime);
      master.gain.setTargetAtTime(masterLevel, ctx.currentTime, 0.05);
    }
  }

  // Renders one sound offline (no speakers needed). Used to measure levels and in tests.
  async function renderOffline(id, seconds = 20, sampleRate = 44100) {
    const saved = { ctx, buffers };
    const off = new OfflineAudioContext(2, sampleRate * seconds, sampleRate);
    ctx = off;
    buffers = {};
    try {
      const g = gain(TRIM[id] ?? 1);
      g.connect(off.destination);
      const tick = VOICES[id](g);
      if (tick) tick(0, seconds);
    } finally {
      ctx = saved.ctx;
      buffers = saved.buffers;
    }
    return off.startRendering();
  }

  window.Engine = {
    ids: Object.keys(VOICES),
    play,
    pause,
    setMaster,
    setVolume(id, v) {
      volumes[id] = v;
      applyVolume(id);
    },
    renderOffline,
    get playing() { return playing; },
    get analyser() { return analyser; },
  };
})();
